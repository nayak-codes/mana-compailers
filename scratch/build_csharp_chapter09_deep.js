const fs = require('fs');
const path = require('path');
const { buildSidebar } = require('./csharp_curriculum_data');

const sidebarHtml = buildSidebar(9);

const fullHtml = `<!DOCTYPE html>
<html class="light-theme" lang="te">
<head>
  <!-- Character Encoding & Viewport -->
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">

  <!-- SEO Title & Meta Tags -->
  <title>C# మెథడ్స్ &amp; పారామీటర్ మోడిఫైయర్స్ (ref, out, in, params) — C# Masterclass | Mana Compiler</title>
  <meta name="description" content="C# లో మెథడ్స్, Pass-by-Value vs Reference, ref, out, in, params కీవర్డ్స్, Expression-bodied methods, మరియు పేరోల్ ఇంజిన్‌పై సమగ్ర తెలుగు గైడ్.">
  <meta name="keywords" content="c# methods telugu, c# ref out in telugu, c# params keyword, c# recursion, c# pass by reference">
  <meta name="author" content="Our Compiler Technical Editorial Team">

  <!-- Open Graph Meta Tags -->
  <meta property="og:title" content="C# మెథడ్స్ &amp; పారామీటర్ మోడిఫైయర్స్ (ref, out, in, params) — C# Masterclass">
  <meta property="og:description" content="C# లో మెథడ్స్, స్టాక్ మెమరీ బిహేవియర్, ref, out, in, params మరియు రికర్షన్‌పై పూర్తి తెలుగు ప్రాక్టికల్ గైడ్.">
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="Mana Compiler">

  <!-- Canonical URL -->
  <link rel="canonical" href="https://www.ourcompiler.com/blog-csharp/09-csharp-methods-parameters-ref-out-in.html">

  <!-- Favicon -->
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">

  <!-- Stylesheets -->
  <link rel="stylesheet" href="/site-nav.css">
  <link rel="stylesheet" href="/blog-csharp/style.css">

  <style>
    /* Inline enhancement overrides to guarantee ivory intro box and green numbers */
    body.light-theme .intro-box {
      background: #fefce8 !important;
      border: 1px solid #fde047 !important;
      border-left: 5px solid #10b981 !important;
      border-radius: 12px !important;
      padding: 22px 24px !important;
      margin-bottom: 32px !important;
      box-shadow: 0 4px 14px rgba(202, 138, 4, 0.08) !important;
    }
    body.light-theme .intro-box h3,
    body.light-theme .intro-box h4 {
      color: #713f12 !important;
      font-weight: 800 !important;
      margin-bottom: 8px !important;
    }
    body.light-theme .intro-box p {
      color: #1e293b !important;
      font-size: 15.5px !important;
      line-height: 1.8 !important;
      margin-bottom: 12px !important;
    }
    body.light-theme .intro-box p:last-child {
      margin-bottom: 0 !important;
    }
    .section-title {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 22px;
      font-weight: 800;
      color: var(--text);
      margin-top: 42px;
      margin-bottom: 16px;
      border-bottom: 2px solid var(--border);
      padding-bottom: 8px;
    }
    .section-title .num {
      background: #10b981 !important;
      color: #ffffff !important;
      font-size: 13px !important;
      font-weight: 800 !important;
      border-radius: 50% !important;
      width: 28px !important;
      height: 28px !important;
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;
      flex-shrink: 0 !important;
      box-shadow: 0 2px 6px rgba(16, 185, 129, 0.35) !important;
    }
  </style>
</head>
<body class="lang-csharp light-theme">

<!-- TOP GLOBAL NAVIGATION -->
<div id="site-nav"><header class="site-header">
  <div class="header-left">
    <a href="/" class="logo">
      <span class="logo-bracket">{</span>
      <span class="logo-text">Our Compiler</span>
      <span class="logo-bracket">}</span>
    </a>
    <nav class="nav-links">
      <a href="/online-python-compiler.html">Python</a>
      <a href="/online-java-compiler.html">Java</a>
      <a href="/online-html-editor.html">HTML / CSS / JS</a>
      <a href="/online-c-compiler.html">C</a>
      <a href="/online-cpp-compiler.html">C++</a>
      <a href="/online-javascript-compiler.html">JavaScript</a>
      <a href="/online-csharp-compiler.html" class="active">C#</a>
    </nav>
  </div>
  <div class="header-right">
    <a href="/online-csharp-compiler.html" class="btn-primary">▶ Start Coding</a>
    <button id="themeToggle" class="theme-btn" aria-label="Toggle theme">🌙</button>
  </div>
</header></div>

<div class="page-layout">

  <!-- SIDEBAR NAVIGATION -->
  <aside class="sidebar" id="sidebar">
    <div class="sidebar-header">
      <div class="sidebar-meta">
        <span class="series-badge">C# Master Course (తెలుగు)</span>
        <h2 class="sidebar-title">C# &amp; .NET 8 సిలబస్</h2>
      </div>
    </div>
    
    <a href="/blog-csharp.html" class="course-home-btn">
      <span class="icon">⚡</span> C# Course HOME (ఇండెక్స్)
    </a>

    <!-- Dynamic Phase Accordions -->
    <div class="accordion-group">
${sidebarHtml}
    </div>

    <div class="sidebar-heading" style="margin-top:20px;">ఇంటరాక్టివ్ ఎడిటర్</div>
    <a href="/online-csharp-compiler.html" style="color:#10b981; font-weight:700; text-decoration:none; padding:8px 12px; display:block;">▶ Try C# Online Compiler</a>
    <a href="/blog.html" style="color:var(--text2); text-decoration:none; padding:8px 12px; display:block;">📁 All Tutorials Index</a>
  </aside>

  <!-- MAIN ARTICLE CONTENT -->
  <main class="content">

    <!-- BREADCRUMBS -->
    <div class="breadcrumb">
      <a href="/">Home</a> › 
      <a href="/blog.html">Tutorials</a> › 
      <a href="/blog-csharp.html">C# Masterclass</a> › 
      <span>Chapter 09: మెథడ్స్ &amp; పారామీటర్ మోడిఫైయర్స్</span>
    </div>

    <!-- MAIN HEADING -->
    <h1 class="lesson-title">C# మెథడ్స్ &amp; పారామీటర్ మోడిఫైయర్స్ (ref, out, in, params)</h1>

    <!-- LESSON META BADGES -->
    <div class="lesson-meta">
      <span class="meta-pill">⚡ Modern C# 12 / .NET 8 LTS</span>
      <span class="meta-pill">📖 Chapter 09 of 20</span>
      <span class="meta-pill">📁 Phase 03: మెథడ్స్, స్ట్రింగ్స్ &amp; కలెక్షన్స్</span>
      <span class="meta-pill">🎓 2026 Academic Edition</span>
    </div>

    <!-- COVERED TOPICS PILL BAR -->
    <div style="background:var(--bg2); border:1px solid var(--border); border-radius:10px; padding:12px 18px; margin:20px 0 28px; font-size:13.5px; color:var(--text2); line-height:1.6;">
      <strong style="color:#10b981;">📌 Covered in this chapter:</strong>
      Modular Architecture &amp; DRY Principle · Method Anatomy &amp; Return Types · Pass-by-Value Stack Mechanics · ref (Bidirectional Pointer Modification) · out (Multiple Return Values &amp; Inline Declarations) · in (Read-Only Reference for Struct Performance) · params (Variable Length Arguments) · Expression-Bodied Members (=&gt;) · Local Functions (Functions inside Functions) · Recursion &amp; Stack Overflow · Comparison Matrix Table · Real-World Project: Enterprise Payroll &amp; Tax Deduction Engine · 7 Common Mistakes · Self-Assessment Quiz
    </div>

    <!-- WARM IVORY INTRO BOX (EXACT C-STYLE) -->
    <div class="intro-box">
      <h3>స్వాగతం Phase 03 కి! 🧱 మాడ్యులర్ సాఫ్ట్‌వేర్ ఆర్కిటెక్చర్ &amp; మెమరీ రిఫరెన్సెస్</h3>
      <p>
        ఒక భవనాన్ని నిర్మించేటప్పుడు ఒకే పెద్ద కాంక్రీట్ ముద్దతో కట్టరు; ముందుగా ఇటుకలు, స్తంభాలు, కిటికీలు లాంటి చిన్న చిన్న భాగాలను తయారుచేసి వాటన్నింటినీ ఒక క్రమపద్ధతిలో కలుపుతారు. సాఫ్ట్‌వేర్ ఇంజనీరింగ్‌లో కూడా వేలాది లైన్ల కోడ్‌ను ఒకేచోట కుప్పగా రాయడం అసాధ్యం. పెద్ద పెద్ద సమస్యలను చిన్న, స్వతంత్ర విభాగాలుగా విభజించే ఆ మ్యాజికల్ ఇటుకలే <strong>మెథడ్స్ (Methods / Functions)</strong>!
      </p>
      <p>
        అయితే C# లో మెథడ్స్ అనేవి ఇతర భాషల కంటే ఎంతో లోతైన మెమరీ నియంత్రణను అందిస్తాయి. సాధారణంగా ఒక వేరియబుల్‌ను మెథడ్‌కు పంపినప్పుడు దాని కాపీ మాత్రమే వెళ్తుంది (Pass-by-Value). కానీ మెమరీలో ఉన్న అసలైన డేటాను మార్చడానికి <strong><code>ref</code></strong>, ఫంక్షన్ నుండి బహుళ విలువలను సురక్షితంగా బయటకు పంపడానికి <strong><code>out</code></strong>, భారీ డేటాను కాపీ చేయకుండా రీడ్-ఓన్లీగా యాక్సెస్ చేయడానికి <strong><code>in</code></strong>, మరియు ఎన్ని ఆర్గ్యుమెంట్లనైనా ఒకే అర్రేగా స్వీకరించడానికి <strong><code>params</code></strong> వంటి శక్తిమంతమైన పారామీటర్ మోడిఫైయర్లు C# లో ఉన్నాయి.
      </p>
      <p>
        ఈ సమగ్ర 9వ అధ్యాయంలో మనం మెథడ్ సిగ్నేచర్ల అనాటమీ, స్టాక్ మెమరీలో రిఫరెన్స్ పాయింటర్స్ బిహేవియర్, మోడ్రన్ ఫ్యాట్-యారో సింటాక్స్, లోకల్ ఫంక్షన్స్, మరియు రికర్షన్‌ను క్షుణ్ణంగా అన్వేషించి — ఒక ఎంటర్‌ప్రైజ్ పేరోల్ &amp; టాక్స్ కాలిక్యులేషన్ సిస్టమ్‌ను నిర్మిస్తాం!
      </p>
    </div>

    <!-- SECTION 1 -->
    <section>
      <h2 class="section-title"><span class="num">1</span> 🧱 మాడ్యులర్ ప్రోగ్రామింగ్ &amp; DRY ప్రిన్సిపల్ అవసరం</h2>
      <p>
        ఒక బ్యాంకింగ్ అప్లికేషన్‌లో జీఎస్టీ (GST) లేదా వడ్డీ లెక్కించే సూత్రం 50 చోట్ల అవసరం అనుకుందాం. ప్రతిచోటా అదే 5 లైన్ల గణితాన్ని కాపీ-పేస్ట్ చేసుకుంటూ వెళ్తే — భవిష్యత్తులో ప్రభుత్వం జీఎస్టీ ని 18% నుండి 20% కి మార్చినప్పుడు, మీరు 50 చోట్ల మాన్యువల్‌గా కోడ్ మార్చాల్సి వస్తుంది. ఎక్కడ ఒక్కచోట మర్చిపోయినా మొత్తం అకౌంటింగ్ తల్లకిందులవుతుంది.
      </p>
      <p>
        ఈ సమస్యకు పరిష్కారమే <strong>DRY (Don't Repeat Yourself)</strong> సూత్రం. లెక్కించే పనిని ఒకే ఒక్క <code>CalculateGst()</code> మెథడ్‌గా రాసి, అవసరమైన ప్రతిచోటా కేవలం ఆ పేరుతో పిలవడమే (Method Invocation) ప్రొఫెషనల్ సాఫ్ట్‌వేర్ డెవలప్‌మెంట్.
      </p>
    </section>

    <!-- SECTION 2 -->
    <section>
      <h2 class="section-title"><span class="num">2</span> 🏗️ మెథడ్ అనాటమీ &amp; సిగ్నేచర్ (Method Signature)</h2>
      <p>
        C# లో ఒక మెథడ్‌ను డిక్లేర్ చేయడానికి 5 ప్రధాన విభాగాలు ఉంటాయి:
      </p>
      <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin:16px 0; font-family:monospace; font-size:14px; color:var(--text);">
        [Access Modifier] [Return Type] MethodName([Parameters]) { [Method Body] }
      </div>
      <ul style="margin-left:24px; line-height:1.8; color:var(--text2);">
        <li><strong>Access Modifier (యాక్సెస్ మోడిఫైయర్):</strong> మెథడ్ బయటి ప్రపంచానికి కనిపిస్తుందా లేదా నిర్ణయిస్తుంది (<code>public</code>, <code>private</code>, <code>internal</code>).</li>
        <li><strong>Return Type (రిటర్న్ టైప్):</strong> మెథడ్ తన పని పూర్తయిన తర్వాత తిరిగి ఇచ్చే డేటా రకం (<code>int</code>, <code>string</code>, <code>bool</code>). ఏమీ రిటర్న్ చేయకపోతే <strong><code>void</code></strong> వాడాలి.</li>
        <li><strong>Method Name (మెథడ్ పేరు):</strong> C# లో ప్రామాణికంగా <strong>పాస్కల్ కేస్ (PascalCase)</strong> వాడతారు (ఉదా: <code>CalculateSalary</code>, <code>SendNotification</code>).</li>
        <li><strong>Parameter List (పారామీటర్లు):</strong> మెథడ్ పనిచేయడానికి బయటి నుండి అవసరమైన ఇన్‌పుట్ విలువలు.</li>
      </ul>

      <div class="code-block">
        <div class="code-block-header">
          <span>csharp · Basic Method Definition &amp; Invocation</span>
          <div class="code-actions">
            <button class="copy-btn" onclick="copyCode(this)">Copy</button>
            <button class="try-btn" onclick="runCode(this)">Run</button>
          </div>
        </div>
        <pre><code class="language-csharp">// సరళమైన వడ్డీ (Simple Interest) లెక్కించే మెథడ్
decimal CalculateInterest(decimal principal, decimal rate, int timeYears)
{
    decimal totalInterest = (principal * rate * timeYears) / 100m;
    return totalInterest; // రిటర్న్ స్టేట్‌మెంట్
}

// మెథడ్ కాల్ చేయడం (Invocation)
decimal myInterest = CalculateInterest(100000m, 8.5m, 3);
Console.WriteLine($"3 సంవత్సరాల వడ్డీ: ₹{myInterest:N2}");</code></pre>
      </div>
    </section>

    <!-- SECTION 3 -->
    <section>
      <h2 class="section-title"><span class="num">3</span> 📦 Pass-by-Value vs Pass-by-Reference మెకానిక్స్</h2>
      <p>
        C# లో డీఫాల్ట్‌గా పారామీటర్లు <strong>Pass-by-Value</strong> ద్వారా వెళ్తాయి. అంటే అసలైన వేరియబుల్ యొక్క <strong>నకలు (Copy)</strong> మాత్రమే మెథడ్‌కు అందుతుంది.
      </p>
      <p>
        మెథడ్ లోపల మీరు ఆ పారామీటర్‌ను ఎంత మార్చినా సరే, మెయిన్ ఫంక్షన్‌లోని ఒరిజినల్ వేరియబుల్‌పై ఎటువంటి ప్రభావం పడదు:
      </p>

      <div class="code-block">
        <div class="code-block-header">
          <span>csharp · Pass-by-Value Independence</span>
          <div class="code-actions">
            <button class="copy-btn" onclick="copyCode(this)">Copy</button>
            <button class="try-btn" onclick="runCode(this)">Run</button>
          </div>
        </div>
        <pre><code class="language-csharp">void AttemptToChange(int score)
{
    score = score + 50; // కేవలం లోకల్ కాపీ మాత్రమే మారుతుంది
    Console.WriteLine($"మెథడ్ లోపల స్కోర్: {score}"); // 150
}

int originalScore = 100;
AttemptToChange(originalScore);
Console.WriteLine($"మెథడ్ బయట అసలు స్కోర్: {originalScore}"); // 100 మాత్రమే మిగిలింది!</code></pre>
      </div>
      <p>
        కానీ కొన్ని సందర్భాలలో మెథడ్ లోపల జరిగిన మార్పు అసలైన వేరియబుల్‌కు కూడా అప్లై అవ్వాలి. దాని కోసమే C# పారామీటర్ మోడిఫైయర్లను రూపొందించింది!
      </p>
    </section>

    <!-- SECTION 4 -->
    <section>
      <h2 class="section-title"><span class="num">4</span> 🔄 ref మోడిఫైయర్ — బై-డైరెక్షనల్ రిఫరెన్స్ పాసింగ్</h2>
      <p>
        ఒక వేరియబుల్‌ను <strong><code>ref</code></strong> కీవర్డ్‌తో పంపితే, దాని విలువ కాపీ అవ్వదు; దానికి బదులుగా స్టాక్ మెమరీలోని అసలైన వేరియబుల్ యొక్క <strong>మెమరీ అడ్రస్ పాయింటర్</strong> మెథడ్‌కు చేరుతుంది!
      </p>
      <p>
        <strong>నియమం:</strong> <code>ref</code> వేరియబుల్ మెథడ్‌కు పంపే ముందే ఖచ్చితంగా ఇనిషియలైజ్ (విలువ కేటాయించబడి) ఉండాలి.
      </p>

      <div class="code-block">
        <div class="code-block-header">
          <span>csharp · ref Modifier in Action (Swapping Variables)</span>
          <div class="code-actions">
            <button class="copy-btn" onclick="copyCode(this)">Copy</button>
            <button class="try-btn" onclick="runCode(this)">Run</button>
          </div>
        </div>
        <pre><code class="language-csharp">// రెండు వేరియబుల్స్ విలువలను తారుమారు చేసే (Swap) ప్రసిద్ధ మెథడ్
void Swap(ref int first, ref int second)
{
    int temp = first;
    first = second;
    second = temp;
}

int a = 10, b = 20;
Console.WriteLine($"మార్చకముందు: a = {a}, b = {b}");

// కాల్ చేసేటప్పుడు కూడా తప్పనిసరిగా 'ref' రాయాలి!
Swap(ref a, ref b);

Console.WriteLine($"మార్చిన తర్వాత: a = {a}, b = {b}"); // a = 20, b = 10 అయింది!</code></pre>
      </div>
    </section>

    <!-- SECTION 5 -->
    <section>
      <h2 class="section-title"><span class="num">5</span> 📤 out మోడిఫైయర్ — బహుళ ఔట్‌పుట్‌లు &amp; ఇన్-లైన్ డిక్లరేషన్</h2>
      <p>
        ఒక C# మెథడ్ సాధారణంగా ఒకే విలువను రిటర్న్ చేయగలదు. కానీ ఒకేసారి 3 లేదా 4 విలువల ఫలితాలను బయటకు పంపాల్సి వచ్చినప్పుడు <strong><code>out</code></strong> పారామీటర్ ఉపయోగపడుతుంది.
      </p>
      <p>
        <strong><code>ref</code> vs <code>out</code> ముఖ్య వ్యత్యాసం:</strong>
      </p>
      <ul style="margin-left:24px; line-height:1.8; color:var(--text2);">
        <li><code>ref</code> లో వేరియబుల్ పంపే ముందే విలువ ఉండాలి.</li>
        <li><code>out</code> లో వేరియబుల్‌కు ముందు విలువ ఉండక్కర్లేదు! కానీ <strong>మెథడ్ ముగిసేలోపు తప్పనిసరిగా మెథడ్ లోపలే దానికి విలువ కేటాయించాలి</strong>, లేకపోతే కంపైల్ ఎర్రర్ వస్తుంది.</li>
      </ul>

      <div class="code-block">
        <div class="code-block-header">
          <span>csharp · Modern Inline out Variables</span>
          <div class="code-actions">
            <button class="copy-btn" onclick="copyCode(this)">Copy</button>
            <button class="try-btn" onclick="runCode(this)">Run</button>
          </div>
        </div>
        <pre><code class="language-csharp">void CalculateCircle(double radius, out double area, out double circumference)
{
    area = Math.PI * radius * radius;
    circumference = 2 * Math.PI * radius;
}

// C# 7+ Inline Out Variable Declaration: ముందే వేరియబుల్స్ డిక్లేర్ చేయక్కర్లేదు!
CalculateCircle(7.0, out double circleArea, out double circleCircumference);

Console.WriteLine($"వృత్త వైశాల్యం (Area): {circleArea:F2}");
Console.WriteLine($"చుట్టుకొలత (Circumference): {circleCircumference:F2}");</code></pre>
      </div>
    </section>

    <!-- SECTION 6 -->
    <section>
      <h2 class="section-title"><span class="num">6</span> 🔒 in మోడిఫైయర్ — రీడ్-ఓన్లీ రిఫరెన్స్ &amp; జీరో-కాపీ పెర్ఫార్మెన్స్</h2>
      <p>
        C# 7.2 లో పరిచయం చేయబడిన <strong><code>in</code></strong> మోడిఫైయర్ హై-పెర్ఫార్మెన్స్ సాఫ్ట్‌వేర్ ఆర్కిటెక్చర్ లో ఒక విప్లవం.
      </p>
      <p>
        మీ దగ్గర 64 బైట్లు లేదా 128 బైట్లు ఉన్న ఒక భారీ <code>struct</code> ఉందనుకుందాం. దాన్ని మెథడ్‌కు పంపినప్పుడు కాపీ అవ్వకుండా రిఫరెన్స్ ద్వారా పంపాలి, కానీ పొరపాటున కూడా మెథడ్ లోపల దాన్ని మార్చకూడదు (Read-Only Guarantee ఉండాలి). సరిగ్గా ఈ పని కోసమే <strong><code>in</code></strong> వాడతారు:
      </p>

      <div class="code-block">
        <div class="code-block-header">
          <span>csharp · in Read-Only Parameter Modifier</span>
          <div class="code-actions">
            <button class="copy-btn" onclick="copyCode(this)">Copy</button>
            <button class="try-btn" onclick="runCode(this)">Run</button>
          </div>
        </div>
        <pre><code class="language-csharp">readonly struct SystemCoordinate
{
    public double X { get; }
    public double Y { get; }
    public double Z { get; }
    public SystemCoordinate(double x, double y, double z) =&gt; (X, Y, Z) = (x, y, z);
}

// 'in' వాడటం వల్ల భారీ struct కాపీ అవ్వదు, కానీ రీడ్-ఓన్లీ రక్షణ ఉంటుంది
double MeasureDistance(in SystemCoordinate point)
{
    // point.X = 50; // ❌ కంపైల్ ఎర్రర్ వస్తుంది! 'in' పారామీటర్‌ను మార్చలేరు!
    return Math.Sqrt(point.X * point.X + point.Y * point.Y + point.Z * point.Z);
}</code></pre>
      </div>
    </section>

    <!-- SECTION 7 -->
    <section>
      <h2 class="section-title"><span class="num">7</span> 🧳 params కీవర్డ్ — వేరియబుల్ పొడవు గల ఆర్గ్యుమెంట్స్</h2>
      <p>
        ఒక మెథడ్‌కు యూజర్ ఎన్నైనా నంబర్లు లేదా పేర్లు పంపే వెసులుబాటు కల్పించాలనుకున్నప్పుడు <strong><code>params</code></strong> కీవర్డ్ ఉపయోగిస్తారు.
      </p>
      <p>
        <strong>నియమం:</strong> ఒక మెథడ్ లో కేవలం ఒకే ఒక <code>params</code> పారామీటర్ ఉండాలి, మరియు అది పారామీటర్ లిస్ట్‌లో <strong>ఖచ్చితంగా ఆఖరున మాత్రమే ఉండాలి</strong>.
      </p>

      <div class="code-block">
        <div class="code-block-header">
          <span>csharp · params Keyword Flexibility</span>
          <div class="code-actions">
            <button class="copy-btn" onclick="copyCode(this)">Copy</button>
            <button class="try-btn" onclick="runCode(this)">Run</button>
          </div>
        </div>
        <pre><code class="language-csharp">// ఎన్నైనా పూర్ణాంకాలను స్వీకరించి కూడే మెథడ్
int SumNumbers(params int[] numbers)
{
    int total = 0;
    foreach (int n in numbers) total += n;
    return total;
}

// విభిన్న సంఖ్యలలో ఆర్గ్యుమెంట్స్ పంపడం:
Console.WriteLine($"2 సంఖ్యల కూడిక: {SumNumbers(10, 20)}");
Console.WriteLine($"5 సంఖ్యల కూడిక: {SumNumbers(1, 2, 3, 4, 5)}");
Console.WriteLine($"ఏమీ పంపకపోయినా పనిచేస్తుంది: {SumNumbers()}"); // 0</code></pre>
      </div>
    </section>

    <!-- SECTION 8 -->
    <section>
      <h2 class="section-title"><span class="num">8</span> ⚡ ఎక్స్‌ప్రెషన్-బాడీడ్ మెథడ్స్ (=>) &amp; Local Functions</h2>
      <p>
        ఆధునిక C# లో ఒక మెథడ్ కేవలం ఒకే లైన్ ఎక్స్‌ప్రెషన్‌ను రిటర్న్ చేస్తుంటే — కర్లీ బ్రాకెట్లు <code>{}</code> మరియు <code>return</code> తీసేసి <strong>ఫ్యాట్ యారో (<code>=&gt;</code>)</strong> తో సూటిగా రాయవచ్చు:
      </p>

      <div class="code-block">
        <div class="code-block-header">
          <span>csharp · Expression-Bodied &amp; Local Functions</span>
          <div class="code-actions">
            <button class="copy-btn" onclick="copyCode(this)">Copy</button>
            <button class="try-btn" onclick="runCode(this)">Run</button>
          </div>
        </div>
        <pre><code class="language-csharp">// 1. Expression-Bodied Method (అత్యంత క్లీన్)
int Square(int x) =&gt; x * x;
bool IsEven(int x) =&gt; x % 2 == 0;

// 2. Local Function (ఒక మెథడ్ లోపల మాత్రమే పనిచేసే అంతర్గత ఫంక్షన్)
void ProcessUserData()
{
    string user = "  సురేష్  ";
    
    // లోకల్ ఫంక్షన్: కేవలం ProcessUserData పరిధిలో మాత్రమే కనిపిస్తుంది
    string Clean(string s) =&gt; s.Trim().ToUpper();
    
    Console.WriteLine($"శుభ్రపరిచిన యూజర్ నేమ్: {Clean(user)}");
}

ProcessUserData();</code></pre>
      </div>
    </section>

    <!-- SECTION 9 -->
    <section>
      <h2 class="section-title"><span class="num">9</span> 📊 తులనాత్మక పట్టిక: Value vs ref vs out vs in vs params</h2>
      <p>
        అన్ని పారామీటర్ మోడిఫైయర్ల సమగ్ర మ్యాట్రిక్స్:
      </p>

      <table class="tbl">
        <thead>
          <tr>
            <th>మోడిఫైయర్</th>
            <th>మెథడ్ కాల్‌కు ముందు విలువ ఉండాలా?</th>
            <th>మెథడ్ లోపల విలువ మార్చవచ్చా?</th>
            <th>డేటా బదిలీ దిశ</th>
            <th>ప్రధాన ఉపయోగం</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>(None) Value</strong></td>
            <td>అవును</td>
            <td>మార్చవచ్చు (కాపీ మాత్రమే మారుతుంది)</td>
            <td>Caller ➔ Callee (ఏకముఖం)</td>
            <td>సాధారణ ఇన్‌పుట్ విలువలకు</td>
          </tr>
          <tr>
            <td><strong>ref</strong></td>
            <td><strong>అవును (తప్పనిసరి)</strong></td>
            <td><strong>అవును (ఒరిజినల్ మారుతుంది)</strong></td>
            <td>Caller ➔ Callee ➔ Caller (ద్విముఖం)</td>
            <td>అసలు వేరియబుల్‌ను అక్కడికక్కడే సవరించడానికి</td>
          </tr>
          <tr>
            <td><strong>out</strong></td>
            <td>అవసరం లేదు</td>
            <td><strong>తప్పనిసరిగా అసైన్ చేయాలి</strong></td>
            <td>Callee ➔ Caller (కేవలం ఔట్‌పుట్)</td>
            <td>ఒకటి కంటే ఎక్కువ రిటర్న్ విలువలు పంపడానికి</td>
          </tr>
          <tr>
            <td><strong>in</strong></td>
            <td>అవును (తప్పనిసరి)</td>
            <td><strong>మార్చడం నిషిద్ధం (Read-only)</strong></td>
            <td>Caller ➔ Callee (Zero-copy)</td>
            <td>భారీ Structs ను కాపీ చేయకుండా వేగంగా పంపడానికి</td>
          </tr>
          <tr>
            <td><strong>params</strong></td>
            <td>ఐచ్ఛికం (0 లేదా అంతకంటే ఎక్కువ)</td>
            <td>అవును (అర్రేగా మారుతుంది)</td>
            <td>Caller ➔ Callee</td>
            <td>ఫ్లెక్సిబుల్ ఆర్గ్యుమెంట్ కౌంట్స్ కోసం</td>
          </tr>
        </tbody>
      </table>
    </section>

    <!-- SECTION 10 -->
    <section>
      <h2 class="section-title"><span class="num">10</span> 🌀 రికర్షన్ (Recursion) — మెథడ్ సెల్ఫ్-ఇన్వొకేషన్</h2>
      <p>
        ఒక మెథడ్ తనను తాను పిలుచుకునే (Self-invocation) ప్రక్రియను <strong>రికార్షన్ (Recursion)</strong> అంటారు. చెట్లు (Trees), గ్రాఫ్‌లు, గణిత ఫ్యాక్టోరియల్స్ మరియు డైరెక్టరీ ఫోల్డర్స్ సెర్చ్ చేయడానికి ఇది అత్యంత బలమైన సాధనం.
      </p>
      <p>
        <strong>రికార్షన్ యొక్క 2 బంగారు నియమాలు:</strong>
      </p>
      <ol style="margin-left:24px; line-height:1.8; color:var(--text2);">
        <li><strong>బేస్ కేస్ (Base Case):</strong> లూప్ ఎక్కడ ఆగాలో చెప్పే షరతు. ఇది లేకపోతే కాల్ స్టాక్ నిండిపోయి <code>StackOverflowException</code> తో ప్రోగ్రామ్ క్రాష్ అవుతుంది!</li>
        <li><strong>రికార్సివ్ స్టెప్ (Recursive Step):</strong> ప్రతి రౌండ్‌లోనూ సమస్య చిన్నదిగా మారుతూ బేస్ కేస్ వైపు సాగాలి.</li>
      </ol>

      <div class="code-block">
        <div class="code-block-header">
          <span>csharp · Factorial via Recursion</span>
          <div class="code-actions">
            <button class="copy-btn" onclick="copyCode(this)">Copy</button>
            <button class="try-btn" onclick="runCode(this)">Run</button>
          </div>
        </div>
        <pre><code class="language-csharp">long Factorial(int n)
{
    // బేస్ కేస్: 0! లేదా 1! విలువ 1
    if (n &lt;= 1) return 1;
    
    // రికార్సివ్ స్టెప్: n * (n - 1)!
    return n * Factorial(n - 1);
}

Console.WriteLine($"5 యొక్క ఫ్యాక్టోరియల్ (5!): {Factorial(5)}"); // 120</code></pre>
      </div>
    </section>

    <!-- SECTION 11 -->
    <section>
      <h2 class="section-title"><span class="num">11</span> 🚀 రియల్-వరల్డ్ ప్రాజెక్ట్: "Enterprise Payroll &amp; Tax Deduction Engine"</h2>
      <p>
        ఈ అధ్యాయంలో నేర్చుకున్న <code>ref</code>, <code>out</code>, <code>in</code>, <code>params</code>, మరియు ఎక్స్‌ప్రెషన్-బాడీడ్ మెథడ్స్ అన్నింటినీ ఉపయోగించి ఒక పూర్తి స్థాయి <strong>ఎంటర్‌ప్రైజ్ శాలరీ &amp; పేరోల్ ఇంజిన్</strong> ను తయారు చేద్దాం!
      </p>

      <div class="code-block">
        <div class="code-block-header">
          <span>csharp · Enterprise Payroll Engine Console Project</span>
          <div class="code-actions">
            <button class="copy-btn" onclick="copyCode(this)">Copy</button>
            <button class="try-btn" onclick="runCode(this)">Run</button>
          </div>
        </div>
        <pre><code class="language-csharp">using System;

Console.OutputEncoding = System.Text.Encoding.UTF8;
Console.WriteLine("=================================================");
Console.WriteLine("🏢 మన కార్పొరేట్ - స్మార్ట్ పేరోల్ &amp; టాక్స్ ఇంజిన్ v1.0");
Console.WriteLine("=================================================\\n");

// కంపెనీ పాలసీ స్ట్రక్ట్ (స్థిరమైన నియమాలు)
struct CompanyTaxPolicy
{
    public decimal PfRate { get; }
    public decimal ProfessionalTax { get; }
    public CompanyTaxPolicy(decimal pf, decimal pt) =&gt; (PfRate, ProfessionalTax) = (pf, pt);
}

// 1. అలవెన్సుల కూడిక (params keyword)
decimal CalculateAllowances(params decimal[] allowances)
{
    decimal sum = 0m;
    foreach (decimal a in allowances) sum += a;
    return sum;
}

// 2. పేరోల్ గణన మెథడ్ (in, out, ref కలయిక)
void ProcessSalarySlip(
    string empName,
    decimal basicPay,
    in CompanyTaxPolicy policy,     // 'in' రీడ్-ఓన్లీ పాలసీ
    out decimal deductions,         // 'out' టాక్స్ తగ్గింపులు
    out decimal netSalary,          // 'out' టేక్-హోమ్ శాలరీ
    ref decimal companyBankReserves,// 'ref' కంపెనీ అకౌంట్ నుండి డబ్బు కటింగ్
    params decimal[] allowances)    // 'params' అదనపు బోనస్‌లు
{
    decimal totalAllowances = CalculateAllowances(allowances);
    decimal grossSalary = basicPay + totalAllowances;

    // కటింగులు: PF (12%) + వృత్తి పన్ను (PT)
    decimal pfAmount = basicPay * (policy.PfRate / 100m);
    deductions = pfAmount + policy.ProfessionalTax;

    netSalary = grossSalary - deductions;

    // కంపెనీ బ్యాంక్ బ్యాలెన్స్ నుండి నెట్ శాలరీ డెబిట్ చేయడం (ref)
    companyBankReserves -= netSalary;

    Console.WriteLine($"జీతం స్లిప్ జెనరేట్ చేయబడింది: {empName}");
    Console.WriteLine($"గ్రాస్ శాలరీ       : ₹{grossSalary:N2}");
    Console.WriteLine($"మొత్తం తగ్గింపులు: ₹{deductions:N2} (PF: ₹{pfAmount:N2})");
    Console.ForegroundColor = ConsoleColor.Green;
    Console.WriteLine($"టేక్-హోమ్ శాలరీ : ₹{netSalary:N2}");
    Console.ResetColor();
}

// ప్రాజెక్ట్ ఎగ్జిక్యూషన్
decimal companyFunds = 1000000.00m; // కంపెనీ బ్యాలెన్స్ ₹10 లక్షలు
var standardPolicy = new CompanyTaxPolicy(pf: 12.0m, pt: 200.0m);

Console.WriteLine($"ప్రారంభ కంపెనీ నిధులు: ₹{companyFunds:N2}\\n");

// ఉద్యోగి 1 కి పేరోల్ ప్రాసెస్ చేయడం
ProcessSalarySlip(
    "శ్రీకాంత్ వర్మ (సీనియర్ ఆర్కిటెక్ట్)",
    basicPay: 85000m,
    standardPolicy,
    out decimal srikanthDeductions,
    out decimal srikanthNet,
    ref companyFunds,
    15000m, 5000m, 2500m // HRA, మెడికల్, ఇంటర్నెట్ అలవెన్సులు (params)
);

Console.WriteLine($"\\nశాలరీ పంపిణీ తర్వాత మిగిలిన కంపెనీ నిధులు: ₹{companyFunds:N2}");
Console.WriteLine("=================================================\\n");</code></pre>
      </div>

      <!-- TRY BOX COMPONENT -->
      <div class="try-box">
        <div class="try-title">🧪 లైవ్ కంపైలర్‌లో ఈ పేరోల్ ఇంజిన్‌ను పరీక్షించండి!</div>
        <p>
          ఈ పూర్తి కోడ్‌ను ఆన్‌లైన్ ఎడిటర్‌లో రన్ చేసి — బేసిక్ పే, అలవెన్సులు మార్చి <code>ref</code> కంపెనీ బ్యాంక్ బ్యాలెన్స్ మరియు <code>out</code> నెట్ శాలరీ ఎలా లెక్కించబడుతున్నాయో చూడండి!
        </p>
        <button class="run-btn" onclick="openInteractiveCompiler()">
          ▶ Open C# Online Compiler with this Project
        </button>
      </div>
    </section>

    <!-- SECTION 12 -->
    <section>
      <h2 class="section-title"><span class="num">12</span> 🛑 బిగినర్స్ చేసే 7 ఘోరమైన మెథడ్ తప్పులు</h2>
      <p>
        మెథడ్స్‌తో పనిచేసేటప్పుడు జూనియర్ డెవలపర్లు ఎదుర్కొనే 7 ముఖ్యమైన సమస్యలు:
      </p>

      <div style="display:grid; grid-template-columns:1fr; gap:16px; margin:24px 0;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #ef4444; border-radius:8px; padding:14px 18px;">
          <strong style="color:#ef4444;">1. out పారామీటర్‌కు మెథడ్ లోపల విలువ అసైన్ చేయకపోవడం:</strong>
          <p style="margin:6px 0 0; color:var(--text2); font-size:14px;">
            మెథడ్ నుండి నిష్క్రమించే ముందు ప్రతి <code>out</code> వేరియబుల్‌కు తప్పనిసరిగా విలువ ఇవ్వాలి, లేకపోతే కంపైలర్ ఎర్రర్ CS0177 వస్తుంది.
          </p>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #ef4444; border-radius:8px; padding:14px 18px;">
          <strong style="color:#ef4444;">2. ref వాడేటప్పుడు ఇనిషియలైజ్ చేయని వేరియబుల్స్ పంపడం:</strong>
          <p style="margin:6px 0 0; color:var(--text2); font-size:14px;">
            <code>int x; Foo(ref x);</code> రాయలేరు. కాల్ చేయడానికి ముందే <code>x = 0;</code> అని ఇనిషియలైజ్ చేయాలి.
          </p>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #ef4444; border-radius:8px; padding:14px 18px;">
          <strong style="color:#ef4444;">3. params ని మొదట్లో లేదా మధ్యలో పెట్టడం:</strong>
          <p style="margin:6px 0 0; color:var(--text2); font-size:14px;">
            <code>params</code> ఎల్లప్పుడూ ఆఖరి పారామీటర్‌గా మాత్రమే ఉండాలి. ఒక్క మెథడ్‌లో రెండు params పెట్టలేరు.
          </p>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #ef4444; border-radius:8px; padding:14px 18px;">
          <strong style="color:#ef4444;">4. రికార్షన్‌లో బేస్ కేస్ రాయడం మర్చిపోవడం:</strong>
          <p style="margin:6px 0 0; color:var(--text2); font-size:14px;">
            స్టాప్ కండిషన్ లేకపోతే కాల్ స్టాక్ బద్దలై <code>StackOverflowException</code> వచ్చి ప్రాసెస్ చచ్చిపోతుంది.
          </p>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #ef4444; border-radius:8px; padding:14px 18px;">
          <strong style="color:#ef4444;">5. పారామీటర్లను మితిమీరి పెంచడం (Long Parameter List):</strong>
          <p style="margin:6px 0 0; color:var(--text2); font-size:14px;">
            ఒక మెథడ్‌కు 7 లేదా 8 పారామీటర్లు దాటితే దాన్ని ఒక ఆబ్జెక్ట్ లేదా <code>record</code> క్లాస్‌గా మార్చడం క్లీన్ కోడ్ పద్ధతి.
          </p>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #ef4444; border-radius:8px; padding:14px 18px;">
          <strong style="color:#ef4444;">6. in పారామీటర్‌ను మ్యూటేట్ చేయడానికి ప్రయత్నించడం:</strong>
          <p style="margin:6px 0 0; color:var(--text2); font-size:14px;">
            <code>in</code> అనేది కేవలం రీడ్-ఓన్లీ రక్షణ మాత్రమే. దాని విలువలను మెథడ్ లోపల మార్చలేరు.
          </p>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #ef4444; border-radius:8px; padding:14px 18px;">
          <strong style="color:#ef4444;">7. సైడ్-ఎఫెక్ట్స్ తో కూడిన ప్యూర్ ఫంక్షన్స్ రాయడం:</strong>
          <p style="margin:6px 0 0; color:var(--text2); font-size:14px;">
            కేవలం విలువను రిటర్న్ చేయాల్సిన క్యాలిక్యులేషన్ ఫంక్షన్ లోపల గ్లోబల్ స్టేట్ మార్చడం లేదా కన్సోల్ ప్రింట్ చేయడం మంచి ఆర్కిటెక్చర్ కాదు.
          </p>
        </div>
      </div>
    </section>

    <!-- SECTION 13 -->
    <section>
      <h2 class="section-title"><span class="num">13</span> 🧠 ఇంటరాక్టివ్ సెల్ఫ్-అసెస్మెంట్ క్విజ్ (5 లోతైన ప్రాక్టికల్ ప్రశ్నలు &amp; వివరణలు)</h2>
      <p>
        మెథడ్స్ మరియు పారామీటర్ మోడిఫైయర్లపై మీ పట్టును ఈ క్రింది 5 ప్రశ్నలతో పరీక్షించుకోండి:
      </p>

      <!-- QUIZ 1 -->
      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:600; cursor:pointer; color:var(--text1);">
          ❓ ప్రశ్న 1: <code>ref</code> మరియు <code>out</code> ల మధ్య ఉన్న అతిపెద్ద సాంకేతిక తేడా ఏమిటి?
        </summary>
        <div style="margin-top:10px; font-size:14px; color:var(--text2); line-height:1.6;">
          <strong>సమాధానం:</strong> <code>ref</code> పారామీటర్‌ను మెథడ్‌కు పాస్ చేయడానికి ముందే దానికి ఖచ్చితంగా ఒక విలువ ఉండాలి (Caller must initialize). కానీ <code>out</code> పారామీటర్‌కు కాల్ చేయడానికి ముందు విలువ ఉండక్కర్లేదు; మెథడ్ లోపలే దానికి తప్పనిసరిగా విలువను కేటాయించాలి (Callee must initialize).
        </div>
      </details>

      <!-- QUIZ 2 -->
      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:600; cursor:pointer; color:var(--text1);">
          ❓ ప్రశ్న 2: C# లో <code>in</code> మోడిఫైయర్‌ను ఎందుకు ప్రవేశపెట్టారు?
        </summary>
        <div style="margin-top:10px; font-size:14px; color:var(--text2); line-height:1.6;">
          <strong>సమాధానం:</strong> పెద్ద <code>struct</code> డేటా టైప్స్‌ను మెథడ్స్‌కు పాస్ చేసేటప్పుడు మెమరీ కాపీయింగ్ ఓవర్‌హెడ్ లేకుండా రిఫరెన్స్ ద్వారా వేగంగా పంపడానికి, మరియు అదే సమయంలో మెథడ్ లోపల ఆ డేటా మారకుండా <em>Read-Only</em> రక్షణ కల్పించడానికి <code>in</code> ఉపయోగపడుతుంది.
        </div>
      </details>

      <!-- QUIZ 3 -->
      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:600; cursor:pointer; color:var(--text1);">
          ❓ ప్రశ్న 3: ఒక మెథడ్‌లో రెండు <code>params</code> పారామీటర్లు రాయవచ్చా?
        </summary>
        <div style="margin-top:10px; font-size:14px; color:var(--text2); line-height:1.6;">
          <strong>సమాధానం:</strong> రాయలేరు! C# నిబంధనల ప్రకారం ఒక మెథడ్ సిగ్నేచర్‌లో కేవలం ఒకే ఒక్క <code>params</code> ఉండాలి, మరియు అది కూడా పారామీటర్ లిస్ట్‌లో ఆఖరి స్థానంలో మాత్రమే ఉండాలి.
        </div>
      </details>

      <!-- QUIZ 4 -->
      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:600; cursor:pointer; color:var(--text1);">
          ❓ ప్రశ్న 4: C# లో Local Functions వాడటం వల్ల కలిగే ప్రయోజనం ఏమిటి?
        </summary>
        <div style="margin-top:10px; font-size:14px; color:var(--text2); line-height:1.6;">
          <strong>సమాధానం:</strong> ఒక నిర్దిష్ట మెథడ్‌కు మాత్రమే అవసరమైన హెల్పర్ లాజిక్‌ను ఆ మెథడ్ లోపలే ప్రైవేట్‌గా దాచి ఉంచడానికి లోకల్ ఫంక్షన్స్ ఉపయోగపడతాయి. ఇవి క్లాస్‌ను క్లట్టర్ చేయకుండా, ఎన్‌క్యాప్సులేషన్‌ను మరియు చదవడానికి వీలైన స్పష్టతను పెంచుతాయి.
        </div>
      </details>

      <!-- QUIZ 5 -->
      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:600; cursor:pointer; color:var(--text1);">
          ❓ ప్రశ్న 5: రికార్సివ్ మెథడ్‌లో "Base Case" లేకపోతే ఏ ఎక్సెప్షన్ వస్తుంది?
        </summary>
        <div style="margin-top:10px; font-size:14px; color:var(--text2); line-height:1.6;">
          <strong>సమాధానం:</strong> <strong>System.StackOverflowException</strong>. ప్రతి రికార్సివ్ కాల్ ఒక స్టాక్ ఫ్రేమ్‌ను అలోకేట్ చేస్తుంది. ఆగే షరతు లేకపోతే కాల్ స్టాక్ మెమరీ పరిమితి దాటిపోయి అప్లికేషన్ తక్షణమే క్రాష్ అవుతుంది.
        </div>
      </details>
    </section>

    <!-- CHAPTER NAVIGATION (PAGINATION) -->
    <div style="display:flex; justify-content:space-between; gap:16px; margin:40px 0 20px; flex-wrap:wrap;">
      <a href="/blog-csharp/08-csharp-break-continue-and-nested-loops.html" style="display:inline-flex; align-items:center; gap:8px; padding:10px 18px; border-radius:8px; background:var(--bg3); border:1px solid var(--border); color:var(--text); text-decoration:none; font-weight:700; font-size:13.5px;">
        ← Previous: 08. break, continue &amp; నెస్టెడ్ లూప్స్
      </a>
      <a href="/blog-csharp/10-csharp-strings-stringbuilder-and-text-processing.html" style="display:inline-flex; align-items:center; gap:8px; padding:10px 20px; border-radius:8px; background:linear-gradient(135deg, #10b981, #059669); color:#ffffff; text-decoration:none; font-weight:700; font-size:13.5px; box-shadow:0 2px 10px rgba(16,185,129,0.2);">
        Next: 10. స్ట్రింగ్స్, ఇమ్యుటబిలిటీ &amp; StringBuilder →
      </a>
    </div>

    <!-- AUTHOR FOOTER -->
    <div class="author" style="margin-top:36px;">
      <div class="avatar">OC</div>
      <div>
        <strong>Written by Our Compiler Technical Editorial Team</strong><br>
        <span>Reviewed for accuracy &amp; tested on .NET 8 SDK / C# 12 runtime · 2026 Academic Edition</span>
      </div>
    </div>

  </main>
</div>

<!-- SITE NAVIGATION LOADER -->
<script src="/site-nav.js" defer></script>

<!-- RUNNER & INTERACTIVE LOGIC -->
<script>
  function toggleAccordion(btn) {
    const content = btn.nextElementSibling;
    const arrow = btn.querySelector('.accordion-arrow');
    const isOpen = content.classList.contains('open');
    if (isOpen) {
      content.classList.remove('open');
      btn.classList.remove('active');
    } else {
      content.classList.add('open');
      btn.classList.add('active');
    }
  }

  function copyCode(btn) {
    const codeBlock = btn.closest('.code-block').querySelector('code');
    const text = codeBlock.innerText;
    navigator.clipboard.writeText(text).then(() => {
      const orig = btn.innerText;
      btn.innerText = 'Copied!';
      btn.style.color = '#10b981';
      setTimeout(() => {
        btn.innerText = orig;
        btn.style.color = '';
      }, 2000);
    });
  }

  function runCode(btn) {
    const codeBlock = btn.closest('.code-block').querySelector('code');
    const rawCode = codeBlock.innerText;
    try {
      localStorage.setItem('code_csharp', rawCode);
    } catch (e) {
      console.warn('LocalStorage access restricted:', e);
    }
    window.open('/online-csharp-compiler.html', '_blank');
  }

  function openInteractiveCompiler() {
    const projectCode = \`using System;

Console.OutputEncoding = System.Text.Encoding.UTF8;
Console.WriteLine("=================================================");
Console.WriteLine("🏢 మన కార్పొరేట్ - స్మార్ట్ పేరోల్ & టాక్స్ ఇంజిన్ v1.0");
Console.WriteLine("=================================================\\n");

struct CompanyTaxPolicy
{
    public decimal PfRate { get; }
    public decimal ProfessionalTax { get; }
    public CompanyTaxPolicy(decimal pf, decimal pt) => (PfRate, ProfessionalTax) = (pf, pt);
}

decimal CalculateAllowances(params decimal[] allowances)
{
    decimal sum = 0m;
    foreach (decimal a in allowances) sum += a;
    return sum;
}

void ProcessSalarySlip(
    string empName,
    decimal basicPay,
    in CompanyTaxPolicy policy,
    out decimal deductions,
    out decimal netSalary,
    ref decimal companyBankReserves,
    params decimal[] allowances)
{
    decimal totalAllowances = CalculateAllowances(allowances);
    decimal grossSalary = basicPay + totalAllowances;
    decimal pfAmount = basicPay * (policy.PfRate / 100m);
    deductions = pfAmount + policy.ProfessionalTax;
    netSalary = grossSalary - deductions;
    companyBankReserves -= netSalary;

    Console.WriteLine($"జీతం స్లిప్: {empName}");
    Console.WriteLine($"గ్రాస్ శాలరీ: ₹{grossSalary:N2}");
    Console.WriteLine($"తగ్గింపులు  : ₹{deductions:N2}");
    Console.WriteLine($"నెట్ శాలరీ  : ₹{netSalary:N2}\\n");
}

decimal companyFunds = 1000000.00m;
var standardPolicy = new CompanyTaxPolicy(12.0m, 200.0m);

ProcessSalarySlip("శ్రీకాంత్ వర్మ", 85000m, standardPolicy, out decimal ded, out decimal net, ref companyFunds, 15000m, 5000m);

Console.WriteLine($"మిగిలిన కంపెనీ నిధులు: ₹{companyFunds:N2}");
Console.WriteLine("=================================================\\n");\`;

    try {
      localStorage.setItem('code_csharp', projectCode);
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
    window.open('/online-csharp-compiler.html', '_blank');
  }
</script>

</body>
</html>
`;

const outputPath = path.join(__dirname, '..', 'public', 'blog-csharp', '09-csharp-methods-parameters-ref-out-in.html');
fs.writeFileSync(outputPath, fullHtml, 'utf8');
console.log('✅ Successfully generated deep high-value C# Chapter 09!');
console.log('Target file size:', fullHtml.length, 'characters');
