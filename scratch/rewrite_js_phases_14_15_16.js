const fs = require('fs');
const path = require('path');

const scratchDir = __dirname;

// ==========================================
// 1. REWRITE PHASE 14 (Lesson 17: json-and-fetch-api.html)
// ==========================================
console.log("Rewriting Phase 14 (build_javascript_phase14.js)...");

const phase14Path = path.join(scratchDir, 'build_javascript_phase14.js');
let p14Code = fs.readFileSync(phase14Path, 'utf8');

const p14Lesson17Content = `
    <div class="intro-box">
      <p>సర్వర్ ల నుండి డేటాను పొందడానికి (Fetch Data from External APIs) మరియు క్లయింట్-సర్వర్ మధ్య డేటాని మార్పిడి చేసుకోవడానికి <strong>JSON (JavaScript Object Notation)</strong> మరియు <strong>Fetch API</strong> వాడతాం. వాతావరణ సమాచారం (Weather Data), బ్యాంక్ వివరాలు, లేదా ఇ-కామర్స్ ప్రొడక్ట్స్ డిస్ప్లే చేయడానికి ఇవే కీలకం! ఈ చాప్టర్ లో JSON Rules, HTTP Methods, Fetch API, మరియు async/await లతో API Integration క్లియర్ గా నేర్చుకుందాం!</p>
    </div>

    <div class="callout">
      <div class="callout-title">🍽️ రియల్ లైఫ్ అనలాజీ: హోటల్ వెయిటర్ (Hotel Waiter & Kitchen)</div>
      <p style="margin-top: 10px; color: var(--text2); font-size: 14.5px;">మీరు ఒక రెస్టారెంట్ కి వెళ్ళారు:</p>
      <ul style="margin-top: 10px; color: var(--text2); font-size: 14.5px;">
        <li><strong>Client (మీరు):</strong> ఆర్డర్ ఇవ్వాలనుకుంటున్న యూజర్ / బ్రౌజర్.</li>
        <li><strong>Server (కిచెన్):</strong> ఆహారం (డేటా) సిద్ధంగా ఉన్న సర్వర్.</li>
        <li><strong>API (వెయిటర్):</strong> మీ ఆర్డర్ ని కిచెన్ కి తీసుకెళ్ళి, తయారైన వంటకాన్ని (JSON Response) మీ టేబుల్ కి తెచ్చిచ్చే మధ్యవర్తి!</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">1</span>JSON Rules & Parsing Methods</div>
    <div class="section-body">
      <p>JSON అనేది లైట్-వెయిట్ డేటా ఫార్మాట్. ఇందులో Keys ని విధిగా <strong>Double Quotes <code>"key"</code></strong> లోనే రాయాలి.</p>

      <table class="tbl">
        <tr><th>JSON Function</th><th>పని (Purpose)</th><th>ఉదాహరణ (Example)</th></tr>
        <tr><td><code>JSON.stringify(obj)</code></td><td>JavaScript Object ని JSON Text String గా మారుస్తుంది</td><td><code>JSON.stringify({ a: 1 })</code> -> <code>'{"a":1}'</code></td></tr>
        <tr><td><code>JSON.parse(jsonStr)</code></td><td>JSON Text String ని తిరిగి JavaScript Object గా మారుస్తుంది</td><td><code>JSON.parse('{"a":1}')</code> -> <code>{ a: 1 }</code></td></tr>
      </table>
    </div>

    <div class="section-title"><span class="num">2</span>Fetching API Data with async/await</div>
    <div class="section-body">
      <p>ఆధునిక JavaScript లో API నుండి డేటా తెచ్చుకోవడానికి <code>fetch()</code> తో పాటు <code>async/await</code> వాడతాం:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — Fetch API Integration</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>// 1. API నుండి డేటా తెచ్చే అసింక్ ఫంక్షన్
async function fetchUserData() {
    try {
        console.log("⏳ Loading User Data...");
        let response = await fetch("https://jsonplaceholder.typicode.com/users/1");
        
        // HTTP సంకేతం సరిగ్గా ఉందో లేదో తనిఖీ చేయడం
        if (!response.ok) {
            throw new Error("HTTP Error Status: " + response.status);
        }

        let user = await response.json(); // JSON ని Object గా మార్చడం
        console.log("✅ User Loaded:", user.name);
        console.log("📧 Email:", user.email);
        console.log("🏙️ City:", user.address.city);
    } catch (error) {
        console.log("❌ Error Fetching Data:", error.message);
    }
}

fetchUserData();</code></pre>
      </div>
    </div>

    <div class="callout callout-warning">
      <div class="callout-title">⚠️ ప్రాక్టీస్ లో వచ్చే పొరపాట్లు (Common Mistakes)</div>
      <ul>
        <li><code>response.json()</code> కి ముందు <code>await</code> రాయడం మర్చిపోవడం. <code>let data = response.json();</code> అని రాస్తే అది డేటా కి బదులు ఒక తులసి ప్లాంట్ లాంటి విఫలమైన Promise ని ఇస్తుంది. <code>await response.json()</code> అని రాయాలి.</li>
        <li><code>fetch()</code> కి HTTP 404 (Not Found) లేదా 500 (Server Error) వచ్చినా నాచురల్ గా Promise Reject అవ్వదు! <code>response.ok === false</code> ని మ్యాన్యువల్ గా చెక్ చేయాలి.</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">3</span>Practice Questions & Answers</div>
    <div class="section-body">
      <details>
        <summary>Q1. HTTP GET మరియు POST ల తేడా ఏమిటి?</summary>
        <div class="faq-ans">
          <p><strong>రిజల్ట్:</strong> <code>GET</code> సర్వర్ నుండి డేటాను చదవడానికి (Read Data) వాడతాం. <code>POST</code> కొత్త డేటాను సర్వర్ కి పంపడానికి (Create Data) వాడతాం.</p>
        </div>
      </details>

      <details>
        <summary>Q2. <code>JSON.parse()</code> లో చెల్లని JSON ఇస్తే ఏమవుతుంది?</summary>
        <div class="faq-ans">
          <p><strong>రిజల్ట్:</strong> <code>SyntaxError</code> వస్తుంది. కాబట్టి <code>JSON.parse()</code> ని ఎప్పుడూ <code>try...catch</code> లోపల వాడటం మంచిది.</p>
        </div>
      </details>
    </div>

    <div class="intro-box" style="background: rgba(34, 197, 94, 0.1); border-color: rgba(34, 197, 94, 0.3); margin-top:30px;">
      <h3 style="color:#22c55e; margin-bottom:8px;">📌 Quick Summary:</h3>
      <ul style="margin-left: 20px; color: var(--text2);">
        <li>డేటా మార్పిడికి JSON వాడతాం (<code>stringify</code> / <code>parse</code>).</li>
        <li>API Requests కోసం <code>fetch()</code> తో <code>async/await</code> వాడండి.</li>
        <li>Errors ని క్యాచ్ చేయడానికి <code>try...catch</code> ఉపయోగించండి.</li>
      </ul>
    </div>
`;

p14Code = p14Code.replace(/const contentBody = `[\s\S]*?`;\s*const html = wrapJSLessonPage\(title, desc, filename, 17, subtopics, contentBody/, `const contentBody = \`${p14Lesson17Content}\`;\n  const html = wrapJSLessonPage(title, desc, filename, 17, subtopics, contentBody`);

fs.writeFileSync(phase14Path, p14Code, 'utf8');
console.log("Updated build_javascript_phase14.js successfully!");


// ==========================================
// 2. REWRITE PHASE 15 (Lesson 18: promises.html)
// ==========================================
console.log("Rewriting Phase 15 (build_javascript_phase15.js)...");

const phase15Path = path.join(scratchDir, 'build_javascript_phase15.js');
let p15Code = fs.readFileSync(phase15Path, 'utf8');

const p15Lesson18Content = `
    <div class="intro-box">
      <p>డేటాబేస్ నుండి డేటా రావడం, ఫైల్స్ అప్‌లోడ్ అవ్వడం లాంటి సమయం పట్టే పనులను వెబ్‌సైట్ స్లో అవ్వకుండా (Non-blocking) వెనుక భాగంలో జరపడానికి <strong>Asynchronous JavaScript</strong> వాడతాం. ఈ చాప్టర్ లో Callbacks, Promises, Promise States (<code>Pending</code>, <code>Fulfilled</code>, <code>Rejected</code>), మరియు Modern <code>async/await</code> ల గురించి లోతుగా నేర్చుకుందాం!</p>
    </div>

    <div class="callout">
      <div class="callout-title">☕ రియల్ లైఫ్ అనలాజీ: స్టార్ బక్స్ కాఫీ ఆర్డర్ (Starbucks Token)</div>
      <p style="margin-top: 10px; color: var(--text2); font-size: 14.5px;">మీరు స్టార్ బక్స్ లో కాఫీ ఆర్డర్ చేశారు:</p>
      <ul style="margin-top: 10px; color: var(--text2); font-size: 14.5px;">
        <li><strong>Promise Given (టోకెన్ వచ్చింది):</strong> కాఫీ ఇస్తానని కౌంటర్ వ్యక్తి మీకు ఒక మాట ఇచ్చాడు (Promise created).</li>
        <li><strong>Pending State:</strong> కాఫీ ఇంకా మెషిన్ లో తయారవుతోంది.</li>
        <li><strong>Fulfilled / Resolved:</strong> కాఫీ రెడీ అయి మీ చేతికి వచ్చింది (<code>.then()</code> రన్ అవుతుంది).</li>
        <li><strong>Rejected:</strong> పాలు అయిపోయి కాఫీ ఇవ్వలేమని చెప్పారు (<code>.catch()</code> రన్ అవుతుంది).</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">1</span>Creating & Consuming Promises</div>
    <div class="section-body">
      <p>జావాస్క్రిప్ట్ లో Promise ని <code>new Promise((resolve, reject) => {})</code> ద్వారా తయారుచేస్తాం:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — Promise Creation & Handling</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>"use strict";

// 1. Promise తయారు చేయడం
const makeCoffee = new Promise((resolve, reject) => {
    let milkAvailable = true;

    setTimeout(() => {
        if (milkAvailable) {
            resolve("☕ మీ రుచికరమైన కాఫీ రెడీ!");
        } else {
            reject("❌ పాలు అయిపోయాయి, కాఫీ చేయలేము.");
        }
    }, 2000);
});

// 2. Promise ని హ్యాండిల్ చేయడం (.then / .catch)
console.log("కాఫీ ఆర్డర్ చేసాము...");

makeCoffee
    .then(result => {
        console.log("Success:", result);
    })
    .catch(error => {
        console.log("Failure:", error);
    })
    .finally(() => {
        console.log("🏁 ప్రాసెస్ పూర్తయింది.");
    });</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">2</span>Modern async / await Syntax</div>
    <div class="section-body">
      <p><code>.then()</code> లతో కోడ్ గందరగోళంగా మారకుండా (Callback Hell ను నివారించడానికి), Async కోడ్ ని కూడా సింక్రోనస్ కోడ్ లాగా క్లీన్ గా రాయడానికి ES2017 లో <strong><code>async/await</code></strong> వచ్చాయి.</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — Clean async/await</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>// async ఫంక్షన్ ని నిర్వచించడం
async function getCoffeeOrder() {
    try {
        console.log("ఆర్డర్ ప్రాసెస్ అవుతోంది...");
        let msg = await makeCoffee; // Promise అయ్యేవరకు ఇక్కడ ఆగుతుంది
        console.log("కాఫీ వచ్చింది:", msg);
    } catch (err) {
        console.log("Error:", err);
    }
}

getCoffeeOrder();</code></pre>
      </div>
    </div>

    <div class="callout callout-warning">
      <div class="callout-title">⚠️ ప్రాక్టీస్ లో వచ్చే పొరపాట్లు (Common Mistakes)</div>
      <ul>
        <li><code>await</code> కీవర్డ్ ని కేవలం <code>async</code> అని మార్క్ చేసిన ఫంక్షన్ల లోపల మాత్రమే వాడాలి. సాధారణ ఫంక్షన్లలో వాడితే <code>SyntaxError</code> వస్తుంది.</li>
        <li><code>await Promise.all([p1, p2])</code> ని వాడటం ద్వారా ఒకేసారి చాలా Promises ని సమాంతరంగా (Parallel execution) ప్రాసెస్ చేయవచ్చు.</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">3</span>Practice Questions & Answers</div>
    <div class="section-body">
      <details>
        <summary>Q1. Promise కి ఉన్న 3 స్థితులు (States) ఏమిటి?</summary>
        <div class="faq-ans">
          <p><strong>రిజల్ట్:</strong> 1. <code>Pending</code> (ఇంకా ప్రాసెస్ అవుతోంది), 2. <code>Fulfilled</code> (విజయం సాధించింది), 3. <code>Rejected</code> (విఫలమైంది).</p>
        </div>
      </details>

      <details>
        <summary>Q2. <code>Promise.all()</code> ఎప్పుడు ఫెయిల్ అవుతుంది?</summary>
        <div class="faq-ans">
          <p><strong>రిజల్ట్:</strong> అందులోని ఏ ఒక్క Promise రిజెక్ట్ (Reject) అయినా <code>Promise.all()</code> మొత్తం రిజెక్ట్ అయిపోతుంది.</p>
        </div>
      </details>
    </div>

    <div class="intro-box" style="background: rgba(34, 197, 94, 0.1); border-color: rgba(34, 197, 94, 0.3); margin-top:30px;">
      <h3 style="color:#22c55e; margin-bottom:8px;">📌 Quick Summary:</h3>
      <ul style="margin-left: 20px; color: var(--text2);">
        <li>Asynchronous పనుల కోసం Promises వాడండి.</li>
        <li>కోడ్ ని సులభంగా ఉంచడానికి <code>async/await</code> వాడండి.</li>
        <li>ఎర్రర్స్ ని క్యాచ్ చేయడానికి <code>try...catch</code> వాడండి.</li>
      </ul>
    </div>
`;

p15Code = p15Code.replace(/const contentBody = `[\s\S]*?`;\s*const html = wrapJSLessonPage\(title, desc, filename, 18, subtopics, contentBody/, `const contentBody = \`${p15Lesson18Content}\`;\n  const html = wrapJSLessonPage(title, desc, filename, 18, subtopics, contentBody`);

fs.writeFileSync(phase15Path, p15Code, 'utf8');
console.log("Updated build_javascript_phase15.js successfully!");


// ==========================================
// 3. REWRITE PHASE 16 (Lesson 19: oop.html)
// ==========================================
console.log("Rewriting Phase 16 (build_javascript_phase16.js)...");

const phase16Path = path.join(scratchDir, 'build_javascript_phase16.js');
let p16Code = fs.readFileSync(phase16Path, 'utf8');

const p16Lesson19Content = `
    <div class="intro-box">
      <p>ప్రోగ్రామింగ్ ని వాస్తవ ప్రపంచ ఆబ్జెక్టులు మరియు వాటి బ్లూప్రింట్లు (Classes) గా డిజైన్ చేయడానికి <strong>Object-Oriented Programming (OOP)</strong> వాడతాం. పెద్ద పెద్ద అప్లికేషన్లు మరియు ఎంటర్ ప్రైజ్ సాఫ్ట్‌వేర్ రాసేటప్పుడు OOP సూత్రాలు అత్యంత అవసరం! ఈ చాప్టర్ లో ES6 Classes, Constructors, Inheritance (<code>extends</code>), మరియు Private Fields (<code>#</code>) ల గురించి క్లియర్ గా నేర్చుకుందాం!</p>
    </div>

    <div class="callout">
      <div class="callout-title">🏗️ రియల్ లైఫ్ అనలాజీ: ఇల్లు నిర్మాణ ప్లాన్ (Building Blueprint vs Houses)</div>
      <p style="margin-top: 10px; color: var(--text2); font-size: 14.5px;">ఒక ఆర్కిటెక్ట్ ఇల్లు కట్టడానికి ఒక ప్లాన్ గీసాడు:</p>
      <ul style="margin-top: 10px; color: var(--text2); font-size: 14.5px;">
        <li><strong>Class (బ్లూప్రింట్ ప్లాన్):</strong> ఇల్లు ఎలా ఉండాలో (గదులు, తలుపులు, రంగులు) చెప్పే కాగితం ప్లాన్. దానికి సొంతంగా ఉనికి ఉండదు.</li>
        <li><strong>Object / Instance (నిజమైన ఇల్లు):</strong> ఆ ప్లాన్ ని చూసి కట్టిన అసలైన ఇల్లు! ఒకే ప్లాన్ (Class) నుండి ఎన్ని ఇళ్ళు (Objects) అయినా కట్టవచ్చు.</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">1</span>ES6 Class Syntax & Constructor</div>
    <div class="section-body">
      <p>ES6 లో <code>class</code> కీవర్డ్ ద్వారా తరగతులను (Classes) నిర్వచిస్తాం. కొత్త ఆబ్జెక్ట్ సృష్టించినప్పుడు <code>constructor()</code> ఆటోమేటిక్ గా రన్ అవుతుంది.</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — ES6 Class & Methods</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>"use strict";

class BankAccount {
    // Constructor: ఆబ్జెక్ట్ సృష్టించేటప్పుడు ప్రారభ విలువలను ఇస్తుంది
    constructor(accountHolder, balance) {
        this.accountHolder = accountHolder;
        this.balance = balance;
    }

    // Method: డబ్బు జమ చేయడం
    deposit(amount) {
        this.balance += amount;
        console.log("✅ ₹" + amount + " జమ అయింది. ప్రస్తుత నిల్వ: ₹" + this.balance);
    }

    // Method: డబ్బులు తీయడం
    withdraw(amount) {
        if (amount > this.balance) {
            console.log("❌ ఖాతాలో తగినంత నిల్వ లేదు!");
        } else {
            this.balance -= amount;
            console.log("✅ ₹" + amount + " తీసేశారు. మిగిలిన నిల్వ: ₹" + this.balance);
        }
    }
}

// 1. Class నుండి Object ని సృష్టించడం (new keyword వాడాలి)
let myAcc = new BankAccount("Balaji", 1000);
myAcc.deposit(500);  // ₹500 జమ అయింది (మొత్తం ₹1500)
myAcc.withdraw(200); // ₹200 తీసేశారు (మిగిలినవి ₹1300)</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">2</span>Inheritance (extends & super)</div>
    <div class="section-body">
      <p>ఒక పాత Class లోని లక్షణాలను కొత్త Class లోకి వారసత్వంగా (Inheritance) తెచ్చుకోవడానికి <strong><code>extends</code></strong> మరియు <strong><code>super()</code></strong> వాడతాం.</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — Class Inheritance</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>// Parent Class (తండ్రి తరగతి)
class Person {
    constructor(name) {
        this.name = name;
    }
    greet() {
        console.log("నమస్తే, నా పేరు " + this.name);
    }
}

// Child Class (పిల్లల తరగతి - Inheritance)
class Student extends Person {
    constructor(name, course) {
        super(name); // Parent class constructor ని పిలుస్తుంది
        this.course = course;
    }

    study() {
        console.log(this.name + " " + this.course + " చదువుతున్నారు 📚");
    }
}

let s1 = new Student("Suresh", "B.Tech");
s1.greet(); // Parent class method పనిచేస్తుంది!
s1.study(); // Child class method పనిచేస్తుంది!</code></pre>
      </div>
    </div>

    <div class="callout callout-warning">
      <div class="callout-title">⚠️ ప్రాక్టీస్ లో వచ్చే పొరపాట్లు (Common Mistakes)</div>
      <ul>
        <li>Class నుండి Object ని క్రియేట్ చేసేటప్పుడు <code>new</code> కీవర్డ్ రాయడం మర్చిపోవడం (Ex: <code>let a = BankAccount()</code> ❌ -> <code>let a = new BankAccount()</code> ✅).</li>
        <li>Child class constructor లో <code>this</code> ని వాడే ముందు విధిగా <code>super()</code> ని పిలవాలి! లేకపోతే <code>ReferenceError</code> వస్తుంది.</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">3</span>Practice Questions & Answers</div>
    <div class="section-body">
      <details>
        <summary>Q1. Class లో Private Fields ని ఎలా క్రియేట్ చేయాలి?</summary>
        <div class="faq-ans">
          <p><strong>రిజల్ట్:</strong> Variable పేరు ముందు <strong><code>#</code></strong> వాడాలి (Ex: <code>#balance = 0;</code>). వీటిని ఆ క్లాస్ బయట నుండి యాక్సెస్ చేయలేము (Encapsulation!).</p>
        </div>
      </details>

      <details>
        <summary>Q2. <code>super()</code> కీవర్డ్ దేనికి ఉపయోగపడుతుంది?</summary>
        <div class="faq-ans">
          <p><strong>రిజల్ట్:</strong> Child class నుండి Parent class constructor ని మరియు దాని మెథడ్స్ ని పిలవడానికి <code>super()</code> ఉపయోగపడుతుంది.</p>
        </div>
      </details>
    </div>

    <div class="intro-box" style="background: rgba(34, 197, 94, 0.1); border-color: rgba(34, 197, 94, 0.3); margin-top:30px;">
      <h3 style="color:#22c55e; margin-bottom:8px;">📌 Quick Summary:</h3>
      <ul style="margin-left: 20px; color: var(--text2);">
        <li>బ్లూప్రింట్ ల కోసం <code>class</code>, సృష్టించడానికి <code>new</code> వాడండి.</li>
        <li>వారసత్వానికి <code>extends</code> మరియు <code>super()</code> వాడండి.</li>
        <li>సెక్యూరిటీ కోసం <code>#private</code> ఫీల్డ్స్ ని ఉపయోగించండి.</li>
      </ul>
    </div>
`;

p16Code = p16Code.replace(/const contentBody = `[\s\S]*?`;\s*const html = wrapJSLessonPage\(title, desc, filename, 19, subtopics, contentBody/, `const contentBody = \`${p16Lesson19Content}\`;\n  const html = wrapJSLessonPage(title, desc, filename, 19, subtopics, contentBody`);

fs.writeFileSync(phase16Path, p16Code, 'utf8');
console.log("Updated build_javascript_phase16.js successfully!");
