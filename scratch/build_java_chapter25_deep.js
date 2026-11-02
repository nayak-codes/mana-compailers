const fs = require('fs');
const path = require('path');
const { LESSONS, buildJavaSidebar } = require('./java_curriculum_data.js');

const currentLesson = LESSONS.find(l => l.num === 25);

const chapter25Content = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Grand Finale: Real-World Java Capstone Project (ఎంటర్‌ప్రైజ్ బ్యాంకింగ్ ఇంజిన్) తెలుగులో — Java Tutorial | Our Compiler</title>
  <meta name="description" content="జావా 21+ మాస్టర్‌క్లాస్ గ్రాండ్ ఫినాలే: రియల్-వరల్డ్ 'NextGen Core Banking &amp; Transaction Ledger Engine' ప్రాజెక్ట్. OOP, Records, Custom Exceptions, Collections, Generics మరియు Streams తో పూర్తి స్థాయి ఎంటర్‌ప్రైజ్ సిస్టమ్." />
  <meta name="keywords" content="java capstone project telugu, real world java project telugu, java banking engine project, core banking system java telugu, java 21 enterprise project" />
  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />
  <link rel="icon" type="image/png" href="/logo.png" />
  <link rel="canonical" href="https://www.ourcompiler.com/blog-java/25-java-capstone-project.html" />
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

    function highlightJavaCode(rawCode) {
      const tokens = [];
      const pushToken = (cls, text) => {
        const id = tokens.length;
        tokens.push(\`<span class="\${cls}">\${text}</span>\`);
        return \`___JAVA_TOK_\${id}___\`;
      };

      let code = rawCode.replace(/(\\/\*[\s\S]*?\\*\/|\\/\\/.*$)/gm, m => pushToken('cm', m));
      code = code.replace(/("(?:[^"\\\\]|\\\\.)*"|'(?:[^'\\\\]|\\\\.)*')/g, m => pushToken('st', m));
      code = code.replace(/(@[a-zA-Z_][a-zA-Z0-9_]*)/g, m => pushToken('ann', m));

      const kwList = ['public','private','protected','class','interface','record','enum','static','final','void','return','if','else','switch','case','default','break','continue','for','while','do','try','catch','finally','throw','throws','new','this','super','extends','implements','import','package','synchronized','instanceof','abstract','transient','volatile','var','sealed','permits','yield','non-sealed'];
      const kwRegex = new RegExp(\`\\\\b(\${kwList.join('|')})\\\\b\`, 'g');
      code = code.replace(kwRegex, m => pushToken('kw', m));

      const typeList = ['String','int','double','float','long','boolean','char','byte','short','List','ArrayList','LinkedList','Set','HashSet','TreeSet','Map','HashMap','TreeMap','LinkedHashMap','Integer','Double','Boolean','Long','Object','System','Math','Arrays','Collections','Instant','UUID','Scanner','Iterator','ListIterator','Predicate','Function','Consumer','Supplier','Stream','Collectors','Exception','RuntimeException','Optional','DoubleSummaryStatistics','Thread','Runnable','Comparator','Objects','ConcurrentHashMap','CopyOnWriteArrayList','BigDecimal'];
      const typeRegex = new RegExp(\`\\\\b(\${typeList.join('|')})\\\\b\`, 'g');
      code = code.replace(typeRegex, m => pushToken('tp', m));

      code = code.replace(/\\b(\\d+(?:\\.\\d+)?(?:[fFdDlL])?)\\b/g, m => pushToken('nu', m));

      code = code.replace(/\\b([a-zA-Z_][a-zA-Z0-9_]*)\\s*(?=\\()/g, (m, fnName) => pushToken('fn', fnName));

      tokens.forEach((t, i) => {
        code = code.replace(\`___JAVA_TOK_\${i}___\`, t);
      });

      return code;
    }

    document.addEventListener('DOMContentLoaded', () => {
      document.querySelectorAll('.code-block code').forEach(codeEl => {
        if (!codeEl.innerHTML.includes('<span class=')) {
          codeEl.innerHTML = highlightJavaCode(codeEl.textContent);
        }
      });
    });

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

<div class="layout">
  ${buildJavaSidebar(25)}

  <!-- MAIN CONTENT -->
  <main class="content">
    <div class="breadcrumb">
      <a href="/">Home</a><span class="sep">›</span>
      <a href="/blog.html">Tutorials</a><span class="sep">›</span>
      <a href="/blog-java.html">Java</a><span class="sep">›</span>
      <span class="current">Lesson 25: Real-World Banking Capstone</span>
    </div>
    
    <!-- HEADER BADGES & META -->
    <div style="display:flex; gap:10px; align-items:center; flex-wrap:wrap; margin-bottom:16px;">
      <span style="background:#e0f2fe; color:#0369a1; border:1px solid #bae6fd; font-size:12.5px; font-weight:700; padding:4px 12px; border-radius:20px; display:inline-flex; align-items:center; gap:6px;">
        ☕ Java (Java 21+ LTS)
      </span>
      <span style="background:#ecfdf5; color:#047857; border:1px solid #a7f3d0; font-size:12.5px; font-weight:700; padding:4px 12px; border-radius:20px; display:inline-flex; align-items:center; gap:6px;">
        🟢 Lesson 25 of 25 (Grand Finale)
      </span>
      <span style="background:#fef3c7; color:#b45309; border:1px solid #fde68a; font-size:12.5px; font-weight:700; padding:4px 12px; border-radius:20px; display:inline-flex; align-items:center; gap:6px;">
        📂 Part 05: Collections &amp; Capstone (Page 5 of 5)
      </span>
      <span style="background:#f3e8ff; color:#7e22ce; border:1px solid #e9d5ff; font-size:12.5px; font-weight:700; padding:4px 12px; border-radius:20px; display:inline-flex; align-items:center; gap:6px;">
        ⏱️ 30 min read
      </span>
    </div>

    <!-- MAIN HEADING -->
    <h1 style="font-size:32px; font-weight:800; line-height:1.3; margin:0 0 16px 0; color:var(--text); letter-spacing:-0.5px;">
      Grand Finale: Real-World Java Capstone Project (ఎంటర్‌ప్రైజ్ బ్యాంకింగ్ ఇంజిన్ ఆర్కిటెక్చర్)
    </h1>

    <!-- SUBTOPICS PILL BAR -->
    <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; padding:12px 18px; margin-bottom:28px;">
      <div style="font-size:13.5px; font-weight:700; color:#475569; margin-bottom:4px;">
        📌 Covered in this lesson:
      </div>
      <div style="font-size:13px; line-height:1.6; color:#64748b;">
        Space Shuttle Launch Control &amp; RBI Core Banking Analogy · End-to-End Enterprise System Design · OOP Architecture &amp; SOLID Principles · Java 21 LTS Records &amp; Pattern Matching · Custom Checked &amp; Unchecked Banking Exceptions · Thread-Safe Ledger Storage (ConcurrentHashMap, CopyOnWriteArrayList) · Stream Analytics &amp; Real-Time Fraud Detection Pipeline · Live Telemetry &amp; Full System Execution
      </div>
    </div>

    <!-- WARM IVORY INTRO BOX (Strict JavaScript Masterclass Style) -->
    <div class="intro-box">
      <p style="margin:0 0 16px 0; font-size:15px; line-height:1.8; color:#1e293b;">
        స్వాగతం! మీరు ఆధునిక Java 21+ మాస్టర్‌క్లాస్ యొక్క అత్యున్నత శిఖరానికి చేరుకున్నారు. గత 24 అధ్యాయాలలో మనం నేర్చుకున్న ప్రతి ప్రాథమిక సూత్రం — JVM ఆర్కిటెక్చర్ మరియు మెమరీ మేనేజ్‌మెంట్ నుండి మొదలుకొని, OOP ఎన్‌క్యాప్సులేషన్, ఇన్హెరిటెన్స్, పాలిమార్ఫిజం, ఇంటర్‌ఫేస్‌లు, కస్టమ్ ఎక్సెప్షన్లు, Collections (List, Set, Map), Generics, మరియు Lambdas &amp; Stream API వరకు — అన్నీ ఇక్కడ ఒకే గూటికి చేరుతాయి. ఈ గ్రాండ్ ఫినాలే అధ్యాయంలో, మనం పుస్తకాల్లోని చిన్న చిన్న ఉదాహరణలను దాటి, రియల్-వరల్డ్ ఆర్బీఐ (RBI) లేదా వాల్ స్ట్రీట్ ప్రమాణాలతో కూడిన <strong>"NextGen Core Banking &amp; Financial Ledger Engine"</strong> ను మొదటి నుండి చివరి వరకు స్వయంగా నిర్మిస్తున్నాం!
      </p>

      <h4 style="margin:0 0 10px 0; color:#047857; font-size:16px; font-weight:800;">
        స్పేస్ షటిల్ లాంచ్ కంట్రోల్ &amp; ఆర్బీఐ కోర్ బ్యాంకింగ్ అనాలజీ (The Space Shuttle Launch Control &amp; RBI Core Banking Analogy):
      </h4>
      <ol style="margin:0; padding-left:22px; color:#334155; line-height:1.8; font-size:14.5px;">
        <li style="margin-bottom:8px;">
          <strong>1. The Capstone Symphony (వివిధ వాయిద్యాల మహోన్నత ఆర్కెస్ట్రా - Architectural Synergy):</strong> గత 24 పాఠాలలో మనం నేర్చుకున్న టెక్నాలజీలు ఒక ఆర్కెస్ట్రాలోని వేర్వేరు వాయిద్యాల లాంటివి (వయోలిన్, డ్రమ్స్, వేణువు). ఈ 25వ ఫినాలే ప్రాజెక్ట్‌లో మనం ఒక సమర్థవంతమైన మ్యూజిక్ కండక్టర్ లాగా వాటన్నింటినీ ఒకే తాళానికి సమన్వయం చేసి, ఒక క్లౌడ్-రెడీ ఎంటర్‌ప్రైజ్ బ్యాంకింగ్ ఇంజిన్‌ను ఆవిష్కరిస్తున్నాం!
        </li>
        <li style="margin-bottom:8px;">
          <strong>2. Atomic Financial Consistency (రైల్వే సిగ్నలింగ్ ట్రాక్ ఇంటర్‌లాకింగ్ వ్యవస్థ):</strong> ఒక రైలు ట్రాక్ మారుతున్నప్పుడు రెండు పట్టాల మధ్య ఎలాంటి లోపం జరగకూడదు. అలాగే బ్యాంకింగ్ సిస్టమ్‌లో కస్టమర్ A నుండి కస్టమర్ B ఖాతాకు ₹50,000 బదిలీ జరిగేటప్పుడు, రెండు ఖాతాలూ ఒకే సెకనులో పక్కాగా అప్‌డేట్ కావాలి (Atomic Transaction). నెట్‌వర్క్ ఫెయిల్యూర్ లేదా బ్యాలెన్స్ లోపం వస్తే కస్టమ్ బ్యాంకింగ్ ఎక్సెప్షన్ల ద్వారా లావాదేవీని సురక్షితంగా రద్దు (Rollback) చేయాలి.
        </li>
        <li style="margin-bottom:8px;">
          <strong>3. Stream-Powered Fraud Detection (ఎయిర్‌పోర్ట్ హై-స్పీడ్ లగేజ్ స్కానింగ్ బెల్ట్):</strong> వేగంగా ప్రవహించే వేలాది లావాదేవీల నడుమ హ్యాకర్ల మోసాలను, అక్రమ నగదు బదిలీలను క్షణంలో గుర్తించడానికి Stream API మరియు ఫంక్షనల్ ప్రెడికేట్లు విమానాశ్రయంలోని అధునాతన స్కానింగ్ మెషీన్‌లా పనిచేస్తాయి!
        </li>
      </ol>
      <p style="margin:14px 0 0 0; font-size:14px; font-weight:600; color:#0f766e;">
        🚀 ఈ పాఠంలో మీరు ఎంటర్‌ప్రైజ్ లెవల్ డొమైన్ మోడల్స్, అటామిక్ లెడ్జర్ బదిలీలు, మోసాల గుర్తింపు పైప్‌లైన్ మరియు లైవ్ టెలిమెట్రీని స్వయంగా ఎగ్జిక్యూట్ చేస్తారు!
      </p>
    </div>

    <!-- 3-COLUMN TABLE OF CONTENTS (TOC Card) -->
    <div class="toc-card" style="background:#ffffff; border:1px solid #e2e8f0; border-radius:12px; padding:24px; margin:32px 0; box-shadow:0 4px 16px rgba(0,0,0,0.03);">
      <h3 style="margin:0 0 16px 0; font-size:18px; font-weight:800; color:#0f172a; display:flex; align-items:center; gap:8px;">
        📑 పాఠ్యాంశ విషయ సూచిక (Table of Contents)
      </h3>
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:12px;">
        <div>
          <a href="#sec-1" style="color:#0284c7; text-decoration:none; font-size:14px; font-weight:600; display:block; padding:4px 0;">1. సిస్టమ్ ఆర్కిటెక్చర్ &amp; హై-లెవల్ డిజైన్</a>
          <a href="#sec-2" style="color:#0284c7; text-decoration:none; font-size:14px; font-weight:600; display:block; padding:4px 0;">2. Java 21 Records తో డొమైన్ మోడల్స్</a>
          <a href="#sec-3" style="color:#0284c7; text-decoration:none; font-size:14px; font-weight:600; display:block; padding:4px 0;">3. కస్టమ్ బ్యాంకింగ్ ఎక్సెప్షన్ల హైరార్కీ</a>
          <a href="#sec-4" style="color:#0284c7; text-decoration:none; font-size:14px; font-weight:600; display:block; padding:4px 0;">4. ప్రాక్టికల్ కోడ్: డొమైన్ &amp; ఎక్సెప్షన్స్</a>
        </div>
        <div>
          <a href="#sec-5" style="color:#0284c7; text-decoration:none; font-size:14px; font-weight:600; display:block; padding:4px 0;">5. థ్రెడ్-సేఫ్ అకౌంట్ లెడ్జర్ స్టోరేజ్</a>
          <a href="#sec-6" style="color:#0284c7; text-decoration:none; font-size:14px; font-weight:600; display:block; padding:4px 0;">6. స్ట్రీమ్ ఆధారిత ఫ్రాడ్ డిటెక్షన్ పైప్‌లైన్</a>
          <a href="#sec-7" style="color:#0284c7; text-decoration:none; font-size:14px; font-weight:600; display:block; padding:4px 0;">7. అటామిక్ ఫండ్ ట్రాన్స్‌ఫర్ అల్గారిథమ్</a>
          <a href="#sec-8" style="color:#0284c7; text-decoration:none; font-size:14px; font-weight:600; display:block; padding:4px 0;">8. ప్రాక్టికల్ కోడ్: ఫ్రాడ్ పైప్‌లైన్ బెంచ్‌మార్క్</a>
        </div>
        <div>
          <a href="#sec-9" style="color:#0284c7; text-decoration:none; font-size:14px; font-weight:600; display:block; padding:4px 0;">9. పూర్తి స్థాయి బ్యాంకింగ్ ఇంజిన్ ఆర్కిటెక్చర్</a>
          <a href="#sec-10" style="color:#0284c7; text-decoration:none; font-size:14px; font-weight:600; display:block; padding:4px 0;">10. క్యాప్‌స్టోన్ కోడ్: NextGenBankingEngine</a>
          <a href="#sec-11" style="color:#0284c7; text-decoration:none; font-size:14px; font-weight:600; display:block; padding:4px 0;">11. జావా 21+ ప్రొడక్షన్ బెస్ట్ ప్రాక్టీసెస్</a>
          <a href="#sec-12" style="color:#0284c7; text-decoration:none; font-size:14px; font-weight:600; display:block; padding:4px 0;">12. గ్రాండ్ ఫైనల్ మాస్టరీ క్విజ్</a>
        </div>
      </div>
    </div>

    <!-- SECTION 1 -->
    <section id="sec-1" style="margin-top:40px;">
      <h2 style="font-size:24px; font-weight:800; color:var(--text); border-bottom:2px solid #e2e8f0; padding-bottom:10px; margin-bottom:18px;">
        1. సిస్టమ్ ఆర్కిటెక్చర్ &amp; హై-లెవల్ డిజైన్ (Banking Engine Architecture)
      </h2>
      <p style="font-size:15px; line-height:1.8; color:var(--text); margin-bottom:16px;">
        ఒక ఆధునిక ఎంటర్‌ప్రైజ్ కోర్ బ్యాంకింగ్ ఇంజిన్ (Core Banking System) క్రింది 4 ముఖ్యమైన స్తంభాలపై నిర్మించబడుతుంది:
      </p>
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:16px; margin:24px 0;">
        <div style="background:#ffffff; border:1px solid #e2e8f0; border-top:4px solid #0284c7; padding:16px; border-radius:8px;">
          <h4 style="margin:0 0 8px 0; color:#0284c7; font-size:15px; font-weight:800;">1. Domain Layer</h4>
          <p style="margin:0; font-size:13.5px; line-height:1.6; color:#475569;">
            Java 21 ఇమ్యూటబుల్ రికార్డులతో కూడిన కస్టమర్లు, బ్యాంక్ ఖాతాలు, మరియు లావాదేవీల రికార్డులు.
          </p>
        </div>
        <div style="background:#ffffff; border:1px solid #e2e8f0; border-top:4px solid #16a34a; padding:16px; border-radius:8px;">
          <h4 style="margin:0 0 8px 0; color:#16a34a; font-size:15px; font-weight:800;">2. Storage &amp; Ledger</h4>
          <p style="margin:0; font-size:13.5px; line-height:1.6; color:#475569;">
            O(1) అకౌంట్ లుకప్ కోసం ConcurrentHashMap మరియు యునిక్ KYC వివరాల కోసం Set కలెక్షన్స్.
          </p>
        </div>
        <div style="background:#ffffff; border:1px solid #e2e8f0; border-top:4px solid #d97706; padding:16px; border-radius:8px;">
          <h4 style="margin:0 0 8px 0; color:#d97706; font-size:15px; font-weight:800;">3. Fraud Pipeline</h4>
          <p style="margin:0; font-size:13.5px; line-height:1.6; color:#475569;">
            Stream API మరియు ఫంక్షనల్ ప్రెడికేట్ల ద్వారా అనుమానాస్పద లావాదేవీలను రియల్-టైమ్‌లో గుర్తించడం.
          </p>
        </div>
        <div style="background:#ffffff; border:1px solid #e2e8f0; border-top:4px solid #9333ea; padding:16px; border-radius:8px;">
          <h4 style="margin:0 0 8px 0; color:#9333ea; font-size:15px; font-weight:800;">4. Audit &amp; Telemetry</h4>
          <p style="margin:0; font-size:13.5px; line-height:1.6; color:#475569;">
            రెగ్యులేటరీ ఆర్బీఐ నిబంధనల ప్రకారం ప్రతి ట్రాన్స్‌ఫర్ లావాదేవీని టైమ్‌స్టాంప్‌తో శాశ్వతంగా లాగ్ చేయడం.
          </p>
        </div>
      </div>
    </section>

    <!-- SECTION 2 -->
    <section id="sec-2" style="margin-top:40px;">
      <h2 style="font-size:24px; font-weight:800; color:var(--text); border-bottom:2px solid #e2e8f0; padding-bottom:10px; margin-bottom:18px;">
        2. Java 21 Records తో డొమైన్ మోడల్స్ (Immutable Domain Models)
      </h2>
      <p style="font-size:15px; line-height:1.8; color:var(--text); margin-bottom:16px;">
        బ్యాంకింగ్ రంగంలో లావాదేవీల రికార్డులను ఎట్టి పరిస్థితుల్లోనూ సృష్టించిన తర్వాత మార్చడానికి వీలుండకూడదు (Audit Immutability). Java 16 లో అధికారికంగా వచ్చి Java 21 లో మరింత పటిష్టమైన <strong>Record</strong> కాన్సెప్ట్ దీనికి సరిగ్గా సరిపోతుంది.
      </p>
      <div style="background:#f8fafc; border:1px solid #cbd5e1; border-left:4px solid #0284c7; padding:16px; border-radius:6px; margin:20px 0; font-family:'JetBrains Mono', monospace; font-size:13.5px; color:#0f172a;">
        public record TransactionRecord(<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;String txnId,<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;String sourceAccount,<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;String targetAccount,<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;double amount,<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;TransactionStatus status,<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;Instant timestamp<br/>
        ) {}
      </div>
    </section>

    <!-- SECTION 3 -->
    <section id="sec-3" style="margin-top:40px;">
      <h2 style="font-size:24px; font-weight:800; color:var(--text); border-bottom:2px solid #e2e8f0; padding-bottom:10px; margin-bottom:18px;">
        3. కస్టమ్ బ్యాంకింగ్ ఎక్సెప్షన్ల హైరార్కీ (Banking Exceptions Hierarchy)
      </h2>
      <p style="font-size:15px; line-height:1.8; color:var(--text); margin-bottom:16px;">
        ఒక ప్రొఫెషనల్ సిస్టమ్‌లో సాధారణ <code>RuntimeException</code> ని విసిరి చేతులు దులుపుకోకూడదు. బ్యాంకింగ్ నిబంధనల ప్రకారం స్పష్టమైన ఎర్రర్ కోడ్స్ మరియు వివరణలతో కూడిన కస్టమ్ ఎక్సెప్షన్లను డిజైన్ చేయాలి:
      </p>
      <ul style="margin:0; padding-left:24px; font-size:14.5px; color:var(--text); line-height:1.8; margin-bottom:20px;">
        <li><code>BankingCoreException</code>: అన్ని బ్యాంకింగ్ ఎర్రర్లకు మూలమైన బేస్ ఎక్సెప్షన్.</li>
        <li><code>InsufficientBalanceException</code>: ఖాతాలో సరిపడా నిధులు లేనప్పుడు విసరబడుతుంది.</li>
        <li><code>AccountNotFoundException</code>: తప్పుడు అకౌంట్ నంబర్‌ను ఎంటర్ చేసినప్పుడు.</li>
        <li><code>FraudulentTransactionException</code>: అనుమానాస్పద లావాదేవీలు లేదా బ్లాక్‌లిస్ట్ చేయబడిన ఖాతాలు గుర్తించినప్పుడు.</li>
      </ul>
    </section>

    <!-- SECTION 4: CODE BLOCK 1 -->
    <section id="sec-4" style="margin-top:40px;">
      <h2 style="font-size:24px; font-weight:800; color:var(--text); border-bottom:2px solid #e2e8f0; padding-bottom:10px; margin-bottom:18px;">
        4. ప్రాక్టికల్ కోడ్: డొమైన్ మోడల్స్ &amp; ఎక్సెప్షన్స్ ఆర్కిటెక్చర్
      </h2>
      <p style="font-size:15px; line-height:1.8; color:var(--text); margin-bottom:16px;">
        క్రింది జావా ప్రోగ్రామ్‌లో డొమైన్ రికార్డులు, ఖాతా స్థితిగతులు, మరియు కస్టమ్ ఎక్సెప్షన్ల క్లాస్ హైరార్కీని స్వయంగా చూడండి.
      </p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">☕ Java — CoreBankingDomainAndExceptions.java</span>
          <div class="code-actions" style="display:flex; gap:8px;">
            <button class="copy-btn" onclick="copyCodeSnippet(this)" style="background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.2); color:#ffffff; border-radius:6px; padding:4px 10px; font-size:11px; font-weight:600; cursor:pointer;">📋 Copy Code</button>
            <button class="run-btn" onclick="runInJavaCompiler(this)" style="background:#047857; border:none; color:#ffffff; border-radius:6px; padding:4px 12px; font-size:11px; font-weight:700; cursor:pointer;">▶ Run in Java Compiler</button>
          </div>
        </div>
        <pre><code class="language-java">import java.time.Instant;
import java.util.*;

public class CoreBankingDomainAndExceptions {

    // 1. Transaction &amp; Account Status Enums
    public enum AccountStatus { ACTIVE, FROZEN, CLOSED }
    public enum TxnStatus { SUCCESS, FAILED, FLAGGED_FOR_FRAUD }

    // 2. Custom Banking Exceptions Hierarchy
    public static class BankingCoreException extends Exception {
        private final String errorCode;
        public BankingCoreException(String errorCode, String message) {
            super(message);
            this.errorCode = errorCode;
        }
        public String getErrorCode() { return errorCode; }
    }

    public static class InsufficientBalanceException extends BankingCoreException {
        public InsufficientBalanceException(String accNo, double balance, double reqAmount) {
            super("ERR_INSUFFICIENT_FUNDS", 
                String.format("ఖాతా %s లో నిధులు సరిపోవు! ప్రస్తుత నిల్వ: ₹%,.2f | అవసరమైన మొత్తం: ₹%,.2f", 
                accNo, balance, reqAmount));
        }
    }

    public static class AccountNotFoundException extends BankingCoreException {
        public AccountNotFoundException(String accNo) {
            super("ERR_ACCOUNT_NOT_FOUND", "చెల్లని ఖాతా సంఖ్య: " + accNo);
        }
    }

    // 3. Domain Model: Immutable Java 21 Record for Account
    public record BankAccount(
        String accountNumber,
        String holderName,
        double balance,
        AccountStatus status,
        Instant createdDate
    ) {
        // Compact Constructor: ఇన్వేరియంట్ వాలిడేషన్స్
        public BankAccount {
            Objects.requireNonNull(accountNumber, "అకౌంట్ నంబర్ తప్పనిసరి");
            Objects.requireNonNull(holderName, "ఖాతాదారుని పేరు తప్పనిసరి");
            if (balance &lt; 0) {
                throw new IllegalArgumentException("ప్రారంభ నిల్వ రుణాత్మకం (Negative) కాకూడదు!");
            }
        }
    }

    public static void main(String[] args) {
        System.out.println("=== 1. DOMAIN &amp; EXCEPTION ARCHITECTURE TEST ===");
        
        BankAccount sampleAcc = new BankAccount("ACC-9001", "Balaji Coding Academy", 150000.0, AccountStatus.ACTIVE, Instant.now());
        System.out.println("నమోదు చేయబడిన ఖాతా: " + sampleAcc);

        // Exception Simulation
        try {
            double transferAmount = 200000.0;
            if (sampleAcc.balance() &lt; transferAmount) {
                throw new InsufficientBalanceException(sampleAcc.accountNumber(), sampleAcc.balance(), transferAmount);
            }
        } catch (InsufficientBalanceException e) {
            System.err.println("\n❌ [CAUGHT EXPECTED BANKING ERROR]");
            System.err.println("  Error Code: " + e.getErrorCode());
            System.err.println("  Details   : " + e.getMessage());
        }
    }
}</code></pre>
      </div>

      <div class="code-output-card">
        <div class="output-header">💻 కన్సోల్ అవుట్‌పుట్ (Program Terminal Output):</div>
        <pre class="output-content">=== 1. DOMAIN &amp; EXCEPTION ARCHITECTURE TEST ===
నమోదు చేయబడిన ఖాతా: BankAccount[accountNumber=ACC-9001, holderName=Balaji Coding Academy, balance=150000.0, status=ACTIVE, createdDate=2026-11-02T12:00:00Z]

❌ [CAUGHT EXPECTED BANKING ERROR]
  Error Code: ERR_INSUFFICIENT_FUNDS
  Details   : ఖాతా ACC-9001 లో నిధులు సరిపోవు! ప్రస్తుత నిల్వ: ₹150,000.00 | అవసరమైన మొత్తం: ₹200,000.00</pre>
      </div>
    </section>

    <!-- SECTION 5 & 6 -->
    <section id="sec-5" style="margin-top:40px;">
      <h2 style="font-size:24px; font-weight:800; color:var(--text); border-bottom:2px solid #e2e8f0; padding-bottom:10px; margin-bottom:18px;">
        5. థ్రెడ్-సేఫ్ అకౌంట్ లెడ్జర్ స్టోరేజ్ (Thread-Safe Ledger Storage)
      </h2>
      <p style="font-size:15px; line-height:1.8; color:var(--text); margin-bottom:16px;">
        బ్యాంకింగ్ సర్వర్‌లలో ఒకే సమయంలో లక్షలాది మంది వినియోగదారులు లావాదేవీలు నిర్వహిస్తుంటారు. సాధారణ <code>HashMap</code> ను వాడితే డేటా కరప్ట్ అయ్యే ప్రమాదం ఉంది. అందుకే మనం <strong>ConcurrentHashMap</strong> ను లెడ్జర్ స్టోరేజ్‌గా ఉపయోగిస్తాము. ఇది బకెట్-లెవల్ లాకింగ్ (Lock Striping) ద్వారా పూర్తి థ్రెడ్-సేఫ్టీని అందిస్తుంది.
      </p>
    </section>

    <section id="sec-6" style="margin-top:40px;">
      <h2 style="font-size:24px; font-weight:800; color:var(--text); border-bottom:2px solid #e2e8f0; padding-bottom:10px; margin-bottom:18px;">
        6. స్ట్రీమ్ ఆధారిత ఫ్రాడ్ డిటెక్షన్ పైప్‌లైన్ (Real-Time Fraud Detection)
      </h2>
      <p style="font-size:15px; line-height:1.8; color:var(--text); margin-bottom:16px;">
        భారతీయ రిజర్వ్ బ్యాంక్ (RBI) మార్గదర్శకాల ప్రకారం, క్రింది నియమాలను ఉల్లంఘించే లావాదేవీలను వెంటనే ఫ్రాడ్ అలర్ట్‌గా గుర్తించాలి:
      </p>
      <div style="background:#fffbeb; border:1px solid #fde68a; border-left:4px solid #d97706; padding:16px; border-radius:6px; margin:20px 0;">
        <h4 style="margin:0 0 8px 0; color:#b45309; font-size:15px; font-weight:800;">🛡️ ఫ్రాడ్ డిటెక్షన్ రూల్స్ (Functional Predicates):</h4>
        <ol style="margin:0; padding-left:20px; font-size:14px; color:#78350f; line-height:1.7;">
          <li><strong>Rule 1: High Single Transfer Limit:</strong> సింగిల్ లావాదేవీ మొత్తం ₹2,00,000 దాటితే సీనియర్ మేనేజర్ ఆడిట్ అవసరం.</li>
          <li><strong>Rule 2: Blacklisted Accounts Check:</strong> సెక్యూరిటీ ఏజెన్సీలు బ్లాక్‌లిస్ట్ చేసిన ఖాతా నంబర్లకు నిధుల బదిలీని తక్షణమే తిరస్కరించాలి.</li>
          <li><strong>Rule 3: Dormant/Frozen Account Alert:</strong> ఫ్రోజెన్ స్థితిలో ఉన్న ఖాతాల నుండి డెబిట్ ఆపరేషన్లు పూర్తిగా నిషిద్ధం.</li>
        </ol>
      </div>
    </section>

    <!-- SECTION 7 & 8: CODE BLOCK 2 -->
    <section id="sec-7" style="margin-top:40px;">
      <h2 style="font-size:24px; font-weight:800; color:var(--text); border-bottom:2px solid #e2e8f0; padding-bottom:10px; margin-bottom:18px;">
        7. అటామిక్ ఫండ్ ట్రాన్స్‌ఫర్ అల్గారిథమ్ (Atomic Consistency)
      </h2>
      <p style="font-size:15px; line-height:1.8; color:var(--text); margin-bottom:16px;">
        లావాదేవీ సమయంలో డెబిట్ మరియు క్రెడిట్ రెండూ పూర్తి కావాలి, లేదా ఏదీ కాకూడదు (All-or-Nothing). ఇందుకోసం జావా సింక్రొనైజేషన్ లేదా రీఎంట్రెంట్ లాకింగ్ మెకానిజాన్ని ఉపయోగిస్తాం.
      </p>
    </section>

    <section id="sec-8" style="margin-top:40px;">
      <h2 style="font-size:24px; font-weight:800; color:var(--text); border-bottom:2px solid #e2e8f0; padding-bottom:10px; margin-bottom:18px;">
        8. ప్రాక్టికల్ కోడ్: Fraud Detection &amp; Stream Pipeline Benchmark
      </h2>
      <p style="font-size:15px; line-height:1.8; color:var(--text); margin-bottom:16px;">
        క్రింది జావా ప్రోగ్రామ్‌లో స్ట్రీమ్స్ ద్వారా బ్యాంకింగ్ లావాదేవీలలో మోసాలను గుర్తించడం మరియు ఆడిట్ లాగ్ సమ్మరైజేషన్ ఎలా జరుగుతుందో స్వయంగా చూడండి.
      </p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">☕ Java — FraudDetectionAndTransactionPipeline.java</span>
          <div class="code-actions" style="display:flex; gap:8px;">
            <button class="copy-btn" onclick="copyCodeSnippet(this)" style="background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.2); color:#ffffff; border-radius:6px; padding:4px 10px; font-size:11px; font-weight:600; cursor:pointer;">📋 Copy Code</button>
            <button class="run-btn" onclick="runInJavaCompiler(this)" style="background:#047857; border:none; color:#ffffff; border-radius:6px; padding:4px 12px; font-size:11px; font-weight:700; cursor:pointer;">▶ Run in Java Compiler</button>
          </div>
        </div>
        <pre><code class="language-java">import java.time.Instant;
import java.util.*;
import java.util.function.Predicate;

public class FraudDetectionAndTransactionPipeline {

    public record AuditTxn(
        String txnId,
        String sender,
        String receiver,
        double amount,
        boolean isFlagged,
        Instant timestamp
    ) {}

    public static void main(String[] args) {
        System.out.println("=== REAL-TIME BANKING FRAUD DETECTION PIPELINE ===");

        // బ్లాక్‌లిస్ట్ చేయబడిన ఖాతాల సెట్ (O(1) శోధన కోసం HashSet)
        Set&lt;String&gt; blacklistedAccounts = Set.of("ACC-FRAUD-01", "ACC-SCAM-99");

        // ఇన్కమింగ్ లైవ్ ట్రాన్స్‌ఫర్ అభ్యర్థనలు
        List&lt;AuditTxn&gt; incomingTraffic = List.of(
            new AuditTxn("TXN-1001", "ACC-101", "ACC-202", 45000, false, Instant.now()),
            new AuditTxn("TXN-1002", "ACC-101", "ACC-FRAUD-01", 12000, false, Instant.now()), // బ్లాక్‌లిస్ట్ రిసీవర్!
            new AuditTxn("TXN-1003", "ACC-303", "ACC-404", 350000, false, Instant.now()), // భారీ మొత్తం!
            new AuditTxn("TXN-1004", "ACC-SCAM-99", "ACC-505", 8000, false, Instant.now()), // బ్లాక్‌లిస్ట్ సెండర్!
            new AuditTxn("TXN-1005", "ACC-202", "ACC-303", 95000, false, Instant.now())
        );

        // 1. ఫ్రాడ్ ప్రెడికేట్ లాంబ్డా సూత్రం
        Predicate&lt;AuditTxn&gt; isSuspicious = txn -&gt; 
            txn.amount() &gt;= 200000 || 
            blacklistedAccounts.contains(txn.sender()) || 
            blacklistedAccounts.contains(txn.receiver());

        System.out.println("మొత్తం ఇన్కమింగ్ లావాదేవీలు: " + incomingTraffic.size());

        // 2. స్ట్రీమ్ ద్వారా అనుమానాస్పద లావాదేవీల వడపోత
        List&lt;AuditTxn&gt; flaggedTxns = incomingTraffic.stream()
            .filter(isSuspicious)
            .toList();

        System.out.println("\n🚨 --- FLAGGED SUSPICIOUS TRANSACTIONS (" + flaggedTxns.size() + ") ---");
        for (AuditTxn t : flaggedTxns) {
            String reason = t.amount() &gt;= 200000 ? "HIGH_VALUE_THRESHOLD" : "BLACKLISTED_ACCOUNT_INTERACTION";
            System.out.printf("  [FLAGGED] ID: %-8s | ₹%,10.2f | From: %-12s To: %-12s | Reason: %s%n",
                t.txnId(), t.amount(), t.sender(), t.receiver(), reason);
        }

        // 3. సురక్షితమైన ఆమోదిత లావాదేవీల మొత్తం విలువ
        double approvedTurnover = incomingTraffic.stream()
            .filter(isSuspicious.negate())
            .mapToDouble(AuditTxn::amount)
            .sum();

        System.out.printf("\n✅ సురక్షితమైన ఆమోదిత లావాదేవీల మొత్తం: ₹%,.2f%n", approvedTurnover);
    }
}</code></pre>
      </div>

      <div class="code-output-card">
        <div class="output-header">💻 కన్సోల్ అవుట్‌పుట్ (Program Terminal Output):</div>
        <pre class="output-content">=== REAL-TIME BANKING FRAUD DETECTION PIPELINE ===
మొత్తం ఇన్కమింగ్ లావాదేవీలు: 5

🚨 --- FLAGGED SUSPICIOUS TRANSACTIONS (3) ---
  [FLAGGED] ID: TXN-1002 | ₹ 12,000.00 | From: ACC-101      To: ACC-FRAUD-01 | Reason: BLACKLISTED_ACCOUNT_INTERACTION
  [FLAGGED] ID: TXN-1003 | ₹350,000.00 | From: ACC-303      To: ACC-404      | Reason: HIGH_VALUE_THRESHOLD
  [FLAGGED] ID: TXN-1004 | ₹  8,000.00 | From: ACC-SCAM-99  To: ACC-505      | Reason: BLACKLISTED_ACCOUNT_INTERACTION

✅ సురక్షితమైన ఆమోదిత లావాదేవీల మొత్తం: ₹140,000.00</pre>
      </div>
    </section>

    <!-- SECTION 9 & 10: CAPSTONE ENGINE -->
    <section id="sec-9" style="margin-top:40px;">
      <h2 style="font-size:24px; font-weight:800; color:var(--text); border-bottom:2px solid #e2e8f0; padding-bottom:10px; margin-bottom:18px;">
        9. పూర్తి స్థాయి బ్యాంకింగ్ ఇంజిన్ ఆర్కిటెక్చర్ (Engine Overview)
      </h2>
      <p style="font-size:15px; line-height:1.8; color:var(--text); margin-bottom:16px;">
        ఇప్పుడు మనం అన్ని కాన్సెప్టులను ఏకం చేసి <strong>NextGenEnterpriseBankingEngine</strong> ను రూపొందిస్తున్నాం. ఇది ఒక లైవ్ సర్వర్ లాగా పనిచేస్తుంది:
      </p>
      <ul style="margin:0; padding-left:24px; font-size:14.5px; color:var(--text); line-height:1.8; margin-bottom:20px;">
        <li>ఖాతాలను సృష్టించడం మరియు ప్రారంభ డిపాజిట్లు.</li>
        <li>కస్టమ్ బ్యాంకింగ్ ఎక్సెప్షన్లతో కూడిన అటామిక్ ఫండ్ ట్రాన్స్‌ఫర్లు.</li>
        <li>లైవ్ ఆడిట్ లెడ్జర్ మరియు స్ట్రీమ్ అనలిటిక్స్ రిపోర్టింగ్.</li>
      </ul>
    </section>

    <section id="sec-10" style="margin-top:40px;">
      <h2 style="font-size:24px; font-weight:800; color:var(--text); border-bottom:2px solid #e2e8f0; padding-bottom:10px; margin-bottom:18px;">
        10. క్యాప్‌స్టోన్ కోడ్: NextGenEnterpriseBankingEngine
      </h2>
      <p style="font-size:15px; line-height:1.8; color:var(--text); margin-bottom:16px;">
        ఈ సమగ్ర జావా అప్లికేషన్ 100% ఎగ్జిక్యూటబుల్ మరియు పరిశ్రమ ప్రమాణాలకు అనుగుణంగా రూపొందించబడింది. రన్ చేసి లైవ్ కన్సోల్ అవుట్‌పుట్‌ను పరిశీలించండి:
      </p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">☕ Java — NextGenEnterpriseBankingEngine.java</span>
          <div class="code-actions" style="display:flex; gap:8px;">
            <button class="copy-btn" onclick="copyCodeSnippet(this)" style="background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.2); color:#ffffff; border-radius:6px; padding:4px 10px; font-size:11px; font-weight:600; cursor:pointer;">📋 Copy Code</button>
            <button class="run-btn" onclick="runInJavaCompiler(this)" style="background:#047857; border:none; color:#ffffff; border-radius:6px; padding:4px 12px; font-size:11px; font-weight:700; cursor:pointer;">▶ Run in Java Compiler</button>
          </div>
        </div>
        <pre><code class="language-java">import java.time.Instant;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.stream.Collectors;

public class NextGenEnterpriseBankingEngine {

    // --- DOMAIN ENUMS &amp; RECORDS (Java 21) ---
    public enum AccountStatus { ACTIVE, FROZEN, CLOSED }
    public enum TxnType { DEPOSIT, WITHDRAWAL, TRANSFER }

    public record Account(
        String accountNumber,
        String customerName,
        double balance,
        AccountStatus status
    ) {
        public Account withBalance(double newBalance) {
            return new Account(accountNumber, customerName, newBalance, status);
        }
    }

    public record Transaction(
        String txnId,
        String fromAcc,
        String toAcc,
        double amount,
        TxnType type,
        Instant timestamp
    ) {}

    // --- CUSTOM EXCEPTIONS ---
    public static class CoreBankingException extends Exception {
        public CoreBankingException(String msg) { super(msg); }
    }
    public static class InsufficientFundsException extends CoreBankingException {
        public InsufficientFundsException(String msg) { super(msg); }
    }
    public static class InvalidAccountException extends CoreBankingException {
        public InvalidAccountException(String msg) { super(msg); }
    }

    // --- CORE ENGINE IMPLEMENTATION ---
    public static class BankLedgerSystem {
        private final Map&lt;String, Account&gt; accounts = new ConcurrentHashMap&lt;&gt;();
        private final List&lt;Transaction&gt; auditLog = new CopyOnWriteArrayList&lt;&gt;();
        private final Set&lt;String&gt; blacklistedAccounts = ConcurrentHashMap.newKeySet();

        public BankLedgerSystem() {
            blacklistedAccounts.add("ACC-ROGUE-99");
        }

        public void openAccount(String accNo, String name, double initialDeposit) {
            accounts.put(accNo, new Account(accNo, name, initialDeposit, AccountStatus.ACTIVE));
            System.out.printf("🏦 [ACCOUNT OPENED] %s | Name: %-15s | Bal: ₹%,.2f%n", accNo, name, initialDeposit);
        }

        // అటామిక్ ఫండ్ ట్రాన్స్‌ఫర్ మెథడ్
        public synchronized void transferFunds(String fromAccNo, String toAccNo, double amount) 
                throws CoreBankingException {
            
            // 1. అకౌంట్ ధృవీకరణ
            Account sender = accounts.get(fromAccNo);
            Account receiver = accounts.get(toAccNo);

            if (sender == null) throw new InvalidAccountException("పంపే ఖాతా ఉనికిలో లేదు: " + fromAccNo);
            if (receiver == null) throw new InvalidAccountException("స్వీకరించే ఖాతా ఉనికిలో లేదు: " + toAccNo);

            // 2. సెక్యూరిటీ &amp; ఫ్రాడ్ చెక్
            if (blacklistedAccounts.contains(fromAccNo) || blacklistedAccounts.contains(toAccNo)) {
                throw new CoreBankingException("🚨 భద్రతా హెచ్చరిక! బ్లాక్‌లిస్ట్ చేయబడిన ఖాతాతో లావాదేవీ నిలిపివేయబడింది!");
            }

            if (sender.status() != AccountStatus.ACTIVE) {
                throw new CoreBankingException("ఖాతా " + fromAccNo + " యాక్టివ్‌గా లేదు!");
            }

            // 3. నిధుల లభ్యత చెక్
            if (sender.balance() &lt; amount) {
                throw new InsufficientFundsException(
                    String.format("ఖాతా %s లో నిధులు సరిపోవు! నిల్వ: ₹%,.2f, కోరినది: ₹%,.2f", 
                    fromAccNo, sender.balance(), amount));
            }

            // 4. అటామిక్ బ్యాలెన్స్ అప్‌డేట్
            accounts.put(fromAccNo, sender.withBalance(sender.balance() - amount));
            accounts.put(toAccNo, receiver.withBalance(receiver.balance() + amount));

            // 5. ఆడిట్ లాగ్‌లో రికార్డ్ చేయడం
            String txnId = "TXN-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
            auditLog.add(new Transaction(txnId, fromAccNo, toAccNo, amount, TxnType.TRANSFER, Instant.now()));

            System.out.printf("✅ [TRANSFER SUCCESS] %s ➔ %s : ₹%,.2f | Ref: %s%n", 
                fromAccNo, toAccNo, amount, txnId);
        }

        // Stream Analytics: రియల్-టైమ్ సమ్మరీ రిపోర్ట్
        public void generateAnalyticsReport() {
            System.out.println("\n📊 ================= CORE BANKING LIVE TELEMETRY =================");
            System.out.println("మొత్తం రిజిస్టర్డ్ ఖాతాలు: " + accounts.size());
            System.out.println("మొత్తం విజయవంతమైన లావాదేవీలు: " + auditLog.size());

            // 1. బ్యాంక్ వద్ద ఉన్న మొత్తం డిపాజిట్లు
            double totalBankDeposits = accounts.values().stream()
                .mapToDouble(Account::balance)
                .sum();
            System.out.printf("బ్యాంకు వద్ద ఉన్న మొత్తం కస్టమర్ డిపాజిట్లు: ₹%,.2f%n", totalBankDeposits);

            // 2. అత్యధిక బ్యాలెన్స్ గల టాప్ ఖాతాదారుడు
            accounts.values().stream()
                .max(Comparator.comparingDouble(Account::balance))
                .ifPresent(top -&gt; System.out.printf("అత్యధిక డిపాజిట్ ఉన్న కస్టమర్: %s (₹%,.2f)%n", 
                    top.customerName(), top.balance()));

            // 3. ఆడిట్ లాగ్ సారాంశం
            double totalTurnover = auditLog.stream()
                .mapToDouble(Transaction::amount)
                .sum();
            System.out.printf("నేటి మొత్తం లావాదేవీల వాల్యూమ్ (Turnover): ₹%,.2f%n", totalTurnover);
            System.out.println("==================================================================");
        }
    }

    public static void main(String[] args) {
        System.out.println("🚀 INITIALIZING NEXTGEN BANKING ENGINE (Java 21 LTS Capstone)...");
        BankLedgerSystem bank = new BankLedgerSystem();

        // ఖాతాల నమోదు
        bank.openAccount("ACC-101", "Balaji Technologies", 500000.0);
        bank.openAccount("ACC-102", "Anand Telecom", 120000.0);
        bank.openAccount("ACC-103", "Kavitha Enterprises", 350000.0);

        System.out.println("\n--- 1. PROCESSING ATOMIC TRANSFERS ---");
        try {
            bank.transferFunds("ACC-101", "ACC-102", 75000.0);
            bank.transferFunds("ACC-103", "ACC-101", 50000.0);
            // వైఫల్య దృశ్యం 1: సరిపోని నిధులు
            bank.transferFunds("ACC-102", "ACC-103", 900000.0);
        } catch (CoreBankingException e) {
            System.err.println("❌ [REJECTED TRANSACTION]: " + e.getMessage());
        }

        // లైవ్ ఎనలిటిక్స్ రిపోర్ట్ జనరేట్ చేయడం
        bank.generateAnalyticsReport();
    }
}</code></pre>
      </div>

      <div class="code-output-card">
        <div class="output-header">💻 కన్సోల్ అవుట్‌పుట్ (Program Terminal Output):</div>
        <pre class="output-content">🚀 INITIALIZING NEXTGEN BANKING ENGINE (Java 21 LTS Capstone)...
🏦 [ACCOUNT OPENED] ACC-101 | Name: Balaji Technologies | Bal: ₹500,000.00
🏦 [ACCOUNT OPENED] ACC-102 | Name: Anand Telecom   | Bal: ₹120,000.00
🏦 [ACCOUNT OPENED] ACC-103 | Name: Kavitha Enterprises | Bal: ₹350,000.00

--- 1. PROCESSING ATOMIC TRANSFERS ---
✅ [TRANSFER SUCCESS] ACC-101 ➔ ACC-102 : ₹75,000.00 | Ref: TXN-4C1E9A20
✅ [TRANSFER SUCCESS] ACC-103 ➔ ACC-101 : ₹50,000.00 | Ref: TXN-8F0D3B15
❌ [REJECTED TRANSACTION]: ఖాతా ACC-102 లో నిధులు సరిపోవు! నిల్వ: ₹195,000.00, కోరినది: ₹900,000.00

📊 ================= CORE BANKING LIVE TELEMETRY =================
మొత్తం రిజిస్టర్డ్ ఖాతాలు: 3
మొత్తం విజయవంతమైన లావాదేవీలు: 2
బ్యాంకు వద్ద ఉన్న మొత్తం కస్టమర్ డిపాజిట్లు: ₹970,000.00
అత్యధిక డిపాజిట్ ఉన్న కస్టమర్: Balaji Technologies (₹475,000.00)
నేటి మొత్తం లావాదేవీల వాల్యూమ్ (Turnover): ₹125,000.00
==================================================================</pre>
      </div>
    </section>

    <!-- SECTION 11 -->
    <section id="sec-11" style="margin-top:40px;">
      <h2 style="font-size:24px; font-weight:800; color:var(--text); border-bottom:2px solid #e2e8f0; padding-bottom:10px; margin-bottom:18px;">
        11. జావా 21+ ప్రొడక్షన్ బెస్ట్ ప్రాక్టీసెస్ (5 Enterprise Best Practices)
      </h2>
      <div style="display:flex; flex-direction:column; gap:16px;">
        <div style="background:#ffffff; border:1px solid #fed7aa; border-left:5px solid #f97316; padding:16px; border-radius:8px;">
          <h4 style="margin:0 0 6px 0; color:#c2410c; font-size:15px; font-weight:800;">1. Embrace Immutability with Records</h4>
          <p style="margin:0; font-size:14px; line-height:1.7; color:#334155;">
            DTOs, Events, మరియు Value Objects కోసం పాత బోరింగ్ జావా బీన్స్ (Getters/Setters) బదులుగా ఎల్లప్పుడూ <strong>Java 21 Records</strong> ని వాడండి. ఇవి బై-డిఫాల్ట్ థ్రెడ్-సేఫ్ మరియు కన్సైజ్.
          </p>
        </div>

        <div style="background:#ffffff; border:1px solid #fed7aa; border-left:5px solid #f97316; padding:16px; border-radius:8px;">
          <h4 style="margin:0 0 6px 0; color:#c2410c; font-size:15px; font-weight:800;">2. ConcurrentHashMap over Synchronized Map</h4>
          <p style="margin:0; font-size:14px; line-height:1.7; color:#334155;">
            మల్టీ-థ్రెడెడ్ క్యాషింగ్ లేదా లెడ్జర్ నిర్వహణకు <code>Collections.synchronizedMap()</code> లేదా <code>Hashtable</code> లాంటి పాత టెక్నాలజీలను వాడకండి. <code>ConcurrentHashMap</code> లాక్ స్ట్రైపింగ్ ద్వారా అద్భుతమైన స్కేలబిలిటీని ఇస్తుంది.
          </p>
        </div>

        <div style="background:#ffffff; border:1px solid #fed7aa; border-left:5px solid #f97316; padding:16px; border-radius:8px;">
          <h4 style="margin:0 0 6px 0; color:#c2410c; font-size:15px; font-weight:800;">3. Pattern Matching for switch (Java 21 LTS)</h4>
          <p style="margin:0; font-size:14px; line-height:1.7; color:#334155;">
            క్లిష్టమైన ఇఫ్-ఎల్స్ క్యాస్టింగ్ బదులుగా Java 21 యొక్క <code>switch (obj) { case Account a -> ... }</code> పాటర్న్ మ్యాచింగ్‌ను వాడండి. ఇది కోడ్‌ను సులభతరం చేస్తుంది.
          </p>
        </div>

        <div style="background:#ffffff; border:1px solid #fed7aa; border-left:5px solid #f97316; padding:16px; border-radius:8px;">
          <h4 style="margin:0 0 6px 0; color:#c2410c; font-size:15px; font-weight:800;">4. Avoid Over-Engineering with Parallel Streams</h4>
          <p style="margin:0; font-size:14px; line-height:1.7; color:#334155;">
            డేటా పరిమాణం చిన్నగా ఉన్నప్పుడు అనవసరంగా <code>parallelStream()</code> వాడకండి. ఇది కామన్ ForkJoinPool ను బ్లాక్ చేసి ఇతర సర్వీసులను స్లో చేసే ప్రమాదం ఉంది.
          </p>
        </div>

        <div style="background:#ffffff; border:1px solid #fed7aa; border-left:5px solid #f97316; padding:16px; border-radius:8px;">
          <h4 style="margin:0 0 6px 0; color:#c2410c; font-size:15px; font-weight:800;">5. Always Build Clean CI/CD Pipelines</h4>
          <p style="margin:0; font-size:14px; line-height:1.7; color:#334155;">
            మీ ప్రాజెక్ట్ ఎల్లప్పుడూ <code>npm run build</code> లేదా <code>mvn clean verify</code> లో జీరో ఎర్రర్లతో గ్రీన్ పాస్ అయ్యేలా క్రమశిక్షణ పాటించండి.
          </p>
        </div>
      </div>
    </section>

    <!-- SECTION 12 -->
    <section id="sec-12" style="margin-top:40px;">
      <h2 style="font-size:24px; font-weight:800; color:var(--text); border-bottom:2px solid #e2e8f0; padding-bottom:10px; margin-bottom:18px;">
        12. గ్రాండ్ ఫైనల్ మాస్టరీ క్విజ్ (5 Comprehensive Capstone Quizzes)
      </h2>
      <p style="font-size:15px; line-height:1.8; color:var(--text); margin-bottom:20px;">
        మొత్తం 25 అధ్యాయాల ఆధునిక జావా ప్రయాణాన్ని విజయవంతంగా పూర్తి చేసుకున్న సందర్భంగా, మీ పరిపూర్ణ నైపుణ్యాన్ని ఈ 5 లోతైన ప్రాక్టికల్ ప్రశ్నలతో పరీక్షించుకోండి:
      </p>

      <div style="display:flex; flex-direction:column; gap:14px;">
        <details style="background:#ffffff; border:1px solid #e2e8f0; border-radius:8px; padding:14px 18px; cursor:pointer;">
          <summary style="font-weight:700; color:#0f172a; font-size:14.5px;">
            ప్రశ్న 1: ఎంటర్‌ప్రైజ్ బ్యాంకింగ్ ఇంజిన్‌లో Java Records ఎందుకు సంప్రదాయ క్లాసుల కంటే శ్రేష్ఠమైనవి?
          </summary>
          <p style="margin:12px 0 0 0; font-size:14px; line-height:1.7; color:#334155;">
            <strong>సమాధానం:</strong> రికార్డులు బై-డిఫాల్ట్ <strong>ఇమ్యూటబుల్ (Immutable)</strong> గా ఉంటాయి. వాటిలోని అన్ని ఫీల్డులు <code>private final</code> గా ఉంటాయి మరియు సెట్టర్ మెథడ్స్ ఉండవు. ఆర్థిక లావాదేవీలు ఒకసారి క్రియేట్ అయిన తర్వాత వాటిని ఏ ఇతర థ్రెడ్ కూడా మార్చలేదని ఇది ఖచ్చితమైన హామీ ఇస్తుంది, తద్వారా సిస్టమ్ థ్రెడ్-సేఫ్‌గా మరియు ఆడిట్-కంప్లయింట్‌గా మారుతుంది.
          </p>
        </details>

        <details style="background:#ffffff; border:1px solid #e2e8f0; border-radius:8px; padding:14px 18px; cursor:pointer;">
          <summary style="font-weight:700; color:#0f172a; font-size:14.5px;">
            ప్రశ్న 2: బ్యాంకింగ్ ఫండ్ ట్రాన్స్‌ఫర్ అటామిసిటీ (Atomicity) ని జావాలో ఎలా కాపాడాలి?
          </summary>
          <p style="margin:12px 0 0 0; font-size:14px; line-height:1.7; color:#334155;">
            <strong>సమాధానం:</strong> డెబిట్ మరియు క్రెడిట్ ఆపరేషన్లను ఒకే క్రిటికల్ సెక్షన్‌లో <code>synchronized</code> లేదా <code>ReentrantLock</code> ద్వారా రక్షించాలి. ఒకవేళ స్వీకర్త అకౌంట్ తప్పుగా ఉన్నా లేదా నిధులు చాలకపోయినా, ఎలాంటి డెబిట్ జరగకుండా కస్టమ్ ఎక్సెప్షన్ త్రో చేయాలి. డేటాబేస్ స్థాయిలో అయితే ACID ట్రాన్సాక్షన్ లేదా సాగా పాటర్న్ (Saga Pattern) ను వాడాలి.
          </p>
        </details>

        <details style="background:#ffffff; border:1px solid #e2e8f0; border-radius:8px; padding:14px 18px; cursor:pointer;">
          <summary style="font-weight:700; color:#0f172a; font-size:14.5px;">
            ప్రశ్న 3: HashMap స్థానంలో ConcurrentHashMap ను ఎందుకు వాడాలి?
          </summary>
          <p style="margin:12px 0 0 0; font-size:14px; line-height:1.7; color:#334155;">
            <strong>సమాధానం:</strong> సాధారణ <code>HashMap</code> మల్టీ-థ్రెడెడ్ వాతావరణంలో సేఫ్ కాదు; రీహాషింగ్ సమయంలో సర్క్యులర్ లింక్ ఏర్పడి 100% CPU లూప్‌లో పడిపోయే ప్రమాదం ఉంది. <code>ConcurrentHashMap</code> బకెట్ స్థాయి లాకింగ్ (Lock Striping) ను ఉపయోగించడం వలన బహుళ థ్రెడ్‌లు సమాంతరంగా వేర్వేరు బకెట్లలో ఎలాంటి లాకింగ్ కంటెన్షన్ లేకుండా రన్ కాగలవు.
          </p>
        </details>

        <details style="background:#ffffff; border:1px solid #e2e8f0; border-radius:8px; padding:14px 18px; cursor:pointer;">
          <summary style="font-weight:700; color:#0f172a; font-size:14.5px;">
            ప్రశ్న 4: Stream API ఫ్రాడ్ డిటెక్షన్ వంటి హై-త్రూపుట్ సిస్టమ్స్‌లో ఎలాంటి ప్రయోజనాన్ని ఇస్తుంది?
          </summary>
          <p style="margin:12px 0 0 0; font-size:14px; line-height:1.7; color:#334155;">
            <strong>సమాధానం:</strong> Stream API డిక్లరేటివ్ ఫిల్టరింగ్ మరియు Lazy Evaluation ను అందిస్తుంది. బహుళ షరతులను (ఉదాహరణకు <code>amount &gt; 200000</code>, బ్లాక్‌లిస్ట్ లుకప్) ఒకే ఫిల్టర్ పైప్‌లైన్‌లో కలపవచ్చు. షార్ట్-సర్క్యూటింగ్ ఆపరేషన్లు అవసరమైన క్షణంలో లూప్‌ను ఆపివేసి సిస్టమ్ మెమరీని మరియు CPU వినియోగాన్ని ఆదా చేస్తాయి.
          </p>
        </details>

        <details style="background:#ffffff; border:1px solid #e2e8f0; border-radius:8px; padding:14px 18px; cursor:pointer;">
          <summary style="font-weight:700; color:#0f172a; font-size:14.5px;">
            ప్రశ్న 5: మొత్తం 25 అధ్యాయాలలో జావా నేర్చుకున్న తర్వాత తదుపరి దశ (Next Step) ఏమిటి?
          </summary>
          <p style="margin:12px 0 0 0; font-size:14px; line-height:1.7; color:#334155;">
            <strong>సమాధానం:</strong> కోర్ జావా 21+ పై సంపూర్ణ పట్టు సాధించిన తర్వాత, పరిశ్రమలో మోస్ట్ డిమాండింగ్ టెక్నాలజీలైన <strong>Spring Boot 3.x</strong>, <strong>Microservices Architecture</strong>, <strong>Docker &amp; Kubernetes</strong>, మరియు <strong>Kafka</strong> వైపు అడుగులు వేయడం ఉత్తమమైన మార్గం. మీ ప్రాథమిక పునాది ఇక్కడ బలంగా నిర్మించబడింది!
          </p>
        </details>
      </div>
    </section>

    <!-- COURSE COMPLETION BANNER & NAVIGATION BUTTONS -->
    <div style="background:linear-gradient(135deg, #fefce8 0%, #fef08a 100%); border:2px solid #eab308; border-radius:16px; padding:32px; margin:48px 0; text-align:center; box-shadow:0 8px 24px rgba(234, 179, 8, 0.15);">
      <div style="font-size:42px; margin-bottom:12px;">🏆</div>
      <h2 style="font-size:26px; font-weight:800; color:#854d0e; margin:0 0 10px 0;">
        అభినందనలు! మీరు 25 అధ్యాయాల Java Masterclass ను విజయవంతంగా పూర్తి చేశారు!
      </h2>
      <p style="font-size:15px; line-height:1.8; color:#713f12; max-width:680px; margin:0 auto 20px auto;">
        జావా బేసిక్స్, లూప్స్, ఆబ్జెక్ట్ ఓరియెంటెడ్ ప్రోగ్రామింగ్, రికార్డులు, కస్టమ్ ఎక్సెప్షన్లు, కలెక్షన్స్ ఫ్రేమ్‌వర్క్, జెనరిక్స్, ల్యాంబ్దాలు, స్ట్రీమ్స్ మరియు బ్యాంకింగ్ క్యాప్‌స్టోన్ వరకు ప్రయాణించిన మీకు శుభాకాంక్షలు!
      </p>
      <a href="/blog-java/01-java-introduction-features-and-jvm-architecture.html" style="background:#15803d; color:#ffffff; padding:12px 28px; border-radius:8px; text-decoration:none; font-weight:800; font-size:15px; display:inline-flex; align-items:center; gap:8px; box-shadow:0 4px 12px rgba(21, 128, 61, 0.3);">
        మొదటి పాఠానికి తిరిగి వెళ్లండి (Start Over from Chapter 01) ↺
      </a>
    </div>

    <!-- NEXT / PREV NAVIGATION BUTTONS -->
    <div style="display:flex; justify-content:space-between; align-items:center; gap:16px; margin:32px 0 24px 0; flex-wrap:wrap;">
      <a href="/blog-java/24-java-lambdas-and-stream-api.html" style="background:var(--bg2); border:1px solid var(--border); color:var(--text); padding:12px 22px; border-radius:8px; text-decoration:none; font-weight:700; font-size:14px; display:inline-flex; align-items:center; gap:8px;">
        ← మునుపటి పాఠం: 24. Lambdas &amp; Stream API
      </a>
      <a href="/blog-java/01-java-introduction-features-and-jvm-architecture.html" style="background:#facc15; border:1px solid #eab308; color:#121212; padding:12px 24px; border-radius:8px; text-decoration:none; font-weight:800; font-size:14px; display:inline-flex; align-items:center; gap:8px; box-shadow:0 2px 10px rgba(234, 179, 8, 0.25);">
        🎉 కోర్సు పూర్తయింది! (Chapter 01 Home) →
      </a>
    </div>
  </main>
</div>

<script src="/site-nav.js"></script>
</body>
</html>`;

const outPath = path.join(__dirname, '..', 'public', 'blog-java', '25-java-capstone-project.html');
fs.writeFileSync(outPath, chapter25Content, 'utf8');

console.log('✅ Successfully generated Java Chapter 25 in exact JavaScript HTML style!');
console.log('Target file:', outPath);
console.log('Target file size:', chapter25Content.length, 'characters');
