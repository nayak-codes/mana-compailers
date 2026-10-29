const fs = require('fs');
const path = require('path');
const { LESSONS } = require('./c_curriculum_data.js');
const { generatePageHtml } = require('./c_page_template.js');

const cDir = path.join(__dirname, '../public/blog-c');

// ==========================================
// COMPREHENSIVE EDITORIAL MASTERCLASS CONTENT: PHASE 2 (CH 05 - 08)
// ==========================================

const PHASE2_CONTENTS = {
  // -------------------------------------------------------------
  // CHAPTER 5: IF-ELSE CONDITIONALS & BRANCHING
  // -------------------------------------------------------------
  5: `
    <div class="intro-box">
      కంప్యూటర్ ప్రోగ్రామ్‌లు కేవలం క్రమపద్ధతిలో పైనుండి క్రిందికి లైన్లను ఎగ్జిక్యూట్ చేయడమే కాకుండా, పరిస్థితులకు అనుగుణంగా నిర్ణయాలు (Decision Making) తీసుకోగలగాలి. నిజ జీవితంలో ATM క్యాష్ విత్‌డ్రా చెకింగ్, ఎగ్జామ్ గ్రేడింగ్ లేదా గేమింగ్ లాజిక్‌లో నిర్ణయాలు తీసుకోవడానికి C లో <strong>కండిషనల్ స్టేట్‌మెంట్స్ (Conditional Statements)</strong> మూలాధారం. ఈ అధ్యాయంలో <code>if</code>, <code>else if</code>, <code>else</code>, నెస్టెడ్ బ్రాంచ్‌లు, డాంగ్లింగ్ ఎల్స్ సమస్య మరియు టెర్నరీ ఆపరేటర్లను సమగ్రంగా పరిశీలిద్దాం.
    </div>

    <!-- SECTION 1 -->
    <div class="section-title"><span class="num">1</span>if, else if, else డెసిషన్ మేకింగ్ ఆర్కిటెక్చర్</div>
    <div class="section-body">
      <p>
        C లో కండిషన్లను పరీక్షించినప్పుడు కంప్యూటర్ ఒక ప్రాథమిక సూత్రాన్ని పాటిస్తుంది: <strong>ఏదైనా నాన్-జీరో (Non-zero) విలువ సత్యం (TRUE / 1)</strong>, మరియు <strong>కేవలం సున్నా మాత్రమే అసత్యం (FALSE / 0)</strong>.
      </p>

      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:16px; margin:20px 0;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #10b981; border-radius:8px; padding:16px;">
          <h4 style="color:#10b981; margin:0 0 6px 0; font-size:14.5px;">1. సింగిల్ if స్టేట్‌మెంట్ (Single Branch)</h4>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.6;">
            ఇచ్చిన షరతు నిజమైతేనే (True) ఆ బ్లాక్ రన్ అవుతుంది. అబద్ధమైతే (False) ప్రోగ్రామ్ దాన్ని దాటవేసి ముందుకు వెళ్తుంది.
          </p>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #3b82f6; border-radius:8px; padding:16px;">
          <h4 style="color:#3b82f6; margin:0 0 6px 0; font-size:14.5px;">2. if-else స్టేట్‌మెంట్ (Two-Way Branch)</h4>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.6;">
            షరతు నిజమైతే <code>if</code> బ్లాక్, అబద్ధమైతే ప్రత్యామ్నాయంగా <code>else</code> బ్లాక్ ఖచ్చితంగా ఎగ్జిక్యూట్ అవుతుంది.
          </p>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #8b5cf6; border-radius:8px; padding:16px;">
          <h4 style="color:#8b5cf6; margin:0 0 6px 0; font-size:14.5px;">3. else-if లాడర్ (Multi-Way Ladder)</h4>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.6;">
            బహుళ షరతులను వరుసగా తనిఖీ చేస్తుంది. మొదటి ఏ షరతు నిజమైతే ఆ బ్లాక్ రన్ అయి మిగిలిన మొత్తం లాడర్ స్కిప్ అవుతుంది.
          </p>
        </div>
      </div>

      <div class="code-block" style="margin:16px 0;">
        <div class="code-block-header">
          <span class="lang-tag">C — ATM Cash Withdrawal Logic</span>
          <a class="try-btn" href="/online-c-compiler.html">⚡ Try in C Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main(void) {
    int balance = 5000;
    int withdrawAmount = 2000;

    if (withdrawAmount &lt;= 0) {
        printf("చెల్లని మొత్తం! దయచేసి ధన సంఖ్యను నమోదు చేయండి.\\n");
    } else if (withdrawAmount &gt; balance) {
        printf("సరిపడా బ్యాలెన్స్ లేదు! మీ ఖాతాలో ఉన్నది: %d\\n", balance);
    } else {
        balance -= withdrawAmount;
        printf("విత్‌డ్రా విజయవంతమైంది: %d. మిగిలిన బ్యాలెన్స్: %d\\n", withdrawAmount, balance);
    }
    return 0;
}</code></pre>
      </div>
    </div>

    <!-- SECTION 2 -->
    <div class="section-title"><span class="num">2</span>నెస్టెడ్ if-else & డాంగ్లింగ్ else సమస్య (The Dangling else)</div>
    <div class="section-body">
      <p>
        ఒక <code>if</code> లేదా <code>else</code> బ్లాక్ లోపల మరొక కండిషనల్ స్టేట్‌మెంట్‌ను రాయడాన్ని <strong>నెస్టెడ్ కండిషన్స్ (Nested Conditions)</strong> అంటారు. అయితే బ్రాకెట్లు <code>{ }</code> సరిగ్గా వాడకపోతే కంపైలర్‌లో డాంగ్లింగ్ ఎల్స్ (Dangling else) అనే క్లాసికల్ బగ్ తలెత్తుతుంది:
      </p>

      <div style="background:rgba(239, 68, 68, 0.08); border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px 18px; margin:16px 0;">
        <strong style="color:#ef4444; font-size:14px;">⚠️ డాంగ్లింగ్ else ట్రాప్:</strong>
        <code style="font-size:13px; color:var(--text); display:block; margin:8px 0; background:var(--bg3); padding:8px; border-radius:4px;">
          if (a &gt; 0)<br>
          &nbsp;&nbsp;&nbsp;&nbsp;if (b &gt; 0)<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;printf("Both positive");<br>
          else<br>
          &nbsp;&nbsp;&nbsp;&nbsp;printf("Is this for 'a' or 'b'?"); // ఎవరి else ఇది?
        </code>
        <p style="font-size:13px; color:var(--text); margin:6px 0 0 0; line-height:1.6;">
          చూసే ప్రోగ్రామర్‌కి ఆ <code>else</code> మొదటి <code>if(a &gt; 0)</code> కి చెందినదిగా అనిపించవచ్చు. కానీ <strong>C నియమం ప్రకారం ఏ బ్రాకెట్ లేని <code>else</code> ఎల్లప్పుడూ తనకు అత్యంత సమీపంలో ఉన్న మునుపటి <code>if</code> కే చెందుతుంది!</strong> అంటే ఇక్కడ <code>b &gt; 0</code> కి అటాచ్ అవుతుంది. అందుకే ఎల్లప్పుడూ స్పష్టమైన కర్లీ బ్రేసెస్ <code>{ ... }</code> వాడాలి.
        </p>
      </div>
    </div>

    <!-- SECTION 3 -->
    <div class="section-title"><span class="num">3</span>టెర్నరీ ఆపరేటర్ (Ternary Operator ?: )</div>
    <div class="section-body">
      <p>
        సాధారణ రెండు లైన్ల <code>if-else</code> బ్లాక్‌ను కేవలం ఒకే ఒక్క లైన్‌లో ఎక్స్‌ప్రెషన్‌గా రాయడానికి <strong>టెర్నరీ ఆపరేటర్ (?:)</strong> ఉపయోగపడుతుంది.
      </p>

      <div class="code-block" style="margin:16px 0;">
        <div class="code-block-header">
          <span class="lang-tag">C — Ternary conditional expression</span>
          <a class="try-btn" href="/online-c-compiler.html">⚡ Try in C Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main(void) {
    int num = 17;
    // సింటాక్స్: condition ? value_if_true : value_if_false
    printf("సంఖ్య %d అనేది: %s\\n", num, (num % 2 == 0) ? "సరి సంఖ్య (Even)" : "బేసి సంఖ్య (Odd)");

    int a = 45, b = 80;
    int max = (a &gt; b) ? a : b;
    printf("గరిష్ట సంఖ్య: %d\\n", max);
    return 0;
}</code></pre>
      </div>
    </div>

    <!-- SECTION 4 -->
    <div class="section-title"><span class="num">4</span>బిగినర్స్ చేసే ఘోరమైన తప్పులు (Beginner Pitfalls)</div>
    <div class="section-body">
      <div style="display:flex; flex-direction:column; gap:12px; margin:16px 0;">
        <div style="background:rgba(239, 68, 68, 0.08); border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px 18px;">
          <div style="font-weight:700; color:#ef4444; font-size:14px;">❌ 1. if పక్కన సెమికోలన్ పెట్టడం (The Empty Statement Trap):</div>
          <code style="font-size:13px; color:var(--text); display:block; margin:6px 0;">if (age &gt;= 18); { printf("ఓటు హక్కు ఉంది"); } // సెమికోలన్ పెట్టరాదు!</code>
          <span style="font-size:13px; color:var(--text2); display:block;"><code>if(...);</code> అని పెడితే కండిషన్ అక్కడితో ముగిసిపోతుంది (Empty Statement). ఫలితంగా వయస్సు ఎంత ఉన్నా కర్లీ బ్రేసెస్ లోని కోడ్ ప్రతిసారీ రన్ అయిపోతుంది!</span>
        </div>

        <div style="background:rgba(239, 68, 68, 0.08); border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px 18px;">
          <div style="font-weight:700; color:#ef4444; font-size:14px;">❌ 2. Yoda Conditions వాడకపోవడం (The Assignment Trap):</div>
          <code style="font-size:13px; color:var(--text); display:block; margin:6px 0;">if (status = 1) // తప్పు! == బదులు = అసైన్ చేస్తుంది</code>
          <span style="font-size:13px; color:var(--text2); display:block;">ప్రొఫెషనల్స్ ఈ బగ్ నివారించడానికి <code>if (1 == status)</code> అని స్థిరాంకాన్ని (Constant) ఎడమవైపు రాస్తారు. ఒకవేళ పొరపాటున <code>=</code> రాసినా కంపైలర్ వెంటనే ఎర్రర్ చూపిస్తుంది.</span>
        </div>
      </div>
    </div>

    <!-- SECTION 5 -->
    <div class="section-title"><span class="num">5</span>తరచుగా అడిగే ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div style="display:flex; flex-direction:column; gap:12px; margin-top:16px;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px;">
          <h4 style="color:#10b981; margin:0 0 6px 0; font-size:14.5px;">Q: C లో if (-10) రాస్తే కండిషన్ True అవుతుందా లేక False అవుతుందా?</h4>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.6;">
            ఖచ్చితంగా <strong>TRUE</strong> అవుతుంది! C లాంగ్వేజ్ మెమరీ నియమాల ప్రకారం <code>0</code> మాత్రమే అసత్యం (FALSE). ధన సంఖ్యలు (+5), రుణ సంఖ్యలు (-10) మరియు ఏదైనా నాన్-జీరో అడ్రస్ అన్నీ సత్యం (TRUE) గానే పరిగణించబడతాయి.
          </p>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px;">
          <h4 style="color:#10b981; margin:0 0 6px 0; font-size:14.5px;">Q: else-if లాడర్ మరియు switch లలో దేనిని ఎప్పుడు ఎంచుకోవాలి?</h4>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.6;">
            రేంజ్‌లు లేదా సంక్లిష్టమైన లాజికల్ కండిషన్లు (<code>age &gt;= 18 &amp;&amp; score &gt; 80</code>) ఉన్నప్పుడు <code>else-if</code> వాడాలి. కేవలం స్థిరమైన పూర్ణాంకాలు లేదా క్యారెక్టర్ల చాయిస్‌లతో (మెనూ ఆప్షన్లు 1, 2, 3...) పనిచేసేటప్పుడు వేగవంతమైన <code>switch</code> వాడాలి.
          </p>
        </div>
      </div>
    </div>
  `,

  // -------------------------------------------------------------
  // CHAPTER 6: SWITCH-CASE & MENU-DRIVEN PROGRAMMING
  // -------------------------------------------------------------
  6: `
    <div class="intro-box">
      ఒక ప్రోగ్రామ్‌లో అనేక స్థిరమైన విలువలపై (Discrete integer choices) నిర్ణయం తీసుకోవాల్సి వచ్చినప్పుడు వరుసగా <code>else-if</code> లు రాయడం కోడ్‌ను సంక్లిష్టంగా చేస్తుంది. అటువంటి పరిస్థితుల్లో అత్యంత వేగవంతమైన, పరిశుభ్రమైన ప్రత్యామ్నాయం <strong>switch-case స్టేట్‌మెంట్</strong>. GCC కంపైలర్ దీనిని $O(1)$ జంప్ టేబుల్‌గా ఎలా మారుస్తుంది, <code>break</code> ప్రాముఖ్యత మరియు ఫాల్-త్రూ మెకానిక్స్‌ను ఈ అధ్యాయంలో నేర్చుకుందాం.
    </div>

    <!-- SECTION 1 -->
    <div class="section-title"><span class="num">1</span>switch-case అంతర్గత పనితీరు & Jump Table ఆర్కిటెక్చర్</div>
    <div class="section-body">
      <p>
        <code>else-if</code> లాడర్‌లో ప్రతి కండిషన్‌ను వరుసగా పై నుండి క్రిందికి తనిఖీ చేస్తూ వెళ్లాలి ($O(N)$ లీనియర్ టైమ్). కానీ <code>switch</code> లో కేస్ విలువలు వరుసగా ఉన్నప్పుడు కంపైలర్ ఒక <strong>Jump Table (మెమరీ అడ్రస్‌ల అరే)</strong> ను రూపొందిస్తుంది. CPU నేరుగా సంబంధిత కేస్‌కు $O(1)$ స్థిర సమయంలో దూకుతుంది (Direct Branching).
      </p>

      <div style="background:var(--bg2); border-left:4px solid #10b981; border-radius:0 8px 8px 0; padding:16px; margin:16px 0;">
        <strong style="color:#10b981; font-size:14.5px;">🔒 C లో switch నిబంధనలు (Core Rules):</strong>
        <ul style="margin:6px 0 0 0; padding-left:20px; font-size:13.5px; color:var(--text); line-height:1.7;">
          <li>ఎక్స్‌ప్రెషన్ తప్పనిసరిగా <strong>పూర్ణాంకం (int, short, long)</strong> లేదా <strong>క్యారెక్టర్ (char)</strong> అయి ఉండాలి.</li>
          <li><strong>ఫ్లోటింగ్ పాయింట్ (float, double) సంఖ్యలు మరియు స్ట్రింగ్స్‌ను switch లో అనుమతించరు.</strong></li>
          <li>ప్రతి <code>case</code> లేబుల్ తప్పనిసరిగా ఒక కంపైల్-టైమ్ స్థిరాంకం (Constant Expression) అయి ఉండాలి; వేరియబుల్స్ ఉండకూడదు.</li>
        </ul>
      </div>
    </div>

    <!-- SECTION 2 -->
    <div class="section-title"><span class="num">2</span>break కీవర్డ్ & ఫాల్-త్రూ మెకానిక్స్ (Fall-Through Behavior)</div>
    <div class="section-body">
      <p>
        <code>switch</code> లో ఒక కేస్ సరిపోలిన తర్వాత, మీరు అక్కడ <strong>break</strong> పెట్టకపోతే, C కంపైలర్ ఆగిపోదు! తర్వాతి కేస్‌ల షరతులు నిజమా కాదా అనేది పట్టించుకోకుండా వాటిలోని కోడ్‌ను కూడా వరుసగా ఎగ్జిక్యూట్ చేసుకుంటూ వెళ్ళిపోతుంది. దీనిని <strong>ఫాల్-త్రూ (Fall-Through)</strong> అంటారు.
      </p>

      <div class="code-block" style="margin:16px 0;">
        <div class="code-block-header">
          <span class="lang-tag">C — Intentional Fall-through for Vowel Check</span>
          <a class="try-btn" href="/online-c-compiler.html">⚡ Try in C Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main(void) {
    char ch = 'E';

    switch (ch) {
        case 'a':
        case 'A':
        case 'e':
        case 'E':
        case 'i':
        case 'I':
        case 'o':
        case 'O':
        case 'u':
        case 'U':
            printf("'%c' ఒక అచ్చు (Vowel)\\n", ch);
            break;
        default:
            printf("'%c' ఒక హల్లు లేదా ప్రత్యేక చిహ్నం (Consonant)\\n", ch);
            break;
    }
    return 0;
}</code></pre>
      </div>
      <p style="font-size:13px; color:var(--text2); margin:8px 0 0 0;">
        💡 పై ఉదాహరణలో మనం కావాలనే <code>break</code> పెట్టకుండా బహుళ కేస్‌లను కలిపి (Grouping) ఒకే బ్లాక్‌గా ఉపయోగించాం. దీనిని <em>Intentional Fall-through</em> అంటారు.
      </p>
    </div>

    <!-- SECTION 3 -->
    <div class="section-title"><span class="num">3</span>మినీ ప్రాజెక్ట్: మెనూ-డ్రివెన్ అర్థమెటిక్ క్యాలిక్యులేటర్</div>
    <div class="section-body">
      <p>
        రియల్-వరల్డ్ కన్సోల్ అప్లికేషన్లలో యూజర్ ఛాయిస్ ఆధారంగా ఆపరేషన్లు చేయడానికి <code>switch</code> అత్యంత ప్రాచుర్యం పొందింది:
      </p>

      <div class="code-block" style="margin:16px 0;">
        <div class="code-block-header">
          <span class="lang-tag">C — Menu-Driven Calculator</span>
          <a class="try-btn" href="/online-c-compiler.html">⚡ Try in C Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main(void) {
    char op;
    double a, b;

    printf("ఆపరేషన్ ఎంటర్ చేయండి (+, -, *, /): ");
    scanf(" %c", &op);

    printf("రెండు సంఖ్యలను నమోదు చేయండి: ");
    scanf("%lf %lf", &a, &b);

    switch (op) {
        case '+':
            printf("ఫలితం: %.2lf + %.2lf = %.2lf\\n", a, b, a + b);
            break;
        case '-':
            printf("ఫలితం: %.2lf - %.2lf = %.2lf\\n", a, b, a - b);
            break;
        case '*':
            printf("ఫలితం: %.2lf * %.2lf = %.2lf\\n", a, b, a * b);
            break;
        case '/':
            if (b != 0) {
                printf("ఫలితం: %.2lf / %.2lf = %.2lf\\n", a, b, a / b);
            } else {
                printf("ఎర్రర్: సున్నాతో భాగించడం అసాధ్యం! (Division by zero)\\n");
            }
            break;
        default:
            printf("చెల్లని ఆపరేటర్: '%c'\\n", op);
            break;
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
          <div style="font-weight:700; color:#ef4444; font-size:14px;">❌ 1. కేస్ బ్లాక్ లోపల నేరుగా వేరియబుల్స్ డిక్లేర్ చేయడం:</div>
          <code style="font-size:13px; color:var(--text); display:block; margin:6px 0;">case 1: int x = 10; break; // Compile Error! Jump crosses initialization</code>
          <span style="font-size:13px; color:var(--text2); display:block;">కేస్ లేబుల్ లోపల కొత్త వేరియబుల్ డిక్లేర్ చేయాలంటే ఆ కేస్‌ను ప్రత్యేక స్కోప్ కర్లీ బ్రేసెస్ <code>case 1: { int x = 10; break; }</code> లో ఉంచాలి.</span>
        </div>

        <div style="background:rgba(239, 68, 68, 0.08); border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px 18px;">
          <div style="font-weight:700; color:#ef4444; font-size:14px;">❌ 2. డూప్లికేట్ కేస్ వాల్యూస్ ఇవ్వడం:</div>
          <code style="font-size:13px; color:var(--text); display:block; margin:6px 0;">case 1: ... case 1: ... // Error: Duplicate case value</code>
          <span style="font-size:13px; color:var(--text2); display:block;">ఒకే switch లో రెండు కేస్‌లకు సమానమైన విలువ ఉండకూడదు. కంపైలర్ వెంటనే డూప్లికేట్ ఎర్రర్ ఇస్తుంది.</span>
        </div>
      </div>
    </div>

    <!-- SECTION 5 -->
    <div class="section-title"><span class="num">5</span>తరచుగా అడిగే ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div style="display:flex; flex-direction:column; gap:12px; margin-top:16px;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px;">
          <h4 style="color:#10b981; margin:0 0 6px 0; font-size:14.5px;">Q: default కేస్ ఎల్లప్పుడూ చివరనే ఉండాలా?</h4>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.6;">
            సింటాక్స్ పరంగా <code>default</code> కేస్‌ను మొదటి లేదా మధ్యలో కూడా పెట్టవచ్చు. కానీ దాన్ని చివరనే ఉంచడం గ్లోబల్ కోడింగ్ స్టాండర్డ్. ఒకవేళ మధ్యలో పెడితే దానికి కూడా <code>break</code> పెట్టడం మర్చిపోకూడదు.
          </p>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px;">
          <h4 style="color:#10b981; margin:0 0 6px 0; font-size:14.5px;">Q: C లో switch కి స్ట్రింగ్స్ ("add", "exit") ఎందుకు పనిచేయవు?</h4>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.6;">
            C లాంగ్వేజ్ లో స్ట్రింగ్స్ ప్రిమిటివ్ టైప్స్ కావు; అవి కేవలం మెమరీ పాయింటర్లు (<code>char*</code>). రెండు స్ట్రింగ్స్ సమానమా కాదా అని చూడటానికి పాయింటర్ అడ్రస్‌లను కాకుండా అక్షరాలను పోల్చాలి (<code>strcmp</code>). జంప్ టేబుల్ కేవలం సంఖ్యల అడ్రస్‌లతోనే పనిచేస్తుంది కాబట్టి C switch లో స్ట్రింగ్స్ అనుమతించబడవు.
          </p>
        </div>
      </div>
    </div>
  `,

  // -------------------------------------------------------------
  // CHAPTER 7: LOOPS (FOR, WHILE, DO-WHILE)
  // -------------------------------------------------------------
  7: `
    <div class="intro-box">
      కంప్యూటర్ల అసలైన బలం పునరావృత చర్యలను (Repetitive Tasks) క్షణాల్లో కోట్లాది సార్లు అలసట లేకుండా చేయగలగడమే. ఒకే పనిని మళ్లీ మళ్లీ చేయడానికి కోడ్‌ను డూప్లికేట్ చేయకుండా లూప్స్ (Loops) వాడతాం. C లోని మూడు ప్రధాన లూప్స్ — <strong>for</strong>, <strong>while</strong>, మరియు <strong>do-while</strong> ల 4-దశల ఎగ్జిక్యూషన్ లైఫ్‌సైకిల్, ఎంట్రీ vs ఎగ్జిట్ కంట్రోల్ తేడాలు, మరియు ఇన్ఫినిట్ లూప్స్ ప్రమాదాలను లోతుగా నేర్చుకుందాం.
    </div>

    <!-- SECTION 1 -->
    <div class="section-title"><span class="num">1</span>for లూప్ — 4-దశల ఎగ్జిక్యూషన్ లైఫ్‌సైకిల్</div>
    <div class="section-body">
      <p>
        ఇటరేషన్ల సంఖ్య ముందే ఖచ్చితంగా తెలిసినప్పుడు (ఉదాహరణకు 1 నుండి 100 వరకు సంఖ్యలు లేదా అరే సైజ్) <strong>for లూప్</strong> అత్యంత సౌకర్యవంతమైన సాధనం.
      </p>

      <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px; margin:16px 0;">
        <h4 style="color:#10b981; margin:0 0 10px 0; font-size:15px; font-weight:700;">🔄 for లూప్ యొక్క 4-దశల చక్రం:</h4>
        <ol style="margin:0; padding-left:20px; font-size:13.5px; color:var(--text); line-height:1.8;">
          <li><strong>ఇనీషియలైజేషన్ (Initialization):</strong> లూప్ ప్రారంభంలో <em>ఒక్కసారి మాత్రమే</em> రన్ అవుతుంది (ఉదా: <code>int i = 0</code>).</li>
          <li><strong>కండిషన్ చెక్ (Condition Test):</strong> ప్రతి ఇటరేషన్‌కు ముందు పరీక్షించబడుతుంది (<code>i &lt; 5</code>). నిజమైతే లోపలికి వెళ్తుంది; అబద్ధమైతే లూప్ ముగుస్తుంది.</li>
          <li><strong>బాడీ ఎగ్జిక్యూషన్ (Body Execution):</strong> లూప్ కర్లీ బ్రేసెస్ లోపల ఉన్న స్టేట్‌మెంట్లు రన్ అవుతాయి.</li>
          <li><strong>అప్‌డేట్ / ఇంక్రిమెంట్ (Update Step):</strong> బాడీ పూర్తయిన వెంటనే వేరియబుల్ అప్‌డేట్ అవుతుంది (<code>i++</code>). వెంటనే మళ్లీ స్టెప్ 2 కి వెళ్తుంది.</li>
        </ol>
      </div>

      <div class="code-block" style="margin:16px 0;">
        <div class="code-block-header">
          <span class="lang-tag">C — for loop execution</span>
          <a class="try-btn" href="/online-c-compiler.html">⚡ Try in C Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main(void) {
    int sum = 0;
    // 1 నుండి 10 వరకు సహజ సంఖ్యల మొత్తం లెక్కించడం
    for (int i = 1; i &lt;= 10; i++) {
        sum += i;
    }
    printf("1 నుండి 10 సంఖ్యల మొత్తం = %d\\n", sum);
    return 0;
}</code></pre>
      </div>
    </div>

    <!-- SECTION 2 -->
    <div class="section-title"><span class="num">2</span>while లూప్ — ఈవెంట్-డ్రివెన్ & అన్‌నోన్ ఇటరేషన్లు</div>
    <div class="section-body">
      <p>
        ఒక పని ఎన్నిసార్లు జరగాలో ముందే తెలియనప్పుడు, ఒక నిర్దిష్ట పరిస్థితి మారేంత వరకు (Event-driven condition) రన్ చేయడానికి <strong>while లూప్</strong> వాడతాం.
      </p>
      <p style="font-size:13.5px; color:var(--text2); line-height:1.6;">
        ఇది <strong>ఎంట్రీ-కంట్రోల్డ్ లూప్ (Entry-Controlled Loop)</strong>. అంటే లూప్ లోపలికి ప్రవేశించే ముందే కండిషన్ చెక్ అవుతుంది. ప్రారంభంలోనే కండిషన్ అబద్ధమైతే (False), లూప్ బాడీ <strong>జీరో సార్లు (ఒక్కసారి కూడా రన్ అవ్వదు)</strong>.
      </p>

      <div class="code-block" style="margin:16px 0;">
        <div class="code-block-header">
          <span class="lang-tag">C — while loop (Reversing a Number)</span>
          <a class="try-btn" href="/online-c-compiler.html">⚡ Try in C Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main(void) {
    int num = 12345;
    int reversed = 0;

    while (num != 0) {
        int remainder = num % 10;
        reversed = reversed * 10 + remainder;
        num /= 10; // వేరియబుల్‌ను తగ్గించడం — ఇది లేకపోతే ఇన్ఫినిట్ లూప్ అవుతుంది!
    }

    printf("తిరగేసిన సంఖ్య (Reversed): %d\\n", reversed);
    return 0;
}</code></pre>
      </div>
    </div>

    <!-- SECTION 3 -->
    <div class="section-title"><span class="num">3</span>do-while లూప్ — ఎగ్జిట్-కంట్రోల్డ్ గ్యారెంటీ</div>
    <div class="section-body">
      <p>
        కండిషన్ మొదట్లోనే తప్పుగా ఉన్నప్పటికీ, కోడ్ బ్లాక్ <strong>కనీసం ఒక్కసారైనా (At least once)</strong> ఖచ్చితంగా రన్ కావాల్సిన పరిస్థితులలో <strong>do-while లూప్</strong> వాడతాం.
      </p>
      <p style="font-size:13.5px; color:var(--text2); line-height:1.6;">
        ఇది <strong>ఎగ్జిట్-కంట్రోల్డ్ లూప్ (Exit-Controlled Loop)</strong>. కోడ్ రన్ అయిన తర్వాత మాత్రమే చివరలో కండిషన్ చెక్ చేయబడుతుంది.
      </p>

      <div class="code-block" style="margin:16px 0;">
        <div class="code-block-header">
          <span class="lang-tag">C — do-while menu repetition</span>
          <a class="try-btn" href="/online-c-compiler.html">⚡ Try in C Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main(void) {
    int choice;
    do {
        printf("\\n--- బ్యాంకింగ్ మెనూ ---\\n");
        printf("1. బ్యాలెన్స్ తనిఖీ\\n");
        printf("2. నిష్క్రమణ (Exit)\\n");
        printf("మీ ఎంపిక: ");
        scanf("%d", &choice);

        if (choice == 1) {
            printf("మీ బ్యాలెన్స్: ₹25,000\\n");
        }
    } while (choice != 2); // గమనిక: do-while చివర సెమికోలన్ తప్పనిసరి!

    printf("ధన్యవాదాలు! ప్రోగ్రామ్ ముగిసింది.\\n");
    return 0;
}</code></pre>
      </div>
    </div>

    <!-- SECTION 4 -->
    <div class="section-title"><span class="num">4</span>ఇన్ఫినిట్ లూప్స్ & CPU హ్యాంగ్ ట్రాప్</div>
    <div class="section-body">
      <p>
        ఒక లూప్ యొక్క కండిషన్ ఎప్పటికీ FALSE కాకపోతే, ఆ లూప్ అనంతంగా రన్ అవుతూ CPU వినియోగాన్ని 100% కి చేర్చి ప్రోగ్రామ్‌ను స్తంభింపజేస్తుంది (Freeze/Hang).
      </p>

      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:16px; margin:16px 0;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px;">
          <h4 style="color:#ef4444; margin:0 0 6px 0; font-size:14px;">ప్రమాదవశాత్తు ఇన్ఫినిట్ లూప్:</h4>
          <code style="font-size:12.5px; color:var(--text); display:block; background:var(--bg3); padding:8px; border-radius:4px;">int i = 0;<br>while (i &lt; 10) {<br>&nbsp;&nbsp;printf("%d", i);<br>&nbsp;&nbsp;// i++ రాయడం మర్చిపోయారు!<br>}</code>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px;">
          <h4 style="color:#10b981; margin:0 0 6px 0; font-size:14px;">ఉద్దేశపూర్వక సర్వర్/ఎంబెడెడ్ లూప్:</h4>
          <code style="font-size:12.5px; color:var(--text); display:block; background:var(--bg3); padding:8px; border-radius:4px;">while (1) {<br>&nbsp;&nbsp;// ఎంబెడెడ్ మైక్రోకంట్రోలర్ మెయిన్ లూప్<br>&nbsp;&nbsp;poll_hardware_events();<br>}</code>
        </div>
      </div>
    </div>

    <!-- SECTION 5 -->
    <div class="section-title"><span class="num">5</span>బిగినర్స్ చేసే ఘోరమైన తప్పులు (Beginner Pitfalls)</div>
    <div class="section-body">
      <div style="display:flex; flex-direction:column; gap:12px; margin:16px 0;">
        <div style="background:rgba(239, 68, 68, 0.08); border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px 18px;">
          <div style="font-weight:700; color:#ef4444; font-size:14px;">❌ 1. for లేదా while లూప్ హెడర్ చివర సెమికోలన్ పెట్టడం:</div>
          <code style="font-size:13px; color:var(--text); display:block; margin:6px 0;">for (int i = 0; i &lt; 10; i++); { printf("%d", i); }</code>
          <span style="font-size:13px; color:var(--text2); display:block;">సెమికోలన్ పెట్టడం వల్ల ఖాళీ లూప్ 10 సార్లు రన్ అయిపోతుంది. లూప్ ముగిసిన తర్వాత మాత్రమే ప్రింట్ స్టేట్‌మెంట్ ఒకేసారి రన్ అవుతుంది!</span>
        </div>

        <div style="background:rgba(239, 68, 68, 0.08); border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px 18px;">
          <div style="font-weight:700; color:#ef4444; font-size:14px;">❌ 2. Off-By-One Error (ఒకటి ఎక్కువ లేదా తక్కువ తిరగడం):</div>
          <code style="font-size:13px; color:var(--text); display:block; margin:6px 0;">for (int i = 0; i &lt;= 10; i++) // 10 సార్లు అనుకుని 11 సార్లు తిరుగుతుంది</code>
          <span style="font-size:13px; color:var(--text2); display:block;">ఇండెక్స్ 0 నుండి మొదలైనప్పుడు <code>&lt; 10</code> రాస్తే 10 సార్లు తిరుగుతుంది. పొరపాటున <code>&lt;= 10</code> రాస్తే 11 సార్లు తిరిగి అర్రే బౌండరీని దాటిపోయే ప్రమాదం ఉంది.</span>
        </div>
      </div>
    </div>

    <!-- SECTION 6 -->
    <div class="section-title"><span class="num">6</span>తరచుగా అడిగే ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div style="display:flex; flex-direction:column; gap:12px; margin-top:16px;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px;">
          <h4 style="color:#10b981; margin:0 0 6px 0; font-size:14.5px;">Q: for (int i = 0; ...) లో డిక్లేర్ చేసిన 'i' వేరియబుల్ లూప్ బయట ప్రింట్ అవుతుందా?</h4>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.6;">
            ప్రింట్ కాదు! ఆధునిక C (C99/C11) ప్రమాణాల ప్రకారం <code>for</code> లూప్ హెడర్‌లో డిక్లేర్ చేసిన వేరియబుల్ యొక్క లైఫ్‌టైమ్ కేవలం ఆ లూప్ బాడీ వరకే పరిమితం (Block Scope). లూప్ బయట <code>printf("%d", i)</code> అని రాస్తే "undeclared identifier" ఎర్రర్ వస్తుంది.
          </p>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px;">
          <h4 style="color:#10b981; margin:0 0 6px 0; font-size:14.5px;">Q: for(;;) మరియు while(1) లలో ఏది వేగవంతమైనది?</h4>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.6;">
            రెండూ సమానమైన వేగంతో పనిచేస్తాయి. ఆధునిక GCC/Clang కంపైలర్లు రెండింటికీ ఒకే విధమైన అన్‌కండిషనల్ అసెంబ్లీ జంప్ ఇన్‌స్ట్రక్షన్ (<code>jmp</code>) ను ఉత్పత్తి చేస్తాయి.
          </p>
        </div>
      </div>
    </div>
  `,

  // -------------------------------------------------------------
  // CHAPTER 8: BREAK, CONTINUE, NESTED LOOPS & PATTERNS
  // -------------------------------------------------------------
  8: `
    <div class="intro-box">
      లూప్స్ ఎగ్జిక్యూట్ అవుతున్నప్పుడు సాధారణ ఫ్లోను నియంత్రించడానికి, అవసరమైన సమాచారం దొరకగానే లూప్ నుండి వెంటనే బయటకు రావడానికి లేదా కొన్ని అనవసరమైన ఇటరేషన్లను దాటవేయడానికి <strong>break</strong> మరియు <strong>continue</strong> కీవర్డ్లు తప్పనిసరి. 2D మ్యాట్రిక్స్ ప్రాసెసింగ్ మరియు ఇంటర్వ్యూలలో ఎక్కువగా అడిగే <strong>నెస్టెడ్ లూప్స్ (Nested Loops)</strong> మరియు ప్యాటర్న్లను ఈ అధ్యాయంలో లోతుగా తెలుసుకుందాం.
    </div>

    <!-- SECTION 1 -->
    <div class="section-title"><span class="num">1</span>break కీవర్డ్ — అత్యవసర లూప్ ఎగ్జిట్ (Early Exit)</div>
    <div class="section-body">
      <p>
        లూప్ ఎన్నిసార్లు తిరగాలని నిర్ణయించబడిందో ఆ లక్ష్యం ఇంకా పూర్తికాకముందే, ఒక నిర్దిష్ట పరిస్థితి రాగానే ఆ లూప్‌ను తక్షణమే శాశ్వతంగా ముగించి బయటకు రావడానికి <strong>break</strong> ఉపయోగపడుతుంది.
      </p>

      <div class="code-block" style="margin:16px 0;">
        <div class="code-block-header">
          <span class="lang-tag">C — Linear Search with break optimization</span>
          <a class="try-btn" href="/online-c-compiler.html">⚡ Try in C Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main(void) {
    int numbers[7] = {12, 45, 78, 23, 56, 89, 90};
    int target = 23;
    int foundAt = -1;

    for (int i = 0; i &lt; 7; i++) {
        if (numbers[i] == target) {
            foundAt = i;
            break; // ఎలిమెంట్ దొరికింది! మిగిలిన ఇటరేషన్లు అనవసరం కాబట్టి లూప్ ఆపేస్తున్నాం
        }
    }

    if (foundAt != -1) {
        printf("లక్ష్యం %d ఇండెక్స్ %d వద్ద లభించింది!\\n", target, foundAt);
    }
    return 0;
}</code></pre>
      </div>
      <p style="font-size:13px; color:var(--text2); margin:8px 0 0 0;">
        💡 <code>break</code> లేకపోతే టార్గెట్ మొదట్లోనే దొరికినా అరే చివరి వరకు అనవసరంగా లూప్ రన్ అవుతూ విలువైన CPU సమయాన్ని వృధా చేస్తుంది.
      </p>
    </div>

    <!-- SECTION 2 -->
    <div class="section-title"><span class="num">2</span>continue కీవర్డ్ — ప్రస్తుత ఇటరేషన్ స్కిప్ చేయడం</div>
    <div class="section-body">
      <p>
        లూప్‌ను పూర్తిగా ఆపేయకుండా, కేవలం ఆ <em>ప్రస్తుత ఒక్క ఇటరేషన్‌లోని తర్వాతి లైన్లను మాత్రమే స్కిప్ చేసి</em> వెంటనే తర్వాతి రౌండ్‌కు దూకడానికి <strong>continue</strong> వాడతాం.
      </p>

      <div class="code-block" style="margin:16px 0;">
        <div class="code-block-header">
          <span class="lang-tag">C — continue (Skip Multiples of 3)</span>
          <a class="try-btn" href="/online-c-compiler.html">⚡ Try in C Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main(void) {
    // 1 నుండి 10 వరకు ప్రింట్ చేస్తూ 3 యొక్క గుణిజాలను స్కిప్ చేయడం
    for (int i = 1; i &lt;= 10; i++) {
        if (i % 3 == 0) {
            continue; // ఈ రౌండ్ మిగిలిన భాగం స్కిప్ అయి i++ కి వెళ్తుంది
        }
        printf("%d ", i);
    }
    printf("\\n");
    return 0;
}</code></pre>
      </div>

      <div style="background:rgba(245, 158, 11, 0.08); border-left:4px solid #f59e0b; border-radius:0 8px 8px 0; padding:14px 18px; margin:16px 0;">
        <strong style="color:#d97706; font-size:14px;">⚠️ while లూప్‌లో continue వాడేటప్పుడు అత్యంత జాగ్రత్త!</strong>
        <p style="font-size:13px; color:var(--text); margin:6px 0 0 0; line-height:1.6;">
          <code>for</code> లూప్‌లో <code>continue</code> ఆటోమేటిక్‌గా <code>i++</code> ఇంక్రిమెంట్‌కు వెళ్తుంది. కానీ <code>while</code> లూప్‌లో ఇంక్రిమెంట్ బాడీ చివర ఉంటే, <code>continue</code> వల్ల ఆ ఇంక్రిమెంట్ లైన్ ఎప్పటికీ రన్ కాక <strong>ప్రోగ్రామ్ ఇన్ఫినిట్ లూప్‌లో ఇరుక్కుపోతుంది</strong>! కాబట్టి <code>continue</code> కి ముందే ఇంక్రిమెంట్ చేయాలి.
        </p>
      </div>
    </div>

    <!-- SECTION 3 -->
    <div class="section-title"><span class="num">3</span>నెస్టెడ్ లూప్స్ (Nested Loops) & స్టార్ ప్యాటర్న్స్</div>
    <div class="section-body">
      <p>
        ఒక లూప్ లోపల మరొక లూప్ ఉండడాన్ని <strong>నెస్టెడ్ లూప్ (Nested Loop)</strong> అంటారు. బయటి లూప్ (Outer Loop) అడ్డు వరుసలను (Rows) నియంత్రిస్తే, లోపలి లూప్ (Inner Loop) నిలువు వరుసలను (Columns) నియంత్రిస్తుంది.
      </p>

      <div class="code-block" style="margin:16px 0;">
        <div class="code-block-header">
          <span class="lang-tag">C — Right Angled Star Pyramid</span>
          <a class="try-btn" href="/online-c-compiler.html">⚡ Try in C Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main(void) {
    int rows = 5;

    for (int r = 1; r &lt;= rows; r++) {
        // లోపలి లూప్: ప్రతి వరుసలో నక్షత్రాలను ముద్రించడం
        for (int c = 1; c &lt;= r; c++) {
            printf("* ");
        }
        printf("\\n"); // వరుస పూర్తయిన తర్వాత కొత్త లైన్‌కు వెళ్లడం
    }
    return 0;
}</code></pre>
      </div>
      <p style="font-size:13px; color:var(--text2); margin:8px 0 0 0;">
        💡 నెస్టెడ్ లూప్స్ యొక్క టైమ్ కాంప్లెక్సిటీ సాధారణంగా $O(N \times M)$ లేదా $O(N^2)$ అవుతుంది. కాబట్టి 3 లేదా 4 స్థాయిల కంటే ఎక్కువ నెస్టెడ్ లూప్స్ రాయడం పెర్ఫార్మెన్స్‌కు హానికరం.
      </p>
    </div>

    <!-- SECTION 4 -->
    <div class="section-title"><span class="num">4</span>goto వివాదం: ప్రొఫెషనల్ కోడింగ్‌లో అనుమతించబడే సందర్భం</div>
    <div class="section-body">
      <p>
        ప్రముఖ కంప్యూటర్ శాస్త్రవేత్త Edsger Dijkstra తన ప్రసిద్ధ పత్రం <em>"Go To Statement Considered Harmful"</em> లో <code>goto</code> ను నిషేధించాలని పేర్కొన్నారు. కారణం అది కోడ్‌ను అర్థం చేసుకోవడం అసాధ్యమైన స్పఘెట్టి కోడ్ (Spaghetti Code) గా మారుస్తుంది.
      </p>

      <div style="background:var(--bg2); border:1px solid #10b981; border-radius:8px; padding:16px; margin:16px 0;">
        <h4 style="color:#10b981; margin:0 0 8px 0; font-size:14.5px;">🐧 Linux Kernel ఎక్సెప్షన్:</h4>
        <p style="font-size:13px; color:var(--text); margin:0; line-height:1.6;">
          లైనక్స్ కర్నల్ సోర్స్ కోడ్‌లో ఎర్రర్ సంభవించినప్పుడు కేటాయించిన మెమరీ మరియు ఫైల్ డిస్క్రిప్టర్లను రివర్స్ ఆర్డర్‌లో క్లీనప్ చేయడానికి (<strong>Centralized Error Unwinding</strong>) మాత్రమే <code>goto out_error;</code> ను అనుమతిస్తారు. మిగిలిన సాధారణ ప్రోగ్రామింగ్‌లో <code>goto</code> వాడరాదు.
        </p>
      </div>
    </div>

    <!-- SECTION 5 -->
    <div class="section-title"><span class="num">5</span>బిగినర్స్ చేసే ఘోరమైన తప్పులు (Beginner Pitfalls)</div>
    <div class="section-body">
      <div style="display:flex; flex-direction:column; gap:12px; margin:16px 0;">
        <div style="background:rgba(239, 68, 68, 0.08); border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px 18px;">
          <div style="font-weight:700; color:#ef4444; font-size:14px;">❌ 1. break అన్ని నెస్టెడ్ లూప్స్ నుండి బయటకు తెస్తుందని భావించడం:</div>
          <span style="font-size:13px; color:var(--text2); display:block; margin-top:4px;"><code>break</code> కేవలం తాను ఉన్న <em>అత్యంత సమీపంలోని ఇన్నర్ లూప్‌ను మాత్రమే</em> రద్దు చేస్తుంది. ఔటర్ లూప్ సాధారణంగానే కొనసాగుతుంది. అన్నింటి నుండి బయటకు రావాలంటే బూలియన్ ఫ్లాగ్ లేదా <code>return</code> వాడాలి.</span>
        </div>

        <div style="background:rgba(239, 68, 68, 0.08); border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px 18px;">
          <div style="font-weight:700; color:#ef4444; font-size:14px;">❌ 2. నెస్టెడ్ లూప్స్ లో వేరియబుల్ షాడోయింగ్:</div>
          <code style="font-size:13px; color:var(--text); display:block; margin:6px 0;">for (int i = 0; ... ) { for (int i = 0; ... ) } // గందరగోళం</code>
          <span style="font-size:13px; color:var(--text2); display:block;">ఔటర్ మరియు ఇన్నర్ లూప్‌లకు ఒకే వేరియబుల్ పేరు వాడకూడదు. ఎల్లప్పుడూ <code>i, j</code> లేదా <code>r, c</code> (Row, Column) అని వేర్వేరు పేర్లు వాడాలి.</span>
        </div>
      </div>
    </div>

    <!-- SECTION 6 -->
    <div class="section-title"><span class="num">6</span>తరచుగా అడిగే ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div style="display:flex; flex-direction:column; gap:12px; margin-top:16px;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px;">
          <h4 style="color:#10b981; margin:0 0 6px 0; font-size:14.5px;">Q: break మరియు exit(0) ల మధ్య ముఖ్యమైన తేడా ఏమిటి?</h4>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.6;">
            <code>break</code> కేవలం ఆ లూప్ లేదా switch నుండి మాత్రమే బయటకు తీసుకువస్తుంది; ఆ తర్వాత ఉన్న మిగిలిన ప్రోగ్రామ్ నడుస్తుంది. కానీ <code>exit(0)</code> మొత్తం ప్రోగ్రామ్‌నే అక్కడికక్కడే ఆపేసి ఆపరేటింగ్ సిస్టమ్‌కి కంట్రోల్‌ను తిరిగి ఇస్తుంది.
          </p>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px;">
          <h4 style="color:#10b981; margin:0 0 6px 0; font-size:14.5px;">Q: నెస్టెడ్ లూప్స్ నుండి ఒకేసారి పూర్తిగా బయటకు రావడానికి ఉత్తమ పద్ధతి ఏమిటి?</h4>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.6;">
            ఒక ఫ్లాగ్ వేరియబుల్ (ఉదా: <code>int found = 1</code>) వాడి ఔటర్ లూప్‌లో కూడా బ్రేక్ చేయడం, లేదా ఆ మొత్తం నెస్టెడ్ లూప్ కోడ్‌ను ఒక ప్రత్యేక ఫంక్షన్‌లో ఉంచి కండిషన్ మ్యాచ్ కాగానే నేరుగా <strong>return</strong> చేయడం ఆధునిక క్లీన్ కోడ్ పద్ధతి.
          </p>
        </div>
      </div>
    </div>
  `
};

// Execute writing out upgraded files for Phase 2 (Lessons 5 to 8)
for (let i = 5; i <= 8; ++i) {
  const lesson = LESSONS.find(l => l.num === i);
  if (!lesson) continue;
  lesson.contentHtml = PHASE2_CONTENTS[i];
  const html = generatePageHtml(lesson);
  fs.writeFileSync(path.join(cDir, lesson.file), html, 'utf8');
  console.log(`✅ Fully enriched Phase 2 Lesson ${i} : ${lesson.file} (${html.length} chars)`);
}

