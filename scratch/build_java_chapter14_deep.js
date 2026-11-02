const fs = require('fs');
const path = require('path');
const { LESSONS, buildJavaSidebar } = require('./java_curriculum_data.js');

const currentLesson = LESSONS.find(l => l.num === 14);

const chapter14Content = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Java OOP Fundamentals — Classes, Objects &amp; Heap Memory తెలుగులో — Java Tutorial | Our Compiler</title>
  <meta name="description" content="జావా ఆబ్జెక్ట్ ఓరియెంటెడ్ ప్రోగ్రామింగ్ (OOP) మూలాలు: క్లాసులు, ఆబ్జెక్టులు, new కీవర్డ్ ద్వారా Heap మెమరీ అలొకేషన్, Instance vs Static వేరియబుల్స్ మరియు గార్బేజ్ కలెక్షన్ తెలుగులో నేర్చుకోండి." />
  <meta name="keywords" content="java oop telugu, java classes and objects telugu, new keyword heap java telugu, instance vs static variables telugu, garbage collection basics java telugu, java object header mark word telugu" />
  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />
  <link rel="icon" type="image/png" href="/logo.png" />
  <link rel="canonical" href="https://www.ourcompiler.com/blog-java/14-java-oop-classes-objects-and-constructors.html" />
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
  ${buildJavaSidebar(14)}

  <!-- MAIN CONTENT -->
  <main class="content">
    <div class="breadcrumb">
      <a href="/">Home</a><span class="sep">›</span>
      <a href="/blog.html">Tutorials</a><span class="sep">›</span>
      <a href="/blog-java.html">Java</a><span class="sep">›</span>
      <span class="current">Lesson 14: Classes, Objects &amp; Heap</span>
    </div>

    <h1 class="page-title">14. జావా OOP మూలాలు — క్లాసులు, ఆబ్జెక్టులు &amp; హీప్ మెమరీ (Classes, Objects &amp; Heap)</h1>

    <div class="page-meta">
      <span class="badge">☕ Java (Java 21+ LTS)</span>
      <span class="badge">🟢 Lesson 14 of 25</span>
      <span class="badge">📂 Part 03: Arrays, Methods &amp; OOP (Page 4 of 5)</span>
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
        సాఫ్ట్‌వేర్ ఇంజనీరింగ్ రంగంలో నిత్యజీవితంలోని వాస్తవిక భావనలను (Real-world Entities) కంప్యూటర్ ప్రోగ్రామ్‌లుగా మలచడానికి ఉద్భవించిన అత్యంత విప్లవాత్మకమైన ప్రోగ్రామింగ్ పద్ధతి <strong>ఆబ్జెక్ట్-ఓరియెంటెడ్ ప్రోగ్రామింగ్ (Object-Oriented Programming - OOP)</strong>. జావాలో సమస్తమూ క్లాసులు మరియు ఆబ్జెక్టుల చుట్టూనే పరిభ్రమిస్తుంది. ఒక క్లాస్ అనేది కేవలం ఒక బ్లూప్రింట్ లేదా ప్లాన్ మాత్రమే కాగా, ఆ ప్లాన్ ఆధారంగా <code>new</code> కీవర్డ్ ద్వారా JVM హీప్ మెమరీలో ప్రాణం పోసుకునే సజీవ అస్తిత్వమే <strong>ఆబ్జెక్ట్ (Object / Instance)</strong>. ఆబ్జెక్ట్ యొక్క స్థితి (State) మరియు ప్రవర్తన (Behavior) అంటే ఏమిటి? ఒకే క్లాస్ నుండి పుట్టిన బహుళ ఆబ్జెక్టులు హీప్ మెమరీలో ఎలా కేటాయించబడతాయి? ఇన్‌స్టాన్స్ వేరియబుల్స్ మరియు స్టాటిక్ క్లాస్ వేరియబుల్స్ మధ్య మెమరీ విభజన ఎలా జరుగుతుంది? ఆబ్జెక్ట్ హెడర్లలో ఉండే Mark Word మరియు Klass Word ల పాత్ర ఏమిటి? రిఫరెన్స్ తెగిపోయిన అనాథ ఆబ్జెక్టులను గార్బేజ్ కలెక్టర్ (GC) ఎలా క్లీన్ చేస్తుంది? అనే ప్రాథమిక మరియు లోతైన OOP ఆర్కిటెక్చరల్ పునాదులను ఈ పాఠంలో సమగ్రంగా నేర్చుకుందాం.
      </p>

      <h4 style="margin:0 0 10px 0; color:#047857; font-size:16px; font-weight:800;">
        ఆర్కిటెక్ట్ హౌస్ బ్లూప్రింట్ &amp; వాస్తవ విల్లా భవనాల అనాలజీ (The Architect Blueprint &amp; Real Villa Analogy):
      </h4>
      <ol style="margin:0; padding-left:22px; color:#334155; line-height:1.8; font-size:14.5px;">
        <li style="margin-bottom:8px;">
          <strong>1. Class (ఆర్కిటెక్ట్ కాగితంపై గీసిన విల్లా ప్లాన్ - Blueprint):</strong> ఒక ఆర్కిటెక్ట్ ఒక కాగితంపై లగ్జరీ 3-BHK విల్లా ప్లాన్ గీశాడు. ఆ ప్లాన్‌లో బెడ్‌రూమ్‌లు ఎక్కడ ఉండాలి, హాల్ ఎక్కడ ఉండాలి, తలుపులు ఎలా ఉండాలి అని రాసి ఉంటుంది. కానీ కాగితంపై ఉన్న ప్లాన్‌లో ఎవరూ నివసించలేరు; ఆ ప్లాన్‌కు భూమిపై ఎటువంటి భౌతిక స్థలం (RAM/Memory) అవసరం లేదు. జావాలో క్లాస్ అనేది కూడా కేవలం ఒక డాటా టైప్ బ్లూప్రింట్ మాత్రమే.
        </li>
        <li style="margin-bottom:8px;">
          <strong>2. Object (ఆ ప్లాన్‌తో భూమిపై నిర్మించిన వాస్తవ భవనం - Real Brick-and-Mortar House):</strong> ఆ ఒక్క బ్లూప్రింట్‌ను ఉపయోగించి భూమిపై 10 విల్లాలు నిర్మించవచ్చు. Villa 1 లో బాలాజీ నివసిస్తూ నీలం రంగు వేసుకోవచ్చు, Villa 2 లో కార్తీక్ నివసిస్తూ పసుపు రంగు వేసుకోవచ్చు. ప్రతి ఇంటికీ భూమిపై సొంత స్థలం (హీప్ మెమరీ), సొంత తలుపులు, సొంత ఫర్నిచర్ (State) ఉంటాయి. ప్లాన్ ఒక్కటే అయినప్పటికీ ప్రతి ఇల్లా ఒక స్వతంత్రమైన ఆబ్జెక్ట్!
        </li>
        <li>
          <strong>3. Static vs Instance (కాలనీ సెంట్రల్ వాటర్ ట్యాంక్ vs బెడ్‌రూమ్ ట్యాప్ - Central Water Tank vs Room Tap):</strong> ప్రతి ఇంట్లోని కిచెన్‌లో ఉండే వాష్ బేసిన్ ఆ ఇంటికి మాత్రమే ప్రత్యేకం (Instance Variable). కానీ గేటెడ్ కమ్యూనిటీ మొత్తం కోసం రోడ్డుపై ఏర్పాటు చేసిన సెంట్రల్ ఓవర్‌హెడ్ వాటర్ ట్యాంక్ లేదా సెక్యూరిటీ గేటు అందరికీ ఉమ్మడి (Static Variable). ఒక ఇంట్లో ట్యాప్ విరిగితే మిగతా ఇళ్లకు ఎటువంటి ఇబ్బంది ఉండదు, కానీ సెంట్రల్ వాటర్ ట్యాంక్‌లో నీళ్లు ఆగిపోతే మొత్తం కాలనీలోని ఇళ్లన్నీ ప్రభావితమవుతాయి!
        </li>
      </ol>
      <p style="margin:14px 0 0 0; font-size:14px; color:#475569; line-height:1.7;">
        ఈ పాఠం పూర్తయ్యేసరికి మీరు ఆబ్జెక్టుల మెమరీ లేఅవుట్‌ను సంపూర్ణంగా ఊహించగలగడం, ఇన్‌స్టాన్స్ vs స్టాటిక్ ఆర్కిటెక్చరల్ నిర్ణయాలను నిక్కచ్చిగా తీసుకోవడం, మరియు ప్రొడక్షన్-గ్రేడ్ బ్యాంకింగ్ డొమైన్ కోర్ ఇంజిన్‌ను రూపొందించడంలో నిపుణులవుతారు!
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
            విభాగం A: OOP మూలాలు &amp; ఆబ్జెక్ట్ మెమరీ
          </div>
          <ul style="list-style:none; padding:0; margin:0; font-size:13px; line-height:2.1;">
            <li><a href="#sec-1" style="color:var(--text2); text-decoration:none;">1. ఆబ్జెక్ట్ ఓరియెంటెడ్ పారాడైమ్ &amp; 4 ప్రధాన స్తంభాలు</a></li>
            <li><a href="#sec-2" style="color:var(--text2); text-decoration:none;">2. క్లాస్ (బ్లూప్రింట్) vs ఆబ్జెక్ట్ (ఇన్‌స్టాన్స్)</a></li>
            <li><a href="#sec-3" style="color:var(--text2); text-decoration:none;">3. new కీవర్డ్ &amp; JVM హీప్ అలొకేషన్ 4 స్టెప్స్</a></li>
            <li><a href="#sec-4" style="color:var(--text2); text-decoration:none;">4. ఆబ్జెక్ట్ హెడర్: Mark Word &amp; Klass Word</a></li>
          </ul>
        </div>
        <div>
          <div style="font-weight:700; color:#10b981; margin-bottom:8px; font-size:13.5px; border-bottom:1px solid var(--border); padding-bottom:4px;">
            విభాగం B: వేరియబుల్స్ &amp; గార్బేజ్ కలెక్షన్
          </div>
          <ul style="list-style:none; padding:0; margin:0; font-size:13px; line-height:2.1;">
            <li><a href="#sec-5" style="color:var(--text2); text-decoration:none;">5. Instance Variables vs Static Class Variables</a></li>
            <li><a href="#sec-6" style="color:var(--text2); text-decoration:none;">6. Static Methods &amp; Metaspace ఆర్కిటెక్చర్</a></li>
            <li><a href="#sec-7" style="color:var(--text2); text-decoration:none;">7. ఆబ్జెక్ట్ లైఫ్ సైకిల్ &amp; అనాథ ఆబ్జెక్ట్స్ (Orphans)</a></li>
            <li><a href="#sec-8" style="color:var(--text2); text-decoration:none;">8. గార్బేజ్ కలెక్షన్: Reachability Analysis</a></li>
          </ul>
        </div>
        <div>
          <div style="font-weight:700; color:#10b981; margin-bottom:8px; font-size:13.5px; border-bottom:1px solid var(--border); padding-bottom:4px;">
            విభాగం C: డెమోలు, ప్రాజెక్ట్ &amp; పరీక్ష
          </div>
          <ul style="list-style:none; padding:0; margin:0; font-size:13px; line-height:2.1;">
            <li><a href="#sec-9" style="color:var(--text2); text-decoration:none;">9. డెమో 1: Instance vs Static మెమరీ డెమో</a></li>
            <li><a href="#sec-10" style="color:var(--text2); text-decoration:none;">10. డెమో 2: ఆబ్జెక్ట్ లైఫ్‌సైకిల్ &amp; GC సిమ్యులేషన్</a></li>
            <li><a href="#sec-11" style="color:var(--text2); text-decoration:none;">11. Capstone ప్రాజెక్ట్: బ్యాంకింగ్ డొమైన్ ఇంజిన్</a></li>
            <li><a href="#sec-12" style="color:var(--text2); text-decoration:none;">12. ప్రొడక్షన్ పిట్‌ఫాల్స్, బెస్ట్ ప్రాక్టీసెస్ &amp; 5 క్విజ్‌లు</a></li>
          </ul>
        </div>
      </div>
    </div>

    <!-- SECTION 1 -->
    <div id="sec-1" class="section-card">
      <h2>1. ఆబ్జెక్ట్ ఓరియెంటెడ్ పారాడైమ్ &amp; 4 ప్రధాన స్తంభాలు (The OOP Paradigm)</h2>
      <p>
        గతంలో C లాంటి ప్రొసీజరల్ భాషలలో ప్రోగ్రామ్ అంటే కేవలం కొన్ని ఫంక్షన్లు మరియు గ్లోబల్ డేటా సమాహారంగా ఉండేది. డేటాకు ఎటువంటి భద్రత ఉండేది కాదు; ఏ ఫంక్షన్ అయినా ఏ డేటానైనా మార్చివేయగలదు. సాఫ్ట్‌వేర్ పరిమాణం పెరిగేకొద్దీ ఇది తీవ్రమైన సంక్షోభాలకు దారితీసింది.
      </p>
      <p>
        ఈ సమస్యకు పరిష్కారంగా <strong>ఆబ్జెక్ట్-ఓరియెంటెడ్ ప్రోగ్రామింగ్ (OOP)</strong> ఆవిర్భవించింది. OOP లో డేటా (State) మరియు ఆ డేటాపై పనిచేసే ఫంక్షన్లు (Behavior) రెండింటినీ కలిపి ఒకే గొడుగు క్రిందకు తీసుకొస్తారు. దీనినే <strong>ఆబ్జెక్ట్ (Object)</strong> అంటారు.
      </p>

      <h4 style="color:#10b981; margin:18px 0 8px 0;">జావా OOP యొక్క 4 ప్రధాన స్తంభాలు (The 4 Pillars):</h4>
      <ul>
        <li><strong>1. ఎన్‌క్యాప్సులేషన్ (Encapsulation):</strong> డేటాను ప్రైవేట్‌గా దాచిపెట్టి, కేవలం సురక్షితమైన పబ్లిక్ మెథడ్స్ ద్వారా మాత్రమే యాక్సెస్ కల్పించడం (Data Hiding).</li>
        <li><strong>2. వారసత్వం (Inheritance):</strong> ఇప్పటికే ఉన్న క్లాస్ నుండి కొత్త క్లాస్‌ను రూపొందిస్తూ కోడ్ పునర్వినియోగాన్ని (Code Reusability) సాధించడం.</li>
        <li><strong>3. పాలిమార్ఫిజం (Polymorphism):</strong> ఒకే మెథడ్ లేదా ఆపరేషన్ వేర్వేరు రూపాల్లో ప్రవర్తించే సామర్థ్యం (One Interface, Multiple Implementations).</li>
        <li><strong>4. ఆబ్‌స్ట్రాక్షన్ (Abstraction):</strong> అంతర్గత సంక్లిష్టమైన ఇంప్లిమెంటేషన్‌ను దాచిపెట్టి, వినియోగదారుకు కేవలం అవసరమైన ఫీచర్లను మాత్రమే చూపించడం.</li>
      </ul>
    </div>

    <!-- SECTION 2 -->
    <div id="sec-2" class="section-card">
      <h2>2. క్లాస్ (బ్లూప్రింట్) vs ఆబ్జెక్ట్ (ఇన్‌స్టాన్స్) (Class vs Object)</h2>
      <p>
        ఈ రెండింటి మధ్య తేడాను స్పష్టంగా అర్థం చేసుకోవడం చాలా సులభం:
      </p>

      <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:18px 22px; margin:18px 0; font-family:'JetBrains Mono', monospace; font-size:13.5px; line-height:1.9;">
        <span style="color:#64748b;">// 1. క్లాస్ డిక్లరేషన్: ఇది బ్లూప్రింట్ మాత్రమే (మెమరీ తీసుకోదు)</span><br />
        <span style="color:#0284c7;">public class</span> Car {<br />
        &nbsp;&nbsp;&nbsp;&nbsp;String model;&nbsp;&nbsp;<span style="color:#64748b;">// State (Field)</span><br />
        &nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#0284c7;">int</span> speed;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#64748b;">// State (Field)</span><br /><br />
        &nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#0284c7;">void</span> accelerate() {&nbsp;&nbsp;<span style="color:#64748b;">// Behavior (Method)</span><br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;speed += 10;<br />
        &nbsp;&nbsp;&nbsp;&nbsp;}<br />
        }<br /><br />
        <span style="color:#64748b;">// 2. ఆబ్జెక్ట్ క్రియేషన్: హీప్ మెమరీలో వాస్తవ ఇన్‌స్టాన్స్ పుడుతుంది</span><br />
        Car myCar = <span style="color:#0284c7;">new</span> Car();<br />
        myCar.model = <span style="color:#059669;">"Tesla Model 3"</span>;<br />
        myCar.accelerate();
      </div>

      <p>
        ప్రతి ఆబ్జెక్ట్‌కు రెండు ప్రాథమిక లక్షణాలు ఉంటాయి:
        <br />
        • <strong>State (స్థితి):</strong> ఆబ్జెక్ట్ లోపల నిల్వ చేయబడిన ఫీల్డ్స్ లేదా వేరియబుల్స్ విలువలు.
        <br />
        • <strong>Behavior (ప్రవర్తన):</strong> ఆబ్జెక్ట్ చేసే పనులు లేదా మెథడ్స్.
      </p>
    </div>

    <!-- SECTION 3 -->
    <div id="sec-3" class="section-card">
      <h2>3. new కీవర్డ్ &amp; JVM హీప్ అలొకేషన్ 4 స్టెప్స్ (The 4 Steps of Object Creation)</h2>
      <p>
        మీరు జావాలో <code>Car c = new Car();</code> అని రాసినప్పుడు తెరవెనుక JVM లో సరిగ్గా ఏమి జరుగుతుంది? JVM ఈ ప్రక్రియను 4 నిక్కచ్చితమైన దశల్లో పూర్తి చేస్తుంది:
      </p>

      <ol style="line-height:1.8; color:var(--text2); font-size:14px; padding-left:20px;">
        <li style="margin-bottom:8px;">
          <strong>దశ 1 (Class Loading &amp; Verification):</strong> <code>Car</code> క్లాస్ బైట్‌కోడ్ ముందే మెమరీలో లేకపోతే, ClassLoader దాన్ని Metaspace లోకి లోడ్ చేసి వెరిఫై చేస్తుంది.
        </li>
        <li style="margin-bottom:8px;">
          <strong>దశ 2 (Heap Memory Allocation):</strong> హీప్ మెమరీలోని Young Generation (Eden Space) లో ఆబ్జెక్ట్ యొక్క ఫీల్డ్స్ మరియు ఆబ్జెక్ట్ హెడర్ కోసం సరిపడా బైట్ల స్థలాన్ని రిజర్వ్ చేస్తుంది.
        </li>
        <li style="margin-bottom:8px;">
          <strong>దశ 3 (Zero Initialization &amp; Constructor Execution):</strong> అన్ని ఫీల్డ్‌లకు వాటి డీఫాల్ట్ విలువలను (0, false, null) కేటాయించిన తర్వాత, కన్‌స్ట్రక్టర్‌ను ఎగ్జిక్యూట్ చేసి యూజర్ నిర్దేశించిన విలువలను నింపుతుంది.
        </li>
        <li>
          <strong>దశ 4 (Reference Assignment):</strong> హీప్‌లో కొత్తగా సృష్టించబడిన ఆబ్జెక్ట్ యొక్క 64-బిట్ మెమరీ అడ్రస్‌ను స్టాక్ మెమరీలోని <code>c</code> అనే రిఫరెన్స్ వేరియబుల్‌కు అందజేస్తుంది.
        </li>
      </ol>
    </div>

    <!-- SECTION 4 -->
    <div id="sec-4" class="section-card">
      <h2>4. ఆబ్జెక్ట్ హెడర్: Mark Word &amp; Klass Word ఇంటర్నల్స్ (Deep JVM Memory)</h2>
      <p>
        జావా హీప్ మెమరీలో ప్రతి ఆబ్జెక్ట్ మీ డేటా వేరియబుల్స్‌తో పాటు అదనంగా <strong>ఆబ్జెక్ట్ హెడర్ (Object Header)</strong> అనే వ్యవస్థాపక సమాచారాన్ని కలిగి ఉంటుంది:
      </p>

      <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px 20px; margin:18px 0; font-family:'JetBrains Mono', monospace; font-size:13px; line-height:1.8;">
        <span style="color:#64748b;">// 64-bit JVM Object Structure:</span><br />
        1. <strong>Mark Word (8 bytes / 64 bits):</strong><br />
        &nbsp;&nbsp;&nbsp;• Identity HashCode (31 bits)<br />
        &nbsp;&nbsp;&nbsp;• Age for Generational GC (4 bits - max 15 transitions)<br />
        &nbsp;&nbsp;&nbsp;• Biased / Thin / Fat Synchronization Locks (2 bits)<br /><br />
        2. <strong>Klass Word / Compressed OOPs (4 bytes):</strong><br />
        &nbsp;&nbsp;&nbsp;• ఈ ఆబ్జెక్ట్ ఏ క్లాస్‌కు చెందిందో చెప్పే Metaspace క్లాస్ మెటాడేటా పాయింటర్.<br /><br />
        3. <strong>Instance Data (Variable bytes):</strong> మీ ఫీల్డ్స్ (int, double, references).<br />
        4. <strong>Padding (0-7 bytes):</strong> ఆబ్జెక్ట్ సైజును 8 బైట్ల గుణిజంగా (8-byte alignment) మార్చే ఖాళీ ప్యాడింగ్.
      </div>

      <p>
        అందువల్ల ఖాళీ క్లాస్ ఆబ్జెక్ట్ (ఎటువంటి ఫీల్డ్స్ లేనిది) కూడా హీప్‌లో కనీసం <strong>16 బైట్ల మెమరీని</strong> ఆక్రమిస్తుంది!
      </p>
    </div>

    <!-- SECTION 5 -->
    <div id="sec-5" class="section-card">
      <h2>5. Instance Variables vs Static Class Variables (Memory Blueprint)</h2>
      <p>
        వేరియబుల్ డిక్లరేషన్ వద్ద <code>static</code> కీవర్డ్ చేర్చడం వల్ల మెమరీ కేటాయింపులో పెనుమార్పు సంభవిస్తుంది:
      </p>

      <div style="overflow-x:auto; margin:20px 0;">
        <table style="width:100%; border-collapse:collapse; font-size:13.5px; text-align:left;">
          <thead>
            <tr style="background:var(--bg2); border-bottom:2px solid var(--border);">
              <th style="padding:12px 14px; color:var(--text); font-weight:700;">ఫీచర్ / లక్షణం</th>
              <th style="padding:12px 14px; color:var(--text); font-weight:700;">Instance Variable (నాన్-స్టాటిక్)</th>
              <th style="padding:12px 14px; color:var(--text); font-weight:700;">Static Variable (క్లాస్ వేరియబుల్)</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom:1px solid var(--border);">
              <td style="padding:10px 14px; font-weight:600; color:var(--text);">మెమరీ కేటాయింపు</td>
              <td style="padding:10px 14px; color:var(--text2);">ప్రతి కొత్త ఆబ్జెక్ట్‌తో పాటు Heap లో ప్రత్యేకంగా పుడుతుంది</td>
              <td style="padding:10px 14px; color:var(--text2);">క్లాస్ లోడ్ అయినప్పుడు Metaspace/Heap లో ఒక్కసారే పుడుతుంది</td>
            </tr>
            <tr style="border-bottom:1px solid var(--border);">
              <td style="padding:10px 14px; font-weight:600; color:var(--text);">కాపీల సంఖ్య (Copies)</td>
              <td style="padding:10px 14px; color:var(--text2);">ప్రతి ఆబ్జెక్ట్‌కు ప్రత్యేక కాపీ (N ఆబ్జెక్టులకు N కాపీలు)</td>
              <td style="padding:10px 14px; color:#10b981; font-weight:700;">మొత్తం అప్లికేషన్ మొత్తానికి కేవలం ఒకే ఒక్క కాపీ (Shared)</td>
            </tr>
            <tr style="border-bottom:1px solid var(--border);">
              <td style="padding:10px 14px; font-weight:600; color:var(--text);">యాక్సెస్ విధానం</td>
              <td style="padding:10px 14px; color:var(--text2);">ఆబ్జెక్ట్ రిఫరెన్స్ ద్వారా: <code>obj.name</code></td>
              <td style="padding:10px 14px; color:var(--text2);">క్లాస్ పేరుతో నేరుగా: <code>ClassName.count</code></td>
            </tr>
            <tr>
              <td style="padding:10px 14px; font-weight:600; color:var(--text);">జీవితకాలం (Lifetime)</td>
              <td style="padding:10px 14px; color:var(--text2);">ఆబ్జెక్ట్ ఉన్నంతవరకే (GC అయ్యే వరకు)</td>
              <td style="padding:10px 14px; color:var(--text2);">అప్లికేషన్ లేదా JVM ఆగిపోయే వరకు సజీవంగా ఉంటుంది</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- SECTION 6 -->
    <div id="sec-6" class="section-card">
      <h2>6. Static Methods &amp; Metaspace ఆర్కిటెక్చర్ (Why static cannot use this)</h2>
      <p>
        ఒక మెథడ్‌ను <code>static</code> గా ప్రకటించినప్పుడు, అది ఏ ఒక్క నిర్దిష్ట ఆబ్జెక్ట్‌కు చెందదు. అది నేరుగా క్లాస్‌కు అనుసంధానించబడి ఉంటుంది.
      </p>

      <div style="background:#fefce8; border:1px solid #fde047; border-left:5px solid #ca8a04; border-radius:6px; padding:14px 18px; margin:16px 0; font-size:13.5px; color:#854d0e; line-height:1.7;">
        ⚠️ <strong>గోల్డెన్ రూల్:</strong> <code>static</code> మెథడ్ లోపల నుండి నాన్-స్టాటిక్ ఇన్‌స్టాన్స్ వేరియబుల్స్ లేదా మెథడ్లను నేరుగా పిలవడం అసాధ్యం! అలాగే స్టాటిక్ కాంటెక్స్ట్‌లో <code>this</code> లేదా <code>super</code> కీవర్డ్స్ ఉండవు, ఎందుకంటే స్టాటిక్ మెథడ్ కాల్ అయ్యే సమయానికి అసలు ఏ ఆబ్జెక్ట్ ఇంకా పుట్టనే లేదు!
      </div>
    </div>

    <!-- SECTION 7 -->
    <div id="sec-7" class="section-card">
      <h2>7. ఆబ్జెక్ట్ లైఫ్ సైకిల్ &amp; అనాథ ఆబ్జెక్ట్స్ (Orphan / Unreachable Objects)</h2>
      <p>
        హీప్‌లో సృష్టించబడిన ఆబ్జెక్ట్ ఎప్పుడు మరణిస్తుంది? జావాలో మెమరీని మాన్యువల్‌గా ఫ్రీ చేయడానికి C++ లాగా <code>free()</code> లేదా <code>delete</code> ఉండవు.
      </p>
      <p>
        ఒక ఆబ్జెక్ట్‌ను పాయింట్ చేసే రిఫరెన్స్‌లన్నీ తెగిపోయినప్పుడు, ఆ ఆబ్జెక్ట్‌ను <strong>అన్‌రీచబుల్ ఆబ్జెక్ట్ (Unreachable / Orphan Object)</strong> అంటారు. ఇది 3 ప్రధాన సందర్భాలలో జరుగుతుంది:
      </p>

      <ul>
        <li><strong>1. రిఫరెన్స్‌ను నల్ చేయడం (Nullifying Reference):</strong> <code>acc = null;</code> రాయడం ద్వారా.</li>
        <li><strong>2. రిఫరెన్స్‌ను రీ-అసైన్ చేయడం (Reassigning Reference):</strong> <code>acc = new BankAccount();</code> అని కొత్త ఆబ్జెక్ట్ ఇవ్వడం ద్వారా పాతది అనాథగా మారుతుంది.</li>
        <li><strong>3. మెథడ్ స్కోప్ ముగియడం (Out of Scope):</strong> ఒక మెథడ్ లోపల పుట్టిన లోకల్ ఆబ్జెక్ట్ రిఫరెన్స్, ఆ మెథడ్ ఎగ్జిక్యూషన్ ముగియగానే స్టాక్ నుండి తుడిచిపెట్టుకుపోతుంది.</li>
      </ul>
    </div>

    <!-- SECTION 8 -->
    <div id="sec-8" class="section-card">
      <h2>8. గార్బేజ్ కలెక్షన్ బేసిక్స్: Reachability Analysis (The Silent Cleaner)</h2>
      <p>
        జావా యొక్క అత్యంత అద్భుతమైన ఆటోమేషన్ సిస్టమ్ <strong>గార్బేజ్ కలెక్టర్ (Garbage Collector - GC)</strong>. ఇది బ్యాక్‌గ్రౌండ్‌లో లో-ప్రయారిటీ డెమోన్ థ్రెడ్ గా నడుస్తూ హీప్ మెమరీని నిరంతరం పర్యవేక్షిస్తుంది.
      </p>
      <p>
        ఆధునిక JVM లు <strong>GC Roots</strong> (యాక్టివ్ థ్రెడ్ స్టాక్ ఫ్రేమ్‌లలోని లోకల్ వేరియబుల్స్, స్టాటిక్ ఫీల్డ్స్, JNI గ్లోబల్ రిఫరెన్సెస్) నుండి మెమరీ గ్రాఫ్‌ను పరిశీలిస్తాయి (Reachability Analysis). GC Roots నుండి చేరుకోలేని ఏ ఆబ్జెక్ట్‌నైనా నిర్దాక్షిణ్యంగా గుర్తించి, దాని మెమరీని తిరిగి హీప్‌కు రీక్లెయిమ్ చేస్తాయి.
      </p>
    </div>

    <!-- SECTION 9: CODE DEMO 1 -->
    <div id="sec-9" class="section-card">
      <h2>9. డెమో 1: Instance vs Static మెమరీ డెమో (State Separation Proof)</h2>
      <p>
        ఇన్‌స్టాన్స్ వేరియబుల్స్ ప్రతి ఆబ్జెక్ట్‌కు ఎలా విడివిడిగా ఉంటాయో, మరియు స్టాటిక్ వేరియబుల్ అన్నింటికీ ఎలా ఉమ్మడిగా షేర్ అవుతుందో పరిశీలించే డెమో:
      </p>

      <div class="code-block">
        <div class="code-header">
          <span class="file-name">InstanceVsStaticMemoryDemo.java</span>
          <div class="btn-group">
            <button class="btn-copy" onclick="copyCodeSnippet(this)">📋 Copy Code</button>
            <button class="btn-run" onclick="runInJavaCompiler(this)">▶ Run in Java Compiler</button>
          </div>
        </div>
        <pre><code class="language-java">public class InstanceVsStaticMemoryDemo {

    public static class BankBranch {
        // Static variable: Shared by all branches of the bank
        public static String bankName = "State Financial Bank";
        public static int totalBranchesCount = 0;

        // Instance variables: Unique to each specific branch object
        public String branchCity;
        public double localVaultCash;

        public BankBranch(String city, double initialCash) {
            this.branchCity = city;
            this.localVaultCash = initialCash;
            totalBranchesCount++; // Increment global shared counter
        }

        public void printBranchStatus() {
            System.out.printf("🏦 [%s - %-10s] Local Vault: ₹%,10.2f | Total Bank Branches: %d%n",
                    bankName, branchCity, localVaultCash, totalBranchesCount);
        }
    }

    public static void main(String[] args) {
        System.out.println("=================================================");
        System.out.println("🏛️ INSTANCE VS STATIC MEMORY ARCHITECTURE DEMO");
        System.out.println("=================================================\n");

        System.out.println("1. Creating 3 distinct branch objects:");
        BankBranch b1 = new BankBranch("Hyderabad", 500000.0);
        BankBranch b2 = new BankBranch("Bengaluru", 750000.0);
        BankBranch b3 = new BankBranch("Visakhapatnam", 350000.0);

        b1.printBranchStatus();
        b2.printBranchStatus();
        b3.printBranchStatus();

        System.out.println("\n2. Modifying static variable BankBranch.bankName:");
        BankBranch.bankName = "NextGen Unified Bank";

        System.out.println("   Modifying b1 local vault cash only (+ ₹1,00,000):");
        b1.localVaultCash += 100000.0;

        System.out.println("\n3. Status after modifications:");
        b1.printBranchStatus();
        b2.printBranchStatus();
        b3.printBranchStatus();

        System.out.println("\n=================================================");
        System.out.println("✅ తీర్పు: Static వేరియబుల్ మారితే అన్ని ఆబ్జెక్టులలో మారింది,");
        System.out.println("          కానీ Instance వేరియబుల్ కేవలం b1 లో మాత్రమే మారింది!");
        System.out.println("=================================================");
    }
}</code></pre>
      </div>

      <div class="code-output-card">
        <div class="output-header">Terminal Output:</div>
        <pre class="output-body">=================================================
🏛️ INSTANCE VS STATIC MEMORY ARCHITECTURE DEMO
=================================================

1. Creating 3 distinct branch objects:
🏦 [State Financial Bank - Hyderabad ] Local Vault: ₹  5,00,000.00 | Total Bank Branches: 3
🏦 [State Financial Bank - Bengaluru ] Local Vault: ₹  7,50,000.00 | Total Bank Branches: 3
🏦 [State Financial Bank - Visakhapatnam] Local Vault: ₹  3,50,000.00 | Total Bank Branches: 3

2. Modifying static variable BankBranch.bankName:
   Modifying b1 local vault cash only (+ ₹1,00,000):

3. Status after modifications:
🏦 [NextGen Unified Bank - Hyderabad ] Local Vault: ₹  6,00,000.00 | Total Bank Branches: 3
🏦 [NextGen Unified Bank - Bengaluru ] Local Vault: ₹  7,50,000.00 | Total Bank Branches: 3
🏦 [NextGen Unified Bank - Visakhapatnam] Local Vault: ₹  3,50,000.00 | Total Bank Branches: 3

=================================================
✅ తీర్పు: Static వేరియబుల్ మారితే అన్ని ఆబ్జెక్టులలో మారింది,
          కానీ Instance వేరియబుల్ కేవలం b1 లో మాత్రమే మారింది!
=================================================</pre>
      </div>
    </div>

    <!-- SECTION 10: CODE DEMO 2 -->
    <div id="sec-10" class="section-card">
      <h2>10. డెమో 2: ఆబ్జెక్ట్ లైఫ్‌సైకిల్ &amp; GC సిమ్యులేషన్ (Object Lifecycle Simulation)</h2>
      <p>
        ఆబ్జెక్ట్ రిఫరెన్స్‌ను నల్ చేసినప్పుడు మరియు రీ-అసైన్ చేసినప్పుడు పాత ఆబ్జెక్ట్ ఎలా అన్‌రీచబుల్ అవుతుందో మెమరీ టెలిమెట్రీతో చూపే డెమో:
      </p>

      <div class="code-block">
        <div class="code-header">
          <span class="file-name">ObjectLifecycleAndGcSimulation.java</span>
          <div class="btn-group">
            <button class="btn-copy" onclick="copyCodeSnippet(this)">📋 Copy Code</button>
            <button class="btn-run" onclick="runInJavaCompiler(this)">▶ Run in Java Compiler</button>
          </div>
        </div>
        <pre><code class="language-java">public class ObjectLifecycleAndGcSimulation {

    static class DataNode {
        String payloadId;
        byte[] heavyBuffer = new byte[1024 * 512]; // 512 KB payload

        DataNode(String id) {
            this.payloadId = id;
        }

        @Override
        public String toString() {
            return "DataNode[" + payloadId + "]";
        }
    }

    public static void main(String[] args) {
        System.out.println("=================================================");
        System.out.println("♻️ OBJECT LIFECYCLE &amp; HEAP REALLOCATION DEMO");
        System.out.println("=================================================\n");

        Runtime rt = Runtime.getRuntime();

        // Initial free memory
        long initialFree = rt.freeMemory();
        System.out.printf("1. Initial Heap Free Memory: %,d KB%n", initialFree / 1024);

        // Step 1: Allocating first object
        DataNode node1 = new DataNode("Session_Alpha");
        System.out.println("2. Created active reference: " + node1);
        System.out.printf("   Heap Free after node1:    %,d KB%n", rt.freeMemory() / 1024);

        // Step 2: Reassigning reference to a new object (making Session_Alpha orphan)
        System.out.println("\n3. Reassigning node1 = new DataNode('Session_Beta')...");
        node1 = new DataNode("Session_Beta");
        System.out.println("   Current active reference: " + node1);
        System.out.println("   ⚠️ 'Session_Alpha' is now UNREACHABLE (Orphan in Heap)!");

        // Step 3: Nullifying reference (making Session_Beta orphan too)
        System.out.println("\n4. Nullifying node1 = null...");
        node1 = null;
        System.out.println("   ⚠️ Both objects are now 100% eligible for Garbage Collection!");

        // Triggering GC hint
        System.gc();
        System.out.printf("5. Post-GC Request Free Memory: %,d KB%n", rt.freeMemory() / 1024);

        System.out.println("=================================================");
    }
}</code></pre>
      </div>

      <div class="code-output-card">
        <div class="output-header">Terminal Output:</div>
        <pre class="output-body">=================================================
♻️ OBJECT LIFECYCLE &amp; HEAP REALLOCATION DEMO
=================================================

1. Initial Heap Free Memory: 254,120 KB
2. Created active reference: DataNode[Session_Alpha]
   Heap Free after node1:    253,608 KB

3. Reassigning node1 = new DataNode('Session_Beta')...
   Current active reference: DataNode[Session_Beta]
   ⚠️ 'Session_Alpha' is now UNREACHABLE (Orphan in Heap)!

4. Nullifying node1 = null...
   ⚠️ Both objects are now 100% eligible for Garbage Collection!
5. Post-GC Request Free Memory: 254,116 KB
=================================================</pre>
      </div>
    </div>

    <!-- SECTION 11: CAPSTONE PROJECT -->
    <div id="sec-11" class="section-card">
      <h2>11. Capstone ప్రాజెక్ట్: ఎంటర్‌ప్రైజ్ బ్యాంకింగ్ అకౌంట్ డొమైన్ మోడల్</h2>
      <p>
        ఈ అధ్యాయంలో నేర్చుకున్న అన్ని కాన్సెప్టులను (క్లాసులు, ఆబ్జెక్టులు, స్టేట్ &amp; బిహేవియర్, Instance vs Static, మరియు డేటా సేఫ్టీ) సమగ్రంగా మిళితం చేస్తూ ఒక ప్రొడక్షన్-గ్రేడ్ <strong>Enterprise Banking Account &amp; Transaction Ledger Domain Engine</strong> ను నిర్మిద్దాం:
      </p>

      <div class="code-block">
        <div class="code-header">
          <span class="file-name">BankingDomainCoreEngine.java</span>
          <div class="btn-group">
            <button class="btn-copy" onclick="copyCodeSnippet(this)">📋 Copy Code</button>
            <button class="btn-run" onclick="runInJavaCompiler(this)">▶ Run in Java Compiler</button>
          </div>
        </div>
        <pre><code class="language-java">public class BankingDomainCoreEngine {

    public static class BankAccount {
        // Global Bank Configuration (Static - Shared across all accounts)
        private static final String IFSC_CODE = "APGB0004921";
        private static double annualInterestRate = 6.5; // 6.5% APY
        private static long accountNumberGenerator = 1001002000L;
        private static int activeAccountsTotal = 0;

        // Instance State (Unique to each customer account)
        private final long accountNumber;
        private final String accountHolder;
        private double balance;
        private boolean isFrozen;

        public BankAccount(String holderName, double initialDeposit) {
            this.accountNumber = ++accountNumberGenerator;
            this.accountHolder = holderName;
            this.balance = Math.max(0.0, initialDeposit);
            this.isFrozen = false;
            activeAccountsTotal++;
        }

        // Behavior: Deposit
        public boolean deposit(double amount) {
            if (isFrozen || amount &lt;= 0) {
                System.out.printf("❌ Deposit failed for Acc #%d: Invalid amount or account frozen.%n", accountNumber);
                return false;
            }
            this.balance += amount;
            System.out.printf("✅ Deposited ₹%,.2f into Acc #%d (%s). New Balance: ₹%,.2f%n",
                    amount, accountNumber, accountHolder, balance);
            return true;
        }

        // Behavior: Withdraw with overdraft check
        public boolean withdraw(double amount) {
            if (isFrozen) {
                System.out.printf("❌ Withdrawal denied: Account #%d is frozen.%n", accountNumber);
                return false;
            }
            if (amount &lt;= 0 || amount &gt; this.balance) {
                System.out.printf("❌ Withdrawal failed for Acc #%d: Insufficient funds (Avail: ₹%,.2f, Req: ₹%,.2f)%n",
                        accountNumber, balance, amount);
                return false;
            }
            this.balance -= amount;
            System.out.printf("💸 Withdrawn ₹%,.2f from Acc #%d (%s). Remaining Balance: ₹%,.2f%n",
                    amount, accountNumber, accountHolder, balance);
            return true;
        }

        public void printStatement() {
            System.out.println("-------------------------------------------------");
            System.out.println("📄 APGB OFFICIAL ACCOUNT AUDIT STATEMENT");
            System.out.printf("Account Number: %d | IFSC: %s%n", accountNumber, IFSC_CODE);
            System.out.printf("Holder:         %s%n", accountHolder);
            System.out.printf("Current Status: %s | Annual Interest: %.1f%%%n",
                    (isFrozen ? "FROZEN ❄️" : "ACTIVE 🟢"), annualInterestRate);
            System.out.printf("Liquid Balance: ₹%,.2f%n", balance);
            System.out.println("-------------------------------------------------");
        }

        public static int getActiveAccountsTotal() {
            return activeAccountsTotal;
        }

        public static void updateGlobalInterestRate(double newRate) {
            annualInterestRate = newRate;
            System.out.printf("📢 Global Bank Interest Rate updated to %.2f%% APY for all accounts.%n", newRate);
        }
    }

    public static void main(String[] args) {
        System.out.println("=================================================");
        System.out.println("🏦 ENTERPRISE BANKING CORE DOMAIN ENGINE");
        System.out.println("=================================================\n");

        BankAccount acc1 = new BankAccount("Balaji Nemani", 75000.0);
        BankAccount acc2 = new BankAccount("Karthik Verma", 15000.0);

        System.out.println("Total Active Customer Accounts: " + BankAccount.getActiveAccountsTotal() + "\n");

        // Performing banking transactions
        acc1.deposit(25000.0);
        acc1.withdraw(15000.0);

        acc2.withdraw(20000.0); // Should fail due to insufficient funds

        // Bank updates interest rate globally
        System.out.println();
        BankAccount.updateGlobalInterestRate(7.25);

        // Printing audit statements
        acc1.printStatement();
        acc2.printStatement();

        System.out.println("=================================================");
    }
}</code></pre>
      </div>

      <div class="code-output-card">
        <div class="output-header">Terminal Output:</div>
        <pre class="output-body">=================================================
🏦 ENTERPRISE BANKING CORE DOMAIN ENGINE
=================================================

Total Active Customer Accounts: 2

✅ Deposited ₹25,000.00 into Acc #1001002001 (Balaji Nemani). New Balance: ₹1,00,000.00
💸 Withdrawn ₹15,000.00 from Acc #1001002001 (Balaji Nemani). Remaining Balance: ₹85,000.00
❌ Withdrawal failed for Acc #1001002002: Insufficient funds (Avail: ₹15,000.00, Req: ₹20,000.00)

📢 Global Bank Interest Rate updated to 7.25% APY for all accounts.
-------------------------------------------------
📄 APGB OFFICIAL ACCOUNT AUDIT STATEMENT
Account Number: 1001002001 | IFSC: APGB0004921
Holder:         Balaji Nemani
Current Status: ACTIVE 🟢 | Annual Interest: 7.2%
Liquid Balance: ₹85,000.00
-------------------------------------------------
-------------------------------------------------
📄 APGB OFFICIAL ACCOUNT AUDIT STATEMENT
Account Number: 1001002002 | IFSC: APGB0004921
Holder:         Karthik Verma
Current Status: ACTIVE 🟢 | Annual Interest: 7.2%
Liquid Balance: ₹15,000.00
-------------------------------------------------
=================================================</pre>
      </div>
    </div>

    <!-- SECTION 12 -->
    <div id="sec-12" class="section-card">
      <h2>12. ప్రొడక్షన్ పిట్‌ఫాల్స్, బెస్ట్ ప్రాక్టీసెస్ &amp; 5 క్విజ్‌లు (Best Practices &amp; Quizzes)</h2>

      <h4 style="color:#ef4444; margin:16px 0 10px 0;">🚫 ప్రొడక్షన్‌లో నివారించాల్సిన 4 ఘోరమైన తప్పులు (Production Pitfalls):</h4>
      <ol style="line-height:1.8; color:var(--text2); font-size:14px; padding-left:20px;">
        <li style="margin-bottom:10px;">
          <strong>ఆబ్జెక్ట్ రిఫరెన్స్‌తో స్టాటిక్ వేరియబుల్స్ లేదా మెథడ్లను పిలవడం:</strong> <code>myAccount.bankName</code> లేదా <code>myAccount.updateRate()</code> అని పిలవడం కోడ్‌ను గందరగోళానికి గురిచేస్తుంది. స్టాటిక్ మెంబర్లను ఎల్లప్పుడూ క్లాస్ పేరుతోనే (<code>BankAccount.bankName</code>) పిలవాలి.
        </li>
        <li style="margin-bottom:10px;">
          <strong>ప్రైవేట్ ఫీల్డ్స్ లేకుండా అన్నింటినీ పబ్లిక్ చేయడం:</strong> క్లాస్ ఫీల్డ్స్‌ను <code>public</code> గా ఉంచితే బాహ్య క్లాసులు చెల్లని విలువలను (ఉదా: balance = -50000) నేరుగా నమోదు చేసే ప్రమాదం ఉంది.
        </li>
        <li style="margin-bottom:10px;">
          <strong>స్టాటిక్ కలెక్షన్లలో ఆబ్జెక్టులను వేసి మర్చిపోవడం (Memory Leaks):</strong> <code>static List</code> లో ఆబ్జెక్టులను జోడించి తొలగించకపోతే, అవి అప్లికేషన్ ముగిసేవరకు GC కాకుండా మెమరీ లీక్‌ను సృష్టిస్తాయి.
        </li>
        <li style="margin-bottom:10px;">
          <strong>ప్రతిదానికీ <code>System.gc()</code> ను పిలవడం:</strong> GC ఎప్పుడు రన్ అవ్వాలో JVM చూసుకుంటుంది. కోడ్‌లో మాన్యువల్‌గా <code>System.gc()</code> పిలిస్తే అనవసరమైన Stop-the-World పాజ్‌లు ఏర్పడతాయి.
        </li>
      </ol>

      <h4 style="color:#10b981; margin:26px 0 10px 0;">✨ ప్రొడక్షన్ గోల్డెన్ రూల్స్ (Golden Rules):</h4>
      <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px 20px; font-size:13.5px; line-height:1.8; color:var(--text);">
        1. <strong>డేటా ఎన్‌క్యాప్సులేషన్:</strong> క్లాస్ ఫీల్డ్స్ ఎల్లప్పుడూ <code>private</code> గా ఉంచి అవసరమైతేనే getters/setters ఇవ్వండి.<br />
        2. <strong>స్థిర విలువలకు:</strong> క్లాస్ కాన్‌స్టాంట్లను <code>public static final</code> గా ప్రకటించండి.<br />
        3. <strong>ఆబ్జెక్ట్ ఇమ్మ్యుటబిలిటీ:</strong> వీలైనంత వరకు మారకూడని ఫీల్డ్స్‌ను <code>final</code> చేయండి లేదా జావా 14+ Records వాడండి.<br />
        4. <strong>క్లీన్ బాధ్యత:</strong> ప్రతి క్లాస్ ఒకే ఒక డొమైన్ కాన్సెప్ట్‌ను మాత్రమే ప్రతిబింబించాలి.
      </div>

      <!-- QUIZ SECTION -->
      <h3 style="color:#10b981; margin:32px 0 16px 0;">🧠 మీ అవగాహనను పరీక్షించుకోండి (5 Interactive Quizzes):</h3>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:12px 18px; margin-bottom:12px; cursor:pointer;">
        <summary style="font-weight:700; color:var(--text);">ప్రశ్న 1: జావాలో 'new' కీవర్డ్ ద్వారా ఆబ్జెక్ట్ సృష్టించినప్పుడు అది ఎక్కడ కేటాయించబడుతుంది?</summary>
        <p style="margin-top:10px; color:var(--text2); line-height:1.7;">
          <strong>సమాధానం:</strong> ఆబ్జెక్ట్ ఎల్లప్పుడూ <strong>హీప్ మెమరీ (Heap Memory)</strong> లోనే కేటాయించబడుతుంది. కేవలం దాని రిఫరెన్స్ వేరియబుల్ మాత్రమే స్టాక్‌లో ఉంటుంది.
        </p>
      </details>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:12px 18px; margin-bottom:12px; cursor:pointer;">
        <summary style="font-weight:700; color:var(--text);">ప్రశ్న 2: 64-బిట్ JVM లో ఒక ఆబ్జెక్ట్ హెడర్ లోని Mark Word పరిమాణం ఎంత?</summary>
        <p style="margin-top:10px; color:var(--text2); line-height:1.7;">
          <strong>సమాధానం:</strong> <strong>8 బైట్లు (64 బిట్లు)</strong>. ఇందులో హాష్‌కోడ్, GC వయస్సు మరియు లాకింగ్ సమాచారం ఉంటాయి.
        </p>
      </details>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:12px 18px; margin-bottom:12px; cursor:pointer;">
        <summary style="font-weight:700; color:var(--text);">ప్రశ్న 3: Instance వేరియబుల్ మరియు Static వేరియబుల్ మధ్య ప్రాథమిక వ్యత్యాసం ఏమిటి?</summary>
        <p style="margin-top:10px; color:var(--text2); line-height:1.7;">
          <strong>సమాధానం:</strong> Instance వేరియబుల్ ప్రతి ఆబ్జెక్ట్‌కు ప్రత్యేకమైన కాపీని కలిగి ఉంటుంది; Static వేరియబుల్ మొత్తం క్లాస్‌కు సంబంధించిన అన్ని ఆబ్జెక్టులకు కలిపి కేవలం ఒకే ఒక్క ఉమ్మడి కాపీని కలిగి ఉంటుంది.
        </p>
      </details>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:12px 18px; margin-bottom:12px; cursor:pointer;">
        <summary style="font-weight:700; color:var(--text);">ప్రశ్న 4: Static మెథడ్ లోపల 'this' కీవర్డ్ ఎందుకు పనిచేయదు?</summary>
        <p style="margin-top:10px; color:var(--text2); line-height:1.7;">
          <strong>సమాధానం:</strong> Static మెథడ్ క్లాస్ లెవెల్‌లో నడుస్తుంది, ఏ నిర్దిష్ట ఆబ్జెక్ట్‌తో సంబంధం కలిగి ఉండదు. కాబట్టి ప్రస్తుత ఆబ్జెక్ట్‌ను సూచించే <code>this</code> రిఫరెన్స్ అందులో ఉండదు.
        </p>
      </details>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:12px 18px; margin-bottom:12px; cursor:pointer;">
        <summary style="font-weight:700; color:var(--text);">ప్రశ్న 5: ఒక ఆబ్జెక్ట్ ఎప్పుడు గార్బేజ్ కలెక్షన్‌కు అర్హత (Eligible for GC) సాధిస్తుంది?</summary>
        <p style="margin-top:10px; color:var(--text2); line-height:1.7;">
          <strong>సమాధానం:</strong> యాక్టివ్ థ్రెడ్లలోని GC Roots నుండి ఆ ఆబ్జెక్ట్‌ను చేరుకోవడానికి ఎటువంటి లైవ్ రిఫరెన్స్ లేనప్పుడు (Unreachable అయినప్పుడు) అది GC కి అర్హత సాధిస్తుంది.
        </p>
      </details>
    </div>

    <!-- NEXT / PREV NAVIGATION BUTTONS -->
    <div style="display:flex; justify-content:space-between; align-items:center; gap:16px; margin:48px 0 24px 0; flex-wrap:wrap;">
      <a href="/blog-java/13-java-method-overloading-and-varargs.html" style="background:var(--bg2); border:1px solid var(--border); color:var(--text); padding:12px 22px; border-radius:8px; text-decoration:none; font-weight:700; font-size:14px; display:inline-flex; align-items:center; gap:8px;">
        ← మునుపటి పాఠం: 13. Overloading &amp; Varargs
      </a>
      <a href="/blog-java/15-java-constructors-this-keyword-and-chaining.html" style="background:#facc15; border:1px solid #eab308; color:#121212; padding:12px 24px; border-radius:8px; text-decoration:none; font-weight:800; font-size:14px; display:inline-flex; align-items:center; gap:8px; box-shadow:0 2px 10px rgba(234, 179, 8, 0.25);">
        తర్వాతి పాఠం: 15. Constructors &amp; this Keyword →
      </a>
    </div>
  </main>
</div>

<script src="/site-nav.js"></script>
</body>
</html>`;

const outPath = path.join(__dirname, '..', 'public', 'blog-java', '14-java-oop-classes-objects-and-constructors.html');
fs.writeFileSync(outPath, chapter14Content, 'utf8');

console.log('✅ Successfully generated Java Chapter 14 in exact JavaScript HTML style!');
console.log('Target file:', outPath);
console.log('Target file size:', chapter14Content.length, 'characters');

