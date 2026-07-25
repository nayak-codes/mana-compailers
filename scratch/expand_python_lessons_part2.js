/**
 * expand_python_lessons_part2.js
 * Expands remaining Python lesson HTML files: operators, strings, dicts, modules, files, errors, oop-basics, oop-advanced
 * Run: node scratch/expand_python_lessons_part2.js
 */

const fs = require('fs');
const path = require('path');
const PUBLIC = path.join(__dirname, '..', 'public');

function getSharedHeader(lesson) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${lesson.title} | Our Compiler</title>
  <meta name="description" content="${lesson.desc}" />
  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />
  <link rel="icon" type="image/png" href="/logo.png" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/blog-style.css" />
  <script src="/site-nav.js" defer></script>
  <script>
    (function() {
      function restoreScroll() { var s=sessionStorage.getItem('scrollPos'); if(s){window.scrollTo(0,parseInt(s,10));sessionStorage.removeItem('scrollPos');} }
      window.addEventListener('load',function(){restoreScroll();setTimeout(restoreScroll,100);setTimeout(restoreScroll,500);});
      document.addEventListener('DOMContentLoaded',function(){setTimeout(restoreScroll,50);});
      document.addEventListener('click',function(e){var l=e.target.closest('a');if(l&&l.hostname===window.location.hostname&&!l.hasAttribute('download')){sessionStorage.setItem('scrollPos',window.scrollY);}});
    })();
  </script>
  <script>
    (function(){
      const t=localStorage.getItem('theme')||'dark';
      if(t==='light'){document.documentElement.classList.add('light-theme');document.addEventListener('DOMContentLoaded',()=>{document.body.classList.add('light-theme');});}
      window.addEventListener('DOMContentLoaded',()=>{
        const nav=document.querySelector('.topnav');
        if(nav){const b=document.createElement('button');b.className='blog-theme-toggle';b.style.cssText='margin-left:auto;flex-shrink:0;background:rgba(255,255,255,0.15);color:#fff;border:1px solid rgba(255,255,255,0.25);border-radius:6px;padding:4px 10px;font-size:12px;font-weight:600;cursor:pointer;font-family:"Inter",sans-serif;transition:all 0.2s;white-space:nowrap;margin-right:12px;';const u=()=>{b.innerHTML=document.body.classList.contains('light-theme')?'🌙 Dark':'☀️ Light';};u();b.addEventListener('click',()=>{document.body.classList.toggle('light-theme');document.documentElement.classList.toggle('light-theme');localStorage.setItem('theme',document.body.classList.contains('light-theme')?'light':'dark');u();});nav.appendChild(b);}
        document.querySelectorAll('.code-block').forEach(block=>{
          const h=block.querySelector('.code-block-header'),c=block.querySelector('pre code');if(!h||!c)return;
          let ac=h.querySelector('.code-actions');if(!ac){ac=document.createElement('div');ac.className='code-actions';ac.style.cssText='display:flex;gap:8px;align-items:center;margin-left:auto;';const tb=h.querySelector('.try-btn');if(tb)ac.appendChild(tb);h.appendChild(ac);}
          const cb=document.createElement('button');cb.innerHTML='📋 Copy';cb.style.cssText='background:rgba(255,255,255,0.15);color:#fff;border:1px solid rgba(255,255,255,0.25);border-radius:6px;padding:4px 10px;font-size:11px;font-weight:600;cursor:pointer;transition:all 0.2s;font-family:"Inter",sans-serif;white-space:nowrap;';
          cb.addEventListener('click',()=>{navigator.clipboard.writeText(c.textContent).then(()=>{cb.innerHTML='✅ Copied!';setTimeout(()=>{cb.innerHTML='📋 Copy';},2000);});});
          ac.insertBefore(cb,ac.firstChild);
          const tb=ac.querySelector('.try-btn');if(tb){tb.addEventListener('click',(e)=>{e.preventDefault();const url=tb.getAttribute('href');const lang=new URLSearchParams(url.split('?')[1]).get('lang')||'python3';localStorage.setItem('code_'+lang,c.textContent);window.location.href=url;});}
        });
      });
    })();
  </script>
</head>
<body class="lang-python">
<nav class="topnav">
  <a href="/" class="brand">🖥️ Our Compiler</a>
  <a href="/blog-python.html" class="active">Python</a>
  <a href="/blog-java.html">Java</a><a href="/blog-javascript.html">JavaScript</a>
  <a href="/blog-c.html">C</a><a href="/blog-cpp.html">C++</a><a href="/blog-csharp.html">C#</a>
  <a href="/blog-go.html">Go</a><a href="/blog-rust.html">Rust</a><a href="/blog-php.html">PHP</a>
  <a href="/blog-ruby.html">Ruby</a><a href="/blog-html.html">HTML</a><a href="/blog-css.html">CSS</a>
  <a href="/blog-react.html">React</a><a href="/blog-angular.html">Angular</a><a href="/blog-vue.html">Vue.js</a>
  <a href="/blog-nextjs.html">Next.js</a><a href="/blog-nodejs.html">Node.js</a><a href="/blog-express.html">Express.js</a>
  <a href="/blog-django.html">Django</a><a href="/blog-flask.html">Flask</a><a href="/blog-spring-boot.html">Spring Boot</a>
  <a href="/blog-mysql.html">MySQL</a><a href="/blog-mongodb.html">MongoDB</a>
  <a href="/blog-rest-api.html">REST API</a><a href="/blog-graphql.html">GraphQL</a><a href="/blog-git.html">Git &amp; GitHub</a>
</nav>
<div class="layout">
  <aside class="sidebar">
    <div class="sidebar-heading">Python 3 Tutorial</div>
    <a href="/blog-python.html">Python 3 HOME</a>
    <a href="/blog-python-intro.html"${lesson.slug==='intro'?' class="active"':''}>1. Welcome &amp; Hello World</a>
    <a href="/blog-python-variables.html"${lesson.slug==='variables'?' class="active"':''}>2. Variables &amp; Core Types</a>
    <a href="/blog-python-operators.html"${lesson.slug==='operators'?' class="active"':''}>3. Basic Operators &amp; Math</a>
    <a href="/blog-python-strings.html"${lesson.slug==='strings'?' class="active"':''}>4. String Slicing &amp; Methods</a>
    <a href="/blog-python-conditionals.html"${lesson.slug==='conditionals'?' class="active"':''}>5. Conditionals (if-else)</a>
    <a href="/blog-python-loops.html"${lesson.slug==='loops'?' class="active"':''}>6. Loops &amp; Ranges</a>
    <a href="/blog-python-input.html"${lesson.slug==='input'?' class="active"':''}>7. Reading User Inputs</a>
    <a href="/blog-python-lists.html"${lesson.slug==='lists'?' class="active"':''}>8. Lists &amp; Tuples</a>
    <a href="/blog-python-dicts.html"${lesson.slug==='dicts'?' class="active"':''}>9. Dictionaries &amp; Sets</a>
    <a href="/blog-python-functions.html"${lesson.slug==='functions'?' class="active"':''}>10. Functions &amp; Reusable Code</a>
    <a href="/blog-python-modules.html"${lesson.slug==='modules'?' class="active"':''}>11. Modules &amp; Standard Lib</a>
    <a href="/blog-python-files.html"${lesson.slug==='files'?' class="active"':''}>12. File I/O Operations</a>
    <a href="/blog-python-errors.html"${lesson.slug==='errors'?' class="active"':''}>13. Exception Handling</a>
    <a href="/blog-python-oop-basics.html"${lesson.slug==='oop-basics'?' class="active"':''}>14. OOP: Classes &amp; Objects</a>
    <a href="/blog-python-oop-advanced.html"${lesson.slug==='oop-advanced'?' class="active"':''}>15. OOP: Inheritance &amp; Dunder</a>
    <div class="sidebar-heading">Reference</div>
    <a href="/blog.html">All Tutorials</a>
    <a href="/?lang=python3">▶ Try Python 3 Online</a>
    <div class="sidebar-heading">Other Languages</div>
    <a href="/blog-java.html">Java</a><a href="/blog-javascript.html">JavaScript</a>
    <a href="/blog-c.html">C</a><a href="/blog-cpp.html">C++</a>
    <a href="/blog-go.html">Go</a><a href="/blog-rust.html">Rust</a>
  </aside>
  <main class="content">`;
}

const lessons = {

// ── Lesson 3: Operators ──────────────────────────────────────────────────────
'blog-python-operators.html': {
  slug:'operators', lessonNum:3,
  title:'Python 3 Basic Operators &amp; Math',
  desc:'Learn Python 3 operators — arithmetic, comparison, logical, assignment, bitwise, membership and identity operators with practical examples.',
  breadcrumb:'Basic Operators &amp; Math', h1:'Python 3 — Basic Operators &amp; Math',
  prev:{url:'/blog-python-variables.html',label:'Variables &amp; Core Types'},
  next:{url:'/blog-python-strings.html',label:'String Slicing &amp; Methods'},
  intro:'Operators are the symbols that tell Python how to perform calculations and comparisons. From simple addition to advanced bitwise operations, understanding operators is fundamental to writing any real program.',
  content:`
<div class="section">
  <div class="section-title"><span class="num">1</span> Arithmetic Operators</div>
  <table class="tbl"><tr><th>Operator</th><th>Name</th><th>Example</th><th>Result</th></tr>
    <tr><td><code>+</code></td><td>Addition</td><td><code>10 + 3</code></td><td>13</td></tr>
    <tr><td><code>-</code></td><td>Subtraction</td><td><code>10 - 3</code></td><td>7</td></tr>
    <tr><td><code>*</code></td><td>Multiplication</td><td><code>10 * 3</code></td><td>30</td></tr>
    <tr><td><code>/</code></td><td>Division (float)</td><td><code>10 / 3</code></td><td>3.333...</td></tr>
    <tr><td><code>//</code></td><td>Floor Division</td><td><code>10 // 3</code></td><td>3</td></tr>
    <tr><td><code>%</code></td><td>Modulo (remainder)</td><td><code>10 % 3</code></td><td>1</td></tr>
    <tr><td><code>**</code></td><td>Exponent (power)</td><td><code>2 ** 10</code></td><td>1024</td></tr>
  </table>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">Python 3 — Arithmetic</span><a class="try-btn" href="/?lang=python3">▶ Run Code</a></div>
    <pre><code>a, b = 17, 5
print(f"{a} + {b} = {a + b}")    # 22
print(f"{a} - {b} = {a - b}")    # 12
print(f"{a} * {b} = {a * b}")    # 85
print(f"{a} / {b} = {a / b}")    # 3.4
print(f"{a} // {b} = {a // b}")  # 3 (floor)
print(f"{a} % {b} = {a % b}")    # 2 (remainder)
print(f"{a} ** {b} = {a ** b}")  # 1419857

# Common use of modulo: check even/odd
for n in range(1, 11):
    status = "even" if n % 2 == 0 else "odd"
    print(f"{n} is {status}")</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Assignment Operators</div>
  <p>Python has shorthand operators that combine assignment with an operation:</p>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">Python 3 — Assignment Operators</span><a class="try-btn" href="/?lang=python3">▶ Run Code</a></div>
    <pre><code>score = 100

score += 10   # score = score + 10  → 110
print(score)

score -= 5    # score = score - 5   → 105
print(score)

score *= 2    # score = score * 2   → 210
print(score)

score //= 3   # score = score // 3  → 70
print(score)

score **= 2   # score = score ** 2  → 4900
print(score)

score %= 100  # score = score % 100 → 0
print(score)</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Comparison Operators</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">Python 3 — Comparison</span><a class="try-btn" href="/?lang=python3">▶ Run Code</a></div>
    <pre><code>x, y = 10, 20
print(x == y)   # False
print(x != y)   # True
print(x < y)    # True
print(x > y)    # False
print(x <= 10)  # True
print(x >= 10)  # True

# Chained comparisons (very Pythonic!)
age = 25
print(18 <= age <= 65)  # True — adult working age

temp = 37
print(36.1 <= temp <= 37.5)  # True — normal body temp</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">4</span> Logical Operators</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">Python 3 — Logical Operators</span><a class="try-btn" href="/?lang=python3">▶ Run Code</a></div>
    <pre><code># and — both must be True
print(True and True)    # True
print(True and False)   # False

# or — at least one must be True
print(False or True)    # True
print(False or False)   # False

# not — inverts
print(not True)         # False
print(not False)        # True

# Short-circuit evaluation
x = 0
# 'and' stops at first False
result = (x != 0) and (100 / x > 5)  # Safe! Doesn't divide
print(result)  # False (no ZeroDivisionError)</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">5</span> Math Module</div>
  <p>For advanced math, import Python's built-in <code>math</code> module:</p>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">Python 3 — math Module</span><a class="try-btn" href="/?lang=python3">▶ Run Code</a></div>
    <pre><code>import math

print(math.sqrt(144))      # 12.0 — square root
print(math.pi)             # 3.141592653589793
print(math.ceil(4.1))      # 5 — round up
print(math.floor(4.9))     # 4 — round down
print(math.pow(2, 8))      # 256.0
print(math.log(1000, 10))  # 3.0 — log base 10
print(math.factorial(6))   # 720
print(math.gcd(48, 18))    # 6 — greatest common divisor
print(abs(-99))            # 99 — absolute value
print(round(3.14159, 2))   # 3.14</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">6</span> Bitwise Operators</div>
  <p>Bitwise operators work on the binary representation of integers. Used in system programming, flags, and optimizations:</p>
  <table class="tbl"><tr><th>Operator</th><th>Name</th><th>Example</th><th>Binary Logic</th></tr>
    <tr><td><code>&amp;</code></td><td>AND</td><td><code>5 &amp; 3 = 1</code></td><td>0101 &amp; 0011 = 0001</td></tr>
    <tr><td><code>|</code></td><td>OR</td><td><code>5 | 3 = 7</code></td><td>0101 | 0011 = 0111</td></tr>
    <tr><td><code>^</code></td><td>XOR</td><td><code>5 ^ 3 = 6</code></td><td>0101 ^ 0011 = 0110</td></tr>
    <tr><td><code>~</code></td><td>NOT</td><td><code>~5 = -6</code></td><td>Flips all bits</td></tr>
    <tr><td><code>&lt;&lt;</code></td><td>Left shift</td><td><code>1 &lt;&lt; 4 = 16</code></td><td>Multiply by 2^n</td></tr>
    <tr><td><code>&gt;&gt;</code></td><td>Right shift</td><td><code>16 &gt;&gt; 2 = 4</code></td><td>Divide by 2^n</td></tr>
  </table>
</div>

<div class="section">
  <div class="section-title"><span class="num">7</span> Operator Precedence</div>
  <p>Python follows mathematical order of operations (BODMAS/PEMDAS). Use parentheses to make intent explicit:</p>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">Python 3 — Precedence</span><a class="try-btn" href="/?lang=python3">▶ Run Code</a></div>
    <pre><code># Without parentheses — follows precedence rules
result = 2 + 3 * 4 ** 2
print(result)   # 2 + 3 * 16 = 2 + 48 = 50

# With parentheses — explicit and clear
result = (2 + 3) * (4 ** 2)
print(result)   # 5 * 16 = 80

# Common real-world formulas
radius = 7
area = math.pi * radius ** 2  # πr²
print(f"Circle area: {area:.2f}")

principal = 10000
rate = 0.08
years = 5
compound = principal * (1 + rate) ** years
print(f"Compound interest amount: {compound:.2f}")</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">8</span> Coding Challenge</div>
  <p>Write a program that:</p>
  <ul>
    <li>Takes two numbers and prints all 7 arithmetic results (+, -, *, /, //, %, **)</li>
    <li>Calculates the area and circumference of a circle using <code>math.pi</code></li>
    <li>Uses chained comparison to classify a temperature as: "Freezing" (&lt;0), "Cold" (0-15), "Warm" (15-30), "Hot" (&gt;30)</li>
    <li>Uses assignment operators (+=, -=, *=) to simulate a bank account: start at 1000, deposit 500, charge 50 fee, apply 5% interest</li>
  </ul>
</div>`
},

// ── Lesson 4: Strings ────────────────────────────────────────────────────────
'blog-python-strings.html': {
  slug:'strings', lessonNum:4,
  title:'Python 3 String Slicing &amp; Methods',
  desc:'Learn Python 3 strings — creation, indexing, slicing, f-strings, string methods like split, join, replace, strip, and regular expressions basics.',
  breadcrumb:'String Slicing &amp; Methods', h1:'Python 3 — String Slicing &amp; Methods',
  prev:{url:'/blog-python-operators.html',label:'Basic Operators &amp; Math'},
  next:{url:'/blog-python-conditionals.html',label:'Conditionals (if-else)'},
  intro:'Strings are sequences of characters and one of the most frequently used data types in Python. Almost every real-world program processes text — reading user names, parsing files, displaying messages. Python\'s string tools are powerful and elegant.',
  content:`
<div class="section">
  <div class="section-title"><span class="num">1</span> Creating Strings</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">Python 3 — String Creation</span><a class="try-btn" href="/?lang=python3">▶ Run Code</a></div>
    <pre><code># Single and double quotes
name1 = 'Python'
name2 = "Python"
print(name1 == name2)   # True — same thing

# Triple quotes for multi-line strings
poem = """Roses are red,
Violets are blue,
Python is awesome,
And so are you!"""
print(poem)

# Escape characters
path = "C:\\Users\\Balaji\\Documents"
tab_example = "Name:\\tBalaji"
newline = "Line 1\\nLine 2"
print(path)
print(tab_example)
print(newline)

# Raw strings (r-prefix) — backslashes are literal
raw = r"C:\Users\Balaji\Documents"
print(raw)</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> String Indexing &amp; Slicing</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">Python 3 — Slicing</span><a class="try-btn" href="/?lang=python3">▶ Run Code</a></div>
    <pre><code>text = "Hello, Python!"
#       0123456789...

# Single character access
print(text[0])     # H
print(text[7])     # P
print(text[-1])    # !
print(text[-6])    # P

# Slicing: [start:stop:step]
print(text[0:5])   # Hello
print(text[7:13])  # Python
print(text[:5])    # Hello (start defaults to 0)
print(text[7:])    # Python! (stop defaults to end)
print(text[::2])   # Hlo yhn (every 2nd char)
print(text[::-1])  # !nohtyP ,olleH (reversed!)</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> F-Strings &amp; Formatting</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">Python 3 — F-Strings</span><a class="try-btn" href="/?lang=python3">▶ Run Code</a></div>
    <pre><code>name = "Balaji"
score = 98.567
items = 5

# F-string with expressions
print(f"Hello, {name}!")
print(f"Score: {score:.2f}")    # 2 decimal places
print(f"Items: {items:03d}")    # pad with zeros: 005
print(f"Name upper: {name.upper()}")
print(f"2^10 = {2**10}")

# Width and alignment
print(f"{'Left':<10}|")        # Left-aligned
print(f"{'Right':>10}|")       # Right-aligned
print(f"{'Center':^10}|")      # Centered

# Old-style formatting (still common)
msg = "Hello %s, you are %d years old." % ("Bob", 30)
print(msg)

# .format() method
msg2 = "Product: {}, Price: \\${:.2f}".format("Laptop", 999.99)
print(msg2)</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">4</span> Essential String Methods</div>
  <table class="tbl"><tr><th>Method</th><th>Description</th><th>Example</th></tr>
    <tr><td><code>.upper()</code></td><td>Uppercase</td><td><code>"hello".upper()</code> → "HELLO"</td></tr>
    <tr><td><code>.lower()</code></td><td>Lowercase</td><td><code>"HELLO".lower()</code> → "hello"</td></tr>
    <tr><td><code>.strip()</code></td><td>Remove whitespace</td><td><code>"  hi  ".strip()</code> → "hi"</td></tr>
    <tr><td><code>.split(x)</code></td><td>Split into list</td><td><code>"a,b,c".split(",")</code> → ['a','b','c']</td></tr>
    <tr><td><code>.join(lst)</code></td><td>Join list into string</td><td><code>"-".join(["a","b"])</code> → "a-b"</td></tr>
    <tr><td><code>.replace(a,b)</code></td><td>Replace substring</td><td><code>"cat".replace("c","b")</code> → "bat"</td></tr>
    <tr><td><code>.find(x)</code></td><td>Find index of substring</td><td><code>"hello".find("l")</code> → 2</td></tr>
    <tr><td><code>.startswith(x)</code></td><td>Starts with</td><td><code>"Python".startswith("Py")</code> → True</td></tr>
    <tr><td><code>.count(x)</code></td><td>Count occurrences</td><td><code>"banana".count("a")</code> → 3</td></tr>
  </table>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">Python 3 — String Methods</span><a class="try-btn" href="/?lang=python3">▶ Run Code</a></div>
    <pre><code>text = "  Hello, World! Python is Amazing.  "

# Cleaning
clean = text.strip()
print(clean)                        # No leading/trailing spaces

# Case methods
print(clean.upper())                # ALL CAPS
print(clean.lower())                # all lowercase
print(clean.title())                # Title Case
print(clean.swapcase())             # sWAP cASE

# Finding & replacing
print(clean.find("Python"))         # 15 (index)
print(clean.count("o"))             # 4
print(clean.replace("Amazing", "Awesome"))

# Splitting & joining
sentence = "apple,banana,cherry,mango"
fruits = sentence.split(",")
print(fruits)                       # ['apple', 'banana', ...]
rejoined = " | ".join(fruits)
print(rejoined)                     # apple | banana | ...</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">5</span> String Checking Methods</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">Python 3 — String Checks</span><a class="try-btn" href="/?lang=python3">▶ Run Code</a></div>
    <pre><code># Check string contents
print("Python3".isalpha())   # False (has digit)
print("Python".isalpha())    # True (only letters)
print("12345".isdigit())     # True (only digits)
print("Hello123".isalnum())  # True (letters + digits)
print("   ".isspace())       # True (only whitespace)
print("hello".islower())     # True
print("HELLO".isupper())     # True
print("Hello World".istitle()) # True

# Common validation patterns
email = "user@example.com"
print("@" in email and "." in email)  # True

phone = "9876543210"
print(phone.isdigit() and len(phone) == 10)  # True</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">6</span> String Concatenation &amp; Repetition</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">Python 3 — Concat &amp; Repeat</span><a class="try-btn" href="/?lang=python3">▶ Run Code</a></div>
    <pre><code># Concatenation with +
first = "Hello"
second = "World"
greeting = first + ", " + second + "!"
print(greeting)   # Hello, World!

# Repetition with *
divider = "-" * 40
print(divider)

stars = "⭐" * 5
print(stars)   # ⭐⭐⭐⭐⭐

# Building strings with join (efficient for many strings)
words = ["Python", "is", "a", "great", "language"]
sentence = " ".join(words)
print(sentence)

# Strings are immutable — can't modify in place
name = "Python"
# name[0] = "J"  # ❌ TypeError!
name = "J" + name[1:]  # ✅ Create new string
print(name)</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">7</span> Useful String Patterns</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">Python 3 — String Patterns</span><a class="try-btn" href="/?lang=python3">▶ Run Code</a></div>
    <pre><code># Palindrome check
def is_palindrome(s):
    s = s.lower().replace(" ", "")
    return s == s[::-1]

print(is_palindrome("racecar"))    # True
print(is_palindrome("A man a plan a canal Panama"))  # True
print(is_palindrome("Python"))     # False

# Word count
text = "the quick brown fox jumps over the lazy dog"
words = text.split()
word_count = {}
for word in words:
    word_count[word] = word_count.get(word, 0) + 1
print(word_count)

# Extract file extension
filename = "tutorial.python.pdf"
parts = filename.rsplit(".", 1)
print(f"Name: {parts[0]}, Extension: {parts[1]}")</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">8</span> Coding Challenge</div>
  <p>Build a <strong>text processor</strong> that:</p>
  <ul>
    <li>Takes a paragraph of text (hardcoded)</li>
    <li>Counts the total number of words, characters (excluding spaces), and sentences</li>
    <li>Finds the longest word</li>
    <li>Replaces all occurrences of a word (e.g., replace "Python" with "🐍 Python")</li>
    <li>Checks if it contains a specific keyword</li>
    <li>Outputs a formatted summary using f-strings</li>
  </ul>
</div>`
},

// ── Lesson 9: Dictionaries & Sets ────────────────────────────────────────────
'blog-python-dicts.html': {
  slug:'dicts', lessonNum:9,
  title:'Python 3 Dictionaries &amp; Sets',
  desc:'Learn Python 3 dictionaries and sets — create, access, modify, iterate, nested dicts, dict comprehensions, and set operations with examples.',
  breadcrumb:'Dictionaries &amp; Sets', h1:'Python 3 — Dictionaries &amp; Sets',
  prev:{url:'/blog-python-lists.html',label:'Lists &amp; Tuples'},
  next:{url:'/blog-python-functions.html',label:'Functions &amp; Reusable Code'},
  intro:'Dictionaries store key-value pairs — like a real dictionary where you look up a word (key) to find its definition (value). Sets are unordered collections of unique items. Together they give you powerful ways to organize and query data efficiently.',
  content:`
<div class="section">
  <div class="section-title"><span class="num">1</span> Creating &amp; Accessing Dictionaries</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">Python 3 — Dictionary Basics</span><a class="try-btn" href="/?lang=python3">▶ Run Code</a></div>
    <pre><code># Creating a dictionary
student = {
    "name": "Balaji",
    "age": 25,
    "grade": "A",
    "subjects": ["Math", "Python", "DSA"]
}

# Accessing by key
print(student["name"])       # Balaji
print(student["age"])        # 25
print(student["subjects"])   # ['Math', 'Python', 'DSA']

# .get() — safe access (returns None if key missing)
print(student.get("email"))         # None
print(student.get("email", "N/A"))  # N/A (default value)

# Check if key exists
print("grade" in student)    # True
print("phone" in student)    # False</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Modifying Dictionaries</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">Python 3 — Modify Dict</span><a class="try-btn" href="/?lang=python3">▶ Run Code</a></div>
    <pre><code>profile = {"name": "Alice", "age": 30}

# Add new key-value
profile["email"] = "alice@example.com"
profile["city"] = "Hyderabad"
print(profile)

# Update existing value
profile["age"] = 31
print(profile["age"])  # 31

# Update multiple keys at once
profile.update({"age": 32, "phone": "9876543210"})
print(profile)

# Remove keys
del profile["phone"]         # Remove by key
removed = profile.pop("city") # Remove & return
print(f"Removed: {removed}")

# Clear all
temp = {"a": 1, "b": 2}
temp.clear()
print(temp)  # {}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Iterating Dictionaries</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">Python 3 — Dict Iteration</span><a class="try-btn" href="/?lang=python3">▶ Run Code</a></div>
    <pre><code>inventory = {
    "apples": 50,
    "bananas": 30,
    "oranges": 75,
    "mangoes": 20
}

# Iterate keys (default)
for fruit in inventory:
    print(fruit)

# Iterate keys explicitly
for key in inventory.keys():
    print(key)

# Iterate values
for quantity in inventory.values():
    print(quantity)

# Iterate key-value pairs (most useful!)
for fruit, qty in inventory.items():
    status = "✅ In Stock" if qty > 25 else "⚠️ Low Stock"
    print(f"{fruit}: {qty} units — {status}")</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">4</span> Dictionary Methods</div>
  <table class="tbl"><tr><th>Method</th><th>Description</th></tr>
    <tr><td><code>.keys()</code></td><td>Returns all keys</td></tr>
    <tr><td><code>.values()</code></td><td>Returns all values</td></tr>
    <tr><td><code>.items()</code></td><td>Returns (key, value) pairs</td></tr>
    <tr><td><code>.get(k, default)</code></td><td>Safe access with fallback</td></tr>
    <tr><td><code>.update(d)</code></td><td>Merge another dict</td></tr>
    <tr><td><code>.pop(k)</code></td><td>Remove &amp; return value</td></tr>
    <tr><td><code>.setdefault(k, v)</code></td><td>Set only if key missing</td></tr>
  </table>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">Python 3 — Dict Methods</span><a class="try-btn" href="/?lang=python3">▶ Run Code</a></div>
    <pre><code>scores = {"Alice": 92, "Bob": 78}

# setdefault — adds only if key doesn't exist
scores.setdefault("Charlie", 85)
scores.setdefault("Alice", 0)  # Alice already exists, not changed
print(scores)  # {'Alice': 92, 'Bob': 78, 'Charlie': 85}

# Merge dicts (Python 3.9+)
extra = {"Diana": 95, "Eve": 88}
all_scores = scores | extra
print(all_scores)

# Count word frequency
text = "the cat sat on the mat the cat"
word_freq = {}
for word in text.split():
    word_freq[word] = word_freq.get(word, 0) + 1
print(word_freq)</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">5</span> Nested Dictionaries</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">Python 3 — Nested Dicts</span><a class="try-btn" href="/?lang=python3">▶ Run Code</a></div>
    <pre><code>company = {
    "name": "TechCorp",
    "employees": {
        "E001": {"name": "Alice", "role": "Developer", "salary": 80000},
        "E002": {"name": "Bob",   "role": "Designer",  "salary": 70000},
        "E003": {"name": "Carol", "role": "Manager",   "salary": 90000}
    }
}

# Access nested values
print(company["name"])                         # TechCorp
print(company["employees"]["E001"]["name"])    # Alice
print(company["employees"]["E002"]["salary"])  # 70000

# Iterate nested dict
for emp_id, info in company["employees"].items():
    print(f"{emp_id}: {info['name']} ({info['role']}) — ₹{info['salary']:,}")</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">6</span> Python Sets</div>
  <p>Sets are <strong>unordered</strong> collections of <strong>unique</strong> values. Great for deduplication and membership tests:</p>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">Python 3 — Sets</span><a class="try-btn" href="/?lang=python3">▶ Run Code</a></div>
    <pre><code># Creating sets
fruits = {"apple", "banana", "cherry", "apple", "banana"}
print(fruits)  # Only unique: {'apple', 'banana', 'cherry'}

# Add and remove
fruits.add("mango")
fruits.discard("cherry")  # No error if not found
print(fruits)

# Fast membership test
print("apple" in fruits)   # True (faster than list!)
print("grape" in fruits)   # False

# Set operations
a = {1, 2, 3, 4, 5}
b = {4, 5, 6, 7, 8}

print(a | b)   # Union: {1,2,3,4,5,6,7,8}
print(a & b)   # Intersection: {4,5}
print(a - b)   # Difference: {1,2,3}
print(a ^ b)   # Symmetric diff: {1,2,3,6,7,8}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">7</span> Dict Comprehensions</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">Python 3 — Dict Comprehension</span><a class="try-btn" href="/?lang=python3">▶ Run Code</a></div>
    <pre><code># Basic dict comprehension: {key: value for item in iterable}
squares = {n: n**2 for n in range(1, 6)}
print(squares)  # {1: 1, 2: 4, 3: 9, 4: 16, 5: 25}

# With condition: word → length (only long words)
words = ["Python", "is", "an", "amazing", "language"]
long_words = {w: len(w) for w in words if len(w) > 3}
print(long_words)  # {'Python': 6, 'amazing': 7, 'language': 8}

# Invert a dictionary (swap keys and values)
original = {"a": 1, "b": 2, "c": 3}
inverted = {v: k for k, v in original.items()}
print(inverted)   # {1: 'a', 2: 'b', 3: 'c'}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">8</span> Coding Challenge</div>
  <p>Build a simple <strong>student grade book</strong>:</p>
  <ul>
    <li>Create a dictionary with 5 students and their list of 3 test scores each</li>
    <li>Calculate the average score for each student</li>
    <li>Determine their grade (A ≥ 90, B ≥ 80, C ≥ 70, F otherwise)</li>
    <li>Store results as: <code>{"Alice": {"avg": 87.3, "grade": "B"}}</code></li>
    <li>Find the top performer (highest average) and print their details</li>
    <li>Use a set to find which students scored 90+ in at least one test</li>
  </ul>
</div>`
},

// ── Lesson 11: Modules ────────────────────────────────────────────────────────
'blog-python-modules.html': {
  slug:'modules', lessonNum:11,
  title:'Python 3 Modules &amp; Standard Library',
  desc:'Learn Python 3 modules — import, from-import, math, random, datetime, os, sys, json, and how to create your own custom modules.',
  breadcrumb:'Modules &amp; Standard Lib', h1:'Python 3 — Modules &amp; Standard Library',
  prev:{url:'/blog-python-functions.html',label:'Functions &amp; Reusable Code'},
  next:{url:'/blog-python-files.html',label:'File I/O Operations'},
  intro:'A module is a Python file containing functions, classes, and variables that you can reuse in other programs. Python comes with a rich standard library of built-in modules for math, file handling, dates, networking, and much more — all ready to use without any installation.',
  content:`
<div class="section">
  <div class="section-title"><span class="num">1</span> Importing Modules</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">Python 3 — Import Syntax</span><a class="try-btn" href="/?lang=python3">▶ Run Code</a></div>
    <pre><code># Import entire module (access with module.function)
import math
print(math.sqrt(144))   # 12.0
print(math.pi)          # 3.14159...

# Import specific items (no prefix needed)
from math import sqrt, pi, factorial
print(sqrt(64))         # 8.0
print(pi)               # 3.14159...
print(factorial(5))     # 120

# Import with alias (rename for convenience)
import math as m
print(m.ceil(4.2))      # 5

from datetime import datetime as dt
print(dt.now())         # Current date and time</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> The math Module</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">Python 3 — math Module</span><a class="try-btn" href="/?lang=python3">▶ Run Code</a></div>
    <pre><code>import math

# Constants
print(math.pi)          # 3.141592653589793
print(math.e)           # 2.718281828459045
print(math.inf)         # inf
print(math.nan)         # nan

# Rounding
print(math.ceil(4.1))   # 5 (always rounds up)
print(math.floor(4.9))  # 4 (always rounds down)
print(round(4.5))       # 4 (banker's rounding)
print(round(4.567, 2))  # 4.57

# Powers & roots
print(math.sqrt(256))   # 16.0
print(math.pow(2, 10))  # 1024.0
print(math.log(100, 10))# 2.0 — log base 10

# Trigonometry
angle = math.radians(90)  # Convert degrees to radians
print(math.sin(angle))    # 1.0
print(math.cos(angle))    # ~0 (very small float)

# Number theory
print(math.gcd(48, 18))  # 6
print(math.lcm(4, 6))    # 12 (Python 3.9+)</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> The random Module</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">Python 3 — random Module</span><a class="try-btn" href="/?lang=python3">▶ Run Code</a></div>
    <pre><code>import random

# Random float between 0 and 1
print(random.random())           # e.g., 0.7482...

# Random integer in range (inclusive)
print(random.randint(1, 6))      # Dice roll: 1-6

# Random float in range
print(random.uniform(10.0, 20.0)) # e.g., 14.573...

# Choose random item from list
fruits = ["apple", "banana", "cherry", "mango"]
print(random.choice(fruits))     # e.g., "cherry"

# Shuffle a list in place
cards = list(range(1, 14))       # 1 to 13
random.shuffle(cards)
print(cards)                     # Shuffled

# Pick multiple unique items
winners = random.sample(range(1, 101), 3)  # 3 lottery numbers
print(f"Winners: {winners}")

# Seed for reproducible results
random.seed(42)
print(random.randint(1, 100))   # Always same with seed 42</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">4</span> The datetime Module</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">Python 3 — datetime Module</span><a class="try-btn" href="/?lang=python3">▶ Run Code</a></div>
    <pre><code>from datetime import datetime, date, timedelta

# Current date and time
now = datetime.now()
print(now)                           # e.g., 2026-07-22 12:30:45.123
print(now.year, now.month, now.day)  # 2026 7 22
print(now.hour, now.minute)          # 12 30

# Format date as string
formatted = now.strftime("%d %B %Y, %I:%M %p")
print(formatted)  # e.g., "22 July 2026, 12:30 PM"

# Parse string to datetime
birthday = datetime.strptime("1999-05-15", "%Y-%m-%d")
print(birthday)

# Date arithmetic with timedelta
today = date.today()
one_week = timedelta(days=7)
next_week = today + one_week
print(f"Next week: {next_week}")

# Calculate age
birth = date(1999, 5, 15)
age = (date.today() - birth).days // 365
print(f"Age: {age} years")</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">5</span> The os Module</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">Python 3 — os Module</span><a class="try-btn" href="/?lang=python3">▶ Run Code</a></div>
    <pre><code>import os

# Current working directory
print(os.getcwd())

# List files in directory
files = os.listdir(".")
print(files[:5])  # First 5 files

# Join paths (cross-platform safe)
home = os.path.expanduser("~")
docs = os.path.join(home, "Documents", "python_notes.txt")
print(docs)

# Path operations
filepath = "/home/balaji/projects/script.py"
print(os.path.dirname(filepath))   # /home/balaji/projects
print(os.path.basename(filepath))  # script.py
print(os.path.exists(filepath))    # True/False
print(os.path.splitext(filepath))  # ('/home/.../script', '.py')

# Environment variables
path = os.environ.get("PATH", "Not found")
print(path[:50] + "...")</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">6</span> The sys Module</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">Python 3 — sys Module</span><a class="try-btn" href="/?lang=python3">▶ Run Code</a></div>
    <pre><code>import sys

# Python version info
print(sys.version)
print(sys.version_info.major)  # 3

# Platform
print(sys.platform)   # 'win32', 'linux', 'darwin'

# Exit program (don't run in tutorial, just FYI)
# sys.exit(0)   # 0 = success, 1 = error

# Command line arguments
print(sys.argv)  # ['script.py', 'arg1', 'arg2']

# Maximum integer
print(sys.maxsize)     # 9223372036854775807

# Module search path
print(sys.path[:3])   # First 3 directories Python searches</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">7</span> Creating Custom Modules</div>
  <p>Any Python file (.py) can be a module. Save functions in a file and import them in another:</p>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">Python 3 — Custom Module</span><a class="try-btn" href="/?lang=python3">▶ Run Code</a></div>
    <pre><code># Imagine this is in "mymath.py":
# ─────────────────────────────────
# def add(a, b): return a + b
# def subtract(a, b): return a - b
# def average(*nums): return sum(nums) / len(nums)
# PI = 3.14159
# ─────────────────────────────────

# In another file, you'd import it:
# import mymath
# print(mymath.add(5, 3))      # 8
# print(mymath.PI)             # 3.14159
# print(mymath.average(1,2,3,4,5))  # 3.0

# The __name__ guard: code only runs when file is executed directly
# def main():
#     print("Running mymath directly!")
# if __name__ == "__main__":
#     main()

# Without this guard, code would also run when imported!

# For now, demonstrate with collections module
from collections import Counter, defaultdict
words = ["apple", "banana", "apple", "cherry", "banana", "apple"]
count = Counter(words)
print(count)                  # Counter({'apple': 3, ...})
print(count.most_common(2))   # [('apple', 3), ('banana', 2)]</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">8</span> Coding Challenge</div>
  <p>Write a program that uses multiple modules to:</p>
  <ul>
    <li>Generate 10 random lottery numbers (1-50, no repeats) using <code>random.sample()</code></li>
    <li>Calculate statistics (min, max, sum, average) using <code>math</code></li>
    <li>Display the current date using <code>datetime</code> in format "DD Month YYYY"</li>
    <li>Check how many days until a future date (e.g., New Year) using <code>timedelta</code></li>
    <li>Print the Python version and platform using <code>sys</code></li>
  </ul>
</div>`
},

// ── Lesson 12: Files ────────────────────────────────────────────────────────
'blog-python-files.html': {
  slug:'files', lessonNum:12,
  title:'Python 3 File I/O Operations',
  desc:'Learn Python 3 file handling — open, read, write, append files, with statement, CSV reading, JSON files, and os.path operations.',
  breadcrumb:'File I/O Operations', h1:'Python 3 — File I/O Operations',
  prev:{url:'/blog-python-modules.html',label:'Modules &amp; Standard Lib'},
  next:{url:'/blog-python-errors.html',label:'Exception Handling'},
  intro:'File I/O (Input/Output) lets your program read data from files and write results back to disk. This is essential for saving data between program runs, reading configuration, processing CSV data, and logging. Python makes file handling intuitive with its <code>open()</code> function and <code>with</code> statement.',
  content:`
<div class="section">
  <div class="section-title"><span class="num">1</span> Opening &amp; Reading Files</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">Python 3 — Reading Files</span><a class="try-btn" href="/?lang=python3">▶ Run Code</a></div>
    <pre><code># File modes:
# 'r'  — Read (default) — error if file doesn't exist
# 'w'  — Write — creates new or overwrites existing
# 'a'  — Append — adds to end of file
# 'x'  — Exclusive create — error if file exists
# 'b'  — Binary mode (add to others: 'rb', 'wb')

# Reading entire file (with statement auto-closes file)
# Create a test file first:
with open("example.txt", "w") as f:
    f.write("Hello, Python!\\n")
    f.write("File handling is easy.\\n")
    f.write("Line 3 here.\\n")

# Now read it back
with open("example.txt", "r") as f:
    content = f.read()    # Read entire file as string
    print(content)

# Read line by line
with open("example.txt", "r") as f:
    for line in f:
        print(line.strip())  # strip() removes newline chars</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Reading Methods</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">Python 3 — Read Methods</span><a class="try-btn" href="/?lang=python3">▶ Run Code</a></div>
    <pre><code># Create a sample file
lines_data = ["Alice,92,A\\n", "Bob,78,B\\n", "Charlie,85,B+\\n"]
with open("students.txt", "w") as f:
    f.writelines(lines_data)

# .read() — entire file as one string
with open("students.txt") as f:
    data = f.read()
    print(repr(data))

# .readline() — one line at a time
with open("students.txt") as f:
    first_line = f.readline()
    second_line = f.readline()
    print(first_line.strip())
    print(second_line.strip())

# .readlines() — all lines as a list
with open("students.txt") as f:
    all_lines = f.readlines()
    print(all_lines)
    print(f"Total lines: {len(all_lines)}")</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Writing &amp; Appending</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">Python 3 — Writing Files</span><a class="try-btn" href="/?lang=python3">▶ Run Code</a></div>
    <pre><code># Write mode ('w') — creates or OVERWRITES
with open("log.txt", "w") as f:
    f.write("=== Application Log ===\\n")
    f.write("Session started\\n")
    for i in range(1, 4):
        f.write(f"Event {i}: User action\\n")

# Append mode ('a') — adds to existing file
with open("log.txt", "a") as f:
    f.write("New event added\\n")
    f.write("Session ended\\n")

# writelines() — write a list of strings
data = [f"Student {i}: Score {i*10}\\n" for i in range(1, 6)]
with open("scores.txt", "w") as f:
    f.writelines(data)

# Read back to verify
with open("log.txt") as f:
    print(f.read())</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">4</span> Working with CSV Files</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">Python 3 — CSV Files</span><a class="try-btn" href="/?lang=python3">▶ Run Code</a></div>
    <pre><code>import csv

# Writing CSV
students = [
    ["Name", "Age", "Score", "Grade"],
    ["Alice", 20, 92, "A"],
    ["Bob", 22, 78, "B"],
    ["Charlie", 21, 85, "B+"]
]

with open("students.csv", "w", newline="") as f:
    writer = csv.writer(f)
    writer.writerows(students)

# Reading CSV
with open("students.csv", "r") as f:
    reader = csv.reader(f)
    header = next(reader)   # Skip header row
    print(f"Columns: {header}")
    for row in reader:
        name, age, score, grade = row
        print(f"{name}: Score {score} ({grade})")

# DictWriter — write with headers as keys
with open("data.csv", "w", newline="") as f:
    fieldnames = ["product", "price", "quantity"]
    writer = csv.DictWriter(f, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerow({"product": "Laptop", "price": 999.99, "quantity": 5})</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">5</span> JSON Files</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">Python 3 — JSON Files</span><a class="try-btn" href="/?lang=python3">▶ Run Code</a></div>
    <pre><code>import json

# Python dict to JSON file
config = {
    "app_name": "Our Compiler",
    "version": "2.0",
    "languages": ["Python", "Java", "C++"],
    "settings": {
        "theme": "dark",
        "font_size": 14
    }
}

# Write JSON
with open("config.json", "w") as f:
    json.dump(config, f, indent=2)  # indent for pretty print

# Read JSON back into Python dict
with open("config.json", "r") as f:
    loaded = json.load(f)
    print(loaded["app_name"])         # Our Compiler
    print(loaded["languages"])        # ['Python', 'Java', 'C++']
    print(loaded["settings"]["theme"]) # dark

# Convert dict to JSON string
json_str = json.dumps(config, indent=2)
print(json_str[:100] + "...")

# Parse JSON string to dict
data = json.loads('{"name": "Balaji", "age": 25}')
print(data["name"])  # Balaji</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">6</span> File &amp; Path Operations with os</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">Python 3 — os.path</span><a class="try-btn" href="/?lang=python3">▶ Run Code</a></div>
    <pre><code>import os

# Check if file exists before reading
filename = "example.txt"
if os.path.exists(filename):
    with open(filename) as f:
        print(f.read())
else:
    print(f"File '{filename}' not found!")

# File info
if os.path.exists(filename):
    size = os.path.getsize(filename)
    print(f"File size: {size} bytes")

# Create directory
os.makedirs("output/data", exist_ok=True)  # Creates nested dirs

# List files with specific extension
for f in os.listdir("."):
    if f.endswith(".txt"):
        print(f"Found text file: {f}")

# Rename and delete
# os.rename("old.txt", "new.txt")
# os.remove("temp.txt")</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">7</span> Safe File Operations with try-except</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">Python 3 — Safe File Ops</span><a class="try-btn" href="/?lang=python3">▶ Run Code</a></div>
    <pre><code>def read_file_safely(filename):
    """Read a file safely, returning None if it fails."""
    try:
        with open(filename, 'r') as f:
            return f.read()
    except FileNotFoundError:
        print(f"❌ Error: '{filename}' does not exist.")
        return None
    except PermissionError:
        print(f"❌ Error: No permission to read '{filename}'.")
        return None
    except Exception as e:
        print(f"❌ Unexpected error: {e}")
        return None

content = read_file_safely("example.txt")
if content:
    print(f"File loaded ({len(content)} chars)")

missing = read_file_safely("nonexistent.txt")
print(f"Result: {missing}")  # None</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">8</span> Coding Challenge</div>
  <p>Build a simple <strong>student grade tracker</strong> that:</p>
  <ul>
    <li>Writes 5 students with name, score to a CSV file</li>
    <li>Reads the CSV back and calculates the class average</li>
    <li>Writes a summary JSON file with: total students, average, highest score, lowest score</li>
    <li>Appends a log entry to "log.txt" with the current date and summary info</li>
    <li>Handles FileNotFoundError if any file is missing</li>
  </ul>
</div>`
},

// ── Lesson 13: Error Handling ──────────────────────────────────────────────
'blog-python-errors.html': {
  slug:'errors', lessonNum:13,
  title:'Python 3 Exception Handling',
  desc:'Learn Python 3 exception handling — try, except, else, finally, raise, custom exceptions, and common error types with practical examples.',
  breadcrumb:'Exception Handling', h1:'Python 3 — Exception Handling',
  prev:{url:'/blog-python-files.html',label:'File I/O Operations'},
  next:{url:'/blog-python-oop-basics.html',label:'OOP: Classes &amp; Objects'},
  intro:'Errors in Python are called <strong>exceptions</strong>. Instead of crashing your program when something goes wrong, Python lets you catch exceptions and handle them gracefully. This makes your programs robust, user-friendly, and production-ready.',
  content:`
<div class="section">
  <div class="section-title"><span class="num">1</span> Common Built-in Exceptions</div>
  <table class="tbl"><tr><th>Exception</th><th>Cause</th><th>Example</th></tr>
    <tr><td><code>ValueError</code></td><td>Wrong value type/format</td><td><code>int("hello")</code></td></tr>
    <tr><td><code>TypeError</code></td><td>Wrong data type</td><td><code>"a" + 5</code></td></tr>
    <tr><td><code>ZeroDivisionError</code></td><td>Division by zero</td><td><code>10 / 0</code></td></tr>
    <tr><td><code>IndexError</code></td><td>List index out of range</td><td><code>[1,2][5]</code></td></tr>
    <tr><td><code>KeyError</code></td><td>Dictionary key missing</td><td><code>d["x"]</code></td></tr>
    <tr><td><code>FileNotFoundError</code></td><td>File doesn't exist</td><td><code>open("x.txt")</code></td></tr>
    <tr><td><code>AttributeError</code></td><td>Object has no attribute</td><td><code>"hi".upper2()</code></td></tr>
    <tr><td><code>NameError</code></td><td>Variable not defined</td><td><code>print(x)</code></td></tr>
    <tr><td><code>ImportError</code></td><td>Module not found</td><td><code>import xyz</code></td></tr>
  </table>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Basic try-except</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">Python 3 — try-except</span><a class="try-btn" href="/?lang=python3">▶ Run Code</a></div>
    <pre><code># Without error handling — program crashes!
# num = int("hello")  # ValueError: invalid literal

# With error handling — program continues
try:
    num = int("hello")
    print(f"Number: {num}")
except ValueError as e:
    print(f"❌ ValueError: {e}")
    print("Please enter a valid number.")

print("Program continues running...")

# ZeroDivisionError
try:
    result = 100 / 0
    print(result)
except ZeroDivisionError:
    print("❌ Cannot divide by zero!")

# Multiple except blocks
try:
    data = [1, 2, 3]
    value = int("abc")
    item = data[10]
except ValueError:
    print("❌ Invalid number format")
except IndexError:
    print("❌ Index out of range")
except Exception as e:
    print(f"❌ Unexpected error: {e}")</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> try-except-else-finally</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">Python 3 — Full try Block</span><a class="try-btn" href="/?lang=python3">▶ Run Code</a></div>
    <pre><code>def divide(a, b):
    try:
        result = a / b
    except ZeroDivisionError:
        print("❌ Division by zero!")
        return None
    except TypeError:
        print("❌ Both values must be numbers!")
        return None
    else:
        # Runs ONLY when no exception occurred
        print(f"✅ Success! {a} / {b} = {result}")
        return result
    finally:
        # ALWAYS runs, even if there's an exception
        print("--- Division attempt complete ---")

divide(10, 2)    # Succeeds
print()
divide(10, 0)    # ZeroDivisionError
print()
divide("a", 2)   # TypeError</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">4</span> Raising Exceptions</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">Python 3 — raise</span><a class="try-btn" href="/?lang=python3">▶ Run Code</a></div>
    <pre><code>def set_age(age):
    if not isinstance(age, int):
        raise TypeError("Age must be an integer!")
    if age < 0 or age > 150:
        raise ValueError(f"Invalid age: {age}. Must be 0-150.")
    print(f"Age set to: {age}")

# Test valid age
set_age(25)

# Test invalid types
try:
    set_age("twenty")
except TypeError as e:
    print(f"TypeError: {e}")

# Test invalid range
try:
    set_age(-5)
except ValueError as e:
    print(f"ValueError: {e}")

# Re-raise an exception after logging
def process_file(filename):
    try:
        with open(filename) as f:
            return f.read()
    except FileNotFoundError:
        print(f"Log: File '{filename}' not found")
        raise  # Re-raise same exception</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">5</span> Custom Exception Classes</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">Python 3 — Custom Exceptions</span><a class="try-btn" href="/?lang=python3">▶ Run Code</a></div>
    <pre><code># Create custom exceptions by inheriting from Exception
class InsufficientFundsError(Exception):
    """Raised when a bank account has insufficient balance."""
    def __init__(self, balance, amount):
        self.balance = balance
        self.amount = amount
        self.message = f"Insufficient funds! Balance: ₹{balance}, Requested: ₹{amount}"
        super().__init__(self.message)

class InvalidAccountError(Exception):
    """Raised for invalid account numbers."""
    pass

# Bank account class using custom exceptions
class BankAccount:
    def __init__(self, account_id, balance):
        self.account_id = account_id
        self.balance = balance

    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("Withdrawal amount must be positive!")
        if amount > self.balance:
            raise InsufficientFundsError(self.balance, amount)
        self.balance -= amount
        print(f"✅ Withdrew ₹{amount}. New balance: ₹{self.balance}")

account = BankAccount("ACC001", 5000)
try:
    account.withdraw(3000)
    account.withdraw(3000)   # Will fail
except InsufficientFundsError as e:
    print(f"❌ {e}")
except ValueError as e:
    print(f"❌ {e}")</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">6</span> Exception Chaining</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">Python 3 — Exception Chaining</span><a class="try-btn" href="/?lang=python3">▶ Run Code</a></div>
    <pre><code># raise ... from ... — attach context to exceptions
def load_config(filename):
    try:
        with open(filename) as f:
            import json
            return json.load(f)
    except FileNotFoundError as e:
        raise RuntimeError(f"Config file missing: {filename}") from e
    except json.JSONDecodeError as e:
        raise ValueError(f"Config file is invalid JSON") from e

try:
    config = load_config("missing_config.json")
except RuntimeError as e:
    print(f"RuntimeError: {e}")
    print(f"Caused by: {e.__cause__}")</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">7</span> Context Managers &amp; with Statement</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">Python 3 — with Statement</span><a class="try-btn" href="/?lang=python3">▶ Run Code</a></div>
    <pre><code># 'with' ensures resources are always cleaned up
# Even if an exception occurs inside the block!

# File handling with 'with'
with open("safe.txt", "w") as f:
    f.write("Safe file handling!")
# File is automatically closed here, even if exception occurs

# Create a custom context manager using contextlib
from contextlib import contextmanager

@contextmanager
def timer():
    import time
    start = time.time()
    try:
        yield  # Control passes to the 'with' block
    finally:
        end = time.time()
        print(f"⏱️ Execution time: {end - start:.4f}s")

with timer():
    result = sum(range(1_000_000))
    print(f"Sum: {result}")</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">8</span> Coding Challenge</div>
  <p>Build a <strong>robust user registration system</strong>:</p>
  <ul>
    <li>Create custom exceptions: <code>UsernameTakenError</code>, <code>WeakPasswordError</code>, <code>InvalidEmailError</code></li>
    <li>Write a <code>register_user(username, email, password)</code> function that raises these exceptions for: taken usernames, passwords shorter than 8 chars, emails without "@", duplicate registrations</li>
    <li>Use a dictionary to store registered users</li>
    <li>Test with: a valid registration, duplicate username, weak password, and invalid email</li>
    <li>Use try-except-else to print success or appropriate error messages</li>
  </ul>
</div>`
},

// ── Lesson 14: OOP Basics ────────────────────────────────────────────────────
'blog-python-oop-basics.html': {
  slug:'oop-basics', lessonNum:14,
  title:'Python 3 OOP: Classes &amp; Objects',
  desc:'Learn Python 3 OOP — define classes, create objects, __init__ constructor, instance methods, class variables, properties, and encapsulation.',
  breadcrumb:'OOP: Classes &amp; Objects', h1:'Python 3 — OOP: Classes &amp; Objects',
  prev:{url:'/blog-python-errors.html',label:'Exception Handling'},
  next:{url:'/blog-python-oop-advanced.html',label:'OOP: Inheritance &amp; Dunder'},
  intro:'Object-Oriented Programming (OOP) is a programming paradigm that organizes code around <strong>objects</strong> — data structures that bundle related data and behavior together. Python is a fully object-oriented language. Classes are the blueprints; objects are the real things built from those blueprints.',
  content:`
<div class="section">
  <div class="section-title"><span class="num">1</span> What is a Class?</div>
  <p>A class is a blueprint for creating objects. Think of it like a cookie cutter — the cutter is the class, and the cookies are the objects (instances):</p>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">Python 3 — First Class</span><a class="try-btn" href="/?lang=python3">▶ Run Code</a></div>
    <pre><code># Define a class
class Dog:
    # Class variable — shared by ALL instances
    species = "Canis familiaris"

    # Constructor — called when creating an object
    def __init__(self, name, breed, age):
        # Instance variables — unique to each object
        self.name = name
        self.breed = breed
        self.age = age

    # Instance method
    def bark(self):
        return f"{self.name} says: Woof! Woof!"

    def describe(self):
        return f"{self.name} is a {self.age}-year-old {self.breed}."

# Create objects (instances)
dog1 = Dog("Buddy", "Golden Retriever", 3)
dog2 = Dog("Max", "German Shepherd", 5)

print(dog1.name)          # Buddy
print(dog2.breed)         # German Shepherd
print(dog1.bark())        # Buddy says: Woof! Woof!
print(dog2.describe())    # Max is a 5-year-old German Shepherd.
print(Dog.species)        # Canis familiaris (class variable)</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> The __init__ Constructor</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">Python 3 — __init__</span><a class="try-btn" href="/?lang=python3">▶ Run Code</a></div>
    <pre><code>class BankAccount:
    def __init__(self, owner, initial_balance=0):
        self.owner = owner
        self.balance = initial_balance
        self.transactions = []   # Mutable default must be in __init__!

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Deposit must be positive!")
        self.balance += amount
        self.transactions.append(f"Deposit: +₹{amount}")
        print(f"✅ Deposited ₹{amount}. Balance: ₹{self.balance}")

    def withdraw(self, amount):
        if amount > self.balance:
            raise ValueError("Insufficient funds!")
        self.balance -= amount
        self.transactions.append(f"Withdrawal: -₹{amount}")
        print(f"✅ Withdrew ₹{amount}. Balance: ₹{self.balance}")

    def statement(self):
        print(f"\\n=== Statement for {self.owner} ===")
        for t in self.transactions:
            print(f"  {t}")
        print(f"  Current Balance: ₹{self.balance}")

acc = BankAccount("Balaji", 10000)
acc.deposit(5000)
acc.withdraw(3000)
acc.statement()</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Instance vs Class Variables</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">Python 3 — Variable Types</span><a class="try-btn" href="/?lang=python3">▶ Run Code</a></div>
    <pre><code>class Employee:
    # Class variable — shared by ALL employees
    company = "TechCorp"
    employee_count = 0

    def __init__(self, name, role, salary):
        # Instance variables — unique to each employee
        self.name = name
        self.role = role
        self.salary = salary
        Employee.employee_count += 1  # Update class variable

    def get_info(self):
        return f"{self.name} ({self.role}) at {Employee.company}"

emp1 = Employee("Alice", "Developer", 80000)
emp2 = Employee("Bob", "Designer", 70000)

print(emp1.get_info())         # Alice (Developer) at TechCorp
print(emp2.get_info())         # Bob (Designer) at TechCorp
print(f"Total employees: {Employee.employee_count}")  # 2

# Class variable affects ALL instances
Employee.company = "MegaCorp"
print(emp1.get_info())   # Alice (Developer) at MegaCorp
print(emp2.get_info())   # Bob (Designer) at MegaCorp</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">4</span> Properties &amp; Encapsulation</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">Python 3 — Properties</span><a class="try-btn" href="/?lang=python3">▶ Run Code</a></div>
    <pre><code>class Circle:
    def __init__(self, radius):
        self._radius = radius   # _ prefix = "private by convention"

    @property
    def radius(self):
        """Getter — access like an attribute"""
        return self._radius

    @radius.setter
    def radius(self, value):
        """Setter — validates before setting"""
        if value < 0:
            raise ValueError("Radius cannot be negative!")
        self._radius = value

    @property
    def diameter(self):
        return self._radius * 2

    @property
    def area(self):
        import math
        return math.pi * self._radius ** 2

    @property
    def circumference(self):
        import math
        return 2 * math.pi * self._radius

c = Circle(5)
print(f"Radius: {c.radius}")         # 5
print(f"Diameter: {c.diameter}")     # 10
print(f"Area: {c.area:.2f}")         # 78.54
c.radius = 10                         # Uses setter
print(f"New radius: {c.radius}")</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">5</span> Static &amp; Class Methods</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">Python 3 — Static &amp; Class Methods</span><a class="try-btn" href="/?lang=python3">▶ Run Code</a></div>
    <pre><code>class Temperature:
    def __init__(self, celsius):
        self.celsius = celsius

    @property
    def fahrenheit(self):
        return (self.celsius * 9/5) + 32

    @classmethod
    def from_fahrenheit(cls, f):
        """Alternative constructor from Fahrenheit."""
        return cls((f - 32) * 5/9)

    @staticmethod
    def is_freezing(celsius):
        """Utility — doesn't need class or instance."""
        return celsius <= 0

    def __str__(self):
        return f"{self.celsius}°C / {self.fahrenheit}°F"

# Instance method
t1 = Temperature(100)
print(t1)                          # 100°C / 212.0°F

# Class method — alternative constructor
t2 = Temperature.from_fahrenheit(98.6)
print(t2)                          # 37.0°C / 98.6°F

# Static method — no instance needed
print(Temperature.is_freezing(0))   # True
print(Temperature.is_freezing(25))  # False</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">6</span> __str__ and __repr__</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">Python 3 — String Representation</span><a class="try-btn" href="/?lang=python3">▶ Run Code</a></div>
    <pre><code>class Product:
    def __init__(self, name, price, quantity):
        self.name = name
        self.price = price
        self.quantity = quantity

    def __str__(self):
        """Human-readable string — used by print()"""
        return f"{self.name}: ₹{self.price} (Stock: {self.quantity})"

    def __repr__(self):
        """Developer-friendly — used in REPL, lists"""
        return f"Product(name={self.name!r}, price={self.price}, qty={self.quantity})"

    def total_value(self):
        return self.price * self.quantity

p = Product("Laptop", 59999, 10)
print(p)           # Product.__str__: Laptop: ₹59999 (Stock: 10)
print(repr(p))     # Product.__repr__: Product(name='Laptop', ...)

products = [p, Product("Mouse", 999, 50)]
print(products)    # Uses __repr__ for list display</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">7</span> Dataclasses (Python 3.7+)</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">Python 3.7+ — dataclass</span><a class="try-btn" href="/?lang=python3">▶ Run Code</a></div>
    <pre><code">from dataclasses import dataclass, field

@dataclass
class Student:
    name: str
    age: int
    score: float = 0.0
    subjects: list = field(default_factory=list)

    def grade(self):
        if self.score >= 90: return "A"
        if self.score >= 80: return "B"
        if self.score >= 70: return "C"
        return "F"

    def __post_init__(self):
        """Runs after __init__ — for validation"""
        if self.age < 5 or self.age > 100:
            raise ValueError(f"Invalid age: {self.age}")

s1 = Student("Alice", 20, 92.5, ["Math", "Python"])
s2 = Student("Bob", 22, 78.0)

print(s1)           # Student(name='Alice', age=20, ...)
print(s1.grade())   # A
print(s2.grade())   # B</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">8</span> Coding Challenge</div>
  <p>Build a <strong>Library Management System</strong> using classes:</p>
  <ul>
    <li><code>Book</code> class: title, author, isbn, available (default True)</li>
    <li><code>Library</code> class with a list of books and these methods:
      <ul>
        <li><code>add_book(book)</code> — add a Book</li>
        <li><code>borrow_book(isbn)</code> — sets available=False (raises ValueError if not available)</li>
        <li><code>return_book(isbn)</code> — sets available=True</li>
        <li><code>search(query)</code> — finds books by title or author</li>
        <li><code>available_books()</code> — lists only available books</li>
      </ul>
    </li>
    <li>Add <code>__str__</code> to both classes for nice display</li>
  </ul>
</div>`
},

// ── Lesson 15: OOP Advanced ──────────────────────────────────────────────────
'blog-python-oop-advanced.html': {
  slug:'oop-advanced', lessonNum:15,
  title:'Python 3 OOP: Inheritance &amp; Dunder Methods',
  desc:'Learn Python 3 advanced OOP — inheritance, method overriding, super(), multiple inheritance, dunder methods, abstract classes, and polymorphism.',
  breadcrumb:'OOP: Inheritance &amp; Dunder', h1:'Python 3 — OOP: Inheritance &amp; Dunder Methods',
  prev:{url:'/blog-python-oop-basics.html',label:'OOP: Classes &amp; Objects'},
  next:{url:'/blog-python-comprehensions.html',label:'List Comprehensions'},
  intro:'Inheritance is one of the most powerful features of OOP. It allows a class to <em>inherit</em> the attributes and methods of another class, promoting code reuse and building logical hierarchies. Dunder (double underscore) methods let you customize how Python\'s built-in operations behave for your custom classes.',
  content:`
<div class="section">
  <div class="section-title"><span class="num">1</span> Basic Inheritance</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">Python 3 — Inheritance</span><a class="try-btn" href="/?lang=python3">▶ Run Code</a></div>
    <pre><code># Parent class (Base class)
class Animal:
    def __init__(self, name, species):
        self.name = name
        self.species = species
        self.is_alive = True

    def eat(self):
        print(f"{self.name} is eating.")

    def sleep(self):
        print(f"{self.name} is sleeping. Zzzz...")

    def __str__(self):
        return f"{self.name} ({self.species})"

# Child class inherits from Animal
class Dog(Animal):
    def __init__(self, name, breed):
        super().__init__(name, "Canis familiaris")  # Call parent's __init__
        self.breed = breed

    # New method — only for Dog
    def fetch(self, item="ball"):
        print(f"{self.name} fetches the {item}!")

    # Overriding parent method
    def __str__(self):
        return f"{self.name} the {self.breed}"

class Cat(Animal):
    def __init__(self, name, indoor=True):
        super().__init__(name, "Felis catus")
        self.indoor = indoor

    def purr(self):
        print(f"{self.name}: Purrrrr...")

# Creating instances
dog = Dog("Buddy", "Golden Retriever")
cat = Cat("Whiskers")

dog.eat()       # Inherited from Animal
dog.fetch()     # Dog-specific
cat.sleep()     # Inherited from Animal
cat.purr()      # Cat-specific
print(dog)      # Uses Dog's __str__</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Method Overriding &amp; super()</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">Python 3 — Method Override</span><a class="try-btn" href="/?lang=python3">▶ Run Code</a></div>
    <pre><code">class Shape:
    def __init__(self, color="white"):
        self.color = color

    def area(self):
        return 0  # Default implementation

    def describe(self):
        return f"A {self.color} {type(self).__name__} with area {self.area():.2f}"

class Rectangle(Shape):
    def __init__(self, width, height, color="blue"):
        super().__init__(color)
        self.width = width
        self.height = height

    def area(self):               # Override parent's area()
        return self.width * self.height

    def perimeter(self):
        return 2 * (self.width + self.height)

class Circle(Shape):
    def __init__(self, radius, color="red"):
        super().__init__(color)
        self.radius = radius

    def area(self):               # Override parent's area()
        import math
        return math.pi * self.radius ** 2

r = Rectangle(5, 10)
c = Circle(7)
print(r.describe())    # A blue Rectangle with area 50.00
print(c.describe())    # A red Circle with area 153.94</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Polymorphism</div>
  <p>Polymorphism means different classes can be used interchangeably as long as they share the same interface (methods):</p>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">Python 3 — Polymorphism</span><a class="try-btn" href="/?lang=python3">▶ Run Code</a></div>
    <pre><code">class Dog:
    def speak(self):
        return "Woof!"

class Cat:
    def speak(self):
        return "Meow!"

class Duck:
    def speak(self):
        return "Quack!"

# Polymorphism in action — same interface, different behavior
animals = [Dog(), Cat(), Duck(), Dog(), Cat()]

for animal in animals:
    # Each calls its own speak() — Python figures it out!
    print(f"{type(animal).__name__}: {animal.speak()}")

# Function that works with any animal
def make_noise(animal):
    print(f"The {type(animal).__name__} says: {animal.speak()}")

make_noise(Dog())
make_noise(Cat())</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">4</span> Multiple Inheritance &amp; MRO</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">Python 3 — Multiple Inheritance</span><a class="try-btn" href="/?lang=python3">▶ Run Code</a></div>
    <pre><code">class Flyable:
    def fly(self):
        return f"{self.__class__.__name__} is flying!"

class Swimmable:
    def swim(self):
        return f"{self.__class__.__name__} is swimming!"

class Walkable:
    def walk(self):
        return f"{self.__class__.__name__} is walking!"

class Duck(Flyable, Swimmable, Walkable):
    def quack(self):
        return "Quack!"

class FlyingFish(Flyable, Swimmable):
    pass

donald = Duck()
print(donald.fly())    # Duck is flying!
print(donald.swim())   # Duck is swimming!
print(donald.walk())   # Duck is walking!
print(donald.quack())  # Quack!

# MRO — Method Resolution Order
print(Duck.__mro__)    # Order Python searches for methods</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">5</span> Dunder (Magic) Methods</div>
  <p>Dunder methods let your classes work with Python's built-in operators and functions:</p>
  <table class="tbl"><tr><th>Method</th><th>Triggered by</th></tr>
    <tr><td><code>__str__</code></td><td><code>print(obj)</code>, <code>str(obj)</code></td></tr>
    <tr><td><code>__repr__</code></td><td><code>repr(obj)</code>, REPL display</td></tr>
    <tr><td><code>__len__</code></td><td><code>len(obj)</code></td></tr>
    <tr><td><code>__add__</code></td><td><code>obj1 + obj2</code></td></tr>
    <tr><td><code>__eq__</code></td><td><code>obj1 == obj2</code></td></tr>
    <tr><td><code>__lt__</code></td><td><code>obj1 &lt; obj2</code></td></tr>
    <tr><td><code>__getitem__</code></td><td><code>obj[key]</code></td></tr>
    <tr><td><code>__contains__</code></td><td><code>item in obj</code></td></tr>
    <tr><td><code>__iter__</code></td><td><code>for item in obj</code></td></tr>
  </table>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">Python 3 — Dunder Methods</span><a class="try-btn" href="/?lang=python3">▶ Run Code</a></div>
    <pre><code">class Vector:
    """2D Vector class with operator overloading."""
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __str__(self):
        return f"Vector({self.x}, {self.y})"

    def __repr__(self):
        return f"Vector(x={self.x}, y={self.y})"

    def __add__(self, other):    # v1 + v2
        return Vector(self.x + other.x, self.y + other.y)

    def __sub__(self, other):    # v1 - v2
        return Vector(self.x - other.x, self.y - other.y)

    def __mul__(self, scalar):   # v * number
        return Vector(self.x * scalar, self.y * scalar)

    def __eq__(self, other):     # v1 == v2
        return self.x == other.x and self.y == other.y

    def __abs__(self):           # abs(v) — magnitude
        return (self.x**2 + self.y**2) ** 0.5

v1 = Vector(3, 4)
v2 = Vector(1, 2)
print(v1 + v2)        # Vector(4, 6)
print(v1 - v2)        # Vector(2, 2)
print(v1 * 3)         # Vector(9, 12)
print(v1 == v2)       # False
print(abs(v1))        # 5.0 (Pythagorean theorem)</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">6</span> Abstract Classes</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">Python 3 — Abstract Classes</span><a class="try-btn" href="/?lang=python3">▶ Run Code</a></div>
    <pre><code">from abc import ABC, abstractmethod

class PaymentProcessor(ABC):
    """Abstract base class for payment processors."""

    @abstractmethod
    def process_payment(self, amount):
        """All subclasses MUST implement this."""
        pass

    @abstractmethod
    def refund(self, amount, transaction_id):
        pass

    def get_fee(self, amount):
        """Concrete method — shared by all processors."""
        return amount * 0.02

class StripeProcessor(PaymentProcessor):
    def process_payment(self, amount):
        fee = self.get_fee(amount)
        print(f"Stripe: Processing ₹{amount} (fee: ₹{fee:.2f})")
        return "TXN_STRIPE_001"

    def refund(self, amount, txn_id):
        print(f"Stripe: Refunding ₹{amount} for {txn_id}")

# Can't instantiate abstract class:
# p = PaymentProcessor()  # TypeError!

stripe = StripeProcessor()
txn = stripe.process_payment(1000)
stripe.refund(200, txn)</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">7</span> isinstance() &amp; issubclass()</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">Python 3 — isinstance &amp; issubclass</span><a class="try-btn" href="/?lang=python3">▶ Run Code</a></div>
    <pre><code">class Animal: pass
class Dog(Animal): pass
class Cat(Animal): pass

d = Dog()
c = Cat()

# isinstance — checks object type
print(isinstance(d, Dog))      # True
print(isinstance(d, Animal))   # True (Dog IS an Animal)
print(isinstance(d, Cat))      # False

# issubclass — checks class hierarchy
print(issubclass(Dog, Animal)) # True
print(issubclass(Cat, Dog))    # False

# Practical use in functions
def make_sound(animal):
    if isinstance(animal, Dog):
        print("Woof!")
    elif isinstance(animal, Cat):
        print("Meow!")
    else:
        print("...")</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">8</span> Coding Challenge</div>
  <p>Build a <strong>shape hierarchy</strong> with operator overloading:</p>
  <ul>
    <li>Abstract base <code>Shape</code> with abstract <code>area()</code> and <code>perimeter()</code></li>
    <li>Concrete classes: <code>Rectangle</code>, <code>Circle</code>, <code>Triangle</code></li>
    <li>Each class should implement <code>__str__</code>, <code>__eq__</code> (same area), and <code>__lt__</code> (smaller area)</li>
    <li>Create a list of mixed shapes, sort them by area using <code>sorted()</code></li>
    <li>Use <code>isinstance()</code> to count how many of each type exist</li>
    <li>Find the shape with the largest area using <code>max()</code></li>
  </ul>
</div>`
},

};

// ─── WRITE FILES ──────────────────────────────────────────────────────────────

let count = 0;
for (const [filename, lesson] of Object.entries(lessons)) {
  const filePath = path.join(PUBLIC, filename);

  const html = getSharedHeader(lesson) + `
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
    <div class="intro-box"><p>${lesson.intro}</p></div>
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
  </main>
</div>
</body>
</html>`;

  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`✅ ${filename} (${(html.length/1024).toFixed(1)} KB)`);
  count++;
}

console.log(`\n🎉 Done! Expanded ${count} more Python lesson files.`);
