const fs = require('fs');
const path = require('path');
const { buildSidebar } = require('./csharp_curriculum_data');

const sidebarHtml = buildSidebar(6);

const fullHtml = `<!DOCTYPE html>
<html class="light-theme" lang="te">
<head>
  <!-- Character Encoding & Viewport -->
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">

  <!-- SEO Title & Meta Tags -->
  <title>C# switch స్టేట్‌మెంట్ & మోడ్రన్ switch ఎక్స్‌ప్రెషన్స్ — C# Masterclass | Mana Compiler</title>
  <meta name="description" content="C# లో సాంప్రదాయ switch-case, modern switch expressions (=>), when గార్డ్ షరతులు, టూపుల్ ప్యాటర్న్స్ మరియు జంప్ టేబుల్ ఆర్కిటెక్చర్‌పై సమగ్ర తెలుగు గైడ్.">
  <meta name="keywords" content="c# switch statement telugu, modern csharp switch expressions, c# when clause, tuple pattern matching, c# pattern matching">
  <meta name="author" content="Our Compiler Technical Editorial Team">

  <!-- Open Graph Meta Tags -->
  <meta property="og:title" content="C# switch స్టేట్‌మెంట్ & మోడ్రన్ switch ఎక్స్‌ప్రెషన్స్ — C# Masterclass">
  <meta property="og:description" content="C# లో Classic switch నుండి Modern Switch Expressions (=>) వరకు పూర్తి తెలుగు ప్రాక్టికల్ గైడ్.">
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="Mana Compiler">

  <!-- Canonical URL -->
  <link rel="canonical" href="https://www.ourcompiler.com/blog-csharp/06-csharp-switch-case-and-switch-expressions.html">

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
      <span>Chapter 06: switch స్టేట్‌మెంట్ &amp; expressions</span>
    </div>

    <!-- MAIN HEADING -->
    <h1 class="lesson-title">C# switch స్టేట్‌మెంట్ &amp; మోడ్రన్ switch ఎక్స్‌ప్రెషన్స్ (=>)</h1>

    <!-- LESSON META BADGES -->
    <div class="lesson-meta">
      <span class="meta-pill">⚡ Modern C# 12 / .NET 8 LTS</span>
      <span class="meta-pill">📖 Chapter 06 of 20</span>
      <span class="meta-pill">📁 Phase 02: కంట్రోల్ ఫ్లో &amp; లూప్స్</span>
      <span class="meta-pill">🎓 2026 Academic Edition</span>
    </div>

    <!-- COVERED TOPICS PILL BAR -->
    <div style="background:var(--bg2); border:1px solid var(--border); border-radius:10px; padding:12px 18px; margin:20px 0 28px; font-size:13.5px; color:var(--text2); line-height:1.6;">
      <strong style="color:#10b981;">📌 Covered in this chapter:</strong>
      Multi-Way Branching · Jump Table O(1) Architecture · Classic switch-case · Fall-Through Rules &amp; break · Modern C# 8+ Switch Expressions (=&gt;) · Discard Pattern (_) · Guard Conditions with when · Tuple Pattern Matching (Multiple Variables) · Positional &amp; Type Patterns · Exhaustiveness &amp; CS8509 Warning · Comparison Matrix Table · Real-World Project: Fintech Multi-Currency Payment Router Engine · 7 Common Beginner Mistakes · Self-Assessment Quiz
    </div>

    <!-- WARM IVORY INTRO BOX (EXACT C-STYLE) -->
    <div class="intro-box">
      <h3>స్వాగతం అధ్యాయం 06 కి! 🔀 బహుళ మార్గాల ఎంపిక &amp; మోడ్రన్ Switch ఎక్స్‌ప్రెషన్స్ పవర్</h3>
      <p>
        గత అధ్యాయంలో మనం <code>if-else</code> కండిషన్లను ఎలా వాడాలో నేర్చుకున్నాం. కానీ ఒక వేరియబుల్‌కు 10 లేదా 20 రకాల విభిన్న విలువలు వచ్చే అవకాశం ఉన్నప్పుడు (ఉదాహరణకు: వారంలో 7 రోజులు, ట్రాన్సాక్షన్ పేమెంట్ మోడ్‌లు: UPI, Card, NetBanking, Crypto, Wallet...), పొడవైన <code>if-else-if</code> లాడర్ రాయడం కోడ్‌ను విపరీతంగా పెంచేస్తుంది మరియు పనితీరును మందగింపజేస్తుంది.
      </p>
      <p>
        ఇలాంటి బహుళ ఎంపికల సమస్యలకు అసలైన పరిష్కారం <strong><code>switch</code> స్టేట్‌మెంట్</strong>. సాంప్రదాయ C# లో <code>switch-case</code> బ్రేక్‌లతో కూడిన నిర్మాణం ఉండేది. కానీ <strong>C# 8.0 లో వచ్చిన Switch Expressions (<code>=&gt;</code>)</strong> ప్రోగ్రామింగ్ ప్రపంచంలో ఒక అద్భుతం! 20 లైన్ల పెద్ద స్విచ్ బ్లాక్‌ను కేవలం 4 లైన్లలో, ఎంతో అందంగా, లాంబ్డా ఎక్స్‌ప్రెషన్ తరహాలో మార్చే శక్తిని ఇది అందించింది.
      </p>
      <p>
        ఈ సమగ్ర 6వ అధ్యాయంలో మనం కంపైలర్ ఇంటర్నల్ <em>జంప్ టేబుల్ (Jump Table)</em> ఆర్కిటెక్చర్, సాంప్రదాయ స్విచ్ నియమాలు, మోడ్రన్ స్విచ్ ఎక్స్‌ప్రెషన్స్, <code>when</code> గార్డ్ కండిషన్లు, మరియు బహుళ వేరియబుల్స్‌ను ఏకకాలంలో పరీక్షించే <em>Tuple Patterns</em> ను లోతుగా నేర్చుకొని — ఒక రియల్-వరల్డ్ ఫిన్‌టెక్ పేమెంట్ రూటింగ్ ఇంజిన్‌ను నిర్మిస్తాం!
      </p>
    </div>

    <!-- SECTION 1 -->
    <section>
      <h2 class="section-title"><span class="num">1</span> 🔀 బహుళ మార్గాల ఎంపిక: if-else-if వర్సెస్ switch ఆర్కిటెక్చర్</h2>
      <p>
        సాధారణంగా ఒక నిర్ణయం తీసుకోవడానికి <code>if-else-if</code> వాడినప్పుడు, CPU ప్రతి ఒక్క కండిషన్‌ను క్రమపద్ధతిలో పై నుండి క్రిందికి వరుసగా టెస్ట్ చేస్తుంది (Linear Search - \(O(N)\) Time Complexity). ఉదాహరణకు 10వ కండిషన్ ట్రూ అయితే, మొదటి 9 కండిషన్లను అనవసరంగా చెక్ చేయాల్సి వస్తుంది.
      </p>
      <p>
        కానీ <code>switch</code> స్టేట్‌మెంట్‌లో కంపైలర్ ఒక అద్భుతమైన ఆప్టిమైజేషన్ చేస్తుంది: <strong>జంప్ టేబుల్ (Jump Table / Lookup Table)</strong>!
      </p>

      <div style="background:var(--bg3); border-left:4px solid #10b981; padding:16px 20px; border-radius:0 8px 8px 0; margin:20px 0;">
        <strong style="color:var(--text); font-size:15px;">🧠 అండర్ ది హుడ్: Jump Table ఎలా పనిచేస్తుంది? (\(O(1)\) మెరుపు వేగం)</strong>
        <p style="margin:8px 0 0; color:var(--text2); font-size:14.5px;">
          మీరు ఒకే పూర్ణాంకం లేదా ఎన్యూమ్ (Enum) పై 5 కంటే ఎక్కువ కేస్‌లు రాసినప్పుడు, C# JIT కంపైలర్ ఒక ఇండెక్స్డ్ మెమరీ అడ్రస్ అర్రే (Jump Table) ను సృష్టిస్తుంది. CPU నేరుగా కేస్ విలువ ఆధారంగా సంబంధిత మెమరీ లొకేషన్‌కు ఒక్క క్లాక్ సైకిల్‌లోనే దూకుతుంది (Direct Branching)! అంటే 5 కేస్‌లు ఉన్నా, 100 కేస్‌లు ఉన్నా ఎగ్జిక్యూషన్ సమయం ఒక్కటే (\(O(1)\) Constant Time).
        </p>
      </div>
    </section>

    <!-- SECTION 2 -->
    <section>
      <h2 class="section-title"><span class="num">2</span> 🏛️ సాంప్రదాయ C# switch-case స్టేట్‌మెంట్ &amp; Fall-Through రూల్స్</h2>
      <p>
        C, C++ లలో ఒక కేస్ చివర <code>break</code> రాయకపోతే కోడ్ దానంతట అదే క్రింది కేస్‌లోకి జారిపోతుంది (Fall-through). దీనివల్ల చరిత్రలో ఎన్నో ఘోరమైన సాఫ్ట్‌వేర్ బగ్స్ వచ్చాయి. అందుకే C# డిజైనర్లు దీనిపై కఠినమైన నిబంధన విధించారు: <strong>C# లో ప్రతి కేస్ బ్లాక్ చివర తప్పనిసరిగా <code>break</code>, <code>return</code> లేదా <code>throw</code> ఉండాలి!</strong>
      </p>

      <div class="code-block">
        <div class="code-block-header">
          <span>csharp · Classic switch-case Statement</span>
          <div class="code-actions">
            <button class="copy-btn" onclick="copyCode(this)">Copy</button>
            <button class="try-btn" onclick="runCode(this)">Run</button>
          </div>
        </div>
        <pre><code class="language-csharp">int dayNumber = 3;
string dayName;

switch (dayNumber)
{
    case 1:
        dayName = "ఆదివారం (Sunday)";
        break;
    case 2:
        dayName = "సోమవారం (Monday)";
        break;
    case 3:
        dayName = "మంగళవారం (Tuesday)";
        break;
    case 4:
        dayName = "బుధవారం (Wednesday)";
        break;
    case 5:
        dayName = "గురువారం (Thursday)";
        break;
    case 6:
        dayName = "శుక్రవారం (Friday)";
        break;
    case 7:
        dayName = "శనివారం (Saturday)";
        break;
    default:
        dayName = "చెల్లని రోజు సంఖ్య";
        break;
}

Console.WriteLine($"రోజు: {dayName}");</code></pre>
      </div>

      <h3 style="font-size:17px; margin-top:24px; color:var(--text);">మల్టిపుల్ లేబుల్స్ గ్రూపింగ్ (Multiple Case Labels):</h3>
      <p>
        కోడ్ లేకుండా కేవలం కేస్ లేబుల్స్ ఒకదాని క్రింద ఒకటి పెడితే C# అనుమతిస్తుంది. బహుళ ఇన్‌పుట్‌లకు ఒకే చర్య అవసరమైనప్పుడు ఇది ఎంతో ఉపయోగపడుతుంది:
      </p>

      <div class="code-block">
        <div class="code-block-header">
          <span>csharp · Grouped Case Labels</span>
          <div class="code-actions">
            <button class="copy-btn" onclick="copyCode(this)">Copy</button>
            <button class="try-btn" onclick="runCode(this)">Run</button>
          </div>
        </div>
        <pre><code class="language-csharp">char grade = 'B';

switch (char.ToUpper(grade))
{
    case 'A':
    case 'B':
    case 'C':
        Console.WriteLine("🎉 మీరు పరీక్షలో ఉత్తీర్ణులయ్యారు (Passed)!");
        break;
    case 'D':
    case 'F':
        Console.WriteLine("అనుత్తీర్ణులు (Failed). మళ్లీ ప్రయత్నించండి.");
        break;
    default:
        Console.WriteLine("చెల్లని గ్రేడ్ అక్షరం.");
        break;
}</code></pre>
      </div>
    </section>

    <!-- SECTION 3 -->
    <section>
      <h2 class="section-title"><span class="num">3</span> 🚀 గోల్డెన్ ఎరా: మోడ్రన్ C# 8+ switch ఎక్స్‌ప్రెషన్స్ (=>)</h2>
      <p>
        పాత <code>switch</code> స్టేట్‌మెంట్‌లో పదే పదే <code>case</code>, <code>:</code>, <code>break;</code> రాయడం చాలా శ్రమతో కూడుకున్నది. C# 8.0 లో మైక్రోసాఫ్ట్ <strong>Switch Expression</strong> ను పరిచయం చేసింది.
      </p>
      <p>
        ఇది ఒక స్టేట్‌మెంట్ (చర్య) కాదు, ఒక <strong>ఎక్స్‌ప్రెషన్ (విలువను రిటర్న్ చేసేది)</strong>! కాబట్టి దీని ఫలితాన్ని నేరుగా ఒక వేరియబుల్‌కు కేటాయించవచ్చు:
      </p>

      <div class="code-block">
        <div class="code-block-header">
          <span>csharp · Modern Switch Expression (Clean &amp; Elegant)</span>
          <div class="code-actions">
            <button class="copy-btn" onclick="copyCode(this)">Copy</button>
            <button class="try-btn" onclick="runCode(this)">Run</button>
          </div>
        </div>
        <pre><code class="language-csharp">int monthNumber = 4;

// మోడ్రన్ C# Fat-Arrow (=&gt;) Switch Expression
string season = monthNumber switch
{
    12 or 1 or 2  =&gt; "శీతాకాలం (Winter)",
    3 or 4 or 5   =&gt; "వేసవికాలం (Summer)",
    6 or 7 or 8   =&gt; "వర్షాకాలం (Monsoon)",
    9 or 10 or 11 =&gt; "శరదృతువు (Autumn)",
    _             =&gt; "చెల్లని నెల సంఖ్య"
};

Console.WriteLine($"నెల {monthNumber} సీజన్: {season}");</code></pre>
      </div>
      <p>
        <strong>గమనించండి:</strong> ఇక్కడ <code>case</code> లేదు, <code>break</code> లేదు, కోలన్లు లేవు! వేరియబుల్ పేరు ముందు వస్తుంది (<code>monthNumber switch</code>), మరియు ప్రతి ఎంపిక కామా (<code>,</code>) తో వేరు చేయబడుతుంది.
      </p>
    </section>

    <!-- SECTION 4 -->
    <section>
      <h2 class="section-title"><span class="num">4</span> 🎭 డిస్కార్డ్ ప్యాటర్న్ (_) — ది అల్టిమేట్ డీఫాల్ట్</h2>
      <p>
        సాంప్రదాయ స్విచ్‌లో <code>default:</code> అని రాసినట్లే, మోడ్రన్ స్విచ్ ఎక్స్‌ప్రెషన్‌లో <strong>అండర్‌స్కోర్ (<code>_</code>)</strong> ని ఉపయోగిస్తారు. దీనిని <strong>డిస్కార్డ్ ప్యాటర్న్ (Discard Pattern)</strong> అంటారు.
      </p>
      <p>
        దీని అర్థం: "పైన పేర్కొన్న ఏ ఒక్క కేస్ కూడా మ్యాచ్ కాకపోతే, మిగిలిన ఏ విలువ వచ్చినా సరే ఇక్కడకు రానివ్వు" అని.
      </p>
      <div style="background:var(--bg3); border-left:4px solid #f59e0b; padding:16px 20px; border-radius:0 8px 8px 0; margin:20px 0;">
        <strong style="color:#d97706; font-size:15px;">⚠️ డిస్కార్డ్ (_) ఎల్లప్పుడూ ఆఖరునే ఉండాలి!</strong>
        <p style="margin:8px 0 0; color:var(--text2); font-size:14px;">
          మీరు ఒకవేళ <code>_ =&gt; ...</code> ని మధ్యలోనే రాస్తే, దాని క్రింద ఉన్న ఏ కేస్ కూడా ఎగ్జిక్యూట్ కాదు (Unreachable Code). కంపైలర్ ఎర్రర్ ఇస్తుంది.
        </p>
      </div>
    </section>

    <!-- SECTION 5 -->
    <section>
      <h2 class="section-title"><span class="num">5</span> 🛡️ గార్డ్ షరతులు: when క్లాజ్ (Case Guard Conditions)</h2>
      <p>
        ఒక కేస్ కేవలం సమానత్వాన్ని (Equality) మాత్రమే కాకుండా, అదనపు షరతులను కూడా సంతృప్తి పరచాల్సి వచ్చినప్పుడు <strong><code>when</code></strong> క్లాజ్ అద్భుతంగా పనిచేస్తుంది.
      </p>

      <div class="code-block">
        <div class="code-block-header">
          <span>csharp · when Clause in Switch</span>
          <div class="code-actions">
            <button class="copy-btn" onclick="copyCode(this)">Copy</button>
            <button class="try-btn" onclick="runCode(this)">Run</button>
          </div>
        </div>
        <pre><code class="language-csharp">decimal transactionAmount = 150000m;
bool isVipCustomer = true;

// when క్లాజ్ తో డైనమిక్ వ్యాపార నిబంధనలు
string approvalAction = transactionAmount switch
{
    &lt;= 50000m                               =&gt; "ఆటోమేటిక్ గా ఆమోదించబడింది",
    &gt; 50000m and &lt;= 200000m when isVipCustomer =&gt; "VIP ప్రివిలేజ్: ప్రత్యేక రుసుము లేకుండా ఆమోదం",
    &gt; 50000m and &lt;= 200000m                  =&gt; "OTP మరియు మేనేజర్ ధృవీకరణ అవసరం",
    _                                       =&gt; "రిస్క్ అలర్ట్: ఫ్రాడ్ విభాగం మాన్యువల్ రివ్యూ"
};

Console.WriteLine($"లావాదేవీ నిర్ణయం: {approvalAction}");</code></pre>
      </div>
    </section>

    <!-- SECTION 6 -->
    <section>
      <h2 class="section-title"><span class="num">6</span> 📦 టూపుల్ ప్యాటర్న్స్ (Tuple Pattern Matching in Switch)</h2>
      <p>
        నిజ జీవితంలో ఒక నిర్ణయం ఒకే వేరియబుల్ పై ఆధారపడి ఉండదు. రెండు లేదా అంతకంటే ఎక్కువ వేరియబుల్స్ కలయిక (State Combinations) ఆధారంగా నిర్ణయం తీసుకోవాల్సి వస్తుంది.
      </p>
      <p>
        C# లో <strong>Tuple Pattern <code>(var1, var2) switch { ... }</code></strong> ద్వారా బహుళ విలువలను బ్రాకెట్లలో పెట్టి ఒకేసారి స్విచ్ చేయవచ్చు!
      </p>

      <div class="code-block">
        <div class="code-block-header">
          <span>csharp · Multi-Variable Tuple Matching</span>
          <div class="code-actions">
            <button class="copy-btn" onclick="copyCode(this)">Copy</button>
            <button class="try-btn" onclick="runCode(this)">Run</button>
          </div>
        </div>
        <pre><code class="language-csharp">string userRole = "Admin";
string requestedAction = "DELETE";

// టూపుల్ ప్యాటర్న్: యూజర్ హోదా మరియు కోరిన చర్య రెండింటినీ ఏకకాలంలో పరీక్షించడం
string accessResult = (userRole, requestedAction) switch
{
    ("Admin", _)          =&gt; "పూర్తి అనుమతి లభించింది (Full Admin Access)",
    ("Editor", "WRITE")   =&gt; "రాయడానికి అనుమతి ఉంది (Write Approved)",
    ("Editor", "DELETE")  =&gt; "తిరస్కరించబడింది: ఎడిటర్లు డేటాను తొలగించలేరు",
    ("Viewer", "READ")    =&gt; "చదవడానికి అనుమతి ఉంది (Read-Only)",
    (_, _)                =&gt; "యాక్సెస్ తిరస్కరించబడింది (Unauthorized Access)"
};

Console.WriteLine($"సెక్యూరిటీ గేట్ రిజల్ట్: {accessResult}");</code></pre>
      </div>
      <p>
        సాంప్రదాయ <code>if-else</code> లో అయితే దీనికి సంక్లిష్టమైన నెస్టెడ్ లాజిక్ రాయాల్సి వచ్చేది. టూపుల్ ప్యాటర్న్ ద్వారా ఇది ఒక స్టేట్ మెషిన్ (State Machine Matrix) లాగా స్పష్టంగా కనిపిస్తుంది.
      </p>
    </section>

    <!-- SECTION 7 -->
    <section>
      <h2 class="section-title"><span class="num">7</span> 🔍 టైప్ &amp; పొజిషనల్ ప్యాటర్న్స్ (Type Patterns in Switch)</h2>
      <p>
        స్విచ్ ఎక్స్‌ప్రెషన్ ఏదైనా సాధారణ ఆబ్జెక్ట్ (<code>object</code>) ను స్వీకరించి, దాని రన్-టైమ్ టైప్ ఆధారంగా విభిన్న పనులను చేయగలదు.
      </p>

      <div class="code-block">
        <div class="code-block-header">
          <span>csharp · Type Matching in Switch Expression</span>
          <div class="code-actions">
            <button class="copy-btn" onclick="copyCode(this)">Copy</button>
            <button class="try-btn" onclick="runCode(this)">Run</button>
          </div>
        </div>
        <pre><code class="language-csharp">object payload = 450.75m; // డెసిమల్ డబ్బు లేదా పూర్ణాంకం లేదా టెక్స్ట్ కావచ్చు

string message = payload switch
{
    int intVal       =&gt; $"పూర్ణాంక సంఖ్య: {intVal} (Hex: 0x{intVal:X})",
    decimal decVal   =&gt; $"కరెన్సీ మొత్తం: ₹{decVal:N2}",
    string str       =&gt; $"టెక్స్ట్ సందేశం: {str.Trim()}",
    null             =&gt; "డేటా శూన్యంగా ఉంది (Null Payload)",
    _                =&gt; "గుర్తించబడని డేటా రకం"
};

Console.WriteLine(message);</code></pre>
      </div>
    </section>

    <!-- SECTION 8 -->
    <section>
      <h2 class="section-title"><span class="num">8</span> ⚡ ఎగ్జాస్టివ్ స్విచ్ చెకింగ్ &amp; CS8509 Warning</h2>
      <p>
        ఒక ఎన్యూమ్ (Enum) లేదా రకాలపై స్విచ్ రాస్తున్నప్పుడు, మీరు ఏదైనా ఒక కేస్ రాయడం మర్చిపోతే ఆధునిక C# కంపైలర్ మీకు <strong>CS8509 Warning</strong> ఇస్తుంది: <em>"The switch expression does not handle all possible inputs... It is not exhaustive."</em>
      </p>
      <p>
        ఒకవేళ రన్‌టైమ్‌లో మీరు హ్యాండిల్ చేయని అన్‌హ్యాండిల్డ్ విలువ వస్తే, C# సైలెంట్‌గా తప్పు విలువను ఇవ్వకుండా <strong><code>System.Runtime.CompilerServices.SwitchExpressionException</code></strong> ను త్రో చేసి మీ యాప్‌ను సురక్షితం చేస్తుంది.
      </p>
      <p>
        <strong>పరిష్కారం:</strong> ఎల్లప్పుడూ ఆఖరున ఒక డిస్కార్డ్ <code>_ =&gt; ...</code> ని ఉంచడం లేదా అన్ని ఎన్యూమ్ విలువలను స్పష్టంగా రాయడం తప్పనిసరి.
      </p>
    </section>

    <!-- SECTION 9 -->
    <section>
      <h2 class="section-title"><span class="num">9</span> 📊 తులనాత్మక పట్టిక: Classic switch Statement vs Modern switch Expression</h2>
      <p>
        ఈ రెండు విభిన్న రూపాల మధ్య సమగ్ర పోలిక:
      </p>

      <table class="tbl">
        <thead>
          <tr>
            <th>ఫీచర్ / కొలమానం</th>
            <th>సాంప్రదాయ switch Statement (C# 1 - 7)</th>
            <th>మోడ్రన్ switch Expression (C# 8 - 12)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>స్వభావం</strong></td>
            <td>Statement (కేవలం పనులు మాత్రమే చేస్తుంది)</td>
            <td><strong>Expression</strong> (విలువను రిటర్న్ చేస్తుంది)</td>
          </tr>
          <tr>
            <td><strong>సింటాక్స్ స్టైల్</strong></td>
            <td><code>switch (x) { case 1: ... break; }</code></td>
            <td><code>x switch { 1 =&gt; ..., _ =&gt; ... };</code></td>
          </tr>
          <tr>
            <td><strong>break కీవర్డ్</strong></td>
            <td>ప్రతి కేస్‌కు తప్పనిసరి</td>
            <td><strong>అసలు అవసరమే లేదు!</strong></td>
          </tr>
          <tr>
            <td><strong>డీఫాల్ట్ కేస్</strong></td>
            <td><code>default: ... break;</code></td>
            <td>డిస్కార్డ్ ఆపరేటర్ <code>_ =&gt; ...</code></td>
          </tr>
          <tr>
            <td><strong>టూపుల్ ప్యాటర్న్స్</strong></td>
            <td>చాలా కష్టంతో కూడుకున్నది</td>
            <td>సహజసిద్ధమైన మద్దతు <code>(a, b) switch</code></td>
          </tr>
          <tr>
            <td><strong>కోడ్ పొడవు</strong></td>
            <td>చాలా పెద్దది (అధిక బాయిలర్‌ప్లేట్)</td>
            <td><strong>70% తక్కువ లైన్లలో ముగుస్తుంది</strong></td>
          </tr>
          <tr>
            <td><strong>ఎగ్జాస్టివ్‌నెస్</strong></td>
            <td>కంపైలర్ హెచ్చరించదు</td>
            <td>పూర్తిగా కవర్ కాకపోతే కంపైలర్ వార్నింగ్ ఇస్తుంది</td>
          </tr>
        </tbody>
      </table>
    </section>

    <!-- SECTION 10 -->
    <section>
      <h2 class="section-title"><span class="num">10</span> 🚦 అడ్వాన్స్‌డ్ ప్యాటర్న్ కాంబినేషన్స్ (Relational &amp; Logical inside Switch)</h2>
      <p>
        మోడ్రన్ C# లో స్విచ్ ఎక్స్‌ప్రెషన్స్ లోపల రిలేషనల్ ఆపరేటర్లు (<code>&lt;</code>, <code>&gt;=</code>) మరియు లాజికల్ పదాలు (<code>and</code>, <code>or</code>, <code>not</code>) ను ఒకేచోట మిళితం చేయవచ్చు:
      </p>

      <div class="code-block">
        <div class="code-block-header">
          <span>csharp · Relational Range Expressions</span>
          <div class="code-actions">
            <button class="copy-btn" onclick="copyCode(this)">Copy</button>
            <button class="try-btn" onclick="runCode(this)">Run</button>
          </div>
        </div>
        <pre><code class="language-csharp">int airQualityIndex = 145; // AQI కాలుష్య సూచిక

string airStatus = airQualityIndex switch
{
    &lt;= 50               =&gt; "మంచిది (Good - స్వచ్ఛమైన గాలి)",
    &gt; 50 and &lt;= 100     =&gt; "సంతృప్తికరమైనది (Satisfactory)",
    &gt; 100 and &lt;= 200    =&gt; "మధ్యస్థ కాలుష్యం (Moderate - సున్నిత వ్యక్తులకు హానికరం)",
    &gt; 200 and &lt;= 300    =&gt; "ప్రమాదకరం (Poor)",
    &gt; 300 and &lt;= 500    =&gt; "తీవ్ర ప్రమాదకరం (Severe - మాస్క్ తప్పనిసరి)",
    _                   =&gt; "అసాధారణ రీడింగ్ (సెన్సార్ తనిఖీ చేయండి)"
};

Console.WriteLine($"గాలి నాణ్యత: {airStatus}");</code></pre>
      </div>
    </section>

    <!-- SECTION 11 -->
    <section>
      <h2 class="section-title"><span class="num">11</span> 🚀 రియల్-వరల్డ్ ప్రాజెక్ట్: "Fintech Multi-Currency Payment Router Engine"</h2>
      <p>
        ఈ అధ్యాయంలో నేర్చుకున్న స్విచ్ ఎక్స్‌ప్రెషన్స్, టూపుల్ ప్యాటర్న్స్, <code>when</code> క్లాజెస్‌లు ఉపయోగించి — ఒక ప్రొడక్షన్ గ్రేడ్ <strong>ఫిన్‌టెక్ మల్టీ-కరెన్సీ పేమెంట్ గేట్‌వే రూటింగ్ &amp; ప్రాసెసింగ్ ఇంజిన్</strong> ను తయారు చేద్దాం!
      </p>

      <div class="code-block">
        <div class="code-block-header">
          <span>csharp · Fintech Payment Router Console Project</span>
          <div class="code-actions">
            <button class="copy-btn" onclick="copyCode(this)">Copy</button>
            <button class="try-btn" onclick="runCode(this)">Run</button>
          </div>
        </div>
        <pre><code class="language-csharp">using System;

Console.OutputEncoding = System.Text.Encoding.UTF8;
Console.WriteLine("=================================================");
Console.WriteLine("💳 మన ఫిన్‌టెక్ - గ్లోబల్ పేమెంట్ గేట్‌వే రూటర్ v1.0");
Console.WriteLine("=================================================\\n");

// లావాదేవీ సమాచారం (Transaction Context)
string paymentMethod = "CREDIT_CARD"; // UPI, CREDIT_CARD, NET_BANKING, CRYPTO
string currency = "INR";              // INR, USD, EUR
decimal amount = 25000.00m;
bool isInternational = false;

// 1. గేట్‌వే రూటింగ్ నిర్ణయం (టూపుల్ స్విచ్ ఎక్స్‌ప్రెషన్)
string targetGateway = (paymentMethod, currency, isInternational) switch
{
    ("UPI", "INR", false)                      =&gt; "NPCI-UPI Instant Switch (0% MDR)",
    ("CREDIT_CARD", "INR", false)              =&gt; "HDFC / Razorpay Domestic Gateway",
    ("CREDIT_CARD", _, true)                   =&gt; "Stripe International Multi-Currency Gateway",
    ("NET_BANKING", "INR", false)              =&gt; "Direct Bank IMPS/NEFT Engine",
    ("CRYPTO", _, _) when amount &gt;= 100000m    =&gt; "Coinbase Enterprise Custody Router",
    ("CRYPTO", _, _)                           =&gt; "Binance Smart Liquidity Pool",
    _                                          =&gt; "Standard Fallback Gateway"
};

// 2. గేట్‌వే ప్రాసెసింగ్ ఫీజు లెక్కింపు (when క్లాజ్ తో కూడిన స్విచ్)
decimal processingFeePercent = paymentMethod switch
{
    "UPI"                                              =&gt; 0.0m,    // ఉచితం
    "CREDIT_CARD" when isInternational                 =&gt; 3.5m,    // విదేశీ కార్డులకు 3.5%
    "CREDIT_CARD"                                      =&gt; 1.75m,   // స్వదేశీ కార్డులకు 1.75%
    "NET_BANKING" when amount &gt; 10000m                 =&gt; 0.5m,
    "NET_BANKING"                                      =&gt; 0.0m,
    "CRYPTO"                                           =&gt; 1.0m,
    _                                                  =&gt; 2.0m
};

decimal feeAmount = amount * (processingFeePercent / 100m);
decimal finalPayableAmount = amount + feeAmount;

// 3. లావాదేవీ ముగింపు స్టేటస్ మెసేజ్
string statusMessage = targetGateway switch
{
    var gw when gw.Contains("NPCI-UPI")   =&gt; "⚡ క్షణాల్లో పూర్తవుతుంది (Realtime Settlement)",
    var gw when gw.Contains("Stripe")     =&gt; "🌍 విదేశీ మారక ద్రవ్యం వర్తిస్తుంది (Forex Applied)",
    var gw when gw.Contains("Enterprise") =&gt; "🔐 మల్టీ-సిగ్నేచర్ ఎన్‌క్రిప్షన్ అవసరం",
    _                                     =&gt; "ప్రామాణిక బ్యాంకింగ్ సెటిల్‌మెంట్ (T+1 Day)"
};

// 4. అధికారిక ట్రాన్సాక్షన్ రసీదు
Console.WriteLine("=================================================");
Console.WriteLine("              లావాదేవీ రూటింగ్ రసీదు               ");
Console.WriteLine("=================================================");
Console.WriteLine($"చెల్లింపు విధానం: {paymentMethod}");
Console.WriteLine($"కరెన్సీ రకం    : {currency} (అంతర్జాతీయ: {(isInternational ? "అవును" : "కాదు")})");
Console.WriteLine($"అసలు మొత్తం    : ₹{amount:N2}");
Console.WriteLine($"ఎంపికైన గేట్‌వే: {targetGateway}");
Console.WriteLine($"గేట్‌వే ఫీజు   : {processingFeePercent}% (+₹{feeAmount:N2})");
Console.WriteLine("-------------------------------------------------");
Console.ForegroundColor = ConsoleColor.Green;
Console.WriteLine($"మొత్తం చెల్లించాల్సింది: ₹{finalPayableAmount:N2}");
Console.ResetColor();
Console.WriteLine($"స్థితి సందేశం  : {statusMessage}");
Console.WriteLine("=================================================\\n");</code></pre>
      </div>

      <!-- TRY BOX COMPONENT -->
      <div class="try-box">
        <div class="try-title">🧪 లైవ్ కంపైలర్‌లో ఈ పేమెంట్ రూటర్‌ను పరీక్షించండి!</div>
        <p>
          పేమెంట్ మెథడ్ (UPI, CREDIT_CARD, CRYPTO) మరియు కరెన్సీలను మార్చి గేట్‌వే రూటింగ్, ఫీజు శాతం ఎలా డైనమిక్‌గా మారుతున్నాయో బ్రౌజర్ ఎడిటర్‌లో లైవ్‌గా చూడండి!
        </p>
        <button class="run-btn" onclick="openInteractiveCompiler()">
          ▶ Open C# Online Compiler with this Project
        </button>
      </div>
    </section>

    <!-- SECTION 12 -->
    <section>
      <h2 class="section-title"><span class="num">12</span> 🛑 బిగినర్స్ చేసే 7 ఘోరమైన స్విచ్ తప్పులు</h2>
      <p>
        స్విచ్ స్టేట్‌మెంట్లతో పనిచేసేటప్పుడు జూనియర్ డెవలపర్లు ఎదుర్కొనే 7 ప్రమాదాలు:
      </p>

      <div style="display:grid; grid-template-columns:1fr; gap:16px; margin:24px 0;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #ef4444; border-radius:8px; padding:14px 18px;">
          <strong style="color:#ef4444;">1. పాత switch లో break మర్చిపోవడం:</strong>
          <p style="margin:6px 0 0; color:var(--text2); font-size:14px;">
            C# లో ఒక కేస్ లో కోడ్ రాసి <code>break</code> రాయకపోతే కంపైలర్ ఎర్రర్ (CS0163) ఇస్తుంది. Fall-through కి అనుమతి లేదు.
          </p>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #ef4444; border-radius:8px; padding:14px 18px;">
          <strong style="color:#ef4444;">2. Switch Expression చివర సెమీకోలన్ (;) మర్చిపోవడం:</strong>
          <p style="margin:6px 0 0; color:var(--text2); font-size:14px;">
            సాధారణ స్విచ్ బ్లాక్ కి సెమీకోలన్ అక్కర్లేదు, కానీ <code>var result = x switch { ... };</code> అనేది ఒక అసైన్‌మెంట్ స్టేట్‌మెంట్ కాబట్టి ఆఖరున తప్పనిసరిగా సెమీకోలన్ ఉండాలి.
          </p>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #ef4444; border-radius:8px; padding:14px 18px;">
          <strong style="color:#ef4444;">3. డిస్కార్డ్ (_) ని మిడిల్ లో ఉంచడం:</strong>
          <p style="margin:6px 0 0; color:var(--text2); font-size:14px;">
            డిస్కార్డ్ అన్నింటినీ క్యాచ్ చేస్తుంది కాబట్టి, దాని క్రింద ఉన్న కేస్‌లు ఎప్పటికీ ఎగ్జిక్యూట్ కావు. డిస్కార్డ్ ఎప్పుడూ ఆఖరు లైన్‌లోనే ఉండాలి.
          </p>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #ef4444; border-radius:8px; padding:14px 18px;">
          <strong style="color:#ef4444;">4. SwitchExpressionException ముప్పును విస్మరించడం:</strong>
          <p style="margin:6px 0 0; color:var(--text2); font-size:14px;">
            డిస్కార్డ్ లేకుండా స్విచ్ ఎక్స్‌ప్రెషన్ రాస్తే, మ్యాచ్ కాని కొత్త విలువ వచ్చినప్పుడు రన్‌టైమ్ లో అప్లికేషన్ క్రాష్ అయిపోతుంది.
          </p>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #ef4444; border-radius:8px; padding:14px 18px;">
          <strong style="color:#ef4444;">5. when క్లాజ్ లో సైడ్ ఎఫెక్ట్స్ రాయడం:</strong>
          <p style="margin:6px 0 0; color:var(--text2); font-size:14px;">
            <code>when i++ &gt; 5</code> లాంటి మ్యుటేషన్లు రాయకూడదు. ప్యాటర్న్ మ్యాచింగ్ స్వచ్ఛమైన కండిషన్లను మాత్రమే కలిగి ఉండాలి.
          </p>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #ef4444; border-radius:8px; padding:14px 18px;">
          <strong style="color:#ef4444;">6. ఫ్లోటింగ్ పాయింట్ సంఖ్యలతో క్లాసిక్ స్విచ్ వాడటం:</strong>
          <p style="margin:6px 0 0; color:var(--text2); font-size:14px;">
            పాత <code>switch-case</code> లో డబుల్స్ పై సమానత్వం చెక్ చేయడం ప్రమాదకరం. మోడ్రన్ స్విచ్ లో రిలేషనల్ రేంజ్‌లను (<code>&gt;= 0.5 and &lt;= 1.0</code>) వాడాలి.
          </p>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #ef4444; border-radius:8px; padding:14px 18px;">
          <strong style="color:#ef4444;">7. టూపుల్ ఆర్డర్ తారుమారు చేయడం:</strong>
          <p style="margin:6px 0 0; color:var(--text2); font-size:14px;">
            <code>(role, day)</code> స్విచ్ చేసేటప్పుడు కేస్‌లో <code>("Monday", "Admin")</code> అని తిరగరాస్తే ఎప్పటికీ మ్యాచ్ కాదు! టూపుల్ ఆర్డర్ సమానంగా ఉండాలి.
          </p>
        </div>
      </div>
    </section>

    <!-- SECTION 13 -->
    <section>
      <h2 class="section-title"><span class="num">13</span> 🧠 ఇంటరాక్టివ్ సెల్ఫ్-అసెస్మెంట్ క్విజ్ (5 లోతైన ప్రాక్టికల్ ప్రశ్నలు &amp; వివరణలు)</h2>
      <p>
        స్విచ్ స్టేట్‌మెంట్లు మరియు మోడ్రన్ స్విచ్ ఎక్స్‌ప్రెషన్స్‌పై మీ నైపుణ్యాన్ని ఈ 5 ప్రశ్నలతో పరీక్షించుకోండి:
      </p>

      <!-- QUIZ 1 -->
      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:600; cursor:pointer; color:var(--text1);">
          ❓ ప్రశ్న 1: C# JIT కంపైలర్ స్విచ్ స్టేట్‌మెంట్‌ను Jump Table గా ఎప్పుడు ఆప్టిమైజ్ చేస్తుంది?
        </summary>
        <div style="margin-top:10px; font-size:14px; color:var(--text2); line-height:1.6;">
          <strong>సమాధానం:</strong> కంటిన్యూయస్ లేదా దగ్గరి సంఖ్యలతో కూడిన పూర్ణాంకాలు (int, byte, char, enum) పై తగినన్ని కేస్‌లు (సాధారణంగా 5 లేదా అంతకంటే ఎక్కువ) ఉన్నప్పుడు, JIT కంపైలర్ ఒక జంప్ టేబుల్‌ను నిర్మిస్తుంది. ఇది \(O(1)\) టైమ్‌లో నేరుగా బ్రాంచ్‌ను చేరుకుంటుంది.
        </div>
      </details>

      <!-- QUIZ 2 -->
      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:600; cursor:pointer; color:var(--text1);">
          ❓ ప్రశ్న 2: Switch Expression లో <code>_ =&gt; ...</code> లేకపోతే మరియు ఏ కేస్ మ్యాచ్ కాకపోతే ఏమి జరుగుతుంది?
        </summary>
        <div style="margin-top:10px; font-size:14px; color:var(--text2); line-height:1.6;">
          <strong>సమాధానం:</strong> రన్‌టైమ్‌లో <strong>System.Runtime.CompilerServices.SwitchExpressionException</strong> త్రో చేయబడి అప్లికేషన్ క్రాష్ అవుతుంది. కంపైల్ టైమ్‌లోనే దీనిని నివారించడానికి కంపైలర్ CS8509 వార్నింగ్ కూడా ఇస్తుంది.
        </div>
      </details>

      <!-- QUIZ 3 -->
      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:600; cursor:pointer; color:var(--text1);">
          ❓ ప్రశ్న 3: <code>case "Admin": case "SuperAdmin": doWork(); break;</code> అనేది C# లో అనుమతించబడుతుందా?
        </summary>
        <div style="margin-top:10px; font-size:14px; color:var(--text2); line-height:1.6;">
          <strong>సమాధానం:</strong> ఖచ్చితంగా అనుమతించబడుతుంది! ఒక కేస్ లేబుల్ క్రింద ఎటువంటి కోడ్ లేకపోతే (Empty case label), అది తర్వాతి కేస్‌తో గ్రూప్ అవుతుంది (Multiple Case Labels). కానీ మొదటి కేస్ లో కోడ్ రాసి బ్రేక్ రాయకపోతే మాత్రమే ఎర్రర్ వస్తుంది.
        </div>
      </details>

      <!-- QUIZ 4 -->
      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:600; cursor:pointer; color:var(--text1);">
          ❓ ప్రశ్న 4: Tuple Pattern Matching <code>(status, code) switch { ... }</code> యొక్క అతిపెద్ద లాభం ఏమిటి?
        </summary>
        <div style="margin-top:10px; font-size:14px; color:var(--text2); line-height:1.6;">
          <strong>సమాధానం:</strong> ఇది బహుళ వేరియబుల్స్ కలయికలను నెస్టెడ్ if-else లేకుండా, ఒకే ఫ్లాట్ డిసిషన్ మ్యాట్రిక్స్ లాగా స్పష్టంగా పరీక్షించడానికి వీలు కల్పిస్తుంది. కోడ్ చదవడం, మెయింటైన్ చేయడం అత్యంత సులభమవుతుంది.
        </div>
      </details>

      <!-- QUIZ 5 -->
      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:600; cursor:pointer; color:var(--text1);">
          ❓ ప్రశ్న 5: మోడ్రన్ Switch Expression లో <code>when</code> క్లాజ్ ను ఎందుకు ఉపయోగిస్తారు?
        </summary>
        <div style="margin-top:10px; font-size:14px; color:var(--text2); line-height:1.6;">
          <strong>సమాధానం:</strong> ఒక ప్యాటర్న్ మ్యాచ్ అయిన తర్వాత, అదనపు బూలియన్ షరతులను (Guard Conditions) తనిఖీ చేయడానికి <code>when</code> క్లాజ్ ఉపయోగపడుతుంది. ఆ షరతు కూడా నిజమైతేనే సంబంధిత బ్రాంచ్ ఎగ్జిక్యూట్ అవుతుంది.
        </div>
      </details>
    </section>

    <!-- CHAPTER NAVIGATION (PAGINATION) -->
    <div style="display:flex; justify-content:space-between; gap:16px; margin:40px 0 20px; flex-wrap:wrap;">
      <a href="/blog-csharp/05-csharp-conditional-statements-and-pattern-matching.html" style="display:inline-flex; align-items:center; gap:8px; padding:10px 18px; border-radius:8px; background:var(--bg3); border:1px solid var(--border); color:var(--text); text-decoration:none; font-weight:700; font-size:13.5px;">
        ← Previous: 05. కండిషనల్ స్టేట్‌మెంట్స్ &amp; Pattern Matching
      </a>
      <a href="/blog-csharp/07-csharp-loops-for-while-do-while-foreach.html" style="display:inline-flex; align-items:center; gap:8px; padding:10px 20px; border-radius:8px; background:linear-gradient(135deg, #10b981, #059669); color:#ffffff; text-decoration:none; font-weight:700; font-size:13.5px; box-shadow:0 2px 10px rgba(16,185,129,0.2);">
        Next: 07. లూప్స్ (for, while, do-while, foreach) →
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
Console.WriteLine("💳 మన ఫిన్‌టెక్ - గ్లోబల్ పేమెంట్ గేట్‌వే రూటర్ v1.0");
Console.WriteLine("=================================================\\n");

string paymentMethod = "CREDIT_CARD";
string currency = "INR";
decimal amount = 25000.00m;
bool isInternational = false;

string targetGateway = (paymentMethod, currency, isInternational) switch
{
    ("UPI", "INR", false)                      => "NPCI-UPI Instant Switch (0% MDR)",
    ("CREDIT_CARD", "INR", false)              => "HDFC / Razorpay Domestic Gateway",
    ("CREDIT_CARD", _, true)                   => "Stripe International Multi-Currency Gateway",
    ("NET_BANKING", "INR", false)              => "Direct Bank IMPS/NEFT Engine",
    ("CRYPTO", _, _) when amount >= 100000m    => "Coinbase Enterprise Custody Router",
    ("CRYPTO", _, _)                           => "Binance Smart Liquidity Pool",
    _                                          => "Standard Fallback Gateway"
};

decimal processingFeePercent = paymentMethod switch
{
    "UPI"                                              => 0.0m,
    "CREDIT_CARD" when isInternational                 => 3.5m,
    "CREDIT_CARD"                                      => 1.75m,
    "NET_BANKING" when amount > 10000m                 => 0.5m,
    "NET_BANKING"                                      => 0.0m,
    "CRYPTO"                                           => 1.0m,
    _                                                  => 2.0m
};

decimal feeAmount = amount * (processingFeePercent / 100m);
decimal finalPayableAmount = amount + feeAmount;

Console.WriteLine("=================================================");
Console.WriteLine("              లావాదేవీ రూటింగ్ రసీదు               ");
Console.WriteLine("=================================================");
Console.WriteLine($"చెల్లింపు విధానం: {paymentMethod}");
Console.WriteLine($"అసలు మొత్తం    : ₹{amount:N2}");
Console.WriteLine($"ఎంపికైన గేట్‌వే: {targetGateway}");
Console.WriteLine($"గేట్‌వే ఫీజు   : {processingFeePercent}% (+₹{feeAmount:N2})");
Console.WriteLine("-------------------------------------------------");
Console.WriteLine($"మొత్తం చెల్లించాల్సింది: ₹{finalPayableAmount:N2}");
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

const outputPath = path.join(__dirname, '..', 'public', 'blog-csharp', '06-csharp-switch-case-and-switch-expressions.html');
fs.writeFileSync(outputPath, fullHtml, 'utf8');
console.log('✅ Successfully generated deep high-value C# Chapter 06!');
console.log('Target file size:', fullHtml.length, 'characters');
