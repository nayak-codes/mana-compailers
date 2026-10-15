// Phase 8: Advanced Python Data (Deep Conceptual Theory & Step-by-Step Breakdowns)
module.exports = [
  // =========================================================================
  // CHAPTER 36: ITERATORS, GENERATORS & GENERATOR EXPRESSIONS
  // =========================================================================
  {
    num: 36,
    phaseId: 'phase8',
    phaseTitle: 'Phase 8: Advanced Python',
    slug: '36-python-iterators-generators-and-expressions',
    title: 'Python Iterators & Generators (తెలుగులో)',
    badge: '36. Iterators & Generators',
    subtopics: 'Iterable vs Iterator Protocol · __iter__() & __next__() · yield Keyword · State Suspension · Generator Expressions · Big Data Streams',
    desc: 'పైథాన్ లో పెద్ద పెద్ద ఫైల్స్ ని (GBs of Data) మెమరీ క్రాష్ అవ్వకుండా ఎలా చదవాలి? Iterators అంటే ఏంటి? Generators లో yield కీవర్డ్ ఎలా పనిచేస్తుంది? తెలుసుకుందాం.',
    sections: [
      {
        title: '1. Iterator Protocol అంటే ఏంటి? (Iterable vs Iterator)',
        body: `<p>పైథాన్ లో లూప్స్ (for loop) అంత ఈజీగా ఎలా పనిచేస్తాయి? దీని వెనుక <strong>Iterator Protocol</strong> అనే లాజిక్ ఉంటుంది. ఇందులో రెండు మెయిన్ క్యారెక్టర్స్ ఉంటాయి:</p>
        
        <h4 style="color:#10b981; margin:16px 0 8px;">1. Iterable అంటే ఏంటి?</h4>
        <p><strong>Iterable</strong> అంటే ఒక బాక్స్ లాంటిది. అందులోనుంచి మనం ఐటమ్స్ ని ఒక్కొక్కటిగా బయటకి తీయొచ్చు. లిస్ట్స్ (Lists), స్ట్రింగ్స్ (Strings), సెట్స్ ఇవన్నీ iterables. వీటికి <strong><code>__iter__()</code></strong> అనే ఫంక్షన్ ఉంటుంది.</p>

        <h4 style="color:#10b981; margin:16px 0 8px;">2. Iterator అంటే ఏంటి?</h4>
        <p><strong>Iterator</strong> అంటే ఆ బాక్స్ లోపల ఉండే ఒక పాయింటర్ (Cursor). ఇది ఏ ఐటమ్ దాకా వచ్చాం అనేది గుర్తుపెట్టుకుంటుంది. దీనికి రెండు ఫంక్షన్స్ ఉంటాయి:</p>
        <ul>
          <li><strong><code>__iter__()</code>:</strong> తనను తానే రిటర్న్ చేస్తుంది.</li>
          <li><strong><code>__next__()</code>:</strong> తర్వాతి ఐటమ్ ని ఇస్తుంది. ఐటమ్స్ అన్నీ అయిపోతే <strong><code>StopIteration</code></strong> అనే ఎర్రర్ ఇచ్చి లూప్ ని ఆపేస్తుంది.</li>
        </ul>

        <div class="diagram-box">┌────────────────────────────────────────────────────────────────────────┐
│                     THE PYTHON ITERATOR PROTOCOL                       │
├────────────────────────────────────────────────────────────────────────┤
│  Iterable: data = [10, 20, 30]                                         │
│  └── దీన్ని పిలుస్తాం: it = iter(data)                                  │
│                                                                        │
│  Iterator పాయింటర్ (it):                                                │
│  ├── next(it) -> 10  (పాయింటర్ 1 వ పొజిషన్ కి వెళ్ళింది)                │
│  ├── next(it) -> 20  (పాయింటర్ 2 వ పొజిషన్ కి వెళ్ళింది)                │
│  ├── next(it) -> 30  (పాయింటర్ 3 వ పొజిషన్ కి వెళ్ళింది)                │
│  └── next(it) -> raises StopIteration! (అయిపోయింది, లూప్ ఆపు!)           │
└────────────────────────────────────────────────────────────────────────┘</div>`,
        code: `# Iterator Protocol ని మాన్యువల్ గా స్టెప్-బై-స్టెప్ చూద్దాం:
fruits = ["Apple", "Mango", "Banana"]

# స్టెప్ 1: లిస్ట్ నుంచి iterator పాయింటర్ ని తీసుకుందాం:
fruit_stream = iter(fruits)
print("Iterator Type:", type(fruit_stream))

# స్టెప్ 2: ఒక్కొక్క ఐటమ్ ని next() వాడి అడుగుదాం:
print("1st Fetch:", next(fruit_stream)) # 'Apple'
print("2nd Fetch:", next(fruit_stream)) # 'Mango'
print("3rd Fetch:", next(fruit_stream)) # 'Banana'

# స్టెప్ 3: అన్నీ అయిపోయాయి కాబట్టి మళ్ళీ అడిగితే StopIteration వస్తుంది:
try:
    next(fruit_stream)
except StopIteration:
    print("🛑 StopIteration Exception Caught: లిస్ట్ కంప్లీట్ అయిపోయింది!")`,
        codeTitle: 'Example 1: Manually Driving an Iterator with iter() and next()',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 "for" లూప్ లోపల ఏం జరుగుతుంది?:</strong>
          <p style="margin-top:6px;">మీరు <code>for x in fruits:</code> అని రాసినప్పుడు, పైథాన్ లోపల ఈ <code>iter()</code> మరియు <code>next()</code> లనే పదే పదే పిలుస్తుంది. <code>StopIteration</code> రాగానే ఎర్రర్ చూపించకుండా సైలెంట్ గా లూప్ ని ఆపేస్తుంది.</p>
        </div>`
      },
      {
        title: '2. Generators & "yield" కీవర్డ్ మ్యాజిక్',
        body: `<p><strong>Generator</strong> అనేది ఒక స్పెషల్ ఫంక్షన్. ఇది ఒకేసారి మొత్తం ఆన్సర్ ని ఇవ్వకుండా, మీరు అడిగినప్పుడల్లా ఒక్కో వాల్యూ ఇస్తుంది. దీనివల్ల కంప్యూటర్ ర్యామ్ (RAM) చాలా సేవ్ అవుతుంది.</p>

        <h4 style="color:#10b981; margin:16px 0 8px;">return కి, yield కి ఉన్న తేడా:</h4>
        <ul>
          <li><strong><code>return</code>:</strong> ఇది వాడితే ఫంక్షన్ పని మొత్తం అయిపోయినట్టు. లోపల ఉన్న వేరియబుల్స్ అన్నీ మెమరీ నుండి డిలీట్ అయిపోతాయి.</li>
          <li><strong><code>yield</code>:</strong> ఇది ఒక మ్యాజిక్ లాంటిది. దీన్ని వాడితే ఆ ఫంక్షన్ అక్కడే <strong>పాజ్ (Pause)</strong> అవుతుంది. ఆ వాల్యూని బయటకి ఇచ్చేసి, లోపల ఉన్న వేరియబుల్స్ ని అలాగే మెమరీలో ఫ్రీజ్ చేసి పెడుతుంది. నెక్స్ట్ టైమ్ పిలిచినప్పుడు మళ్ళీ అక్కడి నుండే స్టార్ట్ అవుతుంది!</li>
        </ul>`,
        code: `# ఒక జనరేటర్ ఫంక్షన్ (yield వాడుతూ):
def countdown_timer(start_seconds):
    """కౌంట్ డౌన్ నెంబర్స్ ఇస్తుంది."""
    current = start_seconds
    while current > 0:
        print(f"  [లోపల] {current} ని ఇస్తున్నాను, ఫంక్షన్ ఇక్కడ ఫ్రీజ్ అవుతుంది...")
        yield current
        current -= 1 # నెక్స్ట్ టైమ్ పిలిచినప్పుడు ఇక్కడినుండి స్టార్ట్ అవుతుంది!
    print("  [లోపల] కౌంట్ డౌన్ ఫినిష్!")

print("--- జనరేటర్ ఫంక్షన్ ని కాల్ చేద్దాం ---")
# జనరేటర్ ఫంక్షన్ ని పిలిస్తే లోపల కోడ్ రన్ అవ్వదు, జస్ట్ ఒక ఆబ్జెక్ట్ ఇస్తుంది:
timer_gen = countdown_timer(3)
print("Generator Object Created:", timer_gen)

print("\\n--- లూప్ వాడి ఒక్కొక్క వాల్యూ తీసుకుందాం ---")
for sec in timer_gen:
    print(f"👉 Received: {sec}s remaining")`,
        codeTitle: 'Example 2: Generator Function with yield and State Suspension',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 మెమరీ లాభం ఏంటి?:</strong>
          <p style="margin-top:6px;">ఒకవేళ మీరు 1 కోటి నెంబర్స్ ని ఒక లిస్ట్ లో స్టోర్ చేస్తే ~80MB ర్యామ్ పోతుంది. కానీ జనరేటర్ వాడితే, అది అడిగినప్పుడే ఇస్తుంది కాబట్టి కేవలం <strong>~120 Bytes</strong> ర్యామ్ మాత్రమే తీసుకుంటుంది!</p>
        </div>`
      },
      {
        title: '3. Generator Expressions (షార్ట్ కట్)',
        body: `<p>లిస్ట్ కాంప్రహెన్షన్ (List Comprehension) లాగానే ఉంటుంది, కానీ స్క్వేర్ బ్రాకెట్స్ <code>[...]</code> బదులు రౌండ్ బ్రాకెట్స్ <code>(...)</code> వాడతాం. దీన్నే <strong>Generator Expression</strong> అంటారు.</p>
        
        <table class="tbl" style="margin-top:8px; font-size:12.5px;">
          <tr><th>లక్షణం</th><th>List Comprehension <code>[...]</code></th><th>Generator Expression <code>(...)</code></th></tr>
          <tr><td><strong>ఎలా పనిచేస్తుంది?</strong></td><td>ఒకేసారి మొత్తం లిస్ట్ ని క్రియేట్ చేస్తుంది (Eager).</td><td>అడిగినప్పుడు మాత్రమే ఒక్కొక్కటిగా ఇస్తుంది (Lazy).</td></tr>
          <tr><td><strong>మెమరీ</strong></td><td>ఎక్కువ డేటా ఉంటే ర్యామ్ అంతా నిండిపోతుంది.</td><td>ఎంత డేటా ఉన్నా ర్యామ్ అసలు తీసుకోదు!</td></tr>
        </table>`,
        code: `import sys

# 1. List Comprehension (10 లక్షల నెంబర్స్ ని ఒకేసారి మెమరీలో పెడుతుంది):
list_squares = [x ** 2 for x in range(1_000_000)]

# 2. Generator Expression (మెమరీ తీసుకోదు, అడిగితే ఆన్సర్ చెప్పడానికి రెడీగా ఉంటుంది):
gen_squares = (x ** 2 for x in range(1_000_000))

print(f"📦 List Comprehension మెమరీ: {sys.getsizeof(list_squares):,} bytes (~8.4 MB)")
print(f"⚡ Generator Expression మెమరీ:  {sys.getsizeof(gen_squares):,} bytes (చాలా తక్కువ!)")

# సమ్ ఫంక్షన్ లోపల డైరెక్ట్ గా వాడుకోవచ్చు:
total_sum = sum(x ** 2 for x in range(1000)) # లోపల బ్రాకెట్స్ కూడా అక్కర్లేదు!
print(f"\\nమొదటి 1000 నెంబర్స్ స్క్వేర్స్ టోటల్: {total_sum:,}")`,
        codeTitle: 'Example 3: Memory Footprint Comparison & Aggregation Functions',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 బెస్ట్ ప్రాక్టీస్:</strong>
          <p style="margin-top:6px;">మీరు <code>sum()</code>, <code>max()</code>, <code>min()</code> వాడేటప్పుడు ఎప్పుడూ రౌండ్ బ్రాకెట్స్ (Generator) వాడండి, మెమరీ ఫుల్ అవ్వకుండా ఉంటుంది.</p>
        </div>`
      }
    ],
    mistake: {
      title: 'అయిపోయిన Generator ని మళ్ళీ వాడటం',
      text: 'జనరేటర్స్ వన్-వే ట్రాఫిక్ లాంటివి. ఒకసారి లూప్ లో వాడుకున్నాక అవి ఖాళీ అయిపోతాయి (StopIteration). మళ్ళీ ప్రింట్ చేస్తే ఏమీ రాదు. మళ్ళీ కావాలంటే కొత్త జనరేటర్ క్రియేట్ చేసుకోవాలి.'
    },
    tryIt: {
      desc: 'ఒక ఫంక్షన్ fibonacci(limit) రాయండి. అది yield వాడుతూ, limit దాటకుండా ఫిబొనాచీ సిరీస్ నెంబర్స్ ని ఇవ్వాలి.',
      code: `def fibonacci(limit):
    a, b = 0, 1
    while a <= limit:
        yield a
        a, b = b, a + b

print("100 లోపు ఫిబొనాచీ నెంబర్స్:")
for num in fibonacci(100):
    print(num, end=" ")
print()`
    },
    faqs: [
      {
        q: 'yield మరియు yield from కి తేడా ఏంటి?',
        a: 'yield from అనేది ఒక షార్ట్ కట్. ఇంకొక జనరేటర్ నుంచి వాల్యూస్ తెచ్చి ఇవ్వాలంటే (ఉదా: yield from range(10)) ఇలా డైరెక్ట్ గా వాడొచ్చు.'
      },
      {
        q: 'రన్ అవుతున్న జనరేటర్ లోకి మనం డేటా పంపొచ్చా?',
        a: 'పంపొచ్చు! generator.send(value) అని వాడితే, జనరేటర్ లోపల ఆ yield దగ్గరికి ఆ వాల్యూ వెళ్తుంది.'
      }
    ]
  },

  // =========================================================================
  // CHAPTER 37: CLOSURES, DECORATORS & WRAPPERS
  // =========================================================================
  {
    num: 37,
    phaseId: 'phase8',
    phaseTitle: 'Phase 8: Advanced Python',
    slug: '37-python-closures-decorators-and-wrappers',
    title: 'Closures & Decorators (తెలుగులో)',
    badge: '37. Closures & Decorators',
    subtopics: 'First-Class Functions · Lexical Closures · @decorator Syntax · functools.wraps · Decorators with Arguments · Execution Timers · Role Authorization',
    desc: 'పైథాన్ లో ఫంక్షన్స్ తో మ్యాజిక్ ఎలా చేయాలి? ఒక ఫంక్షన్ కి అదనపు పవర్ ఇవ్వాలంటే (ఉదా: టైమర్, లాగిన్ చెక్) @decorators ఎలా రాయాలో చూద్దాం.',
    sections: [
      {
        title: '1. ఫంక్షన్స్ కూడా ఒక వేరియబుల్ లాంటివే (First-Class Functions & Closures)',
        body: `<p>పైథాన్ లో ఫంక్షన్స్ ని మనం చాలా ఫ్రీగా వాడుకోవచ్చు. ఒక ఫంక్షన్ ని ఇంకో ఫంక్షన్ లోపల రాయొచ్చు, ఒక ఫంక్షన్ ని రిటర్న్ (return) చేయొచ్చు.</p>

        <h4 style="color:#10b981; margin:16px 0 8px;">Closure (క్లోజర్) అంటే ఏంటి?</h4>
        <p>ఒక బయటి ఫంక్షన్ లోపల ఇంకో చిన్న ఫంక్షన్ రాసి, ఆ చిన్న ఫంక్షన్ బయటి వేరియబుల్స్ ని వాడుకుని, తర్వాత ఆ చిన్న ఫంక్షన్ నే రిటర్న్ చేస్తే... ఆ బయటి వేరియబుల్స్ కూడా ఆ చిన్న ఫంక్షన్ తో పాటే <strong>గుర్తుండిపోతాయి!</strong> దాన్నే <strong>Closure</strong> అంటారు.</p>`,
        code: `# ఒక ఫంక్షన్ ని తయారు చేసే ఫంక్షన్ (Factory):
def make_power_calculator(exponent):
    """బయటి ఫంక్షన్."""
    def power(base):
        """లోపలి ఫంక్షన్ (ఇది బయట ఉన్న 'exponent' ని వాడుకుంటోంది)."""
        return base ** exponent
    return power  # ఇక్కడ ఆ ఫంక్షన్ నే రిటర్న్ చేస్తున్నాం!

# ఇప్పుడు మనకి నచ్చిన పవర్ ఫంక్షన్స్ తయారు చేద్దాం:
square = make_power_calculator(2) # ఇది స్క్వేర్ చేసే ఫంక్షన్ అవుతుంది
cube = make_power_calculator(3)   # ఇది క్యూబ్ చేసే ఫంక్షన్ అవుతుంది

print("Square of 5:", square(5))  # 25 (exponent 2 అని దీనికి గుర్తుంది)
print("Cube of 5:  ", cube(5))    # 125 (exponent 3 అని దీనికి గుర్తుంది)
print("స్క్వేర్ లోపల ఫ్రీజ్ అయిన వాల్యూ:", square.__closure__[0].cell_contents)`,
        codeTitle: 'Example 1: Function Factory Closures Retaining Enclosing State',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 పైథాన్ లాజిక్:</strong>
          <p style="margin-top:6px;">మామూలుగా ఫంక్షన్ అవ్వగానే దాని లోపల ఉన్న వేరియబుల్స్ అన్నీ డిలీట్ అవ్వాలి. కానీ <code>exponent</code> ని లోపలి ఫంక్షన్ వాడుకుంటోంది కాబట్టి, దాన్ని సేవ్ చేసి ఉంచుతుంది (అదే <code>__closure__</code>).</p>
        </div>`
      },
      {
        title: '2. Decorators & @functools.wraps (ఒక ఫంక్షన్ కి మేకప్ వేయడం)',
        body: `<p><strong>Decorator</strong> అంటే ఒక ఫంక్షన్ కి ఎక్స్ట్రా ఫీచర్స్ (ఉదా: టైమ్ క్యాలిక్యులేట్ చేయడం) యాడ్ చేసే ఇంకో ఫంక్షన్. ఆ మెయిన్ ఫంక్షన్ లోపల కోడ్ మార్చకుండానే మనం అదనపు పనులు చేయొచ్చు.</p>
        
        <h4 style="color:#10b981; margin:16px 0 8px;"><code>@functools.wraps</code> ఖచ్చితంగా ఎందుకు వాడాలి?:</h4>
        <p>డెకరేటర్ వాడినప్పుడు, మన ఒరిజినల్ ఫంక్షన్ పేరు మాయమైపోయి, ర్యాపర్ ఫంక్షన్ పేరు వస్తుంది. దానివల్ల చాలా ఎర్రర్స్ వస్తాయి. దాన్ని కాపాడ్డానికి ఈ <code>wraps</code> వాడతాం.</p>`,
        code: `import functools
import time

def benchmark_timer(func):
    """ఫంక్షన్ ఎంతసేపు రన్ అయ్యిందో చెప్పే డెకరేటర్."""
    @functools.wraps(func)  # చాలా ముఖ్యం: ఇది వాడితేనే అసలు ఫంక్షన్ పేరు సేఫ్ గా ఉంటుంది!
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        
        result = func(*args, **kwargs)  # అసలు ఫంక్షన్ ని ఇక్కడ కాల్ చేస్తాం
        
        duration_ms = (time.perf_counter() - start) * 1000
        print(f"⏱️ [{func.__name__}] Finished in {duration_ms:.3f} ms")
        return result
    return wrapper

# డెకరేటర్ ని ఈజీగా @ వాడి అప్లై చేద్దాం:
@benchmark_timer
def process_data(limit):
    """నంబర్స్ ని యాడ్ చేసే పని."""
    return sum(x ** 2 for x in range(limit))

# ఫంక్షన్ ని పిలుద్దాం:
res = process_data(500_000)
print("Result Total:", res)
print("అసలు ఫంక్షన్ పేరు:", process_data.__name__)
print("అసలు ఫంక్షన్ కామెంట్:", process_data.__doc__)`,
        codeTitle: 'Example 2: Execution Timer Decorator with @functools.wraps',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 *args, **kwargs ఎందుకు?:</strong>
          <p style="margin-top:6px;">అసలు ఫంక్షన్ కి ఎన్ని ఆర్గ్యుమెంట్స్ ఉన్నాయో మనకు తెలియదు కదా. అందుకే <code>*args, **kwargs</code> అని రాస్తే, ఏ ఫంక్షన్ కైనా ఈ డెకరేటర్ సెట్ అవుతుంది.</p>
        </div>`
      },
      {
        title: '3. ఆర్గ్యుమెంట్స్ తీసుకునే డెకరేటర్స్ (3-Level Nesting)',
        body: `<p>కొన్నిసార్లు డెకరేటర్ కి కూడా ఆర్గ్యుమెంట్స్ పంపాలి (ఉదా: <code>@repeat(3)</code>). అప్పుడు దాన్ని 3-లెవెల్స్ గా రాయాలి:</p>
        <ol style="line-height:1.8; margin-left:20px;">
          <li><strong>లెవెల్ 1 (బయట):</strong> సెట్టింగ్స్ తీసుకుంటుంది (ఉదా: num_times).</li>
          <li><strong>లెవెల్ 2 (మధ్యలో):</strong> ఫంక్షన్ ని తీసుకుంటుంది.</li>
          <li><strong>లెవెల్ 3 (లోపల ర్యాపర్):</strong> అసలు పని చేస్తుంది (args తీసుకుని).</li>
        </ol>`,
        code: `import functools

def repeat(num_times=2):
    """డెకరేటర్ ఫ్యాక్టరీ (సెట్టింగ్స్ తీసుకుంటుంది)."""
    def decorator_repeat(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            last_result = None
            for i in range(num_times):
                print(f"🔄 Execution #{i+1} of {func.__name__}():")
                last_result = func(*args, **kwargs)
            return last_result
        return wrapper
    return decorator_repeat

# కస్టమ్ సెట్టింగ్స్ తో డెకరేటర్ ని వాడటం:
@repeat(num_times=3)
def send_alert(message):
    print(f"   🔔 ALERT: {message}")

send_alert("డేటాబేస్ కనెక్షన్ పోయింది!")`,
        codeTitle: 'Example 3: 3-Level Decorator Factory with Configurable Arguments',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 ప్రాక్టికల్ యూజ్:</strong>
          <p style="margin-top:6px;">వెబ్ డెవలప్మెంట్ లో <code>@app.get("/users")</code> అని రాస్తాం కదా, అక్కడ ఈ 3-లెవెల్ మ్యాజిక్కే జరుగుతుంది.</p>
        </div>`
      }
    ],
    mistake: {
      title: 'డెకరేటర్ కి బ్రాకెట్స్ () ఇవ్వడం మర్చిపోవడం',
      text: 'మీరు ఒకవేళ డెకరేటర్ ఫ్యాక్టరీ (ఉదా: def repeat(num=1):) రాస్తే, దాన్ని కచ్చితంగా బ్రాకెట్స్ తోనే పిలవాలి @repeat(). బ్రాకెట్స్ లేకుండా @repeat అని రాస్తే ఎర్రర్ వస్తుంది.'
    },
    tryIt: {
      desc: 'ఒక ఆథరైజేషన్ డెకరేటర్ require_role(allowed_role) రాయండి. యూజర్ "Admin" అయితేనే ఫంక్షన్ రన్ అవ్వాలి, లేకపోతే "Access Denied" అని చెప్పాలి.',
      code: `import functools

def require_role(allowed_role):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(user, *args, **kwargs):
            if user.get("role") != allowed_role:
                print(f"❌ Access Denied: '{user.get('name')}' కి పర్మిషన్ లేదు!")
                return None
            return func(user, *args, **kwargs)
        return wrapper
    return decorator

@require_role("Admin")
def purge_cache(user):
    print(f"✅ Cache purged successfully by {user['name']}!")

user1 = {"name": "Balaji", "role": "Admin"}
user2 = {"name": "Alex", "role": "Guest"}

purge_cache(user1) # సక్సెస్
purge_cache(user2) # బ్లాక్ చేయబడుతుంది`
    },
    faqs: [
      {
        q: 'ఒకే ఫంక్షన్ కి రెండు డెకరేటర్స్ వాడొచ్చా?',
        a: 'వాడొచ్చు! అప్పుడు కింద నుంచి పైకి రన్ అవుతాయి. (First కింద ఉన్న డెకరేటర్ అప్లై అవుతుంది, దానిపైన పై డెకరేటర్ అప్లై అవుతుంది).'
      },
      {
        q: 'functools.lru_cache అంటే ఏంటి?',
        a: 'ఇది పైథాన్ లో డీఫాల్ట్ గా ఉండే డెకరేటర్. ఇది ఒక ఫంక్షన్ ఇచ్చిన ఆన్సర్ ని గుర్తుపెట్టుకుంటుంది (Cache). మళ్ళీ అవే పారామీటర్స్ ఇస్తే రన్ చేయకుండా డైరెక్ట్ గా పాత ఆన్సర్ ఇచ్చేస్తుంది. చాలా స్పీడ్ అవుతుంది.'
      }
    ]
  },

  // =========================================================================
  // CHAPTER 38: CUSTOM CONTEXT MANAGERS & CONTEXTLIB
  // =========================================================================
  {
    num: 38,
    phaseId: 'phase8',
    phaseTitle: 'Phase 8: Advanced Python',
    slug: '38-python-custom-context-managers-and-contextlib',
    title: 'Context Managers & contextlib (తెలుగులో)',
    badge: '38. Context Managers',
    subtopics: '__enter__() and __exit__() Protocol · Suppressing Exceptions · @contextmanager Generator · Database Transaction & Timer Contexts',
    desc: 'ఫైల్స్ ని, డేటాబేస్ కనెక్షన్స్ ని మర్చిపోకుండా ఎలా క్లోజ్ చేయాలి? Context Managers (__enter__, __exit__) మరియు contextlib వాడి `with` స్టేట్మెంట్ ని మనకు నచ్చినట్టు ఎలా వాడుకోవాలో చూద్దాం.',
    sections: [
      {
        title: '1. Context Manager Protocol (__enter__ మరియు __exit__)',
        body: `<p>పైథాన్ లో మనం <code>with open("file.txt") as f:</code> అని రాస్తాం కదా? ఇందులో ఫైల్ ఓపెన్ అయ్యాక, ఆటోమాటిక్ గా ఎలా క్లోజ్ అవుతుంది? దీనికోసం <strong>Context Manager Protocol</strong> వాడతారు.</p>
        <p>ఒక క్లాస్ లో రెండు మెథడ్స్ రాస్తే అది కాంటెక్స్ట్ మేనేజర్ అవుతుంది:</p>
        <ol>
          <li><strong><code>__enter__(self)</code>:</strong> ఇది <code>with</code> బ్లాక్ స్టార్ట్ అవ్వగానే రన్ అవుతుంది.</li>
          <li><strong><code>__exit__(self, exc_type, exc_val, exc_tb)</code>:</strong> ఇది <code>with</code> బ్లాక్ అవ్వగానే రన్ అవుతుంది. లోపల ఏమైనా ఎర్రర్ వస్తే ఆ డీటెయిల్స్ ఇందులో ఉంటాయి. ఒకవేళ ఇక్కడ <code>True</code> రిటర్న్ చేస్తే, ఆ ఎర్రర్ బయటకి రాకుండా ఆగిపోతుంది!</li>
        </ol>`,
        code: `# మన ఓన్ ఫైల్ మేనేజర్ క్లాస్ ని రాద్దాం:
class ManagedFile:
    def __init__(self, filename, mode):
        self.filename = filename
        self.mode = mode
        self.file = None

    def __enter__(self):
        print(f"🔓 [__enter__] ఫైల్ ఓపెన్ చేస్తున్నాను: {self.filename}")
        self.file = open(self.filename, self.mode, encoding="utf-8")
        return self.file # ఇది 'as f' లోకి వెళ్తుంది

    def __exit__(self, exc_type, exc_val, exc_tb):
        print(f"🔒 [__exit__] ఫైల్ క్లోజ్ చేస్తున్నాను: {self.filename}")
        if self.file:
            self.file.close()
        # False రిటర్న్ చేస్తే ఎర్రర్స్ బయటకి మామూలుగానే వస్తాయి
        return False

# మన క్లాస్ ని 'with' వాడి టెస్ట్ చేద్దాం:
with ManagedFile("demo_context.txt", "w") as f:
    f.write("హలో! మన సొంత కాంటెక్స్ట్ మేనేజర్ నుండి రాస్తున్నాను! 🚀\\n")

print("ఫైల్ క్లోజ్ అయ్యిందా?", f.closed) # True!`,
        codeTitle: 'Example 1: Class-based Context Manager with __enter__ and __exit__',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 లాభం ఏంటి?:</strong>
          <p style="margin-top:6px;">ఒకవేళ మీరు ఫైల్ లో రాసేటప్పుడు పవర్ కట్ అయ్యి ఎర్రర్ (ఉదా: 0 తో డివైడ్ చేయడం) వచ్చినా సరే, <code>__exit__</code> ఖచ్చితంగా రన్ అయ్యి ఫైల్ ని సేఫ్ గా క్లోజ్ చేస్తుంది.</p>
        </div>`
      },
      {
        title: '2. contextlib.contextmanager (చిన్న షార్ట్ కట్)',
        body: `<p>ప్రతి చిన్నదానికీ ఇంత పెద్ద క్లాస్ రాయాలంటే చిరాకు కదా? అందుకే పైథాన్ లో <strong><code>@contextmanager</code></strong> అని ఒక డెకరేటర్ ఇచ్చారు. దీన్ని ఒక చిన్న జనరేటర్ ఫంక్షన్ (yield) పైన పెడితే, అదే కాంటెక్స్ట్ మేనేజర్ అయిపోతుంది!</p>
        <div class="diagram-box">1. yield పైన ఉన్న కోడ్  ==>  __enter__ లో రన్ అవుతుంది
2. yield లో ఇచ్చే వాల్యూ  ==>  'as x' లోకి వెళ్తుంది
3. yield కింద ఉన్న కోడ్ ==>  __exit__ (finally లోపల) రన్ అవుతుంది</div>`,
        code: `import time
from contextlib import contextmanager

# 1. 8 లైన్స్ లో టైమర్ కాంటెక్స్ట్ మేనేజర్:
@contextmanager
def code_timer(label="పని"):
    start = time.perf_counter()
    print(f"⏳ [{label}] స్టార్ట్ అయ్యింది...")
    try:
        yield # with బ్లాక్ లోపల ఉన్న కోడ్ అంతా ఇక్కడ రన్ అవుతుంది!
    finally:
        end = time.perf_counter()
        duration_ms = (end - start) * 1000
        print(f"⌛ [{label}] కంప్లీట్ అయ్యింది! ({duration_ms:.3f} ms పట్టింది)")

# మన టైమర్ ని వాడదాం:
with code_timer("డేటా ప్రాసెసింగ్"):
    # ఇక్కడ పెద్ద ప్రాసెస్ ఏదైనా రన్ చేయొచ్చు
    results = [x ** 2 for x in range(300_000)]
    time.sleep(0.05)`,
        codeTitle: 'Example 2: Elegant Generator Context Manager with contextlib',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 try-finally రూల్:</strong>
          <p style="margin-top:6px;">yield కింద రాసే క్లీన్-అప్ కోడ్ ఖచ్చితంగా <code>finally:</code> బ్లాక్ లోపలే రాయాలి. లేకపోతే లోపల ఎర్రర్ వస్తే క్లీన్-అప్ కోడ్ రన్ అవ్వదు.</p>
        </div>`
      }
    ],
    mistake: {
      title: 'Generator లో try-finally వాడకపోవడం',
      text: 'మీరు yield రాసి దాని కింద డైరెక్ట్ గా కోడ్ రాస్తే, with బ్లాక్ లో ఏమైనా ఎర్రర్ వస్తే ఆ కింద ఉన్న కోడ్ (క్లీన్-అప్) రన్ అవ్వకుండానే ఆగిపోతుంది. అందుకే ఎప్పుడూ yield ని try లో పెట్టి, క్లీన్-అప్ కోడ్ finally లో రాయాలి.'
    },
    tryIt: {
      desc: 'ఒక కాంటెక్స్ట్ మేనేజర్ temporary_setting రాయండి. ఒక డిక్షనరీ లో ఒక కీ కి టెంపరరీగా ఒక వాల్యూ ఇచ్చి, with బ్లాక్ అవ్వగానే పాత వాల్యూ మళ్ళీ సెట్ అవ్వాలి.',
      code: `from contextlib import contextmanager

@contextmanager
def temporary_setting(config_dict, key, temp_val):
    original_val = config_dict.get(key)
    config_dict[key] = temp_val
    try:
        yield
    finally:
        config_dict[key] = original_val

settings = {"debug": False, "env": "production"}
print("స్టార్టింగ్ లో:", settings)

with temporary_setting(settings, "debug", True):
    print("విత్ బ్లాక్ లోపల:", settings)

print("విత్ బ్లాక్ అయ్యాక:", settings)`
    },
    faqs: [
      {
        q: 'ఒకే with బ్లాక్ లో రెండు కాంటెక్స్ట్ మేనేజర్స్ వాడొచ్చా?',
        a: 'వాడొచ్చు! కామాలతో వేరు చేసి రాయాలి: with open("in.txt") as f_in, open("out.txt", "w") as f_out:.'
      },
      {
        q: 'contextlib.suppress అంటే ఏంటి?',
        a: 'ఇది ఒక చిన్న స్పెషల్ కాంటెక్స్ట్ మేనేజర్. మనం చెప్పిన ఎర్రర్ వస్తే, దాన్ని సైలెంట్ గా ఇగ్నోర్ చేసేస్తుంది. ఉదాహరణకు ఫైల్ డిలీట్ చేసేటప్పుడు (లేకపోయినా క్రాష్ అవ్వకుండా).'
      }
    ]
  },

  // =========================================================================
  // CHAPTER 39: FUNCTIONAL PROGRAMMING — MAP, FILTER, REDUCE
  // =========================================================================
  {
    num: 39,
    phaseId: 'phase8',
    phaseTitle: 'Phase 8: Advanced Python',
    slug: '39-python-functional-programming-map-filter-reduce',
    title: 'Functional Programming (map, filter, reduce) (తెలుగులో)',
    badge: '39. Functional Programming',
    subtopics: 'Higher-Order Functions · map() · filter() · functools.reduce() · Pure Transformations · Function Pipelines',
    desc: 'డేటాని ప్రాసెస్ చేయడానికి పెద్ద పెద్ద for-loops కాకుండా, ఫంక్షనల్ స్టైల్ లో map(), filter(), reduce() వాడి షార్ట్ కట్ లో ఎలా చేయాలో నేర్చుకుందాం.',
    sections: [
      {
        title: '1. Higher-Order Functions అంటే ఏంటి?',
        body: `<p>ఒక ఫంక్షన్ కి ఇంకో ఫంక్షన్ ని ఆర్గ్యుమెంట్ గా పంపిస్తే, ఆ మెయిన్ ఫంక్షన్ ని <strong>Higher-Order Function</strong> అంటారు. ఇందులో డేటాని డైరెక్ట్ గా మార్చకుండా (Pure Functions), కొత్త డేటాని ఇస్తాం.</p>
        <p>పైథాన్ లో మనకి డీఫాల్ట్ గా మూడు ఫేమస్ ఫంక్షన్స్ ఉన్నాయి: <strong><code>map()</code></strong>, <strong><code>filter()</code></strong>, మరియు <strong><code>reduce()</code></strong>.</p>`,
        code: `# మన సొంత Higher-Order Function రాద్దాం:
def apply_transformation(data_list, transform_func):
    return [transform_func(item) for item in data_list]

prices = [100, 250, 400]
gst_prices = apply_transformation(prices, lambda p: p * 1.18) # GST యాడ్ చేస్తున్నాం
discounted_prices = apply_transformation(prices, lambda p: p * 0.90) # డిస్కౌంట్ ఇస్తున్నాం

print("Original Prices:   ", prices)
print("With 18% GST:      ", gst_prices)
print("With 10% Discount: ", discounted_prices)`,
        codeTitle: 'Example 1: Higher-Order Function Transformation',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Declarative స్టైల్:</strong>
          <p style="margin-top:6px;">ఒక ఇండెక్స్ వేరియబుల్ పెట్టుకుని, లూప్ తిప్పుతూ డేటాని మార్చేకంటే... "ఈ లిస్ట్ పైన ఈ ఫంక్షన్ రన్ చెయ్యి" అని చెప్పడం చాలా క్లీన్ గా ఉంటుంది.</p>
        </div>`
      },
      {
        title: '2. map() మరియు filter() ఎలా వాడాలి?',
        body: `<p>పైథాన్ 3 లో <code>map()</code>, <code>filter()</code> రెండూ <strong>Lazy Iterators</strong> నే ఇస్తాయి (అంటే డైరెక్ట్ గా లిస్ట్ ని ఇవ్వవు, అడిగితే ఇస్తాయి).</p>
        <ul>
          <li><strong><code>map(func, iterable)</code>:</strong> ఆ లిస్ట్ లో ఉన్న ప్రతి ఐటమ్ మీద ఫంక్షన్ ని అప్లై చేసి ఇస్తుంది.</li>
          <li><strong><code>filter(func, iterable)</code>:</strong> ఆ లిస్ట్ లో ఫంక్షన్ ని టెస్ట్ చేసి, ట్రూ (True) వచ్చిన వాటిని మాత్రమే ఉంచుతుంది.</li>
        </ul>`,
        code: `# స్టూడెంట్స్ కి వచ్చిన మార్క్స్:
scores = [45, 88, 92, 35, 78, 60, 95]

# 1. filter() వాడి పాస్ అయినవాళ్లని (>= 50) తీద్దాం:
passing_scores = list(filter(lambda s: s >= 50, scores))
print("పాస్ అయిన వాళ్ళు (>= 50):", passing_scores)

# 2. map() వాడి పాస్ అయిన వాళ్లకి ఒక +5 బోనస్ ఇద్దాం (100 దాటకుండా):
curved_scores = list(map(lambda s: min(100, s + 5), passing_scores))
print("బోనస్ తో మార్క్స్ (+5):", curved_scores)`,
        codeTitle: 'Example 2: Data Pipelines with map() and filter()',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 map vs List Comprehensions:</strong>
          <p style="margin-top:6px;">మామూలు చిన్న పనులకి <code>[s+5 for s in scores if s>=50]</code> వాడటమే బెస్ట్. కానీ ఆల్రెడీ ఉన్న ఫంక్షన్స్ ని వాడాలంటే (ఉదా: <code>map(str.strip, strings)</code>) మ్యాప్ చాలా బాగుంటుంది.</p>
        </div>`
      },
      {
        title: '3. reduce() తో మొత్తాన్ని ఒకే నెంబర్ గా మార్చడం',
        body: `<p><strong><code>reduce(function, sequence)</code></strong> అనేది <code>functools</code> లో ఉంటుంది. ఇది లిస్ట్ లో ఉన్న మొదటి రెండు ఐటమ్స్ ని తీసుకుని, ఫంక్షన్ చేసి ఆన్సర్ పక్కన పెడుతుంది. మళ్ళీ ఆ ఆన్సర్ తో నెక్స్ట్ ఐటమ్ ని కలుపుతుంది. అలా మొత్తం ఒకే వాల్యూ అయ్యేవరకు చేస్తుంది.</p>
        <div class="diagram-box">Sequence: [1, 2, 3, 4] function (a, b) -> a * b
Step 1: (1 * 2) = 2
Step 2: (2 * 3) = 6
Step 3: (6 * 4) = 24  ==> ఫైనల్ ఆన్సర్: 24</div>`,
        code: `from functools import reduce

numbers = [1, 2, 3, 4, 5]

# 1. అన్ని నెంబర్స్ ని మల్టిప్లై చేద్దాం (Factorial):
product = reduce(lambda acc, val: acc * val, numbers)
print("Product of [1..5]:", product) # 120

# 2. అతిపెద్ద నెంబర్ కనుక్కోవడం (reduce వాడి):
raw_vals = [42, 17, 99, 23, 85]
max_val = reduce(lambda a, b: a if a > b else b, raw_vals)
print("Max value via reduce:", max_val) # 99`,
        codeTitle: 'Example 3: Cumulative Aggregation with functools.reduce',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Initial Value:</strong>
          <p style="margin-top:6px;">మీరు కావాలంటే స్టార్టింగ్ నెంబర్ కూడా ఇవ్వొచ్చు: <code>reduce(func, seq, 100)</code> అంటే 100 నుంచి క్యాలిక్యులేషన్ స్టార్ట్ అవుతుంది.</p>
        </div>`
      }
    ],
    mistake: {
      title: 'Python 3 లో map() డైరెక్ట్ గా ప్రింట్ చేయడం',
      text: 'Python 2 లో అది డైరెక్ట్ గా లిస్ట్ ని ఇచ్చేది. కానీ Python 3 లో map() ప్రింట్ చేస్తే "<map object at 0x...>" అని వస్తుంది. వాల్యూస్ చూడాలంటే list(map(...)) అని కన్వర్ట్ చేయాలి.'
    },
    tryIt: {
      desc: 'filter() వాడి "p" తో మొదలయ్యే పదాలను తీసుకుని, map() వాడి వాటిని అప్పర్ కేస్ (UPPERCASE) లోకి మార్చండి.',
      code: `words = ["python", "java", "Pandas", "c++", "PyTorch", "rust"]

p_words = list(map(str.upper, filter(lambda w: w.lower().startswith("p"), words)))
print("P-words మాత్రమే:", p_words)`
    },
    faqs: [
      {
        q: 'reduce() ని డీఫాల్ట్ పైథాన్ నుండి ఎందుకు తీసేశారు (functools లో ఎందుకు పెట్టారు)?',
        a: 'ఎందుకంటే చాలా పనులకి sum(), any(), all() లాంటి సింపుల్ ఫంక్షన్స్ సరిపోతాయి. reduce కొంచెం కాంప్లెక్స్ గా ఉంటుంది కాబట్టి, సపరేట్ లైబ్రరీలో పెట్టారు.'
      },
      {
        q: 'map() కి రెండు లిస్ట్స్ పంపొచ్చా?',
        a: 'పంపొచ్చు! map(lambda a, b: a + b, list1, list2) అని ఇస్తే, రెండు లిస్ట్స్ లో ఐటమ్స్ ప్యారలల్ గా యాడ్ అవుతాయి.'
      }
    ]
  },

  // =========================================================================
  // CHAPTER 40: REGULAR EXPRESSIONS & ADVANCED SYNTAX
  // =========================================================================
  {
    num: 40,
    phaseId: 'phase8',
    phaseTitle: 'Phase 8: Advanced Python',
    slug: '40-python-regular-expressions-and-pattern-matching',
    title: 'Regular Expressions (re) & Enums (తెలుగులో)',
    badge: '40. Regular Expressions & Enums',
    subtopics: 're Module · search() vs match() vs findall() · sub() String Replacement · Named Groups · enum.Enum · Destructuring & | Operator',
    desc: 'పెద్ద టెక్స్ట్ లో నుంచి ఈమెయిల్స్, ఫోన్ నెంబర్స్ లాంటివి ఎలా వెతకాలి? పైథాన్ లో `re` మాడ్యూల్, టైప్-సేఫ్ గా ఉండే Enums, మరియు కొత్త డిక్షనరీ ఆపరేటర్స్ గురించి నేర్చుకుందాం.',
    sections: [
      {
        title: '1. `re` మాడ్యూల్ తో ప్యాట్రన్స్ వెతకడం (search, findall)',
        body: `<p><strong>Regular Expression (RegEx)</strong> అంటే మనం వెతుకుతున్న టెక్స్ట్ ఎలాంటి ఫార్మాట్ లో ఉందో చెప్పే ఒక సీక్రెట్ కోడ్. దీనికోసం పైథాన్ లో <strong><code>re</code> మాడ్యూల్</strong> వాడుతాం.</p>
        <p>రెగ్యులర్ ఎక్స్ప్రెషన్స్ ఎప్పుడూ <strong>Raw Strings (<code>r"..."</code>)</strong> గా ఇవ్వాలి. అప్పుడు స్లాష్ లు (<code>\\d</code>) మామూలు స్ట్రింగ్స్ తో కన్ఫ్యూజ్ అవ్వవు:</p>
        <table class="tbl" style="margin-top:8px; font-size:12.5px;">
          <tr><th>ఫంక్షన్</th><th>ఏం చేస్తుంది?</th></tr>
          <tr><td><code>re.search()</code></td><td>మొత్తం టెక్స్ట్ వెతికి ఫస్ట్ దొరికిన దాన్ని ఇస్తుంది.</td></tr>
          <tr><td><code>re.match()</code></td><td>ఖచ్చితంగా టెక్స్ట్ స్టార్టింగ్ లో ఉంటేనే ఇస్తుంది.</td></tr>
          <tr><td><code>re.findall()</code></td><td>టెక్స్ట్ మొత్తం వెతికి మ్యాచింగ్ అయినవన్నీ ఒక లిస్ట్ లా ఇస్తుంది.</td></tr>
          <tr><td><code>re.sub()</code></td><td>మ్యాచింగ్ అయిన టెక్స్ట్ ని వేరే దానితో రీప్లేస్ చేస్తుంది (మార్చేస్తుంది).</td></tr>
        </table>`,
        code: `import re

log_text = """
2026-08-14 10:15:02 User balaji.dev@example.com logged in from 192.168.1.45.
2026-08-14 10:18:30 User alex_smith99@domain.org failed login from 10.0.0.12.
2026-08-14 10:22:11 User chloe.davis@techcorp.io logged in from 172.16.0.5.
"""

# 1. అన్ని ఈమెయిల్స్ ని బయటికి తీద్దాం (findall):
email_pattern = r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}'
emails = re.findall(email_pattern, log_text)
print("📧 దొరికిన ఈమెయిల్స్:")
for email in emails:
    print("•", email)

# 2. IP అడ్రెస్ లని బయటికి తీద్దాం:
ip_pattern = r'\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\b'
ips = re.findall(ip_pattern, log_text)
print("\\n🌐 దొరికిన ఐపీలు:", ips)

# 3. సెక్యూరిటీ కోసం ఈమెయిల్స్ ని హైడ్ చేద్దాం (sub):
masked_log = re.sub(email_pattern, "[CONFIDENTIAL_EMAIL]", log_text)
print("\\n🛡️ మాస్క్ చేసిన లాగ్స్:")
print(masked_log.strip())`,
        codeTitle: 'Example 1: Email and IP Discovery and Sanitization with re',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 కామన్ RegEx కోడ్స్:</strong>
          <ul style="margin:8px 0 0 18px; line-height:1.7;">
            <li><code>\\d</code>: ఏదైనా నెంబర్ (0-9). <code>\\w</code>: ఏదైనా లెటర్ లేదా నెంబర్.</li>
            <li><code>+</code>: 1 లేదా అంతకంటే ఎక్కువ. <code>*</code>: 0 లేదా అంతకంటే ఎక్కువ.</li>
            <li><code>\\b</code>: కరెక్ట్ గా ఒక పదం ఎండ్ అయ్యే చోట.</li>
          </ul>
        </div>`
      },
      {
        title: '2. Capture Groups (మనకు కావాల్సిన భాగాలు తీసుకోవడం)',
        body: `<p>రెగ్యులర్ ఎక్స్ప్రెషన్ లో మనం బ్రాకెట్స్ <code>(...)</code> పెడితే ఆ భాగాన్ని విడిగా తీసుకోవచ్చు (Capture Groups). దీన్ని ఫోన్ నెంబర్ కంట్రీ కోడ్స్, డేట్స్ విడదీయడానికి వాడతారు.</p>`,
        code: `import re

contact_str = "Support Hotline: +91-98765-43210 (Mon-Fri 9AM-6PM)"

# పేరు పెట్టి బ్రాకెట్స్ పెట్టుకుందాం (?P<పేరు>pattern):
phone_pattern = r'\+(?P<country_code>\d{1,3})-(?P<prefix>\d{3,5})-(?P<line_no>\d{4,6})'
match = re.search(phone_pattern, contact_str)

if match:
    print("ఫుల్ నెంబర్:      ", match.group(0))
    print("కంట్రీ కోడ్:       +", match.group("country_code"))
    print("లైన్ నెంబర్:        ", match.group("line_no"))
    print("డిక్షనరీ ఫార్మాట్:  ", match.groupdict())`,
        codeTitle: 'Example 2: Named Capture Groups with re.search',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Named Groups లాభం:</strong>
          <p style="margin-top:6px;"><code>(?P<name>...)</code> వాడితే దాన్ని డిక్షనరీ లాగా ఈజీగా <code>match.groupdict()</code> అని తీసేసుకోవచ్చు. ఏది ఎన్నో నెంబర్ అనేది గుర్తుపెట్టుకోనవసరం లేదు.</p>
        </div>`
      },
      {
        title: '3. Enums తో ఎర్రర్స్ లేకుండా కోడింగ్ (Type-Safe Enumerations)',
        body: `<p>మామూలుగా స్టేటస్ <code>"PENDING"</code> అని స్ట్రింగ్ లా ఇస్తే, పొరపాటున <code>"PENDNIG"</code> అని స్పెల్లింగ్ తప్పు రాస్తే పెద్ద బగ్ వస్తుంది. దానికి బదులు <strong><code>enum.Enum</code></strong> వాడితే స్పెల్లింగ్ తప్పులు రాకుండా కాపాడుకోవచ్చు.</p>`,
        code: `from enum import Enum, auto

class OrderStatus(Enum):
    PENDING = auto()    # దానంతట అదే 1, 2, 3 అని ఇచ్చుకుంటుంది
    PROCESSING = auto()
    SHIPPED = auto()
    DELIVERED = auto()
    CANCELLED = auto()

def update_order(order_id, status: OrderStatus):
    # Enum అవునో కాదో చెక్ చేద్దాం:
    if not isinstance(status, OrderStatus):
        raise TypeError("స్టేటస్ కచ్చితంగా OrderStatus అయి ఉండాలి!")
    print(f"📦 Order #{order_id} status updated to: {status.name} (Value: {status.value})")

update_order(1001, OrderStatus.PROCESSING)
update_order(1001, OrderStatus.DELIVERED)`,
        codeTitle: 'Example 3: Type-Safe Enumerations with enum.Enum',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Enums లాభాలు:</strong>
          <p style="margin-top:6px;">IDE లో డాట్ (.) కొట్టగానే ఆప్షన్స్ అన్నీ కనిపిస్తాయి (Autocomplete). అలాగే వేరే స్ట్రింగ్ ఇస్తే ముందే ఆపేస్తుంది.</p>
        </div>`
      },
      {
        title: '4. కొత్త డిక్షనరీ మెర్జ్ ఆపరేటర్ ( | )',
        body: `<p>Python 3.9 తర్వాత డిక్షనరీలని కలపడానికి ఒక కొత్త ఆపరేటర్ <strong><code>|</code> (Pipe)</strong> వచ్చింది.</p>`,
        code: `# 1. లిస్ట్ ని విడగొట్టడం (Destructuring):
numbers = [1, 2, 3, 4, 5, 6]
first, *middle, last = numbers
print(f"First: {first} | Middle: {middle} | Last: {last}")

# 2. డిక్షనరీలని కలపడం (Python 3.9+):
default_config = {"theme": "dark", "font_size": 14, "auto_save": True}
user_overrides = {"font_size": 16, "show_minimap": False}

# రెండు కలుపుదాం (కుడివైపు ఉన్నది ఎడమవైపు దాన్ని ఓవర్ రైట్ చేస్తుంది):
active_config = default_config | user_overrides
print("\\nMerged Active Config:")
print(active_config)`,
        codeTitle: 'Example 4: Modern Destructuring and Dictionary Merge Operator',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 క్లీన్ సింటాక్స్:</strong>
          <p style="margin-top:6px;">ఇది పాత <code>{**dict_a, **dict_b}</code> లేదా <code>.update()</code> మెథడ్ల కంటే చాలా ఈజీగా ఉంటుంది.</p>
        </div>`
      }
    ],
    mistake: {
      title: 'search() కి బదులు match() వాడటం',
      text: 're.match() టెక్స్ట్ స్టార్టింగ్ నుండి మాత్రమే చెక్ చేస్తుంది. ఒకవేళ మీరు వెతికేది టెక్స్ట్ మధ్యలో ఉంటే అది None ఇస్తుంది. ఎక్కడ ఉన్నా వెతకాలంటే ఎప్పుడూ re.search() వాడాలి.'
    },
    tryIt: {
      desc: 'ఒక యూజర్ నేమ్ కరెక్టో కాదో చెక్ చేయడానికి regex రాయండి (కేవలం అక్షరాలు, నంబర్స్, అండర్ స్కోర్స్ మాత్రమే ఉండాలి. పొడవు 4 నుండి 16 ఉండాలి). (పాటర్న్: r"^[a-zA-Z0-9_]{4,16}$")',
      code: `import re

def is_valid_username(username):
    pattern = r'^[a-zA-Z0-9_]{4,16}$'
    return bool(re.match(pattern, username))

test_users = ["balaji_dev", "a", "super_long_user_name_invalid", "alex@99", "chloe_2026"]
for u in test_users:
    print(f"'{u:28}' -> {'Valid ✅' if is_valid_username(u) else 'Invalid ❌'}")`
    },
    faqs: [
      {
        q: 're.compile() ఎందుకు వాడాలి?',
        a: 'ఒకే రెగ్యులర్ ఎక్స్ప్రెషన్ ని లక్షల లైన్స్ ఉన్న లాగ్ ఫైల్ పై వాడాలంటే, దాన్ని ముందే compile చేసిపెట్టుకుంటే పైథాన్ కి పని తగ్గి చాలా ఫాస్ట్ గా రన్ అవుతుంది.'
      },
      {
        q: 'Greedy, Non-greedy regex కి తేడా ఏంటి?',
        a: 'మామూలుగా +, * వాడితే అవి దొరికినంత పెద్ద టెక్స్ట్ ని తీసుకుంటాయి (Greedy). వాటి పక్కన ? పెడితే (+?, *?) అవి ఎంత తక్కువ వీలైతే అంత తక్కువ టెక్స్ట్ ని తీసుకుంటాయి (Lazy).'
      }
    ]
  },

  // =========================================================================
  // CHAPTER 41: MEMORY MANAGEMENT, GC & PROFILING
  // =========================================================================
  {
    num: 41,
    phaseId: 'phase8',
    phaseTitle: 'Phase 8: Advanced Python',
    slug: '41-python-memory-management-gc-and-profiling',
    title: 'Memory Management, GC & Profiling (తెలుగులో)',
    badge: '41. Memory, GC & Profiling',
    subtopics: 'Shallow vs Deep Copy · PyObject Anatomy · Reference Counting · Generational GC (Gen 0, 1, 2) · timeit & cProfile · EAFP vs LBYL',
    desc: 'పైథాన్ మెమరీని ఎలా వాడుకుంటుంది? డీప్ కాపీ అంటే ఏంటి? Reference Counting, Garbage Collection (GC) అంటే ఏంటి? కోడ్ ఎంత ఫాస్ట్ గా రన్ అవుతుందో చెక్ చేసే `timeit` గురించి నేర్చుకుందాం.',
    sections: [
      {
        title: '1. Shallow Copy vs Deep Copy (కాపీ చేయడంలో తేడాలు)',
        body: `<p>లిస్ట్స్ లో ఒకదాన్ని కాపీ చేసేటప్పుడు చాలా జాగ్రత్తగా ఉండాలి, లేకపోతే తెలియకుండానే ఒకదాని డేటా ఇంకొకటి మార్చేస్తుంది:</p>
        <ul>
          <li><strong>మామూలు Assignment (<code>b = a</code>):</strong> అసలు కాపీ అవ్వదు. రెండు పేర్లు ఒకే మెమరీ అడ్రెస్స్ ని చూపిస్తాయి.</li>
          <li><strong>Shallow Copy (<code>copy.copy()</code>):</strong> బయట ఉన్న లిస్ట్ వరకే కొత్త కాపీ క్రియేట్ అవుతుంది, కానీ లోపల ఉన్న చిన్న లిస్ట్స్ పాతవి అతుక్కునే ఉంటాయి.</li>
          <li><strong>Deep Copy (<code>copy.deepcopy()</code>):</strong> బయట లిస్ట్ తో పాటు, లోపల ఉన్న ప్రతి చిన్న లిస్ట్ కి కొత్త మెమరీ ఇస్తుంది (పూర్తిగా సేఫ్).</li>
        </ul>`,
        code: `import copy

# ఒక లిస్ట్ లోపల ఇంకో లిస్ట్ (Nested):
original = [[1, 2], [3, 4]]

shallow = copy.copy(original)
deep = copy.deepcopy(original)

# అసలు లిస్ట్ లోపల మార్చుదాం:
original[0][0] = 999

print("Original list:                 ", original) # [[999, 2], [3, 4]]
print("Shallow copy (లోపల మారిపోయింది!):", shallow)  # [[999, 2], [3, 4]] (లోపల లిస్ట్ సేమ్)
print("Deep copy (పూర్తిగా సేఫ్!):      ", deep)     # [[1, 2], [3, 4]] (కొత్త మెమరీ)`,
        codeTitle: 'Example 1: Shallow Copy vs Deep Copy Demonstration',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 ఎప్పుడు ఏది వాడాలి?:</strong>
          <p style="margin-top:6px;">సింగిల్ డైమెన్షన్ లిస్ట్ కి <code>copy()</code> సరిపోతుంది. కానీ లోపల డిక్షనరీలు, లిస్టులు ఉంటే కచ్చితంగా <code>copy.deepcopy()</code> నే వాడాలి.</p>
        </div>`
      },
      {
        title: '2. పైథాన్ మెమరీ సీక్రెట్: Reference Counting',
        body: `<p>పైథాన్ లోపల ప్రతి ఆబ్జెక్ట్ కి ఒక <strong>Reference Count (రెఫ్ కౌంట్)</strong> ఉంటుంది. అంటే ఆ ఆబ్జెక్ట్ ని ఎన్ని వేరియబుల్స్ వాడుకుంటున్నాయి అనే నెంబర్.</p>
        <p>ఒకవేళ ఆ నెంబర్ <code>0</code> అయిపోతే, పైథాన్ ఆటోమాటిక్ గా ఆ మెమరీని డిలీట్ చేసేస్తుంది!</p>`,
        code: `import sys

# 1. కొత్త లిస్ట్ తయారు చేద్దాం:
sample = [1, 2, 3]

# sys.getrefcount() ఎన్ని రెఫరెన్స్ లు ఉన్నాయో చెప్తుంది:
print("sample కి ఉన్న రిఫరెన్స్ లు:", sys.getrefcount(sample) - 1) # 1

# 2. ఇంకో పేరు పెడదాం (రెండు వేరియబుల్స్ ఒకే దాన్ని చూపిస్తున్నాయి):
alias_ptr = sample
print("alias_ptr ఇచ్చాక:       ", sys.getrefcount(sample) - 1) # 2

# 3. ఒక వేరియబుల్ డిలీట్ చేద్దాం:
del alias_ptr
print("ఒకటి డిలీట్ చేసాక:        ", sys.getrefcount(sample) - 1) # 1 (ఇంకా sample ఉంది కాబట్టి డిలీట్ అవ్వదు)`,
        codeTitle: 'Example 2: Inspecting CPython Reference Counting with sys.getrefcount',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 -1 ఎందుకు చేశాం?:</strong>
          <p style="margin-top:6px;">ఫంక్షన్ లోపలికి పంపినప్పుడు టెంపరరీగా అది కూడా ఒక పేరు ఇచ్చుకుంటుంది కాబట్టి, అసలు నెంబర్ కోసం -1 చేస్తాం.</p>
        </div>`
      },
      {
        title: '3. Garbage Collector (సైకిల్స్ లో ఇరుక్కుంటే?)',
        body: `<p>రిఫరెన్స్ కౌంటింగ్ లో ఒక పెద్ద ప్రాబ్లమ్ ఉంది. ఆబ్జెక్ట్ A ని B చూపిస్తూ, B ని A చూపిస్తే (Circular Reference), బయట నుంచి రెండూ డిలీట్ చేసినా వాటి కౌంట్ 0 అవ్వదు. అలాంటప్పుడు <strong>Garbage Collector (GC)</strong> వస్తుంది.</p>
        <p>దీన్ని ఇది బ్యాక్ గ్రౌండ్ లో రన్ అయ్యి, ఇలా ఒకదానికొకటి అతుక్కుని వృధాగా పడి ఉన్నవాటిని వెతికి మరీ మెమరీలోంచి తీసేస్తుంది.</p>`,
        code: `import gc

# 1. ఒకదానికొకటి లింక్ చేసుకునేలా క్లాస్ రాద్దాం:
class Node:
    def __init__(self, name):
        self.name = name
        self.partner = None

node1 = Node("A")
node2 = Node("B")

node1.partner = node2 # A, B ని చూపిస్తోంది
node2.partner = node1 # B, A ని చూపిస్తోంది (ఇరుక్కుపోయాయి!)

# బయట నుంచి పేర్లు డిలీట్ చేద్దాం:
del node1
del node2

# 2. గూఢచారి (Garbage Collector) ని పంపి వెతికిద్దాం:
unreachable_objects = gc.collect()
print(f"🧹 Garbage Collector {unreachable_objects} వృధా ఆబ్జెక్ట్స్ ని డిలీట్ చేసింది!")`,
        codeTitle: 'Example 3: Circular Reference Cycles and the gc Module',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 ఎప్పుడు వాడాలి?:</strong>
          <p style="margin-top:6px;">మామూలుగా GC ఆటోమాటిక్ గా బ్యాక్ గ్రౌండ్ లో రన్ అవుతుంది. మనం దీన్ని మాన్యువల్ గా రన్ చేయాల్సిన అవసరం లేదు.</p>
        </div>`
      },
      {
        title: '4. ఫాస్ట్ గా ఏది పనిచేస్తుందో చెక్ చేయడం (timeit)',
        body: `<p>ఒక పని చేయడానికి ఏ కోడ్ ఫాస్ట్ గా ఉందో చెక్ చేయాలంటే మనం <strong><code>timeit</code></strong> వాడతాం. ఇది కోడ్ ని వేలసార్లు రన్ చేసి కరెక్ట్ ఆవరేజ్ టైమ్ చెప్తుంది.</p>`,
        code: `import timeit

# స్ట్రింగ్స్ లోకి మార్చడానికి లిస్ట్ కాంప్రహెన్షన్ బెస్ట్ ఆ? map() బెస్ట్ ఆ?:
time_comp = timeit.timeit('[str(x) for x in range(1000)]', number=10_000)
time_map = timeit.timeit('list(map(str, range(1000)))', number=10_000)

print(f"⚡ List Comprehension (10k సార్లు): {time_comp:.4f} seconds")
print(f"⚡ map(str, ...)       (10k సార్లు): {time_map:.4f} seconds")

# పైథాన్ స్టైల్ (EAFP - ఏది జరిగినా చూసుకుందాం):
user_profile = {"name": "Balaji"}

# పదే పదే చెక్ చేయకుండా (EAFP), డైరెక్ట్ గా ట్రై చేసి ఎర్రర్ వస్తే హ్యాండిల్ చేయడం బెస్ట్:
try:
    email = user_profile["email"]
except KeyError:
    email = "default@example.com"
print("User Email (EAFP వాడుతూ):", email)`,
        codeTitle: 'Example 4: Performance Benchmarking and Idiomatic Pythonic Coding',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 EAFP లాభం:</strong>
          <p style="margin-top:6px;"><code>if "email" in user</code> అని చెక్ చేసి మళ్ళీ <code>user["email"]</code> తీసుకుంటే రెండు సార్లు వెతకాలి. EAFP వాడితే డైరెక్ట్ గా ఒకసారే తీసుకుంటుంది.</p>
        </div>`
      }
    ],
    mistake: {
      title: 'del వాడితే మెమరీ ఫ్రీ అయిపోతుందని అనుకోవడం',
      text: 'del వాడితే వేరియబుల్ పేరు మాత్రమే పోతుంది. ఆ ఆబ్జెక్ట్ ని ఇంకెవరైనా వాడుకుంటూ ఉంటే అది డిలీట్ అవ్వదు. పైథాన్ దాన్ని తీసేసినా, OS కి వెంటనే ఆ మెమరీ తిరిగి ఇవ్వదు, తర్వాత పైథాన్ వాడుకోవడానికి ఉంచుకుంటుంది.'
    },
    tryIt: {
      desc: 'ఒక సెట్ లో నెంబర్ ఉందో లేదో చెక్ చేయడం ఫాస్టా? లిస్ట్ లో ఫాస్టా? timeit వాడి చెక్ చేయండి.',
      code: `import timeit

setup_code = """
my_list = list(range(1000))
my_set = set(range(1000))
"""

t_list = timeit.timeit('999 in my_list', setup=setup_code, number=100_000)
t_set = timeit.timeit('999 in my_set', setup=setup_code, number=100_000)

print(f"List 'in' check (100k సార్లు): {t_list:.5f} sec")
print(f"Set 'in' check  (100k సార్లు): {t_set:.5f} sec")
print(f"🚀 Set అనేది లిస్ట్ కంటే {t_list/t_set:.1f} రెట్లు ఫాస్ట్!")`
    },
    faqs: [
      {
        q: 'GIL (Global Interpreter Lock) అంటే ఏంటి?',
        a: 'పైథాన్ (CPython) లో ఒకే టైమ్ లో రెండు త్రెడ్స్ (Threads) మెమరీని మార్చకుండా, సేఫ్ గా ఉండటానికి లాక్ వేస్తుంది. దీనివల్లే పైథాన్ మల్టీ-త్రెడింగ్ కొంచెం స్లోగా ఉంటుంది.'
      },
      {
        q: 'చిన్న నెంబర్స్ మెమరీ గురించి సీక్రెట్ ఏంటి?',
        a: 'పైథాన్ -5 నుంచి 256 వరకు ఉన్న నెంబర్స్ ని ముందుగానే మెమరీలో ఒకేచోట సేవ్ చేసి పెట్టుకుంటుంది. అందుకే ఆ నెంబర్స్ కి కొత్త మెమరీ అవ్వదు, ఉన్నదాన్నే ఇస్తుంది (చాలా ఫాస్ట్).'
      }
    ]
  }
];
