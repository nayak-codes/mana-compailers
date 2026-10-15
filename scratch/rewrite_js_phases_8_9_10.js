const fs = require('fs');
const path = require('path');

const scratchDir = __dirname;

// ==========================================
// 1. REWRITE PHASE 8 (Lesson 11: array-methods.html)
// ==========================================
console.log("Rewriting Phase 8 (build_javascript_phase8.js)...");

const phase8Path = path.join(scratchDir, 'build_javascript_phase8.js');
let p8Code = fs.readFileSync(phase8Path, 'utf8');

const p8Lesson11Content = `
    <div class="intro-box">
      <p>అర్రే లోని డేటాను ప్రాసెస్ చేయడానికి <code>for</code> లూప్‌లు రాయడానికి బదులుగా, JavaScript లో <strong>Modern Array Methods</strong> (<code>map</code>, <code>filter</code>, <code>reduce</code>, <code>forEach</code>, <code>find</code>) వాడతాం. ఇవి కోడ్ ని చాలా క్లీన్ గా, వేగంగా మరియు రియాక్ట్/నోడ్ జెఎస్ ప్రాజెక్టులలో సులభంగా వాడేలా చేస్తాయి!</p>
    </div>

    <div class="callout">
      <div class="callout-title">🏭 రియల్ లైఫ్ అనలాజీ: ఫ్యాక్టరీ కన్వేయర్ బెల్ట్ (Assembly Line)</div>
      <p style="margin-top: 10px; color: var(--text2); font-size: 14.5px;">ఒక జ్యూస్ తయారీ ఫ్యాక్టరీ ని ఊహించుకోండి:</p>
      <ul style="margin-top: 10px; color: var(--text2); font-size: 14.5px;">
        <li><strong><code>filter()</code>:</strong> కుళ్ళిపోయిన పండ్లను వేరు చేసి, కేవలం మంచి పండ్లను మాత్రమే ఎంచుకుంటుంది.</li>
        <li><strong><code>map()</code>:</strong> ప్రతి మంచి పండుని తొక్క తీసి, జ్యూస్ గా మారుస్తుంది (తయారైన కొత్త అర్రే).</li>
        <li><strong><code>reduce()</code>:</strong> తయారైన అన్ని జ్యూస్ గ్లాసులను కలిపి ఒక పెద్ద జగ్ లో నింపుతుంది (ఒకే ఒక ఫైనల్ వాల్యూ).</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">1</span>forEach() vs map()</div>
    <div class="section-body">
      <table class="tbl">
        <tr><th>Method</th><th>పని (Purpose)</th><th>రిటర్న్ వాల్యూ (Return Value)</th></tr>
        <tr>
          <td><strong><code>forEach(callback)</code></strong></td>
          <td>అర్రేలోని ప్రతి ఎలిమెంట్ పై ఒక పనిని రన్ చేస్తుంది.</td>
          <td><code>undefined</code> (ఏ కొత్త అర్రే ని ఇవ్వదు)</td>
        </tr>
        <tr>
          <td><strong><code>map(callback)</code></strong></td>
          <td>ప్రతి ఎలిమెంట్ ని మోడిఫై చేసి <strong>కొత్త అర్రే ని క్రియేట్ చేస్తుంది.</strong></td>
          <td><strong>New Array</strong> (రూపాంతరం చెందిన అర్రే)</td>
        </tr>
      </table>
    </div>

    <div class="section-title"><span class="num">2</span>filter() & reduce()</div>
    <div class="section-body">
      <p>డేటాను ఫిల్టర్ చేయడానికి <code>filter()</code>, మరియు అర్రే మొత్తాన్ని ఒక్క వాల్యూ గా కుదించడానికి <code>reduce()</code> వాడతాం:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — Iteration Methods</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>"use strict";

let numbers = [10, 20, 30, 40, 50];

// 1. map(): ప్రతి సంఖ్యను రెట్టింపు (Double) చేయడం
let doubled = numbers.map(num => num * 2);
console.log("Doubled:", doubled); // [20, 40, 60, 80, 100]

// 2. filter(): 25 కంటే ఎక్కువ ఉన్న నంబర్లను ఎంచుకోవడం
let highNums = numbers.filter(num => num > 25);
console.log("High Numbers:", highNums); // [30, 40, 50]

// 3. reduce(): అన్ని సంఖ్యల మొత్తం (Total Sum) లెక్కించడం
// reduce(accumulator, current)
let totalSum = numbers.reduce((acc, curr) => acc + curr, 0);
console.log("Total Sum:", totalSum); // 150</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">3</span>find() & findIndex()</div>
    <div class="section-body">
      <p>అర్రే లోని ఒక నిర్దిష్టమైన ఎలిమెంట్ ని వెతకడానికి <code>find()</code> వాడతాం. ఇది కండిషన్ మ్యాచ్ అయిన <strong>మొదటి ఎలిమెంట్ ని మాత్రమే</strong> ఇస్తుంది.</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — find & findIndex</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>let users = [
    { id: 1, name: "Balaji" },
    { id: 2, name: "Suresh" },
    { id: 3, name: "Ramesh" }
];

let user = users.find(u => u.id === 2);
console.log("Found User:", user.name); // Suresh</code></pre>
      </div>
    </div>

    <div class="callout callout-warning">
      <div class="callout-title">⚠️ ప్రాక్టీస్ లో వచ్చే పొరపాట్లు (Common Mistakes)</div>
      <ul>
        <li><code>map()</code> లో <code>return</code> రాయడం మర్చిపోతే కొత్త అర్రే లో అన్ని <code>undefined</code> లు నిండుతాయి! Ex: <code>arr.map(x => { x * 2 })</code> లో <code>return</code> లేదు. <code>arr.map(x => x * 2)</code> అని రాయాలి.</li>
        <li><code>filter()</code> ఎప్పుడూ అర్రే ని రిటర్న్ చేస్తుంది. ఒకే ఒక వాల్యూ కావాలనుకుంటే <code>find()</code> వాడాలి.</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">4</span>Practice Questions & Answers</div>
    <div class="section-body">
      <details>
        <summary>Q1. <code>map()</code> కి <code>forEach()</code> కి ప్రధాన వ్యత్యాసం ఏమిటి?</summary>
        <div class="faq-ans">
          <p><strong>రిజల్ట్:</strong> <code>map()</code> ఒక కొత్త అర్రే ని రిటర్న్ చేస్తుంది, కానీ <code>forEach()</code> ఏమీ రిటర్న్ చేయదు (<code>undefined</code>).</p>
        </div>
      </details>

      <details>
        <summary>Q2. ఒక అర్రే లోని సరి సంఖ్యల (Even Numbers) మొత్తాన్ని ఎలా కనుగొనాలి?</summary>
        <div class="faq-ans">
          <p><strong>కోడ్:</strong> <code>arr.filter(x => x % 2 === 0).reduce((a, b) => a + b, 0)</code></p>
          <p><strong>వివరణ:</strong> ముందుగా <code>filter</code> తో సరిసంఖ్యలను వేరుచేసి, ఆ తర్వాత <code>reduce</code> తో మొత్తాన్ని కనుగొంటాం (Method Chaining!).</p>
        </div>
      </details>
    </div>

    <div class="intro-box" style="background: rgba(34, 197, 94, 0.1); border-color: rgba(34, 197, 94, 0.3); margin-top:30px;">
      <h3 style="color:#22c55e; margin-bottom:8px;">📌 Quick Summary:</h3>
      <ul style="margin-left: 20px; color: var(--text2);">
        <li>రూపాంతరం చేయాలంటే <code>map()</code>, ఫిల్టర్ చేయాలంటే <code>filter()</code> వాడండి.</li>
        <li>మొత్తం ఒకే వాల్యూ కావాలంటే <code>reduce()</code> వాడండి.</li>
        <li>ఒకే ఒక ఎలిమెంట్ కోసం <code>find()</code> వాడండి.</li>
      </ul>
    </div>
`;

p8Code = p8Code.replace(/const contentBody = `[\s\S]*?`;\s*const html = wrapJSLessonPage\(title, desc, filename, 11, subtopics, contentBody/, `const contentBody = \`${p8Lesson11Content}\`;\n  const html = wrapJSLessonPage(title, desc, filename, 11, subtopics, contentBody`);

fs.writeFileSync(phase8Path, p8Code, 'utf8');
console.log("Updated build_javascript_phase8.js successfully!");


// ==========================================
// 2. REWRITE PHASE 9 (Lesson 12: objects.html)
// ==========================================
console.log("Rewriting Phase 9 (build_javascript_phase9.js)...");

const phase9Path = path.join(scratchDir, 'build_javascript_phase9.js');
let p9Code = fs.readFileSync(phase9Path, 'utf8');

const p9Lesson12Content = `
    <div class="intro-box">
      <p>నిజ జీవితంలోని వస్తువులను (Real World Objects - ఉదాహరణకు ఒక ఫోన్, యూజర్ ప్రోఫైల్, కారు) వాటి వివరాలతో సహా కోడ్ లో దాచడానికి <strong>Objects</strong> వాడతాం. ఆబ్జెక్టులలో Key-Value జంటలుగా డేటా నిల్వ ఉంటుంది. ఈ చాప్టర్ లో Objects క్రియేషన్, Properties, Methods, <code>this</code> Keyword, మరియు ES6 Destructuring ల గురించి స్పష్టంగా నేర్చుకుందాం!</p>
    </div>

    <div class="callout">
      <div class="callout-title">🪪 రియల్ లైఫ్ అనలాజీ: స్టూడెంట్ ఐడి కార్డ్ (Student ID Card)</div>
      <p style="margin-top: 10px; color: var(--text2); font-size: 14.5px;">ఒక కాలేజ్ ఐడి కార్డ్ లో ఏముంటాయి?</p>
      <ul style="margin-top: 10px; color: var(--text2); font-size: 14.5px;">
        <li><strong>Key (లక్షణం):</strong> Name, RollNo, Age, Branch</li>
        <li><strong>Value (విలువ):</strong> "Balaji", 101, 20, "CSE"</li>
      </ul>
      <p style="margin-top: 10px; color: var(--text2); font-size: 14.5px;">ఈ ల్యాబుల్స్ మరియు వాల్యూస్ అన్నింటినీ కలిపి JavaScript లో <strong>Object "{...}"</strong> అంటాం!</p>
    </div>

    <div class="section-title"><span class="num">1</span>Object Creation & Property Access</div>
    <div class="section-body">
      <p>ఆబ్జెక్టులను Curly Braces <code>{...}</code> ఉపయోగించి తయారుచేస్తాం. వాల్యూస్ ని <code>.</code> (Dot Notation) లేదా <code>[...]</code> (Bracket Notation) ద్వారా యాక్సెస్ చేయవచ్చు.</p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — Object Basics</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>"use strict";

let student = {
    name: "Balaji",
    age: 21,
    branch: "CSE",
    isGraduated: false
};

// 1. Dot Notation ద్వారా యాక్సెస్
console.log("Student Name:", student.name); // Balaji

// 2. Bracket Notation ద్వారా యాక్సెస్ (వేరియబుల్స్ లో ఉన్న కీస్ కోసం ఇది అవసరం)
let key = "branch";
console.log("Branch:", student[key]); // CSE

// 3. Property ని అప్‌డేట్ చేయడం & కొత్తది చేర్చడం
student.age = 22;
student.city = "Hyderabad"; // కొత్త property చేరింది
console.log("Updated Student:", student);</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">2</span>Object Methods & 'this' Keyword</div>
    <div class="section-body">
      <p>ఆబ్జెక్ట్ లోపల ఫంక్షన్ ని నిర్వచించినప్పుడు దాన్ని <strong>Method</strong> అంటాం. ఆబ్జెక్ట్ లోని ఓన్ ప్రాపర్టీస్ ని వాడటానికి <code>this</code> కీవర్డ్ తో సూచిస్తాం.</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — Object Methods</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>let user = {
    firstName: "Nayak",
    lastName: "Codes",
    getFullName: function() {
        // this అంటే ఈ user ఆబ్జెక్ట్ ని సూచిస్తుంది
        return this.firstName + " " + this.lastName;
    }
};

console.log("Full Name:", user.getFullName()); // Nayak Codes</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">3</span>Useful Object Static Methods</div>
    <div class="section-body">
      <p>ఆబ్జెక్ట్ లోని Keys మరియు Values ని విడదీయడానికి JS కొన్ని ఉపయోగకరమైన ఫంక్షన్లను ఇస్తుంది:</p>

      <table class="tbl">
        <tr><th>Static Method</th><th>పని (Description)</th><th>రిజల్ట్ (Result)</th></tr>
        <tr><td><code>Object.keys(obj)</code></td><td>ఆబ్జెక్ట్ లోని అన్ని Keys (కీస్) ల అర్రే ని ఇస్తుంది.</td><td><code>["name", "age", "branch"]</code></td></tr>
        <tr><td><code>Object.values(obj)</code></td><td>ఆబ్జెక్ట్ లోని అన్ని Values ల అర్రే ని ఇస్తుంది.</td><td><code>["Balaji", 21, "CSE"]</code></td></tr>
        <tr><td><code>Object.entries(obj)</code></td><td>Key-Value జంటల 2D అర్రే ని ఇస్తుంది.</td><td><code>[["name","Balaji"], ...]</code></td></tr>
      </table>
    </div>

    <div class="section-title"><span class="num">4</span>ES6 Object Destructuring & Spread Operator</div>
    <div class="section-body">
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — Destructuring & Spread</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>"use strict";

let person = { name: "Ramesh", age: 25, city: "Vizag" };

// 1. Destructuring (సులభంగా వేరియబుల్స్ గా బయటకు తీయడం)
let { name, city } = person;
console.log(name, "from", city); // Ramesh from Vizag

// 2. Object Spread Operator (కాపీ చేయడం / కలపడం)
let updatedPerson = { ...person, role: "Admin", city: "Hyderabad" };
console.log("Updated Person:", updatedPerson);</code></pre>
      </div>
    </div>

    <div class="callout callout-warning">
      <div class="callout-title">⚠️ ప్రాక్టీస్ లో వచ్చే పొరపాట్లు (Common Mistakes)</div>
      <ul>
        <li>Arrow Functions <code>() => {}</code> లని Object Methods గా వాడితే <code>this</code> కీవర్డ్ ఆ ఆబ్జెక్ట్ ని పాయింట్ చేయదు (Global scope ని పాయింట్ చేస్తుంది)! కాబట్టి మల్టీ-లైన్ మెథడ్స్ కి మామూలు ఫంక్షన్లనే వాడాలి.</li>
        <li>లేని ప్రాపర్టీని ప్రింట్ చేస్తే <code>undefined</code> వస్తుంది. (Ex: <code>person.phone</code> -> <code>undefined</code>).</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">5</span>Practice Questions & Answers</div>
    <div class="section-body">
      <details>
        <summary>Q1. Dot Notation కి Bracket Notation కి ఉన్న ముఖ్యమైన వ్యత్యాసం ఏమిటి?</summary>
        <div class="faq-ans">
          <p><strong>రిజల్ట్:</strong> Key పేరు ఒక వేరియబుల్ లో ఉన్నప్పుడు (Ex: <code>let k = "age"</code>), లేదా Key లో స్పేస్ లు ఉన్నప్పుడు కేవలం Bracket Notation <code>obj[k]</code> మాత్రమే పనిచేస్తుంది.</p>
        </div>
      </details>

      <details>
        <summary>Q2. ఆబ్జెక్ట్ లోని ఒక Property ని పూర్తిగా తొలగించడం (Delete) ఎలా?</summary>
        <div class="faq-ans">
          <p><strong>కోడ్:</strong> <code>delete student.branch;</code></p>
        </div>
      </details>
    </div>

    <div class="intro-box" style="background: rgba(34, 197, 94, 0.1); border-color: rgba(34, 197, 94, 0.3); margin-top:30px;">
      <h3 style="color:#22c55e; margin-bottom:8px;">📌 Quick Summary:</h3>
      <ul style="margin-left: 20px; color: var(--text2);">
        <li>Objects key-value జంటలుగా ఉంటాయి.</li>
        <li>మెథడ్స్ లో <code>this</code> కీవర్డ్ ఆబ్జెక్ట్ ని సూచిస్తుంది.</li>
        <li>సులభంగా వేరియబుల్స్ క్రియేట్ చేయడానికి ES6 Destructuring వాడండి.</li>
      </ul>
    </div>
`;

p9Code = p9Code.replace(/const contentBody = `[\s\S]*?`;\s*const html = wrapJSLessonPage\(title, desc, filename, 12, subtopics, contentBody/, `const contentBody = \`${p9Lesson12Content}\`;\n  const html = wrapJSLessonPage(title, desc, filename, 12, subtopics, contentBody`);

fs.writeFileSync(phase9Path, p9Code, 'utf8');
console.log("Updated build_javascript_phase9.js successfully!");


// ==========================================
// 3. REWRITE PHASE 10 (Lesson 13: functions.html)
// ==========================================
console.log("Rewriting Phase 10 (build_javascript_phase10.js)...");

const phase10Path = path.join(scratchDir, 'build_javascript_phase10.js');
let p10Code = fs.readFileSync(phase10Path, 'utf8');

const p10Lesson13Content = `
    <div class="intro-box">
      <p>ప్రోగ్రామింగ్ లో మళ్ళీ మళ్ళీ వాడాల్సిన కోడ్ ముక్కలని (Reusable code) ఒకే చోట పెట్టి, కావలసినప్పుడు పిలుచుకోవడానికి (Call) <strong>Functions</strong> వాడతాం. DRY (Don't Repeat Yourself) సూత్రానికి ఫంక్షన్లే మూలస్తంభాలు! ఈ చాప్టర్ లో Function Declarations, Expressions, Arrow Functions, Default Parameters, మరియు Scope ల గురించి స్పష్టంగా నేర్చుకుందాం!</p>
    </div>

    <div class="callout">
      <div class="callout-title">🥤 రియల్ లైఫ్ అనలాజీ: జ్యూస్ మిక్సర్ మెషిన్ (Juicer Machine)</div>
      <p style="margin-top: 10px; color: var(--text2); font-size: 14.5px;">ఒక జ్యూస్ మిక్సర్ మెషిన్ ని ఊహించుకోండి:</p>
      <ul style="margin-top: 10px; color: var(--text2); font-size: 14.5px;">
        <li><strong>Parameters (ఇన్ పుట్):</strong> మీరు వేసే పండ్లు (మామిడి / అరటి).</li>
        <li><strong>Function Logic (పని):</strong> మెషిన్ తిరిగి జ్యూస్ చేసే ప్రాసెస్.</li>
        <li><strong>Return Value (అవుట్ పుట్):</strong> బయటకు వచ్చే రుచికరమైన జ్యూస్ గ్లాసు.</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">1</span>Function Declarations vs Function Expressions</div>
    <div class="section-body">
      <p>జావాస్క్రిప్ట్ లో ఫంక్షన్లు రాయడానికి రెండు ప్రధాన పద్ధతులు ఉన్నాయి:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — Function Declaration & Expression</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>// 1. Function Declaration (Hoisting కి సపోర్ట్ చేస్తుంది)
function greet(name) {
    return "నమస్తే " + name + "! Welcome to Our Compiler.";
}
console.log(greet("Balaji"));

// 2. Function Expression (వేరియబుల్ లో దాచడం)
const add = function(a, b) {
    return a + b;
};
console.log("Sum:", add(10, 20)); // 30</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">2</span>Modern ES6 Arrow Functions (=>)</div>
    <div class="section-body">
      <p>ES6 లో కోడ్ ని చాలా షార్ట్ గా, అందంగా రాయడానికి <strong>Arrow Functions</strong> వచ్చాయి. రియాక్ట్ (React.js) ప్రాజెక్టులలో 90% ఇవే వాడతారు!</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — Arrow Functions</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>"use strict";

// మామూలు ఫంక్షన్
// function square(x) { return x * x; }

// Arrow Function (ఒకే లైన్ లో ఉంటే return మరియు { } అవసరం లేదు!)
const square = x => x * x;
console.log("Square of 5:", square(5)); // 25

// మల్టీ లైన్ Arrow Function
const calculateBill = (price, tax) => {
    let total = price + (price * tax);
    return total;
};
console.log("Total Bill:", calculateBill(100, 0.18)); // 118</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">3</span>Default Parameters & Scope Basics</div>
    <div class="section-body">
      <p>యూజర్ ఇన్ పుట్ ఇవ్వకపోతే వాల్యూస్ దానంతటదే తీసుకోవడానికి <strong>Default Parameters</strong> వాడతాం. వేరియబుల్స్ ఎక్కడ పనిచేస్తాయో చెప్పడానికి <strong>Scope</strong> ఉపయోగపడుతుంది.</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — Default Parameters & Scope</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>// Default Parameter (role ఇవ్వకపోతే "Guest" తీసుకుంటుంది)
function welcomeUser(name, role = "Guest") {
    console.log("User:", name, "| Role:", role);
}
welcomeUser("Balaji", "Admin"); // User: Balaji | Role: Admin
welcomeUser("Suresh");         // User: Suresh | Role: Guest

// Scope ఉదాహరణ
let globalVar = "I am Global";

function testScope() {
    let localVar = "I am Local";
    console.log(globalVar); // పనిచేస్తుంది
    console.log(localVar);  // పనిచేస్తుంది
}
testScope();
// console.log(localVar); // ❌ ReferenceError! (ఫంక్షన్ బయట స్థానిక వేరియబుల్స్ పనిచేయవు)</code></pre>
      </div>
    </div>

    <div class="callout callout-warning">
      <div class="callout-title">⚠️ ప్రాక్టీస్ లో వచ్చే పొరపాట్లు (Common Mistakes)</div>
      <ul>
        <li>ఫంక్షన్ లో <code>return</code> రాయడం మర్చిపోవడం. <code>return</code> లేకపోతే ఫంక్షన్ ఎప్పుడూ <code>undefined</code> ని ఇస్తుంది!</li>
        <li>Arrow Function లో <code>{}</code> రాసినప్పుడు <code>return</code> కీవర్డ్ తప్పక రాయాలి. <code>const add = (a, b) => { a + b }</code> అని రాస్తే <code>undefined</code> ఇస్తుంది. <code>const add = (a, b) => a + b</code> అని రాయాలి.</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">4</span>Practice Questions & Answers</div>
    <div class="section-body">
      <details>
        <summary>Q1. Function Declaration కి Function Expression కి ప్రధాన తేడా ఏంటి?</summary>
        <div class="faq-ans">
          <p><strong>రిజల్ట్:</strong> Function Declarations కి Hoisting ఉంటుంది (అంటే ఫంక్షన్ నిర్వచించే ముందే దాన్ని కాల్ చేయవచ్చు). కానీ Function Expression ని నిర్వచించిన తర్వాతే కాల్ చేయగలము.</p>
        </div>
      </details>

      <details>
        <summary>Q2. ఫంక్షన్ ఎన్ని వాల్యూస్ ని రిటర్న్ చేయగలదు?</summary>
        <div class="faq-ans">
          <p><strong>రిజల్ట్:</strong> ఫంక్షన్ కేవలం ఒకే ఒక వాల్యూ ని రిటర్న్ చేయగలదు. కానీ ఒకే సారి చాలా వాల్యూస్ కావాలంటే Array <code>[a, b]</code> లేదా Object <code>{a, b}</code> గా మార్చి రిటర్న్ చేయవచ్చు!</p>
        </div>
      </details>
    </div>

    <div class="intro-box" style="background: rgba(34, 197, 94, 0.1); border-color: rgba(34, 197, 94, 0.3); margin-top:30px;">
      <h3 style="color:#22c55e; margin-bottom:8px;">📌 Quick Summary:</h3>
      <ul style="margin-left: 20px; color: var(--text2);">
        <li>కోడ్ రిపీటేషన్ ని అడ్డుకోవడానికి ఫంక్షన్లు వాడండి.</li>
        <li>ఆధునిక JavaScript లో Arrow Functions <code>=></code> వాడటం అలవాటు చేసుకోండి.</li>
        <li>ఫంక్షన్ నుండి అవుట్ పుట్ రావాలంటే <code>return</code> తప్పనిసరి.</li>
      </ul>
    </div>
`;

p10Code = p10Code.replace(/const contentBody = `[\s\S]*?`;\s*const html = wrapJSLessonPage\(title, desc, filename, 13, subtopics, contentBody/, `const contentBody = \`${p10Lesson13Content}\`;\n  const html = wrapJSLessonPage(title, desc, filename, 13, subtopics, contentBody`);

fs.writeFileSync(phase10Path, p10Code, 'utf8');
console.log("Updated build_javascript_phase10.js successfully!");
