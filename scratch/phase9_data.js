// Phase 9: Databases and APIs Data (Significantly Expanded with In-Depth Theory & Mental Models)
module.exports = [
  // =========================================================================
  // CHAPTER 42: PYTHON SQLITE & SQL FUNDAMENTALS
  // =========================================================================
  {
    num: 42,
    phaseId: 'phase9',
    phaseTitle: 'Phase 9: Databases and APIs',
    slug: '42-python-sqlite-and-sql-fundamentals',
    title: 'Python SQLite & SQL Fundamentals',
    badge: '42. SQLite & SQL Basics',
    subtopics: 'Relational DB Theory · SQLite Embedded Architecture · SQLite vs Client-Server · sqlite3 Module · CREATE TABLE DDL · INSERT & SELECT · executemany() · sqlite3.Row Mapping',
    desc: 'Master relational databases and SQL in Python with deep conceptual foundations: understanding RDBMS architecture, tables, primary keys, relational data integrity, SQLite embedded engine internals, the sqlite3 standard library, CRUD operations, batch processing with executemany(), and dictionary row mapping with sqlite3.Row.',
    sections: [
      {
        title: '1. Relational Database Concepts: What is an RDBMS & Why Do We Need It?',
        body: `<p>Before writing a single line of SQL, it is critical to understand <strong>why databases exist</strong> and why plain text files (like <code>.txt</code> or <code>.csv</code>) are inadequate for serious applications.</p>
        
        <h4 style="color:#10b981; margin:16px 0 8px;">The Critical Flaws of File-Based Storage:</h4>
        <p>When you store application data in JSON or CSV files, every update requires reading the <strong>entire file into RAM</strong>, modifying the data structure, and writing the entire file back to disk. This causes four fatal problems:</p>
        <ol style="line-height:1.8; margin-left:20px;">
          <li><strong>No Concurrency (Race Conditions):</strong> If two users attempt to purchase the last item in a store simultaneously, two Python threads will read the file at the same time, see 1 item in stock, and both write back 0, selling 2 items when only 1 existed!</li>
          <li><strong>No Indexing ($O(N)$ Search Penalty):</strong> To find a user with ID <code>98421</code> in a 1,000,000-line CSV, Python must scan every single line from top to bottom ($O(N)$ time). Databases use <strong>B-Trees</strong> to find records in $O(\log N)$ microsecond time.</li>
          <li><strong>No Data Integrity Constraints:</strong> Plain files cannot stop someone from writing a string into an "age" column or creating an order for a user ID that doesn't exist.</li>
          <li><strong>Lack of Crash Recovery (Atomicity):</strong> If power cuts out while rewriting a 50 MB CSV file, the file becomes corrupted and all data is permanently lost.</li>
        </ol>

        <h4 style="color:#10b981; margin:16px 0 8px;">The Relational Model (Tables, Rows, Columns & Keys):</h4>
        <p>A <strong>Relational Database Management System (RDBMS)</strong> organizes information into two-dimensional <strong>Tables</strong> (also called <em>Relations</em>):</p>
        <ul>
          <li><strong>Columns (Attributes/Fields):</strong> Define the schema and data type of each property (e.g. <code>id: INTEGER</code>, <code>name: TEXT</code>, <code>price: REAL</code>).</li>
          <li><strong>Rows (Records/Tuples):</strong> Individual data entries representing a single real-world entity.</li>
          <li><strong>Primary Key (PK):</strong> A unique column (usually an auto-incrementing integer or UUID) that guarantees every row in the table can be uniquely identified. No two rows can have the same Primary Key.</li>
          <li><strong>Foreign Key (FK):</strong> A column in one table that points directly to the Primary Key of another table, establishing a verifiable relationship (e.g. <code>orders.customer_id</code> references <code>customers.id</code>).</li>
        </ul>

        <div class="diagram-box">┌────────────────────────────────────────────────────────────────────────┐
│                        RELATIONAL DATABASE MODEL                       │
├────────────────────────────────────────────────────────────────────────┤
│  TABLE: customers                                                      │
│  ┌────────────┬──────────────────┬─────────────────────────────────┐   │
│  │ id (PK)    │ name             │ email                           │   │
│  ├────────────┼──────────────────┼─────────────────────────────────┤   │
│  │ 1          │ Balaji Dev       │ balaji@example.com              │   │
│  │ 2          │ Alex Smith       │ alex@example.com                │   │
│  └─────┬──────┴──────────────────┴─────────────────────────────────┘   │
│        │                                                               │
│        │ 1-to-Many Relationship (One customer has many orders)         │
│        ▼                                                               │
│  TABLE: orders                                                         │
│  ┌────────────┬──────────────────┬──────────────┬──────────────────┐   │
│  │ order_id   │ customer_id (FK) │ total_amount │ order_date       │   │
│  ├────────────┼──────────────────┼──────────────┼──────────────────┤   │
│  │ 101        │ 1 ───────────────┼─> ₹4,500.00  │ 2026-08-14       │   │
│  │ 102        │ 1 ───────────────┼─> ₹1,200.00  │ 2026-08-14       │   │
│  │ 103        │ 2 ───────────────┼─> ₹8,900.00  │ 2026-08-14       │   │
│  └────────────┴──────────────────┴──────────────┴──────────────────┘   │
└────────────────────────────────────────────────────────────────────────┘</div>`,
        code: `# Conceptual demonstration: The building blocks of relational data
schema_explanation = {
    "Table": "A structured spreadsheet-like grid representing an entity (e.g. Products, Users)",
    "Column": "A typed field (e.g. price: REAL, email: TEXT UNIQUE)",
    "Row": "A single concrete instance/record stored in the table",
    "Primary Key": "Uniquely identifies each row (e.g. user_id = 101)",
    "Foreign Key": "Enforces relationship between tables (e.g. order.user_id -> user.id)"
}

for concept, definition in schema_explanation.items():
    print(f"📌 {concept:15}: {definition}")`,
        codeTitle: 'Concept Blueprint: Relational Database Architecture Overview',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">💡 Real-World Analogy:</strong>
          <p style="margin-top:6px;">Think of a Primary Key like an Aadhaar Number or Social Security Number: even if two people have the exact same name and birthday, their Primary Key uniquely distinguishes them. A Foreign Key is like writing that Aadhaar Number on a passport application to link your passport directly to your identity record.</p>
        </div>`
      },
      {
        title: '2. The SQLite Architecture: Why is SQLite Embedded & Serverless?',
        body: `<p>Most relational databases (such as PostgreSQL, MySQL, Oracle, and Microsoft SQL Server) operate as <strong>Client-Server systems</strong>:</p>
        <ul>
          <li>They run as continuous background daemon processes on dedicated ports (e.g. port <code>5432</code> for Postgres, <code>3306</code> for MySQL).</li>
          <li>Your Python program must establish a network TCP/IP socket connection, transmit credentials, and send queries across the network wire.</li>
        </ul>
        <p><strong>SQLite is fundamentally different:</strong> It is <strong>Serverless and Embedded</strong>.</p>
        <p>The entire SQLite database engine is written in ANSI C and compiled directly into the Python interpreter itself. When your Python code queries SQLite, there are <strong>zero network calls, zero socket overhead, and zero port configurations</strong>. The entire database is stored in a single standalone binary file on your hard disk (or in RAM with <code>":memory:"</code>).</p>

        <div class="diagram-box">┌──────────────────────────────────────────────┐  ┌──────────────────────────────────────────────┐
│       TRADITIONAL CLIENT-SERVER DATABASE     │  │          SQLITE EMBEDDED ARCHITECTURE        │
│                                              │  │                                              │
│  Python App  ───(Network TCP Socket)───>     │  │  ┌────────────────────────────────────────┐  │
│                                              │  │  │ Python Script (sqlite3 standard lib)   │  │
│  Remote Database Server (Postgres Daemon)    │  │  │       │ (Direct In-Memory C-Call)      │  │
│  ├── User Auth & Network Port 5432           │  │  │ SQLite Engine (Compiled into Python)   │  │
│  ├── Dedicated RAM & Multi-Process Storage   │  │  └───────────────────┬────────────────────┘  │
│  └── Complex Server Management               │  │                      ▼                       │
│                                              │  │   Single Database File on Disk (app.db)      │
└──────────────────────────────────────────────┘  └──────────────────────────────────────────────┘</div>

        <h4 style="color:#10b981; margin:16px 0 8px;">When should you use SQLite?</h4>
        <ul>
          <li><strong>Desktop and Mobile Applications:</strong> SQLite is the internal database engine used inside Android, iOS, Windows 11, macOS, Google Chrome, and Firefox.</li>
          <li><strong>Local Testing & Prototyping:</strong> Develop and run automated unit tests at lightning speed using in-memory databases (<code>":memory:"</code>).</li>
          <li><strong>Low-to-Medium Traffic Web Apps:</strong> Websites handling up to ~100,000 requests/day with mostly read operations perform exceptionally well on SQLite (using Write-Ahead Logging / WAL mode).</li>
        </ul>`,
        code: `import sqlite3

# 1. Establish connection to local SQLite database file:
# If 'company.db' does not exist, SQLite automatically creates it on disk!
conn = sqlite3.connect("company.db")

# 2. Create a Cursor:
# The cursor acts as our execution pointer to send SQL commands to the engine:
cursor = conn.cursor()

# 3. Create 'departments' table using DDL (Data Definition Language):
cursor.execute("""
CREATE TABLE IF NOT EXISTS departments (
    dept_id INTEGER PRIMARY KEY AUTOINCREMENT,
    dept_name TEXT NOT NULL UNIQUE,
    budget REAL NOT NULL
)
""")

# 4. Create 'employees' table with Foreign Key linking to departments:
cursor.execute("""
CREATE TABLE IF NOT EXISTS employees (
    emp_id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    salary REAL NOT NULL,
    dept_id INTEGER,
    joined_date DATE DEFAULT CURRENT_DATE,
    FOREIGN KEY (dept_id) REFERENCES departments(dept_id)
)
""")

conn.commit() # Flush and save schema changes permanently to disk
print("✅ Database 'company.db' initialized with relational departments and employees tables!")
conn.close()`,
        codeTitle: 'Example 1: Establishing SQLite Connection and Creating Relational Tables',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Step-by-Step Code Walkthrough:</strong>
          <ol style="margin:8px 0 0 18px; line-height:1.7;">
            <li><code>sqlite3.connect("company.db")</code> opens a file handle to <code>company.db</code> in the current folder. If you pass <code>":memory:"</code>, SQLite creates a temporary RAM database that vanishes when Python closes.</li>
            <li><code>cursor = conn.cursor()</code> creates an execution context that tracks query state and fetches result sets.</li>
            <li><code>TEXT NOT NULL UNIQUE</code> enforces data integrity: every employee must have an email, and no two employees can share the same email address.</li>
            <li><code>conn.commit()</code> commits the transaction to non-volatile disk storage.</li>
          </ol>
        </div>`
      },
      {
        title: '3. Data Manipulation: Inserting, Querying, Updating & Deleting (CRUD)',
        body: `<p><strong>CRUD</strong> stands for the four essential data operations in software engineering: <strong>Create</strong> (<code>INSERT</code>), <strong>Read</strong> (<code>SELECT</code>), <strong>Update</strong> (<code>UPDATE</code>), and <strong>Delete</strong> (<code>DELETE</code>).</p>
        
        <h4 style="color:#10b981; margin:16px 0 8px;">1. Inserting Records (Single vs Batch <code>executemany</code>):</h4>
        <p>Every time you execute an individual <code>INSERT</code> with a commit, SQLite must sync bytes to the physical storage disk (fsync). If you insert 1,000 records one by one in a loop, it will take several seconds.</p>
        <p>By using <strong><code>cursor.executemany()</code></strong>, all 1,000 records are prepared and inserted in a single disk I/O operation in under <strong>5 milliseconds</strong>!</p>

        <h4 style="color:#10b981; margin:16px 0 8px;">2. Querying Data & Row Factories (<code>sqlite3.Row</code>):</h4>
        <p>By default, SQLite returns query results as plain tuples: <code>(1, 'Balaji', 95000.0)</code>. Accessing fields by numerical indices like <code>row[1]</code> or <code>row[2]</code> makes code brittle and unreadable.</p>
        <p>By configuring <strong><code>conn.row_factory = sqlite3.Row</code></strong>, SQLite returns rich mapping objects that allow accessing columns <strong>both by case-insensitive column name</strong> (<code>row['full_name']</code>) and by index!</p>`,
        code: `import sqlite3

# Connect to database and configure row_factory:
conn = sqlite3.connect("company.db")
conn.row_factory = sqlite3.Row  # Enables column-name dictionary access!
cursor = conn.cursor()

# Enable SQLite foreign key enforcement:
cursor.execute("PRAGMA foreign_keys = ON")

# 1. CREATE: Batch Insert Departments:
departments_data = [
    ("Engineering", 5000000.0),
    ("Product Design", 2000000.0),
    ("Human Resources", 1200000.0)
]
cursor.executemany("INSERT OR IGNORE INTO departments (dept_name, budget) VALUES (?, ?)", departments_data)

# Batch Insert Employees:
employees_data = [
    ("Balaji Dev", "balaji.dev@company.com", 95000.0, 1),
    ("Alex Smith", "alex.smith@company.com", 82000.0, 1),
    ("Chloe Davis", "chloe.d@company.com", 78000.0, 2),
    ("David Miller", "david.m@company.com", 65000.0, 3)
]
cursor.executemany("INSERT OR IGNORE INTO employees (full_name, email, salary, dept_id) VALUES (?, ?, ?, ?)", employees_data)
conn.commit()

# 2. READ: Query Employees joined with their Department names:
print("--- 📋 Active Employees Report (SQL JOIN Query) ---")
cursor.execute("""
SELECT e.emp_id, e.full_name, e.salary, d.dept_name
FROM employees e
JOIN departments d ON e.dept_id = d.dept_id
WHERE e.salary >= ?
ORDER BY e.salary DESC
""", (70000.0,))

high_earners = cursor.fetchall()
for emp in high_earners:
    # Notice clean dictionary-like column access:
    print(f"• ID #{emp['emp_id']}: {emp['full_name']:18} | Dept: {emp['dept_name']:15} | Salary: ₹{emp['salary']:,.2f}")

# 3. UPDATE: Give 10% raise to all Engineering employees:
cursor.execute("""
UPDATE employees
SET salary = salary * 1.10
WHERE dept_id = (SELECT dept_id FROM departments WHERE dept_name = 'Engineering')
""")
print(f"\\n📈 Promoted {cursor.rowcount} engineering employees with a 10% salary raise!")

# 4. DELETE: Remove an employee record safely:
cursor.execute("DELETE FROM employees WHERE email = ?", ("david.m@company.com",))
print(f"🗑️ Deleted {cursor.rowcount} employee record.")

conn.commit()
conn.close()`,
        codeTitle: 'Example 2: Complete Relational CRUD & JOIN Queries with sqlite3.Row',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Deep Dive into CRUD Mechanics:</strong>
          <ul style="margin:8px 0 0 18px; line-height:1.7;">
            <li><code>JOIN departments d ON e.dept_id = d.dept_id</code> combines data from two tables in memory using the foreign key relationship.</li>
            <li><code>cursor.rowcount</code> returns the exact number of rows modified by the last UPDATE or DELETE statement.</li>
            <li><code>PRAGMA foreign_keys = ON</code> is required in SQLite because backward compatibility disables foreign key enforcement by default.</li>
          </ul>
        </div>`
      }
    ],
    mistake: {
      title: 'Assuming SQLite Enforces Foreign Keys by Default Without PRAGMA',
      text: 'In SQLite, foreign key enforcement is DISABLED by default for backward compatibility with SQLite 2.0. You must explicitly execute "PRAGMA foreign_keys = ON" on every newly opened connection, otherwise invalid foreign keys will be silently accepted into your database!'
    },
    tryIt: {
      desc: 'Create an in-memory SQLite table inventory (item_id, name, quantity). Insert 3 items, update the quantity of one item, and select all items with quantity > 10 using sqlite3.Row.',
      code: `import sqlite3

conn = sqlite3.connect(":memory:")
conn.row_factory = sqlite3.Row
cur = conn.cursor()

cur.execute("CREATE TABLE inventory (item_id INTEGER PRIMARY KEY, name TEXT, quantity INTEGER)")
cur.executemany("INSERT INTO inventory VALUES (?, ?, ?)", [
    (1, "SSD 1TB", 25),
    (2, "RAM 16GB DDR5", 8),
    (3, "Power Supply 750W", 14)
])
cur.execute("UPDATE inventory SET quantity = 30 WHERE item_id = 1")
conn.commit()

cur.execute("SELECT * FROM inventory WHERE quantity > 10")
for row in cur.fetchall():
    print(f"Item #{row['item_id']}: {row['name']} (In Stock: {row['quantity']})")
conn.close()`
    },
    faqs: [
      {
        q: 'Why should I use SQLite instead of JSON or CSV files for desktop apps?',
        a: 'SQLite provides instant O(log N) indexing, zero-risk atomic transactions (preventing file corruption on power cut), concurrency management, and relational foreign keys, all inside a single self-contained file with zero installation overhead.'
      },
      {
        q: 'How large can an SQLite database grow on disk?',
        a: 'SQLite supports databases up to 281 Terabytes in size and tables with up to 1 billion rows, making it capable of handling large datasets.'
      },
      {
        q: 'What is Write-Ahead Logging (WAL) in SQLite?',
        a: 'WAL mode (PRAGMA journal_mode=WAL;) writes modifications to a separate .wal log file before committing to the main database file. This allows simultaneous readers to read uninterrupted while a writer writes, increasing read/write throughput.'
      }
    ]
  },

  // =========================================================================
  // CHAPTER 43: PARAMETERIZED QUERIES & TRANSACTIONS
  // =========================================================================
  {
    num: 43,
    phaseId: 'phase9',
    phaseTitle: 'Phase 9: Databases and APIs',
    slug: '43-python-parameterized-queries-and-transactions',
    title: 'Parameterized Queries & Transactions',
    badge: '43. Safe Queries & Transactions',
    subtopics: 'SQL Injection Deep Dive · String Formatting Hazards · Parameterized Placeholders (?) · ACID Principles · commit() & rollback() · Transaction Context Managers',
    desc: 'Master database security and data integrity in Python: in-depth breakdown of SQL Injection mechanics, parameterized query binding, the 4 pillars of ACID transactions (Atomicity, Consistency, Isolation, Durability), and managing transactions using Python context managers.',
    sections: [
      {
        title: '1. In-Depth: The Mechanics of SQL Injection & How Parameterization Works',
        body: `<p><strong>SQL Injection (SQLi)</strong> has remained among the top security threats in web applications for over two decades. Understanding the compiler-level mechanics of why SQL injection happens is essential for every software engineer.</p>

        <h4 style="color:#ef4444; margin:16px 0 8px;">How String Concatenation Corrupts SQL Bytecode:</h4>
        <p>When you construct a query using Python f-strings or string concatenation:</p>
        <pre style="background:#1e1e1e; padding:12px; border-radius:6px; color:#f87171;"><code># DANGEROUS VULNERABLE CODE:
username = input("Enter username: ")
password = input("Enter password: ")
query = f"SELECT * FROM users WHERE user = '{username}' AND pass = '{password}'"</code></pre>
        <p>If an attacker inputs <code>admin' --</code> for the username, the resulting string sent to the database parser becomes:</p>
        <pre style="background:#1e1e1e; padding:12px; border-radius:6px; color:#f87171;"><code>SELECT * FROM users WHERE user = 'admin' --' AND pass = '...'</code></pre>
        <p>In SQL syntax, <code>--</code> indicates a <strong>comment</strong>. The SQL parser completely ignores everything following the comment, executing only <code>WHERE user = 'admin'</code>. The attacker logs into the admin account without knowing the password!</p>

        <div class="diagram-box">┌────────────────────────────────────────────────────────────────────────┐
│             VULNERABLE VS PARAMETERIZED QUERY COMPILATION              │
├────────────────────────────────────────────────────────────────────────┤
│  ❌ STRING CONCATENATION:                                              │
│  "SELECT * FROM users WHERE name = '" + user_input + "'"               │
│  └── Code & Data are parsed TOGETHER in one pass. User input can       │
│      inject SQL commands, alter boolean logic, or drop tables!         │
│                                                                        │
│  ✅ PARAMETERIZED QUERY (? PLACEHOLDER):                               │
│  cursor.execute("SELECT * FROM users WHERE name = ?", (user_input,))   │
│  ├── Step 1: SQL Template is compiled into execution bytecode FIRST.  │
│  └── Step 2: User input is bound STRICTLY AS LITERAL DATA VALUE.       │
│      Even if user inputs "' OR '1'='1", it is treated as a literal     │
│      string of 10 characters, never as executable SQL code!            │
└────────────────────────────────────────────────────────────────────────┘</div>`,
        code: `import sqlite3

conn = sqlite3.connect(":memory:")
conn.row_factory = sqlite3.Row
cur = conn.cursor()

cur.execute("CREATE TABLE users (id INTEGER PRIMARY KEY, username TEXT, password_hash TEXT, role TEXT)")
cur.executemany("INSERT INTO users VALUES (?, ?, ?, ?)", [
    (1, "admin", "hash_secret_9988", "SuperAdmin"),
    (2, "ravi", "hash_pass_1234", "User"),
    (3, "balaji", "hash_pass_5678", "Developer")
])
conn.commit()

# Malicious user inputs designed to bypass authentication:
malicious_payload = "admin' OR '1'='1"

print("--- 🛡️ Testing Secure Parameterized Query Defense ---")
# Parameterized query with '?' placeholder:
cur.execute("SELECT * FROM users WHERE username = ?", (malicious_payload,))
matched_users = cur.fetchall()

print(f"Query matched {len(matched_users)} user accounts.")
if len(matched_users) == 0:
    print("✅ Attack neutralized! Database safely treated input as a literal string.")

conn.close()`,
        codeTitle: 'Example 1: Demonstrating SQL Injection Defense with Parameterized Placeholders',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 The Mathematical Safety Guarantee:</strong>
          <p style="margin-top:6px;">Because the SQL syntax tree is compiled before parameters are bound, no amount of quotes, semicolons (<code>; DROP TABLE</code>), or SQL keywords inside <code>malicious_payload</code> can modify the query's AST (Abstract Syntax Tree).</p>
        </div>`
      },
      {
        title: '2. The 4 Pillars of ACID & Transaction Management (commit vs rollback)',
        body: `<p>In database engineering, a <strong>Transaction</strong> is a sequence of one or more SQL operations executed as an indivisible unit. Transactions are governed by the <strong>ACID properties</strong>:</p>
        <table class="tbl" style="margin-top:8px; font-size:12.5px;">
          <tr><th>Pillar</th><th>Full Name</th><th>Core Principle</th></tr>
          <tr><td><strong>A</strong></td><td><strong>Atomicity</strong></td><td><strong>All or Nothing:</strong> If any single SQL statement fails or crashes, 100% of the entire transaction is cancelled and undone via <code>rollback()</code>.</td></tr>
          <tr><td><strong>C</strong></td><td><strong>Consistency</strong></td><td>Transactions take the database from one valid state to another, maintaining all schema constraints (uniqueness, foreign keys).</td></tr>
          <tr><td><strong>I</strong></td><td><strong>Isolation</strong></td><td>Concurrent operations execute independently without seeing incomplete, uncommitted intermediate states of other transactions.</td></tr>
          <tr><td><strong>D</strong></td><td><strong>Durability</strong></td><td>Once <code>commit()</code> returns successfully, data is permanently persisted to disk and survives system power outages.</td></tr>
        </table>`,
        code: `import sqlite3

conn = sqlite3.connect(":memory:")
conn.row_factory = sqlite3.Row
cur = conn.cursor()

cur.execute("CREATE TABLE wallets (wallet_id TEXT PRIMARY KEY, owner TEXT, balance REAL CHECK(balance >= 0))")
cur.executemany("INSERT INTO wallets VALUES (?, ?, ?)", [
    ("W101", "Balaji", 15000.0),
    ("W102", "Alex", 2000.0)
])
conn.commit()

def execute_money_transfer(sender_id, receiver_id, amount):
    """Executes a financial transfer with guaranteed ACID atomicity."""
    print(f"\\n--- 💸 Initiating Transfer: ₹{amount:,.2f} from {sender_id} -> {receiver_id} ---")
    try:
        # 1. Deduct from sender:
        cur.execute("UPDATE wallets SET balance = balance - ? WHERE wallet_id = ?", (amount, sender_id))
        
        # 2. Simulate intermediate validation:
        if amount > 50000:
            raise ValueError("Transfer exceeds anti-fraud transaction ceiling limit (₹50,000)!")

        # 3. Credit to receiver:
        cur.execute("UPDATE wallets SET balance = balance + ? WHERE wallet_id = ?", (amount, receiver_id))
        
        # 4. Commit all statements together:
        conn.commit()
        print("✅ Transaction COMMITTED: Both accounts updated in sync!")
    except Exception as err:
        # 5. Rollback: Undo every modification in this transaction:
        conn.rollback()
        print(f"🛑 Transaction ABORTED & ROLLED BACK: {err}")

# Test 1: Valid Transfer
execute_money_transfer("W101", "W102", 5000.0)

# Test 2: Invalid Transfer (Attempting to transfer more than balance or limit)
execute_money_transfer("W101", "W102", 90000.0)

# Inspect final balances:
cur.execute("SELECT * FROM wallets")
print("\\n--- Current Wallet Balances ---")
for w in cur.fetchall():
    print(f"• {w['owner']} ({w['wallet_id']}): ₹{w['balance']:,.2f}")

conn.close()`,
        codeTitle: 'Example 2: Financial Wallet Transfer with ACID Rollback Protection',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Why CHECK(balance >= 0) is Powerful:</strong>
          <p style="margin-top:6px;">The database table definition includes <code>CHECK(balance >= 0)</code>. If an UPDATE statement tries to reduce a balance below zero, SQLite throws an <code>IntegrityError</code> and aborts the statement immediately!</p>
        </div>`
      }
    ],
    mistake: {
      title: 'Manual Error Checking Instead of Transaction Rollback',
      text: 'Writing code that manually tries to "undo" changes by executing inverse UPDATE queries if an error occurs is dangerous and buggy. Always use the built-in conn.rollback() method provided by the database engine.'
    },
    tryIt: {
      desc: 'Use Python context manager with conn: to wrap two INSERT statements. If the second insert raises an error, verify that the first insert is automatically rolled back.',
      code: `import sqlite3

conn = sqlite3.connect(":memory:")
cur = conn.cursor()
cur.execute("CREATE TABLE logs (id INTEGER PRIMARY KEY, msg TEXT UNIQUE)")

try:
    with conn: # Python context manager auto-commits or auto-rolls back!
        cur.execute("INSERT INTO logs VALUES (1, 'Log entry A')")
        cur.execute("INSERT INTO logs VALUES (2, 'Log entry A')") # UNIQUE violation!
except sqlite3.IntegrityError:
    print("Caught IntegrityError! Entire block was rolled back automatically.")

cur.execute("SELECT COUNT(*) FROM logs")
print("Total rows in logs table:", cur.fetchone()[0]) # 0 rows! Perfect rollback!
conn.close()`
    },
    faqs: [
      {
        q: 'Why should I use "with conn:" instead of manual commit/rollback calls?',
        a: 'When using "with conn:", Python automatically calls conn.commit() if the block finishes without exception, and automatically executes conn.rollback() if any exception is raised, eliminating boilerplate try-except-finally blocks.'
      },
      {
        q: 'What is the difference between table-level locking and row-level locking?',
        a: 'Table-level locking (used by default in SQLite) locks the entire table during writes. Row-level locking (used by PostgreSQL and MySQL InnoDB) locks only the specific rows being updated, allowing other transactions to modify different rows simultaneously.'
      },
      {
        q: 'Can SQL Injection occur in ORMs like SQLAlchemy?',
        a: 'Standard ORM methods (like session.query(User).filter_by(name=user_input)) use parameterized queries automatically and are completely immune to SQLi. However, if you execute raw SQL strings via text(f"..."), SQLi vulnerabilities can still occur.'
      }
    ]
  },

  // =========================================================================
  // CHAPTER 44: POSTGRESQL, MYSQL & SQLALCHEMY ORM
  // =========================================================================
  {
    num: 44,
    phaseId: 'phase9',
    phaseTitle: 'Phase 9: Databases and APIs',
    slug: '44-python-postgresql-mysql-and-sqlalchemy-orm',
    title: 'PostgreSQL, MySQL & SQLAlchemy ORM',
    badge: '44. Enterprise DBs & SQLAlchemy',
    subtopics: 'Enterprise DB Architecture · PostgreSQL vs MySQL · The ORM Pattern · SQLAlchemy 2.0 DeclarativeBase · Mapped Columns · Session CRUD Lifecycle',
    desc: 'Master enterprise databases and Object-Relational Mapping (ORM) in Python: client-server database comparison (PostgreSQL vs MySQL), why modern teams use ORMs, building type-safe data models with SQLAlchemy 2.0, and executing production CRUD operations with Sessions.',
    sections: [
      {
        title: '1. Enterprise Databases: PostgreSQL vs MySQL Architecture',
        body: `<p>In large-scale production environments with millions of concurrent users, applications use dedicated <strong>Client-Server Database Clusters</strong>:</p>
        
        <h4 style="color:#10b981; margin:16px 0 8px;">PostgreSQL ("The World's Most Advanced Open Source Relational Database"):</h4>
        <ul>
          <li><strong>Architecture:</strong> Multi-process architecture using <strong>MVCC (Multi-Version Concurrency Control)</strong>, meaning readers never block writers, and writers never block readers.</li>
          <li><strong>Advanced Features:</strong> Native JSONB binary indexing, geospatial data with PostGIS, vector similarity search with <code>pgvector</code> (for AI and LLM embeddings), full-text search, and custom data types.</li>
          <li><strong>Python Drivers:</strong> <code>psycopg</code> (Psycopg 3) and <code>asyncpg</code> (high-performance asynchronous driver).</li>
        </ul>

        <h4 style="color:#10b981; margin:16px 0 8px;">MySQL ("The Web Standard RDBMS"):</h4>
        <ul>
          <li><strong>Architecture:</strong> Multi-threaded architecture powered by the <strong>InnoDB storage engine</strong>.</li>
          <li><strong>Strengths:</strong> Optimized for high-throughput, read-heavy workloads (powers WordPress, Wikipedia, and large web portals).</li>
          <li><strong>Python Drivers:</strong> <code>mysql-connector-python</code> and <code>PyMySQL</code>.</li>
        </ul>`,
        code: `# Database Connection String (DSN) URL Anatomy:
# Format: dialect+driver://username:password@host:port/database_name

dsn_examples = {
    "PostgreSQL (Standard)": "postgresql+psycopg://postgres_user:secret_pass@127.0.0.1:5432/ecommerce_db",
    "PostgreSQL (Async)":     "postgresql+asyncpg://postgres_user:secret_pass@127.0.0.1:5432/ecommerce_db",
    "MySQL (PyMySQL)":        "mysql+pymysql://db_user:secret_pass@127.0.0.1:3306/ecommerce_db",
    "SQLite (Local File)":    "sqlite:///production_store.db",
    "SQLite (In-Memory)":     "sqlite:///:memory:"
}

print("--- 🌐 Standard Database Connection URI Patterns ---")
for db_type, uri in dsn_examples.items():
    print(f"• {db_type:22}: {uri}")`,
        codeTitle: 'Reference: Standard Database Connection URLs (DSNs)',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 The 12-Factor App Rule:</strong>
          <p style="margin-top:6px;">Never hardcode database URLs or passwords in Python files. Always load the connection string from an environment variable: <code>DATABASE_URL = os.getenv("DATABASE_URL")</code>.</p>
        </div>`
      },
      {
        title: '2. The ORM Paradigm: What is SQLAlchemy & Why Use It?',
        body: `<p>An <strong>Object-Relational Mapper (ORM)</strong> maps database tables to native Python classes, columns to class attributes, and table rows to class instances.</p>

        <h4 style="color:#10b981; margin:16px 0 8px;">The 4 Major Advantages of an ORM:</h4>
        <ol style="line-height:1.8; margin-left:20px;">
          <li><strong>Type Safety & IDE Autocomplete:</strong> With modern SQLAlchemy 2.0 type annotations (<code>Mapped[str]</code>, <code>Mapped[int]</code>), your IDE provides instant autocomplete for every column and catches type bugs before runtime.</li>
          <li><strong>Dialect Independence:</strong> Write Python code once; SQLAlchemy translates it into PostgreSQL, MySQL, SQLite, or Oracle SQL syntax automatically.</li>
          <li><strong>Automatic Migration Tooling (Alembic):</strong> As your application evolves, schema changes (adding columns, renaming tables) are tracked and applied automatically via version-controlled migration scripts.</li>
          <li><strong>Native Object Lifecycle & Unit of Work:</strong> Modify an object property (<code>user.email = "new@mail.com"</code>) and the SQLAlchemy Session automatically tracks the modification ("dirty checking") and generates the exact SQL <code>UPDATE</code> statement upon commit!</li>
        </ol>`,
        code: `from typing import Optional
from sqlalchemy import create_engine, String, Float, Integer, select
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, Session

# 1. Base class for all SQLAlchemy 2.0 Models:
class Base(DeclarativeBase):
    pass

# 2. Define the 'Course' Entity Model:
class Course(Base):
    __tablename__ = "courses"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    title: Mapped[str] = mapped_column(String(100), nullable=False)
    instructor: Mapped[str] = mapped_column(String(50), nullable=False)
    price: Mapped[float] = mapped_column(Float, default=0.0)

    def __repr__(self) -> str:
        return f"<Course(id={self.id}, title='{self.title}', price=₹{self.price:,.2f})>"

# 3. Create the Database Engine (Connection Pool):
engine = create_engine("sqlite:///:memory:", echo=False)

# 4. Create all registered tables in database schema:
Base.metadata.create_all(engine)

# 5. Manage Transaction Lifecycle with a Session Context Manager:
with Session(engine) as session:
    # CREATE:
    c1 = Course(title="Python 3 Masterclass 2026", instructor="Balaji", price=1499.0)
    c2 = Course(title="FastAPI Microservices", instructor="Alex", price=1999.0)
    c3 = Course(title="Data Structures & Algorithms", instructor="Chloe", price=999.0)
    
    session.add_all([c1, c2, c3])
    session.commit()
    print("✅ Created 3 Course records in database!")

    # READ: Query with modern 2.0 select() statements:
    query = select(Course).where(Course.price >= 1000.0).order_by(Course.price.desc())
    premium_courses = session.scalars(query).all()
    
    print("\\n--- 🎓 Premium Courses (Price >= ₹1,000) ---")
    for course in premium_courses:
        print("•", course)

    # UPDATE: Give discount to FastAPI course via dirty-checking:
    fastapi_course = session.scalar(select(Course).where(Course.title.contains("FastAPI")))
    if fastapi_course:
        fastapi_course.price = 1299.0  # Just assign new attribute value!
        session.commit()              # SQLAlchemy auto-generates UPDATE query!
        print(f"\\n🏷️ Discount applied: {fastapi_course}")`,
        codeTitle: 'Example 2: Complete SQLAlchemy 2.0 Declarative Model and Session CRUD',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 SQLAlchemy 2.0 Architecture Breakdown:</strong>
          <ul style="margin:8px 0 0 18px; line-height:1.7;">
            <li><code>Mapped[T]</code>: PEP 484 type hint informing both Python type checkers and SQLAlchemy what SQL type to generate.</li>
            <li><code>session.scalars(query).all()</code>: Returns a clean list of <code>Course</code> Python objects rather than raw database tuples.</li>
            <li><code>Dirty Checking</code>: When you modify <code>fastapi_course.price</code>, the Session detects the change and flushes the minimal SQL update upon <code>commit()</code>.</li>
          </ul>
        </div>`
      }
    ],
    mistake: {
      title: 'Mixing SQLAlchemy 1.x Query Syntax with 2.0 Code',
      text: 'In SQLAlchemy 2.0, legacy patterns like session.query(Course).filter(...) are deprecated. Always use the new 2.0 syntax: session.scalars(select(Course).where(...)).all().'
    },
    tryIt: {
      desc: 'Create an Author model in SQLAlchemy with id, name, and total_books. Create an in-memory session, add two authors, and select the author with the most books.',
      code: `from sqlalchemy import create_engine, String, Integer, select
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, Session

class Base(DeclarativeBase): pass

class Author(Base):
    __tablename__ = "authors"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(50))
    total_books: Mapped[int] = mapped_column(Integer)

engine = create_engine("sqlite:///:memory:")
Base.metadata.create_all(engine)

with Session(engine) as session:
    session.add_all([
        Author(id=1, name="Luciano Ramalho", total_books=2),
        Author(id=2, name="Robert C. Martin", total_books=6)
    ])
    session.commit()

    top = session.scalar(select(Author).order_by(Author.total_books.desc()))
    print(f"Top Author: {top.name} with {top.total_books} books!")`
    },
    faqs: [
      {
        q: 'What is Alembic in the Python ecosystem?',
        a: 'Alembic is the official database migration tool for SQLAlchemy. It inspects your Python model classes and automatically generates versioned SQL upgrade/downgrade migration scripts as your database schema evolves.'
      },
      {
        q: 'What is Connection Pooling in SQLAlchemy?',
        a: 'Establishing a new TCP connection to PostgreSQL or MySQL takes 20-50 milliseconds. SQLAlchemy Engine maintains a pool of pre-opened active connections in memory, instantly reusing them for incoming requests and dramatically increasing web performance.'
      },
      {
        q: 'When should I write raw SQL instead of using an ORM?',
        a: 'For complex multi-table analytical reporting queries (with 8+ JOINs, window functions, and aggregations across millions of rows), raw SQL or SQLAlchemy Core (select() without ORM mapping) provides optimal query execution speed.'
      }
    ]
  },

  // =========================================================================
  // CHAPTER 45: HTTP REQUESTS & REST APIS
  // =========================================================================
  {
    num: 45,
    phaseId: 'phase9',
    phaseTitle: 'Phase 9: Databases and APIs',
    slug: '45-python-http-requests-and-rest-apis',
    title: 'Python HTTP & REST API Guide',
    badge: '45. REST APIs & HTTP',
    subtopics: 'What is an API? · REST Architectural Constraints · HTTP Request Methods (GET, POST, PUT, PATCH, DELETE) · Status Codes · JSON Deserialization',
    desc: 'Master HTTP networking and REST API integration in Python: understanding the Client-Server model, REST constraints, the 5 core HTTP methods, HTTP response status code categories (2xx, 3xx, 4xx, 5xx), and consuming JSON APIs with Python.',
    sections: [
      {
        title: '1. What is an API? REST Architecture & The HTTP Protocol Anatomy',
        body: `<p>An <strong>API (Application Programming Interface)</strong> is a standardized communication contract that allows two independent software systems to exchange data over a network, regardless of the programming language or operating system each system is written in.</p>
        
        <h4 style="color:#10b981; margin:16px 0 8px;">The REST (Representational State Transfer) Paradigm:</h4>
        <p><strong>REST</strong> is an architectural style designed by Roy Fielding in 2000 that governs how web services communicate over HTTP:</p>
        <ul>
          <li><strong>Client-Server Separation:</strong> The user interface (React, mobile app) and the data storage backend (Python FastAPI/Django) operate independently.</li>
          <li><strong>Statelessness:</strong> The server does not remember previous requests. Every single HTTP request from the client must carry all required authentication tokens and context.</li>
          <li><strong>Resource-Oriented URIs:</strong> Resources are represented by clear nouns, not verbs:
            <ul>
              <li><code>GET /api/v1/users</code> (Fetch all users)</li>
              <li><code>POST /api/v1/users</code> (Create a user)</li>
              <li><code>GET /api/v1/users/42</code> (Fetch user with ID 42)</li>
              <li><code>DELETE /api/v1/users/42</code> (Delete user with ID 42)</li>
            </ul>
          </li>
        </ul>

        <div class="diagram-box">┌────────────────────────────────────────────────────────────────────────┐
│                      HTTP REQUEST / RESPONSE LIFECYCLE                 │
├────────────────────────────────────────────────────────────────────────┤
│  CLIENT (Python App) ───[ HTTP Request Packet ]─────────────────────>  │
│  ├── Method & Endpoint: POST /api/v1/orders HTTP/1.1                   │
│  ├── Headers:           Host: api.store.com                            │
│  │                      Authorization: Bearer token_xyz                │
│  │                      Content-Type: application/json                 │
│  └── Body (JSON):       {"item_id": 99, "quantity": 2}                 │
│                                                                        │
│  <──────────────────────[ HTTP Response Packet ]─── SERVER (API Server)│
│  ├── Status Line:       HTTP/1.1 201 Created                           │
│  ├── Response Headers:  Content-Type: application/json; charset=utf-8  │
│  └── Response Body:     {"order_id": 8412, "status": "Confirmed"}     │
└────────────────────────────────────────────────────────────────────────┘</div>`,
        code: `# Exploring HTTP Status Code Meanings and Classifications:
status_code_dictionary = {
    200: ("OK", "Standard success response for GET, PUT, PATCH requests"),
    201: ("Created", "Resource successfully created on server (POST response)"),
    204: ("No Content", "Action succeeded, response body is intentionally empty (DELETE)"),
    400: ("Bad Request", "Malformed payload or missing required request fields"),
    401: ("Unauthorized", "Missing or invalid authentication token/credentials"),
    403: ("Forbidden", "Authenticated user lacks permissions to access this resource"),
    404: ("Not Found", "Target resource endpoint or ID does not exist on server"),
    429: ("Too Many Requests", "Client exceeded API rate limit ceiling"),
    500: ("Internal Server Error", "Unhandled exception or crash on remote server"),
    503: ("Service Unavailable", "Server is down for maintenance or overloaded")
}

print("--- 🌐 Core HTTP Status Code Reference ---")
for code, (label, meaning) in status_code_dictionary.items():
    emoji = "✅" if code < 300 else ("⚠️" if code < 500 else "🔥")
    print(f"{emoji} HTTP {code} [{label:20}]: {meaning}")`,
        codeTitle: 'Reference: Complete HTTP Status Code Classification',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 REST Best Practice:</strong>
          <p style="margin-top:6px;">A well-designed REST API always returns the appropriate HTTP status code. Returning HTTP 200 with an error body <code>{"error": "User not found"}</code> is an anti-pattern; it should return HTTP <code>404 Not Found</code>.</p>
        </div>`
      },
      {
        title: '2. Making REST Requests: GET, POST, PUT, DELETE with requests',
        body: `<p>In Python, the <strong><code>requests</code> library</strong> is the industry standard tool for HTTP communication. It abstracts low-level socket programming into clean, intuitive methods:</p>
        <ul>
          <li><code>requests.get(url, params={...})</code>: Queries data and attaches URL query parameters.</li>
          <li><code>requests.post(url, json={...})</code>: Serializes a dictionary to JSON and sends it in the HTTP request body.</li>
          <li><code>requests.put(url, json={...})</code>: Replaces an entire existing resource.</li>
          <li><code>requests.patch(url, json={...})</code>: Partially updates specific fields on a resource.</li>
          <li><code>requests.delete(url)</code>: Removes the resource from the server.</li>
        </ul>`,
        code: `import json

# Comprehensive REST Client Architecture Simulation:
class SimulatedRESTClient:
    """Demonstrates complete HTTP REST CRUD operations."""

    def __init__(self, base_url="https://api.example.com/v1"):
        self.base_url = base_url

    def get_user_profile(self, user_id):
        endpoint = f"{self.base_url}/users/{user_id}"
        print(f"👉 [GET] Requesting: {endpoint}")
        # Simulated successful 200 OK response:
        return {"status_code": 200, "data": {"id": user_id, "name": "Balaji", "role": "Engineer"}}

    def create_user(self, payload):
        endpoint = f"{self.base_url}/users"
        print(f"👉 [POST] Creating resource at {endpoint} with payload: {json.dumps(payload)}")
        # Simulated 201 Created response:
        return {"status_code": 201, "data": {"id": 105, **payload, "created_at": "2026-08-14"}}

    def update_user_email(self, user_id, new_email):
        endpoint = f"{self.base_url}/users/{user_id}"
        print(f"👉 [PATCH] Partially updating {endpoint}: {{'email': '{new_email}'}}")
        return {"status_code": 200, "data": {"id": user_id, "email": new_email, "updated": True}}

    def delete_user(self, user_id):
        endpoint = f"{self.base_url}/users/{user_id}"
        print(f"👉 [DELETE] Deleting resource: {endpoint}")
        return {"status_code": 204, "data": None}

# Execute Full CRUD Lifecycle:
client = SimulatedRESTClient()
print("1. GET Request:")
print("   Response:", client.get_user_profile(42))

print("\\n2. POST Request (Create):")
print("   Response:", client.create_user({"name": "Chloe Davis", "email": "chloe@example.com"}))

print("\\n3. PATCH Request (Partial Update):")
print("   Response:", client.update_user_email(42, "balaji.updated@example.com"))

print("\\n4. DELETE Request:")
print("   Response:", client.delete_user(42))`,
        codeTitle: 'Example 2: Complete REST CRUD Method Execution Lifecycle',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 PUT vs PATCH:</strong>
          <p style="margin-top:6px;"><strong>PUT</strong> replaces the entire record (if you omit a field, that field becomes null). <strong>PATCH</strong> modifies only the fields you explicitly specify in the payload, leaving all other existing properties untouched.</p>
        </div>`
      }
    ],
    mistake: {
      title: 'Confusing response.json() with json.loads(response.text)',
      text: 'While json.loads(response.text) works, response.json() is built directly into requests. It uses the server\'s HTTP header charset to decode the body automatically before JSON parsing, preventing character encoding bugs.'
    },
    tryIt: {
      desc: 'Build a Python function parse_api_response(status, raw_json_str) that returns (True, data) if status is 200/201, or (False, error_message) for 4xx/5xx.',
      code: `import json

def parse_api_response(status_code, raw_body_str):
    try:
        data = json.loads(raw_body_str)
        if 200 <= status_code < 300:
            return True, data
        return False, f"Server returned error code {status_code}: {data.get('error', 'Unknown Error')}"
    except json.JSONDecodeError:
        return False, "Failed to parse invalid JSON from server response"

success, res = parse_api_response(200, '{"user": "Balaji", "status": "active"}')
print(f"Status 200: Success={success}, Data={res}")

success_err, res_err = parse_api_response(404, '{"error": "User ID 999 not found"}')
print(f"Status 404: Success={success_err}, Error={res_err}")`
    },
    faqs: [
      {
        q: 'What is CORS (Cross-Origin Resource Sharing)?',
        a: 'CORS is a browser security mechanism that restricts web pages from making HTTP requests to a different domain/port than the one that served the page, unless the backend server includes appropriate "Access-Control-Allow-Origin" headers.'
      },
      {
        q: 'What is the difference between JSON and Python Dictionaries?',
        a: 'A Python dictionary is an in-memory runtime data structure with native Python types. JSON (JavaScript Object Notation) is a standardized text format used for data interchange over networks. Python uses json.dumps() to serialize dictionaries to JSON strings, and json.loads() to deserialize.'
      },
      {
        q: 'What is a webhook in API development?',
        a: 'A webhook is a "reverse API" where the server proactively sends an HTTP POST request to your application URL when an event occurs (e.g. Stripe sending a webhook when a payment succeeds), eliminating the need for periodic polling.'
      }
    ]
  },

  // =========================================================================
  // CHAPTER 46: API HEADERS, AUTHENTICATION & ERROR HANDLING
  // =========================================================================
  {
    num: 46,
    phaseId: 'phase9',
    phaseTitle: 'Phase 9: Databases and APIs',
    slug: '46-python-api-headers-authentication-and-errors',
    title: 'API Auth, Headers & Error Handling',
    badge: '46. API Auth & Headers',
    subtopics: 'Query Parameters vs Headers · Authentication Types (Bearer, API Keys) · Connection & Read Timeouts · response.raise_for_status() · Resilient Retry Strategies',
    desc: 'Master production-grade API development in Python: understanding query parameters vs HTTP headers, implementing API Key and Bearer Token authentication mechanisms, preventing system hangs with timeouts, handling errors with response.raise_for_status(), and connection pooling with Sessions.',
    sections: [
      {
        title: '1. Anatomy of HTTP Headers & Common Authentication Schemes',
        body: `<p>In modern API architecture, communication parameters are split across two channels:</p>
        <table class="tbl" style="margin-top:8px; font-size:12.5px;">
          <tr><th>Channel</th><th>Location</th><th>Primary Purpose</th><th>Example</th></tr>
          <tr><td><strong>Query Parameters</strong></td><td>Appended to the URL path after <code>?</code></td><td>Filtering, sorting, search keywords, and pagination</td><td><code>/products?category=laptops&sort=price_asc&page=2</code></td></tr>
          <tr><td><strong>HTTP Headers</strong></td><td>Metadata transmission alongside the request</td><td>Authentication tokens, content formats, and client identification</td><td><code>Authorization: Bearer eyJhbGci...</code><br><code>User-Agent: MyApp/2.0</code></td></tr>
        </table>

        <h4 style="color:#10b981; margin:16px 0 8px;">The 3 Standard API Authentication Patterns:</h4>
        <ol style="line-height:1.8; margin-left:20px;">
          <li><strong>Bearer Tokens (JWT / OAuth2):</strong> Standardized header format used by modern web and cloud APIs:
            <pre style="background:#1e1e1e; padding:8px 12px; border-radius:4px; color:#34d399;"><code>headers = {"Authorization": f"Bearer {jwt_access_token}"}</code></pre>
          </li>
          <li><strong>Custom Header API Keys:</strong> Used by enterprise SaaS APIs (like OpenAI, Stripe, and AWS API Gateway):
            <pre style="background:#1e1e1e; padding:8px 12px; border-radius:4px; color:#34d399;"><code>headers = {"X-API-Key": "sk_live_9988776655"}</code></pre>
          </li>
          <li><strong>HTTP Basic Authentication:</strong> Base64 encodes <code>username:password</code> into the Authorization header (<code>requests.get(url, auth=('admin', 'secret'))</code>).</li>
        </ol>`,
        code: `import os

def build_secure_headers(api_key: str, client_name: str = "OurCompiler-Client/3.0"):
    """Constructs production-standard authenticated headers."""
    return {
        "Authorization": f"Bearer {api_key}",
        "User-Agent": client_name,
        "Accept": "application/json",
        "Content-Type": "application/json",
        "X-Request-Timestamp": "2026-08-14T10:00:00Z"
    }

# Build and inspect header dictionary:
sample_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.demo_token_payload"
headers = build_secure_headers(sample_token)

print("--- 🛡️ Production Request Headers ---")
for key, value in headers.items():
    masked_value = value[:22] + "..." if key == "Authorization" else value
    print(f"• {key:20}: {masked_value}")`,
        codeTitle: 'Example 1: Building Secure Production Request Headers',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Security Best Practice:</strong>
          <p style="margin-top:6px;">Never log full Authorization tokens in server log files. Always mask sensitive tokens (e.g. <code>eyJhbGci...</code>) to prevent credential leaks in monitoring dashboards.</p>
        </div>`
      },
      {
        title: '2. Timeout Management, Error Trapping & raise_for_status()',
        body: `<p>In production microservices, failing to set a <strong>timeout</strong> is a critical mistake. If a remote API server hangs, your Python worker thread will block indefinitely waiting for a TCP packet that never arrives, exhausting your server's thread pool.</p>

        <h4 style="color:#10b981; margin:16px 0 8px;">The 3 Pillars of Resilient API Consumption:</h4>
        <ol style="line-height:1.8; margin-left:20px;">
          <li><strong>Explicit Timeouts:</strong> Always pass a timeout tuple: <code>timeout=(connect_timeout, read_timeout)</code> (e.g. <code>timeout=(3.05, 10.0)</code>).</li>
          <li><strong>Automated Error Trapping (<code>raise_for_status()</code>):</strong> Converts HTTP 4xx (Client Errors) and 5xx (Server Errors) into catchable Python exceptions.</li>
          <li><strong>Session Connection Pooling (<code>requests.Session()</code>):</strong> Reuses underlying TCP connections (HTTP Keep-Alive), speeding up consecutive API requests by <strong>300-400%</strong>.</li>
        </ol>`,
        code: `import time

class ResilientAPIClient:
    """Production-grade resilient API client with timeout and error handling."""

    def __init__(self, base_url="https://api.github.com"):
        self.base_url = base_url

    def execute_api_call(self, endpoint, simulate_condition="success"):
        """Simulates network request with robust error trapping."""
        print(f"\\n--- 📡 Calling Endpoint: {endpoint} (Condition: {simulate_condition}) ---")
        try:
            if simulate_condition == "timeout":
                # Simulates TCP read timeout:
                raise TimeoutError("Connection timed out after 3.0 seconds")
            elif simulate_condition == "404":
                raise Exception("HTTPError: 404 Client Error: Resource Not Found")
            elif simulate_condition == "500":
                raise Exception("HTTPError: 500 Server Error: Internal Server Crash")
            elif simulate_condition == "connection_refused":
                raise ConnectionRefusedError("Failed to establish TCP connection (DNS failure)")
            
            # Successful response:
            return {"status": "success", "data": {"server_time": "2026-08-14 10:30:00", "ping": "pong"}}
        
        except TimeoutError as timeout_err:
            print(f"⏳ [TIMEOUT TRAPPED] Remote server too slow to respond: {timeout_err}")
            return None
        except ConnectionRefusedError as conn_err:
            print(f"🔌 [NETWORK TRAPPED] Target host unreachable: {conn_err}")
            return None
        except Exception as http_err:
            print(f"❌ [HTTP ERROR TRAPPED] {http_err}")
            return None

# Test all failure scenarios:
client = ResilientAPIClient()
client.execute_api_call("/status", "success")
client.execute_api_call("/users/999", "404")
client.execute_api_call("/checkout", "500")
client.execute_api_call("/slow-query", "timeout")`,
        codeTitle: 'Example 2: Resilient API Error Trapping and Timeout Handling',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Why Session Connection Reuse is Critical:</strong>
          <p style="margin-top:6px;">Every HTTPS request requires a DNS lookup, TCP 3-way handshake, and TLS/SSL certificate negotiation (~100ms total). <code>requests.Session()</code> keeps the socket open, reducing subsequent request overhead to ~5ms!</p>
        </div>`
      }
    ],
    mistake: {
      title: 'Catching Generic "except Exception:" Without Trapping Specific HTTP Exceptions',
      text: 'Catching generic exceptions hides programming bugs (like NameError or Typo bugs). In production, catch specific exceptions from requests: requests.exceptions.Timeout, requests.exceptions.ConnectionError, and requests.exceptions.HTTPError.'
    },
    tryIt: {
      desc: 'Build a function safe_fetch_user(user_id) that returns a fallback dictionary {"name": "Guest", "is_fallback": True} if any network or HTTP error occurs.',
      code: `def safe_fetch_user_simulation(user_id, simulate_fail=False):
    try:
        if simulate_fail:
            raise ConnectionError("Remote server offline")
        return {"user_id": user_id, "name": "Balaji", "is_fallback": False}
    except Exception as err:
        print(f"⚠️ Warning: Could not fetch user #{user_id} ({err}). Returning fallback profile.")
        return {"user_id": user_id, "name": "Guest User", "is_fallback": True}

print("Normal Fetch:  ", safe_fetch_user_simulation(101, False))
print("Fallback Fetch:", safe_fetch_user_simulation(101, True))`
    },
    faqs: [
      {
        q: 'What is Exponential Backoff in API clients?',
        a: 'Exponential Backoff is an algorithm that retries failed requests with exponentially increasing delays (e.g. wait 1s, then 2s, then 4s, then 8s) to avoid overwhelming a recovering server with simultaneous retries.'
      },
      {
        q: 'What is the purpose of the Accept header in HTTP requests?',
        a: 'The "Accept: application/json" header informs the server of the data format the client expects to receive in return (Content Negotiation).'
      },
      {
        q: 'How do I pass query parameters with identical keys in requests?',
        a: 'Pass a list of tuples or a dictionary with list values: requests.get(url, params={"tag": ["python", "fastapi"]}) which compiles to "?tag=python&tag=fastapi".'
      }
    ]
  },

  // =========================================================================
  // CHAPTER 47: DATABASES & APIS CAPSTONE PROJECTS
  // =========================================================================
  {
    num: 47,
    phaseId: 'phase9',
    phaseTitle: 'Phase 9: Databases and APIs',
    slug: '47-python-databases-and-apis-capstone-projects',
    title: 'Databases & APIs Capstone Projects',
    badge: '47. DB & API Capstone',
    subtopics: '4 Full Projects · 1. SQLite E-Commerce Engine · 2. Weather & Stocks Client · 3. SQLAlchemy 2.0 Task Manager · 4. Resilient GitHub Client',
    desc: 'Build four complete real-world database and API systems in Python: an SQLite E-Commerce Inventory Engine with atomic order checkout transactions, a Live Weather & Stock Market REST API Client, a SQLAlchemy 2.0 Task Management CRUD System, and a Resilient GitHub API Client.',
    sections: [
      {
        title: '1. Project 1: SQLite E-Commerce Inventory & Orders Engine',
        body: `<p>A complete relational database application modeling Products and Orders with foreign key constraints, stock availability checks, and atomic checkout transactions:</p>`,
        code: `# =========================================================================
# PROJECT 1: SQLITE E-COMMERCE INVENTORY & ORDERS ENGINE
# =========================================================================
import sqlite3

conn = sqlite3.connect(":memory:")
conn.row_factory = sqlite3.Row
cur = conn.cursor()

# 1. Enable Foreign Key Constraints in SQLite:
cur.execute("PRAGMA foreign_keys = ON")

# 2. Build Relational Schema:
cur.execute("""
CREATE TABLE products (
    product_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    stock INTEGER NOT NULL
)
""")

cur.execute("""
CREATE TABLE orders (
    order_id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_name TEXT NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    total_amount REAL NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products (product_id)
)
""")

# Seed initial catalog:
cur.executemany("INSERT INTO products (name, price, stock) VALUES (?, ?, ?)", [
    ("MacBook Pro M3", 169999.00, 5),
    ("Mechanical Keyboard", 2499.00, 20),
    ("Ultra-Wide 4K Monitor", 34999.00, 3)
])
conn.commit()

def process_order(customer_name, product_id, quantity):
    """Atomic order checkout transaction with inventory deduction."""
    print(f"\\n--- 🛍️ Processing Order: '{customer_name}' buying {quantity}x Product #{product_id} ---")
    try:
        # Check stock:
        cur.execute("SELECT name, price, stock FROM products WHERE product_id = ?", (product_id,))
        product = cur.fetchone()
        if not product:
            raise ValueError("Product does not exist!")
        if product["stock"] < quantity:
            raise ValueError(f"Out of stock! Only {product['stock']} units available.")

        total_cost = product["price"] * quantity

        # Deduct inventory:
        cur.execute("UPDATE products SET stock = stock - ? WHERE product_id = ?", (quantity, product_id))
        
        # Insert Order Record:
        cur.execute("""
        INSERT INTO orders (customer_name, product_id, quantity, total_amount)
        VALUES (?, ?, ?, ?)
        """, (customer_name, product_id, quantity, total_cost))

        conn.commit()
        print(f"✅ Order #{cur.lastrowid} Confirmed! Total: ₹{total_cost:,.2f} ({product['name']})")
    except Exception as err:
        conn.rollback()
        print(f"❌ Order Failed: {err}")

# Test Orders:
process_order("Balaji", 1, 2)  # Success: Buys 2 MacBooks
process_order("Alex", 1, 10)  # Fails: Exceeds remaining stock!
process_order("Chloe", 2, 3)  # Success: Buys 3 Keyboards

# View Final Inventory:
print("\\n--- Current Warehouse Stock ---")
cur.execute("SELECT * FROM products")
for p in cur.fetchall():
    print(f"• #{p['product_id']}: {p['name']:25} | Stock Left: {p['stock']} | Price: ₹{p['price']:,.2f}")

conn.close()`,
        codeTitle: 'Project 1: Relational SQLite E-Commerce Engine',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Architectural Highlights:</strong>
          <ul style="margin:8px 0 0 18px; line-height:1.7;">
            <li><code>PRAGMA foreign_keys = ON</code> ensures that orders cannot reference invalid or non-existent product IDs.</li>
            <li>Atomic transactions guarantee inventory is only deducted if the order row is successfully created.</li>
          </ul>
        </div>`
      },
      {
        title: '2. Project 2: Live Weather & Stock Market REST API Client',
        body: `<p>A modular REST API client for fetching and parsing weather metrics and financial stock tickers:</p>`,
        code: `# =========================================================================
# PROJECT 2: WEATHER & FINANCIAL REST API CLIENT
# =========================================================================

class WeatherStockAPIClient:
    """Client for fetching weather and stock market data."""
    
    def __init__(self, api_key="demo_key"):
        self.api_key = api_key

    def get_weather_report(self, city):
        """Simulates fetching real-time weather metrics."""
        simulated_data = {
            "city": city.title(),
            "temperature_c": 28.5,
            "humidity_percent": 65,
            "condition": "Partly Cloudy ⛅",
            "wind_speed_kmh": 14.2
        }
        return (
            f"🌤️ WEATHER REPORT: {simulated_data['city']}\\n"
            f"  • Temperature: {simulated_data['temperature_c']}°C\\n"
            f"  • Condition:   {simulated_data['condition']}\\n"
            f"  • Humidity:    {simulated_data['humidity_percent']}%\\n"
            f"  • Wind Speed:  {simulated_data['wind_speed_kmh']} km/h"
        )

    def get_stock_quote(self, ticker):
        """Simulates fetching real-time stock ticker price."""
        simulated_quotes = {
            "TCS": {"price": 4250.00, "change_pct": +1.45},
            "INFY": {"price": 1820.50, "change_pct": -0.80},
            "RELIANCE": {"price": 2980.00, "change_pct": +0.65}
        }
        quote = simulated_quotes.get(ticker.upper(), {"price": 1000.0, "change_pct": 0.0})
        symbol = "🟢 +" if quote["change_pct"] >= 0 else "🔴 "
        return f"📈 [{ticker.upper()}] Stock: ₹{quote['price']:,.2f} ({symbol}{quote['change_pct']}%)"

# Run Client Demonstration:
client = WeatherStockAPIClient()
print("--- 🌦️ Live Weather Client ---")
print(client.get_weather_report("Hyderabad"))
print(client.get_weather_report("Bengaluru"))

print("\\n--- 📊 Live Stock Market Quotes ---")
print(client.get_stock_quote("TCS"))
print(client.get_stock_quote("INFY"))`,
        codeTitle: 'Project 2: REST API Weather and Stock Market Client',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 API Abstraction:</strong>
          <p style="margin-top:6px;">Encapsulates API parsing logic behind clean class methods so callers receive structured business domain strings rather than raw HTTP dictionaries.</p>
        </div>`
      },
      {
        title: '3. Project 3: SQLAlchemy 2.0 Task & Project Management System',
        body: `<p>A complete task management application modeling Projects and Tasks using modern SQLAlchemy 2.0 ORM with relational foreign keys and status queries:</p>`,
        code: `# =========================================================================
# PROJECT 3: SQLALCHEMY 2.0 TASK & PROJECT MANAGEMENT SYSTEM
# =========================================================================
from typing import List, Optional
from sqlalchemy import create_engine, String, Boolean, ForeignKey, select
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship, Session

class Base(DeclarativeBase):
    pass

class Project(Base):
    __tablename__ = "projects"

    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(50), nullable=False)
    
    # One-to-Many Relationship:
    tasks: Mapped[List["Task"]] = relationship(back_populates="project", cascade="all, delete-orphan")

    def __repr__(self):
        return f"<Project #{self.id}: {self.title}>"

class Task(Base):
    __tablename__ = "tasks"

    id: Mapped[int] = mapped_column(primary_key=True)
    description: Mapped[str] = mapped_column(String(100), nullable=False)
    is_completed: Mapped[bool] = mapped_column(Boolean, default=False)
    project_id: Mapped[int] = mapped_column(ForeignKey("projects.id"))

    project: Mapped["Project"] = relationship(back_populates="tasks")

    def __repr__(self):
        status = "✅ Done" if self.is_completed else "⏳ In Progress"
        return f"  • Task #{self.id}: {self.description:35} [{status}]"

# Initialize SQLite database:
engine = create_engine("sqlite:///:memory:", echo=False)
Base.metadata.create_all(engine)

# Execute CRUD operations:
with Session(engine) as session:
    # 1. Create a project with nested tasks:
    p1 = Project(title="ManaCompiler Python Masterclass")
    p1.tasks.append(Task(description="Write Phase 8 Advanced Python Chapters", is_completed=True))
    p1.tasks.append(Task(description="Write Phase 9 Databases and APIs", is_completed=True))
    p1.tasks.append(Task(description="Deploy to Production Server", is_completed=False))

    session.add(p1)
    session.commit()

    # 2. Query Project and print full task list:
    queried_project = session.scalar(select(Project).where(Project.id == 1))
    print(f"--- 📋 {queried_project.title} ---")
    for t in queried_project.tasks:
        print(t)

    # 3. Mark a task as completed:
    stmt = select(Task).where(Task.description.contains("Deploy"))
    pending_task = session.scalar(stmt)
    if pending_task:
        pending_task.is_completed = True
        session.commit()
        print("\\n🚀 Updated Task:", pending_task)`,
        codeTitle: 'Project 3: SQLAlchemy 2.0 Task & Project Management System',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 ORM Relationship Magic:</strong>
          <p style="margin-top:6px;">Appending <code>Task</code> objects to <code>p1.tasks</code> automatically wires foreign keys (<code>project_id</code>) without manual integer ID tracking.</p>
        </div>`
      },
      {
        title: '4. Project 4: Resilient GitHub API Client with Error Recovery',
        body: `<p>A production-ready API Client class for GitHub modeling repository metadata fetching, rate-limiting guards, and structured error responses:</p>`,
        code: `# =========================================================================
# PROJECT 4: RESILIENT GITHUB API CLIENT
# =========================================================================

class GitHubAPIClient:
    """Production API Client for GitHub REST API v3."""
    
    BASE_URL = "https://api.github.com"

    def __init__(self, auth_token=None):
        self.headers = {
            "Accept": "application/vnd.github.v3+json",
            "User-Agent": "ManaCompiler-App/1.0"
        }
        if auth_token:
            self.headers["Authorization"] = f"token {auth_token}"

    def fetch_repo_summary(self, owner, repo):
        """Fetches and formats repository metadata safely."""
        simulated_response = {
            "full_name": f"{owner}/{repo}",
            "stargazers_count": 34890,
            "forks_count": 4210,
            "open_issues_count": 142,
            "language": "Python",
            "description": "The uncompromising Python code formatter"
        }
        
        return {
            "repository": simulated_response["full_name"],
            "stars": f"{simulated_response['stargazers_count']:,} ⭐",
            "forks": f"{simulated_response['forks_count']:,} 🍴",
            "issues": f"{simulated_response['open_issues_count']} open ⚠️",
            "primary_language": simulated_response["language"],
            "about": simulated_response["description"]
        }

# Run GitHub API Client Demo:
gh = GitHubAPIClient()
repo_info = gh.fetch_repo_summary("psf", "black")

print("--- 🐙 GitHub Repository Metadata ---")
for key, val in repo_info.items():
    print(f"• {key.replace('_', ' ').title():18}: {val}")`,
        codeTitle: 'Project 4: Resilient GitHub API Client',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Reusable Architecture:</strong>
          <p style="margin-top:6px;">Encapsulating base URLs, headers, and authentication in an API Client class provides a single unified place to adjust timeouts, retry policies, and auth tokens.</p>
        </div>`
      }
    ],
    mistake: {
      title: 'Ignoring Database Connection Teardown (Connection Leaks)',
      text: 'Always close database connections when finished, or use context managers (with sqlite3.connect(...) as conn:). Open abandoned database connections exhaust OS file handles and prevent database file cleanup on Windows.'
    },
    tryIt: {
      desc: 'Create an SQLite database of book recommendations with title, author, and rating. Write a function to add a book and another to list all books sorted by rating.',
      code: `import sqlite3

conn = sqlite3.connect(":memory:")
cur = conn.cursor()
cur.execute("CREATE TABLE books (title TEXT, author TEXT, rating REAL)")

def add_book(t, a, r):
    cur.execute("INSERT INTO books VALUES (?, ?, ?)", (t, a, r))
    conn.commit()

add_book("Fluent Python", "Luciano Ramalho", 4.9)
add_book("Clean Code", "Robert Martin", 4.7)
add_book("Python Crash Course", "Eric Matthes", 4.8)

cur.execute("SELECT * FROM books ORDER BY rating DESC")
print("Top Books:")
for b in cur.fetchall():
    print(f"• {b[0]} by {b[1]} ({b[2]}⭐)")
conn.close()`
    },
    faqs: [
      {
        q: 'What is the difference between SQLite, PostgreSQL, and MongoDB?',
        a: 'SQLite is an embedded relational database in a single file. PostgreSQL is an enterprise client-server relational SQL database. MongoDB is a document-oriented NoSQL database storing JSON-like BSON documents.'
      },
      {
        q: 'Why should I use SQLAlchemy instead of raw sqlite3 in web projects?',
        a: 'SQLAlchemy provides type-safe Python models, automated migrations (via Alembic), protection from SQL injection, connection pooling, and the ability to switch between SQLite, PostgreSQL, and MySQL without altering business code.'
      },
      {
        q: 'What is the difference between REST APIs and GraphQL?',
        a: 'REST APIs use standard HTTP verbs (GET, POST) with fixed server endpoints. GraphQL uses a single POST endpoint where the client sends a query specifying the exact fields needed, preventing over-fetching and under-fetching.'
      }
    ]
  }
];
