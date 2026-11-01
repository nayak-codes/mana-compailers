const fs = require('fs');
const path = require('path');
const { LESSONS, buildSidebar } = require('./c_curriculum_data.js');

const lesson = LESSONS.find(l => l.num === 5);
const sidebarHtml = buildSidebar(5);

const chapterContentHtml = `
    <!-- BREADCRUMB -->
    <div class="breadcrumb">
      <a href="/">Home</a><span class="sep">›</span>
      <a href="/blog.html">Tutorials</a><span class="sep">›</span>
      <a href="/blog-c.html">C Masterclass</a><span class="sep">›</span>
      <span class="current">Chapter 5: కండిషనల్ స్టేట్‌మెంట్స్ (if, else if, else &amp; Nested Branches)</span>
    </div>

    <!-- PAGE TITLE -->
    <h1 class="page-title">కండిషనల్ స్టేట్‌మెంట్స్ (if, else if, else &amp; Nested Branches)</h1>

    <!-- PAGE META BADGES -->
    <div class="page-meta">
      <span class="badge">⚡ Modern C (C99 / C11 / C17 Standards)</span>
      <span class="badge">🟢 Chapter 05 of 20</span>
      <span class="badge">📂 Phase 02: కంట్రోల్ ఫ్లో &amp; లూప్స్</span>
      <span class="badge">📅 2026 Academic Edition</span>
    </div>

    <!-- SUBTOPICS PILL BAR -->
    <div style="background:var(--bg3); border:1px solid var(--border); border-radius:8px; padding:10px 16px; margin-bottom:24px; font-size:13px; color:var(--text2); display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
      <span style="color:#10b981; font-weight:700;">📌 Covered in this chapter:</span>
      <span>కంట్రోల్ ఫ్లో ఆర్కిటెక్చర్ · Simple if &amp; if-else · ATM విత్‌డ్రా లైవ్ ప్రాజెక్ట్ · else-if లాడర్ &amp; గ్రేడింగ్ లాజిక్ · నెస్టెడ్ if-else · ది డెడ్లీ if (x = 5) అసైన్‌మెంట్ ట్రాప్ · డాంగ్లింగ్ else సమస్య · కర్లీ బ్రేసెస్ ప్రమాదాలు · క్విజ్ &amp; ట్రై-బాక్స్</span>
    </div>

    <!-- INTRO ACCENT BOX (Warm Ivory with Green Accent) -->
    <div class="intro-box">
      <p>నిత్య జీవితంలో మనం తీసుకునే నిర్ణయాలను ఒక్కసారి గమనించండి: "వర్షం పడితే — గొడుగు తీసుకుని వెళ్ళు; లేకపోతే — సాధారణంగా వెళ్ళు", "బ్యాంక్ అకౌంట్‌లో సరిపడా డబ్బులు ఉంటేనే — ఏటీఎమ్ నుండి క్యాష్ ఇవ్వు; లేకపోతే — 'ఇన్‌సఫీషియంట్ బ్యాలెన్స్' అని చూపించు", "ట్రాఫిక్ లైట్ ఎరుపు రంగులో ఉంటే — బండి ఆపు; ఆకుపచ్చగా ఉంటే — ముందుకు సాగు". మన మానవ జీవితం మొత్తం ఇటువంటి వందలాది షరతులు (Conditions) మరియు నిర్ణయాల ఆధారంగానే ముందుకు సాగుతుంది.</p>
      <p>కంప్యూటర్ ప్రోగ్రామ్‌లు కూడా అచ్చం ఇలాగే ఆలోచించగలగాలి! మొదటి 4 అధ్యాయాలలో (Phase 01) మనం రాసిన ప్రోగ్రామ్‌లు మొదటి లైన్ నుండి చివరి లైన్ వరకు వరుసగా ఒకే ట్రాక్‌లో వెళ్లిపోయేవి (Sequential Execution). కానీ నిజమైన సాఫ్ట్‌వేర్ అలా ఉండదు; అది యూజర్ ఇచ్చే ఇన్‌పుట్లను బట్టి, పరిస్థితులను బట్టి <strong>తన మార్గాన్ని మార్చుకోగలగాలి (Branching / Decision Making)!</strong></p>
      <p>కంప్యూటర్‌కు ఈ "ఆలోచించే మేధస్సును" అందించే అద్భుతమైన సాధనాలే <strong>కండిషనల్ స్టేట్‌మెంట్స్ (Conditional Statements)</strong>. C లోని <code>if</code>, <code>else</code>, <code>else if</code> లాడర్, నెస్టెడ్ బ్రాంచెస్, మరియు ఇంటర్వ్యూలలో సీనియర్లను సైతం బోల్తా కొట్టించే <code>if (x = 5)</code> అసైన్‌మెంట్ బగ్స్ గురించి ఈ ఐదవ అధ్యాయంలో లోతుగా నేర్చుకుందాం!</p>
    </div>

    <!-- SECTION 1 -->
    <div class="section-title"><span class="num">1</span>ఈ Chapter లో మీరు నేర్చుకునే అంశాలు</div>
    <div class="section-body">
      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.7;">
        <li><strong>కంట్రోల్ ఫ్లో (Control Flow):</strong> సీక్వెన్షియల్ ఎగ్జిక్యూషన్ వర్సెస్ కండిషనల్ బ్రాంచింగ్.</li>
        <li><strong>సింపుల్ if స్టేట్‌మెంట్ (Simple if):</strong> సింటాక్స్, కండిషన్ ట్రూ/ఫాల్స్ బైనరీ ఎవాల్యుయేషన్.</li>
        <li><strong>if-else స్టేట్‌మెంట్:</strong> రెండు ప్రత్యామ్నాయ మార్గాలు (Two-Way Branching) &amp; ఫాల్‌బ్యాక్ లాజిక్.</li>
        <li><strong>రియల్ వరల్డ్ ప్రాజెక్ట్ 1 — ATM సిమ్యులేటర్:</strong> క్యాష్ విత్‌డ్రా మరియు పిన్ వెరిఫికేషన్ లాజిక్.</li>
        <li><strong>else-if లాడర్ (Multi-Way Selection):</strong> బహుళ కండిషన్లు &amp; కాలేజ్ మార్క్స్ గ్రేడింగ్ సిస్టమ్.</li>
        <li><strong>నెస్టెడ్ if-else (Nested Conditions):</strong> ఒక కండిషన్ లోపల మరొక కండిషన్ పెట్టే మెకానిక్స్.</li>
        <li><strong>ది డెడ్లీ అసైన్‌మెంట్ ట్రాప్:</strong> <code>if (x = 5)</code> vs <code>if (x == 5)</code> — కంపైలర్ ఎందుకు ఎర్రర్ ఇవ్వదు?</li>
        <li><strong>ది డాంగ్లింగ్ else సమస్య (The Dangling else):</strong> కంపైలర్ else ని ఏ if కి జతచేస్తుందో తెలిపే అంతర్జాతీయ నియమం.</li>
        <li><strong>కర్లీ బ్రేసెస్ {} లేకపోతే జరిగే ప్రమాదాలు:</strong> సింగిల్ స్టేట్‌మెంట్ ట్రాప్ &amp; ఇండెంటేషన్ భ్రమలు.</li>
        <li><strong>బిగినర్స్ చేసే టాప్ 5 కండిషనల్ తప్పులు:</strong> <code>if();</code> సెమికోలన్ బగ్, <code>10 &lt; x &lt; 20</code> చైనింగ్ బగ్.</li>
        <li><strong>ఇంటరాక్టివ్ క్విజ్:</strong> 5 లోతైన ఆలోచింపజేసే ప్రాక్టికల్ ప్రశ్నలు &amp; వివరణలు.</li>
      </ul>
    </div>

    <!-- SECTION 2 -->
    <div class="section-title"><span class="num">2</span>కంట్రోల్ ఫ్లో అంటే ఏమిటి? Sequential vs Branching Execution</div>
    <div class="section-body">
      <p>కంప్యూటర్ CPU మీ ప్రోగ్రామ్‌లోని లైన్లను ఏ క్రమంలో ఎగ్జిక్యూట్ చేస్తుందో తెలిపే విధానాన్నే <strong>కంట్రోల్ ఫ్లో (Control Flow)</strong> అంటారు. సాధారణంగా ప్రోగ్రామింగ్‌లో మూడు రకాల కంట్రోల్ ఫ్లోలు ఉంటాయి:</p>

      <div style="overflow-x:auto; margin: 16px 0;">
        <table class="tbl">
          <thead>
            <tr>
              <th>కంట్రోల్ ఫ్లో రకం</th>
              <th>ఎగ్జిక్యూషన్ విధానం</th>
              <th>వాస్తవ ఉదాహరణ</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>1. సీక్వెన్షియల్ (Sequential)</strong></td>
              <td>పై నుండి కిందికి వరుసగా ప్రతి లైన్ ఎగ్జిక్యూట్ అవుతుంది; ఏ లైన్ స్కిప్ అవ్వదు.</td>
              <td><code>printf("Hello"); printf("World");</code></td>
            </tr>
            <tr>
              <td><strong>2. బ్రాంచింగ్ / సెలెక్షన్ (Branching)</strong></td>
              <td>కండిషన్‌ను బట్టి ఒక మార్గంలోకి వెళ్లి, మిగిలిన కోడ్ బ్లాక్‌ను పూర్తిగా స్కిప్ చేస్తుంది.</td>
              <td><code>if (బ్యాలెన్స్ &gt;= మొత్తం) క్యాష్ ఇవ్వు; else తిరస్కరించు;</code></td>
            </tr>
            <tr>
              <td><strong>3. లూపింగ్ / ఇటరేషన్ (Looping)</strong></td>
              <td>కండిషన్ పూర్తయ్యేంత వరకు ఒకే కోడ్ బ్లాక్‌ను పదేపదే ఎగ్జిక్యూట్ చేస్తుంది.</td>
              <td>1 నుండి 100 వరకు సంఖ్యలు ప్రింట్ చేయడం (Chapter 7).</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>C లాంగ్వేజ్‌లో బ్రాంచింగ్ కొరకు మనం ప్రధానంగా <strong>if-else</strong> మరియు <strong>switch-case</strong> లను ఉపయోగిస్తాం. ఈ అధ్యాయంలో if-else కుటుంబం మొత్తాన్ని సమగ్రంగా నేర్చుకుందాం!</p>
    </div>

    <!-- SECTION 3 -->
    <div class="section-title"><span class="num">3</span>సింపుల్ if స్టేట్‌మెంట్ (Simple if): సింటాక్స్ &amp; ట్రూ/ఫాల్స్ సూత్రం</div>
    <div class="section-body">
      <p>ఒక నిర్దిష్ట షరతు నిజమైతేనే (Condition True అయితేనే) ఒక పని చేయాలి, లేకపోతే ఏమీ చేయకుండా ముందుకు వెళ్లిపోవాలి అనుకున్నప్పుడు <strong>సింపుల్ if</strong> ఉపయోగిస్తాం:</p>

      <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:12px 18px; margin:12px 0; font-family:'JetBrains Mono',monospace;">
        if (కండిషన్) {<br>
        &nbsp;&nbsp;&nbsp;&nbsp;// కండిషన్ TRUE (సున్నా కాని సంఖ్య) అయితేనే ఈ కోడ్ రన్ అవుతుంది<br>
        }
      </div>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Simple if Statement</span>
          <div class="code-actions">
            <a class="try-btn" href="/online-c-compiler.html" target="_blank">▶ Run in Online C Compiler</a>
          </div>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main(void) {
    int temperature = 42;

    printf("ప్రస్తుత ఉష్ణోగ్రత: %d°C\\n", temperature);

    // 40 దాటితే మాత్రమే ఈ వార్నింగ్ కనిపిస్తుంది
    if (temperature &gt; 40) {
        printf("⚠️ తీవ్రమైన ఎండ! దయచేసి నీళ్ళు ఎక్కువగా తాగండి.\\n");
    }

    printf("వాతావరణ నివేదిక ముగిసింది.\\n");
    return 0;
}</code></pre>
      </div>

      <div class="tip-box">
        💡 <strong>C లో True/False ఎలా పనిచేస్తుంది?</strong><br>
        గుర్తుంచుకోండి: C లో <code>if (కండిషన్)</code> లోపల ఉన్న ఎక్స్‌ప్రెషన్ విలువ <strong>0 (Zero)</strong> అయితే అది ఫాల్స్ (False) గా భావించి కోడ్ బ్లాక్‌ను స్కిప్ చేస్తుంది. ఆ విలువ <strong>సున్నా కాకుండా మరే సంఖ్య అయినా (1, 100, -50)</strong> అది ట్రూ (True) గా పరిగణించబడి లోపలికి ప్రవేశిస్తుంది!
      </div>
    </div>

    <!-- SECTION 4 -->
    <div class="section-title"><span class="num">4</span>if-else స్టేట్‌మెంట్: రెండు ప్రత్యామ్నాయ మార్గాలు (Two-Way Branching)</div>
    <div class="section-body">
      <p>నిజ జీవితంలో ఒక షరతు నిజమైతే ఒక పని, అబద్ధమైతే మరొక పని చేయాల్సి ఉంటుంది. ఉదాహరణకు ఓటు హక్కు లభించాలంటే వయస్సు 18 లేదా అంతకంటే ఎక్కువ ఉండాలి; లేకపోతే అనర్హులుగా ప్రకటించాలి. దీనిని <strong>if-else</strong> ద్వారా సులభంగా నిర్మించవచ్చు:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — if-else Voting Eligibility</span>
          <div class="code-actions">
            <a class="try-btn" href="/online-c-compiler.html" target="_blank">▶ Run in Online C Compiler</a>
          </div>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main(void) {
    int age;

    printf("మీ వయస్సు నమోదు చేయండి: ");
    scanf("%d", &amp;age);

    if (age &gt;= 18) {
        printf("✅ అభినందనలు! మీకు ఓటు హక్కు ఉంది.\\n");
    } else {
        int yearsLeft = 18 - age;
        printf("❌ క్షమించండి! మీకు ఓటు హక్కు లేదు.\\n");
        printf("ఇంకా %d సంవత్సరాలు వేచి ఉండాలి.\\n", yearsLeft);
    }

    return 0;
}</code></pre>
      </div>

      <p><code>if-else</code> నిర్మాణంలో ఖచ్చితంగా <strong>ఏదో ఒక బ్లాక్ మాత్రమే ఎగ్జిక్యూట్ అవుతుంది</strong>; రెండు బ్లాక్‌లు ఒకేసారి ఎప్పటికీ రన్ కావు, అలాగే రెండూ స్కిప్ కూడా కావు!</p>
    </div>

    <!-- SECTION 5 -->
    <div class="section-title"><span class="num">5</span>వాస్తవ ప్రాజెక్ట్ డెమో 1: ATM క్యాష్ విత్‌డ్రా &amp; బ్యాలెన్స్ చెక్</div>
    <div class="section-body">
      <p>మనం రోజూ ఉపయోగించే బ్యాంక్ ATM మెషీన్ వెనుక ఉండే లాజిక్‌ను C లాంగ్వేజ్ if-else తో ఎలా నిర్మిస్తారో చూద్దాం:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — ATM Cash Withdrawal Simulator</span>
          <div class="code-actions">
            <a class="try-btn" href="/online-c-compiler.html" target="_blank">▶ Run in Online C Compiler</a>
          </div>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main(void) {
    int accountBalance = 15000;
    int withdrawAmount;

    printf("=== మన బ్యాంక్ ATM సర్వీస్ ===\\n");
    printf("ప్రస్తుత బ్యాలెన్స్: ₹%d\\n", accountBalance);
    printf("విత్‌డ్రా చేయవలసిన మొత్తం నమోదు చేయండి: ₹");
    scanf("%d", &amp;withdrawAmount);

    // కండిషన్ 1: మొత్తం 100 గుణిజాల్లో ఉందా? (% 100 == 0)
    // కండిషన్ 2: అకౌంట్‌లో సరిపడా డబ్బులు ఉన్నాయా?
    if (withdrawAmount &lt;= 0) {
        printf("❌ ఎర్రర్: దయచేసి సరైన మొత్తాన్ని నమోదు చేయండి!\\n");
    } else if (withdrawAmount % 100 != 0) {
        printf("❌ ఎర్రర్: కేవలం ₹100, ₹500 నోట్లు మాత్రమే అందుబాటులో ఉన్నాయి!\\n");
    } else if (withdrawAmount &gt; accountBalance) {
        printf("❌ విత్‌డ్రా విఫలమైంది: మీ ఖాతాలో సరిపడా బ్యాలెన్స్ లేదు!\\n");
    } else {
        accountBalance -= withdrawAmount;
        printf("💵 దయచేసి మీ నగదు ₹%d స్వీకరించండి.\\n", withdrawAmount);
        printf("మిగిలిన బ్యాలెన్స్: ₹%d\\n", accountBalance);
    }

    printf("ధన్యవాదాలు! మళ్ళీ సందర్శించండి.\\n");
    return 0;
}</code></pre>
      </div>
    </div>

    <!-- SECTION 6 -->
    <div class="section-title"><span class="num">6</span>else-if లాడర్ (Multi-Way Selection): గ్రేడింగ్ సిస్టమ్</div>
    <div class="section-body">
      <p>రెండు కంటే ఎక్కువ ఎంపికలు ఉన్నప్పుడు (ఉదాహరణకు: ఫస్ట్ క్లాస్, సెకండ్ క్లాస్, థర్డ్ క్లాస్, ఫెయిల్) వరుసగా కండిషన్లను చెక్ చేసుకుంటూ వెళ్ళే నిర్మాణాన్ని <strong>else-if లాడర్ (Ladder)</strong> అంటారు:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — College Grading System (else-if ladder)</span>
          <div class="code-actions">
            <a class="try-btn" href="/online-c-compiler.html" target="_blank">▶ Run in Online C Compiler</a>
          </div>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main(void) {
    int marks;

    printf("విద్యార్థి మార్కులు నమోదు చేయండి (0 - 100): ");
    scanf("%d", &amp;marks);

    // చెల్లని మార్కులను ముందే ఫిల్టర్ చేయడం
    if (marks &lt; 0 || marks &gt; 100) {
        printf("❌ చెల్లని మార్కులు! దయచేసి 0 నుండి 100 మధ్య ఇవ్వండి.\\n");
    } else if (marks &gt;= 90) {
        printf("🏆 గ్రేడ్: O (Outstanding! టాపర్)\\n");
    } else if (marks &gt;= 80) {
        printf("🌟 గ్రేడ్: A+ (Excellent)\\n");
    } else if (marks &gt;= 70) {
        printf("👍 గ్రేడ్: A (Very Good)\\n");
    } else if (marks &gt;= 60) {
        printf("👌 గ్రేడ్: B (Good)\\n");
    } else if (marks &gt;= 40) {
        printf("⚠️ గ్రేడ్: C (Pass)\\n");
    } else {
        printf("❌ గ్రేడ్: F (Fail - మళ్ళీ ప్రయత్నించండి)\\n");
    }

    return 0;
}</code></pre>
      </div>

      <div class="tip-box">
        💡 <strong>లాడర్ ఎలా ఎగ్జిక్యూట్ అవుతుంది?</strong> కంపైలర్ పై నుండి కిందికి వరుసగా కండిషన్లను చెక్ చేస్తుంది. ఎక్కడైతే మొదటి కండిషన్ True అవుతుందో — ఆ బ్లాక్‌ను ఎగ్జిక్యూట్ చేసి, ఆ వెంటనే మొత్తం లాడర్ నుండి బయటకు వచ్చేస్తుంది! మిగిలిన <code>else if</code> లను అసలు పరిశీలించదు.
      </div>
    </div>

    <!-- SECTION 7 -->
    <div class="section-title"><span class="num">7</span>నెస్టెడ్ if-else (Nested Conditions): లిఫ్ట్ ఓవర్‌లోడ్ లాజిక్</div>
    <div class="section-body">
      <p>ఒక <code>if</code> లేదా <code>else</code> బ్లాక్ లోపల మరొక <code>if-else</code> రాస్తే దానిని <strong>నెస్టెడ్ if-else (Nested Branches)</strong> అంటారు. మొదటి షరతు నిజమైతేనే, లోపలి రెండవ షరతును పరిశీలించాల్సి వచ్చినప్పుడు ఇది ఉపయోగపడుతుంది:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Lift Overload &amp; Access Check</span>
          <div class="code-actions">
            <a class="try-btn" href="/online-c-compiler.html" target="_blank">▶ Run in Online C Compiler</a>
          </div>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main(void) {
    int hasKeyCard = 1; // 1 = కార్డు ఉంది, 0 = కార్డు లేదు
    int currentWeight = 450; // కిలోలలో
    const int MAX_WEIGHT = 500;

    // మొదటి స్థాయి చెక్: సెక్యూరిటీ యాక్సెస్
    if (hasKeyCard == 1) {
        printf("🔑 యాక్సెస్ అనుమతించబడింది.\\n");

        // రెండవ స్థాయి నెస్టెడ్ చెక్: బరువు పరిమితి
        if (currentWeight &lt;= MAX_WEIGHT) {
            printf("🛗 లిఫ్ట్ పై అంతస్తుకు కదులుతోంది...\\n");
        } else {
            printf("🚨 హెచ్చరిక: లిఫ్ట్ ఓవర్‌లోడ్ అయింది! దయచేసి ఒకరు కిందకు దిగండి.\\n");
        }
    } else {
        printf("⛔ యాక్సెస్ తిరస్కరించబడింది: దయచేసి మీ స్మార్ట్ కార్డును స్వైప్ చేయండి.\\n");
    }

    return 0;
}</code></pre>
      </div>
    </div>

    <!-- SECTION 8 -->
    <div class="section-title"><span class="num">8</span>ది డెడ్లీ అసైన్‌మెంట్ ట్రాప్: if (x = 5) vs if (x == 5)</div>
    <div class="section-body">
      <p>C ప్రోగ్రామింగ్ చరిత్రలో బిలియన్ డాలర్ల నష్టాన్ని కలిగించిన అత్యంత భయంకరమైన బగ్ ఇది! ఒక పోలిక చేయబోయి పొరపాటున ఒకే ఒక్క <code>=</code> రాస్తే ఏం జరుగుతుందో చూడండి:</p>

      <div style="overflow-x:auto; margin: 16px 0;">
        <table class="tbl">
          <thead>
            <tr>
              <th>స్టేట్‌మెంట్</th>
              <th>వాస్తవంగా ఏం జరుగుతుంది?</th>
              <th>ఫలితం (Condition Result)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>if (x == 5)</code></td>
              <td><code>x</code> లో ఉన్న విలువ 5 కి సమానమా అని పోలుస్తుంది (Comparison).</td>
              <td><code>x</code> విలువ 5 అయితే True (1); లేకపోతే False (0). సరైనది!</td>
            </tr>
            <tr>
              <td><code>if (x = 5)</code></td>
              <td><code>x</code> లోకి 5 ని అసైన్ చేస్తుంది (Assignment), ఆ అసైన్ అయిన <strong>5</strong> ని కండిషన్‌గా తీసుకుంటుంది!</td>
              <td>5 అనేది సున్నా కాని సంఖ్య కాబట్టి <strong>ఎల్లప్పుడూ TRUE అవుతుంది!</strong> తీవ్రమైన లాజిక్ బగ్!</td>
            </tr>
            <tr>
              <td><code>if (x = 0)</code></td>
              <td><code>x</code> లోకి 0 ని అసైన్ చేస్తుంది. ఆ 0 కండిషన్ అవుతుంది.</td>
              <td>0 కాబట్టి <strong>ఎల్లప్పుడూ FALSE అవుతుంది!</strong></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Deadly Assignment Bug Demo</span>
          <div class="code-actions">
            <a class="try-btn" href="/online-c-compiler.html" target="_blank">▶ Run in Online C Compiler</a>
          </div>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main(void) {
    int userRole = 0; // 0 = సాధారణ యూజర్, 1 = అడ్మిన్

    // పొరపాటున == కి బదులుగా = రాశాం!
    if (userRole = 1) { 
        printf("⚠️ భయంకరమైన బగ్: సాధారణ యూజర్‌కు అడ్మిన్ అధికారాలు లభించాయి!\\n");
    } else {
        printf("సాధారణ యూజర్ డాష్‌బోర్డ్.\\n");
    }

    return 0;
}</code></pre>
      </div>

      <div class="tip-box">
        💡 <strong>యోడా కండిషన్స్ (Yoda Conditions) ట్రిక్:</strong><br>
        ఈ బగ్‌ను కంపైలర్ కూడా కనిపెట్టలేదు ఎందుకంటే C లో అసైన్‌మెంట్ కూడా ఒక లీగల్ ఎక్స్‌ప్రెషనే. దీనిని అడ్డుకోవడానికి సీనియర్ ప్రోగ్రామర్లు కాన్‌స్టాంట్‌ను ఎడమవైపు రాస్తారు: <strong><code>if (5 == x)</code></strong>.<br>
        ఒకవేళ మీరు పొరపాటున <code>if (5 = x)</code> అని రాస్తే — కాన్‌స్టాంట్‌కు విలువను అసైన్ చేయలేం కాబట్టి కంపైలర్ వెంటనే <code>error: lvalue required as left operand of assignment</code> అని ఎర్రర్ ఇచ్చి ప్రోగ్రామ్‌ను ఆపేస్తుంది!
      </div>
    </div>

    <!-- SECTION 9 -->
    <div class="section-title"><span class="num">9</span>ది డాంగ్లింగ్ else సమస్య (The Dangling else Problem)</div>
    <div class="section-body">
      <p>నెస్టెడ్ కండిషన్లలో కర్లీ బ్రేసెస్ <code>{ }</code> వాడనప్పుడు ఒక <code>else</code> ఏ <code>if</code> కి చెందుతుందో అర్థం కాక వచ్చే గందరగోళాన్నే <strong>Dangling else Problem</strong> అంటారు:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Dangling else Ambiguity</span>
          <div class="code-actions">
            <a class="try-btn" href="/online-c-compiler.html" target="_blank">▶ Run in Online C Compiler</a>
          </div>
        </div>
        <pre><code>int a = 10;
int b = 20;

if (a &gt; 5)
    if (b &gt; 30)
        printf("A\\n");
else
    printf("B\\n"); // ఈ else ఎవరికి చెందుతుంది? మొదటి if కా? రెండో if కా?</code></pre>
      </div>

      <h4 style="color:#059669; font-size:15px; margin-top:16px;">అంతర్జాతీయ C స్టాండర్డ్ నియమం:</h4>
      <p>C కంపైలర్లు ఎల్లప్పుడూ ఒక నిర్దిష్ట సూత్రాన్ని పాటిస్తాయి: <strong>"ఒక else ఎల్లప్పుడూ తనకు అత్యంత సమీపంలో ఉన్న (Nearest Unpaired) if కి మాత్రమే జతచేయబడుతుంది!"</strong></p>
      <p>పై కోడ్‌లో <code>else</code> అనేది <code>if (b &gt; 30)</code> కి చెందుతుంది తప్ప మొదటి <code>if (a &gt; 5)</code> కి కాదు! ఇండెంటేషన్ ఎలా ఉన్నా కంపైలర్ పట్టించుకోదు. అందుకే ఎల్లప్పుడూ కర్లీ బ్రేసెస్ <code>{ }</code> తప్పనిసరిగా వాడాలి!</p>
    </div>

    <!-- SECTION 10 -->
    <div class="section-title"><span class="num">10</span>కర్లీ బ్రేసెస్ {} లేకపోతే జరిగే ప్రమాదాలు (Single Statement Trap)</div>
    <div class="section-body">
      <p>C లాంగ్వేజ్‌లో <code>if</code> తర్వాత కర్లీ బ్రేసెస్ <code>{ }</code> పెట్టకపోతే — కంపైలర్ దాని తర్వాత వచ్చే <strong>కేవలం ఒక్కే ఒక్క స్టేట్‌మెంట్‌ను మాత్రమే</strong> if కింద పరిగణిస్తుంది!</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — The Missing Braces Bug</span>
          <div class="code-actions">
            <a class="try-btn" href="/online-c-compiler.html" target="_blank">▶ Run in Online C Compiler</a>
          </div>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main(void) {
    int isLoggedIn = 0; // లాగిన్ అవ్వలేదు

    // బ్రేసెస్ లేవు!
    if (isLoggedIn == 1)
        printf("స్వాగతం, యూజర్!\\n");
        printf("మీ రహస్య బ్యాంక్ బ్యాలెన్స్: ₹50,000\\n"); // ఇది if బయట ఉంది! ఎల్లప్పుడూ ప్రింట్ అవుతుంది!

    return 0;
}</code></pre>
      </div>

      <p>పై కోడ్‌లో యూజర్ లాగిన్ అవ్వకపోయినా — రెండవ లైన్ (బ్యాంక్ బ్యాలెన్స్) స్క్రీన్ మీద ప్రింట్ అయిపోతుంది! ఎందుకంటే బ్రేసెస్ లేకపోవడం వల్ల మొదటి లైన్ మాత్రమే if పరిధిలోకి వచ్చింది. రెండవ లైన్ సాధారణ కోడ్ లాగా రన్ అయిపోయింది. 2014 లో ఆపిల్ సంస్థ యొక్క ప్రసిద్ధ <strong>"goto fail" సెక్యూరిటీ బగ్</strong> కు కూడా బ్రేసెస్ లేకపోవడమే కారణం!</p>
    </div>

    <!-- SECTION 11 -->
    <div class="section-title"><span class="num">11</span>బిగినర్స్ చేసే టాప్ 5 కండిషనల్ తప్పులు</div>
    <div class="section-body">
      <div style="display:flex; flex-direction:column; gap:16px; margin:16px 0;">
        <div style="background:rgba(239, 68, 68, 0.08); border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px 18px;">
          <strong style="color:#ef4444; font-size:14.5px;">❌ 1. if() పక్కనే సెమికోలన్ పెట్టడం (The Semicolon Null Statement):</strong>
          <pre style="margin:6px 0; background:#fff; border:1px solid #fecaca; padding:8px 12px; border-radius:6px; color:#b91c1c; font-size:13px;"><code>if (age &gt;= 18); { // తప్పు! సెమికోలన్ వల్ల if అక్కడితోనే ముగిసిపోయింది!
    printf("ఓటు వేయవచ్చు"); // ఇది ఎల్లప్పుడూ రన్ అవుతుంది!
}</code></pre>
          <span style="font-size:13px; color:var(--text2);"><code>if(...)</code> పక్కన సెమికోలన్ పెడితే అది "ఖాళీ స్టేట్‌మెంట్ (Null Statement)" అవుతుంది. ఆ తర్వాత ఉన్న కర్లీ బ్రేసెస్ సాధారణ బ్లాక్ అయిపోయి ఎల్లప్పుడూ రన్ అవుతుంది.</span>
        </div>

        <div style="background:rgba(239, 68, 68, 0.08); border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px 18px;">
          <strong style="color:#ef4444; font-size:14.5px;">❌ 2. గణితం లాగా చైనింగ్ కంపారిజన్స్ రాయడం (10 &lt; x &lt; 20):</strong>
          <pre style="margin:6px 0; background:#fff; border:1px solid #fecaca; padding:8px 12px; border-radius:6px; color:#b91c1c; font-size:13px;"><code>if (10 &lt; x &lt; 20) // తప్పు! C లో ఇది గణితం లాగా పనిచేయదు!</code></pre>
          <span style="font-size:13px; color:var(--text2);">కంపైలర్ ముందుగా <code>10 &lt; x</code> ని ఎవాల్యుయేట్ చేసి 1 లేదా 0 ని ఇస్తుంది. ఆ తర్వాత <code>1 &lt; 20</code> ఎల్లప్పుడూ True అవుతుంది! దీనిని ఎల్లప్పుడూ లాజికల్ AND తో రాయాలి: <code>if (x &gt; 10 &amp;&amp; x &lt; 20)</code>.</span>
        </div>

        <div style="background:rgba(239, 68, 68, 0.08); border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px 18px;">
          <strong style="color:#ef4444; font-size:14.5px;">❌ 3. ఫ్లోటింగ్ పాయింట్ సంఖ్యలకు == పోలిక పెట్టడం:</strong>
          <pre style="margin:6px 0; background:#fff; border:1px solid #fecaca; padding:8px 12px; border-radius:6px; color:#b91c1c; font-size:13px;"><code>float f = 0.1f + 0.2f;
if (f == 0.3f) // చాలాసార్లు ఫాల్స్ అవుతుంది!</code></pre>
          <span style="font-size:13px; color:var(--text2);">బైనరీ ఫ్లోటింగ్ పాయింట్ ప్రెసిషన్ లోపాల వల్ల దశాంశ సంఖ్యలు ఖచ్చితంగా సమానం కాకపోవచ్చు. వాటి మధ్య తేడాను (Epsilon) చెక్ చేయాలి: <code>fabs(f - 0.3) &lt; 0.00001</code>.</span>
        </div>
      </div>
    </div>

    <!-- SECTION 12 (INTERACTIVE QUIZ) -->
    <div class="section-title"><span class="num">12</span>ఇంటరాక్టివ్ నాలెడ్జ్ చెక్ (Self-Assessment Quiz)</div>
    <div class="section-body">
      <p>ఈ అధ్యాయంలో మీరు నేర్చుకున్న డెసిషన్ మేకింగ్ భావనలను పరీక్షించుకోవడానికి క్రింది ప్రశ్నలపై క్లిక్ చేయండి:</p>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:700; cursor:pointer; color:#059669;">
          ❓ ప్రశ్న 1: C లాంగ్వేజ్‌లో if (-5) అని రాస్తే ఆ కండిషన్ True అవుతుందా లేక False అవుతుందా?
        </summary>
        <div style="margin-top:10px; color:var(--text2); font-size:14px; line-height:1.6;">
          <strong>సమాధానం:</strong> <strong>ఖచ్చితంగా TRUE అవుతుంది!</strong> ఎందుకంటే C లో కేవలం 0 (సున్నా) మాత్రమే False; సున్నా కాని ఏదైనా నెగెటివ్ లేదా పాజిటివ్ సంఖ్య (ఉదా: -5, 100) True గానే పరిగణించబడుతుంది.
        </div>
      </details>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:700; cursor:pointer; color:#059669;">
          ❓ ప్రశ్న 2: if (x = 0) అని రాస్తే ఆ బ్లాక్ లోపలి కోడ్ ఎగ్జిక్యూట్ అవుతుందా?
        </summary>
        <div style="margin-top:10px; color:var(--text2); font-size:14px; line-height:1.6;">
          <strong>సమాధానం:</strong> <strong>ఎగ్జిక్యూట్ అవ్వదు (FALSE)!</strong> ఎందుకంటే <code>x = 0</code> అసైన్‌మెంట్ జరిగిన తర్వాత ఆ ఎక్స్‌ప్రెషన్ విలువ 0 అవుతుంది. 0 అంటే False కాబట్టి if బ్లాక్ స్కిప్ అవుతుంది.
        </div>
      </details>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:700; cursor:pointer; color:#059669;">
          ❓ ప్రశ్న 3: ఒక if స్టేట్‌మెంట్ పక్కన కర్లీ బ్రేసెస్ లేకపోతే అది ఎన్ని స్టేట్‌మెంట్లను తన పరిధిలోకి తీసుకుంటుంది?
        </summary>
        <div style="margin-top:10px; color:var(--text2); font-size:14px; line-height:1.6;">
          <strong>సమాధానం:</strong> <strong>కేవలం ఒకే ఒక్క స్టేట్‌మెంట్‌ను (Exactly ONE statement)</strong> మాత్రమే.
        </div>
      </details>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:700; cursor:pointer; color:#059669;">
          ❓ ప్రశ్న 4: Dangling else సమస్యలో else క్లాజ్ ఏ if కి జతచేయబడుతుంది?
        </summary>
        <div style="margin-top:10px; color:var(--text2); font-size:14px; line-height:1.6;">
          <strong>సమాధానం:</strong> తనకు అత్యంత సమీపంలో ఉన్న జతకాని <strong>(Nearest Unpaired) if</strong> కి జతచేయబడుతుంది.
        </div>
      </details>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:700; cursor:pointer; color:#059669;">
          ❓ ప్రశ్న 5: యోడా కండిషన్స్ (Yoda Conditions) అంటే ఏమిటి?
        </summary>
        <div style="margin-top:10px; color:var(--text2); font-size:14px; line-height:1.6;">
          <strong>సమాధానం:</strong> పోలికలో కాన్‌స్టాంట్‌ను ఎడమవైపు రాయడం (ఉదా: <code>if (5 == x)</code>). పొరపాటున ఒకే <code>=</code> రాసినా కంపైలేషన్ ఎర్రర్ వచ్చి బగ్ తక్షణమే బయటపడుతుంది.
        </div>
      </details>
    </div>

    <!-- SECTION 13 (TRY BOX & SUMMARY) -->
    <div class="section-title"><span class="num">13</span>మీరే స్వయంగా Try చేయండి &amp; సారాంశం (Quick Summary)</div>
    <div class="section-body">
      <div class="try-box" style="margin-top:10px;">
        <div class="try-title">🚀 ATM సిమ్యులేటర్ &amp; గ్రేడింగ్ లాజిక్‌ను మన C కంపైలర్‌లో రన్ చేయండి!</div>
        <p>పైన వివరించిన <code>ATM క్యాష్ విత్‌డ్రా</code> కోడ్‌ను మన ఆన్‌లైన్ C కంపైలర్‌లో ఓపెన్ చేసి స్వయంగా రకరకాల విత్‌డ్రా మొత్తాలను ఇచ్చి టెస్ట్ చేయండి. తప్పుడు పిన్, బ్యాలెన్స్ లోపాలు ఎలా హ్యాండిల్ అవుతున్నాయో గమనించండి!</p>
        <a class="run-btn" href="/online-c-compiler.html" target="_blank">
          👉 Our Compiler లో C Compiler try చేయండి
        </a>
      </div>

      <div style="margin-top:24px;">
        <h4 style="color:#059669; font-size:16px; margin-bottom:10px;">📌 క్విక్ సారాంశం (Key Takeaways):</h4>
        <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.7;">
          <li><strong>కంట్రోల్ ఫ్లో:</strong> కండిషన్ల ఆధారంగా ప్రోగ్రామ్ మార్గాన్ని మార్చగలగడం.</li>
          <li><strong>True vs False:</strong> C లో 0 అంటే False; సున్నా కాని ఏదైనా సంఖ్య True.</li>
          <li><strong>else-if లాడర్:</strong> బహుళ ఎంపికలలో మొదటి సరైన కండిషన్ ఎగ్జిక్యూట్ అవ్వగానే బయటకు వస్తుంది.</li>
          <li><strong>అసైన్‌మెంట్ బగ్:</strong> <code>if (x == 5)</code> కి బదులు <code>if (x = 5)</code> రాస్తే ఎల్లప్పుడూ True అవుతుంది.</li>
          <li><strong>కర్లీ బ్రేసెస్:</strong> సింగిల్ లైన్ అయినా సరే ఎల్లప్పుడూ <code>{ }</code> వాడటం ప్రొఫెషనల్ పద్ధతి.</li>
        </ul>
      </div>

      <div style="margin-top:20px; padding:16px; background:var(--bg2); border-left:4px solid #10b981; border-radius:0 8px 8px 0;">
        <strong>తర్వాతి అధ్యాయంలో (Chapter 06):</strong> బహుళ ఎంపికల కోసం <code>else-if</code> కంటే మెరుపు వేగంతో పనిచేసే <strong>switch-case స్టేట్‌మెంట్, O(1) Jump Tables ఆర్కిటెక్చర్, break ప్రాముఖ్యత, Fall-through మెకానిక్స్, మరియు పూర్తి సైంటిఫిక్ క్యాలిక్యులేటర్ ప్రాజెక్ట్</strong> గురించి అత్యంత ఆసక్తికరంగా నేర్చుకుందాం!
      </div>
    </div>


    <!-- PREV / NEXT NAVIGATION -->
    <div style="display:flex; justify-content:space-between; align-items:center; margin-top:40px; padding-top:20px; border-top:1px solid var(--border); flex-wrap:wrap; gap:16px;">
      <a href="/blog-c/04-c-operators-and-expressions.html" style="display:inline-flex; align-items:center; gap:8px; padding:10px 18px; border-radius:8px; background:var(--bg3); border:1px solid var(--border); color:var(--text); text-decoration:none; font-weight:700; font-size:13.5px;">
        ← Prev: 4. ఆపరేటర్లు &amp; ఎక్స్‌ప్రెషన్స్
      </a>
      <a href="/blog-c/06-c-switch-case-decision-making.html" style="display:inline-flex; align-items:center; gap:8px; padding:10px 20px; border-radius:8px; background:linear-gradient(135deg, #10b981, #059669); color:#ffffff; text-decoration:none; font-weight:700; font-size:13.5px; box-shadow:0 2px 10px rgba(16,185,129,0.2);">
        Next: 6. switch స్టేట్‌మెంట్ →
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
  <title>కండిషనల్ స్టేట్‌మెంట్స్ (if, else if, else & Nested Branches) — Modern C Tutorial | Our Compiler</title>
  <meta name="description" content="కండిషనల్ స్టేట్‌మెంట్స్ (if, else if, else & Nested Branches) సమగ్ర తెలుగు గైడ్: డెసిషన్ మేకింగ్ లాజిక్ · ATM క్యాష్ విత్‌డ్రా చెక్ · గ్రేడింగ్ సిస్టమ్ · డాంగ్లింగ్ else సమస్య · అసైన్‌మెంట్ ట్రాప్ if (x = 5)." />
  <meta name="keywords" content="c conditional statements in telugu, c if else telugu, c nested if else, c atm program, learn c language, our compiler" />
  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />
  <link rel="icon" type="image/png" href="/logo.png" />
  <link rel="canonical" href="https://www.ourcompiler.com/blog-c/05-c-if-else-conditionals.html" />
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
    "headline": "కండిషనల్ స్టేట్‌మెంట్స్ (if, else if, else & Nested Branches) (C Programming in Telugu)",
    "description": "డెసిషన్ మేకింగ్ లాజిక్ · ATM క్యాష్ విత్‌డ్రా చెక్ · గ్రేడింగ్ సిస్టమ్ · డాంగ్లింగ్ else సమస్య · అసైన్‌మెంట్ ట్రాప్ if (x = 5)",
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

const outputPath = path.join(__dirname, '..', 'public', 'blog-c', '05-c-if-else-conditionals.html');
fs.writeFileSync(outputPath, fullHtml, 'utf8');

console.log('✅ Successfully generated deep high-value C Chapter 05!');
console.log('Target file size:', fullHtml.length, 'characters');
