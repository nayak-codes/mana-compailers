const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const jsDir = path.join(publicDir, 'blog-javascript');

const master = require('./build_master_js_curriculum.js');

const chapter9Body = `
    <!-- ====================================================================
         👇 CHAPTER CONTENT: Chapter 9 switch Statement (Telugu) 👇
         ==================================================================== -->

    <div class="intro-box">
      <p>TV remote లో మీరు <strong>5</strong> నొక్కితే 5వ channel వస్తుంది, <strong>7</strong> నొక్కితే 7వ channel వస్తుంది. ఒకే remote, ఒకే పని (channel మార్చడం), కానీ మీరు నొక్కిన నంబర్ ని బట్టి వేర్వేరు ఫలితం వస్తుంది. లిఫ్ట్ లో కూడా అంతే: ఏ floor బటన్ నొక్కారో ఆ floor కి వెళ్తుంది.</p>
      <p>Programming లో ఇలా <em>"ఒకే విలువను చాలా options తో పోల్చి, సరిపోయిన దానికి సంబంధించిన పని చేయడానికి"</em> <code>switch</code> వాడతాం. ఇది గత chapter లో నేర్చుకున్న <code>else if</code> ladder కి ఒక చక్కని, చదవడానికి మరియు నిర్వహించడానికి ఎంతో సులభమైన ప్రత్యామ్నాయం.</p>
    </div>

    <div class="section-title"><span class="num">1</span>ఈ chapter లో మీరు నేర్చుకునేవి</div>
    <div class="section-body">
      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.6;">
        <li><code>switch</code> యొక్క syntax: <code>case</code>, <code>break</code>, <code>default</code></li>
        <li><code>break</code> మర్చిపోతే ఏమవుతుంది (fall-through కాన్సెప్ట్)</li>
        <li>ఒకటి కంటే ఎక్కువ case లకు ఒకే పని ఎలా చేయాలి (Multi-case grouping)</li>
        <li><code>switch</code> లో పోలిక strict (<code>===</code>) అని ఎందుకు గుర్తుంచుకోవాలి</li>
        <li><code>switch</code> మరియు <code>if-else</code> మధ్య ఏది ఎప్పుడు వాడాలి</li>
        <li>సాధారణంగా విద్యార్థులు చేసే తప్పులు & పరిష్కారాలు</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">2</span>switch ఎలా రాస్తారు? (Syntax & Components)</div>
    <div class="section-body">
      <p><strong>Syntax:</strong></p>
      <div class="code-block">
        <pre><code>switch (విలువ) {
  case option1:
    // విలువ option1 కి సమానమైతే ఈ code
    break;
  case option2:
    // విలువ option2 కి సమానమైతే ఈ code
    break;
  default:
    // ఏదీ సరిపోకపోతే ఈ code
}</code></pre>
      </div>

      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.6; margin-top: 14px;">
        <li><code>switch (విలువ)</code>: ఏ variable లేదా expression విలువను చెక్ చేయాలో కుండలీకరణాల్లో ఇస్తాం.</li>
        <li><code>case</code>: ఒక్కో option. "ఈ విలువ అయితే" అని అర్థం.</li>
        <li><code>break</code>: "ఇక్కడితో పని పూర్తయింది, switch నుంచి బయటకు రా" అని JavaScript కి చెబుతుంది.</li>
        <li><code>default</code>: ఏ <code>case</code> సరిపోకపోతే run అయ్యే చివరి భాగం (ఇది <code>if-else</code> లోని <code>else</code> లాంటిది). ఇది ఐచ్ఛికం (optional), కానీ రాయడం ఉత్తమమైన పద్ధతి.</li>
      </ul>

      <h3 style="margin-top: 24px; margin-bottom: 8px; font-size: 16px;">ఉదాహరణ 1: వారంలో రోజు పేరు</h3>
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — switch</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>const day = 3;

switch (day) {
  case 1:
    console.log("సోమవారం");
    break;
  case 2:
    console.log("మంగళవారం");
    break;
  case 3:
    console.log("బుధవారం");
    break;
  case 4:
    console.log("గురువారం");
    break;
  case 5:
    console.log("శుక్రవారం");
    break;
  case 6:
    console.log("శనివారం");
    break;
  case 7:
    console.log("ఆదివారం");
    break;
  default:
    console.log("తప్పు సంఖ్య (1 నుండి 7 మాత్రమే)");
}</code></pre>
      </div>
      <div class="code-output" style="background:#0b1120; border:1px solid #1e293b; border-radius:8px; padding:12px 16px; margin-top:10px; font-family:monospace; color:#38bdf8; font-size:13.5px;">
        <span style="color:#64748b;">Output:</span><br>
        బుధవారం
      </div>

      <h3 style="margin-top: 20px; margin-bottom: 8px; font-size: 16px;">Code అర్థం చేసుకుందాం:</h3>
      <ol style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.6;">
        <li><code>day</code> విలువ <code>3</code>. JavaScript దాన్ని మొదటి <code>case 1</code> తో పోలుస్తుంది: సరిపోలేదు, దాటేసింది.</li>
        <li><code>case 2</code> తో పోల్చింది: సరిపోలేదు, దాటేసింది.</li>
        <li><code>case 3</code> తో పోల్చింది: <strong>సరిపోయింది!</strong> కాబట్టి ఆ case లోని code run అయ్యి <code>"బుధవారం"</code> అని print చేసింది.</li>
        <li>వెంటనే <code>break</code> కనిపించడంతో switch block నుంచి బయటకు వచ్చేసింది. మిగతా cases ని అసలు చూడలేదు.</li>
      </ol>
      <p style="margin-top: 8px; color: var(--text2);">ఒకవేళ <code>day = 9</code> ఇచ్చి ఉంటే ఏ case సరిపోదు, అప్పుడు <code>default</code> run అయ్యి <code>"తప్పు సంఖ్య (1 నుండి 7 మాత్రమే)"</code> వచ్చేది.</p>
    </div>

    <div class="section-title"><span class="num">3</span>break ఎందుకు ముఖ్యం? (Fall-through)</div>
    <div class="section-body">
      <p><code>break</code> లేకపోతే ఏమవుతుంది? ఇది switch లో విద్యార్థులు తప్పక తెలుసుకోవాల్సిన అతి ముఖ్యమైన కాన్సెప్ట్. కింద చిన్న ప్రయోగం చేసి చూద్దాం:</p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — Without break</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>const n = 2;

switch (n) {
  case 1:
    console.log("ఒకటి");
  case 2:
    console.log("రెండు");
  case 3:
    console.log("మూడు");
  default:
    console.log("default");
}</code></pre>
      </div>
      <div class="code-output" style="background:#0b1120; border:1px solid #1e293b; border-radius:8px; padding:12px 16px; margin-top:10px; font-family:monospace; color:#38bdf8; font-size:13.5px;">
        <span style="color:#64748b;">Output:</span><br>
        రెండు<br>
        మూడు<br>
        default
      </div>

      <p style="margin-top: 12px; color: var(--text2);"><code>n = 2</code> అయినప్పుడు "రెండు" ఒక్కటే రావాలి కదా? కానీ "మూడు" మరియు "default" కూడా ఎందుకు వచ్చాయి?</p>
      <div class="callout callout-warning" style="margin-top: 10px;">
        <div class="callout-title">🌊 Fall-through అంటే ఏమిటి?</div>
        <p style="margin-top: 8px; color: var(--text2); font-size: 14.5px;">ఒక్కసారి ఏదైనా <code>case</code> మ్యాచ్ అయిన తర్వాత, JavaScript ఇక మిగతా conditions ని పోల్చదు. అక్కడినుంచి <strong><code>break</code> కనిపించే వరకు కిందున్న అన్ని statement లను వరుసగా</strong> run చేస్తూ పోతుంది! దీన్నే <strong>fall-through</strong> అంటారు. ఒక జలపాతంలో నీరు ఒక మెట్టు నుంచి కింది మెట్టుకు ఆపకుండా పడుతూ పోయినట్లు ఇది జరుగుతుంది.</p>
      </div>
      <p style="margin-top: 10px; color: var(--text2);">అందుకే మనకు ఒకే ఫలితం కావాలనుకున్నప్పుడు ప్రతి case చివర తప్పనిసరిగా <code>break</code> రాయాలి.</p>
    </div>

    <div class="section-title"><span class="num">4</span>Fall-through ని ఉద్దేశపూర్వకంగా వాడటం (Grouping Cases)</div>
    <div class="section-body">
      <p>కొన్నిసార్లు ఈ fall-through ఫీచర్ మనకు ఎంతో ఉపయోగపడుతుంది! <strong>ఒకటి కంటే ఎక్కువ cases కి ఒకే పని</strong> చేయాల్సి వచ్చినప్పుడు, ఆ cases ని ఒకదాని కింద ఒకటి వరుసగా రాసి, చివరి దానికి మాత్రమే logic మరియు <code>break</code> పెడతాం.</p>

      <h3 style="margin-top: 20px; margin-bottom: 8px; font-size: 16px;">ఉదాహరణ 2: నెలలో ఎన్ని రోజులు ఉంటాయి?</h3>
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — Grouping cases</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>const month = 4;
let days;

switch (month) {
  case 2:
    days = 28;
    break;
  case 4:
  case 6:
  case 9:
  case 11:
    days = 30;
    break;
  default:
    days = 31;
}

console.log(\`నెల \${month} లో \${days} రోజులు\`);</code></pre>
      </div>
      <div class="code-output" style="background:#0b1120; border:1px solid #1e293b; border-radius:8px; padding:12px 16px; margin-top:10px; font-family:monospace; color:#38bdf8; font-size:13.5px;">
        <span style="color:#64748b;">Output:</span><br>
        నెల 4 లో 30 రోజులు
      </div>
      <p style="margin-top: 10px; color: var(--text2);">ఏప్రిల్ (4), జూన్ (6), సెప్టెంబర్ (9), నవంబర్ (11) అనే నాలుగు నెలలకూ 30 రోజులే. కాబట్టి ఆ నాలుగు cases ని వరుసగా రాశాం. <code>month = 4</code> అయినప్పుడు <code>case 4</code> మ్యాచ్ అయింది, మధ్యలో break లేకపోవడం వల్ల కిందకు జారి <code>days = 30</code> సెట్ చేసి బయటకు వచ్చింది.</p>

      <h3 style="margin-top: 24px; margin-bottom: 8px; font-size: 16px;">ఉదాహరణ 3: అచ్చు (vowel) లేదా హల్లు (consonant)</h3>
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — Vowel Checker</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>const letter = "e";

switch (letter) {
  case "a":
  case "e":
  case "i":
  case "o":
  case "u":
    console.log("అచ్చు (vowel)");
    break;
  default:
    console.log("హల్లు (consonant)");
}</code></pre>
      </div>
      <div class="code-output" style="background:#0b1120; border:1px solid #1e293b; border-radius:8px; padding:12px 16px; margin-top:10px; font-family:monospace; color:#38bdf8; font-size:13.5px;">
        <span style="color:#64748b;">Output:</span><br>
        అచ్చు (vowel)
      </div>
      <p style="margin-top: 10px; color: var(--text2);">ఇక్కడ 5 cases కి ఒకే పని, కాబట్టి ఒకే <code>console.log</code> రాశాం. ఒకవేళ దీన్ని <code>if-else</code> తో రాస్తే <code>letter === "a" || letter === "e" || ...</code> అని చాలా పొడవైన లైన్ అయ్యేది. Switch తో code ఎంతో అందంగా మరియు క్లీన్ గా మారింది.</p>
    </div>

    <div class="section-title"><span class="num">5</span>మరిన్ని రియల్-వరల్డ్ ఉదాహరణలు</div>
    <div class="section-body">
      <h3 style="margin-top: 10px; margin-bottom: 8px; font-size: 16px;">ఉదాహరణ 4: సాధారణ Calculator</h3>
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — Simple Calculator</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>const a = 10;
const b = 5;
const op = "*";
let result;

switch (op) {
  case "+":
    result = a + b;
    break;
  case "-":
    result = a - b;
    break;
  case "*":
    result = a * b;
    break;
  case "/":
    result = a / b;
    break;
  default:
    result = "తప్పు operator";
}

console.log(\`\${a} \${op} \${b} = \${result}\`);</code></pre>
      </div>
      <div class="code-output" style="background:#0b1120; border:1px solid #1e293b; border-radius:8px; padding:12px 16px; margin-top:10px; font-family:monospace; color:#38bdf8; font-size:13.5px;">
        <span style="color:#64748b;">Output:</span><br>
        10 * 5 = 50
      </div>
      <p style="margin-top: 8px; color: var(--text2);"><code>op</code> విలువను <code>"+"</code>, <code>"-"</code>, <code>"/"</code> గా మార్చి చూస్తే ఫలితాలు తదనుగుణంగా మారుతాయి. ఒకవేళ <code>op = "%"</code> ఇస్తే <code>default</code> run అయ్యి <code>"తప్పు operator"</code> వస్తుంది.</p>

      <h3 style="margin-top: 24px; margin-bottom: 8px; font-size: 16px;">ఉదాహరణ 5: ట్రాఫిక్ లైట్ సందేశాలు</h3>
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — Traffic Light</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>const light = "yellow";

switch (light) {
  case "red":
    console.log("ఆగండి");
    break;
  case "yellow":
    console.log("నెమ్మదిగా వెళ్ళండి");
    break;
  case "green":
    console.log("వెళ్ళండి");
    break;
  default:
    console.log("తెలియని రంగు");
}</code></pre>
      </div>
      <div class="code-output" style="background:#0b1120; border:1px solid #1e293b; border-radius:8px; padding:12px 16px; margin-top:10px; font-family:monospace; color:#38bdf8; font-size:13.5px;">
        <span style="color:#64748b;">Output:</span><br>
        నెమ్మదిగా వెళ్ళండి
      </div>
    </div>

    <div class="section-title"><span class="num">6</span>switch లో పోలిక strict (===)</div>
    <div class="section-body">
      <p>ఇది ఇంటర్వ్యూలలో తరచూ అడిగే అత్యంత ముఖ్యమైన విషయం. <code>switch</code> ప్రతి <code>case</code> ని <strong><code>===</code> (strict equality)</strong> తో మాత్రమే పోలుస్తుంది. అంటే విలువ మరియు <strong>data type</strong> రెండూ కచ్చితంగా సమానం కావాలి!</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — Strict Comparison in switch</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>const input = "2";

switch (input) {
  case 2:
    console.log("రెండు");
    break;
  default:
    console.log("match కాలేదు");
}</code></pre>
      </div>
      <div class="code-output" style="background:#0b1120; border:1px solid #1e293b; border-radius:8px; padding:12px 16px; margin-top:10px; font-family:monospace; color:#38bdf8; font-size:13.5px;">
        <span style="color:#64748b;">Output:</span><br>
        match కాలేదు
      </div>

      <p style="margin-top: 10px; color: var(--text2);"><code>input</code> అనేది string <code>"2"</code>. కానీ <code>case 2</code> లో ఉన్నది number <code>2</code>. Types వేరు కాబట్టి <code>"2" === 2</code> అనేది <code>false</code> అవుతుంది, అందుకే match కాలేదు.</p>
      
      <div class="callout" style="margin-top: 12px;">
        <div class="callout-title">💡 దీన్ని ఎలా సరిచేయాలి?</div>
        <p style="margin-top: 6px; color: var(--text2); font-size: 14.5px;">
          1. కేస్ ని string గా మార్చాలి: <code>case "2":</code><br>
          లేదా<br>
          2. ఇన్పుట్ ని నంబర్ గా మార్చాలి: <code>switch (Number(input))</code> (Chapter 6 లో నేర్చుకున్న <code>Number()</code> conversion గుర్తుందా?).
        </p>
        <p style="margin-top: 6px; font-size: 13.5px; color: var(--text3);"><strong>గుర్తుంచుకోండి:</strong> వెబ్ పేజీలలో <code>prompt()</code> లేదా HTML Form నుండి వచ్చే యూజర్ ఇన్పుట్ ఎప్పుడూ string గానే ఉంటుంది. కాబట్టి సంఖ్యలతో switch రాసేటప్పుడు <code>Number()</code> వాడటం మర్చిపోవద్దు.</p>
      </div>
    </div>

    <div class="section-title"><span class="num">7</span>switch vs if-else: ఏది ఎప్పుడు వాడాలి?</div>
    <div class="section-body">
      <table class="tbl">
        <tr>
          <th>సందర్భం</th>
          <th>ఉత్తమమైన ఎంపిక</th>
        </tr>
        <tr>
          <td>ఒకే విలువను <strong>చాలా exact options</strong> తో పోల్చడం (రోజు పేరు, menu choice, operator)</td>
          <td><code>switch</code></td>
        </tr>
        <tr>
          <td><strong>Range</strong> లు చెక్ చేయడం (marks &gt;= 80, age &lt; 18)</td>
          <td><code>if-else</code></td>
        </tr>
        <tr>
          <td><strong>వేర్వేరు variables</strong> పై వేర్వేరు conditions</td>
          <td><code>if-else</code></td>
        </tr>
        <tr>
          <td><code>&&</code>, <code>||</code> తో కలిపిన సంక్లిష్టమైన conditions</td>
          <td><code>if-else</code></td>
        </tr>
        <tr>
          <td>ఒకటి కంటే ఎక్కువ values కి ఒకే పనిని గ్రూప్ చేయడం</td>
          <td><code>switch</code> (fall-through తో)</td>
        </tr>
      </table>

      <div class="callout" style="margin-top: 15px;">
        <div class="callout-title">🎯 గోల్డెన్ రూల్</div>
        <p style="margin-top: 8px; color: var(--text2); font-size: 14.5px;">
          <strong>"ఈ విలువ ఇదా, అదా, ఇంకోటా?"</strong> అనే ఖచ్చితమైన విలువల ఎంపికలకు <code>switch</code> వాడండి.<br>
          <strong>"ఈ విలువ ఇంతకంటే పెద్దదా, చిన్నదా, పరిధిలో ఉందా?"</strong> అనే ప్రశ్నలకు <code>if-else</code> వాడండి.
        </p>
      </div>
    </div>

    <div class="callout callout-warning">
      <div class="callout-title">⚠️ Beginners చేసే సాధారణ తప్పులు (MDN Verified)</div>
      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.6;">
        <li style="margin-bottom: 14px;">
          <strong>1. <code>break</code> మర్చిపోవడం:</strong>
          <pre style="background:rgba(0,0,0,0.25); padding:8px; border-radius:6px; margin-top:5px;"><code>const grade = "B";

switch (grade) {
  case "A":
    console.log("Excellent");
  case "B":
    console.log("Good");
  case "C":
    console.log("Average");
    break;
  default:
    console.log("Unknown");
}</code></pre>
          Output: <code>Good</code> మరియు <code>Average</code> రెండూ వస్తాయి! "B" కి "Good" ఒక్కటే రావాలి. కానీ <code>case "B"</code> లో <code>break</code> లేకపోవడంతో కిందున్న <code>case "C"</code> కూడా run అయిపోయింది.
        </li>

        <li style="margin-bottom: 14px;">
          <strong>2. Data Types సరిపోలకపోవడం:</strong>
          <code>"2"</code> (string) మరియు <code>2</code> (number) strict equality (<code>===</code>) వల్ల సరిపోలవు. Input ని సరైన type లోకి మార్చుకోవాలి.
        </li>

        <li style="margin-bottom: 14px;">
          <strong>3. Range ల కోసం switch వాడటం:</strong>
          <pre style="background:rgba(0,0,0,0.25); padding:8px; border-radius:6px; margin-top:5px;"><code>const marks = 90;

switch (marks) {
  case marks >= 80: // ❌ తప్పు!
    console.log("Grade A");
    break;
  default:
    console.log("A కాదు");
}</code></pre>
          Output: <code>A కాదు</code> వస్తుంది! కారణం: <code>marks >= 80</code> అనేది <code>true</code> అనే boolean ని ఇస్తుంది. <code>switch (90)</code> ని <code>case true</code> తో పోలిస్తే <code>90 === true</code> ఎప్పటికీ false! Range ల కోసం కేవలం <code>if-else</code> మాత్రమే వాడాలి.
        </li>

        <li style="margin-bottom: 14px;">
          <strong>4. <code>case</code> లోపల <code>let</code> / <code>const</code> ని braces లేకుండా declare చేయడం:</strong>
          <pre style="background:rgba(0,0,0,0.25); padding:8px; border-radius:6px; margin-top:5px;"><code>switch (1) {
  case 1:
    let message = "ఒకటి";
    break;
  case 2:
    let message = "రెండు"; // ❌ SyntaxError: Identifier 'message' has already been declared
    break;
}</code></pre>
          Switch మొత్తం ఒకే block scope కిందకు వస్తుంది, కాబట్టి ఒకే పేరుతో రెండు cases లో <code>let</code> రాయలేరు. దీన్ని నివారించడానికి ప్రతి case కి సొంత <code>{ }</code> curly braces ఇవ్వండి:
          <pre style="background:rgba(0,0,0,0.25); padding:8px; border-radius:6px; margin-top:5px;"><code>switch (1) {
  case 1: {
    let message = "ఒకటి";
    console.log(message);
    break;
  }
  case 2: {
    let message = "రెండు";
    console.log(message);
    break;
  }
}</code></pre>
        </li>

        <li>
          <strong>5. <code>default</code> రాయకపోవడం:</strong>
          ఇది syntax error ఇవ్వదు, కానీ యూజర్ అనుకోని ఇన్పుట్ ఇచ్చినప్పుడు ఏ పని జరగకుండా మిన్నకుండిపోతుంది. కాబట్టి యూజర్ కి తప్పుడు విలువ అని తెలియజేయడానికి ఎల్లప్పుడూ <code>default</code> రాయడం మంచి ప్రోగ్రామింగ్ అలవాటు.
        </li>
      </ul>
    </div>

    <div class="section-title"><span class="num">8</span>ప్రాక్టీస్ ప్రశ్నలు & సమాధానాలు</div>
    <div class="section-body">
      <ol style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.6;">
        <li>రోజు సంఖ్య (1 నుండి 7) ఇస్తే, 1 నుండి 5 వరకు "పని దినం", 6 మరియు 7 కి "సెలవు" అని చెప్పే switch రాయండి. (<code>day = 6</code> తో test చేయండి)</li>
        <li>Grade అక్షరం ఇస్తే remark చెప్పండి: <code>"A"</code> → Excellent, <code>"B"</code> → Good, <code>"C"</code> → Average, మిగతావి → Fail. (<code>grade = "C"</code>)</li>
        <li>రెండు సంఖ్యలు <code>20</code> మరియు <code>8</code>, operator <code>"-"</code> తో calculator switch రాసి ఫలితం చూపించండి.</li>
        <li>ఒక అక్షరం vowel లేదా consonant అని చెప్పండి. (అక్షరం <code>"k"</code> తో test చేయండి)</li>
        <li>ఈ code ఏం print చేస్తుంది? (<code>n = 1</code>)
          <pre style="background:rgba(0,0,0,0.25); padding:8px; border-radius:6px; margin-top:5px;"><code>const n = 1;
switch (n) {
  case 1:
    console.log("ఒకటి");
  case 2:
    console.log("రెండు");
  case 3:
    console.log("మూడు");
  default:
    console.log("default");
}</code></pre>
        </li>
      </ol>

      <details style="margin-top: 15px; background: var(--bg2); border: 1px solid var(--border); padding: 12px; border-radius: 8px; cursor: pointer;">
        <summary style="font-weight: bold; color: var(--text);">👉 సమాధానాలు చూడండి</summary>
        <div style="margin-top: 10px; font-size: 14px; color: var(--text2); line-height: 1.6;">
          <p><strong>1.</strong></p>
          <pre style="background:rgba(0,0,0,0.25); padding:8px; border-radius:6px;"><code>const day = 6;

switch (day) {
  case 1:
  case 2:
  case 3:
  case 4:
  case 5:
    console.log("పని దినం");
    break;
  case 6:
  case 7:
    console.log("సెలవు");
    break;
  default:
    console.log("తప్పు సంఖ్య");
}</code></pre>
          <p>Output: <code>సెలవు</code></p>

          <p style="margin-top: 12px;"><strong>2.</strong></p>
          <pre style="background:rgba(0,0,0,0.25); padding:8px; border-radius:6px;"><code>const grade = "C";

switch (grade) {
  case "A":
    console.log("Excellent");
    break;
  case "B":
    console.log("Good");
    break;
  case "C":
    console.log("Average");
    break;
  default:
    console.log("Fail");
}</code></pre>
          <p>Output: <code>Average</code></p>

          <p style="margin-top: 12px;"><strong>3.</strong></p>
          <pre style="background:rgba(0,0,0,0.25); padding:8px; border-radius:6px;"><code>const a = 20;
const b = 8;
const op = "-";
let result;

switch (op) {
  case "+":
    result = a + b;
    break;
  case "-":
    result = a - b;
    break;
  case "*":
    result = a * b;
    break;
  case "/":
    result = a / b;
    break;
  default:
    result = "తప్పు operator";
}

console.log(\`\${a} \${op} \${b} = \${result}\`);</code></pre>
          <p>Output: <code>20 - 8 = 12</code></p>

          <p style="margin-top: 12px;"><strong>4.</strong></p>
          <pre style="background:rgba(0,0,0,0.25); padding:8px; border-radius:6px;"><code>const letter = "k";

switch (letter) {
  case "a":
  case "e":
  case "i":
  case "o":
  case "u":
    console.log("అచ్చు (vowel)");
    break;
  default:
    console.log("హల్లు (consonant)");
}</code></pre>
          <p>Output: <code>హల్లు (consonant)</code></p>

          <p style="margin-top: 12px;"><strong>5.</strong></p>
          <p><code>break</code> ఎక్కడా లేదు, కాబట్టి <code>case 1</code> సరిపోయిన తర్వాత కిందున్న అన్ని statement లూ run అవుతాయి:</p>
          <pre style="background:rgba(0,0,0,0.25); padding:8px; border-radius:6px;"><code>ఒకటి
రెండు
మూడు
default</code></pre>
        </div>
      </details>
    </div>

    <div class="try-box">
      <div class="try-title">🚀 మీరే try చేయండి</div>
      <p style="color:var(--text2); font-size:14px; margin-bottom:12px;">ఈ code ని మన compiler లో run చేయండి. <code>choice</code> విలువను 1, 2, 3 గా మార్చి ఫలితాలు చూడండి. 5 ఇస్తే ఏమవుతుందో కూడా పరిశీలించండి:</p>
      <div class="code-block">
        <pre><code>const choice = 2;

switch (choice) {
  case 1:
    console.log("Tea: ₹10");
    break;
  case 2:
    console.log("Coffee: ₹20");
    break;
  case 3:
    console.log("Milk: ₹15");
    break;
  default:
    console.log("ఈ item మా menu లో లేదు");
}</code></pre>
      </div>
      <div class="code-output" style="background:#0b1120; border:1px solid #1e293b; border-radius:8px; padding:12px 16px; margin-top:10px; font-family:monospace; color:#38bdf8; font-size:13.5px;">
        <span style="color:#64748b;">Output (choice = 2 కి):</span><br>
        Coffee: ₹20
      </div>
      <a class="run-btn" href="/?lang=nodejs">👉 Our Compiler లో JavaScript try చేయండి</a>
    </div>

    <div class="intro-box" style="background: rgba(34, 197, 94, 0.1); border-color: rgba(34, 197, 94, 0.3); margin-top:30px;">
      <h3 style="color:#22c55e; margin-bottom:8px;">📌 సారాంశం (Quick Summary):</h3>
      <ul style="margin-left: 20px; color: var(--text2); line-height: 1.6;">
        <li><strong><code>switch</code></strong>: ఒక విలువను చాలా <code>case</code> లతో పోల్చి, సరిపోయిన దాని code ని run చేస్తుంది.</li>
        <li><strong><code>break</code></strong>: switch నుంచి వెంటనే బయటకు తీసుకొస్తుంది. రాయకపోతే <strong>fall-through</strong> జరిగి కిందున్న cases కూడా run అవుతాయి.</li>
        <li><strong><code>default</code></strong>: ఏ case సరిపోకపోతే run అవుతుంది (<code>if-else</code> లోని <code>else</code> లాంటిది).</li>
        <li>ఒకటి కంటే ఎక్కువ cases కి ఒకే పని చేయాలంటే, వాటిని వరుసగా గ్రూప్ చేసి చివరికి మాత్రమే code మరియు <code>break</code> పెట్టండి.</li>
        <li>Switch పోలిక ఎప్పుడూ <strong>strict (<code>===</code>)</strong>. అంటే <code>"2"</code> (string) మరియు <code>2</code> (number) సరిపోలవు.</li>
        <li>Exact విలువల పోలికకు <code>switch</code>, range లు మరియు సంక్లిష్ట conditions కి <code>if-else</code> వాడండి.</li>
        <li>ప్రతి case లో <code>let</code>/<code>const</code> వాడాలంటే సొంత <code>{ }</code> braces ఇవ్వాలి.</li>
      </ul>
    </div>
`;

function updateChapter9() {
  const title = "JavaScript switch Statement తెలుగులో | case, break, default";
  const desc = "JavaScript లో switch statement ఎలా వాడాలి, case, break, default అంటే ఏమిటి, fall-through అంటే ఏమిటి, switch మరియు if-else మధ్య తేడా తెలుగులో ఉదాహరణలతో నేర్చుకోండి.";
  const filename = "switch.html";
  const subtopics = "switch syntax · case · break · default · Fall-through · Multi-case Grouping · Strict Equality (===) · Common Mistakes";

  // Navigation: Lesson 8 (conditionals.html) -> Lesson 9 (switch.html) -> Lesson 10 (loops.html)
  const prevFile = "conditionals.html";
  const prevTitle = "8. if, else if, else";
  const nextFile = "loops.html";
  const nextTitle = "10. Loops: for, while, do-while";

  const html = master.wrapJSLessonPage(
    title,
    desc,
    filename,
    9,
    subtopics,
    chapter9Body,
    prevFile,
    prevTitle,
    nextFile,
    nextTitle,
    "Part 02: Control Flow"
  );

  fs.writeFileSync(path.join(jsDir, filename), html, 'utf8');
  console.log("✅ Successfully updated " + filename + " with full rich Telugu content!");
}

updateChapter9();
