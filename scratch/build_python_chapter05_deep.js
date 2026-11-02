const fs = require('fs');
const path = require('path');
const { LESSONS, buildPythonSidebar } = require('./python_curriculum_data.js');

const currentLesson = LESSONS[4]; // Chapter 05 (0-indexed 4)
const sidebarHtml = buildPythonSidebar(5);

const chapter05Content = `<!DOCTYPE html>
<html class="light-theme" lang="te">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${currentLesson.title} — Python 3 Tutorial | Our Compiler</title>
  <meta name="description" content="Python 3 ఆపరేటర్లు & ఎక్స్‌ప్రెషన్స్ సమగ్ర తెలుగు గైడ్: Arithmetic (+, -, *, /, //, %, **), Comparison & Chained Comparisons, Logical (and, or, not) Short-Circuiting, Assignment & Walrus (:=), Identity (is) vs Equality (==), Membership (in), Bitwise & Operator Precedence." />
  <meta name="keywords" content="python operators in telugu, python expressions telugu, python walrus operator telugu, python is vs == telugu, bitwise operators python telugu, learn python in telugu, our compiler" />
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
    "headline": "${currentLesson.title} (Complete Guide to Python Operators and Expressions in Telugu)",
    "description": "Python 3 ఆపరేటర్లు మరియు ఎక్స్‌ప్రెషన్స్ పూర్తి గైడ్: అర్థమెటిక్, రిలేషనల్, లాజికల్ షార్ట్-సర్క్యూట్, వాల్రస్ ఆపరేటర్, ఐడెంటిటీ, మెంబర్‌షిప్, బిట్‌వైజ్ మరియు ప్రెసిడెన్స్ రూల్స్.",
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
    "datePublished": "2026-01-19",
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
        'abs','open','help','dir','filter','bool','bin'
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
      <span>Chapter 5: ${currentLesson.title}</span>
    </div>

    <!-- PAGE TITLE -->
    <h1 class="page-title">${currentLesson.title}</h1>

    <!-- PAGE META BADGES -->
    <div class="page-meta">
      <span class="badge badge-tech">🐍 Modern Python (Python 3.12+)</span>
      <span class="badge badge-chapter">🎯 Chapter 5 of 25</span>
      <span class="badge badge-phase">🚀 Phase 01: పైథాన్ ఫండమెంటల్స్ &amp; బేసిక్స్</span>
      <span class="badge badge-edition">📅 2026 Edition</span>
    </div>

    <!-- COVERED TOPICS PILL BAR -->
    <div style="background:var(--bg3); border:1px solid var(--border); border-radius:10px; padding:12px 18px; margin-bottom:24px; font-size:13px; line-height:1.7;">
      <span style="color:#10b981; font-weight:700;">📌 Covered in this chapter:</span>
      <span style="color:var(--text2); margin-left:6px;">
        ఆపరేటర్ల వర్గీకరణ · అర్థమెటిక్ (+, -, *, /, //, %, **) · చైన్డ్ కంపారిజన్స్ · లాజికల్ షార్ట్-సర్క్యూటింగ్ (and, or, not) · కాంపౌండ్ అసైన్‌మెంట్ &amp; Walrus (:=) · ఐడెంటిటీ (is vs ==) · మెంబర్‌షిప్ (in, not in) · బిట్‌వైజ్ ఆపరేషన్లు &amp; బిట్-మాస్కింగ్ · ఆపరేటర్ ప్రెసిడెన్స్ &amp; అసోసియేటివిటీ · E-Commerce Pricing &amp; Loyalty Engine ప్రాజెక్ట్!
      </span>
    </div>

    <!-- INTRO BOX (Warm Soft Ivory HTML5 Style) -->
    <div class="intro-box">
      ప్రోగ్రామింగ్ భాషలో డేటాను నిల్వ చేయడం ఒక ఎత్తైతే, ఆ డేటాపై గణిత లెక్కలు చేయడం, లాజిక్‌ను సరిపోల్చడం మరియు సరైన నిర్ణయాలు తీసుకోవడం అసలైన ఇంజిన్ లాంటిది.
      పైథాన్‌లో ఆపరేటర్లు కేవలం సాధారణ <code>+</code> లేదా <code>-</code> మాత్రమే కావు; గణితంలో రాసినట్లే సహజంగా రాసే <strong>చైన్డ్ కంపారిజన్స్ (Chained Comparisons)</strong>, పెర్ఫార్మెన్స్‌ను పెంచే <strong>లాజికల్ షార్ట్-సర్క్యూటింగ్</strong>, మరియు పైథాన్ 3.8 లో వచ్చిన అధునాతన <strong>వాల్రస్ ఆపరేటర్ (:=)</strong> వంటి ఎన్నో అద్భుతమైన ఫీచర్లు పైథాన్‌ను ఇతర భాషల కంటే మరింత సొగసైనదిగా చేస్తాయి.
      ఈ ఐదవ అధ్యాయంతో మనం <strong>Phase 01: పైథాన్ ఫండమెంటల్స్ &amp; బేసిక్స్</strong> ను విజయవంతంగా పూర్తి చేయబోతున్నాం! 7 రకాల ఆపరేటర్ల లోతైన ఆర్కిటెక్చర్, మెమరీ పోలికలు, బిట్‌వైజ్ మాస్కింగ్, మరియు ఒక పూర్తి స్థాయి <strong>E-Commerce Dynamic Discount, Loyalty &amp; Tax Pricing Engine</strong> ద్వారా ఆపరేటర్లపై తిరుగులేని పట్టు సాధిద్దాం!
    </div>

    <!-- SECTION 1 -->
    <h2 class="section-title"><span class="num">1</span> పైథాన్ ఆపరేటర్లు అంటే ఏమిటి? (Operators &amp; Expressions Architecture)</h2>
    <p>
      ఒకటి లేదా అంతకంటే ఎక్కువ విలువలపై (Operands) ఒక నిర్దిష్ట గణిత లేదా లాజికల్ పనిని చేయడానికి ఉపయోగించే ప్రత్యేక చిహ్నాలను <strong>ఆపరేటర్లు (Operators)</strong> అంటారు.
      ఆపరేటర్లు మరియు ఆపరాండ్స్ కలయికతో ఏర్పడే ఫార్ములాను <strong>ఎక్స్‌ప్రెషన్ (Expression)</strong> అంటారు (ఉదా: <code>total = subtotal + (tax * 0.18)</code>).
    </p>

    <div class="tbl-wrap">
      <table class="tbl">
        <thead>
          <tr>
            <th>ఆపరేటర్ కేటగిరీ</th>
            <th>చిహ్నాలు (Symbols)</th>
            <th>ప్రయోజనం &amp; వివరణ</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>1. అర్థమెటిక్ (Arithmetic)</strong></td>
            <td><code>+</code>, <code>-</code>, <code>*</code>, <code>/</code>, <code>//</code>, <code>%</code>, <code>**</code></td>
            <td>కూడికలు, తీసివేతలు, భాగాహారాలు, శేషాలు మరియు ఘాతాలు (Powers).</td>
          </tr>
          <tr>
            <td><strong>2. కంపారిజన్ (Relational)</strong></td>
            <td><code>==</code>, <code>!=</code>, <code>&gt;</code>, <code>&lt;</code>, <code>&gt;=</code>, <code>&lt;=</code></td>
            <td>విలువలను సరిపోల్చి బూలియన్ (<code>True</code> లేదా <code>False</code>) ఇస్తుంది.</td>
          </tr>
          <tr>
            <td><strong>3. లాజికల్ (Logical)</strong></td>
            <td><code>and</code>, <code>or</code>, <code>not</code></td>
            <td>బహుళ షరతులను కలపడానికి (Short-circuit evaluation).</td>
          </tr>
          <tr>
            <td><strong>4. అసైన్‌మెంట్ (Assignment)</strong></td>
            <td><code>=</code>, <code>+=</code>, <code>-=</code>, <code>*=</code>, <code>/=</code>, <code>:=</code> (Walrus)</td>
            <td>వేరియబుల్స్‌కు విలువలని కేటాయించడం మరియు అక్కడికక్కడే అప్‌డేట్ చేయడం.</td>
          </tr>
          <tr>
            <td><strong>5. ఐడెంటిటీ (Identity)</strong></td>
            <td><code>is</code>, <code>is not</code></td>
            <td>రెండు వేరియబుల్స్ మెమరీలో ఒకే ఆబ్జెక్ట్‌ను పాయింట్ చేస్తున్నాయా లేదా అని తనిఖీ చేస్తుంది.</td>
          </tr>
          <tr>
            <td><strong>6. మెంబర్‌షిప్ (Membership)</strong></td>
            <td><code>in</code>, <code>not in</code></td>
            <td>స్ట్రింగ్, లిస్ట్ లేదా డిక్షనరీ వంటి సీక్వెన్స్‌లో ఎలిమెంట్ ఉందో లేదో వెతుకుతుంది.</td>
          </tr>
          <tr>
            <td><strong>7. బిట్‌వైజ్ (Bitwise)</strong></td>
            <td><code>&amp;</code>, <code>|</code>, <code>^</code>, <code>~</code>, <code>&lt;&lt;</code>, <code>&gt;&gt;</code></td>
            <td>డేటాను బైనరీ బిట్స్ (0s and 1s) స్థాయిలో ప్రాసెస్ చేస్తుంది.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- SECTION 2 -->
    <h2 class="section-title"><span class="num">2</span> అర్థమెటిక్ ఆపరేటర్లు (Arithmetic Operators — +, -, *, /, //, %, **)</h2>
    <p>
      పైథాన్‌లో అర్థమెటిక్ ఆపరేటర్లు అత్యంత సహజంగా ఉంటాయి. అయితే డివిజన్ విషయంలో పైథాన్ ప్రత్యేక నియమాలను కలిగి ఉంటుంది:
    </p>

    <ul>
      <li><strong>1. ట్రూ డివిజన్ (<code>/</code>):</strong> సాధారణ భాగాహారం. సంఖ్యలు నిశ్శేషంగా భాగించబడినప్పటికీ, పైథాన్ 3 లో ఇది <strong>ఎల్లప్పుడూ <code>float</code></strong> ఇస్తుంది!
        <br/>ఉదాహరణ: <code>10 / 2</code> అనేది <code>5.0</code> అవుతుంది (5 కాదు!).
      </li>
      <li><strong>2. ఫ్లోర్ డివిజన్ (<code>//</code> - Integer Division):</strong> ఫలితంలోని దశాంశాలను తొలగించి, పూర్ణాంక భాగాన్ని మాత్రమే ఇస్తుంది (Floor value).
        <br/>ఉదాహరణ: <code>10 // 3</code> విలువ <code>3</code>.
        <br/><em>జాగ్రత్త:</em> నెగటివ్ నంబర్లకు ఫ్లోరింగ్ ఎల్లప్పుడూ చిన్న సంఖ్య వైపు వెళ్తుంది: <code>-7 // 2</code> విలువ <code>-4</code> (ఎందుకంటే <code>-3.5</code> కంటే చిన్న పూర్ణాంకం <code>-4</code>).
      </li>
      <li><strong>3. మాడ్యులో (<code>%</code> - Remainder):</strong> భాగాహారం చేయగా మిగిలిన శేషాన్ని ఇస్తుంది.
        <br/>ఉదాహరణ: <code>14 % 4</code> విలువ <code>2</code>. సరి/బేసి సంఖ్యలను కనుగొనడానికి ఇది ఉపయోగపడుతుంది (<code>n % 2 == 0</code>).
      </li>
      <li><strong>4. ఎక్స్‌పోనెన్షియేషన్ (<code>**</code> - Power):</strong> ఘాతాంకాలను లెక్కించడానికి ప్రత్యేక సింబల్.
        <br/>ఉదాహరణ: <code>2 ** 10</code> విలువ <code>1024</code>. C/C++ లో దీని కోసం <code>pow()</code> ఫంక్షన్ వాడాలి, కానీ పైథాన్‌లో ఇన్-బిల్ట్ ఆపరేటర్ ఉంది!
      </li>
    </ul>

    <!-- SECTION 3 -->
    <h2 class="section-title"><span class="num">3</span> కోడ్ డెమో 1: అర్థమెటిక్ ఆపరేటర్లు &amp; మ్యాథమెటికల్ ప్రిసిషన్</h2>
    <p>
      ట్రూ డివిజన్, నెగటివ్ ఫ్లోర్ డివిజన్ మరియు భారీ ఎక్స్‌పోనెన్షియల్ లెక్కలను క్రింది కోడ్‌లో పరీక్షించండి:
    </p>

    <!-- CODE BLOCK 1 -->
    <div class="code-block">
      <div class="code-header">
        <span class="file-name">01_arithmetic_deep_dive.py</span>
        <div class="btn-group">
          <button class="btn btn-copy" onclick="copyCode(this)">Copy</button>
          <button class="btn btn-run" onclick="runCodeInCompiler(this)">Run ▶</button>
        </div>
      </div>
      <pre><code class="language-python"># పైథాన్ 3 అర్థమెటిక్ ఆపరేటర్ల లోతైన డెమో

a, b = 17, 5

print(f"సంఖ్యలు: a = {a}, b = {b}\\n")
print(f"కూడిక (Addition)         : a + b  = {a + b}")
print(f"తీసివేత (Subtraction)     : a - b  = {a - b}")
print(f"గుణకారం (Multiplication) : a * b  = {a * b}")
print(f"ట్రూ డివిజన్ (True Div)  : a / b  = {a / b} (Type: {type(a / b).__name__})")
print(f"ఫ్లోర్ డివిజన్ (Floor Div): a // b = {a // b} (Type: {type(a // b).__name__})")
print(f"శేషం (Modulo Remainder)  : a % b  = {a % b}")
print(f"పవర్ (Exponentiation)    : a ** b = {a ** b}")

# నెగటివ్ ఫ్లోర్ డివిజన్ ప్రవర్తన
neg_num, div = -17, 5
print(f"\\nనెగటివ్ ఫ్లోర్ డివిజన్ (-17 // 5): {neg_num // div}")  # Output: -4
print(f"నెగటివ్ మాడ్యులో (-17 % 5)       : {neg_num % div}")   # Output: 3

# భారీ ఘాతాంకాలు (2 పవర్ 64)
ram_bytes = 2 ** 64
print(f"\\n64-bit అడ్రస్ స్పేస్ గరిష్ట సైజు: {ram_bytes:,} బైట్స్")
</code></pre>
    </div>

    <!-- SECTION 4 -->
    <h2 class="section-title"><span class="num">4</span> కంపారిజన్ ఆపరేటర్లు &amp; చైన్డ్ కంపారిజన్స్ (Chained Comparisons)</h2>
    <p>
      రెండు విలువల మధ్య సంబంధాన్ని పోల్చడానికి కంపారిజన్ (రిలేషనల్) ఆపరేటర్లను వాడతాము: <code>==</code>, <code>!=</code>, <code>&gt;</code>, <code>&lt;</code>, <code>&gt;=</code>, <code>&lt;=</code>.
      ఫలితం ఎల్లప్పుడూ <code>True</code> లేదా <code>False</code> గా ఉంటుంది.
    </p>

    <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #10b981; border-radius:8px; padding:16px; margin:18px 0;">
      <div style="font-weight:700; color:#10b981; margin-bottom:8px;">🌟 పైథాన్ సూపర్-పవర్: చైన్డ్ కంపారిజన్స్ (Chained Comparisons)</div>
      <p style="font-size:13.5px; color:var(--text); line-height:1.7; margin-bottom:8px;">
        సాధారణంగా C++ లేదా Java లో ఒక విద్యార్థి వయస్సు 18 నుండి 25 మధ్య ఉందో లేదో చూడాలంటే ఇలా రాయాలి:
        <br/><code>if (age &gt;= 18 &amp;&amp; age &lt;= 25)</code>
      </p>
      <p style="font-size:13.5px; color:var(--text); line-height:1.7; margin-bottom:0;">
        కానీ పైథాన్‌లో గణిత పుస్తకాల్లో రాసినట్లే నేరుగా ఇలా రాయవచ్చు:
        <br/><code>if 18 &lt;= age &lt;= 25:</code>
        <br/>పైథాన్ అంతర్గతంగా దీన్ని <code>(18 &lt;= age) and (age &lt;= 25)</code> లాగా మారుస్తుంది. ఇది కోడ్ రీడబిలిటీని అద్భుతంగా పెంచుతుంది!
      </p>
    </div>

    <!-- SECTION 5 -->
    <h2 class="section-title"><span class="num">5</span> లాజికల్ ఆపరేటర్లు &amp; షార్ట్-సర్క్యూట్ ఇవాల్యుయేషన్ (and, or, not)</h2>
    <p>
      ఇతర భాషల్లో లాగా <code>&amp;&amp;</code>, <code>||</code>, <code>!</code> కాకుండా, పైథాన్‌లో ఇంగ్లీష్ పదాలు <strong><code>and</code></strong>, <strong><code>or</code></strong>, <strong><code>not</code></strong> లను వాడతాము:
    </p>

    <ul>
      <li><strong><code>and</code>:</strong> ఇచ్చిన అన్ని షరతులు True అయితేనే మొత్తం ఫలితం True. ఏదైనా ఒక్కటి False అయినా ఫలితం False.</li>
      <li><strong><code>or</code>:</strong> ఇచ్చిన షరతులలో ఏ ఒక్కటి True అయినా ఫలితం True. అన్నీ False అయితేనే False.</li>
      <li><strong><code>not</code>:</strong> ఫలితాన్ని తిరగరాస్తుంది (Negation: <code>not True -&gt; False</code>, <code>not False -&gt; True</code>).</li>
    </ul>

    <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #38bdf8; border-radius:8px; padding:16px; margin:18px 0;">
      <div style="font-weight:700; color:#38bdf8; margin-bottom:8px;">⚡ షార్ట్-సర్క్యూట్ ఇవాల్యుయేషన్ (Short-Circuit Evaluation):</div>
      <p style="font-size:13.5px; color:var(--text); line-height:1.7; margin-bottom:8px;">
        పైథాన్ సమయాన్ని ఆదా చేయడానికి మొత్తం ఎక్స్‌ప్రెషన్‌ను లెక్కించదు:
      </p>
      <ul style="font-size:13px; color:var(--text2); line-height:1.8; margin-left:20px; margin-bottom:0;">
        <li><code>A and B</code> లో: <code>A</code> కనుక False అయితే, <code>B</code> ని అస్సలు రన్ చేయదు (ఎందుకంటే ఫలితం ఎలాగూ False కాబట్టి!).</li>
        <li><code>A or B</code> లో: <code>A</code> కనుక True అయితే, <code>B</code> ని అస్సలు పరీక్షించదు (ఎందుకంటే ఫలితం ఎలాగూ True కాబట్టి!).</li>
        <li><strong>డిఫాల్ట్ ఫాల్‌బ్యాక్ ట్రిక్:</strong> <code>user_display_name = input_name or "Guest User"</code> (యూజర్ పేరు ఇవ్వకపోతే Falsy అవుతుంది కాబట్టి "Guest User" అసైన్ అవుతుంది!).</li>
      </ul>
    </div>

    <!-- SECTION 6 -->
    <h2 class="section-title"><span class="num">6</span> అసైన్‌మెంట్ &amp; కాంపౌండ్ ఆపరేటర్లు + వాల్రస్ ఆపరేటర్ (:=)</h2>
    <p>
      ఒక వేరియబుల్ విలువను అప్‌డేట్ చేయడానికి కాంపౌండ్ (Augmented) అసైన్‌మెంట్ ఆపరేటర్లను ఉపయోగిస్తాము:
      <code>+=</code>, <code>-=</code>, <code>*=</code>, <code>/=</code>, <code>//=</code>, <code>%=</code>, <code>**=</code>.
      ఉదాహరణకు <code>count += 1</code> అనేది <code>count = count + 1</code> తో సమానం.
    </p>

    <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #8b5cf6; border-radius:8px; padding:16px; margin:18px 0;">
      <div style="font-weight:700; color:#8b5cf6; margin-bottom:8px;">🦭 ది వాల్రస్ ఆపరేటర్ (Walrus Operator <code>:=</code> — Python 3.8+ PEP 572):</div>
      <p style="font-size:13.5px; color:var(--text); line-height:1.7; margin-bottom:8px;">
        ఈ ఆపరేటర్ చూడటానికి వాల్రస్ జంతువు కళ్లు మరియు దంతాలలా (<code>:=</code>) ఉండటం వల్ల దీనికి ఆ పేరు వచ్చింది.
        దీని ప్రత్యేకత ఏమిటంటే: <strong>ఒక కండిషన్ లేదా ఎక్స్‌ప్రెషన్ లోపలే వేరియబుల్‌కు విలువను అసైన్ చేయడం మరియు వెంటనే పరీక్షించడం!</strong>
      </p>
      <div style="font-family:'JetBrains Mono', monospace; font-size:12.5px; background:rgba(139,92,246,0.1); padding:10px; border-radius:6px; color:var(--text);">
        # పాత విధానం (2 లైన్లు):<br/>
        msg = input("మెసేజ్ రాయండి: ")<br/>
        if len(msg) &gt; 10: print("చాలా పొడవైన మెసేజ్!")<br/><br/>
        # ఆధునిక వాల్రస్ విధానం (1 లైన్):<br/>
        if (n := len(msg := input("మెసేజ్ రాయండి: "))) &gt; 10:<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;print(f"మెసేజ్ పొడవు {n} అక్షరాలు, ఇది అనుమతించబడదు!")
      </div>
    </div>

    <!-- SECTION 7 -->
    <h2 class="section-title"><span class="num">7</span> కోడ్ డెమో 2: చైన్డ్ కంపారిజన్స్, షార్ట్-సర్క్యూట్ &amp; వాల్రస్ ఆపరేటర్</h2>
    <p>
      ఈ ఆధునిక పైథాన్ ఫీచర్లు నిజమైన ప్రొడక్షన్ కోడ్‌లో ఎలా సమయాన్ని ఆదా చేస్తాయో క్రింది ఉదాహరణలో చూడండి:
    </p>

    <!-- CODE BLOCK 2 -->
    <div class="code-block">
      <div class="code-header">
        <span class="file-name">02_chained_shortcircuit_walrus.py</span>
        <div class="btn-group">
          <button class="btn btn-copy" onclick="copyCode(this)">Copy</button>
          <button class="btn btn-run" onclick="runCodeInCompiler(this)">Run ▶</button>
        </div>
      </div>
      <pre><code class="language-python"># చైన్డ్ కంపారిజన్స్, షార్ట్-సర్క్యూటింగ్ & వాల్రస్ ఆపరేటర్ డెమో

# 1. చైన్డ్ కంపారిజన్స్ (Chained Comparisons)
exam_score = 88
if 80 <= exam_score <= 100:
    print("✅ అభినందనలు! మీరు 'Distinction A+' గ్రేడ్ పొందారు!")

# 2. లాజికల్ షార్ట్-సర్క్యూట్ ద్వారా జీరో డివిజన్ నివారణ
denominator = 0
# denominator != 0 ఫాల్స్ అవ్వగానే తర్వాతి భాగాన్ని పైథాన్ రన్ చేయదు!
if denominator != 0 and (100 / denominator > 5):
    print("విభజన విజయవంతం!")
else:
    print("⚠️ సేఫ్ షార్ట్-సర్క్యూట్: ZeroDivisionError రాకుండా రక్షించబడింది!")

# 3. 'or' ఆపరేటర్‌తో డిఫాల్ట్ విలువలు (Fallback pattern)
entered_theme = "" # యూజర్ ఖాళీగా వదిలాడు (Falsy)
active_theme = entered_theme or "dark-mode-default"
print(f"ప్రస్తుత థీమ్: {active_theme}")

# 4. వాల్రస్ ఆపరేటర్ (:=) డెమో
product_catalog = ["ఐఫోన్ 16", "మ్యాక్‌బుక్ ప్రో", "ఐప్యాడ్ ఎయిర్", "ఆపిల్ వాచ్"]

if (total_items := len(product_catalog)) >= 4:
    print(f"స్టాక్ నిండుగా ఉంది! మొత్తం వస్తువులు: {total_items}")
</code></pre>
    </div>

    <!-- SECTION 8 -->
    <h2 class="section-title"><span class="num">8</span> ఐడెంటిటీ ఆపరేటర్లు: <code>is</code> vs <code>==</code> (Memory Identity vs Value Equality)</h2>
    <p>
      ఇంటర్వ్యూలలో మరియు ప్రొడక్షన్ డీబగ్గింగ్‌లో అత్యంత సాధారణమైన ప్రశ్న: <strong><code>==</code> కి మరియు <code>is</code> కి తేడా ఏమిటి?</strong>
    </p>

    <div class="tbl-wrap">
      <table class="tbl">
        <thead>
          <tr>
            <th>ఫీచర్</th>
            <th><code>==</code> (Equality Operator)</th>
            <th><code>is</code> (Identity Operator)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>ఏమి తనిఖీ చేస్తుంది?</strong></td>
            <td>రెండు ఆబ్జెక్టుల లోపలి <strong>విలువలు (Values)</strong> సమానమా కాదా.</td>
            <td>రెండు వేరియబుల్స్ మెమరీలో <strong>ఒకే ఆబ్జెక్ట్‌ను (Same Memory Address via id())</strong> పాయింట్ చేస్తున్నాయా లేదా.</td>
          </tr>
          <tr>
            <td><strong>ఓవర్‌లోడింగ్ మెథడ్</strong></td>
            <td><code>__eq__()</code> డండర్ మెథడ్‌ను పిలుస్తుంది.</td>
            <td>మెథడ్ ఉండదు; నేరుగా పాయింటర్ అడ్రస్‌లను పోలుస్తుంది.</td>
          </tr>
          <tr>
            <td><strong>ఉపయోగించే సందర్భం</strong></td>
            <td>సంఖ్యలు, టెక్స్ట్, లిస్ట్‌ల విలువలను పోల్చడానికి.</td>
            <td><code>None</code>, సింగిల్టన్ ఆబ్జెక్టులు, లేదా ఆబ్జెక్ట్ ఐడెంటిటీని నిర్ధారించడానికి.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div style="background:#0f172a; padding:14px 20px; border-radius:8px; font-family:'JetBrains Mono', monospace; font-size:13px; color:#38bdf8; margin:14px 0; line-height:1.7;">
      list1 = [1, 2, 3]<br/>
      list2 = [1, 2, 3]<br/><br/>
      print(list1 == list2) # True (ఎందుకంటే విలువలు రెండూ ఒకటే)<br/>
      print(list1 is list2) # False ❌ (ఎందుకంటే హీప్‌లో రెండు వేర్వేరు లిస్ట్‌లు తయారయ్యాయి!)<br/>
      print(id(list1) != id(list2)) # True (వేర్వేరు మెమరీ అడ్రస్‌లు)
    </div>

    <p>
      <strong>PEP 8 అధికారిక నియమం:</strong> <code>None</code> ను తనిఖీ చేసేటప్పుడు ఎప్పుడూ <code>if val == None:</code> అని రాయకూడదు ❌; ఎల్లప్పుడూ <strong><code>if val is None:</code></strong> లేదా <strong><code>if val is not None:</code></strong> అని మాత్రమే రాయాలి ✅.
    </p>

    <!-- SECTION 9 -->
    <h2 class="section-title"><span class="num">9</span> మెంబర్‌షిప్ ఆపరేటర్లు (<code>in</code> &amp; <code>not in</code>)</h2>
    <p>
      ఒక విలువ ఇచ్చిన సీక్వెన్స్ (స్ట్రింగ్, లిస్ట్, టపుల్, సెట్ లేదా డిక్షనరీ) లో ఉందో లేదో తనిఖీ చేయడానికి <strong><code>in</code></strong> మరియు <strong><code>not in</code></strong> ఆపరేటర్లను ఉపయోగిస్తాము:
    </p>

    <ul>
      <li><strong>స్ట్రింగ్స్ లో సబ్‌స్ట్రింగ్ సెర్చ్:</strong> <code>"python" in "learn python in telugu"</code> =&gt; <code>True</code>.</li>
      <li><strong>లిస్ట్‌లలో ఎలిమెంట్ ఉనికి:</strong> <code>404 in [200, 301, 404, 500]</code> =&gt; <code>True</code>.</li>
      <li><strong>డిక్షనరీలలో కీ సెర్చ్:</strong> డిక్షనరీపై <code>in</code> వాడినప్పుడు అది <strong>కీలను (Keys)</strong> మాత్రమే వెతుకుతుంది:
        <br/><code>user = {"id": 101, "role": "admin"}</code>
        <br/><code>"role" in user</code> =&gt; <code>True</code>; <code>"admin" in user</code> =&gt; <code>False</code> (విలువలను వెతకాలంటే <code>"admin" in user.values()</code> వాడాలి).
      </li>
      <li><strong>పెర్ఫార్మెన్స్ గమనిక:</strong> లిస్ట్ లేదా టపుల్‌లో <code>in</code> వెతకడం $O(N)$ లీనియర్ టైమ్ పడుతుంది; కానీ సెట్స్ (Set) లేదా డిక్షనరీలలో హాష్ టేబుల్ ఉండటం వల్ల <strong>$O(1)$ కాన్‌స్టాంట్ టైమ్</strong> లో తక్షణమే వెతుకుతుంది!</li>
    </ul>

    <!-- SECTION 10 -->
    <h2 class="section-title"><span class="num">10</span> బిట్‌వైజ్ ఆపరేటర్లు (Bitwise Operators — &amp;, |, ^, ~, &lt;&lt;, &gt;&gt;)</h2>
    <p>
      కంప్యూటర్ మెమరీలో డేటా 0 మరియు 1 ల రూపంలో ఉంటుంది. ఈ బైనరీ బిట్స్ పై నేరుగా పనిచేసే ఆపరేటర్లను బిట్‌వైజ్ ఆపరేటర్లు అంటారు.
      సైబర్ సెక్యూరిటీ, నెట్‌వర్కింగ్, గేమింగ్ మరియు పర్మిషన్ సిస్టమ్స్ (Bitmasking) లో ఇవి అత్యంత కీలకం:
    </p>

    <div class="tbl-wrap">
      <table class="tbl">
        <thead>
          <tr>
            <th>ఆపరేటర్</th>
            <th>పేరు</th>
            <th>వివరణ</th>
            <th>ఉదాహరణ (5 = 101, 3 = 011)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>&amp;</code></td>
            <td>Bitwise AND</td>
            <td>రెండు బిట్స్ 1 అయితేనే 1</td>
            <td><code>5 &amp; 3</code> =&gt; <code>1</code> (001)</td>
          </tr>
          <tr>
            <td><code>|</code></td>
            <td>Bitwise OR</td>
            <td>ఏ ఒక్క బిట్ 1 అయినా 1</td>
            <td><code>5 | 3</code> =&gt; <code>7</code> (111)</td>
          </tr>
          <tr>
            <td><code>^</code></td>
            <td>Bitwise XOR</td>
            <td>బిట్స్ వేర్వేరుగా ఉంటే 1, ఒకేలా ఉంటే 0</td>
            <td><code>5 ^ 3</code> =&gt; <code>6</code> (110)</td>
          </tr>
          <tr>
            <td><code>~</code></td>
            <td>Bitwise NOT</td>
            <td>బిట్స్‌ను తిరగరాయడం (Invert: <code>-(x + 1)</code>)</td>
            <td><code>~5</code> =&gt; <code>-6</code></td>
          </tr>
          <tr>
            <td><code>&lt;&lt;</code></td>
            <td>Left Shift</td>
            <td>బిట్స్‌ను ఎడమకు జరపడం ($x \times 2^n$)</td>
            <td><code>5 &lt;&lt; 1</code> =&gt; <code>10</code></td>
          </tr>
          <tr>
            <td><code>&gt;&gt;</code></td>
            <td>Right Shift</td>
            <td>బిట్స్‌ను కుడికి జరపడం ($x // 2^n$)</td>
            <td><code>5 &gt;&gt; 1</code> =&gt; <code>2</code></td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- CODE BLOCK 3 -->
    <div class="code-block">
      <div class="code-header">
        <span class="file-name">03_bitwise_permission_masking.py</span>
        <div class="btn-group">
          <button class="btn btn-copy" onclick="copyCode(this)">Copy</button>
          <button class="btn btn-run" onclick="runCodeInCompiler(this)">Run ▶</button>
        </div>
      </div>
      <pre><code class="language-python"># రియల్-వరల్డ్ బిట్‌వైజ్ పర్మిషన్ సిస్టమ్ (Linux/Cloud Style Bitmasking)

# పర్మిషన్ ఫ్లాగ్స్ (Powers of 2)
READ    = 0b001  # 1
WRITE   = 0b010  # 2
EXECUTE = 0b100  # 4

# 1. యూజర్‌కు READ మరియు WRITE పర్మిషన్లు ఇవ్వడం (Bitwise OR |)
user_permissions = READ | WRITE
print(f"యూజర్ పర్మిషన్ బిట్స్: {bin(user_permissions)} (Decimal: {user_permissions})")

# 2. పర్మిషన్ ఉందో లేదో తనిఖీ చేయడం (Bitwise AND &)
can_read = (user_permissions & READ) != 0
can_write = (user_permissions & WRITE) != 0
can_execute = (user_permissions & EXECUTE) != 0

print(f"చదవగలరా (Can Read)?     : {can_read}")
print(f"రాయగలరా (Can Write)?    : {can_write}")
print(f"రన్ చేయగలరా (Can Exec)? : {can_execute}")

# 3. లెఫ్ట్ షిఫ్ట్ ద్వారా 2తో వేగవంతమైన గుణకారం
val = 8
print(f"\\n8 << 2 (8 * 4): {val << 2}")
print(f"8 >> 2 (8 // 4): {val >> 2}")
</code></pre>
    </div>

    <!-- SECTION 11 -->
    <h2 class="section-title"><span class="num">11</span> ఆపరేటర్ ప్రెసిడెన్స్ &amp; అసోసియేటివిటీ (Precedence Table &amp; PEMDAS)</h2>
    <p>
      ఒకే ఎక్స్‌ప్రెషన్‌లో బహుళ ఆపరేటర్లు ఉన్నప్పుడు ఏది ముందుగా ఎగ్జిక్యూట్ అవ్వాలో నిర్ణయించే నియమాలను <strong>ఆపరేటర్ ప్రెసిడెన్స్ (Operator Precedence)</strong> అంటారు.
      గణితంలోని BODMAS / PEMDAS నియమాలతో పాటు పైథాన్‌లో పూర్తి ప్రెసిడెన్స్ క్రమం ఇలా ఉంటుంది (పైనుండి క్రిందికి ప్రాధాన్యత తగ్గుతుంది):
    </p>

    <div class="tbl-wrap">
      <table class="tbl">
        <thead>
          <tr>
            <th>ప్రాధాన్యత (Rank)</th>
            <th>ఆపరేటర్</th>
            <th>వివరణ</th>
            <th>అసోసియేటివిటీ (దిశ)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>1 (అత్యున్నత)</strong></td>
            <td><code>()</code></td>
            <td>పారాంథసిస్ / బ్రాకెట్లు</td>
            <td>లోపలి నుండి బయటకు</td>
          </tr>
          <tr>
            <td><strong>2</strong></td>
            <td><code>**</code></td>
            <td>ఘాతాంకం (Exponentiation)</td>
            <td><strong>కుడి నుండి ఎడమకు (Right-to-Left)</strong></td>
          </tr>
          <tr>
            <td><strong>3</strong></td>
            <td><code>+x</code>, <code>-x</code>, <code>~x</code></td>
            <td>యూనరీ ప్లస్, మైనస్, బిట్‌వైజ్ నాట్</td>
            <td>కుడి నుండి ఎడమకు</td>
          </tr>
          <tr>
            <td><strong>4</strong></td>
            <td><code>*</code>, <code>/</code>, <code>//</code>, <code>%</code></td>
            <td>గుణకారాలు, భాగాహారాలు, శేషాలు</td>
            <td>ఎడమ నుండి కుడికి (Left-to-Right)</td>
          </tr>
          <tr>
            <td><strong>5</strong></td>
            <td><code>+</code>, <code>-</code></td>
            <td>సాధారణ కూడిక, తీసివేత</td>
            <td>ఎడమ నుండి కుడికి</td>
          </tr>
          <tr>
            <td><strong>6</strong></td>
            <td><code>&lt;&lt;</code>, <code>&gt;&gt;</code></td>
            <td>బిట్‌వైజ్ షిఫ్ట్‌లు</td>
            <td>ఎడమ నుండి కుడికి</td>
          </tr>
          <tr>
            <td><strong>7</strong></td>
            <td><code>&amp;</code>, <code>^</code>, <code>|</code></td>
            <td>బిట్‌వైజ్ AND, XOR, OR</td>
            <td>ఎడమ నుండి కుడికి</td>
          </tr>
          <tr>
            <td><strong>8</strong></td>
            <td><code>==</code>, <code>!=</code>, <code>&lt;</code>, <code>&gt;</code>, <code>is</code>, <code>in</code></td>
            <td>కంపారిజన్స్, ఐడెంటిటీ &amp; మెంబర్‌షిప్</td>
            <td>ఎడమ నుండి కుడికి</td>
          </tr>
          <tr>
            <td><strong>9</strong></td>
            <td><code>not</code></td>
            <td>లాజికల్ నాట్</td>
            <td>కుడి నుండి ఎడమకు</td>
          </tr>
          <tr>
            <td><strong>10</strong></td>
            <td><code>and</code></td>
            <td>లాజికల్ అండ్</td>
            <td>ఎడమ నుండి కుడికి</td>
          </tr>
          <tr>
            <td><strong>11</strong></td>
            <td><code>or</code></td>
            <td>లాజికల్ ఆర్</td>
            <td>ఎడమ నుండి కుడికి</td>
          </tr>
          <tr>
            <td><strong>12 (అత్యల్ప)</strong></td>
            <td><code>:=</code>, <code>=</code>, <code>+=</code> ...</td>
            <td>వాల్రస్ &amp; అసైన్‌మెంట్స్</td>
            <td>కుడి నుండి ఎడమకు</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #10b981; border-radius:8px; padding:16px; margin:18px 0;">
      <div style="font-weight:700; color:#10b981; margin-bottom:8px;">💡 ప్రొడక్షన్ గోల్డెన్ రూల్: బ్రాకెట్స్ వాడండి!</div>
      <p style="font-size:13.5px; color:var(--text); line-height:1.7; margin-bottom:0;">
        ప్రెసిడెన్స్ టేబుల్ ఎంత పెద్దదైనా, ప్రొడక్షన్ కోడ్‌లో ఇతరులకు సులభంగా అర్థం కావడానికి ఎల్లప్పుడూ బ్రాకెట్లు <code>()</code> వాడటం శ్రేయస్కరం.
        ఉదాహరణకు <code>x = a + b * c</code> కంటే <code>x = a + (b * c)</code> అని రాస్తే ఉద్దేశం స్పష్టంగా ఉంటుంది.
      </p>
    </div>

    <!-- SECTION 12 -->
    <h2 class="section-title"><span class="num">12</span> కామన్ బిగినర్స్ మిస్టేక్స్ &amp; ప్రొడక్షన్ బెస్ట్ ప్రాక్టీసెస్</h2>
    <ul>
      <li><strong>Mistake 1: అసైన్‌మెంట్ (<code>=</code>) మరియు ఈక్వాలిటీ (<code>==</code>) గందరగోళం:</strong> <code>if x = 5:</code> అని రాస్తే సింటాక్స్ ఎర్రర్ వస్తుంది. పోల్చడానికి ఎల్లప్పుడూ రెండు ఈక్వల్స్ <code>==</code> వాడాలి.</li>
      <li><strong>Mistake 2: ఫ్లోట్స్‌ను <code>==</code> తో నేరుగా పోల్చడం:</strong> బైనరీ ఫ్లోటింగ్ పాయింట్ ప్రెసిషన్ వల్ల <code>0.1 + 0.2 == 0.3</code> ఫాల్స్ అవుతుంది! ఫ్లోటింగ్ పాయింట్ సంఖ్యలను పోల్చడానికి <code>math.isclose(a, b)</code> వాడాలి.</li>
      <li><strong>Mistake 3: పెద్ద సంఖ్యలకు <code>is</code> వాడటం:</strong> పైథాన్ <code>-5</code> నుండి <code>256</code> వరకు మాత్రమే క్యాష్ చేస్తుంది. <code>x = 1000; y = 1000; x is y</code> అనేది <code>False</code> రావచ్చు! కాబట్టి విలువల కోసం ఎల్లప్పుడూ <code>==</code> వాడండి.</li>
      <li><strong>Mistake 4: ఎక్స్‌పోనెన్షియేషన్ అసోసియేటివిటీ:</strong> <code>2 ** 3 ** 2</code> విలువ 64 కాదు; కుడి నుండి ఎడమకు లెక్కించడం వల్ల <code>2 ** (3 ** 2) = 2 ** 9 = 512</code> అవుతుంది!</li>
    </ul>

    <!-- SECTION 13 -->
    <h2 class="section-title"><span class="num">13</span> రియల్-వరల్డ్ ప్రాజెక్ట్: "Enterprise E-Commerce Discount, Loyalty &amp; Tax Pricing Engine"</h2>
    <p>
      ఈ ఐదవ అధ్యాయంలో నేర్చుకున్న అన్ని అంశాలను (అర్థమెటిక్, చైన్డ్ కంపారిజన్స్, లాజికల్ షార్ట్-సర్క్యూటింగ్, వాల్రస్ ఆపరేటర్, ఐడెంటిటీ, మెంబర్‌షిప్ మరియు బిట్‌వైజ్ పర్మిషన్స్) కలగలిపి — ఒక పూర్తి స్థాయి <strong>Enterprise Dynamic Pricing &amp; Loyalty Engine</strong> ను నిర్మిద్దాం!
    </p>

    <!-- CODE BLOCK 4: CAPSTONE MINI PROJECT -->
    <div class="code-block">
      <div class="code-header">
        <span class="file-name">04_ecommerce_pricing_loyalty_engine.py</span>
        <div class="btn-group">
          <button class="btn btn-copy" onclick="copyCode(this)">Copy</button>
          <button class="btn btn-run" onclick="runCodeInCompiler(this)">Run ▶</button>
        </div>
      </div>
      <pre><code class="language-python"># =====================================================================
# చాప్టర్ 05 మినీ ప్రాజెక్ట్: E-Commerce Dynamic Pricing & Loyalty Engine
# కాన్సెప్ట్స్: Arithmetic, Chained Comparisons, Walrus Operator (:=),
#             Membership (in), Identity (is), Bitwise Flags & Short-circuit
# =====================================================================

# యూజర్ రోల్ బిట్ ఫ్లాగ్స్
ROLE_STANDARD = 0b001
ROLE_AFFILIATE = 0b010
ROLE_STAFF     = 0b100

VALID_COUPONS = {"FESTIVE20": 0.20, "FLASH10": 0.10, "WELCOME50": 0.50}

def calculate_dynamic_cart_bill(
    customer_name: str,
    raw_subtotal: float,
    coupon_code: str | None,
    loyalty_points: int,
    user_roles: int
):
    print("=" * 68)
    print(f"{'🛒 E-COMMERCE DYNAMIC PRICING ENGINE 2026':^68}")
    print("=" * 68)

    subtotal = raw_subtotal
    print(f"కస్టమర్ పేరు        : {customer_name}")
    print(f"ప్రారంభ కార్ట్ విలువ : ₹ {subtotal:>15,.2f}")

    # 1. వాల్రస్ ఆపరేటర్ & మెంబర్‌షిప్ ద్వారా కూపన్ డిస్కౌంట్
    discount_amount = 0.0
    if coupon_code is not None and (clean_code := coupon_code.strip().upper()) in VALID_COUPONS:
        rate = VALID_COUPONS[clean_code]
        discount_amount = subtotal * rate
        print(f"కూపన్ అప్లై అయ్యింది : [{clean_code}] -₹ {discount_amount:>11,.2f} ({rate:.0%})")
    else:
        print("కూపన్ కోడ్          : వర్తించలేదు లేదా చెల్లనిది")

    # 2. చైన్డ్ కంపారిజన్ ద్వారా లాయల్టీ బోనస్ పాయింట్లు
    loyalty_cashback = 0.0
    if 500 <= loyalty_points <= 5000:
        loyalty_cashback = min(loyalty_points * 0.5, 500.0)
        print(f"లాయల్టీ క్యాష్‌బ్యాక్ : {loyalty_points} పాయింట్లు = -₹ {loyalty_cashback:>9,.2f}")

    # 3. బిట్‌వైజ్ ఆపరేటర్ ద్వారా స్టాఫ్ డిస్కౌంట్
    is_staff = (user_roles & ROLE_STAFF) != 0
    staff_discount = (subtotal * 0.05) if is_staff else 0.0
    if is_staff:
        print(f"సిబ్బంది డిస్కౌంట్  : 5% అదనపు తగ్గింపు = -₹ {staff_discount:>9,.2f}")

    # 4. నెట్ మొత్తం & GST పన్ను (అర్థమెటిక్ & రౌండింగ్)
    taxable_amount = max(0.0, subtotal - discount_amount - loyalty_cashback - staff_discount)
    gst_tax = taxable_amount * 0.18 # 18% GST
    final_total = taxable_amount + gst_tax

    print("-" * 68)
    print(f"{'పన్ను విధించదగిన మొత్తం:':<38} ₹ {taxable_amount:>15,.2f}")
    print(f"{'GST పన్ను (18%):':<38} ₹ {gst_tax:>15,.2f}")
    print("=" * 68)
    print(f"{'తుది చెల్లింపు మొత్తం (Net Total):':<38} ₹ {final_total:>15,.2f}")
    print("=" * 68)

# లైవ్ టెస్టింగ్
calculate_dynamic_cart_bill(
    customer_name="బాలాజీ రావు",
    raw_subtotal=14999.00,
    coupon_code="FESTIVE20",
    loyalty_points=1200,
    user_roles=ROLE_STANDARD | ROLE_STAFF
)
</code></pre>
    </div>

    <!-- 5 COLLAPSIBLE QUIZZES -->
    <h2 class="section-title"><span class="num">★</span> ఈ అధ్యాయంపై ప్రాక్టీస్ క్విజ్ (Knowledge Check)</h2>

    <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px 18px; margin-bottom:12px; cursor:pointer;">
      <summary style="font-weight:700; color:#10b981; font-size:14.5px;">1. పైథాన్‌లో 10 / 2 మరియు 10 // 2 ల ఫలితాల మధ్య తేడా ఏమిటి?</summary>
      <div style="font-size:13.5px; color:var(--text); line-height:1.7; margin-top:10px;">
        <strong>సమాధానం:</strong> <code>10 / 2</code> అనేది ట్రూ డివిజన్, దీని ఫలితం ఎల్లప్పుడూ ఫ్లోట్ <code>5.0</code> అవుతుంది. కానీ <code>10 // 2</code> అనేది ఫ్లోర్ డివిజన్, దీని ఫలితం పూర్ణాంకం <code>5</code> అవుతుంది.
      </div>
    </details>

    <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px 18px; margin-bottom:12px; cursor:pointer;">
      <summary style="font-weight:700; color:#10b981; font-size:14.5px;">2. పైథాన్‌లో 'is' ఆపరేటర్‌కు మరియు '==' ఆపరేటర్‌కు మధ్య తేడా ఏమిటి?</summary>
      <div style="font-size:13.5px; color:var(--text); line-height:1.7; margin-top:10px;">
        <strong>సమాధానం:</strong> <code>==</code> ఆపరేటర్ రెండు వేరియబుల్స్ లోపల ఉన్న <strong>విలువలను (Values)</strong> సమానమా కాదా అని పోలుస్తుంది. కానీ <code>is</code> ఆపరేటర్ రెండు వేరియబుల్స్ మెమరీలో <strong>ఒకే ఆబ్జెక్ట్ చిరునామాను (Memory Address via id())</strong> పాయింట్ చేస్తున్నాయా లేదా అని తనిఖీ చేస్తుంది.
      </div>
    </details>

    <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px 18px; margin-bottom:12px; cursor:pointer;">
      <summary style="font-weight:700; color:#10b981; font-size:14.5px;">3. చైన్డ్ కంపారిజన్ (10 < x < 20) అంతర్గతంగా ఎలా ఎగ్జిక్యూట్ అవుతుంది?</summary>
      <div style="font-size:13.5px; color:var(--text); line-height:1.7; margin-top:10px;">
        <strong>సమాధానం:</strong> పైథాన్ దీనిని అంతర్గతంగా <code>(10 < x) and (x < 20)</code> లాగా ఎగ్జిక్యూట్ చేస్తుంది. <code>x</code> యొక్క విలువ ఒకే ఒక్కసారి మాత్రమే ఎవాల్యుయేట్ చేయబడుతుంది.
      </div>
    </details>

    <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px 18px; margin-bottom:12px; cursor:pointer;">
      <summary style="font-weight:700; color:#10b981; font-size:14.5px;">4. లాజికల్ షార్ట్-సర్క్యూటింగ్ అంటే ఏమిటి? ఒక ఉదాహరణ ఇవ్వండి.</summary>
      <div style="font-size:13.5px; color:var(--text); line-height:1.7; margin-top:10px;">
        <strong>సమాధానం:</strong> మొత్తం ఎక్స్‌ప్రెషన్ ఫలితం మొదటి భాగంలోనే తేలిపోయినప్పుడు రెండవ భాగాన్ని పైథాన్ అసలు ఎగ్జిక్యూట్ చేయకపోవడాన్ని షార్ట్-సర్క్యూటింగ్ అంటారు. ఉదాహరణకు <code>False and func()</code> లో <code>func()</code> అస్సలు రన్ అవ్వదు; <code>True or func()</code> లో కూడా <code>func()</code> రన్ అవ్వదు.
      </div>
    </details>

    <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px 18px; margin-bottom:12px; cursor:pointer;">
      <summary style="font-weight:700; color:#10b981; font-size:14.5px;">5. పైథాన్ 3.8 వాల్రస్ ఆపరేటర్ (:=) వల్ల కలిగే ముఖ్య ప్రయోజనం ఏమిటి?</summary>
      <div style="font-size:13.5px; color:var(--text); line-height:1.7; margin-top:10px;">
        <strong>సమాధానం:</strong> ఇది ఒకే ఎక్స్‌ప్రెషన్ లోపల ఒక వేరియబుల్‌కు విలువను అసైన్ చేయడం మరియు వెంటనే ఆ విలువను షరతులో పరీక్షించడం రెండింటినీ అనుమతిస్తుంది. దీనివల్ల డూప్లికేట్ ఫంక్షన్ కాల్స్ తగ్గడంతో పాటు కోడ్ లైన్లు ఆదా అవుతాయి.
      </div>
    </details>

    <!-- PREV / NEXT NAVIGATION -->
    <div style="display:flex; justify-content:space-between; align-items:center; margin-top:40px; padding-top:20px; border-top:1px solid var(--border); flex-wrap:wrap; gap:16px;">
      <a href="/blog-python/04-python-input-output-formatting.html" style="text-decoration:none; color:var(--text); font-weight:600; display:inline-flex; align-items:center; gap:8px; background:var(--bg2); padding:10px 18px; border-radius:8px; border:1px solid var(--border);">
        ← మునుపటి అధ్యాయం: 4. ఇన్‌పుట్ &amp; అవుట్‌పుట్
      </a>
      <a href="/blog-python/06-python-conditional-statements-branching.html" style="text-decoration:none; color:#ffffff; font-weight:700; display:inline-flex; align-items:center; gap:8px; background:#10b981; padding:10px 22px; border-radius:8px; box-shadow:0 4px 12px rgba(16,185,129,0.3);">
        తర్వాతి అధ్యాయం: 6. డెసిషన్ మేకింగ్ (if-else) →
      </a>
    </div>

    <!-- INTERACTIVE COMPILER CTA CARD -->
    <div style="margin-top:40px; background:linear-gradient(135deg, rgba(16,185,129,0.1) 0%, rgba(56,189,248,0.1) 100%); border:1px solid rgba(16,185,129,0.3); border-radius:12px; padding:24px; text-align:center;">
      <h3 style="margin-top:0; color:var(--text); font-size:20px;">ఈ Pricing &amp; Loyalty Engine ప్రాజెక్ట్‌ను లైవ్‌గా మన కంపైలర్‌లో రన్ చేయండి!</h3>
      <p style="color:var(--text2); max-width:650px; margin:8px auto 20px; font-size:14px; line-height:1.6;">
        ఎటువంటి లోకల్ సెటప్ లేకుండా, బ్రౌజర్‌లోనే Modern Python 3 కంపైలర్‌లో ఈ కోడ్‌ను ఎగ్జిక్యూట్ చేసి అవుట్‌పుట్ చూడండి.
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
# చాప్టర్ 05 మినీ ప్రాజెక్ట్: E-Commerce Dynamic Pricing & Loyalty Engine
# =====================================================================

ROLE_STANDARD = 0b001
ROLE_STAFF     = 0b100

VALID_COUPONS = {"FESTIVE20": 0.20, "FLASH10": 0.10}

customer_name = "బాలాజీ రావు"
subtotal = 14999.00
coupon_code = "FESTIVE20"
loyalty_points = 1200
user_roles = ROLE_STANDARD | ROLE_STAFF

print("=" * 65)
print(f"{'🛒 E-COMMERCE PRICING ENGINE (DEMO)':^65}")
print("=" * 65)
print(f"కస్టమర్ పేరు        : {customer_name}")
print(f"ప్రారంభ కార్ట్ విలువ : ₹ {subtotal:>15,.2f}")

discount_amount = 0.0
if coupon_code is not None and (clean_code := coupon_code.strip().upper()) in VALID_COUPONS:
    rate = VALID_COUPONS[clean_code]
    discount_amount = subtotal * rate
    print(f"కూపన్ డిస్కౌంట్    : [{clean_code}] -₹ {discount_amount:>10,.2f}")

loyalty_cashback = 0.0
if 500 <= loyalty_points <= 5000:
    loyalty_cashback = min(loyalty_points * 0.5, 500.0)
    print(f"లాయల్టీ క్యాష్‌బ్యాక్ : -₹ {loyalty_cashback:>10,.2f}")

is_staff = (user_roles & ROLE_STAFF) != 0
staff_discount = (subtotal * 0.05) if is_staff else 0.0
if is_staff:
    print(f"సిబ్బంది డిస్కౌంట్  : -₹ {staff_discount:>10,.2f}")

taxable = max(0.0, subtotal - discount_amount - loyalty_cashback - staff_discount)
gst = taxable * 0.18
final_total = taxable + gst

print("-" * 65)
print(f"{'పన్ను విధించదగిన మొత్తం:':<35} ₹ {taxable:>15,.2f}")
print(f"{'GST పన్ను (18%):':<35} ₹ {gst:>15,.2f}")
print("=" * 65)
print(f"{'తుది చెల్లింపు మొత్తం:':<35} ₹ {final_total:>15,.2f}")
print("=" * 65)
print("\\n🎉 చాప్టర్ 05 ప్రాజెక్ట్ విజయవంతంగా రన్ అయ్యింది! Phase 01 పూర్తయింది! 🚀")
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
fs.writeFileSync(outputPath, chapter05Content, 'utf8');
console.log('✅ Successfully generated deep high-value Python Chapter 05 in exact HTML style!');
console.log('Target file:', currentLesson.file);
console.log('Target file size:', chapter05Content.length, 'characters');
