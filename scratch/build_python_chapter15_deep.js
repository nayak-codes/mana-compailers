const fs = require('fs');
const path = require('path');
const { LESSONS, buildPythonSidebar } = require('./python_curriculum_data.js');

const currentLesson = LESSONS[14]; // Chapter 15 (0-indexed 14)
const sidebarHtml = buildPythonSidebar(15);

const chapter15Content = `<!DOCTYPE html>
<html class="light-theme" lang="te">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${currentLesson.title} — Python 3 Tutorial | Our Compiler</title>
  <meta name="description" content="Python 3 కలెక్షన్స్ మాడ్యూల్ & అడ్వాన్స్‌డ్ డేటా స్ట్రక్చర్స్ సమగ్ర తెలుగు గైడ్: collections.Counter ఫ్రీక్వెన్సీ అనలిటిక్స్, defaultdict మిస్సింగ్ కీ రక్షణ, deque O(1) డబుల్ ఎండెడ్ క్యూ, OrderedDict, ChainMap, heapq ప్రయారిటీ క్యూస్, మరియు High-Frequency Trading Engine ప్రాజెక్ట్." />
  <meta name="keywords" content="python collections in telugu, python counter telugu, python defaultdict deque telugu, python heapq priority queue, learn python in telugu, our compiler" />
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
    "headline": "${currentLesson.title} (Complete Guide to Python Collections Module and Advanced Data Structures in Telugu)",
    "description": "Python 3 అడ్వాన్స్‌డ్ కలెక్షన్స్ గైడ్: Counter, defaultdict, deque O(1) Double-Ended Queues, heapq Priority Queues, మరియు High-Frequency Trading Engine.",
    "articleSection": "Phase 03: డేటా స్ట్రక్చర్స్ & కలెక్షన్స్",
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
        'abs','open','help','dir','filter','bool','Counter','defaultdict','deque','OrderedDict',
        'ChainMap','heapify','heappush','heappop','nlargest','nsmallest','most_common'
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
      <span style="color:var(--text); font-weight:600;">Chapter 15: ${currentLesson.title}</span>
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
        📖 Chapter 15 of 25
      </span>
      <span style="background:rgba(245,158,11,0.12); color:#f59e0b; padding:4px 12px; border-radius:20px; font-weight:600; display:inline-flex; align-items:center; gap:5px;">
        📁 Phase 03: డేటా స్ట్రక్చర్స్ &amp; కలెక్షన్స్
      </span>
      <span style="background:rgba(139,92,246,0.12); color:#8b5cf6; padding:4px 12px; border-radius:20px; font-weight:600; display:inline-flex; align-items:center; gap:5px;">
        🗓️ 2026 Edition
      </span>
    </div>

    <!-- COVERED PILL -->
    <div style="background:var(--bg2); border:1px solid var(--border); border-radius:10px; padding:12px 18px; margin-bottom:24px; font-size:13.5px; color:var(--text2); line-height:1.6;">
      <strong style="color:var(--text); font-weight:700;">📌 Covered in this chapter:</strong>
      ${currentLesson.subtopics} · Standard Collections Limits · collections.Counter &amp; Multiset Arithmetic · collections.defaultdict &amp; Grouping · collections.deque O(1) Double-Ended Queues · Circular Buffers · OrderedDict &amp; ChainMap · heapq Priority Queues (Min-Heap / Max-Heap) · High-Frequency Trading Engine Project
    </div>

    <!-- WARM SOFT IVORY INTRO BOX -->
    <div class="intro-box" style="background:#fffdf7; border:1px solid #fef3c7; border-left:4px solid #f59e0b; border-radius:10px; padding:20px 24px; margin-bottom:30px; font-size:15px; color:#451a03; line-height:1.75;">
      పైథాన్‌లోని ప్రాథమిక డేటా స్ట్రక్చర్స్ అయిన Lists, Tuples, Dictionaries, మరియు Sets దాదాపు 90% సాధారణ అవసరాలను తీరుస్తాయి. కానీ మీరు రియల్-టైమ్ స్టాక్ మార్కెట్ ట్రేడింగ్ సిస్టమ్స్, హాస్పిటల్ ఐసీయూ ఎమర్జెన్సీ ట్రయేజ్, నెట్‌వర్క్ ప్యాకెట్ బఫర్లు, లేదా కోట్లాది సోషల్ మీడియా పోస్టులలో ట్రెండింగ్ పదాలను విశ్లేషించే బిగ్ డేటా ఇంజిన్లను నిర్మిస్తున్నప్పుడు — సాధారణ లిస్ట్‌లు మరియు డిక్షనరీలు పెర్ఫార్మెన్స్ సమస్యలను ఎదుర్కొంటాయి.
      <br/><br/>
      ఉదాహరణకు, ఒక సాధారణ లిస్ట్ ప్రారంభంలో కొత్త ఎలిమెంట్‌ను ఇన్సర్ట్ చేయడానికి లేదా మొదటి ఎలిమెంట్‌ను తొలగించడానికి (<code>pop(0)</code>) మిగతా అన్ని ఎలిమెంట్లను పక్కకు జరపాలి (O(N) లీనియర్ టైమ్). కానీ <strong><code>collections.deque</code></strong> వాడితే ఇరువైపులా ఇన్సర్షన్స్ మరియు డిలీషన్స్ రెప్పపాటులో (O(1) కాన్స్టెంట్ టైమ్) పూర్తవుతాయి! అలాగే మిస్సింగ్ కీల భయం లేకుండా డేటాను గ్రూప్ చేసే <strong><code>defaultdict</code></strong>, అత్యంత ప్రజాదరణ పొందిన అంశాలను తక్షణమే లెక్కించే <strong><code>Counter</code></strong>, మరియు అత్యవసర టాస్క్‌లను వెంటనే ఎగ్జిక్యూట్ చేసే <strong><code>heapq</code> (Priority Queue)</strong> — ఈ అడ్వాన్స్‌డ్ ఆయుధాలన్నీ పైథాన్ స్పెషల్ కలెక్షన్స్ మాడ్యూల్‌లో దాగి ఉన్నాయి. Phase 03 ముగింపు అధ్యాయమైన ఇందులో, ఈ ప్రొఫెషనల్ డేటా స్ట్రక్చర్ల అంతర్గత నిర్మాణం మరియు రియల్-వరల్డ్ హై-ఫ్రీక్వెన్సీ ట్రేడింగ్ ఇంజిన్ ప్రాజెక్ట్‌ను లోతుగా అన్వేషిద్దాం!
    </div>

    <!-- SECTION 1 -->
    <h2 class="section-title"><span class="num">1</span> స్టాండర్డ్ డేటా స్ట్రక్చర్స్ సరిపోవా? (Why Collections Module?)</h2>
    <p>
      పైథాన్ అంతర్నిర్మిత ప్రాథమిక డేటా రకాలు అద్భుతమైనవే అయినప్పటికీ, పెద్ద స్థాయి ఎంటర్‌ప్రైజ్ అప్లికేషన్లలో కొన్ని నిర్దిష్టమైన పరిమితులను కలిగి ఉంటాయి:
    </p>
    <ul>
      <li><strong>సాధారణ లిస్ట్‌ల క్యూ సమస్య:</strong> లిస్ట్ చివరన డేటాను జోడించడం (<code>append()</code>) వేగవంతమే (O(1)), కానీ లిస్ట్ మొదటి భాగం నుండి ఎలిమెంట్‌ను తీసివేయడం (<code>pop(0)</code>) మొత్తం లిస్ట్‌ను షిఫ్ట్ చేయాల్సి రావడం వల్ల O(N) సమయం పడుతుంది. ఇది వేలకొద్దీ రిక్వెస్ట్‌లు వచ్చే సర్వర్లలో తీవ్రమైన జాప్యానికి (Lag) కారణమవుతుంది.</li>
      <li><strong>డిక్షనరీల్లో KeyError గందరగోళం:</strong> గ్రూపింగ్ చేసేటప్పుడు కీ ఉందో లేదో ప్రతిసారీ <code>if key not in d: d[key] = []</code> అని తనిఖీ చేయాల్సి వస్తుంది.</li>
      <li><strong>ప్రాధాన్యత ఆధారిత టాస్క్ షెడ్యూలింగ్ (Priority Queuing):</strong> సాధారణ లిస్ట్‌ను ప్రతిసారీ సార్ట్ చేయడం (<code>list.sort()</code> - O(N log N)) అత్యంత ఖరీదైన పని. మనకు నిరంతరం అత్యల్ప లేదా అత్యున్నత విలువను O(log N) వేగంతో అందించే <strong>బైనరీ హీప్ (Binary Heap)</strong> అవసరం.</li>
    </ul>
    <p>
      ఈ లోపాలను అధిగమించడానికి పైథాన్ స్టాండర్డ్ లైబ్రరీ <strong><code>collections</code></strong> మరియు <strong><code>heapq</code></strong> మాడ్యూల్స్‌ను ప్రత్యేకంగా అందించింది.
    </p>

    <!-- SECTION 2 -->
    <h2 class="section-title"><span class="num">2</span> collections.Counter — ఫ్రీక్వెన్సీ ఎనాలసిస్ సూపర్ పవర్</h2>
    <p>
      <strong><code>Counter</code></strong> అనేది డిక్షనరీ యొక్క సబ్‌క్లాస్. ఇది ఒక ఇటరబుల్ (లిస్ట్, స్ట్రింగ్, టుపుల్) లోని అంశాలు ఎన్నిసార్లు పునరావృతమయ్యాయో (Frequency) స్వయంచాలకంగా లెక్కించి భద్రపరుస్తుంది.
    </p>
    <p>
      <strong>Counter యొక్క అగ్రశ్రేణి ఫీచర్లు:</strong>
    </p>
    <ul>
      <li><strong>జీరో KeyError ప్రొటెక్షన్:</strong> సాధారణ డిక్షనరీలో లేని కీని అడిగితే <code>KeyError</code> వస్తుంది, కానీ <code>Counter</code> లో లేని కీని అడిగితే ఎటువంటి ఎర్రర్ లేకుండా శుభ్రంగా <code>0</code> రిటర్న్ చేస్తుంది!</li>
      <li><strong><code>most_common(N)</code>:</strong> అత్యధిక ఫ్రీక్వెన్సీ కలిగిన టాప్ N ఎలిమెంట్లను <code>(item, count)</code> టుపుల్స్ రూపంలో అత్యంత వేగంగా అందిస్తుంది.</li>
      <li><strong>మల్టీసెట్ అరిథ్‌మెటిక్ (Multiset Operators):</strong> రెండు కౌంటర్లను నేరుగా కలపవచ్చు (<code>c1 + c2</code>), తీసివేయవచ్చు (<code>c1 - c2</code>), లేదా ఉమ్మడి కనిష్టాలను (<code>c1 &amp; c2</code>) మరియు గరిష్టాలను (<code>c1 | c2</code>) లెక్కించవచ్చు!</li>
    </ul>

    <!-- SECTION 3 -->
    <h2 class="section-title"><span class="num">3</span> కోడ్ డెమో 1: టెక్స్ట్ మైనింగ్ &amp; వర్డ్ ఫ్రీక్వెన్సీ విశ్లేషణ</h2>
    <p>
      సోషల్ మీడియా హ్యాష్‌ట్యాగ్‌లు లేదా కస్టమర్ రివ్యూల నుండి అత్యంత ట్రెండింగ్ కీలక పదాలను <code>Counter</code> ద్వారా ఎలా విశ్లేషించవచ్చో క్రింది కోడ్‌లో చూడండి:
    </p>

    <!-- CODE BLOCK 1 -->
    <div class="code-block">
      <div class="code-header">
        <span class="file-name">01_counter_frequency_analysis.py</span>
        <div class="btn-group">
          <button class="btn btn-copy" onclick="copyCode(this)">Copy</button>
          <button class="btn btn-run" onclick="runCodeInCompiler(this)">Run ▶</button>
        </div>
      </div>
      <pre><code class="language-python"># collections.Counter డెమో
from collections import Counter

# సోషల్ మీడియా కామెంట్ల నుండి సేకరించిన పదాలు
review_words = [
    "python", "fast", "clean", "python", "ai", "ml", "python",
    "awesome", "data", "ai", "fast", "python", "future", "ai"
]

word_counts = Counter(review_words)

print("=== 1. ఫ్రీక్వెన్సీ సమ్మరీ ===")
for word, count in word_counts.items():
    print(f"పదం : {word:<12} పునరావృతం : {count} సార్లు")

# టాప్ 2 ట్రెండింగ్ పదాలు
print("\\n=== 2. మోస్ట్ కామన్ ఎలిమెంట్స్ (Top 2) ===")
top_2 = word_counts.most_common(2)
for rank, (word, freq) in enumerate(top_2, start=1):
    print(f"ర్యాంక్ {rank}: '{word}' ({freq} సార్లు వచ్చింది)")

# లేని కీని చదవడం (నో KeyError!)
print(f"\\n'blockchain' కౌంట్ : {word_counts['blockchain']} (స్వయంచాలకంగా 0!)")
</code></pre>
    </div>

    <!-- SECTION 4 -->
    <h2 class="section-title"><span class="num">4</span> collections.defaultdict — జీరో KeyError ఆర్కిటెక్చర్</h2>
    <p>
      <strong><code>defaultdict</code></strong> అనేది డిక్షనరీలోని కీలు లేనప్పుడు వచ్చే <code>KeyError</code> ను శాశ్వతంగా నిర్మూలించే ఒక అద్భుతమైన సాధనం. డిక్షనరీని సృష్టించేటప్పుడే దానికి ఒక <strong>ఫ్యాక్టరీ ఫంక్షన్ (Default Factory)</strong> ను అందిస్తాము.
    </p>
    <ul>
      <li><code>defaultdict(list)</code>: కొత్త కీ రాగానే స్వయంచాలకంగా ఒక ఖాళీ లిస్ట్ <code>[]</code> ను సృష్టిస్తుంది. గ్రూపింగ్ చేయడానికి ఇది ఉత్తమమైన మార్గం.</li>
      <li><code>defaultdict(int)</code>: కొత్త కీకి స్వయంచాలకంగా <code>0</code> కేటాయిస్తుంది. కౌంటర్లు తయారు చేయడానికి ఉపయోగపడుతుంది.</li>
      <li><code>defaultdict(set)</code>: డూప్లికేట్స్ లేని ప్రత్యేక విలువలను సమూహపరచడానికి <code>set()</code> ను ఇస్తుంది.</li>
    </ul>

    <!-- SECTION 5 -->
    <h2 class="section-title"><span class="num">5</span> మల్టీ-లెవల్ డేటా గ్రూపింగ్ విత్ <code>defaultdict(list)</code></h2>
    <p>
      సాధారణ డిక్షనరీలో ఐదు లైన్ల కోడ్ పట్టే గ్రూపింగ్ పనిని <code>defaultdict</code> కేవలం ఒకే ఒక్క లైన్‌లో ఎలా సులభతరం చేస్తుందో చూడండి:
    </p>
    <div style="background:#0f172a; padding:12px 18px; border-radius:6px; font-family:'JetBrains Mono', monospace; font-size:12.5px; color:#38bdf8; margin:12px 0; line-height:1.6;">
      # విద్యార్థుల విభాగాల వారీగా గ్రూపింగ్<br/>
      from collections import defaultdict<br/><br/>
      students_by_branch = defaultdict(list)<br/>
      students_by_branch["CSE"].append("సురేష్")  # KeyError రాదు! CSE లేకపోతే [] మొదలవుతుంది<br/>
      students_by_branch["CSE"].append("అంజలి")<br/>
      students_by_branch["ECE"].append("రాజేష్")
    </div>

    <!-- SECTION 6 -->
    <h2 class="section-title"><span class="num">6</span> collections.deque — డబుల్ ఎండెడ్ క్యూ (O(1) vs O(N))</h2>
    <p>
      <strong><code>deque</code></strong> (ఉచ్ఛారణ: "డెక్" - Double-Ended Queue) అనేది CPython లో <strong>డబ్లీ లింక్డ్ లిస్ట్ (Doubly Linked List of Blocks)</strong> రూపంలో నిర్మించబడిన హై-స్పీడ్ డేటా స్ట్రక్చర్.
    </p>
    <p>
      <strong>లిస్ట్ వర్సెస్ డెక్ పెర్ఫార్మెన్స్ పోలిక:</strong>
    </p>

    <div style="overflow-x:auto; margin:16px 0;">
      <table style="width:100%; border-collapse:collapse; background:var(--bg2); font-size:13.5px; border-radius:8px; overflow:hidden;">
        <thead>
          <tr style="background:#0f172a; color:#f8fafc; text-align:left;">
            <th style="padding:10px 14px;">ఆపరేషన్</th>
            <th style="padding:10px 14px;">సాధారణ Python లిస్ట్</th>
            <th style="padding:10px 14px;">collections.deque</th>
            <th style="padding:10px 14px;">లాభం &amp; విశ్లేషణ</th>
          </tr>
        </thead>
        <tbody>
          <tr style="border-bottom:1px solid var(--border);">
            <td style="padding:10px 14px; font-weight:600;">చివర చేర్చడం (append)</td>
            <td style="padding:10px 14px; color:#10b981;">O(1) సగటు</td>
            <td style="padding:10px 14px; color:#10b981;">O(1) స్థిరమైన సమయం</td>
            <td style="padding:10px 14px;">రెండూ సమాన వేగవంతం</td>
          </tr>
          <tr style="border-bottom:1px solid var(--border);">
            <td style="padding:10px 14px; font-weight:600;">మొదట చేర్చడం (appendleft)</td>
            <td style="padding:10px 14px; color:#ef4444;">O(N) చాలా నెమ్మది!</td>
            <td style="padding:10px 14px; color:#10b981; font-weight:700;">O(1) సూపర్ ఫాస్ట్! ⚡</td>
            <td style="padding:10px 14px;">డెక్ 1000 రెట్లు వేగవంతం</td>
          </tr>
          <tr style="border-bottom:1px solid var(--border);">
            <td style="padding:10px 14px; font-weight:600;">మొదటిది తీసివేయడం (popleft)</td>
            <td style="padding:10px 14px; color:#ef4444;">O(N) (pop(0))</td>
            <td style="padding:10px 14px; color:#10b981; font-weight:700;">O(1) సూపర్ ఫాస్ట్! ⚡</td>
            <td style="padding:10px 14px;">Queue ప్రాసెసింగ్‌కు డెక్ అనువైనది</td>
          </tr>
          <tr>
            <td style="padding:10px 14px; font-weight:600;">మధ్యలోని ఇండెక్స్ లుకప్ (d[500])</td>
            <td style="padding:10px 14px; color:#10b981;">O(1) రాండమ్ యాక్సెస్</td>
            <td style="padding:10px 14px; color:#f59e0b;">O(N) లింక్డ్ ట్రావర్సల్</td>
            <td style="padding:10px 14px;">రాండమ్ రీడింగ్‌కు లిస్ట్ మేలు</td>
          </tr>
        </tbody>
      </table>
    </div>

    <p>
      <strong>సర్క్యులర్ బఫర్ (Circular Buffer with <code>maxlen</code>):</strong> డెక్‌ను సృష్టించేటప్పుడు <code>d = deque(maxlen=5)</code> అని గరిష్ట పరిమాణాన్ని నిర్దేశించవచ్చు. బఫర్ నిండిపోయిన తర్వాత కొత్త ఎలిమెంట్ రాగానే, అత్యంత పాత ఎలిమెంట్ స్వయంచాలకంగా బయటకు వెళ్లిపోతుంది! ఇది లైవ్ లాగింగ్ మరియు స్ట్రీమింగ్ మూవీంగ్ యావరేజ్‌లకు వరప్రసాదం.
    </p>

    <!-- SECTION 7 -->
    <h2 class="section-title"><span class="num">7</span> కోడ్ డెమో 2: స్లైడింగ్ విండో మూవింగ్ యావరేజ్ with <code>deque(maxlen=K)</code></h2>
    <p>
      సెన్సార్ డేటా లేదా స్టాక్ ప్రైస్ టిక్కర్ల నుండి స్థిరమైన గత 4 టిక్స్ యొక్క మూవింగ్ యావరేజ్‌ను <code>deque(maxlen=K)</code> ద్వారా ఎలా లెక్కిస్తామో చూడండి:
    </p>

    <!-- CODE BLOCK 2 -->
    <div class="code-block">
      <div class="code-header">
        <span class="file-name">02_deque_sliding_window_buffer.py</span>
        <div class="btn-group">
          <button class="btn btn-copy" onclick="copyCode(this)">Copy</button>
          <button class="btn btn-run" onclick="runCodeInCompiler(this)">Run ▶</button>
        </div>
      </div>
      <pre><code class="language-python"># collections.deque సర్క్యులర్ బఫర్ డెమో
from collections import deque

# కేవలం గత 4 రీడింగులను మాత్రమే భద్రపరిచే స్లైడింగ్ విండో బఫర్
recent_prices = deque(maxlen=4)

incoming_stream = [100.5, 102.0, 101.5, 103.0, 104.5, 103.5, 106.0]

print("=== స్లైడింగ్ విండో మూవింగ్ యావరేజ్ (Window Size = 4) ===")
for tick in incoming_stream:
    recent_prices.append(tick)
    current_avg = sum(recent_prices) / len(recent_prices)
    print(f"కొత్త ధర : ₹{tick:<6.2f} -> ప్రస్తుత బఫర్ : {list(recent_prices)} -> సగటు : ₹{current_avg:.2f}")
</code></pre>
    </div>

    <!-- SECTION 8 -->
    <h2 class="section-title"><span class="num">8</span> collections.OrderedDict &amp; LRU Cache బేసిక్స్</h2>
    <p>
      పైథాన్ 3.7 నుండి సాధారణ డిక్షనరీలు కూడా ఇన్సర్ట్ చేసిన వరుస క్రమాన్ని గుర్తుపెట్టుకుంటున్నాయి. అయినప్పటికీ <strong><code>OrderedDict</code></strong> లో సాధారణ డిక్షనరీలో లేని రెండు శక్తివంతమైన మెథడ్స్ ఉన్నాయి:
    </p>
    <ul>
      <li><strong><code>od.move_to_end(key, last=True)</code>:</strong> పేర్కొన్న కీని డిక్షనరీ చివరకు (లేదా <code>last=False</code> అయితే ప్రారంభానికి) అత్యంత వేగంగా తరలిస్తుంది. ఇది <strong>LRU (Least Recently Used) Cache</strong> లను సొంతంగా నిర్మించడానికి ప్రధాన పునాది!</li>
      <li><strong>క్రమాన్ని పరిగణించే సమానత్వ పోలిక (Equality by Order):</strong> రెండు సాధారణ డిక్షనరీలలో ఎలిమెంట్లు వేర్వేరు వరుసలో ఉన్నా అవి సమానమే (<code>{'a':1, 'b':2} == {'b':2, 'a':1}</code> &rarr; <code>True</code>). కానీ <code>OrderedDict</code> లో క్రమం కూడా ఖచ్చితంగా సరిపోలితేనే <code>True</code> అవుతుంది!</li>
    </ul>

    <!-- SECTION 9 -->
    <h2 class="section-title"><span class="num">9</span> collections.ChainMap — కాన్ఫిగరేషన్ లేయరింగ్</h2>
    <p>
      <strong><code>ChainMap</code></strong> అనేది బహుళ డిక్షనరీలను ఒకే సింగిల్ లాజికల్ వ్యూగా గ్రూప్ చేస్తుంది. మెమరీలో డేటాను నకలు చేయకుండా (కాపీ చేయకుండా) చెయిన్ చేస్తుంది.
    </p>
    <p>
      అప్లికేషన్ కాన్ఫిగరేషన్ ప్రాధాన్యతలలో ఇది విస్తృతంగా వాడబడుతుంది:
      <strong>కమాండ్ లైన్ ఆర్గ్యుమెంట్స్ &gt; ఎన్విరాన్‌మెంట్ వేరియబుల్స్ &gt; డిఫాల్ట్ కాన్ఫిగ్ ఫైల్</strong>.
    </p>
    <div style="background:#0f172a; padding:12px 18px; border-radius:6px; font-family:'JetBrains Mono', monospace; font-size:12.5px; color:#38bdf8; margin:10px 0; line-height:1.6;">
      from collections import ChainMap<br/><br/>
      defaults = {"theme": "light", "port": 8080, "debug": False}<br/>
      user_env = {"port": 9000} # యూజర్ ఓవర్‌రైడ్<br/>
      cli_args = {"debug": True} # అత్యున్నత ప్రాధాన్యత<br/><br/>
      app_config = ChainMap(cli_args, user_env, defaults)<br/>
      print(app_config["port"])  # 9000 (user_env నుండి తీసుకుంటుంది)<br/>
      print(app_config["theme"]) # light (defaults నుండి తీసుకుంటుంది)
    </div>

    <!-- SECTION 10 -->
    <h2 class="section-title"><span class="num">10</span> heapq మాడ్యూల్ — బైనరీ హీప్ &amp; ప్రయారిటీ క్యూస్</h2>
    <p>
      <strong><code>heapq</code></strong> మాడ్యూల్ పైథాన్‌లో <strong>మిన్-హీప్ (Min-Heap)</strong> అల్గారిథమ్‌ను సాధారణ లిస్ట్‌లపై అమలు చేస్తుంది. ఇందులో మొదటి ఎలిమెంట్ <code>heap[0]</code> ఎల్లప్పుడూ ఆ కలెక్షన్‌లోని <strong>అత్యల్ప (Smallest)</strong> అంశంగా ఉంటుంది.
    </p>
    <p>
      <strong>ప్రధాన ఆపరేషన్లు &amp; టైమ్ కాంప్లెక్సిటీ:</strong>
    </p>
    <ul>
      <li><code>heapq.heapify(list)</code>: సాధారణ లిస్ట్‌ను ఇన్-ప్లేస్‌గా O(N) లీనియర్ టైమ్‌లో హీప్‌గా మారుస్తుంది.</li>
      <li><code>heapq.heappush(heap, item)</code>: నూతన అంశాన్ని జోడించి హీప్ నియమాన్ని O(log N) సమయంలో కాపాడుతుంది.</li>
      <li><code>heapq.heappop(heap)</code>: అత్యల్ప అంశాన్ని O(log N) సమయంలో బయటకు తీసి తిరిగి హీప్‌ను సర్దుబాటు చేస్తుంది.</li>
      <li><code>heapq.nlargest(k, iterable)</code> మరియు <code>heapq.nsmallest(k, iterable)</code>: మొత్తం డేటాను సార్ట్ చేయకుండానే టాప్ K అంశాలను అత్యంత సమర్థవంతంగా అందిస్తాయి.</li>
      <li><strong>మ్యాక్స్-హీప్ ట్రిక్ (Max-Heap Trick):</strong> పైథాన్‌లో నేరుగా Max-Heap లేదు. కానీ సంఖ్యలను నెగటివ్‌గా (<code>-priority</code>) మార్చి హీప్‌లో పుష్ చేయడం ద్వారా అత్యున్నత ప్రాధాన్యత అంశాన్ని మొదట వచ్చేలా సులభంగా చేయవచ్చు!</li>
    </ul>

    <!-- SECTION 11 -->
    <h2 class="section-title"><span class="num">11</span> కోడ్ డెమో 3: హాస్పిటల్ ఎమర్జెన్సీ ట్రయేజ్ &amp; టాస్క్ షెడ్యూలర్</h2>
    <p>
      రోగుల ఆరోగ్య తీవ్రత ఆధారంగా (Priority 1 = అత్యవసరం) తదుపరి చికిత్స పొందాల్సిన రోగిని <code>heapq</code> ప్రయారిటీ క్యూ ద్వారా ఎలా ప్రాసెస్ చేస్తారో చూద్దాం:
    </p>

    <!-- CODE BLOCK 3 -->
    <div class="code-block">
      <div class="code-header">
        <span class="file-name">03_hospital_emergency_priority_queue.py</span>
        <div class="btn-group">
          <button class="btn btn-copy" onclick="copyCode(this)">Copy</button>
          <button class="btn btn-run" onclick="runCodeInCompiler(this)">Run ▶</button>
        </div>
      </div>
      <pre><code class="language-python"># heapq ప్రయారిటీ క్యూ డెమో
import heapq

# ఆసుపత్రి ఎమర్జెన్సీ వార్డ్ క్యూ (Min-Heap)
# Tuple structure: (Priority, Patient Name, Condition)
# Priority: 1 = క్రిటికల్, 2 = తీవ్రమైన, 3 = సాధారణ
triage_queue = []

# కొత్త రోగులను చేర్చడం (heappush)
heapq.heappush(triage_queue, (3, "రాము", "సాధారణ జ్వరం"))
heapq.heappush(triage_queue, (1, "రమేష్", "గుండెపోటు లక్షణాలు"))
heapq.heappush(triage_queue, (2, "కవిత", "ఎముక విరిగింది"))
heapq.heappush(triage_queue, (1, "సునీత", "తీవ్రమైన శ్వాసకోశ సమస్య"))

print("=== 🏥 ICU ఎమర్జెన్సీ ట్రయేజ్ ట్రీట్‌మెంట్ ఆర్డర్ ===")
while triage_queue:
    priority, name, condition = heapq.heappop(triage_queue)
    badge = "🚨 అత్యవసరం (ICU)" if priority == 1 else ("⚠️ తీవ్రమైనది" if priority == 2 else "🟢 సాధారణం")
    print(f"ప్రాధాన్యత {priority} [{badge}]: రోగి: {name:<10} సమస్య: {condition}")
</code></pre>
    </div>

    <!-- SECTION 12 -->
    <h2 class="section-title"><span class="num">12</span> కామన్ బిగినర్స్ మిస్టేక్స్ &amp; ప్రొడక్షన్ బెస్ట్ ప్రాక్టీసెస్</h2>
    <ul>
      <li><strong>Mistake 1: Deque లో మధ్యలోని ఎలిమెంట్లను ఇండెక్స్ ద్వారా వెతకడం:</strong> <code>deque</code> లో <code>d[500]</code> అని రాస్తే అది లింక్డ్ బ్లాక్స్ ద్వారా లీనియర్‌గా O(N) సమయం తీసుకుంటుంది. రాండమ్ రీడింగ్ ఎక్కువగా ఉంటే సాధారణ లిస్ట్‌ను వాడండి.</li>
      <li><strong>Mistake 2: Counter లో కీ లేదు అని అనుమానించడం:</strong> <code>Counter</code> లో కీ లేకపోయినా <code>0</code> వస్తుంది. కాబట్టి కీ ఉందో లేదో తెలుసుకోవడానికి <code>if 'x' in c:</code> వాడాలి తప్ప <code>if c['x'] &gt; 0:</code> అని పొరబడకూడదు (ఎందుకంటే 0 ఉన్న కీ కూడా ఉండవచ్చు).</li>
      <li><strong>Mistake 3: <code>heapq.heapify</code> లేకుండా సాధారణ లిస్ట్‌పై <code>heappop</code> వాడటం:</strong> సాధారణ లిస్ట్‌ను ముందుగా <code>heapify()</code> చేయకుండా <code>heappop()</code> చేస్తే అది హీప్ క్రమాన్ని పాటించదు మరియు తప్పుడు ఫలితాలను ఇస్తుంది.</li>
      <li><strong>Best Practice: FIFO Queue లకు <code>collections.deque</code>:</strong> ఫస్ట్-ఇన్-ఫస్ట్-అవుట్ క్యూలకు ఎప్పుడూ <code>list.pop(0)</code> వాడకండి. ఎల్లప్పుడూ <code>deque.popleft()</code> ను ఎంచుకోండి.</li>
    </ul>

    <!-- SECTION 13 -->
    <h2 class="section-title"><span class="num">13</span> రియల్-వరల్డ్ ప్రాజెక్ట్: "High-Frequency Trading &amp; Order Execution Engine"</h2>
    <p>
      ఈ పదిహేనవ అధ్యాయంలో నేర్చుకున్న అన్ని అడ్వాన్స్‌డ్ స్ట్రక్చర్లను (Counter ఫ్రీక్వెన్సీ, defaultdict గ్రూపింగ్, deque స్లైడింగ్ బఫర్, heapq ప్రయారిటీ ఆర్డర్ బుక్) మిళితం చేస్తూ — సెకనుకు వేల ఆర్డర్లను ప్రాసెస్ చేసే పూర్తి స్థాయి <strong>Real-time High-Frequency Trading &amp; Order Execution Engine</strong> ను నిర్మిద్దాం!
    </p>

    <!-- CODE BLOCK 4: CAPSTONE MINI PROJECT -->
    <div class="code-block">
      <div class="code-header">
        <span class="file-name">04_high_frequency_trading_engine.py</span>
        <div class="btn-group">
          <button class="btn btn-copy" onclick="copyCode(this)">Copy</button>
          <button class="btn btn-run" onclick="runCodeInCompiler(this)">Run ▶</button>
        </div>
      </div>
      <pre><code class="language-python"># =====================================================================
# చాప్టర్ 15 మినీ ప్రాజెక్ట్: High-Frequency Trading & Order Execution Engine
# కాన్సెప్ట్స్: collections.defaultdict, deque (Sliding Window Tick Buffer),
#             collections.Counter (Volume Analytics), heapq (Priority Order Book)
# =====================================================================
from collections import defaultdict, deque, Counter
import heapq
import time

class TradingEngine:
    def __init__(self):
        # 1. ప్రయారిటీ బై ఆర్డర్ బుక్ (Min-Heap with Negated Price for Max-Price Buy Priority)
        # Structure: (-buy_price, order_id, shares, trader)
        self.buy_order_book = []

        # 2. గత 5 మార్కెట్ టిక్స్ స్లైడింగ్ బఫర్ (deque circular buffer)
        self.market_price_stream = deque(maxlen=5)

        # 3. ట్రేడర్ల వారీగా పోర్ట్‌ఫోలియో షేర్ల బ్యాలెన్స్ (defaultdict(int))
        self.trader_portfolios = defaultdict(int)

        # 4. స్టాక్ సింబల్స్ ట్రేడింగ్ వాల్యూమ్ విశ్లేషణ (Counter)
        self.volume_counter = Counter()

    def add_market_tick(self, stock_symbol: str, price: float):
        """లైవ్ మార్కెట్ ప్రైస్ టిక్‌ను స్లైడింగ్ విండోలోకి స్వీకరిస్తుంది."""
        self.market_price_stream.append(price)
        current_moving_avg = sum(self.market_price_stream) / len(self.market_price_stream)
        print(f"📈 [TICK] {stock_symbol:<6} ధర: ₹{price:<7.2f} (గత 5 టిక్స్ సగటు: ₹{current_moving_avg:.2f})")

    def place_buy_order(self, order_id: str, stock: str, price: float, shares: int, trader: str):
        """కొనుగోలు ఆర్డర్‌ను హీప్ ప్రయారిటీ క్యూలో నమోదు చేస్తుంది."""
        # అత్యధిక ధరకు కొనేవారికి మొదటి ప్రాధాన్యత ఇవ్వడానికి నెగటివ్ ప్రైస్ వాడతాం!
        heapq.heappush(self.buy_order_book, (-price, order_id, stock, shares, trader))
        print(f"📥 [ORDER] {trader} -> Buy {shares} {stock} @ ₹{price}")

    def execute_top_orders(self):
        """ఆర్డర్ బుక్ నుండి అత్యున్నత బిడ్ ప్రైస్ ఉన్న ఆర్డర్లను O(log N) వేగంతో ఎగ్జిక్యూట్ చేస్తుంది."""
        print("\\n" + "=" * 74)
        print(f"{'⚡ మన ట్రేడింగ్ ఎక్స్ఛేంజ్ — ఆర్డర్ ఎగ్జిక్యూషన్ రిపోర్ట్ 2026':^74}")
        print("=" * 74)
        print(f"{'ఆర్డర్ ID':<10} {'స్టాక్':<8} {'ఎగ్జిక్యూట్ ధర':>14} {'షేర్లు':>8} {'ట్రేడర్':<14} {'విలువ (₹)':>14}")
        print("-" * 74)

        while self.buy_order_book:
            neg_price, order_id, stock, shares, trader = heapq.heappop(self.buy_order_book)
            exec_price = -neg_price
            trade_value = exec_price * shares

            # పోర్ట్‌ఫోలియో & వాల్యూమ్ అప్‌డేట్
            self.trader_portfolios[trader] += shares
            self.volume_counter[stock] += shares

            print(f"{order_id:<10} {stock:<8} ₹{exec_price:>12.2f} {shares:>8} {trader:<14} ₹{trade_value:>12,.2f}")

        print("=" * 74)

    def print_analytics_summary(self):
        """Counter & defaultdict ద్వారా పోర్ట్‌ఫోలియో & వాల్యూమ్ సమ్మరీని ఇస్తుంది."""
        print("\\n📊 అత్యధిక వాల్యూమ్ ట్రేడ్ అయిన స్టాక్స్ (Top Traded Symbols):")
        for stock, total_shares in self.volume_counter.most_common():
            print(f"  • {stock:<8} : మొత్తం {total_shares:,} షేర్లు ట్రేడ్ అయ్యాయి")

        print("\\n💼 ట్రేడర్ల తాజా షేర్ల పోర్ట్‌ఫోలియో (defaultdict balance):")
        for trader, total_shares in self.trader_portfolios.items():
            print(f"  • {trader:<14} : {total_shares} షేర్లు కలిగి ఉన్నారు")
        print("=" * 74 + "\\n")

# ఇంజిన్ టెస్టింగ్
engine = TradingEngine()

print("--- 1. లైవ్ మార్కెట్ ప్రైస్ టిక్స్ స్ట్రీమింగ్ (deque) ---")
engine.add_market_tick("TCS", 3850.0)
engine.add_market_tick("TCS", 3865.0)
engine.add_market_tick("TCS", 3840.0)
engine.add_market_tick("TCS", 3875.0)
engine.add_market_tick("TCS", 3890.0)
engine.add_market_tick("TCS", 3910.0)

print("\\n--- 2. ఆర్డర్స్ నమోదు (heapq priority) ---")
engine.place_buy_order("ORD-101", "TCS", 3870.0, 50, "రాహుల్")
engine.place_buy_order("ORD-102", "INFY", 1520.0, 100, "అంజలి")
engine.place_buy_order("ORD-103", "TCS", 3905.0, 30, "సురేష్") # అత్యధిక బిడ్!
engine.place_buy_order("ORD-104", "INFY", 1550.0, 200, "రాహుల్")

engine.execute_top_orders()
engine.print_analytics_summary()
</code></pre>
    </div>

    <!-- 5 COLLAPSIBLE QUIZZES -->
    <h2 class="section-title"><span class="num">★</span> ఈ అధ్యాయంపై ప్రాక్టీస్ క్విజ్ (Knowledge Check)</h2>

    <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px 18px; margin-bottom:12px; cursor:pointer;">
      <summary style="font-weight:700; color:#10b981; font-size:14.5px;">1. list.pop(0) కంటే deque.popleft() ఎందుకు 1000 రెట్లు వేగవంతమైనది?</summary>
      <div style="font-size:13.5px; color:var(--text); line-height:1.7; margin-top:10px;">
        <strong>సమాధానం:</strong> సాధారణ లిస్ట్‌లో మొదటి ఎలిమెంట్‌ను తీసివేస్తే మిగిలిన అన్ని ఎలిమెంట్లను మెమరీలో ఒక స్థానం ముందుకు జరపాలి (O(N) లీనియర్ టైమ్). కానీ <code>deque</code> అంతర్గతంగా డబ్లీ లింక్డ్ లిస్ట్‌గా నిర్మించబడింది. కాబట్టి మొదటి నోడ్ యొక్క పాయింటర్‌ను మార్చడం ద్వారా O(1) కాన్స్టెంట్ సమయంలో తక్షణమే ఎలిమెంట్‌ను తొలగిస్తుంది.
      </div>
    </details>

    <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px 18px; margin-bottom:12px; cursor:pointer;">
      <summary style="font-weight:700; color:#10b981; font-size:14.5px;">2. collections.Counter లో లేని కీని చదివితే KeyError ఎందుకు రాదు?</summary>
      <div style="font-size:13.5px; color:var(--text); line-height:1.7; margin-top:10px;">
        <strong>సమాధానం:</strong> <code>Counter</code> అనేది డిక్షనరీ యొక్క సబ్‌క్లాస్ అయినప్పటికీ, అది <code>__missing__(key)</code> మెథడ్‌ను ఓవర్‌రైట్ చేస్తుంది. ఆ కీ కౌంటర్‌లో లేకపోతే ఎర్రర్ విసరడానికి బదులుగా <code>0</code> రిటర్న్ చేస్తుంది.
      </div>
    </details>

    <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px 18px; margin-bottom:12px; cursor:pointer;">
      <summary style="font-weight:700; color:#10b981; font-size:14.5px;">3. defaultdict(list) లో ఫ్యాక్టరీ ఫంక్షన్ పాత్ర ఏమిటి?</summary>
      <div style="font-size:13.5px; color:var(--text); line-height:1.7; margin-top:10px;">
        <strong>సమాధానం:</strong> డిక్షనరీలో ఇంకా ఉనికిలో లేని నూతన కీని యాక్సెస్ చేసినప్పుడు, <code>defaultdict</code> ఆ ఫ్యాక్టరీ ఫంక్షన్‌ను (ఇక్కడ <code>list</code>) కాల్ చేసి స్వయంచాలకంగా ఒక ఖాళీ లిస్ట్‌ను <code>[]</code> ప్రారంభ విలువగా కేటాయిస్తుంది. దీనివల్ల KeyError రాదు మరియు ముందస్తు చెకింగ్స్ అవసరం ఉండదు.
      </div>
    </details>

    <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px 18px; margin-bottom:12px; cursor:pointer;">
      <summary style="font-weight:700; color:#10b981; font-size:14.5px;">4. heapq మాడ్యూల్ డిఫాల్ట్‌గా Min-Heap ని అమలు చేస్తుందా లేదా Max-Heap ని అమలు చేస్తుందా?</summary>
      <div style="font-size:13.5px; color:var(--text); line-height:1.7; margin-top:10px;">
        <strong>సమాధానం:</strong> పైథాన్ యొక్క <code>heapq</code> డిఫాల్ట్‌గా <strong>Min-Heap</strong> ని అమలు చేస్తుంది. అంటే <code>heap[0]</code> ఎల్లప్పుడూ అత్యల్ప విలువను కలిగి ఉంటుంది. ఒకవేళ Max-Heap కావాలంటే సంఖ్యలను నెగటివ్‌గా మార్చి (<code>-val</code>) స్టోర్ చేయాలి.
      </div>
    </details>

    <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px 18px; margin-bottom:12px; cursor:pointer;">
      <summary style="font-weight:700; color:#10b981; font-size:14.5px;">5. deque(maxlen=K) లో సర్క్యులర్ బఫర్ ఎలా పనిచేస్తుంది?</summary>
      <div style="font-size:13.5px; color:var(--text); line-height:1.7; margin-top:10px;">
        <strong>సమాధానం:</strong> <code>maxlen</code> నిర్దేశించినప్పుడు డెక్ గరిష్టంగా K ఎలిమెంట్లను మాత్రమే నిల్వ చేస్తుంది. బఫర్ పూర్తిగా నిండిన తర్వాత కొత్త ఎలిమెంట్‌ను యాడ్ చేసినప్పుడు, ఎదురువైపున ఉన్న అత్యంత పాత ఎలిమెంట్ స్వయంచాలకంగా బయటకు వెళ్లిపోతుంది. దీనివల్ల మెమరీ లీక్స్ లేకుండా స్థిరమైన సైజులో స్లైడింగ్ విండోస్ నిర్వహించవచ్చు.
      </div>
    </details>

    <!-- PREV / NEXT NAVIGATION -->
    <div style="display:flex; justify-content:space-between; align-items:center; margin-top:40px; padding-top:20px; border-top:1px solid var(--border); flex-wrap:wrap; gap:16px;">
      <a href="/blog-python/14-python-sets-and-operations.html" style="text-decoration:none; color:var(--text); font-weight:600; display:inline-flex; align-items:center; gap:8px; background:var(--bg2); padding:10px 18px; border-radius:8px; border:1px solid var(--border);">
        ← మునుపటి అధ్యాయం: 14. సెట్స్ &amp; ఆపరేషన్స్
      </a>
      <a href="/blog-python/16-python-functions-fundamentals.html" style="text-decoration:none; color:#ffffff; font-weight:700; display:inline-flex; align-items:center; gap:8px; background:#10b981; padding:10px 22px; border-radius:8px; box-shadow:0 4px 12px rgba(16,185,129,0.3);">
        తర్వాతి అధ్యాయం: 16. ఫంక్షన్స్ ఫండమెంటల్స్ →
      </a>
    </div>

    <!-- INTERACTIVE COMPILER CTA CARD -->
    <div style="margin-top:40px; background:linear-gradient(135deg, rgba(16,185,129,0.1) 0%, rgba(56,189,248,0.1) 100%); border:1px solid rgba(16,185,129,0.3); border-radius:12px; padding:24px; text-align:center;">
      <h3 style="margin-top:0; color:var(--text); font-size:20px;">ఈ High-Frequency Trading Engine ని లైవ్‌గా మన కంపైలర్‌లో రన్ చేయండి!</h3>
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
# చాప్టర్ 15 మినీ ప్రాజెక్ట్: High-Frequency Trading Engine (LIVE DEMO)
# =====================================================================
from collections import deque, Counter, defaultdict
import heapq

orders = []
heapq.heappush(orders, (-3905.0, "ORD-103", "TCS", 30, "సురేష్"))
heapq.heappush(orders, (-3870.0, "ORD-101", "TCS", 50, "రాహుల్"))
heapq.heappush(orders, (-1550.0, "ORD-104", "INFY", 200, "రాహుల్"))

vol = Counter()
print("=" * 60)
print(f"{'⚡ HFT ప్రయారిటీ ఎగ్జిక్యూషన్ ఇంజిన్ (LIVE)':^60}")
print("=" * 60)

while orders:
    neg_p, oid, stock, shares, user = heapq.heappop(orders)
    p = -neg_p
    vol[stock] += shares
    print(f"[{oid}] Executed {shares} of {stock} @ ₹{p:.2f} for {user}")

print("=" * 60)
print("వాల్యూమ్ లెక్కింపు :", dict(vol))
print("\\n🎉 చాప్టర్ 15 ప్రాజెక్ట్ విజయవంతంగా రన్ అయ్యింది! 🚀")
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
fs.writeFileSync(outputPath, chapter15Content, 'utf8');
console.log('✅ Successfully generated deep high-value Python Chapter 15 in exact HTML style!');
console.log('Target file:', currentLesson.file);
console.log('Target file size:', chapter15Content.length, 'characters');
