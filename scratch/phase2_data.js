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
    title: 'Python Operators Complete Guide (తెలుగులో)',
    badge: '6. Operators Guide',
    subtopics: 'Arithmetic · Comparison · Logical (and, or, not) · Identity (is) · Membership (in) · Walrus (:=) · Precedence',
    desc: 'Python లోని 8 రకాల ఆపరేటర్స్ గురించి తెలుసుకుందాం: arithmetic, comparison, logical short-circuiting, identity, membership, walrus operator, మరియు precedence.',
    sections: [
      {
        title: '1. Operator అంటే ఏమిటి? (Operands & Expressions)',
        body: `<p><strong>Operator</strong> అంటే ఒకటి లేదా అంతకంటే ఎక్కువ <strong>operands</strong> (వేరియబుల్స్/వాల్యూస్) మీద మ్యాథ్స్ లాంటి లెక్కలు చేసే ఒక సింబల్ లేదా కీవర్డ్. Python లో ఆపరేటర్స్ ని 8 రకాలుగా విభజించారు:</p>`,
        code: `# బేసిక్ ఆపరేటర్స్ ఉదాహరణ:
a = 10
b = 5

print("1. Arithmetic (a + b):", a + b)           # 15 వస్తుంది
print("2. Comparison (a > b):", a > b)           # 10 అనేది 5 కంటే పెద్దదే కాబట్టి True
print("3. Logical (a > 0 and b > 0):", a > 0 and b > 0) # రెండూ 0 కంటే పెద్దవే కాబట్టి True`,
        codeTitle: 'Example 1: Basic Operator Computations',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 ఆపరేటర్స్ కాన్సెప్ట్:</strong>
          <p style="margin-top:6px;"><code>a + b</code> లో <code>+</code> అనేది operator, మరియు <code>a</code>, <code>b</code> లు operands.</p>
        </div>`
      },
      {
        title: '2. Arithmetic Operators (True Division vs Floor Division)',
        body: `<p>Python లో 7 ముఖ్యమైన arithmetic ఆపరేటర్స్ ఉన్నాయి. ముఖ్యంగా <code>/</code> కి మరియు <code>//</code> కి ఉన్న తేడాని గమనించండి:</p>
        <ul>
          <li><code>/</code>: <strong>True Float Division</strong> — ఎప్పుడూ డెసిమల్స్ (float) ఇస్తుంది (ఉదా: <code>10 / 2 -> 5.0</code>).</li>
          <li><code>//</code>: <strong>Floor Division</strong> — డెసిమల్స్ ని తీసేసి చిన్న నెంబర్ కి రౌండ్ చేస్తుంది (ఉదా: <code>15 // 4 -> 3</code>, కానీ <code>-15 // 4 -> -4</code>).</li>
          <li><code>%</code>: <strong>Modulus</strong> — భాగాహారం చేయగా మిగిలిన శేషం (Remainder) ఇస్తుంది.</li>
          <li><code>**</code>: <strong>Exponentiation (Power)</strong> — పవర్ ($a^b$) ని లెక్కగడుతుంది.</li>
        </ul>`,
        code: `print("15 / 4  (True float division):", 15 / 4)       # 3.75 (Float)
print("15 // 4 (Floor integer division):", 15 // 4)    # 3 (Int)
print("-15 // 4 (Negative floor division):", -15 // 4) # -4 (నెగటివ్ లో కిందికి రౌండ్ అవుతుంది కాబట్టి!)
print("15 % 4  (Modulus remainder):", 15 % 4)         # 3 (శేషం)
print("2 ** 5  (Exponentiation power):", 2 ** 5)       # 32 (2 కి పవర్ 5)`,
        codeTitle: 'Example 2: Arithmetic Operators Breakdown',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 -15 // 4 ఎందుకు -4 అయింది?</strong>
          <p style="margin-top:6px;">గణితశాస్త్రం ప్రకారం $-15 / 4 = -3.75$. దాన్ని కింది నెంబర్ కి రౌండ్ చేస్తే $-4$ అవుతుంది ($-3$ కాదు).</p>
        </div>`
      },
      {
        title: '3. Comparison Operators & Chained Comparisons',
        body: `<p>Comparison ఆపరేటర్స్ రెండు వాల్యూస్ ని పోల్చి <code>True</code> లేదా <code>False</code> ని ఇస్తాయి (<code>==</code>, <code>!=</code>, <code>></code>, <code><</code>, <code>>=</code>, <code><=</code>).</p>
        <p><strong>Chained Comparisons:</strong> C/Java లాగా రెండు సార్లు రాయాల్సిన పని లేకుండా పైథాన్ లో ఒకే లైన్ లో ఈజీగా రాయొచ్చు:</p>`,
        code: `score = 85

# C/Java లో ఇలా రాస్తారు: score >= 80 && score <= 90
# Python లో సింపుల్ గా మ్యాథ్స్ లాగే రాయొచ్చు:
if 80 <= score <= 90:
    print(f"Grade B: Score {score} is between 80 and 90! 🎯")`,
        codeTitle: 'Example 3: Chained Comparisons in Python',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 దీనివల్ల లాభం ఏంటి?:</strong>
          <p style="margin-top:6px;"><code>80 <= score <= 90</code> లో పైథాన్ <code>score</code> వేరియబుల్ ని ఒక్కసారే చెక్ చేస్తుంది, కాబట్టి కోడ్ ఫాస్ట్ గా రన్ అవుతుంది మరియు చూడటానికి క్లీన్ గా ఉంటుంది.</p>
        </div>`
      },
      {
        title: '4. Logical Operators & Short-Circuit Evaluation',
        body: `<p>పైథాన్ లో <code>&&</code>, <code>||</code> లాంటివి కాకుండా ఇంగ్లీష్ పదాలు వాడుతారు: <code>and</code>, <code>or</code>, మరియు <code>not</code>.</p>
        <p><strong>Short-Circuiting:</strong> రిజల్ట్ ఏంటో ముందే తెలిసిపోతే పైథాన్ మిగతా దాన్ని చెక్ చేయకుండా ఆపేస్తుంది. అంతేకాదు, ఇవి True/False తో పాటు ఒరిజినల్ వేరియబుల్స్ ని కూడా తిరిగిచ్చేస్తాయి:</p>`,
        code: `# 1. Logical and / or
age = 20
has_id = True
if age >= 18 and has_id:
    print("Entry Allowed! 🎟️")

# 2. ఆపరేటర్స్ రిటర్న్ చేసే ఒరిజినల్ వాల్యూస్ (Fallback pattern)
user_input = ""
default_name = user_input or "Anonymous Guest"
print("Welcome,", default_name)`,
        codeTitle: 'Example 4: Logical Operators & Fallback Values',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Fallbacks ఎలా పని చేస్తాయి:</strong>
          <p style="margin-top:6px;"><code>user_input</code> అనేది ఖాళీ స్ట్రింగ్ (Falsy) కాబట్టి, <code>or</code> ఆపరేటర్ దాన్ని వదిలేసి కుడి పక్క ఉన్న <code>"Anonymous Guest"</code> ని తిరిగి ఇచ్చింది.</p>
        </div>`
      },
      {
        title: '5. Identity Operators (is, is not) vs Equality (==)',
        body: `<p>వీటి మధ్య తేడా ఎప్పటికీ మర్చిపోకండి:</p>
        <ul>
          <li><code>==</code>: రెండు వేరియబుల్స్ లోపల ఉన్న <strong>డేటా ఒకటేనా? (Value Equality)</strong> అని చూస్తుంది.</li>
          <li><code>is</code>: రెండు వేరియబుల్స్ RAM లో ఒకే చోట ఉన్నాయా <strong>(Memory Address Identity)</strong> అని చూస్తుంది.</li>
        </ul>`,
        code: `list1 = [1, 2, 3]
list2 = [1, 2, 3]

print("list1 == list2 (డేటా ఒకటేనా?):", list1 == list2) # True
print("list1 is list2 (అడ్రస్ ఒకటేనా?):", list1 is list2)   # False

# రూల్: None, True, False లాంటి వాటికి కచ్చితంగా 'is' వాడాలి
target_val = None
if target_val is None:
    print("Value is None! ✅")`,
        codeTitle: 'Example 5: Identity (is) vs Equality (==)',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Memory పాయింటర్ ఎక్స్ప్లనేషన్:</strong>
          <p style="margin-top:6px;"><code>list1</code> మరియు <code>list2</code> రెండింట్లోనూ <code>[1, 2, 3]</code> సేమ్ డేటా ఉన్నా, అవి వేరు వేరు మెమరీ లొకేషన్లలో సేవ్ అయ్యాయి కాబట్టి <code>list1 is list2</code> అనేది <code>False</code> అయ్యింది.</p>
        </div>`
      },
      {
        title: '6. Membership Operators (in, not in)',
        body: `<p>Membership ఆపరేటర్స్ వాడి ఒక టెక్స్ట్, లిస్ట్, సెట్ లేదా డిక్షనరీ లోపల మనం వెతుకుతున్న ఐటెం ఉందా లేదా (exists) అని చెక్ చేయొచ్చు:</p>`,
        code: `fruits = ["apple", "banana", "mango"]
print("Is apple in list?", "apple" in fruits)  # True
print("Is grape in list?", "grape" in fruits)  # False

# స్ట్రింగ్ లో ఒక పదం ఉందా అని వెతకడానికి:
sentence = "python programming is awesome"
print("Is 'program' in sentence?", "program" in sentence)  # True`,
        codeTitle: 'Example 6: Membership Operators (in, not in)',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Performance Note:</strong>
          <p style="margin-top:6px;">సెట్స్ మరియు డిక్షనరీల్లో <code>x in set</code> అని వాడితే ఆపరేషన్ చాలా ఫాస్ట్ గా (ఒక్క మిల్లీ-సెకండ్ లో) జరిగిపోతుంది!</p>
        </div>`
      },
      {
        title: '7. The Walrus Operator (:=) (కొత్త ఫీచర్)',
        body: `<p>Python 3.8 లో ప్రవేశపెట్టిన <strong>walrus ఆపరేటర్ (<code>:=</code>)</strong> వాడి, ఒకే లైన్ లో కండిషన్ చెక్ చేస్తూనే వేరియబుల్ కి వాల్యూ ని కూడా ఎసైన్ చేయొచ్చు:</p>`,
        code: `sample_text = "Python Masterclass 2026"

# ఒకే లైన్ లో వేరియబుల్ ని క్రియేట్ చేసి, ఆ వెంటనే కండిషన్ చెక్ చేద్దాం:
if (length := len(sample_text)) > 10:
    print(f"Text is long! It contains {length} characters.")`,
        codeTitle: 'Example 7: The Walrus Operator (:=)',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 వాల్రస్ ఆపరేటర్ లాభం ఏంటి?:</strong>
          <p style="margin-top:6px;"><code>len(sample_text)</code> ని ఒక్కసారే క్యాలిక్యులేట్ చేసి <code>length</code> వేరియబుల్ లో స్టోర్ చేసాం. దాన్నే లోపల వాడుకున్నాం. కోడ్ చాలా తగ్గింది కదా!</p>
        </div>`
      }
    ],
    mistake: {
      title: 'నెంబర్స్ కి, స్ట్రింగ్స్ కి "is" వాడటం',
      text: '"if x is 100:" అని గానీ "if name is \'admin\':" అని గానీ రాయకండి. వాల్యూస్ చెక్ చేయడానికి ఎప్పుడూ "==" వాడాలి. కేవలం None, True, False లకే "is" వాడాలి.'
    },
    tryIt: {
      desc: 'ఒక స్టూడెంట్ రెండు పరీక్షల్లో పాస్ (marks >= 40) అయ్యాడో లేదో "and" ఆపరేటర్ తో చెక్ చేయండి.',
      code: `math_score = 75
science_score = 82

if math_score >= 40 and science_score >= 40:
    print("🎉 Congratulations, you passed both exams!")
else:
    print("❌ You need to retake one or more exams.")`
    },
    faqs: [
      {
        q: 'Python "or" ఆపరేటర్ True ఇవ్వకుండా ఎందుకు మొదటి వేరియబుల్ ని తిరిగి ఇస్తుంది?',
        a: 'ఇలా చేయడం వల్ల Default Fallback values రాసుకోవడానికి చాలా ఉపయోగపడుతుంది: name = input_name or "Anonymous".'
      },
      {
        q: '/ కి మరియు // కి అసలు తేడా ఏంటి?',
        a: '/ అంటే డెసిమల్స్ తో సహా పర్ఫెక్ట్ భాగాహారం చేస్తుంది (10 / 2 = 5.0). // అంటే శేషాన్ని వదిలేసి కింది నెంబర్ ని ఇస్తుంది (10 // 3 = 3, -10 // 3 = -4).'
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
    title: 'Python Conditional Statements (if, elif, else) (తెలుగులో)',
    badge: '7. Conditional Statements',
    subtopics: 'if-elif-else · Guard Clauses · Ternary Operator · match-case',
    desc: 'Python లో పరిస్థితుల బట్టి కోడ్ ని మార్చడానికి if-elif-else, early returns (guard clauses), ఒకే లైన్ లో if-else (ternary) మరియు కొత్తగా వచ్చిన match-case గురించి తెలుసుకుందాం.',
    sections: [
      {
        title: '1. కోడ్ లో డెసిషన్స్ ఎలా తీసుకుంటారు? (The if-elif-else Ladder)',
        body: `<p>కండిషనల్ స్టేట్మెంట్స్ వాడి కోడ్ ని బ్రాంచెస్ గా విడగొట్టొచ్చు. పైనుండి కింది వరకు ఒకదాని తర్వాత ఒకటి కండిషన్ ని చెక్ చేసుకుంటూ వస్తుంది. ఏ కండిషన్ అయినా <code>True</code> అయితే, మిగతా వాటిని చెక్ చేయకుండానే దాటేస్తుంది (skip):</p>`,
        code: `# మార్కుల ఆధారంగా గ్రేడింగ్ సిస్టం:
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
          <strong style="color:#10b981;">🔍 స్టెప్ బై స్టెప్ ఎక్జిక్యూషన్:</strong>
          <ul style="margin:8px 0 0 18px; line-height:1.7;">
            <li>ముందు <code>marks >= 90</code> (82 >= 90 False కాబట్టి) వదిలేస్తుంది.</li>
            <li>ఆ తర్వాత <code>marks >= 75</code> (82 >= 75 True కాబట్టి) లోపలికి వెళ్లి <code>Grade: A (Very Good!) ✨</code> ప్రింట్ అవుతుంది.</li>
            <li>ఇది True అయింది కాబట్టి ఇక మిగతా <code>elif</code> మరియు <code>else</code> ని పట్టించుకోదు!</li>
          </ul>
        </div>`
      },
      {
        title: '2. Guard Clauses తో క్లీన్ కోడ్ (Pyramid of Doom లేకుండా)',
        body: `<p>if లోపల ఇంకో if రాసుకుంటూ వెళ్తే కోడ్ చదవడానికి చాలా కష్టంగా ఉంటుంది. ప్రొఫెషనల్స్ ఎప్పుడూ <strong>Guard Clauses (Early returns)</strong> వాడి కోడ్ ని ఫ్లాట్ గా, నీట్ గా ఉంచుతారు:</p>`,
        code: `def check_user_access(is_logged_in, has_permission, is_banned):
    # Guard Clauses (ముందే బయటికి వచ్చేయడం):
    if not is_logged_in:
        return "Please log in first."
    if is_banned:
        return "Account is banned!"
    if not has_permission:
        return "Access denied."
        
    # అన్నీ కరెక్ట్ గా ఉంటే అసలైన కోడ్ కి చేరుకుంటుంది:
    return "Welcome to Admin Dashboard! ✅"

print(check_user_access(True, True, False))`,
        codeTitle: 'Example 2: Guard Clauses (Early Returns)',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 కోడ్ క్వాలిటీ విశేషం:</strong>
          <p style="margin-top:6px;">అసలు పనికాని కండిషన్స్ ని ముందే చెక్ చేసి <code>return</code> చేసేయడం వల్ల, అసలైన "happy path" కోడ్ స్పేసెస్ లేకుండా స్ట్రైట్ గా చూడచక్కగా ఉంటుంది.</p>
        </div>`
      },
      {
        title: '3. Ternary Operator (ఒకే లైన్ లో if-else)',
        body: `<p>చాలా సింపుల్ కండిషన్స్ ని మనం ఒకే లైన్ లో ఇలా రాయొచ్చు: <code>value_if_true if condition else value_if_false</code>:</p>`,
        code: `age = 20
status = "Adult" if age >= 18 else "Minor"
print("Status:", status)

# డైనమిక్ ఫీజు క్యాలిక్యులేషన్:
is_weekend = True
entry_fee = 25 if is_weekend else 15
print(f"Entry Fee: \${entry_fee}")`,
        codeTitle: 'Example 3: Ternary Conditional Expression',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 వన్-లైన్ సింటాక్స్:</strong>
          <p style="margin-top:6px;">చిన్న చిన్న వేరియబుల్స్ కి వాల్యూస్ అసైన్ చేసేటప్పుడు, ఇలా ఒకే లైన్ లో రాయడం బెస్ట్ ప్రాక్టీస్.</p>
        </div>`
      },
      {
        title: '4. కొత్తగా వచ్చిన match-case ఫీచర్ (Python 3.10+)',
        body: `<p>Python 3.10 లో <code>match-case</code> ని పరిచయం చేసారు. C/Java లోని <code>switch-case</code> లాగే ఉంటుంది కానీ ఇది ఇంకా పవర్ ఫుల్. ఇందులో <code>|</code> (OR) కూడా వాడొచ్చు:</p>`,
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
          <strong style="color:#10b981;">🔍 match-case ఫీచర్స్:</strong>
          <ul style="margin:8px 0 0 18px; line-height:1.7;">
            <li><code>case 401 | 403:</code> అంటే ఈ రెండింట్లో ఏది మ్యాచ్ అయినా సరే రన్ అవుతుంది.</li>
            <li><code>case _:</code> అంటే పైవి ఏవీ మ్యాచ్ కానప్పుడు లాస్ట్ లో రన్ అయ్యే డిఫాల్ట్ కేస్.</li>
          </ul>
        </div>`
      }
    ],
    mistake: {
      title: 'elif వాడకుండా మళ్లీ మళ్లీ if వాడటం',
      text: 'లైన్ గా if స్టేట్మెంట్స్ రాసుకుంటూ వెళ్తే, పైన కండిషన్ True అయినా కూడా, పైథాన్ ప్రతి ఒక్క if ని విడిగా చెక్ చేసుకుంటూ టైమ్ వేస్ట్ చేస్తుంది. ఎప్పుడూ మొదటి if తర్వాత elif నే వాడాలి.'
    },
    tryIt: {
      desc: 'ఒక సంవత్సరం లీప్ సంవత్సరం (Leap Year) అవునో కాదో కండిషన్స్ పెట్టి చెక్ చేయండి.',
      code: `year = 2024

if (year % 4 == 0 and year % 100 != 0) or (year % 400 == 0):
    print(f"✅ {year} is a Leap Year!")
else:
    print(f"❌ {year} is NOT a Leap Year.")`
    },
    faqs: [
      {
        q: 'Python లో switch-case ఉందా?',
        a: 'పాత పైథాన్ లో లేదు. కానీ Python 3.10 నించి switch-case బదులుగా ఇంకా పవర్ ఫుల్ అయిన "match-case" ని తీసుకొచ్చారు.'
      },
      {
        q: 'pass మరియు continue కి తేడా ఏంటి?',
        a: 'pass అంటే ప్రస్తుతానికి అక్కడ కోడ్ ఏమీ లేదు, సైలెంట్ గా నెక్స్ట్ లైన్ కి వెళ్ళిపోమని అర్థం. continue అంటే కేవలం లూప్స్ లో మాత్రమే వాడతారు, ప్రస్తుత సైకిల్ ని ఆపేసి వెంటనే నెక్స్ట్ సైకిల్ కి జంప్ అవ్వమని అర్థం.'
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
    title: 'Python Loops (while & for Loops) (తెలుగులో)',
    badge: '8. while & for Loops',
    subtopics: 'while Loops · for Loops · range() Function · enumerate() · zip()',
    desc: 'Python లో లూప్స్ గురించి నేర్చుకుందాం: while లూప్స్, ఫర్ లూప్స్, మెమరీ సేవ్ చేసే range() ఫంక్షన్, మరియు enumerate() & zip() ట్రిక్స్.',
    sections: [
      {
        title: '1. The while Loop (కండిషన్ ఉన్నంత వరకు రన్ అవుతుంది)',
        body: `<p><strong><code>while</code> loop</strong> అనేది ఒక కండిషన్ <strong>True</strong> ఉన్నంత వరకు కోడ్ బ్లాక్ ని పదే పదే రన్ చేస్తూనే ఉంటుంది.</p>
        <p>కరెక్ట్ గా ఒక while లూప్ రాయాలంటే 3 విషయాలు కచ్చితంగా ఉండాలి:</p>
        <ol>
          <li><strong>Initialization:</strong> లూప్ మొదలయ్యే ముందు ఒక కౌంటర్ ని స్టార్ట్ చేయాలి (ఉదా: <code>count = 1</code>).</li>
          <li><strong>Condition Test:</strong> ప్రతి సైకిల్ కి ముందు కండిషన్ ని చెక్ చేయాలి (ఉదా: <code>while count <= 5:</code>).</li>
          <li><strong>State Update:</strong> లూప్ లోపల కౌంటర్ ని అప్డేట్ చేస్తూ (ఉదా: <code>count += 1</code>) ఉండాలి. లేకపోతే అది ఎప్పటికీ ఆగిపోకుండా <strong>infinite loop</strong> లో ఇరుక్కుపోతుంది!</li>
        </ol>`,
        code: `# Step 1: కౌంటర్ ని 1 కి సెట్ చేద్దాం
count = 1

# Step 2: లూప్ కండిషన్ (count 5 అయ్యేవరకు రన్ అవుతుంది)
while count <= 5:
    print("Current Count is:", count)
    
    # Step 3: ప్రతీసారి కౌంటర్ కి 1 కలుపుదాం
    count += 1

# Step 4: లూప్ అయిపోయాక రన్ అయ్యే కోడ్
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
            <tr><td>Iteration 6</td><td><code>6 &lt;= 5 (False!)</code></td><td>లూప్ బ్రేక్ అయి బయటికి వస్తుంది!</td><td>Exit loop</td></tr>
          </table>
        </div>`
      },
      {
        title: '2. The for Loop & లిస్ట్ లపై ఇటరేట్ చేయడం',
        body: `<p>Python లో <strong><code>for</code> loop</strong> అనేది C/Java లోని "for-each" లాగా పనిచేస్తుంది. మనం మ్యాన్యువల్ గా కౌంటర్స్ పెట్టుకునే పని లేకుండా, ఏదైనా కలెక్షన్ (లిస్ట్, స్ట్రింగ్, డిక్షనరీ) లోని ఐటమ్స్ ని ఆటోమాటిక్ గా తీస్తుంది:</p>`,
        code: `# ప్రోగ్రామింగ్ లాంగ్వేజెస్ తో ఒక లిస్ట్ క్రియేట్ చేద్దాం:
languages = ["Python", "JavaScript", "Java", "C++"]

# ఆ లిస్ట్ లోని ప్రతి ఎలిమెంట్ ని తీసుకుని ప్రింట్ చేద్దాం:
for lang in languages:
    print("Programming Language:", lang)`,
        codeTitle: 'Example 2: for Loop Iterating over a List',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 కోడ్ బ్రేక్ డౌన్:</strong>
          <ul style="margin:8px 0 0 18px; line-height:1.7;">
            <li><code>for lang in languages:</code>: ప్రతీ సైకిల్ లో, పైథాన్ ఆటోమాటిక్ గా <code>languages</code> లిస్ట్ నుండి నెక్స్ట్ ఐటెం ని తీసుకుని దాన్ని <code>lang</code> అనే వేరియబుల్ లో పెడుతుంది.</li>
            <li>ఇందులో <code>len()</code> వాడాల్సిన పని లేదు, ఇండెక్స్ ఎర్రర్స్ అసలే రావు!</li>
          </ul>
        </div>`
      },
      {
        title: '3. range() Function తో నెంబర్స్ జనరేట్ చేయడం',
        body: `<p>built-in <code>range()</code> ఫంక్షన్ నెంబర్స్ ని సీక్వెన్స్ గా ఇస్తుంది. ఇందులో 3 పారామీటర్స్ ఇవ్వొచ్చు: <code>range(start, stop, step)</code>:</p>
        <ul>
          <li><code>start</code>: ఎక్కడి నుంచి స్టార్ట్ అవ్వాలి (డిఫాల్ట్ <code>0</code>).</li>
          <li><code>stop</code>: ఎక్కడికి ఎండ్ అవ్వాలి (ఈ నెంబర్ కి ఒక అడుగు ముందే లూప్ ఆగిపోతుంది!).</li>
          <li><code>step</code>: మధ్యలో గ్యాప్ ఎంత ఉండాలి (డిఫాల్ట్ <code>1</code>).</li>
        </ul>`,
        code: `# 1. 1 నుండి 5 వరకు (6 కి ముందే ఆగిపోతుంది):
print("Counting 1 to 5:")
for i in range(1, 6):
    print(i, end=" ")
print()

# 2. 2 నుండి 10 వరకు సరి సంఖ్యలు (step=2 వాడి):
print("\\nEven numbers from 2 to 10 (step=2):")
for num in range(2, 11, 2):
    print(num, end=" ")
print()`,
        codeTitle: 'Example 3: range() with Step Increment',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Memory Efficiency సీక్రెట్:</strong>
          <p style="margin-top:6px;">Python 3 లో, మీరు <code>range(1_000_000)</code> ఇచ్చినా అది 1 మిలియన్ నెంబర్స్ కి సరిపడా RAM ని తీసుకోదు. ప్రతి సైకిల్ కి ఎప్పటికప్పుడు నెక్స్ట్ నెంబర్ ని జనరేట్ చేస్తుంది!</p>
        </div>`
      },
      {
        title: '4. enumerate() తో నెంబర్ తో పాటు వాల్యూ ని పొందడం',
        body: `<p>మనం ఒక లిస్ట్ లో తిరుగుతున్నప్పుడు, మనకు వాల్యూ తో పాటు <strong>ఇండెక్స్ నెంబర్</strong> కూడా కావాలనుకున్నప్పుడు <code>enumerate()</code> వాడతాం. అదనంగా కౌంటర్ పెట్టుకునే బాధ తప్పుతుంది:</p>`,
        code: `students = ["Alex", "Balaji", "Chloe", "David"]

# enumerate() మనకు ర్యాంక్ ని, పేరు ని ఒకేసారి ఇస్తుంది:
for rank, name in enumerate(students, start=1):
    print(f"Rank #{rank}: {name}")`,
        codeTitle: 'Example 4: Numbered Output with enumerate()',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 పారామీటర్ బ్రేక్ డౌన్:</strong>
          <ul style="margin:8px 0 0 18px; line-height:1.7;">
            <li><code>start=1</code> అని ఇవ్వడం వల్ల ర్యాంక్ 0 తో కాకుండా 1 తో మొదలవుతుంది.</li>
            <li>ప్రతి సైకిల్ లో <code>rank</code> లోకి నెంబర్, <code>name</code> లోకి పేరు వస్తాయి.</li>
          </ul>
        </div>`
      },
      {
        title: '5. zip() వాడి సమాంతరంగా (Parallel) లూప్ చేయడం',
        body: `<p>రెండు లేదా మూడు లిస్ట్ ల మీద ఒకేసారి లూప్ చేయాలంటే <code>zip()</code> ఫంక్షన్ వాడాలి. ఇది వేర్వేరు లిస్ట్ ల్లోని ఎలిమెంట్స్ ని జత చేస్తుంది:</p>`,
        code: `names = ["Alice", "Bob", "Charlie"]
scores = [95, 88, 92]
grades = ["A+", "B+", "A"]

# ఒకేసారి 3 లిస్ట్ ల మీద లూప్ చేద్దాం:
for name, score, grade in zip(names, scores, grades):
    print(f"Student: {name:7} | Score: {score}/100 | Grade: {grade}")`,
        codeTitle: 'Example 5: Parallel Iteration with zip()',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Output బ్రేక్ డౌన్:</strong>
          <p style="margin-top:6px;">లూప్ 1: <code>Alice</code>, <code>95</code>, <code>A+</code> వస్తాయి. లూప్ 2: <code>Bob</code>, <code>88</code>, <code>B+</code>. ఏదైనా లిస్ట్ ముందుగా అయిపోతే, <code>zip()</code> వెంటనే ఆగిపోతుంది.</p>
        </div>`
      }
    ],
    mistake: {
      title: 'లూప్ రన్ అయ్యేటప్పుడు ఆ లిస్ట్ ని డిలీట్/అప్డేట్ చేయడం',
      text: 'ఒక లిస్ట్ లో లూప్ రన్ అవుతుండగా (for item in my_list:) ఎట్టి పరిస్థితిలో అందులోని ఐటమ్స్ ని డిలీట్ చేయడం గానీ కొత్తవి యాడ్ చేయడం గానీ చేయకూడదు. అలా చేస్తే ఇండెక్స్ లు మారిపోయి కోడ్ పాడవుతుంది. చేయాల్సివస్తే దాన్ని కాపీ చేసుకుని (my_list.copy()) చేయాలి.'
    },
    tryIt: {
      desc: '5 వ ఎక్కం (Multiplication table) ని 1 నుంచి 10 వరకు ప్రింట్ చేయండి.',
      code: `table_num = 5

print(f"✖️ Multiplication Table of {table_num}:")
for i in range(1, 11):
    print(f"{table_num} x {i} = {table_num * i}")`
    },
    faqs: [
      {
        q: 'Python 3 లో range() కి మొత్తం మెమరీ ఒకేసారి కావాలా?',
        a: 'లేదు. Python 3 లో range() అనేది లేజీ ఆబ్జెక్ట్. దానికి ఎన్ని మిలియన్ల నెంబర్ ఇచ్చినా O(1) మెమరీ తోనే ప్రతీ సైకిల్ కి నెక్స్ట్ నెంబర్ ని జనరేట్ చేసుకుంటుంది.'
      },
      {
        q: 'నేను ఒక లిస్ట్ ని రివర్స్ ఆర్డర్ లో ఎలా లూప్ చేయొచ్చు?',
        a: 'మీరు reversed(my_list) అని వాడొచ్చు, లేదా స్ట్రింగ్ స్లైసింగ్ ఫార్మాట్ లో my_list[::-1] వాడి కూడా రివర్స్ లూప్ చేయొచ్చు.'
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
    title: 'Python Loop Controls (break, continue, else) (తెలుగులో)',
    badge: '9. Loop Controls & else',
    subtopics: 'break · continue · pass · Loop else Clause · Prime Checker',
    desc: 'లూప్స్ ని కంట్రోల్ చేయడానికి break, iteration ని స్కిప్ చేయడానికి continue, మరియు పైథాన్ లో స్పెషల్ ఫీచర్ అయిన Loop else గురించి నేర్చుకుందాం.',
    sections: [
      {
        title: '1. The break Statement (లూప్ ని ముందే ఆపేయడం)',
        body: `<p><strong><code>break</code> statement</strong> ఎప్పుడైతే ఎక్జిక్యూట్ అవుతుందో, వెంటనే లూప్ అక్కడికక్కడే ఆగిపోయి, లూప్ బయట ఉన్న నెక్స్ట్ లైన్ కి జంప్ అవుతుంది:</p>`,
        code: `# మనకు కావాల్సిన నెంబర్ 3 దొరకగానే ఆపేద్దాం:
print("Starting loop:")

for i in range(1, 6):
    if i == 3:
        print("🎯 Target number 3 found! Stopping loop immediately.")
        break  # లూప్ ఇక్కడే ఆగిపోతుంది!
        
    print("Processing number:", i)

print("Program continued after break. ✅")`,
        codeTitle: 'Example 1: Terminating Loop Early with break',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 ఎక్జిక్యూషన్ ఫ్లో:</strong>
          <ul style="margin:8px 0 0 18px; line-height:1.7;">
            <li>ముందు <code>Processing number: 1</code>, <code>2</code> ప్రింట్ అవుతాయి.</li>
            <li>ఎప్పుడైతే <code>i == 3</code> అయిందో, <code>break</code> ఆ లూప్ ని బద్దలుకొట్టి బయటికి వచ్చేస్తుంది. అందుకే 4, 5 అసలు ప్రింటే అవ్వవు!</li>
          </ul>
        </div>`
      },
      {
        title: '2. The continue Statement (మిగతాది వదిలేసి నెక్స్ట్ సైకిల్ కి వెళ్లడం)',
        body: `<p><strong><code>continue</code> statement</strong> రన్ అయితే, లూప్ ఆగిపోదు, కానీ ఆ సైకిల్ లో కింద ఉన్న కోడ్ ని వదిలేసి, వెంటనే నెక్స్ట్ సైకిల్ కి వెళ్ళిపోతుంది:</p>`,
        code: `# 3 ని స్కిప్ చేసి మిగతావి ప్రింట్ చేద్దాం:
print("Starting loop with continue:")

for i in range(1, 6):
    if i == 3:
        print("⏭️ Skipping number 3...")
        continue  # ఈ సైకిల్ లోని కింది కోడ్ ని స్కిప్ చేసి, మళ్లీ పైకి వెళ్తుంది!
        
    print("Processing number:", i)

print("Loop finished! ✅")`,
        codeTitle: 'Example 2: Skipping Current Iteration with continue',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 break మరియు continue మధ్య తేడా:</strong>
          <ul style="margin:8px 0 0 18px; line-height:1.7;">
            <li><code>break</code> అయితే మొత్తం లూప్ నే డిలీట్ చేసి బయటికి వచ్చేస్తుంది.</li>
            <li><code>continue</code> అయితే కేవలం ఆ ఒక్క సైకిల్ ని మాత్రమే ఆపేసి, మిగతా వాటి కోసం లూప్ ని రన్ చేస్తుంది.</li>
          </ul>
        </div>`
      },
      {
        title: '3. Python కు మాత్రమే ఉన్న స్పెషల్ ఫీచర్: Loop else Clause',
        body: `<p>Python లో మనం <code>for</code> లేదా <code>while</code> లూప్ కి డైరెక్ట్ గా ఒక <code>else</code> బ్లాక్ ని కలపొచ్చు. <strong>లూప్ ఎప్పుడూ <code>break</code> కాకుండా మొత్తం కంప్లీట్ గా రన్ అయితేనే ఈ <code>else</code> బ్లాక్ ఎక్జిక్యూట్ అవుతుంది</strong>. ఒకవేళ <code>break</code> అయితే <code>else</code> బ్లాక్ కూడా స్కిప్ అవుతుంది:</p>`,
        code: `numbers = [10, 20, 30, 40]
target = 30

for num in numbers:
    if num == target:
        print(f"✅ Target {target} found in list!")
        break  # break అయింది కాబట్టి -> కింది else బ్లాక్ ఎక్జిక్యూట్ అవ్వదు!
else:
    print(f"❌ Target {target} not found.")`,
        codeTitle: 'Example 3: Loop else Clause when Target is Found',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 else ఎందుకు రన్ అవ్వలేదు?:</strong>
          <p style="margin-top:6px;">ఎందుకంటే <code>num == 30</code> అవ్వగానే, <code>break</code> ఎక్జిక్యూట్ అయింది. అలా <code>break</code> అయినప్పుడు లూప్ దానికి అతుక్కుని ఉన్న <code>else:</code> ని కూడా ఆపేస్తుంది.</p>
        </div>`
      },
      {
        title: '4. టార్గెట్ దొరకనప్పుడు Loop else ఏమవుతుంది?',
        body: `<p>టార్గెట్ గనుక లిస్ట్ లో లేకపోతే, లూప్ <code>break</code> అవ్వకుండా మొత్తం అన్నీ వెతికి సహజంగానే ఆగిపోతుంది. అప్పుడు వెంటనే <code>else</code> రన్ అయి, "నాకు దొరకలేదు" అని చెప్తుంది!</p>`,
        code: `numbers = [10, 20, 30, 40]
target = 99  # ఈ నెంబర్ లిస్ట్ లో లేదు

for num in numbers:
    if num == target:
        print(f"✅ Target {target} found!")
        break
else:
    # బ్రేక్ అవ్వలేదు కాబట్టి ఆటోమాటిక్ గా రన్ అవుతుంది!
    print(f"❌ Target {target} was NOT found in the list! (Handled by loop else)")`,
        codeTitle: 'Example 4: Loop else Clause when Target is Missing',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Loop else రూల్:</strong>
          <p style="margin-top:6px;">లూప్ కి ఉన్న else ని <em>"if nobreak:"</em> అని చదువుకోవచ్చు. లూప్ మధ్యలో ఆగిపోకుండా పూర్తి అయితేనే ఇది రన్ అవుతుంది.</p>
        </div>`
      },
      {
        title: '5. రియల్ వరల్డ్ అప్లికేషన్: ప్రైమ్ నెంబర్ ప్రోగ్రామ్',
        body: `<p>ఒక నెంబర్ ప్రైమ్ నెంబరా కాదా అని తెలుసుకోవడానికి Loop <code>else</code> ని చాలా బాగా వాడొచ్చు:</p>`,
        code: `num = 17

# 2 నుండి దానికి ముందున్న నెంబర్ వరకు ఏది భాగిస్తుందో చూద్దాం:
for i in range(2, num):
    if num % i == 0:
        print(f"{num} is NOT prime (divisible by {i})")
        break
else:
    # ఏ నెంబర్ భాగించక బ్రేక్ అవ్వలేదు కాబట్టి ఇది రన్ అవుతుంది:
    print(f"🌟 {num} is a PRIME NUMBER! (No divisors found)")`,
        codeTitle: 'Example 5: Prime Number Checker with Loop else',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 ఇదెలా పనిచేసింది?:</strong>
          <p style="margin-top:6px;">2 నుండి 16 వరకు ఏ నెంబర్ కూడా 17 ని భాగించలేదు కాబట్టి <code>break</code> జరగలేదు. లూప్ ప్రశాంతంగా పూర్తవ్వడంతో <code>else:</code> రన్ అయి 17 ప్రైమ్ నెంబర్ అని ప్రింట్ చేసింది!</p>
        </div>`
      }
    ],
    mistake: {
      title: 'break తర్వాత కూడా else రన్ అవుతుంది అనుకోవడం',
      text: 'గుర్తుంచుకోండి: లూప్ గనక break స్టేట్మెంట్ వాడితే, కింది else బ్లాక్ మొత్తానికే స్కిప్ అయిపోతుంది. లూప్ లోని అన్నీ ఐటమ్స్ కంప్లీట్ అయితే మాత్రమే else పని చేస్తుంది.'
    },
    tryIt: {
      desc: '"Balaji" అనే పేరు కోసం వెతకండి. దొరికితే బ్రేక్ చేయండి, లేదంటే else లో "Student not found" అని ప్రింట్ చేయండి.',
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
        q: 'while లూప్ కి కూడా else పని చేస్తుందా?',
        a: 'అవును. while-else లో కూడా కండిషన్ False అయ్యి లూప్ ఆగినప్పుడు else రన్ అవుతుంది. కానీ break వాడితే మాత్రం else రన్ అవ్వదు.'
      },
      {
        q: 'nested లూప్స్ (లూప్ లోపల లూప్) లోపలినుంచి ఒకేసారి బయటికి రావడం ఎలా?',
        a: 'పైథాన్ లో ఇలా చేయడానికి బెస్ట్ వే: ఆ కోడ్ ని ఒక ఫంక్షన్ లో పెట్టి డైరెక్ట్ గా return చేయడం. లేదా ఒక వేరియబుల్ ని ఫ్లాగ్ (True/False) గా పెట్టుకుని బ్రేక్ చేయాలి.'
      }
    ]
  }
];
