const fs = require('fs');
const path = require('path');
const { LESSONS, buildJavaSidebar } = require('./java_curriculum_data.js');

const currentLesson = LESSONS.find(l => l.num === 7);

const chapter07Content = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Java Switch Statements &amp; Modern Switch Expressions తెలుగులో — Java Tutorial | Our Compiler</title>
  <meta name="description" content="జావా స్విచ్ స్టేట్‌మెంట్స్, break &amp; default లేబుల్స్, Fall-Through బిహేవియర్, Modern Java 14+ Switch Expressions (-> యారో సింటాక్స్), yield కీవర్డ్ మరియు Enum/String స్విచ్చింగ్ తెలుగులో సమగ్రంగా నేర్చుకోండి." />
  <meta name="keywords" content="java switch statement telugu, java modern switch expressions telugu, java switch arrow syntax telugu, java switch yield keyword telugu, java switch fallthrough telugu, java switch strings enum telugu" />
  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />
  <link rel="icon" type="image/png" href="/logo.png" />
  <link rel="canonical" href="https://www.ourcompiler.com/blog-java/07-java-switch-statements-and-switch-expressions.html" />
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
  ${buildJavaSidebar(7)}

  <!-- MAIN CONTENT -->
  <main class="content">
    <div class="breadcrumb">
      <a href="/">Home</a><span class="sep">›</span>
      <a href="/blog.html">Tutorials</a><span class="sep">›</span>
      <a href="/blog-java.html">Java</a><span class="sep">›</span>
      <span class="current">Lesson 07: switch Statements &amp; Expressions</span>
    </div>

    <h1 class="page-title">07. స్విచ్ స్టేట్‌మెంట్స్ &amp; మోడరన్ స్విచ్ ఎక్స్‌ప్రెషన్స్ (Switch Statements &amp; Modern Switch Expressions)</h1>

    <div class="page-meta">
      <span class="badge">☕ Java (Java 21+ LTS)</span>
      <span class="badge">🟢 Lesson 07 of 25</span>
      <span class="badge">📂 Part 02: Control Flow &amp; Strings (Page 2 of 5)</span>
      <span class="badge">⏱️ 22 min read</span>
    </div>

    <!-- Subtopics Pill Bar -->
    <div style="background:var(--bg3); border:1px solid var(--border); border-radius:8px; padding:10px 16px; margin-bottom:24px; font-size:13px; color:var(--text2); display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
      <span style="color:#10b981; font-weight:700;">📌 Covered in this lesson:</span>
      <span>Multi-Floor Elevator Analogy · Classic switch-case-break · Fall-through Trap · Supported Data Types (int, String, Enum) · Modern Java 14+ Arrow Syntax (->) · yield Keyword · Exhaustiveness &amp; Pattern Matching · 5 Interactive Quizzes</span>
    </div>

    <!-- Intro Box with Multi-Floor Elevator Analogy -->
    <div class="intro-box">
      <p style="font-size: 16px; line-height: 1.8; margin-bottom: 12px;">
        ఒక వేరియబుల్‌కు డజన్ల కొద్దీ విలువలలో ఏదో ఒకటి వచ్చే అవకాశం ఉన్నప్పుడు (ఉదాహరణకు వారంలోని 7 రోజులు, ట్రాఫిక్ సిగ్నల్ రంగులు, లేదా సర్వర్ ఎర్రర్ కోడ్‌లు), పదే పదే <code>if-else if-else if</code> ల్యాడర్ రాయడం కోడ్‌ను గజిబిజిగా మారుస్తుంది. దీనికి పరిష్కారంగా జావా వేగవంతమైన జంప్-టేబుల్ ఆర్కిటెక్చర్‌తో కూడిన <strong>switch</strong> స్టేట్‌మెంట్‌ను అందిస్తుంది.
      </p>
      <p style="font-size: 15px; line-height: 1.8; margin-bottom: 12px;">
        <strong>మల్టీ-ఫ్లోర్ లిఫ్ట్ &amp; స్మార్ట్ డిజిటల్ సెలెక్టర్ అనాలజీ (The Multi-Floor Elevator &amp; Smart Selector Analogy):</strong>
        <br>
        1. <strong>Classic switch (సాంప్రదాయ లిఫ్ట్ బటన్ ప్యానెల్):</strong> 20 అంతస్తుల భవనంలో లిఫ్ట్ ఎక్కినప్పుడు ప్రతి అంతస్తు వద్ద ఆగి డోర్ తీయకుండా, నేరుగా 12వ బటన్ నొక్కితే 12వ అంతస్తుకే వెళ్లి ఆగే డైరెక్ట్ జంప్ మెకానిజం.
        <br>
        2. <strong>The <code>break</code> Statement &amp; Fall-Through (ఆటోమేటిక్ డోర్ బ్రేక్):</strong> లిఫ్ట్ 12వ అంతస్తులో ఆగగానే <code>break</code> వేయకపోతే, ఆ కింద ఉన్న 13, 14, 15 ఫ్లోర్లలోకి ఆగకుండా జారిపోతుంది! ఈ ప్రమాదాన్నే <strong>Fall-Through Trap</strong> అంటారు.
        <br>
        3. <strong>Modern Java 14+ Switch Expressions (స్మార్ట్ టచ్ స్క్రీన్ లిఫ్ట్ - Arrow Syntax <code>-&gt;</code>):</strong> 
        ఆధునిక జావాలో పాతకాలపు బోరింగ్ <code>break</code> రాయాల్సిన పనేలేదు! సరికొత్త బాణం గుర్తు <code>-&gt;</code> ఆటోమేటిక్ బ్రేక్ ఇస్తుంది. అంతేకాకుండా స్విచ్ ఒక ఫలితాన్ని వేరియబుల్‌కు నేరుగా రిటర్న్ చేయగలదు (Expression) మరియు క్లిష్టమైన బ్లాక్స్ కోసం <code>yield</code> కీవర్డ్ తోడుగా ఉంటుంది.
      </p>
      <p style="font-size: 15px; line-height: 1.8; margin: 0;">
        ఈ ఏడవ పాఠంలో క్లాసిక్ స్విచ్ పరిమితులు, మోడరన్ జావా 14+ స్విచ్ ఎక్స్‌ప్రెషన్స్ (Arrow Labels), మరియు క్లౌడ్ సర్వర్ టైర్ ప్రైసింగ్ కాప్‌స్టోన్ ఇంజిన్ రూపకల్పనను సమగ్రంగా నేర్చుకుందాం!
      </p>
    </div>

    <!-- TABLE OF CONTENTS (ఈ page లో ఏముంది) -->
    <div class="toc-card">
      <div class="toc-title">📋 ఈ Page లో ఏముంది? (Contents)</div>
      <div class="toc-grid">
        <div class="toc-col">
          <h4><a href="#sec-1" style="color:#10b981; text-decoration:none;">విభాగం A: క్లాసిక్ స్విచ్ స్టేట్‌మెంట్స్</a></h4>
          <ul class="toc-list">
            <li><a href="#sec-1">1. switch స్టేట్‌మెంట్ ఉద్దేశం &amp; if-else కంటే ఎందుకు ఫాస్ట్?</a></li>
            <li><a href="#sec-2">2. స్విచ్ సపోర్ట్ చేసే డేటా టైప్స్</a></li>
            <li><a href="#sec-3">3. case, break &amp; default లేబుల్స్ అనాటమీ</a></li>
            <li><a href="#sec-4">4. Fall-Through బిహేవియర్: ఉద్దేశపూర్వక &amp; ప్రమాదకరమైన సందర్భాలు</a></li>
          </ul>
        </div>
        <div class="toc-col">
          <h4><a href="#sec-5" style="color:#38bdf8; text-decoration:none;">విభాగం B: Modern Switch Expressions</a></h4>
          <ul class="toc-list">
            <li><a href="#sec-5">5. Modern Switch Expressions ఆవిర్భావం (JEP 361)</a></li>
            <li><a href="#sec-6">6. Arrow Syntax (-&gt;) తో నో-ఫాల్‌త్రూ గ్యారెంటీ</a></li>
            <li><a href="#sec-7">7. yield కీవర్డ్: స్విచ్ బ్లాక్ నుండి రిటర్న్ వాల్యూస్</a></li>
            <li><a href="#sec-8">8. మల్టిపుల్ కామా-సెపరేటెడ్ లేబుల్స్</a></li>
          </ul>
        </div>
        <div class="toc-col">
          <h4><a href="#sec-9" style="color:#f59e0b; text-decoration:none;">విభాగం C: డెమోలు, ప్రాజెక్ట్ &amp; క్విజ్</a></h4>
          <ul class="toc-list">
            <li><a href="#sec-9">9. కోడ్ డెమో 1: వీక్లీ షెడ్యూల్ ప్లానర్ (Classic vs Modern)</a></li>
            <li><a href="#sec-10">10. కోడ్ డెమో 2: ఇ-కామర్స్ ఆర్డర్ స్టేటస్ ట్రాకర్ (String Switch)</a></li>
            <li><a href="#sec-11">11. కోడ్ డెమో 3: Cloud Server Billing Tier Engine (Capstone)</a></li>
            <li><a href="#sec-12">12. టాప్ 6 కామన్ స్విచ్ మిస్టేక్స్ &amp; 5 క్విజ్‌లు</a></li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Section 1 -->
    <h2 class="section-title" id="sec-1"><span class="num">1</span> switch స్టేట్‌మెంట్ ఉద్దేశం &amp; if-else కంటే ఎందుకు ఫాస్ట్?</h2>
    <div class="section-body">
      <p>
        ఒక వేరియబుల్‌లోని విలువను బట్టి అనేక మార్గాలలో ఒకదానిని ఎంచుకోవడానికి <code>switch</code> స్టేట్‌మెంట్ ఉపయోగపడుతుంది. సాధారణ <code>else-if</code> ల్యాడర్‌లో కంప్యూటర్ ప్రతి షరతును వరుసగా (O(N) లీనియర్ క్రమంలో) చెక్ చేసుకుంటూ వెళ్లాలి. అంటే 10వ కండిషన్ మ్యాచ్ అవ్వాలంటే ముందున్న 9 కండిషన్లనూ తప్పనిసరిగా లెక్కించాలి. కానీ <code>switch</code> లో కంపైలర్ బైట్‌కోడ్‌లో <strong>tableswitch</strong> లేదా <strong>lookupswitch</strong> అనే ఇంటర్నల్ జంప్ టేబుల్‌ను నిర్మిస్తుంది:
      </p>

      <div class="concept-card">
        <h4>⚡ Internal JVM Architecture: tableswitch vs lookupswitch:</h4>
        <p>
          1. <strong>tableswitch (వరుస సంఖ్యల కోసం - O(1) Time):</strong> కేస్ విలువలు వరుస క్రమంలో ఉంటే (ఉదా: 1, 2, 3, 4), JVM ఒక అరే ఇండెక్స్ తరహాలో <strong>O(1) కాన్‌స్టాంట్ టైమ్‌లో</strong> తక్షణమే సంబంధిత మెమరీ అడ్రస్‌కు జంప్ చేస్తుంది! మధ్యలో ఎన్ని వేల లైన్లు ఉన్నా ఫలితం ఒక్క సైకిల్‌లోనే తేలిపోతుంది.<br><br>
          2. <strong>lookupswitch (వివిక్త విలువల కోసం - O(log N) Time):</strong> కేస్ విలువలు వివిక్తంగా లేదా అస్తవ్యస్తంగా ఉంటే (ఉదా: 10, 500, 9999), కంపైలర్ వాటిని బైనరీ సెర్చ్ ట్రీ రూపంలో అమరుస్తుంది. లీనియర్ ఇఫ్-ఎల్స్ కంటే ఇది ఎన్నో రెట్లు వేగవంతమైనది.<br><br>
          అందువల్ల 5 కంటే ఎక్కువ బ్రాంచ్‌లు ఉన్నప్పుడు మరియు కచ్చితమైన విలువలను పరీక్షించేటప్పుడు <code>switch</code> వాడటం పరిశ్రమ ప్రామాణికం.
        </p>
      </div>
    </div>

    <!-- Section 2 -->
    <h2 class="section-title" id="sec-2"><span class="num">2</span> స్విచ్ సపోర్ట్ చేసే డేటా టైప్స్</h2>
    <div class="section-body">
      <p>
        జావాలో స్విచ్ అన్ని రకాల డేటా టైప్స్‌ను అంగీకరించదు. కేవలం కింది నిర్దిష్ట డేటా టైప్స్‌కు మాత్రమే స్విచ్ సపోర్ట్ ఉంది:
      </p>

      <table class="custom-table">
        <thead>
          <tr>
            <th>అనుమతించబడిన డేటా టైప్స్ (Allowed)</th>
            <th>అనుమతించబడని డేటా టైప్స్ (Disallowed - కంపైల్ ఎర్రర్)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>• <code>byte</code>, <code>short</code>, <code>char</code>, <code>int</code> (మరియు వాటి Wrapper Classes: Byte, Short, Character, Integer)</td>
            <td>• <code>float</code>, <code>double</code> (దశాంశాల అనిశ్చితి వల్ల స్విచ్ సపోర్ట్ చేయదు)</td>
          </tr>
          <tr>
            <td>• <code>String</code> (జావా 7 నుండి సపోర్ట్ అందుబాటులోకి వచ్చింది)</td>
            <td>• <code>long</code> (64-bit పరిమాణం వల్ల జంప్ టేబుల్ అసాధ్యం)</td>
          </tr>
          <tr>
            <td>• <code>enum</code> (జావా 5 నుండి ఎన్యూమరేషన్స్ సపోర్ట్)</td>
            <td>• <code>boolean</code> (కేవలం true/false మాత్రమే కాబట్టి if-else వాడాలి)</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Section 3 -->
    <h2 class="section-title" id="sec-3"><span class="num">3</span> case, break &amp; default లేబుల్స్ అనాటమీ</h2>
    <div class="section-body">
      <p>
        క్లాసిక్ స్విచ్ స్టేట్‌మెంట్‌లో ప్రతి బ్రాంచ్‌ను <code>case</code> లేబుల్‌తో గుర్తిస్తాం. ప్రతి కేస్ చివర <code>break;</code> స్టేట్‌మెంట్ రాయడం అత్యంత ముఖ్యం:
      </p>

      <div style="background:#1e1e1e; color:#d4d4d4; padding:18px 22px; border-radius:8px; font-family:'JetBrains Mono',monospace; font-size:13.5px; margin:16px 0; border:1px solid #333; line-height:1.8;">
        <span style="color:#569cd6;">int</span> dayOfWeek = <span style="color:#b5cea8;">3</span>;<br><br>

        <span style="color:#569cd6;">switch</span> (dayOfWeek) {<br>
        &nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#569cd6;">case</span> <span style="color:#b5cea8;">1</span>:<br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#4ec9b0;">System</span>.<span style="color:#9cdcfe;">out</span>.<span style="color:#dcdcaa;">println</span>(<span style="color:#ce9178;">"సోమవారం (Monday)"</span>);<br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#569cd6;">break</span>;<br>
        &nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#569cd6;">case</span> <span style="color:#b5cea8;">2</span>:<br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#4ec9b0;">System</span>.<span style="color:#9cdcfe;">out</span>.<span style="color:#dcdcaa;">println</span>(<span style="color:#ce9178;">"మంగళవారం (Tuesday)"</span>);<br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#569cd6;">break</span>;<br>
        &nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#569cd6;">case</span> <span style="color:#b5cea8;">3</span>:<br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#4ec9b0;">System</span>.<span style="color:#9cdcfe;">out</span>.<span style="color:#dcdcaa;">println</span>(<span style="color:#ce9178;">"బుధవారం (Wednesday)"</span>);<br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#569cd6;">break</span>;<br>
        &nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#569cd6;">default</span>:<br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#4ec9b0;">System</span>.<span style="color:#9cdcfe;">out</span>.<span style="color:#dcdcaa;">println</span>(<span style="color:#ce9178;">"చెల్లని వారం సంఖ్య!"</span>);<br>
        }
      </div>

      <p>
        <strong>default లేబుల్:</strong> పైన పేర్కొన్న ఏ ఒక్క కేస్ కూడా మ్యాచ్ కానప్పుడు <code>default</code> బ్లాక్ రన్ అవుతుంది (if-else లోని చివరి <code>else</code> లాంటిది).
      </p>
    </div>

    <!-- Section 4 -->
    <h2 class="section-title" id="sec-4"><span class="num">4</span> Fall-Through బిహేవియర్: ఉద్దేశపూర్వక &amp; ప్రమాదకరమైన సందర్భాలు</h2>
    <div class="section-body">
      <p>
        ఒక <code>case</code> బ్లాక్ చివర <code>break</code> రాయడం మర్చిపోతే, తర్వాతి కేస్ యొక్క షరతు మ్యాచ్ కాకపోయినప్పటికీ ఆ కోడ్ కూడా రన్ అవుతుంది! దీనినే <strong>Fall-Through</strong> అంటారు:
      </p>

      <div class="concept-card">
        <h4>🎯 When Fall-Through is Useful (ఉద్దేశపూర్వక వినియోగం):</h4>
        <p>
          బహుళ కేస్‌లకు ఒకే లాజిక్ రన్ చేయాలనుకున్నప్పుడు ఫాల్-త్రూ ఉద్దేశపూర్వకంగా వాడతారు:<br>
          <code>case 1: case 2: case 3: case 4: case 5: System.out.println("వారపు పనిదినం (Weekday)"); break;</code><br>
          <code>case 6: case 7: System.out.println("వారాంతపు సెలవు (Weekend)"); break;</code><br>
          అయితే 90% సందర్భాలలో బిగినర్లు పొరపాటున <code>break</code> మర్చిపోయి భయంకరమైన బగ్స్‌ను సృష్టిస్తుంటారు.
        </p>
      </div>
    </div>

    <!-- Section 5 -->
    <h2 class="section-title" id="sec-5"><span class="num">5</span> Modern Switch Expressions ఆవిర్భావం (JEP 361)</h2>
    <div class="section-body">
      <p>
        పాతకాలపు స్విచ్‌లోని <code>break</code> స్టేట్‌మెంట్లు, బాయిలర్‌ప్లేట్ కోడ్, మరియు ఫాల్-త్రూ బగ్స్‌ను శాశ్వతంగా నిర్మూలించడానికి జావా 14 లో అధికారికంగా <strong>Switch Expressions (JEP 361)</strong> ను విడుదల చేశారు.
      </p>
      <div class="concept-card">
        <h4>🚀 Statement vs Expression:</h4>
        <p>
          • <strong>Statement:</strong> కేవలం ఒక పనిని చేస్తుంది, కానీ ఎలాంటి విలువను వెనక్కి ఇవ్వదు (రిటర్న్ చేయదు).<br>
          • <strong>Expression:</strong> ఒక పనిని పూర్తి చేసుకుని ఒక నిర్దిష్ట విలువను (Result) నేరుగా వేరియబుల్‌కు అందజేస్తుంది. ఉదా: <code>var result = switch(day) { ... };</code>
        </p>
      </div>
    </div>

    <!-- Section 6 -->
    <h2 class="section-title" id="sec-6"><span class="num">6</span> Arrow Syntax (-&gt;) తో నో-ఫాల్‌త్రూ గ్యారెంటీ</h2>
    <div class="section-body">
      <p>
        ఆధునిక జావాలో కోలన్ <code>:</code> బదులుగా బాణం గుర్తు <strong><code>-&gt;</code> (Arrow Syntax)</strong> వాడతాం. ఇందులో <code>break</code> రాయాల్సిన అవసరమే లేదు! కంపైలర్ స్వయంచాలకంగా సంబంధిత కేస్‌ను మాత్రమే రన్ చేసి బయటకు వచ్చేస్తుంది:
      </p>

      <div style="background:#1e1e1e; color:#d4d4d4; padding:18px 22px; border-radius:8px; font-family:'JetBrains Mono',monospace; font-size:13.5px; margin:16px 0; border:1px solid #333; line-height:1.8;">
        <span style="color:#569cd6;">String</span> dayType = <span style="color:#569cd6;">switch</span> (dayOfWeek) {<br>
        &nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#569cd6;">case</span> <span style="color:#b5cea8;">1</span>, <span style="color:#b5cea8;">2</span>, <span style="color:#b5cea8;">3</span>, <span style="color:#b5cea8;">4</span>, <span style="color:#b5cea8;">5</span> -&gt; <span style="color:#ce9178;">"వారపు పనిదినం (Weekday)"</span>;<br>
        &nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#569cd6;">case</span> <span style="color:#b5cea8;">6</span>, <span style="color:#b5cea8;">7</span> -&gt; <span style="color:#ce9178;">"వారాంతపు సెలవు (Weekend)"</span>;<br>
        &nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#569cd6;">default</span> -&gt; <span style="color:#ce9178;">"చెల్లని సంఖ్య"</span>;<br>
        }; <span style="color:#6a9955;">// గమనిక: స్విచ్ ఎక్స్‌ప్రెషన్ చివర సెమీకోలన్ తప్పనిసరి!</span>
      </div>
    </div>

    <!-- Section 7 -->
    <h2 class="section-title" id="sec-7"><span class="num">7</span> yield కీవర్డ్: స్విచ్ బ్లాక్ నుండి రిటర్న్ వాల్యూస్</h2>
    <div class="section-body">
      <p>
        ఒక కేస్ లోపల కేవలం ఒకే లైన్ కాకుండా, బహుళ లైన్ల లాజిక్ లేదా లాగింగ్ అవసరమైనప్పుడు కర్లీ బ్రాకెట్స్ <code>{ }</code> వాడి, చివరి విలువను బయటకు పంపడానికి <strong><code>yield</code></strong> కీవర్డ్ ఉపయోగిస్తాం:
      </p>

      <div class="concept-card">
        <h4>🔬 The 'yield' Keyword Explained:</h4>
        <p>
          మెథడ్స్ లోపల <code>return</code> ఎలాగో, స్విచ్ ఎక్స్‌ప్రెషన్ బ్లాక్ లోపల <code>yield</code> అలా పనిచేస్తుంది:<br>
          <code>case "VIP" -&gt; {<br>
          &nbsp;&nbsp;&nbsp;&nbsp;System.out.println("Applying Premium VIP Benefits");<br>
          &nbsp;&nbsp;&nbsp;&nbsp;double discount = calculateSpecialDiscount();<br>
          &nbsp;&nbsp;&nbsp;&nbsp;yield discount;<br>
          };</code>
        </p>
      </div>
    </div>

    <!-- Section 8 -->
    <h2 class="section-title" id="sec-8"><span class="num">8</span> మల్టిపుల్ కామా-సెపరేటెడ్ లేబుల్స్ &amp; Java 21 ప్యాటర్న్ మ్యాచింగ్</h2>
    <div class="section-body">
      <p>
        ఆధునిక జావా స్విచ్‌లో బహుళ విలువల కోసం వేర్వేరు లైన్లు రాయకుండా ఒకే లైన్‌లో కామాతో వేరుచేయవచ్చు: <code>case "MON", "WED", "FRI" -&gt; ...</code>
      </p>

      <div class="concept-card">
        <h4>🔒 Exhaustiveness Requirement (పరిపూర్ణత నిబంధన):</h4>
        <p>
          స్విచ్‌ను ఒక ఎక్స్‌ప్రెషన్‌గా వాడి విలువను రిటర్న్ చేస్తున్నప్పుడు, ప్రవేశపెట్టిన వేరియబుల్ యొక్క అన్ని సంభావ్య విలువలనూ తప్పనిసరిగా కవర్ చేయాలి! కాబట్టి స్విచ్ ఎక్స్‌ప్రెషన్‌లో <strong><code>default</code> లేబుల్ ఖచ్చితంగా ఉండాలి</strong> (Enum వాడి అన్ని enum కాన్‌స్టాంట్స్ కవర్ చేసినప్పుడు మినహా).
        </p>
      </div>

      <div class="concept-card">
        <h4>🚀 Modern Java 21 Pattern Matching for switch (JEP 441):</h4>
        <p>
          జావా 21 LTS లో విడుదలైన అత్యంత శక్తివంతమైన ఫీచర్ — <strong>Pattern Matching for switch</strong>. గతంలో ఒక ఆబ్జెక్ట్ రకాన్ని తెలుసుకోవడానికి పదే పదే <code>instanceof</code> మరియు టైప్ కాస్టింగ్ రాయాల్సి వచ్చేది. ఇప్పుడు నేరుగా స్విచ్‌లోనే టైప్ ప్యాటర్న్స్ మరియు <code>when</code> గార్డ్స్ వాడవచ్చు:<br>
          <pre style="background:#111; padding:12px; border-radius:6px; color:#569cd6; font-size:12.5px; margin-top:8px;">static String formatValue(Object obj) {
    return switch (obj) {
        case Integer i -&gt; String.format("పూర్ణాంకం: %d", i);
        case Double d  -&gt; String.format("దశాంశం: %.2f", d);
        case String s when s.length() &gt; 5 -&gt; "పొడవైన పదం: " + s.toUpperCase();
        case String s  -&gt; "చిన్న పదం: " + s;
        case null      -&gt; "[నల్ ఆబ్జెక్ట్]";
        default        -&gt; "గుర్తించబడని రకం: " + obj.toString();
    };
}</pre>
          ఈ సరికొత్త జావా 21 సింటాక్స్ ద్వారా కోడ్ ఎంతో సురక్షితంగా మరియు ఆధునికంగా మారుతుంది.
        </p>
      </div>

      <div class="concept-card">
        <h4>🔬 How String Switching Works Internally (Bytecode Level):</h4>
        <p>
          స్ట్రింగ్స్‌ను స్విచ్ చేసినప్పుడు కంపైలర్ రెండు దశలలో పనిచేస్తుంది:<br>
          1. మొదట స్ట్రింగ్ యొక్క <code>hashCode()</code> ను లెక్కించి ఇంటీజర్ జంప్ టేబుల్‌ను ఎగ్జిక్యూట్ చేస్తుంది.<br>
          2. వేర్వేరు స్ట్రింగ్స్‌కు ఒకే హ్యాష్‌కోడ్ వచ్చే అవకాశం (Hash Collision) ఉంటుంది కాబట్టి, ధృవీకరణ కోసం అంతర్గతంగా <code>equals()</code> మెథడ్‌ను కాల్ చేసి కచ్చితమైన సమానత్వాన్ని నిర్ధారిస్తుంది!
        </p>
      </div>
    </div>

    <!-- Section 9 -->
    <h2 class="section-title" id="sec-9"><span class="num">9</span> కోడ్ డెమో 1: వీక్లీ షెడ్యూల్ ప్లానర్ (Classic vs Modern Switch)</h2>
    <div class="section-body">
      <p>
        సాంప్రదాయ బ్రేక్ ఆధారిత స్విచ్ మరియు ఆధునిక యారో సింటాక్స్ స్విచ్ ఎక్స్‌ప్రెషన్‌ల మధ్య వ్యత్యాసాన్ని స్పష్టంగా ప్రదర్శించే లైవ్ ప్రోగ్రామ్:
      </p>

      <!-- CODE BLOCK 1 -->
      <div class="code-block">
        <div class="code-block-header">
          <span class="file-name">WeeklySchedulePlanner.java</span>
          <div class="code-actions">
            <button class="copy-btn" onclick="copyCodeSnippet(this)">📋 Copy</button>
            <button class="try-btn" onclick="runInJavaCompiler(this)">▶ Run in Java Compiler</button>
          </div>
        </div>
        <pre><code>public class WeeklySchedulePlanner {
    public static void main(String[] args) {
        System.out.println("==================================================");
        System.out.println("      WEEKLY SCHEDULE &amp; WORKFLOW PLANNER ENGINE    ");
        System.out.println("==================================================");

        int dayNumber = 4; // Thursday

        // 1. Classic Switch Statement with Fall-through &amp; Break
        System.out.print("[CLASSIC SWITCH] Day " + dayNumber + " is: ");
        switch (dayNumber) {
            case 1: System.out.println("Monday (Sprint Planning)"); break;
            case 2: System.out.println("Tuesday (Code Development)"); break;
            case 3: System.out.println("Wednesday (Mid-week Sync)"); break;
            case 4: System.out.println("Thursday (Code Review &amp; QA)"); break;
            case 5: System.out.println("Friday (Deployment to Staging)"); break;
            case 6: case 7: System.out.println("Weekend (Recharge &amp; Family)"); break;
            default: System.out.println("Invalid day index!");
        }

        // 2. Modern Java 14+ Switch Expression with Arrow Syntax
        String focusArea = switch (dayNumber) {
            case 1 -&gt; "Sprint Planning &amp; Architecture Roadmap";
            case 2, 3 -&gt; "Core Feature Implementation (Full-Throttle)";
            case 4 -&gt; "Automated Testing, Security Audit &amp; PR Reviews";
            case 5 -&gt; "Production Release &amp; Monitoring";
            case 6, 7 -&gt; "Offline (Personal Downtime)";
            default -&gt; "Unassigned Day";
        };

        System.out.println("--------------------------------------------------");
        System.out.println("[MODERN SWITCH] Focus Area: " + focusArea);
        System.out.println("==================================================");
    }
}</code></pre>
      </div>

      <!-- TERMINAL OUTPUT 1 -->
      <div class="code-output-card">
        <div class="output-header">💻 Console Output (WeeklySchedulePlanner)</div>
        <pre class="output-content">==================================================
      WEEKLY SCHEDULE &amp; WORKFLOW PLANNER ENGINE    
==================================================
[CLASSIC SWITCH] Day 4 is: Thursday (Code Review &amp; QA)
--------------------------------------------------
[MODERN SWITCH] Focus Area: Automated Testing, Security Audit &amp; PR Reviews
==================================================</pre>
      </div>
    </div>

    <!-- Section 10 -->
    <h2 class="section-title" id="sec-10"><span class="num">10</span> కోడ్ డెమో 2: ఇ-కామర్స్ ఆర్డర్ స్టేటస్ ట్రాకర్ (String Switching)</h2>
    <div class="section-body">
      <p>
        స్ట్రింగ్ ఆబ్జెక్టులను స్విచ్‌లో ఉపయోగించి లాజిస్టిక్స్ డెలివరీ స్టేటస్‌ను విశ్లేషించే ఎంటర్‌ప్రైజ్ ఆర్డర్ ట్రాకర్ ప్రోగ్రామ్:
      </p>

      <!-- CODE BLOCK 2 -->
      <div class="code-block">
        <div class="code-block-header">
          <span class="file-name">OrderStatusTracker.java</span>
          <div class="code-actions">
            <button class="copy-btn" onclick="copyCodeSnippet(this)">📋 Copy</button>
            <button class="try-btn" onclick="runInJavaCompiler(this)">▶ Run in Java Compiler</button>
          </div>
        </div>
        <pre><code>public class OrderStatusTracker {
    public static void main(String[] args) {
        String trackingId   = "IND-DEL-984210";
        String currentStatus = "OUT_FOR_DELIVERY";

        System.out.println("--------------------------------------------------");
        System.out.println("       LOGISTICS ORDER DISPATCH &amp; TRACKING        ");
        System.out.println("--------------------------------------------------");
        System.out.println("Tracking ID   : " + trackingId);
        System.out.println("Current Status: " + currentStatus);

        // String based Modern Switch Expression
        String customerAlert = switch (currentStatus.toUpperCase()) {
            case "ORDER_PLACED" -&gt; "Your order has been confirmed by the merchant.";
            case "PROCESSING"   -&gt; "Warehouse team is currently packaging your items.";
            case "SHIPPED"      -&gt; "Package has left the central distribution hub.";
            case "OUT_FOR_DELIVERY" -&gt; {
                String deliveryExecutive = "శ్రీకాంత్ యాదవ్ (Ph: +91 98765 43210)";
                yield "Out for delivery today! Agent: " + deliveryExecutive;
            }
            case "DELIVERED"    -&gt; "Package delivered successfully! Thank you for shopping.";
            case "CANCELLED", "RETURNED" -&gt; "Order was canceled. Refund initiated to source bank.";
            default -&gt; "Unknown status code. Please contact customer care.";
        };

        System.out.println("--------------------------------------------------");
        System.out.println("Customer Notification:\n  &gt;&gt; " + customerAlert);
        System.out.println("--------------------------------------------------");
    }
}</code></pre>
      </div>

      <!-- TERMINAL OUTPUT 2 -->
      <div class="code-output-card">
        <div class="output-header">💻 Console Output (OrderStatusTracker)</div>
        <pre class="output-content">--------------------------------------------------
       LOGISTICS ORDER DISPATCH &amp; TRACKING        
--------------------------------------------------
Tracking ID   : IND-DEL-984210
Current Status: OUT_FOR_DELIVERY
--------------------------------------------------
Customer Notification:
  &gt;&gt; Out for delivery today! Agent: శ్రీకాంత్ యాదవ్ (Ph: +91 98765 43210)
--------------------------------------------------</pre>
      </div>
    </div>

    <!-- Section 11 -->
    <h2 class="section-title" id="sec-11"><span class="num">11</span> కోడ్ డెమో 3: Cloud Server Billing Tier Engine (Capstone Mini Project)</h2>
    <div class="section-body">
      <p>
        ఒక పూర్తిస్థాయి క్లౌడ్ ఇన్‌ఫ్రాస్ట్రక్చర్ ప్రైసింగ్ ఇంజిన్: సర్వర్ ఆర్కిటెక్చర్, vCPUలు, RAM మరియు బ్యాండ్‌విడ్త్ ఆధారంగా మంత్లీ బిల్లును లెక్కించడానికి <code>yield</code> కీవర్డ్ మరియు బహుళ లేబుల్స్ ఉపయోగించే కాప్‌స్టోన్ ప్రాజెక్ట్:
      </p>

      <!-- CODE BLOCK 3 -->
      <div class="code-block">
        <div class="code-block-header">
          <span class="file-name">CloudBillingTierEngine.java</span>
          <div class="code-actions">
            <button class="copy-btn" onclick="copyCodeSnippet(this)">📋 Copy</button>
            <button class="try-btn" onclick="runInJavaCompiler(this)">▶ Run in Java Compiler</button>
          </div>
        </div>
        <pre><code>public class CloudBillingTierEngine {
    public static void main(String[] args) {
        String instanceTier = "ENTERPRISE_PRO";
        int activeHours     = 720; // Full 30 days month
        double discountRate = 0.10; // 10% Long-term commitment

        System.out.println("==================================================");
        System.out.println("      HYPER-SCALE CLOUD INFRASTRUCTURE BILLING    ");
        System.out.println("==================================================");

        // Modern Switch Expression evaluating hourly rate using yield
        double hourlyRateUSD = switch (instanceTier.toUpperCase()) {
            case "NANO", "MICRO" -&gt; 0.015;
            case "SMALL", "MEDIUM" -&gt; 0.045;
            case "LARGE", "XLARGE" -&gt; 0.180;
            case "ENTERPRISE_PRO" -&gt; {
                double baseCompute = 0.450; // 16 vCPU, 64GB RAM
                double dedicatedNetworkSla = 0.080; // 10 Gbps SLA
                yield baseCompute + dedicatedNetworkSla;
            }
            default -&gt; {
                System.out.println("[WARN] Unrecognized tier. Defaulting to standard Micro.");
                yield 0.015;
            }
        };

        double grossCostUSD = activeHours * hourlyRateUSD;
        double discountUSD  = grossCostUSD * discountRate;
        double netCostUSD    = grossCostUSD - discountUSD;
        double netCostINR    = netCostUSD * 83.25;

        System.out.printf("  Selected Tier  : %s%n", instanceTier);
        System.out.printf("  Billing Rate   : $%.3f USD per hour%n", hourlyRateUSD);
        System.out.printf("  Uptime Hours   : %d hours%n", activeHours);
        System.out.println("--------------------------------------------------");
        System.out.printf("  Gross Compute  : $%,10.2f USD%n", grossCostUSD);
        System.out.printf("  Commitment Disc: -$%,9.2f USD (10%%)%n", discountUSD);
        System.out.println("--------------------------------------------------");
        System.out.printf("  TOTAL INVOICE  : $%,10.2f USD%n", netCostUSD);
        System.out.printf("  TOTAL IN INR   : ₹ %,10.2f INR%n", netCostINR);
        System.out.println("==================================================");
    }
}</code></pre>
      </div>

      <!-- TERMINAL OUTPUT 3 -->
      <div class="code-output-card">
        <div class="output-header">💻 Console Output (CloudBillingTierEngine)</div>
        <pre class="output-content">=================================================="
      HYPER-SCALE CLOUD INFRASTRUCTURE BILLING    
==================================================
  Selected Tier  : ENTERPRISE_PRO
  Billing Rate   : $0.530 USD per hour
  Uptime Hours   : 720 hours
--------------------------------------------------
  Gross Compute  : $    381.60 USD
  Commitment Disc: -$     38.16 USD (10%)
--------------------------------------------------
  TOTAL INVOICE  : $    343.44 USD
  TOTAL IN INR   : ₹  28,591.38 INR
==================================================</pre>
      </div>
    </div>

    <!-- Section 12 -->
    <h2 class="section-title" id="sec-12"><span class="num">12</span> టాప్ 6 కామన్ స్విచ్ మిస్టేక్స్ &amp; 5 క్విజ్‌లు</h2>
    <div class="section-body">
      <p>
        స్విచ్ స్టేట్‌మెంట్స్ మరియు ఎక్స్‌ప్రెషన్స్‌లో డెవలపర్లు తరచుగా చేసే 6 ప్రధాన తప్పులు:
      </p>

      <table class="custom-table">
        <thead>
          <tr>
            <th>లోపం</th>
            <th>తప్పు కోడ్</th>
            <th>సరిదిద్దిన సరైన విధానం</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>క్లాసిక్ స్విచ్‌లో break మర్చిపోవడం</strong></td>
            <td><code>case 1: doA(); case 2: doB();</code> (ఫాల్-త్రూ జరుగుతుంది)</td>
            <td>ప్రతి కేస్ చివర <code>break;</code> లేదా మోడరన్ యారో సింటాక్స్ <code>-&gt;</code> వాడాలి.</td>
          </tr>
          <tr>
            <td><strong>ఫ్లోట్ లేదా డబుల్ వేరియబుల్స్ స్విచ్‌లో వాడటం</strong></td>
            <td><code>double d = 2.5; switch(d)</code> (కంపైల్ ఎర్రర్)</td>
            <td>ఫ్లోటింగ్ పాయింట్లకు <code>if-else</code> వాడాలి.</td>
          </tr>
          <tr>
            <td><strong>స్విచ్ ఎక్స్‌ప్రెషన్‌లో default లేకపోవడం</strong></td>
            <td><code>int res = switch(x) { case 1 -&gt; 10; };</code></td>
            <td>అన్ని సంభావ్య విలువల కోసం తప్పనిసరిగా <code>default -&gt; ...</code> ఉండాలి.</td>
          </tr>
          <tr>
            <td><strong>స్విచ్ ఎక్స్‌ప్రెషన్ చివర సెమీకోలన్ మర్చిపోవడం</strong></td>
            <td><code>int x = switch(...) { ... }</code></td>
            <td>ఎక్స్‌ప్రెషన్ అసైన్‌మెంట్ కాబట్టి చివర <code>};</code> ఉండాలి.</td>
          </tr>
          <tr>
            <td><strong>yield బదులు return వాడటం</strong></td>
            <td><code>case 1 -&gt; { return 10; }</code> (మొత్తం మెథడ్ రిటర్న్ అయిపోతుంది!)</td>
            <td>కేవలం స్విచ్ నుండి రిటర్న్ కావడానికి <code>yield 10;</code> వాడాలి.</td>
          </tr>
          <tr>
            <td><strong>కేస్ లేబుల్స్‌లో వేరియబుల్స్ వాడటం</strong></td>
            <td><code>int y = 5; case y:</code></td>
            <td>కేస్ లేబుల్స్ ఖచ్చితంగా <strong>Compile-time Constants</strong> అయి ఉండాలి (ఉదా: <code>final int y = 5;</code>).</td>
          </tr>
        </tbody>
      </table>

      <!-- QUIZ SECTION -->
      <h3 style="color:#10b981; margin:32px 0 16px 0;">🧠 మీ అవగాహనను పరీక్షించుకోండి (5 Interactive Quizzes):</h3>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:12px 18px; margin-bottom:12px; cursor:pointer;">
        <summary style="font-weight:700; color:var(--text);">ప్రశ్న 1: జావాలో స్విచ్ స్టేట్‌మెంట్‌కు 'double' వేరియబుల్‌ను పాస్ చేయవచ్చా?</summary>
        <p style="margin-top:10px; color:var(--text2); line-height:1.7;">
          <strong>సమాధానం:</strong> పాస్ చేయకూడదు! ఫ్లోటింగ్ పాయింట్ సంఖ్యలకు కచ్చితమైన సమానత్వం ఉండదు కాబట్టి జావా కంపైల్-టైమ్ ఎర్రర్ ఇస్తుంది.
        </p>
      </details>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:12px 18px; margin-bottom:12px; cursor:pointer;">
        <summary style="font-weight:700; color:var(--text);">ప్రశ్న 2: Modern Switch Expressions లో '->' (Arrow) సింటాక్స్ యొక్క ముఖ్య ప్రయోజనం ఏమిటి?</summary>
        <p style="margin-top:10px; color:var(--text2); line-height:1.7;">
          <strong>సమాధానం:</strong> ఆటోమేటిక్ బ్రేక్! యారో సింటాక్స్ వాడినప్పుడు ఫాల్-త్రూ (Fall-through) జరగదు, కాబట్టి ప్రత్యేకంగా <code>break</code> రాయాల్సిన అవసరమే లేదు.
        </p>
      </details>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:12px 18px; margin-bottom:12px; cursor:pointer;">
        <summary style="font-weight:700; color:var(--text);">ప్రశ్న 3: స్విచ్ ఎక్స్‌ప్రెషన్ బ్లాక్ నుండి విలువను రిటర్న్ చేయడానికి ఏ కీవర్డ్ వాడతారు?</summary>
        <p style="margin-top:10px; color:var(--text2); line-height:1.7;">
          <strong>సమాధానం:</strong> <code>yield</code> కీవర్డ్. (ఇది జావా 14 లో పరిచయం చేయబడింది).
        </p>
      </details>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:12px 18px; margin-bottom:12px; cursor:pointer;">
        <summary style="font-weight:700; color:var(--text);">ప్రశ్న 4: ఒకే కేస్‌లో బహుళ విలువలను ఎలా పేర్కొనవచ్చు?</summary>
        <p style="margin-top:10px; color:var(--text2); line-height:1.7;">
          <strong>సమాధానం:</strong> కామాతో వేరుచేయవచ్చు: <code>case 1, 2, 3 -&gt; ...</code> (Modern Java 14+ ఫీచర్).
        </p>
      </details>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:12px 18px; margin-bottom:12px; cursor:pointer;">
        <summary style="font-weight:700; color:var(--text);">ప్రశ్న 5: జావాలో String లను స్విచ్‌లో వాడటం ఎప్పటి నుండి సాధ్యమైంది?</summary>
        <p style="margin-top:10px; color:var(--text2); line-height:1.7;">
          <strong>సమాధానం:</strong> జావా 7 (Java SE 7) నుండి స్ట్రింగ్స్‌ను స్విచ్‌లో వాడే సౌకర్యం అందుబాటులోకి వచ్చింది. అంతర్గతంగా ఇది స్ట్రింగ్ యొక్క <code>hashCode()</code> మరియు <code>equals()</code> లతో పనిచేస్తుంది.
        </p>
      </details>
    </div>

    <!-- NEXT / PREV NAVIGATION BUTTONS -->
    <div style="display:flex; justify-content:space-between; align-items:center; gap:16px; margin:48px 0 24px 0; flex-wrap:wrap;">
      <a href="/blog-java/06-java-conditional-statements-if-else.html" style="background:var(--bg2); border:1px solid var(--border); color:var(--text); padding:12px 22px; border-radius:8px; text-decoration:none; font-weight:700; font-size:14px; display:inline-flex; align-items:center; gap:8px;">
        ← మునుపటి పాఠం: 06. if, else-if &amp; Ternary
      </a>
      <a href="/blog-java/08-java-loops-while-for-and-enhanced-foreach.html" style="background:#facc15; border:1px solid #eab308; color:#121212; padding:12px 24px; border-radius:8px; text-decoration:none; font-weight:800; font-size:14px; display:inline-flex; align-items:center; gap:8px; box-shadow:0 2px 10px rgba(234, 179, 8, 0.25);">
        తర్వాతి పాఠం: 08. Loops: while, for, foreach →
      </a>
    </div>
  </main>
</div>

<script src="/site-nav.js"></script>
</body>
</html>`;

const outPath = path.join(__dirname, '..', 'public', 'blog-java', '07-java-switch-statements-and-switch-expressions.html');
fs.writeFileSync(outPath, chapter07Content, 'utf8');

console.log('✅ Successfully generated Java Chapter 07 in exact JavaScript HTML style!');
console.log('Target file:', outPath);
console.log('Target file size:', chapter07Content.length, 'characters');
