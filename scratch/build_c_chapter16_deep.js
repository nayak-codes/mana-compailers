const fs = require('fs');
const path = require('path');
const { LESSONS, buildSidebar } = require('./c_curriculum_data.js');

const lesson = LESSONS.find(l => l.num === 16);
const sidebarHtml = buildSidebar(16);

const chapterContentHtml = `
    <!-- BREADCRUMB -->
    <div class="breadcrumb">
      <a href="/">Home</a><span class="sep">›</span>
      <a href="/blog.html">Tutorials</a><span class="sep">›</span>
      <a href="/blog-c.html">C Masterclass</a><span class="sep">›</span>
      <span class="current">Chapter 16: పాయింటర్లు, అర్రేస్ &amp; Double Pointers (**ptr)</span>
    </div>

    <!-- PAGE TITLE -->
    <h1 class="page-title">పాయింటర్లు, అర్రేస్, Double Pointers &amp; కాల్‌బ్యాక్స్</h1>

    <!-- PAGE META BADGES -->
    <div class="page-meta">
      <span class="badge">⚡ Modern C (C99 / C11 / C17 Standards)</span>
      <span class="badge">🟢 Chapter 16 of 20</span>
      <span class="badge">📂 Phase 04: అర్రేస్, స్ట్రింగ్స్ &amp; పాయింటర్లు</span>
      <span class="badge">📅 2026 Academic Edition</span>
    </div>

    <!-- SUBTOPICS PILL BAR -->
    <div style="background:var(--bg3); border:1px solid var(--border); border-radius:8px; padding:10px 16px; margin-bottom:24px; font-size:13px; color:var(--text2); display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
      <span style="color:#10b981; font-weight:700;">📌 Covered in this chapter:</span>
      <span>ట్రెజర్ హంట్ ఎనాలజీ · arr[i] == *(arr + i) సీక్రెట్ · i[arr] విచిత్రం · పాయింటర్ vs అర్రే తేడాలు · Array of Pointers · డబుల్ పాయింటర్లు (**ptr) · కమాండ్ లైన్ argc &amp; argv · ఫంక్షన్ పాయింటర్లు · qsort కాల్‌బ్యాక్స్ · ప్లగ్-అండ్-ప్లే ఇంజిన్ · ఇంటరాక్టివ్ క్విజ్</span>
    </div>

    <!-- INTRO ACCENT BOX (Warm Ivory with Green Accent) -->
    <div class="intro-box">
      <p>ఒక సాహసోపేతమైన నిధుల వేటను (Treasure Hunt) ఊహించుకోండి. మీరు అడవిలో మొదటి చెక్క పెట్టెను కనుగొని తెరిచారు. కానీ లోపల బంగారం ఉండదు; దానికి బదులుగా <em>"నిధి ఉన్న రెండవ పెట్టె ఏ చెట్టు కింద ఉందో తెలిపే మ్యాప్"</em> కనిపిస్తుంది (సింగిల్ పాయింటర్ <code>*ptr</code>). ఇప్పుడు ఆ మ్యాప్‌ను మీ చేతికి ఇచ్చిన గైడ్ బుక్ మీ వద్ద ఉందనుకుందాం — ఆ గైడ్ బుక్ నేరుగా నిధిని చూపించదు; అది మ్యాప్ ఉన్న పెట్టెను చూపిస్తుంది, ఆ మ్యాప్ అసలైన నిధిని చూపిస్తుంది! ఇది కంప్యూటర్ ప్రోగ్రామింగ్‌లోని <strong>డబుల్ పాయింటర్ (Pointer to Pointer - <code>**ptr</code>)</strong>!</p>
      <p>ఇంతటితో ఆగకుండా, C లాంగ్వేజ్‌లోని అత్యంత అద్భుతమైన అంతర్గత రహస్యం మరొకటి ఉంది: మనం నిత్యం వాడే <code>arr[i]</code> అనేది అసలు C కంపైలర్ దృష్టిలో అర్రేనే కాదు! అది కేవలం ఒక తీపి పైపూత (Syntactic Sugar) మాత్రమే! కంపైలర్ దానిని తెరవెనుక నేరుగా <strong><code>*(arr + i)</code> అనే పాయింటర్ అరిథ్‌మెటిక్‌గా</strong> మారుస్తుంది! అందుకే C లో <code>arr[2]</code> అని రాసినా లేదా <code>2[arr]</code> అని రాసినా కంపైలర్ ఏమాత్రం తడబడకుండా ఒకే ఫలితాన్ని ఇస్తుంది!</p>
      <p>ఈ పదహారవ అధ్యాయంతో మనం <strong>Phase 04 (అర్రేస్, స్ట్రింగ్స్ &amp; పాయింటర్లు)</strong> ను విజయవంతంగా ముగించబోతున్నాం. ఇందులో అర్రే-పాయింటర్ ఈక్వివలెన్స్, డబుల్ పాయింటర్లు, టెర్మినల్ కమాండ్ లైన్ ఆర్గుమెంట్స్ (<code>argc, argv</code>), మరియు ఫంక్షన్లను వేరియబుల్స్‌లా పాస్ చేసే అడ్వాన్స్‌డ్ <strong>ఫంక్షన్ పాయింటర్లు &amp; కాల్‌బ్యాక్స్ (Function Pointers &amp; Callbacks)</strong> ను సమగ్రంగా మాస్టర్ చేద్దాం!</p>
    </div>

    <!-- SECTION 1 -->
    <div class="section-title"><span class="num">1</span>ఈ Chapter లో మీరు నేర్చుకునే సమగ్ర అంశాలు (Roadmap)</div>
    <div class="section-body">
      <p>అడ్వాన్స్‌డ్ C ప్రోగ్రామింగ్‌లో పాయింటర్లు మరియు అర్రేల సమన్వయం అనేది సాఫ్ట్‌వేర్ ఆర్కిటెక్ట్‌లకు అత్యంత కీలకమైన ఆయుధం. ఈ అధ్యాయంలో కవర్ చేయబడే ప్రధానాంశాలు:</p>
      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.7;">
        <li><strong>అర్రే-పాయింటర్ అంతర్గత బంధం:</strong> <code>arr[i] == *(arr + i)</code> గణిత సమానత్వం మరియు <code>i[arr]</code> వింత ప్రవర్తన.</li>
        <li><strong>అర్రే వర్సెస్ పాయింటర్ కీలక తేడాలు:</strong> కాన్స్టాంట్ పాయింటర్ రీ-అసైన్‌మెంట్ పరిమితులు మరియు <code>sizeof</code> వ్యత్యాసాలు.</li>
        <li><strong>అర్రే ఆఫ్ పాయింటర్స్ (Array of Pointers - <code>int *arr[]</code>):</strong> పాయింటర్ల వరుస మరియు ర్యాగ్డ్ అర్రేస్ (Ragged Arrays).</li>
        <li><strong>డబుల్ పాయింటర్లు (Double Pointers - <code>**ptr</code>):</strong> పాయింటర్ యొక్క మెమరీ అడ్రస్‌ను పట్టుకునే లెవల్-2 ఇండైరెక్షన్.</li>
        <li><strong>ఫంక్షన్లలో పాయింటర్ మోడిఫికేషన్:</strong> ఫంక్షన్ లోపల కాలర్ యొక్క పాయింటర్‌ను మార్చడానికి డబుల్ పాయింటర్లు ఎందుకు తప్పనిసరి?</li>
        <li><strong>కమాండ్ లైన్ ఆర్గుమెంట్స్ (Command-Line Arguments):</strong> <code>argc</code> మరియు <code>argv</code> (అర్రే ఆఫ్ స్ట్రింగ్స్ <code>char**</code>) విశ్లేషణ.</li>
        <li><strong>సమగ్ర తులనాత్మక పట్టిక:</strong> <code>*arr[]</code> (అర్రే ఆఫ్ పాయింటర్స్) vs <code>(*arr)[]</code> (పాయింటర్ టు యాన్ అర్రే).</li>
        <li><strong>ఫంక్షన్ పాయింటర్లు (Function Pointers):</strong> కోడ్ సెగ్మెంట్‌లో ఫంక్షన్ల మెమరీ అడ్రస్‌లు మరియు సింటాక్స్ డీకోడింగ్.</li>
        <li><strong>కాల్‌బ్యాక్ ఫంక్షన్స్ (Callback Architecture):</strong> లైబ్రరీలకు ఫంక్షన్లను పాస్ చేయడం మరియు C స్టాండర్డ్ <code>qsort()</code> ఇంజిన్.</li>
        <li><strong>డైనమిక్ 2D అర్రేస్ పరిచయం:</strong> డబుల్ పాయింటర్లతో రన్‌టైమ్ గ్రిడ్ నిర్మాణం.</li>
        <li><strong>సమగ్ర రియల్ వరల్డ్ ప్రాజెక్ట్:</strong> ప్లగ్-అండ్-ప్లే ఫంక్షన్ పాయింటర్ మ్యాథమెటికల్ క్యాలిక్యులేటర్ ఇంజిన్.</li>
        <li><strong>బిగినర్స్ చేసే టాప్ 5 అడ్వాన్స్‌డ్ తప్పులు:</strong> బ్రాకెట్స్ మిస్సింగ్, డబుల్ పాయింటర్ అన్‌ఇనిషియలైజ్డ్ సెగ్‌ఫాల్ట్స్.</li>
        <li><strong>స్వీయ మూల్యాంకన క్విజ్:</strong> 5 లోతైన విశ్లేషణాత్మక ప్రశ్నలు &amp; గేట్ ఎగ్జామ్ కాన్సెప్ట్స్.</li>
      </ul>
    </div>

    <!-- SECTION 2 -->
    <div class="section-title"><span class="num">2</span>అర్రే-పాయింటర్ అంతర్గత బంధం — arr[i] == *(arr + i) సీక్రెట్</div>
    <div class="section-body">
      <p>C లాంగ్వేజ్‌లో ఒక ప్రాథమిక సూత్రం ఉంది: <strong>"An array name evaluates to the address of its first element."</strong> (అర్రే పేరు అనగా దాని మొదటి ఎలిమెంట్ యొక్క బేస్ అడ్రస్ <code>&amp;arr[0]</code>). మీరు స్క్వేర్ బ్రాకెట్లతో రాసే ఇండెక్సింగ్ సింటాక్స్ కంపైలర్ కోసం కేవలం ఒక పాయింటర్ అరిథ్‌మెటిక్ మాత్రమే:</p>

      $$\text{arr}[i] \iff *(\text{arr} + i)$$

      <p>కూడిక అనేది స్థిత్యంతర ధర్మాన్ని (Commutative Property: $A + B = B + A$) పాటిస్తుంది కాబట్టి:</p>
      $$*(\text{arr} + i) \iff *(i + \text{arr}) \iff i[\text{arr}]$$

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Array and Pointer Equivalence Proof (i[arr] Demo)</span>
          <div class="code-actions">
            <a class="try-btn" href="/online-c-compiler.html" target="_blank">▶ Run in Online C Compiler</a>
          </div>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main() {
    int arr[4] = {10, 20, 30, 40};

    // ఈ 4 పద్ధతులు పూర్తిగా ఒకే ఒక్క విలువను ఇస్తాయి!
    printf("1. సాధారణ ఇండెక్సింగ్ arr[2]   = %d\\n", arr[2]);
    printf("2. పాయింటర్ నోటేషన్ *(arr + 2) = %d\\n", *(arr + 2));
    printf("3. తిరగరాసిన పాయింటర్ *(2 + arr) = %d\\n", *(2 + arr));
    printf("4. విచిత్రమైన ఇండెక్సింగ్ 2[arr]    = %d (పూర్తిగా చెల్లుతుంది!)\\n", 2[arr]);

    return 0;
}</code></pre>
      </div>

      <div style="background:var(--bg3); border-left:4px solid #10b981; padding:12px 16px; border-radius:0 8px 8px 0; margin-top:12px; font-size:13.5px; color:var(--text2);">
        💡 <strong>ఇంటర్వ్యూ సీక్రెట్:</strong> ఇంటర్వ్యూయర్ మిమ్మల్ని గందరగోళ పరచడానికి <code>2[arr]</code> అని కోడ్ ఇస్తే భయపడకండి! అది <code>arr[2]</code> తో సమానం. అయితే ప్రొడక్షన్ కోడ్‌లో రీడబిలిటీ కోసం ఎల్లప్పుడూ ప్రామాణిక <code>arr[i]</code> మాత్రమే వాడాలి.
      </div>
    </div>

    <!-- SECTION 3 -->
    <div class="section-title"><span class="num">3</span>పాయింటర్ vs అర్రే మధ్య గల కీలక తేడాలు</div>
    <div class="section-body">
      <p>అర్రే పేరు పాయింటర్‌లా ప్రవర్తించినప్పటికీ, <strong>అర్రే మరియు పాయింటర్ ఒకటి కావు!</strong> వాటి మధ్య రెండు భారీ సాంకేతిక వ్యత్యాసాలు ఉన్నాయి:</p>

      <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin:16px 0;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px;">
          <h4 style="color:#059669; margin:0 0 8px; font-size:15px;">1. కాన్స్టాంట్ పాయింటర్ (Re-assignment):</h4>
          <p style="color:var(--text2); font-size:13px; line-height:1.6; margin:0;">
            పాయింటర్ అనేది ఒక సాధారణ వేరియబుల్, దానిని వేరొక అడ్రస్‌కి మార్చవచ్చు (<code>ptr = &amp;y;</code>). కానీ అర్రే పేరు ఒక <strong>స్థిరమైన కాన్స్టాంట్ పాయింటర్!</strong> దానిని వేరొక అడ్రస్‌కి మార్చలేము (<code>arr = ptr; // ❌ COMPILE ERROR!</code>).
          </p>
        </div>
        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px;">
          <h4 style="color:#059669; margin:0 0 8px; font-size:15px;">2. sizeof ఆపరేటర్ ప్రవర్తన:</h4>
          <p style="color:var(--text2); font-size:13px; line-height:1.6; margin:0;">
            <code>int arr[5];</code> పై <code>sizeof(arr)</code> లెక్కిస్తే మొత్తం <strong>20 బైట్లు</strong> (5 * 4) వస్తుంది. కానీ <code>int *ptr = arr;</code> పై <code>sizeof(ptr)</code> లెక్కిస్తే కేవలం <strong>8 బైట్లు</strong> (పాయింటర్ సైజు) మాత్రమే వస్తుంది!
          </p>
        </div>
      </div>
    </div>

    <!-- SECTION 4 -->
    <div class="section-title"><span class="num">4</span>అర్రే ఆఫ్ పాయింటర్స్ (Array of Pointers - int *arr[])</div>
    <div class="section-body">
      <p>సాధారణ అర్రే సంఖ్యలను దాచుకుంటే, <strong>అర్రే ఆఫ్ పాయింటర్స్</strong> మెమరీ చిరునామాలను (Pointers) ఒక వరుసలో నిల్వ చేస్తుంది. వేర్వేరు పొడవులు గల స్ట్రింగ్స్‌ను మెమరీ వేస్ట్ కాకుండా నిల్వ చేయడానికి ఇది అద్భుతంగా పనిచేస్తుంది:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Array of String Pointers</span>
          <div class="code-actions">
            <a class="try-btn" href="/online-c-compiler.html" target="_blank">▶ Run in Online C Compiler</a>
          </div>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main() {
    // 4 స్ట్రింగ్ పాయింటర్ల అర్రే (Array of 4 char pointers)
    const char *districts[] = {
        "హైదరాబాద్",
        "విశాఖపట్నం",
        "విజయవాడ",
        "వరంగల్"
    };

    printf("=== అర్రే ఆఫ్ పాయింటర్స్ డిస్‌ప్లే ===\\n");
    for (int i = 0; i &lt; 4; i++) {
        printf("జిల్లా #%d: %s (అడ్రస్: %p)\\n", i + 1, districts[i], (void*)districts[i]);
    }

    return 0;
}</code></pre>
      </div>
    </div>

    <!-- SECTION 5 -->
    <div class="section-title"><span class="num">5</span>డబుల్ పాయింటర్లు (Pointer to Pointer - **ptr) &amp; వాడకం</div>
    <div class="section-body">
      <p>ఒక పాయింటర్ కూడా RAM లో ఉండే సాధారణ వేరియబుల్ మాత్రమే కాబట్టి దానికి కూడా ఒక మెమరీ అడ్రస్ ఉంటుంది. ఆ పాయింటర్ యొక్క అడ్రస్‌ను పట్టుకునే పాయింటర్‌ను <strong>డబుల్ పాయింటర్ (<code>**ptr</code>)</strong> అంటారు.</p>

      <h4 style="color:#059669; margin:16px 0 8px; font-size:15px;">డబుల్ పాయింటర్ ఎప్పుడు అవసరం?</h4>
      <p>ఒక ఫంక్షన్ లోపల సాధారణ వేరియబుల్ విలువను మార్చడానికి మనం సింగిల్ పాయింటర్ (<code>&amp;x</code>) పాస్ చేస్తాం కదా? అదే విధంగా, <strong>ఒక ఫంక్షన్ లోపల ఒక పాయింటర్ పట్టుకున్న అడ్రస్‌నే మార్చాల్సి వస్తే</strong>, ఆ పాయింటర్ యొక్క అడ్రస్‌ను (డబుల్ పాయింటర్ <code>&amp;ptr</code>) పాస్ చేయాలి!</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Modifying a Pointer via Double Pointer</span>
          <div class="code-actions">
            <a class="try-btn" href="/online-c-compiler.html" target="_blank">▶ Run in Online C Compiler</a>
          </div>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int numA = 100;
int numB = 200;

// ఫంక్షన్ లోపల పాయింటర్‌ను numA నుండి numB కి మారుస్తున్నాం
void changeTarget(int **doublePtr) {
    *doublePtr = &amp;numB; // కాలర్ యొక్క పాయింటర్ అడ్రస్ మార్చబడింది!
}

int main() {
    int *myPtr = &amp;numA;
    printf("ఫంక్షన్ కాల్ కి ముందు: *myPtr = %d (numA)\\n", *myPtr);

    changeTarget(&amp;myPtr); // పాయింటర్ అడ్రస్ (&myPtr) ని పాస్ చేస్తున్నాం

    printf("ఫంక్షన్ కాల్ తర్వాత : *myPtr = %d (numB కి మారింది!)\\n", *myPtr);
    return 0;
}</code></pre>
      </div>
    </div>

    <!-- SECTION 6 -->
    <div class="section-title"><span class="num">6</span>కమాండ్ లైన్ ఆర్గుమెంట్స్ అనాటమీ (argc &amp; argv)</div>
    <div class="section-body">
      <p>మనం టెర్మినల్‌లో <code>gcc main.c -o app</code> అని కమాండ్స్ రన్ చేస్తాం కదా? ఇక్కడ <code>main.c</code>, <code>-o</code>, <code>app</code> అనేవి కమాండ్ లైన్ ఆర్గుమెంట్స్. C ప్రోగ్రామ్‌లు టెర్మినల్ నుండి ఇన్‌పుట్ అందుకోవడానికి <code>main()</code> ఫంక్షన్‌కు రెండు పారామీటర్లు ఉంటాయి:</p>

      <ul style="margin-left: 20px; color: var(--text2); font-size: 14px; line-height: 1.7;">
        <li><strong><code>int argc</code> (Argument Count):</strong> టెర్మినల్ నుండి పాస్ చేసిన మొత్తం పదాల సంఖ్య (ప్రోగ్రామ్ పేరుతో సహా, ఎల్లప్పుడూ &ge; 1).</li>
        <li><strong><code>char *argv[]</code> (Argument Vector):</strong> ఆ పదాల స్ట్రింగ్ పాయింటర్ల అర్రే (డబుల్ పాయింటర్ <code>char**</code>).</li>
      </ul>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Command-Line Arguments Parser</span>
          <div class="code-actions">
            <a class="try-btn" href="/online-c-compiler.html" target="_blank">▶ Run in Online C Compiler</a>
          </div>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main(int argc, char *argv[]) {
    printf("=== కమాండ్ లైన్ ఆర్గుమెంట్స్ అనలిటిక్స్ ===\\n");
    printf("మొత్తం ఆర్గుమెంట్ల సంఖ్య (argc) = %d\\n", argc);

    for (int i = 0; i &lt; argc; i++) {
        printf("argv[%d] = %s\\n", i, argv[i]);
    }

    return 0;
}</code></pre>
      </div>
    </div>

    <!-- SECTION 7 -->
    <div class="section-title"><span class="num">7</span>సమగ్ర తులనాత్మక పట్టిక (*arr[] vs (*arr)[])</div>
    <div class="section-body">
      <p>C ఇంటర్వ్యూలలో అడిగే అత్యంత కఠినమైన బ్రాకెట్ ప్రిసిడెన్స్ ప్రశ్న:</p>

      <table class="tbl">
        <thead>
          <tr>
            <th>డిక్లరేషన్</th>
            <th>సాంకేతిక అర్థం</th>
            <th>మెమరీ స్వభావం</th>
            <th>ప్రధాన ఉపయోగం</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>int *arr[5];</code></td>
            <td><strong>Array of 5 Pointers</strong> (5 పాయింటర్ల అర్రే).</td>
            <td>5 వేర్వేరు మెమరీ అడ్రస్‌లను భద్రపరుస్తుంది (5 × 8 = 40 బైట్లు).</td>
            <td>విభిన్న పొడవులు గల స్ట్రింగ్స్, ర్యాగ్డ్ అర్రేస్.</td>
          </tr>
          <tr>
            <td><code>int (*arr)[5];</code></td>
            <td><strong>Pointer to an Array of 5 ints</strong> (5 ఎలిమెంట్స్ గల అర్రేను పాయింట్ చేసే ఒకే ఒక్క పాయింటర్).</td>
            <td>కేవలం ఒకే ఒక్క పాయింటర్ (8 బైట్లు).</td>
            <td>2D మ్యాట్రిక్స్‌లను ఫంక్షన్లకు పాస్ చేసేటప్పుడు అడ్డు వరుసలను పాయింట్ చేయడానికి.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- SECTION 8 -->
    <div class="section-title"><span class="num">8</span>ఫంక్షన్ పాయింటర్లు (Function Pointers) — కోడ్ సెగ్మెంట్ అడ్రస్లు</div>
    <div class="section-body">
      <p>కంప్యూటర్ RAM లో కేవలం వేరియబుల్స్ మాత్రమే కాదు; <strong>మనం రాసిన ఫంక్షన్ల మెషీన్ కోడ్ కూడా ఒక మెమరీ అడ్రస్ లోనే నిల్వ ఉంటుంది (Code Segment / Text Segment)!</strong> ఆ ఫంక్షన్ యొక్క మెమరీ చిరునామాను పట్టుకునే పాయింటర్‌ను <strong>ఫంక్షన్ పాయింటర్ (Function Pointer)</strong> అంటారు!</p>

      <h4 style="color:#059669; margin:16px 0 8px; font-size:15px;">ఫంక్షన్ పాయింటర్ సింటాక్స్ అనాటమీ:</h4>
      <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px 18px; font-family:'JetBrains Mono',monospace; font-size:13.5px; line-height:1.7; margin-bottom:14px;">
        <span style="color:#2563eb;">రిటర్న్_టైప్</span> (*<span style="color:#059669; font-weight:700;">పాయింటర్_పేరు</span>) ( <span style="color:#d97706;">పారామీటర్ల_జాబితా</span> );<br>
        ఉదాహరణ: int (*operationPtr)(int, int);
      </div>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Basic Function Pointer Invocation</span>
          <div class="code-actions">
            <a class="try-btn" href="/online-c-compiler.html" target="_blank">▶ Run in Online C Compiler</a>
          </div>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int add(int a, int b) { return a + b; }
int multiply(int a, int b) { return a * b; }

int main() {
    // ఫంక్షన్ పాయింటర్ డిక్లరేషన్
    int (*mathFunc)(int, int);

    // 1. add ఫంక్షన్ అడ్రస్ ని అసైన్ చేస్తున్నాం
    mathFunc = add;
    printf("add ఫంక్షన్ మెమరీ అడ్రస్: %p\\n", (void*)mathFunc);
    printf("mathFunc(10, 20) ఫలితం = %d\\n", mathFunc(10, 20));

    // 2. రన్‌టైమ్‌లో multiply ఫంక్షన్‌కి మారుస్తున్నాం!
    mathFunc = multiply;
    printf("multiply మెమరీ అడ్రస్   : %p\\n", (void*)mathFunc);
    printf("mathFunc(10, 20) ఫలితం = %d\\n", mathFunc(10, 20));

    return 0;
}</code></pre>
      </div>
    </div>

    <!-- SECTION 9 -->
    <div class="section-title"><span class="num">9</span>కాల్‌బ్యాక్ ఫంక్షన్స్ (Callback Architecture &amp; qsort)</div>
    <div class="section-body">
      <p>ఒక ఫంక్షన్‌కు మరొక ఫంక్షన్‌ను పారామీటర్‌గా పంపడాన్ని <strong>కాల్‌బ్యాక్ (Callback)</strong> అంటారు. C స్టాండర్డ్ లైబ్రరీలోని ప్రసిద్ధ <code>qsort()</code> అల్గారిథమ్ దీనికి అత్యుత్తమ ఉదాహరణ. సంఖ్యలను అసెండింగ్ లేదా డిసెండింగ్ ఆర్డర్‌లో ఎలా సార్ట్ చేయాలో మనం ఒక కాల్‌బ్యాక్ ఫంక్షన్ ద్వారా <code>qsort</code> కు అందిస్తాం:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — qsort with Custom Comparator Callback</span>
          <div class="code-actions">
            <a class="try-btn" href="/online-c-compiler.html" target="_blank">▶ Run in Online C Compiler</a>
          </div>
        </div>
        <pre><code>#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;

// qsort కోసం కంపారేటర్ కాల్‌బ్యాక్ ఫంక్షన్
int compareAscending(const void *a, const void *b) {
    int valA = *(const int*)a;
    int valB = *(const int*)b;
    return valA - valB; // పాజిటివ్ అయితే స్వాప్ చేస్తుంది
}

int main() {
    int arr[] = {64, 25, 12, 22, 11};
    int n = sizeof(arr) / sizeof(arr[0]);

    printf("సార్టింగ్ చేయడానికి ముందు: ");
    for (int i = 0; i &lt; n; i++) printf("%d ", arr[i]);
    printf("\\n");

    // qsort కు compareAscending ఫంక్షన్ పాయింటర్‌ను కాల్‌బ్యాక్‌గా పాస్ చేస్తున్నాం
    qsort(arr, n, sizeof(int), compareAscending);

    printf("సార్టింగ్ చేసిన తర్వాత   : ");
    for (int i = 0; i &lt; n; i++) printf("%d ", arr[i]);
    printf("\\n");

    return 0;
}</code></pre>
      </div>
    </div>

    <!-- SECTION 10 -->
    <div class="section-title"><span class="num">10</span>డైనమిక్ 2D అర్రేస్ పరిచయం (Double Pointers ద్వారా)</div>
    <div class="section-body">
      <p>సాధారణ 2D అర్రేలలో రోస్ మరియు కాలమ్స్ సంఖ్య కంపైల్-టైమ్‌లోనే స్థిరంగా ఉండాలి. కానీ డబుల్ పాయింటర్లు (<code>int **matrix</code>) మరియు <code>malloc()</code> ఉపయోగించి యూజర్ కోరిన సైజుతో రన్‌టైమ్‌లో ఫ్లెక్సిబుల్ 2D గ్రిడ్‌లను నిర్మించవచ్చు. దీనిని మనం Phase 05 లో డైనమిక్ మెమరీతో కలిపి మరింత లోతుగా నేర్చుకుంటాం.</p>
    </div>

    <!-- SECTION 11 -->
    <div class="section-title"><span class="num">11</span>సమగ్ర రియల్ వరల్డ్ ప్రాజెక్ట్ — ప్లగ్-అండ్-ప్లే మ్యాథ్ ఇంజిన్ (Callbacks)</div>
    <div class="section-body">
      <p>ఇప్పటివరకు నేర్చుకున్న ఫంక్షన్ పాయింటర్లు మరియు కాల్‌బ్యాక్స్ ఉపయోగించి ఒక ఎక్స్‌టెన్సిబుల్ <strong>ప్లగ్-అండ్-ప్లే మ్యాథమెటికల్ కంప్యూట్ ఇంజిన్ (Compute Engine)</strong> నిర్మిద్దాం. కోర్ ఇంజిన్ కోడ్‌ను మార్చకుండానే భవిష్యత్తులో కొత్త ఆపరేషన్లను జోడించవచ్చు:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Extensible Plug-and-Play Compute Engine</span>
          <div class="code-actions">
            <a class="try-btn" href="/online-c-compiler.html" target="_blank">▶ Run in Online C Compiler</a>
          </div>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

// ఫంక్షన్ పాయింటర్ టైప్‌డెఫ్ (Function Signature)
typedef double (*MathOperation)(double, double);

// ఆపరేషన్లు
double opAdd(double a, double b) { return a + b; }
double opSubtract(double a, double b) { return a - b; }
double opPower(double base, double exp) {
    double res = 1.0;
    for (int i = 0; i &lt; (int)exp; i++) res *= base;
    return res;
}

// కోర్ ఎగ్జిక్యూటర్ ఇంజిన్ (కాల్‌బ్యాక్ ద్వారా రన్ అవుతుంది)
void executeOperation(const char *opName, MathOperation func, double x, double y) {
    double result = func(x, y); // ఫంక్షన్ పాయింటర్ ద్వారా ఇన్వొకేషన్!
    printf("⚙️ [%-10s] ఇన్పుట్: (%.1f, %.1f) ➔ ఫలితం = %.2f\\n", opName, x, y, result);
}

int main() {
    printf("====================================================\\n");
    printf("   మనా ప్లగ్-అండ్-ప్లే కంప్యూట్ ఇంజిన్ (2026 Engine)\\n");
    printf("====================================================\\n");

    // రన్‌టైమ్‌లో వేర్వేరు ఫంక్షన్లను కాల్‌బ్యాక్‌లుగా పంపుతున్నాం
    executeOperation("కూడిక", opAdd, 45.0, 15.0);
    executeOperation("తీసివేత", opSubtract, 100.0, 35.0);
    executeOperation("ఘాతం (Power)", opPower, 2.0, 8.0);

    printf("====================================================\\n");
    return 0;
}</code></pre>
      </div>
    </div>

    <!-- SECTION 12 -->
    <div class="section-title"><span class="num">12</span>సాధారణంగా బిగినర్స్ చేసే టాప్ 5 అడ్వాన్స్‌డ్ తప్పులు</div>
    <div class="section-body">
      <div style="display:grid; grid-template-columns:1fr; gap:12px; margin:14px 0;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:12px 16px;">
          <strong style="color:#ef4444;">1. int *a[] vs int (*a)[] బ్రాకెట్స్ మిస్సింగ్:</strong><br>
          <span style="color:var(--text2); font-size:13.5px;">బ్రాకెట్లు లేకపోతే అది అర్రే ఆఫ్ పాయింటర్స్ అవుతుంది; బ్రాకెట్లు ఉంటే పాయింటర్ టు యాన్ అర్రే అవుతుంది. ఇది భారీ కంపైలేషన్ ఎర్రర్లను ఇస్తుంది.</span>
        </div>
        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:12px 16px;">
          <strong style="color:#ef4444;">2. డబుల్ పాయింటర్‌ను సరైన ఇనిషియలైజేషన్ లేకుండా డీరిఫరెన్స్ చేయడం:</strong><br>
          <span style="color:var(--text2); font-size:13.5px;"><code>int **p; **p = 5;</code> అని రాస్తే లెవల్ 1 అడ్రస్ ఖాళీగా ఉండి సెగ్మెంటేషన్ ఫాల్ట్ వస్తుంది.</span>
        </div>
        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:12px 16px;">
          <strong style="color:#ef4444;">3. అర్రే కాన్స్టాంట్ పాయింటర్‌కు రీ-అసైన్ చేయడానికి ప్రయత్నించడం:</strong><br>
          <span style="color:var(--text2); font-size:13.5px;"><code>arr = ptr;</code> అని రాయకూడదు. అర్రే బేస్ అడ్రస్ స్థిరమైనది (Non-modifiable lvalue).</span>
        </div>
        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:12px 16px;">
          <strong style="color:#ef4444;">4. ఫంక్షన్ పాయింటర్ సిగ్నేచర్ మిస్‌మ్యాచ్:</strong><br>
          <span style="color:var(--text2); font-size:13.5px;">ఫంక్షన్ పాయింటర్ <code>(int, int)</code> ఆశిస్తుంటే <code>(double, double)</code> ఫంక్షన్‌ను అసైన్ చేస్తే కంపైలర్ టైప్ ఎర్రర్ ఇస్తుంది.</span>
        </div>
        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:12px 16px;">
          <strong style="color:#ef4444;">5. argc చెక్ చేయకుండా argv[1] ని యాక్సెస్ చేయడం:</strong><br>
          <span style="color:var(--text2); font-size:13.5px;">యూజర్ ఆర్గుమెంట్స్ ఇవ్వకుండా ప్రోగ్రామ్ రన్ చేస్తే <code>argv[1]</code> నల్ అవుతుంది. <code>if (argc &gt; 1)</code> తనిఖీ తప్పనిసరి.</span>
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
          ❓ ప్రశ్న 1: C లో arr[i] మరియు *(arr + i) మధ్య వ్యత్యాసం ఏమిటి?
        </summary>
        <div style="margin-top:10px; color:var(--text2); font-size:14px; line-height:1.6;">
          <strong>సమాధానం:</strong> రెండింటి మధ్య ఎటువంటి వ్యత్యాసం లేదు! <code>arr[i]</code> అనేది కంపైలర్ కోసం <code>*(arr + i)</code> గా రూపాంతరం చెందే సింటాక్స్ షుగర్ మాత్రమే.
        </div>
      </details>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:700; cursor:pointer; color:#059669;">
          ❓ ప్రశ్న 2: డబుల్ పాయింటర్ (**ptr) యొక్క పరిమాణం (sizeof) ఎంత ఉంటుంది?
        </summary>
        <div style="margin-top:10px; color:var(--text2); font-size:14px; line-height:1.6;">
          <strong>సమాధానం:</strong> 64-బిట్ ఆర్కిటెక్చర్‌లో ఇది కూడా కేవలం ఒక మెమరీ అడ్రస్ మాత్రమే కాబట్టి సరిగ్గా <strong>8 బైట్లు</strong> మాత్రమే ఉంటుంది.
        </div>
      </details>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:700; cursor:pointer; color:#059669;">
          ❓ ప్రశ్న 3: కమాండ్ లైన్ లో argc కనీస విలువ ఎల్లప్పుడూ ఎంత ఉంటుంది?
        </summary>
        <div style="margin-top:10px; color:var(--text2); font-size:14px; line-height:1.6;">
          <strong>సమాధానం:</strong> ఎల్లప్పుడూ కనీసం <strong>1</strong> ఉంటుంది. ఎందుకంటే ప్రోగ్రామ్ యొక్క స్వంత పేరు (ఉదా: <code>./app</code>) మొదటి ఆర్గుమెంట్ <code>argv[0]</code> గా పరిగణించబడుతుంది.
        </div>
      </details>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:700; cursor:pointer; color:#059669;">
          ❓ ప్రశ్న 4: ఫంక్షన్ పాయింటర్లు (Function Pointers) RAM లో ఏ సెగ్మెంట్‌లోని చిరునామాను పట్టుకుంటాయి?
        </summary>
        <div style="margin-top:10px; color:var(--text2); font-size:14px; line-height:1.6;">
          <strong>సమాధానం:</strong> అవి <strong>Code Segment (Text Segment)</strong> లోని ఎగ్జిక్యూటబుల్ మెషీన్ ఇన్‌స్ట్రక్షన్ల మెమరీ అడ్రస్‌ను పట్టుకుంటాయి.
        </div>
      </details>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:700; cursor:pointer; color:#059669;">
          ❓ ప్రశ్న 5: 'int *a[10]' మరియు 'int (*b)[10]' ల మధ్య ప్రధాన వ్యత్యాసం ఏమిటి?
        </summary>
        <div style="margin-top:10px; color:var(--text2); font-size:14px; line-height:1.6;">
          <strong>సమాధానం:</strong> <code>a</code> అనేది 10 పాయింటర్ల అర్రే (Array of Pointers); <code>b</code> అనేది 10 ఎలిమెంట్స్ గల అర్రేను పాయింట్ చేసే ఒకే ఒక్క పాయింటర్ (Pointer to Array).
        </div>
      </details>

      <!-- TRY BOX -->
      <div class="try-box" style="margin-top:24px;">
        <div class="try-title">🚀 ప్లగ్-అండ్-ప్లే మ్యాథ్ ఇంజిన్‌ను మన ఆన్‌లైన్ C కంపైలర్‌లో రన్ చేయండి!</div>
        <p>పైన వివరించిన <code>ఫంక్షన్ పాయింటర్ కాల్‌బ్యాక్స్ ఇంజిన్</code> మరియు <code>డబుల్ పాయింటర్</code> కోడ్‌లను మన ఆన్‌లైన్ C కంపైలర్‌లో ఓపెన్ చేసి స్వయంగా రన్ చేయండి. కొత్త మ్యాథ్ ఫంక్షన్లను (ఉదా: మాడ్యులో, వర్గమూలం) ప్లగ్-ఇన్ చేసి టెస్ట్ చేయండి!</p>
        <a class="run-btn" href="/online-c-compiler.html" target="_blank">
          👉 Our Compiler లో C Compiler try చేయండి
        </a>
      </div>

      <div style="margin-top:24px;">
        <h4 style="color:#059669; font-size:16px; margin-bottom:10px;">📌 Phase 04 ముగింపు సారాంశం (Phase 04 Wrap-Up):</h4>
        <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.7;">
          <li><strong>డేటా స్ట్రక్చర్స్ &amp; మెమరీ విజయం:</strong> అర్రేలు, 2D Matrices (Ch 13), స్ట్రింగ్స్, నల్ టెర్మినేటర్ (Ch 14), పాయింటర్లు, అరిథ్‌మెటిక్ (Ch 15), మరియు డబుల్ పాయింటర్లు &amp; ఫంక్షన్ పాయింటర్లు (Ch 16) లపై సంపూర్ణ పట్టు సాధించారు!</li>
          <li><strong>arr[i]:</strong> అంతర్గతంగా <code>*(arr + i)</code> అనే పాయింటర్ అరిథ్‌మెటిక్.</li>
          <li><strong>డబుల్ పాయింటర్:</strong> మరొక పాయింటర్ యొక్క మెమరీ అడ్రస్‌ను నిల్వ చేసే లెవల్-2 పాయింటర్.</li>
          <li><strong>ఫంక్షన్ పాయింటర్లు:</strong> రన్‌టైమ్‌లో ఫంక్షన్లను డైనమిక్‌గా మార్చడానికి మరియు కాల్‌బ్యాక్ ఆర్కిటెక్చర్ నిర్మించడానికి ఉపయోగపడతాయి.</li>
        </ul>
      </div>

      <div style="margin-top:20px; padding:16px; background:var(--bg2); border-left:4px solid #10b981; border-radius:0 8px 8px 0;">
        <strong>తర్వాతి అధ్యాయంలో (Phase 05 — స్ట్రక్చర్స్, డైనమిక్ మెమరీ &amp; ఫైల్స్):</strong> విభిన్న డేటా టైప్స్‌ను కలిపి కొత్త యూజర్-డిఫైన్డ్ డేటా టైప్స్ సృష్టించే <strong>స్ట్రక్చర్స్ (Structures), యూనియన్స్ (Unions) మరియు మెమరీ ప్యాడింగ్ (Structure Padding)</strong> గురించి అత్యంత లోతుగా నేర్చుకుందాం!
      </div>
    </div>

    <!-- PREV / NEXT NAVIGATION -->
    <div style="display:flex; justify-content:space-between; align-items:center; margin-top:40px; padding-top:20px; border-top:1px solid var(--border); flex-wrap:wrap; gap:16px;">
      <a href="/blog-c/15-c-pointers-basics-and-address-arithmetic.html" style="display:inline-flex; align-items:center; gap:8px; padding:10px 18px; border-radius:8px; background:var(--bg3); border:1px solid var(--border); color:var(--text); text-decoration:none; font-weight:700; font-size:13.5px;">
        ← Prev: 15. పాయింటర్లు: బేసిక్స్
      </a>
      <a href="/blog-c/17-c-structures-unions-and-typedef.html" style="display:inline-flex; align-items:center; gap:8px; padding:10px 20px; border-radius:8px; background:linear-gradient(135deg, #10b981, #059669); color:#ffffff; text-decoration:none; font-weight:700; font-size:13.5px; box-shadow:0 2px 10px rgba(16,185,129,0.2);">
        Next: 17. స్ట్రక్చర్స్ &amp; యూనియన్స్ →
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
  <title>పాయింటర్లు, అర్రేస్, Double Pointers & కాల్‌బ్యాక్స్ — Modern C Tutorial | Our Compiler</title>
  <meta name="description" content="పాయింటర్లు, అర్రేస్ & Double Pointers సమగ్ర తెలుగు గైడ్: arr[i] == *(arr+i) సీక్రెట్, డబుల్ పాయింటర్లు, కమాండ్ లైన్ argc argv, ఫంక్షన్ పాయింటర్లు & కాల్‌బ్యాక్స్." />
  <meta name="keywords" content="c double pointers in telugu, c function pointers callback, c array of pointers, c argc argv, qsort callback c, our compiler" />
  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />
  <link rel="icon" type="image/png" href="/logo.png" />
  <link rel="canonical" href="https://www.ourcompiler.com/blog-c/16-c-pointers-with-arrays-and-double-pointers.html" />
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
    "headline": "పాయింటర్లు, అర్రేస్, Double Pointers & కాల్‌బ్యాక్స్ (C Programming in Telugu)",
    "description": "arr[i] == *(arr+i) సీక్రెట్, డబుల్ పాయింటర్లు, కమాండ్ లైన్ argc argv, ఫంక్షన్ పాయింటర్లు & కాల్‌బ్యాక్స్",
    "articleSection": "Phase 04: అర్రేస్, స్ట్రింగ్స్ & పాయింటర్లు",
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

const outputPath = path.join(__dirname, '..', 'public', 'blog-c', '16-c-pointers-with-arrays-and-double-pointers.html');
fs.writeFileSync(outputPath, fullHtml, 'utf8');

console.log('✅ Successfully generated deep high-value C Chapter 16!');
console.log('Target file size:', fullHtml.length, 'characters');
