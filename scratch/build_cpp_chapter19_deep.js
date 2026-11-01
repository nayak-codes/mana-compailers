const fs = require('fs');
const path = require('path');
const { LESSONS, buildSidebar } = require('./cpp_curriculum_data.js');

const currentLesson = LESSONS[18]; // Chapter 19 (0-indexed 18)
const sidebarHtml = buildSidebar(19);

const chapter19Content = `<!DOCTYPE html>
<html class="light-theme" lang="te">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${currentLesson.title} — Modern C++ Tutorial | Our Compiler</title>
  <meta name="description" content="C++ STL కంటైనర్లు & అల్గారిథమ్స్ సమగ్ర మాస్టర్‌క్లాస్ తెలుగులో: std::vector, std::list, std::deque, std::map, std::unordered_map, std::priority_queue, Iterators & Iterator Invalidation, STL Algorithms (sort, binary_search, transform), మరియు Enterprise E-Commerce Order Fulfilment Engine ప్రాజెక్ట్." />
  <meta name="keywords" content="c++ stl in telugu, std vector telugu, std map telugu, unordered_map c++, stl algorithms telugu, iterators c++, priority_queue c++, learn c++ in telugu, our compiler" />
  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />
  <link rel="icon" type="image/png" href="/logo.png" />
  <link rel="canonical" href="https://www.ourcompiler.com/blog-cpp/${currentLesson.file}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;500;600;700&family=Sora:wght@400;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/blog-style.css" />
  <link rel="stylesheet" href="/blog-cpp/style.css" />
  <link rel="stylesheet" href="/site-nav.css" />

  <!-- Schema.org TechArticle Structured Data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": "${currentLesson.title} (Mastering C++ STL Containers, Iterators and Algorithms in Telugu)",
    "description": "C++ STL పూర్తి గైడ్: Sequence & Associative Containers, Iterators, Sorting, Transforming, మరియు Enterprise E-Commerce Engine.",
    "articleSection": "Phase 5: Advanced C++, STL & Real-World Projects",
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
    "datePublished": "2026-02-19",
    "dateModified": "2026-11-01"
  }
  </script>

  <!-- Interactive Scripts: Accordion, C++ Syntax Highlighter & Theme -->
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

    // Client-side C++ Syntax Highlighter
    function highlightCppCode(rawCode) {
      const tokens = [];
      const pushToken = (cls, text) => {
        const id = tokens.length;
        tokens.push('<span class="' + cls + '">' + text + '</span>');
        return '___CPP_TOK_' + id + '___';
      };

      let code = rawCode.replace(/(\\/\\/[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/)/g, m => pushToken('cm', m));
      code = code.replace(/(#[a-zA-Z_]+(?:\\s*<[^>]+>|\\s*"[^"]+")?)/g, m => pushToken('pp', m));
      code = code.replace(/("[^"\\\\]*(?:\\\\.[^"\\\\]*)*"|'[^'\\\\]*(?:\\\\.[^'\\\\]*)*')/g, m => pushToken('st', m));

      const kwList = [
        'int','double','float','char','bool','void','auto','long','short','unsigned','signed',
        'return','using','namespace','class','struct','public','private','protected',
        'virtual','override','final','template','typename','const','constexpr','consteval',
        'if','else','for','while','do','switch','case','break','continue','default',
        'new','delete','try','catch','throw','nullptr','true','false','static','inline',
        'sizeof','typedef','enum','explicit','friend','operator','typeid'
      ];
      const kwRegex = new RegExp('\\\\b(' + kwList.join('|') + ')\\\\b', 'g');
      code = code.replace(kwRegex, m => pushToken('kw', m));

      const fnList = [
        'std','cout','cin','endl','cerr','clog','string','vector','list','deque','map',
        'set','unordered_map','unordered_set','stack','queue','priority_queue','pair',
        'sort','binary_search','lower_bound','upper_bound','transform','accumulate',
        'find','count_if','main','printf','fixed','setprecision'
      ];
      const fnRegex = new RegExp('\\\\b(' + fnList.join('|') + ')\\\\b', 'g');
      code = code.replace(fnRegex, m => pushToken('fn', m));

      code = code.replace(/\\b(\\d+(?:\\.\\d+)?(?:f|u|l|ll)?|0x[0-9a-fA-F]+)\\b/gi, m => pushToken('nu', m));
      code = code.replace(/___CPP_TOK_(\\d+)___/g, (_, id) => tokens[id]);
      return code;
    }

    document.addEventListener('DOMContentLoaded', () => {
      document.querySelectorAll('pre code').forEach(el => {
        el.innerHTML = highlightCppCode(el.textContent);
      });
    });

    function copyCode(btn) {
      const codeBlock = btn.closest('.code-block');
      const codeEl = codeBlock.querySelector('pre code');
      if (codeEl) {
        navigator.clipboard.writeText(codeEl.textContent).then(() => {
          const orig = btn.innerHTML;
          btn.innerHTML = '✅ Copied!';
          setTimeout(() => { btn.innerHTML = orig; }, 2000);
        });
      }
    }

    function runCodeInCompiler(btn) {
      const codeBlock = btn.closest('.code-block');
      const codeEl = codeBlock.querySelector('pre code');
      if (codeEl) {
        const rawCode = codeEl.textContent;
        try {
          localStorage.setItem('code_cpp17', rawCode);
          localStorage.setItem('code_cpp', rawCode);
        } catch (e) {
          console.warn('LocalStorage error:', e);
        }
        window.open('/online-cpp-compiler.html', '_blank');
      }
    }
  </script>
</head>
<body>

<div id="site-nav-placeholder"></div>

<div class="layout">
${sidebarHtml}

  <!-- MAIN ARTICLE CONTENT -->
  <main class="content">

    <!-- BREADCRUMB -->
    <div class="breadcrumb">
      <a href="/">Home</a><span class="sep">›</span>
      <a href="/blog.html">Tutorials</a><span class="sep">›</span>
      <a href="/blog-cpp.html">C++ Masterclass</a><span class="sep">›</span>
      <span class="current">Chapter 19: ${currentLesson.title}</span>
    </div>

    <!-- PAGE TITLE -->
    <h1 class="page-title">${currentLesson.title}</h1>

    <!-- PAGE META BADGES -->
    <div class="page-meta">
      <span class="badge">🌐 Modern C++ (C++20/C++17)</span>
      <span class="badge">🟢 Chapter 19 of 20</span>
      <span class="badge">📂 ${currentLesson.phaseTag}: ${currentLesson.phaseTitle}</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

    <!-- SUBTOPICS PILL BAR -->
    <div style="background:var(--bg3); border:1px solid var(--border); border-radius:8px; padding:10px 16px; margin-bottom:24px; font-size:13px; color:var(--text2); display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
      <span style="color:#10b981; font-weight:700;">📌 Covered in this chapter:</span>
      <span>${currentLesson.subtopics}</span>
    </div>

    <!-- INTRO ACCENT BOX (Warm Ivory with Green Accent) -->
    <div class="intro-box">
      <p>కంప్యూటర్ ప్రోగ్రామింగ్ ప్రపంచంలో చక్రాలను మళ్లీ మళ్లీ కనుక్కోవడం (Reinventing the Wheel) కంటే అమూల్యమైన సమయాన్ని హరించే తప్పు మరొకటి ఉండదు. ఒక ప్రోగ్రామర్‌కు డేటా స్ట్రక్చర్స్ అయిన డైనమిక్ అర్రేలు, లింక్డ్ లిస్టులు, బైనరీ ట్రీలు, హ్యాష్ టేబుల్స్, లేదా క్విక్‌సార్ట్ అల్గారిథమ్స్ అవసరమైన ప్రతిసారీ మొదటి నుండి కోడ్ రాయకుండా, ప్రపంచంలోని అత్యున్నత కంప్యూటర్ శాస్త్రవేత్తలు పరిశోధించి రాసిన అత్యంత శక్తివంతమైన లైబ్రరీయే <strong>C++ STL (Standard Template Library)</strong>.</p>
      <p>STL లో ప్రధానంగా మూడు మూలస్తంభాలు ఉన్నాయి: డేటాను నిల్వ చేసే <strong>కంటైనర్లు (Containers)</strong>, ఆ డేటాను నావిగేట్ చేసే <strong>ఇటరేటర్లు (Iterators)</strong>, మరియు మెరుపు వేగంతో ప్రాసెస్ చేసే <strong>అల్గారిథమ్స్ (Algorithms)</strong>. వీటితో పాటే రన్-టైమ్ క్యూయింగ్ కోసం <code>std::priority_queue</code>, సెర్చింగ్ కోసం $O(1)$ Hash Maps, మరియు C++20 లో వచ్చిన అధునాతన రేంజ్ పైప్‌లైన్లు ఉన్నాయి.</p>
      <p>ఈ సమగ్ర మాస్టర్‌క్లాస్‌లో మనం <code>std::vector</code> యొక్క అండర్‌లైయింగ్ మెమరీ గ్రోత్, <code>std::map</code> vs <code>std::unordered_map</code> అంతర్గత ట్రీ &amp; హ్యాష్ మెకానిక్స్, Iterator Invalidation ప్రమాదాలు, కోర్ అల్గారిథమ్స్, మరియు పూర్తి స్థాయి <em>"Enterprise E-Commerce Order Fulfilment &amp; Search Analytics Engine"</em> ప్రాజెక్ట్‌ను ప్రత్యక్షంగా నిర్మించి ప్రావీణ్యం సంపాదిద్దాం!</p>
    </div>

    <!-- SECTION 1 -->
    <section>
      <h2 class="section-title"><span class="num">1</span> STL ఆర్కిటెక్చర్ అంటే ఏమిటి? (The Stepanov Triad)</h2>
      <p>
        <strong>STL (Standard Template Library)</strong> ని 1990లలో అలెక్సాండర్ స్టెపనోవ్ (Alexander Stepanov) అనే దిగ్గజ కంప్యూటర్ శాస్త్రవేత్త రూపొందించారు.
      </p>
      <p>
        స్టెపనోవ్ ఒక విప్లవాత్మకమైన ప్రశ్న వేశారు: <em>"డేటా స్ట్రక్చర్ మరియు అల్గారిథమ్స్ మధ్య గట్టి బంధం (Tight Coupling) ఎందుకు ఉండాలి? ఒక సార్టింగ్ అల్గారిథమ్ అర్రేలపైనా, లింక్డ్ లిస్టులపైనా ఒకే విధంగా పనిచేసేలా ఎందుకు చేయకూడదు?"</em>
      </p>
      <p>
        ఆ ఆలోచన నుండే STL త్రిమూర్తుల నిర్మాణం జన్మించింది:
      </p>
      <ol>
        <li><strong>కంటైనర్లు (Containers):</strong> డేటాను భద్రపరిచే భాండాగారాలు (ఉదా: <code>vector</code>, <code>list</code>, <code>map</code>).</li>
        <li><strong>ఇటరేటర్లు (Iterators):</strong> కంటైనర్‌కు మరియు అల్గారిథమ్‌కు మధ్య వారధిగా పనిచేసే స్మార్ట్ పాయింటర్లు.</li>
        <li><strong>అల్గారిథమ్స్ (Algorithms):</strong> డేటాపై పనిచేసే ఫంక్షన్లు (ఉదా: <code>std::sort</code>, <code>std::find</code>, <code>std::transform</code>).</li>
      </ol>
    </section>

    <!-- SECTION 2 -->
    <section>
      <h2 class="section-title"><span class="num">2</span> సీక్వెన్స్ కంటైనర్లు: <code>std::vector</code> (The Undisputed King)</h2>
      <p>
        C++ ప్రోగ్రామర్ నిత్య జీవితంలో 90% సమయం ఉపయోగించే కంటైనర్ <strong><code>std::vector</code></strong>. ఇది హీప్ మెమరీలో కంటిగ్యువస్ (వరుస) బ్లాక్‌లో డేటాను భద్రపరుస్తుంది.
      </p>
      <p>
        <strong>Size వర్సెస్ Capacity &amp; Geometric Growth:</strong>
      </p>
      <ul>
        <li><code>size()</code>: ప్రస్తుతం వెక్టార్‌లో ఎన్ని ఎలిమెంట్లు ఉన్నాయి.</li>
        <li><code>capacity()</code>: మెమరీని రీ-అలొకేట్ చేయకుండా గరిష్టంగా ఎన్ని ఎలిమెంట్లను ఉంచగలదు.</li>
        <li>ఎలిమెంట్లు నిండిపోయినప్పుడు కంపైలర్ కెపాసిటీని <strong>రెట్టింపు (2x Geometric Growth)</strong> చేస్తుంది: పాత మెమరీ నుండి కొత్త మెమరీకి కాపీ చేసి పాత దాన్ని డిలీట్ చేస్తుంది.</li>
      </ul>
      <div class="tip-box">
        🚀 <strong>పెర్ఫార్మెన్స్ ప్రో-టిప్ (reserve() ఆవశ్యకత):</strong> మీకు వెక్టార్‌లో ఎన్ని అంశాలు వస్తాయో ముందే తెలిస్తే, ఎల్లప్పుడూ <strong><code>vec.reserve(10000);</code></strong> వాడండి! దీనివల్ల అనవసరమైన డబులింగ్ రీ-అలొకేషన్లు మరియు మెమరీ కాపీలు ఆగిపోయి ప్రోగ్రామ్ 5x వేగవంతమవుతుంది.
      </div>

      <div class="code-block">
        <div class="code-header">
          <span class="file-name">vector_deep_dive.cpp</span>
          <div class="btn-group">
            <button class="btn btn-copy" onclick="copyCode(this)">📋 Copy</button>
            <button class="btn btn-run" onclick="runCodeInCompiler(this)">▶ Run</button>
          </div>
        </div>
        <pre><code>#include &lt;iostream&gt;
#include &lt;vector&gt;

int main() {
    std::vector&lt;int&gt; numbers;
    numbers.reserve(5); // 5 ఎలిమెంట్లకు ముందుగానే కెపాసిటీ లాక్!

    std::cout << "ప్రారంభ సైజ్: " << numbers.size() << " | కెపాసిటీ: " << numbers.capacity() << "\\n";

    for (int i = 1; i <= 5; ++i) {
        numbers.push_back(i * 10);
        std::cout << "ఐటెమ్ జోడించబడింది: " << (i * 10) 
                  << " -> Size: " << numbers.size() << " | Capacity: " << numbers.capacity() << "\\n";
    }

    // emplace_back: ఆబ్జెక్ట్‌ను ఇన్-ప్లేస్ గా నిర్మిస్తుంది (కాపీ సున్నా!)
    numbers.emplace_back(60); // ఇప్పుడు కెపాసిటీ రెట్టింపు అవుతుంది!
    std::cout << "60 చేర్చిన తర్వాత -> Size: " << numbers.size() << " | Capacity: " << numbers.capacity() << "\\n";
    return 0;
}</code></pre>
      </div>
    </section>

    <!-- SECTION 3 -->
    <section>
      <h2 class="section-title"><span class="num">3</span> <code>std::deque</code> &amp; <code>std::list</code> (Double-Ended Queue vs Doubly Linked List)</h2>
      <table class="tbl">
        <thead>
          <tr>
            <th>కంటైనర్</th>
            <th>అంతర్గత డేటా స్ట్రక్చర్</th>
            <th>ముందు/వెనుక ఇన్సర్షన్ ($O(1)$)</th>
            <th>మధ్యలో ఇన్సర్షన్</th>
            <th>CPU Cache Locality</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong><code>std::vector</code></strong></td>
            <td>Contiguous Dynamic Array</td>
            <td>వెనుక మాత్రమే $O(1)$; ముందు $O(N)$</td>
            <td>$O(N)$ (ఎలిమెంట్స్ షిఫ్ట్ అవ్వాలి)</td>
            <td><strong>ఉత్తమమైనది (10/10)</strong></td>
          </tr>
          <tr>
            <td><strong><code>std::deque</code></strong></td>
            <td>Chunked Memory Blocks (Array of Buffers)</td>
            <td><strong>ముందు &amp; వెనుక రెంటిలోనూ $O(1)$</strong></td>
            <td>$O(N)$</td>
            <td>మంచిది (8/10)</td>
          </tr>
          <tr>
            <td><strong><code>std::list</code></strong></td>
            <td>Doubly Linked List (Nodes with prev/next pointers)</td>
            <td>ముందు &amp; వెనుక రెంటిలోనూ $O(1)$</td>
            <td><strong>ఇటరేటర్ ఉంటే $O(1)$</strong></td>
            <td>చాలా తక్కువ (పాయింటర్ చేజింగ్ వల్ల Cache Misses)</td>
          </tr>
        </tbody>
      </table>
    </section>

    <!-- SECTION 4 -->
    <section>
      <h2 class="section-title"><span class="num">4</span> కంటైనర్ అడాప్టర్లు: <code>std::stack</code>, <code>std::queue</code>, <code>std::priority_queue</code></h2>
      <p>
        కంటైనర్ అడాప్టర్లు నేరుగా మెమరీని మేనేజ్ చేయవు; అవి వెక్టార్ లేదా డెక్ పైన నిర్దిష్టమైన ఇంటర్‌ఫేస్‌ను అందిస్తాయి:
      </p>
      <ul>
        <li><strong><code>std::stack</code>:</strong> LIFO (Last-In, First-Out) - <code>push()</code>, <code>pop()</code>, <code>top()</code>.</li>
        <li><strong><code>std::queue</code>:</strong> FIFO (First-In, First-Out) - <code>push()</code>, <code>pop()</code>, <code>front()</code>.</li>
        <li><strong><code>std::priority_queue</code>:</strong> Max-Heap ఆర్కిటెక్చర్. ఎలిమెంట్లను ఇన్సర్ట్ చేసినప్పుడు అత్యధిక ప్రాధాన్యత (గరిష్ట విలువ) కలిగిన ఎలిమెంట్ ఎల్లప్పుడూ పైకి ($O(\log N)$) వస్తుంది.</li>
      </ul>

      <div class="code-block">
        <div class="code-header">
          <span class="file-name">priority_queue_demo.cpp</span>
          <div class="btn-group">
            <button class="btn btn-copy" onclick="copyCode(this)">📋 Copy</button>
            <button class="btn btn-run" onclick="runCodeInCompiler(this)">▶ Run</button>
          </div>
        </div>
        <pre><code>#include &lt;iostream&gt;
#include &lt;queue&gt;
#include &lt;string&gt;

struct HospitalPatient {
    std::string name;
    int triagePriority; // 10: అత్యవసరం (ICU), 1: సాధారణం

    // Priority Queue కొరకు < ఆపరేటర్ ఓవర్‌లోడింగ్!
    bool operator<(const HospitalPatient& other) const {
        return triagePriority < other.triagePriority; // Max-heap కొరకు
    }
};

int main() {
    std::priority_queue&lt;HospitalPatient&gt; erQueue;

    erQueue.push({"రోగి A (సాధారణ జ్వరం)", 2});
    erQueue.push({"రోగి B (గుండెపోటు - ICU)", 10});
    erQueue.push({"రోగి C (ఎముక విరిగింది)", 6});

    std::cout << "===== అత్యవసర ఎమర్జెన్సీ వార్డ్ ట్రియేజ్ ఆర్డర్ =====\\n";
    while (!erQueue.empty()) {
        HospitalPatient p = erQueue.top();
        std::cout << "🚨 చికిత్స జరుగుతోంది: " << p.name << " [ప్రాధాన్యత: " << p.triagePriority << "]\\n";
        erQueue.pop();
    }
    return 0;
}</code></pre>
      </div>
    </section>

    <!-- SECTION 5 -->
    <section>
      <h2 class="section-title"><span class="num">5</span> అసోసియేటివ్ కంటైనర్లు: <code>std::set</code> &amp; <code>std::map</code> (Red-Black Trees: $O(\log N)$)</h2>
      <p>
        కీ-విలువ జతలను (Key-Value Pairs) ఎల్లప్పుడూ <strong>క్రమబద్ధీకరించిన క్రమంలో (Sorted Order)</strong> ఉంచడానికి <strong><code>std::map</code></strong> మరియు <strong><code>std::set</code></strong> లను ఉపయోగిస్తాం.
      </p>
      <ul>
        <li>అంతర్గతంగా ఇవి <strong>Red-Black Tree (Self-balancing BST)</strong> ద్వారా నిర్మించబడ్డాయి.</li>
        <li>శోధన (Search), చేరిక (Insert), తొలగింపు (Delete) అన్నీ ఖచ్చితంగా <strong>$O(\log N)$</strong> టైమ్ కాంప్లెక్సిటీని గ్యారెంటీ చేస్తాయి.</li>
        <li>కీలు ఎల్లప్పుడూ యునిక్ (Unique) గా ఉంటాయి.</li>
      </ul>

      <div class="code-block">
        <div class="code-header">
          <span class="file-name">map_set_basics.cpp</span>
          <div class="btn-group">
            <button class="btn btn-copy" onclick="copyCode(this)">📋 Copy</button>
            <button class="btn btn-run" onclick="runCodeInCompiler(this)">▶ Run</button>
          </div>
        </div>
        <pre><code>#include &lt;iostream&gt;
#include &lt;map&gt;
#include &lt;string&gt;

int main() {
    // std::map కీలను స్వయంచాలకంగా ఆల్ఫాబెటికల్ ఆర్డర్‌లో సార్ట్ చేస్తుంది!
    std::map&lt;std::string, double&gt; currencyRates;

    currencyRates["USD"] = 84.15;
    currencyRates["EUR"] = 91.20;
    currencyRates["GBP"] = 108.50;
    currencyRates["AED"] = 22.90;

    std::cout << "===== కరెన్సీ రేట్లు (ఆటోమేటిక్ Sorted Order) =====\\n";
    for (const auto& [currency, rate] : currencyRates) {
        std::cout << "  " << currency << " = ₹ " << rate << "\\n";
    }

    // find() ద్వారా సురక్షిత సెర్చింగ్
    auto it = currencyRates.find("EUR");
    if (it != currencyRates.end()) {
        std::cout << "\\nEUR రేటు లభించింది: ₹ " << it->second << "\\n";
    }
    return 0;
}</code></pre>
      </div>
    </section>

    <!-- SECTION 6 -->
    <section>
      <h2 class="section-title"><span class="num">6</span> అనార్డర్డ్ కంటైనర్లు: <code>std::unordered_map</code> (Hash Tables: $O(1)$)</h2>
      <p>
        మీకు డేటా సార్ట్ అవ్వాల్సిన పనిలేదు, కేవలం మెరుపు వేగంతో శోధించడం మాత్రమే ముఖ్యమైతే <strong><code>std::unordered_map</code></strong> ను ఎంచుకోవాలి.
      </p>
      <ul>
        <li>అంతర్గతంగా ఇది ఒక <strong>హ్యాష్ టేబుల్ (Hash Table)</strong>.</li>
        <li>హ్యాష్ కొలీషన్లు లేనంత వరకు సగటు సెర్చ్ సమయం కేవలం <strong>$O(1)$ (Instant Lookup)</strong>!</li>
      </ul>

      <table class="tbl">
        <thead>
          <tr>
            <th>అంశం</th>
            <th><code>std::map</code></th>
            <th><code>std::unordered_map</code></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>అంతర్గత నిర్మాణం</strong></td>
            <td>Red-Black Tree (Balanced BST)</td>
            <td>Hash Table (Buckets + Hash function)</td>
          </tr>
          <tr>
            <td><strong>టైమ్ కాంప్లెక్సిటీ</strong></td>
            <td>$O(\log N)$ (స్థిరమైన గ్యారెంటీ)</td>
            <td>$O(1)$ Average (Worst case $O(N)$)</td>
          </tr>
          <tr>
            <td><strong>ఎలిమెంట్స్ క్రమం</strong></td>
            <td>ఎల్లప్పుడూ సార్ట్ అయి ఉంటుంది</td>
            <td>ఎటువంటి క్రమం ఉండదు (Random/Unordered)</td>
          </tr>
        </tbody>
      </table>
    </section>

    <!-- SECTION 7 -->
    <section>
      <h2 class="section-title"><span class="num">7</span> ఇటరేటర్ల ప్రపంచం &amp; Iterator Invalidation ప్రమాదం</h2>
      <p>
        కంటైనర్లలోని అంశాలను మొదటి నుండి చివరి వరకు దర్శించడానికి (Traverse) మనం <strong>ఇటరేటర్లను (Iterators)</strong> ఉపయోగిస్తాం.
      </p>
      <div class="warning-box">
        ⚠️ <strong>తీవ్రమైన బగ్: Iterator Invalidation Hazard:</strong><br/>
        ఒక వెక్టార్‌పై ఇటరేటర్ ద్వారా లూప్ రన్ అవుతున్న సమయంలో, మీరు లూప్ లోపల <code>vec.push_back()</code> లేదా <code>vec.erase()</code> చేస్తే, వెక్టార్ మెమరీ రీ-అలొకేట్ అయ్యి మీ పాత ఇటరేటర్లు అన్నీ <strong>చెల్లనివిగా (Invalidated)</strong> మారిపోతాయి! ఆ తర్వాత దాన్ని వాడితే సెగ్మెంటేషన్ ఫాల్ట్ క్రాష్ వస్తుంది.<br/>
        <em>పరిష్కారం:</em> లూప్‌లో ఎలిమెంట్లను తొలగించడానికి <code>it = vec.erase(it);</code> రిటర్న్ విలువను వాడాలి లేదా C++20 <code>std::erase_if</code> వాడాలి!
      </div>
    </section>

    <!-- SECTION 8 -->
    <section>
      <h2 class="section-title"><span class="num">8</span> మోడరన్ C++ Range-based <code>for</code> లూప్ &amp; C++20 Ranges &amp; Views</h2>
      <p>
        Modern C++ లో ఇటరేటర్ల సింటాక్స్ రాయాల్సిన పని లేకుండా <strong>Range-based for loop</strong> తో అత్యంత సులభంగా కోడ్ రాయవచ్చు:
      </p>
      <pre><code>for (const auto&amp; item : container) { ... }</code></pre>
      <p>
        <strong>Modern C++20 Ranges పైప్‌లైన్ విప్లవం:</strong><br/>
        C++20 లో Linux టెర్మినల్ పైపుల వలె (<code>|</code>) డేటాను కాపీ చేయకుండా వ్యూస్ (Views) ద్వారా ఫిల్టర్ మరియు ట్రాన్స్‌ఫార్మ్ చేయవచ్చు:
      </p>
      <pre><code>auto result = numbers | std::views::filter([](int n){ return n % 2 == 0; })
                      | std::views::transform([](int n){ return n * n; });</code></pre>
    </section>

    <!-- SECTION 9 -->
    <section>
      <h2 class="section-title"><span class="num">9</span> కోర్ STL అల్గారిథమ్స్: సార్టింగ్ &amp; బైనరీ సెర్చ్ (<code><algorithm></code>)</h2>
      <p>
        STL లో అత్యంత వేగవంతమైన హైబ్రిడ్ సార్టింగ్ అల్గారిథమ్ <strong><code>std::sort</code></strong> (ఇది QuickSort, HeapSort, మరియు InsertionSort మూడింటి కలయికతో పనిచేస్తుంది - $O(N \log N)$ గ్యారెంటీ!).
      </p>
      <p>
        సార్ట్ చేయబడిన డేటాపై <strong><code>std::binary_search</code></strong> ($O(\log N)$) లేదా <strong><code>std::lower_bound</code></strong> / <strong><code>std::upper_bound</code></strong> ద్వారా లాగరిథమిక్ వేగంతో సెర్చ్ చేయవచ్చు.
      </p>

      <div class="code-block">
        <div class="code-header">
          <span class="file-name">stl_sort_search.cpp</span>
          <div class="btn-group">
            <button class="btn btn-copy" onclick="copyCode(this)">📋 Copy</button>
            <button class="btn btn-run" onclick="runCodeInCompiler(this)">▶ Run</button>
          </div>
        </div>
        <pre><code>#include &lt;iostream&gt;
#include &lt;vector&gt;
#include &lt;algorithm&gt;

int main() {
    std::vector&lt;int&gt; scores = {85, 42, 99, 12, 73, 56, 91};

    // 1. std::sort తో ఆరోహణ క్రమం
    std::sort(scores.begin(), scores.end());

    std::cout << "సార్ట్ చేసిన మార్కులు: ";
    for (int s : scores) std::cout << s << " ";
    std::cout << "\\n";

    // 2. Binary Search (ఖచ్చితంగా డేటా సార్ట్ అయి ఉండాలి!)
    bool found = std::binary_search(scores.begin(), scores.end(), 73);
    std::cout << "73 మార్కులు లిస్టులో ఉన్నాయా? " << (found ? "అవును (Found)" : "లేవు (Not Found)") << "\\n";
    return 0;
}</code></pre>
      </div>
    </section>

    <!-- SECTION 10 -->
    <section>
      <h2 class="section-title"><span class="num">10</span> ట్రాన్స్‌ఫార్మింగ్ &amp; న్యూమరిక్ అల్గారిథమ్స్ (<code>std::transform</code> &amp; <code>accumulate</code>)</h2>
      <p>
        ఒక వెక్టార్‌లోని అన్ని ఎలిమెంట్లను మరొక రూపంలోకి మార్చడానికి <strong><code>std::transform</code></strong> ను, మరియు మొత్తం ఎలిమెంట్ల కూడిక కోసం <strong><code>std::accumulate</code></strong> (<code>&lt;numeric&gt;</code> హెడర్) ను ఉపయోగిస్తాం.
      </p>

      <div class="code-block">
        <div class="code-header">
          <span class="file-name">transform_accumulate.cpp</span>
          <div class="btn-group">
            <button class="btn btn-copy" onclick="copyCode(this)">📋 Copy</button>
            <button class="btn btn-run" onclick="runCodeInCompiler(this)">▶ Run</button>
          </div>
        </div>
        <pre><code>#include &lt;iostream&gt;
#include &lt;vector&gt;
#include &lt;algorithm&gt;
#include &lt;numeric&gt;

int main() {
    std::vector&lt;double&gt; pricesUSD = {10.0, 25.5, 40.0, 100.0};
    std::vector&lt;double&gt; pricesINR(pricesUSD.size());

    const double exchangeRate = 84.0;

    // std::transform తో USD ని నేరుగా INR గా మార్చడం
    std::transform(pricesUSD.begin(), pricesUSD.end(), pricesINR.begin(),
                   [exchangeRate](double usd) { return usd * exchangeRate; });

    // std::accumulate తో మొత్తం బిల్లు కూడటం
    double totalBillINR = std::accumulate(pricesINR.begin(), pricesINR.end(), 0.0);

    std::cout << "భారతీయ రూపాయల్లో మొత్తం బిల్లు: ₹ " << totalBillINR << "\\n";
    return 0;
}</code></pre>
      </div>
    </section>

    <!-- SECTION 11 -->
    <section>
      <h2 class="section-title"><span class="num">11</span> STL పెర్ఫార్మెన్స్ బెస్ట్ ప్రాక్టీసెస్ (The Contiguous Rule)</h2>
      <ol style="line-height:1.8;">
        <li>
          <strong>డిఫాల్ట్‌గా ఎల్లప్పుడూ <code>std::vector</code> నే వాడండి:</strong> ఆధునిక CPU లలో L1/L2/L3 క్యాష్ లైన్లు కంటిగ్యువస్ మెమరీపై అత్యంత వేగంగా పనిచేస్తాయి. <code>std::list</code> కంటే వెక్టార్ కొన్ని వందల రెట్లు వేగంగా రన్ అవుతుంది.
        </li>
        <li>
          <strong>లార్జ్ కంటైనర్లకు <code>reserve()</code> తప్పనిసరి.</strong>
        </li>
        <li>
          <strong><code>std::unordered_map</code> వాడేటప్పుడు హ్యాష్ ఫంక్షన్‌ను సరిగ్గా ఎంచుకోండి.</strong>
        </li>
      </ol>
    </section>

    <!-- SECTION 12 -->
    <section>
      <h2 class="section-title"><span class="num">12</span> రియల్-వరల్డ్ ప్రాజెక్ట్: Enterprise E-Commerce Order Fulfilment &amp; Search Analytics Engine</h2>
      <p>
        నిజ జీవితంలో Amazon లేదా Flipkart వంటి ఈ-కామర్స్ ప్లాట్‌ఫామ్‌లలో లక్షలాది ఉత్పత్తుల క్యాటలాగ్, కస్టమర్ ఆర్డర్ల ప్రాసెసింగ్, మరియు ప్రైమ్ డెలివరీ క్యూలు సమర్థవంతంగా నడవడానికి STL కంటైనర్ల కలయిక తప్పనిసరి.
      </p>
      <p>
        ఈ సమగ్ర ప్రాజెక్ట్‌లో మనం <code>unordered_map</code> (ప్రొడక్ట్ క్యాటలాగ్), <code>priority_queue</code> (ఎక్స్‌ప్రెస్ ఆర్డర్ ఫుల్‌ఫిల్‌మెంట్), <code>map</code> (కేటగిరీ అనలిటిక్స్), మరియు STL అల్గారిథమ్స్‌తో కూడిన ఒక <strong>ఎంటర్‌ప్రైజ్ ఈ-కామర్స్ ఆర్డర్ ఇంజిన్</strong> ను నిర్మిస్తున్నాం:
      </p>

      <div class="code-block">
        <div class="code-header">
          <span class="file-name">EcommerceOrderEngine.cpp</span>
          <div class="btn-group">
            <button class="btn btn-copy" onclick="copyCode(this)">📋 Copy</button>
            <button class="btn btn-run" onclick="openInteractiveCompiler()">⚡ Run Live Project</button>
          </div>
        </div>
        <pre><code>#include &lt;iostream&gt;
#include &lt;string&gt;
#include &lt;vector&gt;
#include &lt;unordered_map&gt;
#include &lt;map&gt;
#include &lt;queue&gt;
#include &lt;algorithm&gt;
#include &lt;numeric&gt;
#include &lt;iomanip&gt;

struct Product {
    std::string sku;
    std::string title;
    double price;
    std::string category;
};

struct Order {
    int orderId;
    std::string customerName;
    std::vector&lt;std::string&gt; skus;
    int deliveryUrgency; // 10: Prime Same-Day, 1: Standard

    bool operator<(const Order& other) const {
        return deliveryUrgency < other.deliveryUrgency; // Priority Queue కొరకు
    }
};

int main() {
    std::cout << "=======================================================================\\n";
    std::cout << "🛒 [ENTERPRISE E-COMMERCE ORDER FULFILMENT & ANALYTICS ENGINE]\\n";
    std::cout << "=======================================================================\\n";

    // 1. std::unordered_map: $O(1)$ ప్రొడక్ట్ క్యాటలాగ్ ఇండెక్స్
    std::unordered_map&lt;std::string, Product&gt; catalog = {
        {"SKU_001", {"SKU_001", "MacBook Pro M3 Max", 249900.0, "Electronics"}},
        {"SKU_002", {"SKU_002", "Sony WH-1000XM5 Headphones", 29990.0, "Audio"}},
        {"SKU_003", {"SKU_003", "Ergonomic Mechanical Keyboard", 12499.0, "Accessories"}},
        {"SKU_004", {"SKU_004", "Dell UltraSharp 4K Monitor", 58990.0, "Electronics"}}
    };

    // 2. std::priority_queue: ఎక్స్‌ప్రెస్ ప్రైమ్ ఆర్డర్ ఫుల్‌ఫిల్‌మెంట్ క్యూ
    std::priority_queue&lt;Order&gt; fulfilmentQueue;

    fulfilmentQueue.push({1001, "రాజేష్ వర్మ", {"SKU_002"}, 3});
    fulfilmentQueue.push({1002, "ప్రియాంక రెడ్డి (PRIME VIP)", {"SKU_001", "SKU_004"}, 10});
    fulfilmentQueue.push({1003, "సందీప్ కుమార్", {"SKU_003"}, 5});

    std::cout << "\\n[వేర్‌హౌస్ డిస్పాచ్ ఆర్డర్ ప్రాసెసింగ్ (Priority Queue ద్వారా)]:\\n";
    double totalRevenue = 0.0;

    while (!fulfilmentQueue.empty()) {
        Order currentOrder = fulfilmentQueue.top();
        fulfilmentQueue.pop();

        std::cout << "  📦 ఆర్డర్ #" << currentOrder.orderId << " కస్టమర్: " << currentOrder.customerName 
                  << " [Urgency Level: " << currentOrder.deliveryUrgency << "]\\n";

        double orderTotal = 0.0;
        for (const auto& sku : currentOrder.skus) {
            if (catalog.find(sku) != catalog.end()) {
                const auto& prod = catalog[sku];
                std::cout << "     • ఐటెమ్: " << prod.title << " | ₹ " << prod.price << "\\n";
                orderTotal += prod.price;
            }
        }
        std::cout << "     -> ఆర్డర్ సబ్‌టోటల్: ₹ " << orderTotal << "\\n\\n";
        totalRevenue += orderTotal;
    }

    std::cout << "=======================================================================\\n";
    std::cout << "💰 మొత్తం ప్రాసెస్ చేయబడిన టర్నోవర్: ₹ " << std::fixed << std::setprecision(2) << totalRevenue << "\\n";
    std::cout << "=======================================================================\\n";
    return 0;
}</code></pre>
      </div>
    </section>

    <!-- SECTION 13 -->
    <section>
      <h2 class="section-title"><span class="num">13</span> సారాంశం &amp; ఇంటరాక్టివ్ క్విజ్ (Summary &amp; Self-Check Quizzes)</h2>

      <div style="background:var(--bg2); border:1px solid var(--border); border-radius:12px; padding:20px; margin-bottom:28px;">
        <h3 style="margin-top:0; color:#10b981;">📌 ఈ అధ్యాయంలో నేర్చుకున్న ప్రధాన అంశాలు:</h3>
        <ul style="line-height:1.8; color:var(--text);">
          <li><strong>STL Triad:</strong> Containers (స్టోరేజ్), Iterators (నావిగేషన్), Algorithms (ప్రాసెసింగ్) ల స్వతంత్ర డీకప్లింగ్ ఆర్కిటెక్చర్.</li>
          <li><strong>std::vector:</strong> అత్యంత వేగవంతమైన కంటిగ్యువస్ కంటైనర్. <code>reserve()</code> ద్వారా రీ-అలొకేషన్లను నివారించాలి.</li>
          <li><strong>std::deque &amp; std::list:</strong> రెండు వైపులా $O(1)$ కొరకు డెక్; నోడ్-బేస్డ్ లింక్డ్ లిస్ట్ కొరకు లిస్ట్.</li>
          <li><strong>std::priority_queue:</strong> Max-Heap ఆధారంగా అత్యధిక ప్రాధాన్యత కలిగిన ఎలిమెంట్లను రన్‌టైమ్‌లో ముందుంచడం.</li>
          <li><strong>std::map vs unordered_map:</strong> ఆర్డర్డ్ సార్టెడ్ ట్రీస్ కొరకు మ్యాప్ ($O(\log N)$); ఇన్‌స్టంట్ హ్యాష్ టేబుల్స్ కొరకు అనార్డర్డ్ మ్యాప్ ($O(1)$).</li>
          <li><strong>Iterator Invalidation:</strong> లూప్‌లలో కంటైనర్‌ను మార్చేటప్పుడు ఇటరేటర్లు చెల్లనివిగా మారే ప్రమాదాన్ని గుర్తించి నివారించడం.</li>
          <li><strong>std::sort &amp; transform:</strong> $O(N \log N)$ IntroSort మరియు ఫంక్షనల్ డేటా ట్రాన్స్‌ఫార్మేషన్.</li>
        </ul>
      </div>

      <h3 style="margin-bottom:16px;">🧠 మీ అవగాహనను పరీక్షించుకోండి (5 Interactive Quizzes):</h3>

      <!-- QUIZ 1 -->
      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:14px;">
        <summary style="font-weight:600; cursor:pointer; color:var(--text);">
          ప్రశ్న 1: <code>std::vector</code> లో <code>size()</code> మరియు <code>capacity()</code> మధ్య తేడా ఏమిటి?
        </summary>
        <div style="margin-top:12px; padding-top:10px; border-top:1px dashed var(--border); font-size:14px; color:var(--text2); line-height:1.6;">
          <strong>సమాధానం:</strong> <code>size()</code> అనేది ప్రస్తుత ఎలిమెంట్ల సంఖ్య; <code>capacity()</code> అనేది కొత్తగా మెమరీ రీ-అలొకేట్ చేయకుండా నిల్వ చేయగల గరిష్ట సామర్థ్యం!<br/>
          <em>వివరణ:</em> సైజ్ కెపాసిటీకి సమానమైనప్పుడు, కొత్త ఎలిమెంట్ వస్తే వెక్టార్ ఆటోమేటిక్‌గా తన కెపాసిటీని రెట్టింపు చేసుకుంటుంది.
        </div>
      </details>

      <!-- QUIZ 2 -->
      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:14px;">
        <summary style="font-weight:600; cursor:pointer; color:var(--text);">
          ప్రశ్న 2: <code>std::map</code> మరియు <code>std::unordered_map</code> లలో శోధన (Lookup) వేగాల మధ్య వ్యత్యాసం ఏమిటి?
        </summary>
        <div style="margin-top:12px; padding-top:10px; border-top:1px dashed var(--border); font-size:14px; color:var(--text2); line-height:1.6;">
          <strong>సమాధానం:</strong> <code>std::map</code> లో <strong>$O(\log N)$</strong>, <code>std::unordered_map</code> లో సగటున <strong>$O(1)$</strong>!<br/>
          <em>వివరణ:</em> <code>std::map</code> రెడ్-బ్లాక్ బ్యాలెన్స్‌డ్ ట్రీపై ఆధారపడి కీలను సార్ట్ చేస్తుంది. <code>std::unordered_map</code> హ్యాష్ టేబుల్‌పై ఆధారపడి ఆర్డర్ లేకుండా తక్షణ లుకప్ ఇస్తుంది.
        </div>
      </details>

      <!-- QUIZ 3 -->
      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:14px;">
        <summary style="font-weight:600; cursor:pointer; color:var(--text);">
          ప్రశ్న 3: <strong>Iterator Invalidation</strong> అంటే ఏమిటి? ఇది ఎప్పుడు సంభవిస్తుంది?
        </summary>
        <div style="margin-top:12px; padding-top:10px; border-top:1px dashed var(--border); font-size:14px; color:var(--text2); line-height:1.6;">
          <strong>సమాధానం:</strong> కంటైనర్ లోపలి మెమరీ మారినప్పుడు పాత ఇటరేటర్లు చెల్లని పాయింటర్లుగా మారిపోవడం!<br/>
          <em>వివరణ:</em> ఒక వెక్టార్‌లో లూప్ జరుగుతున్నప్పుడు <code>push_back()</code> చేయడం వల్ల మెమరీ వేరే చోటికి రీ-అలొకేట్ అయితే, పాత ఇటరేటర్ పాత చెల్లని మెమరీని చూపిస్తూ ప్రోగ్రామ్ క్రాష్ అవుతుంది.
        </div>
      </details>

      <!-- QUIZ 4 -->
      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:14px;">
        <summary style="font-weight:600; cursor:pointer; color:var(--text);">
          ప్రశ్న 4: <code>std::priority_queue</code> లోపలి అంశాలు ఏ డేటా స్ట్రక్చర్ సూత్రంపై ప్రాసెస్ చేయబడతాయి?
        </summary>
        <div style="margin-top:12px; padding-top:10px; border-top:1px dashed var(--border); font-size:14px; color:var(--text2); line-height:1.6;">
          <strong>సమాధానం:</strong> <strong>Max-Heap (గరిష్ట హీప్)</strong> సూత్రంపై!<br/>
          <em>వివరణ:</em> ఏ క్రమంలో ఎలిమెంట్లను ఇన్సర్ట్ చేసినా, అత్యధిక ప్రాధాన్యత లేదా గరిష్ట విలువ కలిగిన ఎలిమెంట్ ఎల్లప్పుడూ <code>top()</code> స్థానంలో ఉంచబడుతుంది.
        </div>
      </details>

      <!-- QUIZ 5 -->
      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:14px;">
        <summary style="font-weight:600; cursor:pointer; color:var(--text);">
          ప్రశ్న 5: ఆధునిక CPU లలో <code>std::list</code> కంటే <code>std::vector</code> ఎందుకు విపరీతమైన వేగంతో నడుస్తుంది?
        </summary>
        <div style="margin-top:12px; padding-top:10px; border-top:1px dashed var(--border); font-size:14px; color:var(--text2); line-height:1.6;">
          <strong>సమాధానం:</strong> <strong>CPU Cache Locality (కంటిగ్యువస్ మెమరీ ప్రిన్సిపుల్)</strong> వల్ల!<br/>
          <em>వివరణ:</em> వెక్టార్ ఎలిమెంట్స్ RAM లో ఒకదాని పక్కన ఒకటి వరుసగా ఉంటాయి, కాబట్టి CPU ఒకే ఫెచ్‌తో మొత్తం క్యాష్‌లైన్‌ను తెచ్చుకుంటుంది. లింక్డ్ లిస్ట్ నోడ్స్ మెమరీలో చెల్లాచెదురుగా ఉండి విపరీతమైన క్యాష్ మిస్‌లకు కారణమవుతాయి.
        </div>
      </details>
    </section>

    <!-- LESSON NAVIGATION -->
    <div class="lesson-nav">
      <a href="/blog-cpp/${currentLesson.prev.file}" class="prev-link">← మునుపటి అధ్యాయం: ${currentLesson.prev.title}</a>
      <a href="/blog-cpp/${currentLesson.next.file}" class="next-link">తర్వాతి అధ్యాయం: ${currentLesson.next.title} →</a>
    </div>

  </main>
</div>

<!-- SCRIPTS FOR SITEMAP & INTERACTIVE RUNNER -->
<script src="/site-nav.js"></script>
<script>
  function openInteractiveCompiler() {
    const projectCode = \`#include <iostream>
#include <string>
#include <vector>
#include <unordered_map>
#include <map>
#include <queue>
#include <algorithm>
#include <numeric>
#include <iomanip>

struct Product {
    std::string sku;
    std::string title;
    double price;
    std::string category;
};

struct Order {
    int orderId;
    std::string customerName;
    std::vector<std::string> skus;
    int deliveryUrgency;

    bool operator<(const Order& other) const {
        return deliveryUrgency < other.deliveryUrgency;
    }
};

int main() {
    std::cout << "=======================================================================\\\\n";
    std::cout << "🛒 [ENTERPRISE E-COMMERCE ORDER FULFILMENT & ANALYTICS ENGINE]\\\\n";
    std::cout << "=======================================================================\\\\n";

    std::unordered_map<std::string, Product> catalog = {
        {"SKU_001", {"SKU_001", "MacBook Pro M3 Max", 249900.0, "Electronics"}},
        {"SKU_002", {"SKU_002", "Sony WH-1000XM5 Headphones", 29990.0, "Audio"}},
        {"SKU_003", {"SKU_003", "Ergonomic Mechanical Keyboard", 12499.0, "Accessories"}},
        {"SKU_004", {"SKU_004", "Dell UltraSharp 4K Monitor", 58990.0, "Electronics"}}
    };

    std::priority_queue<Order> fulfilmentQueue;

    fulfilmentQueue.push({1001, "రాజేష్ వర్మ", {"SKU_002"}, 3});
    fulfilmentQueue.push({1002, "ప్రియాంక రెడ్డి (PRIME VIP)", {"SKU_001", "SKU_004"}, 10});
    fulfilmentQueue.push({1003, "సందీప్ కుమార్", {"SKU_003"}, 5});

    std::cout << "\\\\n[వేర్‌హౌస్ డిస్పాచ్ ఆర్డర్ ప్రాసెసింగ్ (Priority Queue ద్వారా)]:\\\\n";
    double totalRevenue = 0.0;

    while (!fulfilmentQueue.empty()) {
        Order currentOrder = fulfilmentQueue.top();
        fulfilmentQueue.pop();

        std::cout << "  📦 ఆర్డర్ #" << currentOrder.orderId << " కస్టమర్: " << currentOrder.customerName 
                  << " [Urgency Level: " << currentOrder.deliveryUrgency << "]\\\\n";

        double orderTotal = 0.0;
        for (const auto& sku : currentOrder.skus) {
            if (catalog.find(sku) != catalog.end()) {
                const auto& prod = catalog[sku];
                std::cout << "     • ఐటెమ్: " << prod.title << " | ₹ " << prod.price << "\\\\n";
                orderTotal += prod.price;
            }
        }
        std::cout << "     -> ఆర్డర్ సబ్‌టోటల్: ₹ " << orderTotal << "\\\\n\\\\n";
        totalRevenue += orderTotal;
    }

    std::cout << "=======================================================================\\\\n";
    std::cout << "💰 మొత్తం ప్రాసెస్ చేయబడిన టర్నోవర్: ₹ " << std::fixed << std::setprecision(2) << totalRevenue << "\\\\n";
    std::cout << "=======================================================================\\\\n";
    return 0;
}\`;

    try {
      localStorage.setItem('code_cpp17', projectCode);
      localStorage.setItem('code_cpp', projectCode);
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
    window.open('/online-cpp-compiler.html', '_blank');
  }
</script>

</body>
</html>
`;

const outputPath = path.join(__dirname, '..', 'public', 'blog-cpp', currentLesson.file);
fs.writeFileSync(outputPath, chapter19Content, 'utf8');
console.log('✅ Successfully generated deep high-value C++ Chapter 19 in exact HTML style!');
console.log('Target file:', currentLesson.file);
console.log('Target file size:', chapter19Content.length, 'characters');
