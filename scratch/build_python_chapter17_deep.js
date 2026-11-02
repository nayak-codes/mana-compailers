const fs = require('fs');
const path = require('path');
const { LESSONS, buildPythonSidebar } = require('./python_curriculum_data.js');

const currentLesson = LESSONS[16]; // Chapter 17 (0-indexed 16)
const sidebarHtml = buildPythonSidebar(17);

const chapter17Content = `<!DOCTYPE html>
<html class="light-theme" lang="te">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${currentLesson.title} — Python 3 Tutorial | Our Compiler</title>
  <meta name="description" content="Python 3 వేరియబుల్ ఆర్గ్యుమెంట్స్ & స్కోప్ (*args, **kwargs & LEGB) సమగ్ర తెలుగు గైడ్: Arbitrary Positional Arguments, Arbitrary Keyword Arguments, Parameter Ordering, LEGB Scope Hierarchy, global & nonlocal కీవర్డ్స్, UnboundLocalError పరిష్కారం, మరియు Microservice Event Logger ప్రాజెక్ట్." />
  <meta name="keywords" content="python args kwargs in telugu, python variable arguments telugu, python legb scope rule telugu, python global nonlocal telugu, learn python in telugu, our compiler" />
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
    "headline": "${currentLesson.title} (Complete Guide to Python *args, **kwargs and LEGB Scope in Telugu)",
    "description": "Python 3 *args, **kwargs మరియు LEGB వేరియబుల్ స్కోప్ పూర్తి గైడ్: Tuple Packing, Dict Packing, LEGB Hierarchy, global, nonlocal, మరియు Event Audit Dispatcher Engine.",
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
      <span style="color:var(--text); font-weight:600;">Chapter 17: ${currentLesson.title}</span>
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
        📖 Chapter 17 of 25
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
      ${currentLesson.subtopics} · Arbitrary Positional Arguments (*args) · Arbitrary Keyword Arguments (**kwargs) · Master Parameter Ordering Rule · Unpacking Operators (* &amp; **) · LEGB Scope Hierarchy · global vs nonlocal Keywords · Closures · UnboundLocalError Resolution · Microservice Event Logger Project
    </div>

    <!-- WARM SOFT IVORY INTRO BOX -->
    <div class="intro-box" style="background:#fffdf7; border:1px solid #fef3c7; border-left:4px solid #f59e0b; border-radius:10px; padding:20px 24px; margin-bottom:30px; font-size:15px; color:#451a03; line-height:1.75;">
      మీరు ఒక ఫంక్షన్‌ను డిజైన్ చేస్తున్నప్పుడు, భవిష్యత్తులో దానికి యూజర్లు ఎన్ని ఆర్గ్యుమెంట్లు పంపుతారో ముందే ఖచ్చితంగా తెలియకపోతే ఎలా? ఉదాహరణకు, ఒక కాలిక్యులేటర్‌లో ఇద్దరు వ్యక్తులు ఇద్దరి మార్కులు మాత్రమే కూడవచ్చు, మరొకరు వంద మంది విద్యార్థుల మార్కులు ఒకేసారి పంపవచ్చు. లేదా ఒక క్లౌడ్ లాగింగ్ ఫంక్షన్‌కు ఒక్కో ఈవెంట్‌లో వేర్వేరు సమాచార ఫీల్డ్స్ (IP, Browser, Location, UserID, SessionID) రావచ్చు.
      <br/><br/>
      ఈ అపరిమిత వైవిధ్యాన్ని స్వీకరించడానికి పైథాన్ అందించిన మ్యాజికల్ ఆయుధాలే <strong><code>*args</code></strong> మరియు <strong><code>**kwargs</code></strong>! అంతేకాకుండా, ఒక ఫంక్షన్ లోపల మనం సృష్టించిన వేరియబుల్స్ ప్రోగ్రామ్‌లో ఎక్కడెక్కడ అందుబాటులో ఉంటాయి? ఫంక్షన్ బయట ఉన్న వేరియబుల్‌ను లోపల ఎలా సవరించాలి? పైథాన్ ఇంటర్ప్రెటర్ వేరియబుల్స్‌ను వెతకడానికి ఉపయోగించే ప్రసిద్ధ <strong>LEGB (Local, Enclosing, Global, Built-in)</strong> స్కోప్ ఆర్కిటెక్చర్ నియమాలు ఏమిటి? ఈ అధ్యాయంలో మనం ఈ అధునాతన ఫంక్షనల్ అంశాలన్నింటినీ విశ్లేషిస్తూ, ఎంటర్‌ప్రైజ్ మైక్రోసర్వీస్ ఈవెంట్ లాగర్ ప్రాజెక్ట్‌ను లైవ్‌గా నిర్మిద్దాం!
    </div>

    <!-- SECTION 1 -->
    <h2 class="section-title"><span class="num">1</span> వేరియబుల్ ఆర్గ్యుమెంట్స్ ఎందుకు అవసరం? (Flexible Signatures)</h2>
    <p>
      సాధారణ ఫంక్షన్లలో మనం ఎన్ని పారామీటర్లను రాస్తే, కాల్ చేసేటప్పుడు సరిగ్గా అన్ని ఆర్గ్యుమెంట్లనే పంపాలి. ఒక్కటి ఎక్కువైనా లేదా తక్కువైనా పైథాన్ వెంటనే <code>TypeError</code> విసురుతుంది:
    </p>
    <div style="background:#0f172a; padding:10px 16px; border-radius:6px; font-family:'JetBrains Mono', monospace; font-size:12.5px; color:#fca5a5; margin:8px 0;">
      def add(a, b): return a + b<br/>
      add(10, 20, 30) # TypeError: add() takes 2 positional arguments but 3 were given!
    </div>
    <p>
      కానీ వాస్తవ ప్రపంచంలో ఫంక్షన్లు అత్యంత సౌకర్యవంతంగా (Flexible) ఉండాలి. ఉదాహరణకు పైథాన్ యొక్క బిల్ట్-ఇన్ <code>print()</code> ఫంక్షన్‌ను గమనించండి — దానికి మీరు ఒక పదం పంపినా ప్రింట్ చేస్తుంది, కామాలతో వేరుచేసి వంద పదాలు పంపినా వాటన్నింటినీ ప్రింట్ చేస్తుంది! ఈ విధమైన ఫ్లెక్సిబిలిటీని మన స్వంత ఫంక్షన్లకు అందించడానికి <code>*args</code> మరియు <code>**kwargs</code> ఉపయోగపడతాయి.
    </p>

    <!-- SECTION 2 -->
    <h2 class="section-title"><span class="num">2</span> <code>*args</code> — ఆర్బిట్రరీ పొజిషనల్ ఆర్గ్యుమెంట్స్ (Tuple Packing)</h2>
    <p>
      ఫంక్షన్ పారామీటర్ ముందు ఒక స్టార్ సింబల్ <strong><code>*</code></strong> పెడితే, అది కాల్ చేసేటప్పుడు పంపిన అదనపు పొజిషనల్ ఆర్గ్యుమెంట్లు అన్నింటినీ ఒకే ఒక <strong>టుపుల్ (Tuple)</strong> లోకి ప్యాక్ చేస్తుంది.
    </p>
    <ul>
      <li><strong>పేరు నియమం:</strong> సాంప్రదాయకంగా ప్రోగ్రామర్లు <code>*args</code> (arguments) అని పిలుస్తారు, కానీ సాంకేతికంగా స్టార్ తర్వాత ఏ పేరైనా పెట్టవచ్చు (ఉదా: <code>*numbers</code>, <code>*items</code>). అసలైన మ్యాజిక్ స్టార్ <code>*</code> గుర్తులోనే ఉంది!</li>
      <li><strong>టుపుల్ రూపంలోకి ప్యాకింగ్:</strong> ఫంక్షన్ లోపల <code>args</code> అనేది ఒక ఇమ్మ్యుటబుల్ టుపుల్ అవుతుంది. దానిపై మనం లూప్ చేయవచ్చు, <code>len()</code>, <code>sum()</code> వంటి ఆపరేషన్లు నిశ్చింతగా చేయవచ్చు.</li>
    </ul>

    <!-- SECTION 3 -->
    <h2 class="section-title"><span class="num">3</span> <code>**kwargs</code> — ఆర్బిట్రరీ కీవర్డ్ ఆర్గ్యుమెంట్స్ (Dict Packing)</h2>
    <p>
      ఫంక్షన్ పారామీటర్ ముందు డబుల్ స్టార్ సింబల్ <strong><code>**</code></strong> పెడితే, అది కాల్ చేసేటప్పుడు పంపిన అదనపు కీవర్డ్ ఆర్గ్యుమెంట్లు (Named Arguments: <code>key=value</code>) అన్నింటినీ ఒక <strong>డిక్షనరీ (Dictionary)</strong> లోకి ప్యాక్ చేస్తుంది.
    </p>
    <ul>
      <li><strong>పేరు నియమం:</strong> దీనిని సాంప్రదాయకంగా <code>**kwargs</code> (keyword arguments) అంటారు.</li>
      <li><strong>డిక్షనరీ రూపంలోకి ప్యాకింగ్:</strong> ఫంక్షన్ లోపల <code>kwargs</code> అనేది ఒక సాధారణ డిక్షనరీ అవుతుంది. <code>kwargs.items()</code>, <code>kwargs.get()</code> మెథడ్స్ ద్వారా డైనమిక్ ఫీల్డ్స్‌ను యాక్సెస్ చేయవచ్చు.</li>
    </ul>

    <!-- SECTION 4 -->
    <h2 class="section-title"><span class="num">4</span> ఫంక్షన్ పారామీటర్ల మాస్టర్ ఆర్డరింగ్ రూల్ (The Master Ordering Rule)</h2>
    <p>
      ఒకే ఫంక్షన్‌లో సాధారణ పారామీటర్లు, డిఫాల్ట్ పారామీటర్లు, <code>*args</code>, కీవర్డ్-ఓన్లీ, మరియు <code>**kwargs</code> లను కలిపి రాయాల్సి వచ్చినప్పుడు, పైథాన్ ఒక ఖచ్చితమైన వరుస క్రమాన్ని నిర్దేశిస్తుంది:
    </p>

    <div style="background:#0f172a; border:1px solid #1e293b; border-radius:8px; padding:18px; margin:18px 0; font-family:'JetBrains Mono', monospace; font-size:13px; color:#f8fafc; line-height:1.7;">
      <div style="color:#10b981; font-weight:700; margin-bottom:8px;">[Python Master Function Signature Order]</div>
      def function_name(<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;1. standard_positional,    # సాధారణ పొజిషనల్ పారామీటర్లు<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;2. default_positional=val, # డిఫాల్ట్ విలువలు కలిగినవి<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;3. *args,                  # అదనపు పొజిషనల్ టుపుల్ ప్యాకింగ్<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;4. keyword_only,           # స్టార్ తర్వాత వచ్చే కీవర్డ్-ఓన్లీ<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;5. **kwargs                # అదనపు కీవర్డ్ డిక్షనరీ ప్యాకింగ్<br/>
      ):
    </div>

    <!-- SECTION 5 -->
    <h2 class="section-title"><span class="num">5</span> ఆర్గ్యుమెంట్ అన్‌ప్యాకింగ్ ట్రిక్స్ (Unpacking with <code>*</code> &amp; <code>**</code>)</h2>
    <p>
      స్టార్ ఆపరేటర్ కేవలం పారామీటర్లను ప్యాక్ చేయడానికే కాకుండా, ఇప్పటికే ఉన్న లిస్ట్‌లు, టుపుల్స్ మరియు డిక్షనరీలను ఫంక్షన్ కాల్స్‌లోకి <strong>అన్‌ప్యాక్ (విడదీయడానికి)</strong> కూడా ఉపయోగపడుతుంది:
    </p>
    <ul>
      <li><strong>లిస్ట్/టుపుల్ అన్‌ప్యాకింగ్ (<code>*</code>):</strong> <code>nums = [10, 20, 30]</code> ఉంటే <code>add(*nums)</code> అని పంపితే అది <code>add(10, 20, 30)</code> గా మారుతుంది.</li>
      <li><strong>డిక్షనరీ అన్‌ప్యాకింగ్ (<code>**</code>):</strong> <code>user_data = {"name": "రమ్య", "age": 24}</code> ఉంటే <code>create_profile(**user_data)</code> అని పంపితే అది <code>create_profile(name="రమ్య", age=24)</code> గా విడిపోతుంది.</li>
    </ul>

    <!-- SECTION 6 -->
    <h2 class="section-title"><span class="num">6</span> కోడ్ డెమో 1: డైనమిక్ API రిక్వెస్ట్ బిల్డర్ with <code>*args</code> &amp; <code>**kwargs</code></h2>
    <p>
      ఎన్ని పాత్ పారామీటర్లు మరియు క్వెరీ పారామీటర్లు వచ్చినా డైనమిక్‌గా సరైన API URL ను నిర్మించే ఫంక్షన్‌ను పరిశీలిద్దాం:
    </p>

    <!-- CODE BLOCK 1 -->
    <div class="code-block">
      <div class="code-header">
        <span class="file-name">01_dynamic_api_url_builder.py</span>
        <div class="btn-group">
          <button class="btn btn-copy" onclick="copyCode(this)">Copy</button>
          <button class="btn btn-run" onclick="runCodeInCompiler(this)">Run ▶</button>
        </div>
      </div>
      <pre><code class="language-python"># =====================================================================
# చాప్టర్ 17 డెమో 1: *args & **kwargs డైనమిక్ API URL బిల్డర్
# =====================================================================

def build_api_endpoint(base_domain: str, *path_segments, protocol: str = "https", **query_params) -> str:
    """డైనమిక్ పాత్‌లు మరియు క్వెరీ పారామీటర్లతో API ఎండ్‌పాయింట్‌ను నిర్మిస్తుంది."""
    # 1. *args లోని అన్ని సెగ్మెంట్లను / తో జాయిన్ చేయడం
    clean_paths = [str(seg).strip("/") for seg in path_segments if seg]
    path_url = "/".join(clean_paths)

    # 2. **kwargs లోని క్వెరీ పారామీటర్లను key=value గా మార్చడం
    query_parts = [f"{k}={v}" for k, v in query_params.items()]
    query_string = ("?" + "&".join(query_parts)) if query_parts else ""

    full_url = f"{protocol}://{base_domain}/{path_url}{query_string}"
    return full_url

# టెస్ట్ 1: సాధారణ యూజర్ పాత్ & ఫిల్టర్లు
url_1 = build_api_endpoint(
    "api.ourcompiler.com",
    "v1", "users", 1042, "orders",
    protocol="https",
    status="delivered",
    page=1,
    limit=20
)
print("ఎండ్‌పాయింట్ 1 :", url_1)

# టెస్ట్ 2: ఆర్గ్యుమెంట్ అన్‌ప్యాకింగ్ (*paths, **filters)
extra_paths = ["v2", "products", "laptops"]
extra_filters = {"brand": "asus", "min_ram_gb": 16}

url_2 = build_api_endpoint("api.ourcompiler.com", *extra_paths, **extra_filters)
print("ఎండ్‌పాయింట్ 2 :", url_2)
</code></pre>
    </div>

    <!-- SECTION 7 -->
    <h2 class="section-title"><span class="num">7</span> వేరియబుల్ స్కోప్ అంటే ఏమిటి? (Variable Scope &amp; Lifetime)</h2>
    <p>
      పైథాన్‌లో ఒక వేరియబుల్‌ను డిక్లేర్ చేసినప్పుడు, అది ప్రోగ్రామ్‌లోని ఏ ఏ ప్రదేశాలలో అందుబాటులో ఉంటుంది (Visibility) మరియు మెమరీలో ఎంతకాలం జీవించి ఉంటుంది (Lifetime) అనే దానిని నిర్ణయించే నియమ నిబంధనలనే <strong>స్కోప్ (Scope)</strong> అంటారు.
    </p>
    <ul>
      <li><strong>లోకల్ స్కోప్ (Local):</strong> ఫంక్షన్ లోపల సృష్టించిన వేరియబుల్స్ ఫంక్షన్ రన్ అవుతున్నప్పుడు మాత్రమే బ్రతికి ఉంటాయి. ఫంక్షన్ ముగియగానే అవి తుడిచిపెట్టుకుపోతాయి. బయట నుండి వాటిని చదవలేము (<code>NameError</code>).</li>
      <li><strong>గ్లోబల్ స్కోప్ (Global):</strong> ఫంక్షన్ల వెలుపల, ప్రధాన స్క్రిప్ట్‌లో రాసే వేరియబుల్స్ ప్రోగ్రామ్ మొత్తం ఎక్కడి నుంచైనా చదవడానికి అందుబాటులో ఉంటాయి.</li>
    </ul>

    <!-- SECTION 8 -->
    <h2 class="section-title"><span class="num">8</span> The LEGB స్కోప్ రూల్ డీప్ డైవ్ (Local, Enclosing, Global, Built-in)</h2>
    <p>
      పైథాన్‌లో మీరు ఏదైనా ఒక వేరియబుల్ పేరును ఉపయోగించినప్పుడు, ఇంటర్ప్రెటర్ ఆ పేరును ఎలా వెతుకుతుంది? దీనికి పైథాన్ ఒక ఖచ్చితమైన 4-దశల క్రమాన్ని పాటిస్తుంది — దీనినే <strong>LEGB Rule</strong> అంటారు:
    </p>

    <div style="background:#0f172a; border:1px solid #1e293b; border-radius:8px; padding:18px; margin:18px 0; font-family:'JetBrains Mono', monospace; font-size:13px; color:#f8fafc; line-height:1.7;">
      <div style="color:#10b981; font-weight:700; margin-bottom:8px;">[The LEGB Scope Lookup Order]</div>
      1. [L] Local ─────▶ ప్రస్తుత ఫంక్షన్ బాడీలో ఉందా? (Found? Stop Search!)<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│ లేకపోతే<br/>
      2. [E] Enclosing ─▶ బయటి చుట్టుముట్టిన ఫంక్షన్ (Outer Nested Function) లో ఉందా?<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│ లేకపోతే<br/>
      3. [G] Global ────▶ ప్రస్తుత మాడ్యూల్ లేదా మెయిన్ ఫైల్ లెవల్‌లో ఉందా?<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│ లేకపోతే<br/>
      4. [B] Built-in ──▶ పైథాన్ ఇన్-బిల్ట్ ఫంక్షన్స్ (len, print, range) లో ఉందా?<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│ ఎక్కడా దొరక్కపోతే<br/>
      ❌ NameError: name 'x' is not defined!
    </div>

    <p>
      <strong>బైట్‌కోడ్ స్థాయిలో LEGB అంతర్గత విశ్లేషణ:</strong>
    </p>
    <ul>
      <li><strong>1. Local (L) — <code>LOAD_FAST</code> ఆప్టిమైజేషన్:</strong> లోకల్ వేరియబుల్స్ శోధన డిక్షనరీలో కాకుండా, CPython స్టాక్ ఫ్రేమ్‌లోని స్థిరమైన C-అరే ద్వారా నేరుగా ఇండెక్స్ చేయబడుతుంది. అందుకే లోకల్ వేరియబుల్స్ యాక్సెస్ అత్యంత మెరుపు వేగంతో జరుగుతుంది.</li>
      <li><strong>2. Enclosing (E) — <code>LOAD_DEREF</code> &amp; Cell Objects:</strong> లోపలి ఫంక్షన్ బయటి ఫంక్షన్ వేరియబుల్స్‌ను వాడుతున్నప్పుడు, CPython హీప్ మెమరీలో ఒక ప్రత్యేకమైన <strong>Cell Object</strong> ను కేటాయిస్తుంది. బయటి ఫంక్షన్ ఎగ్జిక్యూషన్ ముగిసిన తర్వాత కూడా ఈ డేటా సజీవంగా ఉంటుంది (క్లోజర్ ఆర్కిటెక్చర్).</li>
      <li><strong>3. Global (G) — <code>LOAD_GLOBAL</code>:</strong> ప్రస్తుత మాడ్యూల్ యొక్క గ్లోబల్ డిక్షనరీ <code>globals()</code> లో కీ-వాల్యూ శోధన జరుగుతుంది.</li>
      <li><strong>4. Built-in (B):</strong> పైథాన్ ప్రారంభమైనప్పుడే లోడ్ అయ్యే <code>builtins.__dict__</code> లో వెతుకుతుంది. ఇక్కడే బిగినర్స్ ఒక పెద్ద తప్పు చేస్తుంటారు: <code>list = [1, 2, 3]</code> అని రాస్తే, మీరు బిల్ట్-ఇన్ <code>list</code> ఫంక్షన్‌ను గ్లోబల్ స్కోప్‌లో షాడో (మరుగునపరచడం) చేస్తారు! ఆ తర్వాత <code>list()</code> కన్‌స్ట్రక్టర్ పనిచేయదు.</li>
    </ul>

    <!-- SECTION 9 -->
    <h2 class="section-title"><span class="num">9</span> <code>global</code> కీవర్డ్ — గ్లోబల్ స్టేట్ మోడిఫికేషన్స్ &amp; ప్రమాదాలు</h2>
    <p>
      ఒక ఫంక్షన్ లోపల ఉంటూ గ్లోబల్ వేరియబుల్‌లోని విలువను చదవడం సులభమే. కానీ దానిని <strong>సవరించాలని (Modify)</strong> చూసినప్పుడు, పైథాన్ ఆ పేరుతో ఒక సరికొత్త లోకల్ వేరియబుల్‌ను సృష్టిస్తుంది తప్ప గ్లోబల్ వేరియబుల్‌ను మార్చదు!
    </p>
    <p>
      ఫంక్షన్ లోపల నుండే అసలైన గ్లోబల్ వేరియబుల్‌ను మార్చాలంటే <strong><code>global</code></strong> కీవర్డ్‌ను ఉపయోగించాలి:
    </p>
    <div style="background:#0f172a; padding:12px 18px; border-radius:6px; font-family:'JetBrains Mono', monospace; font-size:12.5px; color:#38bdf8; margin:10px 0; line-height:1.6;">
      total_visitors = 0 # Global Scope<br/><br/>
      def track_visitor():<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;global total_visitors # గ్లోబల్ వేరియబుల్ వాడుతున్నామని తెలియజేయడం<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;total_visitors += 1<br/><br/>
      track_visitor()<br/>
      print("మొత్తం సందర్శకులు :", total_visitors) # 1
    </div>
    <div style="background:rgba(245,158,11,0.08); border-left:4px solid #f59e0b; padding:12px 18px; border-radius:6px; margin:12px 0; font-size:13px; line-height:1.6;">
      <strong>ఇండస్ట్రీ బెస్ట్ ప్రాక్టీస్ హెచ్చరిక:</strong> గ్లోబల్ వేరియబుల్స్‌ను మార్చడానికి <code>global</code> కీవర్డ్ అతిగా వాడటం వల్ల మల్టీ-థ్రెడింగ్ అప్లికేషన్లలో రేస్ కండిషన్లు (Race Conditions) మరియు అనూహ్యమైన బగ్‌లు వస్తాయి. వీలైనంతవరకు ఫంక్షన్ల ద్వారా విలువలను రిటర్న్ చేయడానికే ప్రాధాన్యత ఇవ్వండి.
    </div>

    <!-- SECTION 10 -->
    <h2 class="section-title"><span class="num">10</span> <code>nonlocal</code> కీవర్డ్ — నెస్టెడ్ ఫంక్షన్స్ &amp; Closures ఆర్కిటెక్చర్</h2>
    <p>
      ఒక ఫంక్షన్ లోపల మరొక ఫంక్షన్‌ను రాసినప్పుడు (Nested Functions), లోపలి ఫంక్షన్ తన బయట ఉన్న ఫంక్షన్‌లోని వేరియబుల్‌ను సవరించడానికి <strong><code>nonlocal</code></strong> కీవర్డ్‌ను ఉపయోగిస్తుంది.
    </p>
    <p>
      <strong>క్లోజర్ (Closure) అంటే ఏమిటి?</strong><br/>
      ఒక ఇన్నర్ ఫంక్షన్ తన బయటి ఫంక్షన్ ఎగ్జిక్యూషన్ ముగిసిపోయినప్పటికీ, బయటి ఫంక్షన్ లోని వేరియబుల్స్ (Enclosing Scope State) ను గుర్తుపెట్టుకుని ఉండగలిగితే దానిని <strong>క్లోజర్ (Closure)</strong> అంటారు.
    </p>
    <ul>
      <li>ఇది గ్లోబల్ వేరియబుల్‌ను మార్చదు; కేవలం చుట్టూ ఉన్న క్లోజర్ వేరియబుల్‌ను మాత్రమే సవరిస్తుంది.</li>
      <li>పైథాన్‌లో <strong>డెకరేటర్స్ (Decorators)</strong> మరియు ఫ్యాక్టరీ ఫంక్షన్ల నిర్మాణానికి క్లోజర్స్ అత్యంత ప్రాథమిక పునాది.</li>
      <li>ప్రతి క్లోజర్ ఫంక్షన్‌కు <code>__closure__</code> అనే స్పెషల్ అట్రిబ్యూట్ ఉంటుంది, ఇందులో ఆ సెల్ వాల్యూస్ (<code>cell_contents</code>) భద్రంగా ఉంటాయి.</li>
    </ul>

    <!-- SECTION 11 -->
    <h2 class="section-title"><span class="num">11</span> కోడ్ డెమో 2: క్లోజర్-బేస్డ్ బ్యాంక్ వాలెట్ with <code>nonlocal</code></h2>
    <p>
      <code>nonlocal</code> కీవర్డ్ ద్వారా ఒక ప్రైవేట్ బ్యాలెన్స్‌ను భద్రపరిచే క్లోజర్ ఇంప్లిమెంటేషన్‌ను క్రింద పరిశీలిద్దాం:
    </p>

    <!-- CODE BLOCK 2 -->
    <div class="code-block">
      <div class="code-header">
        <span class="file-name">02_closure_wallet_nonlocal.py</span>
        <div class="btn-group">
          <button class="btn btn-copy" onclick="copyCode(this)">Copy</button>
          <button class="btn btn-run" onclick="runCodeInCompiler(this)">Run ▶</button>
        </div>
      </div>
      <pre><code class="language-python"># nonlocal & క్లోజర్ డెమో
def make_secure_wallet(initial_balance: float):
    """ఒక ప్రైవేట్ బ్యాలెన్స్ స్టేట్ కలిగిన వాలెట్ ఫంక్షన్‌ను సృష్టిస్తుంది."""
    balance = initial_balance  # Enclosing Scope Variable

    def spend(amount: float):
        nonlocal balance  # బయటి ఫంక్షన్ లోని balance ను మార్చడానికి అనుమతి!
        if amount > balance:
            return f"❌ లావాదేవీ విఫలం! నిల్వ సరిపోదు (ప్రస్తుతం: ₹{balance:,.2f})"
        balance -= amount
        return f"✅ ₹{amount:,.2f} చెల్లించబడింది. మిగిలిన బ్యాలెన్స్: ₹{balance:,.2f}"

    return spend

# వాలెట్ సృష్టి (రాహుల్ వాలెట్ ప్రారంభ బ్యాలెన్స్ ₹5,000)
rahul_wallet = make_secure_wallet(5000.0)

print(rahul_wallet(1200)) # 5000 - 1200 = 3800
print(rahul_wallet(2500)) # 3800 - 2500 = 1300
print(rahul_wallet(2000)) # ఫెయిల్! (1300 మాత్రమే ఉంది)
</code></pre>
    </div>

    <!-- SECTION 12 -->
    <h2 class="section-title"><span class="num">12</span> కామన్ బిగినర్స్ మిస్టేక్స్ &amp; UnboundLocalError బగ్</h2>
    <ul>
      <li><strong>The Infamous UnboundLocalError:</strong>
        <div style="background:#0f172a; padding:10px 14px; border-radius:6px; font-family:'JetBrains Mono', monospace; font-size:12px; color:#fca5a5; margin:6px 0;">
          count = 10<br/>
          def increment():<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;print(count) # UnboundLocalError: cannot access local variable 'count' where it is not associated with a value!<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;count = 20
        </div>
        <strong>కారణం &amp; పరిష్కారం:</strong> ఫంక్షన్ లోపల ఎక్కడైనా <code>count = 20</code> అని అసైన్‌మెంట్ కనిపిస్తే, పైథాన్ ఆ ఫంక్షన్ మొత్తానికి <code>count</code> ను లోకల్ వేరియబుల్‌గా గుర్తిస్తుంది. ఫలితంగా అసైన్ చేయడానికి ముందే దాన్ని ప్రింట్ చేయడానికి చూసినప్పుడు ఈ ఎర్రర్ వస్తుంది. గ్లోబల్ వేరియబుల్ అయితే ఫంక్షన్ పైన <code>global count</code> అని ప్రకటించాలి.
      </li>
      <li><strong>Mistake 2: *args తర్వాత పొజిషనల్ ఆర్గ్యుమెంట్స్ రాయడం:</strong> <code>def f(*args, x):</code> అని రాస్తే, <code>x</code> తప్పనిసరిగా Keyword-Only అవుతుంది. కాల్ చేసేటప్పుడు <code>f(1, 2, x=3)</code> అని పేరుతో పిలవాలి తప్ప పొజిషనల్‌గా పాస్ చేయలేము.</li>
      <li><strong>Mistake 3: **kwargs తర్వాత ఏదైనా పారామీటర్ పెట్టడం:</strong> <code>**kwargs</code> ఎల్లప్పుడూ ఫంక్షన్ సిగ్నేచర్‌లో <strong>చిట్టచివరి పారామీటర్‌గా మాత్రమే</strong> ఉండాలి! దాని తర్వాత ఇంకేదీ ఉండకూడదు.</li>
      <li><strong>Mistake 4: గ్లోబల్ మ్యూటబుల్ ఆబ్జెక్టులను సవరించడంలో గందరగోళం:</strong> గ్లోబల్ లిస్ట్‌లోకి <code>gl_list.append(5)</code> అని రాస్తే <code>global</code> కీవర్డ్ అవసరం లేదు (ఎందుకంటే రీ-అసైన్‌మెంట్ జరగలేదు, ఇన్-ప్లేస్ మ్యుటేషన్ మాత్రమే). కానీ <code>gl_list = [5]</code> అని కొత్త లిస్ట్‌ను కేటాయించాలంటే తప్పనిసరిగా <code>global gl_list</code> ఉండాలి!</li>
      <li><strong>Best Practice: ఫంక్షన్ డెకరేటర్లలో యూనివర్సల్ పాసింగ్:</strong> పైథాన్‌లో డెకరేటర్లు రాసేటప్పుడు <code>wrapper(*args, **kwargs)</code> అని రాస్తే అది అసలైన ఫంక్షన్‌కు ఏ రకమైన ఆర్గ్యుమెంట్లు వచ్చినా ఎటువంటి నష్టం లేకుండా నిశ్చింతగా పాస్ చేస్తుంది.</li>
    </ul>

    <!-- SECTION 13 -->
    <h2 class="section-title"><span class="num">13</span> రియల్-వరల్డ్ ప్రాజెక్ట్: "Enterprise Microservice Event Logger &amp; Auditing Dispatcher"</h2>
    <p>
      ఈ పదిహేడవ అధ్యాయంలో నేర్చుకున్న అన్ని అంశాలను (<code>*args</code>, <code>**kwargs</code>, అన్‌ప్యాకింగ్, LEGB స్కోప్, క్లోజర్స్, గ్లోబల్ ఆడిట్ కౌంటర్స్) సమగ్రంగా అనుసంధానిస్తూ — వేలాది మైక్రోసర్వీసుల నుండి వచ్చే విభిన్న పేలోడ్లను ప్రాసెస్ చేసే పూర్తి స్థాయి <strong>Enterprise Event Logger &amp; Auditing Dispatcher Engine</strong> ను నిర్మిద్దాం!
    </p>

    <!-- CODE BLOCK 3: CAPSTONE MINI PROJECT -->
    <div class="code-block">
      <div class="code-header">
        <span class="file-name">03_microservice_event_dispatcher.py</span>
        <div class="btn-group">
          <button class="btn btn-copy" onclick="copyCode(this)">Copy</button>
          <button class="btn btn-run" onclick="runCodeInCompiler(this)">Run ▶</button>
        </div>
      </div>
      <pre><code class="language-python"># =====================================================================
# చాప్టర్ 17 మినీ ప్రాజెక్ట్: Microservice Event Logger & Audit Dispatcher
# కాన్సెప్ట్స్: *args (Dynamic Tags), **kwargs (Flexible Event Payload),
#             LEGB Scope Resolution, Closure Metrics Tracker, Unpacking
# =====================================================================
from datetime import datetime

# Global Audit Registry (LEGB - Global Scope)
TOTAL_EVENTS_DISPATCHED = 0
SEVERITY_COUNTS = {"INFO": 0, "WARNING": 0, "CRITICAL": 0}

def create_service_event_dispatcher(service_name: str, environment: str = "PRODUCTION"):
    """ఒక నిర్దిష్ట మైక్రోసర్వీస్ కోసం క్లోజర్-ఆధారిత ఈవెంట్ డిస్పాచర్‌ను సృష్టిస్తుంది."""
    local_event_counter = 0  # Enclosing Scope Variable

    def log_event(severity: str, event_action: str, *tags, **metadata):
        nonlocal local_event_counter
        global TOTAL_EVENTS_DISPATCHED, SEVERITY_COUNTS

        local_event_counter += 1
        TOTAL_EVENTS_DISPATCHED += 1
        SEVERITY_COUNTS[severity] = SEVERITY_COUNTS.get(severity, 0) + 1

        timestamp = datetime.now().strftime("%H:%M:%S")
        tag_str = " ".join([f"#{t}" for t in tags]) if tags else "#UNTYPED"

        # కన్సోల్ ఆడిట్ అవుట్‌పుట్
        icon = "🔴" if severity == "CRITICAL" else ("🟡" if severity == "WARNING" else "🟢")
        print(f"[{timestamp}] {icon} [{severity:<8}] [{service_name}] #{local_event_counter}")
        print(f"  యాక్షన్: {event_action:<28} ట్యాగ్స్: {tag_str}")

        if metadata:
            print("  మెటాడేటా పేలోడ్:")
            for k, v in metadata.items():
                print(f"    • {k:<15} : {v}")
        print("-" * 65)

    return log_event

# 1. రెండు వేర్వేరు మైక్రోసర్వీసుల కోసం డిస్పాచర్లను సృష్టించడం
auth_service_logger = create_service_event_dispatcher("AUTH-SERVICE")
payment_service_logger = create_service_event_dispatcher("PAYMENT-SERVICE")

print("\\n" + "=" * 65)
print(f"{'🌐 మన ఎంటర్‌ప్రైజ్ మైక్రోసర్వీస్ ఈవెంట్ ఆడిట్ స్ట్రీమ్ 2026':^65}")
print("=" * 65)

# 2. AUTH SERVICE లాగ్స్ (*args ద్వారా ట్యాగ్స్, **kwargs ద్వారా మెటాడేటా)
auth_service_logger(
    "INFO", "USER_LOGIN_SUCCESS",
    "security", "oauth2",
    user_id="USR-9921", ip="192.168.1.100", browser="Chrome 122"
)

auth_service_logger(
    "WARNING", "FAILED_PASSWORD_ATTEMPT",
    "bruteforce_risk", "security",
    user_id="USR-8810", ip="45.154.255.88", attempts_count=3
)

# 3. PAYMENT SERVICE లాగ్స్ (డైనమిక్ పేమెంట్ ఫీల్డ్స్)
payment_payload = {
    "txn_id": "TXN-9008129",
    "amount_inr": 24999.0,
    "gateway": "RAZORPAY",
    "card_network": "VISA"
}
payment_service_logger("INFO", "PAYMENT_CAPTURED", "finance", "instant", **payment_payload)

# 4. CRITICAL EVENT
payment_service_logger(
    "CRITICAL", "GATEWAY_TIMEOUT",
    "critical", "outage",
    gateway="RAZORPAY", error_code="ERR_504_TIMEOUT", retry_attempt=3
)

# 5. గ్లోబల్ మెట్రిక్స్ సమ్మరీ (Global Scope Audit)
print("=" * 65)
print(f"మొత్తం డిస్పాచ్ అయిన ఈవెంట్లు : {TOTAL_EVENTS_DISPATCHED}")
print(f"సెక్యూరిటీ తీవ్రత సమ్మరీ     : {SEVERITY_COUNTS}")
print("=" * 65 + "\\n")
</code></pre>
    </div>

    <!-- 5 COLLAPSIBLE QUIZZES -->
    <h2 class="section-title"><span class="num">★</span> ఈ అధ్యాయంపై ప్రాక్టీస్ క్విజ్ (Knowledge Check)</h2>

    <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px 18px; margin-bottom:12px; cursor:pointer;">
      <summary style="font-weight:700; color:#10b981; font-size:14.5px;">1. *args మరియు **kwargs డేటాను ఏ డేటా స్ట్రక్చర్లలోకి ప్యాక్ చేస్తాయి?</summary>
      <div style="font-size:13.5px; color:var(--text); line-height:1.7; margin-top:10px;">
        <strong>సమాధానం:</strong> <code>*args</code> అదనపు పొజిషనల్ ఆర్గ్యుమెంట్లను ఒక <strong>టుపుల్ (Tuple)</strong> లోకి ప్యాక్ చేస్తుంది. <code>**kwargs</code> అదనపు కీవర్డ్ ఆర్గ్యుమెంట్లను ఒక <strong>డిక్షనరీ (Dictionary)</strong> లోకి ప్యాక్ చేస్తుంది.
      </div>
    </details>

    <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px 18px; margin-bottom:12px; cursor:pointer;">
      <summary style="font-weight:700; color:#10b981; font-size:14.5px;">2. LEGB రూల్ ప్రకారం పైథాన్ వేరియబుల్స్‌ను ఏ క్రమంలో వెతుకుతుంది?</summary>
      <div style="font-size:13.5px; color:var(--text); line-height:1.7; margin-top:10px;">
        <strong>సమాధానం:</strong> 1. <strong>Local (L)</strong> — ప్రస్తుత ఫంక్షన్ బాడీ. 2. <strong>Enclosing (E)</strong> — బయటి నెస్టెడ్ ఫంక్షన్ స్కోప్. 3. <strong>Global (G)</strong> — ప్రస్తుత మాడ్యూల్ లేదా మెయిన్ ఫైల్. 4. <strong>Built-in (B)</strong> — పైథాన్ అంతర్నిర్మిత నేమ్‌స్పేస్.
      </div>
    </details>

    <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px 18px; margin-bottom:12px; cursor:pointer;">
      <summary style="font-weight:700; color:#10b981; font-size:14.5px;">3. global మరియు nonlocal కీవర్డ్స్ మధ్య ముఖ్యమైన తేడా ఏమిటి?</summary>
      <div style="font-size:13.5px; color:var(--text); line-height:1.7; margin-top:10px;">
        <strong>సమాధానం:</strong> <code>global</code> అనేది మాడ్యూల్ స్థాయి గ్లోబల్ వేరియబుల్‌ను ఫంక్షన్ లోపల నుండి సవరించడానికి అనుమతిస్తుంది. <code>nonlocal</code> అనేది నెస్టెడ్ ఫంక్షన్లలో బయటి ఫంక్షన్ (Enclosing Scope) లోని వేరియబుల్‌ను సవరించడానికి ఉపయోగపడుతుంది (ఇది గ్లోబల్ వేరియబుల్స్ వరకు వెళ్ళదు).
      </div>
    </details>

    <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px 18px; margin-bottom:12px; cursor:pointer;">
      <summary style="font-weight:700; color:#10b981; font-size:14.5px;">4. UnboundLocalError ఎప్పుడు సంభవిస్తుంది? దానిని ఎలా నివారించాలి?</summary>
      <div style="font-size:13.5px; color:var(--text); line-height:1.7; margin-top:10px;">
        <strong>సమాధానం:</strong> ఒక ఫంక్షన్ లోపల వేరియబుల్‌కు విలువను అసైన్ చేయడానికి ముందే దానిని చదవడానికి (print చేయడానికి) ప్రయత్నించినప్పుడు వస్తుంది. ఆ వేరియబుల్ గ్లోబల్ స్కోప్‌లో ఉన్నప్పటికీ, ఫంక్షన్ లోపల అసైన్‌మెంట్ ఉన్నందున పైథాన్ దాన్ని లోకల్ అనుకుంటుంది. దీనిని నివారించడానికి ఫంక్షన్ ప్రారంభంలో <code>global var_name</code> అని రాయాలి.
      </div>
    </details>

    <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px 18px; margin-bottom:12px; cursor:pointer;">
      <summary style="font-weight:700; color:#10b981; font-size:14.5px;">5. ఫంక్షన్ సిగ్నేచర్‌లో **kwargs ఎక్కడ ఉండాలి?</summary>
      <div style="font-size:13.5px; color:var(--text); line-height:1.7; margin-top:10px;">
        <strong>సమాధానం:</strong> <code>**kwargs</code> తప్పనిసరిగా ఫంక్షన్ పారామీటర్ల జాబితాలో <strong>చిట్టచివరి పారామీటర్‌గా మాత్రమే</strong> ఉండాలి. దాని తర్వాత ఏ ఇతర పారామీటర్లను రాయడం సింటాక్స్ ఎర్రర్ అవుతుంది.
      </div>
    </details>

    <!-- PREV / NEXT NAVIGATION -->
    <div style="display:flex; justify-content:space-between; align-items:center; margin-top:40px; padding-top:20px; border-top:1px solid var(--border); flex-wrap:wrap; gap:16px;">
      <a href="/blog-python/16-python-functions-fundamentals.html" style="text-decoration:none; color:var(--text); font-weight:600; display:inline-flex; align-items:center; gap:8px; background:var(--bg2); padding:10px 18px; border-radius:8px; border:1px solid var(--border);">
        ← మునుపటి అధ్యాయం: 16. ఫంక్షన్స్ ఫండమెంటల్స్
      </a>
      <a href="/blog-python/18-python-lambda-recursion-functional.html" style="text-decoration:none; color:#ffffff; font-weight:700; display:inline-flex; align-items:center; gap:8px; background:#10b981; padding:10px 22px; border-radius:8px; box-shadow:0 4px 12px rgba(16,185,129,0.3);">
        తర్వాతి అధ్యాయం: 18. ల్యాంబ్డా, రికర్షన్ &amp; ఫంక్షనల్ ప్రోగ్రామింగ్ →
      </a>
    </div>

    <!-- INTERACTIVE COMPILER CTA CARD -->
    <div style="margin-top:40px; background:linear-gradient(135deg, rgba(16,185,129,0.1) 0%, rgba(56,189,248,0.1) 100%); border:1px solid rgba(16,185,129,0.3); border-radius:12px; padding:24px; text-align:center;">
      <h3 style="margin-top:0; color:var(--text); font-size:20px;">ఈ Microservice Event Logger ని లైవ్‌గా మన కంపైలర్‌లో రన్ చేయండి!</h3>
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
# చాప్టర్ 17 మినీ ప్రాజెక్ట్: Event Logger & Scope Tracker (LIVE DEMO)
# =====================================================================
def audit_event(event_name, *tags, **details):
    print("=" * 60)
    print(f"ఈవెంట్ : {event_name}")
    print(f"ట్యాగ్స్ : {tags}")
    print("వివరాలు:")
    for k, v in details.items():
        print(f"  • {k}: {v}")
    print("=" * 60)

audit_event("ORDER_PLACED", "ecommerce", "live", order_id="ORD-99", amount=4500, user="సురేష్")
print("\\n🎉 చాప్టర్ 17 ప్రాజెక్ట్ విజయవంతంగా రన్ అయ్యింది! 🚀")
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
fs.writeFileSync(outputPath, chapter17Content, 'utf8');
console.log('✅ Successfully generated deep high-value Python Chapter 17 in exact HTML style!');
console.log('Target file:', currentLesson.file);
console.log('Target file size:', chapter17Content.length, 'characters');
