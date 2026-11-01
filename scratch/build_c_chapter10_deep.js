const fs = require('fs');
const path = require('path');
const { LESSONS, buildSidebar } = require('./c_curriculum_data.js');

const lesson = LESSONS.find(l => l.num === 10);
const sidebarHtml = buildSidebar(10);

const chapterContentHtml = `
    <!-- BREADCRUMB -->
    <div class="breadcrumb">
      <a href="/">Home</a><span class="sep">›</span>
      <a href="/blog.html">Tutorials</a><span class="sep">›</span>
      <a href="/blog-c.html">C Masterclass</a><span class="sep">›</span>
      <span class="current">Chapter 10: Call by Value vs Call by Reference (పాయింటర్స్ ద్వారా)</span>
    </div>

    <!-- PAGE TITLE -->
    <h1 class="page-title">Call by Value vs Call by Reference &amp; మెమరీ పాయింటర్స్</h1>

    <!-- PAGE META BADGES -->
    <div class="page-meta">
      <span class="badge">⚡ Modern C (C99 / C11 / C17 Standards)</span>
      <span class="badge">🟢 Chapter 10 of 20</span>
      <span class="badge">📂 Phase 03: ఫంక్షన్స్, స్కోప్ &amp; రికర్షన్</span>
      <span class="badge">📅 2026 Academic Edition</span>
    </div>

    <!-- SUBTOPICS PILL BAR -->
    <div style="background:var(--bg3); border:1px solid var(--border); border-radius:8px; padding:10px 16px; margin-bottom:24px; font-size:13px; color:var(--text2); display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
      <span style="color:#10b981; font-weight:700;">📌 Covered in this chapter:</span>
      <span>జిరాక్స్ కాపీ vs ఒరిజినల్ లాకర్ అడ్రస్ · Call by Value డీఫాల్ట్ మెకానిక్స్ · swap(a, b) బగ్ పోస్ట్‌మార్టం · పాయింటర్స్ ఇంట్రడక్షన్ (&amp; మరియు *) · swap(&amp;a, &amp;b) తో అసలైన స్వాపింగ్ · ఫంక్షన్ నుండి మల్టిపుల్ రిటర్న్స్ · లార్జ్ డేటా పర్ఫార్మెన్స్ బూస్ట్ · const పాయింటర్స్ సేఫ్టీ · NULL పాయింటర్ సెగ్‌ఫాల్ట్ నివారణ · బ్యాంక్ ఫండ్ ట్రాన్స్‌ఫర్ ప్రాజెక్ట్ · ఇంటరాక్టివ్ క్విజ్</span>
    </div>

    <!-- INTRO ACCENT BOX (Warm Ivory with Green Accent) -->
    <div class="intro-box">
      <p>మీ వద్ద మీ విలువైన ఇంటి స్థలానికి సంబంధించిన ఒరిజినల్ రిజిస్ట్రేషన్ డాక్యుమెంట్ ఉందనుకోండి. మీ స్నేహితుడు ఆ డాక్యుమెంట్‌లోని కొలతలను పరిశీలించాలనుకుంటున్నారు. మీరు ఏం చేస్తారు? ఒరిజినల్ పత్రాన్ని చేతిలో పెట్టకుండా, దానిని ఒక <strong>జిరాక్స్ మిషన్ లో పెట్టి ఫోటోకాపీ (Photocopy)</strong> తీసి ఇస్తారు. ఇప్పుడు మీ స్నేహితుడు ఆ జిరాక్స్ కాగితంపై పెన్నుతో రాతలు రాసినా, సిరా ఒలికించినా, లేదా ఆ కాగితాన్ని కోపంతో చింపేసినా — మీ బీరువాలో భద్రంగా దాచిన ఒరిజినల్ డాక్యుమెంట్‌కు ఏదైనా నష్టం జరుగుతుందా? బొత్తిగా జరగదు! ఇది కంప్యూటర్ ప్రోగ్రామింగ్‌లోని <strong>Call by Value</strong> పద్ధతి.</p>
      <p>ఇప్పుడు రెండవ పరిస్థితిని ఊహించండి: మీ స్నేహితుడికి జిరాక్స్ కాపీ ఇచ్చే బదులు, మీ బ్యాంక్ లాకర్ ఉన్న చిరునామా మరియు లాకర్ తాళం చెవి ఇచ్చారనుకుందాం (<strong>Address / Reference / Pointer</strong>). అతను నేరుగా ఆ చిరునామాకు వెళ్లి, లాకర్ తెరిచి, లోపల ఉన్న ఒరిజినల్ పత్రంపై సంతకం చేస్తే — మీ అసలైన డాక్యుమెంట్ మారిపోతుంది కదా! ఇది C లోని <strong>Call by Reference (పాయింటర్ల ద్వారా పాస్ చేయడం)</strong> పద్ధతి!</p>
      <p>ఈ పదవ అధ్యాయంలో, ప్రపంచవ్యాప్తంగా ప్రతీ C ఇంటర్వ్యూలో అడిగే <code>swap()</code> ఫంక్షన్ వైఫల్యం, <code>&amp;</code> (అడ్రస్-ఆఫ్) మరియు <code>*</code> (డిరిఫరెన్స్) ఆపరేటర్ల అంతర్గత మ్యాజిక్, ఒకే ఫంక్షన్ నుండి <strong>బహుళ విలువలను రిటర్న్ (Multiple Return Values)</strong> చేసే ప్రొఫెషనల్ టెక్నిక్స్, మరియు సురక్షితమైన <strong>మల్టీ-అకౌంట్ బ్యాంకింగ్ ఫండ్ ట్రాన్స్‌ఫర్ ప్రాజెక్ట్‌ను</strong> లోతుగా నిర్మిద్దాం!</p>
    </div>

    <!-- SECTION 1 -->
    <div class="section-title"><span class="num">1</span>ఈ Chapter లో మీరు నేర్చుకునే అంశాలు (Roadmap)</div>
    <div class="section-body">
      <p>మెమరీ మేనేజ్‌మెంట్‌లో పాయింటర్లు మరియు పారామీటర్ పాసింగ్ అనేవి C ప్రోగ్రామింగ్‌కు కిరీటం లాంటివి. ఈ అధ్యాయంలో కవర్ చేయబడే కీలక అంశాలు:</p>
      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.7;">
        <li><strong>C లో డీఫాల్ట్ కాల్ పద్ధతి:</strong> C భాషలో ప్రతి ఫంక్షన్ కాల్ స్వాభావికంగా కేవలం <em>Call by Value</em> మాత్రమే ఎందుకుంటుంది?</li>
        <li><strong>ది క్లాసిక్ స్వాప్ ఫెయిల్యూర్ (The Classic Swap Bug):</strong> విలువలను మార్చడానికి రాసిన సాధారణ ఫంక్షన్ ఎందుకు విఫలమవుతుంది?</li>
        <li><strong>స్టాక్ ఫ్రేమ్ మెమరీ ఐసొలేషన్:</strong> <code>main()</code> యొక్క మెమరీని వేరే ఫంక్షన్ నేరుగా తాకలేకపోవడానికి కారణం.</li>
        <li><strong>పాయింటర్ల ప్రాథమిక అవసరం:</strong> మెమరీ చిరునామాను సంగ్రహించే <code>&amp;</code> మరియు ఆ చిరునామాలోని విలువను చదివే/మార్చే <code>*</code> ఆపరేటర్లు.</li>
        <li><strong>C లో Call by Reference అనుకరణ (Pass by Pointer):</strong> <code>swap(&amp;x, &amp;y)</code> అసెంబ్లీ లెవల్ పనితీరు.</li>
        <li><strong>సమగ్ర తులనాత్మక పట్టిక:</strong> Call by Value vs Call by Reference పక్కపక్కనే విశ్లేషణ.</li>
        <li><strong>మల్టిపుల్ రిటర్న్ వాల్యూస్ (Multiple Return Values):</strong> C లో ఒకే ఫంక్షన్ నుండి ఏకకాలంలో రెండు లేదా మూడు ఫలితాలను ఎలా పొందాలి?</li>
        <li><strong>లార్జ్ డేటా స్ట్రక్చర్స్ &amp; పెర్ఫార్మెన్స్ బూస్ట్:</strong> మెగాబైట్ల డేటాను కాపీ చేయకుండా కేవలం 8-బైట్ల పాయింటర్‌తో నానోసెకన్లలో పాస్ చేయడం.</li>
        <li><strong>const పాయింటర్ సేఫ్టీ (Read-Only Parameters):</strong> రెఫరెన్స్ పాస్ చేసినప్పుడు పొరపాటున డేటా మారకుండా లాక్ చేయడం.</li>
        <li><strong>NULL పాయింటర్ చెకింగ్ &amp; సెగ్మెంటేషన్ ఫాల్ట్ నివారణ:</strong> <code>SIGSEGV</code> క్రాష్‌లను అరికట్టే గార్డ్ క్లాజ్‌లు.</li>
        <li><strong>సమగ్ర రియల్ వరల్డ్ ప్రాజెక్ట్:</strong> బ్యాంకింగ్ మల్టీ-అకౌంట్ ఫండ్ ట్రాన్స్‌ఫర్ &amp; కరెన్సీ ఎక్స్ఛేంజ్ ఇంజిన్.</li>
        <li><strong>బిగినర్స్ చేసే టాప్ 5 పాయింటర్ తప్పులు:</strong> అన్‌ఇనిషియలైజ్డ్ పాయింటర్స్, ఆపరేటర్ ప్రిసిడెన్స్ కన్‌ఫ్యూజన్.</li>
        <li><strong>స్వీయ మూల్యాంకన క్విజ్:</strong> 5 లోతైన విశ్లేషణాత్మక ప్రశ్నలు &amp; గేట్/ఇంటర్వ్యూ కాన్సెప్ట్స్.</li>
      </ul>
    </div>

    <!-- SECTION 2 -->
    <div class="section-title"><span class="num">2</span>C లో డీఫాల్ట్ పద్ధతి — Call by Value అంతర్గత విశ్లేషణ</div>
    <div class="section-body">
      <p>C లాంగ్వేజ్‌లో కఠినమైన నియమం ఉంది: <strong>C లో సాంకేతికంగా కేవలం Call by Value మాత్రమే ఉంటుంది!</strong> మీరు ఒక వేరియబుల్‌ను ఫంక్షన్‌కు పంపినప్పుడు, ఆ వేరియబుల్ యొక్క ప్రస్తుత విలువ (Value) మాత్రమే కాపీ అయి ఫంక్షన్ పారామీటర్‌లోకి వెళ్తుంది.</p>

      <div style="background:var(--bg2); border:1px solid var(--border); border-radius:10px; padding:18px; margin:16px 0;">
        <h4 style="color:#059669; margin:0 0 8px; font-size:15px;">మెమరీ కాపీ ప్రక్రియ (Under the Hood):</h4>
        <p style="color:var(--text2); font-size:14px; line-height:1.7; margin:0;">
          మీరు <code>modifyValue(x)</code> అని పిలిచినప్పుడు, <code>main()</code> ఫంక్షన్ స్టాక్ ఫ్రేమ్‌లో ఉన్న <code>x</code> యొక్క ఒరిజినల్ మెమరీ లొకేషన్ అలాగే సురక్షితంగా ఉంటుంది. CPU కాల్ స్టాక్ పై <code>modifyValue</code> కోసం ఒక కొత్త స్టాక్ ఫ్రేమ్ ఏర్పడుతుంది. అందులోని పారామీటర్ <code>x</code> కి ఒక సరికొత్త మెమరీ అడ్రస్ కేటాయించబడి, అందులోకి ఒరిజినల్ విలువ నకలు (Duplicate Copy) చేయబడుతుంది.
        </p>
      </div>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Call by Value Demo (Original Remains Unchanged)</span>
          <div class="code-actions">
            <a class="try-btn" href="/online-c-compiler.html" target="_blank">▶ Run in Online C Compiler</a>
          </div>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

void modifyValue(int n) {
    printf("  [ఫంక్షన్ లోపల - ప్రారంభం] n = %d, మెమరీ అడ్రస్ = %p\\n", n, (void*)&amp;n);
    n = n + 100; // కేవలం లోకల్ కాపీ మాత్రమే పెరుగుతుంది!
    printf("  [ఫంక్షన్ లోపల - ముగింపు]   n = %d, మెమరీ అడ్రస్ = %p\\n", n, (void*)&amp;n);
}

int main() {
    int score = 50;
    printf("[main లోపల - కాల్ చేయడానికి ముందు] score = %d, మెమరీ అడ్రస్ = %p\\n", score, (void*)&amp;score);

    modifyValue(score); // Call by Value!

    printf("[main లోపల - కాల్ చేసిన తర్వాత]    score = %d, మెమరీ అడ్రస్ = %p\\n", score, (void*)&amp;score);
    return 0;
}</code></pre>
      </div>

      <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px 18px; margin-top:14px; font-size:14px; color:var(--text2);">
        <strong>అవుట్‌పుట్ పరిశీలన:</strong><br>
        <code>main()</code> లోని <code>score</code> వేరియబుల్ మెమరీ అడ్రస్ మరియు ఫంక్షన్ లోని <code>n</code> వేరియబుల్ మెమరీ అడ్రస్ <strong>పూర్తిగా వేర్వేరుగా ఉంటాయి!</strong> అందుకే ఫంక్షన్ లోపల <code>n</code> విలువను 150 చేసినప్పటికీ, <code>main()</code> లోని <code>score</code> అలాగే 50 గానే ఉండిపోయింది!
      </div>
    </div>

    <!-- SECTION 3 -->
    <div class="section-title"><span class="num">3</span>ది క్లాసిక్ స్వాప్ ఫెయిల్యూర్ (The Classic Swap Bug)</div>
    <div class="section-body">
      <p>ప్రపంచవ్యాప్తంగా ప్రతి ప్రోగ్రామింగ్ విద్యార్థి తమ కెరీర్ ప్రారంభంలో ఎదుర్కొనే అత్యంత ప్రసిద్ధమైన బగ్: <strong>రెండు సంఖ్యలను మార్చడానికి (Swap) సాధారణ ఫంక్షన్ రాసి విఫలమవ్వడం!</strong></p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — The Failed Swap Function (Buggy Call by Value)</span>
          <div class="code-actions">
            <a class="try-btn" href="/online-c-compiler.html" target="_blank">▶ Run in Online C Compiler</a>
          </div>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

// ❌ పనిచేయని బగ్గీ స్వాప్ ఫంక్షన్
void wrongSwap(int a, int b) {
    int temp = a;
    a = b;
    b = temp;
    printf("  [wrongSwap లోపల] a = %d, b = %d (ఇక్కడ మారాయి!)\\n", a, b);
}

int main() {
    int x = 10, y = 20;

    printf("స్వాప్ చేయడానికి ముందు: x = %d, y = %d\\n", x, y);
    wrongSwap(x, y); // ❌ ఫెయిల్ అవుతుంది!
    printf("స్వాప్ చేసిన తర్వాత:    x = %d, y = %d (మారలేదు!)\\n", x, y);

    return 0;
}</code></pre>
      </div>

      <div style="background:#fef2f2; border:1px solid #fecaca; border-radius:8px; padding:14px; margin:16px 0; color:#991b1b; font-size:13.5px;">
        🔍 <strong>పోస్ట్‌మార్టం విశ్లేషణ:</strong> <code>wrongSwap()</code> ఫంక్షన్ లోపల ఉన్న <code>a</code> మరియు <code>b</code> లు కేవలం నకలు కాపీలు మాత్రమే. ఆ ఫంక్షన్ లోపల వాటి విలువలు మారాయి నిజమే! కానీ ఆ ఫంక్షన్ ఎగ్జిక్యూషన్ ముగియగానే దాని స్టాక్ ఫ్రేమ్ మెమరీ నుండి నాశనమైపోయింది (Popped from stack). <code>main()</code> లోని అసలైన <code>x</code> మరియు <code>y</code> వేరియబుల్స్ అలాగే చెక్కుచెదరకుండా ఉండిపోయాయి!
      </div>
    </div>

    <!-- SECTION 4 -->
    <div class="section-title"><span class="num">4</span>పాయింటర్ల ప్రాథమిక అవసరం — &amp; మరియు * ఆపరేటర్లు</div>
    <div class="section-body">
      <p>పై సమస్యను పరిష్కరించాలంటే, మనం విలువల కాపీలను పంపకూడదు. అసలైన వేరియబుల్స్ ఉన్న <strong>మెమరీ అడ్రస్‌లను (Memory Addresses)</strong> ఫంక్షన్‌కు పంపాలి. దీనికోసం C లో రెండు మేజికల్ ఆపరేటర్లు ఉన్నాయి:</p>

      <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin:16px 0;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px;">
          <h4 style="color:#059669; margin:0 0 8px; font-size:15px;">1. &amp; ఆపరేటర్ (Address-Of Operator)</h4>
          <p style="color:var(--text2); font-size:13.5px; line-height:1.6; margin:0;">
            ఒక వేరియబుల్ RAM లో ఏ మెమరీ గదిలో (Hexadecimal Address) దాగి ఉందో ఆ చిరునామాను అందిస్తుంది.<br>
            ఉదాహరణ: <code>&amp;x</code> ➔ <code>0x7ffee1b2c458</code>
          </p>
        </div>
        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px;">
          <h4 style="color:#059669; margin:0 0 8px; font-size:15px;">2. * ఆపరేటర్ (Dereference Operator)</h4>
          <p style="color:var(--text2); font-size:13.5px; line-height:1.6; margin:0;">
            ఒక పాయింటర్ పట్టుకున్న మెమరీ అడ్రస్ లోపలికి నేరుగా వెళ్లి, అక్కడ ఉన్న అసలైన విలువను చదవడానికి లేదా మార్చడానికి ఉపయోగిస్తారు.<br>
            ఉదాహరణ: <code>*ptr = 99;</code>
          </p>
        </div>
      </div>

      <div style="background:var(--bg3); border-left:4px solid #10b981; padding:14px 18px; border-radius:0 8px 8px 0; margin-top:14px; font-size:14px; color:var(--text2);">
        <strong>💡 పాయింటర్ అంటే ఏమిటి?</strong> పాయింటర్ అనేది ఒక సాధారణ వేరియబుల్ లాంటిదే. కాకపోతే ఇది సంఖ్యలను నిల్వ చేయదు; మరొక వేరియబుల్ యొక్క <strong>మెమరీ చిరునామాను (Memory Address)</strong> తనలో భద్రపరుచుకుంటుంది!
      </div>
    </div>

    <!-- SECTION 5 -->
    <div class="section-title"><span class="num">5</span>C లో Call by Reference సాధించే విధానం (Pass by Pointer)</div>
    <div class="section-body">
      <p>ఇప్పుడు మనం పాయింటర్లను ఉపయోగించి నిజమైన <strong>Call by Reference (Pass by Address)</strong> ను నిర్మిద్దాం. ఇక్కడ ఫంక్షన్ కాల్ చేసేటప్పుడు వేరియబుల్స్ ముందు <code>&amp;</code> ఉంచి వాటి అడ్రస్‌లను పంపుతాం. ఫంక్షన్ హెడర్‌లో వాటిని అందుకోవడానికి <code>*</code> పాయింటర్లను పెడతాం:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — True Swapping using Pointers (Call by Reference)</span>
          <div class="code-actions">
            <a class="try-btn" href="/online-c-compiler.html" target="_blank">▶ Run in Online C Compiler</a>
          </div>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

// ✅ విజయవంతంగా పనిచేసే సరైన స్వాప్ ఫంక్షన్
void trueSwap(int *ptrA, int *ptrB) {
    // 1. ptrA ఉన్న చిరునామాలోని విలువను తాత్కాలికంగా దాచు
    int temp = *ptrA;

    // 2. ptrB ఉన్న చిరునామాలోని విలువను ptrA చిరునామాలోకి కాపీ చేయి
    *ptrA = *ptrB;

    // 3. temp లో ఉన్న విలువను ptrB చిరునామాలోకి రాయి
    *ptrB = temp;

    printf("  [trueSwap లోపల] అడ్రస్ ఆధారంగా ఒరిజినల్ మెమరీ మార్చబడింది!\\n");
}

int main() {
    int x = 10, y = 20;

    printf("స్వాప్ చేయడానికి ముందు: x = %d, y = %d\\n", x, y);

    // వేరియబుల్స్ అడ్రస్‌లను (&x, &y) ఫంక్షన్‌కు పాస్ చేస్తున్నాం
    trueSwap(&amp;x, &amp;y);

    printf("స్వాప్ చేసిన తర్వాత:    x = %d, y = %d (విజయవంతంగా మారాయి!)\\n", x, y);
    return 0;
}</code></pre>
      </div>

      <div style="background:#f0fdf4; border:1px solid #bbf7d0; border-radius:8px; padding:14px; margin-top:14px; font-size:14px; color:#166534;">
        🎉 <strong>ఇది ఎందుకు పనిచేసింది?</strong> <code>trueSwap</code> ఫంక్షన్ తన స్వంత కొత్త వేరియబుల్స్‌ను మార్చలేదు. అది <code>main()</code> లోని <code>x</code> మరియు <code>y</code> ల యొక్క మెమరీ చిరునామాలను పట్టుకుని, <code>*</code> ఆపరేటర్ ద్వారా నేరుగా <code>main()</code> యొక్క గదుల్లోకి వెళ్లి అక్కడే విలువలను తారుమారు చేసింది! అందుకే ఫంక్షన్ ముగిసిన తర్వాత కూడా మార్పులు శాశ్వతంగా ఉండిపోయాయి!
      </div>
    </div>

    <!-- SECTION 6 -->
    <div class="section-title"><span class="num">6</span>సమగ్ర తులనాత్మక పట్టిక (Call by Value vs Reference)</div>
    <div class="section-body">
      <p>ఈ రెండు పద్ధతుల మధ్య గల సమగ్ర సాంకేతిక వ్యత్యాసాలను ఒకే పట్టికలో పరిశీలిద్దాం:</p>

      <table class="tbl">
        <thead>
          <tr>
            <th>అంశం / ఫీచర్</th>
            <th>Call by Value</th>
            <th>Call by Reference (Pass by Pointer)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>ఫంక్షన్‌కు ఏమి పాస్ చేస్తాం?</strong></td>
            <td>వేరియబుల్ విలువ యొక్క నకలు కాపీ (Copy of value).</td>
            <td>వేరియబుల్ యొక్క అసలైన మెమరీ అడ్రస్ (<code>&amp;variable</code>).</td>
          </tr>
          <tr>
            <td><strong>ఫార్మల్ పారామీటర్ల రకం</strong></td>
            <td>సాధారణ వేరియబుల్స్ (ఉదా: <code>int a</code>).</td>
            <td>పాయింటర్ వేరియబుల్స్ (ఉదా: <code>int *ptr</code>).</td>
          </tr>
          <tr>
            <td><strong>ఒరిజినల్ డేటా భద్రత</strong></td>
            <td>చాలా ఎక్కువ (ఫంక్షన్ ఒరిజినల్ విలువను మార్చలేదు).</td>
            <td>తక్కువ (ఫంక్షన్ ఒరిజినల్ డేటాను నేరుగా మార్చగలదు).</td>
          </tr>
          <tr>
            <td><strong>మెమరీ వినియోగం</strong></td>
            <td>పెద్ద డేటా ఉన్నప్పుడు ప్రతిసారీ కాపీ చేయడానికి ఎక్కువ మెమరీ ఖర్చవుతుంది.</td>
            <td>కేవలం 8 బైట్ల చిరునామా మాత్రమే వెళ్తుంది కాబట్టి మెమరీ ఆదా అవుతుంది.</td>
          </tr>
          <tr>
            <td><strong>స్వాపింగ్ లేదా సవరణలు</strong></td>
            <td>సాధ్యం కాదు (ఫంక్షన్ బయట ప్రభావం ఉండదు).</td>
            <td>ఖచ్చితంగా సాధ్యం (కాలర్ వేరియబుల్స్ నేరుగా మారతాయి).</td>
          </tr>
          <tr>
            <td><strong>ఉత్తమ వినియోగ సందర్భం</strong></td>
            <td>చిన్న డేటా టైప్స్ (int, char, float) గణనలకు.</td>
            <td>పెద్ద అర్రేలు, స్ట్రక్చర్స్ మరియు మల్టిపుల్ రిటర్న్స్ కోసం.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- SECTION 7 -->
    <div class="section-title"><span class="num">7</span>మల్టిపుల్ రిటర్న్ వాల్యూస్ (Multiple Return Values)</div>
    <div class="section-body">
      <p>C లాంగ్వేజ్‌లో ఒక ప్రాథమిక పరిమితి ఉంది: <strong>ఒక ఫంక్షన్ యొక్క <code>return</code> స్టేట్‌మెంట్ ద్వారా కేవలం ఒకే ఒక్క విలువను మాత్రమే వెనక్కి పంపగలం!</strong></p>
      
      <p>కానీ నిజ జీవితంలో ఒక గణిత ఫంక్షన్ నుండి భాగహారంలో భాగఫలం (Quotient) మరియు శేషం (Remainder) రెండూ ఒకేసారి కావాల్సి వస్తే ఎలా? పాయింటర్ల ద్వారా Call by Reference వాడి మనం ఎన్ని విలువలనైనా ఒకేసారి రిటర్న్ చేయవచ్చు!</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Returning Multiple Values using Pointers</span>
          <div class="code-actions">
            <a class="try-btn" href="/online-c-compiler.html" target="_blank">▶ Run in Online C Compiler</a>
          </div>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

// ఒకే ఫంక్షన్ నుండి Quotient మరియు Remainder రెండింటినీ రిటర్న్ చేద్దాం
int divide(int dividend, int divisor, int *quotient, int *remainder) {
    if (divisor == 0) {
        return 0; // సున్నా చేత భాగహారం నిషిద్ధం (విఫలం)
    }

    *quotient = dividend / divisor;  // మొదటి ఫలితం
    *remainder = dividend % divisor; // రెండవ ఫలితం
    return 1; // విజయం (Success flag)
}

int main() {
    int a = 29, b = 6;
    int q, r;

    printf("29 ని 6 చేత భాగిస్తున్నాం...\\n");
    if (divide(a, b, &amp;q, &amp;r)) {
        printf("✅ భాగహారం సక్సెస్!\\n");
        printf("   భాగఫలం (Quotient) = %d\\n", q);
        printf("   శేషం (Remainder)  = %d\\n", r);
    } else {
        printf("❌ ఎర్రర్: సున్నాతో భాగించలేము!\\n");
    }

    return 0;
}</code></pre>
      </div>
    </div>

    <!-- SECTION 8 -->
    <div class="section-title"><span class="num">8</span>లార్జ్ డేటా స్ట్రక్చర్స్ &amp; పెర్ఫార్మెన్స్ బూస్ట్</div>
    <div class="section-body">
      <p>భవిష్యత్తులో మనం స్ట్రక్చర్స్ (Structures) మరియు అర్రేల గురించి నేర్చుకోబోతున్నాం. ఒక ఉద్యోగి రికార్డులో 50 రకాల వివరాలు (పేరు, ఆధార్, వేతనం, అడ్రస్...) ఉండవచ్చు. ఆ స్ట్రక్చర్ సైజు సుమారు 2,048 బైట్లు (2 KB) అనుకుందాం.</p>

      <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin:16px 0;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px;">
          <strong style="color:#ef4444;">Call by Value (నెమ్మదైనది):</strong>
          <p style="font-size:13px; color:var(--text2); margin-top:6px; line-height:1.6;">
            ఫంక్షన్ పిలిచిన ప్రతిసారీ మొత్తం 2,048 బైట్ల డేటాను స్టాక్ పైకి కొత్తగా కాపీ చేయాలి. లూప్‌లో వేలసార్లు రన్ అయితే మెమరీ మరియు సమయం విపరీతంగా వృధా అవుతాయి.
          </p>
        </div>
        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px;">
          <strong style="color:#10b981;">Call by Reference (మెరుపు వేగం):</strong>
          <p style="font-size:13px; color:var(--text2); margin-top:6px; line-height:1.6;">
            డేటా ఎంత పెద్దదైనా సరే, కేవలం దాని మెమరీ అడ్రస్ మాత్రమే ఫంక్షన్‌కు వెళ్తుంది. 64-బిట్ CPU లో ఒక పాయింటర్ సైజ్ కేవలం <strong>8 బైట్లు మాత్రమే!</strong> పర్ఫార్మెన్స్ 100 రెట్లు పెరుగుతుంది!
          </p>
        </div>
      </div>
    </div>

    <!-- SECTION 9 -->
    <div class="section-title"><span class="num">9</span>const పాయింటర్ పారామీటర్స్ — Read-Only భద్రత</div>
    <div class="section-body">
      <p>కాల్ బై రిఫరెన్స్‌లో ఒక పెద్ద రిస్క్ ఉంది: పాయింటర్ చేతికి ఇస్తున్నాం కాబట్టి, ఫంక్షన్ లోపల పొరపాటున ఆ డేటా మారిపోయే ప్రమాదం ఉంది. డేటాను వేగంగా పాస్ చేయాలి, కానీ లోపల ఎవరూ దాన్ని మార్చకూడదు అనుకుంటే C లో <strong><code>const</code></strong> క్వాలిఫైయర్ ఉపయోగిస్తారు!</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Read-Only Pointer Safety with const</span>
          <div class="code-actions">
            <a class="try-btn" href="/online-c-compiler.html" target="_blank">▶ Run in Online C Compiler</a>
          </div>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

// const int *data అంటే: ఈ పాయింటర్ ద్వారా డేటాను చదవవచ్చే కానీ మార్చకూడదు!
void printConfiguration(const int *configValue) {
    printf("సిస్టమ్ కాన్ఫిగరేషన్ విలువ: %d\\n", *configValue);

    // ఒకవేళ డెవలపర్ పొరపాటున ఇలా రాయడానికి ప్రయత్నిస్తే:
    // *configValue = 999;
    // కంపైలర్ వెంటనే: 'assignment of read-only location' అని ఎర్రర్ ఇచ్చి ఆపేస్తుంది!
}

int main() {
    int secretKey = 7788;
    printConfiguration(&amp;secretKey);
    return 0;
}</code></pre>
      </div>
    </div>

    <!-- SECTION 10 -->
    <div class="section-title"><span class="num">10</span>NULL పాయింటర్ చెకింగ్ &amp; సెగ్మెంటేషన్ ఫాల్ట్ (SIGSEGV) నివారణ</div>
    <div class="section-body">
      <p>పాయింటర్లను ఫంక్షన్లలో వాడేటప్పుడు సీనియర్ ఇంజనీర్లు పాటించే మొట్టమొదటి భద్రతా సూత్రం: <strong>డిఫెన్సివ్ ప్రోగ్రామింగ్ (Defensive Programming)</strong>. ఎవరైనా పొరపాటున శూన్య చిరునామాను (NULL pointer) ఫంక్షన్‌కు పాస్ చేస్తే, దానిని డిరిఫరెన్స్ చేయబోతే ఆపరేటింగ్ సిస్టమ్ ప్రోగ్రామ్‌ను వెంటనే క్రాష్ చేస్తుంది (Segmentation Fault)!</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Defensive Programming with NULL Check</span>
          <div class="code-actions">
            <a class="try-btn" href="/online-c-compiler.html" target="_blank">▶ Run in Online C Compiler</a>
          </div>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int safelyIncrement(int *ptr) {
    // 🛡️ గార్డ్ క్లాజ్: పాయింటర్ NULL కాదా అని తనిఖీ చేయి!
    if (ptr == NULL) {
        printf("🚨 హెచ్చరిక: అక్రమ శూన్య పాయింటర్ (NULL Pointer) గుర్తించబడింది! సెగ్‌ఫాల్ట్ నివారించబడింది.\\n");
        return -1; // విఫలమైనట్లు సంకేతం
    }

    (*ptr)++; // సురక్షితమైన ఇంక్రిమెంట్
    return 0; // విజయం
}

int main() {
    int counter = 10;
    int *validPtr = &amp;counter;
    int *nullPtr = NULL; // ఎక్కడికీ పాయింట్ చేయని పాయింటర్

    safelyIncrement(validPtr);
    printf("చెల్లుబాటు అయ్యే పాయింటర్ ఇంక్రిమెంట్ అయింది: %d\\n", counter);

    safelyIncrement(nullPtr); // ప్రోగ్రామ్ క్రాష్ అవ్వకుండా సురక్షితంగా రక్షించబడుతుంది!
    return 0;
}</code></pre>
      </div>
    </div>

    <!-- SECTION 11 -->
    <div class="section-title"><span class="num">11</span>సమగ్ర రియల్ వరల్డ్ ప్రాజెక్ట్ — బ్యాంకింగ్ మల్టీ-అకౌంట్ ఫండ్ ట్రాన్స్‌ఫర్</div>
    <div class="section-body">
      <p>ఇప్పటివరకు నేర్చుకున్న Call by Reference, మల్టిపుల్ పాయింటర్స్, మరియు ఎర్రర్ హ్యాండ్లింగ్‌ను కలిపి ఒక నిజమైన <strong>బ్యాంకింగ్ ఫండ్ ట్రాన్స్‌ఫర్ ఇంజిన్‌ను (Bank Fund Transfer System)</strong> నిర్మిద్దాం. ఒక ఖాతా నుండి మరొక ఖాతాకు నగదు బదిలీ జరగాలంటే రెండు ఖాతాల బ్యాలెన్స్‌లు ఒకే ట్రాన్సాక్షన్‌లో సరిగ్గా మారాలి:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Multi-Account Bank Fund Transfer Engine</span>
          <div class="code-actions">
            <a class="try-btn" href="/online-c-compiler.html" target="_blank">▶ Run in Online C Compiler</a>
          </div>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

// బ్యాంక్ ఫండ్ ట్రాన్స్‌ఫర్ ఫంక్షన్ (Call by Reference)
int transferFunds(double *fromAccount, double *toAccount, double amount) {
    // 1. సేఫ్టీ చెక్: పాయింటర్లు చెల్లుబాటు అయ్యేవేనా?
    if (fromAccount == NULL || toAccount == NULL) {
        printf("❌ ట్రాన్సాక్షన్ విఫలమైంది: ఖాతా పాయింటర్లు చెల్లవు!\\n");
        return 0;
    }

    // 2. అమౌంట్ చెక్: బదిలీ మొత్తం పాజిటివ్‌గా ఉండాలి
    if (amount &lt;= 0) {
        printf("❌ ట్రాన్సాక్షన్ విఫలమైంది: బదిలీ మొత్తం సున్నా లేదా నెగెటివ్ ఉండకూడదు!\\n");
        return 0;
    }

    // 3. సరిపడా నిధులు ఉన్నాయా? (Insufficient Funds Check)
    if (*fromAccount &lt; amount) {
        printf("❌ ట్రాన్సాక్షన్ విఫలమైంది: ఖాతాలో సరిపడా బ్యాలెన్స్ లేదు! (లభ్యత: రూ. %.2f)\\n", *fromAccount);
        return 0;
    }

    // 4. అసలైన మెమరీ లొకేషన్లలో బ్యాలెన్స్‌లను అప్‌డేట్ చేయి
    *fromAccount -= amount; // పంపే వారి ఖాతా నుండి మినహాయింపు
    *toAccount += amount;   // అందుకునే వారి ఖాతాకు జమ

    printf("✅ ట్రాన్సాక్షన్ విజయవంతమైంది: రూ. %.2f బదిలీ చేయబడింది!\\n", amount);
    return 1;
}

int main() {
    double rahulBalance = 25000.00; // రాహుల్ ఖాతా
    double snehaBalance = 8500.00;  // స్నేహ ఖాతా

    printf("==================================================\\n");
    printf("   మనా బ్యాంకింగ్ కోర్ సిస్టమ్ (Fund Transfer Engine)\\n");
    printf("==================================================\\n");
    printf("బదిలీకి ముందు:\\n");
    printf("  రాహుల్ బ్యాలెన్స్: రూ. %.2f\\n", rahulBalance);
    printf("  స్నేహ బ్యాలెన్స్ : రూ. %.2f\\n", snehaBalance);
    printf("--------------------------------------------------\\n");

    // రాహుల్ ఖాతా నుండి స్నేహ ఖాతాకు రూ. 7,000 బదిలీ చేద్దాం
    printf("-> రాహుల్ నుండి స్నేహకు రూ. 7,000 బదిలీ చేస్తున్నాం...\\n");
    transferFunds(&amp;rahulBalance, &amp;snehaBalance, 7000.00);

    printf("--------------------------------------------------\\n");
    printf("బదిలీ తర్వాత:\\n");
    printf("  రాహుల్ బ్యాలెన్స్: రూ. %.2f\\n", rahulBalance);
    printf("  స్నేహ బ్యాలెన్స్ : రూ. %.2f\\n", snehaBalance);
    printf("==================================================\\n");

    return 0;
}</code></pre>
      </div>
    </div>

    <!-- SECTION 12 -->
    <div class="section-title"><span class="num">12</span>సాధారణంగా బిగినర్స్ చేసే టాప్ 5 పాయింటర్ తప్పులు</div>
    <div class="section-body">
      <div style="display:grid; grid-template-columns:1fr; gap:12px; margin:14px 0;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:12px 16px;">
          <strong style="color:#ef4444;">1. కాల్ చేసేటప్పుడు &amp; ఆపరేటర్ మర్చిపోవడం:</strong><br>
          <span style="color:var(--text2); font-size:13.5px;"><code>swap(a, b)</code> అని రాస్తే సాధారణ విలువ వెళ్తుంది. పాయింటర్ పారామీటర్‌కు అడ్రస్ పాస్ చేయడానికి కచ్చితంగా <code>swap(&amp;a, &amp;b)</code> అని రాయాలి.</span>
        </div>
        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:12px 16px;">
          <strong style="color:#ef4444;">2. ఫంక్షన్ లోపల * లేకుండా విలువను మార్చడం:</strong><br>
          <span style="color:var(--text2); font-size:13.5px;"><code>ptr = 50;</code> అని రాస్తే పాయింటర్ పట్టుకున్న చిరునామానే మారిపోతుంది! లోపల ఉన్న విలువను మార్చడానికి <code>*ptr = 50;</code> అని రాయాలి.</span>
        </div>
        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:12px 16px;">
          <strong style="color:#ef4444;">3. అన్‌ఇనిషియలైజ్డ్ పాయింటర్స్ (Wild Pointers):</strong><br>
          <span style="color:var(--text2); font-size:13.5px;">ఎటువంటి వేరియబుల్ అడ్రస్ ఇవ్వకుండా ఖాళీ పాయింటర్‌ను డిరిఫరెన్స్ చేస్తే ఆపరేటింగ్ సిస్టమ్ మెమరీ క్రాష్ అవుతుంది.</span>
        </div>
        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:12px 16px;">
          <strong style="color:#ef4444;">4. ఆపరేటర్ ప్రిసిడెన్స్ కన్‌ఫ్యూజన్:</strong><br>
          <span style="color:var(--text2); font-size:13.5px;">పాయింటర్ విలువను పెంచడానికి <code>(*ptr)++</code> అని బ్రాకెట్స్ వాడాలి. <code>*ptr++</code> అని రాస్తే పాయింటర్ అడ్రస్ పెరిగిపోతుంది!</span>
        </div>
        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:12px 16px;">
          <strong style="color:#ef4444;">5. లోకల్ వేరియబుల్స్ అడ్రస్‌లను రిటర్న్ చేయడం:</strong><br>
          <span style="color:var(--text2); font-size:13.5px;">ఫంక్షన్ ముగియగానే లోకల్ మెమరీ నాశనమవుతుంది కాబట్టి లోకల్ వేరియబుల్ పాయింటర్‌ను బయటకు రిటర్న్ చేయకూడదు.</span>
        </div>
      </div>
    </div>

    <!-- SECTION 13 -->
    <div class="section-title"><span class="num">13</span>స్వీయ మూల్యాంకన క్విజ్ &amp; మీరే స్వయంగా Try చేయండి!</div>
    <div class="section-body">
      <p>ఈ పాఠంలోని లోతైన అంశాలను క్రింది 5 ప్రాక్టికల్ ప్రశ్నల ద్వారా పరీక్షించుకోండి:</p>

      <!-- QUIZ QUESTIONS -->
      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:700; cursor:pointer; color:#059669;">
          ❓ ప్రశ్న 1: C లో Call by Reference ను సాంకేతికంగా ఎలా అమలు చేస్తారు?
        </summary>
        <div style="margin-top:10px; color:var(--text2); font-size:14px; line-height:1.6;">
          <strong>సమాధానం:</strong> C లో స్వచ్ఛమైన రిఫరెన్స్ వేరియబుల్స్ (C++ లోలాగా) ఉండవు. వేరియబుల్స్ యొక్క మెమరీ అడ్రస్‌లను (<code>&amp;var</code>) పాయింటర్ల ద్వారా పాస్ చేయడం ద్వారా (Pass by Address / Pointer) Call by Reference ను అమలు చేస్తారు.
        </div>
      </details>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:700; cursor:pointer; color:#059669;">
          ❓ ప్రశ్న 2: swap(int a, int b) ఫంక్షన్ ఒరిజినల్ వేరియబుల్స్‌ను ఎందుకు మార్చలేదు?
        </summary>
        <div style="margin-top:10px; color:var(--text2); font-size:14px; line-height:1.6;">
          <strong>సమాధానం:</strong> ఇది Call by Value కాబట్టి కేవలం విలువల కాపీలు మాత్రమే ఫంక్షన్ లోపలికి వెళ్తాయి. ఫంక్షన్ స్టాక్ ఫ్రేమ్ ముగియగానే ఆ లోకల్ కాపీలు తొలగించబడతాయి, <code>main()</code> లోని ఒరిజినల్ వేరియబుల్స్ మారవు.
        </div>
      </details>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:700; cursor:pointer; color:#059669;">
          ❓ ప్రశ్న 3: ఒక ఫంక్షన్ పారామీటర్‌ను 'const int *ptr' అని డిక్లేర్ చేస్తే ఏం జరుగుతుంది?
        </summary>
        <div style="margin-top:10px; color:var(--text2); font-size:14px; line-height:1.6;">
          <strong>సమాధానం:</strong> ఆ ఫంక్షన్ కేవలం ఆ మెమరీ అడ్రస్ లోని విలువను చదవగలదు (Read-Only) తప్ప పొరపాటున కూడా మార్చలేదు. ఒకవేళ మార్చడానికి ప్రయత్నిస్తే కంపైలర్ ఎర్రర్ ఇస్తుంది.
        </div>
      </details>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:700; cursor:pointer; color:#059669;">
          ❓ ప్రశ్న 4: C ఫంక్షన్ నుండి ఒకే సమయంలో రెండు లేదా ఎక్కువ విలువలను ఎలా రిటర్న్ చేయవచ్చు?
        </summary>
        <div style="margin-top:10px; color:var(--text2); font-size:14px; line-height:1.6;">
          <strong>సమాధానం:</strong> పాయింటర్ పారామీటర్లను (Output Parameters) పంపడం ద్వారా, ఫంక్షన్ లోపల <code>*ptr1 = val1; *ptr2 = val2;</code> అని అసలైన వేరియబుల్స్‌లోకి నేరుగా రాతలు రాయడం ద్వారా మల్టిపుల్ రిటర్న్స్ సాధించవచ్చు.
        </div>
      </details>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:700; cursor:pointer; color:#059669;">
          ❓ ప్రశ్న 5: NULL పాయింటర్‌ను డిరిఫరెన్స్ చేయడానికి (*ptr) ప్రయత్నిస్తే ఏం జరుగుతుంది?
        </summary>
        <div style="margin-top:10px; color:var(--text2); font-size:14px; line-height:1.6;">
          <strong>సమాధానం:</strong> ఆపరేటింగ్ సిస్టమ్ <strong>Segmentation Fault (SIGSEGV)</strong> సిగ్నల్ ఇచ్చి ప్రోగ్రామ్‌ను వెంటనే క్రాష్ చేస్తుంది. అందుకే పాయింటర్‌ను వాడే ముందు <code>if (ptr != NULL)</code> చెక్ చేయాలి.
        </div>
      </details>

      <!-- TRY BOX -->
      <div class="try-box" style="margin-top:24px;">
        <div class="try-title">🚀 బ్యాంకింగ్ ఫండ్ ట్రాన్స్‌ఫర్ ఇంజిన్‌ను మన ఆన్‌లైన్ C కంపైలర్‌లో రన్ చేయండి!</div>
        <p>పైన వివరించిన <code>బ్యాంకింగ్ ఫండ్ ట్రాన్స్‌ఫర్</code> మరియు <code>పాయింటర్ స్వాపింగ్</code> ప్రోగ్రామ్‌లను మన ఆన్‌లైన్ C కంపైలర్‌లో ఓపెన్ చేసి స్వయంగా రన్ చేయండి. ఖాతా బ్యాలెన్స్‌లను మార్చి వివిధ లావాదేవీలను టెస్ట్ చేయండి!</p>
        <a class="run-btn" href="/online-c-compiler.html" target="_blank">
          👉 Our Compiler లో C Compiler try చేయండి
        </a>
      </div>

      <div style="margin-top:24px;">
        <h4 style="color:#059669; font-size:16px; margin-bottom:10px;">📌 అధ్యాయ సారాంశం (Quick Summary):</h4>
        <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.7;">
          <li><strong>Call by Value:</strong> విలువల నకలు కాపీని పంపుతుంది; కాలర్ వేరియబుల్స్ సురక్షితంగా ఉంటాయి.</li>
          <li><strong>Call by Reference:</strong> వేరియబుల్స్ యొక్క మెమరీ అడ్రస్‌ను (<code>&amp;</code>) పంపుతుంది; నేరుగా మార్పులు జరుగుతాయి.</li>
          <li><strong>పాయింటర్లు:</strong> మెమరీ చిరునామాలను పట్టుకునే ప్రత్యేక వేరియబుల్స్.</li>
          <li><strong>మల్టిపుల్ రిటర్న్స్:</strong> పాయింటర్ల ద్వారా ఒకే ఫంక్షన్ నుండి బహుళ ఫలితాలను పొందవచ్చు.</li>
          <li><strong>const భద్రత:</strong> పాయింటర్ ద్వారా డేటా మార్చబడకుండా రీడ్-ఓన్లీ రక్షణ కల్పిస్తుంది.</li>
        </ul>
      </div>

      <div style="margin-top:20px; padding:16px; background:var(--bg2); border-left:4px solid #10b981; border-radius:0 8px 8px 0;">
        <strong>తర్వాతి అధ్యాయంలో (Chapter 11):</strong> వేరియబుల్స్ ఎక్కడ పుడతాయి, ఎక్కడ చనిపోతాయి అనే <strong>వేరియబుల్ స్కోప్ (Scope), లైఫ్‌టైమ్ (Lifetime) మరియు స్టోరేజ్ క్లాసెస్ (auto, static, extern, register)</strong> గురించి అద్భుతంగా నేర్చుకుందాం!
      </div>
    </div>

    <!-- PREV / NEXT NAVIGATION -->
    <div style="display:flex; justify-content:space-between; align-items:center; margin-top:40px; padding-top:20px; border-top:1px solid var(--border); flex-wrap:wrap; gap:16px;">
      <a href="/blog-c/09-c-functions-and-prototypes.html" style="display:inline-flex; align-items:center; gap:8px; padding:10px 18px; border-radius:8px; background:var(--bg3); border:1px solid var(--border); color:var(--text); text-decoration:none; font-weight:700; font-size:13.5px;">
        ← Prev: 9. ఫంక్షన్స్ &amp; కాల్ స్టాక్
      </a>
      <a href="/blog-c/11-c-storage-classes-and-scope.html" style="display:inline-flex; align-items:center; gap:8px; padding:10px 20px; border-radius:8px; background:linear-gradient(135deg, #10b981, #059669); color:#ffffff; text-decoration:none; font-weight:700; font-size:13.5px; box-shadow:0 2px 10px rgba(16,185,129,0.2);">
        Next: 11. స్కోప్ &amp; స్టోరేజ్ క్లాసెస్ →
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
  <title>Call by Value vs Call by Reference — Modern C Tutorial | Our Compiler</title>
  <meta name="description" content="Call by Value vs Call by Reference సమగ్ర తెలుగు గైడ్: మెమరీ కాపీ vs పాయింటర్స్, swap(a,b) ఫెయిల్యూర్ పోస్ట్‌మార్టం, మల్టిపుల్ రిటర్న్స్, బ్యాంకింగ్ ఫండ్ ట్రాన్స్‌ఫర్." />
  <meta name="keywords" content="c call by value call by reference telugu, pass by pointer c, swap function c, c multiple return values, our compiler" />
  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />
  <link rel="icon" type="image/png" href="/logo.png" />
  <link rel="canonical" href="https://www.ourcompiler.com/blog-c/10-c-parameter-passing-call-by-value-reference.html" />
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
    "headline": "Call by Value vs Call by Reference (C Programming in Telugu)",
    "description": "మెమరీ కాపీ vs పాయింటర్స్, swap(a,b) ఫెయిల్యూర్ పోస్ట్‌మార్టం, మల్టిపుల్ రిటర్న్స్, బ్యాంకింగ్ ఫండ్ ట్రాన్స్‌ఫర్",
    "articleSection": "Phase 03: ఫంక్షన్స్, స్కోప్ & రికర్షన్",
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

const outputPath = path.join(__dirname, '..', 'public', 'blog-c', '10-c-parameter-passing-call-by-value-reference.html');
fs.writeFileSync(outputPath, fullHtml, 'utf8');

console.log('✅ Successfully generated deep high-value C Chapter 10!');
console.log('Target file size:', fullHtml.length, 'characters');
