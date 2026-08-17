const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..', 'public');
const pythonDir = path.join(baseDir, 'blog-python');
const oldPythonDir = path.join(baseDir, 'python');

if (!fs.existsSync(pythonDir)) {
  fs.mkdirSync(pythonDir, { recursive: true });
}

// 1. Write public/blog-python/style.css
const pythonCss = `/* Specialized styling enhancements for Python tutorial lessons */
.try-box {
  background: linear-gradient(135deg, rgba(56, 189, 248, 0.1) 0%, rgba(99, 102, 241, 0.04) 100%);
  border: 1px solid rgba(56, 189, 248, 0.25);
  border-radius: var(--radius, 12px);
  padding: 24px;
  margin: 32px 0;
}

.try-box .try-title {
  font-weight: 700;
  color: var(--accent, #38bdf8);
  margin-bottom: 10px;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.try-box .run-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 14px;
  background: linear-gradient(135deg, #38bdf8, #6366f1);
  color: #ffffff !important;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 14px;
  text-decoration: none;
  transition: transform 0.2s, opacity 0.2s;
  box-shadow: 0 4px 14px rgba(56, 189, 248, 0.3);
}

.try-box .run-btn:hover {
  opacity: 0.95;
  transform: translateY(-1px);
}

.callout {
  background: rgba(59, 130, 246, 0.08);
  border: 1px solid rgba(59, 130, 246, 0.25);
  border-left: 4px solid #38bdf8;
  padding: 18px 22px;
  border-radius: var(--radius, 12px);
  margin: 28px 0;
}

.callout .callout-title {
  font-weight: 700;
  color: #38bdf8;
  margin-bottom: 8px;
  font-size: 15px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.diagram-box {
  background: #0d1117;
  border: 1px solid #30363d;
  border-radius: 10px;
  padding: 18px;
  margin: 24px 0;
  font-family: 'JetBrains Mono', monospace;
  font-size: 13.5px;
  color: #7ee787;
  line-height: 1.6;
  overflow-x: auto;
}

.faq-card {
  background: #161b22;
  border: 1px solid #30363d;
  border-radius: 10px;
  padding: 16px 20px;
  margin-bottom: 16px;
}

.faq-card h4 {
  color: #58a6ff;
  font-size: 15px;
  margin-bottom: 8px;
}

.faq-card p {
  color: #8b949e;
  font-size: 14px;
  line-height: 1.6;
  margin: 0;
}

.author {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: 40px;
  padding-top: 24px;
  border-top: 1px solid var(--border, #30363d);
  color: var(--text2, #8b949e);
  font-size: 13.5px;
}

.author .avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #38bdf8, #3b82f6);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-weight: 800;
  font-size: 14px;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(56, 189, 248, 0.3);
}

body.light-theme .try-box {
  background: #f0f9ff;
  border-color: #bae6fd;
}

body.light-theme .callout {
  background: #f8fafc;
  border-color: #cbd5e1;
}

body.light-theme .diagram-box {
  background: #f1f5f9;
  border-color: #cbd5e1;
  color: #0f172a;
}

body.light-theme .faq-card {
  background: #ffffff;
  border-color: #e2e8f0;
}
`;

fs.writeFileSync(path.join(pythonDir, 'style.css'), pythonCss, 'utf8');

// Curriculum metadata
const LESSONS = [
  {
    num: 1,
    slug: '01-what-is-python-features-and-uses',
    title: 'Python ante enti? Features and Real-World Uses',
    desc: 'Complete overview of Python language, creator Guido van Rossum, design philosophy, dynamic typing, interpreted vs compiled comparison, and why Python dominates AI, Data Science, and Web Development.',
    phase: 'Phase 1: Python Basics',
    sections: [
      {
        title: 'Python ante enti? (What is Python?)',
        content: `Python is a high-level, general-purpose, interpreted programming language created by Dutch programmer <strong>Guido van Rossum</strong> in 1991. Python emphasizes code readability with its clean, human-like syntax and significant indentation, allowing developers to express complex concepts in fewer lines of code compared to languages like C++ or Java.<br><br>Python is <strong>dynamically typed</strong> (you do not need to declare variable types explicitly) and <strong>garbage-collected</strong> (automatic memory management). It supports multiple programming paradigms including Object-Oriented, Functional, and Procedural programming.`
      },
      {
        title: 'Key Features of Python 3',
        content: `<ul>
          <li><strong>Readable & English-like Syntax:</strong> No curly braces <code>{}</code> or semicolons <code>;</code> required. Code reads almost like plain English.</li>
          <li><strong>Interpreted & Interactive:</strong> Code executes line-by-line via the CPython interpreter, making testing and debugging extremely fast.</li>
          <li><strong>Batteries-Included Standard Library:</strong> Comes out of the box with modules for math, file I/O, networking, regular expressions, JSON parsing, and cryptography.</li>
          <li><strong>Cross-Platform & Portable:</strong> Python runs seamlessly on Windows, macOS, Linux, and embedded systems like Raspberry Pi.</li>
          <li><strong>Huge Open-Source Ecosystem:</strong> Over 400,000+ packages available on PyPI (Python Package Index).</li>
        </ul>`
      },
      {
        title: 'Where is Python Used in Real-World Industry?',
        content: `<div class="diagram-box">
┌────────────────────────────────────────────────────────┐
│               PYTHON INDUSTRY USE CASES                │
├──────────────────────┬─────────────────────────────────┤
│ 1. AI & Machine Learning │ PyTorch, TensorFlow, Scikit-Learn│
│ 2. Data Science & Big Data │ Pandas, NumPy, Polars, Matplotlib│
│ 3. Web Development       │ Django, FastAPI, Flask, Wagtail  │
│ 4. Automation & Scripting│ Selenium, BeautifulSoup, PyAutoGUI│
│ 5. Cybersecurity & DevOps │ Fabric, Ansible, Scapy, Paramiko │
└──────────────────────┴─────────────────────────────────┘</div>`
      },
      {
        title: 'Python vs Other Languages (Speed vs Productivity)',
        content: `<p>While compiled languages like C or Rust execute faster at CPU level, Python drastically reduces developer time (productivity). In modern computing, developer time is often more valuable than microsecond execution time. Furthermore, performance-critical Python libraries (NumPy, PyTorch) are internally implemented in C/C++, giving you Python's easy syntax combined with native C speed.</p>`
      }
    ],
    codeExample: `# Python 3 Feature Demo: Clean, Expressive & Powerful
languages = ["Python", "JavaScript", "Java", "C++"]
print("🚀 Popular Languages in 2026:")
for idx, lang in enumerate(languages, start=1):
    print(f"  {idx}. {lang} - Length: {len(lang)} chars")

# Concise List Comprehension
squared = [x**2 for x in range(1, 6)]
print(f"\n🔢 Squares from 1 to 5: {squared}")`,
    commonMistake: {
      title: 'Comparing Python with Python 2',
      text: 'Python 2 was officially retired on January 1, 2020. Always use Python 3. In Python 3, print is a function (e.g., print("Hello") with parentheses) and all strings are Unicode by default.'
    },
    tryIt: {
      title: 'Explore Python Built-in Functions',
      desc: 'Run the program to inspect Python system information and standard library utilities.',
      code: `import sys

print("🐍 Python Version:", sys.version.split()[0])
print("💻 Platform:", sys.platform)
print("📦 Max Integer Size in Python:", sys.maxsize)

# Calculate sum and average
numbers = [45, 88, 92, 73, 60]
print(f"📊 Numbers: {numbers}")
print(f"➕ Sum: {sum(numbers)}, Max: {max(numbers)}, Min: {min(numbers)}")`
    },
    faqs: [
      { q: 'Is Python good for complete beginners?', a: 'Yes! Python is widely considered the best first programming language because its readable syntax lets you focus on learning computational thinking and problem-solving without getting bogged down in complex boilerplate syntax.' },
      { q: 'Is Python compiled or interpreted?', a: 'Python source code (.py) is first compiled into bytecode (.pyc) by the Python compiler, and then executed by the Python Virtual Machine (PVM) line by line.' }
    ]
  },
  {
    num: 2,
    slug: '02-python-installation-and-setup',
    title: 'Python Installation, VS Code & Environment Setup',
    desc: 'Step-by-step installation guide for Windows, macOS, and Linux, configuring python in PATH, setting up VS Code with Python extension, and using Our Compiler zero-install IDE.',
    phase: 'Phase 1: Python Basics',
    sections: [
      {
        title: 'How to Download and Install Python',
        content: `<p>To run Python locally on your computer, follow these steps:</p>
        <ol>
          <li>Visit the official website: <a href="https://www.python.org/downloads/" target="_blank" style="color:#58a6ff;">python.org/downloads</a></li>
          <li>Download the latest Python 3 installer for your operating system (Windows, macOS, or Linux).</li>
          <li><strong>IMPORTANT (Windows):</strong> During installation, check the box that says <strong>"Add Python to PATH"</strong> before clicking Install Now. If you miss this, python commands will not work in Command Prompt/PowerShell.</li>
        </ol>`
      },
      {
        title: 'Verifying Installation in Terminal',
        content: `<div class="diagram-box">
# Check Python Version
$ python --version
Python 3.12.x

# Check Package Installer for Python (pip)
$ pip --version
pip 24.x.x</div>`
      },
      {
        title: 'Setting up VS Code (Visual Studio Code)',
        content: `<p>VS Code is the most popular editor for Python development:</p>
        <ul>
          <li>Install <strong>VS Code</strong> from <a href="https://code.visualstudio.com" target="_blank" style="color:#58a6ff;">code.visualstudio.com</a>.</li>
          <li>Open Extensions (Ctrl+Shift+X) and search for <strong>Python</strong> (by Microsoft) and install it.</li>
          <li>Create a new file named <code>main.py</code>, write your code, and click the Play ▶ button in the top right corner.</li>
        </ul>`
      },
      {
        title: 'Zero-Setup Option: Our Online Compiler',
        content: `<p>If you don't want to install software on your machine or you are using a mobile/tablet, you can write and run Python 3 directly in your browser with <strong>Our Compiler</strong> (<a href="/online-python-compiler.html" style="color:#58a6ff;">online-python-compiler.html</a>). It features Monaco Editor, dark theme, interactive inputs, and zero lag.</p>`
      }
    ],
    codeExample: `# Test Your Python Environment
import sys
import platform

print("🎉 Welcome to Python 3 Setup!")
print(f"System Architecture: {platform.architecture()[0]}")
print(f"Operating System: {platform.system()} {platform.release()}")
print(f"Python Executable Path: {sys.executable}")`,
    commonMistake: {
      title: 'Forgetting to check "Add Python to PATH" on Windows',
      text: 'If you get "python is not recognized as an internal or external command", re-run the Python installer, select "Modify", and ensure "Add Python to environment variables" is enabled.'
    },
    tryIt: {
      title: 'Run Environment Health Check',
      desc: 'Verify modules and standard paths in this interactive sandbox.',
      code: `import math
import os

print("✅ Math module loaded! Pi value:", math.pi)
print("✅ OS Name:", os.name)
print("✅ Environment check passed successfully!")`
    },
    faqs: [
      { q: 'What is pip in Python?', a: 'pip stands for "Pip Installs Packages". It is the official package management tool for installing third-party Python libraries like requests, numpy, and flask.' },
      { q: 'What is virtualenv / venv?', a: 'A virtual environment creates an isolated folder on your machine for a specific project so its installed dependencies do not clash with global Python packages.' }
    ]
  },
  {
    num: 3,
    slug: '03-first-program-hello-world',
    title: 'First Python Program — Hello World & Execution Mechanics',
    desc: 'Write and break down your very first Python program, understanding print(), string arguments, file extensions, and how CPython interprets your script.',
    phase: 'Phase 1: Python Basics',
    sections: [
      {
        title: 'Writing Hello World in Python',
        content: `<p>In Python, creating a Hello World program is literally a single line of code:</p>`
      },
      {
        title: 'Line-by-Line Anatomy of the Program',
        content: `<ul>
          <li><code>print</code> is a built-in Python function that outputs data to standard output (your console/terminal screen).</li>
          <li><code>()</code> parentheses are used to call the function and pass arguments inside.</li>
          <li><code>"Hello, World!"</code> is a <strong>string literal</strong> enclosed in quotation marks. You can use either single quotes <code>'Hello'</code> or double quotes <code>"Hello"</code>.</li>
        </ul>`
      },
      {
        title: 'How Python Executes Your Code Under the Hood',
        content: `<div class="diagram-box">
┌──────────────┐     Lexing / Parsing     ┌──────────────────┐
│  main.py     │ ───────────────────────> │  Bytecode (.pyc) │
│ (Source Code)│                          │ (Compiled VM)    │
└──────────────┘                          └─────────┬────────┘
                                                    │
                                     Executed by PVM│ (Python Virtual Machine)
                                                    v
                                          ┌──────────────────┐
                                          │ Terminal Output  │
                                          │ "Hello, World!"  │
                                          └──────────────────┘</div>`
      }
    ],
    codeExample: `# First Program: Hello World with multiple outputs
print("Hello, World! 🚀")
print("Welcome to Our Compiler's Interactive Python Course.")
print("Python was created by Guido van Rossum in 1991.")`,
    commonMistake: {
      title: 'Case Sensitivity in Python Functions',
      text: 'Python is strictly case-sensitive. Writing Print() or PRINT() instead of print() will result in a NameError.'
    },
    tryIt: {
      title: 'Customize Your Hello World Greeting',
      desc: 'Change the message to introduce yourself and calculate an inline expression.',
      code: `name = "Developer"
year = 2026

print(f"Hello {name}, you are learning Python in {year}!")
print("Calculation inside print:", 10 * 5 + 25)`
    },
    faqs: [
      { q: 'Why is no main() function required in Python?', a: 'In Python, code is executed from top to bottom as soon as the file is loaded. While you can define a def main(): function, simple scripts do not require any boilerplate class or main function structure.' }
    ]
  },
  {
    num: 4,
    slug: '04-python-syntax-and-indentation',
    title: 'Python Syntax & Indentation Rules (PEP 8)',
    desc: 'Master whitespace indentation, why Python uses indentation instead of curly braces, avoiding IndentationError, and following PEP 8 coding standards.',
    phase: 'Phase 1: Python Basics',
    sections: [
      {
        title: 'The Significance of Indentation in Python',
        content: `<p>In languages like C, Java, and JavaScript, code blocks (bodies of functions, if-statements, loops) are enclosed inside curly braces <code>{ }</code>. In Python, code blocks are defined entirely by <strong>whitespace indentation</strong>.</p>
        <p>A colon <code>:</code> indicates the start of a block, and every subsequent statement inside that block must be indented consistently (standard is <strong>4 spaces</strong>).</p>`
      },
      {
        title: 'Correct Indentation vs IndentationError',
        content: `<div class="diagram-box">
# ✅ CORRECT INDENTATION (4 spaces)
if score >= 90:
    print("Grade: A")
    print("Excellent work!")

# ❌ INCORRECT (Causes IndentationError)
if score >= 90:
print("This will crash immediately!")</div>`
      },
      {
        title: 'PEP 8 — The Official Python Style Guide',
        content: `<ul>
          <li>Use <strong>4 spaces per indentation level</strong> (do not mix tabs and spaces).</li>
          <li>Limit lines to 79 characters for readability.</li>
          <li>Use lowercase with underscores for variable and function names: <code>user_name</code>, <code>calculate_total()</code>.</li>
          <li>Use CamelCase for class names: <code>UserAccount</code>, <code>DatabaseConnection</code>.</li>
        </ul>`
      }
    ],
    codeExample: `# Indentation in Control Flow Blocks
temperature = 28

if temperature > 30:
    print("It's a hot sunny day! ☀️")
    print("Stay hydrated.")
elif temperature > 20:
    print("The weather is pleasant and warm. 🌤️")
    print("Perfect time for a walk.")
else:
    print("It is cool outside. 🧥")

print("Program execution finished.")`,
    commonMistake: {
      title: 'Mixing Tabs and Spaces',
      text: 'Mixing tab characters and space characters in the same block causes TabError. Configure your editor to automatically convert tabs to 4 spaces.'
    },
    tryIt: {
      title: 'Nested Indentation Practice',
      desc: 'Observe how nested blocks (loops inside if statements) use multiple levels of 4-space indentation.',
      code: `numbers = [12, 15, 20, 25, 30]

print("Filtering even numbers greater than 15:")
for num in numbers:
    # Level 1 indentation (4 spaces)
    if num % 2 == 0:
        # Level 2 indentation (8 spaces)
        if num > 15:
            # Level 3 indentation (12 spaces)
            print(f"  -> Found: {num}")`
    },
    faqs: [
      { q: 'Why did Python choose indentation over curly braces?', a: 'Indentation enforces clean, uniform formatting across all Python codebases, making code written by anyone easy to read and maintain.' }
    ]
  },
  {
    num: 5,
    slug: '05-python-comments',
    title: 'Python Comments — Single-line, Multi-line & Docstrings',
    desc: 'How to write readable comments, single-line hash syntax, multi-line blocks, function docstrings (__doc__), and best practices for self-documenting code.',
    phase: 'Phase 1: Python Basics',
    sections: [
      {
        title: 'Why Comments Matter',
        content: `<p>Comments are non-executable text lines ignored by the Python interpreter. They explain the <em>why</em> behind complex logic, document API contracts, and help other engineers (and your future self) understand code rationale.</p>`
      },
      {
        title: '1. Single-Line Comments (#)',
        content: `<p>Any text following a hash character <code>#</code> on that line is ignored by Python:</p>
        <pre style="background:#0d1117; padding:12px; border-radius:6px; color:#3fb950;"><code># This is a full-line comment
x = 100  # This is an inline comment explaining x</code></pre>`
      },
      {
        title: '2. Multi-Line Comments & Triple-Quoted Strings',
        content: `<p>You can use consecutive single-line comments or triple quotes (<code>"""</code> or <code>'''</code>) for multi-line documentation:</p>
        <pre style="background:#0d1117; padding:12px; border-radius:6px; color:#3fb950;"><code>"""
This is a multi-line comment block.
It can span across multiple lines
without needing a # on every line.
"""</code></pre>`
      },
      {
        title: '3. Docstrings (Documentation Strings)',
        content: `<p>When a triple-quoted string is placed as the very first statement inside a function, class, or module, it becomes its official <strong>docstring</strong>, accessible via <code>help(func)</code> or <code>func.__doc__</code>.</p>`
      }
    ],
    codeExample: `def calculate_discount(price: float, discount_percent: float) -> float:
    """
    Calculate final discounted price.
    
    Args:
        price: Original item price in dollars
        discount_percent: Discount rate (e.g. 20 for 20%)
        
    Returns:
        Final discounted total
    """
    # Validate input discount range
    if not (0 <= discount_percent <= 100):
        raise ValueError("Discount must be between 0 and 100")
        
    discount_amount = price * (discount_percent / 100.0)
    return round(price - discount_amount, 2)

# Inspect the function's docstring dynamically
print("📖 Function Docstring:")
print(calculate_discount.__doc__)

# Execute function
print("💰 Final Price:", calculate_discount(150.0, 15.0))`,
    commonMistake: {
      title: 'Over-commenting Obvious Code',
      text: 'Avoid comments that explain WHAT the syntax does (e.g., x = 1 # assign 1 to x). Instead, write comments that explain WHY a specific business logic or formula was chosen.'
    },
    tryIt: {
      title: 'Practice Writing Docstrings',
      desc: 'Add docstrings to a function and print help() metadata.',
      code: `def greet_user(name: str, language: str = "en") -> str:
    """Returns a localized greeting for the specified user."""
    greetings = {"en": "Hello", "es": "Hola", "te": "Namaskaram", "fr": "Bonjour"}
    prefix = greetings.get(language, "Hello")
    return f"{prefix}, {name}!"

print(greet_user("Balaji", "te"))
print(greet_user("Alex", "es"))
print("Docstring content:", greet_user.__doc__)`
    },
    faqs: [
      { q: 'What is the difference between a comment and a docstring?', a: 'Regular comments (#) are discarded by the compiler at parse time. Docstrings (""") are retained at runtime and stored in the __doc__ attribute of functions and classes for interactive help.' }
    ]
  },
  {
    num: 6,
    slug: '06-variables-and-naming-rules',
    title: 'Python Variables, Dynamic Typing & Naming Rules',
    desc: 'In-depth exploration of Python variables as object references, dynamic typing, multiple assignments, id() memory inspection, naming rules, and keywords.',
    phase: 'Phase 1: Python Basics',
    sections: [
      {
        title: 'Variables in Python: Names Bound to Objects',
        content: `<p>In Python, variables are not memory containers with fixed types (like in C or Java). Instead, variables are <strong>names (labels/pointers)</strong> that reference objects stored in memory.</p>`
      },
      {
        title: 'Dynamic Typing in Action',
        content: `<p>A variable can reference an integer at one moment, and later reference a string or list without causing compile errors:</p>
        <pre style="background:#0d1117; padding:12px; border-radius:6px; color:#3fb950;"><code>data = 42         # data points to an integer object
data = "Now text" # data now points to a string object</code></pre>`
      },
      {
        title: 'Python Naming Rules (Identifiers)',
        content: `<ul>
          <li>Must start with a letter (<code>a-z</code>, <code>A-Z</code>) or an underscore (<code>_</code>).</li>
          <li>Cannot start with a digit (e.g., <code>2user</code> is invalid, but <code>user2</code> is valid).</li>
          <li>Can only contain alphanumeric characters and underscores (<code>a-z, A-Z, 0-9, _</code>).</li>
          <li>Case-sensitive (<code>age</code>, <code>Age</code>, and <code>AGE</code> are three distinct variables).</li>
          <li>Cannot be a <strong>Python reserved keyword</strong> (such as <code>if, for, class, def, return, while, import</code>).</li>
        </ul>`
      },
      {
        title: 'Memory Address Inspection with id()',
        content: `<div class="diagram-box">
a = [1, 2, 3]
b = a          # b points to the SAME list in memory (id(a) == id(b))
c = [1, 2, 3]  # c is a NEW list with identical contents (id(a) != id(c))</div>`
      }
    ],
    codeExample: `import keyword

# Multiple assignment in Python
name, age, is_student = "Alex", 24, True
print(f"👤 Name: {name}, Age: {age}, Student: {is_student}")

# Swapping variables without a temp variable
x, y = 10, 20
print(f"Before swap: x = {x}, y = {y}")
x, y = y, x
print(f"After swap:  x = {x}, y = {y}")

# Check memory identity
num1 = 500
num2 = num1
print(f"Memory id of num1: {id(num1)}, num2: {id(num2)} (Same: {id(num1) == id(num2)})")

# Display Python's 35 Reserved Keywords
print(f"\n🔑 Total Reserved Keywords in Python 3: {len(keyword.kwlist)}")
print(", ".join(keyword.kwlist[:12]), "...")`,
    commonMistake: {
      title: 'Naming Variables After Built-in Functions',
      text: 'Avoid naming variables list, str, int, dict, or sum. Doing so shadows Python’s built-in functions and causes unexpected errors later in your script.'
    },
    tryIt: {
      title: 'Variable Reference Experiment',
      desc: 'Observe how mutable lists vs immutable numbers behave during reassignment.',
      code: `list_a = [10, 20, 30]
list_b = list_a
list_b.append(40)

print("list_a:", list_a)
print("list_b:", list_b)
print("Are they identical objects?", list_a is list_b)`
    },
    faqs: [
      { q: 'What is snake_case vs camelCase?', a: 'PEP 8 recommends snake_case (lowercase with underscores: total_price, user_id) for Python variables and functions, whereas CamelCase (UserProfile) is used for classes.' }
    ]
  },
  {
    num: 7,
    slug: '07-numbers-and-math-operations',
    title: 'Python Numbers — int, float, complex & Math Operations',
    desc: 'Master integer, floating-point, complex number types, floor division, modulus, exponentiation, precision quirks, and math module functions.',
    phase: 'Phase 1: Python Basics',
    sections: [
      {
        title: 'The Three Core Numeric Types in Python',
        content: `<ul>
          <li><strong>int (Integer):</strong> Whole numbers without decimal points (e.g. <code>42</code>, <code>-17</code>, <code>1_000_000</code>). Python 3 integers have <strong>arbitrary precision</strong> — they never overflow!</li>
          <li><strong>float (Floating Point):</strong> Numbers with decimal fractions (e.g. <code>3.14159</code>, <code>-0.005</code>, <code>2.5e3</code>). Implemented using IEEE 754 double precision.</li>
          <li><strong>complex:</strong> Numbers with real and imaginary parts (e.g. <code>3 + 4j</code>).</li>
        </ul>`
      },
      {
        title: 'Arithmetic Operators Overview',
        content: `<div class="diagram-box">
┌──────────┬────────────────────────┬─────────────┐
│ Operator │ Description            │ Example     │
├──────────┼────────────────────────┼─────────────┤
│ +        │ Addition               │ 10 + 3 = 13 │
│ -        │ Subtraction            │ 10 - 3 = 7  │
│ *        │ Multiplication         │ 10 * 3 = 30 │
│ /        │ True Division (float)  │ 10 / 3 = 3.333│
│ //       │ Floor Division (int)   │ 10 // 3 = 3 │
│ %        │ Modulus (Remainder)    │ 10 % 3 = 1  │
│ **       │ Exponentiation (Power) │ 10 ** 3 = 1000│
└──────────┴────────────────────────┴─────────────┘</div>`
      },
      {
        title: 'Useful Built-in Math Functions & math Module',
        content: `<p>Python provides built-in <code>abs()</code>, <code>round()</code>, <code>min()</code>, <code>max()</code>, <code>pow()</code>, plus the standard <code>math</code> library (e.g., <code>math.sqrt()</code>, <code>math.ceil()</code>, <code>math.floor()</code>, <code>math.sin()</code>, <code>math.log()</code>).</p>`
      }
    ],
    codeExample: `import math

# Arbitrary precision integers (no integer overflow in Python!)
huge_num = 2 ** 100
print(f"2 ** 100 = {huge_num}")

# Floating point arithmetic & floor division
total = 25
people = 4
print(f"True Division (/):  {total} / {people} = {total / people}")
print(f"Floor Division (//): {total} // {people} = {total // people}")
print(f"Modulus Remainder (%): {total} % {people} = {total % people}")

# Advanced math module helpers
radius = 7.5
area = math.pi * (radius ** 2)
print(f"\nCircle Area (r={radius}): {area:.2f}")
print(f"Square Root of 144: {math.sqrt(144)}")
print(f"Ceiling of 4.2: {math.ceil(4.2)}, Floor of 4.8: {math.floor(4.8)}")`,
    commonMistake: {
      title: 'Floating Point Representation Quirks',
      text: 'In Python (and all languages using IEEE 754), 0.1 + 0.2 evaluates to 0.30000000000000004 due to binary fraction rounding. For financial precision calculations, use Python’s decimal.Decimal module.'
    },
    tryIt: {
      title: 'Compound Interest Calculation',
      desc: 'Calculate investment compound interest using exponentiation operator (**).',
      code: `principal = 10000  # $10,000 initial
annual_rate = 0.08 # 8% annual return
years = 5

future_value = principal * ((1 + annual_rate) ** years)
profit = future_value - principal

print(f"💵 Initial Investment: \${principal:,}")
print(f"📈 Value after {years} years: \${future_value:,.2f}")
print(f"💰 Total Profit Earned: \${profit:,.2f}")`
    },
    faqs: [
      { q: 'How large can an integer be in Python?', a: 'In Python 3, integers have unlimited precision constrained only by available system RAM memory.' }
    ]
  },
  {
    num: 8,
    slug: '08-strings-slicing-and-methods',
    title: 'Python Strings — Indexing, Slicing, F-Strings & Methods',
    desc: 'Master string immutability, zero-based positive & negative indexing, slice syntax [start:stop:step], modern f-strings formatting, and essential string methods.',
    phase: 'Phase 1: Python Basics',
    sections: [
      {
        title: 'String Creation & Immutability',
        content: `<p>Strings in Python are ordered sequences of Unicode characters enclosed in single quotes <code>'...'</code>, double quotes <code>"..."</code>, or triple quotes <code>"""..."""</code>.</p>
        <p><strong>Crucial Rule:</strong> Strings are <strong>immutable</strong>. Once created, you cannot change individual characters in-place (e.g. <code>s[0] = 'X'</code> raises TypeError). You must create a new string object instead.</p>`
      },
      {
        title: 'Zero-Based Positive and Negative Indexing',
        content: `<div class="diagram-box">
 String:   P   Y   T   H   O   N
 Positive: 0   1   2   3   4   5
 Negative:-6  -5  -4  -3  -2  -1</div>`
      },
      {
        title: 'String Slicing Syntax: [start : stop : step]',
        content: `<ul>
          <li><code>s[0:3]</code> -> Characters from index 0 up to (but not including) index 3.</li>
          <li><code>s[2:]</code> -> From index 2 to the end of string.</li>
          <li><code>s[:4]</code> -> From start up to index 4.</li>
          <li><code>s[::-1]</code> -> Step is -1: reverses the entire string!</li>
        </ul>`
      },
      {
        title: 'Modern Formatted String Literals (F-Strings)',
        content: `<p>Introduced in Python 3.6, f-strings provide the cleanest way to interpolate variables and expressions directly inside strings:</p>
        <pre style="background:#0d1117; padding:12px; border-radius:6px; color:#3fb950;"><code>name = "Balaji"
score = 98.456
print(f"Student: {name}, Score: {score:.2f}%")</code></pre>`
      }
    ],
    codeExample: `text = "Python Programming in 2026"

# Indexing and Slicing
print("Original Text:", text)
print("First Char [0]:", text[0])
print("Last Char [-1]:", text[-1])
print("Slice [0:6]:", text[0:6])
print("Reversed [::-1]:", text[::-1])

# Essential String Methods
sample = "   hello, world! python is awesome.   "
print("\nCleaned & Formatted:")
print("strip():", sample.strip())
print("upper():", sample.strip().upper())
print("title():", sample.strip().title())
print("replace():", sample.strip().replace("world", "developers"))

# Splitting and Joining
words = text.split(" ")
print("\nSplit into words list:", words)
print("Joined with hyphens:", "-".join(words))`,
    commonMistake: {
      title: 'Trying to Mutate a String In-Place',
      text: 'Writing s[0] = "H" raises TypeError: "str" object does not support item assignment. Instead, use slicing: s = "H" + s[1:]'
    },
    tryIt: {
      title: 'String Palindrome Checker',
      desc: 'Check whether a word or phrase reads identically backwards and forwards.',
      code: `def check_palindrome(word: str) -> bool:
    cleaned = word.lower().replace(" ", "")
    return cleaned == cleaned[::-1]

test_words = ["racecar", "Python", "madam", "Never odd or even"]
for w in test_words:
    result = "✅ Palindrome" if check_palindrome(w) else "❌ Not palindrome"
    print(f"'{w}' -> {result}")`
    },
    faqs: [
      { q: 'Why are f-strings faster than .format() or % formatting?', a: 'F-strings are evaluated at runtime directly as optimized bytecode expressions rather than parsing format specification strings.' }
    ]
  },
  {
    num: 9,
    slug: '09-booleans-and-truthiness',
    title: 'Python Booleans & Truthy vs Falsy Evaluation',
    desc: 'Understand bool data type, True and False literals, comparison operators, logical and/or/not, and how Python evaluates truthiness of objects.',
    phase: 'Phase 1: Python Basics',
    sections: [
      {
        title: 'The Boolean Data Type (bool)',
        content: `<p>In Python, the <code>bool</code> data type represents logical truth values with exactly two singleton constants: <code>True</code> and <code>False</code> (note capital T and F).</p>
        <p>In Python, <code>bool</code> is actually a subclass of <code>int</code>, where <code>True == 1</code> and <code>False == 0</code>.</p>`
      },
      {
        title: 'Comparison & Logical Operators',
        content: `<ul>
          <li><strong>Comparisons:</strong> <code>==</code> (equal), <code>!=</code> (not equal), <code>&lt;</code>, <code>&gt;</code>, <code>&lt;=</code>, <code>&gt;=</code>.</li>
          <li><strong>Logical Operators:</strong> <code>and</code> (both true), <code>or</code> (at least one true), <code>not</code> (inverts boolean value).</li>
        </ul>`
      },
      {
        title: 'Truthy vs Falsy Values in Python',
        content: `<div class="diagram-box">
┌────────────────────────────────────────────────────────┐
│               FALSY VALUES IN PYTHON                   │
├────────────────────────────────────────────────────────┤
│ 1. Constants:      None, False                         │
│ 2. Zero Numbers:   0, 0.0, 0j, Decimal(0), Fraction(0) │
│ 3. Empty Sequences: '', (), [], {}, set(), range(0)    │
│ 4. Custom Objects: __bool__() returns False            │
└────────────────────────────────────────────────────────┘
Every other value in Python evaluates to TRUTHY (True)!</div>`
      }
    ],
    codeExample: `# Boolean expressions and logical operators
age = 20
has_license = True
has_insurance = False

can_drive = (age >= 18) and has_license and (not has_insurance or True)
print(f"🚗 Can legally drive? {can_drive}")

# Testing Truthiness of various Python objects
test_values = [
    True, False, 1, 0, -5, "", "Hello", [], [1, 2], {}, {"key": "val"}, None
]

print("\n🔍 Truthiness Evaluation Table:")
for val in test_values:
    print(f"  {repr(val):<18} -> bool(): {bool(val)}")`,
    commonMistake: {
      title: 'Using == True instead of direct boolean evaluation',
      text: 'Avoid writing "if is_active == True:". The Pythonic way is simply "if is_active:" or "if not is_active:".'
    },
    tryIt: {
      title: 'Falsy Value Guard Clause Practice',
      desc: 'Use truthiness to validate input collections and default configurations.',
      code: `def process_user_cart(items):
    # Empty list [] evaluates to Falsy
    if not items:
        return "🛒 Your shopping cart is empty! Please add items."
    return f"✅ Processing {len(items)} items: {', '.join(items)}"

print(process_user_cart([]))
print(process_user_cart(["MacBook Pro", "AirPods", "USB-C Hub"]))`
    },
    faqs: [
      { q: 'Can you perform arithmetic with booleans in Python?', a: 'Yes! Because bool is a subclass of int, True + True equals 2, and sum([True, False, True]) equals 2.' }
    ]
  },
  {
    num: 10,
    slug: '10-none-type',
    title: 'Python NoneType — Understanding None in Python',
    desc: 'Deep dive into Python None singleton, NoneType object, return value of void functions, default parameter sentinel values, and identity checking with is None.',
    phase: 'Phase 1: Python Basics',
    sections: [
      {
        title: 'What is None in Python?',
        content: `<p>In Python, <code>None</code> is a special constant that represents the <strong>absence of a value</strong> or a null state (equivalent to <code>null</code> in Java/JavaScript or <code>nil</code> in Ruby/Go).</p>
        <p><code>None</code> is an object of its own data type called <code>NoneType</code>. There is only ever one instance of <code>None</code> in the entire Python runtime (it is a strict <strong>singleton</strong>).</p>`
      },
      {
        title: 'Where Does None Appear Naturally?',
        content: `<ul>
          <li><strong>Void Functions:</strong> Any Python function that does not explicitly return a value returns <code>None</code> automatically.</li>
          <li><strong>Default Arguments:</strong> Used as sentinel values in function signatures for optional or mutable parameters.</li>
          <li><strong>Database & API results:</strong> Represents missing fields or non-existent record queries.</li>
        </ul>`
      },
      {
        title: 'Always Check with "is None" (Identity Check)',
        content: `<p>Because <code>None</code> is a singleton, you should always compare with <code>is None</code> or <code>is not None</code> rather than <code>== None</code>. The <code>is</code> operator checks exact memory object identity, which is faster and immune to custom class <code>__eq__</code> operator overrides.</p>`
      }
    ],
    codeExample: `# NoneType in functions and variables
result = None
print(f"Value: {result}, Type: {type(result)}")

def print_message(msg):
    print(f"Message: {msg}")
    # No return statement here

ret = print_message("Hello from Python!")
print(f"Function return value: {ret} (is None: {ret is None})")

# Correct use of None as default mutable argument sentinel
def add_item_to_list(item, target_list=None):
    if target_list is None:
        target_list = []  # creates a fresh list every call
    target_list.append(item)
    return target_list

list1 = add_item_to_list("Apple")
list2 = add_item_to_list("Banana")
print("\nList 1:", list1)
print("List 2:", list2)`,
    commonMistake: {
      title: 'Using Mutable Default Arguments (e.g. def func(items=[]))',
      text: 'Default arguments are evaluated ONCE when the function is defined. If you use def func(items=[]), all calls without an argument share the exact same list! Always use def func(items=None) and initialize inside the function.'
    },
    tryIt: {
      title: 'User Lookup with None Handling',
      desc: 'Safely handle non-existent keys using dict.get() which returns None by default.',
      code: `user_db = {"101": "Balaji", "102": "Sarah", "103": "David"}

def lookup_user(user_id):
    user = user_db.get(user_id)
    if user is None:
        return f"❌ User {user_id} not found in records."
    return f"✅ User Found: {user}"

print(lookup_user("101"))
print(lookup_user("999"))`
    },
    faqs: [
      { q: 'Is None the same as False or 0?', a: 'No. While None evaluates to Falsy in boolean context, None is not equal to 0 or False (None == 0 is False, None == False is False).' }
    ]
  },
  {
    num: 11,
    slug: '11-type-checking-and-conversion',
    title: 'Python Type Checking with type(), isinstance() & Type Casting',
    desc: 'Learn how to inspect data types with type() and isinstance(), understand implicit type coercion, and perform explicit type casting (int, float, str, list).',
    phase: 'Phase 1: Python Basics',
    sections: [
      {
        title: 'Inspecting Types: type() vs isinstance()',
        content: `<p>Python provides two main built-in functions for runtime type inspection:</p>
        <ul>
          <li><code>type(obj)</code>: Returns the exact class/type of the object.</li>
          <li><code>isinstance(obj, class_or_tuple)</code>: Checks if an object is an instance of a class <strong>or any of its subclasses</strong> (recommended for robust OOP checks).</li>
        </ul>`
      },
      {
        title: 'Implicit Type Conversion (Type Coercion)',
        content: `<p>Python automatically converts smaller numeric types to wider types to prevent data loss. For example, adding an <code>int</code> and a <code>float</code> automatically yields a <code>float</code>:</p>
        <pre style="background:#0d1117; padding:12px; border-radius:6px; color:#3fb950;"><code>num_int = 10     # int
num_float = 2.5  # float
res = num_int + num_float  # res becomes 12.5 (float)</code></pre>`
      },
      {
        title: 'Explicit Type Casting Functions',
        content: `<ul>
          <li><code>int("123")</code> -> Converts string/float to integer (e.g. <code>int(7.8) -> 7</code> truncates decimal).</li>
          <li><code>float("3.14")</code> -> Converts string/integer to float.</li>
          <li><code>str(100)</code> -> Converts any object to its string representation.</li>
          <li><code>list("abc")</code> -> <code>['a', 'b', 'c']</code>.</li>
          <li><code>tuple([1, 2])</code> -> <code>(1, 2)</code>.</li>
          <li><code>set([1, 2, 2, 3])</code> -> <code>{1, 2, 3}</code> (removes duplicates).</li>
        </ul>`
      }
    ],
    codeExample: `# Type inspection
data = 42.5
print(f"type(data): {type(data)}")
print(f"isinstance(data, float): {isinstance(data, float)}")
print(f"isinstance(data, (int, float)): {isinstance(data, (int, float))}")

# Explicit type conversions
str_score = "95"
int_score = int(str_score)
print(f"\nParsed Score + Bonus: {int_score + 5}")

# Converting between collections
colors_list = ["red", "blue", "green", "red", "blue"]
unique_colors = set(colors_list)
print("Original List:", colors_list)
print("Unique Set:", unique_colors)

# Safe integer casting with error handling
def safe_int_convert(val, default=0):
    try:
        return int(val)
    except (ValueError, TypeError):
        return default

print("safe_int_convert('500'):", safe_int_convert("500"))
print("safe_int_convert('invalid_text'):", safe_int_convert("invalid_text"))`,
    commonMistake: {
      title: 'Trying to cast float strings directly with int("3.14")',
      text: 'Calling int("3.14") raises ValueError. To parse a float string to an integer, either convert to float first: int(float("3.14")) or clean the string before casting.'
    },
    tryIt: {
      title: 'Type Casting Pipeline',
      desc: 'Convert a CSV-formatted string of numbers into a sorted list of integers.',
      code: `csv_data = "45, 12, 88, 3, 99, 24"
# Split, strip whitespace, and cast to int
numbers = [int(num.strip()) for num in csv_data.split(",")]
numbers.sort()

print("Sorted Integers:", numbers)
print("Sum:", sum(numbers), "Average:", sum(numbers)/len(numbers))`
    },
    faqs: [
      { q: 'Why is isinstance() preferred over type() == ... ?', a: 'isinstance() correctly accounts for inheritance hierarchies (e.g. isinstance(True, int) is True because bool inherits from int), making functions open for polymorphism.' }
    ]
  },
  {
    num: 12,
    slug: '12-basic-input-and-output',
    title: 'Python Input & Output — print(), input() & Stdin Formatting',
    desc: 'Master console output with print() sep and end parameters, reading user input via input(), handling interactive terminal inputs, and stdin pipelines.',
    phase: 'Phase 1: Python Basics',
    sections: [
      {
        title: 'Mastering the print() Function Parameters',
        content: `<p>The <code>print()</code> function takes optional keyword arguments that control output formatting:</p>
        <ul>
          <li><code>sep="..."</code>: The separator string inserted between multiple arguments (default is a single space <code>' '</code>).</li>
          <li><code>end="..."</code>: The string appended after the last argument (default is newline <code>'\\n'</code>). Setting <code>end=""</code> keeps output on the same line!</li>
          <li><code>file=...</code>: Redirects output stream (default is <code>sys.stdout</code>).</li>
        </ul>`
      },
      {
        title: 'Reading User Input with input()',
        content: `<p>The <code>input(prompt)</code> function pauses program execution, displays the prompt, and waits for the user to type text and press Enter.</p>
        <p><strong>Crucial Rule:</strong> <code>input()</code> always returns data as a <strong>string (str)</strong>. If you want numbers, you must explicitly cast: <code>int(input())</code> or <code>float(input())</code>.</p>`
      },
      {
        title: 'Interactive Stdin in Our Compiler',
        content: `<p>When executing Python programs in <strong>Our Compiler</strong> that call <code>input()</code>, you can type values directly into the interactive Terminal stdin console or pre-enter multiline inputs before clicking Run.</p>`
      }
    ],
    codeExample: `import sys

# Custom separator and end characters
print("2026", "08", "14", sep="-")  # Output: 2026-08-14
print("Loading progress: ", end="")
for step in range(1, 4):
    print(f"[{step}/3] ", end="")
print("Done! ✅")

# Reading inputs and calculating result
print("\n--- User Input Simulation ---")
mock_name = "Alex"
mock_age_str = "25"

# Simulating input processing
user_name = mock_name
user_age = int(mock_age_str)
birth_year = 2026 - user_age

print(f"Hello, {user_name}!")
print(f"Based on your age ({user_age}), you were born around {birth_year}.")`,
    commonMistake: {
      title: 'Adding Strings and Integers from input()',
      text: 'Writing total = input("Enter num: ") + 5 raises TypeError: can only concatenate str (not "int") to str. Always convert: total = int(input("Enter num: ")) + 5.'
    },
    tryIt: {
      title: 'Interactive Simple Calculator',
      desc: 'Read two numbers and an operator to calculate the arithmetic result.',
      code: `# Arithmetic Calculator Demo
num1 = 50
num2 = 8
operator = "*"

if operator == "+":
    result = num1 + num2
elif operator == "-":
    result = num1 - num2
elif operator == "*":
    result = num1 * num2
elif operator == "/" and num2 != 0:
    result = num1 / num2
else:
    result = "Invalid Operation"

print(f"🧮 Result of {num1} {operator} {num2} = {result}")`
    },
    faqs: [
      { q: 'How do you read multiple integers on a single line?', a: 'Use string split and list comprehension or map: a, b = map(int, input().split()).' }
    ]
  }
];

console.log(`Generating ${LESSONS.length} comprehensive Python tutorial lessons...`);

// Helper to generate lesson HTML
function generateLessonHtml(lesson) {
  const prevLesson = LESSONS[lesson.num - 2];
  const nextLesson = LESSONS[lesson.num];

  const sidebarLinks = LESSONS.map(l => {
    const activeClass = l.num === lesson.num ? ' class="active"' : '';
    return `    <a href="${l.slug}.html"${activeClass}>${l.num}. ${l.title.split('—')[0].split('?')[0].trim()}</a>`;
  }).join('\n');

  const sectionsHtml = lesson.sections.map((sec, idx) => `
    <div class="section-title"><span class="num">${idx + 1}</span>${sec.title}</div>
    <div class="section-content">${sec.content}</div>
  `).join('\n');

  const faqsHtml = lesson.faqs.map(f => `
    <div class="faq-card">
      <h4>Q: ${f.q}</h4>
      <p>${f.a}</p>
    </div>
  `).join('\n');

  const schemaJson = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": `${lesson.title} — Python 3 Tutorial`,
    "description": lesson.desc,
    "articleSection": lesson.phase,
    "author": {
      "@type": "Organization",
      "name": "Our Compiler Editorial Team",
      "url": "https://www.ourcompiler.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Our Compiler",
      "url": "https://www.ourcompiler.com"
    },
    "datePublished": "2026-01-15",
    "dateModified": "2026-08-14"
  }, null, 2);

  const faqSchemaJson = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": lesson.faqs.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.a
      }
    }))
  }, null, 2);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${lesson.title} — Python 3 Tutorial | Our Compiler</title>
  <meta name="description" content="${lesson.desc}" />
  <meta name="keywords" content="python tutorial, python 3 tutorial, learn python, ${lesson.title.toLowerCase()}, python online compiler" />
  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />
  <link rel="icon" type="image/png" href="/logo.png" />
  <link rel="canonical" href="https://www.ourcompiler.com/blog-python/${lesson.slug}.html" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;500;600;700&family=Sora:wght@400;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/blog-style.css" />
  <link rel="stylesheet" href="style.css" />
  <link rel="stylesheet" href="/site-nav.css" />

  <!-- Schema.org JSON-LD -->
  <script type="application/ld+json">
${schemaJson}
  </script>
  <script type="application/ld+json">
${faqSchemaJson}
  </script>

  <!-- Code Preload & Theme Script -->
  <script>
    (function() {
      const currentTheme = localStorage.getItem('theme') || 'dark';
      if (currentTheme === 'light') {
        document.documentElement.classList.add('light-theme');
        document.addEventListener('DOMContentLoaded', () => {
          document.body.classList.add('light-theme');
        });
      }
      window.addEventListener('DOMContentLoaded', () => {
        // Theme Toggle
        const topnav = document.querySelector('.topnav');
        if (topnav) {
          const toggleBtn = document.createElement('button');
          toggleBtn.className = 'blog-theme-toggle';
          toggleBtn.style.cssText = 'margin-left: auto; flex-shrink: 0; background: rgba(255, 255, 255, 0.15); color: #ffffff; border: 1px solid rgba(255, 255, 255, 0.25); border-radius: 6px; padding: 4px 10px; font-size: 12px; font-weight: 600; cursor: pointer; font-family: "Inter", sans-serif; transition: all 0.2s; white-space: nowrap; margin-right: 12px;';
          const updateText = () => {
            const isLight = document.body.classList.contains('light-theme');
            toggleBtn.innerHTML = isLight ? '🌙 Dark' : '☀️ Light';
          };
          updateText();
          toggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            document.documentElement.classList.toggle('light-theme');
            const isLight = document.body.classList.contains('light-theme');
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
            updateText();
          });
          topnav.appendChild(toggleBtn);
        }

        // Decorate Code Blocks
        document.querySelectorAll('.code-block').forEach(block => {
          const header = block.querySelector('.code-block-header');
          const codeEl = block.querySelector('pre code');
          if (!header || !codeEl) return;

          let actionsContainer = header.querySelector('.code-actions');
          if (!actionsContainer) {
            actionsContainer = document.createElement('div');
            actionsContainer.className = 'code-actions';
            actionsContainer.style.cssText = 'display: flex; gap: 8px; align-items: center; margin-left: auto;';
            const tryBtn = header.querySelector('.try-btn');
            if (tryBtn) actionsContainer.appendChild(tryBtn);
            header.appendChild(actionsContainer);
          }

          const copyBtn = document.createElement('button');
          copyBtn.className = 'copy-btn';
          copyBtn.innerHTML = '📋 Copy';
          copyBtn.style.cssText = 'background: rgba(255, 255, 255, 0.15); color: #ffffff; border: 1px solid rgba(255, 255, 255, 0.25); border-radius: 6px; padding: 4px 10px; font-size: 11px; font-weight: 600; cursor: pointer; transition: all 0.2s; font-family: "Inter", sans-serif; white-space: nowrap;';
          copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(codeEl.textContent).then(() => {
              copyBtn.innerHTML = '✅ Copied!';
              setTimeout(() => { copyBtn.innerHTML = '📋 Copy'; }, 2000);
            });
          });
          actionsContainer.insertBefore(copyBtn, actionsContainer.firstChild);

          const tryBtn = actionsContainer.querySelector('.try-btn');
          if (tryBtn) {
            tryBtn.addEventListener('click', (e) => {
              e.preventDefault();
              localStorage.setItem('code_python3', codeEl.textContent);
              window.location.href = '/online-python-compiler.html';
            });
          }
        });

        // Wire Try-Box run buttons
        document.querySelectorAll('.try-box').forEach(tryBox => {
          const codeEl = tryBox.querySelector('pre code');
          const runBtn = tryBox.querySelector('.run-btn');
          if (codeEl && runBtn) {
            runBtn.addEventListener('click', (e) => {
              e.preventDefault();
              localStorage.setItem('code_python3', codeEl.textContent);
              window.location.href = '/online-python-compiler.html';
            });
          }
        });
      });
    })();
  </script>
</head>
<body class="lang-python">

<!-- TOP LANGUAGE BAR -->
<nav class="topnav">
  <a href="/" class="brand">🖥️ Our Compiler</a>
  <a href="/blog-python.html" class="active">Python</a>
  <a href="/blog-java.html">Java</a>
  <a href="/blog-javascript.html">JavaScript</a>
  <a href="/blog-c.html">C</a>
  <a href="/blog-cpp.html">C++</a>
  <a href="/?lang=csharp">C#</a>
  <a href="/blog-go.html">Go</a>
  <a href="/blog-ruby.html">Ruby</a>
  <a href="/blog-rust.html">Rust</a>
  <a href="/blog-php.html">PHP</a>
  <a href="/online-html-editor.html">HTML/CSS/JS</a>
</nav>

<div class="layout">
  <!-- LEFT SIDEBAR -->
  <aside class="sidebar">
    <div class="sidebar-heading">Python 3 Course</div>
    <a href="/blog-python.html">🐍 Python HOME</a>
${sidebarLinks}

    <div class="sidebar-heading">Interactive Playground</div>
    <a href="/online-python-compiler.html" style="color:#58a6ff; font-weight:700;">▶ Try Python 3 Online</a>
    <a href="/blog.html">📚 All Tutorials</a>

    <div class="sidebar-heading">Other Languages</div>
    <a href="/blog-java.html">Java Course (27 Lessons)</a>
    <a href="/blog-c.html">C Language (20 Lessons)</a>
    <a href="/blog-javascript.html">JavaScript</a>
    <a href="/blog-cpp.html">C++</a>
    <a href="/online-html-editor.html">HTML/CSS/JS Editor</a>
  </aside>

  <!-- MAIN CONTENT -->
  <main class="content">
    <div class="breadcrumb">
      <a href="/">Home</a><span class="sep">›</span>
      <a href="/blog.html">Tutorials</a><span class="sep">›</span>
      <a href="/blog-python.html">Python 3</a><span class="sep">›</span>
      <span class="current">Lesson ${lesson.num}: ${lesson.title.split('—')[0]}</span>
    </div>

    <h1 class="page-title">${lesson.title}</h1>

    <div class="page-meta">
      <span class="badge">🐍 Python 3</span>
      <span class="badge">🟢 Lesson ${lesson.num} of ${LESSONS.length}</span>
      <span class="badge">📂 ${lesson.phase}</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

    <div class="intro-box">
      ${lesson.desc}
    </div>

${sectionsHtml}

    <div class="section-title"><span class="num">💻</span> Complete Executable Code Example</div>
    <div class="code-block">
      <div class="code-block-header">
        <span class="lang-tag">Python 3</span>
        <a class="try-btn" href="/online-python-compiler.html">▶ Run in Compiler</a>
      </div>
      <pre><code>${lesson.codeExample}</code></pre>
    </div>

    <div class="callout">
      <div class="callout-title">⚠️ Common Pitfall: ${lesson.commonMistake.title}</div>
      <p>${lesson.commonMistake.text}</p>
    </div>

    <div class="try-box">
      <div class="try-title">💻 Try It Yourself — Hands-on Practice Challenge</div>
      <p>${lesson.tryIt.desc}</p>
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">Python 3</span>
          <a class="try-btn" href="/online-python-compiler.html">▶ Run in Compiler</a>
        </div>
        <pre><code>${lesson.tryIt.code}</code></pre>
      </div>
      <a class="run-btn" href="/online-python-compiler.html">Run This Code in Our Online Compiler →</a>
    </div>

    <div class="section-title"><span class="num">❓</span> Frequently Asked Questions (FAQ)</div>
${faqsHtml}

    <div class="author">
      <div class="avatar">OC</div>
      <div>
        <strong>Written by Our Compiler Technical Editorial Team</strong><br>
        <span>Reviewed for accuracy & tested on Python 3.12+ runtime · Last updated August 2026</span>
      </div>
    </div>

    <div class="nav-footer">
      ${prevLesson ? `
      <a href="${prevLesson.slug}.html" class="nav-btn">
        <span class="label">← Previous Lesson</span>
        <span class="title">${prevLesson.num}. ${prevLesson.title.split('—')[0]}</span>
      </a>` : `
      <a href="/blog-python.html" class="nav-btn">
        <span class="label">← Python Overview</span>
        <span class="title">Course Index</span>
      </a>`}

      ${nextLesson ? `
      <a href="${nextLesson.slug}.html" class="nav-btn" style="text-align:right;">
        <span class="label">Next Lesson →</span>
        <span class="title">${nextLesson.num}. ${nextLesson.title.split('—')[0]}</span>
      </a>` : `
      <a href="/online-python-compiler.html" class="nav-btn" style="text-align:right;">
        <span class="label">Course Finished 🎉</span>
        <span class="title">▶ Practice in Python IDE</span>
      </a>`}
    </div>
  </main>
</div>

<script src="/site-nav.js" defer></script>
</body>
</html>`;
}

// Generate all lesson files
LESSONS.forEach(lesson => {
  const filePath = path.join(pythonDir, `${lesson.slug}.html`);
  fs.writeFileSync(filePath, generateLessonHtml(lesson), 'utf8');
  console.log(`✅ Generated public/blog-python/${lesson.slug}.html`);
});

// 2. Generate Master public/blog-python.html Hub
const hubCurriculumRows = LESSONS.map(l => `
      <tr>
        <td style="font-weight:700; color:#58a6ff;">Lesson ${l.num}</td>
        <td><strong><a href="/blog-python/${l.slug}.html" style="color:var(--text); text-decoration:none;">${l.title}</a></strong></td>
        <td><span style="font-size:12px; color:var(--text3);">${l.phase}</span></td>
        <td><a href="/blog-python/${l.slug}.html" style="background:rgba(56,189,248,0.15); color:#38bdf8; padding:4px 10px; border-radius:6px; font-size:12px; text-decoration:none; font-weight:600;">Read Lesson →</a></td>
      </tr>
`).join('');

const hubSidebarLinks = LESSONS.map(l => `    <a href="/blog-python/${l.slug}.html">${l.num}. ${l.title.split('—')[0].split('?')[0].trim()}</a>`).join('\n');

const hubHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Python 3 Master Tutorial & Complete Course (2026 Edition) | Our Compiler</title>
  <meta name="description" content="Master Python 3 from complete beginner to advanced with our interactive 25-lesson curriculum, live code executions, memory models, PEP 8 best practices, and interview prep." />
  <meta name="keywords" content="python tutorial, python 3 course, learn python online, python basics, python data structures, python oop, free python tutorial" />
  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />
  <link rel="icon" type="image/png" href="/logo.png" />
  <link rel="canonical" href="https://www.ourcompiler.com/blog-python.html" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;500;600;700&family=Sora:wght@400;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/blog-style.css" />
  <link rel="stylesheet" href="/site-nav.css" />

  <!-- Schema.org Course Structured Data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Python 3 Complete Masterclass (2026 Edition)",
    "description": "Learn Python 3 from basics to advanced OOP, data structures, and algorithms with interactive browser compilation.",
    "provider": {
      "@type": "Organization",
      "name": "Our Compiler",
      "url": "https://www.ourcompiler.com"
    },
    "educationalLevel": "Beginner to Advanced",
    "isAccessibleForFree": true,
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": "Online",
      "courseWorkload": "PT15H"
    }
  }
  </script>

  <!-- Theme Script & Code Preload -->
  <script>
    (function() {
      const currentTheme = localStorage.getItem('theme') || 'dark';
      if (currentTheme === 'light') {
        document.documentElement.classList.add('light-theme');
        document.addEventListener('DOMContentLoaded', () => {
          document.body.classList.add('light-theme');
        });
      }
      window.addEventListener('DOMContentLoaded', () => {
        const topnav = document.querySelector('.topnav');
        if (topnav) {
          const toggleBtn = document.createElement('button');
          toggleBtn.className = 'blog-theme-toggle';
          toggleBtn.style.cssText = 'margin-left: auto; flex-shrink: 0; background: rgba(255, 255, 255, 0.15); color: #ffffff; border: 1px solid rgba(255, 255, 255, 0.25); border-radius: 6px; padding: 4px 10px; font-size: 12px; font-weight: 600; cursor: pointer; font-family: "Inter", sans-serif; transition: all 0.2s; white-space: nowrap; margin-right: 12px;';
          const updateText = () => {
            const isLight = document.body.classList.contains('light-theme');
            toggleBtn.innerHTML = isLight ? '🌙 Dark' : '☀️ Light';
          };
          updateText();
          toggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            document.documentElement.classList.toggle('light-theme');
            const isLight = document.body.classList.contains('light-theme');
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
            updateText();
          });
          topnav.appendChild(toggleBtn);
        }

        document.querySelectorAll('.code-block').forEach(block => {
          const codeEl = block.querySelector('pre code');
          const tryBtn = block.querySelector('.try-btn');
          if (codeEl && tryBtn) {
            tryBtn.addEventListener('click', (e) => {
              e.preventDefault();
              localStorage.setItem('code_python3', codeEl.textContent);
              window.location.href = '/online-python-compiler.html';
            });
          }
        });
      });
    })();
  </script>
</head>
<body class="lang-python">

<!-- TOP NAVIGATION -->
<nav class="topnav">
  <a href="/" class="brand">🖥️ Our Compiler</a>
  <a href="/blog-python.html" class="active">Python</a>
  <a href="/blog-java.html">Java</a>
  <a href="/blog-javascript.html">JavaScript</a>
  <a href="/blog-c.html">C</a>
  <a href="/blog-cpp.html">C++</a>
  <a href="/?lang=csharp">C#</a>
  <a href="/blog-go.html">Go</a>
  <a href="/blog-ruby.html">Ruby</a>
  <a href="/blog-rust.html">Rust</a>
  <a href="/blog-php.html">PHP</a>
  <a href="/online-html-editor.html">HTML/CSS/JS</a>
</nav>

<div class="layout">
  <!-- LEFT SIDEBAR -->
  <aside class="sidebar">
    <div class="sidebar-heading">Python 3 Course</div>
    <a href="/blog-python.html" class="active">🐍 Python HOME</a>
${hubSidebarLinks}

    <div class="sidebar-heading">Interactive Playground</div>
    <a href="/online-python-compiler.html" style="color:#58a6ff; font-weight:700;">▶ Try Python 3 Online</a>
    <a href="/blog.html">📚 All Tutorials</a>

    <div class="sidebar-heading">Other Languages</div>
    <a href="/blog-java.html">Java Course (27 Lessons)</a>
    <a href="/blog-c.html">C Language (20 Lessons)</a>
    <a href="/blog-javascript.html">JavaScript</a>
    <a href="/blog-cpp.html">C++</a>
    <a href="/online-html-editor.html">HTML/CSS/JS Editor</a>
  </aside>

  <!-- MAIN CONTENT -->
  <main class="content">
    <div class="breadcrumb">
      <a href="/">Home</a><span class="sep">›</span>
      <a href="/blog.html">Tutorials</a><span class="sep">›</span>
      <span class="current">Python 3 Masterclass</span>
    </div>

    <h1 class="page-title">Python 3 Programming Master Tutorial</h1>

    <div class="page-meta">
      <span class="badge">🐍 Python 3.12+</span>
      <span class="badge">🟢 Comprehensive 25-Lesson Curriculum</span>
      <span class="badge">📅 2026 Edition</span>
      <span class="badge">⚡ Zero-Setup Interactive Practice</span>
    </div>

    <div class="intro-box">
      <p>Welcome to <strong>Our Compiler's Python 3 Master Course</strong>. Python is currently the world's most versatile, in-demand programming language powering Artificial Intelligence, Machine Learning, Data Science, Web Development (Django/FastAPI), Cybersecurity, and Cloud Automation. This comprehensive guide takes you step-by-step from core syntax fundamentals to advanced object-oriented programming with runnable code examples inside our free online sandbox.</p>
    </div>

    <div class="section-title"><span class="num">🚀</span> Why Learn Python 3 in 2026?</div>
    <p>Python's clean, expressive syntax emphasizes readability and developer productivity. According to global developer indices (TIOBE, IEEE Spectrum, Stack Overflow Developer Surveys), Python consistently ranks as the <strong>#1 most popular programming language</strong>. Whether you are aiming to build AI chatbots with PyTorch, create scalable web APIs with FastAPI, analyze financial data with Pandas, or write DevOps automation scripts, Python is the indispensable foundation.</p>

    <!-- Quick Start Card -->
    <div style="background: linear-gradient(135deg, rgba(56,189,248,0.12), rgba(99,102,241,0.06)); border: 1px solid rgba(56,189,248,0.3); border-radius: 12px; padding: 24px; margin: 28px 0;">
      <h3 style="color:#38bdf8; margin-bottom: 10px; font-size:18px;">🎯 Ready to Start Learning?</h3>
      <p style="color:var(--text2); margin-bottom: 16px; font-size:14.5px;">Begin with Lesson 1 to understand Python's architecture, design philosophy, and core execution flow.</p>
      <a href="/blog-python/01-what-is-python-features-and-uses.html" style="background:linear-gradient(135deg, #38bdf8, #6366f1); color:#fff; font-weight:700; padding:10px 22px; border-radius:8px; text-decoration:none; display:inline-block;">Start Lesson 1: What is Python? →</a>
    </div>

    <!-- Complete Curriculum Table -->
    <div class="section-title"><span class="num">📚</span> Complete Course Curriculum (${LESSONS.length} Lessons)</div>
    <p>Browse through the curriculum organized systematically across learning phases:</p>

    <div style="overflow-x:auto; margin-top:16px;">
      <table class="tbl" style="width:100%; border-collapse:collapse;">
        <thead>
          <tr style="background:var(--bg3); text-align:left;">
            <th style="padding:12px 16px;">Lesson #</th>
            <th style="padding:12px 16px;">Lesson Title & Topic</th>
            <th style="padding:12px 16px;">Category Phase</th>
            <th style="padding:12px 16px;">Action</th>
          </tr>
        </thead>
        <tbody>
${hubCurriculumRows}
        </tbody>
      </table>
    </div>

    <!-- Interactive Sample -->
    <div class="section-title" style="margin-top:36px;"><span class="num">💻</span> Interactive Python 3 Starter Demo</div>
    <p>Test the interactive Python runner right here in Our Compiler:</p>
    <div class="code-block">
      <div class="code-block-header">
        <span class="lang-tag">Python 3</span>
        <a class="try-btn" href="/online-python-compiler.html">▶ Run Code in Online Editor</a>
      </div>
      <pre><code># Quick Python 3 Interactive Demo
class Student:
    def __init__(self, name: str, grade: float):
        self.name = name
        self.grade = grade

    def status(self) -> str:
        return "Pass 🎉" if self.grade >= 60 else "Review ⚠️"

students = [
    Student("Balaji", 94.5),
    Student("Sarah", 88.0),
    Student("David", 58.5)
]

print("🎓 Student Grading Report:")
for s in students:
    print(f"  • {s.name:<8}: {s.grade}% -> {s.status()}")</code></pre>
    </div>

    <div class="author" style="margin-top:40px;">
      <div class="avatar">OC</div>
      <div>
        <strong>Curated by Our Compiler Technical Editorial Team</strong><br>
        <span>Published for 2026 Academic & Industry Reference · 100% Free & Open Access</span>
      </div>
    </div>
  </main>
</div>

<script src="/site-nav.js" defer></script>
</body>
</html>`;

fs.writeFileSync(path.join(baseDir, 'blog-python.html'), hubHtml, 'utf8');
console.log('✅ Generated master public/blog-python.html hub');

// 3. Create Redirects in old public/python/ folder so no broken links occur
const redirectFiles = [
  { old: 'intro.html', target: '/blog-python/01-what-is-python-features-and-uses.html' },
  { old: 'variables.html', target: '/blog-python/06-variables-and-naming-rules.html' },
  { old: 'operators.html', target: '/blog-python/07-numbers-and-math-operations.html' },
  { old: 'strings.html', target: '/blog-python/08-strings-slicing-and-methods.html' },
  { old: 'conditionals.html', target: '/blog-python/09-booleans-and-truthiness.html' },
  { old: 'input.html', target: '/blog-python/12-basic-input-and-output.html' },
];

if (fs.existsSync(oldPythonDir)) {
  redirectFiles.forEach(r => {
    const filePath = path.join(oldPythonDir, r.old);
    const html = `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${r.target}"><link rel="canonical" href="https://www.ourcompiler.com${r.target}"></head><body><p>Redirecting to <a href="${r.target}">${r.target}</a>...</p></body></html>`;
    fs.writeFileSync(filePath, html, 'utf8');
  });
  console.log('✅ Updated old python folder redirects to new blog-python lessons');
}
