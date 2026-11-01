const fs = require('fs');
const path = require('path');
const { LESSONS, buildSidebar } = require('./cpp_curriculum_data.js');

const currentLesson = LESSONS[5]; // Chapter 6
const sidebarHtml = buildSidebar(6);

const chapter06Content = `<!DOCTYPE html>
<html class="light-theme" lang="te">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${currentLesson.title} — Modern C++ Tutorial | Our Compiler</title>
  <meta name="description" content="C++ switch స్టేట్‌మెంట్ & Fall-through సమగ్ర మాస్టర్‌క్లాస్ తెలుగులో: Jump Tables అంతర్గత పనితీరు, [[fallthrough]] అట్రిబ్యూట్ (C++17), switch with initializer (C++17), Scoped Enums (enum class), మరియు Enterprise ATM State Engine ప్రాజెక్ట్." />
  <meta name="keywords" content="c++ switch case telugu, c++ fallthrough attribute, c++ jump table, switch with initializer c++17, scoped enum switch, c++ control flow, learn c++ in telugu, our compiler" />
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
    "headline": "${currentLesson.title} (Mastering C++ switch Statement, Jump Tables & Fall-through in Telugu)",
    "description": "C++ switch స్టేట్‌మెంట్ పూర్తి గైడ్: Jump Tables, [[fallthrough]], C++17 switch with initializer, Scoped Enums, మరియు Enterprise ATM State Engine ప్రాజెక్ట్.",
    "articleSection": "Phase 2: Control Flow & Loops",
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
    "datePublished": "2026-02-06",
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
        'likely','unlikely','fallthrough'
      ];
      const kwRegex = new RegExp('\\\\b(' + kwList.join('|') + ')\\\\b', 'g');
      code = code.replace(kwRegex, m => pushToken('kw', m));

      const fnList = [
        'std','cout','cin','endl','cerr','clog','string','vector','map','set','pair','main',
        'printf','scanf','getline','numeric_limits','setw','setprecision','fixed','setfill',
        'left','right','boolalpha','noboolalpha'
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
      <span>Phase 2: Control Flow</span> &gt;
      <span style="color:var(--text); font-weight:600;">Chapter 06: switch స్టేట్‌మెంట్ & Fall-through</span>
    </nav>

    <!-- LESSON TITLE & META -->
    <h1 style="font-size:32px; font-weight:800; line-height:1.25; margin-bottom:12px; color:var(--text);">
      ${currentLesson.title}
    </h1>
    <div style="display:flex; gap:16px; align-items:center; font-size:13px; color:var(--text2); margin-bottom:24px; padding-bottom:16px; border-bottom:1px solid var(--border);">
      <span>📅 తాజా నవీకరణ: నవంబర్ 2026</span>
      <span>⏱️ చదివే సమయం: 26 నిమిషాలు</span>
      <span>🎯 స్థాయి: బిగినర్ నుండి అడ్వాన్స్‌డ్ (Modern C++17/C++20)</span>
      <span>⭐ కవర్ అయ్యే టెక్నాలజీలు: Jump Tables, [[fallthrough]], Scoped Enums, switch-init</span>
    </div>

    <!-- SOFT IVORY INTRO BOX -->
    <div class="intro-box">
      <h3>🌟 ఈ అధ్యాయంలో మీరు ఏమి నేర్చుకోబోతున్నారు?</h3>
      <p>
        మునుపటి అధ్యాయంలో మనం <code>if - else if - else</code> లాడర్ ద్వారా వివిధ నిబంధనలను ఎలా పరీక్షించవచ్చో నేర్చుకున్నాం. కానీ ఒకే వేరియబుల్ యొక్క బహుళ నిర్దిష్ట స్థిర విలువల (Fixed Constants or Enums) ఆధారంగా నిర్ణయాలు తీసుకోవాల్సి వచ్చినప్పుడు, పది పన్నెండు <code>else if</code> లు రాయడం కోడ్‌ను సంక్లిష్టంగా మార్చడమే కాకుండా, పెర్ఫార్మెన్స్‌ను తగ్గిస్తుంది.
      </p>
      <p>
        ఇటువంటి పరిస్థితులలో C++ మనకు అందించే అత్యంత వేగవంతమైన, క్లీన్ కంట్రోల్ స్ట్రక్చర్ <strong><code>switch</code> స్టేట్‌మెంట్</strong>. ఈ సమగ్ర మాస్టర్‌క్లాస్‌లో మనం:
      </p>
      <ul>
        <li><code>switch-case-break-default</code> సింటాక్స్ మరియు ఎగ్జిక్యూషన్ ఫ్లో.</li>
        <li>హార్డ్‌వేర్ & అసెంబ్లీ స్థాయిలో <strong>Jump Tables (O(1) Direct Dispatch)</strong> ఎలా పనిచేస్తాయి?</li>
        <li>సాంప్రదాయ <strong>Fall-through</strong> ప్రవర్తన మరియు ఆధునిక C++17 <strong><code>[[fallthrough]]</code> అట్రిబ్యూట్</strong>.</li>
        <li>C++17 <strong>switch with Initializer</strong> ద్వారా వేరియబుల్ స్కోప్ ఐసోలేషన్.</li>
        <li>Modern C++ లో <strong>Scoped Enums (<code>enum class</code>)</strong> తో టైప్-సేఫ్ స్టేట్ మెషిన్ల నిర్మాణం.</li>
        <li>బిగినర్స్ ఎదుర్కొనే <em>"Crosses initialization of variable"</em> కంపైలర్ ఎర్రర్ పరిష్కారం.</li>
        <li>చివరిగా బ్యాంకింగ్ రంగానికి చెందిన పూర్తి స్థాయి <strong>"Enterprise ATM Transaction & State Engine"</strong> ప్రాజెక్ట్ లైవ్ రన్!</li>
      </ul>
    </div>

    <!-- SECTION 1 -->
    <section>
      <h2 class="section-title"><span class="num">1</span> మల్టీ-పాత్ బ్రాంచింగ్ & switch స్టేట్‌మెంట్ అవసరం (Why switch?)</h2>
      <p>
        నిజ జీవితంలో ఒక హోటల్ మెనూ కార్డ్, టీవీ రిమోట్ కంట్రోలర్, లేదా ఎటిఎమ్ మెషీన్ మెనూ వంటి అప్లికేషన్లను గమనించండి. యూజర్ 1 నొక్కితే బ్యాలెన్స్ ఎంక్వైరీ, 2 నొక్కితే క్యాష్ విత్‌డ్రాయల్, 3 నొక్కితే పిన్ చేంజ్ జరగాలి. దీనిని <code>if-else if-else</code> తో రాస్తే:
      </p>
      <div style="background:var(--bg3); padding:12px 16px; border-radius:6px; font-family:'JetBrains Mono',monospace; font-size:13px; color:var(--text); margin:12px 0;">
        if (choice == 1) { ... }<br>
        else if (choice == 2) { ... }<br>
        else if (choice == 3) { ... }<br>
        else if (choice == 4) { ... }<br>
        // ఇలా 10 కండిషన్లు ఉంటే 10వ చాయిస్ కోసం CPU మొదటి 9 కండిషన్లను వరుసగా తనిఖీ చేయాల్సి వస్తుంది (O(N) Complexity)!
      </div>
      <p>
        ఇలాంటి పరిస్థితులలో <strong><code>switch</code> స్టేట్‌మెంట్</strong> ఒక మ్యాజిక్ లాంటిది. ఇది ఇన్పుట్ విలువ ఆధారంగా మధ్యలోని అన్నింటినీ స్కిప్ చేసి నేరుగా సంబంధిత కోడ్ బ్లాక్‌కు ఒక్క క్షణంలో చేరుకుంటుంది.
      </p>

      <div class="card" style="background:var(--bg2); border-left:4px solid #10b981; border-radius:8px; padding:16px 20px; margin:16px 0;">
        <h4 style="margin:0 0 8px 0; color:#10b981; font-size:15px;">📜 switch యొక్క ప్రాథమిక నిబంధన (Integral Expression Rule)</h4>
        <p style="font-size:13.5px; color:var(--text); line-height:1.7; margin:0;">
          C++ లో <code>switch</code> ఎక్స్‌ప్రెషన్ మరియు ప్రతి <code>case</code> లేబుల్ విలువలు ఖచ్చితంగా <strong>ఇంటిగ్రల్ టైప్ (Integral Types)</strong> లేదా ఎన్యూమరేషన్ (<code>enum</code> / <code>enum class</code>) అయి ఉండాలి! అంటే: <code>int</code>, <code>char</code>, <code>short</code>, <code>long</code>, <code>bool</code> అనుమతించబడతాయి. కానీ <code>float</code>, <code>double</code> లేదా <code>std::string</code> లను <code>case</code> లేబుల్స్‌గా వాడటం C++ స్టాండర్డ్ ప్రకారం నిషేధం.
        </p>
      </div>

      <div style="margin:20px 0 16px;">
        <div style="font-size:13.5px; font-weight:700; color:#10b981; margin-bottom:6px;">💻 Example 1: Basic switch Syntax (డేస్ ఆఫ్ ది వీక్ ప్రింటర్)</div>
        <div class="code-block">
          <div class="code-block-header">
            <span class="lang-tag">C++17</span>
            <div class="code-actions">
              <button class="copy-btn" onclick="copyCode(this)">📋 Copy</button>
              <button class="try-btn" onclick="runCodeInCompiler(this)">▶ Run in Compiler</button>
            </div>
          </div>
          <pre><code>#include &lt;iostream&gt;

int main() {
    int dayNumber = 3;

    std::cout &lt;&lt; "వారం రోజు నంబర్: " &lt;&lt; dayNumber &lt;&lt; "\\nఫలితం: ";

    switch (dayNumber) {
        case 1:
            std::cout &lt;&lt; "సోమవారం (Monday)\\n";
            break;
        case 2:
            std::cout &lt;&lt; "మంగళవారం (Tuesday)\\n";
            break;
        case 3:
            std::cout &lt;&lt; "బుధవారం (Wednesday)\\n";
            break;
        case 4:
            std::cout &lt;&lt; "గురువారం (Thursday)\\n";
            break;
        case 5:
            std::cout &lt;&lt; "శుక్రవారం (Friday)\\n";
            break;
        case 6:
            std::cout &lt;&lt; "శనివారం (Saturday)\\n";
            break;
        case 7:
            std::cout &lt;&lt; "ఆదివారం (Sunday)\\n";
            break;
        default:
            std::cout &lt;&lt; "చెల్లని రోజు సంఖ్య! (1 నుండి 7 మధ్య మాత్రమే ఉండాలి)\\n";
            break;
    }

    return 0;
}</code></pre>
        </div>
      </div>
    </section>

    <!-- SECTION 2 -->
    <section>
      <h2 class="section-title"><span class="num">2</span> హార్డ్‌వేర్ & అసెంబ్లీ ఆర్కిటెక్చర్: The Power of Jump Tables (O(1) Direct Dispatch)</h2>
      <p>
        C++ కంపైలర్ <code>if-else</code> లాడర్ కంటే <code>switch</code> స్టేట్‌మెంట్‌ను ఎంత అద్భుతంగా ఆప్టిమైజ్ చేస్తుందో అర్థం చేసుకోవడం ఒక ప్రొఫెషనల్ సాఫ్ట్‌వేర్ ఆర్కిటెక్ట్‌కు ఎంతో ముఖ్యం.
      </p>
      <p>
        ఒక <code>if-else</code> లాడర్‌లో 20 కండిషన్లు ఉంటే, CPU వరుసగా 20 పోలికలు (20 <code>CMP</code> మరియు <code>JNE</code> అసెంబ్లీ ఇన్స్ట్రక్షన్లు) చేయాల్సి వస్తుంది. దీనివల్ల టైమ్ కాంప్లెక్సిటీ <strong>O(N)</strong> అవుతుంది మరియు CPU బ్రాంచ్ ప్రిడిక్షన్ విఫలమయ్యే అవకాశాలు పెరుగుతాయి.
      </p>

      <div style="background:var(--bg2); border:1px solid var(--border); border-radius:10px; padding:20px; margin:20px 0;">
        <h4 style="margin:0 0 12px 0; color:#10b981; font-size:15px;">⚡ The Jump Table Magic (O(1) Constant Time Execution)</h4>
        <p style="font-size:13.5px; color:var(--text); line-height:1.7; margin:0 0 12px 0;">
          కేస్ లేబుల్స్ సంఖ్య ఎక్కువగా ఉండి, వాటి విలువలు ఒకదానికొకటి దగ్గరగా (Dense Range, ఉదా: 1 నుండి 10 వరకు) ఉన్నప్పుడు, ఆధునిక కంపైలర్లు (GCC, Clang, MSVC) మెమరీ యొక్క రీడ్-ఓన్లీ సెగ్మెంట్ (<code>.rodata</code>) లో <strong>Jump Table</strong> అనే పాయింటర్ల అర్రేను తయారుచేస్తాయి:
        </p>
        <div style="font-family:'JetBrains Mono',monospace; font-size:13px; background:var(--bg3); padding:12px 16px; border-radius:6px; color:#10b981;">
          jump_table = [&amp;case1_addr, &amp;case2_addr, &amp;case3_addr, &amp;case4_addr, ...];<br>
          // CPU అసెంబ్లీ ఇన్స్ట్రక్షన్:<br>
          JMP [jump_table + dayNumber * 8]  ; కేవలం ఒకే ఒక్క ఇన్స్ట్రక్షన్‌తో నేరుగా టార్గెట్ కేస్‌కు జంప్!
        </div>
        <p style="font-size:13.5px; color:var(--text2); line-height:1.7; margin:12px 0 0 0;">
          దీనివల్ల 5 కేసులు ఉన్నా, 500 కేసులు ఉన్నా — CPU తీసుకునే సమయం సరిగ్గా ఒకే ఒక్క మెమరీ రీడ్ సైకిల్ (<strong>O(1) Constant Time</strong>)! ఇది హై-పెర్ఫార్మెన్స్ గేమ్ డెవలప్‌మెంట్ మరియు ఎంబెడెడ్ డివైజ్‌లలో అద్భుతమైన వేగాన్ని అందిస్తుంది.
        </p>
      </div>

      <p style="font-size:13.5px; color:var(--text);">
        <strong>స్పార్స్ కేసులు (Sparse Cases) ఉన్నప్పుడు ఏమవుతుంది?</strong><br>
        ఒకవేళ మీ కేసులు <code>case 1:</code>, <code>case 1000:</code>, <code>case 50000:</code> లాగా చాలా దూరంగా ఉంటే, కంపైలర్ భారీ మెమరీ వేస్ట్ కాకుండా ఉండటానికి జంప్ టేబుల్‌కు బదులుగా <strong>బైనరీ సెర్చ్ ట్రీ (Binary Search Tree of Jumps - O(log N))</strong> విధానాన్ని స్వయంచాలకంగా ఎంచుకుంటుంది!
      </p>
    </section>

    <!-- SECTION 3 -->
    <section>
      <h2 class="section-title"><span class="num">3</span> The break కీవర్డ్ పాత్ర & ఎగ్జిక్యూషన్ ఫ్లో కంట్రోల్</h2>
      <p>
        <code>switch</code> స్టేట్‌మెంట్ లోపల <strong><code>break;</code></strong> అనేది కేవలం ఒక ఐచ్ఛిక పదం కాదు; అది కంట్రోల్ ఫ్లోను నియంత్రించే అత్యంత కీలకమైన బ్రేకింగ్ సిస్టమ్.
      </p>
      <p>
        ఒక మ్యాచ్ అయిన కేస్ లోపలి కోడ్ ఎగ్జిక్యూట్ అయిన తర్వాత, ప్రోగ్రామ్ అక్కడితో ఆగిపోయి వెంటనే <code>switch</code> కర్లీ బ్రాకెట్ల <code>{ ... }</code> నుండి బయటకు వచ్చేయాలని కంపైలర్‌కు ఆజ్ఞాపించే మాధ్యమమే <code>break</code>.
      </p>

      <div class="card" style="background:var(--bg2); border:1px solid rgba(239,68,68,0.3); border-left:4px solid #ef4444; border-radius:8px; padding:16px 20px; margin:16px 0;">
        <h4 style="margin:0 0 6px 0; color:#ef4444; font-size:15px;">⚠️ break రాయకపోతే ఏమవుతుంది?</h4>
        <p style="font-size:13.5px; color:var(--text); line-height:1.7; margin:0;">
          ఒక కేస్ చివర <code>break;</code> పెట్టడం మర్చిపోతే, ప్రోగ్రామ్ అక్కడితో ఆగదు! తర్వాతి కేస్ యొక్క కండిషన్ మ్యాచ్ కాకపోయినా సరే, కంపైలర్ ఆ తర్వాతి కేస్ కోడ్‌ను కూడా వరుసగా రన్ చేసుకుంటూ వెళ్ళిపోతుంది. దీనినే C/C++ లో <strong>Fall-through</strong> అంటారు.
        </p>
      </div>
    </section>

    <!-- SECTION 4 -->
    <section>
      <h2 class="section-title"><span class="num">4</span> The default కేస్ ప్రాముఖ్యత & డిఫెన్సివ్ ప్రోగ్రామింగ్</h2>
      <p>
        యూజర్ ఇచ్చిన ఇన్పుట్ విలువ మనం రాసిన ఏ ఒక్క <code>case</code> లేబుల్‌తోనూ సరిపోలనప్పుడు ఎగ్జిక్యూట్ అయ్యే రక్షణ కవచమే <strong><code>default:</code></strong> కేస్.
      </p>
      <ul>
        <li><strong>సేఫ్టీ నెట్ (Safety Net):</strong> ఊహించని విలువలు, తప్పుడు యూజర్ ఇన్పుట్లు, లేదా క్రాష్‌లను సురక్షితంగా హ్యాండిల్ చేయడానికి ఇది పనిచేస్తుంది.</li>
        <li><strong>స్థానం (Placement):</strong> సాధారణంగా <code>default</code> ను అన్ని కేసుల చివర రాస్తారు. కానీ C++ రూల్స్ ప్రకారం దీనిని <code>switch</code> లో ఎక్కడైనా (మొదట్లో లేదా మధ్యలో కూడా) ఉంచవచ్చు. అయితే సులభంగా అర్థం కావడానికి చివరనే రాయడం ఉత్తమ ప్రామాణికం.</li>
        <li><strong>MISRA C++ గైడ్‌లైన్:</strong> ఆటోమోటివ్, ఏవియేషన్ మరియు మెడికల్ ఎంబెడెడ్ సాఫ్ట్‌వేర్ నియమావళి (MISRA) ప్రకారం, ప్రతి <code>switch</code> లోనూ ఖచ్చితంగా ఒక <code>default</code> క్లాజ్ తప్పనిసరిగా ఉండాలి!</li>
      </ul>

      <div style="margin:20px 0 16px;">
        <div style="font-size:13.5px; font-weight:700; color:#10b981; margin-bottom:6px;">💻 Example 2: Defensive Default Handling (స్మార్ట్ కాలిక్యులేటర్ ఆపరేటర్)</div>
        <div class="code-block">
          <div class="code-block-header">
            <span class="lang-tag">C++17</span>
            <div class="code-actions">
              <button class="copy-btn" onclick="copyCode(this)">📋 Copy</button>
              <button class="try-btn" onclick="runCodeInCompiler(this)">▶ Run in Compiler</button>
            </div>
          </div>
          <pre><code>#include &lt;iostream&gt;

int main() {
    char op = '%';
    double a = 20.0, b = 4.0;

    std::cout &lt;&lt; "గణన ప్రక్రియ: " &lt;&lt; a &lt;&lt; " " &lt;&lt; op &lt;&lt; " " &lt;&lt; b &lt;&lt; "\\n";

    switch (op) {
        case '+':
            std::cout &lt;&lt; "కూడిక ఫలితం: " &lt;&lt; (a + b) &lt;&lt; '\\n';
            break;
        case '-':
            std::cout &lt;&lt; "తీసివేత ఫలితం: " &lt;&lt; (a - b) &lt;&lt; '\\n';
            break;
        case '*':
            std::cout &lt;&lt; "గుణకార ఫలితం: " &lt;&lt; (a * b) &lt;&lt; '\\n';
            break;
        case '/':
            if (b != 0.0) {
                std::cout &lt;&lt; "భాగహార ఫలితం: " &lt;&lt; (a / b) &lt;&lt; '\\n';
            } else {
                std::cout &lt;&lt; "❌ ఎర్రర్: సున్నాతో భాగహారం సాధ్యం కాదు!\\n";
            }
            break;
        default:
            // డిఫెన్సివ్ ప్రోగ్రామింగ్: తెలియని గుర్తు వస్తే వెంటనే వినియోగదారుడిని హెచ్చరించండి
            std::cout &lt;&lt; "⚠️ లోపం: ఆమోదించబడని ఆపరేటర్ ('" &lt;&lt; op &lt;&lt; "')! కేవలం +, -, *, / మాత్రమే వాడండి.\\n";
            break;
    }

    return 0;
}</code></pre>
        </div>
      </div>
    </section>

    <!-- SECTION 5 -->
    <section>
      <h2 class="section-title"><span class="num">5</span> The Fall-Through మెకానిజం (సాంప్రదాయ బగ్ vs ఫీచర్)</h2>
      <p>
        Fall-through అనేది రెండు వైపులా పదునున్న కత్తి లాంటిది. తెలియకుండా <code>break</code> మర్చిపోతే అది సాఫ్ట్‌వేర్ క్రాష్‌లకు కారణమయ్యే <strong>ప్రమాదకరమైన బగ్</strong> అవుతుంది. కానీ ఉద్దేశపూర్వకంగా సరైన ప్రణాళికతో వాడితే అది కోడ్ నిడివిని తగ్గించే <strong>అద్భుతమైన ఫీచర్</strong> అవుతుంది!
      </p>

      <div style="background:var(--bg2); border:1px solid var(--border); border-radius:10px; padding:18px; margin:16px 0;">
        <h4 style="margin:0 0 10px 0; color:#10b981; font-size:15px;">🎯 ఉద్దేశపూర్వక Fall-through: కేస్ గ్రూపింగ్ (Case Grouping)</h4>
        <p style="font-size:13.5px; color:var(--text); line-height:1.7; margin:0;">
          బహుళ విలువల కోసం ఒకే విధమైన చర్య తీసుకోవాల్సి వచ్చినప్పుడు, కేసులను వరుసగా పేర్చి చివరి కేస్‌లో మాత్రమే కోడ్ రాయడాన్ని కేస్ గ్రూపింగ్ అంటారు. ఉదాహరణకు: ఒక క్యారెక్టర్ అచ్చా (Vowel) లేదా హల్లా (Consonant) అని పరీక్షించడం:
        </p>
      </div>

      <div style="margin:20px 0 16px;">
        <div style="font-size:13.5px; font-weight:700; color:#10b981; margin-bottom:6px;">💻 Example 3: Intentional Case Grouping (Vowel Checker)</div>
        <div class="code-block">
          <div class="code-block-header">
            <span class="lang-tag">C++17</span>
            <div class="code-actions">
              <button class="copy-btn" onclick="copyCode(this)">📋 Copy</button>
              <button class="try-btn" onclick="runCodeInCompiler(this)">▶ Run in Compiler</button>
            </div>
          </div>
          <pre><code>#include &lt;iostream&gt;

int main() {
    char alphabet = 'e';

    std::cout &lt;&lt; "అక్షరం: '" &lt;&lt; alphabet &lt;&lt; "'\\n";

    switch (alphabet) {
        // 'a', 'e', 'i', 'o', 'u' అన్నింటికీ ఒకే లాజిక్!
        // break లు లేకపోవడం వల్ల ఏ అచ్చు వచ్చినా జారుకుంటూ క్రిందికి వచ్చి ఒకేసారి ప్రింట్ అవుతాయి
        case 'a':
        case 'A':
        case 'e':
        case 'E':
        case 'i':
        case 'I':
        case 'o':
        case 'O':
        case 'u':
        case 'U':
            std::cout &lt;&lt; "✅ ఇది ఒక అచ్చు (Vowel).\\n";
            break;

        default:
            std::cout &lt;&lt; "🔤 ఇది ఒక హల్లు (Consonant) లేదా ఇతర చిహ్నం.\\n";
            break;
    }

    return 0;
}</code></pre>
        </div>
      </div>
    </section>

    <!-- SECTION 6 -->
    <section>
      <h2 class="section-title"><span class="num">6</span> ఆధునిక C++17 విప్లవం: [[fallthrough]] అట్రిబ్యూట్</h2>
      <p>
        సాంప్రదాయ C++ లో డెవలపర్లు కోడ్ రాసేటప్పుడు ఉద్దేశపూర్వకంగా ఫాల్-త్రూ చేసినా, కంపైలర్లు (ఉదాహరణకు <code>-Wimplicit-fallthrough</code> ఫ్లాగ్‌తో) అనుమానించి విపరీతమైన వార్నింగ్స్ ఇచ్చేవి. డెవలపర్లు కంపైలర్‌ను శాంతింపజేయడానికి <code>// fall through</code> అని ప్రత్యేక కామెంట్లు రాయాల్సి వచ్చేది.
      </p>
      <p>
        ఈ అయోమయానికి ముగింపు పలుకుతూ <strong>Modern C++17</strong> లో సరికొత్త అధికారిక స్టాండర్డ్ అట్రిబ్యూట్ ప్రవేశపెట్టబడింది: <strong><code>[[fallthrough]];</code></strong>!
      </p>

      <div class="card" style="background:var(--bg2); border:1px solid rgba(16,185,129,0.3); border-radius:8px; padding:16px 20px; margin:16px 0;">
        <h4 style="margin:0 0 8px 0; color:#10b981; font-size:15px;">💡 [[fallthrough]] అట్రిబ్యూట్ నియమాలు</h4>
        <p style="font-size:13.5px; color:var(--text); line-height:1.7; margin:0;">
          1. ఇది కంపైలర్‌కు స్పష్టమైన సందేశం ఇస్తుంది: <em>"డియర్ కంపైలర్, నేను ఇక్కడ break మర్చిపోలేదు! కావాలనే క్రింది కేస్‌కు వెళ్లాలని డిజైన్ చేశాను. కాబట్టి వార్నింగ్ ఇవ్వకు."</em><br>
          2. ఇది కేవలం <code>switch</code> లోపల మాత్రమే, ఒక <code>case</code> నుండి తర్వాతి <code>case</code> లేదా <code>default</code> కు వెళ్లే ముందు మాత్రమే స్టేట్‌మెంట్‌గా రాయాలి. చివర ఖచ్చితంగా సెమికోలన్ <code>[[fallthrough]];</code> ఉండాలి.
        </p>
      </div>

      <div style="margin:20px 0 16px;">
        <div style="font-size:13.5px; font-weight:700; color:#10b981; margin-bottom:6px;">💻 Example 4: C++17 [[fallthrough]] Multi-Tier Subscription Processing</div>
        <div class="code-block">
          <div class="code-block-header">
            <span class="lang-tag">Modern C++17 [[fallthrough]]</span>
            <div class="code-actions">
              <button class="copy-btn" onclick="copyCode(this)">📋 Copy</button>
              <button class="try-btn" onclick="runCodeInCompiler(this)">▶ Run in Compiler</button>
            </div>
          </div>
          <pre><code>#include &lt;iostream&gt;

enum class MemberTier { Diamond, Gold, Silver, Free };

int main() {
    MemberTier userTier = MemberTier::Diamond;

    std::cout &lt;&lt; "--- మీ సభ్యత్వానికి లభించే ప్రయోజనాలు (Benefits Unlocked) ---\\n";

    switch (userTier) {
        case MemberTier::Diamond:
            std::cout &lt;&lt; "💎 డైమండ్ సదుపాయం: అపరిమిత 4K HDR వీడియోలు & VIP వ్యక్తిగత మేనేజర్\\n";
            [[fallthrough]]; // C++17: కావాలనే క్రింది గోల్డ్ ప్రయోజనాలను కూడా కలుపుతున్నాం!

        case MemberTier::Gold:
            std::cout &lt;&lt; "🥇 గోల్డ్ సదుపాయం: యాడ్-ఫ్రీ మ్యూజిక్ స్ట్రీమింగ్ & ఆఫ్‌లైన్ డౌన్‌లోడ్స్\\n";
            [[fallthrough]]; // C++17: క్రింది సిల్వర్ ప్రయోజనాలు కూడా వీరికి లభిస్తాయి!

        case MemberTier::Silver:
            std::cout &lt;&lt; "🥈 సిల్వర్ సదుపాయం: స్టాండర్డ్ HD వీడియో స్ట్రీమింగ్ సపోర్ట్\\n";
            [[fallthrough]];

        case MemberTier::Free:
            std::cout &lt;&lt; "🥉 ప్రాథమిక సదుపాయం: ఉచిత ఖాతా బ్రౌజింగ్ యాక్సెస్\\n";
            break;
    }

    return 0;
}</code></pre>
        </div>
      </div>
    </section>

    <!-- SECTION 7 -->
    <section>
      <h2 class="section-title"><span class="num">7</span> ఆధునిక C++17 విప్లవం: switch with Initializer (Scope Isolation)</h2>
      <p>
        చాలా సందర్భాలలో మనం ఒక ఫంక్షన్‌ను కాల్ చేసి, అది ఇచ్చే స్టేటస్ కోడ్ లేదా ఎర్రర్ నంబర్ ఆధారంగా <code>switch</code> చేయాల్సి ఉంటుంది. ఉదాహరణకు: ఒక API రెస్పాన్స్ కోడ్ (200, 404, 500) తనిఖీ చేయడం.
      </p>
      <p>
        పాత C++ లో ఆ వేరియబుల్‌ను <code>switch</code> బయట సృష్టించాల్సి వచ్చేది. దీనివల్ల వేరియబుల్ అనవసరంగా ఫంక్షన్ అంతటా ఉండిపోయేది. కానీ <strong>Modern C++17</strong> లో వచ్చిన <strong><code>switch with Initializer</code></strong> ఈ సమస్యను అద్భుతంగా పరిష్కరించింది:
      </p>

      <div style="background:var(--bg3); padding:12px 18px; border-radius:8px; font-family:'JetBrains Mono',monospace; font-size:14px; color:#10b981; margin:14px 0; border-left:4px solid #10b981;">
        switch (init-statement; condition-variable) {<br>
        &nbsp;&nbsp;&nbsp;&nbsp;case A: ... break;<br>
        &nbsp;&nbsp;&nbsp;&nbsp;default: ... break;<br>
        }<br>
        // ఇక్కడ init-statement లో సృష్టించిన వేరియబుల్ ఆటోమేటిక్‌గా మెమరీ నుండి నాశనమైపోతుంది!
      </div>

      <div style="margin:20px 0 16px;">
        <div style="font-size:13.5px; font-weight:700; color:#10b981; margin-bottom:6px;">💻 Example 5: C++17 switch with Initializer (HTTP Network Status Handler)</div>
        <div class="code-block">
          <div class="code-block-header">
            <span class="lang-tag">Modern C++17 switch with init</span>
            <div class="code-actions">
              <button class="copy-btn" onclick="copyCode(this)">📋 Copy</button>
              <button class="try-btn" onclick="runCodeInCompiler(this)">▶ Run in Compiler</button>
            </div>
          </div>
          <pre><code>#include &lt;iostream&gt;

// నెట్‌వర్క్ సర్వర్ రెస్పాన్స్ కోడ్ తెచ్చే డమ్మీ ఫంక్షన్
int fetchServerStatus() {
    return 404; // పేజీ దొరకలేదు
}

int main() {
    // C++17: వేరియబుల్ డిక్లరేషన్ మరియు switch ఒకే లైన్‌లో!
    switch (int httpStatusCode = fetchServerStatus(); httpStatusCode) {
        case 200:
            std::cout &lt;&lt; "✅ Status 200: సర్వర్ కనెక్షన్ విజయవంతమైంది (OK).\\n";
            break;
        case 400:
            std::cout &lt;&lt; "⚠️ Status 400: బ్యాడ్ రిక్వెస్ట్ (Bad Request).\\n";
            break;
        case 401:
            std::cout &lt;&lt; "🔒 Status 401: అనధికారిక ప్రవేశం (Unauthorized - లాగిన్ అవ్వండి).\\n";
            break;
        case 404:
            std::cout &lt;&lt; "❌ Status 404: మీరు కోరిన వెబ్ పేజీ కనుగొనబడలేదు (Not Found).\\n";
            break;
        case 500:
            std::cout &lt;&lt; "💥 Status 500: ఇంటర్నల్ సర్వర్ ఎర్రర్ (Internal Server Error).\\n";
            break;
        default:
            std::cout &lt;&lt; "❓ Status " &lt;&lt; httpStatusCode &lt;&lt; ": తెలియని నెట్‌వర్క్ ప్రతిస్పందన.\\n";
            break;
    }

    // ఇక్కడ httpStatusCode అందుబాటులో ఉండదు!
    // std::cout &lt;&lt; httpStatusCode; // ❌ Compile Error: scope pollution నిరోధించబడింది!

    return 0;
}</code></pre>
        </div>
      </div>
    </section>

    <!-- SECTION 8 -->
    <section>
      <h2 class="section-title"><span class="num">8</span> Scoped Enums (enum class) తో టైప్-సేఫ్ switch ఆర్కిటెక్చర్</h2>
      <p>
        పాత C-స్టైల్ <code>enum</code> లలో పెద్ద సమస్య ఉండేది: అవి నేమ్‌స్పేస్‌ను కలుషితం చేసేవి మరియు పూర్ణాంకాలతో (Integers) సులభంగా కలిసిపోయి బగ్‌లను సృష్టించేవి.
      </p>
      <p>
        Modern C++ లో మనం ఎల్లప్పుడూ <strong><code>enum class</code> (Strongly Typed Scoped Enum)</strong> వాడతాం. దీనిని <code>switch</code> తో కలిపి వాడినప్పుడు కంపైలర్ మనకు ఒక అద్భుతమైన ఫీచర్‌ను అందిస్తుంది: <strong>Exhaustive Case Checking</strong>!
      </p>

      <div class="card" style="background:var(--bg2); border:1px solid rgba(16,185,129,0.3); border-radius:8px; padding:16px 20px; margin:16px 0;">
        <h4 style="margin:0 0 8px 0; color:#10b981; font-size:15px;">🛡️ Exhaustive Switch Warning (-Wswitch)</h4>
        <p style="font-size:13.5px; color:var(--text); line-height:1.7; margin:0;">
          మీరు ఒక <code>enum class</code> లో 5 రకాల స్టేట్స్ (ఉదా: <code>Stopped, Running, Paused, Resumed, Error</code>) నిర్వచించి, మీ <code>switch</code> లో కేవలం 4 స్టేట్స్ మాత్రమే రాస్తే — కంపైలర్ వెంటనే హెచ్చరిస్తుంది: <em>"warning: enumeration value 'Error' not handled in switch"</em>! ఇది ఎంటర్‌ప్రైజ్ సాఫ్ట్‌వేర్‌లో డెవలపర్లు ఏదైనా ఒక స్టేట్‌ను మర్చిపోకుండా అడ్డుకునే బలమైన ఆయుధం.
        </p>
      </div>

      <div style="margin:20px 0 16px;">
        <div style="font-size:13.5px; font-weight:700; color:#10b981; margin-bottom:6px;">💻 Example 6: Scoped Enum Traffic Light State Machine</div>
        <div class="code-block">
          <div class="code-block-header">
            <span class="lang-tag">Modern C++ Scoped Enum</span>
            <div class="code-actions">
              <button class="copy-btn" onclick="copyCode(this)">📋 Copy</button>
              <button class="try-btn" onclick="runCodeInCompiler(this)">▶ Run in Compiler</button>
            </div>
          </div>
          <pre><code>#include &lt;iostream&gt;

// స్ట్రాంగ్లీ టైప్డ్ ఎన్యూమరేషన్
enum class TrafficSignal { Red, Yellow, Green, BlinkingYellow };

void handleSignal(TrafficSignal signal) {
    switch (signal) {
        case TrafficSignal::Red:
            std::cout &lt;&lt; "🛑 రెడ్ సిగ్నల్: వాహనాలను పూర్తిగా ఆపండి! లైన్ దాటవద్దు.\\n";
            break;
        case TrafficSignal::Yellow:
            std::cout &lt;&lt; "⚠️ ఎల్లో సిగ్నల్: వేగం తగ్గించండి. వెళ్ళడానికి సిద్ధంగా ఉండండి.\\n";
            break;
        case TrafficSignal::Green:
            std::cout &lt;&lt; "🟢 గ్రీన్ సిగ్నల్: ప్రయాణాన్ని సురక్షితంగా కొనసాగించండి.\\n";
            break;
        case TrafficSignal::BlinkingYellow:
            std::cout &lt;&lt; "🟡 బ్లింకింగ్ ఎల్లో: ఇరువైపులా గమనించి జాగ్రత్తగా ముందుకు వెళ్ళండి.\\n";
            break;
    }
}

int main() {
    TrafficSignal currentSignal = TrafficSignal::Red;
    handleSignal(currentSignal);

    currentSignal = TrafficSignal::Green;
    handleSignal(currentSignal);

    return 0;
}</code></pre>
        </div>
      </div>
    </section>

    <!-- SECTION 9 -->
    <section>
      <h2 class="section-title"><span class="num">9</span> The "Crosses Initialization" Trap & Scope in Switch Cases</h2>
      <p>
        C++ లో బిగినర్స్ తరచుగా ఎదుర్కొనే అత్యంత వింతైన మరియు భయపెట్టే కంపైలర్ ఎర్రర్: <code>error: jump to case label crosses initialization of 'variable'</code>.
      </p>

      <div style="background:var(--bg2); border:1px solid rgba(239,68,68,0.4); border-left:4px solid #ef4444; border-radius:8px; padding:16px 20px; margin:16px 0;">
        <h4 style="margin:0 0 8px 0; color:#ef4444; font-size:15px;">❌ ఎర్రర్ ఎందుకు వస్తుంది? (C++ Object Lifecycle Rule)</h4>
        <p style="font-size:13.5px; color:var(--text); line-height:1.7; margin:0;">
          మీరు <code>case 1:</code> లో <code>int discount = 10;</code> అని రాస్తే, మొత్తం <code>switch</code> స్టేట్‌మెంట్ అంతా ఒకే కామన్ స్కోప్ పరిధిలో ఉంటుంది. ఒకవేళ యూజర్ ఇన్పుట్ <code>2</code> అయితే, కంపైలర్ <code>case 1</code> ను దాటి నేరుగా <code>case 2</code> కి జంప్ చేయాలి. కానీ అలా జంప్ చేస్తే <code>discount</code> వేరియబుల్ మెమరీలో సృష్టించబడకుండానే ఆ వేరియబుల్ స్కోప్‌లోకి ప్రోగ్రామ్ వచ్చేస్తుంది! C++ ఆబ్జెక్ట్ లైఫ్‌సైకిల్ నియమాల ప్రకారం ఇటువంటి ప్రారంభించని (Uninitialized) స్థితిని కంపైలర్ ఖచ్చితంగా అనుమతించదు.
        </p>
      </div>

      <div style="margin:20px 0 16px;">
        <div style="font-size:13.5px; font-weight:700; color:#10b981; margin-bottom:6px;">💻 The Problem & The Solution (Explicit Block Scope { })</div>
        <div class="code-block">
          <div class="code-block-header">
            <span class="lang-tag">C++ Scope Isolation Fix</span>
            <div class="code-actions">
              <button class="copy-btn" onclick="copyCode(this)">📋 Copy</button>
              <button class="try-btn" onclick="runCodeInCompiler(this)">▶ Run in Compiler</button>
            </div>
          </div>
          <pre><code>#include &lt;iostream&gt;

int main() {
    int planCode = 1;

    switch (planCode) {
        case 1: {
            // ✅ సరైన పరిష్కారం: కర్లీ బ్రేసెస్ {} పెట్టి ప్రత్యేక స్కోప్ ఇవ్వండి!
            int bonusPoints = 500; 
            std::cout &lt;&lt; "ప్లాన్ 1 ఆక్టివేట్ అయింది. బోనస్ పాయింట్లు: " &lt;&lt; bonusPoints &lt;&lt; '\\n';
            break;
        } // ఇక్కడ bonusPoints జీవితకాలం ముగిసిపోతుంది!

        case 2: {
            // ఇక్కడ మరొక కొత్త వేరియబుల్‌ను సంతోషంగా డిక్లేర్ చేసుకోవచ్చు
            double cashback = 150.75;
            std::cout &lt;&lt; "ప్లాన్ 2 ఆక్టివేట్ అయింది. క్యాష్‌బ్యాక్: ₹" &lt;&lt; cashback &lt;&lt; '\\n';
            break;
        }

        default:
            std::cout &lt;&lt; "చెల్లని ప్లాన్!\\n";
            break;
    }

    return 0;
}</code></pre>
        </div>
      </div>
    </section>

    <!-- SECTION 10 -->
    <section>
      <h2 class="section-title"><span class="num">10</span> switch vs if - else if - else: సమగ్ర సాంకేతిక పోలిక</h2>
      <p>
        మీ ప్రాజెక్ట్‌లో డెసిషన్ మేకింగ్ రాసేటప్పుడు <code>switch</code> వాడాలా లేక <code>if-else if-else</code> వాడాలా అనే సందేహానికి క్రింది సమగ్ర పోలిక పట్టిక స్పష్టమైన సమాధానం ఇస్తుంది:
      </p>

      <div class="table-wrap">
        <table class="tbl">
          <thead>
            <tr>
              <th>ఫీచర్ / అంశం</th>
              <th>C++ switch స్టేట్‌మెంట్</th>
              <th>if - else if - else లాడర్</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>టైమ్ కాంప్లెక్సిటీ</strong></td>
              <td><strong>O(1) Constant Time</strong> (Jump Table ద్వారా డైరెక్ట్ జంప్)</td>
              <td><strong>O(N) Linear Time</strong> (ప్రతి కండిషన్‌ను పైనుండి వరుసగా చెక్ చేయాలి)</td>
            </tr>
            <tr>
              <td><strong>అనుమతించబడే డేటా టైప్స్</strong></td>
              <td>కేవలం పూర్ణాంకాలు (<code>int, char, short, long, enum</code>) మాత్రమే</td>
              <td>ఏదైనా బూలియన్ ఎక్స్‌ప్రెషన్, ఫ్లోట్స్, డబుల్స్, స్ట్రింగ్స్, పాయింటర్స్</td>
            </tr>
            <tr>
              <td><strong>శ్రేణుల తనిఖీ (Range Check)</strong></td>
              <td>కష్టం (ఉదా: <code>marks &gt;= 80 &amp;&amp; marks &lt;= 90</code> రాయలేము)</td>
              <td>చాలా సులభం (రిలేషనల్ ఆపరేటర్లు <code>&gt;, &lt;, &gt;=, &lt;=</code> తో)</td>
            </tr>
            <tr>
              <td><strong>కేస్ పరిమాణం పెరిగినప్పుడు</strong></td>
              <td>కోడ్ అత్యంత క్లీన్ గా, రీడబుల్ గా ఉంటుంది</td>
              <td>కోడ్ చాలా పొడవుగా, గందరగోళంగా మారుతుంది</td>
            </tr>
            <tr>
              <td><strong>అసెంబ్లీ కోడ్ ఉత్పత్తి</strong></td>
              <td>మెమరీలో Jump Table లేదా Binary Search Dispatch</td>
              <td>వరుస <code>CMP</code> మరియు కండిషనల్ <code>JNE / JE</code> బ్రాంచ్‌లు</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- SECTION 11 -->
    <section>
      <h2 class="section-title"><span class="num">11</span> Modern C++ లో switch పరిమితులు & ప్రత్యామ్నాయాలు (Pattern Matching / std::variant)</h2>
      <p>
        C++ <code>switch</code> లో ఉన్న ప్రధాన పరిమితి: <strong>ఇది <code>std::string</code> లేదా ఫ్లోటింగ్‌లను నేరుగా స్వీకరించదు</strong>. ఈ పరిమితిని అధిగమించడానికి ఆధునిక సాఫ్ట్‌వేర్ ఇంజనీరింగ్‌లో క్రింది ప్రత్యామ్నాయాలను ఉపయోగిస్తారు:
      </p>

      <div style="display:flex; flex-direction:column; gap:16px; margin:18px 0;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px 20px;">
          <h4 style="margin:0 0 8px 0; color:#10b981; font-size:15px;">1. Compile-Time String Hashing (constexpr hash)</h4>
          <p style="font-size:13.5px; color:var(--text); line-height:1.7; margin:0;">
            స్ట్రింగ్‌ను కంపైల్ సమయంలోనే పూర్ణాంక హాష్ వాల్యూగా (32-bit FNV-1a Hash) మార్చి, ఆ హాష్‌ను <code>switch</code> కేస్ లేబుల్‌గా ఉపయోగించవచ్చు: <code>switch (hash(command)) { case hash("start"): ... }</code>. ఇది చాలా గేమ్ ఇంజిన్లు వాడే శక్తివంతమైన టెక్నిక్.
          </p>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px 20px;">
          <h4 style="margin:0 0 8px 0; color:#10b981; font-size:15px;">2. Modern C++17 std::variant & std::visit (Type-Safe Pattern Matching)</h4>
          <p style="font-size:13.5px; color:var(--text); line-height:1.7; margin:0;">
            C++17 లో వచ్చిన <code>std::variant</code> మరియు <code>std::visit</code> లు ఆధునిక ఫంక్షనల్ ప్రోగ్రామింగ్ తరహా ప్యాటర్న్ మ్యాచింగ్‌ను అందిస్తాయి. దీనివల్ల వివిధ రకాల ఆబ్జెక్టులపై టైప్-సేఫ్ గా డెసిషన్ మేకింగ్ చేయవచ్చు.
          </p>
        </div>
      </div>
    </section>

    <!-- SECTION 12 -->
    <section>
      <h2 class="section-title"><span class="num">12</span> సాధారణ బిగినర్ తప్పులు, బెస్ట్ ప్రాక్టీసెస్ & MISRA C++ రూల్స్</h2>
      <p>
        <code>switch</code> రాసేటప్పుడు అత్యంత అనుభవజ్ఞులైన డెవలపర్లు కూడా పాటించే కీలకమైన ఉత్తమ పద్ధతులు:
      </p>

      <div style="display:flex; flex-direction:column; gap:14px; margin:18px 0;">
        <div style="background:var(--bg2); border:1px solid rgba(239,68,68,0.3); border-left:4px solid #ef4444; border-radius:8px; padding:14px 18px;">
          <div style="font-weight:700; color:#ef4444; font-size:14.5px;">❌ Trap: డూప్లికేట్ కేస్ లేబుల్స్ (Duplicate Case Labels)</div>
          <p style="font-size:13.5px; color:var(--text); margin:4px 0 0 0; line-height:1.6;">
            ఒకే <code>switch</code> లో రెండు సార్లు ఒకే విలువ రాయకూడదు (ఉదా: <code>case 1: ... case 1:</code>). కంపైలర్ వెంటనే <em>"error: duplicate case value"</em> అని ప్రోగ్రామ్‌ను తిరస్కరిస్తుంది.
          </p>
        </div>

        <div style="background:var(--bg2); border:1px solid rgba(239,68,68,0.3); border-left:4px solid #ef4444; border-radius:8px; padding:14px 18px;">
          <div style="font-weight:700; color:#ef4444; font-size:14.5px;">❌ Trap: వేరియబుల్స్ నాన్-కాన్స్టాంట్ కావడం</div>
          <p style="font-size:13.5px; color:var(--text); margin:4px 0 0 0; line-height:1.6;">
            <code>case x:</code> లో <code>x</code> అనేది రన్‌టైమ్ వేరియబుల్ కాకూడదు. అది ఖచ్చితంగా కంపైల్-టైమ్ స్థిరరాశి (<code>constexpr</code> లేదా లిటరల్ కాన్స్టాంట్) మాత్రమే అయి ఉండాలి.
          </p>
        </div>

        <div style="background:var(--bg2); border:1px solid rgba(16,185,129,0.3); border-left:4px solid #10b981; border-radius:8px; padding:14px 18px;">
          <div style="font-weight:700; color:#10b981; font-size:14.5px;">✅ Pro Best Practice: ప్రతి కేస్‌కు కర్లీ బ్రాకెట్లు {} అమర్చండి</div>
          <p style="font-size:13.5px; color:var(--text); margin:4px 0 0 0; line-height:1.6;">
            కేస్ లోపల ఒకటి కంటే ఎక్కువ స్టేట్‌మెంట్లు ఉన్నప్పుడు ఎల్లప్పుడూ <code>case X: { ... break; }</code> విధానాన్ని అనుసరించండి. ఇది వేరియబుల్ నేమ్ కొలిషన్స్ మరియు క్రాసింగ్ ఇనిషియలైజేషన్ ఎర్రర్లను మొదట్లోనే తుంచివేస్తుంది.
          </p>
        </div>
      </div>
    </section>

    <!-- SECTION 13 -->
    <section>
      <h2 class="section-title"><span class="num">13</span> రియల్-వరల్డ్ ప్రాక్టీస్ ప్రాజెక్ట్: "Enterprise Core Banking ATM State & Transaction Engine"</h2>
      <p>
        ఈ అధ్యాయంలో నేర్చుకున్న <code>switch-case</code>, <code>break</code>, <code>default</code>, Modern C++17 <code>switch with initializer</code>, C++17 <code>[[fallthrough]]</code>, మరియు <code>enum class</code> లను సమన్వయం చేస్తూ — పూర్తి స్థాయి <strong>"Enterprise Core Banking ATM State & Transaction Processing Engine"</strong> ను నిర్మిద్దాం:
      </p>

      <div style="margin:20px 0 16px;">
        <div style="font-size:13.5px; font-weight:700; color:#10b981; margin-bottom:6px;">💻 Complete Masterclass Practice Project: ATM State Machine Engine</div>
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

// ATM లావాదేవీ రకాల Scoped Enum
enum class ATMOption {
    CheckBalance = 1,
    WithdrawCash = 2,
    DepositCash = 3,
    ChangePin = 4,
    MiniStatement = 5,
    ExitSession = 6
};

// ఆడిట్ లాగింగ్ లెవెల్స్ (ఫాల్-త్రూ ప్రదర్శన కొరకు)
enum class AuditLevel { HighSecurity, Financial, Standard };

int main() {
    std::string customerName = "కొల్లి సత్యనారాయణ (K. Satyanarayana)";
    int accountPin = 4826;
    double accountBalance = 68450.00;
    double dailyWithdrawalLimit = 25000.00;

    std::cout &lt;&lt; std::fixed &lt;&lt; std::setprecision(2);
    std::cout &lt;&lt; "================================================================\\n";
    std::cout &lt;&lt; "      🏦 STATE BANK OF INDIA - ENTERPRISE CORE ATM ENGINE       \\n";
    std::cout &lt;&lt; "================================================================\\n";
    std::cout &lt;&lt; "ఖాతాదారుని పేరు : " &lt;&lt; customerName &lt;&lt; '\\n';
    std::cout &lt;&lt; "ఖాతా రకం        : సేవింగ్స్ బ్యాంక్ (SBI Prime Savings)\\n";
    std::cout &lt;&lt; "----------------------------------------------------------------\\n";
    std::cout &lt;&lt; "1. బ్యాలెన్స్ ఎంక్వైరీ (Check Balance)\\n";
    std::cout &lt;&lt; "2. నగదు ఉపసంహరణ (Withdraw Cash)\\n";
    std::cout &lt;&lt; "3. నగదు డిపాజిట్ (Deposit Cash)\\n";
    std::cout &lt;&lt; "4. ఏటీఎం పిన్ మార్పు (Change PIN)\\n";
    std::cout &lt;&lt; "5. మినీ స్టేట్‌మెంట్ (Mini Statement)\\n";
    std::cout &lt;&lt; "6. లావాదేవీ ముగింపు (Exit Session)\\n";
    std::cout &lt;&lt; "================================================================\\n";

    // అనుకరణ: కస్టమర్ ఎంపిక 2 (క్యాష్ విత్‌డ్రాయల్)
    int selectedOptionInt = 2;
    std::cout &lt;&lt; "ఎంచుకున్న లావాదేవీ ఆప్షన్: " &lt;&lt; selectedOptionInt &lt;&lt; "\\n\\n";

    // C++17 switch with initializer: టైప్-సేఫ్ కాస్టింగ్ మరియు స్కోప్ ఐసోలేషన్
    switch (auto opt = static_cast&lt;ATMOption&gt;(selectedOptionInt); opt) {
        case ATMOption::CheckBalance: {
            std::cout &lt;&lt; "💰 [బ్యాలెన్స్ విచారణ]:\\n";
            std::cout &lt;&lt; "మీ ఖాతాలో ప్రస్తుతం అందుబాటులో ఉన్న బ్యాలెన్స్: ₹ " &lt;&lt; accountBalance &lt;&lt; '\\n';
            break;
        }

        case ATMOption::WithdrawCash: {
            double withdrawAmount = 15000.00;
            std::cout &lt;&lt; "💵 [నగదు ఉపసంహరణ ప్రక్రియ]:\\n";
            std::cout &lt;&lt; "కోరిన నగదు మొత్తం: ₹ " &lt;&lt; withdrawAmount &lt;&lt; '\\n';

            if (withdrawAmount &gt; dailyWithdrawalLimit) {
                std::cout &lt;&lt; "❌ తిరస్కరణ: మీ రోజువారీ ఉపసంహరణ పరిమితి (₹ " &lt;&lt; dailyWithdrawalLimit &lt;&lt; ") దాటింది!\\n";
            } else if (withdrawAmount &gt; accountBalance) {
                std::cout &lt;&lt; "❌ తిరస్కరణ: మీ ఖాతాలో సరిపడా బ్యాలెన్స్ లేదు!\\n";
            } else {
                accountBalance -= withdrawAmount;
                std::cout &lt;&lt; "✅ లావాదేవీ విజయవంతమైంది! నగదును క్యాష్ డిస్పెన్సర్ నుండి తీసుకోండి.\\n";
                std::cout &lt;&lt; "మిగిలిన బ్యాలెన్స్: ₹ " &lt;&lt; accountBalance &lt;&lt; '\\n';

                // C++17 [[fallthrough]] ఆడిట్ లాగింగ్ ప్రక్రియ
                AuditLevel alert = AuditLevel::Financial;
                std::cout &lt;&lt; "\\n[ఆటోమేటెడ్ సెక్యూరిటీ ఆడిట్ లాగింగ్ ఫ్లో]:\\n";
                switch (alert) {
                    case AuditLevel::HighSecurity:
                        std::cout &lt;&lt; "  🚨 [ALERT 1]: బ్యాంక్ ఫ్రాడ్ డిటెక్షన్ సిస్టమ్‌కు సమాచారం చేరింది.\\n";
                        [[fallthrough]];
                    case AuditLevel::Financial:
                        std::cout &lt;&lt; "  💳 [ALERT 2]: మీ రిజిస్టర్డ్ మొబైల్‌కు డెబిట్ SMS పంపబడింది.\\n";
                        [[fallthrough]];
                    case AuditLevel::Standard:
                        std::cout &lt;&lt; "  📝 [ALERT 3]: లావాదేవీ సర్వర్ డేటాబేస్ జర్నల్ లో రికార్డ్ అయింది.\\n";
                        break;
                }
            }
            break;
        }

        case ATMOption::DepositCash: {
            double depositAmount = 5000.00;
            accountBalance += depositAmount;
            std::cout &lt;&lt; "📥 నగదు డిపాజిట్ విజయవంతమైంది! జమ అయిన మొత్తం: ₹ " &lt;&lt; depositAmount &lt;&lt; '\\n';
            std::cout &lt;&lt; "నవీకరించబడిన బ్యాలెన్స్: ₹ " &lt;&lt; accountBalance &lt;&lt; '\\n';
            break;
        }

        case ATMOption::ChangePin: {
            int newPin = 9182;
            accountPin = newPin;
            std::cout &lt;&lt; "🔐 మీ ఏటీఎం పిన్ విజయవంతంగా మార్చబడింది! కొత్త పిన్: " &lt;&lt; accountPin &lt;&lt; '\\n';
            break;
        }

        case ATMOption::MiniStatement: {
            std::cout &lt;&lt; "📄 [గత 3 లావాదేవీల మినీ స్టేట్‌మెంట్]:\\n";
            std::cout &lt;&lt; "  1. 28-Oct: UPI డెబిట్ - ₹ 450.00 (Swiggy)\\n";
            std::cout &lt;&lt; "  2. 29-Oct: జీతం క్రెడిట్ - ₹ 65,000.00 (TCS Ltd)\\n";
            std::cout &lt;&lt; "  3. 01-Nov: ATM డెబిట్ - ₹ 15,000.00\\n";
            break;
        }

        case ATMOption::ExitSession: {
            std::cout &lt;&lt; "👋 లావాదేవీ ముగిసింది. మీ ఏటీఎం కార్డును తీసుకోండి. మళ్లీ రండి!\\n";
            break;
        }

        default: {
            std::cout &lt;&lt; "⚠️ అమాన్యమైన ఆప్షన్! దయచేసి స్క్రీన్‌పై ఉన్న 1 నుండి 6 వరకు గల నంబర్లను మాత్రమే ఎంచుకోండి.\\n";
            break;
        }
    }

    std::cout &lt;&lt; "================================================================\\n";
    std::cout &lt;&lt; "      SBI తో బ్యాంకింగ్ చేసినందుకు ధన్యవాదాలు! శుభదినం!       \\n";
    std::cout &lt;&lt; "================================================================\\n";

    return 0;
}</code></pre>
        </div>
      </div>
    </section>

    <!-- QUIZ SECTION (5 DETAILS QUESTIONS) -->
    <section style="margin-top:40px;">
      <h2 class="section-title"><span class="num">❓</span> ఇంటర్వ్యూ & పరీక్షల క్విజ్ (Knowledge Check)</h2>
      
      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px 18px; margin-bottom:12px; cursor:pointer;">
        <summary style="font-weight:700; color:#10b981; font-size:14.5px;">ప్రశ్న 1: C++ కంపైలర్ switch స్టేట్‌మెంట్‌ను ఆప్టిమైజ్ చేయడానికి 'Jump Table' ను ఎలా ఉపయోగిస్తుంది?</summary>
        <div style="font-size:13.5px; color:var(--text); margin-top:10px; line-height:1.7;">
          <strong>సమాధానం:</strong> కేస్ లేబుల్స్ ఒక నిర్దిష్ట నిరంతర శ్రేణిలో (Dense Range) ఉన్నప్పుడు, కంపైలర్ రీడ్-ఓన్లీ మెమరీలో ప్రతి కేస్ కోడ్ చిరునామాతో (Address Pointer) కూడిన ఒక అర్రేను (Jump Table) నిర్మిస్తుంది. ప్రోగ్రామ్ రన్ అయ్యేటప్పుడు CPU ఇన్పుట్ విలువను ఇండెక్స్‌గా తీసుకుని నేరుగా <code>JMP [table + index * 8]</code> ద్వారా ఒకే ఒక్క సైకిల్‌లో సంబంధిత కేస్‌కు జంప్ చేస్తుంది. దీనివల్ల <code>if-else</code> లాగా వరుస పోలికలు అవసరం లేకుండా <strong>O(1) కాన్స్టాంట్ టైమ్</strong> లో రన్ అవుతుంది.
        </div>
      </details>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px 18px; margin-bottom:12px; cursor:pointer;">
        <summary style="font-weight:700; color:#10b981; font-size:14.5px;">ప్రశ్న 2: C++17 లో ప్రవేశపెట్టబడిన [[fallthrough]] అట్రిబ్యూట్ యొక్క ఉద్దేశం ఏమిటి?</summary>
        <div style="font-size:13.5px; color:var(--text); margin-top:10px; line-height:1.7;">
          <strong>సమాధానం:</strong> సాధారణంగా ఒక కేస్ చివర <code>break;</code> రాయకపోతే కంపైలర్ దానిని పొరపాటుగా భావించి ఇంప్లిసిట్ ఫాల్-త్రూ వార్నింగ్స్ ఇస్తుంది. డెవలపర్ కావాలనే ఒక కేస్ నుండి తర్వాతి కేస్‌కు కంట్రోల్ జారాలని కోరుకున్నప్పుడు <code>[[fallthrough]];</code> అని రాస్తారు. ఇది కంపైలర్‌కు ఇది బగ్ కాదు ఉద్దేశపూర్వక డిజైన్ అని స్పష్టం చేసి ఎటువంటి వార్నింగ్స్ రాకుండా చేస్తుంది.
        </div>
      </details>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px 18px; margin-bottom:12px; cursor:pointer;">
        <summary style="font-weight:700; color:#10b981; font-size:14.5px;">ప్రశ్న 3: ఒక switch case లోపల వేరియబుల్‌ను నేరుగా ఇనిషియలైజ్ చేస్తే 'crosses initialization' ఎర్రర్ ఎందుకు వస్తుంది?</summary>
        <div style="font-size:13.5px; color:var(--text); margin-top:10px; line-height:1.7;">
          <strong>సమాధానం:</strong> మొత్తం <code>switch</code> స్టేట్‌మెంట్ ఒకే స్కోప్ పరిధిలో ఉంటుంది. ఒక కేస్‌లో <code>int x = 10;</code> రాసినప్పుడు, వేరే కేస్ మ్యాచ్ అయితే కంపైలర్ ఆ ఇనిషియలైజేషన్‌ను దాటి జంప్ చేయాల్సి వస్తుంది. ఫలితంగా వేరియబుల్ మెమరీలో ప్రాథమిక విలువ లేకుండా స్కోప్‌లో ఉండిపోతుంది, ఇది C++ ఆబ్జెక్ట్ లైఫ్‌సైకిల్ నియమాలకు విరుద్ధం. దీనిని నివారించడానికి ఆ కేస్‌కు కర్లీ బ్రాకెట్లు <code>{ int x = 10; ... }</code> పెట్టి ప్రత్యేక లోకల్ స్కోప్ ఇవ్వాలి.
        </div>
      </details>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px 18px; margin-bottom:12px; cursor:pointer;">
        <summary style="font-weight:700; color:#10b981; font-size:14.5px;">ప్రశ్న 4: C++ switch లో std::string లేదా float విలువలను నేరుగా ఎందుకు వాడలేము?</summary>
        <div style="font-size:13.5px; color:var(--text); margin-top:10px; line-height:1.7;">
          <strong>సమాధానం:</strong> C++ <code>switch</code> స్టేట్‌మెంట్ అంతర్గతంగా హార్డ్‌వేర్ ఇంటిగ్రల్ కంపారిజన్స్ మరియు జంప్ టేబుల్ అడ్రస్సింగ్ ఆధారంగా రూపొందించబడింది. ఫ్లోటింగ్ పాయింట్ సంఖ్యలకు కచ్చితమైన సమానత్వం (Exact Equality) ఉండదు (ప్రెసిషన్ ఎర్రర్స్ ఉంటాయి) మరియు స్ట్రింగ్స్ డైనమిక్ మెమరీలో ఉంటాయి కాబట్టి నేరుగా జంప్ టేబుల్ ఇండెక్స్‌గా పనిచేయలేవు. అందువల్ల C++ స్టాండర్డ్ కేవలం ఇంటిగ్రల్ టైప్స్ (int, char, enum) లను మాత్రమే అనుమతిస్తుంది.
        </div>
      </details>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px 18px; margin-bottom:12px; cursor:pointer;">
        <summary style="font-weight:700; color:#10b981; font-size:14.5px;">ప్రశ్న 5: C++17 switch with Initializer వల్ల సాఫ్ట్‌వేర్ ఆర్కిటెక్చర్‌కు కలిగే ప్రయోజనం ఏమిటి?</summary>
        <div style="font-size:13.5px; color:var(--text); margin-top:10px; line-height:1.7;">
          <strong>సమాధానం:</strong> <code>switch (auto val = calculate(); val)</code> విధానం ద్వారా ఆ కండిషన్ కోసం అవసరమైన వేరియబుల్ యొక్క జీవితకాలాన్ని కేవలం ఆ <code>switch</code> బ్లాక్‌కు మాత్రమే పరిమితం చేయవచ్చు (Variable Scope Isolation). ఆ బ్లాక్ ముగియగానే ఆ వేరియబుల్ మెమరీ నుండి నాశనమైపోతుంది, దీనివల్ల బయట నేమ్‌స్పేస్ కాలుష్యం (Scope Pollution) మరియు వేరియబుల్ నేమ్ కొలిషన్స్ నివారించబడతాయి.
        </div>
      </details>
    </section>

    <!-- LESSON NAVIGATION FOOTER -->
    <div style="display:flex; justify-content:space-between; align-items:center; margin-top:40px; padding:20px; background:var(--bg2); border:1px solid var(--border); border-radius:8px;">
      <div>
        <a href="/blog-cpp/05-cpp-if-else-conditionals.html" style="color:#10b981; text-decoration:none; font-weight:600;">
          ← మునుపటి అధ్యాయం: Chapter 05: డెసిషన్ మేకింగ్ (if, else if, else)
        </a>
      </div>
      <div>
        <a href="/blog-cpp/07-cpp-loops-for-while-do-while.html" style="color:#10b981; text-decoration:none; font-weight:600;">
          తదుపరి అధ్యాయం: Chapter 07: లూప్స్ (for, while, do-while) →
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

enum class ATMOption {
    CheckBalance = 1,
    WithdrawCash = 2,
    DepositCash = 3,
    ChangePin = 4,
    MiniStatement = 5,
    ExitSession = 6
};

enum class AuditLevel { HighSecurity, Financial, Standard };

int main() {
    std::string customerName = "కొల్లి సత్యనారాయణ (K. Satyanarayana)";
    int accountPin = 4826;
    double accountBalance = 68450.00;
    double dailyWithdrawalLimit = 25000.00;

    std::cout << std::fixed << std::setprecision(2);
    std::cout << "================================================================\\\\n";
    std::cout << "      🏦 STATE BANK OF INDIA - ENTERPRISE CORE ATM ENGINE       \\\\n";
    std::cout << "================================================================\\\\n";
    std::cout << "ఖాతాదారుని పేరు : " << customerName << '\\\\n';
    std::cout << "ఖాతా రకం        : సేవింగ్స్ బ్యాంక్ (SBI Prime Savings)\\\\n";
    std::cout << "----------------------------------------------------------------\\\\n";
    std::cout << "1. బ్యాలెన్స్ ఎంక్వైరీ (Check Balance)\\\\n";
    std::cout << "2. నగదు ఉపసంహరణ (Withdraw Cash)\\\\n";
    std::cout << "3. నగదు డిపాజిట్ (Deposit Cash)\\\\n";
    std::cout << "4. ఏటీఎం పిన్ మార్పు (Change PIN)\\\\n";
    std::cout << "5. మినీ స్టేట్‌మెంట్ (Mini Statement)\\\\n";
    std::cout << "6. లావాదేవీ ముగింపు (Exit Session)\\\\n";
    std::cout << "================================================================\\\\n";

    int selectedOptionInt = 2;
    std::cout << "ఎంచుకున్న లావాదేవీ ఆప్షన్: " << selectedOptionInt << "\\\\n\\\\n";

    switch (auto opt = static_cast<ATMOption>(selectedOptionInt); opt) {
        case ATMOption::CheckBalance: {
            std::cout << "💰 [బ్యాలెన్స్ విచారణ]:\\\\n";
            std::cout << "మీ ఖాతాలో ప్రస్తుతం అందుబాటులో ఉన్న బ్యాలెన్స్: ₹ " << accountBalance << '\\\\n';
            break;
        }

        case ATMOption::WithdrawCash: {
            double withdrawAmount = 15000.00;
            std::cout << "💵 [నగదు ఉపసంహరణ ప్రక్రియ]:\\\\n";
            std::cout << "కోరిన నగదు మొత్తం: ₹ " << withdrawAmount << '\\\\n';

            if (withdrawAmount > dailyWithdrawalLimit) {
                std::cout << "❌ తిరస్కరణ: మీ రోజువారీ ఉపసంహరణ పరిమితి (₹ " << dailyWithdrawalLimit << ") దాటింది!\\\\n";
            } else if (withdrawAmount > accountBalance) {
                std::cout << "❌ తిరస్కరణ: మీ ఖాతాలో సరిపడా బ్యాలెన్స్ లేదు!\\\\n";
            } else {
                accountBalance -= withdrawAmount;
                std::cout << "✅ లావాదేవీ విజయవంతమైంది! నగదును క్యాష్ డిస్పెన్సర్ నుండి తీసుకోండి.\\\\n";
                std::cout << "మిగిలిన బ్యాలెన్స్: ₹ " << accountBalance << '\\\\n';

                AuditLevel alert = AuditLevel::Financial;
                std::cout << "\\\\n[ఆటోమేటెడ్ సెక్యూరిటీ ఆడిట్ లాగింగ్ ఫ్లో]:\\\\n";
                switch (alert) {
                    case AuditLevel::HighSecurity:
                        std::cout << "  🚨 [ALERT 1]: బ్యాంక్ ఫ్రాడ్ డిటెక్షన్ సిస్టమ్‌కు సమాచారం చేరింది.\\\\n";
                        [[fallthrough]];
                    case AuditLevel::Financial:
                        std::cout << "  💳 [ALERT 2]: మీ రిజిస్టర్డ్ మొబైల్‌కు డెబిట్ SMS పంపబడింది.\\\\n";
                        [[fallthrough]];
                    case AuditLevel::Standard:
                        std::cout << "  📝 [ALERT 3]: లావాదేవీ సర్వర్ డేటాబేస్ జర్నల్ లో రికార్డ్ అయింది.\\\\n";
                        break;
                }
            }
            break;
        }

        case ATMOption::DepositCash: {
            double depositAmount = 5000.00;
            accountBalance += depositAmount;
            std::cout << "📥 నగదు డిపాజిట్ విజయవంతమైంది! జమ అయిన మొత్తం: ₹ " << depositAmount << '\\\\n';
            std::cout << "నవీకరించబడిన బ్యాలెన్స్: ₹ " << accountBalance << '\\\\n';
            break;
        }

        case ATMOption::ChangePin: {
            int newPin = 9182;
            accountPin = newPin;
            std::cout << "🔐 మీ ఏటీఎం పిన్ విజయవంతంగా మార్చబడింది! కొత్త పిన్: " << accountPin << '\\\\n';
            break;
        }

        case ATMOption::MiniStatement: {
            std::cout << "📄 [గత 3 లావాదేవీల మినీ స్టేట్‌మెంట్]:\\\\n";
            std::cout << "  1. 28-Oct: UPI డెబిట్ - ₹ 450.00 (Swiggy)\\\\n";
            std::cout << "  2. 29-Oct: జీతం క్రెడిట్ - ₹ 65,000.00 (TCS Ltd)\\\\n";
            std::cout << "  3. 01-Nov: ATM డెబిట్ - ₹ 15,000.00\\\\n";
            break;
        }

        case ATMOption::ExitSession: {
            std::cout << "👋 లావాదేవీ ముగిసింది. మీ ఏటీఎం కార్డును తీసుకోండి. మళ్లీ రండి!\\\\n";
            break;
        }

        default: {
            std::cout << "⚠️ అమాన్యమైన ఆప్షన్! దయచేసి స్క్రీన్‌పై ఉన్న 1 నుండి 6 వరకు గల నంబర్లను మాత్రమే ఎంచుకోండి.\\\\n";
            break;
        }
    }

    std::cout << "================================================================\\\\n";
    std::cout << "      SBI తో బ్యాంకింగ్ చేసినందుకు ధన్యవాదాలు! శుభదినం!       \\\\n";
    std::cout << "================================================================\\\\n";

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
fs.writeFileSync(outputPath, chapter06Content, 'utf8');
console.log('✅ Successfully generated deep high-value C++ Chapter 06!');
console.log('Target file:', currentLesson.file);
console.log('Target file size:', chapter06Content.length, 'characters');
