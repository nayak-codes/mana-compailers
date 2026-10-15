const fs = require('fs');
const path = require('path');

const scratchDir = __dirname;

// Helper to escape backticks inside string literals safely
function makeSafe(str) {
  return str.replace(/`/g, '\\`');
}

// ==========================================
// 1. REWRITE PHASE 3 (Lesson 5 & 6)
// ==========================================
console.log("Rewriting Phase 3 (build_javascript_phase3.js)...");

const phase3Path = path.join(scratchDir, 'build_javascript_phase3.js');
let p3Code = fs.readFileSync(phase3Path, 'utf8');

const p3Lesson5Content = `
    <div class="intro-box">
      <p>కంప్యూటింగ్ లో లెక్కలు చేయడానికి, రెండు వాల్యూస్ ని పోల్చడానికి, మరియు బిజినెస్ లాజిక్ బిల్డ్ చేయడానికి <strong>Operators</strong> వాడతాం. ఈ చాప్టర్ లో Operator Precedence, <code>==</code> vs <code>===</code> తేడాలు, మరియు Modern ES6+ Operators (<code>??</code>, <code>?.</code>) స్పష్టంగా నేర్చుకుందాం!</p>
    </div>

    <div class="callout">
      <div class="callout-title">💡 రియల్ లైఫ్ ఉదాహరణ: ఇ-కామర్స్ కార్ట్ బిల్లింగ్</div>
      <p style="margin-top: 10px; color: var(--text2); font-size: 14.5px;">మీరు ఒక ఆన్‌లైన్ షాపింగ్ యాప్ తయారు చేస్తున్నారు అనుకోండి:</p>
      <ul style="margin-top: 10px; color: var(--text2); font-size: 14.5px;">
        <li><strong>Arithmetic Operators:</strong> ప్రొడక్ట్ ధర + డెలివరీ ఛార్జ్ లెక్కించడానికి.</li>
        <li><strong>Comparison Operators:</strong> టోటల్ బిల్ 500 దాటితే ఉచిత డెలివరీ ఇవ్వడానికి.</li>
        <li><strong>Logical Operators:</strong> యూజర్ ప్రైమ్ మెంబర్ AND కూపన్ కోడ్ వాడితే 20% డిస్కౌంట్ ఇవ్వడానికి.</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">1</span>Arithmetic & Assignment Operators</div>
    <div class="section-body">
      <p>గణితంలో వాడే ప్లస్, మైనస్ లాంటివే Arithmetic Operators. Assignment operators వాల్యూస్ ని వేరియబుల్స్ లోకి స్టోర్ చేస్తాయి.</p>
      
      <table class="tbl">
        <tr><th>Operator</th><th>పేరు (Name)</th><th>ఉదాహరణ (Example)</th><th>రిజల్ట్ (Result)</th></tr>
        <tr><td><code>+</code></td><td>Addition (కూడిక)</td><td><code>10 + 5</code></td><td><code>15</code></td></tr>
        <tr><td><code>-</code></td><td>Subtraction (తీసివేత)</td><td><code>10 - 5</code></td><td><code>5</code></td></tr>
        <tr><td><code>*</code></td><td>Multiplication (గుణకారం)</td><td><code>10 * 5</code></td><td><code>50</code></td></tr>
        <tr><td><code>/</code></td><td>Division (భాగహారం)</td><td><code>10 / 4</code></td><td><code>2.5</code></td></tr>
        <tr><td><code>%</code></td><td>Modulus (శేషం - Remainder)</td><td><code>10 % 3</code></td><td><code>1</code></td></tr>
        <tr><td><code>**</code></td><td>Exponentiation (ఘాతం - Power)</td><td><code>2 ** 3</code></td><td><code>8</code></td></tr>
        <tr><td><code>+=</code></td><td>Add & Assign</td><td><code>x += 5</code> (x = x + 5)</td><td>x పెరుగుతుంది</td></tr>
      </table>
    </div>

    <div class="section-title"><span class="num">2</span>Comparison Operators: == vs === (చాలా ముఖ్యం!)</div>
    <div class="section-body">
      <p>జావాస్క్రిప్ట్ లో సమానత్వాన్ని (Equality) చెక్ చేయడానికి రెండు ఆపరేటర్లు ఉన్నాయి. ఇంటర్వ్యూలలో ప్రతీసారి అడిగే ప్రశ్న ఇది!</p>
      
      <div class="callout callout-warning">
        <div class="callout-title">⚠️ == vs === తేడా ఏంటి?</div>
        <ul>
          <li><strong><code>==</code> (Abstract Equality):</strong> డేటా టైప్ ని పట్టించుకోదు. అవసరమైతే టైప్ మార్చి (Implicit Coercion) పోలుస్తుంది. Ex: <code>5 == "5"</code> రిజల్ట్ <code>true</code>!</li>
          <li><strong><code>===</code> (Strict Equality):</strong> డేటా టైప్ + వాల్యూ రెండూ సమానంగా ఉంటేనే <code>true</code> ఇస్తుంది! Ex: <code>5 === "5"</code> రిజల్ట్ <code>false</code>!</li>
        </ul>
        <p><strong>గోల్డెన్ రూల్:</strong> మీ ప్రోగ్రామింగ్ లో ఎప్పుడూ <strong><code>===</code> మాత్రమే వాడాలి!</strong> <code>==</code> వాడితే విచిత్రమైన బగ్స్ వస్తాయి.</p>
      </div>
    </div>

    <div class="section-title"><span class="num">3</span>Logical, Ternary & Modern Operators (??, ?.)</div>
    <div class="section-body">
      <p>లాజిక్ బిల్డ్ చేయడానికి Logical Operators వాడతాం:</p>
      <ul>
        <li><strong><code>&&</code> (Logical AND):</strong> అన్ని షరతులు (Conditions) <code>true</code> అవ్వాలి.</li>
        <li><strong><code>||</code> (Logical OR):</strong> ఏదో ఒక షరతు <code>true</code> అయితే చాలు.</li>
        <li><strong><code>!</code> (Logical NOT):</strong> <code>true</code> ని <code>false</code> గా, <code>false</code> ని <code>true</code> గా మారుస్తుంది.</li>
      </ul>

      <p>అలాగే Modern JS lo 2 శక్తివంతమైన Operators వచ్చాయి:</p>
      <ul>
        <li><strong><code>??</code> (Nullish Coalescing):</strong> వేరియబుల్ వాల్యూ <code>null</code> లేదా <code>undefined</code> అయితేనే Default వాల్యూ ఇస్తుంది. (<code>0</code> లేదా <code>""</code> ఉన్నప్పుడు దాన్ని చెరపదు!).</li>
        <li><strong><code>?.</code> (Optional Chaining):</strong> Object property ఉందో లేదో సురక్షితంగా చెక్ చేస్తుంది, Error రాకుండా కాపాడుతుంది. Ex: <code>user?.address?.city</code>.</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">4</span>Code Example & Step-by-Step Breakdown</div>
    <div class="section-body">
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — Operators Masterclass</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>"use strict";

// 1. == vs === Demonstration
console.log(10 == "10");  // true (Type conversion జరిగింది)
console.log(10 === "10"); // false (Types matching కావు - Number vs String)

// 2. Short-Circuit Evaluation
let isLogged = true;
let userRole = "Admin";
let canAccess = isLogged && (userRole === "Admin");
console.log("Access Granted?", canAccess); // true

// 3. Nullish Coalescing (??)
let userAge = 0; // User వాల్యూ 0 ఎంటర్ చేశాడు
let age1 = userAge || 18; // || వాడితే 0 ని Falsy గా భావించి 18 ఇస్తుంది (తప్పు!)
let age2 = userAge ?? 18; // ?? వాడితే 0 ని ఉంచుతుంది (సరియైనది!)
console.log("With ||:", age1); // 18
console.log("With ??:", age2); // 0

// 4. Optional Chaining (?.)
let user = { name: "Balaji" };
console.log("City:", user.address?.city); // undefined (Crash అవ్వకుండా రక్షించింది!)</code></pre>
      </div>

      <div class="step-breakdown">
        <div class="step-breakdown-title">🔍 Step-by-Step కోడ్ వివరణ:</div>
        <ol class="step-list">
          <li><strong>Line 4-5:</strong> <code>10 == "10"</code> లో JavaScript స్ట్రింగ్ "10" ని నంబర్ గా మార్చింది కాబట్టి <code>true</code> వచ్చింది. కానీ <code>10 === "10"</code> లో Types వేరు కాబట్టి <code>false</code> వచ్చింది.</li>
          <li><strong>Line 13-14:</strong> <code>||</code> operator <code>0</code> ని Falsy గా భావించి 18 కి స్విచ్ అయ్యింది. కానీ <code>??</code> ఆపరేటర్ <code>0</code> ని valid value గా గుర్తించింది.</li>
          <li><strong>Line 18:</strong> <code>user.address</code> లేదు, అయినా <code>?.</code> వాడటం వల్ల ప్రోగ్రామ్ ఆగిపోకుండా (Crash అవ్వకుండా) <code>undefined</code> ఇచ్చింది.</li>
        </ol>
      </div>
    </div>

    <div class="callout callout-warning">
      <div class="callout-title">⚠️ ప్రాక్టీస్ లో వచ్చే పొరపాట్లు (Common Mistakes)</div>
      <ul>
        <li><code>=</code> మరియు <code>===</code> మధ్య తేడా మరచిపోవడం. <code>if (x = 5)</code> అని రాస్తే <code>x</code> కి 5 అసైన్ అయి ఎప్పుడూ true అవుతుంది! <code>if (x === 5)</code> అని రాయాలి.</li>
        <li>Operator Precedence ని మరచిపోవడం. <code>2 + 3 * 4</code> చేస్తే రిజల్ట్ <code>14</code> అవుతుంది (గుణకారం ముందు జరుగుతుంది). ముందు కూడిక కావాలంటే <code>(2 + 3) * 4</code> అని Parentheses రాయాలి.</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">5</span>Practice Questions & Answers</div>
    <div class="section-body">
      <details>
        <summary>Q1. <code>"10" + 20 - 5</code> రిజల్ట్ ఎంత వస్తుంది? ఎందుకు?</summary>
        <div class="faq-ans">
          <p><strong>రిజల్ట్:</strong> <code>1015</code>.</p>
          <p><strong>వివరణ:</strong> <code>"10" + 20</code> కి ప్లస్ ఆపరేటర్ వల్ల Concatenation జరిగి <code>"1020"</code> (String) గా మారుతుంది. ఆ తర్వాత మైనస్ <code>- 5</code> ఉన్నప్పుడు, మైనస్ కి స్ట్రింగ్ Concatenation లేనందున JS దాన్ని నంబర్ గా మార్చి <code>1020 - 5 = 1015</code> ఇస్తుంది!</p>
        </div>
      </details>

      <details>
        <summary>Q2. <code>0 ?? "Default"</code> మరియు <code>0 || "Default"</code> రిజల్ట్స్ ఏంటి?</summary>
        <div class="faq-ans">
          <p><strong>రిజల్ట్:</strong> <code>0 ?? "Default"</code> ఇస్తుంది <code>0</code>. కానీ <code>0 || "Default"</code> ఇస్తుంది <code>"Default"</code>.</p>
          <p><strong>వివరణ:</strong> <code>||</code> ప్రతీ Falsy Value (0, "", false, null, undefined) ని రిజెక్ట్ చేస్తుంది. కానీ <code>??</code> కేవలం <code>null</code> మరియు <code>undefined</code> ని మాత్రమే రిజెక్ట్ చేస్తుంది.</p>
        </div>
      </details>
    </div>

    <div class="intro-box" style="background: rgba(34, 197, 94, 0.1); border-color: rgba(34, 197, 94, 0.3); margin-top:30px;">
      <h3 style="color:#22c55e; margin-bottom:8px;">📌 Quick Summary:</h3>
      <ul style="margin-left: 20px; color: var(--text2);">
        <li>ఎప్పుడూ Strict Equality (<code>===</code> మరియు <code>!==</code>) మాత్రమే వాడండి.</li>
        <li><code>&&</code> మరియు <code>||</code> Short-circuit evaluation సూత్రాన్ని పాటిస్తాయి.</li>
        <li><code>??</code> ని Default values ఇవ్వడానికి, <code>?.</code> ని నివారించడానికి వాడండి.</li>
      </ul>
    </div>
`;

const p3Lesson6Content = `
    <div class="intro-box">
      <p>వెబ్ అప్లికేషన్స్ లో యూజర్ నుండి ఇన్ పుట్ (Input) తీసుకోవడం, వాళ్లకు నోటిఫికేషన్లు (Alerts) చూపించడం ప్రాథమికమైన పని. ఈ చాప్టర్ లో బ్రౌజర్ Dialogs (<code>alert</code>, <code>prompt</code>, <code>confirm</code>), ఇన్ పుట్స్ ని నంబర్లుగా మార్చే Parsing Functions (<code>Number</code>, <code>parseInt</code>, <code>parseFloat</code>), మరియు HTML Form Input రీడ్ చేయడం నేర్చుకుందాం!</p>
    </div>

    <div class="callout">
      <div class="callout-title">🚨 గుర్తుంచుకోవాల్సిన అతిముఖ్యమైన నియమం!</div>
      <p style="margin-top: 10px; color: var(--text2); font-size: 14.5px;"><code>prompt()</code> లేదా HTML Form <code>&lt;input&gt;</code> ద్వారా మీరు తీసుకునే ఏ డేటా అయినా బ్రౌజర్ <strong>String format</strong> లోనే ఇస్తుంది! మీరు <code>10</code> ఎంటర్ చేసినా అది <code>"10"</code> అనే వస్తుంది. దాన్ని లెక్కల్లో వాడే ముందు నంబర్ గా మార్చడం విధిగా చేయాలి!</p>
    </div>

    <div class="section-title"><span class="num">1</span>Browser Dialog Methods (alert, prompt, confirm)</div>
    <div class="section-body">
      <p>బ్రౌజర్లు యూజర్ కి పాపప్స్ ద్వారా మెసేజ్ లు చూపించడానికి 3 ఇన్-బిల్ట్ మెథడ్స్ ఇస్తాయి:</p>
      
      <table class="tbl">
        <tr><th>Dialog Method</th><th>రిటర్న్ టైప్ (Return Value)</th><th>వివరణ (Description)</th></tr>
        <tr>
          <td><strong><code>alert(message)</code></strong></td>
          <td><code>undefined</code></td>
          <td>యూజర్ కి ఒక వార్నింగ్ లేదా నోటీస్ బాక్స్ చూపిస్తుంది. OK కొట్టేవరకూ కోడ్ ఆగుతుంది.</td>
        </tr>
        <tr>
          <td><strong><code>prompt(text, default)</code></strong></td>
          <td><code>String</code> లేదా <code>null</code></td>
          <td>యూజర్ నుండి టెక్స్ట్ ఇన్ పుట్ తీసుకుంటుంది. యూజర్ Cancel కొడితే <code>null</code> ఇస్తుంది.</td>
        </tr>
        <tr>
          <td><strong><code>confirm(message)</code></strong></td>
          <td><code>Boolean</code> (<code>true</code> / <code>false</code>)</td>
          <td>యూజర్ ని అనుమానం అడగడానికి (Ex: "Are you sure?"). OK కొడితే <code>true</code>, Cancel కొడితే <code>false</code>.</td>
        </tr>
      </table>
    </div>

    <div class="section-title"><span class="num">2</span>Number Parsing: Number() vs parseInt() vs parseFloat()</div>
    <div class="section-body">
      <p>స్ట్రింగ్స్ ని నంబర్లుగా మార్చడానికి 3 ప్రధాన పద్ధతులు ఉన్నాయి:</p>
      
      <table class="tbl">
        <tr><th>Function</th><th>పనిచేసే విధానం (Behavior)</th><th>ఉదాహరణ (Example)</th><th>రిజల్ట్ (Result)</th></tr>
        <tr>
          <td><strong><code>Number(str)</code></strong></td>
          <td>స్ట్రింగ్ మొత్తాన్ని ఖచ్చితమైన నంబర్ గా మారుస్తుంది. ఏ అక్షరం ఉన్నా <code>NaN</code> ఇస్తుంది.</td>
          <td><code>Number("42.5px")</code></td>
          <td><code>NaN</code></td>
        </tr>
        <tr>
          <td><strong><code>parseInt(str, radix)</code></strong></td>
          <td>ముందున్న పుర్ణాంకాల్ని (Integers) మాత్రమే వెలికితీస్తుంది. టెక్స్ట్ ఉంటే వదిలేస్తుంది.</td>
          <td><code>parseInt("42.5px")</code></td>
          <td><code>42</code></td>
        </tr>
        <tr>
          <td><strong><code>parseFloat(str)</code></strong></td>
          <td>దశాంశ సంఖ్యలని (Decimals) కూడా సరిగ్గా మారుస్తుంది.</td>
          <td><code>parseFloat("42.5px")</code></td>
          <td><code>42.5</code></td>
        </tr>
      </table>
    </div>

    <div class="section-title"><span class="num">3</span>Invalid Input Handling (NaN & isNaN)</div>
    <div class="section-body">
      <p>యూజర్ నంబర్ కి బదులు టెక్స్ట్ ఎంటర్ చేస్తే (Ex: "abc"), మార్చే సమయంలో <code>NaN</code> (Not-a-Number) వస్తుంది. దీన్ని సరిచూడటానికి <code>Number.isNaN()</code> వాడాలి:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — Safe Input Validation</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>"use strict";

// Simulated user prompt input
let inputStr = "25"; 

let age = Number(inputStr);

if (Number.isNaN(age)) {
    console.log("❌ దయచేసి సరైన సంఖ్యను మాత్రమే ఎంటర్ చేయండి!");
} else {
    console.log("✅ మీ వయస్సు:", age);
    console.log("వచ్చే ఏటికి మీ వయస్సు:", age + 1);
}</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">4</span>HTML Form Input Reading via DOM</div>
    <div class="section-body">
      <p>రియల్ వరల్డ్ వెబ్ సైట్లలో పాపప్స్ కన్నా HTML Forms వాడతాం. JavaScript లో DOM ద్వారా ఇన్ పుట్ ఎలా రీడ్ చేయవచ్చో చూడండి:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">HTML + JavaScript Code Snippet</span>
        </div>
        <pre><code>&lt;!-- HTML Form Elements --&gt;
&lt;input type="text" id="num1" placeholder="First Number"&gt;
&lt;input type="text" id="num2" placeholder="Second Number"&gt;
&lt;button id="calcBtn"&gt;Add Numbers&lt;/button&gt;

&lt;script&gt;
document.getElementById("calcBtn").addEventListener("click", function() {
    let val1 = document.getElementById("num1").value;
    let val2 = document.getElementById("num2").value;

    let n1 = parseFloat(val1);
    let n2 = parseFloat(val2);

    if (Number.isNaN(n1) || Number.isNaN(n2)) {
        alert("దయచేసి సరియైన నంబర్లు ఎంటర్ చేయండి!");
    } else {
        alert("సమొత్తం (Sum): " + (n1 + n2));
    }
});
&lt;/script&gt;</code></pre>
      </div>
    </div>

    <div class="callout callout-warning">
      <div class="callout-title">⚠️ ప్రాక్టీస్ లో వచ్చే పొరపాట్లు (Common Mistakes)</div>
      <ul>
        <li><code>prompt()</code> ఇన్ పుట్ ని నంబర్ గా మార్చకుండా నేరుగా ప్లాస్ <code>+</code> చేయడం. <code>"10" + "20"</code> చేస్తే <code>"1020"</code> అవుతుంది కానీ <code>30</code> రాదు!</li>
        <li><code>parseInt("10", 10)</code> లో రెండవ పారామీటర్ (Radix 10 - Decimal system) ఇవ్వడం మర్చిపోవడం. ఎప్పుడూ Base 10 సూచించడం మంచి అలవాటు.</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">5</span>Practice Questions & Answers</div>
    <div class="section-body">
      <details>
        <summary>Q1. <code>parseInt("100px")</code> మరియు <code>Number("100px")</code> ల రిజల్ట్స్ ఏంటి?</summary>
        <div class="faq-ans">
          <p><strong>రిజల్ట్:</strong> <code>parseInt("100px")</code> ఇస్తుంది <code>100</code>. కానీ <code>Number("100px")</code> ఇస్తుంది <code>NaN</code>.</p>
          <p><strong>వివరణ:</strong> <code>parseInt</code> ముందున్న నంబర్స్ ని వెతికి <code>100</code> ని సంగ్రహిస్తుంది, కానీ <code>Number()</code> స్ట్రింగ్ మొత్తం కేవలం సంఖ్యలే ఉండాలని కోరుకుంటుంది.</p>
        </div>
      </details>

      <details>
        <summary>Q2. <code>prompt()</code> లో యూజర్ Cancel బటన్ కొడితే ఏం రిటర్న్ అవుతుంది?</summary>
        <div class="faq-ans">
          <p><strong>రిజల్ట్:</strong> <code>null</code>.</p>
          <p><strong>వివరణ:</strong> యూజర్ ఇన్ పుట్ ఇవ్వడానికి ఇష్టపడలేదని బ్రౌజర్ <code>null</code> ఆబ్జెక్ట్ ని రిటర్న్ చేస్తుంది.</p>
        </div>
      </details>
    </div>

    <div class="intro-box" style="background: rgba(34, 197, 94, 0.1); border-color: rgba(34, 197, 94, 0.3); margin-top:30px;">
      <h3 style="color:#22c55e; margin-bottom:8px;">📌 Quick Summary:</h3>
      <ul style="margin-left: 20px; color: var(--text2);">
        <li><code>prompt()</code> ఎప్పుడూ String ని ఇస్తుంది.</li>
        <li>నంబర్లుగా మార్చడానికి <code>Number()</code>, <code>parseInt()</code>, <code>parseFloat()</code> వాడాలి.</li>
        <li>ఇన్ పుట్ తప్పుగా ఉంటే <code>NaN</code> వస్తుంది, దాన్ని <code>Number.isNaN()</code> తో సరిచూడాలి.</li>
      </ul>
    </div>
`;

// Replace in p3Code
p3Code = p3Code.replace(/const contentBody = `[\s\S]*?`;\s*const html = wrapJSLessonPage\(title, desc, filename, 5, subtopics, contentBody/, `const contentBody = \`${p3Lesson5Content}\`;\n  const html = wrapJSLessonPage(title, desc, filename, 5, subtopics, contentBody`);
p3Code = p3Code.replace(/function buildLesson6\(\) \{[\s\S]*?const contentBody = `[\s\S]*?`;\s*const html = wrapJSLessonPage\(title, desc, filename, 6, subtopics, contentBody/, (match) => {
  const parts = match.split('const contentBody = `');
  return `${parts[0]}const contentBody = \`${p3Lesson6Content}\`;\n  const html = wrapJSLessonPage(title, desc, filename, 6, subtopics, contentBody`;
});

fs.writeFileSync(phase3Path, p3Code, 'utf8');
console.log("Updated build_javascript_phase3.js successfully!");


// ==========================================
// 2. REWRITE PHASE 5 (Lesson 8: loops.html)
// ==========================================
console.log("Rewriting Phase 5 (build_javascript_phase5.js)...");

const phase5Path = path.join(scratchDir, 'build_javascript_phase5.js');
let p5Code = fs.readFileSync(phase5Path, 'utf8');

const p5Lesson8Content = `
    <div class="intro-box">
      <p>ఒకే పనిని లేదా ఒకే కోడ్ ని పదే పదే రిపీట్ చేయడాన్ని <strong>Loops</strong> అంటారు. ఉదాహరణకు 1 నుండి 100 వరకు సంఖ్యలు ప్రింట్ చేయాలన్నా, లేదా డేటాబేస్ లోని 50 మంది యూజర్ల వివరాలు డిస్ప్లే చేయాలన్నా లూప్స్ అత్యంత అవసరం. ఈ చాప్టర్ లో <code>for</code>, <code>while</code>, <code>do...while</code>, <code>for...of</code>, మరియు <code>break/continue</code> ల గురించి స్పష్టంగా నేర్చుకుందాం!</p>
    </div>

    <div class="callout">
      <div class="callout-title">🏃‍♂️ రియల్ లైఫ్ అనలాజీ: రన్నింగ్ ట్రాక్ లో గ్రౌండ్ రౌండ్లు</div>
      <p style="margin-top: 10px; color: var(--text2); font-size: 14.5px;">మీరు ఒక రన్నింగ్ ట్రాక్ లో 5 రౌండ్లు తిరగాలి:</p>
      <ul style="margin-top: 10px; color: var(--text2); font-size: 14.5px;">
        <li><strong>స్టార్ట్ (Initialization):</strong> రౌండ్ కౌంట్ 1 దగ్గర ప్రారంభమవుతుంది (<code>let round = 1</code>).</li>
        <li><strong>కండిషన్ (Condition):</strong> రౌండ్ల సంఖ్య 5 దాటనంత వరకు పరిగెత్తుతారు (<code>round <= 5</code>).</li>
        <li><strong>అప్‌డేట్ (Increment):</strong> ప్రతి రౌండ్ పూర్తయ్యాక కౌంట్ ఒకటికి పెరుగుతుంది (<code>round++</code>).</li>
      </ul>
      <p style="margin-top: 10px; color: var(--text2); font-size: 14.5px;">జావాస్క్రిప్ట్ <code>for</code> లూప్ కూడా సరిగ్గా ఇదే సూత్రం పై పనిచేస్తుంది!</p>
    </div>

    <div class="section-title"><span class="num">1</span>Classic for Loop</div>
    <div class="section-body">
      <p>మనకి ఎన్ని సార్లు లూప్ తిరగాలో ముందుగానే తెలిసినప్పుడు <strong><code>for</code> loop</strong> వాడతాం.</p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — for Loop Syntax</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>// Syntax: for (ఆరంభం; షరతు; మార్పు)
for (let i = 1; i <= 5; i++) {
    console.log("రౌండ్ నంబర్ 🏃‍♂️:", i);
}</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">2</span>while Loop & do...while Loop</div>
    <div class="section-body">
      <p>కండిషన్ <code>true</code> అయినంత వరకు లూప్ తిరగాలి అనుకున్నప్పుడు <code>while</code> వాడతాం. <code>do...while</code> కనీసం ఒక్కసారైనా కోడ్ ని రన్ చేశాక కండిషన్ ని చెక్ చేస్తుంది!</p>

      <table class="tbl">
        <tr><th>Loop Type</th><th>కండిషన్ చెకింగ్ (Checking Time)</th><th>కనీస ఎగ్జిక్యూషన్ (Min Runs)</th></tr>
        <tr>
          <td><strong><code>while</code> Loop</strong></td>
          <td>లూప్ ప్రారంభంలోనే చెక్ చేస్తుంది (Pre-test loop)</td>
          <td>0 సార్లు (కండిషన్ మొదట్లోనే false అయితే అసలు రన్ అవ్వదు)</td>
        </tr>
        <tr>
          <td><strong><code>do...while</code> Loop</strong></td>
          <td>లూప్ చివర్లో చెక్ చేస్తుంది (Post-test loop)</td>
          <td><strong>కనీసం 1 సారి విధిగా రన్ అవుతుంది!</strong></td>
        </tr>
      </table>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — while vs do-while</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>"use strict";

// 1. while loop
let count = 1;
while (count <= 3) {
    console.log("While Count:", count);
    count++; // ఇది లేకపోతే ఇన్‌ఫినిట్ లూప్ అవుతుంది!
}

// 2. do-while loop (కండిషన్ ఫెయిల్ అయినా 1 సారి రన్ అవుతుంది)
let x = 10;
do {
    console.log("Do-While రన్ అయ్యింది! x =", x);
    x++;
} while (x < 5); // 10 < 5 అనేది false, అయినా పైన 1 సారి ప్రింట్ అయ్యింది!</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">3</span>Modern Iteration: for...of Loop</div>
    <div class="section-body">
      <p>అర్రేలు (Arrays) లేదా స్ట్రింగ్స్ లోని ప్రతి ఎలిమెంట్ ని సులభంగా ఇటరేట్ చేయడానికి ES6 లో <strong><code>for...of</code></strong> వచ్చింది.</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — for...of Iteration</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>let fruits = ["మామిడి 🥭", "అరటి 🍌", "జామ 🍏"];

for (let fruit of fruits) {
    console.log("పండు పేరు:", fruit);
}</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">4</span>Loop Control: break & continue</div>
    <div class="section-body">
      <ul>
        <li><strong><code>break</code>:</strong> లూప్ ని మధ్యలోనే పూర్తిగా ఆపేసి బయటకు వచ్చేస్తుంది.</li>
        <li><strong><code>continue</code>:</strong> ప్రస్తుత స్టెప్ ని మాత్రమే స్కిప్ చేసి, తర్వాత స్టెప్ కి వెళ్తుంది.</li>
      </ul>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — break and continue</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>"use strict";

console.log("--- continue ఉదాహరణ (3 ని స్కిప్ చేస్తుంది) ---");
for (let i = 1; i <= 5; i++) {
    if (i === 3) continue; // 3 వచ్చినప్పుడు స్కిప్ అయి 4 కి వెళ్తుంది
    console.log("Number:", i);
}

console.log("--- break ఉదాహరణ (3 రాగానే ఆగిపోతుంది) ---");
for (let i = 1; i <= 5; i++) {
    if (i === 3) break; // 3 రాగానే లూప్ ముగుస్తుంది
    console.log("Number:", i);
}</code></pre>
      </div>
    </div>

    <div class="callout callout-warning">
      <div class="callout-title">⚠️ ప్రాక్టీస్ లో వచ్చే పొరపాట్లు (Common Mistakes)</div>
      <ul>
        <li><strong>Infinite Loops (అంతం లేని లూప్‌లు):</strong> <code>while</code> లూప్ రాసేటప్పుడు <code>i++</code> (Increment) రాయడం మర్చిపోతే బ్రౌజర్/కంప్యూటర్ హ్యాంగ్ అయిపోతుంది!</li>
        <li><strong>Off-by-one Error:</strong> 10 సార్లు తిరగాల్సిన లూప్ 9 సార్లే తిరగడం (<code>i < 10</code> కి బదులు <code>i <= 10</code> వాడాలా లేదా అనేది సరిగ్గా చూసుకోకపోవడం).</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">5</span>Practice Questions & Answers</div>
    <div class="section-body">
      <details>
        <summary>Q1. <code>while(false)</code> మరియు <code>do { ... } while(false)</code> ల తేడా ఏంటి?</summary>
        <div class="faq-ans">
          <p><strong>రిజల్ట్:</strong> <code>while(false)</code> అస్సలు రన్ అవ్వదు. కానీ <code>do...while</code> కనీసం 1 సారి రన్ అయి ఆగుతుంది.</p>
        </div>
      </details>

      <details>
        <summary>Q2. <code>for...of</code> మరియు <code>for...in</code> కి ఉన్న తేడా ఏంటి?</summary>
        <div class="faq-ans">
          <p><strong>రిజల్ట్:</strong> <code>for...of</code> అర్రేలలోని <strong>Values (వాల్యూస్)</strong> ని ఇస్తుంది. <code>for...in</code> ఆబ్జెక్టులలోని <strong>Keys/Indices (కీలు/ఇండెక్స్ లు)</strong> ని ఇస్తుంది.</p>
        </div>
      </details>
    </div>

    <div class="intro-box" style="background: rgba(34, 197, 94, 0.1); border-color: rgba(34, 197, 94, 0.3); margin-top:30px;">
      <h3 style="color:#22c55e; margin-bottom:8px;">📌 Quick Summary:</h3>
      <ul style="margin-left: 20px; color: var(--text2);">
        <li>కౌంట్ తెలిస్తే <code>for</code> లూప్, షరతు మాత్రమే తెలిస్తే <code>while</code> వాడండి.</li>
        <li><code>do...while</code> కనీసం ఒకసారి ఖచ్చితంగా రన్ అవుతుంది.</li>
        <li>మధ్యలో ఆగడానికి <code>break</code>, ఒక స్టెప్ దాటవేయడానికి <code>continue</code> వాడండి.</li>
      </ul>
    </div>
`;

p5Code = p5Code.replace(/const contentBody = `[\s\S]*?`;\s*const html = wrapJSLessonPage\(title, desc, filename, 8, subtopics, contentBody/, `const contentBody = \`${p5Lesson8Content}\`;\n  const html = wrapJSLessonPage(title, desc, filename, 8, subtopics, contentBody`);

fs.writeFileSync(phase5Path, p5Code, 'utf8');
console.log("Updated build_javascript_phase5.js successfully!");


// ==========================================
// 3. REWRITE PHASE 6 (Lesson 9: strings.html)
// ==========================================
console.log("Rewriting Phase 6 (build_javascript_phase6.js)...");

const phase6Path = path.join(scratchDir, 'build_javascript_phase6.js');
let p6Code = fs.readFileSync(phase6Path, 'utf8');

const p6Lesson9Content = `
    <div class="intro-box">
      <p>టెక్స్ట్ డేటా (పేర్లు, మెసేజ్ లు, ఇమెయిళ్ళు) తో పనిచేయడానికి <strong>Strings</strong> వాడతాం. జావాస్క్రిప్ట్ లో స్ట్రింగ్స్ ని ఎలా క్రియేట్ చేయాలి, వాటిపై వివిధ మెథడ్స్ (<code>slice</code>, <code>replace</code>, <code>split</code>, <code>includes</code>) ఎలా వాడాలి, మరియు ES6 Template Literals ల గురించి ఈ పాఠంలో లోతుగా తెలుసుకుందాం!</p>
    </div>

    <div class="callout">
      <div class="callout-title">📿 రియల్ లైఫ్ అనలాజీ: పూల దండ (Necklace of Character Beads)</div>
      <p style="margin-top: 10px; color: var(--text2); font-size: 14.5px;">ఒక స్ట్రింగ్ ని ఒక పూల దండలా ఊహించుకోండి. అందులోని ప్రతి పువ్వుకు (అక్షరానికి) 0 నుండి మొదలయ్యే ఒక సంఖ్య (Index) ఉంటుంది:</p>
      <p style="margin-top: 8px; font-family: monospace; color: #f7df1e; font-size: 16px;">"MANA" -> M(0), A(1), N(2), A(3)</p>
      <p style="margin-top: 10px; color: var(--text2); font-size: 14.5px;">మొదటి అక్షరం ఎప్పుడూ Index 0 లో ఉంటుంది, చివరి అక్షరం <code>length - 1</code> లో ఉంటుంది.</p>
    </div>

    <div class="section-title"><span class="num">1</span>String Creation & Immutability (మార్చలేని తత్వం)</div>
    <div class="section-body">
      <p>స్ట్రింగ్స్ ని Double Quotes <code>"..."</code>, Single Quotes <code>'...'</code>, లేదా Backticks <code>&#96;...&#96;</code> ద్వారా క్రియేట్ చేయవచ్చు.</p>
      
      <div class="callout callout-warning">
        <div class="callout-title">⚠️ String Immutability అంటే ఏమిటి?</div>
        <p>JavaScript లో స్ట్రింగ్స్ <strong>Immutable (మార్చలేనివి)</strong>. అంటే ఒకసారి స్ట్రింగ్ క్రియేట్ అయ్యాక, అందులోని ఒక అక్షరాన్ని మార్చలేము! <code>str[0] = 'X'</code> అని రాస్తే అది మారదు. ఏదైనా మార్పు చేస్తే కొత్త స్ట్రింగ్ క్రియేట్ అవుతుంది తప్ప పాతది మారదు.</p>
      </div>
    </div>

    <div class="section-title"><span class="num">2</span>Essential String Methods</div>
    <div class="section-body">
      <p>డెవలపర్లు ప్రతిరోజూ వాడే ప్రధానమైన String Methods ఇవే:</p>

      <table class="tbl">
        <tr><th>Method</th><th>వివరణ (Description)</th><th>ఉదాహరణ (Example)</th><th>రిజల్ట్ (Result)</th></tr>
        <tr><td><code>length</code></td><td>స్ట్రింగ్ లోని మొత్తం అక్షరాల సంఖ్య</td><td><code>"Mana".length</code></td><td><code>4</code></td></tr>
        <tr><td><code>toUpperCase()</code></td><td>అన్ని అక్షరాలను పెద్దబలాలు (Capital letters) గా మారుస్తుంది</td><td><code>"hi".toUpperCase()</code></td><td><code>"HI"</code></td></tr>
        <tr><td><code>toLowerCase()</code></td><td>అన్ని అక్షరాలను చిన్నబలాలు గా మారుస్తుంది</td><td><code>"HI".toLowerCase()</code></td><td><code>"hi"</code></td></tr>
        <tr><td><code>trim()</code></td><td>ముందు, వెనుక ఉన్న అనవసర స్పేస్ లను తొలగిస్తుంది</td><td><code>" hi ".trim()</code></td><td><code>"hi"</code></td></tr>
        <tr><td><code>slice(start, end)</code></td><td>కావలసిన భాగాన్ని కట్ చేసి ఇస్తుంది (end ని వదిలేస్తుంది)</td><td><code>"JavaScript".slice(0, 4)</code></td><td><code>"Java"</code></td></tr>
        <tr><td><code>replace(old, new)</code></td><td>పాత పదాన్ని కొత్త పదంతో మారుస్తుంది</td><td><code>"Hello JS".replace("JS", "World")</code></td><td><code>"Hello World"</code></td></tr>
        <tr><td><code>includes(text)</code></td><td>ఆ పదం ఉందో లేదో <code>true/false</code> ఇస్తుంది</td><td><code>"JavaScript".includes("Script")</code></td><td><code>true</code></td></tr>
        <tr><td><code>split(delim)</code></td><td>స్ట్రింగ్ ని ముక్కలు చేసి Array గా మారుస్తుంది</td><td><code>"a,b,c".split(",")</code></td><td><code>["a", "b", "c"]</code></td></tr>
      </table>
    </div>

    <div class="section-title"><span class="num">3</span>ES6 Template Literals (Backticks &#96;...&#96;)</div>
    <div class="section-body">
      <p>పాత రోజుల్లో స్ట్రింగ్స్ ని కలపడానికి ప్లస్ <code>+</code> వాడేవాళ్ళం. కానీ ES6 లో <strong>Backticks (&#96;...&#96;)</strong> సహాయంతో <strong>Template Literals</strong> వచ్చాయి. వీటితో వేరియబుల్స్ ని నేరుగా <code>&#36;{variable}</code> అని కలపవచ్చు మరియు మల్టీ-లైన్ టెక్స్ట్ సులభంగా రాయవచ్చు!</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — Template Literals & Methods</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>"use strict";

let name = "Balaji";
let role = "Developer";

// 1. Template Literals (కలిపి రాయడం)
let msg = "నమస్తే " + name + "! మీరు ఒక క్లవర్ " + role + ".";
console.log(msg);

// 2. String Slicing & Splitting
let email = "  user@gmail.com  ";
let cleanEmail = email.trim(); // స్పేస్ లు పోయాయి
console.log("Clean Email:", cleanEmail);

let parts = cleanEmail.split("@");
console.log("Username:", parts[0]); // user
console.log("Domain:", parts[1]);   // gmail.com</code></pre>
      </div>
    </div>

    <div class="callout callout-warning">
      <div class="callout-title">⚠️ ప్రాక్టీస్ లో వచ్చే పొరపాట్లు (Common Mistakes)</div>
      <ul>
        <li><code>slice(0, 4)</code> వాడినప్పుడు 4 వ ఇండెక్స్ రాదు, కేవలం 0, 1, 2, 3 మాత్రమే వస్తాయి (End index is exclusive).</li>
        <li><code>replace()</code> మొదటి సారి వచ్చిన పదాన్ని మాత్రమే మారుస్తుంది. అన్ని పదాలు మారాలంటే <code>replaceAll()</code> వాడాలి.</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">4</span>Practice Questions & Answers</div>
    <div class="section-body">
      <details>
        <summary>Q1. <code>"JavaScript".slice(-6)</code> రాస్తే ఏం వస్తుంది?</summary>
        <div class="faq-ans">
          <p><strong>రిజల్ట్:</strong> <code>"Script"</code>.</p>
          <p><strong>వివరణ:</strong> <code>slice</code> లో నెగెటివ్ నంబర్ ఇస్తే స్ట్రింగ్ చివర నుండి లెక్కపెడుతుంది.</p>
        </div>
      </details>

      <details>
        <summary>Q2. ఒక స్ట్రింగ్ ని రివర్స్ (Reverse) చేయడం ఎలా?</summary>
        <div class="faq-ans">
          <p><strong>కోడ్:</strong> <code>str.split('').reverse().join('')</code></p>
          <p><strong>వివరణ:</strong> ముందుగా <code>split('')</code> ద్వారా అర్రేగా మార్చి, <code>reverse()</code> చేసి, ఆపై <code>join('')</code> తో మళ్ళీ స్ట్రింగ్ గా మారుస్తాం!</p>
        </div>
      </details>
    </div>

    <div class="intro-box" style="background: rgba(34, 197, 94, 0.1); border-color: rgba(34, 197, 94, 0.3); margin-top:30px;">
      <h3 style="color:#22c55e; margin-bottom:8px;">📌 Quick Summary:</h3>
      <ul style="margin-left: 20px; color: var(--text2);">
        <li>స్ట్రింగ్స్ Immutable. ఏ మార్పు చేసినా కొత్త స్ట్రింగ్ వస్తుంది.</li>
        <li>సులభంగా వేరియబుల్స్ కలపడానికి Backticks (<code>&#96;...&#96;</code>) వాడండి.</li>
        <li>ముక్కలు చేయడానికి <code>split()</code>, కట్ చేయడానికి <code>slice()</code> వాడండి.</li>
      </ul>
    </div>
`;

p6Code = p6Code.replace(/const contentBody = `[\s\S]*?`;\s*const html = wrapJSLessonPage\(title, desc, filename, 9, subtopics, contentBody/, `const contentBody = \`${p6Lesson9Content}\`;\n  const html = wrapJSLessonPage(title, desc, filename, 9, subtopics, contentBody`);

fs.writeFileSync(phase6Path, p6Code, 'utf8');
console.log("Updated build_javascript_phase6.js successfully!");


// ==========================================
// 4. REWRITE PHASE 7 (Lesson 10: arrays.html)
// ==========================================
console.log("Rewriting Phase 7 (build_javascript_phase7.js)...");

const phase7Path = path.join(scratchDir, 'build_javascript_phase7.js');
let p7Code = fs.readFileSync(phase7Path, 'utf8');

const p7Lesson10Content = `
    <div class="intro-box">
      <p>ఒకే వేరియబుల్ లో అనేక డేటా వాల్యూస్ ని వరసగా (Ordered list) దాచడానికి <strong>Arrays</strong> వాడతాం. షాపింగ్ లిస్ట్, యూజర్ల పేర్లు, లేదా మార్కుల వివరాలు దాచడానికి అర్రేలు అత్యంత అవసరం. ఈ చాప్టర్ లో Arrays Basics, Mutating Methods (<code>push</code>, <code>pop</code>, <code>shift</code>, <code>unshift</code>), మరియు Spread/Destructuring ల గురించి క్లియర్ గా తెలుసుకుందాం!</p>
    </div>

    <div class="callout">
      <div class="callout-title">💊 రియల్ లైఫ్ అనలాజీ: మెడిసిన్ పిల్ బాక్స్ (Pillbox with Compartments)</div>
      <p style="margin-top: 10px; color: var(--text2); font-size: 14.5px;">వారానికి సరిపడా టాబ్లెట్లు దాచే ఒక పిల్ బాక్స్ ని ఊహించుకోండి:</p>
      <p style="margin-top: 8px; font-family: monospace; color: #f7df1e; font-size: 16px;">[0: Monday Pill, 1: Tuesday Pill, 2: Wednesday Pill, ...]</p>
      <p style="margin-top: 10px; color: var(--text2); font-size: 14.5px;">అర్రే లోని ప్రతీ ఎలిమెంట్ కి 0 నుండి ఇండెక్స్ ఉంటుంది. మొదటి ఎలిమెంట్ <code>arr[0]</code> లోనూ, రెండవ ఎలిమెంట్ <code>arr[1]</code> లోనూ ఉంటాయి.</p>
    </div>

    <div class="section-title"><span class="num">1</span>Array Creation & Accessing Elements</div>
    <div class="section-body">
      <p>అర్రేలని Square Brackets <code>[...]</code> ఉపయోగించి క్రియేట్ చేస్తాం.</p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — Array Basics</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>let marks = [95, 88, 76, 90];
console.log("మొదటి సబ్జెక్ట్ మార్కులు:", marks[0]); // 95
console.log("మొత్తం సబ్జెక్టులు:", marks.length); // 4

// ఎలిమెంట్ ని మార్చడం
marks[2] = 80; // 76 ఉన్న చోట 80 కి మారింది
console.log("Updated Marks:", marks);</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">2</span>Mutating Methods: Add & Remove Elements</div>
    <div class="section-body">
      <p>అర్రే చివర లేదా మొదట్లో ఎలిమెంట్స్ ని చేర్చడానికి/తీసివేయడానికి 4 ప్రధాన మెథడ్స్ ఉన్నాయి:</p>

      <table class="tbl">
        <tr><th>Method</th><th>పనిచేసే ప్రదేశం (Location)</th><th>పని (Action)</th><th>ఉదాహరణ (Example)</th></tr>
        <tr><td><strong><code>push(item)</code></strong></td><td>అర్రే చివర (End)</td><td>కొత్త ఎలిమెంట్ ని చేరుస్తుంది (Adds element)</td><td><code>arr.push("Apple")</code></td></tr>
        <tr><td><strong><code>pop()</code></strong></td><td>అర్రే చివర (End)</td><td>చివరి ఎలిమెంట్ ని తొలగిస్తుంది (Removes last)</td><td><code>arr.pop()</code></td></tr>
        <tr><td><strong><code>unshift(item)</code></strong></td><td>అర్రే మొదట్లో (Start)</td><td>మొదట్లోనే కొత్త ఎలిమెంట్ ని చేరుస్తుంది (Adds at start)</td><td><code>arr.unshift("Mango")</code></td></tr>
        <tr><td><strong><code>shift()</code></strong></td><td>అర్రే మొదట్లో (Start)</td><td>మొదటి ఎలిమెంట్ ని తొలగిస్తుంది (Removes first)</td><td><code>arr.shift()</code></td></tr>
      </table>
    </div>

    <div class="section-title"><span class="num">3</span>Array Modification: slice() vs splice()</div>
    <div class="section-body">
      <div class="callout callout-warning">
        <div class="callout-title">⚠️ slice() vs splice() తేడా ఏంటి?</div>
        <ul>
          <li><strong><code>slice(start, end)</code>:</strong> పాత అర్రేని అస్సలు మార్చదు. కొత్త కాపీ ని మాత్రమే ఇస్తుంది (Non-mutating).</li>
          <li><strong><code>splice(start, deleteCount, item1...)</code>:</strong> ఒరిజినల్ అర్రే లో నుండి ఎలిమెంట్స్ ని తీసివేస్తుంది లేదా కొత్తవి చేరుస్తుంది (Mutating)!</li>
        </ul>
      </div>
    </div>

    <div class="section-title"><span class="num">4</span>ES6 Destructuring & Spread Operator (...)</div>
    <div class="section-body">
      <p>ES6 లో అర్రే ఎలిమెంట్స్ ని సులభంగా కాపీ చేయడానికి <strong>Spread Operator (<code>...</code>)</strong> మరియు విడదీయడానికి <strong>Destructuring</strong> బాగా ఉపయోగపడతాయి:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — Array Spread & Destructuring</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>"use strict";

let colors1 = ["Red", "Green"];
let colors2 = ["Blue", "Yellow"];

// 1. Spread Operator తో అర్రేలు కలపడం
let allColors = [...colors1, ...colors2];
console.log("All Colors:", allColors); // ["Red", "Green", "Blue", "Yellow"]

// 2. Array Destructuring
let [firstColor, secondColor] = colors1;
console.log("First:", firstColor);   // Red
console.log("Second:", secondColor); // Green</code></pre>
      </div>
    </div>

    <div class="callout callout-warning">
      <div class="callout-title">⚠️ ప్రాక్టీస్ లో వచ్చే పొరపాట్లు (Common Mistakes)</div>
      <ul>
        <li>లేని ఇండెక్స్ ని యాక్సెస్ చేస్తే Error రాదు, <code>undefined</code> వస్తుంది! (Ex: 3 ఎలిమెంట్స్ ఉన్న అర్రే లో <code>arr[10]</code> ని ప్రింట్ చేస్తే <code>undefined</code> వస్తుంది).</li>
        <li><code>const arr = [1, 2]</code> రాసినా <code>arr.push(3)</code> చేయవచ్చు! ఎందుకంటే అర్రే లోపలి వాల్యూస్ మారుతున్నాయి తప్ప అర్రే అడ్రస్ మారడం లేదు.</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">5</span>Practice Questions & Answers</div>
    <div class="section-body">
      <details>
        <summary>Q1. <code>shift()</code> మరియు <code>pop()</code> కి తేడా ఏమిటి?</summary>
        <div class="faq-ans">
          <p><strong>రిజల్ట్:</strong> <code>pop()</code> అర్రే యొక్క చివరి ఎలిమెంట్ ని తొలగిస్తుంది, <code>shift()</code> మొదటి ఎలిమెంట్ ని తొలగిస్తుంది.</p>
        </div>
      </details>

      <details>
        <summary>Q2. రెండు అర్రేలని క్లోనింగ్ (Clone/Copy) చేయడానికి సరైన మార్గం ఏది?</summary>
        <div class="faq-ans">
          <p><strong>కోడ్:</strong> <code>let copy = [...original];</code></p>
          <p><strong>వివరణ:</strong> <code>let copy = original</code> అని రాస్తే రెండూ ఒకే మెమరీ అడ్రస్ ని పాయింట్ చేస్తాయి. Spread operator వాడితే కొత్త శ్రేణి క్రియేట్ అవుతుంది.</p>
        </div>
      </details>
    </div>

    <div class="intro-box" style="background: rgba(34, 197, 94, 0.1); border-color: rgba(34, 197, 94, 0.3); margin-top:30px;">
      <h3 style="color:#22c55e; margin-bottom:8px;">📌 Quick Summary:</h3>
      <ul style="margin-left: 20px; color: var(--text2);">
        <li>అర్రేలు ఇండెక్స్ 0 నుండి ప్రారంభమవుతాయి.</li>
        <li>చివర మార్పులకు <code>push/pop</code>, మొదట్లో మార్పులకు <code>unshift/shift</code> వాడండి.</li>
        <li>అర్రేలని కలపడానికి/కాపీ చేయడానికి Spread Operator (<code>...</code>) వాడండి.</li>
      </ul>
    </div>
`;

p7Code = p7Code.replace(/const contentBody = `[\s\S]*?`;\s*const html = wrapJSLessonPage\(title, desc, filename, 10, subtopics, contentBody/, `const contentBody = \`${p7Lesson10Content}\`;\n  const html = wrapJSLessonPage(title, desc, filename, 10, subtopics, contentBody`);

fs.writeFileSync(phase7Path, p7Code, 'utf8');
console.log("Updated build_javascript_phase7.js successfully!");
