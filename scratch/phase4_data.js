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
    title: 'Python Functions Fundamentals (తెలుగులో)',
    badge: '15. Functions Fundamentals',
    subtopics: 'def · Parameters vs Arguments · return · Default Arguments · Keyword vs Positional · Calculator Project',
    desc: 'Python లో మాడ్యులర్ ప్రోగ్రామింగ్ (Modular Programming): ఫంక్షన్స్ ఎలా రాయాలి, Parameters కి Arguments కి తేడా ఏంటి, multiple return values, మరియు రియల్-లైఫ్ క్యాలిక్యులేటర్ ప్రాజెక్ట్.',
    sections: [
      {
        title: '1. Function అంటే ఏంటి? (Modular Architecture)',
        body: `<p><strong>Function</strong> అనేది ఒక పేరుతో సేవ్ చేసుకునే కోడ్ బ్లాక్ (code block). దీని ముఖ్య ఉద్దేశ్యం <strong>DRY Principle (Don\'t Repeat Yourself)</strong> — అంటే ఒకే కోడ్ ని మళ్లీ మళ్లీ రాయకుండా, ఒక్కసారి రాసి ఎన్నిసార్లైనా వాడుకోవచ్చు.</p>
        <h4 style="color:#10b981; margin:16px 0 8px;">మెమరీలో ఫంక్షన్స్ ఎలా రన్ అవుతాయి (The Call Stack):</h4>
        <div class="diagram-box">┌────────────────────────────────────────────────────────┐
│  Call Stack Frame (calculate_tax)                      │  [Local variables allocated]
├────────────────────────────────────────────────────────┤
│  Call Stack Frame (main / module scope)                │  [Pauses until function returns]
└────────────────────────────────────────────────────────┘</div>
        <p>మనం ఒక ఫంక్షన్ ని కాల్ చేయగానే, పైథాన్ మెమరీలో ఒక <strong>Stack Frame</strong> ని క్రియేట్ చేసి అందులో ఆ ఫంక్షన్ కి సంబంధించిన వేరియబుల్స్ ని పెట్టుకుంటుంది. <code>return</code> అవ్వగానే ఆ మెమరీ క్లీన్ అయిపోతుంది.</p>`,
        code: `# 1. ఒక పునర్వినియోగ (reusable) ఫంక్షన్ ని డిఫైన్ చేద్దాం:
def calculate_total(price, tax_rate=0.18):
    """టాక్స్ తో కలిపి ఫైనల్ బిల్లు లెక్కించే ఫంక్షన్."""
    final_amount = price + (price * tax_rate)
    return round(final_amount, 2)

# 2. వివిధ వాల్యూస్ తో ఆ ఫంక్షన్ ని పిలుద్దాం (calling):
bill1 = calculate_total(100)        # tax ఇవ్వలేదు కాబట్టి డీఫాల్ట్ 18% వాడింది -> 118.0
bill2 = calculate_total(500, 0.05)  # ఇక్కడ 5% tax వాడింది -> 525.0

print("Order 1 Total: Rs.", bill1)
print("Order 2 Total: Rs.", bill2)`,
        codeTitle: 'Example 1: Defining, Calling and Returning Values from a Function',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 ఎక్జిక్యూషన్ బ్రేక్ డౌన్:</strong>
          <ul style="margin:8px 0 0 18px; line-height:1.7;">
            <li><code>def calculate_total(...)</code> అనేది ఫంక్షన్ ఆబ్జెక్ట్ ని క్రియేట్ చేసింది.</li>
            <li><code>calculate_total(100)</code> అనగానే <code>price</code> కి 100 వెళ్లింది. <code>tax_rate</code> ఆటోమేటిక్ గా 0.18 తీసుకుంది.</li>
            <li><code>return</code> స్టేట్మెంట్ ఫైనల్ రిజల్ట్ ని మనకు వెనక్కి ఇచ్చేసి తన పని ముగించుకుంది.</li>
          </ul>
        </div>`
      },
      {
        title: '2. Parameters కి Arguments కి తేడా & Multiple Return Values',
        body: `<p>చాలా మందికి ఇవి కన్ఫ్యూజన్ గా ఉంటాయి, క్లారిటీ తెచ్చుకోండి:</p>
        <ul>
          <li><strong>Parameters:</strong> ఫంక్షన్ ని డిఫైన్ చేసేటప్పుడు మనం ఇచ్చే పేర్లు (ఉదా: <code>def add(x, y):</code> లో x, y లు).</li>
          <li><strong>Arguments:</strong> ఫంక్షన్ ని కాల్ చేసేటప్పుడు మనం ఇచ్చే అసలు వాల్యూస్ (ఉదా: <code>add(10, 20)</code> లో 10, 20 లు).</li>
        </ul>
        <p><strong>ఒకేసారి చాలా వాల్యూస్ రిటర్న్ చేయడం:</strong> పైథాన్ లో ఒక ఫంక్షన్ కామాతో సెపరేట్ చేసి ఎన్ని వాల్యూస్ నైనా ఒకేసారి రిటర్న్ చేయొచ్చు. పైథాన్ దాన్ని ఆటోమాటిక్ గా ఒక <strong>tuple</strong> లో ప్యాక్ చేసి మనకు ఇస్తుంది:</p>`,
        code: `# ఒకే ఫంక్షన్ నుంచి మూడింటిని (min, max, avg) రిటర్న్ చేద్దాం:
def get_min_max_avg(numbers_list):
    lowest = min(numbers_list)
    highest = max(numbers_list)
    average = sum(numbers_list) / len(numbers_list)
    
    # 3 ఐటమ్స్ రిటర్న్ చేస్తున్నాం (ఇది ట్యూపుల్ లాగా ప్యాక్ అవుతుంది):
    return lowest, highest, round(average, 2)

# వచ్చిన 3 రిజల్ట్స్ ని ఒకే లైన్ లో Unpack చేసుకుందాం:
test_scores = [78, 92, 64, 88, 95, 82]
min_val, max_val, avg_val = get_min_max_avg(test_scores)

print("Scores:", test_scores)
print(f"Lowest: {min_val} | Highest: {max_val} | Class Average: {avg_val}")`,
        codeTitle: 'Example 2: Returning and Unpacking Multiple Values',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 రిటర్న్ కాని ఫంక్షన్స్:</strong>
          <p style="margin-top:6px;">ఏదైనా ఫంక్షన్ లో మీరు అసలు <code>return</code> రాయకపోతే, పైథాన్ ఆటోమాటిక్ గా దానినుంచి <code>None</code> ని రిటర్న్ చేస్తుంది.</p>
        </div>`
      },
      {
        title: '3. Default Arguments & అస్సలు చేయకూడని తప్పు (Mutable Bug)',
        body: `<p>యూజర్ ఒక వాల్యూ ఇవ్వకపోతే తీసుకునేందుకు Default arguments వాడతాం. కానీ <strong>ఎప్పుడూ లిస్ట్ లేదా డిక్షనరీ లాంటివి (mutable) డిఫాల్ట్ గా ఇవ్వకూడదు</strong>!</p>
        <p>ఎందుకంటే పైథాన్ ఈ డిఫాల్ట్ వాల్యూస్ ని <strong>ఫంక్షన్ క్రియేట్ అయినప్పుడు ఒక్కసారే</strong> కాలిక్యులేట్ చేసి పెట్టుకుంటుంది. ఒక లిస్ట్ ని ఇస్తే, మీరు ఎన్నిసార్లు ఫంక్షన్ పిలిచినా అదే పాత లిస్ట్ కంటిన్యూ అవుతూ డేటా కలుషితం అవుతుంది (Shared List Bug)!</p>`,
        code: `# ❌ ఇదొక ప్రమాదకరమైన బగ్ (Mutable Default):
def add_item_bad(item, target_list=[]):
    target_list.append(item)
    return target_list

print("Bad Call 1:", add_item_bad("Apple"))  # ['Apple']
print("Bad Call 2:", add_item_bad("Banana")) # ['Apple', 'Banana'] (అనుకోకుండా రెండు కలిసిపోయాయి!)

# ✅ సరైన పద్ధతి (None వాడటం):
def add_item_safe(item, target_list=None):
    if target_list is None:
        target_list = []  # ప్రతిసారి ఇక్కడ ఒక కొత్త ఫ్రెష్ లిస్ట్ క్రియేట్ అవుతుంది!
    target_list.append(item)
    return target_list

print("\\nSafe Call 1:", add_item_safe("Apple"))  # ['Apple']
print("Safe Call 2:", add_item_safe("Banana")) # ['Banana'] (క్లీన్ గా సపరేట్ గా వచ్చాయి!)`,
        codeTitle: 'Example 3: Default Mutable Argument Bug vs None Sentinel Pattern',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 గోల్డెన్ రూల్:</strong>
          <p style="margin-top:6px;">ఎప్పుడైనా డిఫాల్ట్ గా ఒక లిస్ట్ ని సెట్ చేయాలనుకుంటే, దానికి <code>None</code> ఇచ్చి లోపల కోడ్ లో <code>[]</code> ని అసైన్ చేసుకోవాలి.</p>
        </div>`
      },
      {
        title: '4. Positional vs Keyword Arguments (PEP 570)',
        body: `<p>ఫంక్షన్ కి వాల్యూస్ పంపేటప్పుడు డైరెక్ట్ గా ఆర్డర్ లో పంపొచ్చు (Positional), లేదా పేరు చెప్పి పంపొచ్చు (Keyword). పైథాన్ లో ఈ ఆర్డర్ ని కంట్రోల్ చేయడానికి రెండు సింబల్స్ వాడతారు:</p>
        <ul>
          <li><code>/</code>: దీనికి ముందున్నవి <strong>Positional-Only</strong> (వాటికి పేర్లు చెప్పి పంపకూడదు).</li>
          <li><code>*</code>: దీని తర్వాతివి <strong>Keyword-Only</strong> (కచ్చితంగా పేరు చెప్పే పంపాలి).</li>
        </ul>`,
        code: `# / కి ముందు Positional, * కి తర్వాత Keyword-Only:
def create_user(username, email, /, *, is_admin=False, send_email=True):
    return {
        "username": username,
        "email": email,
        "is_admin": is_admin,
        "send_email": send_email
    }

# కరెక్ట్ గా కాల్ చేయడం:
user1 = create_user("balaji", "balaji@test.com", is_admin=True)
print("Created User:", user1)`,
        codeTitle: 'Example 4: Positional-Only and Keyword-Only Arguments',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 API డిజైన్:</strong>
          <p style="margin-top:6px;">చివర్లో Keyword-Only వాడటం వల్ల, ఎవరైనా ఫంక్షన్ వాడేటప్పుడు <code>True</code> అని వదిలేయకుండా <code>is_admin=True</code> అని క్లియర్ గా రాస్తారు. ఇది చదవడానికి బాగుంటుంది.</p>
        </div>`
      },
      {
        title: '5. Practical Project 1: క్యాలిక్యులేటర్ ఇంజిన్ (Calculator Engine)',
        body: `<p>ఎలాంటి కన్ఫ్యూజన్ లేకుండా సింపుల్ ఫంక్షన్స్ తో ఒక క్యాలిక్యులేటర్ లాజిక్ డిజైన్ చేయడం:</p>`,
        code: `# Modular Calculator Functions
def add(a, b): return a + b
def subtract(a, b): return a - b
def multiply(a, b): return a * b
def divide(a, b):
    if b == 0:
        return "❌ Error: Cannot divide by zero!"
    return a / b

# మెయిన్ ఫంక్షన్
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

# టెస్ట్ చేద్దాం:
print("10 + 5 =", calculate(10, 5, "+"))
print("10 - 4 =", calculate(10, 4, "-"))
print("10 * 3 =", calculate(10, 3, "*"))
print("10 / 2 =", calculate(10, 2, "/"))
print("10 / 0 =", calculate(10, 0, "/"))`,
        codeTitle: 'Example 5: Modular Calculator Engine Project',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 ఆర్కిటెక్చర్ గమనించండి:</strong>
          <p style="margin-top:6px;">ఫంక్షన్స్ ని డైరెక్ట్ గా ఒక డిక్షనరీ (<code>operations_map</code>) లో పెట్టి పిలవడం వల్ల పెద్ద పెద్ద <code>if-else</code> కండిషన్స్ రాసే పని తప్పింది! దీన్నే Dispatch Pattern అంటారు.</p>
        </div>`
      }
    ],
    mistake: {
      title: 'డిఫాల్ట్ ఉన్నవాటి తర్వాత డిఫాల్ట్ లేనివి పెట్టడం',
      text: 'def func(a=10, b): అని రాస్తే SyntaxError: non-default argument follows default argument వస్తుంది. ఎందుకంటే, డిఫాల్ట్ లేనివి అన్నీ ముందు రాయాలి, డిఫాల్ట్ వాల్యూస్ ఉన్నవేమో ఫంక్షన్ చివర్లో మాత్రమే రాయాలి.'
    },
    tryIt: {
      desc: 'ఒక ఫంక్షన్ convert_temperature(celsius) రాసి దాన్ని Fahrenheit లోకి మరియు Kelvin లోకి మార్చి రెంటినీ ఒకేసారి ట్యూపుల్ ద్వారా రిటర్న్ చేయండి.',
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
        q: 'Parameter కి Argument కి తేడా మళ్లీ చెప్తారా?',
        a: 'ఫంక్షన్ ని క్రియేట్ చేస్తున్నప్పుడు బ్రాకెట్స్ లో ఇచ్చే వేరియబుల్స్ పేరు Parameter (అది ఒక ఖాళీ డబ్బా లాంటిది). ఫంక్షన్ ని వాడుకునేటప్పుడు అందులోకి పంపించే అసలు డేటాని Argument అంటారు.'
      },
      {
        q: 'నేను ఒక లిస్ట్ ని డిఫాల్ట్ ఆర్గ్యుమెంట్ గా ఇస్తే ఏమవుతుంది?',
        a: 'డిఫాల్ట్ వాల్యూ ఒకేసారి క్రియేట్ అవుతుంది కాబట్టి, మీరు ఎన్నిసార్లు ఫంక్షన్ ని పిలిచినా అదే పాత లిస్ట్ లోకే మీ ఐటమ్స్ వెళ్తాయి. అందుకే ఎప్పుడూ None ని డిఫాల్ట్ గా వాడి, లోపల కొత్త లిస్ట్ అసైన్ చేయాలి.'
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
    title: 'Python *args & **kwargs Guide (తెలుగులో)',
    badge: '16. *args & **kwargs',
    subtopics: '*args (Positional Pack) · **kwargs (Keyword Pack) · Unpacking (* / **) · Student Grading Project',
    desc: 'యూజర్ ఎన్ని వాల్యూస్ అయినా పాస్ చేసుకునేలా *args మరియు **kwargs ని ఎలా వాడుకోవాలి? ఇవి ట్యూపుల్స్, డిక్షనరీల్లో ఎలా ప్యాక్ అవుతాయి అనే విషయాలను ఒక స్టూడెంట్ గ్రేడింగ్ ప్రాజెక్ట్ తో నేర్చుకుందాం.',
    sections: [
      {
        title: '1. ఎన్నైనా పంపొచ్చు: *args (Tuple Packing)',
        body: `<p>యూజర్ ఎన్ని ఆర్గ్యుమెంట్స్ ని పంపుతాడో మీకు ముందుగా తెలియనప్పుడు, పారామీటర్ ముందు ఒక స్టార్ (<code>*args</code>) పెడతారు.</p>
        <p>అప్పుడు యూజర్ పంపించిన వాటన్నిటినీ పైథాన్ తీసుకుని ఒక <strong>ట్యూపుల్ (tuple)</strong> లాగా ప్యాక్ చేసి లోపలికి ఇస్తుంది:</p>`,
        code: `# ఎన్ని నెంబర్స్ అయినా తీసుకోగల ఫంక్షన్:
def calculate_statistics(*numbers):
    if not numbers:
        return 0, 0
    total = sum(numbers)
    avg = total / len(numbers)
    return total, round(avg, 2)

# 2, 4, లేదా 6 నెంబర్స్ పంపినా ఇది పనిచేస్తుంది!
tot1, avg1 = calculate_statistics(10, 20)
tot2, avg2 = calculate_statistics(10, 20, 30, 40)
tot3, avg3 = calculate_statistics(5, 15, 25, 35, 45, 55)

print(f"Call 1 -> Sum: {tot1}, Avg: {avg1}")
print(f"Call 2 -> Sum: {tot2}, Avg: {avg2}")
print(f"Call 3 -> Sum: {tot3}, Avg: {avg3}")`,
        codeTitle: 'Example 1: Dynamic Positional Packing with *args',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 ట్యూపుల్ లాగా ప్యాక్ అవ్వడం:</strong>
          <p style="margin-top:6px;">లోపల <code>numbers</code> అనేది ఒక ట్యూపుల్ గా మారుతుంది (ఉదా: <code>(10, 20, 30, 40)</code>). మీరు దానిమీద లూప్స్ రన్ చేయొచ్చు, sum() లాంటివి వాడొచ్చు.</p>
        </div>`
      },
      {
        title: '2. కీవర్డ్స్ తో ఎన్ని పంపినా ఓకే: **kwargs (Dictionary Packing)',
        body: `<p>రెండు స్టార్లు పెట్టి (<code>**kwargs</code>) అని ఇస్తే, యూజర్ కీవర్డ్స్ (పేర్లు) తో పంపించిన అదనపు డేటా మొత్తాన్ని పైథాన్ ఒక <strong>డిక్షనరీ</strong> లోకి ప్యాక్ చేస్తుంది:</p>`,
        code: `# యూజర్ ఇష్టమొచ్చిన డీటెయిల్స్ పంపుకోగల ఫంక్షన్:
def build_user_profile(user_id, **attributes):
    profile = {"id": user_id}
    # kwargs లోపల డిక్షనరీ లాగే ఉంటుంది:
    for key, value in attributes.items():
        profile[key] = value
    return profile

# వేర్వేరు డీటెయిల్స్ తో ఇద్దరి యూజర్స్ ని క్రియేట్ చేద్దాం:
user_a = build_user_profile(101, username="balaji", role="Backend Lead", country="India")
user_b = build_user_profile(102, username="alex", is_active=True)

print("Profile A:", user_a)
print("Profile B:", user_b)`,
        codeTitle: 'Example 2: Dynamic Keyword Packing with **kwargs',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 లోపల ఏం జరిగింది?:</strong>
          <p style="margin-top:6px;">ఫంక్షన్ లోపల <code>attributes</code> అనేది డిక్షనరీ లాగా <code>{'username': 'balaji', 'role': 'Backend Lead'}</code> ఇలా మారింది.</p>
        </div>`
      },
      {
        title: '3. అన్నీ కలిపి వాడినప్పుడు ఆర్డర్ (Parameter Order Rule)',
        body: `<p>మీరు ఒకే ఫంక్షన్ లో మామూలువి, డిఫాల్ట్ వి, <code>*args</code>, మరియు <code>**kwargs</code> అన్నీ వాడాలనుకుంటే ఒక రూల్ ఉంటుంది. అవి ఎప్పుడూ కింది ఆర్డర్ లోనే ఉండాలి:</p>
        <div class="diagram-box">def function(మామూలువి, *args, keyword_only, **kwargs):</div>`,
        code: `def complex_logger(prefix, *messages, level="INFO", **metadata):
    print(f"[{level}] {prefix}:", " ".join(messages))
    if metadata:
        print("  Additional Metadata:", metadata)

# ఈ ఫంక్షన్ ని అన్ని రకాల పారామీటర్స్ తో కాల్ చేద్దాం:
complex_logger(
    "ServerAPI",                                  # prefix (మామూలుది)
    "Database connected", "Cache warmed up",      # *args (ట్యూపుల్)
    level="SUCCESS",                              # keyword (డిఫాల్ట్ ని ఓవర్రైట్)
    ip="192.168.1.1", port=5432                   # **kwargs (డిక్షనరీ)
)`,
        codeTitle: 'Example 3: Standard Parameter Ordering Hierarchy',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Rule:</strong>
          <p style="margin-top:6px;"><code>*args</code> మధ్యలో ఎక్కడైనా ఉండొచ్చు కానీ <code>**kwargs</code> కచ్చితంగా ఫంక్షన్ కి ఆఖరి పారామీటర్ లాగే ఉండాలి.</p>
        </div>`
      },
      {
        title: '4. Practical Project 2: Student Grading System',
        body: `<p><code>*args</code> ని వాడి ఎన్ని సబ్జెక్ట్స్ మార్కులైనా తీసుకుని, <code>**kwargs</code> ని వాడి స్టూడెంట్ అదనపు డీటెయిల్స్ ని తీసుకునే ఒక ఆటోమాటిక్ గ్రేడింగ్ సిస్టం:</p>`,
        code: `# స్టూడెంట్ రిపోర్ట్ జనరేటర్
def generate_student_report(name, roll_no, *marks, **extra_details):
    total_marks = sum(marks)
    max_possible = len(marks) * 100
    percentage = (total_marks / max_possible) * 100 if max_possible > 0 else 0
    
    # గ్రేడ్ ని డిసైడ్ చేద్దాం:
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

# 5 సబ్జెక్ట్స్ మరియు అదనపు డీటెయిల్స్ తో కాల్ చేద్దాం:
generate_student_report(
    "Balaji", 202601,
    95, 88, 92, 85, 98,
    branch="Computer Science", semester="6th Sem", college="JNTU"
)`,
        codeTitle: 'Example 4: Student Marks Management System Project',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 ఈ ఫంక్షన్ స్పెషాలిటీ:</strong>
          <p style="margin-top:6px;">ఒక స్టూడెంట్ 3 సబ్జెక్ట్స్ రాసినా, ఇంకో స్టూడెంట్ 8 సబ్జెక్ట్స్ రాసినా ఈ ఫంక్షన్ ఎర్రర్ లేకుండా పనిచేస్తుంది. ఎందుకంటే మనం <code>*marks</code> అన్నాం కాబట్టి ఆటోమాటిక్ గా తీసుకుంటుంది.</p>
        </div>`
      }
    ],
    mistake: {
      title: '**kwargs తర్వాత ఇంకేదైనా పారామీటర్ రాయడం',
      text: 'def func(**kwargs, extra): అని రాస్తే SyntaxError వస్తుంది. గుర్తుంచుకోండి: **kwargs ఎప్పుడూ అందరికంటే ఆఖరి స్థానంలోనే ఉండాలి.'
    },
    tryIt: {
      desc: 'ఒక ఫంక్షన్ calculate_bill(customer_name, *item_prices, discount=0.10, **store_info) వాడి ఒక బిల్లు రసీదు ని ప్రింట్ చేయండి.',
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
        q: '*args, **kwargs అనే పేరునే వాడాలా? వేరే పేర్లు వాడకూడదా?',
        a: 'లేదు, మీరు *items, **details అని మీ ఇష్టమొచ్చిన పేర్లు వాడొచ్చు. స్టార్ (*) మాత్రమే ఇక్కడ మ్యాజిక్ చేస్తుంది. కాకపోతే args, kwargs అనేవి పైథాన్ కమ్యూనిటీ లో అందరూ వాడే స్టాండర్డ్ పేర్లు.'
      },
      {
        q: 'ఒక లిస్ట్ ని ఫంక్షన్ లోకి పంపాలంటే ఎలా?',
        a: 'ఫంక్షన్ ని కాల్ చేసేటప్పుడు మీ లిస్ట్ ముందు ఒక స్టార్ (*) పెట్టి my_func(*my_list) అని పంపితే, అది విడివిడిగా (unpack) ఫంక్షన్ లోపలికి వెళ్తుంది.'
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
    title: 'Python Scope & LEGB Rule (తెలుగులో)',
    badge: '17. Variable Scope (LEGB)',
    subtopics: 'LEGB Hierarchy · Local vs Global · global & nonlocal · Closures · Pure Functions · Converters Project',
    desc: 'Python లో ఒక వేరియబుల్ ని వెతికేటప్పుడు వాడే LEGB రూల్ అంటే ఏంటి? Local, Global స్కోప్ ల మధ్య తేడా, global మరియు nonlocal కీవర్డ్స్, మరియు Pure Functions గురించి నేర్చుకుందాం.',
    sections: [
      {
        title: '1. LEGB అంటే ఏంటి? (Scope Resolution)',
        body: `<p>Python లో ఒక వేరియబుల్ క్రియేట్ చేసాక, అది ఎక్కడెక్కడ పనిచేస్తుందో చెప్పేదాన్ని <strong>Scope (పరిధి)</strong> అంటారు. మీరు ఒక వేరియబుల్ ని వాడినప్పుడు, పైథాన్ దాన్ని 4 అంచెల్లో వెతుక్కుంటూ వెళ్తుంది. దీన్నే <strong>LEGB Rule</strong> అంటారు:</p>
        <div class="diagram-box">┌────────────────────────────────────────────────────────┐
│  L - LOCAL: మనం రాసిన ఫంక్షన్ లోపలే వెతుకుతుంది        │
├────────────────────────────────────────────────────────┤
│  E - ENCLOSING: ఒకవేళ ఫంక్షన్ లోపల ఫంక్షన్ ఉంటే బయటిది  │
├────────────────────────────────────────────────────────┤
│  G - GLOBAL: డైరెక్ట్ గా ఫైల్ లో (పైన) రాసిన వేరియబుల్స్│
├────────────────────────────────────────────────────────┤
│  B - BUILT-IN: పైథాన్ తో పాటు వచ్చే డీఫాల్ట్ ఫంక్షన్స్   │
└────────────────────────────────────────────────────────┘</div>
        <p>ఈ నాలుగింటిలో ఎక్కడ దొరికితే అక్కడ పైథాన్ దాన్ని వాడుకుంటుంది. ఎక్కడా దొరకకపోతే <code>NameError</code> ఎర్రర్ ఇస్తుంది.</p>`,
        code: `# LEGB రూల్ ఎలా పనిచేస్తుందో చూద్దాం:
global_var = "🌍 I am GLOBAL"

def outer_function():
    enclosing_var = "📦 I am ENCLOSING (Outer Function)"
    
    def inner_function():
        local_var = "🏠 I am LOCAL (Inner Function)"
        print("Inside inner function:")
        print("  1.", local_var)      # తన లోపలే ఉంది కాబట్టి Local (L)
        print("  2.", enclosing_var)  # తన పైన ఉన్న ఫంక్షన్ కాబట్టి Enclosing (E)
        print("  3.", global_var)     # అసలు బయటే ఉంది కాబట్టి Global (G)
        print("  4. Built-in len:", len("Test")) # ఇది పైథాన్ ది Built-in (B)
        
    inner_function()

outer_function()`,
        codeTitle: 'Example 1: LEGB Scope Resolution Hierarchy in Action',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 సింపుల్ గా చెప్పాలంటే:</strong>
          <p style="margin-top:6px;">లోపల ఉన్నవాళ్లు బయట ఉన్నవాటిని (Global) ఈజీగా చూసి వాడుకోవచ్చు. కానీ బయట ఉన్నవాళ్లు ఫంక్షన్ లోపల ఉన్నవాటిని (Local) వాడుకోలేరు.</p>
        </div>`
      },
      {
        title: '2. The global Keyword (గ్లోబల్ ని ఫంక్షన్ లోనుంచి మార్చడం)',
        body: `<p>ఫంక్షన్ బయట ఒక <code>x = 100</code> ఉందనుకోండి. మీరు ఫంక్షన్ లోపల <code>x = 200</code> అంటే, బయటి <code>x</code> మారదు! లోపల కొత్తగా ఇంకో లోకల్ <code>x</code> క్రియేట్ అవుతుంది. ఒకవేళ బయట ఉన్నదాన్నే మార్చాలంటే <code>global</code> కీవర్డ్ వాడాలి:</p>`,
        code: `counter = 0  # ఇది Global వేరియబుల్

def increment_bad():
    # 'global' అని చెప్పకుండా counter కి +1 చేస్తే ఎర్రర్ వస్తుంది!
    pass

def increment_safe():
    global counter  # పైన ఉన్న గ్లోబల్ వేరియబుల్ నే నేను వాడుకుంటాను అని చెప్పడం
    counter += 1
    print("Global counter incremented to:", counter)

increment_safe()
increment_safe()
print("Final Global Counter:", counter)`,
        codeTitle: 'Example 2: Modifying Global Variables with "global"',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 బెస్ట్ ప్రాక్టీస్:</strong>
          <p style="margin-top:6px;">పెద్ద పెద్ద ప్రాజెక్ట్స్ లో ఎక్కడ పడితే అక్కడ <code>global</code> వాడటం చాలా రిస్క్. దాన్ని వాడకుండా ఉండటానికే ట్రై చేయండి.</p>
        </div>`
      },
      {
        title: '3. Closures మరియు nonlocal కీవర్డ్',
        body: `<p>ఫంక్షన్ లోపల ఇంకో ఫంక్షన్ ఉండి, లోపలి ఫంక్షన్ బయటి ఫంక్షన్ లోని వేరియబుల్స్ ని వాడుకోవడాన్ని <strong>Closure</strong> అంటారు. ఆ బయటి వేరియబుల్స్ ని లోపల మార్చాలంటే <code>nonlocal</code> వాడాలి:</p>`,
        code: `def create_bank_account(initial_balance):
    balance = initial_balance  # Enclosing వేరియబుల్
    
    def deposit(amount):
        nonlocal balance  # పైన ఉన్న balance నే వాడుకుని మారుస్తా అని చెప్పడం
        balance += amount
        return f"Deposited Rs.{amount} | Current Balance: Rs.{balance}"
        
    return deposit

# మనకోసం ఒక అకౌంట్ క్రియేట్ చేద్దాం:
my_account = create_bank_account(1000)
print(my_account(500))
print(my_account(250))`,
        codeTitle: 'Example 3: Function Closures and the "nonlocal" Keyword',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Closure లాభం ఏంటి?:</strong>
          <p style="margin-top:6px;"><code>balance</code> అనే వేరియబుల్ బయటికి ఎవరికీ కనపడదు, కానీ <code>my_account</code> దగ్గర మాత్రం అది మెమరీలో బతికే ఉంటుంది. సెక్యూరిటీ కోసం క్లాసెస్ బదులు ఇది వాడతారు.</p>
        </div>`
      },
      {
        title: '4. Pure Functions vs Side Effects',
        body: `<p><strong>Pure Function (స్వచ్ఛమైన ఫంక్షన్)</strong> అంటే ఏంటంటే:</p>
        <ol>
          <li>దానికి ఇచ్చిన ఆర్గ్యుమెంట్స్ కి ఎప్పుడూ ఒకటే కరెక్ట్ రిజల్ట్ ఇస్తుంది (గెస్ చేయొచ్చు).</li>
          <li>బయట ఉన్న <strong>గ్లోబల్ వేరియబుల్స్ ని మార్చదు (జీరో Side effects)</strong>.</li>
        </ol>`,
        code: `# ❌ IMPURE FUNCTION (బయట ఉన్నదాన్ని మారుస్తుంది కాబట్టి ఇది ఇంప్యూర్):
total_sales = 0
def add_sale_impure(amount):
    global total_sales
    total_sales += amount
    return total_sales

# ✅ PURE FUNCTION (కేవలం ఇచ్చినవి కూడి వెనక్కి ఇస్తుంది, బయటివి ఏమీ ముట్టుకోదు):
def calculate_sale_pure(current_total, new_amount):
    return current_total + new_amount

print("Pure Result 1:", calculate_sale_pure(100, 50)) # ఎప్పుడూ 150
print("Pure Result 2:", calculate_sale_pure(100, 50)) # ఎప్పుడైనా 150!`,
        codeTitle: 'Example 4: Impure vs Pure Functions',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Pure అయితే లాభం ఏంటి?:</strong>
          <p style="margin-top:6px;">ఇవి చాలా సేఫ్. కోడ్ లో ఎర్రర్స్ (బగ్స్) రావు. ఏ ఇన్పుట్ కి ఏ అవుట్పుట్ వస్తుందో టెస్ట్ చేయడం చాలా ఈజీ.</p>
        </div>`
      },
      {
        title: '5. Practical Project 3: కరెన్సీ (Currency) కన్వర్టర్',
        body: `<p>Pure Functions వాడుకుంటూ ఒక దేశ కరెన్సీ నుండి ఇంకో దేశానికి మార్చే క్యాలిక్యులేటర్ తయారు చేద్దాం:</p>`,
        code: `# Dynamic Currency Converter

# ఒక డాలర్ తో మిగతా దేశాల రేట్లు (USD నే బేస్)
EXCHANGE_RATES = {
    "USD": 1.00,
    "INR": 86.50,
    "EUR": 0.92,
    "GBP": 0.79,
    "JPY": 152.00
}

def convert_currency(amount, from_curr, to_curr):
    """Pure ఫంక్షన్ వాడి ఒక కరెన్సీ నుండి ఇంకో దానికి మారుద్దాం."""
    from_rate = EXCHANGE_RATES.get(from_curr.upper())
    to_rate = EXCHANGE_RATES.get(to_curr.upper())
    
    if not from_rate or not to_rate:
        return None, "❌ Invalid Currency Code!"
        
    # ముందుగా ఎంత ఇచ్చినా దాన్ని బేస్ (USD) కి మార్చి, తర్వాత టార్గెట్ కి మార్చాలి
    amount_in_usd = amount / from_rate
    converted_amount = amount_in_usd * to_rate
    return round(converted_amount, 2), f"1 {from_curr} = {to_rate/from_rate:.4f} {to_curr}"

# టెస్ట్ చేద్దాం:
amt_inr, rate_info = convert_currency(100, "USD", "INR")
print(f"💲 100 USD = Rs.{amt_inr} INR ({rate_info})")

amt_eur, rate_info2 = convert_currency(5000, "INR", "EUR")
print(f"💶 5000 INR = €{amt_eur} EUR ({rate_info2})")`,
        codeTitle: 'Example 5: Currency Converter Project',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 లాజిక్:</strong>
          <p style="margin-top:6px;">ప్రతి కరెన్సీకి ఒకదానితో ఒకటి (INR తో EUR) రేట్లు రాయకుండా, మధ్యలో ఒక బేస్ (USD) ని పెట్టుకోవడం వల్ల లాజిక్ సింపుల్ అయ్యింది!</p>
        </div>`
      }
    ],
    mistake: {
      title: 'గ్లోబల్ ని ముందే వాడి, మళ్ళీ అసైన్ చేయడం (UnboundLocalError)',
      text: 'ఒక ఫంక్షన్ లోపల x ని ఒక లైన్ లో ప్రింట్ చేసి, తర్వాతి లైన్ లో x = 20 అని మారిస్తే UnboundLocalError వస్తుంది. ఒకవేళ మారిస్తే ముందుగానే "global x" అని పెట్టాలి.'
    },
    tryIt: {
      desc: 'ఒక ఫంక్షన్ convert_distance(value, from_unit, to_unit) రాసి కిలోమీటర్లు, మీటర్లు, మరియు మైల్స్ మార్చేలా ట్రై చేయండి.',
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
        q: 'LEGB లో B అంటే ఏంటి?',
        a: 'B అంటే Built-in. మీరు రాయకపోయినా పైథాన్ లో ముందే ఉండే print(), len(), sum() లాంటి ఫంక్షన్స్ ఇవన్నీ.'
      },
      {
        q: 'global కి nonlocal కి తేడా ఏంటి?',
        a: 'global అంటే ఫైల్ లో ఎక్కడో పైన రాసినదాన్ని వాడటానికి. nonlocal అంటే ఒక ఫంక్షన్ లోపల ఉన్న ఇంకో ఫంక్షన్ లోంచి దాని పేరెంట్ ఫంక్షన్ వేరియబుల్స్ వాడటానికి.'
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
    title: 'Python Lambda, Recursion & Type Hints (తెలుగులో)',
    badge: '18. Lambda, Recursion & Hints',
    subtopics: 'Lambda Expressions · Recursion & Call Stack · PEP 484 Type Hints · Docstrings · Password Generator',
    desc: 'అడ్వాన్స్డ్ పైథాన్ కాన్సెప్ట్స్: పేరులేని చిన్న Lambda ఫంక్షన్స్, ఒకదానికొకటి పిలుచుకునే Recursion, కొత్త పైథాన్ టైప్ హింట్స్ (Type Hints), మరియు సెక్యూర్ పాస్వర్డ్ జనరేటర్ ప్రాజెక్ట్.',
    sections: [
      {
        title: '1. పేరులేని చిన్న ఫంక్షన్స్: Lambda (lambda x: expr)',
        body: `<p><strong>Lambda function</strong> అంటే కేవలం ఒకే ఒక లైన్ లో రాసుకునే, పేరు లేని ఒక చిన్న ఫంక్షన్ (anonymous function). ఇందులో మనం <code>return</code> అని కూడా రాయక్కర్లేదు, ఆటోమాటిక్ గా అవుట్పుట్ ఇచ్చేస్తుంది.</p>
        <div class="diagram-box">సింటాక్స్:  lambda పారామీటర్లు : చేయాల్సిన పని</div>
        <p>వీటిని ఎక్కువగా <code>sorted()</code>, <code>filter()</code> లాంటివాటిలో ఏ టెక్స్ట్ ని బట్టి సార్ట్ చేయాలో చెప్పడానికి వాడతారు:</p>`,
        code: `# 1. సింపుల్ గా lambda వాడటం:
square = lambda x: x ** 2
print("Square of 6:", square(6))

# 2. డిక్షనరీ లో ఉన్న శాలరీ బట్టి సార్ట్ చేద్దాం:
employees = [
    {"name": "Balaji", "salary": 95000},
    {"name": "Alex", "salary": 65000},
    {"name": "Chloe", "salary": 82000}
]

# ఇక్కడ lambda తో 'salary' కీ ని పట్టుకుని సార్ట్ చేసాం:
sorted_by_salary = sorted(employees, key=lambda emp: emp["salary"])
print("\\nSorted by Salary:")
for emp in sorted_by_salary:
    print(f"• {emp['name']:8}: Rs.{emp['salary']}")

# 3. కేవలం సరి సంఖ్యలు (Even Numbers) ని ఫిల్టర్ చేద్దాం:
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
even_numbers = list(filter(lambda n: n % 2 == 0, numbers))
print("\\nEven Numbers (via filter):", even_numbers)`,
        codeTitle: 'Example 1: Anonymous Lambda Expressions with sorted & filter',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Lambda వాడకూడని చోటు:</strong>
          <p style="margin-top:6px;">లాంబ్డా లోపల మీరు పెద్ద పెద్ద కండిషన్స్, లూప్స్ (for, while) రాయలేరు. అలాంటి టైమ్ లో మామూలు <code>def</code> ఫంక్షన్ వాడటమే మంచిది.</p>
        </div>`
      },
      {
        title: '2. Recursion అంటే ఏంటి? (తనని తానే పిలుచుకోవడం)',
        body: `<p><strong>Recursion</strong> అంటే ఒక ఫంక్షన్ తన పని తాను చేసుకోవడానికి లోపలనుంచి మళ్లీ తననే పిలుచుకోవడం (calling itself). ఇలా తనని తాను పిలుచుకుంటే ఆగిపోయే దారి కూడా ఉండాలి.</p>
        <p>అందుకే రికర్షన్ లో రెండు ముక్కలు ముఖ్యం:</p>
        <ol>
          <li><strong>Base Case:</strong> ఎప్పుడు ఆగిపోవాలో చెప్పే కండిషన్.</li>
          <li><strong>Recursive Step:</strong> కొంచెం కొంచెం మారుస్తూ తనని తానే మళ్లీ పిలుచుకునే స్టెప్.</li>
        </ol>`,
        code: `# 1. ఫ్యాక్టోరియల్ క్యాలిక్యులేషన్ (n! = n * (n-1)!)
def factorial(n):
    # Base Case (ఎప్పుడు ఆగాలో):
    if n <= 1:
        return 1
    # Recursive Step (తనని తానే పిలవడం):
    return n * factorial(n - 1)

# 2. ఫైబొనాసి సిరీస్ (ముందు రెండు నెంబర్స్ కలపడం):
def fibonacci(n):
    if n <= 0: return 0
    if n == 1: return 1
    return fibonacci(n - 1) + fibonacci(n - 2)

print("Factorial of 5 (5!):", factorial(5)) # 120
print("Fibonacci #7:", fibonacci(7))         # 13`,
        codeTitle: 'Example 2: Recursive Factorial and Fibonacci Algorithms',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 మెమరీ క్రాష్:</strong>
          <p style="margin-top:6px;">ఒకవేళ మీరు ఆగిపోయే Base Case సరిగ్గా రాయకపోతే పైథాన్ 1000 సార్లు తనని తాను పిలుచుకుని <code>RecursionError</code> తో క్రాష్ అయిపోతుంది.</p>
        </div>`
      },
      {
        title: '3. కొత్త పైథాన్ టైప్ హింట్స్ (Type Hints)',
        body: `<p>పైథాన్ 3.5 లో <strong>Type Hints</strong> ని తీసుకొచ్చారు. మనం ఫంక్షన్ కి ఎలాంటి వేరియబుల్ పంపుతున్నాం (int ఆ? string ఆ?) అని పక్కన రాసిపెట్టొచ్చు. దీనివల్ల VS Code లాంటి ఎడిటర్స్ లో తప్పులు ముందే తెలిసిపోతాయి:</p>`,
        code: `from typing import List, Tuple, Optional

# ఇక్కడ scores అనేది floats ఉన్న List అని, రిటర్న్ చేసేది Tuple అని చెప్పాం
def calculate_student_gpa(
    scores: List[float], 
    student_id: int, 
    extra_credit: Optional[float] = None
) -> Tuple[float, str]:
    """GPA ని లెక్కగట్టి రిజల్ట్ ని ట్యూపుల్ గా ఇస్తుంది."""
    total = sum(scores) + (extra_credit or 0.0)
    gpa = total / len(scores)
    status = "Pass" if gpa >= 50.0 else "Fail"
    return round(gpa, 2), status

gpa, status = calculate_student_gpa([85.0, 92.5, 78.0], 101, extra_credit=5.0)
print(f"Student GPA: {gpa} | Status: {status}")`,
        codeTitle: 'Example 3: Modern PEP 484 Type Hints',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Type Hints వల్ల లాభం:</strong>
          <p style="margin-top:6px;">ఇది తప్పనిసరి కాదు, కానీ కోడ్ చదివేవాళ్ళకు చాలా క్లారిటీగా అర్థమవుతుంది. <code>-></code> వాడితే ఆ ఫంక్షన్ ఏమి ఇస్తుందో ముందే తెలుస్తుంది.</p>
        </div>`
      },
      {
        title: '4. Practical Project 4: Secure Password Generator',
        body: `<p>క్యాపిటల్ లెటర్స్, స్మాల్ లెటర్స్, నెంబర్స్, మరియు స్పెషల్ క్యారెక్టర్స్ కలిపి ఎవరూ కనిపెట్టలేని ఒక సెక్యూర్ పాస్వర్డ్ జనరేట్ చేసే ప్రాజెక్ట్:</p>`,
        code: `import random
import string

def generate_secure_password(
    length: int = 12, 
    include_uppercase: bool = True, 
    include_digits: bool = True, 
    include_special: bool = True
) -> str:
    """రూల్స్ బట్టి సేఫ్ అయిన పాస్వర్డ్ ని తయారుచేస్తుంది."""
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
        
    # మిగతా క్యాలిక్యులేషన్స్ కోసం పూల్ లోని వాటితో రాండమ్ గా నింపుదాం:
    for _ in range(length - len(password_chars)):
        password_chars.append(random.choice(char_pool))
        
    # ఆర్డర్ తెలిసిపోకుండా మొత్తం షఫుల్ (shuffle) చేసేద్దాం:
    random.shuffle(password_chars)
    return "".join(password_chars)

# వేర్వేరు రకాల పాస్వర్డ్స్ టెస్ట్ చేద్దాం:
print("🔑 12-char Standard Password:", generate_secure_password(12))
print("🔑 16-char Ultra-Secure:     ", generate_secure_password(16))
print("🔑 8-char Digits-Only Pin:   ", generate_secure_password(8, include_uppercase=False, include_special=False))`,
        codeTitle: 'Example 4: Secure Password Generator Project',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 సెక్యూరిటీ బెస్ట్ ప్రాక్టీస్:</strong>
          <p style="margin-top:6px;">అడిగిన ప్రతి రకానికీ కనీసం ఒక్క అక్షరం తీసుకుని, తర్వాత మిగతా రాండమ్ వాటితో కలిపి చివరికి <code>random.shuffle()</code> తో ఆర్డర్ మార్చేసాం.</p>
        </div>`
      }
    ],
    mistake: {
      title: 'రికర్షన్ లో Base Case మర్చిపోవడం',
      text: 'మీరు ఎప్పుడు ఆగాలో కండిషన్ రాయకపోతే పైథాన్ 1000 సార్లు ఎక్జిక్యూట్ చేసి (RecursionError) మొత్తం క్రాష్ అయిపోతుంది.'
    },
    tryIt: {
      desc: 'ఒక lambda ఫంక్షన్ వాడి కింద ఉన్న ఊర్ల లిస్ట్ ని వాటి టెంపరేచర్ (రెండవ ఐటెం) బట్టి వేడి నుంచి చలికి (descending) సార్ట్ చేయండి.',
      code: `weather_data = [("Hyderabad", 34), ("Bengaluru", 24), ("Delhi", 40), ("Shimla", 16)]

sorted_cities = sorted(weather_data, key=lambda item: item[1], reverse=True)

print("Hottest to Coldest Cities:")
for city, temp in sorted_cities:
    print(f"• {city:10}: {temp}°C")`
    },
    faqs: [
      {
        q: 'నేను def వాడాలా? lambda వాడాలా?',
        a: 'ఒకే లైన్ లో పని అయిపోతుంది, దాన్ని మళ్ళీ ఎక్కడా వాడుకోము అనుకున్నప్పుడు lambda వాడాలి. లాజిక్ పెద్దగా ఉంటే ఎప్పుడూ def వాడాలి.'
      },
      {
        q: 'Type hints వాడితే వేరే డేటా పంపినప్పుడు కోడ్ ఆగిపోతుందా?',
        a: 'ఆగదు! పైథాన్ లో టైప్ హింట్స్ కేవలం ఎడిటర్స్ లో మనకు అర్థం కావడానికి, ఎర్రర్స్ చూపించడానికి మాత్రమే. కోడ్ రన్ అయ్యేటప్పుడు అవి ఏం ఆపవు.'
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
    title: 'Python Menu-Driven Applications (తెలుగులో)',
    badge: '19. Menu-Driven Apps',
    subtopics: 'CLI Menu Loops · Function Dispatch Tables · State Management · Banking System Project · Capstone Architecture',
    desc: 'యూజర్ ని అడిగి పని చేయించుకునే (Interactive) కన్సోల్ అప్లికేషన్స్ ఎలా తయారు చేయాలో చూద్దాం: Menu loops, function dispatchers, మరియు ఒక పూర్తి బ్యాంకింగ్ అప్లికేషన్ ప్రాజెక్ట్.',
    sections: [
      {
        title: '1. Menu-Driven Architecture అంటే ఏంటి?',
        body: `<p><strong>Menu-Driven Application</strong> అంటే మనం యూజర్ కి ఆప్షన్స్ చూపించి (1 నొక్కితే ఇది, 2 నొక్కితే అది), వాడు నంబర్ ఇవ్వగానే ఆ పని చేసి, మళ్ళీ ఆప్షన్స్ చూపిస్తూ వాడు Exit అయ్యేదాకా రన్ అయ్యే ప్రోగ్రామ్.</p>
        <div class="diagram-box">┌────────────────────────────────────────────────────────┐
│  1. మెనూ ఆప్షన్స్ ని డిస్ప్లే చేయాలి                    │
│  2. యూజర్ ఇచ్చే నెంబర్ చదివి చెక్ చేయాలి               │
│  3. ఆ నెంబర్ కు సంబంధించిన ఫంక్షన్ ని రన్ చేయాలి       │
│  4. మళ్ళీ మెనూ చూపించాలి (ఎగ్జిట్ అయ్యేవరకు)           │
└────────────────────────────────────────────────────────┘</div>`,
        code: `# సింపుల్ మెనూ లూప్ బ్లూప్రింట్:
def show_menu():
    print("\\n--- 📱 Quick Actions Menu ---")
    print("1. View Profile")
    print("2. Update Settings")
    print("3. Exit")

def app_controller():
    # ఇక్కడ కన్సోల్ (CLI) ఇన్పుట్ బదులు మనం డెమో కోసం లిస్ట్ వాడాం:
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
          <strong style="color:#10b981;">🔍 కంట్రోల్ ఫ్లో:</strong>
          <p style="margin-top:6px;">లూప్ పదే పదే మెనూ చూపిస్తూ ఉంటుంది. బ్రేక్ (Exit) కండిషన్ రన్ అయినప్పుడు మాత్రమే కోడ్ ఆగిపోయి బయటికి వస్తుంది.</p>
        </div>`
      },
      {
        title: '2. 100 if-else లకి బదులు: Dictionary Function Dispatchers',
        body: `<p>సాధారణంగా ఆప్షన్స్ పెరిగే కొద్దీ <code>if-elif-elif-else</code> లతో పెద్ద నిచ్చెన కడితే కోడ్ అంతా చెత్తగా తయారవుతుంది. ప్రొఫెషనల్ పైథాన్ డెవలపర్స్ ఇలా <strong>Dictionary Dispatch Tables</strong> వాడి క్షణంలో ఫంక్షన్ కి రౌట్ (route) చేస్తారు:</p>`,
        code: `# మనకు కావాల్సిన ఫంక్షన్స్:
def handle_view(): return "📋 Showing all database records..."
def handle_create(): return "➕ Creating new database record..."
def handle_delete(): return "🗑️ Deleting specified record..."
def handle_exit(): return "👋 Application closed."

# ఈ డిక్షనరీ లో కీ కి ఫంక్షన్ ని లింక్ చేస్తాం:
COMMANDS_DISPATCH = {
    "1": handle_view,
    "2": handle_create,
    "3": handle_delete,
    "4": handle_exit
}

def execute_command(user_choice):
    action = COMMANDS_DISPATCH.get(user_choice)
    if action:
        return action() # ఇక్కడ () పెట్టి ఫంక్షన్ ని పిలుస్తున్నాం!
    return "❌ Invalid selection! Please enter a valid number."

# టెస్ట్ చేద్దాం:
for choice in ["1", "2", "3", "99", "4"]:
    print(f"Command '{choice}' -> {execute_command(choice)}")`,
        codeTitle: 'Example 2: Dictionary Function Dispatch Tables',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 క్లీన్ కోడ్ పవర్:</strong>
          <p style="margin-top:6px;">రేపు మీరు 10 కొత్త ఫీచర్లు యాడ్ చేసినా పెద్ద if-else లు ఏమీ మారవు. జస్ట్ ఫంక్షన్ రాసి ఈ డిక్షనరీ లో కలుపుకోవడమే!</p>
        </div>`
      },
      {
        title: '3. Capstone Project: స్టూడెంట్ / బ్యాంకింగ్ సిస్టం',
        body: `<p>బ్యాంకింగ్ యాప్ ఎలా ఉంటుందో తెలుసుకోవడానికి అకౌంట్ బ్యాలెన్స్ చూడటం, డబ్బులు డిపాజిట్, విత్డ్రా చేయడం మరియు ట్రాన్సాక్షన్ హిస్టరీ అన్నీ చూసుకునే ఒక ప్రాజెక్ట్:</p>`,
        code: `# =========================================================================
# CAPSTONE PROJECT: MODULAR BANKING & ACCOUNT MANAGEMENT
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

# బ్యాంకింగ్ సిమ్యులేషన్ చూద్దాం:
print("--- 🏦 Online Banking Simulation ---")
print(check_balance("ACC101"))
print(deposit_funds("ACC101", 1500.0))
print(withdraw_funds("ACC101", 2000.0))
print(withdraw_funds("ACC101", 10000.0)) # డబ్బులు లేవని చెప్తుంది
print("\\nFinal State ACC101:", accounts_database["ACC101"])`,
        codeTitle: 'Example 3: Comprehensive Banking Management System Project',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 సాఫ్ట్వేర్ ఇంజనీరింగ్ సూత్రాలు:</strong>
          <ul style="margin:8px 0 0 18px; line-height:1.7;">
            <li><strong>Single Responsibility:</strong> ప్రతి ఫంక్షన్ ఒకే పని చేస్తుంది (డిపాజిట్ కి ఒక ఫంక్షన్, విత్డ్రా కి ఒక ఫంక్షన్).</li>
            <li><strong>Defensive Validation:</strong> ముందే అకౌంట్ ఉందా లేదా? వాడిదగ్గర డబ్బులున్నాయా అని చెక్ చేసి సేఫ్ గా ఉంచుతుంది.</li>
          </ul>
        </div>`
      }
    ],
    mistake: {
      title: 'డిక్షనరీ లోపలే ఫంక్షన్ ని రన్ చేసేయడం (తప్పు)',
      text: 'డిక్షనరీ లో "1": my_func అని రాసి పేరు మాత్రమే ఇవ్వాలి. ఒకవేళ "1": my_func() అని బ్రాకెట్స్ పెడితే, మీరు బటన్ నొక్కకముందే అప్లికేషన్ స్టార్ట్ అవ్వగానే అవన్నీ రన్ అయిపోతాయి!'
    },
    tryIt: {
      desc: 'ఒక మినీ ఇన్వెంటరీ (స్టాక్) మేనేజ్మెంట్ తయారుచేసి, స్టాక్ యాడ్ చేయడం, సెల్ చేయడం ట్రై చేయండి.',
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
        q: 'Function Dispatch Table అంటే ఏంటి?',
        a: 'యూజర్ 1 ఇస్తే ఈ ఫంక్షన్ రన్ అవ్వాలి, 2 ఇస్తే ఇంకో ఫంక్షన్ రన్ అవ్వాలి అని ఒక డిక్షనరీ లో మ్యాపింగ్ చేయడాన్నే డిస్పాచ్ టేబుల్ అంటారు. ఇది if-else లకంటే చాలా ఫాస్ట్.'
      },
      {
        q: 'ప్రోగ్రామ్ ని క్లోజ్ చేసి ఓపెన్ చేస్తే నా డేటా ఎందుకు మాయం అవుతుంది?',
        a: 'మనం క్రియేట్ చేసే వేరియబుల్స్ అన్నీ RAM లో సేవ్ అవుతాయి కాబట్టి ప్రోగ్రామ్ క్లోజ్ చేస్తే పోతాయి. అవి అలానే ఉండాలంటే మనం దాన్ని json మాడ్యూల్ లేదా sqlite డేటాబేస్ వాడి ఫైల్స్ లో సేవ్ చేయాలి.'
      }
    ]
  }
];
