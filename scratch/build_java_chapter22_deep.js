const fs = require('fs');
const path = require('path');
const { LESSONS, buildJavaSidebar } = require('./java_curriculum_data.js');

const currentLesson = LESSONS.find(l => l.num === 22);

const chapter22Content = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Java Collections Deep Dive — Set (HashSet/TreeSet) &amp; Map (HashMap/TreeMap) తెలుగులో — Java Tutorial | Our Compiler</title>
  <meta name="description" content="జావా సెట్ మరియు మ్యాప్ ఇంటర్‌ఫేస్‌లు, HashSet, TreeSet, HashMap ఇంటర్నల్ ఆర్కిటెక్చర్, Hash Buckets, Collisions, Treeification, Load Factor, equals &amp; hashCode కాంట్రాక్ట్ తెలుగులో నేర్చుకోండి." />
  <meta name="keywords" content="java set hashset treeset telugu, java map hashmap treemap telugu, hashmap internals telugu, hashmap treeification red black tree, equals hashcode contract java telugu" />
  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />
  <link rel="icon" type="image/png" href="/logo.png" />
  <link rel="canonical" href="https://www.ourcompiler.com/blog-java/22-java-collections-set-and-map-deep-dive.html" />
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

      const typeList = ['String','int','double','float','long','boolean','char','byte','short','List','ArrayList','LinkedList','Set','HashSet','TreeSet','Map','HashMap','TreeMap','LinkedHashMap','Integer','Double','Boolean','Long','Object','System','Math','Arrays','Collections','Instant','UUID','Scanner','Iterator','ListIterator','Predicate','Function','Consumer','Supplier','Stream','Collectors','Exception','RuntimeException','Optional','DoubleSummaryStatistics','Thread','Runnable','Comparator','Objects'];
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
  ${buildJavaSidebar(22)}

  <!-- MAIN CONTENT -->
  <main class="content">
    <div class="breadcrumb">
      <a href="/">Home</a><span class="sep">›</span>
      <a href="/blog.html">Tutorials</a><span class="sep">›</span>
      <a href="/blog-java.html">Java</a><span class="sep">›</span>
      <span class="current">Lesson 22: Set &amp; Map Deep Dive</span>
    </div>
    
    <!-- HEADER BADGES & META -->
    <div style="display:flex; gap:10px; align-items:center; flex-wrap:wrap; margin-bottom:16px;">
      <span style="background:#e0f2fe; color:#0369a1; border:1px solid #bae6fd; font-size:12.5px; font-weight:700; padding:4px 12px; border-radius:20px; display:inline-flex; align-items:center; gap:6px;">
        ☕ Java (Java 21+ LTS)
      </span>
      <span style="background:#ecfdf5; color:#047857; border:1px solid #a7f3d0; font-size:12.5px; font-weight:700; padding:4px 12px; border-radius:20px; display:inline-flex; align-items:center; gap:6px;">
        🟢 Lesson 22 of 25
      </span>
      <span style="background:#fef3c7; color:#b45309; border:1px solid #fde68a; font-size:12.5px; font-weight:700; padding:4px 12px; border-radius:20px; display:inline-flex; align-items:center; gap:6px;">
        📂 Part 05: Collections &amp; Capstone (Page 2 of 5)
      </span>
      <span style="background:#f3e8ff; color:#7e22ce; border:1px solid #e9d5ff; font-size:12.5px; font-weight:700; padding:4px 12px; border-radius:20px; display:inline-flex; align-items:center; gap:6px;">
        ⏱️ 24 min read
      </span>
    </div>

    <!-- MAIN HEADING -->
    <h1 style="font-size:32px; font-weight:800; line-height:1.3; margin:0 0 16px 0; color:var(--text); letter-spacing:-0.5px;">
      Collections Deep Dive — Set (HashSet/TreeSet) &amp; Map (HashMap/TreeMap) (సెట్ &amp; మ్యాప్ ఆర్కిటెక్చర్)
    </h1>

    <!-- SUBTOPICS PILL BAR -->
    <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; padding:12px 18px; margin-bottom:28px;">
      <div style="font-size:13.5px; font-weight:700; color:#475569; margin-bottom:4px;">
        📌 Covered in this lesson:
      </div>
      <div style="font-size:13px; line-height:1.6; color:#64748b;">
        Unique Fingerprint Database &amp; Library Catalog Index Analogy · Set Interface &amp; Duplicates Elimination · HashSet (Hash Buckets, O(1)) vs TreeSet (NavigableSet, Red-Black Tree, O(log N)) · Map Key-Value Architecture · HashMap Internals (HashCode, Equals Contract, Hash Bucketing, Treeification Threshold 8, Load Factor 0.75) · LinkedHashMap (Insertion/LRU Order) · TreeMap (Sorted Map) · Enterprise User Session &amp; Permission Cache Engine · 5 Production Pitfalls
      </div>
    </div>

    <!-- WARM IVORY INTRO BOX (Strict JavaScript Masterclass Style) -->
    <div class="intro-box">
      <p style="margin:0 0 16px 0; font-size:15px; line-height:1.8; color:#1e293b;">
        ఎంటర్‌ప్రైజ్ సాఫ్ట్‌వేర్ అభివృద్ధిలో మిలియన్ల కొద్దీ యూజర్ రికార్డులను నిల్వ చేసేటప్పుడు రెండు ప్రధాన అవసరాలు ఉంటాయి: ఒకటి — <strong>డూప్లికేట్ డేటాను పూర్తిగా నిరోధించడం (Unique Elements)</strong>, రెండవది — <strong>కీ ఆధారంగా సెకనులో లక్ష వంతు సమయంలో డేటాను వెతికి తీయడం (Ultra-Fast Key-Value Lookup)</strong>. జావా కలెక్షన్స్ ఫ్రేమ్‌వర్క్ ఈ రెండు అతిపెద్ద సమస్యలను సమర్థవంతంగా పరిష్కరించడానికి <strong><code>Set</code></strong> మరియు <strong><code>Map</code></strong> ఇంటర్‌ఫేస్‌లను రూపొందించింది. ప్రపంచవ్యాప్తంగా ప్రతి హై-స్కేల్ జావా సిస్టమ్ వెనుక గుండెకాయలా పనిచేసే <code>HashMap</code> యొక్క అంతర్గత ఆర్కిటెక్చర్, హాష్ బకెట్లు (Hash Buckets), హాష్ కొలీజన్లు (Collisions), జావా 8 లో ప్రవేశపెట్టిన ట్రీయిఫికేషన్ (Treeification to Red-Black Trees), మరియు <code>equals()</code> &amp; <code>hashCode()</code> కాంట్రాక్ట్ వెనుక ఉన్న రహస్యాలను ఈ అధ్యాయంలో లోతుగా నేర్చుకుందాం.
      </p>

      <h4 style="margin:0 0 10px 0; color:#047857; font-size:16px; font-weight:800;">
        యూనిక్ వేలిముద్రల డేటాబేస్ &amp; లైబ్రరీ క్యాటలాగ్ కార్డ్ ఇండెక్స్ అనాలజీ (The Unique Fingerprint Database &amp; Library Catalog Card Index Analogy):
      </h4>
      <ol style="margin:0; padding-left:22px; color:#334155; line-height:1.8; font-size:14.5px;">
        <li style="margin-bottom:8px;">
          <strong>1. Set (యూనిక్ వేలిముద్రల రిజిస్టర్ - Unique Fingerprint Registry):</strong> ప్రభుత్వ ఆధార్ లేదా పాస్‌పోర్ట్ డేటాబేస్‌లో ఒక పౌరుడి వేలిముద్ర ఇప్పటికే ఉంటే, అతడు మళ్లీ వచ్చి నమోదు చేయాలని చూసినా సిస్టమ్ అంగీకరించదు. జావాలోని <code>Set</code> సరిగ్గా అలాగే పనిచేస్తుంది — ఇది డూప్లికేట్ ఎలిమెంట్లను ఏమాత్రం అనుమతించదు. ఒకే ఆధార్ నంబర్‌ను పదిసార్లు చేర్చినా, సెట్‌లో కేవలం ఒక్క ఎంట్రీ మాత్రమే మిగులుతుంది.
        </li>
        <li style="margin-bottom:8px;">
          <strong>2. Map (లైబ్రరీ క్యాటలాగ్ కార్డ్ &amp; నిఘంటువు - Library Catalog &amp; Word Dictionary):</strong> లైబ్రరీలో లక్షల పుస్తకాలుంటాయి. ప్రతి పుస్తకానికి ఒక ప్రత్యేకమైన ISBN కోడ్ (Key) మరియు ఆ పుస్తకం వివరాలు (Value) ఉంటాయి. మనం పుస్తకం పేరు మొత్తం వెతకకుండా ISBN కోడ్ ఇవ్వగానే లైబ్రేరియన్ క్షణంలో పుస్తకాన్ని చేతిలో పెడతారు. జావాలోని <code>Map</code> ఈ <code>Key-Value</code> సూత్రంపై ఆధారపడి పనిచేస్తుంది. ఇక్కడ 'కీ' ఎప్పుడూ యునిక్‌గా ఉంటుంది, ఒకవేళ ఇప్పటికే ఉన్న కీతో కొత్త విలువను జోడిస్తే పాత విలువ స్థానంలో కొత్తది రీప్లేస్ అవుతుంది.
        </li>
        <li style="margin-bottom:8px;">
          <strong>3. HashMap vs TreeSet/TreeMap (హ్యాష్ బకెట్లు vs ఆల్ఫాబెటికల్ ఇండెక్స్ బుక్):</strong> <code>HashMap</code> మరియు <code>HashSet</code> ఒక గణిత హాషింగ్ ఫార్ములా ఉపయోగించి డేటాను క్షణంలో కనుగొంటాయి (సగటున <code>O(1)</code> సమయం). అయితే వాటిలో డేటా ఆర్డర్ ఉండదు. దీనికి భిన్నంగా <code>TreeSet</code> మరియు <code>TreeMap</code> ఒక డిక్షనరీలోని పదాల లాగా డేటాను ఎల్లప్పుడూ ఆరోహణ క్రమంలో (Sorted Natural Order) భద్రపరుస్తాయి. దీనికోసం అవి వెనుక 'రెడ్-బ్లాక్ బ్యాలెన్స్‌డ్ ట్రీ'ని ఉపయోగించి <code>O(log N)</code> సమయంలో ఎలిమెంట్లను అందిస్తాయి.
        </li>
      </ol>
      <p style="margin:14px 0 0 0; font-size:14px; font-weight:600; color:#0f766e;">
        💡 ఈ పాఠంలో మీరు సెట్ మరియు మ్యాప్ ఇంటర్‌ఫేస్‌ల సూక్ష్మ వ్యత్యాసాలు, సమాంతర డేటా స్ట్రక్చర్ల సామర్థ్యాలు, హాష్ కొలీజన్ మేనేజ్‌మెంట్ మరియు ఎంటర్‌ప్రైజ్ లెవల్ యూజర్ సెషన్ క్యాష్ ఇంజిన్‌ను ప్రాక్టికల్‌గా నిర్మిస్తారు!
      </p>
    </div>

    <!-- 3-COLUMN TABLE OF CONTENTS (TOC Card) -->
    <div class="toc-card" style="background:#ffffff; border:1px solid #e2e8f0; border-radius:12px; padding:24px; margin:32px 0; box-shadow:0 4px 16px rgba(0,0,0,0.03);">
      <h3 style="margin:0 0 16px 0; font-size:18px; font-weight:800; color:#0f172a; display:flex; align-items:center; gap:8px;">
        📑 పాఠ్యాంశ విషయ సూచిక (Table of Contents)
      </h3>
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:12px;">
        <div>
          <a href="#sec-1" style="color:#0284c7; text-decoration:none; font-size:14px; font-weight:600; display:block; padding:4px 0;">1. Set ఇంటర్‌ఫేస్ &amp; యునిక్‌నెస్ కాంట్రాక్ట్</a>
          <a href="#sec-2" style="color:#0284c7; text-decoration:none; font-size:14px; font-weight:600; display:block; padding:4px 0;">2. HashSet ఆర్కిటెక్చర్ &amp; HashMap డిపెండెన్సీ</a>
          <a href="#sec-3" style="color:#0284c7; text-decoration:none; font-size:14px; font-weight:600; display:block; padding:4px 0;">3. TreeSet &amp; NavigableSet (Red-Black Tree)</a>
          <a href="#sec-4" style="color:#0284c7; text-decoration:none; font-size:14px; font-weight:600; display:block; padding:4px 0;">4. ప్రాక్టికల్ కోడ్: SetDeduplication &amp; TreeSet</a>
        </div>
        <div>
          <a href="#sec-5" style="color:#0284c7; text-decoration:none; font-size:14px; font-weight:600; display:block; padding:4px 0;">5. Map ఇంటర్‌ఫేస్ &amp; Key-Value ఆర్కిటెక్చర్</a>
          <a href="#sec-6" style="color:#0284c7; text-decoration:none; font-size:14px; font-weight:600; display:block; padding:4px 0;">6. HashMap ఇంటర్నల్స్: Buckets, Collisions &amp; Treeification</a>
          <a href="#sec-7" style="color:#0284c7; text-decoration:none; font-size:14px; font-weight:600; display:block; padding:4px 0;">7. LinkedHashMap &amp; LRU Cache మెకానిక్స్</a>
          <a href="#sec-8" style="color:#0284c7; text-decoration:none; font-size:14px; font-weight:600; display:block; padding:4px 0;">8. TreeMap &amp; Custom Comparators</a>
        </div>
        <div>
          <a href="#sec-9" style="color:#0284c7; text-decoration:none; font-size:14px; font-weight:600; display:block; padding:4px 0;">9. ప్రాక్టికల్ కోడ్: HashMap Collisions &amp; Benchmarks</a>
          <a href="#sec-10" style="color:#0284c7; text-decoration:none; font-size:14px; font-weight:600; display:block; padding:4px 0;">10. క్యాప్‌స్టోన్: UserSessionCacheEngine</a>
          <a href="#sec-11" style="color:#0284c7; text-decoration:none; font-size:14px; font-weight:600; display:block; padding:4px 0;">11. ప్రొడక్షన్ పిట్‌ఫాల్స్ &amp; ఆంటీ-పాటర్న్స్</a>
          <a href="#sec-12" style="color:#0284c7; text-decoration:none; font-size:14px; font-weight:600; display:block; padding:4px 0;">12. ఇంటర్వ్యూ క్విజ్ &amp; సెల్ఫ్-టెస్ట్</a>
        </div>
      </div>
    </div>

    <!-- SECTION 1 -->
    <section id="sec-1" style="margin-top:40px;">
      <h2 style="font-size:24px; font-weight:800; color:var(--text); border-bottom:2px solid #e2e8f0; padding-bottom:10px; margin-bottom:18px;">
        1. Set ఇంటర్‌ఫేస్ &amp; యునిక్‌నెస్ కాంట్రాక్ట్ (Set Interface &amp; Uniqueness Contract)
      </h2>
      <p style="font-size:15px; line-height:1.8; color:var(--text); margin-bottom:16px;">
        జావా కలెక్షన్ ఫ్రేమ్‌వర్క్‌లో <code>java.util.Set</code> అనేది <code>Collection</code> ఇంటర్‌ఫేస్ నుండి ఉద్భవించిన ఒక ప్రధాన విభాగం. సెట్ యొక్క ప్రాథమిక నిబంధన ఒక్కటే: <strong>"ఇది ఏ విధమైన డూప్లికేట్ ఎలిమెంట్లను కలిగి ఉండదు" (No duplicate elements allowed)</strong>. గణిత శాస్త్రంలోని సెట్ థియరీ (Mathematical Set Theory) లాగానే, జావా సెట్ కూడా ఒక నిర్దిష్ట సమూహంలో ప్రతి మూలకం ప్రత్యేకమైనదిగా ఉండేలా నిర్ధారిస్తుంది.
      </p>
      <p style="font-size:15px; line-height:1.8; color:var(--text); margin-bottom:16px;">
        రెండు ఆబ్జెక్టులు సమానమా కాదా అని నిర్ణయించడానికి జావా సెట్ <code>e1.equals(e2)</code> పద్ధతిని ఉపయోగిస్తుంది. అంతేకాకుండా, గరిష్టంగా కేవలం ఒకే ఒక <code>null</code> ఎలిమెంట్‌ను మాత్రమే అనుమతిస్తుంది (HashSet/LinkedHashSet లలో; అయితే TreeSet లో null పూర్తిగా నిషిద్ధం).
      </p>

      <!-- Architecture Comparison Table -->
      <div style="overflow-x:auto; margin:24px 0;">
        <table style="width:100%; border-collapse:collapse; background:#ffffff; border:1px solid #e2e8f0; font-size:14px; text-align:left; border-radius:8px; overflow:hidden;">
          <thead style="background:#f1f5f9; color:#1e293b; font-weight:700;">
            <tr>
              <th style="padding:12px 16px; border:1px solid #e2e8f0;">ఇంప్లిమెంటేషన్</th>
              <th style="padding:12px 16px; border:1px solid #e2e8f0;">అంతర్గత డేటా స్ట్రక్చర్</th>
              <th style="padding:12px 16px; border:1px solid #e2e8f0;">ఆర్డరింగ్ (క్రమం)</th>
              <th style="padding:12px 16px; border:1px solid #e2e8f0;">సమయ సంక్లిష్టత (Lookup)</th>
              <th style="padding:12px 16px; border:1px solid #e2e8f0;">Null అనుమతి</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom:1px solid #e2e8f0;">
              <td style="padding:12px 16px; font-weight:700; color:#0284c7;"><code>HashSet</code></td>
              <td style="padding:12px 16px;">Hash Table (HashMap వెనుక)</td>
              <td style="padding:12px 16px; color:#ef4444;">క్రమం ఉండదు (Unordered)</td>
              <td style="padding:12px 16px; font-weight:700; color:#16a34a;">O(1) Constant Time</td>
              <td style="padding:12px 16px; color:#16a34a;">అవును (1 Null)</td>
            </tr>
            <tr style="border-bottom:1px solid #e2e8f0; background:#f8fafc;">
              <td style="padding:12px 16px; font-weight:700; color:#0284c7;"><code>LinkedHashSet</code></td>
              <td style="padding:12px 16px;">Hash Table + Doubly-Linked List</td>
              <td style="padding:12px 16px; color:#16a34a;">ఇన్సర్షన్ ఆర్డర్ (Insertion Order)</td>
              <td style="padding:12px 16px; font-weight:700; color:#16a34a;">O(1) Constant Time</td>
              <td style="padding:12px 16px; color:#16a34a;">అవును (1 Null)</td>
            </tr>
            <tr>
              <td style="padding:12px 16px; font-weight:700; color:#0284c7;"><code>TreeSet</code></td>
              <td style="padding:12px 16px;">Red-Black Tree (TreeMap వెనుక)</td>
              <td style="padding:12px 16px; color:#16a34a;">సహజ క్రమబద్ధీకరణ (Sorted Order)</td>
              <td style="padding:12px 16px; font-weight:700; color:#d97706;">O(log N) Logarithmic</td>
              <td style="padding:12px 16px; color:#ef4444;">కాదు (NullPointerException)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- SECTION 2 -->
    <section id="sec-2" style="margin-top:40px;">
      <h2 style="font-size:24px; font-weight:800; color:var(--text); border-bottom:2px solid #e2e8f0; padding-bottom:10px; margin-bottom:18px;">
        2. HashSet ఆర్కిటెక్చర్ &amp; HashMap డిపెండెన్సీ (HashSet Internals)
      </h2>
      <p style="font-size:15px; line-height:1.8; color:var(--text); margin-bottom:16px;">
        జావా లైబ్రరీలో <code>HashSet</code> క్లాస్ సోర్స్ కోడ్‌ను పరిశీలిస్తే ఒక ఆశ్చర్యకరమైన నిజం బయటపడుతుంది: <strong>HashSet స్వయంగా డేటాను నిల్వ చేయదు; అది తెరవెనుక ఒక <code>HashMap</code> ఆబ్జెక్టును ఉపయోగిస్తుంది!</strong>
      </p>
      <div style="background:#f8fafc; border:1px solid #cbd5e1; border-left:4px solid #0284c7; padding:16px; border-radius:6px; margin:20px 0; font-family:'JetBrains Mono', monospace; font-size:13.5px; color:#0f172a;">
        // JDK Source Code Architecture of HashSet:<br/>
        public class HashSet&lt;E&gt; extends AbstractSet&lt;E&gt; implements Set&lt;E&gt; {<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;private transient HashMap&lt;E, Object&gt; map;<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;private static final Object PRESENT = new Object(); // Dummy Value<br/><br/>
        &nbsp;&nbsp;&nbsp;&nbsp;public boolean add(E e) {<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return map.put(e, PRESENT) == null;<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;}<br/>
        }
      </div>
      <p style="font-size:15px; line-height:1.8; color:var(--text); margin-bottom:16px;">
        మీరు సెట్‌లోకి <code>set.add("Apple")</code> అన్నప్పుడు, HashSet తన అంతర్గత HashMap లో <code>map.put("Apple", PRESENT)</code> అని ఇన్సర్ట్ చేస్తుంది. ఇక్కడ "Apple" అనేది HashMap యొక్క <strong>Key</strong> గా మారుతుంది, మరియు <code>PRESENT</code> అనే ఒక డమ్మీ స్టాటిక్ ఆబ్జెక్ట్ <strong>Value</strong> గా కూర్చుంటుంది. HashMap కీలను ఎల్లప్పుడూ యునిక్‌గా ఉంచుతుంది కాబట్టి, డూప్లికేట్ ఎలిమెంట్‌ను యాడ్ చేస్తే <code>map.put()</code> పాత డమ్మీ ఆబ్జెక్ట్‌ను రిటర్న్ చేస్తుంది, ఫలితంగా <code>add()</code> మెథడ్ <code>false</code> రిటర్న్ చేసి డూప్లికేషన్‌ను నిరోధిస్తుంది!
      </p>
    </section>

    <!-- SECTION 3 -->
    <section id="sec-3" style="margin-top:40px;">
      <h2 style="font-size:24px; font-weight:800; color:var(--text); border-bottom:2px solid #e2e8f0; padding-bottom:10px; margin-bottom:18px;">
        3. TreeSet &amp; NavigableSet (Red-Black Tree ఆర్కిటెక్చర్)
      </h2>
      <p style="font-size:15px; line-height:1.8; color:var(--text); margin-bottom:16px;">
        ఒకవేళ మనకు డూప్లికేట్లు లేకుండా ఉండటంతో పాటు ఎలిమెంట్లు ఎల్లప్పుడూ చిన్న నుండి పెద్ద క్రమంలో (Sorted Natural Order) లేదా మన స్వంత <code>Comparator</code> క్రమంలో ఆటోమేటిక్‌గా అమర్చబడి ఉండాలంటే <code>java.util.TreeSet</code> సరైన పరిష్కారం.
      </p>
      <p style="font-size:15px; line-height:1.8; color:var(--text); margin-bottom:16px;">
        TreeSet అనేది <code>NavigableSet</code> మరియు <code>SortedSet</code> ఇంటర్‌ఫేస్‌లను ఇంప్లిమెంట్ చేస్తుంది. ఇది తెరవెనుక <strong>Red-Black Self-Balancing Binary Search Tree</strong> ని ఉపయోగిస్తుంది. ఈ చెట్టులో ప్రతి నోడ్ గరిష్టంగా రెండు పిల్లలను మాత్రమే కలిగి ఉంటుంది మరియు చెట్టు ఎల్లప్పుడూ సమతుల్యంగా ఉండేలా రంగు నియమాలను (Red &amp; Black rules) అనుసరిస్తుంది.
      </p>
      <div style="background:#ecfdf5; border:1px solid #a7f3d0; border-left:5px solid #047857; padding:16px; border-radius:8px; margin:20px 0;">
        <h4 style="margin:0 0 8px 0; color:#047857; font-size:15px; font-weight:800;">⚡ TreeSet యొక్క శక్తివంతమైన నావిగేషన్ మెథడ్స్:</h4>
        <ul style="margin:0; padding-left:20px; font-size:14px; color:#064e3b; line-height:1.7;">
          <li><code>first()</code> &amp; <code>last()</code>: సెట్‌లోని అత్యల్ప మరియు అత్యధిక విలువలను అందిస్తాయి.</li>
          <li><code>lower(E e)</code> &amp; <code>higher(E e)</code>: నిర్దిష్ట ఎలిమెంట్ కంటే కచ్చితంగా చిన్నదైన లేదా పెద్దదైన విలువను శోధిస్తాయి.</li>
          <li><code>floor(E e)</code> &amp; <code>ceiling(E e)</code>: ఎలిమెంట్ లేదా దానికి సమీపంలోని చిన్న/పెద్ద విలువను తీస్తాయి.</li>
          <li><code>subSet(from, to)</code>: ఒక నిర్దిష్ట పరిధిలోని సబ్-సెట్‌ను క్షణంలో రిటర్న్ చేస్తాయి.</li>
        </ul>
      </div>
    </section>

    <!-- SECTION 4: CODE BLOCK 1 -->
    <section id="sec-4" style="margin-top:40px;">
      <h2 style="font-size:24px; font-weight:800; color:var(--text); border-bottom:2px solid #e2e8f0; padding-bottom:10px; margin-bottom:18px;">
        4. ప్రాక్టికల్ కోడ్: SetDeduplication &amp; TreeSet నావిగేషన్
      </h2>
      <p style="font-size:15px; line-height:1.8; color:var(--text); margin-bottom:16px;">
        క్రింది జావా ప్రోగ్రామ్‌లో డూప్లికేట్ యూజర్ ఐడీల నుండి యునిక్ ఐడీలను వేరు చేయడం (Deduplication), <code>HashSet</code> యొక్క ఆర్డర్‌లెస్ ప్రవర్తన, మరియు <code>TreeSet</code> ద్వారా ర్యాంకింగ్ స్కోర్ల నావిగేషన్ ఎలా పనిచేస్తుందో స్వయంగా పరిశీలించండి.
      </p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">☕ Java — SetDeduplicationAndTreeSetBenchmark.java</span>
          <div class="code-actions" style="display:flex; gap:8px;">
            <button class="copy-btn" onclick="copyCodeSnippet(this)" style="background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.2); color:#ffffff; border-radius:6px; padding:4px 10px; font-size:11px; font-weight:600; cursor:pointer;">📋 Copy Code</button>
            <button class="run-btn" onclick="runInJavaCompiler(this)" style="background:#047857; border:none; color:#ffffff; border-radius:6px; padding:4px 12px; font-size:11px; font-weight:700; cursor:pointer;">▶ Run in Java Compiler</button>
          </div>
        </div>
        <pre><code class="language-java">import java.util.*;

public class SetDeduplicationAndTreeSetBenchmark {
    public static void main(String[] args) {
        System.out.println("=== 1. HASHSET DEDUPLICATION DEMO ===");
        
        // సిస్టమ్‌లోకి వచ్చిన లాగిన్ ఐడీలు (ఇందులో తీవ్రమైన డూప్లికేట్లు ఉన్నాయి)
        List&lt;String&gt; incomingUserIds = List.of(
            "USR-101", "USR-205", "USR-101", "USR-304", 
            "USR-205", "USR-500", "USR-101"
        );
        System.out.println("మొత్తం ఇన్కమింగ్ రిక్వెస్ట్‌లు: " + incomingUserIds.size());

        // HashSet లోకి చేర్చడం ద్వారా క్షణంలో డూప్లికేట్లను తొలగించడం
        Set&lt;String&gt; uniqueUsers = new HashSet&lt;&gt;(incomingUserIds);
        System.out.println("డూప్లికేట్లు తొలగించబడిన యునిక్ యూజర్లు: " + uniqueUsers);
        System.out.println("యునిక్ యూజర్ల సంఖ్య: " + uniqueUsers.size());

        System.out.println("\n=== 2. TREESET NAVIGABLE SET DEMO ===");
        // గేమింగ్ లీడర్‌బోర్డ్ స్కోర్లు (ఆటోమేటిక్ సార్టింగ్ మరియు రేంజ్ క్వెరీలు)
        TreeSet&lt;Integer&gt; highScores = new TreeSet&lt;&gt;();
        highScores.addAll(List.of(850, 420, 990, 710, 310, 950, 600));

        System.out.println("సహజంగా క్రమబద్ధీకరించబడిన స్కోర్లు: " + highScores);
        System.out.println("అత్యల్ప స్కోరు (first): " + highScores.first());
        System.out.println("అత్యధిక స్కోరు (last): " + highScores.last());

        int targetCutoff = 710;
        System.out.println("\n--- టార్గెట్ స్కోర్ చుట్టూ నావిగేషన్: " + targetCutoff + " ---");
        System.out.println("Target కంటే తక్కువైన స్కోరు (lower): " + highScores.lower(targetCutoff));
        System.out.println("Target కు సమానమైన లేదా తక్కువైన స్కోరు (floor): " + highScores.floor(targetCutoff));
        System.out.println("Target కు సమానమైన లేదా ఎక్కువైన స్కోరు (ceiling): " + highScores.ceiling(targetCutoff));
        System.out.println("Target కంటే కచ్చితంగా ఎక్కువైన స్కోరు (higher): " + highScores.higher(targetCutoff));

        // సబ్‌సెట్ రేంజ్ క్వెరీ: 400 నుండి 900 మధ్య స్కోర్లు
        SortedSet&lt;Integer&gt; midTier = highScores.subSet(400, 900);
        System.out.println("400 నుండి 900 మధ్య స్కోర్లు (subSet): " + midTier);
    }
}</code></pre>
      </div>

      <div class="code-output-card">
        <div class="output-header">💻 Program Terminal Output:</div>
        <pre class="output-content">=== 1. HASHSET DEDUPLICATION DEMO ===
మొత్తం ఇన్కమింగ్ రిక్వెస్ట్‌లు: 7
డూప్లికేట్లు తొలగించబడిన యునిక్ యూజర్లు: [USR-101, USR-304, USR-500, USR-205]
యునిక్ యూజర్ల సంఖ్య: 4

=== 2. TREESET NAVIGABLE SET DEMO ===
సహజంగా క్రమబద్ధీకరించబడిన స్కోర్లు: [310, 420, 600, 710, 850, 950, 990]
అత్యల్ప స్కోరు (first): 310
అత్యధిక స్కోరు (last): 990

--- టార్గెట్ స్కోర్ చుట్టూ నావిగేషన్: 710 ---
Target కంటే తక్కువైన స్కోరు (lower): 600
Target కు సమానమైన లేదా తక్కువైన స్కోరు (floor): 710
Target కు సమానమైన లేదా ఎక్కువైన స్కోరు (ceiling): 710
Target కంటే కచ్చితంగా ఎక్కువైన స్కోరు (higher): 850
400 నుండి 900 మధ్య స్కోర్లు (subSet): [420, 600, 710, 850]</pre>
      </div>
    </section>

    <!-- SECTION 5 -->
    <section id="sec-5" style="margin-top:40px;">
      <h2 style="font-size:24px; font-weight:800; color:var(--text); border-bottom:2px solid #e2e8f0; padding-bottom:10px; margin-bottom:18px;">
        5. Map ఇంటర్‌ఫేస్ &amp; Key-Value ఆర్కిటెక్చర్ (Map Interface Overview)
      </h2>
      <p style="font-size:15px; line-height:1.8; color:var(--text); margin-bottom:16px;">
        జావాలో <code>java.util.Map</code> అనేది <code>Collection</code> ఇంటర్‌ఫేస్ కుటుంబానికి చెందని ఒక ప్రత్యేకమైన ఇంటర్‌ఫేస్. ఎందుకంటే సాధారణ కలెక్షన్లు సింగిల్ ఎలిమెంట్లను (Single Elements) స్టోర్ చేస్తే, Map ఎల్లప్పుడూ <strong>కీ మరియు వ్యాల్యూ జంటలను (Key-Value Pairs - <code>Map.Entry&lt;K, V&gt;</code>)</strong> నిల్వ చేస్తుంది.
      </p>
      <div style="background:#fffbeb; border:1px solid #fde68a; border-left:4px solid #d97706; padding:16px; border-radius:6px; margin:20px 0;">
        <h4 style="margin:0 0 8px 0; color:#b45309; font-size:15px; font-weight:800;">🔑 Map ఇంటర్‌ఫేస్ యొక్క 4 ప్రధాన సూత్రాలు:</h4>
        <ol style="margin:0; padding-left:20px; font-size:14px; color:#78350f; line-height:1.7;">
          <li><strong>Keys must be unique:</strong> ఒక మ్యాప్‌లో ఒకే కీ రెండుసార్లు ఉండకూడదు. ఇప్పటికే ఉన్న కీతో మరో విలువ పెడితే పాత విలువ ఓవర్‌రైట్ అవుతుంది.</li>
          <li><strong>Values can be duplicates:</strong> వేర్వేరు కీలు ఒకే సమానమైన విలువను కలిగి ఉండవచ్చు (ఉదాహరణకు, వేర్వేరు విద్యార్థి రోల్ నంబర్లకు ఒకే మార్కులు ఉండవచ్చు).</li>
          <li><strong>View Collections:</strong> మ్యాప్ నుండి కీలను మాత్రమే చూడటానికి <code>keySet()</code>, విలువలను చూడటానికి <code>values()</code>, మరియు జంటలను చూడటానికి <code>entrySet()</code> పద్ధతులను ఉపయోగిస్తాము.</li>
          <li><strong>Modern Java 8+ Methods:</strong> <code>getOrDefault(key, defaultVal)</code>, <code>putIfAbsent(key, val)</code>, <code>computeIfAbsent(key, mappingFn)</code> లతో కోడ్ అత్యంత సంక్షిప్తంగా మారుతుంది.</li>
        </ol>
      </div>
    </section>

    <!-- SECTION 6 -->
    <section id="sec-6" style="margin-top:40px;">
      <h2 style="font-size:24px; font-weight:800; color:var(--text); border-bottom:2px solid #e2e8f0; padding-bottom:10px; margin-bottom:18px;">
        6. HashMap ఇంటర్నల్స్: Buckets, Collisions, Treeification &amp; Load Factor
      </h2>
      <p style="font-size:15px; line-height:1.8; color:var(--text); margin-bottom:16px;">
        ప్రపంచవ్యాప్తంగా ప్రతి జావా ఇంటర్వ్యూలో తప్పకుండా అడిగే ప్రశ్న: <strong>"How does HashMap work internally in Java?"</strong>. జావా <code>HashMap</code> యొక్క అంతర్గత ఇంజినీరింగ్ నిజంగా ఒక అద్భుతం. దీనిని విడమరచి వివరంగా అర్థం చేసుకుందాం:
      </p>

      <h3 style="font-size:18px; font-weight:700; color:#0f172a; margin:24px 0 10px 0;">
        1. నోడ్ ఎరే &amp; బకెట్ ఇండెక్స్ కాలిక్యులేషన్ (Bucket Array &amp; Index Formula):
      </h3>
      <p style="font-size:15px; line-height:1.8; color:var(--text); margin-bottom:16px;">
        HashMap అంతర్గతంగా <code>Node&lt;K,V&gt;[] table</code> అనే ఎరేను కలిగి ఉంటుంది. డిఫాల్ట్‌గా ప్రారంభంలో ఈ ఎరే సైజు <strong>16 బకెట్లు (Initial Capacity = 16)</strong> ఉంటుంది.
        మనం <code>map.put(key, value)</code> అన్నప్పుడు క్రింది క్రమం జరుగుతుంది:
      </p>
      <ol style="margin:0; padding-left:24px; color:var(--text); font-size:14.5px; line-height:1.8; margin-bottom:20px;">
        <li>కీ యొక్క <code>hashCode()</code> ను కాల్ చేసి 32-బిట్ ఇంటిజర్‌ను లెక్కిస్తుంది.</li>
        <li>బిట్‌వైస్ హాష్ స్ప్రెడింగ్ ఫంక్షన్ ద్వారా హైయర్ బిట్లను లోయర్ బిట్లలోకి మిక్స్ చేస్తుంది: <code>h = key.hashCode() ^ (h &gt;&gt;&gt; 16)</code>.</li>
        <li>బకెట్ ఇండెక్స్‌ను కనుగొనడానికి మోడ్యులో (%) బదులుగా అత్యంత వేగవంతమైన బిట్‌వైస్ AND ఆపరేషన్‌ను ఉపయోగిస్తుంది: <strong><code>index = (n - 1) &amp; hash</code></strong> (ఇక్కడ n అనేది బకెట్ల సైజు 16).</li>
      </ol>

      <h3 style="font-size:18px; font-weight:700; color:#0f172a; margin:24px 0 10px 0;">
        2. హాష్ కొలీజన్ అంటే ఏమిటి? (Hash Collision &amp; Linked List Chaining):
      </h3>
      <p style="font-size:15px; line-height:1.8; color:var(--text); margin-bottom:16px;">
        రెండు వేర్వేరు కీలు అనుకోకుండా ఒకే బకెట్ ఇండెక్స్‌ను పొందినప్పుడు దానిని <strong>హాష్ కొలీజన్ (Hash Collision)</strong> అంటారు. ఉదాహరణకు "Aa" మరియు "BB" రెండింటి hashCode ఒక్కటే (2112). అటువంటి సందర్భంలో Java ఆ బకెట్‌లో ఒక <strong>Singly Linked List</strong> ను నిర్మించి కొత్త నోడ్‌ను చివరికి లింక్ చేస్తుంది.
      </p>

      <h3 style="font-size:18px; font-weight:700; color:#0f172a; margin:24px 0 10px 0;">
        3. Java 8 ట్రీయిఫికేషన్ (Treeification Threshold = 8):
      </h3>
      <p style="font-size:15px; line-height:1.8; color:var(--text); margin-bottom:16px;">
        Java 7 వరకు ఒకే బకెట్‌లో కొలీజన్లు పెరిగిపోతే లింక్డ్ లిస్ట్ పొడవైపోయి వెతకడానికి <code>O(N)</code> సమయం పట్టేది. దీనివల్ల హ్యాకర్లు ఉద్దేశపూర్వకంగా ఒకే హాష్‌కోడ్ వచ్చే కీలను పంపి సిస్టమ్‌ను స్లో చేసేవారు (Hash DOS Attack).
        ఈ లోపాన్ని అధిగమించడానికి Java 8 లో ఆర్కిటెక్చర్ మార్చబడింది:
      </p>
      <div style="background:#eff6ff; border:1px solid #bfdbfe; border-left:4px solid #2563eb; padding:16px; border-radius:6px; margin:20px 0; font-size:14px; line-height:1.8; color:#1e3a8a;">
        <strong>🌳 Treeification Rule:</strong><br/>
        ఒక బకెట్‌లోని ఎలిమెంట్ల సంఖ్య <strong>TREEIFY_THRESHOLD = 8</strong> కి చేరుకుని, మరియు మొత్తం HashMap కెపాసిటీ కనీసం <strong>MIN_TREEIFY_CAPACITY = 64</strong> ఉంటే, జావా ఆ పొడవైన లింక్డ్ లిస్ట్‌ను ఒక <strong>Red-Black Self-Balancing Tree (TreeNode)</strong> గా మారుస్తుంది! దీనివలన చెత్త పరిస్థితిలో కూడా శోధన సమయం <code>O(N)</code> నుండి అత్యంత వేగవంతమైన <strong><code>O(log N)</code></strong> కి పడిపోతుంది! ఆ తర్వాత ఎలిమెంట్లు తగ్గి 6 కి పడిపోతే (<code>UNTREEIFY_THRESHOLD = 6</code>), అది తిరిగి సాధారణ లింక్డ్ లిస్ట్‌గా మారిపోతుంది.
      </div>

      <h3 style="font-size:18px; font-weight:700; color:#0f172a; margin:24px 0 10px 0;">
        4. లోడ్ ఫ్యాక్టర్ &amp; రీహాషింగ్ (Load Factor 0.75 &amp; Re-hashing):
      </h3>
      <p style="font-size:15px; line-height:1.8; color:var(--text); margin-bottom:16px;">
        డిఫాల్ట్ లోడ్ ఫ్యాక్టర్ <strong>0.75</strong> గా ఉంటుంది. అంటే 16 బకెట్లలో 75% నిండినప్పుడు (అంటే 16 * 0.75 = 12 ఎలిమెంట్లు చేరగానే), బకెట్ ఎరే సైజును రెట్టింపు (16 నుండి 32 కి) చేసి, పాత ఎలిమెంట్లన్నింటినీ కొత్త బకెట్లలోకి రీ-డిస్ట్రిబ్యూట్ చేస్తుంది. దీనినే <strong>Rehashing</strong> అంటారు.
      </p>
    </section>

    <!-- SECTION 7 -->
    <section id="sec-7" style="margin-top:40px;">
      <h2 style="font-size:24px; font-weight:800; color:var(--text); border-bottom:2px solid #e2e8f0; padding-bottom:10px; margin-bottom:18px;">
        7. LinkedHashMap &amp; LRU Cache మెకానిక్స్ (Least Recently Used Cache)
      </h2>
      <p style="font-size:15px; line-height:1.8; color:var(--text); margin-bottom:16px;">
        సాధారణ <code>HashMap</code> మనం ఎలిమెంట్లను ఏ క్రమంలో ఇన్సర్ట్ చేశామో ఆ క్రమాన్ని గుర్తుపెట్టుకోదు. మనకు <code>O(1)</code> హాష్ లుకప్‌తో పాటు <strong>ఇన్సర్షన్ క్రమం (Insertion Order)</strong> లేదా <strong>యాక్సెస్ క్రమం (Access Order)</strong> రెండూ కావాలంటే <code>LinkedHashMap</code> ను ఉపయోగిస్తాము.
      </p>
      <p style="font-size:15px; line-height:1.8; color:var(--text); margin-bottom:16px;">
        <code>LinkedHashMap</code> తన ప్రతి నోడ్‌కు ముందు మరియు వెనుక పాయింటర్లను (before &amp; after pointers) జోడించి ఒక డబుల్-లింక్డ్ లిస్ట్‌ను నిర్వహిస్తుంది. దీనిని ఉపయోగించి కేవలం <code>removeEldestEntry()</code> మెథడ్‌ను ఓవర్‌రైడ్ చేయడం ద్వారా మనం ప్రపంచ ప్రసిద్ధ <strong>LRU Cache (Least Recently Used Cache)</strong> ని కేవలం 5 లైన్లలో నిర్మించవచ్చు!
      </p>
    </section>

    <!-- SECTION 8 -->
    <section id="sec-8" style="margin-top:40px;">
      <h2 style="font-size:24px; font-weight:800; color:var(--text); border-bottom:2px solid #e2e8f0; padding-bottom:10px; margin-bottom:18px;">
        8. TreeMap &amp; Custom Comparators (Sorted Navigation)
      </h2>
      <p style="font-size:15px; line-height:1.8; color:var(--text); margin-bottom:16px;">
        <code>java.util.TreeMap</code> అనేది <code>NavigableMap</code> ఇంటర్‌ఫేస్‌ను అమలు చేస్తుంది. ఇది కీలను ఎల్లప్పుడూ సార్ట్ చేసి ఉంచుతుంది. దీని కోసం కీ తప్పనిసరిగా <code>Comparable</code> ఇంటర్‌ఫేస్‌ను ఇంప్లిమెంట్ చేసి ఉండాలి, లేదా మనం కన్‌స్ట్రక్టర్‌లో స్వయంగా ఒక <code>Comparator</code> లాంబ్డాను పాస్ చేయాలి.
      </p>
      <p style="font-size:15px; line-height:1.8; color:var(--text); margin-bottom:16px;">
        శోధన సమయం <code>O(log N)</code> అయినప్పటికీ, తేదీల ఆధారంగా క్రమబద్ధీకరించిన రిపోర్టులు, ధరల శ్రేణులు (Price Brackets), మరియు క్రమబద్ధీకరించిన ఆర్థిక ఖాతాల లెడ్జర్‌లలో TreeMap ఒక అత్యుత్తమ ఎంపిక.
      </p>
    </section>

    <!-- SECTION 9: CODE BLOCK 2 -->
    <section id="sec-9" style="margin-top:40px;">
      <h2 style="font-size:24px; font-weight:800; color:var(--text); border-bottom:2px solid #e2e8f0; padding-bottom:10px; margin-bottom:18px;">
        9. ప్రాక్టికల్ కోడ్: HashMap Collisions &amp; LRU Cache డెమో
      </h2>
      <p style="font-size:15px; line-height:1.8; color:var(--text); margin-bottom:16px;">
        ఈ సమగ్ర డెమోలో ఉద్దేశపూర్వకంగా ఒకే హాష్‌కోడ్ ఇచ్చే కస్టమ్ కీలను ఉపయోగించి HashMap కొలీజన్‌లను ఎలా తట్టుకుంటుందో, అలాగే LinkedHashMap తో 3 ఐటెమ్ల కెపాసిటీ గల LRU క్యాష్ ఎలా పాత వస్తువులను ఆటోమేటిక్‌గా తొలగిస్తుందో లైవ్‌గా చూడండి.
      </p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">☕ Java — HashMapCollisionAndTreeificationDemo.java</span>
          <div class="code-actions" style="display:flex; gap:8px;">
            <button class="copy-btn" onclick="copyCodeSnippet(this)" style="background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.2); color:#ffffff; border-radius:6px; padding:4px 10px; font-size:11px; font-weight:600; cursor:pointer;">📋 Copy Code</button>
            <button class="run-btn" onclick="runInJavaCompiler(this)" style="background:#047857; border:none; color:#ffffff; border-radius:6px; padding:4px 12px; font-size:11px; font-weight:700; cursor:pointer;">▶ Run in Java Compiler</button>
          </div>
        </div>
        <pre><code class="language-java">import java.util.*;

public class HashMapCollisionAndTreeificationDemo {

    // ఉద్దేశపూర్వకంగా ఒకే స్థిరమైన హాష్‌కోడ్ (Zero) ఇచ్చే బ్యాడ్ కీ క్లాస్
    static class BadHashKey implements Comparable&lt;BadHashKey&gt; {
        final String keyName;
        final int id;

        public BadHashKey(String keyName, int id) {
            this.keyName = keyName;
            this.id = id;
        }

        @Override
        public int hashCode() {
            return 42; // ప్రతి ఆబ్జెక్టుకు ఒకే స్థిరమైన హాష్‌కోడ్! తీవ్రమైన కొలీజన్!
        }

        @Override
        public boolean equals(Object obj) {
            if (this == obj) return true;
            if (!(obj instanceof BadHashKey other)) return false;
            return this.id == other.id &amp;&amp; Objects.equals(this.keyName, other.keyName);
        }

        @Override
        public int compareTo(BadHashKey o) {
            return Integer.compare(this.id, o.id);
        }

        @Override
        public String toString() {
            return keyName + "(id=" + id + ")";
        }
    }

    public static void main(String[] args) {
        System.out.println("=== 1. HASH COLLISION &amp; BUCKET CHAINING TEST ===");
        Map&lt;BadHashKey, String&gt; collisionMap = new HashMap&lt;&gt;();

        // 10 ఎలిమెంట్లను ఒకే బకెట్ ఇండెక్స్‌లోకి బలవంతంగా ఇన్సర్ట్ చేస్తున్నాం
        for (int i = 1; i &lt;= 10; i++) {
            collisionMap.put(new BadHashKey("KeyItem", i), "Payload-Data-" + i);
        }
        System.out.println("మొత్తం ఇన్సర్ట్ చేయబడిన కొలీజన్ ఎలిమెంట్లు: " + collisionMap.size());

        // హాష్‌కోడ్ ఒకటే అయినా equals() సరిగ్గా ఉండటం వల్ల సరైన డేటా లభిస్తుంది
        BadHashKey searchKey = new BadHashKey("KeyItem", 7);
        String foundValue = collisionMap.get(searchKey);
        System.out.println("Search Key [KeyItem, id=7] లభించిన డేటా: " + foundValue);

        System.out.println("\n=== 2. LINKEDHASHMAP LRU CACHE (MAX 3 ITEMS) ===");
        // 3 ఎంట్రీలు మించగానే అతి తక్కువగా వాడిన ఎంట్రీని ఆటోమేటిక్‌గా తొలగించే LRU క్యాష్
        Map&lt;String, String&gt; lruCache = new LinkedHashMap&lt;&gt;(16, 0.75f, true) {
            @Override
            protected boolean removeEldestEntry(Map.Entry&lt;String, String&gt; eldest) {
                return size() &gt; 3; // పరిమితి 3 ఐటెమ్స్
            }
        };

        lruCache.put("token1", "User-Balaji");
        lruCache.put("token2", "User-Suresh");
        lruCache.put("token3", "User-Kavitha");
        System.out.println("ప్రారంభ క్యాష్ (3 ఐటెమ్స్): " + lruCache.keySet());

        // token1 ను యాక్సెస్ చేస్తున్నాం (దీనివల్ల ఇది ఇటీవల వాడినదిగా మారి చివరికి వెళుతుంది)
        lruCache.get("token1");
        System.out.println("token1 ను యాక్సెస్ చేసిన తర్వాత ఆర్డర్: " + lruCache.keySet());

        // ఇప్పుడు 4వ ఐటెమ్‌ను ఇన్సర్ట్ చేస్తున్నాం (అప్పుడు అతి పాతదైన token2 ఆటోమేటిక్‌గా తొలగిపోతుంది)
        lruCache.put("token4", "User-Ramesh");
        System.out.println("కొత్త token4 చేర్చిన తర్వాత క్యాష్: " + lruCache.keySet());
        System.out.println("token2 తొలగించబడిందా? " + (!lruCache.containsKey("token2")));
    }
}</code></pre>
      </div>

      <div class="code-output-card">
        <div class="output-header">💻 Program Terminal Output:</div>
        <pre class="output-content">=== 1. HASH COLLISION &amp; BUCKET CHAINING TEST ===
మొత్తం ఇన్సర్ట్ చేయబడిన కొలీజన్ ఎలిమెంట్లు: 10
Search Key [KeyItem, id=7] లభించిన డేటా: Payload-Data-7

=== 2. LINKEDHASHMAP LRU CACHE (MAX 3 ITEMS) ===
ప్రారంభ క్యాష్ (3 ఐటెమ్స్): [token1, token2, token3]
token1 ను యాక్సెస్ చేసిన తర్వాత ఆర్డర్: [token2, token3, token1]
కొత్త token4 చేర్చిన తర్వాత క్యాష్: [token3, token1, token4]
token2 తొలగించబడిందా? true</pre>
      </div>
    </section>

    <!-- SECTION 10: CAPSTONE CODE BLOCK 3 -->
    <section id="sec-10" style="margin-top:40px;">
      <h2 style="font-size:24px; font-weight:800; color:var(--text); border-bottom:2px solid #e2e8f0; padding-bottom:10px; margin-bottom:18px;">
        10. క్యాప్‌స్టోన్ ప్రాజెక్ట్: Enterprise User Session &amp; Permission Cache Engine
      </h2>
      <p style="font-size:15px; line-height:1.8; color:var(--text); margin-bottom:16px;">
        ఒక వాస్తవ ఎంటర్‌ప్రైజ్ క్లౌడ్ అప్లికేషన్‌లో (ఉదాహరణకు AWS Cognito లేదా Spring Security గేట్‌వేలో), యూజర్ అనుమతులు (Role Permissions) డూప్లికేట్ కాకుండా <code>Set</code> లో భద్రపరచాలి, అలాగే లాగిన్ సెషన్లను వేగంగా ధృవీకరించడానికి <code>Map</code> క్యాష్ అవసరం. ఈ క్రింది ఆర్కిటెక్చర్‌లో జావా రికార్డ్స్, <code>Set</code> మరియు <code>Map</code> లను కలిపి పూర్తి స్థాయి సెక్యూరిటీ ఇంజిన్‌ను నిర్మించాం:
      </p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">☕ Java — EnterpriseUserSessionCacheEngine.java</span>
          <div class="code-actions" style="display:flex; gap:8px;">
            <button class="copy-btn" onclick="copyCodeSnippet(this)" style="background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.2); color:#ffffff; border-radius:6px; padding:4px 10px; font-size:11px; font-weight:600; cursor:pointer;">📋 Copy Code</button>
            <button class="run-btn" onclick="runInJavaCompiler(this)" style="background:#047857; border:none; color:#ffffff; border-radius:6px; padding:4px 12px; font-size:11px; font-weight:700; cursor:pointer;">▶ Run in Java Compiler</button>
          </div>
        </div>
        <pre><code class="language-java">import java.time.Instant;
import java.util.*;

public class EnterpriseUserSessionCacheEngine {

    // ఆధునిక Java 21 ఇమ్యూటబుల్ రికార్డ్: యూజర్ సెషన్ వివరాలు
    public record UserSession(
        String sessionId,
        String username,
        String role,
        Set&lt;String&gt; permissions,
        Instant createdAt
    ) {}

    // ఎంటర్‌ప్రైజ్ లెవల్ సెషన్ అడ్మినిస్ట్రేటర్
    public static class SessionRegistry {
        // Fast O(1) Session Lookup Cache
        private final Map&lt;String, UserSession&gt; activeSessions = new HashMap&lt;&gt;();
        
        // యూజర్ పేరు ఆధారంగా వారి అన్ని యాక్టివ్ సెషన్లను ట్రాక్ చేసే మ్యాప్
        private final Map&lt;String, Set&lt;String&gt;&gt; userToSessionIndex = new HashMap&lt;&gt;();

        // 1. కొత్త సెషన్‌ను నమోదు చేయడం
        public void registerSession(String username, String role, Set&lt;String&gt; incomingRoles) {
            String sessionId = "SESS-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
            
            // HashSet ద్వారా రోల్ పర్మిషన్లలో ఏ విధమైన డూప్లికేట్లు లేకుండా చేయడం
            Set&lt;String&gt; sanitizedPermissions = new HashSet&lt;&gt;(incomingRoles);
            
            UserSession session = new UserSession(sessionId, username, role, sanitizedPermissions, Instant.now());
            activeSessions.put(sessionId, session);

            // Java 8 computeIfAbsent తో యూజర్ ఇండెక్స్‌ను అప్‌డేట్ చేయడం
            userToSessionIndex.computeIfAbsent(username, k -&gt; new HashSet&lt;&gt;()).add(sessionId);

            System.out.printf("✅ [REGISTERED] User: %-10s | Session: %s | Permissions: %s%n", 
                username, sessionId, sanitizedPermissions);
        }

        // 2. సెషన్ టోకెన్‌ను ప్రామాణీకరించడం &amp; అనుమతిని పరిశీలించడం
        public boolean authorize(String sessionId, String requiredPermission) {
            UserSession session = activeSessions.get(sessionId);
            if (session == null) {
                System.out.println("❌ [DENIED] చెల్లని సెషన్ ఐడీ: " + sessionId);
                return false;
            }
            
            boolean hasAccess = session.permissions().contains(requiredPermission);
            System.out.printf("🔍 [AUTH CHECK] User: %-10s | Req: %-15s | Granted: %b%n", 
                session.username(), requiredPermission, hasAccess);
            return hasAccess;
        }

        // 3. యూజర్ లాగౌట్ లేదా ఫోర్స్ ఎక్స్‌పైరీ
        public void revokeUserSessions(String username) {
            Set&lt;String&gt; sessions = userToSessionIndex.remove(username);
            if (sessions != null) {
                for (String sid : sessions) {
                    activeSessions.remove(sid);
                }
                System.out.println("🚫 [REVOKED] యూజర్ '" + username + "' యొక్క " + sessions.size() + " సెషన్‌లు క్లోజ్ చేయబడ్డాయి.");
            }
        }

        public void printTelemetry() {
            System.out.println("\n📊 --- REAL-TIME ENGINE TELEMETRY ---");
            System.out.println("యాక్టివ్ సెషన్ల మొత్తం సంఖ్య (Total Active Sessions): " + activeSessions.size());
            System.out.println("యాక్టివ్ యూజర్ల సంఖ్య (Active Distinct Users): " + userToSessionIndex.size());
        }
    }

    public static void main(String[] args) {
        System.out.println("=== ENTERPRISE CLOUD AUTH &amp; SESSION ENGINE ===");
        SessionRegistry authEngine = new SessionRegistry();

        // డూప్లికేట్ పర్మిషన్లతో కూడిన ఇన్కమింగ్ డేటా
        Set&lt;String&gt; adminPerms = new HashSet&lt;&gt;(List.of("READ", "WRITE", "DELETE", "READ", "AUDIT"));
        Set&lt;String&gt; userPerms = new HashSet&lt;&gt;(List.of("READ", "READ", "PROFILE_EDIT"));

        // సెషన్లను రిజిస్టర్ చేయడం
        authEngine.registerSession("balaji_lead", "ADMIN", adminPerms);
        authEngine.registerSession("balaji_lead", "ADMIN", adminPerms); // రెండవ పరికరం నుండి లాగిన్
        authEngine.registerSession("kavitha_dev", "USER", userPerms);

        authEngine.printTelemetry();

        // మొదటి యాక్టివ్ సెషన్‌ను వెతకడం
        String sampleAdminSession = authEngine.activeSessions.keySet().iterator().next();
        System.out.println("\n--- AUTHORIZATION AUDIT ---");
        authEngine.authorize(sampleAdminSession, "DELETE");
        authEngine.authorize(sampleAdminSession, "SUPER_ROOT_KILL");

        // యూజర్ సెషన్లను రద్దు చేయడం
        System.out.println("\n--- LOGOUT OPERATION ---");
        authEngine.revokeUserSessions("balaji_lead");
        authEngine.printTelemetry();
    }
}</code></pre>
      </div>

      <div class="code-output-card">
        <div class="output-header">💻 Program Terminal Output:</div>
        <pre class="output-content">=== ENTERPRISE CLOUD AUTH &amp; SESSION ENGINE ===
✅ [REGISTERED] User: balaji_lead | Session: SESS-4D9A1F82 | Permissions: [AUDIT, READ, WRITE, DELETE]
✅ [REGISTERED] User: balaji_lead | Session: SESS-C71E0B34 | Permissions: [AUDIT, READ, WRITE, DELETE]
✅ [REGISTERED] User: kavitha_dev | Session: SESS-98B22A10 | Permissions: [READ, PROFILE_EDIT]

📊 --- REAL-TIME ENGINE TELEMETRY ---
యాక్టివ్ సెషన్ల మొత్తం సంఖ్య (Total Active Sessions): 3
యాక్టివ్ యూజర్ల సంఖ్య (Active Distinct Users): 2

--- AUTHORIZATION AUDIT ---
🔍 [AUTH CHECK] User: balaji_lead | Req: DELETE          | Granted: true
🔍 [AUTH CHECK] User: balaji_lead | Req: SUPER_ROOT_KILL | Granted: false

--- LOGOUT OPERATION ---
🚫 [REVOKED] యూజర్ 'balaji_lead' యొక్క 2 సెషన్‌లు క్లోజ్ చేయబడ్డాయి.

📊 --- REAL-TIME ENGINE TELEMETRY ---
యాక్టివ్ సెషన్ల మొత్తం సంఖ్య (Total Active Sessions): 1
యాక్టివ్ యూజర్ల సంఖ్య (Active Distinct Users): 1</pre>
      </div>
    </section>

    <!-- SECTION 11 -->
    <section id="sec-11" style="margin-top:40px;">
      <h2 style="font-size:24px; font-weight:800; color:var(--text); border-bottom:2px solid #e2e8f0; padding-bottom:10px; margin-bottom:18px;">
        11. ప్రొడక్షన్ పిట్‌ఫాల్స్ &amp; ఆంటీ-పాటర్న్స్ (5 Critical Production Traps)
      </h2>
      <div style="display:flex; flex-direction:column; gap:16px;">
        <div style="background:#ffffff; border:1px solid #fed7aa; border-left:5px solid #f97316; padding:16px; border-radius:8px;">
          <h4 style="margin:0 0 6px 0; color:#c2410c; font-size:15px; font-weight:800;">1. The Broken equals &amp; hashCode Contract (తీవ్రమైన మెమరీ లీక్)</h4>
          <p style="margin:0; font-size:14px; line-height:1.7; color:#334155;">
            ఎట్టి పరిస్థితుల్లోనూ కేవలం <code>equals()</code> ను మాత్రమే ఓవర్‌రైడ్ చేసి <code>hashCode()</code> ను విస్మరించకూడదు! అలా చేస్తే రెండు సమానమైన ఆబ్జెక్టులు వేర్వేరు హాష్‌కోడ్‌లను పొంది వేర్వేరు బకెట్లలో పడతాయి. ఫలితంగా <code>map.get(key)</code> ఎప్పటికీ <code>null</code> రిటర్న్ చేస్తుంది. ఆధునిక జావాలో ఎల్లప్పుడూ <strong>Java 14+ Record</strong> ను ఉపయోగించండి లేదా IDE సహాయంతో రెండింటినీ కలిపి జనరేట్ చేయండి.
          </p>
        </div>

        <div style="background:#ffffff; border:1px solid #fed7aa; border-left:5px solid #f97316; padding:16px; border-radius:8px;">
          <h4 style="margin:0 0 6px 0; color:#c2410c; font-size:15px; font-weight:800;">2. Mutable Objects as Keys in HashMap (మ్యుటబుల్ కీ ట్రాప్)</h4>
          <p style="margin:0; font-size:14px; line-height:1.7; color:#334155;">
            ఒక కస్టమ్ ఆబ్జెక్ట్‌ను HashMap లో కీగా పెట్టిన తర్వాత, దానిలోని ఫీల్డ్‌లను మార్చకూడదు (Do not mutate key fields). ఫీల్డ్ మారితే దాని <code>hashCode()</code> మారిపోతుంది. కానీ అది పాత బకెట్‌లోనే ఉండిపోతుంది! ఫలితంగా ఆబ్జెక్ట్ మ్యాప్‌లోనే ఉన్నప్పటికీ <code>map.get()</code> ద్వారా దాన్ని ఎప్పటికీ వెతకలేము! కీలుగా ఎల్లప్పుడూ <code>String</code>, <code>Integer</code>, లేదా ఇమ్యూటబుల్ రికార్డులనే వాడాలి.
          </p>
        </div>

        <div style="background:#ffffff; border:1px solid #fed7aa; border-left:5px solid #f97316; padding:16px; border-radius:8px;">
          <h4 style="margin:0 0 6px 0; color:#c2410c; font-size:15px; font-weight:800;">3. Modifying Collections during Iteration (ConcurrentModificationException)</h4>
          <p style="margin:0; font-size:14px; line-height:1.7; color:#334155;">
            ఫర్-ఈచ్ లూప్ <code>for (String key : map.keySet())</code> లో తిరుగుతున్నప్పుడు <code>map.remove(key)</code> చేయకూడదు. ఇది తక్షణమే క్రాష్ అవుతుంది. ఎలిమెంట్లను తొలగించాలంటే ఎల్లప్పుడూ <code>iterator.remove()</code> లేదా Java 8 <code>removeIf()</code> ని మాత్రమే వాడాలి.
          </p>
        </div>

        <div style="background:#ffffff; border:1px solid #fed7aa; border-left:5px solid #f97316; padding:16px; border-radius:8px;">
          <h4 style="margin:0 0 6px 0; color:#c2410c; font-size:15px; font-weight:800;">4. Multithreaded HashMap Corruption (Deadlock Trap)</h4>
          <p style="margin:0; font-size:14px; line-height:1.7; color:#334155;">
            బహుళ థ్రెడ్‌లు (Multi-threading) ఉన్నప్పుడు సాధారణ <code>HashMap</code> ను ఎప్పుడూ వాడకూడదు. రీహాషింగ్ సమయంలో సర్క్యులర్ లింక్ ఏర్పడి CPU 100% కి చేరి అప్లికేషన్ హ్యాంగ్ అయ్యే ప్రమాదం ఉంది. మల్టీ-థ్రెడెడ్ ఎన్విరాన్‌మెంట్‌లో తప్పనిసరిగా <code>ConcurrentHashMap</code> నే వాడాలి.
          </p>
        </div>

        <div style="background:#ffffff; border:1px solid #fed7aa; border-left:5px solid #f97316; padding:16px; border-radius:8px;">
          <h4 style="margin:0 0 6px 0; color:#c2410c; font-size:15px; font-weight:800;">5. Inserting Null into TreeSet / TreeMap</h4>
          <p style="margin:0; font-size:14px; line-height:1.7; color:#334155;">
            HashSet మరియు HashMap లలో గరిష్టంగా ఒక <code>null</code> కీని అనుమతిస్తారు. కానీ <code>TreeSet</code> లేదా <code>TreeMap</code> లలో <code>null</code> ను ఇన్సర్ట్ చేయడానికి ప్రయత్నిస్తే, అది ఇతరులతో పోల్చడానికి <code>null.compareTo()</code> ని పిలిచి తక్షణమే <strong>NullPointerException</strong> ను విసురుతుంది!
          </p>
        </div>
      </div>
    </section>

    <!-- SECTION 12 -->
    <section id="sec-12" style="margin-top:40px;">
      <h2 style="font-size:24px; font-weight:800; color:var(--text); border-bottom:2px solid #e2e8f0; padding-bottom:10px; margin-bottom:18px;">
        12. ఇంటర్వ్యూ క్విజ్ &amp; సెల్ఫ్-టెస్ట్ (5 Deep Interview Practice Quizzes)
      </h2>
      <p style="font-size:15px; line-height:1.8; color:var(--text); margin-bottom:20px;">
        సెట్ మరియు మ్యాప్ ఆర్కిటెక్చర్‌పై మీకున్న అవగాహనను ఈ 5 లోతైన ప్రాక్టికల్ ప్రశ్నలతో పరీక్షించుకోండి. సమాధానం కోసం ప్రశ్నపై క్లిక్ చేయండి:
      </p>

      <div style="display:flex; flex-direction:column; gap:14px;">
        <details style="background:#ffffff; border:1px solid #e2e8f0; border-radius:8px; padding:14px 18px; cursor:pointer;">
          <summary style="font-weight:700; color:#0f172a; font-size:14.5px;">
            ప్రశ్న 1: HashMap అంతర్గతంగా డేటాను ఎలా స్టోర్ చేస్తుంది? Java 8 లో వచ్చిన కీలకమైన మార్పు ఏమిటి?
          </summary>
          <p style="margin:12px 0 0 0; font-size:14px; line-height:1.7; color:#334155;">
            <strong>సమాధానం:</strong> HashMap అంతర్గతంగా <code>Node&lt;K,V&gt;[]</code> అనే బకెట్ ఎరేను ఉపయోగిస్తుంది. కీ యొక్క <code>hashCode()</code> ఆధారంగా బకెట్ ఇండెక్స్ నిర్ణయించబడుతుంది. ఒకే బకెట్‌లో కొలీజన్లు వస్తే Java 7 వరకు సింగ్లీ లింక్డ్ లిస్ట్‌గా భద్రపరిచేవారు. అయితే Java 8 లో ఒక బకెట్‌లోని ఎలిమెంట్లు 8 దాటితే (TREEIFY_THRESHOLD = 8), ఆ లింక్డ్ లిస్ట్ ఒక <strong>Red-Black Balanced Tree</strong> గా మారుతుంది. దీనివల్ల లుకప్ సమయం <code>O(N)</code> నుండి <code>O(log N)</code> కి వేగవంతం అవుతుంది.
          </p>
        </details>

        <details style="background:#ffffff; border:1px solid #e2e8f0; border-radius:8px; padding:14px 18px; cursor:pointer;">
          <summary style="font-weight:700; color:#0f172a; font-size:14.5px;">
            ప్రశ్న 2: equals() మరియు hashCode() కాంట్రాక్ట్ నియమాలు ఏమిటి? ఉల్లంఘిస్తే ఏమవుతుంది?
          </summary>
          <p style="margin:12px 0 0 0; font-size:14px; line-height:1.7; color:#334155;">
            <strong>సమాధానం:</strong> నియమం 1: రెండు ఆబ్జెక్టులు <code>equals()</code> ప్రకారం సమానమైతే, వాటి <code>hashCode()</code> లు కూడా తప్పనిసరిగా సమానమై ఉండాలి. నియమం 2: రెండు ఆబ్జెక్టుల హాష్‌కోడ్‌లు సమానమైనంత మాత్రాన అవి equals కానవసరం లేదు (దానినే కొలీజన్ అంటారు). ఈ కాంట్రాక్ట్‌ను ఉల్లంఘిస్తే, HashMap లో ఒక ఆబ్జెక్ట్‌ను స్టోర్ చేసిన తర్వాత తిరిగి <code>get()</code> చేసినప్పుడు అది వేరొక బకెట్‌లో వెతికి <code>null</code> అని ఇస్తుంది.
          </p>
        </details>

        <details style="background:#ffffff; border:1px solid #e2e8f0; border-radius:8px; padding:14px 18px; cursor:pointer;">
          <summary style="font-weight:700; color:#0f172a; font-size:14.5px;">
            ప్రశ్న 3: HashSet అంతర్గతంగా ఎలా ఇంప్లిమెంట్ చేయబడింది?
          </summary>
          <p style="margin:12px 0 0 0; font-size:14px; line-height:1.7; color:#334155;">
            <strong>సమాధానం:</strong> <code>HashSet</code> స్వతంత్ర డేటా స్ట్రక్చర్ కాదు; అది ఒక <code>HashMap</code> ఆబ్జెక్ట్‌ను రాపర్ (Wrapper) గా కలిగి ఉంటుంది. మనం సెట్‌లో యాడ్ చేసే ప్రతి ఎలిమెంట్ HashMap యొక్క <strong>Key</strong> గా కూర్చుంటుంది, మరియు దానికి అసోసియేట్ అయ్యే విలువగా ఒక స్థిరమైన డమ్మీ ఆబ్జెక్ట్ (<code>private static final Object PRESENT = new Object();</code>) స్టోర్ అవుతుంది.
          </p>
        </details>

        <details style="background:#ffffff; border:1px solid #e2e8f0; border-radius:8px; padding:14px 18px; cursor:pointer;">
          <summary style="font-weight:700; color:#0f172a; font-size:14.5px;">
            ప్రశ్న 4: HashMap, LinkedHashMap, మరియు TreeMap ల మధ్య తేడా ఏమిటి?
          </summary>
          <p style="margin:12px 0 0 0; font-size:14px; line-height:1.7; color:#334155;">
            <strong>సమాధానం:</strong> 1) <strong>HashMap:</strong> అత్యంత వేగవంతమైనది (O(1)), కానీ ఎలిమెంట్ల క్రమం (Ordering) ఏదీ ఉండదు. 2) <strong>LinkedHashMap:</strong> O(1) వేగంతో పాటు ఇన్సర్షన్ ఆర్డర్ లేదా యాక్సెస్ ఆర్డర్ (LRU) ను డబుల్ లింక్డ్ లిస్ట్ ద్వారా కాపాడుతుంది. 3) <strong>TreeMap:</strong> రెడ్-బ్లాక్ ట్రీ ద్వారా కీలను ఎల్లప్పుడూ ఆరోహణ క్రమంలో (Natural/Comparator Order) క్రమబద్ధీకరిస్తుంది (O(log N)).
          </p>
        </details>

        <details style="background:#ffffff; border:1px solid #e2e8f0; border-radius:8px; padding:14px 18px; cursor:pointer;">
          <summary style="font-weight:700; color:#0f172a; font-size:14.5px;">
            ప్రశ్న 5: HashMap లో లోడ్ ఫ్యాక్టర్ (0.75) మరియు రీహాషింగ్ (Rehashing) అంటే ఏమిటి?
          </summary>
          <p style="margin:12px 0 0 0; font-size:14px; line-height:1.7; color:#334155;">
            <strong>సమాధానం:</strong> <code>Load Factor (డిఫాల్ట్ 0.75)</code> అనేది బకెట్లు ఎంత శాతం నిండినప్పుడు ఎరే సైజును పెంచాలో నిర్ణయించే నిష్పత్తి. 16 బకెట్లలో 12 నిండగానే (16 * 0.75 = 12), HashMap తన బకెట్ కెపాసిటీని రెట్టింపు చేస్తుంది (16 నుండి 32 కి). ఆ తర్వాత ఇప్పటికే ఉన్న నోడ్లను కొత్త ఇండెక్స్‌లకు తిరిగి లెక్కించి అమర్చడాన్ని <strong>Rehashing</strong> అంటారు.
          </p>
        </details>
      </div>
    </section>

    <!-- NEXT / PREV NAVIGATION BUTTONS -->
    <div style="display:flex; justify-content:space-between; align-items:center; gap:16px; margin:48px 0 24px 0; flex-wrap:wrap;">
      <a href="/blog-java/21-java-collections-list-arraylist-linkedlist.html" style="background:var(--bg2); border:1px solid var(--border); color:var(--text); padding:12px 22px; border-radius:8px; text-decoration:none; font-weight:700; font-size:14px; display:inline-flex; align-items:center; gap:8px;">
        ← మునుపటి పాఠం: 21. List: ArrayList &amp; LinkedList
      </a>
      <a href="/blog-java/23-java-generics-and-type-safety.html" style="background:#facc15; border:1px solid #eab308; color:#121212; padding:12px 24px; border-radius:8px; text-decoration:none; font-weight:800; font-size:14px; display:inline-flex; align-items:center; gap:8px; box-shadow:0 2px 10px rgba(234, 179, 8, 0.25);">
        తర్వాతి పాఠం: 23. Generics &amp; Type Safety →
      </a>
    </div>
  </main>
</div>

<script src="/site-nav.js"></script>
</body>
</html>`;

const outPath = path.join(__dirname, '..', 'public', 'blog-java', '22-java-collections-set-and-map-deep-dive.html');
fs.writeFileSync(outPath, chapter22Content, 'utf8');

console.log('✅ Successfully regenerated Java Chapter 22 with standard layout and syntax-highlighted code blocks!');
console.log('Target file size:', chapter22Content.length, 'characters');
