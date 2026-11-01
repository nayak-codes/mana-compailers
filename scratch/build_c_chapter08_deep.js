const fs = require('fs');
const path = require('path');
const { LESSONS, buildSidebar } = require('./c_curriculum_data.js');

const lesson = LESSONS.find(l => l.num === 8);
const sidebarHtml = buildSidebar(8);

const chapterContentHtml = `
    <!-- BREADCRUMB -->
    <div class="breadcrumb">
      <a href="/">Home</a><span class="sep">›</span>
      <a href="/blog.html">Tutorials</a><span class="sep">›</span>
      <a href="/blog-c.html">C Masterclass</a><span class="sep">›</span>
      <span class="current">Chapter 8: break, continue, నెస్టెడ్ లూప్స్ &amp; ప్యాటర్న్స్</span>
    </div>

    <!-- PAGE TITLE -->
    <h1 class="page-title">break, continue, నెస్టెడ్ లూప్స్ &amp; స్టార్ ప్యాటర్న్స్</h1>

    <!-- PAGE META BADGES -->
    <div class="page-meta">
      <span class="badge">⚡ Modern C (C99 / C11 / C17 Standards)</span>
      <span class="badge">🟢 Chapter 08 of 20</span>
      <span class="badge">📂 Phase 02: కంట్రోల్ ఫ్లో &amp; లూప్స్</span>
      <span class="badge">📅 2026 Academic Edition</span>
    </div>

    <!-- SUBTOPICS PILL BAR -->
    <div style="background:var(--bg3); border:1px solid var(--border); border-radius:8px; padding:10px 16px; margin-bottom:24px; font-size:13px; color:var(--text2); display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
      <span style="color:#10b981; font-weight:700;">📌 Covered in this chapter:</span>
      <span>break ఎమర్జెన్సీ ఎగ్జిట్ · continue స్కిప్పింగ్ మెకానిక్స్ · break vs continue పట్టిక · నెస్టెడ్ లూప్స్ &amp; 2D కోఆర్డినేట్స్ · O(N^2) టైమ్ కాంప్లెక్సిటీ · స్టార్ &amp; పిరమిడ్ ప్యాటర్న్స్ · ఫ్లాయిడ్స్ ట్రయాంగిల్ · మల్టీ-లెవల్ బ్రేక్ ట్రాప్స్ · goto స్టేట్‌మెంట్ వివాదం &amp; Linux కెర్నల్ క్లీనప్ · ప్రైమ్ నంబర్ సెర్చ్ ప్రాజెక్ట్ · ఇంటరాక్టివ్ క్విజ్</span>
    </div>

    <!-- INTRO ACCENT BOX (Warm Ivory with Green Accent) -->
    <div class="intro-box">
      <p>ఒక పెద్ద సినిమా థియేటర్‌లో సినిమా హౌస్‌ఫుల్ అయ్యి నడుస్తుందనుకోండి. ప్రతి ఒక్కరూ తమ సీట్లలో కూర్చుని 3 గంటల ప్రదర్శనను నిరంతరాయంగా చూస్తున్నారు. ఒకవేళ థియేటర్‌లో ప్రమాదవశాత్తు ఫైర్ అలారం మోగితే ఏం జరుగుతుంది? సినిమా పూర్తయ్యే వరకు ఎవరూ వేచి ఉండరు! అందరూ వెంటనే <em>ఎమర్జెన్సీ ఎగ్జిట్ డోర్ (Emergency Exit)</em> నుండి బయటకు పరుగులు తీస్తారు. ఇది ప్రోగ్రామింగ్‌లోని <strong>break స్టేట్‌మెంట్</strong> లాంటిది — లూప్ సహజంగా ముగిసేవరకు వేచి చూడకుండా, మధ్యలోనే తక్షణమే బయటకు దూకేస్తుంది!</p>
      <p>ఇప్పుడు మరొక దృశ్యాన్ని చూద్దాం: ఒక రైల్వే ట్రాక్ తనిఖీ చేసే ఇన్‌స్పెక్టర్ 1వ కిలోమీటరు నుండి 100వ కిలోమీటరు వరకు ప్రతి ట్రాక్ నట్‌ను తనిఖీ చేసుకుంటూ వెళ్తున్నారు. 45వ కిలోమీటరు వద్ద ఉన్న ట్రాక్ గేట్ ఇప్పటికే కొత్తగా అమర్చబడినట్లు రిపోర్ట్ ఉంది. అప్పుడు ఇన్‌స్పెక్టర్ ఆ ఒక్క గేట్ తనిఖీని స్కిప్ చేసి, వెంటనే 46వ కిలోమీటరుకు వెళ్లిపోతారు. ఇది <strong>continue స్టేట్‌మెంట్</strong> లాంటిది — ప్రస్తుత రౌండ్‌ను మాత్రమే వదిలేసి, లూప్‌ను ఆపకుండా తర్వాతి రౌండ్‌కు దూసుకుపోతుంది!</p>
      <p>ఈ ఎనిమిదవ అధ్యాయంతో మనం <strong>Phase 02 (కంట్రోల్ ఫ్లో &amp; లూప్స్)</strong> ను విజయవంతంగా ముగించబోతున్నాం. ఇందులో లూప్ జంప్ స్టేట్‌మెంట్లు, <strong>నెస్టెడ్ లూప్స్ (Nested Loops)</strong> అంతర్గత గ్రిడ్ నిర్మాణం, ఇంటర్వ్యూలలో అడిగే అద్భుతమైన <strong>స్టార్ &amp; పిరమిడ్ ప్యాటర్న్స్</strong>, మరియు కంప్యూటర్ సైన్స్ చరిత్రలో అత్యంత వివాదాస్పదమైన <strong>goto స్టేట్‌మెంట్</strong> యొక్క రహస్యాలను లోతుగా నేర్చుకుందాం!</p>
    </div>

    <!-- SECTION 1 -->
    <div class="section-title"><span class="num">1</span>ఈ Chapter లో మీరు నేర్చుకునే అంశాలు (Roadmap)</div>
    <div class="section-body">
      <p>లూప్‌లను సమర్థవంతంగా నియంత్రించగలగడం అనేది ప్రొఫెషనల్ C డెవలపర్‌కు తప్పనిసరి నైపుణ్యం. ఈ అధ్యాయంలో కవర్ చేయబడే ప్రధాన అంశాలు:</p>
      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.7;">
        <li><strong>జంప్ స్టేట్‌మెంట్స్ (Jump Statements):</strong> C లో అన్‌కండిషనల్ మరియు కండిషనల్ జంప్‌ల అవసరం.</li>
        <li><strong>break స్టేట్‌మెంట్ లోతైన విశ్లేషణ:</strong> లూప్ ఎగ్జిక్యూషన్‌ను మధ్యలోనే ముగించి లూప్ తర్వాతి లైన్‌కు కంట్రోల్ బదిలీ చేసే విధానం.</li>
        <li><strong>continue స్టేట్‌మెంట్ పనితీరు:</strong> లూప్ బాడీలోని మిగిలిన కోడ్‌ను దాటవేసి తర్వాతి ఇటరేషన్‌కు దూకడం.</li>
        <li><strong>for లూప్‌లో continue వర్సెస్ while లూప్‌లో continue:</strong> అప్‌డేట్ ఎక్స్‌ప్రెషన్ రన్ అయ్యే విధానంలో కీలక తేడాలు.</li>
        <li><strong>సమగ్ర తులనాత్మక పట్టిక:</strong> break vs continue పక్కపక్కనే విశ్లేషణ.</li>
        <li><strong>నెస్టెడ్ లూప్స్ (Nested Loops Architecture):</strong> ఔటర్ లూప్ (రోస్) మరియు ఇన్నర్ లూప్ (కాలమ్స్) 2D కోఆర్డినేట్ సిస్టమ్.</li>
        <li><strong>టైమ్ కాంప్లెక్సిటీ విశ్లేషణ:</strong> నెస్టెడ్ లూప్స్ లో $O(N^2)$ కాంప్లెక్సిటీ మరియు CPU సైకిల్స్ నిర్వహణ.</li>
        <li><strong>స్టార్ &amp; పిరమిడ్ ప్యాటర్న్స్ లాజిక్:</strong> రైట్-యాంగిల్ ట్రయాంగిల్, ఇన్వర్టెడ్ ట్రయాంగిల్, మరియు సిమెట్రిక్ పిరమిడ్.</li>
        <li><strong>సంఖ్యా ప్యాటర్న్స్:</strong> ఫ్లాయిడ్స్ ట్రయాంగిల్ (Floyd's Triangle) &amp; బైనరీ ఆల్టర్నేటింగ్ ప్యాటర్న్స్.</li>
        <li><strong>నెస్టెడ్ లూప్‌లలో break ప్రవర్తన:</strong> కేవలం లోపలి లూప్ నుండి మాత్రమే బయటకు రావడం (సింగిల్-లెవల్ బ్రేక్).</li>
        <li><strong>goto స్టేట్‌మెంట్ వివాదం &amp; నిజం:</strong> ఎడ్జర్ డిజ్క్‌స్ట్రా గారి "Go To Considered Harmful" వ్యాసం &amp; లైనక్స్ కెర్నల్‌లో ఎర్రర్ క్లీనప్.</li>
        <li><strong>సమగ్ర ప్రాజెక్ట్:</strong> ప్రైమ్ నంబర్ చెకర్ (Early Exit ఆప్టిమైజేషన్) &amp; బ్యాంకింగ్ ట్రాన్సాక్షన్ ఫిల్టర్.</li>
        <li><strong>స్వీయ మూల్యాంకన క్విజ్:</strong> 5 ట్రిక్కీ ఇంటర్వ్యూ ప్రశ్నలు &amp; విశ్లేషణ.</li>
      </ul>
    </div>

    <!-- SECTION 2 -->
    <div class="section-title"><span class="num">2</span>break స్టేట్‌మెంట్ — అత్యవసర నిష్క్రమణ (Emergency Exit)</div>
    <div class="section-body">
      <p>మనం చాప్టర్ 06 లో <code>switch</code> కేస్ నుండి బయటపడటానికి <code>break</code> ను చూశాం. అయితే లూప్‌లలో (for, while, do-while) <code>break</code> పాత్ర మరింత శక్తివంతమైనది. లూప్ సాధారణ కండిషన్ ఇంకా ముగియకపోయినా, ఏదైనా ఒక ప్రత్యేక కండిషన్ తలెత్తినప్పుడు లూప్‌ను తక్షణమే బద్దలు కొట్టి (Terminate చేసి) బయటకు రావడానికి <code>break</code> ఉపయోగపడుతుంది.</p>

      <h4 style="color:#059669; margin:16px 0 8px; font-size:15px;">ఎగ్జిక్యూషన్ ఫ్లో:</h4>
      <p>లూప్ బాడీ లోపల <code>break;</code> స్టేట్‌మెంట్ తారసపడగానే, కంపైలర్ లూప్ బాడీలోని తర్వాతి లైన్లను మరియు తర్వాతి అన్ని ఇటరేషన్లను పూర్తిగా విస్మరిస్తుంది. లూప్ ముగింపు కర్లీ బ్రేస్ <code>}</code> తర్వాత ఉన్న మొట్టమొదటి స్టేట్‌మెంట్‌కు కంట్రోల్‌ను బదిలీ చేస్తుంది.</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Early Exit with break in Linear Search</span>
          <div class="code-actions">
            <a class="try-btn" href="/online-c-compiler.html" target="_blank">▶ Run in Online C Compiler</a>
          </div>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main() {
    int target = 42;
    int foundIndex = -1;

    printf("1 నుండి 100 వరకు సంఖ్యలను వెతుకుతున్నాం...\\n");
    for (int i = 1; i &lt;= 100; i++) {
        if (i == target) {
            foundIndex = i;
            printf("🎯 టార్గెట్ సంఖ్య %d దొరికింది! లూప్‌ను మధ్యలోనే ఆపేస్తున్నాం.\\n", target);
            break; // 43 నుండి 100 వరకు మిగిలిన 58 ఇటరేషన్లు పూర్తిగా ఆదా అయ్యాయి!
        }
    }

    printf("శోధన ముగిసింది. టార్గెట్: %d వద్ద ఉంది.\\n", foundIndex);
    return 0;
}</code></pre>
      </div>

      <div style="background:var(--bg3); border-left:4px solid #10b981; padding:14px 18px; border-radius:0 8px 8px 0; margin-top:14px; font-size:14px; color:var(--text2);">
        <strong>💡 పర్ఫార్మెన్స్ బూస్ట్ (Early Exit Optimization):</strong> పైన పేర్కొన్న ఉదాహరణలో <code>break</code> లేకపోతే, టార్గెట్ సంఖ్య 42 దొరికిన తర్వాత కూడా లూప్ అనవసరంగా 100 వరకు 58 సార్లు తిరుగుతూ CPU సమయాన్ని వృధా చేస్తుంది. <code>break</code> వాడటం వలన ప్రోగ్రామ్ వేగం రెట్టింపు అవుతుంది!
      </div>
    </div>

    <!-- SECTION 3 -->
    <div class="section-title"><span class="num">3</span>continue స్టేట్‌మెంట్ — ఫిల్టరింగ్ &amp; స్కిప్పింగ్ (Lap Skipping)</div>
    <div class="section-body">
      <p><code>break</code> లూప్‌ను పూర్తిగా ఆపేస్తే, <strong>continue స్టేట్‌మెంట్</strong> కేవలం ప్రస్తుత ఇటరేషన్ (Current Round) ను మాత్రమే మధ్యలో వదిలేసి, లూప్‌ను ఆపకుండా <strong>వెంటనే తర్వాతి ఇటరేషన్‌కు</strong> దూకుతుంది!</p>

      <p>డేటాను ప్రాసెస్ చేసేటప్పుడు అనవసరమైన లేదా చెల్లని రికార్డులను ఫిల్టర్ చేయడానికి (ఉదా: సున్నాను భాగహారంలో నివారించడం, నెగెటివ్ నంబర్లను స్కిప్ చేయడం) <code>continue</code> అమితంగా ఉపయోగపడుతుంది.</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Printing Even Numbers using continue</span>
          <div class="code-actions">
            <a class="try-btn" href="/online-c-compiler.html" target="_blank">▶ Run in Online C Compiler</a>
          </div>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main() {
    printf("1 నుండి 10 వరకు సరి సంఖ్యలు (Even Numbers):\\n");

    for (int i = 1; i &lt;= 10; i++) {
        // బేసి సంఖ్య (Odd number) అయితే ప్రింటింగ్‌ను స్కిప్ చేసి తర్వాతి సంఖ్యకు వెళ్లు
        if (i % 2 != 0) {
            continue; // కింద ఉన్న printf ని దాటవేసి, నేరుగా i++ కి వెళ్తుంది!
        }
        printf("%d ", i);
    }
    printf("\\n");

    return 0;
}</code></pre>
      </div>

      <h4 style="color:#ef4444; margin:18px 0 8px; font-size:15px;">⚠️ ప్రాణాంతక ట్రాప్: while లూప్‌లో continue వాడేటప్పుడు జాగ్రత్త!</h4>
      <p><code>for</code> లూప్‌లో <code>continue</code> జరిగినప్పుడు కంట్రోల్ నేరుగా హెడర్‌లోని అప్‌డేట్ ఎక్స్‌ప్రెషన్ (<code>i++</code>) వద్దకు వెళ్తుంది. కానీ <strong>while లూప్‌లో continue జరిగితే అది అప్‌డేట్‌ను దాటవేసి నేరుగా కండిషన్ వద్దకు దూకుతుంది!</strong> దీనివలన కౌంటర్ పెరగక ప్రోగ్రామ్ శాశ్వతంగా ఇన్ఫినిట్ లూప్‌లో ఇరుక్కుపోతుంది!</p>

      <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin:16px 0;">
        <div style="background:#fef2f2; border:1px solid #fecaca; border-radius:8px; padding:14px;">
          <strong style="color:#ef4444;">❌ ప్రమాదకరమైన కోడ్ (Infinite Loop Trap):</strong>
          <pre style="margin-top:8px; font-size:12.5px; font-family:'JetBrains Mono',monospace;">int i = 1;
while (i &lt;= 5) {
    if (i == 3) {
        continue; // i++ దాటవేయబడుతుంది!
    }
    printf("%d ", i);
    i++; // 3 వద్ద ఇది ఎప్పటికీ రన్ కాదు!
}</pre>
        </div>
        <div style="background:#f0fdf4; border:1px solid #bbf7d0; border-radius:8px; padding:14px;">
          <strong style="color:#10b981;">✅ సరైన ఇంజనీరింగ్ కోడ్:</strong>
          <pre style="margin-top:8px; font-size:12.5px; font-family:'JetBrains Mono',monospace;">int i = 1;
while (i &lt;= 5) {
    if (i == 3) {
        i++; // continue కి ముందే పెంచాలి!
        continue;
    }
    printf("%d ", i);
    i++;
}</pre>
        </div>
      </div>
    </div>

    <!-- SECTION 4 -->
    <div class="section-title"><span class="num">4</span>సమగ్ర తులనాత్మక పట్టిక (break vs continue)</div>
    <div class="section-body">
      <p><code>break</code> మరియు <code>continue</code> ల మధ్య ఉన్న కీలక తేడాలను ఒకే పట్టికలో పరిశీలిద్దాం:</p>

      <table class="tbl">
        <thead>
          <tr>
            <th>ఫీచర్ / అంశం</th>
            <th>break స్టేట్‌మెంట్</th>
            <th>continue స్టేట్‌మెంట్</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>ప్రాథమిక విధి</strong></td>
            <td>లూప్‌ను తక్షణమే బద్దలు కొట్టి శాశ్వతంగా ముగిస్తుంది.</td>
            <td>ప్రస్తుత ఇటరేషన్‌ను మాత్రమే దాటవేసి తర్వాతి రౌండ్‌కు వెళ్తుంది.</td>
          </tr>
          <tr>
            <td><strong>కంట్రోల్ బదిలీ స్థానం</strong></td>
            <td>లూప్ బాడీ వెలుపల ఉన్న తర్వాతి స్టేట్‌మెంట్‌కు.</td>
            <td><code>for</code> లో అయితే అప్‌డేట్ (i++) కు; <code>while</code> లో అయితే కండిషన్‌కు.</td>
          </tr>
          <tr>
            <td><strong>లూప్ రౌండ్ల సంఖ్య</strong></td>
            <td>మిగిలిన అన్ని ఇటరేషన్లు పూర్తిగా రద్దు చేయబడతాయి.</td>
            <td>కేవలం 1 ఇటరేషన్ స్కిప్ అవుతుంది, మిగిలినవి యథావిధిగా కొనసాగుతాయి.</td>
          </tr>
          <tr>
            <td><strong>ఎక్కడ వాడవచ్చు?</strong></td>
            <td>లూప్స్ (for, while, do-while) మరియు <strong>switch-case</strong> లో.</td>
            <td><strong>కేవలం లూప్‌లలో మాత్రమే</strong> (switch లో వాడకూడదు).</td>
          </tr>
          <tr>
            <td><strong>ఉత్తమ ఉదాహరణ</strong></td>
            <td>శోధనలో ఎలిమెంట్ దొరకగానే లూప్ ఆపడం (Search Exit).</td>
            <td>చెల్లని డేటాను, నెగెటివ్ విలువల ప్రాసెసింగ్‌ను ఫిల్టర్ చేయడం.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- SECTION 5 -->
    <div class="section-title"><span class="num">5</span>నెస్టెడ్ లూప్స్ (Nested Loops) — 2D గ్రిడ్ ఆర్కిటెక్చర్</div>
    <div class="section-body">
      <p>ఒక లూప్ లోపల మరొక లూప్‌ను రాయడాన్ని <strong>నెస్టెడ్ లూప్ (Nested Loop)</strong> అంటారు. బయటి లూప్‌ను <strong>ఔటర్ లూప్ (Outer Loop)</strong> అని, లోపలి లూప్‌ను <strong>ఇన్నర్ లూప్ (Inner Loop)</strong> అని పిలుస్తారు.</p>

      <h4 style="color:#059669; margin:16px 0 8px; font-size:15px;">గడియారం పోలిక (Wall Clock Metaphor):</h4>
      <p>మీ గదిలోని గోడ గడియారాన్ని గమనించండి. అందులో పెద్ద ముల్లు (నిమిషాల ముల్లు), చిన్న ముల్లు (గంటల ముల్లు) ఉంటాయి. గంటల ముల్లు కేవలం 1 అడుగు ముందుకు వేయడానికి, నిమిషాల ముల్లు 60 రౌండ్లు పూర్తిగా తిరగాలి కదా? కంప్యూటర్ సైన్స్‌లో నెస్టెడ్ లూప్స్ కూడా సరిగ్గా ఇలాగే పనిచేస్తాయి:</p>

      <div style="background:var(--bg2); border:1px solid var(--border); border-radius:10px; padding:16px; margin:16px 0; font-size:14px; line-height:1.7; color:var(--text2);">
        <strong>⚙️ ఎగ్జిక్యూషన్ రూల్:</strong> ఔటర్ లూప్ యొక్క <em>ప్రతి ఒక్క ఇటరేషన్‌కు</em>, ఇన్నర్ లూప్ మొదటి నుండి చివరి వరకు <em>పూర్తిగా</em> ఎగ్జిక్యూట్ అవుతుంది! ఔటర్ లూప్ M సార్లు, ఇన్నర్ లూప్ N సార్లు తిరిగితే, మొత్తం కోడ్ <strong>M × N సార్లు</strong> రన్ అవుతుంది!
      </div>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — 2D Coordinate Grid Matrix Generation</span>
          <div class="code-actions">
            <a class="try-btn" href="/online-c-compiler.html" target="_blank">▶ Run in Online C Compiler</a>
          </div>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main() {
    int totalRows = 3;
    int totalCols = 4;

    printf("=== 3x4 2D గ్రిడ్ కోఆర్డినేట్స్ (Row, Col) ===\\n");
    for (int row = 1; row &lt;= totalRows; row++) { // ఔటర్ లూప్ (అడ్డు వరుసలు)
        printf("Row %d: ", row);
        for (int col = 1; col &lt;= totalCols; col++) { // ఇన్నర్ లూప్ (నిలువు వరుసలు)
            printf("(%d,%d) ", row, col);
        }
        printf("\\n"); // ప్రతి అడ్డు వరుస పూర్తయిన తర్వాత కొత్త లైన్
    }

    return 0;
}</code></pre>
      </div>

      <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px 18px; margin-top:14px; font-size:13.5px; color:var(--text2);">
        <strong>అవుట్‌పుట్:</strong><br>
        <code>Row 1: (1,1) (1,2) (1,3) (1,4)</code><br>
        <code>Row 2: (2,1) (2,2) (2,3) (2,4)</code><br>
        <code>Row 3: (3,1) (3,2) (3,3) (3,4)</code><br>
        మొత్తం ఇన్నర్ ప్రింటింగ్ స్టేట్‌మెంట్ రన్ అయిన సంఖ్య = 3 × 4 = <strong>12 సార్లు</strong>.
      </div>
    </div>

    <!-- SECTION 6 -->
    <div class="section-title"><span class="num">6</span>టైమ్ కాంప్లెక్సిటీ విశ్లేషణ — O(N²) క్వాడ్రాటిక్ గ్రోత్</div>
    <div class="section-body">
      <p>డేటా స్ట్రక్చర్స్ &amp; అల్గారిథమ్స్‌లో నెస్టెడ్ లూప్‌ల పనితీరును అర్థం చేసుకోవడం చాలా కీలకం. ఒక సాధారణ లూప్ N సార్లు రన్ అయితే దాని టైమ్ కాంప్లెక్సిటీ <code>O(N)</code> (Linear Time). కానీ రెండు స్థాయిల నెస్టెడ్ లూప్స్ ఉన్నప్పుడు:</p>

      $$\text{Total Iterations} = N \times N = N^2 \implies O(N^2) \text{ (Quadratic Time)}$$

      <p>ఇన్‌పుట్ సైజ్ $N$ పెరిగే కొద్దీ ఎగ్జిక్యూషన్ సమయం ఎలా పెరుగుతుందో క్రింది పట్టికలో గమనించండి:</p>

      <table class="tbl">
        <thead>
          <tr>
            <th>ఇన్‌పుట్ పరిమాణం ($N$)</th>
            <th>సింగిల్ లూప్ ($O(N)$) ఇటరేషన్లు</th>
            <th>నెస్టెడ్ లూప్ ($O(N^2)$) ఇటరేషన్లు</th>
            <th>3-స్థాయి లూప్ ($O(N^3)$) ఇటరేషన్లు</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>10</td>
            <td>10</td>
            <td>100</td>
            <td>1,000</td>
          </tr>
          <tr>
            <td>100</td>
            <td>100</td>
            <td>10,000</td>
            <td>10,00,000 (1 మిలియన్)</td>
          </tr>
          <tr>
            <td>1,000</td>
            <td>1,000</td>
            <td>10,00,000 (1 మిలియన్)</td>
            <td>1,00,00,00,000 (1 బిలియన్ - సెకన్ల సమయం!)</td>
          </tr>
        </tbody>
      </table>

      <p style="color:var(--text2); font-size:14px; margin-top:14px;">అందుకే పెద్ద పెద్ద సాఫ్ట్‌వేర్లలో మరియు గేమింగ్ ఇంజిన్లలో అనవసరమైన నెస్టెడ్ లూప్‌లను నివారించి, బైనరీ సెర్చ్ లేదా హాష్ మ్యాప్‌ల ద్వారా ఆప్టిమైజ్ చేస్తారు!</p>
    </div>

    <!-- SECTION 7 -->
    <div class="section-title"><span class="num">7</span>స్టార్ ప్యాటర్న్స్ 1 — రైట్-యాంగిల్ &amp; ఇన్వర్టెడ్ ట్రయాంగిల్</div>
    <div class="section-body">
      <p>కోడింగ్ ఇంటర్వ్యూలు మరియు యూనివర్సిటీ ప్రాక్టికల్స్‌లో నెస్టెడ్ లూప్ లాజిక్‌ను పరీక్షించడానికి అత్యంత ప్రాచుర్యం పొందినవి <strong>స్టార్ ప్యాటర్న్స్ (Star Patterns)</strong>. ప్యాటర్న్ ప్రోగ్రామింగ్ చేయడానికి గోల్డెన్ ఫార్ములా ఇది:</p>
      
      <ol style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.7;">
        <li><strong>ఔటర్ లూప్ (i):</strong> ఎన్ని అడ్డు వరుసలు (Rows) కావాలో నిర్దేశిస్తుంది.</li>
        <li><strong>ఇన్నర్ లూప్ (j):</strong> ప్రతి వరుసలో ఎన్ని నక్షత్రాలు లేదా ఖాళీలు ప్రింట్ కావాలో లెక్కిస్తుంది.</li>
        <li><strong>వరుస ముగింపు:</strong> ఇన్నర్ లూప్ ముగియగానే ఖచ్చితంగా <code>printf("\\n");</code> ఇవ్వాలి.</li>
      </ol>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Right-Angled Star Triangle Pattern</span>
          <div class="code-actions">
            <a class="try-btn" href="/online-c-compiler.html" target="_blank">▶ Run in Online C Compiler</a>
          </div>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main() {
    int rows = 5;

    printf("=== రైట్-యాంగిల్ స్టార్ ట్రయాంగిల్ ===\\n");
    for (int i = 1; i &lt;= rows; i++) { // వరుస నంబర్ 1 నుండి 5 వరకు
        for (int j = 1; j &lt;= i; j++) { // ప్రస్తుత వరుస సంఖ్య (i) సమానంగా స్టార్స్ ప్రింట్ చేయి
            printf("* ");
        }
        printf("\\n"); // కొత్త వరుసకు మళ్లు
    }

    return 0;
}</code></pre>
      </div>

      <h4 style="color:#059669; margin:18px 0 8px; font-size:15px;">ఇన్వర్టెడ్ (తలకిందులైన) ట్రయాంగిల్:</h4>
      <p>మొదటి వరుసలో 5 స్టార్స్, తర్వాత 4, 3, 2, 1 కావాలంటే ఔటర్ లూప్‌ను రివర్స్‌లో <code>for (int i = rows; i &gt;= 1; i--)</code> అని నడపాలి:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Inverted Star Triangle Pattern</span>
          <div class="code-actions">
            <a class="try-btn" href="/online-c-compiler.html" target="_blank">▶ Run in Online C Compiler</a>
          </div>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main() {
    int rows = 5;

    printf("=== ఇన్వర్టెడ్ స్టార్ ట్రయాంగిల్ ===\\n");
    for (int i = rows; i &gt;= 1; i--) {
        for (int j = 1; j &lt;= i; j++) {
            printf("* ");
        }
        printf("\\n");
    }

    return 0;
}</code></pre>
      </div>
    </div>

    <!-- SECTION 8 -->
    <div class="section-title"><span class="num">8</span>స్టార్ ప్యాటర్న్స్ 2 — సిమెట్రిక్ పిరమిడ్ ప్యాటర్న్ (Pyramid Logic)</div>
    <div class="section-body">
      <p>సిమెట్రిక్ పిరమిడ్ నిర్మించాలంటే రెండు విషయాలు అవసరం: <strong>ఖాళీ స్థలాలు (Leading Spaces)</strong> మరియు <strong>స్టార్స్ (Stars)</strong>. ప్రతి వరుసలో ఎన్ని స్పేసెస్ ఉండాలి, ఎన్ని స్టార్స్ ఉండాలో గణిత సమీకరణం ద్వారా సాధిస్తాం:</p>

      <ul style="margin-left: 20px; color: var(--text2); font-size: 14px; line-height: 1.7;">
        <li>మొత్తం వరుసలు = $N$, ప్రస్తుత వరుస = $i$</li>
        <li>ముందు ఉండే స్పేసెస్ సంఖ్య = $N - i$</li>
        <li>ప్రింట్ అయ్యే స్టార్స్ సంఖ్య = $2i - 1$ (బేసి సంఖ్యల క్రమం: 1, 3, 5, 7, 9...)</li>
      </ul>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Full Symmetric Star Pyramid</span>
          <div class="code-actions">
            <a class="try-btn" href="/online-c-compiler.html" target="_blank">▶ Run in Online C Compiler</a>
          </div>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main() {
    int n = 5;

    printf("=== సిమెట్రిక్ స్టార్ పిరమిడ్ ===\\n");
    for (int i = 1; i &lt;= n; i++) {
        // భాగం 1: ముందు స్పేసెస్ ప్రింట్ చేయి (n - i)
        for (int space = 1; space &lt;= (n - i); space++) {
            printf(" ");
        }

        // భాగం 2: బేసి సంఖ్యలో స్టార్స్ ప్రింట్ చేయి (2*i - 1)
        for (int star = 1; star &lt;= (2 * i - 1); star++) {
            printf("*");
        }

        printf("\\n");
    }

    return 0;
}</code></pre>
      </div>

      <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:12px 18px; margin-top:12px; font-family:'JetBrains Mono',monospace; font-size:13px; color:#059669;">
        &nbsp;&nbsp;&nbsp;&nbsp;*<br>
        &nbsp;&nbsp;&nbsp;***<br>
        &nbsp;&nbsp;*****<br>
        &nbsp;*******<br>
        *********
      </div>
    </div>

    <!-- SECTION 9 -->
    <div class="section-title"><span class="num">9</span>సంఖ్యా ప్యాటర్న్స్ — ఫ్లాయిడ్స్ ట్రయాంగిల్ (Floyd's Triangle)</div>
    <div class="section-body">
      <p><strong>ఫ్లాయిడ్స్ ట్రయాంగిల్ (Floyd's Triangle)</strong> అనేది సహజ సంఖ్యలను వరుసగా లెక్కిస్తూ త్రిభుజాకారంలో అమర్చే క్లాసిక్ ప్రోగ్రామ్. ఇందులో ఒక గ్లోబల్ కౌంటర్ వేరియబుల్ 1 నుండి మొదలై ప్రతి నంబర్ ప్రింట్ అయిన తర్వాత పెరుగుతూ ఉంటుంది:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Floyd's Number Triangle</span>
          <div class="code-actions">
            <a class="try-btn" href="/online-c-compiler.html" target="_blank">▶ Run in Online C Compiler</a>
          </div>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main() {
    int rows = 4;
    int num = 1; // గ్లోబల్ ఇంక్రిమెంట్ కౌంటర్

    printf("=== ఫ్లాయిడ్స్ ట్రయాంగిల్ (Floyd's Triangle) ===\\n");
    for (int i = 1; i &lt;= rows; i++) {
        for (int j = 1; j &lt;= i; j++) {
            printf("%-3d ", num);
            num++; // ప్రతి ప్రింట్ తర్వాత విలువ పెరుగుతుంది
        }
        printf("\\n");
    }

    return 0;
}</code></pre>
      </div>

      <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:12px 18px; margin-top:12px; font-family:'JetBrains Mono',monospace; font-size:13px; color:#059669;">
        1  <br>
        2   3  <br>
        4   5   6  <br>
        7   8   9   10
      </div>
    </div>

    <!-- SECTION 10 -->
    <div class="section-title"><span class="num">10</span>నెస్టెడ్ లూప్‌లలో break ప్రవర్తన &amp; మల్టీ-లెవల్ బ్రేక్ ట్రాప్స్</div>
    <div class="section-body">
      <p>చాలా మంది బిగినర్స్ అనుకునే అతిపెద్ద అపోహ: <em>"ఇన్నర్ లూప్‌లో <code>break</code> రాస్తే మొత్తం అన్ని లూప్‌లు ఆగిపోతాయి"</em>. ఇది <strong>పూర్తిగా తప్పు!</strong></p>

      <div style="background:#fef2f2; border:1px solid #fecaca; border-radius:8px; padding:14px; margin:14px 0; color:#991b1b; font-size:13.5px;">
        ⚠️ <strong>సింగిల్-లెవల్ బ్రేక్ సూత్రం (Single-Level Break Rule):</strong> C లో <code>break</code> స్టేట్‌మెంట్ <strong>కేవలం అది ఉన్న ప్రస్తుత ఇన్నర్‌మోస్ట్ లూప్ (Innermost Loop) ను మాత్రమే</strong> బద్దలు కొడుతుంది! బయట ఉన్న ఔటర్ లూప్ యథావిధిగా తర్వాతి రౌండ్‌ను కొనసాగిస్తుంది!
      </div>

      <h4 style="color:#059669; margin:16px 0 8px; font-size:15px;">మల్టీ-లెవల్ లూప్‌ల నుండి ఒకేసారి బయటపడటం ఎలా?</h4>
      <p>రెండు లేదా మూడు స్థాయిల నెస్టెడ్ లూప్‌ల నుండి ఒకేసారి బయటకు దూకడానికి C లో ప్రధానంగా రెండు శుభ్రమైన ఇంజనీరింగ్ పద్ధతులు ఉన్నాయి:</p>
      
      <ol style="margin-left: 20px; color: var(--text2); font-size: 14px; line-height: 1.7;">
        <li><strong>ఫ్లాగ్ వేరియబుల్ వాడటం (Boolean Flag):</strong> ఇన్నర్ లూప్‌లో <code>found = 1</code> అని సెట్ చేసి, ఔటర్ లూప్‌లో <code>if (found) break;</code> అని రాయడం.</li>
        <li><strong>క్లీనప్ లేబుల్‌కు goto వాడటం:</strong> డీప్ నెస్టెడ్ లూప్స్ నుండి నేరుగా ఫంక్షన్ ఎగ్జిట్ లేబుల్‌కు జంప్ చేయడం.</li>
      </ol>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Breaking Multiple Loops using Flag Variable</span>
          <div class="code-actions">
            <a class="try-btn" href="/online-c-compiler.html" target="_blank">▶ Run in Online C Compiler</a>
          </div>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main() {
    int matrix[3][3] = {
        {1, 2, 3},
        {4, 99, 6},
        {7, 8, 9}
    };
    int target = 99;
    int found = 0; // బూలియన్ ఫ్లాగ్

    for (int r = 0; r &lt; 3; r++) {
        for (int c = 0; c &lt; 3; c++) {
            if (matrix[r][c] == target) {
                printf("🎯 సంఖ్య %d దొరికింది Matrix[%d][%d] వద్ద!\\n", target, r, c);
                found = 1; // ఫ్లాగ్ ఆన్ చేయి
                break;     // ఇన్నర్ లూప్ బ్రేక్ అవుతుంది
            }
        }
        if (found) {
            break; // ఔటర్ లూప్ కూడా తక్షణమే బ్రేక్ అవుతుంది!
        }
    }

    printf("మల్టీ-లెవల్ సెర్చ్ పూర్తయింది.\\n");
    return 0;
}</code></pre>
      </div>
    </div>

    <!-- SECTION 11 -->
    <div class="section-title"><span class="num">11</span>goto స్టేట్‌మెంట్ వివాదం — ఎందుకు నిషేధించారు? ఎప్పుడు ఆమోదయోగ్యం?</div>
    <div class="section-body">
      <p>C లాంగ్వేజ్‌లో <strong>goto స్టేట్‌మెంట్</strong> ప్రోగ్రామ్‌లోని ఏదైనా ఒక లేబుల్ (Label) వద్దకు ఎటువంటి నిబంధన లేకుండా నేరుగా దూకడానికి అనుమతిస్తుంది. కానీ సాఫ్ట్‌వేర్ ఇంజనీరింగ్ రంగంలో ఇది అత్యంత చెడ్డ పేరు సంపాదించుకుంది.</p>

      <div style="background:var(--bg2); border:1px solid var(--border); border-radius:10px; padding:18px; margin:16px 0;">
        <h4 style="color:#059669; margin:0 0 8px; font-size:15px;">ది స్పఘెట్టి కోడ్ డిజాస్టర్ (Spaghetti Code Crisis):</h4>
        <p style="color:var(--text2); font-size:14px; line-height:1.7; margin:0;">
          1968 లో ప్రఖ్యాత కంప్యూటర్ శాస్త్రవేత్త <strong>ఎడ్జర్ డిజ్క్‌స్ట్రా (Edsger Dijkstra)</strong> <em>"Go To Statement Considered Harmful"</em> అనే చారిత్రక పరిశోధనా పత్రాన్ని ప్రచురించారు. ప్రోగ్రామ్‌లో ఇష్టానుసారంగా అటూ ఇటూ <code>goto</code> జంప్స్ రాస్తే, కోడ్ ఫ్లో నూడుల్స్ లేదా స్పఘెట్టి లాగా గజిబిజిగా మారిపోయి డీబగ్ చేయడం అసాధ్యంగా మారుతుంది. అందుకే ఆధునిక స్ట్రక్చర్డ్ ప్రోగ్రామింగ్‌లో <code>goto</code> ను సాధారణ లాజిక్ కోసం వాడకూడదని నియమం విధించారు!
        </p>
      </div>

      <h4 style="color:#059669; margin:16px 0 8px; font-size:15px;">మరి Linux Kernel లో goto ను ఎందుకు విరివిగా వాడుతున్నారు?</h4>
      <p>లైనస్ టోర్వాల్డ్స్ (Linus Torvalds) రూపొందించిన <strong>Linux Kernel సోర్స్ కోడ్‌లో లక్షలాది goto స్టేట్‌మెంట్లు</strong> కనిపిస్తాయి! ఎందుకు? ఎందుకంటే సిస్టమ్ ప్రోగ్రామింగ్‌లో ఫైల్స్, మెమరీ లేదా లాక్‌లను కేటాయించిన తర్వాత మధ్యలో ఏదైనా ఎర్రర్ వస్తే — అన్ని వనరులను ఒకే చోట వరుసగా విడుదల చేయడానికి (Centralized Error Cleanup) <code>goto</code> కంటే సమర్థవంతమైన మార్గం మరొకటి లేదు!</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Linux Kernel Style Error Cleanup with goto</span>
          <div class="code-actions">
            <a class="try-btn" href="/online-c-compiler.html" target="_blank">▶ Run in Online C Compiler</a>
          </div>
        </div>
        <pre><code>#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;

int processResource(int errorCode) {
    printf("1. నెట్‌వర్క్ సాకెట్ ఓపెన్ చేయబడింది.\\n");
    printf("2. మెమరీ బఫర్ కేటాయించబడింది.\\n");

    if (errorCode == -1) {
        printf("🚨 లోపం సంభవించింది! క్లీనప్ లేబుల్‌కు జంప్ చేస్తున్నాం...\\n");
        goto cleanup; // సురక్షితమైన ఎర్రర్ క్లీనప్
    }

    printf("3. డేటా ప్రాసెసింగ్ సక్సెస్ అయింది!\\n");

cleanup:
    printf("4. [CLEANUP] మెమరీ విడుదల చేయబడింది &amp; సాకెట్ క్లోజ్ చేయబడింది.\\n");
    return errorCode;
}

int main() {
    processResource(-1);
    return 0;
}</code></pre>
      </div>
    </div>

    <!-- SECTION 12 -->
    <div class="section-title"><span class="num">12</span>సమగ్ర రియల్ వరల్డ్ ప్రాజెక్ట్ — ప్రైమ్ నంబర్ ఫైండర్ &amp; ట్రాన్సాక్షన్ ఫిల్టర్</div>
    <div class="section-body">
      <p>ఈ పాఠంలో నేర్చుకున్న <code>break</code> మరియు <code>continue</code> కాన్సెప్ట్‌లను కలిపి ఒక సమగ్ర ప్రాక్టికల్ C ప్రోగ్రామ్‌ను రన్ చేద్దాం. ఒక సంఖ్య ప్రధాన సంఖ్య (Prime Number) కాదా అని పరీక్షించడానికి $O(\sqrt{N})$ ఆప్టిమైజేషన్ మరియు <code>break</code> ఉపయోగపడుతుంది:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Optimized Prime Number Detector using break</span>
          <div class="code-actions">
            <a class="try-btn" href="/online-c-compiler.html" target="_blank">▶ Run in Online C Compiler</a>
          </div>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main() {
    int num = 29;
    int isPrime = 1; // 1 అంటే Prime, 0 అంటే Not Prime

    if (num &lt;= 1) {
        isPrime = 0;
    } else {
        // సంఖ్య యొక్క వర్గమూలం (sqrt) వరకు చెక్ చేస్తే సరిపోతుంది
        for (int i = 2; i * i &lt;= num; i++) {
            if (num % i == 0) {
                isPrime = 0;
                printf("-> %d చేత భాగించబడింది (%d * %d = %d)\\n", i, i, num / i, num);
                break; // ఒక్క కారణాంకం దొరికినా అది ప్రైమ్ కాదు, వెంటనే లూప్ ఆపేయి!
            }
        }
    }

    if (isPrime) {
        printf("✅ %d అనేది ఒక ప్రధాన సంఖ్య (Prime Number)!\\n", num);
    } else {
        printf("❌ %d అనేది సంయుక్త సంఖ్య (Composite Number).\\n", num);
    }

    return 0;
}</code></pre>
      </div>

      <h4 style="color:#059669; margin:20px 0 8px; font-size:15px;">బ్యాంకింగ్ ట్రాన్సాక్షన్ ఫిల్టర్ (continue వినియోగం):</h4>
      <p>బ్యాంకింగ్ లెడ్జర్‌లో నెగెటివ్ ఛార్జీలు లేదా సున్నా ట్రాన్సాక్షన్లను విస్మరించి, కేవలం పాజిటివ్ క్రెడిట్‌లను మాత్రమే మొత్తం లెక్కించే కోడ్ ఇది:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Ledger Transaction Filter using continue</span>
          <div class="code-actions">
            <a class="try-btn" href="/online-c-compiler.html" target="_blank">▶ Run in Online C Compiler</a>
          </div>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main() {
    int transactions[] = {500, -20, 1200, 0, -150, 3400, 800};
    int totalValidCredits = 0;
    int count = sizeof(transactions) / sizeof(transactions[0]);

    printf("=== బ్యాంకింగ్ లెడ్జర్ క్రెడిట్ సమ్మరీ ===\\n");
    for (int i = 0; i &lt; count; i++) {
        if (transactions[i] &lt;= 0) {
            // ఫీజులు, పెనాల్టీలు లేదా సున్నా ఎంట్రీలను స్కిప్ చేయి
            continue;
        }
        totalValidCredits += transactions[i];
        printf("క్రెడిట్ రికార్డ్ #%d: రూ. %d జోడించబడింది\\n", i + 1, transactions[i]);
    }

    printf("---------------------------------------\\n");
    printf("మొత్తం చెల్లుబాటు అయ్యే క్రెడిట్స్: రూ. %d\\n", totalValidCredits);
    return 0;
}</code></pre>
      </div>
    </div>

    <!-- SECTION 13 -->
    <div class="section-title"><span class="num">13</span>స్వీయ మూల్యాంకన క్విజ్ &amp; మీరే స్వయంగా Try చేయండి!</div>
    <div class="section-body">
      <p>ఈ పాఠంలోని లోతైన అంశాలను క్రింది 5 ప్రాక్టికల్ ప్రశ్నల ద్వారా పరీక్షించుకోండి:</p>

      <!-- QUIZ QUESTIONS -->
      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:700; cursor:pointer; color:#059669;">
          ❓ ప్రశ్న 1: break మరియు continue మధ్య ఉన్న ప్రధాన వ్యత్యాసం ఏమిటి?
        </summary>
        <div style="margin-top:10px; color:var(--text2); font-size:14px; line-height:1.6;">
          <strong>సమాధానం:</strong> <code>break</code> లూప్‌ను పూర్తిగా ఆపేసి లూప్ వెలుపలికి పంపుతుంది. <code>continue</code> కేవలం ప్రస్తుత ఇటరేషన్‌ను మాత్రమే దాటవేసి తర్వాతి రౌండ్‌కు కంట్రోల్‌ను బదిలీ చేస్తుంది.
        </div>
      </details>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:700; cursor:pointer; color:#059669;">
          ❓ ప్రశ్న 2: రెండు నెస్టెడ్ లూప్‌లు ఉన్నప్పుడు ఇన్నర్ లూప్‌లో break రాస్తే ఔటర్ లూప్ ఆగిపోతుందా?
        </summary>
        <div style="margin-top:10px; color:var(--text2); font-size:14px; line-height:1.6;">
          <strong>సమాధానం:</strong> ఆగదు! C లో <code>break</code> కేవలం అది ఉన్న లోపలి లూప్‌ను మాత్రమే బద్దలు కొడుతుంది. ఔటర్ లూప్ తర్వాతి వరుసను యథావిధిగా కొనసాగిస్తుంది.
        </div>
      </details>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:700; cursor:pointer; color:#059669;">
          ❓ ప్రశ్న 3: while లూప్‌లో continue వాడేటప్పుడు తలెత్తే అతిపెద్ద ప్రమాదం ఏమిటి?
        </summary>
        <div style="margin-top:10px; color:var(--text2); font-size:14px; line-height:1.6;">
          <strong>సమాధానం:</strong> <code>while</code> లూప్‌లో <code>continue</code> అనేది లూప్ బాడీ కింద ఉండే అప్‌డేట్ ఎక్స్‌ప్రెషన్ (<code>i++</code>) ను దాటవేసి నేరుగా కండిషన్‌కు వెళ్తుంది. దీనివలన వేరియబుల్ విలువ పెరగక లూప్ <strong>ఇన్ఫినిట్ లూప్‌గా</strong> మారుతుంది.
        </div>
      </details>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:700; cursor:pointer; color:#059669;">
          ❓ ప్రశ్న 4: C లో goto స్టేట్‌మెంట్‌ను సాధారణ ప్రోగ్రామింగ్‌లో ఎందుకు నిషేధించారు?
        </summary>
        <div style="margin-top:10px; color:var(--text2); font-size:14px; line-height:1.6;">
          <strong>సమాధానం:</strong> ఇది నియంత్రణ లేని జంప్‌లను సృష్టించి కోడ్‌ను <strong>స్పఘెట్టి కోడ్ (Spaghetti Code)</strong> గా మారుస్తుంది. దీనివలన డీబగ్గింగ్ మరియు నిర్వహణ అసాధ్యమవుతాయి. అయితే లైనక్స్ కెర్నల్ వంటి సిస్టమ్స్ లో రిసోర్స్ క్లీనప్ కోసం దీనిని పరిమితంగా ఉపయోగిస్తారు.
        </div>
      </details>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:700; cursor:pointer; color:#059669;">
          ❓ ప్రశ్న 5: 3 అడ్డు వరుసలు మరియు 4 నిలువు వరుసలు ఉన్న నెస్టెడ్ లూప్ మొత్తం ఎన్ని సార్లు రన్ అవుతుంది?
        </summary>
        <div style="margin-top:10px; color:var(--text2); font-size:14px; line-height:1.6;">
          <strong>సమాధానం:</strong> మొత్తం $3 \times 4 = 12$ సార్లు రన్ అవుతుంది (Quadratic behavior $O(N \times M)$).
        </div>
      </details>

      <!-- TRY BOX -->
      <div class="try-box" style="margin-top:24px;">
        <div class="try-title">🚀 స్టార్ ప్యాటర్న్స్ &amp; ప్రైమ్ ఫైండర్‌ను మన ఆన్‌లైన్ C కంపైలర్‌లో రన్ చేయండి!</div>
        <p>పైన వివరించిన <code>సిమెట్రిక్ పిరమిడ్</code>, <code>ఫ్లాయిడ్స్ ట్రయాంగిల్</code>, మరియు <code>ప్రైమ్ నంబర్ ఫైండర్</code> ప్రోగ్రామ్‌లను మన ఆన్‌లైన్ C కంపైలర్‌లో ఓపెన్ చేసి స్వయంగా రన్ చేయండి. రోస్ సంఖ్యను మార్చి కొత్త ప్యాటర్న్‌లను సృష్టించండి!</p>
        <a class="run-btn" href="/online-c-compiler.html" target="_blank">
          👉 Our Compiler లో C Compiler try చేయండి
        </a>
      </div>

      <div style="margin-top:24px;">
        <h4 style="color:#059669; font-size:16px; margin-bottom:10px;">📌 Phase 02 ముగింపు సారాంశం (Phase 02 Wrap-up):</h4>
        <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.7;">
          <li><strong>కంట్రోల్ ఫ్లో విజయవంతంగా పూర్తి:</strong> <code>if-else</code> డెసిషన్ మేకింగ్, <code>switch-case</code> జంప్ టేబుల్స్, <code>for/while/do-while</code> లూప్స్ మరియు <code>break/continue</code> జంప్ స్టేట్‌మెంట్లపై పూర్తి పట్టు సాధించారు!</li>
          <li><strong>break:</strong> అత్యవసర ఎగ్జిట్ డోర్; లూప్‌ను మధ్యలోనే ముగిస్తుంది.</li>
          <li><strong>continue:</strong> ప్రస్తుత రౌండ్‌ను మాత్రమే స్కిప్ చేసి తర్వాతి రౌండ్‌కు దూకుతుంది.</li>
          <li><strong>నెస్టెడ్ లూప్స్:</strong> 2D గ్రిడ్లు, మ్యాట్రిక్స్ ఆపరేషన్లు మరియు ప్యాటర్న్ ప్రింటింగ్ కోసం ఉపయోగించే $O(N^2)$ పవర్ టూల్.</li>
        </ul>
      </div>

      <div style="margin-top:20px; padding:16px; background:var(--bg2); border-left:4px solid #10b981; border-radius:0 8px 8px 0;">
        <strong>తర్వాతి అధ్యాయంలో (Phase 03 — మోడ్యులర్ ప్రోగ్రామింగ్ &amp; మెమరీ):</strong> పెద్ద సాఫ్ట్‌వేర్లను చిన్న చిన్న భాగాలుగా విభజించే <strong>ఫంక్షన్స్ (Functions), ఫంక్షన్ ప్రొటోటైప్స్, మరియు CPU కాల్ స్టాక్ (Call Stack Architecture)</strong> గురించి అద్భుతంగా నేర్చుకుందాం!
      </div>
    </div>

    <!-- PREV / NEXT NAVIGATION -->
    <div style="display:flex; justify-content:space-between; align-items:center; margin-top:40px; padding-top:20px; border-top:1px solid var(--border); flex-wrap:wrap; gap:16px;">
      <a href="/blog-c/07-c-loops-while-do-while-for.html" style="display:inline-flex; align-items:center; gap:8px; padding:10px 18px; border-radius:8px; background:var(--bg3); border:1px solid var(--border); color:var(--text); text-decoration:none; font-weight:700; font-size:13.5px;">
        ← Prev: 7. లూప్స్ (for, while)
      </a>
      <a href="/blog-c/09-c-functions-and-prototypes.html" style="display:inline-flex; align-items:center; gap:8px; padding:10px 20px; border-radius:8px; background:linear-gradient(135deg, #10b981, #059669); color:#ffffff; text-decoration:none; font-weight:700; font-size:13.5px; box-shadow:0 2px 10px rgba(16,185,129,0.2);">
        Next: 9. ఫంక్షన్స్ &amp; కాల్ స్టాక్ →
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
  <title>break, continue, నెస్టెడ్ లూప్స్ & స్టార్ ప్యాటర్న్స్ — Modern C Tutorial | Our Compiler</title>
  <meta name="description" content="break, continue, నెస్టెడ్ లూప్స్ & స్టార్ ప్యాటర్న్స్ సమగ్ర తెలుగు గైడ్: break ఎమర్జెన్సీ ఎగ్జిట్, continue స్కిప్పింగ్, పిరమిడ్ ప్యాటర్న్స్, goto వివాదం, ప్రైమ్ నంబర్ ప్రాజెక్ట్." />
  <meta name="keywords" content="c break continue in telugu, c nested loops, c star patterns, floyds triangle c, goto in c, our compiler" />
  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />
  <link rel="icon" type="image/png" href="/logo.png" />
  <link rel="canonical" href="https://www.ourcompiler.com/blog-c/08-c-break-continue-nested-loops.html" />
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
    "headline": "break, continue, నెస్టెడ్ లూప్స్ & స్టార్ ప్యాటర్న్స్ (C Programming in Telugu)",
    "description": "break ఎమర్జెన్సీ ఎగ్జిట్, continue స్కిప్పింగ్, పిరమిడ్ ప్యాటర్న్స్, goto వివాదం, ప్రైమ్ నంబర్ ప్రాజెక్ట్",
    "articleSection": "Phase 02: కంట్రోల్ ఫ్లో & లూప్స్",
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
    "dateModified": "2026-11-01"
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

const outputPath = path.join(__dirname, '..', 'public', 'blog-c', '08-c-break-continue-nested-loops.html');
fs.writeFileSync(outputPath, fullHtml, 'utf8');

console.log('✅ Successfully generated deep high-value C Chapter 08!');
console.log('Target file size:', fullHtml.length, 'characters');
