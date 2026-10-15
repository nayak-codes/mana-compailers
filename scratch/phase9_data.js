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
    title: 'Python SQLite & SQL Fundamentals (తెలుగులో)',
    badge: '42. SQLite & SQL Basics',
    subtopics: 'Relational DB Theory · SQLite Embedded Architecture · SQLite vs Client-Server · sqlite3 Module · CREATE TABLE DDL · INSERT & SELECT · executemany() · sqlite3.Row Mapping',
    desc: 'డేటాని ఫైల్స్ లో కాకుండా డేటాబేస్ లో ఎందుకు స్టోర్ చేయాలి? టేబుల్స్, Primary Keys అంటే ఏంటి? పైథాన్ లో డీఫాల్ట్ గా వచ్చే `sqlite3` ని వాడి డేటాని ఎలా సేవ్ చేయాలి, ఎలా వెతకాలో నేర్చుకుందాం.',
    sections: [
      {
        title: '1. డేటాబేస్ అంటే ఏంటి? ఫైల్స్ (TXT, CSV) ఎందుకు పనికిరావు?',
        body: `<p>కోడ్ రాయడానికి ముందు అసలు <strong>డేటాబేస్ ఎందుకు అవసరం</strong> అని తెలుసుకోవడం చాలా ముఖ్యం. మామూలుగా మనం డేటాని <code>.txt</code> లేదా <code>.csv</code> ఫైల్స్ లో స్టోర్ చేస్తే 4 పెద్ద ప్రాబ్లమ్స్ వస్తాయి:</p>
        
        <ol style="line-height:1.8; margin-left:20px;">
          <li><strong>ఒకేసారి ఇద్దరు ఓపెన్ చేస్తే (Concurrency):</strong> అమెజాన్ లో ఒకే ఫోన్ మిగిలింది అనుకోండి. ఇద్దరు ఒకేసారి కొంటే, ఫైల్ అయితే ఇద్దరికీ ఫోన్ ఉందని చెప్పి 2 ఆర్డర్స్ తీసుకుంటుంది. డేటాబేస్ అయితే ఒకరిని ఆపి కరెక్ట్ గా మేనేజ్ చేస్తుంది.</li>
          <li><strong>చాలా స్లో (No Indexing):</strong> 10 లక్షల రికార్డ్స్ ఉన్న ఫైల్ లో ఐడీ 98421 కోసం వెతకాలంటే ఫైల్ మొత్తం మొదటినుంచి స్కాన్ చేయాలి (చాలా స్లో). డేటాబేస్ లో అయితే <strong>B-Trees</strong> అనే టెక్నిక్ వల్ల మైక్రో-సెకండ్స్ లో దొరుకుతుంది.</li>
          <li><strong>రూల్స్ ఉండవు:</strong> వయసు (age) అనే చోట ఎవరైనా 'ABC' అని రాస్తే ఫైల్ ఏమీ అనదు. డేటాబేస్ అయితే ఎర్రర్ ఇచ్చి ఆపేస్తుంది (Data Integrity).</li>
          <li><strong>క్రాష్ అయితే గోవిందా:</strong> ఫైల్ లో సేవ్ అవుతున్నప్పుడు పవర్ పోతే ఫైల్ మొత్తం కరప్ట్ అయిపోయి డేటా పోతుంది. డేటాబేస్ అయితే సేఫ్ గా ఉంటుంది.</li>
        </ol>

        <h4 style="color:#10b981; margin:16px 0 8px;">రిలేషనల్ డేటాబేస్ (Tables, Rows, Columns, Keys):</h4>
        <p><strong>RDBMS</strong> (Relational Database) లో డేటా అంతా ఎక్సెల్ షీట్ లాగా టేబుల్స్ లో ఉంటుంది:</p>
        <ul>
          <li><strong>Columns:</strong> ఏ డేటా వస్తుందో ముందే చెప్తాయి (ఉదా: <code>id: INTEGER</code>, <code>name: TEXT</code>).</li>
          <li><strong>Rows:</strong> డేటా రికార్డ్స్ (ఒక పర్సన్ డీటెయిల్స్).</li>
          <li><strong>Primary Key (PK):</strong> ప్రతి రో కి ఇచ్చే ఒక యూనిక్ నెంబర్ (ఆధార్ కార్డ్ లాగా). ఒకే నెంబర్ ఇద్దరికీ ఉండదు.</li>
          <li><strong>Foreign Key (FK):</strong> ఒక టేబుల్ లోని డేటాని, ఇంకో టేబుల్ లోని డేటాకి లింక్ చేయడానికి వాడే నెంబర్. (ఉదా: ఆర్డర్స్ టేబుల్ లో యూజర్ ఐడీ).</li>
        </ul>`,
        code: `# కాన్సెప్ట్ అర్థం చేసుకోవడానికి:
schema_explanation = {
    "Table": "ఒక ఎక్సెల్ షీట్ లాంటిది (ఉదా: Users టేబుల్)",
    "Column": "ఏ టైప్ డేటా వస్తుందో చెప్తుంది (ఉదా: email: TEXT)",
    "Row": "ఒక మనిషి/వస్తువు మొత్తం డీటెయిల్స్ (ఒక రికార్డ్)",
    "Primary Key": "ఎవరో గుర్తుపట్టడానికి వాడే యూనిక్ ఐడీ (ఉదా: user_id = 101)",
    "Foreign Key": "రెండు టేబుల్స్ ని కలపడానికి వాడే లింక్"
}

for concept, definition in schema_explanation.items():
    print(f"📌 {concept:15}: {definition}")`,
        codeTitle: 'Concept Blueprint: Relational Database Architecture Overview',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">💡 రియల్ లైఫ్ ఎగ్జాంపుల్:</strong>
          <p style="margin-top:6px;">Primary Key అంటే మీ ఆధార్ నెంబర్ లాంటిది. ఇద్దరు వ్యక్తులకు ఒకే పేరు ఉండొచ్చు కానీ ఆధార్ ఒకటే ఉండదు కదా. Foreign Key అంటే మీ పాస్పోర్ట్ అప్లికేషన్ లో మీ ఆధార్ నెంబర్ రాయడం లాంటిది (పాస్పోర్ట్ ని ఆధార్ కి లింక్ చేయడం).</p>
        </div>`
      },
      {
        title: '2. SQLite స్పెషాలిటీ ఏంటి? (Serverless)',
        body: `<p>పెద్ద డేటాబేస్ లు (PostgreSQL, MySQL లాంటివి) ఒక సపరేట్ సర్వర్ లాగా రన్ అవుతాయి. మన పైథాన్ కోడ్ వాటికి నెట్వర్క్ ద్వారా కనెక్ట్ అవ్వాలి (పోర్ట్స్, పాస్వర్డ్స్ ఇచ్చి).</p>
        <p>కానీ <strong>SQLite</strong> స్పెషాలిటీ ఏంటంటే, దీనికి సర్వర్ అవసరం లేదు (Serverless). డేటాబేస్ ఇంజిన్ మొత్తం మన పైథాన్ లోనే ఉంటుంది. డేటా అంతా మన ఫోల్డర్ లో ఒక చిన్న ఫైల్ (<code>.db</code>) లో సేవ్ అవుతుంది.</p>
        
        <h4 style="color:#10b981; margin:16px 0 8px;">SQLite ఎప్పుడు వాడాలి?</h4>
        <ul>
          <li>ఆండ్రాయిడ్ యాప్స్, గూగుల్ క్రోమ్, డెస్క్ టాప్ యాప్స్ లోకల్ గా డేటాని సేవ్ చేయడానికి వాడతాయి.</li>
          <li>టెస్టింగ్ అప్పుడు ర్యామ్ (<code>":memory:"</code>) లో ఫాస్ట్ గా రన్ చేయడానికి.</li>
          <li>రోజుకి లక్ష మంది వచ్చే చిన్న/మీడియం వెబ్సైట్స్ కి కూడా ఇది సూపర్ గా పనిచేస్తుంది.</li>
        </ul>`,
        code: `import sqlite3

# 1. డేటాబేస్ కి కనెక్ట్ అవుదాం (ఒకవేళ ఫైల్ లేకపోతే అదే క్రియేట్ చేస్తుంది):
conn = sqlite3.connect("company.db")

# 2. ఒక Cursor (పాయింటర్) ని క్రియేట్ చేద్దాం:
# దీని ద్వారానే మనం SQL కమాండ్స్ పంపిస్తాం.
cursor = conn.cursor()

# 3. 'departments' (డిపార్ట్మెంట్స్) టేబుల్ క్రియేట్ చేద్దాం:
cursor.execute("""
CREATE TABLE IF NOT EXISTS departments (
    dept_id INTEGER PRIMARY KEY AUTOINCREMENT,
    dept_name TEXT NOT NULL UNIQUE,
    budget REAL NOT NULL
)
""")

# 4. 'employees' (ఎంప్లాయిస్) టేబుల్ క్రియేట్ చేద్దాం (Foreign Key తో):
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

conn.commit() # మనం చేసిన మార్పులని ఫైల్ లోకి పర్మినెంట్ గా సేవ్ చేయాలి
print("✅ డేటాబేస్ టేబుల్స్ సక్సెస్ ఫుల్ గా క్రియేట్ అయ్యాయి!")
conn.close() # పని అయ్యాక కనెక్షన్ క్లోజ్ చేయాలి`,
        codeTitle: 'Example 1: Establishing SQLite Connection and Creating Relational Tables',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 SQL రూల్స్ (Constraints):</strong>
          <p style="margin-top:6px;"><code>NOT NULL</code> అంటే ఆ కాలమ్ ఖాళీగా వదలకూడదు. <code>UNIQUE</code> అంటే ఆ ఈమెయిల్ తో ఇద్దరు ఎంప్లాయిస్ ఉండకూడదు.</p>
        </div>`
      },
      {
        title: '3. డేటాని మేనేజ్ చేయడం (CRUD ఆపరేషన్స్)',
        body: `<p><strong>CRUD</strong> అంటే <strong>Create</strong> (డేటా పెట్టడం), <strong>Read</strong> (చదవడం), <strong>Update</strong> (మార్చడం), <strong>Delete</strong> (తీసేయడం).</p>
        
        <h4 style="color:#10b981; margin:16px 0 8px;">1. ఒకేసారి చాలా డేటా ఎక్కించడం (<code>executemany</code>):</h4>
        <p>ఒక్కో రికార్డ్ ని ఎక్కిస్తే చాలా స్లో అవుతుంది. <code>cursor.executemany()</code> వాడితే 1000 రికార్డ్స్ ని కూడా 5 మిల్లీ-సెకండ్స్ లోపల ఎక్కించేయొచ్చు!</p>

        <h4 style="color:#10b981; margin:16px 0 8px;">2. డేటాని డిక్షనరీ లాగా తెచ్చుకోవడం (<code>sqlite3.Row</code>):</h4>
        <p>మామూలుగా అయితే డేటా <code>(1, 'Balaji', 95000)</code> లాగా టపుల్స్ లో వస్తుంది. అలా కాకుండా <code>conn.row_factory = sqlite3.Row</code> అని పెడితే, మనం కాలమ్ పేరుతో (ఉదా: <code>row['full_name']</code>) డేటాని చాలా క్లీన్ గా చదువుకోవచ్చు.</p>`,
        code: `import sqlite3

conn = sqlite3.connect("company.db")
conn.row_factory = sqlite3.Row  # డేటాని డిక్షనరీ లాగా తెచ్చుకోవడానికి
cursor = conn.cursor()

# Foreign Keys పనిచేయడానికి ఆన్ చేయాలి:
cursor.execute("PRAGMA foreign_keys = ON")

# 1. CREATE: డిపార్ట్మెంట్స్ డేటాని ఎక్కిద్దాం:
departments_data = [
    ("Engineering", 5000000.0),
    ("Product Design", 2000000.0),
    ("Human Resources", 1200000.0)
]
cursor.executemany("INSERT OR IGNORE INTO departments (dept_name, budget) VALUES (?, ?)", departments_data)

# ఎంప్లాయిస్ డేటాని ఎక్కిద్దాం:
employees_data = [
    ("Balaji Dev", "balaji.dev@company.com", 95000.0, 1),
    ("Alex Smith", "alex.smith@company.com", 82000.0, 1),
    ("Chloe Davis", "chloe.d@company.com", 78000.0, 2)
]
cursor.executemany("INSERT OR IGNORE INTO employees (full_name, email, salary, dept_id) VALUES (?, ?, ?, ?)", employees_data)
conn.commit()

# 2. READ: ఎంప్లాయిస్ వివరాలు (JOIN వాడి డిపార్ట్మెంట్ పేరు కూడా తెద్దాం):
print("--- 📋 ఎంప్లాయిస్ రిపోర్ట్ ---")
cursor.execute("""
SELECT e.emp_id, e.full_name, e.salary, d.dept_name
FROM employees e
JOIN departments d ON e.dept_id = d.dept_id
WHERE e.salary >= ?
ORDER BY e.salary DESC
""", (70000.0,))

high_earners = cursor.fetchall()
for emp in high_earners:
    # డిక్షనరీ లాగా కాలమ్ పేరుతో డేటా తీయొచ్చు:
    print(f"• ID #{emp['emp_id']}: {emp['full_name']:18} | Dept: {emp['dept_name']:15} | Salary: ₹{emp['salary']:,.2f}")

# 3. UPDATE: ఇంజనీరింగ్ వాళ్ళకి 10% శాలరీ పెంచుదాం:
cursor.execute("""
UPDATE employees
SET salary = salary * 1.10
WHERE dept_id = 1
""")
print(f"\\n📈 {cursor.rowcount} మంది శాలరీ 10% పెంచాం!")

conn.commit()
conn.close()`,
        codeTitle: 'Example 2: Complete Relational CRUD & JOIN Queries with sqlite3.Row',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 ముఖ్యమైన పాయింట్స్:</strong>
          <ul style="margin:8px 0 0 18px; line-height:1.7;">
            <li><code>JOIN ... ON</code> అంటే రెండు టేబుల్స్ లోని డేటాని లింక్ చేసి (డిపార్ట్మెంట్ ఐడీ మ్యాచ్ చేసి) కంబైన్డ్ రిపోర్ట్ ఇవ్వడం.</li>
            <li><code>cursor.rowcount</code> వాడితే మనం ఎన్ని రోస్ ని మార్చామో లేదా డిలీట్ చేసామో తెలుస్తుంది.</li>
          </ul>
        </div>`
      }
    ],
    mistake: {
      title: 'SQLite లో PRAGMA ఆన్ చేయకపోవడం',
      text: 'SQLite లో డీఫాల్ట్ గా Foreign Keys పని చేయవు (పాత వెర్షన్స్ కోసం అలా ఉంచారు). కాబట్టి కనెక్షన్ ఓపెన్ చేసిన ప్రతిసారీ "PRAGMA foreign_keys = ON" అని రన్ చేయాలి. లేకపోతే తప్పుడు ఐడీలు ఇచ్చినా తీసుకుంటుంది!'
    },
    tryIt: {
      desc: 'మెమరీలో ఒక inventory టేబుల్ (item_id, name, quantity) క్రియేట్ చేసి, 3 ఐటమ్స్ వేసి, ఒకదాని క్వాంటిటీ అప్డేట్ చేసి, 10 కంటే ఎక్కువ ఉన్నవి ప్రింట్ చేయండి.',
      code: `import sqlite3

conn = sqlite3.connect(":memory:")
conn.row_factory = sqlite3.Row
cur = conn.cursor()

cur.execute("CREATE TABLE inventory (item_id INTEGER PRIMARY KEY, name TEXT, quantity INTEGER)")
cur.executemany("INSERT INTO inventory VALUES (?, ?, ?)", [
    (1, "SSD 1TB", 25),
    (2, "RAM 16GB", 8),
    (3, "Monitor", 14)
])
cur.execute("UPDATE inventory SET quantity = 30 WHERE item_id = 1")
conn.commit()

cur.execute("SELECT * FROM inventory WHERE quantity > 10")
for row in cur.fetchall():
    print(f"Item #{row['item_id']}: {row['name']} (Stock: {row['quantity']})")
conn.close()`
    },
    faqs: [
      {
        q: 'నేను డెస్క్ టాప్ యాప్స్ కి SQLite బదులు ఫైల్స్ ఎందుకు వాడకూడదు?',
        a: 'SQLite అయితే పవర్ పోయినా డేటా కరప్ట్ అవ్వకుండా సేఫ్ గా ఉంటుంది. ఎంత డేటా ఉన్నా సెర్చ్ చేయడం చాలా ఫాస్ట్ గా ఉంటుంది.'
      },
      {
        q: 'Write-Ahead Logging (WAL) అంటే ఏంటి?',
        a: 'ఇది ఒక స్పెషల్ మోడ్. ఇది ఆన్ చేస్తే (PRAGMA journal_mode=WAL;), డేటాని ముందు ఒక లాగ్ ఫైల్ లో రాసుకుంటుంది. దీనివల్ల ఒకరు డేటా రాస్తున్నప్పుడు వేరేవాళ్ళు వెయిట్ చేయకుండా చదువుకోవచ్చు (స్పీడ్ పెరుగుతుంది).'
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
    title: 'Safe Queries (SQLi) & Transactions (తెలుగులో)',
    badge: '43. Safe Queries & Transactions',
    subtopics: 'SQL Injection Deep Dive · String Formatting Hazards · Parameterized Placeholders (?) · ACID Principles · commit() & rollback() · Transaction Context Managers',
    desc: 'హ్యాకర్స్ డేటాబేస్ ని ఎలా హ్యాక్ చేస్తారు (SQL Injection)? దాన్ని ఎలా ఆపాలి? అలాగే ఒకేసారి రెండు మూడు పనులు జరుగుతున్నప్పుడు మధ్యలో క్రాష్ అయితే ఏం జరుగుతుంది (Transactions & ACID) తెలుసుకుందాం.',
    sections: [
      {
        title: '1. SQL Injection అంటే ఏంటి? దాన్నుంచి ఎలా తప్పించుకోవాలి?',
        body: `<p><strong>SQL Injection (SQLi)</strong> అనేది వెబ్సైట్స్ లో జరిగే అతిపెద్ద సెక్యూరిటీ అటాక్. యూజర్ ఇచ్చే డేటాని డైరెక్ట్ గా మన SQL కోడ్ లో కలిపితే (String Concatenation) హ్యాకర్స్ మన డేటాబేస్ ని కంట్రోల్ చేసేస్తారు.</p>

        <h4 style="color:#ef4444; margin:16px 0 8px;">హ్యాకింగ్ ఎలా జరుగుతుంది?:</h4>
        <p>మీరు కోడ్ ని f-strings వాడి ఇలా రాశారు అనుకుందాం:</p>
        <pre style="background:#1e1e1e; padding:12px; border-radius:6px; color:#f87171;"><code># చాలా డేంజర్ కోడ్:
query = f"SELECT * FROM users WHERE user = '{username}' AND pass = '{password}'"</code></pre>
        <p>హ్యాకర్ యూజర్ నేమ్ దగ్గర <code>admin' --</code> అని ఇచ్చాడనుకోండి, ఆ కోడ్ ఇలా మారుతుంది:</p>
        <pre style="background:#1e1e1e; padding:12px; border-radius:6px; color:#f87171;"><code>SELECT * FROM users WHERE user = 'admin' --' AND pass = '...'</code></pre>
        <p>SQL లో <code>--</code> అంటే కామెంట్. అంటే ఆ తర్వాత ఉన్న పాస్వర్డ్ చెక్కింగ్ అంతా పనిచేయదు! పాస్వర్డ్ లేకుండానే అడ్మిన్ లాగిన్ అయిపోతాడు.</p>

        <h4 style="color:#10b981; margin:16px 0 8px;">ఎలా తప్పించుకోవాలి? (Parameterized Queries)</h4>
        <p>యూజర్ ఇచ్చే డేటాని డైరెక్ట్ గా కలపకుండా, <strong><code>?</code> (ప్లేస్ హోల్డర్)</strong> వాడాలి. అప్పుడు డేటాబేస్ దాన్ని కమాండ్ లాగా కాకుండా, జస్ట్ ఒక టెక్స్ట్ లాగే చూస్తుంది.</p>`,
        code: `import sqlite3

conn = sqlite3.connect(":memory:")
conn.row_factory = sqlite3.Row
cur = conn.cursor()

cur.execute("CREATE TABLE users (id INTEGER PRIMARY KEY, username TEXT, role TEXT)")
cur.executemany("INSERT INTO users VALUES (?, ?, ?)", [
    (1, "admin", "SuperAdmin"),
    (2, "balaji", "Developer")
])
conn.commit()

# హ్యాకర్ ఇచ్చే ఇన్పుట్:
malicious_payload = "admin' OR '1'='1"

print("--- 🛡️ సెక్యూర్డ్ క్వెరీ టెస్టింగ్ ---")
# '?' వాడి పంపితే సెక్యూర్ గా ఉంటుంది:
cur.execute("SELECT * FROM users WHERE username = ?", (malicious_payload,))
matched_users = cur.fetchall()

if len(matched_users) == 0:
    print("✅ అటాక్ ఫెయిల్! హ్యాకర్ ఇచ్చిన కోడ్ ని డేటాబేస్ జస్ట్ ఒక స్ట్రింగ్ లాగే ట్రీట్ చేసింది.")

conn.close()`,
        codeTitle: 'Example 1: Demonstrating SQL Injection Defense with Parameterized Placeholders',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 100% సేఫ్టీ:</strong>
          <p style="margin-top:6px;"><code>?</code> వాడితే, హ్యాకర్ ఎన్ని కోట్స్, సెమికోలన్స్ పెట్టినా సరే... దాన్ని పైకమాండ్స్ లాగా రన్ చేయదు. కేవలం ఆ టెక్స్ట్ తో ఎవరైనా ఉన్నారా అని మాత్రమే వెతుకుతుంది.</p>
        </div>`
      },
      {
        title: '2. Transactions (అయితే అన్నీ అవ్వాలి, లేకపోతే ఏదీ అవ్వకూడదు) & ACID',
        body: `<p>బ్యాంక్ లో ఒకరి అకౌంట్ లో డబ్బులు కట్ చేసి, ఇంకొకరి అకౌంట్ లో వేయాలి. మొదటి పని అయ్యాక కరెంట్ పోతే ఏమవుతుంది? డబ్బులు మాయం! ఇలాంటివి జరగకుండా ఉండేందుకే <strong>Transactions</strong> (ACID రూల్స్) వాడతారు.</p>
        
        <table class="tbl" style="margin-top:8px; font-size:12.5px;">
          <tr><th>రూల్</th><th>అర్థం</th></tr>
          <tr><td><strong>Atomicity (A)</strong></td><td>పనులు అయితే అన్నీ సక్సెస్ అవ్వాలి. ఏ చిన్న ఎర్రర్ వచ్చినా మొత్తం క్యాన్సిల్ (<code>rollback()</code>) అయిపోయి పాత స్టేజ్ కి వచ్చేయాలి.</td></tr>
          <tr><td><strong>Consistency (C)</strong></td><td>డేటాబేస్ రూల్స్ అన్నీ ఎప్పుడూ కరెక్ట్ గా ఫాలో అవ్వాలి (ఉదా: బ్యాలెన్స్ మైనస్ లోకి వెళ్ళకూడదు).</td></tr>
          <tr><td><strong>Isolation (I)</strong></td><td>ఒక ట్రాన్సాక్షన్ జరుగుతున్నప్పుడు, సగం జరిగిన మార్పులు వేరే వాళ్ళకి కనిపించకూడదు.</td></tr>
          <tr><td><strong>Durability (D)</strong></td><td>ఒకసారి <code>commit()</code> అయ్యాక, సర్వర్ క్రాష్ అయినా సరే డేటా సేఫ్ గా హార్డ్ డిస్క్ లో ఉండాలి.</td></tr>
        </table>`,
        code: `import sqlite3

conn = sqlite3.connect(":memory:")
conn.row_factory = sqlite3.Row
cur = conn.cursor()

# బ్యాలెన్స్ నెగెటివ్ అవ్వకూడదని CHECK కండిషన్ పెట్టాం:
cur.execute("CREATE TABLE wallets (id TEXT PRIMARY KEY, balance REAL CHECK(balance >= 0))")
cur.executemany("INSERT INTO wallets VALUES (?, ?)", [("W1", 15000.0), ("W2", 2000.0)])
conn.commit()

def execute_money_transfer(sender, receiver, amount):
    print(f"\\n--- 💸 ట్రాన్స్ఫర్ స్టార్ట్: ₹{amount:,.2f} ({sender} -> {receiver}) ---")
    try:
        # 1. డబ్బులు కట్ చేద్దాం:
        cur.execute("UPDATE wallets SET balance = balance - ? WHERE id = ?", (amount, sender))
        
        # 2. డబ్బులు యాడ్ చేద్దాం:
        cur.execute("UPDATE wallets SET balance = balance + ? WHERE id = ?", (amount, receiver))
        
        # 3. రెండు పనులు సక్సెస్ అయితేనే కమిట్ చేద్దాం:
        conn.commit()
        print("✅ ట్రాన్సాక్షన్ సక్సెస్! అకౌంట్స్ అప్డేట్ అయ్యాయి.")
    except Exception as err:
        # ఎర్రర్ వస్తే మొత్తం వెనక్కి తీసుకుందాం (కట్ అయిన డబ్బులు మళ్ళీ వచ్చేస్తాయి):
        conn.rollback()
        print(f"🛑 ట్రాన్సాక్షన్ ఫెయిల్ & క్యాన్సిల్ (Rollback): {err}")

# టెస్ట్ 1: నార్మల్ ట్రాన్స్ఫర్
execute_money_transfer("W1", "W2", 5000.0)

# టెస్ట్ 2: బ్యాలెన్స్ లేదు కాబట్టి ఫెయిల్ అవ్వాలి (నెగెటివ్ కి వెళ్ళనివ్వదు)
execute_money_transfer("W1", "W2", 90000.0)

cur.execute("SELECT * FROM wallets")
print("\\n--- కరెంట్ బ్యాలెన్స్ ---")
for w in cur.fetchall():
    print(f"• {w['id']}: ₹{w['balance']:,.2f}")

conn.close()`,
        codeTitle: 'Example 2: Financial Wallet Transfer with ACID Rollback Protection',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 CHECK కండిషన్ పవర్:</strong>
          <p style="margin-top:6px;">టేబుల్ క్రియేట్ చేసేటప్పుడు <code>CHECK(balance >= 0)</code> అని ఇచ్చాం. కాబట్టి ఎవరైనా బ్యాలెన్స్ లేకపోయినా ఎక్కువ డబ్బులు పంపాలని చూస్తే, డేటాబేస్ ఆటోమాటిక్ గా ఎర్రర్ ఇస్తుంది.</p>
        </div>`
      }
    ],
    mistake: {
      title: 'Rollback వాడకుండా మాన్యువల్ గా మార్చడం',
      text: 'ఎర్రర్ వచ్చినప్పుడు "కట్ చేసిన డబ్బులు మళ్ళీ యాడ్ చేసేలా" మాన్యువల్ గా కోడ్ రాయకూడదు. దానికి బదులు డైరెక్ట్ గా conn.rollback() అని పిలిస్తే, ఆ ట్రాన్సాక్షన్ లో జరిగిన మార్పులన్నీ డేటాబేస్ ఆటోమాటిక్ గా తీసేస్తుంది (చాలా సేఫ్).'
    },
    tryIt: {
      desc: 'ఒక context manager (with conn:) వాడి రెండు రికార్డ్స్ ఇన్సర్ట్ చేయండి. రెండో దాంట్లో కావాలని ఎర్రర్ తెప్పించి, rollback ఆటోమాటిక్ గా జరుగుతుందో లేదో చూడండి.',
      code: `import sqlite3

conn = sqlite3.connect(":memory:")
cur = conn.cursor()
cur.execute("CREATE TABLE logs (id INTEGER PRIMARY KEY, msg TEXT UNIQUE)")

try:
    with conn: # ఇది ఆటోమాటిక్ గా commit/rollback చేస్తుంది!
        cur.execute("INSERT INTO logs VALUES (1, 'Log A')")
        cur.execute("INSERT INTO logs VALUES (2, 'Log A')") # UNIQUE ఎర్రర్ వస్తుంది!
except sqlite3.IntegrityError:
    print("ఎర్రర్ వచ్చింది! మొత్తం ఆటోమాటిక్ గా రోల్ బ్యాక్ అయిపోయింది.")

cur.execute("SELECT COUNT(*) FROM logs")
print("మొత్తం రికార్డ్స్:", cur.fetchone()[0]) # 0 (ఫస్ట్ ది కూడా డిలీట్ అయిపోయింది!)
conn.close()`
    },
    faqs: [
      {
        q: 'Table-level locking కి Row-level locking కి తేడా ఏంటి?',
        a: 'SQLite టేబుల్-లెవెల్ లాకింగ్ వాడుతుంది (అంటే ఒకరు రాస్తున్నప్పుడు మిగతావాళ్లు ఆ టేబుల్ మొత్తం మీద ఏం చేయలేరు). PostgreSQL లాంటివి రో-లెవెల్ లాకింగ్ వాడతాయి (అంటే ఏ రో అప్డేట్ అవుతుందో అది మాత్రమే లాక్ అవుతుంది, మిగతావి ఫ్రీగా ఉంటాయి).'
      },
      {
        q: 'SQLAlchemy (ORM) వాడితే SQL Injection జరుగుతుందా?',
        a: 'ORM లు ఆటోమాటిక్ గా డేటాని సెక్యూర్ గా (Parameterized గానే) పంపిస్తాయి. కాబట్టి SQL Injection జరగదు.'
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
    title: 'PostgreSQL, MySQL & SQLAlchemy ORM (తెలుగులో)',
    badge: '44. Enterprise DBs & SQLAlchemy',
    subtopics: 'Enterprise DB Architecture · PostgreSQL vs MySQL · The ORM Pattern · SQLAlchemy 2.0 DeclarativeBase · Mapped Columns · Session CRUD Lifecycle',
    desc: 'పెద్ద కంపెనీలు వాడే PostgreSQL, MySQL లాంటి డేటాబేస్ లని పైథాన్ తో ఎలా కనెక్ట్ చేయాలి? SQL కోడ్ రాయకుండా పైథాన్ క్లాసెస్ తోటే డేటాబేస్ ని ఎలా కంట్రోల్ చేయాలో (SQLAlchemy ORM) నేర్చుకుందాం.',
    sections: [
      {
        title: '1. పెద్ద డేటాబేస్ లు (PostgreSQL vs MySQL)',
        body: `<p>లక్షల మంది ఒకేసారి వాడే యాప్స్ కి SQLite సరిపోదు. దానికి సపరేట్ గా సర్వర్స్ లో రన్ అయ్యే <strong>Client-Server Databases</strong> కావాలి:</p>
        
        <h4 style="color:#10b981; margin:16px 0 8px;">PostgreSQL (పోస్ట్ గ్రెస్):</h4>
        <ul>
          <li><strong>స్పెషాలిటీ:</strong> ఇది చాలా అడ్వాన్స్డ్. ఒకరు డేటా రాస్తుంటే, ఇంకొకరు చదువుకోవడానికి అసలు ఆపదు (MVCC).</li>
          <li><strong>ఫీచర్స్:</strong> ఇందులో JSON డేటాని సెర్చ్ చేయొచ్చు, మ్యాప్స్ డేటా, AI కి వాడే వెక్టర్ డేటాని కూడా స్టోర్ చేయొచ్చు.</li>
        </ul>

        <h4 style="color:#10b981; margin:16px 0 8px;">MySQL (మై సీక్వెల్):</h4>
        <ul>
          <li><strong>స్పెషాలిటీ:</strong> ఇది వెబ్సైట్స్ కి చాలా ఫేమస్. ఎక్కువ మంది డేటాని చదివే (Read-heavy) వర్క్స్ కి ఇది సూపర్ ఫాస్ట్ గా ఉంటుంది. (ఉదా: వికీపీడియా, వర్డ్ ప్రెస్).</li>
        </ul>`,
        code: `# డేటాబేస్ కి కనెక్ట్ అయ్యే URL ఫార్మాట్ ఎలా ఉంటుందంటే:
# ఫార్మాట్: dialect+driver://username:password@host:port/database_name

dsn_examples = {
    "PostgreSQL (Standard)": "postgresql+psycopg://user:pass@127.0.0.1:5432/my_db",
    "MySQL (PyMySQL)":       "mysql+pymysql://user:pass@127.0.0.1:3306/my_db",
    "SQLite (Local File)":   "sqlite:///production.db",
    "SQLite (In-Memory)":    "sqlite:///:memory:"
}

print("--- 🌐 డేటాబేస్ కనెక్షన్ URL ఫార్మాట్స్ ---")
for db_type, uri in dsn_examples.items():
    print(f"• {db_type:22}: {uri}")`,
        codeTitle: 'Reference: Standard Database Connection URLs (DSNs)',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 12-Factor App రూల్:</strong>
          <p style="margin-top:6px;">డేటాబేస్ పాస్వర్డ్స్ ఎప్పుడూ పైథాన్ కోడ్ లో రాయకూడదు. వాటిని Environment Variables లో పెట్టి <code>os.getenv("DATABASE_URL")</code> వాడి తెచ్చుకోవాలి.</p>
        </div>`
      },
      {
        title: '2. ORM (Object-Relational Mapper) అంటే ఏంటి? ఎందుకు వాడాలి?',
        body: `<p><strong>ORM</strong> అంటే మన పైథాన్ క్లాసెస్ ని డైరెక్ట్ గా డేటాబేస్ టేబుల్స్ తో లింక్ చేయడం. SQL క్వెరీలు (SELECT, INSERT లాంటివి) రాయాల్సిన అవసరం లేకుండా పైథాన్ కోడ్ తోటే డేటాబేస్ ని ఆపరేట్ చేయొచ్చు.</p>

        <h4 style="color:#10b981; margin:16px 0 8px;">SQLAlchemy వాడటం వల్ల 4 లాభాలు:</h4>
        <ol style="line-height:1.8; margin-left:20px;">
          <li><strong>Type Safety:</strong> కాలమ్స్ కి <code>Mapped[str]</code> అని ఇవ్వడం వల్ల IDE లో ఆటో కంప్లీట్ వస్తుంది, తప్పులు ముందే తెలుస్తాయి.</li>
          <li><strong>డేటాబేస్ మార్చుకోవడం ఈజీ:</strong> మీరు SQLite నుండి PostgreSQL కి మారాలంటే జస్ట్ కనెక్షన్ URL మారిస్తే చాలు, కోడ్ మార్చక్కర్లేదు!</li>
          <li><strong>Migrations (Alembic):</strong> కొత్త కాలమ్స్ యాడ్ చేసినప్పుడు, దానంతట అదే SQL అప్డేట్ ఫైల్స్ ని తయారు చేస్తుంది.</li>
          <li><strong>ఆటోమాటిక్ అప్డేట్:</strong> పైథాన్ ఆబ్జెక్ట్ లో వాల్యూ మారిస్తే (ఉదా: <code>user.email = "new@mail.com"</code>), అది ఆటోమాటిక్ గా UPDATE క్వెరీ ని రన్ చేసేస్తుంది!</li>
        </ol>`,
        code: `from sqlalchemy import create_engine, String, Float, Integer, select
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, Session

# 1. అన్ని మోడల్స్ కి ఒక బేస్ క్లాస్ తయారు చేద్దాం:
class Base(DeclarativeBase):
    pass

# 2. 'Course' (కోర్సు) అనే టేబుల్ ని పైథాన్ క్లాస్ లా రాద్దాం:
class Course(Base):
    __tablename__ = "courses"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    title: Mapped[str] = mapped_column(String(100), nullable=False)
    price: Mapped[float] = mapped_column(Float, default=0.0)

    def __repr__(self) -> str:
        return f"<Course(id={self.id}, title='{self.title}', price=₹{self.price:,.2f})>"

# 3. డేటాబేస్ ఇంజిన్ క్రియేట్ చేద్దాం:
engine = create_engine("sqlite:///:memory:", echo=False)

# 4. మన క్లాసెస్ ని చూసి డేటాబేస్ లో టేబుల్స్ క్రియేట్ చేయమని చెప్దాం:
Base.metadata.create_all(engine)

# 5. Session (డేటాబేస్ తో మాట్లాడే మేనేజర్) వాడి ఆపరేషన్స్ చేద్దాం:
with Session(engine) as session:
    # CREATE: కొత్త కోర్సులు యాడ్ చేద్దాం:
    c1 = Course(title="Python 3 Masterclass", price=1499.0)
    c2 = Course(title="FastAPI Web Apps", price=1999.0)
    
    session.add_all([c1, c2])
    session.commit()
    print("✅ 2 కోర్సులు డేటాబేస్ లో సేవ్ అయ్యాయి!")

    # READ: ₹1000 పైన ఉన్న కోర్సులు వెతుకుదాం (SQL రాయకుండానే):
    query = select(Course).where(Course.price >= 1000.0)
    premium_courses = session.scalars(query).all()
    
    print("\\n--- 🎓 ప్రీమియం కోర్సులు ---")
    for course in premium_courses:
        print("•", course)

    # UPDATE: FastAPI కోర్సుకి డిస్కౌంట్ ఇద్దాం:
    fastapi_course = session.scalar(select(Course).where(Course.title.contains("FastAPI")))
    if fastapi_course:
        fastapi_course.price = 1299.0  # జస్ట్ పైథాన్ వేరియబుల్ మార్చినట్టు మారిస్తే చాలు!
        session.commit()              # ఇది ఆటోమాటిక్ గా UPDATE క్వెరీ పంపిస్తుంది!
        print(f"\\n🏷️ డిస్కౌంట్ అప్డేట్ అయ్యింది: {fastapi_course}")`,
        codeTitle: 'Example 2: Complete SQLAlchemy 2.0 Declarative Model and Session CRUD',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Dirty Checking మ్యాజిక్:</strong>
          <p style="margin-top:6px;">మీరు ఎప్పుడైతే ఆబ్జెక్ట్ లో ఒక వాల్యూ మారుస్తారో (<code>price = 1299</code>), సెషన్ దాన్ని గమనిస్తుంది. <code>commit()</code> చేయగానే ఏవి మారాయో వాటికి మాత్రమే SQL అప్డేట్ కమాండ్స్ రన్ చేస్తుంది.</p>
        </div>`
      }
    ],
    mistake: {
      title: 'పాత SQLAlchemy 1.x సింటాక్స్ వాడటం',
      text: 'SQLAlchemy 2.0 లో అంతా కొత్తగా మారింది. పాత session.query(Course).filter(...) లాంటివి వాడకూడదు. కొత్త 2.0 స్టైల్ session.scalars(select(Course).where(...)).all() మాత్రమే వాడాలి.'
    },
    tryIt: {
      desc: 'ఒక Author మోడల్ (id, name, books) క్రియేట్ చేసి, ఇద్దరిని యాడ్ చేసి, ఎక్కువ బుక్స్ ఉన్నవాళ్ళని ప్రింట్ చేయండి.',
      code: `from sqlalchemy import create_engine, String, Integer, select
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, Session

class Base(DeclarativeBase): pass

class Author(Base):
    __tablename__ = "authors"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(50))
    books: Mapped[int] = mapped_column(Integer)

engine = create_engine("sqlite:///:memory:")
Base.metadata.create_all(engine)

with Session(engine) as session:
    session.add_all([
        Author(id=1, name="Luciano", books=2),
        Author(id=2, name="Robert", books=6)
    ])
    session.commit()

    top = session.scalar(select(Author).order_by(Author.books.desc()))
    print(f"టాప్ ఆథర్: {top.name} ({top.books} బుక్స్ తో!)")`
    },
    faqs: [
      {
        q: 'Alembic అంటే ఏంటి?',
        a: 'ఇది SQLAlchemy కి తోడుగా వాడే టూల్. మీరు పైథాన్ క్లాస్ లో కొత్త కాలమ్ యాడ్ చేయగానే, ఇది ఆటోమాటిక్ గా డేటాబేస్ టేబుల్ లో కూడా ఆ కాలమ్ యాడ్ చేయడానికి SQL కోడ్ ని తయారు చేస్తుంది.'
      },
      {
        q: 'Connection Pooling అంటే ఏంటి?',
        a: 'డేటాబేస్ కి కనెక్ట్ అవ్వడానికి టైమ్ పడుతుంది. అందుకే SQLAlchemy కొన్ని కనెక్షన్స్ ని ముందే ఓపెన్ చేసి పెట్టి, ఎవరు వస్తే వాళ్ళకి వెంటనే ఇచ్చేస్తుంది (స్పీడ్ పెరుగుతుంది).'
      },
      {
        q: 'నేను అసలు రా (Raw) SQL రాయకూడదా?',
        a: 'చాలా టేబుల్స్ కలిపి (JOINs) పెద్ద పెద్ద రిపోర్ట్స్ తీయాల్సి వచ్చినప్పుడు ORM కంటే డైరెక్ట్ గా SQL రాయడమే బెస్ట్ (స్పీడ్ గా రన్ అవుతుంది).'
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
    title: 'HTTP Requests & REST APIs (తెలుగులో)',
    badge: '45. REST APIs & HTTP',
    subtopics: 'What is an API? · REST Architectural Constraints · HTTP Request Methods (GET, POST, PUT, PATCH, DELETE) · Status Codes · JSON Deserialization',
    desc: 'API అంటే ఏంటి? ఒక యాప్ నుంచి ఇంకో యాప్ కి డేటాని ఎలా పంపించాలి? GET, POST, DELETE లాంటి HTTP కమాండ్స్ మరియు Status Codes (200, 404, 500) గురించి డీటెయిల్ గా నేర్చుకుందాం.',
    sections: [
      {
        title: '1. API అంటే ఏంటి? REST ఫార్మాట్ ఎలా ఉంటుంది?',
        body: `<p><strong>API (Application Programming Interface)</strong> అంటే రెండు వేర్వేరు సాఫ్ట్ వేర్స్ మాట్లాడుకోవడానికి ఒక బ్రిడ్జి లాంటిది. ఒకే భాష (పైథాన్, జావా) అవసరం లేకుండా, ఇవి నెట్వర్క్ ద్వారా డేటాని షేర్ చేసుకుంటాయి.</p>
        
        <h4 style="color:#10b981; margin:16px 0 8px;">REST (Representational State Transfer) రూల్స్:</h4>
        <p>REST అనేది API లు ఎలా ఉండాలో చెప్పే కొన్ని రూల్స్:</p>
        <ul>
          <li><strong>Client-Server:</strong> ఫ్రంట్ ఎండ్ (UI) వేరుగా, బ్యాక్ ఎండ్ డేటాబేస్ వేరుగా ఉండాలి.</li>
          <li><strong>Statelessness:</strong> సర్వర్ ఎవరినీ గుర్తుపెట్టుకోదు. ప్రతి రిక్వెస్ట్ కి మనమే పాస్వర్డ్/టోకెన్ పంపాలి.</li>
          <li><strong>Resource-Oriented:</strong> వెబ్సైట్ లింక్స్ అన్నీ పనుల పేర్లతో కాకుండా వస్తువుల పేర్లతో (Nouns) ఉండాలి:
            <ul>
              <li><code>GET /api/users</code> (అందరి యూజర్స్ ని ఇవ్వు)</li>
              <li><code>POST /api/users</code> (కొత్త యూజర్ ని క్రియేట్ చెయ్)</li>
              <li><code>GET /api/users/42</code> (42 వ ఐడీ ఉన్న యూజర్ ని ఇవ్వు)</li>
            </ul>
          </li>
        </ul>`,
        code: `# HTTP Status Codes కి అర్థాలు:
status_code_dictionary = {
    200: ("OK", "సక్సెస్! అడిగిన డేటా ఇస్తున్నాను"),
    201: ("Created", "సక్సెస్! నువ్వు అడిగినట్టే కొత్తది క్రియేట్ చేసాను"),
    204: ("No Content", "సక్సెస్! డిలీట్ చేసాను (చూపించడానికి డేటా లేదు)"),
    400: ("Bad Request", "నువ్వు పంపిన డేటాలో తప్పుంది"),
    401: ("Unauthorized", "నీ పాస్వర్డ్/టోకెన్ తప్పు"),
    403: ("Forbidden", "నువ్వు లాగిన్ అయ్యావ్ కానీ ఇది చూసే పర్మిషన్ నీకు లేదు"),
    404: ("Not Found", "నువ్వు అడిగింది నా దగ్గర లేదు (లింక్ తప్పు)"),
    429: ("Too Many Requests", "చాలా స్పీడ్ గా అడుగుతున్నావ్.. కొంచెం ఆగు"),
    500: ("Internal Server Error", "నా కోడ్ లోనే ఎక్కడో క్రాష్ అయ్యింది (నాదే తప్పు)"),
    503: ("Service Unavailable", "సర్వర్ డౌన్ లో ఉంది (లేదా ట్రాఫిక్ ఎక్కువైంది)")
}

print("--- 🌐 ముఖ్యమైన HTTP Status Codes ---")
for code, (label, meaning) in status_code_dictionary.items():
    emoji = "✅" if code < 300 else ("⚠️" if code < 500 else "🔥")
    print(f"{emoji} HTTP {code} [{label:20}]: {meaning}")`,
        codeTitle: 'Reference: Complete HTTP Status Code Classification',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 REST బెస్ట్ ప్రాక్టీస్:</strong>
          <p style="margin-top:6px;">ఎప్పుడూ కరెక్ట్ నెంబర్ (Status Code) నే ఇవ్వాలి. ఒకవేళ యూజర్ లేకపోతే "404 Not Found" అని ఇవ్వాలి గానీ, 200 నెంబర్ తో పాటు లోపల "User not found" అని ఎర్రర్ పంపకూడదు.</p>
        </div>`
      },
      {
        title: '2. పైథాన్ `requests` లైబ్రరీతో API కాల్స్ చేయడం (GET, POST...)',
        body: `<p>పైథాన్ లో నెట్వర్క్ కి కనెక్ట్ అయ్యి డేటా తెచ్చుకోవడానికి <strong><code>requests</code></strong> లైబ్రరీని ఎక్కువగా వాడతారు:</p>
        <ul>
          <li><code>requests.get()</code>: డేటాని తెచ్చుకోవడానికి.</li>
          <li><code>requests.post()</code>: కొత్త డేటాని (JSON) సర్వర్ కి పంపడానికి (ఉదా: రిజిస్ట్రేషన్).</li>
          <li><code>requests.put()</code>: పాత డేటాని పూర్తిగా కొత్త డేటాతో రీప్లేస్ చేయడానికి.</li>
          <li><code>requests.patch()</code>: పాత డేటాలో కొంచెం భాగం మాత్రమే (ఉదా: ఈమెయిల్) మార్చడానికి.</li>
          <li><code>requests.delete()</code>: డేటాని డిలీట్ చేయడానికి.</li>
        </ul>`,
        code: `import json

# API కాల్స్ ని సిమ్యులేట్ చేయడానికి ఒక క్లాస్ రాద్దాం:
class SimulatedRESTClient:
    def __init__(self, base_url="https://api.example.com/v1"):
        self.base_url = base_url

    def get_user_profile(self, user_id):
        endpoint = f"{self.base_url}/users/{user_id}"
        print(f"👉 [GET] ఈ లింక్ ని రిక్వెస్ట్ చేస్తున్నాం: {endpoint}")
        # 200 OK తో డేటా వచ్చినట్టు:
        return {"status": 200, "data": {"id": user_id, "name": "Balaji"}}

    def create_user(self, payload):
        endpoint = f"{self.base_url}/users"
        print(f"👉 [POST] కొత్త యూజర్ ని క్రియేట్ చేస్తున్నాం: {json.dumps(payload)}")
        # 201 Created రెస్పాన్స్:
        return {"status": 201, "data": {"id": 105, **payload}}

    def update_user_email(self, user_id, new_email):
        endpoint = f"{self.base_url}/users/{user_id}"
        print(f"👉 [PATCH] ఈమెయిల్ మాత్రమే అప్డేట్ చేస్తున్నాం: {{'email': '{new_email}'}}")
        return {"status": 200, "data": {"id": user_id, "email": new_email}}

    def delete_user(self, user_id):
        endpoint = f"{self.base_url}/users/{user_id}"
        print(f"👉 [DELETE] యూజర్ ని డిలీట్ చేస్తున్నాం: {endpoint}")
        return {"status": 204, "data": None}

# క్లయింట్ తో టెస్ట్ చేద్దాం:
client = SimulatedRESTClient()
print("1. GET Request:")
print("   Response:", client.get_user_profile(42))

print("\\n2. POST Request (Create):")
print("   Response:", client.create_user({"name": "Alex", "email": "alex@mail.com"}))

print("\\n3. PATCH Request (Partial Update):")
print("   Response:", client.update_user_email(42, "new_mail@mail.com"))

print("\\n4. DELETE Request:")
print("   Response:", client.delete_user(42))`,
        codeTitle: 'Example 2: Complete REST CRUD Method Execution Lifecycle',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 PUT vs PATCH:</strong>
          <p style="margin-top:6px;"><strong>PUT</strong> వాడితే రికార్డ్ మొత్తం మారుతుంది (ఏదైనా మర్చిపోతే అది డిలీట్ అయిపోతుంది). <strong>PATCH</strong> వాడితే మనం చెప్పిన ఫీల్డ్ మాత్రమే మారుతుంది, మిగతావి పాతవే ఉంటాయి.</p>
        </div>`
      }
    ],
    mistake: {
      title: 'response.text ని మాన్యువల్ గా మార్చడం (JSON)',
      text: 'json.loads(response.text) వాడే బదులు, డైరెక్ట్ గా response.json() వాడటం బెస్ట్. ఇది ఆటోమాటిక్ గా స్పెషల్ క్యారెక్టర్స్ ని కరెక్ట్ గా అర్థం చేసుకుని పైథాన్ డిక్షనరీ లాగా ఇస్తుంది.'
    },
    tryIt: {
      desc: 'ఒక ఫంక్షన్ parse_api_response(status, json_str) రాయండి. 200-299 వస్తే (True, data) ఇవ్వాలి, వేరేవి వస్తే (False, ఎర్రర్ మెసేజ్) ఇవ్వాలి.',
      code: `import json

def parse_api_response(status_code, raw_body_str):
    try:
        data = json.loads(raw_body_str)
        if 200 <= status_code < 300:
            return True, data
        return False, f"ఎర్రర్ {status_code}: {data.get('error', 'Unknown Error')}"
    except json.JSONDecodeError:
        return False, "సర్వర్ నుంచి వచ్చిన డేటా JSON ఫార్మాట్ లో లేదు!"

success, res = parse_api_response(200, '{"user": "Balaji", "status": "active"}')
print(f"Status 200: Success={success}, Data={res}")

success_err, res_err = parse_api_response(404, '{"error": "User not found"}')
print(f"Status 404: Success={success_err}, Error={res_err}")`
    },
    faqs: [
      {
        q: 'JSON కి పైథాన్ డిక్షనరీలకి తేడా ఏంటి?',
        a: 'పైథాన్ డిక్షనరీ మెమరీలో రన్ అవుతుంది. JSON అనేది ఆ డిక్షనరీని నెట్వర్క్ లో పంపడానికి వాడే ఒక "టెక్స్ట్ ఫార్మాట్" అంతే. json.dumps() వాడి డిక్షనరీని టెక్స్ట్ లా మార్చి నెట్ లో పంపుతాం.'
      },
      {
        q: 'Webhook అంటే ఏంటి?',
        a: 'మామూలు API అయితే మనమే సర్వర్ ని అడుగుతాం. Webhook లో, ఏదైనా జరిగితే సర్వరే డైరెక్ట్ గా మన యాప్ కి డేటా పంపుతుంది (ఉదా: పేమెంట్ సక్సెస్ అవ్వగానే ఆటోమాటిక్ గా మనకు మెసేజ్ వస్తుంది).'
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
    title: 'API Auth, Headers & Error Handling (తెలుగులో)',
    badge: '46. API Auth & Headers',
    subtopics: 'Query Parameters vs Headers · Authentication Types (Bearer, API Keys) · Connection & Read Timeouts · response.raise_for_status() · Resilient Retry Strategies',
    desc: 'API లకి సెక్యూరిటీ కోసం పాస్వర్డ్స్ / టోకెన్స్ ఎలా పంపాలి? ఇంటర్నెట్ ప్రాబ్లమ్స్ వల్ల సర్వర్ ఆగిపోతే మన పైథాన్ కోడ్ క్రాష్ అవ్వకుండా ఎలా ఆపాలో (Timeouts & Errors) చూద్దాం.',
    sections: [
      {
        title: '1. API Headers & సెక్యూరిటీ టోకెన్స్ (Authentication)',
        body: `<p>మనం రిక్వెస్ట్ పంపేటప్పుడు డేటాని రెండు రకాలుగా పంపొచ్చు:</p>
        <table class="tbl" style="margin-top:8px; font-size:12.5px;">
          <tr><th>పేరు</th><th>ఎలా ఉంటుంది?</th><th>ఎందుకు వాడాలి?</th></tr>
          <tr><td><strong>Query Parameters</strong></td><td>URL చివరలో <code>?sort=price</code> లాగా ఉంటుంది.</td><td>డేటాని ఫిల్టర్ చేయడానికి, సెర్చ్ చేయడానికి.</td></tr>
          <tr><td><strong>HTTP Headers</strong></td><td>బ్యాక్ గ్రౌండ్ లో దాగి పంపుతాం.</td><td>సెక్యూరిటీ టోకెన్స్, డేటా ఫార్మాట్ (JSON) చెప్పడానికి.</td></tr>
        </table>

        <h4 style="color:#10b981; margin:16px 0 8px;">API సెక్యూరిటీ రకాలు:</h4>
        <ol style="line-height:1.8; margin-left:20px;">
          <li><strong>Bearer Tokens (JWT):</strong> మోడ్రన్ వెబ్సైట్స్ వాడే ఫార్మాట్. <code>{"Authorization": "Bearer token_xyz..."}</code> అని హెడర్ లో పంపుతారు.</li>
          <li><strong>API Keys:</strong> OpenAI లాంటివి వాడే ఫార్మాట్. <code>{"X-API-Key": "sk_live_123..."}</code> అని పంపుతారు.</li>
        </ol>`,
        code: `def build_secure_headers(api_key: str):
    """ప్రొడక్షన్ కి పనికొచ్చే సెక్యూర్ హెడర్స్ ని తయారు చేసే ఫంక్షన్."""
    return {
        "Authorization": f"Bearer {api_key}",
        "User-Agent": "MyPythonApp/1.0",
        "Accept": "application/json",
        "Content-Type": "application/json"
    }

# హెడర్స్ ని క్రియేట్ చేసి చూద్దాం:
sample_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.secret_payload"
headers = build_secure_headers(sample_token)

print("--- 🛡️ ఫైనల్ హెడర్స్ ఇవే ---")
for key, value in headers.items():
    # సెక్యూరిటీ కోసం టోకెన్ మొత్తం ప్రింట్ చేయకుండా హైడ్ చేద్దాం:
    masked_value = value[:15] + "..." if key == "Authorization" else value
    print(f"• {key:15}: {masked_value}")`,
        codeTitle: 'Example 1: Building Secure Production Request Headers',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 సెక్యూరిటీ రూల్:</strong>
          <p style="margin-top:6px;">ఎప్పుడూ టోకెన్స్ ని లేదా పాస్వర్డ్స్ ని లాగ్ ఫైల్స్ లో (లేదా ప్రింట్ స్టేట్మెంట్స్ లో) పూర్తిగా చూపించకూడదు. ఎవరైనా హ్యాక్ చేస్తే ఈజీగా దొరికేస్తాయి.</p>
        </div>`
      },
      {
        title: '2. సర్వర్ హ్యాంగ్ అయితే? (Timeouts & Error Handling)',
        body: `<p>రియల్ వరల్డ్ ప్రాజెక్ట్స్ లో సర్వర్లు ఒక్కోసారి రిప్లై ఇవ్వకుండా ఆగిపోతాయి (Hang). అప్పుడు మీ పైథాన్ కోడ్ <code>timeout</code> అని పెట్టుకోకపోతే, అది కూడా లైఫ్ టైమ్ వెయిట్ చేస్తూ ఆగిపోతుంది!</p>

        <h4 style="color:#10b981; margin:16px 0 8px;">ఎలా తప్పించుకోవాలి?</h4>
        <ol style="line-height:1.8; margin-left:20px;">
          <li><strong>Timeouts:</strong> ఎప్పుడూ <code>timeout=5</code> అని ఇవ్వాలి. (5 సెకండ్లలో రిప్లై రాకపోతే ఆగిపోతుంది).</li>
          <li><strong><code>raise_for_status()</code>:</strong> ఇది వాడితే 404 లేదా 500 లాంటి ఎర్రర్స్ వచ్చినప్పుడు సైలెంట్ గా ఉండకుండా ఆటోమాటిక్ గా పైథాన్ లో ఎర్రర్ (Exception) త్రో చేస్తుంది.</li>
          <li><strong>Session Pooling:</strong> ఒకే సర్వర్ కి చాలాసార్లు రిక్వెస్ట్ పంపాల్సి వస్తే <code>requests.Session()</code> వాడితే 300% ఫాస్ట్ అవుతుంది (ప్రతిసారీ కొత్త కనెక్షన్ ఓపెన్ చేయదు).</li>
        </ol>`,
        code: `class ResilientAPIClient:
    def __init__(self, base_url="https://api.github.com"):
        self.base_url = base_url

    def execute_api_call(self, endpoint, simulate_condition="success"):
        """నెట్వర్క్ ప్రాబ్లమ్స్ ని సిమ్యులేట్ చేద్దాం."""
        print(f"\\n--- 📡 రిక్వెస్ట్: {endpoint} ({simulate_condition}) ---")
        try:
            if simulate_condition == "timeout":
                raise TimeoutError("కనెక్షన్ టైమ్ ఔట్ అయ్యింది (సర్వర్ బిజీ)")
            elif simulate_condition == "404":
                raise Exception("HTTPError: 404 - ఆ లింక్ లేదు")
            elif simulate_condition == "connection_refused":
                raise ConnectionRefusedError("ఇంటర్నెట్ లేదు లేదా సర్వర్ డౌన్")
            
            return {"status": "success", "data": "Pong!"}
        
        except TimeoutError as err:
            print(f"⏳ [TIMEOUT] సర్వర్ స్లో గా ఉంది: {err}")
        except ConnectionRefusedError as err:
            print(f"🔌 [NETWORK] కనెక్ట్ అవ్వలేకపోతున్నా: {err}")
        except Exception as err:
            print(f"❌ [HTTP ERROR] : {err}")
        return None

client = ResilientAPIClient()
client.execute_api_call("/status", "success")
client.execute_api_call("/users/999", "404")
client.execute_api_call("/slow-query", "timeout")`,
        codeTitle: 'Example 2: Resilient API Error Trapping and Timeout Handling',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Session ఎందుకు ముఖ్యం?:</strong>
          <p style="margin-top:6px;">ప్రతి రిక్వెస్ట్ కీ సర్వర్ తో హ్యాండ్ షేక్ (నెట్వర్క్ కనెక్షన్) చేసుకోవడానికి టైమ్ పడుతుంది. సెషన్ వాడితే ఆ కనెక్షన్ ని ఓపెన్ చేసి ఉంచుతుంది. దీనివల్ల టైమ్ సేవ్ అవుతుంది.</p>
        </div>`
      }
    ],
    mistake: {
      title: 'మామూలు "except Exception:" వాడటం',
      text: 'ఏ ఎర్రర్ వచ్చినా "except Exception:" అని పెడితే, మన కోడ్ లో ఏమైనా స్పెల్లింగ్ తప్పులు ఉన్నా కూడా సైలెంట్ గా కవర్ అయిపోతాయి. ఎప్పుడూ స్పెసిఫిక్ గా Timeout Error, Connection Error లనే క్యాచ్ చేయాలి.'
    },
    tryIt: {
      desc: 'ఒక ఫంక్షన్ safe_fetch_user(id) రాయండి. నెట్వర్క్ ఎర్రర్ వస్తే {"name": "Guest", "is_fallback": True} అని డీఫాల్ట్ డేటా ఇవ్వాలి.',
      code: `def safe_fetch_user(user_id, simulate_fail=False):
    try:
        if simulate_fail:
            raise ConnectionError("నెట్వర్క్ కట్ అయ్యింది!")
        return {"user_id": user_id, "name": "Balaji", "is_fallback": False}
    except Exception as err:
        print(f"⚠️ వార్నింగ్: డేటా రాలేదు ({err}). డీఫాల్ట్ ఇస్తున్నా.")
        return {"user_id": user_id, "name": "Guest", "is_fallback": True}

print("సక్సెస్: ", safe_fetch_user(101, False))
print("ఫెయిల్యూర్:", safe_fetch_user(101, True))`
    },
    faqs: [
      {
        q: 'Exponential Backoff అంటే ఏంటి?',
        a: 'సర్వర్ డౌన్ అయినప్పుడు వెంటనే పదే పదే రిక్వెస్ట్ చేస్తే అది ఇంకా లోడ్ అవుతుంది. అందుకే మొదట 1 సెకండ్, తర్వాత 2, తర్వాత 4, అలా టైమ్ గ్యాప్ పెంచుకుంటూ రిక్వెస్ట్ చేయడాన్ని ఎక్స్పోనెన్షియల్ బ్యాక్ఆఫ్ అంటారు.'
      },
      {
        q: 'Accept హెడర్ ఎందుకు వాడాలి?',
        a: '"Accept: application/json" అని పంపితే, సర్వర్ కి "నాకు JSON ఫార్మాట్ లోనే ఆన్సర్ కావాలి" అని చెప్తున్నట్టు లెక్క.'
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
    title: 'DB & API ప్రాజెక్ట్స్ (తెలుగులో)',
    badge: '47. DB & API Capstone',
    subtopics: '4 Full Projects · 1. SQLite E-Commerce Engine · 2. Weather & Stocks Client · 3. SQLAlchemy 2.0 Task Manager · 4. Resilient GitHub Client',
    desc: 'ఇంతవరకు నేర్చుకున్న డేటాబేస్, API కాన్సెప్ట్స్ తో 4 రియల్ వరల్డ్ ప్రాజెక్ట్స్ (E-Commerce స్టాక్ చెక్కింగ్, లైవ్ వెదర్ API, SQLAlchemy తో టాస్క్ మేనేజర్, GitHub క్లయింట్) చేద్దాం.',
    sections: [
      {
        title: '1. ప్రాజెక్ట్ 1: SQLite తో E-Commerce ఇన్వెంటరీ సిస్టమ్',
        body: `<p>యూజర్ వస్తువులు కొంటున్నప్పుడు, స్టాక్ ఉందా లేదా చెక్ చేసి, ఉంటే ఆర్డర్ ప్లేస్ చేసి, ఆటోమాటిక్ గా స్టాక్ తగ్గించే (Atomic Transactions) ఒక కంప్లీట్ సిస్టమ్ ని రాద్దాం.</p>`,
        code: `# ప్రాజెక్ట్ 1: E-COMMERCE ఆర్డర్స్ మేనేజర్
import sqlite3

conn = sqlite3.connect(":memory:")
conn.row_factory = sqlite3.Row
cur = conn.cursor()

# Foreign Keys ఆన్ చేద్దాం:
cur.execute("PRAGMA foreign_keys = ON")

# ప్రోడక్ట్స్ టేబుల్:
cur.execute("""
CREATE TABLE products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    stock INTEGER NOT NULL
)
""")

# ఆర్డర్స్ టేబుల్ (ప్రోడక్ట్ ఐడీ కి లింక్):
cur.execute("""
CREATE TABLE orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer TEXT NOT NULL,
    product_id INTEGER NOT NULL,
    qty INTEGER NOT NULL,
    total REAL NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products (id)
)
""")

# స్టార్టింగ్ లో కొన్ని ప్రోడక్ట్స్ పెడదాం:
cur.executemany("INSERT INTO products (name, price, stock) VALUES (?, ?, ?)", [
    ("Laptop", 50000.0, 5),
    ("Mouse", 500.0, 20)
])
conn.commit()

def process_order(customer, product_id, qty):
    print(f"\\n🛍️ ఆర్డర్: '{customer}' కి {qty}x ప్రోడక్ట్ #{product_id} కావాలి...")
    try:
        # స్టాక్ ఉందో లేదో చెక్ చేద్దాం:
        cur.execute("SELECT name, price, stock FROM products WHERE id = ?", (product_id,))
        product = cur.fetchone()
        
        if not product: raise ValueError("ప్రోడక్ట్ లేదు!")
        if product["stock"] < qty: raise ValueError("స్టాక్ అయిపోయింది!")

        total = product["price"] * qty

        # స్టాక్ తగ్గిద్దాం:
        cur.execute("UPDATE products SET stock = stock - ? WHERE id = ?", (qty, product_id))
        
        # ఆర్డర్ బుక్ చేద్దాం:
        cur.execute("INSERT INTO orders (customer, product_id, qty, total) VALUES (?, ?, ?, ?)", 
                   (customer, product_id, qty, total))

        conn.commit()
        print(f"✅ ఆర్డర్ సక్సెస్! టోటల్: ₹{total:,.2f} ({product['name']})")
    except Exception as err:
        conn.rollback() # ఏ ఎర్రర్ వచ్చినా ఆర్డర్ క్యాన్సిల్!
        print(f"❌ ఆర్డర్ ఫెయిల్: {err}")

process_order("Balaji", 1, 2)  # సక్సెస్: లాప్టాప్స్ 2 కొన్నాడు
process_order("Alex", 1, 10)   # ఫెయిల్: స్టాక్ లేదు
process_order("Chloe", 2, 3)   # సక్సెస్: మౌస్ లు 3 కొన్నాడు

print("\\n--- మిగిలిన స్టాక్ ---")
cur.execute("SELECT * FROM products")
for p in cur.fetchall():
    print(f"• {p['name']:10} | స్టాక్: {p['stock']}")
conn.close()`,
        codeTitle: 'Project 1: Relational SQLite E-Commerce Engine',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 ఈ కోడ్ పవర్:</strong>
          <p style="margin-top:6px;">ఒకవేళ స్టాక్ తగ్గించాక, ఆర్డర్ బుక్ అయ్యేలోపు కరెంట్ పోతే? <code>conn.rollback()</code> వల్ల తగ్గిన స్టాక్ ఆటోమాటిక్ గా వెనక్కి వచ్చేస్తుంది.</p>
        </div>`
      },
      {
        title: '2. ప్రాజెక్ట్ 2: Live Weather & Stock API క్లయింట్',
        body: `<p>లైవ్ వెదర్ అప్డేట్స్ మరియు స్టాక్ మార్కెట్ వాల్యూస్ ని తెచ్చుకుని, నీట్ గా ప్రింట్ చేసే ఒక API క్లయింట్ క్లాస్ రాద్దాం:</p>`,
        code: `# ప్రాజెక్ట్ 2: వెదర్ & స్టాక్ మార్కెట్ క్లయింట్
class WeatherStockAPIClient:
    def __init__(self, api_key="my_key"):
        self.api_key = api_key

    def get_weather(self, city):
        # రియల్ టైమ్ డేటా లాగా సిమ్యులేట్ చేద్దాం:
        data = {"city": city, "temp": 28.5, "condition": "Cloudy ⛅"}
        return f"🌤️ {data['city']} వెదర్: {data['temp']}°C ({data['condition']})"

    def get_stock(self, ticker):
        quotes = {"TCS": 4250.0, "INFY": 1820.5}
        price = quotes.get(ticker, 1000.0)
        return f"📈 [{ticker}] స్టాక్ ప్రైస్: ₹{price:,.2f}"

client = WeatherStockAPIClient()
print(client.get_weather("Hyderabad"))
print(client.get_stock("TCS"))`,
        codeTitle: 'Project 2: REST API Weather and Stock Market Client',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 API Abstraction:</strong>
          <p style="margin-top:6px;">యూజర్లకి పెద్ద డిక్షనరీ కాకుండా వాళ్లకు అర్థమయ్యే టెక్స్ట్ గా ఫార్మాట్ చేసి ఇవ్వడమే ఈ క్లయింట్ పని.</p>
        </div>`
      },
      {
        title: '3. ప్రాజెక్ట్ 3: SQLAlchemy తో టాస్క్ మేనేజర్',
        body: `<p>SQL వాడకుండా, <strong>SQLAlchemy 2.0 (ORM)</strong> వాడి ఒక ప్రొజెక్ట్ కింద చాలా టాస్క్స్ (One-to-Many లింక్ తో) ఎలా మేనేజ్ చేయాలో చూద్దాం.</p>`,
        code: `from typing import List
from sqlalchemy import create_engine, String, Boolean, ForeignKey, select
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship, Session

class Base(DeclarativeBase): pass

class Project(Base):
    __tablename__ = "projects"
    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(50))
    # టాస్క్స్ కి లింక్:
    tasks: Mapped[List["Task"]] = relationship(cascade="all, delete")

class Task(Base):
    __tablename__ = "tasks"
    id: Mapped[int] = mapped_column(primary_key=True)
    desc: Mapped[str] = mapped_column(String(100))
    done: Mapped[bool] = mapped_column(Boolean, default=False)
    project_id: Mapped[int] = mapped_column(ForeignKey("projects.id"))

engine = create_engine("sqlite:///:memory:")
Base.metadata.create_all(engine)

with Session(engine) as session:
    # ప్రాజెక్ట్ క్రియేట్ చేసి టాస్క్స్ యాడ్ చేద్దాం:
    p = Project(title="Python Course")
    p.tasks.append(Task(desc="Learn ORM", done=True))
    p.tasks.append(Task(desc="Build API", done=False))
    
    session.add(p)
    session.commit()

    # డేటా చదువుదాం:
    saved_project = session.scalar(select(Project).where(Project.id == 1))
    print(f"--- 📋 {saved_project.title} ---")
    for t in saved_project.tasks:
        print(f"  [{'x' if t.done else ' '}] {t.desc}")`,
        codeTitle: 'Project 3: SQLAlchemy 2.0 Task Management System',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 ORM మ్యాజిక్:</strong>
          <p style="margin-top:6px;"><code>p.tasks.append()</code> చేయగానే, దాని ID ని ఆటోమాటిక్ గా తీసుకుని (Foreign Key) లింక్ చేసుకుంటుంది.</p>
        </div>`
      },
      {
        title: '4. ప్రాజెక్ట్ 4: GitHub API క్లయింట్ (సేఫ్టీ తో)',
        body: `<p>GitHub API ని వాడి ఏదైనా రిపోజిటరీకి ఎన్ని స్టార్స్ ఉన్నాయో చూసి, ఎర్రర్స్ వస్తే సేఫ్ గా ఆన్సర్ ఇచ్చే క్లాస్ రాద్దాం.</p>`,
        code: `# ప్రాజెక్ట్ 4: GitHub API క్లయింట్
class GitHubAPIClient:
    def __init__(self):
        self.headers = {"Accept": "application/vnd.github.v3+json"}

    def fetch_repo_summary(self, owner, repo):
        # API రెస్పాన్స్ ని సిమ్యులేట్ చేద్దాం:
        data = {
            "full_name": f"{owner}/{repo}",
            "stars": 34890,
            "language": "Python"
        }
        
        return {
            "Repo": data["full_name"],
            "Stars": f"{data['stars']:,} ⭐",
            "Lang": data["language"]
        }

gh = GitHubAPIClient()
info = gh.fetch_repo_summary("psf", "black")

print("--- 🐙 GitHub Repo డేటా ---")
for key, val in info.items():
    print(f"• {key:5}: {val}")`,
        codeTitle: 'Project 4: Resilient GitHub API Client',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 మంచి డిజైన్:</strong>
          <p style="margin-top:6px;">హెడర్స్ ని, టైమ్ అవుట్స్ ని ఒక క్లాస్ లో పెట్టుకుంటే అన్ని రిక్వెస్ట్స్ కీ డీఫాల్ట్ గా వెళ్లిపోతాయి, పదే పదే రాయక్కర్లేదు.</p>
        </div>`
      }
    ],
    mistake: {
      title: 'డేటాబేస్ కనెక్షన్స్ క్లోజ్ చేయకపోవడం',
      text: 'కోడ్ రన్ అయ్యాక ఎప్పుడూ డేటాబేస్ కనెక్షన్స్ ని క్లోజ్ చేయాలి (లేదా with బ్లాక్ వాడాలి). అలా ఓపెన్ వదిలేస్తే, విండోస్ లాంటి సిస్టమ్స్ ఆ ఫైల్ ని డిలీట్ చేయనివ్వవు, సిస్టమ్ స్లో అయిపోతుంది.'
    },
    tryIt: {
      desc: 'ఒక బుక్స్ డేటాబేస్ లో టైటిల్, ఆథర్, రేటింగ్ పెట్టి, 3 బుక్స్ యాడ్ చేసి, రేటింగ్ ఎక్కువ ఉన్న బుక్స్ ముందు ప్రింట్ చేయండి.',
      code: `import sqlite3

conn = sqlite3.connect(":memory:")
cur = conn.cursor()
cur.execute("CREATE TABLE books (title TEXT, author TEXT, rating REAL)")

def add_book(t, a, r):
    cur.execute("INSERT INTO books VALUES (?, ?, ?)", (t, a, r))
    conn.commit()

add_book("Fluent Python", "Luciano", 4.9)
add_book("Clean Code", "Robert", 4.7)

cur.execute("SELECT * FROM books ORDER BY rating DESC")
print("Top Books:")
for b in cur.fetchall():
    print(f"• {b[0]} by {b[1]} ({b[2]}⭐)")
conn.close()`
    },
    faqs: [
      {
        q: 'SQL కి, NoSQL (MongoDB) కి తేడా ఏంటి?',
        a: 'SQL లో డేటా అంతా పర్ఫెక్ట్ టేబుల్స్ లో ఉంటుంది. NoSQL లో డేటా డిక్షనరీల (JSON) లాగా స్టోర్ అవుతుంది, దానికి పర్టికులర్ టేబుల్ రూల్స్ ఉండవు.'
      }
    ]
  }
];
