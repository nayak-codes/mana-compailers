const fs = require('fs');
const path = require('path');

const cppDir = path.join(__dirname, '../public/blog-cpp');

function replaceMainContent(filePath, newMainHtml) {
  let content = fs.readFileSync(filePath, 'utf8');
  const startIdx = content.indexOf('<main class="content">');
  const endIdx = content.indexOf('</main>');
  if (startIdx === -1 || endIdx === -1) {
    console.error('Could not find <main> in', filePath);
    return;
  }
  content = content.slice(0, startIdx) + newMainHtml + content.slice(endIdx + 7);
  content = content.replace(/<html(\s+[^>]*)?>/, '<html class="light-theme" lang="te">');
  content = content.replace(/<body(\s+[^>]*)?>/, '<body class="lang-cpp light-theme">');
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('✅ Upgraded:', path.basename(filePath));
}

// ==========================================
// CHAPTER 05: IF-ELSE CONDITIONALS
// ==========================================
const ch05Main = `<main class="content">
    <div class="breadcrumb">
      <a href="/">Home</a><span class="sep">›</span>
      <a href="/blog.html">Tutorials</a><span class="sep">›</span>
      <a href="/blog-cpp.html">C++ Masterclass</a><span class="sep">›</span>
      <span class="current">Chapter 5: Conditionals (if, else if, else)</span>
    </div>

    <h1 class="page-title">కండిషనల్ స్టేట్‌మెంట్స్ (if, else if, else & Nested Branches)</h1>

    <div class="page-meta">
      <span class="badge">⚡ Modern C++20 / C++17</span>
      <span class="badge">🟢 Chapter 5 of 20</span>
      <span class="badge">📂 Phase 2: Control Flow & Loops</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

    <!-- Covered Topics Bar -->
    <div style="background:var(--bg3); border:1px solid var(--border); border-radius:8px; padding:10px 16px; margin-bottom:24px; font-size:13px; color:var(--text2); display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
      <span style="color:#10b981; font-weight:700;">📌 Covered in this chapter:</span>
      <span>Decision Making in Code · CPU Branch Prediction · Simple if & if-else · else-if Ladder · Dangling Else Ambiguity · Modern C++17 if with initializer · Common Assignment Traps</span>
    </div>

    <!-- Intro Overview Box -->
    <div class="intro-box">
      కంప్యూటర్ కేవలం లెక్కలు మాత్రమే చేయదు, <strong>సందర్భాన్ని బట్టి సరైన నిర్ణయాలు (Decisions)</strong> కూడా తీసుకుంటుంది. ఈ అధ్యాయంలో ప్రోగ్రామ్ ఫ్లోను కంట్రోల్ చేసే <code>if</code>, <code>if-else</code>, <code>else-if ladder</code>, బగ్స్‌కు కారణమయ్యే <strong>Dangling Else</strong> సమస్య, మరియు Modern C++17 లో వచ్చిన సూపర్ ఆప్టిమైజ్డ్ <strong>if with initializer</strong> ఫీచర్‌ను నేర్చుకుందాం.
    </div>

    <!-- SECTION 1 -->
    <div class="section-title"><span class="num">1</span>Decision Making అంటే ఏమిటి? (Branching Logic)</div>
    <div class="section-body">
      <p>
        సాధారణంగా ఒక ప్రోగ్రామ్ మొదటి లైన్ నుండి చివరి లైన్ వరకు వరుసగా (Sequentially) రన్ అవుతుంది. కానీ నిజ జీవితంలో పరిస్థితులను బట్టి దారి మార్చుకోవాల్సి వస్తుంది.
      </p>

      <div class="concept-box">
        <h4>🚦 Real-World Analogy: ట్రాఫిక్ సిగ్నల్ & CPU బ్రాంచ్ ప్రిడిక్షన్</h4>
        <p>
          రోడ్డుపై వెళ్తున్నప్పుడు సిగ్నల్ <strong>GREEN</strong> అయితే ముందుకు వెళ్తాం, <strong>RED</strong> అయితే ఆగుతాం. ఆధునిక CPU లలో కూడా హార్డ్‌వేర్ లెవల్‌లో <strong>Branch Predictor</strong> ఉంటుంది. ప్రోగ్రామ్‌లోని కండిషన్ ఏ వైపు మొగ్గు చూపుతుందో ముందే ఊహించి ఆ ఇన్స్ట్రక్షన్లను CPU పైప్‌లైన్‌లో సిద్ధంగా ఉంచుతుంది.
        </p>
      </div>
    </div>

    <!-- SECTION 2 -->
    <div class="section-title"><span class="num">2</span>The Simple if & if-else Statements</div>
    <div class="section-body">
      <p>
        ఒక నిర్దిష్ట షరతు (Condition) true అయినప్పుడు ఒక పని, false అయినప్పుడు ప్రత్యామ్నాయ పని చేయాలంటే <code>if-else</code> వాడతాం:
      </p>

      <div style="margin-top: 16px; margin-bottom: 12px;">
        <div style="font-size:13.5px; font-weight:700; color:#10b981; margin-bottom:6px;">💻 Example 1: ATM Cash Withdrawal Authorization</div>
        <div class="code-block">
          <div class="code-block-header">
            <span class="lang-tag">C++17</span>
            <a class="try-btn" href="/online-cpp-compiler.html">▶ Run in Compiler</a>
          </div>
          <pre><code>#include &lt;iostream&gt;

int main() {
    double accountBalance = 5000.0;
    double withdrawAmount = 2500.0;

    if (withdrawAmount &lt;= accountBalance) {
        accountBalance -= withdrawAmount;
        std::cout &lt;&lt; "Success: Cash Dispensed Rs. " &lt;&lt; withdrawAmount &lt;&lt; "\\n";
    } else {
        std::cout &lt;&lt; "Declined: Insufficient Funds!\\n";
    }

    std::cout &lt;&lt; "Available Balance: Rs. " &lt;&lt; accountBalance &lt;&lt; "\\n";
    return 0;
}</code></pre>
        </div>
      </div>

      <!-- Line-by-Line Breakdown -->
      <div class="card" style="background:var(--bg2); border:1px solid var(--border); padding:16px 18px; border-radius:8px; margin-top:14px;">
        <h4 style="color:#10b981; margin:0 0 10px 0; font-size:14.5px;">🔍 లైన్-బై-లైన్ కోడ్ విశ్లేషణ:</h4>
        <ul style="margin:0 0 0 16px; line-height:1.75; font-size:13.5px; color:var(--text);">
          <li><code>if (withdrawAmount &lt;= accountBalance)</code>: విత్‌డ్రా మొత్తం బ్యాలెన్స్ కంటే తక్కువ లేదా సమానమా అని బూలియన్ చెక్ చేస్తుంది.</li>
          <li><code>accountBalance -= withdrawAmount;</code>: కండిషన్ true అయితేనే ఖాతా నుండి డబ్బు కట్ అవుతుంది.</li>
          <li><code>else { ... }</code>: కండిషన్ false అయినప్పుడు మాత్రమే ఈ బ్లాక్ ఎగ్జిక్యూట్ అవుతుంది.</li>
        </ul>
      </div>
    </div>

    <!-- SECTION 3 -->
    <div class="section-title"><span class="num">3</span>else-if Ladder (బహుముఖ నిర్ణయాలు)</div>
    <div class="section-body">
      <p>
        రెండు కంటే ఎక్కువ అవకాశాలు ఉన్నప్పుడు <strong>else-if నిచ్చెన</strong> వాడతాం. పై నుంచి కిందకి పరిశీలిస్తూ ఏ కండిషన్ మొదట true అయితే ఆ బ్లాక్ ఎగ్జిక్యూట్ చేసి నిచ్చెన నుండి బయటకు వచ్చేస్తుంది:
      </p>

      <div style="margin-top: 16px; margin-bottom: 12px;">
        <div style="font-size:13.5px; font-weight:700; color:#10b981; margin-bottom:6px;">💻 Example 2: Academic Grading System</div>
        <div class="code-block">
          <div class="code-block-header">
            <span class="lang-tag">C++17</span>
            <a class="try-btn" href="/online-cpp-compiler.html">▶ Run in Compiler</a>
          </div>
          <pre><code>#include &lt;iostream&gt;

int main() {
    int score = 88;

    if (score &gt;= 90) {
        std::cout &lt;&lt; "Grade: A+ (Outstanding 🌟)\\n";
    } else if (score &gt;= 75) {
        std::cout &lt;&lt; "Grade: A (Distinction 🎓)\\n";
    } else if (score &gt;= 60) {
        std::cout &lt;&lt; "Grade: B (First Class 📚)\\n";
    } else if (score &gt;= 35) {
        std::cout &lt;&lt; "Grade: C (Pass ✅)\\n";
    } else {
        std::cout &lt;&lt; "Grade: F (Needs Improvement ⚠️)\\n";
    }

    return 0;
}</code></pre>
        </div>
      </div>
    </div>

    <!-- SECTION 4: MODERN C++17 IF WITH INIT -->
    <div class="section-title"><span class="num">4</span>Modern C++17: if with Initializer</div>
    <div class="section-body">
      <p>
        C++17 లో ప్రవేశపెట్టబడిన విప్లవాత్మక ఫీచర్ <strong>if with initializer</strong>. ఒక వేరియబుల్‌ను క్రియేట్ చేసి, వెంటనే కండిషన్ చెక్ చేసి, ఆ వేరియబుల్ పరిధిని (Scope) కేవలం ఆ <code>if</code> బ్లాక్‌కే పరిమితం చేయవచ్చు:
      </p>

      <div style="margin-top: 16px; margin-bottom: 12px;">
        <div style="font-size:13.5px; font-weight:700; color:#10b981; margin-bottom:6px;">💻 Example 3: Scoped Initialization (C++17)</div>
        <div class="code-block">
          <div class="code-block-header">
            <span class="lang-tag">C++17 / C++20</span>
            <a class="try-btn" href="/online-cpp-compiler.html">▶ Run in Compiler</a>
          </div>
          <pre><code>#include &lt;iostream&gt;

int fetchBatteryPercentage() { return 18; }

int main() {
    // C++17: if (Init; Condition)
    if (int battery = fetchBatteryPercentage(); battery &lt; 20) {
        std::cout &lt;&lt; "Low Battery: " &lt;&lt; battery &lt;&lt; "%! Please connect charger.\\n";
    }
    // battery variable ఇక ఇక్కడ అందుబాటులో ఉండదు! మెమరీ క్లీన్ & సేఫ్.

    return 0;
}</code></pre>
        </div>
      </div>
    </div>

    <!-- SECTION 5: PITFALLS -->
    <div class="section-title"><span class="num">5</span>బిగినర్స్ చేసే ఘోరమైన తప్పులు (Beginner Pitfalls)</div>
    <div class="section-body">
      <div style="display:flex; flex-direction:column; gap:12px; margin:14px 0;">
        <div style="background:var(--bg2); border:1px solid rgba(239,68,68,0.3); border-left:4px solid #ef4444; border-radius:8px; padding:14px 18px;">
          <div style="font-weight:700; color:#ef4444; font-size:14px;">❌ Trap 1: The Semicolon after if Bug</div>
          <p style="font-size:13.5px; color:var(--text); margin:6px 0 0 0; line-height:1.6;">
            పొరపాటున <code>if (x &gt; 10); { doSomething(); }</code> అని రాస్తే, సెమికోలన్ వల్ల ఆ కండిషన్ అక్కడితో ముగిసిపోయి (Null Statement), కండిషన్ true అయినా false అయినా బ్రాకెట్ లోపలి కోడ్ ఎల్లప్పుడూ రన్ అయిపోతుంది!
          </p>
        </div>

        <div style="background:var(--bg2); border:1px solid rgba(239,68,68,0.3); border-left:4px solid #ef4444; border-radius:8px; padding:14px 18px;">
          <div style="font-weight:700; color:#ef4444; font-size:14px;">❌ Trap 2: Dangling Else Problem</div>
          <p style="font-size:13.5px; color:var(--text); margin:6px 0 0 0; line-height:1.6;">
            కర్లీ బ్రేసెస్ <code>{ }</code> లేకుండా నెస్టెడ్ if-else రాసినప్పుడు, కంపైలర్ <code>else</code> ను ఎల్లప్పుడూ దానికి అతి సమీపంలో ఉన్న లోపలి <code>if</code> కే జతచేస్తుంది. దీనివల్ల లాజిక్ తలకిందులవుతుంది. అందుకే సింగిల్ లైన్ అయినా సరే ఎల్లప్పుడూ బ్రేసెస్ వాడటం గోల్డెన్ రూల్.
          </p>
        </div>
      </div>
    </div>

    <!-- PREV / NEXT NAVIGATION -->
    <div style="display:flex; justify-content:space-between; align-items:center; margin-top:40px; padding-top:20px; border-top:1px solid var(--border); flex-wrap:wrap; gap:16px;">
      <a href="/blog-cpp/04-cpp-operators-and-expressions.html" style="display:inline-flex; align-items:center; gap:8px; padding:10px 18px; border-radius:8px; background:var(--bg3); border:1px solid var(--border); color:var(--text); text-decoration:none; font-weight:700; font-size:13.5px;">
        ← Prev: 4. ఆపరేటర్లు
      </a>
      <a href="/blog-cpp/06-cpp-switch-case.html" style="display:inline-flex; align-items:center; gap:8px; padding:10px 20px; border-radius:8px; background:linear-gradient(135deg, #10b981, #059669); color:#ffffff; text-decoration:none; font-weight:700; font-size:13.5px; box-shadow:0 2px 10px rgba(16,185,129,0.2);">
        Next: 6. switch స్టేట్‌మెంట్ →
      </a>
    </div>

  </main>`;

replaceMainContent(path.join(cppDir, '05-cpp-if-else-conditionals.html'), ch05Main);

// ==========================================
// CHAPTER 06: SWITCH-CASE
// ==========================================
const ch06Main = `<main class="content">
    <div class="breadcrumb">
      <a href="/">Home</a><span class="sep">›</span>
      <a href="/blog.html">Tutorials</a><span class="sep">›</span>
      <a href="/blog-cpp.html">C++ Masterclass</a><span class="sep">›</span>
      <span class="current">Chapter 6: switch-case & Control Branching</span>
    </div>

    <h1 class="page-title">switch స్టేట్‌మెంట్ & కంట్రోల్ బ్రాంచింగ్ (switch-case & Jump Tables)</h1>

    <div class="page-meta">
      <span class="badge">⚡ Modern C++20 / C++17</span>
      <span class="badge">🟢 Chapter 6 of 20</span>
      <span class="badge">📂 Phase 2: Control Flow & Loops</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

    <!-- Covered Topics Bar -->
    <div style="background:var(--bg3); border:1px solid var(--border); border-radius:8px; padding:10px 16px; margin-bottom:24px; font-size:13px; color:var(--text2); display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
      <span style="color:#10b981; font-weight:700;">📌 Covered in this chapter:</span>
      <span>Why switch? · Internal Jump Table Architecture (O(1) vs O(N)) · Fall-through Mechanics & [[fallthrough]] · Variable Declarations in Case Blocks · Scoped enum class Integration · Common Traps</span>
    </div>

    <!-- Intro Overview Box -->
    <div class="intro-box">
      ఒకే వేరియబుల్ యొక్క విలువను బట్టి డజన్ల కొద్దీ దారుల్లో ఒకదానిని ఎంచుకోవాల్సి వచ్చినప్పుడు పొడవైన <code>else-if</code> నిచ్చెన రాయడం అసహ్యంగా ఉంటుంది. C++ లో అత్యంత వేగవంతమైన <strong>Jump Table ఆప్టిమైజేషన్</strong> తో పనిచేసే <strong>switch-case స్టేట్‌మెంట్</strong> గురించి సమగ్రంగా తెలుసుకుందాం.
    </div>

    <!-- SECTION 1 -->
    <div class="section-title"><span class="num">1</span>switch ఎందుకు వాడాలి? (The Jump Table Secret)</div>
    <div class="section-body">
      <p>
        చాలామంది <code>switch</code> అనేది కేవలం <code>if-else</code> కి మరొక రూపం అనుకుంటారు. కానీ కంపైలర్ లెవల్‌లో చాలా పెద్ద తేడా ఉంది:
      </p>

      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:16px; margin:16px 0;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px;">
          <h4 style="color:#f59e0b; margin:0 0 8px 0; font-size:14px;">🐢 else-if Ladder: O(N) Sequential Search</h4>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.6;">
            ఒకవేళ మీరు 20 కండిషన్లు రాస్తే, 20వ ఆప్షన్ మ్యాచ్ అవ్వడానికి CPU వరుసగా 19 సార్లు చెక్ చేసుకుంటూ దిగాలి. కండిషన్లు పెరిగే కొద్దీ ప్రోగ్రామ్ స్లో అవుతుంది.
          </p>
        </div>
        <div style="background:var(--bg2); border:1px solid #10b981; border-radius:8px; padding:16px;">
          <h4 style="color:#10b981; margin:0 0 8px 0; font-size:14px;">⚡ switch-case: O(1) Jump Table Dispatch</h4>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.6;">
            C++ కంపైలర్ కేస్ లేబుల్స్ ఆధారంగా బైనరీలో ఒక ఇండెక్స్డ్ <strong>Jump Table</strong> తయారు చేస్తుంది. 100 కేస్ లేబుల్స్ ఉన్నా సరే, విలువను బట్టి నేరుగా ఆ మెమరీ అడ్రస్‌కు ఒక్క క్షణంలో (O(1) Time) దూకేస్తుంది!
          </p>
        </div>
      </div>
    </div>

    <!-- SECTION 2 -->
    <div class="section-title"><span class="num">2</span>switch-case సింటాక్స్ & Fall-through మెకానిక్స్</div>
    <div class="section-body">
      <p>
        కేస్ లేబుల్ మ్యాచ్ అయిన తర్వాత కింద ఉన్న మిగతా కేస్‌లను రన్ చేయకుండా ఆపడానికి తప్పనిసరిగా <code>break;</code> వాడాలి:
      </p>

      <div style="margin-top: 16px; margin-bottom: 12px;">
        <div style="font-size:13.5px; font-weight:700; color:#10b981; margin-bottom:6px;">💻 Example 1: Modern Menu-Driven Calculator</div>
        <div class="code-block">
          <div class="code-block-header">
            <span class="lang-tag">C++17</span>
            <a class="try-btn" href="/online-cpp-compiler.html">▶ Run in Compiler</a>
          </div>
          <pre><code>#include &lt;iostream&gt;

int main() {
    char operation = '+';
    double num1 = 12.0, num2 = 4.0;

    switch (operation) {
        case '+':
            std::cout &lt;&lt; "Sum: " &lt;&lt; (num1 + num2) &lt;&lt; "\\n";
            break;
        case '-':
            std::cout &lt;&lt; "Difference: " &lt;&lt; (num1 - num2) &lt;&lt; "\\n";
            break;
        case '*':
            std::cout &lt;&lt; "Product: " &lt;&lt; (num1 * num2) &lt;&lt; "\\n";
            break;
        case '/':
            if (num2 != 0) std::cout &lt;&lt; "Quotient: " &lt;&lt; (num1 / num2) &lt;&lt; "\\n";
            break;
        default:
            std::cout &lt;&lt; "Invalid Operator!\\n";
            break;
    }

    return 0;
}</code></pre>
        </div>
      </div>
    </div>

    <!-- SECTION 3: PITFALLS -->
    <div class="section-title"><span class="num">3</span>బిగినర్స్ చేసే ఘోరమైన తప్పులు (Beginner Pitfalls)</div>
    <div class="section-body">
      <div style="display:flex; flex-direction:column; gap:12px; margin:14px 0;">
        <div style="background:var(--bg2); border:1px solid rgba(239,68,68,0.3); border-left:4px solid #ef4444; border-radius:8px; padding:14px 18px;">
          <div style="font-weight:700; color:#ef4444; font-size:14px;">❌ Trap 1: strings లేదా floats ను switch లో వాడటం</div>
          <p style="font-size:13.5px; color:var(--text); margin:6px 0 0 0; line-height:1.6;">
            C++ లో <code>switch</code> కేవలం <strong>Integral Types</strong> (<code>int, char, enum, short, long</code>) పై మాత్రమే పనిచేస్తుంది. <code>std::string</code> లేదా <code>float/double</code> ను switch ఎక్స్‌ప్రెషన్‌లో వాడితే కంపైల్-టైమ్ ఎర్రర్ వస్తుంది. స్ట్రింగ్స్ కోసం <code>if-else</code> లేదా హాష్ మ్యాప్ వాడాలి.
          </p>
        </div>

        <div style="background:var(--bg2); border:1px solid rgba(239,68,68,0.3); border-left:4px solid #ef4444; border-radius:8px; padding:14px 18px;">
          <div style="font-weight:700; color:#ef4444; font-size:14px;">❌ Trap 2: Case లోపల వేరియబుల్స్ ఇనిషియలైజేషన్ (Cross-initialization Error)</div>
          <p style="font-size:13.5px; color:var(--text); margin:6px 0 0 0; line-height:1.6;">
            ఒక కేస్ లోపల <code>case 1: int x = 10; break;</code> అని రాస్తే, కంపైలర్ <em>"cross-initialization"</em> ఎర్రర్ ఇస్తుంది. ఎందుకంటే కేస్ 2 మ్యాచ్ అయితే <code>int x</code> డిక్లరేషన్‌ను దాటి వెళ్లిపోతుంది. పరిష్కారం: ఆ కేస్ కోడ్‌ను కర్లీ బ్రేసెస్ <code>case 1: { int x = 10; break; }</code> తో ఎన్‌క్లోజ్ చేసి లోకల్ స్కోప్ ఇవ్వాలి!
          </p>
        </div>
      </div>
    </div>

    <!-- PREV / NEXT NAVIGATION -->
    <div style="display:flex; justify-content:space-between; align-items:center; margin-top:40px; padding-top:20px; border-top:1px solid var(--border); flex-wrap:wrap; gap:16px;">
      <a href="/blog-cpp/05-cpp-if-else-conditionals.html" style="display:inline-flex; align-items:center; gap:8px; padding:10px 18px; border-radius:8px; background:var(--bg3); border:1px solid var(--border); color:var(--text); text-decoration:none; font-weight:700; font-size:13.5px;">
        ← Prev: 5. కండిషనల్స్
      </a>
      <a href="/blog-cpp/07-cpp-loops-for-while-do-while.html" style="display:inline-flex; align-items:center; gap:8px; padding:10px 20px; border-radius:8px; background:linear-gradient(135deg, #10b981, #059669); color:#ffffff; text-decoration:none; font-weight:700; font-size:13.5px; box-shadow:0 2px 10px rgba(16,185,129,0.2);">
        Next: 7. లూప్స్ (for, while) →
      </a>
    </div>

  </main>`;

replaceMainContent(path.join(cppDir, '06-cpp-switch-case.html'), ch06Main);

// ==========================================
// CHAPTER 07: LOOPS (for, while, do-while)
// ==========================================
const ch07Main = `<main class="content">
    <div class="breadcrumb">
      <a href="/">Home</a><span class="sep">›</span>
      <a href="/blog.html">Tutorials</a><span class="sep">›</span>
      <a href="/blog-cpp.html">C++ Masterclass</a><span class="sep">›</span>
      <span class="current">Chapter 7: Loops (for, while, do-while)</span>
    </div>

    <h1 class="page-title">లూప్స్ (for, while, do-while & Range-based for)</h1>

    <div class="page-meta">
      <span class="badge">⚡ Modern C++20 / C++17</span>
      <span class="badge">🟢 Chapter 7 of 20</span>
      <span class="badge">📂 Phase 2: Control Flow & Loops</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

    <!-- Covered Topics Bar -->
    <div style="background:var(--bg3); border:1px solid var(--border); border-radius:8px; padding:10px 16px; margin-bottom:24px; font-size:13px; color:var(--text2); display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
      <span style="color:#10b981; font-weight:700;">📌 Covered in this chapter:</span>
      <span>Repetition & Automation · The 4-Phase for Loop Execution Cycle · while vs do-while Comparison · Modern C++11 Range-based for Loop · Off-by-one Pitfalls · Performance Best Practices</span>
    </div>

    <!-- Intro Overview Box -->
    <div class="intro-box">
      కంప్యూటర్లకు మానవుల కంటే ఉన్న అతిపెద్ద బలం: <strong>విసుగు చెందకుండా ఒకే పనిని కోట్ల సార్లు అత్యంత వేగంగా పునరావృతం (Repeat) చేయడం</strong>. C++ లో క్లాసిక్ <code>for</code> లూప్, <code>while</code>, <code>do-while</code> మరియు మోడరన్ <code>Range-based for</code> లూప్‌ల పూర్తి అంతర్గత పనితీరును ఈ అధ్యాయంలో నేర్చుకుందాం.
    </div>

    <!-- SECTION 1 -->
    <div class="section-title"><span class="num">1</span>The Classic for Loop: 4 దశల చక్రం</div>
    <div class="section-body">
      <p>
        ఒక పని ఎన్ని సార్లు జరగాలో ముందే ఖచ్చితంగా తెలిసినప్పుడు (Known Iteration Count) <code>for</code> లూప్ వాడతాం. ఇది 4 దశల చక్రంలా తిరుగుతుంది:
      </p>

      <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px; margin:16px 0;">
        <ol style="margin:0 0 0 18px; line-height:1.8; font-size:13.5px; color:var(--text);">
          <li><strong>Step 1 (Initialization):</strong> లూప్ ప్రారంభంలో కేవలం ఒక్కసారి మాత్రమే జరుగుతుంది (ఉదా: <code>int i = 0;</code>).</li>
          <li><strong>Step 2 (Condition Check):</strong> ప్రతి రౌండ్ మొదట్లో కండిషన్ ట్రూ అయితేనే లోపలికి వెళ్తుంది (ఉదా: <code>i &lt; 5;</code>).</li>
          <li><strong>Step 3 (Loop Body Execution):</strong> బ్రాకెట్ల లోపల రాసిన కోడ్ ఎగ్జిక్యూట్ అవుతుంది.</li>
          <li><strong>Step 4 (Increment / Step):</strong> రౌండ్ ముగిసిన వెంటనే వేరియబుల్ అప్‌డేట్ అవుతుంది (ఉదా: <code>++i</code>), ఆపై తిరిగి Step 2 కి వెళ్తుంది.</li>
        </ol>
      </div>

      <div style="margin-top: 16px; margin-bottom: 12px;">
        <div style="font-size:13.5px; font-weight:700; color:#10b981; margin-bottom:6px;">💻 Example 1: Classic for Loop Execution</div>
        <div class="code-block">
          <div class="code-block-header">
            <span class="lang-tag">C++17</span>
            <a class="try-btn" href="/online-cpp-compiler.html">▶ Run in Compiler</a>
          </div>
          <pre><code>#include &lt;iostream&gt;

int main() {
    // 1 నుండి 5 వరకు సంఖ్యల కూడిక
    int sum = 0;
    for (int i = 1; i &lt;= 5; ++i) {
        sum += i;
        std::cout &lt;&lt; "Step " &lt;&lt; i &lt;&lt; ": Running Total = " &lt;&lt; sum &lt;&lt; "\\n";
    }

    std::cout &lt;&lt; "Final Sum: " &lt;&lt; sum &lt;&lt; "\\n";
    return 0;
}</code></pre>
        </div>
      </div>
    </div>

    <!-- SECTION 2 -->
    <div class="section-title"><span class="num">2</span>while vs do-while: ఎంట్రీ vs ఎగ్జిట్ కంట్రోల్</div>
    <div class="section-body">
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:16px; margin:16px 0;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #10b981; border-radius:8px; padding:16px;">
          <h4 style="color:#10b981; margin:0 0 8px 0; font-size:14.5px;">while Loop (Entry-Controlled)</h4>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.6;">
            కండిషన్ మొదట్లోనే తనిఖీ చేయబడుతుంది. మొదటి ప్రయత్నంలోనే కండిషన్ ఫాల్స్ అయితే లూప్ బాడీ ఒక్కసారి కూడా రన్ అవ్వదు!
          </p>
        </div>
        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #3b82f6; border-radius:8px; padding:16px;">
          <h4 style="color:#3b82f6; margin:0 0 8px 0; font-size:14.5px;">do-while Loop (Exit-Controlled)</h4>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.6;">
            కండిషన్ చివర్లో తనిఖీ చేయబడుతుంది. కండిషన్ ఫాల్స్ అయినా సరే, లూప్ బాడీ <strong>కనీసం ఒక్కసారి కచ్చితంగా</strong> ఎగ్జిక్యూట్ అవుతుంది (ఉదా: ATM పిన్ ఎంటర్ ప్రాంప్ట్).
          </p>
        </div>
      </div>
    </div>

    <!-- SECTION 3: RANGE BASED FOR -->
    <div class="section-title"><span class="num">3</span>Modern C++11 Range-based for Loop</div>
    <div class="section-body">
      <p>
        అర్రేలు లేదా వెక్టార్లలోని ప్రతి ఎలిమెంట్‌ను చదవడానికి ఇండెక్స్ <code>i = 0; i &lt; n</code> రాయాల్సిన అవసరం లేకుండా క్లీన్‌గా చదవడానికి మోడరన్ C++ Range-for లూప్‌ను ఇస్తుంది:
      </p>

      <div style="margin-top: 16px; margin-bottom: 12px;">
        <div style="font-size:13.5px; font-weight:700; color:#10b981; margin-bottom:6px;">💻 Example 2: Range-based for Loop</div>
        <div class="code-block">
          <div class="code-block-header">
            <span class="lang-tag">C++17</span>
            <a class="try-btn" href="/online-cpp-compiler.html">▶ Run in Compiler</a>
          </div>
          <pre><code>#include &lt;iostream&gt;

int main() {
    int primes[] = {2, 3, 5, 7, 11, 13};

    // const auto& వాడటం వల్ల కాపీ అవ్వదు, మెమరీ సేవ్ అవుతుంది
    for (const auto& num : primes) {
        std::cout &lt;&lt; num &lt;&lt; " ";
    }
    std::cout &lt;&lt; "\\n";
    return 0;
}</code></pre>
        </div>
      </div>
    </div>

    <!-- PREV / NEXT NAVIGATION -->
    <div style="display:flex; justify-content:space-between; align-items:center; margin-top:40px; padding-top:20px; border-top:1px solid var(--border); flex-wrap:wrap; gap:16px;">
      <a href="/blog-cpp/06-cpp-switch-case.html" style="display:inline-flex; align-items:center; gap:8px; padding:10px 18px; border-radius:8px; background:var(--bg3); border:1px solid var(--border); color:var(--text); text-decoration:none; font-weight:700; font-size:13.5px;">
        ← Prev: 6. switch స్టేట్‌మెంట్
      </a>
      <a href="/blog-cpp/08-cpp-break-continue.html" style="display:inline-flex; align-items:center; gap:8px; padding:10px 20px; border-radius:8px; background:linear-gradient(135deg, #10b981, #059669); color:#ffffff; text-decoration:none; font-weight:700; font-size:13.5px; box-shadow:0 2px 10px rgba(16,185,129,0.2);">
        Next: 8. break & continue →
      </a>
    </div>

  </main>`;

replaceMainContent(path.join(cppDir, '07-cpp-loops-for-while-do-while.html'), ch07Main);

// ==========================================
// CHAPTER 08: BREAK & CONTINUE
// ==========================================
const ch08Main = `<main class="content">
    <div class="breadcrumb">
      <a href="/">Home</a><span class="sep">›</span>
      <a href="/blog.html">Tutorials</a><span class="sep">›</span>
      <a href="/blog-cpp.html">C++ Masterclass</a><span class="sep">›</span>
      <span class="current">Chapter 8: break, continue & Loop Control</span>
    </div>

    <h1 class="page-title">break, continue & లూప్ కంట్రోల్ (Loop Flow Control)</h1>

    <div class="page-meta">
      <span class="badge">⚡ Modern C++20 / C++17</span>
      <span class="badge">🟢 Chapter 8 of 20</span>
      <span class="badge">📂 Phase 2: Control Flow & Loops</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

    <!-- Covered Topics Bar -->
    <div style="background:var(--bg3); border:1px solid var(--border); border-radius:8px; padding:10px 16px; margin-bottom:24px; font-size:13px; color:var(--text2); display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
      <span style="color:#10b981; font-weight:700;">📌 Covered in this chapter:</span>
      <span>Early Loop Termination with break · Skipping Iterations with continue · The while Loop continue Trap · Breaking Out of Nested Loops · Clean Refactoring Strategies · goto Controversy</span>
    </div>

    <!-- Intro Overview Box -->
    <div class="intro-box">
      లూప్ 10,000 సార్లు నడవాలని రాసినప్పటికీ, మనకు కావాల్సిన ఫలితం 3వ రౌండ్‌లోనే దొరికితే మిగిలిన 9,997 రౌండ్లు సమయం వేస్ట్ చేయడం మూర్ఖత్వం. ప్రోగ్రామ్ రన్ అవుతున్నప్పుడు లూప్‌ను మధ్యలోనే ఆపేయడానికి (<code>break</code>), లేదా నిర్దిష్ట చెత్త డేటా వచ్చినప్పుడు ఆ ఒక్క రౌండ్‌ను మాత్రమే దాటేయడానికి (<code>continue</code>) ఉపయోగపడే <strong>Loop Control Statements</strong> గురించి ఈ అధ్యాయంలో నేర్చుకుందాం.
    </div>

    <!-- SECTION 1 -->
    <div class="section-title"><span class="num">1</span>The break Statement (తక్షణ లూప్ రద్దు)</div>
    <div class="section-body">
      <p>
        లూప్ కండిషన్ ఇంకా true గా ఉన్నప్పటికీ, <code>break;</code> ఎదురైన వెంటనే ఆ లూప్ అక్కడికక్కడే ముగిసిపోయి కర్సర్ బయటకు వచ్చేస్తుంది:
      </p>

      <div style="margin-top: 16px; margin-bottom: 12px;">
        <div style="font-size:13.5px; font-weight:700; color:#10b981; margin-bottom:6px;">💻 Example 1: Linear Search with Early Exit</div>
        <div class="code-block">
          <div class="code-block-header">
            <span class="lang-tag">C++17</span>
            <a class="try-btn" href="/online-cpp-compiler.html">▶ Run in Compiler</a>
          </div>
          <pre><code>#include &lt;iostream&gt;

int main() {
    int rollNumbers[] = {101, 108, 125, 142, 160, 185};
    int target = 142;

    for (int i = 0; i &lt; 6; ++i) {
        if (rollNumbers[i] == target) {
            std::cout &lt;&lt; "Target Student " &lt;&lt; target &lt;&lt; " FOUND at index: " &lt;&lt; i &lt;&lt; " 🎯\\n";
            break; // దొరికాడు, ఇక మిగతా అరే చూడాల్సిన పనిలేదు!
        }
    }

    return 0;
}</code></pre>
        </div>
      </div>
    </div>

    <!-- SECTION 2 -->
    <div class="section-title"><span class="num">2</span>The continue Statement (ప్రస్తుత రౌండ్ మాత్రమే దాటవేయడం)</div>
    <div class="section-body">
      <p>
        <code>continue;</code> ఎదురైనప్పుడు లూప్ మొత్తం ఆగదు! కేవలం ఆ ఒక్క రౌండ్‌లో కింద ఉన్న మిగతా కోడ్‌ను స్కిప్ చేసి, నేరుగా తదుపరి రౌండ్ (Next Iteration) కు వెళ్లిపోతుంది:
      </p>

      <div style="margin-top: 16px; margin-bottom: 12px;">
        <div style="font-size:13.5px; font-weight:700; color:#10b981; margin-bottom:6px;">💻 Example 2: Skipping Invalid Data</div>
        <div class="code-block">
          <div class="code-block-header">
            <span class="lang-tag">C++17</span>
            <a class="try-btn" href="/online-cpp-compiler.html">▶ Run in Compiler</a>
          </div>
          <pre><code>#include &lt;iostream&gt;

int main() {
    // కేవలం ధనాత్మక (Positive) సంఖ్యల మొత్తం మాత్రమే కనుక్కోవడం
    int data[] = {10, -5, 20, -8, 30};
    int total = 0;

    for (int i = 0; i &lt; 5; ++i) {
        if (data[i] &lt; 0) {
            continue; // నెగెటివ్ వస్తే స్కిప్ చేసి నెక్స్ట్ ఎలిమెంట్‌కి వెళ్ళు!
        }
        total += data[i];
    }

    std::cout &lt;&lt; "Positive Sum: " &lt;&lt; total &lt;&lt; "\\n";
    return 0;
}</code></pre>
        </div>
      </div>
    </div>

    <!-- SECTION 3: PITFALLS -->
    <div class="section-title"><span class="num">3</span>ది డేంజరస్ while Loop + continue ఇన్ఫినిట్ లూప్ ట్రాప్!</div>
    <div class="section-body">
      <div style="background:var(--bg2); border:1px solid rgba(239,68,68,0.3); border-left:4px solid #ef4444; border-radius:8px; padding:14px 18px; margin:14px 0;">
        <div style="font-weight:700; color:#ef4444; font-size:14px;">❌ The Infinite Loop Bug:</div>
        <p style="font-size:13.5px; color:var(--text); margin:6px 0 0 0; line-height:1.6;">
          <code>while (i &lt; 10) { if (i == 5) continue; ++i; }</code> అని రాస్తే, <code>i</code> విలువ 5 అయినప్పుడు <code>continue</code> జరిగి <code>++i</code> ని దాటేస్తుంది! తర్వాతి రౌండ్‌లో మళ్లీ <code>i</code> 5 గానే ఉంటుంది, మళ్లీ continue అవుతుంది... ఇలా ప్రోగ్రామ్ అనంతమైన లూప్‌లో చిక్కుకుపోతుంది. ఎల్లప్పుడూ <code>continue;</code> రాసే ముందే ఇంక్రిమెంట్ చేయాలి!
        </p>
      </div>
    </div>

    <!-- PREV / NEXT NAVIGATION -->
    <div style="display:flex; justify-content:space-between; align-items:center; margin-top:40px; padding-top:20px; border-top:1px solid var(--border); flex-wrap:wrap; gap:16px;">
      <a href="/blog-cpp/07-cpp-loops-for-while-do-while.html" style="display:inline-flex; align-items:center; gap:8px; padding:10px 18px; border-radius:8px; background:var(--bg3); border:1px solid var(--border); color:var(--text); text-decoration:none; font-weight:700; font-size:13.5px;">
        ← Prev: 7. లూప్స్
      </a>
      <a href="/blog-cpp/09-cpp-functions-and-overloading.html" style="display:inline-flex; align-items:center; gap:8px; padding:10px 20px; border-radius:8px; background:linear-gradient(135deg, #10b981, #059669); color:#ffffff; text-decoration:none; font-weight:700; font-size:13.5px; box-shadow:0 2px 10px rgba(16,185,129,0.2);">
        Next: 9. ఫంక్షన్స్ & ఓవర్‌లోడింగ్ →
      </a>
    </div>

  </main>`;

replaceMainContent(path.join(cppDir, '08-cpp-break-continue.html'), ch08Main);

