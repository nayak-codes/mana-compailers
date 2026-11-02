const fs = require('fs');
const path = require('path');
const { LESSONS, buildPythonSidebar } = require('./python_curriculum_data.js');

const currentLesson = LESSONS[15]; // Chapter 16 (0-indexed 15)
const sidebarHtml = buildPythonSidebar(16);

const chapter16Content = `<!DOCTYPE html>
<html class="light-theme" lang="te">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${currentLesson.title} — Python 3 Tutorial | Our Compiler</title>
  <meta name="description" content="Python 3 ఫంక్షన్స్ ఫండమెంటల్స్ & ఆర్గ్యుమెంట్స్ సమగ్ర తెలుగు గైడ్: def కీవర్డ్, Call Stack Frames, return స్టేట్‌మెంట్, Positional vs Keyword Arguments, Mutable Default Parameter ట్రాప్, Python 3.8+ Positional-Only (/) & Keyword-Only (*), Type Hints, మరియు Enterprise Payroll Engine ప్రాజెక్ట్." />
  <meta name="keywords" content="python functions in telugu, python def return telugu, python positional keyword arguments telugu, python mutable default argument trap, learn python in telugu, our compiler" />
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
    "headline": "${currentLesson.title} (Complete Guide to Python Functions and Arguments in Telugu)",
    "description": "Python 3 ఫంక్షన్స్ పూర్తి గైడ్: def సింటాక్స్, పారామీటర్లు vs ఆర్గ్యుమెంట్స్, return స్టేట్‌మెంట్, Positional & Keyword Arguments, Mutable Default Trap, Type Hints, మరియు Enterprise Payroll Engine.",
    "articleSection": "Phase 04: ఫంక్షన్స్, మాడ్యూల్స్ & ఫైల్ I/O",
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
    "datePublished": "2026-01-26",
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
        'abs','open','help','dir','filter','bool'
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

<!-- Site Navigation Placeholder -->
<div id="site-nav-placeholder"></div>

<!-- Layout Container -->
<div class="layout">

  <!-- Single Sidebar Component -->
  ${sidebarHtml}

  <!-- Main Content Area -->
  <main class="content">

    <!-- BREADCRUMBS -->
    <div class="breadcrumb" style="display:flex; align-items:center; gap:6px; font-size:12.5px; color:var(--text2); margin-bottom:16px;">
      <a href="/" style="color:var(--text2); text-decoration:none;">Home</a>
      <span class="sep">›</span>
      <a href="/tutorials" style="color:var(--text2); text-decoration:none;">Tutorials</a>
      <span class="sep">›</span>
      <a href="/blog-python/" style="color:var(--text2); text-decoration:none;">Python Masterclass</a>
      <span class="sep">›</span>
      <span style="color:var(--text); font-weight:600;">Chapter 16: ${currentLesson.title}</span>
    </div>

    <!-- MAIN PAGE TITLE -->
    <h1 class="page-title" style="font-size:32px; font-weight:800; color:var(--text); margin-bottom:14px; line-height:1.25;">
      ${currentLesson.title}
    </h1>

    <!-- 4 PAGE META BADGES -->
    <div class="page-meta" style="display:flex; flex-wrap:wrap; gap:10px; margin-bottom:20px; font-size:12.5px;">
      <span style="background:rgba(16,185,129,0.12); color:#10b981; padding:4px 12px; border-radius:20px; font-weight:600; display:inline-flex; align-items:center; gap:5px;">
        🌐 Modern Python 3.12+
      </span>
      <span style="background:rgba(59,130,246,0.12); color:#3b82f6; padding:4px 12px; border-radius:20px; font-weight:600; display:inline-flex; align-items:center; gap:5px;">
        📖 Chapter 16 of 25
      </span>
      <span style="background:rgba(245,158,11,0.12); color:#f59e0b; padding:4px 12px; border-radius:20px; font-weight:600; display:inline-flex; align-items:center; gap:5px;">
        📁 Phase 04: ఫంక్షన్స్, మాడ్యూల్స్ &amp; ఫైల్ I/O
      </span>
      <span style="background:rgba(139,92,246,0.12); color:#8b5cf6; padding:4px 12px; border-radius:20px; font-weight:600; display:inline-flex; align-items:center; gap:5px;">
        🗓️ 2026 Edition
      </span>
    </div>

    <!-- COVERED PILL -->
    <div style="background:var(--bg2); border:1px solid var(--border); border-radius:10px; padding:12px 18px; margin-bottom:24px; font-size:13.5px; color:var(--text2); line-height:1.6;">
      <strong style="color:var(--text); font-weight:700;">📌 Covered in this chapter:</strong>
      ${currentLesson.subtopics} · Call Stack &amp; Activation Frames · return Statements &amp; Early Exits · Positional vs Keyword Arguments · The Infamous Mutable Default Parameter Trap · Modern Python 3.8+ Positional-Only (/) &amp; Keyword-Only (*) · Type Annotations (PEP 484) · Enterprise Payroll Engine Project
    </div>

    <!-- WARM SOFT IVORY INTRO BOX -->
    <div class="intro-box" style="background:#fffdf7; border:1px solid #fef3c7; border-left:4px solid #f59e0b; border-radius:10px; padding:20px 24px; margin-bottom:30px; font-size:15px; color:#451a03; line-height:1.75;">
      మీరు రాసే పైథాన్ స్క్రిప్ట్ వందల లైన్ల నుండి వేల లైన్లకు పెరిగినప్పుడు, ఒకే లాజిక్‌ను పదే పదే కాపీ-పేస్ట్ చేయడం కోడ్‌ను అస్తవ్యస్తంగా మారుస్తుంది. ఏదైనా ఒక చిన్న ఫార్ములా మారినా సరే, స్క్రిప్ట్ మొత్తం వెతికి డజన్ల కొద్దీ చోట్ల మాన్యువల్‌గా మార్చాల్సి వస్తుంది. సాఫ్ట్‌వేర్ ఇంజనీరింగ్‌లో ఈ సమస్యను అధిగమించడానికి ఉన్న అత్యున్నత సూత్రం — <strong>DRY (Don't Repeat Yourself)</strong>!
      <br/><br/>
      ఈ DRY సిద్ధాంతానికి అసలైన ప్రాణం పోసేది <strong>ఫంక్షన్స్ (Functions)</strong>. ఒక పెద్ద సంక్లిష్టమైన సమస్యను చిన్న చిన్న స్వతంత్ర భాగాలుగా విభజించి, ఒకే కోడ్‌ను ఎన్ని వేల సార్లైనా నిశ్చింతగా పునర్వినియోగించుకునే అద్భుతమైన సామర్థ్యం ఫంక్షన్ల సొంతం. పైథాన్‌లో ఫంక్షన్స్ కేవలం స్టేట్‌మెంట్ల సమూహం మాత్రమే కాదు — అవి <strong>First-Class Citizens</strong>! అంటే వేరియబుల్స్ లాగే ఫంక్షన్లను ఇతర ఫంక్షన్లకు పాస్ చేయవచ్చు, వేరియబుల్స్‌లో స్టోర్ చేయవచ్చు. ఈ అధ్యాయంలో మనం <code>def</code> సింటాక్స్ నుండి కాల్ స్టాక్ ఫ్రేమ్‌ల అంతర్గత పనితీరు, ప్రమాదకరమైన మ్యూటబుల్ డిఫాల్ట్ బగ్, పైథాన్ 3.8+ పొజిషనల్-ఓన్లీ సింటాక్స్, మరియు కార్పొరేట్ ఉద్యోగుల జీతాలను లెక్కించే పూర్తి స్థాయి ఎంటర్‌ప్రైజ్ పేరోల్ ఇంజిన్ వరకు సమగ్రంగా నేర్చుకుందాం!
    </div>

    <!-- SECTION 1 -->
    <h2 class="section-title"><span class="num">1</span> ఫంక్షన్ అంటే ఏమిటి? (What is a Function in Python?)</h2>
    <p>
      పైథాన్‌లో <strong>ఫంక్షన్ (Function)</strong> అనేది ఒక నిర్దిష్టమైన పనిని (Specific Task) పూర్తి చేయడానికి రూపొందించబడిన, పేరు పెట్టబడిన కోడ్ బ్లాక్. అవసరమైనప్పుడు దానికి డేటాను ఇన్‌పుట్‌గా పంపవచ్చు, అది ఆ డేటాను ప్రాసెస్ చేసి మనకు కావలసిన ఫలితాన్ని (Output) తిరిగి అందిస్తుంది.
    </p>
    <p>
      <strong>ఫంక్షన్ల ప్రధాన ప్రయోజనాలు:</strong>
    </p>
    <ul>
      <li><strong>కోడ్ పునర్వినియోగం (Reusability):</strong> ఒక లాజిక్‌ను ఒక్కసారి మాత్రమే రాస్తాము, కానీ ప్రాజెక్ట్‌లో అవసరమైన చోటల్లా పేరుతో పిలిచి (Call) ఎన్నిసార్లైనా వాడుకోవచ్చు.</li>
      <li><strong>మాడ్యులారిటీ &amp; నిర్వహణ సౌలభ్యం (Modularity &amp; Maintainability):</strong> పెద్ద అప్లికేషన్‌ను చిన్న చిన్న స్వతంత్ర భాగాలుగా విభజించడం వల్ల బగ్‌లను గుర్తించడం మరియు సరిచేయడం చాలా సులభం అవుతుంది.</li>
      <li><strong>టెస్టింగ్ &amp; డీబగ్గింగ్:</strong> ప్రతి ఫంక్షన్‌ను విడివిడిగా యూనిట్ టెస్టింగ్ (Unit Testing) చేయవచ్చు.</li>
    </ul>

    <!-- SECTION 2 -->
    <h2 class="section-title"><span class="num">2</span> CPython లో ఫంక్షన్ ఎలా పనిచేస్తుంది? (Call Stack &amp; Frames)</h2>
    <p>
      మీరు ఒక ఫంక్షన్‌ను కాల్ చేసినప్పుడు CPython అంతర్గతంగా ఆపరేటింగ్ సిస్టమ్ మెమరీలో <strong>కాల్ స్టాక్ (Call Stack)</strong> పై ఒక ప్రత్యేకమైన <strong>స్టాక్ ఫ్రేమ్ (Stack Frame / Activation Record)</strong> ను సృష్టిస్తుంది.
    </p>
    <ul>
      <li><strong>లోకల్ వేరియబుల్స్ ఐసోలేషన్:</strong> ఫంక్షన్ లోపల సృష్టించిన వేరియబుల్స్ ఆ స్టాక్ ఫ్రేమ్‌లో మాత్రమే ఉంటాయి. బయట ప్రపంచానికి అవి కనిపించవు (ఎన్‌క్యాప్సులేషన్).</li>
      <li><strong>ఫంక్షన్ రిటర్న్ కాగానే మెమరీ క్లీనప్:</strong> ఫంక్షన్ పని పూర్తి కాగానే లేదా <code>return</code> స్టేట్‌మెంట్ తగలగానే ఆ స్టాక్ ఫ్రేమ్ స్టాక్ నుండి పాప్ (Pop) అయిపోతుంది. అందులోని లోకల్ వేరియబుల్స్ మెమరీ నుండి తక్షణమే విడుదలవుతాయి.</li>
    </ul>

    <div style="background:#0f172a; border:1px solid #1e293b; border-radius:8px; padding:18px; margin:18px 0; font-family:'JetBrains Mono', monospace; font-size:13px; color:#f8fafc; line-height:1.6;">
      <div style="color:#10b981; font-weight:700; margin-bottom:8px;">[CPython Call Stack Frame Flow]</div>
      main_script()  ──▶  Calls calculate_tax(salary=75000)<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;│<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;▼ PUSH Frame onto Call Stack<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;┌─────────────────────────────────────────────────────────┐<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;│ Frame: calculate_tax()                                  │<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;│ Local Variables: { salary: 75000, rate: 0.10, tax: 7500 }│<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;│ Return Value: 7500                                      │<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;└─────────────────────────────────────────────────────────┘<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;│<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;▼ POP Frame from Call Stack (Memory Freed!)<br/>
      main_script()  ◀── Receives 7500 and Continues! ⚡
    </div>

    <!-- SECTION 3 -->
    <h2 class="section-title"><span class="num">3</span> ఫంక్షన్ డిక్లరేషన్ &amp; సింటాక్స్ (The <code>def</code> Keyword)</h2>
    <p>
      పైథాన్‌లో ఫంక్షన్‌ను డిక్లేర్ చేయడానికి <strong><code>def</code></strong> (define కు సంక్షిప్త రూపం) కీవర్డ్‌ను ఉపయోగిస్తాము.
    </p>
    <p>
      <strong>ప్రాథమిక సింటాక్స్:</strong>
    </p>
    <div style="background:#0f172a; padding:12px 18px; border-radius:6px; font-family:'JetBrains Mono', monospace; font-size:12.5px; color:#38bdf8; margin:10px 0; line-height:1.6;">
      def function_name(parameter_1, parameter_2):<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;"""ఐచ్ఛికమైన డాక్యుమెంటేషన్ స్ట్రింగ్ (Docstring)"""<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;# ఫంక్షన్ బాడీ (4-స్పేస్ ఇండెంటేషన్ తప్పనిసరి)<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;return result
    </div>
    <p>
      <strong>ముఖ్యమైన నియమాలు:</strong> ఫంక్షన్ పేరు తప్పనిసరిగా వేరియబుల్ నామకరణ నియమాలను పాటించాలి (చిన్న అక్షరాలు, పదాల మధ్య అండర్‌స్కోర్ — snake_case). పారాంథసిస్ <code>()</code> చివర కాలన్ <code>:</code> ఉండటం తప్పనిసరి.
    </p>

    <!-- SECTION 4 -->
    <h2 class="section-title"><span class="num">4</span> పారామీటర్లు (Parameters) vs ఆర్గ్యుమెంట్స్ (Arguments)</h2>
    <p>
      ఈ రెండు పదాలను బిగినర్స్ తరచూ ఒకే అర్థంలో వాడుతుంటారు, కానీ వాటి మధ్య చాలా స్పష్టమైన సాంకేతిక వ్యత్యాసం ఉంది:
    </p>

    <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin:16px 0;">
      <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px;">
        <h4 style="margin-top:0; color:#3b82f6; font-size:14.5px;">1. పారామీటర్లు (Parameters)</h4>
        <p style="font-size:13px; color:var(--text2); line-height:1.6; margin:6px 0;">
          ఫంక్షన్‌ను <strong>డిఫైన్ (నిర్వచించేటప్పుడు)</strong> బ్రాకెట్లలో రాసే ప్లేస్‌హోల్డర్ వేరియబుల్స్.
        </p>
        <code style="display:block; background:#0f172a; color:#93c5fd; padding:8px 12px; border-radius:6px; font-size:12px;">
          def greet(user_name): # user_name is Parameter<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;print(f"హలో, {user_name}!")
        </code>
      </div>
      <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px;">
        <h4 style="margin-top:0; color:#10b981; font-size:14.5px;">2. ఆర్గ్యుమెంట్స్ (Arguments)</h4>
        <p style="font-size:13px; color:var(--text2); line-height:1.6; margin:6px 0;">
          ఫంక్షన్‌ను <strong>కాల్ (పిలిచేటప్పుడు)</strong> వాస్తవంగా లోపలికి పంపే అసలైన విలువలు లేదా డేటా.
        </p>
        <code style="display:block; background:#0f172a; color:#86efac; padding:8px 12px; border-radius:6px; font-size:12px;">
          greet("కళ్యాణ్") # "కళ్యాణ్" is Argument
        </code>
      </div>
    </div>

    <!-- SECTION 5 -->
    <h2 class="section-title"><span class="num">5</span> return స్టేట్‌మెంట్ &amp; ఎర్లీ ఎగ్జిట్ (Early Return Guard Clauses)</h2>
    <p>
      ఫంక్షన్ తన లెక్కింపు పూర్తయిన తర్వాత ఫలితాన్ని పిలిచిన చోటుకి తిరిగి పంపడానికి <strong><code>return</code></strong> స్టేట్‌మెంట్‌ను ఉపయోగిస్తుంది.
    </p>
    <ul>
      <li><strong>రిటర్న్ తగలగానే ఫంక్షన్ ఆగిపోతుంది:</strong> <code>return</code> స్టేట్‌మెంట్ ఎగ్జిక్యూట్ అయిన తక్షణమే ఆ ఫంక్షన్ ఎగ్జిక్యూషన్ ముగుస్తుంది. దాని క్రింద ఎన్ని లైన్ల కోడ్ ఉన్నా అవి రన్ కావు.</li>
      <li><strong>ఇంప్లిసిట్ <code>return None</code>:</strong> ఒక ఫంక్షన్‌లో మీరు ఎటువంటి <code>return</code> స్టేట్‌మెంట్ రాయకపోతే, ఫంక్షన్ ముగింపులో పైథాన్ తెరవెనుక స్వయంచాలకంగా <code>return None</code> ను అమర్చుతుంది!</li>
      <li><strong>గార్డ్ క్లాజ్ ప్యాటర్న్ (Early Exit Guard Clauses):</strong> నెస్టెడ్ if-else లు రాయడానికి బదులుగా, తప్పుడు ఇన్‌పుట్స్ రాగానే వెంటనే ఫంక్షన్ నుండి బయటకు రావడం క్లీన్ కోడింగ్ పద్ధతి:
        <div style="background:#0f172a; padding:10px 16px; border-radius:6px; font-family:'JetBrains Mono', monospace; font-size:12.5px; color:#38bdf8; margin:6px 0;">
          def withdraw_money(balance, amount):<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;if amount &lt;= 0: return "తప్పుడు అమౌంట్!" # Guard 1<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;if amount &gt; balance: return "తగినంత బ్యాలెన్స్ లేదు!" # Guard 2<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;return balance - amount # హ్యాపీ పాత్!
        </div>
      </li>
    </ul>

    <!-- SECTION 6 -->
    <h2 class="section-title"><span class="num">6</span> మల్టిపుల్ రిటర్న్స్ (Multiple Returns via Tuples)</h2>
    <p>
      C లేదా Java వంటి భాషల్లో ఒక ఫంక్షన్ కేవలం ఒకే ఒక విలువను మాత్రమే రిటర్న్ చేయగలదు. కానీ పైథాన్‌లో కామాలతో వేరుచేసి ఎన్ని విలువలనైనా ఒకేసారి రిటర్న్ చేయవచ్చు!
    </p>
    <p>
      తెరవెనుక పైథాన్ వాటన్నింటినీ ఒక <strong>ఇమ్మ్యుటబుల్ టుపుల్ (Tuple)</strong> గా ప్యాక్ చేసి రిటర్న్ చేస్తుంది. కాలర్ సైడ్ వాటిని నేరుగా అన్‌ప్యాక్ చేసుకోవచ్చు:
    </p>
    <div style="background:#0f172a; padding:10px 16px; border-radius:6px; font-family:'JetBrains Mono', monospace; font-size:12.5px; color:#38bdf8; margin:8px 0; line-height:1.6;">
      def calculate_min_max(numbers):<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;return min(numbers), max(numbers), sum(numbers) # టుపుల్ రిటర్న్<br/><br/>
      lowest, highest, total = calculate_min_max([10, 45, 92, 18])<br/>
      print(f"కనిష్టం: {lowest}, గరిష్టం: {highest}, మొత్తం: {total}")
    </div>

    <!-- SECTION 7 -->
    <h2 class="section-title"><span class="num">7</span> పొజిషనల్ వర్సెస్ కీవర్డ్ ఆర్గ్యుమెంట్స్ (Positional vs Keyword)</h2>
    <p>
      ఫంక్షన్‌కు ఆర్గ్యుమెంట్లను పంపేటప్పుడు రెండు ముఖ్యమైన మార్గాలు ఉన్నాయి:
    </p>
    <ul>
      <li><strong>1. పొజిషనల్ ఆర్గ్యుమెంట్స్ (Positional Arguments):</strong> ఆర్గ్యుమెంట్లు పంపిన వరుస క్రమాన్ని బట్టి పారామీటర్లలోకి వెళ్తాయి. వరుస మారితే అర్థం మారిపోతుంది:
        <code>create_user("రాము", "admin")</code> &rarr; పేరు "రాము", రోల్ "admin".
      </li>
      <li><strong>2. కీవర్డ్ ఆర్గ్యుమెంట్స్ (Keyword Arguments):</strong> పారామీటర్ పేరును స్పష్టంగా పేర్కొంటూ ఆర్గ్యుమెంట్లను పంపుతాము. దీనివల్ల వరుస క్రమంతో పనిలేదు, కోడ్ చాలా రీడబుల్‌గా ఉంటుంది:
        <code>create_user(role="admin", user_name="రాము")</code>
      </li>
      <li><strong>గోల్డెన్ సింటాక్స్ రూల్:</strong> ఒకే కాల్‌లో రెండింటినీ వాడేటప్పుడు, <strong>పొజిషనల్ ఆర్గ్యుమెంట్లు ఎల్లప్పుడూ కీవర్డ్ ఆర్గ్యుమెంట్ల కంటే ముందే ఉండాలి!</strong> <code>func(a=1, 2)</code> అని రాస్తే <code>SyntaxError: positional argument follows keyword argument</code> వస్తుంది.</li>
    </ul>

    <!-- SECTION 8 -->
    <h2 class="section-title"><span class="num">8</span> డిఫాల్ట్ పారామీటర్లు &amp; The Mutable Default Parameter Trap ⚠️</h2>
    <p>
      ఒక ఫంక్షన్ కాల్ చేసేటప్పుడు కొన్ని ఆర్గ్యుమెంట్లు ఇవ్వకపోయినా పనిచేసేలా వాటికి <strong>డిఫాల్ట్ విలువలు (Default Values)</strong> కేటాయించవచ్చు:
    </p>
    <div style="background:#0f172a; padding:10px 16px; border-radius:6px; font-family:'JetBrains Mono', monospace; font-size:12.5px; color:#38bdf8; margin:6px 0;">
      def connect_server(host="localhost", port=5432):<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;print(f"Connecting to {host}:{port}...")
    </div>

    <div style="background:rgba(239,68,68,0.08); border-left:4px solid #ef4444; padding:16px 20px; border-radius:6px; margin:18px 0; font-size:13.5px; line-height:1.7;">
      <strong style="color:#ef4444; font-size:15px;">⚠️ పైథాన్‌లో అత్యంత ప్రమాదకరమైన బగ్: Mutable Default Argument Trap!</strong><br/>
      పైథాన్‌లో డిఫాల్ట్ ఆర్గ్యుమెంట్స్ ఫంక్షన్ కాల్ అయిన ప్రతిసారీ కాకుండా, <strong>ఫంక్షన్ డిఫైన్ అయినప్పుడు కేవలం ఒక్కసారి మాత్రమే</strong> మెమరీలో క్రియేట్ చేయబడతాయి!
      <br/><br/>
      కాబట్టి మీరు డిఫాల్ట్ విలువగా ఒక లిస్ట్ <code>[]</code> లేదా డిక్షనరీ <code>{}</code> ని పెడితే — ఆ ఫంక్షన్ కాల్స్ అన్నింటి మధ్య ఆ లిస్ట్ పంచుకోబడుతుంది! ఒక కాల్‌లో చేర్చిన ఎలిమెంట్ తర్వాతి కాల్స్‌లో కూడా అలాగే మిగిలిపోయి డేటా కరప్ట్ అవుతుంది!
      <br/><br/>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-top:8px;">
        <div style="background:#0f172a; padding:10px; border-radius:6px; color:#fca5a5; font-family:'JetBrains Mono', monospace; font-size:11.5px;">
          # ❌ ప్రమాదకరమైన తప్పు:<br/>
          def add_task(task, tasks=[]):<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;tasks.append(task)<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;return tasks
        </div>
        <div style="background:#0f172a; padding:10px; border-radius:6px; color:#86efac; font-family:'JetBrains Mono', monospace; font-size:11.5px;">
          # ✅ ప్రొడక్షన్ పరిష్కారం (None Idiom):<br/>
          def add_task(task, tasks=None):<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;if tasks is None:<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;tasks = []<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;tasks.append(task)<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;return tasks
        </div>
      </div>
    </div>

    <!-- SECTION 9 -->
    <h2 class="section-title"><span class="num">9</span> కోడ్ డెమో 1: లైవ్ బ్యాంకింగ్ ట్రాన్సాక్షన్స్ &amp; క్యాలిక్యులేషన్స్</h2>
    <p>
      పారామీటర్లు, కీవర్డ్ ఆర్గ్యుమెంట్లు, మరియు సేఫ్ డిఫాల్ట్ పారామీటర్లను ఉపయోగించి బ్యాంకింగ్ లావాదేవీల ఫంక్షన్‌ను పరిశీలిద్దాం:
    </p>

    <!-- CODE BLOCK 1 -->
    <div class="code-block">
      <div class="code-header">
        <span class="file-name">01_banking_functions_demo.py</span>
        <div class="btn-group">
          <button class="btn btn-copy" onclick="copyCode(this)">Copy</button>
          <button class="btn btn-run" onclick="runCodeInCompiler(this)">Run ▶</button>
        </div>
      </div>
      <pre><code class="language-python"># =====================================================================
# చాప్టర్ 16 డెమో 1: ఫంక్షన్స్, గార్డ్ క్లాజ్ & సేఫ్ డిఫాల్ట్ పారామీటర్లు
# =====================================================================

def calculate_simple_interest(principal: float, rate_pct: float = 7.5, tenure_years: int = 1):
    """సాధారణ వడ్డీ మరియు మెచ్యూరిటీ మొత్తాన్ని లెక్కిస్తుంది."""
    if principal <= 0 or tenure_years <= 0:
        return 0.0, 0.0  # Guard clause for invalid inputs

    interest = (principal * rate_pct * tenure_years) / 100.0
    total_maturity = principal + interest
    return round(interest, 2), round(total_maturity, 2)

# 1. డిఫాల్ట్ వడ్డీ రేటుతో కాల్ చేయడం (Positional)
interest_1, total_1 = calculate_simple_interest(100000, tenure_years=3)
print(f"డిపాజిట్: ₹1,00,000 | వడ్డీ: ₹{interest_1:,.2f} | మొత్తం: ₹{total_1:,.2f}")

# 2. కీవర్డ్ ఆర్గ్యుమెంట్లతో కస్టమ్ వడ్డీ రేటు ఇవ్వడం
interest_2, total_2 = calculate_simple_interest(rate_pct=8.2, principal=250000, tenure_years=5)
print(f"డిపాజిట్: ₹2,50,000 | వడ్డీ: ₹{interest_2:,.2f} | మొత్తం: ₹{total_2:,.2f}")
</code></pre>
    </div>

    <!-- SECTION 10 -->
    <h2 class="section-title"><span class="num">10</span> Modern Python 3.5+ Type Hints &amp; PEP 484</h2>
    <p>
      పైథాన్ డైనమిక్ టైప్డ్ లాంగ్వేజ్ అయినప్పటికీ, పెద్ద కార్పొరేట్ ప్రాజెక్టులలో కోడ్ క్వాలిటీ మరియు ఎడిటర్ ఆటోకంప్లీషన్ కోసం <strong>Type Hints</strong> ప్రామాణికంగా మారాయి.
    </p>
    <div style="background:#0f172a; padding:12px 18px; border-radius:6px; font-family:'JetBrains Mono', monospace; font-size:12.5px; color:#38bdf8; margin:10px 0; line-height:1.6;">
      # Type Annotations ఉదాహరణ:<br/>
      def calculate_gst(amount: float, rate: float = 0.18) -&gt; float:<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;"""రెండు ఫ్లోట్ విలువలను తీసుకుని ఫ్లోట్ ఫలితాన్ని ఇస్తుంది."""<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;return round(amount * rate, 2)
    </div>
    <p>
      గుర్తుంచుకోండి: టైప్ హింట్స్ రన్‌టైమ్‌లో ఎర్రర్స్ ఇవ్వవు (పైథాన్ స్పీడ్ తగ్గదు), కానీ <code>mypy</code> లేదా VS Code వంటి టూల్స్ ద్వారా కోడ్ రన్ అవ్వకముందే బగ్‌లను పట్టుకోవడానికి ఎంతగానో తోడ్పడతాయి.
    </p>

    <!-- SECTION 11 -->
    <h2 class="section-title"><span class="num">11</span> Python 3.8+ Positional-Only (<code>/</code>) &amp; Keyword-Only (<code>*</code>)</h2>
    <p>
      పైథాన్ 3.8 లో API డిజైనర్ల కోసం సరికొత్త పారామీటర్ రూల్స్ ప్రవేశపెట్టబడ్డాయి:
    </p>
    <ul>
      <li><strong>స్లాష్ (<code>/</code>) కి ఎడమవైపు ఉన్నవి Positional-Only:</strong> వీటిని కాల్ చేసేటప్పుడు కీవర్డ్ రూపంలో (పేరుతో) పంపలేము! కేవలం విలువను మాత్రమే పంపాలి (ఉదా: <code>len()</code> లాగా).</li>
      <li><strong>స్టార్ (<code>*</code>) కి కుడివైపు ఉన్నవి Keyword-Only:</strong> వీటిని కాల్ చేసేటప్పుడు తప్పనిసరిగా పేరుతో మాత్రమే పంపాలి (పొజిషనల్‌గా పంపితే ఎర్రర్).</li>
    </ul>

    <!-- CODE BLOCK 2 -->
    <div class="code-block">
      <div class="code-header">
        <span class="file-name">02_positional_and_keyword_only.py</span>
        <div class="btn-group">
          <button class="btn btn-copy" onclick="copyCode(this)">Copy</button>
          <button class="btn btn-run" onclick="runCodeInCompiler(this)">Run ▶</button>
        </div>
      </div>
      <pre><code class="language-python"># Modern Python 3.8+ API డిజైన్ ప్యాటర్న్
# a, b -> Positional-Only (/)
# c    -> Standard (పొజిషనల్ లేదా కీవర్డ్ ఏదైనా కావచ్చు)
# key  -> Keyword-Only (*)
def secure_transfer(sender_acc, amount, /, note="NEFT", *, auth_token):
    print(f"బదిలీ ఖాతా : {sender_acc} | మొత్తం : ₹{amount}")
    print(f"వివరణ      : {note} | టోకెన్ : {auth_token}")

# సరైన కాల్:
secure_transfer("ACC-101", 50000, "ఫీజు చెల్లింపు", auth_token="SEC-9981")

# తప్పుడు కాల్స్ (రన్ చేస్తే ఎర్రర్స్ వస్తాయి):
# secure_transfer(sender_acc="ACC-101", amount=50000, auth_token="SEC-9981") # TypeError: Positional-only!
# secure_transfer("ACC-101", 50000, "ఫీజు", "SEC-9981") # TypeError: Keyword-only auth_token needed!
</code></pre>
    </div>

    <!-- SECTION 12 -->
    <h2 class="section-title"><span class="num">12</span> కామన్ బిగినర్స్ మిస్టేక్స్ &amp; ప్రొడక్షన్ బెస్ట్ ప్రాక్టీసెస్</h2>
    <ul>
      <li><strong>Mistake 1: ఫంక్షన్ కాల్‌లో పారాంథసిస్ మర్చిపోవడం:</strong> <code>x = calculate_tax</code> అని రాస్తే ఫంక్షన్ ఎగ్జిక్యూట్ కాదు; కేవలం ఫంక్షన్ ఆబ్జెక్ట్ రిఫరెన్స్ మాత్రమే అసైన్ అవుతుంది! ఫంక్షన్‌ను రన్ చేయడానికి తప్పనిసరిగా బ్రాకెట్లు పెట్టాలి: <code>x = calculate_tax()</code>.</li>
      <li><strong>Mistake 2: డిఫాల్ట్ ఆర్గ్యుమెంట్లలో లిస్ట్/డిక్ట్ వాడటం:</strong> పైన వివరించిన Mutable Default Parameter ట్రాప్‌లో పడకుండా ఎల్లప్పుడూ <code>None</code> ను డిఫాల్ట్‌గా పెట్టి ఫంక్షన్ లోపల కొత్త కలెక్షన్‌ను ప్రారంభించండి.</li>
      <li><strong>Mistake 3: రిటర్న్ వాల్యూ తీసుకోకుండా ప్రింట్ చేయడం:</strong> <code>None</code> రిటర్న్ చేసే ఫంక్షన్‌ను వేరియబుల్‌లో పెట్టి వాడుకోవాలని చూడటం.</li>
      <li><strong>Best Practice: సింగిల్ రెస్పాన్సిబిలిటీ ప్రిన్సిపల్ (SRP):</strong> ఒక ఫంక్షన్ కేవలం ఒకే ఒక్క పనిని మాత్రమే సమర్థవంతంగా చేయాలి. జీతం లెక్కించడం మరియు డేటాబేస్‌లో సేవ్ చేయడం రెండూ ఒకే ఫంక్షన్‌లో కలపకండి.</li>
      <li><strong>Best Practice: Docstrings రాయడం:</strong> ఫంక్షన్ మొదటి లైన్‌లో <code>"""Docstring"""</code> రాయడం వల్ల మీ ఫంక్షన్‌ను వాడుకునే ఇతర డెవలపర్లకు హెల్ప్ టూల్‌టిప్స్ కనిపిస్తాయి.</li>
    </ul>

    <!-- SECTION 13 -->
    <h2 class="section-title"><span class="num">13</span> రియల్-వరల్డ్ ప్రాజెక్ట్: "Enterprise Payroll &amp; Salary Calculation Engine"</h2>
    <p>
      ఈ పదహారవ అధ్యాయంలో నేర్చుకున్న అన్ని ఫంక్షన్ కాన్సెప్టులను (def, Type Hints, మల్టిపుల్ రిటర్న్స్, గార్డ్ క్లాజెస్, కీవర్డ్ ఆర్గ్యుమెంట్స్, క్యాలిక్యులేషన్ మాడ్యులారిటీ) అనుసంధానిస్తూ — కార్పొరేట్ ఉద్యోగుల జీతాలు, అలవెన్సులు, పన్నులు మరియు టేక్-హోమ్ శాలరీని లెక్కించే పూర్తి స్థాయి <strong>Enterprise Payroll &amp; Salary Calculation Engine</strong> ను నిర్మిద్దాం!
    </p>

    <!-- CODE BLOCK 3: CAPSTONE MINI PROJECT -->
    <div class="code-block">
      <div class="code-header">
        <span class="file-name">03_enterprise_payroll_engine.py</span>
        <div class="btn-group">
          <button class="btn btn-copy" onclick="copyCode(this)">Copy</button>
          <button class="btn btn-run" onclick="runCodeInCompiler(this)">Run ▶</button>
        </div>
      </div>
      <pre><code class="language-python"># =====================================================================
# చాప్టర్ 16 మినీ ప్రాజెక్ట్: Enterprise Payroll & Salary Calculation Engine
# కాన్సెప్ట్స్: Modular Functions, Type Annotations, Multiple Returns,
#             Guard Clauses, Keyword Arguments, Default Parameters
# =====================================================================

def calculate_allowances(basic_salary: float, metro_city: bool = True) -> tuple[float, float, float]:
    """HRA, DA, మరియు స్పెషల్ అలవెన్సులను లెక్కిస్తుంది."""
    hra_rate = 0.50 if metro_city else 0.40  # మెట్రో నగరాల్లో 50% HRA
    hra = basic_salary * hra_rate
    da = basic_salary * 0.15                  # 15% DA
    special_allowance = basic_salary * 0.20   # 20% Special Allowance
    return hra, da, special_allowance

def calculate_pf_deduction(basic_salary: float, pf_rate: float = 0.12) -> float:
    """ప్రావిడెంట్ ఫండ్ (PF) డిడక్షన్‌ను లెక్కిస్తుంది."""
    return round(basic_salary * pf_rate, 2)

def calculate_income_tax(annual_gross: float) -> float:
    """వార్షిక స్థూల జీతంపై ఆదాయపు పన్నును లెక్కిస్తుంది (కొత్త పన్ను విధానం)."""
    if annual_gross <= 700000:
        return 0.0  # ₹7 లక్షల వరకు పన్ను మినహాయింపు (Rebate)
    elif annual_gross <= 1000000:
        return (annual_gross - 700000) * 0.10
    elif annual_gross <= 1500000:
        return 30000 + (annual_gross - 1000000) * 0.15
    else:
        return 105000 + (annual_gross - 1500000) * 0.20

def generate_employee_payslip(
    emp_id: str,
    emp_name: str,
    designation: str,
    monthly_basic: float,
    *,
    is_metro: bool = True,
    performance_bonus: float = 0.0
) -> dict:
    """ఉద్యోగికి పూర్తి స్థాయి పేస్లిప్ డేటాను గణించి డిక్షనరీగా రిటర్న్ చేస్తుంది."""
    # గార్డ్ క్లాజ్: తప్పుడు శాలరీ చెక్
    if monthly_basic <= 0:
        return {"error": "తప్పుడు బేసిక్ శాలరీ!"}

    hra, da, special = calculate_allowances(monthly_basic, metro_city=is_metro)
    monthly_gross = monthly_basic + hra + da + special + performance_bonus

    pf_deduction = calculate_pf_deduction(monthly_basic)
    annual_gross = monthly_gross * 12
    annual_tax = calculate_income_tax(annual_gross)
    monthly_tax = round(annual_tax / 12.0, 2)

    total_deductions = pf_deduction + monthly_tax
    net_take_home = round(monthly_gross - total_deductions, 2)

    return {
        "emp_id": emp_id,
        "name": emp_name,
        "designation": designation,
        "basic": monthly_basic,
        "hra": hra,
        "da": da,
        "special": special,
        "bonus": performance_bonus,
        "gross": monthly_gross,
        "pf": pf_deduction,
        "tax": monthly_tax,
        "deductions": total_deductions,
        "net_pay": net_take_home
    }

def print_payslip_card(slip: dict):
    """అందమైన కార్పొరేట్ పేస్లిప్ ప్రింటింగ్."""
    print("\\n" + "=" * 70)
    print(f"{'💼 మన సాఫ్ట్‌వేర్ సొల్యూషన్స్ — అధికారిక శాలరీ స్లిప్ 2026':^70}")
    print("=" * 70)
    print(f"ఉద్యోగి ID   : {slip['emp_id']:<20} పేరు     : {slip['name']}")
    print(f"హోదా        : {slip['designation']:<20} జీతం నెల : అక్టోబర్ 2026")
    print("-" * 70)
    print(f"{'ఆర్జనలు (Earnings)':<35} | {'తగ్గింపులు (Deductions)':<30}")
    print("-" * 70)
    print(f"బేసిక్ శాలరీ      : ₹{slip['basic']:>10,.2f}  | ప్రావిడెంట్ ఫండ్ (PF) : ₹{slip['pf']:>10,.2f}")
    print(f"ఇంటి అద్దె (HRA)   : ₹{slip['hra']:>10,.2f}  | ప్రొఫెషనల్ ట్యాక్స్ (TDS): ₹{slip['tax']:>10,.2f}")
    print(f"కరువు భత్యం (DA)   : ₹{slip['da']:>10,.2f}  |")
    print(f"స్పెషల్ అలవెన్స్  : ₹{slip['special']:>10,.2f}  |")
    if slip['bonus'] > 0:
        print(f"పర్ఫార్మెన్స్ బోనస్ : ₹{slip['bonus']:>10,.2f}  |")
    print("-" * 70)
    print(f"మొత్తం స్థూల జీతం (Gross) : ₹{slip['gross']:>10,.2f}  | మొత్తం తగ్గింపులు   : ₹{slip['deductions']:>10,.2f}")
    print("=" * 70)
    print(f"👉 నికర చెల్లింపు (Net Take-Home Salary) : ₹{slip['net_pay']:>12,.2f} 💵")
    print("=" * 70 + "\\n")

# లైవ్ టెస్టింగ్
emp1_slip = generate_employee_payslip(
    emp_id="EMP-1044",
    emp_name="రాజేష్ వర్మ",
    designation="సీనియర్ క్లౌడ్ ఆర్కిటెక్ట్",
    monthly_basic=65000.0,
    is_metro=True,
    performance_bonus=15000.0
)

emp2_slip = generate_employee_payslip(
    emp_id="EMP-2091",
    emp_name="స్వప్న ప్రియ",
    designation="పైథాన్ డేటా ఇంజనీర్",
    monthly_basic=45000.0,
    is_metro=False
)

print_payslip_card(emp1_slip)
print_payslip_card(emp2_slip)
</code></pre>
    </div>

    <!-- 5 COLLAPSIBLE QUIZZES -->
    <h2 class="section-title"><span class="num">★</span> ఈ అధ్యాయంపై ప్రాక్టీస్ క్విజ్ (Knowledge Check)</h2>

    <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px 18px; margin-bottom:12px; cursor:pointer;">
      <summary style="font-weight:700; color:#10b981; font-size:14.5px;">1. పారామీటర్లు (Parameters) మరియు ఆర్గ్యుమెంట్స్ (Arguments) మధ్య తేడా ఏమిటి?</summary>
      <div style="font-size:13.5px; color:var(--text); line-height:1.7; margin-top:10px;">
        <strong>సమాధానం:</strong> ఫంక్షన్‌ను నిర్వచించేటప్పుడు (<code>def func(x, y):</code>) బ్రాకెట్లలో రాసే వేరియబుల్స్ <strong>పారామీటర్లు</strong>. ఫంక్షన్‌ను పిలిచేటప్పుడు (<code>func(10, 20)</code>) వాస్తవంగా లోపలికి పంపే అసలైన విలువలు <strong>ఆర్గ్యుమెంట్స్</strong>.
      </div>
    </details>

    <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px 18px; margin-bottom:12px; cursor:pointer;">
      <summary style="font-weight:700; color:#10b981; font-size:14.5px;">2. ఫంక్షన్‌లో ఎటువంటి return స్టేట్‌మెంట్ లేకపోతే అది ఏమి రిటర్న్ చేస్తుంది?</summary>
      <div style="font-size:13.5px; color:var(--text); line-height:1.7; margin-top:10px;">
        <strong>సమాధానం:</strong> ఫంక్షన్ చివరలో ఎటువంటి రిటర్న్ లేకపోతే పైథాన్ తెరవెనుక స్వయంచాలకంగా <code>return None</code> ను ఎగ్జిక్యూట్ చేస్తుంది. ఫలితంగా ఆ ఫంక్షన్ కాల్ విలువ <code>None</code> అవుతుంది.
      </div>
    </details>

    <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px 18px; margin-bottom:12px; cursor:pointer;">
      <summary style="font-weight:700; color:#10b981; font-size:14.5px;">3. def func(item, items=[]): అని రాయడం ఎందుకు తీవ్రమైన తప్పు?</summary>
      <div style="font-size:13.5px; color:var(--text); line-height:1.7; margin-top:10px;">
        <strong>సమాధానం:</strong> పైథాన్‌లో డిఫాల్ట్ ఆర్గ్యుమెంట్లు ఫంక్షన్ డిఫైన్ అయినప్పుడు కేవలం ఒక్కసారి మాత్రమే సృష్టించబడతాయి. మ్యూటబుల్ అయిన లిస్ట్‌ను డిఫాల్ట్‌గా పెడితే, తదుపరి ఫంక్షన్ కాల్స్ అన్నీ పాత లిస్ట్‌నే పంచుకుంటాయి. దీనిని అధిగమించడానికి ఎల్లప్పుడూ <code>items=None</code> పెట్టి, ఫంక్షన్ లోపల <code>if items is None: items = []</code> అని రాయాలి.
      </div>
    </details>

    <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px 18px; margin-bottom:12px; cursor:pointer;">
      <summary style="font-weight:700; color:#10b981; font-size:14.5px;">4. పైథాన్ 3.8 లో ప్రవేశపెట్టిన / మరియు * సింబల్స్ అర్థం ఏమిటి?</summary>
      <div style="font-size:13.5px; color:var(--text); line-height:1.7; margin-top:10px;">
        <strong>సమాధానం:</strong> <code>/</code> కి ముందున్న పారామీటర్లు <strong>Positional-Only</strong> (వాటిని పేరుతో పాస్ చేయలేము). <code>*</code> కి తర్వాత ఉన్న పారామీటర్లు <strong>Keyword-Only</strong> (వాటిని తప్పనిసరిగా పేరుతో మాత్రమే పాస్ చేయాలి).
      </div>
    </details>

    <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px 18px; margin-bottom:12px; cursor:pointer;">
      <summary style="font-weight:700; color:#10b981; font-size:14.5px;">5. పైథాన్‌లో ఒక ఫంక్షన్ నుండి ఒకేసారి బహుళ విలువలను ఎలా రిటర్న్ చేస్తాము?</summary>
      <div style="font-size:13.5px; color:var(--text); line-height:1.7; margin-top:10px;">
        <strong>సమాధానం:</strong> కామాలతో వేరుచేస్తూ <code>return a, b, c</code> అని రాయడం ద్వారా. తెరవెనుక పైథాన్ వాటన్నింటినీ ఒక టుపుల్ (Tuple) రూపంలో ప్యాక్ చేసి పంపుతుంది. కాల్ చేసిన చోట వాటిని వేర్వేరు వేరియబుల్స్‌లోకి తక్షణమే అన్‌ప్యాక్ చేసుకోవచ్చు.
      </div>
    </details>

    <!-- PREV / NEXT NAVIGATION -->
    <div style="display:flex; justify-content:space-between; align-items:center; margin-top:40px; padding-top:20px; border-top:1px solid var(--border); flex-wrap:wrap; gap:16px;">
      <a href="/blog-python/15-python-collections-advanced-structures.html" style="text-decoration:none; color:var(--text); font-weight:600; display:inline-flex; align-items:center; gap:8px; background:var(--bg2); padding:10px 18px; border-radius:8px; border:1px solid var(--border);">
        ← మునుపటి అధ్యాయం: 15. అడ్వాన్స్‌డ్ కలెక్షన్స్
      </a>
      <a href="/blog-python/17-python-args-kwargs-variable-scope.html" style="text-decoration:none; color:#ffffff; font-weight:700; display:inline-flex; align-items:center; gap:8px; background:#10b981; padding:10px 22px; border-radius:8px; box-shadow:0 4px 12px rgba(16,185,129,0.3);">
        తర్వాతి అధ్యాయం: 17. *args, **kwargs &amp; Scope →
      </a>
    </div>

    <!-- INTERACTIVE COMPILER CTA CARD -->
    <div style="margin-top:40px; background:linear-gradient(135deg, rgba(16,185,129,0.1) 0%, rgba(56,189,248,0.1) 100%); border:1px solid rgba(16,185,129,0.3); border-radius:12px; padding:24px; text-align:center;">
      <h3 style="margin-top:0; color:var(--text); font-size:20px;">ఈ Enterprise Payroll Engine ని లైవ్‌గా మన కంపైలర్‌లో రన్ చేయండి!</h3>
      <p style="color:var(--text2); max-width:650px; margin:8px auto 20px; font-size:14px; line-height:1.6;">
        ఎటువంటి లోకల్ సెటప్ లేకుండా, బ్రౌజర్‌లోనే Modern Python 3 కంపైలర్‌లో ఈ కోడ్‌ను ఎగ్జిక్యూట్ చేసి అవుట్‌పుట్ తనిఖీ చేయండి.
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
# చాప్టర్ 16 మినీ ప్రాజెక్ట్: Enterprise Payroll Engine (LIVE DEMO)
# =====================================================================
def calc_salary(name, basic, bonus=0.0):
    hra = basic * 0.40
    da = basic * 0.15
    gross = basic + hra + da + bonus
    pf = basic * 0.12
    net = gross - pf
    return {
        "name": name,
        "gross": gross,
        "pf": pf,
        "net": net
    }

print("=" * 60)
print(f"{'💼 అధికారిక ఉద్యోగుల శాలరీ స్లిప్ (LIVE)':^60}")
print("=" * 60)

res = calc_salary("రాజేష్ వర్మ", 65000, bonus=10000)
print(f"ఉద్యోగి  : {res['name']}")
print(f"స్థూల జీతం (Gross) : ₹{res['gross']:>10,.2f}")
print(f"పీఎఫ్ తగ్గింపు (PF) : ₹{res['pf']:>10,.2f}")
print(f"టేక్-హోమ్ శాలరీ  : ₹{res['net']:>10,.2f} 💵")
print("=" * 60)
print("\\n🎉 చాప్టర్ 16 ప్రాజెక్ట్ విజయవంతంగా రన్ అయ్యింది! 🚀")
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
fs.writeFileSync(outputPath, chapter16Content, 'utf8');
console.log('✅ Successfully generated deep high-value Python Chapter 16 in exact HTML style!');
console.log('Target file:', currentLesson.file);
console.log('Target file size:', chapter16Content.length, 'characters');
