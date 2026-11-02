const fs = require('fs');
const path = require('path');
const { LESSONS, buildPythonSidebar } = require('./python_curriculum_data.js');

const currentLesson = LESSONS[3]; // Chapter 04 (0-indexed 3)
const sidebarHtml = buildPythonSidebar(4);

const chapter04Content = `<!DOCTYPE html>
<html class="light-theme" lang="te">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${currentLesson.title} — Python 3 Tutorial | Our Compiler</title>
  <meta name="description" content="Python 3 ఇన్‌పుట్ & అవుట్‌పుట్ ఫార్మాటింగ్ సమగ్ర తెలుగు గైడ్: print() సెపరేటర్ (sep), ఎండ్ (end), flush, file redirection, input() శానిటైజేషన్, split() & map() మల్టిపుల్ ఇన్‌పుట్, f-strings అలైన్‌మెంట్, ప్యాడింగ్, Competitive Programming Fast I/O, మరియు Bank ATM Statement ప్రాజెక్ట్." />
  <meta name="keywords" content="python input output telugu, python print function telugu, python f strings telugu, python format specifiers, python fast io telugu, learn python in telugu, our compiler" />
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
    "headline": "${currentLesson.title} (Complete Guide to Python Input, Output and f-strings Formatting in Telugu)",
    "description": "Python 3 ఇన్‌పుట్ & అవుట్‌పుట్ ఫార్మాటింగ్ పూర్తి గైడ్: print() sep/end/flush, input(), split/map, modern f-strings, format specifiers, Fast I/O, మరియు Bank ATM Statement Generator ప్రాజెక్ట్.",
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
    "datePublished": "2026-01-18",
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
        'abs','open','help','dir','filter','bool','split','strip'
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
      <span>Chapter 4: ${currentLesson.title}</span>
    </div>

    <!-- PAGE TITLE -->
    <h1 class="page-title">${currentLesson.title}</h1>

    <!-- PAGE META BADGES -->
    <div class="page-meta">
      <span class="badge badge-tech">🐍 Modern Python (Python 3.12+)</span>
      <span class="badge badge-chapter">🎯 Chapter 4 of 25</span>
      <span class="badge badge-phase">🚀 Phase 01: పైథాన్ ఫండమెంటల్స్ &amp; బేసిక్స్</span>
      <span class="badge badge-edition">📅 2026 Edition</span>
    </div>

    <!-- COVERED TOPICS PILL BAR -->
    <div style="background:var(--bg3); border:1px solid var(--border); border-radius:10px; padding:12px 18px; margin-bottom:24px; font-size:13px; line-height:1.7;">
      <span style="color:#10b981; font-weight:700;">📌 Covered in this chapter:</span>
      <span style="color:var(--text2); margin-left:6px;">
        Standard I/O ఆర్కిటెక్చర్ · print() పారామీటర్లు (sep, end, flush, file) · input() &amp; టైప్ సేఫ్టీ · split() &amp; map() సింగిల్-లైన్ ఇన్‌పుట్స్ · Legacy % &amp; str.format() · Modern f-strings &amp; PEP 498 · నంబర్ అలైన్‌మెంట్, ప్యాడింగ్ &amp; కరెన్సీ ఫార్మాటింగ్ · Competitive Programming Fast I/O · Bank ATM Passbook Printer ప్రాజెక్ట్!
      </span>
    </div>

    <!-- INTRO BOX (Warm Soft Ivory HTML5 Style) -->
    <div class="intro-box">
      ఏ సాఫ్ట్‌వేర్ అప్లికేషన్ అయినా విజయవంతం కావాలంటే అది యూజర్ల నుండి సరైన ఇన్‌పుట్‌ను స్వీకరించగలగాలి మరియు ఫలితాన్ని స్పష్టంగా, ఆకర్షణీయంగా అవుట్‌పుట్ రూపంలో ప్రదర్శించగలగాలి.
      పైథాన్‌లో కేవలం <code>print()</code> మరియు <code>input()</code> ఫంక్షన్లను ప్రాథమికంగా వాడటం మాత్రమే కాదు; తెరవెనుక <strong>Standard I/O Streams (stdin, stdout)</strong> ఎలా పనిచేస్తాయి, బఫర్ ఫ్లషింగ్ ఎలా జరుగుతుంది, మరియు Python 3.6+ లో వచ్చిన గేమ్-చేంజర్ <strong>f-strings (Formatted String Literals)</strong> తో డేటాను ఎలా అందంగా టేబుల్స్ లాగా తీర్చిదిద్దాలో అర్థం చేసుకోవడం చాలా ముఖ్యం.
      ఈ నాల్గవ అధ్యాయంలో — కస్టమ్ సెపరేటర్లు, లైవ్ ప్రోగ్రెస్ బార్లు, మల్టీ-వేరియబుల్ ఫాస్ట్ రీడింగ్, కరెన్సీ అలైన్‌మెంట్, మరియు ఒక పూర్తి స్థాయి <strong>Bank ATM Mini-Statement &amp; Dynamic Passbook Printer</strong> ప్రాజెక్ట్ ద్వారా పైథాన్ I/O లో పరిపూర్ణ నైపుణ్యాన్ని సాధిద్దాం!
    </div>

    <!-- SECTION 1 -->
    <h2 class="section-title"><span class="num">1</span> పైథాన్ I/O ఆర్కిటెక్చర్ అంటే ఏమిటి? (Standard Streams: stdin, stdout, stderr)</h2>
    <p>
      పైథాన్ ప్రోగ్రామ్ రన్ అవుతున్నప్పుడు ఆపరేటింగ్ సిస్టమ్ దానికి మూడు ప్రామాణిక కమ్యూనికేషన్ చానెల్స్ (Standard Streams) ను కేటాయిస్తుంది. ఇవి <code>sys</code> మాడ్యూల్ ద్వారా లభిస్తాయి:
    </p>

    <div class="tbl-wrap">
      <table class="tbl">
        <thead>
          <tr>
            <th>స్ట్రీమ్ పేరు</th>
            <th>ఫైల్ డిస్క్రిప్టర్</th>
            <th>పైథాన్ ఆబ్జెక్ట్</th>
            <th>సాధారణ ప్రవర్తన (Default Behavior)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Standard Input (stdin)</strong></td>
            <td>0</td>
            <td><code>sys.stdin</code></td>
            <td>కీబోర్డ్ నుండి యూజర్ టైప్ చేసే అక్షరాలను రీడ్ చేస్తుంది (ఇది <code>input()</code> కు మూలాధారం).</td>
          </tr>
          <tr>
            <td><strong>Standard Output (stdout)</strong></td>
            <td>1</td>
            <td><code>sys.stdout</code></td>
            <td>కన్సోల్ లేదా టెర్మినల్ స్క్రీన్‌పై సాధారణ ఫలితాలను ప్రింట్ చేస్తుంది (ఇది <code>print()</code> కు మూలాధారం).</td>
          </tr>
          <tr>
            <td><strong>Standard Error (stderr)</strong></td>
            <td>2</td>
            <td><code>sys.stderr</code></td>
            <td>ఎర్రర్స్ మరియు వార్నింగ్ లాగ్స్‌ను ప్రదర్శిస్తుంది. ఇది బఫర్ లేకుండా (Unbuffered) వెంటనే స్క్రీన్‌పై పడుతుంది.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #10b981; border-radius:8px; padding:16px; margin:18px 0;">
      <div style="font-weight:700; color:#10b981; margin-bottom:8px;">💡 I/O బఫరింగ్ అంటే ఏమిటి? (Line Buffering):</div>
      <p style="font-size:13.5px; color:var(--text); line-height:1.7; margin-bottom:0;">
        కంప్యూటర్ ప్రతి అక్షరాన్ని నేరుగా మానిటర్‌పై లేదా డిస్క్‌పై రాయడానికి చాలా CPU సమయం పడుతుంది. అందుకే పైథాన్ అక్షరాలను ముందుగా మెమరీలోని ఒక తాత్కాలిక డబ్బాలో (Buffer) నిల్వ చేస్తుంది. ఒక న్యూలైన్ క్యారెక్టర్ (<code>\\n</code>) వచ్చినప్పుడు లేదా బఫర్ నిండిపోయినప్పుడు మాత్రమే మొత్తం డేటాను ఒకేసారి స్క్రీన్‌పైకి నెడుతుంది. దీనినే <strong>Line Buffering</strong> అంటారు.
      </p>
    </div>

    <!-- SECTION 2 -->
    <h2 class="section-title"><span class="num">2</span> <code>print()</code> ఫంక్షన్ ఇంటర్నల్స్ — sep, end, file &amp; flush పారామీటర్లు</h2>
    <p>
      చాలామంది బిగినర్స్ <code>print("Hello World")</code> అని మాత్రమే రాస్తారు. కానీ పైథాన్ అఫీషియల్ డాక్యుమెంటేషన్‌లో <code>print()</code> ఫంక్షన్ యొక్క పూర్తి సిగ్నేచర్ ఇలా ఉంటుంది:
    </p>

    <div style="background:#0f172a; padding:14px 20px; border-radius:8px; font-family:'JetBrains Mono', monospace; font-size:13px; color:#38bdf8; margin:14px 0;">
      print(*objects, sep=' ', end='\\n', file=None, flush=False)
    </div>

    <p>
      ఈ 4 ఐచ్ఛిక పారామీటర్లు ప్రొడక్షన్ కోడింగ్‌లో ఎంతో శక్తివంతమైనవి:
    </p>

    <ul>
      <li><strong>1. <code>*objects</code>:</strong> మీరు ఎన్ని విలువలనైనా కామాతో వేరు చేసి ఇవ్వవచ్చు (ఉదా: <code>print("పేరు:", name, "వయస్సు:", age)</code>).</li>
      <li><strong>2. <code>sep</code> (Separator - డిఫాల్ట్: సింగిల్ స్పేస్ <code>' '</code>):</strong> ఇచ్చిన ఆబ్జెక్టుల మధ్య ఏ అక్షరం లేదా చిహ్నం రావాలో నిర్ణయిస్తుంది. 
        <br/>ఉదాహరణ: <code>print("2026", "11", "02", sep="-")</code> ప్రింట్ చేసేది: <code>2026-11-02</code>.
      </li>
      <li><strong>3. <code>end</code> (End Character - డిఫాల్ట్: న్యూలైన్ <code>'\\n'</code>):</strong> అన్నీ ప్రింట్ అయిన తర్వాత చివరగా ఏ అక్షరం రావాలో చెబుతుంది. బై-డిఫాల్ట్ కర్సర్ తర్వాతి లైన్‌కు వెళ్తుంది. కానీ <code>end=" "</code> అని ఇస్తే కర్సర్ అదే లైన్‌లో ఆగుతుంది!</li>
      <li><strong>4. <code>flush</code> (డిఫాల్ట్: <code>False</code>):</strong> బఫర్ నిండే వరకు వేచి ఉండకుండా వెంటనే డేటాను స్క్రీన్‌పైకి పంపించాలా లేదా అని నిర్ణయిస్తుంది. లైవ్ కౌంట్‌డౌన్ టైమర్లు, డౌన్‌లోడ్ ప్రోగ్రెస్ బార్లలో <code>flush=True</code> తప్పనిసరి!</li>
      <li><strong>5. <code>file</code> (డిఫాల్ట్: <code>sys.stdout</code>):</strong> కన్సోల్‌కు కాకుండా నేరుగా ఒక ఫైల్‌లోకి ప్రింట్ చేయాలంటే <code>file=f</code> ఉపయోగించవచ్చు.</li>
    </ul>

    <!-- SECTION 3 -->
    <h2 class="section-title"><span class="num">3</span> కోడ్ డెమో 1: అడ్వాన్స్‌డ్ <code>print()</code> ఫీచర్లు &amp; క్యారేజ్ రిటర్న్ (<code>\\r</code>)</h2>
    <p>
      క్రింది కోడ్‌ను గమనించండి. ఇందులో <code>sep</code>, <code>end</code> మరియు క్యారేజ్ రిటర్న్ (<code>\\r</code>) ఉపయోగించి ఒకే లైన్‌లో అప్‌డేట్ అయ్యే లైవ్ ప్రోగ్రెస్ ఎఫెక్ట్‌ను చూద్దాం:
    </p>

    <!-- CODE BLOCK 1 -->
    <div class="code-block">
      <div class="code-header">
        <span class="file-name">01_advanced_print_parameters.py</span>
        <div class="btn-group">
          <button class="btn btn-copy" onclick="copyCode(this)">Copy</button>
          <button class="btn btn-run" onclick="runCodeInCompiler(this)">Run ▶</button>
        </div>
      </div>
      <pre><code class="language-python"># అడ్వాన్స్‌డ్ print() పారామీటర్ల డెమో
import time

print("=" * 50)
print("     1. కస్టమ్ సెపరేటర్లు (Custom Separators)")
print("=" * 50)

# URL నిర్మాణం
protocol = "https"
domain = "www.ourcompiler.com"
path = "blog-python"
print(protocol, "://", domain, "/", path, sep="")

# తేదీ మరియు సమయం ఫార్మాటింగ్
day, month, year = 2, 11, 2026
print("నేటి తేదీ:", day, month, year, sep="/")

# బహుళ విలువల మధ్య బాణం గుర్తులు
steps = ["ఇన్‌పుట్ తీసుకోండి", "డేటాను ప్రాసెస్ చేయండి", "ఫలితాన్ని ప్రింట్ చేయండి"]
print(*steps, sep=" ──▶ ")

print("\\n" + "=" * 50)
print("     2. లైన్ బ్రేక్ నియంత్రణ (end parameter)")
print("=" * 50)

# ఒకే లైన్‌లో ప్రింట్ చేయడం
print("కౌంట్‌డౌన్ మొదలైంది: ", end="")
for i in [3, 2, 1]:
    print(f"{i}.. ", end="", flush=True)
print("🚀 BLAST OFF!")

# క్యారేజ్ రిటర్న్ (\\r) తో ఇన్-ప్లేస్ అప్‌డేట్
print("\\nడౌన్‌లోడ్ సిమ్యులేషన్:")
for percent in [25, 50, 75, 100]:
    # \\r కర్సర్‌ను లైన్ ప్రారంభానికి తెస్తుంది
    print(f"\\rడౌన్‌లోడ్ అవుతోంది: [{percent}%]", end="", flush=True)
print("  ✅ పూర్తి అయ్యింది!")
</code></pre>
    </div>

    <!-- SECTION 4 -->
    <h2 class="section-title"><span class="num">4</span> <code>input()</code> ఫంక్షన్ — యూజర్ డేటా సేకరణ &amp; టైప్ సేఫ్టీ</h2>
    <p>
      పైథాన్‌లో యూజర్ నుండి కీబోర్డ్ ద్వారా డేటాను స్వీకరించడానికి <code>input()</code> ఫంక్షన్‌ను ఉపయోగిస్తాము.
    </p>
    <div style="background:#0f172a; padding:12px 18px; border-radius:6px; font-family:'JetBrains Mono', monospace; font-size:13px; color:#38bdf8; margin:14px 0;">
      user_input = input("ప్రాంప్ట్ మెసేజ్ ఇక్కడ ఇవ్వండి: ")
    </div>

    <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #ef4444; border-radius:8px; padding:16px; margin:18px 0;">
      <div style="font-weight:700; color:#ef4444; margin-bottom:8px;">⚠️ బిగినర్స్ పడే నెంబర్ 1 ట్రాప్ (The input() Type Trap):</div>
      <p style="font-size:13.5px; color:var(--text); line-height:1.7; margin-bottom:8px;">
        యూజర్ నంబర్ టైప్ చేసినప్పటికీ (ఉదా: <code>25</code>), <strong><code>input()</code> ఎల్లప్పుడూ దాన్ని స్ట్రింగ్ (<code>str</code>) రూపంలోనే రిటర్న్ చేస్తుంది!</strong>
      </p>
      <div style="font-family:'JetBrains Mono', monospace; font-size:12.5px; background:rgba(239,68,68,0.1); padding:10px; border-radius:6px; color:var(--text);">
        age = input("మీ వయస్సు ఎంత? ") # యూజర్ 20 టైప్ చేశాడు<br/>
        next_year = age + 1<br/>
        # ❌ TypeError: can only concatenate str (not "int") to str!
      </div>
      <p style="font-size:13px; color:var(--text2); line-height:1.6; margin-top:8px; margin-bottom:0;">
        <strong>పరిష్కారం:</strong> గణిత లెక్కలు చేయడానికి ముందే స్పష్టంగా టైప్ కాస్టింగ్ చేయాలి: <code>age = int(input("మీ వయస్సు: "))</code>.
      </p>
    </div>

    <p>
      అలాగే యూజర్ పొరపాటున చివరలో కొట్టే అనవసరమైన ఖాళీలను తొలగించడానికి <strong><code>.strip()</code></strong> వాడటం ప్రొడక్షన్ బెస్ట్ ప్రాక్టీస్:
      <br/>
      <code>email = input("ఈమెయిల్ ఎంటర్ చేయండి: ").strip().lower()</code>
    </p>

    <!-- SECTION 5 -->
    <h2 class="section-title"><span class="num">5</span> మల్టిపుల్ ఇన్‌పుట్స్ ఒకే లైన్‌లో తీసుకోవడం (<code>split()</code> &amp; <code>map()</code>)</h2>
    <p>
      కాంపిటేటివ్ ప్రోగ్రామింగ్ (LeetCode, HackerRank) లేదా ఫాస్ట్ డేటా ఎంట్రీలో యూజర్లు ఒకే లైన్‌లో స్పేస్ ఇచ్చి బహుళ విలువలను టైప్ చేస్తారు (ఉదా: <code>10 20 30</code>).
      వీటిని వేర్వేరు వేరియబుల్స్‌లోకి ఎలా విడగొట్టాలో చూద్దాం:
    </p>

    <ul>
      <li><strong>1. స్ట్రింగ్స్ కోసం <code>split()</code>:</strong>
        <br/><code>first_name, last_name = input("మీ పూర్తి పేరు ఇవ్వండి: ").split()</code>
        <br/><code>split()</code> డిఫాల్ట్‌గా స్పేస్‌ల ఆధారంగా ముక్కలు చేసి లిస్ట్‌గా ఇస్తుంది.
      </li>
      <li><strong>2. సంఖ్యల కోసం <code>map()</code> ఫంక్షన్:</strong>
        <br/><code>x, y = map(int, input("రెండు సంఖ్యలు స్పేస్ ఇచ్చి ఎంటర్ చేయండి: ").split())</code>
        <br/><code>map(int, ...)</code> ప్రతి ముక్కపై <code>int()</code> ఫంక్షన్‌ను అప్లై చేస్తుంది.
      </li>
      <li><strong>3. తెలియని సంఖ్యలో ఇన్‌పుట్స్ ఉన్నప్పుడు (List Unpacking):</strong>
        <br/><code>marks = list(map(int, input("మార్కులు ఇవ్వండి: ").split()))</code>
      </li>
    </ul>

    <!-- SECTION 6 -->
    <h2 class="section-title"><span class="num">6</span> కోడ్ డెమో 2: మల్టీ-ఇన్‌పుట్ రీడింగ్ &amp; డేటా శానిటైజేషన్</h2>
    <p>
      ఒకే లైన్‌లో బహుళ ఇన్‌పుట్స్‌ను చదవడం, ఖాళీలను శుభ్రం చేయడం మరియు భద్రంగా టైప్ కాస్టింగ్ చేసే విధానాన్ని క్రింది స్క్రిప్ట్‌లో పరిశీలించండి:
    </p>

    <!-- CODE BLOCK 2 -->
    <div class="code-block">
      <div class="code-header">
        <span class="file-name">02_multi_input_and_sanitization.py</span>
        <div class="btn-group">
          <button class="btn btn-copy" onclick="copyCode(this)">Copy</button>
          <button class="btn btn-run" onclick="runCodeInCompiler(this)">Run ▶</button>
        </div>
      </div>
      <pre><code class="language-python"># మల్టిపుల్ ఇన్‌పుట్ పద్ధతులు & డేటా క్లీనింగ్ డెమో

# 1. ఒకే లైన్‌లో రెండు పేర్లు తీసుకోవడం
raw_input_data = "  రమేష్    కుమార్  "
first_name, last_name = raw_input_data.split()
print(f"మొదటి పేరు: [{first_name}], ఇంటిపేరు: [{last_name}]")

# 2. ఒకే లైన్‌లో బహుళ సంఖ్యలను చదివి కూడిక చేయడం
numbers_str = "10 25 40 85 100"
# map(int, ...) ద్వారా అన్నింటినీ పూర్ణాంకాలుగా మారుస్తున్నాము
num_list = list(map(int, numbers_str.split()))

print(f"\\nస్వీకరించిన సంఖ్యలు: {num_list}")
print(f"మొత్తం సంఖ్యల కూడిక (Sum): {sum(num_list)}")
print(f"గరిష్ట సంఖ్య (Max): {max(num_list)}")
print(f"కనిష్ట సంఖ్య (Min): {min(num_list)}")

# 3. సేఫ్ న్యూమరిక్ ఇన్‌పుట్ ఫంక్షన్ (Exception Handling)
def safe_read_integer(val_str):
    clean_val = val_str.strip()
    if clean_val.isdigit():
        return int(clean_val)
    return 0

test_val = " 4500 "
result = safe_read_integer(test_val)
print(f"\\nశానిటైజ్ చేయబడిన పూర్ణాంకం: {result} (Type: {type(result).__name__})")
</code></pre>
    </div>

    <!-- SECTION 7 -->
    <h2 class="section-title"><span class="num">7</span> స్ట్రింగ్ ఫార్మాటింగ్ చరిత్ర: <code>%</code> ఆపరేటర్ నుండి <code>str.format()</code> వరకు</h2>
    <p>
      పైథాన్‌లో స్ట్రింగ్స్‌లో వేరియబుల్స్‌ను పొందుపరచడానికి కాలక్రమేణా మూడు పద్ధతులు అభివృద్ధి చెందాయి:
    </p>

    <div class="tbl-wrap">
      <table class="tbl">
        <thead>
          <tr>
            <th>తరగతి / యుగం</th>
            <th>సింటాక్స్ శైలి</th>
            <th>ఉదాహరణ కోడ్</th>
            <th>పరిమితులు &amp; సమస్యలు</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>1. C-Style <code>%</code> Formatting</strong><br/>(Python 1.0+)</td>
            <td><code>"%s is %d" % (a, b)</code></td>
            <td><code>"ధర: ₹ %.2f" % 199.5</code></td>
            <td>బహుళ వేరియబుల్స్ ఉన్నప్పుడు రీడబిలిటీ ఘోరంగా ఉంటుంది. టైప్ మిస్-మ్యాచ్ జరిగితే క్రాష్ అవుతుంది.</td>
          </tr>
          <tr>
            <td><strong>2. <code>str.format()</code></strong><br/>(Python 2.7 / 3.0+)</td>
            <td><code>"{} is {}".format(a, b)</code></td>
            <td><code>"హలో {name}, బిల్లు {amt}".format(name="రాము", amt=500)</code></td>
            <td>సింటాక్స్ చాలా పొడవుగా ఉంటుంది (Verbose). కోడ్ చదవడానికి కష్టంగా మారుతుంది.</td>
          </tr>
          <tr>
            <td><strong>3. Modern f-strings</strong><br/>(Python 3.6+ PEP 498)</td>
            <td><code>f"{a} is {b}"</code></td>
            <td><code>f"ధర: ₹ {price:.2f}"</code></td>
            <td><strong>అత్యుత్తమ వేగం, సులభమైన సింటాక్స్ &amp; నేరుగా ఎక్స్‌ప్రెషన్లను రన్ చేసే సౌలభ్యం!</strong></td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- SECTION 8 -->
    <h2 class="section-title"><span class="num">8</span> Modern Python f-strings — సింటాక్స్ &amp; ఎక్స్‌ప్రెషన్ ఇవాల్యుయేషన్</h2>
    <p>
      Python 3.6 లో ప్రవేశపెట్టబడిన <strong>f-strings (Formatted String Literals)</strong> పైథాన్ చరిత్రలోనే అత్యంత ప్రజాదరణ పొందిన ఫీచర్లలో ఒకటి.
      స్ట్రింగ్ ముందు చిన్న లేదా పెద్ద అక్షరం <code>f</code> లేదా <code>F</code> పెట్టి, కర్లీ బ్రేసెస్ <code>{...}</code> లోపల వేరియబుల్స్ లేదా ఏ పైథాన్ ఎక్స్‌ప్రెషన్‌నైనా నేరుగా ఉంచవచ్చు:
    </p>

    <ul>
      <li><strong>నేరుగా గణిత లెక్కలు:</strong> <code>f"మొత్తం: {price * quantity}"</code></li>
      <li><strong>ఫంక్షన్ లేదా మెథడ్ కాల్స్:</strong> <code>f"స్వాగతం {user_name.strip().title()} గారూ!"</code></li>
      <li><strong>కండిషనల్ ఆపరేటర్లు (Ternary):</strong> <code>f"స్థితి: {'యాక్టివ్' if is_active else 'బ్లాక్ చేయబడింది'}"</code></li>
      <li><strong>పైథాన్ 3.8+ డీబగ్గింగ్ మ్యాజిక్ (<code>f"{var=}"</code>):</strong> డీబగ్గింగ్ కోసం వేరియబుల్ పేరు మరియు దాని విలువ రెండింటినీ ఆటోమేటిక్‌గా ప్రింట్ చేస్తుంది! 
        <br/><code>x = 42; print(f"{x=}")</code> అవుట్‌పుట్: <code>x=42</code>.
      </li>
    </ul>

    <!-- SECTION 9 -->
    <h2 class="section-title"><span class="num">9</span> f-strings ఫార్మాట్ స్పెసిఫైయర్స్ — నంబర్స్, అలైన్‌మెంట్, ప్యాడింగ్ &amp; కరెన్సీ</h2>
    <p>
      కర్లీ బ్రేసెస్ లోపల వేరియబుల్ పక్కన కోలన్ <code>:</code> పెట్టి ఫార్మాటింగ్ నియమాలను (Format Specifiers) నిర్దేశించవచ్చు:
    </p>

    <div class="tbl-wrap">
      <table class="tbl">
        <thead>
          <tr>
            <th>స్పెసిఫైయర్</th>
            <th>అర్థం</th>
            <th>ఇన్‌పుట్ విలువ</th>
            <th>ఫలితం (Output)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>{x:.2f}</code></td>
            <td>ఖచ్చితంగా 2 దశాంశ స్థానాలకు రౌండ్ చేస్తుంది</td>
            <td><code>199.6666</code></td>
            <td><code>199.67</code></td>
          </tr>
          <tr>
            <td><code>{x:,}</code></td>
            <td>వేల స్థానాల్లో కామా (Thousands separator)</td>
            <td><code>1500000</code></td>
            <td><code>1,500,000</code></td>
          </tr>
          <tr>
            <td><code>{x:08d}</code></td>
            <td>ఎడమవైపు సున్నాలతో 8 అంకెల ప్యాడింగ్ (Zero-padding)</td>
            <td><code>452</code></td>
            <td><code>00000452</code></td>
          </tr>
          <tr>
            <td><code>{x:&lt;15}</code></td>
            <td>ఎడమవైపు సర్దుబాటు (Left-align with 15 spaces)</td>
            <td><code>"ల్యాప్‌టాప్"</code></td>
            <td><code>"ల్యాప్‌టాప్     "</code></td>
          </tr>
          <tr>
            <td><code>{x:&gt;15}</code></td>
            <td>కుడివైపు సర్దుబాటు (Right-align with 15 spaces)</td>
            <td><code>"₹ 45,000"</code></td>
            <td><code>"       ₹ 45,000"</code></td>
          </tr>
          <tr>
            <td><code>{x:^15}</code></td>
            <td>మధ్యలోకి సర్దుబాటు (Center-align with 15 spaces)</td>
            <td><code>"హెడర్"</code></td>
            <td><code>"     హెడర్     "</code></td>
          </tr>
          <tr>
            <td><code>{x:.1%}</code></td>
            <td>శాతంగా మార్చడం (Percentage formatting)</td>
            <td><code>0.185</code></td>
            <td><code>18.5%</code></td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- SECTION 10 -->
    <h2 class="section-title"><span class="num">10</span> కోడ్ డెమో 3: f-strings ఫార్మాటింగ్ మాస్టరీ &amp; ప్రొఫెషనల్ టేబుల్</h2>
    <p>
      అలైన్‌మెంట్, డెసిమల్ ప్రెసిషన్ మరియు కామా సెపరేటర్లు వాడి అందమైన బిజినెస్ రిపోర్ట్ టేబుల్‌ను ఎలా తయారుచేయాలో క్రింది కోడ్ ద్వారా చూద్దాం:
    </p>

    <!-- CODE BLOCK 3 -->
    <div class="code-block">
      <div class="code-header">
        <span class="file-name">03_fstrings_table_formatting.py</span>
        <div class="btn-group">
          <button class="btn btn-copy" onclick="copyCode(this)">Copy</button>
          <button class="btn btn-run" onclick="runCodeInCompiler(this)">Run ▶</button>
        </div>
      </div>
      <pre><code class="language-python"># ప్రొఫెషనల్ f-strings ఫార్మాటింగ్ & టేబుల్ జనరేషన్ డెమో

products = [
    ("సోనీ హెడ్‌ఫోన్స్", 2, 4999.00),
    ("లాజిటెక్ వైర్‌లెస్ మౌస్", 5, 849.50),
    ("శామ్‌సంగ్ 4K మానిటర్", 1, 28990.00),
    ("మెకానికల్ కీబోర్డ్", 3, 3450.00)
]

print("=" * 66)
print(f"{'వస్తువు పేరు':<24} {'పరిమాణం':^10} {'ధర (₹)':>12} {'మొత్తం (₹)':>16}")
print("=" * 66)

grand_total = 0.0

for title, qty, price in products:
    total = qty * price
    grand_total += total
    # అలైన్‌మెంట్ మరియు నంబర్ ఫార్మాటింగ్
    print(f"{title:<22} {qty:^10} {price:>12,.2f} {total:>16,.2f}")

print("-" * 66)
print(f"{'మొత్తం చెల్లించవలసిన మొత్తం:':<44} {grand_total:>20,.2f}")
print("=" * 66)

# Python 3.8+ Debugging syntax demo
status = "SUCCESS"
latency_ms = 14.825
print(f"\\nడెబగ్ అవుట్‌పుట్: {status=} | {latency_ms=:.2f}ms")
</code></pre>
    </div>

    <!-- SECTION 11 -->
    <h2 class="section-title"><span class="num">11</span> Competitive Programming Fast I/O — <code>sys.stdin.readline</code> vs <code>input()</code></h2>
    <p>
      మీరు CodeChef, LeetCode, Codeforces వంటి ప్లాట్‌ఫామ్‌లలో కోడింగ్ చేస్తున్నప్పుడు పెద్ద సంఖ్యలో టెస్ట్ కేసులు (ఉదా: $10^5$ లేదా $10^6$ లైన్లు) ఉన్నప్పుడు సాధారణ <code>input()</code> వాడితే <strong>TLE (Time Limit Exceeded)</strong> ఎర్రర్ వస్తుంది!
    </p>
    <p>
      దీనికి కారణం: <code>input()</code> ఫంక్షన్ ప్రతి లైన్ రీడ్ చేయడానికి ముందు ప్రాంప్ట్ చెక్ చేయడం, చివర ఉన్న న్యూలైన్ <code>\\n</code> ను తొలగించడం వంటి అంతర్గత ఓవర్‌హెడ్‌ను కలిగి ఉంటుంది.
    </p>

    <div style="background:#0f172a; padding:14px 20px; border-radius:8px; font-family:'JetBrains Mono', monospace; font-size:13px; color:#38bdf8; margin:14px 0; line-height:1.7;">
      import sys<br/><br/>
      # Fast I/O ట్రిక్: input ను sys.stdin.readline కు రీ-అసైన్ చేయండి<br/>
      input = sys.stdin.readline<br/><br/>
      # ఫాస్ట్ అవుట్‌పుట్: print() కంటే sys.stdout.write 2x వేగవంతమైనది<br/>
      sys.stdout.write("ఫలితం: 100\\n")
    </div>

    <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #38bdf8; border-radius:8px; padding:16px; margin:18px 0;">
      <div style="font-weight:700; color:#38bdf8; margin-bottom:8px;">⚡ Fast I/O ముఖ్యాంశాలు:</div>
      <ul style="font-size:13px; color:var(--text2); line-height:1.8; margin-left:20px; margin-bottom:0;">
        <li><code>sys.stdin.readline()</code> చివర ఉన్న <code>\\n</code> ను తొలగించదు; కాబట్టి స్ట్రింగ్స్ కోసం <code>sys.stdin.readline().strip()</code> వాడాలి.</li>
        <li>సంఖ్యల కోసం <code>int(sys.stdin.readline())</code> నేరుగా పనిచేస్తుంది ఎందుకంటే <code>int()</code> ఆటోమేటిక్‌గా ఖాళీలను ఇగ్నోర్ చేస్తుంది.</li>
        <li>లక్ష లైన్ల ఇన్‌పుట్ ఉన్నప్పుడు <code>sys.stdin.readline</code> సాధారణ <code>input()</code> కంటే దాదాపు <strong>4 రెట్లు వేగంగా</strong> పనిచేస్తుంది!</li>
      </ul>
    </div>

    <!-- SECTION 12 -->
    <h2 class="section-title"><span class="num">12</span> కామన్ బిగినర్స్ మిస్టేక్స్ &amp; ప్రొడక్షన్ బెస్ట్ ప్రాక్టీసెస్</h2>
    <ul>
      <li><strong>Mistake 1: f-strings లో బ్యాక్‌స్లాష్ (<code>\\</code>) వాడటం:</strong> Python 3.11 వరకు <code>f"{'\\n'.join(items)}"</code> రాస్తే <code>SyntaxError</code> వచ్చేది. (Python 3.12 లో PEP 701 ద్వారా దీనిని సడలించారు). అయినప్పటికీ బ్యాక్‌స్లాష్ ఉండే ఎక్స్‌ప్రెషన్‌లను ముందుగానే వేరియబుల్‌లో సేవ్ చేసి f-string లో పెట్టడం మంచిది.</li>
      <li><strong>Mistake 2: <code>int(input())</code> లో నేకెడ్ క్రాష్‌లు:</strong> యూజర్ సంఖ్యకు బదులుగా అక్షరాలు కొట్టినప్పుడు ప్రోగ్రామ్ క్రాష్ అవ్వకుండా ఎల్లప్పుడూ <code>try...except ValueError</code> హ్యాండ్లింగ్ ఉండాలి.</li>
      <li><strong>Mistake 3: లూప్‌లలో <code>flush=True</code> మర్చిపోవడం:</strong> ఎక్కువ సమయం పట్టే లాంగ్ టాస్కులలో <code>end=''</code> పెట్టి <code>flush=True</code> ఇవ్వకపోతే, ప్రోగ్రామ్ మొత్తం పూర్తయ్యే వరకు స్క్రీన్‌పై ఏమీ కనిపించదు.</li>
      <li><strong>Mistake 4: <code>str.format()</code> లో ఇండెక్స్ మిస్‌మ్యాచ్:</strong> <code>"{0} {1} {2}".format(x, y)</code> అని రాస్తే <code>IndexError: Replacement index 2 out of range</code> వస్తుంది. ఆధునిక కోడ్‌లో ఎల్లప్పుడూ f-strings వాడండి.</li>
    </ul>

    <!-- SECTION 13 -->
    <h2 class="section-title"><span class="num">13</span> రియల్-వరల్డ్ ప్రాజెక్ట్: "Bank ATM Mini-Statement &amp; Dynamic Passbook Printer"</h2>
    <p>
      ఈ నాల్గవ అధ్యాయంలో నేర్చుకున్న అన్ని కాన్సెప్ట్‌లను (కస్టమ్ సెపరేటర్లు, లైవ్ ప్రోగ్రెస్ ఎఫెక్ట్స్, f-strings అలైన్‌మెంట్, ప్యాడింగ్, వేల స్థానాల్లో కామాలు, కరెన్సీ రౌండింగ్) కలగలిపి — ఒక పూర్తి స్థాయి <strong>Bank ATM Mini-Statement &amp; Passbook Printer</strong> ప్రాజెక్ట్‌ను నిర్మిద్దాం!
    </p>

    <!-- CODE BLOCK 4: CAPSTONE MINI PROJECT -->
    <div class="code-block">
      <div class="code-header">
        <span class="file-name">04_bank_atm_passbook_printer.py</span>
        <div class="btn-group">
          <button class="btn btn-copy" onclick="copyCode(this)">Copy</button>
          <button class="btn btn-run" onclick="runCodeInCompiler(this)">Run ▶</button>
        </div>
      </div>
      <pre><code class="language-python"># =====================================================================
# చాప్టర్ 04 మినీ ప్రాజెక్ట్: Bank ATM Mini-Statement & Passbook Engine
# కాన్సెప్ట్స్: f-strings Alignment, Currency Formatting, Zero-Padding,
#             Multi-column Ledger, Date Stamps & Account Masking
# =====================================================================

def print_atm_mini_statement(account_holder: str, acc_number: str, raw_transactions: list):
    """
    ఖాతాదారుని వివరాలు మరియు లావాదేవీలను స్వీకరించి అందమైన ATM రసీదును ముద్రిస్తుంది.
    """
    masked_acc = "XXXX-XXXX-" + acc_number[-4:] # చివరి 4 అంకెలు మాత్రమే
    header_title = "మన బ్యాంక్ ఆఫ్ ఇండియా — ATM డిజిటల్ పాస్‌బుక్"

    print("\\n" + "=" * 68)
    print(f"{header_title:^68}")
    print("=" * 68)
    print(f"ఖాతాదారుని పేరు : {account_holder:<28} తేదీ : 2026-11-02")
    print(f"ఖాతా నంబరు      : {masked_acc:<28} సమయం : 10:30:15 AM")
    print("-" * 68)
    print(f"{'Txn ID':<10} {'వివరణ':<22} {'రకం':^8} {'మొత్తం (₹)':>12} {'నిల్వ (₹)':>12}")
    print("-" * 68)

    running_balance = 50000.00 # ప్రారంభ నిల్వ (Opening Balance)

    for txn_id, desc, txn_type, amount in raw_transactions:
        if txn_type == "CR": # Credit (జమ)
            running_balance += amount
            type_label = "[+CR]"
        else: # Debit (ఖర్చు)
            running_balance -= amount
            type_label = "[-DR]"

        formatted_id = f"TXN{txn_id:04d}"
        print(f"{formatted_id:<10} {desc:<20} {type_label:^8} {amount:>12,.2f} {running_balance:>12,.2f}")

    print("=" * 68)
    print(f"{'తుది ఖాతా నిల్వ (Available Balance):':<42} ₹ {running_balance:>20,.2f}")
    print("=" * 68)
    print(f"{'మన బ్యాంక్ ఎంచుకున్నందుకు ధన్యవాదాలు! భద్రంగా ఉండండి.':^68}")
    print("=" * 68 + "\\n")

# లైవ్ రన్ డెమో
sample_txns = [
    (1, "జీతం డిపాజిట్", "CR", 45000.00),
    (2, "ఫ్లిప్‌కార్ట్ షాపింగ్", "DR", 4599.50),
    (3, "కరెంట్ బిల్లు చెల్లింపు", "DR", 1250.00),
    (4, "UPI ద్వారా స్నేహితుని జమ", "CR", 2000.00),
    (5, "పెట్రోల్ బంక్ ఖర్చు", "DR", 500.00)
]

print_atm_mini_statement("బాలాజీ రావు", "987654321098", sample_txns)
</code></pre>
    </div>

    <!-- 5 COLLAPSIBLE QUIZZES -->
    <h2 class="section-title"><span class="num">★</span> ఈ అధ్యాయంపై ప్రాక్టీస్ క్విజ్ (Knowledge Check)</h2>

    <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px 18px; margin-bottom:12px; cursor:pointer;">
      <summary style="font-weight:700; color:#10b981; font-size:14.5px;">1. print() ఫంక్షన్‌లో 'sep' మరియు 'end' పారామీటర్ల మధ్య వ్యత్యాసం ఏమిటి?</summary>
      <div style="font-size:13.5px; color:var(--text); margin-top:10px; line-height:1.7;">
        <strong>సమాధానం:</strong> <code>sep</code> అనేది కామాతో ఇచ్చిన బహుళ ఆబ్జెక్టుల <strong>మధ్యలో</strong> ఏ అక్షరం రావాలో నిర్ణయిస్తుంది (డిఫాల్ట్: స్పేస్ <code>' '</code>). <code>end</code> అనేది అన్ని ఆబ్జెక్టులు ప్రింట్ అయిన తర్వాత <strong>లైన్ చివరలో</strong> ఏ అక్షరం రావాలో నిర్దేశిస్తుంది (డిఫాల్ట్: న్యూలైన్ <code>'\\n'</code>).
      </div>
    </details>

    <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px 18px; margin-bottom:12px; cursor:pointer;">
      <summary style="font-weight:700; color:#10b981; font-size:14.5px;">2. యూజర్ నుండి input() తీసుకున్న తర్వాత నంబర్ల కూడిక ఎందుకు చేయలేము?</summary>
      <div style="font-size:13.5px; color:var(--text); margin-top:10px; line-height:1.7;">
        <strong>సమాధానం:</strong> పైథాన్‌లో <code>input()</code> ఫంక్షన్ యూజర్ టైప్ చేసిన డేటాను ఎల్లప్పుడూ <strong>స్ట్రింగ్ (<code>str</code>)</strong> రూపంలోనే అందిస్తుంది. మీరు <code>int()</code> లేదా <code>float()</code> ద్వారా టైప్ కాస్టింగ్ చేయకుండా కూడిక చేస్తే <code>TypeError</code> వస్తుంది లేదా రెండు స్ట్రింగ్స్ కలిసిపోతాయి (ఉదా: <code>"10" + "20" = "1020"</code>).
      </div>
    </details>

    <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px 18px; margin-bottom:12px; cursor:pointer;">
      <summary style="font-weight:700; color:#10b981; font-size:14.5px;">3. ఒకే లైన్‌లో 3 సంఖ్యలను స్పేస్ ఇచ్చి తీసుకుని వేరియబుల్స్‌లోకి ఎలా నింపవచ్చు?</summary>
      <div style="font-size:13.5px; color:var(--text); margin-top:10px; line-height:1.7;">
        <strong>సమాధానం:</strong> <code>a, b, c = map(int, input().split())</code> అని రాయడం ద్వారా సులభంగా చేయవచ్చు. <code>split()</code> స్పేస్ ఆధారంగా స్ట్రింగ్‌ను 3 ముక్కలుగా చేస్తుంది; <code>map(int, ...)</code> ప్రతి ముక్కను పూర్ణాంకంగా మారుస్తుంది.
      </div>
    </details>

    <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px 18px; margin-bottom:12px; cursor:pointer;">
      <summary style="font-weight:700; color:#10b981; font-size:14.5px;">4. f-strings లో {amount:,.2f} అని రాస్తే ఫలితం ఎలా వస్తుంది?</summary>
      <div style="font-size:13.5px; color:var(--text); margin-top:10px; line-height:1.7;">
        <strong>సమాధానం:</strong> కామా <code>,</code> అనేది ప్రతి వెయ్యి స్థానానికి కామాను ఉంచుతుంది, మరియు <code>.2f</code> అనేది ఖచ్చితంగా రెండు దశాంశ స్థానాలకు రౌండ్ చేస్తుంది. ఉదాహరణకు <code>1250000.456</code> అనేది <code>1,250,000.46</code> గా మారుతుంది.
      </div>
    </details>

    <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px 18px; margin-bottom:12px; cursor:pointer;">
      <summary style="font-weight:700; color:#10b981; font-size:14.5px;">5. Competitive Programming లో input() కంటే sys.stdin.readline ఎందుకు మెరుగైనది?</summary>
      <div style="font-size:13.5px; color:var(--text); margin-top:10px; line-height:1.7;">
        <strong>సమాధానం:</strong> <code>input()</code> ఫంక్షన్ ప్రతి లైన్‌కు ప్రాంప్ట్ హ్యాండ్లింగ్ చేయడం మరియు అదనపు శానిటైజేషన్ చేయడం వల్ల నెమ్మదిగా ఉంటుంది. కానీ <code>sys.stdin.readline()</code> నేరుగా C-లెవల్ ఫైల్ బఫర్ నుండి లైన్‌ను రీడ్ చేస్తుంది కాబట్టి $10^5$ కంటే ఎక్కువ లైన్లను రీడ్ చేసేటప్పుడు ఇది దాదాపు <strong>4 రెట్లు వేగంగా</strong> ఎగ్జిక్యూట్ అవుతుంది.
      </div>
    </details>

    <!-- PREV / NEXT NAVIGATION -->
    <div style="display:flex; justify-content:space-between; align-items:center; margin-top:40px; padding-top:20px; border-top:1px solid var(--border); flex-wrap:wrap; gap:16px;">
      <a href="/blog-python/03-python-variables-data-types-and-naming.html" style="text-decoration:none; color:var(--text); font-weight:600; display:inline-flex; align-items:center; gap:8px; background:var(--bg2); padding:10px 18px; border-radius:8px; border:1px solid var(--border);">
        ← మునుపటి అధ్యాయం: 3. వేరియబుల్స్ &amp; డేటా టైప్స్
      </a>
      <a href="/blog-python/05-python-operators-and-expressions.html" style="text-decoration:none; color:#ffffff; font-weight:700; display:inline-flex; align-items:center; gap:8px; background:#10b981; padding:10px 22px; border-radius:8px; box-shadow:0 4px 12px rgba(16,185,129,0.3);">
        తర్వాతి అధ్యాయం: 5. ఆపరేటర్లు &amp; ఎక్స్‌ప్రెషన్స్ →
      </a>
    </div>

    <!-- INTERACTIVE COMPILER CTA CARD -->
    <div style="margin-top:40px; background:linear-gradient(135deg, rgba(16,185,129,0.1) 0%, rgba(56,189,248,0.1) 100%); border:1px solid rgba(16,185,129,0.3); border-radius:12px; padding:24px; text-align:center;">
      <h3 style="margin-top:0; color:var(--text); font-size:20px;">ఈ Bank ATM Passbook ప్రాజెక్ట్‌ను లైవ్‌గా మన కంపైలర్‌లో రన్ చేయండి!</h3>
      <p style="color:var(--text2); max-width:650px; margin:8px auto 20px; font-size:14px; line-height:1.6;">
        ఎటువంటి సాఫ్ట్‌వేర్ డౌన్‌లోడ్ చేయకుండా, మీ బ్రౌజర్‌లోనే Modern Python 3 ఇంటరాక్టివ్ కంపైలర్‌లో ఈ కోడ్‌ను రన్ చేసి అవుట్‌పుట్ తనిఖీ చేయండి.
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
# చాప్టర్ 04 మినీ ప్రాజెక్ట్: Bank ATM Mini-Statement & Passbook Engine
# =====================================================================

account_holder = "బాలాజీ రావు"
acc_number = "987654321098"
masked_acc = "XXXX-XXXX-" + acc_number[-4:]

sample_txns = [
    (1, "జీతం డిపాజిట్", "CR", 45000.00),
    (2, "ఫ్లిప్‌కార్ట్ షాపింగ్", "DR", 4599.50),
    (3, "కరెంట్ బిల్లు చెల్లింపు", "DR", 1250.00),
    (4, "UPI ద్వారా జమ", "CR", 2000.00),
    (5, "పెట్రోల్ బంక్ ఖర్చు", "DR", 500.00)
]

print("=" * 68)
print(f"{'మన బ్యాంక్ ఆఫ్ ఇండియా — ATM డిజిటల్ పాస్‌బుక్':^68}")
print("=" * 68)
print(f"ఖాతాదారుని పేరు : {account_holder:<28} తేదీ : 2026-11-02")
print(f"ఖాతా నంబరు      : {masked_acc:<28} సమయం : 10:30:15 AM")
print("-" * 68)
print(f"{'Txn ID':<10} {'వివరణ':<22} {'రకం':^8} {'మొత్తం (₹)':>12} {'నిల్వ (₹)':>12}")
print("-" * 68)

running_balance = 50000.00

for txn_id, desc, txn_type, amount in sample_txns:
    if txn_type == "CR":
        running_balance += amount
        type_label = "[+CR]"
    else:
        running_balance -= amount
        type_label = "[-DR]"

    formatted_id = f"TXN{txn_id:04d}"
    print(f"{formatted_id:<10} {desc:<20} {type_label:^8} {amount:>12,.2f} {running_balance:>12,.2f}")

print("=" * 68)
print(f"{'తుది ఖాతా నిల్వ (Available Balance):':<42} ₹ {running_balance:>20,.2f}")
print("=" * 68)
print("\\n🎉 చాప్టర్ 04 ప్రాజెక్ట్ విజయవంతంగా రన్ అయ్యింది! 🚀")
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
fs.writeFileSync(outputPath, chapter04Content, 'utf8');
console.log('✅ Successfully generated deep high-value Python Chapter 04 in exact HTML style!');
console.log('Target file:', currentLesson.file);
console.log('Target file size:', chapter04Content.length, 'characters');
