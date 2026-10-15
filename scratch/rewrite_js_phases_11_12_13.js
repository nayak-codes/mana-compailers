const fs = require('fs');
const path = require('path');

const scratchDir = __dirname;

// ==========================================
// 1. REWRITE PHASE 11 (Lesson 14: dom.html)
// ==========================================
console.log("Rewriting Phase 11 (build_javascript_phase11.js)...");

const phase11Path = path.join(scratchDir, 'build_javascript_phase11.js');
let p11Code = fs.readFileSync(phase11Path, 'utf8');

const p11Lesson14Content = `
    <div class="intro-box">
      <p>HTML పేజీలోని ఎలిమెంట్స్ ని (Headings, Buttons, Images, Divs) JavaScript ఉపయోగించి డైనమిక్ గా మార్చడానికి <strong>DOM (Document Object Model)</strong> వాడతాం. వెబ్ సైట్ లో బటన్ కొట్టగానే రంగు మారడం, కొత్త మెసేజ్ రావడానికి DOM మేనిప్యులేషన్ అత్యంత అవసరం. ఈ చాప్టర్ లో Element Selection, Content Modification, Dynamic Style Changes, మరియు New Elements Creation ల గురించి క్లియర్ గా నేర్చుకుందాం!</p>
    </div>

    <div class="callout">
      <div class="callout-title">🧠 రియల్ లైఫ్ అనలాజీ: మన శరీరంలో నాడీ వ్యవస్థ (Nervous System)</div>
      <p style="margin-top: 10px; color: var(--text2); font-size: 14.5px;">వెబ్ పేజీకి:</p>
      <ul style="margin-top: 10px; color: var(--text2); font-size: 14.5px;">
        <li><strong>HTML:</strong> అస్థిపంజరం (Skeleton structure)</li>
        <li><strong>CSS:</strong> చర్మం మరియు దుస్తులు (Design & Clothes)</li>
        <li><strong>JavaScript (via DOM):</strong> నాడీ వ్యవస్థ. మెదడు చెప్పినట్లు చేతులు, కాళ్ళు ఎలా కదులుతాయో, JS ద్వారా HTML ఎలిమెంట్స్ ని అలా కదపవచ్చు!</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">1</span>Selecting DOM Elements</div>
    <div class="section-body">
      <p>HTML ఎలిమెంట్స్ ని JavaScript లోకి తీసుకోవడానికి ప్రధానంగా <strong><code>querySelector()</code></strong> మరియు <strong><code>querySelectorAll()</code></strong> వాడతాం:</p>
      
      <table class="tbl">
        <tr><th>Selection Method</th><th>వివరణ (Description)</th><th>ఉదాహరణ (Example)</th></tr>
        <tr><td><code>document.getElementById("id")</code></td><td>ID ఆధారంగా ఒకే ఎలిమెంట్ ని ఎంచుకుంటుంది</td><td><code>document.getElementById("mainTitle")</code></td></tr>
        <tr><td><code>document.querySelector("css")</code></td><td>CSS Selector (.class, #id, tag) ద్వారా <strong>మొదటి</strong> ఎలిమెంట్ ని ఎంచుకుంటుంది</td><td><code>document.querySelector(".btn-submit")</code></td></tr>
        <tr><td><code>document.querySelectorAll("css")</code></td><td>CSS Selector కి మ్యాచ్ అయ్యే <strong>అన్ని ఎలిమెంట్స్ ని (NodeList)</strong> ఎంచుకుంటుంది</td><td><code>document.querySelectorAll(".card")</code></td></tr>
      </table>
    </div>

    <div class="section-title"><span class="num">2</span>Modifying Text, HTML & Styles</div>
    <div class="section-body">
      <p>ఎలిమెంట్ దొరికిన తర్వాత దాని లోపలి టెక్స్ట్ ని లేదా CSS ని సులభంగా మార్చవచ్చు:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — DOM Modification</span>
        </div>
        <pre><code>// 1. Text & HTML మార్చడం
let heading = document.querySelector("#title");
heading.textContent = "నమస్తే వెబ్‌సైట్!"; // కేవలం టెక్స్ట్ ని మారుస్తుంది
heading.innerHTML = "నమస్తే &lt;span style='color:yellow;'&gt;వెబ్‌సైట్!&lt;/span&gt;"; // HTML ట్యాగ్స్ తో మారుస్తుంది

// 2. CSS Styles మార్చడం (camelCase వాడాలి)
let box = document.querySelector(".box");
box.style.backgroundColor = "blue";
box.style.padding = "20px";
box.style.borderRadius = "10px";

// 3. Class List మేనిప్యులేషన్ (అత్యంత సిఫార్సు చేయబడిన పద్ధతి)
box.classList.add("active");
box.classList.remove("hidden");
box.classList.toggle("dark-mode"); // ఉంటే తీసివేస్తుంది, లేకపోతే చేరుస్తుంది</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">3</span>Creating & Appending New Elements</div>
    <div class="section-body">
      <p>డైనమిక్ గా కొత్త HTML ఎలిమెంట్స్ ని క్రియేట్ చేసి పేజీలో అమర్చడం:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — Create & Append Elements</span>
        </div>
        <pre><code>// 1. కొత్త &lt;li&gt; ఎలిమెంట్ ని క్రియేట్ చేయడం
let newItem = document.createElement("li");
newItem.textContent = "కొత్త టాస్క్ 📝";
newItem.classList.add("task-item");

// 2. పేజీలోని &lt;ul&gt; కి జోడించడం
let todoList = document.querySelector("#todoList");
todoList.appendChild(newItem);

// 3. ఒక ఎలిమెంట్ ని తొలగించడం
// newItem.remove();</code></pre>
      </div>
    </div>

    <div class="callout callout-warning">
      <div class="callout-title">⚠️ ప్రాక్టీస్ లో వచ్చే పొరపాట్లు (Common Mistakes)</div>
      <ul>
        <li><code>textContent</code> కి బదులు <code>innerHTML</code> ని యూజర్ ఇన్ పుట్ తో వాడటం వల్ల XSS (Cross Site Scripting) హెకింగ్ కి గురయ్యే ప్రమాదం ఉంది. కేవలం టెక్స్ట్ కి <code>textContent</code> నే వాడాలి.</li>
        <li>JS లో CSS ప్రాపర్టీస్ camelCase లో ఉంటాయి (Ex: <code>background-color</code> కి బదులు <code>backgroundColor</code> రాయాలి).</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">4</span>Practice Questions & Answers</div>
    <div class="section-body">
      <details>
        <summary>Q1. <code>querySelector()</code> మరియు <code>querySelectorAll()</code> ల తేడా ఏంటి?</summary>
        <div class="faq-ans">
          <p><strong>రిజల్ట్:</strong> <code>querySelector()</code> మ్యాచ్ అయ్యే మొదటి ఎలిమెంట్ ని మాత్రమే ఇస్తుంది. <code>querySelectorAll()</code> మ్యాచ్ అయ్యే అన్ని ఎలిమెంట్స్ ల NodeList (అర్రే లాంటి నిర్మాణం) ని ఇస్తుంది.</p>
        </div>
      </details>

      <details>
        <summary>Q2. ఒక Element కి Class ఉందో లేదో చెక్ చేయడం ఎలా?</summary>
        <div class="faq-ans">
          <p><strong>కోడ్:</strong> <code>element.classList.contains("active")</code> (ఇది <code>true/false</code> ఇస్తుంది).</p>
        </div>
      </details>
    </div>

    <div class="intro-box" style="background: rgba(34, 197, 94, 0.1); border-color: rgba(34, 197, 94, 0.3); margin-top:30px;">
      <h3 style="color:#22c55e; margin-bottom:8px;">📌 Quick Summary:</h3>
      <ul style="margin-left: 20px; color: var(--text2);">
        <li>ఎలిమెంట్స్ ని ఎంచుకోవడానికి <code>querySelector()</code> వాడండి.</li>
        <li>Classes ని మేనేజ్ చేయడానికి <code>classList.add/remove/toggle</code> వాడండి.</li>
        <li>కొత్త ఎలిమెంట్స్ క్రియేట్ చేయడానికి <code>document.createElement()</code> వాడండి.</li>
      </ul>
    </div>
`;

p11Code = p11Code.replace(/const contentBody = `[\s\S]*?`;\s*const html = wrapJSLessonPage\(title, desc, filename, 14, subtopics, contentBody/, `const contentBody = \`${p11Lesson14Content}\`;\n  const html = wrapJSLessonPage(title, desc, filename, 14, subtopics, contentBody`);

fs.writeFileSync(phase11Path, p11Code, 'utf8');
console.log("Updated build_javascript_phase11.js successfully!");


// ==========================================
// 2. REWRITE PHASE 12 (Lesson 15: events-and-forms.html)
// ==========================================
console.log("Rewriting Phase 12 (build_javascript_phase12.js)...");

const phase12Path = path.join(scratchDir, 'build_javascript_phase12.js');
let p12Code = fs.readFileSync(phase12Path, 'utf8');

const p12Lesson15Content = `
    <div class="intro-box">
      <p>వెబ్‌సైట్ లో యూజర్ జరిపే చర్యలపై (User Actions — బటన్ క్లిక్ చేయడం, కీబోర్డ్ టైప్ చేయడం, ఫారం సబ్మిట్ చేయడం) స్పందించడానికి <strong>Events & Event Listeners</strong> వాడతాం. ఈ చాప్టర్ లో <code>addEventListener</code>, Event Object (<code>e.target</code>), ఫారమ్స్ సబ్మిషన్ మరియు <code>preventDefault()</code> ల గురించి స్పష్టంగా నేర్చుకుందాం!</p>
    </div>

    <div class="callout">
      <div class="callout-title">🔔 రియల్ లైఫ్ అనలాజీ: ఇంటి కాలింగ్ బెల్ (Calling Bell)</div>
      <p style="margin-top: 10px; color: var(--text2); font-size: 14.5px;">మీ ఇంటి ముందు ఒక కాలింగ్ బెల్ ఉంది:</p>
      <ul style="margin-top: 10px; color: var(--text2); font-size: 14.5px;">
        <li><strong>Event (చర్య):</strong> విజిటర్ బెల్ బటన్ ప్రెస్ చేయడం (Click Event).</li>
        <li><strong>Event Listener (చెవి రంధ్రం):</strong> బెల్ శబ్దం కోసం ఎదురుచూడటం.</li>
        <li><strong>Event Handler (స్పందన):</strong> బెల్ మోగగానే మీరు వెళ్ళి తలుపు తీయడం (Callback Function).</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">1</span>addEventListener Syntax & Common Events</div>
    <div class="section-body">
      <p>ఎలిమెంట్ కి ఈవెంట్ ని లింక్ చేయడానికి <strong><code>addEventListener("event", callback)</code></strong> వాడతాం:</p>

      <table class="tbl">
        <tr><th>Event Name</th><th>ఎప్పుడు జరుగుతుంది (Trigger)</th><th>ఉదాహరణ వాడకం</th></tr>
        <tr><td><code>click</code></td><td>యూజర్ ఎలిమెంట్ పై క్లిక్ చేసినప్పుడు</td><td>బటన్ క్లిక్, లింక్ క్లిక్</td></tr>
        <tr><td><code>submit</code></td><td>ఫారమ్ ని సబ్మిట్ చేసినప్పుడు</td><td>Login / Register Forms</td></tr>
        <tr><td><code>input</code></td><td>ఇన్ పుట్ ఫీల్డ్ లో టైప్ చేస్తున్న ప్రతిసారీ</td><td>Search suggestions, Live character count</td></tr>
        <tr><td><code>change</code></td><td>Dropdown లేదా Radio లో వాల్యూ మారినప్పుడు</td><td>Select country dropdown</td></tr>
        <tr><td><code>keydown</code></td><td>కీబోర్డ్ లో కీ నొక్కినప్పుడు</td><td>Enter ప్రెస్ చేసి మెసేజ్ పంపడం</td></tr>
      </table>
    </div>

    <div class="section-title"><span class="num">2</span>Event Object & Form Handling (e.preventDefault)</div>
    <div class="section-body">
      <p>ఫారమ్ సబ్మిట్ చేసినప్పుడు బ్రౌజర్ పేజీ రిఫ్రెష్ అయిపోతుంది. దాన్ని అడ్డుకోవడానికి <strong><code>e.preventDefault()</code></strong> వాడతాం.</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — Event Listener & Form Submit</span>
        </div>
        <pre><code>// HTML Elements: &lt;form id="loginForm"&gt;, &lt;input id="username"&gt;

let form = document.querySelector("#loginForm");
let usernameInput = document.querySelector("#username");

form.addEventListener("submit", function(e) {
    // 1. పేజీ రిఫ్రెష్ అవ్వకుండా అడ్డుకోవడం
    e.preventDefault();

    // 2. యూజర్ ఎంటర్ చేసిన టెక్స్ట్ ని పొందడం
    let name = usernameInput.value.trim();

    if (name === "") {
        alert("దయచేసి పేరు ఎంటర్ చేయండి!");
    } else {
        alert("నమస్తే " + name + "! Login successful 🎉");
    }
});</code></pre>
      </div>
    </div>

    <div class="callout callout-warning">
      <div class="callout-title">⚠️ ప్రాక్టీస్ లో వచ్చే పొరపాట్లు (Common Mistakes)</div>
      <ul>
        <li><code>addEventListener("click", handleClick())</code> అని ఫంక్షన్ పక్కన Parentheses <code>()</code> పెడితే పేజీ లోడ్ కాగానే ఫంక్షన్ రన్ అయిపోతుంది! కేవలం ఫంక్షన్ పేరు మాత్రమే ఇవ్వాలి: <code>addEventListener("click", handleClick)</code>.</li>
        <li>Form లో సబ్మిట్ ఈవెంట్ కి <code>e.preventDefault()</code> రాయడం మర్చిపోతే డేటా పోయి పేజీ రిఫ్రెష్ అయిపోతుంది.</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">3</span>Practice Questions & Answers</div>
    <div class="section-body">
      <details>
        <summary>Q1. <code>e.target</code> అంటే ఏమిటి?</summary>
        <div class="faq-ans">
          <p><strong>రిజల్ట్:</strong> <code>e.target</code> అనేది ఈవెంట్ జరిగిన నిర్దిష్టమైన HTML ఎలిమెంట్ ని సూచిస్తుంది. (Ex: <code>e.target.value</code> ద్వారా ఇన్ పుట్ లో ఉన్న టెక్స్ట్ ని పొందవచ్చు).</p>
        </div>
      </details>

      <details>
        <summary>Q2. <code>input</code> ఈవెంట్ కి <code>change</code> ఈవెంట్ కి తేడా ఏంటి?</summary>
        <div class="faq-ans">
          <p><strong>రిజల్ట్:</strong> <code>input</code> ప్రతి అక్షరం టైప్ చేయగానే వెంటనే ఫైర్ అవుతుంది. <code>change</code> యూజర్ టైపింగ్ పూర్తి చేసి బాక్స్ బయట క్లిక్ చేసినప్పుడు (Blur అయినప్పుడు) మాత్రమే ఫైర్ అవుతుంది.</p>
        </div>
      </details>
    </div>

    <div class="intro-box" style="background: rgba(34, 197, 94, 0.1); border-color: rgba(34, 197, 94, 0.3); margin-top:30px;">
      <h3 style="color:#22c55e; margin-bottom:8px;">📌 Quick Summary:</h3>
      <ul style="margin-left: 20px; color: var(--text2);">
        <li>చర్యలపై స్పందించడానికి <code>addEventListener()</code> వాడండి.</li>
        <li>ఫారమ్ రిఫ్రెష్ ని అడ్డుకోవడానికి <code>e.preventDefault()</code> వాడండి.</li>
        <li>ఈవెంట్ సమాచారం కోసం Event Object <code>(e)</code> ని వాడండి.</li>
      </ul>
    </div>
`;

p12Code = p12Code.replace(/const contentBody = `[\s\S]*?`;\s*const html = wrapJSLessonPage\(title, desc, filename, 15, subtopics, contentBody/, `const contentBody = \`${p12Lesson15Content}\`;\n  const html = wrapJSLessonPage(title, desc, filename, 15, subtopics, contentBody`);

fs.writeFileSync(phase12Path, p12Code, 'utf8');
console.log("Updated build_javascript_phase12.js successfully!");


// ==========================================
// 3. REWRITE PHASE 13 (Lesson 16: browser-apis-and-storage.html)
// ==========================================
console.log("Rewriting Phase 13 (build_javascript_phase13.js)...");

const phase13Path = path.join(scratchDir, 'build_javascript_phase13.js');
let p13Code = fs.readFileSync(phase13Path, 'utf8');

const p13Lesson16Content = `
    <div class="intro-box">
      <p>యూజర్ బ్రౌజర్ ని క్లోజ్ చేసినా లేదా పేజీని రిఫ్రెష్ చేసినా డేటా దాచి ఉంచడానికి <strong>LocalStorage</strong>, మరియు నిర్ణీత సమయంలో కోడ్ రన్ చేయడానికి <strong>Timers (setTimeout / setInterval)</strong> వాడతాం. ఈ చాప్టర్ లో LocalStorage API, JSON Storage, మరియు Async Timers ల గురించి స్పష్టంగా నేర్చుకుందాం!</p>
    </div>

    <div class="callout">
      <div class="callout-title">🔐 రియల్ లైఫ్ అనలాజీ: జిమ్ పర్సనల్ లాకర్ (Personal Gym Locker)</div>
      <p style="margin-top: 10px; color: var(--text2); font-size: 14.5px;">మీరు జిమ్ లో ఒక లాకర్ వాడుతున్నారు అనుకోండి:</p>
      <ul style="margin-top: 10px; color: var(--text2); font-size: 14.5px;">
        <li><strong>LocalStorage:</strong> మీ సామాన్లు లాకర్ లో దాచి తాళం వేస్తే, మీరు ఇంటికి వెళ్ళి మరుసటి రోజు వచ్చినా లాకర్ లో సామాన్లు సురక్షితంగా ఉంటాయి! (Browser restart చేసినా డేటా అలాగే ఉంటుంది).</li>
        <li><strong>SessionStorage:</strong> మీరు జిమ్ లో ఉన్నంతసేపే లాకర్ పనిచేస్తుంది. బయటకు రాగానే ఖాళీ అవుతుంది! (Tab close చేస్తే డేటా పోతుంది).</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">1</span>LocalStorage API Methods</div>
    <div class="section-body">
      <table class="tbl">
        <tr><th>Method</th><th>వివరణ (Description)</th><th>ఉదాహరణ (Example)</th></tr>
        <tr><td><code>localStorage.setItem(key, value)</code></td><td>డేటాను దాచడానికి</td><td><code>localStorage.setItem("theme", "dark")</code></td></tr>
        <tr><td><code>localStorage.getItem(key)</code></td><td>దాచిన డేటాను పొందడానికి</td><td><code>let t = localStorage.getItem("theme")</code></td></tr>
        <tr><td><code>localStorage.removeItem(key)</code></td><td>ఒక డేటాను తొలగించడానికి</td><td><code>localStorage.removeItem("theme")</code></td></tr>
        <tr><td><code>localStorage.clear()</code></td><td>అన్నింటినీ తొలగించడానికి</td><td><code>localStorage.clear()</code></td></tr>
      </table>
    </div>

    <div class="section-title"><span class="num">2</span>Storing Objects in LocalStorage (JSON.stringify & parse)</div>
    <div class="section-body">
      <div class="callout callout-warning">
        <div class="callout-title">⚠️ LocalStorage కేవలం String లను మాత్రమే దాచగలదు!</div>
        <p>మీరు ఒక Object ని నేరుగా దాచడానికి ప్రయత్నిస్తే అది <code>"[object Object]"</code> గా మారి డేటా పోతుంది! కాబట్టి దాచేటప్పుడు <code>JSON.stringify()</code> ద్వారా స్ట్రింగ్ గా మార్చి, బయటకు తీసేటప్పుడు <code>JSON.parse()</code> ద్వారా తిరిగి Object గా మార్చాలి.</p>
      </div>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — Object Storage</span>
        </div>
        <pre><code>let user = { name: "Balaji", score: 100 };

// 1. Object ని String గా మార్చి దాచడం
localStorage.setItem("userProfile", JSON.stringify(user));

// 2. బయటకు తీసి తిరిగి Object గా మార్చడం
let savedData = localStorage.getItem("userProfile");
if (savedData) {
    let parsedUser = JSON.parse(savedData);
    console.log("User Name:", parsedUser.name); // Balaji
}</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">3</span>Timers: setTimeout & setInterval</div>
    <div class="section-body">
      <ul>
        <li><strong><code>setTimeout(callback, ms)</code>:</strong> కొన్ని మిల్లీ సెకన్ల తర్వాత <strong>ఒకే ఒక సారి</strong> కోడ్ ని రన్ చేస్తుంది.</li>
        <li><strong><code>setInterval(callback, ms)</code>:</strong> ప్రతి కొన్ని మిల్లీ సెకన్లకు <strong>పదే పదే</strong> కోడ్ ని రన్ చేస్తుంది (ఆపడానికి <code>clearInterval</code> వాడాలి).</li>
      </ul>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — Timers</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>"use strict";

// 1. 3 సెకన్ల (3000ms) తర్వాత మెసేజ్ రావడం
setTimeout(() => {
    console.log("⏰ 3 సెకన్లు ముగిసాయి!");
}, 3000);

// 2. కౌంట్ డౌన్ టైమర్ (ప్రతి 1 సెకనుకు)
let count = 1;
let timer = setInterval(() => {
    console.log("Timer Tick:", count);
    count++;

    if (count > 3) {
        clearInterval(timer); // 3 సార్లు అయ్యాక ఆగిపోతుంది
        console.log("🛑 Timer Stopped.");
    }
}, 1000);</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">4</span>Practice Questions & Answers</div>
    <div class="section-body">
      <details>
        <summary>Q1. LocalStorage కి SessionStorage కి తేడా ఏమిటి?</summary>
        <div class="faq-ans">
          <p><strong>రిజల్ట్:</strong> LocalStorage బ్రౌజర్ క్లోజ్ చేసినా డేటాని ఉంచుతుంది (పరిమితి లేదు). SessionStorage కేవలం ఆ నిర్దిష్టమైన Tab ఓపెన్ లో ఉన్నంతవరకే డేటాని ఉంచుతుంది.</p>
        </div>
      </details>

      <details>
        <summary>Q2. <code>setTimeout(fn, 0)</code> ఇస్తే కోడ్ వెంటనే రన్ అవుతుందా?</summary>
        <div class="faq-ans">
          <p><strong>రిజల్ట్:</strong> లేదు! JavaScript Event Loop ప్రకారం, ప్రస్తుత కాల్ స్టేక్ ఖాళీ అయిన తర్వాతే (Microtask Queue/Task Queue ముగిసాక) రన్ అవుతుంది.</p>
        </div>
      </details>
    </div>

    <div class="intro-box" style="background: rgba(34, 197, 94, 0.1); border-color: rgba(34, 197, 94, 0.3); margin-top:30px;">
      <h3 style="color:#22c55e; margin-bottom:8px;">📌 Quick Summary:</h3>
      <ul style="margin-left: 20px; color: var(--text2);">
        <li>శాశ్వత డేటా కోసం <code>localStorage</code> వాడండి.</li>
        <li>ఆబ్జెక్టుల కోసం <code>JSON.stringify</code> మరియు <code>JSON.parse</code> వాడండి.</li>
        <li>సమయానుకూల పనుల కోసం <code>setTimeout</code> / <code>setInterval</code> వాడండి.</li>
      </ul>
    </div>
`;

p13Code = p13Code.replace(/const contentBody = `[\s\S]*?`;\s*const html = wrapJSLessonPage\(title, desc, filename, 16, subtopics, contentBody/, `const contentBody = \`${p13Lesson16Content}\`;\n  const html = wrapJSLessonPage(title, desc, filename, 16, subtopics, contentBody`);

fs.writeFileSync(phase13Path, p13Code, 'utf8');
console.log("Updated build_javascript_phase13.js successfully!");
