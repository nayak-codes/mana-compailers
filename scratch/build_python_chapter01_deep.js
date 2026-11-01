const fs = require('fs');
const path = require('path');
const { LESSONS, buildPythonSidebar } = require('./python_curriculum_data.js');

const currentLesson = LESSONS[0]; // Chapter 01
const sidebarHtml = buildPythonSidebar(1);

const chapter01Content = `<!DOCTYPE html>
<html class="light-theme" lang="te">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${currentLesson.title} — Python 3 Tutorial | Our Compiler</title>
  <meta name="description" content="Python 3 పరిచయం, ఫీచర్లు & సెటప్ సమగ్ర తెలుగు గైడ్: Guido van Rossum చరిత్ర, Python 2 vs Python 3, CPython ఆర్కిటెక్చర్, Bytecode & PVM, VS Code సెటప్, print() డీప్ డైవ్, మరియు System Telemetry Welcome Engine ప్రాజెక్ట్." />
  <meta name="keywords" content="python introduction in telugu, learn python in telugu, python setup vs code, cpython architecture telugu, python print function telugu, python tutorial telugu, our compiler" />
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
    "headline": "${currentLesson.title} (Complete Python 3 Introduction, Architecture and Setup in Telugu)",
    "description": "Python 3 పూర్తి గైడ్: Guido van Rossum హిస్టరీ, CPython బైట్‌కోడ్, PVM, VS Code సెటప్, print() లోతుపాతులు, మరియు మొదటి ప్రాజెక్ట్.",
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
    "datePublished": "2026-01-15",
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
      <span>Chapter 1: ${currentLesson.title}</span>
    </div>

    <!-- PAGE TITLE -->
    <h1 class="page-title">${currentLesson.title}</h1>

    <!-- PAGE META BADGES -->
    <div class="page-meta">
      <span class="badge badge-tech">🐍 Modern Python (Python 3.12+)</span>
      <span class="badge badge-chapter">🎯 Chapter 1 of 25</span>
      <span class="badge badge-phase">🚀 Phase 01: పైథాన్ ఫండమెంటల్స్ &amp; బేసిక్స్</span>
      <span class="badge badge-edition">📅 2026 Edition</span>
    </div>

    <!-- COVERED TOPICS PILL BAR -->
    <div style="background:var(--bg3); border:1px solid var(--border); border-radius:10px; padding:12px 18px; margin-bottom:24px; font-size:13px; line-height:1.7;">
      <span style="color:#10b981; font-weight:700;">📌 Covered in this chapter:</span>
      <span style="color:var(--text2); margin-left:6px;">
        Guido van Rossum హిస్టరీ · PEP 20 (Zen of Python) · Python 2 vs Python 3 · CPython ఆర్కిటెక్చర్ (Bytecode &amp; PVM) · Windows/macOS/Linux లో ఇన్‌స్టాలేషన్ · VS Code &amp; Extensions సెటప్ · print() లోతుపాతులు (sep, end) · REPL &amp; స్క్రిప్ట్ మోడ్స్ · System Telemetry Welcome Engine ప్రాజెక్ట్!
      </span>
    </div>

    <!-- INTRO BOX (Warm Soft Ivory HTML5 Style) -->
    <div class="intro-box">
      కంప్యూటర్ సైన్స్ చరిత్రలో ఎన్నో ప్రోగ్రామింగ్ భాషలు వచ్చాయి, కానీ <strong>పైథాన్ (Python)</strong> సాధించినంతటి అసాధారణ ప్రజాదరణ మరే ఇతర భాషకూ దక్కలేదు. క్లిష్టమైన సింటాక్స్, సెమికోలన్లు మరియు కర్లీ బ్రేసెస్ (<code>{}</code>) తో కుస్తీ పట్టాల్సిన అవసరం లేకుండా, స్వచ్ఛమైన ఆంగ్ల వాక్యాలు రాసినంత సహజంగా కోడింగ్ చేయగలగడమే పైథాన్ యొక్క అసలైన మంత్రదండం.
      ఈ 25 అధ్యాయాల సమగ్ర మాస్టర్‌క్లాస్‌లో మొదటి అధ్యాయమైన ఈ లెసన్‌లో — పైథాన్ పుట్టుక, దాని అసమాన ఫీచర్లు, అంతర్గత కంపైలేషన్ &amp; ఇంటర్‌ప్రిటేషన్ ఆర్కిటెక్చర్ (CPython, Bytecode &amp; PVM), కంప్యూటర్‌లో ప్రొఫెషనల్ డెవలప్‌మెంట్ ఎన్విరాన్‌మెంట్ సెటప్, మరియు మీ చేతులతో నిర్మించే మొదటి <strong>System Diagnostics &amp; Student Welcome Engine</strong> ప్రాజెక్ట్ వరకు పూర్తి నైపుణ్యాన్ని సాధించబోతున్నారు!
    </div>

    <!-- SECTION 1 -->
    <h2 class="section-title"><span class="num">1</span> పైథాన్ అంటే ఏమిటి? (What is Python? History &amp; Guido van Rossum)</h2>
    <p>
      <strong>పైథాన్ (Python)</strong> అనేది ప్రపంచ ప్రసిద్ధి చెందిన హై-లెవెల్ (High-level), ఇంటర్‌ప్రీటెడ్ (Interpreted), మరియు జనరల్ పర్పస్ (General-purpose) డైనమిక్ ప్రోగ్రామింగ్ భాష. దీనిని 1989 డిసెంబర్‌లో నెదర్లాండ్స్‌లోని CWI (Centrum Wiskunde &amp; Informatica) పరిశోధనా సంస్థలో డచ్ ప్రోగ్రామర్ <strong>గైడో వాన్ రోసమ్ (Guido van Rossum)</strong> ప్రారంభించారు. మొదటి అధికారిక వెర్షన్ 0.9.0 ఫిబ్రవరి 1991లో విడుదలైంది.
    </p>
    <p>
      చాలామంది పైథాన్ అనే పేరు ఏదో పెద్ద పాము (Python snake) నుండి వచ్చిందని అనుకుంటారు. కానీ నిజానికి గైడో వాన్ రోసమ్‌కు అప్పట్లో BBC టెలివిజన్‌లో ప్రసారమయ్యే ప్రసిద్ధ కామెడీ ధారావాహిక <em>"Monty Python's Flying Circus"</em> అంటే ఎంతో ఇష్టం. ఆ షో పేరు మీదుగానే తన సరికొత్త భాషకు <strong>Python</strong> అని నామకరణం చేశారు!
    </p>

    <!-- CALLOUT BOX: THE ZEN OF PYTHON (PEP 20) -->
    <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #10b981; border-radius:8px; padding:16px 20px; margin:20px 0;">
      <div style="font-weight:700; color:#10b981; margin-bottom:8px; font-size:15px;">📜 The Zen of Python (PEP 20) — పైథాన్ జీవన తత్వశాస్త్రం:</div>
      <p style="font-size:13.5px; color:var(--text); line-height:1.7; margin-bottom:8px;">
        పైథాన్ ఇంటర్‌ప్రీటర్‌లో <code>import this</code> అని టైప్ చేస్తే టిమ్ పీటర్స్ రాసిన 19 సూత్రాల ఫిలాసఫీ కనిపిస్తుంది:
      </p>
      <ul style="font-size:13px; color:var(--text2); line-height:1.8; margin-left:20px;">
        <li><em>"Beautiful is better than ugly."</em> (అందమైన కోడ్ అందవిహీన కోడ్ కంటే మిన్న)</li>
        <li><em>"Explicit is better than implicit."</em> (స్పష్టంగా చెప్పడం అంతర్లీనంగా దాచడం కంటే మేలు)</li>
        <li><em>"Simple is better than complex."</em> (సరళత సంక్లిష్టత కంటే గొప్పది)</li>
        <li><em>"Readability counts."</em> (కోడ్ చదవడానికి సులభంగా ఉండటమే పరమావధి)</li>
      </ul>
    </div>

    <!-- SECTION 2 -->
    <h2 class="section-title"><span class="num">2</span> పైథాన్ ఎందుకు ఇంత శక్తివంతమైనది? (Key Features of Python)</h2>
    <p>
      నేడు గూగుల్, నాసా (NASA), ఇన్‌స్టాగ్రామ్, నెట్‌ఫ్లిక్స్, మెటా, మరియు ఓపెన్ AI (OpenAI) వంటి ప్రపంచ దిగ్గజ సంస్థలన్నీ పైథాన్‌పైనే ఆధారపడటానికి గల అగ్రశ్రేణి కారణాలు ఇవే:
    </p>

    <div class="tbl-wrap">
      <table class="tbl">
        <thead>
          <tr>
            <th>ఫీచర్ (Feature)</th>
            <th>వివరణ (Description)</th>
            <th>డెవలపర్‌కు ప్రయోజనం (Benefit)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>సులభమైన సింటాక్స్</strong></td>
            <td>కర్లీ బ్రేసెస్ <code>{}</code> మరియు సెమికోలన్ల <code>;</code> గోల ఉండదు. శుభ్రమైన ఇండెంటేషన్ మాత్రమే.</td>
            <td>కోడ్ రాయడానికి 5x తక్కువ సమయం, సులభంగా నేర్చుకోవచ్చు.</td>
          </tr>
          <tr>
            <td><strong>ఇంటర్‌ప్రీటెడ్ లాంగ్వేజ్</strong></td>
            <td>లైన్ బై లైన్ ఎగ్జిక్యూషన్. మ్యానువల్ కంపైలేషన్ దశ లేకుండా నేరుగా రన్ అవుతుంది.</td>
            <td>డీబగ్గింగ్ అత్యంత వేగవంతం, తక్షణ ఫలితాలు.</td>
          </tr>
          <tr>
            <td><strong>డైనమిక్ టైపింగ్</strong></td>
            <td>వేరియబుల్ డిక్లేర్ చేసేటప్పుడు <code>int x</code> అని టైప్ చెప్పనవసరం లేదు; రన్‌టైమ్‌లో దానంతటదే గ్రహిస్తుంది.</td>
            <td>ఫ్లెక్సిబుల్ కోడింగ్, ప్రోటోటైపింగ్ వేగం పెరుగుతుంది.</td>
          </tr>
          <tr>
            <td><strong>క్రాస్ ప్లాట్‌ఫామ్</strong></td>
            <td>Windows, macOS, Linux, Raspberry Pi లపై ఒకే కోడ్ ఎటువంటి మార్పులు లేకుండా రన్ అవుతుంది.</td>
            <td>"Write Once, Run Anywhere" స్వేచ్ఛ.</td>
          </tr>
          <tr>
            <td><strong>Batteries Included</strong></td>
            <td>మ్యాథ్స్, నెట్‌వర్కింగ్, ఫైల్స్, JSON, డేటాబేస్ కోసం వందలాది బిల్ట్-ఇన్ లైబ్రరీలు అందుబాటులో ఉంటాయి.</td>
            <td>బయటి కోడ్ అవసరం లేకుండా వెంటనే సాఫ్ట్‌వేర్ బిల్డ్ చేయవచ్చు.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- SECTION 3 -->
    <h2 class="section-title"><span class="num">3</span> Python 2 వర్సెస్ Python 3: చరిత్ర &amp; కీలక వ్యత్యాసాలు</h2>
    <p>
      పైథాన్ ప్రయాణంలో అత్యంత కీలకమైన ఘట్టం <strong>Python 3</strong> విడుదల (డిసెంబర్ 2008). పాత Python 2 లో ఉన్న అంతర్గత డిజైన్ లోపాలను, యూనికోడ్ సమస్యలను సమూలంగా సరిచేయడానికి గైడో వాన్ రోసమ్ బ్యాక్‌వర్డ్ అనుకూలతను (Backward Compatibility) పక్కనపెట్టి Python 3 ని తీసుకొచ్చారు.
      <strong>జనవరి 1, 2020 నాడు Python 2 అధికారికంగా అంతరించింది (End of Life - EOL).</strong> కాబట్టి నేడు ప్రపంచమంతా కేవలం Python 3 ని మాత్రమే ఉపయోగిస్తోంది.
    </p>

    <div class="tbl-wrap">
      <table class="tbl">
        <thead>
          <tr>
            <th>అంశం (Concept)</th>
            <th>పాత Python 2 (కాలం చెల్లినది ❌)</th>
            <th>ఆధునిక Python 3 (ప్రస్తుత ప్రమాణం ✅)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>print</code> స్టేట్‌మెంట్</td>
            <td><code>print "Hello"</code> (స్టేట్‌మెంట్ - బ్రాకెట్లు లేవు)</td>
            <td><code>print("Hello")</code> (ప్రామాణిక ఫంక్షన్ - బ్రాకెట్లు తప్పనిసరి)</td>
          </tr>
          <tr>
            <td>పూర్ణాంక భాగహారం (Integer Division)</td>
            <td><code>5 / 2</code> చేస్తే <code>2</code> మాత్రమే వచ్చేది (దశాంశం కోల్పోయేది)</td>
            <td><code>5 / 2</code> చేస్తే ఖచ్చితమైన <code>2.5</code> ఫ్లోట్ వస్తుంది! (ఫ్లోర్ కోసం <code>5 // 2</code>)</td>
          </tr>
          <tr>
            <td>స్ట్రింగ్ ఎన్‌కోడింగ్</td>
            <td>ASCII బై-డిఫాల్ట్ (తెలుగు/యూనికోడ్ కోసం <code>u"హలో"</code> రాయాలి)</td>
            <td>UTF-8 బై-డిఫాల్ట్! తెలుగు, హిందీ, ఎమోజీలను నేరుగా సపోర్ట్ చేస్తుంది.</td>
          </tr>
          <tr>
            <td>యూజర్ ఇన్‌పుట్</td>
            <td><code>raw_input()</code> వాడాల్సి వచ్చేది</td>
            <td>ఒకే ఒక స్వచ్ఛమైన <code>input()</code> ఫంక్షన్.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- SECTION 4 -->
    <h2 class="section-title"><span class="num">4</span> పైథాన్ ఆర్కిటెక్చర్: కోడ్ తెరవెనుక ఎలా రన్ అవుతుంది? (CPython, Bytecode &amp; PVM)</h2>
    <p>
      బిగినర్స్ చాలామంది పైథాన్ అనేది కేవలం ఒక ఇంటర్‌ప్రీటెడ్ లాంగ్వేజ్ అని, ఇందులో కంపైలర్ ఉండదని పొరబడుతుంటారు. కానీ నిజానికి <strong>పైథాన్ రెండు దశలలో పనిచేస్తుంది: ముందుగా కంపైల్ అవుతుంది, ఆపై ఇంటర్‌ప్రెట్ అవుతుంది!</strong>
    </p>

    <!-- ARCHITECTURE DIAGRAM: CPYTHON PIPELINE -->
    <div style="background:#0f172a; border:1px solid #1e293b; border-radius:10px; padding:20px; margin:20px 0; color:#e2e8f0; font-family:'JetBrains Mono', monospace; font-size:13px; overflow-x:auto;">
<span style="color:#38bdf8; font-weight:700;">[CPython ఎగ్జిక్యూషన్ పైప్‌లైన్ ఆర్కిటెక్చర్]</span>

1. సోర్స్ కోడ్ ఫైల్ (.py)
   ┌────────────────────────────────────────┐
   │ hello.py: print("స్వాగతం పైథాన్!")   │
   └───────────────────┬────────────────────┘
                       │
                       ▼ (దశ 1: CPython కంపైలర్ సింటాక్స్ చెక్ చేసి బైట్‌కోడ్‌గా మారుస్తుంది)
2. బైట్‌కోడ్ (.pyc ఫైల్ - __pycache__ ఫోల్డర్ లో నిల్వ అవుతుంది)
   ┌────────────────────────────────────────┐
   │ ఇంటర్మీడియట్ కోడ్ (Platform Independent)│
   │ Opcodes: LOAD_GLOBAL, CALL_FUNCTION... │
   └───────────────────┬────────────────────┘
                       │
                       ▼ (దశ 2: Python Virtual Machine - PVM ఒక్కో ఇన్‌స్ట్రక్షన్ చదువుతుంది)
3. పైథాన్ వర్చువల్ మెషిన్ (PVM - ఇంటర్‌ప్రీటర్ ఇంజిన్)
   ┌────────────────────────────────────────┐
   │ C లో రాయబడిన PVM లూప్ బైట్‌కోడ్‌ను        │
   │ CPU నేటివ్ మెషిన్ కోడ్ (0s &amp; 1s) గా మార్చి │
   │ ఆపరేటింగ్ సిస్టమ్ హార్డ్‌వేర్‌పై రన్ చేస్తుంది!│
   └───────────────────┬────────────────────┘
                       │
                       ▼
4. రన్‌టైమ్ అవుట్‌పుట్: "స్వాగతం పైథాన్!"
    </div>

    <p>
      ఈ ఆర్కిటెక్చర్ వల్లే పైథాన్ బైట్‌కోడ్ ప్లాట్‌ఫామ్ స్వతంత్రంగా ఉంటుంది. విండోస్‌లో తయారైన <code>.pyc</code> బైట్‌కోడ్ ఫైల్ లైనక్స్ లేదా మ్యాక్ పైన ఉన్న PVM లో కూడా ఎటువంటి మార్పులు లేకుండా రన్ అవుతుంది!
    </p>

    <!-- SECTION 5 -->
    <h2 class="section-title"><span class="num">5</span> పైథాన్ ఇంటర్‌ప్రీటర్లు: CPython, PyPy, Jython &amp; IronPython</h2>
    <p>
      పైథాన్ అనేది ఒక భాషా స్పెసిఫికేషన్ (Language Specification). దీనిని వేర్వేరు టెక్నాలజీలను ఉపయోగించి అమలు చేసిన అనేక ఇంజిన్లు (Implementations) ఉన్నాయి:
    </p>
    <ul>
      <li><strong>CPython (స్టాండర్డ్ వెర్షన్):</strong> C లాంగ్వేజ్‌లో వ్రాయబడిన అధికారిక, అత్యంత ప్రాచుర్యం పొందిన పైథాన్ ఇంజిన్. python.org నుండి మనం డౌన్‌లోడ్ చేసుకునేది ఇదే.</li>
      <li><strong>PyPy (JIT హై-స్పీడ్ వెర్షన్):</strong> Just-In-Time (JIT) కంపైలర్‌తో రూపొందించబడింది. సాధారణ CPython కంటే <strong>5x నుండి 10x వేగవంతంగా</strong> రన్ అవుతుంది.</li>
      <li><strong>Jython:</strong> Java లో రాయబడింది. జావా క్లాస్‌లను, JVM లైబ్రరీలను నేరుగా పైథాన్ నుండి వాడుకోవడానికి ఉపయోగపడుతుంది.</li>
      <li><strong>IronPython:</strong> C# లో రాయబడింది. Microsoft .NET పర్యావరణంలో పైథాన్ కోడ్ ఎగ్జిక్యూట్ చేయడానికి ఉపయోగపడుతుంది.</li>
    </ul>

    <!-- SECTION 6 -->
    <h2 class="section-title"><span class="num">6</span> కంప్యూటర్‌లో పైథాన్ ఇన్‌స్టాలేషన్ (Windows, macOS, Linux)</h2>
    <p>
      పైథాన్ ప్రోగ్రామింగ్ ప్రారంభించడానికి మీ సిస్టమ్‌లో అధికారిక రన్‌టైమ్‌ను ఇన్‌స్టాల్ చేసుకోవాలి:
    </p>

    <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px; margin:16px 0;">
      <div style="font-weight:700; color:#10b981; margin-bottom:10px;">🖥️ Windows యూజర్లకు దశలవారీ గైడ్:</div>
      <ol style="margin-left:20px; line-height:1.8; font-size:14px; color:var(--text);">
        <li>అధికారిక వెబ్‌సైట్ <a href="https://www.python.org/downloads/" target="_blank" style="color:#10b981; text-decoration:underline;">python.org/downloads</a> కి వెళ్ళండి.</li>
        <li><strong>Download Python 3.12+</strong> బటన్ పై క్లిక్ చేసి ఇన్‌స్టాలర్ ఎగ్జిక్యూటబుల్ ఫైల్ డౌన్‌లోడ్ చేసుకోండి.</li>
        <li><strong>అత్యంత ముఖ్యమైన దశ:</strong> ఇన్‌స్టాలర్ ఓపెన్ చేసిన వెంటనే క్రింద ఉండే <strong>"Add python.exe to PATH"</strong> చెక్‌బాక్స్‌ను తప్పనిసరిగా టిక్ (Tick) చేయండి! ఇది చేయకపోతే టెర్మినల్ నుండి పైథాన్ కమాండ్స్ పనిచేయవు.</li>
        <li>"Install Now" పై క్లిక్ చేయండి. పూర్తయ్యాక టెర్మినల్ లేదా PowerShell ఓపెన్ చేసి సరిచూసుకోండి:</li>
      </ol>
      <div style="background:#0f172a; padding:10px 14px; border-radius:6px; margin-top:10px; font-family:'JetBrains Mono', monospace; font-size:13px; color:#38bdf8;">
        &gt; python --version<br/>
        <span style="color:#10b981;">Python 3.12.2</span>
      </div>
    </div>

    <!-- SECTION 7 -->
    <h2 class="section-title"><span class="num">7</span> VS Code (Visual Studio Code) &amp; Python Extension సెటప్</h2>
    <p>
      పైథాన్ కోడ్ రాయడానికి ప్రపంచంలోనే అత్యుత్తమ కోడ్ ఎడిటర్ మైక్రోసాఫ్ట్ రూపొందించిన <strong>Visual Studio Code (VS Code)</strong>.
    </p>
    <ul>
      <li><strong>VS Code ఇన్‌స్టాల్ చేయండి:</strong> <a href="https://code.visualstudio.com/" target="_blank" style="color:#10b981; text-decoration:underline;">code.visualstudio.com</a> నుండి ఉచితంగా డౌన్‌లోడ్ చేయండి.</li>
      <li><strong>పైథాన్ ఎక్స్‌టెన్షన్:</strong> VS Code లో ఎడమవైపు ఉన్న Extensions ఐకాన్ (Ctrl + Shift + X) క్లిక్ చేసి, <strong>"Python" by Microsoft</strong> ఎక్స్‌టెన్షన్‌ను ఇన్‌స్టాల్ చేయండి.</li>
      <li>దీనివల్ల మీకు ఆటో-కంప్లీషన్ (IntelliSense), సింటాక్స్ హైలైటింగ్, కోడ్ ఫార్మాటింగ్, మరియు ఇన్-బిల్ట్ టెర్మినల్ సదుపాయాలు లభిస్తాయి.</li>
    </ul>

    <!-- SECTION 8 -->
    <h2 class="section-title"><span class="num">8</span> పైథాన్ ఇంటరాక్టివ్ REPL &amp; మొదటి "Hello World" స్క్రిప్ట్</h2>
    <p>
      పైథాన్‌తో పనిచేయడానికి రెండు పద్ధతులు ఉన్నాయి:
    </p>
    <ol>
      <li><strong>ఇంటరాక్టివ్ REPL (Read-Eval-Print-Loop):</strong> టెర్మినల్‌లో కేవలం <code>python</code> అని టైప్ చేస్తే <code>&gt;&gt;&gt;</code> ప్రాంప్ట్ వస్తుంది. ఇక్కడ మీరు రాసే ప్రతి లైన్ వెంటనే ఎగ్జిక్యూట్ అయ్యి ఫలితాన్ని ఇస్తుంది. టెస్టింగ్ కోసం ఇది అద్భుతంగా పనిచేస్తుంది.</li>
      <li><strong>స్క్రిప్ట్ మోడ్ (Script Mode):</strong> <code>.py</code> ఎక్స్‌టెన్షన్‌తో ఒక ఫైల్ సృష్టించి (ఉదా: <code>hello.py</code>), అందులో కోడ్ రాసి <code>python hello.py</code> ద్వారా రన్ చేయడం. ప్రొడక్షన్ ప్రాజెక్ట్‌లకు ఇదే ప్రామాణిక పద్ధతి.</li>
    </ol>

    <!-- CODE BLOCK 1 -->
    <div class="code-block">
      <div class="code-header">
        <span class="file-name">01_hello_world_master.py</span>
        <div class="btn-group">
          <button class="btn btn-copy" onclick="copyCode(this)">Copy</button>
          <button class="btn btn-run" onclick="runCodeInCompiler(this)">Run ▶</button>
        </div>
      </div>
      <pre><code class="language-python"># మన మొదటి ప్రొఫెషనల్ పైథాన్ 3 ప్రోగ్రామ్!
# తెలుగు మరియు యూనికోడ్ స్ట్రింగ్స్ నేరుగా సపోర్ట్ అవుతాయి

# 1. సరళమైన ప్రింట్ స్టేట్‌మెంట్
print("నమస్కారం! పైథాన్ 3 మాస్టర్‌క్లాస్‌కు స్వాగతం! 🚀")

# 2. వేరియబుల్స్ మరియు మల్టీ-లైన్ ప్రింటింగ్
mentor_name = "Our Compiler Team"
course_edition = 2026
total_chapters = 25

print("-" * 55)
print("కోర్సు వివరాలు:")
print("బోధకులు:", mentor_name)
print("ఎడిషన్:", course_edition)
print("మొత్తం పాఠాలు:", total_chapters)
print("-" * 55)
print("✅ మొదటి ప్రోగ్రామ్ విజయవంతంగా రన్ అయ్యింది!")
</code></pre>
    </div>

    <!-- SECTION 9 -->
    <h2 class="section-title"><span class="num">9</span> <code>print()</code> ఫంక్షన్ అంతర్గత నిర్మాణం (Deep Dive into print)</h2>
    <p>
      పైథాన్‌లో అత్యంత ప్రాథమిక ఫంక్షన్ అయిన <code>print()</code> వెనుక ఎంతో లోతైన ఇంజనీరింగ్ ఉంది. పైథాన్ అధికారిక డాక్యుమెంటేషన్ ప్రకారం దీని పూర్తి సిగ్నేచర్:
    </p>
    <div style="background:#0f172a; padding:10px 16px; border-radius:6px; font-family:'JetBrains Mono', monospace; font-size:13px; color:#38bdf8; margin-bottom:16px;">
      print(*objects, sep=' ', end='\\n', file=sys.stdout, flush=False)
    </div>

    <ul>
      <li><code>*objects</code>: మీరు ప్రింట్ చేయదలచిన ఎన్ని వస్తువులనైనా కామాలతో వేరుచేసి పంపవచ్చు.</li>
      <li><code>sep</code> (Separator): బహుళ వస్తువుల మధ్య డిఫాల్ట్‌గా స్పేస్ (<code>' '</code>) వస్తుంది. దీనిని మనకు కావలసిన క్యారెక్టర్ (ఉదా: <code>'-'</code> లేదా <code>' | '</code>) తో మార్చవచ్చు.</li>
      <li><code>end</code> (End Character): ప్రతి <code>print()</code> చివర డిఫాల్ట్‌గా కొత్త లైన్ (<code>\\n</code>) వస్తుంది. దీన్ని <code>end=''</code> గా మారిస్తే తర్వాతి అవుట్‌పుట్ అదే లైన్‌లో కంటిన్యూ అవుతుంది!</li>
      <li><code>flush</code>: బఫరింగ్ లేకుండా డేటాను వెంటనే స్క్రీన్‌పై చూపించాలా వద్దా అని నిర్ణయిస్తుంది. లైవ్ డౌన్‌లోడ్ ప్రోగ్రెస్ బార్లలో ఇది చాలా ముఖ్యం.</li>
    </ul>

    <!-- CODE BLOCK 2 -->
    <div class="code-block">
      <div class="code-header">
        <span class="file-name">02_print_deep_dive.py</span>
        <div class="btn-group">
          <button class="btn btn-copy" onclick="copyCode(this)">Copy</button>
          <button class="btn btn-run" onclick="runCodeInCompiler(this)">Run ▶</button>
        </div>
      </div>
      <pre><code class="language-python"># print() ఫంక్షన్ లోని sep మరియు end పారామీటర్ల మ్యాజిక్

# 1. డిఫాల్ట్ సెపరేటర్ vs కస్టమ్ సెపరేటర్
print("హైదరాబాద్", "విజయవాడ", "విశాఖపట్నం") # డిఫాల్ట్ స్పేస్
print("హైదరాబాద్", "విజయవాడ", "విశాఖపట్నం", sep=" -> ") # కస్టమ్ ఆరో
print("2026", "11", "02", sep="/") # తేదీ ఫార్మాటింగ్

# 2. డిఫాల్ట్ end=\\n ని మార్చి ఒకే లైన్‌లో ప్రింట్ చేయడం
print("డేటా లోడ్ అవుతోంది", end="...")
print("పూర్తయింది! ✅")

# 3. ప్రోగ్రెస్ బార్ సిమ్యులేషన్ (end=' ' మరియు sep వాడకం)
print("కౌంట్‌డౌన్: ", end="")
for i in [3, 2, 1]:
    print(i, end=".. ")
print("BLAST OFF! 🚀")
</code></pre>
    </div>

    <!-- SECTION 10 -->
    <h2 class="section-title"><span class="num">10</span> పైథాన్ స్క్రిప్ట్ ఎగ్జిక్యూషన్ మోడ్స్ (Execution Modes &amp; __name__)</h2>
    <p>
      పైథాన్ ప్రోగ్రామ్‌లను రన్ చేయడానికి మూడు ప్రధాన పద్ధతులు ఉంటాయి:
    </p>
    <ul>
      <li><strong>1. డైరెక్ట్ స్క్రిప్ట్ ఎగ్జిక్యూషన్:</strong> <code>python app.py</code> ద్వారా ఫైల్‌ను నేరుగా పిలవడం.</li>
      <li><strong>2. మాడ్యూల్ మోడ్ (<code>-m</code> Flag):</strong> <code>python -m http.server</code> లేదా <code>python -m pip install numpy</code> ద్వారా పైథాన్ లైబ్రరీ పాత్ నుండి ఎగ్జిక్యూట్ చేయడం.</li>
      <li><strong>3. <code>if __name__ == '__main__':</code> గార్డ్రైల్:</strong> పైథాన్‌లో ఒక ఫైల్ నేరుగా రన్ అవుతోందా లేదా వేరే ఫైల్ లోకి ఇంపోర్ట్ అవుతోందా అని తెలుసుకోవడానికి ఈ స్పెషల్ వేరియబుల్ వాడతారు. ఈ ఫండమెంటల్ మనం రాసే ప్రతి ప్రొఫెషనల్ పైథాన్ అప్లికేషన్‌లో కనిపిస్తుంది.</li>
    </ul>

    <!-- SECTION 11 -->
    <h2 class="section-title"><span class="num">11</span> బిగినర్స్ ఎదుర్కొనే సాధారణ ఎర్రర్లు &amp; పరిష్కారాలు (Common Gotchas)</h2>
    <p>
      పైథాన్‌ను కొత్తగా ప్రారంభించిన విద్యార్థులు తరచుగా చేసే పొరపాట్లు మరియు వాటి తక్షణ పరిష్కారాలు:
    </p>

    <div class="tbl-wrap">
      <table class="tbl">
        <thead>
          <tr>
            <th>సాధారణ ఎర్రర్ (Error)</th>
            <th>కారణం (Root Cause)</th>
            <th>పరిష్కారం (Quick Fix)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>'python' is not recognized</code></td>
            <td>ఇన్‌స్టాల్ చేసేటప్పుడు "Add to PATH" టిక్ చేయకపోవడం.</td>
            <td>ఇన్‌స్టాలర్‌ను మళ్లీ రన్ చేసి Modify క్లిక్ చేసి "Add to PATH" ఎనేబుల్ చేయండి.</td>
          </tr>
          <tr>
            <td><code>SyntaxError: Missing parentheses in call to 'print'</code></td>
            <td>Python 2 శైలిలో <code>print "hi"</code> అని బ్రాకెట్లు లేకుండా రాయడం.</td>
            <td>Python 3 లో ఎల్లప్పుడూ <code>print("hi")</code> అని బ్రాకెట్లలోనే ఉంచాలి.</td>
          </tr>
          <tr>
            <td><strong>Module Shadowing Trap</strong></td>
            <td>మీ స్వంత ఫైల్‌కి <code>random.py</code>, <code>math.py</code>, <code>email.py</code> అని పేర్లు పెట్టడం!</td>
            <td>బిల్ట్-ఇన్ లైబ్రరీ పేర్లను మీ ఫైళ్లకు పెట్టకూడదు. <code>my_random.py</code> అని పెట్టుకోండి.</td>
          </tr>
          <tr>
            <td><code>IndentationError: unexpected indent</code></td>
            <td>ఒక లైన్‌లో 4 స్పేస్‌లు, మరొక లైన్‌లో ట్యాబ్ (Tab) కలపడం.</td>
            <td>VS Code లో ఎల్లప్పుడూ 4 Spaces ఫార్మాట్‌ను ఎంచుకోండి. స్పేస్‌లు, ట్యాబ్‌లు ఎప్పుడూ కలపవద్దు!</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- SECTION 12 -->
    <h2 class="section-title"><span class="num">12</span> ప్రొడక్షన్ బెస్ట్ ప్రాక్టీసెస్: PEP 8 స్టైల్ గైడ్ పునాది (PEP 8 Foundations)</h2>
    <p>
      పైథాన్ కమ్యూనిటీ ప్రపంచంలో అత్యంత క్రమశిక్షణ కలిగిన కమ్యూనిటీ. కోడ్ ఎలా రాయాలో నియంత్రించే అధికారిక నిబంధనావళిని <strong>PEP 8 (Python Enhancement Proposal 8)</strong> అంటారు.
    </p>
    <ul>
      <li><strong>ఇండెంటేషన్:</strong> ప్రతి బ్లాక్ లోపలికి వెళ్ళేటప్పుడు ఖచ్చితంగా <strong>4 స్పేస్‌లు (4 Spaces)</strong> మాత్రమే వాడాలి.</li>
      <li><strong>వేరియబుల్స్ &amp; ఫంక్షన్ల పేర్లు:</strong> స్నేక్‌కేస్ (snake_case) వాడాలి. ఉదాహరణకు: <code>student_score</code>, <code>calculate_tax()</code>.</li>
      <li><strong>కాన్‌స్టాంట్స్ (స్థిర విలువలు):</strong> అన్ని పెద్ద అక్షరాలు (UPPER_CASE) వాడాలి. ఉదాహరణకు: <code>MAX_RETRIES = 5</code>, <code>PI = 3.14159</code>.</li>
      <li><strong>లైన్ పరిమితి:</strong> ఒక లైన్ గరిష్టంగా 79 నుండి 88 అక్షరాలకు మించకూడదు (Readable line length).</li>
    </ul>

    <!-- SECTION 13 -->
    <h2 class="section-title"><span class="num">13</span> అధ్యాయం 1 మినీ ప్రాజెక్ట్: System Telemetry &amp; Student Welcome Engine</h2>
    <p>
      ఈ మొదటి అధ్యాయంలో మీరు నేర్చుకున్న అన్ని అంశాలను (చరిత్ర, సిస్టమ్ స్పెక్స్, ప్లాట్‌ఫామ్, యూనికోడ్ స్ట్రింగ్స్, print ఫంక్షన్ ఫార్మాటింగ్) కలగలిపి — ఒక పూర్తి స్థాయి <strong>System Telemetry &amp; Student Welcome Engine</strong> ను నిర్మిద్దాం!
    </p>

    <!-- CODE BLOCK 3: MINI PROJECT -->
    <div class="code-block">
      <div class="code-header">
        <span class="file-name">03_system_welcome_engine.py</span>
        <div class="btn-group">
          <button class="btn btn-copy" onclick="copyCode(this)">Copy</button>
          <button class="btn btn-run" onclick="runCodeInCompiler(this)">Run ▶</button>
        </div>
      </div>
      <pre><code class="language-python"># =====================================================================
# చాప్టర్ 01 మినీ ప్రాజెక్ట్: System Telemetry & Student Enrollment Welcome Engine
# కాన్సెప్ట్స్: sys, platform, datetime, formatted print, sep, end, Unicode
# =====================================================================

import sys
import platform
import datetime

def display_welcome_banner():
    divider = "=" * 65
    print(divider)
    print("   🐍 PYTHON 3 MASTERCLASS (2026 EDITION) — OUR COMPILER")
    print("           స్టూడెంట్ ఎన్‌రోల్‌మెంట్ & సిస్టమ్ డయాగ్నోస్టిక్స్ ఇంజిన్")
    print(divider)

def audit_system_environment():
    print("\\n[1. హోస్ట్ సిస్టమ్ టెలిమెట్రీ & రన్‌టైమ్ ఆడిట్]:")
    
    # సిస్టమ్ వివరాలను సేకరించడం
    os_name = platform.system()
    os_release = platform.release()
    arch = platform.machine()
    python_ver = sys.version.split()[0]
    compiler_impl = platform.python_implementation()

    print("  • ఆపరేటింగ్ సిస్టమ్ :", os_name, os_release, f"({arch})", sep=" ")
    print("  • పైథాన్ వెర్షన్     :", python_ver, f"[{compiler_impl} రన్‌టైమ్]", sep=" ")
    print("  • బైట్‌కోడ్ ఎగ్జిక్యూషన్:", "CPython PVM Active ✅", sep=" ")

def register_student(student_name, course_goal):
    print("\\n[2. స్టూడెంట్ ఎన్‌రోల్‌మెంట్ బ్యాడ్జ్ జనరేషన్]:")
    enrollment_time = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    print("+" + "-" * 63 + "+")
    print("|", "🎓 అధికారిక లెర్నర్ ఐడెంటిటీ కార్డ్".center(57), "|")
    print("+" + "-" * 63 + "+")
    print(f"|  విద్యార్థి పేరు     : {student_name:<38} |")
    print(f"|  కెరీర్ లక్ష్యం       : {course_goal:<38} |")
    print(f"|  ఎన్‌రోల్‌మెంట్ తేదీ : {enrollment_time:<38} |")
    print(f"|  సిలబస్ ప్రణాళిక    : 25 సమగ్ర అధ్యాయాలు (Phase 1 to 5)       |")
    print(f"|  యాక్సెస్ స్టేటస్    : LIFETIME FREE ACCESS (తెలుగులో) ✅        |")
    print("+" + "-" * 63 + "+")

def main():
    display_welcome_banner()
    audit_system_environment()
    
    # స్టూడెంట్ స్వాగత బ్యాడ్జ్ ప్రింటింగ్
    register_student(
        student_name="బాలాజీ (భవిష్యత్ పైథాన్ డెవలపర్)",
        course_goal="AI & Full-Stack Python Mastery"
    )

    print("\\n🚀 అభినందనలు! మీరు పైథాన్ మొదటి అధ్యాయాన్ని విజయవంతంగా పూర్తి చేసారు!")
    print("తర్వాతి అధ్యాయంలో 'సింటాక్స్, ఇండెంటేషన్ & కామెంట్స్' లోతుగా నేర్చుకుందాం!\\n")

if __name__ == "__main__":
    main()
</code></pre>
    </div>

    <!-- 5 COLLAPSIBLE QUIZZES -->
    <h2 class="section-title"><span class="num">★</span> ఈ అధ్యాయంపై ప్రాక్టీస్ క్విజ్ (Knowledge Check)</h2>

    <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px 18px; margin-bottom:12px; cursor:pointer;">
      <summary style="font-weight:700; color:#10b981; font-size:14.5px;">1. పైథాన్ అనేది Compiled ఆ లేక Interpreted ఆ?</summary>
      <div style="font-size:13.5px; color:var(--text); margin-top:10px; line-height:1.7;">
        <strong>సమాధానం:</strong> పైథాన్ రెండూ చేస్తుంది! ముందుగా CPython కంపైలర్ సోర్స్ కోడ్ (.py) ను ప్లాట్‌ఫామ్-ఇండిపెండెంట్ <strong>బైట్‌కోడ్ (.pyc)</strong> గా కంపైల్ చేస్తుంది. ఆ తర్వాత <strong>Python Virtual Machine (PVM)</strong> అనే ఇంటర్‌ప్రీటర్ ఇంజిన్ ఆ బైట్‌కోడ్‌ను లైన్ల వారీగా మెషిన్ కోడ్‌గా మార్చి రన్ చేస్తుంది.
      </div>
    </details>

    <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px 18px; margin-bottom:12px; cursor:pointer;">
      <summary style="font-weight:700; color:#10b981; font-size:14.5px;">2. Python 2 లో 5 / 2 కి మరియు Python 3 లో 5 / 2 కి తేడా ఏమిటి?</summary>
      <div style="font-size:13.5px; color:var(--text); margin-top:10px; line-height:1.7;">
        <strong>సమాధానం:</strong> Python 2 లో <code>5 / 2</code> చేస్తే కేవలం పూర్ణాంక భాగం మాత్రమే వచ్చి <strong>2</strong> వచ్చేది (దశాంశ విలువ పోయేది). కానీ ఆధునిక Python 3 లో ట్రూ డివిజన్ (True Division) జరిగి ఖచ్చితమైన ఫ్లోట్ ఫలితం <strong>2.5</strong> వస్తుంది! పూర్ణాంక భాగం మాత్రమే కావాలంటే Python 3 లో ఫ్లోర్ డివిజన్ ఆపరేటర్ <code>5 // 2</code> వాడాలి.
      </div>
    </details>

    <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px 18px; margin-bottom:12px; cursor:pointer;">
      <summary style="font-weight:700; color:#10b981; font-size:14.5px;">3. print("A", "B", "C", sep="-", end="*") అని రన్ చేస్తే అవుట్‌పుట్ ఏమి వస్తుంది?</summary>
      <div style="font-size:13.5px; color:var(--text); margin-top:10px; line-height:1.7;">
        <strong>సమాధానం:</strong> <code>A-B-C*</code> వస్తుంది!<br/>
        <em>వివరణ:</em> <code>sep="-"</code> ఉండటం వల్ల మూడు అక్షరాల మధ్య హైఫన్ వస్తుంది. <code>end="*"</code> ఉండటం వల్ల సాధారణ కొత్త లైన్ (\\n) రాకుండా చివర నక్షత్రం (*) మాత్రమే ప్రింట్ అయ్యి అదే లైన్‌లో ఆగుతుంది.
      </div>
    </details>

    <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px 18px; margin-bottom:12px; cursor:pointer;">
      <summary style="font-weight:700; color:#10b981; font-size:14.5px;">4. మీ పైథాన్ ప్రోగ్రామ్ ఫైల్‌కు 'random.py' లేదా 'math.py' అని పేరు పెడితే ఏమి ప్రమాదం జరుగుతుంది?</summary>
      <div style="font-size:13.5px; color:var(--text); margin-top:10px; line-height:1.7;">
        <strong>సమాధానం:</strong> దీనినే <strong>Module Shadowing</strong> అంటారు! పైథాన్ ఏదైనా లైబ్రరీని ఇంపోర్ట్ చేసుకునేటప్పుడు ముందుగా ప్రస్తుత డైరెక్టరీలో ఆ పేరుతో ఫైల్ ఉందేమో చూస్తుంది. మీ ఫైల్ పేరు <code>random.py</code> అని ఉంటే, పైథాన్ స్టాండర్డ్ లైబ్రరీని వదిలేసి మీ ఫైల్‌నే ఇంపోర్ట్ చేసుకుని <code>AttributeError</code> ఇస్తుంది. అందుకే బిల్ట్-ఇన్ మాడ్యూల్ పేర్లను మన స్క్రిప్ట్‌లకు పెట్టకూడదు.
      </div>
    </details>

    <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px 18px; margin-bottom:12px; cursor:pointer;">
      <summary style="font-weight:700; color:#10b981; font-size:14.5px;">5. పైథాన్ ఇన్‌స్టాలేషన్ సమయంలో 'Add python.exe to PATH' ఎందుకు తప్పనిసరిగా ఎంచుకోవాలి?</summary>
      <div style="font-size:13.5px; color:var(--text); margin-top:10px; line-height:1.7;">
        <strong>సమాధానం:</strong> PATH అనేది ఆపరేటింగ్ సిస్టమ్ యొక్క ఎన్విరాన్‌మెంట్ వేరియబుల్. PATH లో పైథాన్ డైరెక్టరీ చిరునామా ఉంటేనే మీరు కమాండ్ ప్రాంప్ట్ (CMD), PowerShell, లేదా VS Code టెర్మినల్ లో ఎక్కడి నుండైనా <code>python</code> మరియు <code>pip</code> కమాండ్లను నేరుగా రన్ చేయగలరు. లేకపోతే 'python is not recognized' అనే ఎర్రర్ వస్తుంది.
      </div>
    </details>

    <!-- PREV / NEXT NAVIGATION -->
    <div style="display:flex; justify-content:space-between; align-items:center; margin-top:40px; padding-top:20px; border-top:1px solid var(--border); flex-wrap:wrap; gap:16px;">
      <a href="/blog-python.html" style="text-decoration:none; color:var(--text); font-weight:600; display:inline-flex; align-items:center; gap:8px; background:var(--bg2); padding:10px 18px; border-radius:8px; border:1px solid var(--border);">
        ⚡ Python Course HOME (ఇండెక్స్)
      </a>
      <a href="/blog-python/02-python-syntax-indentation-and-comments.html" style="text-decoration:none; color:#ffffff; font-weight:700; display:inline-flex; align-items:center; gap:8px; background:#10b981; padding:10px 22px; border-radius:8px; box-shadow:0 4px 12px rgba(16,185,129,0.3);">
        తర్వాతి అధ్యాయం: 2. సింటాక్స్ &amp; ఇండెంటేషన్ →
      </a>
    </div>

    <!-- INTERACTIVE COMPILER CTA CARD -->
    <div style="margin-top:40px; background:linear-gradient(135deg, rgba(16,185,129,0.1) 0%, rgba(56,189,248,0.1) 100%); border:1px solid rgba(16,185,129,0.3); border-radius:12px; padding:24px; text-align:center;">
      <h3 style="margin-top:0; color:var(--text); font-size:20px;">ఈ ప్రాజెక్ట్‌ను లైవ్‌గా మన పైథాన్ కంపైలర్‌లో రన్ చేయండి!</h3>
      <p style="color:var(--text2); max-width:650px; margin:8px auto 20px; font-size:14px; line-height:1.6;">
        ఎటువంటి లోకల్ సెటప్ లేకుండా, బ్రౌజర్‌లోనే నేరుగా Modern Python 3 కంపైలర్‌లో ఈ వెల్‌కమ్ ఇంజిన్ కోడ్‌ను ఎగ్జిక్యూట్ చేసి రన్‌టైమ్ అవుట్‌పుట్‌ను తనిఖీ చేయండి.
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
# చాప్టర్ 01 మినీ ప్రాజెక్ట్: System Telemetry & Student Enrollment Welcome Engine
# =====================================================================

import sys
import platform
import datetime

print("=" * 60)
print("   🐍 PYTHON 3 MASTERCLASS (2026 EDITION) — OUR COMPILER")
print("           స్టూడెంట్ ఎన్‌రోల్‌మెంట్ & సిస్టమ్ డయాగ్నోస్టిక్స్ ఇంజిన్")
print("=" * 60)

print("\\n[1. హోస్ట్ సిస్టమ్ వివరాలు]:")
print("  • OS:", platform.system(), platform.release())
print("  • పైథాన్ వెర్షన్:", sys.version.split()[0])
print("  • రన్‌టైమ్ ఇంజిన్:", platform.python_implementation())

print("\\n[2. లెర్నర్ ఐడెంటిటీ బ్యాడ్జ్]:")
name = "బాలాజీ (భవిష్యత్ పైథాన్ మాస్టర్)"
goal = "AI & Full-Stack Python Mastery"
now = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

print(f"  • విద్యార్థి పేరు   : {name}")
print(f"  • నేర్చుకునే లక్ష్యం : {goal}")
print(f"  • సమయం              : {now}")
print(f"  • కోర్సు ప్రణాళిక    : 25 సమగ్ర అధ్యాయాలు (Phase 1 to 5)")

print("\\n🎉 కంగ్రాట్స్! మొదటి పైథాన్ పాఠం విజయవంతంగా పూర్తయింది! 🚀")
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
fs.writeFileSync(outputPath, chapter01Content, 'utf8');
console.log('✅ Successfully generated deep high-value Python Chapter 01 in exact HTML style!');
console.log('Target file:', currentLesson.file);
console.log('Target file size:', chapter01Content.length, 'characters');
