// Phase 4: Functions & Reusable Code Data
module.exports = [
  // =========================================================================
  // CHAPTER 15: PYTHON FUNCTIONS FUNDAMENTALS
  // =========================================================================
  {
    num: 15,
    phaseId: 'phase4',
    phaseTitle: 'Phase 4: Functions & Reusable Code',
    slug: '15-python-functions-fundamentals',
    title: 'Python Functions Fundamentals',
    badge: '15. Functions Fundamentals',
    subtopics: 'def · Parameters vs Arguments · return · Default Arguments · Keyword vs Positional · Calculator Project',
    desc: 'Master modular Python programming: function definition mechanics, call stack execution, parameters vs arguments, multiple return tuples, default arguments, keyword args, and building a modular calculator engine.',
    sections: [
      {
        title: '1. What is a Function? Modular Architecture & Call Stack',
        body: `<p>A <strong>function</strong> is a self-contained, named block of reusable code designed to perform a single specific task. Instead of duplicating logic throughout your codebase, functions enable the <strong>DRY Principle (Don\'t Repeat Yourself)</strong>.</p>
        <h4 style="color:#10b981; margin:16px 0 8px;">How Functions Execute in Memory (The Call Stack):</h4>
        <div class="diagram-box">┌────────────────────────────────────────────────────────┐
│  Call Stack Frame (calculate_tax)                      │  [Local variables allocated]
├────────────────────────────────────────────────────────┤
│  Call Stack Frame (main / module scope)                │  [Pauses until function returns]
└────────────────────────────────────────────────────────┘</div>
        <p>When you call a function, CPython pushes a new <strong>Stack Frame</strong> containing local variable references. When the function hits a <code>return</code> statement, the stack frame is popped from memory and control transfers back to the caller.</p>`,
        code: `# Define a reusable function to calculate final bill with tax:
def calculate_total(price, tax_rate=0.18):
    """Calculate subtotal with tax and return final bill."""
    final_amount = price + (price * tax_rate)
    return round(final_amount, 2)

# Calling the function multiple times with different inputs:
bill1 = calculate_total(100)        # Uses default tax 18% -> 118.0
bill2 = calculate_total(500, 0.05)  # Overrides tax with 5% -> 525.0

print("Order 1 Total: Rs.", bill1)
print("Order 2 Total: Rs.", bill2)`,
        codeTitle: 'Example 1: Defining, Calling and Returning Values from a Function',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Execution Breakdown:</strong>
          <ul style="margin:8px 0 0 18px; line-height:1.7;">
            <li><code>def calculate_total(price, tax_rate=0.18):</code> creates the function object.</li>
            <li>In <code>calculate_total(100)</code>, <code>price</code> is bound to <code>100</code> and <code>tax_rate</code> defaults to <code>0.18</code>.</li>
            <li>The <code>return</code> statement sends <code>118.0</code> back to the caller and tears down the local stack frame.</li>
          </ul>
        </div>`
      },
      {
        title: '2. Parameters vs Arguments & Multiple Return Values',
        body: `<p>Understand the precise technical difference between parameters and arguments:</p>
        <ul>
          <li><strong>Parameters:</strong> The variable names listed in the function definition header (e.g. <code>def add(x, y):</code>).</li>
          <li><strong>Arguments:</strong> The concrete values passed into the function when called (e.g. <code>add(10, 20)</code>).</li>
        </ul>
        <p><strong>Returning Multiple Values:</strong> In Python, a function can return multiple values separated by commas. Python automatically packs them into a single <strong>tuple</strong>, which the caller can unpack in one line:</p>`,
        code: `# Function returning multiple mathematical metrics simultaneously:
def get_min_max_avg(numbers_list):
    lowest = min(numbers_list)
    highest = max(numbers_list)
    average = sum(numbers_list) / len(numbers_list)
    
    # Returning 3 items packs them into a tuple (lowest, highest, average):
    return lowest, highest, round(average, 2)

# Unpack all 3 returned values in one clean line:
test_scores = [78, 92, 64, 88, 95, 82]
min_val, max_val, avg_val = get_min_max_avg(test_scores)

print("Scores:", test_scores)
print(f"Lowest: {min_val} | Highest: {max_val} | Class Average: {avg_val}")`,
        codeTitle: 'Example 2: Returning and Unpacking Multiple Values',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Return Value Mechanics:</strong>
          <p style="margin-top:6px;">Functions without an explicit <code>return</code> statement return <code>None</code> by default.</p>
        </div>`
      },
      {
        title: '3. Default Arguments & The Mutable Default Argument Trap',
        body: `<p>Default arguments assign fallback values to parameters if omitted by the caller. However, <strong>never use mutable objects (like lists or dictionaries) as default arguments</strong>!</p>
        <p>In Python, default arguments are evaluated <strong>ONCE when the function is defined</strong>, not every time it is called. Using a mutable list shares that exact same list across all future calls!</p>`,
        code: `# ❌ THE DANGEROUS MUTABLE DEFAULT BUG:
def add_item_bad(item, target_list=[]):
    target_list.append(item)
    return target_list

print("Bad Call 1:", add_item_bad("Apple"))  # ['Apple']
print("Bad Call 2:", add_item_bad("Banana")) # ['Apple', 'Banana'] (UNINTENDED SHARED LIST!)

# ✅ THE PYTHONIC SENTINEL PATTERN (SAFE):
def add_item_safe(item, target_list=None):
    if target_list is None:
        target_list = []  # Creates a fresh new list on every call!
    target_list.append(item)
    return target_list

print("\\nSafe Call 1:", add_item_safe("Apple"))  # ['Apple']
print("Safe Call 2:", add_item_safe("Banana")) # ['Banana'] (Clean & Isolated!)`,
        codeTitle: 'Example 3: Default Mutable Argument Bug vs None Sentinel Pattern',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 The Golden Rule:</strong>
          <p style="margin-top:6px;">Always use <code>None</code> as the default value for optional lists or dictionaries, and instantiate them inside the function body.</p>
        </div>`
      },
      {
        title: '4. Positional vs Keyword Arguments (PEP 570 / and *)',
        body: `<p>When invoking functions, you can pass arguments by position (in order) or explicitly by parameter name (keyword arguments):</p>
        <ul>
          <li><code>/</code>: Marks preceding parameters as <strong>Positional-Only</strong> (cannot be passed by name).</li>
          <li><code>*</code>: Marks subsequent parameters as <strong>Keyword-Only</strong> (must be passed by name).</li>
        </ul>`,
        code: `# Positional-only (before /) and Keyword-only (after *):
def create_user(username, email, /, *, is_admin=False, send_email=True):
    return {
        "username": username,
        "email": email,
        "is_admin": is_admin,
        "send_email": send_email
    }

# Calling correctly:
user1 = create_user("balaji", "balaji@test.com", is_admin=True)
print("Created User:", user1)`,
        codeTitle: 'Example 4: Positional-Only and Keyword-Only Arguments',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 API Design Clarity:</strong>
          <p style="margin-top:6px;">Keyword-only arguments force callers to write clear, self-documenting function calls (e.g. <code>is_admin=True</code> instead of cryptic <code>True</code>).</p>
        </div>`
      },
      {
        title: '5. Practical Project 1: Multi-Operation Calculator Functions Engine',
        body: `<p>Building a robust, modular arithmetic calculator using clean pure functions:</p>`,
        code: `# Modular Calculator Functions Engine
def add(a, b): return a + b
def subtract(a, b): return a - b
def multiply(a, b): return a * b
def divide(a, b):
    if b == 0:
        return "❌ Error: Cannot divide by zero!"
    return a / b

def calculate(num1, num2, operation):
    operations_map = {
        "+": add,
        "-": subtract,
        "*": multiply,
        "/": divide
    }
    func = operations_map.get(operation)
    if func:
        return func(num1, num2)
    return "❌ Invalid Operator!"

# Test calculator operations:
print("10 + 5 =", calculate(10, 5, "+"))
print("10 - 4 =", calculate(10, 4, "-"))
print("10 * 3 =", calculate(10, 3, "*"))
print("10 / 2 =", calculate(10, 2, "/"))
print("10 / 0 =", calculate(10, 0, "/"))`,
        codeTitle: 'Example 5: Modular Calculator Engine Project',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Architectural Insight:</strong>
          <p style="margin-top:6px;">By storing functions inside a dictionary dispatch table (<code>operations_map</code>), we achieve $O(1)$ dispatch without ugly nested if-else ladders!</p>
        </div>`
      }
    ],
    mistake: {
      title: 'Placing Non-Default Arguments After Default Arguments',
      text: 'Writing def func(a=10, b): raises SyntaxError: non-default argument follows default argument. In Python, all required positional parameters MUST appear before default parameters.'
    },
    tryIt: {
      desc: 'Create a function convert_temperature(celsius) that returns both Fahrenheit and Kelvin in a single tuple.',
      code: `def convert_temperature(celsius):
    fahrenheit = (celsius * 9/5) + 32
    kelvin = celsius + 273.15
    return fahrenheit, kelvin

f, k = convert_temperature(25)
print("25°C in Fahrenheit:", f, "°F")
print("25°C in Kelvin:    ", k, "K")`
    },
    faqs: [
      {
        q: 'What is the difference between a parameter and an argument?',
        a: 'Parameters are the variable placeholders listed in the function definition header. Arguments are the concrete values passed into the function during invocation.'
      },
      {
        q: 'Why should I never use mutable default arguments like def f(x=[])?',
        a: 'Default arguments are evaluated once at compile time. A mutable list is shared across all function calls, leading to data contamination bugs. Use x=None and instantiate x=[] inside the body instead.'
      },
      {
        q: 'What happens if a Python function does not have a return statement?',
        a: 'In Python, any function that finishes execution without hitting a return statement automatically returns None.'
      }
    ]
  },

  // =========================================================================
  // CHAPTER 16: PYTHON *args, **kwargs & VARIABLE ARGUMENTS
  // =========================================================================
  {
    num: 16,
    phaseId: 'phase4',
    phaseTitle: 'Phase 4: Functions & Reusable Code',
    slug: '16-python-args-kwargs-variable-arguments',
    title: 'Python *args & **kwargs Guide',
    badge: '16. *args & **kwargs',
    subtopics: '*args (Positional Pack) · **kwargs (Keyword Pack) · Unpacking (* / **) · Student Grading Project',
    desc: 'Master variable-length arguments in Python: positional packing with *args, keyword packing with **kwargs, unpacking operators, parameter hierarchy rules, and building a student marks management system.',
    sections: [
      {
        title: '1. Variable Positional Arguments: *args (Tuple Packing)',
        body: `<p>When you do not know in advance how many positional arguments a caller might pass, prefix a parameter with an asterisk: <code>*args</code>.</p>
        <p>Python automatically packs all extra positional arguments into an <strong>immutable tuple</strong> named <code>args</code>:</p>`,
        code: `# Calculate the sum and average of ANY number of arguments:
def calculate_statistics(*numbers):
    if not numbers:
        return 0, 0
    total = sum(numbers)
    avg = total / len(numbers)
    return total, round(avg, 2)

# Call with 2, 4, or 6 arguments seamlessly:
tot1, avg1 = calculate_statistics(10, 20)
tot2, avg2 = calculate_statistics(10, 20, 30, 40)
tot3, avg3 = calculate_statistics(5, 15, 25, 35, 45, 55)

print(f"Call 1 -> Sum: {tot1}, Avg: {avg1}")
print(f"Call 2 -> Sum: {tot2}, Avg: {avg2}")
print(f"Call 3 -> Sum: {tot3}, Avg: {avg3}")`,
        codeTitle: 'Example 1: Dynamic Positional Packing with *args',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Tuple Packing Mechanics:</strong>
          <p style="margin-top:6px;">Inside <code>calculate_statistics</code>, <code>numbers</code> is a tuple <code>(10, 20, 30, 40)</code>. You can loop over it, slice it, or pass it to <code>sum()</code> and <code>len()</code>.</p>
        </div>`
      },
      {
        title: '2. Variable Keyword Arguments: **kwargs (Dictionary Packing)',
        body: `<p>Prefixing a parameter with two asterisks (<code>**kwargs</code>) captures arbitrary named keyword arguments and packs them into a <strong>dictionary</strong>:</p>`,
        code: `# Function accepting arbitrary user profile metadata:
def build_user_profile(user_id, **attributes):
    profile = {"id": user_id}
    # kwargs acts as a standard dictionary:
    for key, value in attributes.items():
        profile[key] = value
    return profile

# Call with different optional keyword arguments:
user_a = build_user_profile(101, username="balaji", role="Backend Lead", country="India")
user_b = build_user_profile(102, username="alex", is_active=True)

print("Profile A:", user_a)
print("Profile B:", user_b)`,
        codeTitle: 'Example 2: Dynamic Keyword Packing with **kwargs',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Dictionary Inspection:</strong>
          <p style="margin-top:6px;">Inside the function, <code>attributes</code> is a dictionary: <code>{'username': 'balaji', 'role': 'Backend Lead', 'country': 'India'}</code>.</p>
        </div>`
      },
      {
        title: '3. Standard Parameter Ordering Hierarchy',
        body: `<p>When combining positional, default, <code>*args</code>, keyword-only, and <code>**kwargs</code> parameters, Python enforces a strict grammatical order:</p>
        <div class="diagram-box">def function(positional, *args, keyword_only, **kwargs):</div>`,
        code: `def complex_logger(prefix, *messages, level="INFO", **metadata):
    print(f"[{level}] {prefix}:", " ".join(messages))
    if metadata:
        print("  Additional Metadata:", metadata)

# Calling with mixed parameter types:
complex_logger(
    "ServerAPI",
    "Database connection established", "Cache warmed up",
    level="SUCCESS",
    ip="192.168.1.1", port=5432
)`,
        codeTitle: 'Example 3: Standard Parameter Ordering Hierarchy',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Parameter Hierarchy Rule:</strong>
          <p style="margin-top:6px;"><code>*args</code> must come before keyword-only arguments, and <code>**kwargs</code> must ALWAYS be the final parameter in the signature.</p>
        </div>`
      },
      {
        title: '4. Practical Project 2: Student Marks Management & Grading System',
        body: `<p>Creating a complete modular student grading system using <code>*args</code> for subject marks and <code>**kwargs</code> for extra academic credentials:</p>`,
        code: `# Student Marks Management & Report Generator
def generate_student_report(name, roll_no, *marks, **extra_details):
    total_marks = sum(marks)
    max_possible = len(marks) * 100
    percentage = (total_marks / max_possible) * 100 if max_possible > 0 else 0
    
    # Determine grade:
    if percentage >= 90: grade = "A+ 🌟"
    elif percentage >= 75: grade = "A ✨"
    elif percentage >= 60: grade = "B 👍"
    else: grade = "C ⚠️"
    
    print("=" * 45)
    print(f"🎓 STUDENT REPORT: {name} (Roll #{roll_no})")
    print("=" * 45)
    print(f"• Subjects Count: {len(marks)}")
    print(f"• Total Score:    {total_marks}/{max_possible}")
    print(f"• Percentage:     {percentage:.2f}%")
    print(f"• Final Grade:    {grade}")
    
    if extra_details:
        print("\\n📌 Additional Student Info:")
        for key, val in extra_details.items():
            print(f"  - {key.replace('_', ' ').title()}: {val}")
    print("=" * 45)

# Test the student report generator:
generate_student_report(
    "Balaji", 202601,
    95, 88, 92, 85, 98,
    branch="Computer Science", semester="6th Sem", college="JNTU"
)`,
        codeTitle: 'Example 4: Student Marks Management System Project',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Dynamic Extensibility:</strong>
          <p style="margin-top:6px;">The function accepts any number of subject marks (whether a student took 3 or 8 subjects) and any custom metadata dynamically.</p>
        </div>`
      }
    ],
    mistake: {
      title: 'Placing Positional Parameters After **kwargs',
      text: 'Writing def func(**kwargs, extra): causes a SyntaxError: invalid syntax. **kwargs MUST always be the absolute last parameter in any Python function signature.'
    },
    tryIt: {
      desc: 'Write a function calculate_bill(customer_name, *item_prices, discount=0.10, **store_info) that prints an itemized checkout receipt.',
      code: `def calculate_bill(customer, *prices, discount=0.10, **store_info):
    subtotal = sum(prices)
    discount_amount = subtotal * discount
    final_total = subtotal - discount_amount
    
    print(f"Customer: {customer} | Store: {store_info.get('store_name', 'SuperMart')}")
    print(f"Items: {len(prices)} | Subtotal: Rs.{subtotal}")
    print(f"Final Total (after {discount*100}% discount): Rs.{final_total:.2f}")

calculate_bill("Alex", 120, 450, 300, store_name="City Mega Mart", city="Hyderabad")`
    },
    faqs: [
      {
        q: 'Can I name *args something else like *values?',
        a: 'Yes! The asterisk (*) is what activates tuple packing. You can name the variable *values or *items. However, *args and **kwargs are PEP 8 standard conventions.'
      },
      {
        q: 'How do I unpack a list or dictionary into a function call?',
        a: 'Use *my_list to unpack list elements as positional arguments, and **my_dict to unpack dictionary key-value pairs as keyword arguments.'
      },
      {
        q: 'Why are *args and **kwargs commonly used in Python Decorators?',
        a: 'Decorators wrap arbitrary functions with unknown signatures. Using (*args, **kwargs) allows the wrapper to forward all arguments to the original function safely.'
      }
    ]
  },

  // =========================================================================
  // CHAPTER 17: PYTHON VARIABLE SCOPE & LEGB RULE
  // =========================================================================
  {
    num: 17,
    phaseId: 'phase4',
    phaseTitle: 'Phase 4: Functions & Reusable Code',
    slug: '17-python-variable-scope-and-legb-rule',
    title: 'Python Scope & LEGB Rule',
    badge: '17. Variable Scope (LEGB)',
    subtopics: 'LEGB Hierarchy · Local vs Global · global & nonlocal · Closures · Pure Functions · Converters Project',
    desc: 'Master variable scope resolution in Python: the LEGB lookup rule, local vs global namespaces, modifying outer scope with global and nonlocal, closures, pure functions, and building currency/unit converters.',
    sections: [
      {
        title: '1. The LEGB Scope Resolution Hierarchy',
        body: `<p>In Python, the <strong>scope</strong> of a variable determines where in your program that name is visible and accessible. When you reference a variable name, Python searches four nested namespaces in a strict sequence known as the <strong>LEGB Rule</strong>:</p>
        <div class="diagram-box">┌────────────────────────────────────────────────────────┐
│  L - LOCAL: Defined inside current function (def)      │
├────────────────────────────────────────────────────────┤
│  E - ENCLOSING: Defined in outer/parent function       │
├────────────────────────────────────────────────────────┤
│  G - GLOBAL: Defined at top-level of module (.py file) │
├────────────────────────────────────────────────────────┤
│  B - BUILT-IN: Preloaded Python builtins (len, print)  │
└────────────────────────────────────────────────────────┘</div>
        <p>Python stops searching as soon as it finds the first matching variable name in the LEGB hierarchy. If the name is not found in any of the four scopes, a <code>NameError</code> is raised.</p>`,
        code: `# Demonstrating the LEGB scope hierarchy:
global_var = "🌍 I am GLOBAL"

def outer_function():
    enclosing_var = "📦 I am ENCLOSING (Outer Function)"
    
    def inner_function():
        local_var = "🏠 I am LOCAL (Inner Function)"
        print("Inside inner function:")
        print("  1.", local_var)      # Local Scope (L)
        print("  2.", enclosing_var)  # Enclosing Scope (E)
        print("  3.", global_var)     # Global Scope (G)
        print("  4. Built-in len:", len("Test")) # Built-in Scope (B)
        
    inner_function()

outer_function()`,
        codeTitle: 'Example 1: LEGB Scope Resolution Hierarchy in Action',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Scope Lookup Sequence:</strong>
          <p style="margin-top:6px;"><code>inner_function</code> accesses its own local variable (L), its parent's enclosing variable (E), module-level global variable (G), and built-in function <code>len()</code> (B) smoothly.</p>
        </div>`
      },
      {
        title: '2. The global Keyword & Modifying Global State',
        body: `<p>By default, if you assign to a variable inside a function (<code>x = 100</code>), Python creates a brand new <strong>Local variable</strong>, even if a global variable named <code>x</code> already exists! To rebind a global variable from inside a function, declare it with <code>global</code>:</p>`,
        code: `counter = 0  # Global variable

def increment_bad():
    # Attempting counter += 1 without 'global' raises UnboundLocalError!
    # Because assignment makes 'counter' local before reading it!
    pass

def increment_safe():
    global counter  # Explicitly declares intent to rebind the global variable
    counter += 1
    print("Global counter incremented to:", counter)

increment_safe()
increment_safe()
print("Final Global Counter:", counter)`,
        codeTitle: 'Example 2: Modifying Global Variables with "global"',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Best Practice Note:</strong>
          <p style="margin-top:6px;">Avoid overusing <code>global</code> variables in production code because global state makes programs difficult to debug and test in parallel.</p>
        </div>`
      },
      {
        title: '3. Closures & The nonlocal Keyword',
        body: `<p>When a nested inner function references variables from its enclosing function, it forms a <strong>Closure</strong>. To rebind an enclosing variable from the inner function, use the <code>nonlocal</code> keyword:</p>`,
        code: `def create_bank_account(initial_balance):
    balance = initial_balance  # Enclosing variable
    
    def deposit(amount):
        nonlocal balance  # Rebinds enclosing balance!
        balance += amount
        return f"Deposited Rs.{amount} | Current Balance: Rs.{balance}"
        
    return deposit

# Create an isolated account closure:
my_account = create_bank_account(1000)
print(my_account(500))
print(my_account(250))`,
        codeTitle: 'Example 3: Function Closures and the "nonlocal" Keyword',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Closure Encapsulation:</strong>
          <p style="margin-top:6px;"><code>balance</code> remains alive in memory attached to <code>my_account</code>, providing private state encapsulation without writing a full class!</p>
        </div>`
      },
      {
        title: '4. Pure Functions vs Side Effects',
        body: `<p>A <strong>Pure Function</strong> is a function that:</p>
        <ol>
          <li>Given the same arguments, ALWAYS returns the exact same result (Deterministic).</li>
          <li>Produces <strong>zero side effects</strong> (does not mutate global state, modify passed lists in-place, or write to external files).</li>
        </ol>`,
        code: `# ❌ IMPURE FUNCTION (Mutates external global state):
total_sales = 0
def add_sale_impure(amount):
    global total_sales
    total_sales += amount
    return total_sales

# ✅ PURE FUNCTION (Deterministic, zero side-effects):
def calculate_sale_pure(current_total, new_amount):
    return current_total + new_amount

print("Pure Result 1:", calculate_sale_pure(100, 50)) # 150
print("Pure Result 2:", calculate_sale_pure(100, 50)) # Always 150!`,
        codeTitle: 'Example 4: Impure vs Pure Functions',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Reliability:</strong>
          <p style="margin-top:6px;">Pure functions are effortless to unit test, cache (memoization), and execute concurrently across multiple CPU threads.</p>
        </div>`
      },
      {
        title: '5. Practical Project 3: Dynamic Currency & Unit Converter Engine',
        body: `<p>A pure, modular converter engine supporting currency exchange and metric units:</p>`,
        code: `# Dynamic Currency & Unit Converter Engine

# Currency Rates relative to 1 USD (Base)
EXCHANGE_RATES = {
    "USD": 1.00,
    "INR": 86.50,
    "EUR": 0.92,
    "GBP": 0.79,
    "JPY": 152.00
}

def convert_currency(amount, from_curr, to_curr):
    """Convert currency using pure conversion arithmetic."""
    from_rate = EXCHANGE_RATES.get(from_curr.upper())
    to_rate = EXCHANGE_RATES.get(to_curr.upper())
    
    if not from_rate or not to_rate:
        return None, "❌ Invalid Currency Code!"
        
    # Convert from source to USD base, then to target currency
    amount_in_usd = amount / from_rate
    converted_amount = amount_in_usd * to_rate
    return round(converted_amount, 2), f"1 {from_curr} = {to_rate/from_rate:.4f} {to_curr}"

# Test Currency Conversions:
amt_inr, rate_info = convert_currency(100, "USD", "INR")
print(f"💲 100 USD = Rs.{amt_inr} INR ({rate_info})")

amt_eur, rate_info2 = convert_currency(5000, "INR", "EUR")
print(f"💶 5000 INR = €{amt_eur} EUR ({rate_info2})")`,
        codeTitle: 'Example 5: Currency and Unit Converter Project',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Architecture Breakdown:</strong>
          <p style="margin-top:6px;">By converting first to a common base (USD), we can convert between any arbitrary pair of currencies with just $N$ stored exchange rates instead of $N^2$ pairs!</p>
        </div>`
      }
    ],
    mistake: {
      title: 'UnboundLocalError: local variable referenced before assignment',
      text: 'If you read a global variable and then assign to it in the same function without declaring "global x", Python flags the variable as local across the ENTIRE function body, raising UnboundLocalError when reading it on earlier lines.'
    },
    tryIt: {
      desc: 'Create a unit converter function convert_distance(value, from_unit, to_unit) supporting "km", "miles", and "meters".',
      code: `def convert_distance(val, from_unit, to_unit):
    to_meters = {"km": 1000, "meters": 1, "miles": 1609.34}
    
    meters = val * to_meters[from_unit]
    result = meters / to_meters[to_unit]
    return round(result, 2)

print("5 km in miles:", convert_distance(5, "km", "miles"), "miles")
print("10 miles in km:", convert_distance(10, "miles", "km"), "km")`
    },
    faqs: [
      {
        q: 'What is the LEGB rule in Python?',
        a: 'LEGB stands for Local, Enclosing, Global, Built-in. It defines the exact 4-step hierarchy Python uses to resolve variable names.'
      },
      {
        q: 'What is the difference between global and nonlocal?',
        a: 'global binds a variable name to the top-level module scope. nonlocal binds a variable name to the nearest enclosing parent function scope in nested functions.'
      },
      {
        q: 'Why are pure functions preferred in modern software development?',
        a: 'Pure functions produce no side effects and always return identical outputs for identical inputs, making them deterministic, bug-resistant, and easy to test and parallelize.'
      }
    ]
  },

  // =========================================================================
  // CHAPTER 18: PYTHON LAMBDA, RECURSION & TYPE HINTS
  // =========================================================================
  {
    num: 18,
    phaseId: 'phase4',
    phaseTitle: 'Phase 4: Functions & Reusable Code',
    slug: '18-python-lambda-recursion-and-type-hints',
    title: 'Python Lambda, Recursion & Type Hints',
    badge: '18. Lambda, Recursion & Hints',
    subtopics: 'Lambda Expressions · Recursion & Call Stack · PEP 484 Type Hints · Docstrings · Password Generator',
    desc: 'Master advanced functional Python patterns: anonymous lambda expressions, recursive function call stack mechanics, modern PEP 484 type hints, PEP 257 docstrings, and building a secure password generator.',
    sections: [
      {
        title: '1. Anonymous Lambda Functions (lambda x: expr)',
        body: `<p>A <strong>lambda function</strong> is a small, anonymous inline function that can have any number of parameters but only a <strong>single expression</strong> whose evaluated value is automatically returned.</p>
        <div class="diagram-box">Syntax:  lambda parameter1, parameter2 : expression</div>
        <p>Lambdas are most commonly used as lightweight key functions for <code>sorted()</code>, <code>filter()</code>, and <code>map()</code>:</p>`,
        code: `# 1. Basic inline lambda:
square = lambda x: x ** 2
print("Square of 6:", square(6))

# 2. Sorting complex data structures by custom key:
employees = [
    {"name": "Balaji", "salary": 95000},
    {"name": "Alex", "salary": 65000},
    {"name": "Chloe", "salary": 82000}
]

# Sort employees by salary ascending using lambda:
sorted_by_salary = sorted(employees, key=lambda emp: emp["salary"])
print("\\nSorted by Salary:")
for emp in sorted_by_salary:
    print(f"• {emp['name']:8}: Rs.{emp['salary']}")

# 3. filter() with lambda:
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
even_numbers = list(filter(lambda n: n % 2 == 0, numbers))
print("\\nEven Numbers (via filter):", even_numbers)`,
        codeTitle: 'Example 1: Anonymous Lambda Expressions with sorted & filter',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Lambda Limitations:</strong>
          <p style="margin-top:6px;">Lambdas cannot contain assignments (<code>=</code>), loops (<code>for</code>/<code>while</code>), or multiple statements. For complex logic, always define a standard <code>def</code> function.</p>
        </div>`
      },
      {
        title: '2. Recursion Architecture: Base Cases & Call Stack',
        body: `<p><strong>Recursion</strong> is a programming technique where a function calls itself to solve a smaller instance of the same problem.</p>
        <p>Every well-structured recursive function requires two components:</p>
        <ol>
          <li><strong>Base Case:</strong> The termination condition that stops recursion without making another call.</li>
          <li><strong>Recursive Step:</strong> Calling itself with modified arguments moving closer to the base case.</li>
        </ol>`,
        code: `# 1. Factorial Calculation via Recursion (n! = n * (n-1)!)
def factorial(n):
    # Base Case:
    if n <= 1:
        return 1
    # Recursive Step:
    return n * factorial(n - 1)

# 2. Fibonacci Sequence via Recursion:
def fibonacci(n):
    if n <= 0: return 0
    if n == 1: return 1
    return fibonacci(n - 1) + fibonacci(n - 2)

print("Factorial of 5 (5!):", factorial(5)) # 120
print("Fibonacci #7:", fibonacci(7))         # 13`,
        codeTitle: 'Example 2: Recursive Factorial and Fibonacci Algorithms',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Recursion Depth Safety:</strong>
          <p style="margin-top:6px;">CPython protects your computer RAM with a default maximum recursion limit of 1000 frames (<code>sys.getrecursionlimit()</code>) to prevent stack overflow crashes.</p>
        </div>`
      },
      {
        title: '3. Modern Type Hints (PEP 484 & typing Module)',
        body: `<p>Introduced in Python 3.5+ (PEP 484), <strong>Type Hints</strong> allow you to annotate expected parameter types and return types. Type hints do not impact runtime speed, but enable instant IDE autocomplete, static bug detection with tools like <code>mypy</code>, and self-documenting codebases:</p>`,
        code: `from typing import List, Dict, Optional, Tuple

def calculate_student_gpa(
    scores: List[float], 
    student_id: int, 
    extra_credit: Optional[float] = None
) -> Tuple[float, str]:
    """Calculate GPA and return formatted tuple."""
    total = sum(scores) + (extra_credit or 0.0)
    gpa = total / len(scores)
    status = "Pass" if gpa >= 50.0 else "Fail"
    return round(gpa, 2), status

gpa, status = calculate_student_gpa([85.0, 92.5, 78.0], 101, extra_credit=5.0)
print(f"Student GPA: {gpa} | Status: {status}")`,
        codeTitle: 'Example 3: Modern PEP 484 Type Hints',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Type Hint Benefits:</strong>
          <ul style="margin:8px 0 0 18px; line-height:1.7;">
            <li><code>scores: List[float]</code> specifies a list of decimal floats.</li>
            <li><code>-> Tuple[float, str]</code> clearly documents the returned pair.</li>
          </ul>
        </div>`
      },
      {
        title: '4. Practical Project 4: Secure Password Generator with Custom Complexity',
        body: `<p>A customizable, cryptographically strong random password generator using functions and standard library modules:</p>`,
        code: `import random
import string

def generate_secure_password(
    length: int = 12, 
    include_uppercase: bool = True, 
    include_digits: bool = True, 
    include_special: bool = True
) -> str:
    """Generate a randomized secure password based on complexity rules."""
    char_pool = string.ascii_lowercase
    password_chars = [random.choice(string.ascii_lowercase)]
    
    if include_uppercase:
        char_pool += string.ascii_uppercase
        password_chars.append(random.choice(string.ascii_uppercase))
    if include_digits:
        char_pool += string.digits
        password_chars.append(random.choice(string.digits))
    if include_special:
        special_chars = "!@#\$%^&*()-_=+"
        char_pool += special_chars
        password_chars.append(random.choice(special_chars))
        
    # Fill remaining characters randomly from the combined pool:
    for _ in range(length - len(password_chars)):
        password_chars.append(random.choice(char_pool))
        
    # Shuffle to eliminate predictable character positioning:
    random.shuffle(password_chars)
    return "".join(password_chars)

# Generate various password profiles:
print("🔑 12-char Standard Password:", generate_secure_password(12))
print("🔑 16-char Ultra-Secure:     ", generate_secure_password(16))
print("🔑 8-char Digits-Only Pin:   ", generate_secure_password(8, include_uppercase=False, include_special=False))`,
        codeTitle: 'Example 4: Secure Password Generator Project',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Security Best Practice:</strong>
          <p style="margin-top:6px;">We guarantee at least one character of each requested type, and then execute <code>random.shuffle()</code> so the characters appear in completely unpredictable positions.</p>
        </div>`
      }
    ],
    mistake: {
      title: 'Missing Recursive Base Case (RecursionError: maximum recursion depth exceeded)',
      text: 'If your recursive function lacks a terminating base case, it will call itself endlessly until CPython crashes with RecursionError: maximum recursion depth exceeded. Always define base cases first!'
    },
    tryIt: {
      desc: 'Use a lambda function with sorted() to sort a list of city tuples by their temperature (2nd element) in descending order.',
      code: `weather_data = [("Hyderabad", 34), ("Bengaluru", 24), ("Delhi", 40), ("Shimla", 16)]

sorted_cities = sorted(weather_data, key=lambda item: item[1], reverse=True)

print("Hottest to Coldest Cities:")
for city, temp in sorted_cities:
    print(f"• {city:10}: {temp}°C")`
    },
    faqs: [
      {
        q: 'When should I use a lambda function instead of def?',
        a: 'Use lambda for simple, disposable, single-line functions passed directly into higher-order functions like sorted(key=...), filter(), or map(). If logic spans multiple statements or needs reuse, use def.'
      },
      {
        q: 'Do Python type hints enforce type safety at runtime?',
        a: 'No. Python remains dynamically typed and will not crash at runtime if a mismatched type is passed. Type hints are used by IDEs, linters, and static analyzers (mypy) to catch bugs during development.'
      },
      {
        q: 'What is tail call optimization, and does Python support it?',
        a: 'Tail call optimization replaces recursive stack frames with loops to prevent stack overflow. Guido van Rossum intentionally omitted tail call optimization from CPython to preserve complete debug stack traces.'
      }
    ]
  },

  // =========================================================================
  // CHAPTER 19: PYTHON MENU-DRIVEN APPLICATIONS
  // =========================================================================
  {
    num: 19,
    phaseId: 'phase4',
    phaseTitle: 'Phase 4: Functions & Reusable Code',
    slug: '19-python-menu-driven-applications',
    title: 'Python Menu-Driven Applications',
    badge: '19. Menu-Driven Apps',
    subtopics: 'CLI Menu Loops · Function Dispatch Tables · State Management · Banking System Project · Capstone Architecture',
    desc: 'Master building professional menu-driven CLI applications: interactive while loops, dictionary-based function dispatchers, input validation, and building a full student management & banking application.',
    sections: [
      {
        title: '1. Menu-Driven Architecture & The Control Loop',
        body: `<p>A <strong>Menu-Driven Application</strong> is an interactive console program that presents the user with a numbered list of choices, processes their input, executes the corresponding modular function, and loops back until the user explicitly chooses to exit.</p>
        <div class="diagram-box">┌────────────────────────────────────────────────────────┐
│  1. Display Interactive Menu Options                   │
│  2. Read User Choice & Validate Input                  │
│  3. Dispatch Associated Worker Function (CRUD Task)    │
│  4. Loop back to Menu (until Exit selected)            │
└────────────────────────────────────────────────────────┘</div>`,
        code: `# Simple Menu Loop Blueprint:
def show_menu():
    print("\\n--- 📱 Quick Actions Menu ---")
    print("1. View Profile")
    print("2. Update Settings")
    print("3. Exit")

def app_controller():
    # Simulated choices for demo run:
    simulated_inputs = ["1", "2", "3"]
    
    for choice in simulated_inputs:
        show_menu()
        print("Selected Choice:", choice)
        
        if choice == "1":
            print("👉 Action: Displaying User Profile...")
        elif choice == "2":
            print("👉 Action: Updating User Settings...")
        elif choice == "3":
            print("👋 Exiting program. Goodbye!")
            break

app_controller()`,
        codeTitle: 'Example 1: Interactive Menu Loop Blueprint',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Control Flow:</strong>
          <p style="margin-top:6px;">The loop continuously prompts the user until the exit condition breaks the control loop.</p>
        </div>`
      },
      {
        title: '2. Dictionary Function Dispatch Tables (Replacing if-elif Ladders)',
        body: `<p>As CLI applications grow, giant <code>if-elif-elif-else</code> ladders become messy and hard to maintain. Professional Python developers use <strong>Dictionary Function Dispatch Tables</strong> to route commands in fast $O(1)$ constant time:</p>`,
        code: `# Modular worker functions:
def handle_view(): return "📋 Showing all database records..."
def handle_create(): return "➕ Creating new database record..."
def handle_delete(): return "🗑️ Deleting specified record..."
def handle_exit(): return "👋 Application closed."

# Function Dispatch Table:
COMMANDS_DISPATCH = {
    "1": handle_view,
    "2": handle_create,
    "3": handle_delete,
    "4": handle_exit
}

def execute_command(user_choice):
    action = COMMANDS_DISPATCH.get(user_choice)
    if action:
        return action() # Dynamically invoke the mapped function!
    return "❌ Invalid selection! Please enter a valid number."

# Test command dispatch:
for choice in ["1", "2", "3", "99", "4"]:
    print(f"Command '{choice}' -> {execute_command(choice)}")`,
        codeTitle: 'Example 2: Dictionary Function Dispatch Tables',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Clean Code Insight:</strong>
          <p style="margin-top:6px;">Adding a new feature is as easy as writing a new function and registering it in <code>COMMANDS_DISPATCH</code> with zero changes to the core execution loop!</p>
        </div>`
      },
      {
        title: '3. Capstone Project: Comprehensive Student Management & Banking System',
        body: `<p>A complete, production-ready menu-driven application featuring account creation, balance inquiry, deposits, withdrawals, and transaction logging:</p>`,
        code: `# =========================================================================
# CAPSTONE PROJECT: MODULAR BANKING & ACCOUNT MANAGEMENT APPLICATION
# =========================================================================

accounts_database = {
    "ACC101": {"holder": "Balaji", "balance": 5000.0, "history": []},
    "ACC102": {"holder": "Alex", "balance": 2500.0, "history": []}
}

def check_balance(acc_id):
    acc = accounts_database.get(acc_id)
    if not acc: return f"❌ Account {acc_id} not found."
    return f"💳 Account: {acc['holder']} | Balance: Rs.{acc['balance']:.2f}"

def deposit_funds(acc_id, amount):
    acc = accounts_database.get(acc_id)
    if not acc: return f"❌ Account {acc_id} not found."
    if amount <= 0: return "❌ Deposit amount must be positive!"
    
    acc["balance"] += amount
    acc["history"].append(f"Deposited +Rs.{amount:.2f}")
    return f"✅ Deposited Rs.{amount:.2f} successfully! New Balance: Rs.{acc['balance']:.2f}"

def withdraw_funds(acc_id, amount):
    acc = accounts_database.get(acc_id)
    if not acc: return f"❌ Account {acc_id} not found."
    if amount > acc["balance"]:
        return f"❌ Insufficient funds! Current Balance: Rs.{acc['balance']:.2f}"
        
    acc["balance"] -= amount
    acc["history"].append(f"Withdrawn -Rs.{amount:.2f}")
    return f"✅ Withdrew Rs.{amount:.2f} successfully! Remaining: Rs.{acc['balance']:.2f}"

# Execute banking simulation:
print("--- 🏦 Online Banking Simulation ---")
print(check_balance("ACC101"))
print(deposit_funds("ACC101", 1500.0))
print(withdraw_funds("ACC101", 2000.0))
print(withdraw_funds("ACC101", 10000.0)) # Insufficient funds test
print("\\nFinal State ACC101:", accounts_database["ACC101"])`,
        codeTitle: 'Example 3: Comprehensive Banking Management System Project',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Software Engineering Principles:</strong>
          <ul style="margin:8px 0 0 18px; line-height:1.7;">
            <li><strong>Single Responsibility:</strong> Each function does one job (deposit, withdraw, balance check).</li>
            <li><strong>Defensive Validation:</strong> Verifies account existence, prevents negative deposits, and guards against overdrafts.</li>
          </ul>
        </div>`
      }
    ],
    mistake: {
      title: 'Missing Parentheses When Calling Dispatched Functions',
      text: 'In a dispatch dictionary, store the function name without parentheses (e.g. {"1": my_func}). If you write {"1": my_func()}, the function executes immediately at dictionary creation time rather than when selected!'
    },
    tryIt: {
      desc: 'Build a menu-driven mini inventory app with options to: 1. View Inventory, 2. Add Stock, 3. Sell Stock.',
      code: `inventory = {"Laptops": 10, "Mice": 25, "Keyboards": 15}

def add_stock(item, qty):
    inventory[item] = inventory.get(item, 0) + qty
    return f"Added {qty} {item}. Current Stock: {inventory[item]}"

def sell_stock(item, qty):
    if inventory.get(item, 0) < qty:
        return f"Insufficient stock for {item}!"
    inventory[item] -= qty
    return f"Sold {qty} {item}. Remaining: {inventory[item]}"

print("Initial Inventory:", inventory)
print(add_stock("Laptops", 5))
print(sell_stock("Mice", 10))
print("Updated Inventory:", inventory)`
    },
    faqs: [
      {
        q: 'What is a function dispatch table in Python?',
        a: 'A dispatch table is a dictionary mapping user command keys to function reference objects. When a command is selected, Python looks up and executes the mapped function in O(1) time.'
      },
      {
        q: 'How do I handle invalid user inputs in a CLI menu gracefully?',
        a: 'Use try-except blocks when converting strings to numbers (e.g. try: choice = int(input()) except ValueError:) and dictionary .get(key) with a default error message.'
      },
      {
        q: 'How can I persist data between program executions in a menu app?',
        a: 'Use the built-in json module (json.dump() and json.load()) or the sqlite3 module to save the data dictionary to disk so it reloads automatically on launch.'
      }
    ]
  }
];
