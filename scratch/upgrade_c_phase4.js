const fs = require('fs');
const path = require('path');
const { LESSONS } = require('./c_curriculum_data.js');
const { generatePageHtml } = require('./c_page_template.js');

const cDir = path.join(__dirname, '../public/blog-c');

// ==========================================
// COMPREHENSIVE EDITORIAL MASTERCLASS CONTENT: PHASE 4 (CH 13 - 16)
// ==========================================

const PHASE4_CONTENTS = {
  // -------------------------------------------------------------
  // CHAPTER 13: 1D ARRAYS & 2D MATRICES
  // -------------------------------------------------------------
  13: `
    <div class="intro-box">
      కంప్యూటర్ ప్రోగ్రామింగ్‌లో ఒకే రకమైన వేలాది డేటా అంశాలను (ఉదాహరణకు 100 మంది విద్యార్థుల మార్కులు, గేమ్ గ్రిడ్ కోఆర్డినేట్లు, లేదా ఇమేజ్ పిక్సెల్స్) వేర్వేరు వేరియబుల్స్ లేకుండా ఒకే గొడుగు క్రింద నిల్వ చేయడానికి <strong>అర్రేలు (Arrays)</strong> ప్రాథమిక పునాది. RAM లో వరుస మెమరీ గదుల కేటాయింపు (Contiguous Memory Allocation), $O(1)$ రాండమ్ యాక్సెస్ మెకానిక్స్, C లో బౌండ్స్ చెకింగ్ లేకపోవడం వెనుక ఉన్న ప్రమాదాలు, మరియు 2D మ్యాట్రిక్స్ యొక్క <strong>Row-Major Order</strong> మెమరీ ఫార్ములాను ఈ అధ్యాయంలో లోతుగా నేర్చుకుందాం.
    </div>

    <!-- SECTION 1 -->
    <div class="section-title"><span class="num">1</span>అర్రే అంటే ఏమిటి? Contiguous Memory Allocation & O(1) యాక్సెస్</div>
    <div class="section-body">
      <p>
        <strong>అర్రే (Array)</strong> అనేది ఒకే డేటా రకానికి చెందిన స్థిర పరిమాణపు ఎలిమెంట్లను RAM లో వరుసగా ఉండే మెమరీ గదులలో (Contiguous Memory Blocks) నిల్వ చేసే డేటా స్ట్రక్చర్. 
      </p>

      <div style="background:var(--bg2); border-left:4px solid #10b981; border-radius:0 8px 8px 0; padding:16px; margin:16px 0;">
        <strong style="color:#10b981; font-size:14.5px;">⚡ O(1) రాండమ్ యాక్సెస్ వెనుక ఉన్న గణిత ఫార్ములా:</strong>
        <p style="font-size:13.5px; color:var(--text); margin:6px 0 0 0; line-height:1.6;">
          కంప్యూటర్ అర్రేలోని ఏ ఎలిమెంట్‌నైనా (మొదటిదైనా లేదా 10,000వ ఎలిమెంట్ అయినా) ఒకే ఒక్క మైక్రోసెకనులో ఎలా యాక్సెస్ చేయగలదు? CPU కి ఎలిమెంట్లను వరుసగా లెక్కించాల్సిన అవసరం లేదు. అది నేరుగా ఈ క్రింది మెమరీ అడ్రస్ ఫార్ములాను లెక్కిస్తుంది:
        </p>
        <code style="font-size:13.5px; color:#10b981; display:block; background:var(--bg3); padding:8px 12px; border-radius:4px; margin:8px 0; font-weight:700;">
          Address(arr[i]) = Base_Address + (i × sizeof(DataType))
        </code>
        <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.5;">
          ఉదాహరణకు <code>int arr[5]</code> బేస్ అడ్రస్ <code>1000</code> వద్ద ఉంటే, <code>arr[3]</code> అడ్రస్ నేరుగా <code>1000 + (3 × 4) = 1012</code> అవుతుంది. ఈ సింగిల్ మల్టిప్లికేషన్ వల్లే అర్రే ఇండెక్సింగ్ <strong>O(1) Constant Time</strong> లో మెరుపు వేగంతో పనిచేస్తుంది.
        </p>
      </div>

      <div class="code-block" style="margin:16px 0;">
        <div class="code-block-header">
          <span class="lang-tag">C — 1D Array Declaration, Input & Traversal</span>
          <a class="try-btn" href="/online-c-compiler.html">⚡ Try in C Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main(void) {
    // 5 పూర్ణాంకాల అర్రే డిక్లరేషన్ & ఇనీషియలైజేషన్
    int scores[5] = {88, 92, 79, 95, 84};
    int total = 0;

    printf("విద్యార్థుల స్కోర్లు:\\n");
    for (int i = 0; i &lt; 5; i++) {
        printf("Score[%d] = %d (RAM Address: %p)\\n", i, scores[i], (void*)&scores[i]);
        total += scores[i];
    }

    double average = (double)total / 5;
    printf("సగటు స్కోర్: %.2lf\\n", average);
    return 0;
}</code></pre>
      </div>
    </div>

    <!-- SECTION 2 -->
    <div class="section-title"><span class="num">2</span>C లో బౌండ్స్ చెకింగ్ ఎందుకు ఉండదు? (No Boundary Checking Trap)</div>
    <div class="section-body">
      <p>
        Java, Python వంటి ఆధునిక భాషలలో అర్రే సైజ్ దాటి యాక్సెస్ చేయడానికి ప్రయత్నిస్తే (ఉదా: 5 సైజ్ ఉన్న అర్రేకి <code>arr[10]</code> అంటే) వెంటనే <em>ArrayIndexOutOfBoundsException</em> వస్తుంది. కానీ <strong>C లాంగ్వేజ్‌లో ఎటువంటి బౌండ్స్ చెకింగ్ ఉండదు!</strong>
      </p>

      <div style="background:rgba(239, 68, 68, 0.08); border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px 18px; margin:16px 0;">
        <strong style="color:#ef4444; font-size:14px;">⚠️ Silent Memory Corruption & Security Exploits:</strong>
        <p style="font-size:13px; color:var(--text); margin:6px 0 0 0; line-height:1.6;">
          డెన్నిస్ రిట్చీ C ని రూపొందించినప్పుడు గరిష్ట పనితీరు (Maximum Execution Speed) కోసమే ప్రాధాన్యత ఇచ్చారు. ప్రతి ఇండెక్స్ యాక్సెస్ వద్ద సైజ్ చెక్ చేస్తే CPU సైకిల్స్ వృధా అవుతాయి. ఫలితంగా మీరు <code>arr[10] = 500;</code> అని రాస్తే C మిమ్మల్ని ఆపదు! అది పక్కనే ఉన్న వేరే వేరియబుల్ మెమరీని నిశ్శబ్దంగా ఓవర్‌రైట్ చేస్తుంది (Silent Corruption) లేదా ఆపరేటింగ్ సిస్టమ్ ద్వారా రక్షించబడిన మెమరీని టచ్ చేసినప్పుడు ప్రోగ్రామ్ క్రాష్ అవుతుంది (Segmentation Fault).
        </p>
      </div>
    </div>

    <!-- SECTION 3 -->
    <div class="section-title"><span class="num">3</span>2D అర్రేస్ & Row-Major Order మెమరీ లేఅవుట్</div>
    <div class="section-body">
      <p>
        గణిత మ్యాట్రిక్స్, చదరంగం బోర్డులు, లేదా గేమింగ్ గ్రిడ్లను సూచించడానికి <strong>2D అర్రేస్ (మల్టీ-డైమెన్షనల్ అర్రేస్)</strong> వాడతాం. అయితే భౌతికంగా కంప్యూటర్ RAM లో 2D గ్రిడ్లు ఉండవు! కంప్యూటర్ మెమరీ అనేది కేవలం 1D లీనియర్ బైట్ల వరుస మాత్రమే.
      </p>

      <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px; margin:16px 0;">
        <h4 style="color:#10b981; margin:0 0 8px 0; font-size:14.5px;">📐 Row-Major Order అంటే ఏమిటి?</h4>
        <p style="font-size:13.5px; color:var(--text); margin:0 0 8px 0; line-height:1.6;">
          C లాంగ్వేజ్ 2D అర్రేలోని మొదటి వరుసను (Row 0) మెమరీలో పూర్తిగా ఉంచిన తర్వాతే, దాని పక్కనే రెండవ వరుసను (Row 1), ఆ తర్వాత మూడవ వరుసను వరుసగా భద్రపరుస్తుంది. దీనిని <strong>Row-Major Order</strong> అంటారు.
        </p>
        <code style="font-size:13px; color:var(--text); display:block; background:var(--bg3); padding:8px 12px; border-radius:4px; margin:8px 0;">
          Address(Matrix[row][col]) = Base + (row × Total_Columns + col) × sizeof(DataType)
        </code>
      </div>

      <div class="code-block" style="margin:16px 0;">
        <div class="code-block-header">
          <span class="lang-tag">C — 2D Matrix Addition Demo</span>
          <a class="try-btn" href="/online-c-compiler.html">⚡ Try in C Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main(void) {
    int A[2][2] = {{1, 2}, {3, 4}};
    int B[2][2] = {{5, 6}, {7, 8}};
    int Sum[2][2];

    // మ్యాట్రిక్స్ కూడిక (Matrix Addition)
    for (int r = 0; r &lt; 2; r++) {
        for (int c = 0; c &lt; 2; c++) {
            Sum[r][c] = A[r][c] + B[r][c];
        }
    }

    printf("మ్యాట్రిక్స్ కూడిక ఫలితం (Sum Matrix):\\n");
    for (int r = 0; r &lt; 2; r++) {
        for (int c = 0; c &lt; 2; c++) {
            printf("%4d", Sum[r][c]);
        }
        printf("\\n");
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
          <div style="font-weight:700; color:#ef4444; font-size:14px;">❌ 1. Off-by-one ఇండెక్స్ ట్రాప్:</div>
          <code style="font-size:13px; color:var(--text); display:block; margin:6px 0;">int arr[5]; arr[5] = 100; // ప్రమాదకరమైన బగ్! చెల్లుబాటు అయ్యే ఇండెక్స్‌లు 0 నుండి 4 మాత్రమే</code>
          <span style="font-size:13px; color:var(--text2); display:block;">5 ఎలిమెంట్స్ ఉన్న అర్రే చివరి ఇండెక్స్ <code>4</code> మాత్రమే. <code>arr[5]</code> రాస్తే అది అర్రే హద్దులు దాటి పక్కనున్న మెమరీని నాశనం చేస్తుంది.</span>
        </div>

        <div style="background:rgba(239, 68, 68, 0.08); border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px 18px;">
          <div style="font-weight:700; color:#ef4444; font-size:14px;">❌ 2. అర్రే మొత్తాన్ని ఒకేసారి అసైన్ చేయడానికి ప్రయత్నించడం:</div>
          <code style="font-size:13px; color:var(--text); display:block; margin:6px 0;">int a[5] = {1, 2, 3, 4, 5}; int b[5]; b = a; // Compiler Error!</code>
          <span style="font-size:13px; color:var(--text2); display:block;">C లో అర్రేలను నేరుగా <code>b = a;</code> అని అసైన్ చేయలేం. లూప్ వాడి ఒక్కో ఎలిమెంట్‌ను కాపీ చేయాలి లేదా <code>memcpy()</code> ఫంక్షన్ వాడాలి.</span>
        </div>
      </div>
    </div>

    <!-- SECTION 5 -->
    <div class="section-title"><span class="num">5</span>తరచుగా అడిగే ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div style="display:flex; flex-direction:column; gap:12px; margin-top:16px;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px;">
          <h4 style="color:#10b981; margin:0 0 6px 0; font-size:14.5px;">Q: అర్రే సైజ్ కనుగొనడానికి sizeof(arr) / sizeof(arr[0]) ఎందుకు వాడతారు?</h4>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.6;">
            <code>sizeof(arr)</code> అర్రే మొత్తం ఆక్రమించిన బైట్ల సంఖ్యను (ఉదా: 5 int లకు 20 బైట్లు) ఇస్తుంది. <code>sizeof(arr[0])</code> ఒక ఎలిమెంట్ బైట్లను (4 బైట్లు) ఇస్తుంది. 20 ని 4 తో భాగిస్తే ఎలిమెంట్ల సంఖ్య <strong>5</strong> వస్తుంది. ఇది కంపైల్-టైమ్ కాలిక్యులేషన్.
          </p>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px;">
          <h4 style="color:#10b981; margin:0 0 6px 0; font-size:14.5px;">Q: VLA (Variable Length Arrays) అంటే ఏమిటి? వాటిని పరిశ్రమల్లో ఎందుకు నివారిస్తారు?</h4>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.6;">
            C99 లో ప్రవేశపెట్టిన VLA ద్వారా రన్‌టైమ్‌లో యూజర్ ఇచ్చిన సైజ్‌తో (<code>int arr[n];</code>) అర్రేను స్టాక్ పై సృష్టించవచ్చు. కానీ యూజర్ అనుకోకుండా చాలా పెద్ద సైజ్ (ఉదా: <code>n = 10000000</code>) ఇస్తే స్టాక్ ఓవర్‌ఫ్లో జరిగి సిస్టమ్ క్రాష్ అవుతుంది. అందుకే లైనక్స్ కర్నల్ మరియు ప్రొఫెషనల్ కోడ్‌బేస్‌లలో VLA లను నిషేధించారు.
          </p>
        </div>
      </div>
    </div>
  `,

  // -------------------------------------------------------------
  // CHAPTER 14: STRINGS & <STRING.H>
  // -------------------------------------------------------------
  14: `
    <div class="intro-box">
      జావా లేదా పైథాన్‌లో స్ట్రింగ్స్ అంటే ప్రత్యేకమైన ఆబ్జెక్టులు. కానీ C లాంగ్వేజ్‌లో స్ట్రింగ్స్ కోసం ఎటువంటి ప్రత్యేక డేటా టైప్ లేదు! C లో స్ట్రింగ్ అంటే కేవలం <strong>చివరలో '\\\\0' (Null Terminator) కలిగిన క్యారెక్టర్ అర్రే (Character Array)</strong> మాత్రమే. ఈ అధ్యాయంలో నల్ టెర్మినేటర్ ప్రాముఖ్యత, స్ట్రింగ్ లిటరల్స్ vs క్యారెక్టర్ అర్రేస్, <code>&lt;string.h&gt;</code> లోని ప్రముఖ ఫంక్షన్లు, మరియు ప్రపంచాన్ని గడగడలాడించిన <strong>బఫర్ ఓవర్‌ఫ్లో సెక్యూరిటీ వల్నరబిలిటీస్</strong> ను సమగ్రంగా పరిశీలిద్దాం.
    </div>

    <!-- SECTION 1 -->
    <div class="section-title"><span class="num">1</span>నల్ టెర్మినేటర్ ('\\0') అంతర్గత సూత్రం & మెమరీ లేఅవుట్</div>
    <div class="section-body">
      <p>
        C లో ఒక స్ట్రింగ్‌ను మెమరీలో స్టోర్ చేసినప్పుడు, అది ఎక్కడ ముగిసిందో కంపైలర్‌కు తెలియజేయడానికి చివరలో ప్రత్యేకమైన <strong>'\\\\0' (ASCII విలువ 0 - Null Character)</strong> తప్పనిసరిగా ఉండాలి.
      </p>

      <div style="background:var(--bg2); border-left:4px solid #10b981; border-radius:0 8px 8px 0; padding:16px; margin:16px 0;">
        <strong style="color:#10b981; font-size:14.5px;">🔍 "Hello" మెమరీలో ఎన్ని బైట్లు తీసుకుంటుంది?</strong>
        <p style="font-size:13.5px; color:var(--text); margin:6px 0 0 0; line-height:1.6;">
          <code>char greeting[] = "Hello";</code> అని రాసినప్పుడు అక్షరాలు 5 ఉన్నప్పటికీ, కంపైలర్ చివర ఆటోమేటిక్‌గా <code>'\\\\0'</code> ను జోడిస్తుంది. కాబట్టి ఇది RAM లో <strong>6 బైట్ల</strong> స్థలాన్ని ఆక్రమిస్తుంది:
        </p>
        <div style="display:flex; gap:6px; margin:12px 0; font-family:monospace; font-size:14px; font-weight:700;">
          <span style="background:var(--bg3); border:1px solid var(--border); padding:8px 12px; border-radius:4px;">'H'</span>
          <span style="background:var(--bg3); border:1px solid var(--border); padding:8px 12px; border-radius:4px;">'e'</span>
          <span style="background:var(--bg3); border:1px solid var(--border); padding:8px 12px; border-radius:4px;">'l'</span>
          <span style="background:var(--bg3); border:1px solid var(--border); padding:8px 12px; border-radius:4px;">'l'</span>
          <span style="background:var(--bg3); border:1px solid var(--border); padding:8px 12px; border-radius:4px;">'o'</span>
          <span style="background:rgba(16,185,129,0.15); border:1px solid #10b981; color:#10b981; padding:8px 12px; border-radius:4px;">'\\\\0'</span>
        </div>
        <p style="font-size:13px; color:var(--text2); margin:0;">
          ఒకవేళ ఈ <code>'\\\\0'</code> లేకపోతే, <code>printf("%s")</code> మెమరీలో ఎక్కడో ఒక నల్ బైట్ దొరికేంత వరకు పక్కనున్న గార్బేజ్ డేటాను ప్రింట్ చేస్తూనే ఉంటుంది!
        </p>
      </div>
    </div>

    <!-- SECTION 2 -->
    <div class="section-title"><span class="num">2</span>String Literal (Read-Only) vs Character Array (Stack)</div>
    <div class="section-body">
      <p>
        స్ట్రింగ్స్‌ను డిక్లేర్ చేసేటప్పుడు బిగినర్స్‌ను ఎక్కువగా గందరగోళానికి గురిచేసే అంశం:
      </p>

      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:16px; margin:16px 0;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px;">
          <h4 style="color:#10b981; margin:0 0 8px 0; font-size:14px;">1. Character Array (మార్చవచ్చు):</h4>
          <code style="font-size:12.5px; color:var(--text); display:block; background:var(--bg3); padding:8px; border-radius:4px; margin-bottom:8px;">char s[] = "Hello";<br>s[0] = 'M'; // ✅ Allowed: "Mello"</code>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.5;">ఇది స్టాక్ మెమరీలో నిల్వ ఉంటుంది. దీనిలోని అక్షరాలను స్వేచ్ఛగా మార్చవచ్చు.</p>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px;">
          <h4 style="color:#ef4444; margin:0 0 8px 0; font-size:14px;">2. Pointer to String Literal (రీడ్-ఓన్లీ):</h4>
          <code style="font-size:12.5px; color:var(--text); display:block; background:var(--bg3); padding:8px; border-radius:4px; margin-bottom:8px;">char *p = "Hello";<br>// p[0] = 'M'; // ❌ CRASH! Bus error / Segfault</code>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.5;">ఇది RAM లోని రీడ్-ఓన్లీ డేటా సెగ్మెంట్ (ROData) లో ఉంటుంది. దీన్ని మార్చడానికి ప్రయత్నిస్తే OS ప్రోగ్రామ్‌ను వెంటనే క్రాష్ చేస్తుంది.</p>
        </div>
      </div>
    </div>

    <!-- SECTION 3 -->
    <div class="section-title"><span class="num">3</span>&lt;string.h&gt; లైబ్రరీ ఫంక్షన్లు & భద్రతా నియమాలు</div>
    <div class="section-body">
      <p>
        C స్టాండర్డ్ లైబ్రరీ <code>&lt;string.h&gt;</code> లోని అత్యంత ముఖ్యమైన ఫంక్షన్ల డెమో:
      </p>

      <div class="code-block" style="margin:16px 0;">
        <div class="code-block-header">
          <span class="lang-tag">C — Standard string library functions</span>
          <a class="try-btn" href="/online-c-compiler.html">⚡ Try in C Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main(void) {
    char str1[30] = "Our";
    char str2[] = " Compiler";
    char copy[30];

    // 1. strlen: స్ట్రింగ్ పొడవు ('\\\\0' ను లెక్కించదు)
    printf("str1 పొడవు: %zu\\n", strlen(str1));

    // 2. strcat: స్ట్రింగ్స్ కలపడం (Concatenation)
    strcat(str1, str2);
    printf("కలిపిన తర్వాత: %s\\n", str1);

    // 3. strcpy: స్ట్రింగ్ కాపీ చేయడం
    strcpy(copy, str1);
    printf("కాపీ చేయబడిన స్ట్రింగ్: %s\\n", copy);

    // 4. strcmp: స్ట్రింగ్స్ పోలిక (0 వస్తే సమానం)
    if (strcmp(str1, copy) == 0) {
        printf("రెండు స్ట్రింగ్స్ ఖచ్చితంగా సమానం!\\n");
    }
    return 0;
}</code></pre>
      </div>

      <div style="background:rgba(239, 68, 68, 0.08); border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px 18px; margin:16px 0;">
        <strong style="color:#ef4444; font-size:14px;">🛡️ ఆధునిక సెక్యూర్ ఫంక్షన్స్: strncpy & strncat ఎందుకు వాడాలి?</strong>
        <p style="font-size:13px; color:var(--text); margin:6px 0 0 0; line-height:1.6;">
          <code>strcpy()</code> మరియు <code>strcat()</code> డెస్టినేషన్ అర్రేలో తగినంత స్థలం ఉందో లేదో చూడకుండా డేటాను రాసేస్తాయి. ఇది భయంకరమైన <strong>Buffer Overflow</strong> దాడికి దారితీస్తుంది. అందుకే ప్రొడక్షన్ కోడ్‌లో గరిష్ట సైజ్ పరిమితిని స్వీకరించే <code>strncpy(dest, src, sizeof(dest) - 1)</code> మరియు <code>strncat()</code> మాత్రమే వాడాలి.
        </p>
      </div>
    </div>

    <!-- SECTION 4 -->
    <div class="section-title"><span class="num">4</span>బిగినర్స్ చేసే ఘోరమైన తప్పులు (Beginner Pitfalls)</div>
    <div class="section-body">
      <div style="display:flex; flex-direction:column; gap:12px; margin:16px 0;">
        <div style="background:rgba(239, 68, 68, 0.08); border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px 18px;">
          <div style="font-weight:700; color:#ef4444; font-size:14px;">❌ 1. స్ట్రింగ్స్‌ను == తో పోల్చడం:</div>
          <code style="font-size:13px; color:var(--text); display:block; margin:6px 0;">if (str1 == str2) { ... } // తప్పు! ఇది టెక్స్ట్‌ను కాకుండా మెమరీ అడ్రస్‌లను పోలుస్తుంది</code>
          <span style="font-size:13px; color:var(--text2); display:block;">రెండు వేర్వేరు అర్రేలలో ఒకే టెక్స్ట్ ఉన్నా వాటి అడ్రస్‌లు వేర్వేరు కాబట్టి <code>==</code> ఎల్లప్పుడూ FALSE అవుతుంది. ఎల్లప్పుడూ <code>strcmp(str1, str2) == 0</code> వాడాలి.</span>
        </div>

        <div style="background:rgba(239, 68, 68, 0.08); border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px 18px;">
          <div style="font-weight:700; color:#ef4444; font-size:14px;">❌ 2. నల్ క్యారెక్టర్‌కు స్థలం కేటాయించకపోవడం:</div>
          <code style="font-size:13px; color:var(--text); display:block; margin:6px 0;">char word[5] = "Hello"; // తప్పు! 5 అక్షరాలు + '\\\\0' కలిపి 6 బైట్లు కావాలి</code>
          <span style="font-size:13px; color:var(--text2); display:block;">ఈ విధంగా రాస్తే నల్ టెర్మినేటర్ మిస్ అయి స్ట్రింగ్ ఫంక్షన్లు మెమరీ లోపాల బారిన పడతాయి. కనీసం <code>char word[6]</code> అని ఇవ్వాలి.</span>
        </div>
      </div>
    </div>

    <!-- SECTION 5 -->
    <div class="section-title"><span class="num">5</span>తరచుగా అడిగే ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div style="display:flex; flex-direction:column; gap:12px; margin-top:16px;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px;">
          <h4 style="color:#10b981; margin:0 0 6px 0; font-size:14.5px;">Q: sizeof("Hello") మరియు strlen("Hello") ల మధ్య తేడా ఏమిటి?</h4>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.6;">
            <code>sizeof("Hello")</code> కంపైల్-టైమ్‌లో నల్ క్యారెక్టర్‌తో కలిపి మొత్తం మెమరీ బైట్లను లెక్కిస్తుంది (ఫలితం: <strong>6</strong>). కానీ <code>strlen("Hello")</code> రన్‌టైమ్‌లో నల్ క్యారెక్టర్ వచ్చేంత వరకు అక్షరాలను మాత్రమే లెక్కిస్తుంది (ఫలితం: <strong>5</strong>).
          </p>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px;">
          <h4 style="color:#10b981; margin:0 0 6px 0; font-size:14.5px;">Q: strcmp() ఎందుకు కేవలం true/false కాకుండా నెగటివ్ లేదా పాజిటివ్ సంఖ్యలను ఇస్తుంది?</h4>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.6;">
            <code>strcmp()</code> రెండు స్ట్రింగ్స్‌లోని మొదటి అసమాన అక్షరాల ASCII విలువల తేడాను (<code>str1[i] - str2[i]</code>) రిటర్న్ చేస్తుంది. నెగటివ్ విలువ వస్తే మొదటి స్ట్రింగ్ డిక్షనరీ ఆర్డర్‌లో ముందుందని, పాజిటివ్ వస్తే వెనుక ఉందని అర్థం. ఇది సార్టింగ్ చేయడానికి ఉపకరిస్తుంది.
          </p>
        </div>
      </div>
    </div>
  `,

  // -------------------------------------------------------------
  // CHAPTER 15: POINTERS BASICS & ADDRESS ARITHMETIC
  // -------------------------------------------------------------
  15: `
    <div class="intro-box">
      సిస్టమ్స్ ప్రోగ్రామింగ్‌లో C లాంగ్వేజ్‌ను తిరుగులేని రారాజుగా నిలబెట్టిన అత్యంత శక్తివంతమైన ఫీచర్ <strong>పాయింటర్లు (Pointers)</strong>. కంప్యూటర్ సైన్స్ విద్యార్థులను ఎక్కువగా భయపెట్టే కాన్సెప్ట్ కూడా ఇదే! అయితే వాస్తవానికి పాయింటర్ అంటే మరేమీ కాదు — అది కేవలం <strong>మరొక వేరియబుల్ యొక్క RAM మెమరీ అడ్రస్‌ను నిల్వ చేసే సాధారణ వేరియబుల్</strong> మాత్రమే. <code>&amp;</code> (Address) vs <code>*</code> (Value-at), పాయింటర్ అరిథ్‌మెటిక్, మరియు ప్రమాదకరమైన వైల్డ్ / డ్యాంగ్లింగ్ పాయింటర్లను ఈ అధ్యాయంలో అత్యంత సరళంగా నేర్చుకుందాం.
    </div>

    <!-- SECTION 1 -->
    <div class="section-title"><span class="num">1</span>పాయింటర్ అంటే ఏమిటి? మెమరీ అడ్రస్ & డి-రిఫరెన్సింగ్ (*, &)</div>
    <div class="section-body">
      <p>
        కంప్యూటర్ RAM లోని ప్రతి బైట్‌కు ఒక ప్రత్యేకమైన చిరునామా (Hexadecimal Address, e.g. <code>0x7ffd9a</code>) ఉంటుంది. ఒక సాధారణ వేరియబుల్ డేటాను నిల్వ చేస్తే, ఒక <strong>పాయింటర్ వేరియబుల్ ఆ డేటా ఉన్న మెమరీ అడ్రస్‌ను</strong> నిల్వ చేస్తుంది.
      </p>

      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:16px; margin:20px 0;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #10b981; border-radius:8px; padding:16px;">
          <h4 style="color:#10b981; margin:0 0 6px 0; font-size:14.5px;">&amp; (Address-of Operator):</h4>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.6;">
            ఒక వేరియబుల్ మెమరీలో ఎక్కడ ఉందో దాని RAM చిరునామాను అందిస్తుంది (ఉదా: <code>&amp;age</code>).
          </p>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #3b82f6; border-radius:8px; padding:16px;">
          <h4 style="color:#3b82f6; margin:0 0 6px 0; font-size:14.5px;">* (Dereferencing Operator):</h4>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.6;">
            ఒక పాయింటర్ పట్టుకున్న అడ్రస్ వద్దకు వెళ్లి, అక్కడ నిల్వ ఉన్న వాస్తవ విలువను చదవడానికి లేదా మార్చడానికి వాడతాం (ఉదా: <code>*ptr</code>).
          </p>
        </div>
      </div>

      <div class="code-block" style="margin:16px 0;">
        <div class="code-block-header">
          <span class="lang-tag">C — Pointer Declaration & Dereferencing</span>
          <a class="try-btn" href="/online-c-compiler.html">⚡ Try in C Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main(void) {
    int target = 42;
    // target యొక్క అడ్రస్‌ను నిల్వ చేసే పాయింటర్
    int *ptr = &target;

    printf("target విలువ          : %d\\n", target);
    printf("target మెమరీ అడ్రస్   : %p\\n", (void*)&target);
    printf("ptr నిల్వ చేసుకున్నది : %p\\n", (void*)ptr);
    printf("*ptr (డీరిఫరెన్సింగ్) : %d\\n", *ptr);

    // పాయింటర్ ద్వారా అసలు విలువను మార్చడం
    *ptr = 99;
    printf("నవీకరించబడిన target   : %d\\n", target);
    return 0;
}</code></pre>
      </div>
    </div>

    <!-- SECTION 2 -->
    <div class="section-title"><span class="num">2</span>పాయింటర్ సైజు & డేటా టైప్స్ యొక్క ఆవశ్యకత</div>
    <div class="section-body">
      <p>
        ఆధునిక 64-బిట్ ఆపరేటింగ్ సిస్టమ్స్‌లో ఏదైనా పాయింటర్ (అది <code>char*</code> అయినా, <code>int*</code> అయినా లేదా <code>double*</code> అయినా) ఖచ్చితంగా <strong>8 బైట్ల పరిమాణంలోనే</strong> ఉంటుంది. ఎందుకంటే 64-బిట్ ఆర్కిటెక్చర్‌లో ప్రతి మెమరీ అడ్రస్ 64 బిట్లు (8 బైట్లు) ఉంటుంది.
      </p>

      <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px; margin:16px 0;">
        <h4 style="color:#10b981; margin:0 0 8px 0; font-size:14.5px;">🤔 అన్ని పాయింటర్లు 8 బైట్లే అయితే DataType ఎందుకు చెప్పాలి?</h4>
        <ul style="margin:0; padding-left:20px; font-size:13.5px; color:var(--text); line-height:1.7;">
          <li><strong>డీరిఫరెన్సింగ్ బౌండరీ:</strong> <code>*ptr</code> అన్నప్పుడు మెమరీ నుండి కేవలం 1 బైట్ చదవాలా (<code>char</code>), 4 బైట్లు చదవాలా (<code>int</code>) లేదా 8 బైట్లు చదవాలా (<code>double</code>) అనేది డేటా టైప్ నిర్ణయిస్తుంది.</li>
          <li><strong>పాయింటర్ అరిథ్‌మెటిక్ స్కేల్:</strong> <code>ptr + 1</code> అన్నప్పుడు ఎన్ని బైట్లు ముందుకు జంప్ చేయాలో కంపైలర్‌కు డేటా టైప్ ద్వారానే తెలుస్తుంది.</li>
        </ul>
      </div>
    </div>

    <!-- SECTION 3 -->
    <div class="section-title"><span class="num">3</span>పాయింటర్ అరిథ్‌మెటిక్ (Pointer Arithmetic Scale Factor)</div>
    <div class="section-body">
      <p>
        పాయింటర్లకు ఒక సంఖ్యను కలిపినప్పుడు సాధారణ గణితం లాగా 1 బైట్ పెరగదు. అది ఆ డేటా టైప్ పరిమాణానికి గుణించబడి ముందుకు వెళ్తుంది:
      </p>
      <code style="font-size:13.5px; color:#10b981; display:block; background:var(--bg3); padding:8px 12px; border-radius:4px; margin:8px 0; font-weight:700;">
        ptr + n = ptr_address + (n × sizeof(*ptr))
      </code>

      <div class="code-block" style="margin:16px 0;">
        <div class="code-block-header">
          <span class="lang-tag">C — Pointer Arithmetic Scale Demo</span>
          <a class="try-btn" href="/online-c-compiler.html">⚡ Try in C Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main(void) {
    int arr[3] = {10, 20, 30};
    int *p = arr; // arr[0] అడ్రస్

    printf("p   యొక్క అడ్రస్: %p (విలువ: %d)\\n", (void*)p, *p);
    p++; // 4 బైట్లు ముందుకు దూకుతుంది!
    printf("p++ యొక్క అడ్రస్: %p (విలువ: %d)\\n", (void*)p, *p);
    return 0;
}</code></pre>
      </div>
    </div>

    <!-- SECTION 4 -->
    <div class="section-title"><span class="num">4</span>ప్రమాదకరమైన పాయింటర్లు: NULL, Wild & Dangling Pointers</div>
    <div class="section-body">
      <div style="display:flex; flex-direction:column; gap:12px; margin:16px 0;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #10b981; border-radius:8px; padding:14px 18px;">
          <strong style="color:#10b981; font-size:14px;">1. NULL Pointer (రక్షణ కవచం):</strong>
          <p style="font-size:13px; color:var(--text2); margin:4px 0 0 0; line-height:1.6;">
            ప్రస్తుతం ఏ మెమరీనీ పాయింట్ చేయని సురక్షిత సూచిక (<code>int *p = NULL;</code>). ఏదైనా పాయింటర్‌ను వాడే ముందు అది NULL కాదని <code>if (p != NULL)</code> అని చెక్ చేసుకోవడం ఉత్తమ భద్రతా పద్ధతి.
          </p>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #ef4444; border-radius:8px; padding:14px 18px;">
          <strong style="color:#ef4444; font-size:14px;">2. Wild Pointer (ఇనీషియలైజ్ చేయని రాక్షసుడు):</strong>
          <p style="font-size:13px; color:var(--text2); margin:4px 0 0 0; line-height:1.6;">
            కేవలం <code>int *p;</code> అని డిక్లేర్ చేసి దేనికీ అసైన్ చేయకపోతే, అందులో గార్బేజ్ అడ్రస్ ఉంటుంది. దీనిలోకి డేటా రాస్తే క్రాష్ ఖాయం.
          </p>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #f59e0b; border-radius:8px; padding:14px 18px;">
          <strong style="color:#f59e0b; font-size:14px;">3. Dangling Pointer (గాలిలో వేలాడే పాయింటర్):</strong>
          <p style="font-size:13px; color:var(--text2); margin:4px 0 0 0; line-height:1.6;">
            ఒక మెమరీని విడుదల చేసిన తర్వాత (లేదా ఫంక్షన్ లోకల్ వేరియబుల్ నాశనమైన తర్వాత) కూడా పాత చిరునామాను అలాగే గుర్తుంచుకునే పాయింటర్. విడుదల చేసిన వెంటనే <code>p = NULL;</code> చేయాలి.
          </p>
        </div>
      </div>
    </div>

    <!-- SECTION 5 -->
    <div class="section-title"><span class="num">5</span>బిగినర్స్ చేసే ఘోరమైన తప్పులు (Beginner Pitfalls)</div>
    <div class="section-body">
      <div style="display:flex; flex-direction:column; gap:12px; margin:16px 0;">
        <div style="background:rgba(239, 68, 68, 0.08); border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px 18px;">
          <div style="font-weight:700; color:#ef4444; font-size:14px;">❌ 1. అన్-ఇనీషియలైజ్డ్ పాయింటర్‌ను డీరిఫరెన్స్ చేయడం:</div>
          <code style="font-size:13px; color:var(--text); display:block; margin:6px 0;">int *ptr; *ptr = 100; // ఘోరమైన సెగ్మెంటేషన్ ఫాల్ట్!</code>
          <span style="font-size:13px; color:var(--text2); display:block;">పాయింటర్ ఏ వాలిడ్ మెమరీ అడ్రస్‌నూ పాయింట్ చేయకుండా నేరుగా <code>*ptr = 100</code> రాయడం వల్ల అపరిచిత మెమరీని టచ్ చేసి సిస్టమ్ వెంటనే క్రాష్ అవుతుంది.</span>
        </div>

        <div style="background:rgba(239, 68, 68, 0.08); border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px 18px;">
          <div style="font-weight:700; color:#ef4444; font-size:14px;">❌ 2. డిక్లరేషన్‌లో బహుళ పాయింటర్లు రాసేటప్పుడు * మిస్ అవ్వడం:</div>
          <code style="font-size:13px; color:var(--text); display:block; margin:6px 0;">int* a, b; // ఇక్కడ 'a' మాత్రమే పాయింటర్; 'b' సాధారణ int అవుతుంది!</code>
          <span style="font-size:13px; color:var(--text2); display:block;">రెండూ పాయింటర్లు కావాలంటే <code>int *a, *b;</code> అని రెండింటికీ విడివిడిగా ఆస్టెరిస్క్ పెట్టాలి.</span>
        </div>
      </div>
    </div>

    <!-- SECTION 6 -->
    <div class="section-title"><span class="num">6</span>తరచుగా అడిగే ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div style="display:flex; flex-direction:column; gap:12px; margin-top:16px;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px;">
          <h4 style="color:#10b981; margin:0 0 6px 0; font-size:14.5px;">Q: void* (Generic Pointer) అంటే ఏమిటి? దాన్ని ఎప్పుడు వాడతారు?</h4>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.6;">
            <code>void*</code> అనేది ఏ డేటా టైప్ యొక్క మెమరీ అడ్రస్‌నైనా నిల్వ చేయగల సార్వత్రిక పాయింటర్. డైనమిక్ మెమరీ ఫంక్షన్లైన <code>malloc()</code> మరియు <code>calloc()</code> ఫలితంగా <code>void*</code> నే రిటర్న్ చేస్తాయి. దీనిని డీరిఫరెన్స్ చేయడానికి ముందు సంబంధిత డేటా టైప్‌కు టైప్ కాస్ట్ చేయాలి.
          </p>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px;">
          <h4 style="color:#10b981; margin:0 0 6px 0; font-size:14.5px;">Q: రెండు పాయింటర్లను కూడడం (ptr1 + ptr2) ఎందుకు అనుమతించబడదు?</h4>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.6;">
            రెండు మెమరీ అడ్రస్‌లను కలపడం అనేది భౌతికంగా అర్థం లేని ప్రక్రియ (రెండు ఇంటి అడ్రస్‌లను కలిపితే సరిహద్దులు దాటి ఎక్కడికో వెళ్ళిపోతుంది). అయితే రెండు పాయింటర్లను తీసివేస్తే (<code>ptr2 - ptr1</code>) వాటి మధ్య ఎన్ని ఎలిమెంట్లు ఉన్నాయో తెలుస్తుంది కాబట్టి తీసివేత అనుమతించబడుతుంది.
          </p>
        </div>
      </div>
    </div>
  `,

  // -------------------------------------------------------------
  // CHAPTER 16: POINTERS WITH ARRAYS & DOUBLE POINTERS
  // -------------------------------------------------------------
  16: `
    <div class="intro-box">
      C లాంగ్వేజ్ అంతర్గత ఆర్కిటెక్చర్‌లో అర్రేలు మరియు పాయింటర్లు ఒకే నాణేనికి ఉన్న రెండు ముఖాలు లాంటివి. ఒక ఎక్స్‌ప్రెషన్‌లో అర్రే పేరు రాసినప్పుడు అది పాయింటర్‌గా ఎలా రూపాంతరం చెందుతుంది (<strong>Array Decay</strong>), <code>arr[i]</code> వెనుక ఉన్న అసలు పాయింటర్ సింటాక్స్, మెమరీ పాయింటర్‌ను పాయింట్ చేసే <strong>డబుల్ పాయింటర్లు (**ptr)</strong>, మరియు హైయర్ ఆర్డర్ ప్రోగ్రామింగ్‌కు మూలమైన <strong>ఫంక్షన్ పాయింటర్లు (Callbacks)</strong> ను ఈ అధ్యాయంలో లోతుగా శోధిద్దాం.
    </div>

    <!-- SECTION 1 -->
    <div class="section-title"><span class="num">1</span>అర్రే డికే (Array Decay) రహస్యం & arr[i] == *(arr + i)</div>
    <div class="section-body">
      <p>
        C లో ఒక అర్రే పేరును ఎక్స్‌ప్రెషన్‌లో వాడినప్పుడు, అది స్వయంచాలకంగా తన మొదటి ఎలిమెంట్ యొక్క మెమరీ అడ్రస్ పాయింటర్‌గా దిగజారుతుంది (Decays to a pointer to its first element).
      </p>

      <div style="background:var(--bg2); border-left:4px solid #10b981; border-radius:0 8px 8px 0; padding:16px; margin:16px 0;">
        <strong style="color:#10b981; font-size:14.5px;">🔑 అర్రే ఇండెక్సింగ్ అనేది కేవలం షుగర్ సింటాక్స్ (Syntactic Sugar):</strong>
        <p style="font-size:13.5px; color:var(--text); margin:6px 0 0 0; line-height:1.6;">
          కంపైలర్ దృష్టిలో <code>arr[i]</code> అనే ప్రత్యేకమైన ఆపరేషన్ లేదు! మీరు <code>arr[i]</code> అని రాసిన ప్రతిసారీ కంపైలర్ అంతర్గతంగా దానిని <strong><code>*(arr + i)</code></strong> గా మారుస్తుంది.
        </p>
        <p style="font-size:13px; color:var(--text2); margin:8px 0 0 0; line-height:1.5;">
          💡 <strong>ఇంటర్వ్యూ ఫన్ ఫ్యాక్ట్:</strong> కూడికలో స్థానాలు మారినా విలువ మారదు కాబట్టి, <code>*(arr + i)</code> అనేది <code>*(i + arr)</code> కి సమానం. దీని అర్థం C లో <strong><code>i[arr]</code></strong> అని రాసినా ప్రోగ్రామ్ ఖచ్చితంగా సరైన ఫలితాన్నే ఇస్తుంది!
        </p>
      </div>

      <div class="code-block" style="margin:16px 0;">
        <div class="code-block-header">
          <span class="lang-tag">C — Array Pointer Equivalence & i[arr]</span>
          <a class="try-btn" href="/online-c-compiler.html">⚡ Try in C Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main(void) {
    int nums[4] = {10, 20, 30, 40};

    printf("nums[2]     = %d\\n", nums[2]);
    printf("*(nums + 2) = %d\\n", *(nums + 2));
    printf("2[nums]     = %d (వాలిడ్ సింటాక్స్!)\\n", 2[nums]);
    return 0;
}</code></pre>
      </div>
    </div>

    <!-- SECTION 2 -->
    <div class="section-title"><span class="num">2</span>అర్రేలను ఫంక్షన్లకు పంపినప్పుడు పాయింటర్ డికే</div>
    <div class="section-body">
      <p>
        ఒక ఫంక్షన్ హెడర్‌లో <code>void print(int arr[])</code> అని రాసినప్పటికీ, కంపైలర్ దానిని అంతర్గతంగా <strong><code>void print(int *arr)</code></strong> గానే మారుస్తుంది. అర్రే కాపీ చేయబడదు; కేవలం మొదటి ఎలిమెంట్ అడ్రస్ మాత్రమే వెళ్తుంది.
      </p>

      <div style="background:rgba(239, 68, 68, 0.08); border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px 18px; margin:16px 0;">
        <strong style="color:#ef4444; font-size:14px;">⚠️ ఫంక్షన్ లోపల sizeof(arr) ట్రాప్:</strong>
        <p style="font-size:13px; color:var(--text); margin:6px 0 0 0; line-height:1.6;">
          <code>main()</code> లో <code>sizeof(arr)</code> అర్రే మొత్తం బైట్లను ఇస్తుంది. కానీ ఫంక్షన్ లోపల <code>sizeof(arr)</code> వాడితే అది కేవలం పాయింటర్ సైజు (8 బైట్లు) మాత్రమే ఇస్తుంది! అందుకే <strong>C లో అర్రేను ఫంక్షన్‌కు పంపినప్పుడు దాని సైజ్‌ను ప్రత్యేక పారామీటర్‌గా పంపడం తప్పనిసరి</strong>.
        </p>
      </div>
    </div>

    <!-- SECTION 3 -->
    <div class="section-title"><span class="num">3</span>డబుల్ పాయింటర్లు (Double Pointers **ptr)</div>
    <div class="section-body">
      <p>
        ఒక పాయింటర్ కూడా మెమరీలో ఒక వేరియబుల్ కాబట్టి దానికి కూడా ఒక RAM అడ్రస్ ఉంటుంది. <strong>ఒక పాయింటర్ యొక్క మెమరీ అడ్రస్‌ను నిల్వ చేసే పాయింటర్‌ను డబుల్ పాయింటర్ (Pointer to Pointer)</strong> అంటారు.
      </p>

      <div class="code-block" style="margin:16px 0;">
        <div class="code-block-header">
          <span class="lang-tag">C — Double Pointer Architecture</span>
          <a class="try-btn" href="/online-c-compiler.html">⚡ Try in C Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main(void) {
    int val = 500;
    int *ptr = &val;     // సింగిల్ పాయింటర్: val అడ్రస్
    int **dptr = &ptr;   // డబుల్ పాయింటర్: ptr అడ్రస్

    printf("val విలువ          : %d\\n", val);
    printf("*ptr (సింగిల్)     : %d\\n", *ptr);
    printf("**dptr (డబుల్)      : %d\\n", **dptr);

    // డబుల్ పాయింటర్ ద్వారా మార్చడం
    **dptr = 999;
    printf("నవీకరించబడిన val    : %d\\n", val);
    return 0;
}</code></pre>
      </div>
      <p style="font-size:13px; color:var(--text2); margin:8px 0 0 0;">
        💡 డబుల్ పాయింటర్లను డైనమిక్ 2D అర్రేస్ (Dynamic 2D Arrays) సృష్టించడానికి మరియు ఫంక్షన్ ద్వారా వేరొక పాయింటర్ అడ్రస్‌ను మార్చడానికి (Modifying a pointer in a function) వాడతారు.
      </p>
    </div>

    <!-- SECTION 4 -->
    <div class="section-title"><span class="num">4</span>ఫంక్షన్ పాయింటర్లు (Function Pointers & Callbacks)</div>
    <div class="section-body">
      <p>
        వేరియబుల్స్ లాగే ఫంక్షన్లు కూడా RAM లోని కోడ్ సెగ్మెంట్ (Text Segment) లో నిల్వ ఉంటాయి. ఒక ఫంక్షన్ యొక్క ఎగ్జిక్యూటబుల్ మెమరీ అడ్రస్‌ను స్టోర్ చేసే పాయింటర్‌ను <strong>ఫంక్షన్ పాయింటర్</strong> అంటారు. దీని ద్వారా రన్‌టైమ్‌లో ఏ ఫంక్షన్ పిలవాలో డైనమిక్‌గా నిర్ణయించవచ్చు (Callbacks).
      </p>

      <div class="code-block" style="margin:16px 0;">
        <div class="code-block-header">
          <span class="lang-tag">C — Function Pointer Callback Demo</span>
          <a class="try-btn" href="/online-c-compiler.html">⚡ Try in C Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int add(int a, int b) { return a + b; }
int multiply(int a, int b) { return a * b; }

// ఫంక్షన్ పాయింటర్‌ను ఆర్గ్యుమెంట్‌గా స్వీకరించే ఫంక్షన్
void computeAndPrint(int x, int y, int (*operation)(int, int)) {
    int res = operation(x, y); // కాల్‌బ్యాక్ ఎగ్జిక్యూషన్
    printf("ఆపరేషన్ ఫలితం: %d\\n", res);
}

int main(void) {
    computeAndPrint(10, 5, add);      // ఫలితం: 15
    computeAndPrint(10, 5, multiply); // ఫలితం: 50
    return 0;
}</code></pre>
      </div>
    </div>

    <!-- SECTION 5 -->
    <div class="section-title"><span class="num">5</span>బిగినర్స్ చేసే ఘోరమైన తప్పులు (Beginner Pitfalls)</div>
    <div class="section-body">
      <div style="display:flex; flex-direction:column; gap:12px; margin:16px 0;">
        <div style="background:rgba(239, 68, 68, 0.08); border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px 18px;">
          <div style="font-weight:700; color:#ef4444; font-size:14px;">❌ 1. int *arr[] మరియు int (*arr)[] ల మధ్య కన్‌ఫ్యూజన్:</div>
          <span style="font-size:13px; color:var(--text2); display:block; margin-top:4px;"><code>int *arr[5];</code> అంటే 5 పాయింటర్ల అర్రే (Array of Pointers). కానీ <code>int (*arr)[5];</code> అంటే 5 పూర్ణాంకాలు గల ఒక అర్రేని పాయింట్ చేసే ఏకైక పాయింటర్. బ్రాకెట్ ప్రాధాన్యత మొత్తం అర్థాన్నే మారుస్తుంది.</span>
        </div>

        <div style="background:rgba(239, 68, 68, 0.08); border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px 18px;">
          <div style="font-weight:700; color:#ef4444; font-size:14px;">❌ 2. డబుల్ పాయింటర్‌ను సింగిల్ ఆస్టెరిస్క్ తో విలువ అనుకోవడం:</div>
          <span style="font-size:13px; color:var(--text2); display:block; margin-top:4px;"><code>dptr</code> వద్ద <code>*dptr</code> అంటే కేవలం మధ్యలోని పాయింటర్ అడ్రస్ మాత్రమే వస్తుంది. అసలు విలువ కావాలంటే ఖచ్చితంగా రెండుసార్లు డీరిఫరెన్స్ (<code>**dptr</code>) చేయాలి.</span>
        </div>
      </div>
    </div>

    <!-- SECTION 6 -->
    <div class="section-title"><span class="num">6</span>తరచుగా అడిగే ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div style="display:flex; flex-direction:column; gap:12px; margin-top:16px;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px;">
          <h4 style="color:#10b981; margin:0 0 6px 0; font-size:14.5px;">Q: C స్టాండర్డ్ లైబ్రరీ qsort() ఫంక్షన్ పాయింటర్లను ఎలా వాడుతుంది?</h4>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.6;">
            <code>qsort()</code> అనేది జెనరిక్ క్విక్ సార్ట్ ఫంక్షన్. ఏ రెండు ఎలిమెంట్లను పోల్చాలో దానికి తెలియదు కాబట్టి, డెవలపర్ రాసిన కంపారేటర్ ఫంక్షన్ అడ్రస్‌ను (Function Pointer <code>int (*compar)(const void*, const void*)</code>) ఆర్గ్యుమెంట్‌గా తీసుకుని సార్టింగ్ పూర్తి చేస్తుంది.
          </p>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px;">
          <h4 style="color:#10b981; margin:0 0 6px 0; font-size:14.5px;">Q: main ఫంక్షన్‌లో char *argv[] మరియు char **argv రెండూ ఒకటేనా?</h4>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.6;">
            అవును! ఫంక్షన్ పారామీటర్లలో అర్రే డికే నియమం ప్రకారం <code>char *argv[]</code> అనేది స్వయంచాలకంగా <code>char **argv</code> (Pointer to char pointer) గా మారుతుంది. రెండూ కమాండ్ లైన్ ఆర్గ్యుమెంట్లను రీడ్ చేయడానికి పూర్తిగా సమానమైనవి.
          </p>
        </div>
      </div>
    </div>
  `
};

// Execute writing out upgraded files for Phase 4 (Lessons 13 to 16)
for (let i = 13; i <= 16; ++i) {
  const lesson = LESSONS.find(l => l.num === i);
  if (!lesson) continue;
  lesson.contentHtml = PHASE4_CONTENTS[i];
  const html = generatePageHtml(lesson);
  fs.writeFileSync(path.join(cDir, lesson.file), html, 'utf8');
  console.log(`✅ Fully enriched Phase 4 Lesson ${i} : ${lesson.file} (${html.length} chars)`);
}
