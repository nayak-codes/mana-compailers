const fs = require('fs');
const path = require('path');
const { LESSONS } = require('./c_curriculum_data.js');
const { generatePageHtml } = require('./c_page_template.js');

const cDir = path.join(__dirname, '../public/blog-c');

// ==========================================
// COMPREHENSIVE EDITORIAL MASTERCLASS CONTENT: PHASE 3 (CH 09 - 12)
// ==========================================

const PHASE3_CONTENTS = {
  // -------------------------------------------------------------
  // CHAPTER 9: FUNCTIONS, PROTOTYPES & CALL STACK
  // -------------------------------------------------------------
  9: `
    <div class="intro-box">
      సాఫ్ట్‌వేర్ డెవలప్‌మెంట్‌లో వందల వేల లైన్ల కోడ్‌ను ఒకే <code>main()</code> ఫంక్షన్‌లో రాయడం అసాధ్యం మరియు నిర్వహణకు అత్యంత కష్టం. కోడ్‌ను చిన్న చిన్న మాడ్యూల్స్‌గా విడగొట్టడానికి, పునరావృతాన్ని తగ్గించడానికి (DRY Principle - Don't Repeat Yourself) <strong>ఫంక్షన్స్ (Functions)</strong> మూలస్తంభాలు. ఈ అధ్యాయంలో ఫంక్షన్ అనాటమీ, ఫార్వర్డ్ డిక్లరేషన్ (Prototypes) ఎందుకు తప్పనిసరి, మరియు RAM లోని <strong>కాల్ స్టాక్ (Call Stack)</strong> లో యాక్టివేషన్ రికార్డ్స్ ఎలా సృష్టించబడతాయో పరిశీలిద్దాం.
    </div>

    <!-- SECTION 1 -->
    <div class="section-title"><span class="num">1</span>C ఫంక్షన్ అనాటమీ — డిక్లరేషన్, డెఫినిషన్ & కాల్</div>
    <div class="section-body">
      <p>
        ఒక నిర్దిష్టమైన పనిని చేయడానికి రూపొందించిన స్వతంత్ర కోడ్ బ్లాక్‌ను ఫంక్షన్ అంటారు. C లో ఫంక్షన్ మూడు ముఖ్యమైన భాగాలను కలిగి ఉంటుంది:
      </p>

      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:16px; margin:20px 0;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #10b981; border-radius:8px; padding:16px;">
          <h4 style="color:#10b981; margin:0 0 6px 0; font-size:14.5px;">1. రిటర్న్ టైప్ (Return Type):</h4>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.6;">
            ఫంక్షన్ తన పని పూర్తి చేసుకున్న తర్వాత కాలర్ (Caller) కు తిరిగి ఇచ్చే డేటా రకం (ఉదా: <code>int</code>, <code>double</code>). ఒకవేళ ఏ విలువా రిటర్న్ చేయకపోతే <strong>void</strong> అని పేర్కొనాలి.
          </p>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #3b82f6; border-radius:8px; padding:16px;">
          <h4 style="color:#3b82f6; margin:0 0 6px 0; font-size:14.5px;">2. పారామీటర్లు (Parameters):</h4>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.6;">
            ఫంక్షన్ పని చేయడానికి అవసరమైన ఇన్‌పుట్ డేటాను స్వీకరించే వేరియబుల్స్ (Formal Arguments). ఉదా: <code>(int a, int b)</code>.
          </p>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #8b5cf6; border-radius:8px; padding:16px;">
          <h4 style="color:#8b5cf6; margin:0 0 6px 0; font-size:14.5px;">3. ఫంక్షన్ బాడీ (Function Body):</h4>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.6;">
            కర్లీ బ్రేసెస్ <code>{ ... }</code> లోపల ఉండే వాస్తవ ఎగ్జిక్యూటబుల్ స్టేట్‌మెంట్లు మరియు ఫలితాన్ని పంపే <code>return</code> స్టేట్‌మెంట్.
          </p>
        </div>
      </div>

      <div class="code-block" style="margin:16px 0;">
        <div class="code-block-header">
          <span class="lang-tag">C — Simple Function Definition & Call</span>
          <a class="try-btn" href="/online-c-compiler.html">⚡ Try in C Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

// ఫంక్షన్ డెఫినిషన్: రెండు సంఖ్యల మొత్తం లెక్కించడం
int calculateSum(int a, int b) {
    return a + b;
}

int main(void) {
    int x = 25, y = 75;
    // ఫంక్షన్ కాల్: ఫలితాన్ని స్వీకరించడం
    int result = calculateSum(x, y);

    printf("మొత్తం (Sum): %d\\n", result);
    return 0;
}</code></pre>
      </div>
    </div>

    <!-- SECTION 2 -->
    <div class="section-title"><span class="num">2</span>ఫంక్షన్ ప్రోటోటైప్స్ (Function Prototypes) ఎందుకు తప్పనిసరి?</div>
    <div class="section-body">
      <p>
        C కంపైలర్ మీ సోర్స్ కోడ్‌ను పై నుండి క్రిందికి ఒకే పాస్ (Single-pass compilation) లో చదువుతుంది. ఒకవేళ మీరు <code>main()</code> ఫంక్షన్ తర్వాత మీ కస్టమ్ ఫంక్షన్‌ను రాస్తే, కంపైలర్ <code>main()</code> లో ఆ ఫంక్షన్ పిలుపును చూడగానే "ఈ ఫంక్షన్ ఏమిటో నాకు తెలియదు" అని భావిస్తుంది.
      </p>

      <div style="background:rgba(239, 68, 68, 0.08); border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px 18px; margin:16px 0;">
        <strong style="color:#ef4444; font-size:14px;">⚠️ Implicit Declaration Warning / Error:</strong>
        <p style="font-size:13px; color:var(--text); margin:6px 0 0 0; line-height:1.6;">
          పాత C ప్రమాణాలలో కంపైలర్ అన్-డిక్లేర్డ్ ఫంక్షన్‌ను డీఫాల్ట్‌గా <code>int</code> రిటర్న్ చేస్తుందని భావించేది. కానీ ఆధునిక <strong>C99 / C11 / C23</strong> లలో ఇది కంపైలర్ వార్నింగ్ లేదా ఎర్రర్ ఇస్తుంది.
        </p>
      </div>

      <div style="background:var(--bg2); border:1px solid #10b981; border-radius:8px; padding:16px; margin:16px 0;">
        <h4 style="color:#10b981; margin:0 0 8px 0; font-size:14.5px;">✅ ది సొల్యూషన్: Function Prototype (Forward Declaration)</h4>
        <code style="font-size:13px; color:var(--text); display:block; background:var(--bg3); padding:8px 12px; border-radius:4px; margin-bottom:8px;">
          double calculateTax(double amount, double rate); // ప్రోటోటైప్ చివర సెమికోలన్ తప్పనిసరి!
        </code>
        <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.6;">
          <code>main()</code> కు ముందే ఈ ప్రోటోటైప్ రాయడం వల్ల కంపైలర్‌కు "ఈ పేరుతో ఒక ఫంక్షన్ క్రింద ఉంది, అది ఏ పారామీటర్లు తీసుకుంటుందో, ఏ డేటా టైప్ రిటర్న్ చేస్తుందో చూసుకో" అని ముందస్తు సమాచారం అందుతుంది.
        </p>
      </div>
    </div>

    <!-- SECTION 3 -->
    <div class="section-title"><span class="num">3</span>RAM కాల్ స్టాక్ & యాక్టివేషన్ రికార్డ్స్ (Call Stack Architecture)</div>
    <div class="section-body">
      <p>
        ప్రోగ్రామ్ రన్ అవుతున్నప్పుడు మెమరీ (RAM) లోని <strong>కాల్ స్టాక్ (Call Stack)</strong> విభాగం ఫంక్షన్ల ఎగ్జిక్యూషన్‌ను ట్రాక్ చేస్తుంది. ప్రతి ఫంక్షన్ కాల్ జరిగినప్పుడు స్టాక్ పై ఒక <strong>Stack Frame (లేదా Activation Record)</strong> పుష్ అవుతుంది.
      </p>

      <div style="display:flex; flex-direction:column; gap:12px; margin:16px 0;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px 18px;">
          <strong style="color:var(--text); font-size:14px;">📦 ఒక స్టాక్ ఫ్రేమ్ లోపల ఏముంటుంది?</strong>
          <ul style="margin:6px 0 0 0; padding-left:20px; font-size:13px; color:var(--text2); line-height:1.7;">
            <li><strong>Return Address:</strong> ఫంక్షన్ పని ముగిశాక CPU తిరిగి కాలర్‌లో ఏ లైన్‌కు వెళ్లాలో తెలిపే ఇన్స్ట్రక్షన్ పాయింటర్.</li>
            <li><strong>Function Arguments:</strong> ఫంక్షన్‌కు పాస్ చేసిన ఇన్‌పుట్ పారామీటర్లు.</li>
            <li><strong>Local Variables:</strong> ఆ ఫంక్షన్ లోపల డిక్లేర్ చేసిన లోకల్ వేరియబుల్స్.</li>
          </ul>
        </div>
      </div>
      <p style="font-size:13px; color:var(--text2); margin:8px 0 0 0;">
        💡 స్టాక్ <strong>LIFO (Last-In, First-Out)</strong> సూత్రంపై పనిచేస్తుంది. ఫంక్షన్ పూర్తయి <code>return</code> అవ్వగానే దాని స్టాక్ ఫ్రేమ్ మెమరీ నుండి పాప్ (Pop) అయి పూర్తిగా క్లియర్ అవుతుంది.
      </p>
    </div>

    <!-- SECTION 4 -->
    <div class="section-title"><span class="num">4</span>బిగినర్స్ చేసే ఘోరమైన తప్పులు (Beginner Pitfalls)</div>
    <div class="section-body">
      <div style="display:flex; flex-direction:column; gap:12px; margin:16px 0;">
        <div style="background:rgba(239, 68, 68, 0.08); border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px 18px;">
          <div style="font-weight:700; color:#ef4444; font-size:14px;">❌ 1. ఫంక్షన్ ప్రోటోటైప్ మిస్ అవ్వడం:</div>
          <span style="font-size:13px; color:var(--text2); display:block; margin-top:4px;"><code>main()</code> తర్వాత ఫంక్షన్ రాసి పైభాగంలో ప్రోటోటైప్ ఇవ్వకపోతే కంపైలర్ టైప్ మిస్‌మ్యాచ్ వార్నింగ్‌లు ఇస్తుంది.</span>
        </div>

        <div style="background:rgba(239, 68, 68, 0.08); border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px 18px;">
          <div style="font-weight:700; color:#ef4444; font-size:14px;">❌ 2. లోకల్ వేరియబుల్ అడ్రస్‌ను రిటర్న్ చేయడం (Dangling Pointer Trap):</div>
          <code style="font-size:13px; color:var(--text); display:block; margin:6px 0;">int* getNumber() { int x = 10; return &amp;x; } // ప్రమాదకరమైన బగ్!</code>
          <span style="font-size:13px; color:var(--text2); display:block;">ఫంక్షన్ ముగియగానే <code>x</code> ఉన్న స్టాక్ ఫ్రేమ్ ధ్వంసమైపోతుంది. దాని అడ్రస్‌ను రిటర్న్ చేస్తే గార్బేజ్ డేటా లేదా సెగ్మెంటేషన్ ఫాల్ట్ వస్తుంది.</span>
        </div>
      </div>
    </div>

    <!-- SECTION 5 -->
    <div class="section-title"><span class="num">5</span>తరచుగా అడిగే ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div style="display:flex; flex-direction:column; gap:12px; margin-top:16px;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px;">
          <h4 style="color:#10b981; margin:0 0 6px 0; font-size:14.5px;">Q: C లాంగ్వేజ్‌లో ఫంక్షన్ ఓవర్‌లోడింగ్ (Function Overloading) సాధ్యమేనా?</h4>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.6;">
            సాధ్యం కాదు! C++ లో ఒకే పేరుతో వేర్వేరు పారామీటర్లతో బహుళ ఫంక్షన్లు రాయవచ్చు కానీ C లాంగ్వేజ్‌లో ప్రతి ఫంక్షన్‌కు ఖచ్చితమైన ప్రత్యేకమైన పేరు ఉండాలి. C కంపైలర్ నేమ్ మాంగ్లింగ్ (Name Mangling) చేయదు.
          </p>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px;">
          <h4 style="color:#10b981; margin:0 0 6px 0; font-size:14.5px;">Q: Call Stack గరిష్ట పరిమాణం (Stack Limit) ఎంత ఉంటుంది?</h4>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.6;">
            ఇది ఆపరేటింగ్ సిస్టమ్ మరియు కంపైలర్ కాన్ఫిగరేషన్‌పై ఆధారపడి ఉంటుంది. సాధారణంగా లైనక్స్/మాక్‌లలో డీఫాల్ట్‌గా 8MB, మరియు విండోస్‌లో 1MB స్టాక్ మెమరీ కేటాయించబడుతుంది.
          </p>
        </div>
      </div>
    </div>
  `,

  // -------------------------------------------------------------
  // CHAPTER 10: CALL BY VALUE VS CALL BY REFERENCE
  // -------------------------------------------------------------
  10: `
    <div class="intro-box">
      C లాంగ్వేజ్‌లో ఫంక్షన్లకు డేటాను పంపేటప్పుడు జరిగే అంతర్గత మెమరీ మార్పిడిని అర్థం చేసుకోవడం అత్యంత కీలకమైన అంశం. ఒక వేరియబుల్‌ను ఫంక్షన్‌కు పాస్ చేసినప్పుడు అది కేవలం ఒక కాపీగా వెళ్తుందా లేక అసలు వేరియబుల్ మెమరీనే మారుస్తుందా? ఇంటర్వ్యూలలో అత్యంత ప్రాచుర్యం పొందిన <strong>Call by Value</strong> vs <strong>Call by Reference</strong> (పాయింటర్ల ద్వారా) మరియు స్వాపింగ్ మెకానిక్స్‌ను ఈ అధ్యాయంలో సమగ్రంగా పరిశీలిద్దాం.
    </div>

    <!-- SECTION 1 -->
    <div class="section-title"><span class="num">1</span>Call by Value — సేఫ్ బట్ ఐసోలేటెడ్ మెమరీ క్లోన్</div>
    <div class="section-body">
      <p>
        డీఫాల్ట్‌గా C లాంగ్వేజ్ అన్ని ఫంక్షన్ కాల్స్‌లో <strong>Call by Value</strong> పద్ధతినే అనుసరిస్తుంది. అంటే కాలర్ (Caller) నుండి పాస్ చేయబడిన వేరియబుల్ యొక్క విలువను మాత్రమే కాపీ చేసి, కాల్ చేయబడిన ఫంక్షన్ యొక్క ప్రత్యేక స్టాక్ ఫ్రేమ్‌లో నిల్వ చేస్తుంది.
      </p>

      <div class="code-block" style="margin:16px 0;">
        <div class="code-block-header">
          <span class="lang-tag">C — Call by Value (No modification in caller)</span>
          <a class="try-btn" href="/online-c-compiler.html">⚡ Try in C Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

void modifyValue(int num) {
    num = 1000; // ఇది కేవలం లోకల్ కాపీని మాత్రమే మారుస్తుంది
}

int main(void) {
    int x = 50;
    modifyValue(x);
    printf("x విలువ మారలేదు: %d\\n", x); // x ఇప్పటికీ 50 మాత్రమే!
    return 0;
}</code></pre>
      </div>
      <p style="font-size:13px; color:var(--text2); margin:8px 0 0 0;">
        💡 <code>modifyValue()</code> ఫంక్షన్ లోపల <code>num</code> ను ఎంత మార్చినా, <code>main()</code> లోని అసలు వేరియబుల్ <code>x</code> సురక్షితంగా ఉంటుంది.
      </p>
    </div>

    <!-- SECTION 2 -->
    <div class="section-title"><span class="num">2</span>Call by Reference (పాయింటర్స్ ద్వారా) — డైరెక్ట్ మెమరీ యాక్సెస్</div>
    <div class="section-body">
      <p>
        ఒక ఫంక్షన్ కాలర్‌లోని అసలు వేరియబుల్‌ను నేరుగా మార్చాలనుకుంటే (లేదా రెండు వేరియబుల్స్ విలువలను తారుమారు చేయాలనుకుంటే), మనం విలువను కాకుండా ఆ వేరియబుల్ యొక్క <strong>RAM అడ్రస్ (&amp;)</strong> ను పాయింటర్ పారామీటర్‌గా పంపాలి.
      </p>

      <div class="code-block" style="margin:16px 0;">
        <div class="code-block-header">
          <span class="lang-tag">C — Swap using Pointers (Call by Reference)</span>
          <a class="try-btn" href="/online-c-compiler.html">⚡ Try in C Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

// పాయింటర్లు స్వీకరించే ఫంక్షన్
void swap(int *p1, int *p2) {
    int temp = *p1; // *p1 అంటే ఆ అడ్రస్ లోని విలువను చదవడం (Dereferencing)
    *p1 = *p2;      // p1 అడ్రస్ లోకి p2 విలువను రాయడం
    *p2 = temp;     // p2 అడ్రస్ లోకి temp విలువను రాయడం
}

int main(void) {
    int a = 10, b = 20;
    printf("స్వాప్‌కు ముందు : a = %d, b = %d\\n", a, b);

    // అడ్రస్‌లను పాస్ చేయడం (&amp;a, &amp;b)
    swap(&a, &b);

    printf("స్వాప్ తర్వాత : a = %d, b = %d\\n", a, b);
    return 0;
}</code></pre>
      </div>
    </div>

    <!-- SECTION 3 -->
    <div class="section-title"><span class="num">3</span>ఒకే ఫంక్షన్ నుండి బహుళ విలువలను రిటర్న్ చేయడం (Output Parameters)</div>
    <div class="section-body">
      <p>
        C లో ఒక ఫంక్షన్ కేవలం ఒకే ఒక్క విలువను మాత్రమే <code>return</code> చేయగలదు. కానీ రెండు లేదా అంతకంటే ఎక్కువ ఫలితాలు అవసరమైనప్పుడు (ఉదా: భాగహారం చేసి భాగఫలం మరియు శేషం రెండూ కావాలన్నప్పుడు) పాయింటర్లను <strong>అవుట్‌పుట్ పారామీటర్లు (Output Parameters)</strong> గా వాడతాం:
      </p>

      <div class="code-block" style="margin:16px 0;">
        <div class="code-block-header">
          <span class="lang-tag">C — Multiple Return Values with Pointers</span>
          <a class="try-btn" href="/online-c-compiler.html">⚡ Try in C Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

void divide(int dividend, int divisor, int *quotient, int *remainder) {
    if (divisor != 0) {
        *quotient = dividend / divisor;
        *remainder = dividend % divisor;
    }
}

int main(void) {
    int q, r;
    divide(17, 5, &q, &r);
    printf("17/5 భాగఫలం (Quotient): %d | శేషం (Remainder): %d\\n", q, r);
    return 0;
}</code></pre>
      </div>
    </div>

    <!-- SECTION 4 -->
    <div class="section-title"><span class="num">4</span>బిగినర్స్ చేసే ఘోరమైన తప్పులు (Beginner Pitfalls)</div>
    <div class="section-body">
      <div style="display:flex; flex-direction:column; gap:12px; margin:16px 0;">
        <div style="background:rgba(239, 68, 68, 0.08); border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px 18px;">
          <div style="font-weight:700; color:#ef4444; font-size:14px;">❌ 1. పాయింటర్స్ లేకుండా స్వాపింగ్ ప్రయత్నించడం:</div>
          <code style="font-size:13px; color:var(--text); display:block; margin:6px 0;">void swap(int a, int b) { ... } // ఇది main లోని విలువలను మార్చలేదు!</code>
          <span style="font-size:13px; color:var(--text2); display:block;">ఇది బిగినర్స్ చేసే అత్యంత కామన్ తప్పు. పాయింటర్లు వాడకపోతే స్వాపింగ్ కేవలం ఫంక్షన్ లోపల లోకల్ కాపీలలోనే జరిగి బయట ఎలాంటి ప్రభావం ఉండదు.</span>
        </div>

        <div style="background:rgba(239, 68, 68, 0.08); border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px 18px;">
          <div style="font-weight:700; color:#ef4444; font-size:14px;">❌ 2. డీరిఫరెన్సింగ్ ఆపరేటర్ (*) మర్చిపోవడం:</div>
          <code style="font-size:13px; color:var(--text); display:block; margin:6px 0;">p1 = p2; // అడ్రస్‌లను మారుస్తుంది కానీ మెమరీలోని విలువలను కాదు!</code>
          <span style="font-size:13px; color:var(--text2); display:block;">మెమరీ లోపలి విలువను మార్చడానికి ఎల్లప్పుడూ <code>*p1 = *p2;</code> అని ఆస్టెరిస్క్ <code>*</code> ఉపయోగించాలి.</span>
        </div>
      </div>
    </div>

    <!-- SECTION 5 -->
    <div class="section-title"><span class="num">5</span>తరచుగా అడిగే ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div style="display:flex; flex-direction:column; gap:12px; margin-top:16px;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px;">
          <h4 style="color:#10b981; margin:0 0 6px 0; font-size:14.5px;">Q: C లాంగ్వేజ్‌లో C++ లాంటి Reference (&amp;var) వేరియబుల్స్ ఉన్నాయా?</h4>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.6;">
            లేవు! C++ లో <code>void swap(int &amp;a, int &amp;b)</code> అని రాస్తే ఆటోమేటిక్ రిఫరెన్స్ పాసింగ్ జరుగుతుంది. కానీ స్వచ్ఛమైన C లో రిఫరెన్స్ పాస్ చేయాలంటే ఖచ్చితంగా ఎక్స్‌ప్లిసిట్ పాయింటర్స్ (<code>int *a</code>) మరియు అడ్రస్ ఆపరేటర్ (<code>&amp;a</code>) వాడాల్సిందే.
          </p>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px;">
          <h4 style="color:#10b981; margin:0 0 6px 0; font-size:14.5px;">Q: పెద్ద స్ట్రక్చర్లు (Structures) పాస్ చేసేటప్పుడు పాయింటర్లు ఎందుకు వాడాలి?</h4>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.6;">
            1000 బైట్ల భారీ స్ట్రక్చర్‌ను Call by Value తో పాస్ చేస్తే ప్రతిసారీ 1000 బైట్లు స్టాక్ మెమరీలోకి కాపీ కావడానికి CPU సమయం వృధా అవుతుంది. పాయింటర్ పాస్ చేస్తే కేవలం 8 బైట్ల మెమరీ అడ్రస్ మాత్రమే పాస్ అయి ప్రోగ్రామ్ వేగంగా నడుస్తుంది.
          </p>
        </div>
      </div>
    </div>
  `,

  // -------------------------------------------------------------
  // CHAPTER 11: STORAGE CLASSES & VARIABLE SCOPE
  // -------------------------------------------------------------
  11: `
    <div class="intro-box">
      C లో ఒక వేరియబుల్‌ను డిక్లేర్ చేసినప్పుడు దానికి కేవలం డేటా టైప్ మాత్రమే కాకుండా, అది మెమరీలో ఎక్కడ నిల్వ ఉంటుంది, ప్రోగ్రామ్‌లో ఎక్కడి నుండి యాక్సెస్ చేయవచ్చు (Scope), మరియు ఎంతకాలం బతికి ఉంటుంది (Lifetime) అనే అంశాలను <strong>స్టోరేజ్ క్లాసెస్ (Storage Classes)</strong> నిర్ణయిస్తాయి. ఈ అధ్యాయంలో <code>auto</code>, <code>static</code>, <code>extern</code>, మరియు <code>register</code> ల అంతర్గత ఆర్కిటెక్చర్‌ను లోతుగా నేర్చుకుందాం.
    </div>

    <!-- SECTION 1 -->
    <div class="section-title"><span class="num">1</span>లోకల్ vs గ్లోబల్ స్కోప్ & షాడోయింగ్ (Scope Rules)</div>
    <div class="section-body">
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:16px; margin:16px 0;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px;">
          <h4 style="color:#10b981; margin:0 0 8px 0; font-size:14px;">1. బ్లాక్ స్కోప్ / లోకల్ వేరియబుల్స్:</h4>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.5;">
            ఫంక్షన్ లేదా <code>{ }</code> లోపల డిక్లేర్ చేయబడతాయి. అవి ఉన్న స్టాక్ ఫ్రేమ్ ముగియగానే అవి మెమరీ నుండి తుడిచిపెట్టుకుపోతాయి. డీఫాల్ట్ స్టోరేజ్ క్లాస్ <strong>auto</strong>.
          </p>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px;">
          <h4 style="color:#3b82f6; margin:0 0 8px 0; font-size:14px;">2. ఫైల్ స్కోప్ / గ్లోబల్ వేరియబుల్స్:</h4>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.5;">
            అన్ని ఫంక్షన్ల బయట డిక్లేర్ చేయబడతాయి. ప్రోగ్రామ్ స్టార్ట్ అయినప్పటి నుండి ముగిసేంత వరకు RAM లోని డేటా సెగ్మెంట్‌లో జీవించి ఉంటాయి.
          </p>
        </div>
      </div>
    </div>

    <!-- SECTION 2 -->
    <div class="section-title"><span class="num">2</span>static వేరియబుల్స్ — మెమరీ నిలుపుదల సూత్రం</div>
    <div class="section-body">
      <p>
        సాధారణ లోకల్ వేరియబుల్ ఫంక్షన్ పూర్తవగానే నశిస్తుంది. కానీ ఒక లోకల్ వేరియబుల్‌కు ముందు <strong>static</strong> అని రాస్తే, ఫంక్షన్ ముగిసినా దాని విలువ మెమరీలోనే భద్రంగా ఉంటుంది! తర్వాతి సారి ఆ ఫంక్షన్‌ను పిలిచినప్పుడు పాత విలువ నుండే కొనసాగుతుంది.
      </p>

      <div class="code-block" style="margin:16px 0;">
        <div class="code-block-header">
          <span class="lang-tag">C — static variable persistence</span>
          <a class="try-btn" href="/online-c-compiler.html">⚡ Try in C Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

void countVisits(void) {
    // ప్రోగ్రామ్ జీవితకాలంలో ఒక్కసారి మాత్రమే ఇనీషియలైజ్ అవుతుంది
    static int visitCount = 0;
    visitCount++;
    printf("విజిట్ సంఖ్య: %d\\n", visitCount);
}

int main(void) {
    countVisits(); // విజిట్ సంఖ్య: 1
    countVisits(); // విజిట్ సంఖ్య: 2
    countVisits(); // విజిట్ సంఖ్య: 3
    return 0;
}</code></pre>
      </div>
    </div>

    <!-- SECTION 3 -->
    <div class="section-title"><span class="num">3</span>register & extern స్టోరేజ్ క్లాసెస్</div>
    <div class="section-body">
      <div style="display:flex; flex-direction:column; gap:12px; margin:16px 0;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #f59e0b; border-radius:8px; padding:14px 18px;">
          <div style="font-weight:700; color:#f59e0b; font-size:14.5px;">⚡ register: CPU రిజిస్టర్ అలొకేషన్ హింట్</div>
          <p style="font-size:13px; color:var(--text2); margin:6px 0 0 0; line-height:1.6;">
            <code>register int i;</code> అని రాస్తే, కంపైలర్ ఆ వేరియబుల్‌ను RAM లో కాకుండా నేరుగా CPU లోని హై-స్పీడ్ రిజిస్టర్‌లో పెట్టడానికి ప్రయత్నిస్తుంది. ముఖ్య గమనిక: <strong>రిజిస్టర్ వేరియబుల్స్ కు మెమరీ అడ్రస్ ఉండదు కాబట్టి <code>&amp;i</code> వాడటం నిషిద్ధం</strong>.
          </p>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #8b5cf6; border-radius:8px; padding:14px 18px;">
          <div style="font-weight:700; color:#8b5cf6; font-size:14.5px;">🌐 extern: మల్టీ-ఫైల్ గ్లోబల్ లింకేజ్</div>
          <p style="font-size:13px; color:var(--text2); margin:6px 0 0 0; line-height:1.6;">
            ఒక వేరియబుల్ వేరే ఏదో <code>.c</code> ఫైల్‌లో డిక్లేర్ చేయబడిందని, ఇక్కడ కేవలం వాడుకోవడానికి మాత్రమే రిఫర్ చేస్తున్నామని లింకర్‌కు చెప్పడానికి <code>extern int globalMax;</code> వాడతాం.
          </p>
        </div>
      </div>
    </div>

    <!-- SECTION 4 -->
    <div class="section-title"><span class="num">4</span>బిగినర్స్ చేసే ఘోరమైన తప్పులు (Beginner Pitfalls)</div>
    <div class="section-body">
      <div style="display:flex; flex-direction:column; gap:12px; margin:16px 0;">
        <div style="background:rgba(239, 68, 68, 0.08); border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px 18px;">
          <div style="font-weight:700; color:#ef4444; font-size:14px;">❌ 1. register వేరియబుల్ అడ్రస్ తీసుకోవడానికి ప్రయత్నించడం:</div>
          <code style="font-size:13px; color:var(--text); display:block; margin:6px 0;">register int count = 10; scanf("%d", &amp;count); // Compiler Error!</code>
          <span style="font-size:13px; color:var(--text2); display:block;">రిజిస్టర్లకు RAM మెమరీ అడ్రస్ ఉండదు కాబట్టి అడ్రస్-ఆఫ్ <code>&amp;</code> ఆపరేటర్ వాడితే కంపైలర్ ఎర్రర్ ఇస్తుంది.</span>
        </div>

        <div style="background:rgba(239, 68, 68, 0.08); border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px 18px;">
          <div style="font-weight:700; color:#ef4444; font-size:14px;">❌ 2. గ్లోబల్ వేరియబుల్స్‌ను విచ్చలవిడిగా వాడడం:</div>
          <span style="font-size:13px; color:var(--text2); display:block; margin-top:4px;">గ్లోబల్ వేరియబుల్స్‌ను ఏ ఫంక్షన్ అయినా మార్చగలదు కాబట్టి బగ్స్ ఎక్కడ వచ్చాయో కనిపెట్టడం దాదాపు అసాధ్యం అవుతుంది. వీలైనంత వరకు లోకల్ వేరియబుల్స్ మరియు పారామీటర్లనే వాడాలి.</span>
        </div>
      </div>
    </div>

    <!-- SECTION 5 -->
    <div class="section-title"><span class="num">5</span>తరచుగా అడిగే ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div style="display:flex; flex-direction:column; gap:12px; margin-top:16px;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px;">
          <h4 style="color:#10b981; margin:0 0 6px 0; font-size:14.5px;">Q: static వేరియబుల్స్‌కు ప్రారంభ విలువ ఇవ్వకపోతే ఏమవుతుంది?</h4>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.6;">
            సాధారణ లోకల్ వేరియబుల్స్‌లాగా గార్బేజ్ వాల్యూ ఉండదు! <code>static</code> మరియు గ్లోబల్ వేరియబుల్స్ BSS సెగ్మెంట్‌లో నిల్వ ఉంటాయి కాబట్టి కంపైలర్ వాటిని స్వయంచాలకంగా <strong>0 (సున్నా)</strong> తో ఇనీషియలైజ్ చేస్తుంది.
          </p>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px;">
          <h4 style="color:#10b981; margin:0 0 6px 0; font-size:14.5px;">Q: C++ లో auto కీవర్డ్ మరియు C లో auto కీవర్డ్ మధ్య తేడా ఏమిటి?</h4>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.6;">
            C లాంగ్వేజ్‌లో <code>auto</code> అనేది డీఫాల్ట్ లోకల్ స్టోరేజ్ క్లాస్ (దాదాపు ఎవరూ రాయరు). కానీ ఆధునిక C++ (C++11+) లో <code>auto</code> అంటే టైప్ ఇన్ఫరెన్స్ (Type Inference) — విలువను బట్టి డేటా టైప్‌ను కంపైలర్ స్వయంగా ఊహించడం.
          </p>
        </div>
      </div>
    </div>
  `,

  // -------------------------------------------------------------
  // CHAPTER 12: RECURSION & CALL STACK MECHANICS
  // -------------------------------------------------------------
  12: `
    <div class="intro-box">
      కంప్యూటర్ సైన్స్‌లో అత్యంత శక్తివంతమైన మరియు అందమైన అల్గారిథమిక్ టెక్నిక్ <strong>రికార్షన్ (Recursion)</strong>. ఒక పెద్ద సమస్యను పరిష్కరించడానికి ఒక ఫంక్షన్ తనను తాను మళ్లీ మళ్లీ పిలుచుకోవడమే రికార్షన్. అయితే రికార్షన్‌ను నియంత్రించే <strong>బేస్ కండిషన్ (Base Condition)</strong> లేకపోతే కంప్యూటర్ మెమరీ నిండిపోయి <strong>స్టాక్ ఓవర్‌ఫ్లో (Stack Overflow)</strong> క్రాష్ ఎలా సంభవిస్తుందో, ఫ్యాక్టోరియల్ మరియు ఫిబోనాకి కాల్ ట్రీల ద్వారా లోతుగా నేర్చుకుందాం.
    </div>

    <!-- SECTION 1 -->
    <div class="section-title"><span class="num">1</span>రికార్షన్ 2 మూలస్తంభాలు — బేస్ కండిషన్ & రికర్సివ్ స్టెప్</div>
    <div class="section-body">
      <p>
        ఏదైనా రికర్సివ్ ఫంక్షన్ సరిగ్గా పనిచేయాలంటే అది ఖచ్చితంగా రెండు నియమాలను కలిగి ఉండాలి:
      </p>

      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:16px; margin:20px 0;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #10b981; border-radius:8px; padding:16px;">
          <h4 style="color:#10b981; margin:0 0 6px 0; font-size:14.5px;">1. బేస్ కండిషన్ (The Base Case):</h4>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.6;">
            ఇది రికార్షన్ ఆగాల్సిన గమ్యస్థానం. ఫంక్షన్ ఇకపై తనను తాను పిలవకుండా ఖచ్చితమైన సమాధానాన్ని రిటర్న్ చేసి వెనక్కి మళ్ళే షరతు (ఉదా: <code>if (n &lt;= 1) return 1;</code>).
          </p>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #3b82f6; border-radius:8px; padding:16px;">
          <h4 style="color:#3b82f6; margin:0 0 6px 0; font-size:14.5px;">2. రికర్సివ్ స్టెప్ (The Recursive Step):</h4>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.6;">
            సమస్య పరిమాణాన్ని కుదిస్తూ (Reducing problem size) బేస్ కండిషన్ దిశగా తీసుకువెళ్లే పిలుపు (ఉదా: <code>n * factorial(n - 1)</code>).
          </p>
        </div>
      </div>

      <div class="code-block" style="margin:16px 0;">
        <div class="code-block-header">
          <span class="lang-tag">C — Recursive Factorial</span>
          <a class="try-btn" href="/online-c-compiler.html">⚡ Try in C Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

long long factorial(int n) {
    // బేస్ కండిషన్
    if (n &lt;= 1) {
        return 1;
    }
    // రికర్సివ్ కాల్
    return n * factorial(n - 1);
}

int main(void) {
    int num = 5;
    printf("%d యొక్క ఫ్యాక్టోరియల్ = %lld\\n", num, factorial(num));
    return 0;
}</code></pre>
      </div>
    </div>

    <!-- SECTION 2 -->
    <div class="section-title"><span class="num">2</span>కాల్ స్టాక్ విజువలైజేషన్ & స్టాక్ ఫ్రేమ్‌ల పేర్చివేత (Call Tree Trace)</div>
    <div class="section-body">
      <p>
        <code>factorial(4)</code> పిలిచినప్పుడు RAM కాల్ స్టాక్‌లో రెండు విభిన్న దశలు జరుగుతాయి:
      </p>

      <div style="display:flex; flex-direction:column; gap:12px; margin:16px 0;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px 18px;">
          <strong style="color:#3b82f6; font-size:14px;">దశ 1: వైండింగ్ ఫేజ్ (Winding Phase - ఫార్వర్డ్ కాల్స్):</strong>
          <p style="font-size:13px; color:var(--text2); margin:6px 0 0 0; line-height:1.6;">
            <code>factorial(4)</code> ➔ <code>factorial(3)</code> ➔ <code>factorial(2)</code> ➔ <code>factorial(1)</code>. ప్రతి కాల్‌కు కొత్త స్టాక్ ఫ్రేమ్ మెమరీలో పేర్చబడుతుంది.
          </p>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px 18px;">
          <strong style="color:#10b981; font-size:14px;">దశ 2: అన్‌వైండింగ్ ఫేజ్ (Unwinding Phase - ఫలితాల రిటర్న్):</strong>
          <p style="font-size:13px; color:var(--text2); margin:6px 0 0 0; line-height:1.6;">
            బేస్ కండిషన్ <code>factorial(1) = 1</code> రీచ్ అవ్వగానే ఫ్రేమ్‌లు పాప్ అవుతూ గుణకారం పూర్తవుతుంది: <code>1</code> ➔ <code>2 * 1 = 2</code> ➔ <code>3 * 2 = 6</code> ➔ <code>4 * 6 = 24</code>.
          </p>
        </div>
      </div>
    </div>

    <!-- SECTION 3 -->
    <div class="section-title"><span class="num">3</span>స్టాక్ ఓవర్‌ఫ్లో (Stack Overflow) ఎర్రర్ నివారణ</div>
    <div class="section-body">
      <p>
        బేస్ కండిషన్ రాయడం మర్చిపోయినా లేదా ఇన్పుట్ సైజ్ చాలా పెద్దదై వేల సంఖ్యలో రికర్సివ్ కాల్స్ జరిగినా, కాల్ స్టాక్ కోసం OS కేటాయించిన మెమరీ (8MB) పూర్తిగా నిండిపోతుంది.
      </p>

      <div style="background:rgba(239, 68, 68, 0.08); border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px 18px; margin:16px 0;">
        <strong style="color:#ef4444; font-size:14px;">💥 Segmentation fault (core dumped):</strong>
        <p style="font-size:13px; color:var(--text); margin:6px 0 0 0; line-height:1.6;">
          స్టాక్ బౌండరీ దాటి పక్కనున్న మెమరీ గార్డ్ పేజీలోకి వెళ్ళిన క్షణంలో ఆపరేటింగ్ సిస్టమ్ ప్రోగ్రామ్‌ను బలవంతంగా క్రాష్ చేస్తుంది. దీనినే <strong>Stack Overflow</strong> అంటారు.
        </p>
      </div>

      <h4 style="color:#10b981; margin:20px 0 10px; font-size:15px; font-weight:700;">⚖️ లూప్స్ vs రికార్షన్ (Comparison Matrix):</h4>
      <div style="overflow-x:auto; margin-bottom:16px;">
        <table style="width:100%; border-collapse:collapse; font-size:13px; text-align:left;">
          <thead>
            <tr style="background:var(--bg3); border-bottom:2px solid var(--border);">
              <th style="padding:10px 14px; color:var(--text);">లక్షణం</th>
              <th style="padding:10px 14px; color:var(--text);">లూప్స్ (Iteration)</th>
              <th style="padding:10px 14px; color:var(--text);">రికార్షన్ (Recursion)</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom:1px solid var(--border);">
              <td style="padding:10px 14px; font-weight:700; color:#10b981;">మెమరీ వినియోగం</td>
              <td style="padding:10px 14px;">$O(1)$ స్థిరమైన మెమరీ</td>
              <td style="padding:10px 14px;">$O(N)$ స్టాక్ ఫ్రేమ్‌ల మెమరీ ఓవర్‌హెడ్</td>
            </tr>
            <tr style="border-bottom:1px solid var(--border);">
              <td style="padding:10px 14px; font-weight:700; color:#10b981;">వేగం (Speed)</td>
              <td style="padding:10px 14px;">అత్యంత వేగవంతమైనది</td>
              <td style="padding:10px 14px;">ఫంక్షన్ కాల్ ఓవర్‌హెడ్ వల్ల కొద్దిగా నెమ్మది</td>
            </tr>
            <tr>
              <td style="padding:10px 14px; font-weight:700; color:#10b981;">కోడ్ పరిశుభ్రత</td>
              <td style="padding:10px 14px;">ట్రీస్/గ్రాఫ్స్‌కు సంక్లిష్టమైన కోడ్</td>
              <td style="padding:10px 14px;">డివైడ్ & కాంకర్ సమస్యలకు అత్యంత సూక్ష్మమైన కోడ్</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- SECTION 4 -->
    <div class="section-title"><span class="num">4</span>బిగినర్స్ చేసే ఘోరమైన తప్పులు (Beginner Pitfalls)</div>
    <div class="section-body">
      <div style="display:flex; flex-direction:column; gap:12px; margin:16px 0;">
        <div style="background:rgba(239, 68, 68, 0.08); border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px 18px;">
          <div style="font-weight:700; color:#ef4444; font-size:14px;">❌ 1. బేస్ కండిషన్ లేకపోవడం:</div>
          <span style="font-size:13px; color:var(--text2); display:block; margin-top:4px;">బేస్ కండిషన్ లేకపోతే అనంతమైన రికర్సివ్ కాల్స్‌తో ప్రోగ్రామ్ తక్షణమే క్రాష్ అవుతుంది.</span>
        </div>

        <div style="background:rgba(239, 68, 68, 0.08); border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px 18px;">
          <div style="font-weight:700; color:#ef4444; font-size:14px;">❌ 2. ఫిబోనాకి డూప్లికేట్ కాల్స్ ట్రాప్:</div>
          <span style="font-size:13px; color:var(--text2); display:block; margin-top:4px;"><code>fib(n-1) + fib(n-2)</code> అని రాస్తే ఒకే విలువను లెక్కించడానికి వందల సార్లు డూప్లికేట్ కాల్స్ జరిగి $O(2^N)$ తో సిస్టమ్ ఫ్రీజ్ అవుతుంది. డైనమిక్ ప్రోగ్రామింగ్ లేదా లూప్స్ వాడాలి.</span>
        </div>
      </div>
    </div>

    <!-- SECTION 5 -->
    <div class="section-title"><span class="num">5</span>తరచుగా అడిగే ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div style="display:flex; flex-direction:column; gap:12px; margin-top:16px;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px;">
          <h4 style="color:#10b981; margin:0 0 6px 0; font-size:14.5px;">Q: Tail Recursion అంటే ఏమిటి? కంపైలర్ దాన్ని ఎలా ఆప్టిమైజ్ చేస్తుంది?</h4>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.6;">
            ఒక రికర్సివ్ ఫంక్షన్‌లో రికర్సివ్ కాల్ అనేది ఆ ఫంక్షన్ యొక్క ఆఖరి స్టేట్‌మెంట్ అయితే దాన్ని <strong>Tail Recursion</strong> అంటారు. ఆధునిక GCC కంపైలర్లు (Tail Call Optimization - TCO) ద్వారా కొత్త స్టాక్ ఫ్రేమ్స్ సృష్టించకుండా దాన్ని స్వయంచాలకంగా ఒక సాధారణ లూప్‌గా మార్చి మెమరీని ఆదా చేస్తాయి.
          </p>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px;">
          <h4 style="color:#10b981; margin:0 0 6px 0; font-size:14.5px;">Q: పరిశ్రమల్లో రియల్-వరల్డ్ ప్రాజెక్టులలో రికార్షన్‌ను ఎక్కడ వాడతారు?</h4>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.6;">
            ఫైల్ సిస్టమ్ డైరెక్టరీలను ట్రావర్స్ చేయడానికి, JSON / XML పార్సింగ్ చేయడానికి, బైనరీ సెర్చ్ ట్రీస్ (BST) మరియు క్విక్ సార్ట్ (QuickSort), మెర్జ్ సార్ట్ (MergeSort) వంటి అల్గారిథమ్‌లలో రికార్షన్ విస్తృతంగా వాడతారు.
          </p>
        </div>
      </div>
    </div>
  `
};

// Execute writing out upgraded files for Phase 3 (Lessons 9 to 12)
for (let i = 9; i <= 12; ++i) {
  const lesson = LESSONS.find(l => l.num === i);
  if (!lesson) continue;
  lesson.contentHtml = PHASE3_CONTENTS[i];
  const html = generatePageHtml(lesson);
  fs.writeFileSync(path.join(cDir, lesson.file), html, 'utf8');
  console.log(`✅ Fully enriched Phase 3 Lesson ${i} : ${lesson.file} (${html.length} chars)`);
}

