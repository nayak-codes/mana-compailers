const fs = require('fs');
const path = require('path');

const phase2Path = path.join(__dirname, 'build_javascript_phase2.js');
let code = fs.readFileSync(phase2Path, 'utf8');

const chapter3Content = `
    <div class="intro-box">
      <p>మీ ఫోన్లో కాంటాక్ట్స్ చూడండి. "అమ్మ" అని ఒక పేరు ఉంటుంది, దాని వెనుక ఒక ఫోన్ నంబర్ ఉంటుంది. ప్రతిసారీ పది అంకెల నంబర్ గుర్తుపెట్టుకోకుండా, "అమ్మ" అని పేరు చెబితే చాలు కదా? Programming లో <strong>variable</strong> కూడా అలాంటిదే. ఒక పేరు పెట్టి, దాని వెనుక ఒక విలువ (value) ని దాచిపెడతాం.</p>
      <p>Programming లో దాదాపు ప్రతి program కి variables అవసరం. అందుకే ఈ chapter చాలా ముఖ్యమైనది. మెల్లగా, ఉదాహరణలతో నేర్చుకుందాం.</p>
    </div>

    <div class="section-title"><span class="num">1</span>ఈ chapter లో మీరు నేర్చుకునేవి</div>
    <div class="section-body">
      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.6;">
        <li>Variable అంటే ఏమిటి, ఎందుకు అవసరం</li>
        <li><code>let</code>, <code>const</code>, <code>var</code> తో variables ని declare చేయడం</li>
        <li>ఈ మూడింటి మధ్య తేడాలు, ఏది ఎప్పుడు వాడాలి</li>
        <li>Variable పేర్లు పెట్టేటప్పుడు పాటించాల్సిన నియమాలు</li>
        <li>రెండు variables విలువలను swap చేయడం</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">2</span>Variable అంటే ఏమిటి?</div>
    <div class="section-body">
      <p><strong>Variable</strong> అంటే data ని store చేసే ఒక <strong>డబ్బా (box)</strong>. ఆ డబ్బా మీద ఒక <strong>పేరు (label)</strong> అతికిస్తాం. ఆ పేరు చెబితే లోపల ఉన్న విలువ వస్తుంది.</p>
      <p>ఉదాహరణకు, వంటింట్లో "చక్కెర" అని రాసిన డబ్బా ఉంటుంది. లోపల ఏముందో తెరవకుండానే మనకు తెలుస్తుంది. అలాగే, <code>age</code> అనే variable లో <code>20</code> ఉంటే, <code>age</code> అని రాస్తే <code>20</code> వస్తుంది.</p>
      <p>"Variable" అనే పదానికి అర్థం "మారగలిగేది". అంటే డబ్బాలో విలువ తర్వాత మారొచ్చు (కొన్ని సందర్భాల్లో).</p>

      <h3 style="margin-top: 15px; margin-bottom: 10px; font-size: 16px;">మొదటి variable</h3>
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — First Variable</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>let name = "రవి";
let age = 20;

console.log(name);
console.log(age);
console.log("పేరు:", name, "వయసు:", age);</code></pre>
      </div>
      <p style="margin-top:8px;"><strong>Output:</strong></p>
      <pre style="background: #1e1e1e; color: #fff; padding: 10px; border-radius: 8px; font-family: 'JetBrains Mono', monospace;">రవి
20
పేరు: రవి వయసు: 20</pre>

      <h3 style="margin-top: 20px; margin-bottom: 10px; font-size: 16px;">Code అర్థం చేసుకుందాం</h3>
      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.6;">
        <li><code>let</code> అనేది ఒక <strong>keyword</strong>. "ఇప్పుడు ఒక కొత్త variable తయారు చేస్తున్నాను" అని JavaScript కి చెబుతుంది.</li>
        <li><code>name</code> అనేది variable పేరు (డబ్బా మీద label).</li>
        <li><code>=</code> అంటే "సమానం" కాదు. ఇక్కడ దీని అర్థం "కుడివైపు ఉన్న విలువను ఎడమవైపు ఉన్న డబ్బాలో పెట్టు" (assignment).</li>
        <li><code>"రవి"</code> అనేది ఆ డబ్బాలో పెట్టిన విలువ.</li>
        <li><code>console.log("పేరు:", name, "వయసు:", age)</code> లో కామాలతో ఎన్ని విషయాలైనా కలిపి print చేయొచ్చు.</li>
      </ul>

      <h3 style="margin-top: 20px; margin-bottom: 10px; font-size: 16px;">ఖాళీ variable</h3>
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — Uninitialized Variable</span>
        </div>
        <pre><code>let city;
console.log(city);
city = "హైదరాబాద్";
console.log(city);</code></pre>
      </div>
      <p style="margin-top:8px;"><strong>Output:</strong></p>
      <pre style="background: #1e1e1e; color: #fff; padding: 10px; border-radius: 8px; font-family: 'JetBrains Mono', monospace;">undefined
హైదరాబాద్</pre>
      <p>విలువ ఇవ్వనప్పుడు, variable లో <code>undefined</code> ఉంటుంది. అంటే "ఇంకా ఏ విలువా పెట్టలేదు".</p>
    </div>

    <div class="section-title"><span class="num">3</span>మూడు keywords: let, const, var</div>
    <div class="section-body">
      <p>JavaScript లో variable తయారు చేయడానికి మూడు keywords ఉన్నాయి. ఒక్కొక్కటి చూద్దాం.</p>
      
      <h3 style="margin-top: 15px; margin-bottom: 10px; font-size: 16px;">1. let: విలువ మారొచ్చు</h3>
      <p>తర్వాత విలువ మారే అవకాశం ఉన్నప్పుడు <code>let</code> వాడతాం. ఉదాహరణకు, ఆటలో score.</p>
      <div class="code-block">
        <pre><code>let score = 10;
console.log(score);

score = 25;
console.log(score);</code></pre>
      </div>
      <p style="margin-top:8px;"><strong>Output:</strong> <code>10</code>, <code>25</code>. (రెండోసారి <code>score</code> ముందు <code>let</code> రాయలేదు, ఎందుకంటే డబ్బా ముందే తయారైంది).</p>

      <h3 style="margin-top: 20px; margin-bottom: 10px; font-size: 16px;">2. const: విలువ మారదు</h3>
      <p><strong>const</strong> అంటే constant (స్థిరంగా ఉండేది). ఒక్కసారి విలువ పెట్టాక, దాన్ని మార్చలేం. π విలువ లేదా వారంలో రోజుల సంఖ్య లాంటివి మారవు కదా, అలాంటి వాటికి <code>const</code> వాడతాం.</p>
      <div class="code-block">
        <pre><code>const pi = 3.14159;
console.log(pi);

// pi = 3.14; // ❌ TypeError: Assignment to constant variable.</code></pre>
      </div>

      <h3 style="margin-top: 20px; margin-bottom: 10px; font-size: 16px;">3. var: పాత పద్ధతి</h3>
      <p><code>var</code> అనేది JavaScript లో పాత పద్ధతి. 2015 లో <code>let</code> మరియు <code>const</code> వచ్చాయి. <code>var</code> తో ఒకే పేరుతో రెండోసారి declare చేసినా error రాదు, కానీ దానికి సరైన స్కోప్ లేకపోవడం వల్ల బగ్స్ వస్తాయి.</p>

      <table class="tbl" style="margin-top:15px;">
        <tr><th>లక్షణం</th><th>var</th><th>let</th><th>const</th></tr>
        <tr><td>విలువ మార్చొచ్చా?</td><td>అవును</td><td>అవును</td><td><strong>కాదు</strong></td></tr>
        <tr><td>అదే పేరుతో మళ్ళీ declare చేయొచ్చా?</td><td>అవును</td><td><strong>కాదు</strong></td><td><strong>కాదు</strong></td></tr>
        <tr><td>Scope</td><td>Function scope</td><td>Block scope</td><td>Block scope</td></tr>
        <tr><td>ఈ రోజుల్లో వాడాలా?</td><td>వద్దు (పాత code లో మాత్రమే)</td><td>అవును</td><td>అవును</td></tr>
      </table>

      <div class="callout" style="margin-top:15px;">
        <div class="callout-title">💡 ఏది ఎప్పుడు వాడాలి? (సులభమైన నియమం):</div>
        <ol style="margin-left: 20px; color: var(--text2); font-size: 14px;">
          <li>ముందు ఎప్పుడూ <strong>const</strong> తో మొదలుపెట్టండి.</li>
          <li>తర్వాత విలువ మార్చాల్సి వస్తే మాత్రమే <strong>let</strong> కి మార్చండి.</li>
          <li><strong>var</strong> ని కొత్త code లో వాడకండి.</li>
        </ol>
      </div>
    </div>

    <div class="section-title"><span class="num">4</span>Variable పేర్లు పెట్టే నియమాలు</div>
    <div class="section-body">
      <ol style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.6;">
        <li>పేరులో అక్షరాలు, అంకెలు, <code>_</code> (underscore), <code>$</code> ఉండొచ్చు.</li>
        <li>పేరు <strong>అంకెతో మొదలవ్వకూడదు.</strong> (<code>1name</code> తప్పు, <code>name1</code> సరైనది).</li>
        <li>పేరులో <strong>space ఉండకూడదు.</strong> (<code>my name</code> తప్పు, <code>myName</code> సరైనది).</li>
        <li>పెద్ద అక్షరం, చిన్న అక్షరం తేడా ఉంటుంది. <code>age</code> మరియు <code>Age</code> వేరు వేరు variables.</li>
        <li>JavaScript Keywords (<code>let</code>, <code>const</code>, <code>if</code>, <code>function</code>) ని పేర్లుగా వాడకూడదు.</li>
      </ol>

      <h3 style="margin-top: 15px; margin-bottom: 10px; font-size: 16px;">Naming Convention: camelCase</h3>
      <div class="code-block">
        <pre><code>let studentName = "సీత";
let totalMarks = 450;
let isPassed = true;</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">5</span>ఉదాహరణ: రెండు variables ని swap చేయడం</div>
    <div class="section-body">
      <p>ఇంటర్వ్యూలలో తరచూ అడిగే ప్రశ్న ఇది. రెండు గ్లాసుల్లో ఒకదానిలో పాలు, ఇంకోదానిలో టీ ఉన్నాయి. వాటిని ఒకదానిలోంచి ఒకదానికి మార్చాలంటే మూడో ఖాళీ గ్లాసు (<code>temp</code>) కావాలి కదా!</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — Variable Swapping</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>let a = 5;
let b = 10;

let temp = a;
a = b;
b = temp;

console.log("a =", a); // 10
console.log("b =", b); // 5</code></pre>
      </div>
    </div>

    <div class="callout callout-warning">
      <div class="callout-title">⚠️ Beginners చేసే సాధారణ తప్పులు</div>
      <ul>
        <li><strong>Declare చేయకుండా variable వాడటం:</strong> <code>console.log(price)</code> ని declare చేయకుండా వాడితే <code>ReferenceError: price is not defined</code> వస్తుంది.</li>
        <li><strong>const విలువను మార్చడం:</strong> <code>const lang = "JS"; lang = "Py";</code> చేస్తే <code>TypeError: Assignment to constant variable</code> వస్తుంది.</li>
        <li><strong>const కి విలువ ఇవ్వకపోవడం:</strong> <code>const rate;</code> అని వదిలేస్తే <code>SyntaxError: Missing initializer in const declaration</code> వస్తుంది.</li>
        <li><strong>పేరు అంకెతో మొదలుపెట్టడం:</strong> <code>let 1stRank = "Ravi";</code> రాస్తే <code>SyntaxError</code> వస్తుంది.</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">6</span>ప్రాక్టీస్ ప్రశ్నలు & సమాధానాలు</div>
    <div class="section-body">
      <ol style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.6;">
        <li><code>studentName</code> అనే variable లో మీ పేరు, <code>studentAge</code> లో మీ వయసు పెట్టి print చేయండి.</li>
        <li>ఒక <code>let</code> variable <code>balance</code> లో <code>1000</code> పెట్టండి. తర్వాత దాన్ని <code>1500</code> గా మార్చి print చేయండి.</li>
        <li>మూడు సబ్జెక్టుల మార్కులను <code>const</code> లో పెట్టి, వాటి మొత్తాన్ని print చేయండి.</li>
        <li>ఈ పేర్లలో ఏవి తప్పు? <code>my-name</code>, <code>_count</code>, <code>2ndPlace</code>, <code>$price</code>, <code>total marks</code></li>
      </ol>
      
      <details style="margin-top: 15px; background: var(--bg2); border: 1px solid var(--border); padding: 12px; border-radius: 8px; cursor: pointer;">
        <summary style="font-weight: bold; color: var(--text);">సమాధానాలు చూడండి</summary>
        <div style="margin-top: 10px; font-size: 14px; color: var(--text2);">
          <p><strong>1.</strong> <code>let studentName = "రవి"; let studentAge = 20; console.log(studentName, studentAge);</code></p>
          <p style="margin-top: 8px;"><strong>2.</strong> <code>let balance = 1000; balance = 1500; console.log(balance);</code> (Output: 1500)</p>
          <p style="margin-top: 8px;"><strong>3.</strong> <code>const s1 = 60, s2 = 70, s3 = 80; console.log(s1 + s2 + s3);</code> (Output: 210)</p>
          <p style="margin-top: 8px;"><strong>4.</strong> తప్పు పేర్లు: <code>my-name</code> (hyphen ఉంది), <code>2ndPlace</code> (నంబర్ తో మొదలైంది), <code>total marks</code> (space ఉంది). సరైనవి: <code>_count</code>, <code>$price</code>.</p>
        </div>
      </details>
    </div>

    <div class="try-box">
      <div class="try-title">🚀 మీరే try చేయండి</div>
      <p style="color:var(--text2); font-size:14px; margin-bottom:12px;">ఈ code ని మన compiler లో run చేయండి. తర్వాత విలువలు మార్చి మళ్ళీ run చేయండి:</p>
      <div class="code-block">
        <pre><code>const shopName = "Ravi Stores";
let itemPrice = 50;
let quantity = 3;

let totalBill = itemPrice * quantity;
console.log(shopName);
console.log("మొత్తం బిల్లు:", totalBill);

quantity = 5;
totalBill = itemPrice * quantity;
console.log("కొత్త బిల్లు:", totalBill);</code></pre>
      </div>
      <a class="run-btn" href="/?lang=nodejs">👉 Our Compiler లో JavaScript try చేయండి</a>
    </div>

    <div class="intro-box" style="background: rgba(34, 197, 94, 0.1); border-color: rgba(34, 197, 94, 0.3); margin-top:30px;">
      <h3 style="color:#22c55e; margin-bottom:8px;">📌 Quick Summary:</h3>
      <ul style="margin-left: 20px; color: var(--text2);">
        <li><strong>Variable</strong> అంటే పేరు ఉన్న ఒక డబ్బా, అందులో data ని store చేస్తాం.</li>
        <li><strong>let</strong>: విలువ మారొచ్చు. <strong>const</strong>: విలువ మారదు. <strong>var</strong>: పాత పద్ధతి, వాడకండి.</li>
        <li>ఎప్పుడూ <code>const</code> తో మొదలుపెట్టి, అవసరమైతేనే <code>let</code> కి మార్చండి.</li>
        <li>Variable పేరు నంబర్ తో మొదలవ్వకూడదు, space ఉండకూడదు, camelCase వాడండి.</li>
      </ul>
    </div>
`;

// Replace in buildLesson3
const regex = /function buildLesson3\(\) \{[\s\S]*?const contentBody = `[\s\S]*?`;\s*const html = wrapJSLessonPage\(title, desc, filename, 3, subtopics, contentBody/;

code = code.replace(regex, (match) => {
  const parts = match.split('const contentBody = `');
  return `${parts[0]}const contentBody = \`${chapter3Content}\`;\n  const html = wrapJSLessonPage(title, desc, filename, 3, subtopics, contentBody`;
});

fs.writeFileSync(phase2Path, code, 'utf8');
console.log("Successfully updated Chapter 3 in build_javascript_phase2.js");
