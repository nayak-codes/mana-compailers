const fs = require('fs');
const path = require('path');
const { LESSONS, buildSidebar } = require('./c_curriculum_data.js');

const lesson = LESSONS.find(l => l.num === 15);
const sidebarHtml = buildSidebar(15);

const chapterContentHtml = `
    <!-- BREADCRUMB -->
    <div class="breadcrumb">
      <a href="/">Home</a><span class="sep">›</span>
      <a href="/blog.html">Tutorials</a><span class="sep">›</span>
      <a href="/blog-c.html">C Masterclass</a><span class="sep">›</span>
      <span class="current">Chapter 15: పాయింటర్లు — బేసిక్స్, అడ్రస్లు &amp; Dereferencing</span>
    </div>

    <!-- PAGE TITLE -->
    <h1 class="page-title">C పాయింటర్లు: బేసిక్స్, మెమరీ అడ్రస్లు &amp; Dereferencing (*, &amp;)</h1>

    <!-- PAGE META BADGES -->
    <div class="page-meta">
      <span class="badge">⚡ Modern C (C99 / C11 / C17 Standards)</span>
      <span class="badge">🟢 Chapter 15 of 20</span>
      <span class="badge">📂 Phase 04: అర్రేస్, స్ట్రింగ్స్ &amp; పాయింటర్లు</span>
      <span class="badge">📅 2026 Academic Edition</span>
    </div>

    <!-- SUBTOPICS PILL BAR -->
    <div style="background:var(--bg3); border:1px solid var(--border); border-radius:8px; padding:10px 16px; margin-bottom:24px; font-size:13px; color:var(--text2); display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
      <span style="color:#10b981; font-weight:700;">📌 Covered in this chapter:</span>
      <span>హోటల్ కీ-కార్డు ఎనాలజీ · RAM హెక్సాడెసిమల్ అడ్రస్లు · 64-bit 8-బైట్ల పాయింటర్ సైజు · &amp; vs * ఆపరేటర్లు · పాయింటర్ అరిథ్‌మెటిక్ (ptr + 1) స్కేల్ ఫ్యాక్టర్ · void* జెనెరిక్ పాయింటర్లు · NULL, Wild, Dangling పాయింటర్లు · const పాయింటర్లు · RAM మెమరీ ఇన్‌స్పెక్టర్ ప్రాజెక్ట్ · ఇంటరాక్టివ్ క్విజ్</span>
    </div>

    <!-- INTRO ACCENT BOX (Warm Ivory with Green Accent) -->
    <div class="intro-box">
      <p>ఒక పెద్ద 5-స్టార్ లగ్జరీ హోటల్‌ను ఊహించుకోండి. అందులో 500 గదులు ఉన్నాయి. గది నంబర్ 304 లో ఒక అమూల్యమైన బంగారు లాకెట్ లేదా నగదు భద్రపరచబడి ఉందనుకుందాం (Variable Value). మీరు ఆ నగదును మీ జేబులో పెట్టుకుని ఊరంతా తిరగడం బరువైనది, ప్రమాదకరమైనది. దానికి బదులుగా, మీ చేతిలో <em>"Room #304"</em> అని రాసి ఉన్న ఒక చిన్న ప్లాస్టిక్ <strong>కీ-కార్డు (Electronic Key Card)</strong> ఉంటే సరిపోతుంది కదా!</p>
      <p>ఆ ప్లాస్టిక్ కీ-కార్డులో బంగారం ఉండదు; కానీ బంగారం దాగి ఉన్న గది యొక్క <strong>చిరునామా (Room Address)</strong> ఉంటుంది. మీరు ఆ కార్డును తీసుకెళ్లి రూమ్ నంబర్ 304 తలుపు వద్ద స్వైప్ చేస్తే — తాళం తెరుచుకుని లోపల ఉన్న అసలైన నగదు మీ చేతికి అందుతుంది. కంప్యూటర్ సైన్స్‌లో C పాయింటర్లు సరిగ్గా ఇలాగే పనిచేస్తాయి:</p>
      <ul style="margin:8px 0 0 20px; color:var(--text2); font-size:14px; line-height:1.7;">
        <li>రూమ్ లోపల ఉన్న నగదు = <strong>వేరియబుల్ విలువ (Value)</strong></li>
        <li>హోటల్ రూమ్ నంబర్ = <strong>మెమరీ అడ్రస్ (&amp; ఆపరేటర్)</strong></li>
        <li>ప్లాస్టిక్ కీ-కార్డు = <strong>పాయింటర్ వేరియబుల్ (Pointer Variable)</strong></li>
        <li>కార్డు ద్వారా తలుపు తెరిచి లోపలి నగదును అందుకోవడం = <strong>డిరిఫరెన్సింగ్ (* ఆపరేటర్)</strong>!</li>
      </ul>
      <p style="margin-top:8px;">పాయింటర్లపై సంపూర్ణ పట్టు సాధించిన రోజే మీరు నిజమైన C ప్రోగ్రామర్‌గా అవతరిస్తారు. ఈ పదిహేనవ అధ్యాయంలో, పాయింటర్ల అంతర్గత నిర్మాణం, <strong>పాయింటర్ అరిథ్‌మెటిక్ (Pointer Arithmetic Scale Factor)</strong>, వైల్డ్ &amp; డాంగ్లింగ్ పాయింటర్లు, మరియు సిస్టమ్ RAM మెమరీని లోతుగా శోధించే <strong>మెమరీ ఇన్‌స్పెక్టర్ టూల్‌ను</strong> సమగ్రంగా నిర్మిద్దాం!</p>
    </div>

    <!-- SECTION 1 -->
    <div class="section-title"><span class="num">1</span>ఈ Chapter లో మీరు నేర్చుకునే సమగ్ర అంశాలు (Roadmap)</div>
    <div class="section-body">
      <p>సిస్టమ్స్ ప్రోగ్రామింగ్, ఆపరేటింగ్ సిస్టమ్ కెర్నల్స్ మరియు హై-పెర్ఫార్మెన్స్ సాఫ్ట్‌వేర్లలో పాయింటర్లు అనేవి గుండెకాయ లాంటివి. ఈ అధ్యాయంలో కవర్ చేయబడే ప్రధానాంశాలు:</p>
      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.7;">
        <li><strong>పాయింటర్ ప్రాథమిక నిర్వచనం:</strong> మరొక వేరియబుల్ యొక్క మెమరీ అడ్రస్‌ను భద్రపరిచే ప్రత్యేక వేరియబుల్.</li>
        <li><strong>RAM మెమరీ మోడల్ &amp; హెక్సాడెసిమల్ అడ్రస్లు:</strong> <code>%p</code> ఫార్మాట్ స్పెసిఫైయర్ మరియు 64-బిట్ ఆర్కిటెక్చర్‌లో 8 బైట్ల పాయింటర్ సైజు.</li>
        <li><strong>రెండు మేజికల్ ఆపరేటర్లు:</strong> <code>&amp;</code> (Address-Of) మరియు <code>*</code> (Dereference / Indirection).</li>
        <li><strong>పాయింటర్ల డిక్లరేషన్ &amp; ఇనిషియలైజేషన్:</strong> <code>int *ptr = &amp;x;</code> సింటాక్స్ అనాటమీ.</li>
        <li><strong>పాయింటర్ అరిథ్‌మెటిక్ రహస్యం:</strong> <code>ptr + 1</code> అంటే 1 బైట్ కలపడం కాదు! డేటా టైప్ సైజు ఆధారంగా స్కేలింగ్ జరిగే విధానం.</li>
        <li><strong>పాయింటర్ సబ్‌ట్రాక్షన్ (Pointer Difference):</strong> రెండు పాయింటర్ల మధ్య తీసివేత ఫలితం <code>ptrdiff_t</code>.</li>
        <li><strong>సమగ్ర తులనాత్మక పట్టిక:</strong> పాయింటర్ల రకాలు (Normal, NULL, Void, Wild, Dangling).</li>
        <li><strong>జెనెరిక్ పాయింటర్లు (void* Pointers):</strong> ఏ డేటా టైప్ అడ్రస్‌నైనా పట్టుకునే సార్వత్రిక పాయింటర్ &amp; టైప్ కాస్టింగ్.</li>
        <li><strong>ప్రమాదకరమైన 4 పాయింటర్ బగ్స్:</strong> NULL Pointer, Wild Pointer, Dangling Pointer, మరియు Memory Leaks.</li>
        <li><strong>const కీవర్డ్ మరియు పాయింటర్లు:</strong> Pointer to Const vs Const Pointer మధ్య ఉన్న కీలక వ్యత్యాసం.</li>
        <li><strong>సమగ్ర రియల్ వరల్డ్ ప్రాజెక్ట్:</strong> RAM మెమరీ హెక్స్ డంపర్ &amp; బైట్-బై-బైట్ వేరియబుల్ ఇన్‌స్పెక్టర్.</li>
        <li><strong>బిగినర్స్ చేసే టాప్ 5 పాయింటర్ తప్పులు:</strong> <code>*</code> లేకుండా అసైన్‌మెంట్, అన్‌ఇనిషియలైజ్డ్ పాయింటర్ డిరిఫరెన్స్, ఆపరేటర్ ప్రిసిడెన్స్.</li>
        <li><strong>స్వీయ మూల్యాంకన క్విజ్:</strong> 5 లోతైన ప్రాక్టికల్ ప్రశ్నలు &amp; గేట్ ఎగ్జామ్ కాన్సెప్ట్స్.</li>
      </ul>
    </div>

    <!-- SECTION 2 -->
    <div class="section-title"><span class="num">2</span>RAM మెమరీ ఆర్కిటెక్చర్ &amp; హెక్సాడెసిమల్ అడ్రస్లు</div>
    <div class="section-body">
      <p>కంప్యూటర్ RAM (Random Access Memory) ని వేలాది చిన్న చిన్న బైట్ల గదులుగా ఊహించుకోండి. ప్రతి 1 బైట్ మెమరీ గదికి ఒక ప్రత్యేకమైన సంఖ్య ఉంటుంది, దానినే <strong>మెమరీ అడ్రస్ (Memory Address)</strong> అంటారు. కంప్యూటర్లలో ఈ చిరునామాలను చదవడానికి సులభంగా ఉండటానికి <strong>హెక్సాడెసిమల్ (Hexadecimal - Base 16: 0x...)</strong> ఫార్మాట్‌లో సూచిస్తారు.</p>

      <div style="background:var(--bg2); border:1px solid var(--border); border-radius:10px; padding:18px; margin:16px 0;">
        <h4 style="color:#059669; margin:0 0 8px; font-size:15px;">పాయింటర్ సైజు ఆర్కిటెక్చర్ నియమం:</h4>
        <p style="color:var(--text2); font-size:14px; line-height:1.7; margin:0;">
          ఒక పాయింటర్ <code>char*</code> అయినా, <code>int*</code> అయినా, లేదా <code>double*</code> అయినా — <strong>అన్ని పాయింటర్ల సైజు ఒకేలా ఉంటుంది!</strong> ఎందుకంటే పాయింటర్ కేవలం మెమరీ అడ్రస్‌ను మాత్రమే నిల్వ చేస్తుంది. 
          ఆధునిక <strong>64-బిట్ ఆపరేటింగ్ సిస్టమ్‌లలో పాయింటర్ సైజు ఎల్లప్పుడూ సరిగ్గా 8 బైట్లు (64 bits)</strong> ఉంటుంది! పాత 32-బిట్ సిస్టమ్‌లలో 4 బైట్లు (32 bits) ఉంటుంది.
        </p>
      </div>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Memory Address &amp; Pointer Size Demo</span>
          <div class="code-actions">
            <a class="try-btn" href="/online-c-compiler.html" target="_blank">▶ Run in Online C Compiler</a>
          </div>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main() {
    int age = 25;
    double salary = 75000.50;
    char grade = 'A';

    // పాయింటర్లు
    int *pAge = &amp;age;
    double *pSalary = &amp;salary;
    char *pGrade = &amp;grade;

    printf("=== వేరియబుల్స్ &amp; వాటి మెమరీ చిరునామాలు (%p ఫార్మాట్) ===\\n");
    printf("age విలువ: %d        | మెమరీ అడ్రస్: %p\\n", age, (void*)pAge);
    printf("salary విలువ: %.2f | మెమరీ అడ్రస్: %p\\n", salary, (void*)pSalary);
    printf("grade విలువ: %c         | మెమరీ అడ్రస్: %p\\n", grade, (void*)pGrade);

    printf("\\n=== అన్ని రకాల పాయింటర్ల మెమరీ సైజు (sizeof) ===\\n");
    printf("sizeof(int*)    = %zu బైట్లు\\n", sizeof(pAge));
    printf("sizeof(double*) = %zu బైట్లు\\n", sizeof(pSalary));
    printf("sizeof(char*)   = %zu బైట్లు\\n", sizeof(pGrade));

    return 0;
}</code></pre>
      </div>
    </div>

    <!-- SECTION 3 -->
    <div class="section-title"><span class="num">3</span>రెండు మేజికల్ ఆపరేటర్లు — &amp; (Address-Of) మరియు * (Dereference)</div>
    <div class="section-body">
      <p>పాయింటర్ల ప్రపంచంలో మొత్తం నియంత్రణ కేవలం రెండే రెండు ఆపరేటర్ల చేతుల్లో ఉంటుంది:</p>

      <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin:16px 0;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #10b981; border-radius:0 8px 8px 0; padding:16px;">
          <h4 style="color:#059669; margin:0 0 8px; font-size:15px;">1. &amp; ఆపరేటర్ (Address-Of)</h4>
          <p style="color:var(--text2); font-size:13.5px; line-height:1.6; margin:0;">
            ఒక సాధారణ వేరియబుల్ ముందు <code>&amp;</code> ఉంచితే, అది ఆ వేరియబుల్ ఉన్న <strong>మెమరీ చిరునామాను</strong> అందిస్తుంది. (ఉదా: <code>&amp;x</code> ➔ <code>0x7ffee1b2c458</code>).
          </p>
        </div>
        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #2563eb; border-radius:0 8px 8px 0; padding:16px;">
          <h4 style="color:#2563eb; margin:0 0 8px; font-size:15px;">2. * ఆపరేటర్ (Dereference / Value-At)</h4>
          <p style="color:var(--text2); font-size:13.5px; line-height:1.6; margin:0;">
            ఒక పాయింటర్ వేరియబుల్ ముందు <code>*</code> ఉంచితే, అది ఆ చిరునామా లోపలికి నేరుగా వెళ్లి <strong>అక్కడ ఉన్న అసలైన విలువను</strong> చదవడానికి లేదా మార్చడానికి అనుమతిస్తుంది.
          </p>
        </div>
      </div>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Modifying Value via Dereferencing</span>
          <div class="code-actions">
            <a class="try-btn" href="/online-c-compiler.html" target="_blank">▶ Run in Online C Compiler</a>
          </div>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main() {
    int target = 100;
    int *ptr = &amp;target; // ptr ఇప్పుడు target యొక్క మెమరీ అడ్రస్ ని పట్టుకుంది

    printf("ప్రారంభ విలువ: target = %d\\n", target);

    // *ptr ద్వారా అసలైన వేరియబుల్ లోని విలువను సవరిస్తున్నాం!
    *ptr = 250;

    printf("సవరించిన తర్వాత: target = %d (మారిపోయింది!)\\n", target);
    printf("పాయింటర్ ద్వారా చదివిన విలువ: *ptr = %d\\n", *ptr);

    return 0;
}</code></pre>
      </div>
    </div>

    <!-- SECTION 4 -->
    <div class="section-title"><span class="num">4</span>పాయింటర్ అరిథ్‌మెటిక్ రహస్యం (Pointer Arithmetic Scale Factor)</div>
    <div class="section-body">
      <p>చాలా మంది కొత్త ప్రోగ్రామర్లకు ఆశ్చర్యం కలిగించే అంశం ఇది: సాధారణ సంఖ్యలకు <code>1</code> కలిపితే 1 పెరుగుతుంది. కానీ <strong>పాయింటర్‌కు 1 కలిపితే (<code>ptr + 1</code>) అది 1 బైట్ పెరగదు!</strong></p>

      <div style="background:var(--bg2); border:1px solid var(--border); border-radius:10px; padding:18px; margin:16px 0;">
        <h4 style="color:#059669; margin:0 0 8px; font-size:15px;">ది స్కేల్ ఫ్యాక్టర్ ఫార్ములా (Scale Factor Formula):</h4>
        <p style="color:var(--text2); font-size:14px; line-height:1.7; margin:0;">
          పాయింటర్ అరిథ్‌మెటిక్ ఎల్లప్పుడూ ఆ పాయింటర్ పాయింట్ చేస్తున్న <strong>డేటా టైప్ పరిమాణం (Data Type Size)</strong> ఆధారంగా స్కేల్ అవుతుంది:
        </p>
        $$\text{New Address} = \text{Current Address} + \Big( n \times \text{sizeof(DataType)} \Big)$$
      </div>

      <ul style="margin-left: 20px; color: var(--text2); font-size: 14px; line-height: 1.7;">
        <li><code>char *p;  p + 1</code> ➔ అడ్రస్ సరిగ్గా <strong>1 బైట్</strong> పెరుగుతుంది (sizeof(char) = 1).</li>
        <li><code>int *p;   p + 1</code> ➔ అడ్రస్ సరిగ్గా <strong>4 బైట్లు</strong> ముందుకు దూకుతుంది (sizeof(int) = 4).</li>
        <li><code>double *p; p + 1</code> ➔ అడ్రస్ సరిగ్గా <strong>8 బైట్లు</strong> ముందుకు దూకుతుంది (sizeof(double) = 8).</li>
      </ul>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Pointer Arithmetic Scaling Verification</span>
          <div class="code-actions">
            <a class="try-btn" href="/online-c-compiler.html" target="_blank">▶ Run in Online C Compiler</a>
          </div>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main() {
    int arr[3] = {10, 20, 30};
    int *p = &amp;arr[0]; // మొదటి ఎలిమెంట్ అడ్రస్

    printf("ప్రారంభ అడ్రస్ p       = %p (arr[0] = %d)\\n", (void*)p, *p);
    p = p + 1; // 4 బైట్లు ముందుకు దూకుతుంది!
    printf("p + 1 తర్వాత అడ్రస్ p  = %p (arr[1] = %d)\\n", (void*)p, *p);
    p = p + 1; // మరో 4 బైట్లు ముందుకు దూకుతుంది!
    printf("p + 1 తర్వాత అడ్రస్ p  = %p (arr[2] = %d)\\n", (void*)p, *p);

    return 0;
}</code></pre>
      </div>
    </div>

    <!-- SECTION 5 -->
    <div class="section-title"><span class="num">5</span>పాయింటర్ల మధ్య తీసివేత &amp; పోలికలు (Pointer Subtraction)</div>
    <div class="section-body">
      <p>C లో రెండు పాయింటర్లను కూడటం (Addition: <code>p1 + p2</code>) చట్టవిరుద్ధం, ఎందుకంటే రెండు మెమరీ అడ్రస్‌లను కూడితే వచ్చే చిరునామాకు ఏ అర్థం ఉండదు. కానీ <strong>రెండు పాయింటర్లను తీసివేయడం (Subtraction: <code>p2 - p1</code>) ఖచ్చితంగా చెల్లుతుంది!</strong></p>

      <div style="background:var(--bg3); border-left:4px solid #10b981; padding:14px 18px; border-radius:0 8px 8px 0; margin:14px 0; font-size:14px; color:var(--text2);">
        <strong>💡 పాయింటర్ తీసివేత ఫలితం:</strong> ఒకే అర్రేకు చెందిన రెండు పాయింటర్లను తీసివేస్తే, బైట్ల సంఖ్య రాదు; వాటి మధ్య <strong>ఎన్ని ఎలిమెంట్స్ ఉన్నాయో</strong> ఆ సంఖ్య వస్తుంది! C లో ఈ ఫలితాన్ని <code>ptrdiff_t</code> అనే స్పెషల్ ఇంటిజర్ టైప్‌లో నిల్వ చేస్తారు.
      </div>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Pointer Subtraction (Distance Between Pointers)</span>
          <div class="code-actions">
            <a class="try-btn" href="/online-c-compiler.html" target="_blank">▶ Run in Online C Compiler</a>
          </div>
        </div>
        <pre><code>#include &lt;stdio.h&gt;
#include &lt;stddef.h&gt;

int main() {
    int numbers[] = {100, 200, 300, 400, 500};

    int *ptrStart = &amp;numbers[0]; // ఇండెక్స్ 0
    int *ptrEnd = &amp;numbers[4];   // ఇండెక్స్ 4

    // రెండు పాయింటర్ల మధ్య దూరం
    ptrdiff_t diff = ptrEnd - ptrStart;

    printf("ptrStart అడ్రస్: %p\\n", (void*)ptrStart);
    printf("ptrEnd అడ్రస్  : %p\\n", (void*)ptrEnd);
    printf("రెండు పాయింటర్ల మధ్య ఎలిమెంట్స్ సంఖ్య: %td\\n", diff);

    return 0;
}</code></pre>
      </div>
    </div>

    <!-- SECTION 6 -->
    <div class="section-title"><span class="num">6</span>సమగ్ర తులనాత్మక పట్టిక (పాయింటర్ల రకాలు)</div>
    <div class="section-body">
      <p>C ప్రోగ్రామింగ్‌లో కనిపించే వివిధ రకాల పాయింటర్ల సమగ్ర విశ్లేషణ:</p>

      <table class="tbl">
        <thead>
          <tr>
            <th>పాయింటర్ రకం</th>
            <th>నిర్వచనం / అర్థం</th>
            <th>ప్రవర్తన / లక్షణం</th>
            <th>భద్రతా స్థితి</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>సాధారణ పాయింటర్ (Typed Pointer)</strong></td>
            <td>నిర్దిష్ట డేటా టైప్‌కు చెందిన అడ్రస్ పట్టుకుంటుంది (ఉదా: <code>int*</code>).</td>
            <td>స్కేల్ ఫ్యాక్టర్ ప్రకారం అరిథ్‌మెటిక్ నడుస్తుంది.</td>
            <td>✅ సురక్షితమైనది</td>
          </tr>
          <tr>
            <td><strong>NULL పాయింటర్</strong></td>
            <td>ఎటువంటి చెల్లుబాటు అయ్యే మెమరీకి పాయింట్ చేయదు (<code>ptr = NULL;</code>).</td>
            <td>సురక్షితమైన గ్రౌండింగ్; డిరిఫరెన్స్ చేయకూడదు.</td>
            <td>✅ అత్యంత సురక్షితం</td>
          </tr>
          <tr>
            <td><strong>Void పాయింటర్ (Generic)</strong></td>
            <td>ఏ డేటా టైప్ అడ్రస్‌నైనా పట్టుకునే సార్వత్రిక పాయింటర్ (<code>void*</code>).</td>
            <td>డిరిఫరెన్స్ చేయడానికి టైప్ కాస్టింగ్ తప్పనిసరి.</td>
            <td>✅ జాగ్రత్తగా వాడాలి</td>
          </tr>
          <tr>
            <td><strong>వైల్డ్ పాయింటర్ (Wild Pointer)</strong></td>
            <td>ఇనిషియలైజ్ చేయకుండా వదిలేసిన పాయింటర్ (Garbage address).</td>
            <td>ఏ అడ్రస్ కి వెళ్తుందో తెలీక మెమరీ క్రాష్ చేస్తుంది.</td>
            <td>🚨 అత్యంత ప్రమాదకరం!</td>
          </tr>
          <tr>
            <td><strong>డాంగ్లింగ్ పాయింటర్ (Dangling)</strong></td>
            <td>మెమరీ డిలీట్ అయిన తర్వాత కూడా ఆ పాత అడ్రస్‌నే పట్టుకున్న పాయింటర్.</td>
            <td>యూజ్-ఆఫ్టర్-ఫ్రీ (Use-After-Free) సెక్యూరిటీ బగ్.</td>
            <td>🚨 అత్యంత ప్రమాదకరం!</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- SECTION 7 -->
    <div class="section-title"><span class="num">7</span>జెనెరిక్ పాయింటర్లు (void* Pointers) &amp; టైప్ కాస్టింగ్</div>
    <div class="section-body">
      <p><strong><code>void*</code> పాయింటర్</strong> అనేది C లో ఒక సూపర్ పవర్ లాంటిది. దీనికి ఎటువంటి నిర్దిష్ట డేటా టైప్ ఉండదు. ఇది <code>int</code>, <code>float</code>, <code>char</code> లేదా ఏ స్ట్రక్చర్ అడ్రస్‌నైనా తనలో నిల్వ చేసుకోగలదు! సిస్టమ్ లైబ్రరీలలో మెమరీ మేనేజ్‌మెంట్ ఫంక్షన్లు (<code>malloc</code>, <code>qsort</code>) ఈ <code>void*</code> పైనే ఆధారపడి పనిచేస్తాయి.</p>

      <div style="background:#fef2f2; border:1px solid #fecaca; border-radius:8px; padding:12px 16px; margin:14px 0; color:#991b1b; font-size:13.5px;">
        ⚠️ <strong>void* నియమం:</strong> కంపైలర్‌కు <code>void*</code> పాయింట్ చేస్తున్న డేటా సైజు ఎంతో తెలియదు కాబట్టి, <strong>దానిని నేరుగా డిరిఫరెన్స్ (<code>*ptr</code>) చేయలేము లేదా <code>ptr + 1</code> చేయలేము!</strong> దానిని ఉపయోగించే ముందు సరైన డేటా టైప్‌లోకి <strong>టైప్ కాస్ట్ (Typecast)</strong> చేయాలి!
      </div>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Generic void* Pointer Usage with Typecasting</span>
          <div class="code-actions">
            <a class="try-btn" href="/online-c-compiler.html" target="_blank">▶ Run in Online C Compiler</a>
          </div>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

void printValue(void *ptr, char type) {
    if (type == 'i') {
        // int* గా టైప్ కాస్ట్ చేసి డిరిఫరెన్స్ చేస్తున్నాం
        printf("ఇంటిజర్ విలువ: %d\\n", *(int*)ptr);
    } else if (type == 'f') {
        // float* గా టైప్ కాస్ట్
        printf("ఫ్లోట్ విలువ: %.2f\\n", *(float*)ptr);
    } else if (type == 'c') {
        // char* గా టైప్ కాస్ట్
        printf("క్యారెక్టర్ విలువ: %c\\n", *(char*)ptr);
    }
}

int main() {
    int n = 42;
    float pi = 3.14159f;
    char ch = 'Z';

    printValue(&amp;n, 'i');
    printValue(&amp;pi, 'f');
    printValue(&amp;ch, 'c');

    return 0;
}</code></pre>
      </div>
    </div>

    <!-- SECTION 8 -->
    <div class="section-title"><span class="num">8</span>ప్రమాదకరమైన 4 పాయింటర్ బగ్స్ (Null, Wild, Dangling)</div>
    <div class="section-body">
      <p>సైబర్ సెక్యూరిటీలో 70% కంటే ఎక్కువ సాఫ్ట్‌వేర్ లోపాలు తప్పుడు పాయింటర్ల వినియోగం వలనే వస్తాయి:</p>

      <h4 style="color:#ef4444; margin:16px 0 8px; font-size:15px;">1. వైల్డ్ పాయింటర్ (Wild Pointer):</h4>
      <p><code>int *p;</code> అని రాసి ఏ అడ్రస్ ఇవ్వకుండా వదిలేస్తే, అది గార్బేజ్ అడ్రస్‌ను పట్టుకుని ఉంటుంది. దానిని డిరిఫరెన్స్ చేస్తే సెగ్‌ఫాల్ట్ వస్తుంది. <strong>పరిష్కారం:</strong> ఎల్లప్పుడూ <code>int *p = NULL;</code> అని ఇనిషియలైజ్ చేయాలి.</p>

      <h4 style="color:#ef4444; margin:16px 0 8px; font-size:15px;">2. డాంగ్లింగ్ పాయింటర్ (Dangling Pointer):</h4>
      <p>ఫంక్షన్ ముగిసి లోకల్ వేరియబుల్స్ నాశనమైన తర్వాత లేదా డైనమిక్ మెమరీ <code>free()</code> అయిన తర్వాత కూడా ఆ పాత అడ్రస్‌ను పట్టుకుని ఉండటం. <strong>పరిష్కారం:</strong> మెమరీ క్లియర్ కాగానే వెంటనే <code>ptr = NULL;</code> అని సెట్ చేయాలి.</p>
    </div>

    <!-- SECTION 9 -->
    <div class="section-title"><span class="num">9</span>const కీవర్డ్ మరియు పాయింటర్లు (Pointer to Const vs Const Pointer)</div>
    <div class="section-body">
      <p>పాయింటర్లలో <code>const</code> కీవర్డ్ ఎక్కడ ఉందో అనే స్థానం ఆధారంగా దాని ప్రవర్తన పూర్తిగా మారిపోతుంది. ఇంటర్వ్యూలలో అడిగే క్లాసిక్ పోలిక ఇది:</p>

      <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin:16px 0;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px;">
          <strong style="color:#2563eb;">1. const int *ptr (Pointer to Constant)</strong>
          <p style="font-size:13px; color:var(--text2); margin-top:6px; line-height:1.6;">
            పాయింటర్ పట్టుకున్న <strong>విలువను మార్చలేము!</strong> కానీ పాయింటర్ వేరొక అడ్రస్‌కి మారవచ్చు.<br>
            <code>*ptr = 50; // ❌ ERROR</code><br>
            <code>ptr = &amp;other; // ✅ OK</code>
          </p>
        </div>
        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px;">
          <strong style="color:#059669;">2. int * const ptr (Constant Pointer)</strong>
          <p style="font-size:13px; color:var(--text2); margin-top:6px; line-height:1.6;">
            పాయింటర్ చిరునామా స్థిరమైనది, <strong>వేరే అడ్రస్‌కి మారదు!</strong> కానీ లోపల ఉన్న విలువను మార్చవచ్చు.<br>
            <code>*ptr = 50; // ✅ OK</code><br>
            <code>ptr = &amp;other; // ❌ ERROR</code>
          </p>
        </div>
      </div>
    </div>

    <!-- SECTION 10 -->
    <div class="section-title"><span class="num">10</span>పాయింటర్ల పాయింటర్లు (Pointer to Pointer - double**) పరిచయం</div>
    <div class="section-body">
      <p>ఒక పాయింటర్ కూడా RAM లో ఉండే ఒక సాధారణ వేరియబుల్ మాత్రమే. కాబట్టి <strong>పాయింటర్‌కు కూడా ఒక మెమరీ అడ్రస్ ఉంటుంది!</strong> ఆ పాయింటర్ యొక్క అడ్రస్‌ను పట్టుకునే మరొక పాయింటర్‌ను <strong>డబుల్ పాయింటర్ (Pointer to Pointer - <code>**</code>)</strong> అంటారు:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Double Pointer (Pointer to Pointer) Concept</span>
          <div class="code-actions">
            <a class="try-btn" href="/online-c-compiler.html" target="_blank">▶ Run in Online C Compiler</a>
          </div>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main() {
    int value = 777;
    int *ptr1 = &amp;value; // ptr1 -> value అడ్రస్
    int **ptr2 = &amp;ptr1; // ptr2 -> ptr1 అడ్రస్ (డబుల్ పాయింటర్!)

    printf("value విలువ        = %d\\n", value);
    printf("*ptr1 ద్వారా విలువ  = %d\\n", *ptr1);
    printf("**ptr2 ద్వారా విలువ = %d (రెండుసార్లు డీరిఫరెన్స్!)\\n", **ptr2);

    return 0;
}</code></pre>
      </div>
    </div>

    <!-- SECTION 11 -->
    <div class="section-title"><span class="num">11</span>సమగ్ర రియల్ వరల్డ్ ప్రాజెక్ట్ — RAM మెమరీ హెక్స్ డంపర్ &amp; బైట్ ఇన్‌స్పెక్టర్</div>
    <div class="section-body">
      <p>ఇప్పటివరకు నేర్చుకున్న పాయింటర్లు, <code>char*</code> బైట్-బై-బైట్ ట్రావర్సల్, మరియు హెక్సాడెసిమల్ ప్రింటింగ్ ఉపయోగించి ఒక వాస్తవ <strong>RAM మెమరీ హెక్స్ డంపర్ (Raw Memory Hex Inspector Tool)</strong> ను నిర్మిద్దాం. కంప్యూటర్ RAM లో ఏదైనా వేరియబుల్ లేదా స్ట్రింగ్ అంతర్గతంగా బైట్-బై-బైట్ ఎలా నిల్వ ఉందో కళ్లారా చూడవచ్చు:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Raw RAM Memory Hex Dumper &amp; Byte Inspector</span>
          <div class="code-actions">
            <a class="try-btn" href="/online-c-compiler.html" target="_blank">▶ Run in Online C Compiler</a>
          </div>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

// ఏ మెమరీ బ్లాక్‌నైనా బైట్-బై-బైట్ హెక్సాడెసిమల్‌లో ప్రింట్ చేసే ఇన్‌స్పెక్టర్
void dumpMemory(const void *startAddr, size_t numBytes) {
    // 1 బైట్ చొప్పున చదవడానికి unsigned char* కి టైప్ కాస్ట్ చేస్తున్నాం
    const unsigned char *bytePtr = (const unsigned char*)startAddr;

    printf("====================================================\\n");
    printf("   RAM మెమరీ ఇన్‌స్పెక్టర్ (Raw Byte Hex Dumper)\\n");
    printf("====================================================\\n");
    printf("ప్రారంభ మెమరీ అడ్రస్: %p  | మొత్తం బైట్లు: %zu\\n", startAddr, numBytes);
    printf("----------------------------------------------------\\n");
    printf("ఆఫ్‌సెట్ | మెమరీ అడ్రస్        | హెక్స్ విలువ | క్యారెక్టర్\\n");
    printf("----------------------------------------------------\\n");

    for (size_t i = 0; i &lt; numBytes; i++) {
        unsigned char b = bytePtr[i];
        // ముద్రించదగిన అక్షరమా కాదా అని చెక్ చేయడం
        char printable = (b &gt;= 32 &amp;&amp; b &lt;= 126) ? b : '.';

        printf("+%02zu    | %p | 0x%02X       | '%c'\\n",
               i, (void*)&amp;bytePtr[i], b, printable);
    }
    printf("====================================================\\n\\n");
}

int main() {
    // 1. ఒక ఇంటిజర్ వేరియబుల్ మెమరీని పరీక్షిద్దాం (Little-Endian ఆర్కిటెక్చర్)
    int secretCode = 0x12345678;
    printf("1. ఇంటిజర్ వేరియబుల్ RAM లేఅవుట్ (0x12345678):\\n");
    dumpMemory(&amp;secretCode, sizeof(secretCode));

    // 2. ఒక స్ట్రింగ్ మెమరీ లేఅవుట్‌ను పరీక్షిద్దాం
    char message[] = "Mana C 2026";
    printf("2. స్ట్రింగ్ వేరియబుల్ RAM లేఅవుట్ (\"Mana C 2026\"):\\n");
    dumpMemory(message, sizeof(message));

    return 0;
}</code></pre>
      </div>
    </div>

    <!-- SECTION 12 -->
    <div class="section-title"><span class="num">12</span>సాధారణంగా బిగినర్స్ చేసే టాప్ 5 పాయింటర్ తప్పులు</div>
    <div class="section-body">
      <div style="display:grid; grid-template-columns:1fr; gap:12px; margin:14px 0;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:12px 16px;">
          <strong style="color:#ef4444;">1. అన్‌ఇనిషియలైజ్డ్ పాయింటర్‌ను డిరిఫరెన్స్ చేయడం:</strong><br>
          <span style="color:var(--text2); font-size:13.5px;"><code>int *p; *p = 10;</code> అని రాస్తే గార్బేజ్ అడ్రస్‌లోకి రాతలు రాసి ఆపరేటింగ్ సిస్టమ్ సెగ్మెంటేషన్ ఫాల్ట్ ఇస్తుంది. ఎల్లప్పుడూ ఒక వేరియబుల్ అడ్రస్ లేదా NULL ఇవ్వాలి.</span>
        </div>
        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:12px 16px;">
          <strong style="color:#ef4444;">2. *ptr బదులు ptr కు విలువ అసైన్ చేయడం:</strong><br>
          <span style="color:var(--text2); font-size:13.5px;"><code>p = 10;</code> అని రాస్తే పాయింటర్ అడ్రస్ 10 అయిపోతుంది! లోపల ఉన్న విలువను మార్చడానికి కచ్చితంగా <code>*p = 10;</code> అని రాయాలి.</span>
        </div>
        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:12px 16px;">
          <strong style="color:#ef4444;">3. void* ను నేరుగా డిరిఫరెన్స్ చేయడానికి ప్రయత్నించడం:</strong><br>
          <span style="color:var(--text2); font-size:13.5px;"><code>void *p; printf("%d", *p);</code> కంపైలర్ ఎర్రర్ ఇస్తుంది. కచ్చితంగా <code>*(int*)p</code> అని టైప్ కాస్ట్ చేయాలి.</span>
        </div>
        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:12px 16px;">
          <strong style="color:#ef4444;">4. ఆపరేటర్ ప్రిసిడెన్స్ కన్‌ఫ్యూజన్ ((*ptr)++ vs *ptr++):</strong><br>
          <span style="color:var(--text2); font-size:13.5px;"><code>*ptr++</code> రాస్తే పాయింటర్ అడ్రస్ పెరుగుతుంది; లోపల విలువను పెంచడానికి <code>(*ptr)++</code> అని బ్రాకెట్లు వాడాలి.</span>
        </div>
        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:12px 16px;">
          <strong style="color:#ef4444;">5. వేర్వేరు డేటా టైప్స్ పాయింటర్లను తారుమారు చేయడం:</strong><br>
          <span style="color:var(--text2); font-size:13.5px;"><code>double d = 5.5; int *p = &amp;d;</code> అని రాస్తే 4 బైట్లు మాత్రమే చదివి డేటా పూర్తిగా కరప్ట్ అవుతుంది!</span>
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
          ❓ ప్రశ్న 1: 64-బిట్ కంప్యూటర్‌లో char* మరియు double* పాయింటర్ల మెమరీ సైజు ఎంత ఉంటుంది?
        </summary>
        <div style="margin-top:10px; color:var(--text2); font-size:14px; line-height:1.6;">
          <strong>సమాధానం:</strong> రెండింటి సైజు ఖచ్చితంగా <strong>8 బైట్లు (64 bits)</strong> మాత్రమే ఉంటుంది! పాయింటర్ కేవలం మెమరీ అడ్రస్‌ను మాత్రమే నిల్వ చేస్తుంది కాబట్టి డేటా టైప్‌తో సంబంధం లేకుండా అన్ని పాయింటర్ల సైజు సమానంగా ఉంటుంది.
        </div>
      </details>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:700; cursor:pointer; color:#059669;">
          ❓ ప్రశ్న 2: int *ptr ఉన్నప్పుడు 'ptr + 1' చేస్తే అడ్రస్ ఎన్ని బైట్లు పెరుగుతుంది?
        </summary>
        <div style="margin-top:10px; color:var(--text2); font-size:14px; line-height:1.6;">
          <strong>సమాధానం:</strong> సరిగ్గా <strong>4 బైట్లు</strong> పెరుగుతుంది! పాయింటర్ అరిథ్‌మెటిక్ ఆ డేటా టైప్ సైజు ఆధారంగా స్కేల్ అవుతుంది (sizeof(int) = 4).
        </div>
      </details>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:700; cursor:pointer; color:#059669;">
          ❓ ప్రశ్న 3: void* పాయింటర్‌ను నేరుగా డిరిఫరెన్స్ చేయవచ్చా?
        </summary>
        <div style="margin-top:10px; color:var(--text2); font-size:14px; line-height:1.6;">
          <strong>సమాధానం:</strong> చేయకూడదు (Compile Error)! కంపైలర్‌కు ఆ మెమరీ లొకేషన్ సైజు ఎంతో తెలియదు కాబట్టి, దానిని సరైన టైప్‌లోకి (ఉదా: <code>*(int*)ptr</code>) టైప్ కాస్ట్ చేసిన తర్వాతే డిరిఫరెన్స్ చేయాలి.
        </div>
      </details>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:700; cursor:pointer; color:#059669;">
          ❓ ప్రశ్న 4: వైల్డ్ పాయింటర్ (Wild Pointer) మరియు డాంగ్లింగ్ పాయింటర్ (Dangling Pointer) మధ్య తేడా ఏమిటి?
        </summary>
        <div style="margin-top:10px; color:var(--text2); font-size:14px; line-height:1.6;">
          <strong>సమాధానం:</strong> ఇనిషియలైజ్ చేయకుండా వదిలేసిన పాయింటర్‌ను <strong>వైల్డ్ పాయింటర్</strong> అంటారు. మెమరీ తొలగించబడిన తర్వాత కూడా ఆ పాత చిరునామానే పట్టుకుని ఉండే పాయింటర్‌ను <strong>డాంగ్లింగ్ పాయింటర్</strong> అంటారు.
        </div>
      </details>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:700; cursor:pointer; color:#059669;">
          ❓ ప్రశ్న 5: 'const int *p' మరియు 'int * const p' ల మధ్య తేడా ఏమిటి?
        </summary>
        <div style="margin-top:10px; color:var(--text2); font-size:14px; line-height:1.6;">
          <strong>సమాధానం:</strong> <code>const int *p</code> లో విలువను మార్చలేము (రీడ్-ఓన్లీ డేటా); <code>int * const p</code> లో చిరునామాను మార్చలేము (స్థిరమైన పాయింటర్).
        </div>
      </details>

      <!-- TRY BOX -->
      <div class="try-box" style="margin-top:24px;">
        <div class="try-title">🚀 RAM మెమరీ హెక్స్ డంపర్‌ను మన ఆన్‌లైన్ C కంపైలర్‌లో రన్ చేయండి!</div>
        <p>పైన వివరించిన <code>RAM మెమరీ హెక్స్ ఇన్‌స్పెక్టర్</code> మరియు <code>పాయింటర్ అరిథ్‌మెటిక్</code> కోడ్‌లను మన ఆన్‌లైన్ C కంపైలర్‌లో ఓపెన్ చేసి స్వయంగా రన్ చేయండి. మీ వేరియబుల్స్ మెమరీలో బైట్-బై-బైట్ ఎలా స్టోర్ అయ్యాయో కళ్లారా చూడండి!</p>
        <a class="run-btn" href="/online-c-compiler.html" target="_blank">
          👉 Our Compiler లో C Compiler try చేయండి
        </a>
      </div>

      <div style="margin-top:24px;">
        <h4 style="color:#059669; font-size:16px; margin-bottom:10px;">📌 అధ్యాయ సారాంశం (Quick Summary):</h4>
        <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.7;">
          <li><strong>పాయింటర్లు:</strong> మెమరీ చిరునామాలను నిల్వ చేసే ప్రత్యేక వేరియబుల్స్ (64-బిట్ లో 8 బైట్లు).</li>
          <li><strong>&amp; ఆపరేటర్:</strong> వేరియబుల్ ఉన్న మెమరీ అడ్రస్‌ను అందిస్తుంది.</li>
          <li><strong>* ఆపరేటర్:</strong> పాయింటర్ అడ్రస్ లోపలికి వెళ్లి విలువను చదవడానికి/మార్చడానికి డిరిఫరెన్స్ చేస్తుంది.</li>
          <li><strong>స్కేల్ ఫ్యాక్టర్:</strong> <code>ptr + 1</code> అంటే 1 బైట్ కాదు, ఆ డేటా టైప్ పరిమాణం మేర ముందుకు దూకుతుంది.</li>
          <li><strong>void*:</strong> ఏ డేటా టైప్ నైనా పట్టుకునే సార్వత్రిక జెనెరిక్ పాయింటర్.</li>
        </ul>
      </div>

      <div style="margin-top:20px; padding:16px; background:var(--bg2); border-left:4px solid #10b981; border-radius:0 8px 8px 0;">
        <strong>తర్వాతి అధ్యాయంలో (Chapter 16 — Phase 04 ముగింపు):</strong> పాయింటర్లు మరియు అర్రేల మధ్య ఉన్న అవినాభావ సంబంధం — <strong>పాయింటర్స్ విత్ అర్రేస్, డబుల్ పాయింటర్లు (char**), కమాండ్ లైన్ ఆర్గుమెంట్స్ (argc, argv) మరియు ఫంక్షన్ పాయింటర్లు</strong> గురించి అత్యంత లోతుగా నేర్చుకుందాం!
      </div>
    </div>

    <!-- PREV / NEXT NAVIGATION -->
    <div style="display:flex; justify-content:space-between; align-items:center; margin-top:40px; padding-top:20px; border-top:1px solid var(--border); flex-wrap:wrap; gap:16px;">
      <a href="/blog-c/14-c-strings-character-arrays-string-h.html" style="display:inline-flex; align-items:center; gap:8px; padding:10px 18px; border-radius:8px; background:var(--bg3); border:1px solid var(--border); color:var(--text); text-decoration:none; font-weight:700; font-size:13.5px;">
        ← Prev: 14. స్ట్రింగ్స్ &amp; &lt;string.h&gt;
      </a>
      <a href="/blog-c/16-c-pointers-with-arrays-and-double-pointers.html" style="display:inline-flex; align-items:center; gap:8px; padding:10px 20px; border-radius:8px; background:linear-gradient(135deg, #10b981, #059669); color:#ffffff; text-decoration:none; font-weight:700; font-size:13.5px; box-shadow:0 2px 10px rgba(16,185,129,0.2);">
        Next: 16. పాయింటర్లు &amp; అర్రేస్ →
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
  <title>C పాయింటర్లు: బేసిక్స్, మెమరీ అడ్రస్లు & Dereferencing — Modern C Tutorial | Our Compiler</title>
  <meta name="description" content="C పాయింటర్లు సమగ్ర తెలుగు గైడ్: హోటల్ కీ-కార్డు ఎనాలజీ, & మరియు * ఆపరేటర్లు, పాయింటర్ అరిథ్‌మెటిక్ స్కేల్ ఫ్యాక్టర్, void* జెనెరిక్ పాయింటర్లు, RAM మెమరీ ఇన్‌స్పెక్టర్ ప్రాజెక్ట్." />
  <meta name="keywords" content="c pointers in telugu, c pointer arithmetic, dereferencing c, void pointer c, null dangling wild pointer, our compiler" />
  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />
  <link rel="icon" type="image/png" href="/logo.png" />
  <link rel="canonical" href="https://www.ourcompiler.com/blog-c/15-c-pointers-basics-and-address-arithmetic.html" />
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
    "headline": "C పాయింటర్లు: బేసిక్స్, మెమరీ అడ్రస్లు & Dereferencing (C Programming in Telugu)",
    "description": "హోటల్ కీ-కార్డు ఎనాలజీ, & మరియు * ఆపరేటర్లు, పాయింటర్ అరిథ్‌మెటిక్ స్కేల్ ఫ్యాక్టర్, void* జెనెరిక్ పాయింటర్లు, RAM మెమరీ ఇన్‌స్పెక్టర్ ప్రాజెక్ట్",
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

const outputPath = path.join(__dirname, '..', 'public', 'blog-c', '15-c-pointers-basics-and-address-arithmetic.html');
fs.writeFileSync(outputPath, fullHtml, 'utf8');

console.log('✅ Successfully generated deep high-value C Chapter 15!');
console.log('Target file size:', fullHtml.length, 'characters');
