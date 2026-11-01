const fs = require('fs');
const path = require('path');
const { buildSidebar } = require('./csharp_curriculum_data');

const sidebarHtml = buildSidebar(3);

const fullHtml = `<!DOCTYPE html>
<html class="light-theme" lang="te">
<head>
  <!-- Character Encoding & Viewport -->
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">

  <!-- SEO Title & Meta Tags -->
  <title>C# యూజర్ ఇన్‌పుట్, టైప్ కాస్టింగ్ & Parse / TryParse — C# Masterclass | Mana Compiler</title>
  <meta name="description" content="C# లో Console.ReadLine(), Console.ReadKey(), ఇంప్లిసిట్ & ఎక్స్‌ప్లిసిట్ కాస్టింగ్, Convert క్లాస్, checked/unchecked కీవర్డ్స్ మరియు డిఫెన్సివ్ TryParse() మెథడ్స్ పై సమగ్ర తెలుగు గైడ్.">
  <meta name="keywords" content="c# user input telugu, c# parse tryparse telugu, c# type casting telugu, console readline telugu, c# convert toint32, modern csharp 12">
  <meta name="author" content="Our Compiler Technical Editorial Team">

  <!-- Open Graph Meta Tags -->
  <meta property="og:title" content="C# యూజర్ ఇన్‌పుట్, టైప్ కాస్టింగ్ & Parse / TryParse — C# Masterclass">
  <meta property="og:description" content="Console.ReadLine() నుండి robust TryParse() వరకు — C# లో యూజర్ ఇన్‌పుట్ నిర్వహణ మరియు టైప్ కన్వర్షన్స్‌పై పూర్తి తెలుగు మాస్టర్‌క్లాస్.">
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="Mana Compiler">

  <!-- Canonical URL -->
  <link rel="canonical" href="https://www.ourcompiler.com/blog-csharp/03-csharp-user-input-type-casting-parsing.html">

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
      <span>Chapter 03: యూజర్ ఇన్‌పుట్, టైప్ కాస్టింగ్ &amp; Parse / TryParse</span>
    </div>

    <!-- MAIN HEADING -->
    <h1 class="lesson-title">C# యూజర్ ఇన్‌పుట్ (Console.ReadLine), టైప్ కాస్టింగ్ &amp; Parse / TryParse</h1>

    <!-- LESSON META BADGES -->
    <div class="lesson-meta">
      <span class="meta-pill">⚡ Modern C# 12 / .NET 8 LTS</span>
      <span class="meta-pill">📖 Chapter 03 of 20</span>
      <span class="meta-pill">📁 Phase 01: C# ఫండమెంటల్స్ &amp; బేసిక్స్</span>
      <span class="meta-pill">🎓 2026 Academic Edition</span>
    </div>

    <!-- COVERED TOPICS PILL BAR -->
    <div style="background:var(--bg2); border:1px solid var(--border); border-radius:10px; padding:12px 18px; margin:20px 0 28px; font-size:13.5px; color:var(--text2); line-height:1.6;">
      <strong style="color:#10b981;">📌 Covered in this chapter:</strong>
      Console.ReadLine() · Nullable Reference Types (string?) · Console.ReadKey() &amp; Passwords · Implicit Widening Casting · Explicit Narrowing Casting &amp; Data Truncation · checked &amp; unchecked Overflow Safety · System.Convert Class · Banker's Rounding vs Truncation · int.Parse() Exception Hazards · Defensive int.TryParse() with out Parameter · Comparison Matrix Table · CultureInfo (Comma vs Dot) · Real-World Project: Smart Retail Cashier &amp; Billing System · 7 Common Mistakes · Self-Assessment Quiz
    </div>

    <!-- WARM IVORY INTRO BOX (EXACT C-STYLE) -->
    <div class="intro-box">
      <h3>స్వాగతం అధ్యాయం 03 కి! 🚀 యూజర్‌తో ఇంటరాక్షన్ &amp; నమ్మకమైన డేటా మార్పిడి</h3>
      <p>
        ఒక కంప్యూటర్ ప్రోగ్రామ్ నిజమైన సాఫ్ట్‌వేర్‌గా మారేది ఎప్పుడంటే — అది కేవలం తెరపై ఏదో ప్రింట్ చేయడం మాత్రమే కాకుండా, బయటి ప్రపంచం (యూజర్) నుండి సమాచారాన్ని స్వీకరించి, దాన్ని సమర్థవంతంగా విశ్లేషించి సరైన నిర్ణయాలు తీసుకున్నప్పుడు మాత్రమే! ఏటీఎం మెషిన్‌లో పిన్ ఎంటర్ చేయడం నుండి ఆన్‌లైన్ షాపింగ్‌లో ఆర్డర్ పరిమాణం ఇవ్వడం వరకు ప్రతిచోటా యూజర్ ఇన్‌పుట్ కీలక పాత్ర పోషిస్తుంది.
      </p>
      <p>
        అయితే ఇక్కడ సాఫ్ట్‌వేర్ ఇంజనీర్లకు ఎదురయ్యే అతిపెద్ద సవాలు ఏమిటంటే: <strong>కీబోర్డ్ నుండి యూజర్ టైప్ చేసే ప్రతి అక్షరం లేదా సంఖ్య కంప్యూటర్‌కు కేవలం టెక్స్ట్ (<code>string</code>) రూపంలోనే చేరుతుంది!</strong> యూజర్ <code>500</code> అని టైప్ చేస్తే, అది గణిత సంఖ్య కాదు, కేవలం '5', '0', '0' అనే మూడు అక్షరాల స్ట్రింగ్ మాత్రమే. ఆ స్ట్రింగ్‌ను సరైన సంఖ్యగా మార్చి క్యాలిక్యులేషన్ చేయడంలో చిన్న తప్పు జరిగినా అప్లికేషన్ క్రాష్ అయిపోతుంది.
      </p>
      <p>
        ఈ సమగ్ర 3వ అధ్యాయంలో మనం కన్సోల్ ఇన్‌పుట్ మెకానిజమ్స్ (<code>ReadLine</code>, <code>ReadKey</code>), టైప్ కాస్టింగ్ నిబంధనలు (Widening vs Narrowing), డేటా ఓవర్‌ఫ్లో రక్షణ (<code>checked/unchecked</code>), మరియు ఎంటర్‌ప్రైజ్ .NET సిస్టమ్స్‌లో వాడే రక్షిత టెక్నిక్ <strong><code>TryParse()</code></strong> డిఫెన్సివ్ ప్రోగ్రామింగ్‌ను లోతుగా నేర్చుకోబోతున్నాం!
      </p>
    </div>

    <!-- SECTION 1 -->
    <section>
      <h2 class="section-title"><span class="num">1</span> రియల్-వరల్డ్ ప్రోగ్రామింగ్‌లో ఇన్‌పుట్ &amp; టైప్ కన్వర్షన్ ఎందుకు గుండెకాయ వంటిది?</h2>
      <p>
        గత అధ్యాయంలో మనం C# లోని వివిధ డేటా టైప్స్ (<code>int</code>, <code>double</code>, <code>decimal</code>, <code>string</code>) గురించి నేర్చుకున్నాం. కోడ్‌లో మనమే డైరెక్ట్‌గా <code>int age = 25;</code> అని రాస్తే దాన్ని <em>హార్డ్‌కోడెడ్ డేటా (Hardcoded Data)</em> అంటారు. కానీ నిజ జీవితంలో ఒక బ్యాంకింగ్ యాప్ లేదా ఈ-కామర్స్ యాప్ రాస్తున్నప్పుడు వయస్సు లేదా నగదు డిపాజిట్ ఎంత అనేది యూజర్ మాత్రమే నిర్ణయిస్తాడు.
      </p>
      <p>
        ఆపరేటింగ్ సిస్టమ్ ఆర్కిటెక్చర్ ప్రకారం, కీబోర్డ్ నుండి యూజర్ ఏది టైప్ చేసినా అది స్టాండర్డ్ ఇన్‌పుట్ స్ట్రీమ్ (<code>stdin</code>) ద్వారా టెక్స్ట్ బఫర్‌లోకి చేరుతుంది. కాబట్టి C# రన్‌టైమ్ దాన్ని స్వతహాగా కేవలం ఒక <strong>టెక్స్ట్ స్ట్రింగ్ (String)</strong> గానే గుర్తిస్తుంది.
      </p>

      <div style="background:var(--bg3); border-left:4px solid #10b981; padding:16px 20px; border-radius:0 8px 8px 0; margin:20px 0;">
        <strong style="color:var(--text); font-size:15px;">🧠 ఆలోచించండి (The "20" + "30" = "2030" Trap):</strong>
        <p style="margin:8px 0 0; color:var(--text2); font-size:14.5px;">
          మీరు యూజర్‌ని రెండు నంబర్లు అడిగారనుకుందాం. యూజర్ <code>20</code> మరియు <code>30</code> ఇచ్చాడు. మీరు వాటిని స్ట్రింగ్స్ గానే ఉంచి <code>+</code> ఆపరేటర్ వాడితే, కంప్యూటర్ వాటిని నంబర్లుగా కూడదు! బదులుగా స్ట్రింగ్ కంకాటెనేషన్ చేసి <strong>"2030"</strong> అనే సమాధానాన్ని ఇస్తుంది! దీనివల్ల బ్యాంక్ అకౌంట్ బ్యాలెన్స్ ₹50 బదులు ₹2030 చూపించి బ్యాంక్ దివాలా తీస్తుంది. అందుకే స్ట్రింగ్‌ను నంబర్‌గా మార్చే <strong>Type Conversion</strong> అత్యంత ప్రధానమైన ప్రాసెస్.
        </p>
      </div>

      <p>
        C# లో టైప్ కన్వర్షన్ చేయడానికి ప్రధానంగా 4 దారులు ఉన్నాయి:
      </p>
      <ol style="margin-left:24px; line-height:1.8; color:var(--text2);">
        <li><strong>Implicit Casting (ఆటోమేటిక్ వైడనింగ్):</strong> చిన్న డేటా టైప్ నుండి పెద్ద డేటా టైప్‌కి ఎటువంటి డేటా లాస్ లేకుండా కంపైలర్ స్వయంగా చేసే మార్పిడి.</li>
        <li><strong>Explicit Casting (మాన్యువల్ న్యాకోవింగ్):</strong> డేటా లాస్ అయ్యే ప్రమాదం ఉన్నప్పటికీ ప్రోగ్రామర్ బాధ్యత తీసుకొని <code>(int)value</code> రూపంలో బలవంతంగా చేసే మార్పిడి.</li>
        <li><strong>Convert Helper Class:</strong> .NET లైబ్రరీ అందించే <code>Convert.ToInt32()</code> వంటి సమగ్ర మెథడ్స్ (ఇవి <code>null</code> విలువలను సురక్షితంగా హ్యాండిల్ చేస్తాయి).</li>
        <li><strong>Parsing Methods (<code>Parse()</code> &amp; <code>TryParse()</code>):</strong> టెక్స్ట్ స్ట్రింగ్‌ను సంఖ్యలుగా మార్చే ప్రత్యేక సాధనాలు. వీటిలో <code>TryParse()</code> క్రాష్ రహిత ప్రొడక్షన్ కోడ్‌కి మూలస్తంభం.</li>
      </ol>
    </section>

    <!-- SECTION 2 -->
    <section>
      <h2 class="section-title"><span class="num">2</span> ⌨️ Console.ReadLine(), Console.ReadKey() &amp; Console.Read() — తేడాలు మరియు పనితీరు</h2>
      <p>
        C# లో <code>System.Console</code> క్లాస్ యూజర్ నుండి ఇన్‌పుట్ తీసుకోవడానికి మూడు వేర్వేరు మెథడ్స్‌ను అందిస్తుంది. చాలామంది బిగినర్స్ కేవలం <code>ReadLine()</code> మాత్రమే వాడతారు, కానీ ప్రొఫెషనల్ ప్రాజెక్ట్స్‌లో మిగిలిన రెండింటి ప్రాముఖ్యత అపారం.
      </p>

      <h3 style="font-size:17px; margin-top:24px; color:var(--text);">1. Console.ReadLine() — పూర్తి లైన్ చదవడం</h3>
      <p>
        యూజర్ కీబోర్డ్‌పై టైప్ చేసి <strong>Enter కీ</strong> నొక్కే వరకు వేచి ఉండి, అంతవరకు టైప్ చేసిన మొత్తం అక్షరాలను ఒకే స్ట్రింగ్‌గా రిటర్న్ చేస్తుంది.
      </p>
      <p>
        <strong>మోడ్రన్ C# 12 Nullable Reference Warning (CS8600):</strong><br>
        మీరు <code>string name = Console.ReadLine();</code> అని రాస్తే VS Code లో లేదా కంపైలర్‌లో పసుపు పచ్చ వార్నింగ్ వస్తుంది: <em>"Converting null literal or possible null value to non-nullable type"</em>. ఎందుకంటే యూజర్ కన్సోల్‌లో ఏమీ ఎంటర్ చేయకుండా <code>Ctrl+Z</code> (End-of-File) కొడితే <code>ReadLine()</code> null రిటర్న్ చేయవచ్చు. కాబట్టి ప్రొఫెషనల్ కోడ్‌లో ఇలా రాయాలి:
      </p>

      <div class="code-block">
        <div class="code-block-header">
          <span>csharp · Null-Safe Input Reading</span>
          <div class="code-actions">
            <button class="copy-btn" onclick="copyCode(this)">Copy</button>
            <button class="try-btn" onclick="runCode(this)">Run</button>
          </div>
        </div>
        <pre><code class="language-csharp">// Option A: Nullable string వాడటం (సిఫార్సు చేయబడినది)
Console.Write("మీ పేరు టైప్ చేయండి: ");
string? name = Console.ReadLine();

// Option B: Null Coalescing ఆపరేటర్ (??) తో డీఫాల్ట్ విలువ ఇవ్వడం
Console.Write("నగరం పేరు: ");
string city = Console.ReadLine() ?? "హైదరాబాద్";

Console.WriteLine($"నమస్కారం, {name}! మీరు {city} నుండి లాగిన్ అయ్యారు.");</code></pre>
      </div>

      <h3 style="font-size:17px; margin-top:28px; color:var(--text);">2. Console.ReadKey() — సింగిల్ కీ మరియు సీక్రెట్ పాస్‌వర్డ్స్</h3>
      <p>
        యూజర్ Enter కొట్టే వరకు ఆగదు! కీబోర్డ్‌పై ఏదైనా ఒక కీ తాకగానే వెంటనే రియాక్ట్ అవుతుంది. ఇది ఒక <code>ConsoleKeyInfo</code> ఆబ్జెక్ట్‌ను ఇస్తుంది, అందులో ఏ కీ నొక్కారు (<code>Key</code>), దాని అక్షరం ఏమిటి (<code>KeyChar</code>), Shift లేదా Ctrl నొక్కారా లేదా అనే వివరాలు ఉంటాయి.
      </p>
      <p>
        ముఖ్యంగా <code>Console.ReadKey(intercept: true)</code> అని ఇస్తే, యూజర్ నొక్కిన కీ తెరపై కనపడదు (స్క్రీన్ పై ప్రింట్ అవ్వకుండా ఇంటర్‌సెప్ట్ అవుతుంది). బ్యాంకింగ్ పాస్‌వర్డ్‌లు, గేమ్స్ (WASD బాణాలు), లేదా "ప్రోగ్రామ్ ముగించడానికి ఏదైనా కీ నొక్కండి..." లాంటి సందర్భాల్లో ఇది అమూల్యం.
      </p>

      <div class="code-block">
        <div class="code-block-header">
          <span>csharp · Secret Password Masking with ReadKey</span>
          <div class="code-actions">
            <button class="copy-btn" onclick="copyCode(this)">Copy</button>
            <button class="try-btn" onclick="runCode(this)">Run</button>
          </div>
        </div>
        <pre><code class="language-csharp">// రహస్య పిన్ నంబర్ రీడ్ చేస్తూ తెరపై నక్షత్రాలు (*) చూపించడం
Console.Write("4-అంకెల ATM పిన్ ఎంటర్ చేయండి: ");
string pin = "";

while (true)
{
    ConsoleKeyInfo keyInfo = Console.ReadKey(intercept: true); // తెరపై ప్రింట్ కాదు
    if (keyInfo.Key == ConsoleKey.Enter) break; // Enter కొట్టగానే ఆగిపోతుంది
    
    if (char.IsDigit(keyInfo.KeyChar))
    {
        pin += keyInfo.KeyChar;
        Console.Write("*"); // యూజర్ చూసేది కేవలం నక్షత్రం మాత్రమే!
    }
}

Console.WriteLine($"\\nపిన్ విజయవంతంగా స్వీకరించబడింది! పొడవు: {pin.Length} అంకెలు.");</code></pre>
      </div>

      <h3 style="font-size:17px; margin-top:28px; color:var(--text);">3. Console.Read() — ఒకే క్యారెక్టర్ యొక్క పూర్ణాంక విలువ</h3>
      <p>
        ఇది ఇన్‌పుట్ స్ట్రీమ్ నుండి ఒక్క క్యారెక్టర్‌ను చదివి దాని యొక్క పూర్ణాంక (ASCII / Unicode <code>int</code>) విలువను ఇస్తుంది. ఒకవేళ ఇన్‌పుట్ ఏమీ లేకపోతే <code>-1</code> ఇస్తుంది. సాధారణంగా లో-లెవల్ స్ట్రీమ్ ప్రాసెసింగ్ మినహా ఆధునిక అప్లికేషన్లలో దీన్ని చాలా అరుదుగా వాడతారు.
      </p>
    </section>

    <!-- SECTION 3 -->
    <section>
      <h2 class="section-title"><span class="num">3</span> 🔄 ఇంప్లిసిట్ టైప్ కాస్టింగ్ (Implicit Type Casting / Type Widening)</h2>
      <p>
        C# కంపైలర్ చాలా తెలివైనది మరియు భద్రతకు అత్యధిక ప్రాధాన్యత ఇస్తుంది. ఒక చిన్న మెమరీ కంటైనర్‌లో ఉన్న డేటాను తీసుకొని పెద్ద మెమరీ కంటైనర్‌లో వేస్తే ఎటువంటి డేటా ఒలకదు లేదా నష్టపోదు అని కంపైలర్‌కు నమ్మకం కుదిరినప్పుడు, అది ఎటువంటి ఎర్రర్ లేకుండా ఆటోమేటిక్‌గా టైప్ మార్చేస్తుంది. దీనినే <strong>ఇంప్లిసిట్ కాస్టింగ్ (Implicit Casting)</strong> లేదా <strong>టైప్ వైడనింగ్ (Type Widening)</strong> అంటారు.
      </p>

      <div style="background:var(--bg2); border:1px solid var(--border); border-radius:10px; padding:16px; margin:20px 0; font-family:monospace; font-size:14px; text-align:center; color:#10b981;">
        byte (8-bit) ➔ short (16-bit) ➔ int (32-bit) ➔ long (64-bit) ➔ float (32-bit) ➔ double (64-bit)
      </div>

      <p>
        <strong>నిజ జీవిత ఉపమానం:</strong> మీ దగ్గర 250 మిల్లీలీటర్ల గ్లాసులో నీరు ఉంది. దాన్ని తీసుకెళ్లి 5 లీటర్ల పెద్ద బకెట్‌లో పోస్తే ఒక్క చుక్క కూడా బయట పడదు. అలాగే <code>int</code> (4 బైట్లు) లో ఉన్న <code>100</code> ని <code>long</code> (8 బైట్లు) లేదా <code>double</code> (8 బైట్లు) లోకి మార్చినా దాని విలువలో ఎటువంటి మార్పు ఉండదు.
      </p>

      <div class="code-block">
        <div class="code-block-header">
          <span>csharp · Implicit Casting Demonstration</span>
          <div class="code-actions">
            <button class="copy-btn" onclick="copyCode(this)">Copy</button>
            <button class="try-btn" onclick="runCode(this)">Run</button>
          </div>
        </div>
        <pre><code class="language-csharp">int studentMarks = 95;           // 4 బైట్ల పూర్ణాంకం
long bigRegisterId = studentMarks; // ఆటోమేటిక్ వైడనింగ్ (int to long)
double percentage = studentMarks; // ఆటోమేటిక్ వైడనింగ్ (int to double)

Console.WriteLine($"Original int: {studentMarks}");
Console.WriteLine($"Converted long: {bigRegisterId}");
Console.WriteLine($"Converted double: {percentage:F2}"); // 95.00</code></pre>
      </div>
      <p>
        <strong>ముఖ్య గమనిక:</strong> ఇంప్లిసిట్ కాస్టింగ్‌లో మనం ఎటువంటి ప్రత్యేక బ్రాకెట్లు <code>(type)</code> రాయవలసిన అవసరం లేదు. కంపైలర్ తనంతట తానుగానే సిలికాన్ రిజిస్టర్లను అప్‌స్కేల్ చేస్తుంది.
      </p>
    </section>

    <!-- SECTION 4 -->
    <section>
      <h2 class="section-title"><span class="num">4</span> ⚠️ ఎక్స్‌ప్లిసిట్ టైప్ కాస్టింగ్ (Explicit Type Casting / Type Narrowing) &amp; డేటా లాస్</h2>
      <p>
        ఇప్పుడు రివర్స్ పరిస్థితిని ఆలోచించండి. 5 లీటర్ల బకెట్ నిండా ఉన్న నీటిని 250 మిల్లీలీటర్ల చిన్న గ్లాసులోకి పోయడానికి ప్రయత్నిస్తే ఏమవుతుంది? ఖచ్చితంగా నీరంతా నేలపాలైపోతుంది! కంప్యూటర్ ప్రోగ్రామింగ్‌లో కూడా పెద్ద మెమరీ సైజు గల వేరియబుల్‌ను చిన్న మెమరీ సైజు గల వేరియబుల్‌లోకి బలవంతంగా కుక్కినప్పుడు డేటా నష్టం జరుగుతుంది. దీనిని <strong>ఎక్స్‌ప్లిసిట్ కాస్టింగ్ (Explicit Casting)</strong> లేదా <strong>టైప్ న్యారోయింగ్ (Type Narrowing)</strong> అంటారు.
      </p>
      <p>
        కంపైలర్ దీనిని ఆటోమేటిక్‌గా చేయడానికి అస్సలు ఒప్పుకోదు! ఒకవేళ మీరు <code>int x = 99.85;</code> అని రాస్తే, కంపైలర్ ఎర్రర్ కొడుతుంది. "నేను నా స్వంత పూచీకత్తుపై చేస్తున్నాను, డేటా పోయినా నాదే బాధ్యత" అని ప్రోగ్రామర్ బ్రాకెట్లలో <strong>కాస్ట్ ఆపరేటర్</strong> రాయాలి: <code>(int)99.85;</code>.
      </p>

      <div class="code-block">
        <div class="code-block-header">
          <span>csharp · Explicit Casting &amp; Truncation Danger</span>
          <div class="code-actions">
            <button class="copy-btn" onclick="copyCode(this)">Copy</button>
            <button class="try-btn" onclick="runCode(this)">Run</button>
          </div>
        </div>
        <pre><code class="language-csharp">double productPrice = 999.89;

// ఎక్స్‌ప్లిసిట్ కాస్టింగ్: డెసిమల్ భాగం కత్తిరించబడుతుంది (Truncation)
int roundedPrice = (int)productPrice; 

Console.WriteLine($"అసలు ధర: {productPrice}");
Console.WriteLine($"కాస్ట్ చేసిన పూర్ణాంక విలువ: {roundedPrice}"); // 999 మాత్రమే వస్తుంది! 1000 కాదు!

// బిట్ ఓవర్‌ఫ్లో ప్రమాదం (Bit-Level Truncation):
int massiveNumber = 300;
byte smallByte = (byte)massiveNumber; // byte గరిష్ట పరిమితి 255 మాత్రమే!

Console.WriteLine($"Original int: {massiveNumber}");
Console.WriteLine($"Byte result after overflow: {smallByte}"); // 44 మాత్రమే వస్తుంది!!</code></pre>
      </div>

      <div style="background:var(--bg3); border-left:4px solid #ef4444; padding:16px 20px; border-radius:0 8px 8px 0; margin:20px 0;">
        <strong style="color:#ef4444; font-size:15px;">🚨 300 కాస్తా 44 గా ఎందుకు మారింది? (The Binary Math):</strong>
        <p style="margin:8px 0 0; color:var(--text2); font-size:14px; line-height:1.7;">
          బైనరీలో <code>300</code> అంటే <code>00000001 00101100</code> (9 బిట్లు). కానీ <code>byte</code> కేవలం ఆఖరి 8 బిట్లను మాత్రమే నిల్వ చేయగలదు. కాబట్టి మొదటి బిట్ <code>1</code> కత్తిరించబడిపోగా, మిగిలిన 8 బిట్లు <code>00101100</code> మిగిలాయి. దీని డెసిమల్ విలువ సరిగ్గా <strong>44</strong>! ఇలాంటి బగ్స్ సాఫ్ట్‌వేర్‌లో ఊహించని ఆర్థిక నష్టాలను కలిగిస్తాయి.
        </p>
      </div>
    </section>

    <!-- SECTION 5 -->
    <section>
      <h2 class="section-title"><span class="num">5</span> 🛡️ checked మరియు unchecked కీవర్డ్స్ — సైలెంట్ ఓవర్‌ఫ్లో బగ్స్ నివారణ</h2>
      <p>
        డీఫాల్ట్‌గా C# లో పూర్ణాంకాల గణితం (Integer Arithmetic) <strong><code>unchecked</code></strong> మోడ్‌లో నడుస్తుంది. అంటే ఒక వేరియబుల్ తన గరిష్ట పరిమితిని దాటితే (ఉదాహరణకు <code>int.MaxValue + 1</code>), రన్‌టైమ్ ఎటువంటి ఎర్రర్ లేదా అలర్ట్ ఇవ్వకుండా నెగటివ్ నంబర్‌గా మారిపోతుంది (దీన్నే సైలెంట్ రాప్‌అరౌండ్ అంటారు).
      </p>
      <p>
        కానీ మిషన్-క్రిటికల్ ప్రాజెక్ట్స్‌లో (రాకెట్ లాంచ్ సాఫ్ట్‌వేర్, మెడికల్ పరికరాలు, బ్యాంకింగ్ లెక్కలు) ఇలా సైలెంట్‌గా తప్పు విలువలు రావడం మహాప్రమాదం. దీనికి పరిష్కారంగా C# మనకు <strong><code>checked</code></strong> అనే ప్రత్యేక రక్షిత బ్లాక్‌ను ఇచ్చింది!
      </p>

      <div class="code-block">
        <div class="code-block-header">
          <span>csharp · checked vs unchecked Arithmetic</span>
          <div class="code-actions">
            <button class="copy-btn" onclick="copyCode(this)">Copy</button>
            <button class="try-btn" onclick="runCode(this)">Run</button>
          </div>
        </div>
        <pre><code class="language-csharp">int maxMoney = int.MaxValue; // 2,147,483,647

// 1. Unchecked (Default) - సైలెంట్ బగ్
int broken = unchecked(maxMoney + 1);
Console.WriteLine($"Unchecked result: {broken}"); // -2,147,483,648 (నెగటివ్ అయిపోయింది!)

// 2. Checked - పూర్తి రక్షణ (Exception విసురుతుంది)
try
{
    checked
    {
        Console.WriteLine("రక్షిత కాలిక్యులేషన్ మొదలవుతోంది...");
        int safeMoney = maxMoney + 1; // ఇక్కడ OverflowException వస్తుంది
        Console.WriteLine(safeMoney);
    }
}
catch (OverflowException ex)
{
    Console.WriteLine($"🚨 సేఫ్టీ గార్డ్ అలర్ట్: మెమరీ పరిమితి దాటింది! {ex.Message}");
}</code></pre>
      </div>
    </section>

    <!-- SECTION 6 -->
    <section>
      <h2 class="section-title"><span class="num">6</span> 🧰 Convert క్లాస్ — విశ్వసనీయమైన ఆల్-రౌండర్ కన్వర్షన్ సాధనం</h2>
      <p>
        C# బేస్ క్లాస్ లైబ్రరీ (BCL) లోని <code>System.Convert</code> క్లాస్ ఒక స్విస్-ఆర్మీ నైఫ్ లాంటిది. ఇది ఏదైనా ఒక డేటా టైప్ నుండి మరొక డేటా టైప్‌కి మార్చడానికి పదుల సంఖ్యలో స్టాటిక్ మెథడ్స్‌ను అందిస్తుంది:
      </p>
      <ul style="margin-left:24px; line-height:1.8; color:var(--text2);">
        <li><code>Convert.ToInt32(val)</code> ➔ 32-బిట్ పూర్ణాంకం (<code>int</code>) గా మారుస్తుంది.</li>
        <li><code>Convert.ToInt64(val)</code> ➔ 64-బిట్ పూర్ణాంకం (<code>long</code>) గా మారుస్తుంది.</li>
        <li><code>Convert.ToDouble(val)</code> ➔ ఫ్లోటింగ్ పాయింట్ (<code>double</code>) గా మారుస్తుంది.</li>
        <li><code>Convert.ToDecimal(val)</code> ➔ ఖచ్చితమైన కరెన్సీ (<code>decimal</code>) గా మారుస్తుంది.</li>
        <li><code>Convert.ToBoolean(val)</code> ➔ బూలియన్ (<code>bool</code>) గా మారుస్తుంది ("true", "false", 1, 0).</li>
        <li><code>Convert.ToString(val)</code> ➔ ఏదైనా వేరియబుల్‌ను స్ట్రింగ్ రూపంలోకి మారుస్తుంది.</li>
      </ul>

      <h3 style="font-size:17px; margin-top:24px; color:var(--text);">Convert క్లాస్ యొక్క 2 సూపర్ పవర్స్:</h3>
      
      <p>
        <strong>1. Null-Safety (నల్ విలువను క్షమించడం):</strong><br>
        మీరు <code>(int)nullVar</code> అని క్యాస్ట్ చేస్తే కంపైలర్ ఎర్రర్ ఇస్తుంది లేదా రన్‌టైమ్ లో క్రాష్ అవుతుంది. కానీ <code>Convert.ToInt32(null)</code> అని పిలిస్తే ఎటువంటి ఎక్సెప్షన్ రాదు! అది నిశ్శబ్దంగా సురక్షితమైన డీఫాల్ట్ విలువ <strong><code>0</code></strong> ని రిటర్న్ చేస్తుంది! డేటాబేస్ నుండి వచ్చే ఖాళీ రికార్డులను రీడ్ చేసేటప్పుడు ఇది ఎంతో ఉపయోగపడుతుంది.
      </p>

      <p>
        <strong>2. Banker's Rounding (రౌండ్-టు-ఈవెన్ రూల్):</strong><br>
        మనం సాధారణ క్యాస్టింగ్ <code>(int)4.5</code> చేస్తే అది కేవలం డెసిమల్‌ను తుడిచేసి <code>4</code> ఇస్తుంది. కానీ <code>Convert.ToInt32(4.5)</code> మరియు <code>Convert.ToInt32(5.5)</code> రెండూ కూడా సమీపంలో ఉన్న సరిసంఖ్య (Even Number) వైపుకు రౌండ్ చేస్తాయి! దీనివల్ల గణాంకాల విశ్లేషణలో క్రమబద్ధమైన లోపాలు (Systematic Bias) తగ్గుతాయి.
      </p>

      <div class="code-block">
        <div class="code-block-header">
          <span>csharp · Convert Class in Action</span>
          <div class="code-actions">
            <button class="copy-btn" onclick="copyCode(this)">Copy</button>
            <button class="try-btn" onclick="runCode(this)">Run</button>
          </div>
        </div>
        <pre><code class="language-csharp">string strNumber = "500";
int parsedInt = Convert.ToInt32(strNumber);

string? nullString = null;
int safeZero = Convert.ToInt32(nullString); // ఎర్రర్ రాదు, 0 వస్తుంది!
Console.WriteLine($"Null safe conversion: {safeZero}");

// Banker's Rounding తనిఖీ:
Console.WriteLine($"Convert.ToInt32(4.5) = {Convert.ToInt32(4.5)}"); // 4 (Even)
Console.WriteLine($"Convert.ToInt32(5.5) = {Convert.ToInt32(5.5)}"); // 6 (Even)

// Boolean conversion:
bool flag = Convert.ToBoolean("true");
bool numFlag = Convert.ToBoolean(1); // 1 అంటే true, 0 అంటే false
Console.WriteLine($"Boolean flags: {flag}, {numFlag}");</code></pre>
      </div>
    </section>

    <!-- SECTION 7 -->
    <section>
      <h2 class="section-title"><span class="num">7</span> 💥 Parse() మెథడ్స్ — స్ట్రింగ్ టు ప్రిమిటివ్ టైప్స్ (మరియు దాగి ఉన్న గనులు)</h2>
      <p>
        C# లోని ప్రతి ప్రిమిటివ్ డేటా టైప్ వద్ద స్ట్రింగ్‌ను రీడ్ చేయడానికి ఒక బిల్ట్-ఇన్ <strong><code>Parse()</code></strong> మెథడ్ ఉంటుంది: <code>int.Parse()</code>, <code>double.Parse()</code>, <code>decimal.Parse()</code>, <code>DateTime.Parse()</code>.
      </p>
      <p>
        స్ట్రింగ్‌లో ఉన్న డేటా 100% పక్కాగా సరైన ఫార్మాట్‌లో ఉందని మీకు గ్యారెంటీ ఉన్నప్పుడు ఇది చాలా వేగంగా పనిచేస్తుంది. ఉదాహరణకు <code>int.Parse("450")</code> మీకు చక్కగా 450 అనే సంఖ్యను ఇస్తుంది.
      </p>

      <div style="background:var(--bg3); border-left:4px solid #f59e0b; padding:16px 20px; border-radius:0 8px 8px 0; margin:20px 0;">
        <strong style="color:#d97706; font-size:15px;">💣 Parse() మెథడ్‌లో దాగి ఉన్న 3 ప్రమాదకరమైన మందుపాతరలు (Exceptions):</strong>
        <p style="margin:8px 0 0; color:var(--text2); font-size:14px; line-height:1.7;">
          యూజర్ నుండి వచ్చే ఇన్‌పుట్‌పై నమ్మకం పెట్టుకొని గుడ్డిగా <code>int.Parse(Console.ReadLine())</code> అని రాస్తే ఈ క్రింది 3 సందర్భాలలో మీ మొత్తం సాఫ్ట్‌వేర్ క్రాష్ అయిపోతుంది:
        </p>
        <ol style="margin-left:20px; margin-top:8px; line-height:1.6; font-size:13.5px; color:var(--text2);">
          <li><strong>ArgumentNullException:</strong> యూజర్ ఏమీ టైప్ చేయకుండా ఖాళీగా వదిలేస్తే (<code>null</code>).</li>
          <li><strong>FormatException:</strong> సంఖ్యకు బదులు అక్షరాలు టైప్ చేస్తే (ఉదా: <code>"abc"</code> లేదా <code>"12.5"</code> ని int లోకి పాస్ చేస్తే).</li>
          <li><strong>OverflowException:</strong> డేటా టైప్ సైజు కంటే పెద్ద సంఖ్య ఇస్తే (ఉదా: <code>"999999999999999"</code> ని int లోకి పాస్ చేస్తే).</li>
        </ol>
      </div>

      <div class="code-block">
        <div class="code-block-header">
          <span>csharp · Parse() Exception Traps</span>
          <div class="code-actions">
            <button class="copy-btn" onclick="copyCode(this)">Copy</button>
            <button class="try-btn" onclick="runCode(this)">Run</button>
          </div>
        </div>
        <pre><code class="language-csharp">try
{
    Console.Write("మీ వయస్సు టైప్ చేయండి: ");
    string? rawInput = Console.ReadLine();
    
    // ఒకవేళ యూజర్ "ఇరవై" లేదా "twenty" అని రాస్తే ఇక్కడ క్రాష్ అవుతుంది!
    int age = int.Parse(rawInput!); 
    Console.WriteLine($"వచ్చే ఏడాదికి మీ వయస్సు: {age + 1}");
}
catch (FormatException)
{
    Console.WriteLine("ఎర్రర్: దయచేసి కేవలం అంకెలు మాత్రమే టైప్ చేయండి!");
}
catch (OverflowException)
{
    Console.WriteLine("ఎర్రర్: మీరు ఇచ్చిన సంఖ్య చాలా పెద్దదిగా ఉంది!");
}</code></pre>
      </div>
      <p>
        ప్రతి చిన్న ఇన్‌పుట్‌కి ఇంత పెద్ద <code>try-catch</code> బ్లాక్ రాయడం కోడ్ క్లట్టర్‌కు దారితీస్తుంది మరియు ఎక్సెప్షన్ హ్యాండ్లింగ్ సిస్టమ్ రిసోర్సెస్‌ను విపరీతంగా వాడుకుంటుంది. అందుకే సీనియర్ ఆర్కిటెక్ట్స్ తర్వాతి సెక్షన్‌లో ఉన్న టెక్నిక్‌ను మాత్రమే వాడతారు!
      </p>
    </section>

    <!-- SECTION 8 -->
    <section>
      <h2 class="section-title"><span class="num">8</span> 🏆 గోల్డెన్ స్టాండర్డ్: TryParse() డిఫెన్సివ్ ప్రోగ్రామింగ్ &amp; out పారామీటర్స్</h2>
      <p>
        ఆధునిక C# లో యూజర్ ఇన్‌పుట్ లేదా ఎక్స్‌టర్నల్ ఫైల్ డేటాను ప్రాసెస్ చేయడానికి <strong><code>TryParse()</code></strong> ను గోల్డెన్ స్టాండర్డ్ (Golden Standard) గా పరిగణిస్తారు.
      </p>
      <p>
        <strong>TryParse ఎలా పనిచేస్తుంది?</strong><br>
        ఇది ఎట్టి పరిస్థితుల్లోనూ ఎక్సెప్షన్ విసరదు! కన్వర్షన్ విజయవంతమైతే <code>true</code> రిటర్న్ చేస్తుంది మరియు మార్చబడిన విలువను <code>out</code> పారామీటర్‌లో భద్రపరుస్తుంది. ఒకవేళ ఇన్‌పుట్ తప్పుగా ఉంటే (అక్షరాలు, నల్, పరిమితి దాటినా) నిశ్శబ్దంగా <code>false</code> రిటర్న్ చేస్తుంది మరియు <code>out</code> వేరియబుల్‌ను <code>0</code> గా సెట్ చేస్తుంది.
      </p>

      <div class="code-block">
        <div class="code-block-header">
          <span>csharp · Modern C# Inline TryParse Pattern</span>
          <div class="code-actions">
            <button class="copy-btn" onclick="copyCode(this)">Copy</button>
            <button class="try-btn" onclick="runCode(this)">Run</button>
          </div>
        </div>
        <pre><code class="language-csharp">Console.Write("మీ డిపాజిట్ మొత్తం ఎంటర్ చేయండి (రూపాయలు): ");
string? input = Console.ReadLine();

// C# 7+ Inline Out Variable Declaration
if (decimal.TryParse(input, out decimal depositAmount) &amp;&amp; depositAmount &gt; 0)
{
    Console.WriteLine($"✅ ధృవీకరించబడింది! జమ చేయబడిన మొత్తం: ₹{depositAmount:N2}");
}
else
{
    Console.WriteLine("❌ చెల్లని మొత్తం! దయచేసి సరైన ధనాత్మక సంఖ్యను నమోదు చేయండి.");
}</code></pre>
      </div>

      <h3 style="font-size:17px; margin-top:24px; color:var(--text);">యూజర్ సరైన సంఖ్య ఇచ్చే వరకు అడిగే అజేయమైన లూప్ (Foolproof Input Loop):</h3>
      <p>
        రియల్ వరల్డ్ అప్లికేషన్లలో యూజర్ తప్పు ఇన్‌పుట్ ఇచ్చినప్పుడు ప్రోగ్రామ్ ముగిసిపోకూడదు. సరైన ఇన్‌పుట్ ఇచ్చే వరకు యూజర్‌ని తిరిగి తిరిగి అడగాలి. ఈ క్రింది ప్యాటర్న్ ప్రొఫెషనల్ కోడింగ్‌లో అత్యంత ప్రాచుర్యం పొందింది:
      </p>

      <div class="code-block">
        <div class="code-block-header">
          <span>csharp · Unbreakable Input Validation Loop</span>
          <div class="code-actions">
            <button class="copy-btn" onclick="copyCode(this)">Copy</button>
            <button class="try-btn" onclick="runCode(this)">Run</button>
          </div>
        </div>
        <pre><code class="language-csharp">int validAge;

while (true)
{
    Console.Write("మీ వయస్సు నమోదు చేయండి (1 - 120): ");
    string? text = Console.ReadLine();
    
    if (int.TryParse(text, out validAge) &amp;&amp; validAge &gt;= 1 &amp;&amp; validAge &lt;= 120)
    {
        break; // సరైన వయస్సు లభించింది! లూప్ నుండి బయటపడవచ్చు
    }
    
    Console.ForegroundColor = ConsoleColor.Red;
    Console.WriteLine("తప్పుడు సమాచారం! దయచేసి 1 నుండి 120 మధ్య సరైన సంఖ్య ఇవ్వండి.");
    Console.ResetColor();
}

Console.WriteLine($"స్వాగతం! మీ వయస్సు {validAge} సంవత్సరాలుగా నమోదు చేయబడింది.");</code></pre>
      </div>
    </section>

    <!-- SECTION 9 -->
    <section>
      <h2 class="section-title"><span class="num">9</span> 📊 తులనాత్మక పట్టిక: (int) vs int.Parse() vs Convert.ToInt32() vs int.TryParse()</h2>
      <p>
        ఇంటర్వ్యూలలో మరియు ఆర్కిటెక్చర్ డిజైన్‌లో తరచుగా అడిగే కీలకమైన తేడాలను స్పష్టమైన అవగాహన కోసం ఈ సమగ్ర పట్టికలో పరిశీలించండి:
      </p>

      <table class="tbl">
        <thead>
          <tr>
            <th>ఫీచర్ / బిహేవియర్</th>
            <th>Casting: (int)val</th>
            <th>Parsing: int.Parse(str)</th>
            <th>Helper: Convert.ToInt32(val)</th>
            <th>Defensive: int.TryParse(str, out res)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>ఇన్‌పుట్ టైప్స్</strong></td>
            <td>సంఖ్యా రకాలు (double, float, byte...)</td>
            <td>కేవలం <code>string</code> మాత్రమే</td>
            <td>ఏదైనా ఆబ్జెక్ట్ (string, double, null, bool...)</td>
            <td>కేవలం <code>string</code> లేదా <code>ReadOnlySpan&lt;char&gt;</code></td>
          </tr>
          <tr>
            <td><strong>Null ఇచ్చినప్పుడు</strong></td>
            <td>కంపైల్ ఎర్రర్ (లేదా NRE)</td>
            <td><code>ArgumentNullException</code> (క్రాష్)</td>
            <td><strong>0</strong> రిటర్న్ చేస్తుంది (Null-Safe)</td>
            <td><strong>false</strong> ఇస్తుంది, res = 0 (క్రాష్ అవ్వదు)</td>
          </tr>
          <tr>
            <td><strong>తప్పుడు ఫార్మాట్ ("abc")</strong></td>
            <td>కంపైల్ టైమ్ లోనే ఒప్పుకోదు</td>
            <td><code>FormatException</code> (క్రాష్)</td>
            <td><code>FormatException</code> (క్రాష్)</td>
            <td><strong>false</strong> రిటర్న్ చేస్తుంది (అత్యంత సురక్షితం)</td>
          </tr>
          <tr>
            <td><strong>పరిమితి దాటినప్పుడు (&gt; 2.14B)</strong></td>
            <td>బిట్ కటింగ్ (Unchecked Truncation)</td>
            <td><code>OverflowException</code></td>
            <td><code>OverflowException</code></td>
            <td><strong>false</strong> రిటర్న్ చేస్తుంది</td>
          </tr>
          <tr>
            <td><strong>రౌండింగ్ విధానం (9.8 కి)</strong></td>
            <td>ట్రంకేషన్ (9 ఇస్తుంది)</td>
            <td>వర్తించదు (డెసిమల్ స్ట్రింగ్ ఇస్తే ఎర్రర్)</td>
            <td>Banker's Rounding (10 ఇస్తుంది)</td>
            <td>వర్తించదు (డెసిమల్ స్ట్రింగ్ ఇస్తే false)</td>
          </tr>
          <tr>
            <td><strong>పెర్ఫార్మెన్స్</strong></td>
            <td>మెరుపు వేగం (CPU సైకిల్స్)</td>
            <td>మధ్యస్థం (ఎర్రర్ వస్తే స్లో)</td>
            <td>మధ్యస్థం (ఇంటర్నల్ ఓవర్‌హెడ్)</td>
            <td><strong>అత్యుత్తమం</strong> (Zero Exceptions thrown)</td>
          </tr>
          <tr>
            <td><strong>ఉత్తమ వినియోగ సందర్భం</strong></td>
            <td>సాఫ్ట్‌వేర్ అంతర్గత నంబర్లలో డేటా సైజు మార్పులకు</td>
            <td>ఫార్మాట్ ఖచ్చితంగా సరైనదని తెలిసిన ఇంటర్నల్ ఫైల్స్ వద్ద</td>
            <td>డేటాబేస్ నుండి వచ్చే dynamic / nullable విలువలకు</td>
            <td><strong>యూజర్ ఇన్‌పుట్, వెబ్ ఏపీఐ, ఎక్స్‌టర్నల్ ఫైల్స్ అన్నిటికీ!</strong></td>
          </tr>
        </tbody>
      </table>
    </section>

    <!-- SECTION 10 -->
    <section>
      <h2 class="section-title"><span class="num">10</span> 🌍 CultureInfo &amp; ఇంటర్నేషనలైజేషన్ — డెసిమల్ పాయింట్ (.) vs కామా (,) సమస్యలు</h2>
      <p>
        ప్రపంచవ్యాప్తంగా సాఫ్ట్‌వేర్ రన్ అయ్యేటప్పుడు డెసిమల్ నంబర్లను ఎలా రాస్తారు అనే విషయంలో దేశాల మధ్య తీవ్రమైన విభేదాలు ఉన్నాయి:
      </p>
      <ul style="margin-left:24px; line-height:1.8; color:var(--text2);">
        <li><strong>భారతదేశం, అమెరికా, బ్రిటన్:</strong> డెసిమల్ పాయింట్‌గా చుక్క వాడతారు (ఉదా: <code>10.50</code>).</li>
        <li><strong>జర్మనీ, ఫ్రాన్స్, ఇటలీ, బ్రెజిల్:</strong> డెసిమల్ సెపరేటర్‌గా కామా వాడతారు (ఉదా: <code>10,50</code>) మరియు వేల విభజనకు చుక్క వాడతారు (<code>1.000,00</code>).</li>
      </ul>
      <p>
        మీరు సాధారణ <code>double.Parse("10.50")</code> అని రాస్తే, అది యూజర్ యొక్క కంప్యూటర్ ఆపరేటింగ్ సిస్టమ్ కల్చర్ (Regional Settings) ఆధారంగా పనిచేస్తుంది. మీ కోడ్ జర్మన్ సర్వర్‌లో రన్ అయినప్పుడు <code>"10.50"</code> ని చూసి <code>FormatException</code> త్రో చేస్తుంది, లేదా దాన్ని <strong>1050</strong> గా తప్పుగా చదువుతుంది! (10 రూపాయల వస్తువుకు 1050 రూపాయలు బిల్ చేస్తుంది).
      </p>

      <div class="code-block">
        <div class="code-block-header">
          <span>csharp · InvariantCulture for Universal Safety</span>
          <div class="code-actions">
            <button class="copy-btn" onclick="copyCode(this)">Copy</button>
            <button class="try-btn" onclick="runCode(this)">Run</button>
          </div>
        </div>
        <pre><code class="language-csharp">using System.Globalization;

string priceText = "49.99";

// సర్వర్ ప్రపంచంలో ఎక్కడ ఉన్నా చుక్క (.) నే డెసిమల్ గా గుర్తించే గ్లోబల్ ప్రామాణికం
if (double.TryParse(priceText, NumberStyles.Any, CultureInfo.InvariantCulture, out double universalPrice))
{
    Console.WriteLine($"గ్లోబల్ ధర విజయవంతంగా పార్స్ చేయబడింది: {universalPrice}");
}
else
{
    Console.WriteLine("ధర ఫార్మాట్ చెల్లదు!");
}</code></pre>
      </div>
      <p>
        <strong>ప్రొఫెషనల్ రూల్:</strong> ఆర్థిక లావాదేవీలు, వెబ్ API JSON డేటా మరియు కాన్ఫిగరేషన్ ఫైల్స్ రీడ్ చేసేటప్పుడు ఎల్లప్పుడూ <strong><code>CultureInfo.InvariantCulture</code></strong> వాడటం సీనియర్ సాఫ్ట్‌వేర్ ఆర్కిటెక్చర్ నియమం.
      </p>
    </section>

    <!-- SECTION 11 -->
    <section>
      <h2 class="section-title"><span class="num">11</span> 🚀 రియల్-వరల్డ్ ప్రాజెక్ట్: "Smart Retail Cashier &amp; Billing Engine"</h2>
      <p>
        ఇప్పటివరకు మనం నేర్చుకున్న <code>Console.ReadLine()</code>, <code>TryParse()</code>, టైప్ కాస్టింగ్, రౌండింగ్, మరియు నల్ హ్యాండ్లింగ్ కాన్సెప్ట్స్ అన్నింటినీ సమన్వయం చేస్తూ — ఒక పూర్తి స్థాయి రిటైల్ సూపర్ మార్కెట్ క్యాషియర్ కౌంటర్ బిల్లింగ్ ఇంజిన్‌ను తయారు చేద్దాం.
      </p>
      <p>
        ఈ ప్రాజెక్ట్ లో:
      </p>
      <ul style="margin-left:24px; line-height:1.7; color:var(--text2);">
        <li>కస్టమర్ పేరును నల్-సేఫ్‌గా రీడ్ చేస్తాం.</li>
        <li>వస్తువు పేరు, పరిమాణం (quantity), యూనిట్ ధర (price), మరియు డిస్కౌంట్ శాతాలను రక్షిత లూప్‌లలో స్వీకరిస్తాం.</li>
        <li>సబ్-టోటల్, 18% జీఎస్టీ (GST), డిస్కౌంట్ తగ్గింపుల తర్వాత తుది చెల్లింపు మొత్తాన్ని లెక్కగడతాం.</li>
        <li>ఆర్థిక ఖచ్చితత్వం కోసం <code>decimal</code> డేటా టైప్‌ను మాత్రమే వాడతాం.</li>
      </ul>

      <div class="code-block">
        <div class="code-block-header">
          <span>csharp · Smart Retail Cashier Console Project</span>
          <div class="code-actions">
            <button class="copy-btn" onclick="copyCode(this)">Copy</button>
            <button class="try-btn" onclick="runCode(this)">Run</button>
          </div>
        </div>
        <pre><code class="language-csharp">using System;
using System.Globalization;

Console.OutputEncoding = System.Text.Encoding.UTF8;
Console.WriteLine("=================================================");
Console.WriteLine("🛒 మన సూపర్ మార్కెట్ - స్మార్ట్ క్యాషియర్ కౌంటర్ v1.0");
Console.WriteLine("=================================================");

// 1. కస్టమర్ పేరు స్వీకరణ (Null-Coalescing)
Console.Write("కస్టమర్ పేరు నమోదు చేయండి: ");
string customerName = Console.ReadLine();
if (string.IsNullOrWhiteSpace(customerName))
{
    customerName = "గౌరవనీయ కస్టమర్";
}

// 2. వస్తువు పేరు
Console.Write("వస్తువు పేరు (Item Name): ");
string itemName = Console.ReadLine() ?? "సాధారణ వస్తువు";

// 3. పరిమాణం స్వీకరణ (Defensive int.TryParse Loop)
int quantity;
while (true)
{
    Console.Write("పరిమాణం (Quantity - అంకెలలో): ");
    string? qInput = Console.ReadLine();
    if (int.TryParse(qInput, out quantity) &amp;&amp; quantity &gt; 0)
    {
        break;
    }
    Console.WriteLine("❌ తప్పు! పరిమాణం కనీసం 1 లేదా అంతకంటే ఎక్కువ ఉండాలి.");
}

// 4. యూనిట్ ధర స్వీకరణ (Defensive decimal.TryParse Loop)
decimal unitPrice;
while (true)
{
    Console.Write("యూనిట్ ధర (Price per item ₹): ");
    string? pInput = Console.ReadLine();
    if (decimal.TryParse(pInput, NumberStyles.Any, CultureInfo.InvariantCulture, out unitPrice) &amp;&amp; unitPrice &gt; 0)
    {
        break;
    }
    Console.WriteLine("❌ తప్పు! దయచేసి సరైన ధరను ధనాత్మక సంఖ్యలో ఇవ్వండి.");
}

// 5. డిస్కౌంట్ శాతం (0 to 50%)
decimal discountPercent;
while (true)
{
    Console.Write("డిస్కౌంట్ శాతం (Discount % [0 to 50]): ");
    string? dInput = Console.ReadLine();
    if (decimal.TryParse(dInput, NumberStyles.Any, CultureInfo.InvariantCulture, out discountPercent) 
        &amp;&amp; discountPercent &gt;= 0 &amp;&amp; discountPercent &lt;= 50)
    {
        break;
    }
    Console.WriteLine("❌ తప్పు! డిస్కౌంట్ 0 నుండి 50 శాతం మధ్య మాత్రమే ఉండాలి.");
}

// 6. బిజినెస్ లాజిక్ కాలిక్యులేషన్స్
decimal subTotal = quantity * unitPrice;
decimal discountAmount = subTotal * (discountPercent / 100m);
decimal taxableAmount = subTotal - discountAmount;
decimal gstAmount = taxableAmount * 0.18m; // 18% ప్రామాణిక GST
decimal grandTotal = taxableAmount + gstAmount;

// 7. అందమైన రసీదు (Tax Invoice) ప్రింటింగ్
Console.WriteLine("\\n=================================================");
Console.WriteLine("                అధికారిక టాక్స్ ఇన్వాయిస్                ");
Console.WriteLine("=================================================");
Console.WriteLine($"తేదీ &amp; సమయం     : {DateTime.Now:dd-MMM-yyyy hh:mm tt}");
Console.WriteLine($"కస్టమర్ పేరు    : {customerName}");
Console.WriteLine($"కొన్న వస్తువు   : {itemName}");
Console.WriteLine($"పరిమాణం         : {quantity}");
Console.WriteLine($"యూనిట్ రేటు     : ₹{unitPrice:N2}");
Console.WriteLine("-------------------------------------------------");
Console.WriteLine($"సబ్-టోటల్       : ₹{subTotal:N2}");
Console.WriteLine($"డిస్కౌంట్ ({discountPercent}%)  : -₹{discountAmount:N2}");
Console.WriteLine($"పన్ను పరిధి మొత్తం : ₹{taxableAmount:N2}");
Console.WriteLine($"జీఎస్టీ (GST 18%): +₹{gstAmount:N2}");
Console.WriteLine("-------------------------------------------------");
Console.ForegroundColor = ConsoleColor.Green;
Console.WriteLine($"చెల్లించాల్సిన మొత్తం: ₹{grandTotal:N2}");
Console.ResetColor();
Console.WriteLine("=================================================");
Console.WriteLine("మా వద్ద షాపింగ్ చేసినందుకు ధన్యవాదాలు! మళ్లీ రండి! 🙏\\n");</code></pre>
      </div>

      <!-- TRY BOX COMPONENT -->
      <div class="try-box">
        <div class="try-title">🧪 లైవ్ కంపైలర్‌లో ఈ బిల్లింగ్ ఇంజిన్‌ను పరీక్షించండి!</div>
        <p>
          ఈ పూర్తి కోడ్‌ను మా ఇంటరాక్టివ్ బ్రౌజర్ ఎడిటర్‌లో పేస్ట్ చేసి రన్ చేయండి. మీ కస్టమర్ పేరు, పరిమాణం, మరియు ధర ఇచ్చి ఆటోమేటిక్ ఇన్వాయిస్ ఎలా జెనరేట్ అవుతుందో స్వయంగా చూడండి!
        </p>
        <button class="run-btn" onclick="openInteractiveCompiler()">
          ▶ Open C# Online Compiler with this Project
        </button>
      </div>
    </section>

    <!-- SECTION 12 -->
    <section>
      <h2 class="section-title"><span class="num">12</span> 🛑 బిగినర్స్ చేసే 7 ఘోరమైన తప్పులు &amp; ప్రొఫెషనల్ బెస్ట్ ప్రాక్టీసెస్</h2>
      <p>
        ఇండస్ట్రీలో జూనియర్ డెవలపర్లు కోడ్ రాసేటప్పుడు తరచుగా చేసే 7 ముఖ్యమైన తప్పులు మరియు వాటి నివారణ మార్గాలు:
      </p>

      <div style="display:grid; grid-template-columns:1fr; gap:16px; margin:24px 0;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #ef4444; border-radius:8px; padding:14px 18px;">
          <strong style="color:#ef4444;">1. CS8600 Nullable Warning ను పట్టించుకోకపోవడం:</strong>
          <p style="margin:6px 0 0; color:var(--text2); font-size:14px;">
            <code>string s = Console.ReadLine();</code> రాస్తే వార్నింగ్ వస్తుంది. ఎల్లప్పుడూ <code>string?</code> వాడండి లేదా <code>?? ""</code> తో శూన్యతను నిరోధించండి.
          </p>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #ef4444; border-radius:8px; padding:14px 18px;">
          <strong style="color:#ef4444;">2. ఎక్స్‌ప్లిసిట్ కాస్టింగ్ (int) రౌండ్ చేస్తుందనుకోవడం:</strong>
          <p style="margin:6px 0 0; color:var(--text2); font-size:14px;">
            <code>(int)9.99</code> ఎప్పటికీ 10 అవ్వదు, కేవలం 9 మాత్రమే అవుతుంది. రౌండింగ్ కావాలంటే <code>Math.Round()</code> లేదా <code>Convert.ToInt32()</code> వాడాలి.
          </p>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #ef4444; border-radius:8px; padding:14px 18px;">
          <strong style="color:#ef4444;">3. కరెన్సీ లెక్కలకు double లేదా float వాడటం:</strong>
          <p style="margin:6px 0 0; color:var(--text2); font-size:14px;">
            బైనరీ ఫ్లోటింగ్ పాయింట్ పరిమితుల వల్ల పైసల లెక్కల్లో తేడా వస్తుంది (ఉదా: 0.1 + 0.2 = 0.30000000000000004). డబ్బు లెక్కలకు <strong><code>decimal</code></strong> మాత్రమే వాడాలి.
          </p>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #ef4444; border-radius:8px; padding:14px 18px;">
          <strong style="color:#ef4444;">4. యూజర్ ఇన్‌పుట్‌లకు గుడ్డిగా int.Parse() వాడటం:</strong>
          <p style="margin:6px 0 0; color:var(--text2); font-size:14px;">
            యూజర్ పొరపాటున అక్షరం కొట్టగానే యాప్ క్రాష్ అయిపోతుంది. ఎల్లప్పుడూ <strong><code>int.TryParse()</code></strong> నే వాడాలి.
          </p>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #ef4444; border-radius:8px; padding:14px 18px;">
          <strong style="color:#ef4444;">5. CultureInfo ని విస్మరించడం:</strong>
          <p style="margin:6px 0 0; color:var(--text2); font-size:14px;">
            యూరోపియన్ దేశాల్లో డెసిమల్స్ కామాతో ఉంటాయి. API ఇన్‌పుట్స్ పార్స్ చేసేటప్పుడు <code>CultureInfo.InvariantCulture</code> ను జతచేయడం మర్చిపోవద్దు.
          </p>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #ef4444; border-radius:8px; padding:14px 18px;">
          <strong style="color:#ef4444;">6. checked బ్లాక్ లేకుండా పెద్ద మొత్తాల గుణకారాలు చేయడం:</strong>
          <p style="margin:6px 0 0; color:var(--text2); font-size:14px;">
            రెండు పెద్ద ఇంటిజర్లను గుణించినప్పుడు అది 2 బిలియన్లు దాటితే సైలెంట్‌గా నెగటివ్ నంబర్ అయిపోతుంది. కీలక గణనలకు <code>checked</code> బ్లాక్ వాడండి.
          </p>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #ef4444; border-radius:8px; padding:14px 18px;">
          <strong style="color:#ef4444;">7. Parse రిజల్ట్ చెక్ చేయకుండా out వేరియబుల్ వాడటం:</strong>
          <p style="margin:6px 0 0; color:var(--text2); font-size:14px;">
            <code>int.TryParse(str, out int val);</code> తర్వాత if కండిషన్ పెట్టకుండా డైరెక్ట్‌గా val వాడితే, పార్సింగ్ ఫెయిల్ అయినప్పుడు val లో 0 ఉంటుంది, అది తప్పుడు గణనలకు దారితీస్తుంది.
          </p>
        </div>
      </div>
    </section>

    <!-- SECTION 13 -->
    <section>
      <h2 class="section-title"><span class="num">13</span> 🧠 ఇంటరాక్టివ్ సెల్ఫ్-అసెస్మెంట్ క్విజ్ (5 లోతైన ప్రాక్టికల్ ప్రశ్నలు &amp; వివరణలు)</h2>
      <p>
        ఈ అధ్యాయంలో నేర్చుకున్న విషయాలను ఎంతవరకు గ్రహించారో ఈ 5 ఇంటరాక్టివ్ ప్రశ్నలతో మీరే స్వయంగా పరీక్షించుకోండి!
      </p>

      <!-- QUIZ 1 -->
      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:600; cursor:pointer; color:var(--text1);">
          ❓ ప్రశ్న 1: <code>int a = (int)8.99;</code> మరియు <code>int b = Convert.ToInt32(8.99);</code> ఎగ్జిక్యూట్ అయితే a మరియు b విలువలు ఏమిటి?
        </summary>
        <div style="margin-top:10px; font-size:14px; color:var(--text2); line-height:1.6;">
          <strong>సమాధానం:</strong> <code>a = 8</code> మరియు <code>b = 9</code>.<br>
          <strong>వివరణ:</strong> ఎక్స్‌ప్లిసిట్ కాస్టింగ్ <code>(int)</code> కేవలం డెసిమల్ భాగాలను తుడిచిపెడుతుంది (Truncation), కాబట్టి 8.99 లో .99 పోయి 8 మిగులుతుంది. కానీ <code>Convert.ToInt32()</code> రౌండింగ్ నియమాలను పాటిస్తుంది, 8.99 అనేది 9 కి దగ్గరగా ఉండటం వల్ల 9 గా రౌండ్ చేస్తుంది.
        </div>
      </details>

      <!-- QUIZ 2 -->
      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:600; cursor:pointer; color:var(--text1);">
          ❓ ప్రశ్న 2: <code>int.Parse(null)</code> మరియు <code>Convert.ToInt32(null)</code> రన్ చేస్తే ఏమి జరుగుతుంది?
        </summary>
        <div style="margin-top:10px; font-size:14px; color:var(--text2); line-height:1.6;">
          <strong>సమాధానం:</strong> <code>int.Parse(null)</code> రన్‌టైమ్‌లో <strong>ArgumentNullException</strong> విసిరి అప్లికేషన్‌ను క్రాష్ చేస్తుంది. కానీ <code>Convert.ToInt32(null)</code> ఎటువంటి ఎర్రర్ ఇవ్వకుండా సురక్షితంగా పూర్ణాంకం <strong>0</strong> ని రిటర్న్ చేస్తుంది.
        </div>
      </details>

      <!-- QUIZ 3 -->
      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:600; cursor:pointer; color:var(--text1);">
          ❓ ప్రశ్న 3: <code>Console.ReadKey(true)</code> లో <code>true</code> పారామీటర్ యొక్క ప్రాముఖ్యత ఏమిటి?
        </summary>
        <div style="margin-top:10px; font-size:14px; color:var(--text2); line-height:1.6;">
          <strong>సమాధానం:</strong> ఆ పారామీటర్ పేరు <code>intercept</code>. దాని విలువ <code>true</code> అయితే, యూజర్ కీబోర్డ్ పై నొక్కిన క్యారెక్టర్ తెరపై కనపడదు (It hides/intercepts echo to console). రహస్య పాస్‌వర్డ్‌లు, సెన్సిటివ్ పిన్‌లు రీడ్ చేయడానికి దీనిని వాడతారు.
        </div>
      </details>

      <!-- QUIZ 4 -->
      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:600; cursor:pointer; color:var(--text1);">
          ❓ ప్రశ్న 4: <code>int.TryParse("250", out int res)</code> లో <code>out</code> కీవర్డ్ ఎందుకు అవసరం?
        </summary>
        <div style="margin-top:10px; font-size:14px; color:var(--text2); line-height:1.6;">
          <strong>సమాధానం:</strong> ఒక C# మెథడ్ సాధారణంగా ఒకే విలువను రిటర్న్ చేయగలదు. <code>TryParse()</code> ఇప్పటికే పార్సింగ్ సక్సెస్ అయిందా లేదా తెలిపే <code>bool</code> ను రిటర్న్ చేస్తుంది. అదనంగా, కన్వర్ట్ అయిన సంఖ్యను బయటకు పంపడానికి <code>out</code> (Output Parameter) మెకానిజమ్‌ను ఉపయోగిస్తుంది.
        </div>
      </details>

      <!-- QUIZ 5 -->
      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:600; cursor:pointer; color:var(--text1);">
          ❓ ప్రశ్న 5: ఒక సంఖ్య <code>byte</code> గరిష్ట పరిమితి 255 ను దాటినప్పుడు <code>checked</code> బ్లాక్ లేకపోతే ఏమవుతుంది?
        </summary>
        <div style="margin-top:10px; font-size:14px; color:var(--text2); line-height:1.6;">
          <strong>సమాధానం:</strong> రన్‌టైమ్ ఎర్రర్ రాదు! హైయర్-ఆర్డర్ బిట్లు కత్తిరించబడి (Bit Truncation), సంఖ్య 0 నుండి మళ్లీ లూప్ అవుతుంది (ఉదా: 256 అనేది 0 గా, 257 అనేది 1 గా మారుతుంది). దీనినే బఫర్ ఓవర్‌ఫ్లో రాప్‌అరౌండ్ అంటారు.
        </div>
      </details>
    </section>

    <!-- CHAPTER NAVIGATION (PAGINATION) -->
    <div style="display:flex; justify-content:space-between; gap:16px; margin:40px 0 20px; flex-wrap:wrap;">
      <a href="/blog-csharp/02-csharp-variables-data-types-and-var.html" style="display:inline-flex; align-items:center; gap:8px; padding:10px 18px; border-radius:8px; background:var(--bg3); border:1px solid var(--border); color:var(--text); text-decoration:none; font-weight:700; font-size:13.5px;">
        ← Previous: 02. వేరియబుల్స్ &amp; CTS డేటా టైప్స్
      </a>
      <a href="/blog-csharp/04-csharp-operators-and-expressions.html" style="display:inline-flex; align-items:center; gap:8px; padding:10px 20px; border-radius:8px; background:linear-gradient(135deg, #10b981, #059669); color:#ffffff; text-decoration:none; font-weight:700; font-size:13.5px; box-shadow:0 2px 10px rgba(16,185,129,0.2);">
        Next: 04. ఆపరేటర్లు, ఎక్స్‌ప్రెషన్స్ &amp; Null-Coalescing →
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
using System.Globalization;

Console.OutputEncoding = System.Text.Encoding.UTF8;
Console.WriteLine("=================================================");
Console.WriteLine("🛒 మన సూపర్ మార్కెట్ - స్మార్ట్ క్యాషియర్ కౌంటర్ v1.0");
Console.WriteLine("=================================================");

Console.Write("కస్టమర్ పేరు: ");
string customerName = Console.ReadLine() ?? "గౌరవనీయ కస్టమర్";

Console.Write("వస్తువు పేరు: ");
string itemName = Console.ReadLine() ?? "బాస్మతి బియ్యం";

int quantity = 2;
decimal unitPrice = 149.50m;
decimal discountPercent = 10m;

decimal subTotal = quantity * unitPrice;
decimal discountAmount = subTotal * (discountPercent / 100m);
decimal taxableAmount = subTotal - discountAmount;
decimal gstAmount = taxableAmount * 0.18m;
decimal grandTotal = taxableAmount + gstAmount;

Console.WriteLine("\\n=================================================");
Console.WriteLine("                అధికారిక టాక్స్ ఇన్వాయిస్                ");
Console.WriteLine("=================================================");
Console.WriteLine($"తేదీ & సమయం     : {DateTime.Now:dd-MMM-yyyy hh:mm tt}");
Console.WriteLine($"కస్టమర్ పేరు    : {customerName}");
Console.WriteLine($"కొన్న వస్తువు   : {itemName}");
Console.WriteLine($"పరిమాణం         : {quantity}");
Console.WriteLine($"యూనిట్ రేటు     : ₹{unitPrice:N2}");
Console.WriteLine("-------------------------------------------------");
Console.WriteLine($"సబ్-టోటల్       : ₹{subTotal:N2}");
Console.WriteLine($"డిస్కౌంట్ ({discountPercent}%)  : -₹{discountAmount:N2}");
Console.WriteLine($"పన్ను పరిధి మొత్తం : ₹{taxableAmount:N2}");
Console.WriteLine($"జీఎస్టీ (GST 18%): +₹{gstAmount:N2}");
Console.WriteLine("-------------------------------------------------");
Console.WriteLine($"చెల్లించాల్సిన మొత్తం: ₹{grandTotal:N2}");
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

const outputPath = path.join(__dirname, '..', 'public', 'blog-csharp', '03-csharp-user-input-type-casting-parsing.html');
fs.writeFileSync(outputPath, fullHtml, 'utf8');
console.log('✅ Successfully generated deep high-value C# Chapter 03!');
console.log('Target file size:', fullHtml.length, 'characters');
