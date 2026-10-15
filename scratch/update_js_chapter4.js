const fs = require('fs');
const path = require('path');

const scratchDir = __dirname;
const baseDir = path.join(scratchDir, '..', 'public');
const jsDir = path.join(baseDir, 'blog-javascript');

const phase1Path = path.join(scratchDir, 'build_javascript_phase1.js');
const phase2Path = path.join(scratchDir, 'build_javascript_phase2.js');

const chapter4Content = `
    <div class="intro-box">
      <p>ఇంట్లో వంటగదిలో చూడండి. బియ్యం, పప్పు, ఉప్పు, నూనె అన్నీ వేర్వేరు డబ్బాల్లో ఉంటాయి. ఎందుకంటే అవన్నీ వేర్వేరు రకాలు. బియ్యాన్ని కొలిచే విధానం వేరు, నూనెను కొలిచే విధానం వేరు కదా?</p>
      <p>Programming లో కూడా అంతే. Variable డబ్బాల్లో పెట్టే విలువలు వేర్వేరు <strong>రకాలు</strong> (types) గా ఉంటాయి. పేరు (text), సంఖ్య (number), అవును/కాదు (true/false) ఇలా. ఈ రకాలనే <strong>Data Types</strong> అంటారు.</p>
      <p>ఒక విలువ ఏ రకానికి చెందినదో తెలిస్తేనే, దానితో ఏం చేయొచ్చో, ఏం చేయలేమో తెలుస్తుంది. ఉదాహరణకు, రెండు సంఖ్యలను కూడొచ్చు, కానీ "పేరు" ను "పేరు" తో కూడితే ఏమవుతుంది? ఈ chapter లో అవన్నీ చూద్దాం.</p>
    </div>

    <div class="section-title"><span class="num">1</span>ఈ chapter లో మీరు నేర్చుకునేవి</div>
    <div class="section-body">
      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.6;">
        <li>JavaScript లోని ముఖ్యమైన data types: string, number, boolean, null, undefined</li>
        <li><code>typeof</code> operator తో ఒక విలువ ఏ రకమో తెలుసుకోవడం</li>
        <li><code>null</code> మరియు <code>undefined</code> మధ్య తేడా</li>
        <li><code>NaN</code> మరియు <code>Infinity</code> అంటే ఏమిటి</li>
        <li><code>"5"</code> మరియు <code>5</code> మధ్య తేడా</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">2</span>Primitive Data Types అంటే ఏమిటి?</div>
    <div class="section-body">
      <p>JavaScript లో సరళమైన, ప్రాథమిక రకాలను <strong>Primitive data types</strong> అంటారు. ఈ chapter లో మనం ముఖ్యమైన ఐదింటిని నేర్చుకుందాం:</p>

      <table class="tbl">
        <tr><th>Data Type</th><th>అర్థం</th><th>ఉదాహరణ</th></tr>
        <tr><td><strong>string</strong></td><td>అక్షరాల text</td><td><code>"రవి"</code>, <code>'Hello'</code></td></tr>
        <tr><td><strong>number</strong></td><td>సంఖ్యలు (పూర్ణ మరియు దశాంశ)</td><td><code>25</code>, <code>3.14</code>, <code>-7</code></td></tr>
        <tr><td><strong>boolean</strong></td><td>అవును లేదా కాదు</td><td><code>true</code>, <code>false</code></td></tr>
        <tr><td><strong>null</strong></td><td>"ఉద్దేశపూర్వకంగా ఖాళీ"</td><td><code>null</code></td></tr>
        <tr><td><strong>undefined</strong></td><td>"ఇంకా విలువ ఇవ్వలేదు"</td><td><code>undefined</code></td></tr>
      </table>
      <p style="margin-top:10px; color:var(--text2); font-size:13.5px;">(ఇవి కాకుండా <code>bigint</code>, <code>symbol</code> అనే మరో రెండు ఉన్నాయి. అవి చాలా అరుదుగా వాడతారు, కాబట్టి ప్రస్తుతానికి వదిలేద్దాం.)</p>
    </div>

    <div class="section-title"><span class="num">3</span>typeof operator: విలువ ఏ రకమో తెలుసుకోవడం</div>
    <div class="section-body">
      <p>ఏదైనా విలువ ఏ data type కి చెందినదో తెలుసుకోవడానికి <strong><code>typeof</code></strong> అనే operator వాడతాం.</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — typeof Operator</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>console.log(typeof "Hello");
console.log(typeof 25);
console.log(typeof true);
console.log(typeof undefined);</code></pre>
      </div>
      <p style="margin-top:8px;"><strong>Output:</strong></p>
      <pre style="background: #1e1e1e; color: #fff; padding: 10px; border-radius: 8px; font-family: 'JetBrains Mono', monospace;">string
number
boolean
undefined</pre>
      <p><code>typeof</code> తర్వాత విలువ లేదా variable రాస్తే, దాని రకం text గా వస్తుంది. ఈ chapter అంతా దీన్ని వాడుతూనే ఉంటాం.</p>
    </div>

    <div class="section-title"><span class="num">4</span>1. String: Text డేటా</div>
    <div class="section-body">
      <p><strong>String</strong> అంటే అక్షరాల వరుస. పేరు, ఊరు, message, ఇలా text ఏదైనా string. String ని ఎప్పుడూ <strong>quotes</strong> మధ్యలో రాయాలి.</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — String Creation</span>
        </div>
        <pre><code>let name1 = "రవి";
let name2 = 'సీత';
let message = &#96;నమస్కారం&#96;;

console.log(name1);
console.log(name2);
console.log(message);
console.log(typeof name1); // string</code></pre>
      </div>

      <h3 style="margin-top: 15px; margin-bottom: 8px; font-size: 16px;">Quotes లోపల quotes రాయడం</h3>
      <div class="code-block">
        <pre><code>console.log("It's a nice day");
console.log('అతను "హాయ్" అన్నాడు');</code></pre>
      </div>

      <h3 style="margin-top: 15px; margin-bottom: 8px; font-size: 16px;">String పొడవు (.length)</h3>
      <div class="code-block">
        <pre><code>let language = "JavaScript";
console.log(language.length); // 10</code></pre>
      </div>
      <p><code>.length</code> తో string లో ఎన్ని అక్షరాలు ఉన్నాయో సులభంగా తెలుస్తుంది.</p>
    </div>

    <div class="section-title"><span class="num">5</span>2. Number: సంఖ్యలు, Infinity & NaN</div>
    <div class="section-body">
      <p>JavaScript లో <strong>number</strong> అనే ఒకే రకం ఉంటుంది. పూర్ణ సంఖ్యలు (<code>10</code>), దశాంశ సంఖ్యలు (<code>3.14</code>), రుణ సంఖ్యలు (<code>-5</code>) అన్నీ number లే.</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — Number Type</span>
        </div>
        <pre><code>let age = 25;
let price = 99.50;
let temperature = -4;

console.log(typeof age);   // number
console.log(typeof price); // number</code></pre>
      </div>

      <h3 style="margin-top: 20px; margin-bottom: 8px; font-size: 16px;">ప్రత్యేక number విలువలు: Infinity మరియు NaN</h3>
      <p><strong>Infinity:</strong> ఒక సంఖ్యను సున్నాతో భాగిస్తే (గణితంలో ఇది కుదరదు), JavaScript <code>Infinity</code> ఇస్తుంది.</p>
      <div class="code-block">
        <pre><code>console.log(10 / 0);  // Infinity
console.log(-10 / 0); // -Infinity</code></pre>
      </div>

      <p style="margin-top: 10px;"><strong>NaN (Not a Number):</strong> సంఖ్య కాని దాన్ని సంఖ్యలా లెక్కించడానికి ప్రయత్నిస్తే <code>NaN</code> వస్తుంది. ఆశ్చర్యంగా <strong>NaN కూడా "number" రకమే!</strong></p>
      <div class="code-block">
        <pre><code>console.log("abc" * 2);  // NaN
console.log(typeof NaN); // number</code></pre>
      </div>

      <h3 style="margin-top: 20px; margin-bottom: 8px; font-size: 16px;">దశాంశ సంఖ్యల విచిత్రం (Floating Point Quirk)</h3>
      <div class="code-block">
        <pre><code>console.log(0.1 + 0.2); // 0.30000000000000004</code></pre>
      </div>
      <p><code>0.3</code> రావాలి కదా? కంప్యూటర్లు దశాంశ సంఖ్యలను binary లో store చేసే విధానం వల్ల చిన్న తేడా వస్తుంది. డబ్బు లెక్కల్లో దీని గురించి జాగ్రత్తగా ఉండాలి.</p>
    </div>

    <div class="section-title"><span class="num">6</span>3. Boolean: అవును లేదా కాదు (true / false)</div>
    <div class="section-body">
      <p><strong>Boolean</strong> కి కేవలం రెండే విలువలు ఉంటాయి: <code>true</code> (అవును) మరియు <code>false</code> (కాదు). ఇది లైట్ స్విచ్ లాంటిది — ఆన్ లేదా ఆఫ్.</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — Boolean Comparisons</span>
        </div>
        <pre><code>let isStudent = true;
let isMarried = false;

console.log(typeof isStudent); // boolean
console.log(10 > 5);           // true
console.log(3 === 4);          // false</code></pre>
      </div>
      <p><strong>గుర్తుంచుకోండి:</strong> <code>true</code> మరియు <code>false</code> ని quotes లో రాయకూడదు. <code>"true"</code> అనేది కేవలం ఒక text (string).</p>
    </div>

    <div class="section-title"><span class="num">7</span>4. undefined vs 5. null</div>
    <div class="section-body">
      <div class="callout">
        <div class="callout-title">🎬 రియల్ లైఫ్ అనలాజీ: సినిమా హాల్ సీట్ బుకింగ్</div>
        <p style="margin-top: 8px; color: var(--text2); font-size: 14.5px;">ఈ రెంటికి తేడా చాలా సులభం:</p>
        <ul style="margin-top: 8px; color: var(--text2); font-size: 14.5px;">
          <li><strong>undefined:</strong> డబ్బా ఉంది కానీ ఏమీ పెట్టడం మర్చిపోయాం, లేదా ఇంకా పెట్టలేదు. (మీరు ఇంకా seat select చేయలేదు).</li>
          <li><strong>null:</strong> డబ్బా ఉంది, మరియు "ఇది ఖాళీ" అని మనమే ఉద్దేశపూర్వకంగా చెప్పాం. (మీరు "నాకు ఏ seat వద్దు" అని స్పష్టంగా చెప్పారు).</li>
        </ul>
      </div>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — null vs undefined</span>
        </div>
        <pre><code>let phoneNumber;
console.log(phoneNumber);        // undefined
console.log(typeof phoneNumber); // undefined

let selectedSeat = null;
console.log(selectedSeat);        // null
console.log(typeof selectedSeat); // object (హిస్టారిక్ బగ్!)</code></pre>
      </div>

      <div class="callout callout-warning" style="margin-top:15px;">
        <div class="callout-title">⚠️ typeof null విచిత్రం:</div>
        <p><code>typeof null</code> ఎప్పుడూ <strong>"object"</strong> అని వస్తుంది! ఇది 1995 లో JavaScript మొదటి version లో జరిగిన ఒక పొరపాటు. పాత వెబ్సైట్లు పాడవ్వకూడదని దీన్ని అలాగే ఉంచేశారు.</p>
      </div>
    </div>

    <div class="section-title"><span class="num">8</span>"5" మరియు 5 మధ్య తేడా (కూడిక vs అతికింపు)</div>
    <div class="section-body">
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — String Concatenation vs Number Addition</span>
        </div>
        <pre><code>console.log(5 + 3);   // 8 (నంబర్ల కూడిక)
console.log("5" + 3); // "53" (టెక్స్ట్ అతికింపు - Concatenation!)</code></pre>
      </div>
      <p><code>5 + 3</code> రెండూ number లు కాబట్టి సంకలనం జరిగింది. కానీ <code>"5" + 3</code> లో ఒకటి string కాబట్టి JavaScript వాటిని పక్కపక్కనే అతికించింది (Concatenation).</p>
    </div>

    <div class="section-title"><span class="num">9</span>అన్నీ కలిపి ఒక ఉదాహరణ: విద్యార్థి వివరాలు</div>
    <div class="section-body">
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — Full Data Types Example</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>let studentName = "సీత";
let marks = 87.5;
let isPassed = true;
let address = null;
let phoneNumber;

console.log(studentName, "->", typeof studentName); // string
console.log(marks, "->", typeof marks);             // number
console.log(isPassed, "->", typeof isPassed);       // boolean
console.log(address, "->", typeof address);         // object
console.log(phoneNumber, "->", typeof phoneNumber); // undefined</code></pre>
      </div>
    </div>

    <div class="callout callout-warning">
      <div class="callout-title">⚠️ Beginners చేసే సాధారణ తప్పులు</div>
      <ul>
        <li><strong>Number ని quotes లో రాయడం:</strong> <code>let age = "25"; age + 5;</code> అంటే <code>"255"</code> వస్తుంది కానీ <code>30</code> రాదు! సంఖ్యలకు quotes వాడకూడదు.</li>
        <li><strong>Boolean ని quotes లో రాయడం:</strong> <code>let isLoggedIn = "false";</code> అనేది boolean కాదు, string! దీన్ని <code>if</code> లో వాడితే <code>true</code> లా ప్రవర్తిస్తుంది!</li>
        <li><strong>NaN ని === తో పోల్చడం:</strong> <code>NaN === NaN</code> రిజల్ట్ <code>false</code>! NaN ని చెక్ చేయడానికి ఎప్పుడూ <code>Number.isNaN()</code> వాడాలి.</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">10</span>ప్రాక్టీస్ ప్రశ్నలు & సమాధానాలు</div>
    <div class="section-body">
      <ol style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.6;">
        <li>కింది విలువల data types చెప్పండి: <code>"hello"</code>, <code>42</code>, <code>3.14</code>, <code>true</code>, <code>null</code>, <code>undefined</code>, <code>"100"</code>, <code>false</code>.</li>
        <li>ఈ <code>typeof</code> లు ఏం print చేస్తాయి? <code>typeof "true"</code>, <code>typeof true</code>, <code>typeof (7 / 2)</code>, <code>typeof NaN</code>.</li>
        <li>ఒక variable లో మీ పేరు, వయసు, student అవునా కాదా (boolean) పెట్టి, ప్రతిదాని <code>typeof</code> print చేయండి.</li>
        <li><code>"10" + 5</code> మరియు <code>10 + 5</code> ఫలితాలు ఏమిటి? ఎందుకు వేర్వేరు?</li>
        <li><code>0.1 + 0.2 === 0.3</code> ఏం ఇస్తుంది?</li>
      </ol>

      <details style="margin-top: 15px; background: var(--bg2); border: 1px solid var(--border); padding: 12px; border-radius: 8px; cursor: pointer;">
        <summary style="font-weight: bold; color: var(--text);">సమాధానాలు చూడండి</summary>
        <div style="margin-top: 10px; font-size: 14px; color: var(--text2);">
          <p><strong>1.</strong> <code>"hello"</code> → string, <code>42</code> → number, <code>3.14</code> → number, <code>true</code> → boolean, <code>null</code> → null (కానీ typeof object), <code>undefined</code> → undefined, <code>"100"</code> → string, <code>false</code> → boolean.</p>
          <p style="margin-top: 8px;"><strong>2.</strong> <code>string</code>, <code>boolean</code>, <code>number</code>, <code>number</code> (NaN కూడా number రకమే!).</p>
          <p style="margin-top: 8px;"><strong>3.</strong> <code>let myName = "రవి"; let myAge = 20; let isStudent = true;</code> (Types: string, number, boolean).</p>
          <p style="margin-top: 8px;"><strong>4.</strong> <code>"10" + 5</code> → <code>"105"</code> (string concatenation). <code>10 + 5</code> → <code>15</code> (number addition).</p>
          <p style="margin-top: 8px;"><strong>5.</strong> <code>false</code>. ఎందుకంటే <code>0.1 + 0.2</code> ఫలితం <code>0.30000000000000004</code>.</p>
        </div>
      </details>
    </div>

    <div class="try-box">
      <div class="try-title">🚀 మీరే try చేయండి</div>
      <p style="color:var(--text2); font-size:14px; margin-bottom:12px;">ఈ code ని మన compiler లో run చేసి, విలువలు మార్చి ఫలితాలు చూడండి:</p>
      <div class="code-block">
        <pre><code>let productName = "Laptop";
let price = 45000;
let inStock = true;
let discount = null;
let rating;

console.log(productName, "->", typeof productName);
console.log(price, "->", typeof price);
console.log(inStock, "->", typeof inStock);
console.log(discount, "->", typeof discount);
console.log(rating, "->", typeof rating);</code></pre>
      </div>
      <a class="run-btn" href="/?lang=nodejs">👉 Our Compiler లో JavaScript try చేయండి</a>
    </div>

    <div class="intro-box" style="background: rgba(34, 197, 94, 0.1); border-color: rgba(34, 197, 94, 0.3); margin-top:30px;">
      <h3 style="color:#22c55e; margin-bottom:8px;">📌 Quick Summary:</h3>
      <ul style="margin-left: 20px; color: var(--text2);">
        <li>Data type అంటే విలువ యొక్క రకం. <code>typeof</code> తో తెలుసుకోవచ్చు.</li>
        <li><strong>string</strong>: text. <strong>number</strong>: సంఖ్యలు (Infinity, NaN తో సహా). <strong>boolean</strong>: <code>true</code> / <code>false</code>.</li>
        <li><strong>undefined</strong>: విలువ ఇంకా ఇవ్వలేదు. <strong>null</strong>: ఉద్దేశపూర్వకంగా ఖాళీ.</li>
        <li><code>typeof null</code> ఎప్పుడూ <code>"object"</code> అని ఇస్తుంది (ఒక పాత quirk).</li>
        <li><code>"5"</code> (string) మరియు <code>5</code> (number) వేరు వేరు. <code>"5" + 3</code> ఫలితం <code>"53"</code>.</li>
      </ul>
    </div>
`;

// Helper to update Phase 1 and Phase 2
console.log("Updating build_javascript_phase2.js...");
let p2 = fs.readFileSync(phase2Path, 'utf8');

// Replace buildLesson4 in phase2
const regexP2 = /function buildLesson4\(\) \{[\s\S]*?const contentBody = `[\s\S]*?`;\s*const html = wrapJSLessonPage\(title, desc, filename, 4, subtopics, contentBody, 'variables\.html', '3\. Variables \(let, const & var\)', 'conditionals\.html', 'Phase 3: Conditionals'\);/g;

if (regexP2.test(p2)) {
  p2 = p2.replace(regexP2, `function buildLesson4() {
  const title = "JavaScript Data Types తెలుగులో | string, number, boolean, null, undefined";
  const desc = "JavaScript లో data types అంటే ఏమిటి, string, number, boolean, null, undefined మధ్య తేడాలు, typeof operator ని తెలుగులో ఉదాహరణలతో నేర్చుకోండి.";
  const filename = "operators.html";
  const subtopics = "string · number · boolean · null · undefined · typeof Operator · NaN · Infinity · \\"5\\" vs 5";

  const contentBody = \`${chapter4Content}\`;

  const html = wrapJSLessonPage(title, desc, filename, 4, subtopics, contentBody, 'variables.html', '3. Variables (let, const, var)', '05-operators-expressions-and-precedence.html', '5. Operators, Expressions & Precedence');
  fs.writeFileSync(path.join(jsDir, filename), html, 'utf8');
  fs.writeFileSync(path.join(jsDir, 'data-types.html'), html, 'utf8');
  console.log(\`✅ Generated \${filename} and data-types.html\`);
}`);
} else {
  // Direct replacement of contentBody in buildLesson4
  const startIdx = p2.indexOf('function buildLesson4() {');
  if (startIdx !== -1) {
    const nextFnIdx = p2.indexOf('function buildBlogJSHome() {', startIdx);
    const lesson4Func = `function buildLesson4() {
  const title = "JavaScript Data Types తెలుగులో | string, number, boolean, null, undefined";
  const desc = "JavaScript లో data types అంటే ఏమిటి, string, number, boolean, null, undefined మధ్య తేడాలు, typeof operator ని తెలుగులో ఉదాహరణలతో నేర్చుకోండి.";
  const filename = "operators.html";
  const subtopics = "string · number · boolean · null · undefined · typeof Operator · NaN · Infinity · \\"5\\" vs 5";

  const contentBody = \`${chapter4Content}\`;

  const html = wrapJSLessonPage(title, desc, filename, 4, subtopics, contentBody, 'variables.html', '3. Variables (let, const, var)', '05-operators-expressions-and-precedence.html', '5. Operators, Expressions & Precedence');
  fs.writeFileSync(path.join(jsDir, filename), html, 'utf8');
  fs.writeFileSync(path.join(jsDir, 'data-types.html'), html, 'utf8');
  console.log(\`✅ Generated \${filename} and data-types.html\`);
}

`;
    p2 = p2.slice(0, startIdx) + lesson4Func + p2.slice(nextFnIdx);
  }
}

fs.writeFileSync(phase2Path, p2, 'utf8');
console.log("Updated build_javascript_phase2.js successfully!");
