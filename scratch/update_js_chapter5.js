const fs = require('fs');
const path = require('path');

const phase3Path = path.join(__dirname, 'build_javascript_phase3.js');
let code = fs.readFileSync(phase3Path, 'utf8');

const chapter5Content = `
    <div class="intro-box">
      <p>కాలిక్యులేటర్ లో <code>+</code>, <code>-</code>, <code>×</code>, <code>÷</code> బటన్లు చూశారు కదా? వాటి పని సంఖ్యలతో ఏదో ఒక చర్య (operation) చేయడం. Programming లో ఇలాంటి చిహ్నాలనే <strong>Operators</strong> అంటారు.</p>
      <p>ఒక చర్య చేయడానికి కావాల్సినవి రెండు: చర్యను సూచించే చిహ్నం (operator) మరియు ఆ చర్య జరిగే విలువలు (<strong>operands</strong>). ఉదాహరణకు <code>5 + 3</code> లో <code>+</code> అనేది operator, <code>5</code> మరియు <code>3</code> అనేవి operands.</p>
      <p>ఈ chapter లో ముఖ్యమైన మూడు రకాల operators నేర్చుకుందాం: లెక్కలకు (arithmetic), పోలికలకు (comparison), నిర్ణయాలకు (logical).</p>
    </div>

    <div class="section-title"><span class="num">1</span>ఈ chapter లో మీరు నేర్చుకునేవి</div>
    <div class="section-body">
      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.6;">
        <li>Arithmetic operators: <code>+ - * / % **</code></li>
        <li>Increment, decrement (<code>++</code>, <code>--</code>) మరియు assignment operators (<code>+=</code>, <code>-=</code>)</li>
        <li>Comparison operators: <code>==</code> మరియు <code>===</code> మధ్య తేడా</li>
        <li>Logical operators: <code>&&</code>, <code>||</code>, <code>!</code></li>
        <li>Ternary operator (చిన్న if-else)</li>
        <li>Operator precedence (ఏ చర్య ముందు జరుగుతుంది)</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">2</span>1. Arithmetic Operators (లెక్కల operators)</div>
    <div class="section-body">
      <table class="tbl">
        <tr><th>Operator</th><th>పని</th><th>ఉదాహరణ</th><th>ఫలితం</th></tr>
        <tr><td><code>+</code></td><td>కూడిక</td><td><code>10 + 3</code></td><td><code>13</code></td></tr>
        <tr><td><code>-</code></td><td>తీసివేత</td><td><code>10 - 3</code></td><td><code>7</code></td></tr>
        <tr><td><code>*</code></td><td>గుణకారం</td><td><code>10 * 3</code></td><td><code>30</code></td></tr>
        <tr><td><code>/</code></td><td>భాగహారం</td><td><code>10 / 3</code></td><td><code>3.3333333333333335</code></td></tr>
        <tr><td><code>%</code></td><td>శేషం (Modulus)</td><td><code>10 % 3</code></td><td><code>1</code></td></tr>
        <tr><td><code>**</code></td><td>ఘాతం (Power)</td><td><code>10 ** 3</code></td><td><code>1000</code></td></tr>
      </table>

      <div class="code-block" style="margin-top:15px;">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — Arithmetic Operators</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>let a = 10;
let b = 3;

console.log(a + b);   // 13
console.log(a - b);   // 7
console.log(a * b);   // 30
console.log(a / b);   // 3.3333333333333335
console.log(a % b);   // 1
console.log(a ** b);  // 1000</code></pre>
      </div>

      <h3 style="margin-top: 20px; margin-bottom: 8px; font-size: 16px;">% (Modulus) ని అర్థం చేసుకుందాం</h3>
      <div class="callout">
        <div class="callout-title">🍬 రియల్ లైఫ్ అనలాజీ: లడ్డూల పంపకం</div>
        <p style="margin-top: 8px; color: var(--text2); font-size: 14.5px;">17 లడ్డూలను 5 మంది పిల్లలకు సమానంగా పంచారనుకోండి. ప్రతి ఒక్కరికి 3 లడ్డూలు వస్తాయి, 2 లడ్డూలు మిగులుతాయి. ఆ మిగిలిన 2 యే <code>17 % 5</code>.</p>
      </div>

      <h3 style="margin-top: 15px; margin-bottom: 8px; font-size: 16px;">% తో సరి/బేసి సంఖ్యలు తెలుసుకోవడం</h3>
      <p>ఒక సంఖ్యను 2 తో భాగిస్తే శేషం <code>0</code> వస్తే అది <strong>సరి సంఖ్య (even)</strong>, <code>1</code> వస్తే <strong>బేసి సంఖ్య (odd)</strong>.</p>
      <div class="code-block">
        <pre><code>console.log(10 % 2); // 0 (Even)
console.log(7 % 2);  // 1 (Odd)
console.log(10 % 2 === 0); // true</code></pre>
      </div>

      <h3 style="margin-top: 15px; margin-bottom: 8px; font-size: 16px;">ఉదాహరణ: షాప్ బిల్లు లెక్కించడం</h3>
      <div class="code-block">
        <pre><code>const price = 250;
const quantity = 3;

const subtotal = price * quantity;
const gst = subtotal * 18 / 100;
const total = subtotal + gst;

console.log("Subtotal:", subtotal); // 750
console.log("GST (18%):", gst);     // 135
console.log("మొత్తం బిల్లు:", total); // 885</code></pre>
      </div>

      <h3 style="margin-top: 15px; margin-bottom: 8px; font-size: 16px;">Operator precedence: ఏ చర్య ముందు జరుగుతుంది?</h3>
      <div class="code-block">
        <pre><code>console.log(2 + 3 * 4);   // 14 (గుణకారం ముందు జరిగింది: 3 * 4 = 12 + 2)
console.log((2 + 3) * 4); // 20 (Brackets ముందు జరిగాయి: 5 * 4)</code></pre>
      </div>
      <p>గణితంలో లాగే, JavaScript లో కూడా గుణకారం, భాగహారం కూడిక, తీసివేత కంటే ముందు జరుగుతాయి. ఎటువంటి సందేహం ఉన్నా Brackets <code>( )</code> వాడండి.</p>
    </div>

    <div class="section-title"><span class="num">3</span>2. Increment (++) మరియు Decrement (--)</div>
    <div class="section-body">
      <p>ఒక విలువను 1 పెంచడానికి <code>++</code>, 1 తగ్గించడానికి <code>--</code> వాడతాం.</p>
      <div class="code-block">
        <pre><code>let count = 5;

count++;
console.log(count); // 6

count--;
console.log(count); // 5</code></pre>
      </div>

      <h3 style="margin-top: 15px; margin-bottom: 8px; font-size: 16px;">x++ మరియు ++x మధ్య తేడా</h3>
      <div class="code-block">
        <pre><code>let x = 5;

console.log(x++); // 5 (ముందు పాత విలువ ఇచ్చి, తర్వాత పెంచుతుంది)
console.log(x);   // 6
console.log(++x); // 7 (ముందు పెంచి, తర్వాత కొత్త విలువ ఇస్తుంది)</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">4</span>3. Assignment Operators (విలువ పెట్టే operators)</div>
    <div class="section-body">
      <table class="tbl">
        <tr><th>Operator</th><th>అర్థం</th><th>సమానమైన రూపం</th></tr>
        <tr><td><code>+=</code></td><td>కూడి పెట్టు</td><td><code>x = x + 5</code></td></tr>
        <tr><td><code>-=</code></td><td>తీసివేసి పెట్టు</td><td><code>x = x - 5</code></td></tr>
        <tr><td><code>*=</code></td><td>గుణించి పెట్టు</td><td><code>x = x * 5</code></td></tr>
        <tr><td><code>/=</code></td><td>భాగించి పెట్టు</td><td><code>x = x / 5</code></td></tr>
      </table>

      <div class="code-block" style="margin-top:15px;">
        <pre><code>let total = 100;

total += 50;
console.log(total); // 150 (జమ)

total -= 30;
console.log(total); // 120 (ఖర్చు)

total *= 2;
console.log(total); // 240 (రెట్టింపు)

total /= 4;
console.log(total); // 60  (నాల్గవ వంతు)</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">5</span>4. Comparison Operators (పోలిక operators)</div>
    <div class="section-body">
      <table class="tbl">
        <tr><th>Operator</th><th>అర్థం</th><th>ఉదాహరణ</th><th>ఫలితం</th></tr>
        <tr><td><code>></code></td><td>కంటే ఎక్కువ</td><td><code>5 > 3</code></td><td><code>true</code></td></tr>
        <tr><td><code><</code></td><td>కంటే తక్కువ</td><td><code>5 < 3</code></td><td><code>false</code></td></tr>
        <tr><td><code>>=</code></td><td>ఎక్కువ లేదా సమానం</td><td><code>5 >= 5</code></td><td><code>true</code></td></tr>
        <tr><td><code><=</code></td><td>తక్కువ లేదా సమానం</td><td><code>5 <= 4</code></td><td><code>false</code></td></tr>
        <tr><td><code>===</code></td><td>సమానమా (type తో సహా)</td><td><code>5 === 5</code></td><td><code>true</code></td></tr>
        <tr><td><code>!==</code></td><td>సమానం కాదా (type తో సహా)</td><td><code>5 !== 6</code></td><td><code>true</code></td></tr>
      </table>

      <h3 style="margin-top: 20px; margin-bottom: 8px; font-size: 16px;">== మరియు === మధ్య ముఖ్యమైన తేడా</h3>
      <div class="code-block">
        <pre><code>console.log(5 == "5");   // true  (Types వేరైనా ఆటోమేటిక్ గా మార్చి పోల్చింది)
console.log(5 === "5");  // false (విలువ మరియు type రెండూ పోల్చింది - Strict!)
console.log(5 != "5");   // false
console.log(5 !== "5");  // true</code></pre>
      </div>

      <div class="callout callout-warning">
        <div class="callout-title">⚠️ బంగారు నియమం:</div>
        <p>ఎప్పుడూ <strong><code>===</code></strong> మరియు <strong><code>!==</code></strong> వాడండి. <code>==</code> మరియు <code>!=</code> ని వాడకండి. దీనివల్ల ఊహించని bugs రావు.</p>
      </div>

      <h3 style="margin-top: 15px; margin-bottom: 8px; font-size: 16px;">Strings పోలిక</h3>
      <div class="code-block">
        <pre><code>console.log("apple" < "banana"); // true  (అక్షరక్రమం ప్రకారం 'a' ముందు వస్తుంది)
console.log("apple" === "Apple"); // false (చిన్న, పెద్ద అక్షరాలు వేరు)</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">6</span>5. Logical Operators (&&, ||, !)</div>
    <div class="section-body">
      <div class="callout">
        <div class="callout-title">💡 రియల్ లైఫ్ అనలాజీ:</div>
        <ul style="margin-top: 8px; color: var(--text2); font-size: 14.5px;">
          <li><strong>&& (AND):</strong> ATM లో డబ్బు రావాలంటే కార్డ్ <strong>మరియు</strong> PIN రెండూ సరిగ్గా ఉండాలి.</li>
          <li><strong>|| (OR):</strong> షాప్ లో బిల్లు కట్టడానికి Cash <strong>లేదా</strong> UPI, ఏదైనా ఒకటి ఉంటే చాలు.</li>
          <li><strong>! (NOT):</strong> స్విచ్ ఆన్ ని ఆఫ్ గా, <code>true</code> ని <code>false</code> గా మారుస్తుంది.</li>
        </ul>
      </div>

      <h3 style="margin-top: 15px; margin-bottom: 8px; font-size: 16px;">Truth Table</h3>
      <table class="tbl">
        <tr><th>A</th><th>B</th><th>A && B</th><th>A || B</th><th>!A</th></tr>
        <tr><td><code>true</code></td><td><code>true</code></td><td><code>true</code></td><td><code>true</code></td><td><code>false</code></td></tr>
        <tr><td><code>true</code></td><td><code>false</code></td><td><code>false</code></td><td><code>true</code></td><td><code>false</code></td></tr>
        <tr><td><code>false</code></td><td><code>true</code></td><td><code>false</code></td><td><code>true</code></td><td><code>true</code></td></tr>
        <tr><td><code>false</code></td><td><code>false</code></td><td><code>false</code></td><td><code>false</code></td><td><code>true</code></td></tr>
      </table>

      <h3 style="margin-top: 15px; margin-bottom: 8px; font-size: 16px;">ఉదాహరణ: ఓటు అర్హత & సెలవు రోజు</h3>
      <div class="code-block">
        <pre><code>const age = 20;
const isCitizen = true;
console.log("ఓటు వేయొచ్చా?", age >= 18 && isCitizen); // true

const isSunday = false;
const isFestival = true;
console.log("ఈ రోజు సెలవా?", isSunday || isFestival);        // true
console.log("ఈ రోజు పని దినమా?", !(isSunday || isFestival)); // false</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">7</span>6. Ternary Operator: చిన్న if-else</div>
    <div class="section-body">
      <p>ఒక షరతు ఆధారంగా రెండు విలువల్లో ఒకదాన్ని ఎంచుకోవడానికి Ternary Operator వాడతాం:</p>
      <div class="code-block">
        <pre><code>const marks = 60;
const result = marks >= 35 ? "Pass" : "Fail";
console.log(result); // Pass</code></pre>
      </div>
      <p><code>marks >= 35</code> నిజం కాబట్టి <code>?</code> తర్వాత ఉన్న <code>"Pass"</code> ఎంపిక అయ్యింది. False అయితే <code>:</code> తర్వాత ఉన్న <code>"Fail"</code> వచ్చేది.</p>
    </div>

    <div class="callout callout-warning">
      <div class="callout-title">⚠️ Beginners చేసే సాధారణ తప్పులు</div>
      <ul>
        <li><strong>=== బదులు = వాడటం:</strong> <code>if (x = 5)</code> అని రాస్తే అది విలువ పెట్టేస్తుంది (Assignment), పోల్చదు! పోల్చడానికి ఎప్పుడూ <code>===</code> వాడండి.</li>
        <li><strong>String మరియు number ని కూడటం:</strong> <code>"2" + 3</code> ఫలితం <code>"23"</code> అవుతుంది. కానీ <code>"2" * 3</code> ఫలితం <code>6</code> మరియు <code>"10" - 5</code> ఫలితం <code>5</code> అవుతాయి.</li>
        <li><strong>Number strings ని పోల్చడం:</strong> <code>"10" < "9"</code> ఫలితం <code>true</code>! ఎందుకంటే strings ని అక్షరక్రమం ప్రకారం పోలుస్తుంది. సంఖ్యలుగా పోల్చాలంటే నంబర్ టైప్ లో ఉండాలి.</li>
        <li><strong>వరుసగా పోలికలు రాయడం:</strong> <code>1 < 5 < 3</code> ఇస్తుంది <code>true</code>! ఎందుకంటే <code>1 < 5</code> (true/1) అయి <code>1 < 3</code> అవుతుంది. సరైన మార్గం: <code>5 > 1 && 5 < 3</code>.</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">8</span>ప్రాక్టీస్ ప్రశ్నలు & సమాధానాలు</div>
    <div class="section-body">
      <ol style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.6;">
        <li><code>a = 20</code>, <code>b = 6</code> అయితే <code>a + b</code>, <code>a - b</code>, <code>a * b</code>, <code>a / b</code>, <code>a % b</code> విలువలు కనుక్కోండి.</li>
        <li>ఒక సంఖ్య సరి సంఖ్యా కాదా చెక్ చేసే expression రాయండి. (సంఖ్య <code>42</code>)</li>
        <li><code>P = 1000</code>, <code>R = 5</code>, <code>T = 2</code> అయితే సాధారణ వడ్డీ (Simple Interest = P × R × T / 100) లెక్కించి print చేయండి.</li>
        <li>ఈ ఫలితాలు ఏమిటి? <code>10 == "10"</code>, <code>10 === "10"</code>, <code>true && false</code>, <code>true || false</code>, <code>!true</code>.</li>
        <li>ఒక సంవత్సరం leap year అవునా కాదా తెలుసుకునే code రాయండి (2024 మరియు 1900 లతో).</li>
      </ol>

      <details style="margin-top: 15px; background: var(--bg2); border: 1px solid var(--border); padding: 12px; border-radius: 8px; cursor: pointer;">
        <summary style="font-weight: bold; color: var(--text);">సమాధానాలు చూడండి</summary>
        <div style="margin-top: 10px; font-size: 14px; color: var(--text2);">
          <p><strong>1.</strong> <code>26</code>, <code>14</code>, <code>120</code>, <code>3.3333333333333335</code>, <code>2</code>.</p>
          <p style="margin-top: 8px;"><strong>2.</strong> <code>42 % 2 === 0</code> (Output: <code>true</code>).</p>
          <p style="margin-top: 8px;"><strong>3.</strong> <code>const simpleInterest = 1000 * 5 * 2 / 100; console.log(simpleInterest);</code> (Output: <code>100</code>).</p>
          <p style="margin-top: 8px;"><strong>4.</strong> <code>true</code>, <code>false</code>, <code>false</code>, <code>true</code>, <code>false</code>.</p>
          <p style="margin-top: 8px;"><strong>5.</strong><br>
          <code>const isLeap = (y) => (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;</code><br>
          2024: <code>true</code> (Leap year), 1900: <code>false</code> (Leap year కాదు).</p>
        </div>
      </details>
    </div>

    <div class="try-box">
      <div class="try-title">🚀 మీరే try చేయండి</div>
      <p style="color:var(--text2); font-size:14px; margin-bottom:12px;">ఈ code ని మన compiler లో run చేసి, విలువలు మార్చి ఫలితాలు చూడండి:</p>
      <div class="code-block">
        <pre><code>const itemPrice = 120;
const quantity = 4;
const discountPercent = 10;

const subtotal = itemPrice * quantity;
const discount = subtotal * discountPercent / 100;
const finalAmount = subtotal - discount;

console.log("Subtotal:", subtotal);
console.log("Discount:", discount);
console.log("చెల్లించాల్సిన మొత్తం:", finalAmount);
console.log("ఉచిత డెలివరీ అర్హత (₹400 పైన)?", finalAmount > 400);</code></pre>
      </div>
      <a class="run-btn" href="/?lang=nodejs">👉 Our Compiler లో JavaScript try చేయండి</a>
    </div>

    <div class="intro-box" style="background: rgba(34, 197, 94, 0.1); border-color: rgba(34, 197, 94, 0.3); margin-top:30px;">
      <h3 style="color:#22c55e; margin-bottom:8px;">📌 Quick Summary:</h3>
      <ul style="margin-left: 20px; color: var(--text2);">
        <li><strong>Operator</strong> అంటే సంఖ్యలు/విలువలతో చర్య చేసే చిహ్నం. విలువలను <strong>operands</strong> అంటారు.</li>
        <li><strong>Arithmetic:</strong> <code>+ - * / % **</code>. <code>%</code> శేషాన్ని ఇస్తుంది, సరి/బేసి చెక్ చేయడానికి వాడతాం.</li>
        <li><code>++</code> / <code>--</code> విలువను 1 పెంచుతాయి/తగ్గిస్తాయి. <code>+=</code>, <code>-=</code> సంక్షిప్త రూపాలు.</li>
        <li><strong>Comparison:</strong> <code>> < >= <= === !==</code> ఫలితంగా boolean ఇస్తాయి. ఎప్పుడూ <code>===</code> వాడండి.</li>
        <li><strong>Logical:</strong> <code>&&</code> (రెండు నిజం), <code>||</code> (ఏదైనా ఒకటి నిజం), <code>!</code> (వ్యతిరేకం).</li>
        <li><strong>Ternary:</strong> <code>షరతు ? విలువ1 : విలువ2</code>.</li>
      </ul>
    </div>
`;

// Replace in buildLesson5
const startIdx = code.indexOf('function buildLesson5() {');
const nextFnIdx = code.indexOf('function buildLesson6() {', startIdx);

const lesson5Func = `function buildLesson5() {
  const title = "JavaScript Operators తెలుగులో | Arithmetic, Comparison, Logical Operators";
  const desc = "JavaScript లో operators అంటే ఏమిటి, arithmetic (+ - * / %), comparison (== vs ===), logical (&& || !) operators మరియు ternary operator ని తెలుగులో ఉదాహరణలతో నేర్చుకోండి.";
  const filename = "05-operators-expressions-and-precedence.html";
  const subtopics = "Arithmetic (+ - * / % **) · ++ / -- · += -= · Comparison (== vs ===) · Logical (&& || !) · Ternary Operator";

  const contentBody = \`${chapter5Content}\`;

  const html = wrapJSLessonPage(title, desc, filename, 5, subtopics, contentBody, 'operators.html', '4. Data Types (string, number...)', '06-browser-input-and-number-parsing.html', '6. Input & Output (alert, prompt...)');
  fs.writeFileSync(path.join(jsDir, filename), html, 'utf8');
  console.log(\`✅ Generated \${filename}\`);
}

`;

code = code.slice(0, startIdx) + lesson5Func + code.slice(nextFnIdx);

fs.writeFileSync(phase3Path, code, 'utf8');
console.log("Successfully updated Chapter 5 in build_javascript_phase3.js");
