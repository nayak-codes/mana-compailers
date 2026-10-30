const fs = require('fs');
const path = require('path');
const { LESSONS } = require('./c_curriculum_data.js');
const { generatePageHtml } = require('./c_page_template.js');

const cDir = path.join(__dirname, '../public/blog-c');

// ==========================================
// COMPREHENSIVE EDITORIAL MASTERCLASS CONTENT: PHASE 5 (CH 17 - 20)
// ==========================================

const PHASE5_CONTENTS = {
  // -------------------------------------------------------------
  // CHAPTER 17: STRUCTS, UNIONS & TYPEDEF
  // -------------------------------------------------------------
  17: `
    <div class="intro-box">
      వాస్తవ ప్రపంచంలో సమాచారం కేవలం ఒకే రకమైన పూర్ణాంకాలు లేదా అక్షరాల రూపంలో ఉండదు. ఒక విద్యార్థి సమాచారంలో రోల్ నంబర్ (<code>int</code>), పేరు (<code>char[]</code>), మరియు మార్కులు (<code>float</code>) ఉంటాయి. అర్రేలు కేవలం ఒకే రకమైన హోమోజీనియస్ డేటాను మాత్రమే నిల్వ చేయగలవు. వేర్వేరు డేటా రకాలను ఒకే కస్టమ్ రికార్డుగా సమూహపరచడానికి C లో <strong>స్ట్రక్చర్స్ (struct)</strong>, మెమరీ ఆదా చేసే <strong>యూనియన్స్ (union)</strong>, మరియు టైప్ అలియాసింగ్ కోసం <strong>typedef</strong> ప్రాథమిక సాధనాలు.
    </div>

    <!-- SECTION 1 -->
    <div class="section-title"><span class="num">1</span>స్ట్రక్చర్స్ (struct) — హెటిరోజీనియస్ డేటా గ్రూపింగ్</div>
    <div class="section-body">
      <p>
        <strong>స్ట్రక్చర్ (struct)</strong> అనేది విభిన్న డేటా రకాలకు చెందిన వేరియబుల్స్‌ను ఒకే పేరు కింద కలిపి ఒక కొత్త యూజర్-డిఫైన్డ్ డేటా టైప్‌ను సృష్టించే విధానం.
      </p>

      <div class="code-block" style="margin:16px 0;">
        <div class="code-block-header">
          <span class="lang-tag">C — struct definition & dot operator</span>
          <a class="try-btn" href="/online-c-compiler.html">⚡ Try in C Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

// స్ట్రక్చర్ డిక్లరేషన్ (బ్లూప్రింట్)
struct Student {
    int rollNo;
    char name[30];
    float marks;
}; // గమనిక: డిక్లరేషన్ చివర సెమికోలన్ తప్పనిసరి!

int main(void) {
    // స్ట్రక్చర్ వేరియబుల్ సృష్టి & ఇనీషియలైజేషన్
    struct Student s1;
    s1.rollNo = 101;
    strcpy(s1.name, "రమేష్");
    s1.marks = 94.5f;

    // డాట్ (.) ఆపరేటర్ ద్వారా మెంబర్స్ యాక్సెస్
    printf("రోల్ నంబర్ : %d\\n", s1.rollNo);
    printf("విద్యార్థి పేరు : %s\\n", s1.name);
    printf("మార్కులు      : %.2f\\n", s1.marks);
    return 0;
}</code></pre>
      </div>
    </div>

    <!-- SECTION 2 -->
    <div class="section-title"><span class="num">2</span>పాయింటర్లు & స్ట్రక్చర్స్ — యారో ఆపరేటర్ (-&gt;)</div>
    <div class="section-body">
      <p>
        ఒక స్ట్రక్చర్ యొక్క మెమరీ అడ్రస్‌ను పాయింటర్‌లో నిల్వ చేసినప్పుడు, దానిలోని మెంబర్లను యాక్సెస్ చేయడానికి <code>(*ptr).member</code> అని రాయడం అసౌకర్యంగా ఉంటుంది. అందుకే C మనకు సూటిగా చదవగల <strong>యారో ఆపరేటర్ (-&gt;)</strong> ను అందించింది:
      </p>

      <div class="code-block" style="margin:16px 0;">
        <div class="code-block-header">
          <span class="lang-tag">C — Arrow operator (-&gt;) demo</span>
          <a class="try-btn" href="/online-c-compiler.html">⚡ Try in C Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

struct Point {
    int x;
    int y;
};

void updateCoordinates(struct Point *p, int newX, int newY) {
    // యారో ఆపరేటర్ ద్వారా పాయింటర్ మెంబర్లను మార్చడం
    p-&gt;x = newX;
    p-&gt;y = newY;
}

int main(void) {
    struct Point pt = {10, 20};
    printf("ప్రారంభంలో: x = %d, y = %d\\n", pt.x, pt.y);

    updateCoordinates(&pt, 50, 80);
    printf("మార్చిన తర్వాత: x = %d, y = %d\\n", pt.x, pt.y);
    return 0;
}</code></pre>
      </div>
    </div>

    <!-- SECTION 3 -->
    <div class="section-title"><span class="num">3</span>మెమరీ ప్యాడింగ్ & స్ట్రక్చర్ అలైన్‌మెంట్ (Memory Padding)</div>
    <div class="section-body">
      <p>
        ఇంటర్వ్యూలలో విద్యార్థులను ఆశ్చర్యపరిచే ఒక క్లాసికల్ ప్రశ్న:
      </p>
      <code style="font-size:13px; color:var(--text); display:block; background:var(--bg3); padding:8px 12px; border-radius:4px; margin:8px 0;">
        struct Sample { char a; int b; }; // sizeof(struct Sample) ఎంత?
      </code>
      <p style="font-size:13.5px; color:var(--text); line-height:1.6;">
        చాలామంది <code>char</code> 1 బైట్ + <code>int</code> 4 బైట్లు = <strong>5 బైట్లు</strong> అని సమాధానం చెబుతారు. కానీ ఆధునిక 64-బిట్ కంపైలర్లపై ప్రింట్ చేసి చూస్తే ఫలితం <strong>8 బైట్లు</strong> వస్తుంది!
      </p>

      <div style="background:var(--bg2); border-left:4px solid #10b981; border-radius:0 8px 8px 0; padding:16px; margin:16px 0;">
        <strong style="color:#10b981; font-size:14.5px;">⚙️ CPU వర్డ్ అలైన్‌మెంట్ రహస్యం:</strong>
        <p style="font-size:13px; color:var(--text); margin:6px 0 0 0; line-height:1.6;">
          ఆధునిక 32-బిట్ లేదా 64-బిట్ ప్రాసెసర్లు RAM నుండి డేటాను ఒక్కో బైట్ చొప్పున చదవవు. అవి 4 లేదా 8 బైట్ల గుణిజాలలో (Word Boundaries) చదివితేనే అత్యంత వేగంగా పనిచేస్తాయి. 4-బైట్ <code>int</code> ని బౌండరీలో పెట్టడానికి కంపైలర్ <code>char</code> పక్కన నిశ్శబ్దంగా <strong>3 ఖాళీ బైట్లను (Padding Bytes)</strong> జోడిస్తుంది. మెమరీ అత్యంత కీలకమైన ఎంబెడెడ్ డివైస్‌లలో ఈ ప్యాడింగ్‌ను నిరోధించడానికి <code>#pragma pack(1)</code> వాడతారు.
        </p>
      </div>
    </div>

    <!-- SECTION 4 -->
    <div class="section-title"><span class="num">4</span>యూనియన్స్ (union) vs స్ట్రక్చర్స్ — షేర్డ్ మెమరీ మెకానిక్స్</div>
    <div class="section-body">
      <p>
        <code>struct</code> తనలోని ప్రతి మెంబర్‌కు ప్రత్యేకమైన మెమరీ స్పేస్‌ను కేటాయిస్తుంది. కానీ <strong>యూనియన్ (union)</strong> తనలోని అన్ని మెంబర్లకు కలిపి కేవలం <strong>అతిపెద్ద మెంబర్ పరిమాణం గల ఒకే ఒక్క షేర్డ్ మెమరీ లొకేషన్‌ను</strong> ఇస్తుంది.
      </p>

      <div style="overflow-x:auto; margin:16px 0;">
        <table style="width:100%; border-collapse:collapse; font-size:13px; text-align:left;">
          <thead>
            <tr style="background:var(--bg3); border-bottom:2px solid var(--border);">
              <th style="padding:10px 14px; color:var(--text);">లక్షణం</th>
              <th style="padding:10px 14px; color:var(--text);">స్ట్రక్చర్ (struct)</th>
              <th style="padding:10px 14px; color:var(--text);">యూనియన్ (union)</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom:1px solid var(--border);">
              <td style="padding:10px 14px; font-weight:700; color:#10b981;">మెమరీ సైజ్</td>
              <td style="padding:10px 14px;">అన్ని మెంబర్ల మొత్తం సైజ్ (+ ప్యాడింగ్)</td>
              <td style="padding:10px 14px;">అతిపెద్ద మెంబర్ సైజ్ మాత్రమే</td>
            </tr>
            <tr style="border-bottom:1px solid var(--border);">
              <td style="padding:10px 14px; font-weight:700; color:#10b981;">మెంబర్ల యాక్సెస్</td>
              <td style="padding:10px 14px;">ఒకేసారి అన్ని మెంబర్లను స్వతంత్రంగా వాడవచ్చు</td>
              <td style="padding:10px 14px;">ఒకే సమయంలో ఒకే ఒక్క మెంబర్‌ను మాత్రమే వాడాలి</td>
            </tr>
            <tr>
              <td style="padding:10px 14px; font-weight:700; color:#10b981;">ప్రయోజనం</td>
              <td style="padding:10px 14px;">సంపూర్ణ రికార్డులను నిల్వ చేయడానికి</td>
              <td style="padding:10px 14px;">హార్డ్‌వేర్ రిజిస్టర్లు, తీవ్రమైన మెమరీ ఆదాకు</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="code-block" style="margin:16px 0;">
        <div class="code-block-header">
          <span class="lang-tag">C — typedef for clean abstractions</span>
          <a class="try-btn" href="/online-c-compiler.html">⚡ Try in C Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

// typedef ఉపయోగించి టైప్ అలియాస్ సృష్టించడం
typedef struct {
    unsigned int id;
    char code[8];
} Product;

int main(void) {
    // ప్రతిసారీ struct అని రాయకుండా నేరుగా Product అని వాడవచ్చు
    Product laptop = {1001, "LAP-X1"};
    printf("ప్రోడక్ట్ ID: %u | కోడ్: %s\\n", laptop.id, laptop.code);
    return 0;
}</code></pre>
      </div>
    </div>

    <!-- SECTION 5 -->
    <div class="section-title"><span class="num">5</span>బిగినర్స్ చేసే ఘోరమైన తప్పులు (Beginner Pitfalls)</div>
    <div class="section-body">
      <div style="display:flex; flex-direction:column; gap:12px; margin:16px 0;">
        <div style="background:rgba(239, 68, 68, 0.08); border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px 18px;">
          <div style="font-weight:700; color:#ef4444; font-size:14px;">❌ 1. struct క్లోజింగ్ బ్రేస్ తర్వాత సెమికోలన్ మర్చిపోవడం:</div>
          <code style="font-size:13px; color:var(--text); display:block; margin:6px 0;">struct Node { int data; } // తప్పు! చివర సెమికోలన్ తప్పనిసరి</code>
          <span style="font-size:13px; color:var(--text2); display:block;">C లో స్ట్రక్చర్ డిక్లరేషన్ ఒక స్టేట్‌మెంట్ లాంటిది. <code>};</code> సెమికోలన్ పెట్టకపోతే కంపైలర్ విచిత్రమైన సింటాక్స్ ఎర్రర్లను ఇస్తుంది.</span>
        </div>

        <div style="background:rgba(239, 68, 68, 0.08); border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px 18px;">
          <div style="font-weight:700; color:#ef4444; font-size:14px;">❌ 2. యూనియన్‌లో ఒక విలువ రాసి మరొకటి చదవడం:</div>
          <span style="font-size:13px; color:var(--text2); display:block; margin-top:4px;">యూనియన్‌లో <code>u.x = 10;</code> రాసిన తర్వాత <code>u.y = 3.14;</code> రాస్తే పాత <code>x</code> విలువ శాశ్వతంగా నాశనమైపోతుంది. యూనియన్ కేవలం షేర్డ్ మెమరీని మాత్రమే అందిస్తుంది.</span>
        </div>
      </div>
    </div>

    <!-- SECTION 6 -->
    <div class="section-title"><span class="num">6</span>తరచుగా అడిగే ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div style="display:flex; flex-direction:column; gap:12px; margin-top:16px;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px;">
          <h4 style="color:#10b981; margin:0 0 6px 0; font-size:14.5px;">Q: C లాంగ్వేజ్‌లో struct లోపల ఫంక్షన్లను రాయవచ్చా?</h4>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.6;">
            C++ లో లాగా నేరుగా ఫంక్షన్ బాడీలను రాయలేం. కానీ ఒక ఫంక్షన్ యొక్క మెమరీ అడ్రస్‌ను సూచించే <strong>ఫంక్షన్ పాయింటర్‌ను (Function Pointer)</strong> స్ట్రక్చర్ మెంబర్‌గా ఉంచి C లో కూడా ఆబ్జెక్ట్ ఓరియెంటెడ్ పద్ధతిని అనుకరించవచ్చు.
          </p>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px;">
          <h4 style="color:#10b981; margin:0 0 6px 0; font-size:14.5px;">Q: ఒక స్ట్రక్చర్ వేరియబుల్‌ను మరొకదానికి నేరుగా s2 = s1 అని అసైన్ చేయవచ్చా?</h4>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.6;">
            చేయవచ్చు! అర్రేలకు భిన్నంగా, రెండు స్ట్రక్చర్లు ఒకే రకానికి చెందినవైతే <code>s2 = s1;</code> అని రాసినప్పుడు కంపైలర్ అన్ని మెంబర్ల విలువలను బైట్-బై-బైట్ (Shallow Copy) గా నకలు చేస్తుంది.
          </p>
        </div>
      </div>
    </div>
  `,

  // -------------------------------------------------------------
  // CHAPTER 18: DYNAMIC MEMORY (MALLOC, CALLOC, REALLOC, FREE)
  // -------------------------------------------------------------
  18: `
    <div class="intro-box">
      ఇప్పటివరకు మనం సృష్టించిన అన్ని వేరియబుల్స్ మరియు అర్రేలు కంపైల్-టైమ్‌లోనే స్థిరమైన సైజును కలిగి ఉండేవి. కానీ ఒక గేమ్‌లో ఎంతమంది ఆటగాళ్ళు చేరతారో లేదా డేటాబేస్ నుండి ఎన్ని రికార్డులు వస్తాయో రన్‌టైమ్‌కు ముందు ఎవరికీ తెలియదు. రన్‌టైమ్‌లో యూజర్ అవసరాలకు తగినట్లుగా కంప్యూటర్ మెమరీని డైనమిక్‌గా పొందడానికి C లో <strong>Heap Memory</strong> మరియు <code>&lt;stdlib.h&gt;</code> లోని <strong>malloc, calloc, realloc, free</strong> ఫంక్షన్లు గుండెకాయ లాంటివి.
    </div>

    <!-- SECTION 1 -->
    <div class="section-title"><span class="num">1</span>Stack vs Heap మెమరీ ఆర్కిటెక్చర్</div>
    <div class="section-body">
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:16px; margin:16px 0;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px;">
          <h4 style="color:#3b82f6; margin:0 0 8px 0; font-size:14.5px;">📦 స్టాక్ మెమరీ (Stack):</h4>
          <ul style="margin:0; padding-left:18px; font-size:13px; color:var(--text2); line-height:1.7;">
            <li>కంపైలర్ ద్వారా స్వయంచాలకంగా నిర్వహించబడుతుంది.</li>
            <li>అత్యంత వేగవంతమైనది, కానీ పరిమిత పరిమాణం (సాధారణంగా 1MB - 8MB).</li>
            <li>ఫంక్షన్ ముగియగానే లోకల్ వేరియబుల్స్ తుడిచిపెట్టుకుపోతాయి.</li>
          </ul>
        </div>

        <div style="background:var(--bg2); border:1px solid #10b981; border-radius:8px; padding:16px;">
          <h4 style="color:#10b981; margin:0 0 8px 0; font-size:14.5px;">🌐 హీప్ మెమరీ (Heap):</h4>
          <ul style="margin:0; padding-left:18px; font-size:13px; color:var(--text2); line-height:1.7;">
            <li>ప్రోగ్రామర్ తన చేతులతో కోరినప్పుడు కేటాయించబడుతుంది.</li>
            <li>సిస్టమ్ RAM పరిమాణమంత భారీ స్థలం అందుబాటులో ఉంటుంది.</li>
            <li>మనం <code>free()</code> చేసేంత వరకు డేటా మెమరీలోనే శాశ్వతంగా ఉంటుంది.</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- SECTION 2 -->
    <div class="section-title"><span class="num">2</span>malloc() vs calloc() — కేటాయింపు తేడాలు</div>
    <div class="section-body">
      <p>
        హీప్ మెమరీని రిక్వెస్ట్ చేయడానికి C లో రెండు ప్రధాన ఫంక్షన్లు ఉన్నాయి:
      </p>

      <div style="display:flex; flex-direction:column; gap:12px; margin:16px 0;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #10b981; border-radius:8px; padding:14px 18px;">
          <strong style="color:#10b981; font-size:14px;">1. malloc() — Memory Allocation:</strong>
          <code style="font-size:13px; color:var(--text); display:block; margin:6px 0; background:var(--bg3); padding:6px 10px; border-radius:4px;">int *arr = (int*) malloc(5 * sizeof(int));</code>
          <span style="font-size:13px; color:var(--text2); display:block;">కేవలం ఒకే పారామీటర్ (మొత్తం బైట్ల సంఖ్య) తీసుకుంటుంది. మెమరీలోని పాత గార్బేజ్ విలువలను తొలగించదు (చాలా వేగవంతమైనది).</span>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #3b82f6; border-radius:8px; padding:14px 18px;">
          <strong style="color:#3b82f6; font-size:14px;">2. calloc() — Contiguous Allocation:</strong>
          <code style="font-size:13px; color:var(--text); display:block; margin:6px 0; background:var(--bg3); padding:6px 10px; border-radius:4px;">int *arr = (int*) calloc(5, sizeof(int));</code>
          <span style="font-size:13px; color:var(--text2); display:block;">రెండు పారామీటర్లు (ఎలిమెంట్ల సంఖ్య, ఒక్కో ఎలిమెంట్ సైజ్) తీసుకుంటుంది. కేటాయించిన ప్రతి బైట్‌ను <strong>సున్నా (0)</strong> తో ఇనీషియలైజ్ చేస్తుంది.</span>
        </div>
      </div>

      <div class="code-block" style="margin:16px 0;">
        <div class="code-block-header">
          <span class="lang-tag">C — Dynamic Array with malloc & free</span>
          <a class="try-btn" href="/online-c-compiler.html">⚡ Try in C Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;

int main(void) {
    int n = 5;
    // హీప్‌పై 5 పూర్ణాంకాల మెమరీ కేటాయింపు
    int *arr = (int*) malloc(n * sizeof(int));

    // మెమరీ లభించిందో లేదో తనిఖీ చేయడం తప్పనిసరి!
    if (arr == NULL) {
        printf("ఎర్రర్: మెమరీ కేటాయింపు విఫలమైంది!\\n");
        return 1;
    }

    for (int i = 0; i &lt; n; i++) {
        arr[i] = (i + 1) * 10;
        printf("%d ", arr[i]);
    }
    printf("\\n");

    // పని ముగిసిన తర్వాత మెమరీని విడుదల చేయడం
    free(arr);
    arr = NULL; // Dangling pointer నివారణ
    return 0;
}</code></pre>
      </div>
    </div>

    <!-- SECTION 3 -->
    <div class="section-title"><span class="num">3</span>realloc() — రన్‌టైమ్‌లో అర్రే సైజును రీసైజ్ చేయడం</div>
    <div class="section-body">
      <p>
        మీరు మొదట 5 ఎలిమెంట్స్ కోసం మెమరీ కేటాయించారు, కానీ రన్‌టైమ్‌లో యూజర్ మరిన్ని విలువలను నమోదు చేయాలనుకుంటే పాత డేటా నష్టపోకుండా మెమరీని విస్తరించడానికి <strong>realloc()</strong> అద్భుతంగా పనిచేస్తుంది:
      </p>

      <div class="code-block" style="margin:16px 0;">
        <div class="code-block-header">
          <span class="lang-tag">C — realloc Dynamic Growth</span>
          <a class="try-btn" href="/online-c-compiler.html">⚡ Try in C Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;

int main(void) {
    int *ptr = (int*) malloc(2 * sizeof(int));
    ptr[0] = 10; ptr[1] = 20;

    // సైజును 2 నుండి 4 కి విస్తరించడం
    int *temp = (int*) realloc(ptr, 4 * sizeof(int));
    if (temp != NULL) {
        ptr = temp;
        ptr[2] = 30; ptr[3] = 40;
        printf("విస్తరించిన అర్రే: %d %d %d %d\\n", ptr[0], ptr[1], ptr[2], ptr[3]);
    }

    free(ptr);
    ptr = NULL;
    return 0;
}</code></pre>
      </div>
    </div>

    <!-- SECTION 4 -->
    <div class="section-title"><span class="num">4</span>free() ప్రాముఖ్యత & మెమరీ లీక్స్ (Memory Leaks) ప్రమాదం</div>
    <div class="section-body">
      <p>
        C లాంగ్వేజ్‌లో Java లేదా Python లాగా వెనుక తిరిగే <strong>Garbage Collector ఉండదు</strong>. మీరు <code>malloc</code> ద్వారా తీసుకున్న ప్రతి బైట్ మెమరీని ప్రోగ్రామ్ ముగిసేలోపు <code>free(ptr)</code> తో ఆపరేటింగ్ సిస్టమ్‌కు తిరిగి అప్పగించాలి.
      </p>

      <div style="background:rgba(239, 68, 68, 0.08); border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px 18px; margin:16px 0;">
        <strong style="color:#ef4444; font-size:14px;">💥 మెమరీ లీక్ (Memory Leak) అంటే ఏమిటి?</strong>
        <p style="font-size:13px; color:var(--text); margin:6px 0 0 0; line-height:1.6;">
          ఒక ఫంక్షన్ లోపల <code>malloc</code> చేసి, ఆ పాయింటర్‌ను <code>free()</code> చేయకుండా ఫంక్షన్ ముగిస్తే, ఆ మెమరీకి సంబంధించిన అడ్రస్ పోతుంది కానీ RAM లో ఆ స్థలం అలాగే బ్లాక్ అయి ఉంటుంది. నిరంతరం రన్ అయ్యే వెబ్ సర్వర్లలో లేదా గేమింగ్ ఇంజిన్లలో ఇలా మెమరీ లీక్స్ జరిగితే కొన్ని గంటల్లోనే సిస్టమ్ RAM అంతా నిండిపోయి సర్వర్ క్రాష్ అవుతుంది (Out of Memory Crash).
        </p>
      </div>
    </div>

    <!-- SECTION 5 -->
    <div class="section-title"><span class="num">5</span>బిగినర్స్ చేసే ఘోరమైన తప్పులు (Beginner Pitfalls)</div>
    <div class="section-body">
      <div style="display:flex; flex-direction:column; gap:12px; margin:16px 0;">
        <div style="background:rgba(239, 68, 68, 0.08); border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px 18px;">
          <div style="font-weight:700; color:#ef4444; font-size:14px;">❌ 1. డబుల్ ఫ్రీ (Double Free Crash):</div>
          <code style="font-size:13px; color:var(--text); display:block; margin:6px 0;">free(ptr); free(ptr); // CRASH! free(): double free detected</code>
          <span style="font-size:13px; color:var(--text2); display:block;">ఇప్పటికే విడుదల చేసిన పాయింటర్‌ను మళ్లీ ఫ్రీ చేస్తే రన్‌టైమ్ ఎర్రర్ వస్తుంది. మొదటిసారి ఫ్రీ చేసిన వెంటనే <code>ptr = NULL;</code> చేస్తే C లో <code>free(NULL)</code> ఎటువంటి ప్రమాదం కలిగించదు.</span>
        </div>

        <div style="background:rgba(239, 68, 68, 0.08); border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px 18px;">
          <div style="font-weight:700; color:#ef4444; font-size:14px;">❌ 2. స్టాక్ వేరియబుల్స్‌ను free చేయడానికి ప్రయత్నించడం:</div>
          <code style="font-size:13px; color:var(--text); display:block; margin:6px 0;">int x = 10; free(&amp;x); // ఘోరమైన అక్రమ చర్య!</code>
          <span style="font-size:13px; color:var(--text2); display:block;"><code>free()</code> ఫంక్షన్ కేవలం <code>malloc</code>, <code>calloc</code>, లేదా <code>realloc</code> ద్వారా హీప్‌పై తీసుకున్న అడ్రస్‌లపై మాత్రమే పనిచేస్తుంది.</span>
        </div>
      </div>
    </div>

    <!-- SECTION 6 -->
    <div class="section-title"><span class="num">6</span>తరచుగా అడిగే ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div style="display:flex; flex-direction:column; gap:12px; margin-top:16px;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px;">
          <h4 style="color:#10b981; margin:0 0 6px 0; font-size:14.5px;">Q: C లో malloc రిటర్న్ వాల్యూను టైప్ కాస్ట్ (int*) చేయడం తప్పనిసరా?</h4>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.6;">
            స్వచ్ఛమైన C లో <code>void*</code> ఏ ఇతర పాయింటర్ కైనా ఆటోమేటిక్‌గా ఇంప్లిసిట్‌గా కన్వర్ట్ అవుతుంది కాబట్టి <code>int *p = malloc(...)</code> అని నేరుగా రాయవచ్చు. అయితే C++ కంపైలర్లలో ఎక్స్‌ప్లిసిట్ కాస్టింగ్ తప్పనిసరి.
          </p>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px;">
          <h4 style="color:#10b981; margin:0 0 6px 0; font-size:14.5px;">Q: malloc(0) అని రాస్తే ఏం జరుగుతుంది?</h4>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.6;">
            C స్టాండర్డ్ ప్రకారం ఇది అమలుపై ఆధారపడి ఉంటుంది (Implementation Defined). కంపైలర్ NULL రిటర్న్ చేయవచ్చు లేదా <code>free()</code> చేయదగిన ఒక ప్రత్యేకమైన నాన్-నల్ పాయింటర్‌ను ఇవ్వవచ్చు. అయితే దాన్ని డీరిఫరెన్స్ చేయకూడదు.
          </p>
        </div>
      </div>
    </div>
  `,

  // -------------------------------------------------------------
  // CHAPTER 19: FILE HANDLING (FOPEN, FCLOSE, TEXT & BINARY)
  // -------------------------------------------------------------
  19: `
    <div class="intro-box">
      కంప్యూటర్ RAM లోని సమాచారం అస్థిరమైనది (Volatile). విద్యుత్ ఆగిపోయినా లేదా ప్రోగ్రామ్ క్లోజ్ అయినా వేరియబుల్స్ లోని డేటా శాశ్వతంగా తుడిచిపెట్టుకుపోతుంది. నిజ జీవిత సాఫ్ట్‌వేర్‌లలో యూజర్ సమాచారం, లాగ్ ఫైల్స్ మరియు డేటాబేస్‌లను హార్డ్ డిస్క్ లేదా SSD పై శాశ్వతంగా భద్రపరచడానికి <strong>ఫైల్ హ్యాండ్లింగ్ (File Handling)</strong> అత్యంత కీలకమైన భాగం. ఈ అధ్యాయంలో టెక్స్ట్ vs బైనరీ మోడ్స్, <code>FILE*</code> పాయింటర్, మరియు స్ట్రక్చర్‌లను బైనరీ రూపంలో రాయడం నేర్చుకుందాం.
    </div>

    <!-- SECTION 1 -->
    <div class="section-title"><span class="num">1</span>FILE* పాయింటర్ & ఫైల్ మోడ్స్ (File Access Modes)</div>
    <div class="section-body">
      <p>
        C స్టాండర్డ్ లైబ్రరీ <code>&lt;stdio.h&gt;</code> లో ఒక ఫైల్ స్ట్రీమ్‌ను నిర్వహించడానికి <strong>FILE</strong> అనే ప్రత్యేక స్ట్రక్చర్ మరియు దాన్ని సూచించే <strong>FILE* పాయింటర్</strong> ఉంటుంది.
      </p>

      <div style="overflow-x:auto; margin:16px 0;">
        <table style="width:100%; border-collapse:collapse; font-size:13px; text-align:left;">
          <thead>
            <tr style="background:var(--bg3); border-bottom:2px solid var(--border);">
              <th style="padding:10px 14px; color:var(--text);">మోడ్</th>
              <th style="padding:10px 14px; color:var(--text);">పనితీరు</th>
              <th style="padding:10px 14px; color:var(--text);">ఫైల్ లేకపోతే?</th>
              <th style="padding:10px 14px; color:var(--text);">ఫైల్ ఇప్పటికే ఉంటే?</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom:1px solid var(--border);">
              <td style="padding:10px 14px; font-weight:700; color:#10b981;">"r" (Read)</td>
              <td style="padding:10px 14px;">ఫైల్ చదవడానికి మాత్రమే ఓపెన్ చేస్తుంది</td>
              <td style="padding:10px 14px;"><code>NULL</code> రిటర్న్ చేస్తుంది</td>
              <td style="padding:10px 14px;">డేటా చెక్కుచెదరకుండా ఉంటుంది</td>
            </tr>
            <tr style="border-bottom:1px solid var(--border);">
              <td style="padding:10px 14px; font-weight:700; color:#10b981;">"w" (Write)</td>
              <td style="padding:10px 14px;">ఫైల్‌లో రాయడానికి ఓపెన్ చేస్తుంది</td>
              <td style="padding:10px 14px;">కొత్త ఫైల్ క్రియేట్ అవుతుంది</td>
              <td style="padding:10px 14px; color:#ef4444;">పాత డేటా మొత్తం తుడిచిపెట్టుకుపోతుంది!</td>
            </tr>
            <tr style="border-bottom:1px solid var(--border);">
              <td style="padding:10px 14px; font-weight:700; color:#10b981;">"a" (Append)</td>
              <td style="padding:10px 14px;">ఫైల్ చివర కొత్త డేటా కలపడానికి</td>
              <td style="padding:10px 14px;">కొత్త ఫైల్ క్రియేట్ అవుతుంది</td>
              <td style="padding:10px 14px;">చివర డేటా జోడించబడుతుంది</td>
            </tr>
            <tr>
              <td style="padding:10px 14px; font-weight:700; color:#10b981;">"rb", "wb"</td>
              <td style="padding:10px 14px;">బైనరీ ఫైల్స్ (ఇమేజ్, వీడియో, స్ట్రక్చర్)</td>
              <td style="padding:10px 14px;">బైనరీ మోడ్‌లో వర్తిస్తుంది</td>
              <td style="padding:10px 14px;">ఎటువంటి న్యూలైన్ కన్వర్షన్ జరగదు</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- SECTION 2 -->
    <div class="section-title"><span class="num">2</span>టెక్స్ట్ ఫైల్స్: fprintf() & fscanf() లైవ్ డెమో</div>
    <div class="section-body">
      <p>
        మానవులు చదవగలిగే సాధారణ టెక్స్ట్ ఫైల్స్‌లో డేటాను రాయడానికి <code>fprintf()</code> మరియు తిరిగి చదవడానికి <code>fscanf()</code> వాడతాం:
      </p>

      <div class="code-block" style="margin:16px 0;">
        <div class="code-block-header">
          <span class="lang-tag">C — Text File Write and Read</span>
          <a class="try-btn" href="/online-c-compiler.html">⚡ Try in C Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main(void) {
    // 1. ఫైల్‌లో రాయడం
    FILE *fp = fopen("server_log.txt", "w");
    if (fp == NULL) {
        printf("ఫైల్ ఓపెన్ చేయడం సాధ్యం కాలేదు!\\n");
        return 1;
    }

    fprintf(fp, "ID:%d Name:%s Score:%.1f\\n", 101, "క్రిష్", 95.5);
    fclose(fp); // ఫైల్ క్లోజ్ చేయడం వల్ల బఫర్ డిస్క్‌పై సేవ్ అవుతుంది

    // 2. ఫైల్ నుండి చదవడం
    fp = fopen("server_log.txt", "r");
    if (fp != NULL) {
        int id; char name[20]; float score;
        fscanf(fp, "ID:%d Name:%s Score:%f", &id, name, &score);
        printf("ఫైల్ నుండి చదివిన సమాచారం: %d | %s | %.1f\\n", id, name, score);
        fclose(fp);
    }
    return 0;
}</code></pre>
      </div>
    </div>

    <!-- SECTION 3 -->
    <div class="section-title"><span class="num">3</span>బైనరీ ఫైల్స్: fwrite() & fread() తో Struct పర్సిస్టెన్స్</div>
    <div class="section-body">
      <p>
        టెక్స్ట్ ఫైల్స్‌లో సంఖ్యలను స్ట్రింగ్స్‌గా మార్చి రాయాలి. కానీ బైనరీ మోడ్‌లో మొత్తం స్ట్రక్చర్‌ను (RAM లో ఉన్న యథాతథ బైట్లను) ఒకే ఒక్క ఇన్‌స్ట్రక్షన్‌తో నేరుగా హార్డ్ డిస్క్‌పై రాయవచ్చు. ఇది అత్యంత వేగవంతమైన ప్రొడక్షన్ పద్ధతి:
      </p>

      <div class="code-block" style="margin:16px 0;">
        <div class="code-block-header">
          <span class="lang-tag">C — Binary Struct I/O (fwrite & fread)</span>
          <a class="try-btn" href="/online-c-compiler.html">⚡ Try in C Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

typedef struct {
    int id;
    char grade;
} Record;

int main(void) {
    Record out = {501, 'A'};
    Record in;

    // బైనరీ ఫైల్‌లో రాయడం
    FILE *fp = fopen("records.dat", "wb");
    if (fp != NULL) {
        fwrite(&out, sizeof(Record), 1, fp);
        fclose(fp);
    }

    // బైనరీ ఫైల్ నుండి చదవడం
    fp = fopen("records.dat", "rb");
    if (fp != NULL) {
        fread(&in, sizeof(Record), 1, fp);
        printf("బైనరీ రికార్డు: ID = %d, Grade = %c\\n", in.id, in.grade);
        fclose(fp);
    }
    return 0;
}</code></pre>
      </div>
    </div>

    <!-- SECTION 4 -->
    <div class="section-title"><span class="num">4</span>బిగినర్స్ చేసే ఘోరమైన తప్పులు (Beginner Pitfalls)</div>
    <div class="section-body">
      <div style="display:flex; flex-direction:column; gap:12px; margin:16px 0;">
        <div style="background:rgba(239, 68, 68, 0.08); border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px 18px;">
          <div style="font-weight:700; color:#ef4444; font-size:14px;">❌ 1. NULL చెక్ చేయకుండా ఫైల్ చదవడానికి ప్రయత్నించడం:</div>
          <code style="font-size:13px; color:var(--text); display:block; margin:6px 0;">FILE *fp = fopen("abc.txt", "r"); fscanf(fp, ...); // ఫైల్ లేకపోతే క్రాష్!</code>
          <span style="font-size:13px; color:var(--text2); display:block;">ఫైల్ హార్డ్ డిస్క్‌లో లేకపోతే <code>fopen</code> NULL రిటర్న్ చేస్తుంది. NULL పాయింటర్‌ను పాస్ చేస్తే ప్రోగ్రామ్ తక్షణమే క్రాష్ అవుతుంది. ఎల్లప్పుడూ <code>if (fp == NULL)</code> తనిఖీ చేయాలి.</span>
        </div>

        <div style="background:rgba(239, 68, 68, 0.08); border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px 18px;">
          <div style="font-weight:700; color:#ef4444; font-size:14px;">❌ 2. fclose() చేయడం మర్చిపోవడం:</div>
          <span style="font-size:13px; color:var(--text2); display:block; margin-top:4px;">C లో ఫైల్ ఆపరేషన్లు బఫర్ చేయబడతాయి. <code>fclose(fp)</code> పిలిచినప్పుడు మాత్రమే డేటా పూర్తిగా డిస్క్‌పై వ్రాయబడుతుంది (Flush). ఫైల్ క్లోజ్ చేయకపోతే డేటా సేవ్ కాకుండా నష్టపోయే ప్రమాదం ఉంది.</span>
        </div>
      </div>
    </div>

    <!-- SECTION 5 -->
    <div class="section-title"><span class="num">5</span>తరచుగా అడిగే ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div style="display:flex; flex-direction:column; gap:12px; margin-top:16px;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px;">
          <h4 style="color:#10b981; margin:0 0 6px 0; font-size:14.5px;">Q: fseek() మరియు ftell() ఫంక్షన్లను ఎందుకు ఉపయోగిస్తారు?</h4>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.6;">
            <code>fseek(fp, offset, SEEK_SET)</code> ఫైల్ కర్సర్‌ను మనకు కావలసిన నిర్దిష్ట బైట్ స్థానానికి జంప్ చేయిస్తుంది (Random Access). <code>ftell(fp)</code> కర్సర్ ప్రస్తుతం ఏ బైట్ వద్ద ఉందో చెబుతుంది. ఉదాహరణకు ఫైల్ చివరకు వెళ్లి <code>ftell</code> పిలిస్తే ఆ ఫైల్ యొక్క మొత్తం సైజ్ క్షణాల్లో తెలుస్తుంది.
          </p>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px;">
          <h4 style="color:#10b981; margin:0 0 6px 0; font-size:14.5px;">Q: టెక్స్ట్ మోడ్ మరియు బైనరీ మోడ్ మధ్య విండోస్‌లో న్యూలైన్ తేడా ఏమిటి?</h4>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.6;">
            విండోస్‌లో టెక్స్ట్ మోడ్ <code>\\n</code> ను ఆటోమేటిక్‌గా <code>\\r\\n</code> (Carriage Return + Line Feed) గా మారుస్తుంది. కానీ బైనరీ మోడ్ (<code>"rb"</code>/<code>"wb"</code>) ఎటువంటి అనువాదం చేయకుండా అసలైన రా బైట్లను మాత్రమే భద్రపరుస్తుంది.
          </p>
        </div>
      </div>
    </div>
  `,

  // -------------------------------------------------------------
  // CHAPTER 20: COMPLETE CAPSTONE MINI PROJECT
  // -------------------------------------------------------------
  20: `
    <div class="intro-box">
      అభినందనలు! మనం C ప్రోగ్రామింగ్ ప్రాథమిక వేరియబుల్స్ నుండి మొదలుకొని కంట్రోల్ ఫ్లో, లూప్స్, ఫంక్షన్స్, పాయింటర్లు, డైనమిక్ మెమరీ, మరియు ఫైల్ హ్యాండ్లింగ్ వరకు అన్ని కాన్సెప్ట్‌లను పూర్తి చేశాం. ఈ ముగింపు అధ్యాయంలో వాటన్నింటినీ ఒకచోట చేర్చి ఒక పూర్తి స్థాయి ప్రొడక్షన్-గ్రేడ్ <strong>స్టూడెంట్ రికార్డ్ మేనేజ్‌మెంట్ సిస్టమ్ (Student Record Management System)</strong> ను నిర్మిద్దాం.
    </div>

    <!-- SECTION 1 -->
    <div class="section-title"><span class="num">1</span>ప్రాజెక్ట్ ఆర్కిటెక్చర్ & కోర్ ఫీచర్లు</div>
    <div class="section-body">
      <p>
        ఈ ప్రాజెక్ట్ ఒక పాఠశాల లేదా కళాశాల అడ్మినిస్ట్రేషన్ వ్యవస్థ లాగా పనిచేస్తుంది. దీనిలో ఉపయోగించిన ఆధునిక ఇంజనీరింగ్ పద్ధతులు:
      </p>

      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:16px; margin:16px 0;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px;">
          <strong style="color:#10b981; display:block; margin-bottom:6px;">1. Struct & Typedef</strong>
          <span style="font-size:13px; color:var(--text2); line-height:1.5; display:block;">రోల్ నంబర్, పేరు, మార్కులు కలిగిన శుభ్రమైన స్టూడెంట్ రికార్డ్ మోడల్.</span>
        </div>
        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px;">
          <strong style="color:#10b981; display:block; margin-bottom:6px;">2. Dynamic Realloc</strong>
          <span style="font-size:13px; color:var(--text2); line-height:1.5; display:block;">విద్యార్థులు పెరిగే కొద్దీ హీప్ మెమరీని ఆటోమేటిక్‌గా విస్తరించే డైనమిక్ అరే.</span>
        </div>
        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px;">
          <strong style="color:#10b981; display:block; margin-bottom:6px;">3. Binary File Persistence</strong>
          <span style="font-size:13px; color:var(--text2); line-height:1.5; display:block;">డేటాను <code>students.dat</code> ఫైల్‌లో భద్రపరచడం & రీలోడ్ చేయడం.</span>
        </div>
        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px;">
          <strong style="color:#10b981; display:block; margin-bottom:6px;">4. Interactive CLI Menu</strong>
          <span style="font-size:13px; color:var(--text2); line-height:1.5; display:block;">యూజర్ ఫ్రెండ్లీ కన్సోల్ మెనూ మరియు ఇన్‌పుట్ వాలిడేషన్.</span>
        </div>
      </div>
    </div>

    <!-- SECTION 2 -->
    <div class="section-title"><span class="num">2</span>పూర్తి C సోర్స్ కోడ్ (Complete Production Code)</div>
    <div class="section-body">
      <div class="code-block" style="margin:16px 0;">
        <div class="code-block-header">
          <span class="lang-tag">C — Student Record Management System</span>
          <a class="try-btn" href="/online-c-compiler.html">⚡ Try in C Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;
#include &lt;string.h&gt;

#define DATA_FILE "students.dat"

typedef struct {
    int rollNo;
    char name[40];
    float marks;
} Student;

// గ్లోబల్ లేదా మెయిన్ మేనేజ్డ్ పాయింటర్స్
Student *students = NULL;
int studentCount = 0;

void addStudent(void) {
    // మెమరీని 1 ఎలిమెంట్ పరిమాణం పెంచడం
    Student *temp = (Student*) realloc(students, (studentCount + 1) * sizeof(Student));
    if (temp == NULL) {
        printf("ఎర్రర్: మెమరీ సరిపోలేదు!\\n");
        return;
    }
    students = temp;

    printf("\\nవిద్యార్థి రోల్ నంబర్: ");
    scanf("%d", &students[studentCount].rollNo);
    printf("విద్యార్థి పేరు: ");
    scanf(" %39s", students[studentCount].name);
    printf("మార్కులు: ");
    scanf("%f", &students[studentCount].marks);

    studentCount++;
    printf("✅ విద్యార్థి రికార్డు విజయవంతంగా జోడించబడింది!\\n");
}

void displayStudents(void) {
    if (studentCount == 0) {
        printf("\\nరికార్డులు ఏవీ లేవు!\\n");
        return;
    }
    printf("\\n-------------------------------------------------\\n");
    printf("%-10s %-25s %-10s\\n", "రోల్ నెం", "పేరు", "మార్కులు");
    printf("-------------------------------------------------\\n");
    for (int i = 0; i &lt; studentCount; i++) {
        printf("%-10d %-25s %-10.2f\\n", students[i].rollNo, students[i].name, students[i].marks);
    }
    printf("-------------------------------------------------\\n");
}

void saveToFile(void) {
    FILE *fp = fopen(DATA_FILE, "wb");
    if (fp == NULL) {
        printf("ఫైల్ సేవ్ చేయడం సాధ్యం కాలేదు!\\n");
        return;
    }
    fwrite(&studentCount, sizeof(int), 1, fp);
    fwrite(students, sizeof(Student), studentCount, fp);
    fclose(fp);
    printf("💾 సమాచారం డిస్క్‌పై సేవ్ చేయబడింది.\\n");
}

void loadFromFile(void) {
    FILE *fp = fopen(DATA_FILE, "rb");
    if (fp == NULL) return; // ఫైల్ ఇంకా లేకపోతే ఏమీ చేయనవసరం లేదు

    fread(&studentCount, sizeof(int), 1, fp);
    students = (Student*) malloc(studentCount * sizeof(Student));
    if (students != NULL) {
        fread(students, sizeof(Student), studentCount, fp);
    }
    fclose(fp);
}

int main(void) {
    loadFromFile(); // గతంలో సేవ్ చేసిన రికార్డులను లోడ్ చేయడం
    int choice;

    do {
        printf("\\n====== విద్యార్థి రికార్డ్ మేనేజ్‌మెంట్ ======\\n");
        printf("1. కొత్త విద్యార్థిని జోడించు (Add)\\n");
        printf("2. అన్ని రికార్డులను ప్రదర్శించు (Display All)\\n");
        printf("3. సేవ్ చేసి నిష్క్రమించు (Save &amp; Exit)\\n");
        printf("మీ ఎంపిక (1-3): ");
        if (scanf("%d", &choice) != 1) break;

        switch (choice) {
            case 1: addStudent(); break;
            case 2: displayStudents(); break;
            case 3: saveToFile(); break;
            default: printf("చెల్లని ఎంపిక! దయచేసి మళ్లీ ప్రయత్నించండి.\\n");
        }
    } while (choice != 3);

    // మెమరీ క్లీనప్
    if (students != NULL) {
        free(students);
        students = NULL;
    }
    printf("ధన్యవాదాలు! ప్రాజెక్ట్ విజయవంతంగా ముగిసింది.\\n");
    return 0;
}</code></pre>
      </div>
    </div>

    <!-- SECTION 3 -->
    <div class="section-title"><span class="num">3</span>లైన్-బై-లైన్ ఆర్కిటెక్చర్ విశ్లేషణ</div>
    <div class="section-body">
      <ul style="margin:0; padding-left:20px; font-size:13.5px; color:var(--text); line-height:1.8;">
        <li><strong>realloc() డైనమిక్ గ్రోత్:</strong> యూజర్ కొత్త విద్యార్థిని యాడ్ చేసిన ప్రతిసారీ <code>studentCount + 1</code> తో హీప్ మెమరీని సరిగ్గా అవసరమైనంత మాత్రమే విస్తరిస్తుంది.</li>
        <li><strong>బైనరీ పర్సిస్టెన్స్:</strong> <code>fwrite</code> మరియు <code>fread</code> తో మొత్తం స్ట్రక్చర్ అరేను క్షణాల్లో ఫైల్‌లోకి రాయడం/చదవడం జరుగుతుంది.</li>
        <li><strong>జీరో మెమరీ లీక్స్:</strong> ప్రోగ్రామ్ ముగిసే ముందు <code>free(students)</code> తో కేటాయించిన హీప్ మెమరీని పూర్తిగా ఆపరేటింగ్ సిస్టమ్‌కు విడుదల చేశాం.</li>
      </ul>
    </div>

    <!-- SECTION 4 -->
    <div class="section-title"><span class="num">4</span>ముగింపు & భవిష్యత్ ప్రయాణం (The Road Ahead)</div>
    <div class="section-body">
      <div style="background:var(--bg2); border:1px solid #10b981; border-radius:8px; padding:20px; margin:16px 0;">
        <h4 style="color:#10b981; margin:0 0 10px 0; font-size:16px;">🎓 కంగ్రాట్స్! మీరు C మాస్టర్ క్లాస్‌ను విజయవంతంగా పూర్తి చేశారు</h4>
        <p style="font-size:13.5px; color:var(--text); margin:0 0 12px 0; line-height:1.7;">
          C లాంగ్వేజ్‌ను అర్థం చేసుకోవడం అంటే కేవలం సింటాక్స్ నేర్చుకోవడం కాదు; కంప్యూటర్ మెమరీ, ప్రాసెసర్ రిజిస్టర్లు, కాల్ స్టాక్, మరియు ఆపరేటింగ్ సిస్టమ్ పనిచేసే విధానాన్ని మూలాల్లోకి వెళ్లి శోధించడం. C లో మీరు సాధించిన ఈ బలమైన పునాది భవిష్యత్తులో ఈ క్రింది రంగాలలో మీకు అపారమైన ప్రయోజనాన్ని ఇస్తుంది:
        </p>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:12px;">
          <div style="background:var(--bg3); padding:10px 14px; border-radius:6px; font-size:13px; color:var(--text);">
            <strong>1. C++ &amp; OOPs:</strong> ఆబ్జెక్ట్ ఓరియెంటెడ్ క్లాసెస్, STL, Templates సులువుగా అర్థమవుతాయి.
          </div>
          <div style="background:var(--bg3); padding:10px 14px; border-radius:6px; font-size:13px; color:var(--text);">
            <strong>2. Data Structures (DSA):</strong> Linked Lists, Trees, Graphs ను పాయింటర్లతో స్వయంగా నిర్మించగలరు.
          </div>
          <div style="background:var(--bg3); padding:10px 14px; border-radius:6px; font-size:13px; color:var(--text);">
            <strong>3. Systems &amp; OS:</strong> లైనక్స్ సిస్టమ్ కాల్స్, డివైస్ డ్రైవర్లు, నెట్‌వర్క్ సాకెట్ ప్రోగ్రామింగ్.
          </div>
        </div>
      </div>
    </div>
  `
};

// Execute writing out upgraded files for Phase 5 (Lessons 17 to 20)
for (let i = 17; i <= 20; ++i) {
  const lesson = LESSONS.find(l => l.num === i);
  if (!lesson) continue;
  lesson.contentHtml = PHASE5_CONTENTS[i];
  const html = generatePageHtml(lesson);
  fs.writeFileSync(path.join(cDir, lesson.file), html, 'utf8');
  console.log(`✅ Fully enriched Phase 5 Lesson ${i} : ${lesson.file} (${html.length} chars)`);
}

