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
    title: 'Python Introduction & Setup (తెలుగులో)',
    badge: '1. Introduction & Setup',
    subtopics: 'What is Python? · Design Philosophy · CPython Architecture · Setup · First Program · print() Mechanics',
    desc: 'Python 3 పరిచయం: Guido van Rossum హిస్టరీ, డిజైన్ ఫిలాసఫీ (PEP 20), CPython compilation, విండోస్/మాక్ లో సెటప్, మరియు print() ఫంక్షన్ పనితీరు.',
    sections: [
      {
        title: '1. Python అంటే ఏమిటి? Origins & Philosophy',
        body: `<p>Python అనేది ఒక high-level, interpreted, general-purpose, dynamically typed, multi-paradigm ప్రోగ్రామింగ్ లాంగ్వేజ్. దీనిని డిసెంబర్ 1989 లో డచ్ కంప్యూటర్ సైంటిస్ట్ <strong>Guido van Rossum</strong> నెదర్లాండ్స్ లోని CWI లో తయారు చేసారు. మెషిన్ ని ఆప్టిమైజ్ చేయడం కన్నా, డెవలపర్ కి కోడ్ సులభంగా అర్థం కావాలి అనే ఉద్దేశ్యంతో దీనిని క్రియేట్ చేసారు.</p>
        <p><em>"Python"</em> అనే పేరు పాము నుండి రాలేదు, Guido కి ఇష్టమైన BBC కామెడీ సిరీస్ <em>Monty Python’s Flying Circus</em> నుండి తీసుకున్నారు.</p>
        <h4 style="color:#10b981; margin:16px 0 8px;">Python యొక్క ముఖ్య లక్షణాలు:</h4>
        <ul>
          <li><strong>Interpreted & Bytecode Compiled:</strong> Python సోర్స్ ఫైల్స్ (.pyc) bytecode గా కంపైల్ అయ్యి, Python Virtual Machine (PVM) మీద ఎక్జిక్యూట్ అవుతాయి.</li>
          <li><strong>Dynamically Typed:</strong> వేరియబుల్స్ కి డేటా టైప్ ముందుగా చెప్పాల్సిన అవసరం లేదు. రన్ టైం లో అవే సెట్ అవుతాయి.</li>
          <li><strong>Multi-Paradigm:</strong> ఇది Object-Oriented Programming (OOP) మరియు Functional Programming రెంటినీ సపోర్ట్ చేస్తుంది.</li>
          <li><strong>Batteries Included:</strong> నెట్వర్కింగ్, మ్యాథ్స్, ఫైల్స్ వంటి వాటి కోసం ముందుగానే రాసిపెట్టిన ఎన్నో Standard Library మ్యాడ్యూల్స్ ఇందులో ఉంటాయి.</li>
        </ul>
        <p>Python డిజైన్ సూత్రాలను <strong>PEP 20 — The Zen of Python</strong> అంటారు. వీటిని మీరు డైరెక్ట్ గా కోడ్ లో చూడొచ్చు:</p>`,
        code: `# Python యొక్క ఫిలాసఫీ (PEP 20) ప్రింట్ చేయడానికి
import this`,
        codeTitle: 'Example 1: Displaying The Zen of Python (PEP 20)',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Line-by-Line కోడ్ బ్రేక్ డౌన్:</strong>
          <ul style="margin:8px 0 0 18px; line-height:1.7;">
            <li><code>import this</code>: ఇది CPython లో దాగి ఉన్న ఒక easter egg. ఇది 19 ముఖ్యమైన Python రూల్స్ ని (ఉదా: <em>"Simple is better than complex"</em>) స్క్రీన్ పైన చూపిస్తుంది.</li>
          </ul>
        </div>`
      },
      {
        title: '2. మీ మొట్టమొదటి Python Program (`print()` Function)',
        body: `<p>C, C++ లేదా Java లాంటి భాషల్లో ఒక చిన్న టెక్స్ట్ ప్రింట్ చేయాలన్నా క్లాసులు, మెథడ్స్ రాయాలి. కానీ Python లో అలాంటి అవసరమే లేదు. నేరుగా మనం కోడ్ రాసేయొచ్చు.</p>
        <p>Built-in <code>print()</code> ఫంక్షన్ మనం ఇచ్చే డేటాని UTF-8 strings గా మార్చి కన్సోల్ టెర్మినల్ పైన ప్రింట్ చేస్తుంది:</p>`,
        code: `# స్క్రీన్ పైన మెసేజ్ ప్రింట్ చేయడం
print("Hello, World! 🚀 Welcome to Python 3.")`,
        codeTitle: 'Example 2: Your Very First Python Program',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Line-by-Line కోడ్ బ్రేక్ డౌన్:</strong>
          <ul style="margin:8px 0 0 18px; line-height:1.7;">
            <li><code># స్క్రీన్ పైన...</code>: ఇది ఒక కామెంట్. <code>#</code> తో మొదలయ్యే లైన్స్ ని కంపైలర్ పట్టించుకోదు.</li>
            <li><code>print(...)</code>: స్క్రీన్ పై అవుట్పుట్ ఇవ్వడానికి వాడే built-in ఫంక్షన్.</li>
            <li><code>"Hello, World! 🚀..."</code>: డబుల్ కోట్స్ లో ఉన్న string. (సింగిల్ కోట్స్ <code>'...'</code> వాడినా పర్లేదు).</li>
          </ul>
        </div>`
      },
      {
        title: '3. Variables లో వాల్యూస్ స్టోర్ చేయడం',
        body: `<p>Python లో <strong>variable</strong> అంటే మెమరీ లో ఉన్న డేటాని పాయింట్ చేసే ఒక పేరు. ఇతర భాషల్లో లాగా <code>int x = 10;</code> అని డేటా టైప్ చెప్పాల్సిన పని లేదు. <code>=</code> వాడినప్పుడు పైథాన్ దానంతట అదే డేటా టైప్ ని గుర్తిస్తుంది.</p>
        <p><code>print()</code> ఫంక్షన్ లో కామాలతో (commas) ఎన్ని వేరియబుల్స్ ఇచ్చినా, వాటన్నిటి మధ్య ఒక స్పేస్ యాడ్ చేసి ప్రింట్ చేస్తుంది:</p>`,
        code: `# Step 1: స్టూడెంట్ డీటెయిల్స్ స్టోర్ చేద్దాం
student_name = "Balaji"           # String (Text data)
course_name = "Python Masterclass" # String
batch_year = 2026                 # Integer (Whole number)

# Step 2: వాటన్నిటినీ ప్రింట్ చేద్దాం
print("Student Name:", student_name)
print("Enrolled in:", course_name, "| Batch Year:", batch_year)`,
        codeTitle: 'Example 3: Variables and Multiple print() Arguments',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Line-by-Line కోడ్ బ్రేక్ డౌన్:</strong>
          <ul style="margin:8px 0 0 18px; line-height:1.7;">
            <li><code>student_name = "Balaji"</code>: "Balaji" అనే string ని క్రియేట్ చేసి దానికి <code>student_name</code> అనే పేరు పెడుతుంది.</li>
            <li><code>batch_year = 2026</code>: 2026 అనే నెంబర్ ని స్టోర్ చేస్తుంది.</li>
            <li><code>print("Student Name:", student_name)</code>: టెక్స్ట్ కి మరియు వేరియబుల్ కి మధ్యలో ఆటోమాటిక్ గా ఒక స్పేస్ ఇస్తుంది.</li>
          </ul>
        </div>`
      },
      {
        title: '4. print() Formatting: sep మరియు end పారామీటర్లు',
        body: `<p><code>print()</code> ఫంక్షన్ పనితీరుని మార్చడానికి మనకు రెండు ముఖ్యమైన parameters ఉంటాయి:</p>
        <ul>
          <li><code>sep=" "</code>: రెండు వేరియబుల్స్ మధ్యలో ఏం యాడ్ చేయాలో ఇది చెప్తుంది (డిఫాల్ట్ గా ఒక స్పేస్ ఉంటుంది).</li>
          <li><code>end="\\n"</code>: ప్రింట్ అయ్యాక చివర్లో ఏం యాడ్ చేయాలో ఇది చెప్తుంది (డిఫాల్ట్ గా న్యూ-లైన్ <code>\\n</code> ఉంటుంది కాబట్టి నెక్స్ట్ ప్రింట్ కింది లైన్ లో వస్తుంది).</li>
        </ul>`,
        code: `# 1. 'sep' వాడి పదాల మధ్యలో హైఫన్ (-) పెడదాం
print("Apple", "Banana", "Orange", "Mango", sep=" - ")

# 2. 'end' వాడి నెక్స్ట్ ప్రింట్ ని అదే లైన్ లో వచ్చేలా చేద్దాం
print("Downloading files", end="... ")
print("Done! 100% Complete ✅")`,
        codeTitle: 'Example 4: Controlling Output with sep and end',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Output బ్రేక్ డౌన్:</strong>
          <ul style="margin:8px 0 0 18px; line-height:1.7;">
            <li>Line 2: <code>Apple - Banana - Orange - Mango</code> (స్పేస్ కి బదులు డాష్ వచ్చింది).</li>
            <li>Line 5: <code>Downloading files... </code> అని ప్రింట్ అయ్యాక లైన్ బ్రేక్ అవ్వలేదు, అందుకే Line 6 లో ఉన్న మెసేజ్ పక్కనే ప్రింట్ అయ్యింది!</li>
          </ul>
        </div>`
      },
      {
        title: '5. ఆటోమేటిక్ గా Arithmetic Calculations',
        body: `<p>Python ఒక ఇంటరాక్టివ్ క్యాలిక్యులేటర్ లాగా పనిచేస్తుంది. మ్యాథ్స్ ఆపరేటర్స్ (<code>+</code>, <code>-</code>, <code>*</code>, <code>/</code>) వాడి నేరుగా లెక్కలు చేయవచ్చు:</p>`,
        code: `# రేట్లు సెట్ చేద్దాం
item_price = 150
quantity = 3
discount = 50

# బిల్ క్యాలిక్యులేట్ చేద్దాం
total_bill = (item_price * quantity) - discount

# రిజల్ట్
print("Item Price: Rs.", item_price)
print("Quantity Ordered:", quantity)
print("Final Total Bill: Rs.", total_bill)`,
        codeTitle: 'Example 5: Direct Arithmetic Calculation',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Calculation ఎలా జరిగింది:</strong>
          <p style="margin-top:6px;">బ్రాకెట్స్ లో ఉన్న గుణకారం (Multiplication) <code>150 * 3 = 450</code> ముందు జరుగుతుంది. ఆ తర్వాత <code>450 - 50 = 400</code> జరిగి <code>total_bill</code> లో సేవ్ అవుతుంది.</p>
        </div>`
      },
      {
        title: '6. Python లోపల ఏం జరుగుతుంది? (CPython Architecture)',
        body: `<p>Python లైన్ బై లైన్ డైరెక్ట్ గా ఎక్జిక్యూట్ అవుతుందని చాలామంది అనుకుంటారు. కానీ అఫీషియల్ <strong>CPython</strong> లో ఇది రెండు స్టెప్స్ లో జరుగుతుంది:</p>
        <div class="diagram-box">┌────────────────────────┐
│  Source Code (app.py)  │  (మనం రాసే ఇంగ్లీష్ లాంటి కోడ్)
└───────────┬────────────┘
            │
            ▼  [Step 1: Bytecode Compilation]
┌────────────────────────┐
│ Bytecode (.pyc) Cache  │  (మిషన్ కి అర్థమయ్యే ఇంటర్మీడియట్ కోడ్)
└───────────┬────────────┘
            │
            ▼  [Step 2: PVM లోకి పంపబడుతుంది]
┌────────────────────────┐
│ Python Virtual Machine │  (C లాంగ్వేజ్ లూప్ ఈ బైట్ కోడ్ ని రన్ చేస్తుంది)
└───────────┬────────────┘
            │
            ▼
┌────────────────────────┐
│ Terminal / OS Output   │  "Hello, World! 🚀"
└────────────────────────┘</div>
        <p><strong>Step 1: Bytecode Compilation:</strong> మనం రాసిన కోడ్ ని పార్స్ చేసి బైట్ కోడ్ (bytecode) గా మారుస్తుంది.</p>
        <p><strong>Step 2: Python Virtual Machine (PVM):</strong> PVM ఆ బైట్ కోడ్ ని చదివి మన కంప్యూటర్ CPU కి తగ్గట్టుగా ఎక్జిక్యూట్ చేస్తుంది.</p>`
      }
    ],
    mistake: {
      title: 'Python 2 Print సింటాక్స్ వాడటం',
      text: "పాత Python 2 లో బ్రాకెట్స్ లేకుండా 'print Hello' అని రాసేవాళ్ళు. కానీ కొత్త Python 3 లో కచ్చితంగా బ్రాకెట్స్ వాడాలి. లేకపోతే SyntaxError: Missing parentheses in call to 'print' అనే ఎర్రర్ వస్తుంది."
    },
    tryIt: {
      desc: 'ఒక మనిషి వయస్సుని కుక్కల వయస్సులోకి (human_age * 7) మార్చి ప్రింట్ చేయండి.',
      code: `student_name = "Alex"
human_age = 20
dog_years = human_age * 7

print("Student Name:", student_name)
print("Human Age:", human_age)
print("Dog Years Age:", dog_years)`
    },
    faqs: [
      {
        q: 'Python అనేది Compiled ఆ లేక Interpreted ఆ?',
        a: 'Python రెండూ చేస్తుంది. ముందుగా కోడ్ బైట్ కోడ్ (.pyc) గా కంపైల్ అవుతుంది, ఆ తర్వాత Python Virtual Machine (PVM) ద్వారా ఇంటర్‌ప్రెట్ అవుతుంది.'
      },
      {
        q: 'Python 2 కి Python 3 కి తేడా ఏంటి?',
        a: 'Python 2 లో Unicode సరిగ్గా లేదు, మరియు డివిజన్ (5/2 = 2) లాంటి తప్పులు ఉండేవి. Python 3 లో అన్నీ పర్ఫెక్ట్ గా క్లీన్ చేసి కొత్త స్టాండర్డ్స్ ని తెచ్చారు.'
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
    title: 'Python Syntax, Indentation & Comments (తెలుగులో)',
    badge: '2. Syntax & Indentation',
    subtopics: 'Whitespace Block Rules · IndentationError · PEP 8 Style Guide · Comments · Docstrings',
    desc: 'Python సింటాక్స్ రూల్స్: 4-spaces ఇండెంటేషన్, curly braces లేకపోవడం, PEP 8 స్టాండర్డ్స్, comments, మరియు docstrings గురించి తెలుసుకుందాం.',
    sections: [
      {
        title: '1. Whitespace Indentation ఎందుకు ముఖ్యం?',
        body: `<p>C, Java లాంటి భాషల్లో కోడ్ బ్లాక్స్ ని సపరేట్ చేయడానికి <strong>curly braces <code>{ ... }</code></strong> వాడుతారు. కానీ Python లో <strong>ఖాళీ ప్రదేశం (whitespace indentation) ద్వారా మాత్రమే కోడ్ బ్లాక్స్ ని గుర్తిస్తారు</strong>.</p>
        <p>దీనివల్ల పైథాన్ కోడ్ చూడటానికి ఎప్పుడూ చాలా నీట్ గా, క్లీన్ గా ఉంటుంది. (దీనినే <em>off-side rule</em> అంటారు).</p>
        <h4 style="color:#10b981; margin:16px 0 8px;">Indentation నియమాలు:</h4>
        <ol>
          <li><code>if</code>, <code>else</code>, <code>for</code>, <code>while</code>, <code>def</code> లాంటివి వాడినప్పుడు చివర్లో కోలన్ <code>:</code> పెట్టాలి.</li>
          <li>ఆ తర్వాతి లైన్ కచ్చితంగా <strong>4 spaces</strong> (లేదా 1 Tab) వదిలి మొదలవ్వాలి (ఇది PEP 8 రూల్).</li>
          <li>మళ్ళీ స్పేసెస్ తీసేసి మామూలుగా రాస్తే, ఆ బ్లాక్ అక్కడితో ఎండ్ అయిపోయినట్టు.</li>
        </ol>`,
        code: `# వయస్సుని బట్టి ఓటు హక్కు ఉందో లేదో చెక్ చేద్దాం
age = 20

if age >= 18:
    # 4 spaces ఇచ్చాం కాబట్టి ఇది IF బ్లాక్:
    print("Eligible to vote! ✅")
    print("Please cast your vote responsibly.")
else:
    # 4 spaces ఇచ్చాం కాబట్టి ఇది ELSE బ్లాక్:
    print("Not eligible yet.")
    print("You must be 18 or older.")

# 0 spaces - ఇది పైన బ్లాక్స్ తో సంబంధం లేకుండా ఎప్పుడూ రన్ అవుతుంది
print("Verification check completed.")`,
        codeTitle: 'Example 1: Indentation Defining if-else Blocks',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Indentation ఎలా పనిచేసింది:</strong>
          <ul style="margin:8px 0 0 18px; line-height:1.7;">
            <li>లైన్స్ 6-7 కండిషన్ True అయితేనే రన్ అవుతాయి (ఎందుకంటే అవి 4 స్పేసెస్ తో లోపలికి ఉన్నాయి).</li>
            <li>లైన్స్ 10-11 కండిషన్ False అయితేనే రన్ అవుతాయి.</li>
            <li>లైన్ 14 కి ఎలాంటి స్పేసెస్ లేవు, కాబట్టి కండిషన్ తో పనిలేకుండా ఎక్జిక్యూట్ అవుతుంది.</li>
          </ul>
        </div>`
      },
      {
        title: '2. Comments (సింగిల్ మరియు ఇన్-లైన్)',
        body: `<p>Comments అంటే మనం రాసిన కోడ్ కి అర్థం ఏమిటో పక్కన రాసుకునే నోట్స్ లాంటివి. పైథాన్ కంపైలర్ వీటిని చదవదు, కాబట్టి వీటివల్ల ప్రోగ్రామ్ స్లో అవ్వదు.</p>
        <p>హ్యాష్ (<code>#</code>) సింబల్ తో కామెంట్స్ ని రాస్తాము. కోడ్ పక్కన కూడా వీటిని రాయొచ్చు:</p>`,
        code: `# Step 1: పారామీటర్స్ సెట్ చేద్దాం
item_price = 45.00   # ఒక్కొక్క దాని ధర (రూపాయల్లో)
quantity = 3         # ఎన్ని ఐటమ్స్?
tax_rate = 0.05      # 5% GST ట్యాక్స్

# Step 2: ట్యాక్స్ తో కలిపి బిల్ క్యాలిక్యులేట్ చేద్దాం
subtotal = item_price * quantity
tax_amount = subtotal * tax_rate
final_total = subtotal + tax_amount

# Step 3: రిజల్ట్ చూపిద్దాం
print("Subtotal: Rs.", subtotal)
print("Tax (5%): Rs.", tax_amount)
print("Final Total Bill: Rs.", round(final_total, 2))`,
        codeTitle: 'Example 2: Single-Line and Inline Comments',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 కామెంట్స్ బెస్ట్ ప్రాక్టీసెస్:</strong>
          <p style="margin-top:6px;">కోడ్ <strong>ఏం చేస్తుంది (What)</strong> అని కాకుండా, <strong>ఎందుకు అలా రాసారు (Why)</strong> అని చెప్పడానికి కామెంట్స్ ని వాడటం ప్రొఫెషనల్ అలవాటు.</p>
        </div>`
      },
      {
        title: '3. Multi-Line లో కోడ్ రాయడం (బ్రాకెట్స్ వాడి)',
        body: `<p>PEP 8 రూల్స్ ప్రకారం ఒక లైన్ కోడ్ మరీ పొడవుగా ఉండకూడదు. మరి పెద్ద లెక్కను కింది లైన్స్ లోకి విడగొట్టి రాయాలంటే <strong>Parentheses <code>()</code></strong> వాడటం చాలా సేఫ్ పద్ధతి:</p>`,
        code: `# అన్ని సబ్జెక్ట్స్ మార్క్స్ ని కలుపుదాం
# బ్రాకెట్స్ () వాడటం వల్ల ఎర్రర్ రాకుండా కింది లైన్ కి వెళ్లొచ్చు:
total_score = (
    85     # Mathematics score
    + 92   # Physics score
    + 78   # Chemistry score
    - 5    # Late homework penalty
)

print("Final Calculated Total Score:", total_score)`,
        codeTitle: 'Example 3: Multi-Line Statement with Parentheses',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Backslash (\\) ఎందుకు వాడకూడదు?</strong>
          <p style="margin-top:6px;">లైన్ మార్చడానికి <code>\\</code> వాడొచ్చు, కానీ దాన్ని వాడిన తర్వాత పొరపాటున స్పేస్ పడినా ప్రోగ్రామ్ ఎర్రర్ ఇస్తుంది. అందుకే బ్రాకెట్స్ వాడటం ఉత్తమం.</p>
        </div>`
      },
      {
        title: '4. Functions కి Docstrings రాయడం (.__doc__)',
        body: `<p>ఒక ఫంక్షన్ లేదా క్లాస్ కింద మూడు కోట్స్ (<code>"""..."""</code>) తో రాసే డాక్యుమెంటేషన్ నే <strong>docstring</strong> అంటారు.</p>
        <p>మామూలు <code>#</code> కామెంట్స్ ని పైథాన్ కంపైల్ చేసేటప్పుడు డిలీట్ చేసేస్తుంది. కానీ ఈ docstrings మాత్రం మెమరీ లో సేవ్ అవుతాయి. వీటిని మనం రన్ టైం లో కూడా చూడొచ్చు:</p>`,
        code: `def calculate_rectangle_area(length, width):
    """
    దీర్ఘచతురస్రం (Rectangle) ఏరియా ని క్యాలిక్యులేట్ చేస్తుంది.
    
    Parameters:
        length (float): పొడవు
        width (float): వెడల్పు
        
    Returns:
        float: (length * width) ఏరియా
    """
    return length * width

# ఫంక్షన్ ని కాల్ చేద్దాం
area = calculate_rectangle_area(10, 5)
print("Calculated Area:", area)

# రన్ టైం లో docstring ని చూద్దాం
print("\\n--- Function Docstring (.__doc__) ---")
print(calculate_rectangle_area.__doc__)`,
        codeTitle: 'Example 4: Defining and Inspecting Docstrings',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Docstrings ఎందుకు ముఖ్యం?</strong>
          <ul style="margin:8px 0 0 18px; line-height:1.7;">
            <li>VS Code, PyCharm లాంటి ఎడిటర్స్ మనం టైప్ చేస్తున్నప్పుడు ఈ docstring ని tooltip లాగా చూపిస్తాయి.</li>
            <li>పెద్ద ప్రాజెక్ట్స్ లో ఆటోమాటిక్ గా వెబ్సైట్ డాక్యుమెంటేషన్ తయారు చేయడానికి ఇవి వాడతారు.</li>
          </ul>
        </div>`
      }
    ],
    mistake: {
      title: 'Tabs మరియు Spaces ని కలిపి వాడటం (TabError)',
      text: 'కోడ్ ని స్పేసెస్ తో జరిపి, అదే లైన్ ని మళ్ళీ కీబోర్డ్ Tab తో జరిపితే TabError వస్తుంది. మీ కోడ్ ఎడిటర్ సెట్టింగ్స్ లో "Tab Size: 4 Spaces" అని పెట్టుకోవడం మంచిది.'
    },
    tryIt: {
      desc: 'ఇండెంటేషన్ ని కరెక్ట్ గా పెట్టి వాతావరణం వేడిగా ఉందో చల్లగా ఉందో చెక్ చేయండి.',
      code: `temperature = 32

if temperature > 25:
    print("It is a warm and sunny day! ☀️")
    print("Drink plenty of water.")
else:
    print("It is a cool day! 🧥")`
    },
    faqs: [
      {
        q: 'నేను 4 కి బదులు 2 స్పేసెస్ వాడొచ్చా?',
        a: 'ఒకటే బ్లాక్ లో అన్నీ 2 స్పేసెస్ వాడితే ప్రోగ్రామ్ రన్ అవుతుంది. కానీ ఇండస్ట్రీ లో ప్రపంచవ్యాప్తంగా PEP 8 ప్రకారం 4 స్పేసెస్ వాడటమే స్టాండర్డ్.'
      },
      {
        q: 'Comment (#) కి Docstring (""") కి తేడా ఏంటి?',
        a: 'Comment ని పైథాన్ అసలు పట్టించుకోదు (Delete చేస్తుంది). Docstring మాత్రం ఆ ఫంక్షన్ కి ఒక అట్రిబ్యూట్ గా (__doc__) సేవ్ అయ్యి ఉంటుంది.'
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
    title: 'Python Variables & Data Types (తెలుగులో)',
    badge: '3. Variables & Types',
    subtopics: 'Variables as References · Dynamic Typing · Memory Identity (id, is vs ==) · Swapping · Type Checking',
    desc: 'Python లో వేరియబుల్స్ మెమరీ పాయింటర్స్ లాగా ఎలా పనిచేస్తాయి, Dynamic typing అంటే ఏంటి, id() వాడి మెమరీ చెక్ చేయడం, మరియు సింగిల్ లైన్ లో వేరియబుల్స్ ని మార్చడం (Swapping) గురించి తెలుసుకుందాం.',
    sections: [
      {
        title: '1. Variables అంటే మెమరీ కి పాయింటర్లు',
        body: `<p>C లేదా Java లో వేరియబుల్ అంటే ఒక డబ్బా లాంటిది. కానీ Python లో <strong>వేరియబుల్స్ అంటే మెమరీలో ఉన్న డేటాని పాయింట్ చేసే ఒక పేరు లేదా లేబుల్ (reference pointer) లాంటివి</strong>.</p>
        <p>CPython లో ప్రతీ ఆబ్జెక్ట్ లోపల 3 విషయాలు సేవ్ అయ్యి ఉంటాయి:</p>
        <ol>
          <li><strong>Type:</strong> ఇది నెంబరా, టెక్స్టా? అని చెప్తుంది.</li>
          <li><strong>Reference Count:</strong> ఈ డేటాని ఎన్ని వేరియబుల్స్ పాయింట్ చేస్తున్నాయి? అనేది కౌంట్ చేస్తుంది. (ఇది 0 ఐతే Garbage Collector దాన్ని డిలీట్ చేస్తుంది).</li>
          <li><strong>Value:</strong> అసలైన డేటా.</li>
        </ol>`,
        code: `# 4 రకాల ముఖ్యమైన డేటా టైప్స్:
student_name = "Alex"      # str (Text string)
age = 20                   # int (Whole integer number)
account_balance = 1450.75  # float (Decimal number)
is_enrolled = True         # bool (Boolean True or False)

# వీటిని ప్రింట్ చేసి వాటి Type ఏంటో చూద్దాం:
print("Student Name:", student_name, "| Data Type:", type(student_name).__name__)
print("Age:", age, "| Data Type:", type(age).__name__)
print("Balance: Rs.", account_balance, "| Data Type:", type(account_balance).__name__)
print("Is Enrolled:", is_enrolled, "| Data Type:", type(is_enrolled).__name__)`,
        codeTitle: 'Example 1: Variables of Different Data Types',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Type బ్రేక్ డౌన్:</strong>
          <ul style="margin:8px 0 0 18px; line-height:1.7;">
            <li><code>str</code>: కోట్స్ లో ఉండే టెక్స్ట్ (స్ట్రింగ్).</li>
            <li><code>int</code>: పాయింట్స్ లేని మామూలు నెంబర్స్.</li>
            <li><code>float</code>: దశాంశ స్థానాలు (డెసిమల్స్) ఉండే నెంబర్స్.</li>
            <li><code>bool</code>: అవును లేదా కాదు (<code>True</code> or <code>False</code>).</li>
          </ul>
        </div>`
      },
      {
        title: '2. Dynamic Typing అంటే ఏంటి?',
        body: `<p>Python అనేది <strong>dynamically typed</strong> లాంగ్వేజ్. అంటే ఒక వేరియబుల్ లో ముందు నెంబర్ పెట్టి, ఆ తర్వాత అదే వేరియబుల్ లో టెక్స్ట్ పెట్టినా ఎర్రర్ రాదు:</p>`,
        code: `# ఒకే వేరియబుల్ కి వేరే వేరే డేటా ఇద్దాం:
data = 42
print("1. Value:", data, "| Type:", type(data))

data = "Now I am a text string!"
print("2. Value:", data, "| Type:", type(data))

data = [10, 20, 30]
print("3. Value:", data, "| Type:", type(data))`,
        codeTitle: 'Example 2: Dynamic Rebinding in Python',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 ముఖ్య గమనిక:</strong>
          <p style="margin-top:6px;">Python లో <strong>డేటా కి టైప్ ఉంటుంది కానీ, వేరియబుల్ కి టైప్ ఉండదు!</strong> వేరియబుల్ అనేది డేటా కి తగిలించిన ఒక ట్యాగ్ మాత్రమే.</p>
        </div>`
      },
      {
        title: '3. మెమరీ లో ఏముంది? id() మరియు "is" vs "=="',
        body: `<p>Python లో ప్రతీ ఆబ్జెక్ట్ కి ఒక మెమరీ అడ్రస్ ఉంటుంది. దాన్ని <code>id()</code> వాడి చూడొచ్చు:</p>
        <ul>
          <li><code>==</code> (Value Equality): రెండు వేరియబుల్స్ లోపల ఉన్న <strong>డేటా ఒకటేనా?</strong> అని చెక్ చేస్తుంది.</li>
          <li><code>is</code> (Identity Equality): రెండు వేరియబుల్స్ మెమరీ లో ఒకే చోట (<strong>ఒకే అడ్రస్</strong>) ఉన్నాయా? అని చెక్ చేస్తుంది.</li>
        </ul>`,
        code: `# ఒకే రకమైన డేటా ఉన్న రెండు లిస్ట్ లు:
list1 = [1, 2, 3]
list2 = [1, 2, 3]
list3 = list1  # list3 కి list1 నే అసైన్ చేసాం!

print("list1 == list2 (డేటా సేమ్ ఆ?):", list1 == list2) # True
print("list1 is list2 (అడ్రస్ సేమ్ ఆ?):", list1 is list2)   # False (రెండు వేరు వేరు లిస్ట్ లు!)
print("list1 is list3 (అడ్రస్ సేమ్ ఆ?):", list1 is list3)  # True

print("\\nMemory Address list1:", id(list1))
print("Memory Address list2:", id(list2))
print("Memory Address list3:", id(list3))`,
        codeTitle: 'Example 3: Memory Inspection with id()',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Pro Tip:</strong>
          <p style="margin-top:6px;">నెంబర్స్, స్ట్రింగ్స్, లిస్ట్స్ ని పోల్చడానికి ఎప్పుడూ <code>==</code> వాడాలి. <code>is</code> ని కేవలం <code>None</code>, <code>True</code>, లేదా <code>False</code> లాంటి వాటికి మాత్రమే వాడాలి.</p>
        </div>`
      },
      {
        title: '4. సింగిల్ లైన్ లో Variables ని స్వ్యాప్ (Swap) చేయడం',
        body: `<p>C/Java లాంటి భాషల్లో <code>a</code> మరియు <code>b</code> ని మార్చాలంటే మూడో వేరియబుల్ (<code>temp</code>) వాడాలి. కానీ Python లో ఒకే లైన్ లో ఈజీగా చేయవచ్చు:</p>`,
        code: `x = 10
y = 20
print(f"Before swap: x = {x}, y = {y}")

# ఒకే లైన్ లో x ని y కి, y ని x కి మారుద్దాం:
x, y = y, x

print(f"After swap:  x = {x}, y = {y}")`,
        codeTitle: 'Example 4: Swapping Variables in One Line',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 ఇదెలా పనిచేస్తుంది:</strong>
          <p style="margin-top:6px;">కుడి వైపు ఉన్న <code>y, x</code> ముందే ఒక ట్యూపుల్ <code>(20, 10)</code> ని క్రియేట్ చేసి, ఆ తర్వాత వాటిని ఎడమ వైపు ఉన్న <code>x</code> మరియు <code>y</code> లోపలికి ఒకేసారి సేవ్ చేస్తుంది.</p>
        </div>`
      }
    ],
    mistake: {
      title: 'Keywords ని పేర్లుగా వాడటం',
      text: 'వేరియబుల్స్ కి ఎప్పుడూ list, str, int లాంటి పేర్లు పెట్టకూడదు. అలా పెడితే Python ఆ built-in ఫంక్షన్స్ ని మర్చిపోయి క్రాష్ అవుతుంది. (TypeError వస్తుంది).'
    },
    tryIt: {
      desc: 'మీకు ఇష్టమైన బుక్ పేరు, దాని ధర ని వేరియబుల్స్ లో రాసి వాటి టైప్స్ ని type() తో ప్రింట్ చేయండి.',
      code: `book_title = "Python for Beginners"
book_price = 29.99
release_year = 2026

print("Book:", book_title, "| Type:", type(book_title).__name__)
print("Price:", book_price, "| Type:", type(book_price).__name__)
print("Year:", release_year, "| Type:", type(release_year).__name__)`
    },
    faqs: [
      {
        q: 'Dynamic Typing కి Static Typing కి తేడా ఏంటి?',
        a: 'Static typing (C, Java) లో మనం ముందుగానే డేటా టైప్ చెప్పాలి, తర్వాత దాన్ని మార్చలేము. Dynamic typing (Python) లో అలా చెప్పక్కర్లేదు, ప్రోగ్రామ్ రన్ అవుతున్నప్పుడు దానంతట అదే టైప్ మార్చుకుంటుంది.'
      },
      {
        q: 'id(256) == id(256) ట్రూ అవుతుంది, కానీ పెద్ద నెంబర్స్ కి ఫాల్స్ ఎందుకు వస్తుంది?',
        a: 'CPython లో -5 నుంచి 256 వరకు ఉన్న నెంబర్స్ ని ముందుగానే సేవ్ చేసి ఉంచుతారు. అవే నెంబర్స్ వస్తే మళ్ళీ కొత్త అడ్రస్ ఇవ్వకుండా పాత అడ్రస్ నే ఇస్తుంది. దీన్ని ఇంటర్నింగ్ అంటారు.'
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
    title: 'Python Numbers, Strings & Casting (తెలుగులో)',
    badge: '4. Numbers, Strings & Casting',
    subtopics: 'int (Bignum) · float (IEEE 754) · complex · Slicing [::] · F-Strings · Type Casting',
    desc: 'Python లో ఎంత పెద్ద నెంబర్ నైనా స్టోర్ చేయగల బగ్-ఫ్రీ ఇంటిజర్స్, స్ట్రింగ్ స్లైసింగ్, ఫార్మాట్ కోసం F-Strings, మరియు టైప్ కాస్టింగ్ గురించి నేర్చుకుందాం.',
    sections: [
      {
        title: '1. Numeric Types & Unlimited Integer Precision (Bignum)',
        body: `<p>Python 3 లో ప్రధానంగా మూడు నెంబర్ టైప్స్ ఉంటాయి: <code>int</code>, <code>float</code>, మరియు <code>complex</code>.</p>
        <p>C, Java లాంటి వాటిలో ఒక నెంబర్ కి ఇంత లిమిట్ (32 bits) వరకే స్టోర్ చేయగలం అనే రూల్ ఉంటుంది. కానీ Python 3 లో <strong>ఇంటిజర్స్ కి లిమిట్ లేదు (Arbitrary precision)</strong>. కంప్యూటర్ RAM కి తగ్గట్టు ఎంత పెద్ద నెంబర్ నైనా ఎర్రర్ రాకుండా స్టోర్ చేసుకోగలదు!</p>`,
        code: `# 1. 2 ని 100 సార్లు గుణిద్దాం (చాలా పెద్ద నెంబర్!)
huge_num = 2 ** 100
print("2 ** 100 is:")
print(huge_num)

# 2. Float మరియు Complex నెంబర్స్
pi_val = 3.1415926535
complex_num = 3 + 4j

print("\\nFloat Pi:", pi_val)
print("Complex real part:", complex_num.real, "| Imaginary part:", complex_num.imag)`,
        codeTitle: 'Example 1: Numeric Primitives & Arbitrary Precision',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 అపరిమిత కెపాసిటీ:</strong>
          <p style="margin-top:6px;">మీరు <code>100!</code> (ఫ్యాక్టోరియల్) క్యాలిక్యులేట్ చేసినా ఇతర లాంగ్వేజెస్ లాగా Overflow ఎర్రర్ రాదు.</p>
        </div>`
      },
      {
        title: '2. Arithmetic Operators బ్రేక్ డౌన్',
        body: `<p>Python లో 7 ముఖ్యమైన ఆపరేటర్స్ ఉంటాయి:</p>
        <ul>
          <li><code>+</code>, <code>-</code>, <code>*</code> (సాధారణ మ్యాథ్స్)</li>
          <li><code>/</code>: <strong>True Division</strong> — ఇది ఎప్పుడూ డెసిమల్స్ నే (float) ఇస్తుంది (ఉదా: <code>10 / 2 -> 5.0</code>).</li>
          <li><code>//</code>: <strong>Floor Division</strong> — దశాంశ స్థానాలను తీసేసి కింది నెంబర్ ని ఇస్తుంది (ఉదా: <code>15 // 4 -> 3</code>).</li>
          <li><code>%</code>: <strong>Modulus</strong> — భాగాహారం చేయగా మిగిలిన శేషం (Remainder) ఇస్తుంది.</li>
          <li><code>**</code>: <strong>Exponentiation</strong> — పవర్ ($a^b$).</li>
        </ul>`,
        code: `a = 15
b = 4

print("Addition (+):", a + b)         # 19
print("Subtraction (-):", a - b)      # 11
print("Multiplication (*):", a * b)   # 60
print("True Division (/):", a / b)    # 3.75 (Float వస్తుంది)
print("Floor Division (//):", a // b) # 3 (Int వస్తుంది)
print("Modulus (%):", a % b)          # 3 (శేషం)
print("Power (**):", 2 ** 5)          # 32`,
        codeTitle: 'Example 2: Arithmetic Operators',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Division తేడా గమనించండి:</strong>
          <p style="margin-top:6px;">ఖచ్చితమైన డెసిమల్స్ కావాలంటే <code>/</code> వాడాలి. కేవలం పూర్ణాంకం మాత్రమే కావాలంటే <code>//</code> వాడాలి.</p>
        </div>`
      },
      {
        title: '3. String Indexing, Slicing & Immutability',
        body: `<p>స్ట్రింగ్స్ అనేవి అక్షరాల సముదాయం. స్ట్రింగ్ లో ఒక భాగాన్ని కట్ చేయడానికి Slicing వాడతారు: <code>string[start : stop : step]</code>. గుర్తుపెట్టుకోండి: స్ట్రింగ్స్ <strong>immutable</strong> (అంటే ఒక్కసారి క్రియేట్ చేసాక వాటిని డైరెక్ట్ గా మార్చలేము):</p>`,
        code: `word = "Python"

print("First char [0]:", word[0])            # P
print("Last char [-1]:", word[-1])           # n
print("Slice [0:3]:", word[0:3])             # Pyt (3వ ఇండెక్స్ కి ఒక్క అడుగు ముందు ఆగిపోతుంది)
print("Every 2nd char [::2]:", word[::2])    # Pto (రెండు రెండు అడుగులు)
print("Reversed string [::-1]:", word[::-1]) # nohtyP (రివర్స్ అవుతుంది)`,
        codeTitle: 'Example 3: String Indexing and Slicing',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Slicing పారామీటర్స్:</strong>
          <ul style="margin:8px 0 0 18px; line-height:1.7;">
            <li><code>start</code>: ఎక్కడి నుంచి మొదలవ్వాలి.</li>
            <li><code>stop</code>: ఎక్కడి వరకు (కానీ ఈ అక్షరాన్ని తీసుకోదు, ముందు ఆగిపోతుంది!).</li>
            <li><code>step</code>: ఎన్ని అడుగులు వేయాలి (<code>-1</code> పెడితే వెనక నుంచి వస్తుంది).</li>
          </ul>
        </div>`
      },
      {
        title: '4. Modern F-Strings తో అద్భుతమైన ఫార్మాటింగ్',
        body: `<p>F-Strings వాడితే వేరియబుల్స్ ని నేరుగా స్ట్రింగ్స్ లోపల వాడుకోవచ్చు. అంతేకాకుండా నెంబర్స్ కి కామాలు, డెసిమల్స్ ని కూడా సెట్ చేసుకోవచ్చు:</p>`,
        code: `student = "Balaji"
score = 95.4567
price = 1499.50

# F-strings తో చాలా సింపుల్ గా ఫార్మాట్ చేయొచ్చు:
print(f"Student: {student}")
print(f"Score (2 డెసిమల్స్ మాత్రమే): {score:.2f}")
print(f"Price (కామాలతో): Rs.{price:,.2f}")`,
        codeTitle: 'Example 4: Modern F-Strings',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Format Specifiers:</strong>
          <ul style="margin:8px 0 0 18px; line-height:1.7;">
            <li><code>{score:.2f}</code> వాడటం వల్ల <code>95.4567</code> కాస్తా <code>95.46</code> లాగా రౌండ్ అయ్యింది.</li>
            <li><code>{price:,.2f}</code> వల్ల నెంబర్ మధ్యలో కామా వచ్చింది: <code>1,499.50</code>.</li>
          </ul>
        </div>`
      }
    ],
    mistake: {
      title: 'Float Strings ని డైరెక్ట్ గా int() చేయడం',
      text: 'మీరు int("45.89") అని రాస్తే ఎర్రర్ వస్తుంది. డెసిమల్ ఉన్న టెక్స్ట్ ని ఇంటిజర్ చేయాలంటే, ముందుగా దాన్ని float("45.89") చేసి ఆ తర్వాత int() చేయాలి.'
    },
    tryIt: {
      desc: 'ఒక పేరుని తీసుకుని, దానికి ఉన్న స్పేసెస్ ని strip() తో తీసేసి, దాన్ని రివర్స్ చేసి ప్రింట్ చేయండి.',
      code: `user_input = "  python developer  "
clean_text = user_input.strip()

print("Original:", repr(user_input))
print("Cleaned:", clean_text)
print("Uppercase:", clean_text.upper())
print("Reversed:", clean_text[::-1])`
    },
    faqs: [
      {
        q: 'Python లో స్ట్రింగ్స్ ని ఎందుకు మార్చలేము (Immutable)?',
        a: 'వాటిని మార్చకుండా ఉంచడం వల్ల మెమరీ చాలా సేవ్ అవుతుంది (కంప్యూటర్ ఒకే స్ట్రింగ్ ని పది చోట్ల వాడుకోగలదు), మరియు సెక్యూరిటీ పరంగా చాలా సేఫ్.'
      },
      {
        q: 'str() కి repr() కి తేడా ఏంటి?',
        a: 'str() అనేది సాధారణ మనుషులు చదువుకోడానికి బాగుండేలా చూపిస్తుంది. repr() అనేది డెవలపర్స్ కోసం కచ్చితంగా డేటా టైప్, స్పేసెస్, డబుల్ కోట్స్ తో సహా స్పష్టంగా చూపిస్తుంది.'
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
    title: 'Python Booleans, None & Console I/O (తెలుగులో)',
    badge: '5. Booleans, None & I/O',
    subtopics: 'bool Data Type · Truthy vs Falsy · None Singleton · print() & input() Guide',
    desc: 'బూలియన్స్ (True/False) పనితీరు, Truthy మరియు Falsy రూల్స్, None (శూన్యం) అంటే ఏంటి, మరియు యూజర్ నుంచి డేటా ఇన్పుట్ తీసుకోవడం గురించి తెలుసుకుందాం.',
    sections: [
      {
        title: '1. The Boolean Data Type (bool)',
        body: `<p><code>bool</code> డేటా టైప్ లో <code>True</code> లేదా <code>False</code> ఉంటాయి. పాయితాన్ లో <code>bool</code> అనేది <code>int</code> కిందకే వస్తుంది (అంటే <code>True == 1</code> మరియు <code>False == 0</code> అవుతుంది):</p>`,
        code: `# యూజర్ స్టేటస్ చెక్ చేయడానికి బూలియన్స్:
is_logged_in = True
has_premium_access = False

print("Logged in status:", is_logged_in)
print("Premium access:", has_premium_access)

# మ్యాథ్స్ లో True ని 1 గా, False ని 0 గా వాడుకుంటుంది:
print("True + True equals:", True + True)  # 2 వస్తుంది
print("True * 50 equals:", True * 50)      # 50 వస్తుంది`,
        codeTitle: 'Example 1: Boolean Values in Python',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Boolean ఎలా పనిచేస్తుంది:</strong>
          <p style="margin-top:6px;">పైన చెప్పినట్టు <code>True</code> అనేది <code>1</code> కాబట్టి దాన్ని నెంబర్స్ తో పాటు నేరుగా లెక్కల్లో వాడొచ్చు.</p>
        </div>`
      },
      {
        title: '2. Truthy మరియు Falsy రూల్స్',
        body: `<p>Python లో ఖాళీగా ఉన్నవి (<code>""</code>, <code>[]</code>, <code>{}</code>), సున్నా (<code>0</code>, <code>0.0</code>), మరియు <code>None</code> ఎప్పుడూ <strong>Falsy</strong> (అంటే False లాగా ట్రీట్ అవుతాయి). మిగతావన్నీ <strong>Truthy</strong>:</p>`,
        code: `# ఖాళీగా ఉన్న కార్ట్ లిస్ట్ ఎప్పుడూ Falsy అవుతుంది:
cart = []

if not cart:
    print("🛒 Your cart is currently empty! Please add items.")
else:
    print("Cart items:", cart)

# అందులో ఒక ఐటెం వేయగానే అది Truthy అయిపోతుంది:
cart.append("Python Masterclass Book")
if cart:
    print("✅ Cart now contains:", cart)`,
        codeTitle: 'Example 2: Truthy vs Falsy Evaluation',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Pythonic పద్ధతి:</strong>
          <p style="margin-top:6px;">ఎప్పుడూ <code>if len(cart) == 0:</code> అని రాయకూడదు. <code>if not cart:</code> అని రాయడమే ఒరిజినల్ ప్రొఫెషనల్ పద్ధతి.</p>
        </div>`
      },
      {
        title: '3. The "None" ఆబ్జెక్ట్ & "is None" చెకింగ్',
        body: `<p><code>None</code> అంటే "ఖాళీ" లేదా "ఏమీ లేదు" అని అర్థం. ఎప్పుడైనా None ఉందా లేదా అని చెక్ చేయాలంటే <code>if val is None:</code> (not <code>== None</code>) వాడాలి:</p>`,
        code: `# యూజర్ అడ్రస్ ఇంకా ఎంటర్ చేయలేదు:
user_address = None

if user_address is None:
    print("Address ఇంకా ఎంటర్ చేయలేదు.")
else:
    print("Delivery Address:", user_address)`,
        codeTitle: 'Example 3: Checking None with the "is" Operator',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 "is None" ఎందుకు వాడాలి?</strong>
          <p style="margin-top:6px;"><code>None</code> అనేది మెమరీలో ఒకే ఒక్క ఆబ్జెక్ట్. కాబట్టి <code>==</code> బదులు <code>is</code> వాడితే మెమరీ అడ్రస్ తో డైరెక్ట్ గా కంపేర్ చేసి చాలా ఫాస్ట్ గా పనిచేస్తుంది.</p>
        </div>`
      }
    ],
    mistake: {
      title: 'Booleans ని == తో కంపేర్ చేయడం',
      text: 'కోడ్ రాసేటప్పుడు "if is_valid == True:" అని రాయకూడదు. సింపుల్ గా "if is_valid:" అని రాయాలి. అలాగే "if is_valid == False:" బదులు "if not is_valid:" అని రాయడం కరెక్ట్ పద్ధతి.'
    },
    tryIt: {
      desc: 'ఒక ఖాళీ లిస్ట్ ని క్రియేట్ చేసి Truthy/Falsy రూల్ ప్రకారం అది ఖాళీగా ఉందా లేదా చెక్ చేయండి.',
      code: `cart_items = []  # Empty list is Falsy

if not cart_items:
    print("🛒 Your cart is empty! Please add items.")
else:
    print("Cart has items:", cart_items)`
    },
    faqs: [
      {
        q: 'None కి, 0 కి, ఖాళీ స్ట్రింగ్ ("") కి తేడా ఏంటి?',
        a: '0 అనేది ఒక నెంబర్. ఖాళీ స్ట్రింగ్ అనేది టెక్స్ట్. కానీ None అంటే అక్కడ అసలు ఎలాంటి డేటా ఎసైన్ చేయబడలేదు (It is purely empty).'
      },
      {
        q: '"is None" బదులు "== None" వాడితే ఏమవుతుంది?',
        a: 'పనిచేస్తుంది, కానీ రికమండ్ చేయరు. ఒకవేళ ఎవరైనా కస్టమ్ క్లాస్ రాసి అందులో == రూల్స్ ని ఆపితే కోడ్ క్రాష్ అవ్వొచ్చు. "is" అయితే డైరెక్ట్ మెమరీ అడ్రస్ తో చెక్ చేస్తుంది.'
      }
    ]
  }
];
