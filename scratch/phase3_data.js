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
    title: 'Python Strings Mastery (తెలుగులో)',
    badge: '10. Strings Mastery',
    subtopics: 'Quotes · Indexing · Slicing · Escape Characters · String Methods · F-Strings · Palindrome',
    desc: 'Python లో స్ట్రింగ్స్ తో ఆడుకోవడం ఎలా? సింగిల్/డబుల్ కోట్స్, ఎస్కేప్ క్యారెక్టర్స్, ఇండెక్సింగ్, స్లైసింగ్, స్ట్రింగ్ మెథడ్స్, F-Strings మరియు పాలిండ్రోమ్ లాజిక్ గురించి నేర్చుకుందాం.',
    sections: [
      {
        title: '1. స్ట్రింగ్స్ ని క్రియేట్ చేయడం, Quotes & Escape Characters',
        body: `<p>Python లో <strong>string (<code>str</code>)</strong> అంటే అక్షరాల సముదాయం (sequence). ఇది <strong>immutable</strong>, అంటే ఒకసారి క్రియేట్ చేసాక దాన్ని మార్చలేము. Python 3 లో అన్నీ UTF-8 ఎన్కోడింగ్ లో ఉంటాయి కాబట్టి ఎమోజీలు (emojis) కూడా వాడుకోవచ్చు.</p>
        <h4 style="color:#10b981; margin:16px 0 8px;">స్ట్రింగ్స్ రాయడానికి రకాలు:</h4>
        <ul>
          <li><strong>సింగిల్ కోట్స్ (<code>'...'</code>):</strong> లోపల డబుల్ కోట్స్ ఉన్నప్పుడు దీన్ని వాడాలి (ఉదా: <code>'She said "Hello"'</code>).</li>
          <li><strong>డబుల్ కోట్స్ (<code>"..."</code>):</strong> లోపల సింగిల్ కోట్ ఉన్నప్పుడు వాడాలి (ఉదా: <code>"It's a sunny day"</code>).</li>
          <li><strong>ట్రిపుల్ కోట్స్ (<code>"""..."""</code> లేదా <code>'''...'''</code>):</strong> ఒకే స్ట్రింగ్ ని మల్టిపుల్ లైన్స్ లో రాయాలంటే ఇది వాడాలి.</li>
          <li><strong>Raw Strings (<code>r"..."</code>):</strong> ముందు <code>r</code> పెడితే లోపల ఉన్న స్పెషల్ క్యారెక్టర్స్ నార్మల్ టెక్స్ట్ లాగా మారిపోతాయి (ఫైల్ పాత్స్ కి వాడతారు).</li>
        </ul>
        <p><strong>Escape Characters:</strong> స్ట్రింగ్ మధ్యలో కొత్త లైన్ కావాలన్నా లేదా స్పెషల్ క్యారెక్టర్స్ ని ప్రింట్ చేయాలన్నా <code>\\</code> ని వాడతాం:</p>
        <table class="tbl" style="margin-top:8px; font-size:12.5px;">
          <tr><th>Escape Code</th><th>Meaning (అర్థం)</th><th>Example</th></tr>
          <tr><td><code>\\n</code></td><td>కొత్త లైన్ (Newline)</td><td><code>"Line 1\\nLine 2"</code></td></tr>
          <tr><td><code>\\t</code></td><td>టాబ్ స్పేస్ (Tab space)</td><td><code>"Col 1\\tCol 2"</code></td></tr>
          <tr><td><code>\\'</code></td><td>సింగిల్ కోట్ ప్రింట్ అవ్వడానికి</td><td><code>'It\\'s Python'</code></td></tr>
          <tr><td><code>\\"</code></td><td>డబుల్ కోట్ ప్రింట్ అవ్వడానికి</td><td><code>"She said \\"Hi\\""</code></td></tr>
        </table>`,
        code: `# 1. సింగిల్, డబుల్, మరియు ట్రిపుల్ కోట్స్ వాడటం
msg1 = 'Hello with single quotes'
msg2 = "Hello with double quotes (It's easy!)"
msg3 = """This is a
multi-line string
preserving newlines!"""

# 2. Escape characters ని వాడటం
escaped_text = "Name:\\tBalaji\\nRole:\\tPython Backend Engineer\\nQuote:\\t\\"Keep Building!\\""

print(msg1)
print(msg2)
print("\\n--- Escape Characters Demo ---")
print(escaped_text)`,
        codeTitle: 'Example 1: String Creation and Escape Sequences',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 కోడ్ బ్రేక్ డౌన్:</strong>
          <ul style="margin:8px 0 0 18px; line-height:1.7;">
            <li><code>\\t</code> వాడటం వల్ల Name కి, వాల్యూ కి మధ్యలో ఒక టాబ్ స్పేస్ వచ్చింది.</li>
            <li><code>\\n</code> వల్ల కింది లైన్ కి జంప్ అయింది.</li>
            <li><code>\\"</code> వాడటం వల్ల డబుల్ కోట్స్ లోపల ఇంకో డబుల్ కోట్స్ ఎర్రర్ లేకుండా ప్రింట్ అయ్యాయి.</li>
          </ul>
        </div>`
      },
      {
        title: '2. String Indexing & Slicing ([start:stop:step])',
        body: `<p>స్ట్రింగ్ లోని ప్రతి అక్షరానికి ఒక నెంబర్ (ఇండెక్స్) ఉంటుంది. పైథాన్ లో రెండు రకాల ఇండెక్సింగ్ ఉంటుంది:</p>
        <div class="diagram-box">Positive Indices:   0   1   2   3   4   5
String Characters:  P   y   t   h   o   n
Negative Indices:  -6  -5  -4  -3  -2  -1</div>
        <p><strong>Slicing ఫార్ములా:</strong> <code>string[start : stop : step]</code></p>
        <ul>
          <li><code>start</code>: ఎక్కడినుంచి మొదలవ్వాలి (inclusive).</li>
          <li><code>stop</code>: ఎక్కడికి ఎండ్ అవ్వాలి (కానీ ఒక అక్షరం ముందుకే ఆగిపోతుంది!).</li>
          <li><code>step</code>: ఎన్ని అడుగులు వేయాలి (<code>-1</code> ఇస్తే వెనక్కి వస్తుంది).</li>
        </ul>`,
        code: `text = "Python Programming"

# 1. Indexing (ఒక్కో అక్షరం)
print("First character [0]:", text[0])    # P
print("Last character [-1]:", text[-1])   # g

# 2. Slicing (కొంత భాగం కట్ చేయడం)
print("First 6 chars [0:6]:", text[0:6])  # Python
print("From index 7 to end [7:]:", text[7:]) # Programming
print("Every 2nd character [::2]:", text[::2]) # Pto rgamn

# 3. String ని రివర్స్ చేయడం (step=-1)
print("Reversed string [::-1]:", text[::-1])`,
        codeTitle: 'Example 2: Indexing, Slicing and Reversing Strings',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 కాన్సెప్ట్ గుర్తుంచుకోండి:</strong>
          <p style="margin-top:6px;">పైథాన్ లో స్ట్రింగ్స్ ని డైరెక్ట్ గా మార్చలేము (<strong>IMMUTABLE</strong>). స్లైసింగ్ చేసినప్పుడు అది ఒరిజినల్ దాన్ని మార్చదు, కొత్త స్ట్రింగ్ ని ఇస్తుంది.</p>
        </div>`
      },
      {
        title: '3. ముఖ్యమైన String Methods (Case, Strip, Replace)',
        body: `<p>టెక్స్ట్ ని క్లీన్ చేయడానికి పైథాన్ లో కొన్ని బెస్ట్ built-in మెథడ్స్ ఉన్నాయి:</p>
        <ul>
          <li><code>len(s)</code>: స్ట్రింగ్ పొడవు ఎంత ఉందో కౌంట్ చేస్తుంది.</li>
          <li><code>s.upper()</code> / <code>s.lower()</code>: మొత్తం పెద్ద అక్షరాలు (Caps) లేదా చిన్న అక్షరాలుగా మారుస్తుంది.</li>
          <li><code>s.title()</code> / <code>s.capitalize()</code>: ఫస్ట్ లెటర్ ని మాత్రమే క్యాపిటల్ చేస్తుంది.</li>
          <li><code>s.strip()</code>: టెక్స్ట్ కి ముందు, వెనక ఉన్న పనికిరాని స్పేసెస్ ని తీసేస్తుంది.</li>
          <li><code>s.replace(old, new)</code>: పాత పదం స్థానంలో కొత్త పదాన్ని పెడుతుంది.</li>
        </ul>`,
        code: `raw_input = "   learn python programming today   "

# 1. Length
print("Original Length:", len(raw_input))

# 2. స్పేసెస్ ని strip చేయండి
cleaned = raw_input.strip()
print("Cleaned text:", repr(cleaned))
print("Cleaned Length:", len(cleaned))

# 3. Case మార్చడం
print("Uppercase:", cleaned.upper())
print("Title Case:", cleaned.title())

# 4. ఒక పదాన్ని Replace చేయడం
updated = cleaned.replace("python", "FastAPI & Python")
print("Replaced text:", updated)`,
        codeTitle: 'Example 3: String Cleaning and Transformation Methods',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 రియల్ వరల్డ్ యూజ్:</strong>
          <p style="margin-top:6px;">యూజర్ ఈమెయిల్ పాస్వర్డ్ ఎంటర్ చేసినప్పుడు ఎప్పుడూ <code>.strip().lower()</code> వాడితే ఎర్రర్స్ రాకుండా సేఫ్ గా ఉంటుంది.</p>
        </div>`
      },
      {
        title: '4. టెక్స్ట్ లో వెతకడం (find, count, startswith, endswith)',
        body: `<p>ఒక స్ట్రింగ్ లో మనం వెతుకుతున్న పదం ఉందా లేదా తెలుసుకోవడానికి:</p>
        <ul>
          <li><code>s.find(sub)</code>: ఆ పదం ఉంటే ఇండెక్స్ నెంబర్ ఇస్తుంది (లేకపోతే <code>-1</code> ఇస్తుంది).</li>
          <li><code>s.count(sub)</code>: ఆ పదం ఎన్నిసార్లు వచ్చిందో కౌంట్ చేస్తుంది.</li>
          <li><code>s.startswith(prefix)</code>: ఫలానా పదంతో స్టార్ట్ అయిందా అని చెక్ చేసి True/False ఇస్తుంది.</li>
          <li><code>s.endswith(suffix)</code>: ఫలానా పదంతో ఎండ్ అయిందా అని చెక్ చేస్తుంది.</li>
        </ul>`,
        code: `filename = "data_report_2026.pdf"

# 1. స్ట్రింగ్ చివర చెక్ చేద్దాం
print("Is PDF file?", filename.endswith(".pdf"))         # True
print("Is data file?", filename.startswith("data_"))     # True

# 2. ఏ పొజిషన్ లో ఉందో వెతుకుదాం
pos = filename.find("report")
print("Position of 'report': index", pos)                # index 5

# 3. ఎన్ని సార్లు వచ్చిందో కౌంట్ చేద్దాం
text_sample = "banana"
print("Count of letter 'a' in 'banana':", text_sample.count("a")) # 3`,
        codeTitle: 'Example 4: String Searching and Validation',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Pro Tip (find vs index):</strong>
          <p style="margin-top:6px;">పదం దొరకకపోతే <code>.find()</code> అనేది <code>-1</code> ఇస్తుంది, కానీ <code>.index()</code> వాడితే కోడ్ క్రాష్ (ValueError) అవుతుంది. కాబట్టి <code>find()</code> వాడటమే సేఫ్.</p>
        </div>`
      },
      {
        title: '5. Splitting, Joining & Modern F-Strings',
        body: `<p>ఒక స్ట్రింగ్ ని ముక్కలు చేయాలన్నా లేదా ముక్కల్ని కలపాలన్నా ఈ మెథడ్స్ వాడతాం:</p>
        <ul>
          <li><code>s.split(delimiter)</code>: కామా లేదా స్పేస్ బేస్ చేసుకుని టెక్స్ట్ ని లిస్ట్ గా ముక్కలు చేస్తుంది.</li>
          <li><code>delimiter.join(list)</code>: లిస్ట్ లో ఉన్న ఐటమ్స్ ని కలిపి మళ్లీ ఒకే స్ట్రింగ్ గా చేస్తుంది.</li>
          <li><strong>F-Strings (<code>f"..."</code>):</strong> వేరియబుల్స్ ని నేరుగా స్ట్రింగ్ మధ్యలో ఇరికించడానికి బెస్ట్ సింటాక్స్.</li>
        </ul>`,
        code: `# 1. కామా ఉన్న చోట ముక్కలు (split) చేద్దాం
csv_line = "Apple,Banana,Mango,Orange"
fruits_list = csv_line.split(",")
print("Splitted List:", fruits_list)

# 2. మళ్లీ వాటిని " | " తో కలుపుదాం (join)
joined_str = " | ".join(fruits_list)
print("Joined String:", joined_str)

# 3. F-string వాడి ఫార్మాట్ చేద్దాం
user = "Balaji"
score = 98.75
message = f"Student {user} scored {score:.1f}% on the Python Exam!"
print("F-String Message:", message)`,
        codeTitle: 'Example 5: split(), join(), and F-String Formatting',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 ".join()" ఎందుకు డిఫరెంట్?:</strong>
          <p style="margin-top:6px;">పైథాన్ లో <code>my_list.join(", ")</code> అని కాకుండా <code>", ".join(my_list)</code> అని రాస్తారు. ఎందుకంటే <code>join</code> అనేది లిస్ట్ మెథడ్ కాదు, స్ట్రింగ్ మెథడ్!</p>
        </div>`
      },
      {
        title: '6. Real-World లాజిక్: Palindrome Checker',
        body: `<p><strong>Palindrome</strong> అంటే ఒక పదాన్ని ముందు నుంచి చదివినా, వెనక నుంచి చదివినా ఒకేలా ఉండటం (ఉదా: <em>"radar"</em>, <em>"madam"</em>).</p>
        <p>పైథాన్ లో స్ట్రింగ్ స్లైసింగ్ వల్ల పాలిండ్రోమ్ లాజిక్ రాయడం చాలా ఈజీ:</p>`,
        code: `def is_palindrome(word):
    # Step 1: స్పేసెస్ తీసేసి స్మాల్ లెటర్స్ లోకి మార్చాలి
    cleaned = word.strip().lower()
    
    # Step 2: ఒరిజినల్ పదం, దాని రివర్స్ [::-1] ఒకేలా ఉన్నాయా?
    return cleaned == cleaned[::-1]

# కొన్ని పదాలతో టెస్ట్ చేద్దాం:
test_words = ["Radar", "Python", "madam", "Racecar", "Compiler"]

for w in test_words:
    result = "✅ Palindrome" if is_palindrome(w) else "❌ Not Palindrome"
    print(f"{w:10} -> {result}")`,
        codeTitle: 'Example 6: Reusable Palindrome Checker Function',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 లాజిక్ ఎలా పనిచేస్తుంది:</strong>
          <ul style="margin:8px 0 0 18px; line-height:1.7;">
            <li><code>Radar</code> అనేది స్మాల్ లెటర్స్ తో <code>radar</code> అయింది.</li>
            <li>దాన్ని <code>radar[::-1]</code> తో రివర్స్ చేస్తే మళ్లీ <code>radar</code> వచ్చింది.</li>
            <li>అందుకే అది పాలిండ్రోమ్ (<code>True</code>) అని తేలింది!</li>
          </ul>
        </div>`
      }
    ],
    mistake: {
      title: 'స్ట్రింగ్ మధ్యలో అక్షరాన్ని మార్చడానికి ట్రై చేయడం',
      text: 'word[0] = "H" అని రాస్తే పైథాన్ TypeError ఇస్తుంది. ఎందుకంటే స్ట్రింగ్స్ immutable (మారనివి). ఒకవేళ మార్చాలంటే కొత్త స్ట్రింగ్ క్రియేట్ చేయాలి: word = "H" + word[1:].'
    },
    tryIt: {
      desc: 'ఒక పేరు తీసుకుని దాన్ని uppercase చేసి, అందులో అచ్చులు (a, e, i, o, u) ఎన్నున్నాయో కౌంట్ చేయండి.',
      code: `text = "racecar"

print("Original:", text)
print("Uppercase:", text.upper())
print("Reversed:", text[::-1])
print("Is Palindrome:", text == text[::-1])`
    },
    faqs: [
      {
        q: 'Python లో స్ట్రింగ్స్ ని ఎందుకు మార్చలేము (Immutable)?',
        a: 'మార్చకుండా ఉండటం వల్లే మెమరీలో ఒకటే పదాన్ని మల్టిపుల్ వేరియబుల్స్ కి ఫాస్ట్ గా ఇవ్వగలుగుతాము, మరియు సెక్యూరిటీ పరంగా సేఫ్.'
      },
      {
        q: 'F-strings లో క్యాలిక్యులేషన్స్ చేయొచ్చా?',
        a: 'కచ్చితంగా! F-string బ్రాకెట్స్ { } మధ్యలో మీరు మ్యాథ్స్ (f"{2+2}"), ఫంక్షన్స్ కాల్ చేయడం అన్నీ చేయొచ్చు.'
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
    title: 'Python Lists & Comprehensions (తెలుగులో)',
    badge: '11. Lists & Comprehensions',
    subtopics: 'Creation · Indexing · CRUD · Sorting · Copying (Shallow vs Deep) · Nested Lists · List Comprehensions',
    desc: 'Python లో Lists ఎలా పనిచేస్తాయి? అందులో డేటా యాడ్ చేయడం, డిలీట్ చేయడం, సార్ట్ (sort) చేయడం, షాలో vs డీప్ కాపీ, మరియు సింగిల్ లైన్ List Comprehensions గురించి తెలుసుకుందాం.',
    sections: [
      {
        title: '1. List అంటే ఏంటి? (Dynamic Array Architecture)',
        body: `<p>Python లో <strong>list (<code>list</code>)</strong> అంటే స్క్వేర్ బ్రాకెట్స్ (<code>[...]</code>) లోపల పెట్టుకునే ఒక <strong>ఆర్డర్ ఉన్న, మార్చగలిగే (mutable), అన్ని రకాల డేటాని కలిపి ఉంచుకోగల కలెక్షన్</strong>.</p>
        <ul>
          <li><strong>Ordered:</strong> మనం ఏ ఆర్డర్ లో యాడ్ చేసామో అదే ఆర్డర్ లో సేవ్ అవుతాయి.</li>
          <li><strong>Mutable:</strong> కొత్త లిస్ట్ క్రియేట్ చేయకుండానే, ఉన్న లిస్ట్ లోకే యాడ్ చేయడం, డిలీట్ చేయడం చేయొచ్చు.</li>
          <li><strong>Heterogeneous:</strong> ఒకే లిస్ట్ లో నెంబర్స్, స్ట్రింగ్స్, బూలియన్స్ లాంటివి ఏవైనా కలిపి పెట్టుకోవచ్చు.</li>
        </ul>`,
        code: `# 1. ఒక ఖాళీ లిస్ట్ మరియు కొన్ని డేటా ఉన్న లిస్ట్స్
empty_list = []
numbers = [10, 20, 30, 40, 50]
mixed_list = ["Balaji", 25, 99.5, True, ["Python", "JS"]]

# 2. లిస్ట్ ని, దాని పొడవు (లెంత్) ని చూద్దాం
print("Numbers list:", numbers)
print("Total elements:", len(numbers))
print("Mixed list:", mixed_list)`,
        codeTitle: 'Example 1: Creating Lists with Mixed Data Types',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 లోపల ఏం జరుగుతుంది? (CPython):</strong>
          <p style="margin-top:6px;">CPython లో లిస్ట్ అనేది ఒక <strong>డైనమిక్ అర్రే (Dynamic Array)</strong>. లిస్ట్ లో ప్లేస్ అయిపోతే, దానంతట అదే ఆటోమాటిక్ గా ఇంకొంచెం పెద్ద సైజు ఉన్న మెమరీని తీసుకుని పాత డేటాని అందులోకి షిఫ్ట్ చేస్తుంది.</p>
        </div>`
      },
      {
        title: '2. లిస్ట్ లోకి డేటా యాడ్ చేయడం: append(), insert(), extend()',
        body: `<p>ఒక లిస్ట్ లోకి కొత్త ఐటమ్స్ యాడ్ చేయడానికి మనకు 3 పద్ధతులు ఉన్నాయి:</p>
        <ul>
          <li><code>list.append(x)</code>: లిస్ట్ కి చిట్టచివర్లో యాడ్ చేస్తుంది (చాలా ఫాస్ట్).</li>
          <li><code>list.insert(index, x)</code>: మనకు కావాల్సిన పొజిషన్ లో యాడ్ చేస్తుంది, మిగతా వాటిని పక్కకి జరుపుతుంది.</li>
          <li><code>list.extend(iterable)</code>: ఇంకొక లిస్ట్ లోని ఐటమ్స్ అన్నిటినీ విడగొట్టి చివర్లో కలుపుతుంది.</li>
        </ul>`,
        code: `fruits = ["Apple", "Banana"]
print("Initial list:", fruits)

# 1. append() - చివర్లో యాడ్ చేయడం
fruits.append("Mango")
print("After append('Mango'):", fruits)

# 2. insert() - 1వ ఇండెక్స్ లో యాడ్ చేయడం
fruits.insert(1, "Orange")
print("After insert(1, 'Orange'):", fruits)

# 3. extend() - వేరే లిస్ట్ ని కలపడం
more_fruits = ["Grapes", "Pineapple"]
fruits.extend(more_fruits)
print("After extend():", fruits)`,
        codeTitle: 'Example 2: Adding Elements with append, insert, extend',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 append() vs extend() Trap:</strong>
          <p style="margin-top:6px;">ఒకవేళ మీరు <code>fruits.append(["Grapes", "Pineapple"])</code> అని రాస్తే, ఆ లిస్ట్ మొత్తం ఒకే ఐటెం లాగా లిస్ట్ లోపల లిస్ట్ గా పడిపోతుంది! విడివిడిగా కలవాలంటే <code>extend()</code> వాడాలి.</p>
        </div>`
      },
      {
        title: '3. అప్డేట్ మరియు డిలీట్ చేయడం: pop(), remove(), del, clear()',
        body: `<p>లిస్ట్ లోని డేటాని తీసేయడానికి ఈ మెథడ్స్ వాడతారు:</p>
        <ul>
          <li><code>list[index] = new_val</code>: ఒక పొజిషన్ లో ఉన్న వాల్యూ ని రీప్లేస్ చేస్తుంది.</li>
          <li><code>list.remove(val)</code>: మనం వెతుకుతున్న వాల్యూ ఎక్కడున్నా (మొదటిది) వెతికి డిలీట్ చేస్తుంది.</li>
          <li><code>list.pop(index)</code>: ఆ ఇండెక్స్ లో ఉన్న దాన్ని డిలీట్ చేయడమే కాకుండా, దాన్ని బయటికి ఇస్తుంది.</li>
          <li><code>del list[index]</code>: డైరెక్ట్ గా మెమరీ లోనుంచే లేపేస్తుంది.</li>
          <li><code>list.clear()</code>: లిస్ట్ మొత్తాన్ని ఖాళీ చేస్తుంది.</li>
        </ul>`,
        code: `tasks = ["Email client", "Write code", "Bug fix", "Deploy app"]
print("Initial tasks:", tasks)

# 1. 0 వ ఇండెక్స్ ని అప్డేట్ చేద్దాం
tasks[0] = "Check Slack messages"
print("After update tasks[0]:", tasks)

# 2. remove() పేరుతో డిలీట్
tasks.remove("Bug fix")
print("After remove('Bug fix'):", tasks)

# 3. pop() చివర్లో ఉన్నదాన్ని పీకేసి మనకు ఇస్తుంది
completed_task = tasks.pop()
print(f"Popped task: '{completed_task}' | Remaining: {tasks}")

# 4. del కీవర్డ్ తో డిలీట్
del tasks[0]
print("After del tasks[0]:", tasks)`,
        codeTitle: 'Example 3: Updating and Removing Elements',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 ఏ డిలీట్ మెథడ్ ఎప్పుడు వాడాలి?</strong>
          <ul style="margin:8px 0 0 18px; line-height:1.7;">
            <li>మీకు <strong>పేరు తెలిస్తే</strong> <code>.remove(val)</code> వాడండి.</li>
            <li>మీకు <strong>నెంబర్ తెలిసి</strong> ఆ డిలీట్ అయిన వాల్యూ కూడా కావాలంటే <code>.pop(i)</code> వాడండి.</li>
            <li>ఒక రేంజ్ మొత్తాన్ని లేపేయాలంటే <code>del list[0:2]</code> వాడండి.</li>
          </ul>
        </div>`
      },
      {
        title: '4. సార్ట్ (Sort) చేయడం: sort() vs sorted()',
        body: `<p>పైథాన్ లో నెంబర్స్ లేదా అక్షరాల్ని ఒక ఆర్డర్ లో పెట్టడానికి రెండు పద్ధతులు ఉన్నాయి (వీటి వెనుక Timsort అల్గారిథం ఉంది):</p>
        <ul>
          <li><code>list.sort()</code>: ఒరిజినల్ లిస్ట్ నే డైరెక్ట్ గా మారుస్తుంది (దీని రిజల్ట్ <code>None</code>).</li>
          <li><code>sorted(iterable)</code>: ఇది ఒరిజినల్ దాన్ని మార్చకుండా, కొత్త సార్ట్ అయిన లిస్ట్ ని ఇస్తుంది!</li>
        </ul>`,
        code: `scores = [45, 99, 12, 78, 63, 85]

# 1. sorted() కొత్త లిస్ట్ ని ఇస్తుంది:
ascending_scores = sorted(scores)
descending_scores = sorted(scores, reverse=True)

print("Original scores list:", scores)
print("New sorted list (ascending):", ascending_scores)
print("New sorted list (descending):", descending_scores)

# 2. .sort() ఒరిజినల్ దాన్నే మార్చేస్తుంది:
scores.sort()
print("\\nOriginal scores after .sort():", scores)`,
        codeTitle: 'Example 4: Sorting In-Place (sort) vs Non-Destructive (sorted)',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 కామన్ బిగినర్ తప్పు:</strong>
          <p style="margin-top:6px;">ఎప్పుడూ <code>scores = scores.sort()</code> అని రాయకండి! ఎందుకంటే <code>.sort()</code> ఏం రిటర్న్ చేయదు (None), అలా రాస్తే మీ లిస్ట్ మొత్తం పోయి None సేవ్ అవుతుంది.</p>
        </div>`
      },
      {
        title: '5. లిస్ట్ ని కాపీ చేయడం: Shallow Copy కాన్సెప్ట్',
        body: `<p><code>list_b = list_a</code> అని రాసినప్పుడు, పైథాన్ లిస్ట్ ని కాపీ చేయదు. రెండు పేర్లకి ఒకే మెమరీ అడ్రస్ ని ఇస్తుంది. అంటే <code>list_b</code> లో డేటా మారిస్తే <code>list_a</code> లో కూడా మారిపోతుంది!</p>
        <p>ఒక నిజమైన విడిగా ఉండే కాపీ కావాలంటే <code>.copy()</code> లేదా <code>[:]</code> వాడాలి:</p>`,
        code: `# ❌ ఇదొక బగ్ (Reference Alias):
original = [1, 2, 3]
alias = original
alias.append(99)
print("Reference Alias Demo:")
print("Original:", original)  # ఇక్కడ కూడా 99 యాడ్ అయిపోయింది!
print("Alias:   ", alias)

# ✅ సేఫ్ అయిన SHALLOW COPY:
source = [10, 20, 30]
cloned = source.copy()  # లేదా source[:] అని రాయొచ్చు
cloned.append(999)

print("\\nIndependent Copy Demo:")
print("Source:", source)  # [10, 20, 30] (ఇది సేఫ్!)
print("Cloned:", cloned)  # [10, 20, 30, 999]`,
        codeTitle: 'Example 5: List Copying and Reference Isolation',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Deep Copy గురించి:</strong>
          <p style="margin-top:6px;">మీ లిస్ట్ లోపల ఇంకో లిస్ట్ ఉంటే (ఉదా: <code>[[1, 2], [3, 4]]</code>), అప్పుడు <code>.copy()</code> పనిచేయదు. <code>import copy; copy.deepcopy(matrix)</code> వాడాలి.</p>
        </div>`
      },
      {
        title: '6. Python List Comprehensions ([expr for x in list if cond])',
        body: `<p><strong>List comprehensions</strong> వాడి పాత లిస్ట్ నుండి కొత్త లిస్ట్ ని ఒకే ఒక లైన్ లో అద్భుతంగా, ఫాస్ట్ గా క్రియేట్ చేయొచ్చు.</p>
        <div class="diagram-box">సింటాక్స్:  [ లాజిక్  for ఐటెం in లిస్ట్  if కండిషన్ ]</div>`,
        code: `# పాత పద్ధతి (5 లైన్స్ ఫర్ లూప్):
squares_traditional = []
for x in range(1, 11):
    if x % 2 == 0:
        squares_traditional.append(x ** 2)

# ✅ కొత్త పద్ధతి (List Comprehension ఒకే లైన్ లో):
squares_comprehension = [x ** 2 for x in range(1, 11) if x % 2 == 0]

print("Traditional Loop Result:", squares_traditional)
print("Comprehension Result:   ", squares_comprehension)

# ఇంకో ఉదాహరణ (పొడవాటి పేర్లను క్యాపిటల్ చేయడం):
names = ["Alex", "Balaji", "Chloe", "David", "Elizabeth"]
long_names = [n.upper() for n in names if len(n) >= 6]
print("Uppercase Long Names (len >= 6):", long_names)`,
        codeTitle: 'Example 6: List Comprehensions Filtering & Transformation',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 పెర్ఫార్మన్స్ లాభం:</strong>
          <p style="margin-top:6px;">List comprehensions వాడటం వల్ల పైథాన్ PVM లో C లాంగ్వేజ్ స్పీడ్ తో ఇవి రన్ అవుతాయి. మాటిమాటికి <code>.append()</code> కాల్ చేయడం తప్పుతుంది.</p>
        </div>`
      }
    ],
    mistake: {
      title: 'లూప్ రన్ అవుతున్న లిస్ట్ లోంచే ఐటమ్స్ డిలీట్ చేయడం',
      text: 'ఎప్పుడూ (for x in lst:) రన్ అవుతున్న లిస్ట్ లోంచి డేటాని (lst.remove(x)) తీయకూడదు. తీస్తే ఇండెక్స్ జరిగిపోయి ఐటమ్స్ స్కిప్ అవుతాయి. డిలీట్ చేయాలంటే దాని కాపీ మీద రన్ చేయాలి: (for x in lst.copy():) లేదా List Comprehension వాడాలి.'
    },
    tryIt: {
      desc: '1 నుంచి 20 వరకు ఉన్న నెంబర్స్ లో బేసి సంఖ్యలను (odd numbers) మాత్రమే తీసుకుని వాడి క్యూబ్స్ (x**3) తో List comprehension ద్వారా కొత్త లిస్ట్ చేయండి.',
      code: `numbers = list(range(1, 21))

# List comprehension: బేసి సంఖ్యల క్యూబ్స్
odd_cubes = [x ** 3 for x in numbers if x % 2 != 0]

print("Numbers 1-20:", numbers)
print("Cubes of Odd Numbers:", odd_cubes)`
    },
    faqs: [
      {
        q: 'append() కి insert(0, x) కి స్పీడ్ తేడా ఉందా?',
        a: 'చాలా ఉంది! append() అనేది O(1) టైమ్ (చాలా ఫాస్ట్). insert(0, x) అంటే ఫస్ట్ పొజిషన్ లోకి నెట్టడం కాబట్టి, మిగతా నెంబర్స్ అన్నీ కుడిపక్కకి జరగాలి (O(N) టైమ్).'
      },
      {
        q: 'ఒకే నెంబర్ లిస్ట్ లో పదిసార్లు ఉంటే అన్నిటినీ తీసేయడం ఎలా?',
        a: 'List comprehension వాడటమే బెస్ట్: cleaned = [x for x in my_list if x != target_val]'
      },
      {
        q: 'లిస్ట్ లోపల లిస్ట్ పెట్టొచ్చా?',
        a: 'కచ్చితంగా! దీన్నే 2D matrices (grid = [[1, 2], [3, 4]]) అంటారు. ఇలా ఎంత లోపలికైనా పెట్టుకుంటూ వెళ్లొచ్చు.'
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
    title: 'Python Tuples & Unpacking (తెలుగులో)',
    badge: '12. Tuples & Unpacking',
    subtopics: 'Creation · Single-Element Trap · Immutability · Unpacking (*rest) · Methods · Tuple vs List Benchmarks',
    desc: 'Python Tuples అంటే ఏంటి? మార్చలేని (immutable) లక్షణాలు, సింగిల్-ఎలిమెంట్ కామా రూల్, star unpacking (*rest), మరియు లిస్ట్ కి ట్యూపుల్ కి ఉన్న స్పీడ్ బెంచ్మార్క్స్.',
    sections: [
      {
        title: '1. Tuple అంటే ఏంటి? The Single-Element Comma Trap',
        body: `<p><strong>Tuple (<code>tuple</code>)</strong> అనేది సాధారణ బ్రాకెట్స్ (<code>(...)</code>) లో ఉండే ఒక <strong>మార్చలేని (immutable) ఆర్డర్డ్ కలెక్షన్</strong>.</p>
        <p><strong>The Single-Element Comma Rule:</strong> బ్రాకెట్స్ ని పైథాన్ లో లెక్కలు (మ్యాథ్స్) చేయడానికి కూడా వాడుతారు. అందుకే <code>(50)</code> అని రాస్తే పైథాన్ దాన్ని నెంబర్ 50 అనుకుంటుంది, ట్యూపుల్ అనుకోదు! ఒకే ఒక ఐటెం ఉన్న ట్యూపుల్ క్రియేట్ చేయాలంటే చివర్లో కామా <strong>కచ్చితంగా పెట్టాలి</strong>: <code>(50,)</code>.</p>`,
        code: `# 1. మామూలు ట్యూపుల్స్
point = (10, 20)
rgb_color = (255, 128, 0)

# 2. సింగిల్-ఎలిమెంట్ ట్రాప్:
not_a_tuple = (50)    # ఇది కేవలం int!
is_a_tuple = (50,)    # ఇది tuple!

print("point:", point, "| Type:", type(point).__name__)
print("not_a_tuple:", not_a_tuple, "| Type:", type(not_a_tuple).__name__)
print("is_a_tuple: ", is_a_tuple, "| Type:", type(is_a_tuple).__name__)`,
        codeTitle: 'Example 1: Creating Tuples and the Single-Element Comma Rule',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 సింటాక్స్ రూల్:</strong>
          <p style="margin-top:6px;">పైథాన్ లో <strong>కామా</strong> నే ట్యూపుల్ ని డిసైడ్ చేస్తుంది, బ్రాకెట్స్ కాదు.</p>
        </div>`
      },
      {
        title: '2. Tuple Immutability & డేటా రక్షణ',
        body: `<p>Tuples <strong>మారనివి (immutable)</strong>. ఒక్కసారి క్రియేట్ అయ్యాక వాటిని మార్చడం కుదరదు. ఒకవేళ <code>t[0] = 99</code> అని ట్రై చేస్తే <code>TypeError</code> వస్తుంది:</p>`,
        code: `coordinates = (17.3850, 78.4867) # హైదరాబాద్ GPS లాటిట్యూడ్, లాంగిట్యూడ్

print("Latitude:", coordinates[0])
print("Longitude:", coordinates[1])

# వీటిని మార్చడానికి ట్రై చేస్తే TypeError వస్తుంది:
try:
    coordinates[0] = 18.0000
except TypeError as err:
    print("\\n❌ Modification Prevented:", err)`,
        codeTitle: 'Example 2: Tuple Immutability Protection',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 లిస్ట్ కు బదులు ట్యూపుల్ ఎందుకు?</strong>
          <ul style="margin:8px 0 0 18px; line-height:1.7;">
            <li><strong>డేటా ప్రొటెక్షన్:</strong> డేటాబేస్ పాస్వర్డ్స్, GPS కోఆర్డినేట్స్ లాంటివి పొరపాటున ఎవరూ మార్చకుండా ఉంచుతాయి.</li>
            <li><strong>Hashability:</strong> ట్యూపుల్స్ ని డిక్షనరీ లో Key లాగా వాడుకోవచ్చు (లిస్ట్ ని అలా వాడలేము!).</li>
          </ul>
        </div>`
      },
      {
        title: '3. Tuple Packing మరియు అడ్వాన్స్డ్ Unpacking (*rest)',
        body: `<p><strong>Tuple Unpacking</strong> అంటే ట్యూపుల్ లోని ఐటమ్స్ ని ఒకేసారి విడివిడిగా వేరియబుల్స్ లోకి పంపించడం. ఒకవేళ ఐటమ్స్ ఎక్కువ ఉండి పేర్లు తక్కువ ఉంటే <strong>Star unpacking (<code>*rest</code>)</strong> వాడుకోవచ్చు:</p>`,
        code: `# 1. స్టాండర్డ్ Tuple Unpacking:
user_data = ("Balaji", "Hyderabad", "India")
name, city, country = user_data

print(f"Name: {name}, City: {city}, Country: {country}")

# 2. Star Unpacking (*rest) వాడటం:
scores = (98, 92, 85, 78, 64)
first, second, *remaining = scores

print(f"\\nFirst Place: {first}")
print(f"Second Place: {second}")
print(f"Remaining Scores (List): {remaining}")`,
        codeTitle: 'Example 3: Tuple Packing and Star Unpacking (*rest)',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Star ఎక్కడైనా వాడొచ్చు:</strong>
          <p style="margin-top:6px;">మీరు <code>*rest</code> ని మధ్యలో కూడా వాడొచ్చు: <code>first, *middle, last = my_tuple</code> అని ఇస్తే ఫస్ట్, లాస్ట్ విడిగా వచ్చి మధ్యలో ఉన్నవన్నీ లిస్ట్ లోకి పోతాయి.</p>
        </div>`
      },
      {
        title: '4. Tuple కి ఉండే రెండే రెండు Methods',
        body: `<p>ట్యూపుల్స్ ని మార్చలేం కాబట్టి వాటికి append, remove లాంటివి ఏమీ ఉండవు. కేవలం రెండే ఉంటాయి:</p>
        <ul>
          <li><code>t.count(x)</code>: ఒక వాల్యూ ఎన్నిసార్లు వచ్చిందో కౌంట్ చేస్తుంది.</li>
          <li><code>t.index(x)</code>: ఫస్ట్ టైం ఆ వాల్యూ ఎక్కడుందో ఇండెక్స్ ఇస్తుంది.</li>
        </ul>`,
        code: `grades = ("A", "B", "A", "C", "A", "B")

# 'A' ఎన్నిసార్లు వచ్చిందో చూద్దాం
count_a = grades.count("A")
print("Total 'A' grades:", count_a)

# 'C' ఎక్కడుందో చూద్దాం
first_c_pos = grades.index("C")
print("First 'C' grade at index:", first_c_pos)`,
        codeTitle: 'Example 4: Tuple Methods (count & index)',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Method సమ్మరీ:</strong>
          <p style="margin-top:6px;">ఈ రెండు మెథడ్స్ ఒరిజినల్ డేటాని ఏమాత్రం మార్చవు కాబట్టి వీటిని ట్యూపుల్స్ కి ఇచ్చారు.</p>
        </div>`
      }
    ],
    mistake: {
      title: 'ఒకే ఐటెం తో ట్యూపుల్ క్రియేట్ చేయడంలో తప్పు',
      text: 'x = (10) అని రాస్తే అది ట్యూపుల్ కాదు ఇంటిజర్. ఒక ఐటెం తో ట్యూపుల్ రాయాలంటే చివర్లో కామా పెట్టాలి x = (10,).'
    },
    tryIt: {
      desc: 'ఒక ట్యూపుల్ లో 5 మార్క్స్ తీసుకుని, Unpacking ద్వారా హైయెస్ట్, లోయెస్ట్ మార్క్స్ ని విడిగా తీసి మధ్యలో ఉన్న మార్క్స్ ని ఒక లిస్ట్ లో పెట్టండి.',
      code: `scores = (95, 88, 82, 79, 65)

highest, *middle, lowest = scores

print("Highest Score:", highest)
print("Middle Scores:", middle)
print("Lowest Score:", lowest)`
    },
    faqs: [
      {
        q: 'లిస్ట్ కన్నా ట్యూపుల్ ఎందుకు ఫాస్ట్?',
        a: 'లిస్ట్ లో ఫ్యూచర్ లో కొత్త ఐటమ్స్ యాడ్ చేస్తామని మెమరీ ముందే ఎక్కువ తీసుకుంటుంది. కానీ ట్యూపుల్ కి ముందే ఫిక్స్డ్ సైజు తెలుసు కాబట్టి ఒక్క బైట్ కూడా మెమరీ వేస్ట్ చేయదు, స్పీడ్ ఎక్కువ.'
      },
      {
        q: 'ట్యూపుల్ లోపల ఒక లిస్ట్ పెట్టొచ్చా?',
        a: 'కచ్చితంగా! t = (1, [2, 3]) అని పెట్టొచ్చు. మీరు t[1] లో ఉన్న లిస్ట్ ని మార్చొచ్చు (t[1].append(4)), కానీ t ని డైరెక్ట్ గా రీప్లేస్ చేయలేరు.'
      },
      {
        q: 'ట్యూపుల్ ఎప్పుడు వాడాలి? లిస్ట్ ఎప్పుడు వాడాలి?',
        a: 'డేటా మారకూడదు (ఉదా: డేటాబేస్ రోస్, GPS లొకేషన్) అన్నప్పుడు ట్యూపుల్ వాడాలి. ఎప్పటికప్పుడు ఐటమ్స్ యాడ్ అవుతూ మారుతూ ఉంటే లిస్ట్ వాడాలి.'
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
    title: 'Python Dictionaries Deep Dive (తెలుగులో)',
    badge: '13. Dictionaries Deep Dive',
    subtopics: 'Key-Value Pairs · Hash Table Internals · CRUD · get() Fallback · Looping · Dict Comprehensions',
    desc: 'Python Dictionaries గురించి పూర్తిగా నేర్చుకుందాం: hash table టెక్నాలజీ, key-value mappings, ఎర్రర్ రాకుండా get() వాడటం, looping (.items()), మరియు dictionary comprehensions.',
    sections: [
      {
        title: '1. Dictionary అంటే ఏంటి? (Key-Value Pair)',
        body: `<p><strong>Dictionary (<code>dict</code>)</strong> అనేది కర్లీ బ్రాకెట్స్ (<code>{key: value}</code>) లో ఉండే <strong>ముఖ్యమైన కలెక్షన్</strong>. (Python 3.7+ నుండి ఇవి ఆర్డర్ ని ఫాలో అవుతాయి).</p>
        <ul>
          <li><strong>Keys ఎప్పుడూ యూనిక్ గా ఉండాలి:</strong> మరియు కీస్ మార్చలేనివి (strings, numbers, tuples) అయి ఉండాలి.</li>
          <li><strong>Values ఏవైనా అవ్వొచ్చు:</strong> లిస్ట్స్, నెంబర్స్, లేదా డిక్షనరీ లోపల ఇంకో డిక్షనరీ కూడా పెట్టుకోవచ్చు.</li>
          <li><strong>క్షణాలు లో $O(1)$ లూకప్:</strong> CPython లో ఇది సూపర్ ఫాస్ట్ గా పనిచేసే "Hash Table" అల్గారిథం తో తయారైంది.</li>
        </ul>`,
        code: `# ఒక డెవలపర్ ప్రొఫైల్ ని డిక్షనరీ లో రాద్దాం:
developer = {
    "name": "Balaji",
    "role": "Python Backend Engineer",
    "experience_years": 4,
    "skills": ["Python", "FastAPI", "PostgreSQL", "Docker"],
    "is_active": True
}

# వాల్యూస్ ని బయటికి తీద్దాం:
print("Developer Name:", developer["name"])
print("Role:", developer["role"])
print("Primary Skills:", developer["skills"])`,
        codeTitle: 'Example 1: Creating and Accessing Dictionaries',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Hash Table మ్యాజిక్:</strong>
          <p style="margin-top:6px;">మీరు <code>developer["name"]</code> అని అడిగినప్పుడు, పైథాన్ <code>hash("name")</code> కాలిక్యులేట్ చేసి ఆ మెమరీ స్లాట్ కి డైరెక్ట్ గా జంప్ అవుతుంది. అందుకే డిక్షనరీ చాలా ఫాస్ట్.</p>
        </div>`
      },
      {
        title: '2. సేఫ్ గా డేటాని తీయడం: [] vs .get()',
        body: `<p>డిక్షనరీ లో లేని కీ ని <code>dict["salary"]</code> అని స్క్వేర్ బ్రాకెట్స్ లో అడిగితే ప్రోగ్రామ్ క్రాష్ అయ్యి <code>KeyError</code> వస్తుంది. అదే <code>.get()</code> వాడితే సేఫ్ గా <code>None</code> లేదా మనం ఇచ్చిన ఫాల్-బ్యాక్ (fallback) వాల్యూ వస్తుంది:</p>`,
        code: `user = {"id": 101, "username": "balaji_dev"}

# 1. ఉన్న దాన్ని సేఫ్ గా అడగటం
print("User ID:", user.get("id"))

# 2. లేని దాన్ని అడిగినా ఎర్రర్ రాకుండా డీఫాల్ట్ (default) సెట్ చేయడం
role = user.get("role", "Standard Member")
salary = user.get("salary", 0.0)

print("User Role:", role)      # "Standard Member" అని వచ్చింది
print("User Salary: Rs.", salary) # 0.0 అని వచ్చింది`,
        codeTitle: 'Example 2: Safe Key Access with .get()',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 ప్రొఫెషనల్ కోడింగ్:</strong>
          <p style="margin-top:6px;">ఏదైనా API నుంచి JSON డేటా తీసుకుంటున్నప్పుడు ఎప్పుడూ <code>.get(key, fallback)</code> వాడాలి. అప్పుడు కొన్ని ఫీల్డ్స్ మిస్ అయినా కోడ్ క్రాష్ అవ్వదు.</p>
        </div>`
      },
      {
        title: '3. డిక్షనరీ ని మార్చడం (Add, Update, Delete)',
        body: `<p>డిక్షనరీ లోకి డేటాని డైనమిక్ గా మార్చడానికి ఇలా చేయాలి:</p>
        <ul>
          <li><code>dict[key] = new_value</code>: ఉంటే అప్డేట్ చేస్తుంది, లేకపోతే కొత్తగా యాడ్ చేస్తుంది.</li>
          <li><code>dict.update({...})</code>: చాలా కీస్ ని ఒకేసారి కలుపుతుంది.</li>
          <li><code>dict.pop(key)</code>: డిలీట్ చేసి, ఆ వాల్యూ ని మనకు ఇస్తుంది.</li>
          <li><code>del dict[key]</code>: డైరెక్ట్ గా మెమరీ లోంచి డిలీట్ చేస్తుంది.</li>
        </ul>`,
        code: `product = {"id": 501, "title": "Wireless Mouse", "price": 499}
print("Initial Product:", product)

# 1. కొత్తది యాడ్ చేద్దాం
product["brand"] = "Logitech"

# 2. పాతదాన్ని అప్డేట్ చేద్దాం
product["price"] = 449

# 3. రెండు మూడు ఒకేసారి కలుపుదాం
product.update({"rating": 4.8, "in_stock": True})
print("After update:", product)

# 4. పాప్ (pop) చేసి డిలీట్ చేద్దాం
removed_rating = product.pop("rating")
print(f"Popped rating: {removed_rating} | Remaining keys: {list(product.keys())}")`,
        codeTitle: 'Example 3: Adding, Updating, and Removing Dictionary Keys',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 ఒక చిన్న నోట్:</strong>
          <p style="margin-top:6px;">డిక్షనరీ లో కేస్ సెన్సిటివ్ (Case-sensitive) పనిచేస్తుంది: <code>"Price"</code> మరియు <code>"price"</code> అనేవి రెండు వేరు వేరు కీస్!</p>
        </div>`
      },
      {
        title: '4. డిక్షనరీ మీద లూప్ చేయడం (.keys(), .values(), .items())',
        body: `<p>డిక్షనరీ లోని డేటా మొత్తాన్ని లూప్ చేయడానికి ఈ మెథడ్స్ వాడతారు:</p>
        <ul>
          <li><code>dict.keys()</code>: కేవలం కీస్ మాత్రమే ఇస్తుంది.</li>
          <li><code>dict.values()</code>: కేవలం వాల్యూస్ మాత్రమే ఇస్తుంది.</li>
          <li><code>dict.items()</code>: కీ, వాల్యూ రెండింటినీ జంటగా (<code>(key, value)</code>) ఇస్తుంది.</li>
        </ul>`,
        code: `student_marks = {"Math": 95, "Physics": 88, "Chemistry": 92, "English": 85}

print("--- Subject & Marks Report ---")
for subject, marks in student_marks.items():
    print(f"• {subject:10}: {marks}/100")

# టోటల్ క్యాలిక్యులేట్ చేయడానికి values వాడదాం:
total = sum(student_marks.values())
average = total / len(student_marks)
print(f"\\nTotal Marks: {total} | Average: {average:.1f}%")`,
        codeTitle: 'Example 4: Looping Through Dictionaries with .items()',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 బెస్ట్ ప్రాక్టీస్:</strong>
          <p style="margin-top:6px;">ఎప్పుడైనా లూప్ చేసేటప్పుడు <code>for key, val in d.items():</code> వాడటమే మంచిది. లూప్ లోపల మళ్లీ <code>d[key]</code> అని పిలవడం కరెక్ట్ కాదు.</p>
        </div>`
      },
      {
        title: '5. Dictionary Comprehensions ({k: v for ... in ...})',
        body: `<p>List comprehension లాగే డిక్షనరీస్ ని కూడా ఒకే లైన్ లో క్రియేట్ చేయొచ్చు:</p>`,
        code: `# 1. 1 నుండి 5 వరకు వాటి స్క్వేర్స్ ని చేద్దాం:
squares_dict = {x: x ** 2 for x in range(1, 6)}
print("Squares Dict:", squares_dict)

# 2. 50 కంటే ఎక్కువ మార్కులు వచ్చినవాళ్లనే ఫిల్టర్ చేద్దాం:
raw_marks = {"Alex": 45, "Balaji": 95, "Chloe": 78, "David": 35}
passed_students = {name: score for name, score in raw_marks.items() if score >= 50}
print("Passed Students (marks >= 50):", passed_students)`,
        codeTitle: 'Example 5: Dictionary Comprehensions',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 ఈ టెక్నిక్ పవర్:</strong>
          <p style="margin-top:6px;">పెద్ద పెద్ద కోడ్ రాయకుండా, ఫిల్టర్ చేయడం మరియు కొత్త డేటా తయారుచేయడం సింగిల్ లైన్ లో అయిపోతుంది.</p>
        </div>`
      }
    ],
    mistake: {
      title: 'మార్చగలిగే (Mutable) ఆబ్జెక్ట్స్ ని Key గా వాడటం',
      text: 'డిక్షనరీ Key కి ఎప్పుడూ స్ట్రింగ్ గాని, నెంబర్ గాని వాడాలి. లిస్ట్ ని కీ గా వాడితే ({[1, 2]: "data"}) TypeError: unhashable type: \'list\' అని వస్తుంది. దాని బదులు ట్యూపుల్ {(1, 2): "data"} వాడాలి.'
    },
    tryIt: {
      desc: 'ఒక షాపింగ్ కార్ట్ లో ఐటమ్స్, వాటి ప్రైస్ ఉన్నాయి. బిల్ ఎంత అయిందో క్యాలిక్యులేట్ చేసి, 100 రూపాయల కన్నా ఎక్కువ ఉన్నవి ప్రింట్ చేయండి.',
      code: `cart = {"Keyboard": 450, "Notebook": 80, "Mouse": 250, "Pen": 20}

total_bill = sum(cart.values())
expensive_items = {k: v for k, v in cart.items() if v > 100}

print("Shopping Cart:", cart)
print("Total Bill: Rs.", total_bill)
print("Items > Rs. 100:", expensive_items)`
    },
    faqs: [
      {
        q: 'Python డిక్షనరీస్ ఆర్డర్ లో ఉంటాయా?',
        a: 'అవును. Python 3.7 నుండి మనం ఏ ఆర్డర్ లో క్రియేట్ చేసామో అదే ఆర్డర్ ని ఇవి గుర్తుపెట్టుకుంటాయి.'
      },
      {
        q: 'డిక్షనరీ లో ఒక ఐటెం ని వెతకడం ఎంత ఫాస్ట్?',
        a: 'ఇది Hash table ద్వారా పనిచేస్తుంది కాబట్టి O(1) టైమ్ (చాలా అంటే చాలా ఫాస్ట్) తీసుకుంటుంది.'
      },
      {
        q: 'ఒక డిక్షనరీ లోపల ఇంకో డిక్షనరీ పెట్టొచ్చా?',
        a: 'పెట్టొచ్చు! దాన్నే Nested Dictionary అంటారు. బయటనుంచి వచ్చే JSON డేటా అంతా ఇలాగే ఉంటుంది.'
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
    title: 'Python Sets & Mathematical Operations (తెలుగులో)',
    badge: '14. Sets & Operations',
    subtopics: 'Unordered Unique Elements · Hash Set Internals · Adding/Removing · Union · Intersection · Difference · Symmetric Diff',
    desc: 'Python Sets గురించి పూర్తిగా నేర్చుకుందాం: డూప్లికేట్స్ ని ఆటోమాటిక్ గా తీసేయడం, సెట్స్ లో మ్యాథ్స్ ఆపరేషన్స్ (Union, Intersection, Difference), మరియు సెట్ కి లిస్ట్ కి స్పీడ్ తేడాలు.',
    sections: [
      {
        title: '1. Set అంటే ఏంటి? డూప్లికేట్స్ రిమూవల్',
        body: `<p><strong>Set (<code>set</code>)</strong> అంటే <strong>యూనిక్ గా ఉండే, ఆర్డర్ లేని</strong> ఐటమ్స్ ని కర్లీ బ్రాకెట్స్ (<code>{...}</code>) లోపల స్టోర్ చేసే ఒక కలెక్షన్.</p>
        <ul>
          <li><strong>No Duplicates Allowed:</strong> ఒకే ఐటెం రెండు సార్లు ఇస్తే సెట్ ఆటోమాటిక్ గా ఒకటి డిలీట్ చేస్తుంది.</li>
          <li><strong>Unordered:</strong> వీటికి ఏ ఆర్డర్, ఇండెక్స్ ఉండదు. (అంటే <code>s[0]</code> అని పిలవలేం).</li>
          <li><strong>Empty Set క్రియేట్ చేయడం:</strong> ఖాళీ సెట్ కోసం <code>s = set()</code> వాడాలి. <code>{}</code> వాడితే అది డిక్షనరీ అయిపోతుంది!</li>
        </ul>`,
        code: `# 1. డూప్లికేట్స్ ఉన్న సెట్ క్రియేట్ చేస్తే ఏమవుతుంది?
numbers_set = {1, 2, 2, 3, 4, 4, 5}
print("Numbers Set (Unique):", numbers_set)

# 2. ఒక లిస్ట్ ని సింగిల్ స్టెప్ లో డూప్లికేట్స్ లేకుండా చేద్దాం:
raw_emails = ["alex@test.com", "balaji@test.com", "alex@test.com", "chloe@test.com"]
unique_emails = list(set(raw_emails))
print("\\nOriginal emails count:", len(raw_emails))
print("Unique emails list:   ", unique_emails)

# 3. Empty set కి, Empty dict కి తేడా:
empty_s = set()  # ఇదొక Set!
empty_d = {}     # ఇదొక Dict!
print("\\nType of set():", type(empty_s).__name__)
print("Type of {}:   ", type(empty_d).__name__)`,
        codeTitle: 'Example 1: Creating Sets and Deduplicating Lists',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Performance Advantage:</strong>
          <p style="margin-top:6px;">ఒక లక్ష ఐటమ్స్ ఉన్న లిస్ట్ లో డూప్లికేట్స్ తీసేయాలంటే <code>list(set(items))</code> వాడితే సెకనులోపు అయిపోతుంది.</p>
        </div>`
      },
      {
        title: '2. Sets ని మోడిఫై చేయడం: add(), update(), remove() vs discard()',
        body: `<p>సెట్స్ లోకి ఐటమ్స్ యాడ్ చేయడానికి, రిమూవ్ చేయడానికి:</p>
        <ul>
          <li><code>set.add(elem)</code>: ఒక ఐటెం ని యాడ్ చేస్తుంది.</li>
          <li><code>set.update(iterable)</code>: మల్టిపుల్ ఐటమ్స్ ని యాడ్ చేస్తుంది.</li>
          <li><code>set.remove(elem)</code>: ఐటెం ని డిలీట్ చేస్తుంది; ఆ ఐటెం లేకపోతే <code>KeyError</code> వస్తుంది!</li>
          <li><code>set.discard(elem)</code>: ఐటెం ని డిలీట్ చేస్తుంది; ఆ ఐటెం లేకపోయినా ఎర్రర్ రాదు (సైలెంట్ గా వదిలేస్తుంది).</li>
        </ul>`,
        code: `my_set = {"Apple", "Banana"}

# 1. యాడ్ చేద్దాం
my_set.add("Mango")
my_set.update(["Grapes", "Orange"])
print("After adding:", my_set)

# 2. remove() vs discard()
my_set.remove("Apple")    # Apple పోయింది
my_set.discard("Kiwi")    # Kiwi లేదు, అయినా ఎర్రర్ రాలేదు!

# my_set.remove("Kiwi")   # ఇది క్రాష్ అవుతుంది (KeyError)
print("After removing:", my_set)`,
        codeTitle: 'Example 2: Adding and Removing Elements from a Set',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Pro Tip:</strong>
          <p style="margin-top:6px;">ఎప్పుడైనా సెట్ లోంచి డిలీట్ చేయాలంటే <code>discard()</code> వాడటమే మంచిది. అది క్రాష్ అవ్వకుండా సేఫ్ గా చూసుకుంటుంది.</p>
        </div>`
      },
      {
        title: '3. సెట్స్ తో మ్యాథ్స్ ఆపరేషన్స్ (Union & Intersection)',
        body: `<p>సెట్స్ అనేవి స్కూల్ మ్యాథ్స్ లో వెన్ రేఖాచిత్రాలు (Venn diagrams) లాగా పనిచేస్తాయి:</p>
        <ul>
          <li><strong>Union (<code>|</code>):</strong> రెండు సెట్స్ లో ఉన్న వాటన్నిటినీ కలుపుతుంది (కామన్ గా ఉన్నవి ఒకసారే వస్తాయి).</li>
          <li><strong>Intersection (<code>&amp;</code>):</strong> రెండు సెట్స్ లో <strong>కామన్ గా ఉన్నవి</strong> మాత్రమే ఇస్తుంది.</li>
        </ul>`,
        code: `team_a = {"Balaji", "Alex", "Chloe"}
team_b = {"David", "Alex", "Emma"}

# 1. Union: ఇద్దరిలో ఉన్న అందరినీ కలుపుదాం
all_members = team_a | team_b
# లేదా: team_a.union(team_b)
print("Union (All members):", all_members)

# 2. Intersection: ఇద్దరిలో కామన్ గా ఉన్నవాళ్ళెవరు?
common_members = team_a & team_b
# లేదా: team_a.intersection(team_b)
print("Intersection (Common):", common_members)`,
        codeTitle: 'Example 3: Set Union and Intersection',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 రియల్ వరల్డ్ యూజ్:</strong>
          <p style="margin-top:6px;">రెండు వేర్వేరు డేటాబేస్ టేబుల్స్ లో ఉన్న యూజర్స్ లో కామన్ గా ఉన్నవాళ్ళను కనిపెట్టడానికి Intersection చాలా పవర్ ఫుల్.</p>
        </div>`
      },
      {
        title: '4. సెట్స్ లో Difference మరియు Symmetric Difference',
        body: `<p>ఇవి కూడా మ్యాథ్స్ లో లాగే పనిచేస్తాయి:</p>
        <ul>
          <li><strong>Difference (<code>-</code>):</strong> ఫస్ట్ సెట్ లో ఉండి, సెకండ్ సెట్ లో <strong>లేనివి</strong> ఇస్తుంది.</li>
          <li><strong>Symmetric Diff (<code>^</code>):</strong> కామన్ గా ఉన్నవాటిని పీకేసి, కేవలం ఎవరికి వాళ్ళకి సపరేట్ గా ఉన్నవాటిని మాత్రమే ఇస్తుంది.</li>
        </ul>`,
        code: `team_a = {"Balaji", "Alex", "Chloe"}
team_b = {"David", "Alex", "Emma"}

# 1. Difference: A లో ఉండి B లో లేనివాళ్ళు
only_in_a = team_a - team_b
# లేదా: team_a.difference(team_b)
print("Difference (Only in A):", only_in_a)

# 2. Symmetric Difference: ఇద్దరిలో కామన్ గా లేనివాళ్ళు
unique_to_each = team_a ^ team_b
# లేదా: team_a.symmetric_difference(team_b)
print("Symmetric Difference (Unique to each):", unique_to_each)`,
        codeTitle: 'Example 4: Set Difference and Symmetric Difference',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 కాన్సెప్ట్ అర్థం చేసుకోవడం:</strong>
          <p style="margin-top:6px;"><code>A - B</code> అంటే A లోంచి B కి సంబంధించినవి తీసేయడం. <code>A ^ B</code> అంటే (A | B) - (A & B) కి సమానం.</p>
        </div>`
      }
    ],
    mistake: {
      title: 'ఖాళీ సెట్ కి బదులు {} వాడటం',
      text: 'x = {} అని రాస్తే పైథాన్ దాన్ని ఖాళీ డిక్షనరీ (Dict) అనుకుంటుంది. ఎప్పుడైనా ఖాళీ సెట్ క్రియేట్ చేయాలంటే x = set() అనే రాయాలి.'
    },
    tryIt: {
      desc: 'రెండు లిస్ట్స్ ఇచ్చారు (math_students, science_students). రెండు సబ్జెక్ట్స్ తీసుకున్న వాళ్ళని (Intersection) మరియు కేవలం సైన్స్ మాత్రమే తీసుకున్న వాళ్ళని (Difference) ప్రింట్ చేయండి.',
      code: `math_students = {"Alex", "Balaji", "Chloe"}
science_students = {"Chloe", "David", "Balaji"}

# Intersection (రెండు తీసుకున్నవాళ్ళు)
both = math_students & science_students

# Difference (ఓన్లీ సైన్స్)
only_science = science_students - math_students

print("Both subjects:", both)
print("Only Science:", only_science)`
    },
    faqs: [
      {
        q: 'Set కి List కి స్పీడ్ లో తేడా ఏంటి?',
        a: 'ఒక ఐటెం లిస్ట్ లో ఉందా అని చెక్ చేయడానికి లిస్ట్ మొత్తం వెతకాలి (O(N) time). కానీ సెట్ లో అయితే Hash టేబుల్ వాడితే క్షణంలో (O(1) time) దొరుకుతుంది.'
      },
      {
        q: 'Set లోపల లిస్ట్ పెట్టొచ్చా?',
        a: 'లేదు. Set లోపల ఉన్నవన్నీ మారనివి (Immutable/Hashable) అయి ఉండాలి. లిస్ట్ ని పెట్టలేరు, కానీ ట్యూపుల్ ని పెట్టొచ్చు.'
      },
      {
        q: 'Set లో ఉన్న ఐటమ్స్ ని ఆర్డర్ లో ప్రింట్ చేయొచ్చా?',
        a: 'సెట్ కి ఆర్డర్ ఉండదు. కానీ మీరు sorted(my_set) అని ఇస్తే, అది ఆర్డర్ లో ఉన్న ఒక కొత్త లిస్ట్ ని ఇస్తుంది.'
      }
    ]
  }
];
