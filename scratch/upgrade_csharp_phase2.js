const fs = require('fs');
const path = require('path');
const { LESSONS } = require('./csharp_curriculum_data.js');
const { generatePageHtml } = require('./csharp_page_template.js');

const csharpDir = path.join(__dirname, '../public/blog-csharp');

// ==========================================
// HIGH-VALUE EDITORIAL MASTERCLASS CONTENT: PHASE 2 (CH 05 - 08)
// ==========================================

const PHASE2_CONTENTS = {
  // -------------------------------------------------------------
  // CHAPTER 5: IF-ELSE CONDITIONALS & PATTERN MATCHING
  // -------------------------------------------------------------
  5: `
    <div class="intro-box">
      కంప్యూటర్ ప్రోగ్రామ్‌లు నిజమైన ప్రయోజనాన్ని ఇవ్వాలంటే అవి పరిస్థితులను బట్టి స్వతంత్రంగా సరైన నిర్ణయాలు (Decision Making) తీసుకోగలగాలి. ఆన్‌లైన్ షాపింగ్‌లో డిస్కౌంట్ కాలిక్యులేషన్, బ్యాంకింగ్ క్రెడిట్ స్కోర్ చెకింగ్ లేదా గేమ్ క్యారెక్టర్ మూవ్‌మెంట్లలో నిర్ణయాలు తీసుకోవడానికి C# లో <strong>కండిషనల్ స్టేట్‌మెంట్స్ (if-else)</strong> మూలస్తంభాలు. ఆధునిక C# (C# 9 నుండి C# 12 వరకు) లో ప్రవేశపెట్టిన అత్యాధునిక <strong>Pattern Matching</strong> ఫీచర్లు కోడ్‌ను ఎలా సంక్షిప్తంగా, సురక్షితంగా చేస్తాయో ఈ అధ్యాయంలో సమగ్రంగా పరిశీలిద్దాం.
    </div>

    <!-- SECTION 1 -->
    <div class="section-title"><span class="num">1</span>if, else if, else డెసిషన్ మేకింగ్ ఆర్కిటెక్చర్</div>
    <div class="section-body">
      <p>
        C లేదా C++ లలో ఏదైనా నాన్-జీరో సంఖ్య నిజం (True) గా పరిగణించబడుతుంది. కానీ <strong>C# లో టైప్ సేఫ్టీ కఠినమైనది: if కండిషన్ లోపల తప్పనిసరిగా కేవలం 'bool' (true లేదా false) మాత్రమే ఉండాలి</strong>. పూర్ణాంకాలను నేరుగా కండిషన్‌గా వాడటం C# లో నిషిద్ధం.
      </p>

      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:16px; margin:20px 0;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #10b981; border-radius:8px; padding:16px;">
          <h4 style="color:#10b981; margin:0 0 6px 0; font-size:14.5px;">1. if స్టేట్‌మెంట్ (Single Branch):</h4>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.6;">
            ఇచ్చిన బూలియన్ షరతు నిజమైతేనే ఆ కోడ్ బ్లాక్ రన్ అవుతుంది. అబద్ధమైతే ప్రోగ్రామ్ దాన్ని దాటవేసి ముందుకు వెళ్తుంది.
          </p>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #3b82f6; border-radius:8px; padding:16px;">
          <h4 style="color:#3b82f6; margin:0 0 6px 0; font-size:14.5px;">2. if-else స్టేట్‌మెంట్ (Two-Way Branch):</h4>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.6;">
            షరతు నిజమైతే మొదటి బ్లాక్, అబద్ధమైతే ప్రత్యామ్నాయంగా <code>else</code> బ్లాక్ ఖచ్చితంగా ఎగ్జిక్యూట్ అవుతుంది.
          </p>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #8b5cf6; border-radius:8px; padding:16px;">
          <h4 style="color:#8b5cf6; margin:0 0 6px 0; font-size:14.5px;">3. else-if లాడర్ (Multi-Way Ladder):</h4>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.6;">
            బహుళ షరతులను పై నుండి క్రిందికి వరుసగా తనిఖీ చేస్తుంది. మొదటి ఏ షరతు నిజమైతే ఆ బ్లాక్ రన్ అయి మిగిలిన మొత్తం లాడర్ స్కిప్ అవుతుంది.
          </p>
        </div>
      </div>

      <div class="code-block" style="margin:16px 0;">
        <div class="code-block-header">
          <span class="lang-tag">C# — ATM Cash Withdrawal Decision Flow</span>
          <a class="try-btn" href="/online-csharp-compiler.html">⚡ Try in C# Compiler</a>
        </div>
        <pre><code>decimal accountBalance = 15000.00m;
decimal withdrawAmount = 5000.00m;

if (withdrawAmount &lt;= 0) {
    Console.WriteLine("❌ చెల్లని మొత్తం! ధన సంఖ్యను నమోదు చేయండి.");
} else if (withdrawAmount &gt; accountBalance) {
    Console.WriteLine($"❌ సరిపడా నిధులు లేవు! మీ బ్యాలెన్స్: ₹{accountBalance}");
} else {
    accountBalance -= withdrawAmount;
    Console.WriteLine($"✅ విత్‌డ్రా విజయవంతమైంది: ₹{withdrawAmount}. మిగిలిన బ్యాలెన్స్: ₹{accountBalance}");
}</code></pre>
      </div>
    </div>

    <!-- SECTION 2 -->
    <div class="section-title"><span class="num">2</span>డాంగ్లింగ్ else సమస్య & బ్రాకెట్ల నిబంధన (The Dangling else)</div>
    <div class="section-body">
      <p>
        ఒక <code>if</code> లోపల మరొక <code>if</code> రాసినప్పుడు కర్లీ బ్రేసెస్ <code>{ }</code> ఉపయోగించకపోతే కంప్యూటర్‌కు ఏ <code>else</code> ఎవరికి చెందుతుందో గందరగోళం ఏర్పడుతుంది:
      </p>

      <div style="background:rgba(239, 68, 68, 0.08); border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px 18px; margin:16px 0;">
        <strong style="color:#ef4444; font-size:14px;">⚠️ డాంగ్లింగ్ else ట్రాప్:</strong>
        <code style="font-size:13px; color:var(--text); display:block; margin:8px 0; background:var(--bg3); padding:8px; border-radius:4px;">
          if (score &gt;= 35)<br>
          &nbsp;&nbsp;&nbsp;&nbsp;if (score &gt;= 90)<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Console.WriteLine("A Grade");<br>
          else<br>
          &nbsp;&nbsp;&nbsp;&nbsp;Console.WriteLine("Failed!"); // ఈ else ఎవరికి చెందుతుంది?
        </code>
        <p style="font-size:13px; color:var(--text); margin:6px 0 0 0; line-height:1.6;">
          పై కోడ్‌లో <code>else</code> మొదటి <code>if(score &gt;= 35)</code> కి చెందినదిగా అనిపించవచ్చు. కానీ <strong>C# నియమం ప్రకారం ఏ బ్రాకెట్ లేని else ఎల్లప్పుడూ తనకు అత్యంత సమీపంలో ఉన్న మునుపటి if కే జతచేయబడుతుంది!</strong> కాబట్టి <code>score = 70</code> అయితే ఏమీ ప్రింట్ అవ్వదు. అందుకే ప్రొఫెషనల్ కోడింగ్‌లో సింగిల్ లైన్ అయినా <strong>ఎల్లప్పుడూ కర్లీ బ్రేసెస్ { ... } వాడాలి</strong>.
        </p>
      </div>
    </div>

    <!-- SECTION 3 -->
    <div class="section-title"><span class="num">3</span>C# మోడ్రన్ ప్యాటర్న్ మ్యాచింగ్ (Pattern Matching Revolution)</div>
    <div class="section-body">
      <p>
        ఆధునిక C# (C# 9 నుండి C# 12 వరకు) లో ప్రవేశపెట్టిన అత్యంత శక్తివంతమైన ఫీచర్ <strong>Pattern Matching</strong>. సాంప్రదాయ <code>if-else</code> ల కంటే ఇది కోడ్‌ను విప్లవాత్మకంగా సంక్షిప్తం చేస్తుంది:
      </p>

      <div style="display:flex; flex-direction:column; gap:12px; margin:16px 0;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #10b981; border-radius:8px; padding:14px 18px;">
          <strong style="color:#10b981; font-size:14px;">1. Type Pattern (టైప్ చెకింగ్ + ఇన్లైన్ వేరియబుల్):</strong>
          <code style="font-size:12.5px; color:var(--text); display:block; margin:6px 0; background:var(--bg3); padding:6px 10px; border-radius:4px;">if (data is string text) { Console.WriteLine(text.Length); }</code>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.5;">డేటా రకాన్ని తనిఖీ చేసి, సరిపోలితే ఆటోమేటిక్‌గా టైప్ కాస్టింగ్ చేసి కొత్త వేరియబుల్‌ను సృష్టిస్తుంది.</p>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #3b82f6; border-radius:8px; padding:14px 18px;">
          <strong style="color:#3b82f6; font-size:14px;">2. Relational & Logical Patterns (పరిధుల పోలిక):</strong>
          <code style="font-size:12.5px; color:var(--text); display:block; margin:6px 0; background:var(--bg3); padding:6px 10px; border-radius:4px;">if (age is &gt;= 18 and &lt; 60) { Console.WriteLine("Working Age"); }</code>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.5;"><code>age &gt;= 18 &amp;&amp; age &lt; 60</code> అని రెండుసార్లు వేరియబుల్ రాయకుండా <code>is &gt;= 18 and &lt; 60</code> అని సహజ ఇంగ్లీష్ లాగా రాయవచ్చు.</p>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #8b5cf6; border-radius:8px; padding:14px 18px;">
          <strong style="color:#8b5cf6; font-size:14px;">3. Negative Pattern (is not null):</strong>
          <code style="font-size:12.5px; color:var(--text); display:block; margin:6px 0; background:var(--bg3); padding:6px 10px; border-radius:4px;">if (customer is not null) { ... }</code>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.5;"><code>customer != null</code> కంటే <code>is not null</code> మరింత స్పష్టంగా మరియు ఆపరేటర్ ఓవర్‌లోడింగ్ సమస్యలు లేకుండా పనిచేస్తుంది.</p>
        </div>
      </div>
    </div>

    <!-- SECTION 4 -->
    <div class="section-title"><span class="num">4</span>టెర్నరీ ఆపరేటర్ (Ternary Operator ?: )</div>
    <div class="section-body">
      <p>
        రెండు లైన్ల సాధారణ <code>if-else</code> బ్లాక్‌ను కేవలం ఒకే ఒక్క లైన్‌లో ఎక్స్‌ప్రెషన్‌గా రాయడానికి <strong>టెర్నరీ ఆపరేటర్ (?:)</strong> ఉపయోగపడుతుంది:
      </p>

      <div class="code-block" style="margin:16px 0;">
        <div class="code-block-header">
          <span class="lang-tag">C# — Ternary Conditional Operator</span>
          <a class="try-btn" href="/online-csharp-compiler.html">⚡ Try in C# Compiler</a>
        </div>
        <pre><code>int score = 85;
string result = (score &gt;= 40) ? "ఉత్తీర్ణత (Pass)" : "ఫెయిల్ (Fail)";
Console.WriteLine($"పరీక్ష ఫలితం: {result}");

int a = 120, b = 95;
int maximum = (a &gt; b) ? a : b;
Console.WriteLine($"గరిష్ట సంఖ్య: {maximum}");</code></pre>
      </div>
    </div>

    <!-- SECTION 5 -->
    <div class="section-title"><span class="num">5</span>బిగినర్స్ చేసే ఘోరమైన తప్పులు (Beginner Pitfalls)</div>
    <div class="section-body">
      <div style="display:flex; flex-direction:column; gap:12px; margin:16px 0;">
        <div style="background:rgba(239, 68, 68, 0.08); border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px 18px;">
          <div style="font-weight:700; color:#ef4444; font-size:14px;">❌ 1. if పక్కన సెమికోలన్ పెట్టడం (Empty Statement Trap):</div>
          <code style="font-size:13px; color:var(--text); display:block; margin:6px 0;">if (userRole == "Admin"); { GrantAccess(); } // సెమికోలన్ పెట్టరాదు!</code>
          <span style="font-size:13px; color:var(--text2); display:block;"><code>if(...);</code> అని పెడితే కండిషన్ అక్కడితో ముగిసిపోతుంది. దాంతో యూజర్ ఎవరైనా సరే కర్లీ బ్రేసెస్ లోని కోడ్ ప్రతిసారీ రన్ అయిపోయి ఘోరమైన సెక్యూరిటీ బగ్ తలెత్తుతుంది!</span>
        </div>

        <div style="background:rgba(239, 68, 68, 0.08); border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px 18px;">
          <div style="font-weight:700; color:#ef4444; font-size:14px;">❌ 2. if లో అసైన్‌మెంట్ ప్రయత్నించడం:</div>
          <code style="font-size:13px; color:var(--text); display:block; margin:6px 0;">if (status = 1) // Compiler Error! Cannot convert int to bool</code>
          <span style="font-size:13px; color:var(--text2); display:block;">C/C++ లో ఇది సైలెంట్ బగ్. కానీ C# లో టైప్ సేఫ్టీ వల్ల కంపైలర్ తక్షణమే ఎర్రర్ ఇస్తుంది. పోల్చడానికి ఎల్లప్పుడూ <code>==</code> వాడాలి.</span>
        </div>
      </div>
    </div>

    <!-- SECTION 6 -->
    <div class="section-title"><span class="num">6</span>తరచుగా అడిగే ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div style="display:flex; flex-direction:column; gap:12px; margin-top:16px;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px;">
          <h4 style="color:#10b981; margin:0 0 6px 0; font-size:14.5px;">Q: is null మరియు == null ల మధ్య సాంకేతిక తేడా ఏమిటి?</h4>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.6;">
            ఒక క్లాస్‌లో డెవలపర్ <code>==</code> ఆపరేటర్‌ను ఓవర్‌లోడ్ చేసి తప్పుడు లాజిక్ రాసి ఉండవచ్చు. కానీ <code>is null</code> అనేది ఆపరేటర్ ఓవర్‌లోడింగ్‌ను దాటవేసి, CLR మెమరీ స్థాయిలో ఆ రిఫరెన్స్ నిజంగా శూన్యమా కాదా అని ఖచ్చితంగా తనిఖీ చేస్తుంది. అందుకే మోడ్రన్ C# లో <code>is null</code> వాడటమే సిఫార్సు.
          </p>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px;">
          <h4 style="color:#10b981; margin:0 0 6px 0; font-size:14.5px;">Q: if-else లాడర్ మరియు switch లలో పర్ఫార్మెన్స్ పరంగా ఏది ఉత్తమం?</h4>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.6;">
            పరిధులు (Ranges, e.g. <code>age &gt;= 18</code>) ఉన్నప్పుడు <code>if-else</code> సహజమైనది. కానీ స్థిరమైన విలువలపై (Discrete values) పనిచేసేటప్పుడు కంపైలర్ <code>switch</code> ను $O(1)$ జంప్ టేబుల్‌గా ఆప్టిమైజ్ చేస్తుంది కాబట్టి <code>switch</code> వేగవంతమైనది.
          </p>
        </div>
      </div>
    </div>
  `,

  // -------------------------------------------------------------
  // CHAPTER 6: SWITCH-CASE & SWITCH EXPRESSIONS
  // -------------------------------------------------------------
  6: `
    <div class="intro-box">
      ఒక ప్రోగ్రామ్‌లో బహుళ స్థిర విలువలపై (Discrete choices) నిర్ణయాలు తీసుకోవాల్సి వచ్చినప్పుడు వరుసగా <code>else-if</code> లు రాయడం కోడ్‌ను సంక్లిష్టంగా చేస్తుంది. C# లో ఇందుకు సంప్రదాయ <strong>switch-case</strong> స్టేట్‌మెంట్‌తో పాటు, C# 8 లో ప్రవేశపెట్టిన అత్యాధునిక <strong>switch Expressions (=&gt;)</strong> అందుబాటులో ఉన్నాయి. C లాంగ్వేజ్‌లా కాకుండా C# లో స్ట్రింగ్స్‌తో switch ఎలా పనిచేస్తుంది, No Fall-Through రూల్, మరియు <code>when</code> గార్డ్ క్లాజెస్‌ను ఈ అధ్యాయంలో నేర్చుకుందాం.
    </div>

    <!-- SECTION 1 -->
    <div class="section-title"><span class="num">1</span>క్లాసిక్ switch-case & C# 'No Fall-Through' రూల్</div>
    <div class="section-body">
      <p>
        C లేదా C++ లలో ఒక కేస్ చివర <code>break</code> రాయకపోతే కంపైలర్ నిశ్శబ్దంగా తర్వాతి కేస్‌లోకి జారిపోతుంది (Fall-through bug). కానీ <strong>C# లో ఇది పూర్తిగా నిషిద్ధం</strong>. C# కంపైలర్ ప్రతి కేస్ చివర తప్పనిసరిగా <code>break;</code>, <code>return;</code>, లేదా <code>throw;</code> ఉండాలని డిమాండ్ చేస్తుంది.
      </p>

      <div class="code-block" style="margin:16px 0;">
        <div class="code-block-header">
          <span class="lang-tag">C# — Classic switch-case statement</span>
          <a class="try-btn" href="/online-csharp-compiler.html">⚡ Try in C# Compiler</a>
        </div>
        <pre><code>int dayNumber = 3;
string dayName;

switch (dayNumber) {
    case 1: dayName = "సోమవారం"; break;
    case 2: dayName = "మంగళవారం"; break;
    case 3: dayName = "బుధవారం"; break;
    case 4: dayName = "గురువారం"; break;
    case 5: dayName = "శుక్రవారం"; break;
    case 6:
    case 7: 
        dayName = "వీకెండ్ (శని/ఆదివారం)"; // బహుళ కేస్‌లను గ్రూప్ చేయవచ్చు
        break;
    default:
        dayName = "చెల్లని రోజు సంఖ్య";
        break;
}
Console.WriteLine($"ఎంపిక చేసిన రోజు: {dayName}");</code></pre>
      </div>
    </div>

    <!-- SECTION 2 -->
    <div class="section-title"><span class="num">2</span>మోడ్రన్ switch Expressions (=>) — C# 8+ సూపర్ పవర్</div>
    <div class="section-body">
      <p>
        ఆధునిక C# లో <code>switch</code> అనేది కేవలం ఒక స్టేట్‌మెంట్ మాత్రమే కాదు; అది నేరుగా ఒక విలువను రిటర్న్ చేసే <strong>ఎక్స్‌ప్రెషన్ (switch Expression)</strong>. <code>case</code>, <code>break</code>, <code>:</code> వంటి బోయిలర్‌ప్లేట్ పదాలు లేకుండా ల్యాంబ్డా యారో <code>=&gt;</code> తో అత్యంత క్లీన్‌గా రాయవచ్చు:
      </p>

      <div class="code-block" style="margin:16px 0;">
        <div class="code-block-header">
          <span class="lang-tag">C# — Modern switch Expression</span>
          <a class="try-btn" href="/online-csharp-compiler.html">⚡ Try in C# Compiler</a>
        </div>
        <pre><code>int statusCode = 200;

// switch ఎక్స్‌ప్రెషన్ ద్వారా ఫలితాన్ని నేరుగా వేరియబుల్‌కు అసైన్ చేయడం
string message = statusCode switch {
    200 =&gt; "OK: అభ్యర్థన విజయవంతమైంది",
    400 =&gt; "Bad Request: తప్పుడు ఇన్‌పుట్",
    404 =&gt; "Not Found: రిసోర్స్ లభించలేదు",
    500 =&gt; "Internal Server Error: సర్వర్ లోపం",
    _   =&gt; "Unknown: తెలియని స్టేటస్ కోడ్" // _ అంటే default కేస్
};

Console.WriteLine($"సర్వర్ రెస్పాన్స్: {message}");</code></pre>
      </div>
    </div>

    <!-- SECTION 3 -->
    <div class="section-title"><span class="num">3</span>when గార్డ్ కండిషన్స్ (Guard Clauses)</div>
    <div class="section-body">
      <p>
        ఒక కేస్ సరిపోలిన తర్వాత కూడా దానిలో అదనపు షరతులను (ఉదా: సంఖ్య పాజిటివా, నెగటివా) తనిఖీ చేయడానికి <strong>when</strong> క్లాజ్ అద్భుతంగా ఉపయోగపడుతుంది:
      </p>

      <div class="code-block" style="margin:16px 0;">
        <div class="code-block-header">
          <span class="lang-tag">C# — switch with 'when' clause</span>
          <a class="try-btn" href="/online-csharp-compiler.html">⚡ Try in C# Compiler</a>
        </div>
        <pre><code>int score = 88;

string grade = score switch {
    &gt;= 90 =&gt; "A+ (డిస్టింక్షన్)",
    &gt;= 75 when score &lt; 90 =&gt; "A (ఫస్ట్ క్లాస్)",
    &gt;= 50 =&gt; "B (సెకండ్ క్లాస్)",
    &gt;= 35 =&gt; "C (పాస్)",
    _ =&gt; "F (ఫెయిల్)"
};

Console.WriteLine($"విద్యార్థి గ్రేడ్: {grade}");</code></pre>
      </div>
    </div>

    <!-- SECTION 4 -->
    <div class="section-title"><span class="num">4</span>ప్రాక్టికల్ కేస్ స్టడీ: రోల్-బేస్డ్ యాక్సెస్ కంట్రోల్ (RBAC Engine)</div>
    <div class="section-body">
      <p>
        ఎంటర్‌ప్రైజ్ సాఫ్ట్‌వేర్ ఆర్కిటెక్చర్‌లో యూజర్ రోల్ ఆధారంగా అనుమతులను నిర్ణయించే క్లీన్ C# ఇంజిన్:
      </p>

      <div class="code-block" style="margin:16px 0;">
        <div class="code-block-header">
          <span class="lang-tag">C# — Role-Based Permission Engine</span>
          <a class="try-btn" href="/online-csharp-compiler.html">⚡ Try in C# Compiler</a>
        </div>
        <pre><code>string userRole = "Manager";

string permissions = userRole.ToLower() switch {
    "admin"   =&gt; "పూర్తి యాక్సెస్ (Create, Read, Update, Delete)",
    "manager" =&gt; "మధ్యస్థ యాక్సెస్ (Create, Read, Update)",
    "user"    =&gt; "కేవలం చదవడం మాత్రమే (Read-Only)",
    _         =&gt; "యాక్సెస్ నిరాకరించబడింది (Access Denied)"
};

Console.WriteLine($"అనుమతులు: {permissions}");</code></pre>
      </div>
    </div>

    <!-- SECTION 5 -->
    <div class="section-title"><span class="num">5</span>బిగినర్స్ చేసే ఘోరమైన తప్పులు (Beginner Pitfalls)</div>
    <div class="section-body">
      <div style="display:flex; flex-direction:column; gap:12px; margin:16px 0;">
        <div style="background:rgba(239, 68, 68, 0.08); border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px 18px;">
          <div style="font-weight:700; color:#ef4444; font-size:14px;">❌ 1. switch Expression లో డిస్కార్డ్ (_) మిస్ చేయడం:</div>
          <span style="font-size:13px; color:var(--text2); display:block; margin-top:4px;">switch ఎక్స్‌ప్రెషన్‌లో అన్ని సాధ్యమయ్యే కేసులను కవర్ చేయకపోతే (Non-exhaustive match), కంపైల్-టైమ్ వార్నింగ్ మరియు రన్‌టైమ్‌లో <code>SwitchExpressionException</code> క్రాష్ వస్తుంది. ఎల్లప్పుడూ చివర <code>_ =&gt; ...</code> తప్పనిసరిగా ఉండాలి.</span>
        </div>

        <div style="background:rgba(239, 68, 68, 0.08); border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px 18px;">
          <div style="font-weight:700; color:#ef4444; font-size:14px;">❌ 2. డూప్లికేట్ కేస్ వాల్యూస్ ఇవ్వడం:</div>
          <code style="font-size:13px; color:var(--text); display:block; margin:6px 0;">case 1: ... case 1: ... // Compiler Error: The switch statement contains multiple cases with the same label value</code>
          <span style="font-size:13px; color:var(--text2); display:block;">ఒకే switch లో రెండు సార్లు ఒకే స్థిరాంకం ఉండకూడదు. కంపైలర్ వెంటనే ఎర్రర్ చూపిస్తుంది.</span>
        </div>
      </div>
    </div>

    <!-- SECTION 6 -->
    <div class="section-title"><span class="num">6</span>తరచుగా అడిగే ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div style="display:flex; flex-direction:column; gap:12px; margin-top:16px;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px;">
          <h4 style="color:#10b981; margin:0 0 6px 0; font-size:14.5px;">Q: C లాంగ్వేజ్‌లో switch కి string పనిచేయదు, C# లో ఎలా పనిచేస్తుంది?</h4>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.6;">
            C లో స్ట్రింగ్స్ కేవలం పాయింటర్లు. కానీ C# లో స్ట్రింగ్ అనేది ఫస్ట్-క్లాస్ ఆబ్జెక్ట్. కంపైలర్ స్ట్రింగ్ switch ను అంతర్గతంగా ఒక వేగవంతమైన <strong>హ్యాష్ టేబుల్ లూకప్</strong> మరియు <code>string.Equals</code> తో ఆప్టిమైజ్ చేస్తుంది.
          </p>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px;">
          <h4 style="color:#10b981; margin:0 0 6px 0; font-size:14.5px;">Q: switch లో ఒక కేస్ నుండి మరొక కేస్‌కు జంప్ చేయవచ్చా?</h4>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.6;">
            చేయవచ్చు! C# లో ఇంప్లిసిట్ ఫాల్-త్రూ నిషిద్ధం అయినప్పటికీ, డెవలపర్ కావాలనుకుంటే స్పష్టంగా <code>goto case 2;</code> లేదా <code>goto default;</code> అని రాసి జంప్ చేయవచ్చు.
          </p>
        </div>
      </div>
    </div>
  `,

  // -------------------------------------------------------------
  // CHAPTER 7: LOOPS (FOR, WHILE, DO-WHILE, FOREACH)
  // -------------------------------------------------------------
  7: `
    <div class="intro-box">
      కంప్యూటర్ల యొక్క అద్భుతమైన సామర్థ్యం వేలాది పునరావృత పనులను (Repetitive Tasks) క్షణాల్లో అలసట లేకుండా ఖచ్చితత్వంతో పూర్తి చేయగలగడమే. C# లో ఇటరేషన్ల కోసం నాలుగు ప్రధాన లూప్స్ ఉన్నాయి — <strong>for</strong>, <strong>while</strong>, <strong>do-while</strong>, మరియు ఆధునిక కలెక్షన్స్ కోసం రూపొందించిన <strong>foreach</strong>. ఈ అధ్యాయంలో వాటి 4-దశల లైఫ్‌సైకిల్, <code>IEnumerable</code> అంతర్గత పనితీరు, మరియు ఇన్ఫినిట్ లూప్స్ ప్రమాదాలను లోతుగా నేర్చుకుందాం.
    </div>

    <!-- SECTION 1 -->
    <div class="section-title"><span class="num">1</span>for లూప్ — 4-దశల ఎగ్జిక్యూషన్ లైఫ్‌సైకిల్</div>
    <div class="section-body">
      <p>
        ఇటరేషన్ల సంఖ్య ముందే ఖచ్చితంగా తెలిసినప్పుడు (ఉదాహరణకు 1 నుండి 100 వరకు సంఖ్యలు లేదా అర్రే ఇండెక్సింగ్) <strong>for లూప్</strong> అత్యంత ప్రాచుర్యం పొందింది:
      </p>

      <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px; margin:16px 0;">
        <h4 style="color:#10b981; margin:0 0 8px 0; font-size:14.5px;">🔄 for లూప్ 4-దశల చక్రం:</h4>
        <ol style="margin:0; padding-left:20px; font-size:13px; color:var(--text); line-height:1.7;">
          <li><strong>ఇనీషియలైజేషన్ (Initialization):</strong> లూప్ ప్రారంభంలో ఒకే ఒక్కసారి రన్ అవుతుంది (<code>int i = 1</code>).</li>
          <li><strong>కండిషన్ టెస్ట్ (Condition Check):</strong> ప్రతి ఇటరేషన్‌కు ముందు పరీక్షించబడుతుంది (<code>i &lt;= 10</code>). నిజమైతే లోపలికి వెళ్తుంది; అబద్ధమైతే లూప్ ఆగిపోతుంది.</li>
          <li><strong>బాడీ ఎగ్జిక్యూషన్ (Body Execution):</strong> లూప్ లోపల ఉన్న కోడ్ స్టేట్‌మెంట్లు రన్ అవుతాయి.</li>
          <li><strong>అప్‌డేట్ / ఇంక్రిమెంట్ (Update Step):</strong> బాడీ ముగియగానే వేరియబుల్ పెరుగుతుంది (<code>i++</code>). వెంటనే మళ్లీ స్టెప్ 2 కి వెళ్తుంది.</li>
        </ol>
      </div>

      <div class="code-block" style="margin:16px 0;">
        <div class="code-block-header">
          <span class="lang-tag">C# — for loop calculation</span>
          <a class="try-btn" href="/online-csharp-compiler.html">⚡ Try in C# Compiler</a>
        </div>
        <pre><code>int sum = 0;
// 1 నుండి 10 వరకు సహజ సంఖ్యల మొత్తం
for (int i = 1; i &lt;= 10; i++) {
    sum += i;
}
Console.WriteLine($"1 నుండి 10 సంఖ్యల మొత్తం: {sum}");</code></pre>
      </div>
    </div>

    <!-- SECTION 2 -->
    <div class="section-title"><span class="num">2</span>while & do-while లూప్స్ — ఎంట్రీ vs ఎగ్జిట్ కంట్రోల్</div>
    <div class="section-body">
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:16px; margin:16px 0;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #10b981; border-radius:8px; padding:16px;">
          <h4 style="color:#10b981; margin:0 0 6px 0; font-size:14px;">1. while లూప్ (ఎంట్రీ-కంట్రోల్డ్):</h4>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.6;">
            లూప్ లోపలికి ప్రవేశించే ముందే కండిషన్ చెక్ అవుతుంది. మొదట్లోనే కండిషన్ అబద్ధమైతే కోడ్ <strong>జీరో సార్లు</strong> రన్ అవుతుంది.
          </p>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #3b82f6; border-radius:8px; padding:16px;">
          <h4 style="color:#3b82f6; margin:0 0 6px 0; font-size:14px;">2. do-while లూప్ (ఎగ్జిట్-కంట్రోల్డ్):</h4>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.6;">
            కండిషన్ మొదట్లోనే అబద్ధమైనా కోడ్ బ్లాక్ <strong>కనీసం ఒక్కసారైనా (At least once)</strong> ఖచ్చితంగా రన్ అవుతుంది. మెనూ రిపీటేషన్‌కు బెస్ట్.
          </p>
        </div>
      </div>

      <div class="code-block" style="margin:16px 0;">
        <div class="code-block-header">
          <span class="lang-tag">C# — while loop number reversing</span>
          <a class="try-btn" href="/online-csharp-compiler.html">⚡ Try in C# Compiler</a>
        </div>
        <pre><code>int number = 12345;
int reversed = 0;

while (number &gt; 0) {
    int remainder = number % 10;
    reversed = (reversed * 10) + remainder;
    number /= 10; // వేరియబుల్ తగ్గించడం - ఇది లేకపోతే ఇన్ఫినిట్ లూప్ అవుతుంది!
}
Console.WriteLine($"తిరగేసిన సంఖ్య (Reversed): {reversed}");</code></pre>
      </div>
    </div>

    <!-- SECTION 3 -->
    <div class="section-title"><span class="num">3</span>foreach లూప్ & IEnumerable అంతర్గత ఆర్కిటెక్చర్</div>
    <div class="section-body">
      <p>
        C# లో అర్రేలు, లిస్టులు, మరియు కలెక్షన్స్ పై తిరగడానికి అత్యంత శుభ్రమైన, సిఫార్సు చేయబడిన లూప్ <strong>foreach</strong>. దీనికి ఇండెక్స్ వేరియబుల్స్ (<code>i</code>) లేదా బౌండరీ కాలిక్యులేషన్స్ అవసరం లేదు:
      </p>

      <div class="code-block" style="margin:16px 0;">
        <div class="code-block-header">
          <span class="lang-tag">C# — foreach loop on string array</span>
          <a class="try-btn" href="/online-csharp-compiler.html">⚡ Try in C# Compiler</a>
        </div>
        <pre><code>string[] programmingLanguages = { "C#", "C++", "Python", "Java", "Go" };

Console.WriteLine("ప్రోగ్రామింగ్ భాషల జాబితా:");
foreach (string lang in programmingLanguages) {
    Console.WriteLine($"• {lang}");
}</code></pre>
      </div>

      <div style="background:var(--bg2); border-left:4px solid #10b981; border-radius:0 8px 8px 0; padding:16px; margin:16px 0;">
        <strong style="color:#10b981; font-size:14px;">⚙️ తెరవెనుక ఏం జరుగుతోంది? (IEnumerable &amp; IEnumerator):</strong>
        <p style="font-size:13px; color:var(--text); margin:6px 0 0 0; line-height:1.6;">
          కంపైలర్ <code>foreach</code> ను అంతర్గతంగా <code>IEnumerator enumerator = list.GetEnumerator()</code> గా మారుస్తుంది. అది <code>while (enumerator.MoveNext())</code> తో ఒక్కో అంశాన్ని చదువుతుంది. ముఖ్య గమనిక: <strong>foreach లోపల ఇటరేట్ అవుతున్న ఎలిమెంట్ రీడ్-ఓన్లీ (Read-Only)</strong>; దాన్ని నేరుగా మార్చడం లేదా కలెక్షన్ నుండి రిమూవ్ చేయడం సాధ్యం కాదు.
        </p>
      </div>
    </div>

    <!-- SECTION 4 -->
    <div class="section-title"><span class="num">4</span>ఇన్ఫినిట్ లూప్స్ & CPU హ్యాంగ్ నివారణ</div>
    <div class="section-body">
      <p>
        ఒక లూప్ కండిషన్ ఎప్పటికీ <code>false</code> కాకపోతే అది అనంతంగా రన్ అవుతూ CPU ని 100% స్ట్రెస్ చేసి అప్లికేషన్‌ను ఫ్రీజ్ చేస్తుంది. ప్రొడక్షన్ బ్యాక్‌గ్రౌండ్ వర్కర్లలో ఉద్దేశపూర్వకంగా అనంత లూప్స్ రాసేటప్పుడు <strong>CancellationToken</strong> లేదా <code>Thread.Sleep()</code> / <code>await Task.Delay()</code> వాడటం తప్పనిసరి.
      </p>
    </div>

    <!-- SECTION 5 -->
    <div class="section-title"><span class="num">5</span>బిగినర్స్ చేసే ఘోరమైన తప్పులు (Beginner Pitfalls)</div>
    <div class="section-body">
      <div style="display:flex; flex-direction:column; gap:12px; margin:16px 0;">
        <div style="background:rgba(239, 68, 68, 0.08); border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px 18px;">
          <div style="font-weight:700; color:#ef4444; font-size:14px;">❌ 1. foreach లోపల కలెక్షన్‌ను సవరించడం (Collection Modified Trap):</div>
          <code style="font-size:13px; color:var(--text); display:block; margin:6px 0;">foreach (var item in list) { list.Remove(item); } // InvalidOperationException!</code>
          <span style="font-size:13px; color:var(--text2); display:block;"><code>foreach</code> రన్ అవుతున్నప్పుడు లిస్ట్‌లో ఎలిమెంట్లను తీసివేయడం లేదా చేర్చడం నిషిద్ధం. ఎలిమెంట్లను తీసివేయాలంటే రివర్స్ <code>for</code> లూప్ లేదా <code>list.RemoveAll()</code> వాడాలి.</span>
        </div>

        <div style="background:rgba(239, 68, 68, 0.08); border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px 18px;">
          <div style="font-weight:700; color:#ef4444; font-size:14px;">❌ 2. Off-by-one ఇండెక్స్ ఎర్రర్:</div>
          <code style="font-size:13px; color:var(--text); display:block; margin:6px 0;">for (int i = 0; i &lt;= arr.Length; i++) // IndexOutOfRangeException!</code>
          <span style="font-size:13px; color:var(--text2); display:block;">అర్రే ఇండెక్స్ ఎల్లప్పుడూ <code>0</code> నుండి <code>Length - 1</code> వరకే ఉంటుంది. <code>&lt;=</code> వాడితే ఆఖరి ఇటరేషన్‌లో అప్లికేషన్ క్రాష్ అవుతుంది. ఎల్లప్పుడూ <code>&lt; arr.Length</code> రాయాలి.</span>
        </div>
      </div>
    </div>

    <!-- SECTION 6 -->
    <div class="section-title"><span class="num">6</span>తరచుగా అడిగే ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div style="display:flex; flex-direction:column; gap:12px; margin-top:16px;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px;">
          <h4 style="color:#10b981; margin:0 0 6px 0; font-size:14.5px;">Q: for లూప్ మరియు foreach లలో ఏది ఎక్కువ వేగవంతమైనది?</h4>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.6;">
            సాధారణ అర్రేల (Arrays) పై ఆధునిక .NET JIT కంపైలర్ రెండింటికీ ఒకే విధమైన ఆప్టిమైజ్డ్ అసెంబ్లీ కోడ్ ఉత్పత్తి చేస్తుంది కాబట్టి వేగంలో తేడా ఉండదు. అయితే లింక్డ్ లిస్టులు లేదా కాంప్లెక్స్ కలెక్షన్లలో <code>foreach</code> క్లీన్ కోడ్ పరంగా అత్యంత శ్రేయస్కరం.
          </p>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px;">
          <h4 style="color:#10b981; margin:0 0 6px 0; font-size:14.5px;">Q: do-while లూప్ చివర సెమికోలన్ తప్పనిసరా?</h4>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.6;">
            అవును! <code>while (...)</code> లూప్‌కు సెమికోలన్ ఉండదు, కానీ <code>do { ... } while (...);</code> చివర సెమికోలన్ తప్పనిసరిగా ఉండాలి. లేకపోతే కంపైలర్ సింటాక్స్ ఎర్రర్ ఇస్తుంది.
          </p>
        </div>
      </div>
    </div>
  `,

  // -------------------------------------------------------------
  // CHAPTER 8: BREAK, CONTINUE & NESTED LOOPS
  // -------------------------------------------------------------
  8: `
    <div class="intro-box">
      లూప్స్ ఎగ్జిక్యూట్ అవుతున్నప్పుడు సాధారణ ఫ్లోను నియంత్రించడానికి, అవసరమైన రికార్డు దొరకగానే లూప్ నుండి వెంటనే బయటకు రావడానికి లేదా కొన్ని అనవసరమైన ఇటరేషన్లను దాటవేయడానికి <strong>break</strong> మరియు <strong>continue</strong> కీవర్డ్లు తప్పనిసరి. 2D గ్రిడ్ ప్రాసెసింగ్ మరియు ఇంటర్వ్యూలలో ఎక్కువగా అడిగే <strong>నెస్టెడ్ లూప్స్ (Nested Loops)</strong> మరియు ప్యాటర్న్లను ఈ అధ్యాయంలో లోతుగా తెలుసుకుందాం.
    </div>

    <!-- SECTION 1 -->
    <div class="section-title"><span class="num">1</span>break కీవర్డ్ — అత్యవసర లూప్ ఎగ్జిట్ (Early Exit)</div>
    <div class="section-body">
      <p>
        లూప్ ఎన్నిసార్లు తిరగాలని నిర్ణయించబడిందో ఆ లక్ష్యం ఇంకా పూర్తికాకముందే, ఒక నిర్దిష్ట పరిస్థితి రాగానే ఆ లూప్‌ను తక్షణమే శాశ్వతంగా ముగించి బయటకు రావడానికి <strong>break</strong> ఉపయోగపడుతుంది:
      </p>

      <div class="code-block" style="margin:16px 0;">
        <div class="code-block-header">
          <span class="lang-tag">C# — Linear Search with break</span>
          <a class="try-btn" href="/online-csharp-compiler.html">⚡ Try in C# Compiler</a>
        </div>
        <pre><code>int[] employeeIds = { 101, 105, 109, 115, 120, 125 };
int searchId = 115;
bool found = false;

for (int i = 0; i &lt; employeeIds.Length; i++) {
    if (employeeIds[i] == searchId) {
        Console.WriteLine($"లక్ష్యం {searchId} ఇండెక్స్ {i} వద్ద లభించింది!");
        found = true;
        break; // ఎలిమెంట్ దొరికింది! మిగిలిన ఇటరేషన్లు అవసరం లేదు
    }
}

if (!found) Console.WriteLine("ఐడీ లభించలేదు.");</code></pre>
      </div>
      <p style="font-size:13px; color:var(--text2); margin:8px 0 0 0;">
        💡 <code>break</code> లేకపోతే టార్గెట్ మొదట్లోనే దొరికినా అరే చివరి వరకు అనవసరంగా లూప్ రన్ అవుతూ సర్వర్ సమయాన్ని వృధా చేస్తుంది.
      </p>
    </div>

    <!-- SECTION 2 -->
    <div class="section-title"><span class="num">2</span>continue కీవర్డ్ — ప్రస్తుత ఇటరేషన్ స్కిప్ చేయడం</div>
    <div class="section-body">
      <p>
        లూప్‌ను పూర్తిగా ఆపేయకుండా, కేవలం ఆ <em>ప్రస్తుత ఒక్క ఇటరేషన్‌లోని తర్వాతి లైన్లను మాత్రమే స్కిప్ చేసి</em> వెంటనే తర్వాతి రౌండ్‌కు దూకడానికి <strong>continue</strong> వాడతాం:
      </p>

      <div class="code-block" style="margin:16px 0;">
        <div class="code-block-header">
          <span class="lang-tag">C# — continue (Skip Multiples of 3)</span>
          <a class="try-btn" href="/online-csharp-compiler.html">⚡ Try in C# Compiler</a>
        </div>
        <pre><code>Console.WriteLine("3 యొక్క గుణిజాలు మినహా మిగిలిన సంఖ్యలు:");
for (int i = 1; i &lt;= 10; i++) {
    if (i % 3 == 0) {
        continue; // 3, 6, 9 వచ్చినప్పుడు ప్రింట్ చేయకుండా తర్వాతి రౌండ్‌కు వెళ్తుంది
    }
    Console.Write($"{i} ");
}
Console.WriteLine();</code></pre>
      </div>

      <div style="background:rgba(245, 158, 11, 0.08); border-left:4px solid #f59e0b; border-radius:0 8px 8px 0; padding:14px 18px; margin:16px 0;">
        <strong style="color:#d97706; font-size:14px;">⚠️ while లూప్‌లో continue వాడేటప్పుడు జాగ్రత్త!</strong>
        <p style="font-size:13px; color:var(--text); margin:6px 0 0 0; line-height:1.6;">
          <code>for</code> లూప్‌లో <code>continue</code> ఆటోమేటిక్‌గా <code>i++</code> ఇంక్రిమెంట్‌కు వెళ్తుంది. కానీ <code>while</code> లూప్‌లో ఇంక్రిమెంట్ బాడీ చివర ఉంటే, <code>continue</code> వల్ల ఆ ఇంక్రిమెంట్ లైన్ ఎప్పటికీ రన్ కాక <strong>ప్రోగ్రామ్ ఇన్ఫినిట్ లూప్‌లో ఇరుక్కుపోతుంది</strong>! కాబట్టి <code>continue</code> కి ముందే ఇంక్రిమెంట్ చేయాలి.
        </p>
      </div>
    </div>

    <!-- SECTION 3 -->
    <div class="section-title"><span class="num">3</span>నెస్టెడ్ లూప్స్ (Nested Loops) & 2D గ్రిడ్ ప్రాసెసింగ్</div>
    <div class="section-body">
      <p>
        ఒక లూప్ లోపల మరొక లూప్ ఉండడాన్ని <strong>నెస్టెడ్ లూప్ (Nested Loop)</strong> అంటారు. బయటి లూప్ (Outer Loop) అడ్డు వరుసలను (Rows) నియంత్రిస్తే, లోపలి లూప్ (Inner Loop) నిలువు వరుసలను (Columns) నియంత్రిస్తుంది:
      </p>

      <div class="code-block" style="margin:16px 0;">
        <div class="code-block-header">
          <span class="lang-tag">C# — Right-Angled Star Pyramid</span>
          <a class="try-btn" href="/online-csharp-compiler.html">⚡ Try in C# Compiler</a>
        </div>
        <pre><code>int totalRows = 5;

for (int r = 1; r &lt;= totalRows; r++) {
    // లోపలి లూప్: ప్రతి వరుసలో నక్షత్రాలను ముద్రించడం
    for (int c = 1; c &lt;= r; c++) {
        Console.Write("* ");
    }
    Console.WriteLine(); // వరుస పూర్తయిన తర్వాత కొత్త లైన్‌కు వెళ్లడం
}</code></pre>
      </div>
      <p style="font-size:13px; color:var(--text2); margin:8px 0 0 0;">
        💡 నెస్టెడ్ లూప్స్ యొక్క టైమ్ కాంప్లెక్సిటీ సాధారణంగా $O(N \times M)$ లేదా $O(N^2)$ అవుతుంది. కాబట్టి 3 లేదా 4 స్థాయిల కంటే ఎక్కువ నెస్టెడ్ లూప్స్ రాయడం పర్ఫార్మెన్స్‌కు హానికరం.
      </p>
    </div>

    <!-- SECTION 4 -->
    <div class="section-title"><span class="num">4</span>నెస్టెడ్ లూప్స్ నుండి ఒకేసారి బయటకు రావడం (Multi-Loop Break)</div>
    <div class="section-body">
      <p>
        చాలామంది బిగినర్స్ <code>break</code> రాస్తే అన్ని నెస్టెడ్ లూప్స్ నుండి బయటకు వచ్చేస్తుందని అనుకుంటారు. కానీ <strong>break కేవలం తాను ఉన్న అత్యంత సమీపంలోని ఇన్నర్ లూప్‌ను మాత్రమే ఆపుతుంది</strong>; బయటి లూప్ నడుస్తూనే ఉంటుంది.
      </p>

      <div style="background:var(--bg2); border:1px solid #10b981; border-radius:8px; padding:16px; margin:16px 0;">
        <h4 style="color:#10b981; margin:0 0 8px 0; font-size:14.5px;">✅ ప్రొఫెషనల్ సొల్యూషన్: Method Return టెక్నిక్</h4>
        <p style="font-size:13px; color:var(--text); margin:0; line-height:1.6;">
          సంక్లిష్టమైన నెస్టెడ్ లూప్స్ లో టార్గెట్ దొరకగానే అన్ని లూప్స్ నుండి ఒకేసారి శాశ్వతంగా బయటకు రావడానికి ఆ లాజిక్‌ను ఒక ప్రత్యేక ప్రైవేట్ మెథడ్‌లో ఉంచి నేరుగా <strong>return;</strong> చేయడం అత్యంత క్లీన్, ఆధునిక సాఫ్ట్‌వేర్ పద్ధతి.
        </p>
      </div>
    </div>

    <!-- SECTION 5 -->
    <div class="section-title"><span class="num">5</span>బిగినర్స్ చేసే ఘోరమైన తప్పులు (Beginner Pitfalls)</div>
    <div class="section-body">
      <div style="display:flex; flex-direction:column; gap:12px; margin:16px 0;">
        <div style="background:rgba(239, 68, 68, 0.08); border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px 18px;">
          <div style="font-weight:700; color:#ef4444; font-size:14px;">❌ 1. ఇన్నర్ మరియు ఔటర్ లూప్‌లలో ఒకే వేరియబుల్ వాడటం:</div>
          <code style="font-size:13px; color:var(--text); display:block; margin:6px 0;">for (int i = 0; ... ) { for (int i = 0; ... ) } // Compiler Error! A local variable named 'i' cannot be declared in this scope</code>
          <span style="font-size:13px; color:var(--text2); display:block;">C# వేరియబుల్ స్కోప్‌లను కఠినంగా రక్షిస్తుంది. ఔటర్ లూప్‌కు <code>i</code> వాడితే, ఇన్నర్ లూప్‌కు <code>j</code> లేదా <code>r, c</code> (Row, Column) అని వేర్వేరు పేర్లు ఇవ్వాలి.</span>
        </div>

        <div style="background:rgba(239, 68, 68, 0.08); border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px 18px;">
          <div style="font-weight:700; color:#ef4444; font-size:14px;">❌ 2. లూప్‌లను దాటవేయడానికి విచ్చలవిడిగా goto వాడటం:</div>
          <span style="font-size:13px; color:var(--text2); display:block; margin-top:4px;"><code>goto</code> స్టేట్‌మెంట్ వాడితే కోడ్ స్పఘెట్టి (Spaghetti code) లా మారి డీబగ్గింగ్ అసాధ్యం అవుతుంది. స్ట్రక్చర్డ్ లూప్స్ (break, return) మాత్రమే వాడాలి.</span>
        </div>
      </div>
    </div>

    <!-- SECTION 6 -->
    <div class="section-title"><span class="num">6</span>తరచుగా అడిగే ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div style="display:flex; flex-direction:column; gap:12px; margin-top:16px;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px;">
          <h4 style="color:#10b981; margin:0 0 6px 0; font-size:14.5px;">Q: Environment.Exit(0) మరియు break ల మధ్య తేడా ఏమిటి?</h4>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.6;">
            <code>break</code> కేవలం ఆ నిర్దిష్ట లూప్ నుండి మాత్రమే బయటకు తెస్తుంది; ప్రోగ్రామ్‌లోని మిగిలిన కోడ్ కొనసాగుతుంది. కానీ <code>Environment.Exit(0)</code> మొత్తం అప్లికేషన్‌ను అక్కడికక్కడే మూసివేసి ఆపరేటింగ్ సిస్టమ్‌కు కంట్రోల్‌ను తిరిగి ఇస్తుంది.
          </p>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px;">
          <h4 style="color:#10b981; margin:0 0 6px 0; font-size:14.5px;">Q: for (;;) మరియు while (true) లలో ఏది రాయడం మంచిది?</h4>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.6;">
            రెండు సమానమైన IL బైట్‌కోడ్‌ను ఉత్పత్తి చేస్తాయి. అయితే రీడబిలిటీ (చదవడానికి స్పష్టత) పరంగా C# లో <code>while (true)</code> రాయడమే మోడ్రన్ కోడింగ్ స్టాండర్డ్.
          </p>
        </div>
      </div>
    </div>
  `
};

// Write out enriched files for Phase 2 (Lessons 5 to 8)
for (let i = 5; i <= 8; ++i) {
  const lesson = LESSONS.find(l => l.num === i);
  if (!lesson) continue;
  lesson.contentHtml = PHASE2_CONTENTS[i];
  const html = generatePageHtml(lesson);
  fs.writeFileSync(path.join(csharpDir, lesson.file), html, 'utf8');
  console.log(`✅ Fully enriched C# Phase 2 Lesson ${i} : ${lesson.file} (${html.length} chars)`);
}

