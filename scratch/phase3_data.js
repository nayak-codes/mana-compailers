// Phase 3: Strings & Collections Data
module.exports = [
  // =========================================================================
  // CHAPTER 10: PYTHON STRINGS MASTERY
  // =========================================================================
  {
    num: 10,
    phaseId: 'phase3',
    phaseTitle: 'Phase 3: Strings and Collections',
    slug: '10-python-strings-mastery',
    title: 'Python Strings Mastery',
    badge: '10. Strings Mastery',
    subtopics: 'Quotes · Indexing · Slicing · Escape Characters · String Methods · F-Strings · Palindrome',
    desc: 'Master Python string manipulation: single/double quotes, escape sequences, zero-based positive & negative slicing, built-in string methods, f-strings, and palindrome algorithms.',
    sections: [
      {
        title: '1. Creating Strings, Quotes & Escape Characters',
        body: `<p>In Python, a <strong>string (<code>str</code>)</strong> is an <strong>immutable sequence of Unicode code points</strong>. Python 3 natively represents all text using UTF-8 encoding, allowing seamless support for international scripts, emojis, and scientific symbols.</p>
        <h4 style="color:#10b981; margin:16px 0 8px;">Ways to Create Strings:</h4>
        <ul>
          <li><strong>Single Quotes (<code>'...'</code>):</strong> Standard string literal. Useful when your text contains double quotation marks (e.g. <code>'She said "Hello"'</code>).</li>
          <li><strong>Double Quotes (<code>"..."</code>):</strong> Functionally identical to single quotes. Useful when your text contains apostrophes (e.g. <code>"It's a sunny day"</code>).</li>
          <li><strong>Triple Quotes (<code>"""..."""</code> or <code>'''...'''</code>):</strong> Multi-line string literals that preserve literal newlines and indentation blocks.</li>
          <li><strong>Raw Strings (<code>r"..."</code>):</strong> Prefixing a string with <code>r</code> disables escape sequence processing (vital for regular expressions and Windows file paths like <code>r"C:\\Users\\name"</code>).</li>
        </ul>
        <p><strong>Escape Characters:</strong> When you need to include special control characters inside a standard string, use a backslash (<code>\\</code>):</p>
        <table class="tbl" style="margin-top:8px; font-size:12.5px;">
          <tr><th>Escape Code</th><th>Meaning</th><th>Example</th></tr>
          <tr><td><code>\\n</code></td><td>Newline (Line feed)</td><td><code>"Line 1\\nLine 2"</code></td></tr>
          <tr><td><code>\\t</code></td><td>Horizontal Tab space (4-8 spaces)</td><td><code>"Col 1\\tCol 2"</code></td></tr>
          <tr><td><code>\\'</code></td><td>Literal single quote</td><td><code>'It\\'s Python'</code></td></tr>
          <tr><td><code>\\"</code></td><td>Literal double quote</td><td><code>"She said \\"Hi\\""</code></td></tr>
          <tr><td><code>\\\\</code></td><td>Literal backslash character</td><td><code>"path\\\\to\\\\file"</code></td></tr>
        </table>`,
        code: `# 1. Creating strings with single, double, and triple quotes
msg1 = 'Hello with single quotes'
msg2 = "Hello with double quotes (It's easy!)"
msg3 = """This is a
multi-line string
preserving newlines!"""

# 2. Escape characters demonstration
escaped_text = "Name:\\tBalaji\\nRole:\\tPython Backend Engineer\\nQuote:\\t\\"Keep Building!\\""

print(msg1)
print(msg2)
print("\\n--- Escape Characters Demo ---")
print(escaped_text)`,
        codeTitle: 'Example 1: String Creation and Escape Sequences',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Line-by-Line Breakdown:</strong>
          <ul style="margin:8px 0 0 18px; line-height:1.7;">
            <li><code>\\t</code> inserts a clean tab spacing between column labels and values.</li>
            <li><code>\\n</code> forces the cursor to jump to a new line.</li>
            <li><code>\\"</code> embeds literal double quotation marks inside a double-quoted string without syntax error.</li>
          </ul>
        </div>`
      },
      {
        title: '2. String Indexing & Slicing ([start:stop:step])',
        body: `<p>Because strings are ordered sequences, every character is assigned a numeric position (index). Python provides <strong>dual indexing</strong>:</p>
        <div class="diagram-box">Positive Indices:   0   1   2   3   4   5
String Characters:  P   y   t   h   o   n
Negative Indices:  -6  -5  -4  -3  -2  -1</div>
        <p><strong>Slicing Formula:</strong> <code>string[start : stop : step]</code></p>
        <ul>
          <li><code>start</code>: Index where the slice begins (inclusive, defaults to 0).</li>
          <li><code>stop</code>: Index where the slice ends (<strong>exclusive</strong> — stops 1 character before!).</li>
          <li><code>step</code>: Stride/increment between characters (defaults to 1; a negative step traverses backward!).</li>
        </ul>`,
        code: `text = "Python Programming"

# 1. Indexing (Single Characters)
print("First character [0]:", text[0])    # P
print("Last character [-1]:", text[-1])   # g

# 2. Slicing sub-ranges
print("First 6 chars [0:6]:", text[0:6])  # Python
print("From index 7 to end [7:]:", text[7:]) # Programming
print("Every 2nd character [::2]:", text[::2]) # Pto rgamn

# 3. String Reversing with step=-1:
print("Reversed string [::-1]:", text[::-1])`,
        codeTitle: 'Example 2: Indexing, Slicing and Reversing Strings',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Key Memory Concept:</strong>
          <p style="margin-top:6px;">Strings in Python are <strong>IMMUTABLE</strong>. Slicing never modifies the original string; it extracts and creates a brand new string object in memory.</p>
        </div>`
      },
      {
        title: '3. Essential String Methods (Case, Strip, Replace)',
        body: `<p>Python strings come equipped with dozens of built-in methods for data sanitization, transformation, and case normalization:</p>
        <ul>
          <li><code>len(s)</code>: Returns total character count (including whitespace).</li>
          <li><code>s.upper()</code> / <code>s.lower()</code>: Converts all characters to uppercase or lowercase.</li>
          <li><code>s.title()</code> / <code>s.capitalize()</code>: Capitalizes the first letter of each word or the sentence.</li>
          <li><code>s.strip()</code>: Strips leading and trailing whitespace / newlines (use <code>.lstrip()</code> for left only, <code>.rstrip()</code> for right only).</li>
          <li><code>s.replace(old, new, count)</code>: Replaces occurrences of a substring with new text.</li>
        </ul>`,
        code: `raw_input = "   learn python programming today   "

# 1. Length of string
print("Original Length:", len(raw_input))

# 2. Strip leading/trailing whitespace
cleaned = raw_input.strip()
print("Cleaned text:", repr(cleaned))
print("Cleaned Length:", len(cleaned))

# 3. Uppercase & Lowercase transformation
print("Uppercase:", cleaned.upper())
print("Title Case:", cleaned.title())

# 4. Replace substring
updated = cleaned.replace("python", "FastAPI & Python")
print("Replaced text:", updated)`,
        codeTitle: 'Example 3: String Cleaning and Transformation Methods',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Practical Use Case:</strong>
          <p style="margin-top:6px;">Always apply <code>.strip().lower()</code> when validating user input (like email addresses or usernames) to avoid accidental whitespace or capitalization mismatch bugs.</p>
        </div>`
      },
      {
        title: '4. Searching & Validating (find, count, startswith, endswith)',
        body: `<p>Inspect and validate string content using search helpers:</p>
        <ul>
          <li><code>s.find(sub)</code>: Returns index of first match (returns <code>-1</code> if not found).</li>
          <li><code>s.count(sub)</code>: Counts non-overlapping occurrences of substring.</li>
          <li><code>s.startswith(prefix)</code>: Returns <code>True</code> if string starts with prefix.</li>
          <li><code>s.endswith(suffix)</code>: Returns <code>True</code> if string ends with suffix.</li>
        </ul>`,
        code: `filename = "data_report_2026.pdf"

# 1. Validating prefix and suffix
print("Is PDF file?", filename.endswith(".pdf"))         # True
print("Is data file?", filename.startswith("data_"))     # True

# 2. Searching substring position
pos = filename.find("report")
print("Position of 'report': index", pos)                # index 5

# 3. Counting character occurrences
text_sample = "banana"
print("Count of letter 'a' in 'banana':", text_sample.count("a")) # 3`,
        codeTitle: 'Example 4: String Searching and Validation',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Pro Tip (find vs index):</strong>
          <p style="margin-top:6px;"><code>.find()</code> returns <code>-1</code> when a substring is missing, whereas <code>.index()</code> crashes with a <code>ValueError</code>. Use <code>.find()</code> for safer code.</p>
        </div>`
      },
      {
        title: '5. Splitting, Joining & Modern F-Strings',
        body: `<p>Converting between strings and lists is one of the most common programming tasks:</p>
        <ul>
          <li><code>s.split(delimiter)</code>: Breaks a string into a list of words or tokens based on a delimiter.</li>
          <li><code>delimiter.join(list)</code>: Combines a list of strings into a single string joined by the delimiter.</li>
          <li><strong>F-Strings (<code>f"..."</code>):</strong> Clean expression interpolation introduced in Python 3.6.</li>
        </ul>`,
        code: `# 1. Splitting CSV comma-separated data into a list
csv_line = "Apple,Banana,Mango,Orange"
fruits_list = csv_line.split(",")
print("Splitted List:", fruits_list)

# 2. Joining list items back with a custom separator
joined_str = " | ".join(fruits_list)
print("Joined String:", joined_str)

# 3. Modern f-string interpolation
user = "Balaji"
score = 98.75
message = f"Student {user} scored {score:.1f}% on the Python Exam!"
print("F-String Message:", message)`,
        codeTitle: 'Example 5: split(), join(), and F-String Formatting',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Why ".join()" syntax is delimiter-first:</strong>
          <p style="margin-top:6px;">In Python, you write <code>", ".join(my_list)</code> instead of <code>my_list.join(", ")</code> because <code>join</code> is a method of the string delimiter, allowing it to join any iterable (lists, tuples, sets, generators).</p>
        </div>`
      },
      {
        title: '6. Real-World Algorithm: Palindrome Checker',
        body: `<p>A <strong>palindrome</strong> is a word or phrase that reads the same forwards and backwards (e.g. <em>"radar"</em>, <em>"madam"</em>, <em>"racecar"</em>).</p>
        <p>In Python, string slicing makes checking palindromes remarkably clean and concise:</p>`,
        code: `def is_palindrome(word):
    # Step 1: Clean word (lowercase & strip whitespace)
    cleaned = word.strip().lower()
    
    # Step 2: Compare cleaned word with its reversed slice [::-1]
    return cleaned == cleaned[::-1]

# Test palindrome cases:
test_words = ["Radar", "Python", "madam", "Racecar", "Compiler"]

for w in test_words:
    result = "✅ Palindrome" if is_palindrome(w) else "❌ Not Palindrome"
    print(f"{w:10} -> {result}")`,
        codeTitle: 'Example 6: Reusable Palindrome Checker Function',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Step-by-Step Logic:</strong>
          <ul style="margin:8px 0 0 18px; line-height:1.7;">
            <li><code>Radar</code> is converted to lowercase <code>radar</code>.</li>
            <li>Reversed slice <code>radar[::-1]</code> produces <code>radar</code>.</li>
            <li><code>radar == radar</code> evaluates to <code>True</code>!</li>
          </ul>
        </div>`
      }
    ],
    mistake: {
      title: 'Attempting to Mutate String Characters in Place',
      text: 'Writing word[0] = "H" raises TypeError: \'str\' object does not support item assignment. Because strings are immutable, create a new string using slicing: word = "H" + word[1:].'
    },
    tryIt: {
      desc: 'Create a full name string, convert it to uppercase, count the vowels (a, e, i, o, u), and check if it is a palindrome.',
      code: `text = "racecar"

print("Original:", text)
print("Uppercase:", text.upper())
print("Reversed:", text[::-1])
print("Is Palindrome:", text == text[::-1])`
    },
    faqs: [
      {
        q: 'Why are strings in Python immutable?',
        a: 'Immutability allows strings to be hashable (usable as dictionary keys and set members), memory-efficient (via CPython string interning), and thread-safe in concurrent applications.'
      },
      {
        q: 'What is the difference between find() and index()?',
        a: 'find() returns -1 if the substring is not found, while index() raises a ValueError exception.'
      },
      {
        q: 'Can f-strings execute arbitrary Python expressions?',
        a: 'Yes! Inside {expr} in an f-string, you can call functions, perform math (f"{2+2}"), access dictionary keys, or format numbers (f"{price:,.2f}").'
      }
    ]
  },

  // =========================================================================
  // CHAPTER 11: PYTHON LISTS & COMPREHENSIONS
  // =========================================================================
  {
    num: 11,
    phaseId: 'phase3',
    phaseTitle: 'Phase 3: Strings and Collections',
    slug: '11-python-lists-and-comprehensions',
    title: 'Python Lists & Comprehensions',
    badge: '11. Lists & Comprehensions',
    subtopics: 'Creation · Indexing · CRUD · Sorting · Copying (Shallow vs Deep) · Nested Lists · List Comprehensions',
    desc: 'Master Python lists: dynamic array architecture, appending, inserting, removing, sorting, shallow vs deep copying, nested 2D matrices, and list comprehensions.',
    sections: [
      {
        title: '1. What is a List? Creation & Dynamic Array Architecture',
        body: `<p>A <strong>list (<code>list</code>)</strong> in Python is an <strong>ordered, mutable, heterogeneous collection</strong> of items enclosed in square brackets (<code>[...]</code>).</p>
        <ul>
          <li><strong>Ordered:</strong> Elements maintain the exact sequence in which they were added.</li>
          <li><strong>Mutable:</strong> You can add, replace, sort, or delete elements in place without creating a new object.</li>
          <li><strong>Heterogeneous:</strong> A single list can contain mixed data types (integers, strings, floats, booleans, and other lists).</li>
        </ul>`,
        code: `# 1. Creating empty and populated lists
empty_list = []
numbers = [10, 20, 30, 40, 50]
mixed_list = ["Balaji", 25, 99.5, True, ["Python", "JS"]]

# 2. Inspecting length and items
print("Numbers list:", numbers)
print("Total elements:", len(numbers))
print("Mixed list:", mixed_list)`,
        codeTitle: 'Example 1: Creating Lists with Mixed Data Types',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Under the Hood (CPython):</strong>
          <p style="margin-top:6px;">In CPython, a list is implemented as a <strong>dynamic array of pointer references</strong>. When the list grows beyond its current capacity, CPython automatically reallocates a larger memory buffer with amortized $O(1)$ append time.</p>
        </div>`
      },
      {
        title: '2. Adding Items: append(), insert(), extend()',
        body: `<p>Python provides three primary methods to insert new data into a list:</p>
        <ul>
          <li><code>list.append(x)</code>: Adds item <code>x</code> to the very end of the list in fast $O(1)$ time.</li>
          <li><code>list.insert(index, x)</code>: Inserts item <code>x</code> at a specific index, shifting existing items to the right ($O(N)$ time).</li>
          <li><code>list.extend(iterable)</code>: Unpacks and appends all items from another list or iterable to the end.</li>
        </ul>`,
        code: `fruits = ["Apple", "Banana"]
print("Initial list:", fruits)

# 1. append() - Adds to the end
fruits.append("Mango")
print("After append('Mango'):", fruits)

# 2. insert() - Inserts at index 1
fruits.insert(1, "Orange")
print("After insert(1, 'Orange'):", fruits)

# 3. extend() - Merges multiple items from another list
more_fruits = ["Grapes", "Pineapple"]
fruits.extend(more_fruits)
print("After extend():", fruits)`,
        codeTitle: 'Example 2: Adding Elements with append, insert, extend',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 append() vs extend() Trap:</strong>
          <p style="margin-top:6px;">If you call <code>fruits.append(["Grapes", "Pineapple"])</code>, it adds the whole list as a single nested sub-list element! Use <code>extend()</code> when you want to unpack and add individual elements.</p>
        </div>`
      },
      {
        title: '3. Updating & Removing Items: pop(), remove(), del, clear()',
        body: `<p>Modify or remove items from a list using index reassignment or deletion methods:</p>
        <ul>
          <li><code>list[index] = new_val</code>: Replaces the value at specified index.</li>
          <li><code>list.remove(val)</code>: Searches and removes the <strong>first occurrence</strong> of <code>val</code> (raises <code>ValueError</code> if missing).</li>
          <li><code>list.pop(index)</code>: Removes and <strong>returns</strong> the item at <code>index</code> (default removes last item).</li>
          <li><code>del list[index]</code>: Deletes item at index or a slice of items.</li>
          <li><code>list.clear()</code>: Empties all items from the list.</li>
        </ul>`,
        code: `tasks = ["Email client", "Write code", "Bug fix", "Deploy app"]
print("Initial tasks:", tasks)

# 1. Update task at index 0
tasks[0] = "Check Slack messages"
print("After update tasks[0]:", tasks)

# 2. remove() by value
tasks.remove("Bug fix")
print("After remove('Bug fix'):", tasks)

# 3. pop() removes and returns last item
completed_task = tasks.pop()
print(f"Popped task: '{completed_task}' | Remaining: {tasks}")

# 4. del keyword for specific index
del tasks[0]
print("After del tasks[0]:", tasks)`,
        codeTitle: 'Example 3: Updating and Removing Elements',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Which removal method to use?</strong>
          <ul style="margin:8px 0 0 18px; line-height:1.7;">
            <li>Use <code>.remove(val)</code> when you know the <strong>value</strong>.</li>
            <li>Use <code>.pop(i)</code> when you know the <strong>index</strong> and need the returned value.</li>
            <li>Use <code>del list[start:stop]</code> to delete a range of items.</li>
          </ul>
        </div>`
      },
      {
        title: '4. Sorting Lists: sort() vs sorted()',
        body: `<p>Python provides two ways to sort collections using the highly optimized <strong>Timsort algorithm</strong> ($O(N \\log N)$ time complexity):</p>
        <ul>
          <li><code>list.sort()</code>: Sorts the list <strong>in-place</strong> (modifies original list, returns <code>None</code>).</li>
          <li><code>sorted(iterable)</code>: Built-in function that returns a <strong>new sorted list</strong> without modifying the original!</li>
        </ul>`,
        code: `scores = [45, 99, 12, 78, 63, 85]

# 1. sorted() returns a NEW sorted list:
ascending_scores = sorted(scores)
descending_scores = sorted(scores, reverse=True)

print("Original scores list:", scores)
print("New sorted list (ascending):", ascending_scores)
print("New sorted list (descending):", descending_scores)

# 2. .sort() mutates the list IN PLACE:
scores.sort()
print("\\nOriginal scores after .sort():", scores)`,
        codeTitle: 'Example 4: Sorting In-Place (sort) vs Non-Destructive (sorted)',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Common Beginner Bug:</strong>
          <p style="margin-top:6px;">Never write <code>scores = scores.sort()</code>! Because <code>.sort()</code> mutates in-place, it returns <code>None</code>, which will overwrite your variable with <code>None</code>.</p>
        </div>`
      },
      {
        title: '5. Copying Lists: Shallow Copy vs Reference Alias Trap',
        body: `<p>When you write <code>list_b = list_a</code>, Python does <strong>NOT</strong> copy the list. It creates a reference alias pointing to the exact same memory address! Modifying <code>list_b</code> will unintentionally corrupt <code>list_a</code>.</p>
        <p>To make an independent clone, create a <strong>shallow copy</strong> with <code>.copy()</code> or <code>[:]</code>:</p>`,
        code: `# ❌ REFERENCE ALIAS BUG:
original = [1, 2, 3]
alias = original
alias.append(99)
print("Reference Alias Demo:")
print("Original:", original)  # [1, 2, 3, 99] (CORRUPTED!)
print("Alias:   ", alias)

# ✅ INDEPENDENT SHALLOW COPY:
source = [10, 20, 30]
cloned = source.copy()  # or source[:]
cloned.append(999)

print("\\nIndependent Copy Demo:")
print("Source:", source)  # [10, 20, 30] (Safe and untouched!)
print("Cloned:", cloned)  # [10, 20, 30, 999]`,
        codeTitle: 'Example 5: List Copying and Reference Isolation',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Deep Copy Note:</strong>
          <p style="margin-top:6px;">If your list contains nested sub-lists (e.g. <code>[[1, 2], [3, 4]]</code>), use <code>import copy; copy.deepcopy(matrix)</code> to clone nested child objects recursively.</p>
        </div>`
      },
      {
        title: '6. Python List Comprehensions ([expr for x in iterable if cond])',
        body: `<p><strong>List comprehensions</strong> offer a concise, readable, and faster syntax to create new lists by transforming and filtering existing sequences in a single line.</p>
        <div class="diagram-box">Syntax:  [ expression  for item in iterable  if condition ]</div>`,
        code: `# Traditional 5-line for-loop approach:
squares_traditional = []
for x in range(1, 11):
    if x % 2 == 0:
        squares_traditional.append(x ** 2)

# ✅ Modern 1-line List Comprehension:
squares_comprehension = [x ** 2 for x in range(1, 11) if x % 2 == 0]

print("Traditional Loop Result:", squares_traditional)
print("Comprehension Result:   ", squares_comprehension)

# Filtering names with length >= 5:
names = ["Alex", "Balaji", "Chloe", "David", "Elizabeth"]
long_names = [n.upper() for n in names if len(n) >= 6]
print("Uppercase Long Names (len >= 6):", long_names)`,
        codeTitle: 'Example 6: List Comprehensions Filtering & Transformation',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Performance Advantage:</strong>
          <p style="margin-top:6px;">List comprehensions execute at C-speed in the Python Virtual Machine (PVM) without the overhead of repeated <code>.append()</code> attribute lookups.</p>
        </div>`
      }
    ],
    mistake: {
      title: 'Modifying a List While Looping Over It',
      text: 'Never delete items from a list while iterating over it (for x in lst: if x==2: lst.remove(x)). Deleting elements shifts remaining indices left, skipping elements! Instead, iterate over a copy: for x in lst.copy(): or use a list comprehension.'
    },
    tryIt: {
      desc: 'Given a list of numbers from 1 to 20, create a new list containing only the cubes (x**3) of odd numbers using a list comprehension.',
      code: `numbers = list(range(1, 21))

# List comprehension: cubes of odd numbers
odd_cubes = [x ** 3 for x in numbers if x % 2 != 0]

print("Numbers 1-20:", numbers)
print("Cubes of Odd Numbers:", odd_cubes)`
    },
    faqs: [
      {
        q: 'What is the time complexity of append() vs insert(0, x)?',
        a: 'append() is O(1) constant time because it places the item at the end. insert(0, x) is O(N) linear time because all existing N elements must be shifted in memory.'
      },
      {
        q: 'How do I remove all occurrences of an item from a list?',
        a: 'Use a list comprehension: cleaned = [x for x in my_list if x != target_val] or a while loop: while target in my_list: my_list.remove(target).'
      },
      {
        q: 'Can a list contain another list inside it?',
        a: 'Yes! Python lists can be nested to any depth, enabling 2D matrices (grid = [[1, 2], [3, 4]]), 3D tensors, and tree structures.'
      }
    ]
  },

  // =========================================================================
  // CHAPTER 12: PYTHON TUPLES & IMMUTABILITY
  // =========================================================================
  {
    num: 12,
    phaseId: 'phase3',
    phaseTitle: 'Phase 3: Strings and Collections',
    slug: '12-python-tuples-and-immutability',
    title: 'Python Tuples & Unpacking',
    badge: '12. Tuples & Unpacking',
    subtopics: 'Creation · Single-Element Trap · Immutability · Unpacking (*rest) · Methods · Tuple vs List Benchmarks',
    desc: 'Master Python tuples: immutable sequence semantics, the single-element comma rule, tuple packing and extended star unpacking (*rest), and performance benchmarks vs lists.',
    sections: [
      {
        title: '1. What is a Tuple? Creation & The Single-Element Comma Trap',
        body: `<p>A <strong>tuple (<code>tuple</code>)</strong> is an <strong>ordered, immutable collection</strong> enclosed in parentheses (<code>(...)</code>).</p>
        <p><strong>The Single-Element Comma Rule:</strong> In Python, parentheses are also used for mathematical grouping. Therefore, writing <code>(50)</code> creates an integer <code>50</code>, NOT a tuple! To create a single-element tuple, a trailing comma is <strong>strictly mandatory</strong>: <code>(50,)</code>.</p>`,
        code: `# 1. Creating multi-element tuples
point = (10, 20)
rgb_color = (255, 128, 0)

# 2. The Single-Element Comma Trap:
not_a_tuple = (50)    # int!
is_a_tuple = (50,)    # tuple!

print("point:", point, "| Type:", type(point).__name__)
print("not_a_tuple:", not_a_tuple, "| Type:", type(not_a_tuple).__name__)
print("is_a_tuple: ", is_a_tuple, "| Type:", type(is_a_tuple).__name__)`,
        codeTitle: 'Example 1: Creating Tuples and the Single-Element Comma Rule',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Syntax Rule:</strong>
          <p style="margin-top:6px;">It is the <strong>comma</strong> that defines a tuple in Python, not just the parentheses.</p>
        </div>`
      },
      {
        title: '2. Tuple Immutability & Data Integrity',
        body: `<p>Tuples are <strong>immutable</strong>. Once constructed in memory, elements cannot be replaced, added, or deleted. Attempting <code>t[0] = 99</code> raises a fatal <code>TypeError</code>:</p>`,
        code: `coordinates = (17.3850, 78.4867) # Hyderabad GPS coordinates

print("Latitude:", coordinates[0])
print("Longitude:", coordinates[1])

# Attempting to modify coordinates will raise TypeError:
try:
    coordinates[0] = 18.0000
except TypeError as err:
    print("\\n❌ Modification Prevented:", err)`,
        codeTitle: 'Example 2: Tuple Immutability Protection',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Why use tuples over lists?</strong>
          <ul style="margin:8px 0 0 18px; line-height:1.7;">
            <li><strong>Data Protection:</strong> Guarantees that configuration constants (like database credentials, screen dimensions, or GPS coordinates) are write-protected.</li>
            <li><strong>Hashability:</strong> Tuples can serve as keys in dictionaries and elements in sets (lists cannot!).</li>
          </ul>
        </div>`
      },
      {
        title: '3. Tuple Packing & Extended Star Unpacking (*rest)',
        body: `<p><strong>Tuple Unpacking</strong> extracts items from a tuple directly into variables in a single step. Extended star unpacking (<code>*rest</code>) captures any remaining items into a list:</p>`,
        code: `# 1. Standard Tuple Unpacking:
user_data = ("Balaji", "Hyderabad", "India")
name, city, country = user_data

print(f"Name: {name}, City: {city}, Country: {country}")

# 2. Extended Star Unpacking (*rest):
scores = (98, 92, 85, 78, 64)
first, second, *remaining = scores

print(f"\\nFirst Place: {first}")
print(f"Second Place: {second}")
print(f"Remaining Scores (List): {remaining}")`,
        codeTitle: 'Example 3: Tuple Packing and Star Unpacking (*rest)',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Star Unpacking Versatility:</strong>
          <p style="margin-top:6px;">You can place <code>*rest</code> anywhere: <code>first, *middle, last = my_tuple</code> cleanly isolates the head and tail while grouping everything in between.</p>
        </div>`
      },
      {
        title: '4. Tuple Methods: count() and index()',
        body: `<p>Because tuples cannot be mutated, they have exactly two built-in methods:</p>
        <ul>
          <li><code>t.count(x)</code>: Returns the number of occurrences of <code>x</code>.</li>
          <li><code>t.index(x)</code>: Returns the index of the first occurrence of <code>x</code>.</li>
        </ul>`,
        code: `grades = ("A", "B", "A", "C", "A", "B")

# Count how many students scored 'A'
count_a = grades.count("A")
print("Total 'A' grades:", count_a)

# Find first position of 'C'
first_c_pos = grades.index("C")
print("First 'C' grade at index:", first_c_pos)`,
        codeTitle: 'Example 4: Tuple Methods (count & index)',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Method Summary:</strong>
          <p style="margin-top:6px;">Both methods run efficiently across immutable sequences without altering underlying memory.</p>
        </div>`
      }
    ],
    mistake: {
      title: 'Forgetting the Trailing Comma in Single-Element Tuples',
      text: 'Writing x = (10) creates an integer 10. To create a 1-element tuple, write x = (10,). Without the comma, Python treats parentheses as mathematical grouping.'
    },
    tryIt: {
      desc: 'Create a tuple of 5 student marks. Unpack the highest mark, lowest mark, and group the middle marks using star unpacking.',
      code: `scores = (95, 88, 82, 79, 65)

highest, *middle, lowest = scores

print("Highest Score:", highest)
print("Middle Scores:", middle)
print("Lowest Score:", lowest)`
    },
    faqs: [
      {
        q: 'Why are tuples more memory-efficient than lists?',
        a: 'Lists allocate extra buffer space to accommodate future append() operations. Tuples are fixed-size and allocate the exact required memory bytes with zero overhead.'
      },
      {
        q: 'Can a tuple contain a mutable object like a list?',
        a: 'Yes! A tuple can hold a list: t = (1, [2, 3]). While you cannot reassign t[1] to a new object, you can mutate the list in place (t[1].append(4) is valid!).'
      },
      {
        q: 'When should I use a Tuple instead of a List?',
        a: 'Use tuples for heterogeneous records with fixed schema (e.g. database rows, (x, y) coordinates, RGB colors) where values must not change. Use lists for homogeneous collections of dynamic size.'
      }
    ]
  },

  // =========================================================================
  // CHAPTER 13: PYTHON DICTIONARIES DEEP DIVE
  // =========================================================================
  {
    num: 13,
    phaseId: 'phase3',
    phaseTitle: 'Phase 3: Strings and Collections',
    slug: '13-python-dictionaries-deep-dive',
    title: 'Python Dictionaries Deep Dive',
    badge: '13. Dictionaries Deep Dive',
    subtopics: 'Key-Value Pairs · Hash Table Internals · CRUD · get() Fallback · Looping · Dict Comprehensions',
    desc: 'Master Python dictionaries: hash table architecture, key-value mappings, safe access with get(), CRUD operations, looping (.items()), and dictionary comprehensions.',
    sections: [
      {
        title: '1. What is a Dictionary? Key-Value Pair Architecture',
        body: `<p>A <strong>dictionary (<code>dict</code>)</strong> is an <strong>unordered (ordered since Python 3.7+), mutable collection of key-value pairs</strong> enclosed in curly braces (<code>{key: value}</code>).</p>
        <ul>
          <li><strong>Keys must be Unique & Hashable:</strong> Keys must be immutable types (strings, numbers, tuples).</li>
          <li><strong>Values can be Any Type:</strong> Lists, numbers, strings, or other nested dictionaries.</li>
          <li><strong>Instant $O(1)$ Lookup:</strong> Implemented as a high-performance hash table in CPython.</li>
        </ul>`,
        code: `# Creating a dictionary representing a developer profile:
developer = {
    "name": "Balaji",
    "role": "Python Backend Engineer",
    "experience_years": 4,
    "skills": ["Python", "FastAPI", "PostgreSQL", "Docker"],
    "is_active": True
}

# Accessing dictionary values:
print("Developer Name:", developer["name"])
print("Role:", developer["role"])
print("Primary Skills:", developer["skills"])`,
        codeTitle: 'Example 1: Creating and Accessing Dictionaries',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Hash Table Magic:</strong>
          <p style="margin-top:6px;">When you access <code>developer["name"]</code>, Python computes <code>hash("name")</code> and jumps directly to that memory slot in instantaneous $O(1)$ constant time.</p>
        </div>`
      },
      {
        title: '2. Safe Access: Square Brackets [] vs .get(key, default)',
        body: `<p>Accessing a non-existent key with square brackets (<code>dict["salary"]</code>) causes a fatal <code>KeyError</code> crash. The <code>.get()</code> method returns <code>None</code> or a custom fallback safely:</p>`,
        code: `user = {"id": 101, "username": "balaji_dev"}

# 1. Accessing existing key safely
print("User ID:", user.get("id"))

# 2. Accessing non-existent key with default fallback value
role = user.get("role", "Standard Member")
salary = user.get("salary", 0.0)

print("User Role:", role)      # "Standard Member"
print("User Salary: Rs.", salary) # 0.0`,
        codeTitle: 'Example 2: Safe Key Access with .get()',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Defensive Coding:</strong>
          <p style="margin-top:6px;">Always use <code>.get(key, fallback)</code> when processing external JSON data from APIs where certain fields may be optional or missing.</p>
        </div>`
      },
      {
        title: '3. Modifying Dictionaries (Adding, Updating, Deleting)',
        body: `<p>Modify dictionary contents dynamically using assignment and removal methods:</p>
        <ul>
          <li><code>dict[key] = new_value</code>: Adds key if missing, or updates existing value.</li>
          <li><code>dict.update({...})</code>: Merges multiple key-value pairs at once.</li>
          <li><code>dict.pop(key)</code>: Removes key and returns its value.</li>
          <li><code>del dict[key]</code>: Deletes key from memory.</li>
        </ul>`,
        code: `product = {"id": 501, "title": "Wireless Mouse", "price": 499}
print("Initial Product:", product)

# 1. Adding a new key-value pair
product["brand"] = "Logitech"

# 2. Updating an existing key
product["price"] = 449

# 3. Merging multiple fields with update()
product.update({"rating": 4.8, "in_stock": True})
print("After update:", product)

# 4. Removing a key with pop()
removed_rating = product.pop("rating")
print(f"Popped rating: {removed_rating} | Remaining keys: {list(product.keys())}")`,
        codeTitle: 'Example 3: Adding, Updating, and Removing Dictionary Keys',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Mutation Note:</strong>
          <p style="margin-top:6px;">Dictionary keys are case-sensitive: <code>"Price"</code> and <code>"price"</code> are treated as two separate distinct keys!</p>
        </div>`
      },
      {
        title: '4. Looping Over Dictionaries (.keys(), .values(), .items())',
        body: `<p>Iterate through dictionary contents cleanly using helper methods:</p>
        <ul>
          <li><code>dict.keys()</code>: Returns an iterable view of all keys.</li>
          <li><code>dict.values()</code>: Returns an iterable view of all values.</li>
          <li><code>dict.items()</code>: Returns <code>(key, value)</code> pairs for clean loop unpacking.</li>
        </ul>`,
        code: `student_marks = {"Math": 95, "Physics": 88, "Chemistry": 92, "English": 85}

print("--- Subject & Marks Report ---")
for subject, marks in student_marks.items():
    print(f"• {subject:10}: {marks}/100")

# Calculate total marks from values:
total = sum(student_marks.values())
average = total / len(student_marks)
print(f"\\nTotal Marks: {total} | Average: {average:.1f}%")`,
        codeTitle: 'Example 4: Looping Through Dictionaries with .items()',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Best Practice:</strong>
          <p style="margin-top:6px;">Always iterate with <code>for key, val in d.items():</code> rather than manually calling <code>d[key]</code> inside the loop.</p>
        </div>`
      },
      {
        title: '5. Dictionary Comprehensions ({k: v for ... in ...})',
        body: `<p>Construct and filter dictionaries in a single readable line using <strong>Dictionary Comprehensions</strong>:</p>`,
        code: `# 1. Square numbers from 1 to 5:
squares_dict = {x: x ** 2 for x in range(1, 6)}
print("Squares Dict:", squares_dict)

# 2. Filter passing students (marks >= 50):
raw_marks = {"Alex": 45, "Balaji": 95, "Chloe": 78, "David": 35}
passed_students = {name: score for name, score in raw_marks.items() if score >= 50}
print("Passed Students (marks >= 50):", passed_students)`,
        codeTitle: 'Example 5: Dictionary Comprehensions',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Comprehension Power:</strong>
          <p style="margin-top:6px;">Dictionary comprehensions allow you to transform and filter data in a single step without verbose multi-line loops.</p>
        </div>`
      }
    ],
    mistake: {
      title: 'Using Unhashable Mutable Objects as Dictionary Keys',
      text: 'Dictionary keys MUST be immutable and hashable. Using a list as a key (e.g. {[1, 2]: "data"}) raises TypeError: unhashable type: \'list\'. Use a tuple instead: {(1, 2): "data"}.'
    },
    tryIt: {
      desc: 'Create a dictionary of items in a shopping cart with their prices. Calculate the total bill and print items with prices greater than Rs. 100.',
      code: `cart = {"Keyboard": 450, "Notebook": 80, "Mouse": 250, "Pen": 20}

total_bill = sum(cart.values())
expensive_items = {k: v for k, v in cart.items() if v > 100}

print("Shopping Cart:", cart)
print("Total Bill: Rs.", total_bill)
print("Items > Rs. 100:", expensive_items)`
    },
    faqs: [
      {
        q: 'Are Python dictionaries ordered?',
        a: 'Yes. Since Python 3.7+, dictionaries officially preserve the exact insertion order of keys.'
      },
      {
        q: 'What is the time complexity of looking up a dictionary key?',
        a: 'Dictionary lookup runs in instantaneous O(1) average constant time due to hash table indexing.'
      },
      {
        q: 'Can a dictionary value be another dictionary?',
        a: 'Yes! Nested dictionaries are standard for modeling complex structured data like JSON documents.'
      }
    ]
  },

  // =========================================================================
  // CHAPTER 14: PYTHON SETS & MATHEMATICAL OPERATIONS
  // =========================================================================
  {
    num: 14,
    phaseId: 'phase3',
    phaseTitle: 'Phase 3: Strings and Collections',
    slug: '14-python-sets-and-operations',
    title: 'Python Sets & Mathematical Operations',
    badge: '14. Sets & Operations',
    subtopics: 'Unordered Unique Elements · Hash Set Internals · Adding/Removing · Union · Intersection · Difference · Symmetric Diff',
    desc: 'Master Python sets: deduplication, hash set internals, adding/removing items, mathematical set operations (Union, Intersection, Difference, Symmetric Difference), and Set vs List performance.',
    sections: [
      {
        title: '1. What is a Set? Uniqueness & Instant Deduplication',
        body: `<p>A <strong>set (<code>set</code>)</strong> in Python is an <strong>unordered collection of unique, immutable elements</strong> enclosed in curly braces (<code>{...}</code>).</p>
        <ul>
          <li><strong>No Duplicates Allowed:</strong> Duplicate elements are automatically discarded upon insertion.</li>
          <li><strong>Unordered:</strong> Elements do not maintain positional index order (you cannot access <code>s[0]</code>).</li>
          <li><strong>Empty Set Syntax:</strong> To create an empty set, you MUST write <code>s = set()</code>. Writing <code>{}</code> creates an empty dictionary!</li>
        </ul>`,
        code: `# 1. Creating a set with duplicate values (duplicates automatically removed!)
numbers_set = {1, 2, 2, 3, 4, 4, 5}
print("Numbers Set (Unique):", numbers_set)

# 2. Instant list deduplication in ONE step:
raw_emails = ["alex@test.com", "balaji@test.com", "alex@test.com", "chloe@test.com"]
unique_emails = list(set(raw_emails))
print("\\nOriginal emails count:", len(raw_emails))
print("Unique emails list:   ", unique_emails)

# 3. Empty set vs Empty dict:
empty_s = set()  # Set!
empty_d = {}     # Dict!
print("\\nType of set():", type(empty_s).__name__)
print("Type of {}:   ", type(empty_d).__name__)`,
        codeTitle: 'Example 1: Creating Sets and Deduplicating Lists',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Performance Advantage:</strong>
          <p style="margin-top:6px;">Deduplicating a 100,000-item list with <code>list(set(items))</code> executes in linear $O(N)$ time instead of slow $O(N^2)$ nested loops.</p>
        </div>`
      },
      {
        title: '2. Modifying Sets: add(), update(), remove() vs discard()',
        body: `<p>Add and remove elements dynamically:</p>
        <ul>
          <li><code>set.add(elem)</code>: Adds a single element.</li>
          <li><code>set.update(iterable)</code>: Merges multiple elements from a list or set.</li>
          <li><code>set.remove(elem)</code>: Removes element; raises <code>KeyError</code> if missing!</li>
          <li><code>set.discard(elem)</code>: <strong>Safe removal</strong> — removes element if present without raising an error if missing!</li>
        </ul>`,
        code: `skills = {"Python", "Git"}
print("Initial skills:", skills)

# 1. add() a single item
skills.add("Docker")

# 2. update() with a list of multiple items
skills.update(["FastAPI", "PostgreSQL"])
print("After adding skills:", skills)

# 3. discard() vs remove()
skills.discard("Java") # Safe! Does not crash even though 'Java' is not in set
skills.remove("Git")   # Removes 'Git' cleanly
print("After removals:", skills)`,
        codeTitle: 'Example 2: Adding and Removing Elements from Sets',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Pro Tip:</strong>
          <p style="margin-top:6px;">Always prefer <code>.discard()</code> over <code>.remove()</code> when deleting elements unless you explicitly want your program to crash if the element is missing.</p>
        </div>`
      },
      {
        title: '3. Mathematical Set Operations (Union, Intersection, Difference, Symmetric Diff)',
        body: `<p>Python sets implement full mathematical Venn diagram operations using operator symbols or method names:</p>
        <div class="diagram-box">┌─────────────────────────┬──────────┬──────────────────────┬───────────────────────────────┐
│ Set Operation           │ Operator │ Method Equivalent    │ Description                   │
├─────────────────────────┼──────────┼──────────────────────┼───────────────────────────────┤
│ Union                   │ A | B    │ A.union(B)           │ All items in A OR B           │
│ Intersection            │ A & B    │ A.intersection(B)    │ Common items in BOTH A AND B  │
│ Difference              │ A - B    │ A.difference(B)      │ Items in A that are NOT in B  │
│ Symmetric Difference    │ A ^ B    │ A.symmetric_diff(B)  │ Items in EITHER A or B, not both│
└─────────────────────────┴──────────┴──────────────────────┴───────────────────────────────┘</div>`,
        code: `dev_frontend = {"HTML", "CSS", "JavaScript", "React", "Git"}
dev_backend  = {"Python", "FastAPI", "PostgreSQL", "React", "Git"}

# 1. Union (|): All skills across both developers
all_skills = dev_frontend | dev_backend
print("1. Union (All unique skills):", all_skills)

# 2. Intersection (&): Skills shared by BOTH developers
shared_skills = dev_frontend & dev_backend
print("2. Intersection (Shared skills):", shared_skills)

# 3. Difference (-): Frontend skills NOT known by Backend developer
frontend_only = dev_frontend - dev_backend
print("3. Difference (Frontend only):", frontend_only)

# 4. Symmetric Difference (^): Skills unique to EITHER developer (excluding shared)
unique_to_each = dev_frontend ^ dev_backend
print("4. Symmetric Diff (Non-shared):", unique_to_each)`,
        codeTitle: 'Example 3: Mathematical Set Operations in Action',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Venn Diagram Breakdown:</strong>
          <ul style="margin:8px 0 0 18px; line-height:1.7;">
            <li>Shared skills: <code>{'React', 'Git'}</code>.</li>
            <li>Frontend only: <code>{'HTML', 'CSS', 'JavaScript'}</code>.</li>
            <li>Union: <code>{'HTML', 'CSS', 'JavaScript', 'React', 'Git', 'Python', 'FastAPI', 'PostgreSQL'}</code>.</li>
          </ul>
        </div>`
      },
      {
        title: '4. Set Relationships: Subsets, Supersets & Disjoint Sets',
        body: `<p>Check relationships between multiple groups of data:</p>
        <ul>
          <li><code>A.issubset(B)</code> (or <code>A <= B</code>): Returns <code>True</code> if all elements of A are in B.</li>
          <li><code>A.issuperset(B)</code> (or <code>A >= B</code>): Returns <code>True</code> if A contains all elements of B.</li>
          <li><code>A.isdisjoint(B)</code>: Returns <code>True</code> if A and B have <strong>zero elements in common</strong>.</li>
        </ul>`,
        code: `admin_permissions = {"read", "write", "delete", "deploy"}
guest_permissions = {"read"}
billing_permissions = {"view_invoice", "pay_bill"}

print("Is guest a subset of admin?", guest_permissions.issubset(admin_permissions))   # True
print("Is admin a superset of guest?", admin_permissions.issuperset(guest_permissions)) # True
print("Are admin and billing disjoint (no overlap)?", admin_permissions.isdisjoint(billing_permissions)) # True`,
        codeTitle: 'Example 4: Testing Subsets, Supersets, and Disjoint Sets',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Practical Security Use Case:</strong>
          <p style="margin-top:6px;">Role-Based Access Control (RBAC) in web servers uses <code>required_roles.issubset(user_roles)</code> to grant or deny route access instantly.</p>
        </div>`
      }
    ],
    mistake: {
      title: 'Attempting to Store Mutable Objects in a Set',
      text: 'Set elements MUST be hashable and immutable. Adding a list to a set (e.g. {1, [2, 3]}) raises TypeError: unhashable type: \'list\'. Store tuples instead: {1, (2, 3)}.'
    },
    tryIt: {
      desc: 'Find the common elements (Intersection) and unique elements (Symmetric Difference) between two lists of lottery numbers.',
      code: `ticket_a = {7, 14, 21, 28, 35}
ticket_b = {14, 28, 42, 49, 56}

print("Ticket A:", ticket_a)
print("Ticket B:", ticket_b)
print("Matched Winning Numbers (Intersection):", ticket_a & ticket_b)
print("Unique to One Ticket (Symmetric Diff):", ticket_a ^ ticket_b)`
    },
    faqs: [
      {
        q: 'Why are sets faster than lists for checking membership (in)?',
        a: 'Checking "x in list" requires linear O(N) scanning through all elements. Checking "x in set" computes the hash of x and jumps directly to that memory bucket in instantaneous O(1) constant time.'
      },
      {
        q: 'What is a frozenset in Python?',
        a: 'A frozenset is an immutable version of a set. Once created, elements cannot be added or removed. Because it is immutable and hashable, a frozenset can be stored inside another set or used as a dictionary key.'
      },
      {
        q: 'Can sets contain duplicate items?',
        a: 'No. Sets mathematically enforce element uniqueness. Any duplicate value added to a set is silently discarded.'
      }
    ]
  }
];
