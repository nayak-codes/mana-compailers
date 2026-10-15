const fs = require('fs');
const path = require('path');

function replaceLessonContent(filePath, funcName, newTitle, newDesc, newContent) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Update Title
  const titleRegex = new RegExp(`(function ${funcName}\\(\\) {[\\s\\S]*?const title = ")(.*?)(";)`, 'm');
  content = content.replace(titleRegex, `$1${newTitle}$3`);
  
  // Update Desc
  const descRegex = new RegExp(`(function ${funcName}\\(\\) {[\\s\\S]*?const desc = ")(.*?)(";)`, 'm');
  content = content.replace(descRegex, `$1${newDesc}$3`);

  // Update Content
  const funcStart = content.indexOf(`function ${funcName}()`);
  const contentBodyStart = content.indexOf('const contentBody = `', funcStart);
  const contentBodyEnd = content.indexOf('  `;\n\n  const html = wrapJSLessonPage', contentBodyStart);
  
  if (funcStart !== -1 && contentBodyStart !== -1 && contentBodyEnd !== -1) {
    const newFileContent = content.substring(0, contentBodyStart) +
                           'const contentBody = `\n' + newContent + '\n' +
                           content.substring(contentBodyEnd);
    fs.writeFileSync(filePath, newFileContent, 'utf8');
    console.log(`✅ Updated ${funcName} in ${filePath}`);
  } else {
    console.log(`❌ Failed to find bounds for ${funcName} in ${filePath}`);
  }
}

const contentLesson1 = `
    <div class="intro-box">
      <p>మీరు ఎప్పుడైనా ఒక వెబ్సైట్లో ఒక బటన్ నొక్కగానే ఏదో మారడం గమనించారా? Instagram లో ఒక photo ని double tap చేయగానే heart వచ్చేస్తుంది. Amazon లో cart లో ఒక item add చేయగానే పైన number పెరుగుతుంది. Google Maps లో మీరు drag చేస్తే map కదులుతుంది. ఇవన్నీ page ని refresh చేయకుండానే జరుగుతాయి కదా?</p>
      <p>ఈ మాయ వెనుక ఉన్నది <strong>JavaScript</strong>. ఈ chapter లో JavaScript అంటే ఏమిటో, అది ఎందుకు ఇంత ముఖ్యమో, మరియు మీ మొదటి JavaScript program ఎలా రాయాలో చాలా సులభంగా నేర్చుకుందాం. ఇంతకు ముందు ఎప్పుడూ programming చేయకపోయినా పర్వాలేదు, మనం మొదటి నుంచే మొదలుపెడదాం.</p>
    </div>

    <div class="section-title"><span class="num">1</span>ఈ chapter లో మీరు నేర్చుకునేవి</div>
    <div class="section-body">
      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.6;">
        <li>JavaScript అంటే ఏమిటి, అది ఎందుకు వాడతారు</li>
        <li>JavaScript ఎలా పుట్టింది</li>
        <li>HTML, CSS, JavaScript మధ్య తేడా ఏమిటి</li>
        <li>JavaScript ని ఎక్కడెక్కడ ఉపయోగిస్తారు</li>
        <li>Java మరియు JavaScript ఒకటి కాదు అని ఎందుకు చెబుతారు</li>
        <li>మీ మొదటి JavaScript program రాసి run చేయడం</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">2</span>JavaScript అంటే ఏమిటి?</div>
    <div class="section-body">
      <p><strong>JavaScript</strong> ఒక <strong>programming language</strong>. Programming language అంటే కంప్యూటర్తో మాట్లాడటానికి మనం వాడే భాష. మనం తెలుగులో ఒక వ్యక్తికి "నీళ్లు తీసుకురా" అని చెబుతాం కదా, అలాగే కంప్యూటర్కి "ఈ పని చెయ్యి" అని చెప్పడానికి programming language వాడతాం.</p>
      <p>JavaScript ని ముఖ్యంగా <strong>వెబ్సైట్లను సజీవంగా (interactive) మార్చడానికి</strong> వాడతారు. ఒక వెబ్సైట్ లో కేవలం text, images ఉంటే అది ఒక పుస్తకంలో పేజీ లాగా ఉంటుంది, మనం చూడగలం కానీ దానితో ఏమీ చేయలేం. అదే వెబ్సైట్లో JavaScript ఉంటే:</p>
      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.6;">
        <li>బటన్ నొక్కితే ఏదైనా జరుగుతుంది</li>
        <li>Form లో తప్పు email రాస్తే వెంటనే "సరైన email ఇవ్వండి" అని చెబుతుంది</li>
        <li>Menu open అవుతుంది, close అవుతుంది</li>
        <li>Dark mode, light mode మార్చుకోవచ్చు</li>
        <li>Server నుంచి కొత్త data వచ్చి page లో కనిపిస్తుంది</li>
      </ul>
      <p>అంటే JavaScript అనేది వెబ్సైట్కి <strong>ప్రాణం పోస్తుంది</strong> అని చెప్పొచ్చు.</p>
    </div>

    <div class="section-title"><span class="num">3</span>JavaScript ఎలా పుట్టింది?</div>
    <div class="section-body">
      <p>ఇది చాలా ఆసక్తికరమైన కథ. 1995 లో <strong>Netscape</strong> అనే company, తమ browser లో వెబ్సైట్లు కొంచెం interactive గా ఉండేలా చేయడానికి ఒక చిన్న language కావాలనుకుంది. ఆ పని <strong>Brendan Eich</strong> అనే engineer కి అప్పగించారు. ఆయన ఈ language ని కేవలం <strong>10 రోజుల్లో</strong> మొదటి version గా తయారు చేశారని చెబుతారు.</p>
      <p>మొదట దీనికి వేరే పేర్లు ఉండేవి. తర్వాత "JavaScript" అనే పేరు పెట్టారు. ఈరోజు ఇది ప్రపంచంలో అత్యధికంగా వాడే programming languages లో ఒకటి. ఒక చిన్న ప్రయోగంగా మొదలైన language, ఇప్పుడు దాదాపు ప్రతి వెబ్సైట్లో ఉంది.</p>
    </div>

    <div class="section-title"><span class="num">4</span>HTML, CSS, JavaScript: ఒక ఇల్లు ఉదాహరణ</div>
    <div class="section-body">
      <p>వెబ్సైట్ తయారీలో మూడు ముఖ్యమైన భాగాలు ఉంటాయి. వీటిని ఒక <strong>ఇల్లు</strong> తో పోల్చి చూద్దాం.</p>
      <table class="tbl">
        <tr><th>భాగం</th><th>ఇంట్లో దేనికి సమానం</th><th>వెబ్సైట్లో ఏం చేస్తుంది</th></tr>
        <tr><td><strong>HTML</strong></td><td>గోడలు, తలుపులు, కిటికీలు (ఇంటి నిర్మాణం)</td><td>Page లో ఏమేం ఉండాలో చెబుతుంది: heading, paragraph, image, button</td></tr>
        <tr><td><strong>CSS</strong></td><td>రంగులు, పెయింటింగ్, ఫర్నిచర్ అమరిక (అందం)</td><td>Page ఎలా కనిపించాలో చెబుతుంది: colors, fonts, spacing</td></tr>
        <tr><td><strong>JavaScript</strong></td><td>కరెంట్, స్విచ్లు, ఫ్యాన్, లైట్ (పని చేసే విధానం)</td><td>Page ఎలా ప్రవర్తించాలో చెబుతుంది: click చేస్తే ఏం జరగాలి</td></tr>
      </table>
      <p>గోడలు కట్టి, రంగు వేసినా, కరెంట్ లేకపోతే ఇల్లు ఉపయోగపడదు కదా? స్విచ్ నొక్కితే లైట్ వెలగడం లాంటిదే JavaScript పని. అందుకే ఈ మూడూ కలిస్తేనే ఒక పూర్తి వెబ్సైట్ తయారవుతుంది.</p>
    </div>

    <div class="section-title"><span class="num">5</span>JavaScript ని ఎక్కడ వాడతారు?</div>
    <div class="section-body">
      <p>ఒకప్పుడు JavaScript కేవలం browser లోనే పని చేసేది. ఇప్పుడు పరిస్థితి మారింది. JavaScript తో మీరు చాలా రకాల పనులు చేయొచ్చు:</p>
      <ol style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.6;">
        <li><strong>Websites మరియు Web Apps:</strong> Gmail, YouTube, Facebook లాంటి వెబ్సైట్ల interactive భాగాలు JavaScript తో నడుస్తాయి.</li>
        <li><strong>Server-side programming:</strong> <strong>Node.js</strong> అనే technology వల్ల, browser బయట కూడా, అంటే server మీద కూడా JavaScript run చేయొచ్చు. అంటే ఒకే language తో front-end మరియు back-end రెండూ రాయొచ్చు.</li>
        <li><strong>Mobile Apps:</strong> React Native లాంటి tools తో Android మరియు iPhone apps తయారు చేయొచ్చు.</li>
        <li><strong>Games:</strong> Browser లో ఆడుకునే చిన్న games JavaScript తో తయారవుతాయి.</li>
        <li><strong>Desktop Apps:</strong> VS Code editor కూడా JavaScript technologies తో తయారైనదే.</li>
      </ol>
      <p>అందుకే JavaScript నేర్చుకుంటే ఉద్యోగ అవకాశాలు చాలా ఎక్కువ. Web developer, Full-stack developer, App developer ఇలా చాలా రోల్స్కి ఇది అవసరం.</p>
    </div>

    <div class="section-title"><span class="num">6</span>Java మరియు JavaScript ఒకటి కాదు!</div>
    <div class="section-body">
      <p>ఇది చాలా మంది beginners చేసే పెద్ద పొరపాటు. పేరులో "Java" ఉంది కాబట్టి రెండూ ఒకటే అనుకుంటారు. కానీ రెండూ <strong>పూర్తిగా వేరు వేరు languages</strong>.</p>
      <p>దీన్ని ఇలా గుర్తుపెట్టుకోండి: <strong>Java కి JavaScript కి ఉన్న సంబంధం, కారు (Car) కి కార్పెట్ (Carpet) కి ఉన్న సంబంధం లాంటిది.</strong> రెండు పేర్లలో "Car" ఉంది, కానీ రెండూ ఒకటి కావు కదా!</p>
      <table class="tbl">
        <tr><th>Java</th><th>JavaScript</th></tr>
        <tr><td>ముఖ్యంగా Android apps, enterprise software కోసం</td><td>ముఖ్యంగా వెబ్సైట్లు, web apps కోసం</td></tr>
        <tr><td>Code ని ముందు compile చేయాలి</td><td>Browser నేరుగా code ని run చేస్తుంది</td></tr>
        <tr><td>రాయడానికి ఎక్కువ code అవసరం</td><td>తక్కువ code తో పని పూర్తవుతుంది</td></tr>
      </table>
      <p>ఆ కాలంలో Java చాలా ప్రాచుర్యంలో ఉండటంతో, marketing కోసం ఈ పేరు పెట్టారని చెబుతారు. అంతే, వేరే సంబంధం ఏమీ లేదు.</p>
    </div>

    <div class="section-title"><span class="num">7</span>మన మొదటి JavaScript Program</div>
    <div class="section-body">
      <p>ఇప్పుడు అసలు విషయానికి వద్దాం. ప్రతి programmer తన మొదటి program లో "Hello, World!" అని print చేస్తారు. ఇది ఒక సంప్రదాయం. మనం కూడా అదే చేద్దాం.</p>
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>console.log("Hello, World!");</code></pre>
      </div>
      <p style="margin-top:10px;"><strong>Output:</strong></p>
      <pre style="background: #1e1e1e; color: #fff; padding: 10px; border-radius: 8px; font-family: 'JetBrains Mono', monospace;">Hello, World!</pre>

      <h3 style="margin-top: 20px; margin-bottom: 10px; font-size: 18px;">Code ని లైన్ బై లైన్ అర్థం చేసుకుందాం</h3>
      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.6;">
        <li><code>console.log()</code> అనేది ఒక <strong>command</strong>. ఇది మనం ఇచ్చిన దాన్ని screen మీద (console లో) చూపిస్తుంది.</li>
        <li>కుండలీకరణాల (<code>()</code>) లోపల మనం చూపించాలనుకున్న విషయాన్ని ఇస్తాం.</li>
        <li><code>"Hello, World!"</code> అనేది ఒక <strong>text (string)</strong>. Text ని ఎప్పుడూ quotation marks (<code>" "</code>) మధ్యలో రాయాలి.</li>
        <li>చివరిలో ఉన్న <code>;</code> (semicolon) ఒక statement ముగిసిందని సూచిస్తుంది.</li>
      </ul>
      <p>ఇదే మీ మొదటి JavaScript program. అభినందనలు, మీరు ఇప్పుడు ఒక JavaScript programmer అయ్యారు!</p>

      <h3 style="margin-top: 20px; margin-bottom: 10px; font-size: 18px;">మీ పేరు print చేద్దాం</h3>
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>console.log("నా పేరు రవి");
console.log("నేను JavaScript నేర్చుకుంటున్నాను");</code></pre>
      </div>
      <p style="margin-top:10px;"><strong>Output:</strong></p>
      <pre style="background: #1e1e1e; color: #fff; padding: 10px; border-radius: 8px; font-family: 'JetBrains Mono', monospace;">నా పేరు రవి
నేను JavaScript నేర్చుకుంటున్నాను</pre>
      <p>ప్రతి <code>console.log()</code> ఒక కొత్త లైన్ లో output ఇస్తుంది. మీ పేరు రాసి మీరూ try చేయండి.</p>
    </div>

    <div class="section-title"><span class="num">8</span>మరో ఉదాహరణ: alert box</div>
    <div class="section-body">
      <p>Browser లో ఒక popup message చూపించడానికి <code>alert()</code> వాడతాం.</p>
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript</span>
        </div>
        <pre><code>alert("స్వాగతం! JavaScript నేర్చుకుందాం");</code></pre>
      </div>
      <p>ఇది browser లో run చేస్తే ఒక చిన్న popup box వచ్చి ఆ message చూపిస్తుంది.</p>
      
      <div class="callout" style="margin-top: 15px;">
        <div class="callout-title">గమనిక:</div>
        <p style="margin-top: 8px; color: var(--text2); font-size: 14px;"><code>alert()</code> browser లో మాత్రమే పని చేస్తుంది. కొన్ని online compilers లో ఇది పని చేయదు. అందుకే మనం ఎక్కువగా <code>console.log()</code> నే వాడతాం.</p>
      </div>
    </div>

    <div class="section-title"><span class="num">9</span>HTML లో JavaScript: ఒక చిన్న ఉదాహరణ</div>
    <div class="section-body">
      <p>JavaScript అసలు శక్తి వెబ్సైట్లో కనిపిస్తుంది. ఈ చిన్న ఉదాహరణ చూడండి:</p>
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">HTML</span>
        </div>
        <pre><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;body&gt;

  &lt;h2 id="msg"&gt;నమస్కారం!&lt;/h2&gt;
  &lt;button onclick="changeText()"&gt;ఇక్కడ నొక్కండి&lt;/button&gt;

  &lt;script&gt;
    function changeText() {
      document.getElementById("msg").innerText = "JavaScript పని చేస్తోంది!";
    }
  &lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;</code></pre>
      </div>
      <p style="margin-top:10px;"><strong>ఇది ఏం చేస్తుంది:</strong> పేజీలో "నమస్కారం!" అనే heading మరియు ఒక బటన్ కనిపిస్తాయి. బటన్ నొక్కగానే heading "JavaScript పని చేస్తోంది!" గా మారుతుంది, page refresh అవ్వకుండానే.</p>
      <p>ఇప్పుడు ఈ code పూర్తిగా అర్థం కాకపోయినా భయపడకండి. <code>function</code>, <code>document</code> లాంటివి ముందు chapters లో వివరంగా నేర్చుకుంటాం. ఇప్పుడు మీరు గుర్తుపెట్టుకోవాల్సింది ఒక్కటే: <strong>బటన్ నొక్కినప్పుడు page లో ఏదో మార్చగలగడమే JavaScript శక్తి.</strong></p>
    </div>

    <div class="section-title"><span class="num">10</span>Beginners చేసే సాధారణ తప్పులు</div>
    <div class="section-body">
      <p><strong>1. Java మరియు JavaScript ని ఒకటే అనుకోవడం.</strong><br>రెండూ వేరు వేరు. Java నేర్చుకున్నంత మాత్రాన JavaScript రాదు, JavaScript నేర్చుకున్నంత మాత్రాన Java రాదు.</p>
      
      <p style="margin-top: 10px;"><strong>2. Quotation marks మర్చిపోవడం.</strong></p>
      <p style="color:var(--text2); font-size:14px;">తప్పు:</p>
      <div class="code-block"><pre><code>console.log(Hello);</code></pre></div>
      <p style="color:var(--text2); font-size:14px;">ఇది error ఇస్తుంది (<code>Hello is not defined</code>), ఎందుకంటే text ని quotes లో రాయలేదు.</p>
      
      <p style="color:var(--text2); font-size:14px; margin-top:8px;">సరైనది:</p>
      <div class="code-block"><pre><code>console.log("Hello");</code></pre></div>
      
      <p style="margin-top: 15px;"><strong>3. అక్షరాల పొరపాట్లు (Case sensitivity).</strong><br>JavaScript లో పెద్ద అక్షరం, చిన్న అక్షరం తేడా ఉంటుంది. <code>console.log</code> సరైనది, కానీ <code>Console.Log</code> లేదా <code>console.Log</code> రాస్తే error వస్తుంది.</p>
      
      <p style="margin-top: 10px;"><strong>4. కుండలీకరణాలు (brackets) మూసివేయకపోవడం.</strong><br><code>console.log("Hi"</code> అని రాసి <code>)</code> మర్చిపోతే error వస్తుంది. ప్రతి <code>(</code> కి ఒక <code>)</code> ఉండాలి.</p>
    </div>

    <div class="section-title"><span class="num">11</span>ప్రాక్టీస్ ప్రశ్నలు</div>
    <div class="section-body">
      <ol style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.6;">
        <li>మీ పేరు print చేసే ఒక program రాయండి.</li>
        <li>మూడు వేర్వేరు లైన్లలో మీ పేరు, మీ ఊరు, మీకు ఇష్టమైన ఆట print చేయండి.</li>
        <li>HTML, CSS, JavaScript లలో ప్రతిదాని పని ఒక్క వాక్యంలో రాయండి.</li>
        <li>ఈ code లో తప్పు ఏమిటో కనుక్కోండి: <code>console.log("Welcome)</code></li>
        <li><code>Console.log("Hi");</code> run చేస్తే ఏం జరుగుతుంది? ఎందుకు?</li>
      </ol>
      
      <details style="margin-top: 15px; background: var(--bg2); border: 1px solid var(--border); padding: 10px; border-radius: 8px; cursor: pointer;">
        <summary style="font-weight: bold; color: var(--text);">సమాధానాలు చూడండి</summary>
        <div style="margin-top: 10px; font-size: 14px; color: var(--text2);">
          <p><strong>1.</strong><br><code>console.log("రవి కుమార్");</code></p>
          <p style="margin-top: 8px;"><strong>2.</strong><br><code>console.log("నా పేరు సీత");</code><br><code>console.log("నా ఊరు హైదరాబాద్");</code><br><code>console.log("నాకు ఇష్టమైన ఆట క్రికెట్");</code></p>
          <p style="margin-top: 8px;"><strong>3.</strong> HTML page నిర్మాణాన్ని (structure) ఇస్తుంది, CSS దానికి అందాన్ని (design) ఇస్తుంది, JavaScript దానికి పని చేసే గుణాన్ని (behaviour) ఇస్తుంది.</p>
          <p style="margin-top: 8px;"><strong>4.</strong> Closing quotation mark (<code>"</code>) లేదు. సరైనది: <code>console.log("Welcome");</code></p>
          <p style="margin-top: 8px;"><strong>5.</strong> Error వస్తుంది (<code>Console is not defined</code>). JavaScript case-sensitive, కాబట్టి <code>console</code> చిన్న అక్షరాలతో రాయాలి.</p>
        </div>
      </details>
    </div>

    <div class="try-box">
      <div class="try-title">🚀 మీరే try చేయండి</div>
      <p style="color:var(--text2); font-size:14px; margin-bottom:12px;">పైన నేర్చుకున్న <code>console.log("Hello, World!");</code> ని మన compiler లో ఇప్పుడే run చేసి చూడండి. మీ పేరు మార్చి రాసి, output ఎలా మారుతుందో గమనించండి.</p>
      <a class="run-btn" href="/?lang=nodejs">👉 Our Compiler లో JavaScript try చేయండి</a>
    </div>

    <div class="section-title"><span class="num">12</span>సారాంశం (Quick Summary)</div>
    <div class="section-body">
      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.6;">
        <li><strong>JavaScript</strong> ఒక programming language, వెబ్సైట్లను interactive గా చేయడానికి వాడతారు.</li>
        <li><strong>HTML</strong> నిర్మాణం, <strong>CSS</strong> అందం, <strong>JavaScript</strong> పని చేసే విధానం.</li>
        <li>JavaScript ని websites, servers (Node.js), mobile apps, games లో వాడతారు.</li>
        <li><strong>Java మరియు JavaScript వేరు వేరు languages.</strong></li>
        <li><code>console.log()</code> తో మనం screen మీద output చూపిస్తాం.</li>
        <li>JavaScript <strong>case-sensitive</strong>, text ఎప్పుడూ quotes లో రాయాలి.</li>
      </ul>
    </div>
`;

// ==========================================
// CHAPTER 2
// ==========================================
const contentLesson2 = `
    <div class="intro-box">
      <p>పోయిన chapter లో మనం మన మొదటి program రాసాం కదా? ఈ chapter లో JavaScript రాసేటప్పుడు పాటించాల్సిన కొన్ని ముఖ్యమైన నియమాలు (Grammar rules) నేర్చుకుందాం. ఇంగ్లీష్ కి grammar ఎలానో, programming కి <strong>Syntax</strong> అలా అన్నమాట.</p>
      <p>అలాగే మనం తప్పులు చేసినప్పుడు కంప్యూటర్ ఎలా అరుస్తుందో (Errors) కూడా చూద్దాం. భయపడకండి, తప్పులు చేయడం వల్లే బాగా నేర్చుకుంటారు!</p>
    </div>

    <div class="section-title"><span class="num">1</span>ఈ chapter లో మీరు నేర్చుకునేవి</div>
    <div class="section-body">
      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.6;">
        <li>Comments అంటే ఏమిటి, ఎందుకు వాడతారు</li>
        <li>Statements మరియు Semicolon <code>;</code> ప్రాముఖ్యత</li>
        <li>Automatic Semicolon Insertion (ASI) అంటే ఏంటి</li>
        <li>Case Sensitivity అంటే ఏమిటి</li>
        <li>Errors లోని మూడు రకాలు (Syntax, Runtime, Logical)</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">2</span>Comments (కామెంట్స్) అంటే ఏమిటి?</div>
    <div class="section-body">
      <p>మనం రాసిన code ఏమి చేస్తుందో రేపు మనకు కానీ, వేరేవాళ్లకు కానీ అర్థం కావడానికి రాసుకునే నోట్స్ నే <strong>Comments</strong> అంటారు.</p>
      <p>కంప్యూటర్ ఈ కామెంట్స్ ని పూర్తిగా వదిలేస్తుంది, వాటిని run చేయదు. కేవలం మనుషులు చదువుకోవడానికే ఇవి ఉంటాయి.</p>
      
      <p style="margin-top:10px;">JavaScript లో 2 రకాల కామెంట్స్ ఉన్నాయి:</p>
      <ol style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.6;">
        <li><strong>Single-line comment:</strong> ఇది <code>//</code> తో మొదలవుతుంది.</li>
        <li><strong>Multi-line comment:</strong> ఇది <code>/*</code> తో మొదలై <code>*/</code> తో ముగుస్తుంది.</li>
      </ol>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>// ఇది Single-line comment. కింది లైన్ లో పేరు print చేస్తున్నాను
console.log("రాము"); 

/* 
ఇది Multi-line comment.
ఇందులో మీరు ఎన్ని లైన్స్ అయినా రాయొచ్చు.
కంప్యూటర్ దీన్ని అస్సలు పట్టించుకోదు.
*/
console.log("హైదరాబాద్");</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">3</span>Statements మరియు Semicolons (<code>;</code>)</div>
    <div class="section-body">
      <p>కంప్యూటర్ కి మనం ఇచ్చే ఒక పూర్తి ఆదేశాన్ని (Instruction) <strong>Statement</strong> అంటారు. ఇంగ్లీష్ లో ఒక వాక్యం పూర్తవ్వగానే <strong>Full stop (.)</strong> ఎలా పెడతామో, JavaScript లో ఒక statement పూర్తవ్వగానే <strong>Semicolon (<code>;</code>)</strong> పెడతాం.</p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript</span>
        </div>
        <pre><code>console.log("Hello"); // ఇది ఒక statement
console.log("World"); // ఇది ఇంకొక statement</code></pre>
      </div>
      
      <p style="margin-top:10px;">అదే ఒకవేళ మీరు రెండు statements ని ఒకే లైన్ లో రాయాలంటే, కచ్చితంగా మధ్యలో <code>;</code> పెట్టాలి. లేకపోతే error వస్తుంది.</p>
      <div class="code-block">
        <pre><code>console.log("Hello"); console.log("World"); // సరైనది</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">4</span>Automatic Semicolon Insertion (ASI)</div>
    <div class="section-body">
      <p>కొన్నిసార్లు మనం కంగారులో చివరన సెమికోలన్ <code>;</code> పెట్టడం మర్చిపోతాం. అయినా మన program పని చేస్తుంది! ఎందుకంటే జావాస్క్రిప్ట్ ఇంజిన్ చాలా మంచిది. మీరు సెమికోలన్ పెట్టకపోతే, అది అర్థం చేసుకుని తనంతట తానే ఒక సెమికోలన్ ని ఊహించుకుంటుంది. దీనినే <strong>Automatic Semicolon Insertion (ASI)</strong> అంటారు.</p>
      <p>కానీ, <strong>ఎప్పుడూ ASI మీద ఆధారపడకండి</strong>. అది కొన్నిసార్లు తప్పుగా ఊహించుకుని ఊహించని errors కి దారి తీస్తుంది. కాబట్టి ప్రతీ statement చివర <code>;</code> పెట్టడం ఒక మంచి అలవాటుగా చేసుకోండి.</p>
    </div>

    <div class="section-title"><span class="num">5</span>Case Sensitivity (చిన్న అక్షరాలు - పెద్ద అక్షరాలు)</div>
    <div class="section-body">
      <p>JavaScript కి <strong>Case Sensitivity</strong> ఉంటుంది. అంటే దానికి <code>A</code> వేరు, <code>a</code> వేరు. రెండు ఒకటే కాదు.</p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript</span>
        </div>
        <pre><code>let Name = "Ravi";
let name = "Teja";
let NAME = "Kiran";</code></pre>
      </div>
      <p style="margin-top:10px;">పైన రాసిన మూడు వేర్వేరు variables! కాబట్టి మీరు <code>console.log</code> ని <code>Console.log</code> అని రాస్తే పని చేయదు.</p>
    </div>

    <div class="section-title"><span class="num">6</span>Errors (తప్పులు) లో 3 రకాలు</div>
    <div class="section-body">
      <p>Program రాసేటప్పుడు errors రావడం చాలా సహజం. పెద్ద పెద్ద programmers కి కూడా రోజుకి వందల errors వస్తాయి. Errors లో ముఖ్యంగా 3 రకాలు ఉంటాయి.</p>
      
      <table class="tbl">
        <tr><th>Error రకం</th><th>వివరణ</th><th>రియల్ లైఫ్ ఉదాహరణ</th></tr>
        <tr>
          <td><strong>1. Syntax Error</strong></td>
          <td>JavaScript grammar రూల్స్ పాటించకపోతే వస్తుంది. Program అసలు run అవ్వదు.</td>
          <td>తెలుగులో "నేను అన్నం తిన్నాను" కి బదులు "అన్నం నేను తిన్నాను" అని రాయడం.</td>
        </tr>
        <tr>
          <td><strong>2. Runtime Error</strong></td>
          <td>Syntax కరెక్టే కానీ, run అవుతున్నప్పుడు లేని దాన్ని అడిగితే వస్తుంది.</td>
          <td>హోటల్ కి వెళ్లి మెనూలో లేని వంటకం తీసుకురమ్మని అడగటం.</td>
        </tr>
        <tr>
          <td><strong>3. Logical Error</strong></td>
          <td>ఎలాంటి error మెసేజ్ రాదు. కానీ మీకు కావాల్సిన output రాదు. ఇది పట్టుకోవడం చాలా కష్టం.</td>
          <td>టీ పెట్టబోయి అందులో పంచదారకి బదులు ఉప్పు వేయడం! అంతా బాగానే జరిగింది కానీ తాగితే తెలుస్తుంది తప్పు జరిగిందని.</td>
        </tr>
      </table>

      <h3 style="margin-top: 20px; margin-bottom: 10px; font-size: 18px;">ఉదాహరణలు చూద్దాం:</h3>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — Errors</span>
        </div>
        <pre><code>// 1. Syntax Error: బ్రాకెట్ మూసివేయలేదు
console.log("Hello" ; 

// 2. Runtime Error: console.log స్పెల్లింగ్ తప్పు రాసాం
consol.log("Hello"); 

// 3. Logical Error: కూడిక చేయబోయి తీసివేత చేశాం
console.log("5 + 5 = " + (5 - 5)); // Output: 5 + 5 = 0 అని వస్తుంది!</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">7</span>Beginners చేసే సాధారణ తప్పులు</div>
    <div class="section-body">
      <p><strong>1. కామెంట్స్ లోనే కోడ్ రాయడం.</strong><br>పొరపాటున <code>//</code> తర్వాత రాస్తే అది పని చేయదు.</p>
      <div class="code-block"><pre><code>// console.log("ఇది ప్రింట్ అవ్వదు");</code></pre></div>
      
      <p style="margin-top: 10px;"><strong>2. Error మెసేజ్ చదివి భయపడటం.</strong><br>Error మెసేజ్ ని ఎప్పుడూ చదవాలి. అది ఏ లైన్ లో ఉందో, ఎందుకు వచ్చిందో క్లియర్ గా చెబుతుంది. దాన్ని చూసి పారిపోకూడదు!</p>
    </div>

    <div class="section-title"><span class="num">8</span>ప్రాక్టీస్ ప్రశ్నలు</div>
    <div class="section-body">
      <ol style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.6;">
        <li>ఈ కోడ్ లో తప్పు ఏమిటో కనుక్కోండి: <code>Console.log("Hello");</code></li>
        <li>Automatic Semicolon Insertion (ASI) అంటే ఏమిటి?</li>
        <li>మీకు బాగా ఇష్టమైన సినిమా పేరును print చేయండి, ఆ లైన్ పైన అదెందుకు ఇష్టమో ఒక కామెంట్ రాయండి.</li>
        <li>Syntax error కి Logical error కి ఉన్న ముఖ్యమైన తేడా ఏమిటి?</li>
      </ol>
      
      <details style="margin-top: 15px; background: var(--bg2); border: 1px solid var(--border); padding: 10px; border-radius: 8px; cursor: pointer;">
        <summary style="font-weight: bold; color: var(--text);">సమాధానాలు చూడండి</summary>
        <div style="margin-top: 10px; font-size: 14px; color: var(--text2);">
          <p><strong>1.</strong> <code>console</code> కి బదులు పెద్ద అక్షరం <code>C</code> తో మొదలైంది. ఇది Case Sensitivity వల్ల error ఇస్తుంది.</p>
          <p style="margin-top: 8px;"><strong>2.</strong> మనం సెమికోలన్ <code>;</code> మర్చిపోతే, బ్రౌజర్ దానంతట అదే దాన్ని పెట్టుకునే ఫీచర్ ని ASI అంటారు.</p>
          <p style="margin-top: 8px;"><strong>3.</strong><br><code>// ఈ సినిమాలో కామెడీ బాగుంటుంది</code><br><code>console.log("జల్సా");</code></p>
          <p style="margin-top: 8px;"><strong>4.</strong> Syntax error వస్తే program అసలు run అవ్వదు. Logical error వస్తే program run అవుతుంది కానీ మనకు కావాల్సిన కరెక్ట్ ఆన్సర్ రాదు.</p>
        </div>
      </details>
    </div>

    <div class="section-title"><span class="num">9</span>సారాంశం (Quick Summary)</div>
    <div class="section-body">
      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.6;">
        <li>కోడ్ ని అర్థం చేసుకోవడానికి <strong>Comments</strong> వాడతాం (<code>//</code> లేదా <code>/* */</code>).</li>
        <li>ఒక ఇన్స్ట్రక్షన్ ని <strong>Statement</strong> అంటారు, ఇది సెమికోలన్ <code>;</code> తో ముగుస్తుంది.</li>
        <li>మనం మర్చిపోతే జావాస్క్రిప్ట్ ఇంజిన్ దానంతట అదే పెట్టుకునేదే <strong>ASI</strong>.</li>
        <li>JavaScript కి పెద్ద అక్షరాలు చిన్న అక్షరాలు (Case Sensitivity) అంటే పట్టింపు ఎక్కువ.</li>
        <li><strong>Errors లో 3 రకాలు:</strong> Syntax, Runtime, Logical.</li>
      </ul>
    </div>
`;

// ==========================================
// CHAPTER 3
// ==========================================
const contentLesson3 = `
    <div class="intro-box">
      <p>పోయిన chapters లో మనం ముద్రించడం (printing) నేర్చుకున్నాం. కానీ ఎప్పుడూ ఒకే వాల్యూ ని వాడుకోలేం కదా? కొన్నిసార్లు డేటాని దాచుకుని తర్వాత వాడుకోవాల్సి వస్తుంది. అలా దాచుకోవడానికి వాడే <strong>పెట్టెలనే Variables</strong> అంటారు.</p>
      <p>ఈ chapter లో Variables అంటే ఏమిటి? వాటిని ఎలా తయారు చేయాలి? <code>var</code>, <code>let</code>, <code>const</code> మధ్య ఉన్న తేడాలు ఏమిటో చాలా వివరంగా తెలుసుకుందాం.</p>
    </div>

    <div class="section-title"><span class="num">1</span>ఈ chapter లో మీరు నేర్చుకునేవి</div>
    <div class="section-body">
      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.6;">
        <li>Variables అంటే ఏమిటి</li>
        <li><code>let</code>, <code>const</code>, <code>var</code> ని ఎప్పుడు వాడాలి</li>
        <li>Variable పేర్లు పెట్టడానికి ఉన్న నియమాలు (Rules)</li>
        <li>Re-assigning అంటే ఏమిటి</li>
        <li>స్కోప్ (Scope) అంటే ఏమిటి (సింపుల్ గా)</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">2</span>Variables అంటే ఏమిటి?</div>
    <div class="section-body">
      <p>కంప్యూటర్ మెమరీలో డేటాని భద్రపరుచుకోవడానికి వాడే <strong>ఒక కంటైనర్ (డబ్బా)</strong> పేరు Variable. ఈ డబ్బాకి ఒక పేరు పెట్టి, అందులో మనకు కావాల్సిన వాల్యూ వేసి దాచుకుంటాం.</p>
      
      <div class="callout">
        <div class="callout-title">📦 రియల్ లైఫ్ స్టోరీ: స్వీట్ డబ్బాలు</div>
        <p style="margin-top: 10px; color: var(--text2); font-size: 14.5px;">మీ ఇంట్లో వంటింట్లో చాలా డబ్బాలు ఉంటాయి. ఉప్పు, పప్పు, కారం ఇలా. ఒక్కో డబ్బాకి ఒక స్టిక్కర్ అంటిస్తారు కదా (ఉదాహరణకు "పంచదార").</p>
        <p style="margin-top: 10px; color: var(--text2); font-size: 14.5px;">ప్రోగ్రామింగ్ లో:</p>
        <ul style="margin-top: 10px; color: var(--text2); font-size: 14.5px;">
          <li>ఆ <strong>డబ్బా</strong> = Variable</li>
          <li>ఆ డబ్బా పైన ఉన్న <strong>స్టిక్కర్</strong> = Variable పేరు</li>
          <li>లోపల ఉన్న <strong>పంచదార</strong> = Value</li>
        </ul>
      </div>

      <p style="margin-top:15px;">JavaScript లో ఒక వేరియబుల్ ని తయారు చేయడానికి (declare చేయడానికి) మనం 3 పదాలు వాడతాం:</p>
      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.6;">
        <li><code>let</code></li>
        <li><code>const</code></li>
        <li><code>var</code> (పాత పద్ధతి)</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">3</span><code>let</code> మరియు <code>const</code>: ఏది ఎప్పుడు వాడాలి?</div>
    <div class="section-body">
      <p>ఆధునిక JavaScript (ES6 తర్వాత) లో మనం ఎక్కువగా <code>let</code> మరియు <code>const</code> మాత్రమే వాడతాం.</p>
      
      <table class="tbl">
        <tr><th>కీవర్డ్</th><th>అర్థం</th><th>ఎప్పుడు వాడాలి?</th></tr>
        <tr>
          <td><code>let</code></td>
          <td>వాల్యూ ని తర్వాత ఎప్పుడైనా మార్చుకోవచ్చు (Re-assign).</td>
          <td>స్కోర్ పెరగడం, వయసు మారడం లాంటి వాటికి వాడతారు.</td>
        </tr>
        <tr>
          <td><code>const</code></td>
          <td>వాల్యూ ని ఒక్కసారి పెడితే ఇక మార్చలేము (Constant).</td>
          <td>పాస్వర్డ్లు, పుట్టిన తేదీ లాంటి మారకూడని వాటికి వాడతారు.</td>
        </tr>
      </table>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>// let తో వేరియబుల్ క్రియేట్ చేయడం
let age = 20;
console.log(age); // 20

// age ని మార్చడం (Re-assign)
age = 21; 
console.log(age); // 21 (పని చేస్తుంది)

// const తో వేరియబుల్ క్రియేట్ చేయడం
const birthYear = 2003;
console.log(birthYear);

// birthYear ని మార్చడానికి ప్రయత్నిస్తే?
// birthYear = 2004; // ❌ TypeError వస్తుంది! మార్చకూడదు.</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">4</span><code>var</code> కథ ఏంటి? దాన్ని ఎందుకు వాడకూడదు?</div>
    <div class="section-body">
      <p>1995 నుంచి 2015 వరకు JavaScript లో కేవలం <code>var</code> మాత్రమే ఉండేది. కానీ అందులో కొన్ని సమస్యలు (bugs) ఉండేవి.</p>
      <p><code>var</code> కి సరైన స్కోప్ (హద్దులు) లేవు. ఒక బ్లాక్ (రూమ్) లోపల పెట్టినా అది బయటికి వచ్చేస్తుంది. అందుకే 2015 లో ES6 వచ్చినప్పుడు <code>let</code>, <code>const</code> లను పరిచయం చేశారు.</p>
      
      <p style="margin-top:10px;"><strong>గోల్డెన్ రూల్:</strong> మీరు కొత్తగా రాసే ఏ code లోనూ <code>var</code> ని వాడకండి. ఎప్పుడూ <code>const</code> వాడండి. వాల్యూ మారుతుంది అని కచ్చితంగా తెలిస్తేనే <code>let</code> వాడండి.</p>
    </div>

    <div class="section-title"><span class="num">5</span>వేరియబుల్ పేర్లు పెట్టడానికి నియమాలు (Rules)</div>
    <div class="section-body">
      <p>డబ్బాకి ఏ స్టిక్కర్ పడితే ఆ స్టిక్కర్ అంటించడానికి కుదరదు. JavaScript లో పేర్లు పెట్టడానికి కొన్ని కఠినమైన రూల్స్ ఉన్నాయి:</p>
      
      <ol style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.6;">
        <li>పేరులో అక్షరాలు, నంబర్లు, <code>$</code>, <code>_</code> మాత్రమే ఉండాలి. Spaces ఉండకూడదు.</li>
        <li>పేరు <strong>నంబర్ తో మొదలవ్వకూడదు</strong>. (<code>let 1name = "Ravi"</code> తప్పు).</li>
        <li>JavaScript కి రిజర్వ్ చేయబడిన పదాలు (Keywords) వాడకూడదు. ఉదాహరణకు: <code>let</code>, <code>if</code>, <code>function</code>.</li>
      </ol>

      <h3 style="margin-top: 20px; margin-bottom: 10px; font-size: 18px;">ఇండస్ట్రీ బెస్ట్ ప్రాక్టీస్: Camel Case</h3>
      <p>రెండు మూడు పదాలు కలిపి పేరు పెట్టాల్సి వస్తే, మొదటి పదం చిన్న అక్షరాలతో, తర్వాతి పదాల మొదటి అక్షరం పెద్ద అక్షరంతో రాయాలి. ఒంటె (Camel) మూపురం లాగా ఉంటుంది కాబట్టి దీన్ని <strong>camelCase</strong> అంటారు.</p>
      <div class="code-block">
        <pre><code>let firstName = "Ravi";
let myBankAccountBalance = 5000;</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">6</span>Beginners చేసే సాధారణ తప్పులు</div>
    <div class="section-body">
      <p><strong>1. కీవర్డ్ లేకుండా వాడటం.</strong><br>కచ్చితంగా <code>let</code> లేదా <code>const</code> వాడాలి.</p>
      <div class="code-block"><pre><code>age = 20; // ❌ కీవర్డ్ లేదు, strict mode లో error వస్తుంది
let age = 20; // ✅ కరెక్ట్</code></pre></div>
      
      <p style="margin-top: 10px;"><strong>2. Re-declare చేయడం.</strong><br>ఒకసారి <code>let</code> లేదా <code>const</code> తో డబ్బా తయారు చేశాక, మళ్ళీ అదే పేరుతో ఇంకో డబ్బా తయారు చేయకూడదు.</p>
      <div class="code-block"><pre><code>let name = "Ravi";
let name = "Teja"; // ❌ Error వస్తుంది. 'name' is already declared.
name = "Teja"; // ✅ ఇది కరెక్ట్ (Re-assign మాత్రమే చేస్తున్నాం)</code></pre></div>
    </div>

    <div class="section-title"><span class="num">7</span>ప్రాక్టీస్ ప్రశ్నలు</div>
    <div class="section-body">
      <ol style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.6;">
        <li><code>let x = 10; x = 20; console.log(x);</code> అవుట్పుట్ ఏంటి?</li>
        <li><code>const y = 5; y = 10; console.log(y);</code> అవుట్పుట్ ఏంటి?</li>
        <li>క్రింది వాటిలో సరైన variable పేరు ఏది? <code>let my-name</code>, <code>let 1stPlace</code>, <code>let _userId</code>, <code>let my name</code>.</li>
        <li>ఎప్పుడూ మారని మీ ఊరి పేరుకి ఏ కీవర్డ్ (let/const) వాడాలి?</li>
      </ol>
      
      <details style="margin-top: 15px; background: var(--bg2); border: 1px solid var(--border); padding: 10px; border-radius: 8px; cursor: pointer;">
        <summary style="font-weight: bold; color: var(--text);">సమాధానాలు చూడండి</summary>
        <div style="margin-top: 10px; font-size: 14px; color: var(--text2);">
          <p><strong>1.</strong> <code>20</code> వస్తుంది. (let ని మార్చవచ్చు కాబట్టి).</p>
          <p style="margin-top: 8px;"><strong>2.</strong> TypeError వస్తుంది! <code>const</code> ని మార్చలేము.</p>
          <p style="margin-top: 8px;"><strong>3.</strong> <code>let _userId</code> ఒక్కటే కరెక్ట్. (డాష్ ఉండకూడదు, నంబర్ తో మొదలవ్వకూడదు, space ఉండకూడదు).</p>
          <p style="margin-top: 8px;"><strong>4.</strong> <code>const</code> వాడాలి (ఉదా: <code>const cityName = "Hyderabad";</code>).</p>
        </div>
      </details>
    </div>

    <div class="section-title"><span class="num">8</span>సారాంశం (Quick Summary)</div>
    <div class="section-body">
      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.6;">
        <li>డేటాని భద్రపరచడానికి వాడే డబ్బాలనే <strong>Variables</strong> అంటారు.</li>
        <li>మారే వాటికి <strong><code>let</code></strong> వాడాలి.</li>
        <li>మారని వాటికి <strong><code>const</code></strong> వాడాలి.</li>
        <li>పాతదైన <strong><code>var</code></strong> ని వాడకూడదు.</li>
        <li>వేరియబుల్ పేర్లకి ఎప్పుడూ <strong>camelCase</strong> వాడటం మంచి అలవాటు.</li>
      </ul>
    </div>
`;

// ==========================================
// CHAPTER 4
// ==========================================
const contentLesson4 = `
    <div class="intro-box">
      <p>ఇంతకుముందు chapter లో డేటాని దాచుకోవడానికి Variables అనే డబ్బాలు వాడతామని తెలుసుకున్నాం. అయితే ఆ డబ్బాలో ఎలాంటి డేటా అయినా వేయొచ్చా? ఒకే డబ్బాలో టెక్స్ట్, నంబర్, ట్రూ/ఫాల్స్.. ఏమైనా వేయొచ్చా?</p>
      <p>దీనికి సమాధానమే <strong>Data Types</strong>. ఈ chapter లో మనం జావాస్క్రిప్ట్ లో ఉన్న రకరకాల డేటా రకాలను మరియు మన దగ్గర ఉన్న డేటా ఏ రకానికి చెందిందో చెప్పే <code>typeof</code> ఆపరేటర్ గురించి నేర్చుకుందాం.</p>
    </div>

    <div class="section-title"><span class="num">1</span>ఈ chapter లో మీరు నేర్చుకునేవి</div>
    <div class="section-body">
      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.6;">
        <li>Dynamic Typing అంటే ఏమిటి</li>
        <li>Primitive Data Types 7 రకాలు (String, Number, Boolean, Undefined, Null మొ||వి)</li>
        <li><code>undefined</code> మరియు <code>null</code> మధ్య ఉన్న ముఖ్యమైన తేడా</li>
        <li><code>typeof</code> Operator తో డేటా టైప్ ని తెలుసుకోవడం</li>
        <li>JavaScript లో ఉన్న ఒక ప్రసిద్ధ చారిత్రక Bug (<code>typeof null</code>)</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">2</span>Dynamic Typing: JavaScript ఒక మ్యాజిక్ బాక్స్!</div>
    <div class="section-body">
      <p>C, Java లాంటి లాంగ్వేజెస్ లో ఒక డబ్బాకి (Variable కి) ఇది "నంబర్ డబ్బా" అని ముందే చెప్పాలి. అందులో నంబర్ తప్ప వేరేది వేయలేం. కానీ <strong>JavaScript అలా కాదు</strong>.</p>
      
      <p>జావాస్క్రిప్ట్ లో ఒక వేరియబుల్ ని క్రియేట్ చేసేటప్పుడు అందులో ఏం వేస్తారో ముందే చెప్పక్కర్లేదు. అందులో మొదట నంబర్ వేసి, తర్వాత దాన్ని తీసేసి టెక్స్ట్ వేయొచ్చు. అందుకే దీన్ని <strong>Dynamically Typed Language</strong> అంటారు.</p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript</span>
        </div>
        <pre><code>let myData = 25; // ఇప్పుడు ఇది నంబర్
myData = "హలో"; // మ్యాజిక్! ఇప్పుడు ఇది స్ట్రింగ్ (Text) అయిపోయింది!
myData = true; // మళ్ళీ మారింది! ఇది కరెక్టే, error రాదు.</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">3</span>Primitive Data Types (7 రకాలు)</div>
    <div class="section-body">
      <p>JavaScript లో డేటా టైప్స్ ని ముఖ్యంగా 2 రకాలుగా విభజిస్తారు: Primitives (సాధారణ) మరియు Objects (సంక్లిష్టమైనవి). ముందుగా 7 Primitives గురించి తెలుసుకుందాం.</p>
      
      <table class="tbl">
        <tr><th>డేటా టైప్</th><th>వివరణ</th><th>ఉదాహరణ</th></tr>
        <tr>
          <td><strong>Number</strong></td>
          <td>నంబర్లు (దశాంసాలతో సహా)</td>
          <td><code>25</code>, <code>3.14</code>, <code>-10</code></td>
        </tr>
        <tr>
          <td><strong>String</strong></td>
          <td>టెక్స్ట్ (అక్షరాలు, వాక్యాలు). కోట్స్ లో ఉండాలి.</td>
          <td><code>"Ravi"</code>, <code>'Hyderabad'</code>, <code>\`Hello\`</code></td>
        </tr>
        <tr>
          <td><strong>Boolean</strong></td>
          <td>అవును లేదా కాదు (True / False)</td>
          <td><code>true</code>, <code>false</code></td>
        </tr>
        <tr>
          <td><strong>Undefined</strong></td>
          <td>డబ్బా ఉంది కానీ లోపల ఏమీ లేదు</td>
          <td><code>let x;</code> (x వాల్యూ undefined)</td>
        </tr>
        <tr>
          <td><strong>Null</strong></td>
          <td>ఉద్దేశపూర్వకంగా ఏమీ లేదని చెప్పడం</td>
          <td><code>let user = null;</code></td>
        </tr>
        <tr>
          <td><strong>BigInt</strong></td>
          <td>చాలా చాలా పెద్ద నంబర్లు</td>
          <td><code>9007199254740991n</code></td>
        </tr>
        <tr>
          <td><strong>Symbol</strong></td>
          <td>యూనిక్ (ప్రత్యేకమైన) గుర్తింపు కోసం</td>
          <td><code>Symbol('id')</code></td>
        </tr>
      </table>
    </div>

    <div class="section-title"><span class="num">4</span><code>undefined</code> vs <code>null</code></div>
    <div class="section-body">
      <p>చాలా మందికి వచ్చే డౌట్: రెండూ "ఏమీ లేదు" అనే కదా అర్థం? ఈ రెంటికి తేడా ఏంటి?</p>
      
      <div class="callout">
        <div class="callout-title">📦 రియల్ లైఫ్ స్టోరీ:</div>
        <p style="margin-top: 10px; color: var(--text2); font-size: 14.5px;">మీరు అమెజాన్ లో ఒక డబ్బా ఆర్డర్ చేశారు:</p>
        <ul style="margin-top: 10px; color: var(--text2); font-size: 14.5px;">
          <li>మీకు డబ్బా వచ్చింది. దాన్ని ఓపెన్ చేస్తే లోపల ఏమీ లేదు. అంటే తయారు చేసినవాడు లోపల ఏమీ పెట్టలేదు. ఇది <strong>undefined</strong>.</li>
          <li>మీకు డబ్బా వచ్చింది. ఓపెన్ చేస్తే లోపల "ఇందులో ఏమీ లేదు ఖాళీ" అని ఒక పేపర్ మీద రాసి పెట్టి ఉంది. అంటే కావాలనే (Intentional గా) ఖాళీగా పంపారు. ఇది <strong>null</strong>.</li>
        </ul>
      </div>
    </div>

    <div class="section-title"><span class="num">5</span><code>typeof</code> Operator: డేటా గుట్టు విప్పే సాధనం</div>
    <div class="section-body">
      <p>మనం క్రియేట్ చేసిన variable లో ఏ రకమైన డేటా ఉందో తెలుసుకోవడానికి <code>typeof</code> అనే ఆపరేటర్ వాడతాం. ఇది ఆ డేటా యొక్క రకాన్ని టెక్స్ట్ రూపంలో తిరిగి ఇస్తుంది.</p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>console.log(typeof 100);       // "number"
console.log(typeof "Ravi");    // "string"
console.log(typeof true);      // "boolean"

let age;
console.log(typeof age);       // "undefined"</code></pre>
      </div>

      <h3 style="margin-top: 20px; margin-bottom: 10px; font-size: 18px;">ది హిస్టారిక్ బగ్: <code>typeof null</code></h3>
      <p>మీరు <code>typeof null</code> అని ఇస్తే "null" అని రావాలి కదా? కానీ <strong>"object"</strong> అని వస్తుంది! ఎందుకు?</p>
      <div class="code-block">
        <pre><code>console.log(typeof null); // "object" అని వస్తుంది!</code></pre>
      </div>
      <p>1995 లో జావాస్క్రిప్ట్ ని మొదటిసారి తయారు చేసినప్పుడు, null కి సంబంధించిన కోడ్ లో ఒక చిన్న తప్పు (bug) దొర్లింది. దాన్ని తర్వాత గుర్తిస్తే, దాన్ని ఫిక్స్ చేస్తే అప్పటికే ఉన్న లక్షలాది వెబ్సైట్లు పాడైపోతాయని (Backward compatibility కోసం) అలాగే ఉంచేశారు. ఇది జావాస్క్రిప్ట్ లో ఒక ప్రసిద్ధ ఇంటర్వ్యూ ప్రశ్న!</p>
    </div>

    <div class="section-title"><span class="num">6</span>Beginners చేసే సాధారణ తప్పులు</div>
    <div class="section-body">
      <p><strong>1. నంబర్స్ ని కోట్స్ లో రాయడం.</strong><br>కోట్స్ (<code>" "</code>) లో ఏది రాసినా అది స్ట్రింగ్ (Text) అయిపోతుంది.</p>
      <div class="code-block"><pre><code>let score = "100"; 
console.log(typeof score); // "string" అని వస్తుంది, "number" రాదు!</code></pre></div>
      
      <p style="margin-top: 10px;"><strong>2. <code>null</code> మరియు <code>undefined</code> ని ఒకటే అనుకోవడం.</strong><br>పైన చెప్పుకున్నట్టు రెండూ వేరు. మీరు ఏదైనా వాల్యూ ని రీసెట్ చేయాలంటే <code>null</code> ని వాడాలి, <code>undefined</code> ని వాడకూడదు.</p>
    </div>

    <div class="section-title"><span class="num">7</span>ప్రాక్టీస్ ప్రశ్నలు</div>
    <div class="section-body">
      <ol style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.6;">
        <li><code>typeof 3.14</code> అవుట్పుట్ ఏంటి?</li>
        <li><code>typeof "true"</code> అవుట్పుట్ ఏంటి?</li>
        <li><code>typeof typeof 10</code> అవుట్పుట్ ఏంటి? (ఆలోచించండి!)</li>
        <li><code>let a; console.log(typeof a);</code> అవుట్పుట్ ఏంటి?</li>
      </ol>
      
      <details style="margin-top: 15px; background: var(--bg2); border: 1px solid var(--border); padding: 10px; border-radius: 8px; cursor: pointer;">
        <summary style="font-weight: bold; color: var(--text);">సమాధానాలు చూడండి</summary>
        <div style="margin-top: 10px; font-size: 14px; color: var(--text2);">
          <p><strong>1.</strong> <code>"number"</code>. జావాస్క్రిప్ట్ లో పూర్ణాంకాలకి, దశాంసాలకి (decimals) వేరు వేరు టైప్స్ లేవు. అన్నీ number కిందే వస్తాయి.</p>
          <p style="margin-top: 8px;"><strong>2.</strong> <code>"string"</code>. అబ్బా! <code>true</code> కదా boolean అనొద్దు. దాన్ని కోట్స్ (<code>" "</code>) లో పెట్టాం కాబట్టి అది టెక్స్ట్ (string) అయిపోయింది.</p>
          <p style="margin-top: 8px;"><strong>3.</strong> <code>"string"</code> వస్తుంది! ఎందుకంటే, మొదట <code>typeof 10</code> రన్ అయ్యి <code>"number"</code> (ఇదొక string పదం) ఇస్తుంది. తర్వాత <code>typeof "number"</code> రన్ అయ్యి <code>"string"</code> అని ఇస్తుంది.</p>
          <p style="margin-top: 8px;"><strong>4.</strong> <code>"undefined"</code> వస్తుంది, ఎందుకంటే వాల్యూ ఇవ్వలేదు.</p>
        </div>
      </details>
    </div>

    <div class="section-title"><span class="num">8</span>సారాంశం (Quick Summary)</div>
    <div class="section-body">
      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.6;">
        <li>JavaScript ఒక <strong>Dynamically Typed Language</strong>. వేరియబుల్ డేటా టైప్ ఎప్పుడైనా మారొచ్చు.</li>
        <li>ముఖ్యమైన Primitives: <strong>String, Number, Boolean, Undefined, Null</strong>.</li>
        <li>వాల్యూ ఇవ్వకపోతే <strong>undefined</strong>, ఖాళీ అని మీరే చెప్తే <strong>null</strong>.</li>
        <li>డేటా టైప్ తెలుసుకోవడానికి <strong><code>typeof</code></strong> వాడతాం.</li>
        <li><code>typeof null</code> ఎప్పుడూ <strong>"object"</strong> ని ఇస్తుంది (ఇది ఒక బగ్).</li>
      </ul>
    </div>
`;

// ==========================================
// CHAPTER 5
// ==========================================
const contentLesson5 = `
    <div class="intro-box">
      <p>నిర్ణయాలు (Decisions) తీసుకోవడానికి ప్రోగ్రామింగ్ లో <strong>Conditionals</strong> వాడతాం. అంటే "వర్షం పడితే గొడుగు తీసుకెళ్ళు, లేదంటే మామూలుగా వెళ్ళు" అని కంప్యూటర్ కి చెప్పడం లాంటిది.</p>
      <p>ఈ chapter లో మనం <code>if</code>, <code>else</code>, <code>else if</code> మరియు <code>switch</code> స్టేట్మెంట్స్ ని వాడి మన ప్రోగ్రామ్ కి బుర్ర (Brain) ఎలా ఇవ్వాలో నేర్చుకుందాం.</p>
    </div>

    <div class="section-title"><span class="num">1</span>ఈ chapter లో మీరు నేర్చుకునేవి</div>
    <div class="section-body">
      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.6;">
        <li><code>if</code> మరియు <code>else</code> తో నిర్ణయాలు తీసుకోవడం</li>
        <li><code>else if</code> తో ఒకేసారి చాలా కండిషన్స్ ని చెక్ చేయడం</li>
        <li>ట్రాఫిక్ సిగ్నల్స్ ఉదాహరణ</li>
        <li>ఒకే లైన్ లో కండిషన్ రాసే Ternary Operator (<code>? :</code>)</li>
        <li><code>switch</code> స్టేట్మెంట్ ఎప్పుడు వాడాలి?</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">2</span>The <code>if</code> and <code>else</code> Statements</div>
    <div class="section-body">
      <p>ఒక పని జరగాలా వద్దా అనేది ఒక కండిషన్ మీద ఆధారపడి ఉన్నప్పుడు <code>if</code> వాడతాం. ఆ కండిషన్ నిజం (true) అయితే ఆ బ్లాక్ లోపల ఉన్న కోడ్ రన్ అవుతుంది.</p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>let age = 19;

if (age >= 18) {
    console.log("మీరు ఓటు వేయొచ్చు!"); 
} else {
    console.log("మీరు ఇంకా చిన్నపిల్లలు.");
}</code></pre>
      </div>
      <p style="margin-top:10px;">పైన ఏజ్ 18 లేదా అంతకంటే ఎక్కువ ఉంటే మొదటి లైన్ వస్తుంది, లేకపోతే <code>else</code> లో ఉన్న రెండో లైన్ వస్తుంది.</p>
    </div>

    <div class="section-title"><span class="num">3</span><code>else if</code> తో మరిన్ని కండిషన్స్</div>
    <div class="section-body">
      <p>కేవలం రెండు ఆప్షన్స్ ఉంటే if-else సరిపోతుంది. కానీ మూడు నాలుగు ఆప్షన్స్ ఉంటే? అప్పుడు <code>else if</code> వాడాలి.</p>

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

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>let signal = "yellow";

if (signal === "red") {
    console.log("బండి ఆపండి!");
} else if (signal === "yellow") {
    console.log("రెడీ అవ్వండి!");
} else if (signal === "green") {
    console.log("వెళ్ళండి!");
} else {
    console.log("సిగ్నల్ పని చేయట్లేదు జాగ్రత్త!");
}</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">4</span>ఒకే లైన్ లో if-else: Ternary Operator (<code>? :</code>)</div>
    <div class="section-body">
      <p>చిన్న కండిషన్స్ కి ప్రతిసారీ 4 లైన్లు <code>if-else</code> రాయడం విసుగు తెప్పిస్తుంది. అలాంటి సమయంలో <strong>Ternary Operator</strong> వాడతాం. దీన్ని 3 భాగాలుగా రాస్తాం: <code>condition ? true_అయితే : false_అయితే</code></p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript</span>
        </div>
        <pre><code>let age = 20;

// మాములు if-else
let status1;
if (age >= 18) {
    status1 = "Adult";
} else {
    status1 = "Minor";
}

// Ternary Operator (చాలా సింపుల్)
let status2 = (age >= 18) ? "Adult" : "Minor";

console.log(status2); // "Adult"</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">5</span>చాలా కండిషన్స్ ఉన్నప్పుడు <code>switch</code></div>
    <div class="section-body">
      <p>మీరు ఒక వేరియబుల్ వాల్యూ ని ఆధారంగా చేసుకుని 5-6 కండిషన్స్ చెక్ చేయాల్సి వస్తే <code>else if</code> చాలా పెద్దది అయిపోతుంది. అలాంటి సమయంలో <code>switch</code> స్టేట్మెంట్ చాలా క్లీన్ గా ఉంటుంది.</p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript</span>
        </div>
        <pre><code>let day = 3;

switch (day) {
    case 1:
        console.log("Monday");
        break; // ఇది రాయకపోతే కిందివి కూడా రన్ అయిపోతాయి
    case 2:
        console.log("Tuesday");
        break;
    case 3:
        console.log("Wednesday");
        break;
    default:
        console.log("Weekend!"); // పైన ఉన్నవి ఏవీ కాకపోతే ఇది రన్ అవుతుంది
}</code></pre>
      </div>
      <p style="margin-top:10px;">గుర్తుపెట్టుకోండి: ప్రతి <code>case</code> చివర <strong><code>break;</code></strong> రాయడం మర్చిపోకండి!</p>
    </div>

    <div class="section-title"><span class="num">6</span>Beginners చేసే సాధారణ తప్పులు</div>
    <div class="section-body">
      <p><strong>1. = కి బదులు == లేదా === వాడకపోవడం.</strong><br>కండిషన్స్ లో <code>if (age = 18)</code> అని రాస్తారు. ఇక్కడ మీరు కంపేర్ చేయట్లేదు, వాల్యూ అసైన్ చేస్తున్నారు! ఇది ఎప్పుడూ True అవుతుంది.</p>
      <div class="code-block"><pre><code>// ❌ తప్పు (అసైన్మెంట్)
if (age = 18) { ... } 

// ✅ కరెక్ట్ (కంపారిజన్)
if (age === 18) { ... }</code></pre></div>
      
      <p style="margin-top: 10px;"><strong>2. Switch లో break మర్చిపోవడం.</strong><br><code>break;</code> రాయకపోతే కింద ఉన్న cases అన్నీ ఆటోమేటిక్ గా రన్ అయిపోతాయి (దీన్నే Fall-through అంటారు).</p>
    </div>

    <div class="section-title"><span class="num">7</span>ప్రాక్టీస్ ప్రశ్నలు</div>
    <div class="section-body">
      <ol style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.6;">
        <li><code>if (0) { console.log("Hello"); }</code> రన్ చేస్తే ఏమవుతుంది?</li>
        <li>Ternary operator సింటాక్స్ ఏమిటి?</li>
        <li><code>switch</code> స్టేట్మెంట్ లో ఏ <code>case</code> మ్యాచ్ అవ్వకపోతే ఏ బ్లాక్ రన్ అవుతుంది?</li>
        <li>మీకు 100 కి 35 మార్కులు వచ్చాయి. 35 కంటే తక్కువ వస్తే ఫెయిల్, లేదంటే పాస్. దీన్ని Ternary operator తో రాయండి.</li>
      </ol>
      
      <details style="margin-top: 15px; background: var(--bg2); border: 1px solid var(--border); padding: 10px; border-radius: 8px; cursor: pointer;">
        <summary style="font-weight: bold; color: var(--text);">సమాధానాలు చూడండి</summary>
        <div style="margin-top: 10px; font-size: 14px; color: var(--text2);">
          <p><strong>1.</strong> ఏమీ ప్రింట్ అవ్వదు. ఎందుకంటే <code>0</code> అనేది ఒక Falsy వాల్యూ కాబట్టి కండిషన్ <code>false</code> అవుతుంది.</p>
          <p style="margin-top: 8px;"><strong>2.</strong> <code>condition ? if_true_do_this : if_false_do_this</code></p>
          <p style="margin-top: 8px;"><strong>3.</strong> <code>default:</code> బ్లాక్ రన్ అవుతుంది.</p>
          <p style="margin-top: 8px;"><strong>4.</strong><br><code>let marks = 35;</code><br><code>let result = (marks >= 35) ? "Pass" : "Fail";</code><br><code>console.log(result);</code></p>
        </div>
      </details>
    </div>

    <div class="section-title"><span class="num">8</span>సారాంశం (Quick Summary)</div>
    <div class="section-body">
      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.6;">
        <li>కండిషన్ బట్టి కోడ్ రన్ చేయడానికి <strong><code>if</code></strong>, <strong><code>else</code></strong> వాడతాం.</li>
        <li>ఒకటి కంటే ఎక్కువ కండిషన్స్ చెక్ చేయడానికి <strong><code>else if</code></strong> వాడతాం.</li>
        <li>ఒకే లైన్ లో if-else రాయడానికి <strong>Ternary Operator (<code>? :</code>)</strong> వాడతాం.</li>
        <li>ఒకే వేరియబుల్ ని చాలా వాల్యూస్ తో కంపేర్ చేయడానికి <strong><code>switch</code></strong> బెస్ట్. (చివర <code>break</code> మర్చిపోవద్దు).</li>
      </ul>
    </div>
`;


const phase1Path = path.join(__dirname, 'build_javascript_phase1.js');
const phase2Path = path.join(__dirname, 'build_javascript_phase2.js');
const phase4Path = path.join(__dirname, 'build_javascript_phase4.js');

replaceLessonContent(phase1Path, 'buildLesson1', 'JavaScript అంటే ఏమిటి? | JavaScript Introduction in Telugu', 'JavaScript అంటే ఏమిటి, ఎక్కడ వాడతారు, HTML CSS తో దానికి ఉన్న సంబంధం ఏమిటి అనేది తెలుగులో సులభంగా నేర్చుకోండి. మొదటి program తో సహా.', contentLesson1);
replaceLessonContent(phase1Path, 'buildLesson2', 'JavaScript Syntax & Errors | కోడ్ ఎలా రాయాలి (Telugu)', 'JavaScript లో కామెంట్స్, స్టేట్మెంట్స్, సెమికోలన్ వాడకం, ASI, Case Sensitivity, మరియు Errors (Syntax, Runtime, Logical) గురించి తెలుగులో తెలుసుకోండి.', contentLesson2);
replaceLessonContent(phase2Path, 'buildLesson3', 'JavaScript Variables (let, const, var) in Telugu', 'జావాస్క్రిప్ట్ లో డేటాని దాచుకోవడానికి Variables ఎలా వాడాలి? let, const, var మధ్య ఉన్న ముఖ్యమైన తేడాలు ఏమిటి అనేది తెలుగులో వివరంగా నేర్చుకోండి.', contentLesson3);
replaceLessonContent(phase2Path, 'buildLesson4', 'JavaScript Data Types & typeof | Types in Telugu', 'జావాస్క్రిప్ట్ లో Dynamic typing అంటే ఏమిటి? String, Number, Boolean లాంటి 7 Primitive Data Types మరియు typeof ఆపరేటర్ గురించి తెలుసుకోండి.', contentLesson4);
replaceLessonContent(phase4Path, 'buildLesson7', 'JavaScript Conditionals (if, else, switch) in Telugu', 'జావాస్క్రిప్ట్ లో నిర్ణయాలు ఎలా తీసుకోవాలి? if, else, else if, Ternary operator మరియు switch statements గురించి తెలుగులో సులభంగా నేర్చుకోండి.', contentLesson5);
