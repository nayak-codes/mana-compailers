const fs = require('fs');
const path = require('path');
const { LESSONS, buildSidebar } = require('./c_curriculum_data.js');

const lesson = LESSONS.find(l => l.num === 7);
const sidebarHtml = buildSidebar(7);

const chapterContentHtml = `
    <!-- BREADCRUMB -->
    <div class="breadcrumb">
      <a href="/">Home</a><span class="sep">›</span>
      <a href="/blog.html">Tutorials</a><span class="sep">›</span>
      <a href="/blog-c.html">C Masterclass</a><span class="sep">›</span>
      <span class="current">Chapter 7: లూప్స్ (while, do-while, for) &amp; ఎగ్జిక్యూషన్ సైకిల్</span>
    </div>

    <!-- PAGE TITLE -->
    <h1 class="page-title">C లూప్స్ (while, do-while, for) &amp; ఇటరేషన్ సైకిల్</h1>

    <!-- PAGE META BADGES -->
    <div class="page-meta">
      <span class="badge">⚡ Modern C (C99 / C11 / C17 Standards)</span>
      <span class="badge">🟢 Chapter 07 of 20</span>
      <span class="badge">📂 Phase 02: కంట్రోల్ ఫ్లో &amp; లూప్స్</span>
      <span class="badge">📅 2026 Academic Edition</span>
    </div>

    <!-- SUBTOPICS PILL BAR -->
    <div style="background:var(--bg3); border:1px solid var(--border); border-radius:8px; padding:10px 16px; margin-bottom:24px; font-size:13px; color:var(--text2); display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
      <span style="color:#10b981; font-weight:700;">📌 Covered in this chapter:</span>
      <span>లూపింగ్ ఎసెన్షియల్స్ · 4 దశల లైఫ్‌సైకిల్ · while లూప్ మెకానిక్స్ · do-while గ్యారెంటీడ్ ఎగ్జిక్యూషన్ · for లూప్ 3-పార్ట్ హెడర్ · ఎంట్రీ vs ఎగ్జిట్ కంట్రోల్ · O(1) Loop Unrolling · ఇన్ఫినిట్ లూప్స్ నివారణ · ఆఫ్-బై-వన్ బగ్స్ · ++i vs i++ · ATM పిన్ సెక్యూరిటీ ప్రాజెక్ట్ · కాంపౌండ్ ఇంట్రెస్ట్ ప్రొజెక్షన్ · ఇంటరాక్టివ్ క్విజ్</span>
    </div>

    <!-- INTRO ACCENT BOX (Warm Ivory with Green Accent) -->
    <div class="intro-box">
      <p>ఒక వ్యాయామశాలలో (Gym) లేదా రన్నింగ్ ట్రాక్‌లో కోచ్ మిమ్మల్ని <em>"మైదానం చుట్టూ సరిగ్గా 10 రౌండ్లు పరిగెత్తండి"</em> అని ఆదేశించారనుకుందాం. మీరు ఏం చేస్తారు? మొదటి రౌండ్ ప్రారంభించే ముందు మీ మైండ్‌లో ల్యాప్ కౌంటర్‌ను సున్నాకి (0) సెట్ చేసుకుంటారు. ప్రతి రౌండ్ పూర్తయిన తర్వాత కౌంటర్‌ను 1 పెంచుతారు (1, 2, 3...). 10 రౌండ్లు ముగియగానే అలసటతో పరుగు ఆపేసి విశ్రాంతి తీసుకుంటారు. ఈ ప్రక్రియలో మూడు కీలక అంశాలున్నాయి: ఎక్కడ మొదలుపెట్టాలి? ఎప్పుడు ఆపాలి? ప్రతి అడుగులో లెక్కింపును ఎలా పెంచాలి?</p>
      <p>కంప్యూటర్ సైన్స్‌లో ఈ పునరావృత చర్యనే <strong>లూపింగ్ (Looping) లేదా ఇటరేషన్ (Iteration)</strong> అంటారు. మనుషులమైన మనం ఒకే పనిని వంద సార్లు చేయాలంటే విసుగు చెందుతాం, అలసిపోతాం, మధ్యలో లెక్క తప్పి తప్పులు చేస్తాం. కానీ సిలికాన్ ప్రాసెసర్‌లు ఒకే పనిని సెకనుకు కోట్లాది సార్లు నానోసెకన్ల వేగంతో, బొత్తిగా అలసట లేకుండా, మైక్రోస్కోపిక్ ఖచ్చితత్వంతో పునరావృతం చేయగలవు!</p>
      <p>ఈ ఏడవ అధ్యాయంలో, C లాంగ్వేజ్‌లోని మూడు ప్రధాన లూపింగ్ ఆయుధాలు: <strong>while</strong>, <strong>do-while</strong>, మరియు <strong>for</strong> లూప్‌ల అంతర్గత నిర్మాణం, వాటి 4-దశల ఎగ్జిక్యూషన్ చక్రం (Execution Lifecycle), కంపైలర్ లెవల్ లూప్ అన్‌రోలింగ్ (Loop Unrolling), మరియు ప్రమాదకరమైన <strong>ఆఫ్-బై-వన్ (Off-by-One) ఎర్రర్లను</strong> నివారించే సీక్రెట్లను లోతుగా అన్వేషిద్దాం!</p>
    </div>

    <!-- SECTION 1 -->
    <div class="section-title"><span class="num">1</span>ఈ Chapter లో మీరు నేర్చుకునే అంశాలు (Roadmap)</div>
    <div class="section-body">
      <p>కంట్రోల్ ఫ్లో ప్రోగ్రామింగ్‌లో లూప్స్ అనేవి గుండెకాయ వంటివి. డేటాను ప్రాసెస్ చేయాలన్నా, ఫైళ్లను చదవాలన్నా, గ్రాఫిక్స్ రెండర్ చేయాలన్నా లూప్స్ లేకుండా ఏ కంప్యూటర్ సాఫ్ట్‌వేర్ పనిచేయదు. ఈ పాఠంలో కవర్ చేయబడే సమగ్ర అంశాలు:</p>
      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.7;">
        <li><strong>లూపింగ్ ప్రాథమిక ఆవశ్యకత:</strong> కోడ్ డూప్లికేషన్ (DRY - Don't Repeat Yourself) నివారణ మరియు మెమరీ పొదుపు.</li>
        <li><strong>లూప్ 4-దశల లైఫ్‌సైకిల్:</strong> Initialization, Condition Evaluation, Body Execution, మరియు Update/Step Expression.</li>
        <li><strong>while లూప్ (Entry-Controlled):</strong> కండిషన్ ట్రూ అయితేనే లోపలికి అనుమతించే సెక్యూరిటీ గార్డ్ ఆర్కిటెక్చర్.</li>
        <li><strong>do-while లూప్ (Exit-Controlled):</strong> కండిషన్ ఫాల్స్ అయినా కనీసం ఒక్కసారైనా రన్ అయ్యే గ్యారెంటీడ్ మోడల్.</li>
        <li><strong>for లూప్ (Compact Iteration):</strong> 3 ఎక్స్‌ప్రెషన్లు ఒకే లైన్‌లో ఉండే క్లీన్ ఇంజనీరింగ్ డిజైన్.</li>
        <li><strong>C99 వేరియబుల్ స్కోపింగ్:</strong> <code>for (int i = 0; ...)</code> ద్వారా లూప్ లోపల వేరియబుల్స్ ఐసొలేట్ చేయడం.</li>
        <li><strong>తులనాత్మక విశ్లేషణ పట్టిక:</strong> for vs while vs do-while - ఏ సందర్భంలో దేనిని ఎంచుకోవాలి?</li>
        <li><strong>ఇన్ఫినిట్ లూప్స్ (Infinite Loops):</strong> <code>while(1)</code>, <code>for(;;)</code> ఎప్పుడు వాడాలి? CPU 100% స్టాల్ అవ్వకుండా ఎలా ఆపాలి?</li>
        <li><strong>ఆఫ్-బై-వన్ (Off-by-One / Fencepost) బగ్స్:</strong> ప్రపంచ ప్రసిద్ధ సాఫ్ట్‌వేర్ క్రాష్‌లకు కారణమయ్యే <code>&lt;</code> vs <code>&lt;=</code> పొరపాట్లు.</li>
        <li><strong>ప్రీ-ఇంక్రిమెంట్ (++i) vs పోస్ట్-ఇంక్రిమెంట్ (i++):</strong> లూప్ హెడర్‌లో ఏది వేగవంతమైనది?</li>
        <li><strong>కంపైలర్ ఆప్టిమైజేషన్స్:</strong> లూప్ అన్‌రోలింగ్ (Loop Unrolling) మరియు బ్రాంచ్ ప్రిడిక్షన్ (Branch Prediction).</li>
        <li><strong>రియల్ వరల్డ్ ప్రాజెక్ట్ 1:</strong> 3-స్టెప్ ATM పిన్ వాలిడేషన్ &amp; ఖాతా తాత్కాలిక లాకౌట్ సిస్టమ్.</li>
        <li><strong>రియల్ వరల్డ్ ప్రాజెక్ట్ 2:</strong> ఫైనాన్షియల్ కాంపౌండ్ ఇంట్రెస్ట్ ప్రొజెక్షన్ టేబుల్ జనరేటర్.</li>
        <li><strong>ఇంటరాక్టివ్ స్వీయ మూల్యాంకన క్విజ్:</strong> 5 లోతైన విశ్లేషణాత్మక ప్రశ్నలు &amp; ఎగ్జామ్ కాన్సెప్ట్స్.</li>
      </ul>
    </div>

    <!-- SECTION 2 -->
    <div class="section-title"><span class="num">2</span>లూప్ ఎగ్జిక్యూషన్ యొక్క 4 మూలస్తంభాలు (The 4 Pillars of a Loop)</div>
    <div class="section-body">
      <p>C లాంగ్వేజ్‌లో మీరు ఏ లూప్ రాసినా (అది <code>while</code> అయినా, <code>do-while</code> అయినా, లేదా <code>for</code> అయినా) ప్రతి లూప్ కచ్చితంగా <strong>4 కీలక దశలను (Four Core Phases)</strong> కలిగి ఉంటుంది. ఈ నాలుగు దశలలో ఏ ఒక్కటి లోపించినా, మీ ప్రోగ్రామ్ విఫలమవ్వడమో లేదా నిరంతరం తిరుగుతూ కంప్యూటర్‌ను హ్యాంగ్ చేయడమో జరుగుతుంది!</p>

      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:16px; margin:20px 0;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:10px; padding:18px;">
          <h4 style="color:#059669; margin:0 0 8px; font-size:15px;">1. ఇనిషియలైజేషన్ (Initialization)</h4>
          <p style="color:var(--text2); font-size:13.5px; margin:0; line-height:1.6;">లూప్ కౌంటర్ వేరియబుల్‌కు ప్రారంభ విలువను ఇవ్వడం (ఉదా: <code>int count = 1;</code>). ఇది పరుగు ఎక్కడి నుండి మొదలవుతుందో నిర్దేశిస్తుంది.</p>
        </div>
        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:10px; padding:18px;">
          <h4 style="color:#059669; margin:0 0 8px; font-size:15px;">2. కండిషన్ చెక్ (Condition Test)</h4>
          <p style="color:var(--text2); font-size:13.5px; margin:0; line-height:1.6;">లూప్ కొనసాగాలా లేదా ఆగిపోవాలా అని నిర్ణయించే బూలియన్ టెస్ట్ (ఉదా: <code>count &lt;= 10;</code>). ఇది ట్రూ (non-zero) అయితేనే లూప్ బాడీ రన్ అవుతుంది.</p>
        </div>
        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:10px; padding:18px;">
          <h4 style="color:#059669; margin:0 0 8px; font-size:15px;">3. లూప్ బాడీ (Body Execution)</h4>
          <p style="color:var(--text2); font-size:13.5px; margin:0; line-height:1.6;">కండిషన్ నెరవేరిన ప్రతిసారీ ఎగ్జిక్యూట్ అయ్యే అసలైన స్టేట్‌మెంట్లు (ఉదా: డేటాను ప్రింట్ చేయడం, కాలిక్యులేషన్ చేయడం).</p>
        </div>
        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:10px; padding:18px;">
          <h4 style="color:#059669; margin:0 0 8px; font-size:15px;">4. అప్‌డేట్ / స్టెప్ (Increment/Decrement)</h4>
          <p style="color:var(--text2); font-size:13.5px; margin:0; line-height:1.6;">కౌంటర్ వేరియబుల్‌ను ముగింపు వైపుకు నడిపించే దశ (ఉదా: <code>count++</code>). ఇది లేకపోతే లూప్ ఎప్పటికీ ముగియక ఇన్ఫినిట్ లూప్‌గా మారుతుంది.</p>
        </div>
      </div>

      <div style="background:var(--bg3); border-left:4px solid #10b981; padding:14px 18px; border-radius:0 8px 8px 0; margin-top:14px; font-size:14px; color:var(--text2);">
        <strong>💡 గోల్డెన్ ప్రోగ్రామింగ్ రూల్:</strong> ఒక లూప్ కౌంటర్ విలువ ప్రతి ఇటరేషన్‌లోనూ కండిషన్‌ను ఫాల్స్ (0) చేసే దిశగా అడుగులు వేయాలి. అలా జరగకపోతే లూప్ ఎప్పటికీ టెర్మినేట్ కాదు!
      </div>
    </div>

    <!-- SECTION 3 -->
    <div class="section-title"><span class="num">3</span>while లూప్ — ఎంట్రీ-కంట్రోల్డ్ గార్డ్ (Entry-Controlled Loop)</div>
    <div class="section-body">
      <p><strong>while లూప్</strong> అనేది C లాంగ్వేజ్‌లోని అత్యంత ప్రాథమికమైన లూప్. దీనిని <strong>ఎంట్రీ-కంట్రోల్డ్ లూప్ (Entry-Controlled Loop)</strong> అంటారు. ఎందుకంటే లూప్ బాడీ లోపలికి ప్రవేశించే ముందే మెయిన్ గేటు వద్ద సెక్యూరిటీ గార్డులా కండిషన్‌ను తనిఖీ చేస్తుంది. కండిషన్ ట్రూ అయితేనే లోపలికి అనుమతిస్తుంది; మొదటి ప్రయత్నంలోనే కండిషన్ ఫాల్స్ అయితే, లూప్ బాడీ <strong>జీరో సార్లు (సున్నా సార్లు)</strong> రన్ అవుతుంది!</p>

      <h4 style="color:#059669; margin:16px 0 8px; font-size:15px;">సింటాక్స్:</h4>
      <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px 18px; font-family:'JetBrains Mono',monospace; font-size:13.5px; line-height:1.7; margin-bottom:14px;">
        ఇనిషియలైజేషన్;<br>
        while (కండిషన్) {<br>
        &nbsp;&nbsp;&nbsp;&nbsp;// లూప్ బాడీ (స్టేట్‌మెంట్స్)<br>
        &nbsp;&nbsp;&nbsp;&nbsp;అప్‌డేట్_ఎక్స్‌ప్రెషన్;<br>
        }
      </div>

      <p>క్రింది ఉదాహరణలో 1 నుండి 5 వరకు సంఖ్యలను ప్రింట్ చేసే సింపుల్ while లూప్‌ను గమనించండి:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Basic while Loop Counter</span>
          <div class="code-actions">
            <a class="try-btn" href="/online-c-compiler.html" target="_blank">▶ Run in Online C Compiler</a>
          </div>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main() {
    int i = 1; // 1. Initialization

    printf("--- while లూప్ ప్రారంభం ---\\n");
    while (i &lt;= 5) { // 2. Condition Test
        printf("కౌంటర్ విలువ: %d\\n", i); // 3. Body Execution
        i++; // 4. Update / Increment
    }
    printf("--- లూప్ ముగిసింది. తుది విలువ i = %d ---\\n", i);

    return 0;
}</code></pre>
      </div>

      <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px 18px; margin-top:14px; font-size:14px; color:var(--text2);">
        <strong>అవుట్‌పుట్ విశ్లేషణ:</strong><br>
        లూప్ మొదట <code>i = 1</code> తో స్టార్ట్ అవుతుంది. <code>1 &lt;= 5</code> ట్రూ కాబట్టి 1 ప్రింట్ అవుతుంది, <code>i</code> విలువ 2 అవుతుంది. ఇలా 5 వరకు ప్రింట్ అయిన తర్వాత, <code>i++</code> జరిగి <code>i = 6</code> అవుతుంది. అప్పుడు <code>6 &lt;= 5</code> ఫాల్స్ అయి లూప్ నుండి కంట్రోల్ బయటకు వస్తుంది. అందుకే లూప్ బయట <code>i</code> విలువ సరిగ్గా <strong>6</strong> ఉంటుంది!
      </div>
    </div>

    <!-- SECTION 4 -->
    <div class="section-title"><span class="num">4</span>do-while లూప్ — ఎగ్జిట్-కంట్రోల్డ్ లూప్ (Exit-Controlled Loop)</div>
    <div class="section-body">
      <p><strong>do-while లూప్</strong> అనేది while లూప్‌కు ఖచ్చితమైన వ్యతిరేకమైనది. దీనిని <strong>ఎగ్జిట్-కంట్రోల్డ్ లూప్ (Exit-Controlled Loop)</strong> అంటారు. ఇందులో కండిషన్ చెక్ అనేది లూప్ చివరన జరుగుతుంది. దీని అర్థం ఏమిటంటే:</p>
      
      <p><strong>కండిషన్ మొదటిసారే పూర్తిగా ఫాల్స్ (False) అయినప్పటికీ, లూప్ బాడీ కచ్చితంగా కనీసం ఒక్కసారైనా (At least once) ఎగ్జిక్యూట్ అవుతుంది!</strong></p>

      <h4 style="color:#059669; margin:16px 0 8px; font-size:15px;">సింటాక్స్ &amp; సెమికోలన్ హెచ్చరిక:</h4>
      <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px 18px; font-family:'JetBrains Mono',monospace; font-size:13.5px; line-height:1.7; margin-bottom:14px;">
        ఇనిషియలైజేషన్;<br>
        do {<br>
        &nbsp;&nbsp;&nbsp;&nbsp;// లూప్ బాడీ<br>
        &nbsp;&nbsp;&nbsp;&nbsp;అప్‌డేట్_ఎక్స్‌ప్రెషన్;<br>
        } while (కండిషన్);  <span style="color:#ef4444; font-weight:700;">// &lt;-- ఇక్కడ సెమికోలన్ (;) తప్పనిసరి!</span>
      </div>

      <div style="background:#fef2f2; border:1px solid #fecaca; border-radius:8px; padding:12px 16px; margin:14px 0; color:#991b1b; font-size:13.5px;">
        ⚠️ <strong>కంపైలర్ ఎర్రర్ అలర్ట్:</strong> <code>while</code> లూప్ హెడర్ పక్కన సెమికోలన్ పెట్టకూడదు, కానీ <code>do-while</code> లూప్ చివరన ఉన్న <code>while(...);</code> పక్కన కచ్చితంగా సెమికోలన్ ఉండాలి! సెమికోలన్ మర్చిపోతే GCC <code>expected ';' before '}'</code> అనే సింటాక్స్ ఎర్రర్ విసురుతుంది.
      </div>

      <p>క్రింది ఉదాహరణలో కండిషన్ <code>score &gt; 100</code> అనేది మొదటి నుంచే ఫాల్స్. అయినా బాడీ ఎలా రన్ అవుతుందో చూడండి:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Guaranteed Single Execution in do-while</span>
          <div class="code-actions">
            <a class="try-btn" href="/online-c-compiler.html" target="_blank">▶ Run in Online C Compiler</a>
          </div>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main() {
    int score = 50;

    printf("do-while లోపలికి ప్రవేశిస్తున్నాం...\\n");
    do {
        printf("ఈ మెసేజ్ కనీసం ఒక్కసారైనా ప్రింట్ అవుతుంది! Current score = %d\\n", score);
        score += 10;
    } while (score &gt; 100); // 60 &gt; 100 అనేది FALSE!

    printf("do-while ముగిసింది! Condition ఫాల్స్ అయినా బాడీ ఒక్కసారి రన్ అయింది.\\n");
    return 0;
}</code></pre>
      </div>

      <h4 style="color:#059669; margin:16px 0 8px; font-size:15px;">రియల్ వరల్డ్ ప్రాక్టికల్ అప్లికేషన్:</h4>
      <p>సాఫ్ట్‌వేర్ ఇంజనీరింగ్‌లో <strong>యూజర్ ఇన్‌పుట్ వాలిడేషన్</strong> మరియు <strong>ఇంటరాక్టివ్ మెనూలు</strong> రూపొందించడానికి <code>do-while</code> సర్వోత్తమమైనది. ఎందుకంటే యూజర్‌కు ముందుగా మెనూ లేదా ప్రాంప్ట్ చూపించాలి, తర్వాతే యూజర్ ఇచ్చిన ఇన్‌పుట్ సరైనదా కాదా అని లూప్ కండిషన్‌లో చెక్ చేయాలి!</p>
    </div>

    <!-- SECTION 5 -->
    <div class="section-title"><span class="num">5</span>for లూప్ — కాంపాక్ట్ &amp; ఎలిగాంట్ ఇటరేషన్ (Compact Loop)</div>
    <div class="section-body">
      <p>C లాంగ్వేజ్‌లో అత్యంత ఎక్కువగా వాడబడే లూప్ <strong>for లూప్</strong>. ఎందుకంటే లూప్‌కు అవసరమైన 3 ముఖ్యమైన దశలను (ఇనిషియలైజేషన్, కండిషన్, అప్‌డేట్) ఒకే బ్రాకెట్ లోపల కాంపాక్ట్‌గా అమర్చుకునే అద్భుతమైన సౌలభ్యం ഇതിൽ ఉంది!</p>

      <h4 style="color:#059669; margin:16px 0 8px; font-size:15px;">for లూప్ అనాటమీ &amp; ఎగ్జిక్యూషన్ ఆర్డర్:</h4>
      <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px 18px; font-family:'JetBrains Mono',monospace; font-size:13.5px; line-height:1.7; margin-bottom:14px;">
        for ( <span style="color:#2563eb;">దశ 1: init</span> ; <span style="color:#059669;">దశ 2: condition</span> ; <span style="color:#d97706;">దశ 4: update</span> ) {<br>
        &nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#7c3aed;">// దశ 3: లూప్ బాడీ</span><br>
        }
      </div>

      <div style="background:var(--bg3); border:1px solid var(--border); border-radius:10px; padding:16px; margin:16px 0;">
        <h4 style="color:#059669; margin:0 0 10px; font-size:15px;">CPU ఎగ్జిక్యూషన్ క్రమం (Exact Micro-Order):</h4>
        <ol style="margin:0; padding-left:22px; color:var(--text2); font-size:14px; line-height:1.8;">
          <li><strong>Step 1 (ఇనిషియలైజేషన్):</strong> లూప్ ప్రారంభంలో <em>కేవలం ఒక్కసారి మాత్రమే</em> జరుగుతుంది.</li>
          <li><strong>Step 2 (కండిషన్ చెక్):</strong> కండిషన్ ట్రూ అయితే Step 3 కి వెళ్తుంది. ఫాల్స్ అయితే వెంటనే లూప్ ముగుస్తుంది.</li>
          <li><strong>Step 3 (బాడీ ఎగ్జిక్యూషన్):</strong> కర్లీ బ్రేసెస్ లోపల ఉన్న స్టేట్‌మెంట్లు ఎగ్జిక్యూట్ అవుతాయి.</li>
          <li><strong>Step 4 (అప్‌డేట్):</strong> కౌంటర్ వేరియబుల్ ఇంక్రిమెంట్ లేదా డిక్రిమెంట్ అవుతుంది.</li>
          <li>ఇప్పుడు మళ్లీ <strong>Step 2 కి తిరిగి వెళ్లి</strong> కండిషన్ చెక్ చేస్తుంది. లూప్ ముగిసే వరకు Step 2 ➔ Step 3 ➔ Step 4 చక్రీయంగా తిరుగుతాయి!</li>
        </ol>
      </div>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Standard for Loop (1 to 10 Multiplication Table)</span>
          <div class="code-actions">
            <a class="try-btn" href="/online-c-compiler.html" target="_blank">▶ Run in Online C Compiler</a>
          </div>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main() {
    int n = 7; // 7వ ఎక్కం (Table of 7)

    printf("=== 7వ ఎక్కం (7 Table using for loop) ===\\n");
    for (int i = 1; i &lt;= 10; i++) {
        printf("%d x %2d = %2d\\n", n, i, n * i);
    }

    return 0;
}</code></pre>
      </div>

      <h4 style="color:#059669; margin:18px 0 8px; font-size:15px;">C99 వేరియబుల్ స్కోపింగ్ (Block Scope in for Loops):</h4>
      <p>పాత C89 స్టాండర్డ్‌లో లూప్ కౌంటర్ వేరియబుల్‌ను ఫంక్షన్ మొదట్లోనే డిక్లేర్ చేయాల్సి వచ్చేది. కానీ ఆధునిక <strong>C99 / C11 / C17</strong> స్టాండర్డ్స్ ప్రకారం, <code>for (int i = 0; ...)</code> లాగా నేరుగా లూప్ హెడర్‌లోనే వేరియబుల్‌ను డిక్లేర్ చేయవచ్చు. దీనివలన ఆ వేరియబుల్ కేవలం ఆ లూప్ లోపల మాత్రమే బ్రతుకుతుంది (Block Scope), లూప్ బయట వేరే వేరియబుల్స్‌తో ఘర్షణ పడదు (No Namespace Pollution)!</p>
    </div>

    <!-- SECTION 6 -->
    <div class="section-title"><span class="num">6</span>సమగ్ర తులనాత్మక పట్టిక (while vs do-while vs for)</div>
    <div class="section-body">
      <p>ఏ సందర్భంలో ఏ లూప్ వాడాలి? అనేది ప్రతి కొత్త ప్రోగ్రామర్‌ను వేధించే అతిపెద్ద సందేహం. ఈ క్రింది సమగ్ర పట్టికను పరిశీలించండి:</p>

      <table class="tbl">
        <thead>
          <tr>
            <th>ఫీచర్ / అంశం</th>
            <th>while లూప్</th>
            <th>do-while లూప్</th>
            <th>for లూప్</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>కంట్రోల్ రకం</strong></td>
            <td>ఎంట్రీ-కంట్రోల్డ్ (Entry-Controlled)</td>
            <td>ఎగ్జిట్-కంట్రోల్డ్ (Exit-Controlled)</td>
            <td>ఎంట్రీ-కంట్రోల్డ్ (Entry-Controlled)</td>
          </tr>
          <tr>
            <td><strong>మినిమం ఎగ్జిక్యూషన్స్</strong></td>
            <td><strong>0 సార్లు</strong> (కండిషన్ ఫాల్స్ అయితే)</td>
            <td><strong>కనీసం 1 సారి</strong> (గ్యారెంటీడ్)</td>
            <td><strong>0 సార్లు</strong> (కండిషన్ ఫాల్స్ అయితే)</td>
          </tr>
          <tr>
            <td><strong>సింటాక్స్ స్ట్రక్చర్</strong></td>
            <td>ఇనిషియలైజేషన్, కండిషన్, అప్‌డేట్ విడివిడిగా ఉంటాయి</td>
            <td>చివరన <code>while(...);</code> సెమికోలన్ ఉంటుంది</td>
            <td>అన్నీ ఒకే హెడర్ బ్రాకెట్ లోపల కాంపాక్ట్‌గా ఉంటాయి</td>
          </tr>
          <tr>
            <td><strong>ఉత్తమ వినియోగ సందర్భం</strong></td>
            <td>ఇటరేషన్ల సంఖ్య ముందే తెలియనప్పుడు (ఉదా: ఫైల్ రీడింగ్, సెన్సార్ డేటా)</td>
            <td>యూజర్ ఇన్‌పుట్ వాలిడేషన్ &amp; కన్సోల్ మెనూ ఎంపికలు</td>
            <td>ఇటరేషన్ల సంఖ్య ముందే స్పష్టంగా తెలిసినప్పుడు (ఉదా: 1 నుండి 100 వరకు)</td>
          </tr>
          <tr>
            <td><strong>రీడబిలిటీ</strong></td>
            <td>మధ్యస్థం (అప్‌డేట్ మర్చిపోయే అవకాశం ఉంది)</td>
            <td>మధ్యస్థం</td>
            <td>చాలా ఎక్కువ &amp; క్లీన్ స్ట్రక్చర్</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- SECTION 7 -->
    <div class="section-title"><span class="num">7</span>ఇన్ఫినిట్ లూప్స్ (Infinite Loops) — ఉపయోగాలు &amp; ప్రమాదాలు</div>
    <div class="section-body">
      <p>ఒక లూప్ యొక్క కండిషన్ ఎప్పటికీ ఫాల్స్ కాకపోతే, ఆ లూప్ అంతం లేకుండా నిరంతరం రన్ అవుతూనే ఉంటుంది. దీనినే <strong>ఇన్ఫినిట్ లూప్ (Infinite Loop)</strong> అంటారు. సాధారణంగా అనుభవం లేని బిగినర్స్ పొరపాటున ఇన్ఫినిట్ లూప్స్ సృష్టించి తమ ప్రోగ్రామ్‌లను క్రాష్ చేస్తుంటారు.</p>

      <h4 style="color:#059669; margin:16px 0 8px; font-size:15px;">ఇన్ఫినిట్ లూప్స్ ఎలా ఏర్పడతాయి?</h4>
      <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px 18px; font-family:'JetBrains Mono',monospace; font-size:13.5px; line-height:1.7; margin-bottom:14px;">
        // పద్ధతి 1: while తో అనంత లూప్<br>
        while (1) {<br>
        &nbsp;&nbsp;&nbsp;&nbsp;// ఎప్పటికీ ఆగదు, 1 ఎల్లప్పుడూ TRUE!<br>
        }<br><br>
        // పద్ధతి 2: for తో అనంత లూప్ (అన్ని ఎక్స్‌ప్రెషన్లు ఖాళీగా వదిలేస్తే)<br>
        for (;;) {<br>
        &nbsp;&nbsp;&nbsp;&nbsp;// ఇది కూడా ఇన్ఫినిట్ లూప్!<br>
        }
      </div>

      <div style="background:#fef2f2; border:1px solid #fecaca; border-radius:8px; padding:12px 16px; margin:14px 0; color:#991b1b; font-size:13.5px;">
        ⚠️ <strong>CPU 100% స్టాల్ ప్రమాదం:</strong> ఒక ఇన్ఫినిట్ లూప్ లోపల ఎలాంటి ఆలస్యం (delay) లేదా నిష్క్రమణ నిబంధన (break condition) లేకపోతే, కంప్యూటర్ CPU కోర్ 100% వినియోగంతో వేడెక్కిపోతుంది, ప్రోగ్రామ్ స్పందించడం ఆగిపోతుంది (Unresponsive Program)!
      </div>

      <h4 style="color:#059669; margin:16px 0 8px; font-size:15px;">ఇన్ఫినిట్ లూప్స్ సాఫ్ట్‌వేర్ ఇంజనీరింగ్‌లో నిజంగా అవసరమా?</h4>
      <p>అవును! ఆపరేటింగ్ సిస్టమ్‌ల కెర్నల్స్ (OS Event Loops), మైక్రోకంట్రోలర్లు (Arduino/Embedded Systems లో <code>while(1)</code>), వెబ్ సర్వర్లు (రెక్వెస్ట్‌ల కోసం వేచి ఉండే లిజనర్లు), మరియు వీడియో గేమ్‌ల రెండరింగ్ లూప్స్ అన్నీ ఇన్ఫినిట్ లూప్స్ పైనే నడుస్తాయి. అయితే, వాటిలో కచ్చితంగా యూజర్ 'Quit' బటన్ నొక్కినప్పుడు బయటపడటానికి <code>break</code> స్టేట్‌మెంట్ అమర్చబడి ఉంటుంది!</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Controlled Infinite Loop with Sentinel Value</span>
          <div class="code-actions">
            <a class="try-btn" href="/online-c-compiler.html" target="_blank">▶ Run in Online C Compiler</a>
          </div>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main() {
    int num, sum = 0;

    printf("=== సంఖ్యల కూడిక (ఆపడానికి -1 ఎంటర్ చేయండి) ===\\n");
    while (1) { // కంట్రోల్డ్ ఇన్ఫినిట్ లూప్
        printf("ఒక సంఖ్యను ఎంటర్ చేయండి: ");
        scanf("%d", &amp;num);

        if (num == -1) {
            printf("సెంటినెల్ విలువ (-1) గుర్తించబడింది. లూప్ నుండి బయటకు వస్తున్నాం...\\n");
            break; // లూప్ నుండి తక్షణ నిష్క్రమణ!
        }

        sum += num;
        printf("ప్రస్తుత మొత్తం (Current Sum): %d\\n", sum);
    }

    printf("తుది మొత్తం: %d\\n", sum);
    return 0;
}</code></pre>
      </div>
    </div>

    <!-- SECTION 8 -->
    <div class="section-title"><span class="num">8</span>ప్రాణాంతక 'ఆఫ్-బై-వన్' ఎర్రర్స్ (Off-by-One Bugs &amp; Fencepost Analysis)</div>
    <div class="section-body">
      <p>ప్రపంచవ్యాప్తంగా సీనియర్ సాఫ్ట్‌వేర్ ఇంజనీర్లు సైతం తరచుగా చేసే అత్యంత మోసపూరితమైన తప్పు <strong>ఆఫ్-బై-వన్ బగ్ (Off-by-One Error - OBOE)</strong>. ఒక పనిని అనుకున్నదానికంటే సరిగ్గా ఒక్కసారి తక్కువగానో లేదా ఒక్కసారి ఎక్కువగానో రన్ చేయడమే ఈ బగ్!</p>

      <div style="background:var(--bg2); border:1px solid var(--border); border-radius:10px; padding:18px; margin:16px 0;">
        <h4 style="color:#059669; margin:0 0 8px; font-size:15px;">ది ఫెన్స్‌పోస్ట్ ఎనాలజీ (The Fencepost Metaphor):</h4>
        <p style="color:var(--text2); font-size:14px; line-height:1.7; margin:0;">
          మీ ఇంటి చుట్టూ 10 మీటర్ల కంచె వేయాలనుకుంటున్నారు. ప్రతి 1 మీటరుకు ఒక స్తంభం (Post) పాతి వాటి మధ్య తీగ కట్టాలి. మీకు ఎన్ని స్తంభాలు కావాలి? సహజంగా చాలామంది వెంటనే "10 స్తంభాలు" అంటారు. కానీ వాస్తవానికి మీకు <strong>11 స్తంభాలు</strong> కావాలి! (మొదటి స్తంభం 0 మీటర్ల వద్ద, 10వ మీటరు వద్ద చివరి స్తంభం). స్తంభాల సంఖ్య వేరు, మధ్యలోని ఖాళీల (Sections) సంఖ్య వేరు. లూప్స్‌లో <code>&lt;</code> మరియు <code>&lt;=</code> మధ్య తేడాను సరిగ్గా అర్థం చేసుకోకపోతే ఈ ఫెన్స్‌పోస్ట్ సమస్య వస్తుంది!
        </p>
      </div>

      <table class="tbl">
        <thead>
          <tr>
            <th>లూప్ కండిషన్</th>
            <th>ఎగ్జిక్యూట్ అయ్యే సంఖ్యలు</th>
            <th>మొత్తం ఇటరేషన్లు</th>
            <th>ఫలితం / ప్రమాదం</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>for (int i = 0; i &lt; 5; i++)</code></td>
            <td>0, 1, 2, 3, 4</td>
            <td><strong>5 సార్లు</strong></td>
            <td>ఆదర్శవంతమైన C అర్రే ఇండెక్సింగ్! (0 నుండి N-1)</td>
          </tr>
          <tr>
            <td><code>for (int i = 0; i &lt;= 5; i++)</code></td>
            <td>0, 1, 2, 3, 4, 5</td>
            <td><strong>6 సార్లు</strong></td>
            <td>అర్రే సైజ్ 5 అయితే, 5వ ఇండెక్స్ మెమరీ క్రాష్‌కు దారితీస్తుంది!</td>
          </tr>
          <tr>
            <td><code>for (int i = 1; i &lt;= 5; i++)</code></td>
            <td>1, 2, 3, 4, 5</td>
            <td><strong>5 సార్లు</strong></td>
            <td>సాధారణ లెక్కింపులకు సరైనది (1 నుండి N వరకు)</td>
          </tr>
          <tr>
            <td><code>for (int i = 1; i &lt; 5; i++)</code></td>
            <td>1, 2, 3, 4</td>
            <td><strong>4 సార్లు</strong></td>
            <td>5వ విలువ మిస్ అవుతుంది (1 సారి తక్కువ)!</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- SECTION 9 -->
    <div class="section-title"><span class="num">9</span>లూప్స్‌లో ప్రీ-ఇంక్రిమెంట్ (++i) vs పోస్ట్-ఇంక్రిమెంట్ (i++)</div>
    <div class="section-body">
      <p>చాలామంది ప్రోగ్రామర్లలో ఒక ఆసక్తికరమైన ప్రశ్న ఉంటుంది: <em>"for లూప్ హెడర్‌లో <code>i++</code> వాడాలా లేక <code>++i</code> వాడాలా? రెండింటి మధ్య పనితీరులో (Performance) ఏమైనా తేడా ఉందా?"</em></p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Comparing Increment Forms</span>
          <div class="code-actions">
            <a class="try-btn" href="/online-c-compiler.html" target="_blank">▶ Run in Online C Compiler</a>
          </div>
        </div>
        <pre><code>// స్టైల్ 1: పోస్ట్-ఇంక్రిమెంట్
for (int i = 0; i &lt; 5; i++) {
    printf("%d ", i); // అవుట్‌పుట్: 0 1 2 3 4
}

// స్టైల్ 2: ప్రీ-ఇంక్రిమెంట్
for (int i = 0; i &lt; 5; ++i) {
    printf("%d ", i); // అవుట్‌పుట్: 0 1 2 3 4
}</code></pre>
      </div>

      <div style="background:var(--bg2); border:1px solid var(--border); border-radius:10px; padding:18px; margin:16px 0;">
        <h4 style="color:#059669; margin:0 0 8px; font-size:15px;">వాస్తవ ఇంజనీరింగ్ సమాధానం:</h4>
        <p style="color:var(--text2); font-size:14px; line-height:1.7; margin:0;">
          <strong>ప్రాథమిక C డేటా టైప్స్ (int, char) విషయంలో:</strong> ఒక స్వతంత్ర స్టేట్‌మెంట్‌గా రన్ అయినప్పుడు <code>i++</code> మరియు <code>++i</code> రెండూ ఒకే ఒక్క అసెంబ్లీ ఇన్‌స్ట్రక్షన్ <code>INC [i]</code> లేదా <code>add $1, %eax</code> గా కంపైల్ అవుతాయి. కాబట్టి <strong>పనితీరులో 0% వ్యత్యాసం</strong> ఉంటుంది, రెండూ ఒకే వేగంతో రన్ అవుతాయి! లూప్ బాడీ ముగిసిన తర్వాతే ఈ అప్‌డేట్ జరుగుతుంది కాబట్టి లూప్ ఇటరేషన్ల సంఖ్యలో ఎలాంటి మార్పు ఉండదు.
        </p>
      </div>
    </div>

    <!-- SECTION 10 -->
    <div class="section-title"><span class="num">10</span>కంపైలర్ ఆప్టిమైజేషన్స్ — Loop Unrolling &amp; Branch Prediction</div>
    <div class="section-body">
      <p>ఆధునిక కంపైలర్లు (GCC, Clang) లూప్‌లను ఎలా ఆప్టిమైజ్ చేస్తాయో తెలుసుకోవడం ప్రొఫెషనల్ ఇంజనీరింగ్‌కు ఎంతో అవసరం. లూప్ ప్రతి ఇటరేషన్‌లోనూ CPU కండిషన్‌ను తనిఖీ చేసి మెమరీ జంప్ (JMP instruction) చేయాల్సి ఉంటుంది. ఇది బ్రాంచ్ ప్రిడిక్షన్ మిస్ అయితే సమయం వృధా అవుతుంది.</p>

      <h4 style="color:#059669; margin:16px 0 8px; font-size:15px;">లూప్ అన్‌రోలింగ్ (Loop Unrolling) అంటే ఏమిటి?</h4>
      <p>ఇటరేషన్ల సంఖ్య తక్కువగా ఉన్నప్పుడు, కంపైలర్ లూప్ ఓవర్‌హెడ్‌ను తగ్గించడానికి లూప్ బాడీని వరుసగా కాపీ చేసి ఎగ్జిక్యూట్ చేస్తుంది. ఉదాహరణకు:</p>

      <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin:16px 0;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px;">
          <strong style="color:#ef4444;">మనం రాసిన సాధారణ లూప్ (4 జంప్స్):</strong>
          <pre style="margin-top:8px; font-size:13px; font-family:'JetBrains Mono',monospace;">for (int i = 0; i &lt; 4; i++) {
    sum += arr[i];
}</pre>
        </div>
        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px;">
          <strong style="color:#10b981;">కంపైలర్ అన్‌రోల్ చేసిన కోడ్ (0 జంప్స్):</strong>
          <pre style="margin-top:8px; font-size:13px; font-family:'JetBrains Mono',monospace;">sum += arr[0];
sum += arr[1];
sum += arr[2];
sum += arr[3];</pre>
        </div>
      </div>
      <p style="color:var(--text2); font-size:14px;">ఇలా చేయడం ద్వారా కండిషన్ చెకింగ్ మరియు జంప్ ఇన్‌స్ట్రక్షన్లు పూర్తిగా తొలగిపోయి, కోడ్ అత్యధిక వేగంతో (Peak CPU throughput) ఎగ్జిక్యూట్ అవుతుంది!</p>
    </div>

    <!-- SECTION 11 -->
    <div class="section-title"><span class="num">11</span>సమగ్ర రియల్ వరల్డ్ ప్రాజెక్ట్ 1 — ATM పిన్ సెక్యూరిటీ సిస్టమ్ (do-while)</div>
    <div class="section-body">
      <p>ఒక నిజమైన ATM మెషీన్‌లో కస్టమర్ పిన్ నంబర్ నమోదు చేసే సిస్టమ్‌ను రూపొందిద్దాం. వినియోగదారుడికి గరిష్టంగా 3 అవకాశాలు మాత్రమే ఉంటాయి. 3 సార్లు తప్పుడు పిన్ ఎంటర్ చేస్తే ఖాతా తాత్కాలికంగా బ్లాక్ అవుతుంది. సరైన పిన్ ఇవ్వగానే తదుపరి బ్యాంకింగ్ సేవలకు అనుమతిస్తుంది. దీనికి <code>do-while</code> లూప్ అత్యంత సరైన ఎంపిక:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — ATM PIN Authentication &amp; Lockout System</span>
          <div class="code-actions">
            <a class="try-btn" href="/online-c-compiler.html" target="_blank">▶ Run in Online C Compiler</a>
          </div>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main() {
    const int CORRECT_PIN = 4826; // సరైన రహస్య పిన్
    int enteredPin;
    int attempts = 0;
    const int MAX_ATTEMPTS = 3;
    int authenticated = 0;

    printf("=======================================\\n");
    printf("   మనా బ్యాంక్ ATM సర్వీసెస్ (Mana ATM)\\n");
    printf("=======================================\\n");

    do {
        attempts++;
        printf("\\n[ప్రయత్నం %d/%d] దయచేసి మీ 4-అంకెల ATM పిన్ ఎంటర్ చేయండి: ", attempts, MAX_ATTEMPTS);
        scanf("%d", &amp;enteredPin);

        if (enteredPin == CORRECT_PIN) {
            authenticated = 1;
            break; // సరైన పిన్ దొరికితే వెంటనే లూప్ నుండి నిష్క్రమించు
        } else {
            int remaining = MAX_ATTEMPTS - attempts;
            if (remaining &gt; 0) {
                printf("❌ తప్పుడు పిన్! మీకు ఇంకా %d అవకాశాలు మాత్రమే ఉన్నాయి.\\n", remaining);
            }
        }
    } while (attempts &lt; MAX_ATTEMPTS);

    printf("\\n---------------------------------------\\n");
    if (authenticated) {
        printf("✅ పిన్ విజయవంతంగా ధృవీకరించబడింది!\\n");
        printf("🏦 వెల్‌కమ్! మీ ఖాతాలో బ్యాలెన్స్: రూ. 75,450.00\\n");
    } else {
        printf("🚨 హెచ్చరిక: మీరు 3 సార్లు తప్పుడు పిన్ నమోదు చేశారు!\\n");
        printf("🔒 సెక్యూరిటీ కారణాల వల్ల మీ ATM కార్డ్ 24 గంటలు బ్లాక్ చేయబడింది.\\n");
    }
    printf("=======================================\\n");

    return 0;
}</code></pre>
      </div>
    </div>

    <!-- SECTION 12 -->
    <div class="section-title"><span class="num">12</span>సమగ్ర రియల్ వరల్డ్ ప్రాజెక్ట్ 2 — కాంపౌండ్ ఇంట్రెస్ట్ ప్రొజెక్షన్ (for loop)</div>
    <div class="section-body">
      <p>ఫైనాన్షియల్ ఇంజనీరింగ్‌లో కాంపౌండ్ ఇంట్రెస్ట్ (చక్రవడ్డీ) వార్షిక వృద్ధిని అంచనా వేసే ప్రొజెక్షన్ టేబుల్ జనరేటర్‌ను <code>for</code> లూప్ ఉపయోగించి నిర్మిద్దాం. ప్రతి సంవత్సరం వడ్డీ అసలుకు కలుస్తూ మూలధనం ఎలా పెరుగుతుందో లూప్ ద్వారా ఖచ్చితంగా లెక్కించవచ్చు:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Compound Interest Growth Projection Table</span>
          <div class="code-actions">
            <a class="try-btn" href="/online-c-compiler.html" target="_blank">▶ Run in Online C Compiler</a>
          </div>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main() {
    double principal = 100000.0; // ప్రారంభ పెట్టుబడి: రూ. 1,00,000
    double annualRate = 12.0;    // వార్షిక వడ్డీ రేటు: 12%
    int totalYears = 5;          // పెట్టుబడి కాలం: 5 సంవత్సరాలు

    printf("====================================================\\n");
    printf("   కాంపౌండ్ ఇంట్రెస్ట్ ప్రొజెక్షన్ చార్ట్ (12%% వార్షిక వృద్ధి)\\n");
    printf("====================================================\\n");
    printf("%-8s | %-16s | %-14s | %-16s\\n", "సంవత్సరం", "ప్రారంభ బ్యాలెన్స్", "వచ్చిన వడ్డీ", "ముగింపు బ్యాలెన్స్");
    printf("----------------------------------------------------\\n");

    double currentBalance = principal;
    for (int year = 1; year &lt;= totalYears; year++) {
        double interestEarned = currentBalance * (annualRate / 100.0);
        double closingBalance = currentBalance + interestEarned;

        printf("Year %-3d | రూ. %12.2f | రూ. %10.2f | రూ. %12.2f\\n",
               year, currentBalance, interestEarned, closingBalance);

        currentBalance = closingBalance; // తర్వాతి సంవత్సరానికి ముగింపు బ్యాలెన్స్ ప్రారంభ బ్యాలెన్స్ అవుతుంది
    }

    printf("====================================================\\n");
    printf("5 సంవత్సరాల తర్వాత మొత్తం లాభం: రూ. %.2f\\n", currentBalance - principal);
    return 0;
}</code></pre>
      </div>

      <div style="margin-top:20px;">
        <h4 style="color:#059669; font-size:15px; margin-bottom:8px;">సాధారణంగా బిగినర్స్ చేసే టాప్ 3 లూప్ తప్పులు:</h4>
        <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.7;">
          <li><strong>for హెడర్ చివర సెమికోలన్ పెట్టడం:</strong> <code>for (int i = 0; i &lt; 5; i++);</code> అని రాస్తే, సెమికోలన్ అక్కడితో లూప్‌ను ముగించేస్తుంది! కర్లీ బ్రేసెస్ లోపల ఉన్న కోడ్ లూప్ తర్వాత కేవలం ఒక్కసారి మాత్రమే రన్ అవుతుంది.</li>
          <li><strong>లూప్ వేరియబుల్‌ను అప్‌డేట్ చేయడం మర్చిపోవడం:</strong> <code>while (i &lt; 10)</code> రాసి లోపల <code>i++</code> రాయకపోతే నిరంతరం తిరుగుతూనే ఉంటుంది.</li>
          <li><strong>ఫ్లోటింగ్ పాయింట్ నంబర్లను లూప్ కౌంటర్లుగా వాడడం:</strong> <code>for (float f = 0.0; f != 1.0; f += 0.1)</code> రాయకూడదు! ఫ్లోటింగ్ పాయింట్ ప్రెసిషన్ రౌండింగ్ ఎర్రర్స్ వలన <code>f</code> విలువ ఖచ్చితంగా <code>1.0</code> కి సమానం కాక ఇన్ఫినిట్ లూప్‌గా మారే ప్రమాదం ఉంది.</li>
        </ul>
      </div>
    </div>

    <!-- SECTION 13 -->
    <div class="section-title"><span class="num">13</span>స్వీయ మూల్యాంకన క్విజ్ &amp; మీరే స్వయంగా Try చేయండి!</div>
    <div class="section-body">
      <p>ఈ పాఠంలో నేర్చుకున్న లూపింగ్ కాన్సెప్ట్‌లను క్రింది 5 లోతైన ప్రాక్టికల్ ప్రశ్నల ద్వారా పరీక్షించుకోండి:</p>

      <!-- QUIZ QUESTIONS -->
      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:700; cursor:pointer; color:#059669;">
          ❓ ప్రశ్న 1: while మరియు do-while లూప్‌ల మధ్య అతి ముఖ్యమైన తేడా ఏమిటి?
        </summary>
        <div style="margin-top:10px; color:var(--text2); font-size:14px; line-height:1.6;">
          <strong>సమాధానం:</strong> <code>while</code> అనేది ఎంట్రీ-కంట్రోల్డ్ లూప్, కండిషన్ ఫాల్స్ అయితే కనీసం ఒక్కసారి కూడా రన్ కాదు (0 సార్లు). కానీ <code>do-while</code> అనేది ఎగ్జిట్-కంట్రోల్డ్ లూప్, కండిషన్ ఫాల్స్ అయినా సరే కనీసం ఒక్కసారైనా గ్యారెంటీగా ఎగ్జిక్యూట్ అవుతుంది.
        </div>
      </details>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:700; cursor:pointer; color:#059669;">
          ❓ ప్రశ్న 2: for(;;) అని రాస్తే ఏం జరుగుతుంది?
        </summary>
        <div style="margin-top:10px; color:var(--text2); font-size:14px; line-height:1.6;">
          <strong>సమాధానం:</strong> <code>for (;;)</code> లో మూడు భాగాలు (ఇనిషియలైజేషన్, కండిషన్, అప్‌డేట్) ఖాళీగా ఉన్నాయి. కండిషన్ లేనప్పుడు C కంపైలర్ దానిని శాశ్వతంగా <strong>TRUE (1)</strong> గా పరిగణిస్తుంది. కాబట్టి ఇది ఒక <strong>అనంత లూప్ (Infinite Loop)</strong> గా మారుతుంది.
        </div>
      </details>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:700; cursor:pointer; color:#059669;">
          ❓ ప్రశ్న 3: int i = 0; while (i &lt; 5); { printf("%d", i); i++; } ఈ కోడ్ అవుట్‌పుట్ ఏమిటి?
        </summary>
        <div style="margin-top:10px; color:var(--text2); font-size:14px; line-height:1.6;">
          <strong>సమాధానం:</strong> ఇది <strong>ఇన్ఫినిట్ లూప్‌లో చిక్కుకుపోతుంది!</strong> ఎందుకంటే <code>while (i &lt; 5);</code> చివర సెమికోలన్ ఉండటం వలన అక్కడే ఖాళీ లూప్ నిరంతరం తిరుగుతూనే ఉంటుంది. <code>i</code> విలువ ఎప్పటికీ పెరగదు, కర్లీ బ్రేసెస్ లోపలికి కంట్రోల్ రాదు!
        </div>
      </details>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:700; cursor:pointer; color:#059669;">
          ❓ ప్రశ్న 4: 10 ఎలిమెంట్స్ ఉన్న C అర్రేను లూప్ చేసేటప్పుడు i &lt; 10 వాడాలా లేక i &lt;= 10 వాడాలా?
        </summary>
        <div style="margin-top:10px; color:var(--text2); font-size:14px; line-height:1.6;">
          <strong>సమాధానం:</strong> కచ్చితంగా <code>i &lt; 10</code> వాడాలి! C లో అర్రే ఇండెక్స్ 0 నుండి ప్రారంభమై 9 వద్ద ముగుస్తుంది. <code>i &lt;= 10</code> రాస్తే 10వ ఇండెక్స్ యాక్సెస్ చేయడానికి ప్రయత్నించి <strong>ఆఫ్-బై-వన్ బగ్ (Buffer Overflow)</strong> ఏర్పడుతుంది.
        </div>
      </details>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:700; cursor:pointer; color:#059669;">
          ❓ ప్రశ్న 5: లూప్ అన్‌రోలింగ్ (Loop Unrolling) వలన కలిగే ప్రధాన ప్రయోజనం ఏమిటి?
        </summary>
        <div style="margin-top:10px; color:var(--text2); font-size:14px; line-height:1.6;">
          <strong>సమాధానం:</strong> కండిషన్ టెస్టింగ్ మరియు జంప్ ఇన్‌స్ట్రక్షన్ల ఓవర్‌హెడ్‌ను తగ్గించడం ద్వారా CPU ఎగ్జిక్యూషన్ వేగాన్ని విపరీతంగా పెంచడం దీని ముఖ్య ఉద్దేశ్యం.
        </div>
      </details>

      <!-- TRY BOX -->
      <div class="try-box" style="margin-top:24px;">
        <div class="try-title">🚀 ATM &amp; కాంపౌండ్ ఇంట్రెస్ట్ ప్రాజెక్ట్‌లను మన ఆన్‌లైన్ C కంపైలర్‌లో రన్ చేయండి!</div>
        <p>పైన వివరించిన <code>ATM పిన్ సెక్యూరిటీ సిమ్యులేటర్</code> మరియు <code>కాంపౌండ్ ఇంట్రెస్ట్ ప్రొజెక్షన్</code> ప్రోగ్రామ్‌లను మన ఆన్‌లైన్ C కంపైలర్‌లో ఓపెన్ చేసి మీ స్వంత టెస్ట్ డేటాతో రన్ చేయండి. లూప్ కండిషన్‌లను మార్చి ఫలితాలను గమనించండి!</p>
        <a class="run-btn" href="/online-c-compiler.html" target="_blank">
          👉 Our Compiler లో C Compiler try చేయండి
        </a>
      </div>

      <div style="margin-top:24px;">
        <h4 style="color:#059669; font-size:16px; margin-bottom:10px;">📌 అధ్యాయ సారాంశం (Quick Summary):</h4>
        <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.7;">
          <li><strong>లూప్స్:</strong> ఒకే పనిని అలసట లేకుండా వేలసార్లు రన్ చేసే పునరావృత ఇంజిన్లు.</li>
          <li><strong>4 దశలు:</strong> Initialization, Condition Check, Body Execution, Updation.</li>
          <li><strong>while:</strong> ఎంట్రీ-కంట్రోల్డ్ లూప్; కండిషన్ ట్రూ అయితేనే రన్ అవుతుంది.</li>
          <li><strong>do-while:</strong> ఎగ్జిట్-కంట్రోల్డ్ లూప్; కనీసం ఒక్కసారైనా గ్యారెంటీగా రన్ అవుతుంది.</li>
          <li><strong>for:</strong> మూడు దశలను ఒకే లైన్‌లో ఉంచే అత్యంత క్లీన్ మరియు ప్రాచుర్యం పొందిన లూప్.</li>
          <li><strong>ఆఫ్-బై-వన్:</strong> కండిషన్‌లో <code>&lt;</code> మరియు <code>&lt;=</code> తారుమారు కావడం వల్ల వచ్చే మోసపూరిత బగ్.</li>
        </ul>
      </div>

      <div style="margin-top:20px; padding:16px; background:var(--bg2); border-left:4px solid #10b981; border-radius:0 8px 8px 0;">
        <strong>తర్వాతి అధ్యాయంలో (Chapter 08):</strong> లూప్‌లను మధ్యలోనే ఆపేసే <strong>break</strong>, ప్రస్తుత రౌండ్‌ను స్కిప్ చేసే <strong>continue</strong>, మరియు అందమైన <strong>నెస్టెడ్ స్టార్/పిరమిడ్ ప్యాటర్న్స్ (Nested Loop Patterns)</strong> ఎలా నిర్మించాలో మాస్టర్ చేసుకుందాం!
      </div>
    </div>

    <!-- PREV / NEXT NAVIGATION -->
    <div style="display:flex; justify-content:space-between; align-items:center; margin-top:40px; padding-top:20px; border-top:1px solid var(--border); flex-wrap:wrap; gap:16px;">
      <a href="/blog-c/06-c-switch-case-decision-making.html" style="display:inline-flex; align-items:center; gap:8px; padding:10px 18px; border-radius:8px; background:var(--bg3); border:1px solid var(--border); color:var(--text); text-decoration:none; font-weight:700; font-size:13.5px;">
        ← Prev: 6. switch స్టేట్‌మెంట్
      </a>
      <a href="/blog-c/08-c-break-continue-nested-loops.html" style="display:inline-flex; align-items:center; gap:8px; padding:10px 20px; border-radius:8px; background:linear-gradient(135deg, #10b981, #059669); color:#ffffff; text-decoration:none; font-weight:700; font-size:13.5px; box-shadow:0 2px 10px rgba(16,185,129,0.2);">
        Next: 8. break, continue &amp; ప్యాటర్న్స్ →
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
  <title>C లూప్స్ (while, do-while, for) & ఇటరేషన్ సైకిల్ — Modern C Tutorial | Our Compiler</title>
  <meta name="description" content="C లూప్స్ (while, do-while, for) సమగ్ర తెలుగు గైడ్: 4 దశల లైఫ్‌సైకిల్, ఎంట్రీ vs ఎగ్జిట్ కంట్రోల్ తేడాలు, ఇన్ఫినిట్ లూప్స్ నివారణ, ఆఫ్-బై-వన్ బగ్స్, ATM ప్రాజెక్ట్." />
  <meta name="keywords" content="c loops in telugu, while loop c, do while loop c, for loop c, c programming telugu, our compiler" />
  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />
  <link rel="icon" type="image/png" href="/logo.png" />
  <link rel="canonical" href="https://www.ourcompiler.com/blog-c/07-c-loops-while-do-while-for.html" />
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
    "headline": "C లూప్స్ (while, do-while, for) & ఇటరేషన్ సైకిల్ (C Programming in Telugu)",
    "description": "4 దశల లైఫ్‌సైకిల్, ఎంట్రీ vs ఎగ్జిట్ కంట్రోల్ తేడాలు, ఇన్ఫినిట్ లూప్స్ నివారణ, ఆఫ్-బై-వన్ బగ్స్, ATM ప్రాజెక్ట్",
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

const outputPath = path.join(__dirname, '..', 'public', 'blog-c', '07-c-loops-while-do-while-for.html');
fs.writeFileSync(outputPath, fullHtml, 'utf8');

console.log('✅ Successfully generated deep high-value C Chapter 07!');
console.log('Target file size:', fullHtml.length, 'characters');

