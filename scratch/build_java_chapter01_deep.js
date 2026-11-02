const fs = require('fs');
const path = require('path');
const { LESSONS, buildJavaSidebar } = require('./java_curriculum_data.js');

const currentLesson = LESSONS.find(l => l.num === 1);

const chapter01Content = `<!DOCTYPE html>
<html lang="te" class="lang-java light-theme">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>01. జావా పరిచయం, ఫీచర్లు &amp; JVM ఆర్కిటెక్చర్ | Modern Java 21+ Masterclass</title>
  <meta name="description" content="జావా పరిచయం, ఫీచర్లు &amp; JVM ఆర్కిటెక్చర్ సమగ్ర తెలుగు గైడ్: James Gosling &amp; Sun Microsystems చరిత్ర, WORA కాన్సెప్ట్, JDK vs JRE vs JVM, ClassLoader Subsystem, JVM Runtime Data Areas (Heap, Stack, Metaspace), JIT Compiler, మరియు JVM Telemetry Capstone Project.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700;800&family=Noto+Sans+Telugu:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/site-nav.css">
  <link rel="stylesheet" href="/blog-style.css">
  <link rel="stylesheet" href="/blog-java/style.css">
</head>
<body class="line-numbers">

<div id="site-nav-placeholder"></div>

<div class="layout">
  ${buildJavaSidebar(1)}

  <main class="content">
    <!-- BREADCRUMB -->
    <div class="breadcrumb">
      <a href="/index.html">హోమ్</a>
      <span class="sep">›</span>
      <a href="/blog-java.html">జావా ట్యుటోరియల్స్</a>
      <span class="sep">›</span>
      <span>చాప్టర్ 01: జావా పరిచయం &amp; JVM ఆర్కిటెక్చర్</span>
    </div>

    <!-- PAGE META BADGES -->
    <div class="page-meta">
      <span class="badge badge-primary">Modern Java 21+ LTS</span>
      <span class="badge badge-secondary">చాప్టర్ 01 / 25</span>
      <span class="badge badge-outline">Phase 01: Core Basics</span>
      <span class="badge badge-success">2026 Edition</span>
    </div>

    <!-- PAGE TITLE -->
    <h1 class="page-title">01. జావా పరిచయం, ఫీచర్లు &amp; JVM ఆర్కిటెక్చర్ (Java Introduction, Features &amp; JVM Architecture)</h1>

    <!-- COVERED PILL BAR -->
    <div class="covered-bar" style="display:flex; align-items:center; gap:8px; flex-wrap:wrap; background:var(--bg2); padding:10px 16px; border-radius:8px; border:1px solid var(--border); margin:18px 0 24px; font-size:13.5px; color:var(--text2);">
      <strong style="color:var(--text);">📌 Covered in this chapter:</strong>
      <span>James Gosling &amp; Sun Microsystems హిస్టరీ</span> •
      <span>WORA ప్రిన్సిపల్</span> •
      <span>JDK vs JRE vs JVM తేడాలు</span> •
      <span>క్లాస్‌లోడర్ సబ్‌సిస్టమ్</span> •
      <span>JVM మెమరీ ఆర్కిటెక్చర్ (Heap, Stack, Metaspace)</span> •
      <span>JIT కంపైలర్ &amp; గార్బేజ్ కలెక్షన్</span> •
      <span>జావా బజ్‌వర్డ్స్</span> •
      <span>JVM Telemetry Capstone Engine</span>
    </div>

    <!-- INTRO BOX -->
    <div class="intro-box">
      జావా (Java) అనేది ప్రపంచంలోనే అత్యంత స్థిరమైన, నమ్మకమైన, మరియు ఎంటర్‌ప్రైజ్ సాఫ్ట్‌వేర్ రంగంలో దశాబ్దాలుగా తిరుగులేని ఆధిపత్యం చెలాయిస్తున్న పవర్‌ఫుల్ ఆబ్జెక్ట్-ఓరియెంటెడ్ ప్రోగ్రామింగ్ లాంగ్వేజ్. ప్రపంచవ్యాప్తంగా బ్యాంకింగ్ లావాదేవీలు (FinTech), ఇ-కామర్స్ ఆర్కిటెక్చర్లు (Amazon, Netflix, Flipkart), క్లౌడ్ నేటివ్ మైక్రోసర్వీసులు (Spring Boot, Quarkus), బిగ్ డేటా ప్లాట్‌ఫారమ్‌లు (Apache Spark, Kafka, Hadoop), మరియు ఆండ్రాయిడ్ యాప్స్ వెనుక జావా ఒక వెన్నెముకలా నిలిచింది. ఈ మొదటి అధ్యాయంలో జావా మూలాలు, <strong>"Write Once, Run Anywhere (WORA)"</strong> అనే విప్లవాత్మక కాన్సెప్ట్, మరియు జావా రన్‌టైమ్ యొక్క అత్యంత కీలకమైన గుండెకాయ — <strong>Java Virtual Machine (JVM) ఆర్కిటెక్చర్</strong> ను సమగ్రంగా, లోతైన తెలుగు వివరణలతో నేర్చుకుందాం!
    </div>

    <!-- SECTION 1 -->
    <h2 class="section-title"><span class="num">1</span> జావా ఆవిర్భావం, చరిత్ర &amp; గ్రీన్ టీమ్ ప్రస్థానం</h2>
    <p>
      1990ల ప్రారంభంలో కంప్యూటింగ్ ప్రపంచం వేగంగా మారుతోంది. పర్సనల్ కంప్యూటర్లతో పాటు స్మార్ట్ హోమ్ అప్లయన్సెస్, ఇంటరాక్టివ్ టెలివిజన్లు, మరియు కేబుల్ సెట్-టాప్ బాక్స్‌ల కోసం ఒక నమ్మకమైన, ప్లాట్‌ఫారమ్-ఇండిపెండెంట్ ప్రోగ్రామింగ్ లాంగ్వేజ్ అవసరమైంది. ఈ లక్ష్యంతో 1991లో <strong>Sun Microsystems</strong> లోని ఒక ప్రత్యేక రీసెర్చ్ ఇంజనీర్ల బృందం ఏర్పాటయింది. ఈ బృందాన్ని <strong>"Green Team"</strong> అని పిలిచేవారు.
    </p>
    <ul>
      <li><strong>ముఖ్య సృష్టికర్తలు (Key Pioneers):</strong> <strong>James Gosling</strong> (Father of Java), Mike Sheridan, మరియు Patrick Naughton.</li>
      <li><strong>మొదటి పేరు "Oak":</strong> James Gosling తన కార్యాలయం కిటికీ బయట ఉన్న అందమైన ఓక్ (Oak) చెట్టును చూసి ఈ భాషకు మొదట "Oak" అని పేరు పెట్టారు. ఓక్ చెట్టు బలానికి, స్థిరత్వానికి ప్రతీక.</li>
      <li><strong>"Java" గా రూపాంతరం:</strong> "Oak" అనే పేరు అప్పటికే ఒక వీడియో టెక్నాలజీ కంపెనీ ట్రేడ్‌మార్క్‌గా నమోదు చేయబడి ఉండటంతో, టీమ్ సభ్యులందరూ కలిసి ఆలోచించి ఇండోనేషియాలో పండే ప్రసిద్ధ కాఫీ గింజల పేరైన <strong>"Java"</strong> ను అధికారికంగా ఎంపిక చేశారు. అందుకే జావా అధికారిక లోగో ఆవిర్లు కక్కే కాఫీ కప్పు రూపంలో ఉంటుంది!</li>
      <li><strong>అధికారిక లాంచ్ (1995):</strong> మే 23, 1995న సన్ మైక్రోసిస్టమ్స్ జావాను మార్కెట్‌లోకి విడుదల చేసింది. అదే సమయంలో వచ్చిన నెట్‌స్కేప్ నావిగేటర్ వెబ్ బ్రౌజర్‌లో "Java Applets" ద్వారా ఇంటరాక్టివ్ వెబ్ పేజీలను సృష్టించడం ప్రపంచవ్యాప్తంగా డెవలపర్లను విపరీతంగా ఆకర్షించింది.</li>
      <li><strong>ఓపెన్‌సోర్స్ విప్లవం (2006):</strong> నవంబర్ 2006లో సన్ మైక్రోసిస్టమ్స్ జావాను GNU General Public License (GPL) కింద ఓపెన్‌సోర్స్ చేసింది. దీని ద్వారా <strong>OpenJDK</strong> ప్రాజెక్ట్ ప్రారంభమైంది.</li>
      <li><strong>ఒరాకిల్ స్వాధీనం (2010):</strong> జనవరి 2010లో ప్రఖ్యాత డేటాబేస్ దిగ్గజం <strong>Oracle Corporation</strong> సన్ మైక్రోసిస్టమ్స్‌ను కొనుగోలు చేసి, జావా డెవలప్‌మెంట్‌ను మరియు స్టాండర్డ్స్‌ను తన చేతుల్లోకి తీసుకుంది.</li>
    </ul>

    <!-- MILESTONE TABLE -->
    <div style="background:var(--bg2); border:1px solid var(--border); border-radius:10px; padding:18px; margin:20px 0;">
      <h4 style="margin-top:0; color:#10b981;">📜 జావా పరిణామ క్రమంలో మైలురాళ్లు (Major Java Release Milestones):</h4>
      <div style="overflow-x:auto;">
        <table style="width:100%; border-collapse:collapse; margin-top:12px; font-size:13px; text-align:left;">
          <thead>
            <tr style="border-bottom:2px solid var(--border); background:rgba(16,185,129,0.08);">
              <th style="padding:10px 12px;">వెర్షన్ (Version)</th>
              <th style="padding:10px 12px;">సంవత్సరం</th>
              <th style="padding:10px 12px;">విప్లవాత్మక ఫీచర్లు &amp; మార్పులు</th>
              <th style="padding:10px 12px;">సపోర్ట్ హోదా</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom:1px solid var(--border);">
              <td style="padding:10px 12px; font-weight:700; color:#10b981;">JDK 1.0 / 1.1</td>
              <td style="padding:10px 12px;">1996</td>
              <td style="padding:10px 12px;">కోర్ జావా విడుదల, AWT UI లైబ్రరీ, Inner Classes, JDBC డేటాబేస్ కనెక్టివిటీ, RMI.</td>
              <td style="padding:10px 12px;"><span style="color:#ef4444;">Retired</span></td>
            </tr>
            <tr style="border-bottom:1px solid var(--border);">
              <td style="padding:10px 12px; font-weight:700; color:#10b981;">J2SE 5.0 (Java 5)</td>
              <td style="padding:10px 12px;">2004</td>
              <td style="padding:10px 12px;">జెనరిక్స్ (Generics), ఎనోటేషన్స్ (@Annotations), ఆటోబాక్సింగ్/అన్‌బాక్సింగ్, ఎన్‌హాన్స్‌డ్ for-each లూప్, ఎనమ్స్ (Enums), Varargs.</td>
              <td style="padding:10px 12px;"><span style="color:#ef4444;">Legacy</span></td>
            </tr>
            <tr style="border-bottom:1px solid var(--border);">
              <td style="padding:10px 12px; font-weight:700; color:#10b981;">Java 8 (LTS)</td>
              <td style="padding:10px 12px;">2014</td>
              <td style="padding:10px 12px;">ఫంక్షనల్ ప్రోగ్రామింగ్, ల్యాంబ్డా ఎక్స్‌ప్రెషన్స్ (Lambdas), Stream API, కొత్త Date &amp; Time API, Metaspace పరిచయం (PermGen తొలగింపు).</td>
              <td style="padding:10px 12px;"><span style="color:#f59e0b;">Legacy LTS</span></td>
            </tr>
            <tr style="border-bottom:1px solid var(--border);">
              <td style="padding:10px 12px; font-weight:700; color:#10b981;">Java 11 (LTS)</td>
              <td style="padding:10px 12px;">2018</td>
              <td style="padding:10px 12px;">జావా మాడ్యూల్ సిస్టమ్ (Project Jigsaw స్టెబిలైజేషన్), లోకల్ వేరియబుల్స్ కోసం 'var' ఇన్ఫరెన్స్, కొత్త HttpClient API, Flight Recorder.</td>
              <td style="padding:10px 12px;"><span style="color:#38bdf8;">Extended LTS</span></td>
            </tr>
            <tr style="border-bottom:1px solid var(--border);">
              <td style="padding:10px 12px; font-weight:700; color:#10b981;">Java 17 (LTS)</td>
              <td style="padding:10px 12px;">2021</td>
              <td style="padding:10px 12px;">సీల్డ్ క్లాసెస్ (Sealed Classes), రికార్డ్స్ (Records - బాయిలర్‌ప్లేట్ రహిత డేటా మోడల్స్), Pattern Matching for switch, Text Blocks (\"\"\").</td>
              <td style="padding:10px 12px;"><span style="color:#10b981;">Active LTS</span></td>
            </tr>
            <tr style="border-bottom:1px solid var(--border);">
              <td style="padding:10px 12px; font-weight:700; color:#10b981;">Java 21 (LTS)</td>
              <td style="padding:10px 12px;">2023 - 2026</td>
              <td style="padding:10px 12px;">వర్చువల్ థ్రెడ్స్ (Virtual Threads - Project Loom), సీక్వెన్స్డ్ కలెక్షన్స్ (Sequenced Collections), Record Patterns, Pattern Matching for Switch పూర్తి రూపం.</td>
              <td style="padding:10px 12px;"><span style="color:#10b981; font-weight:700;">Current Modern LTS</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- SECTION 2 -->
    <h2 class="section-title"><span class="num">2</span> "Write Once, Run Anywhere (WORA)" రహస్యం &amp; ప్లాట్‌ఫారమ్ ఇండిపెండెన్స్</h2>
    <p>
      జావా ఆవిర్భావానికి ముందు, సాఫ్ట్‌వేర్ ప్రపంచంలో <strong>C</strong> మరియు <strong>C++</strong> భాషలు రాజ్యమేలేవి. అయితే వాటిలో ఒక పెద్ద సమస్య ఉండేది: అవి <strong>Platform Dependent</strong>. మీరు ఒక C ప్రోగ్రామ్‌ను Windows ఆపరేటింగ్ సిస్టమ్‌లో రాసి కంపైల్ చేస్తే, ఆ కంపైలర్ విండోస్ మరియు ఇంటెల్ ప్రాసెసర్‌కు మాత్రమే అర్థమయ్యే బైనరీ మెషిన్ కోడ్‌ను (<code>.exe</code> ఫైల్) తయారు చేస్తుంది. అదే ఫైల్‌ను మీరు Linux లేదా macOS సర్వర్‌లో రన్ చేయలేరు. అక్కడ రన్ చేయాలంటే, ఆ కోడ్‌ను మళ్లీ లైనక్స్ కంపైలర్‌తో తిరిగి కంపైల్ చేయాలి!
    </p>
    <p>
      ఈ సమస్యను శాశ్వతంగా పరిష్కరించడానికి James Gosling <strong>"Write Once, Run Anywhere (WORA)"</strong> సూత్రాన్ని ప్రతిపాదించారు:
    </p>

    <!-- ARCHITECTURE DIAGRAM (PRE-FORMATTED VISUAL BLOCK) -->
    <div style="background:var(--bg2); border:1px solid var(--border); border-radius:10px; padding:20px; margin:20px 0; font-family:'Fira Code', monospace; font-size:12.5px; line-height:1.6; color:var(--text);">
      <div style="color:#10b981; font-weight:700; margin-bottom:12px; font-family:'Inter', sans-serif; font-size:14px;">
        🏛️ C/C++ (Platform Dependent) vs Java (Platform Independent WORA):
      </div>
<span style="color:#ef4444;">[C/C++ మోడల్]</span>
Source Code (.cpp)  ──[ C++ Compiler ]──&gt;  Machine Code (.exe for x86 Windows Only)
                                                 └──❌ Linux లేదా Mac లో రన్ కాదు!

<span style="color:#10b981;">[జావా WORA మోడల్]</span>
Source Code (.java) ──[ javac Compiler ]──&gt;  Bytecode (.class) (Platform Neutral)
                                                  │
         ┌────────────────────────────────────────┼────────────────────────────────────────┐
         ▼                                        ▼                                        ▼
   [ Windows JVM ]                          [ Linux JVM ]                           [ macOS JVM ]
         │                                        │                                        │
         ▼                                        ▼                                        ▼
Windows Machine Code                      Linux Machine Code                       macOS Machine Code
    </div>

    <p>
      పై చిత్రంలో మీరు స్పష్టంగా గమనించవచ్చు:
    </p>
    <ul>
      <li><strong>జావా కంపైలర్ (<code>javac</code>):</strong> మీరు రాసిన మానవ-పఠనీయమైన జావా కోడ్‌ను నేరుగా హార్డ్‌వేర్ మెషిన్ కోడ్‌గా మార్చదు! దానికి బదులుగా మధ్యంతర ప్లాట్‌ఫారమ్-న్యూట్రల్ కోడైన <strong>Bytecode (<code>.class</code> ఫైల్)</strong> గా కంపైల్ చేస్తుంది.</li>
      <li><strong>బైట్‌కోడ్ స్వభావం:</strong> బైట్‌కోడ్ ఏ నిర్దిష్ట హార్డ్‌వేర్ చిప్‌కు లేదా ఆపరేటింగ్ సిస్టమ్‌కు సంబంధించినది కాదు. ఇది ఒక కాల్పనిక కంప్యూటర్ (Virtual Computer) కి అర్థమయ్యే ఆదేశాల సమాహారం.</li>
      <li><strong>కీలకమైన సత్యం:</strong> <em>"Java Language is Platform-Independent, but Java Virtual Machine (JVM) is Platform-Dependent!"</em> — అంటే, విండోస్‌లో తయారైన అదే <code>.class</code> బైట్‌కోడ్ ఫైల్ లైనక్స్, మ్యాక్, సోలారిస్ లేదా రాస్ప్‌బెర్రీ పై పై ఎక్కడైనా నడుస్తుంది. కానీ ఆయా ఆపరేటింగ్ సిస్టమ్‌లకు తగిన ప్రత్యేక JVM (Windows JVM, Linux JVM, Mac JVM) వాటిలో ఇన్‌స్టాల్ అయి ఉండాలి!</li>
    </ul>

    <!-- COMPARISON TABLE: C++ VS JAVA VS PYTHON -->
    <div style="overflow-x:auto; margin:20px 0;">
      <table style="width:100%; border-collapse:collapse; font-size:13.5px; text-align:left;">
        <thead>
          <tr style="background:var(--bg2); border-bottom:2px solid var(--border);">
            <th style="padding:10px 14px;">లక్షణం / పారామీటర్</th>
            <th style="padding:10px 14px;">C / C++</th>
            <th style="padding:10px 14px;">Python</th>
            <th style="padding:10px 14px;">Modern Java (Java 21+)</th>
          </tr>
        </thead>
        <tbody>
          <tr style="border-bottom:1px solid var(--border);">
            <td style="padding:10px 14px; font-weight:700;">ఎగ్జిక్యూషన్ మోడల్</td>
            <td style="padding:10px 14px;">ప్యూర్ కంపైల్డ్ (Ahead-of-Time to Machine Code)</td>
            <td style="padding:10px 14px;">ప్యూర్ ఇంటర్‌ప్రీటెడ్ (CPython PVM)</td>
            <td style="padding:10px 14px; color:#10b981; font-weight:700;">హైబ్రిడ్ (Bytecode Compilation + JIT Native Execution)</td>
          </tr>
          <tr style="border-bottom:1px solid var(--border);">
            <td style="padding:10px 14px; font-weight:700;">ప్లాట్‌ఫారమ్ ఇండిపెండెన్స్</td>
            <td style="padding:10px 14px; color:#ef4444;">లేదు (Platform Dependent)</td>
            <td style="padding:10px 14px;">అవును (ఇంటర్‌ప్రీటర్ ద్వారా)</td>
            <td style="padding:10px 14px; color:#10b981; font-weight:700;">పూర్తిగా అవును (WORA via JVM)</td>
          </tr>
          <tr style="border-bottom:1px solid var(--border);">
            <td style="padding:10px 14px; font-weight:700;">మెమరీ నిర్వహణ</td>
            <td style="padding:10px 14px;">మాన్యువల్ (malloc/free, new/delete - లీక్స్ ప్రమాదం)</td>
            <td style="padding:10px 14px;">ఆటోమేటిక్ (Reference Counting + Cyclic GC)</td>
            <td style="padding:10px 14px; color:#10b981; font-weight:700;">ఆటోమేటిక్ హై-స్పీడ్ గార్బేజ్ కలెక్షన్ (ZGC, G1)</td>
          </tr>
          <tr style="border-bottom:1px solid var(--border);">
            <td style="padding:10px 14px; font-weight:700;">పాయింటర్లు &amp; భద్రత</td>
            <td style="padding:10px 14px;">డైరెక్ట్ మెమరీ పాయింటర్లు (క్రాష్‌లు &amp; సెక్యూరిటీ బగ్స్)</td>
            <td style="padding:10px 14px;">రిఫరెన్సెస్ మాత్రమే (నో డైరెక్ట్ పాయింటర్లు)</td>
            <td style="padding:10px 14px; color:#10b981; font-weight:700;">పాయింటర్ అర్థమెటిక్ పూర్తిగా నిషేధం (100% Type-Safe)</td>
          </tr>
          <tr style="border-bottom:1px solid var(--border);">
            <td style="padding:10px 14px; font-weight:700;">టైప్ సిస్టమ్</td>
            <td style="padding:10px 14px;">స్టాటిక్ టైపింగ్</td>
            <td style="padding:10px 14px;">డైనమిక్ టైపింగ్</td>
            <td style="padding:10px 14px; color:#10b981; font-weight:700;">స్ట్రాంగ్ స్టాటిక్ టైపింగ్ + Modern 'var' Inference</td>
          </tr>
          <tr style="border-bottom:1px solid var(--border);">
            <td style="padding:10px 14px; font-weight:700;">రన్‌టైమ్ పనితీరు</td>
            <td style="padding:10px 14px;">అత్యంత వేగవంతం (Bare metal native)</td>
            <td style="padding:10px 14px; color:#ef4444;">సాపేక్షంగా నెమ్మది (Interpreted overhead)</td>
            <td style="padding:10px 14px; color:#10b981; font-weight:700;">అత్యున్నత స్థాయి (JIT కంపైలేషన్ వల్ల C++ కి దగ్గరగా)</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- SECTION 3 -->
    <h2 class="section-title"><span class="num">3</span> కీలకమైన తేడాలు: JDK vs JRE vs JVM సమగ్ర విభజన</h2>
    <p>
      జావా నేర్చుకునే ప్రతి విద్యార్థి లేదా ప్రొఫెషనల్ ముందుగా స్పష్టంగా తెలుసుకోవలసిన త్రయం (The Grand Trinity): <strong>JDK</strong>, <strong>JRE</strong>, మరియు <strong>JVM</strong>. చాలా మంది వీటన్నింటినీ ఒకటే అనుకుంటారు, కానీ వీటి మధ్య స్పష్టమైన లేయర్డ్ సంబంధం ఉంది:
    </p>

    <!-- TRINITY ASCII NESTED BOX -->
    <div style="background:var(--bg2); border:1px solid var(--border); border-radius:10px; padding:20px; margin:18px 0; font-family:'Fira Code', monospace; font-size:13px; line-height:1.7; color:var(--text);">
      <div style="color:#10b981; font-weight:700; margin-bottom:8px; font-family:'Inter', sans-serif; font-size:14px;">
        📦 JDK ⊃ JRE ⊃ JVM సంబంధాల నెస్టెడ్ ఆర్కిటెక్చర్:
      </div>
┌─────────────────────────────────────────────────────────────────────────────┐
│ <strong>JDK (Java Development Kit)</strong> — డెవలపర్‌లకు అవసరమైన పూర్తి ప్యాకేజీ              │
│  • కంపైలర్ (javac), ప్యాకేజర్ (jar), డాక్యుమెంటేషన్ (javadoc)               │
│  • డీబగ్గర్ (jdb), మానిటరింగ్ టూల్స్ (jconsole, jcmd, jstat)                │
│                                                                             │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │ <strong>JRE (Java Runtime Environment)</strong> — ప్రోగ్రామ్‌లను రన్ చేయడానికి సరిపోతుంది │  │
│  │  • జావా కోర్ క్లాస్ లైబ్రరీలు (java.base, java.sql, java.net...)      │  │
│  │  • సపోర్టింగ్ రన్‌టైమ్ కాన్ఫిగరేషన్ ఫైల్స్                            │  │
│  │                                                                       │  │
│  │  ┌─────────────────────────────────────────────────────────────────┐  │  │
│  │  │ <strong>JVM (Java Virtual Machine)</strong> — అసలైన కోడ్ ఎగ్జిక్యూషన్ ఇంజిన్      │  │  │
│  │  │  • ClassLoader Subsystem                                        │  │  │
│  │  │  • JVM Memory (Heap, Stack, Metaspace, PC, Native Stack)        │  │  │
│  │  │  • Execution Engine (Interpreter + JIT Compiler + GC)           │  │  │
│  │  └─────────────────────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
    </div>

    <div style="overflow-x:auto; margin:16px 0;">
      <table style="width:100%; border-collapse:collapse; font-size:13.5px; text-align:left;">
        <thead>
          <tr style="background:var(--bg2); border-bottom:2px solid var(--border);">
            <th style="padding:10px 14px;">కాంపోనెంట్</th>
            <th style="padding:10px 14px;">పూర్తి పేరు &amp; నిర్వచనం</th>
            <th style="padding:10px 14px;">ఇందులో ఏముంటాయి?</th>
            <th style="padding:10px 14px;">ఎవరికి అవసరం?</th>
          </tr>
        </thead>
        <tbody>
          <tr style="border-bottom:1px solid var(--border);">
            <td style="padding:10px 14px; font-weight:700; color:#38bdf8;">JVM</td>
            <td style="padding:10px 14px;"><strong>Java Virtual Machine</strong><br>ఇది ఒక కాల్పనిక కంప్యూటర్ స్పెసిఫికేషన్. ఇది బైట్‌కోడ్‌ను మెషిన్ కోడ్‌గా మార్చి లైవ్‌గా ఎగ్జిక్యూట్ చేస్తుంది.</td>
            <td style="padding:10px 14px;">మెమరీ ఏరియాలు (Heap, Stack), క్లాస్‌లోడర్, ఎగ్జిక్యూషన్ ఇంజిన్ (Interpreter, JIT), గార్బేజ్ కలెక్టర్.</td>
            <td style="padding:10px 14px;">రన్‌టైమ్ ఇంటర్నల్ ఇంజిన్ (యూజర్ నేరుగా దీనిని తాకరు).</td>
          </tr>
          <tr style="border-bottom:1px solid var(--border);">
            <td style="padding:10px 14px; font-weight:700; color:#f59e0b;">JRE</td>
            <td style="padding:10px 14px;"><strong>Java Runtime Environment</strong><br>జావా అప్లికేషన్‌ను ఏదైనా కంప్యూటర్‌లో నడపడానికి (Run-only) అవసరమైన సాఫ్ట్‌వేర్ ప్యాకేజీ.</td>
            <td style="padding:10px 14px;">JVM + Core Java Standard Class Libraries (java.lang, java.util etc.) + రన్‌టైమ్ సపోర్టింగ్ ఫైల్స్.</td>
            <td style="padding:10px 14px;">సాఫ్ట్‌వేర్ యూజర్లు, క్లయింట్లు (కోడ్ రాయకుండా కేవలం రన్ చేసేవారు).</td>
          </tr>
          <tr style="border-bottom:1px solid var(--border);">
            <td style="padding:10px 14px; font-weight:700; color:#10b981;">JDK</td>
            <td style="padding:10px 14px;"><strong>Java Development Kit</strong><br>కొత్త జావా ప్రోగ్రామ్‌లను రాయడానికి, కంపైల్ చేయడానికి మరియు డీబగ్ చేయడానికి అవసరమైన సంపూర్ణ డెవలపర్ కిట్.</td>
            <td style="padding:10px 14px;">JRE + Development Tools (<code>javac</code> కంపైలర్, <code>jar</code>, <code>javadoc</code>, <code>jdb</code> డీబగ్గర్, <code>jcmd</code> etc.).</td>
            <td style="padding:10px 14px; font-weight:700; color:#10b981;">సాఫ్ట్‌వేర్ డెవలపర్లు &amp; ఇంజనీర్లు (మనం తప్పనిసరిగా JDK ఇన్‌స్టాల్ చేసుకోవాలి).</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- SECTION 4 -->
    <h2 class="section-title"><span class="num">4</span> JVM అంతర్గత నిర్మాణం — 3-స్తంభాల ఆర్కిటెక్చర్ (Internal Architecture)</h2>
    <p>
      జావా వర్చువల్ మెషిన్ (JVM) అనేది కంప్యూటర్ సైన్స్ చరిత్రలో రూపొందించబడిన అత్యంత సంక్లిష్టమైన మరియు అద్భుతమైన సాఫ్ట్‌వేర్ ఇంజిన్లలో ఒకటి. దీని అంతర్గత నిర్మాణాన్ని <strong>మూడు ప్రధాన సబ్‌సిస్టమ్‌లుగా</strong> విభజించవచ్చు:
    </p>
    <ol style="font-size:14px; line-height:1.8;">
      <li><strong>ClassLoader Subsystem:</strong> కంపైల్ అయిన <code>.class</code> ఫైళ్లలోని బైట్‌కోడ్‌ను సెకండరీ స్టోరేజ్ (డిస్క్) నుండి మెమరీలోకి లోడ్ చేయడం, వెరిఫై చేయడం మరియు లింక్ చేయడం దీని బాధ్యత.</li>
      <li><strong>Runtime Data Areas (JVM Memory):</strong> ప్రోగ్రామ్ రన్ అవుతున్నప్పుడు డేటాను నిల్వ చేయడానికి ఆపరేటింగ్ సిస్టమ్ నుండి కేటాయించబడిన మెమరీ పూల్ (Heap, Stack, Metaspace, PC Registers, Native Method Stack).</li>
      <li><strong>Execution Engine:</strong> మెమరీలో ఉన్న బైట్‌కోడ్ సూచనలను చదివి, నిజమైన కంప్యూటర్ హార్డ్‌వేర్ ప్రాసెసర్‌పై ఎగ్జిక్యూట్ చేసే భాగం (Interpreter, JIT Compiler, Garbage Collector).</li>
    </ol>

    <!-- SECTION 5 -->
    <h2 class="section-title"><span class="num">5</span> క్లాస్‌లోడర్ సబ్‌సిస్టమ్ &amp; డెలిగేషన్ హైరార్కీ (ClassLoader Subsystem)</h2>
    <p>
      ఒక జావా ప్రోగ్రామ్ రన్ కావడం ప్రారంభించగానే క్లాస్‌లోడర్ సబ్‌సిస్టమ్ రంగంలోకి దిగుతుంది. ఇది మూడు వరుస దశలలో తన పనిని పూర్తి చేస్తుంది: <strong>Loading → Linking → Initialization</strong>.
    </p>

    <div style="background:var(--bg2); border:1px solid var(--border); border-radius:10px; padding:18px; margin:16px 0;">
      <h4 style="margin-top:0; color:#10b981;">1. లోడింగ్ దశ &amp; క్లాస్‌లోడర్ల శ్రేణి (ClassLoader Hierarchy):</h4>
      <p style="font-size:13.5px; line-height:1.7;">
        జావాలో క్లాస్‌లను లోడ్ చేయడానికి మూడు రకాల క్లాస్‌లోడర్లు హైరార్కీ రూపంలో పనిచేస్తాయి:
      </p>
      <ul style="font-size:13.5px; line-height:1.7;">
        <li><strong>Bootstrap ClassLoader (ప్రాథమిక క్లాస్‌లోడర్):</strong> ఇది అన్ని క్లాస్‌లోడర్లకు మూల పేరెంట్. ఇది కోర్ జావా రన్‌టైమ్ క్లాస్‌లను (ఉదాహరణకు <code>java.lang.Object</code>, <code>java.lang.String</code>, <code>java.base</code> మాడ్యూల్) లోడ్ చేస్తుంది. ఇది C/C++ నేటివ్ కోడ్‌లో రాయబడింది, కాబట్టి జావా కోడ్ నుండి దీనిని ప్రింట్ చేస్తే <code>null</code> వస్తుంది!</li>
        <li><strong>Platform / Extension ClassLoader:</strong> JDK ఎక్స్‌టెన్షన్లు మరియు ప్లాట్‌ఫారమ్ మాడ్యూల్స్‌ను లోడ్ చేయడానికి బాధ్యత వహిస్తుంది.</li>
        <li><strong>Application / System ClassLoader:</strong> మనం రాసిన ప్రాజెక్ట్ క్లాస్‌లను మరియు అప్లికేషన్ క్లాస్‌పాత్ (<code>CLASSPATH</code>) లేదా డిపెండెన్సీ JAR ఫైల్స్‌లోని క్లాస్‌లను లోడ్ చేస్తుంది.</li>
      </ul>

      <h5 style="color:#38bdf8; margin:14px 0 6px 0;">🛡️ Parent Delegation Algorithm సూత్రం:</h5>
      <p style="font-size:13.5px; line-height:1.7; margin-bottom:0;">
        ఒక క్లాస్‌ను లోడ్ చేయమని కోరినప్పుడు, Application ClassLoader స్వయంగా లోడ్ చేయడానికి ప్రయత్నించదు! మొదట తన పేరెంట్ అయిన Platform ClassLoader కి డెలిగేట్ చేస్తుంది. అది తన పేరెంట్ అయిన Bootstrap ClassLoader కి డెలిగేట్ చేస్తుంది. Bootstrap లోడ్ చేయలేకపోతే Platform, అది కూడా చేయలేకపోతే చివరగా Application ClassLoader లోడ్ చేస్తుంది. దీనివల్ల ఎవరైనా హ్యాకర్ సొంతంగా నకిలీ <code>java.lang.String</code> క్లాస్‌ను రాసి ఇంజెక్ట్ చేయాలని చూసినా, బూట్‌స్ట్రాప్ క్లాస్‌లోడర్ అసలైన జావా స్ట్రింగ్‌నే లోడ్ చేస్తుంది — దీంతో సిస్టమ్ 100% సురక్షితంగా ఉంటుంది!
      </p>
    </div>

    <div style="background:var(--bg2); border:1px solid var(--border); border-radius:10px; padding:18px; margin:16px 0;">
      <h4 style="margin-top:0; color:#10b981;">2. లింకింగ్ దశ (Linking Phase):</h4>
      <ul style="font-size:13.5px; line-height:1.7; margin-bottom:0;">
        <li><strong>Verification (తనిఖీ):</strong> బైట్‌కోడ్ వెరిఫైయర్ ద్వారా క్లాస్ ఫైల్ ప్రామాణికమైనదా కాదా, JVM స్పెసిఫికేషన్‌కు అనుగుణంగా ఉందా, స్టాక్ ఓవర్‌ఫ్లో లేదా టైప్ వైలేషన్స్ ఏవైనా ఉన్నాయా అని క్షుణ్ణంగా తనిఖీ చేస్తుంది. తప్పుడు బైట్‌కోడ్ ఉంటే <code>VerifyError</code> విసిరేస్తుంది.</li>
        <li><strong>Preparation (సిద్ధపరచడం):</strong> క్లాస్ స్థాయి స్టాటిక్ వేరియబుల్స్‌కు అవసరమైన మెమరీని కేటాయించి, వాటికి డీఫాల్ట్ విలువలను (numeric కి 0, boolean కి false, object reference కి null) అసైన్ చేస్తుంది.</li>
        <li><strong>Resolution (పరిష్కరించడం):</strong> ప్రోగ్రామ్‌లోని సింబాలిక్ రిఫరెన్స్‌లను (Symbolic References) మెమరీలోని డైరెక్ట్ మెమరీ అడ్రస్‌లుగా (Direct References) మారుస్తుంది.</li>
      </ul>
    </div>

    <div style="background:var(--bg2); border:1px solid var(--border); border-radius:10px; padding:18px; margin:16px 0;">
      <h4 style="margin-top:0; color:#10b981;">3. ఇనిషియలైజేషన్ దశ (Initialization Phase):</h4>
      <p style="font-size:13.5px; line-height:1.7; margin-bottom:0;">
        ఈ దశలో క్లాస్ యొక్క అసలైన లాజిక్ ప్రారంభమవుతుంది. స్టాటిక్ వేరియబుల్స్‌కు మనం ఇచ్చిన అసలైన విలువలు (ఉదా: <code>static int count = 100;</code>) అసైన్ చేయబడతాయి మరియు క్లాస్‌లోని <code>static { ... }</code> బ్లాక్‌లు పై నుండి క్రిందికి ఒకే ఒక్కసారి ఎగ్జిక్యూట్ అవుతాయి.
      </p>
    </div>

    <!-- SECTION 6 -->
    <h2 class="section-title"><span class="num">6</span> JVM రన్‌టైమ్ డేటా ఏరియాస్ (Memory Management Architecture)</h2>
    <p>
      ఒక జావా అప్లికేషన్ ఎగ్జిక్యూట్ అవుతున్నప్పుడు JVM మెమరీ 5 ప్రధాన విభాగాలుగా విభజించబడుతుంది. వీటిలో కొన్ని మొత్తం అప్లికేషన్‌లోని థ్రెడ్లన్నింటికీ ఉమ్మడిగా (Shared across all Threads) ఉంటాయి; మరికొన్ని ప్రతి థ్రెడ్‌కు వ్యక్తిగతంగా (Per-Thread Private) కేటాయించబడతాయి:
    </p>

    <!-- MEMORY REGIONS TABLE -->
    <div style="overflow-x:auto; margin:16px 0;">
      <table style="width:100%; border-collapse:collapse; font-size:13.5px; text-align:left;">
        <thead>
          <tr style="background:var(--bg2); border-bottom:2px solid var(--border);">
            <th style="padding:10px 14px;">మెమరీ ఏరియా</th>
            <th style="padding:10px 14px;">షేరింగ్ పరిధి</th>
            <th style="padding:10px 14px;">ఏమి నిల్వ చేయబడుతుంది?</th>
            <th style="padding:10px 14px;">వచ్చే సాధారణ ఎర్రర్</th>
          </tr>
        </thead>
        <tbody>
          <tr style="border-bottom:1px solid var(--border);">
            <td style="padding:10px 14px; font-weight:700; color:#10b981;">1. Heap Area</td>
            <td style="padding:10px 14px;"><span class="badge badge-primary">Shared by All Threads</span></td>
            <td style="padding:10px 14px;"><code>new</code> కీవర్డ్ ద్వారా క్రియేట్ చేయబడిన అన్ని ఆబ్జెక్టులు, అర్రేలు, మరియు వాటి ఇన్స్టన్స్ వేరియబుల్స్. గార్బేజ్ కలెక్షన్ జరిగేది ఇక్కడే!</td>
            <td style="padding:10px 14px; color:#ef4444; font-weight:600;">java.lang.OutOfMemoryError: Java heap space</td>
          </tr>
          <tr style="border-bottom:1px solid var(--border);">
            <td style="padding:10px 14px; font-weight:700; color:#38bdf8;">2. Method Area (Metaspace)</td>
            <td style="padding:10px 14px;"><span class="badge badge-primary">Shared by All Threads</span></td>
            <td style="padding:10px 14px;">క్లాస్ లెవెల్ మెటాడేటా, మెథడ్ బైట్‌కోడ్, స్టాటిక్ ఫీల్డ్స్, రన్‌టైమ్ కాన్స్టంట్ పూల్ (Java 8+ లో ఇది OS నేటివ్ మెమరీలో 'Metaspace' గా ఉంటుంది).</td>
            <td style="padding:10px 14px; color:#ef4444; font-weight:600;">OutOfMemoryError: Metaspace</td>
          </tr>
          <tr style="border-bottom:1px solid var(--border);">
            <td style="padding:10px 14px; font-weight:700; color:#a855f7;">3. JVM Stack Area</td>
            <td style="padding:10px 14px;"><span class="badge badge-outline">Per Thread (Private)</span></td>
            <td style="padding:10px 14px;">ప్రతి మెథడ్ కాల్‌కు ఒక 'Stack Frame'. అందులో Local Variables Array, Operand Stack (గణనల కోసం), మరియు Return Address ఉంటాయి. మెథడ్ పూర్తవగానే ఫ్రేమ్ డిలీట్ అవుతుంది.</td>
            <td style="padding:10px 14px; color:#ef4444; font-weight:600;">java.lang.StackOverflowError (రకార్సివ్ డెప్త్ ఎక్కువైతే)</td>
          </tr>
          <tr style="border-bottom:1px solid var(--border);">
            <td style="padding:10px 14px; font-weight:700; color:#f59e0b;">4. PC Registers</td>
            <td style="padding:10px 14px;"><span class="badge badge-outline">Per Thread (Private)</span></td>
            <td style="padding:10px 14px;">ప్రస్తుతం థ్రెడ్ ఎగ్జిక్యూట్ చేస్తున్న JVM బైట్‌కోడ్ ఇన్‌స్ట్రక్షన్ యొక్క మెమరీ అడ్రస్. CPU కి తదుపరి ఏ లైన్ ఎగ్జిక్యూట్ చేయాలో ఇది నిర్దేశిస్తుంది.</td>
            <td style="padding:10px 14px; color:var(--text2);">నో ఎర్రర్ (అత్యంత వేగవంతమైన హార్డ్‌వేర్ పాయింటర్)</td>
          </tr>
          <tr style="border-bottom:1px solid var(--border);">
            <td style="padding:10px 14px; font-weight:700; color:#ef4444;">5. Native Method Stack</td>
            <td style="padding:10px 14px;"><span class="badge badge-outline">Per Thread (Private)</span></td>
            <td style="padding:10px 14px;">Java Native Interface (JNI) ద్వారా కాల్ చేయబడిన C/C++ నేటివ్ మెథడ్స్ యొక్క ఎగ్జిక్యూషన్ ఫ్రేమ్‌లు మరియు లోకల్ వేరియబుల్స్.</td>
            <td style="padding:10px 14px; color:#ef4444; font-weight:600;">StackOverflowError</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- HEAP SUBDIVISIONS EXPLANATION -->
    <div style="background:var(--bg2); border:1px solid var(--border); border-radius:10px; padding:18px; margin:20px 0;">
      <h4 style="margin-top:0; color:#10b981;">🧠 హీప్ మెమరీ ఉప-విభాగాలు (Heap Generations &amp; GC Lifecycle):</h4>
      <p style="font-size:13.5px; line-height:1.7;">
        హీప్ మెమరీలో వస్తువుల జీవితకాలాన్ని (Object Lifetime) బట్టి రెండు ప్రధాన తరాలు ఉంటాయి:
      </p>
      <ul style="font-size:13.5px; line-height:1.7; margin-bottom:0;">
        <li><strong>Young Generation:</strong> కొత్తగా క్రియేట్ అయిన ప్రతి ఆబ్జెక్ట్ మొదట <strong>Eden Space</strong> లో పుడుతుంది. అక్కడ స్పేస్ నిండగానే <strong>Minor Garbage Collection (Minor GC)</strong> జరుగుతుంది. బతికి ఉన్న ఆబ్జెక్టులు Survivor స్పేస్‌లకు (S0, S1) తరలించబడతాయి.</li>
        <li><strong>Old (Tenured) Generation:</strong> చాలా సార్లు Minor GC తనిఖీలను తట్టుకుని దీర్ఘకాలం బతికి ఉన్న ఆబ్జెక్టులు (ఉదాహరణకు స్ప్రింగ్ బీన్స్, డేటాబేస్ కనెక్షన్ పూల్స్) ఓల్డ్ జనరేషన్‌లోకి ప్రమోట్ చేయబడతాయి. ఇక్కడ స్పేస్ నిండితే <strong>Major GC / Full GC</strong> జరుగుతుంది.</li>
      </ul>
    </div>

    <!-- SECTION 7 -->
    <h2 class="section-title"><span class="num">7</span> ఎగ్జిక్యూషన్ ఇంజిన్ (Interpreter, JIT Compiler &amp; Garbage Collector)</h2>
    <p>
      మెమరీలో లోడ్ అయిన బైట్‌కోడ్‌ను అసలైన ప్రాసెసర్ ఇన్‌స్ట్రక్షన్లుగా మార్చి నడిపించే శ్రమ అంతా ఎగ్జిక్యూషన్ ఇంజిన్‌దే. ఇందులో మూడు అత్యంత కీలక భాగాలు ఉంటాయి:
    </p>

    <div style="display:flex; flex-direction:column; gap:14px; margin:16px 0;">
      <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #38bdf8; border-radius:8px; padding:14px 18px;">
        <h4 style="margin:0 0 6px 0; color:#38bdf8; font-size:15px;">1. ఇంటర్‌ప్రీటర్ (Interpreter)</h4>
        <p style="margin:0; font-size:13.5px; line-height:1.7; color:var(--text);">
          ఇది బైట్‌కోడ్‌ను ఒక్కొక్క ఇన్‌స్ట్రక్షన్‌గా లైన్-బై-లైన్ చదువుతూ ఎగ్జిక్యూట్ చేస్తుంది. దీనివల్ల ప్రోగ్రామ్ వేగంగా స్టార్ట్ అవుతుంది (Fast Startup). అయితే ఒకే లూప్ వెయ్యి సార్లు తిరిగితే, ఆ లూప్‌లోని బైట్‌కోడ్‌ను ప్రతిసారీ మళ్లీ మళ్లీ ఇంటర్‌ప్రీట్ చేయడం వల్ల పనితీరు నెమ్మదిస్తుంది.
        </p>
      </div>

      <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #10b981; border-radius:8px; padding:14px 18px;">
        <h4 style="margin:0 0 6px 0; color:#10b981; font-size:15px;">2. జస్ట్-ఇన్-టైమ్ కంపైలర్ (JIT Compiler — The Speed Booster)</h4>
        <p style="margin:0; font-size:13.5px; line-height:1.7; color:var(--text);">
          ఇంటర్‌ప్రీటర్ యొక్క నెమ్మదిని జేఐటీ (JIT) కంపైలర్ అద్భుతంగా నివారిస్తుంది. ప్రోగ్రామ్ రన్ అవుతున్నప్పుడు తరచుగా రిపీట్ అయ్యే మెథడ్స్ మరియు లూప్‌లను JVM <strong>"Hot Spots"</strong> గా గుర్తిస్తుంది. JIT కంపైలర్ ఆ హాట్ స్పాట్ బైట్‌కోడ్‌ను ఏకమొత్తంగా డైరెక్ట్ నేటివ్ మెషిన్ కోడ్‌గా కంపైల్ చేసి మెమరీలోని 'Code Cache' లో దాచుకుంటుంది. ఆ తర్వాత ఆ మెథడ్ కాల్ అయినప్పుడల్లా ఇంటర్‌ప్రీటర్ అవసరం లేకుండా నేరుగా మెషిన్ స్పీడ్‌తో రన్ అవుతుంది! ఆధునిక జావా C++ కి సమానమైన వేగంతో నడవడానికి ఇదే రహస్యం!
        </p>
      </div>

      <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #f59e0b; border-radius:8px; padding:14px 18px;">
        <h4 style="margin:0 0 6px 0; color:#f59e0b; font-size:15px;">3. గార్బేజ్ కలెక్టర్ (Automatic Garbage Collector)</h4>
        <p style="margin:0; font-size:13.5px; line-height:1.7; color:var(--text);">
          హీప్ మెమరీలో ఏ ఆబ్జెక్టుకైతే ఇకపై ప్రోగ్రామ్‌లో ఎటువంటి లైవ్ రిఫరెన్స్ ఉండదో (Unreachable Objects), వాటిని గుర్తించి ఆ మెమరీని ఆటోమేటిక్‌గా రీక్లెయిమ్ చేస్తుంది. ఆధునిక జావా 21 లో G1 GC మరియు ZGC (Z Garbage Collector) వంటి అల్ట్రా-లో లేటెన్సీ గార్బేజ్ కలెక్టర్లు ఉన్నాయి — ఇవి టెరాబైట్ల మెమరీని కూడా మిల్లీసెకను కంటే తక్కువ విరామంతో (Sub-millisecond pause time) క్లీన్ చేయగలవు!
        </p>
      </div>
    </div>

    <!-- SECTION 8 -->
    <h2 class="section-title"><span class="num">8</span> కోడ్ డెమో 1: మొదటి జావా ప్రోగ్రామ్ అనాటమీ &amp; సిస్టమ్ డయాగ్నోస్టిక్స్</h2>
    <p>
      ఇప్పుడు జావాలోని క్లాస్ స్ట్రక్చర్, <code>main</code> మెథడ్ మరియు సిస్టమ్ ప్రాపర్టీస్ డయాగ్నోస్టిక్స్‌ను పరిశీలించే పూర్తి జావా 21 ప్రోగ్రామ్‌ను పరిశీలిద్దాం:
    </p>

    <!-- CODE BLOCK 1 -->
    <div class="code-block">
      <div class="code-header">
        <span class="file-name">01_JavaSystemDiagnostics.java</span>
        <div class="btn-group">
          <button class="btn btn-copy" onclick="copyCode(this)">Copy</button>
          <button class="btn btn-run" onclick="runCodeInCompiler(this)">Run ▶</button>
        </div>
      </div>
      <pre><code class="language-java">// =====================================================================
// డెమో 01: మొదటి జావా ప్రోగ్రామ్ &amp; లైవ్ JVM సిస్టమ్ ప్రాపర్టీస్ డయాగ్నోస్టిక్స్
// కాన్సెప్ట్స్: public class, main method, System.getProperty
// =====================================================================

public class JavaSystemDiagnostics {

    // జావా ప్రోగ్రామ్ ఎగ్జిక్యూషన్ ప్రారంభమయ్యే ప్రధాన ద్వారం (Entry Point)
    public static void main(String[] args) {
        System.out.println("=================================================================");
        System.out.println("  నమస్కారం! Modern Java 21+ Masterclass లోకి స్వాగతం!");
        System.out.println("  \"Write Once, Run Anywhere (WORA)\" — JVM ఆర్కిటెక్చర్ లైవ్ టెస్ట్");
        System.out.println("=================================================================");

        // JVM మరియు ఆపరేటింగ్ సిస్టమ్ సమాచారాన్ని కనుగొనడం
        String javaVersion  = System.getProperty("java.version");
        String javaVendor   = System.getProperty("java.vendor");
        String jvmName      = System.getProperty("java.vm.name");
        String osName       = System.getProperty("os.name");
        String osArch       = System.getProperty("os.arch");
        String userHome     = System.getProperty("user.home");
        String javaHome     = System.getProperty("java.home");

        System.out.println("\n🔍 [రన్‌టైమ్ సిస్టమ్ టెలిమెట్రీ నివేదిక]:");
        System.out.println("-----------------------------------------------------------------");
        System.out.printf(" • జావా వెర్షన్ (Java Version)     : %s%n", javaVersion);
        System.out.printf(" • జావా వెండర్ (Vendor)           : %s%n", javaVendor);
        System.out.printf(" • వర్చువల్ మెషిన్ (JVM Name)      : %s%n", jvmName);
        System.out.printf(" • ఆపరేటింగ్ సిస్టమ్ (OS Name)      : %s (%s)%n", osName, osArch);
        System.out.printf(" • యూజర్ హోమ్ డైరెక్టరీ           : %s%n", userHome);
        System.out.printf(" • జావా ఇన్‌స్టాలేషన్ పాత్ (Home)  : %s%n", javaHome);

        // CPU ప్రాసెసర్ కోర్ల లెక్కింపు
        int availableCores = Runtime.getRuntime().availableProcessors();
        System.out.printf(" • అందుబాటులో ఉన్న CPU కోర్లు     : %d Cores%n", availableCores);
        System.out.println("=================================================================");
        System.out.println("✅ JVM బైట్‌కోడ్ విజయవంతంగా ఎగ్జిక్యూట్ చేయబడింది!\n");
    }
}
</code></pre>
    </div>

    <!-- ANATOMY BREAKDOWN -->
    <div style="background:var(--bg2); border:1px solid var(--border); border-radius:10px; padding:18px; margin:20px 0;">
      <h4 style="margin-top:0; color:#10b981;">🔬 జావా మెయిన్ మెథడ్ అనాటమీ — ప్రతి పదం వెనుక అర్థం:</h4>
      <ul style="font-size:13.5px; line-height:1.7; margin-bottom:0;">
        <li><strong><code>public</code>:</strong> ఈ మెథడ్ ఎక్కడి నుండైనా యాక్సెస్ కావాలి. JVM క్లాస్ వెలుపల నుండి ఈ మెథడ్‌ను కాల్ చేస్తుంది కాబట్టి ఇది పబ్లిక్‌గా ఉండాలి.</li>
        <li><strong><code>static</code>:</strong> క్లాస్‌కు ఆబ్జెక్ట్ సృష్టించకుండానే (without creating an instance) మెథడ్‌ను కాల్ చేయడానికి వీలు కల్పిస్తుంది. ప్రోగ్రామ్ ప్రారంభంలో ఎటువంటి ఆబ్జెక్ట్ ఉండదు కాబట్టి JVM <code>ClassName.main()</code> గా నేరుగా కాల్ చేస్తుంది.</li>
        <li><strong><code>void</code>:</strong> మెథడ్ పూర్తి అయిన తర్వాత ఎటువంటి విలువను తిరిగి ఇవ్వదు (No return value).</li>
        <li><strong><code>main</code>:</strong> ఇది JVM వెతికే ప్రామాణిక మెథడ్ పేరు. ఎగ్జిక్యూషన్ ఇక్కడే మొదలవుతుంది.</li>
        <li><strong><code>String[] args</code>:</strong> కమాండ్ లైన్ ఆర్గ్యుమెంట్లను స్ట్రింగ్ అర్రే రూపంలో స్వీకరించడానికి ఉపయోగపడుతుంది.</li>
        <li><strong><code>System.out.println()</code>:</strong> <code>System</code> అనేది <code>java.lang</code> లోని బిల్ట్-ఇన్ క్లాస్; <code>out</code> అనేది స్టాండర్డ్ అవుట్‌పుట్ స్ట్రీమ్ ఆబ్జెక్ట్; <code>println()</code> అనేది కన్సోల్ పై లైన్‌ను ప్రింట్ చేసి కర్సర్‌ను తర్వాతి లైన్‌కు తీసుకెళ్లే మెథడ్.</li>
      </ul>
    </div>

    <!-- SECTION 9 -->
    <h2 class="section-title"><span class="num">9</span> కోడ్ డెమో 2: JVM మెమరీ రన్‌టైమ్ ఇన్స్పెక్షన్ (Heap &amp; Thread Explorer)</h2>
    <p>
      జావా అప్లికేషన్ నడుస్తున్నప్పుడు హీప్ మెమరీ కేటాయింపులు, గరిష్ట పరిమితులు, మరియు మెమరీ వినియోగాన్ని <code>Runtime.getRuntime()</code> ద్వారా స్వయంగా తనిఖీ చేయవచ్చు:
    </p>

    <!-- CODE BLOCK 2 -->
    <div class="code-block">
      <div class="code-header">
        <span class="file-name">02_JvmMemoryExplorer.java</span>
        <div class="btn-group">
          <button class="btn btn-copy" onclick="copyCode(this)">Copy</button>
          <button class="btn btn-run" onclick="runCodeInCompiler(this)">Run ▶</button>
        </div>
      </div>
      <pre><code class="language-java">// =====================================================================
// డెమో 02: JVM హీప్ మెమరీ లైవ్ ఇన్స్పెక్షన్ &amp; గార్బేజ్ కలెక్షన్ ప్రవర్తన
// కాన్సెప్ట్స్: Runtime.getRuntime(), Total Memory, Free Memory, Max Memory
// =====================================================================

public class JvmMemoryExplorer {

    public static void main(String[] args) {
        Runtime runtime = Runtime.getRuntime();
        long mb = 1024 * 1024; // బైట్ల నుండి మెగాబైట్లకు కన్వర్ట్ చేయడానికి

        System.out.println("📊 --- ప్రారంభ JVM హీప్ మెమరీ స్థితి ---");
        long maxMem   = runtime.maxMemory() / mb;
        long totalMem = runtime.totalMemory() / mb;
        long freeMem  = runtime.freeMemory() / mb;
        long usedMem  = totalMem - freeMem;

        System.out.printf(" • గరిష్ట హీప్ పరిమితి (Max Memory)  : %d MB%n", maxMem);
        System.out.printf(" • ప్రస్తుతం కేటాయించినది (Total)    : %d MB%n", totalMem);
        System.out.printf(" • ఉచితంగా ఉన్న మెమరీ (Free)       : %d MB%n", freeMem);
        System.out.printf(" • వాడుకలో ఉన్న మెమరీ (Used)       : %d MB%n", usedMem);

        System.out.println("\n⚙️ 1,00,000 ఆబ్జెక్టులను సృష్టించి హీప్ మెమరీని నింపుతున్నాం...");
        // తాత్కాలికంగా మెమరీని వాడే ఆబ్జెక్టుల అర్రే సృష్టి
        String[] garbageArray = new String[100000];
        for (int i = 0; i &lt; garbageArray.length; i++) {
            garbageArray[i] = new String("Java Memory Benchmark Data Block #" + i);
        }

        long usedAfterAlloc = (runtime.totalMemory() - runtime.freeMemory()) / mb;
        System.out.printf(" • ఆబ్జెక్టుల సృష్టి తర్వాత వాడుకలో ఉన్న మెమరీ: %d MB%n", usedAfterAlloc);

        // రిఫరెన్సులను తొలగించడం (Unreferencing)
        garbageArray = null;

        System.out.println("\n🧹 ఆబ్జెక్ట్ రిఫరెన్సులు తొలగించబడ్డాయి. System.gc() రిక్వెస్ట్ చేస్తున్నాం...");
        System.gc(); // గార్బేజ్ కలెక్టర్‌ను రన్ చేయమని JVM కి సలహా ఇవ్వడం

        try {
            Thread.sleep(100); // GC పనిని పూర్తి చేసుకోవడానికి చిన్న విరామం
        } catch (InterruptedException ignored) {}

        long usedAfterGC = (runtime.totalMemory() - runtime.freeMemory()) / mb;
        System.out.printf(" • గార్బేజ్ కలెక్షన్ తర్వాత వాడుకలో ఉన్న మెమరీ : %d MB%n", usedAfterGC);
        System.out.println("✅ హీప్ మెమరీ ఆటోమేటిక్‌గా రీక్లెయిమ్ చేయబడింది!");
    }
}
</code></pre>
    </div>

    <!-- SECTION 10 -->
    <h2 class="section-title"><span class="num">10</span> కోడ్ డెమో 3 (Capstone Mini Project): JVM ఆర్కిటెక్చర్ సిమ్యులేటర్ &amp; క్లాస్‌లోడర్ ఎనలైజర్</h2>
    <p>
      ఈ మొదటి అధ్యాయం యొక్క సమగ్ర నైపుణ్యాలను ఏకీకృతం చేస్తూ ఒక రియల్-వరల్డ్ ఇండస్ట్రీ గ్రేడ్ టూల్ — <strong>"NextGen JVM Architecture Simulator &amp; ClassLoader Telemetry Engine"</strong> ను నిర్మిద్దాం. ఇది క్లాస్‌లోడర్ హైరార్కీని డైనమిక్‌గా పరిశీలిస్తుంది, కాల్ స్టాక్ ఫ్రేమ్‌ల డెప్త్‌ను లెక్కిస్తుంది, మరియు మెమరీ కేటాయింపులను ఒక ప్రొఫెషనల్ డాష్‌బోర్డ్ రూపంలో ప్రదర్శిస్తుంది:
    </p>

    <!-- CODE BLOCK 3: CAPSTONE MINI PROJECT -->
    <div class="code-block">
      <div class="code-header">
        <span class="file-name">03_NextGenJvmArchitectureEngine.java</span>
        <div class="btn-group">
          <button class="btn btn-copy" onclick="copyCode(this)">Copy</button>
          <button class="btn btn-run" onclick="runCodeInCompiler(this)">Run ▶</button>
        </div>
      </div>
      <pre><code class="language-java">// =====================================================================
// చాప్టర్ 01 క్యాప్‌స్టోన్ ప్రాజెక్ట్: NextGen JVM Architecture &amp; Telemetry Engine
// అన్ని కాన్సెప్ట్స్: ClassLoader Delegation Analysis, Call Stack Depth,
//                   Heap Benchmarks, Live Executive Telemetry Dashboard
// =====================================================================

import java.lang.management.ManagementFactory;
import java.lang.management.ThreadMXBean;

public class NextGenJvmArchitectureEngine {

    // 1. క్లాస్‌లోడర్ డెలిగేషన్ హైరార్కీ విశ్లేషణ
    public static void inspectClassLoaderHierarchy() {
        System.out.println("┌─────────────────────────────────────────────────────────────┐");
        System.out.println("│  🔍 1. CLASSLOADER DELEGATION HIERARCHY ANALYSIS           │");
        System.out.println("└─────────────────────────────────────────────────────────────┘");

        // మన అప్లికేషన్ క్లాస్‌లోడర్
        ClassLoader appLoader = NextGenJvmArchitectureEngine.class.getClassLoader();
        System.out.println(" [1] Application / System ClassLoader :");
        System.out.println("     -> " + (appLoader != null ? appLoader : "Built-in / Native"));

        // ప్లాట్‌ఫారమ్ క్లాస్‌లోడర్ (పేరెంట్)
        if (appLoader != null) {
            ClassLoader platformLoader = appLoader.getParent();
            System.out.println(" [2] Platform / Extension ClassLoader (Parent) :");
            System.out.println("     -> " + (platformLoader != null ? platformLoader : "None / Root"));

            // బూట్‌స్ట్రాప్ క్లాస్‌లోడర్ (గ్రాండ్ పేరెంట్)
            if (platformLoader != null) {
                ClassLoader bootstrapLoader = platformLoader.getParent();
                System.out.println(" [3] Bootstrap ClassLoader (Grandparent / C++ Native) :");
                System.out.println("     -> " + (bootstrapLoader == null ? "null (C++ Native Kernel - Root of All)" : bootstrapLoader));
            }
        }

        // కోర్ సిస్టమ్ క్లాస్ (String) క్లాస్‌లోడర్ తనిఖీ
        ClassLoader stringLoader = String.class.getClassLoader();
        System.out.println(" [★] Core Library (java.lang.String) ClassLoader :");
        System.out.println("     -> " + (stringLoader == null ? "null (Directly loaded by Bootstrap ClassLoader)" : stringLoader));
        System.out.println();
    }

    // 2. రికర్షన్ ద్వారా JVM కాల్ స్టాక్ ఫ్రేమ్ లోతును పరీక్షించే మెథడ్
    private static int maxStackDepthAchieved = 0;

    public static void testStackFrameDepth(int currentDepth) {
        maxStackDepthAchieved = currentDepth;
        if (currentDepth &lt; 50) { // సురక్షితమైన డెమో పరిమితి
            testStackFrameDepth(currentDepth + 1);
        }
    }

    // 3. ఎగ్జిక్యూటివ్ టెలిమెట్రీ డాష్‌బోర్డ్
    public static void renderExecutiveDashboard() {
        Runtime rt = Runtime.getRuntime();
        long mb = 1024 * 1024;
        long totalMemory = rt.totalMemory() / mb;
        long freeMemory  = rt.freeMemory() / mb;
        long usedMemory  = totalMemory - freeMemory;
        long maxMemory   = rt.maxMemory() / mb;

        ThreadMXBean threadBean = ManagementFactory.getThreadMXBean();
        int activeThreadCount = threadBean.getThreadCount();

        System.out.println("=================================================================");
        System.out.println(" 🎓 NEXTGEN ENTERPRISE JVM RUNTIME TELEMETRY DASHBOARD (2026) ");
        System.out.println("=================================================================");
        System.out.printf(" %-28s : %s%n", "జావా వెర్షన్ (Java Spec)", System.getProperty("java.version"));
        System.out.printf(" %-28s : %s%n", "వర్చువల్ మెషిన్ (VM Engine)", System.getProperty("java.vm.name"));
        System.out.printf(" %-28s : %s (%s)%n", "ప్లాట్‌ఫారమ్ (Host OS)", System.getProperty("os.name"), System.getProperty("os.arch"));
        System.out.printf(" %-28s : %d Cores%n", "ప్రాసెసర్ కోర్లు (CPU Cores)", rt.availableProcessors());
        System.out.printf(" %-28s : %d Threads Active%n", "లైవ్ యాక్టివ్ థ్రెడ్లు", activeThreadCount);
        System.out.println("-----------------------------------------------------------------");
        System.out.printf(" %-28s : %d MB%n", "హీప్ వాడకం (Heap Used)", usedMemory);
        System.out.printf(" %-28s : %d MB%n", "హీప్ ఖాళీ (Heap Free)", freeMemory);
        System.out.printf(" %-28s : %d MB%n", "మొత్తం కేటాయించినది (Allocated)", totalMemory);
        System.out.printf(" %-28s : %d MB%n", "గరిష్ట హీప్ సీలింగ్ (Max Limit)", maxMemory);
        System.out.printf(" %-28s : %d Frames%n", "స్టాక్ ఫ్రేమ్ డెప్త్ టెస్ట్", maxStackDepthAchieved);
        System.out.println("=================================================================");
        System.out.println("🚀 Modern Java 21+ ఆర్కిటెక్చర్ డయాగ్నోస్టిక్స్ 100% విజయవంతం!\n");
    }

    public static void main(String[] args) {
        System.out.println("⚡ Starting NextGen JVM Architecture Engine...\n");

        // 1. క్లాస్‌లోడర్ విశ్లేషణ
        inspectClassLoaderHierarchy();

        // 2. కాల్ స్టాక్ ఫ్రేమ్ టెస్ట్
        testStackFrameDepth(1);

        // 3. డాష్‌బోర్డ్ ప్రింట్ చేయడం
        renderExecutiveDashboard();
    }
}
</code></pre>
    </div>

    <!-- SECTION 11 -->
    <h2 class="section-title"><span class="num">11</span> జావా అధికారిక బజ్‌వర్డ్స్ సమగ్ర విశ్లేషణ (The 10 Official Java Buzzwords)</h2>
    <p>
      జావా అధికారిక శ్వేతపత్రంలో (Sun Whitepaper) జేమ్స్ గోస్లింగ్ జావాను నిర్వచిస్తూ 10 ముఖ్యమైన పదాలను (Buzzwords) పేర్కొన్నారు. వీటిని ప్రతి ఇంటర్వ్యూలో అడుగుతుంటారు:
    </p>

    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:14px; margin:20px 0;">
      <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px;">
        <strong style="color:#10b981;">1. Simple (సరళమైనది):</strong>
        <p style="font-size:13px; color:var(--text2); margin:6px 0 0;">C++ లోని సంక్లిష్టమైన పాయింటర్ అర్థమెటిక్, ఆపరేటర్ ఓవర్‌లోడింగ్, మల్టిపుల్ క్లాస్ ఇన్హెరిటెన్స్ తొలగించబడ్డాయి. నేర్చుకోవడానికి ఎంతో సులభం.</p>
      </div>
      <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px;">
        <strong style="color:#10b981;">2. Object-Oriented (ఆబ్జెక్ట్ ఓరియెంటెడ్):</strong>
        <p style="font-size:13px; color:var(--text2); margin:6px 0 0;">ప్రతిదీ ఆబ్జెక్ట్స్ మరియు క్లాసెస్ రూపంలోనే ఉంటుంది. Encapsulation, Inheritance, Polymorphism, Abstraction పూర్తి సహజంగా ఉంటాయి.</p>
      </div>
      <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px;">
        <strong style="color:#10b981;">3. Platform Independent (ప్లాట్‌ఫారమ్ రహిత):</strong>
        <p style="font-size:13px; color:var(--text2); margin:6px 0 0;">"Write Once, Run Anywhere". బైట్‌కోడ్ ఏ హార్డ్‌వేర్ పైనైనా సంబంధిత JVM ద్వారా నిరాటంకంగా నడుస్తుంది.</p>
      </div>
      <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px;">
        <strong style="color:#10b981;">4. Robust (దృఢమైనది):</strong>
        <p style="font-size:13px; color:var(--text2); margin:6px 0 0;">ఆటోమేటిక్ గార్బేజ్ కలెక్షన్ వల్ల మెమరీ లీక్‌లు ఉండవు. స్ట్రాంగ్ టైప్ చెకింగ్ మరియు కఠినమైన Exception Handling వ్యవస్థ క్రాష్‌లను నివారిస్తాయి.</p>
      </div>
      <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px;">
        <strong style="color:#10b981;">5. Secure (అత్యంత సురక్షితమైనది):</strong>
        <p style="font-size:13px; color:var(--text2); margin:6px 0 0;">డైరెక్ట్ పాయింటర్లు లేకపోవడం, బైట్‌కోడ్ వెరిఫైయర్, మరియు సాండ్‌బాక్స్ రన్‌టైమ్ ఆర్కిటెక్చర్ వల్ల వైరస్‌లు చొరబడలేవు.</p>
      </div>
      <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px;">
        <strong style="color:#10b981;">6. Architecture-Neutral (ఆర్కిటెక్చర్ న్యూట్రల్):</strong>
        <p style="font-size:13px; color:var(--text2); margin:6px 0 0;">డేటా టైప్ పరిమాణాలు స్థిరంగా ఉంటాయి. ఉదాహరణకు C లో <code>int</code> 16-bit లేదా 32-bit కావచ్చు; కానీ జావాలో ఏ ఆపరేటింగ్ సిస్టమ్‌లోనైనా ఎల్లప్పుడూ 32-bit మాత్రమే!</p>
      </div>
      <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px;">
        <strong style="color:#10b981;">7. Portable (సులభంగా తీసుకెళ్లగలగడం):</strong>
        <p style="font-size:13px; color:var(--text2); margin:6px 0 0;">బైట్‌కోడ్ మరియు రన్‌టైమ్ స్పెసిఫికేషన్లు పూర్తి ప్రామాణికం కావడం వల్ల ఎటువంటి మార్పులు లేకుండా ఏ పరికరానికైనా సులభంగా తరలించవచ్చు.</p>
      </div>
      <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px;">
        <strong style="color:#10b981;">8. High Performance (అధిక పనితీరు):</strong>
        <p style="font-size:13px; color:var(--text2); margin:6px 0 0;">హాట్‌స్పాట్ JIT కంపైలర్ ద్వారా తరచుగా వాడే కోడ్ నేటివ్ మెషిన్ కోడ్‌గా కంపైల్ కావడం వల్ల ఇంటర్‌ప్రీటెడ్ భాషల కంటే పదిరెట్లు వేగంగా పనిచేస్తుంది.</p>
      </div>
      <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px;">
        <strong style="color:#10b981;">9. Multi-Threaded (మల్టీ-థ్రెడెడ్):</strong>
        <p style="font-size:13px; color:var(--text2); margin:6px 0 0;">ఒకే సమయంలో సమాంతరంగా బహుళ పనులను చేయడానికి ఇన్-బిల్ట్ థ్రెడింగ్ సపోర్ట్. Java 21 Virtual Threads తో మిలియన్ల కొద్దీ లైట్‌వెయిట్ థ్రెడ్లను నడపవచ్చు.</p>
      </div>
      <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px;">
        <strong style="color:#10b981;">10. Distributed (డిస్ట్రిబ్యూటెడ్):</strong>
        <p style="font-size:13px; color:var(--text2); margin:6px 0 0;">TCP/IP నెట్‌వర్కింగ్, HTTP క్లయింట్లు, RMI, మరియు ఆధునిక మైక్రోసర్వీసులు (Spring Cloud) ద్వారా క్లౌడ్‌లో పంపిణీ చేయబడిన సిస్టమ్‌లను నిర్మించడానికి అత్యుత్తమం.</p>
      </div>
    </div>

    <!-- SECTION 12 -->
    <h2 class="section-title"><span class="num">12</span> పరిశ్రమలో జావా అప్లికేషన్లు &amp; డెవలపర్ కెరీర్ రోడ్‌మ్యాప్</h2>
    <p>
      ప్రపంచవ్యాప్తంగా అగ్రశ్రేణి ఐటీ సంస్థలు (Google, Amazon, Microsoft, Netflix, Goldman Sachs, TCS, Infosys, Wipro) ఎందుకు జావా డెవలపర్లకు భారీ ప్యాకేజీలు అందిస్తున్నాయి? ఎందుకంటే మిషన్-క్రిటికల్ అప్లికేషన్లలో జావాకు సాటి మరొకటి లేదు:
    </p>
    <ul>
      <li><strong>Enterprise Backend Microservices:</strong> ప్రపంచంలోని 70% కంటే ఎక్కువ బ్యాకెండ్ వ్యవస్థలు <strong>Spring Boot</strong> మరియు <strong>Spring Cloud</strong> ఆధారంగా నడుస్తున్నాయి.</li>
      <li><strong>FinTech &amp; Core Banking:</strong> వీసా (Visa), మాస్టర్ కార్డ్ (Mastercard), బ్యాంక్ ఆఫ్ అమెరికా, SBI వంటి సంస్థలు సెకనుకు లక్షలాది క్రెడిట్ కార్డు లావాదేవీలను ప్రాసెస్ చేయడానికి జావా యొక్క హై-కాంకరెన్సీ ఆర్కిటెక్చర్‌ను ఉపయోగిస్తాయి.</li>
      <li><strong>Big Data Platforms:</strong> Apache Spark, Apache Kafka, Apache Hadoop, Apache Flink వంటి ఆధునిక బిగ్ డేటా ఇంజిన్లన్నీ జావా మరియు జేవీఎమ్ పైనే నిర్మించబడ్డాయి.</li>
      <li><strong>Android App Development:</strong> గూగుల్ ఆండ్రాయిడ్ ఆపరేటింగ్ సిస్టమ్‌లోని దాదాపు 3 బిలియన్లకు పైగా మొబైల్ పరికరాల్లో కోర్ యాప్స్ జావా ఫ్రేమ్‌వర్క్‌పై నడుస్తున్నాయి.</li>
    </ul>

    <!-- SECTION 13 -->
    <h2 class="section-title"><span class="num">13</span> ముగింపు &amp; తర్వాతి అధ్యాయం అవలోకనం</h2>
    <p>
      ఈ మొదటి అధ్యాయంలో జావా మూలాలు, ప్లాట్‌ఫారమ్ ఇండిపెండెన్స్ యొక్క అసలైన మెకానిజం, JDK/JRE/JVM మధ్య వ్యత్యాసాలు, క్లాస్‌లోడర్ సబ్‌సిస్టమ్ మరియు JVM మెమరీ ఆర్కిటెక్చర్‌ను సమగ్రంగా అర్థం చేసుకున్నారు.
    </p>
    <p>
      <strong>తర్వాతి అధ్యాయం (చాప్టర్ 02):</strong> మన కంప్యూటర్‌లో ఆధునిక <strong>OpenJDK 21 LTS</strong> ఇన్‌స్టాలేషన్, పర్యావరణ వేరియబుల్స్ (<code>JAVA_HOME</code>, <code>PATH</code>) కాన్ఫిగరేషన్, VS Code మరియు IntelliJ IDEA లో ప్రొఫెషనల్ సెటప్, మరియు కమాండ్ లైన్ నుండి <code>javac</code> మరియు <code>java</code> ద్వారా మన మొట్టమొదటి ప్రోగ్రామ్‌ను ఎలా కంపైల్ చేసి రన్ చేయాలో ప్రాక్టికల్‌గా నేర్చుకుందాం!
    </p>

    <!-- 5 INTERACTIVE QUIZZES -->
    <h2 class="section-title" style="margin-top:40px;"><span class="num">?</span> మీ అవగాహనను పరీక్షించుకోండి (5 Interactive Quizzes)</h2>

    <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
      <summary style="cursor:pointer; font-weight:600; color:#10b981; font-size:14.5px;">1. "Java is Platform-Independent, but JVM is Platform-Dependent" — దీని అర్థం ఏమిటి?</summary>
      <div style="font-size:13.5px; color:var(--text); line-height:1.7; margin-top:10px;">
        <strong>సమాధానం:</strong> జావా కంపైలర్ (<code>javac</code>) సృష్టించే <strong>Bytecode (.class)</strong> అన్ని ఆపరేటింగ్ సిస్టమ్‌లకు ఒకేలా ఉంటుంది (Platform-Independent). కానీ ఆ బైట్‌కోడ్‌ను ఆయా ఆపరేటింగ్ సిస్టమ్‌ల నేటివ్ మెషిన్ కోడ్‌గా మార్చడానికి Windows కోసం ప్రత్యేక JVM, Linux కోసం ప్రత్యేక JVM అవసరమవుతాయి (కాబట్టి JVM అనేది Platform-Dependent).
      </div>
    </details>

    <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
      <summary style="cursor:pointer; font-weight:600; color:#10b981; font-size:14.5px;">2. JDK మరియు JRE మధ్య ప్రాథమిక వ్యత్యాసం ఏమిటి? డెవలపర్‌కు ఏది అవసరం?</summary>
      <div style="font-size:13.5px; color:var(--text); line-height:1.7; margin-top:10px;">
        <strong>సమాధానం:</strong> JRE (Java Runtime Environment) లో ప్రోగ్రామ్‌లను రన్ చేయడానికి అవసరమైన JVM మరియు కోర్ లైబ్రరీలు మాత్రమే ఉంటాయి. JDK (Java Development Kit) లో JRE తో పాటు కోడ్ రాయడానికి, కంపైల్ చేయడానికి అవసరమైన <code>javac</code> కంపైలర్ మరియు డీబగ్గర్ టూల్స్ ఉంటాయి. కాబట్టి జావా కోడ్ రాసే డెవలపర్‌లకు తప్పనిసరిగా <strong>JDK</strong> అవసరం.
      </div>
    </details>

    <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
      <summary style="cursor:pointer; font-weight:600; color:#10b981; font-size:14.5px;">3. క్లాస్‌లోడర్ లోని Parent Delegation Algorithm సిస్టమ్ భద్రతకు ఎలా తోడ్పడుతుంది?</summary>
      <div style="font-size:13.5px; color:var(--text); line-height:1.7; margin-top:10px;">
        <strong>సమాధానం:</strong> ఏదైనా క్లాస్ లోడ్ అయ్యేటప్పుడు మొదట మూల పేరెంట్ అయిన Bootstrap ClassLoader కి రిక్వెస్ట్ వెళ్తుంది. ఎవరైనా హ్యాకర్ సొంతంగా నకిలీ <code>java.lang.String</code> లేదా <code>java.lang.System</code> రాసినప్పటికీ, బూట్‌స్ట్రాప్ క్లాస్‌లోడర్ అసలైన సురక్షిత జావా రన్‌టైమ్ క్లాస్‌ను మాత్రమే లోడ్ చేస్తుంది. దీనివల్ల సిస్టమ్ క్లాసెస్ హైజాక్ కాకుండా రక్షించబడతాయి.
      </div>
    </details>

    <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
      <summary style="cursor:pointer; font-weight:600; color:#10b981; font-size:14.5px;">4. JVM Stack Area మరియు Heap Area ల మధ్య ప్రధాన తేడాలు ఏమిటి?</summary>
      <div style="font-size:13.5px; color:var(--text); line-height:1.7; margin-top:10px;">
        <strong>సమాధానం:</strong> <strong>Heap Area</strong> లో <code>new</code> ద్వారా క్రియేట్ అయిన అన్ని ఆబ్జెక్టులు నిల్వ ఉంటాయి మరియు ఇది అన్ని థ్రెడ్లకూ షేర్ చేయబడుతుంది (ఇక్కడ గార్బేజ్ కలెక్షన్ జరుగుతుంది). <strong>Stack Area</strong> ప్రతి థ్రెడ్‌కు ప్రత్యేకంగా ఉంటుంది; ఇందులో మెథడ్ కాల్స్ యొక్క స్టాక్ ఫ్రేమ్‌లు మరియు లోకల్ వేరియబుల్స్ ఉంటాయి. మెథడ్ పూర్తి కాగానే స్టాక్ ఫ్రేమ్ ఆటోమేటిక్‌గా డిలీట్ అవుతుంది.
      </div>
    </details>

    <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
      <summary style="cursor:pointer; font-weight:600; color:#10b981; font-size:14.5px;">5. JIT (Just-In-Time) కంపైలర్ జావా ప్రోగ్రామ్‌ల వేగాన్ని ఎలా పెంచుతుంది?</summary>
      <div style="font-size:13.5px; color:var(--text); line-height:1.7; margin-top:10px;">
        <strong>సమాధానం:</strong> సాధారణ ఇంటర్‌ప్రీటర్ బైట్‌కోడ్‌ను లైన్-బై-లైన్ చదవడం వల్ల రిపీటెడ్ లూప్స్ నెమ్మదిస్తాయి. JIT కంపైలర్ తరచుగా రన్ అయ్యే "Hot Spots" కోడ్‌ను గుర్తించి నేరుగా నేటివ్ మెషిన్ కోడ్‌గా కంపైల్ చేసి మెమరీలో క్యాష్ చేస్తుంది. తదుపరి కాల్స్‌లో ఇంటర్‌ప్రీటర్ లేకుండా నేరుగా మెషిన్ స్పీడ్‌తో రన్ అవ్వడం వల్ల జావాకు అద్భుతమైన వేగం లభిస్తుంది.
      </div>
    </details>

    <!-- PREV / NEXT CHAPTER NAVIGATION -->
    <div style="display:flex; justify-content:space-between; align-items:center; margin-top:40px; padding-top:20px; border-top:1px solid var(--border); flex-wrap:wrap; gap:16px;">
      <a href="/blog-java.html" style="text-decoration:none; color:var(--text); font-weight:600; display:inline-flex; align-items:center; gap:8px; background:var(--bg2); padding:10px 18px; border-radius:8px; border:1px solid var(--border);">
        ← జావా ఇండెక్స్ (హోమ్)
      </a>
      <a href="/blog-java/02-java-installation-ide-and-first-program.html" style="text-decoration:none; color:#ffffff; font-weight:700; display:inline-flex; align-items:center; gap:8px; background:#10b981; padding:10px 22px; border-radius:8px; box-shadow:0 4px 12px rgba(16,185,129,0.3);">
        తర్వాతి అధ్యాయం: 02. ఎన్విరాన్‌మెంట్ సెటప్ &amp; మొదటి ప్రోగ్రామ్ →
      </a>
    </div>

    <!-- INTERACTIVE COMPILER CTA CARD -->
    <div style="margin-top:40px; background:linear-gradient(135deg, rgba(16,185,129,0.1) 0%, rgba(56,189,248,0.1) 100%); border:1px solid rgba(16,185,129,0.3); border-radius:12px; padding:24px; text-align:center;">
      <h3 style="margin-top:0; color:var(--text); font-size:20px;">ఈ జావా ప్రోగ్రామ్‌లను లైవ్‌గా మన కంపైలర్‌లో రన్ చేసి పరీక్షించండి!</h3>
      <p style="color:var(--text2); max-width:650px; margin:8px auto 20px; font-size:14px; line-height:1.6;">
        ఎటువంటి లోకల్ సెటప్ లేదా JDK ఇన్‌స్టాలేషన్ అవసరం లేకుండా, బ్రౌజర్‌లోనే Modern Java 21 కంపైలర్‌లో ఈ కోడ్‌ను ఎగ్జిక్యూట్ చేసి అవుట్‌పుట్ తనిఖీ చేయండి.
      </p>
      <button onclick="openInteractiveCompiler()" style="background:#10b981; color:#ffffff; border:none; padding:12px 28px; font-size:15px; font-weight:700; border-radius:8px; cursor:pointer; transition:transform 0.15s ease;" onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">
        ▶ Launch Java Interactive Compiler
      </button>
    </div>

  </main>
</div>

<!-- FOOTER / NAV SCRIPTS -->
<script src="/site-nav.js"></script>

<script>
  function openInteractiveCompiler() {
    const projectCode = \`// =====================================================================
// చాప్టర్ 01 లైవ్ డెమో: జావా పరిచయం & JVM ఆర్కిటెక్చర్
// =====================================================================
public class Main {
    public static void main(String[] args) {
        System.out.println("నమస్కారం! Modern Java 21+ Masterclass లోకి స్వాగతం!");
        System.out.println("--------------------------------------------------");
        System.out.println("Java Version : " + System.getProperty("java.version"));
        System.out.println("VM Engine    : " + System.getProperty("java.vm.name"));
        System.out.println("OS Name      : " + System.getProperty("os.name"));
        System.out.println("CPU Cores    : " + Runtime.getRuntime().availableProcessors());
        System.out.println("Max Memory   : " + (Runtime.getRuntime().maxMemory() / (1024 * 1024)) + " MB");
        System.out.println("--------------------------------------------------");
        System.out.println("✅ \"Write Once, Run Anywhere (WORA)\" లైవ్ టెస్ట్ సక్సెస్!");
    }
}
\`;

    try {
      localStorage.setItem('code_java', projectCode);
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
    window.open('/online-java-compiler.html', '_blank');
  }
</script>

</body>
</html>
`;

const outputPath = path.join(__dirname, '..', 'public', 'blog-java', currentLesson.file);
fs.writeFileSync(outputPath, chapter01Content, 'utf8');
console.log('✅ Successfully generated deep high-value Java Chapter 01 in exact HTML style!');
console.log('Target file:', currentLesson.file);
console.log('Target file size:', chapter01Content.length, 'characters');
