// Phase 5: Modules & Packages Data
module.exports = [
  // =========================================================================
  // CHAPTER 20: PYTHON MODULES & IMPORT SYSTEM
  // =========================================================================
  {
    num: 20,
    phaseId: 'phase5',
    phaseTitle: 'Phase 5: Modules and Packages',
    slug: '20-python-modules-and-import-system',
    title: 'Python Modules & Import System (తెలుగులో)',
    badge: '20. Modules & Imports',
    subtopics: 'Module Architecture · sys.path · import & from..import · Aliases (as) · __name__ == "__main__" · Custom Modules',
    desc: 'Python లో మాడ్యూల్స్ (Modules) ఎలా పనిచేస్తాయి? ఫైల్స్ ని ఇంపోర్ట్ చేయడం, sys.path ఆర్కిటెక్చర్, aliases వాడటం, మరియు __name__ == "__main__" అనే ఇడియం (idiom) గురించి పూర్తిగా నేర్చుకుందాం.',
    sections: [
      {
        title: '1. Module అంటే ఏంటి? (Physical Files vs In-Memory Objects)',
        body: `<p>Python లో <strong>module</strong> అంటే కోడ్, ఫంక్షన్స్, క్లాసెస్ రాసి ఉన్న ఒక మామూలు <code>.py</code> ఫైల్. ఒక పెద్ద ప్రాజెక్ట్ ని చిన్న చిన్న ముక్కలుగా (ఫైల్స్ గా) విడగొట్టి, ఒక ఫైల్ లో కోడ్ ని ఇంకో ఫైల్ లోకి వాడుకోవడానికే మాడ్యూల్స్ వాడతారు.</p>
        <p>మనం ఫస్ట్ టైమ్ <code>import</code> అని రాసినప్పుడు పైథాన్ వెనకాల 3 పనులు చేస్తుంది:</p>
        <ol>
          <li><strong>వెతుకుతుంది (Locates):</strong> ఆ ఫైల్ ఎక్కడుందో <code>sys.path</code> లిస్ట్ లో ఉన్న ఫోల్డర్స్ లో వెతుకుతుంది.</li>
          <li><strong>కంపైల్ చేస్తుంది (Compiles):</strong> మన కోడ్ ని అర్థమయ్యే Bytecode (<code>.pyc</code>) గా మార్చి, దాన్ని <code>__pycache__/</code> అనే ఫోల్డర్ లో దాచుకుంటుంది (దీనివల్ల నెక్స్ట్ టైమ్ ఫాస్ట్ గా రన్ అవుతుంది).</li>
          <li><strong>మెమరీలో దాచుకుంటుంది (Caches):</strong> దాన్ని రన్ చేసి <code>sys.modules</code> అనే చోట మెమరీలో సేవ్ చేస్తుంది.</li>
        </ol>
        <div class="diagram-box">┌────────────────────────────────────────────────────────┐
│  Python Import చేసే విధానం                             │
│                                                        │
│  1. ముందుగా sys.modules లో ఉందేమో చూస్తుంది (Cache)    │
│  2. లేకపోతే sys.path ఫోల్డర్స్ లో వెతుకుతుంది            │
│  3. దొరికిన ఫైల్ ని .pyc (Bytecode) గా మారుస్తుంది      │
│  4. దాన్ని మన ఫైల్ లోకి తీసుకొస్తుంది                   │
└────────────────────────────────────────────────────────┘</div>
        <p>మెమరీలో సేవ్ అవ్వడం వల్ల, మీరు ఒకే మాడ్యూల్ ని 100 ఫైల్స్ లో ఇంపోర్ట్ చేసినా, అది రన్ అయ్యేది మాత్రం <strong>ఒక్కసారే</strong>!</p>`,
        code: `# మాడ్యూల్ మెటాడేటా ని చూద్దాం:
import math
import sys

print("Module Object:", math)
print("Module Name (__name__):", math.__name__)
print("Module Docstring:", math.__doc__[:60], "...")
print("Is 'math' cached in sys.modules?", 'math' in sys.modules)`,
        codeTitle: 'Example 1: Inspecting Module Metadata and Runtime Cache',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 లోపల ఏం జరుగుతుంది?:</strong>
          <ul style="margin:8px 0 0 18px; line-height:1.7;">
            <li><code>math</code> అనేది C లాంగ్వేజ్ తో రాసి పైథాన్ లోపలే పెట్టిన ఒక built-in మాడ్యూల్.</li>
            <li>మనం ఇంపోర్ట్ చేయగానే అది <code>sys.modules</code> లో సేవ్ అవుతుంది, మళ్ళీ ఇంపోర్ట్ చేస్తే ఫాస్ట్ గా అక్కడినుంచే వస్తుంది.</li>
          </ul>
        </div>`
      },
      {
        title: '2. ఇంపోర్ట్ చేయడానికి 3 పద్ధతులు (import, from, as)',
        body: `<p>వేరే ఫైల్ లోని కోడ్ ని మన ఫైల్ లోకి తేవడానికి 3 రకాల సింటాక్స్ లు ఉన్నాయి:</p>
        <h4 style="color:#10b981; margin:16px 0 8px;">1. మామూలు <code>import module_name</code>:</h4>
        <p>మొత్తం ఫైల్ ని తీసుకొస్తుంది. వాడుకోవాలంటే <code>math.sqrt(16)</code> అని పేరుతో పిలవాలి. ఇది చాలా సేఫ్, పేర్లు కన్ఫ్యూజ్ అవ్వవు.</p>
        <h4 style="color:#10b981; margin:16px 0 8px;">2. డైరెక్ట్ గా <code>from module_name import item1</code>:</h4>
        <p>ఫైల్ లో ఉన్న ఒక్క ఫంక్షన్ ని మాత్రమే నేరుగా తీసుకురావడం. అప్పుడు <code>math.</code> అని వాడక్కర్లేదు, డైరెక్ట్ గా <code>sqrt(16)</code> అనొచ్చు.</p>
        <h4 style="color:#10b981; margin:16px 0 8px;">3. షార్ట్ కట్ పేరు <code>import module as alias</code>:</h4>
        <p>పెద్ద పేర్లు ఉంటే (ఉదా: <code>import datetime as dt</code>), వాటికి ముద్దుపేరు (Alias) పెట్టుకోవచ్చు.</p>
        <div class="callout" style="margin:16px 0;">
          <strong style="color:#ef4444;">⚠️ "from module import *" ఎందుకు వాడకూడదు?</strong><br>
          ఇలా వాడితే ఆ ఫైల్ లో ఉన్న వందల ఫంక్షన్స్ అన్నీ మన ఫైల్ లోకి వచ్చి పడిపోతాయి. మన ఫైల్ లో ఉన్న పేర్లు వాటి పేర్లు క్లాష్ అయ్యి పెద్ద బగ్స్ వస్తాయి. ఎప్పుడూ వాడకండి!
        </div>`,
        code: `# పద్ధతి 1: మొత్తం మాడ్యూల్ ని ఇంపోర్ట్ చేయడం
import math
res1 = math.pow(2, 3)

# పద్ధతి 2: కేవలం కావాల్సిన ఫంక్షన్స్ మాత్రమే డైరెక్ట్ గా తేవడం
from math import sqrt, pi
res2 = sqrt(144)

# పద్ధతి 3: పెద్ద పేరుకి షార్ట్ కట్ (alias) ఇవ్వడం
import datetime as dt
current_year = dt.datetime.now().year

print(f"2 ** 3 = {res1}")
print(f"Square root of 144 = {res2}")
print(f"Value of Pi = {pi:.4f}")
print(f"Current Year via 'dt' alias: {current_year}")`,
        codeTitle: 'Example 2: The Three Modern Import Mechanisms',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 బెస్ట్ ప్రాక్టీస్:</strong>
          <p style="margin-top:6px;">డేటా సైన్స్ లో ఎప్పుడూ <code>import pandas as pd</code>, <code>import numpy as np</code> లాంటి షార్ట్ కట్స్ వాడటం ఇండస్ట్రీ స్టాండర్డ్.</p>
        </div>`
      },
      {
        title: '3. పైథాన్ ఫైల్స్ ని ఎక్కడ వెతుకుతుంది? (The sys.path)',
        body: `<p>మీరు <code>import my_module</code> అన్నప్పుడు, పైథాన్ మీ కంప్యూటర్ మొత్తం వెతకదు. కేవలం <code>sys.path</code> అనే లిస్ట్ లో ఉన్న ఫోల్డర్స్ లో మాత్రమే ఆర్డర్ లో వెతుకుతుంది:</p>
        <ol>
          <li><strong>Current Directory:</strong> ముందుగా మీరు కోడ్ రన్ చేస్తున్న ఫోల్డర్ లో వెతుకుతుంది.</li>
          <li><strong>PYTHONPATH:</strong> మీ కంప్యూటర్ OS లో సెట్ చేసిన ఎన్విరాన్మెంట్ ఫోల్డర్స్.</li>
          <li><strong>Standard Library:</strong> పైథాన్ ఇన్స్టాల్ అయిన ఫోల్డర్ (math, json లాంటివి ఇక్కడే ఉంటాయి).</li>
          <li><strong>Site-Packages:</strong> మీరు <code>pip install</code> తో డౌన్లోడ్ చేసిన బయటి ప్యాకేజెస్ (requests, django) ఉండే ఫోల్డర్.</li>
        </ol>
        <p>ఇవి ఎక్కడా దొరకకపోతే అప్పుడు <code>ModuleNotFoundError</code> వస్తుంది.</p>`,
        code: `import sys

print("--- 🔍 పైథాన్ ఎక్కడ వెతుకుతుందో చూద్దాం (sys.path) ---")
for index, directory_path in enumerate(sys.path, start=1):
    print(f"{index}. {directory_path}")`,
        codeTitle: 'Example 3: Inspecting Python sys.path Resolution List',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 హ్యాక్ (Hack):</strong>
          <p style="margin-top:6px;">ఒకవేళ మీ ఫైల్ వేరే ఎక్కడో దూరం ఫోల్డర్ లో ఉంటే, దాన్ని <code>sys.path.append('/my/custom/path')</code> వాడి లిస్ట్ లో కలిపేసి ఇంపోర్ట్ చేసుకోవచ్చు.</p>
        </div>`
      },
      {
        title: '4. ఇంటర్వ్యూ ప్రశ్న: if __name__ == "__main__": ఎందుకు రాస్తారు?',
        body: `<p>ప్రతి పైథాన్ ఫైల్ లో ఆటోమాటిక్ గా <code>__name__</code> అనే ఒక హిడెన్ వేరియబుల్ ఉంటుంది:</p>
        <ul>
          <li>మనం ఆ ఫైల్ నే డైరెక్ట్ గా రన్ చేస్తే (ఉదా: <code>python app.py</code>), అప్పుడు పైథాన్ <code>__name__ = "__main__"</code> అని సెట్ చేస్తుంది.</li>
          <li>కానీ దాన్ని వేరే ఫైల్ లోకి <code>import</code> చేసుకుంటే, అప్పుడు దాని పేరు <code>__name__ = "app"</code> గా ఉంటుంది.</li>
        </ul>
        <div class="diagram-box">డైరెక్ట్ గా రన్ చేస్తే:       python script.py  ==>  __name__ = "__main__" (కింద రాసిన కోడ్ రన్ అవుతుంది)
వేరే ఫైల్ లో ఇంపోర్ట్ చేస్తే:  import script     ==>  __name__ = "script"   (కింద రాసిన కోడ్ రన్ అవ్వదు!)</div>
        <p>అంటే ఒక ఫైల్ ని అటు ఇంపోర్ట్ చేసుకోవడానికి, ఇటు టెస్ట్ చేసుకోవడానికి రెండిటికీ వాడాలంటే ఈ లైన్ రాస్తారు.</p>`,
        code: `# ఇది geometry_helper.py అనే ఫైల్ అనుకుందాం

def calculate_circle_area(radius):
    """సర్కిల్ ఏరియా కనుక్కునే ఫంక్షన్."""
    import math
    return math.pi * (radius ** 2)

# ఈ కింది కోడ్ వేరే ఫైల్ వాళ్ళు import చేసుకున్నప్పుడు రన్ అవ్వకుండా ఆపుతుంది:
if __name__ == "__main__":
    print("--- 🧪 Running geometry_helper.py Standalone Tests ---")
    test_r = 5
    print(f"Test Radius: {test_r}")
    print(f"Calculated Area: {calculate_circle_area(test_r):.2f}")`,
        codeTitle: 'Example 4: Dual-Purpose Module with __name__ == "__main__"',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 ప్రొఫెషనల్ ప్రాక్టీస్:</strong>
          <p style="margin-top:6px;">ఒకవేళ మీరు ఈ <code>if __name__ == "__main__":</code> కండిషన్ రాయకపోతే, ఈ ఫైల్ ని ఎవరైనా ఇంపోర్ట్ చేయగానే ఆటోమాటిక్ గా అందులోని ప్రింట్ స్టేట్మెంట్స్ అన్నీ ప్రింట్ అయిపోతాయి (polluting the output).</p>
        </div>`
      }
    ],
    mistake: {
      title: 'ఫైల్ పేరు math.py లేదా random.py అని పెట్టడం',
      text: 'మీరు మీ ఫైల్ కి "random.py" అని పేరు పెట్టి లోపల import random అని రాస్తే AttributeError వస్తుంది. ఎందుకంటే పైథాన్ ఫస్ట్ మీ ఫోల్డర్ లోనే వెతుకుతుంది (sys.path రూల్), కాబట్టి మీ ఖాళీ ఫైల్ నే పైథాన్ ఫైల్ అనుకుని క్రాష్ అవుతుంది. పైథాన్ పేర్లని మీరు ఫైల్స్ కి పెట్టకండి.'
    },
    tryIt: {
      desc: 'built-in math మరియు statistics మాడ్యూల్స్ వాడి, పైథాగరస్ థియరమ్ (math.hypot(3, 4)) మరియు మీన్ (stats.mean) కనుక్కోండి.',
      code: `import math
import statistics as stats

hypotenuse = math.hypot(3, 4)
print("Hypotenuse (3, 4):", hypotenuse)

dataset = [10, 20, 30, 40, 50]
print("Dataset:", dataset)
print("Mean:", stats.mean(dataset))`
    },
    faqs: [
      {
        q: '__pycache__ ఫోల్డర్ ఎందుకు క్రియేట్ అవుతుంది?',
        a: 'పైథాన్ మీ కోడ్ ని మెషిన్ కి అర్థమయ్యే Bytecode (.pyc) గా మార్చి అందులో దాస్తుంది. మీరు మళ్ళీ రన్ చేసినప్పుడు కోడ్ మారకపోతే డైరెక్ట్ గా అక్కడినుంచే చాలా ఫాస్ట్ గా రన్ అవుతుంది.'
      },
      {
        q: 'స్క్రిప్ట్ (Script) కి మాడ్యూల్ (Module) కి తేడా ఏంటి?',
        a: 'టెర్మినల్ నుంచి డైరెక్ట్ గా రన్ చేసే ఫైల్ ని స్క్రిప్ట్ అంటారు. దాన్ని వేరే ఫైల్ లోకి import చేసుకుంటే దాన్ని మాడ్యూల్ అంటారు.'
      }
    ]
  },

  // =========================================================================
  // CHAPTER 21: PYTHON CORE STANDARD LIBRARY MODULES
  // =========================================================================
  {
    num: 21,
    phaseId: 'phase5',
    phaseTitle: 'Phase 5: Modules and Packages',
    slug: '21-python-core-standard-library-modules',
    title: 'Python Standard Library Core (తెలుగులో)',
    badge: '21. Standard Library Core',
    subtopics: 'math · random · datetime · statistics · High-Performance Utilities · Reproducible Seeds',
    desc: 'Python తో పాటే వచ్చే పవర్ ఫుల్ "Standard Library" మాడ్యూల్స్: math (మ్యాథ్స్ లాజిక్), random (రాండమ్ నెంబర్స్), datetime (టైం అండ్ డేట్), మరియు statistics (స్టాటిస్టిక్స్) గురించి నేర్చుకుందాం.',
    sections: [
      {
        title: '1. "Batteries Included" & math మాడ్యూల్',
        body: `<p>పైథాన్ ఫిలాసఫీ ఏంటంటే <strong>"Batteries Included"</strong>. అంటే మీరు బయటినుంచి ఏమీ డౌన్లోడ్ చేసుకోకపోయినా, పైథాన్ తో పాటే వందలాది పవర్ ఫుల్ C-optimized మాడ్యూల్స్ ఆటోమాటిక్ గా వచ్చేస్తాయి.</p>
        <p><strong><code>math</code> మాడ్యూల్</strong> అనేది మ్యాథ్స్ కాలిక్యులేషన్స్ చేయడానికి వాడతారు:</p>
        <ul>
          <li><strong>Constants:</strong> <code>math.pi</code> (3.14159...), <code>math.e</code> (2.71828...).</li>
          <li><strong>Rounding:</strong> <code>math.floor()</code> (కిందికి రౌండ్ చేస్తుంది), <code>math.ceil()</code> (పైకి రౌండ్ చేస్తుంది), <code>math.trunc()</code> (చుక్క తర్వాతవి తీసేస్తుంది).</li>
          <li><strong>పవర్ & లాగ్:</strong> <code>math.sqrt()</code> (రూట్), <code>math.pow()</code> (పవర్), <code>math.log()</code>.</li>
          <li><strong>కాంప్లెక్స్:</strong> <code>math.factorial(n)</code> (ఫ్యాక్టోరియల్), <code>math.gcd(a, b)</code> (గరిష్ట సామాన్య భాజకం).</li>
        </ul>`,
        code: `import math

# 1. Rounding ఆపరేషన్స్
print("Ceil of 4.2: ", math.ceil(4.2))   # 5 (పైకి)
print("Floor of 4.8:", math.floor(4.8))  # 4 (కిందికి)

# 2. ఫ్యాక్టోరియల్ మరియు కాంబినేషన్స్
print("\\n5! (Factorial):", math.factorial(5)) # 120
print("Combinations of 5 choose 2:", math.comb(5, 2)) # 10

# 3. ట్రైగోనోమెట్రీ (Trigonometry) - యాంగిల్స్ Radians లో ఉండాలి
angle_rad = math.radians(90) # 90 డిగ్రీలని radians లోకి మార్చడం
print("sin(90 degrees):", math.sin(angle_rad))
print("Hypotenuse of 6 and 8:", math.hypot(6, 8)) # 10.0 (పైథాగరస్ థియరమ్)`,
        codeTitle: 'Example 1: Advanced Mathematical Computations with math',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Precision Tip:</strong>
          <p style="margin-top:6px;">డెసిమల్స్ (0.1 + 0.2) ని ఎప్పుడూ <code>==</code> వాడి చెక్ చేయకండి, రిజల్ట్ తప్పు వస్తుంది (IEEE 754 ఇష్యూ). ఎప్పుడూ <code>math.isclose(a, b)</code> వాడాలి.</p>
        </div>`
      },
      {
        title: '2. The random మాడ్యూల్: పర్ఫెక్ట్ గా రాండమ్ నెంబర్స్',
        body: `<p><strong><code>random</code> మాడ్యూల్</strong> అనేది గెస్ చేయలేని (Mersenne Twister అల్గారిథం వాడి) నెంబర్స్ ని క్రియేట్ చేయడానికి వాడతారు.</p>
        <ul>
          <li><code>random.randint(a, b)</code>: a మరియు b మధ్యలో ఒక నెంబర్ ని ఇస్తుంది (రెండూ కలుపుకుని).</li>
          <li><code>random.random()</code>: 0.0 నుండి 1.0 లోపు ఒక ఫ్లోట్ ని ఇస్తుంది.</li>
          <li><code>random.choice(sequence)</code>: లిస్ట్ లోంచి ఏదైనా ఒకదాన్ని రాండమ్ గా సెలెక్ట్ చేస్తుంది.</li>
          <li><code>random.sample(seq, k=n)</code>: లిస్ట్ లోంచి n ఐటమ్స్ ని డూప్లికేట్ లేకుండా సెలెక్ట్ చేస్తుంది.</li>
          <li><code>random.shuffle(list)</code>: లిస్ట్ లోని ఐటమ్స్ ఆర్డర్ ని జిగ్-జాగ్ (shuffle) చేస్తుంది.</li>
          <li><code>random.seed(x)</code>: దీన్ని వాడితే, ఎన్నిసార్లు రన్ చేసినా ఒకటే రాండమ్ రిజల్ట్ వస్తుంది (టెస్టింగ్ కి వాడతారు).</li>
        </ul>`,
        code: `import random

# 1. రాండమ్ నెంబర్స్
dice_roll = random.randint(1, 6)
random_prob = random.random()
print(f"🎲 Rolled a dice: {dice_roll} | Probability: {random_prob:.4f}")

# 2. లిస్ట్ లోంచి లాటరీ తీయడం
participants = ["Alex", "Balaji", "Chloe", "David", "Elena", "Faisal"]
winner = random.choice(participants)
print(f"🏆 Lucky Winner (choice): {winner}")

# 3. ముగ్గురిని సెలెక్ట్ చేయడం (ఒకరు మళ్ళీ రాకుండా)
team = random.sample(participants, k=3)
print(f"👥 Selected Team (3 unique members): {team}")

# 4. పేకముక్కలు (Cards) కలపడం లాంటిది
cards = ["A♠", "K♥", "Q♦", "J♣", "10♠"]
random.shuffle(cards)
print(f"🃏 Shuffled Cards: {cards}")`,
        codeTitle: 'Example 2: Random Number Generation, Selection and Shuffling',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 సెక్యూరిటీ వార్నింగ్:</strong>
          <p style="margin-top:6px;"><code>random</code> మాడ్యూల్ ని కేవలం గేమ్స్ కి, సిమ్యులేషన్స్ కి మాత్రమే వాడాలి. బ్యాంకింగ్ పాస్వర్డ్స్, OTP లకి ఎప్పుడూ పైథాన్ <code>secrets</code> మాడ్యూల్ వాడాలి!</p>
        </div>`
      },
      {
        title: '3. The datetime మాడ్యూల్: టైమ్ మరియు డేట్ లాజిక్',
        body: `<p><strong><code>datetime</code> మాడ్యూల్</strong> అనేది తేదీలు (dates), సమయం (times) తో ఆడుకోవడానికి బెస్ట్.</p>
        <ul>
          <li><code>datetime.date(year, month, day)</code>: కేవలం తేదీ (Date) కోసం.</li>
          <li><code>datetime.datetime.now()</code>: ప్రస్తుత కచ్చితమైన టైం.</li>
          <li><code>datetime.timedelta(...)</code>: ఇంకో 30 రోజులు కలపడం, లేదా టైం తీసేయడం లాంటి మ్యాథ్స్ కోసం.</li>
          <li><strong>Formatting:</strong>
            <ul>
              <li><code>strftime(format)</code>: టైం ని ఒక స్ట్రింగ్ (టెక్స్ట్) లాగా మార్చడం.</li>
              <li><code>strptime(string, format)</code>: టెక్స్ట్ రూపంలో ఉన్న టైం ని మళ్ళీ పైథాన్ ఆబ్జెక్ట్ గా మార్చడం.</li>
            </ul>
          </li>
        </ul>`,
        code: `import datetime as dt

# 1. ఇప్పటి టైం తీసుకుందాం
now = dt.datetime.now()
print("Current Timestamp:", now)

# 2. మనకు నచ్చినట్లు టెక్స్ట్ (స్ట్రింగ్) గా ఫార్మాట్ చేద్దాం
formatted_date = now.strftime("%A, %d %B %Y | %I:%M:%S %p")
print("Formatted Date:   ", formatted_date)

# 3. డేట్ మ్యాథ్స్ (ఇంకో 30 రోజులు కలుపుదాం)
today = dt.date.today()
expiry_date = today + dt.timedelta(days=30)
days_remaining = (expiry_date - today).days

print(f"\\nSubscription Start: {today}")
print(f"Subscription Expiry: {expiry_date} ({days_remaining} days left)")

# 4. యూజర్ ఇచ్చిన టెక్స్ట్ ని డేట్ గా మారుద్దాం (Parsing)
user_input_str = "2026-12-25"
parsed_date = dt.datetime.strptime(user_input_str, "%Y-%m-%d").date()
print("Parsed Holiday Date:", parsed_date)`,
        codeTitle: 'Example 3: Working with datetime, timedeltas and formatting',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 ఫార్మాట్ కోడ్స్ గుర్తుంచుకోండి:</strong>
          <ul style="margin:8px 0 0 18px; line-height:1.7;">
            <li><code>%Y</code>: సంవత్సరం (2026), <code>%m</code>: నెల (01-12), <code>%d</code>: రోజు (01-31).</li>
            <li><code>%H</code>: 24-గంటల టైం, <code>%I</code>: 12-గంటల టైం, <code>%p</code>: AM లేదా PM.</li>
          </ul>
        </div>`
      },
      {
        title: '4. The statistics మాడ్యూల్: డేటా అనాలిసిస్',
        body: `<p><strong><code>statistics</code> మాడ్యూల్</strong> అనేది NumPy లాంటి పెద్ద లైబ్రరీల అవసరం లేకుండానే బేసిక్ స్టాటిస్టిక్స్ (సగటు, మధ్యగతం) చూసుకోవడానికి వాడతారు:</p>
        <ul>
          <li><code>mean(data)</code>: యావరేజ్ కనుక్కుంటుంది.</li>
          <li><code>median(data)</code>: ఆర్డర్ లో పెట్టి మధ్యలో ఉన్న వాల్యూ ఇస్తుంది.</li>
          <li><code>mode(data)</code>: ఎక్కువసార్లు రిపీట్ అయినదాన్ని ఇస్తుంది.</li>
          <li><code>stdev(data)</code>: స్టాండర్డ్ డీవియేషన్ (వాల్యూస్ ఎంత దూరం లో ఉన్నాయో) చెప్తుంది.</li>
        </ul>`,
        code: `import statistics as stats

exam_scores = [78, 85, 92, 85, 99, 64, 85, 90, 72, 88]

avg_score = stats.mean(exam_scores)
median_score = stats.median(exam_scores)
most_common = stats.mode(exam_scores)
spread = stats.stdev(exam_scores)

print("Dataset:", exam_scores)
print("=" * 40)
print(f"• Mean (Average):     {avg_score:.2f}")
print(f"• Median (Midpoint):  {median_score}")
print(f"• Mode (Most Common): {most_common}")
print(f"• Standard Deviation: {spread:.2f}")`,
        codeTitle: 'Example 4: Statistical Metrics with statistics Module',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 ఇంటర్వ్యూ పాయింట్:</strong>
          <p style="margin-top:6px;">శాలరీలు లాంటి డేటాని చూసేటప్పుడు ఒకరి జీతం కోటి రూపాయలు ఉన్నా <code>mean()</code> (యావరేజ్) తప్పు చూపిస్తుంది. అలాంటి టైమ్ లో <code>median()</code> వాడటమే చాలా కరెక్ట్.</p>
        </div>`
      }
    ],
    mistake: {
      title: 'సెక్యూరిటీ కోసం random మాడ్యూల్ వాడటం',
      text: 'random మాడ్యూల్ లో నెంబర్స్ పక్కా రాండమ్ కాదు (Pseudo-random). ఒక హ్యాకర్ 624 అవుట్పుట్స్ చూసి నెక్స్ట్ ఏమొస్తుందో చెప్పేయగలడు. కాబట్టి పాస్వర్డ్స్ కి ఎప్పుడూ "secrets" మాడ్యూల్ వాడాలి.'
    },
    tryIt: {
      desc: 'ఒక ప్రోగ్రామ్ రాసి, ఒక 6-డిజిట్ రాండమ్ OTP జనరేట్ చేయండి. దానికి datetime వాడి ఇంకో 5 నిమిషాల్లో టైం అయిపోతుంది అని ప్రింట్ చేయండి.',
      code: `import random
import datetime as dt

otp = random.randint(100000, 999999)
now = dt.datetime.now()
expiry = now + dt.timedelta(minutes=5)

print(f"🔑 Your One-Time Password (OTP): {otp}")
print(f"⏳ Generated At: {now.strftime('%H:%M:%S')}")
print(f"⌛ Valid Until:  {expiry.strftime('%H:%M:%S')} (5 mins expiry)")`
    },
    faqs: [
      {
        q: 'random.choice() కి random.choices() కి తేడా ఏంటి?',
        a: 'choice() ఒక్కటే ఇస్తుంది. choices() అనేది మీకు కావాల్సినన్ని (k=3) ఇస్తుంది, కానీ ఒకటే మళ్ళీ మళ్ళీ వచ్చే ఛాన్స్ ఉంది (with replacement).'
      },
      {
        q: 'random.seed() ఎందుకు వాడతారు?',
        a: 'ఒకవేళ మీరు random.seed(42) అని పైన రాస్తే, మీరు ఈ కోడ్ ఎప్పుడు రన్ చేసినా అవే రాండమ్ నెంబర్స్ వస్తాయి. టెస్టింగ్ లో కరెక్ట్ గా చెక్ చేసుకోవడానికి ఇది వాడతారు.'
      }
    ]
  },

  // =========================================================================
  // CHAPTER 22: SYSTEM, OS & FILE OPERATIONS (PHASE 5)
  // =========================================================================
  {
    num: 22,
    phaseId: 'phase5',
    phaseTitle: 'Phase 5: Modules and Packages',
    slug: '22-python-os-sys-and-pathlib',
    title: 'Python OS, Sys & Pathlib Guide (తెలుగులో)',
    badge: '22. OS, Sys & Pathlib',
    subtopics: 'os Module · sys System Hooks · Modern pathlib Object Paths · Directory Traversal · Environment Variables',
    desc: 'Python తో ఆపరేటింగ్ సిస్టం తో మాట్లాడటం ఎలా? ఫైల్స్, ఫోల్డర్స్ తో పనిచేయడానికి os, sys మరియు సరికొత్త మోడ్రన్ pathlib మాడ్యూల్స్ గురించి నేర్చుకుందాం.',
    sections: [
      {
        title: '1. OS తో ఇంటరాక్ట్ అవ్వడం: The os Module',
        body: `<p><strong><code>os</code> మాడ్యూల్</strong> మీ ఆపరేటింగ్ సిస్టం (Windows, Mac, Linux) తో సంబంధం లేకుండా పని చేయగలిగే ఫంక్షన్స్ ఇస్తుంది:</p>
        <ul>
          <li><strong>Environment Variables:</strong> <code>os.environ</code> (కంప్యూటర్ లో దాచిన API కీస్, పాస్వర్డ్స్ కి). ఎప్పుడైనా <code>os.getenv("KEY")</code> వాడితే ఎర్రర్ రాకుండా సేఫ్ గా ఉంటుంది.</li>
          <li><strong>ఫోల్డర్స్ చూడటం:</strong> <code>os.getcwd()</code> (మనం ఏ ఫోల్డర్ లో ఉన్నాం), <code>os.chdir(path)</code> (వేరే ఫోల్డర్ కి జంప్ అవ్వడం).</li>
          <li><strong>ఫోల్డర్స్ క్రియేట్ చేయడం:</strong> <code>os.mkdir()</code> (ఒకటి క్రియేట్ చేస్తుంది), <code>os.makedirs(path, exist_ok=True)</code> (లోపల లోపల ఫోల్డర్స్ ఉంటే అన్నీ ఒకేసారి క్రియేట్ చేస్తుంది).</li>
          <li><strong>ఫైల్స్ చూడటం & డిలీట్:</strong> <code>os.listdir()</code> (ఫైల్స్ లిస్ట్ ఇస్తుంది), <code>os.remove()</code> (ఫైల్ డిలీట్ చేస్తుంది).</li>
        </ul>`,
        code: `# మీ OS డీటెయిల్స్ మరియు ఫోల్డర్స్ చూద్దాం:
import os

print("Operating System Name:", os.name) # Windows అయితే 'nt', Mac/Linux అయితే 'posix'
print("Current Working Directory:", os.getcwd())

# ఎన్విరాన్మెంట్ వేరియబుల్స్ తీసుకుందాం:
db_user = os.getenv("DB_USER", "default_admin")
print("Database User:", db_user)

# ఈ ఫోల్డర్ లో ఉన్న ఫైల్స్ చూద్దాం (హిడెన్ ఫైల్స్ వదిలేసి):
dir_files = [f for f in os.listdir(".") if not f.startswith(".")]
print(f"Top 5 files in current directory: {dir_files[:5]}")`,
        codeTitle: 'Example 1: Operating System Interface with os Module',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 సెక్యూరిటీ రూల్:</strong>
          <p style="margin-top:6px;">API Keys, డేటాబేస్ పాస్వర్డ్స్ లాంటివి డైరెక్ట్ గా కోడ్ లో అస్సలు రాయకూడదు. వాటిని మీ కంప్యూటర్ లో వేరియబుల్ గా సెట్ చేసి <code>os.getenv()</code> ద్వారానే తెచ్చుకోవాలి.</p>
        </div>`
      },
      {
        title: '2. పైథాన్ లోపల ఏం జరుగుతోంది?: The sys Module',
        body: `<p><strong><code>sys</code> మాడ్యూల్</strong> పైథాన్ ఇంటర్ప్రెటర్ తో డైరెక్ట్ గా మాట్లాడటానికి వాడతారు:</p>
        <ul>
          <li><code>sys.argv</code>: మీరు టెర్మినల్ లో ఫైల్ రన్ చేసేటప్పుడు పక్కన ఇచ్చే టెక్స్ట్ (కమాండ్ లైన్ ఆర్గ్యుమెంట్స్) అన్నీ ఈ లిస్ట్ లో ఉంటాయి.</li>
          <li><code>sys.exit(0)</code>: పైథాన్ ప్రోగ్రాం ని మధ్యలోనే ఆపేసి బయటికి వచ్చేయడం (0 అంటే ఎర్రర్ లేకుండా అని అర్థం).</li>
          <li><code>sys.version</code>: మీ పైథాన్ వెర్షన్ ఏంటి అని చెప్తుంది.</li>
          <li><code>sys.getsizeof(obj)</code>: ఒక వేరియబుల్ ఎంత RAM (మెమరీ) తీసుకుంటుందో బైట్స్ లో చెప్తుంది.</li>
        </ul>`,
        code: `import sys

print(f"🐍 Python Runtime Version: {sys.version.split()[0]}")
print(f"💻 OS Platform Identifier: {sys.platform}")
print(f"📥 Command-line Arguments (sys.argv): {sys.argv}")

# వేర్వేరు ఆబ్జెక్ట్స్ ఎంత మెమరీ తీసుకుంటున్నాయో చూద్దాం (bytes లో):
int_size = sys.getsizeof(100)
str_size = sys.getsizeof("Hello, World!")
list_size = sys.getsizeof([1, 2, 3, 4, 5])

print(f"\\nMemory Footprint:")
print(f"• Integer (100):      {int_size} bytes")
print(f"• String ('Hello..'): {str_size} bytes")
print(f"• List ([1..5]):      {list_size} bytes")`,
        codeTitle: 'Example 2: Python Interpreter Inspection via sys Module',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 sys.argv ఎలా పనిచేస్తుంది?:</strong>
          <p style="margin-top:6px;">ఒకవేళ మీరు టెర్మినల్ లో <code>python app.py report.pdf</code> అని కొడితే, <code>sys.argv</code> లో <code>['app.py', 'report.pdf']</code> అని రెండు వస్తాయి.</p>
        </div>`
      },
      {
        title: '3. మోడ్రన్ ఫైల్ పాత్స్ (The new pathlib)',
        body: `<p>పాత రోజుల్లో ఫైల్ పాత్ కోసం స్ట్రింగ్స్ (<code>os.path.join</code>) వాడేవాళ్ళు. కానీ పైథాన్ 3 లో తీసుకొచ్చిన <strong><code>pathlib.Path</code></strong> అనేది చాలా స్మార్ట్. ఇది ఒక <code>/</code> వాడి ఫోల్డర్స్ ని కలుపుతుంది.</p>
        <div class="diagram-box">పాత స్ట్రింగ్ పద్ధతి: os.path.join("data", "users", "report.csv")
మోడ్రన్ pathlib పద్ధతి: Path("data") / "users" / "report.csv"  (సూపర్ క్లీన్)</div>
        <p>దీని వల్ల విండోస్ లో (<code>\\</code>), లైనక్స్ లో (<code>/</code>) వచ్చే క్రాష్ ఇష్యూస్ అన్నీ అదే సాల్వ్ చేసేసుకుంటుంది.</p>`,
        code: `from pathlib import Path

# 1. / వాడి పాత్ ని క్రియేట్ చేయడం:
data_folder = Path("my_project") / "data"
config_file = data_folder / "app_config.json"

print("Path Object:", config_file)
print("Filename (name):", config_file.name)      # app_config.json
print("Filename stem:  ", config_file.stem)      # app_config (పేరు)
print("Extension:      ", config_file.suffix)    # .json
print("Parent Folder:  ", config_file.parent)    # my_project/data

# 2. ఒకే లైన్ లో ఫైల్ రైట్ చేసి రీడ్ చేయడం (Open/Close రాయక్కర్లేదు!):
test_file = Path("demo_note.txt")
test_file.write_text("Hello from Python pathlib! 🚀", encoding="utf-8")

file_content = test_file.read_text(encoding="utf-8")
print(f"\\nRead file content: '{file_content}'")

# క్లీన్ అప్ (Delete):
if test_file.exists():
    test_file.unlink() # ఫైల్ డిలీట్ అయిపోతుంది
    print("Cleaned up demo_note.txt ✅")`,
        codeTitle: 'Example 3: Object-Oriented File Paths with pathlib.Path',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 ఎంత ఈజీ అంటే:</strong>
          <p style="margin-top:6px;">ఫైల్ ఉందా అని చెక్ చేయడానికి <code>test_file.exists()</code> అంటే చాలు. ఓపెన్, క్లోజ్ లతో పని లేకుండా ఒకే లైన్ లో <code>.read_text()</code> అని డేటా మొత్తం తెచ్చేసుకోవచ్చు.</p>
        </div>`
      },
      {
        title: '4. ఫైల్స్ వెతకడం (Pattern Globbing with Path.glob)',
        body: `<p>మీకు ఒక ఫోల్డర్ లో ఉన్న <code>.py</code> ఫైల్స్ అన్నీ కావాలనుకుంటే <strong>Globbing</strong> వాడతారు:</p>
        <ul>
          <li><code>path.glob("*.py")</code>: ఆ ఫోల్డర్ లో ఉన్న పైథాన్ ఫైల్స్ అన్నింటినీ ఇస్తుంది.</li>
          <li><code>path.rglob("*.py")</code>: <strong>Recursive</strong> - ఆ ఫోల్డర్ తో పాటు దాని లోపల ఉన్న వందల ఫోల్డర్స్ లో కూడా వెతుకుతుంది!</li>
        </ul>`,
        code: `from pathlib import Path

current_dir = Path(".")

# ఈ ఫోల్డర్ లో ఉన్న HTML ఫైల్స్ అన్నీ వెతుకుదాం:
html_files = list(current_dir.glob("*.html"))
print(f"Found {len(html_files)} HTML files in current root.")

# మొదటి 3 ఫైల్స్ సైజు (bytes లో) చూద్దాం:
for f in html_files[:3]:
    print(f"• File: {f.name:25} | Size: {f.stat().st_size} bytes")`,
        codeTitle: 'Example 4: Pattern Searching with Path.glob',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Performance Advantage:</strong>
          <p style="margin-top:6px;"><code>Path.glob()</code> వాడితే లక్ష ఫైల్స్ ఉన్నా సిస్టమ్ స్లో అవ్వదు (Generator వాడటం వల్ల RAM బతికిపోతుంది).</p>
        </div>`
      }
    ],
    mistake: {
      title: 'ఫైల్ పాత్స్ ని ప్లస్ (+) తో కలపడం',
      text: 'f = "folder" + "\\\\" + "file.txt" అని హార్డ్ కోడ్ చేస్తే, ఆ కోడ్ రేపు Linux సర్వర్ లో రన్ చేస్తే క్రాష్ అవుతుంది (లైనక్స్ లో క్రాస్ స్లాష్ / ఉంటుంది). అందుకే ఎప్పుడూ Path("folder") / "file.txt" అనే వాడాలి.'
    },
    tryIt: {
      desc: 'pathlib వాడి "logs/2026/app.log" అనే పాత్ ని తయారుచేసి, దాని పేరెంట్ డైరెక్టరీ ఏంటో, దానికి ఎక్స్టెన్షన్ ఏముందో ప్రింట్ చేయండి.',
      code: `from pathlib import Path

log_path = Path("logs") / "2026" / "app.log"

print("Constructed Path:", log_path)
print("Parent Directory:", log_path.parent)
print("File Extension:  ", log_path.suffix)
print("Does file exist? ", log_path.exists())`
    },
    faqs: [
      {
        q: 'sys.exit(0) కి sys.exit(1) కి తేడా ఏంటి?',
        a: '0 తో ఎగ్జిట్ అయితే, కంప్యూటర్ కి "కోడ్ సక్సెస్ ఫుల్ గా అయిపోయింది" అని సిగ్నల్ వెళ్తుంది. 1 వాడితే "ఏదో ఎర్రర్ వచ్చింది" అని సిగ్నల్ వెళ్తుంది.'
      },
      {
        q: 'లోపల లోపల ఉన్న ఫోల్డర్స్ క్రియేట్ చేసేటప్పుడు ఎర్రర్ రాకుండా ఎలా?',
        a: 'os.makedirs("my/deep/folder", exist_ok=True) అని రాస్తే, అప్పటికే ఆ ఫోల్డర్ ఉంటే క్రాష్ అవ్వకుండా సైలెంట్ గా వదిలేస్తుంది.'
      }
    ]
  },

  // =========================================================================
  // CHAPTER 23: PYTHON JSON SERIALIZATION (PHASE 5)
  // =========================================================================
  {
    num: 23,
    phaseId: 'phase5',
    phaseTitle: 'Phase 5: Modules and Packages',
    slug: '23-python-json-serialization-and-data',
    title: 'Python JSON Serialization Guide (తెలుగులో)',
    badge: '23. JSON Data Interchange',
    subtopics: 'JSON Specification · json.dumps() vs dump() · json.loads() vs load() · Type Mappings · Custom Encoders',
    desc: 'వెబ్ టెక్నాలజీస్ లో కింగ్ అయిన JSON తో పైథాన్ లో ఎలా డీల్ చేయాలి? డిక్షనరీస్ ని JSON గా మార్చడం (dumps, loads), ఫైల్స్ లోకి పంపడం, డేట్ (datetime) ని మార్చే కస్టమ్ ఎన్కోడర్స్ (Custom Encoders) గురించి నేర్చుకుందాం.',
    sections: [
      {
        title: '1. JSON ఫార్మాట్ & పైథాన్ డేటా టైప్స్ మ్యాపింగ్',
        body: `<p><strong>JSON (JavaScript Object Notation)</strong> అనేది ఇంటర్నెట్ లో డేటాని పంచుకోవడానికి (APIs, Web) వాడే ఒక యూనివర్సల్ టెక్స్ట్ ఫార్మాట్.</p>
        <p>పైథాన్ లోని <strong><code>json</code> మాడ్యూల్</strong> మన డిక్షనరీస్ ని JSON గాను, JSON ని డిక్షనరీ గాను మార్చగలదు (దీన్నే Serialization అంటారు). కింది టేబుల్ లో ఏది ఏలా మారుతుందో చూడండి:</p>
        <table class="tbl" style="margin-top:8px; font-size:12.5px;">
          <tr><th>Python Object</th><th>JSON Equivalent</th><th>Notes</th></tr>
          <tr><td><code>dict</code></td><td><code>object</code> (<code>{...}</code>)</td><td>డిక్షనరీ లాగే ఉంటుంది</td></tr>
          <tr><td><code>list</code>, <code>tuple</code></td><td><code>array</code> (<code>[...]</code>)</td><td>ట్యూపుల్స్ కూడా అర్రే గా మారిపోతాయి</td></tr>
          <tr><td><code>str</code></td><td><code>string</code></td><td>టెక్స్ట్ (డబుల్ కోట్స్)</td></tr>
          <tr><td><code>int</code>, <code>float</code></td><td><code>number</code></td><td>నెంబర్స్</td></tr>
          <tr><td><code>True</code> / <code>False</code></td><td><code>true</code> / <code>false</code></td><td>స్మాల్ లెటర్స్ లోకి మారుతుంది</td></tr>
          <tr><td><code>None</code></td><td><code>null</code></td><td>నల్ రిఫరెన్స్</td></tr>
        </table>`,
        code: `# పైథాన్ డేటాని JSON లోకి మారుద్దాం:
import json

python_payload = {
    "user_id": 101,
    "username": "balaji_dev",
    "is_admin": True,
    "roles": ("Backend", "DevOps"), # ఇది Array (List) గా మారుతుంది
    "profile": None,                # ఇది null అవుతుంది
    "rating": 4.95
}

# 1. డిక్షనరీ ని టెక్స్ట్ (స్ట్రింగ్) గా మారుద్దాం (dumps):
json_string = json.dumps(python_payload)
print("JSON Output String:")
print(json_string)`,
        codeTitle: 'Example 1: Translating Python Data Types to JSON',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 గమనించారా?:</strong>
          <p style="margin-top:6px;"><code>True</code> కాస్తా <code>true</code> (స్మాల్ లెటర్) అయింది. <code>None</code> కాస్తా <code>null</code> అయింది. ఇది JSON ఇంటర్నేషనల్ రూల్!</p>
        </div>`
      },
      {
        title: '2. మెమరీలో మార్చడం: json.dumps() మరియు json.loads()',
        body: `<p><strong>"s" (string)</strong> తో ఎండ్ అయ్యే ఈ రెండు ఫంక్షన్స్ డేటాని ఫైల్ లో కాకుండా డైరెక్ట్ మెమరీలో టెక్స్ట్ లాగా (స్ట్రింగ్ గా) మారుస్తాయి:</p>
        <ul>
          <li><code>json.dumps(obj)</code>: ఒక పైథాన్ ఆబ్జెక్ట్ ని <strong>JSON టెక్స్ట్ (స్ట్రింగ్)</strong> గా మారుస్తుంది (Dump String).</li>
          <li><code>json.loads(str)</code>: <strong>JSON టెక్స్ట్</strong> ని చదివి, దాన్ని మనకు పైథాన్ డిక్షనరీ లాగా ఇస్తుంది (Load String).</li>
        </ul>`,
        code: `import json

# 1. అందంగా కనిపించడానికి indent (స్పేస్) వాడి మార్చుదాం:
server_config = {
    "host": "127.0.0.1",
    "port": 8000,
    "debug": False,
    "allowed_hosts": ["localhost", "ourcompiler.com"]
}

pretty_json = json.dumps(server_config, indent=4, sort_keys=True)
print("--- 💅 Pretty Formatted JSON ---")
print(pretty_json)

# 2. బయట ఎక్కడో API నుంచి వచ్చిన టెక్స్ట్ ని పైథాన్ లోకి మారుద్దాం:
raw_api_response = '{"status": 200, "message": "Success", "data": [10, 20, 30]}'
parsed_dict = json.loads(raw_api_response)

print("\\n--- 🔄 Parsed Python Dictionary ---")
print("Status Code:", parsed_dict["status"])
print("Data items: ", parsed_dict["data"])
print("Python Type:", type(parsed_dict).__name__)`,
        codeTitle: 'Example 2: In-Memory Serialization with json.dumps and json.loads',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 ఎక్కడ వాడతారు?:</strong>
          <p style="margin-top:6px;">వెబ్ API (ఉదా: <code>requests.get()</code>) నుంచి రిజల్ట్ వస్తే అది టెక్స్ట్ లానే ఉంటుంది. దాన్ని <code>json.loads()</code> ద్వారా లోపలికి లాగితేనే మనం డిక్షనరీ లాగా <code>data['status']</code> అని వాడుకోగలం.</p>
        </div>`
      },
      {
        title: '3. ఫైల్స్ లోకి చదవడం/రాయడం: json.dump() మరియు json.load()',
        body: `<p>ఒకవేళ మీరు టెక్స్ట్ తో కాకుండా, డైరెక్ట్ గా ఒక ఫైల్ (<code>.json</code>) లో రాయాలన్నా లేదా అక్కడినుంచి చదవాలన్నా <strong>s</strong> లేని ఫంక్షన్స్ వాడాలి:</p>
        <ul>
          <li><code>json.dump(obj, file)</code>: ఆబ్జెక్ట్ ని ఫైల్ లోపల సేవ్ చేస్తుంది.</li>
          <li><code>json.load(file)</code>: ఫైల్ ని చదివి డిక్షనరీ గా ఇస్తుంది.</li>
        </ul>`,
        code: `import json
from pathlib import Path

settings_file = Path("user_settings.json")

# సేవ్ చేయాల్సిన డేటా:
user_preferences = {
    "theme": "dark",
    "font_size": 14,
    "auto_save": True,
    "recent_files": ["main.py", "models.py", "utils.py"]
}

# 1. ఫైల్ ఓపెన్ చేసి డైరెక్ట్ గా అందులోకి డంప్ (dump) చేద్దాం:
with open(settings_file, "w", encoding="utf-8") as f:
    json.dump(user_preferences, f, indent=4)
print(f"✅ Saved settings to {settings_file}")

# 2. ఆ ఫైల్ ని ఓపెన్ చేసి డేటాని లోడ్ (load) చేసుకుందాం:
with open(settings_file, "r", encoding="utf-8") as f:
    loaded_settings = json.load(f)

print(f"📖 Loaded Theme: {loaded_settings['theme']} | Font: {loaded_settings['font_size']}px")

# మన డెమో ఫైల్ డిలీట్ చేసేద్దాం:
settings_file.unlink()`,
        codeTitle: 'Example 3: File Stream Serialization with json.dump and json.load',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 బెస్ట్ ప్రాక్టీస్:</strong>
          <p style="margin-top:6px;">JSON ఫైల్స్ ని ఓపెన్ చేసేటప్పుడు కచ్చితంగా <code>encoding="utf-8"</code> రాయాలి. లేకపోతే ఎమోజీలు లేదా తెలుగు అక్షరాలు సరిగ్గా సేవ్ అవ్వవు (విండోస్ లో).</p>
        </div>`
      },
      {
        title: '4. డేట్/టైం ని JSON లోకి మార్చడం (Custom Encoders)',
        body: `<p>ఒకవేళ మీరు పైథాన్ <code>datetime</code> ని లేదా <code>set</code> ని JSON లాగా మార్చమని అడిగితే <code>TypeError: Object is not JSON serializable</code> వస్తుంది. ఎందుకంటే JSON కి డేట్స్, సెట్స్ అర్థం కావు.</p>
        <p>దీన్ని సాల్వ్ చేయడానికి మనం ఒక చిన్న <strong>కస్టమ్ ఎన్కోడర్ (Custom Handler)</strong> రాసి <code>default</code> కి ఇవ్వాలి:</p>`,
        code: `import json
import datetime as dt

def custom_json_serializer(obj):
    """అర్థంకాని టైప్స్ ని JSON కి అర్థమయ్యే టెక్స్ట్ గా మారుస్తుంది."""
    if isinstance(obj, (dt.datetime, dt.date)):
        return obj.isoformat() # Date ని ఇంటర్నేషనల్ టెక్స్ట్ గా మారుస్తుంది
    if isinstance(obj, set):
        return list(obj)       # Set ని లిస్ట్ గా మార్చి ఇస్తుంది
    raise TypeError(f"Type {type(obj)} is not serializable!")

# Date మరియు Set తో కూడిన ఒక డిక్షనరీ:
transaction = {
    "invoice_id": "INV-2026-894",
    "timestamp": dt.datetime.now(),                      # Datetime ఆబ్జెక్ట్
    "unique_categories": {"Electronics", "Accessories"}, # Set కలెక్షన్
    "amount": 499.99
}

# మన ఫంక్షన్ ని default=custom_json_serializer గా పంపుదాం
serialized_json = json.dumps(transaction, default=custom_json_serializer, indent=2)
print("--- 🛡️ Custom Serialized JSON ---")
print(serialized_json)`,
        codeTitle: 'Example 4: Custom JSON Serializer for Datetime and Sets',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 ఇండస్ట్రీ స్టాండర్డ్:</strong>
          <p style="margin-top:6px;">తేదీలని ఎప్పుడూ <code>ISO 8601</code> స్ట్రింగ్ గా (ఉదా: <code>2026-08-14T15:30:00</code>) సేవ్ చేయడం వరల్డ్ వైడ్ రూల్.</p>
        </div>`
      }
    ],
    mistake: {
      title: 'json.loads() కి json.load() కి మధ్య కన్ఫ్యూజన్',
      text: 'loads(str) అంటే టెక్స్ట్ (స్ట్రింగ్) తీసుకుంటుంది. load(file) అంటే ఓపెన్ చేసిన ఫైల్ తీసుకుంటుంది. మీరు json.load(టెక్స్ట్) అని ఇస్తే AttributeError వస్తుంది.'
    },
    tryIt: {
      desc: 'ఒక స్టూడెంట్ డీటెయిల్స్ తో డిక్షనరీ తయారుచేసి దాన్ని అందమైన JSON ఫార్మాట్ (indent=2) గా ప్రింట్ చేయండి.',
      code: `import json

student_record = {
    "name": "Alex Smith",
    "grade": "12th",
    "subjects": ["Math", "Physics", "Computer Science"],
    "passed": True
}

json_output = json.dumps(student_record, indent=2)
print("Pretty JSON Output:")
print(json_output)`
    },
    faqs: [
      {
        q: 'json.dumps({"a": 1}) పనిచేసింది కానీ json.dumps({(1, 2): "val"}) ఎందుకు ఫెయిల్ అవుతుంది?',
        a: 'JSON రూల్స్ ప్రకారం డిక్షనరీ Keys ఎప్పుడూ టెక్స్ట్ (స్ట్రింగ్స్) లోనే ఉండాలి. పైథాన్ లో లాగా ట్యూపుల్స్ ని Keys గా పెడితే JSON కి అర్థం కాదు.'
      },
      {
        q: 'నెట్వర్క్ లో డేటా పంపేటప్పుడు సైజ్ తగ్గించడం ఎలా (Compact JSON)?',
        a: 'json.dumps(obj, separators=(",", ":")) వాడితే మధ్యలో ఉన్న స్పేసెస్ అన్నీ మాయమైపోయి మొత్తం ఒకే లైన్ లోకి కుదించుకుపోయి వస్తుంది. దీనివల్ల ఇంటర్నెట్ బ్యాండ్విడ్త్ కలిసివస్తుంది.'
      }
    ]
  },

  // =========================================================================
  // CHAPTER 24: PYTHON PACKAGES, VENV & PIP (PHASE 5)
  // =========================================================================
  {
    num: 24,
    phaseId: 'phase5',
    phaseTitle: 'Phase 5: Modules and Packages',
    slug: '24-python-packages-virtual-environments-and-pip',
    title: 'Python Packages, Virtual Environments & Pip (తెలుగులో)',
    badge: '24. Packages, venv & Pip',
    subtopics: 'Packages & __init__.py · Namespace Packages · venv Isolation · pip & PyPI · requirements.txt · Dependency Locking',
    desc: 'ప్రొఫెషనల్ పైథాన్ ప్రాజెక్ట్స్ ఎలా క్రియేట్ చేయాలి? ప్యాకేజెస్ తయారుచేయడం, Virtual Environments తో ప్రాజెక్ట్స్ ని ఐసోలేట్ చేయడం, pip తో బయటి ప్యాకేజెస్ ఇన్స్టాల్ చేయడం, మరియు requirements.txt గురించి.',
    sections: [
      {
        title: '1. Package అంటే ఏంటి? __init__.py ఏం చేస్తుంది?',
        body: `<p><strong>Package</strong> అంటే ఒకట్రెండు పైథాన్ ఫైల్స్ కాకుండా, ఫోల్డర్స్ తో కూడిన ఒక పెద్ద కలెక్షన్. ఒక మాడ్యూల్ అంటే ఒక ఫైల్, కానీ ప్యాకేజ్ అంటే <strong>చాలా ఫైల్స్ ఉన్న ఒక ఫోల్డర్</strong>.</p>
        <p>ప్యాకేజ్ స్ట్రక్చర్ ఇలా ఉంటుంది:</p>
        <div class="diagram-box">my_application/
├── __init__.py             <-- ఈ ఫోల్డర్ ని పైథాన్ ప్యాకేజ్ అంటాం అని చెప్పే ఫైల్
├── config.py               <-- సబ్-మాడ్యూల్
├── database/               <-- లోపల ఇంకో ప్యాకేజ్ (Subpackage)
│   ├── __init__.py
│   ├── connection.py
│   └── queries.py
└── utils/                  <-- ఇంకో సబ్-ప్యాకేజ్
    ├── __init__.py
    └── helpers.py</div>
        <h4 style="color:#10b981; margin:16px 0 8px;"><code>__init__.py</code> ఎందుకు?:</h4>
        <ol>
          <li>ఈ ఫైల్ పెడితేనే పైథాన్ ఆ ఫోల్డర్ ని ప్యాకేజ్ లాగా గుర్తిస్తుంది.</li>
          <li>ఎవరైనా మీ ప్యాకేజ్ ని ఇంపోర్ట్ చేయగానే, అందులో మీరు ముందుగానే ఈ ఫైల్ లో రాసిన కోడ్ ఆటోమేటిక్ గా రన్ అవుతుంది.</li>
        </ol>`,
        code: `# __init__.py లో రాసిన కోడ్
"""
Package: my_ecommerce
Version: 1.0.0
"""
__version__ = "1.0.0"

def get_package_info():
    return f"My E-Commerce Engine v{__version__}"

# ఎవరైనా main.py లో దీన్ని వాడితే:
print("Package Info:", get_package_info())`,
        codeTitle: 'Example 1: Package Structure and Initialization',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 ఒక చిన్న నోట్:</strong>
          <p style="margin-top:6px;">పైథాన్ 3.3 నుంచి <code>__init__.py</code> రాయకపోయినా ప్యాకేజ్ లానే పనిచేస్తుంది. కానీ పెద్ద కంపెనీస్ అన్నీ ఇప్పటికీ ఆ ఫైల్ వాడటాన్నే ఫాలో అవుతున్నాయి.</p>
        </div>`
      },
      {
        title: '2. Virtual Environments (venv) ఎందుకు వాడుతారు?',
        body: `<p>ఒకవేళ మీరు టెర్మినల్ లో <code>pip install django</code> అంటే, అది మీ కంప్యూటర్ మొత్తానికి (Global గా) ఇన్స్టాల్ అవుతుంది.</p>
        <p><strong>దీనివల్ల వచ్చే ప్రాబ్లం:</strong></p>
        <ul>
          <li>Project A కి పాత <code>Django 4.2</code> కావాలి.</li>
          <li>Project B కి కొత్త <code>Django 5.1</code> కావాలి.</li>
          <li>మీరు కొత్తది ఇన్స్టాల్ చేయగానే పాతది ఎగిరిపోయి Project A పాడైపోతుంది!</li>
        </ul>
        <p>దీన్ని సాల్వ్ చేయడానికే ప్రతి ప్రాజెక్ట్ కి ఒక <strong>Virtual Environment (<code>.venv</code>)</strong> ని క్రియేట్ చేస్తారు. ఇది ఆ ప్రాజెక్ట్ వరకు మాత్రమే పనిచేసే ఒక "సొంత పైథాన్ ఫోల్డర్" లాంటిది.</p>
        <div class="diagram-box">┌────────────────────────────────────────────────────────┐
│  మీ కంప్యూటర్ (Global Python)                          │
├────────────────────────────────────────────────────────┤
│  📁 Project A (.venv)      📁 Project B (.venv)        │
│  ├── Python 3.12           ├── Python 3.12             │
│  └── Django 4.2            └── Django 5.1              │
└────────────────────────────────────────────────────────┘</div>`,
        code: `# టెర్మినల్ లో రన్ చేయాల్సిన కమాండ్స్:

# 1. ప్రాజెక్ట్ ఫోల్డర్ లో .venv ని క్రియేట్ చేయడం:
# python -m venv .venv

# 2. దాన్ని ఆన్ చేయడం (Activate)
# Windows (PowerShell):
# .venv\\Scripts\\Activate.ps1
#
# Mac / Linux:
# source .venv/bin/activate

# 3. పని అయిపోయాక ఆఫ్ చేయడం (Deactivate):
# deactivate`,
        codeTitle: 'Example 2: Virtual Environment Lifecycle Commands',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 PowerShell ఎర్రర్ వస్తే?:</strong>
          <p style="margin-top:6px;">విండోస్ లో ఎర్రర్ వస్తే, అడ్మిన్ గా పవర్ షెల్ ఓపెన్ చేసి <code>Set-ExecutionPolicy RemoteSigned</code> అని ఇవ్వాలి.</p>
        </div>`
      },
      {
        title: '3. ప్యాకేజ్ మేనేజ్మెంట్: pip & PyPI',
        body: `<p><strong><code>pip</code></strong> అంటే పైథాన్ అఫీషియల్ ప్యాకేజ్ ఇన్స్టాలర్. ఇది ప్రపంచంలో ఉన్న లక్షలాది ఓపెన్-సోర్స్ కోడ్ ని <strong>PyPI (Python Package Index)</strong> నుంచి మన ప్రాజెక్ట్ లోకి డౌన్లోడ్ చేస్తుంది.</p>
        <h4 style="color:#10b981; margin:16px 0 8px;">ముఖ్యమైన pip కమాండ్స్:</h4>
        <ul>
          <li><code>pip install django</code>: లేటెస్ట్ వెర్షన్ ని డౌన్లోడ్ చేస్తుంది.</li>
          <li><code>pip install "django==4.2.0"</code>: పక్కాగా ఇదే వెర్షన్ కావాలని చెప్పడం (పిన్ చేయడం).</li>
          <li><code>pip install --upgrade requests</code>: పాతదాన్ని కొత్త వెర్షన్ కి అప్డేట్ చేయడం.</li>
          <li><code>pip list</code>: మనం మన <code>.venv</code> లో ఏమేమి ఇన్స్టాల్ చేసామో లిస్ట్ చూపిస్తుంది.</li>
          <li><code>pip uninstall django</code>: దాన్ని డిలీట్ చేస్తుంది.</li>
        </ul>`,
        code: `# టెర్మినల్ కమాండ్స్:

# పాపులర్ ప్యాకేజెస్ ఇన్స్టాల్ చేద్దాం:
# pip install requests fastapi uvicorn

# ఇన్స్టాల్ అయిన ఒక ప్యాకేజ్ డీటెయిల్స్ చూద్దాం:
# pip show requests

# మన ఫోల్డర్ లో ఉన్న అన్ని ప్యాకేజెస్ లిస్ట్:
# pip list`,
        codeTitle: 'Example 3: Managing Packages with pip',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 బెస్ట్ ప్రాక్టీస్:</strong>
          <p style="margin-top:6px;">ఎప్పుడూ మీ టెర్మినల్ పేరు పక్కన <code>(.venv)</code> అని ఆక్టివేట్ అయి ఉందో లేదో చూసుకున్నాకే <code>pip install</code> రన్ చేయండి.</p>
        </div>`
      },
      {
        title: '4. వేరే వాళ్ళకి ప్రాజెక్ట్ పంపడం: requirements.txt',
        body: `<p>మీరు మీ కోడ్ ని Github లో పెట్టినా, లేదా సర్వర్ లో రన్ చేయాలన్నా, ఆ కంప్యూటర్ కి <strong>ఏయే ప్యాకేజెస్, ఏ వెర్షన్స్ కావాలో</strong> ఖచ్చితంగా చెప్పాలి.</p>
        <p>దానికోసం వాడే ఫైల్ పేరే <strong><code>requirements.txt</code></strong>:</p>
        <div class="diagram-box"># మీరు ఇన్స్టాల్ చేసిన లిస్ట్ అంతా ఒక ఫైల్ లోకి పంపడానికి:
pip freeze > requirements.txt

# వేరే కంప్యూటర్ లో ఆ ఫైల్ చూసి అన్ని ప్యాకేజెస్ ఒకేసారి డౌన్లోడ్ చేయడానికి:
pip install -r requirements.txt</div>
        <h4 style="color:#10b981; margin:16px 0 8px;">వెర్షన్ సింబల్స్:</h4>
        <ul>
          <li><code>fastapi == 0.110.0</code>: కరెక్ట్ గా ఇదే వెర్షన్ కావాలి. (బెస్ట్).</li>
          <li><code>requests >= 2.31.0</code>: దీనికంటే పై వెర్షన్ ఏదైనా ఓకే.</li>
        </ul>`,
        code: `# ప్రొడక్షన్ కోసం వాడే ఒక requirements.txt ఫైల్ ఇలా ఉంటుంది:
sample_requirements_txt = """
# Core Web Framework
fastapi==0.110.0
uvicorn[standard]==0.29.0

# Database
SQLAlchemy==2.0.29

# Utilities
pydantic==2.6.4
requests>=2.31.0
"""

print("--- 📋 Production requirements.txt Blueprint ---")
print(sample_requirements_txt.strip())`,
        codeTitle: 'Example 4: Production requirements.txt File Format',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Git Ignore రూల్:</strong>
          <p style="margin-top:6px;">మీరు మీ కోడ్ ని Git లో పెట్టేటప్పుడు ఎప్పుడూ <code>.venv/</code> ఫోల్డర్ ని <code>.gitignore</code> లో పెట్టి ఇగ్నోర్ చేయాలి. కేవలం <code>requirements.txt</code> ని మాత్రమే పంపించాలి!</p>
        </div>`
      }
    ],
    mistake: {
      title: '.venv ఫోల్డర్ ని Github కి పంపడం',
      text: 'ఇలా పంపితే మీ రిపోజిటరీ ఫుల్ అయిపోతుంది. పైగా మీ విండోస్ .venv ఫైల్స్ లైనక్స్ ఉన్న వేరే వాళ్ళ కంప్యూటర్ లో పనిచేయవు. ఎప్పుడూ దాన్ని gitignore చేయాలి.'
    },
    tryIt: {
      desc: 'ఒక వేరియబుల్స్ లిస్ట్ తీసుకుని, దాన్ని requirements.txt లో ఎలా సేవ్ చేయాలో (పేరు==వెర్షన్) ప్రింట్ చేయండి.',
      code: `installed_packages = [
    ("fastapi", "0.110.0"),
    ("uvicorn", "0.29.0"),
    ("requests", "2.31.0"),
    ("pydantic", "2.6.4")
]

print("Generated requirements.txt:")
for pkg, version in installed_packages:
    print(f"{pkg}=={version}")`
    },
    faqs: [
      {
        q: 'Module, Package, Library కి తేడా మళ్లీ చెప్తారా?',
        a: 'ఒక .py ఫైల్ ని Module అంటాం. చాలా మాడ్యూల్స్ ఉన్న ఫోల్డర్ ని Package అంటాం. ఇలాంటి చాలా ప్యాకేజెస్ ని కలిపి ఆన్లైన్ లో పెడితే దాన్ని Library (ఉదా: Pandas) అంటాం.'
      },
      {
        q: 'requirements.txt పాతది అయిపోయిందా? వేరేవి వాడుతున్నారా?',
        a: 'ఇప్పటికీ ఇదే చాలా పాపులర్. కానీ కొంచెం మోడ్రన్ ప్రాజెక్ట్స్ లో Poetry (pyproject.toml) లేదా uv లాంటి ఫాస్ట్ టూల్స్ వాడుతున్నారు.'
      }
    ]
  }
];
