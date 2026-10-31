const fs = require('fs');
const path = require('path');
const { LESSONS, buildSidebar } = require('./c_curriculum_data.js');

const lesson = LESSONS.find(l => l.num === 1);
const sidebarHtml = buildSidebar(1);

const chapterContentHtml = `
    <!-- BREADCRUMB -->
    <div class="breadcrumb">
      <a href="/">Home</a><span class="sep">›</span>
      <a href="/blog.html">Tutorials</a><span class="sep">›</span>
      <a href="/blog-c.html">C Masterclass</a><span class="sep">›</span>
      <span class="current">Chapter 1: C పరిచయం, చరిత్ర &amp; మొదటి ప్రోగ్రామ్ (Hello World)</span>
    </div>

    <!-- PAGE TITLE -->
    <h1 class="page-title">C పరిచయం, చరిత్ర &amp; మొదటి ప్రోగ్రామ్ (Hello World)</h1>

    <!-- PAGE META BADGES -->
    <div class="page-meta">
      <span class="badge">⚡ Modern C (C99 / C11 / C17 Standards)</span>
      <span class="badge">🟢 Chapter 01 of 20</span>
      <span class="badge">📂 Phase 01: బేసిక్స్ &amp; మెమరీ ఆర్కిటెక్చర్</span>
      <span class="badge">📅 2026 Academic Edition</span>
    </div>

    <!-- SUBTOPICS PILL BAR -->
    <div style="background:var(--bg3); border:1px solid var(--border); border-radius:8px; padding:10px 16px; margin-bottom:24px; font-size:13px; color:var(--text2); display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
      <span style="color:#10b981; font-weight:700;">📌 Covered in this chapter:</span>
      <span>Dennis Ritchie హిస్టరీ &amp; Bell Labs · C ఎందుకు "Mother of All Languages"? · GCC 4-దశల కంపైలేషన్ పైప్‌లైన్ · main() ఎగ్జిక్యూషన్ మెకానిక్స్ · printf() ఫార్మాటింగ్ · return 0 ప్రాముఖ్యత · void main() కాలేజీ మిత్ బ్రేక్‌డౌన్ · క్విజ్ &amp; లైవ్ కంపైలర్ ట్రై-బాక్స్</span>
    </div>

    <!-- INTRO ACCENT BOX (Warm Ivory with Green Accent) -->
    <div class="intro-box">
      <p>1960ల చివరలో కంప్యూటర్లు భారీ గదులంత పరిమాణంలో ఉండేవి. ఆ రోజుల్లో ఒక కంప్యూటర్‌కు ప్రోగ్రామ్ రాయాలంటే అసెంబ్లీ లాంగ్వేజ్ (Assembly Language) లోని కష్టతరమైన మెషిన్ సూచనలను ఉపయోగించాల్సి వచ్చేది. ఒక కంప్యూటర్ మోడల్ కోసం రాసిన కోడ్ మరొక మోడల్‌పై అస్సలు పనిచేసేది కాదు. ఈ తీవ్రమైన సమస్యను పరిష్కరించి, ప్రపంచ సాంకేతిక చరిత్రను శాశ్వతంగా మార్చివేసిన ఒక అద్భుత సృష్టి — <strong>C ప్రోగ్రామింగ్ లాంగ్వేజ్!</strong></p>
      <p>1972 లో అమెరికాలోని ప్రసిద్ధ బెల్ లాబొరేటరీస్ (Bell Labs) లో లెజెండరీ కంప్యూటర్ శాస్త్రవేత్త <strong>Dennis Ritchie (డెన్నిస్ రిట్చీ)</strong> C భాషను రూపొందించారు. కేవలం UNIX ఆపరేటింగ్ సిస్టమ్‌ను నిర్మించడానికి పుట్టిన ఈ భాష — అనతికాలంలోనే ఆధునిక సాఫ్ట్‌వేర్ సామ్రాజ్యానికి పునాదిరాయిగా మారింది. నేడు మనం వాడుతున్న Windows OS, Linux, Android, iOS, మరియు ఆధునిక ప్రోగ్రామింగ్ భాషలైన C++, Java, Python, C#, Go, Rust లన్నింటి మూలాలూ C తోనే ముడిపడి ఉన్నాయి!</p>
      <p>ఈ ప్రారంభ అధ్యాయంలో, కంప్యూటర్ మెమరీ మరియు సిలికాన్ చిప్ స్థాయిలోకి తొంగిచూస్తూ — C భాష ఎందుకు అన్ని భాషలకూ తల్లి (Mother of Programming) అయ్యిందో, GCC కంపైలర్ మీ కోడ్‌ను మెషిన్ లాంగ్వేజ్‌గా ఎలా మారుస్తుందో, మరియు మీ మొదటి C ప్రోగ్రామ్ యొక్క ప్రతి అక్షరం వెనుక దాగి ఉన్న అంతర్గత రహస్యాలను లోతుగా అన్వేషిద్దాం!</p>
    </div>

    <!-- SECTION 1 -->
    <div class="section-title"><span class="num">1</span>ఈ Chapter లో మీరు నేర్చుకునే అంశాలు</div>
    <div class="section-body">
      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.7;">
        <li><strong>C లాంగ్వేజ్ పుట్టుక &amp; చరిత్ర:</strong> Dennis Ritchie, Ken Thompson మరియు UNIX ఆపరేటింగ్ సిస్టమ్ విప్లవం.</li>
        <li><strong>C లాంగ్వేజ్ యొక్క 4 ప్రాథమిక స్తంభాలు:</strong> డైరెక్ట్ మెమరీ యాక్సెస్, జీరో రన్‌టైమ్ ఓవర్‌హెడ్, పోర్టబిలిటీ, మరియు డిటర్మినిస్టిక్ పెర్ఫార్మెన్స్.</li>
        <li><strong>GCC కంపైలర్ పైప్‌లైన్ (4 Stages):</strong> ప్రీప్రాసెసింగ్, కంపైలేషన్, అసెంబ్లీ, మరియు లింకింగ్ లోతైన విశ్లేషణ.</li>
        <li><strong>మొదటి C ప్రోగ్రామ్ అనాటమీ:</strong> Hello, World! ప్రోగ్రామ్ మరియు ప్రతి లైన్ యొక్క లోతైన అర్థం.</li>
        <li><strong>#include &lt;stdio.h&gt; రహస్యం:</strong> Preprocessor Directives మరియు C స్టాండర్డ్ లైబ్రరీ హెడర్ ఫైల్స్.</li>
        <li><strong>int main(void) ఎంట్రీ పాయింట్:</strong> CPU మరియు OS మీ ప్రోగ్రామ్‌ను ఎలా ప్రారంభిస్తాయి?</li>
        <li><strong>printf() ఫంక్షన్ పనితీరు:</strong> ఫార్మాట్ స్ట్రింగ్స్, బఫరింగ్, మరియు ఎస్కేప్ సీక్వెన్సెస్ (<code>\\n</code>, <code>\\t</code>).</li>
        <li><strong>return 0; ప్రాముఖ్యత:</strong> ఆపరేటింగ్ సిస్టమ్‌కు సక్సెస్ స్టేటస్ కోడ్ పంపడం.</li>
        <li><strong>void main() మిత్ బద్దలు:</strong> అంతర్జాతీయ ప్రమాణాల ప్రకారం (C99/C11/C17) <code>void main()</code> ఎందుకు తప్పు?</li>
        <li><strong>బిగినర్స్ చేసే ఘోరమైన తప్పులు:</strong> కామన్ సింటాక్స్ ఎర్రర్లు మరియు వాటిని నివారించే మార్గాలు.</li>
        <li><strong>ఆధునిక ఇంటరాక్టివ్ క్విజ్:</strong> మీ ఆలోచనను పరీక్షించే 5 లోతైన ప్రశ్నలు.</li>
      </ul>
    </div>

    <!-- SECTION 2 -->
    <div class="section-title"><span class="num">2</span>C లాంగ్వేజ్ చరిత్ర: Dennis Ritchie &amp; Bell Labs విప్లవం</div>
    <div class="section-body">
      <p>1960ల చివరలో MIT, Bell Labs, మరియు General Electric కలిసి <strong>Multics</strong> అనే ఆపరేటింగ్ సిస్టమ్ ప్రాజెక్ట్ ప్రారంభించాయి. అయితే ఆ ప్రాజెక్ట్ అత్యంత సంక్లిష్టంగా మారి విఫలమైంది. దాంతో బెల్ ల్యాబ్స్ ఇంజనీర్ అయిన <strong>Ken Thompson</strong>, ఒక చిన్న పాత కంప్యూటర్‌పై (PDP-7) సరళమైన ఆపరేటింగ్ సిస్టమ్‌ను నిర్మించాలని నిర్ణయించుకున్నాడు. ఆ సిస్టమ్ కోసం ఆయన <strong>B language</strong> (BCPL ఆధారంగా) అనే భాషను రూపొందించారు.</p>

      <p>కానీ B లాంగ్వేజ్ కేవలం "Typeless" (అంటే డేటా టైప్స్ ఉండవు, ప్రతిదీ ఒక మెషిన్ వర్డ్ మాత్రమే) కావడం వల్ల సంక్లిష్టమైన మెమరీ మేనేజ్‌మెంట్ మరియు హార్డ్‌వేర్ కంట్రోల్ సాధ్యం కాలేదు. ఈ లోపాన్ని గుర్తించిన <strong>Dennis Ritchie</strong>, 1972 లో B లాంగ్వేజ్‌ను అభివృద్ధి చేస్తూ డేటా టైప్స్, స్ట్రక్చర్స్, మరియు పాయింటర్ల సామర్థ్యాలను జోడించి దానికి <strong>"C"</strong> అని పేరు పెట్టారు.</p>

      <p>1973 లో డెన్నిస్ రిట్చీ మరియు కెన్ థాంప్సన్ కలిసి యావత్ <strong>UNIX Operating System కర్నల్ మొత్తాన్ని C భాషలోనే తిరిగి రాశారు</strong>. అంతవరకు ప్రపంచంలో ఏ ఆపరేటింగ్ సిస్టమ్ కూడా హై-లెవల్ లాంగ్వేజ్‌లో రాయబడలేదు (అన్నీ అసెంబ్లీలోనే రాసేవారు). ఈ సాహసోపేత నిర్ణయం సాఫ్ట్‌వేర్ రంగంలో అత్యంత పెద్ద మలుపుగా నిలిచింది!</p>

      <div style="overflow-x:auto; margin: 16px 0;">
        <table class="tbl">
          <thead>
            <tr>
              <th>మైలురాయి (Year)</th>
              <th>పరిణామం (Standard / Event)</th>
              <th>కీలక విశేషం</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>1972</strong></td>
              <td>C పుట్టుక (Dennis Ritchie at Bell Labs)</td>
              <td>UNIX కర్నల్ నిర్మాణానికి పునాది పడింది.</td>
            </tr>
            <tr>
              <td><strong>1978</strong></td>
              <td>K&amp;R C (Brian Kernighan &amp; Dennis Ritchie)</td>
              <td>"The C Programming Language" బైబిల్ లాంటి పుస్తకం వెలువడింది.</td>
            </tr>
            <tr>
              <td><strong>1989 (C89 / ANSI C)</strong></td>
              <td>ANSI ప్రమాణీకరణ (American National Standards)</td>
              <td>ఫంక్షన్ ప్రొటోటైప్స్, వాయిడ్ పాయింటర్స్ అధికారికం అయ్యాయి.</td>
            </tr>
            <tr>
              <td><strong>1999 (C99)</strong></td>
              <td>ISO/IEC 9899:1999</td>
              <td>inline ఫంక్షన్స్, <code>//</code> సింగిల్ లైన్ కామెంట్స్, <code>&lt;stdint.h&gt;</code>, వేరియబుల్ డిక్లరేషన్ ఎక్కడైనా అనుమతి.</td>
            </tr>
            <tr>
              <td><strong>2011 (C11) &amp; 2017 (C17)</strong></td>
              <td>ఆధునిక C ప్రమాణాలు</td>
              <td>మల్టీ-త్రెడింగ్ సపోర్ట్ (<code>&lt;threads.h&gt;</code>), అటామిక్ ఆపరేషన్స్ (<code>&lt;stdatomic.h&gt;</code>), సెక్యూరిటీ బగ్ ఫిక్సెస్.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- SECTION 3 -->
    <div class="section-title"><span class="num">3</span>C లాంగ్వేజ్ యొక్క 4 ప్రాథమిక స్తంభాలు (Core Pillars)</div>
    <div class="section-body">
      <p>పైథాన్, జావా వంటి ఆధునిక భాషలు వేలకొద్దీ ఉన్నప్పటికీ — నేటికీ గూగుల్, మైక్రోసాఫ్ట్, నాసా, టెస్లా మరియు ఆపిల్ కంపెనీలు తమ అత్యంత కీలకమైన సాఫ్ట్‌వేర్‌లను C లోనే ఎందుకు రాస్తాయి? దీనికి C లోని 4 అద్వితీయమైన ఫీచర్లు కారణం:</p>

      <div style="display:flex; flex-direction:column; gap:16px; margin:20px 0;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #10b981; border-radius:8px; padding:16px 20px;">
          <h4 style="color:#059669; margin:0 0 6px 0; font-size:15px; font-weight:700;">1. డైరెక్ట్ మెమరీ యాక్సెస్ (Pointers &amp; RAM Addresses):</h4>
          <p style="font-size:14px; color:var(--text2); margin:0; line-height:1.7;">
            జావా లేదా పైథాన్‌లో కంప్యూటర్ మెమరీని నేరుగా తాకలేరు; వర్చువల్ మెషిన్ మధ్యలో అడ్డుగోడగా ఉంటుంది. కానీ C లో <strong>పాయింటర్లు (Pointers)</strong> ద్వారా కంప్యూటర్ RAM లోని ప్రతి బైట్ అడ్రస్‌ను డెవలపర్ నేరుగా రీడ్ చేయవచ్చు, మోడిఫై చేయవచ్చు. హార్డ్‌వేర్ రిజిస్టర్లతో నేరుగా మాట్లాడే శక్తి C కి మాత్రమే ఉంది.
          </p>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #3b82f6; border-radius:8px; padding:16px 20px;">
          <h4 style="color:#2563eb; margin:0 0 6px 0; font-size:15px; font-weight:700;">2. జీరో రన్‌టైమ్ ఓవర్‌హెడ్ (Zero Runtime Overhead):</h4>
          <p style="font-size:14px; color:var(--text2); margin:0; line-height:1.7;">
            C కి ఎటువంటి గార్బేజ్ కలెక్టర్ (Garbage Collector) లేదా భారీ వర్చువల్ మెషిన్ (JVM లాంటివి) ఉండదు. మీ C కోడ్ కంపైలర్ ద్వారా నేరుగా ప్రాసెసర్ ఎగ్జిక్యూట్ చేయగల <strong>ప్యూర్ మెషిన్ కోడ్ (0s &amp; 1s)</strong> గా మారుతుంది. దీనివల్ల C కోడ్ కాంతి వేగంతో నడుస్తుంది.
          </p>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #f59e0b; border-radius:8px; padding:16px 20px;">
          <h4 style="color:#d97706; margin:0 0 6px 0; font-size:15px; font-weight:700;">3. అత్యున్నత పోర్టబిలిటీ (Architecture Portability):</h4>
          <p style="font-size:14px; color:var(--text2); margin:0; line-height:1.7;">
            మీ చేతిలోని స్మార్ట్‌వాచ్ (ARM Cortex), వాషింగ్ మెషీన్ మైక్రోకంట్రోలర్, లేదా ప్రపంచంలోనే అత్యంత శక్తివంతమైన సూపర్ కంప్యూటర్ — ప్రతి ఎలక్ట్రానిక్ చిప్‌కు C కంపైలర్ అందుబాటులో ఉంటుంది. ఒకసారి రాసిన C లాజిక్‌ను కొద్దిపాటి మార్పులతో ఏ డివైస్‌కైనా కంపైల్ చేయవచ్చు.
          </p>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #8b5cf6; border-radius:8px; padding:16px 20px;">
          <h4 style="color:#7c3aed; margin:0 0 6px 0; font-size:15px; font-weight:700;">4. డిటర్మినిస్టిక్ పెర్ఫార్మెన్స్ (Deterministic Predictability):</h4>
          <p style="font-size:14px; color:var(--text2); margin:0; line-height:1.7;">
            జావా లేదా పైథాన్‌లో గార్బేజ్ కలెక్టర్ ఎప్పుడు ఆన్ అవుతుందో, ఎప్పుడు ప్రోగ్రామ్ కొన్ని మిల్లీసెకన్లు ఫ్రీజ్ అవుతుందో మనం ఖచ్చితంగా చెప్పలేం. కానీ రాకెట్ లాంచ్‌లు, పేస్‌మేకర్‌లు, ఆటోమొబైల్ బ్రేకింగ్ సిస్టమ్స్ వంటి రియల్-టైమ్ సిస్టమ్స్‌లో ప్రతి మైక్రోసెకండ్ ముఖ్యం. C లో ఏ ఆపరేషన్ ఎన్ని సైకిల్స్ తీసుకుంటుందో డెవలపర్ నియంత్రణలోనే ఉంటుంది!
          </p>
        </div>
      </div>
    </div>

    <!-- SECTION 4 -->
    <div class="section-title"><span class="num">4</span>GCC కంపైలర్ పైప్‌లైన్ (The 4-Stage Compilation Process)</div>
    <div class="section-body">
      <p>చాలామంది విద్యార్థులు కోడ్ రాసి ఒక బటన్ క్లిక్ చేయగానే నేరుగా అవుట్‌పుట్ వచ్చేస్తుందని అనుకుంటారు. కానీ తెరవెనుక <strong>GCC (GNU Compiler Collection)</strong> మీ సోర్స్ కోడ్‌ను నాలుగు ప్రాథమిక దశల ద్వారా మెషిన్ లాంగ్వేజ్‌గా మారుస్తుంది. ఈ పైప్‌లైన్‌ను స్పష్టంగా అర్థం చేసుకోవడం ఒక సిస్టమ్స్ ప్రోగ్రామర్‌కు తప్పనిసరి:</p>

      <div style="overflow-x:auto; margin: 16px 0;">
        <table class="tbl">
          <thead>
            <tr>
              <th>దశ (Stage)</th>
              <th>టూల్ (Tool)</th>
              <th>కమాండ్ &amp; ఇన్‌పుట్/అవుట్‌పుట్</th>
              <th>వాస్తవంగా ఏం జరుగుతుంది?</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>1. Preprocessing</strong></td>
              <td><code>cpp</code> (C Preprocessor)</td>
              <td><code>gcc -E hello.c -o hello.i</code><br>hello.c → hello.i</td>
              <td>కామెంట్లు తొలగిస్తుంది, <code>#include</code> ఫైల్స్‌ను ఎంబెడ్ చేస్తుంది, <code>#define</code> మ్యాక్రోలను విస్తరిస్తుంది.</td>
            </tr>
            <tr>
              <td><strong>2. Compilation</strong></td>
              <td><code>cc1</code> (C Compiler)</td>
              <td><code>gcc -S hello.i -o hello.s</code><br>hello.i → hello.s</td>
              <td>C గ్రామర్ మరియు సింటాక్స్ చెక్ చేసి, ప్రాసెసర్ అర్థం చేసుకోగల <strong>అసెంబ్లీ లాంగ్వేజ్ (.s)</strong> గా మారుస్తుంది.</td>
            </tr>
            <tr>
              <td><strong>3. Assembly</strong></td>
              <td><code>as</code> (Assembler)</td>
              <td><code>gcc -c hello.s -o hello.o</code><br>hello.s → hello.o</td>
              <td>అసెంబ్లీ ఇన్‌స్ట్రక్షన్లను CPU చదవగల బైనరీ ఆబ్జెక్ట్ కోడ్ (<strong>Machine Code 0s &amp; 1s</strong>) గా మారుస్తుంది.</td>
            </tr>
            <tr>
              <td><strong>4. Linking</strong></td>
              <td><code>ld</code> (Linker)</td>
              <td><code>gcc hello.o -o hello.exe</code><br>hello.o + libc → hello.exe</td>
              <td>మీ ఆబ్జెక్ట్ ఫైల్‌ను C స్టాండర్డ్ లైబ్రరీ ఫంక్షన్లతో (<code>printf</code> మొదలైనవి) అనుసంధానించి ఫైనల్ ఎగ్జిక్యూటబుల్ ఫైల్‌ను ఉత్పత్తి చేస్తుంది.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="tip-box">
        💡 <strong>గమనిక:</strong> మనం టెర్మినల్‌లో సాధారణంగా <code>gcc hello.c -o hello</code> అని ఒక్క కమాండ్ ఇస్తాం. అప్పుడు GCC ఈ నాలుగు దశలను స్వయంచాలకంగా ఒకదాని తర్వాత ఒకటి పూర్తి చేసి తుది ఎగ్జిక్యూటబుల్ ఫైల్‌ను సిద్ధం చేస్తుంది.
      </div>
    </div>

    <!-- SECTION 5 -->
    <div class="section-title"><span class="num">5</span>మొదటి C ప్రోగ్రామ్: Hello, World! కోడ్ అనాటమీ</div>
    <div class="section-body">
      <p>ప్రపంచవ్యాప్తంగా ప్రతి ప్రోగ్రామర్ తన ప్రయాణాన్ని ప్రారంభించే సాంప్రదాయ ప్రోగ్రామ్ "Hello, World!". ఆధునిక C ప్రమాణాలకు అనుగుణంగా ఉన్న స్వచ్ఛమైన కోడ్ ఇది:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Hello World (Modern C Standard)</span>
          <div class="code-actions">
            <a class="try-btn" href="/online-c-compiler.html" target="_blank">▶ Run in Online C Compiler</a>
          </div>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

// ప్రోగ్రామ్ యొక్క ప్రధాన ప్రవేశ ద్వారం
int main(void) {
    // కన్సోల్ స్క్రీన్‌పై సందేశాన్ని ముద్రించడం
    printf("నమస్కారం, C ప్రోగ్రామింగ్ ప్రపంచానికి స్వాగతం!\n");
    
    // ఆపరేటింగ్ సిస్టమ్‌కు సక్సెస్ సిగ్నల్ పంపడం
    return 0;
}</code></pre>
      </div>

      <p>ఈ 7 లైన్ల చిన్న ప్రోగ్రామ్‌లో ప్రతి అక్షరానికీ కంప్యూటర్ ఆర్కిటెక్చర్‌లో ఒక స్పష్టమైన, లోతైన బాధ్యత ఉంది. వాటిని తర్వాతి సెక్షన్లలో విడమరిచి చూద్దాం!</p>
    </div>

    <!-- SECTION 6 -->
    <div class="section-title"><span class="num">6</span>#include &lt;stdio.h&gt; అంటే ఏమిటి? Preprocessor రహస్యం</div>
    <div class="section-body">
      <p>కోడ్‌లోని మొట్టమొదటి లైన్: <code>#include &lt;stdio.h&gt;</code>. దీనిని విడగొట్టి చూస్తే:</p>

      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.7;">
        <li><code>#</code> (Hash / Pound): హాష్ గుర్తుతో మొదలయ్యే ప్రతి లైన్ <strong>Preprocessor Directive</strong>. అంటే అసలు కంపైలర్ కోడ్‌ను చూడకముందే "ప్రీప్రాసెసర్" అనే టూల్ ఈ లైన్‌ను ప్రాసెస్ చేస్తుంది.</li>
        <li><code>include</code>: బాహ్య ఫైల్‌లోని కంటెంట్‌ను తీసుకొచ్చి ఈ కోడ్‌లో సరిగ్గా ఇక్కడే కాపీ చేసి పేస్ట్ చేయమని ఇచ్చే ఆదేశం.</li>
        <li><code>stdio.h</code>: <strong>Standard Input Output Header</strong> ఫైల్. ఇందులో స్క్రీన్‌పై టెక్స్ట్ ప్రింట్ చేసే <code>printf()</code>, కీబోర్డ్ నుండి ఇన్‌పుట్ తీసుకునే <code>scanf()</code> వంటి ఫంక్షన్ల యొక్క డిక్లరేషన్లు (Function Signatures) ఉంటాయి.</li>
        <li><code>&lt; &gt;</code> (Angle Brackets): ఈ హెడర్ ఫైల్ సిస్టమ్ యొక్క స్టాండర్డ్ లైబ్రరీ ఫోల్డర్‌లో (ఉదా: Linux లో <code>/usr/include/</code>) ఉందని కంపైలర్‌కు చెబుతుంది. మన సొంత హెడర్ ఫైల్స్ అయితే డబుల్ కోట్స్ <code>#include "myheader.h"</code> లో పెడతాం.</li>
      </ul>

      <div class="tip-box">
        ⚠️ <strong>ప్రీప్రాసెసింగ్ మ్యాజిక్:</strong> మీరు <code>gcc -E hello.c</code> రన్ చేసి చూస్తే — మీ 7 లైన్ల కోడ్ దాదాపు <strong>800+ లైన్ల</strong> కోడ్‌గా మారిపోతుంది! ఎందుకంటే <code>stdio.h</code> లో ఉన్న అన్ని టైప్ డిఫినిషన్లు, మ్యాక్రోలు మీ ఫైల్‌లోకి ఆటోమేటిక్‌గా ఇంజెక్ట్ అవుతాయి.
      </div>
    </div>

    <!-- SECTION 7 -->
    <div class="section-title"><span class="num">7</span>int main(void) ఎగ్జిక్యూషన్ ఎంట్రీ పాయింట్: CPU &amp; OS హ్యాండ్‌షేక్</div>
    <div class="section-body">
      <p>ఒక C ప్రోగ్రామ్‌లో వేల సంఖ్యలో ఫంక్షన్లు ఉండవచ్చు. కానీ ఆపరేటింగ్ సిస్టమ్ ప్రోగ్రామ్‌ను రన్ చేయడానికి కేవలం ఒకే ఒక ప్రత్యేక పేరు గల ఫంక్షన్ కోసం వెతుకుతుంది — అదే <strong>main()</strong>!</p>

      <div style="background:var(--bg2); border:1px solid var(--border); border-radius:10px; padding:20px; margin:16px 0;">
        <h4 style="color:#059669; margin:0 0 10px 0; font-size:16px;">int main(void) అనాటమీ:</h4>
        <ul style="margin:0; padding-left:20px; color:var(--text2); font-size:14px; line-height:1.8;">
          <li><strong>int (Return Type):</strong> ఈ ఫంక్షన్ తన పని ముగించుకున్నాక ఆపరేటింగ్ సిస్టమ్‌కు ఒక పూర్ణాంక సంఖ్యను (Integer Exit Code) బహుమతిగా తిరిగి ఇస్తుందని కంపైలర్‌కు ప్రకటిస్తుంది.</li>
          <li><strong>main:</strong> ప్రోగ్రామ్ యొక్క ఎగ్జిక్యూషన్ ప్రారంభమయ్యే అధికారిక ఎంట్రీ పాయింట్ (Entry Point). ఈ పేరును మార్చకూడదు.</li>
          <li><strong>void (Parameter List):</strong> ఈ ఫంక్షన్ ఎటువంటి ఇన్‌పుట్ పారామీటర్లను ఆశించడం లేదని స్పష్టంగా తెలియజేస్తుంది. (కమాండ్ లైన్ ఆర్గ్యుమెంట్లు అవసరమైనప్పుడు <code>int main(int argc, char *argv[])</code> వాడతాం).</li>
          <li><strong>{ } (Curly Braces):</strong> మెయిన్ ఫంక్షన్ యొక్క పరిధిని (Scope / Body) సూచిస్తాయి. ప్రోగ్రామ్ ఎగ్జిక్యూషన్ ఓపెనింగ్ బ్రేస్ <code>{</code> వద్ద మొదలై క్లోజింగ్ బ్రేస్ <code>}</code> వద్ద ముగుస్తుంది.</li>
        </ul>
      </div>
    </div>

    <!-- SECTION 8 -->
    <div class="section-title"><span class="num">8</span>printf() మెకానిక్స్: ఫార్మాట్ స్ట్రింగ్స్ &amp; ఎస్కేప్ సీక్వెన్సెస్</div>
    <div class="section-body">
      <p><code>printf</code> అనేది C లో ప్రింట్ చేయడానికి ఉపయోగించే ఫంక్షన్. <code>printf</code> అంటే <strong>Print Formatted</strong> అని అర్థం. ఇది సాధారణ ప్రింట్ స్టేట్‌మెంట్ మాత్రమే కాదు; వేరియబుల్స్, నంబర్లు, క్యారెక్టర్లను ఒక ఫార్మాట్ ప్రకారం కన్సోల్ స్క్రీన్‌పై ముద్రించే ఒక అధునాతన ఫంక్షన్.</p>

      <h4 style="color:#059669; font-size:16px; margin-top:20px;">ముఖ్యమైన ఎస్కేప్ సీక్వెన్సెస్ (Escape Sequences):</h4>
      <p>టెక్స్ట్ ముద్రించేటప్పుడు కర్సర్‌ను నియంత్రించడానికి బ్యాక్‌స్లాష్ <code>\\</code> తో మొదలయ్యే ప్రత్యేక గుర్తులను ఉపయోగిస్తాం:</p>

      <div style="overflow-x:auto; margin: 16px 0;">
        <table class="tbl">
          <thead>
            <tr>
              <th>ఎస్కేప్ సీక్వెన్స్</th>
              <th>పేరు</th>
              <th>పనితీరు (Action)</th>
              <th>ఉదాహరణ కోడ్ &amp; ఫలితం</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>\\n</code></td>
              <td>Newline</td>
              <td>కర్సర్‌ను వెంటనే తర్వాతి లైన్‌కు తీసుకెళ్తుంది.</td>
              <td><code>printf("Hello\\nWorld");</code> → రెండు లైన్లలో వస్తుంది.</td>
            </tr>
            <tr>
              <td><code>\\t</code></td>
              <td>Horizontal Tab</td>
              <td>కర్సర్‌ను 4 లేదా 8 స్పేస్‌ల దూరం ముందుకు జరుపుతుంది (కాలమ్స్ కోసం).</td>
              <td><code>printf("పేరు:\\tరమేష్");</code> → పేరు:    రమేష్</td>
            </tr>
            <tr>
              <td><code>\\\\</code></td>
              <td>Backslash</td>
              <td>స్క్రీన్‌పై ఒక బ్యాక్‌స్లాష్ గుర్తును ప్రింట్ చేస్తుంది.</td>
              <td><code>printf("C:\\\\tc\\\\bin");</code> → C:\\tc\\bin</td>
            </tr>
            <tr>
              <td><code>\\"</code></td>
              <td>Double Quote</td>
              <td>స్ట్రింగ్ లోపల కొటేషన్ మార్క్‌ను ముద్రిస్తుంది.</td>
              <td><code>printf("అతను \\"హాయ్\\" అన్నాడు");</code> → అతను "హాయ్" అన్నాడు</td>
            </tr>
            <tr>
              <td><code>\\a</code></td>
              <td>Alert (Bell)</td>
              <td>కంప్యూటర్ స్పీకర్ నుండి చిన్న బీప్ శబ్దం వినిపిస్తుంది.</td>
              <td><code>printf("\\aహెచ్చరిక!");</code></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="tip-box">
        💡 <strong>సెమికోలన్ (Semicolon ;) నియమం:</strong> ఆంగ్ల భాషలో ఒక వాక్యం పూర్తయితే ఫుల్‌స్టాప్ (<code>.</code>) ఎలా పెడతామో — C లాంగ్వేజ్‌లో ప్రతి ఎగ్జిక్యూటబుల్ స్టేట్‌మెంట్ ముగింపులో <strong>సెమికోలన్ (;)</strong> తప్పనిసరి. సెమికోలన్ లేకపోతే కంపైలర్ <code>error: expected ';' before token</code> అని గగ్గోలు పెడుతుంది!
      </div>
    </div>

    <!-- SECTION 9 -->
    <div class="section-title"><span class="num">9</span>return 0; ప్రాముఖ్యత: OS Exit Status Codes</div>
    <div class="section-body">
      <p>చాలామంది ప్రోగ్రామర్లు <code>return 0;</code> అనేది ఒక సాంప్రదాయ లైన్ మాత్రమే అనుకుంటారు. కానీ ఆపరేటింగ్ సిస్టమ్ దృక్కోణంలో ఇది అత్యంత కీలకమైన లైన్!</p>

      <p>ఒక C ప్రోగ్రామ్ రన్ అవుతున్నప్పుడు, దానిని ఆపరేటింగ్ సిస్టమ్ యొక్క షెల్ (Bash లేదా Windows CMD) ఒక <strong>చైల్డ్ ప్రాసెస్ (Child Process)</strong> గా నడుపుతుంది. ప్రోగ్రామ్ పని పూర్తయిన తర్వాత తన పేరెంట్ ప్రాసెస్‌కు ఒక నివేదికను (Exit Code) అందజేయాలి:</p>

      <div style="background:var(--bg2); border:1px solid var(--border); border-radius:10px; padding:18px; margin:16px 0;">
        <ul style="margin:0; padding-left:20px; color:var(--text2); font-size:14.5px; line-height:1.8;">
          <li><code>return 0;</code> : <strong>సక్సెస్ (Success) కోడ్!</strong> ప్రోగ్రామ్ ఎలాంటి లోపాలు లేకుండా, సురక్షితంగా తన లక్ష్యాన్ని పూర్తి చేసిందని ఆపరేటింగ్ సిస్టమ్‌కు తెలియజేస్తుంది.</li>
          <li><code>return 1;</code> (లేదా సున్నా కాని ఏదైనా సంఖ్య) : <strong>వైఫల్యం (Failure / Error)!</strong> ఫైల్ దొరకకపోవడం, నెట్‌వర్క్ ఫెయిల్ అవ్వడం లేదా మెమరీ లోపం వల్ల ప్రోగ్రామ్ మధ్యలోనే ఆగిపోయిందని సూచిస్తుంది.</li>
        </ul>
      </div>

      <p>లైనక్స్ టెర్మినల్‌లో ప్రోగ్రామ్ రన్ అయ్యాక <code>echo $?</code> అని టైప్ చేస్తే — మీ ప్రోగ్రామ్ రిటర్న్ చేసిన ఆ సంఖ్య (0) స్క్రీన్ మీద కనిపిస్తుంది!</p>
    </div>

    <!-- SECTION 10 -->
    <div class="section-title"><span class="num">10</span>void main() ఎందుకు కాలేజీ మిత్ &amp; నిషేధిత సింటాక్స్?</div>
    <div class="section-body">
      <p>భారతదేశంలోని అనేక ఇంజనీరింగ్ కాలేజీలలో పాత సిలబస్‌ను అనుసరిస్తూ ఇప్పటికీ ప్రొఫెసర్లు బోర్డు మీద <code>void main()</code> అని రాస్తుంటారు. కానీ ప్రపంచ ఇంటర్వ్యూలలో లేదా గూగుల్/మైక్రోసాఫ్ట్ వంటి టాప్ కంపెనీల కోడింగ్ టెస్టులలో <code>void main()</code> రాస్తే అది తప్పుడు కోడ్‌గా పరిగణించబడుతుంది!</p>

      <div style="overflow-x:auto; margin: 16px 0;">
        <table class="tbl">
          <thead>
            <tr>
              <th>అంశం (Factor)</th>
              <th>void main() (పాత పద్ధతి)</th>
              <th>int main(void) (ఆధునిక ప్రమాణం)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>C స్టాండర్డ్ కంప్లైయన్స్</strong></td>
              <td>❌ C99, C11, C17, C23 ప్రమాణాలలో అనుమతించబడదు (Non-Standard).</td>
              <td>✅ అధికారిక అంతర్జాతీయ C ప్రమాణాల ప్రకారం 100% సరైనది.</td>
            </tr>
            <tr>
              <td><strong>OS Exit Status</strong></td>
              <td>ఆపరేటింగ్ సిస్టమ్‌కు ఎగ్జిట్ స్టేటస్ వెళ్ళదు (గార్బేజ్ విలువ వెళ్తుంది).</td>
              <td>ఆపరేటింగ్ సిస్టమ్‌కు స్పష్టమైన ఎగ్జిట్ కోడ్ (0) అందుతుంది.</td>
            </tr>
            <tr>
              <td><strong>కంపైలర్ బిహేవియర్</strong></td>
              <td>ఆధునిక GCC / Clang కంపైలర్లలో <code>warning: return type of 'main' is not 'int'</code> వస్తుంది.</td>
              <td>జీరో వార్నింగ్స్, క్లీన్ కంపైలేషన్.</td>
            </tr>
            <tr>
              <td><strong>ఉపయోగించబడిన సందర్భం</strong></td>
              <td>1990ల నాటి పాత Turbo C++ DOS ఎమ్యులేటర్.</td>
              <td>ఆధునిక Linux, Windows 11, macOS, 64-bit GCC/Clang.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="tip-box">
        💡 <strong>గోల్డెన్ రూల్:</strong> నేటి నుండి మీ జీవితంలో ఎప్పుడూ <code>void main()</code> రాయకండి; ఎల్లప్పుడూ <strong><code>int main(void)</code></strong> లేదా <strong><code>int main()</code></strong> మాత్రమే రాయండి!
      </div>
    </div>

    <!-- SECTION 11 -->
    <div class="section-title"><span class="num">11</span>బిగినర్స్ చేసే టాప్ 5 ఘోరమైన తప్పులు (Beginner Pitfalls)</div>
    <div class="section-body">
      <p>C నేర్చుకునే ప్రారంభ రోజుల్లో విద్యార్థులు చేసే సాధారణ తప్పులను ముందుగానే తెలుసుకుంటే గంటల తరబడి డీబగ్గింగ్ తలనొప్పి తప్పుతుంది:</p>

      <div style="display:flex; flex-direction:column; gap:16px; margin:16px 0;">
        <div style="background:rgba(239, 68, 68, 0.08); border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px 18px;">
          <strong style="color:#ef4444; font-size:14.5px;">❌ 1. #include చివర సెమికోలన్ పెట్టడం:</strong>
          <pre style="margin:6px 0; background:#fff; border:1px solid #fecaca; padding:8px 12px; border-radius:6px; color:#b91c1c; font-size:13px;"><code>#include &lt;stdio.h&gt;; // తప్పు! Preprocessor డైరెక్టివ్‌లకు సెమికోలన్ ఉండదు!</code></pre>
          <span style="font-size:13px; color:var(--text2);">ప్రీప్రాసెసర్ డైరెక్టివ్‌లు C భాషా స్టేట్‌మెంట్లు కావు. కాబట్టి <code>#include</code> మరియు <code>#define</code> చివర సెమికోలన్ పెట్టకూడదు.</span>
        </div>

        <div style="background:rgba(239, 68, 68, 0.08); border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px 18px;">
          <strong style="color:#ef4444; font-size:14.5px;">❌ 2. కేస్ సెన్సిటివిటీని పట్టించుకోకపోవడం (Case-Sensitivity Trap):</strong>
          <pre style="margin:6px 0; background:#fff; border:1px solid #fecaca; padding:8px 12px; border-radius:6px; color:#b91c1c; font-size:13px;"><code>Printf("Hello World"); // తప్పు! C లో 'P' క్యాపిటల్ ఉండకూడదు</code></pre>
          <span style="font-size:13px; color:var(--text2);">C లాంగ్వేజ్ కచ్చితమైన Case-Sensitive. C లోని అన్ని ప్రాథమిక కీవర్డ్లు మరియు లైబ్రరీ ఫంక్షన్లు (<code>int</code>, <code>return</code>, <code>printf</code>) చిన్న అక్షరాలలో (Lowercase) మాత్రమే ఉండాలి.</span>
        </div>

        <div style="background:rgba(239, 68, 68, 0.08); border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px 18px;">
          <strong style="color:#ef4444; font-size:14.5px;">❌ 3. స్ట్రింగ్స్‌కి సింగిల్ కోట్స్ వాడటం:</strong>
          <pre style="margin:6px 0; background:#fff; border:1px solid #fecaca; padding:8px 12px; border-radius:6px; color:#b91c1c; font-size:13px;"><code>printf('Hello World\n'); // తప్పు! సింగిల్ కోట్స్ స్ట్రింగ్స్ కోసం కాదు!</code></pre>
          <span style="font-size:13px; color:var(--text2);">స్ట్రింగ్స్ (వాక్యాలు, పదాలు) ఎల్లప్పుడూ డబుల్ కోట్స్ <code>"..."</code> లోనే ఉండాలి. సింగిల్ కోట్స్ <code>'...'</code> కేవలం ఒకే ఒక్క క్యారెక్టర్ (ఉదా: <code>'A'</code>, <code>'9'</code>) కోసం మాత్రమే వాడాలి.</span>
        </div>

        <div style="background:rgba(239, 68, 68, 0.08); border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px 18px;">
          <strong style="color:#ef4444; font-size:14.5px;">❌ 4. main() ఫంక్షన్ హెడర్ చివర సెమికోలన్ పెట్టడం:</strong>
          <pre style="margin:6px 0; background:#fff; border:1px solid #fecaca; padding:8px 12px; border-radius:6px; color:#b91c1c; font-size:13px;"><code>int main(); { // తప్పు! ఫంక్షన్ డెఫినిషన్ హెడర్ చివర సెమికోలన్ ఉండకూడదు!</code></pre>
          <span style="font-size:13px; color:var(--text2);">ఫంక్షన్‌ను డిఫైన్ చేసేటప్పుడు దాని పక్కనే కర్లీ బ్రేసెస్ <code>{ }</code> రావాలి. అక్కడ సెమికోలన్ పెడితే కంపైలర్ అది ఫంక్షన్ డిక్లరేషన్‌గా భావించి లోపలి కోడ్‌ను గుర్తించలేదు.</span>
        </div>
      </div>
    </div>

    <!-- SECTION 12 (INTERACTIVE QUIZ) -->
    <div class="section-title"><span class="num">12</span>ఇంటరాక్టివ్ నాలెడ్జ్ చెక్ (Self-Assessment Quiz)</div>
    <div class="section-body">
      <p>ఈ మొదటి అధ్యాయంలో మీరు నేర్చుకున్న భావనలను పరీక్షించుకోవడానికి క్రింది ప్రశ్నలపై క్లిక్ చేసి సరైన సమాధానాలను పరిశీలించండి:</p>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:700; cursor:pointer; color:#059669;">
          ❓ ప్రశ్న 1: GCC కంపైలేషన్ పైప్‌లైన్‌లో సోర్స్ కోడ్ నుండి కామెంట్లు తొలగించి, హెడర్ ఫైల్స్ ఇన్సర్ట్ చేసే దశ ఏది?
        </summary>
        <div style="margin-top:10px; color:var(--text2); font-size:14px; line-height:1.6;">
          <strong>సమాధానం:</strong> <strong>Preprocessing దశ (దశ 1)</strong>. ప్రీప్రాసెసర్ (<code>cpp</code>) కామెంట్లను తొలగించి, <code>#include</code> డైరెక్టివ్‌ల స్థానంలో వాస్తవ హెడర్ ఫైల్ కోడ్‌ను పేస్ట్ చేస్తుంది.
        </div>
      </details>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:700; cursor:pointer; color:#059669;">
          ❓ ప్రశ్న 2: అసెంబ్లర్ ఉత్పత్తి చేసే ఫైల్ ఫార్మాట్ ఏది?
        </summary>
        <div style="margin-top:10px; color:var(--text2); font-size:14px; line-height:1.6;">
          <strong>సమాధానం:</strong> <strong>Object File (.o లేదా .obj)</strong>. ఇది CPU చదవగల బైనరీ మెషిన్ కోడ్ (0s &amp; 1s) రూపంలో ఉంటుంది.
        </div>
      </details>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:700; cursor:pointer; color:#059669;">
          ❓ ప్రశ్న 3: main() ఫంక్షన్ చివర return 0; ఎందుకు రాస్తాం?
        </summary>
        <div style="margin-top:10px; color:var(--text2); font-size:14px; line-height:1.6;">
          <strong>సమాధానం:</strong> ఆపరేటింగ్ సిస్టమ్‌కు ప్రోగ్రామ్ ఎటువంటి లోపాలు లేకుండా విజయవంతంగా పూర్తయిందని (<strong>Exit Code 0 = Success</strong>) తెలియజేయడానికి.
        </div>
      </details>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:700; cursor:pointer; color:#059669;">
          ❓ ప్రశ్న 4: stdio.h ఫైల్ పేరులోని 'stdio' యొక్క పూర్తి రూపం ఏమిటి?
        </summary>
        <div style="margin-top:10px; color:var(--text2); font-size:14px; line-height:1.6;">
          <strong>సమాధానం:</strong> <strong>Standard Input Output</strong>. ఇందులో కీబోర్డ్ ఇన్‌పుట్ (scanf) మరియు మానిటర్ అవుట్‌పుట్ (printf) లకు సంబంధించిన ఫంక్షన్ డిక్లరేషన్లు ఉంటాయి.
        </div>
      </details>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:700; cursor:pointer; color:#059669;">
          ❓ ప్రశ్న 5: ఆధునిక C ప్రమాణాల ప్రకారం void main() ఎందుకు తప్పు?
        </summary>
        <div style="margin-top:10px; color:var(--text2); font-size:14px; line-height:1.6;">
          <strong>సమాధానం:</strong> అంతర్జాతీయ C ప్రమాణాల ప్రకారం (C99, C11, C17) <code>main</code> ఫంక్షన్ ఎల్లప్పుడూ ఆపరేటింగ్ సిస్టమ్‌కు ఒక పూర్ణాంక సంఖ్యను (int exit status) రిటర్న్ చేయాలి. <code>void main()</code> అనేది చెల్లని నాన్-స్టాండర్డ్ సింటాక్స్ (Undefined Behavior).
        </div>
      </details>
    </div>

    <!-- SECTION 13 (TRY BOX & SUMMARY) -->
    <div class="section-title"><span class="num">13</span>మీరే స్వయంగా Try చేయండి &amp; సారాంశం (Quick Summary)</div>
    <div class="section-body">
      <div class="try-box" style="margin-top:10px;">
        <div class="try-title">🚀 మీ మొదటి C ప్రోగ్రామ్‌ను మన ఆన్‌లైన్ C కంపైలర్‌లో రన్ చేయండి!</div>
        <p>పైన వివరించిన <code>Hello, World!</code> కోడ్‌ను మన ఆన్‌లైన్ GCC C కంపైలర్‌లో ఓపెన్ చేసి స్వయంగా ఎగ్జిక్యూట్ చేయండి. ప్రింట్ సందేశంలో మీ పేరును చేర్చి రన్ చేసి నిజమైన కంపైలర్ అనుభూతిని పొందండి!</p>
        <a class="run-btn" href="/online-c-compiler.html" target="_blank">
          👉 Our Compiler లో C Compiler try చేయండి
        </a>
      </div>

      <div style="margin-top:24px;">
        <h4 style="color:#059669; font-size:16px; margin-bottom:10px;">📌 క్విక్ సారాంశం (Key Takeaways):</h4>
        <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.7;">
          <li><strong>C మూలాలు:</strong> 1972 లో Dennis Ritchie బెల్ ల్యాబ్స్‌లో UNIX ఆపరేటింగ్ సిస్టమ్ కోసం రూపొందించారు.</li>
          <li><strong>4 GCC దశలు:</strong> Preprocessing (.i) → Compilation (.s) → Assembly (.o) → Linking (.exe).</li>
          <li><strong>ఎంట్రీ పాయింట్:</strong> ఎగ్జిక్యూషన్ ఎల్లప్పుడూ <code>int main(void)</code> వద్దే ప్రారంభమవుతుంది.</li>
          <li><strong>stdio.h:</strong> ప్రింట్ మరియు ఇన్‌పుట్ ఫంక్షన్ల కోసం Standard I/O హెడర్ ఫైల్.</li>
          <li><strong>return 0:</strong> OS కి ప్రోగ్రామ్ సురక్షితంగా విజయవంతమైందని తెలిపే సంకేతం.</li>
        </ul>
      </div>

      <div style="margin-top:20px; padding:16px; background:var(--bg2); border-left:4px solid #10b981; border-radius:0 8px 8px 0;">
        <strong>తర్వాతి అధ్యాయంలో (Chapter 02):</strong> కంప్యూటర్ మెమరీ (RAM) బైట్ల లెక్కలు, <strong>వేరియబుల్స్, డేటా టైప్స్ (int, float, char, double), sizeof ఆపరేటర్ మరియు Signed vs Unsigned ఓవర్‌ఫ్లో రహస్యాలు</strong> గురించి అత్యంత ఆసక్తికరంగా నేర్చుకుందాం!
      </div>
    </div>


    <!-- PREV / NEXT NAVIGATION -->
    <div style="display:flex; justify-content:space-between; align-items:center; margin-top:40px; padding-top:20px; border-top:1px solid var(--border); flex-wrap:wrap; gap:16px;">
      <div></div>
      <a href="/blog-c/02-c-variables-data-types-constants.html" style="display:inline-flex; align-items:center; gap:8px; padding:10px 20px; border-radius:8px; background:linear-gradient(135deg, #10b981, #059669); color:#ffffff; text-decoration:none; font-weight:700; font-size:13.5px; box-shadow:0 2px 10px rgba(16,185,129,0.2);">
        Next: 2. వేరియబుల్స్ &amp; డేటా టైప్స్ →
      </a>
    </div>

    <!-- AUTHOR FOOTER -->
    <div class="author" style="margin-top:36px;">
      <div class="avatar">OC</div>
      <div>
        <strong>Written by Our Compiler Technical Editorial Team</strong><br>
        <span>Reviewed for accuracy &amp; tested on GCC 13+ / Clang 17 runtime · 2026 Academic Edition</span>
      </div>
    </div>

  </main>
</div>

<!-- SITE NAVIGATION LOADER -->
<script src="/site-nav.js" defer></script>
</body>
</html>
`;

// Assemble the complete HTML document
const fullHtml = `<!DOCTYPE html>
<html class="light-theme" lang="te">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>C పరిచయం, చరిత్ర & మొదటి ప్రోగ్రామ్ (Hello World) — Modern C Tutorial | Our Compiler</title>
  <meta name="description" content="C పరిచయం, చరిత్ర & మొదటి ప్రోగ్రామ్ (Hello World) సమగ్ర తెలుగు గైడ్: Dennis Ritchie హిస్టరీ · GCC కంపైలర్ పైప్‌లైన్ (4 Stages) · main() ఎగ్జిక్యూషన్ · printf() మెకానిక్స్ · return 0 ప్రాముఖ్యత." />
  <meta name="keywords" content="c tutorial in telugu, learn c language, c పరిచయం, చరిత్ర & మొదటి ప్రోగ్రామ్ (hello world), c programming, our compiler" />
  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />
  <link rel="icon" type="image/png" href="/logo.png" />
  <link rel="canonical" href="https://www.ourcompiler.com/blog-c/01-c-introduction-and-hello-world.html" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;500;600;700&family=Sora:wght@400;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/blog-style.css" />
  <link rel="stylesheet" href="/blog-c/style.css" />
  <link rel="stylesheet" href="/site-nav.css" />

  <!-- Schema.org TechArticle Structured Data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": "C పరిచయం, చరిత్ర & మొదటి ప్రోగ్రామ్ (Hello World) (C Programming in Telugu)",
    "description": "Dennis Ritchie హిస్టరీ · GCC కంపైలర్ పైప్‌లైన్ (4 Stages) · main() ఎగ్జిక్యూషన్ · printf() మెకానిక్స్ · return 0 ప్రాముఖ్యత",
    "articleSection": "Phase 01: బేసిక్స్ & మెమరీ ఆర్కిటెక్చర్",
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
    "datePublished": "2026-02-01",
    "dateModified": "2026-10-31"
  }
  </script>

  <!-- Interactive Scripts: Accordion & Default Light Theme -->
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

    (function() {
      const currentTheme = localStorage.getItem('tutorial_theme_v2');
      if (currentTheme === 'dark') {
        document.documentElement.classList.remove('light-theme');
        document.addEventListener('DOMContentLoaded', () => {
          const body = document.body;
          if (body) body.classList.remove('light-theme');
        });
      } else {
        document.documentElement.classList.add('light-theme');
        document.addEventListener('DOMContentLoaded', () => {
          const body = document.body;
          if (body) body.classList.add('light-theme');
        });
      }
    })();

    // Code runner & copy button integration
    document.addEventListener('DOMContentLoaded', () => {
      document.querySelectorAll('.code-block').forEach((block) => {
        const pre = block.querySelector('pre');
        const code = block.querySelector('code');
        if (!pre || !code) return;
        const rawCode = code.innerText;

        const actions = block.querySelector('.code-actions');
        if (actions && !actions.querySelector('.copy-btn')) {
          const copyBtn = document.createElement('button');
          copyBtn.className = 'copy-btn';
          copyBtn.innerHTML = '📋 Copy';
          copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(rawCode).then(() => {
              copyBtn.innerHTML = '✅ Copied!';
              setTimeout(() => { copyBtn.innerHTML = '📋 Copy'; }, 2000);
            });
          });
          actions.insertBefore(copyBtn, actions.firstChild);

          const tryBtn = actions.querySelector('.try-btn');
          if (tryBtn) {
            tryBtn.addEventListener('click', (e) => {
              e.preventDefault();
              localStorage.setItem('code_c', rawCode);
              window.open('/online-c-compiler.html', '_blank');
            });
          }
        }
      });
    });
  </script>
</head>
<body class="lang-c light-theme">
<!-- NAV PLACEHOLDER -->
<div id="site-nav-placeholder"></div>

<div class="layout">
${sidebarHtml}

  <!-- MAIN ARTICLE -->
  <main class="content">
${chapterContentHtml}
`;

const outputPath = path.join(__dirname, '..', 'public', 'blog-c', '01-c-introduction-and-hello-world.html');
fs.writeFileSync(outputPath, fullHtml, 'utf8');

console.log('✅ Successfully generated deep high-value C Chapter 01!');
console.log('Target file size:', fullHtml.length, 'characters');
