const fs = require('fs');
const path = require('path');
const { LESSONS, buildJavaSidebar } = require('./java_curriculum_data.js');

const currentLesson = LESSONS.find(l => l.num === 12);

const chapter12Content = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Java Methods, Pass-by-Value &amp; Call Stack Architecture తెలుగులో — Java Tutorial | Our Compiler</title>
  <meta name="description" content="జావా మెథడ్స్, పారామీటర్లు, 'Java is Strictly Pass-by-Value' నియమం, JVM Call Stack Frames మరియు రికర్షన్ సమగ్ర విశ్లేషణ. ఈ-కామర్స్ ప్రైసింగ్ ఇంజిన్ ప్రాజెక్ట్ తెలుగులో నేర్చుకోండి." />
  <meta name="keywords" content="java methods telugu, pass by value java telugu, jvm call stack telugu, stack frame java telugu, recursion java telugu, stackoverflowerror telugu" />
  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />
  <link rel="icon" type="image/png" href="/logo.png" />
  <link rel="canonical" href="https://www.ourcompiler.com/blog-java/12-java-methods-call-stack-and-pass-by-value.html" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;500;600;700&family=Noto+Sans+Telugu:wght@400;500;600;700;800&family=Sora:wght@400;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/blog-style.css" />
  <link rel="stylesheet" href="/blog-java/style.css" />
  <link rel="stylesheet" href="/site-nav.css" />

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

    function copyCodeSnippet(btn) {
      const block = btn.closest('.code-block');
      const code = block.querySelector('pre code').innerText;
      navigator.clipboard.writeText(code).then(() => {
        const originalText = btn.innerText;
        btn.innerText = '✓ Copied!';
        setTimeout(() => { btn.innerText = originalText; }, 1800);
      });
    }

    function runInJavaCompiler(btn) {
      const block = btn.closest('.code-block');
      const code = block.querySelector('pre code').innerText;
      localStorage.setItem('code_java', code);
      window.location.href = '/online-java-compiler.html';
    }

    (function() {
      const currentTheme = localStorage.getItem('theme') || 'light';
      if (currentTheme === 'light') {
        document.documentElement.classList.add('light-theme');
        document.addEventListener('DOMContentLoaded', () => {
          document.body.classList.add('light-theme');
        });
      }
    })();
  </script>
</head>
<body class="lang-java light-theme">

<div id="site-nav-placeholder"></div>

<div class="layout">
  ${buildJavaSidebar(12)}

  <!-- MAIN CONTENT -->
  <main class="content">
    <div class="breadcrumb">
      <a href="/">Home</a><span class="sep">›</span>
      <a href="/blog.html">Tutorials</a><span class="sep">›</span>
      <a href="/blog-java.html">Java</a><span class="sep">›</span>
      <span class="current">Lesson 12: Methods &amp; Call Stack</span>
    </div>

    <h1 class="page-title">12. జావా మెథడ్స్, Pass-by-Value &amp; కాల్ స్టాక్ ఆర్కిటెక్చర్ (Methods &amp; Call Stack)</h1>

    <div class="page-meta">
      <span class="badge">☕ Java (Java 21+ LTS)</span>
      <span class="badge">🟢 Lesson 12 of 25</span>
      <span class="badge">📂 Part 03: Arrays, Methods &amp; OOP (Page 2 of 5)</span>
      <span class="badge">⏱️ 26 min read</span>
    </div>

    <!-- Subtopics Pill Bar -->
    <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:12px 18px; margin-bottom:28px; font-size:13px; color:var(--text2); display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
      <span style="font-weight:700; color:#10b981;">📌 Covered in this lesson:</span>
      <span>${currentLesson.subtopics}</span>
    </div>

    <!-- WARM IVORY INTRO BOX (JavaScript Style) -->
    <div class="intro-box">
      <p style="margin:0 0 16px 0; font-size:15px; line-height:1.8; color:#1e293b;">
        సాఫ్ట్‌వేర్ ఆర్కిటెక్చర్‌లో కోడ్ శుభ్రంగా, సులభంగా నిర్వహించగలిగేలా (Maintainable), మరియు పునరావృతం కాకుండా (Don't Repeat Yourself - DRY Principle) తీర్చిదిద్దడానికి జావా అందించిన ప్రాథమిక పునాది <strong>మెథడ్స్ (Methods)</strong>. C లేదా Python వంటి భాషలలో ఫంక్షన్లను స్వతంత్రంగా రాసే వీలుంటుంది, కానీ స్వచ్ఛమైన ఆబ్జెక్ట్-ఓరియెంటెడ్ భాష అయిన జావాలో ఏ మెథడ్ కూడా గాల్లో ఒంటరిగా ఉండలేదు — ప్రతి ఒక్క మెథడ్ తప్పనిసరిగా ఏదో ఒక క్లాస్ లోపలే నివసించాలి. జావా ఇంటర్వ్యూలలో అత్యంత చర్చనీయాంశమైన ప్రశ్న: <em>"Is Java Pass-by-Value or Pass-by-Reference?"</em>. దీనికి ఖచ్చితమైన సమాధానం: <strong>జావా 100% ప్యూర్ Pass-by-Value మాత్రమే!</strong> మెథడ్లు పిలవబడినప్పుడు JVM స్టాక్ మెమరీలో <strong>Stack Frames</strong> ఎలా సృష్టించబడతాయి? లోకల్ వేరియబుల్స్ ఎలా బౌండ్ అవుతాయి? రికర్షన్ ఎలా పనిచేస్తుంది మరియు <code>StackOverflowError</code> ను ఎలా నివారించాలి? అనే లోతైన అంశాలను ఈ పాఠంలో ప్రాక్టికల్ పరిశోధనలతో నేర్చుకుందాం.
      </p>

      <h4 style="margin:0 0 10px 0; color:#047857; font-size:16px; font-weight:800;">
        రెస్టారెంట్ చెఫ్ రెసిపీ &amp; లంచ్ ట్రేల అనాలజీ (The Restaurant Chef Recipe &amp; Cafeteria Tray Analogy):
      </h4>
      <ol style="margin:0; padding-left:22px; color:#334155; line-height:1.8; font-size:14.5px;">
        <li style="margin-bottom:8px;">
          <strong>1. Method (రెస్టారెంట్ చెఫ్ రెసిపీ పుస్తకం - Kitchen Chef Recipe):</strong> ఒక రెస్టారెంట్‌లో పిజ్జా లేదా దోశ చేయాలంటే నిర్దిష్టమైన ముడి పదార్థాలు (Parameters/Arguments) ఇవ్వాలి. చెఫ్ కిచెన్‌లోకి వెళ్లి ఆ పదార్థాలను ఉపయోగించి వండి, చివరగా రుచికరమైన వంటకాన్ని డైనింగ్ టేబుల్‌పైకి పంపుతాడు (Return Value). మెథడ్ అనేది కోడ్‌లో నిర్దిష్ట పనిని స్వయంప్రతిపత్తితో పూర్తి చేసే ఒక నిపుణులైన చెఫ్ వంటిది.
        </li>
        <li style="margin-bottom:8px;">
          <strong>2. Pass-by-Value (ఫోటోస్టాట్ జిరాక్స్ కాపీ - Photostat Xerox Copy Analogy):</strong> మీ దగ్గర ఒక రహస్య ఆస్తి పత్రం ఉందనుకోండి. ఒక అడ్వైజర్‌కు సలహా కోసం ఇచ్చేటప్పుడు, అసలు ఒరిజినల్ పత్రాన్ని మీ జేబులోనే సురక్షితంగా దాచుకుని, కేవలం ఒక 'జిరాక్స్ కాపీ'ని మాత్రమే అతనికి ఇస్తారు. ఆ అడ్వైజర్ ఆ కాపీపై సంతకాలు పెట్టినా లేదా రంగులు పూసినా, మీ జేబులోని అసలు పత్రం ఏమాత్రం మారదు! జావాలో ప్రిమిటివ్‌లు లేదా ఆబ్జెక్ట్ రిఫరెన్స్‌లు ఏవైనా సరే, మెథడ్‌కు కేవలం 'విలువ యొక్క కాపీ' (Copy of the Value) మాత్రమే అందుతుంది.
        </li>
        <li>
          <strong>3. Call Stack (క్యాంటీన్ లోని కంచాల దొంతర - Stack of Cafeteria Trays):</strong> క్యాంటీన్‌లో ఒకదానిపై ఒకటి పేర్చిన ప్లేట్ల మాదిరిగా (LIFO - Last In First Out), ప్రోగ్రామ్ ప్రారంభం కాగానే <code>main()</code> మెథడ్ కోసం క్రింది ప్లేట్ (Stack Frame) పడుతుంది. <code>main()</code> మరో మెథడ్‌ను పిలిచినప్పుడు దానిపై ఇంకో కొత్త ప్లేట్ చేరుతుంది. ఆ మెథడ్ పని పూర్తయి రిటర్న్ అవ్వగానే ఆ ప్లేట్ చెత్తబుట్టలోకి వెళ్లిపోతుంది (Popped). ఒకవేళ అనంతంగా మెథడ్స్ పిలుస్తూ పోతే ప్లేట్ల దొంతర పైకప్పును తాకి కూలిపోతుంది — దీనినే జావాలో <code>StackOverflowError</code> అంటారు!
        </li>
      </ol>
      <p style="margin:14px 0 0 0; font-size:14px; color:#475569; line-height:1.7;">
        ఈ పాఠం ముగిసేసరికి మీరు మెథడ్ సిగ్నేచర్ల అంతర్గత స్వభావాన్ని, ప్రిమిటివ్స్ vs ఆబ్జెక్ట్స్ పాసింగ్ వెనుక ఉన్న వాస్తవ మెమరీ మార్పులను, రికర్సివ్ అల్గారిథమ్స్ మరియు ఎంటర్‌ప్రైజ్ ఈ-కామర్స్ ప్రైసింగ్ ఇంజిన్‌ను నిర్మించడంలో పరిపూర్ణ ప్రావీణ్యం సంపాదిస్తారు!
      </p>
    </div>

    <!-- 3-COLUMN TABLE OF CONTENTS (TOC CARD) -->
    <div class="toc-card">
      <div style="font-weight:800; color:var(--text); margin-bottom:14px; font-size:16px; display:flex; align-items:center; gap:8px;">
        <span>📑 ఈ పాఠంలో మీరు నేర్చుకునే అంశాలు (Table of Contents)</span>
      </div>
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:18px;">
        <div>
          <div style="font-weight:700; color:#10b981; margin-bottom:8px; font-size:13.5px; border-bottom:1px solid var(--border); padding-bottom:4px;">
            విభాగం A: మెథడ్స్ &amp; Pass-by-Value
          </div>
          <ul style="list-style:none; padding:0; margin:0; font-size:13px; line-height:2.1;">
            <li><a href="#sec-1" style="color:var(--text2); text-decoration:none;">1. మెథడ్ అనాటమీ, మోడిఫైయర్లు &amp; సిగ్నేచర్</a></li>
            <li><a href="#sec-2" style="color:var(--text2); text-decoration:none;">2. Parameters vs Arguments &amp; Return Type</a></li>
            <li><a href="#sec-3" style="color:var(--text2); text-decoration:none;">3. "Java is STRICTLY Pass-by-Value" నిజం</a></li>
            <li><a href="#sec-4" style="color:var(--text2); text-decoration:none;">4. ప్రిమిటివ్స్ vs ఆబ్జెక్ట్ రిఫరెన్సెస్ మెమరీ</a></li>
          </ul>
        </div>
        <div>
          <div style="font-weight:700; color:#10b981; margin-bottom:8px; font-size:13.5px; border-bottom:1px solid var(--border); padding-bottom:4px;">
            విభాగం B: JVM Call Stack &amp; రికర్షన్
          </div>
          <ul style="list-style:none; padding:0; margin:0; font-size:13px; line-height:2.1;">
            <li><a href="#sec-5" style="color:var(--text2); text-decoration:none;">5. JVM Call Stack &amp; Stack Frame భాగాలు</a></li>
            <li><a href="#sec-6" style="color:var(--text2); text-decoration:none;">6. Local Variable Array &amp; Operand Stack</a></li>
            <li><a href="#sec-7" style="color:var(--text2); text-decoration:none;">7. రికర్షన్ (Recursion) &amp; బేస్ కండిషన్ నియమాలు</a></li>
            <li><a href="#sec-8" style="color:var(--text2); text-decoration:none;">8. StackOverflowError ఎందుకు వస్తుంది &amp; నివారణ</a></li>
          </ul>
        </div>
        <div>
          <div style="font-weight:700; color:#10b981; margin-bottom:8px; font-size:13.5px; border-bottom:1px solid var(--border); padding-bottom:4px;">
            విభాగం C: డెమోలు, ప్రాజెక్ట్ &amp; పరీక్ష
          </div>
          <ul style="list-style:none; padding:0; margin:0; font-size:13px; line-height:2.1;">
            <li><a href="#sec-9" style="color:var(--text2); text-decoration:none;">9. డెమో 1: Pass-by-Value రుజువు (Primitives &amp; Ref)</a></li>
            <li><a href="#sec-10" style="color:var(--text2); text-decoration:none;">10. డెమో 2: Call Stack ట్రేస్ &amp; రికర్సివ్ ఫ్యాక్టోరియల్</a></li>
            <li><a href="#sec-11" style="color:var(--text2); text-decoration:none;">11. Capstone ప్రాజెక్ట్: ఈ-కామర్స్ ప్రైసింగ్ ఇంజిన్</a></li>
            <li><a href="#sec-12" style="color:var(--text2); text-decoration:none;">12. ప్రొడక్షన్ పిట్‌ఫాల్స్, బెస్ట్ ప్రాక్టీసెస్ &amp; 5 క్విజ్‌లు</a></li>
          </ul>
        </div>
      </div>
    </div>

    <!-- SECTION 1 -->
    <div id="sec-1" class="section-card">
      <h2>1. మెథడ్ అనాటమీ, మోడిఫైయర్లు &amp; సిగ్నేచర్ (Method Anatomy &amp; Signature)</h2>
      <p>
        జావాలో ఒక మెథడ్‌ను డిక్లేర్ చేయడానికి 6 ముఖ్యమైన విభాగాలు అవసరమవుతాయి. వాటి నిర్మాణాన్ని క్రింది సూత్రం ద్వారా అర్థం చేసుకుందాం:
      </p>

      <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:18px 22px; margin:18px 0; font-family:'JetBrains Mono', monospace; font-size:13.5px; line-height:1.9;">
        <span style="color:#64748b;">// Syntax: [Access Modifier] [Non-Access Modifier] [Return Type] methodName(Parameters) [throws Exception] { ... }</span><br />
        <span style="color:#0284c7;">public static double</span> calculateTax(<span style="color:#0284c7;">double</span> amount, <span style="color:#0284c7;">double</span> rate) {<br />
        &nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#0284c7;">return</span> amount * (rate / 100.0);<br />
        }
      </div>

      <h4 style="color:#10b981; margin:18px 0 8px 0;">మెథడ్ సిగ్నేచర్ (Method Signature) అంటే ఏమిటి?</h4>
      <p>
        జావా కంపైలర్ దృష్టిలో ఒక మెథడ్ యొక్క గుర్తింపు (Identity) కేవలం రెండు విషయాల ఆధారంగా మాత్రమే నిర్ణయించబడుతుంది:
        <br />
        1. <strong>మెథడ్ పేరు (Method Name)</strong> (ఉదా: <code>calculateTax</code>)
        <br />
        2. <strong>పారామీటర్ల రకాలు మరియు వాటి క్రమం (Parameter Types &amp; Order)</strong> (ఉదా: <code>double, double</code>)
      </p>
      <div style="background:#fefce8; border:1px solid #fde047; border-left:5px solid #ca8a04; border-radius:6px; padding:12px 16px; margin:14px 0; font-size:13.5px; color:#854d0e; line-height:1.6;">
        ⚠️ <strong>కీలకమైన ఇంటర్వ్యూ పాయింట్:</strong> రిటర్న్ టైప్ (Return Type) మరియు యాక్సెస్ మోడిఫైయర్లు మెథడ్ సిగ్నేచర్‌లో భాగం కావు! కేవలం రిటర్న్ టైప్ మార్చి ఒకే క్లాస్‌లో రెండు ఒకేలాంటి మెథడ్స్ రాస్తే జావా కంపైల్ కాదు (Duplicate method error).
      </div>
    </div>

    <!-- SECTION 2 -->
    <div id="sec-2" class="section-card">
      <h2>2. Parameters vs Arguments &amp; Return Type (The Information Flow)</h2>
      <p>
        ప్రోగ్రామింగ్ ప్రపంచంలో డెవలపర్లు తరచూ 'పారామీటర్స్' మరియు 'ఆర్గ్యుమెంట్స్' అనే పదాలను తారుమారు చేస్తుంటారు. కానీ రెండింటి మధ్య స్పష్టమైన సాంకేతిక విభజన ఉంది:
      </p>

      <ul>
        <li>
          <strong>పారామీటర్లు (Formal Parameters):</strong> మెథడ్ డిక్లరేషన్‌లో పేర్కొనే వేరియబుల్స్. ఇవి మెథడ్‌కు అవసరమైన ఇన్‌పుట్ బ్లూప్రింట్‌ను సూచిస్తాయి (ఉదా: <code>double amount, double rate</code>).
        </li>
        <li>
          <strong>ఆర్గ్యుమెంట్లు (Actual Arguments):</strong> మెథడ్‌ను కాల్ చేసే సమయంలో వాస్తవంగా మనం పంపించే విలువలు లేదా వేరియబుల్స్ (ఉదా: <code>calculateTax(5000.0, 18.0)</code> లోని 5000.0 మరియు 18.0).
        </li>
        <li>
          <strong>రిటర్న్ టైప్ (Return Type):</strong> మెథడ్ తన పనిని పూర్తి చేసిన తర్వాత కాలర్ (Caller) కు తిరిగి ఇచ్చే సమాచారం యొక్క డేటా టైప్. ఒకవేళ ఏ విలువా తిరిగి ఇవ్వకపోతే <code>void</code> ఉపయోగిస్తాం. <code>void</code> మెథడ్లలో కూడా మెథడ్ మధ్యలోనే నిష్క్రమించడానికి కేవలం <code>return;</code> అని రాయవచ్చు.
        </li>
      </ul>
    </div>

    <!-- SECTION 3 -->
    <div id="sec-3" class="section-card">
      <h2>3. "Java is STRICTLY Pass-by-Value" లోతైన విశ్లేషణ (The Unshakable Rule)</h2>
      <p>
        ఇది జావా ప్రపంచంలో అత్యధికంగా అపార్థం చేసుకోబడిన సిద్ధాంతం. C++ లో పాయింటర్లు మరియు రిఫరెన్స్ వేరియబుల్స్ (<code>&amp;x</code>) ఉంటాయి, కాబట్టి అక్కడ పాస్-బై-రిఫరెన్స్ సాధ్యమవుతుంది. కానీ <strong>జావాలో Pass-by-Reference అనే కాన్సెప్టే లేదు!</strong>
      </p>
      <p>
        జావాలో ఏదైనా మెథడ్‌కు ఒక వేరియబుల్‌ను ఆర్గ్యుమెంట్‌గా పంపినప్పుడు, ఆ వేరియబుల్‌లోని బిట్‌లు (Bits) సరిగ్గా కాపీ చేయబడి కొత్త లోకల్ పారామీటర్‌కు అందజేయబడతాయి.
      </p>

      <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #10b981; border-radius:6px; padding:16px 20px; margin:16px 0; font-size:13.5px; line-height:1.7;">
        <strong>జావా నియమం:</strong><br />
        1. <strong>ప్రిమిటివ్ డేటా టైప్స్ (int, double, boolean etc.):</strong> వాటి వాస్తవ విలువ (Value Bits) కాపీ అవుతుంది.<br />
        2. <strong>ఆబ్జెక్ట్ రిఫరెన్సెస్ (String, Arrays, Custom Objects):</strong> ఆబ్జెక్ట్ కాపీ కాదు; కానీ ఆబ్జెక్ట్‌ను సూచించే <strong>మెమరీ అడ్రస్ విలువ (Reference Bits)</strong> కాపీ అవుతుంది!
      </div>
    </div>

    <!-- SECTION 4 -->
    <div id="sec-4" class="section-card">
      <h2>4. ప్రిమిటివ్స్ vs ఆబ్జెక్ట్ రిఫరెన్సెస్: మెమరీ తేడాలు (The Reference Copy Reality)</h2>
      <p>
        ఆబ్జెక్ట్‌ను మెథడ్‌కు పాస్ చేసినప్పుడు ఎందుకు కొందరు 'పాస్-బై-రిఫరెన్స్' అని భ్రమపడతారో అర్థం చేసుకుందాం:
      </p>

      <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px 20px; margin:18px 0; font-family:'JetBrains Mono', monospace; font-size:13px; line-height:1.8;">
        <span style="color:#64748b;">// ఒక క్లాస్</span><br />
        <span style="color:#0284c7;">class</span> BankAccount { <span style="color:#0284c7;">double</span> balance = 1000; }<br /><br />
        <span style="color:#64748b;">// దృష్టాంతం 1: ఆబ్జెక్ట్ అంతర్గత స్థితిని మార్చడం (State Mutation)</span><br />
        <span style="color:#0284c7;">void</span> deposit(BankAccount acc) {<br />
        &nbsp;&nbsp;&nbsp;&nbsp;acc.balance += 500; <span style="color:#64748b;">// ఇది ఒరిజినల్ ఆబ్జెక్ట్‌పై ప్రభావం చూపుతుంది!</span><br />
        }<br /><br />
        <span style="color:#64748b;">// దృష్టాంతం 2: రిఫరెన్స్‌నే రీ-అసైన్ చేయడం (Reassigning Reference)</span><br />
        <span style="color:#0284c7;">void</span> resetAccount(BankAccount acc) {<br />
        &nbsp;&nbsp;&nbsp;&nbsp;acc = <span style="color:#0284c7;">new</span> BankAccount(); <span style="color:#64748b;">// కొత్త ఆబ్జెక్ట్!</span><br />
        &nbsp;&nbsp;&nbsp;&nbsp;acc.balance = 0;<br />
        &nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#64748b;">// కాలర్ వద్ద ఉన్న పాత అకౌంట్ బ్యాలెన్స్ 1000 అలాగే ఉంటుంది, 0 అవ్వదు!</span><br />
        }
      </div>

      <p>
        <strong>ఎందుకు అలా జరిగింది?</strong> <code>acc</code> అనేది కాలర్ రిఫరెన్స్ యొక్క జిరాక్స్ కాపీ. జిరాక్స్ కాపీని పట్టుకుని అదే చిరునామాలో ఉన్న ఇంటి తాళం తీసి లోపలి సోఫాను మార్చవచ్చు (State change). కానీ మీ చేతిలో ఉన్న జిరాక్స్ కాపీ చిరునామాను కొట్టేసి కొత్త ఇంటి చిరునామా రాస్తే (Reassignment), కాలర్ జేబులో ఉన్న అసలు చిరునామా ఏమాత్రం మారదు! ఇదే 'Pass-by-Value of Reference' అంటే.
      </p>
    </div>

    <!-- SECTION 5 -->
    <div id="sec-5" class="section-card">
      <h2>5. JVM Call Stack &amp; Stack Frame భాగాలు (Stack Frame Anatomy)</h2>
      <p>
        జావా అప్లికేషన్‌లో ప్రతి థ్రెడ్ (Thread) ప్రారంభమైనప్పుడు, JVM దానికి ప్రత్యేకంగా ఒక <strong>కాల్ స్టాక్ (Call Stack)</strong> మెమరీని కేటాయిస్తుంది. ఒక మెథడ్ కాల్ చేయబడిన ప్రతిసారీ ఆ స్టాక్‌పై ఒక సరికొత్త <strong>Stack Frame</strong> పుష్ చేయబడుతుంది.
      </p>

      <h4 style="color:#10b981; margin:16px 0 8px 0;">ఒక్కో Stack Frame లో ఉండే 3 ప్రధాన విభాగాలు:</h4>
      <ul>
        <li>
          <strong>1. Local Variable Array (LVA):</strong> మెథడ్‌లోని పారామీటర్లు మరియు లోకల్ వేరియబుల్స్ (int, double, references) ఇండెక్స్ చేయబడి ఉంటాయి. ఇన్‌స్టాన్స్ మెథడ్లలో <code>index 0</code> ఎల్లప్పుడూ ప్రస్తుత ఆబ్జెక్ట్ రిఫరెన్స్ అయిన <code>this</code> కు కేటాయించబడుతుంది!
        </li>
        <li>
          <strong>2. Operand Stack:</strong> బైట్‌కోడ్ ఇన్‌స్ట్రక్షన్లు గణిత లేదా లాజికల్ లెక్కలు చేసే తాత్కాలిక వర్కింగ్ స్పేస్. ఉదాహరణకు <code>iload, iadd, istore</code> వంటి ఆపరేషన్లు ఇక్కడే జరుగుతాయి.
        </li>
        <li>
          <strong>3. Frame Data (Constant Pool Resolution &amp; Return Address):</strong> మెథడ్ పూర్తి కాగానే తిరిగి ఏ లైన్‌కు వెళ్లాలో చెప్పే రిటర్న్ పీసీ (Program Counter) మరియు ఎక్సెప్షన్ హ్యాండ్లింగ్ టేబుల్స్.
        </li>
      </ul>
    </div>

    <!-- SECTION 6 -->
    <div id="sec-6" class="section-card">
      <h2>6. Local Variable Array &amp; Operand Stack పనితీరు (JVM Bytecode Execution)</h2>
      <p>
        రెండు సంఖ్యలను కూడే చిన్న మెథడ్ JVM లో ఎలా ఎగ్జిక్యూట్ అవుతుందో పరిశీలిద్దాం:
      </p>

      <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px 20px; margin:18px 0; font-family:'JetBrains Mono', monospace; font-size:13px; line-height:1.8;">
        <span style="color:#0284c7;">public static int</span> add(<span style="color:#0284c7;">int</span> a, <span style="color:#0284c7;">int</span> b) {<br />
        &nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#0284c7;">int</span> sum = a + b;<br />
        &nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#0284c7;">return</span> sum;<br />
        }<br /><br />
        <span style="color:#64748b;">// దీని అంతర్గత JVM బైట్‌కోడ్ స్టెప్స్:</span><br />
        iload_0&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#64748b;">// LVA స్లాట్ 0 (a) ని Operand Stack లోకి పుష్ చేయుట</span><br />
        iload_1&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#64748b;">// LVA స్లాట్ 1 (b) ని Operand Stack లోకి పుష్ చేయుట</span><br />
        iadd&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#64748b;">// రెండింటినీ పాప్ చేసి కూడి, ఫలితాన్ని స్టాక్‌పై ఉంచుట</span><br />
        istore_2&nbsp;&nbsp;&nbsp;<span style="color:#64748b;">// ఫలితాన్ని LVA స్లాట్ 2 (sum) లో భద్రపరచుట</span><br />
        iload_2&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#64748b;">// sum ని తిరిగి రిటర్న్ చేయడానికి లోడ్ చేయుట</span><br />
        ireturn&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#64748b;">// కాలర్ కు విలువను ఇచ్చి Stack Frame ను నశింపజేయుట</span>
      </div>

      <p>
        ఈ ప్రక్రియ మొత్తం అత్యంత సురక్షితమైనది ఎందుకంటే మెథడ్ ముగియగానే ఆ స్టాక్ ఫ్రేమ్ పూర్తిగా తుడిచిపెట్టుకుపోతుంది. గార్బేజ్ కలెక్టర్ సహాయం లేకుండానే లోకల్ వేరియబుల్స్ మెమరీ తక్షణమే విడుదలవుతుంది!
      </p>
    </div>

    <!-- SECTION 7 -->
    <div id="sec-7" class="section-card">
      <h2>7. రికర్షన్ (Recursion) &amp; బేస్ కండిషన్ నియమాలు (Self-Calling Methods)</h2>
      <p>
        ఒక మెథడ్ తనను తాను నేరుగా లేదా పరోక్షంగా తిరిగి పిలుచుకునే సాంకేతిక పద్ధతిని <strong>రికార్షన్ (Recursion)</strong> అంటారు. సంక్లిష్టమైన సమస్యలను (ట్రీ ట్రావర్సల్, గ్రాఫ్ అల్గారిథమ్స్, ఫ్యాక్టోరియల్, టవర్స్ ఆఫ్ హనోయ్) సరళమైన ఉప-సమస్యలుగా విడగొట్టడానికి రికర్షన్ ఉపయోగపడుతుంది.
      </p>

      <div style="background:#fefce8; border:1px solid #fde047; border-left:5px solid #ca8a04; border-radius:6px; padding:14px 18px; margin:16px 0; font-size:13.5px; color:#854d0e; line-height:1.7;">
        🎯 <strong>రికార్షన్ యొక్క రెండు బంగారు స్తంభాలు:</strong><br />
        1. <strong>బేస్ కండిషన్ (Base Case):</strong> రికర్సివ్ పిలుపులు ఎక్కడ ఆగిపోవాలో నిర్దేశించే నిష్క్రమణ షరతు. ఇది లేకపోతే రికర్షన్ అనంతంగా కొనసాగుతుంది.<br />
        2. <strong>రికార్సివ్ స్టెప్ (Recursive Step):</strong> సమస్యను ప్రతిసారీ బేస్ కేస్ వైపు నడిపించే చిన్న పిలుపు (ఉదా: <code>n * factorial(n - 1)</code>).
      </div>
    </div>

    <!-- SECTION 8 -->
    <div id="sec-8" class="section-card">
      <h2>8. StackOverflowError ఎందుకు వస్తుంది &amp; నివారణ (Stack Exhaustion)</h2>
      <p>
        JVM లో ప్రతి థ్రెడ్‌కు కాల్ స్టాక్ కోసం పరిమితమైన మెమరీ మాత్రమే ఉంటుంది (సాధారణంగా డీఫాల్ట్‌గా 1 MB లేదా <code>-Xss</code> ఫ్లాగ్‌తో నిర్దేశించిన పరిమాణం).
      </p>
      <p>
        మీరు రికార్సివ్ మెథడ్‌లో బేస్ కండిషన్ రాయడం మర్చిపోయినా, లేదా బేస్ కండిషన్ ఎప్పటికీ సంతృప్తి చెందని లాజిక్ రాసినా, ప్రతి కాల్‌కు ఒక్కో స్టాక్ ఫ్రేమ్ పేరుకుపోతూ స్టాక్ పరిమితిని దాటిపోతుంది. అప్పుడు JVM తక్షణమే <strong><code>java.lang.StackOverflowError</code></strong> ను విసిరి ప్రోగ్రామ్‌ను ఆపివేస్తుంది.
      </p>
      <p>
        <strong>నివారణ మార్గాలు:</strong>
        <br />
        • బేస్ కండిషన్ సరైనదో కాదో ఎల్లప్పుడూ యూనిట్ టెస్ట్‌లలో ముందుగా ధృవీకరించుకోవాలి.
        <br />
        • అత్యంత లోతైన పునరావృతాల కోసం (ఉదా: లక్షలాది ఇటరేషన్లు) రికర్షన్‌కు బదులుగా <code>while</code> లేదా <code>for</code> లూపులను (Iterative approach) ఉపయోగించాలి.
      </p>
    </div>

    <!-- SECTION 9: CODE DEMO 1 -->
    <div id="sec-9" class="section-card">
      <h2>9. డెమో 1: Pass-by-Value రుజువు (Primitives vs Object Reference Demonstration)</h2>
      <p>
        జావా కేవలం విలువలను మాత్రమే కాపీ చేస్తుందనడానికి తిరుగులేని రుజువును చూపే ప్రాక్టికల్ ప్రోగ్రామ్ ఇది. ప్రిమిటివ్ సంఖ్యలు, ఆబ్జెక్ట్ ఇంటర్నల్ స్టేట్ మార్పులు, మరియు రిఫరెన్స్ రీ-అసైన్‌మెంట్‌ల మధ్య వ్యత్యాసాన్ని కళ్లారా పరిశీలిద్దాం:
      </p>

      <div class="code-block">
        <div class="code-header">
          <span class="file-name">PassByValueProofDemo.java</span>
          <div class="btn-group">
            <button class="btn-copy" onclick="copyCodeSnippet(this)">📋 Copy Code</button>
            <button class="btn-run" onclick="runInJavaCompiler(this)">▶ Run in Java Compiler</button>
          </div>
        </div>
        <pre><code class="language-java">public class PassByValueProofDemo {

    static class CustomerAccount {
        String name;
        double balance;

        CustomerAccount(String name, double balance) {
            this.name = name;
            this.balance = balance;
        }

        @Override
        public String toString() {
            return "[" + name + " | ₹" + balance + "]";
        }
    }

    // 1. Primitive Modification Attempt
    public static void tryModifyPrimitive(int num) {
        num = num + 100;
        System.out.println("   -> Inside tryModifyPrimitive: num = " + num);
    }

    // 2. Object State Mutation Attempt
    public static void mutateAccountState(CustomerAccount acc) {
        acc.balance += 5000.0;
        System.out.println("   -> Inside mutateAccountState: acc = " + acc);
    }

    // 3. Object Reference Reassignment Attempt
    public static void reassignAccountReference(CustomerAccount acc) {
        // Assigning to a completely new heap object
        acc = new CustomerAccount("Hacker_Account", 0.0);
        System.out.println("   -> Inside reassignAccountReference: acc = " + acc);
    }

    public static void main(String[] args) {
        System.out.println("=================================================");
        System.out.println("🧪 INCONTROVERTIBLE PROOF: JAVA IS PASS-BY-VALUE");
        System.out.println("=================================================\n");

        // TEST 1: Primitives
        int score = 50;
        System.out.println("1. PRIMITIVE TEST:");
        System.out.println("   Before method call: score = " + score);
        tryModifyPrimitive(score);
        System.out.println("   After method call:  score = " + score);
        System.out.println("   ✅ తీర్పు: ప్రిమిటివ్ విలువ ఏమాత్రం మారలేదు!\n");

        // TEST 2: Object Internal Mutation
        CustomerAccount myAccount = new CustomerAccount("Balaji", 10000.0);
        System.out.println("2. OBJECT INTERNAL MUTATION TEST:");
        System.out.println("   Before method call: " + myAccount);
        mutateAccountState(myAccount);
        System.out.println("   After method call:  " + myAccount);
        System.out.println("   ✅ తీర్పు: రిఫరెన్స్ కాపీ ద్వారా హీప్ ఆబ్జెక్ట్ స్టేట్ మారింది!\n");

        // TEST 3: Object Reference Reassignment
        System.out.println("3. OBJECT REFERENCE REASSIGNMENT TEST:");
        System.out.println("   Before method call: " + myAccount);
        reassignAccountReference(myAccount);
        System.out.println("   After method call:  " + myAccount);
        System.out.println("   ✅ తీర్పు: మెథడ్ లోపల రిఫరెన్స్‌ను కొత్త ఆబ్జెక్ట్‌కు రీఅసైన్ చేసినా,");
        System.out.println("             కాలర్ చేతిలో ఉన్న ఒరిజినల్ రిఫరెన్స్ మారలేదు!");
        System.out.println("=================================================");
    }
}</code></pre>
      </div>

      <div class="code-output-card">
        <div class="output-header">Terminal Output:</div>
        <pre class="output-body">=================================================
🧪 INCONTROVERTIBLE PROOF: JAVA IS PASS-BY-VALUE
=================================================

1. PRIMITIVE TEST:
   Before method call: score = 50
   -> Inside tryModifyPrimitive: num = 150
   After method call:  score = 50
   ✅ తీర్పు: ప్రిమిటివ్ విలువ ఏమాత్రం మారలేదు!

2. OBJECT INTERNAL MUTATION TEST:
   Before method call: [Balaji | ₹10000.0]
   -> Inside mutateAccountState: acc = [Balaji | ₹15000.0]
   After method call:  [Balaji | ₹15000.0]
   ✅ తీర్పు: రిఫరెన్స్ కాపీ ద్వారా హీప్ ఆబ్జెక్ట్ స్టేట్ మారింది!

3. OBJECT REFERENCE REASSIGNMENT TEST:
   Before method call: [Balaji | ₹15000.0]
   -> Inside reassignAccountReference: acc = [Hacker_Account | ₹0.0]
   After method call:  [Balaji | ₹15000.0]
   ✅ తీర్పు: మెథడ్ లోపల రిఫరెన్స్‌ను కొత్త ఆబ్జెక్ట్‌కు రీఅసైన్ చేసినా,
             కాలర్ చేతిలో ఉన్న ఒరిజినల్ రిఫరెన్స్ మారలేదు!
=================================================</pre>
      </div>
    </div>

    <!-- SECTION 10: CODE DEMO 2 -->
    <div id="sec-10" class="section-card">
      <h2>10. డెమో 2: Call Stack ట్రేస్ &amp; రికర్సివ్ ఫ్యాక్టోరియల్ (Call Stack Inspection)</h2>
      <p>
        ఒక మెథడ్ నుండి మరొక మెథడ్‌కు కంట్రోల్ వెళ్లేటప్పుడు JVM స్టాక్ ఫ్రేమ్‌లు ఎలా పేర్చబడతాయో <code>Thread.currentThread().getStackTrace()</code> ద్వారా నేరుగా పరిశీలిద్దాం:
      </p>

      <div class="code-block">
        <div class="code-header">
          <span class="file-name">CallStackAndRecursionTracer.java</span>
          <div class="btn-group">
            <button class="btn-copy" onclick="copyCodeSnippet(this)">📋 Copy Code</button>
            <button class="btn-run" onclick="runInJavaCompiler(this)">▶ Run in Java Compiler</button>
          </div>
        </div>
        <pre><code class="language-java">public class CallStackAndRecursionTracer {

    public static void methodC() {
        System.out.println("   -> Inside methodC() [Deepest Stack Frame]:");
        StackTraceElement[] stack = Thread.currentThread().getStackTrace();
        for (int i = 1; i &lt; Math.min(5, stack.length); i++) {
            System.out.printf("      Frame [%d]: %s.%s() (Line: %d)%n",
                    i, stack[i].getClassName(), stack[i].getMethodName(), stack[i].getLineNumber());
        }
    }

    public static void methodB() {
        System.out.println("  -> Inside methodB()");
        methodC();
    }

    public static void methodA() {
        System.out.println(" -> Inside methodA()");
        methodB();
    }

    // Recursive Factorial with visual call stack indent
    public static long factorial(int n, int depth) {
        String indent = "  ".repeat(depth);
        System.out.println(indent + "📥 factorial(" + n + ") called -> Frame pushed");

        if (n &lt;= 1) {
            System.out.println(indent + "🎯 Base Case reached for n = " + n + " -> returning 1");
            return 1;
        }

        long result = n * factorial(n - 1, depth + 1);
        System.out.println(indent + "📤 factorial(" + n + ") returning " + result + " -> Frame popped");
        return result;
    }

    public static void main(String[] args) {
        System.out.println("=================================================");
        System.out.println("📚 JVM CALL STACK TRACER &amp; RECURSION VISUALIZER");
        System.out.println("=================================================\n");

        System.out.println("1. NESTED METHOD CALL STACK INSPECTION:");
        methodA();

        System.out.println("\n2. RECURSIVE CALL STACK VISUALIZATION (Factorial 4):");
        long fact4 = factorial(4, 0);
        System.out.println("\n🎉 Final Factorial(4) = " + fact4);
        System.out.println("=================================================");
    }
}</code></pre>
      </div>

      <div class="code-output-card">
        <div class="output-header">Terminal Output:</div>
        <pre class="output-body">=================================================
📚 JVM CALL STACK TRACER &amp; RECURSION VISUALIZER
=================================================

1. NESTED METHOD CALL STACK INSPECTION:
 -> Inside methodA()
  -> Inside methodB()
   -> Inside methodC() [Deepest Stack Frame]:
      Frame [1]: CallStackAndRecursionTracer.methodC() (Line: 6)
      Frame [2]: CallStackAndRecursionTracer.methodB() (Line: 16)
      Frame [3]: CallStackAndRecursionTracer.methodA() (Line: 21)
      Frame [4]: CallStackAndRecursionTracer.main() (Line: 43)

2. RECURSIVE CALL STACK VISUALIZATION (Factorial 4):
📥 factorial(4) called -> Frame pushed
  📥 factorial(3) called -> Frame pushed
    📥 factorial(2) called -> Frame pushed
      📥 factorial(1) called -> Frame pushed
      🎯 Base Case reached for n = 1 -> returning 1
    📤 factorial(2) returning 2 -> Frame popped
  📤 factorial(3) returning 6 -> Frame popped
📤 factorial(4) returning 24 -> Frame popped

🎉 Final Factorial(4) = 24
=================================================</pre>
      </div>
    </div>

    <!-- SECTION 11: CAPSTONE PROJECT -->
    <div id="sec-11" class="section-card">
      <h2>11. Capstone ప్రాజెక్ట్: ఎంటర్‌ప్రైజ్ ఈ-కామర్స్ ప్రైసింగ్ &amp; డిస్కౌంట్ ఇంజిన్</h2>
      <p>
        ఈ అధ్యాయంలో నేర్చుకున్న అన్ని కాన్సెప్టులను (మాడ్యులర్ మెథడ్స్, Pass-by-Value భద్రత, రిటర్న్ టైప్స్, పారామీటర్ వాలిడేషన్ మరియు క్లీన్ ఆర్కిటెక్చర్) ఉపయోగిస్తూ ఒక ప్రొడక్షన్-గ్రేడ్ <strong>Enterprise E-Commerce Order Pricing &amp; Invoice Engine</strong> ను నిర్మిద్దాం:
      </p>

      <div class="code-block">
        <div class="code-header">
          <span class="file-name">EcommercePricingEngine.java</span>
          <div class="btn-group">
            <button class="btn-copy" onclick="copyCodeSnippet(this)">📋 Copy Code</button>
            <button class="btn-run" onclick="runInJavaCompiler(this)">▶ Run in Java Compiler</button>
          </div>
        </div>
        <pre><code class="language-java">public class EcommercePricingEngine {

    // Cart Item Model
    public static class CartItem {
        String name;
        double unitPrice;
        int quantity;

        public CartItem(String name, double unitPrice, int quantity) {
            this.name = name;
            this.unitPrice = unitPrice;
            this.quantity = quantity;
        }

        public double getItemSubtotal() {
            return unitPrice * quantity;
        }
    }

    // Modular Business Methods
    public static double calculateRawSubtotal(CartItem[] items) {
        double subtotal = 0;
        for (CartItem item : items) {
            subtotal += item.getItemSubtotal();
        }
        return subtotal;
    }

    public static double applyCouponDiscount(double subtotal, String couponCode) {
        if (couponCode == null) return 0.0;

        return switch (couponCode.toUpperCase()) {
            case "WELCOME20" -&gt; subtotal * 0.20; // 20% off
            case "FESTIVE10" -&gt; subtotal * 0.10; // 10% off
            case "FLAT500"   -&gt; Math.min(500.0, subtotal);
            default          -&gt; 0.0;
        };
    }

    public static double calculateTax(double taxableAmount, double gstRate) {
        if (taxableAmount &lt;= 0) return 0.0;
        return taxableAmount * (gstRate / 100.0);
    }

    public static double calculateShipping(double netTotal) {
        return (netTotal &gt;= 2000.0) ? 0.0 : 150.0; // Free shipping over ₹2000
    }

    public static void printInvoice(String customer, CartItem[] items, String coupon, double gstRate) {
        double rawSubtotal = calculateRawSubtotal(items);
        double discount = applyCouponDiscount(rawSubtotal, coupon);
        double taxableAmount = rawSubtotal - discount;
        double tax = calculateTax(taxableAmount, gstRate);
        double shipping = calculateShipping(taxableAmount);
        double finalPayable = taxableAmount + tax + shipping;

        System.out.println("=================================================");
        System.out.println("🧾 E-COMMERCE TAX INVOICE &amp; PAYMENT ENVELOPE");
        System.out.println("=================================================");
        System.out.println("Customer Name: " + customer);
        System.out.println("-------------------------------------------------");
        System.out.printf("%-18s %8s %5s %12s%n", "Item", "Price", "Qty", "Total");
        System.out.println("-------------------------------------------------");
        for (CartItem item : items) {
            System.out.printf("%-18s ₹%7.2f %4d   ₹%9.2f%n",
                    item.name, item.unitPrice, item.quantity, item.getItemSubtotal());
        }
        System.out.println("-------------------------------------------------");
        System.out.printf("Gross Subtotal:                       ₹%10.2f%n", rawSubtotal);
        System.out.printf("Coupon Discount (%-9s):            -₹%10.2f%n", coupon, discount);
        System.out.printf("GST Tax (%4.1f%%):                      ₹%10.2f%n", gstRate, tax);
        System.out.printf("Shipping Charges:                     ₹%10.2f (%s)%n",
                shipping, (shipping == 0.0 ? "FREE" : "Standard"));
        System.out.println("=================================================");
        System.out.printf("💰 NET PAYABLE AMOUNT:                 ₹%10.2f%n", finalPayable);
        System.out.println("=================================================");
    }

    public static void main(String[] args) {
        CartItem[] cart = {
            new CartItem("Wireless Keyboard", 1899.00, 1),
            new CartItem("Ergonomic Mouse",   1250.00, 2),
            new CartItem("USB-C Fast Cable",   499.00, 3)
        };

        printInvoice("Balaji", cart, "WELCOME20", 18.0);
    }
}</code></pre>
      </div>

      <div class="code-output-card">
        <div class="output-header">Terminal Output:</div>
        <pre class="output-body">=================================================
🧾 E-COMMERCE TAX INVOICE &amp; PAYMENT ENVELOPE
=================================================
Customer Name: Balaji
-------------------------------------------------
Item                  Price   Qty        Total
-------------------------------------------------
Wireless Keyboard  ₹1899.00    1   ₹  1899.00
Ergonomic Mouse    ₹1250.00    2   ₹  2500.00
USB-C Fast Cable   ₹ 499.00    3   ₹  1497.00
-------------------------------------------------
Gross Subtotal:                       ₹   5896.00
Coupon Discount (WELCOME20 ):            -₹   1179.20
GST Tax (18.0%):                      ₹    849.02
Shipping Charges:                     ₹      0.00 (FREE)
=================================================
💰 NET PAYABLE AMOUNT:                 ₹   5565.82
=================================================</pre>
      </div>
    </div>

    <!-- SECTION 12 -->
    <div id="sec-12" class="section-card">
      <h2>12. ప్రొడక్షన్ పిట్‌ఫాల్స్, బెస్ట్ ప్రాక్టీసెస్ &amp; 5 క్విజ్‌లు (Best Practices &amp; Quizzes)</h2>

      <h4 style="color:#ef4444; margin:16px 0 10px 0;">🚫 ప్రొడక్షన్‌లో నివారించాల్సిన 4 ఘోరమైన తప్పులు (Production Pitfalls):</h4>
      <ol style="line-height:1.8; color:var(--text2); font-size:14px; padding-left:20px;">
        <li style="margin-bottom:10px;">
          <strong>జావాలో Pass-by-Reference ఉందని భావించడం:</strong> మెథడ్‌కు పంపిన ఆబ్జెక్ట్ రిఫరెన్స్‌ను రీ-అసైన్ చేస్తే (<code>acc = new Account()</code>) కాలర్ ఆబ్జెక్ట్ మారుతుందని అనుకోవడం తీవ్రమైన లాజిక్ బగ్స్‌కు దారితీస్తుంది.
        </li>
        <li style="margin-bottom:10px;">
          <strong>అతి పొడవైన గాడ్ మెథడ్స్ (God Methods) రాయడం:</strong> ఒకే మెథడ్‌లో 200 లైన్ల కోడ్ రాస్తే దాన్ని టెస్ట్ చేయడం లేదా డీబగ్ చేయడం అసాధ్యం. ప్రతి మెథడ్ కేవలం ఒకే ఒక్క బాధ్యతను (Single Responsibility Principle - SRP) మాత్రమే కలిగి ఉండాలి.
        </li>
        <li style="margin-bottom:10px;">
          <strong>రికార్సివ్ మెథడ్లలో బేస్ కేస్ సరిగా లేకపోవడం:</strong> బేస్ కేస్ బౌండరీ తప్పితే క్షణాల్లో <code>StackOverflowError</code> వచ్చి సర్వర్ క్రాష్ అవుతుంది.
        </li>
        <li style="margin-bottom:10px;">
          <strong>పారామీటర్లను వాలిడేట్ చేయకపోవడం:</strong> మెథడ్ ప్రారంభంలోనే <code>null</code> లేదా నెగటివ్ విలువలను తనిఖీ చేయకపోవడం (Fail Fast Principle పాటించకపోవడం) వల్ల లోతైన లైన్లలో అనవసరమైన NullPointerException లు వస్తాయి.
        </li>
      </ol>

      <h4 style="color:#10b981; margin:26px 0 10px 0;">✨ ప్రొడక్షన్ గోల్డెన్ రూల్స్ (Golden Rules):</h4>
      <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px 20px; font-size:13.5px; line-height:1.8; color:var(--text);">
        1. <strong>చిన్న మెథడ్స్:</strong> ఏ మెథడ్ అయినా 20 నుండి 30 లైన్ల లోపే ముగిసేలా రూపొందించండి.<br />
        2. <strong>పరిమిత పారామీటర్లు:</strong> మెథడ్‌కు 3 లేదా 4 కంటే ఎక్కువ పారామీటర్లు ఉంటే, వాటిని కలిపి ఒక డేటా క్లాస్ లేదా రికార్డ్ (Record) గా మార్చండి.<br />
        3. <strong>ప్రిడిక్టబుల్ రిటర్న్:</strong> కస్టమ్ ఆబ్జెక్ట్ లభించనప్పుడు <code>null</code> ఇచ్చే బదులు ఆధునిక <code>Optional&lt;T&gt;</code> ను వాడండి.<br />
        4. <strong>డెకరేటివ్ పేర్లు:</strong> మెథడ్ పేరు దాని పనిని స్పష్టంగా వెల్లడించేలా ఉండాలి (ఉదా: <code>calculateTax</code>, <code>isUserEligible</code>).
      </div>

      <!-- QUIZ SECTION -->
      <h3 style="color:#10b981; margin:32px 0 16px 0;">🧠 మీ అవగాహనను పరీక్షించుకోండి (5 Interactive Quizzes):</h3>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:12px 18px; margin-bottom:12px; cursor:pointer;">
        <summary style="font-weight:700; color:var(--text);">ప్రశ్న 1: జావాలో ఒక మెథడ్‌కు ఆర్గ్యుమెంట్‌గా పంపినప్పుడు ఏ విధంగా పాస్ అవుతుంది?</summary>
        <p style="margin-top:10px; color:var(--text2); line-height:1.7;">
          <strong>సమాధానం:</strong> జావా ఖచ్చితంగా 100% <strong>Pass-by-Value</strong> మాత్రమే. ప్రిమిటివ్‌ల విలువలు మరియు ఆబ్జెక్ట్‌ల మెమరీ రిఫరెన్స్ విలువలు కాపీ చేయబడి పంపబడతాయి.
        </p>
      </details>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:12px 18px; margin-bottom:12px; cursor:pointer;">
        <summary style="font-weight:700; color:var(--text);">ప్రశ్న 2: ఒక మెథడ్ కాల్ చేయబడినప్పుడు JVM స్టాక్ మెమరీలో ఏమి సృష్టించబడుతుంది?</summary>
        <p style="margin-top:10px; color:var(--text2); line-height:1.7;">
          <strong>సమాధానం:</strong> <strong>Stack Frame</strong> సృష్టించబడుతుంది. ఇందులో Local Variable Array, Operand Stack మరియు Frame Data ఉంటాయి.
        </p>
      </details>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:12px 18px; margin-bottom:12px; cursor:pointer;">
        <summary style="font-weight:700; color:var(--text);">ప్రశ్న 3: రికార్సివ్ మెథడ్‌లో 'బేస్ కండిషన్' (Base Condition) యొక్క ప్రాముఖ్యత ఏమిటి?</summary>
        <p style="margin-top:10px; color:var(--text2); line-height:1.7;">
          <strong>సమాధానం:</strong> రికర్సివ్ పిలుపులను సరైన సమయంలో ఆపివేసి ఫలితాన్ని వెనక్కి పంపడానికి బేస్ కేస్ తప్పనిసరి. ఇది లేకపోతే <code>StackOverflowError</code> వస్తుంది.
        </p>
      </details>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:12px 18px; margin-bottom:12px; cursor:pointer;">
        <summary style="font-weight:700; color:var(--text);">ప్రశ్న 4: మెథడ్ సిగ్నేచర్ (Method Signature) లో ఏ అంశాలు ఉంటాయి?</summary>
        <p style="margin-top:10px; color:var(--text2); line-height:1.7;">
          <strong>సమాధానం:</strong> కేవలం మెథడ్ పేరు మరియు దాని పారామీటర్ల డేటా టైప్స్/క్రమం మాత్రమే ఉంటాయి (రిటర్న్ టైప్ సిగ్నేచర్‌లో భాగం కాదు).
        </p>
      </details>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:12px 18px; margin-bottom:12px; cursor:pointer;">
        <summary style="font-weight:700; color:var(--text);">ప్రశ్న 5: ఇన్‌స్టాన్స్ మెథడ్ యొక్క Local Variable Array లో Slot 0 ఎల్లప్పుడూ దేనికి కేటాయించబడుతుంది?</summary>
        <p style="margin-top:10px; color:var(--text2); line-height:1.7;">
          <strong>సమాధానం:</strong> ప్రస్తుత ఆబ్జెక్ట్ యొక్క రిఫరెన్స్ అయిన <strong><code>this</code></strong> కీవర్డ్‌కు స్లాట్ 0 కేటాయించబడుతుంది.
        </p>
      </details>
    </div>

    <!-- NEXT / PREV NAVIGATION BUTTONS -->
    <div style="display:flex; justify-content:space-between; align-items:center; gap:16px; margin:48px 0 24px 0; flex-wrap:wrap;">
      <a href="/blog-java/11-java-arrays-multidimensional-and-algorithms.html" style="background:var(--bg2); border:1px solid var(--border); color:var(--text); padding:12px 22px; border-radius:8px; text-decoration:none; font-weight:700; font-size:14px; display:inline-flex; align-items:center; gap:8px;">
        ← మునుపటి పాఠం: 11. Arrays &amp; Algorithms
      </a>
      <a href="/blog-java/13-java-method-overloading-and-varargs.html" style="background:#facc15; border:1px solid #eab308; color:#121212; padding:12px 24px; border-radius:8px; text-decoration:none; font-weight:800; font-size:14px; display:inline-flex; align-items:center; gap:8px; box-shadow:0 2px 10px rgba(234, 179, 8, 0.25);">
        తర్వాతి పాఠం: 13. Method Overloading &amp; Varargs →
      </a>
    </div>
  </main>
</div>

<script src="/site-nav.js"></script>
</body>
</html>`;

const outPath = path.join(__dirname, '..', 'public', 'blog-java', '12-java-methods-call-stack-and-pass-by-value.html');
fs.writeFileSync(outPath, chapter12Content, 'utf8');

console.log('✅ Successfully generated Java Chapter 12 in exact JavaScript HTML style!');
console.log('Target file:', outPath);
console.log('Target file size:', chapter12Content.length, 'characters');
