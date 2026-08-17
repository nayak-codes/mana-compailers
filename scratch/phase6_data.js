// Phase 6: Exception and File Handling Data
module.exports = [
  // =========================================================================
  // CHAPTER 25: PYTHON EXCEPTIONS & ERROR HANDLING
  // =========================================================================
  {
    num: 25,
    phaseId: 'phase6',
    phaseTitle: 'Phase 6: Exception and File Handling',
    slug: '25-python-exceptions-and-error-handling',
    title: 'Python Exceptions & Error Handling',
    badge: '25. Exception Handling',
    subtopics: 'Errors vs Exceptions · try-except-else-finally · Multiple Exceptions · raise · Custom Exceptions · Hierarchy · Useful Messages',
    desc: 'Master robust defensive programming in Python: understanding syntax errors vs runtime exceptions, the complete 4-clause try-except-else-finally lifecycle, exception hierarchy, custom exception classes, and writing actionable error messages.',
    sections: [
      {
        title: '1. Syntax Errors vs Runtime Exceptions & The Exception Hierarchy',
        body: `<p>In Python, defects in code fall into two distinct categories:</p>
        <ol>
          <li><strong>Syntax Errors (Compile-Time):</strong> Occur during the parsing stage before the program begins executing. If your code contains a missing colon (<code>if x == 5</code>) or mismatched parenthesis, Python immediately halts with a <code>SyntaxError</code> or <code>IndentationError</code>. <strong>Syntax errors cannot be caught with try-except</strong>.</li>
          <li><strong>Exceptions (Runtime):</strong> Occur while a syntactically valid program is actively executing. For example, dividing by zero (<code>ZeroDivisionError</code>), accessing a missing dictionary key (<code>KeyError</code>), or opening a non-existent file (<code>FileNotFoundError</code>).</li>
        </ol>
        <p><strong>The Python Exception Class Hierarchy:</strong> All built-in exceptions in Python form an inheritance tree rooted at <code>BaseException</code>:</p>
        <div class="diagram-box">┌────────────────────────────────────────────────────────┐
│  BaseException                                         │
│  ├── SystemExit, KeyboardInterrupt (Ctrl+C), GeneratorExit│
│  └── Exception (The root for all application errors)   │
│      ├── ArithmeticError (ZeroDivisionError, Overflow)  │
│      ├── LookupError (IndexError, KeyError)            │
│      ├── TypeError, ValueError, NameError               │
│      └── OSError (FileNotFoundError, PermissionError)   │
└────────────────────────────────────────────────────────┘</div>
        <div class="callout" style="margin:16px 0;">
          <strong style="color:#ef4444;">⚠️ Rule: Never Catch BaseException Directly:</strong><br>
          Always inherit your custom exceptions from <code>Exception</code> (not <code>BaseException</code>). Catching <code>BaseException</code> will unintentionally block user keyboard interrupts (<code>Ctrl+C</code> / <code>KeyboardInterrupt</code>) and graceful system shutdowns.
        </div>`,
        code: `# Inspecting the Exception Class Hierarchy at runtime:
print("Is ZeroDivisionError an ArithmeticError?", issubclass(ZeroDivisionError, ArithmeticError))
print("Is KeyError a LookupError?", issubclass(KeyError, LookupError))
print("Is FileNotFoundError an OSError?", issubclass(FileNotFoundError, OSError))
print("Is ArithmeticError an Exception?", issubclass(ArithmeticError, Exception))`,
        codeTitle: 'Example 1: Inspecting Python Built-in Exception Hierarchy',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Inheritance Polymorphism:</strong>
          <p style="margin-top:6px;">Because <code>KeyError</code> inherits from <code>LookupError</code>, catching <code>except LookupError:</code> will catch both <code>KeyError</code> and <code>IndexError</code> with a single handler!</p>
        </div>`
      },
      {
        title: '2. The 4-Clause Lifecycle: try, except, else, finally',
        body: `<p>A complete, professional error handling block in Python can utilize up to <strong>four distinct clauses</strong>:</p>
        <ul>
          <li><strong><code>try</code>:</strong> Encloses the risky code that might raise an exception.</li>
          <li><strong><code>except ExceptionType as err</code>:</strong> Executes ONLY if a matching exception occurs inside the try block.</li>
          <li><strong><code>else</code>:</strong> Executes ONLY if the try block completed <strong>successfully with ZERO exceptions</strong>. (Keeps try blocks minimal!).</li>
          <li><strong><code>finally</code>:</strong> Executes <strong>unconditionally 100% of the time</strong>, regardless of whether an exception occurred, was caught, or if a <code>return</code> statement was encountered. Used for critical cleanup (closing database connections, releasing file locks).</li>
        </ul>
        <div class="diagram-box">┌───────────────┐
│   try block   │
└───────┬───────┘
        │
   Exception? ──▶ YES ──▶ ┌────────────────┐
        │                 │  except block  │
        NO                └────────┬───────┘
        │                          │
        ▼                          │
┌───────────────┐                  │
│  else block   │                  │
└───────┬───────┘                  │
        │                          │
        ▼                          ▼
┌──────────────────────────────────────────┐
│              finally block               │ (Guaranteed 100% Execution)
└──────────────────────────────────────────┘</div>`,
        code: `def safe_divide_engine(a, b):
    print(f"\\n--- Attempting: {a} / {b} ---")
    try:
        # Step 1: Risky calculation
        result = a / b
    except ZeroDivisionError as err:
        # Step 2: Handles zero division error
        print(f"❌ Handled Error: Cannot divide by zero! ({err})")
        return None
    except TypeError as err:
        # Step 2: Handles invalid data types
        print(f"❌ Handled Error: Both operands must be numbers! ({err})")
        return None
    else:
        # Step 3: Runs ONLY if division was successful
        print(f"✅ Calculation Successful! Result = {result}")
        return result
    finally:
        # Step 4: Runs ALWAYS for resource cleanup / logging
        print("🔒 [Cleanup] safe_divide_engine execution cycle finished.")

# Test all branches:
safe_divide_engine(100, 4)   # Success (try -> else -> finally)
safe_divide_engine(50, 0)    # Zero Division (try -> except -> finally)
safe_divide_engine(10, "2")  # Type Error (try -> except -> finally)`,
        codeTitle: 'Example 2: The Complete 4-Clause try-except-else-finally Flow',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Step-by-Step Flow:</strong>
          <ul style="margin:8px 0 0 18px; line-height:1.7;">
            <li>In <code>safe_divide_engine(100, 4)</code>: <code>try</code> succeeds, <code>else</code> prints the result, and <code>finally</code> executes cleanup.</li>
            <li>In <code>safe_divide_engine(50, 0)</code>: <code>ZeroDivisionError</code> triggers, <code>except</code> handles it, <code>else</code> is skipped, and <code>finally</code> executes before returning <code>None</code>.</li>
          </ul>
        </div>`
      },
      {
        title: '3. Handling Multiple Specific Exceptions & Grouping',
        body: `<p>Never use a bare <code>except:</code> or generic <code>except Exception:</code> unless logging at the top-level boundary. Catching specific exceptions prevents masking unrelated programming bugs.</p>
        <p>You can define multiple dedicated <code>except</code> blocks, or group related exceptions into a single tuple <code>except (ValueError, TypeError) as err:</code>:</p>`,
        code: `def process_user_record(data_dict, key, divisor):
    try:
        raw_val = data_dict[key]          # May raise KeyError
        parsed_num = float(raw_val)       # May raise ValueError
        computed = 1000 / parsed_num      # May raise ZeroDivisionError
        return computed
    except KeyError:
        print(f"❌ Error: Required key '{key}' is missing from user record!")
    except (ValueError, TypeError) as err:
        print(f"❌ Data Parsing Error: Invalid numeric input ({err})")
    except ZeroDivisionError:
        print("❌ Math Error: Value cannot be zero!")

# Testing different failure scenarios:
user_data = {"score": "50", "bonus": "zero", "zero_val": "0"}

print("1. Valid score:    ", process_user_record(user_data, "score", 2))
print("2. Missing key:    ", process_user_record(user_data, "missing_key", 2))
print("3. Bad number string:", process_user_record(user_data, "bonus", 2))
print("4. Division by zero:", process_user_record(user_data, "zero_val", 2))`,
        codeTitle: 'Example 3: Handling Multiple Specific Exceptions and Tuple Grouping',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Why Specific Handlers Matter:</strong>
          <p style="margin-top:6px;">Specific exception blocks allow you to provide targeted recovery actions (e.g. asking for missing keys vs asking for re-entered numbers) rather than failing generically.</p>
        </div>`
      },
      {
        title: '4. Raising Exceptions & Exception Chaining (raise ... from)',
        body: `<p>Use the <strong><code>raise</code> statement</strong> to throw an exception when business rule invariants are violated. Python 3 also supports <strong>Exception Chaining</strong> via <code>raise NewException from original_error</code>, preserving the original root cause traceback for debugging:</p>`,
        code: `def validate_account_age(age):
    if not isinstance(age, int):
        raise TypeError(f"Age must be an integer, received {type(age).__name__}")
    if age < 0:
        raise ValueError(f"Age cannot be negative! Received: {age}")
    if age < 18:
        raise PermissionError(f"User is {age} years old. Minimum required age is 18.")
    return "✅ Age verified successfully!"

# Test exception raising:
try:
    print(validate_account_age(22))  # Valid
    validate_account_age(-5)         # Triggers ValueError
except (TypeError, ValueError, PermissionError) as err:
    print(f"🚫 Validation Failed: {err}")`,
        codeTitle: 'Example 4: Explicit Exception Raising and Guarding Business Logic',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Fail-Fast Principle:</strong>
          <p style="margin-top:6px;">Raising exceptions immediately when invalid inputs arrive prevents corrupted state from propagating deeper into your application and database.</p>
        </div>`
      },
      {
        title: '5. Creating Custom Application Exceptions (OOP Hierarchy)',
        body: `<p>In large production applications (FastAPI backends, payment gateways, microservices), you should define <strong>custom domain-specific exception classes</strong> by inheriting from Python's standard <code>Exception</code> class:</p>`,
        code: `# Define Custom Application Exceptions
class BankingAppError(Exception):
    """Base exception for all banking domain errors."""
    pass

class InsufficientFundsError(BankingAppError):
    """Raised when a withdrawal exceeds available balance."""
    def __init__(self, balance, amount_requested):
        self.balance = balance
        self.amount_requested = amount_requested
        self.shortage = amount_requested - balance
        super().__init__(
            f"Withdrawal of Rs.{amount_requested:.2f} failed! "
            f"Current Balance: Rs.{balance:.2f} (Short by Rs.{self.shortage:.2f})"
        )

class AccountLockedError(BankingAppError):
    """Raised when operating on a frozen account."""
    pass

def withdraw_money(account_balance, amount, is_locked=False):
    if is_locked:
        raise AccountLockedError("Account is temporarily locked. Please contact support.")
    if amount > account_balance:
        raise InsufficientFundsError(account_balance, amount)
    return account_balance - amount

# Test Custom Exception handling:
try:
    new_bal = withdraw_money(500.0, 750.0)
except InsufficientFundsError as err:
    print("💳 Transaction Blocked:", err)
    print(f"👉 Customer needs to deposit at least Rs.{err.shortage:.2f} more.")
except BankingAppError as err:
    print("🏦 General Banking Error:", err)`,
        codeTitle: 'Example 5: Designing Custom Application Exceptions',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Architectural Advantage:</strong>
          <p style="margin-top:6px;">Custom exceptions carry rich structured metadata (like <code>err.shortage</code>) allowing API layers to return structured HTTP 400/403 JSON responses to frontend clients automatically.</p>
        </div>`
      }
    ],
    mistake: {
      title: 'Using Bare "except:" or "except Exception: pass" (The Silent Bug Trap)',
      text: 'Using a bare "except:" or catching Exception and doing "pass" silently suppresses all errors including typos (NameError), keyboard interrupts, and out-of-memory errors, making code completely impossible to debug. Always catch specific exceptions and log them!'
    },
    tryIt: {
      desc: 'Write a function parse_integer_input(prompt_text) that repeatedly prompts the user in a while loop until they provide a valid integer, handling ValueError gracefully.',
      code: `def safe_int_converter(raw_value):
    try:
        return int(raw_value), "Success"
    except ValueError:
        return None, f"'{raw_value}' is not a valid integer!"

# Test inputs:
for test_val in ["42", "hello", "100.5", "-99"]:
    val, status = safe_int_converter(test_val)
    print(f"Input: {test_val:8} -> Parsed: {val} ({status})")`
    },
    faqs: [
      {
        q: 'What is the difference between else and finally in try-except?',
        a: 'The else block runs ONLY if the try block succeeds with zero exceptions. The finally block runs unconditionally 100% of the time, even if an unhandled exception occurred or a return statement was executed.'
      },
      {
        q: 'Why should custom exceptions inherit from Exception and not BaseException?',
        a: 'BaseException is the root of system-level exits like KeyboardInterrupt and SystemExit. Inheriting from Exception ensures your errors represent application issues without interfering with process termination.'
      },
      {
        q: 'How do I re-raise the currently active exception?',
        a: 'Inside an except block, simply write "raise" with no arguments. Python will re-raise the active exception up the call stack with its full original traceback intact.'
      }
    ]
  },

  // =========================================================================
  // CHAPTER 26: PYTHON FILE HANDLING & CONTEXT MANAGERS
  // =========================================================================
  {
    num: 26,
    phaseId: 'phase6',
    phaseTitle: 'Phase 6: Exception and File Handling',
    slug: '26-python-file-handling-and-context-managers',
    title: 'Python File Handling & with open()',
    badge: '26. File I/O & Context Managers',
    subtopics: 'File Modes (r, w, a, x, b) · read() vs readline() · write() vs writelines() · with open() Context Manager · Buffer Management · UTF-8',
    desc: 'Master file I/O operations in Python: understanding file streams and OS descriptors, all file modes, reading strategies (read, readline, line iterators), writing and appending data, UTF-8 encoding standards, and the with open() context manager.',
    sections: [
      {
        title: '1. File Streams, OS Descriptors & The open() Function',
        body: `<p>In computer operating systems, persistent files are stored on disk (SSD/HDD). When Python interacts with a file, the OS creates an open <strong>File Descriptor</strong> and returns a stream wrapper object in memory.</p>
        <p>The built-in <code>open(file, mode="r", encoding="utf-8")</code> function connects Python to the physical file system.</p>
        <h4 style="color:#10b981; margin:16px 0 8px;">Comprehensive Python File Modes:</h4>
        <table class="tbl" style="margin-top:8px; font-size:12.5px;">
          <tr><th>Mode</th><th>Name</th><th>Behavior / Stream Position</th><th>File Must Exist?</th></tr>
          <tr><td><code>'r'</code></td><td>Read (Default)</td><td>Opens file for reading text. Pointer placed at start.</td><td><strong>Yes</strong> (raises <code>FileNotFoundError</code> if missing)</td></tr>
          <tr><td><code>'w'</code></td><td>Write (Overwrite)</td><td><strong>Truncates (wipes)</strong> file to 0 bytes and writes from start.</td><td>No (Creates file if missing)</td></tr>
          <tr><td><code>'a'</code></td><td>Append</td><td>Writes new data to the <strong>end</strong> of file without erasing existing content.</td><td>No (Creates file if missing)</td></tr>
          <tr><td><code>'x'</code></td><td>Exclusive Creation</td><td>Creates and opens file for writing. <strong>Fails if file already exists</strong>!</td><td>Must <strong>NOT</strong> exist (raises <code>FileExistsError</code>)</td></tr>
          <tr><td><code>'r+'</code></td><td>Read & Write</td><td>Opens for bidirectional reading and writing.</td><td><strong>Yes</strong></td></tr>
          <tr><td><code>'rb' / 'wb'</code></td><td>Binary Modes</td><td>Reads/writes raw bytes (images, PDFs, audio, pickles).</td><td>Matches 'r' / 'w' rules</td></tr>
        </table>`,
        code: `# Writing and Reading using the open() function:
# Step 1: Open file in write mode ('w') with explicit UTF-8 encoding
f_write = open("sample_demo.txt", "w", encoding="utf-8")
f_write.write("Line 1: Hello from Python File I/O! 🚀\\n")
f_write.write("Line 2: Built-in file streaming is fast and portable.\\n")
f_write.close() # Always close manually if not using 'with'!

# Step 2: Open file in read mode ('r')
f_read = open("sample_demo.txt", "r", encoding="utf-8")
file_contents = f_read.read()
f_read.close()

print("--- File Contents Read From Disk ---")
print(file_contents)`,
        codeTitle: 'Example 1: Basic File Writing and Reading with open() and close()',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Why UTF-8 Encoding is Mandatory:</strong>
          <p style="margin-top:6px;">If you omit <code>encoding="utf-8"</code>, Windows defaults to legacy <code>cp1252</code> or <code>ANSI</code>, causing fatal <code>UnicodeDecodeError</code> crashes when reading emojis, non-English names, or foreign currency symbols!</p>
        </div>`
      },
      {
        title: '2. The Context Manager: Why "with open()" is Mandatory',
        body: `<p>In the manual <code>open() ... close()</code> pattern, if an unexpected exception occurs between <code>open()</code> and <code>close()</code>, the file remains locked in OS memory, causing <strong>resource leaks and file locking crashes</strong>.</p>
        <p>The <strong><code>with open(...) as f:</code> statement</strong> implements the Python <strong>Context Manager protocol</strong> (<code>__enter__</code> and <code>__exit__</code>). It guarantees that the file stream is <strong>100% automatically flushed and closed</strong> the microsecond execution exits the block, even if an unhandled exception or return statement occurs!</p>
        <div class="diagram-box">┌────────────────────────────────────────────────────────┐
│  with open("data.txt", "w", encoding="utf-8") as f:    │
│      f.write("Safe writing...")                        │
│                                                        │
│  [__exit__ automatically triggers OS close() here!]    │
└────────────────────────────────────────────────────────┘</div>`,
        code: `# Safe, industry-standard file handling with Context Manager:
with open("audit_log.txt", "w", encoding="utf-8") as file:
    file.write("2026-08-14 10:00:00 [INFO] System initialized successfully.\\n")
    file.write("2026-08-14 10:05:22 [INFO] Database connection active.\\n")

# Verify that Python automatically closed the file descriptor:
print("Is the file closed?", file.closed) # True! Guaranteed!`
        ,
        codeTitle: 'Example 2: Automatic Resource Management with with open()',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Zero Leak Guarantee:</strong>
          <p style="margin-top:6px;"><code>file.closed</code> evaluates to <code>True</code> immediately outside the <code>with</code> block. You never need to call <code>file.close()</code> manually ever again.</p>
        </div>`
      },
      {
        title: '3. Reading Strategies: read() vs readline() vs Line Iterator',
        body: `<p>Python provides three different techniques for reading text streams:</p>
        <ol>
          <li><code>f.read()</code>: Reads the entire file into a single string in RAM. (Good for small config files; dangerous for 10 GB log files!).</li>
          <li><code>f.readline()</code>: Reads a single line up to the newline <code>\\n</code> character.</li>
          <li><code>f.readlines()</code>: Reads all lines and returns them as a Python list of strings.</li>
          <li><strong>Memory-Efficient Line Iterator (<code>for line in f:</code>):</strong> Streams lines one by one from the OS buffer in $O(1)$ memory! This is the gold standard for large datasets.</li>
        </ol>`,
        code: `# 1. Prepare multi-line test file:
with open("server_metrics.txt", "w", encoding="utf-8") as f:
    f.write("CPU_Usage: 24%\\nMemory_Usage: 58%\\nDisk_Free: 412GB\\nActive_Threads: 16\\n")

# 2. Strategy A: Memory-Efficient Line-by-Line Streaming (O(1) RAM):
print("--- 🚀 Strategy A: Streaming lines with for loop ---")
with open("server_metrics.txt", "r", encoding="utf-8") as f:
    for line_num, line in enumerate(f, start=1):
        # line.strip() removes trailing newline character:
        print(f"Line {line_num}: {line.strip()}")

# 3. Strategy B: readlines() returning a list:
with open("server_metrics.txt", "r", encoding="utf-8") as f:
    all_lines = f.readlines()
print(f"\\nTotal Lines in list: {len(all_lines)}")`,
        codeTitle: 'Example 3: Comparing Reading Strategies and Memory Streaming',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Big Data Performance Rule:</strong>
          <p style="margin-top:6px;">When processing massive multi-gigabyte log files, <strong>NEVER</strong> use <code>f.read()</code> or <code>f.readlines()</code>. Always stream lines using <code>for line in file_handle:</code> to maintain a negligible memory footprint.</p>
        </div>`
      },
      {
        title: '4. Appending Data & The Difference Between "w" and "a"',
        body: `<p>Opening a file in write mode (<code>"w"</code>) <strong>immediately erases all prior content</strong>. To preserve existing data and add new records to the bottom, open the file in append mode (<code>"a"</code>):</p>`,
        code: `# 1. Initialize log file with header in 'w' mode:
with open("app_activity.log", "w", encoding="utf-8") as log_file:
    log_file.write("=== APPLICATION EVENT LOG ===\\n")

# 2. Append new user actions dynamically using 'a' mode:
def append_log_event(event_message):
    with open("app_activity.log", "a", encoding="utf-8") as log_file:
        log_file.write(f"• EVENT: {event_message}\\n")

append_log_event("User 'balaji' logged into the portal")
append_log_event("Payment of Rs.1499 processed successfully")
append_log_event("User downloaded invoice PDF")

# Read back accumulated log:
with open("app_activity.log", "r", encoding="utf-8") as log_file:
    print(log_file.read())`,
        codeTitle: 'Example 4: Appending Event Logs with "a" Mode',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Append Mechanics:</strong>
          <p style="margin-top:6px;">In <code>"a"</code> mode, the OS file pointer is automatically moved to the end of the file before every write operation.</p>
        </div>`
      }
    ],
    mistake: {
      title: 'Accidentally Overwriting Files by using "w" instead of "a"',
      text: 'Opening an existing file in "w" mode immediately wipes and truncates its entire content to 0 bytes before you even write a single character. Always use "a" mode when adding records to existing files.'
    },
    tryIt: {
      desc: 'Write a small program that asks for a grocery item, appends it to "groceries.txt", and then reads back all saved items with line numbers.',
      code: `# Writing items to shopping list:
items = ["Milk", "Whole Wheat Bread", "Eggs", "Green Tea"]

with open("groceries.txt", "w", encoding="utf-8") as f:
    for item in items:
        f.write(f"{item}\\n")

print("🛒 Saved Grocery List:")
with open("groceries.txt", "r", encoding="utf-8") as f:
    for idx, line in enumerate(f, 1):
        print(f"{idx}. {line.strip()}")`
    },
    faqs: [
      {
        q: 'Why does Python not close files immediately when leaving a regular function without "with"?',
        a: 'CPython uses reference counting to close files when the file variable goes out of scope, but garbage collection timing is not guaranteed in other Python implementations (PyPy, Jython). with open() guarantees immediate deterministic closure on all platforms.'
      },
      {
        q: 'What is the difference between text mode and binary mode?',
        a: 'Text mode ("r", "w") handles string encoding (UTF-8) and normalizes platform-specific line endings (\\r\\n on Windows to \\n in Python). Binary mode ("rb", "wb") reads/writes raw unencoded bytes directly.'
      },
      {
        q: 'How do I check if a file is already open or closed in Python?',
        a: 'Inspect the boolean attribute file_handle.closed. It returns True if closed and False if still open.'
      }
    ]
  },

  // =========================================================================
  // CHAPTER 27: PYTHON CSV & JSON FILE PROCESSING
  // =========================================================================
  {
    num: 27,
    phaseId: 'phase6',
    phaseTitle: 'Phase 6: Exception and File Handling',
    slug: '27-python-csv-and-json-file-processing',
    title: 'Python CSV & JSON File Processing',
    badge: '27. CSV & JSON Processing',
    subtopics: 'csv.reader · csv.writer · csv.DictReader · csv.DictWriter · json.dump() & load() · Structured Storage',
    desc: 'Master structured tabular and document data processing in Python: reading and writing CSV files with csv.reader and csv.DictReader, parsing nested JSON documents with json.dump() and json.load(), and building real-world data pipelines.',
    sections: [
      {
        title: '1. Tabular Data with CSV: csv.reader and csv.writer',
        body: `<p><strong>CSV (Comma-Separated Values)</strong> is the standard format for tabular spreadsheet data across Excel, Google Sheets, databases, and data science pipelines.</p>
        <p>Python ships with the built-in <strong><code>csv</code> module</strong>, which automatically handles escaped quotation marks, embedded commas in text, and platform newline quirks:</p>
        <div class="callout" style="margin:16px 0;">
          <strong style="color:#10b981;">💡 The newline="" Rule in CSV Writing:</strong><br>
          Always specify <code>newline=""</code> when opening files for writing with the CSV module (<code>open("data.csv", "w", newline="", encoding="utf-8")</code>). This prevents Python from inserting blank empty rows on Windows operating systems!
        </div>`,
        code: `import csv

# 1. Writing tabular records to a CSV file:
student_data = [
    ["Roll No", "Student Name", "Grade", "Percentage"],
    [101, "Balaji", "A+", 94.5],
    [102, "Alex Smith", "A", 88.0],
    [103, "Chloe Davis", "A+", 96.2],
    [104, "David Brown", "B", 72.4]
]

with open("students.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.writer(f)
    writer.writerows(student_data)
print("✅ students.csv written successfully!")

# 2. Reading tabular records back with csv.reader:
print("\\n--- Reading students.csv ---")
with open("students.csv", "r", encoding="utf-8") as f:
    reader = csv.reader(f)
    header = next(reader) # Extract first row as column header
    print("Columns Header:", header)
    
    for row in reader:
        print(f"Roll: {row[0]:4} | Name: {row[1]:12} | Grade: {row[2]} ({row[3]}%)")`,
        codeTitle: 'Example 1: Reading and Writing CSV Files with csv.reader and writer',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Method Breakdown:</strong>
          <ul style="margin:8px 0 0 18px; line-height:1.7;">
            <li><code>writer.writerows(list_of_lists)</code> writes all 2D table rows in one efficient batch call.</li>
            <li><code>next(reader)</code> advances the iterator by 1 row, cleanly stripping out the header before looping over data rows.</li>
          </ul>
        </div>`
      },
      {
        title: '2. Professional Column Mapping: csv.DictReader & csv.DictWriter',
        body: `<p>Accessing CSV columns by numeric indexes (like <code>row[1]</code>) is brittle: if a developer adds a new column, all indexes shift and break your code. <strong><code>csv.DictReader</code> and <code>csv.DictWriter</code> map rows directly to Python dictionaries using header keys</strong>:</p>`,
        code: `import csv

# 1. Writing CSV using Dictionary rows (DictWriter):
fieldnames = ["product_id", "product_name", "category", "price"]

products = [
    {"product_id": "P01", "product_name": "Mechanical Keyboard", "category": "Hardware", "price": 2499.00},
    {"product_id": "P02", "product_name": "Wireless Mouse", "category": "Hardware", "price": 799.00},
    {"product_id": "P03", "product_name": "USB-C Hub", "category": "Accessories", "price": 1299.00}
]

with open("inventory.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.DictWriter(f, fieldnames=fieldnames)
    writer.writeheader() # Automatically writes the first header row!
    writer.writerows(products)

# 2. Reading CSV as clean dictionaries (DictReader):
print("--- Inventory Catalog (DictReader) ---")
with open("inventory.csv", "r", encoding="utf-8") as f:
    reader = csv.DictReader(f)
    for row in reader:
        print(f"[{row['product_id']}] {row['product_name']:20} | Rs.{float(row['price']):.2f}")`,
        codeTitle: 'Example 2: Robust Column Mapping with csv.DictReader and csv.DictWriter',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Why DictReader is Superior:</strong>
          <p style="margin-top:6px;">You access fields by explicit name: <code>row['product_name']</code>. Even if columns in the CSV are reordered, your code continues functioning perfectly without changes!</p>
        </div>`
      },
      {
        title: '3. Hierarchical Structured Storage with JSON (dump & load)',
        body: `<p>While CSV is great for flat tabular data, modern web applications, configurations, and nested data schemas use <strong>JSON (JavaScript Object Notation)</strong>.</p>
        <ul>
          <li><code>json.dump(obj, file_stream, indent=4)</code>: Serializes Python dictionaries/lists directly to a disk file stream.</li>
          <li><code>json.load(file_stream)</code>: Reads and parses a JSON file directly into native Python dictionaries and lists.</li>
        </ul>`,
        code: `import json

# Nested hierarchical application configuration:
app_settings = {
    "app_name": "ManaCompiler Pro",
    "version": "3.5.0",
    "server": {
        "host": "0.0.0.0",
        "port": 8080,
        "ssl_enabled": True
    },
    "features": ["code_editor", "realtime_compiler", "ai_code_review"],
    "supported_languages": ["Python", "Java", "C", "JavaScript"]
}

# 1. Save complex dictionary to physical JSON file on disk:
with open("app_config.json", "w", encoding="utf-8") as f:
    json.dump(app_settings, f, indent=4)
print("✅ app_config.json saved to disk!")

# 2. Read JSON file back from disk into Python dictionary:
with open("app_config.json", "r", encoding="utf-8") as f:
    loaded_config = json.load(f)

print("\\n--- Loaded JSON Config ---")
print("App Name: ", loaded_config["app_name"])
print("Host URL: ", f"http://{loaded_config['server']['host']}:{loaded_config['server']['port']}")
print("Languages:", ", ".join(loaded_config["supported_languages"]))`,
        codeTitle: 'Example 3: Serializing and Deserializing JSON Data to Disk',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 CSV vs JSON:</strong>
          <ul style="margin:8px 0 0 18px; line-height:1.7;">
            <li>Use <strong>CSV</strong> for 2D flat tables (spreadsheets, bank statements, sensor time series).</li>
            <li>Use <strong>JSON</strong> for nested hierarchical trees (user profiles with sub-arrays, API requests, configuration files).</li>
          </ul>
        </div>`
      }
    ],
    mistake: {
      title: 'Forgetting newline="" When Writing CSV on Windows',
      text: 'Omitting newline="" when calling open("data.csv", "w") causes the Windows standard C runtime to write \\r\\r\\n line endings, resulting in unwanted blank empty rows between every record in Excel. Always pass newline="".'
    },
    tryIt: {
      desc: 'Create a list of dictionaries representing 3 books (title, author, price). Save them to a CSV file named "books.csv" using DictWriter and print the file contents.',
      code: `import csv

books = [
    {"title": "Clean Code", "author": "Robert C. Martin", "price": 450},
    {"title": "Fluent Python", "author": "Luciano Ramalho", "price": 890},
    {"title": "The Pragmatic Programmer", "author": "Andrew Hunt", "price": 550}
]

with open("books.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.DictWriter(f, fieldnames=["title", "author", "price"])
    writer.writeheader()
    writer.writerows(books)

print("Saved books.csv successfully! Reading back:")
with open("books.csv", "r", encoding="utf-8") as f:
    print(f.read().strip())`
    },
    faqs: [
      {
        q: 'What is the difference between json.dumps() and json.dump()?',
        a: 'json.dumps(obj) converts a Python object into a string in RAM. json.dump(obj, file) writes the serialized JSON directly into an open file stream on disk.'
      },
      {
        q: 'How do I handle CSV files that use semicolons (;) or tabs (\\t) instead of commas?',
        a: 'Pass delimiter=";" or delimiter="\\t" into csv.reader() or csv.writer(): csv.reader(f, delimiter=";").'
      },
      {
        q: 'Can CSV files store nested objects or lists?',
        a: 'No. The standard CSV format is strictly 2D flat tabular text. To store nested arrays or dictionaries, use JSON, YAML, or SQLite.'
      }
    ]
  },

  // =========================================================================
  // CHAPTER 28: PYTHON FILESYSTEM & PATHLIB OPERATIONS
  // =========================================================================
  {
    num: 28,
    phaseId: 'phase6',
    phaseTitle: 'Phase 6: Exception and File Handling',
    slug: '28-python-filesystem-operations-pathlib',
    title: 'Python Filesystem & Pathlib Operations',
    badge: '28. Filesystem & Pathlib',
    subtopics: 'pathlib.Path Mastery · Directory Creation (mkdir) · Existence Checks · Renaming & Deleting · Recursive Globbing',
    desc: 'Master professional filesystem automation in Python: object-oriented path manipulation with pathlib.Path, checking file existence, creating nested folders with mkdir(parents=True), renaming, deleting, and recursive file searching with rglob().',
    sections: [
      {
        title: '1. Object-Oriented Path Traversal with pathlib.Path',
        body: `<p>Modern Python (PEP 428) replaces legacy string path concatenation (<code>os.path.join()</code>) with <strong><code>pathlib.Path</code></strong>, treating paths as rich, platform-independent objects.</p>
        <div class="diagram-box">Legacy Approach:   os.path.join("data", "exports", "2026", "report.pdf")
Modern Approach:   Path("data") / "exports" / "2026" / "report.pdf"  (Clean slash operator!)</div>
        <h4 style="color:#10b981; margin:16px 0 8px;">Key Path Properties:</h4>
        <ul>
          <li><code>path.name</code>: Full filename with extension (<code>"report.pdf"</code>).</li>
          <li><code>path.stem</code>: Filename without extension (<code>"report"</code>).</li>
          <li><code>path.suffix</code>: File extension (<code>".pdf"</code>).</li>
          <li><code>path.parent</code>: Immediate parent directory object.</li>
          <li><code>path.resolve()</code>: Absolute canonical filesystem path resolving symlinks.</li>
        </ul>`,
        code: `from pathlib import Path

# Constructing cross-platform paths using the / slash operator:
project_dir = Path("my_enterprise_app")
sub_path = project_dir / "src" / "controllers" / "auth_controller.py"

print("Full Path String: ", sub_path)
print("Filename (name):  ", sub_path.name)
print("Filename stem:    ", sub_path.stem)
print("Extension (suffix):", sub_path.suffix)
print("Parent Directory: ", sub_path.parent)
print("Grandparent Dir:  ", sub_path.parent.parent)`,
        codeTitle: 'Example 1: Object-Oriented Path Inspection with pathlib.Path',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Cross-Platform Guarantee:</strong>
          <p style="margin-top:6px;"><code>pathlib</code> automatically renders forward slashes on Linux/macOS and backslashes on Windows without any conditional platform code.</p>
        </div>`
      },
      {
        title: '2. Directory Management: Creating Nested Folders (mkdir)',
        body: `<p>Creating folders manually can crash if the parent folders do not exist, or if the folder already exists. <code>pathlib.Path.mkdir()</code> solves this cleanly with two critical flags:</p>
        <ul>
          <li><code>parents=True</code>: Automatically creates all missing intermediate parent directories (like <code>mkdir -p</code> in Unix).</li>
          <li><code>exist_ok=True</code>: Does not crash if the target folder already exists!</li>
        </ul>`,
        code: `from pathlib import Path

# Define a deeply nested target folder:
backup_folder = Path("backups") / "2026" / "august" / "database_dumps"

# Create nested directory tree in ONE line safely:
backup_folder.mkdir(parents=True, exist_ok=True)
print(f"✅ Verified / Created directory: {backup_folder}")
print("Does folder exist?", backup_folder.exists())
print("Is it a directory?", backup_folder.is_dir())`,
        codeTitle: 'Example 2: Creating Nested Directories Safely with mkdir',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Production Standard:</strong>
          <p style="margin-top:6px;">Always pass <code>parents=True, exist_ok=True</code> when preparing upload or log folders to ensure idempotent script execution.</p>
        </div>`
      },
      {
        title: '3. File Lifecycle: Checking, Renaming, Moving & Deleting',
        body: `<p>Perform complete CRUD operations on files using built-in Path methods:</p>
        <ul>
          <li><code>path.exists()</code>: Returns <code>True</code> if file or folder exists.</li>
          <li><code>path.is_file()</code> / <code>path.is_dir()</code>: Type verification.</li>
          <li><code>path.rename(new_path)</code>: Renames or moves file to a new path.</li>
          <li><code>path.unlink(missing_ok=True)</code>: <strong>Deletes a file</strong> (with <code>missing_ok=True</code> to prevent errors if already deleted!).</li>
          <li><code>path.rmdir()</code>: Deletes an <strong>empty directory</strong>.</li>
        </ul>`,
        code: `from pathlib import Path

temp_file = Path("temporary_draft.txt")

# 1. Write text directly to file with write_text():
temp_file.write_text("This is temporary draft content.", encoding="utf-8")
print(f"1. Created {temp_file.name} | Exists? {temp_file.exists()}")

# 2. Rename / Move file:
archived_file = Path("archived_draft.txt")
temp_file.rename(archived_file)
print(f"2. Renamed to {archived_file.name} | Old exists? {temp_file.exists()}")

# 3. Read back text directly with read_text():
content = archived_file.read_text(encoding="utf-8")
print(f"3. Read content: '{content}'")

# 4. Clean up / Delete file with unlink():
archived_file.unlink(missing_ok=True)
print(f"4. Deleted file | Exists? {archived_file.exists()}")`,
        codeTitle: 'Example 3: File Lifecycle Management (Create, Rename, Read, Delete)',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 One-Liner Helpers:</strong>
          <p style="margin-top:6px;"><code>Path.write_text()</code> and <code>Path.read_text()</code> encapsulate opening, encoding, reading/writing, and closing files into a single, clean line of code!</p>
        </div>`
      },
      {
        title: '4. Recursive File Searching with Pattern Globbing (rglob)',
        body: `<p>Search across your entire project folder hierarchy using <strong>recursive pattern matching</strong>:</p>
        <ul>
          <li><code>path.glob("*.py")</code>: Searches matching files in the current folder only.</li>
          <li><code>path.rglob("*.py")</code>: <strong>Recursive Glob</strong> — searches the current directory AND all nested sub-folders at any depth!</li>
        </ul>`,
        code: `from pathlib import Path

# Search current workspace for all HTML tutorial files:
workspace = Path(".")
html_files = list(workspace.glob("*.html"))

print(f"🔍 Found {len(html_files)} HTML files in root folder.")
for f in html_files[:4]:
    # Inspect file size in bytes:
    size_kb = f.stat().st_size / 1024
    print(f"• {f.name:30} | {size_kb:.1f} KB")`,
        codeTitle: 'Example 4: Recursive File Discovery with Path.glob',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Memory Efficiency:</strong>
          <p style="margin-top:6px;"><code>Path.glob()</code> returns a lazy generator, allowing your program to iterate through hundreds of thousands of files without loading all filenames into RAM at once.</p>
        </div>`
      }
    ],
    mistake: {
      title: 'Using string concatenation (+) instead of the / operator for Paths',
      text: 'Writing path = folder + "/" + filename can result in double slashes (folder//file) or fail on Windows if backslashes are hardcoded. Always use pathlib.Path(folder) / filename.'
    },
    tryIt: {
      desc: 'Use pathlib to create a folder "my_test_dir", write a file "hello.txt" inside it, read its content, and clean up both file and folder.',
      code: `from pathlib import Path

test_dir = Path("my_test_dir")
test_dir.mkdir(exist_ok=True)

test_file = test_dir / "hello.txt"
test_file.write_text("Hello from Pathlib! 🚀", encoding="utf-8")

print("File Content:", test_file.read_text(encoding="utf-8"))

# Cleanup:
test_file.unlink()
test_dir.rmdir()
print("Cleaned up directory successfully! ✅")`
    },
    faqs: [
      {
        q: 'What is the difference between unlink() and rmdir() in pathlib?',
        a: 'unlink() deletes a physical file. rmdir() deletes an empty directory. If a directory contains files, rmdir() will raise an OSError (use shutil.rmtree() for recursive directory deletion).'
      },
      {
        q: 'Why is pathlib.Path preferred over the os.path module?',
        a: 'pathlib provides an object-oriented, readable interface with built-in path methods (.read_text(), .write_text(), .mkdir(), .glob()) and natural slash (/) path joining.'
      },
      {
        q: 'How do I convert a pathlib.Path object to a string for older third-party libraries?',
        a: 'Simply call str(my_path) or pass the Path object directly, as all standard Python 3.6+ functions accept Path objects seamlessly via the os.PathLike interface.'
      }
    ]
  },

  // =========================================================================
  // CHAPTER 29: PYTHON FILE HANDLING CAPSTONE PROJECTS
  // =========================================================================
  {
    num: 29,
    phaseId: 'phase6',
    phaseTitle: 'Phase 6: Exception and File Handling',
    slug: '29-python-file-handling-capstone-projects',
    title: 'File Handling Capstone Projects',
    badge: '29. File Capstone Projects',
    subtopics: '4 Projects · 1. File Notes App · 2. Contact Book · 3. CSV Expense Tracker · 4. JSON Student Records',
    desc: 'Build four complete, production-grade, file-persisted applications in Python: a timestamped text notes app, an interactive contact book, a CSV-based expense tracker with budget analytics, and a JSON-backed student records CRUD management system.',
    sections: [
      {
        title: '1. Project 1: File-Based Timestamped Notes Application',
        body: `<p>A persistent, timestamped command-line note-taking application that logs notes to a text file with automated datetime headers and keyword searching:</p>`,
        code: `# =========================================================================
# PROJECT 1: FILE-BASED TIMESTAMPED NOTES APPLICATION
# =========================================================================
import datetime as dt
from pathlib import Path

NOTES_FILE = Path("daily_notes.txt")

def add_note(note_text):
    """Append a new note with timestamp."""
    timestamp = dt.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(NOTES_FILE, "a", encoding="utf-8") as f:
        f.write(f"[{timestamp}] {note_text.strip()}\\n")
    return "✅ Note saved successfully!"

def view_all_notes():
    """Read and display all notes from file."""
    if not NOTES_FILE.exists():
        return "ℹ️ No notes recorded yet."
    with open(NOTES_FILE, "r", encoding="utf-8") as f:
        return f.read().strip()

def search_notes(keyword):
    """Search for notes containing a specific keyword."""
    if not NOTES_FILE.exists():
        return []
    matches = []
    with open(NOTES_FILE, "r", encoding="utf-8") as f:
        for line in f:
            if keyword.lower() in line.lower():
                matches.append(line.strip())
    return matches

# Run Notes App Demonstration:
print("--- 📝 Notes Application Demo ---")
add_note("Studied Python Exception Handling (try-except-else-finally)")
add_note("Built CSV Expense Tracker with DictReader")
add_note("Reviewing FastAPI background tasks for production")

print("\\n--- All Saved Notes ---")
print(view_all_notes())

print("\\n--- Search Results for 'Python' ---")
for note in search_notes("Python"):
    print("•", note)`,
        codeTitle: 'Project 1: Persistent Timestamped Notes Engine',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Architectural Features:</strong>
          <ul style="margin:8px 0 0 18px; line-height:1.7;">
            <li>Uses append mode (<code>"a"</code>) to safely preserve all historical entries.</li>
            <li>Case-insensitive streaming search using <code>keyword.lower() in line.lower()</code> without loading unnecessary memory.</li>
          </ul>
        </div>`
      },
      {
        title: '2. Project 2: Interactive Contact Book Manager',
        body: `<p>A file-backed Contact Book manager supporting contact addition, search by name or phone, and listing contacts alphabetically:</p>`,
        code: `# =========================================================================
# PROJECT 2: FILE-BACKED CONTACT BOOK APPLICATION
# =========================================================================
import json
from pathlib import Path

CONTACTS_FILE = Path("contacts_db.json")

def load_contacts():
    """Load contacts from JSON file safely."""
    if not CONTACTS_FILE.exists():
        return {}
    try:
        with open(CONTACTS_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except (json.JSONDecodeError, OSError):
        return {}

def save_contacts(contacts_dict):
    """Save contacts dictionary to JSON file."""
    with open(CONTACTS_FILE, "w", encoding="utf-8") as f:
        json.dump(contacts_dict, f, indent=4)

def add_contact(name, phone, email, category="Personal"):
    """Add or update a contact record."""
    contacts = load_contacts()
    contacts[name.strip().title()] = {
        "phone": phone.strip(),
        "email": email.strip().lower(),
        "category": category
    }
    save_contacts(contacts)
    return f"✅ Contact '{name}' saved successfully!"

def search_contact(search_term):
    """Find contact by name substring or phone."""
    contacts = load_contacts()
    results = {}
    for name, details in contacts.items():
        if search_term.lower() in name.lower() or search_term in details["phone"]:
            results[name] = details
    return results

# Run Contact Book Demonstration:
print("--- 📱 Contact Book Manager Demo ---")
add_contact("Balaji Dev", "+91 98765 43210", "balaji@example.com", "Work")
add_contact("Alex Smith", "+1 555 123 4567", "alex@example.com", "Friends")
add_contact("Chloe Davis", "+44 20 7946 0991", "chloe@techcorp.com", "Work")

print("\\n--- Search Results for 'balaji' ---")
print(json.dumps(search_contact("balaji"), indent=2))`,
        codeTitle: 'Project 2: JSON Contact Book Manager Engine',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Resilience Features:</strong>
          <p style="margin-top:6px;">Handles missing database files gracefully by returning an empty dictionary (<code>{}</code>) and catching corrupted JSON with <code>json.JSONDecodeError</code>.</p>
        </div>`
      },
      {
        title: '3. Project 3: Production Expense Tracker Using CSV',
        body: `<p>A complete financial expense tracking system that logs transactions to CSV, calculates total expenditures, and aggregates category summaries:</p>`,
        code: `# =========================================================================
# PROJECT 3: FINANCIAL EXPENSE TRACKER USING CSV
# =========================================================================
import csv
import datetime as dt
from pathlib import Path

EXPENSES_FILE = Path("monthly_expenses.csv")
FIELDNAMES = ["date", "category", "description", "amount"]

def initialize_expense_file():
    """Ensure CSV file exists with proper headers."""
    if not EXPENSES_FILE.exists():
        with open(EXPENSES_FILE, "w", newline="", encoding="utf-8") as f:
            writer = csv.DictWriter(f, fieldnames=FIELDNAMES)
            writer.writeheader()

def log_expense(category, description, amount):
    """Log an expense entry to CSV."""
    initialize_expense_file()
    entry = {
        "date": dt.date.today().isoformat(),
        "category": category.title(),
        "description": description.strip(),
        "amount": f"{float(amount):.2f}"
    }
    with open(EXPENSES_FILE, "a", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=FIELDNAMES)
        writer.writerow(entry)
    return f"✅ Logged Rs.{float(amount):.2f} for '{description}'"

def generate_expense_analytics():
    """Calculate total spending and category breakdown."""
    if not EXPENSES_FILE.exists():
        return 0.0, {}
        
    total_spent = 0.0
    category_totals = {}
    
    with open(EXPENSES_FILE, "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            amt = float(row["amount"])
            cat = row["category"]
            total_spent += amt
            category_totals[cat] = category_totals.get(cat, 0.0) + amt
            
    return round(total_spent, 2), category_totals

# Run Expense Tracker Demonstration:
print("--- 💰 Financial Expense Tracker Demo ---")
log_expense("Food", "Grocery Supermart Shopping", 1250.00)
log_expense("Utilities", "High-Speed Internet Bill", 999.00)
log_expense("Food", "Team Coffee & Snacks", 350.00)
log_expense("Education", "Python Masterclass Subscription", 1499.00)

total, breakdown = generate_expense_analytics()
print(f"\\n📊 Total Monthly Expenditure: Rs.{total:,.2f}")
print("--- Category Breakdown ---")
for cat, amt in breakdown.items():
    pct = (amt / total) * 100 if total > 0 else 0
    print(f"• {cat:12}: Rs.{amt:,.2f} ({pct:.1f}%)")`,
        codeTitle: 'Project 3: CSV Expense Tracker and Analytics Engine',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Analytics Breakdown:</strong>
          <p style="margin-top:6px;">Uses <code>csv.DictReader</code> to stream expense rows and computes aggregate percentage breakdowns per category dynamically.</p>
        </div>`
      },
      {
        title: '4. Project 4: JSON Student Academic Records Management System',
        body: `<p>A comprehensive academic records CRUD engine managing student enrollments, subject mark sheets, GPA calculations, and student record exports:</p>`,
        code: `# =========================================================================
# PROJECT 4: JSON STUDENT ACADEMIC RECORDS SYSTEM
# =========================================================================
import json
from pathlib import Path

STUDENT_DB = Path("students_database.json")

def load_db():
    if not STUDENT_DB.exists(): return {"students": {}}
    with open(STUDENT_DB, "r", encoding="utf-8") as f:
        return json.load(f)

def save_db(data):
    with open(STUDENT_DB, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4)

def register_student(student_id, name, branch):
    """Create a new student profile."""
    db = load_db()
    if student_id in db["students"]:
        return f"❌ Student ID {student_id} already exists!"
        
    db["students"][student_id] = {
        "name": name,
        "branch": branch,
        "marks": {},
        "gpa": 0.0
    }
    save_db(db)
    return f"🎓 Student '{name}' registered successfully under ID: {student_id}"

def record_marks(student_id, subject, score):
    """Add subject score and recalculate GPA."""
    db = load_db()
    student = db["students"].get(student_id)
    if not student:
        return f"❌ Student {student_id} not found!"
        
    student["marks"][subject] = score
    all_scores = list(student["marks"].values())
    student["gpa"] = round(sum(all_scores) / len(all_scores), 2)
    save_db(db)
    return f"✅ Recorded {subject}: {score}/100 | New GPA: {student['gpa']}"

def get_student_report_card(student_id):
    """Generate a clean formatted report card."""
    db = load_db()
    student = db["students"].get(student_id)
    if not student: return "Student not found!"
    
    lines = [
        "=" * 45,
        f"📋 REPORT CARD: {student['name']} (ID: {student_id})",
        f"Branch: {student['branch']} | Overall GPA: {student['gpa']}%",
        "-" * 45,
        "Subject Scores:"
    ]
    for sub, mark in student["marks"].items():
        lines.append(f"  • {sub:20}: {mark}/100")
    lines.append("=" * 45)
    return "\\n".join(lines)

# Run Student Records Demonstration:
print("--- 🎓 Student Records Management System ---")
register_student("STU101", "Balaji", "Computer Science")
record_marks("STU101", "Python Programming", 98)
record_marks("STU101", "Data Structures", 92)
record_marks("STU101", "Database Systems", 95)

print(get_student_report_card("STU101"))`,
        codeTitle: 'Project 4: JSON Student Records CRUD System',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Production Quality Features:</strong>
          <ul style="margin:8px 0 0 18px; line-height:1.7;">
            <li>Full CRUD persistence in structured JSON.</li>
            <li>Automatic re-calculation of dynamic metrics (GPA).</li>
            <li>Modular functions with input validation and clean error returns.</li>
          </ul>
        </div>`
      }
    ],
    mistake: {
      title: 'Failing to Handle Missing or Corrupted JSON Database Files',
      text: 'If your JSON file is empty or contains invalid syntax, json.load() raises json.JSONDecodeError: Expecting value. Always wrap file loading in a try-except block and provide an empty dictionary fallback.'
    },
    tryIt: {
      desc: 'Create a mini bookmark manager that stores website URLs with categories in a JSON file "bookmarks.json" and prints all bookmarked sites.',
      code: `import json
from pathlib import Path

bookmarks_file = Path("bookmarks.json")

bookmarks = {
    "Python": ["https://python.org", "https://docs.python.org"],
    "Compilers": ["https://www.ourcompiler.com"],
    "Tools": ["https://github.com", "https://stackoverflow.com"]
}

with open(bookmarks_file, "w", encoding="utf-8") as f:
    json.dump(bookmarks, f, indent=2)

print("Saved Bookmarks:")
with open(bookmarks_file, "r", encoding="utf-8") as f:
    data = json.load(f)
    for cat, urls in data.items():
        print(f"📁 {cat}:")
        for u in urls:
            print(f"   🔗 {u}")`
    },
    faqs: [
      {
        q: 'How do I choose between saving data in Text, CSV, or JSON?',
        a: 'Use Text (.txt) for unformatted logs and timestamped notes. Use CSV (.csv) for flat tabular rows and spreadsheets. Use JSON (.json) for nested objects, configuration files, and REST API data interchange.'
      },
      {
        q: 'How can I ensure atomic writes to prevent data corruption during crashes?',
        a: 'Write data to a temporary file (e.g. "data.json.tmp") first, and then atomically rename it to "data.json" using Path.rename(). Renames are atomic on modern operating systems.'
      },
      {
        q: 'When should I migrate from JSON files to a database like SQLite or PostgreSQL?',
        a: 'Migrate to a database when: (1) multiple concurrent threads/users write simultaneously, (2) dataset exceeds tens of megabytes, or (3) you need complex relational SQL joins and indexing.'
      }
    ]
  }
];
