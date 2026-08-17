// Phase 1: Python Basics Data
module.exports = [
  // =========================================================================
  // CHAPTER 1: INTRODUCTION & SETUP
  // =========================================================================
  {
    num: 1,
    phaseId: 'phase1',
    phaseTitle: 'Phase 1: Python Basics',
    slug: '01-python-introduction-features-and-setup',
    title: 'Python Introduction & Setup',
    badge: '1. Introduction & Setup',
    subtopics: 'What is Python? · Design Philosophy · CPython Architecture · Setup · First Program · print() Mechanics',
    desc: 'Deep-dive introduction to Python 3: history by Guido van Rossum, design philosophy (PEP 20), CPython two-step compilation virtual machine internals, installation on Windows/macOS/Linux, and exhaustive mechanics of the print() function.',
    sections: [
      {
        title: '1. What is Python? Origins, Philosophy & The Zen of Python',
        body: `<p>Python is a high-level, interpreted, general-purpose, dynamically typed, multi-paradigm programming language. It was conceived in December 1989 by Dutch computer scientist <strong>Guido van Rossum</strong> at the Centrum Wiskunde & Informatica (CWI) in Amsterdam, Netherlands. Guido designed Python as a successor to the ABC programming language, specifically aiming to create a syntax that prioritized human developer readability and productivity over machine micro-optimization.</p>
        <p>The name <em>"Python"</em> was not inspired by the reptile, but by Guido's admiration for the BBC comedy television series <em>Monty Python’s Flying Circus</em>. Guido wanted programming in Python to feel expressive, fun, and accessible to engineers and researchers worldwide.</p>
        <h4 style="color:#10b981; margin:16px 0 8px;">Key Characteristics of Python:</h4>
        <ul>
          <li><strong>Interpreted & Bytecode Compiled:</strong> Python source files are compiled to intermediate bytecode (.pyc) and executed on a virtual machine (PVM).</li>
          <li><strong>Dynamically Typed:</strong> Variables are bound to heap objects at runtime without requiring static type annotations.</li>
          <li><strong>Multi-Paradigm:</strong> Supports Object-Oriented Programming (OOP), Procedural Programming, and Functional Programming paradigms seamlessly.</li>
          <li><strong>Batteries Included:</strong> Ships with an extensive Standard Library providing built-in modules for file I/O, mathematical computing, regular expressions, JSON serialization, HTTP networking, and concurrency.</li>
        </ul>
        <p>Python's guiding architectural principles are immortalized in <strong>PEP 20 — The Zen of Python</strong> by software engineer Tim Peters. You can print these 19 guiding aphorisms directly from within any Python interpreter using the easter-egg <code>this</code> module:</p>`,
        code: `# Import Python's built-in design philosophy (PEP 20)
import this`,
        codeTitle: 'Example 1: Displaying The Zen of Python (PEP 20)',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Line-by-Line Code Breakdown:</strong>
          <ul style="margin:8px 0 0 18px; line-height:1.7;">
            <li><code>import this</code>: Loads the built-in CPython easter egg module which decodes and displays the 19 core Zen aphorisms (such as <em>"Beautiful is better than ugly"</em>, <em>"Explicit is better than implicit"</em>, <em>"Simple is better than complex"</em>, and <em>"Readability counts"</em>).</li>
          </ul>
        </div>`
      },
      {
        title: '2. Anatomy of Your First Python Program (print() Function)',
        body: `<p>Unlike traditional languages like C, C++, or Java that require boilerplate classes, static methods, and import headers just to print text, Python has zero ceremony. You write executable statements directly at top-level scope.</p>
        <p>The built-in <code>print()</code> function evaluates one or more expressions passed to it, converts them to UTF-8 strings, and writes the resulting character stream to the standard output buffer (<code>sys.stdout</code>):</p>`,
        code: `# Print a friendly welcome message to the terminal screen
print("Hello, World! 🚀 Welcome to Python 3.")`,
        codeTitle: 'Example 2: Your Very First Python Program',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Line-by-Line Code Breakdown:</strong>
          <ul style="margin:8px 0 0 18px; line-height:1.7;">
            <li><code># Print a friendly...</code>: This is a comment. Python's tokenizer completely strips out any line beginning with <code>#</code>.</li>
            <li><code>print(...)</code>: A built-in Python function that outputs data to the console terminal.</li>
            <li><code>"Hello, World! 🚀..."</code>: A string literal enclosed in double quotes. Single quotes <code>'...'</code> work identically.</li>
          </ul>
          <div style="margin-top:10px; color:var(--text2);"><strong>Expected Output:</strong> <code>Hello, World! 🚀 Welcome to Python 3.</code></div>
        </div>`
      },
      {
        title: '3. Storing Values in Variables & Printing Multiple Items',
        body: `<p>A <strong>variable</strong> in Python is a named reference pointing to an object stored in heap memory. In Python, you never declare explicit data types (like <code>int x = 10;</code>). Instead, Python infers the type dynamically upon assignment using the <code>=</code> assignment operator.</p>
        <p>When you pass multiple arguments separated by commas into <code>print()</code>, Python automatically joins each argument with a default space character:</p>`,
        code: `# Step 1: Create variables to store student details
student_name = "Balaji"           # String (Text data)
course_name = "Python Masterclass" # String
batch_year = 2026                 # Integer (Whole number)

# Step 2: Print variables together on the screen
print("Student Name:", student_name)
print("Enrolled in:", course_name, "| Batch Year:", batch_year)`,
        codeTitle: 'Example 3: Variables and Multiple print() Arguments',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Line-by-Line Code Breakdown:</strong>
          <ul style="margin:8px 0 0 18px; line-height:1.7;">
            <li><code>student_name = "Balaji"</code>: Creates a string object <code>"Balaji"</code> in memory and points the name <code>student_name</code> to it.</li>
            <li><code>batch_year = 2026</code>: Stores integer <code>2026</code> in variable <code>batch_year</code>.</li>
            <li><code>print("Student Name:", student_name)</code>: Python prints <code>"Student Name:"</code> followed by a space, then the value <code>"Balaji"</code>.</li>
          </ul>
        </div>`
      },
      {
        title: '4. print() Formatting: Custom Separators (sep) & Line Endings (end)',
        body: `<p>By default, the <code>print()</code> function behavior is governed by two built-in keyword parameters:</p>
        <ul>
          <li><code>sep=" "</code>: The separator placed between multiple comma-separated arguments (default is a single space).</li>
          <li><code>end="\\n"</code>: The string appended after the last argument (default is a newline, which causes subsequent prints to start on a fresh line).</li>
          <li><code>flush=False</code>: Controls whether the standard output buffer is flushed immediately to the terminal.</li>
        </ul>`,
        code: `# 1. Custom separator using sep parameter
print("Apple", "Banana", "Orange", "Mango", sep=" - ")

# 2. Custom end parameter keeping next print on the SAME line
print("Downloading files", end="... ")
print("Done! 100% Complete ✅")`,
        codeTitle: 'Example 4: Controlling Output with sep and end Parameters',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Output Breakdown:</strong>
          <ul style="margin:8px 0 0 18px; line-height:1.7;">
            <li>Line 2 prints: <code>Apple - Banana - Orange - Mango</code> (joined by <code> - </code> instead of space).</li>
            <li>Line 5 prints <code>Downloading files... </code> without a newline, allowing Line 6's <code>Done! 100% Complete ✅</code> to appear right beside it on the same line!</li>
          </ul>
        </div>`
      },
      {
        title: '5. Arithmetic Calculations Directly in Expressions',
        body: `<p>Python functions as an interactive scientific calculator. Expressions containing arithmetic operators (<code>+</code>, <code>-</code>, <code>*</code>, <code>/</code>, <code>**</code>) are evaluated according to standard operator precedence and can be printed directly:</p>`,
        code: `# Define pricing parameters
item_price = 150
quantity = 3
discount = 50

# Calculate total bill
total_bill = (item_price * quantity) - discount

# Display results
print("Item Price: Rs.", item_price)
print("Quantity Ordered:", quantity)
print("Final Total Bill (after Rs. 50 discount): Rs.", total_bill)`,
        codeTitle: 'Example 5: Direct Arithmetic Calculation',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Calculation Flow:</strong>
          <p style="margin-top:6px;">Multiplication <code>150 * 3 = 450</code> occurs first inside parentheses, then subtraction <code>450 - 50 = 400</code>, storing integer <code>400</code> in <code>total_bill</code>.</p>
        </div>`
      },
      {
        title: '6. How Python Executes Code Under the Hood (CPython Architecture)',
        body: `<p>A common misconception is that Python interprets raw text line-by-line. In standard <strong>CPython</strong> (the official C-based reference implementation), execution proceeds in two distinct phases:</p>
        <div class="diagram-box">┌────────────────────────┐
│  Source Code (app.py)  │  (Human-readable Python source text)
└───────────┬────────────┘
            │
            ▼  [Step 1: Lexing -> AST -> Bytecode Compilation]
┌────────────────────────┐
│ Bytecode (.pyc) Cache  │  (Intermediate VM instructions: LOAD_CONST, BINARY_OP)
│  stored in __pycache__ │
└───────────┬────────────┘
            │
            ▼  [Step 2: Evaluated by Python Virtual Machine (PVM)]
┌────────────────────────┐
│ CPython Execution Loop │  (C evaluation loop translates opcodes to native CPU instructions)
└───────────┬────────────┘
            │
            ▼
┌────────────────────────┐
│ Terminal / OS Output   │  "Hello, World! 🚀"
└────────────────────────┘</div>
        <p><strong>Step 1: Bytecode Compilation:</strong> Source code is tokenized, parsed into an Abstract Syntax Tree (AST), and compiled into intermediate <strong>bytecode</strong> instructions (.pyc cached files in <code>__pycache__/</code>).</p>
        <p><strong>Step 2: Python Virtual Machine (PVM):</strong> A giant evaluation loop written in C reads opcodes sequentially and dispatches corresponding C functions to execute on your machine's CPU.</p>`
      }
    ],
    mistake: {
      title: 'Python 2 Print Syntax in Python 3 (Missing Parentheses)',
      text: 'In legacy Python 2, print was a statement (e.g. print "Hello"). In modern Python 3, print() is a function and parentheses are strictly mandatory. Writing print "Hello" will result in a SyntaxError: Missing parentheses in call to \'print\'.'
    },
    tryIt: {
      desc: 'Declare variables for student name and human age. Calculate age in dog years (human_age * 7) and print formatted results.',
      code: `student_name = "Alex"
human_age = 20
dog_years = human_age * 7

print("Student Name:", student_name)
print("Human Age:", human_age)
print("Dog Years Age:", dog_years)`
    },
    faqs: [
      {
        q: 'Is Python interpreted or compiled?',
        a: 'Python is both: source code is first compiled to intermediate bytecode (.pyc), which is then interpreted and executed by the Python Virtual Machine (PVM).'
      },
      {
        q: 'Why did Python 3 break backward compatibility with Python 2?',
        a: 'Python 2 suffered from broken Unicode handling (ASCII vs Unicode confusion), integer division truncating by default (5/2 = 2), and inconsistent APIs. Python 3 standardized clean UTF-8 Unicode by default, modern iterator pipelines, and uniform syntax.'
      },
      {
        q: 'Can Python be compiled to native machine code like C/C++?',
        a: 'Standard CPython uses a VM. However, tools like Cython, Numba (JIT compilation for numerical code), and PyPy (JIT-compiled Python implementation) can compile Python or Python-like code directly to high-speed native CPU machine instructions.'
      }
    ]
  },

  // =========================================================================
  // CHAPTER 2: SYNTAX, INDENTATION & COMMENTS
  // =========================================================================
  {
    num: 2,
    phaseId: 'phase1',
    phaseTitle: 'Phase 1: Python Basics',
    slug: '02-python-syntax-indentation-and-comments',
    title: 'Python Syntax, Indentation & Comments',
    badge: '2. Syntax & Indentation',
    subtopics: 'Whitespace Block Rules · IndentationError · PEP 8 Style Guide · Comments · Docstrings',
    desc: 'Master Python syntax architecture: 4-space whitespace indentation, elimination of curly braces, PEP 8 style standards, single/multi-line comments, and runtime docstrings.',
    sections: [
      {
        title: '1. Why Whitespace Indentation Matters (No Curly Braces)',
        body: `<p>In most programming languages (C, C++, Java, JavaScript, Rust), code blocks are demarcated using <strong>curly braces <code>{ ... }</code></strong>, and indentation is purely cosmetic. In Python, <strong>whitespace indentation defines the logical block hierarchy of your program</strong>.</p>
        <p>This design choice (known as the <em>off-side rule</em>) ensures that every Python codebase is visually uniform, readable, and eliminates entire classes of syntax bugs like dangling-else ambiguity.</p>
        <h4 style="color:#10b981; margin:16px 0 8px;">The Indentation Rules:</h4>
        <ol>
          <li>A colon <code>:</code> signals the start of a new indented code block (after <code>if</code>, <code>elif</code>, <code>else</code>, <code>for</code>, <code>while</code>, <code>def</code>, <code>class</code>, <code>try</code>, <code>with</code>).</li>
          <li>Every line within that block must be indented by exactly <strong>4 spaces</strong> (the official PEP 8 standard).</li>
          <li>When indentation returns to the outer indentation level, the block terminates automatically.</li>
        </ol>`,
        code: `# Check voting eligibility based on age
age = 20

if age >= 18:
    # 4 spaces indentation marks the IF block:
    print("Eligible to vote! ✅")
    print("Please cast your vote responsibly.")
else:
    # 4 spaces indentation marks the ELSE block:
    print("Not eligible yet.")
    print("You must be 18 or older.")

# 0 spaces indentation: Executes unconditionally outside the if-else block
print("Verification check completed.")`,
        codeTitle: 'Example 1: Indentation Defining if-else Blocks',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Indentation Mechanics:</strong>
          <ul style="margin:8px 0 0 18px; line-height:1.7;">
            <li>Lines 6-7 are indented with 4 spaces under <code>if age >= 18:</code> and execute ONLY when the condition is True.</li>
            <li>Lines 10-11 are indented under <code>else:</code>, executing ONLY when the condition is False.</li>
            <li>Line 14 has zero leading spaces, so it executes every time after the if-else finishes.</li>
          </ul>
        </div>`
      },
      {
        title: '2. Single-Line & Inline Comments (#)',
        body: `<p>Comments are explanatory annotations written by programmers to document code logic. The Python compiler completely strips comments during lexical analysis, resulting in zero memory or runtime performance cost.</p>
        <p>In Python, single-line comments begin with the hash symbol (<code>#</code>). They can occupy their own line or follow a statement inline (separated by at least two spaces according to PEP 8):</p>`,
        code: `# Step 1: Define pricing parameters
item_price = 45.00   # Price per unit in rupees
quantity = 3         # Number of items ordered
tax_rate = 0.05      # 5% GST tax rate

# Step 2: Calculate total amount including tax
subtotal = item_price * quantity
tax_amount = subtotal * tax_rate
final_total = subtotal + tax_amount

# Step 3: Display results
print("Subtotal: Rs.", subtotal)
print("Tax (5%): Rs.", tax_amount)
print("Final Total Bill: Rs.", round(final_total, 2))`,
        codeTitle: 'Example 2: Single-Line and Inline Comments',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Commenting Best Practices:</strong>
          <p style="margin-top:6px;">Write comments to explain <strong>WHY</strong> non-obvious business logic exists, not merely WHAT the code does. Good code is self-documenting for simple operations.</p>
        </div>`
      },
      {
        title: '3. Multi-Line Statements & Implicit Parentheses Continuation',
        body: `<p>According to the PEP 8 style guide, code lines should be limited to 79-99 characters for readability. The safest and most Pythonic way to wrap long expressions across multiple lines is by enclosing them in <strong>parentheses <code>()</code></strong>, which activates implicit line continuation:</p>`,
        code: `# Calculate total score across multiple academic subjects
# Parentheses () allow clean multi-line continuation without syntax errors:
total_score = (
    85     # Mathematics score
    + 92   # Physics score
    + 78   # Chemistry score
    - 5    # Late homework penalty
)

print("Final Calculated Total Score:", total_score)`,
        codeTitle: 'Example 3: Multi-Line Statement with Implicit Parentheses',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Why avoid backslashes (\\)?</strong>
          <p style="margin-top:6px;">While Python allows explicit line continuation with a backslash <code>\\</code>, backslashes are fragile: any trailing invisible space after the backslash causes a fatal <code>SyntaxError: unexpected character after line continuation character</code>. Parentheses <code>()</code>, brackets <code>[]</code>, and braces <code>{}</code> are 100% safe.</p>
        </div>`
      },
      {
        title: '4. Functions and PEP 257 Docstrings (.__doc__)',
        body: `<p>A <strong>docstring</strong> (documentation string) is a string literal enclosed in triple quotes (<code>"""..."""</code>) placed as the very first statement inside a function, class, or module.</p>
        <p>Unlike regular <code>#</code> comments that disappear at compile time, docstrings are preserved in memory at runtime and can be inspected via the <code>.__doc__</code> attribute or the built-in <code>help()</code> system:</p>`,
        code: `def calculate_rectangle_area(length, width):
    """
    Calculate and return the area of a rectangle.
    
    Parameters:
        length (float): The length of the rectangle
        width (float): The width of the rectangle
        
    Returns:
        float: Calculated area (length * width)
    """
    return length * width

# Call function
area = calculate_rectangle_area(10, 5)
print("Calculated Area:", area)

# Inspect docstring at runtime
print("\\n--- Function Docstring (.__doc__) ---")
print(calculate_rectangle_area.__doc__)`,
        codeTitle: 'Example 4: Defining and Inspecting Function Docstrings',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Why Docstrings are Vital:</strong>
          <ul style="margin:8px 0 0 18px; line-height:1.7;">
            <li>Modern IDEs (VS Code, PyCharm) pop up docstrings as interactive tooltips during code completion.</li>
            <li>Automated documentation generators (Sphinx, MkDocs) extract docstrings to build professional API documentation websites.</li>
          </ul>
        </div>`
      }
    ],
    mistake: {
      title: 'Mixing Tabs and Spaces (TabError)',
      text: 'Mixing physical Tab characters and Space characters in the same source file causes TabError: inconsistent use of tabs and spaces in indentation. Always configure your code editor to insert 4 spaces when pressing the Tab key.'
    },
    tryIt: {
      desc: 'Fix indentation and run the code to verify if weather is warm or cool.',
      code: `temperature = 32

if temperature > 25:
    print("It is a warm and sunny day! ☀️")
    print("Drink plenty of water.")
else:
    print("It is a cool day! 🧥")`
    },
    faqs: [
      {
        q: 'Can I use 2 spaces instead of 4 spaces for indentation?',
        a: 'The Python interpreter will execute code indented with 2 spaces as long as it is consistent within each block. However, PEP 8 strictly mandates 4 spaces across all professional Python codebases worldwide.'
      },
      {
        q: 'What is the difference between a comment (#) and a docstring (""")?',
        a: 'Standard comments (#) are stripped by the compiler and discarded. Docstrings (""") are preserved as executable string objects attached to the __doc__ attribute of functions, classes, and modules.'
      },
      {
        q: 'What happens if I forget indentation after an if statement or function definition?',
        a: 'Python immediately raises an IndentationError: expected an indented block before any code can execute.'
      }
    ]
  },

  // =========================================================================
  // CHAPTER 3: VARIABLES, TYPES & NAMING
  // =========================================================================
  {
    num: 3,
    phaseId: 'phase1',
    phaseTitle: 'Phase 1: Python Basics',
    slug: '03-python-variables-data-types-and-naming',
    title: 'Python Variables & Data Types',
    badge: '3. Variables & Types',
    subtopics: 'Variables as References · Dynamic Typing · Memory Identity (id, is vs ==) · Swapping · Type Checking',
    desc: 'Master Python variables as heap reference pointers, dynamic type inference, memory address inspection with id(), small integer caching, atomic swapping, and type checking with isinstance().',
    sections: [
      {
        title: '1. Variables in Python: Names Bound to Heap Objects',
        body: `<p>In languages like C or Java, a variable is a named memory box with a fixed byte width allocated directly on the call stack. In Python, <strong>variables are reference pointers (names/labels) bound to heap memory objects</strong>.</p>
        <p>Every object in CPython is represented by a C struct called <code>PyObject</code>, which encapsulates three fundamental pieces of metadata:</p>
        <ol>
          <li><strong>Type (<code>ob_type</code>):</strong> Tells Python what operations are permitted on this object.</li>
          <li><strong>Reference Count (<code>ob_refcnt</code>):</strong> Tracks how many variables currently point to this object (used for automatic Garbage Collection).</li>
          <li><strong>Value:</strong> The actual binary data payload stored in memory.</li>
        </ol>`,
        code: `# Creating variables of the 4 core primitive data types:
student_name = "Alex"      # str (Text string)
age = 20                   # int (Whole integer number)
account_balance = 1450.75  # float (Decimal number)
is_enrolled = True         # bool (Boolean True or False)

# Print each variable and inspect its data type:
print("Student Name:", student_name, "| Data Type:", type(student_name).__name__)
print("Age:", age, "| Data Type:", type(age).__name__)
print("Balance: Rs.", account_balance, "| Data Type:", type(account_balance).__name__)
print("Is Enrolled:", is_enrolled, "| Data Type:", type(is_enrolled).__name__)`,
        codeTitle: 'Example 1: Variables of Different Data Types',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Type Breakdown:</strong>
          <ul style="margin:8px 0 0 18px; line-height:1.7;">
            <li><code>str</code>: Text string enclosed in quotes.</li>
            <li><code>int</code>: Whole numbers with unlimited precision.</li>
            <li><code>float</code>: Numbers with decimal points (64-bit IEEE 754 precision).</li>
            <li><code>bool</code>: Binary logic flags (<code>True</code> or <code>False</code>).</li>
          </ul>
        </div>`
      },
      {
        title: '2. Dynamic Typing & Dynamic Rebinding',
        body: `<p>Python is <strong>dynamically typed</strong>. This means you do not declare variable types, and a variable can point to an integer at one moment, and later be rebound to a string or list without compile errors:</p>`,
        code: `# A single variable 'data' rebound to different data types over time:
data = 42
print("1. Value:", data, "| Type:", type(data))

data = "Now I am a text string!"
print("2. Value:", data, "| Type:", type(data))

data = [10, 20, 30]
print("3. Value:", data, "| Type:", type(data))`,
        codeTitle: 'Example 2: Dynamic Rebinding in Python',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Core Takeaway:</strong>
          <p style="margin-top:6px;">In Python, <strong>objects have types, variables do not!</strong> A variable is simply an identifier attached to an object in memory.</p>
        </div>`
      },
      {
        title: '3. Memory Identity: id() and "is" vs "=="',
        body: `<p>Every object in Python has a unique memory address returned by <code>id(obj)</code>:</p>
        <ul>
          <li><code>==</code> (Value Equality): Checks if two objects hold identical contents (calls <code>__eq__()</code>).</li>
          <li><code>is</code> (Identity Equality): Checks if two variables point to the <strong>exact same memory address</strong> (<code>id(a) == id(b)</code>).</li>
        </ul>`,
        code: `# Two separate list objects created with identical values:
list1 = [1, 2, 3]
list2 = [1, 2, 3]
list3 = list1  # list3 points to the EXACT same list as list1!

print("list1 == list2 (Values match?):", list1 == list2) # True
print("list1 is list2 (Same memory?):", list1 is list2)   # False (Two separate lists!)
print("list1 is list3 (Same pointer?):", list1 is list3)  # True

print("\\nMemory Address list1:", id(list1))
print("Memory Address list2:", id(list2))
print("Memory Address list3:", id(list3))`,
        codeTitle: 'Example 3: Memory Inspection with id() and is vs ==',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Pro Tip:</strong>
          <p style="margin-top:6px;">Always use <code>==</code> for comparing data values (numbers, strings, lists). Use <code>is</code> strictly when comparing singleton constants like <code>None</code>, <code>True</code>, or <code>False</code>.</p>
        </div>`
      },
      {
        title: '4. One-Line Atomic Variable Swapping (No Temp Variable)',
        body: `<p>In C/Java, swapping two variables requires a temporary variable (<code>temp = a; a = b; b = temp;</code>). In Python, you swap variables in a single clean line using tuple packing and unpacking:</p>`,
        code: `x = 10
y = 20
print(f"Before swap: x = {x}, y = {y}")

# One-line swap via tuple packing and unpacking:
x, y = y, x

print(f"After swap:  x = {x}, y = {y}")`,
        codeTitle: 'Example 4: Swapping Variables in One Line',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 How it works under the hood:</strong>
          <p style="margin-top:6px;">The right side <code>y, x</code> creates a temporary tuple <code>(20, 10)</code> in memory, which is immediately unpacked into the variable names <code>x</code> and <code>y</code> on the left side simultaneously.</p>
        </div>`
      }
    ],
    mistake: {
      title: 'Shadowing Built-in Functions as Variable Names',
      text: 'Never name variables list, str, int, dict, id, or sum (e.g. list = [1, 2, 3]). Doing so overrides Python’s built-in constructors in the local namespace, crashing subsequent calls like list("abc") with a TypeError: \'list\' object is not callable.'
    },
    tryIt: {
      desc: 'Declare variables for your favorite book name, its price, and release year. Print each variable along with its type using type().',
      code: `book_title = "Python for Beginners"
book_price = 29.99
release_year = 2026

print("Book:", book_title, "| Type:", type(book_title).__name__)
print("Price:", book_price, "| Type:", type(book_price).__name__)
print("Year:", release_year, "| Type:", type(release_year).__name__)`
    },
    faqs: [
      {
        q: 'What is Dynamic Typing vs Static Typing?',
        a: 'In static typing (C, C++, Java), variable types are checked and fixed at compile time. In dynamic typing (Python, JavaScript, Ruby), types are bound to memory objects at runtime, allowing variables to be rebound to different types freely.'
      },
      {
        q: 'Why does id(256) == id(256) evaluate to True, but id(1000) == id(1000) might differ?',
        a: 'CPython pre-allocates and caches small integers between -5 and 256 in an internal global array for instant reuse. Numbers outside this range are created as fresh heap objects on demand.'
      },
      {
        q: 'What is Duck Typing in Python?',
        a: 'Duck typing is a programming philosophy: "If it walks like a duck and quacks like a duck, it\'s a duck." Python does not check the explicit inheritance hierarchy of an object, but rather whether the object possesses the required methods and attributes.'
      }
    ]
  },

  // =========================================================================
  // CHAPTER 4: NUMBERS, STRINGS & CASTING
  // =========================================================================
  {
    num: 4,
    phaseId: 'phase1',
    phaseTitle: 'Phase 1: Python Basics',
    slug: '04-python-numbers-strings-and-type-conversion',
    title: 'Python Numbers, Strings & Casting',
    badge: '4. Numbers, Strings & Casting',
    subtopics: 'int (Bignum) · float (IEEE 754) · complex · Slicing [::] · F-Strings · Type Casting',
    desc: 'Master Python numeric computation with unlimited integer precision, IEEE 754 floating point arithmetic, string sequence indexing, modern f-string format specifiers, and implicit/explicit type casting.',
    sections: [
      {
        title: '1. Numeric Types & Unlimited Integer Precision (Bignum)',
        body: `<p>Python 3 includes three built-in numeric primitives: <code>int</code>, <code>float</code>, and <code>complex</code>.</p>
        <p>In languages like C, C++, or Java, integers are fixed to 32 bits (maximum value $2,147,483,647$) or 64 bits. In Python 3, <strong>integers have arbitrary precision (Bignum arithmetic)</strong>. CPython dynamically allocates memory digits (in 30-bit chunks) to store integers of any magnitude without integer overflow bugs!</p>`,
        code: `# 1. Calculating 2 raised to power 100 (Astronomically huge number!)
huge_num = 2 ** 100
print("2 ** 100 is:")
print(huge_num)

# 2. Float and Complex numbers
pi_val = 3.1415926535
complex_num = 3 + 4j

print("\\nFloat Pi:", pi_val)
print("Complex real part:", complex_num.real, "| Imaginary part:", complex_num.imag)`,
        codeTitle: 'Example 1: Numeric Primitives & Arbitrary Precision',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Unlimited Integer Capacity:</strong>
          <p style="margin-top:6px;">Because integers in Python automatically expand to consume additional RAM digits, you can compute factorials like <code>100!</code> or cryptographically large numbers without overflow.</p>
        </div>`
      },
      {
        title: '2. Arithmetic Operators Breakdown',
        body: `<p>Python provides 7 core arithmetic operators with distinct type-promotion rules:</p>
        <ul>
          <li><code>+</code> (Addition), <code>-</code> (Subtraction), <code>*</code> (Multiplication)</li>
          <li><code>/</code>: <strong>True Division</strong> — ALWAYS returns a float (e.g. <code>10 / 2 -> 5.0</code>).</li>
          <li><code>//</code>: <strong>Floor Division</strong> — Discards remainder and rounds toward $-\\infty$ (e.g. <code>15 // 4 -> 3</code>, <code>-15 // 4 -> -4</code>).</li>
          <li><code>%</code>: <strong>Modulus</strong> — Calculates remainder after division.</li>
          <li><code>**</code>: <strong>Exponentiation</strong> — Power calculation ($a^b$).</li>
        </ul>`,
        code: `a = 15
b = 4

print("Addition (+):", a + b)         # 19
print("Subtraction (-):", a - b)      # 11
print("Multiplication (*):", a * b)   # 60
print("True Division (/):", a / b)    # 3.75 (Float)
print("Floor Division (//):", a // b) # 3 (Int)
print("Modulus (%):", a % b)          # 3 (Remainder)
print("Power (**):", 2 ** 5)          # 32`,
        codeTitle: 'Example 2: Arithmetic Operators Breakdown',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Division Difference:</strong>
          <p style="margin-top:6px;">Use <code>/</code> when you need precise floating-point decimals. Use <code>//</code> when you need whole integer bucket indexes or pagination calculations.</p>
        </div>`
      },
      {
        title: '3. String Indexing, Slicing & Immutability',
        body: `<p>Strings are ordered sequences of Unicode characters. Slicing syntax is: <code>string[start : stop : step]</code>. Remember: strings are <strong>immutable</strong> (cannot be modified in place):</p>`,
        code: `word = "Python"

print("First char [0]:", word[0])            # P
print("Last char [-1]:", word[-1])           # n
print("Slice [0:3]:", word[0:3])             # Pyt (stops 1 index before 3)
print("Every 2nd char [::2]:", word[::2])     # Pto
print("Reversed string [::-1]:", word[::-1]) # nohtyP`,
        codeTitle: 'Example 3: String Indexing and Slicing',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Slicing Parameters:</strong>
          <ul style="margin:8px 0 0 18px; line-height:1.7;">
            <li><code>start</code>: Starting index (inclusive).</li>
            <li><code>stop</code>: Ending index (exclusive — stops 1 character before!).</li>
            <li><code>step</code>: Stride/increment (e.g. <code>-1</code> traverses the string in reverse!).</li>
          </ul>
        </div>`
      },
      {
        title: '4. Modern F-Strings Formatting (Python 3.6+)',
        body: `<p>Formatted string literals (<strong>f-strings</strong>) allow you to interpolate variables directly with formatting specifiers (e.g. <code>.2f</code> for 2 decimal places, <code>,</code> for thousands separators):</p>`,
        code: `student = "Balaji"
score = 95.4567
price = 1499.50

# Modern f-strings format variables cleanly:
print(f"Student: {student}")
print(f"Score (2 decimal places): {score:.2f}")
print(f"Price formatted: Rs.{price:,.2f}")`,
        codeTitle: 'Example 4: Modern F-Strings Formatting',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Format Specifiers:</strong>
          <ul style="margin:8px 0 0 18px; line-height:1.7;">
            <li><code>{score:.2f}</code> formats <code>95.4567</code> to <code>95.46</code> (rounded to 2 decimal places).</li>
            <li><code>{price:,.2f}</code> inserts a comma thousands separator: <code>1,499.50</code>.</li>
          </ul>
        </div>`
      }
    ],
    mistake: {
      title: 'Attempting to Cast Float Strings Directly with int()',
      text: 'Calling int("45.89") raises a ValueError: invalid literal for int() with base 10. You must first convert the string to float and then to integer: int(float("45.89")) to truncate decimals safely.'
    },
    tryIt: {
      desc: 'Extract the first name, clean whitespace using strip(), and print a reversed greeting.',
      code: `user_input = "  python developer  "
clean_text = user_input.strip()

print("Original:", repr(user_input))
print("Cleaned:", clean_text)
print("Uppercase:", clean_text.upper())
print("Reversed:", clean_text[::-1])`
    },
    faqs: [
      {
        q: 'Why are strings in Python immutable?',
        a: 'Immutability makes strings hashable (allowing them to serve as dictionary keys and set members), memory-efficient (enabling CPython string interning optimizations), and inherently thread-safe in concurrent applications.'
      },
      {
        q: 'What is the maximum integer size in Python 3?',
        a: 'There is no fixed maximum size. Python 3 dynamically allocates as many 30-bit memory digits as required to represent the number, constrained only by available computer RAM.'
      },
      {
        q: 'What is the difference between str() and repr()?',
        a: 'str() produces a human-readable display string intended for end users. repr() produces an unambiguous, developer-focused representation showing exact type and escape characters.'
      }
    ]
  },

  // =========================================================================
  // CHAPTER 5: BOOLEANS, NONE & I/O
  // =========================================================================
  {
    num: 5,
    phaseId: 'phase1',
    phaseTitle: 'Phase 1: Python Basics',
    slug: '05-python-booleans-none-and-input-output',
    title: 'Python Booleans, None & Console I/O',
    badge: '5. Booleans, None & I/O',
    subtopics: 'bool Data Type · Truthy vs Falsy · None Singleton · print() & input() Guide',
    desc: 'Deep dive into boolean logic, Truthy and Falsy rules, the NoneType singleton, and console I/O with print() and input().',
    sections: [
      {
        title: '1. The Boolean Data Type (bool)',
        body: `<p>The <code>bool</code> data type holds <code>True</code> or <code>False</code>. In Python, <code>bool</code> is a subclass of <code>int</code> (where <code>True == 1</code> and <code>False == 0</code>):</p>`,
        code: `# Boolean flags representing user status:
is_logged_in = True
has_premium_access = False

print("Logged in status:", is_logged_in)
print("Premium access:", has_premium_access)

# In Python arithmetic, True acts as 1 and False acts as 0:
print("True + True equals:", True + True)  # 2
print("True * 50 equals:", True * 50)      # 50`,
        codeTitle: 'Example 1: Boolean Values in Python',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Boolean Architecture:</strong>
          <p style="margin-top:6px;">Because <code>issubclass(bool, int)</code> is True, booleans participate in arithmetic operations seamlessly.</p>
        </div>`
      },
      {
        title: '2. Truthy vs Falsy Evaluation Rules',
        body: `<p>In Python, empty sequences (<code>""</code>, <code>[]</code>, <code>{}</code>), zero numbers (<code>0</code>, <code>0.0</code>), and <code>None</code> evaluate to <strong>Falsy</strong>. Everything else evaluates to <strong>Truthy</strong>:</p>`,
        code: `# An empty shopping cart list is Falsy:
cart = []

if not cart:
    print("🛒 Your cart is currently empty! Please add items.")
else:
    print("Cart items:", cart)

# Adding an item makes the list Truthy:
cart.append("Python Masterclass Book")
if cart:
    print("✅ Cart now contains:", cart)`,
        codeTitle: 'Example 2: Truthy vs Falsy Evaluation',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 The Pythonic Way:</strong>
          <p style="margin-top:6px;">Never write <code>if len(cart) == 0:</code>. The clean Pythonic approach is simply <code>if not cart:</code>.</p>
        </div>`
      },
      {
        title: '3. The None Singleton Object & "is None" Identity Check',
        body: `<p><code>None</code> represents the absence of a value or null state. Always check for it using <code>if val is None:</code> (not <code>== None</code>):</p>`,
        code: `# A variable representing uninitialized profile data:
user_address = None

if user_address is None:
    print("Address has not been provided yet.")
else:
    print("Delivery Address:", user_address)`,
        codeTitle: 'Example 3: Checking None with the "is" Operator',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Why use "is None"?</strong>
          <p style="margin-top:6px;"><code>None</code> is a singleton object in memory. <code>is None</code> checks pointer address equality in a single CPU instruction, which is faster and safer than <code>== None</code>.</p>
        </div>`
      }
    ],
    mistake: {
      title: 'Comparing Booleans with == True or == False',
      text: 'Avoid writing "if is_valid == True:". The Pythonic way is simply "if is_valid:". Similarly, instead of "if is_valid == False:", write "if not is_valid:".'
    },
    tryIt: {
      desc: 'Check if a shopping cart list is empty using Truthy/Falsy evaluation.',
      code: `cart_items = []  # Empty list is Falsy

if not cart_items:
    print("🛒 Your cart is empty! Please add items.")
else:
    print("Cart has items:", cart_items)`
    },
    faqs: [
      {
        q: 'Why does bool(True + True) equal True, but True + True equals 2?',
        a: 'In Python, bool inherits from int. In arithmetic expressions (True + True), Python treats them as integers (1 + 1 = 2). When passed to bool(2), any non-zero integer evaluates to True.'
      },
      {
        q: 'Why should I use "is None" instead of "== None"?',
        a: 'None is a singleton object in Python memory. is None checks pointer identity in a single CPU instruction without invoking the class equality operator __eq__(), which could be overridden by custom objects.'
      },
      {
        q: 'How do I read input securely without displaying passwords on screen?',
        a: 'Use the standard library getpass module: import getpass; pwd = getpass.getpass("Password: ") hides user keystrokes in the terminal.'
      }
    ]
  }
];
