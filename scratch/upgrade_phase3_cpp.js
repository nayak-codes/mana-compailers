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
// CHAPTER 09: FUNCTIONS & OVERLOADING
// ==========================================
const ch09Main = `<main class="content">
    <div class="breadcrumb">
      <a href="/">Home</a><span class="sep">›</span>
      <a href="/blog.html">Tutorials</a><span class="sep">›</span>
      <a href="/blog-cpp.html">C++ Masterclass</a><span class="sep">›</span>
      <span class="current">Chapter 9: Functions & Function Overloading</span>
    </div>

    <h1 class="page-title">ఫంక్షన్స్ & ఫంక్షన్ ఓవర్‌లోడింగ్ (Functions, Call Stack & Overloading)</h1>

    <div class="page-meta">
      <span class="badge">⚡ Modern C++20 / C++17</span>
      <span class="badge">🟢 Chapter 9 of 20</span>
      <span class="badge">📂 Phase 3: Functions, Memory & Pointers</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

    <!-- Covered Topics Bar -->
    <div style="background:var(--bg3); border:1px solid var(--border); border-radius:8px; padding:10px 16px; margin-bottom:24px; font-size:13px; color:var(--text2); display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
      <span style="color:#10b981; font-weight:700;">📌 Covered in this chapter:</span>
      <span>DRY Principle · Function Declarations vs Definitions · Call Stack Architecture in RAM · Pass-by-Value vs Pass-by-Reference (&) · const Reference Performance Secret · Function Overloading & Name Mangling</span>
    </div>

    <!-- Intro Overview Box -->
    <div class="intro-box">
      వేలాది లైన్ల సంక్లిష్టమైన సాఫ్ట్‌వేర్‌ను చిన్న చిన్న స్వతంత్ర భాగాలుగా విభజించి, రాసిన కోడ్‌ను మళ్లీ మళ్లీ రీయూజ్ చేసుకోవడానికి <strong>ఫంక్షన్స్ (Functions)</strong> వెన్నెముక వంటివి. కంప్యూటర్ RAM లో <strong>Call Stack</strong> ఎలా పెరుగుతుంది, పారామీటర్లను పాస్ చేసేటప్పుడు మెమరీ కాపీ అవ్వకుండా <code>const &amp;</code> తో ఎలా ఆప్టిమైజ్ చేయాలి, మరియు కంపైలర్ <strong>Name Mangling</strong> ద్వారా ఫంక్షన్ ఓవర్‌లోడింగ్‌ను ఎలా అమలు చేస్తుందో ఈ అధ్యాయంలో సమగ్రంగా నేర్చుకుందాం.
    </div>

    <!-- SECTION 1 -->
    <div class="section-title"><span class="num">1</span>ఫంక్షన్ అనాటమీ & ఫార్వర్డ్ డిక్లరేషన్</div>
    <div class="section-body">
      <p>
        ఒక ఫంక్షన్‌లో నాలుగు ముఖ్యమైన భాగాలు ఉంటాయి: <strong>Return Type</strong>, <strong>Function Name</strong>, <strong>Parameter List</strong>, మరియు <strong>Function Body</strong>.
      </p>

      <div class="concept-box">
        <h4>⚠️ Function Prototype (Forward Declaration) ఎందుకు అవసరం?</h4>
        <p style="margin:0;">
          C++ కంపైలర్ కోడ్‌ను పై నుండి కిందకి (Top-to-Bottom) చదువుతుంది. <code>main()</code> కింద మీరు ఒక ఫంక్షన్ రాసి, <code>main()</code> లోపల దాన్ని కాల్ చేస్తే కంపైలర్‌కు అది ఇంకా పరిచయం కాలేదు కాబట్టి <em>"identifier not found"</em> ఎర్రర్ వస్తుంది. అందుకే ఫైల్ ప్రారంభంలో <code>int calculateSum(int a, int b);</code> అని కేవలం సిగ్నేచర్‌ను మాత్రమే డిక్లేర్ చేయడాన్ని <strong>Function Prototype</strong> అంటారు.
        </p>
      </div>
    </div>

    <!-- SECTION 2: CALL STACK VISUALIZATION (REPLACED ASCII WITH CLEAN CARDS) -->
    <div class="section-title"><span class="num">2</span>హార్డ్‌వేర్ కాల్ స్టాక్ (Call Stack & Activation Records)</div>
    <div class="section-body">
      <p>
        ఒక ఫంక్షన్ కాల్ అయినప్పుడు కంప్యూటర్ RAM లోని <strong>Stack Memory</strong> లో ఒక ప్రత్యేకమైన గది (Stack Frame / Activation Record) కేటాయించబడుతుంది:
      </p>

      <!-- Sleek Modern Visual Call Stack Cards -->
      <div style="background:var(--bg2); border:1px solid var(--border); border-radius:10px; padding:18px 20px; margin:20px 0;">
        <div style="font-size:12px; font-weight:800; color:#10b981; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:12px;">
          🥞 RAM Call Stack Visualization (LIFO Order):
        </div>
        <div style="display:flex; flex-direction:column; gap:8px;">
          <div style="background:var(--bg3); border:1px solid rgba(236,72,153,0.4); border-left:4px solid #ec4899; border-radius:6px; padding:12px; display:flex; justify-content:space-between; align-items:center;">
            <div>
              <strong style="color:var(--text); font-size:13.5px;">Stack Frame 3: computeInterest(double, int)</strong>
              <div style="font-size:12px; color:var(--text2); margin-top:2px;">Local Vars: rate = 7.5, years = 5 | Return Address: line 42</div>
            </div>
            <span style="font-size:11px; background:rgba(236,72,153,0.15); color:#ec4899; padding:3px 8px; border-radius:4px; font-weight:700;">Stack Top (Active)</span>
          </div>

          <div style="background:var(--bg3); border:1px solid rgba(59,130,246,0.3); border-left:4px solid #3b82f6; border-radius:6px; padding:12px; display:flex; justify-content:space-between; align-items:center;">
            <div>
              <strong style="color:var(--text); font-size:13.5px;">Stack Frame 2: processLoanApplication()</strong>
              <div style="font-size:12px; color:var(--text2); margin-top:2px;">Local Vars: applicantId = 9410 | Paused waiting for computeInterest</div>
            </div>
            <span style="font-size:11px; color:#3b82f6; font-weight:700;">Paused</span>
          </div>

          <div style="background:var(--bg3); border:1px solid var(--border); border-left:4px solid #10b981; border-radius:6px; padding:12px; display:flex; justify-content:space-between; align-items:center;">
            <div>
              <strong style="color:var(--text); font-size:13.5px;">Stack Frame 1: int main()</strong>
              <div style="font-size:12px; color:var(--text2); margin-top:2px;">Entry Point | Program Args | Local Variables</div>
            </div>
            <span style="font-size:11px; color:#10b981; font-weight:700;">Root</span>
          </div>
        </div>
      </div>
    </div>

    <!-- SECTION 3: PASS BY VALUE VS PASS BY REFERENCE -->
    <div class="section-title"><span class="num">3</span>Pass-by-Value vs Pass-by-Reference (&)</div>
    <div class="section-body">
      <p>
        ఫంక్షన్‌కు ఆర్గ్యుమెంట్లను పంపే విధానం మీ ప్రోగ్రామ్ స్పీడ్‌ను మరియు ఫలితాన్ని సమూలంగా మారుస్తుంది:
      </p>

      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:16px; margin:16px 0;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px;">
          <h4 style="color:#f59e0b; margin:0 0 8px 0; font-size:14px;">📦 Pass-by-Value (విలువ కాపీ చేయడం)</h4>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.6;">
            ఒరిజినల్ వేరియబుల్ యొక్క డూప్లికేట్ కాపీ తయారవుతుంది. ఫంక్షన్ లోపల మార్పులు చేస్తే కేవలం ఆ కాపీ మాత్రమే మారుతుంది, ఒరిజినల్ వేరియబుల్ అలాగే ఉంటుంది. భారీ ఆబ్జెక్టులను కాపీ చేస్తే మెమరీ వేస్ట్ అవుతుంది.
          </p>
        </div>
        <div style="background:var(--bg2); border:1px solid #10b981; border-radius:8px; padding:16px;">
          <h4 style="color:#10b981; margin:0 0 8px 0; font-size:14px;">⚡ Pass-by-Reference: Type& (అసలు మెమరీని ఇవ్వడం)</h4>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.6;">
            ఎటువంటి కాపీ తయారు కాదు! ఒరిజినల్ మెమరీ అడ్రస్‌కే మరొక మారుపేరు (Alias) క్రియేట్ అవుతుంది. ఫంక్షన్‌లో చేసే ప్రతి మార్పు ఒరిజినల్ వేరియబుల్ పైన నేరుగా ప్రతిఫలిస్తుంది. జీరో మెమరీ ఓవర్‌హెడ్!
          </p>
        </div>
      </div>

      <div style="margin-top: 16px; margin-bottom: 12px;">
        <div style="font-size:13.5px; font-weight:700; color:#10b981; margin-bottom:6px;">💻 Example 1: Swapping Numbers with Pass-by-Reference</div>
        <div class="code-block">
          <div class="code-block-header">
            <span class="lang-tag">C++17</span>
            <a class="try-btn" href="/online-cpp-compiler.html">▶ Run in Compiler</a>
          </div>
          <pre><code>#include &lt;iostream&gt;

// & గుర్తు ఉండటం వల్ల నేరుగా ఒరిజినల్ వేరియబుల్స్ మారుతాయి
void swapNumbers(int& x, int& y) {
    int temp = x;
    x = y;
    y = temp;
}

int main() {
    int a = 10, b = 99;
    std::cout &lt;&lt; "Before: a = " &lt;&lt; a &lt;&lt; ", b = " &lt;&lt; b &lt;&lt; "\\n";
    
    swapNumbers(a, b);
    
    std::cout &lt;&lt; "After:  a = " &lt;&lt; a &lt;&lt; ", b = " &lt;&lt; b &lt;&lt; " (Swapped! 🚀)\\n";
    return 0;
}</code></pre>
        </div>
      </div>

      <div class="concept-box">
        <h4>💡 The Gold Standard: const Type& (రీడ్-ఓన్లీ రిఫరెన్స్)</h4>
        <p style="margin:0;">
          ఒకవేళ మీరు ఫంక్షన్‌లో విలువను మార్చకూడదు, కానీ కాపీ చేయడం వల్ల మెమరీ వేస్ట్ కూడా అవ్వకూడదు అనుకుంటే: <strong>const std::string&amp; str</strong> వాడాలి. C++ ఇండస్ట్రీలో ఇది అత్యంత విస్తృతంగా ఉపయోగించే గోల్డెన్ బెస్ట్ ప్రాక్టీస్!
        </p>
      </div>
    </div>

    <!-- SECTION 4: FUNCTION OVERLOADING & NAME MANGLING -->
    <div class="section-title"><span class="num">4</span>ఫంక్షన్ ఓవర్‌లోడింగ్ & Name Mangling రహస్యం</div>
    <div class="section-body">
      <p>
        ఒకే పేరుతో బహుళ ఫంక్షన్లను రాసే సదుపాయాన్ని <strong>Function Overloading</strong> అంటారు. అయితే పారామీటర్ల సంఖ్య లేదా వాటి డేటా టైపులు తప్పనిసరిగా వేరుగా ఉండాలి:
      </p>

      <div style="margin-top: 16px; margin-bottom: 12px;">
        <div style="font-size:13.5px; font-weight:700; color:#10b981; margin-bottom:6px;">💻 Example 2: Overloaded add() Function</div>
        <div class="code-block">
          <div class="code-block-header">
            <span class="lang-tag">C++17</span>
            <a class="try-btn" href="/online-cpp-compiler.html">▶ Run in Compiler</a>
          </div>
          <pre><code>#include &lt;iostream&gt;

int add(int a, int b) { return a + b; }
double add(double a, double b) { return a + b; }
int add(int a, int b, int c) { return a + b + c; }

int main() {
    std::cout &lt;&lt; "Integers: " &lt;&lt; add(10, 20) &lt;&lt; "\\n"
              &lt;&lt; "Doubles:  " &lt;&lt; add(4.5, 2.5) &lt;&lt; "\\n"
              &lt;&lt; "3 Params: " &lt;&lt; add(1, 2, 3) &lt;&lt; "\\n";
    return 0;
}</code></pre>
        </div>
      </div>

      <div class="concept-box">
        <h4>🔬 Name Mangling అంటే ఏమిటి?</h4>
        <p style="margin:0;">
          CPU బైనరీ లెవల్‌లో రెండు ఫంక్షన్లకు ఒకే పేరు ఉండటానికి వీల్లేదు. అందుకే C++ కంపైలర్ ఫంక్షన్ పేరుతో పాటు పారామీటర్ల టైపులను కలిపి ఒక ప్రత్యేకమైన అంతర్గత గుర్తుగా మారుస్తుంది. ఉదాహరణకు <code>add(int, int)</code> ను కంపైలర్ లోపల <code>_Z3addii</code> గాను, <code>add(double, double)</code> ను <code>_Z3adddd</code> గాను మారుస్తుంది! దాన్నే <strong>Name Mangling</strong> అంటారు.
        </p>
      </div>
    </div>

    <!-- PREV / NEXT NAVIGATION -->
    <div style="display:flex; justify-content:space-between; align-items:center; margin-top:40px; padding-top:20px; border-top:1px solid var(--border); flex-wrap:gap:16px;">
      <a href="/blog-cpp/08-cpp-break-continue.html" style="display:inline-flex; align-items:center; gap:8px; padding:10px 18px; border-radius:8px; background:var(--bg3); border:1px solid var(--border); color:var(--text); text-decoration:none; font-weight:700; font-size:13.5px;">
        ← Prev: 8. break & continue
      </a>
      <a href="/blog-cpp/10-cpp-arrays-and-strings.html" style="display:inline-flex; align-items:center; gap:8px; padding:10px 20px; border-radius:8px; background:linear-gradient(135deg, #10b981, #059669); color:#ffffff; text-decoration:none; font-weight:700; font-size:13.5px; box-shadow:0 2px 10px rgba(16,185,129,0.2);">
        Next: 10. అర్రేస్ & std::string →
      </a>
    </div>

  </main>`;

replaceMainContent(path.join(cppDir, '09-cpp-functions-and-overloading.html'), ch09Main);

// ==========================================
// CHAPTER 10: ARRAYS & STD::STRING
// ==========================================
const ch10Main = `<main class="content">
    <div class="breadcrumb">
      <a href="/">Home</a><span class="sep">›</span>
      <a href="/blog.html">Tutorials</a><span class="sep">›</span>
      <a href="/blog-cpp.html">C++ Masterclass</a><span class="sep">›</span>
      <span class="current">Chapter 10: Arrays & std::string</span>
    </div>

    <h1 class="page-title">అర్రేస్ (Arrays) & std::string (Fixed Buffers, Memory & Strings)</h1>

    <div class="page-meta">
      <span class="badge">⚡ Modern C++20 / C++17</span>
      <span class="badge">🟢 Chapter 10 of 20</span>
      <span class="badge">📂 Phase 3: Functions, Memory & Pointers</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

    <!-- Covered Topics Bar -->
    <div style="background:var(--bg3); border:1px solid var(--border); border-radius:8px; padding:10px 16px; margin-bottom:24px; font-size:13px; color:var(--text2); display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
      <span style="color:#10b981; font-weight:700;">📌 Covered in this chapter:</span>
      <span>Contiguous RAM Memory Layout · Multi-dimensional 2D Arrays & Row-Major Order · Array Decay to Pointer Trap · C-Strings vs Modern std::string · Small String Optimization (SSO) · C++17 std::string_view</span>
    </div>

    <!-- Intro Overview Box -->
    <div class="intro-box">
      వేలాది ఒకే రకమైన సమాచారాన్ని (ఉదా: 50 మంది విద్యార్థుల మార్కులు, గేమ్ స్క్రీన్ పిక్సెల్స్) భద్రపరచడానికి RAM లో వరుసగా ఉండే ఖాళీలను కేటాయించే పద్ధతిని <strong>అర్రేస్ (Arrays)</strong> అంటారు. C-స్టైల్ డేంజరస్ బఫర్ ఓవర్‌ఫ్లోలు, ఆధునిక <strong>std::string</strong> పనితీరు మరియు జీరో-అలొకేషన్ <strong>std::string_view</strong> గురించి ఈ అధ్యాయంలో నేర్చుకుందాం.
    </div>

    <!-- SECTION 1: MEMORY LAYOUT (REPLACED ASCII WITH CLEAN CARDS) -->
    <div class="section-title"><span class="num">1</span>అర్రేస్ యొక్క అంతర్గత RAM లేఅవుట్ (Contiguous Allocation)</div>
    <div class="section-body">
      <p>
        అర్రేలోని ఎలిమెంట్స్ అన్నీ RAM లో ఒకదాని పక్కన ఒకటి వరుసగా (Contiguous Memory) ఉంటాయి. కాబట్టి ఇండెక్స్ తెలిస్తే మొదటి ఎలిమెంట్ అడ్రస్ నుండి డైరెక్ట్‌గా ఆ స్థలానికి క్షణంలో వెళ్లిపోవచ్చు:
      </p>

      <!-- Sleek Modern Array Memory Cells -->
      <div style="background:var(--bg2); border:1px solid var(--border); border-radius:10px; padding:18px 20px; margin:20px 0;">
        <div style="font-size:12px; font-weight:800; color:#10b981; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:12px;">
          📊 int scores[4] = {95, 82, 74, 88}; (4 Bytes Per Slot):
        </div>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:10px;">
          <div style="background:var(--bg3); border:1px solid rgba(16,185,129,0.3); border-top:3px solid #10b981; border-radius:6px; padding:10px; text-align:center;">
            <div style="font-size:11px; color:#10b981; font-family:var(--font-mono);">Index [0]</div>
            <div style="font-size:18px; font-weight:800; color:var(--text); margin:4px 0;">95</div>
            <div style="font-size:10.5px; color:var(--text2); font-family:var(--font-mono);">0x1000</div>
          </div>
          <div style="background:var(--bg3); border:1px solid rgba(16,185,129,0.3); border-top:3px solid #10b981; border-radius:6px; padding:10px; text-align:center;">
            <div style="font-size:11px; color:#10b981; font-family:var(--font-mono);">Index [1]</div>
            <div style="font-size:18px; font-weight:800; color:var(--text); margin:4px 0;">82</div>
            <div style="font-size:10.5px; color:var(--text2); font-family:var(--font-mono);">0x1004</div>
          </div>
          <div style="background:var(--bg3); border:1px solid rgba(16,185,129,0.3); border-top:3px solid #10b981; border-radius:6px; padding:10px; text-align:center;">
            <div style="font-size:11px; color:#10b981; font-family:var(--font-mono);">Index [2]</div>
            <div style="font-size:18px; font-weight:800; color:var(--text); margin:4px 0;">74</div>
            <div style="font-size:10.5px; color:var(--text2); font-family:var(--font-mono);">0x1008</div>
          </div>
          <div style="background:var(--bg3); border:1px solid rgba(16,185,129,0.3); border-top:3px solid #10b981; border-radius:6px; padding:10px; text-align:center;">
            <div style="font-size:11px; color:#10b981; font-family:var(--font-mono);">Index [3]</div>
            <div style="font-size:18px; font-weight:800; color:var(--text); margin:4px 0;">88</div>
            <div style="font-size:10.5px; color:var(--text2); font-family:var(--font-mono);">0x100C</div>
          </div>
        </div>
      </div>
    </div>

    <!-- SECTION 2: ARRAY DECAY TRAP -->
    <div class="section-title"><span class="num">2</span>The Array Decay Trap (ఫంక్షన్లకు అర్రేను పంపే ప్రమాదం)</div>
    <div class="section-body">
      <div style="background:var(--bg2); border:1px solid rgba(239,68,68,0.3); border-left:4px solid #ef4444; border-radius:8px; padding:14px 18px; margin:14px 0;">
        <div style="font-weight:700; color:#ef4444; font-size:14px;">⚠️ Array Decay అంటే ఏమిటి?</div>
        <p style="font-size:13.5px; color:var(--text); margin:6px 0 0 0; line-height:1.6;">
          C++ లో ఒక అర్రేను ఫంక్షన్‌కు పాస్ చేసినప్పుడు, అది అర్రే యొక్క పూర్తి సైజును గుర్తుంచుకోదు! అది కేవలం మొదటి ఎలిమెంట్ యొక్క పాయింటర్‌గా క్షీణించిపోతుంది (Decays to a pointer). ఫంక్షన్ లోపల <code>sizeof(arr)</code> అని రాస్తే మొత్తం అర్రే సైజు రాదు, కేవలం పాయింటర్ సైజు (8 బైట్లు) మాత్రమే వస్తుంది! అందుకే అర్రేతో పాటు దాని సైజును కూడా విడిగా పాస్ చేయాలి లేదా ఆధునిక <code>std::vector</code> వాడాలి.
        </p>
      </div>
    </div>

    <!-- SECTION 3: C-STRINGS VS STD::STRING -->
    <div class="section-title"><span class="num">3</span>C-Strings vs Modern std::string (SSO Secret)</div>
    <div class="section-body">
      <p>
        పాత C-స్టైల్ స్ట్రింగ్స్ కేవలం <code>char str[] = "Hi";</code> రూపంలో <code>'\\0'</code> (నల్ టెర్మినేటర్) తో ముగుస్తాయి. కానీ బఫర్ నిండిపోతే మెమరీ క్రాష్ అవుతుంది. Modern C++ ఇచ్చే <strong>std::string</strong> ఆటోమేటిక్‌గా డైనమిక్ మెమరీని పెంచుకుంటుంది:
      </p>

      <div class="concept-box">
        <h4>🚀 Small String Optimization (SSO)</h4>
        <p style="margin:0;">
          మీరు ఒక చిన్న స్ట్రింగ్ (15 క్యారెక్టర్ల కంటే తక్కువ) రాసినప్పుడు, <code>std::string</code> హీప్ మెమరీ (Heap Allocation) వద్దకు వెళ్లదు! స్టాక్ మెమరీలోని తన స్వంత లోకల్ బఫర్‌లోనే ఉంచుకుంటుంది. దీనివల్ల C++ స్ట్రింగ్స్ మెరుపు వేగంతో రన్ అవుతాయి.
        </p>
      </div>

      <div style="margin-top: 16px; margin-bottom: 12px;">
        <div style="font-size:13.5px; font-weight:700; color:#10b981; margin-bottom:6px;">💻 Example 1: Modern std::string Operations</div>
        <div class="code-block">
          <div class="code-block-header">
            <span class="lang-tag">C++17</span>
            <a class="try-btn" href="/online-cpp-compiler.html">▶ Run in Compiler</a>
          </div>
          <pre><code>#include &lt;iostream&gt;
#include &lt;string&gt;

int main() {
    std::string text = "C++ Masterclass";
    
    // Length & Substrings
    std::cout &lt;&lt; "Length: " &lt;&lt; text.length() &lt;&lt; " characters\\n";
    std::cout &lt;&lt; "Sub-slice: " &lt;&lt; text.substr(0, 3) &lt;&lt; "\\n";

    // Safe Modification
    text.append(" 2026 Edition 🚀");
    std::cout &lt;&lt; text &lt;&lt; "\\n";
    return 0;
}</code></pre>
        </div>
      </div>
    </div>

    <!-- PREV / NEXT NAVIGATION -->
    <div style="display:flex; justify-content:space-between; align-items:center; margin-top:40px; padding-top:20px; border-top:1px solid var(--border); flex-wrap:wrap; gap:16px;">
      <a href="/blog-cpp/09-cpp-functions-and-overloading.html" style="display:inline-flex; align-items:center; gap:8px; padding:10px 18px; border-radius:8px; background:var(--bg3); border:1px solid var(--border); color:var(--text); text-decoration:none; font-weight:700; font-size:13.5px;">
        ← Prev: 9. ఫంక్షన్స్ & ఓవర్‌లోడింగ్
      </a>
      <a href="/blog-cpp/11-cpp-pointers-and-references.html" style="display:inline-flex; align-items:center; gap:8px; padding:10px 20px; border-radius:8px; background:linear-gradient(135deg, #10b981, #059669); color:#ffffff; text-decoration:none; font-weight:700; font-size:13.5px; box-shadow:0 2px 10px rgba(16,185,129,0.2);">
        Next: 11. పాయింటర్లు & రిఫరెన్సెస్ →
      </a>
    </div>

  </main>`;

replaceMainContent(path.join(cppDir, '10-cpp-arrays-and-strings.html'), ch10Main);

