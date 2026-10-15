const fs = require('fs');
const path = require('path');

function replaceLessonContent(filePath, funcName, newContent) {
  let content = fs.readFileSync(filePath, 'utf8');
  const funcStart = content.indexOf(`function ${funcName}()`);
  const contentBodyStart = content.indexOf('const contentBody = `', funcStart);
  const contentBodyEnd = content.indexOf('  `;\n\n  const html = wrapJSLessonPage', contentBodyStart);
  
  if (funcStart !== -1 && contentBodyStart !== -1 && contentBodyEnd !== -1) {
    const newFileContent = content.substring(0, contentBodyStart) +
                           'const contentBody = `\n' + newContent + '\n' +
                           content.substring(contentBodyEnd);
    fs.writeFileSync(filePath, newFileContent, 'utf8');
    console.log(`Updated ${funcName} in ${filePath}`);
  } else {
    console.log(`Failed to find bounds for ${funcName} in ${filePath}`);
  }
}

const contentLesson1 = `
    <div class="intro-box">
      <p>కంప్యూటర్స్ కి మనం చెప్పే పనిని అర్థమయ్యేలా చేయడానికి వాడే లాంగ్వేజెస్ లో <strong>JavaScript (JS)</strong> ఒకటి. ఇది ప్రపంచంలోనే అత్యంత పాపులర్ ప్రోగ్రామింగ్ లాంగ్వేజ్! మొదట్లో కేవలం వెబ్ పేజీలని ఇంటరాక్టివ్ (Interactive) గా చేయడానికి వాడేవారు. కానీ ఇప్పుడు గేమ్స్, మొబైల్ యాప్స్, మరియు సర్వర్ సైడ్ (Node.js) కూడా జావాస్క్రిప్ట్ తోనే చేస్తున్నారు.</p>
    </div>

    <div class="callout">
      <div class="callout-title">🍔 రియల్ లైఫ్ స్టోరీ: JavaScript అంటే ఏంటి?</div>
      <p style="margin-top: 10px; color: var(--text2); font-size: 14.5px;">ఒక ఇల్లు (House) కడుతున్నాం అనుకోండి:</p>
      <ul style="margin-top: 10px; color: var(--text2); font-size: 14.5px;">
        <li><strong>HTML:</strong> ఇటుకలు, గోడలు (Structure). ఇది లేకపోతే ఇల్లు నిలబడదు.</li>
        <li><strong>CSS:</strong> పెయింటింగ్, ఇంటీరియర్ డిజైన్ (Style). ఇల్లు అందంగా కనిపించడానికి.</li>
        <li><strong>JavaScript:</strong> ఎలక్ట్రిసిటీ, స్విచ్ వేస్తే ఫ్యాన్ తిరగడం, మోటార్ ఆన్ అవ్వడం (Functionality). ఇది లేకపోతే ఇల్లు కేవలం ఒక బొమ్మ లాగా ఉంటుంది!</li>
      </ul>
      <p style="margin-top: 10px; color: var(--text2); font-size: 14.5px;">అలాగే ఒక వెబ్సైట్ కి ప్రాణం పోసేదే JavaScript!</p>
    </div>

    <div class="section-title"><span class="num">1</span>V8 Engine & JIT Compilation</div>
    <div class="section-body">
      <p>జావాస్క్రిప్ట్ అనేది <strong>Interpreted</strong> మరియు <strong>Just-In-Time (JIT) Compiled</strong> లాంగ్వేజ్. మీరు రాసిన కోడ్ ని బ్రౌజర్ లో ఉండే "V8 Engine" (Google Chrome లో వాడే ఇంజిన్) చదివి, వెంటనే మెషిన్ కోడ్ కి మార్చి రన్ చేస్తుంది. అందుకే ఇది చాలా ఫాస్ట్ గా ఉంటుంది!</p>
      
      <div class="diagram-box">
[ JavaScript Code ] 
       ↓ (Parsed by Browser)
[ AST (Abstract Syntax Tree) ] 
       ↓ (JIT Compiler / Interpreter)
[ Bytecode & Optimized Machine Code ]
       ↓
[ Executes on CPU ]</div>
    </div>

    <div class="section-title"><span class="num">2</span>Your First Program</div>
    <div class="section-body">
      <p>ప్రోగ్రామింగ్ నేర్చుకునేటప్పుడు ఎవరైనా ముందుగా రాసే ప్రోగ్రాం <strong>"Hello World"</strong>. జావాస్క్రిప్ట్ లో ఏదైనా ఔట్పుట్ ని స్క్రీన్ మీద (లేదా Console లో) ప్రింట్ చేయడానికి <code>console.log()</code> వాడతాం.</p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — Hello World</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>// మీ మొదటి JavaScript ప్రోగ్రాం
console.log("Hello, World!");
console.log(10 + 20); // కూడికలు కూడా చేయొచ్చు (Output: 30)</code></pre>
      </div>
    </div>

    <div class="faq-card">
      <h4>💡 ఇంటర్వ్యూ ప్రశ్న: JavaScript కీ Java కీ సంబంధం ఉందా?</h4>
      <p><strong>Answer:</strong> అస్సలు లేదు! Apple పండు కీ, Pine-apple కీ ఎంత సంబంధం ఉందో.. Java కీ, JavaScript కీ అంతే సంబంధం ఉంది. పేర్లు మాత్రమే సిమిలర్ గా ఉంటాయి.</p>
    </div>
    
    <div class="faq-card">
      <h4>💡 ఇంటర్వ్యూ ప్రశ్న: JavaScript ఎక్కడ రన్ అవుతుంది?</h4>
      <p><strong>Answer:</strong> బ్రౌజర్ (Client-side) లో మరియు Node.js ద్వారా సర్వర్ (Server-side) లో కూడా రన్ అవుతుంది.</p>
    </div>
`;

const contentLesson2 = `
    <div class="intro-box">
      <p>In this second lesson of Phase 1, we delve into the core grammar rules of JavaScript: <strong>Statements, Semicolons & Automatic Semicolon Insertion (ASI)</strong>, <strong>Case Sensitivity</strong>, <strong>Comments</strong>, and a comprehensive breakdown of the <strong>3 categories of Programming Errors</strong> (Syntax vs Runtime vs Logical errors) with practical debugging strategies.</p>
    </div>

    <div class="callout">
      <div class="callout-title">📝 Comments (కోడ్ ని అర్థం చేసుకోవడానికి)</div>
      <p style="margin-top: 10px; color: var(--text2); font-size: 14.5px;">Comments డెవలపర్ రాసే లాజిక్ ని ఎక్స్ప్లెయిన్ చేయడానికి మరియు కోడ్ రీడబిలిటీ పెంచడానికి వాడతాము. JS Engine ఎగ్జిక్యూషన్ టైమ్ లో కామెంట్స్ ని కంప్లీట్ గా ఇగ్నోర్ చేస్తుంది.</p>
      <ul style="margin-top: 10px; color: var(--text2); font-size: 14.5px;">
        <li><code>//</code> సింగిల్ లైన్ కామెంట్స్ (Single-line comments)</li>
        <li><code>/* ... */</code> మల్టీ లైన్ కామెంట్స్ (Multi-line comments)</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">1</span>Statements & Automatic Semicolon Insertion (ASI)</div>
    <div class="section-body">
      <p>ప్రోగ్రామింగ్ లో ఒక పని చేయమని కంప్యూటర్ కి ఇచ్చే ఇన్స్ట్రక్షన్ ని <strong>Statement</strong> అంటారు. జావాస్క్రిప్ట్ లో ప్రతి స్టేట్మెంట్ చివర సెమికోలన్ <code>;</code> పెట్టడం బెస్ట్ ప్రాక్టీస్.</p>
      <p>కానీ మీరు పెట్టడం మర్చిపోయినా, జావాస్క్రిప్ట్ ఇంజిన్ దానికదే సెమికోలన్ ని యాడ్ చేసుకుంటుంది. దీనినే <strong>Automatic Semicolon Insertion (ASI)</strong> అంటారు.</p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — Syntax Demo</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>let a = 10;
let b = 20;

// ఒకే లైన్ లో రెండు స్టేట్మెంట్స్ రాయాలంటే కచ్చితంగా సెమికోలన్ వాడాలి!
let x = 5; let y = 15; console.log(x + y);

// Case Sensitivity (జావాస్క్రిప్ట్ లో అప్పర్ కేస్, లోవర్ కేస్ వేరు వేరు)
let Name = "Ravi";
let name = "Teja";
console.log(Name); // "Ravi" ప్రింట్ అవుతుంది</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">2</span>Types of Errors (ఎర్రర్స్ రకాలు)</div>
    <div class="section-body">
      <table class="tbl">
        <tr><th>ఎర్రర్ రకం</th><th>వివరణ</th><th>ఉదాహరణ</th></tr>
        <tr><td><strong>Syntax Error</strong></td><td>కోడ్ రాసే రూల్స్ ని బ్రేక్ చేస్తే వచ్చే ఎర్రర్.</td><td><code>let a = 10</code> (ఇక్కడ తప్పు లేదు, కానీ సింటాక్స్ తప్పు రాస్తే వస్తుంది)</td></tr>
        <tr><td><strong>Runtime Error</strong></td><td>కోడ్ రన్ అవుతున్నప్పుడు, లేని ఫంక్షన్ ని లేదా వాల్యూ ని వాడితే వచ్చే ఎర్రర్.</td><td><code>undefinedFunction()</code></td></tr>
        <tr><td><strong>Logical Error</strong></td><td>సింటాక్స్ కరెక్టే కానీ లాజిక్ తప్పు. (ఉదాహరణకు ప్లస్ బదులు మైనస్ వాడటం)</td><td><code>let sum = a - b;</code> (కూడిక బదులు తీసివేత)</td></tr>
      </table>
    </div>

    <div class="faq-card">
      <h4>💡 ఇంటర్వ్యూ ప్రశ్న: ASI (Automatic Semicolon Insertion) అంటే ఏంటి?</h4>
      <p><strong>Answer:</strong> జావాస్క్రిప్ట్ ఇంజిన్ కోడ్ రన్ చేసేటప్పుడు, ఎక్కడైనా సెమికోలన్ మిస్ అయితే దానికదే ఆటోమేటిక్ గా యాడ్ చేసే ఫీచర్ ని ASI అంటారు. కానీ బెస్ట్ ప్రాక్టీస్ గా మనమే సెమికోలన్ పెట్టడం మంచిది.</p>
    </div>
`;

const contentLesson3 = `
    <div class="intro-box">
      <p>డేటాని (Data) కంప్యూటర్ మెమరీలో స్టోర్ చేసుకోవడానికి వాడే డబ్బాలనే (Containers) <strong>Variables</strong> అంటాం. జావాస్క్రిప్ట్ లో వేరియబుల్స్ ని క్రియేట్ చేయడానికి మనం మూడు రకాల కీవర్డ్స్ వాడతాం: <code>var</code>, <code>let</code>, మరియు <code>const</code>.</p>
    </div>

    <div class="callout">
      <div class="callout-title">📦 రియల్ లైఫ్ స్టోరీ: స్వీట్ డబ్బాలు</div>
      <p style="margin-top: 10px; color: var(--text2); font-size: 14.5px;">మీ ఇంట్లో స్నాక్స్ పెట్టుకునే 3 రకాల డబ్బాలు ఉన్నాయి అనుకోండి:</p>
      <ul style="margin-top: 10px; color: var(--text2); font-size: 14.5px;">
        <li><strong>var:</strong> పాత కాలం నాటి ప్లాస్టిక్ డబ్బా. ఇది ఎక్కడ పెట్టినా అందరికీ కనిపిస్తుంది, ఎవరైనా ఎప్పుడైనా తీసి తినేయొచ్చు (Global/Function Scope). ఇది కొంచెం డేంజర్!</li>
        <li><strong>let:</strong> కొత్త మోడల్ లాక్ ఉండే డబ్బా. దీన్ని ఏ గదిలో (Block) పెడితే ఆ గదిలో వాళ్ళకి మాత్రమే దొరుకుతుంది. అందులో ఉన్న స్నాక్స్ ని మార్చుకోవచ్చు (Re-assignable).</li>
        <li><strong>const:</strong> సీల్ వేసిన స్టీల్ డబ్బా. ఇందులో ఒక్కసారి స్వీట్ పెడితే, ఇంక దాన్ని మార్చలేరు (Not Re-assignable). కానీ డబ్బా లోపల ఉన్న స్వీట్ ని తినొచ్చు (Object properties can change).</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">1</span>Scoping & Hoisting (Temporal Dead Zone)</div>
    <div class="section-body">
      <p>జావాస్క్రిప్ట్ లో <strong>Scope</strong> అంటే వేరియబుల్ ఎక్కడెక్కడ యాక్సెస్ చేయగలం అనేది డిసైడ్ చేస్తుంది.</p>
      <ul style="margin-top: 10px; color: var(--text2); font-size: 14.5px;">
        <li><strong>var (Function Scope):</strong> ఒక ఫంక్షన్ లో డిక్లేర్ చేస్తే ఆ ఫంక్షన్ మొత్తం యాక్సెస్ చేయొచ్చు. ఇది "Hoisting" వల్ల టాప్ కి వెళ్ళిపోయి ముందే యాక్సెస్ చేస్తే <code>undefined</code> వస్తుంది.</li>
        <li><strong>let & const (Block Scope):</strong> ఒక బ్లాక్ <code>{ ... }</code> లోపల మాత్రమే యాక్సెస్ అవుతాయి. డిక్లేర్ చేయకముందు యాక్సెస్ చేస్తే "Temporal Dead Zone (TDZ)" వల్ల Error వస్తుంది.</li>
      </ul>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — var, let, const</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>let age = 20; // మారే అవకాశం ఉంది కాబట్టి let వాడాం
age = 21;     // Valid: let ని మార్చవచ్చు

const name = "Balaji"; // పేరు మారదు కాబట్టి const
// name = "Kumar";     // ❌ TypeError: Assignment to constant variable.

if (true) {
    var a = 10;
    let b = 20;
}
console.log(a); // 10 వస్తుంది (var కి block scope లేదు)
// console.log(b); // ❌ ReferenceError: b is not defined (let కి block scope ఉంటుంది)</code></pre>
      </div>
    </div>

    <div class="faq-card">
      <h4>💡 ఇంటర్వ్యూ ప్రశ్న: Hoisting అంటే ఏంటి?</h4>
      <p><strong>Answer:</strong> కోడ్ రన్ అయ్యేముందు జావాస్క్రిప్ట్ ఇంజిన్ వేరియబుల్స్ (var) మరియు ఫంక్షన్ డిక్లరేషన్స్ ని ఫైల్ టాప్ కి మూవ్ చేసే ప్రాసెస్ ని Hoisting అంటారు.</p>
    </div>

    <div class="faq-card">
      <h4>💡 ఇంటర్వ్యూ ప్రశ్న: ఏది వాడాలి? var లేదా let/const?</h4>
      <p><strong>Answer:</strong> ఎప్పుడూ <code>const</code> వాడడమే బెస్ట్ ప్రాక్టీస్! వేరియబుల్ వాల్యూ మారుతుంది అని మీకు కచ్చితంగా తెలిస్తే మాత్రమే <code>let</code> వాడాలి. మోడ్రన్ జావాస్క్రిప్ట్ లో <code>var</code> ని వాడకూడదు.</p>
    </div>
`;

const contentLesson4 = `
    <div class="intro-box">
      <p>జావాస్క్రిప్ట్ లో మనం నంబర్స్, టెక్స్ట్, ట్రూ/ఫాల్స్ లాంటి రకరకాల డేటాని స్టోర్ చేయొచ్చు. ఈ డేటాని మార్చడానికి లేదా కంపేర్ చేయడానికి వాడే సింబల్స్ నే <strong>Operators</strong> అంటారు.</p>
    </div>

    <div class="callout">
      <div class="callout-title">🔍 రియల్ లైఫ్ స్టోరీ: డైనమిక్ టైపింగ్ (Dynamic Typing)</div>
      <p style="margin-top: 10px; color: var(--text2); font-size: 14.5px;">C లాంగ్వేజ్ లాంటి వాటిలో ఒక బాక్స్ మీద "ఇందులో యాపిల్స్ మాత్రమే పెట్టాలి" (int) అని రాసి ఉంటే, అందులో బనానా (string) పెట్టలేము. కానీ <strong>JavaScript ఒక మేజిక్ బాక్స్!</strong> మీరు ముందు యాపిల్స్ పెట్టి, తర్వాత వాటిని తీసేసి బనానా పెట్టొచ్చు. దీనినే <strong>Dynamically Typed Language</strong> అంటారు. వేరియబుల్ క్రియేట్ చేసేటప్పుడు డేటా టైప్ చెప్పాల్సిన అవసరం లేదు!</p>
    </div>

    <div class="section-title"><span class="num">1</span>Primitives vs Reference Types</div>
    <div class="section-body">
      <p>జావాస్క్రిప్ట్ లో డేటా టైప్స్ 2 రకాలు:</p>
      <ul style="margin-top: 10px; color: var(--text2); font-size: 14.5px;">
        <li><strong>Primitives (ప్రైమరీ టైప్స్):</strong> <code>String</code> (టెక్స్ట్), <code>Number</code> (నంబర్స్), <code>Boolean</code> (true/false), <code>Undefined</code> (వాల్యూ ఇవ్వనప్పుడు), <code>Null</code> (ఖాళీ అని చెప్పడానికి).</li>
        <li><strong>Reference Types:</strong> <code>Objects</code>, <code>Arrays</code>, <code>Functions</code>. ఇవి డైరెక్ట్ గా వాల్యూ ని కాకుండా, మెమరీ అడ్రస్ ని స్టోర్ చేసుకుంటాయి.</li>
      </ul>
      
      <table class="tbl">
        <tr><th>వాల్యూ</th><th>టైప్ (typeof)</th><th>వివరణ</th></tr>
        <tr><td>42 లేదా 3.14</td><td>"number"</td><td>పూర్ణాంకాలు మరియు దశాంశాలు (Integers & Decimals)</td></tr>
        <tr><td>"Hello"</td><td>"string"</td><td>టెక్స్ట్ డేటా (కోట్స్ లో ఉండాలి)</td></tr>
        <tr><td>true / false</td><td>"boolean"</td><td>అవును లేదా కాదు</td></tr>
        <tr><td>let x;</td><td>"undefined"</td><td>డిక్లేర్ చేసాం కానీ వాల్యూ ఇవ్వలేదు</td></tr>
      </table>
    </div>

    <div class="section-title"><span class="num">2</span>== (Loose) vs === (Strict) Equality</div>
    <div class="section-body">
      <p>ఇది జావాస్క్రిప్ట్ లో అత్యంత ముఖ్యమైన కాన్సెప్ట్! <code>==</code> వాడితే వాల్యూస్ ని మాత్రమే చెక్ చేస్తుంది (టైప్ మార్చేసి మరీ చెక్ చేస్తుంది). కానీ <code>===</code> వాడితే వాల్యూ తో పాటు డేటా టైప్ కూడా సేమ్ ఉందో లేదో చెక్ చేస్తుంది.</p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — Operators & typeof</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>let age = 25;
console.log(typeof age); // Output: "number"

// === (Strict Equality)
console.log(5 == "5");  // true (కారణం: టైప్ మార్చేసింది)
console.log(5 === "5"); // false (కారణం: ఒకటి నంబర్, ఇంకొకటి స్ట్రింగ్)

// Logical Operators
let isRaining = false;
let hasUmbrella = true;
console.log(!isRaining && hasUmbrella); // Output: false (వర్షం పడట్లేదు AND గొడుగు ఉంది)</code></pre>
      </div>
    </div>

    <div class="faq-card">
      <h4>💡 ఇంటర్వ్యూ ప్రశ్న: <code>typeof null</code> ఏమొస్తుంది? ఎందుకు?</h4>
      <p><strong>Answer:</strong> <code>typeof null</code> ఎప్పుడూ <strong>"object"</strong> అని వస్తుంది. ఇది జావాస్క్రిప్ట్ క్రియేట్ చేసినప్పటి నుంచి ఉన్న ఒక ప్రసిద్ధ బగ్ (Bug). దాన్ని ఫిక్స్ చేస్తే పాత వెబ్సైట్స్ పనిచేయవు అని అలాగే ఉంచేశారు!</p>
    </div>

    <div class="faq-card">
      <h4>💡 ఇంటర్వ్యూ ప్రశ్న: <code>undefined</code> కి <code>null</code> కి తేడా ఏంటి?</h4>
      <p><strong>Answer:</strong> <code>undefined</code> అంటే మీరు వేరియబుల్ క్రియేట్ చేశారు కానీ ఇంకా ఎలాంటి వాల్యూ ఇవ్వలేదు. <code>null</code> అంటే మీరే కావాలని "ఇందులో ఏమీ లేదు ఖాళీ" అని కంప్యూటర్ కి చెప్తున్నారు.</p>
    </div>
`;

const contentLesson5 = `
    <div class="intro-box">
      <p>నిర్ణయాలు (Decisions) తీసుకోవడానికి ప్రోగ్రామింగ్ లో <strong>Conditionals</strong> వాడతాం. అంటే "వర్షం పడితే గొడుగు తీసుకెళ్ళు, లేదంటే మామూలుగా వెళ్ళు" అని కంప్యూటర్ కి చెప్పడం లాంటిది.</p>
    </div>

    <div class="callout">
      <div class="callout-title">🚦 రియల్ లైఫ్ స్టోరీ: ట్రాఫిక్ సిగ్నల్</div>
      <p style="margin-top: 10px; color: var(--text2); font-size: 14.5px;">మీరు బైక్ మీద వెళ్తున్నారు. సిగ్నల్ దగ్గర ఒక కండిషన్ ఉంటుంది:</p>
      <ul style="margin-top: 10px; color: var(--text2); font-size: 14.5px;">
        <li><strong>if (రెడ్ లైట్):</strong> బైక్ ఆపాలి.</li>
        <li><strong>else if (ఎల్లో లైట్):</strong> నెమ్మదిగా వెళ్లడానికి రెడీ అవ్వాలి.</li>
        <li><strong>else (గ్రీన్ లైట్):</strong> దూసుకుపోవాలి!</li>
      </ul>
      <p style="margin-top: 10px; color: var(--text2); font-size: 14.5px;">ప్రోగ్రామింగ్ లో కూడా సరిగ్గా ఇదే లాజిక్ ని <code>if...else if...else</code> వాడి రాస్తాం.</p>
    </div>

    <div class="section-title"><span class="num">1</span>Truthy & Falsy Values</div>
    <div class="section-body">
      <p>జావాస్క్రిప్ట్ లో ఇదొక స్పెషల్ కాన్సెప్ట్. <code>if()</code> కండిషన్ లోపల ఎప్పుడూ <code>true</code> లేదా <code>false</code> ఉండాలి. కానీ మనం నంబర్స్ లేదా టెక్స్ట్ పెట్టినా అది అర్థం చేసుకుంటుంది.</p>
      <p>వీటిని <strong>Falsy values</strong> అంటారు. ఇవి <code>if</code> లో పెడితే <code>false</code> కింద లెక్క: <br>
      <code>false</code>, <code>0</code>, <code>""</code> (ఖాళీ స్ట్రింగ్), <code>null</code>, <code>undefined</code>, <code>NaN</code>. <br>
      ఇవి తప్ప మిగిలిన ప్రపంచంలో ఉన్న <strong>ప్రతి వాల్యూ Truthy నే</strong>! (అంటే <code>"0"</code>, <code>[]</code>, <code>{}</code> అన్నీ Truthy నే!)</p>
    </div>

    <div class="section-title"><span class="num">2</span>Code Example (if-else & Ternary)</div>
    <div class="section-body">
      <p>పెద్ద పెద్ద <code>if-else</code> లు రాయడానికి బదులు, ఒకే లైన్ లో కండిషన్ రాయడానికి <strong>Ternary Operator (<code>? :</code>)</strong> వాడతాం.</p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — Conditionals</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>let age = 18;

// 1. If-Else వాడకం
if (age >= 18) {
    console.log("You can vote! 🗳️");
} else {
    console.log("Too young to vote! 👶");
}

// 2. Falsy చెకింగ్
let username = "";
if (username) {
    console.log("Welcome " + username);
} else {
    console.log("Welcome Guest!"); // username ఖాళీ కాబట్టి ఇది ప్రింట్ అవుతుంది
}

// 3. Ternary Operator (ఒకే లైన్ లో if-else)
// Condition ? True అయితే ఇది : False అయితే ఇది
let status = (age >= 18) ? "Adult" : "Minor";
console.log("User is: " + status);</code></pre>
      </div>
    </div>

    <div class="faq-card">
      <h4>💡 ఇంటర్వ్యూ ప్రశ్న: <code>if ([]) { ... }</code> లోపల కోడ్ రన్ అవుతుందా?</h4>
      <p><strong>Answer:</strong> అవును రన్ అవుతుంది! ఖాళీ అర్రే (Empty Array <code>[]</code>) అనేది Falsy లిస్ట్ లో లేదు. కాబట్టి జావాస్క్రిప్ట్ దాన్ని Truthy వాల్యూ లాగే భావిస్తుంది.</p>
    </div>

    <div class="faq-card">
      <h4>💡 ఇంటర్వ్యూ ప్రశ్న: Ternary Operator ఎప్పుడు వాడాలి?</h4>
      <p><strong>Answer:</strong> కండిషన్ చాలా చిన్నగా ఉండి, వెంటనే ఒక వాల్యూ ని అసైన్ చేయాల్సి వచ్చినప్పుడు (పైన ఎగ్జాంపుల్ లో లాగా) కోడ్ ని క్లీన్ గా ఉంచడానికి Ternary Operator వాడాలి.</p>
    </div>
`;


const phase1Path = path.join(__dirname, 'build_javascript_phase1.js');
const phase2Path = path.join(__dirname, 'build_javascript_phase2.js');
const phase3Path = path.join(__dirname, 'build_javascript_phase3.js'); // Conditionals is in Phase 3 Lesson 5

replaceLessonContent(phase1Path, 'buildLesson1', contentLesson1);
replaceLessonContent(phase1Path, 'buildLesson2', contentLesson2);
replaceLessonContent(phase2Path, 'buildLesson3', contentLesson3);
replaceLessonContent(phase2Path, 'buildLesson4', contentLesson4);
replaceLessonContent(phase3Path, 'buildLesson5', contentLesson5);
