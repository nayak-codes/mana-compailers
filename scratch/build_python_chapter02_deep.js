const fs = require('fs');
const path = require('path');
const { LESSONS, buildPythonSidebar } = require('./python_curriculum_data.js');

const currentLesson = LESSONS[1]; // Chapter 02
const sidebarHtml = buildPythonSidebar(2);

const chapter02Content = `<!DOCTYPE html>
<html class="light-theme" lang="te">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${currentLesson.title} — Python 3 Tutorial | Our Compiler</title>
  <meta name="description" content="Python 3 సింటాక్స్, ఇండెంటేషన్ & కామెంట్స్ సమగ్ర తెలుగు గైడ్: Python Indentation ఆర్కిటెక్చర్ (No Braces), 4-స్పేస్ రూల్, TabError నివారణ, లైన్ కంటిన్యూయేషన్, Docstrings, pass స్టేట్‌మెంట్ మరియు Payroll Tax Engine ప్రాజెక్ట్." />
  <meta name="keywords" content="python indentation in telugu, python syntax telugu, python comments telugu, python docstrings telugu, tab vs spaces python, pass statement python, learn python in telugu, our compiler" />
  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />
  <link rel="icon" type="image/png" href="/logo.png" />
  <link rel="canonical" href="https://www.ourcompiler.com/blog-python/${currentLesson.file}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Telugu:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;500;600;700&family=Sora:wght@400;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/blog-style.css" />
  <link rel="stylesheet" href="/blog-python/style.css" />
  <link rel="stylesheet" href="/site-nav.css" />

  <!-- Schema.org TechArticle Structured Data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": "${currentLesson.title} (Complete Guide to Python Syntax, Indentation Architecture and Comments in Telugu)",
    "description": "Python 3 సింటాక్స్, ఇండెంటేషన్ మరియు డాక్యుమెంటేషన్ పూర్తి గైడ్: 4-Spaces రూల్, TabError, Implicit Line Continuation, Docstrings, pass కీవర్డ్, మరియు Enterprise Payroll Engine.",
    "articleSection": "Phase 01: పైథాన్ ఫండమెంటల్స్ & బేసిక్స్",
    "inLanguage": "te",
    "author": {
      "@type": "Organization",
      "name": "Our Compiler Technical Editorial Team",
      "url": "https://www.ourcompiler.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Our Compiler",
      "url": "https://www.ourcompiler.com"
    },
    "datePublished": "2026-01-16",
    "dateModified": "2026-11-02"
  }
  </script>

  <!-- Interactive Scripts: Accordion, Syntax Highlighter & Compiler Integration -->
  <script>
    function toggleAccordion(btn) {
      const content = btn.nextElementSibling;
      const isOpen = content.classList.contains('open');
      if (isOpen) {
        content.classList.remove('open');
        btn.classList.remove('active');
      } else {
        content.classList.add('open');
        btn.classList.add('active');
      }
    }

    // Client-side Python Syntax Highlighter
    function highlightPythonCode(rawCode) {
      const tokens = [];
      const pushToken = (cls, text) => {
        const id = tokens.length;
        tokens.push('<span class="' + cls + '">' + text + '</span>');
        return '___PY_TOK_' + id + '___';
      };

      let code = rawCode.replace(/(#.*$)/gm, m => pushToken('cm', m));
      code = code.replace(/("""[\\s\\S]*?"""|'''[\\s\\S]*?'''|f?"[^"\\\\]*(?:\\\\.[^"\\\\]*)*"|f?'[^'\\\\]*(?:\\\\.[^'\\\\]*)*'|r"[^"\\\\]*(?:\\\\.[^"\\\\]*)*"|r'[^'\\\\]*(?:\\\\.[^'\\\\]*)*')/g, m => pushToken('st', m));

      const kwList = [
        'import','from','as','def','return','class','if','elif','else','while','for','in',
        'break','continue','pass','try','except','finally','with','lambda','global','nonlocal',
        'and','or','not','is','yield','async','await','raise','assert','True','False','None'
      ];
      const kwRegex = new RegExp('\\\\b(' + kwList.join('|') + ')\\\\b', 'g');
      code = code.replace(kwRegex, m => pushToken('kw', m));

      const fnList = [
        'print','len','range','type','isinstance','id','input','int','float','str','list',
        'dict','set','tuple','sum','min','max','round','map','zip','enumerate','sorted',
        'abs','open','help','dir','filter'
      ];
      const fnRegex = new RegExp('\\\\b(' + fnList.join('|') + ')\\\\b', 'g');
      code = code.replace(fnRegex, m => pushToken('fn', m));

      code = code.replace(/\\b(\\d+(?:\\.\\d+)?)\\b/g, m => pushToken('num', m));

      tokens.forEach((tok, idx) => {
        code = code.split('___PY_TOK_' + idx + '___').join(tok);
      });
      return code;
    }

    document.addEventListener('DOMContentLoaded', () => {
      document.querySelectorAll('pre code.language-python').forEach(block => {
        block.innerHTML = highlightPythonCode(block.innerText);
      });
    });

    function copyCode(btn) {
      const pre = btn.closest('.code-block').querySelector('pre code');
      if (!pre) return;
      navigator.clipboard.writeText(pre.innerText).then(() => {
        const orig = btn.innerText;
        btn.innerText = 'Copied!';
        setTimeout(() => btn.innerText = orig, 1800);
      });
    }

    function runCodeInCompiler(btn) {
      const pre = btn.closest('.code-block').querySelector('pre code');
      if (!pre) return;
      const code = pre.innerText;
      try {
        localStorage.setItem('code_python', code);
        localStorage.setItem('code_python3', code);
      } catch (e) {
        console.warn('LocalStorage error:', e);
      }
      window.open('/online-python-compiler.html', '_blank');
    }
  </script>
</head>

<body class="lang-python light-theme">
<div id="site-nav-placeholder"></div>

<div class="layout">
${sidebarHtml}

  <!-- MAIN CONTENT AREA -->
  <main class="content">

    <!-- BREADCRUMB -->
    <div class="breadcrumb">
      <a href="/">Home</a>
      <span class="sep">›</span>
      <a href="/blog.html">Tutorials</a>
      <span class="sep">›</span>
      <a href="/blog-python.html">Python Masterclass</a>
      <span class="sep">›</span>
      <span>Chapter 2: ${currentLesson.title}</span>
    </div>

    <!-- PAGE TITLE -->
    <h1 class="page-title">${currentLesson.title}</h1>

    <!-- PAGE META BADGES -->
    <div class="page-meta">
      <span class="badge badge-tech">🐍 Modern Python (Python 3.12+)</span>
      <span class="badge badge-chapter">🎯 Chapter 2 of 25</span>
      <span class="badge badge-phase">🚀 Phase 01: పైథాన్ ఫండమెంటల్స్ &amp; బేసిక్స్</span>
      <span class="badge badge-edition">📅 2026 Edition</span>
    </div>

    <!-- COVERED TOPICS PILL BAR -->
    <div style="background:var(--bg3); border:1px solid var(--border); border-radius:10px; padding:12px 18px; margin-bottom:24px; font-size:13px; line-height:1.7;">
      <span style="color:#10b981; font-weight:700;">📌 Covered in this chapter:</span>
      <span style="color:var(--text2); margin-left:6px;">
        Python Indentation ఆర్కిటెక్చర్ (No Braces!) · 4-స్పేస్ రూల్ (PEP 8) · Tabs vs Spaces &amp; TabError నివారణ · లైన్ కంటిన్యూయేషన్ (Implicit vs Explicit) · కామెంట్స్ (#) · డాక్‌స్ట్రింగ్స్ (Docstrings &amp; PEP 257) · pass &amp; Ellipsis (...) · Enterprise Payroll Tax Engine ప్రాజెక్ట్!
      </span>
    </div>

    <!-- INTRO BOX (Warm Soft Ivory HTML5 Style) -->
    <div class="intro-box">
      C, C++, Java లేదా JavaScript వంటి ఇతర సాంప్రదాయ భాషలను గమనిస్తే — కోడ్ బ్లాకులను నిర్వచించడానికి కర్లీ బ్రేసెస్ (<code>{}</code>) మరియు లైన్ చివర సెమికోలన్లు (<code>;</code>) వాడుతుంటారు. ఆ భాషల్లో ఇండెంటేషన్ (ఖాళీ స్థలాలు ఇవ్వడం) అనేది కేవలం కోడ్ అందంగా కనిపించడానికి మాత్రమే ఉపయోగపడుతుంది, కంపైలర్‌కు దాంతో పనిలేదు.
      కానీ <strong>పైథాన్ ఒక విప్లవాత్మక నిర్ణయం తీసుకుంది: ఖాళీ స్థలాలనే (Whitespace) సింటాక్స్‌గా మార్చింది!</strong>
      పైథాన్‌లో కర్లీ బ్రేసెస్ ఉండవు; మీరు ఇచ్చే ఇండెంటేషన్‌ను బట్టి ఏ కోడ్ ఏ బ్లాక్‌కు చెందుతుందో ఇంటర్‌ప్రీటర్ గుర్తిస్తుంది. ఈ రెండవ అధ్యాయంలో — ఇండెంటేషన్ అంతర్గత మెకానిక్స్, బిగినర్స్ ఎదుర్కొనే <code>TabError</code> మరియు <code>IndentationError</code> లను సమూలంగా నివారించడం, కోడ్ డాక్యుమెంటేషన్ కోసం <strong>Docstrings (PEP 257)</strong>, మరియు పూర్తి స్థాయి <strong>Enterprise Payroll &amp; Tax Calculation Engine</strong> ప్రాజెక్ట్ ద్వారా పూర్తి నైపుణ్యాన్ని సాధిద్దాం!
    </div>

    <!-- SECTION 1 -->
    <h2 class="section-title"><span class="num">1</span> పైథాన్ సింటాక్స్ దర్శనం: C/C++/Java లతో పోలిక (Python Syntax Philosophy)</h2>
    <p>
      పైథాన్ రూపకర్త గైడో వాన్ రోసమ్ ప్రధాన లక్ష్యం: <em>"కోడ్ రాసే సమయం కంటే, తోటి డెవలపర్లు ఆ కోడ్‌ను చదివి అర్థం చేసుకునే సమయమే 10 రెట్లు ఎక్కువ."</em>
      అందుకే ఇతర భాషల్లో కనిపించే అనవసరపు సంకేతాలన్నింటినీ పైథాన్ తొలగించింది:
    </p>

    <div class="tbl-wrap">
      <table class="tbl">
        <thead>
          <tr>
            <th>ఫీచర్</th>
            <th>C++ / Java శైలి (బోరింగ్ బాయిలర్‌ప్లేట్)</th>
            <th>Modern Python 3 శైలి (స్వచ్ఛమైన స్పష్టత)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>కోడ్ బ్లాక్స్</strong></td>
            <td>కర్లీ బ్రేసెస్ తప్పనిసరి: <code>{ ... }</code></td>
            <td>కోలన్ మరియు ఇండెంటేషన్: <code>:</code> ఆపై 4 స్పేస్‌లు!</td>
          </tr>
          <tr>
            <td><strong>స్టేట్‌మెంట్ ముగింపు</strong></td>
            <td>ప్రతి లైన్ చివర సెమికోలన్ తప్పనిసరి: <code>;</code></td>
            <td>కేవలం కొత్త లైన్ (Newline) సరిపోతుంది! సెమికోలన్ అవసరం లేదు.</td>
          </tr>
          <tr>
            <td><strong>కండిషన్ బ్రాకెట్లు</strong></td>
            <td><code>if (x &gt; 10) { ... }</code></td>
            <td><code>if x &gt; 10:</code> (అనవసరపు రౌండ్ బ్రాకెట్లు లేవు)</td>
          </tr>
          <tr>
            <td><strong>టైప్ డిక్లరేషన్</strong></td>
            <td><code>int score = 95;</code></td>
            <td><code>score = 95</code> (డైనమిక్ టైప్ ఇన్ఫరెన్స్)</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- SECTION 2 -->
    <h2 class="section-title"><span class="num">2</span> ఇండెంటేషన్ అంటే ఏమిటి? (What is Indentation &amp; Block Scope)</h2>
    <p>
      ఒక లైన్ ప్రారంభంలో విడిచిపెట్టే ఖాళీ స్థలాన్ని (Leading Whitespace) <strong>ఇండెంటేషన్ (Indentation)</strong> అంటారు.
      పైథాన్‌లో ఒక ఫంక్షన్, <code>if</code> కండిషన్, లేదా లూప్ ప్రారంభమైనప్పుడు చివర ఒక కోలన్ (<code>:</code>) ఉంచుతాం. ఆ కోలన్ తర్వాత వచ్చే లైన్లన్నీ లోపలికి జరుగుతాయి.
      ఎంతవరకు అయితే ఆ ఇండెంటేషన్ స్థిరంగా కొనసాగుతుందో, అంతవరకు ఆ కోడ్ అదే బ్లాక్ కింద లెక్కించబడుతుంది!
    </p>

    <!-- ARCHITECTURE DIAGRAM: INDENTATION LEVELS -->
    <div style="background:#0f172a; border:1px solid #1e293b; border-radius:10px; padding:20px; margin:20px 0; color:#e2e8f0; font-family:'JetBrains Mono', monospace; font-size:13px; overflow-x:auto;">
<span style="color:#38bdf8; font-weight:700;">[పైథాన్ ఇండెంటేషన్ లెవల్స్ &amp; స్కోప్ ఆర్కిటెక్చర్]</span>

Level 0 (గ్లోబల్ స్కోప్ - జీరో స్పేసెస్):
│
├── def process_salary(basic_pay):
│   │
│   ├── Level 1 (ఫంక్షన్ బాడీ - 4 స్పేసెస్):
│   │   bonus = 0
│   │   if basic_pay &gt; 50000:
│   │   │
│   │   ├── Level 2 (if బ్లాక్ బాడీ - 8 స్పేసెస్):
│   │   │   bonus = basic_pay * 0.10
│   │   │   print("అర్హత: సీనియర్ ఎగ్జిక్యూటివ్ బోనస్")
│   │   │
│   │   else:
│   │   │
│   │   ├── Level 2 (else బ్లాక్ బాడీ - 8 స్పేసెస్):
│   │   │   bonus = 2000
│   │   │   print("అర్హత: ప్రామాణిక అలవెన్స్")
│   │   │
│   │   └── return basic_pay + bonus  &lt;-- (తిరిగి Level 1 కి అన్-ఇండెంట్ అయ్యింది!)
│
└── print("జీతం లెక్కింపు పూర్తయింది.")  &lt;-- (తిరిగి Level 0 కి అన్-ఇండెంట్ అయ్యింది!)
    </div>

    <!-- SECTION 3 -->
    <h2 class="section-title"><span class="num">3</span> ది గోల్డెన్ 4-స్పేస్ రూల్ (The Golden 4-Space Standard in PEP 8)</h2>
    <p>
      పైథాన్ కంపైలర్ మీరు 2 స్పేస్‌లు వాడినా లేదా 6 స్పేస్‌లు వాడినా (బ్లాక్ అంతటా స్థిరంగా ఉంటే) అంగీకరిస్తుంది. కానీ అధికారిక <strong>PEP 8 స్టైల్ గైడ్ ప్రకారం: ప్రతి ఇండెంటేషన్ స్థాయికి ఖచ్చితంగా 4 స్పేస్‌లు (4 Spaces) మాత్రమే వాడాలి!</strong>
    </p>
    <ul>
      <li>ప్రపంచవ్యాప్తంగా 99% పైథాన్ ప్రాజెక్టులు, గూగుల్ మరియు మైక్రోసాఫ్ట్ సంస్థలు 4-స్పేస్ ప్రమాణాన్నే పాటిస్తాయి.</li>
      <li>2 స్పేస్‌లు ఇస్తే కోడ్ ఒకదానిలో ఒకటి ఇరుక్కుపోయి చదవడానికి కష్టమవుతుంది.</li>
      <li>8 స్పేస్‌లు ఇస్తే లోతైన నెస్టెడ్ బ్లాకులలో కోడ్ స్క్రీన్ కుడివైపునకు బాగా జరిగిపోతుంది. అందుకే <strong>4 స్పేస్‌లు</strong> పర్ఫెక్ట్ బ్యాలెన్స్!</li>
    </ul>

    <!-- CODE BLOCK 1 -->
    <div class="code-block">
      <div class="code-header">
        <span class="file-name">01_indentation_rules.py</span>
        <div class="btn-group">
          <button class="btn btn-copy" onclick="copyCode(this)">Copy</button>
          <button class="btn btn-run" onclick="runCodeInCompiler(this)">Run ▶</button>
        </div>
      </div>
      <pre><code class="language-python"># పర్ఫెక్ట్ 4-స్పేస్ ఇండెంటేషన్ ఉదాహరణ

def evaluate_student(marks):
    # Level 1: ఫంక్షన్ లోపల 4 స్పేస్‌లు
    print(f"విద్యార్థి మార్కులు: {marks}")

    if marks &gt;= 90:
        # Level 2: if బ్లాక్ లోపల 8 స్పేస్‌లు
        grade = "A+ (Outstanding)"
        status = "డిస్టింక్షన్‌తో ఉత్తీర్ణులయ్యారు"
    elif marks &gt;= 50:
        # Level 2: elif బ్లాక్ లోపల 8 స్పేస్‌లు
        grade = "B (Good)"
        status = "సంతృప్తికరంగా ఉత్తీర్ణులయ్యారు"
    else:
        # Level 2: else బ్లాక్ లోపల 8 స్పేస్‌లు
        grade = "C (Needs Focus)"
        status = "రీ-అప్పియర్ కావాలి"

    # మళ్లీ Level 1 కి రావడం (Un-indenting)
    return grade, status

# Level 0 (గ్లోబల్ స్కోప్ - జీరో స్పేసెస్)
res_grade, res_status = evaluate_student(85)
print("ఫలితం గ్రేడ్ :", res_grade)
print("వివరణ       :", res_status)
</code></pre>
    </div>

    <!-- SECTION 4 -->
    <h2 class="section-title"><span class="num">4</span> ట్యాబ్స్ vs స్పేసెస్ యుద్ధం &amp; TabError నివారణ</h2>
    <p>
      ప్రోగ్రామింగ్ చరిత్రలో అత్యంత ప్రసిద్ధమైన వివాదం: <em>"ఇండెంటేషన్ కోసం ట్యాబ్ (Tab key) కొట్టాలా లేక 4 స్పేస్‌లు (Spacebar 4 times) కొట్టాలా?"</em>
    </p>
    <p>
      పైథాన్ 3 ఈ వివాదానికి శాశ్వత ముగింపు పలికింది:
      <strong>ఒకే ఫైల్‌లో ట్యాబ్‌లు మరియు స్పేస్‌లను కలపడం నేరం! అలా చేస్తే పైథాన్ 3 తక్షణమే <code>TabError</code> ఇచ్చి ప్రోగ్రామ్‌ను ఆపేస్తుంది!</strong>
    </p>
    <div class="tbl-wrap">
      <table class="tbl">
        <thead>
          <tr>
            <th>అంశం</th>
            <th>ట్యాబ్స్ (Tabs ⇥)</th>
            <th>స్పేసెస్ (Spaces ␣)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>విజువల్ విడ్త్</strong></td>
            <td>వివిధ ఎడిటర్లలో వేర్వేరుగా కనిపిస్తుంది (ఒకరిలో 2, మరొకరిలో 8).</td>
            <td>ప్రపంచంలో ఏ కంప్యూటర్‌లో చూసినా ఖచ్చితంగా 1 క్యారెక్టర్ స్పేస్ మాత్రమే!</td>
          </tr>
          <tr>
            <td><strong>PEP 8 సిఫార్సు</strong></td>
            <td>ఖచ్చితంగా నివారించాలి ❌</td>
            <td>అధికారిక ప్రామాణిక పద్ధతి (4 Spaces) ✅</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #10b981; border-radius:8px; padding:14px; margin:18px 0;">
      <div style="font-weight:700; color:#10b981; margin-bottom:6px;">🛠️ VS Code లో ప్రో-సెట్టింగ్:</div>
      <p style="font-size:13.5px; color:var(--text); line-height:1.6; margin:0;">
        VS Code లో మీరు కీబోర్డ్‌పై Tab నొక్కినప్పుడు, అది ట్యాబ్ క్యారెక్టర్ కాకుండా ఆటోమేటిక్‌గా 4 స్పేస్‌లుగా కన్వర్ట్ అవ్వడానికి VS Code సెట్టింగ్స్‌లో <strong>"Editor: Insert Spaces"</strong> ను టిక్ చేసి ఉంచండి మరియు <strong>"Editor: Tab Size" = 4</strong> గా సెట్ చేయండి.
      </p>
    </div>

    <!-- SECTION 5 -->
    <h2 class="section-title"><span class="num">5</span> ఇండెంటేషన్ ఎర్రర్ల రకాలు &amp; వాటి పరిష్కారాలు (IndentationError Types)</h2>
    <p>
      పైథాన్ కంపైలర్ ఇండెంటేషన్ సరిగ్గా లేనప్పుడు 3 రకాల ఎర్రర్లను చూపిస్తుంది:
    </p>
    <ul>
      <li><strong>1. <code>IndentationError: expected an indented block</code>:</strong> కోలన్ (<code>:</code>) తర్వాత వచ్చే లైన్‌లో కనీసం ఒక్క స్పేస్ కూడా ఇవ్వనప్పుడు వస్తుంది.
        <br/><code style="color:#ef4444;">if True:<br/>print("error")  # &lt;-- తప్పు! లోపలికి జరపలేదు</code>
      </li>
      <li><strong>2. <code>IndentationError: unexpected indent</code>:</strong> ఎలాంటి బ్లాక్ అవసరం లేని సాధారణ లైన్‌లో అనవసరంగా ముందు స్పేస్ ఇచ్చినప్పుడు వస్తుంది.
        <br/><code style="color:#ef4444;">x = 10<br/>    y = 20  # &lt;-- తప్పు! x కి y కి సంబంధం లేకపోయినా 4 స్పేసెస్ ఇచ్చారు</code>
      </li>
      <li><strong>3. <code>IndentationError: unindent does not match any outer indentation level</code>:</strong> బ్లాక్ ముగిసిన తర్వాత బయటకు వచ్చేటప్పుడు పాత లెవల్‌కు ఖచ్చితంగా సరిపోలకపోతే వస్తుంది. (ఉదా: 4 స్పేస్‌లకు బదులు 3 లేదా 5 స్పేస్‌లు ఉన్నప్పుడు).</li>
    </ul>

    <!-- SECTION 6 -->
    <h2 class="section-title"><span class="num">6</span> లైన్ కంటిన్యూయేషన్: ఇంప్లిసిట్ &amp; ఎక్స్‌ప్లిసిట్ (Line Continuation)</h2>
    <p>
      ఒక లైన్ చాలా పొడవుగా మారినప్పుడు, దానిని బహుళ లైన్లలోకి విడగొట్టడానికి పైథాన్ రెండు మార్గాలను అందిస్తుంది:
    </p>

    <!-- CODE BLOCK 2 -->
    <div class="code-block">
      <div class="code-header">
        <span class="file-name">02_line_continuation.py</span>
        <div class="btn-group">
          <button class="btn btn-copy" onclick="copyCode(this)">Copy</button>
          <button class="btn btn-run" onclick="runCodeInCompiler(this)">Run ▶</button>
        </div>
      </div>
      <pre><code class="language-python"># లైన్ కంటిన్యూయేషన్ డెమో

# 1. Explicit Line Continuation (బ్యాక్‌స్లాష్ \\ ద్వారా - సాధ్యమైనంత వరకు తగ్గించాలి)
total_score = 100 + 250 + \\
              300 + 450 + \\
              500
print("మొత్తం స్కోర్ (Explicit \\\\):", total_score)

# 2. Implicit Line Continuation (బ్రాకెట్లు (), [], {} లోపల - PEP 8 సిఫార్సు చేసిన ఉత్తమ పద్ధతి!)
monthly_budget = (
    50000 +      # ఇంటి అద్దె & నిత్యావసరాలు
    12000 +      # పిల్లల స్కూల్ ఫీజు
    8000  +      # యుటిలిటీ బిల్స్ & ఇంటర్నెట్
    15000        # సేవింగ్స్ & ఇన్వెస్ట్‌మెంట్
)
print("నెలవారీ బడ్జెట్ (Implicit బ్రాకెట్లు): ₹", monthly_budget)

# లిస్టులలో బహుళ లైన్ల విభజన
metro_stations = [
    "అమీర్‌పేట్", "హైటెక్ సిటీ", 
    "మియాపూర్", "రాయదుర్గం", 
    "దిల్‌సుఖ్‌నగర్", "LB నగర్"
]
print("మొత్తం మెట్రో స్టేషన్లు:", len(metro_stations))
</code></pre>
    </div>

    <!-- SECTION 7 -->
    <h2 class="section-title"><span class="num">7</span> ఒకే లైన్‌లో బహుళ స్టేట్‌మెంట్లు: సెమికోలన్ వాడకం (Multiple Statements on One Line)</h2>
    <p>
      పైథాన్‌లో సెమికోలన్ (<code>;</code>) చట్టబద్ధమైనదేనా? <strong>అవును, ఉపయోగించవచ్చు.</strong> కానీ అది పైథాన్ ఫిలాసఫీకి విరుద్ధం!
    </p>
    <ul>
      <li><code>x = 10; y = 20; print(x + y)</code> అని ఒకే లైన్‌లో రాయవచ్చు.</li>
      <li>కానీ PEP 8 ప్రకారం: <em>"Never put multiple statements on the same line."</em> దీనివల్ల కోడ్ చదవడం కష్టమవుతుంది మరియు డీబగ్గర్‌లో బ్రేక్‌పాయింట్స్ పెట్టడం అసాధ్యమవుతుంది. ఎల్లప్పుడూ ప్రతి స్టేట్‌మెంట్‌కు ఒక ప్రత్యేక లైన్ కేటాయించండి.</li>
    </ul>

    <!-- SECTION 8 -->
    <h2 class="section-title"><span class="num">8</span> కామెంట్స్ ప్రాముఖ్యత &amp; సింగిల్ లైన్ కామెంట్స్ (Comments &amp; the # Token)</h2>
    <p>
      కోడ్ కంప్యూటర్‌కు ఏమి చేయాలో చెబుతుంది. కానీ <strong>కామెంట్లు తోటి మనుషులకు కోడ్ ఎందుకు అలా రాయబడిందో వివరిస్తాయి.</strong>
      పైథాన్‌లో హ్యాష్ సింబల్ (<code>#</code>) తో ప్రారంభమయ్యే ప్రతిదీ కామెంట్‌గా పరిగణించబడుతుంది. కంపైలర్ దీనిని పూర్తిగా విస్మరిస్తుంది (Ignore).
    </p>
    <ul>
      <li><strong>పూర్తి లైన్ కామెంట్:</strong> లైన్ ప్రారంభంలో <code>#</code> ఉంచడం.</li>
      <li><strong>ఇన్‌లైన్ కామెంట్:</strong> కోడ్ పక్కన కనీసం 2 స్పేస్‌లు విడిచిపెట్టి <code>#</code> రాయడం:
        <br/><code>tax_rate = 0.18  # GST 18% సర్వీస్ టాక్స్ స్లాబ్</code>
      </li>
    </ul>

    <!-- SECTION 9 -->
    <h2 class="section-title"><span class="num">9</span> మల్టీ-లైన్ కామెంట్స్ వాస్తవాలు (Multi-line Comments vs Multi-line Strings)</h2>
    <p>
      C++ లేదా జావాలో ఉన్నట్లుగా <code>/* ... */</code> మల్టీ-లైన్ కామెంట్ బ్లాక్ పైథాన్‌లో అధికారికంగా లేదు!
      పైథాన్‌లో మల్టీ-లైన్ కామెంట్స్ రాయడానికి రెండు పద్ధతులు వాడుతారు:
    </p>
    <ol>
      <li><strong>వరుస <code>#</code> కామెంట్లు (PEP 8 సిఫార్సు చేసిన మార్గం):</strong>
        <br/>ప్రతి లైన్ ప్రారంభంలో <code>#</code> ఉంచడం. VS Code లో కోడ్ సెలెక్ట్ చేసి <strong>Ctrl + /</strong> కొడితే ఒకేసారి పది లైన్లైనా కామెంట్ అయిపోతాయి!
      </li>
      <li><strong>ట్రిపుల్ కోట్స్ (Triple-quoted Strings):</strong>
        <br/><code>""" ఈ కోడ్ చాలా ముఖ్యం ... """</code> లేదా <code>''' ... '''</code> రాయడం. ఏ వేరియబుల్‌కు అసైన్ చేయకపోతే పైథాన్ బైట్‌కోడ్ కంపైలర్ దీనిని కామెంట్‌లాగే వదిలేస్తుంది. కానీ ఇది నిజానికి ఒక అనామక స్ట్రింగ్ లిటరల్!
      </li>
    </ol>

    <!-- SECTION 10 -->
    <h2 class="section-title"><span class="num">10</span> డాక్‌స్ట్రింగ్స్ (Docstrings - Documentation Strings &amp; PEP 257)</h2>
    <p>
      కామెంట్లు డెవలపర్లు అంతర్గతంగా చదువుకోవడానికి ఉద్దేశించినవి. కానీ <strong>Docstrings</strong> అనేవి మీ కోడ్‌ను బయటి ప్రపంచం ఎలా వాడుకోవాలో తెలిపే అధికారిక డాక్యుమెంటేషన్!
      ఒక మాడ్యూల్, ఫంక్షన్, లేదా క్లాస్ ప్రారంభంలో మొదటి స్టేట్‌మెంట్‌గా ట్రిపుల్ కోట్స్‌లో రాసే స్ట్రింగ్‌ను <strong>Docstring</strong> అంటారు.
    </p>
    <p>
      పైథాన్ ఈ డాక్‌స్ట్రింగ్‌ను ఆ ఆబ్జెక్ట్ యొక్క <code>__doc__</code> అనే స్పెషల్ అట్రిబ్యూట్‌లో భద్రపరుస్తుంది. ఎవరైనా మీ ఫంక్షన్ పై <code>help(function_name)</code> పిలిచినప్పుడు ఈ సమాచారం స్క్రీన్‌పై ప్రత్యక్షమవుతుంది!
    </p>

    <!-- CODE BLOCK 3 -->
    <div class="code-block">
      <div class="code-header">
        <span class="file-name">03_docstrings_and_help.py</span>
        <div class="btn-group">
          <button class="btn btn-copy" onclick="copyCode(this)">Copy</button>
          <button class="btn btn-run" onclick="runCodeInCompiler(this)">Run ▶</button>
        </div>
      </div>
      <pre><code class="language-python"># Docstrings మరియు help() మెకానిక్స్ డెమో

def calculate_compound_interest(principal, rate, years):
    """
    వడ్డీ వ్యాపార లావాదేవీల కొరకు చక్రవడ్డీని లెక్కించును.

    పారామీటర్లు:
        principal (float): అసలు మొత్తం (రూపాయలలో).
        rate (float): వార్షిక వడ్డీ రేటు (శాతం రూపంలో, ఉదా: 12.5).
        years (int): పెట్టుబడి కాలపరిమితి (సంవత్సరాలలో).

    రిటర్న్ చేస్తుంది:
        float: చక్రవడ్డీతో కూడిన మొత్తం తుది విలువ.
    """
    final_amount = principal * ((1 + (rate / 100)) ** years)
    return round(final_amount, 2)

# 1. ఫంక్షన్ కాల్ చేసి ఫలితం చూడటం
total = calculate_compound_interest(100000, 10.5, 3)
print("3 సంవత్సరాల తర్వాత చక్రవడ్డీతో మొత్తం: ₹", total)

# 2. __doc__ ద్వారా ఫంక్షన్ డాక్యుమెంటేషన్ చదవడం
print("\\n--- ఫంక్షన్ అంతర్గత __doc__ డాక్యుమెంటేషన్ ---")
print(calculate_compound_interest.__doc__)
</code></pre>
    </div>

    <!-- SECTION 11 -->
    <h2 class="section-title"><span class="num">11</span> <code>pass</code> స్టేట్‌మెంట్ &amp; Ellipsis (...): ఎంటీ బ్లాక్స్ ప్లేస్‌హోల్డర్</h2>
    <p>
      C++ లేదా జావాలో ఒక ఫంక్షన్‌ను భవిష్యత్తు కోసం ఖాళీగా ఉంచాలంటే <code>void doSomething() {}</code> అని ఖాళీ కర్లీ బ్రేసెస్ పెడితే సరిపోతుంది.
      కానీ పైథాన్‌లో ఖాళీగా వదిలేస్తే తక్షణమే <code>IndentationError: expected an indented block</code> వస్తుంది!
    </p>
    <p>
      ఈ సమస్యను పరిష్కరించడానికి పైథాన్ <strong><code>pass</code></strong> అనే ప్రత్యేకమైన కీవర్డ్‌ను అందించింది. ఇది ఒక <em>"No-Operation" (NO-OP)</em> స్టేట్‌మెంట్ — ఏ పనీ చేయదు కానీ సింటాక్స్ నియమాన్ని కాపాడుతుంది!
    </p>
    <ul>
      <li><code>def future_feature(): pass</code> — ఫంక్షన్ సిగ్నేచర్ సిద్ధంగా ఉంది, కోడ్ రేపు రాస్తాం.</li>
      <li><code>class UserDatabase: pass</code> — ఎంటీ క్లాస్ నిర్మాణం.</li>
      <li><strong>Modern Python 3.8+ Ellipsis (<code>...</code>):</strong> ఆధునిక పైథాన్‌లో <code>pass</code> కి బదులుగా 3 చుక్కలు (<code>...</code>) కూడా వాడవచ్చు! టైప్ హింటింగ్ మరియు అబ్‌స్ట్రాక్ట్ మెథడ్లలో ఇది సర్వసాధారణం.</li>
    </ul>

    <!-- SECTION 12 -->
    <h2 class="section-title"><span class="num">12</span> ప్రొడక్షన్ బెస్ట్ ప్రాక్టీసెస్: కామెంట్లు &amp; డాక్యుమెంటేషన్ నిబంధనలు</h2>
    <p>
      ఒక సీనియర్ పైథాన్ సాఫ్ట్‌వేర్ ఇంజనీర్‌గా మీరు పాటించాల్సిన నియమాలు:
    </p>
    <ul>
      <li><strong>కోడ్ వివరించేది కామెంట్లలో రాయవద్దు (Don't state the obvious):</strong>
        <br/><code style="color:#ef4444;">i = i + 1  # i ని 1 పెంచుతున్నాం</code> ❌ (ఇది చదివితేనే తెలుస్తుంది!)
        <br/><code style="color:#10b981;">i = i + 1  # API రేట్ లిమిట్ రీచ్ అయినప్పుడు రీట్రై కౌంటర్ ట్రాకింగ్</code> ✅ (ఇది అసలైన కారణం చెబుతోంది!)
      </li>
      <li><strong>సెల్ఫ్-డాక్యుమెంటింగ్ కోడ్ రాయండి:</strong> వేరియబుల్స్ మరియు ఫంక్షన్ల పేర్లు ఎంత అర్థవంతంగా ఉండాలంటే, వాటికి కామెంట్లు రాసే అవసరమే చాలా వరకు తగ్గిపోవాలి.</li>
      <li><strong>పాతబడిన కామెంట్లను తొలగించండి:</strong> కోడ్ మార్చినప్పుడు కామెంట్లను మార్చడం మర్చిపోతే, తప్పుడు కామెంట్లు ఇతర డెవలపర్లను తప్పుదారి పట్టిస్తాయి.</li>
    </ul>

    <!-- SECTION 13 -->
    <h2 class="section-title"><span class="num">13</span> రియల్-వరల్డ్ ప్రాజెక్ట్: "Enterprise Payroll &amp; Tax Computation Engine"</h2>
    <p>
      ఈ రెండవ అధ్యాయంలో నేర్చుకున్న ఇండెంటేషన్ రూల్స్, నెస్టెడ్ లెవల్స్, ఇంప్లిసిట్ లైన్ కంటిన్యూయేషన్, PEP 257 డాక్‌స్ట్రింగ్స్, మరియు కామెంట్స్ అన్నింటినీ ఉపయోగించి ఒక పూర్తి స్థాయి <strong>ఎంటర్‌ప్రైజ్ పేరోల్ &amp; టాక్స్ కాలిక్యులేషన్ ఇంజిన్</strong> నిర్మిద్దాం!
    </p>

    <!-- CODE BLOCK 4: CAPSTONE MINI PROJECT -->
    <div class="code-block">
      <div class="code-header">
        <span class="file-name">04_enterprise_payroll_engine.py</span>
        <div class="btn-group">
          <button class="btn btn-copy" onclick="copyCode(this)">Copy</button>
          <button class="btn btn-run" onclick="runCodeInCompiler(this)">Run ▶</button>
        </div>
      </div>
      <pre><code class="language-python"># =====================================================================
# చాప్టర్ 02 రియల్-వరల్డ్ ప్రాజెక్ట్: Enterprise Payroll & Tax Engine
# కాన్సెప్ట్స్: Clean 4-Space Indentation, Multi-level Scope, PEP 257
#             Docstrings, Implicit Line Breaking, Type Annotations
# =====================================================================

def compute_monthly_payroll(employee_id, employee_name, basic_salary, role_grade):
    """
    ఉద్యోగి జీతభత్యాలు, పన్నులు మరియు నెట్ శాలరీని పారదర్శకంగా లెక్కిస్తుంది.

    పారామీటర్లు:
        employee_id (str): ప్రత్యేక ఉద్యోగి గుర్తింపు సంఖ్య (ఉదా: 'EMP-902').
        employee_name (str): ఉద్యోగి పూర్తి పేరు.
        basic_salary (float): ప్రాథమిక వేతనం (రూపాయలలో).
        role_grade (str): హోదా స్థాయి ('DIRECTOR', 'MANAGER', 'LEAD', 'DEV').

    రిటర్న్ చేస్తుంది:
        dict: స్థూల జీతం, మినహాయింపులు మరియు నికర వేతన వివరాలతో కూడిన డిక్షనరీ.
    """
    # Level 1: అలవెన్సుల శాతం లెక్కింపు (ఇంప్లిసిట్ బ్రాకెట్ ఫార్మాటింగ్)
    hra_allowance = basic_salary * 0.40  # 40% ఇంటి అద్దె భత్యం (HRA)
    special_allowance = basic_salary * 0.25  # 25% ప్రత్యేక భత్యం

    # రోల్ గ్రేడ్ ఆధారంగా అదనపు పెర్ఫార్మెన్స్ ఇన్సెంటివ్ (Nested Indentation Level 2)
    performance_bonus = 0.0
    if role_grade == "DIRECTOR":
        performance_bonus = basic_salary * 0.30
    elif role_grade == "MANAGER":
        performance_bonus = basic_salary * 0.20
    elif role_grade == "LEAD":
        performance_bonus = basic_salary * 0.15
    else:
        performance_bonus = basic_salary * 0.10

    # గ్రాస్ శాలరీ (Gross = Basic + HRA + Special + Bonus)
    gross_earnings = (
        basic_salary +
        hra_allowance +
        special_allowance +
        performance_bonus
    )

    # మినహాయింపులు (Deductions: PF & TDS Tax)
    provident_fund = basic_salary * 0.12  # 12% ప్రావిడెంట్ ఫండ్

    # ఇన్కమ్ టాక్స్ స్లాబ్స్ లెక్కింపు (TDS)
    annual_gross = gross_earnings * 12
    tax_rate = 0.0

    if annual_gross &gt; 1500000:
        tax_rate = 0.20  # 20% స్లాబ్
    elif annual_gross &gt; 1000000:
        tax_rate = 0.15  # 15% స్లాబ్
    elif annual_gross &gt; 700000:
        tax_rate = 0.10  # 10% స్లాబ్
    else:
        tax_rate = 0.0   # పన్ను రహితం

    monthly_tds_tax = (annual_gross * tax_rate) / 12
    total_deductions = provident_fund + monthly_tds_tax

    # టేక్-హోమ్ నెట్ శాలరీ
    net_take_home = gross_earnings - total_deductions

    return {
        "id": employee_id,
        "name": employee_name,
        "role": role_grade,
        "basic": basic_salary,
        "bonus": performance_bonus,
        "gross": gross_earnings,
        "pf": provident_fund,
        "tax": monthly_tds_tax,
        "net": net_take_home
    }

def print_salary_slip(slip):
    """అందమైన శాలరీ స్లిప్ ని కన్సోల్ లో ఫార్మాట్ చేసి ముద్రిస్తుంది."""
    border = "=" * 65
    print("\\n" + border)
    print("           🏢 TECH-SOLUTIONS INDIA PRIVATE LIMITED")
    print("                    అధికారిక వేతన రసీదు (PAYSLIP)")
    print(border)
    print(f"  ఉద్యోగి ID    : {slip['id']:<15} ఉద్యోగి పేరు: {slip['name']}")
    print(f"  హోదా స్థాయి    : {slip['role']:<15} మదింపు నెల  : నవంబర్ 2026")
    print("-" * 65)
    print("  [రాబడులు (Earnings)]                  [మినహాయింపులు (Deductions)]")
    print(f"  • బేసిక్ పే   : ₹ {slip['basic']:>10.2f}       • PF నిధి      : ₹ {slip['pf']:>9.2f}")
    print(f"  • బోనస్ అలవెన్స్: ₹ {slip['bonus']:>10.2f}       • TDS పన్ను    : ₹ {slip['tax']:>9.2f}")
    print(f"  • మొత్తం గ్రాస్ : ₹ {slip['gross']:>10.2f}       • మొత్తం కట్స్ : ₹ {slip['pf'] + slip['tax']:>9.2f}")
    print("-" * 65)
    print(f"  💰 ఉద్యోగి బ్యాంక్ ఖాతాలో జమయ్యే నెట్ శాలరీ : ₹ {slip['net']:>10.2f}")
    print(border + "\\n")

# ప్రోగ్రామ్ ఎంట్రీ పాయింట్
if __name__ == "__main__":
    emp1_slip = compute_monthly_payroll(
        employee_id="TS-1042",
        employee_name="రాజశేఖర్ వర్మ",
        basic_salary=75000.0,
        role_grade="MANAGER"
    )
    print_salary_slip(emp1_slip)
</code></pre>
    </div>

    <!-- 5 COLLAPSIBLE QUIZZES -->
    <h2 class="section-title"><span class="num">★</span> ఈ అధ్యాయంపై ప్రాక్టీస్ క్విజ్ (Knowledge Check)</h2>

    <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px 18px; margin-bottom:12px; cursor:pointer;">
      <summary style="font-weight:700; color:#10b981; font-size:14.5px;">1. పైథాన్‌లో ఇండెంటేషన్ ఎందుకు అంత ముఖ్యం? C++/Java లతో తేడా ఏమిటి?</summary>
      <div style="font-size:13.5px; color:var(--text); margin-top:10px; line-height:1.7;">
        <strong>సమాధానం:</strong> C++/Java లో కోడ్ బ్లాకులను కర్లీ బ్రేసెస్ <code>{}</code> తో వేరుచేస్తారు, అక్కడ ఇండెంటేషన్ కేవలం అందం కోసం మాత్రమే. కానీ పైథాన్‌లో కర్లీ బ్రేసెస్ ఉండవు; <strong>ఇండెంటేషనే సింటాక్స్!</strong> లైన్ ప్రారంభంలో ఉండే ఖాళీ స్పేస్‌లను బట్టి ఏ స్టేట్‌మెంట్ ఏ ఫంక్షన్ లేదా లూప్ లోపల ఉందో కంపైలర్ గుర్తిస్తుంది. ఇండెంటేషన్ తప్పుగా ఉంటే కోడ్ అసలు రన్ అవ్వదు.
      </div>
    </details>

    <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px 18px; margin-bottom:12px; cursor:pointer;">
      <summary style="font-weight:700; color:#10b981; font-size:14.5px;">2. ఒకే పైథాన్ ఫైల్‌లో ట్యాబ్‌లు (Tabs) మరియు స్పేసెస్ (Spaces) కలిపి వాడితే ఏమి జరుగుతుంది?</summary>
      <div style="font-size:13.5px; color:var(--text); margin-top:10px; line-height:1.7;">
        <strong>సమాధానం:</strong> పైథాన్ 3 తక్షణమే <strong><code>TabError: inconsistent use of tabs and spaces in indentation</code></strong> అనే కంపైలేషన్ ఎర్రర్‌ను విసిరి ప్రోగ్రామ్‌ను ఆపేస్తుంది! ఎందుకంటే వేర్వేరు టెక్స్ట్ ఎడిటర్లలో ట్యాబ్ వెడల్పు మారుతుంది. అందుకే PEP 8 ప్రకారం ఎల్లప్పుడూ కేవలం <strong>4 Spaces</strong> మాత్రమే వాడాలి.
      </div>
    </details>

    <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px 18px; margin-bottom:12px; cursor:pointer;">
      <summary style="font-weight:700; color:#10b981; font-size:14.5px;">3. సాధారణ కామెంట్లకు (#) మరియు డాక్‌స్ట్రింగ్స్‌కు (Docstrings) మధ్య తేడా ఏమిటి?</summary>
      <div style="font-size:13.5px; color:var(--text); margin-top:10px; line-height:1.7;">
        <strong>సమాధానం:</strong> హ్యాష్ (<code>#</code>) తో రాసే సాధారణ కామెంట్లు కేవలం సోర్స్ కోడ్ చదివే డెవలపర్ల కోసమే ఉంటాయి; కంపైలర్ వాటిని బైట్‌కోడ్‌లో భద్రపరచదు. కానీ <strong>Docstrings</strong> (ట్రిపుల్ కోట్స్‌తో రాసే మొదటి స్టేట్‌మెంట్) ఆబ్జెక్ట్ యొక్క <code>__doc__</code> అట్రిబ్యూట్‌లో రన్‌టైమ్‌లో నిల్వ ఉంటాయి. ఎవరైనా <code>help(function)</code> అని పిలిచినప్పుడు ఈ డాక్‌స్ట్రింగ్ కనిపిస్తుంది.
      </div>
    </details>

    <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px 18px; margin-bottom:12px; cursor:pointer;">
      <summary style="font-weight:700; color:#10b981; font-size:14.5px;">4. పైథాన్‌లో 'pass' స్టేట్‌మెంట్ ఎప్పుడు ఉపయోగపడుతుంది?</summary>
      <div style="font-size:13.5px; color:var(--text); margin-top:10px; line-height:1.7;">
        <strong>సమాధానం:</strong> పైథాన్‌లో ఏ కోలన్ (<code>:</code>) తర్వాతైనా కనీసం ఒక్క లైన్ ఇండెంటెడ్ కోడ్ ఉండాలి; ఖాళీగా వదిలేస్తే <code>IndentationError</code> వస్తుంది. భవిష్యత్తులో లాజిక్ రాయడానికి ఇప్పుడే ఫంక్షన్ లేదా క్లాస్ అస్థిపంజరం (Skeleton) తయారుచేసేటప్పుడు ఏ పనీ చేయకుండా సింటాక్స్ కాపాడటానికి <strong><code>pass</code> (లేదా <code>...</code>)</strong> అనే ప్లేస్‌హోల్డర్ వాడతాం.
      </div>
    </details>

    <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px 18px; margin-bottom:12px; cursor:pointer;">
      <summary style="font-weight:700; color:#10b981; font-size:14.5px;">5. పొడవైన ఎక్స్‌ప్రెషన్‌ను బహుళ లైన్లలో రాయడానికి PEP 8 ఏ పద్ధతిని సిఫార్సు చేస్తుంది?</summary>
      <div style="font-size:13.5px; color:var(--text); margin-top:10px; line-height:1.7;">
        <strong>సమాధానం:</strong> రౌండ్ బ్రాకెట్లు <code>()</code>, స్క్వేర్ బ్రాకెట్లు <code>[]</code>, లేదా కర్లీ బ్రేసెస్ <code>{}</code> లోపల రాసే <strong>ఇంప్లిసిట్ లైన్ కంటిన్యూయేషన్ (Implicit Continuation)</strong> ను సిఫార్సు చేస్తుంది. బ్యాక్‌స్లాష్ (<code>\\</code>) తో రాసే ఎక్స్‌ప్లిసిట్ పద్ధతిలో పొరపాటున బ్యాక్‌స్లాష్ పక్కన ఏదైనా స్పేస్ పడితే ఎర్రర్ వస్తుంది, కాబట్టి బ్రాకెట్లు వాడటమే అత్యంత సురక్షితమైన మార్గం.
      </div>
    </details>

    <!-- PREV / NEXT NAVIGATION -->
    <div style="display:flex; justify-content:space-between; align-items:center; margin-top:40px; padding-top:20px; border-top:1px solid var(--border); flex-wrap:wrap; gap:16px;">
      <a href="/blog-python/01-python-introduction-features-and-setup.html" style="text-decoration:none; color:var(--text); font-weight:600; display:inline-flex; align-items:center; gap:8px; background:var(--bg2); padding:10px 18px; border-radius:8px; border:1px solid var(--border);">
        ← మునుపటి అధ్యాయం: 1. పైథాన్ పరిచయం, ఫీచర్లు &amp; సెటప్
      </a>
      <a href="/blog-python/03-python-variables-data-types-and-naming.html" style="text-decoration:none; color:#ffffff; font-weight:700; display:inline-flex; align-items:center; gap:8px; background:#10b981; padding:10px 22px; border-radius:8px; box-shadow:0 4px 12px rgba(16,185,129,0.3);">
        తర్వాతి అధ్యాయం: 3. వేరియబుల్స్ &amp; డేటా టైప్స్ →
      </a>
    </div>

    <!-- INTERACTIVE COMPILER CTA CARD -->
    <div style="margin-top:40px; background:linear-gradient(135deg, rgba(16,185,129,0.1) 0%, rgba(56,189,248,0.1) 100%); border:1px solid rgba(16,185,129,0.3); border-radius:12px; padding:24px; text-align:center;">
      <h3 style="margin-top:0; color:var(--text); font-size:20px;">ఈ పేరోల్ ప్రాజెక్ట్‌ను లైవ్‌గా మన పైథాన్ కంపైలర్‌లో రన్ చేయండి!</h3>
      <p style="color:var(--text2); max-width:650px; margin:8px auto 20px; font-size:14px; line-height:1.6;">
        ఎటువంటి లోకల్ సెటప్ లేకుండా, బ్రౌజర్‌లోనే నేరుగా Modern Python 3 కంపైలర్‌లో ఈ కోడ్‌ను ఎగ్జిక్యూట్ చేసి రన్‌టైమ్ అవుట్‌పుట్‌ను తనిఖీ చేయండి.
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
# చాప్టర్ 02 మినీ ప్రాజెక్ట్: Enterprise Payroll & Tax Engine
# =====================================================================

def calculate_net_pay(name, basic, bonus_rate):
    """ఉద్యోగి జీతం & పన్ను మినహాయింపులను లెక్కిస్తుంది."""
    gross = basic + (basic * bonus_rate)
    tax = gross * 0.10  # 10% TDS
    net = gross - tax
    return gross, tax, net

print("=" * 55)
print("     🏢 TECH PAYROLL CALCULATOR (LIVE DEMO)")
print("=" * 55)

emp_name = "రాజశేఖర్ వర్మ"
emp_basic = 75000.0
gross, tax, net = calculate_net_pay(emp_name, emp_basic, 0.20)

print(f"ఉద్యోగి పేరు   : {emp_name}")
print(f"ప్రాథమిక వేతనం : ₹ {emp_basic:.2f}")
print(f"మొత్తం గ్రాస్   : ₹ {gross:.2f}")
print(f"TDS పన్ను (10%) : ₹ {tax:.2f}")
print("-" * 55)
print(f"నికర జీతం (Net) : ₹ {net:.2f}")
print("=" * 55)
print("\\n🎉 చాప్టర్ 02 ప్రాజెక్ట్ విజయవంతంగా రన్ అయ్యింది! 🚀")
\';

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
fs.writeFileSync(outputPath, chapter02Content, 'utf8');
console.log('✅ Successfully generated deep high-value Python Chapter 02 in exact HTML style!');
console.log('Target file:', currentLesson.file);
console.log('Target file size:', chapter02Content.length, 'characters');
