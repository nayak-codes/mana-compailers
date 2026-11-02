const fs = require('fs');
const path = require('path');
const { LESSONS, buildPythonSidebar } = require('./python_curriculum_data.js');

const currentLesson = LESSONS.find(l => l.num === 23);

const chapter23Content = `<!DOCTYPE html>
<html lang="te" class="lang-python light-theme">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>23. OOP పిల్లర్స్: Inheritance, Encapsulation &amp; Polymorphism | Modern Python 3 Masterclass</title>
  <meta name="description" content="పైథాన్ OOP పిల్లర్స్: సింగిల్ &amp; మల్టిపుల్ ఇన్హెరిటెన్స్, super(), MRO &amp; C3 లీనియరైజేషన్, ప్రైవేట్ వేరియబుల్స్ &amp; నేమ్ మ్యాంగ్లింగ్, @property గెట్టర్స్/సెట్టర్స్, డక్ టైపింగ్ పాలిమార్ఫిజమ్, abc మాడ్యూల్ అబ్‌స్ట్రాక్ట్ క్లాసెస్.">
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
  ${buildPythonSidebar(23)}

  <main class="content">
    <!-- BREADCRUMB -->
    <div class="breadcrumb">
      <a href="/index.html">హోమ్</a>
      <span class="sep">›</span>
      <a href="/blog-python/index.html">పైథాన్ ట్యుటోరియల్స్</a>
      <span class="sep">›</span>
      <span>చాప్టర్ 23: OOP పిల్లర్స్ (Inheritance &amp; Polymorphism)</span>
    </div>

    <!-- PAGE META BADGES -->
    <div class="page-meta">
      <span class="badge badge-primary">Modern Python 3.12+</span>
      <span class="badge badge-secondary">చాప్టర్ 23 / 25</span>
      <span class="badge badge-outline">Phase 05: OOP &amp; Advanced</span>
      <span class="badge badge-success">2026 Edition</span>
    </div>

    <!-- PAGE TITLE -->
    <h1 class="page-title">23. OOP పిల్లర్స్ — ఇన్హెరిటెన్స్, ఎన్‌క్యాప్సులేషన్ &amp; పాలిమార్ఫిజమ్</h1>

    <!-- COVERED PILL BAR -->
    <div class="covered-bar" style="display:flex; align-items:center; gap:8px; flex-wrap:wrap; background:var(--bg2); padding:10px 16px; border-radius:8px; border:1px solid var(--border); margin:18px 0 24px; font-size:13.5px; color:var(--text2);">
      <strong style="color:var(--text);">📌 Covered in this chapter:</strong>
      <span>The 4 OOP Pillars</span> •
      <span>Single &amp; Multiple Inheritance</span> •
      <span>super() Mechanics &amp; MRO (C3 Linearization)</span> •
      <span>Encapsulation &amp; Name Mangling</span> •
      <span>@property, @setter, @deleter</span> •
      <span>Polymorphism &amp; Duck Typing</span> •
      <span>Abstract Base Classes (abc Module)</span> •
      <span>Enterprise Logistics Capstone</span>
    </div>

    <!-- INTRO BOX -->
    <div class="intro-box">
      మునుపటి అధ్యాయంలో మనం క్లాసులు మరియు ఆబ్జెక్టుల ప్రాథమిక పునాదిని చూశాము. అయితే వాస్తవ ప్రపంచంలో సాఫ్ట్‌వేర్ సంక్లిష్టత పెరిగేకొద్దీ, కోడ్ పునర్వినియోగం (Code Reusability), డేటా భద్రత (Encapsulation), మరియు వివిధ రకాల ఆబ్జెక్టులను ఏకరీతిగా నిర్వహించే సామర్థ్యం (Polymorphism) అత్యంత కీలకం అవుతాయి. ఈ అధ్యాయంలో మనం ఆబ్జెక్ట్ ఓరియెంటెడ్ ప్రోగ్రామింగ్ యొక్క ప్రధాన స్తంభాలను లోతుగా అధ్యయనం చేస్తాం. ఇన్హెరిటెన్స్ ద్వారా బేస్ క్లాస్ ప్రవర్తనను చైల్డ్ క్లాసులకు ఎలా అందించాలి, <code>super()</code> మరియు Method Resolution Order (MRO) డైమండ్ ప్రాబ్లమ్‌ను C3 Linearization ద్వారా ఎలా పరిష్కరిస్తాయి, ప్రైవేట్ వేరియబుల్స్ తెరవెనుక నేమ్ మ్యాంగ్లింగ్ (Name Mangling) ఎలా జరుగుతుంది, <code>@property</code> డెకరేటర్లతో క్లీన్ పైథానిక్ గెట్టర్స్/సెట్టర్స్ ఎలా రాయాలి, మరియు <code>abc</code> మాడ్యూల్ ద్వారా బలమైన కాంట్రాక్ట్ ఇంటర్‌ఫేస్‌లను ఎలా రూపొందించాలో ప్రొడక్షన్ ప్రమాణాలతో నేర్చుకుందాం.
    </div>

    <!-- SECTION 1 -->
    <h2 class="section-title"><span class="num">1</span> ఆబ్జెక్ట్ ఓరియెంటెడ్ ప్రోగ్రామింగ్ 4 ప్రధాన స్తంభాలు (The 4 Pillars of OOP)</h2>
    <p>
      ప్రపంచ స్థాయి సాఫ్ట్‌వేర్ ఆర్కిటెక్చర్లు అన్నీ నాలుగు మౌలిక సిద్ధాంతాలపై ఆధారపడి నిర్మించబడతాయి:
    </p>
    <ul>
      <li><strong>1. Encapsulation (నిక్షిప్తీకరణ):</strong> డేటాను (Fields) మరియు ఆ డేటాపై పనిచేసే పద్ధతులను (Methods) ఒకే యూనిట్‌గా బంధించి, బయటి ప్రపంచం నుండి అనవసరంగా లేదా నేరుగా మార్చకుండా రక్షణ కల్పించడం.</li>
      <li><strong>2. Abstraction (సారాంశీకరణ):</strong> క్లిష్టమైన అంతర్గత పనితీరును (Internal Implementation) దాచిపెట్టి, యూజర్‌కు కేవలం అవసరమైన సులభతరమైన ఇంటర్‌ఫేస్‌ను మాత్రమే ప్రదర్శించడం (ఉదా: కార్ డ్రైవింగ్ చేసేటప్పుడు ఆక్సిలరేటర్ పెడల్ మాత్రమే కనిపిస్తుంది; ఇంజిన్ లోపల ఇంధనం ఇంజెక్షన్ అయ్యే సంక్లిష్టత డ్రైవర్‌కు అవసరం లేదు).</li>
      <li><strong>3. Inheritance (వారసత్వం):</strong> ఇప్పటికే ఉన్న క్లాస్ యొక్క లక్షణాలను మరియు ప్రవర్తనలను కొత్త క్లాస్‌లోకి విస్తరింపజేయడం ("is-a" సంబంధం). దీనివల్ల కోడ్ డూప్లికేషన్ పూర్తిగా నశిస్తుంది (DRY: Don't Repeat Yourself).</li>
      <li><strong>4. Polymorphism (బహురూపత):</strong> ఒకే ఇంటర్‌ఫేస్ లేదా మెథడ్ పేరు ద్వారా విభిన్న రకాల ఆబ్జెక్టులు వాటికి తగినట్లుగా ప్రత్యేకంగా స్పందించే సామర్థ్యం ("Poly" = అనేక, "Morph" = రూపాలు).</li>
    </ul>

    <!-- SECTION 2 -->
    <h2 class="section-title"><span class="num">2</span> ఇన్హెరిటెన్స్ (Inheritance) — బేస్ మరియు డిరైవ్డ్ క్లాస్ బంధం</h2>
    <p>
      ఒక సాధారణ క్లాస్ (Base Class లేదా Parent Class) లోని ఫీచర్లను మరొక ప్రత్యేక క్లాస్ (Derived Class లేదా Child Class) పొందడాన్ని ఇన్హెరిటెన్స్ అంటారు. పేరెంట్ క్లాస్‌లో రాసిన కోడ్‌ను చైల్డ్ క్లాస్ ఉచితంగా పొందుతుంది:
    </p>
    <div style="background:#0f172a; border-radius:8px; padding:16px; font-family:Consolas, monospace; font-size:13px; color:#38bdf8; margin:14px 0; line-height:1.6;">
      # Base / Parent Class<br/>
      class Animal:<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;def __init__(self, name):<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.name = name<br/><br/>
      &nbsp;&nbsp;&nbsp;&nbsp;def eat(self):<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;print(f"{self.name} ఆహారం తింటోంది.")<br/><br/>
      # Derived / Child Class (Animal ని ఇన్హెరిట్ చేసుకుంది)<br/>
      class Dog(Animal):<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;def bark(self):<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;print(f"{self.name} మొరుగుతోంది: భౌ భౌ!")<br/><br/>
      d = Dog("టామీ")<br/>
      d.eat()   # Animal క్లాస్ నుండి ఉచితంగా లభించింది!<br/>
      d.bark()  # Dog క్లాస్ యొక్క సొంత స్పెషలైజ్డ్ మెథడ్
    </div>

    <!-- SECTION 3 -->
    <h2 class="section-title"><span class="num">3</span> మెథడ్ ఓవర్‌రైడింగ్ (Method Overriding)</h2>
    <p>
      పేరెంట్ క్లాస్ అందించిన మెథడ్ బిహేవియర్ చైల్డ్ క్లాస్‌కు సరిపోకపోతే, చైల్డ్ క్లాస్ అదే పేరుతో కొత్త మెథడ్‌ను డిఫైన్ చేసి పేరెంట్ మెథడ్‌ను రీప్లేస్ చేయవచ్చు. దీనిని <strong>Method Overriding</strong> అంటారు:
    </p>
    <div style="background:#0f172a; border-radius:8px; padding:16px; font-family:Consolas, monospace; font-size:13px; color:#38bdf8; margin:14px 0; line-height:1.6;">
      class Bird:<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;def fly(self):<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;print("పక్షి ఆకాశంలో ఎగురుతోంది.")<br/><br/>
      class Penguin(Bird):<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;def fly(self):<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;print("పెంగ్విన్ ఎగరలేదు! ఇది నీటిలో వేగంగా ఈదుతుంది.")<br/><br/>
      p = Penguin()<br/>
      p.fly()  # ప్రింట్ అయ్యేది: పెంగ్విన్ ఎగరలేదు! ఇది నీటిలో వేగంగా ఈదుతుంది.
    </div>

    <!-- SECTION 4 -->
    <h2 class="section-title"><span class="num">4</span> <code>super()</code> ఫంక్షన్ మెకానిక్స్</h2>
    <p>
      చైల్డ్ క్లాస్ స్వంత <code>__init__</code> ను కలిగి ఉన్నప్పుడు, అది పేరెంట్ క్లాస్ యొక్క <code>__init__</code> ను ఓవర్‌రైడ్ చేస్తుంది. దీనివల్ల పేరెంట్ క్లాస్ వేరియబుల్స్ ఇనిషియలైజ్ కావు. పేరెంట్ క్లాస్ కన్‌స్ట్రక్టర్ లేదా మెథడ్‌ను చైల్డ్ క్లాస్ నుండి సేఫ్‌గా పిలవడానికి <code>super()</code> ఫంక్షన్‌ను ఉపయోగిస్తాము:
    </p>
    <div style="background:var(--bg2); border:1px solid var(--border); border-radius:10px; padding:18px; margin:16px 0;">
      <h4 style="margin-top:0; color:#10b981;">super() ఎందుకు బెస్ట్ ప్రాక్టీస్?</h4>
      <p style="font-size:13.5px; line-height:1.7; margin-bottom:8px;">
        సాంప్రదాయకంగా <code>ParentClass.__init__(self, name)</code> అని క్లాస్ పేరును హార్డ్‌కోడ్ చేసి పిలిచేవారు. కానీ భవిష్యత్తులో క్లాస్ పేరు మారినా లేదా మల్టిపుల్ ఇన్హెరిటెన్స్ వచ్చినప్పుడు అది విఫలమవుతుంది. <code>super().__init__(name)</code> అని రాస్తే పైథాన్ స్వయంగా MRO ప్రకారం సరైన పేరెంట్ క్లాస్‌ను డైనమిక్‌గా పిలుస్తుంది (మరియు <code>self</code> ను కూడా మనం అందించాల్సిన అవసరం లేదు!).
      </p>
    </div>

    <!-- SECTION 5 -->
    <h2 class="section-title"><span class="num">5</span> మల్టిపుల్ ఇన్హెరిటెన్స్, డైమండ్ ప్రాబ్లమ్ &amp; MRO (C3 Linearization)</h2>
    <p>
      జావా వంటి భాషలు మల్టిపుల్ ఇన్హెరిటెన్స్‌ను (ఒక క్లాస్ బహుళ క్లాసులను నేరుగా ఇన్హెరిట్ చేసుకోవడం) అనుమతించవు, కానీ పైథాన్ పూర్తి మల్టిపుల్ ఇన్హెరిటెన్స్‌ను సమర్థిస్తుంది. అయితే దీనివల్ల ప్రసిద్ధ <strong>Diamond Problem</strong> ఏర్పడే అవకాశం ఉంది:
    </p>
    <div style="background:#0f172a; border-radius:8px; padding:16px; font-family:Consolas, monospace; font-size:13px; color:#38bdf8; margin:14px 0; line-height:1.6;">
      # డైమండ్ హైరార్కీ:<br/>
      # &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A<br/>
      # &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/ \\<br/>
      # &nbsp;&nbsp;&nbsp;&nbsp;B &nbsp;&nbsp;C<br/>
      # &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\ /<br/>
      # &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;D<br/><br/>
      class A:<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;def ping(self): print("A ping")<br/><br/>
      class B(A):<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;def ping(self): print("B ping")<br/><br/>
      class C(A):<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;def ping(self): print("C ping")<br/><br/>
      class D(B, C):<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;pass<br/><br/>
      d = D()<br/>
      d.ping()  # ఏది పిలవబడుతుంది? B నా లేక C నా? -> "B ping"<br/>
      print(D.mro())  # [D, B, C, A, object]
    </div>
    <p>
      పైథాన్ ఈ గందరగోళాన్ని నివారించడానికి <strong>C3 Linearization Algorithm</strong> ను ఉపయోగిస్తుంది. దీని ఆధారంగా <strong>Method Resolution Order (MRO)</strong> నిర్ధారించబడుతుంది:
      <code>D.__mro__</code> లేదా <code>D.mro()</code> ను తనిఖీ చేస్తే పైథాన్ మొదట D లో, తర్వాత B లో, ఆపై C లో, చివరగా A లో వెతుకుతుందని స్పష్టంగా చూడవచ్చు.
    </p>

    <div style="background:var(--bg2); border:1px solid var(--border); border-radius:10px; padding:18px; margin:16px 0;">
      <h4 style="margin-top:0; color:#10b981;">C3 Linearization అల్గారిథమ్ ప్రాధాన్యత సూత్రాలు:</h4>
      <p style="font-size:13.5px; line-height:1.7; margin-bottom:10px;">
        పైథాన్ 2.2 వరకు వాడిన డెప్త్-ఫస్ట్ సెర్చ్ (DFS) లో డైమండ్ ఇన్హెరిటెన్స్ వచ్చినప్పుడు పేరెంట్ క్లాస్ మెథడ్ చైల్డ్ క్లాస్ కంటే ముందే రన్ అయ్యే ప్రమాదం ఉండేది. దీనిని సరిచేయడానికి పైథాన్ 2.3 నుండి C3 లీనియరైజేషన్‌ను అమలు చేసింది. ఇది 3 ప్రధాన నియమాలను స్థిరంగా పాటిస్తుంది:
      </p>
      <ol style="font-size:13.5px; line-height:1.7; margin-bottom:0; padding-left:20px;">
        <li><strong>చైల్డ్ క్లాస్ ఎల్లప్పుడూ పేరెంట్ క్లాస్ కంటే ముందే పరిశీలించబడుతుంది.</strong></li>
        <li><strong>మల్టిపుల్ పేరెంట్స్ ఉన్నప్పుడు, క్లాస్ డిక్లరేషన్‌లో ఇచ్చిన ఎడమ నుండి కుడి క్రమం (Left-to-Right order: <code>class D(B, C)</code> లో B ముందూ, C తర్వాత) గౌరవించబడుతుంది.</strong></li>
        <li><strong>Monotonicity:</strong> ఒక క్లాస్ యొక్క MRO దాని చైల్డ్ క్లాస్ యొక్క MRO క్రమానికి విరుద్ధంగా ఉండకూడదు. ఒకవేళ విరుద్ధమైన ఆర్డర్ ఏర్పడితే పైథాన్ కంపైలేషన్ సమయంలోనే <code>TypeError: Cannot create a consistent method resolution order (MRO)</code> అని నిరోధిస్తుంది.</li>
      </ol>
    </div>

    <!-- SECTION 6 -->
    <h2 class="section-title"><span class="num">6</span> ఎన్‌క్యాప్సులేషన్: ప్రైవేట్ వేరియబుల్స్ &amp; నేమ్ మ్యాంగ్లింగ్ (Name Mangling)</h2>
    <p>
      పైథాన్‌లో C++ లేదా Java లాంటి కఠినమైన <code>private</code> కీవర్డ్స్ లేవు. అయితే పైథాన్ కమ్యూనిటీ స్పష్టమైన కన్వెన్షన్లు మరియు రన్‌టైమ్ ట్రాన్స్‌ఫార్మేషన్లను కలిగి ఉంది:
    </p>
    <table style="width:100%; border-collapse:collapse; margin:16px 0; font-size:13.5px; text-align:left;">
      <thead>
        <tr style="background:var(--bg2); border-bottom:2px solid var(--border);">
          <th style="padding:10px 12px;">యాక్సెస్ లెవల్</th>
          <th style="padding:10px 12px;">సింటాక్స్</th>
          <th style="padding:10px 12px;">ఉద్దేశం మరియు ప్రవర్తన</th>
        </tr>
      </thead>
      <tbody>
        <tr style="border-bottom:1px solid var(--border);">
          <td style="padding:10px 12px; font-weight:600; color:#10b981;">Public</td>
          <td style="padding:10px 12px;"><code>self.balance</code></td>
          <td style="padding:10px 12px;">ఎక్కడి నుంచైనా స్వేచ్ఛగా చదవవచ్చు మరియు మార్చవచ్చు.</td>
        </tr>
        <tr style="border-bottom:1px solid var(--border);">
          <td style="padding:10px 12px; font-weight:600; color:#f59e0b;">Protected</td>
          <td style="padding:10px 12px;"><code>self._balance</code></td>
          <td style="padding:10px 12px;">ఒక సింగిల్ అండర్‌స్కోర్. ఇది కేవలం కన్వెన్షన్ మాత్రమే (హెచ్చరిక: "ఈ వేరియబుల్‌ను బయట నేరుగా ముట్టుకోవద్దు"). పైథాన్ దీనికి ఎలాంటి యాక్సెస్ రెస్ట్రిక్షన్ విధించదు.</td>
        </tr>
        <tr style="border-bottom:1px solid var(--border);">
          <td style="padding:10px 12px; font-weight:600; color:#ef4444;">Private (Mangled)</td>
          <td style="padding:10px 12px;"><code>self.__balance</code></td>
          <td style="padding:10px 12px;">రెండు లీడింగ్ అండర్‌స్కోర్లు. పైథాన్ రన్‌టైమ్ దీని పేరును అంతర్గతంగా <code>_ClassName__balance</code> గా మారుస్తుంది (Name Mangling). దీనివల్ల సబ్‌క్లాస్‌లలో యాక్సిడెంటల్ ఓవర్‌రైడింగ్ జరగదు.</td>
        </tr>
      </tbody>
    </table>

    <!-- SECTION 7 -->
    <h2 class="section-title"><span class="num">7</span> పైథానిక్ గెట్టర్స్ &amp; సెట్టర్స్: <code>@property</code> డెకరేటర్లు</h2>
    <p>
      Java లో లాగా <code>get_balance()</code> మరియు <code>set_balance(amt)</code> అని అగ్లీ మెథడ్స్ రాయడం పైథానిక్ శైలి కాదు. పైథాన్‌లో <strong>@property</strong> డెకరేటర్‌ను ఉపయోగించి మెథడ్‌ను సాధారణ అట్రిబ్యూట్ లాగా (<code>obj.balance</code>) యాక్సెస్ చేయవచ్చు, అదే సమయంలో వాలిడేషన్ లాజిక్‌ను అమలు చేయవచ్చు:
    </p>
    <div style="background:#0f172a; border-radius:8px; padding:16px; font-family:Consolas, monospace; font-size:13px; color:#38bdf8; margin:14px 0; line-height:1.6;">
      class SecureAccount:<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;def __init__(self, initial_balance):<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self._balance = initial_balance  # ప్రొటెక్టెడ్ ఇంటర్నల్ వేరియబుల్<br/><br/>
      &nbsp;&nbsp;&nbsp;&nbsp;@property<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;def balance(self):<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"""Getter: అట్రిబ్యూట్ లాగా చదవడానికి."""<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return self._balance<br/><br/>
      &nbsp;&nbsp;&nbsp;&nbsp;@balance.setter<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;def balance(self, value):<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"""Setter: వాలిడేషన్ చేసి మాత్రమే అప్‌డేట్ చేయడానికి."""<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if value &lt; 0:<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;raise ValueError("బ్యాలెన్స్ నెగెటివ్ ఉండకూడదు!")<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self._balance = value<br/><br/>
      acc = SecureAccount(5000)<br/>
      print(acc.balance)      # Getter కాల్ అవుతుంది -> 5000<br/>
      acc.balance = 7500      # Setter కాల్ అవుతుంది<br/>
      # acc.balance = -100   # ValueError రేజ్ అవుతుంది!
    </div>

    <div style="background:var(--bg2); border:1px solid var(--border); border-radius:10px; padding:16px; margin:14px 0;">
      <h4 style="margin-top:0; color:#10b981;">ఆధునిక పైథాన్ 3: @cached_property ఫీచర్</h4>
      <p style="font-size:13.5px; line-height:1.7; margin-bottom:8px;">
        పైథాన్ 3.8 లో ప్రవేశపెట్టబడిన <code>functools.cached_property</code> డెకరేటర్ భారీ గణనలు లేదా డేటాబేస్ నుండి లోడ్ చేసే ప్రాపర్టీలకు గేమ్ ఛేంజర్. ఇది మొదటిసారి మాత్రమే ఆ మెథడ్‌ను రన్ చేసి ఫలితాన్ని ఆబ్జెక్ట్ యొక్క <code>__dict__</code> లో క్యాష్ చేస్తుంది; ఆ తర్వాత ఎన్నిసార్లు పిలిచినా ఎటువంటి అదనపు రన్ టైమ్ ఖర్చు లేకుండా తక్షణమే క్యాష్డ్ విలువను అందిస్తుంది!
      </p>
      <div style="background:#0f172a; border-radius:6px; padding:10px 14px; font-family:Consolas, monospace; font-size:12.5px; color:#38bdf8;">
        from functools import cached_property<br/><br/>
        class DataSetAnalytics:<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;def __init__(self, data_list):<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.data = data_list<br/><br/>
        &nbsp;&nbsp;&nbsp;&nbsp;@cached_property<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;def variance(self):<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;print("⚡ భారీ గణన జరుగుతోంది (కేవలం 1st time మాత్రమే)...")<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;mean = sum(self.data) / len(self.data)<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return sum((x - mean) ** 2 for x in self.data) / len(self.data)
      </div>
    </div>

    <!-- SECTION 8 -->
    <h2 class="section-title"><span class="num">8</span> పాలిమార్ఫిజమ్ (Polymorphism), డక్ టైపింగ్ &amp; Static Protocols</h2>
    <p>
      పైథాన్‌లో పాలిమార్ఫిజమ్ చాలా సహజంగా మరియు అద్భుతంగా పనిచేస్తుంది. ప్రసిద్ధ పైథానిక్ సూత్రం:
    </p>
    <div style="background:var(--bg2); border-left:4px solid #10b981; padding:12px 18px; margin:14px 0; font-style:italic;">
      "If it walks like a duck and quacks like a duck, it's a duck." (ఒక పక్షి బాతు లాగా నడిచి, బాతు లాగా అరిస్తే, అది బాతు అనే నిర్ధారించుకోవచ్చు — అది ఏ క్లాస్‌కు చెందినదో కఠినంగా తనిఖీ చేయాల్సిన పనిలేదు).
    </div>
    <p>
      అంటే ఒక ఫంక్షన్‌కు వచ్చే ఆబ్జెక్ట్ ఏ క్లాస్‌కు చెందినదో చూడకుండా, దానికి మనం కోరుకున్న మెథడ్ (ఉదా: <code>process_payment()</code>) ఉందా లేదా అనేది మాత్రమే చూస్తాము:
    </p>
    <div style="background:#0f172a; border-radius:8px; padding:16px; font-family:Consolas, monospace; font-size:13px; color:#38bdf8; margin:14px 0; line-height:1.6;">
      def process_checkout(payment_provider, amount):<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;# payment_provider ఏ క్లాస్ అయినా సంబంధం లేదు, அதற்கு pay() ఉంటే చాలు!<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;payment_provider.pay(amount)
    </div>
    <p>
      ఆధునిక పైథాన్ 3.8+ లో <strong>typing.Protocol</strong> (PEP 544) ను ప్రవేశపెట్టారు. దీనిని <strong>Static Duck Typing</strong> అంటారు. దీనివల్ల రన్‌టైమ్‌లో ఇన్హెరిటెన్స్ భారం లేకుండానే, Mypy / Pyright వంటి టైప్ చెకర్లు ఆబ్జెక్ట్ సరైన పద్ధతులను కలిగి ఉందో లేదో కంపైల్/లింట్ సమయంలోనే ఖచ్చితంగా వెరిఫై చేయగలవు!
    </p>

    <!-- SECTION 9 -->
    <h2 class="section-title"><span class="num">9</span> అబ్‌స్ట్రాక్ట్ బేస్ క్లాసెస్ (Abstract Base Classes - ABC)</h2>
    <p>
      పెద్ద ఎంటర్‌ప్రైజ్ సిస్టమ్స్‌లో టీమ్‌లోని డెవలపర్లు నిర్దిష్టమైన రూల్స్‌ను తప్పనిసరిగా అమలు చేసేలా బలవంతం చేయడానికి (Enforce Interface Contracts) పైథాన్ యొక్క <code>abc</code> మాడ్యూల్‌ను ఉపయోగిస్తాము:
    </p>
    <ul>
      <li><strong><code>from abc import ABC, abstractmethod</code>:</strong> బేస్ క్లాస్‌ను <code>ABC</code> నుండి డిరైవ్ చేయాలి.</li>
      <li><strong><code>@abstractmethod</code>:</strong> ఏ మెథడ్ ముందైతే ఈ డెకరేటర్ ఉంటుందో, ఆ మెథడ్‌ను చైల్డ్ క్లాస్ తప్పనిసరిగా స్వయంగా ఇంప్లిమెంట్ చేయాలి! లేకపోతే చైల్డ్ క్లాస్ ఆబ్జెక్ట్‌ను సృష్టించడానికి ప్రయత్నించినప్పుడు పైథాన్ <code>TypeError: Can't instantiate abstract class with abstract method</code> అని నిరోధిస్తుంది.</li>
    </ul>

    <!-- SECTION 10 -->
    <h2 class="section-title"><span class="num">10</span> కోడ్ డెమో 1: పేమెంట్ గేట్‌వే ఆర్కిటెక్చర్ (ABC &amp; Polymorphism)</h2>
    <p>
      UPI, క్రెడిట్ కార్డ్ మరియు క్రిప్టో పేమెంట్‌లను ఏకరీతిగా ప్రాసెస్ చేసే అబ్‌స్ట్రాక్ట్ పేమెంట్ సిస్టమ్‌ను నిర్మిద్దాం:
    </p>

    <!-- CODE BLOCK 1 -->
    <div class="code-block">
      <div class="code-header">
        <span class="file-name">01_payment_gateway_abc.py</span>
        <div class="btn-group">
          <button class="btn btn-copy" onclick="copyCode(this)">Copy</button>
          <button class="btn btn-run" onclick="runCodeInCompiler(this)">Run ▶</button>
        </div>
      </div>
      <pre><code class="language-python">from abc import ABC, abstractmethod

# అబ్‌స్ట్రాక్ట్ ఇంటర్‌ఫేస్ కాంట్రాక్ట్
class PaymentGateway(ABC):
    def __init__(self, merchant_name: str):
        self.merchant_name = merchant_name

    @abstractmethod
    def authorize(self, amount: float) -> bool:
        """చెల్లింపును ఆథరైజ్ చేసే విధానం."""
        pass

    @abstractmethod
    def execute_payment(self, amount: float) -> bool:
        """నగదు బదిలీ జరిపే విధానం."""
        pass

# 1. UPI గేట్‌వే
class UPIPayment(PaymentGateway):
    def __init__(self, merchant_name: str, upi_vpa: str):
        super().__init__(merchant_name)
        self.upi_vpa = upi_vpa

    def authorize(self, amount: float) -> bool:
        print(f"📱 UPI VPA [{self.upi_vpa}] కి ₹{amount} పిన్ రిక్వెస్ట్ పంపబడింది.")
        return True

    def execute_payment(self, amount: float) -> bool:
        print(f"✅ UPI ద్వారా ₹{amount:,.2f} చెల్లింపు విజయవంతమైంది! మర్చంట్: {self.merchant_name}")
        return True

# 2. Credit Card గేట్‌వే
class CreditCardPayment(PaymentGateway):
    def __init__(self, merchant_name: str, card_last4: str):
        super().__init__(merchant_name)
        self.card_last4 = card_last4

    def authorize(self, amount: float) -> bool:
        print(f"💳 కార్డ్ *{self.card_last4} కి 3D-Secure OTP ధృవీకరణ పూర్తయింది.")
        return True

    def execute_payment(self, amount: float) -> bool:
        print(f"✅ క్రెడిట్ కార్డుతో ₹{amount:,.2f} వసూలు చేయబడింది! మర్చంట్: {self.merchant_name}")
        return True

# పాలిమార్ఫిక్ క్లయింట్ ఫంక్షన్
def process_order_checkout(gateway: PaymentGateway, total_amount: float):
    print("\n--- ఆర్డర్ చెక్అవుట్ ప్రాసెస్ మొదలైంది ---")
    if gateway.authorize(total_amount):
        gateway.execute_payment(total_amount)

# పరీక్షించడం
upi = UPIPayment("భారత్ మార్ట్", "balaji@okaxis")
card = CreditCardPayment("భారత్ మార్ట్", "8821")

process_order_checkout(upi, 1499.0)
process_order_checkout(card, 8950.0)
</code></pre>
    </div>

    <!-- SECTION 11 -->
    <h2 class="section-title"><span class="num">11</span> కోడ్ డెమో 2: కార్పొరేట్ ఎంప్లాయ్ హైరార్కీ with @property Validation</h2>
    <p>
      ఇన్హెరిటెన్స్, <code>super()</code>, మరియు <code>@property</code> వాలిడేషన్ కలగలసిన కార్పొరేట్ ఉద్యోగుల ఆర్కిటెక్చర్‌ను చూద్దాం:
    </p>

    <!-- CODE BLOCK 2 -->
    <div class="code-block">
      <div class="code-header">
        <span class="file-name">02_employee_hierarchy_properties.py</span>
        <div class="btn-group">
          <button class="btn btn-copy" onclick="copyCode(this)">Copy</button>
          <button class="btn btn-run" onclick="runCodeInCompiler(this)">Run ▶</button>
        </div>
      </div>
      <pre><code class="language-python"># బేస్ క్లాస్
class BaseEmployee:
    def __init__(self, emp_id: str, name: str, base_salary: float):
        self.emp_id = emp_id
        self.name = name
        self._salary = base_salary

    @property
    def salary(self):
        return self._salary

    @salary.setter
    def salary(self, value):
        if value &lt; 20000.0:
            raise ValueError("కనీస వేతనం ₹20,000 కన్నా తక్కువ ఉండకూడదు!")
        self._salary = value

    def calculate_annual_ctc(self) -&gt; float:
        return self._salary * 12

# సాఫ్ట్‌వేర్ ఇంజనీర్ సబ్‌క్లాస్
class SoftwareEngineer(BaseEmployee):
    def __init__(self, emp_id: str, name: str, base_salary: float, tech_stack: list):
        super().__init__(emp_id, name, base_salary)
        self.tech_stack = tech_stack

    def calculate_annual_ctc(self) -&gt; float:
        base_annual = super().calculate_annual_ctc()
        tech_allowance = 50000.0  # టెక్నాలజీ అలవెన్స్
        return base_annual + tech_allowance

# మేనేజర్ సబ్‌క్లాస్
class EngineeringManager(BaseEmployee):
    def __init__(self, emp_id: str, name: str, base_salary: float, team_size: int):
        super().__init__(emp_id, name, base_salary)
        self.team_size = team_size

    def calculate_annual_ctc(self) -&gt; float:
        base_annual = super().calculate_annual_ctc()
        mgmt_bonus = self.team_size * 25000.0  # ప్రతి టీమ్ మెంబర్‌కు బోనస్
        return base_annual + mgmt_bonus

# టెస్టింగ్
dev = SoftwareEngineer("DEV101", "రాహుల్ వర్మ", 75000.0, ["Python", "Docker", "AWS"])
mgr = EngineeringManager("MGR001", "సుస్మిత", 120000.0, team_size=8)

print(f"👨‍💻 {dev.name} వార్షిక CTC: ₹{dev.calculate_annual_ctc():,.2f}")
print(f"👩‍💼 {mgr.name} వార్షిక CTC: ₹{mgr.calculate_annual_ctc():,.2f}")
</code></pre>
    </div>

    <!-- SECTION 12 -->
    <h2 class="section-title"><span class="num">12</span> కామన్ బిగినర్స్ మిస్టేక్స్ &amp; ప్రొడక్షన్ బెస్ట్ ప్రాక్టీసెస్</h2>
    <ul>
      <li><strong>Composition Over Inheritance:</strong> బిగినర్స్ ప్రతి చిన్న లాజిక్ కోసం క్లాసులను ఇన్హెరిట్ చేస్తుంటారు. కానీ ప్రముఖ డిజైన్ ప్రిన్సిపల్: <em>"Favor object composition over class inheritance"</em>. సంబంధం "is-a" (కారు అనేది ఒక వాహనం) అయినప్పుడు మాత్రమే ఇన్హెరిటెన్స్ వాడండి; సంబంధం "has-a" (కారుకు ఒక ఇంజిన్ ఉంది) అయినప్పుడు ఆబ్జెక్ట్‌ను క్లాస్ లోపల ఒక వేరియబుల్‌గా ఉంచండి (Composition).</li>
      <li><strong>Fragile Base Class Problem:</strong> లోతైన ఇన్హెరిటెన్స్ చెట్లలో (Deep Inheritance Trees - 4-5 స్థాయిలు), పేరెంట్ క్లాస్‌లో చేసిన ఒక చిన్న మార్పు దూరంగా ఉన్న చైల్డ్ క్లాసులను బ్రేక్ చేస్తుంది. ఎల్లప్పుడూ హైరార్కీని గరిష్టంగా 2-3 స్థాయిలకే పరిమితం చేయండి.</li>
      <li><strong>Name Mangling ను సెక్యూరిటీ అనుకోవడం:</strong> <code>__private</code> వేరియబుల్స్ పూర్తిగా సురక్షితమైనవి కావు; ఎవరైనా <code>obj._ClassName__variable</code> ద్వారా వాటిని మార్చవచ్చు. ఇది కేవలం వేరియబుల్ కొల్లిజన్ నివారణకే.</li>
    </ul>

    <!-- SECTION 13 -->
    <h2 class="section-title"><span class="num">13</span> రియల్-వరల్డ్ ప్రాజెక్ట్: "Multi-Tier Enterprise Logistics &amp; Shipping Pipeline"</h2>
    <p>
      ఈ అధ్యాయంలో నేర్చుకున్న అన్ని కాన్సెప్టులను (ABC ఇంటర్‌ఫేస్, సింగిల్ &amp; మల్టిపుల్ ఇన్హెరిటెన్స్, <code>super()</code>, <code>@property</code> వాలిడేషన్, డక్ టైపింగ్ పాలిమార్ఫిజమ్) సమగ్రంగా ఏకీకృతం చేస్తూ — వివిధ రకాల కార్గో రవాణాలను (Road, Air, Maritime Express) సురక్షితంగా లెక్కించే పూర్తి స్థాయి <strong>Enterprise Multi-Tier Logistics Shipping Pipeline</strong> ను నిర్మిద్దాం!
    </p>

    <!-- CODE BLOCK 3: CAPSTONE MINI PROJECT -->
    <div class="code-block">
      <div class="code-header">
        <span class="file-name">03_enterprise_logistics_pipeline.py</span>
        <div class="btn-group">
          <button class="btn btn-copy" onclick="copyCode(this)">Copy</button>
          <button class="btn btn-run" onclick="runCodeInCompiler(this)">Run ▶</button>
        </div>
      </div>
      <pre><code class="language-python"># =====================================================================
# చాప్టర్ 23 ప్రాజెక్ట్: Enterprise Multi-Tier Logistics Shipping Pipeline
# కాన్సెప్ట్స్: ABC Contracts, super(), Property Validation, Polymorphism
# =====================================================================
from abc import ABC, abstractmethod
import datetime

# 1. అబ్‌స్ట్రాక్ట్ కార్గో షిప్పింగ్ బేస్ క్లాస్
class BaseShipment(ABC):
    def __init__(self, tracking_id: str, origin: str, dest: str, weight_kg: float):
        self.tracking_id = tracking_id
        self.origin = origin
        self.dest = dest
        self._weight_kg = weight_kg
        self.created_at = datetime.datetime.now()

    @property
    def weight_kg(self):
        return self._weight_kg

    @weight_kg.setter
    def weight_kg(self, value):
        if value &lt;= 0:
            raise ValueError("కార్గో బరువు సున్నా కన్నా ఎక్కువ ఉండాలి!")
        self._weight_kg = value

    @abstractmethod
    def calculate_cost(self) -&gt; float:
        """ప్రతి రవాణా విధానం స్వంత ధర లెక్కించే లాజిక్."""
        pass

    @abstractmethod
    def estimated_delivery_days(self) -&gt; int:
        """డెలివరీకి పట్టే రోజుల అంచనా."""
        pass

# 2. రోడ్ లాజిస్టిక్స్ (సర్ఫేస్ డెలివరీ)
class RoadSurfaceShipment(BaseShipment):
    def __init__(self, tracking_id: str, origin: str, dest: str, weight_kg: float, distance_km: float):
        super().__init__(tracking_id, origin, dest, weight_kg)
        self.distance_km = distance_km

    def calculate_cost(self) -&gt; float:
        base_rate = 50.0  # ప్రారంభ ఛార్జ్
        cost = base_rate + (self.weight_kg * 12.0) + (self.distance_km * 3.5)
        return cost

    def estimated_delivery_days(self) -&gt; int:
        return max(2, int(self.distance_km / 400) + 1)

# 3. ఎయిర్ కార్గో (ఎక్స్‌ప్రెస్ డెలివరీ)
class AirExpressShipment(BaseShipment):
    def __init__(self, tracking_id: str, origin: str, dest: str, weight_kg: float, is_hazardous: bool = False):
        super().__init__(tracking_id, origin, dest, weight_kg)
        self.is_hazardous = is_hazardous

    def calculate_cost(self) -&gt; float:
        flat_air_surcharge = 500.0
        haz_fee = 1200.0 if self.is_hazardous else 0.0
        return flat_air_surcharge + haz_fee + (self.weight_kg * 65.0)

    def estimated_delivery_days(self) -&gt; int:
        return 1  # నెక్స్ట్ డే ఎక్స్‌ప్రెస్

# 4. సెంట్రల్ లాజిస్టిక్స్ డిస్పాచర్ ఇంజిన్ (పాలిమార్ఫిక్ ప్రాసెసర్)
class LogisticsDispatcher:
    def __init__(self, hub_name: str):
        self.hub_name = hub_name
        self.manifest = []

    def dispatch_cargo(self, shipment: BaseShipment):
        # పాలిమార్ఫిజమ్: shipment రకం ఏదైనా సంబంధం లేకుండా calculate_cost() పనిచేస్తుంది
        cost = shipment.calculate_cost()
        days = shipment.estimated_delivery_days()
        self.manifest.append(shipment)
        
        print(f"📦 [ట్రాకింగ్: {shipment.tracking_id}] డిస్పాచ్ అయింది!")
        print(f"   • రకం: {shipment.__class__.__name__}")
        print(f"   • మార్గం: {shipment.origin} -&gt; {shipment.dest} (బరువు: {shipment.weight_kg} KG)")
        print(f"   • షిప్పింగ్ ఛార్జ్: ₹{cost:,.2f} | అంచనా డెలివరీ: {days} రోజు(లు)")
        print("-" * 65)

    def print_manifest_summary(self):
        print(f"\n==================== {self.hub_name} మానిఫెస్ట్ సారాంశం ====================")
        total_freight_cost = sum(s.calculate_cost() for s in self.manifest)
        total_weight = sum(s.weight_kg for s in self.manifest)
        print(f"మొత్తం పార్సిల్స్: {len(self.manifest)}")
        print(f"మొత్తం కార్గో బరువు: {total_weight:,.2f} KG")
        print(f"మొత్తం షిప్పింగ్ రాబడి (Revenue): ₹{total_freight_cost:,.2f}")
        print("========================================================================\n")


# =====================================================================
# పైప్‌లైన్ సిమ్యులేషన్
# =====================================================================
dispatcher = LogisticsDispatcher("హైదరాబాద్ సెంట్రల్ లాజిస్టిక్స్ హబ్")

# వివిధ రకాల రవాణా ఆర్డర్లు
shipment1 = RoadSurfaceShipment("TRK-HYD-001", "హైదరాబాద్", "విజయవాడ", weight_kg=25.0, distance_km=275.0)
shipment2 = AirExpressShipment("TRK-AIR-909", "హైదరాబాద్", "ముంబై", weight_kg=8.5, is_hazardous=False)
shipment3 = AirExpressShipment("TRK-AIR-910", "హైదరాబాద్", "న్యూఢిల్లీ", weight_kg=15.0, is_hazardous=True)

# డిస్పాచ్ ప్రాసెసింగ్
dispatcher.dispatch_cargo(shipment1)
dispatcher.dispatch_cargo(shipment2)
dispatcher.dispatch_cargo(shipment3)

# మొత్తం హబ్ సారాంశం
dispatcher.print_manifest_summary()
</code></pre>
    </div>

    <!-- 5 INTERACTIVE QUIZZES -->
    <h2 class="section-title" style="margin-top:40px;"><span class="num">?</span> మీ అవగాహనను పరీక్షించుకోండి (5 Interactive Quizzes)</h2>

    <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
      <summary style="cursor:pointer; font-weight:600; color:#10b981; font-size:14.5px;">1. super() ఫంక్షన్ యొక్క ప్రధాన ప్రయోజనం ఏమిటి?</summary>
      <div style="font-size:13.5px; color:var(--text); line-height:1.7; margin-top:10px;">
        <strong>సమాధానం:</strong> <code>super()</code> చైల్డ్ క్లాస్ నుండి పేరెంట్ క్లాస్ యొక్క మెథడ్స్ మరియు కన్‌స్ట్రక్టర్‌ను నేరుగా హార్డ్‌కోడ్ చేయకుండా, పైథాన్ యొక్క Method Resolution Order (MRO) ప్రకారం సురక్షితంగా మరియు డైనమిక్‌గా పిలవడానికి అనుమతిస్తుంది.
      </div>
    </details>

    <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
      <summary style="cursor:pointer; font-weight:600; color:#10b981; font-size:14.5px;">2. డైమండ్ ప్రాబ్లమ్‌ను పైథాన్ ఏ అల్గారిథమ్ ద్వారా పరిష్కరిస్తుంది?</summary>
      <div style="font-size:13.5px; color:var(--text); line-height:1.7; margin-top:10px;">
        <strong>సమాధానం:</strong> పైథాన్ <strong>C3 Linearization Algorithm</strong> ద్వారా Method Resolution Order (MRO) ను లెక్కిస్తుంది. దీని ద్వారా ఏ క్లాస్ మెథడ్ ఏ క్రమంలో అమలు కావాలో ఖచ్చితంగా నిర్ణయించబడుతుంది.
      </div>
    </details>

    <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
      <summary style="cursor:pointer; font-weight:600; color:#10b981; font-size:14.5px;">3. Name Mangling అంటే ఏమిటి? ఇది ఎప్పుడు సంభవిస్తుంది?</summary>
      <div style="font-size:13.5px; color:var(--text); line-height:1.7; margin-top:10px;">
        <strong>సమాధానం:</strong> రెండు లీడింగ్ అండర్‌స్కోర్లతో డిక్లేర్ చేసిన వేరియబుల్స్ (ఉదా: <code>__salary</code>) పేరును పైథాన్ అంతర్గతంగా <code>_ClassName__salary</code> గా మారుస్తుంది. దీనివల్ల చైల్డ్ క్లాసుల్లో పొరపాటున ఆ వేరియబుల్ ఓవర్‌రైట్ కాకుండా నిరోధించబడుతుంది.
      </div>
    </details>

    <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
      <summary style="cursor:pointer; font-weight:600; color:#10b981; font-size:14.5px;">4. పైథాన్‌లో డక్ టైపింగ్ (Duck Typing) అంటే ఏమిటి?</summary>
      <div style="font-size:13.5px; color:var(--text); line-height:1.7; margin-top:10px;">
        <strong>సమాధానం:</strong> ఆబ్జెక్ట్ యొక్క ఖచ్చితమైన డేటాటైప్ లేదా క్లాస్ ఏమిటనేది తనిఖీ చేయకుండా, దానికి మనం పిలవదలచుకున్న మెథడ్ ఉందా లేదా అనేది మాత్రమే చూసే పద్ధతిని డక్ టైపింగ్ అంటారు.
      </div>
    </details>

    <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
      <summary style="cursor:pointer; font-weight:600; color:#10b981; font-size:14.5px;">5. @abstractmethod ఉన్న క్లాస్‌ను నేరుగా ఆబ్జెక్ట్‌గా సృష్టించవచ్చా?</summary>
      <div style="font-size:13.5px; color:var(--text); line-height:1.7; margin-top:10px;">
        <strong>సమాధానం:</strong> సృష్టించలేము! అబ్‌స్ట్రాక్ట్ మెథడ్స్ ఉన్న క్లాస్‌ను నేరుగా ఇన్స్టాన్షియేట్ చేయడానికి ప్రయత్నిస్తే పైథాన్ <code>TypeError</code> ను రైజ్ చేస్తుంది. చైల్డ్ క్లాస్ ఆ మెథడ్స్‌ను పూర్తిగా ఇంప్లిమెంట్ చేసిన తర్వాతే ఆబ్జెక్ట్ సృష్టించబడుతుంది.
      </div>
    </details>

    <!-- PREV / NEXT NAVIGATION -->
    <div style="display:flex; justify-content:space-between; align-items:center; margin-top:40px; padding-top:20px; border-top:1px solid var(--border); flex-wrap:wrap; gap:16px;">
      <a href="/blog-python/22-python-oop-classes-and-objects.html" style="text-decoration:none; color:var(--text); font-weight:600; display:inline-flex; align-items:center; gap:8px; background:var(--bg2); padding:10px 18px; border-radius:8px; border:1px solid var(--border);">
        ← మునుపటి అధ్యాయం: 22. OOP బేసిక్స్
      </a>
      <a href="/blog-python/24-python-decorators-generators-dunder.html" style="text-decoration:none; color:#ffffff; font-weight:700; display:inline-flex; align-items:center; gap:8px; background:#10b981; padding:10px 22px; border-radius:8px; box-shadow:0 4px 12px rgba(16,185,129,0.3);">
        తర్వాతి అధ్యాయం: 24. డెకరేటర్లు, జెనరేటర్లు &amp; డండర్ మెథడ్స్ →
      </a>
    </div>

    <!-- INTERACTIVE COMPILER CTA CARD -->
    <div style="margin-top:40px; background:linear-gradient(135deg, rgba(16,185,129,0.1) 0%, rgba(56,189,248,0.1) 100%); border:1px solid rgba(16,185,129,0.3); border-radius:12px; padding:24px; text-align:center;">
      <h3 style="margin-top:0; color:var(--text); font-size:20px;">ఈ Enterprise Logistics Shipping Engine ని లైవ్‌గా మన కంపైలర్‌లో రన్ చేయండి!</h3>
      <p style="color:var(--text2); max-width:650px; margin:8px auto 20px; font-size:14px; line-height:1.6;">
        ఎటువంటి లోకల్ సెటప్ లేకుండా, బ్రౌజర్‌లోనే Modern Python 3 కంపైలర్‌లో ఈ OOP ఇన్హెరిటెన్స్ మరియు పాలిమార్ఫిజమ్ కోడ్‌ను ఎగ్జిక్యూట్ చేసి అవుట్‌పుట్ తనిఖీ చేయండి.
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
# చాప్టర్ 23 మినీ ప్రాజెక్ట్: Logistics Pipeline (LIVE DEMO)
# =====================================================================
from abc import ABC, abstractmethod

class BaseShipment(ABC):
    def __init__(self, tid, weight):
        self.tid = tid
        self.weight = weight

    @abstractmethod
    def get_cost(self): pass

class AirExpress(BaseShipment):
    def get_cost(self):
        return 300 + (self.weight * 50)

class Surface(BaseShipment):
    def get_cost(self):
        return 50 + (self.weight * 10)

def ship(parcel: BaseShipment):
    print(f"📦 Parcel {parcel.tid}: ₹{parcel.get_cost():,.2f}")

ship(AirExpress("AIR-101", 5.0))
ship(Surface("SUR-202", 15.0))
print("\\n🎉 చాప్టర్ 23 OOP ఇన్హెరిటెన్స్ విజయవంతంగా రన్ అయ్యింది! 🚀")
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
fs.writeFileSync(outputPath, chapter23Content, 'utf8');
console.log('✅ Successfully generated deep high-value Python Chapter 23 in exact HTML style!');
console.log('Target file:', currentLesson.file);
console.log('Target file size:', chapter23Content.length, 'characters');
