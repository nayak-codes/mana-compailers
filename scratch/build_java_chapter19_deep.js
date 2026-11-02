const fs = require('fs');
const path = require('path');
const { LESSONS, buildJavaSidebar } = require('./java_curriculum_data.js');

const currentLesson = LESSONS.find(l => l.num === 19);

const chapter19Content = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Java Abstract Classes &amp; Interfaces తెలుగులో — Java Tutorial | Our Compiler</title>
  <meta name="description" content="జావా అబ్‌స్ట్రాక్ట్ క్లాసెస్, ఇంటర్‌ఫేసెస్ (Interfaces), Multiple Inheritance, Java 8+ default/static మెథడ్స్ మరియు మల్టీ-క్లౌడ్ ఇన్‌ఫ్రా ప్రావిజనర్ ప్రాజెక్ట్ తెలుగులో నేర్చుకోండి." />
  <meta name="keywords" content="java abstract classes telugu, java interfaces telugu, abstract class vs interface telugu, default methods interface java telugu, multiple inheritance interfaces telugu" />
  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />
  <link rel="icon" type="image/png" href="/logo.png" />
  <link rel="canonical" href="https://www.ourcompiler.com/blog-java/19-java-abstract-classes-and-interfaces.html" />
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
  ${buildJavaSidebar(19)}

  <!-- MAIN CONTENT -->
  <main class="content">
    <div class="breadcrumb">
      <a href="/">Home</a><span class="sep">›</span>
      <a href="/blog.html">Tutorials</a><span class="sep">›</span>
      <a href="/blog-java.html">Java</a><span class="sep">›</span>
      <span class="current">Lesson 19: Abstract Classes &amp; Interfaces</span>
    </div>

    <h1 class="page-title">19. జావా అబ్‌స్ట్రాక్ట్ క్లాసెస్, ఇంటర్‌ఫేసెస్ &amp; డిఫాల్ట్ మెథడ్స్ (Abstract Classes &amp; Interfaces)</h1>

    <div class="page-meta">
      <span class="badge">☕ Java (Java 21+ LTS)</span>
      <span class="badge">🟢 Lesson 19 of 25</span>
      <span class="badge">📂 Part 04: Core OOP &amp; Exceptions (Page 4 of 5)</span>
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
        ఆబ్జెక్ట్-ఓరియెంటెడ్ ఆర్కిటెక్చర్‌లో కోడ్ లూజ్-కప్లింగ్ (Loose Coupling) సాధించడానికి మరియు హై-లెవల్ డిజైన్‌ను అమలు చేయడానికి జావా అందించిన రెండు అత్యంత ప్రతిష్టాత్మకమైన స్తంభాలు <strong>అబ్‌స్ట్రాక్ట్ క్లాసెస్ (Abstract Classes)</strong> మరియు <strong>ఇంటర్‌ఫేసెస్ (Interfaces)</strong>. అసలు ఆబ్‌స్ట్రాక్షన్ అంటే ఏమిటి? అనవసరమైన అంతర్గత సంక్లిష్టతలను దాచిపెట్టి, వినియోగదారుకు కేవలం 'ఏమి చేయాలి' (What to do) అనే కార్యాచరణను మాత్రమే అందించి, 'ఎలా చేయాలి' (How to do) అనే బాధ్యతను ఇంప్లిమెంటింగ్ క్లాసులకు అప్పగించడమే ఆబ్‌స్ట్రాక్షన్. అబ్‌స్ట్రాక్ట్ క్లాస్ అనేది పాక్షిక నిర్మాణం (Partial Implementation) కాగా, ఇంటర్‌ఫేస్ అనేది 100% ప్యూర్ కాంట్రాక్ట్ (Pure Contract). జావాలో క్లాసుల స్థాయిలో నిషేధించబడిన Multiple Inheritance ను ఇంటర్‌ఫేస్‌ల ద్వారా ఎలా సురక్షితంగా సాధించవచ్చు? మరియు Java 8+ లో వచ్చిన విప్లవాత్మక <strong><code>default</code> &amp; <code>static</code> Interface Methods</strong> పాత ఆర్కిటెక్చర్లను ఎలా కాపాడాయి? అనే పూర్తి లోతులను ఈ పాఠంలో నేర్చుకుందాం.
      </p>

      <h4 style="margin:0 0 10px 0; color:#047857; font-size:16px; font-weight:800;">
        సగం నిర్మించిన ఇల్లు &amp; 3-పిన్ సాకెట్ అగ్రిమెంట్ అనాలజీ (The Semi-Constructed House &amp; Universal Socket Contract Analogy):
      </h4>
      <ol style="margin:0; padding-left:22px; color:#334155; line-height:1.8; font-size:14.5px;">
        <li style="margin-bottom:8px;">
          <strong>1. Abstract Class (సగం నిర్మించిన డ్యూప్లెక్స్ విల్లా - Partial Implementation):</strong> ఒక బిల్డర్ పునాది, పిల్లర్లు, గోడలు, మెట్లు మరియు పైకప్పును పటిష్టంగా నిర్మించాడు (Concrete Methods). లోపల టైల్స్, రంగులు, మరియు ఫర్నిచర్ అమరికను కాబోయే ఇంటి యజమాని ఇష్టానికి వదిలేశాడు (Abstract Methods). ఆ సగం నిర్మించిన ఇంట్లోకి ఎవరూ నేరుగా దిగలేరు (Cannot instantiate directly: <code>new House()</code> is forbidden); మిగిలిన ఇంటీరియర్ పూర్తి చేసే వారసుడు (Subclass) వచ్చినప్పుడే అది నివాసయోగ్యమైన పూర్తి ఇల్లవుతుంది!
        </li>
        <li style="margin-bottom:8px;">
          <strong>2. Interface (అంతర్జాతీయ 3-పిన్ ఎలక్ట్రిక్ సాకెట్ ఒప్పందం - 100% Pure Contract):</strong> గోడపై బిగించిన 3-పిన్ సాకెట్ ఒక అంతర్జాతీయ అగ్రిమెంట్ (Contract). అది చెబుతుంది: 'నాలో 3 రంధ్రాలు ఉన్నాయి; 230 వోల్ట్ల కరెంట్ వస్తుంది'. ఆ సాకెట్‌కు ల్యాప్‌టాప్ ఛార్జర్ పెడతారా, గీజర్ పెడతారా లేదా టీవీ పెడతారా అనేది దానితో సంబంధం లేదు. ప్లగ్ తయారు చేసే ప్రతి ఎలక్ట్రానిక్ కంపెనీ ఆ సాకెట్ ఒప్పందానికి (Interface) అనుగుణంగా ప్లగ్ నిర్మిస్తే చాలు (implements)!
        </li>
        <li>
          <strong>3. Multiple Interfaces &amp; Default Methods (బహుళ గుర్తింపు కార్డులు &amp; ఉచిత ఫీచర్లు):</strong>
          <br />• Multiple Interfaces: ఒక వ్యక్తి ఏకకాలంలో 'డ్రైవర్' ఒప్పందాన్ని, 'పైలట్' ఒప్పందాన్ని, 'డాక్టర్' ఒప్పందాన్ని కలిగి ఉండవచ్చు (<code>implements Driver, Pilot, Doctor</code>).
          <br />• Default Methods: ప్రపంచవ్యాప్తంగా ఇప్పటికే వాడుకలో ఉన్న లక్షలాది క్లాసులను బ్రేక్ చేయకుండా, ఇంటర్‌ఫేస్‌లో డిఫాల్ట్ కోడ్‌తో కొత్త ఫీచర్‌ను జోడించడానికి Java 8 <code>default</code> మెథడ్స్ అనే వరాన్ని అందించింది!
        </li>
      </ol>
      <p style="margin:14px 0 0 0; font-size:14px; color:#475569; line-height:1.7;">
        ఈ పాఠం ముగిసేసరికి మీరు లూజ్-కప్లింగ్ ఆధారిత ఎంటర్‌ప్రైజ్ సాఫ్ట్‌వేర్ ఆర్కిటెక్చర్‌ను డిజైన్ చేయడంలో మరియు మల్టీ-క్లౌడ్ ఇన్‌ఫ్రాస్ట్రక్చర్ ప్రావిజనర్ ఇంజిన్‌ను నిర్మించడంలో నిష్ణాతులవుతారు!
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
            విభాగం A: అబ్‌స్ట్రాక్ట్ క్లాసెస్ మూలాలు
          </div>
          <ul style="list-style:none; padding:0; margin:0; font-size:13px; line-height:2.1;">
            <li><a href="#sec-1" style="color:var(--text2); text-decoration:none;">1. ఆబ్‌స్ట్రాక్షన్ అంటే ఏమిటి? abstract కీవర్డ్</a></li>
            <li><a href="#sec-2" style="color:var(--text2); text-decoration:none;">2. అబ్‌స్ట్రాక్ట్ క్లాస్ లక్షణాలు &amp; ఆబ్జెక్ట్ నిషేధం</a></li>
            <li><a href="#sec-3" style="color:var(--text2); text-decoration:none;">3. Concrete Methods vs Abstract Methods</a></li>
            <li><a href="#sec-4" style="color:var(--text2); text-decoration:none;">4. అబ్‌స్ట్రాక్ట్ క్లాస్‌కు కన్‌స్ట్రక్టర్ ఉంటుందా?</a></li>
          </ul>
        </div>
        <div>
          <div style="font-weight:700; color:#10b981; margin-bottom:8px; font-size:13.5px; border-bottom:1px solid var(--border); padding-bottom:4px;">
            విభాగం B: ఇంటర్‌ఫేసెస్ &amp; ఆధునిక ఫీచర్లు
          </div>
          <ul style="list-style:none; padding:0; margin:0; font-size:13px; line-height:2.1;">
            <li><a href="#sec-5" style="color:var(--text2); text-decoration:none;">5. ఇంటర్‌ఫేస్ (100% Contract) &amp; implements</a></li>
            <li><a href="#sec-6" style="color:var(--text2); text-decoration:none;">6. Abstract Class vs Interface 8 కీలక తేడాలు</a></li>
            <li><a href="#sec-7" style="color:var(--text2); text-decoration:none;">7. Multiple Inheritance via Interfaces</a></li>
            <li><a href="#sec-8" style="color:var(--text2); text-decoration:none;">8. Java 8+ default &amp; static మెథడ్స్</a></li>
          </ul>
        </div>
        <div>
          <div style="font-weight:700; color:#10b981; margin-bottom:8px; font-size:13.5px; border-bottom:1px solid var(--border); padding-bottom:4px;">
            విభాగం C: డెమోలు, ప్రాజెక్ట్ &amp; పరీక్ష
          </div>
          <ul style="list-style:none; padding:0; margin:0; font-size:13px; line-height:2.1;">
            <li><a href="#sec-9" style="color:var(--text2); text-decoration:none;">9. డెమో 1: Abstract Template Method Pattern</a></li>
            <li><a href="#sec-10" style="color:var(--text2); text-decoration:none;">10. డెమో 2: Multiple Interfaces &amp; Default Methods</a></li>
            <li><a href="#sec-11" style="color:var(--text2); text-decoration:none;">11. Capstone ప్రాజెక్ట్: మల్టీ-క్లౌడ్ ప్రావిజనర్</a></li>
            <li><a href="#sec-12" style="color:var(--text2); text-decoration:none;">12. ప్రొడక్షన్ పిట్‌ఫాల్స్, బెస్ట్ ప్రాక్టీసెస్ &amp; 5 క్విజ్‌లు</a></li>
          </ul>
        </div>
      </div>
    </div>

    <!-- SECTION 1 -->
    <div id="sec-1" class="section-card">
      <h2>1. ఆబ్‌స్ట్రాక్షన్ అంటే ఏమిటి? abstract కీవర్డ్ (The Core Abstraction Concept)</h2>
      <p>
        సాఫ్ట్‌వేర్ అభివృద్ధిలో ఆబ్‌స్ట్రాక్షన్ అంటే అంతర్గత సంక్లిష్టమైన కోడింగ్ వివరాలను (Implementation Details) దాచిపెట్టి, కేవలం అవసరమైన బహిరంగ ఫీచర్లను మాత్రమే ప్రపంచానికి అందించడం.
      </p>
      <p>
        జావాలో దీనికోసం <strong><code>abstract</code></strong> అనే నాన్-యాక్సెస్ మోడిఫైయర్‌ను ఉపయోగిస్తాం. <code>abstract</code> కీవర్డ్ రెండు చోట్ల వాడబడుతుంది:
        <br />• <strong>అబ్‌స్ట్రాక్ట్ క్లాస్ (Abstract Class):</strong> <code>public abstract class BaseService {}</code>
        <br />• <strong>అబ్‌స్ట్రాక్ట్ మెథడ్ (Abstract Method):</strong> ఎటువంటి బాడీ <code>{ }</code> లేకుండా కేవలం సెమికోలన్ <code>;</code> తో ముగిసే మెథడ్: <code>public abstract void process();</code>
      </p>
    </div>

    <!-- SECTION 2 -->
    <div id="sec-2" class="section-card">
      <h2>2. అబ్‌స్ట్రాక్ట్ క్లాస్ లక్షణాలు &amp; ఆబ్జెక్ట్ నిషేధం (Cannot Instantiate Directly)</h2>
      <p>
        అబ్‌స్ట్రాక్ట్ క్లాస్ యొక్క అత్యంత ప్రాథమిక నియమం: <strong>దీనికి నేరుగా ఆబ్జెక్ట్‌ను సృష్టించలేము!</strong>
      </p>

      <div style="background:var(--bg2); border:1px solid #ef4444; border-radius:8px; padding:16px; margin:16px 0;">
        <pre style="margin:0; font-family:'JetBrains Mono', monospace; font-size:13px; color:var(--text); line-height:1.6;"><code>public abstract class GraphicShape {
    abstract void draw();
}

GraphicShape shape = new GraphicShape(); // ❌ COMPILE ERROR: GraphicShape is abstract; cannot be instantiated!</code></pre>
        <p style="margin:10px 0 0 0; font-size:13px; color:var(--text2);">
          ఎందుకు నిషేధం? ఎందుకంటే <code>draw()</code> మెథడ్‌కు అసలు బాడీనే లేదు. ఒకవేళ ఆబ్జెక్ట్ సృష్టించడానికి అనుమతిస్తే <code>shape.draw()</code> అన్నప్పుడు JVM ఏమి రన్ చేయాలో అర్థం కాక క్రాష్ అవుతుంది! అందువల్ల సబ్‌క్లాస్ ఆ మెథడ్‌ను ఓవర్‌రైడ్ చేసి బాడీ ఇచ్చేంతవరకు ఆబ్జెక్ట్ క్రియేషన్ సాధ్యం కాదు.
        </p>
      </div>
    </div>

    <!-- SECTION 3 -->
    <div id="sec-3" class="section-card">
      <h2>3. Concrete Methods vs Abstract Methods మిశ్రమం (Partial Implementation)</h2>
      <p>
        అబ్‌స్ట్రాక్ట్ క్లాస్ యొక్క గొప్పదనం ఏమిటంటే — ఇది సంపూర్ణంగా అసంపూర్తిగా ఉండాల్సిన పనిలేదు! ఇందులో రెండు రకాల మెథడ్స్ కలిసి ఉండవచ్చు:
      </p>

      <ul>
        <li><strong>కాంక్రీట్ మెథడ్స్ (Concrete Methods):</strong> సాధారణ బాడీ <code>{ ... }</code> ఉన్న మెథడ్స్. ఇవి అన్ని సబ్‌క్లాసులకూ ఉమ్మడిగా ఉపయోగపడే కామన్ లాజిక్‌ను కలిగి ఉంటాయి.</li>
        <li><strong>అబ్‌స్ట్రాక్ట్ మెథడ్స్ (Abstract Methods):</strong> బాడీ లేని మెథడ్స్. ప్రతి సబ్‌క్లాస్ తప్పనిసరిగా తన సొంత శైలిలో వీటిని అమలు చేయాల్సిందే (Mandatory Override).</li>
      </ul>
    </div>

    <!-- SECTION 4 -->
    <div id="sec-4" class="section-card">
      <h2>4. అబ్‌స్ట్రాక్ట్ క్లాస్‌కు కన్‌స్ట్రక్టర్ ఉంటుందా? (The Constructor Myth)</h2>
      <p>
        జావా ఇంటర్వ్యూలలో వచ్చే ట్రిక్కీ ప్రశ్న: <em>"Can an abstract class have a constructor if it cannot be instantiated?"</em>.
      </p>
      <div style="background:#fefce8; border:1px solid #fde047; border-left:5px solid #ca8a04; border-radius:6px; padding:14px 18px; margin:16px 0; font-size:13.5px; color:#854d0e; line-height:1.7;">
        ✅ <strong>సమాధానం: ఖచ్చితంగా ఉంటుంది!</strong><br />
        అబ్‌స్ట్రాక్ట్ క్లాస్‌కు కన్‌స్ట్రక్టర్లు ఉండవచ్చు. మనం నేరుగా <code>new</code> తో పిలవలేకపోయినప్పటికీ, దాని సబ్‌క్లాస్ ఆబ్జెక్ట్ సృష్టించబడినప్పుడు చైల్డ్ కన్‌స్ట్రక్టర్ తన మొదటి లైన్‌లో <strong><code>super(...)</code></strong> ద్వారా పేరెంట్ అబ్‌స్ట్రాక్ట్ క్లాస్ కన్‌స్ట్రక్టర్‌ను పిలిచి పేరెంట్ ఫీల్డ్స్‌ను ఇనిషియలైజ్ చేస్తుంది!
      </div>
    </div>

    <!-- SECTION 5 -->
    <div id="sec-5" class="section-card">
      <h2>5. ఇంటర్‌ఫేస్ (100% Contract) &amp; implements కీవర్డ్ (Pure Contracts)</h2>
      <p>
        ఒక క్లాస్ సమాజానికి ఇచ్చే 100% స్వచ్ఛమైన వాగ్దానాన్ని <strong>ఇంటర్‌ఫేస్ (Interface)</strong> అంటారు. దీనికోసం <code>interface</code> కీవర్డ్ వాడతాం, మరియు క్లాస్ దాన్ని స్వీకరించడానికి <strong><code>implements</code></strong> కీవర్డ్ వాడతాం.
      </p>

      <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px 20px; margin:18px 0; font-family:'JetBrains Mono', monospace; font-size:13px; line-height:1.8;">
        <span style="color:#0284c7;">public interface</span> CloudStorageProvider {<br />
        &nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#64748b;">// ఫీల్డ్స్ ఎల్లప్పుడూ ఆటోమేటిక్‌గా public static final అవుతాయి</span><br />
        &nbsp;&nbsp;&nbsp;&nbsp;String PROTOCOL_VERSION = <span style="color:#059669;">"v2.4"</span>;<br /><br />
        &nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#64748b;">// మెథడ్స్ ఎల్లప్పుడూ ఆటోమేటిక్‌గా public abstract అవుతాయి</span><br />
        &nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#0284c7;">void</span> upload(String path, <span style="color:#0284c7;">byte</span>[] data);<br />
        &nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#0284c7;">byte</span>[] download(String path);<br />
        }
      </div>
    </div>

    <!-- SECTION 6 -->
    <div id="sec-6" class="section-card">
      <h2>6. Abstract Class vs Interface 8 కీలక తేడాలు (The Definitive Comparison)</h2>
      <p>
        ఈ రెండింటి మధ్య గల సాంకేతిక వ్యత్యాసాలను సంపూర్ణంగా అర్థం చేసుకుందాం:
      </p>

      <div style="overflow-x:auto; margin:20px 0;">
        <table style="width:100%; border-collapse:collapse; font-size:13.5px; text-align:left;">
          <thead>
            <tr style="background:var(--bg2); border-bottom:2px solid var(--border);">
              <th style="padding:12px 14px; color:var(--text); font-weight:700;">ఫీచర్</th>
              <th style="padding:12px 14px; color:var(--text); font-weight:700;">అబ్‌స్ట్రాక్ట్ క్లాస్ (Abstract Class)</th>
              <th style="padding:12px 14px; color:var(--text); font-weight:700;">ఇంటర్‌ఫేస్ (Interface)</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom:1px solid var(--border);">
              <td style="padding:10px 14px; font-weight:600; color:var(--text);">కీవర్డ్</td>
              <td style="padding:10px 14px; color:var(--text2);"><code>abstract class</code> &amp; <code>extends</code></td>
              <td style="padding:10px 14px; color:var(--text2);"><code>interface</code> &amp; <code>implements</code></td>
            </tr>
            <tr style="border-bottom:1px solid var(--border);">
              <td style="padding:10px 14px; font-weight:600; color:var(--text);">మల్టిపుల్ ఇన్హెరిటెన్స్</td>
              <td style="padding:10px 14px; color:#ef4444;">ఒకే క్లాస్‌ను ఎక్స్‌టెండ్ చేయగలం</td>
              <td style="padding:10px 14px; color:#10b981; font-weight:700;">ఎన్ని ఇంటర్‌ఫేస్‌లనైనా ఇంప్లిమెంట్ చేయవచ్చు</td>
            </tr>
            <tr style="border-bottom:1px solid var(--border);">
              <td style="padding:10px 14px; font-weight:600; color:var(--text);">కన్‌స్ట్రక్టర్లు</td>
              <td style="padding:10px 14px; color:#10b981; font-weight:700;">కన్‌స్ట్రక్టర్లు ఉండవచ్చు</td>
              <td style="padding:10px 14px; color:#ef4444;">కన్‌స్ట్రక్టర్లు అసలు ఉండకూడదు</td>
            </tr>
            <tr style="border-bottom:1px solid var(--border);">
              <td style="padding:10px 14px; font-weight:600; color:var(--text);">ఇన్‌స్టాన్స్ వేరియబుల్స్</td>
              <td style="padding:10px 14px; color:#10b981;">నాన్-స్టాటిక్ స్టేట్ ఫీల్డ్స్ ఉండవచ్చు</td>
              <td style="padding:10px 14px; color:var(--text2);">కేవలం <code>public static final</code> స్థిరరాశులు మాత్రమే</td>
            </tr>
            <tr style="border-bottom:1px solid var(--border);">
              <td style="padding:10px 14px; font-weight:600; color:var(--text);">స్పీడ్ &amp; పెర్ఫార్మెన్స్</td>
              <td style="padding:10px 14px; color:var(--text2);">vtable ఆధారంగా కాస్త వేగవంతం</td>
              <td style="padding:10px 14px; color:var(--text2);">itable ద్వారా కొద్దిగా అదనపు సెర్చ్ (negligible)</td>
            </tr>
            <tr>
              <td style="padding:10px 14px; font-weight:600; color:var(--text);">ఉపయోగించే సందర్భం</td>
              <td style="padding:10px 14px; color:var(--text2);">దగ్గరి బంధుత్వాలు (IS-A) &amp; కోడ్ షేరింగ్ ఉన్నప్పుడు</td>
              <td style="padding:10px 14px; color:var(--text2);">సంబంధం లేని క్లాసుల మధ్య కామన్ కాంట్రాక్ట్స్ కు</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- SECTION 7 -->
    <div id="sec-7" class="section-card">
      <h2>7. Multiple Inheritance via Interfaces (The Clean Solution)</h2>
      <p>
        క్లాసులలో డైమండ్ సమస్య ఎందుకు వచ్చిందంటే అక్కడ ఫీల్డ్స్ మరియు కాంక్రీట్ మెథడ్స్ ఉండేవి. కానీ ఇంటర్‌ఫేస్‌లలో కేవలం మెథడ్ పేర్లు మాత్రమే ఉండటం వల్ల, ఒకే క్లాస్ ఎన్ని ఇంటర్‌ఫేస్‌ల నుండి అయినా ఒకే పేరున్న మెథడ్‌ను ఇంప్లిమెంట్ చేసినా ఎటువంటి గందరగోళం ఉండదు:
      </p>

      <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px 20px; margin:16px 0; font-family:'JetBrains Mono', monospace; font-size:13px; line-height:1.8;">
        <span style="color:#0284c7;">public class</span> ModernServer <span style="color:#0284c7;">implements</span> AutoScalable, Monitorable, SecureAuditable {<br />
        &nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#64748b;">// మూడింటి నిబంధనలనూ ఒకే చోట అమలు చేస్తుంది!</span><br />
        }
      </div>
    </div>

    <!-- SECTION 8 -->
    <div id="sec-8" class="section-card">
      <h2>8. Java 8+ default &amp; static మెథడ్స్ (Interface Evolution)</h2>
      <p>
        గతంలో ఒక ఇంటర్‌ఫేస్‌కు కొత్త మెథడ్ చేరిస్తే, ప్రపంచంలో ఆ ఇంటర్‌ఫేస్‌ను వాడుతున్న లక్షలాది క్లాసులు కంపైలేషన్ ఎర్రర్‌తో బ్రేక్ అయ్యేవి. ఈ సంక్షోభాన్ని పరిష్కరించడానికి <strong>Java 8</strong> లో రెండు విప్లవాత్మక ఫీచర్లు వచ్చాయి:
      </p>

      <ul>
        <li>
          <strong><code>default</code> మెథడ్స్:</strong> ఇంటర్‌ఫేస్ లోపలే మెథడ్ బాడీని <code>default</code> కీవర్డ్ తో రాయవచ్చు. ఇంప్లిమెంటింగ్ క్లాస్ దీన్ని ఓవర్‌రైడ్ చేయకపోతే ఈ డిఫాల్ట్ బాడీ రన్ అవుతుంది. పాత కోడ్ ఏమాత్రం బ్రేక్ అవ్వదు!
        </li>
        <li>
          <strong><code>static</code> మెథడ్స్:</strong> ఇంటర్‌ఫేస్ లోపల యుటిలిటీ మెథడ్లను <code>static</code> గా రాసి, నేరుగా <code>InterfaceName.utilityMethod()</code> రూపంలో పిలవవచ్చు.
        </li>
        <li>
          <strong><code>private</code> మెథడ్స్ (Java 9):</strong> బహుళ డిఫాల్ట్ మెథడ్స్ మధ్య కామన్ కోడ్‌ను షేర్ చేసుకోవడానికి ఇంటర్‌ఫేస్ లోపల ప్రైవేట్ మెథడ్స్ రాసే వీలు కల్పించారు.
        </li>
      </ul>
    </div>

    <!-- SECTION 9: CODE DEMO 1 -->
    <div id="sec-9" class="section-card">
      <h2>9. డెమో 1: Abstract Class Template Method Pattern (Architecture Demo)</h2>
      <p>
        అబ్‌స్ట్రాక్ట్ క్లాస్ ద్వారా సాఫ్ట్‌వేర్ డిజైన్ ప్యాటర్న్‌లలో అత్యంత ప్రసిద్ధమైన <strong>Template Method Pattern</strong> ను ఎలా నిర్మించాలో చూపే ప్రాక్టికల్ డెమో:
      </p>

      <div class="code-block">
        <div class="code-header">
          <span class="file-name">AbstractClassTemplatePatternDemo.java</span>
          <div class="btn-group">
            <button class="btn-copy" onclick="copyCodeSnippet(this)">📋 Copy Code</button>
            <button class="btn-run" onclick="runInJavaCompiler(this)">▶ Run in Java Compiler</button>
          </div>
        </div>
        <pre><code class="language-java">public class AbstractClassTemplatePatternDemo {

    // Base Abstract Pipeline Class
    public static abstract class DataProcessingPipeline {
        private final String pipelineName;

        public DataProcessingPipeline(String name) {
            this.pipelineName = name;
        }

        // Concrete Steps (Common to all pipelines)
        private void connectSource() {
            System.out.println("  1. Connected to source storage stream.");
        }

        private void closeSource() {
            System.out.println("  4. Closed data stream successfully.");
        }

        // Abstract Steps (To be customized by each specific pipeline)
        protected abstract void parseData();
        protected abstract void transformAndEnrich();

        // The Template Method (final so child classes cannot alter the master workflow order)
        public final void executePipeline() {
            System.out.println("🚀 Executing Pipeline: " + pipelineName);
            connectSource();
            parseData();
            transformAndEnrich();
            closeSource();
            System.out.println("✅ Pipeline completed.\n");
        }
    }

    // Concrete Pipeline 1: CSV Financial Parser
    public static class CsvFinancialPipeline extends DataProcessingPipeline {
        public CsvFinancialPipeline() {
            super("CSV-Financial-Batch-Loader");
        }

        @Override
        protected void parseData() {
            System.out.println("  2. [Custom] Parsing comma-separated financial rows into ledger objects.");
        }

        @Override
        protected void transformAndEnrich() {
            System.out.println("  3. [Custom] Calculating currency exchange rates and adding GST tags.");
        }
    }

    // Concrete Pipeline 2: JSON Sensor Event Parser
    public static class JsonSensorPipeline extends DataProcessingPipeline {
        public JsonSensorPipeline() {
            super("JSON-IoT-Stream-Loader");
        }

        @Override
        protected void parseData() {
            System.out.println("  2. [Custom] Deserializing UTF-8 JSON sensor payload buffers.");
        }

        @Override
        protected void transformAndEnrich() {
            System.out.println("  3. [Custom] Computing rolling temperature anomaly thresholds.");
        }
    }

    public static void main(String[] args) {
        System.out.println("=================================================");
        System.out.println("🏭 ABSTRACT TEMPLATE METHOD DESIGN PATTERN DEMO");
        System.out.println("=================================================\n");

        DataProcessingPipeline p1 = new CsvFinancialPipeline();
        p1.executePipeline();

        DataProcessingPipeline p2 = new JsonSensorPipeline();
        p2.executePipeline();

        System.out.println("=================================================");
    }
}</code></pre>
      </div>

      <div class="code-output-card">
        <div class="output-header">Terminal Output:</div>
        <pre class="output-body">=================================================
🏭 ABSTRACT TEMPLATE METHOD DESIGN PATTERN DEMO
=================================================

🚀 Executing Pipeline: CSV-Financial-Batch-Loader
  1. Connected to source storage stream.
  2. [Custom] Parsing comma-separated financial rows into ledger objects.
  3. [Custom] Calculating currency exchange rates and adding GST tags.
  4. Closed data stream successfully.
✅ Pipeline completed.

🚀 Executing Pipeline: JSON-IoT-Stream-Loader
  1. Connected to source storage stream.
  2. [Custom] Deserializing UTF-8 JSON sensor payload buffers.
  3. [Custom] Computing rolling temperature anomaly thresholds.
  4. Closed data stream successfully.
✅ Pipeline completed.

=================================================</pre>
      </div>
    </div>

    <!-- SECTION 10: CODE DEMO 2 -->
    <div id="sec-10" class="section-card">
      <h2>10. డెమో 2: Multiple Interfaces &amp; Default Methods (Modern Interface Demo)</h2>
      <p>
        ఒకే క్లాస్ బహుళ ఇంటర్‌ఫేస్‌లను ఎలా అమలు చేస్తుందో మరియు Java 8 <code>default</code> మెథడ్స్ ఎలా పనిచేస్తాయో పరిశీలిద్దాం:
      </p>

      <div class="code-block">
        <div class="code-header">
          <span class="file-name">MultipleInterfacesAndDefaultMethodsDemo.java</span>
          <div class="btn-group">
            <button class="btn-copy" onclick="copyCodeSnippet(this)">📋 Copy Code</button>
            <button class="btn-run" onclick="runInJavaCompiler(this)">▶ Run in Java Compiler</button>
          </div>
        </div>
        <pre><code class="language-java">public class MultipleInterfacesAndDefaultMethodsDemo {

    // Interface 1: Deployable Contract
    public interface Deployable {
        void deployToCluster(String clusterId);

        // Java 8 Default Method (Free standard implementation)
        default void runHealthCheck() {
            System.out.println("  🩺 [Default HealthCheck] Ping probe returned 200 OK.");
        }

        // Java 8 Static Helper Method
        static String getDeploymentStandard() {
            return "OCI-Container-v1.4";
        }
    }

    // Interface 2: Auditable Contract
    public interface SecurityAuditable {
        void auditCompliance();
    }

    // Concrete Microservice implementing MULTIPLE Interfaces
    public static class PaymentGatewayService implements Deployable, SecurityAuditable {
        private final String serviceName;

        public PaymentGatewayService(String name) {
            this.serviceName = name;
        }

        @Override
        public void deployToCluster(String clusterId) {
            System.out.printf("🚀 Deploying '%s' to Kubernetes Cluster [%s]%n", serviceName, clusterId);
        }

        @Override
        public void auditCompliance() {
            System.out.printf("🔒 Auditing '%s': PCI-DSS Level 1 &amp; ISO 27001 Passed%n", serviceName);
        }

        // Optionally overriding the default method for customized behavior
        @Override
        public void runHealthCheck() {
            System.out.printf("  🩺 [Custom HealthCheck for %s] Deep DB Socket + Vault Tokens Valid.%n", serviceName);
        }
    }

    public static void main(String[] args) {
        System.out.println("=================================================");
        System.out.println("🌐 MULTIPLE INTERFACES &amp; DEFAULT METHODS DEMO");
        System.out.println("=================================================\n");

        System.out.println("Static Interface Standard: " + Deployable.getDeploymentStandard() + "\n");

        PaymentGatewayService service = new PaymentGatewayService("PaymentGateway-Core");
        service.deployToCluster("k8s-prod-us-east-1");
        service.runHealthCheck();
        service.auditCompliance();

        System.out.println("\n=================================================");
        System.out.println("✅ Multiple inheritance of type achieved cleanly!");
        System.out.println("=================================================");
    }
}</code></pre>
      </div>

      <div class="code-output-card">
        <div class="output-header">Terminal Output:</div>
        <pre class="output-body">=================================================
🌐 MULTIPLE INTERFACES &amp; DEFAULT METHODS DEMO
=================================================

Static Interface Standard: OCI-Container-v1.4

🚀 Deploying 'PaymentGateway-Core' to Kubernetes Cluster [k8s-prod-us-east-1]
  🩺 [Custom HealthCheck for PaymentGateway-Core] Deep DB Socket + Vault Tokens Valid.
🔒 Auditing 'PaymentGateway-Core': PCI-DSS Level 1 &amp; ISO 27001 Passed

=================================================
✅ Multiple inheritance of type achieved cleanly!
=================================================</pre>
      </div>
    </div>

    <!-- SECTION 11: CAPSTONE PROJECT -->
    <div id="sec-11" class="section-card">
      <h2>11. Capstone ప్రాజెక్ట్: మల్టీ-క్లౌడ్ ఇన్‌ఫ్రాస్ట్రక్చర్ ప్రావిజనర్ ఇంజిన్</h2>
      <p>
        ఈ అధ్యాయంలో నేర్చుకున్న అన్ని కాన్సెప్టులను (అబ్‌స్ట్రాక్ట్ బేస్ క్లాస్, బహుళ ఇంటర్‌ఫేసెస్, డీఫాల్ట్ మెథడ్స్, స్టాటిక్ హెల్పర్స్ మరియు పాలిమార్ఫిక్ ఆర్కిటెక్చర్) సమగ్రంగా మేళవిస్తూ ఒక ఎంటర్‌ప్రైజ్ స్థాయి <strong>Multi-Cloud DevOps Compute Provisioner &amp; Cost Auditor</strong> ను నిర్మిద్దాం:
      </p>

      <div class="code-block">
        <div class="code-header">
          <span class="file-name">MultiCloudInfrastructureProvisionerEngine.java</span>
          <div class="btn-group">
            <button class="btn-copy" onclick="copyCodeSnippet(this)">📋 Copy Code</button>
            <button class="btn-run" onclick="runInJavaCompiler(this)">▶ Run in Java Compiler</button>
          </div>
        </div>
        <pre><code class="language-java">public class MultiCloudInfrastructureProvisionerEngine {

    // Interface 1: Cost Management
    public interface CostTrackable {
        double calculateMonthlyCostUsd();

        default void printCostBreakdown() {
            System.out.printf("   💵 Monthly Estimated Spend: $%,.2f USD%n", calculateMonthlyCostUsd());
        }
    }

    // Interface 2: Disaster Recovery
    public interface DisasterRecoverable {
        void replicateToFailoverZone(String targetZone);
    }

    // Base Abstract Compute Instance
    public static abstract class CloudComputeInstance implements CostTrackable, DisasterRecoverable {
        private final String instanceId;
        private final int cpuCores;
        private final int ramGigabytes;
        private boolean isRunning;

        public CloudComputeInstance(String id, int cpu, int ram) {
            this.instanceId = id;
            this.cpuCores = cpu;
            this.ramGigabytes = ram;
            this.isRunning = false;
        }

        public void startInstance() {
            this.isRunning = true;
            System.out.printf("🟢 Instance [%s] Booted with %d vCPUs &amp; %d GB RAM%n",
                    instanceId, cpuCores, ramGigabytes);
        }

        public abstract String getCloudProvider();
        public abstract void attachStorageVolume(int gigabytes);

        public String getInstanceId() { return instanceId; }
        public boolean isRunning() { return isRunning; }
    }

    // Implementation 1: AWS EC2 Instance
    public static class AwsEc2Instance extends CloudComputeInstance {
        public AwsEc2Instance(String id, int cpu, int ram) {
            super(id, cpu, ram);
        }

        @Override public String getCloudProvider() { return "Amazon Web Services (AWS)"; }

        @Override
        public void attachStorageVolume(int gb) {
            System.out.println("  💾 [AWS EBS] Provisioning gp3 IOPS Volume: " + gb + " GB");
        }

        @Override
        public double calculateMonthlyCostUsd() { return 145.50; }

        @Override
        public void replicateToFailoverZone(String zone) {
            System.out.println("  🛡️ [AWS Cross-Region] Snapshot synced to " + zone);
        }
    }

    // Implementation 2: Azure Virtual Machine
    public static class AzureVmInstance extends CloudComputeInstance {
        public AzureVmInstance(String id, int cpu, int ram) {
            super(id, cpu, ram);
        }

        @Override public String getCloudProvider() { return "Microsoft Azure"; }

        @Override
        public void attachStorageVolume(int gb) {
            System.out.println("  💾 [Azure Managed Disk] Attaching Premium SSD v2: " + gb + " GB");
        }

        @Override
        public double calculateMonthlyCostUsd() { return 138.20; }

        @Override
        public void replicateToFailoverZone(String zone) {
            System.out.println("  🛡️ [Azure Site Recovery] Failover vault replicated to " + zone);
        }
    }

    public static void main(String[] args) {
        System.out.println("=================================================");
        System.out.println("☁️ MULTI-CLOUD DEVOPS PROVISIONER PIPELINE");
        System.out.println("=================================================\n");

        CloudComputeInstance[] cloudFleet = {
            new AwsEc2Instance("i-08a9f2bc", 8, 32),
            new AzureVmInstance("vm-eastus-prod", 8, 32)
        };

        double totalMonthlySpend = 0;

        for (CloudComputeInstance node : cloudFleet) {
            System.out.println("Provider: " + node.getCloudProvider());
            node.startInstance();
            node.attachStorageVolume(500);
            node.replicateToFailoverZone("ap-southeast-1 (Singapore)");
            node.printCostBreakdown(); // Calling interface default method!
            totalMonthlySpend += node.calculateMonthlyCostUsd();
            System.out.println("-------------------------------------------------");
        }

        System.out.printf("💰 TOTAL FLEET MONTHLY RUN-RATE: $%,.2f USD%n", totalMonthlySpend);
        System.out.println("=================================================");
    }
}</code></pre>
      </div>

      <div class="code-output-card">
        <div class="output-header">Terminal Output:</div>
        <pre class="output-body">=================================================
☁️ MULTI-CLOUD DEVOPS PROVISIONER PIPELINE
=================================================

Provider: Amazon Web Services (AWS)
🟢 Instance [i-08a9f2bc] Booted with 8 vCPUs &amp; 32 GB RAM
  💾 [AWS EBS] Provisioning gp3 IOPS Volume: 500 GB
  🛡️ [AWS Cross-Region] Snapshot synced to ap-southeast-1 (Singapore)
   💵 Monthly Estimated Spend: $145.50 USD
-------------------------------------------------
Provider: Microsoft Azure
🟢 Instance [vm-eastus-prod] Booted with 8 vCPUs &amp; 32 GB RAM
  💾 [Azure Managed Disk] Attaching Premium SSD v2: 500 GB
  🛡️ [Azure Site Recovery] Failover vault replicated to ap-southeast-1 (Singapore)
   💵 Monthly Estimated Spend: $138.20 USD
-------------------------------------------------
💰 TOTAL FLEET MONTHLY RUN-RATE: $283.70 USD
=================================================</pre>
      </div>
    </div>

    <!-- SECTION 12 -->
    <div id="sec-12" class="section-card">
      <h2>12. ప్రొడక్షన్ పిట్‌ఫాల్స్, బెస్ట్ ప్రాక్టీసెస్ &amp; 5 క్విజ్‌లు (Best Practices &amp; Quizzes)</h2>

      <h4 style="color:#ef4444; margin:16px 0 10px 0;">🚫 ప్రొడక్షన్‌లో నివారించాల్సిన 4 ఘోరమైన తప్పులు (Production Pitfalls):</h4>
      <ol style="line-height:1.8; color:var(--text2); font-size:14px; padding-left:20px;">
        <li style="margin-bottom:10px;">
          <strong>అన్నింటికీ అబ్‌స్ట్రాక్ట్ క్లాస్ రాయడం:</strong> కేవలం ఇంటర్‌ఫేస్ సరిపోయే చోట కూడా అబ్‌స్ట్రాక్ట్ క్లాస్ రాస్తే, సబ్‌క్లాస్ వేరే క్లాస్‌ను ఎక్స్‌టెండ్ చేసుకునే ఏకైక వారసత్వ అవకాశాన్ని కోల్పోతుంది.
        </li>
        <li style="margin-bottom:10px;">
          <strong>ఇంటర్‌ఫేస్‌లో స్థిరరాశులు (Constants) వేయడం (Constant Interface Antipattern):</strong> కాన్‌స్టాంట్స్ కోసం ఇంటర్‌ఫేస్‌ను వాడకూడదు; వాటి కోసం enum లేదా final utility class వాడాలి.
        </li>
        <li style="margin-bottom:10px;">
          <strong>రెండు ఇంటర్‌ఫేస్‌ల డిఫాల్ట్ మెథడ్స్ మధ్య ఘర్షణ:</strong> ఒకే పేరున్న రెండు డిఫాల్ట్ మెథడ్స్ ఉన్న రెండు ఇంటర్‌ఫేస్‌లను ఇంప్లిమెంట్ చేసినప్పుడు సబ్‌క్లాస్ స్పష్టంగా దాన్ని ఓవర్‌రైడ్ చేయకపోతే కంపైలేషన్ ఎర్రర్ వస్తుంది.
        </li>
        <li style="margin-bottom:10px;">
          <strong>అబ్‌స్ట్రాక్ట్ మెథడ్‌ను final లేదా private చేయడం:</strong> అబ్‌స్ట్రాక్ట్ మెథడ్ తప్పనిసరిగా సబ్‌క్లాస్‌లో ఓవర్‌రైడ్ కావాలి; దాన్ని <code>private</code> లేదా <code>final</code> చేస్తే కంపైలర్ తక్షణమే ఎర్రర్ ఇస్తుంది.
        </li>
      </ol>

      <h4 style="color:#10b981; margin:26px 0 10px 0;">✨ ప్రొడక్షన్ గోల్డెన్ రూల్స్ (Golden Rules):</h4>
      <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px 20px; font-size:13.5px; line-height:1.8; color:var(--text);">
        1. <strong>కాంట్రాక్ట్స్ కు ఇంటర్‌ఫేస్:</strong> సిస్టమ్ బౌండరీలను ఎల్లప్పుడూ <code>interface</code> లతో నిర్వచించండి.<br />
        2. <strong>కోడ్ షేరింగ్ కు అబ్‌స్ట్రాక్ట్ క్లాస్:</strong> ఉమ్మడి స్టేట్ మరియు బేస్ కన్‌స్ట్రక్టర్ అవసరమైనప్పుడు అబ్‌స్ట్రాక్ట్ క్లాస్ ఎంచుకోండి.<br />
        3. <strong>డిఫాల్ట్ మెథడ్స్ జాగ్రత్త:</strong> కేవలం బ్యాక్‌వర్డ్ అనుకూలత కోసం మాత్రమే <code>default</code> మెథడ్స్ వాడండి.<br />
        4. <strong>లూజ్ కప్లింగ్:</strong> వేరియబుల్స్ ను ఎల్లప్పుడూ ఇంటర్‌ఫేస్ టైప్‌తో డిక్లేర్ చేయండి (ఉదా: <code>List&lt;String&gt; list = new ArrayList&lt;&gt;();</code>).
      </div>

      <!-- QUIZ SECTION -->
      <h3 style="color:#10b981; margin:32px 0 16px 0;">🧠 మీ అవగాహనను పరీక్షించుకోండి (5 Interactive Quizzes):</h3>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:12px 18px; margin-bottom:12px; cursor:pointer;">
        <summary style="font-weight:700; color:var(--text);">ప్రశ్న 1: అబ్‌స్ట్రాక్ట్ క్లాస్‌కు 'new' కీవర్డ్ ద్వారా నేరుగా ఆబ్జెక్ట్‌ను సృష్టించవచ్చా?</summary>
        <p style="margin-top:10px; color:var(--text2); line-height:1.7;">
          <strong>సమాధానం:</strong> సృష్టించలేము! అబ్‌స్ట్రాక్ట్ క్లాస్ అనేది అసంపూర్ణమైన నిర్మాణం కాబట్టి దానికి నేరుగా ఆబ్జెక్ట్ సృష్టి నిషేధించబడింది.
        </p>
      </details>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:12px 18px; margin-bottom:12px; cursor:pointer;">
        <summary style="font-weight:700; color:var(--text);">ప్రశ్న 2: అబ్‌స్ట్రాక్ట్ క్లాస్‌కు కన్‌స్ట్రక్టర్ ఉండవచ్చా?</summary>
        <p style="margin-top:10px; color:var(--text2); line-height:1.7;">
          <strong>సమాధానం:</strong> అవును, ఉండవచ్చు. సబ్‌క్లాస్ కన్‌స్ట్రక్టర్ <code>super(...)</code> ద్వారా దానిని పిలిచి పేరెంట్ ఫీల్డ్స్‌ను ప్రారంభించవచ్చు.
        </p>
      </details>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:12px 18px; margin-bottom:12px; cursor:pointer;">
        <summary style="font-weight:700; color:var(--text);">ప్రశ్న 3: ఇంటర్‌ఫేస్ లోపల డిక్లేర్ చేసిన ఫీల్డ్స్ సహజంగా ఎలాంటి మోడిఫైయర్లు కలిగి ఉంటాయి?</summary>
        <p style="margin-top:10px; color:var(--text2); line-height:1.7;">
          <strong>సమాధానం:</strong> అవి సహజంగానే <strong><code>public static final</code></strong> స్థిరరాశులు (Constants) గా ఉంటాయి.
        </p>
      </details>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:12px 18px; margin-bottom:12px; cursor:pointer;">
        <summary style="font-weight:700; color:var(--text);">ప్రశ్న 4: ఒక క్లాస్ బహుళ ఇంటర్‌ఫేస్‌లను ఒకేసారి అమలు (Implement) చేయవచ్చా?</summary>
        <p style="margin-top:10px; color:var(--text2); line-height:1.7;">
          <strong>సమాధానం:</strong> చేయవచ్చు! జావాలో ఇంటర్‌ఫేస్‌ల ద్వారా Multiple Inheritance సంపూర్ణంగా సాధ్యమవుతుంది.
        </p>
      </details>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:12px 18px; margin-bottom:12px; cursor:pointer;">
        <summary style="font-weight:700; color:var(--text);">ప్రశ్న 5: Java 8 లో ఇంటర్‌ఫేస్‌లకు 'default' మెథడ్స్ ఎందుకు ప్రవేశపెట్టబడ్డాయి?</summary>
        <p style="margin-top:10px; color:var(--text2); line-height:1.7;">
          <strong>సమాధానం:</strong> ఇప్పటికే ఉన్న పాత క్లాసులను బ్రేక్ చేయకుండా, ఇంటర్‌ఫేస్‌లకు కొత్త మెథడ్లను డిఫాల్ట్ బాడీతో సురక్షితంగా జోడించడానికి (Backward Compatibility).
        </p>
      </details>
    </div>

    <!-- NEXT / PREV NAVIGATION BUTTONS -->
    <div style="display:flex; justify-content:space-between; align-items:center; gap:16px; margin:48px 0 24px 0; flex-wrap:wrap;">
      <a href="/blog-java/18-java-polymorphism-method-overriding-dynamic-binding.html" style="background:var(--bg2); border:1px solid var(--border); color:var(--text); padding:12px 22px; border-radius:8px; text-decoration:none; font-weight:700; font-size:14px; display:inline-flex; align-items:center; gap:8px;">
        ← మునుపటి పాఠం: 18. Polymorphism &amp; Overriding
      </a>
      <a href="/blog-java/20-java-exception-handling-and-custom-exceptions.html" style="background:#facc15; border:1px solid #eab308; color:#121212; padding:12px 24px; border-radius:8px; text-decoration:none; font-weight:800; font-size:14px; display:inline-flex; align-items:center; gap:8px; box-shadow:0 2px 10px rgba(234, 179, 8, 0.25);">
        తర్వాతి పాఠం: 20. Exceptions &amp; Custom Errors →
      </a>
    </div>
  </main>
</div>

<script src="/site-nav.js"></script>
</body>
</html>`;

const outPath = path.join(__dirname, '..', 'public', 'blog-java', '19-java-abstract-classes-and-interfaces.html');
fs.writeFileSync(outPath, chapter19Content, 'utf8');

console.log('✅ Successfully generated Java Chapter 19 in exact JavaScript HTML style!');
console.log('Target file:', outPath);
console.log('Target file size:', chapter19Content.length, 'characters');
