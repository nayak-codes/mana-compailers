// Phase 2: Operators & Control Flow Data
module.exports = [
  // =========================================================================
  // CHAPTER 6: COMPLETE PYTHON OPERATORS GUIDE
  // =========================================================================
  {
    num: 6,
    phaseId: 'phase2',
    phaseTitle: 'Phase 2: Operators & Control Flow',
    slug: '06-python-operators-complete-guide',
    title: 'Python Operators Complete Guide',
    badge: '6. Operators Guide',
    subtopics: 'Arithmetic · Comparison · Logical (and, or, not) · Identity (is) · Membership (in) · Walrus (:=) · Precedence',
    desc: 'Master all 8 operator families in Python: arithmetic, comparison, logical short-circuiting, identity, membership, walrus operator, and precedence.',
    sections: [
      {
        title: '1. What is an Operator? (Operands & Expressions)',
        body: `<p>An <strong>operator</strong> is a special symbol or keyword that performs a computation on one or more <strong>operands</strong> (values/variables). Python organizes operators into 8 distinct families:</p>`,
        code: `# Basic operator examples:
a = 10
b = 5

print("1. Arithmetic (a + b):", a + b)           # 15
print("2. Comparison (a > b):", a > b)           # True
print("3. Logical (a > 0 and b > 0):", a > 0 and b > 0) # True`,
        codeTitle: 'Example 1: Basic Operator Computations',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Concepts:</strong>
          <p style="margin-top:6px;">In <code>a + b</code>, <code>+</code> is the operator, while <code>a</code> and <code>b</code> are operands.</p>
        </div>`
      },
      {
        title: '2. Arithmetic Operators (True Division vs Floor Division)',
        body: `<p>Python provides 7 core arithmetic operators. Notice the important difference between <code>/</code> and <code>//</code>:</p>
        <ul>
          <li><code>/</code>: <strong>True Float Division</strong> — ALWAYS returns a float (e.g. <code>10 / 2 -> 5.0</code>).</li>
          <li><code>//</code>: <strong>Floor Division</strong> — Truncates decimals and rounds downward toward negative infinity (e.g. <code>15 // 4 -> 3</code>, but <code>-15 // 4 -> -4</code>).</li>
          <li><code>%</code>: <strong>Modulus</strong> — Returns remainder after division.</li>
          <li><code>**</code>: <strong>Exponentiation (Power)</strong> — Calculates $a^b$.</li>
        </ul>`,
        code: `print("15 / 4  (True float division):", 15 / 4)       # 3.75 (Float)
print("15 // 4 (Floor integer division):", 15 // 4)    # 3 (Int)
print("-15 // 4 (Negative floor division):", -15 // 4) # -4 (Rounds down to -infinity!)
print("15 % 4  (Modulus remainder):", 15 % 4)         # 3 (Remainder)
print("2 ** 5  (Exponentiation power):", 2 ** 5)       # 32 (2 to the power 5)`,
        codeTitle: 'Example 2: Arithmetic Operators Breakdown',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Why is -15 // 4 equal to -4?</strong>
          <p style="margin-top:6px;">Mathematical division of $-15 / 4 = -3.75$. Floor division rounds to the nearest smaller integer, which is $-4$ (not $-3$).</p>
        </div>`
      },
      {
        title: '3. Comparison Operators & Python Chained Comparisons',
        body: `<p>Comparison operators compare two values and evaluate to <code>True</code> or <code>False</code> (<code>==</code>, <code>!=</code>, <code>></code>, <code><</code>, <code>>=</code>, <code><=</code>).</p>
        <p><strong>Python Chained Comparisons:</strong> You can chain comparisons mathematically without writing multiple <code>and</code> statements:</p>`,
        code: `score = 85

# In C/Java you write: score >= 80 && score <= 90
# In Python you write clean chained math:
if 80 <= score <= 90:
    print(f"Grade B: Score {score} is between 80 and 90! 🎯")`,
        codeTitle: 'Example 3: Chained Comparisons in Python',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Efficiency Benefit:</strong>
          <p style="margin-top:6px;">In <code>80 <= score <= 90</code>, Python evaluates the central variable <code>score</code> only ONCE, making it faster and cleaner.</p>
        </div>`
      },
      {
        title: '4. Logical Operators & Short-Circuit Evaluation',
        body: `<p>Python uses English keywords: <code>and</code>, <code>or</code>, and <code>not</code>.</p>
        <p><strong>Short-Circuiting:</strong> Python stops evaluating as soon as the outcome is determined. Moreover, Python logical operators return the <strong>actual operand value</strong>, enabling the widely-used fallback pattern:</p>`,
        code: `# 1. Logical and / or
age = 20
has_id = True
if age >= 18 and has_id:
    print("Entry Allowed! 🎟️")

# 2. Returning actual operands (Fallback pattern)
user_input = ""
default_name = user_input or "Anonymous Guest"
print("Welcome,", default_name)`,
        codeTitle: 'Example 4: Logical Operators & Fallback Values',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 How Fallbacks Work:</strong>
          <p style="margin-top:6px;">Since <code>user_input</code> is empty string (<code>""</code> is Falsy), the <code>or</code> operator evaluates and returns the right operand: <code>"Anonymous Guest"</code>.</p>
        </div>`
      },
      {
        title: '5. Identity Operators (is, is not) vs Equality (==)',
        body: `<p>Never confuse <code>==</code> and <code>is</code>:</p>
        <ul>
          <li><code>==</code>: Checks <strong>Value Equality</strong> (are the contents identical?).</li>
          <li><code>is</code>: Checks <strong>Memory Address Identity</strong> (do both variables point to the same physical object in RAM?).</li>
        </ul>`,
        code: `list1 = [1, 2, 3]
list2 = [1, 2, 3]

print("list1 == list2 (Values match?):", list1 == list2) # True
print("list1 is list2 (Same memory?):", list1 is list2)   # False

# Rule: Use 'is' strictly for singleton constants like None, True, False
target_val = None
if target_val is None:
    print("Value is None! ✅")`,
        codeTitle: 'Example 5: Identity (is) vs Equality (==)',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Memory Pointer Explanation:</strong>
          <p style="margin-top:6px;"><code>list1</code> and <code>list2</code> have identical items <code>[1, 2, 3]</code>, but live at two completely different memory addresses, so <code>list1 is list2</code> is <code>False</code>.</p>
        </div>`
      },
      {
        title: '6. Membership Operators (in, not in)',
        body: `<p>Membership operators check whether a value exists inside a container (string, list, tuple, set, dictionary):</p>`,
        code: `fruits = ["apple", "banana", "mango"]
print("Is apple in list?", "apple" in fruits)  # True
print("Is grape in list?", "grape" in fruits)  # False

# Substring check in text:
sentence = "python programming is awesome"
print("Is 'program' in sentence?", "program" in sentence)  # True`,
        codeTitle: 'Example 6: Membership Operators (in, not in)',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Performance Note:</strong>
          <p style="margin-top:6px;">Checking <code>x in set</code> or <code>x in dict</code> runs in instantaneous $O(1)$ constant time due to internal hash tables!</p>
        </div>`
      },
      {
        title: '7. The Walrus Operator (:=) (Assignment Expressions)',
        body: `<p>Introduced in Python 3.8 (PEP 572), the <strong>walrus operator (<code>:=</code>)</strong> allows you to assign a variable <strong>inside an expression</strong>, eliminating duplicate function calls:</p>`,
        code: `sample_text = "Python Masterclass 2026"

# Assign length and test condition in ONE line:
if (length := len(sample_text)) > 10:
    print(f"Text is long! It contains {length} characters.")`,
        codeTitle: 'Example 7: The Walrus Operator (:=)',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Benefit of Walrus:</strong>
          <p style="margin-top:6px;"><code>len(sample_text)</code> is calculated only ONCE and stored directly in <code>length</code> for immediate reuse inside the if block.</p>
        </div>`
      }
    ],
    mistake: {
      title: 'Using "is" for Number and String Comparisons',
      text: 'Do not write "if x is 100:" or "if name is \'admin\':". Use "==" for all value checks. Use "is" strictly for singleton objects like None, True, False.'
    },
    tryIt: {
      desc: 'Check if a student passed both math and science exams (marks >= 40 in both) using the and operator.',
      code: `math_score = 75
science_score = 82

if math_score >= 40 and science_score >= 40:
    print("🎉 Congratulations, you passed both exams!")
else:
    print("❌ You need to retake one or more exams.")`
    },
    faqs: [
      {
        q: 'Why does Python logical "or" return the first truthy value instead of True?',
        a: 'Returning the actual operand enables powerful idioms like default fallback values: name = input_name or "Anonymous".'
      },
      {
        q: 'What is the difference between / and // in Python?',
        a: '/ performs true float division (10 / 2 = 5.0). // performs floor division, discarding the remainder and rounding toward negative infinity (10 // 3 = 3, -10 // 3 = -4).'
      },
      {
        q: 'What is the time complexity of checking "item in collection"?',
        a: 'For lists and tuples, "in" runs in linear O(N) time. For sets and dictionaries, "in" runs in instantaneous constant O(1) time due to hash tables.'
      }
    ]
  },

  // =========================================================================
  // CHAPTER 7: CONDITIONAL STATEMENTS & BRANCHING
  // =========================================================================
  {
    num: 7,
    phaseId: 'phase2',
    phaseTitle: 'Phase 2: Operators & Control Flow',
    slug: '07-python-conditional-statements-and-branching',
    title: 'Python Conditional Statements (if, elif, else)',
    badge: '7. Conditional Statements',
    subtopics: 'if-elif-else · Guard Clauses · Ternary Operator · match-case',
    desc: 'Master decision making and control flow branching in Python: if conditions, elif ladders, else fallbacks, guard clauses, ternary expressions, and match-case.',
    sections: [
      {
        title: '1. Decision Making Architecture & The if-elif-else Ladder',
        body: `<p>Conditional statements branch execution dynamically. The conditions are evaluated sequentially from top to bottom; once the first <code>True</code> condition executes, all subsequent <code>elif</code> and <code>else</code> branches are skipped:</p>`,
        code: `# Grading system based on marks:
marks = 82

if marks >= 90:
    print("Grade: A+ (Outstanding!) 🌟")
elif marks >= 75:
    print("Grade: A (Very Good!) ✨")
elif marks >= 50:
    print("Grade: B (Pass) 👍")
else:
    print("Grade: Fail ❌")`,
        codeTitle: 'Example 1: if-elif-else Grade Calculator',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Step-by-Step Execution:</strong>
          <ul style="margin:8px 0 0 18px; line-height:1.7;">
            <li>Python tests <code>marks >= 90</code> (82 >= 90 is False) -> skips.</li>
            <li>Python tests <code>marks >= 75</code> (82 >= 75 is True) -> prints <code>Grade: A (Very Good!) ✨</code>.</li>
            <li>All remaining branches (<code>elif marks >= 50</code> and <code>else</code>) are immediately bypassed!</li>
          </ul>
        </div>`
      },
      {
        title: '2. Flattening Code with Guard Clauses (Avoiding Pyramid of Doom)',
        body: `<p>Deeply nested <code>if</code> statements make code difficult to read. Professional developers use <strong>Guard Clauses (early returns)</strong> to keep logic flat and clean:</p>`,
        code: `def check_user_access(is_logged_in, has_permission, is_banned):
    # Guard Clauses (Early Exits):
    if not is_logged_in:
        return "Please log in first."
    if is_banned:
        return "Account is banned!"
    if not has_permission:
        return "Access denied."
        
    return "Welcome to Admin Dashboard! ✅"

print(check_user_access(True, True, False))`,
        codeTitle: 'Example 2: Guard Clauses (Early Returns)',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Code Quality Insight:</strong>
          <p style="margin-top:6px;">Guard clauses handle failure/invalid conditions early and return immediately, keeping the "happy path" un-indented and crystal clear.</p>
        </div>`
      },
      {
        title: '3. Ternary Operator (Inline One-Line if-else)',
        body: `<p>Python provides an inline ternary conditional expression with the syntax: <code>value_if_true if condition else value_if_false</code>:</p>`,
        code: `age = 20
status = "Adult" if age >= 18 else "Minor"
print("Status:", status)

# Dynamic fee calculation:
is_weekend = True
entry_fee = 25 if is_weekend else 15
print(f"Entry Fee: \${entry_fee}")`,
        codeTitle: 'Example 3: Ternary Conditional Expression',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 One-line Syntax:</strong>
          <p style="margin-top:6px;">Ternary expressions are perfect for simple variable assignments based on a single condition.</p>
        </div>`
      },
      {
        title: '4. Structural Pattern Matching: match-case (Python 3.10+)',
        body: `<p>Python 3.10 introduced <code>match-case</code>, replacing clumsy switch-case statements with powerful structural pattern matching and OR patterns (<code>|</code>):</p>`,
        code: `http_status = 404

match http_status:
    case 200:
        print("200 OK: Request succeeded! ✅")
    case 401 | 403:
        print("Auth Error: Access forbidden.")
    case 404:
        print("404 Not Found: Page does not exist! ❌")
    case _:
        print("Other Server Status Code")`,
        codeTitle: 'Example 4: match-case Pattern Matching',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 match-case Features:</strong>
          <ul style="margin:8px 0 0 18px; line-height:1.7;">
            <li><code>case 401 | 403:</code> matches either 401 OR 403.</li>
            <li><code>case _:</code> acts as the wildcard fallback (equivalent to <code>default:</code> in C/Java).</li>
          </ul>
        </div>`
      }
    ],
    mistake: {
      title: 'Using Multiple Separate "if" Statements Instead of "elif"',
      text: 'If you use multiple if statements sequentially, Python evaluates EVERY single condition independently, even after finding a match. Using elif ensures that once the first True branch executes, all subsequent checks are skipped.'
    },
    tryIt: {
      desc: 'Check if a year is a Leap Year (divisible by 4 and not divisible by 100, or divisible by 400).',
      code: `year = 2024

if (year % 4 == 0 and year % 100 != 0) or (year % 400 == 0):
    print(f"✅ {year} is a Leap Year!")
else:
    print(f"❌ {year} is NOT a Leap Year.")`
    },
    faqs: [
      {
        q: 'Does Python have a traditional switch-case statement?',
        a: 'Python 3.10 introduced match-case (Structural Pattern Matching) which replaces switch-case and supports deep object destructuring and guard conditions.'
      },
      {
        q: 'What is the difference between pass and continue?',
        a: 'pass is a no-op placeholder that allows execution to proceed to the next line. continue is used exclusively inside loops to skip the remainder of the current loop iteration and jump to the next cycle.'
      },
      {
        q: 'Can ternary operators be chained in Python?',
        a: 'Yes: x = "A" if score >= 90 else ("B" if score >= 80 else "C"). However, if chaining exceeds two levels, use standard if-elif-else for better readability.'
      }
    ]
  },

  // =========================================================================
  // CHAPTER 8: LOOPS — WHILE, FOR, RANGE
  // =========================================================================
  {
    num: 8,
    phaseId: 'phase2',
    phaseTitle: 'Phase 2: Operators & Control Flow',
    slug: '08-python-loops-while-and-for',
    title: 'Python Loops (while & for Loops)',
    badge: '8. while & for Loops',
    subtopics: 'while Loops · for Loops · range() Function · enumerate() · zip()',
    desc: 'Master iterative programming in Python: while loops, for loops, range() lazy evaluation, and unpacking with enumerate() and zip().',
    sections: [
      {
        title: '1. The while Loop (Condition-Controlled Repetition)',
        body: `<p>A <strong><code>while</code> loop</strong> repeatedly executes an indented block of code as long as its specified condition remains <strong>True</strong>.</p>
        <p>A properly structured while loop requires three essential components:</p>
        <ol>
          <li><strong>Initialization:</strong> A counter or state variable defined before the loop starts (e.g. <code>count = 1</code>).</li>
          <li><strong>Condition Test:</strong> Evaluated at the start of every iteration (e.g. <code>while count <= 5:</code>).</li>
          <li><strong>State Update:</strong> Incrementing or decrementing the state inside the loop (e.g. <code>count += 1</code>) to ensure the condition eventually evaluates to False, preventing dangerous <strong>infinite loops</strong>!</li>
        </ol>`,
        code: `# Step 1: Initialize counter variable
count = 1

# Step 2: Loop condition (Runs as long as count is <= 5)
while count <= 5:
    print("Current Count is:", count)
    
    # Step 3: Increment counter by 1 in each cycle
    count += 1

# Step 4: Executes after the loop finishes
print("While loop successfully finished! ✅")`,
        codeTitle: 'Example 1: while Loop Counting 1 to 5',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Step-by-Step Dry Run (Iteration Table):</strong>
          <table class="tbl" style="margin-top:8px; font-size:12.5px;">
            <tr><th>Iteration #</th><th>Condition (count &lt;= 5)</th><th>Action / Printed</th><th>New count value</th></tr>
            <tr><td>Iteration 1</td><td><code>1 &lt;= 5 (True)</code></td><td>Prints <code>Current Count is: 1</code></td><td><code>count = 2</code></td></tr>
            <tr><td>Iteration 2</td><td><code>2 &lt;= 5 (True)</code></td><td>Prints <code>Current Count is: 2</code></td><td><code>count = 3</code></td></tr>
            <tr><td>Iteration 3</td><td><code>3 &lt;= 5 (True)</code></td><td>Prints <code>Current Count is: 3</code></td><td><code>count = 4</code></td></tr>
            <tr><td>Iteration 4</td><td><code>4 &lt;= 5 (True)</code></td><td>Prints <code>Current Count is: 4</code></td><td><code>count = 5</code></td></tr>
            <tr><td>Iteration 5</td><td><code>5 &lt;= 5 (True)</code></td><td>Prints <code>Current Count is: 5</code></td><td><code>count = 6</code></td></tr>
            <tr><td>Iteration 6</td><td><code>6 &lt;= 5 (False!)</code></td><td>Loop terminates!</td><td>Exit loop</td></tr>
          </table>
        </div>`
      },
      {
        title: '2. The for Loop & Iterating Over Sequences',
        body: `<p>In Python, the <strong><code>for</code> loop</strong> is an <strong>iterator-based loop</strong> (similar to "for-each" in Java/C#). Instead of manually managing counters and index boundaries, Python automatically retrieves items from any iterable sequence (lists, strings, tuples, dictionaries):</p>`,
        code: `# Define a list of programming languages:
languages = ["Python", "JavaScript", "Java", "C++"]

# Iterate directly through each element in the list:
for lang in languages:
    print("Programming Language:", lang)`,
        codeTitle: 'Example 2: for Loop Iterating over a List',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Line-by-Line Code Breakdown:</strong>
          <ul style="margin:8px 0 0 18px; line-height:1.7;">
            <li><code>for lang in languages:</code>: On each loop cycle, Python automatically takes the next item from <code>languages</code> and binds it to the variable <code>lang</code>.</li>
            <li>No index bounds or manual length checks (<code>len()</code>) needed!</li>
          </ul>
        </div>`
      },
      {
        title: '3. The range() Built-in Sequence Generator',
        body: `<p>The built-in <code>range()</code> function produces an arithmetic sequence of numbers on demand. It accepts three parameters: <code>range(start, stop, step)</code>:</p>
        <ul>
          <li><code>start</code>: Starting integer (inclusive, default is <code>0</code>).</li>
          <li><code>stop</code>: Ending integer (exclusive — loop stops 1 number before!).</li>
          <li><code>step</code>: Stride/increment between each number (default is <code>1</code>).</li>
        </ul>`,
        code: `# 1. Counting 1 to 5 (stops before 6):
print("Counting 1 to 5:")
for i in range(1, 6):
    print(i, end=" ")
print()

# 2. Even numbers from 2 to 10 using step=2:
print("\\nEven numbers from 2 to 10 (step=2):")
for num in range(2, 11, 2):
    print(num, end=" ")
print()`,
        codeTitle: 'Example 3: range() with Step Increment',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Memory Efficiency Note:</strong>
          <p style="margin-top:6px;">In Python 3, <code>range(1_000_000)</code> uses constant $O(1)$ memory. It calculates each number on the fly as the loop progresses rather than allocating 1 million numbers in RAM!</p>
        </div>`
      },
      {
        title: '4. enumerate() for Index and Value Numbering',
        body: `<p>When looping through a collection, you often need both the <strong>index number</strong> and the <strong>item value</strong>. Instead of maintaining a separate counter variable, use the built-in <code>enumerate()</code> function:</p>`,
        code: `students = ["Alex", "Balaji", "Chloe", "David"]

# enumerate() yields both (index, item) in each iteration:
for rank, name in enumerate(students, start=1):
    print(f"Rank #{rank}: {name}")`,
        codeTitle: 'Example 4: Numbered Output with enumerate()',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Parameter Breakdown:</strong>
          <ul style="margin:8px 0 0 18px; line-height:1.7;">
            <li><code>start=1</code> sets the initial rank counter to <code>1</code> instead of standard zero.</li>
            <li>In each cycle, <code>rank</code> gets the number and <code>name</code> gets the student's string.</li>
          </ul>
        </div>`
      },
      {
        title: '5. Parallel Iteration with zip()',
        body: `<p>The <code>zip()</code> function allows you to iterate over multiple lists simultaneously in parallel, pairing up corresponding elements into tuples:</p>`,
        code: `names = ["Alice", "Bob", "Charlie"]
scores = [95, 88, 92]
grades = ["A+", "B+", "A"]

# Loop over all 3 lists simultaneously:
for name, score, grade in zip(names, scores, grades):
    print(f"Student: {name:7} | Score: {score}/100 | Grade: {grade}")`,
        codeTitle: 'Example 5: Parallel Iteration with zip()',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Output Breakdown:</strong>
          <p style="margin-top:6px;">In iteration 1: <code>Alice</code>, <code>95</code>, <code>A+</code>. In iteration 2: <code>Bob</code>, <code>88</code>, <code>B+</code>. <code>zip()</code> stops cleanly when the shortest list finishes.</p>
        </div>`
      }
    ],
    mistake: {
      title: 'Modifying a List While Iterating Over It',
      text: 'Never remove or append items to a list while looping over it (for item in my_list:). Doing so causes index shifting and skips elements! Instead, iterate over a shallow copy: for item in my_list.copy(): or use a list comprehension.'
    },
    tryIt: {
      desc: 'Print a multiplication table for the number 5 from 1 to 10.',
      code: `table_num = 5

print(f"✖️ Multiplication Table of {table_num}:")
for i in range(1, 11):
    print(f"{table_num} x {i} = {table_num * i}")`
    },
    faqs: [
      {
        q: 'Does range() allocate all numbers in memory at once in Python 3?',
        a: 'No. In Python 3, range() is a generator-like lazy sequence object that calculates each number on demand, using constant O(1) memory space.'
      },
      {
        q: 'What happens when zip() is passed lists of different lengths?',
        a: 'By default, zip() stops as soon as the shortest iterable is exhausted. If you want to continue until the longest iterable finishes, use itertools.zip_longest() with a fillvalue.'
      },
      {
        q: 'How do I iterate over a list in reverse order?',
        a: 'You can use reversed(my_list) (which returns a reverse iterator without modifying the list) or slice notation my_list[::-1].'
      }
    ]
  },

  // =========================================================================
  // CHAPTER 9: LOOP CONTROLS & ELSE
  // =========================================================================
  {
    num: 9,
    phaseId: 'phase2',
    phaseTitle: 'Phase 2: Operators & Control Flow',
    slug: '09-python-loop-control-statements-and-else',
    title: 'Python Loop Controls (break, continue, else)',
    badge: '9. Loop Controls & else',
    subtopics: 'break · continue · pass · Loop else Clause · Prime Checker',
    desc: 'Master loop controls: early exit with break, skipping iterations with continue, pass stubs, and the Python loop else clause.',
    sections: [
      {
        title: '1. The break Statement (Early Loop Exit)',
        body: `<p>The <strong><code>break</code> statement</strong> immediately terminates the loop as soon as a target condition is met, transferring execution to the first line following the loop:</p>`,
        code: `# Search for target number 3 and stop immediately:
print("Starting loop:")

for i in range(1, 6):
    if i == 3:
        print("🎯 Target number 3 found! Stopping loop immediately.")
        break  # Loop exits right here!
        
    print("Processing number:", i)

print("Program continued after break. ✅")`,
        codeTitle: 'Example 1: Terminating Loop Early with break',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Execution Flow:</strong>
          <ul style="margin:8px 0 0 18px; line-height:1.7;">
            <li>Prints <code>Processing number: 1</code>, then <code>Processing number: 2</code>.</li>
            <li>When <code>i == 3</code>, <code>break</code> terminates the loop. Numbers 4 and 5 are never processed!</li>
          </ul>
        </div>`
      },
      {
        title: '2. The continue Statement (Skipping Iterations)',
        body: `<p>The <strong><code>continue</code> statement</strong> skips the remainder of the current iteration and jumps directly to the next loop cycle:</p>`,
        code: `# Skip number 3 and continue with the rest of the numbers:
print("Starting loop with continue:")

for i in range(1, 6):
    if i == 3:
        print("⏭️ Skipping number 3...")
        continue  # Skips remaining lines in this iteration only!
        
    print("Processing number:", i)

print("Loop finished! ✅")`,
        codeTitle: 'Example 2: Skipping Current Iteration with continue',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Difference between break and continue:</strong>
          <ul style="margin:8px 0 0 18px; line-height:1.7;">
            <li><code>break</code> destroys and terminates the entire loop.</li>
            <li><code>continue</code> skips only the current cycle and keeps the loop running for subsequent elements.</li>
          </ul>
        </div>`
      },
      {
        title: '3. The Python Loop else Clause (Item Found Case)',
        body: `<p>In Python, you can attach an <code>else</code> block directly to a <code>for</code> or <code>while</code> loop. <strong>The loop else block executes ONLY if the loop finishes without hitting a <code>break</code> statement</strong>. If <code>break</code> occurs, the <code>else</code> is skipped:</p>`,
        code: `numbers = [10, 20, 30, 40]
target = 30

for num in numbers:
    if num == target:
        print(f"✅ Target {target} found in list!")
        break  # break triggers -> loop else is BYPASSED!
else:
    print(f"❌ Target {target} not found.")`,
        codeTitle: 'Example 3: Loop else Clause when Target is Found (break triggered)',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Why else was bypassed:</strong>
          <p style="margin-top:6px;">Because <code>num == 30</code> matched, <code>break</code> executed, cleanly bypassing the <code>else:</code> block.</p>
        </div>`
      },
      {
        title: '4. The Python Loop else Clause (Item NOT Found Case)',
        body: `<p>When the target is not in the list, the loop runs to natural completion without hitting <code>break</code>, so the <code>else</code> executes automatically — eliminating the need for boolean flags!</p>`,
        code: `numbers = [10, 20, 30, 40]
target = 99  # Number is not in the list

for num in numbers:
    if num == target:
        print(f"✅ Target {target} found!")
        break
else:
    # Executes automatically because no break occurred!
    print(f"❌ Target {target} was NOT found in the list! (Handled by loop else)")`,
        codeTitle: 'Example 4: Loop else Clause when Target is Missing',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 The Golden Rule of Loop else:</strong>
          <p style="margin-top:6px;">Think of loop else as <em>"if nobreak:"</em>. It runs only when the loop completes all iterations naturally.</p>
        </div>`
      },
      {
        title: '5. Real-World Application: Prime Number Checker with Loop else',
        body: `<p>Checking if a number is prime using the loop <code>else</code> search pattern:</p>`,
        code: `num = 17

# Check for divisors from 2 up to num - 1:
for i in range(2, num):
    if num % i == 0:
        print(f"{num} is NOT prime (divisible by {i})")
        break
else:
    # Executes if no number divided 'num' evenly:
    print(f"🌟 {num} is a PRIME NUMBER! (No divisors found)")`,
        codeTitle: 'Example 5: Prime Number Verification using Loop else',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 How it works:</strong>
          <p style="margin-top:6px;">If any number from 2 to 16 divides 17, <code>break</code> triggers. Since no number divides 17, the loop finishes all iterations and the <code>else:</code> block prints that 17 is Prime!</p>
        </div>`
      }
    ],
    mistake: {
      title: 'Expecting loop else to Execute After a break',
      text: 'Remember: If a loop exits via a break statement, the loop else block is completely bypassed. It only runs if the loop exhausts all items naturally or condition becomes false.'
    },
    tryIt: {
      desc: 'Search for student "Balaji" in a list of names. If found, print a greeting and break; if not found, let loop else print "Student not in class".',
      code: `students = ["Alex", "Balaji", "Chloe", "David"]
search_name = "Balaji"

for name in students:
    if name == search_name:
        print(f"👋 Found {search_name}! Welcome to class.")
        break
else:
    print(f"❌ {search_name} is not enrolled in this class.")`
    },
    faqs: [
      {
        q: 'Why did Guido van Rossum choose the keyword "else" for loops?',
        a: 'Guido wanted a keyword that signifies "if no break occurred". While some developers suggest "nobreak" would be clearer, "else" was chosen to keep Python\'s keyword count minimal.'
      },
      {
        q: 'Does while-else work the same way as for-else?',
        a: 'Yes. In a while-else loop, the else block runs when the while condition evaluates to False. If the while loop exits via break, the else block is skipped.'
      },
      {
        q: 'How can I break out of nested loops simultaneously?',
        a: 'In Python, the cleanest ways to exit nested loops are: (1) wrap the nested loops inside a function and use "return", (2) set a boolean flag, or (3) raise a custom exception.'
      }
    ]
  }
];
