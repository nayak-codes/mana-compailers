// Phase 5: Modules & Packages Data
module.exports = [
  // =========================================================================
  // CHAPTER 20: PYTHON MODULES & IMPORT SYSTEM
  // =========================================================================
  {
    num: 20,
    phaseId: 'phase5',
    phaseTitle: 'Phase 5: Modules and Packages',
    slug: '20-python-modules-and-import-system',
    title: 'Python Modules & Import System',
    badge: '20. Modules & Imports',
    subtopics: 'Module Architecture · sys.path · import & from..import · Aliases (as) · __name__ == "__main__" · Custom Modules',
    desc: 'Master the Python module architecture: physical files vs runtime module objects, sys.modules caching, sys.path resolution hierarchy, import syntax patterns, aliases, and the __name__ == "__main__" idiom.',
    sections: [
      {
        title: '1. What is a Module? Physical Files vs In-Memory Module Objects',
        body: `<p>In Python, a <strong>module</strong> is a file with a <code>.py</code> extension containing executable Python statements, function definitions, classes, and global variables. Modules are the fundamental architectural building block for code organization, reusability, and namespace encapsulation.</p>
        <p>When Python encounters an <code>import</code> statement for the first time, it performs three operations behind the scenes:</p>
        <ol>
          <li><strong>Locates the file:</strong> Searches through the directories configured in <code>sys.path</code>.</li>
          <li><strong>Compiles to Bytecode:</strong> Parses source code into bytecode (.pyc) and caches it inside the <code>__pycache__/</code> directory to accelerate future startups.</li>
          <li><strong>Executes and Caches in Memory:</strong> Executes the top-level statements from top to bottom, creates a new <code>module</code> type object, and stores a reference to it in the global <code>sys.modules</code> dictionary table.</li>
        </ol>
        <div class="diagram-box">┌────────────────────────────────────────────────────────┐
│  Python Module Import Pipeline                         │
│                                                        │
│  1. Check sys.modules cache (Avoid re-executing)       │
│  2. Search sys.path directory list                     │
│  3. Compile .py -> .pyc bytecode in __pycache__        │
│  4. Bind module namespace to caller's local scope      │
└────────────────────────────────────────────────────────┘</div>
        <p>Because Python caches imported modules in <code>sys.modules</code>, importing the same module 100 times across 100 different files executes the module's initialization code <strong>only once</strong>!</p>`,
        code: `# Inspecting module metadata and the sys.modules cache:
import math
import sys

print("Module Object:", math)
print("Module Name (__name__):", math.__name__)
print("Module Docstring:", math.__doc__[:60], "...")
print("Is 'math' cached in sys.modules?", 'math' in sys.modules)`,
        codeTitle: 'Example 1: Inspecting Module Metadata and Runtime Cache',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Architectural Insight:</strong>
          <ul style="margin:8px 0 0 18px; line-height:1.7;">
            <li><code>math</code> is a built-in C-extension module compiled directly into the CPython binary.</li>
            <li><code>sys.modules['math']</code> holds the live module object in memory. Subsequent <code>import math</code> calls merely return this cached reference in $O(1)$ time.</li>
          </ul>
        </div>`
      },
      {
        title: '2. The 3 Import Mechanisms (import, from..import, Aliases as)',
        body: `<p>Python provides three flexible syntax patterns to bring module members into your current namespace:</p>
        <h4 style="color:#10b981; margin:16px 0 8px;">1. Standard <code>import module_name</code>:</h4>
        <p>Brings the entire module into your namespace as a qualified prefix (e.g. <code>math.sqrt(16)</code>). This is the safest approach because it avoids any risk of naming collisions with your local variables.</p>
        <h4 style="color:#10b981; margin:16px 0 8px;">2. Specific <code>from module_name import item1, item2</code>:</h4>
        <p>Brings specific functions or classes directly into your local scope so you can call <code>sqrt(16)</code> without prefixing <code>math.</code>.</p>
        <h4 style="color:#10b981; margin:16px 0 8px;">3. Renaming Aliases with <code>as</code>:</h4>
        <p>Provides a concise or disambiguated shorthand name for lengthy module names (e.g. <code>import datetime as dt</code> or <code>import numpy as np</code>).</p>
        <div class="callout" style="margin:16px 0;">
          <strong style="color:#ef4444;">⚠️ Why "from module import *" is an Anti-Pattern:</strong><br>
          Wildcard imports dump all public identifiers into your local namespace. This causes silent variable shadowing, ruins IDE autocomplete and static type checkers, and makes tracking where a function came from nearly impossible.
        </div>`,
        code: `# Method 1: Standard import with full qualification
import math
res1 = math.pow(2, 3)

# Method 2: Importing specific members directly
from math import sqrt, pi
res2 = sqrt(144)

# Method 3: Importing with clean alias
import datetime as dt
current_year = dt.datetime.now().year

print(f"2 ** 3 = {res1}")
print(f"Square root of 144 = {res2}")
print(f"Value of Pi = {pi:.4f}")
print(f"Current Year via 'dt' alias: {current_year}")`,
        codeTitle: 'Example 2: The Three Modern Import Mechanisms',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Namespace Comparison:</strong>
          <p style="margin-top:6px;">Method 1 keeps your namespace clean under <code>math.*</code>. Method 2 injects <code>sqrt</code> and <code>pi</code> directly. Method 3 simplifies access while preserving modular clarity.</p>
        </div>`
      },
      {
        title: '3. How Python Locates Modules: The sys.path Search Order',
        body: `<p>When you execute <code>import my_module</code>, Python does not search your entire hard drive. Instead, it searches a precise, ordered list of directory path strings stored in <code>sys.path</code>:</p>
        <ol>
          <li><strong>Current Directory:</strong> The directory containing the script that was executed from the terminal (or current working directory in interactive shells).</li>
          <li><strong>PYTHONPATH Environment Variable:</strong> Any custom directory paths configured by the developer in the operating system environment.</li>
          <li><strong>Standard Library Directories:</strong> The directory where official Python modules (like <code>math</code>, <code>json</code>, <code>os</code>) are installed.</li>
          <li><strong>Site-Packages (Third-Party Packages):</strong> The directory where packages installed via <code>pip</code> (like <code>requests</code>, <code>fastapi</code>, <code>pandas</code>) live.</li>
        </ol>
        <p>If Python searches all directories in <code>sys.path</code> without finding a matching <code>.py</code> file or compiled C extension, it halts and raises a <code>ModuleNotFoundError: No module named '...'</code> exception.</p>`,
        code: `import sys

print("--- 🔍 Python Module Search Paths (sys.path) ---")
for index, directory_path in enumerate(sys.path, start=1):
    print(f"{index}. {directory_path}")`,
        codeTitle: 'Example 3: Inspecting Python sys.path Resolution List',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Dynamic Path Manipulation:</strong>
          <p style="margin-top:6px;">You can dynamically append new search folders at runtime using <code>sys.path.append('/custom/path')</code> if your project structure requires loading modules from external directories.</p>
        </div>`
      },
      {
        title: '4. The Sacred Idiom: if __name__ == "__main__": Explained',
        body: `<p>Every Python module has a built-in special variable named <code>__name__</code> automatically set by the CPython interpreter:</p>
        <ul>
          <li>When you execute a file <strong>directly from the terminal</strong> (e.g. <code>python app.py</code>), Python sets <code>__name__ = "__main__"</code>.</li>
          <li>When a file is <strong>imported into another script</strong> (e.g. <code>import app</code>), Python sets <code>__name__ = "app"</code> (the actual module name).</li>
        </ul>
        <div class="diagram-box">Direct Terminal Execution:     python script.py  ==>  __name__ = "__main__" (Boilerplate runs!)
Imported as Module in Code:    import script     ==>  __name__ = "script"   (Boilerplate skipped!)</div>
        <p>This allows a Python file to act as <strong>both a reusable library of functions AND an executable standalone script</strong> with unit tests or CLI demos!</p>`,
        code: `# geometry_helper.py
def calculate_circle_area(radius):
    """Reusable function for calculating circle area."""
    import math
    return math.pi * (radius ** 2)

def calculate_perimeter(radius):
    """Reusable function for calculating circumference."""
    import math
    return 2 * math.pi * radius

# The __name__ check ensures this test block only runs when executed directly:
if __name__ == "__main__":
    print("--- 🧪 Running geometry_helper.py Standalone Tests ---")
    test_r = 5
    print(f"Test Radius: {test_r}")
    print(f"Calculated Area: {calculate_circle_area(test_r):.2f}")
    print(f"Calculated Perimeter: {calculate_perimeter(test_r):.2f}")`,
        codeTitle: 'Example 4: Dual-Purpose Module with __name__ == "__main__"',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Why this is mandatory in professional codebases:</strong>
          <p style="margin-top:6px;">Without <code>if __name__ == "__main__":</code>, any testing code or prints would automatically execute and pollute the output whenever another developer writes <code>import geometry_helper</code>.</p>
        </div>`
      }
    ],
    mistake: {
      title: 'Naming Custom Files After Built-in Modules (e.g. random.py or math.py)',
      text: 'If you create a script named random.py or math.py in your project folder, Python\'s sys.path priority #1 (current directory) causes Python to import your empty file instead of the official standard library module, causing AttributeError: module \'random\' has no attribute \'randint\'.'
    },
    tryIt: {
      desc: 'Import the built-in math and statistics modules to compute the hypotenuse of a right triangle (math.hypot(3, 4)) and the mean of a list of numbers.',
      code: `import math
import statistics as stats

hypotenuse = math.hypot(3, 4)
print("Hypotenuse (3, 4):", hypotenuse)

dataset = [10, 20, 30, 40, 50]
print("Dataset:", dataset)
print("Mean:", stats.mean(dataset))`
    },
    faqs: [
      {
        q: 'What is the purpose of the __pycache__ directory?',
        a: '__pycache__ stores compiled bytecode (.pyc files) generated by CPython. When you re-run a script without modifying its source code, Python skips parsing and compilation, loading cached bytecode directly.'
      },
      {
        q: 'What is the difference between a module and a script in Python?',
        a: 'A script is designed to run directly from the command line to perform a task. A module is designed to be imported into other files to provide reusable functions and classes.'
      },
      {
        q: 'Can I reload an imported module at runtime without restarting Python?',
        a: 'Yes! Use the standard library importlib module: import importlib; importlib.reload(my_module).'
      }
    ]
  },

  // =========================================================================
  // CHAPTER 21: PYTHON CORE STANDARD LIBRARY MODULES
  // =========================================================================
  {
    num: 21,
    phaseId: 'phase5',
    phaseTitle: 'Phase 5: Modules and Packages',
    slug: '21-python-core-standard-library-modules',
    title: 'Python Standard Library Core',
    badge: '21. Standard Library Core',
    subtopics: 'math · random · datetime · statistics · High-Performance Utilities · Reproducible Seeds',
    desc: 'Deep dive into Python\'s "batteries included" core standard library: precision mathematical computing with math, random generation with random, date/time arithmetic with datetime, and statistical calculations with statistics.',
    sections: [
      {
        title: '1. The "Batteries Included" Philosophy & math Module',
        body: `<p>Python follows a philosophy known as <strong>"Batteries Included"</strong>. This means the standard library ships with an immense collection of battle-tested, high-performance C-optimized modules ready for immediate use without installing external packages.</p>
        <p>The <strong><code>math</code> module</strong> provides access to mathematical functions defined by the C standard library:</p>
        <ul>
          <li><strong>Constants:</strong> <code>math.pi</code> (3.14159...), <code>math.e</code> (2.71828...), <code>math.tau</code> ($2\\pi$), <code>math.inf</code>, <code>math.nan</code>.</li>
          <li><strong>Rounding:</strong> <code>math.floor()</code> (rounds down), <code>math.ceil()</code> (rounds up), <code>math.trunc()</code> (truncates decimals).</li>
          <li><strong>Power & Logarithms:</strong> <code>math.sqrt()</code>, <code>math.pow()</code>, <code>math.log()</code> (natural log), <code>math.log10()</code>, <code>math.log2()</code>.</li>
          <li><strong>Combinatorics:</strong> <code>math.factorial(n)</code>, <code>math.comb(n, k)</code> (combinations), <code>math.gcd(a, b)</code> (greatest common divisor).</li>
        </ul>`,
        code: `import math

# 1. Rounding operations
print("Ceil of 4.2: ", math.ceil(4.2))   # 5
print("Floor of 4.8:", math.floor(4.8))  # 4

# 2. Factorial and Combinations
print("\\n5! (Factorial):", math.factorial(5)) # 120
print("Combinations of 5 choose 2:", math.comb(5, 2)) # 10

# 3. Trigonometry and Geometry (Angles in Radians)
angle_rad = math.radians(90) # Convert 90 degrees to pi/2 radians
print("sin(90 degrees):", math.sin(angle_rad))
print("Hypotenuse of 6 and 8:", math.hypot(6, 8)) # 10.0`,
        codeTitle: 'Example 1: Advanced Mathematical Computations with math',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Precision Tip:</strong>
          <p style="margin-top:6px;">Never use <code>float1 == float2</code> for decimals due to IEEE 754 precision issues (e.g. <code>0.1 + 0.2 != 0.3</code>). Always use <code>math.isclose(a, b, rel_tol=1e-9)</code> for safe float comparisons.</p>
        </div>`
      },
      {
        title: '2. The random Module: PRNG & Reproducible Seeds',
        body: `<p>The <strong><code>random</code> module</strong> implements a <strong>Pseudo-Random Number Generator (PRNG)</strong> based on the famous <strong>Mersenne Twister algorithm</strong> (period of $2^{19937}-1$).</p>
        <ul>
          <li><code>random.randint(a, b)</code>: Returns a random integer $N$ such that $a \\le N \\le b$ (both endpoints inclusive!).</li>
          <li><code>random.random()</code>: Returns a random float in the range $[0.0, 1.0)$.</li>
          <li><code>random.choice(sequence)</code>: Picks a single random element from a list, string, or tuple.</li>
          <li><code>random.choices(seq, k=n)</code>: Selects $n$ items <strong>with replacement</strong> (duplicates possible).</li>
          <li><code>random.sample(seq, k=n)</code>: Selects $n$ <strong>unique</strong> items <strong>without replacement</strong>.</li>
          <li><code>random.shuffle(list)</code>: Randomizes list elements in place.</li>
          <li><code>random.seed(x)</code>: Initializes the PRNG with a fixed seed, making randomized outputs 100% deterministic and reproducible for scientific experiments.</li>
        </ul>`,
        code: `import random

# 1. Generating random integers and floats
dice_roll = random.randint(1, 6)
random_prob = random.random()
print(f"🎲 Rolled a dice: {dice_roll} | Probability: {random_prob:.4f}")

# 2. Random selection from lists
participants = ["Alex", "Balaji", "Chloe", "David", "Elena", "Faisal"]
winner = random.choice(participants)
print(f"🏆 Lucky Winner (choice): {winner}")

# 3. Unique sampling without replacement (Lottery / Team selection)
team = random.sample(participants, k=3)
print(f"👥 Selected Team (3 unique members): {team}")

# 4. In-place shuffling of a deck of cards
cards = ["A♠", "K♥", "Q♦", "J♣", "10♠"]
random.shuffle(cards)
print(f"🃏 Shuffled Cards: {cards}")`,
        codeTitle: 'Example 2: Random Number Generation, Selection and Shuffling',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Cryptographic Security Warning:</strong>
          <p style="margin-top:6px;">The <code>random</code> module is designed for simulations, games, and modeling — NOT for cryptographic tokens or password generation. For cryptographically secure randomness, always use <code>secrets.token_hex()</code> or <code>secrets.randbelow()</code>.</p>
        </div>`
      },
      {
        title: '3. The datetime Module: Date Math & ISO 8601 Formatting',
        body: `<p>The <strong><code>datetime</code> module</strong> provides classes for manipulating dates, times, and intervals:</p>
        <ul>
          <li><code>datetime.date(year, month, day)</code>: Represents a calendar date.</li>
          <li><code>datetime.time(hour, minute, second)</code>: Represents time of day independent of date.</li>
          <li><code>datetime.datetime.now()</code>: Returns current date and time.</li>
          <li><code>datetime.timedelta(days, hours, minutes)</code>: Represents duration / time difference for arithmetic (e.g. adding 30 days to a date).</li>
          <li><strong>Formatting:</strong>
            <ul>
              <li><code>strftime(format)</code>: <strong>String Format Time</strong> (Converts datetime object to formatted string).</li>
              <li><code>strptime(string, format)</code>: <strong>String Parse Time</strong> (Parses raw text string into datetime object).</li>
            </ul>
          </li>
        </ul>`,
        code: `import datetime as dt

# 1. Current timestamp
now = dt.datetime.now()
print("Current Timestamp:", now)

# 2. Custom date formatting with strftime
formatted_date = now.strftime("%A, %d %B %Y | %I:%M:%S %p")
print("Formatted Date:   ", formatted_date)

# 3. Date Arithmetic using timedelta
today = dt.date.today()
expiry_date = today + dt.timedelta(days=30)
days_remaining = (expiry_date - today).days

print(f"\\nSubscription Start: {today}")
print(f"Subscription Expiry: {expiry_date} ({days_remaining} days left)")

# 4. Parsing a date string with strptime
user_input_str = "2026-12-25"
parsed_date = dt.datetime.strptime(user_input_str, "%Y-%m-%d").date()
print("Parsed Holiday Date:", parsed_date)`,
        codeTitle: 'Example 3: Working with datetime, timedeltas and formatting',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Common Format Codes:</strong>
          <ul style="margin:8px 0 0 18px; line-height:1.7;">
            <li><code>%Y</code>: 4-digit Year (2026), <code>%m</code>: 2-digit Month (01-12), <code>%d</code>: Day of month (01-31).</li>
            <li><code>%H</code>: 24-hour clock (00-23), <code>%I</code>: 12-hour clock (01-12), <code>%p</code>: AM/PM.</li>
            <li><code>%A</code>: Full weekday name (Monday), <code>%B</code>: Full month name (August).</li>
          </ul>
        </div>`
      },
      {
        title: '4. The statistics Module: Mathematical Data Analysis',
        body: `<p>The <strong><code>statistics</code> module</strong> provides built-in functions for calculating mathematical statistics of numeric datasets without needing heavy third-party libraries like NumPy for basic tasks:</p>
        <ul>
          <li><code>mean(data)</code>: Arithmetic mean (average).</li>
          <li><code>median(data)</code>: Middle value (robust against extreme outliers).</li>
          <li><code>mode(data)</code>: Most frequently occurring value.</li>
          <li><code>stdev(data)</code>: Sample standard deviation (measures variance spread).</li>
          <li><code>quantiles(data, n=4)</code>: Divides dataset into $n$ continuous intervals (quartiles).</li>
        </ul>`,
        code: `import statistics as stats

exam_scores = [78, 85, 92, 85, 99, 64, 85, 90, 72, 88]

avg_score = stats.mean(exam_scores)
median_score = stats.median(exam_scores)
most_common = stats.mode(exam_scores)
spread = stats.stdev(exam_scores)

print("Dataset:", exam_scores)
print("=" * 40)
print(f"• Mean (Average):     {avg_score:.2f}")
print(f"• Median (Midpoint):  {median_score}")
print(f"• Mode (Most Common): {most_common}")
print(f"• Standard Deviation: {spread:.2f}")`,
        codeTitle: 'Example 4: Statistical Metrics with statistics Module',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Statistical Insight:</strong>
          <p style="margin-top:6px;">When analyzing real-world metrics like salaries or home prices where extreme outliers skew results, <code>median()</code> provides a much more accurate picture than <code>mean()</code>.</p>
        </div>`
      }
    ],
    mistake: {
      title: 'Using random for Cryptographic Passwords and Tokens',
      text: 'The random module uses the Mersenne Twister PRNG, which is completely predictable after observing 624 generated outputs. Never use random for security tokens, passwords, or encryption keys — use the standard library "secrets" module instead.'
    },
    tryIt: {
      desc: 'Write a program to generate a 6-digit random OTP (One Time Password) and calculate the expiry timestamp 5 minutes from now using datetime.timedelta.',
      code: `import random
import datetime as dt

otp = random.randint(100000, 999999)
now = dt.datetime.now()
expiry = now + dt.timedelta(minutes=5)

print(f"🔑 Your One-Time Password (OTP): {otp}")
print(f"⏳ Generated At: {now.strftime('%H:%M:%S')}")
print(f"⌛ Valid Until:  {expiry.strftime('%H:%M:%S')} (5 mins expiry)")`
    },
    faqs: [
      {
        q: 'What is the difference between random.choice() and random.choices()?',
        a: 'random.choice(seq) returns a single random element. random.choices(seq, k=n) returns a list of n elements chosen with replacement (duplicates possible).'
      },
      {
        q: 'How can I make randomized test results reproducible across team members?',
        a: 'Set a constant seed using random.seed(42) at the start of your script. This forces the PRNG to produce identical outputs on every run.'
      },
      {
        q: 'What is the difference between date, time, and datetime in Python?',
        a: 'date represents calendar date (year/month/day). time represents clock time (hour/min/sec). datetime combines both into a single unified timestamp.'
      }
    ]
  },

  // =========================================================================
  // CHAPTER 22: SYSTEM, OS & FILE OPERATIONS (PHASE 5)
  // =========================================================================
  {
    num: 22,
    phaseId: 'phase5',
    phaseTitle: 'Phase 5: Modules and Packages',
    slug: '22-python-os-sys-and-pathlib',
    title: 'Python OS, Sys & Pathlib Guide',
    badge: '22. OS, Sys & Pathlib',
    subtopics: 'os Module · sys System Hooks · Modern pathlib Object Paths · Directory Traversal · Environment Variables',
    desc: 'Master system programming and file system automation in Python: process interaction with os, interpreter internals & CLI arguments with sys, and modern object-oriented file paths with pathlib.',
    sections: [
      {
        title: '1. Operating System Interactions: The os Module',
        body: `<p>The <strong><code>os</code> module</strong> provides a portable, platform-independent interface to interact with the underlying operating system (Windows, macOS, Linux):</p>
        <ul>
          <li><strong>Environment Variables:</strong> <code>os.environ</code> (a dictionary mapping OS environment keys like <code>API_KEY</code>, <code>PATH</code>, <code>USER</code>). Always use <code>os.getenv("KEY", "fallback")</code> for safe access.</li>
          <li><strong>Working Directory:</strong> <code>os.getcwd()</code> (get current directory), <code>os.chdir(path)</code> (change directory).</li>
          <li><strong>Directory Management:</strong> <code>os.mkdir(path)</code> (create single folder), <code>os.makedirs(path, exist_ok=True)</code> (create nested directory trees safely).</li>
          <li><strong>Listing & Deleting:</strong> <code>os.listdir(path)</code>, <code>os.remove(file)</code>, <code>os.rmdir(empty_dir)</code>.</li>
        </ul>`,
        code: `# Inspecting OS environment and directory state:
import os

print("Operating System Name:", os.name) # 'nt' for Windows, 'posix' for Linux/macOS
print("Current Working Directory:", os.getcwd())

# Safe environment variable lookup with getenv:
db_user = os.getenv("DB_USER", "default_admin")
print("Database User:", db_user)

# Inspecting directory contents:
dir_files = [f for f in os.listdir(".") if not f.startswith(".")]
print(f"Top 5 files in current directory: {dir_files[:5]}")`,
        codeTitle: 'Example 1: Operating System Interface with os Module',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Security Best Practice:</strong>
          <p style="margin-top:6px;">Never hardcode API secrets, database passwords, or private keys directly in source code. Load them dynamically from environment variables using <code>os.getenv("SECRET_KEY")</code>.</p>
        </div>`
      },
      {
        title: '2. Interpreter Hooks & CLI Arguments: The sys Module',
        body: `<p>The <strong><code>sys</code> module</strong> provides access to variables and functions that interact directly with the CPython interpreter itself:</p>
        <ul>
          <li><code>sys.argv</code>: A list of command-line argument strings passed to the script during terminal invocation (where <code>sys.argv[0]</code> is the script name).</li>
          <li><code>sys.exit([code])</code>: Immediately terminates the Python process (exit code <code>0</code> signifies clean success, non-zero signifies an error).</li>
          <li><code>sys.version</code> / <code>sys.version_info</code>: The exact Python version string and tuple.</li>
          <li><code>sys.platform</code>: Identifies the OS platform (<code>"win32"</code>, <code>"darwin"</code> for macOS, <code>"linux"</code>).</li>
          <li><code>sys.getsizeof(object)</code>: Returns the exact memory footprint of an object in bytes.</li>
        </ul>`,
        code: `import sys

print(f"🐍 Python Runtime Version: {sys.version.split()[0]}")
print(f"💻 OS Platform Identifier: {sys.platform}")
print(f"📥 Command-line Arguments (sys.argv): {sys.argv}")

# Inspecting memory size of different Python objects in bytes:
int_size = sys.getsizeof(100)
str_size = sys.getsizeof("Hello, World!")
list_size = sys.getsizeof([1, 2, 3, 4, 5])

print(f"\\nMemory Footprint:")
print(f"• Integer (100):      {int_size} bytes")
print(f"• String ('Hello..'): {str_size} bytes")
print(f"• List ([1..5]):      {list_size} bytes")`,
        codeTitle: 'Example 2: Python Interpreter Inspection via sys Module',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 sys.argv Mechanics:</strong>
          <p style="margin-top:6px;">If you run <code>python process.py input.csv --verbose</code> in your terminal, <code>sys.argv</code> will contain <code>['process.py', 'input.csv', '--verbose']</code>.</p>
        </div>`
      },
      {
        title: '3. Modern Object-Oriented File Paths: pathlib.Path (PEP 428)',
        body: `<p>Historically, Python developers manipulated file paths as raw strings using <code>os.path.join()</code>. In modern Python 3.4+ (PEP 428), the standard approach is <strong><code>pathlib.Path</code></strong>, which treats file paths as rich, first-class Python objects with cross-platform slash (<code>/</code>) joining:</p>
        <div class="diagram-box">Legacy String Approach:   os.path.join("data", "users", "report.csv")
Modern pathlib Approach:  Path("data") / "users" / "report.csv"  (Cross-platform & Clean!)</div>
        <p><strong>Path Object Methods:</strong></p>
        <ul>
          <li><code>path.exists()</code>: Returns <code>True</code> if file or directory exists.</li>
          <li><code>path.is_file()</code> / <code>path.is_dir()</code>: Type checks.</li>
          <li><code>path.name</code>: Full filename (<code>"report.csv"</code>).</li>
          <li><code>path.stem</code>: Filename without extension (<code>"report"</code>).</li>
          <li><code>path.suffix</code>: File extension (<code>".csv"</code>).</li>
          <li><code>path.read_text(encoding="utf-8")</code>: Reads entire text file in one line!</li>
          <li><code>path.write_text(content, encoding="utf-8")</code>: Writes string to file in one line!</li>
        </ul>`,
        code: `from pathlib import Path

# 1. Building paths with the / operator:
data_folder = Path("my_project") / "data"
config_file = data_folder / "app_config.json"

print("Path Object:", config_file)
print("Filename (name):", config_file.name)
print("Filename stem:  ", config_file.stem)
print("Extension:      ", config_file.suffix)
print("Parent Folder:  ", config_file.parent)

# 2. Writing and reading text files in ONE line with pathlib:
test_file = Path("demo_note.txt")
test_file.write_text("Hello from Python pathlib! 🚀", encoding="utf-8")

file_content = test_file.read_text(encoding="utf-8")
print(f"\\nRead file content: '{file_content}'")

# Clean up test file:
if test_file.exists():
    test_file.unlink() # Delete file
    print("Cleaned up demo_note.txt ✅")`,
        codeTitle: 'Example 3: Object-Oriented File Paths with pathlib.Path',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Cross-Platform Guarantee:</strong>
          <p style="margin-top:6px;"><code>pathlib</code> automatically handles Windows backslashes (<code>\\</code>) vs POSIX forward slashes (<code>/</code>) transparently without manual string manipulation.</p>
        </div>`
      },
      {
        title: '4. Directory Traversal & Pattern Globbing (Path.glob)',
        body: `<p>Search and iterate through files matching pattern expressions using <strong>Globbing</strong>:</p>
        <ul>
          <li><code>path.glob("*.py")</code>: Finds matching files in the current folder.</li>
          <li><code>path.rglob("*.py")</code>: <strong>Recursive Glob</strong> — searches the current folder AND all nested sub-folders at any depth!</li>
        </ul>`,
        code: `from pathlib import Path

current_dir = Path(".")

# Find all HTML files in current folder:
html_files = list(current_dir.glob("*.html"))
print(f"Found {len(html_files)} HTML files in current root.")

# Inspect first 3 files:
for f in html_files[:3]:
    print(f"• File: {f.name:25} | Size: {f.stat().st_size} bytes")`,
        codeTitle: 'Example 4: Pattern Searching with Path.glob',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Performance Advantage:</strong>
          <p style="margin-top:6px;"><code>Path.glob()</code> returns an efficient generator iterator, allowing you to stream millions of files without consuming gigabytes of RAM.</p>
        </div>`
      }
    ],
    mistake: {
      title: 'Manual String Concatenation for File Paths (e.g. folder + "\\\\" + file)',
      text: 'Never use string concatenation (+) or hardcoded backslashes for file paths. Hardcoded Windows paths like "folder\\\\file.txt" will crash on Linux/Docker servers. Always use pathlib.Path("folder") / "file.txt".'
    },
    tryIt: {
      desc: 'Use pathlib to construct a path "logs/2026/app.log", print its parent directories, and check if it exists.',
      code: `from pathlib import Path

log_path = Path("logs") / "2026" / "app.log"

print("Constructed Path:", log_path)
print("Parent Directory:", log_path.parent)
print("File Extension:  ", log_path.suffix)
print("Does file exist? ", log_path.exists())`
    },
    faqs: [
      {
        q: 'Why should I prefer pathlib over os.path in modern Python?',
        a: 'pathlib provides an intuitive, object-oriented API where paths are rich objects with built-in methods (.read_text(), .write_text(), .exists(), .glob()), eliminating cumbersome nested os.path.join() boilerplate.'
      },
      {
        q: 'What does sys.exit(0) vs sys.exit(1) mean in command-line scripts?',
        a: 'In standard Unix and Windows conventions, exit code 0 indicates normal, successful execution. Any non-zero integer (like 1) indicates an error or abnormal termination to the calling shell/CI pipeline.'
      },
      {
        q: 'How do I safely create nested folders without crashing if they exist?',
        a: 'Use Path("my/deep/folder").mkdir(parents=True, exist_ok=True) or os.makedirs("my/deep/folder", exist_ok=True).'
      }
    ]
  },

  // =========================================================================
  // CHAPTER 23: PYTHON JSON SERIALIZATION (PHASE 5)
  // =========================================================================
  {
    num: 23,
    phaseId: 'phase5',
    phaseTitle: 'Phase 5: Modules and Packages',
    slug: '23-python-json-serialization-and-data',
    title: 'Python JSON Serialization Guide',
    badge: '23. JSON Data Interchange',
    subtopics: 'JSON Specification · json.dumps() vs dump() · json.loads() vs load() · Type Mappings · Custom Encoders',
    desc: 'Master JSON data interchange in Python: converting between Python dictionaries and JSON strings, file stream serialization, type mapping hierarchies, and custom encoders for dates and sets.',
    sections: [
      {
        title: '1. The JSON Data Interchange Standard & Python Type Mappings',
        body: `<p><strong>JSON (JavaScript Object Notation)</strong> is the universal standard format for transmitting structured data across the web, REST APIs, and microservices.</p>
        <p>Python's built-in <strong><code>json</code> module</strong> handles bidirectional translation between Python data structures and JSON text according to a strict type translation specification:</p>
        <table class="tbl" style="margin-top:8px; font-size:12.5px;">
          <tr><th>Python Object</th><th>JSON Equivalent</th><th>Notes</th></tr>
          <tr><td><code>dict</code></td><td><code>object</code> (<code>{...}</code>)</td><td>Keys are automatically converted to strings</td></tr>
          <tr><td><code>list</code>, <code>tuple</code></td><td><code>array</code> (<code>[...]</code>)</td><td>Tuples are serialized to JSON arrays</td></tr>
          <tr><td><code>str</code></td><td><code>string</code></td><td>UTF-8 encoded string</td></tr>
          <tr><td><code>int</code>, <code>float</code></td><td><code>number</code></td><td>Arbitrary precision preserved</td></tr>
          <tr><td><code>True</code> / <code>False</code></td><td><code>true</code> / <code>false</code></td><td>Lowercase boolean literals</td></tr>
          <tr><td><code>None</code></td><td><code>null</code></td><td>Null reference literal</td></tr>
        </table>`,
        code: `# Inspecting Python to JSON Type Conversion
import json

python_payload = {
    "user_id": 101,
    "username": "balaji_dev",
    "is_admin": True,
    "roles": ("Backend", "DevOps"), # Tuple becomes Array
    "profile": None,                # None becomes null
    "rating": 4.95
}

# Serialize Python dictionary to JSON string:
json_string = json.dumps(python_payload)
print("JSON Output String:")
print(json_string)`,
        codeTitle: 'Example 1: Translating Python Data Types to JSON',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Notice the conversions:</strong>
          <ul style="margin:8px 0 0 18px; line-height:1.7;">
            <li><code>True</code> becomes lowercase <code>true</code>.</li>
            <li><code>None</code> becomes <code>null</code>.</li>
            <li>Tuple <code>("Backend", "DevOps")</code> becomes JSON square bracket array <code>["Backend", "DevOps"]</code>.</li>
          </ul>
        </div>`
      },
      {
        title: '2. In-Memory Serialization: json.dumps() and json.loads()',
        body: `<p>The two primary in-memory functions have an <strong>"s" (string)</strong> suffix:</p>
        <ul>
          <li><code>json.dumps(obj, indent=4, sort_keys=True)</code>: Serializes a Python object into a <strong>formatted JSON string</strong> (Dump String).</li>
          <li><code>json.loads(json_str)</code>: Parses a <strong>JSON string into Python native dictionaries/lists</strong> (Load String).</li>
        </ul>`,
        code: `import json

# 1. Pretty printing JSON with indent=4 and sorted keys:
server_config = {
    "host": "127.0.0.1",
    "port": 8000,
    "debug": False,
    "allowed_hosts": ["localhost", "ourcompiler.com"]
}

pretty_json = json.dumps(server_config, indent=4, sort_keys=True)
print("--- 💅 Pretty Formatted JSON ---")
print(pretty_json)

# 2. Deserializing raw JSON string back to Python Dictionary:
raw_api_response = '{"status": 200, "message": "Success", "data": [10, 20, 30]}'
parsed_dict = json.loads(raw_api_response)

print("\\n--- 🔄 Parsed Python Dictionary ---")
print("Status Code:", parsed_dict["status"])
print("Data items: ", parsed_dict["data"])
print("Python Type:", type(parsed_dict).__name__)`,
        codeTitle: 'Example 2: In-Memory Serialization with json.dumps and json.loads',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 API Response Processing:</strong>
          <p style="margin-top:6px;">When calling web APIs using libraries like <code>urllib</code> or <code>requests</code>, incoming JSON text streams are converted into Python native dictionaries using <code>json.loads()</code>.</p>
        </div>`
      },
      {
        title: '3. File Stream Serialization: json.dump() and json.load()',
        body: `<p>When working with physical files on disk, use the non-string functions <code>json.dump()</code> and <code>json.load()</code> which write and read directly from file streams:</p>
        <ul>
          <li><code>json.dump(obj, file_handle)</code>: Serializes Python object directly into a writable file stream.</li>
          <li><code>json.load(file_handle)</code>: Reads and parses JSON directly from a readable file stream.</li>
        </ul>`,
        code: `import json
from pathlib import Path

settings_file = Path("user_settings.json")

# Data to save to disk:
user_preferences = {
    "theme": "dark",
    "font_size": 14,
    "auto_save": True,
    "recent_files": ["main.py", "models.py", "utils.py"]
}

# 1. Write dictionary to physical JSON file on disk:
with open(settings_file, "w", encoding="utf-8") as f:
    json.dump(user_preferences, f, indent=4)
print(f"✅ Saved settings to {settings_file}")

# 2. Read physical JSON file back from disk:
with open(settings_file, "r", encoding="utf-8") as f:
    loaded_settings = json.load(f)

print(f"📖 Loaded Theme: {loaded_settings['theme']} | Font: {loaded_settings['font_size']}px")

# Clean up demo file:
settings_file.unlink()`,
        codeTitle: 'Example 3: File Stream Serialization with json.dump and json.load',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Best Practice:</strong>
          <p style="margin-top:6px;">Always specify <code>encoding="utf-8"</code> when opening JSON files to ensure emojis, symbols, and non-English text are written and read reliably across Windows and Linux.</p>
        </div>`
      },
      {
        title: '4. Custom Encoders: Handling Datetime & Sets (TypeError: not JSON serializable)',
        body: `<p>Standard JSON does not define types for Python <code>datetime</code> objects or <code>set</code> collections. Attempting to serialize them raises a <code>TypeError: Object of type ... is not JSON serializable</code>.</p>
        <p>To serialize custom types, provide a <strong><code>default</code> handler function</strong>:</p>`,
        code: `import json
import datetime as dt

def custom_json_serializer(obj):
    """Custom serializer handler for unsupported types."""
    if isinstance(obj, (dt.datetime, dt.date)):
        return obj.isoformat() # Convert to standard ISO 8601 string
    if isinstance(obj, set):
        return list(obj)       # Convert set to JSON list
    raise TypeError(f"Type {type(obj)} is not serializable!")

# Complex Python payload containing datetime and sets:
transaction = {
    "invoice_id": "INV-2026-894",
    "timestamp": dt.datetime.now(),
    "unique_categories": {"Electronics", "Accessories"}, # Set!
    "amount": 499.99
}

serialized_json = json.dumps(transaction, default=custom_json_serializer, indent=2)
print("--- 🛡️ Custom Serialized JSON ---")
print(serialized_json)`,
        codeTitle: 'Example 4: Custom JSON Serializer for Datetime and Sets',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Industry Standard:</strong>
          <p style="margin-top:6px;">Converting datetimes to ISO 8601 strings (<code>2026-08-14T15:30:00</code>) ensures full compatibility across frontend JavaScript applications and databases.</p>
        </div>`
      }
    ],
    mistake: {
      title: 'Confusing json.loads() and json.load()',
      text: 'Remember: json.loads(str) expects a raw JSON string argument. json.load(file) expects an open file stream object. Passing a string to json.load() raises AttributeError: \'str\' object has no attribute \'read\'.'
    },
    tryIt: {
      desc: 'Create a Python dictionary containing student details, serialize it to a pretty JSON string with 2-space indentation, and print the result.',
      code: `import json

student_record = {
    "name": "Alex Smith",
    "grade": "12th",
    "subjects": ["Math", "Physics", "Computer Science"],
    "passed": True
}

json_output = json.dumps(student_record, indent=2)
print("Pretty JSON Output:")
print(json_output)`
    },
    faqs: [
      {
        q: 'What is the difference between json.dumps() and json.dump()?',
        a: 'json.dumps() (Dump String) serializes an object into a Python string in memory. json.dump() serializes an object directly into an open file stream on disk.'
      },
      {
        q: 'Why does json.dumps({"a": 1}) work, but json.dumps({(1, 2): "val"}) fail?',
        a: 'JSON specification strictly requires object keys to be strings. Python dictionary keys that are tuples or other types cannot be converted without setting skipkeys=True.'
      },
      {
        q: 'How can I format JSON output to be as compact as possible for network transmission?',
        a: 'Use separators=(",", ":") in json.dumps(). This strips all whitespace between items and keys, minimizing packet size.'
      }
    ]
  },

  // =========================================================================
  // CHAPTER 24: PYTHON PACKAGES, VENV & PIP (PHASE 5)
  // =========================================================================
  {
    num: 24,
    phaseId: 'phase5',
    phaseTitle: 'Phase 5: Modules and Packages',
    slug: '24-python-packages-virtual-environments-and-pip',
    title: 'Python Packages, Virtual Environments & Pip',
    badge: '24. Packages, venv & Pip',
    subtopics: 'Packages & __init__.py · Namespace Packages · venv Isolation · pip & PyPI · requirements.txt · Dependency Locking',
    desc: 'Master professional Python packaging and environment isolation: building package directories with __init__.py, creating isolated virtual environments with venv, managing third-party libraries with pip, and pinning reproducible dependencies in requirements.txt.',
    sections: [
      {
        title: '1. What is a Package? Hierarchy & The Role of __init__.py',
        body: `<p>A <strong>package</strong> is a directory containing one or more Python modules, structured in a hierarchical namespace. While a module is a single <code>.py</code> file, a package is a <strong>folder of modules</strong>.</p>
        <p>A standard package directory structure:</p>
        <div class="diagram-box">my_application/
├── __init__.py             <-- Marks folder as a Python Package
├── config.py               <-- Submodule (my_application.config)
├── database/               <-- Subpackage (my_application.database)
│   ├── __init__.py
│   ├── connection.py
│   └── queries.py
└── utils/                  <-- Subpackage (my_application.utils)
    ├── __init__.py
    └── helpers.py</div>
        <h4 style="color:#10b981; margin:16px 0 8px;">The Role of <code>__init__.py</code>:</h4>
        <ol>
          <li><strong>Package Initialization:</strong> Executes automatically when the package is first imported.</li>
          <li><strong>Exposing Clean Public APIs (<code>__all__</code>):</strong> Allows package authors to import submodules internally and expose a clean, consolidated API to consumers (e.g. allowing <code>from my_application import helpers</code> instead of deeply nested internal paths).</li>
        </ol>`,
        code: `# Package usage simulation:
# Inside my_application/__init__.py:
"""
Package: my_ecommerce
Version: 1.0.0
"""
__version__ = "1.0.0"

def get_package_info():
    return f"My E-Commerce Engine v{__version__}"

# Consumer code in main.py:
print("Package Info:", get_package_info())`,
        codeTitle: 'Example 1: Package Structure and Initialization',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Namespace Packages:</strong>
          <p style="margin-top:6px;">Since Python 3.3 (PEP 420), <code>__init__.py</code> is technically optional for simple folder structures (known as Namespace Packages). However, creating an explicit <code>__init__.py</code> is still industry standard for initialization logic and package boundary definitions.</p>
        </div>`
      },
      {
        title: '2. Why Virtual Environments (venv) are Essential',
        body: `<p>By default, if you install third-party packages globally using <code>pip install package_name</code>, they are placed into your operating system's single global <code>site-packages</code> directory.</p>
        <p><strong>The Global Dependency Problem:</strong></p>
        <ul>
          <li>Project A requires <code>Django 4.2</code> (LTS version).</li>
          <li>Project B requires <code>Django 5.1</code> (New feature version).</li>
          <li>Installing Django 5.1 globally will overwrite Django 4.2, immediately breaking Project A!</li>
        </ul>
        <p>A <strong>Virtual Environment (<code>.venv</code>)</strong> creates an isolated, self-contained directory tree containing its own independent Python binary and private <code>site-packages</code> folder for each specific project!</p>
        <div class="diagram-box">┌────────────────────────────────────────────────────────┐
│  Operating System Global Python                        │
├────────────────────────────────────────────────────────┤
│  📁 Project A (.venv)      📁 Project B (.venv)        │
│  ├── Python 3.12           ├── Python 3.12             │
│  └── Django 4.2            └── Django 5.1              │
└────────────────────────────────────────────────────────┘</div>`,
        code: `# Terminal commands for creating and managing virtual environments:

# Step 1: Create a virtual environment named '.venv' in project directory
# python -m venv .venv

# Step 2: Activate the virtual environment
# Windows (PowerShell):
# .venv\\Scripts\\Activate.ps1
#
# Windows (Command Prompt):
# .venv\\Scripts\\activate.bat
#
# macOS / Linux (Bash/Zsh):
# source .venv/bin/activate

# Step 3: Verify active Python binary location
# where python  (Windows) or which python (Linux/macOS)

# Step 4: Deactivate when finished
# deactivate`,
        codeTitle: 'Example 2: Virtual Environment Lifecycle Commands',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 PowerShell Tip:</strong>
          <p style="margin-top:6px;">If Windows PowerShell blocks activation with a script execution policy error, run <code>Set-ExecutionPolicy -Scope Process -ExecutionPolicy RemoteSigned</code> in your PowerShell terminal.</p>
        </div>`
      },
      {
        title: '3. Package Management with pip & PyPI (The Python Package Index)',
        body: `<p><strong><code>pip</code></strong> (Pip Installs Packages) is the official package installer for Python. It downloads and installs libraries hosted on <strong>PyPI (Python Package Index — pypi.org)</strong>, the official public repository containing over 500,000 open-source packages.</p>
        <h4 style="color:#10b981; margin:16px 0 8px;">Essential pip Commands:</h4>
        <ul>
          <li><code>pip install package_name</code>: Downloads and installs the latest stable version of a package.</li>
          <li><code>pip install "package_name==2.4.0"</code>: Installs an exact pinned version.</li>
          <li><code>pip install --upgrade package_name</code>: Upgrades an existing package to latest release.</li>
          <li><code>pip list</code>: Lists all packages currently installed in the active environment.</li>
          <li><code>pip show package_name</code>: Displays detailed metadata, author, license, and dependencies of a package.</li>
          <li><code>pip uninstall package_name</code>: Removes a package cleanly.</li>
        </ul>`,
        code: `# Terminal commands for pip management:

# Install popular third-party packages:
# pip install requests fastapi uvicorn

# Inspect package details:
# pip show requests

# Search installed packages:
# pip list`,
        codeTitle: 'Example 3: Managing Packages with pip',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Best Practice:</strong>
          <p style="margin-top:6px;">Always ensure your virtual environment is active (indicated by <code>(.venv)</code> in your terminal prompt) before running <code>pip install</code>.</p>
        </div>`
      },
      {
        title: '4. Reproducible Deployments: requirements.txt & Dependency Pinning',
        body: `<p>When sharing your code with other engineers or deploying to cloud servers (Docker, AWS, Render, Heroku), you must guarantee that everyone installs the <strong>exact same versions of every dependency</strong>.</p>
        <p>In Python, dependencies are specified in a standard file named <strong><code>requirements.txt</code></strong>:</p>
        <div class="diagram-box"># Generate requirements.txt from active environment:
pip freeze > requirements.txt

# Install all dependencies on a new machine / server:
pip install -r requirements.txt</div>
        <h4 style="color:#10b981; margin:16px 0 8px;">Version Specifier Operators in requirements.txt:</h4>
        <ul>
          <li><code>fastapi == 0.110.0</code>: <strong>Exact Pin</strong> (Installs strictly version 0.110.0 — recommended for production servers).</li>
          <li><code>requests >= 2.31.0</code>: Minimum version constraint.</li>
          <li><code>pydantic ~= 2.6.0</code>: Compatible release (accepts any patch update <code>2.6.x</code>, but rejects breaking <code>2.7.0</code>).</li>
        </ul>`,
        code: `# Standard production requirements.txt sample:
sample_requirements_txt = """
# Core Web Framework & Server
fastapi==0.110.0
uvicorn[standard]==0.29.0

# Database ORM & Driver
SQLAlchemy==2.0.29
asyncpg==0.29.0

# Utilities
pydantic==2.6.4
python-dotenv==1.0.1
requests>=2.31.0
"""

print("--- 📋 Production requirements.txt Blueprint ---")
print(sample_requirements_txt.strip())`,
        codeTitle: 'Example 4: Production requirements.txt File Format',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Git Ignore Rule:</strong>
          <p style="margin-top:6px;">Always add <code>.venv/</code> to your <code>.gitignore</code> file! Never commit the virtual environment folder to GitHub. Instead, commit <code>requirements.txt</code> so team members can recreate the environment in seconds.</p>
        </div>`
      }
    ],
    mistake: {
      title: 'Committing the .venv Directory to Git / GitHub',
      text: 'Virtual environment folders (.venv) contain OS-specific binary executables and thousands of files. Committing .venv bloats your repository and breaks when cloned on different operating systems. Always add .venv/ to your .gitignore and commit requirements.txt instead.'
    },
    tryIt: {
      desc: 'Simulate generating a requirements.txt file from a list of installed package tuples and display the formatted output.',
      code: `installed_packages = [
    ("fastapi", "0.110.0"),
    ("uvicorn", "0.29.0"),
    ("requests", "2.31.0"),
    ("pydantic", "2.6.4")
]

print("Generated requirements.txt:")
for pkg, version in installed_packages:
    print(f"{pkg}=={version}")`
    },
    faqs: [
      {
        q: 'What is the difference between a module, a package, and a library?',
        a: 'A module is a single .py file. A package is a directory containing multiple modules and an __init__.py file. A library is an umbrella term for a collection of packages published together.'
      },
      {
        q: 'What should I do if pip install fails with SSL or certificate errors?',
        a: 'Upgrade pip to the latest version using python -m pip install --upgrade pip, or verify your network proxy settings.'
      },
      {
        q: 'What are modern alternatives to venv and requirements.txt?',
        a: 'Modern Python dependency management tools include Poetry (pyproject.toml), Pipenv (Pipfile.lock), and uv (an ultra-fast Rust-based drop-in replacement for pip and venv).'
      }
    ]
  }
];
