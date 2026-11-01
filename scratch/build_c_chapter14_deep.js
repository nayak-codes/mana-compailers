const fs = require('fs');
const path = require('path');
const { LESSONS, buildSidebar } = require('./c_curriculum_data.js');

const lesson = LESSONS.find(l => l.num === 14);
const sidebarHtml = buildSidebar(14);

const chapterContentHtml = `
    <!-- BREADCRUMB -->
    <div class="breadcrumb">
      <a href="/">Home</a><span class="sep">›</span>
      <a href="/blog.html">Tutorials</a><span class="sep">›</span>
      <a href="/blog-c.html">C Masterclass</a><span class="sep">›</span>
      <span class="current">Chapter 14: స్ట్రింగ్స్, '\\0' నల్ టెర్మినేటర్ &amp; &lt;string.h&gt;</span>
    </div>

    <!-- PAGE TITLE -->
    <h1 class="page-title">C స్ట్రింగ్స్, '\\0' నల్ టెర్మినేటర్ &amp; &lt;string.h&gt; లైబ్రరీ</h1>

    <!-- PAGE META BADGES -->
    <div class="page-meta">
      <span class="badge">⚡ Modern C (C99 / C11 / C17 Standards)</span>
      <span class="badge">🟢 Chapter 14 of 20</span>
      <span class="badge">📂 Phase 04: అర్రేస్, స్ట్రింగ్స్ &amp; పాయింటర్లు</span>
      <span class="badge">📅 2026 Academic Edition</span>
    </div>

    <!-- SUBTOPICS PILL BAR -->
    <div style="background:var(--bg3); border:1px solid var(--border); border-radius:8px; padding:10px 16px; margin-bottom:24px; font-size:13px; color:var(--text2); display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
      <span style="color:#10b981; font-weight:700;">📌 Covered in this chapter:</span>
      <span>రైలు రెడ్ లైట్ ఎనాలజీ · C లో String టైప్ ఎందుకు లేదు? · '\\0' నల్ టెర్మినేటర్ సీక్రెట్ · +1 బైట్ రూల్ · scanf vs fgets సేఫ్టీ · strlen vs sizeof తేడాలు · strcpy vs strncpy · strcmp డిక్షనరీ ఆర్డర్ · strtok CSV పార్సింగ్ · బఫర్ ఓవర్‌ఫ్లో హ్యాకింగ్ · లాగిన్ ఆథెంటికేషన్ ప్రాజెక్ట్ · ఇంటరాక్టివ్ క్విజ్</span>
    </div>

    <!-- INTRO ACCENT BOX (Warm Ivory with Green Accent) -->
    <div class="intro-box">
      <p>మనం పుస్తకంలో ఒక వాక్యం చదివేటప్పుడు, ఆ వాక్యం ఎక్కడ ముగిసిందో మన కళ్లకు ఎలా తెలుస్తుంది? వాక్యం చివర ఉండే చుక్క లేదా ఫుల్‌స్టాప్ (<code>.</code>) ద్వారానే కదా! అదే విధంగా ఒక రైలు పట్టాలపై దూసుకుపోతున్నప్పుడు, స్టేషన్ మాస్టర్‌కు రైలులోని ఆఖరి బోగీ ఇదేనని ఎలా తెలుస్తుంది? చిట్టచివరి బోగీ వెనుక అమర్చిన <strong>ఎరుపు రంగు లైట్ లేదా LV (Last Vehicle) బోర్డు</strong> ఆధారంగానే కదా!</p>
      <p>కంప్యూటర్ సైన్స్‌లో C లాంగ్వేజ్‌కు ప్రత్యేకమైన "String" అనే ప్రాథమిక డేటా టైప్ ఏదీ ఉండదు! C లో ఒక స్ట్రింగ్ అంటే కేవలం <strong>క్యారెక్టర్ల వరుస అర్రే (Array of Characters)</strong> మాత్రమే. మరి ఆ అక్షరాల వరుస ఎక్కడ ముగిసిందో కంప్యూటర్ RAM కి ఎలా తెలుస్తుంది? దానికోసమే C సృష్టికర్త డెన్నిస్ రిచీ ప్రతి స్ట్రింగ్ చివర ఒక అదృశ్య రక్షకుడిని ఉంచారు: అదే <strong>నల్ టెర్మినేటర్ '\\0' (Null Terminator - ASCII 0)</strong>!</p>
      <p>ఆ '\\0' లేకపోతే, కంప్యూటర్ స్క్రీన్ పై పిచ్చి పిచ్చి గార్బేజ్ అక్షరాలు ప్రింట్ అవుతాయి, ప్రోగ్రామ్ మెమరీ క్రాష్ అవుతుంది. ఈ పద్నాలుగవ అధ్యాయంలో, క్యారెక్టర్ అర్రేల అంతర్గత నిర్మాణం, <code>&lt;string.h&gt;</code> లోని ప్రముఖ ఫంక్షన్లు (<code>strlen</code>, <code>strcpy</code>, <code>strcat</code>, <code>strcmp</code>), సురక్షితమైన <code>fgets()</code> వినియోగం, మరియు హ్యాకర్ల బారిన పడకుండా రక్షించే <strong>సెక్యూర్ క్రెడెన్షియల్ ఆథెంటికేషన్ ఇంజిన్‌ను</strong> సమగ్రంగా నిర్మిద్దాం!</p>
    </div>

    <!-- SECTION 1 -->
    <div class="section-title"><span class="num">1</span>ఈ Chapter లో మీరు నేర్చుకునే సమగ్ర అంశాలు (Roadmap)</div>
    <div class="section-body">
      <p>టెక్స్ట్ ప్రాసెసింగ్, యూజర్ ఇన్‌పుట్ హ్యాండ్లింగ్, మరియు సైబర్ సెక్యూరిటీలో స్ట్రింగ్స్ అనేవి అత్యంత కీలకమైన అంశం. ఈ అధ్యాయంలో కవర్ చేయబడే ప్రధానాంశాలు:</p>
      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.7;">
        <li><strong>C లో స్ట్రింగ్ ఫిలాసఫీ:</strong> Primitive String టైప్ లేకపోవడానికి చారిత్రక కారణాలు మరియు క్యారెక్టర్ అర్రే ఆర్కిటెక్చర్.</li>
        <li><strong>నల్ టెర్మినేటర్ '\\0' రహస్యం:</strong> ASCII విలువ 0 మరియు స్ట్రింగ్ ముగింపును గుర్తించే సెక్యూరిటీ గార్డ్.</li>
        <li><strong>ది +1 బైట్ రూల్ (The +1 Allocation Rule):</strong> 5 అక్షరాల పదానికి 6 బైట్ల మెమరీ ఎందుకు తప్పనిసరి?</li>
        <li><strong>స్ట్రింగ్ ఇనిషియలైజేషన్ పద్ధతులు:</strong> డబుల్ కోట్స్ (<code>"Hello"</code>) వర్సెస్ క్యారెక్టర్ లిస్ట్ (<code>{'H','e','l','l','o','\\0'}</code>).</li>
        <li><strong>స్టాక్ స్ట్రింగ్ vs స్ట్రింగ్ లిటరల్ (Read-Only Memory):</strong> <code>char str[]</code> మరియు <code>char *str</code> మధ్య డేంజర్ డిఫరెన్స్.</li>
        <li><strong>స్ట్రింగ్ ఇన్‌పుట్ మెథడ్స్ పోస్ట్‌మార్టం:</strong> <code>scanf("%s")</code> లో స్పేస్ సమస్య, పాత <code>gets()</code> నిషేధం &amp; <code>fgets()</code> సేఫ్టీ.</li>
        <li><strong>సమగ్ర తులనాత్మక పట్టిక:</strong> &lt;string.h&gt; లోని ప్రాథమిక vs సురక్షిత ఫంక్షన్ల విశ్లేషణ.</li>
        <li><strong>పొడవు గణన: strlen() vs sizeof():</strong> నల్ క్యారెక్టర్‌ను లెక్కింపులో పరిగణించే తేడాలు.</li>
        <li><strong>కాపీ &amp; కాన్‌క్యాటనేషన్:</strong> <code>strcpy</code>/<code>strncpy</code> మరియు <code>strcat</code>/<code>strncat</code> పనితీరు.</li>
        <li><strong>స్ట్రింగ్ కంపారిజన్:</strong> <code>==</code> ఆపరేటర్ ఎందుకు పనిచేయదు? <code>strcmp()</code> లెక్సికోగ్రాఫికల్ డిక్షనరీ ఆర్డర్.</li>
        <li><strong>సమగ్ర రియల్ వరల్డ్ ప్రాజెక్ట్:</strong> సెక్యూర్ యూజర్ అకౌంట్ లాగిన్ &amp; పాస్‌వర్డ్ కాంప్లెక్సిటీ వాలిడేటర్.</li>
        <li><strong>బిగినర్స్ చేసే టాప్ 5 స్ట్రింగ్ తప్పులు:</strong> బఫర్ ఓవర్‌ఫ్లో, స్ట్రింగ్ కాపీ లోపాలు, మరియు డ్యాంగ్లింగ్ రీడ్-ఓన్లీ రాతలు.</li>
        <li><strong>స్వీయ మూల్యాంకన క్విజ్:</strong> 5 లోతైన ప్రాక్టికల్ ప్రశ్నలు &amp; గేట్ ఎగ్జామ్ కాన్సెప్ట్స్.</li>
      </ul>
    </div>

    <!-- SECTION 2 -->
    <div class="section-title"><span class="num">2</span>C లో అసలైన "String" డేటా టైప్ ఎందుకు లేదు?</div>
    <div class="section-body">
      <p>జావా (Java) లో <code>String</code> ఉంది, పైథాన్ (Python) లో <code>str</code> ఉంది, C++ లో <code>std::string</code> ఉంది. కానీ C లాంగ్వేజ్‌లో అటువంటి ప్రత్యేకమైన స్ట్రింగ్ క్లాస్ లేదా టైప్ ఏదీ లేదు!</p>

      <div style="background:var(--bg2); border:1px solid var(--border); border-radius:10px; padding:18px; margin:16px 0;">
        <h4 style="color:#059669; margin:0 0 8px; font-size:15px;">డెన్నిస్ రిచీ డిజైన్ ఫిలాసఫీ (1972):</h4>
        <p style="color:var(--text2); font-size:14px; line-height:1.7; margin:0;">
          C భాష ఆపరేటింగ్ సిస్టమ్స్ (Unix) మరియు ఎంబెడెడ్ డివైసెస్ నిర్మించడానికి పుట్టింది. ఆ రోజుల్లో మెమరీ కేవలం కొన్ని కిలోబైట్లు మాత్రమే ఉండేది. స్ట్రింగ్స్ కోసం ప్రత్యేకమైన డైనమిక్ ఆబ్జెక్టులను సృష్టిస్తే మెమరీ ఓవర్‌హెడ్ పెరుగుతుంది. అందుకే అత్యంత తేలికైన, వేగవంతమైన పరిష్కారంగా <strong>క్యారెక్టర్ల 1D అర్రేనే (char array) స్ట్రింగ్‌గా</strong> ఉపయోగించాలని నిర్ణయించారు!
        </p>
      </div>
    </div>

    <!-- SECTION 3 -->
    <div class="section-title"><span class="num">3</span>ది గార్డియన్ ఆఫ్ స్ట్రింగ్స్ — '\\0' నల్ టెర్మినేటర్ &amp; +1 బైట్ రూల్</div>
    <div class="section-body">
      <p>స్ట్రింగ్ అనేది సాధారణ క్యారెక్టర్ అర్రే అయినప్పుడు, ఆ అర్రేలో అసలైన టెక్స్ట్ ఎక్కడ ముగిసిందో కంపైలర్‌కు ఎలా తెలుస్తుంది? దానికోసమే <strong>నల్ క్యారెక్టర్ (Null Character - <code>'\\0'</code>)</strong> ను ఉపయోగిస్తారు. దీని ASCII విలువ సరిగ్గా <strong>0</strong>.</p>

      <div style="background:var(--bg3); border-left:4px solid #10b981; padding:14px 18px; border-radius:0 8px 8px 0; margin:16px 0; font-size:14px; color:var(--text2);">
        <strong>📏 ది గోల్డెన్ +1 బైట్ రూల్ (The +1 Rule):</strong> మీరు $N$ అక్షరాలు గల పదాన్ని నిల్వ చేయాలనుకుంటే, అర్రే సైజు కచ్చితంగా <strong>$N + 1$ బైట్లు</strong> ఉండాలి! ఆ అదనపు 1 బైట్ నల్ టెర్మినేటర్ <code>'\\0'</code> కోసం కేటాయించబడుతుంది!
      </div>

      <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px 20px; font-family:'JetBrains Mono',monospace; font-size:13px; line-height:1.7; margin:14px 0;">
        "INDIA" అనే 5 అక్షరాల పదం మెమరీలో ఎలా నిల్వ అవుతుందో చూడండి:<br><br>
        ఇండెక్స్ : &nbsp;[0] &nbsp;&nbsp;[1] &nbsp;&nbsp;[2] &nbsp;&nbsp;[3] &nbsp;&nbsp;[4] &nbsp;&nbsp;<strong>[5]</strong><br>
        క్యారెక్టర్: &nbsp;'I' &nbsp;&nbsp;'N' &nbsp;&nbsp;'D' &nbsp;&nbsp;'I' &nbsp;&nbsp;'A' &nbsp;&nbsp;<strong>'\\0'</strong><br>
        ASCII విలువ: &nbsp;73 &nbsp;&nbsp;&nbsp;78 &nbsp;&nbsp;&nbsp;68 &nbsp;&nbsp;&nbsp;73 &nbsp;&nbsp;&nbsp;65 &nbsp;&nbsp;&nbsp;<strong>0</strong>
      </div>
    </div>

    <!-- SECTION 4 -->
    <div class="section-title"><span class="num">4</span>స్ట్రింగ్ ఇనిషియలైజేషన్ — డబుల్ కోట్స్ vs కర్లీ బ్రేసెస్</div>
    <div class="section-body">
      <p>C లో స్ట్రింగ్‌ను డిక్లేర్ చేయడానికి మరియు ప్రారంభించడానికి క్రింది పద్ధతులు ఉన్నాయి:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — String Initialization Methods</span>
          <div class="code-actions">
            <a class="try-btn" href="/online-c-compiler.html" target="_blank">▶ Run in Online C Compiler</a>
          </div>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main() {
    // పద్ధతి 1: డబుల్ కోట్స్ (సిఫార్సు చేయబడినది - '\\0' ఆటోమేటిక్‌గా చేరుతుంది!)
    char greeting[] = "నమస్కారం";

    // పద్ధతి 2: నిర్దిష్ట సైజుతో డబుల్ కోట్స్ (మిగిలిన గదులు 0 తో నిండుతాయి)
    char city[10] = "హైదరాబాద్";

    // పద్ధతి 3: విడివిడి క్యారెక్టర్స్ (⚠️ చివర '\\0' కచ్చితంగా మనమే రాయాలి!)
    char lang[] = {'C', ' ', 'P', 'r', 'o', 'g', '\\0'};

    printf("గ్రీటింగ్: %s\\n", greeting);
    printf("సిటీ    : %s\\n", city);
    printf("లాంగ్వేజ్: %s\\n", lang);

    return 0;
}</code></pre>
      </div>

      <h4 style="color:#ef4444; margin:18px 0 8px; font-size:15px;">⚠️ ప్రాణాంతక తేడా: char[] vs char* (Stack vs Read-Only Literal):</h4>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin:14px 0;">
        <div style="background:#f0fdf4; border:1px solid #bbf7d0; border-radius:8px; padding:14px;">
          <strong style="color:#10b981;">char str[] = "Hello"; (సురక్షితమైనది)</strong>
          <p style="font-size:13px; color:var(--text2); margin-top:6px; line-height:1.6;">
            ఇది స్టాక్ మెమరీపై సృష్టించబడిన సాధారణ క్యారెక్టర్ అర్రే. ఇందులో ఉన్న అక్షరాలను <code>str[0] = 'M';</code> అని స్వేచ్ఛగా మార్చవచ్చు!
          </p>
        </div>
        <div style="background:#fef2f2; border:1px solid #fecaca; border-radius:8px; padding:14px;">
          <strong style="color:#ef4444;">char *str = "Hello"; (రీడ్-ఓన్లీ డేంజర్!)</strong>
          <p style="font-size:13px; color:var(--text2); margin-top:6px; line-height:1.6;">
            ఇది RAM లోని Read-Only Text Segment లో నిల్వ అవుతుంది. దీనిలోని అక్షరాన్ని మార్చడానికి ప్రయత్నిస్తే ఆపరేటింగ్ సిస్టమ్ <strong>Segmentation Fault</strong> తో క్రాష్ చేస్తుంది!
          </p>
        </div>
      </div>
    </div>

    <!-- SECTION 5 -->
    <div class="section-title"><span class="num">5</span>స్ట్రింగ్ ఇన్‌పుట్ పద్ధతులు &amp; భద్రతా లోపాలు (scanf vs gets vs fgets)</div>
    <div class="section-body">
      <p>యూజర్ నుండి టెక్స్ట్‌ను చదవడం C లో అత్యంత వివాదాస్పదమైన అంశం. అనుభవం లేని బిగినర్స్ చేసే తప్పుల వలన సాఫ్ట్‌వేర్ ప్రపంచంలో బిలియన్ల డాలర్ల నష్టం జరిగింది:</p>

      <h4 style="color:#059669; margin:16px 0 8px; font-size:15px;">1. scanf("%s", str) లోని సమస్య:</h4>
      <p><code>scanf</code> అనేది మొదటి స్పేస్ (White Space) రాగానే చదవడం ఆపేస్తుంది! ఉదాహరణకు యూజర్ <em>"మన కంప్యూటర్"</em> అని టైప్ చేస్తే, కేవలం <em>"మన"</em> మాత్రమే చదువుతుంది, మిగిలినది వదిలేస్తుంది.</p>

      <h4 style="color:#ef4444; margin:16px 0 8px; font-size:15px;">2. నిషేధించబడిన gets() విపత్తు (The Banned gets Function):</h4>
      <p>గతంలో పూర్తి లైన్ చదవడానికి <code>gets(str)</code> వాడేవారు. కానీ దీనికి బఫర్ పరిమితి అంటూ ఏదీ ఉండదు! 10 సైజు ఉన్న అర్రేలోకి యూజర్ 100 అక్షరాలు టైప్ చేస్తే, అది మిగిలిన మెమరీని కరప్ట్ చేస్తుంది. దీనివలన 1988 లో ప్రసిద్ధ <em>Morris Worm</em> ఇంటర్నెట్‌ను స్తంభింపజేసింది! ఆధునిక <strong>C11 స్టాండర్డ్ లో gets() ని పూర్తిగా తొలగించారు</strong>.</p>

      <h4 style="color:#10b981; margin:16px 0 8px; font-size:15px;">3. ఆధునిక గోల్డెన్ స్టాండర్డ్: fgets()</h4>
      <p><code>fgets()</code> బఫర్ సైజును ఖచ్చితంగా గౌరవిస్తుంది మరియు స్పేసెస్‌తో కూడిన పూర్తి వాక్యాన్ని సురక్షితంగా చదువుతుంది:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Safe String Input using fgets</span>
          <div class="code-actions">
            <a class="try-btn" href="/online-c-compiler.html" target="_blank">▶ Run in Online C Compiler</a>
          </div>
        </div>
        <pre><code>#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main() {
    char fullName[50];

    printf("మీ పూర్తి పేరు నమోదు చేయండి: ");
    // గరిష్టంగా 50 బైట్లు మాత్రమే చదువుతుంది (బఫర్ ఓవర్‌ఫ్లో అసాధ్యం!)
    fgets(fullName, sizeof(fullName), stdin);

    // fgets చివర వచ్చే న్యూలైన్ '\\n' ని తొలగించే ఇంజనీరింగ్ ట్రిక్
    fullName[strcspn(fullName, "\\n")] = '\\0';

    printf("స్వాగతం, %s! మీ ఖాతా విజయవంతంగా లోడ్ అయింది.\\n", fullName);
    return 0;
}</code></pre>
      </div>
    </div>

    <!-- SECTION 6 -->
    <div class="section-title"><span class="num">6</span>సమగ్ర తులనాత్మక పట్టిక (&lt;string.h&gt; ఫంక్షన్లు)</div>
    <div class="section-body">
      <p>C స్టాండర్డ్ లైబ్రరీ <code>&lt;string.h&gt;</code> లోని ముఖ్యమైన ఫంక్షన్లను మరియు వాటి ఆధునిక సురక్షిత ప్రత్యామ్నాయాలను క్రింది పట్టికలో పరిశీలిద్దాం:</p>

      <table class="tbl">
        <thead>
          <tr>
            <th>ఫంక్షన్ పేరు</th>
            <th>ప్రాథమిక విధి</th>
            <th>రిటర్న్ టైప్</th>
            <th>భద్రతా హెచ్చరిక / ప్రో-టిప్</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>strlen(s)</code></td>
            <td>స్ట్రింగ్ లోని అక్షరాల సంఖ్యను లెక్కిస్తుంది.</td>
            <td><code>size_t</code> (పూర్ణాంకం)</td>
            <td>ఇది నల్ టెర్మినేటర్ <code>'\\0'</code> ను లెక్కింపులో కలపదు!</td>
          </tr>
          <tr>
            <td><code>strcpy(dest, src)</code></td>
            <td>ఒక స్ట్రింగ్‌ను మరొకదానిలోకి కాపీ చేస్తుంది.</td>
            <td><code>char*</code></td>
            <td>⚠️ <code>dest</code> సైజు చిన్నదైతే బఫర్ ఓవర్‌ఫ్లో వస్తుంది. <code>strncpy</code> వాడండి.</td>
          </tr>
          <tr>
            <td><code>strncpy(dest, src, n)</code></td>
            <td>గరిష్టంగా $n$ అక్షరాలను మాత్రమే సురక్షితంగా కాపీ చేస్తుంది.</td>
            <td><code>char*</code></td>
            <td>✅ సురక్షితమైనది; సైజు పరిమితిని దాటదు.</td>
          </tr>
          <tr>
            <td><code>strcat(dest, src)</code></td>
            <td>రెండు స్ట్రింగ్‌లను ఒకదాని వెనుక ఒకటి అతికిస్తుంది (Concatenate).</td>
            <td><code>char*</code></td>
            <td>⚠️ డెస్టినేషన్‌లో తగినంత ఖాళీ ఉండాలి. <code>strncat</code> మేలు.</td>
          </tr>
          <tr>
            <td><code>strcmp(s1, s2)</code></td>
            <td>రెండు స్ట్రింగ్‌లను డిక్షనరీ ఆర్డర్ ప్రకారం పోల్చుతుంది.</td>
            <td><code>int</code> (&lt;0, ==0, &gt;0)</td>
            <td>రెండు సమానమైతే <strong>0</strong> రిటర్న్ చేస్తుంది!</td>
          </tr>
          <tr>
            <td><code>strstr(haystack, needle)</code></td>
            <td>ఒక పెద్ద స్ట్రింగ్ లోపల చిన్న సబ్‌స్ట్రింగ్ ను వెతుకుతుంది.</td>
            <td><code>char*</code> (పాయింటర్)</td>
            <td>దొరికితే ఆ అడ్రస్ ఇస్తుంది; లేకపోతే <strong>NULL</strong> ఇస్తుంది.</td>
          </tr>
          <tr>
            <td><code>strtok(str, delim)</code></td>
            <td>స్ట్రింగ్‌ను టోకెన్లుగా (ముక్కలుగా) విడదీస్తుంది (CSV Parser).</td>
            <td><code>char*</code></td>
            <td>ఒరిజినల్ స్ట్రింగ్‌ను సవరిస్తుంది (Destructive).</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- SECTION 7 -->
    <div class="section-title"><span class="num">7</span>స్ట్రింగ్ పొడవు గణన — strlen() vs sizeof() వ్యత్యాసం</div>
    <div class="section-body">
      <p>ఇంటర్వ్యూలలో విద్యార్థులను బోల్తా కొట్టించే అత్యంత ప్రసిద్ధ ట్రిక్ ప్రశ్న: <code>strlen()</code> మరియు <code>sizeof()</code> ల మధ్య తేడా ఏమిటి?</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Comparing strlen and sizeof</span>
          <div class="code-actions">
            <a class="try-btn" href="/online-c-compiler.html" target="_blank">▶ Run in Online C Compiler</a>
          </div>
        </div>
        <pre><code>#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main() {
    char title[20] = "Telugu";

    // strlen: కేవలం అసలైన అక్షరాలను మాత్రమే లెక్కిస్తుంది ('\0' కి ముందు వరకు)
    printf("strlen(title) = %zu (అక్షరాల పొడవు)\\n", strlen(title));

    // sizeof: ఆ అర్రే కోసం RAM లో కేటాయించిన మొత్తం మెమరీ బైట్లను ఇస్తుంది
    printf("sizeof(title) = %zu (మొత్తం మెమరీ సైజు)\\n", sizeof(title));

    return 0;
}</code></pre>
      </div>

      <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px 18px; margin-top:14px; font-size:13.5px; color:var(--text2);">
        <strong>అవుట్‌పుట్ విశ్లేషణ:</strong><br>
        <code>strlen(title) = 6</code> ("Telugu" లో 6 అక్షరాలు ఉన్నాయి).<br>
        <code>sizeof(title) = 20</code> (మనం <code>char title[20]</code> అని డిక్లేర్ చేశాం కాబట్టి మొత్తం 20 బైట్లు కేటాయించబడింది).
      </div>
    </div>

    <!-- SECTION 8 -->
    <div class="section-title"><span class="num">8</span>స్ట్రింగ్ కాపీ &amp; కాన్‌క్యాటనేషన్ — strcpy vs strncpy</div>
    <div class="section-body">
      <p>C లో <code>str1 = str2;</code> అని స్ట్రింగ్‌లను నేరుగా కాపీ చేయలేము. ఎందుకంటే అర్రే పేర్లు స్థిరమైన పాయింటర్లు. దీనికోసం <code>strcpy()</code> లేదా మరింత సురక్షితమైన <code>strncpy()</code> వాడాలి:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — String Copy and Concatenation Demo</span>
          <div class="code-actions">
            <a class="try-btn" href="/online-c-compiler.html" target="_blank">▶ Run in Online C Compiler</a>
          </div>
        </div>
        <pre><code>#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main() {
    char source[] = "మన కంపైలర్";
    char destination[30];

    // 1. కాపీ చేయడం: source నుండి destination కి
    strcpy(destination, source);
    printf("కాపీ చేయబడిన స్ట్రింగ్: %s\\n", destination);

    // 2. కాన్‌క్యాటనేషన్ (అతికించడం): చివర కొత్త పదాన్ని కలపడం
    strcat(destination, " 2026");
    printf("అతికించిన తర్వాత: %s\\n", destination);

    return 0;
}</code></pre>
      </div>
    </div>

    <!-- SECTION 9 -->
    <div class="section-title"><span class="num">9</span>స్ట్రింగ్ కంపారిజన్ — strcmp() &amp; లెక్సికోగ్రాఫికల్ ఆర్డర్</div>
    <div class="section-body">
      <p>చాలామంది బిగినర్స్ రెండు స్ట్రింగ్‌లు సమానమా కాదా అని చూడటానికి <code>if (str1 == str2)</code> అని రాస్తుంటారు. ఇది <strong>పూర్తిగా తప్పు!</strong></p>

      <div style="background:#fef2f2; border:1px solid #fecaca; border-radius:8px; padding:12px 16px; margin:14px 0; color:#991b1b; font-size:13.5px;">
        ⚠️ <strong>== ఎందుకు పనిచేయదు?</strong> C లో స్ట్రింగ్ పేరు అనేది మెమరీ అడ్రస్. <code>str1 == str2</code> అని రాస్తే, అది అక్షరాలను పోల్చదు; ఆ రెండు అర్రేలు RAM లో ఒకే చిరునామాలో ఉన్నాయా లేదా అని పోల్చుతుంది! ఎల్లప్పుడూ రెండు వేర్వేరు అర్రేల అడ్రస్‌లు భిన్నంగా ఉంటాయి కాబట్టి ఫలితం ఫాల్స్ వస్తుంది!
      </div>

      <p>అక్షరాలను పోల్చడానికి కచ్చితంగా <strong><code>strcmp(s1, s2)</code></strong> ఉపయోగించాలి. ఇది అక్షరాల ASCII విలువల ఆధారంగా డిక్షనరీ ఆర్డర్‌లో పోలుస్తుంది:</p>

      <ul style="margin-left: 20px; color: var(--text2); font-size: 14px; line-height: 1.7;">
        <li><code>0</code> రిటర్న్ అయితే: రెండు స్ట్రింగ్‌లు <strong>ఖచ్చితంగా సమానం!</strong></li>
        <li><code>&lt; 0</code> (నెగెటివ్) అయితే: డిక్షనరీలో <code>s1</code> ముందు వస్తుంది.</li>
        <li><code>&gt; 0</code> (పాజిటివ్) అయితే: డిక్షనరీలో <code>s2</code> ముందు వస్తుంది.</li>
      </ul>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — String Comparison with strcmp</span>
          <div class="code-actions">
            <a class="try-btn" href="/online-c-compiler.html" target="_blank">▶ Run in Online C Compiler</a>
          </div>
        </div>
        <pre><code>#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main() {
    char pass1[] = "Secret@123";
    char pass2[] = "Secret@123";
    char pass3[] = "Admin@999";

    if (strcmp(pass1, pass2) == 0) {
        printf("✅ pass1 మరియు pass2 సరిగ్గా మ్యాచ్ అయ్యాయి!\\n");
    }

    if (strcmp(pass1, pass3) != 0) {
        printf("❌ pass1 మరియు pass3 వేర్వేరు పాస్‌వర్డ్‌లు!\\n");
    }

    return 0;
}</code></pre>
      </div>
    </div>

    <!-- SECTION 10 -->
    <div class="section-title"><span class="num">10</span>స్ట్రింగ్ టోకనైజేషన్ — strtok() తో CSV డేటా పార్సింగ్</div>
    <div class="section-body">
      <p>నిజ జీవితంలో ఒక కామాతో వేరు చేయబడిన ఫైల్ (CSV) లేదా వాక్యాన్ని పదాలుగా విడదీయవలసి వచ్చినప్పుడు <strong><code>strtok()</code></strong> అమితంగా ఉపయోగపడుతుంది:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Parsing CSV Data using strtok</span>
          <div class="code-actions">
            <a class="try-btn" href="/online-c-compiler.html" target="_blank">▶ Run in Online C Compiler</a>
          </div>
        </div>
        <pre><code>#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main() {
    // కామాలతో కూడిన విద్యార్థి రికార్డు: ID,Name,Course,City
    char record[] = "101,సురేష్ కుమార్,కంప్యూటర్ సైన్స్,విశాఖపట్నం";

    printf("=== CSV రికార్డ్ పార్సింగ్ (Parsing with strtok) ===\\n");
    char *token = strtok(record, ","); // మొదటి టోకెన్

    int fieldNum = 1;
    while (token != NULL) {
        printf("ఫీల్డ్ #%d: %s\\n", fieldNum++, token);
        token = strtok(NULL, ","); // తర్వాతి టోకెన్లను పొందడానికి NULL పాస్ చేయాలి!
    }

    return 0;
}</code></pre>
      </div>
    </div>

    <!-- SECTION 11 -->
    <div class="section-title"><span class="num">11</span>సమగ్ర రియల్ వరల్డ్ ప్రాజెక్ట్ — సెక్యూర్ లాగిన్ &amp; పాస్‌వర్డ్ ఆడిట్ ఇంజిన్</div>
    <div class="section-body">
      <p>ఇప్పటివరకు నేర్చుకున్న <code>fgets</code>, <code>strcmp</code>, <code>strlen</code>, మరియు క్యారెక్టర్ చెకింగ్ ఫంక్షన్స్ ఉపయోగించి ఒక కార్పొరేట్ <strong>సెక్యూర్ యూజర్ క్రెడెన్షియల్ ఆథెంటికేషన్ &amp; పాస్‌వర్డ్ స్ట్రెంగ్త్ చెకర్ (Security Engine)</strong> నిర్మిద్దాం:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Authentication &amp; Password Strength Auditor</span>
          <div class="code-actions">
            <a class="try-btn" href="/online-c-compiler.html" target="_blank">▶ Run in Online C Compiler</a>
          </div>
        </div>
        <pre><code>#include &lt;stdio.h&gt;
#include &lt;string.h&gt;
#include &lt;ctype.h&gt;

// పాస్‌వర్డ్ పటిష్టతను తనిఖీ చేసే ఫంక్షన్
int checkPasswordStrength(const char *pwd) {
    if (strlen(pwd) &lt; 8) {
        printf("⚠️ బలహీనమైన పాస్‌వర్డ్: కనీసం 8 అక్షరాలు ఉండాలి!\\n");
        return 0;
    }

    int hasUpper = 0, hasDigit = 0, hasSpecial = 0;
    for (int i = 0; pwd[i] != '\\0'; i++) {
        if (isupper(pwd[i])) hasUpper = 1;
        else if (isdigit(pwd[i])) hasDigit = 1;
        else if (ispunct(pwd[i])) hasSpecial = 1;
    }

    if (hasUpper &amp;&amp; hasDigit &amp;&amp; hasSpecial) {
        printf("💪 అద్భుతమైన పాస్‌వర్డ్: చాలా పటిష్టంగా ఉంది (Strong Password)!\\n");
        return 1;
    } else {
        printf("⚠️ మధ్యస్థ పాస్‌వర్డ్: క్యాపిటల్ లెటర్, నంబర్ మరియు స్పెషల్ క్యారెక్టర్ జోడించండి.\\n");
        return 0;
    }
}

int main() {
    const char correctUser[] = "admin_mana";
    const char correctPass[] = "Secure@2026";

    char enteredUser[32];
    char enteredPass[32];

    printf("====================================================\\n");
    printf("   మనా సెక్యూరిటీ పోర్టల్ లాగిన్ (Security Portal)\\n");
    printf("====================================================\\n");

    printf("యూజర్‌నేమ్: ");
    fgets(enteredUser, sizeof(enteredUser), stdin);
    enteredUser[strcspn(enteredUser, "\\n")] = '\\0'; // న్యూలైన్ తొలగింపు

    printf("పాస్‌వర్డ్ : ");
    fgets(enteredPass, sizeof(enteredPass), stdin);
    enteredPass[strcspn(enteredPass, "\\n")] = '\\0';

    printf("\\n[ఆడిట్] పాస్‌వర్డ్ పరిశీలన జరుగుతోంది...\\n");
    checkPasswordStrength(enteredPass);

    printf("----------------------------------------------------\\n");
    if (strcmp(enteredUser, correctUser) == 0 &amp;&amp; strcmp(enteredPass, correctPass) == 0) {
        printf("✅ లాగిన్ విజయవంతమైంది! సిస్టమ్ డాష్‌బోర్డ్ అన్‌లాక్ చేయబడింది.\\n");
    } else {
        printf("🚨 లాగిన్ విఫలమైంది: తప్పుడు యూజర్‌నేమ్ లేదా పాస్‌వర్డ్!\\n");
    }
    printf("====================================================\\n");

    return 0;
}</code></pre>
      </div>
    </div>

    <!-- SECTION 12 -->
    <div class="section-title"><span class="num">12</span>సాధారణంగా బిగినర్స్ చేసే టాప్ 5 స్ట్రింగ్ తప్పులు</div>
    <div class="section-body">
      <div style="display:grid; grid-template-columns:1fr; gap:12px; margin:14px 0;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:12px 16px;">
          <strong style="color:#ef4444;">1. '\\0' కోసం +1 బైట్ మర్చిపోవడం:</strong><br>
          <span style="color:var(--text2); font-size:13.5px;">"INDIA" కోసం <code>char s[5] = "INDIA";</code> అని రాస్తే నల్ టెర్మినేటర్ పట్టక బఫర్ ఓవర్‌ఫ్లో వస్తుంది. <code>char s[6]</code> తప్పనిసరి.</span>
        </div>
        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:12px 16px;">
          <strong style="color:#ef4444;">2. స్ట్రింగ్స్‌ను == ఆపరేటర్‌తో పోల్చడం:</strong><br>
          <span style="color:var(--text2); font-size:13.5px;"><code>if (s1 == s2)</code> అని రాస్తే అది అడ్రస్‌లను పోలుస్తుంది తప్ప కంటెంట్‌ను కాదు. ఎల్లప్పుడూ <code>strcmp()</code> వాడాలి.</span>
        </div>
        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:12px 16px;">
          <strong style="color:#ef4444;">3. నిషేధించబడిన gets() ఫంక్షన్‌ను ఇంకా వాడటం:</strong><br>
          <span style="color:var(--text2); font-size:13.5px;"><code>gets()</code> తీవ్రమైన సెక్యూరిటీ బగ్. దాని స్థానంలో ఎల్లప్పుడూ సురక్షితమైన <code>fgets()</code> మాత్రమే వాడాలి.</span>
        </div>
        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:12px 16px;">
          <strong style="color:#ef4444;">4. రీడ్-ఓన్లీ స్ట్రింగ్ లిటరల్‌ను సవరించాలనుకోవడం:</strong><br>
          <span style="color:var(--text2); font-size:13.5px;"><code>char *p = "Hello"; p[0] = 'M';</code> అని రాస్తే ఆపరేటింగ్ సిస్టమ్ సెగ్మెంటేషన్ ఫాల్ట్ ఇస్తుంది. మార్పుల కోసం <code>char p[]</code> వాడాలి.</span>
        </div>
        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:12px 16px;">
          <strong style="color:#ef4444;">5. డెస్టినేషన్ సైజు చెక్ చేయకుండా strcpy వాడటం:</strong><br>
          <span style="color:var(--text2); font-size:13.5px;">చిన్న అర్రేలోకి పెద్ద స్ట్రింగ్‌ను కాపీ చేస్తే మెమరీ కరప్ట్ అవుతుంది. పరిమితిని నిర్దేశించే <code>strncpy</code> వాడటం ఉత్తమం.</span>
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
          ❓ ప్రశ్న 1: C స్ట్రింగ్స్ లో నల్ టెర్మినేటర్ '\\0' యొక్క పాత్ర ఏమిటి?
        </summary>
        <div style="margin-top:10px; color:var(--text2); font-size:14px; line-height:1.6;">
          <strong>సమాధానం:</strong> C లో క్యారెక్టర్ అర్రే ఎక్కడ ముగిసిందో గుర్తించడానికి <code>'\\0'</code> (ASCII 0) ను ముగింపు చిహ్నంగా ఉపయోగిస్తారు. ఇది లేకపోతే స్ట్రింగ్ ఫంక్షన్లు మెమరీలో ఆగకుండా గార్బేజ్ డేటాను చదువుతాయి.
        </div>
      </details>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:700; cursor:pointer; color:#059669;">
          ❓ ప్రశ్న 2: strlen("Hello\\0World") యొక్క అవుట్‌పుట్ ఎంత వస్తుంది?
        </summary>
        <div style="margin-top:10px; color:var(--text2); font-size:14px; line-height:1.6;">
          <strong>సమాధానం:</strong> సరిగ్గా <strong>5</strong> వస్తుంది! ఎందుకంటే <code>strlen()</code> మొదటి <code>'\\0'</code> తారసపడగానే లెక్కింపును ఆపేస్తుంది. ఆ తర్వాత ఉన్న "World" ను విస్మరిస్తుంది.
        </div>
      </details>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:700; cursor:pointer; color:#059669;">
          ❓ ప్రశ్న 3: C11 స్టాండర్డ్ లో gets() ఫంక్షన్‌ను ఎందుకు పూర్తిగా తొలగించారు?
        </summary>
        <div style="margin-top:10px; color:var(--text2); font-size:14px; line-height:1.6;">
          <strong>సమాధానం:</strong> <code>gets()</code> కు బఫర్ సైజు పరిమితిని తనిఖీ చేసే సామర్థ్యం లేదు. ఇది తీవ్రమైన బఫర్ ఓవర్‌ఫ్లో సెక్యూరిటీ లోపాలకు దారితీస్తుంది కాబట్టి C11 నుండి శాశ్వతంగా నిషేధించారు.
        </div>
      </details>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:700; cursor:pointer; color:#059669;">
          ❓ ప్రశ్న 4: strcmp(s1, s2) రెండు స్ట్రింగ్‌లు సమానమైనప్పుడు ఏ విలువను రిటర్న్ చేస్తుంది?
        </summary>
        <div style="margin-top:10px; color:var(--text2); font-size:14px; line-height:1.6;">
          <strong>సమాధానం:</strong> సరిగ్గా <strong>0</strong> (Zero) ను రిటర్న్ చేస్తుంది.
        </div>
      </details>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:700; cursor:pointer; color:#059669;">
          ❓ ప్రశ్న 5: char str[10] = "Code"; ఉన్నప్పుడు sizeof(str) మరియు strlen(str) విలువల తేడా ఏమిటి?
        </summary>
        <div style="margin-top:10px; color:var(--text2); font-size:14px; line-height:1.6;">
          <strong>సమాధానం:</strong> <code>strlen(str) = 4</code> (అసలైన అక్షరాలు); <code>sizeof(str) = 10</code> (అర్రేకు కేటాయించిన మొత్తం మెమరీ బైట్లు).
        </div>
      </details>

      <!-- TRY BOX -->
      <div class="try-box" style="margin-top:24px;">
        <div class="try-title">🚀 లాగిన్ ఆథెంటికేషన్ &amp; CSV టోకనైజర్‌ను మన ఆన్‌లైన్ C కంపైలర్‌లో రన్ చేయండి!</div>
        <p>పైన వివరించిన <code>పాస్‌వర్డ్ స్ట్రెంగ్త్ చెకర్</code> మరియు <code>strtok CSV పార్సర్</code> కోడ్‌లను మన ఆన్‌లైన్ C కంపైలర్‌లో ఓపెన్ చేసి స్వయంగా రన్ చేయండి. మీ స్వంత యూజర్ క్రెడెన్షియల్స్‌తో టెస్ట్ చేసి ఆనందించండి!</p>
        <a class="run-btn" href="/online-c-compiler.html" target="_blank">
          👉 Our Compiler లో C Compiler try చేయండి
        </a>
      </div>

      <div style="margin-top:24px;">
        <h4 style="color:#059669; font-size:16px; margin-bottom:10px;">📌 అధ్యాయ సారాంశం (Quick Summary):</h4>
        <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.7;">
          <li><strong>C స్ట్రింగ్స్:</strong> నల్ టెర్మినేటర్ <code>'\\0'</code> తో ముగిసే క్యారెక్టర్ల అర్రే.</li>
          <li><strong>+1 బైట్ రూల్:</strong> ఏ పదానికైనా అదనంగా 1 బైట్ <code>'\\0'</code> కోసం కేటాయించాలి.</li>
          <li><strong>సేఫ్ ఇన్‌పుట్:</strong> <code>scanf</code> మరియు <code>gets</code> బదులుగా ఎల్లప్పుడూ <code>fgets()</code> వాడాలి.</li>
          <li><strong>&lt;string.h&gt;:</strong> <code>strlen</code> (పొడవు), <code>strcpy</code> (కాపీ), <code>strcat</code> (కలపడం), <code>strcmp</code> (పోల్చడం).</li>
          <li><strong>స్ట్రింగ్ లిటరల్స్:</strong> <code>char *s = "Hello"</code> రీడ్-ఓన్లీ మెమరీలో ఉంటుంది, సవరించకూడదు.</li>
        </ul>
      </div>

      <div style="margin-top:20px; padding:16px; background:var(--bg2); border-left:4px solid #10b981; border-radius:0 8px 8px 0;">
        <strong>తర్వాతి అధ్యాయంలో (Chapter 15):</strong> C ప్రోగ్రామింగ్‌కే అత్యంత శక్తివంతమైన కిరీటం లాంటి <strong>పాయింటర్లు (Pointers Basics, అడ్రస్ ఆపరేటర్లు &amp; పాయింటర్ అరిథ్‌మెటిక్)</strong> గురించి అద్భుతంగా నేర్చుకుందాం!
      </div>
    </div>

    <!-- PREV / NEXT NAVIGATION -->
    <div style="display:flex; justify-content:space-between; align-items:center; margin-top:40px; padding-top:20px; border-top:1px solid var(--border); flex-wrap:wrap; gap:16px;">
      <a href="/blog-c/13-c-arrays-1d-and-2d-matrices.html" style="display:inline-flex; align-items:center; gap:8px; padding:10px 18px; border-radius:8px; background:var(--bg3); border:1px solid var(--border); color:var(--text); text-decoration:none; font-weight:700; font-size:13.5px;">
        ← Prev: 13. అర్రేలు &amp; 2D Matrices
      </a>
      <a href="/blog-c/15-c-pointers-basics-and-address-arithmetic.html" style="display:inline-flex; align-items:center; gap:8px; padding:10px 20px; border-radius:8px; background:linear-gradient(135deg, #10b981, #059669); color:#ffffff; text-decoration:none; font-weight:700; font-size:13.5px; box-shadow:0 2px 10px rgba(16,185,129,0.2);">
        Next: 15. పాయింటర్లు: బేసిక్స్ →
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
  <title>C స్ట్రింగ్స్ (Character Arrays, '\0' Null Terminator & <string.h>) — Modern C Tutorial | Our Compiler</title>
  <meta name="description" content="C స్ట్రింగ్స్ సమగ్ర తెలుగు గైడ్: '\\0' నల్ టెర్మినేటర్ సీక్రెట్, fgets vs gets సేఫ్టీ, strlen vs sizeof, strcmp, strtok CSV పార్సింగ్, సెక్యూర్ లాగిన్ ప్రాజెక్ట్." />
  <meta name="keywords" content="c strings in telugu, c null terminator, string h functions c, c fgets buffer overflow, c strcmp, our compiler" />
  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />
  <link rel="icon" type="image/png" href="/logo.png" />
  <link rel="canonical" href="https://www.ourcompiler.com/blog-c/14-c-strings-character-arrays-string-h.html" />
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
    "headline": "C స్ట్రింగ్స్ (Character Arrays, '\\0' Null Terminator & <string.h>) (C Programming in Telugu)",
    "description": "'\\0' నల్ టెర్మినేటర్ సీక్రెట్, fgets vs gets సేఫ్టీ, strlen vs sizeof, strcmp, strtok CSV పార్సింగ్, సెక్యూర్ లాగిన్ ప్రాజెక్ట్",
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

const outputPath = path.join(__dirname, '..', 'public', 'blog-c', '14-c-strings-character-arrays-string-h.html');
fs.writeFileSync(outputPath, fullHtml, 'utf8');

console.log('✅ Successfully generated deep high-value C Chapter 14!');
console.log('Target file size:', fullHtml.length, 'characters');

