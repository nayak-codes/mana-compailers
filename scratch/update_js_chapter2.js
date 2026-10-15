const fs = require('fs');
const path = require('path');

const phase1Path = path.join(__dirname, 'build_javascript_phase1.js');
let code = fs.readFileSync(phase1Path, 'utf8');

const chapter2Content = `
    <div class="intro-box">
      <p>మొదటి chapter లో JavaScript అంటే ఏమిటో తెలుసుకున్నాం. ఇప్పుడు అసలు ప్రశ్న: <strong>JavaScript code ని ఎక్కడ రాయాలి? ఎలా run చేయాలి?</strong></p>
      <p>శుభవార్త ఏమిటంటే, JavaScript కోసం మీరు ఏదీ install చేయాల్సిన అవసరం లేదు. మీ కంప్యూటర్లో ఉన్న <strong>browser</strong> (Chrome, Edge, Firefox) చాలు. ఈ chapter లో JavaScript ని run చేయడానికి ఉన్న మూడు పద్ధతులు మరియు కోడ్ రాసే నియమాలు నేర్చుకుందాం.</p>
    </div>

    <div class="section-title"><span class="num">1</span>ఈ chapter లో మీరు నేర్చుకునేవి</div>
    <div class="section-body">
      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.6;">
        <li>Browser console లో JavaScript run చేయడం</li>
        <li>HTML file లో <code>&lt;script&gt;</code> tag వాడటం</li>
        <li>External <code>.js</code> file ని HTML కి link చేయడం</li>
        <li>Comments రాయడం (<code>//</code> మరియు <code>/* */</code>)</li>
        <li>Code editor గా VS Code ఎలా వాడాలి</li>
        <li>Errors లోని మూడు రకాలు (Syntax, Runtime, Logical) & ASI</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">2</span>పద్ధతి 1: Browser Console</div>
    <div class="section-body">
      <p>ఇది అన్నిటికంటే సులభమైన పద్ధతి. ప్రతి browser లో <strong>Console</strong> అనే ఒక ప్రత్యేక స్థలం ఉంటుంది. అక్కడ నేరుగా JavaScript రాసి, వెంటనే result చూడొచ్చు.</p>
      
      <h3 style="margin-top: 15px; margin-bottom: 10px; font-size: 16px;">Console ని ఎలా open చేయాలి?</h3>
      <ol style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.6;">
        <li>Chrome లేదా Edge browser open చేయండి.</li>
        <li>Keyboard లో <strong>F12</strong> నొక్కండి. (లేదా <code>Ctrl + Shift + J</code>. Mac లో <code>Cmd + Option + J</code>.)</li>
        <li>పైన ఉన్న tabs లో <strong>Console</strong> ని select చేయండి.</li>
      </ol>
      <p style="margin-top:10px;">ఇప్పుడు కింద ఒక ఖాళీ లైన్ కనిపిస్తుంది, అక్కడే code రాయాలి.</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — Console Example</span>
        </div>
        <pre><code>2 + 3</code></pre>
      </div>
      <p style="margin-top:8px;"><strong>Output:</strong> <code>5</code></p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — Console Log</span>
        </div>
        <pre><code>console.log("నమస్కారం, నేను JavaScript నేర్చుకుంటున్నాను");</code></pre>
      </div>
      <p style="margin-top:8px;"><strong>Output:</strong> <code>నమస్కారం, నేను JavaScript నేర్చుకుంటున్నాను</code></p>

      <div class="callout" style="margin-top: 15px;">
        <div class="callout-title">💡 చిట్కా:</div>
        <p style="margin-top: 8px; color: var(--text2); font-size: 14px;">ఒకటి కంటే ఎక్కువ లైన్లు రాయాలంటే <code>Shift + Enter</code> నొక్కండి. కేవలం <code>Enter</code> నొక్కితే code వెంటనే run అయిపోతుంది. చిన్న విషయాలు test చేయడానికి console బాగుంటుంది, కానీ ఇక్కడ రాసిన code **save అవ్వదు**.</p>
      </div>
    </div>

    <div class="section-title"><span class="num">3</span>పద్ధతి 2: HTML file లో &lt;script&gt; tag</div>
    <div class="section-body">
      <p>వెబ్సైట్లలో JavaScript ని ఇలాగే వాడతారు. HTML file లో <code>&lt;script&gt;</code> అనే tag లోపల JavaScript code రాస్తాం.</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">HTML — Internal Script Tag</span>
        </div>
        <pre><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
  &lt;title&gt;నా మొదటి JavaScript పేజీ&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

  &lt;h1&gt;నా మొదటి JavaScript పేజీ&lt;/h1&gt;

  &lt;script&gt;
    console.log("Script tag నుంచి నమస్కారం!");
  &lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;</code></pre>
      </div>
      <p style="margin-top:10px;">ఈ file ని <code>index.html</code> గా save చేసి బ్రౌజర్ లో తెరిచి F12 Console చూడండి, output కనిపిస్తుంది!</p>
    </div>

    <div class="section-title"><span class="num">4</span>పద్ధతి 3: External JavaScript File (.js)</div>
    <div class="section-body">
      <p>Code పెద్దదైనప్పుడు, అంతా HTML లోనే రాయడం గందర్గోళంగా ఉంటుంది. అప్పుడు JavaScript ని **ప్రత్యేక file** (ఉదాహరణకు <code>script.js</code>) లో రాసి, HTML కి <code>&lt;script src="script.js"&gt;&lt;/script&gt;</code> అని link చేస్తాం. ఇది ప్రొఫెషనల్ developers వాడే పద్ధతి.</p>

      <table class="tbl">
        <tr><th>పద్ధతి</th><th>ఎప్పుడు వాడాలి</th><th>Save అవుతుందా?</th></tr>
        <tr><td><strong>Browser Console</strong></td><td>చిన్న విషయాలు త్వరగా test చేయడానికి</td><td>కాదు (Page refresh చేస్తే పోతుంది)</td></tr>
        <tr><td><strong>&lt;script&gt; tag (HTML లోనే)</strong></td><td>చిన్న examples, నేర్చుకోవడానికి</td><td>అవును</td></tr>
        <tr><td><strong>External .js file</strong></td><td>నిజమైన ప్రొఫెషనల్ projects కోసం</td><td>అవును</td></tr>
      </table>
    </div>

    <div class="section-title"><span class="num">5</span>Comments: Code లో నోట్స్ రాయడం</div>
    <div class="section-body">
      <p><strong>Comment</strong> అంటే code లో మనం రాసుకునే నోట్. Browser దీన్ని పట్టించుకోదు, run చేయదు. ఇది మనకోసం, లేదా తర్వాత code చదివేవారి కోసం.</p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — Comments</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>// 1. ఇది ఒక single-line comment
console.log("Comments నేర్చుకుంటున్నాం");

/* 
  2. ఇది ఒక multi-line comment.
  ఇక్కడ ఎన్ని లైన్లైనా రాయొచ్చు.
*/
console.log("Multi-line comment execution");</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">6</span>Code Editor: VS Code వాడటం</div>
    <div class="section-body">
      <p>Notepad లో కూడా code రాయొచ్చు కానీ, నిజమైన developers <strong>VS Code (Visual Studio Code)</strong> వాడతారు. ఇది పూర్తిగా ఉచితం.</p>
      <ol style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.6;">
        <li>VS Code ని download చేసి install చేయండి.</li>
        <li>ఒక folder open చేసి, అందులో <code>index.html</code> మరియు <code>script.js</code> files తయారు చేయండి.</li>
        <li>VS Code లో <strong>Live Server</strong> అనే extension install చేస్తే, ఒక్క click తో page browser లో open అవుతుంది, మరియు code మార్చినప్పుడు automatic గా refresh అవుతుంది.</li>
      </ol>
    </div>

    <div class="section-title"><span class="num">7</span>Errors (తప్పులు) లో 3 రకాలు & ASI</div>
    <div class="section-body">
      <p>JavaScript లో నియమాలు పాటించనప్పుడు వచ్చే errors ను 3 రకాలుగా విభజిస్తాం:</p>
      <table class="tbl">
        <tr><th>Error రకం</th><th>వివరణ (Explanation)</th></tr>
        <tr><td><strong>Syntax Error</strong></td><td>Grammar రూల్స్ తప్పుగా రాస్తే వస్తుంది. Code అసలు రన్ అవ్వదు (Ex: <code>console.log("Hi" ;</code>).</td></tr>
        <tr><td><strong>Runtime Error</strong></td><td>Code రన్ అవుతున్నప్పుడు లేని ఫంక్షన్ ను పిలిస్తే వస్తుంది (Ex: <code>consol.log("Hi");</code>).</td></tr>
        <tr><td><strong>Logical Error</strong></td><td>Error రాదు కానీ మనకు కావలసిన ఫలితం రాదు (Ex: కూడికకు బదులు తీసివేత చేయడం).</td></tr>
      </table>
      <p style="margin-top:10px;"><strong>ASI (Automatic Semicolon Insertion):</strong> మనం లైన్ చివర సెమికోలన్ <code>;</code> పెట్టడం మర్చిపోతే JavaScript దాన్నంతటదే పెట్టుకుంటుంది. అయినా ప్రతీ statement చివర <code>;</code> రాయడం మంచి పద్ధతి.</p>
    </div>

    <div class="callout callout-warning">
      <div class="callout-title">⚠️ Beginners చేసే సాధారణ తప్పులు</div>
      <ul>
        <li><strong>Elements కంటే ముందే script పెట్టడం:</strong> HTML లో <code>&lt;h2 id="msg"&gt;</code> కంటే పైన script పెడితే <code>Cannot set properties of null</code> error వస్తుంది. Script ని <code>&lt;/body&gt;</code> కి ముందు పెట్టాలి.</li>
        <li><strong>File path తప్పుగా ఇవ్వడం:</strong> <code>src="script.js"</code> లో స్పెల్లింగ్ తప్పు రాస్తే <code>404 Not Found</code> error వస్తుంది.</li>
        <li><strong>External `.js` file లో `<script>` tag రాయడం:</strong> External `.js` file లో కేవలం pure JavaScript మాత్రమే ఉండాలి, `<script>` tags ఉండకూడదు.</li>
        <li><strong>File save చేయడం మర్చిపోవడం:</strong> Code మార్చాక <code>Ctrl + S</code> నొక్కి save చేయకపోతే పాత కోడ్ మాత్రమే పనిచేస్తుంది.</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">8</span>ప్రాక్టీస్ ప్రశ్నలు & సమాధానాలు</div>
    <div class="section-body">
      <ol style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.6;">
        <li>Browser Console open చేసి, <code>10 * 5</code> రాసి result చూడండి.</li>
        <li><code>index.html</code> file తయారు చేసి, <code>&lt;script&gt;</code> tag తో console లో మీ పేరు print చేయండి.</li>
        <li>అదే పనిని external <code>script.js</code> file ద్వారా చేయండి.</li>
        <li>ఈ code లో తప్పు ఏమిటి? <code>&lt;script src="myscript.js"&gt;&lt;/script&gt;</code> (file పేరు నిజానికి <code>script.js</code>)</li>
      </ol>
      
      <details style="margin-top: 15px; background: var(--bg2); border: 1px solid var(--border); padding: 12px; border-radius: 8px; cursor: pointer;">
        <summary style="font-weight: bold; color: var(--text);">సమాధానాలు చూడండి</summary>
        <div style="margin-top: 10px; font-size: 14px; color: var(--text2);">
          <p><strong>1.</strong> Output <code>50</code> వస్తుంది.</p>
          <p style="margin-top: 8px;"><strong>2.</strong> <code>&lt;script&gt;console.log("నా పేరు రవి");&lt;/script&gt;</code></p>
          <p style="margin-top: 8px;"><strong>3.</strong> <code>script.js</code> లో <code>console.log("నా పేరు రవి");</code> అని రాసి, HTML లో <code>&lt;script src="script.js"&gt;&lt;/script&gt;</code> అని లింక్ చేయాలి.</p>
          <p style="margin-top: 8px;"><strong>4.</strong> File పేరు సరిపోలలేదు. <code>src</code> లో <code>script.js</code> అని మాత్రమే రాయాలి, <code>myscript.js</code> అని కాదు.</p>
        </div>
      </details>
    </div>

    <div class="try-box">
      <div class="try-title">🚀 మీరే try చేయండి</div>
      <p style="color:var(--text2); font-size:14px; margin-bottom:12px;">ఈ code ని మన compiler లో run చేసి చూడండి, ఆపై మీ పేరు మార్చి మళ్ళీ run చేయండి:</p>
      <div class="code-block">
        <pre><code>// నా రెండో JavaScript program
console.log("నా పేరు: రవి");
console.log("నేను నేర్చుకుంటున్నది: JavaScript Setup & Execution");</code></pre>
      </div>
      <a class="run-btn" href="/?lang=nodejs">👉 Our Compiler లో JavaScript try చేయండి</a>
    </div>

    <div class="intro-box" style="background: rgba(34, 197, 94, 0.1); border-color: rgba(34, 197, 94, 0.3); margin-top:30px;">
      <h3 style="color:#22c55e; margin-bottom:8px;">📌 Quick Summary:</h3>
      <ul style="margin-left: 20px; color: var(--text2);">
        <li>JavaScript run చేయడానికి 3 పద్ధతులు: <strong>Console</strong>, <strong>Internal Script</strong>, <strong>External .js file</strong>.</li>
        <li>Console ని <code>F12</code> తో open చేయొచ్చు, టెస్టింగ్ కి బాగుంటుంది కానీ save అవ్వదు.</li>
        <li>Real projects లో <code>script.js</code> ఫైల్ ని <code>&lt;script src="script.js"&gt;</code> ద్వారా <code>&lt;/body&gt;</code> కి ముందు link చేస్తాం.</li>
        <li><code>//</code> single-line comment, <code>/* */</code> multi-line comment.</li>
      </ul>
    </div>
`;

// Replace in buildLesson2
const regex = /function buildLesson2\(\) \{[\s\S]*?const contentBody = `[\s\S]*?`;\s*const html = wrapJSLessonPage\(title, desc, filename, 2, subtopics, contentBody/;

code = code.replace(regex, (match) => {
  const parts = match.split('const contentBody = `');
  return `${parts[0]}const contentBody = \`${chapter2Content}\`;\n  const html = wrapJSLessonPage(title, desc, filename, 2, subtopics, contentBody`;
});

fs.writeFileSync(phase1Path, code, 'utf8');
console.log("Successfully updated Chapter 2 in build_javascript_phase1.js");
