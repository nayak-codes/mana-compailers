const fs = require('fs');
const path = require('path');
const { LESSONS, buildPythonSidebar } = require('./python_curriculum_data.js');

const currentLesson = LESSONS.find(l => l.num === 24);

const chapter24Content = `<!DOCTYPE html>
<html lang="te" class="lang-python light-theme">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>24. అడ్వాన్స్‌డ్ పైథాన్: డెకరేటర్లు, జెనరేటర్లు &amp; డండర్ మెథడ్స్ | Modern Python 3 Masterclass</title>
  <meta name="description" content="పైథాన్ అడ్వాన్స్‌డ్ ఫీచర్స్: ఫంక్షన్ &amp; క్లాస్ డెకరేటర్లు (@wraps, @timer, @auth), జెనరేటర్లు (yield, yield from, మెమరీ ఎఫిషియంట్ స్ట్రీమింగ్), మరియు మ్యాజిక్/డండర్ మెథడ్స్ (__str__, __repr__, __len__, __enter__, __exit__, ఆపరేటర్ ఓవర్‌లోడింగ్).">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700;800&family=Noto+Sans+Telugu:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/site-nav.css">
  <link rel="stylesheet" href="/blog-style.css">
  <link rel="stylesheet" href="/blog-python/style.css">
</head>
<body class="line-numbers">

<div id="site-nav-placeholder"></div>

<div class="layout">
  ${buildPythonSidebar(24)}

  <main class="content">
    <!-- BREADCRUMB -->
    <div class="breadcrumb">
      <a href="/index.html">హోమ్</a>
      <span class="sep">›</span>
      <a href="/blog-python/index.html">పైథాన్ ట్యుటోరియల్స్</a>
      <span class="sep">›</span>
      <span>చాప్టర్ 24: డెకరేటర్లు, జెనరేటర్లు &amp; డండర్ మెథడ్స్</span>
    </div>

    <!-- PAGE META BADGES -->
    <div class="page-meta">
      <span class="badge badge-primary">Modern Python 3.12+</span>
      <span class="badge badge-secondary">చాప్టర్ 24 / 25</span>
      <span class="badge badge-outline">Phase 05: OOP &amp; Advanced</span>
      <span class="badge badge-success">2026 Edition</span>
    </div>

    <!-- PAGE TITLE -->
    <h1 class="page-title">24. అడ్వాన్స్‌డ్ పైథాన్ — డెకరేటర్లు, జెనరేటర్లు &amp; డండర్ మెథడ్స్</h1>

    <!-- COVERED PILL BAR -->
    <div class="covered-bar" style="display:flex; align-items:center; gap:8px; flex-wrap:wrap; background:var(--bg2); padding:10px 16px; border-radius:8px; border:1px solid var(--border); margin:18px 0 24px; font-size:13.5px; color:var(--text2);">
      <strong style="color:var(--text);">📌 Covered in this chapter:</strong>
      <span>Closures &amp; Metaprogramming</span> •
      <span>Function Decorators &amp; functools.wraps</span> •
      <span>Decorators with Arguments</span> •
      <span>Generators, yield &amp; Lazy Evaluation</span> •
      <span>yield from Sub-generators</span> •
      <span>Python Data Model &amp; Dunder Methods</span> •
      <span>Context Managers (__enter__/__exit__)</span> •
      <span>Streaming Log Pipeline Capstone</span>
    </div>

    <!-- INTRO BOX -->
    <div class="intro-box">
      పైథాన్‌ను ప్రపంచంలోనే అత్యంత శక్తివంతమైన మరియు సుందరమైన భాషగా మార్చిన రహస్యం దాని "అడ్వాన్స్‌డ్ మెటాప్రోగ్రామింగ్" ఫీచర్లు. సాధారణ డెవలపర్‌కు మరియు సీనియర్ పైథాన్ ఆర్కిటెక్ట్‌కు మధ్య వ్యత్యాసాన్ని చూపేవి సరిగ్గా ఈ అంశాలే: ఫంక్షన్ల ప్రవర్తనను మార్చకుండా అదనపు ఫీచర్లను చేర్చే <strong>డెకరేటర్లు (Decorators)</strong>, గిగాబైట్ల కొద్దీ డేటాను కొన్ని మెగాబైట్ల ర్యామ్‌తోనే ప్రాసెస్ చేయగల <strong>జెనరేటర్లు &amp; లేజీ ఎవాల్యుయేషన్ (Generators &amp; yield)</strong>, మరియు పైథాన్ భాషలోని బిల్ట్-ఇన్ ఆపరేటర్లను మన క్లాసులకు అనుసంధానించే <strong>మ్యాజిక్ లేదా డండర్ మెథడ్స్ (Python Data Model)</strong>. ఈ అధ్యాయంలో ఈ మూడు మాస్టర్ టూల్స్‌ను లోతైన అంతర్గత రన్‌టైమ్ మెకానిక్స్ మరియు లైవ్ ప్రొడక్షన్ ప్రాజెక్ట్‌తో వివరంగా నేర్చుకుందాం.
    </div>

    <!-- SECTION 1 -->
    <h2 class="section-title"><span class="num">1</span> ఫస్ట్-క్లాస్ ఫంక్షన్స్ (First-Class Functions) &amp; క్లోజర్స్ (Closures)</h2>
    <p>
      పైథాన్‌లో డెకరేటర్లను అర్థం చేసుకోవాలంటే, మొదట ఫంక్షన్లను పైథాన్ ఎలా చూస్తుందో అర్థం చేసుకోవాలి. పైథాన్‌లో ఫంక్షన్లు <strong>First-Class Citizens</strong>:
    </p>
    <ul>
      <li>ఫంక్షన్‌ను ఒక వేరియబుల్‌కు అసైన్ చేయవచ్చు (<code>my_func = print</code>).</li>
      <li>ఫంక్షన్‌ను మరొక ఫంక్షన్‌కు ఆర్గ్యుమెంట్‌గా పాస్ చేయవచ్చు.</li>
      <li>ఒక ఫంక్షన్ లోపల మరొక ఇన్నర్ ఫంక్షన్‌ను డిఫైన్ చేసి, ఆ ఇన్నర్ ఫంక్షన్‌నే రిటర్న్ చేయవచ్చు!</li>
    </ul>
    <p>
      <strong>Closure (క్లోజర్):</strong> ఒక ఔటర్ ఫంక్షన్ ఎగ్జిక్యూషన్ ముగిసిన తర్వాత కూడా, దాని లోపల ఉన్న ఇన్నర్ ఫంక్షన్ ఆ ఔటర్ స్కోప్ యొక్క వేరియబుల్స్‌ను గుర్తుంచుకునే అద్భుతమైన సామర్థ్యాన్ని క్లోజర్ అంటారు:
    </p>
    <div style="background:#0f172a; border-radius:8px; padding:16px; font-family:Consolas, monospace; font-size:13px; color:#38bdf8; margin:14px 0; line-height:1.6;">
      def multiplier_factory(factor):<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;def multiply(number):<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return number * factor  # 'factor' ను క్లోజర్ గుర్తుంచుకుంటుంది!<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;return multiply<br/><br/>
      double = multiplier_factory(2)<br/>
      triple = multiplier_factory(3)<br/>
      print(double(10))  # 20<br/>
      print(triple(10))  # 30
    </div>

    <!-- SECTION 2 -->
    <h2 class="section-title"><span class="num">2</span> ఫంక్షన్ డెకరేటర్ల నిర్మాణం (Decorators Anatomy &amp; @ Syntax)</h2>
    <p>
      ఒక ఫంక్షన్ యొక్క అసలు సోర్స్ కోడ్‌ను ఎటువంటి మార్పు చేయకుండా, దాని ముందు లేదా వెనుక అదనపు ఫంక్షనాలిటీని (ఉదా: Logging, Timing, Authentication) చేర్చే హైయర్-ఆర్డర్ ఫంక్షన్‌ను <strong>డెకరేటర్ (Decorator)</strong> అంటారు:
    </p>
    <div style="background:var(--bg2); border:1px solid var(--border); border-radius:10px; padding:18px; margin:16px 0;">
      <h4 style="margin-top:0; color:#10b981;">@ సింటాక్స్ వెనుక అసలు నిజం:</h4>
      <p style="font-size:13.5px; line-height:1.7; margin-bottom:8px;">
        మీరు ఒక ఫంక్షన్ పైన <code>@my_decorator</code> అని రాసినప్పుడు, పైథాన్ ఇంటర్‌ప్రీటర్ దానిని ఈ క్రింది విధంగా అమలు చేస్తుంది:
      </p>
      <div style="background:#0f172a; border-radius:6px; padding:10px 14px; font-family:Consolas, monospace; font-size:13px; color:#38bdf8;">
        # @my_decorator అని రాయడం అంటే సరిగ్గా ఇది:<br/>
        original_function = my_decorator(original_function)
      </div>
      <p style="font-size:13.5px; line-height:1.7; margin-top:8px; margin-bottom:0;">
        ఇది పూర్తిగా "Syntactic Sugar" మాత్రమే! పైథాన్ అసలు ఫంక్షన్‌ను డెకరేటర్‌కు పంపి, డెకరేటర్ రిటర్న్ చేసిన ర్యాపర్ (Wrapper) ఫంక్షన్‌ను అసలు పేరుతో రీప్లేస్ చేస్తుంది.
      </p>
    </div>

    <!-- SECTION 3 -->
    <h2 class="section-title"><span class="num">3</span> <code>functools.wraps</code> ప్రాముఖ్యత &amp; ఆర్గ్యుమెంట్లతో కూడిన డెకరేటర్లు</h2>
    <p>
      ఒక ఫంక్షన్‌ను ర్యాప్ చేసినప్పుడు, దాని పేరు (<code>__name__</code>) మరియు డాక్యుమెంటేషన్ (<code>__doc__</code>) ర్యాపర్ ఫంక్షన్ పేరుతో రీప్లేస్ అయిపోతాయి. దీనివల్ల డీబగ్గింగ్ కష్టమవుతుంది. ఈ సమస్యను నివారించడానికి పైథాన్ స్టాండర్డ్ లైబ్రరీలోని <strong><code>@functools.wraps</code></strong> ను తప్పనిసరిగా వాడాలి:
    </p>
    <div style="background:#0f172a; border-radius:8px; padding:16px; font-family:Consolas, monospace; font-size:13px; color:#38bdf8; margin:14px 0; line-height:1.6;">
      import functools<br/>
      import time<br/><br/>
      def performance_timer(func):<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;@functools.wraps(func)  # అసలు మెటాడేటాను భద్రపరుస్తుంది<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;def wrapper(*args, **kwargs):<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;start_time = time.perf_counter()<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;result = func(*args, **kwargs)<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;elapsed = time.perf_counter() - start_time<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;print(f"⏱️ [{func.__name__}] ఎగ్జిక్యూషన్ సమయం: {elapsed:.6f} సెకన్లు")<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return result<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;return wrapper<br/><br/>
      @performance_timer<br/>
      def calculate_squares(limit):<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;"""1 నుండి limit వరకు వర్గాలను లెక్కిస్తుంది."""<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;return [x**2 for x in range(limit)]<br/><br/>
      calculate_squares(100_000)<br/>
      print("ఫంక్షన్ అసలు పేరు:", calculate_squares.__name__)  # calculate_squares
    </div>

    <!-- SECTION 4 -->
    <h2 class="section-title"><span class="num">4</span> పారామీటర్లతో కూడిన డెకరేటర్లు &amp; క్లాస్ బేస్డ్ డెకరేటర్లు (<code>__call__</code>)</h2>
    <p>
      డెకరేటర్‌కు ఆర్గ్యుమెంట్లను పాస్ చేయాలంటే (ఉదా: <code>@repeat(num_times=3)</code> లేదా <code>@role_required("ADMIN")</code>), మనం 3 స్థాయిల నెస్టెడ్ ఫంక్షన్లను (Triple-nested functions) ఉపయోగించాలి:
    </p>
    <div style="background:#0f172a; border-radius:8px; padding:16px; font-family:Consolas, monospace; font-size:13px; color:#38bdf8; margin:14px 0; line-height:1.6;">
      def repeat(num_times):<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;def decorator_repeat(func):<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;@functools.wraps(func)<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;def wrapper(*args, **kwargs):<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;for _ in range(num_times):<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;result = func(*args, **kwargs)<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return result<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return wrapper<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;return decorator_repeat
    </div>

    <p>
      అలాగే, డెకరేటర్‌ను ఫంక్షన్‌గా మాత్రమే కాకుండా ఒక పూర్తి క్లాస్‌గా కూడా రూపొందించవచ్చు. ఒక క్లాస్ ఆబ్జెక్ట్‌ను ఫంక్షన్ లాగా కాల్ చేయడానికి (Callable Object) పైథాన్‌లో <strong><code>__call__</code></strong> డండర్ మెథడ్‌ను వాడుతాము. ఇది స్టేట్ (State) ను మెమరీలో ట్రాక్ చేయడానికి చాలా అనుకూలం:
    </p>

    <!-- CODE BLOCK: CLASS-BASED DECORATOR -->
    <div class="code-block">
      <div class="code-header">
        <span class="file-name">00_class_based_call_decorator.py</span>
        <div class="btn-group">
          <button class="btn btn-copy" onclick="copyCode(this)">Copy</button>
          <button class="btn btn-run" onclick="runCodeInCompiler(this)">Run ▶</button>
        </div>
      </div>
      <pre><code class="language-python"># క్లాస్ బేస్డ్ కాల్ ట్రాకర్ డెకరేటర్
class CallCounter:
    def __init__(self, func):
        self.func = func
        self.count = 0

    def __call__(self, *args, **kwargs):
        self.count += 1
        print(f"📊 [{self.func.__name__}] ఇప్పటివరకు {self.count} సార్లు పిలవబడింది.")
        return self.func(*args, **kwargs)

@CallCounter
def process_order(customer_name: str):
    print(f"  🛒 {customer_name} ఆర్డర్ విజయవంతంగా ప్రాసెస్ చేయబడింది.")

process_order("ఆనంద్ వర్మ")
process_order("స్వప్న రావు")
process_order("కార్తీక్ నాయుడు")
print(f"మొత్తం ఇన్వోకేషన్లు: {process_order.count}")
</code></pre>
    </div>

    <!-- SECTION 5 -->
    <h2 class="section-title"><span class="num">5</span> ఇటరేటర్ ప్రోటోకాల్ (The Python Iterator Protocol)</h2>
    <p>
      పైథాన్‌లో <code>for item in collection:</code> లూప్ తెరవెనుక ఎలా పనిచేస్తుంది?
    </p>
    <ul>
      <li>పైథాన్ మొదట కలెక్షన్ యొక్క <code>iter(collection)</code> లేదా <code>collection.__iter__()</code> ను పిలిచి ఒక ఇటరేటర్ ఆబ్జెక్ట్‌ను పొందుతుంది.</li>
      <li>ఆ తర్వాత ప్రతి రౌండ్‌లో <code>next(iterator)</code> లేదా <code>iterator.__next__()</code> ను పిలుస్తూ విలువలను పొందుతుంది.</li>
      <li>డేటా మొత్తం పూర్తయిన వెంటనే ఇటరేటర్ <strong><code>StopIteration</code></strong> అనే ఎక్సెప్షన్‌ను రైజ్ చేస్తుంది. పైథాన్ <code>for</code> లూప్ దానిని సైలెంట్‌గా క్యాచ్ చేసి లూప్‌ను సురక్షితంగా ఆపివేస్తుంది!</li>
    </ul>

    <!-- SECTION 6 -->
    <h2 class="section-title"><span class="num">6</span> జెనరేటర్లు (Generators) &amp; <code>yield</code> స్టేట్‌మెంట్ — Lazy Evaluation</h2>
    <p>
      జెనరేటర్లు సాధారణ ఫంక్షన్ల లాంటివే, కానీ అవి విలువను <code>return</code> చేసి చనిపోవు; బదులుగా <strong><code>yield</code></strong> స్టేట్‌మెంట్ ద్వారా విలువను అందించి, తమ ఎగ్జిక్యూషన్ స్టేట్‌ను (Local Variables, Instruction Pointer) స్తంభింపజేస్తాయి (Pause). మళ్లీ <code>next()</code> పిలిచినప్పుడు సరిగ్గా ఎక్కడైతే ఆగిపోయాయో అక్కడి నుంచే తమ పనిని కొనసాగిస్తాయి:
    </p>
    <div style="background:var(--bg2); border:1px solid var(--border); border-radius:10px; padding:18px; margin:16px 0;">
      <h4 style="margin-top:0; color:#10b981;">మెమరీ అద్భుతం: Normal List vs Generator:</h4>
      <p style="font-size:13.5px; line-height:1.7;">
        10 మిలియన్ (1 కోటి) సంఖ్యలను ఒక సాధారణ లిస్ట్‌గా సృష్టిస్తే (<code>[x for x in range(10_000_000)]</code>), అది ర్యామ్‌లో దాదాపు <strong>800 MB</strong> మెమరీని ఆక్రమిస్తుంది. కానీ అదే పనిని జెనరేటర్ ఎక్స్‌ప్రెషన్ ద్వారా చేస్తే (<code>(x for x in range(10_000_000))</code>), అది కేవలం <strong>104 Bytes</strong> మాత్రమే ఆక్రమిస్తుంది! ఎందుకంటే జెనరేటర్ ఒకేసారి అన్నింటినీ మెమరీలో దాచదు; అడిగినప్పుడు ఒక్కో విలువను మాత్రమే ఉత్పత్తి చేస్తుంది (Lazy Evaluation).
      </p>
    </div>

    <!-- SECTION 7 -->
    <h2 class="section-title"><span class="num">7</span> <code>yield from</code> &amp; బై-డైరెక్షనల్ జెనరేటర్లు (<code>send()</code> Coroutines)</h2>
    <p>
      ఒక జెనరేటర్ లోపల నుండి మరొక జెనరేటర్‌ను లేదా ఇటరబుల్‌ను లూప్ చేసి yield చేయడం కంటే, పైథాన్ 3.3 లో పరిచయమైన <strong><code>yield from</code></strong> సింటాక్స్ అత్యంత సులభతరమైనది మరియు సమర్థవంతమైనది:
    </p>
    <div style="background:#0f172a; border-radius:8px; padding:16px; font-family:Consolas, monospace; font-size:13px; color:#38bdf8; margin:14px 0; line-height:1.6;">
      def chain_streams(*iterables):<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;for it in iterables:<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;yield from it  # ఇన్నర్ ఇటరబుల్ నుండి అన్ని ఎలిమెంట్లను నేరుగా స్ట్రీమ్ చేస్తుంది<br/><br/>
      stream = chain_streams([1, 2, 3], ("A", "B"), range(100, 103))<br/>
      print(list(stream))  # [1, 2, 3, 'A', 'B', 100, 101, 102]
    </div>

    <div style="background:var(--bg2); border:1px solid var(--border); border-radius:10px; padding:16px; margin:14px 0;">
      <h4 style="margin-top:0; color:#10b981;">బై-డైరెక్షనల్ కమ్యూనికేషన్: <code>generator.send(value)</code></h4>
      <p style="font-size:13.5px; line-height:1.7; margin-bottom:8px;">
        జెనరేటర్లు కేవలం బయటకు డేటాను పంపడం (Produce) మాత్రమే కాదు; బయటి కాలర్ నుండి డేటాను లోపలికి స్వీకరించగలవు కూడా! <code>val = yield output</code> అని రాసినప్పుడు, కాలర్ <code>gen.send(new_val)</code> ద్వారా జెనరేటర్‌లోకి కొత్త డేటాను ఇంజెక్ట్ చేయవచ్చు. ఆధునిక పైథాన్‌లో <code>asyncio</code> మరియు కోరూటీన్లు (Coroutines) అభివృద్ధి చెందడానికి సరిగ్గా ఈ <code>yield</code> మరియు <code>send()</code> ప్రోటోకాలే మాతృకగా నిలిచింది!
      </p>
      <div style="background:#0f172a; border-radius:6px; padding:10px 14px; font-family:Consolas, monospace; font-size:12.5px; color:#38bdf8;">
        def cumulative_averager():<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;total = 0.0<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;count = 0<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;avg = None<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;while True:<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;val = yield avg  # కాలర్ పంపిన విలువను val అందుకుంటుంది<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;total += val<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count += 1<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;avg = total / count<br/><br/>
        coro = cumulative_averager()<br/>
        next(coro)             # ప్రైమింగ్ (మొదటి yield వద్దకు చేరడం)<br/>
        print(coro.send(10))   # 10.0<br/>
        print(coro.send(20))   # 15.0<br/>
        print(coro.send(30))   # 20.0
      </div>
    </div>

    <!-- SECTION 8 -->
    <h2 class="section-title"><span class="num">8</span> పైథాన్ డేటా మోడల్ &amp; మ్యాజిక్ / డండర్ మెథడ్స్ (Python Data Model)</h2>
    <p>
      పైథాన్‌లో క్లాసులు సాధారణ యూజర్-డిఫైన్డ్ టైప్స్ లాగా మాత్రమే కాకుండా, పైథాన్ యొక్క కోర్ సింటాక్స్‌తో సహజంగా అనుసంధానం కావడానికి <strong>Dunder (Double Underscore)</strong> మెథడ్స్ తోడ్పడతాయి. మీ క్లాస్‌లో నిర్దిష్టమైన డండర్ మెథడ్లను డిఫైన్ చేయడం ద్వారా:
    </p>
    <ul>
      <li><code>len(obj)</code> పిలిస్తే మీ క్లాస్ యొక్క <code>__len__()</code> కాల్ అవుతుంది.</li>
      <li><code>obj1 + obj2</code> రాస్తే మీ క్లాస్ యొక్క <code>__add__()</code> కాల్ అవుతుంది (Operator Overloading).</li>
      <li><code>obj[key]</code> రాస్తే మీ క్లాస్ యొక్క <code>__getitem__()</code> కాల్ అవుతుంది.</li>
      <li><code>with obj:</code> రాస్తే మీ క్లాస్ యొక్క <code>__enter__()</code> మరియు <code>__exit__()</code> కాల్ అవుతాయి.</li>
    </ul>

    <!-- SECTION 9 -->
    <h2 class="section-title"><span class="num">9</span> <code>__str__</code> vs <code>__repr__</code> &amp; ఆపరేటర్ ఓవర్‌లోడింగ్</h2>
    <p>
      ఆబ్జెక్ట్‌ను స్ట్రింగ్‌గా చూపించడానికి పైథాన్‌లో రెండు ప్రత్యేక మెథడ్స్ ఉన్నాయి:
    </p>
    <table style="width:100%; border-collapse:collapse; margin:16px 0; font-size:13.5px; text-align:left;">
      <thead>
        <tr style="background:var(--bg2); border-bottom:2px solid var(--border);">
          <th style="padding:10px 12px;">డండర్ మెథడ్</th>
          <th style="padding:10px 12px; color:#10b981;">లక్ష్యం &amp; ఆడియన్స్</th>
          <th style="padding:10px 12px; color:#38bdf8;">ఎప్పుడు కాల్ అవుతుంది?</th>
        </tr>
      </thead>
      <tbody>
        <tr style="border-bottom:1px solid var(--border);">
          <td style="padding:10px 12px; font-weight:600;"><code>__str__(self)</code></td>
          <td style="padding:10px 12px;">ఎండ్-యూజర్లకు చదవడానికి అనువుగా ఉండే అందమైన టెక్స్ట్ (User-Friendly Display)</td>
          <td style="padding:10px 12px;"><code>print(obj)</code> లేదా <code>str(obj)</code> చేసినప్పుడు</td>
        </tr>
        <tr style="border-bottom:1px solid var(--border);">
          <td style="padding:10px 12px; font-weight:600;"><code>__repr__(self)</code></td>
          <td style="padding:10px 12px;">డెవలపర్లకు డీబగ్గింగ్ కోసం ఖచ్చితమైన సమాచారం (Unambiguous, reproducible string)</td>
          <td style="padding:10px 12px;">ఇంటరాక్టివ్ REPL లో, లాగర్స్ లో, లేదా <code>repr(obj)</code> చేసినప్పుడు</td>
        </tr>
      </tbody>
    </table>

    <p>
      పైథాన్ ఆపరేటర్లను (<code>+</code>, <code>*</code>, <code>==</code>, <code>&lt;</code>) మన యూజర్-డిఫైన్డ్ ఆబ్జెక్టులపై పనిచేసేలా ఓవర్‌లోడ్ చేసే పూర్తి కోడ్ ఉదాహరణను పరిశీలిద్దాం:
    </p>

    <!-- CODE BLOCK: OPERATOR OVERLOADING & DUNDER METHODS -->
    <div class="code-block">
      <div class="code-header">
        <span class="file-name">01_money_operator_overloading.py</span>
        <div class="btn-group">
          <button class="btn btn-copy" onclick="copyCode(this)">Copy</button>
          <button class="btn btn-run" onclick="runCodeInCompiler(this)">Run ▶</button>
        </div>
      </div>
      <pre><code class="language-python"># ఆపరేటర్ ఓవర్‌లోడింగ్ మరియు పైథాన్ డేటా మోడల్
class Money:
    def __init__(self, amount: float, currency: str = "INR"):
        self.amount = round(float(amount), 2)
        self.currency = currency

    # 1. యూజర్ ఫ్రెండ్లీ స్ట్రింగ్
    def __str__(self):
        symbol = "₹" if self.currency == "INR" else self.currency
        return f"{symbol}{self.amount:,.2f}"

    # 2. డెవలపర్ డీబగ్గింగ్ రిప్రజెంటేషన్
    def __repr__(self):
        return f"Money(amount={self.amount}, currency='{self.currency}')"

    # 3. కూడిక ఆపరేటర్ (+) ఓవర్‌లోడింగ్
    def __add__(self, other):
        if not isinstance(other, Money) or self.currency != other.currency:
            raise TypeError("విభిన్న కరెన్సీలను లేదా నాన్-మనీ ఆబ్జెక్టులను కూడలేము!")
        return Money(self.amount + other.amount, self.currency)

    # 4. గుణకారం ఆపరేటర్ (*) ఓవర్‌లోడింగ్ (స్కేలార్ నంబర్‌తో)
    def __mul__(self, factor: float):
        return Money(self.amount * factor, self.currency)

    # 5. సమానత్వ ఆపరేటర్ (==)
    def __eq__(self, other):
        return isinstance(other, Money) and self.amount == other.amount and self.currency == other.currency

    # 6. తక్కువ/ఎక్కువ ఆపరేటర్ (&lt;) సార్టింగ్ కోసం
    def __lt__(self, other):
        if not isinstance(other, Money) or self.currency != other.currency:
            raise TypeError("పోలిక ఒకే కరెన్సీ మధ్య మాత్రమే సాధ్యం!")
        return self.amount &lt; other.amount

# టెస్టింగ్
m1 = Money(1500, "INR")
m2 = Money(3250.50, "INR")
m3 = m1 + m2
print("m1:", m1)                  # __str__ -> ₹1,500.00
print("repr(m1):", repr(m1))      # __repr__ -> Money(amount=1500.0, currency='INR')
print("మొత్తం (m1 + m2):", m3)    # ₹4,750.50
print("GST తో (m1 * 1.18):", m1 * 1.18)
print("సార్టింగ్ ఫలితం:", sorted([m2, m1]))
</code></pre>
    </div>

    <!-- SECTION 10 -->
    <h2 class="section-title"><span class="num">10</span> కాంటెక్స్ట్ మేనేజర్స్ (Context Managers): <code>__enter__</code> &amp; <code>contextlib</code></h2>
    <p>
      రిసోర్స్ మేనేజ్‌మెంట్ కోసం (ఫైళ్లు మూసివేయడం, నెట్‌వర్క్ సాకెట్ క్లోజ్ చేయడం, డేటాబేస్ లావాదేవీలను కమిట్/రోల్‌బ్యాక్ చేయడం) <code>with</code> స్టేట్‌మెంట్‌ను ఉపయోగిస్తాము. దీని వెనుక ఉన్న ప్రోటోకాల్:
    </p>
    <div style="background:#0f172a; border-radius:8px; padding:16px; font-family:Consolas, monospace; font-size:13px; color:#38bdf8; margin:14px 0; line-height:1.6;">
      class DatabaseTransaction:<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;def __enter__(self):<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;print("1. [__enter__] డేటాబేస్ ట్రాన్సాక్షన్ లాక్ ఓపెన్ అయింది")<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return self<br/><br/>
      &nbsp;&nbsp;&nbsp;&nbsp;def __exit__(self, exc_type, exc_val, exc_tb):<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if exc_type:<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;print(f"❌ [__exit__] ఎర్రర్ వచ్చింది: {exc_val}. రోల్‌బ్యాక్ చేయబడుతోంది...")<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;else:<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;print("✅ [__exit__] ట్రాన్సాక్షన్ సురక్షితంగా కమిట్ అయింది")<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;print("2. రిసోర్స్ లాక్ క్లోజ్ అయింది")<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return False  # ఎక్సెప్షన్‌ను సప్రెస్ చేయకుండా పైకి పంపడానికి
    </div>

    <div style="background:var(--bg2); border:1px solid var(--border); border-radius:10px; padding:16px; margin:14px 0;">
      <h4 style="margin-top:0; color:#10b981;">లైట్‌వెయిట్ కాంటెక్స్ట్ మేనేజర్: <code>@contextlib.contextmanager</code></h4>
      <p style="font-size:13.5px; line-height:1.7; margin-bottom:8px;">
        ప్రతి చిన్న పని కోసం ఒక పూర్తి క్లాస్‌ను రాసి <code>__enter__</code>, <code>__exit__</code> లను డిఫైన్ చేయాల్సిన పనిలేదు. పైథాన్ స్టాండర్డ్ లైబ్రరీలోని <code>contextlib</code> మాడ్యూల్ ఒక సాధారణ జెనరేటర్ ఫంక్షన్‌ను <code>with</code> స్టేట్‌మెంట్‌గా మార్చడానికి అనుమతిస్తుంది:
      </p>
      <div style="background:#0f172a; border-radius:6px; padding:10px 14px; font-family:Consolas, monospace; font-size:12.5px; color:#38bdf8;">
        from contextlib import contextmanager<br/><br/>
        @contextmanager<br/>
        def temp_file_session(filename):<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;print(f"📂 ఫైల్ '{filename}' ఓపెన్ అయింది")<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;try:<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;yield filename  # 'with temp_file_session() as f:' లోకి పాస్ అవుతుంది<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;finally:<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;print(f"🔒 ఫైల్ '{filename}' ఆటోమేటిక్‌గా క్లోజ్ అయింది")
      </div>
    </div>

    <!-- SECTION 11 -->
    <h2 class="section-title"><span class="num">11</span> కోడ్ డెమో 1: ప్రొడక్షన్ లెవల్ డెకరేటర్లు (@retry &amp; @audit)</h2>
    <p>
      నెట్‌వర్క్ కాల్స్ విఫలమైనప్పుడు ఆటోమేటిక్‌గా 3 సార్లు రీట్రై చేసే మరియు ఆడిట్ లాగ్ చేసే ప్రొడక్షన్-గ్రేడ్ డెకరేటర్‌ను చూద్దాం:
    </p>

    <!-- CODE BLOCK 1 -->
    <div class="code-block">
      <div class="code-header">
        <span class="file-name">01_production_retry_decorator.py</span>
        <div class="btn-group">
          <button class="btn btn-copy" onclick="copyCode(this)">Copy</button>
          <button class="btn btn-run" onclick="runCodeInCompiler(this)">Run ▶</button>
        </div>
      </div>
      <pre><code class="language-python">import functools
import time

def retry_operation(max_attempts=3, delay_sec=1.0):
    """విఫలమైన ఫంక్షన్లను ఆటోమేటిక్‌గా రీట్రై చేసే డెకరేటర్."""
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            attempts = 0
            while attempts &lt; max_attempts:
                try:
                    attempts += 1
                    return func(*args, **kwargs)
                except Exception as err:
                    print(f"⚠️ [ప్రయత్నం {attempts}/{max_attempts}] విఫలమైంది: {err}")
                    if attempts &gt;= max_attempts:
                        print("❌ గరిష్ట రీట్రై పరిమితి ముగిసింది! ఎర్రర్ విసురుతున్నాము.")
                        raise
                    time.sleep(delay_sec)
        return wrapper
    return decorator

# సిమ్యులేషన్: 2 సార్లు ఫెయిల్ అయి 3వ సారి సక్సెస్ అయ్యే API కాల్
call_count = 0

@retry_operation(max_attempts=3, delay_sec=0.5)
def fetch_payment_status(txn_id: str):
    global call_count
    call_count += 1
    if call_count &lt; 3:
        raise ConnectionResetError("గేట్‌వే సర్వర్ స్పందించడం లేదు (504 Gateway Timeout)")
    return f"SUCCESS: లావాదేవీ {txn_id} విజయవంతంగా పూర్తయింది!"

print("📡 పేమెంట్ సర్వీస్ కాల్ మొదలైంది...")
result = fetch_payment_status("TXN-90218")
print("🎉 రిజల్ట్:", result)
</code></pre>
    </div>

    <!-- SECTION 12 -->
    <h2 class="section-title"><span class="num">12</span> కామన్ బిగినర్స్ మిస్టేక్స్ &amp; ప్రొడక్షన్ బెస్ట్ ప్రాక్టీసెస్</h2>
    <ul>
      <li><strong>wraps లేకుండా డెకరేటర్లు రాయడం:</strong> <code>@functools.wraps(func)</code> మర్చిపోతే, ఫ్రేమ్‌వర్కులు (Flask, FastAPI, Sphinx డాక్యుమెంటేషన్) మీ ఫంక్షన్‌ను సరైన పేరుతో గుర్తించలేక విచిత్రమైన బగ్స్‌ను సృష్టిస్తాయి.</li>
      <li><strong>Generator Exhaustion Trap:</strong> జెనరేటర్‌ను ఒకసారి లూప్ చేసిన తర్వాత అది ఖాళీ అయిపోతుంది (Exhausted). మళ్లీ అదే జెనరేటర్‌ను లూప్ చేస్తే ఎటువంటి డేటా రాదు! మళ్లీ డేటా కావాలంటే జెనరేటర్ ఫంక్షన్‌ను కొత్తగా పిలవాలి లేదా లిస్ట్‌గా మార్చుకోవాలి.</li>
      <li><strong>డండర్ మెథడ్లలో హెవీ కాంప్యుటేషన్స్ చేయడం:</strong> <code>__len__</code> లేదా <code>__repr__</code> లో నెట్‌వర్క్ కాల్స్ లేదా భారీ డేటాబేస్ క్వెరీలు చేయకూడదు. అవి తక్షణమే వేగంగా రన్ అయ్యేలా ఉండాలి.</li>
    </ul>

    <!-- SECTION 13 -->
    <h2 class="section-title"><span class="num">13</span> రియల్-వరల్డ్ ప్రాజెక్ట్: "Gigabyte-Scale Streaming Server Log Audit Pipeline"</h2>
    <p>
      ఈ అధ్యాయంలో నేర్చుకున్న అన్ని అంశాలను (జెనరేటర్లు, <code>yield from</code>, కస్టమ్ డెకరేటర్లు, డండర్ మెథడ్స్‌తో కూడిన డేటా మోడల్, కాంటెక్స్ట్ మేనేజర్) సమగ్రంగా ఏకీకృతం చేస్తూ — భారీ గిగాబైట్ల సర్వర్ లాగ్ ఫైల్స్‌ను కేవలం కొన్ని కిలోబైట్ల మెమరీతోనే లైవ్ స్ట్రీమింగ్ చేస్తూ సెక్యూరిటీ బెదిరింపులను గుర్తించే పూర్తి స్థాయి <strong>Gigabyte-Scale Streaming Log Audit Pipeline</strong> ను నిర్మిద్దాం!
    </p>

    <!-- CODE BLOCK 2: CAPSTONE MINI PROJECT -->
    <div class="code-block">
      <div class="code-header">
        <span class="file-name">02_streaming_log_audit_pipeline.py</span>
        <div class="btn-group">
          <button class="btn btn-copy" onclick="copyCode(this)">Copy</button>
          <button class="btn btn-run" onclick="runCodeInCompiler(this)">Run ▶</button>
        </div>
      </div>
      <pre><code class="language-python"># =====================================================================
# చాప్టర్ 24 ప్రాజెక్ట్: Gigabyte-Scale Streaming Server Log Audit Pipeline
# కాన్సెప్ట్స్: Custom Context Manager, Generators, yield from,
#              Dunder Methods (__iter__, __len__, __repr__), @timer Decorator
# =====================================================================
import time
import functools

# 1. పెర్ఫార్మెన్స్ బెంచ్‌మార్క్ డెకరేటర్
def benchmark_pipeline(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        t0 = time.perf_counter()
        res = func(*args, **kwargs)
        t1 = time.perf_counter()
        print(f"\n⚡ పైప్‌లైన్ ఆడిట్ పూర్తయిన సమయం: {(t1 - t0)*1000:.3f} ms")
        return res
    return wrapper

# 2. లాగ్ రికార్డ్ క్లాస్ (Python Data Model with Dunder Methods)
class LogRecord:
    def __init__(self, ip: str, method: str, path: str, status_code: int, response_ms: float):
        self.ip = ip
        self.method = method
        self.path = path
        self.status_code = status_code
        self.response_ms = response_ms

    def __repr__(self):
        return f"LogRecord({self.ip} | {self.method} {self.path} -&gt; {self.status_code})"

    def is_security_threat(self) -&gt; bool:
        # 401/403/500 ఎర్రర్లు లేదా అనుమానాస్పద పాత్‌లను గుర్తించడం
        suspicious_paths = ["/admin", "/wp-login.php", "/.env", "/config.json"]
        return self.status_code in (401, 403, 500) or any(sp in self.path for sp in suspicious_paths)

# 3. కాంటెక్స్ట్ మేనేజర్: సేఫ్ లాగ్ స్ట్రీమ్ సెషన్
class LogStreamAuditSession:
    def __init__(self, session_name: str):
        self.session_name = session_name

    def __enter__(self):
        print(f"🔒 [AUDIT SESSION: {self.session_name}] సెషన్ ప్రారంభమైంది. లాగ్ స్ట్రీమ్ లాక్ చేయబడింది.")
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        if exc_type:
            print(f"🚨 [AUDIT ALERT] సెషన్‌లో ఊహించని ఎర్రర్: {exc_val}")
        print(f"🔓 [AUDIT SESSION: {self.session_name}] సెషన్ సురక్షితంగా క్లోజ్ అయింది.\n")
        return False

# 4. జెనరేటర్: భారీ లాగ్ ఫైల్ సిమ్యులేషన్ (మెమరీలో కేవలం 1 లైన్ మాత్రమే ఉంటుంది)
def generate_raw_server_logs():
    raw_sample_data = [
        "192.168.1.10 GET /api/v1/products 200 45.2",
        "10.0.0.5 POST /api/v1/checkout 200 320.1",
        "45.33.32.156 GET /admin 403 12.0",
        "185.220.101.5 GET /wp-login.php 404 8.5",
        "192.168.1.12 GET /api/v1/user/profile 200 65.4",
        "45.33.32.156 POST /api/v1/login 401 25.0",
        "10.0.0.8 GET /config.json 500 110.0",
        "192.168.1.15 GET /index.html 200 18.2"
    ]
    for line in raw_sample_data:
        yield line

# 5. జెనరేటర్ పైప్‌లైన్: రా స్ట్రింగ్‌ను LogRecord ఆబ్జెక్ట్‌గా మార్చడం (Lazy Parsing)
def parse_log_stream(raw_stream):
    for line in raw_stream:
        parts = line.strip().split()
        if len(parts) == 5:
            ip, method, path, status_code, resp_ms = parts
            yield LogRecord(ip, method, path, int(status_code), float(resp_ms))

# 6. జెనరేటర్ ఫిల్టర్: కేవలం సెక్యూరిటీ బెదిరింపులను మాత్రమే ఫిల్టర్ చేయడం
def filter_security_threats(record_stream):
    for record in record_stream:
        if record.is_security_threat():
            yield record

# 7. మొత్తం పైప్‌లైన్ ఎగ్జిక్యూషన్
@benchmark_pipeline
def run_security_audit():
    with LogStreamAuditSession("SOC_HYDERABAD_GATEWAY"):
        raw_stream = generate_raw_server_logs()
        parsed_stream = parse_log_stream(raw_stream)
        threat_stream = filter_security_threats(parsed_stream)

        print("🔍 గుర్తించబడిన భద్రతా బెదిరింపులు (Security Threat Events):")
        threat_count = 0
        for threat in threat_stream:
            threat_count += 1
            print(f"  [హెచ్చరిక #{threat_count}] {threat}")

        print(f"\n📊 మొత్తం విశ్లేషించబడిన బెదిరింపుల సంఖ్య: {threat_count}")

# పైప్‌లైన్ రన్ చేద్దాం
run_security_audit()
</code></pre>
    </div>

    <!-- 5 INTERACTIVE QUIZZES -->
    <h2 class="section-title" style="margin-top:40px;"><span class="num">?</span> మీ అవగాహనను పరీక్షించుకోండి (5 Interactive Quizzes)</h2>

    <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
      <summary style="cursor:pointer; font-weight:600; color:#10b981; font-size:14.5px;">1. ఫంక్షన్ డెకరేటర్లలో @functools.wraps(func) ఎందుకు తప్పనిసరిగా వాడాలి?</summary>
      <div style="font-size:13.5px; color:var(--text); line-height:1.7; margin-top:10px;">
        <strong>సమాధానం:</strong> డెకరేటర్ వాడినప్పుడు అసలు ఫంక్షన్ స్థానంలో ర్యాపర్ ఫంక్షన్ వస్తుంది. <code>@functools.wraps</code> వాడకపోతే అసలు ఫంక్షన్ యొక్క పేరు (<code>__name__</code>) మరియు డాక్యుమెంటేషన్ (<code>__doc__</code>) కోల్పోతాము. <code>wraps</code> ఆ మెటాడేటాను సురక్షితంగా కాపాడుతుంది.
      </div>
    </details>

    <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
      <summary style="cursor:pointer; font-weight:600; color:#10b981; font-size:14.5px;">2. return మరియు yield స్టేట్‌మెంట్ల మధ్య ముఖ్యమైన తేడా ఏమిటి?</summary>
      <div style="font-size:13.5px; color:var(--text); line-height:1.7; margin-top:10px;">
        <strong>సమాధానం:</strong> <code>return</code> ఫంక్షన్ నుండి విలువను ఇచ్చి ఆ ఫంక్షన్‌ను పూర్తిగా ముగించివేస్తుంది (Terminate). కానీ <code>yield</code> విలువను అందించి, ఫంక్షన్ యొక్క స్థితిని (State &amp; Local variables) స్తంభింపజేస్తుంది (Pause). తర్వాత <code>next()</code> పిలిచినప్పుడు అక్కడి నుండే కొనసాగుతుంది.
      </div>
    </details>

    <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
      <summary style="cursor:pointer; font-weight:600; color:#10b981; font-size:14.5px;">3. భారీ డేటాసెట్ల కోసం లిస్టుల కంటే జెనరేటర్లు ఎందుకు సమర్థవంతమైనవి?</summary>
      <div style="font-size:13.5px; color:var(--text); line-height:1.7; margin-top:10px;">
        <strong>సమాధానం:</strong> లిస్ట్ మొత్తం డేటాను ఒకేసారి ర్యామ్ (RAM) లో నిల్వ చేస్తుంది (గిగాబైట్ల మెమరీ అవసరం). జెనరేటర్ లేజీ ఎవాల్యుయేషన్ (Lazy Evaluation) విధానంలో అడిగినప్పుడు ఒక్కో ఎలిమెంట్‌ను మాత్రమే ఉత్పత్తి చేస్తుంది; దీనివల్ల మెమరీ వినియోగం కొన్ని బైట్లలోనే ఉంటుంది.
      </div>
    </details>

    <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
      <summary style="cursor:pointer; font-weight:600; color:#10b981; font-size:14.5px;">4. __str__ మరియు __repr__ మధ్య తేడా ఏమిటి?</summary>
      <div style="font-size:13.5px; color:var(--text); line-height:1.7; margin-top:10px;">
        <strong>సమాధానం:</strong> <code>__str__</code> సాధారణ వినియోగదారులకు చదవడానికి సులభంగా ఉండే ఫార్మాట్‌లో టెక్స్ట్‌ను అందిస్తుంది (User-friendly). <code>__repr__</code> డెవలపర్లకు డీబగ్గింగ్ కోసం ఆబ్జెక్ట్ యొక్క ఖచ్చితమైన సాంకేతిక రూపాన్ని అందిస్తుంది (Unambiguous / Developer-focused).
      </div>
    </details>

    <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
      <summary style="cursor:pointer; font-weight:600; color:#10b981; font-size:14.5px;">5. కాంటెక్స్ట్ మేనేజర్‌లో __exit__ మెథడ్ False ను ఎందుకు రిటర్న్ చేస్తుంది?</summary>
      <div style="font-size:13.5px; color:var(--text); line-height:1.7; margin-top:10px;">
        <strong>సమాధానం:</strong> <code>__exit__</code> లో <code>False</code> (లేదా <code>None</code>) రిటర్న్ చేస్తే, <code>with</code> బ్లాక్‌లో వచ్చిన ఏదైనా ఎక్సెప్షన్ అణచివేయబడకుండా (Not suppressed), బయటి ప్రోగ్రామ్‌కు ప్రయాణించి హ్యాండిల్ చేయబడుతుంది. ఒకవేళ <code>True</code> రిటర్న్ చేస్తే ఎక్సెప్షన్ పూర్తిగా అణచివేయబడుతుంది.
      </div>
    </details>

    <!-- PREV / NEXT NAVIGATION -->
    <div style="display:flex; justify-content:space-between; align-items:center; margin-top:40px; padding-top:20px; border-top:1px solid var(--border); flex-wrap:wrap; gap:16px;">
      <a href="/blog-python/23-python-oop-inheritance-polymorphism.html" style="text-decoration:none; color:var(--text); font-weight:600; display:inline-flex; align-items:center; gap:8px; background:var(--bg2); padding:10px 18px; border-radius:8px; border:1px solid var(--border);">
        ← మునుపటి అధ్యాయం: 23. OOP పిల్లర్స్
      </a>
      <a href="/blog-python/25-python-capstone-project.html" style="text-decoration:none; color:#ffffff; font-weight:700; display:inline-flex; align-items:center; gap:8px; background:#10b981; padding:10px 22px; border-radius:8px; box-shadow:0 4px 12px rgba(16,185,129,0.3);">
        తర్వాతి అధ్యాయం: 25. గ్రాండ్ ఫినాలే క్యాప్‌స్టోన్ ప్రాజెక్ట్ →
      </a>
    </div>

    <!-- INTERACTIVE COMPILER CTA CARD -->
    <div style="margin-top:40px; background:linear-gradient(135deg, rgba(16,185,129,0.1) 0%, rgba(56,189,248,0.1) 100%); border:1px solid rgba(16,185,129,0.3); border-radius:12px; padding:24px; text-align:center;">
      <h3 style="margin-top:0; color:var(--text); font-size:20px;">ఈ Streaming Log Audit Engine ని లైవ్‌గా మన కంపైలర్‌లో రన్ చేయండి!</h3>
      <p style="color:var(--text2); max-width:650px; margin:8px auto 20px; font-size:14px; line-height:1.6;">
        ఎటువంటి లోకల్ సెటప్ లేకుండా, బ్రౌజర్‌లోనే Modern Python 3 కంపైలర్‌లో ఈ డెకరేటర్లు మరియు జెనరేటర్ల కోడ్‌ను ఎగ్జిక్యూట్ చేసి అవుట్‌పుట్ తనిఖీ చేయండి.
      </p>
      <button onclick="openInteractiveCompiler()" style="background:#10b981; color:#ffffff; border:none; padding:12px 28px; font-size:15px; font-weight:700; border-radius:8px; cursor:pointer; transition:transform 0.15s ease;" onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">
        ▶ Launch Python Interactive Compiler
      </button>
    </div>

  </main>
</div>

<!-- FOOTER / NAV SCRIPTS -->
<script src="/site-nav.js"></script>

<script>
  function openInteractiveCompiler() {
    const projectCode = \`# =====================================================================
# చాప్టర్ 24 మినీ ప్రాజెక్ట్: Streaming Generator & Decorator (LIVE DEMO)
# =====================================================================
import time
import functools

def timed(fn):
    @functools.wraps(fn)
    def wrap(*a, **kw):
        t0 = time.perf_counter()
        r = fn(*a, **kw)
        print(f"⏱️ {fn.__name__} took {(time.perf_counter()-t0)*1000:.3f}ms")
        return r
    return wrap

def count_stream(limit):
    for i in range(1, limit + 1):
        yield i * 10

@timed
def process():
    total = sum(count_stream(100_000))
    print(f"✅ Stream Sum: {total}")

process()
print("\\n🎉 చాప్టర్ 24 అడ్వాన్స్‌డ్ పైథాన్ కోడ్ విజయవంతంగా రన్ అయ్యింది! 🚀")
\`;

    try {
      localStorage.setItem('code_python', projectCode);
      localStorage.setItem('code_python3', projectCode);
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
    window.open('/online-python-compiler.html', '_blank');
  }
</script>

</body>
</html>
`;

const outputPath = path.join(__dirname, '..', 'public', 'blog-python', currentLesson.file);
fs.writeFileSync(outputPath, chapter24Content, 'utf8');
console.log('✅ Successfully generated deep high-value Python Chapter 24 in exact HTML style!');
console.log('Target file:', currentLesson.file);
console.log('Target file size:', chapter24Content.length, 'characters');
