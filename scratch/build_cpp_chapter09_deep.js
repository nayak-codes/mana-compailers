const fs = require('fs');
const path = require('path');
const { LESSONS, buildSidebar } = require('./cpp_curriculum_data.js');

const currentLesson = LESSONS[8]; // Chapter 9
const sidebarHtml = buildSidebar(9);

const chapter09Content = `<!DOCTYPE html>
<html class="light-theme" lang="te">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${currentLesson.title} — Modern C++ Tutorial | Our Compiler</title>
  <meta name="description" content="C++ ఫంక్షన్స్ & Function Overloading సమగ్ర మాస్టర్‌క్లాస్ తెలుగులో: Function Prototypes, Pass by Value vs Reference (&), Pass by Const Reference, Default Arguments, Name Mangling, Inline Functions, మరియు Enterprise Corporate Payroll Engine ప్రాజెక్ట్." />
  <meta name="keywords" content="c++ functions telugu, c++ function overloading, pass by reference c++, pass by const reference, inline functions c++, default arguments c++, name mangling, learn c++ in telugu, our compiler" />
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
    "headline": "${currentLesson.title} (Mastering C++ Functions, Parameter Passing & Function Overloading in Telugu)",
    "description": "C++ ఫంక్షన్స్ పూర్తి గైడ్: Prototypes, Pass by Value vs Reference, Const Reference, Function Overloading, Name Mangling, మరియు Corporate Payroll Engine ప్రాజెక్ట్.",
    "articleSection": "Phase 3: Functions, Memory & Pointers",
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
    "datePublished": "2026-02-09",
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
        'virtual','override','template','typename','const','constexpr','consteval',
        'if','else','for','while','do','switch','case','break','continue','default',
        'new','delete','try','catch','throw','nullptr','true','false','static','inline',
        'sizeof','typedef','enum','explicit','friend','operator','typeid','static_cast',
        'likely','unlikely','fallthrough','extern'
      ];
      const kwRegex = new RegExp('\\\\b(' + kwList.join('|') + ')\\\\b', 'g');
      code = code.replace(kwRegex, m => pushToken('kw', m));

      const fnList = [
        'std','cout','cin','endl','cerr','clog','string','vector','map','set','pair','main',
        'printf','scanf','getline','numeric_limits','setw','setprecision','fixed','setfill',
        'left','right','boolalpha','noboolalpha','swap','calculateSalary'
      ];
      const fnRegex = new RegExp('\\\\b(' + fnList.join('|') + ')\\\\b', 'g');
      code = code.replace(fnRegex, m => pushToken('fn', m));

      code = code.replace(/\\b(\\d+(?:\\.\\d+)?(?:f|u|l|ll)?)\\b/gi, m => pushToken('nu', m));
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
    
    <!-- BREADCRUMB NAVIGATION -->
    <nav class="breadcrumb" aria-label="Breadcrumb" style="font-size:13.5px; margin-bottom:16px; color:var(--text2);">
      <a href="/" style="color:#10b981; text-decoration:none;">Home</a> &gt; 
      <a href="/blog-cpp/01-cpp-introduction-and-hello-world.html" style="color:#10b981; text-decoration:none;">C++ Masterclass</a> &gt; 
      <span>Phase 3: Functions & Memory</span> &gt;
      <span style="color:var(--text); font-weight:600;">Chapter 09: ఫంక్షన్స్ & Function Overloading</span>
    </nav>

    <!-- LESSON TITLE & META -->
    <h1 style="font-size:32px; font-weight:800; line-height:1.25; margin-bottom:12px; color:var(--text);">
      ${currentLesson.title}
    </h1>
    <div style="display:flex; gap:16px; align-items:center; font-size:13px; color:var(--text2); margin-bottom:24px; padding-bottom:16px; border-bottom:1px solid var(--border);">
      <span>📅 తాజా నవీకరణ: నవంబర్ 2026</span>
      <span>⏱️ చదివే సమయం: 29 నిమిషాలు</span>
      <span>🎯 స్థాయి: బిగినర్ నుండి ప్రొఫెషనల్ ఆర్కిటెక్ట్</span>
      <span>⭐ Phase 3 ప్రారంభం: ఫంక్షన్స్, మెమరీ & పాయింటర్లు</span>
    </div>

    <!-- SOFT IVORY INTRO BOX -->
    <div class="intro-box">
      <h3>🌟 ఈ అధ్యాయంలో మీరు ఏమి నేర్చుకోబోతున్నారు?</h3>
      <p>
        ఒక పెద్ద సాఫ్ట్‌వేర్ అప్లికేషన్‌లో వేలాది లైన్ల కోడ్ ఉంటుంది. ఆ కోడ్ మొత్తాన్ని ఒకే <code>main()</code> ఫంక్షన్‌లో రాసుకుంటూ పోతే, అది చదవడానికి అసాధ్యమైన గందరగోళ మోనోలిత్‌గా మారిపోతుంది. సాఫ్ట్‌వేర్ ఇంజనీరింగ్‌లో అత్యంత కీలకమైన ఆర్కిటెక్చర్ సూత్రం <strong>మాడ్యులరైజేషన్ (Modular Programming)</strong> — అంటే ఒక పెద్ద సమస్యను స్వతంత్రమైన చిన్న చిన్న భాగాలుగా విభజించడం.
      </p>
      <p>
        ఆ స్వతంత్ర విభాగాలనే మనం <strong>ఫంక్షన్స్ (Functions)</strong> అంటాం. ఈ సమగ్ర మాస్టర్‌క్లాస్‌లో మనం:
      </p>
      <ul>
        <li>ఫంక్షన్ ప్రోటోటైప్ (Declaration) vs డెఫినిషన్ (Definition) మరియు One Definition Rule (ODR).</li>
        <li><strong>Pass by Value</strong> (కాపీ ఓవర్‌హెడ్) vs <strong>Pass by Reference (<code>&amp;</code>)</strong> (డైరెక్ట్ మోడిఫికేషన్).</li>
        <li>Modern C++ లో అత్యంత ప్రాముఖ్యమైన గోల్డెన్ రూల్: <strong>Pass by Const Reference (<code>const Type&amp;</code>)</strong> — జీరో కాపీ రక్షణ.</li>
        <li><strong>Default Arguments</strong>: కుడి నుండి ఎడమకు వర్తించే నియమాలు.</li>
        <li><strong>Function Overloading (కంపైల్-టైమ్ పాలిమార్ఫిజం)</strong> & రిటర్న్ టైప్ మాత్రమే మారితే ఎందుకు ఓవర్‌లోడింగ్ సాధ్యం కాదు?</li>
        <li>హార్డ్‌వేర్ లెవల్ అసెంబ్లీ సీక్రెట్: C++ కంపైలర్ల <strong>Name Mangling</strong> మరియు <code>extern "C"</code> పాత్ర.</li>
        <li><strong>Inline Functions (<code>inline</code>)</strong>: ఫంక్షన్ కాల్ స్టాక్ ఓవర్‌హెడ్‌ను సున్నా చేసే పద్ధతి.</li>
        <li>CPU కాల్ స్టాక్ (Call Stack), స్టాక్ ఫ్రేమ్స్ నిర్మాణం & Stack Overflow నివారణ.</li>
        <li>చివరిగా టాటా కన్సల్టెన్సీ లేదా ఇన్ఫోసిస్ తరహా పూర్తి స్థాయి <strong>"Enterprise Corporate Payroll & Salary Taxation Engine"</strong> ప్రాజెక్ట్‌ను రన్ చేసి అధ్యయనం చేస్తాం!</li>
      </ul>
    </div>

    <!-- SECTION 1 -->
    <section>
      <h2 class="section-title"><span class="num">1</span> ఫంక్షన్స్ అంటే ఏమిటి? మాడ్యులర్ ప్రోగ్రామింగ్ & Code Reusability</h2>
      <p>
        ఒక నిర్దిష్టమైన పనిని (Specific Task) పూర్తి చేయడానికి రూపొందించబడిన స్వయంప్రతిపత్తి గల కోడ్ బ్లాక్‌ను <strong>ఫంక్షన్ (Function)</strong> అంటారు.
      </p>
      <p>
        సాఫ్ట్‌వేర్ పరిశ్రమలో ఫంక్షన్స్ ఎందుకు ప్రాణాధారమైనవి?
      </p>
      <ul>
        <li><strong>Code Reusability (కోడ్ పునర్వినియోగం):</strong> ఒకే లాజిక్‌ను (ఉదా: జిఎస్‌టి పన్ను లెక్కించడం) ప్రోగ్రామ్‌లో పది చోట్ల రాయకుండా, ఒక ఫంక్షన్‌గా రాసి ఎన్నిసార్లైనా పిలుచుకోవచ్చు (Call).</li>
        <li><strong>Single Responsibility Principle (SRP):</strong> ప్రతి ఫంక్షన్ ఒకే ఒక్క పనిని పరిపూర్ణంగా చేయాలి. దీనివల్ల డీబగ్గింగ్ చేయడం చాలా సులభమవుతుంది.</li>
        <li><strong>Abstraction (అబ్‌స్ట్రాక్షన్):</strong> ఫంక్షన్‌ను వాడేవారికి అది లోపల ఎలా పనిచేస్తుందో తెలియాల్సిన అవసరం లేదు; ఇన్పుట్ ఏమిటి మరియు అవుట్‌పుట్ ఏమి వస్తుందో తెలిస్తే చాలు (ఉదా: <code>std::sqrt(25)</code>).</li>
      </ul>

      <div style="background:var(--bg2); border:1px solid var(--border); border-radius:10px; padding:20px; margin:20px 0;">
        <h4 style="margin:0 0 12px 0; color:#10b981; font-size:15px;">🧩 ఒక ఫంక్షన్ యొక్క 4 ముఖ్యమైన భాగాలు</h4>
        <div style="font-family:'JetBrains Mono',monospace; font-size:13.5px; line-height:1.8; color:var(--text);">
          [Return Type] [Function Name] ( [Parameter List] ) {<br>
          &nbsp;&nbsp;&nbsp;&nbsp;// ఫంక్షన్ బాడీ: వ్యాపార లాజిక్<br>
          &nbsp;&nbsp;&nbsp;&nbsp;return [ఫలితం];<br>
          }
        </div>
      </div>
    </section>

    <!-- SECTION 2 -->
    <section>
      <h2 class="section-title"><span class="num">2</span> ఫంక్షన్ డిక్లరేషన్ (Prototype) vs డెఫినిషన్ (Definition)</h2>
      <p>
        C++ కంపైలర్ ఒక ఫైల్‌ను పై నుండి క్రిందికి (Top-to-Bottom) ఒకే పాస్‌లో చదువుతుంది. మీరు <code>main()</code> ఫంక్షన్ కింద ఒక ఫంక్షన్‌ను రాసి, దాన్ని <code>main()</code> లోపల పిలిస్తే — కంపైలర్ <em>"error: identifier not found"</em> అని ప్రోగ్రామ్‌ను తిరస్కరిస్తుంది!
      </p>
      <p>
        ఈ సమస్యను పరిష్కరించడానికి C++ లో రెండు దశలు ఉన్నాయి:
      </p>
      <ul>
        <li><strong>1. ఫంక్షన్ డిక్లరేషన్ (Function Prototype):</strong> <code>main()</code> కంటే ముందే కంపైలర్‌కు ఫంక్షన్ పేరు, రిటర్న్ టైప్, మరియు పారామీటర్లను పరిచయం చేయడం. ఇది కేవలం ఒక హామీ పత్రం లాంటిది (సెమికోలన్ <code>;</code> తో ముగుస్తుంది).</li>
        <li><strong>2. ఫంక్షన్ డెఫినిషన్ (Function Definition):</strong> ఫంక్షన్ లోపల అసలు కోడ్ ఏమి చేయాలో కర్లీ బ్రాకెట్లలో <code>{ ... }</code> పూర్తిగా రాయడం.</li>
      </ul>

      <div style="margin:20px 0 16px;">
        <div style="font-size:13.5px; font-weight:700; color:#10b981; margin-bottom:6px;">💻 Example 1: Function Declaration vs Definition Separation</div>
        <div class="code-block">
          <div class="code-block-header">
            <span class="lang-tag">C++17</span>
            <div class="code-actions">
              <button class="copy-btn" onclick="copyCode(this)">📋 Copy</button>
              <button class="try-btn" onclick="runCodeInCompiler(this)">▶ Run in Compiler</button>
            </div>
          </div>
          <pre><code>#include &lt;iostream&gt;

// 1. ఫంక్షన్ ప్రోటోటైప్ (డిక్లరేషన్): కంపైలర్‌కు ముందస్తు సమాచారం
double calculateGst(double basePrice, double gstPercentage);

int main() {
    double itemPrice = 12000.00;
    double taxRate = 18.0;

    // ఫంక్షన్ కాల్: కంపైలర్‌కు ప్రోటోటైప్ ముందే తెలుసు కాబట్టి ఎలాంటి ఎర్రర్ రాదు
    double finalTax = calculateGst(itemPrice, taxRate);

    std::cout &lt;&lt; "వస్తువు ధర : ₹ " &lt;&lt; itemPrice &lt;&lt; '\\n';
    std::cout &lt;&lt; "GST పన్ను (" &lt;&lt; taxRate &lt;&lt; "%) : ₹ " &lt;&lt; finalTax &lt;&lt; '\\n';
    std::cout &lt;&lt; "మొత్తం చెల్లించాల్సింది : ₹ " &lt;&lt; (itemPrice + finalTax) &lt;&lt; '\\n';

    return 0;
}

// 2. ఫంక్షన్ డెఫినిషన్: అసలైన ఇంప్లిమెంటేషన్ ఇక్కడ ఉంది
double calculateGst(double basePrice, double gstPercentage) {
    return (basePrice * gstPercentage) / 100.0;
}</code></pre>
        </div>
      </div>
    </section>

    <!-- SECTION 3 -->
    <section>
      <h2 class="section-title"><span class="num">3</span> పారామీటర్ పాసింగ్ మెకానిజమ్స్: Pass by Value (కాపీ ఓవర్‌హెడ్)</h2>
      <p>
        C++ లో సాధారణంగా ఒక వేరియబుల్‌ను ఫంక్షన్‌కు పంపినప్పుడు (ఉదా: <code>void update(int x)</code>), కంపైలర్ ఆ ఒరిజినల్ వేరియబుల్ యొక్క <strong>పూర్తి నకలును (Duplicate Copy)</strong> స్టాక్ మెమరీలో తయారుచేసి ఫంక్షన్‌కు ఇస్తుంది. దీనినే <strong>Pass by Value</strong> అంటారు.
      </p>

      <div class="card" style="background:var(--bg2); border-left:4px solid #10b981; border-radius:8px; padding:16px 20px; margin:16px 0;">
        <h4 style="margin:0 0 8px 0; color:#10b981; font-size:15px;">🔍 Pass by Value లక్షణాలు</h4>
        <p style="font-size:13.5px; color:var(--text); line-height:1.7; margin:0;">
          1. <strong>సేఫ్టీ:</strong> ఫంక్షన్ లోపల మీరు ఆ పారామీటర్‌ను ఎంత మార్చినా, <code>main()</code> లోని ఒరిజినల్ వేరియబుల్ సురక్షితంగా ఉంటుంది (Side-effect Free).<br>
          2. <strong>పరిమితి:</strong> పెద్ద ఆబ్జెక్టులు (ఉదాహరణకు 10 లక్షల ఎలిమెంట్లు ఉన్న <code>std::vector</code>) పాస్ చేసినప్పుడు, ఆ మొత్తం మెమరీ మళ్లీ కాపీ అవ్వడం వల్ల ప్రోగ్రామ్ వేగం విపరీతంగా పడిపోతుంది (Memory &amp; CPU Penalty).
        </p>
      </div>
    </section>

    <!-- SECTION 4 -->
    <section>
      <h2 class="section-title"><span class="num">4</span> పారామీటర్ పాసింగ్ మెకానిజమ్స్: Pass by Reference (&) (డైరెక్ట్ మోడిఫికేషన్)</h2>
      <p>
        ఒక వేరియబుల్‌ను కాపీ చేయకుండా, నేరుగా ఆ ఒరిజినల్ వేరియబుల్ పైనే ఫంక్షన్ పనిచేయాలి అనుకున్నప్పుడు మనం <strong>Pass by Reference</strong> ఉపయోగిస్తాం.
      </p>
      <p>
        పారామీటర్ టైప్ పక్కన ఆంపర్‌సండ్ (<strong><code>&amp;</code></strong>) గుర్తు పెడితే, అది కొత్త మెమరీని తీసుకోదు; ఒరిజినల్ వేరియబుల్‌కు ఒక మారుపేరుగా (Alias) వ్యవహరిస్తుంది. ఫంక్షన్ లోపల చేసే ప్రతి మార్పూ నేరుగా కాలర్ యొక్క వేరియబుల్‌ను ప్రభావితం చేస్తుంది!
      </p>

      <div style="margin:20px 0 16px;">
        <div style="font-size:13.5px; font-weight:700; color:#10b981; margin-bottom:6px;">💻 Example 2: Classic Variable Swap using Pass by Reference</div>
        <div class="code-block">
          <div class="code-block-header">
            <span class="lang-tag">C++17 Reference Swap</span>
            <div class="code-actions">
              <button class="copy-btn" onclick="copyCode(this)">📋 Copy</button>
              <button class="try-btn" onclick="runCodeInCompiler(this)">▶ Run in Compiler</button>
            </div>
          </div>
          <pre><code>#include &lt;iostream&gt;

// Pass by Reference: నేరుగా ఒరిజినల్ మెమరీ లొకేషన్లనే మారుస్తుంది!
void swapValues(int&amp; first, int&amp; second) {
    int temp = first;
    first = second;
    second = temp;
}

int main() {
    int bankAccountA = 25000;
    int bankAccountB = 75000;

    std::cout &lt;&lt; "స్వాప్ చేయడానికి ముందు:\\n";
    std::cout &lt;&lt; "ఖాతా A: ₹" &lt;&lt; bankAccountA &lt;&lt; " | ఖాతా B: ₹" &lt;&lt; bankAccountB &lt;&lt; "\\n";

    swapValues(bankAccountA, bankAccountB);

    std::cout &lt;&lt; "\\nస్వాప్ చేసిన తర్వాత (Pass by Reference ప్రభావం):\\n";
    std::cout &lt;&lt; "ఖాతా A: ₹" &lt;&lt; bankAccountA &lt;&lt; " | ఖాతా B: ₹" &lt;&lt; bankAccountB &lt;&lt; "\\n";

    return 0;
}</code></pre>
        </div>
      </div>
    </section>

    <!-- SECTION 5 -->
    <section>
      <h2 class="section-title"><span class="num">5</span> Modern C++ గోల్డెన్ రూల్: Pass by Const Reference (const Type&)</h2>
      <p>
        C++ సాఫ్ట్‌వేర్ ఇంజనీరింగ్‌లో అత్యంత శక్తివంతమైన, ప్రపంచవ్యాప్తంగా ప్రతి ప్రొఫెషనల్ కోడ్‌బేస్‌లో కనిపించే సిగ్నేచర్: <strong><code>const Type&amp;</code></strong>!
      </p>

      <div style="background:var(--bg2); border:1px solid var(--border); border-radius:10px; padding:20px; margin:18px 0;">
        <h4 style="margin:0 0 10px 0; color:#10b981; font-size:15px;">🏆 The Best of Both Worlds (కాపీ ఉండదు + మార్చలేరు)</h4>
        <p style="font-size:13.5px; color:var(--text); line-height:1.7; margin:0;">
          1. <strong>రెఫరెన్స్ (<code>&amp;</code>):</strong> ఆబ్జెక్ట్ ఎంత పెద్దదైనా సరే (ఉదా: 50MB ఫైల్ డేటా లేదా భారీ స్ట్రింగ్), ఒక్క బైట్ కూడా కాపీ అవ్వదు! మెమరీ అడ్రస్ ద్వారా నేరుగా యాక్సెస్ లభిస్తుంది (<strong>Zero Copy Performance</strong>).<br>
          2. <strong>కాన్స్ట్ (<code>const</code>):</strong> ఫంక్షన్ లోపల డెవలపర్ పొరపాటున కూడా ఆ డేటాను మార్చలేడు (Read-Only Safety). మార్చడానికి ప్రయత్నిస్తే కంపైలర్ అక్కడే ఎర్రర్ ఇస్తుంది.<br>
          3. <strong>లిటరల్స్ మద్దతు:</strong> సాధారణ నాన్-కాన్స్ట్ రెఫరెన్స్‌కు డైరెక్ట్ విలువలు (ఉదా: <code>print("హలో")</code>) పంపలేము; కానీ <code>const std::string&amp;</code> లిటరల్స్ మరియు తాత్కాలిక వస్తువులను కూడా సంతోషంగా స్వీకరిస్తుంది!
        </p>
      </div>

      <div style="margin:20px 0 16px;">
        <div style="font-size:13.5px; font-weight:700; color:#10b981; margin-bottom:6px;">💻 Example 3: Enterprise Logging with const std::string&</div>
        <div class="code-block">
          <div class="code-block-header">
            <span class="lang-tag">Modern C++ Golden Rule</span>
            <div class="code-actions">
              <button class="copy-btn" onclick="copyCode(this)">📋 Copy</button>
              <button class="try-btn" onclick="runCodeInCompiler(this)">▶ Run in Compiler</button>
            </div>
          </div>
          <pre><code>#include &lt;iostream&gt;
#include &lt;string&gt;

// గోల్డెన్ సిగ్నేచర్: const std::string&amp; (జీరో కాపీ + రీడ్ ఓన్లీ)
void logSecurityAudit(const std::string&amp; serverModule, const std::string&amp; eventMessage) {
    std::cout &lt;&lt; "🔒 [SECURITY AUDIT] [" &lt;&lt; serverModule &lt;&lt; "]: " &lt;&lt; eventMessage &lt;&lt; '\\n';
    // serverModule = "Hack"; // ❌ Compile Error! const కాబట్టి డేటా సురక్షితం!
}

int main() {
    std::string moduleName = "AUTH_SERVICE_GATEWAY";
    logSecurityAudit(moduleName, "యూజర్ విజయవంతంగా 2FA ద్వారా లాగిన్ అయ్యారు.");
    logSecurityAudit("PAYMENT_SERVICE", "రూ. 5000 లావాదేవీ ఆమోదించబడింది."); // టెంపరరీ లిటరల్స్ కూడా వర్తిస్తాయి
    return 0;
}</code></pre>
        </div>
      </div>
    </section>

    <!-- SECTION 6 -->
    <section>
      <h2 class="section-title"><span class="num">6</span> డిఫాల్ట్ ఆర్గ్యుమెంట్స్ (Default Arguments): ఫ్లెక్సిబుల్ ఫంక్షన్ కాలింగ్</h2>
      <p>
        ఒక ఫంక్షన్‌ను పిలిచేటప్పుడు కొన్ని పారామీటర్లకు విలువలు పంపకపోతే, కంపైలర్ స్వయంచాలకంగా ముందే నిర్వచించిన డిఫాల్ట్ విలువలను (Default Values) తీసుకోవడాన్నే <strong>Default Arguments</strong> అంటారు.
      </p>

      <div class="card" style="background:var(--bg2); border:1px solid rgba(239,68,68,0.3); border-left:4px solid #ef4444; border-radius:8px; padding:16px 20px; margin:16px 0;">
        <h4 style="margin:0 0 6px 0; color:#ef4444; font-size:15px;">⚠️ The Right-to-Left Rule (కుడి నుండి ఎడమకు మాత్రమే)</h4>
        <p style="font-size:13.5px; color:var(--text); line-height:1.7; margin:0;">
          C++ లో డిఫాల్ట్ విలువలు ఎల్లప్పుడూ <strong>పారామీటర్ లిస్ట్ చివర (కుడివైపున) మాత్రమే ఉండాలి!</strong> మధ్యలో లేదా మొదట్లో ఒక పారామీటర్‌కు డిఫాల్ట్ విలువ ఇచ్చి, దాని కుడివైపున ఉన్న పారామీటర్‌కు డిఫాల్ట్ విలువ ఇవ్వకపోతే కంపైలర్ తిరస్కరిస్తుంది.<br>
          ✅ <code>void sendEmail(string to, string subject = "Info", bool urgent = false);</code> (సరైనది)<br>
          ❌ <code>void sendEmail(string to, string subject = "Info", bool urgent);</code> (తప్పు!)
        </p>
      </div>

      <div style="margin:20px 0 16px;">
        <div style="font-size:13.5px; font-weight:700; color:#10b981; margin-bottom:6px;">💻 Example 4: Default Arguments in Banking Loan EMI Calculator</div>
        <div class="code-block">
          <div class="code-block-header">
            <span class="lang-tag">C++17</span>
            <div class="code-actions">
              <button class="copy-btn" onclick="copyCode(this)">📋 Copy</button>
              <button class="try-btn" onclick="runCodeInCompiler(this)">▶ Run in Compiler</button>
            </div>
          </div>
          <pre><code>#include &lt;iostream&gt;
#include &lt;iomanip&gt;

// డిఫాల్ట్ ఆర్గ్యుమెంట్స్: వడ్డీ రేటు 8.5%, కాలపరిమితి 12 నెలలు డిఫాల్ట్
double calculateEmi(double principal, double annualRoi = 8.5, int tenureMonths = 12) {
    double monthlyRate = (annualRoi / 12.0) / 100.0;
    double interest = principal * monthlyRate * tenureMonths;
    return (principal + interest) / tenureMonths;
}

int main() {
    std::cout &lt;&lt; std::fixed &lt;&lt; std::setprecision(2);

    // 1. అన్నీ డిఫాల్ట్ పారామీటర్లతో పిలవడం (కేవలం ప్రిన్సిపల్ మాత్రమే ఇచ్చాం)
    std::cout &lt;&lt; "కేస్ 1 (డిఫాల్ట్ 8.5% ROI, 12 నెలలు) EMI: ₹ " &lt;&lt; calculateEmi(100000.0) &lt;&lt; '\\n';

    // 2. వడ్డీ రేటును ఓవర్‌రైడ్ చేయడం (10.0% ROI, 12 నెలలు)
    std::cout &lt;&lt; "కేస్ 2 (10.0% ROI, డిఫాల్ట్ 12 నెలలు) EMI: ₹ " &lt;&lt; calculateEmi(100000.0, 10.0) &lt;&lt; '\\n';

    // 3. మూడింటినీ సొంత విలువల ద్వారా పిలవడం (9.0% ROI, 36 నెలలు)
    std::cout &lt;&lt; "కేస్ 3 (9.0% ROI, 36 నెలలు) EMI: ₹ " &lt;&lt; calculateEmi(100000.0, 9.0, 36) &lt;&lt; '\\n';

    return 0;
}</code></pre>
        </div>
      </div>
    </section>

    <!-- SECTION 7 -->
    <section>
      <h2 class="section-title"><span class="num">7</span> ఫంక్షన్ ఓవర్‌లోడింగ్ (Function Overloading): కంపైల్-టైమ్ పాలిమార్ఫిజం</h2>
      <p>
        ఒకే పేరుతో ఒకటి కంటే ఎక్కువ ఫంక్షన్లను రాసే సదుపాయాన్ని <strong>ఫంక్షన్ ఓవర్‌లోడింగ్ (Function Overloading)</strong> అంటారు. ఇది C++ లోని <strong>Compile-Time Polymorphism</strong> కు అద్భుతమైన ఉదాహరణ.
      </p>

      <div style="background:var(--bg2); border:1px solid var(--border); border-radius:10px; padding:20px; margin:18px 0;">
        <h4 style="margin:0 0 10px 0; color:#10b981; font-size:15px;">📜 ఫంక్షన్ ఓవర్‌లోడింగ్ యొక్క కచ్చితమైన నిబంధనలు</h4>
        <p style="font-size:13.5px; color:var(--text); line-height:1.7; margin:0;">
          కంపైలర్ ఏ ఫంక్షన్‌ను పిలవాలో నిర్ణయించడానికి ఫంక్షన్ యొక్క <strong>పారామీటర్ సిగ్నేచర్</strong> ను మాత్రమే పరిశీలిస్తుంది. క్రింది మూడింటిలో కనీసం ఒకటి మారాలి:<br>
          1. <strong>పారామీటర్ల సంఖ్య (Number of Parameters):</strong> ఉదా: <code>add(int, int)</code> vs <code>add(int, int, int)</code>.<br>
          2. <strong>పారామీటర్ల డేటా టైప్స్ (Data Types):</strong> ఉదా: <code>add(int, int)</code> vs <code>add(double, double)</code>.<br>
          3. <strong>పారామీటర్ల క్రమం (Order of Types):</strong> ఉదా: <code>print(int, string)</code> vs <code>print(string, int)</code>.<br><br>
          <span style="color:#ef4444; font-weight:700;">⚠️ అతి ముఖ్యమైన హెచ్చరిక:</span> <strong>కేవలం Return Type మాత్రమే వేరుగా ఉంటే C++ లో ఫంక్షన్ ఓవర్‌లోడింగ్ సాధ్యం కాదు!</strong> ఉదాహరణకు: <code>int get()</code> మరియు <code>double get()</code> రాస్తే కంపైలర్ తీవ్రమైన అంబిగ్యుటీ ఎర్రర్ ఇస్తుంది.
        </p>
      </div>

      <div style="margin:20px 0 16px;">
        <div style="font-size:13.5px; font-weight:700; color:#10b981; margin-bottom:6px;">💻 Example 5: Function Overloading in Area Calculations</div>
        <div class="code-block">
          <div class="code-block-header">
            <span class="lang-tag">C++17 Function Overloading</span>
            <div class="code-actions">
              <button class="copy-btn" onclick="copyCode(this)">📋 Copy</button>
              <button class="try-btn" onclick="runCodeInCompiler(this)">▶ Run in Compiler</button>
            </div>
          </div>
          <pre><code>#include &lt;iostream&gt;

// 1. చతురస్రం వైశాల్యం (ఒకే ఒక పూర్ణాంక పారామీటర్)
int calculateArea(int side) {
    return side * side;
}

// 2. దీర్ఘచతురస్రం వైశాల్యం (రెండు పూర్ణాంక పారామీటర్లు)
int calculateArea(int length, int breadth) {
    return length * breadth;
}

// 3. వృత్తం వైశాల్యం (ఒక డబుల్ పారామీటర్)
double calculateArea(double radius) {
    return 3.14159 * radius * radius;
}

int main() {
    std::cout &lt;&lt; "చతురస్రం వైశాల్యం (భుజం 5)          : " &lt;&lt; calculateArea(5) &lt;&lt; " చ.సెం.మీ\\n";
    std::cout &lt;&lt; "దీర్ఘచతురస్రం వైశాల్యం (10 x 4)     : " &lt;&lt; calculateArea(10, 4) &lt;&lt; " చ.సెం.మీ\\n";
    std::cout &lt;&lt; "వృత్తం వైశాల్యం (వ్యాసార్థం 3.5)       : " &lt;&lt; calculateArea(3.5) &lt;&lt; " చ.సెం.మీ\\n";

    return 0;
}</code></pre>
        </div>
      </div>
    </section>

    <!-- SECTION 8 -->
    <section>
      <h2 class="section-title"><span class="num">8</span> హార్డ్‌వేర్ & అసెంబ్లీ సీక్రెట్: C++ నేమ్ మ్యాంగ్లింగ్ (Name Mangling)</h2>
      <p>
        C భాషలో ఫంక్షన్ ఓవర్‌లోడింగ్ ఎందుకు లేదు? C++ లో ఇది ఎలా సాధ్యమైంది? దీని వెనుక ఉన్న అంతర్గత కంపైలర్ ఇంజనీరింగ్ అద్భుతమే <strong>నేమ్ మ్యాంగ్లింగ్ (Name Mangling లేదా Symbol Decoration)</strong>.
      </p>

      <div style="background:var(--bg2); border:1px solid var(--border); border-radius:10px; padding:18px; margin:16px 0;">
        <h4 style="margin:0 0 10px 0; color:#10b981; font-size:15px;">⚙️ అసెంబ్లీలో ఫంక్షన్ పేర్లు ఎలా రూపాంతరం చెందుతాయి?</h4>
        <p style="font-size:13.5px; color:var(--text); line-height:1.7; margin:0;">
          కంపైలర్ అసెంబ్లీ కోడ్ ఉత్పత్తి చేసేటప్పుడు, ఫంక్షన్ పేరుతో పాటు దాని పారామీటర్ల టైప్స్ అన్నింటినీ కలిపి ఒక ప్రత్యేకమైన యూనిక్ సింబల్ పేరును సృష్టిస్తుంది:
        </p>
        <div style="font-family:'JetBrains Mono',monospace; font-size:13px; background:var(--bg3); padding:10px 14px; border-radius:6px; margin:10px 0; color:#10b981;">
          calculateArea(int)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;➔ _Z13calculateAreai<br>
          calculateArea(int, int)&nbsp;&nbsp;➔ _Z13calculateAreaii<br>
          calculateArea(double)&nbsp;&nbsp;&nbsp;&nbsp;➔ _Z13calculateAread
        </div>
        <p style="font-size:13.5px; color:var(--text2); line-height:1.7; margin:0;">
          లింకర్ (Linker) స్థాయిలో అసెంబ్లీకి మూడు వేర్వేరు ఫంక్షన్ పేర్లు కనిపిస్తాయి కాబట్టి ఎటువంటి వివాదం తలెత్తదు! ఇక పాత C కోడ్‌ను C++ తో లింక్ చేయాలంటే మ్యాంగ్లింగ్ కాకుండా ఉండటానికి <code>extern "C" { ... }</code> అని రాస్తారు.
        </p>
      </div>
    </section>

    <!-- SECTION 9 -->
    <section>
      <h2 class="section-title"><span class="num">9</span> ఇన్‌లైన్ ఫంక్షన్స్ (Inline Functions & inline Keyword)</h2>
      <p>
        సాధారణంగా ఒక ఫంక్షన్‌ను కాల్ చేసినప్పుడు CPU లో కొన్ని పనులు జరగాలి: ప్రస్తుత రిజిస్టర్లను స్టాక్‌పై భద్రపరచడం, ఆర్గ్యుమెంట్లను స్టాక్‌కు నెట్టడం, ఫంక్షన్ ఉన్న మెమరీ లొకేషన్‌కు జంప్ చేయడం, కోడ్ పూర్తయిన తర్వాత తిరిగి మెయిన్‌కు జంప్ చేయడం. కేవలం <code>return a + b;</code> లాంటి చిన్న లైన్ల కోసం ఈ జంప్స్ అన్నీ చేయడం వల్ల రన్‌టైమ్ ఆలస్యం (Function Call Overhead) జరుగుతుంది.
      </p>
      <p>
        ఫంక్షన్ డెఫినిషన్ ముందు <strong><code>inline</code></strong> కీవర్డ్ పెడితే, కంపైలర్ ఫంక్షన్ కాల్ బదులుగా నేరుగా ఆ కోడ్‌ను పిలిచిన చోటే పేస్ట్ చేస్తుంది! దీనివల్ల జంప్స్ లేకపోవడం వల్ల ఎగ్జిక్యూషన్ సూపర్ ఫాస్ట్ గా మారుతుంది.
      </p>

      <pre style="background:var(--bg3); padding:12px 16px; border-radius:8px; font-family:'JetBrains Mono',monospace; font-size:13.5px; color:#10b981; border-left:4px solid #10b981;"><code>inline int getMaximum(int a, int b) {
    return (a &gt; b) ? a : b; // కాల్ ఓవర్‌హెడ్ లేకుండా నేరుగా ఇన్-లైన్ గా మారిపోతుంది!
}</code></pre>
    </section>

    <!-- SECTION 10 -->
    <section>
      <h2 class="section-title"><span class="num">10</span> Modern C++11/C++20: Trailing Return Types & constexpr Functions</h2>
      <p>
        Modern C++ లో ఫంక్షన్ డిజైన్‌ను మరింత ఆధునీకరించడానికి సరికొత్త సింటాక్స్ ప్రవేశపెట్టబడింది:
      </p>
      <ul>
        <li><strong>Trailing Return Types (<code>auto -&gt; Type</code>):</strong> రిటర్న్ టైప్‌ను ముందు కాకుండా బాణపు గుర్తుతో చివర పెట్టడం: <code>auto calculate(double x) -&gt; double</code>. ఇది సంక్లిష్టమైన టెంప్లేట్ మెటాప్రోగ్రామింగ్‌లో ఆటోమేటిక్ టైప్ డిడక్షన్ కోసం చాలా ఉపయోగపడుతుంది.</li>
        <li><strong><code>constexpr</code> Functions:</strong> ఇన్పుట్ విలువలు కంపైల్-టైమ్ స్థిరరాశులు అయితే, ఆ ఫంక్షన్‌ను ప్రోగ్రామ్ రన్ అవ్వకముందే, కంపైలేషన్ సమయంలోనే లెక్కించి స్థిర సంఖ్యగా మార్చేస్తుంది (Zero Runtime Cost)!</li>
      </ul>
    </section>

    <!-- SECTION 11 -->
    <section>
      <h2 class="section-title"><span class="num">11</span> స్టాక్ మెమరీ, కాల్ స్టాక్ (Call Stack) & ఫంక్షన్ కాల్ లైఫ్‌సైకిల్</h2>
      <p>
        ప్రతిసారి మీ ప్రోగ్రామ్‌లో ఒక ఫంక్షన్ కాల్ జరిగినప్పుడు, RAM మెమరీలోని <strong>స్టాక్ సెగ్మెంట్ (Stack Segment)</strong> లో ఒక కొత్త <strong>స్టాక్ ఫ్రేమ్ (Stack Frame / Activation Record)</strong> కేటాయించబడుతుంది:
      </p>

      <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px 20px; font-family:'JetBrains Mono',monospace; font-size:13px; line-height:1.7; color:var(--text); margin:16px 0;">
        ┌──────────────────────────────────────────────┐<br>
        │ &nbsp;రిటర్న్ అడ్రస్ (ఫంక్షన్ ముగిసాక ఎక్కడికి వెళ్ళాలి?) │<br>
        ├──────────────────────────────────────────────┤<br>
        │ &nbsp;ఫంక్షన్ పారామీటర్లు (Function Arguments)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│<br>
        ├──────────────────────────────────────────────┤<br>
        │ &nbsp;లోకల్ వేరియబుల్స్ (Local Scope Variables)&nbsp;&nbsp;&nbsp;│<br>
        └──────────────────────────────────────────────┘
      </div>

      <p style="font-size:13.5px; color:var(--text);">
        ఫంక్షన్ ముగియగానే (Return) ఆ స్టాక్ ఫ్రేమ్ తక్షణమే ఆటోమేటిక్‌గా నాశనమైపోతుంది (Popped from Stack). ఒకవేళ రికర్సివ్ ఫంక్షన్ ఆగకుండా తిరుగుతూ ఉంటే స్టాక్ మెమరీ నిండిపోయి <strong>Stack Overflow</strong> ఎర్రర్ వస్తుంది.
      </p>
    </section>

    <!-- SECTION 12 -->
    <section>
      <h2 class="section-title"><span class="num">12</span> సాధారణ బిగినర్ తప్పులు, బగ్స్ & అంబిగ్యుటీ ట్రాప్స్</h2>
      <div style="display:flex; flex-direction:column; gap:16px; margin:18px 0;">
        <!-- DANGEROUS ERROR 1 -->
        <div style="background:var(--bg2); border:1px solid rgba(239,68,68,0.4); border-left:4px solid #ef4444; border-radius:8px; padding:16px 20px;">
          <div style="font-weight:700; color:#ef4444; font-size:14.5px;">❌ Trap 1: లోకల్ వేరియబుల్ యొక్క రెఫరెన్స్‌ను రిటర్న్ చేసే ఘోరమైన బగ్ (Dangling Reference)</div>
          <pre style="background:var(--bg3); padding:8px 12px; border-radius:4px; font-size:13px; color:#ef4444; margin:8px 0;"><code>int&amp; getNumber() {
    int localVal = 100;
    return localVal; // ⚠️ ఘోరమైన తప్పు! ఫంక్షన్ ముగియగానే localVal నాశనమైపోతుంది!
} // బయట ఆ రెఫరెన్స్‌ను వాడితే క్రాష్ లేదా గార్బేజ్ వాల్యూ వస్తుంది (Dangling Reference)!</code></pre>
        </div>

        <!-- AMBIGUOUS OVERLOAD -->
        <div style="background:var(--bg2); border:1px solid rgba(239,68,68,0.4); border-left:4px solid #ef4444; border-radius:8px; padding:16px 20px;">
          <div style="font-weight:700; color:#ef4444; font-size:14.5px;">❌ Trap 2: Default Arguments మరియు Overloading మధ్య కంపైలర్ అంబిగ్యుటీ</div>
          <pre style="background:var(--bg3); padding:8px 12px; border-radius:4px; font-size:13px; color:#ef4444; margin:8px 0;"><code>void print(int x);
void print(int x, int y = 20);

// main లో:
print(5); // ❌ Compile Error: call of overloaded 'print(5)' is ambiguous!
// కంపైలర్‌కు మొదటి ఫంక్షనా లేక రెండవ దాంట్లో డిఫాల్ట్ విలువతో పిలవాలా అర్థం కాదు!</code></pre>
        </div>
      </div>
    </section>

    <!-- SECTION 13 -->
    <section>
      <h2 class="section-title"><span class="num">13</span> రియల్-వరల్డ్ ప్రాక్టీస్ ప్రాజెక్ట్: "Enterprise Corporate Payroll & Salary Taxation Engine"</h2>
      <p>
        ఈ అధ్యాయంలో నేర్చుకున్న ఫంక్షన్ కాన్సెప్ట్స్ — <strong>Function Overloading</strong>, <strong>Pass by Const Reference</strong>, <strong>Pass by Reference</strong>, <strong>Default Arguments</strong>, మరియు <strong>Inline Functions</strong> అన్నింటినీ సమన్వయం చేస్తూ — పూర్తి స్థాయి <strong>"Enterprise Corporate Payroll & Salary Engine"</strong> ప్రాజెక్ట్‌ను రన్ చేద్దాం:
      </p>

      <div style="margin:20px 0 16px;">
        <div style="font-size:13.5px; font-weight:700; color:#10b981; margin-bottom:6px;">💻 Complete Masterclass Practice Project: Corporate Payroll Engine</div>
        <div class="code-block">
          <div class="code-block-header">
            <span class="lang-tag">C++17 / C++20 Complete Project</span>
            <div class="code-actions">
              <button class="copy-btn" onclick="copyCode(this)">📋 Copy</button>
              <button class="try-btn" onclick="runCodeInCompiler(this)">▶ Run in Compiler</button>
            </div>
          </div>
          <pre><code>#include &lt;iostream&gt;
#include &lt;string&gt;
#include &lt;iomanip&gt;

// ఉద్యోగి వివరాల నిర్మాణం
struct EmployeeRecord {
    std::string empId;
    std::string name;
    std::string role;
    double baseSalary;
};

// 1. ఇన్‌లైన్ ఫాస్ట్ హెల్పర్స్: PF మరియు మెడికల్ ఇన్సూరెన్స్ డిడక్షన్స్
inline double getProvidentFund(double baseSalary) {
    return baseSalary * 0.12; // 12% PF కంట్రిబ్యూషన్
}

// 2. ఫంక్షన్ ఓవర్‌లోడింగ్ 1: పూర్తి-సమయ శాశ్వత ఉద్యోగుల జీతం (Full-Time Employee)
// Default Argument: వార్షిక పనితీరు బోనస్ డిఫాల్ట్ 8.0%
double calculateSalary(const EmployeeRecord&amp; emp, double performanceBonusPercent = 8.0) {
    double bonusAmount = (emp.baseSalary * performanceBonusPercent) / 100.0;
    double pfDeduction = getProvidentFund(emp.baseSalary);
    double professionalTax = 200.00; // స్థిర వృత్తి పన్ను
    return (emp.baseSalary + bonusAmount) - (pfDeduction + professionalTax);
}

// 3. ఫంక్షన్ ఓవర్‌లోడింగ్ 2: గంటల వారీ కాంట్రాక్ట్ ఉద్యోగుల జీతం (Contractor by Hourly Rate)
double calculateSalary(double hourlyRate, int hoursWorked) {
    double regularPay = hourlyRate * hoursWorked;
    double contractorTds = regularPay * 0.10; // 10% TDS డిడక్షన్
    return regularPay - contractorTds;
}

// 4. ఫంక్షన్ ఓవర్‌లోడింగ్ 3: ప్రాజెక్ట్ ఆధారిత ఫ్రీలాన్సర్స్ (Project Milestone Flat Payout)
double calculateSalary(double projectMilestoneFee) {
    double gstDeduction = projectMilestoneFee * 0.05; // 5% విత్‌హోల్డింగ్
    return projectMilestoneFee - gstDeduction;
}

// 5. Pass by Reference: వార్షిక ప్రమోషన్ ఇంక్రిమెంట్ అప్లై చేయడం
void applyPromotionIncrement(EmployeeRecord&amp; emp, double hikePercent) {
    emp.baseSalary += (emp.baseSalary * hikePercent) / 100.0;
    emp.role = "సీనియర్ " + emp.role;
}

int main() {
    std::cout &lt;&lt; std::fixed &lt;&lt; std::setprecision(2);
    std::cout &lt;&lt; "========================================================================================\\n";
    std::cout &lt;&lt; "       🏢 TATA ENTERPRISE GLOBAL PAYROLL DISBURSEMENT & TAXATION ENGINE                 \\n";
    std::cout &lt;&lt; "========================================================================================\\n";

    EmployeeRecord devEmp = {"TCS-8921", "శ్రీనివాస మూర్తి (Srinivas Murthy)", "సాఫ్ట్‌వేర్ ఇంజనీర్", 85000.00};

    // 1. ఫుల్-టైమ్ ఉద్యోగి ప్రాసెసింగ్ (Default bonus)
    double netFullTimePay = calculateSalary(devEmp);
    std::cout &lt;&lt; "1. ఫుల్-టైమ్ ఉద్యోగి: " &lt;&lt; devEmp.name &lt;&lt; " (" &lt;&lt; devEmp.role &lt;&lt; ")\\n";
    std::cout &lt;&lt; "   బేసిక్ జీతం        : ₹ " &lt;&lt; devEmp.baseSalary &lt;&lt; '\\n';
    std::cout &lt;&lt; "   నికర చెల్లింపు (Net) : ₹ " &lt;&lt; netFullTimePay &lt;&lt; " (PF &amp; బోనస్ సర్దుబాటు తర్వాత)\\n";

    // 2. కాంట్రాక్టర్ ప్రాసెసింగ్ (Overloaded Function 2)
    double netContractorPay = calculateSalary(1250.00, 160); // ₹1250/hour, 160 hours
    std::cout &lt;&lt; "\\n2. క్లౌడ్ ఆర్కిటెక్ట్ కాంట్రాక్టర్ (160 గంటలు @ ₹1250/hr):\\n";
    std::cout &lt;&lt; "   నికర చెల్లింపు (Net) : ₹ " &lt;&lt; netContractorPay &lt;&lt; " (10% TDS తీసివేత తర్వాత)\\n";

    // 3. ఫ్రీలాన్సర్ ప్రాసెసింగ్ (Overloaded Function 3)
    double netFreelancePay = calculateSalary(150000.00); // ప్రాజెక్ట్ మైల్‌స్టోన్ ఫీజు
    std::cout &lt;&lt; "\\n3. UI/UX డిజైన్ ఫ్రీలాన్సర్ (మొబైల్ యాప్ మైల్‌స్టోన్):\\n";
    std::cout &lt;&lt; "   నికర చెల్లింపు (Net) : ₹ " &lt;&lt; netFreelancePay &lt;&lt; " (విత్‌హోల్డింగ్ తర్వాత)\\n";

    // 4. Pass by Reference ప్రభావం: ప్రమోషన్ ప్రక్రియ
    std::cout &lt;&lt; "\\n----------------------------------------------------------------------------------------\\n";
    std::cout &lt;&lt; "🎉 [వార్షిక ప్రమోషన్ ప్రక్రియ - Pass by Reference ప్రత్యక్ష డెమో]:\\n";
    applyPromotionIncrement(devEmp, 15.0); // 15% శాలరీ పెంపు
    std::cout &lt;&lt; "హోదా అప్‌డేట్      : " &lt;&lt; devEmp.role &lt;&lt; '\\n';
    std::cout &lt;&lt; "కొత్త బేసిక్ జీతం    : ₹ " &lt;&lt; devEmp.baseSalary &lt;&lt; '\\n';
    std::cout &lt;&lt; "సవరించిన నికర జీతం : ₹ " &lt;&lt; calculateSalary(devEmp, 12.0) &lt;&lt; " (12% హై-పర్ఫార్మెన్స్ బోనస్‌తో)\\n";

    std::cout &lt;&lt; "========================================================================================\\n";
    return 0;
}</code></pre>
        </div>
      </div>
    </section>

    <!-- QUIZ SECTION (5 DETAILS QUESTIONS) -->
    <section style="margin-top:40px;">
      <h2 class="section-title"><span class="num">❓</span> ఇంటర్వ్యూ & పరీక్షల క్విజ్ (Knowledge Check)</h2>
      
      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px 18px; margin-bottom:12px; cursor:pointer;">
        <summary style="font-weight:700; color:#10b981; font-size:14.5px;">ప్రశ్న 1: C++ లో కేవలం Return Type మాత్రమే వేరుగా ఉంటే ఫంక్షన్ ఓవర్‌లోడింగ్ ఎందుకు సాధ్యం కాదు?</summary>
        <div style="font-size:13.5px; color:var(--text); margin-top:10px; line-height:1.7;">
          <strong>సమాధానం:</strong> కంపైలర్ ఫంక్షన్ కాల్‌ను పరిశీలించేటప్పుడు కాలర్ ఇచ్చే ఆర్గ్యుమెంట్ల టైప్స్ మరియు సంఖ్యను మాత్రమే చూస్తుంది. ఉదాహరణకు <code>func()</code> అని పిలిచి, దాని రిటర్న్ వాల్యూను ఏ వేరియబుల్‌కూ అసైన్ చేయకుండా వదిలేస్తే (కేవలం <code>func();</code> అని రాస్తే), కంపైలర్‌కు <code>int func()</code> ని పిలవాలో లేక <code>double func()</code> ని పిలవాలో నిర్ణయించడం అసాధ్యం. ఈ అంబిగ్యుటీ (Ambiguity) కారణంగా C++ కేవలం రిటర్న్ టైప్ పై ఓవర్‌లోడింగ్‌ను అనుమతించదు.
        </div>
      </details>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px 18px; margin-bottom:12px; cursor:pointer;">
        <summary style="font-weight:700; color:#10b981; font-size:14.5px;">ప్రశ్న 2: Modern C++ లో 'const Type&amp;' పారామీటర్ పాసింగ్‌ను ఎందుకు గోల్డెన్ ప్రామాణికంగా పరిగణిస్తారు?</summary>
        <div style="font-size:13.5px; color:var(--text); margin-top:10px; line-height:1.7;">
          <strong>సమాధానం:</strong> ఇది రెండు అద్భుతమైన ప్రయోజనాలను ఏకకాలంలో అందిస్తుంది: 1. రెఫరెన్స్ (<code>&amp;</code>) ఉండటం వల్ల అసలు ఆబ్జెక్ట్ కాపీ అవ్వదు (Zero Copy Performance). 2. <code>const</code> ఉండటం వల్ల ఫంక్షన్ లోపల డేటా అనుకోకుండా మారకుండా రక్షణ లభిస్తుంది (Read-Only Safety) మరియు ఇది లిటరల్స్ లేదా టెంపరరీ ఆబ్జెక్టులను కూడా పారామీటర్లుగా స్వీకరించగలదు.
        </div>
      </details>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px 18px; margin-bottom:12px; cursor:pointer;">
        <summary style="font-weight:700; color:#10b981; font-size:14.5px;">ప్రశ్న 3: నేమ్ మ్యాంగ్లింగ్ (Name Mangling) అంటే ఏమిటి? C++ లో ఇది ఎందుకు జరుగుతుంది?</summary>
        <div style="font-size:13.5px; color:var(--text); margin-top:10px; line-height:1.7;">
          <strong>సమాధానం:</strong> C++ లో ఫంక్షన్ ఓవర్‌లోడింగ్ సాధ్యం కావడానికి, కంపైలర్ అసెంబ్లీ కోడ్ తయారుచేసేటప్పుడు ఫంక్షన్ పేరుతో పాటు దాని పారామీటర్ల సమాచారాన్ని మిళితం చేసి ఒక ప్రత్యేకమైన పేరును (Mangled Name) సృష్టిస్తుంది. దీనివల్ల ఒకే పేరు గల బహుళ ఫంక్షన్లకు లింకర్ స్థాయిలో వేర్వేరు పేర్లు లభించి సరిగ్గా లింక్ అవుతాయి.
        </div>
      </details>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px 18px; margin-bottom:12px; cursor:pointer;">
        <summary style="font-weight:700; color:#10b981; font-size:14.5px;">ప్రశ్న 4: ఇన్‌లైన్ ఫంక్షన్ (inline) CPU పెర్ఫార్మెన్స్‌ను ఎలా మెరుగుపరుస్తుంది? ఎప్పుడు ఇన్-లైన్ చేయకూడదు?</summary>
        <div style="font-size:13.5px; color:var(--text); margin-top:10px; line-height:1.7;">
          <strong>సమాధానం:</strong> <code>inline</code> ఫంక్షన్‌ను పిలిచినప్పుడు ఫంక్షన్ జంప్ మరియు స్టాక్ ఫ్రేమ్ క్రియేషన్ లేకుండా, నేరుగా ఆ కోడ్‌నే అక్కడ రీప్లేస్ చేస్తుంది, దీనివల్ల ఫంక్షన్ కాల్ ఓవర్‌హెడ్ తప్పుతుంది. అయితే చాలా పెద్ద ఫంక్షన్లను లేదా లూప్‌లు ఉన్నవాటిని ఇన్-లైన్ చేస్తే ఎగ్జిక్యూటబుల్ ఫైల్ సైజు విపరీతంగా పెరిగిపోయి (Code Bloat) CPU ఇన్‌స్ట్రక్షన్ క్యాష్ మిస్‌లకు దారితీస్తుంది.
        </div>
      </details>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px 18px; margin-bottom:12px; cursor:pointer;">
        <summary style="font-weight:700; color:#10b981; font-size:14.5px;">ప్రశ్న 5: లోకల్ వేరియబుల్‌కు రెఫరెన్స్ (int&amp;) రిటర్న్ చేస్తే ఏమవుతుంది? దానిని ఎలా సరిచేయాలి?</summary>
        <div style="font-size:13.5px; color:var(--text); margin-top:10px; line-height:1.7;">
          <strong>సమాధానం:</strong> ఫంక్షన్ ముగియగానే దాని లోకల్ వేరియబుల్స్ ఉన్న స్టాక్ ఫ్రేమ్ నాశనమైపోతుంది. నాశనమైన మెమరీ లొకేషన్‌కు రెఫరెన్స్ ఇవ్వడాన్ని <strong>Dangling Reference</strong> అంటారు. బయట ఆ వేరియబుల్‌ను రీడ్ చేస్తే గార్బేజ్ వాల్యూ లేదా సెగ్మెంటేషన్ ఫాల్ట్ క్రాష్ వస్తుంది. దీనిని నివారించడానికి సాధారణ విలువను (Pass by Value) రిటర్న్ చేయాలి లేదా డైనమిక్ మెమరీ/స్టాటిక్ వేరియబుల్ వాడాలి.
        </div>
      </details>
    </section>

    <!-- LESSON NAVIGATION FOOTER -->
    <div style="display:flex; justify-content:space-between; align-items:center; margin-top:40px; padding:20px; background:var(--bg2); border:1px solid var(--border); border-radius:8px;">
      <div>
        <a href="/blog-cpp/08-cpp-break-continue.html" style="color:#10b981; text-decoration:none; font-weight:600;">
          ← మునుపటి అధ్యాయం: Chapter 08: break, continue & లూప్ కంట్రోల్
        </a>
      </div>
      <div>
        <a href="/blog-cpp/10-cpp-arrays-and-strings.html" style="color:#10b981; text-decoration:none; font-weight:600;">
          తదుపరి అధ్యాయం: Chapter 10: అర్రేలు & std::string →
        </a>
      </div>
    </div>

  </main>
</div>

<script src="/site-nav.js" defer></script>

<script>
  function openInteractiveCompiler() {
    const projectCode = \`#include <iostream>
#include <string>
#include <iomanip>

struct EmployeeRecord {
    std::string empId;
    std::string name;
    std::string role;
    double baseSalary;
};

inline double getProvidentFund(double baseSalary) {
    return baseSalary * 0.12;
}

double calculateSalary(const EmployeeRecord& emp, double performanceBonusPercent = 8.0) {
    double bonusAmount = (emp.baseSalary * performanceBonusPercent) / 100.0;
    double pfDeduction = getProvidentFund(emp.baseSalary);
    double professionalTax = 200.00;
    return (emp.baseSalary + bonusAmount) - (pfDeduction + professionalTax);
}

double calculateSalary(double hourlyRate, int hoursWorked) {
    double regularPay = hourlyRate * hoursWorked;
    double contractorTds = regularPay * 0.10;
    return regularPay - contractorTds;
}

double calculateSalary(double projectMilestoneFee) {
    double gstDeduction = projectMilestoneFee * 0.05;
    return projectMilestoneFee - gstDeduction;
}

void applyPromotionIncrement(EmployeeRecord& emp, double hikePercent) {
    emp.baseSalary += (emp.baseSalary * hikePercent) / 100.0;
    emp.role = "సీనియర్ " + emp.role;
}

int main() {
    std::cout << std::fixed << std::setprecision(2);
    std::cout << "========================================================================================\\\\n";
    std::cout << "       🏢 TATA ENTERPRISE GLOBAL PAYROLL DISBURSEMENT & TAXATION ENGINE                 \\\\n";
    std::cout << "========================================================================================\\\\n";

    EmployeeRecord devEmp = {"TCS-8921", "శ్రీనివాస మూర్తి (Srinivas Murthy)", "సాఫ్ట్‌వేర్ ఇంజనీర్", 85000.00};

    double netFullTimePay = calculateSalary(devEmp);
    std::cout << "1. ఫుల్-టైమ్ ఉద్యోగి: " << devEmp.name << " (" << devEmp.role << ")\\\\n";
    std::cout << "   బేసిక్ జీతం        : ₹ " << devEmp.baseSalary << '\\\\n';
    std::cout << "   నికర చెల్లింపు (Net) : ₹ " << netFullTimePay << " (PF & బోనస్ సర్దుబాటు తర్వాత)\\\\n";

    double netContractorPay = calculateSalary(1250.00, 160);
    std::cout << "\\\\n2. క్లౌడ్ ఆర్కిటెక్ట్ కాంట్రాక్టర్ (160 గంటలు @ ₹1250/hr):\\\\n";
    std::cout << "   నికర చెల్లింపు (Net) : ₹ " << netContractorPay << " (10% TDS తీసివేత తర్వాత)\\\\n";

    double netFreelancePay = calculateSalary(150000.00);
    std::cout << "\\\\n3. UI/UX డిజైన్ ఫ్రీలాన్సర్ (మొబైల్ యాప్ మైల్‌స్టోన్):\\\\n";
    std::cout << "   నికర చెల్లింపు (Net) : ₹ " << netFreelancePay << " (విత్‌హోల్డింగ్ తర్వాత)\\\\n";

    std::cout << "\\\\n----------------------------------------------------------------------------------------\\\\n";
    std::cout << "🎉 [వార్షిక ప్రమోషన్ ప్రక్రియ - Pass by Reference ప్రత్యక్ష డెమో]:\\\\n";
    applyPromotionIncrement(devEmp, 15.0);
    std::cout << "హోదా అప్‌డేట్      : " << devEmp.role << '\\\\n';
    std::cout << "కొత్త బేసిక్ జీతం    : ₹ " << devEmp.baseSalary << '\\\\n';
    std::cout << "సవరించిన నికర జీతం : ₹ " << calculateSalary(devEmp, 12.0) << " (12% హై-పర్ఫార్మెన్స్ బోనస్‌తో)\\\\n";

    std::cout << "========================================================================================\\\\n";
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
fs.writeFileSync(outputPath, chapter09Content, 'utf8');
console.log('✅ Successfully generated deep high-value C++ Chapter 09!');
console.log('Target file:', currentLesson.file);
console.log('Target file size:', chapter09Content.length, 'characters');

