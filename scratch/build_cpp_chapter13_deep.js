const fs = require('fs');
const path = require('path');
const { LESSONS, buildSidebar } = require('./cpp_curriculum_data.js');

const currentLesson = LESSONS[12]; // Chapter 13 (0-indexed 12)
const sidebarHtml = buildSidebar(13);

const chapter13Content = `<!DOCTYPE html>
<html class="light-theme" lang="te">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${currentLesson.title} — Modern C++ Tutorial | Our Compiler</title>
  <meta name="description" content="C++ క్లాసెస్, ఆబ్జెక్ట్స్ మరియు డేటా ఎన్‌క్యాప్సులేషన్ సమగ్ర మాస్టర్‌క్లాస్ తెలుగులో: Class vs Struct, Access Specifiers (public, private, protected), Getters & Setters, this పాయింటర్, const Member Functions, Static Members, మరియు Enterprise Banking Ledger Engine ప్రాజెక్ట్." />
  <meta name="keywords" content="c++ classes in telugu, c++ objects telugu, encapsulation in c++, class vs struct c++, this pointer c++, const member functions, static members c++, learn c++ in telugu, our compiler" />
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
    "headline": "${currentLesson.title} (Mastering C++ Classes, Objects and Encapsulation in Telugu)",
    "description": "C++ క్లాసెస్ & ఆబ్జెక్ట్స్ పూర్తి గైడ్: Class vs Struct, Access Specifiers, this Pointer, Const Functions, Static Members, మరియు Enterprise Core Banking ప్రాజెక్ట్.",
    "articleSection": "Phase 4: Object-Oriented Programming (OOP)",
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
    "datePublished": "2026-02-13",
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
        'sizeof','typedef','enum','explicit','friend','operator','typeid','this','mutable'
      ];
      const kwRegex = new RegExp('\\\\b(' + kwList.join('|') + ')\\\\b', 'g');
      code = code.replace(kwRegex, m => pushToken('kw', m));

      const fnList = [
        'std','cout','cin','endl','cerr','clog','string','vector','array',
        'main','printf','fixed','setprecision','setw'
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
      <span class="current">Chapter 13: ${currentLesson.title}</span>
    </div>

    <!-- PAGE TITLE -->
    <h1 class="page-title">${currentLesson.title}</h1>

    <!-- PAGE META BADGES -->
    <div class="page-meta">
      <span class="badge">🌐 Modern C++ (C++20/C++17)</span>
      <span class="badge">🟢 Chapter 13 of 20</span>
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
      <p>కంప్యూటర్ ప్రోగ్రామింగ్ చరిత్రలో అతిపెద్ద మైలురాయి: <strong>ఆబ్జెక్ట్ ఓరియెంటెడ్ ప్రోగ్రామింగ్ (Object-Oriented Programming - OOP)</strong>. సాంప్రదాయ ప్రొసీజరల్ భాషల్లో (C వంటివి) డేటా వేరుగా, ఆ డేటాపై పనిచేసే ఫంక్షన్లు వేరుగా ఉండేవి. దీనివల్ల ప్రాజెక్ట్ పరిమాణం పెరిగేకొద్దీ కోడ్ నియంత్రణ కోల్పోయి భారీ గందరగోళం ఏర్పడేది.</p>
      <p>ఈ సమస్యకు పరిష్కారంగానే C++ సృష్టికర్త Bjarne Stroustrup "C with Classes" అనే కాన్సెప్ట్‌తో C++ ను అభివృద్ధి చేశారు. నిజ జీవిత వస్తువులైన కార్లు, బ్యాంక్ ఖాతాలు, యూజర్లు, గేమ్ క్యారెక్టర్లను ప్రోగ్రామ్‌లో మోడల్ చేయడానికి <strong>క్లాసెస్ (Classes)</strong> మరియు <strong>ఆబ్జెక్ట్స్ (Objects)</strong> పునాదిగా నిలుస్తాయి. అంతేకాకుండా అనధికారిక వ్యక్తులు మన డేటాను తారుమారు చేయకుండా కాపాడే అత్యంత శక్తివంతమైన రక్షణ కవచమే <strong>డేటా ఎన్‌క్యాప్సులేషన్ (Encapsulation)</strong>.</p>
      <p>ఈ లోతైన మాస్టర్‌క్లాస్‌లో మనం Class vs Struct అంతర్గత తేడాలు, Access Specifiers (public, private, protected), Getters &amp; Setters ద్వారా Data Invariants ను కాపాడటం, <code>this</code> పాయింటర్ మెకానిక్స్, <code>const</code> మెంబర్ ఫంక్షన్లు, <code>static</code> క్లాస్ లెవెల్ డేటా, మరియు పూర్తి స్థాయి <em>"Enterprise Core Banking Account &amp; Ledger Engine"</em> ప్రాజెక్ట్‌ను లైవ్‌గా నిర్మించి ప్రావీణ్యం సంపాదిద్దాం!</p>
    </div>

    <!-- SECTION 1 -->
    <section>
      <h2 class="section-title"><span class="num">1</span> ప్రొసీజరల్ వర్సెస్ ఆబ్జెక్ట్-ఓరియెంటెడ్ ప్రోగ్రామింగ్ (The OOP Paradigm Shift)</h2>
      <p>
        సాఫ్ట్‌వేర్ నిర్మాణ శైలిలో రెండు ప్రధాన ఆలోచనా విధానాలు (Paradigms) ఉన్నాయి:
      </p>
      <ul>
        <li>
          <strong>ప్రొసీజరల్ ప్రోగ్రామింగ్ (Procedural Programming - C, Pascal):</strong> ఇక్కడ ప్రాధాన్యత <em>"పని ఎలా జరగాలి?"</em> (Functions &amp; Steps) అనే దానిపై ఉంటుంది. డేటా అంతా గ్లోబల్ వేరియబుల్స్ లేదా స్ట్రక్చర్లలో బహిరంగంగా ఉంటుంది. ఎవరైనా, ఎక్కడి నుంచైనా ఆ డేటాను నేరుగా మార్చేయవచ్చు. ప్రాజెక్ట్ 10 లక్షల లైన్లకు చేరినప్పుడు ఏ ఫంక్షన్ డేటాను పాడుచేసిందో కనిపెట్టడం అసాధ్యం అవుతుంది.
        </li>
        <li>
          <strong>ఆబ్జెక్ట్ ఓరియెంటెడ్ ప్రోగ్రామింగ్ (OOP - C++, Java, C#):</strong> ఇక్కడ ప్రాధాన్యత <em>"ఎవరు పని చేస్తున్నారు? డేటా ఎవరి వద్ద సురక్షితంగా ఉంది?"</em> (Objects &amp; Data Ownership) అనే దానిపై ఉంటుంది. డేటాను మరియు ఆ డేటాపై పనిచేసే ఫంక్షన్లను ఒకే యూనిట్ (Class) లోపల బంధిస్తాం.
        </li>
      </ul>

      <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px; margin:20px 0; font-family:'JetBrains Mono', monospace; font-size:13px; line-height:1.6;">
        <div style="font-weight:bold; color:#10b981; margin-bottom:10px;">[The 4 Pillars of Object-Oriented Programming]</div>
        1. <strong>Encapsulation (ఎన్‌క్యాప్సులేషన్)</strong>: Binding Data + Functions into a single capsule &amp; Information Hiding.<br/>
        2. <strong>Abstraction (అబ్‌స్ట్రాక్షన్)</strong>: Exposing only the essential interface while hiding internal implementation details.<br/>
        3. <strong>Inheritance (ఇన్హెరిటెన్స్)</strong>: Code reusability by creating specialized classes from base classes.<br/>
        4. <strong>Polymorphism (పాలిమార్ఫిజమ్)</strong>: One single interface with multiple dynamic implementations (Virtual functions).
      </div>
    </section>

    <!-- SECTION 2 -->
    <section>
      <h2 class="section-title"><span class="num">2</span> క్లాస్ మరియు ఆబ్జెక్ట్ అంటే ఏమిటి? (Blueprint vs Instance)</h2>
      <p>
        క్లాస్ మరియు ఆబ్జెక్ట్ మధ్య తేడాను అర్థం చేసుకోవడానికి ఒక రియల్ వరల్డ్ ఉదాహరణ చూద్దాం:
      </p>
      <ul>
        <li><strong>క్లాస్ (Class):</strong> ఒక ఇంటిని నిర్మించడానికి ఇంజనీర్ గీసిన <em>బ్లూప్రింట్ లేదా మ్యాప్ (Blueprint)</em> వంటిది. బ్లూప్రింట్ అనేది కేవలం కాగితం మీద డిజైన్ మాత్రమే; అది నిజంగా భూమిపై స్థలాన్ని ఆక్రమించదు.</li>
        <li><strong>ఆబ్జెక్ట్ (Object):</strong> ఆ బ్లూప్రింట్ ఆధారంగా ఇటుకలు, సిమెంట్ ఉపయోగించి భూమిపై నిర్మించిన <em>నిజమైన ఇల్లు (Real House)</em>. అది నిజమైన స్థలాన్ని ఆక్రమిస్తుంది. ఒకే బ్లూప్రింట్ ఆధారంగా మనం 100 వేర్వేరు ఇళ్లను నిర్మించవచ్చు!</li>
      </ul>
      <p>
        కంప్యూటర్ పరిభాషలో: <strong>క్లాస్ అనేది ఒక యూజర్-డిఫైన్డ్ డేటా టైప్</strong>; మరియు <strong>ఆబ్జెక్ట్ అనేది RAM లో మెమరీ కేటాయించబడిన ఆ క్లాస్ యొక్క ఉనికి (Instance)</strong>.
      </p>

      <div class="code-block">
        <div class="code-header">
          <span class="file-name">class_object_basics.cpp</span>
          <div class="btn-group">
            <button class="btn btn-copy" onclick="copyCode(this)">📋 Copy</button>
            <button class="btn btn-run" onclick="runCodeInCompiler(this)">▶ Run</button>
          </div>
        </div>
        <pre><code>#include &lt;iostream&gt;
#include &lt;string&gt;

// క్లాస్ డిక్లరేషన్ (బ్లూప్రింట్)
class ElectricCar {
public:
    std::string model;
    int batteryCapacity; // kWh
    int speed;

    void accelerate(int increase) {
        speed += increase;
        std::cout << model << " వేగం " << speed << " km/h కి పెరిగింది!\\n";
    }
}; // ⚠️ క్లాస్ చివర సెమికోలన్ (;) తప్పనిసరి!

int main() {
    // ఆబ్జెక్ట్‌ల సృష్టి (Instances in RAM)
    ElectricCar car1;
    car1.model = "Tata Nexon EV";
    car1.batteryCapacity = 40;
    car1.speed = 0;

    ElectricCar car2;
    car2.model = "Tesla Model 3";
    car2.batteryCapacity = 75;
    car2.speed = 0;

    std::cout << "car1 మోడల్: " << car1.model << " (RAM అడ్రస్: " << &car1 << ")\\n";
    std::cout << "car2 మోడల్: " << car2.model << " (RAM అడ్రస్: " << &car2 << ")\\n";

    car1.accelerate(40);
    car2.accelerate(80);
    return 0;
}</code></pre>
      </div>
    </section>

    <!-- SECTION 3 -->
    <section>
      <h2 class="section-title"><span class="num">3</span> C++ లో <code>class</code> వర్సెస్ <code>struct</code> లోతైన వ్యత్యాసం</h2>
      <p>
        చాలా మంది బిగినర్స్ <code>struct</code> అనేది డేటా కోసమేనని, <code>class</code> ఫంక్షన్ల కోసమని పొరబడుతుంటారు. కానీ C++ లో <code>struct</code> మరియు <code>class</code> రెండూ సమానమైన శక్తులను కలిగి ఉంటాయి — రెంటిలోనూ మెంబర్ ఫంక్షన్లు, కన్‌స్ట్రక్టర్లు, ఇన్హెరిటెన్స్ అన్నీ ఉంటాయి!
      </p>
      <p>
        <strong>అయితే వాటి మధ్య ఉన్న ఏకైక వ్యత్యాసం ఏమిటి?</strong>
      </p>
      <div style="background:var(--bg3); border-left:4px solid #10b981; padding:12px 16px; margin:16px 0; font-size:14px;">
        <strong>Default Access Specifier:</strong><br/>
        • <code>struct</code> లో మీరు ఏమీ పేర్కొనకపోతే అన్ని మెంబర్లు డిఫాల్ట్‌గా <strong><code>public</code></strong> అవుతాయి.<br/>
        • <code>class</code> లో మీరు ఏమీ పేర్కొనకపోతే అన్ని మెంబర్లు డిఫాల్ట్‌గా <strong><code>private</code></strong> అవుతాయి!
      </div>

      <table class="tbl">
        <thead>
          <tr>
            <th>ఫీచర్</th>
            <th><code>struct</code></th>
            <th><code>class</code></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>డిఫాల్ట్ యాక్సెస్</strong></td>
            <td><code>public</code> (అందరికీ ఓపెన్)</td>
            <td><code>private</code> (బయటి నుండి దాచబడుతుంది)</td>
          </tr>
          <tr>
            <td><strong>డిఫాల్ట్ ఇన్హెరిటెన్స్</strong></td>
            <td><code>public inheritance</code></td>
            <td><code>private inheritance</code></td>
          </tr>
          <tr>
            <td><strong>ఇండస్ట్రీ కన్వెన్షన్</strong></td>
            <td>POD (Plain Old Data) లేదా కేవలం పబ్లిక్ డేటా ఫీల్డ్స్ కలెక్షన్</td>
            <td>ఎన్‌క్యాప్సులేషన్, ప్రైవేట్ డేటా మరియు ఇన్వేరియంట్స్ ఉన్న కాంప్లెక్స్ బిజినెస్ లాజిక్</td>
          </tr>
        </tbody>
      </table>
    </section>

    <!-- SECTION 4 -->
    <section>
      <h2 class="section-title"><span class="num">4</span> Access Specifiers: <code>public</code>, <code>private</code>, మరియు <code>protected</code></h2>
      <p>
        క్లాస్ లోపల ఉన్న వేరియబుల్స్ మరియు ఫంక్షన్లను ఎవరు యాక్సెస్ చేయవచ్చో నియంత్రించడానికి C++ మూడు <strong>Access Specifiers</strong> ను అందిస్తుంది:
      </p>

      <ol>
        <li>
          <strong><code>public:</code></strong> బహిరంగ ప్రవేశం. క్లాస్ లోపల మరియు క్లాస్ వెలుపల ప్రోగ్రామ్‌లోని ఏ ఫంక్షన్ అయినా వీటిని నేరుగా యాక్సెస్ చేయవచ్చు.
        </li>
        <li>
          <strong><code>private:</code></strong> అంతర్గత ప్రవేశం (Secret). కేవలం ఆ క్లాస్ లోపల ఉన్న మెంబర్ ఫంక్షన్లు మాత్రమే వీటిని తాకగలవు. క్లాస్ వెలుపల నుండి యాక్సెస్ చేయడానికి ప్రయత్నిస్తే కంపైలేషన్ ఎర్రర్ వస్తుంది.
        </li>
        <li>
          <strong><code>protected:</code></strong> వారసత్వ ప్రవేశం. ఆ క్లాస్ మరియు దాని నుండి పుట్టిన చైల్డ్ క్లాసులు (Derived Classes) మాత్రమే యాక్సెస్ చేయగలవు. బాహ్య ప్రపంచానికి ఇది ప్రైవేట్ వలె రక్షించబడుతుంది.
        </li>
      </ol>

      <div class="code-block">
        <div class="code-header">
          <span class="file-name">access_specifiers_demo.cpp</span>
          <div class="btn-group">
            <button class="btn btn-copy" onclick="copyCode(this)">📋 Copy</button>
            <button class="btn btn-run" onclick="runCodeInCompiler(this)">▶ Run</button>
          </div>
        </div>
        <pre><code>#include &lt;iostream&gt;
#include &lt;string&gt;

class BankVault {
private:
    double totalCash; // ప్రైవేట్ - బయట వారు నేరుగా మార్చలేరు!

public:
    std::string branchName; // పబ్లిక్ - అందరూ చూడవచ్చు

    void deposit(double amount) {
        if (amount > 0) {
            totalCash += amount;
            std::cout << "₹ " << amount << " జమ చేయబడింది.\\n";
        }
    }

    void showBalance() {
        std::cout << branchName << " మొత్తం నగదు: ₹ " << totalCash << "\\n";
    }
};

int main() {
    BankVault vault;
    vault.branchName = "Hyderabad Main Branch"; // సవ్యమైనది (public)

    // vault.totalCash = 100000000; // ❌ కంపైలర్ ఎర్రర్! 'totalCash' is private!
    vault.deposit(50000);          // సవ్యమైనది! పబ్లిక్ మెథడ్ ద్వారా మాత్రమే డిపాజిట్ సాధ్యం
    vault.showBalance();
    return 0;
}</code></pre>
      </div>
    </section>

    <!-- SECTION 5 -->
    <section>
      <h2 class="section-title"><span class="num">5</span> డేటా ఎన్‌క్యాప్సులేషన్ (Data Encapsulation) &amp; Getters / Setters</h2>
      <p>
        <strong>ఎన్‌క్యాప్సులేషన్ అంటే ఏమిటి?</strong> డేటాను (State) మరియు ఆ డేటాపై పనిచేసే ఫంక్షన్లను (Behavior) ఒకే క్లాస్ క్యాప్సూల్‌లో బంధించి, సున్నితమైన డేటాను <code>private</code> గా దాచిపెట్టడాన్నే ఎన్‌క్యాప్సులేషన్ అంటాం.
      </p>
      <p>
        <strong>డేటాను ప్రైవేట్‌గా ఎందుకు ఉంచాలి?</strong> ఆలోచించండి: ఒక బ్యాంక్ అకౌంట్‌లో <code>balance</code> అనేది పబ్లిక్ అయితే, ఎవరైనా పొరపాటున <code>acc.balance = -50000;</code> అని రాయవచ్చు! లేదా ఒక మనిషి వయస్సు <code>person.age = -15;</code> అని మార్చేయవచ్చు.
      </p>
      <p>
        దీనిని నివారించడానికి మనం డేటా మెంబర్లను <code>private</code> గా ఉంచి, వాటిని చదవడానికి <strong>Getters</strong> మరియు సరైన నిబంధనలను (Validation Logic) తనిఖీ చేసి మార్చడానికి <strong>Setters</strong> ను ఉపయోగిస్తాం.
      </p>

      <div class="code-block">
        <div class="code-header">
          <span class="file-name">encapsulation_getters_setters.cpp</span>
          <div class="btn-group">
            <button class="btn btn-copy" onclick="copyCode(this)">📋 Copy</button>
            <button class="btn btn-run" onclick="runCodeInCompiler(this)">▶ Run</button>
          </div>
        </div>
        <pre><code>#include &lt;iostream&gt;
#include &lt;string&gt;

class Employee {
private:
    std::string empName;
    double monthlySalary;

public:
    // Getter ఫంక్షన్ (Read-Only)
    std::string getName() const {
        return empName;
    }

    double getSalary() const {
        return monthlySalary;
    }

    // Setter ఫంక్షన్ విత్ బిజినెస్ వాలిడేషన్
    void setName(const std::string& name) {
        if (!name.empty()) {
            empName = name;
        }
    }

    void setSalary(double salary) {
        if (salary >= 15000.0) { // కనీస వేతన రూల్
            monthlySalary = salary;
        } else {
            std::cout << "⚠️ హెచ్చరిక: వేతనం కనీసం ₹ 15,000 ఉండాలి! తిరస్కరించబడింది.\\n";
        }
    }
};

int main() {
    Employee emp;
    emp.setName("Suresh Raina");
    emp.setSalary(50000.0);

    std::cout << "ఉద్యోగి: " << emp.getName() << " | జీతం: ₹ " << emp.getSalary() << "\\n";

    emp.setSalary(-500); // వాలిడేషన్ ఫెయిల్ అవుతుంది, డేటా కరప్ట్ కాదు!
    return 0;
}</code></pre>
      </div>
    </section>

    <!-- SECTION 6 -->
    <section>
      <h2 class="section-title"><span class="num">6</span> <code>this</code> పాయింటర్ అంతర్గత మెకానిక్స్ (The Implicit Instance Pointer)</h2>
      <p>
        C++ లో ప్రతి నాన్-స్టాటిక్ మెంబర్ ఫంక్షన్ లోపల కంపైలర్ అదృశ్యంగా ఒక ప్రత్యేకమైన పాయింటర్‌ను పాస్ చేస్తుంది. దాని పేరే <strong><code>this</code> పాయింటర్</strong>.
      </p>
      <p>
        <code>this</code> పాయింటర్ లక్షణాలు:
      </p>
      <ul>
        <li>ఇది ఏ ఆబ్జెక్ట్ ద్వారా అయితే ఫంక్షన్ పిలువబడిందో, ఆ ప్రస్తుత ఆబ్జెక్ట్ యొక్క ఖచ్చితమైన మెమరీ చిరునామాను కలిగి ఉంటుంది (Type: <code>ClassName* const this</code>).</li>
        <li><strong>పేర్ల గందరగోళం (Name Shadowing) నివారణ:</strong> ఫంక్షన్ పారామీటర్ పేరు మరియు క్లాస్ మెంబర్ వేరియబుల్ పేరు ఒకటే అయినప్పుడు, క్లాస్ వేరియబుల్‌ను స్పష్టంగా సూచించడానికి <code>this-&gt;variable = variable;</code> అని రాస్తాం.</li>
        <li><strong>మెథడ్ చైనింగ్ (Method Chaining / Fluent API):</strong> ఒక ఫంక్షన్ నుండి ప్రస్తుత ఆబ్జెక్ట్‌ను రిటర్న్ చేయడానికి <code>return *this;</code> వాడతాం. దీనివల్ల <code>obj.setA(10).setB(20).execute();</code> వంటి అందమైన ఫ్లూయెంట్ కోడ్ రాయవచ్చు.</li>
      </ul>

      <div class="code-block">
        <div class="code-header">
          <span class="file-name">this_pointer_chaining.cpp</span>
          <div class="btn-group">
            <button class="btn btn-copy" onclick="copyCode(this)">📋 Copy</button>
            <button class="btn btn-run" onclick="runCodeInCompiler(this)">▶ Run</button>
          </div>
        </div>
        <pre><code>#include &lt;iostream&gt;

class OrderBuilder {
private:
    int itemsCount = 0;
    double totalPrice = 0.0;

public:
    // Method Chaining కొరకు Reference to *this రిటర్న్ చేస్తున్నాం
    OrderBuilder& addItem(double price) {
        this->itemsCount++; // this-> ద్వారా మెంబర్ వేరియబుల్ యాక్సెస్
        this->totalPrice += price;
        return *this; // ప్రస్తుత ఆబ్జెక్ట్ రిఫరెన్స్ రిటర్న్
    }

    OrderBuilder& applyDiscount(double discountPercentage) {
        this->totalPrice -= (this->totalPrice * (discountPercentage / 100.0));
        return *this;
    }

    void printSummary() const {
        std::cout << "ఆర్డర్ సారాంశం: " << this->itemsCount << " వస్తువులు | మొత్తం బిల్: ₹ " << this->totalPrice << "\\n";
        std::cout << "ఆబ్జెక్ట్ మెమరీ అడ్రస్ (this): " << this << "\\n";
    }
};

int main() {
    OrderBuilder order;
    // ఫ్లూయెంట్ మెథడ్ చైనింగ్ డెమో!
    order.addItem(1200.0)
         .addItem(800.0)
         .addItem(500.0)
         .applyDiscount(10.0)
         .printSummary();

    return 0;
}</code></pre>
      </div>
    </section>

    <!-- SECTION 7 -->
    <section>
      <h2 class="section-title"><span class="num">7</span> <code>const</code> మెంబర్ ఫంక్షన్లు (Const Correctness in Classes)</h2>
      <p>
        ఒక మెంబర్ ఫంక్షన్ కేవలం ఆబ్జెక్ట్ లోపల ఉన్న డేటాను చదవడానికి (Read-Only) మాత్రమే ఉద్దేశించబడినప్పుడు, ఆ ఫంక్షన్ డిక్లరేషన్ చివర <strong><code>const</code></strong> కీవర్డ్ చేర్చడం C++ లో ఒక సువర్ణ నియమం.
      </p>
      <pre><code>double getBalance() const; // ఈ ఫంక్షన్ ఏ వేరియబుల్ నూ సవరించదు అని కంపైలర్ ప్రామిస్!</code></pre>
      <p>
        <strong>దీనివల్ల ప్రయోజనాలు ఏమిటి?</strong>
      </p>
      <ol>
        <li>పొరపాటున ఆ ఫంక్షన్ లోపల ఏదైనా వేరియబుల్‌ను మార్చడానికి ప్రయత్నిస్తే కంపైలర్ వెంటనే లోపాన్ని పట్టిస్తుంది.</li>
        <li>మనం ఒక ఆబ్జెక్ట్‌ను <code>const MyClass&amp; obj</code> రూపంలో జీరో-కాపీగా ఫంక్షన్లకు పాస్ చేసినప్పుడు, ఆ <code>const</code> ఆబ్జెక్ట్ కేవలం <code>const</code> మెంబర్ ఫంక్షన్లను మాత్రమే పిలవగలదు! నాన్-కాన్స్ట్ ఫంక్షన్లను పిలిస్తే కంపైలేషన్ ఎర్రర్ వస్తుంది.</li>
      </ol>

      <div class="code-block">
        <div class="code-header">
          <span class="file-name">const_member_functions.cpp</span>
          <div class="btn-group">
            <button class="btn btn-copy" onclick="copyCode(this)">📋 Copy</button>
            <button class="btn btn-run" onclick="runCodeInCompiler(this)">▶ Run</button>
          </div>
        </div>
        <pre><code>#include &lt;iostream&gt;

class SensorMonitor {
private:
    double temperature;
    mutable int accessCounter = 0; // mutable: const ఫంక్షన్ లోనూ మార్చవచ్చు!

public:
    void setTemperature(double temp) {
        temperature = temp;
    }

    // const మెంబర్ ఫంక్షన్
    double readTemperature() const {
        accessCounter++; // mutable వేరియబుల్ కాబట్టి మార్చడం అనుమతించబడుతుంది (లాగింగ్ కొరకు)
        // temperature += 1.0; // ❌ కంపైలర్ ఎర్రర్! const ఫంక్షన్ లో మెంబర్లను మార్చలేము!
        return temperature;
    }

    int getAccessCount() const { return accessCounter; }
};

void inspectSensor(const SensorMonitor& sensor) {
    // sensor అనేది const reference, కాబట్టి readTemperature() మాత్రమే కాల్ అవుతుంది
    std::cout << "సెన్సార్ ఉష్ణోగ్రత రీడింగ్: " << sensor.readTemperature() << " °C\\n";
}

int main() {
    SensorMonitor sm;
    sm.setTemperature(36.5);
    inspectSensor(sm);
    return 0;
}</code></pre>
      </div>
    </section>

    <!-- SECTION 8 -->
    <section>
      <h2 class="section-title"><span class="num">8</span> స్టాటిక్ మెంబర్లు: <code>static</code> వేరియబుల్స్ &amp; <code>static</code> ఫంక్షన్లు</h2>
      <p>
        సాధారణంగా క్లాస్ లోపల ఉండే వేరియబుల్స్ ప్రతి ఆబ్జెక్ట్‌కు విడివిడిగా మెమరీలో సృష్టించబడతాయి (ఉదాహరణకు 10 మంది కస్టమర్ ఆబ్జెక్టులు ఉంటే 10 వేర్వేరు <code>balance</code> లు ఉంటాయి).
      </p>
      <p>
        కానీ క్లాస్ మొత్తానికి కలిపి <strong>ఉమ్మడిగా ఒకే ఒక్క వేరియబుల్</strong> ఉండాలనుకుంటే మనం <strong><code>static</code></strong> కీవర్డ్‌ను ఉపయోగిస్తాం!
      </p>
      <ul>
        <li><strong>Static Member Variables:</strong> ఆబ్జెక్ట్‌తో సంబంధం లేకుండా క్లాస్ మొత్తానికి గ్లోబల్ మెమరీలో ఒకే కాపీ ఉంటుంది. మొత్తం ఆబ్జెక్టుల సంఖ్యను లెక్కించడానికి, లేదా షేర్డ్ కాన్ఫిగరేషన్‌ను ఉంచడానికి ఇది వాడతాం.</li>
        <li><strong>Static Member Functions:</strong> వీటిని పిలవడానికి ఏ ఆబ్జెక్ట్ అవసరం లేదు! నేరుగా క్లాస్ పేరుతో పిలవవచ్చు (<code>ClassName::staticMethod()</code>). వీటికి <code>this</code> పాయింటర్ ఉండదు, అందువల్ల ఇవి కేవలం ఇతర స్టాటిక్ వేరియబుల్స్‌ను మాత్రమే యాక్సెస్ చేయగలవు.</li>
      </ul>

      <div class="code-block">
        <div class="code-header">
          <span class="file-name">static_members_demo.cpp</span>
          <div class="btn-group">
            <button class="btn btn-copy" onclick="copyCode(this)">📋 Copy</button>
            <button class="btn btn-run" onclick="runCodeInCompiler(this)">▶ Run</button>
          </div>
        </div>
        <pre><code>#include &lt;iostream&gt;
#include &lt;string&gt;

class UserAccount {
private:
    std::string username;

    // C++17 inline static ద్వారా క్లాస్ లోపలే డైరెక్ట్ ఇనిషియలైజేషన్!
    inline static int totalActiveUsers = 0;

public:
    UserAccount(std::string name) : username(name) {
        totalActiveUsers++;
        std::cout << "  [యూజర్ క్రియేట్ చేయబడ్డాడు]: " << username << "\\n";
    }

    ~UserAccount() {
        totalActiveUsers--;
        std::cout << "  [యూజర్ తొలగించబడ్డాడు]: " << username << "\\n";
    }

    // Static మెంబర్ ఫంక్షన్
    static int getActiveUserCount() {
        // username = "test"; // ❌ ఎర్రర్! static ఫంక్షన్ లో non-static వేరియబుల్స్ వాడలేము!
        return totalActiveUsers;
    }
};

int main() {
    std::cout << "ప్రారంభ యూజర్ల కౌంట్: " << UserAccount::getActiveUserCount() << "\\n";

    UserAccount u1("Chaitanya");
    UserAccount u2("Bhavana");
    std::cout << "ప్రస్తుత యూజర్ల కౌంట్: " << UserAccount::getActiveUserCount() << "\\n";

    {
        UserAccount u3("Divya");
        std::cout << "స్కోప్ లోపల యూజర్ల కౌంట్: " << UserAccount::getActiveUserCount() << "\\n";
    } // u3 డిస్ట్రక్ట్ అవుతుంది

    std::cout << "స్కోప్ వెలుపల యూజర్ల కౌంట్: " << UserAccount::getActiveUserCount() << "\\n";
    return 0;
}</code></pre>
      </div>
    </section>

    <!-- SECTION 9 -->
    <section>
      <h2 class="section-title"><span class="num">9</span> క్లాస్ డెఫినిషన్ ఇన్సైడ్ వర్సెస్ అవుట్‌సైడ్ (Scope Resolution <code>::</code>)</h2>
      <p>
        ప్రొఫెషనల్ ఎంటర్‌ప్రైజ్ C++ కోడ్‌బేస్‌లలో క్లాస్ లోపలే అన్ని ఫంక్షన్ల కోడ్‌ను రాయడం అస్సలు మంచి పద్ధతి కాదు. దానివల్ల క్లాస్ హెడర్ ఫైల్ భారీగా మారి చదవడానికి కష్టమవుతుంది.
      </p>
      <p>
        అందువల్ల క్లాస్ లోపల కేవలం <strong>ఫంక్షన్ ప్రోటోటైప్స్ (డిక్లరేషన్స్)</strong> మాత్రమే రాసి, వాటి పూర్తి ఇంప్లిమెంటేషన్‌ను క్లాస్ వెలుపల <strong>Scope Resolution Operator (<code>::</code>)</strong> ద్వారా రాస్తాం.
      </p>

      <div class="code-block">
        <div class="code-header">
          <span class="file-name">scope_resolution_demo.cpp</span>
          <div class="btn-group">
            <button class="btn btn-copy" onclick="copyCode(this)">📋 Copy</button>
            <button class="btn btn-run" onclick="runCodeInCompiler(this)">▶ Run</button>
          </div>
        </div>
        <pre><code>#include &lt;iostream&gt;

class Calculator {
private:
    double lastResult;

public:
    Calculator(); // కన్‌స్ట్రక్టర్ డిక్లరేషన్
    double add(double a, double b); // మెంబర్ ఫంక్షన్ డిక్లరేషన్
    void printHistory() const;
};

// క్లాస్ వెలుపల Scope Resolution Operator (::) తో బాడీ రాయడం:
Calculator::Calculator() : lastResult(0.0) {}

double Calculator::add(double a, double b) {
    lastResult = a + b;
    return lastResult;
}

void Calculator::printHistory() const {
    std::cout << "గతంలో గణించిన తాజా ఫలితం: " << lastResult << "\\n";
}

int main() {
    Calculator calc;
    std::cout << "సంకలనం (15 + 25): " << calc.add(15, 25) << "\\n";
    calc.printHistory();
    return 0;
}</code></pre>
      </div>
    </section>

    <!-- SECTION 10 -->
    <section>
      <h2 class="section-title"><span class="num">10</span> క్లాస్ ఆబ్జెక్ట్ సైజ్, మెమరీ ప్యాడింగ్ &amp; ఎంప్టీ క్లాస్</h2>
      <p>
        ఒక క్లాస్ ఆబ్జెక్ట్ RAM లో ఎంత మెమరీని ఆక్రమిస్తుంది?
      </p>
      <ul>
        <li><strong>మెంబర్ ఫంక్షన్లు మెమరీని ఆక్రమించవు:</strong> ఒక క్లాస్‌లో 100 ఫంక్షన్లు ఉన్నా, అవి కోడ్ సెగ్మెంట్ (Text Segment) లో ఉంటాయి తప్ప ఆబ్జెక్ట్ సైజ్‌ను పెంచవు! ఆబ్జెక్ట్ సైజ్ కేవలం దాని లోపల ఉన్న <strong>నాన్-స్టాటిక్ వేరియబుల్స్</strong> పై మాత్రమే ఆధారపడి ఉంటుంది.</li>
        <li><strong>ఎంప్టీ క్లాస్ సైజ్ (Empty Class Size):</strong> ఏ వేరియబుల్స్ లేని ఒక ఖాళీ క్లాస్ <code>class Dummy {};</code> సైజ్ ఎంత ఉంటుంది? సమాధానం: <strong>ఖచ్చితంగా 1 బైట్!</strong> ఎందుకంటే C++ ఆర్కిటెక్చర్‌లో ప్రతి ఆబ్జెక్ట్‌కు ఒక ప్రత్యేకమైన మెమరీ అడ్రస్ ఉండాలి. సైజ్ 0 అయితే రెండు వేర్వేరు ఆబ్జెక్టులు ఒకే మెమరీ అడ్రస్‌ను పంచుకునే వైరుధ్యం వస్తుంది.</li>
        <li><strong>మెమరీ ప్యాడింగ్ (Padding):</strong> CPU 64-bit బౌండరీలపై వేగంగా చదవడానికి వేరియబుల్స్ మధ్య ఖాళీ బైట్లను (Padding Bytes) చేరుస్తుంది.</li>
      </ul>

      <div class="code-block">
        <div class="code-header">
          <span class="file-name">class_memory_size.cpp</span>
          <div class="btn-group">
            <button class="btn btn-copy" onclick="copyCode(this)">📋 Copy</button>
            <button class="btn btn-run" onclick="runCodeInCompiler(this)">▶ Run</button>
          </div>
        </div>
        <pre><code>#include &lt;iostream&gt;

class EmptyClass {};

class StructuredData {
    char a;    // 1 Byte + 3 Bytes Padding
    int b;     // 4 Bytes
    double c;  // 8 Bytes
};

int main() {
    std::cout << "sizeof(EmptyClass):    " << sizeof(EmptyClass) << " Byte (ప్రత్యేక అడ్రస్ కొరకు)\\n";
    std::cout << "sizeof(StructuredData): " << sizeof(StructuredData) << " Bytes (విత్ CPU Alignment Padding)\\n";
    return 0;
}</code></pre>
      </div>
    </section>

    <!-- SECTION 11 -->
    <section>
      <h2 class="section-title"><span class="num">11</span> సాధారణ OOP డిజైన్ తప్పులు &amp; బెస్ట్ ప్రాక్టీసెస్</h2>
      <ol style="line-height:1.8;">
        <li>
          <strong>అన్ని వేరియబుల్స్‌ను పబ్లిక్‌గా ఉంచడం:</strong> దీనివల్ల ఎవరైనా ఏ నిబంధన లేకుండా డేటాను మార్చేయవచ్చు. ఎల్లప్పుడూ మెంబర్ వేరియబుల్స్‌ను <code>private</code> గా ఉంచండి.
        </li>
        <li>
          <strong>గుడ్డిగా ప్రతిదానికీ Getters &amp; Setters రాయడం:</strong> క్లాస్ అంటే కేవలం డేటా హోల్డర్ కాదు. దానికి బిహేవియర్ ఉండాలి (ఉదాహరణకు <code>acc.setBalance(acc.getBalance() + 500)</code> బదులుగా <code>acc.deposit(500)</code> అని పిలవాలి).
        </li>
        <li>
          <strong>Const Correctness విస్మరించడం:</strong> డేటాను సవరించని ఏ మెథడ్‌కైనా <code>const</code> రాయకపోతే, ఆ క్లాస్ ఆబ్జెక్టులను వేరే లైబ్రరీలలో <code>const&amp;</code> గా ఉపయోగించడం అసాధ్యం అవుతుంది.
        </li>
      </ol>
    </section>

    <!-- SECTION 12 -->
    <section>
      <h2 class="section-title"><span class="num">12</span> రియల్-వరల్డ్ ప్రాజెక్ట్: Enterprise Core Banking Account &amp; Ledger Engine</h2>
      <p>
        నిజ జీవితంలో HDFC లేదా State Bank of India వంటి బ్యాంకింగ్ సిస్టమ్స్ లోపల ఖాతాదారుల నగదు లావాదేవీలు అత్యంత కట్టుదిట్టమైన ఎన్‌క్యాప్సులేషన్ రక్షణలో నడుస్తాయి. పిన్ ధృవీకరణ లేకుండా నగదు తీయడం కుదరదు, కనీస నిల్వ (Minimum Balance) తగ్గకూడదు, మరియు బ్రాంచ్ వ్యాప్తంగా మొత్తం టర్నోవర్‌ను స్టాటిక్ లెడ్జర్ ద్వారా ట్రాక్ చేయాలి.
      </p>
      <p>
        ఈ సమగ్ర ప్రాజెక్ట్‌లో మనం ప్రైవేట్ స్టేట్, సెక్యూర్ పిన్ ధృవీకరణ, మెథడ్ చైనింగ్, మరియు క్లాస్-లెవల్ స్టాటిక్ ఆడిట్‌తో కూడిన <strong>ఎంటర్‌ప్రైజ్ కోర్ బ్యాంకింగ్ లెడ్జర్ ఇంజిన్</strong> ను నిర్మిస్తున్నాం:
      </p>

      <div class="code-block">
        <div class="code-header">
          <span class="file-name">EnterpriseCoreBankingEngine.cpp</span>
          <div class="btn-group">
            <button class="btn btn-copy" onclick="copyCode(this)">📋 Copy</button>
            <button class="btn btn-run" onclick="openInteractiveCompiler()">⚡ Run Live Project</button>
          </div>
        </div>
        <pre><code>#include &lt;iostream&gt;
#include &lt;string&gt;
#include &lt;vector&gt;
#include &lt;iomanip&gt;

class BankAccount {
private:
    std::string accountNumber;
    std::string accountHolder;
    double balance;
    int securityPin;
    std::vector&lt;std::string&gt; passbookEntries;

    // క్లాస్-లెవల్ స్టాటిక్ ఆడిట్ వేరియబుల్స్
    inline static int totalAccountsCreated = 0;
    inline static double totalBankDeposits = 0.0;

public:
    BankAccount(std::string accNo, std::string holder, double initialDeposit, int pin)
        : accountNumber(accNo), accountHolder(holder), balance(initialDeposit), securityPin(pin) {
        totalAccountsCreated++;
        totalBankDeposits += initialDeposit;
        passbookEntries.push_back("ప్రారంభ ఖాతా డిపాజిట్: ₹ " + std::to_string(initialDeposit));
    }

    // Method Chaining డిపాజిట్ ఫంక్షన్
    BankAccount& deposit(double amount) {
        if (amount <= 0) {
            std::cout << "❌ డిపాజిట్ తిరస్కరించబడింది: మొత్తం తప్పనిసరిగా ధనాత్మకంగా ఉండాలి.\\n";
            return *this;
        }
        balance += amount;
        totalBankDeposits += amount;
        passbookEntries.push_back("జమ (Deposit): +₹ " + std::to_string(amount));
        std::cout << "✅ [జమ సఫలం] " << accountHolder << " ఖాతాలో ₹ " << amount << " జమ చేయబడింది.\\n";
        return *this;
    }

    // సెక్యూర్ విత్‌డ్రాయల్ ఫంక్షన్ (విత్ పిన్ వెరిఫికేషన్ & మినిమమ్ బ్యాలెన్స్ చెక్)
    bool withdraw(double amount, int pin) {
        if (pin != securityPin) {
            std::cout << "🚨 [భద్రతా హెచ్చరిక] తప్పుడు సెక్యూరిటీ పిన్! విత్‌డ్రాయల్ నిలిపివేయబడింది.\\n";
            return false;
        }
        const double MIN_BALANCE = 1000.0;
        if (balance - amount < MIN_BALANCE) {
            std::cout << "⚠️ [లావాదేవీ రద్దు] ఖాతాలో కనీస బ్యాలెన్స్ ₹ 1,000 తప్పనిసరి. ప్రస్తుత నిల్వ: ₹ " << balance << "\\n";
            return false;
        }

        balance -= amount;
        totalBankDeposits -= amount;
        passbookEntries.push_back("విత్‌డ్రాయల్ (Withdrawal): -₹ " + std::to_string(amount));
        std::cout << "💸 [నగదు ఉపసంహరణ సఫలం] ₹ " << amount << " డ్రా చేయబడింది. మిగిలిన బ్యాలెన్స్: ₹ " << balance << "\\n";
        return true;
    }

    // Read-Only const ఫంక్షన్
    void printPassbook() const {
        std::cout << "\\n--------------------------------------------------------------\\n";
        std::cout << "📖 [అధికారిక పాస్‌బుక్ స్టేట్‌మెంట్ - " << accountHolder << "]\\n";
        std::cout << "ఖాతా సంఖ్య: " << accountNumber << " | ప్రస్తుత నిల్వ: ₹ " << std::fixed << std::setprecision(2) << balance << "\\n";
        std::cout << "లావాదేవీల రికార్డు:\\n";
        for (const auto& entry : passbookEntries) {
            std::cout << "  • " << entry << "\\n";
        }
        std::cout << "--------------------------------------------------------------\\n";
    }

    // Static క్లాస్ ఆడిట్ రిపోర్ట్
    static void generateBankTurnoverReport() {
        std::cout << "\\n==============================================================\\n";
        std::cout << "🏦 [GLOBAL CORE BANKING AUDIT & TURNOVER REPORT]\\n";
        std::cout << "మొత్తం యాక్టివ్ ఖాతాలు     : " << totalAccountsCreated << "\\n";
        std::cout << "మొత్తం బ్యాంక్ డిపాజిట్ నిల్వ: ₹ " << std::fixed << std::setprecision(2) << totalBankDeposits << "\\n";
        std::cout << "==============================================================\\n";
    }
};

int main() {
    std::cout << "==============================================================\\n";
    std::cout << "🏦 [ENTERPRISE CORE BANKING LEDGER SYSTEM RUNNING]\\n";
    std::cout << "==============================================================\\n";

    BankAccount acc1("ACC_987654321", "రమేష్ వర్మ", 25000.0, 4321);
    BankAccount acc2("ACC_123456789", "సునీత రావు", 50000.0, 9988);

    // Method Chaining ద్వారా వరుస డిపాజిట్లు
    acc1.deposit(10000.0).deposit(5000.0);

    // విత్‌డ్రాయల్ ప్రయత్నాలు
    acc1.withdraw(5000.0, 4321); // సరైన పిన్
    acc1.withdraw(10000.0, 1111); // తప్పుడు పిన్ - సెక్యూరిటీ బ్లాక్!

    acc2.deposit(15000.0);
    acc2.withdraw(60000.0, 9988); // కనీస బ్యాలెన్స్ రూల్ ఫెయిల్

    // స్టేట్‌మెంట్లు ప్రింట్ చేయడం
    acc1.printPassbook();
    acc2.printPassbook();

    // గ్లోబల్ స్టాటిక్ ఆడిట్ రిపోర్ట్
    BankAccount::generateBankTurnoverReport();

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
          <li><strong>Class vs Object:</strong> క్లాస్ అనేది బ్లూప్రింట్ (యూజర్ డిఫైన్డ్ టైప్); ఆబ్జెక్ట్ అనేది RAM లో మెమరీ కలిగిన నిజమైన ఉనికి.</li>
          <li><strong>Class vs Struct:</strong> C++ లో రెండింటికీ ఒకే సామర్థ్యాలు ఉన్నాయి. ఏకైక తేడా: <code>struct</code> లో డిఫాల్ట్‌గా అన్ని <code>public</code>, <code>class</code> లో డిఫాల్ట్‌గా అన్ని <code>private</code>.</li>
          <li><strong>Access Specifiers:</strong> <code>public</code> అందరికీ లభిస్తుంది, <code>private</code> కేవలం క్లాస్ లోపలే ఉంటుంది, <code>protected</code> వారసత్వ క్లాసులకు మాత్రమే అందుబాటులో ఉంటుంది.</li>
          <li><strong>Encapsulation:</strong> డేటాను ప్రైవేట్‌గా దాచిపెట్టి, Getters/Setters మరియు బిహేవియర్ మెథడ్స్ ద్వారా మాత్రమే నియంత్రిత ప్రాప్యత కల్పించడం.</li>
          <li><strong>this Pointer:</strong> ప్రస్తుత ఆబ్జెక్ట్ మెమరీ అడ్రస్‌ను సూచించే ఇంప్లిసిట్ పాయింటర్. నేమ్ షాడోయింగ్ నివారణకు మరియు మెథడ్ చైనింగ్‌కు తప్పనిసరి.</li>
          <li><strong>const Member Functions:</strong> ఆబ్జెక్ట్ స్టేట్‌ను మార్చని రీడ్-ఓన్లీ ఫంక్షన్లు. <code>const</code> రిఫరెన్సులతో పనిచేయడానికి ఇవి తప్పనిసరి.</li>
          <li><strong>Static Members:</strong> ఆబ్జెక్టులతో సంబంధం లేకుండా క్లాస్ మొత్తానికి ఉమ్మడిగా గ్లోబల్ మెమరీలో ఉండే క్లాస్-లెవల్ వేరియబుల్స్ మరియు ఫంక్షన్లు.</li>
          <li><strong>Empty Class Size:</strong> ప్రతి ఆబ్జెక్ట్‌కు ప్రత్యేక మెమరీ అడ్రస్ ఉండటం కోసం ఖాళీ క్లాస్ సైజ్ ఖచ్చితంగా 1 బైట్ ఉంటుంది.</li>
        </ul>
      </div>

      <h3 style="margin-bottom:16px;">🧠 మీ అవగాహనను పరీక్షించుకోండి (5 Interactive Quizzes):</h3>

      <!-- QUIZ 1 -->
      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:14px;">
        <summary style="font-weight:600; cursor:pointer; color:var(--text);">
          ప్రశ్న 1: C++ లో <code>class</code> మరియు <code>struct</code> మధ్య ఉన్న ఏకైక సాంకేతిక వ్యత్యాసం ఏమిటి?
        </summary>
        <div style="margin-top:12px; padding-top:10px; border-top:1px dashed var(--border); font-size:14px; color:var(--text2); line-height:1.6;">
          <strong>సమాధానం:</strong> <strong>Default Access Specifier</strong> మాత్రమే!<br/>
          <em>వివరణ:</em> <code>struct</code> లో ఏమీ చెప్పకపోతే అన్ని మెంబర్లు డిఫాల్ట్‌గా <code>public</code> అవుతాయి; <code>class</code> లో ఏమీ చెప్పకపోతే అన్ని మెంబర్లు డిఫాల్ట్‌గా <code>private</code> అవుతాయి. మిగిలిన అన్ని ఫీచర్లు (కన్‌స్ట్రక్టర్లు, మెథడ్స్, ఇన్హెరిటెన్స్) రెండింటిలోనూ ఖచ్చితంగా ఒకే విధంగా పనిచేస్తాయి.
        </div>
      </details>

      <!-- QUIZ 2 -->
      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:14px;">
        <summary style="font-weight:600; cursor:pointer; color:var(--text);">
          ప్రశ్న 2: నాన్-స్టాటిక్ మెంబర్ ఫంక్షన్ లోపల <code>this</code> పాయింటర్ యొక్క డేటా టైప్ ఏమిటి?
        </summary>
        <div style="margin-top:12px; padding-top:10px; border-top:1px dashed var(--border); font-size:14px; color:var(--text2); line-height:1.6;">
          <strong>సమాధానం:</strong> <code>ClassName* const</code> (Constant Pointer to Class Object).<br/>
          <em>వివరణ:</em> <code>this</code> అనేది ఒక కాన్స్టంట్ పాయింటర్, అంటే <code>this = nullptr;</code> అని దాన్ని మార్చలేము. ఒకవేళ అది <code>const</code> మెంబర్ ఫంక్షన్ అయితే, <code>this</code> యొక్క టైప్ <code>const ClassName* const</code> అవుతుంది.
        </div>
      </details>

      <!-- QUIZ 3 -->
      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:14px;">
        <summary style="font-weight:600; cursor:pointer; color:var(--text);">
          ప్రశ్న 3: C++ లో ఒక ఖాళీ క్లాస్ (Empty Class) సైజ్ ఎంత ఉంటుంది? అది సున్నా ఎందుకు కాదు?
        </summary>
        <div style="margin-top:12px; padding-top:10px; border-top:1px dashed var(--border); font-size:14px; color:var(--text2); line-height:1.6;">
          <strong>సమాధానం:</strong> <strong>1 బైట్</strong> ఉంటుంది!<br/>
          <em>వివరణ:</em> C++ స్టాండర్డ్ ప్రకారం ప్రోగ్రామ్‌లోని ప్రతి స్వతంత్ర ఆబ్జెక్ట్‌కు RAM లో ఒక ప్రత్యేకమైన మెమరీ చిరునామా (Unique Address) ఉండాలి. సైజ్ 0 అయితే <code>Empty a, b; &amp;a == &amp;b</code> అయిపోయి రెండు వేర్వేరు ఆబ్జెక్టులు ఒకే చోట ఉన్నట్లు తప్పుడు గందరగోళం ఏర్పడుతుంది.
        </div>
      </details>

      <!-- QUIZ 4 -->
      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:14px;">
        <summary style="font-weight:600; cursor:pointer; color:var(--text);">
          ప్రశ్న 4: <code>const MyClass obj;</code> అని సృష్టించినప్పుడు, ఆ ఆబ్జెక్ట్ ద్వారా ఏ విధమైన మెంబర్ ఫంక్షన్లను మాత్రమే పిలవగలం?
        </summary>
        <div style="margin-top:12px; padding-top:10px; border-top:1px dashed var(--border); font-size:14px; color:var(--text2); line-height:1.6;">
          <strong>సమాధానం:</strong> కేవలం <strong><code>const</code> మెంబర్ ఫంక్షన్లను మాత్రమే</strong> పిలవగలం!<br/>
          <em>వివరణ:</em> కాన్స్టంట్ ఆబ్జెక్ట్ ఏ మార్పునూ అనుమతించదు. నాన్-కాన్స్ట్ ఫంక్షన్లు వేరియబుల్స్‌ను మార్చే అవకాశం ఉన్నందున కంపైలర్ వాటిని పిలవడానికి అనుమతించదు.
        </div>
      </details>

      <!-- QUIZ 5 -->
      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:14px;">
        <summary style="font-weight:600; cursor:pointer; color:var(--text);">
          ప్రశ్న 5: స్టాటిక్ మెంబర్ ఫంక్షన్ (Static Member Function) లోపల <code>this</code> పాయింటర్‌ను లేదా నాన్-స్టాటిక్ వేరియబుల్స్‌ను ఎందుకు వాడలేము?
        </summary>
        <div style="margin-top:12px; padding-top:10px; border-top:1px dashed var(--border); font-size:14px; color:var(--text2); line-height:1.6;">
          <strong>సమాధానం:</strong> ఎందుకంటే స్టాటిక్ ఫంక్షన్లు ఏ నిర్దిష్ట ఆబ్జెక్ట్‌తోనూ ముడిపడి ఉండవు (No Instance Context)!<br/>
          <em>వివరణ:</em> స్టాటిక్ ఫంక్షన్‌ను ఏ ఆబ్జెక్ట్ లేకుండానే నేరుగా <code>ClassName::function()</code> అని పిలవవచ్చు. ఆ సమయంలో ఏ ఆబ్జెక్ట్ సృష్టించబడకపోయినా ఆ ఫంక్షన్ నడుస్తుంది కాబట్టి దానికి <code>this</code> పాయింటర్ గానీ, ఆబ్జెక్ట్-లెవల్ వేరియబుల్స్ గానీ ఉండవు.
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
#include <iomanip>

class BankAccount {
private:
    std::string accountNumber;
    std::string accountHolder;
    double balance;
    int securityPin;
    std::vector<std::string> passbookEntries;

    inline static int totalAccountsCreated = 0;
    inline static double totalBankDeposits = 0.0;

public:
    BankAccount(std::string accNo, std::string holder, double initialDeposit, int pin)
        : accountNumber(accNo), accountHolder(holder), balance(initialDeposit), securityPin(pin) {
        totalAccountsCreated++;
        totalBankDeposits += initialDeposit;
        passbookEntries.push_back("ప్రారంభ ఖాతా డిపాజిట్: ₹ " + std::to_string(initialDeposit));
    }

    BankAccount& deposit(double amount) {
        if (amount <= 0) {
            std::cout << "❌ డిపాజిట్ తిరస్కరించబడింది: మొత్తం తప్పనిసరిగా ధనాత్మకంగా ఉండాలి.\\\\n";
            return *this;
        }
        balance += amount;
        totalBankDeposits += amount;
        passbookEntries.push_back("జమ (Deposit): +₹ " + std::to_string(amount));
        std::cout << "✅ [జమ సఫలం] " << accountHolder << " ఖాతాలో ₹ " << amount << " జమ చేయబడింది.\\\\n";
        return *this;
    }

    bool withdraw(double amount, int pin) {
        if (pin != securityPin) {
            std::cout << "🚨 [భద్రతా హెచ్చరిక] తప్పుడు సెక్యూరిటీ పిన్! విత్‌డ్రాయల్ నిలిపివేయబడింది.\\\\n";
            return false;
        }
        const double MIN_BALANCE = 1000.0;
        if (balance - amount < MIN_BALANCE) {
            std::cout << "⚠️ [లావాదేవీ రద్దు] ఖాతాలో కనీస బ్యాలెన్స్ ₹ 1,000 తప్పనిసరి. ప్రస్తుత నిల్వ: ₹ " << balance << "\\\\n";
            return false;
        }

        balance -= amount;
        totalBankDeposits -= amount;
        passbookEntries.push_back("విత్‌డ్రాయల్ (Withdrawal): -₹ " + std::to_string(amount));
        std::cout << "💸 [నగదు ఉపసంహరణ సఫలం] ₹ " << amount << " డ్రా చేయబడింది. మిగిలిన బ్యాలెన్స్: ₹ " << balance << "\\\\n";
        return true;
    }

    void printPassbook() const {
        std::cout << "\\\\n--------------------------------------------------------------\\\\n";
        std::cout << "📖 [అధికారిక పాస్‌బుక్ స్టేట్‌మెంట్ - " << accountHolder << "]\\\\n";
        std::cout << "ఖాతా సంఖ్య: " << accountNumber << " | ప్రస్తుత నిల్వ: ₹ " << std::fixed << std::setprecision(2) << balance << "\\\\n";
        std::cout << "లావాదేవీల రికార్డు:\\\\n";
        for (const auto& entry : passbookEntries) {
            std::cout << "  • " << entry << "\\\\n";
        }
        std::cout << "--------------------------------------------------------------\\\\n";
    }

    static void generateBankTurnoverReport() {
        std::cout << "\\\\n==============================================================\\\\n";
        std::cout << "🏦 [GLOBAL CORE BANKING AUDIT & TURNOVER REPORT]\\\\n";
        std::cout << "మొత్తం యాక్టివ్ ఖాతాలు     : " << totalAccountsCreated << "\\\\n";
        std::cout << "మొత్తం బ్యాంక్ డిపాజిట్ నిల్వ: ₹ " << std::fixed << std::setprecision(2) << totalBankDeposits << "\\\\n";
        std::cout << "==============================================================\\\\n";
    }
};

int main() {
    std::cout << "==============================================================\\\\n";
    std::cout << "🏦 [ENTERPRISE CORE BANKING LEDGER SYSTEM RUNNING]\\\\n";
    std::cout << "==============================================================\\\\n";

    BankAccount acc1("ACC_987654321", "రమేష్ వర్మ", 25000.0, 4321);
    BankAccount acc2("ACC_123456789", "సునీత రావు", 50000.0, 9988);

    acc1.deposit(10000.0).deposit(5000.0);

    acc1.withdraw(5000.0, 4321);
    acc1.withdraw(10000.0, 1111);

    acc2.deposit(15000.0);
    acc2.withdraw(60000.0, 9988);

    acc1.printPassbook();
    acc2.printPassbook();

    BankAccount::generateBankTurnoverReport();

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
fs.writeFileSync(outputPath, chapter13Content, 'utf8');
console.log('✅ Successfully generated deep high-value C++ Chapter 13 in exact HTML style!');
console.log('Target file:', currentLesson.file);
console.log('Target file size:', chapter13Content.length, 'characters');
