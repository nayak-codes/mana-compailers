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
    title: 'Python Exceptions & Error Handling (తెలుగులో)',
    badge: '25. Exception Handling',
    subtopics: 'Errors vs Exceptions · try-except-else-finally · Multiple Exceptions · raise · Custom Exceptions · Hierarchy · Useful Messages',
    desc: 'Python లో ఎర్రర్స్ వస్తే కోడ్ ఆగిపోకుండా ఎలా కాపాడుకోవాలి? try-except బ్లాక్స్, ఎర్రర్ రావడం (Exceptions), మన సొంత ఎర్రర్స్ క్రియేట్ చేయడం గురించి పూర్తిగా నేర్చుకుందాం.',
    sections: [
      {
        title: '1. Syntax Errors vs Runtime Exceptions',
        body: `<p>పైథాన్ లో బగ్స్ (తప్పులు) రెండు రకాలుగా వస్తాయి:</p>
        <ol>
          <li><strong>Syntax Errors (గ్రామర్ తప్పులు):</strong> మీరు కోడ్ లో <code>:</code> (కోలన్) మర్చిపోయినా, బ్రాకెట్ క్లోజ్ చేయకపోయినా ఇవి వస్తాయి. కోడ్ రన్ అవ్వకముందే పైథాన్ ఆపేస్తుంది (<code>SyntaxError</code>). వీటిని మనం <code>try-except</code> తో ఆపలేం. మీరు కరెక్ట్ చేయాల్సిందే.</li>
          <li><strong>Exceptions (రన్ టైమ్ లో వచ్చేవి):</strong> మీ కోడ్ కరెక్ట్ గానే ఉన్నా, రన్ అయ్యేటప్పుడు వచ్చే ఎర్రర్స్. ఉదాహరణకి నెంబర్ ని సున్నా (0) తో భాగిస్తే వచ్చే <code>ZeroDivisionError</code> లేదా లేని ఫైల్ ఓపెన్ చేస్తే వచ్చే <code>FileNotFoundError</code>. వీటిని మనం ఆపి కోడ్ ముందుకు వెళ్లేలా చేయొచ్చు.</li>
        </ol>
        <p><strong>The Exception Hierarchy (వంశవృక్షం):</strong> పైథాన్ లో అన్ని ఎర్రర్స్ కి ఒక పేరెంట్ ఉంటుంది:</p>
        <div class="diagram-box">┌────────────────────────────────────────────────────────┐
│  BaseException (తాతయ్య)                                │
│  ├── SystemExit, KeyboardInterrupt (Ctrl+C)            │
│  └── Exception (తండ్రి - మన యాప్ ఎర్రర్స్ కి)          │
│      ├── ArithmeticError (ZeroDivisionError)           │
│      ├── LookupError (IndexError, KeyError)            │
│      ├── TypeError, ValueError                         │
│      └── OSError (FileNotFoundError)                   │
└────────────────────────────────────────────────────────┘</div>
        <div class="callout" style="margin:16px 0;">
          <strong style="color:#ef4444;">⚠️ రూల్: ఎప్పుడూ BaseException ని క్యాచ్ చేయకండి:</strong><br>
          మనం ఎప్పుడూ <code>Exception</code> ని మాత్రమే క్యాచ్ చేయాలి. <code>BaseException</code> ని క్యాచ్ చేస్తే, యూజర్ <code>Ctrl+C</code> నొక్కి ఆపాలనుకున్నా మీ కోడ్ ఆపకుండా ఇబ్బంది పెడుతుంది.
        </div>`,
        code: `# రన్ టైమ్ లో ఈ ఎర్రర్స్ ఏ గ్రూప్ కి చెందుతాయో చూద్దాం:
print("Is ZeroDivisionError an ArithmeticError?", issubclass(ZeroDivisionError, ArithmeticError))
print("Is KeyError a LookupError?", issubclass(KeyError, LookupError))
print("Is FileNotFoundError an OSError?", issubclass(FileNotFoundError, OSError))
print("Is ArithmeticError an Exception?", issubclass(ArithmeticError, Exception))`,
        codeTitle: 'Example 1: Inspecting Python Built-in Exception Hierarchy',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Inheritance సీక్రెట్:</strong>
          <p style="margin-top:6px;"><code>KeyError</code> అనేది <code>LookupError</code> గ్రూప్ లో ఉంటుంది కాబట్టి, మనం <code>except LookupError:</code> అని రాస్తే చాలు, అది రెండు రకాల ఎర్రర్స్ (IndexError, KeyError) ని ఒకేసారి క్యాచ్ చేస్తుంది!</p>
        </div>`
      },
      {
        title: '2. ది కంప్లీట్ ఫ్లో: try, except, else, finally',
        body: `<p>ప్రొఫెషనల్ పైథాన్ కోడ్ లో ఎర్రర్ హ్యాండ్లింగ్ కి 4 బ్లాక్స్ ఉంటాయి:</p>
        <ul>
          <li><strong><code>try</code>:</strong> ఎర్రర్ రావచ్చు అని డౌట్ ఉన్న రిస్కీ కోడ్ ని ఇందులో రాస్తాం.</li>
          <li><strong><code>except</code>:</strong> <code>try</code> లో ఎర్రర్ వస్తేనే ఈ కోడ్ రన్ అవుతుంది (కోడ్ క్రాష్ అవ్వకుండా ఆపుతుంది).</li>
          <li><strong><code>else</code>:</strong> <code>try</code> లో <strong>ఎలాంటి ఎర్రర్ రాకపోతేనే</strong> ఇది రన్ అవుతుంది (సక్సెస్ అయితే).</li>
          <li><strong><code>finally</code>:</strong> ఎర్రర్ వచ్చినా, రాకపోయినా లాస్ట్ లో <strong>ఖచ్చితంగా 100% రన్ అయ్యేది</strong> ఇదే. ఫైల్స్ క్లోజ్ చేయడానికి, డేటాబేస్ డిస్కనెక్ట్ చేయడానికి వాడతారు.</li>
        </ul>`,
        code: `def safe_divide_engine(a, b):
    print(f"\\n--- Attempting: {a} / {b} ---")
    try:
        # Step 1: రిస్కీ కోడ్
        result = a / b
    except ZeroDivisionError as err:
        # Step 2: జీరో తో డివైడ్ చేస్తే
        print(f"❌ Handled Error: సున్నా తో భాగించకూడదు! ({err})")
        return None
    except TypeError as err:
        # Step 2: వేరేవి ఇస్తే (ఉదా: స్ట్రింగ్)
        print(f"❌ Handled Error: నెంబర్స్ మాత్రమే ఇవ్వాలి! ({err})")
        return None
    else:
        # Step 3: సక్సెస్ అయితే మాత్రమే రన్ అవుతుంది
        print(f"✅ Calculation Successful! Result = {result}")
        return result
    finally:
        # Step 4: ఎప్పుడూ రన్ అవుతుంది
        print("🔒 [Cleanup] safe_divide_engine సైకిల్ పూర్తయింది.")

# అన్ని రకాలుగా టెస్ట్ చేద్దాం:
safe_divide_engine(100, 4)   # Success (try -> else -> finally)
safe_divide_engine(50, 0)    # Zero Division (try -> except -> finally)
safe_divide_engine(10, "2")  # Type Error (try -> except -> finally)`,
        codeTitle: 'Example 2: The Complete 4-Clause try-except-else-finally Flow',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 గమనించారా?:</strong>
          <p style="margin-top:6px;">ఫస్ట్ దాంట్లో సక్సెస్ అయింది కాబట్టి <code>else</code> రన్ అయింది. మిగతా రెంటిలో ఎర్రర్ వచ్చింది కాబట్టి <code>except</code> రన్ అయింది. కానీ మూడు సార్లూ <code>finally</code> మాత్రం గ్యారెంటీగా రన్ అయింది.</p>
        </div>`
      },
      {
        title: '3. చాలా ఎర్రర్స్ వస్తే? (Grouping Exceptions)',
        body: `<p>ఎప్పుడూ సింపుల్ గా <code>except:</code> అని రాయకండి. దేనికి ఆ ఎర్రర్ పేరు పెట్టి పట్టుకోవాలి, అప్పుడే ఏ తప్పు జరిగిందో క్లియర్ గా తెలుస్తుంది. మీరు కావాలంటే ఒకేసారి రెండు ఎర్రర్స్ ని బ్రాకెట్స్ (Tuple) లో పెట్టి క్యాచ్ చేయొచ్చు:</p>`,
        code: `def process_user_record(data_dict, key, divisor):
    try:
        raw_val = data_dict[key]          # కీ లేకపోతే KeyError
        parsed_num = float(raw_val)       # టెక్స్ట్ ఉంటే ValueError
        computed = 1000 / parsed_num      # సున్నా ఉంటే ZeroDivisionError
        return computed
    except KeyError:
        print(f"❌ Error: డేటా లో '{key}' అనే ఫీల్డ్ లేదు!")
    except (ValueError, TypeError) as err:
        print(f"❌ Data Parsing Error: నెంబర్ ఫార్మాట్ తప్పు ({err})")
    except ZeroDivisionError:
        print("❌ Math Error: సున్నా తో క్యాలిక్యులేట్ చేయలేము!")

# టెస్టింగ్:
user_data = {"score": "50", "bonus": "zero", "zero_val": "0"}

print("1. Valid score:    ", process_user_record(user_data, "score", 2))
print("2. Missing key:    ", process_user_record(user_data, "missing_key", 2))
print("3. Bad number string:", process_user_record(user_data, "bonus", 2))
print("4. Division by zero:", process_user_record(user_data, "zero_val", 2))`,
        codeTitle: 'Example 3: Handling Multiple Specific Exceptions and Tuple Grouping',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 ఎందుకు ఇలా రాయాలి?:</strong>
          <p style="margin-top:6px;">ఇలా ఒక్కొక్కదానికి రాస్తే, కీ లేకపోతే యూజర్ ని మళ్ళీ కీ అడగమని చెప్పొచ్చు, సున్నా ఇస్తే వేరే నెంబర్ అడగమని చెప్పొచ్చు. జనరిక్ గా ఫెయిల్ అవ్వకుండా ఉండొచ్చు.</p>
        </div>`
      },
      {
        title: '4. కావాలని ఎర్రర్ తెప్పించడం (raise)',
        body: `<p>యూజర్ వయస్సు -5 ఇస్తే మన కోడ్ క్రాష్ అవ్వదు కానీ బిజినెస్ రూల్ ప్రకారం అది తప్పు. ఇలాంటి టైం లో మనమే కావాలని <strong><code>raise</code></strong> వాడి ఎర్రర్ త్రో చేయాలి (విసిరేయాలి):</p>`,
        code: `def validate_account_age(age):
    if not isinstance(age, int):
        raise TypeError(f"Age అనేది నెంబర్ అయిఉండాలి, కానీ {type(age).__name__} వచ్చింది")
    if age < 0:
        raise ValueError(f"వయస్సు మైనస్ లో ఉండకూడదు! మీరు ఇచ్చింది: {age}")
    if age < 18:
        raise PermissionError(f"వయస్సు {age} ఇయర్స్. అకౌంట్ కి 18 నిండాలి.")
    return "✅ Age verified successfully!"

# టెస్టింగ్:
try:
    print(validate_account_age(22))  # ఓకే
    validate_account_age(-5)         # ఇక్కడ ValueError వస్తుంది
except (TypeError, ValueError, PermissionError) as err:
    print(f"🚫 Validation Failed: {err}")`,
        codeTitle: 'Example 4: Explicit Exception Raising and Guarding Business Logic',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Fail-Fast రూల్:</strong>
          <p style="margin-top:6px;">తప్పు డేటా వస్తే అక్కడే కోడ్ ని ఆపేసి ఎర్రర్ ఇవ్వాలి. లేకపోతే ఆ తప్పు డేటా డేటాబేస్ లోకి వెళ్లిపోయి పెద్ద ప్రాబ్లం అవుతుంది.</p>
        </div>`
      },
      {
        title: '5. మన సొంత కస్టమ్ ఎర్రర్స్ రాసుకోవడం',
        body: `<p>పెద్ద ప్రాజెక్ట్స్ (బ్యాంకింగ్ యాప్స్) లో పైథాన్ ఎర్రర్స్ కాకుండా, మన బిజినెస్ కి తగ్గట్టు మన సొంత ఎర్రర్స్ క్లాసెస్ రాసుకోవచ్చు (Exception ని పేరెంట్ గా పెట్టి):</p>`,
        code: `# మన సొంత ఎర్రర్స్ ని డిజైన్ చేద్దాం:
class BankingAppError(Exception):
    """అన్ని బ్యాంకింగ్ ఎర్రర్స్ కి ఇది పేరెంట్."""
    pass

class InsufficientFundsError(BankingAppError):
    """బ్యాలెన్స్ కంటే ఎక్కువ డబ్బులు అడిగితే వచ్చే ఎర్రర్."""
    def __init__(self, balance, amount_requested):
        self.balance = balance
        self.amount_requested = amount_requested
        self.shortage = amount_requested - balance
        super().__init__(
            f"Withdrawal of Rs.{amount_requested:.2f} failed! "
            f"Current Balance: Rs.{balance:.2f} (Short by Rs.{self.shortage:.2f})"
        )

class AccountLockedError(BankingAppError):
    """అకౌంట్ బ్లాక్ అయి ఉంటే వచ్చే ఎర్రర్."""
    pass

def withdraw_money(account_balance, amount, is_locked=False):
    if is_locked:
        raise AccountLockedError("అకౌంట్ లాక్ లో ఉంది. కస్టమర్ కేర్ కి కాల్ చేయండి.")
    if amount > account_balance:
        raise InsufficientFundsError(account_balance, amount) # మన ఎర్రర్!
    return account_balance - amount

# టెస్టింగ్:
try:
    new_bal = withdraw_money(500.0, 750.0) # బ్యాలెన్స్ 500, కానీ 750 కావాలంటున్నాడు
except InsufficientFundsError as err:
    print("💳 Transaction Blocked:", err)
    print(f"👉 కస్టమర్ ఇంకా Rs.{err.shortage:.2f} వేయాలి.")
except BankingAppError as err:
    print("🏦 General Banking Error:", err)`,
        codeTitle: 'Example 5: Designing Custom Application Exceptions',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 ప్రొఫెషనల్ అప్రోచ్:</strong>
          <p style="margin-top:6px;">ఇలా మన సొంత ఎర్రర్స్ (ఉదా: <code>InsufficientFundsError</code>) క్రియేట్ చేయడం వల్ల, వేరే వాళ్ళకి మన కోడ్ లో ఏం జరుగుతుందో ఈజీగా అర్థమవుతుంది. అందులో <code>err.shortage</code> లాంటి ఎక్స్ట్రా డేటా కూడా పంపొచ్చు.</p>
        </div>`
      }
    ],
    mistake: {
      title: 'బ్లైండ్ గా "except:" అని వదిలేయడం',
      text: 'ఉట్టి except: అని రాస్తే అది స్పెల్లింగ్ తప్పులు, అవుట్ ఆఫ్ మెమరీ అన్నీ ఆపేస్తుంది. దీనివల్ల అసలు ఏం తప్పు జరుగుతుందో ఎప్పటికీ అర్థం కాదు. ఎప్పుడూ except ValueError: అలా పేరు పెట్టి పట్టుకోవాలి.'
    },
    tryIt: {
      desc: 'యూజర్ ని ఒక ఇంటీజర్ (నెంబర్) అడగండి. అతను తప్పుగా టెక్స్ట్ ఇస్తే క్రాష్ అవ్వకుండా, except వాడి "సరైన నెంబర్ ఇవ్వండి" అని చెప్పే కోడ్ రాయండి.',
      code: `def safe_int_converter(raw_value):
    try:
        return int(raw_value), "Success"
    except ValueError:
        return None, f"'{raw_value}' కరెక్ట్ నెంబర్ కాదు!"

# టెస్టింగ్:
for test_val in ["42", "hello", "100.5", "-99"]:
    val, status = safe_int_converter(test_val)
    print(f"Input: {test_val:8} -> Parsed: {val} ({status})")`
    },
    faqs: [
      {
        q: 'else కి finally కి తేడా ఏంటి?',
        a: 'try లో ఎర్రర్ రాకుండా అంతా సక్సెస్ అయితేనే else రన్ అవుతుంది. కానీ finally అలా కాదు, ఎర్రర్ వచ్చినా, రాకపోయినా లాస్ట్ లో ఖచ్చితంగా గ్యారెంటీగా రన్ అవుతుంది.'
      },
      {
        q: 'catch బ్లాక్ లోనే మళ్ళీ ఎర్రర్ వస్తే ఏమవుతుంది?',
        a: 'except బ్లాక్ లో కూడా ఎర్రర్ వస్తే ప్రోగ్రామ్ అక్కడే క్రాష్ అవుతుంది. పైథాన్ దాన్ని ఆపలేదు.'
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
    title: 'Python File Handling & with open() (తెలుగులో)',
    badge: '26. File I/O & Context Managers',
    subtopics: 'File Modes (r, w, a, x, b) · read() vs readline() · write() vs writelines() · with open() Context Manager · Buffer Management · UTF-8',
    desc: 'పైథాన్ ద్వారా మన కంప్యూటర్ లోని ఫైల్స్ ని (txt, csv) ఎలా ఓపెన్ చేయాలి? ఎలా చదవాలి? మరియు with open() ఎందుకు వాడాలి అనేది డీటెయిల్ గా చూద్దాం.',
    sections: [
      {
        title: '1. File ఓపెన్ చేయడం: open() ఫంక్షన్ & Modes',
        body: `<p>పైథాన్ ఫైల్ సిస్టమ్ తో మాట్లాడటానికి <code>open("filename", mode)</code> అనే ఫంక్షన్ ఇస్తుంది. మోడ్ ని బట్టి మనం ఫైల్ తో ఏం చేయగలమో డిసైడ్ అవుతుంది.</p>
        <h4 style="color:#10b981; margin:16px 0 8px;">File Modes ఇవే:</h4>
        <table class="tbl" style="margin-top:8px; font-size:12.5px;">
          <tr><th>Mode</th><th>Name</th><th>ఏం చేస్తుంది?</th><th>ఫైల్ ఉండాలా?</th></tr>
          <tr><td><code>'r'</code></td><td>Read (డిఫాల్ట్)</td><td>ఫైల్ లోని టెక్స్ట్ చదువుతుంది.</td><td><strong>ఉండాలి</strong> (లేకపోతే FileNotFoundError వస్తుంది)</td></tr>
          <tr><td><code>'w'</code></td><td>Write</td><td>పాత డేటా <strong>మొత్తం తుడిపేసి (ఎరేజ్ చేసి)</strong> కొత్తది రాస్తుంది.</td><td>అవసరం లేదు (లేకపోతే క్రియేట్ చేస్తుంది)</td></tr>
          <tr><td><code>'a'</code></td><td>Append</td><td>పాత డేటాని చెరపకుండా, దాని కింద (చివర్లో) కొత్తది <strong>యాడ్ చేస్తుంది</strong>.</td><td>అవసరం లేదు</td></tr>
          <tr><td><code>'x'</code></td><td>Exclusive</td><td>కొత్త ఫైల్ క్రియేట్ చేస్తుంది. అప్పటికే ఆ ఫైల్ ఉంటే క్రాష్ అవుతుంది.</td><td><strong>ఉండకూడదు!</strong></td></tr>
        </table>`,
        code: `# 1. Write మోడ్ ('w') తో ఫైల్ ఓపెన్ చేద్దాం:
f_write = open("sample_demo.txt", "w", encoding="utf-8")
f_write.write("Line 1: Hello from Python File I/O! 🚀\\n")
f_write.write("Line 2: Built-in file streaming is fast and portable.\\n")
f_write.close() # ఎప్పుడూ మాన్యువల్ గా క్లోజ్ చేయాలి!

# 2. Read మోడ్ ('r') తో చదువుదాం:
f_read = open("sample_demo.txt", "r", encoding="utf-8")
file_contents = f_read.read()
f_read.close()

print("--- ఫైల్ నుంచి చదివిన డేటా ---")
print(file_contents)`,
        codeTitle: 'Example 1: Basic File Writing and Reading with open() and close()',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 UTF-8 ఎందుకు?:</strong>
          <p style="margin-top:6px;">ఫైల్ ఓపెన్ చేసేటప్పుడు <code>encoding="utf-8"</code> రాయడం మర్చిపోకండి. లేదంటే మీ ఫైల్ లో ఎమోజీలు కానీ, తెలుగు అక్షరాలు కానీ ఉంటే విండోస్ లో క్రాష్ అయిపోతుంది.</p>
        </div>`
      },
      {
        title: '2. "with open()" (Context Manager) ఎందుకు మ్యాండేటరీ?',
        body: `<p>మామూలుగా <code>open()</code> వాడితే, పని అయ్యాక కచ్చితంగా <code>close()</code> రాయాలి. ఒకవేళ మధ్యలో ఏదైనా ఎర్రర్ వచ్చి కోడ్ క్రాష్ అయితే, <code>close()</code> రన్ అవ్వదు, ఆ ఫైల్ అలాగే లాక్ అయిపోయి మెమరీ వేస్ట్ అవుతుంది.</p>
        <p>దీనికి సొల్యూషన్ <strong><code>with open(...) as f:</code></strong>. దీన్ని వాడితే పని అయిపోగానే లేదా మధ్యలో క్రాష్ అయినా సరే, పైథాన్ <strong>ఆటోమాటిక్ గా ఫైల్ ని క్లోజ్ చేస్తుంది</strong> (దీన్నే Context Manager అంటారు)!</p>`,
        code: `# ఇండస్ట్రీలో వాడే సేఫ్ పద్ధతి ఇది:
with open("audit_log.txt", "w", encoding="utf-8") as file:
    file.write("2026-08-14 10:00:00 [INFO] System initialized successfully.\\n")
    file.write("2026-08-14 10:05:22 [INFO] Database connection active.\\n")
    # ఇక్కడ బ్లాక్ అయిపోగానే ఆటోమాటిక్ గా ఫైల్ close() అయిపోతుంది.

# ఫైల్ క్లోజ్ అయిందో లేదో మనమే చెక్ చేద్దాం:
print("Is the file closed?", file.closed) # True! గ్యారెంటీ!`,
        codeTitle: 'Example 2: Automatic Resource Management with with open()',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 ఇక క్లోజ్ తో పనిలేదు:</strong>
          <p style="margin-top:6px;"><code>with</code> వాడిన తర్వాత మీరు మీ లైఫ్ లో ఎప్పుడూ <code>f.close()</code> అని రాయక్కర్లేదు. పైథాన్ చూసుకుంటుంది.</p>
        </div>`
      },
      {
        title: '3. ఫైల్ చదవడానికి పద్ధతులు (Big Data Secrets)',
        body: `<p>ఫైల్స్ చదవడానికి మూడు పద్ధతులున్నాయి:</p>
        <ol>
          <li><code>f.read()</code>: ఫైల్ మొత్తాన్ని ఒకేసారి ర్యామ్ (RAM) లోకి లాగుతుంది. (చిన్న ఫైల్స్ కి ఓకే, 10GB లాగ్ ఫైల్స్ అయితే కంప్యూటర్ క్రాష్ అవుతుంది!).</li>
          <li><code>f.readlines()</code>: ఫైల్ మొత్తాన్ని చదివి ఒక్కో లైన్ ని ఒక లిస్ట్ లో వేస్తుంది.</li>
          <li><strong>Memory-Efficient పద్ధతి (<code>for line in f:</code>):</strong> ఇది ఫైల్ ని ఒకేసారి కాకుండా లైన్ బై లైన్ ఆపరేటింగ్ సిస్టం నుంచి తెస్తుంది. ఇది బెస్ట్ అప్రోచ్!</li>
        </ol>`,
        code: `# 1. ఒక డెమో ఫైల్ తయారుచేద్దాం:
with open("server_metrics.txt", "w", encoding="utf-8") as f:
    f.write("CPU_Usage: 24%\\nMemory_Usage: 58%\\nDisk_Free: 412GB\\nActive_Threads: 16\\n")

# 2. బెస్ట్ పద్ధతి: For loop వాడి ఒక్కో లైన్ తెచ్చుకోవడం:
print("--- 🚀 Strategy A: Streaming lines (Best for Big Data) ---")
with open("server_metrics.txt", "r", encoding="utf-8") as f:
    for line_num, line in enumerate(f, start=1):
        # .strip() వాడితే లైన్ చివర ఉన్న అదనపు స్పేసెస్ (ఎంటర్) పోతాయి
        print(f"Line {line_num}: {line.strip()}")

# 3. మామూలు పద్ధతి: readlines() వాడి లిస్ట్ గా మార్చడం:
with open("server_metrics.txt", "r", encoding="utf-8") as f:
    all_lines = f.readlines()
print(f"\\nTotal Lines in list: {len(all_lines)}")`,
        codeTitle: 'Example 3: Comparing Reading Strategies and Memory Streaming',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 ఇంటర్వ్యూ ప్రశ్న:</strong>
          <p style="margin-top:6px;">"10 GB సైజ్ ఉన్న ఫైల్ ని పైథాన్ లో ఎలా చదువుతావ్?" అని అడిగితే <code>f.read()</code> చెప్పకూడదు. "for line in file అని లూప్ వాడతాను, అప్పుడు RAM ఫుల్ అవ్వదు" అని చెప్పాలి.</p>
        </div>`
      },
      {
        title: '4. పాత డేటాని ఉంచి కొత్తది కలపడం ("a" Mode)',
        body: `<p>మీరు <code>"w"</code> (write) వాడితే పాతది మొత్తం చెరిపేసి రాస్తుంది. అలా కాకుండా డేటాని యాడ్ (Append) చేయాలంటే <code>"a"</code> వాడాలి:</p>`,
        code: `# 1. ఫైల్ ని 'w' లో స్టార్ట్ చేద్దాం:
with open("app_activity.log", "w", encoding="utf-8") as log_file:
    log_file.write("=== APPLICATION EVENT LOG ===\\n")

# 2. ఇప్పుడు 'a' (append) వాడి కింద లాగ్స్ రాద్దాం:
def append_log_event(event_message):
    with open("app_activity.log", "a", encoding="utf-8") as log_file:
        log_file.write(f"• EVENT: {event_message}\\n")

append_log_event("User 'balaji' logged into the portal")
append_log_event("Payment of Rs.1499 processed successfully")
append_log_event("User downloaded invoice PDF")

# మళ్ళీ ఫైల్ ఓపెన్ చేసి చూద్దాం (పాత లైన్ కూడా అలాగే ఉంటుంది):
with open("app_activity.log", "r", encoding="utf-8") as log_file:
    print(log_file.read())`,
        codeTitle: 'Example 4: Appending Event Logs with "a" Mode',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Append సీక్రెట్:</strong>
          <p style="margin-top:6px;"><code>"a"</code> మోడ్ వాడినప్పుడు ఫైల్ కర్సర్ ఆటోమాటిక్ గా ఎండ్ కి వెళ్లిపోతుంది, కాబట్టి కొత్త డేటా ఎప్పుడూ కిందే పడుతుంది.</p>
        </div>`
      }
    ],
    mistake: {
      title: 'కొత్త డేటా రాయడానికి పొరపాటున "w" వాడటం',
      text: 'మీకు పాత డేటా కావాలి, కొత్తది దానికి కింద చేర్చాలి అనుకున్నప్పుడు "w" వాడకూడదు. "w" వాడితే సెకనులో పాతది మొత్తం ఎరేజ్ అయిపోయి ఎంప్టీ అవుతుంది. అపెండ్ కి ఎప్పుడూ "a" వాడాలి.'
    },
    tryIt: {
      desc: 'ఒక గ్రాసరీ లిస్ట్ (ఐటమ్స్) ని ఒక ఫైల్ "groceries.txt" లోకి రైట్ చేయండి, తర్వాత మళ్ళీ రీడ్ చేసి పక్కన నెంబర్స్ వేసి ప్రింట్ చేయండి.',
      code: `# వస్తువుల లిస్ట్:
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
        q: 'Text mode కి Binary mode ("rb") కి తేడా ఏంటి?',
        a: 'Text mode వాడితే పైథాన్ డేటాని మనకు అర్థమయ్యే స్ట్రింగ్స్ గా ఇస్తుంది. అదే ఒక ఇమేజ్ గానీ, PDF గానీ ఓపెన్ చేయాలంటే "rb" (read binary) వాడాలి. అప్పుడు బైట్స్ (Bytes) రూపంలో వస్తుంది.'
      },
      {
        q: 'with open() లో ఒకేసారి రెండు ఫైల్స్ ఓపెన్ చేయొచ్చా?',
        a: 'చేయొచ్చు. with open("file1.txt", "r") as f1, open("file2.txt", "w") as f2: ఇలా కామా పెట్టి రాసుకోవచ్చు.'
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
    title: 'Python CSV & JSON File Processing (తెలుగులో)',
    badge: '27. CSV & JSON Processing',
    subtopics: 'csv.reader · csv.writer · csv.DictReader · csv.DictWriter · json.dump() & load() · Structured Storage',
    desc: 'టేబుల్స్ రూపంలో ఉండే CSV ఫైల్స్ ని, మరియు వెబ్ లో వాడే JSON ఫైల్స్ ని పైథాన్ లో ప్రొఫెషనల్ గా ఎలా ప్రాసెస్ చేయాలో నేర్చుకుందాం.',
    sections: [
      {
        title: '1. CSV (ఎక్సెల్) ఫైల్స్: csv.reader మరియు csv.writer',
        body: `<p><strong>CSV (Comma-Separated Values)</strong> అనేది ఒక ఎక్సెల్ షీట్ లాంటి టేబుల్ డేటా. దీనికోసం పైథాన్ లో <strong><code>csv</code> మాడ్యూల్</strong> ఉంది.</p>
        <div class="callout" style="margin:16px 0;">
          <strong style="color:#10b981;">💡 విండోస్ లో చాలా ముఖ్యం:</strong><br>
          విండోస్ లో CSV ఫైల్ రాసేటప్పుడు ఎప్పుడూ <code>newline=""</code> అని రాయాలి (<code>open("data.csv", "w", newline="")</code>). లేకపోతే ఎక్సెల్ లో ప్రతి రెండు లైన్ల మధ్యలో ఒక ఖాళీ (ఎంప్టీ) లైన్ వచ్చేస్తుంది!
        </div>`,
        code: `import csv

# 1. లిస్ట్స్ తో ఉన్న డేటాని CSV లోకి రాయడం (writerows):
student_data = [
    ["Roll No", "Student Name", "Grade", "Percentage"],
    [101, "Balaji", "A+", 94.5],
    [102, "Alex Smith", "A", 88.0],
    [103, "Chloe Davis", "A+", 96.2]
]

with open("students.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.writer(f)
    writer.writerows(student_data)
print("✅ students.csv written successfully!")

# 2. ఆ ఫైల్ ని మళ్ళీ చదవడం (csv.reader):
print("\\n--- Reading students.csv ---")
with open("students.csv", "r", encoding="utf-8") as f:
    reader = csv.reader(f)
    header = next(reader) # ఫస్ట్ లైన్ (హెడర్స్) తీసుకుని పక్కన పెడుతుంది
    print("Columns Header:", header)
    
    for row in reader:
        # row లో మనకి డేటా లిస్ట్ లాగా వస్తుంది
        print(f"Roll: {row[0]:4} | Name: {row[1]:12} | Grade: {row[2]} ({row[3]}%)")`,
        codeTitle: 'Example 1: Reading and Writing CSV Files with csv.reader and writer',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 next() ఎందుకు?:</strong>
          <p style="margin-top:6px;"><code>next(reader)</code> వాడటం వల్ల హెడింగ్స్ (Column names) విడిగా వచ్చేస్తాయి, అప్పుడు లూప్ లో ఓన్లీ డేటా మాత్రమే రన్ అవుతుంది.</p>
        </div>`
      },
      {
        title: '2. ప్రొఫెషనల్ అప్రోచ్: csv.DictReader & csv.DictWriter',
        body: `<p>పైన <code>row[1]</code>, <code>row[2]</code> లాగా నెంబర్స్ వాడటం మంచిది కాదు (ఒకవేళ కాలమ్స్ మారితే కోడ్ క్రాష్ అవుతుంది). అందుకే <strong><code>DictReader</code></strong> వాడతారు. ఇది ఫైల్ హెడర్స్ ని చూసుకుని ప్రతి లైన్ ని ఒక డిక్షనరీ (<code>row['Name']</code>) లాగా ఇస్తుంది:</p>`,
        code: `import csv

# 1. డిక్షనరీస్ తో ఉన్న డేటాని CSV లో రాయడం (DictWriter):
fieldnames = ["product_id", "product_name", "category", "price"]

products = [
    {"product_id": "P01", "product_name": "Keyboard", "category": "Hardware", "price": 2499.00},
    {"product_id": "P02", "product_name": "Mouse", "category": "Hardware", "price": 799.00}
]

with open("inventory.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.DictWriter(f, fieldnames=fieldnames)
    writer.writeheader() # హెడ్డింగ్స్ అదే రాస్తుంది!
    writer.writerows(products)

# 2. డిక్షనరీ లాగా చదవడం (DictReader) - ఇది సూపర్ సేఫ్!:
print("--- Inventory Catalog (DictReader) ---")
with open("inventory.csv", "r", encoding="utf-8") as f:
    reader = csv.DictReader(f)
    for row in reader:
        # ఇక్కడ మనం నెంబర్ కాకుండా పేరుతో పిలుస్తున్నాం!
        print(f"[{row['product_id']}] {row['product_name']:10} | Rs.{float(row['price']):.2f}")`,
        codeTitle: 'Example 2: Robust Column Mapping with csv.DictReader and csv.DictWriter',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 DictReader పవర్:</strong>
          <p style="margin-top:6px;">ఎక్సెల్ లో ఒకవేళ <code>price</code> కాలమ్ ఫస్ట్ కి వచ్చినా, లాస్ట్ కి వెళ్ళినా మీ కోడ్ అస్సలు క్రాష్ అవ్వదు. ఎందుకంటే మనం పేరుతో పిలుస్తున్నాం కాబట్టి!</p>
        </div>`
      },
      {
        title: '3. JSON తో ఫైల్స్ సేవ్ చేయడం (dump & load)',
        body: `<p>టేబుల్ డేటా అయితే CSV బెస్ట్. కానీ ఒక యూజర్ ప్రొఫైల్, సెట్టింగ్స్ లాంటి డేటా టేబుల్స్ లో పట్టదు, దానికి <strong>JSON</strong> బెస్ట్.</p>
        <ul>
          <li><code>json.dump(obj, file)</code>: డిక్షనరీని డైరెక్ట్ గా ఫైల్ లోకి సేవ్ చేస్తుంది.</li>
          <li><code>json.load(file)</code>: ఫైల్ లోంచి డైరెక్ట్ గా డిక్షనరీలోకి లోడ్ చేస్తుంది.</li>
        </ul>`,
        code: `import json

# మన యాప్ సెట్టింగ్స్ (ఇలాంటివి CSV లో రాయలేము):
app_settings = {
    "app_name": "ManaCompiler Pro",
    "version": "3.5.0",
    "server": {
        "host": "0.0.0.0",
        "port": 8080,
        "ssl_enabled": True
    },
    "features": ["code_editor", "realtime_compiler", "ai_code_review"]
}

# 1. ఫైల్ లో సేవ్ చేద్దాం (dump):
with open("app_config.json", "w", encoding="utf-8") as f:
    json.dump(app_settings, f, indent=4) # అందంగా రాయడానికి indent
print("✅ app_config.json saved to disk!")

# 2. ఫైల్ లోంచి మళ్ళీ చదువుదాం (load):
with open("app_config.json", "r", encoding="utf-8") as f:
    loaded_config = json.load(f)

print("\\n--- Loaded JSON Config ---")
print("App Name: ", loaded_config["app_name"])
print("Host URL: ", f"http://{loaded_config['server']['host']}:{loaded_config['server']['port']}")`,
        codeTitle: 'Example 3: Serializing and Deserializing JSON Data to Disk',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 ఏది వాడాలి?:</strong>
          <ul style="margin:8px 0 0 18px; line-height:1.7;">
            <li>సెన్సార్ డేటా, బ్యాంక్ స్టేట్మెంట్స్ లాంటి టేబుల్ ఫార్మాట్ కి <strong>CSV</strong> వాడాలి.</li>
            <li>ఆప్ సెట్టింగ్స్, API రెస్పాన్స్ లాంటి లోపల లోపల ఉండే (Nested) డేటాకి <strong>JSON</strong> వాడాలి.</li>
          </ul>
        </div>`
      }
    ],
    mistake: {
      title: 'CSV లో newline="" మర్చిపోవడం (విండోస్ లో)',
      text: 'విండోస్ యూజర్లు ఖచ్చితంగా open("file.csv", "w", newline="") ఇవ్వాలి. లేకపోతే పైథాన్ ఎక్సెల్ ఫైల్ లో ఒక లైన్ రాసి, ఒక లైన్ గ్యాప్ (ఎంప్టీ) ఇచ్చి, మళ్ళీ రాస్తుంది.'
    },
    tryIt: {
      desc: '3 పుస్తకాల వివరాలతో (title, author, price) ఒక డిక్షనరీస్ లిస్ట్ క్రియేట్ చేసి DictWriter తో "books.csv" లో సేవ్ చేసి చూపించండి.',
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
        q: 'CSV ఫైల్స్ లో కామా (,) కాకుండా సెమికోలన్ (;) వాడొచ్చా?',
        a: 'వాడొచ్చు! csv.reader(f, delimiter=";") అని ఇస్తే, కామా బదులు సెమికోలన్ తో డేటాని విడగొడుతుంది.'
      },
      {
        q: 'JSON ఫైల్స్ లో కామెంట్స్ రాసుకోవచ్చా?',
        a: 'లేదు, ఒరిజినల్ JSON రూల్స్ ప్రకారం అందులో హాష్ (#) గానీ, స్లాష్ (//) గానీ పెట్టి కామెంట్స్ రాయలేము. రాస్తే ఎర్రర్ వస్తుంది.'
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
    title: 'Python Filesystem & Pathlib (తెలుగులో)',
    badge: '28. Filesystem & Pathlib',
    subtopics: 'pathlib.Path Mastery · Directory Creation (mkdir) · Existence Checks · Renaming & Deleting · Recursive Globbing',
    desc: 'పైథాన్ లో pathlib వాడి ఫోల్డర్స్ క్రియేట్ చేయడం, ఫైల్స్ ఉన్నాయో లేదో చెక్ చేయడం, పేర్లు మార్చడం, డిలీట్ చేయడం లాంటి ఫైల్ సిస్టమ్ ఆపరేషన్స్ చూద్దాం.',
    sections: [
      {
        title: '1. స్మార్ట్ గా పాత్స్ క్రియేట్ చేయడం: pathlib.Path',
        body: `<p>పాత రోజుల్లో విండోస్, లైనక్స్ పాత్స్ వేరేలా ఉండటం వల్ల చాలా బగ్స్ వచ్చేవి. దాన్ని ఆపడానికి <strong><code>pathlib.Path</code></strong> తీసుకొచ్చారు. ఇది <code>/</code> వాడి చాలా క్లీన్ గా పాత్స్ క్రియేట్ చేస్తుంది.</p>
        <div class="diagram-box">పాత స్ట్రింగ్ పద్ధతి:   os.path.join("data", "exports", "2026", "report.pdf")
మోడ్రన్ pathlib:    Path("data") / "exports" / "2026" / "report.pdf"</div>
        <h4 style="color:#10b981; margin:16px 0 8px;">Path లో ఉండే షార్ట్ కట్స్:</h4>
        <ul>
          <li><code>path.name</code>: ఫైల్ పేరు విత్ ఎక్స్టెన్షన్ (<code>"report.pdf"</code>).</li>
          <li><code>path.stem</code>: ఫైల్ ఒరిజినల్ పేరు (<code>"report"</code>).</li>
          <li><code>path.suffix</code>: ఫైల్ ఎక్స్టెన్షన్ (<code>".pdf"</code>).</li>
          <li><code>path.parent</code>: అది ఏ ఫోల్డర్ లో ఉందో దాని పేరు.</li>
        </ul>`,
        code: `from pathlib import Path

# / వాడి పాత్ జాయిన్ చేయడం (cross-platform):
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
          <strong style="color:#10b981;">🔍 మ్యాజిక్ ఏంటంటే:</strong>
          <p style="margin-top:6px;">మీరు <code>/</code> పెట్టి కోడ్ రాసినా సరే, ఆ కోడ్ విండోస్ లో రన్ చేస్తే ఆటోమాటిక్ గా అది <code>\\</code> (బ్యాక్ స్లాష్) గా మారిపోతుంది. ఏ క్రాష్ ఉండదు!</p>
        </div>`
      },
      {
        title: '2. ఫోల్డర్స్ క్రియేట్ చేయడం: mkdir() ట్రిక్స్',
        body: `<p>ఒక ఫోల్డర్ లోపల ఫోల్డర్ క్రియేట్ చేయాలంటే చాలా కష్టం. కానీ <code>pathlib.Path.mkdir()</code> రెండు పవర్ ఫుల్ ట్రిక్స్ ఇస్తుంది:</p>
        <ul>
          <li><code>parents=True</code>: మీరు అడిగిన ఫోల్డర్ తో పాటు దానికి అవసరమైన పేరెంట్ ఫోల్డర్స్ అన్నింటినీ ఒకేసారి క్రియేట్ చేస్తుంది.</li>
          <li><code>exist_ok=True</code>: ఒకవేళ ఆ ఫోల్డర్ ముందే క్రియేట్ అయి ఉంటే క్రాష్ అవ్వకుండా వదిలేస్తుంది!</li>
        </ul>`,
        code: `from pathlib import Path

# చాలా లోపల ఉన్న ఫోల్డర్ పాత్:
backup_folder = Path("backups") / "2026" / "august" / "database_dumps"

# ఒకే ఒక్క లైన్ లో అన్ని ఫోల్డర్స్ సేఫ్ గా క్రియేట్ చేద్దాం:
backup_folder.mkdir(parents=True, exist_ok=True)

print(f"✅ Verified / Created directory: {backup_folder}")
print("ఫోల్డర్ ఉందా? ", backup_folder.exists())
print("ఇది డైరెక్టరీ నా? ", backup_folder.is_dir())`,
        codeTitle: 'Example 2: Creating Nested Directories Safely with mkdir',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 ఎందుకు parents=True?:</strong>
          <p style="margin-top:6px;">మీరు ఇది ఇవ్వకపోతే, <code>backups</code> అనే ఫోల్డర్ లేనప్పుడు దాని లోపల <code>2026</code> క్రియేట్ చేయలేక క్రాష్ అవుతుంది.</p>
        </div>`
      },
      {
        title: '3. ఫైల్స్ ఆపరేషన్స్ (Rename, Delete, Read)',
        body: `<p>చాలా సింపుల్ గా ఫైల్స్ తో ఆడుకోవచ్చు:</p>
        <ul>
          <li><code>path.exists()</code>: ఉందో లేదో చెప్తుంది.</li>
          <li><code>path.rename(new_path)</code>: పేరు మారుస్తుంది లేదా మూవ్ చేస్తుంది.</li>
          <li><code>path.unlink(missing_ok=True)</code>: <strong>ఫైల్ ని డిలీట్ చేస్తుంది</strong> (ఒకవేళ లేకపోయినా క్రాష్ అవ్వదు).</li>
          <li><code>path.rmdir()</code>: <strong>ఖాళీ ఫోల్డర్ ని</strong> డిలీట్ చేస్తుంది.</li>
        </ul>`,
        code: `from pathlib import Path

temp_file = Path("temporary_draft.txt")

# 1. డైరెక్ట్ గా ఒకే లైన్ లో రాయడం (write_text):
temp_file.write_text("This is temporary draft content.", encoding="utf-8")
print(f"1. Created {temp_file.name} | Exists? {temp_file.exists()}")

# 2. పేరు మార్చడం (Rename):
archived_file = Path("archived_draft.txt")
temp_file.rename(archived_file)
print(f"2. Renamed to {archived_file.name} | పాతది ఉందా? {temp_file.exists()}")

# 3. డైరెక్ట్ గా చదవడం (read_text):
content = archived_file.read_text(encoding="utf-8")
print(f"3. Read content: '{content}'")

# 4. ఫైల్ డిలీట్ చేయడం (unlink):
archived_file.unlink(missing_ok=True)
print(f"4. Deleted file | Exists? {archived_file.exists()}")`,
        codeTitle: 'Example 3: File Lifecycle Management (Create, Rename, Read, Delete)',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 One-Liner మ్యాజిక్:</strong>
          <p style="margin-top:6px;"><code>Path.write_text()</code> వాడితే మీరు <code>open()</code>, <code>close()</code> ఏమీ రాయక్కర్లేదు. అన్నీ అదే చేసుకోని సింగిల్ లైన్ లో పని కానిస్తుంది.</p>
        </div>`
      },
      {
        title: '4. ఫైల్స్ వెతకడం (rglob)',
        body: `<p>మీ ఫోల్డర్ లో ఉన్న వందలాది ఫైల్స్ లో మీకు కావాల్సిన ఫైల్స్ వెతకడానికి:</p>
        <ul>
          <li><code>path.glob("*.py")</code>: ఆ ఒక్క ఫోల్డర్ లోనే వెతుకుతుంది.</li>
          <li><code>path.rglob("*.py")</code>: <strong>Recursive</strong> - ఆ ఫోల్డర్ లోపల ఉన్న ఫోల్డర్స్, దాని లోపల ఉన్న ఫోల్డర్స్.. ఇలా ఎంత లోపలికైనా వెళ్లి వెతుకుతుంది.</li>
        </ul>`,
        code: `from pathlib import Path

# మొత్తం ఫోల్డర్ లో ఎన్ని HTML ఫైల్స్ ఉన్నాయో వెతుకుదాం:
workspace = Path(".")
html_files = list(workspace.rglob("*.html")) # rglob అంటే recursive

print(f"🔍 Found {len(html_files)} HTML files in root folder.")
for f in html_files[:4]:
    # ఫైల్ సైజుని KB లోకి మార్చడం:
    size_kb = f.stat().st_size / 1024
    print(f"• {f.name:30} | {size_kb:.1f} KB")`,
        codeTitle: 'Example 4: Recursive File Discovery with Path.rglob',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 యూస్ కేస్:</strong>
          <p style="margin-top:6px;">మీ ప్రాజెక్ట్ లో ఎక్కడో ఉన్న ఒక ఇమేజ్ (<code>.jpg</code>) ని వెతికి డిలీట్ చేయాలంటే <code>rglob("*.jpg")</code> తో రెండు లైన్లలో పని అయిపోతుంది.</p>
        </div>`
      }
    ],
    mistake: {
      title: 'Path ని మామూలు స్ట్రింగ్స్ లా కలుపుకోవడం',
      text: 'f = "my_folder" + "/" + "file.txt" ఇలా ప్లస్ ఆపరేటర్ వాడి ఫైల్ పాత్ రాయకూడదు. ఇది తప్పు, విండోస్ లో చాలా ఇబ్బంది పడతారు. ఎప్పుడూ Path("my_folder") / "file.txt" అనే రాయాలి.'
    },
    tryIt: {
      desc: 'pathlib వాడి "test_dir" ఫోల్డర్ క్రియేట్ చేసి, అందులో "hello.txt" ఫైల్ క్రియేట్ చేసి, ప్రింట్ చేసి, మళ్ళీ రెండింటినీ డిలీట్ (క్లీన్ అప్) చేయండి.',
      code: `from pathlib import Path

test_dir = Path("my_test_dir")
test_dir.mkdir(exist_ok=True)

test_file = test_dir / "hello.txt"
test_file.write_text("Hello from Pathlib! 🚀", encoding="utf-8")

print("File Content:", test_file.read_text(encoding="utf-8"))

# Cleanup: ఫస్ట్ ఫైల్ డిలీట్ చేసి అప్పుడు ఫోల్డర్ డిలీట్ చేయాలి
test_file.unlink()
test_dir.rmdir()
print("Cleaned up directory successfully! ✅")`
    },
    faqs: [
      {
        q: 'unlink() కి rmdir() కి తేడా ఏంటి?',
        a: 'unlink() ఫైల్ ని డిలీట్ చేస్తుంది. rmdir() ఫోల్డర్ ని డిలీట్ చేస్తుంది. కానీ ఆ ఫోల్డర్ ఖాళీగా ఉంటేనే రన్ అవుతుంది.'
      },
      {
        q: 'పాత లైబ్రరీస్ Pathlib ఆబ్జెక్ట్ ని తీసుకోకపోతే?',
        a: 'సింపుల్ గా str(my_path) అని పాస్ చేస్తే అది మామూలు స్ట్రింగ్ లాగా మారిపోయి ఎక్కడైనా పనిచేస్తుంది.'
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
    title: 'File Handling Capstone Projects (తెలుగులో)',
    badge: '29. File Capstone Projects',
    subtopics: '4 Projects · 1. File Notes App · 2. Contact Book · 3. CSV Expense Tracker · 4. JSON Student Records',
    desc: 'మనం నేర్చుకున్న ఫైల్స్ కాన్సెప్ట్స్ తో 4 రియల్ వరల్డ్ ప్రాజెక్ట్స్ చేద్దాం: నోట్స్ యాప్, కాంటాక్ట్స్ బుక్, ఎక్స్పెన్స్ (ఖర్చుల) ట్రాకర్, మరియు స్టూడెంట్స్ రికార్డ్స్ మేనేజ్మెంట్ సిస్టం.',
    sections: [
      {
        title: '1. Project 1: టైమ్ స్టాంప్స్ తో నోట్స్ యాప్',
        body: `<p>మనం ఏ నోట్ యాడ్ చేసినా, ఆ టైమ్ తో సహా ఫైల్ లోకి శాశ్వతంగా (Append) సేవ్ చేసుకునే ఒక సింపుల్ నోట్స్ యాప్:</p>`,
        code: `# =========================================================================
# PROJECT 1: FILE-BASED TIMESTAMPED NOTES APPLICATION
# =========================================================================
import datetime as dt
from pathlib import Path

NOTES_FILE = Path("daily_notes.txt")

def add_note(note_text):
    """కొత్త నోట్ ని టైమ్ తో సహా సేవ్ చేస్తుంది."""
    timestamp = dt.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(NOTES_FILE, "a", encoding="utf-8") as f:
        f.write(f"[{timestamp}] {note_text.strip()}\\n")
    return "✅ Note saved successfully!"

def view_all_notes():
    """ఉన్న నోట్స్ అన్నీ ఫైల్ లోంచి తెస్తుంది."""
    if not NOTES_FILE.exists():
        return "ℹ️ No notes recorded yet."
    with open(NOTES_FILE, "r", encoding="utf-8") as f:
        return f.read().strip()

def search_notes(keyword):
    """ఒక కీవర్డ్ తో నోట్స్ వెతకడం."""
    if not NOTES_FILE.exists():
        return []
    matches = []
    with open(NOTES_FILE, "r", encoding="utf-8") as f:
        for line in f:
            if keyword.lower() in line.lower():
                matches.append(line.strip())
    return matches

# డెమో రన్ చేద్దాం:
print("--- 📝 Notes Application Demo ---")
add_note("Studied Python Exception Handling")
add_note("Built CSV Expense Tracker")

print("\\n--- All Saved Notes ---")
print(view_all_notes())

print("\\n--- Search Results for 'Python' ---")
for note in search_notes("Python"):
    print("•", note)`,
        codeTitle: 'Project 1: Persistent Timestamped Notes Engine',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 గమనించారా?:</strong>
          <ul style="margin:8px 0 0 18px; line-height:1.7;">
            <li>పాతవి ఎరేజ్ అవ్వకుండా ఉండటానికి <code>"a"</code> (append) వాడాం.</li>
            <li>కేస్ తో సంబంధం లేకుండా వెతకడానికి <code>lower()</code> వాడాం.</li>
          </ul>
        </div>`
      },
      {
        title: '2. Project 2: కాంటాక్ట్ బుక్ (JSON తో)',
        body: `<p>యూజర్ డీటెయిల్స్ ని ఫోన్ బుక్ లాగా ఒక JSON ఫైల్ లో సేవ్ చేసుకుని, పేరుతో వెతుక్కునే అప్లికేషన్:</p>`,
        code: `# =========================================================================
# PROJECT 2: FILE-BACKED CONTACT BOOK APPLICATION
# =========================================================================
import json
from pathlib import Path

CONTACTS_FILE = Path("contacts_db.json")

def load_contacts():
    """JSON ఫైల్ నుంచి డేటా తెచ్చుకోవడం."""
    if not CONTACTS_FILE.exists():
        return {}
    try:
        with open(CONTACTS_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except (json.JSONDecodeError, OSError):
        return {}

def save_contacts(contacts_dict):
    """కొత్త డేటాని ఫైల్ లోకి పంపడం."""
    with open(CONTACTS_FILE, "w", encoding="utf-8") as f:
        json.dump(contacts_dict, f, indent=4)

def add_contact(name, phone, email, category="Personal"):
    """కాంటాక్ట్ యాడ్ చేయడం."""
    contacts = load_contacts()
    contacts[name.strip().title()] = {
        "phone": phone.strip(),
        "email": email.strip().lower(),
        "category": category
    }
    save_contacts(contacts)
    return f"✅ Contact '{name}' saved successfully!"

def search_contact(search_term):
    """పేరు లేదా నెంబర్ తో వెతకడం."""
    contacts = load_contacts()
    results = {}
    for name, details in contacts.items():
        if search_term.lower() in name.lower() or search_term in details["phone"]:
            results[name] = details
    return results

# డెమో రన్:
print("--- 📱 Contact Book Manager Demo ---")
add_contact("Balaji Dev", "+91 98765 43210", "balaji@example.com", "Work")
add_contact("Alex Smith", "+1 555 123 4567", "alex@example.com", "Friends")

print("\\n--- Search Results for 'balaji' ---")
print(json.dumps(search_contact("balaji"), indent=2))`,
        codeTitle: 'Project 2: JSON Contact Book Manager Engine',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 సేఫ్టీ ఫీచర్స్:</strong>
          <p style="margin-top:6px;">ఒకవేళ మన JSON ఫైల్ పాడైపోతే (Syntax తప్పు ఉంటే) క్రాష్ అవ్వకుండా <code>JSONDecodeError</code> క్యాచ్ చేసి ఖాళీ డిక్షనరీ (<code>{}</code>) ఇస్తున్నాం.</p>
        </div>`
      },
      {
        title: '3. Project 3: ఖర్చుల ట్రాకర్ (CSV తో)',
        body: `<p>మనం ఏ కేటగిరీ లో ఎంత ఖర్చు పెట్టామో CSV లో టేబుల్ లాగా సేవ్ చేసి, దానికి Analytics చూపించే యాప్:</p>`,
        code: `# =========================================================================
# PROJECT 3: FINANCIAL EXPENSE TRACKER USING CSV
# =========================================================================
import csv
import datetime as dt
from pathlib import Path

EXPENSES_FILE = Path("monthly_expenses.csv")
FIELDNAMES = ["date", "category", "description", "amount"]

def initialize_expense_file():
    """CSV ఫైల్ లేకపోతే హెడ్డింగ్స్ తో క్రియేట్ చేయడం."""
    if not EXPENSES_FILE.exists():
        with open(EXPENSES_FILE, "w", newline="", encoding="utf-8") as f:
            writer = csv.DictWriter(f, fieldnames=FIELDNAMES)
            writer.writeheader()

def log_expense(category, description, amount):
    """కొత్త ఖర్చు ని ఎంటర్ చేయడం."""
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
    """మొత్తం ఎంత ఖర్చు అయింది, ఏ కేటగిరీ కి ఎంత అని అనాలిసిస్."""
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

# డెమో రన్:
print("--- 💰 Financial Expense Tracker Demo ---")
log_expense("Food", "Grocery Shopping", 1250.00)
log_expense("Utilities", "Internet Bill", 999.00)
log_expense("Food", "Coffee & Snacks", 350.00)

total, breakdown = generate_expense_analytics()
print(f"\\n📊 Total Monthly Expenditure: Rs.{total:,.2f}")
print("--- Category Breakdown ---")
for cat, amt in breakdown.items():
    pct = (amt / total) * 100 if total > 0 else 0
    print(f"• {cat:12}: Rs.{amt:,.2f} ({pct:.1f}%)")`,
        codeTitle: 'Project 3: CSV Expense Tracker and Analytics Engine',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 లాజిక్:</strong>
          <p style="margin-top:6px;">ఫైల్ చదివేటప్పుడు <code>DictReader</code> వాడి, కేటగిరీ వైజ్ గా ఎంత ఖర్చు అయిందో డిక్షనరీలో ప్లస్ (+) చేసుకుంటూ వస్తున్నాం.</p>
        </div>`
      },
      {
        title: '4. Project 4: స్టూడెంట్ రికార్డ్స్ యాప్ (JSON తో)',
        body: `<p>స్టూడెంట్స్ మార్క్స్ ఎంటర్ చేయడం, వాటినుంచి పర్సంటేజ్ (GPA) ఆటోమాటిక్ గా లెక్కేసి రిపోర్ట్ కార్డ్ ప్రింట్ చేసే యాప్:</p>`,
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
    """కొత్త స్టూడెంట్ ని రిజిస్టర్ చేయడం."""
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
    """మార్క్స్ వేసి ఆటోమేటిక్ గా GPA అప్డేట్ చేయడం."""
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
    """క్లీన్ గా రిపోర్ట్ కార్డ్ జనరేట్ చేయడం."""
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

# డెమో రన్:
print("--- 🎓 Student Records Management System ---")
register_student("STU101", "Balaji", "Computer Science")
record_marks("STU101", "Python Programming", 98)
record_marks("STU101", "Data Structures", 92)
record_marks("STU101", "Database Systems", 95)

print(get_student_report_card("STU101"))`,
        codeTitle: 'Project 4: JSON Student Records CRUD System',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 ప్రొడక్షన్ క్వాలిటీ కోడ్:</strong>
          <ul style="margin:8px 0 0 18px; line-height:1.7;">
            <li>JSON లో సబ్జెక్ట్స్ ని ఒకదాని లోపల ఒకటి (Nested) పెట్టుకున్నాం.</li>
            <li>మార్క్స్ మారగానే GPA అదే క్యాలిక్యులేట్ అవుతుంది.</li>
          </ul>
        </div>`
      }
    ],
    mistake: {
      title: 'JSON ఫైల్ ఖాళీగా ఉంటే వదిలేయడం',
      text: 'ఒకవేళ మీ JSON ఫైల్ క్రియేట్ అయ్యి ఎంప్టీగా ఉంటే, json.load() క్రాష్ అయిపోతుంది. ఎప్పుడైనా JSON ఓపెన్ చేస్తే try-except కచ్చితంగా పెట్టి, ఎర్రర్ వస్తే ఒక ఖాళీ డిక్షనరీ ( {} ) ని రిటర్న్ చేయాలి.'
    },
    tryIt: {
      desc: 'ఒక చిన్న బుక్ మార్క్ యాప్ రాయండి. వెబ్సైట్ లింక్స్ ని వాళ్ల కేటగిరీస్ బట్టి ఒక JSON ఫైల్ లో సేవ్ చేసి ప్రింట్ చేయండి.',
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
        q: 'టెక్స్ట్, CSV, JSON... వీటిలో ఏది ఎప్పుడు వాడాలి?',
        a: 'మామూలు నోట్స్ రాసుకోవడానికి Text (.txt), టేబుల్స్ లాంటి వాటికి CSV (.csv), వెబ్సైట్స్ లో వాడే యూజర్ అకౌంట్స్, సెట్టింగ్స్ కి JSON (.json) వాడాలి.'
      },
      {
        q: 'క్రాష్ అయినా నా డేటా పోకుండా సేవ్ అవ్వాలంటే?',
        a: 'ముందు డేటాని "temp.json" అనే ఫైల్ లో సేవ్ చేయండి. మొత్తం కంప్లీట్ అయ్యాక అప్పుడు పాత ఫైల్ మీదకి rename చేయండి. దీన్ని Atomic writes అంటారు.'
      }
    ]
  }
];
