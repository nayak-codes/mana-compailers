const fs = require('fs');
const path = require('path');

const phase3Path = path.join(__dirname, 'build_javascript_phase3.js');
let code = fs.readFileSync(phase3Path, 'utf8');

// The raw HTML content for Chapter 6 with plain backticks and ${}
const chapter6Raw = `
    <div class="intro-box">
      <p>కరెంట్ ప్లగ్ లో మన ఫోన్ ఛార్జర్ పెట్టాలంటే, కొన్నిసార్లు అడాప్టర్ కావాలి కదా? ఒక రకం ప్లగ్ ని ఇంకో రకం సాకెట్ కి సరిపోయేలా మార్చడమే అడాప్టర్ పని. Programming లో కూడా ఒక data type ని ఇంకో data type గా మార్చాల్సిన సందర్భాలు చాలా వస్తాయి. దీన్నే <strong>Type Conversion</strong> అంటారు.</p>
      <p>గత chapters లో <code>"5" + 3</code> ఫలితం <code>"53"</code> అవ్వడం చూశాం. ఇలాంటి గందరగోళాలు రాకుండా, విలువలను సరైన type కి ఎలా మార్చాలో ఈ chapter లో నేర్చుకుందాం. తర్వాత, text ని అందంగా, సులభంగా రాయడానికి <strong>Template Literals</strong> కూడా చూద్దాం.</p>
    </div>

    <div class="section-title"><span class="num">1</span>ఈ chapter లో మీరు నేర్చుకునేవి</div>
    <div class="section-body">
      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.6;">
        <li>Implicit మరియు Explicit type conversion అంటే ఏమిటి</li>
        <li><code>Number()</code>, <code>parseInt()</code>, <code>parseFloat()</code>, <code>String()</code>, <code>Boolean()</code> ఎలా వాడాలి</li>
        <li>Truthy మరియు Falsy విలువలు</li>
        <li>Template literals (backticks) తో text రాయడం</li>
        <li>Multi-line strings</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">2</span>Type Conversion అంటే ఏమిటి?</div>
    <div class="section-body">
      <p>ఒక విలువ యొక్క data type ని మార్చడమే type conversion. ఇది రెండు రకాలుగా జరుగుతుంది:</p>
      <ol style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.6;">
        <li><strong>Implicit conversion</strong> (అంతర్గత మార్పు): JavaScript తనంతట తాను, మనకు చెప్పకుండానే type మార్చేస్తుంది.</li>
        <li><strong>Explicit conversion</strong> (స్పష్టమైన మార్పు): మనం ఉద్దేశపూర్వకంగా, function వాడి type మారుస్తాం.</li>
      </ol>
    </div>

    <div class="section-title"><span class="num">3</span>1. Implicit Conversion (JavaScript తనంతట తానే మార్చేది)</div>
    <div class="section-body">
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — Implicit Conversion</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>console.log("5" + 2);
console.log("5" - 2);
console.log(true + 1);</code></pre>
      </div>

      <div class="code-output" style="background:#0b1120; border:1px solid #1e293b; border-radius:8px; padding:12px 16px; margin-top:10px; font-family:monospace; color:#38bdf8; font-size:13.5px;">
        <span style="color:#64748b;">Output:</span><br>
        52<br>
        3<br>
        2
      </div>

      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.6; margin-top: 12px;">
        <li><code>"5" + 2</code> → <code>+</code> string తో వస్తే అతికిస్తుంది, కాబట్టి <code>"52"</code>.</li>
        <li><code>"5" - 2</code> → <code>-</code> కి అతికించడం అనే పని లేదు, కాబట్టి <code>"5"</code> ని సంఖ్యగా మార్చి లెక్కించింది: <code>3</code>.</li>
        <li><code>true + 1</code> → <code>true</code> ని <code>1</code> గా మార్చి కూడింది: <code>2</code>.</li>
      </ul>
      <p style="margin-top: 10px;">ఈ ఆటోమేటిక్ మార్పులు ఎప్పుడు ఎలా జరుగుతాయో గుర్తుంచుకోవడం కష్టం, పైగా పొరపాట్లకు దారి తీస్తాయి. అందుకే <strong>మనమే స్పష్టంగా (explicitly) మార్చడం</strong> మంచి అలవాటు.</p>
    </div>

    <div class="section-title"><span class="num">4</span>2. Explicit Conversion: మనమే మార్చడం</div>
    <div class="section-body">
      <h3 style="margin-top: 15px; margin-bottom: 8px; font-size: 16px;"><code>Number()</code>: ఏదైనా విలువను number గా మార్చడం</h3>
      <div class="code-block">
        <pre><code>console.log(Number("42"));
console.log(Number("3.14"));
console.log(Number("abc"));
console.log(Number(true));
console.log(Number(false));</code></pre>
      </div>

      <div class="code-output" style="background:#0b1120; border:1px solid #1e293b; border-radius:8px; padding:12px 16px; margin-top:10px; font-family:monospace; color:#38bdf8; font-size:13.5px;">
        <span style="color:#64748b;">Output:</span><br>
        42<br>
        3.14<br>
        NaN<br>
        1<br>
        0
      </div>

      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.6; margin-top: 10px;">
        <li><code>"42"</code> మరియు <code>"3.14"</code> సరైన సంఖ్యల్లా ఉన్నాయి కాబట్టి మారాయి.</li>
        <li><code>"abc"</code> ని సంఖ్యగా మార్చలేం కాబట్టి <code>NaN</code> వచ్చింది.</li>
        <li><code>true</code> → <code>1</code>, <code>false</code> → <code>0</code>.</li>
      </ul>

      <p style="margin-top: 15px;">మరికొన్ని ఉదాహరణలు:</p>
      <div class="code-block">
        <pre><code>console.log(Number(" 12 "));
console.log(Number(""));
console.log(Number("12px"));
console.log(Number(null));
console.log(Number(undefined));</code></pre>
      </div>

      <div class="code-output" style="background:#0b1120; border:1px solid #1e293b; border-radius:8px; padding:12px 16px; margin-top:10px; font-family:monospace; color:#38bdf8; font-size:13.5px;">
        <span style="color:#64748b;">Output:</span><br>
        12<br>
        0<br>
        NaN<br>
        0<br>
        NaN
      </div>

      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.6; margin-top: 10px;">
        <li>రెండు వైపులా ఉన్న ఖాళీలు (spaces) ని పట్టించుకోదు: <code>12</code>.</li>
        <li>ఖాళీ string <code>""</code> → <code>0</code> వస్తుంది. ఇది జాగ్రత్తగా గమనించాల్సిన విషయం.</li>
        <li><code>"12px"</code> లో అక్షరాలు ఉన్నాయి కాబట్టి <code>NaN</code>.</li>
      </ul>

      <h3 style="margin-top: 20px; margin-bottom: 8px; font-size: 16px;">ఉదాహరణ: రెండు సంఖ్యలను కూడటం</h3>
      <p>Website లో user టైప్ చేసే ప్రతిదీ <strong>string</strong> గా వస్తుంది. అది సంఖ్యలా కనిపించినా. అందుకే లెక్కలు చేసే ముందు మార్చాలి.</p>
      <div class="code-block">
        <pre><code>const input1 = "25";
const input2 = "15";

console.log(input1 + input2);
console.log(Number(input1) + Number(input2));</code></pre>
      </div>

      <div class="code-output" style="background:#0b1120; border:1px solid #1e293b; border-radius:8px; padding:12px 16px; margin-top:10px; font-family:monospace; color:#38bdf8; font-size:13.5px;">
        <span style="color:#64748b;">Output:</span><br>
        2515<br>
        40
      </div>
      <p style="margin-top: 8px;">మార్చకపోతే <code>"2515"</code> వచ్చింది (అతికింపు), మార్చాక సరైన కూడిక <code>40</code> వచ్చింది.</p>
      <div class="callout">
        <div class="callout-title">💡 చిట్కా:</div>
        <p style="margin-top: 8px; color: var(--text2); font-size: 14.5px;">string ముందు <code>+</code> పెట్టడం కూడా ఒక చిన్న మార్గం: <code>+"25"</code> అంటే <code>25</code>. కానీ కొత్తవారికి <code>Number()</code> చదవడానికి సులభం.</p>
      </div>

      <h3 style="margin-top: 20px; margin-bottom: 8px; font-size: 16px;"><code>parseInt()</code> మరియు <code>parseFloat()</code>: string నుంచి సంఖ్యను తీయడం</h3>
      <p><code>parseInt()</code> string ని ఎడమ నుంచి కుడికి చదివి, పూర్ణ సంఖ్య (integer) ని తీసుకుంటుంది. అక్షరం కనిపించగానే ఆగిపోతుంది.</p>
      <div class="code-block">
        <pre><code>console.log(parseInt("42px"));
console.log(parseInt("3.99"));
console.log(parseInt("abc"));
console.log(parseInt("px42"));</code></pre>
      </div>

      <div class="code-output" style="background:#0b1120; border:1px solid #1e293b; border-radius:8px; padding:12px 16px; margin-top:10px; font-family:monospace; color:#38bdf8; font-size:13.5px;">
        <span style="color:#64748b;">Output:</span><br>
        42<br>
        3<br>
        NaN<br>
        NaN
      </div>

      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.6; margin-top: 10px;">
        <li><code>"42px"</code> → <code>42</code> (<code>p</code> దగ్గర ఆగింది).</li>
        <li><code>"3.99"</code> → <code>3</code> (దశాంశం తీసేసింది, <strong>round చేయదు</strong>, కేవలం కత్తిరిస్తుంది).</li>
        <li><code>"px42"</code> → మొదటి అక్షరమే సంఖ్య కాదు, కాబట్టి <code>NaN</code>.</li>
      </ul>

      <p style="margin-top: 15px;"><code>parseFloat()</code> దశాంశాలను కూడా తీసుకుంటుంది:</p>
      <div class="code-block">
        <pre><code>console.log(parseFloat("3.14abc"));
console.log(parseFloat("2.5"));</code></pre>
      </div>

      <div class="code-output" style="background:#0b1120; border:1px solid #1e293b; border-radius:8px; padding:12px 16px; margin-top:10px; font-family:monospace; color:#38bdf8; font-size:13.5px;">
        <span style="color:#64748b;">Output:</span><br>
        3.14<br>
        2.5
      </div>

      <h3 style="margin-top: 20px; margin-bottom: 8px; font-size: 16px;"><code>Number()</code> మరియు <code>parseInt()</code> మధ్య తేడా</h3>
      <div class="code-block">
        <pre><code>console.log(Number("42px"));
console.log(parseInt("42px"));</code></pre>
      </div>

      <div class="code-output" style="background:#0b1120; border:1px solid #1e293b; border-radius:8px; padding:12px 16px; margin-top:10px; font-family:monospace; color:#38bdf8; font-size:13.5px;">
        <span style="color:#64748b;">Output:</span><br>
        NaN<br>
        42
      </div>

      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.6; margin-top: 10px;">
        <li><code>Number()</code> కఠినంగా ఉంటుంది: మొత్తం string సరైన సంఖ్య అయితేనే మారుస్తుంది.</li>
        <li><code>parseInt()</code> / <code>parseFloat()</code> ఉదారంగా ఉంటాయి: ముందు ఉన్న సంఖ్య భాగాన్ని తీసుకుంటాయి.</li>
      </ul>

      <h3 style="margin-top: 20px; margin-bottom: 8px; font-size: 16px;"><code>String()</code>: ఏదైనా విలువను string గా మార్చడం</h3>
      <div class="code-block">
        <pre><code>console.log(String(123));
console.log(String(true));
console.log(String(null));
console.log(String(undefined));
console.log(typeof String(123));</code></pre>
      </div>

      <div class="code-output" style="background:#0b1120; border:1px solid #1e293b; border-radius:8px; padding:12px 16px; margin-top:10px; font-family:monospace; color:#38bdf8; font-size:13.5px;">
        <span style="color:#64748b;">Output:</span><br>
        123<br>
        true<br>
        null<br>
        undefined<br>
        string
      </div>
      <p style="margin-top: 8px;">Screen మీద చూస్తే <code>123</code> అలాగే కనిపిస్తుంది, కానీ <code>typeof</code> చూస్తే <code>string</code> అని వస్తుంది.</p>

      <h3 style="margin-top: 20px; margin-bottom: 8px; font-size: 16px;"><code>Boolean()</code>: ఏదైనా విలువను true/false గా మార్చడం</h3>
      <div class="code-block">
        <pre><code>console.log(Boolean(1));
console.log(Boolean(0));
console.log(Boolean("hello"));
console.log(Boolean(""));</code></pre>
      </div>

      <div class="code-output" style="background:#0b1120; border:1px solid #1e293b; border-radius:8px; padding:12px 16px; margin-top:10px; font-family:monospace; color:#38bdf8; font-size:13.5px;">
        <span style="color:#64748b;">Output:</span><br>
        true<br>
        false<br>
        true<br>
        false
      </div>
      <p style="margin-top: 8px;">ఏ విలువ <code>true</code> గా, ఏది <code>false</code> గా మారుతుందో తెలుసుకోవడమే తర్వాతి భాగం.</p>
    </div>

    <div class="section-title"><span class="num">5</span>Truthy మరియు Falsy విలువలు</div>
    <div class="section-body">
      <p>JavaScript లో <strong>ప్రతి విలువ</strong> ని boolean గా చూస్తే, అది <code>true</code> లేదా <code>false</code> గా పరిగణించబడుతుంది.</p>
      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.6;">
        <li><strong>Truthy:</strong> boolean గా మారినప్పుడు <code>true</code> అయ్యే విలువలు.</li>
        <li><strong>Falsy:</strong> boolean గా మారినప్పుడు <code>false</code> అయ్యే విలువలు.</li>
      </ul>

      <h3 style="margin-top: 20px; margin-bottom: 8px; font-size: 16px;">Falsy విలువలు (ఇవి కేవలం 6 మాత్రమే గుర్తుంచుకోండి)</h3>
      <table class="tbl">
        <tr><th>Falsy విలువ</th><th>వివరణ</th></tr>
        <tr><td><code>false</code></td><td>boolean false</td></tr>
        <tr><td><code>0</code></td><td>సున్నా</td></tr>
        <tr><td><code>""</code></td><td>ఖాళీ string</td></tr>
        <tr><td><code>null</code></td><td>ఉద్దేశపూర్వకంగా ఖాళీ</td></tr>
        <tr><td><code>undefined</code></td><td>విలువ ఇవ్వలేదు</td></tr>
        <tr><td><code>NaN</code></td><td>Not a Number</td></tr>
      </table>
      <p style="margin-top: 8px; font-size: 13.5px; color: var(--text3);">(మరో రెండు అరుదైనవి ఉన్నాయి: <code>-0</code> మరియు <code>0n</code>. వాటిని ఇప్పుడు పట్టించుకోవక్కర్లేదు.)</p>
      <p style="margin-top: 10px;"><strong>ఇవి తప్ప మిగతావన్నీ Truthy!</strong> ఇది చాలా సులభమైన నియమం.</p>

      <div class="code-block" style="margin-top:15px;">
        <pre><code>console.log(Boolean(0));
console.log(Boolean(""));
console.log(Boolean(null));
console.log(Boolean(undefined));
console.log(Boolean(NaN));</code></pre>
      </div>

      <div class="code-output" style="background:#0b1120; border:1px solid #1e293b; border-radius:8px; padding:12px 16px; margin-top:10px; font-family:monospace; color:#38bdf8; font-size:13.5px;">
        <span style="color:#64748b;">Output:</span><br>
        false<br>
        false<br>
        false<br>
        false<br>
        false
      </div>

      <h3 style="margin-top: 20px; margin-bottom: 8px; font-size: 16px;">ఇప్పుడు ఆశ్చర్యపరిచే truthy విలువలు చూడండి:</h3>
      <div class="code-block">
        <pre><code>console.log(Boolean("0"));
console.log(Boolean("false"));
console.log(Boolean(" "));
console.log(Boolean(-1));
console.log(Boolean("hello"));</code></pre>
      </div>

      <div class="code-output" style="background:#0b1120; border:1px solid #1e293b; border-radius:8px; padding:12px 16px; margin-top:10px; font-family:monospace; color:#38bdf8; font-size:13.5px;">
        <span style="color:#64748b;">Output:</span><br>
        true<br>
        true<br>
        true<br>
        true<br>
        true
      </div>

      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.6; margin-top: 10px;">
        <li><code>"0"</code> అనేది సున్నా కాదు, అది <code>0</code> అనే అక్షరం ఉన్న string, కాబట్టి truthy.</li>
        <li><code>"false"</code> అనేది కేవలం text, boolean <code>false</code> కాదు. అందుకే truthy. (Chapter 4 లో మనం చెప్పిన bug ఇదే!)</li>
        <li><code>" "</code> (ఒక space ఉన్న string) ఖాళీ string కాదు కాబట్టి truthy.</li>
        <li><code>-1</code> సున్నా కాదు, కాబట్టి truthy.</li>
      </ul>
      <p style="margin-top: 8px; font-size: 13.5px; color: var(--text3);">(ఖాళీ array <code>[]</code> మరియు ఖాళీ object <code>{}</code> కూడా truthy. Arrays, objects ని తర్వాత chapters లో నేర్చుకుంటాం.)</p>

      <h3 style="margin-top: 20px; margin-bottom: 8px; font-size: 16px;">Truthy/Falsy ఎందుకు ముఖ్యం?</h3>
      <p>Condition లో boolean ఆశించే చోట ఏ విలువ ఉన్నా, JavaScript దాన్ని truthy లేదా falsy గా చూస్తుంది.</p>
      <div class="code-block">
        <pre><code>const userName = "";
console.log(userName ? "పేరు ఉంది" : "పేరు ఖాళీగా ఉంది");

const city = "హైదరాబాద్";
console.log(city ? "ఊరు ఉంది" : "ఊరు ఖాళీగా ఉంది");</code></pre>
      </div>

      <div class="code-output" style="background:#0b1120; border:1px solid #1e293b; border-radius:8px; padding:12px 16px; margin-top:10px; font-family:monospace; color:#38bdf8; font-size:13.5px;">
        <span style="color:#64748b;">Output:</span><br>
        పేరు ఖాళీగా ఉంది<br>
        ఊరు ఉంది
      </div>
      <p style="margin-top: 8px;">Form లో user ఏదైనా టైప్ చేశాడా లేదా అని చెక్ చేయడానికి ఈ పద్ధతి చాలా ఉపయోగపడుతుంది.</p>

      <h3 style="margin-top: 20px; margin-bottom: 8px; font-size: 16px;"><code>!!</code> ట్రిక్</h3>
      <p>ఏ విలువనైనా నేరుగా <code>true</code>/<code>false</code> గా మార్చడానికి <code>!!</code> (double not) వాడతారు:</p>
      <div class="code-block">
        <pre><code>console.log(!!"hello");
console.log(!!0);</code></pre>
      </div>

      <div class="code-output" style="background:#0b1120; border:1px solid #1e293b; border-radius:8px; padding:12px 16px; margin-top:10px; font-family:monospace; color:#38bdf8; font-size:13.5px;">
        <span style="color:#64748b;">Output:</span><br>
        true<br>
        false
      </div>
      <p style="margin-top: 8px;"><code>Boolean()</code> తో సమానమైన ఫలితం. ఇది code లో కనిపిస్తే భయపడకండి, అర్థం ఇదే.</p>

      <h3 style="margin-top: 20px; margin-bottom: 8px; font-size: 16px;">పోలిక పట్టిక: ఒకే విలువ, మూడు రకాల మార్పులు</h3>
      <table class="tbl">
        <tr><th>విలువ</th><th><code>Number()</code></th><th><code>String()</code></th><th><code>Boolean()</code></th></tr>
        <tr><td><code>""</code></td><td><code>0</code></td><td><code>""</code></td><td><code>false</code></td></tr>
        <tr><td><code>"42"</code></td><td><code>42</code></td><td><code>"42"</code></td><td><code>true</code></td></tr>
        <tr><td><code>"abc"</code></td><td><code>NaN</code></td><td><code>"abc"</code></td><td><code>true</code></td></tr>
        <tr><td><code>0</code></td><td><code>0</code></td><td><code>"0"</code></td><td><code>false</code></td></tr>
        <tr><td><code>true</code></td><td><code>1</code></td><td><code>"true"</code></td><td><code>true</code></td></tr>
        <tr><td><code>null</code></td><td><code>0</code></td><td><code>"null"</code></td><td><code>false</code></td></tr>
        <tr><td><code>undefined</code></td><td><code>NaN</code></td><td><code>"undefined"</code></td><td><code>false</code></td></tr>
      </table>
    </div>

    <div class="section-title"><span class="num">6</span>Template Literals: text ని సులభంగా రాయడం</div>
    <div class="section-body">
      <p>ఇప్పటివరకు variables తో text ని కలపాలంటే <code>+</code> వాడాం. ఉదాహరణకు:</p>
      <div class="code-block">
        <pre><code>const name = "రవి";
const age = 20;

console.log("నా పేరు " + name + ", నా వయసు " + age);</code></pre>
      </div>

      <div class="code-output" style="background:#0b1120; border:1px solid #1e293b; border-radius:8px; padding:12px 16px; margin-top:10px; font-family:monospace; color:#38bdf8; font-size:13.5px;">
        <span style="color:#64748b;">Output:</span><br>
        నా పేరు రవి, నా వయసు 20
      </div>
      <p style="margin-top: 8px;">పని చేస్తుంది, కానీ quotes, <code>+</code> గుర్తులు, ఖాళీలు, అన్నీ చూసుకోవడం కష్టం. పెద్ద వాక్యాల్లో పొరపాట్లు తప్పవు. దీనికి సులభమైన మార్గమే <strong>Template Literals</strong>.</p>

      <h3 style="margin-top: 20px; margin-bottom: 8px; font-size: 16px;">Backticks మరియు <code>&#36;{}</code></h3>
      <p>Template literal ని <code>" "</code> బదులు <strong>backticks</strong> <code>&#96; &#96;</code> తో రాస్తాం. (Keyboard లో <code>1</code> పక్కన, <code>Tab</code> పైన ఉన్న key.) లోపల variable విలువ చేర్చాలంటే <code>&#36;{variableName}</code> అని రాస్తాం.</p>
      <div class="code-block">
        <pre><code>const name = "రవి";
const age = 20;

console.log(&#96;నా పేరు &#36;{name}, నా వయసు &#36;{age}&#96;);</code></pre>
      </div>

      <div class="code-output" style="background:#0b1120; border:1px solid #1e293b; border-radius:8px; padding:12px 16px; margin-top:10px; font-family:monospace; color:#38bdf8; font-size:13.5px;">
        <span style="color:#64748b;">Output:</span><br>
        నా పేరు రవి, నా వయసు 20
      </div>
      <p style="margin-top: 8px;">ఫలితం ఒకటే, కానీ ఎంత శుభ్రంగా, చదవడానికి సులభంగా ఉందో చూడండి! <code>+</code> మరియు quotes గందరగోళం లేదు.</p>

      <h3 style="margin-top: 20px; margin-bottom: 8px; font-size: 16px;"><code>&#36;{}</code> లోపల expressions కూడా రాయొచ్చు</h3>
      <p><code>&#36;{ }</code> లోపల కేవలం variable పేరు మాత్రమే కాదు, లెక్కలు, పోలికలు, ternary కూడా రాయొచ్చు.</p>
      <div class="code-block">
        <pre><code>const price = 250;
const quantity = 3;
const marks = 60;

console.log(&#96;2 + 3 = &#36;{2 + 3}&#96;);
console.log(&#96;మొత్తం బిల్లు: ₹&#36;{price * quantity}&#96;);
console.log(&#96;ఫలితం: &#36;{marks >= 35 ? "Pass" : "Fail"}&#96;);</code></pre>
      </div>

      <div class="code-output" style="background:#0b1120; border:1px solid #1e293b; border-radius:8px; padding:12px 16px; margin-top:10px; font-family:monospace; color:#38bdf8; font-size:13.5px;">
        <span style="color:#64748b;">Output:</span><br>
        2 + 3 = 5<br>
        మొత్తం బిల్లు: ₹750<br>
        ఫలితం: Pass
      </div>

      <h3 style="margin-top: 20px; margin-bottom: 8px; font-size: 16px;">Multi-line strings (ఎక్కువ లైన్ల text)</h3>
      <p>పాత పద్ధతిలో ఎక్కువ లైన్లు కావాలంటే <code>\\n</code> (కొత్త లైన్ గుర్తు) వాడాలి:</p>
      <div class="code-block">
        <pre><code>console.log("మొదటి లైన్\\nరెండో లైన్");</code></pre>
      </div>

      <div class="code-output" style="background:#0b1120; border:1px solid #1e293b; border-radius:8px; padding:12px 16px; margin-top:10px; font-family:monospace; color:#38bdf8; font-size:13.5px;">
        <span style="color:#64748b;">Output:</span><br>
        మొదటి లైన్<br>
        రెండో లైన్
      </div>

      <p style="margin-top: 15px;">Template literal తో, Enter నొక్కి కొత్త లైన్ లో రాస్తే చాలు:</p>
      <div class="code-block">
        <pre><code>const message = &#96;నమస్కారం,
ఇది రెండో లైన్,
ఇది మూడో లైన్&#96;;

console.log(message);</code></pre>
      </div>

      <div class="code-output" style="background:#0b1120; border:1px solid #1e293b; border-radius:8px; padding:12px 16px; margin-top:10px; font-family:monospace; color:#38bdf8; font-size:13.5px;">
        <span style="color:#64748b;">Output:</span><br>
        నమస్కారం,<br>
        ఇది రెండో లైన్,<br>
        ఇది మూడో లైన్
      </div>

      <h3 style="margin-top: 20px; margin-bottom: 8px; font-size: 16px;">ఉదాహరణ: విద్యార్థి Report</h3>
      <div class="code-block">
        <pre><code>const studentName = "సీత";
const maths = 80;
const science = 70;
const english = 90;

const total = maths + science + english;
const average = total / 3;

console.log(&#96;విద్యార్థి: &#36;{studentName}
Maths: &#36;{maths}
Science: &#36;{science}
English: &#36;{english}
మొత్తం: &#36;{total}
సగటు: &#36;{average}
ఫలితం: &#36;{average >= 35 ? "Pass" : "Fail"}&#96;);</code></pre>
      </div>

      <div class="code-output" style="background:#0b1120; border:1px solid #1e293b; border-radius:8px; padding:12px 16px; margin-top:10px; font-family:monospace; color:#38bdf8; font-size:13.5px;">
        <span style="color:#64748b;">Output:</span><br>
        విద్యార్థి: సీత<br>
        Maths: 80<br>
        Science: 70<br>
        English: 90<br>
        మొత్తం: 240<br>
        సగటు: 80<br>
        ఫలితం: Pass
      </div>
      <p style="margin-top: 8px;">ఒకే template లో variables, లెక్కలు, ternary, multi-line అన్నీ కలిపి వాడాం. ఇదే Template Literals శక్తి.</p>

      <h3 style="margin-top: 20px; margin-bottom: 8px; font-size: 16px;">ఎప్పుడు ఏది వాడాలి?</h3>
      <table class="tbl">
        <tr><th>సందర్భం</th><th>వాడాల్సినది</th></tr>
        <tr><td>Variables లేని సాధారణ text</td><td><code>"..."</code> లేదా <code>'...'</code></td></tr>
        <tr><td>Variables తో కలిపిన text</td><td><code>&#96;...&#36;{variable}...&#96;</code></td></tr>
        <tr><td>ఎక్కువ లైన్ల text</td><td><code>&#96;...&#96;</code></td></tr>
      </table>
    </div>

    <div class="callout callout-warning">
      <div class="callout-title">⚠️ Beginners చేసే సాధారణ తప్పులు</div>
      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.6;">
        <li>
          <strong>1. లెక్కలకు ముందు string ని number గా మార్చకపోవడం:</strong>
          <pre style="margin-top:5px; background:rgba(0,0,0,0.25); padding:8px; border-radius:6px;"><code>console.log("10" + 5);         // "105"
console.log(Number("10") + 5); // 15</code></pre>
        </li>
        <li style="margin-top:10px;">
          <strong>2. <code>parseInt("abc")</code> <code>NaN</code> ఇస్తుందని మర్చిపోవడం:</strong>
          <pre style="margin-top:5px; background:rgba(0,0,0,0.25); padding:8px; border-radius:6px;"><code>const value = parseInt("abc");
console.log(value);                // NaN
console.log(value + 10);           // NaN
console.log(Number.isNaN(value));  // true</code></pre>
          <code>NaN</code> తో ఏ లెక్క చేసినా <code>NaN</code> నే వస్తుంది. మార్చిన తర్వాత <code>Number.isNaN()</code> తో సరైన సంఖ్య వచ్చిందో లేదో చెక్ చేయండి. (<code>value === NaN</code> అని రాస్తే ఎప్పుడూ <code>false</code> వస్తుంది, Chapter 4 లో చూశాం.)
        </li>
        <li style="margin-top:10px;">
          <strong>3. ఖాళీ string <code>Number("")</code> తో <code>0</code> అవుతుందని మర్చిపోవడం:</strong>
          User ఏమీ టైప్ చేయకపోతే <code>""</code> వస్తుంది. <code>Number("")</code> అది <code>0</code> గా మారుస్తుంది, <code>NaN</code> కాదు. కాబట్టి "user సంఖ్య ఇవ్వలేదు" అని గుర్తించడానికి ముందు, string ఖాళీనా కాదా అని చెక్ చేయాలి.
        </li>
        <li style="margin-top:10px;">
          <strong>4. <code>parseInt</code> దశాంశాన్ని round చేస్తుందనుకోవడం:</strong>
          <pre style="margin-top:5px; background:rgba(0,0,0,0.25); padding:8px; border-radius:6px;"><code>console.log(parseInt("3.99")); // 3</code></pre>
          ఇది <code>4</code> కాదు. కేవలం దశాంశ భాగాన్ని కత్తిరిస్తుంది.
        </li>
        <li style="margin-top:10px;">
          <strong>5. <code>"0"</code> మరియు <code>"false"</code> ని falsy అనుకోవడం:</strong>
          ఇవి రెండూ <strong>truthy</strong>. ఖాళీ కాని ఏ string అయినా truthy.
        </li>
        <li style="margin-top:10px;">
          <strong>6. Template literal లో backticks కి బదులు సాధారణ quotes వాడటం:</strong>
          <pre style="margin-top:5px; background:rgba(0,0,0,0.25); padding:8px; border-radius:6px;"><code>// తప్పు:
console.log("నా పేరు &#36;{name}"); // Output: నా పేరు &#36;{name}</code></pre>
          సాధారణ quotes లో <code>&#36;{}</code> పని చేయదు, అది కేవలం text లాగే కనిపిస్తుంది. <code>&#36;{}</code> వాడాలంటే <strong>backticks</strong> (<code>&#96;</code>) తప్పనిసరి.
        </li>
      </ul>
    </div>

    <div class="section-title"><span class="num">7</span>ప్రాక్టీస్ ప్రశ్నలు & సమాధానాలు</div>
    <div class="section-body">
      <ol style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.6;">
        <li><code>"100"</code> మరియు <code>"50"</code> అనే రెండు strings ని number లుగా మార్చి కూడండి.</li>
        <li>ఈ ఫలితాలు ఏమిటి? <code>Number("abc")</code>, <code>parseInt("25kg")</code>, <code>parseFloat("2.5m")</code>, <code>Number(true)</code>, <code>String(99) + 1</code>.</li>
        <li>కింది విలువలు Truthy నా Falsy నా చెప్పండి: <code>0</code>, <code>"hello"</code>, <code>""</code>, <code>" "</code>, <code>null</code>, <code>"0"</code>, <code>NaN</code>, <code>5</code>.</li>
        <li><code>name</code>, <code>city</code>, <code>age</code> variables తీసుకుని, template literal తో "నా పేరు ..., నేను ... లో ఉంటాను, నా వయసు ..." అనే వాక్యం print చేయండి.</li>
        <li>ఈ code <code>30</code> print చేసేలా సరిచేయండి: <code>let a = "10"; let b = "20"; console.log(a + b);</code></li>
      </ol>

      <details style="margin-top: 15px; background: var(--bg2); border: 1px solid var(--border); padding: 12px; border-radius: 8px; cursor: pointer;">
        <summary style="font-weight: bold; color: var(--text);">సమాధానాలు చూడండి</summary>
        <div style="margin-top: 10px; font-size: 14px; color: var(--text2); line-height: 1.6;">
          <p><strong>1.</strong></p>
          <pre style="background:rgba(0,0,0,0.25); padding:8px; border-radius:6px;"><code>const a = "100";
const b = "50";
console.log(Number(a) + Number(b));</code></pre>
          <p>Output: <code>150</code></p>

          <p style="margin-top: 12px;"><strong>2.</strong></p>
          <pre style="background:rgba(0,0,0,0.25); padding:8px; border-radius:6px;"><code>NaN
25
2.5
1
991</code></pre>
          <p><code>String(99) + 1</code> లో <code>String(99)</code> అనేది <code>"99"</code>, దానికి <code>1</code> అతికింది కాబట్టి <code>"991"</code>.</p>

          <p style="margin-top: 12px;"><strong>3.</strong> <code>0</code> → Falsy, <code>"hello"</code> → Truthy, <code>""</code> → Falsy, <code>" "</code> → Truthy (space ఉంది), <code>null</code> → Falsy, <code>"0"</code> → Truthy, <code>NaN</code> → Falsy, <code>5</code> → Truthy.</p>

          <p style="margin-top: 12px;"><strong>4.</strong></p>
          <pre style="background:rgba(0,0,0,0.25); padding:8px; border-radius:6px;"><code>const name = "రవి";
const city = "హైదరాబాద్";
const age = 20;

console.log(&#96;నా పేరు &#36;{name}, నేను &#36;{city} లో ఉంటాను, నా వయసు &#36;{age}&#96;);</code></pre>
          <p>Output: <code>నా పేరు రవి, నేను హైదరాబాద్ లో ఉంటాను, నా వయసు 20</code></p>

          <p style="margin-top: 12px;"><strong>5.</strong></p>
          <pre style="background:rgba(0,0,0,0.25); padding:8px; border-radius:6px;"><code>let a = "10";
let b = "20";
console.log(Number(a) + Number(b));</code></pre>
          <p>Output: <code>30</code></p>
        </div>
      </details>
    </div>

    <div class="try-box">
      <div class="try-title">🚀 మీరే try చేయండి</div>
      <p style="color:var(--text2); font-size:14px; margin-bottom:12px;">ఈ code ని మన compiler లో run చేయండి. Strings లో ఉన్న విలువలను number గా మార్చి, template literal తో బిల్లు తయారు చేస్తుంది. విలువలు మార్చి ఫలితం చూడండి:</p>
      <div class="code-block">
        <pre><code>const pricePerKg = "45.50";
const kilos = "3";

const total = parseFloat(pricePerKg) * Number(kilos);

console.log(&#96;ధర: ₹&#36;{pricePerKg} per kg&#96;);
console.log(&#96;పరిమాణం: &#36;{kilos} kg&#96;);
console.log(&#96;మొత్తం బిల్లు: ₹&#36;{total}&#96;);</code></pre>
      </div>
      <a class="run-btn" href="/?lang=nodejs">👉 Our Compiler లో JavaScript try చేయండి</a>
    </div>

    <div class="intro-box" style="background: rgba(34, 197, 94, 0.1); border-color: rgba(34, 197, 94, 0.3); margin-top:30px;">
      <h3 style="color:#22c55e; margin-bottom:8px;">📌 Quick Summary (సారాంశం):</h3>
      <ul style="margin-left: 20px; color: var(--text2); line-height: 1.6;">
        <li><strong>Type conversion</strong> అంటే ఒక data type ని ఇంకో దాని గా మార్చడం. <strong>Implicit</strong> (JavaScript తనంతట తానే) మరియు <strong>Explicit</strong> (మనమే) అని రెండు రకాలు.</li>
        <li><code>Number()</code> ఏదైనా విలువను number గా మారుస్తుంది. సరిపోకపోతే <code>NaN</code>.</li>
        <li><code>parseInt()</code> / <code>parseFloat()</code> string ముందు భాగంలో ఉన్న సంఖ్యను తీసుకుంటాయి.</li>
        <li><code>String()</code> ఏదైనా విలువను string గా, <code>Boolean()</code> true/false గా మారుస్తుంది.</li>
        <li><strong>6 Falsy విలువలు:</strong> <code>false</code>, <code>0</code>, <code>""</code>, <code>null</code>, <code>undefined</code>, <code>NaN</code>. మిగతావన్నీ Truthy (<code>"0"</code>, <code>"false"</code>, <code>" "</code> కూడా).</li>
        <li><strong>Template literals:</strong> backticks <code>&#96; &#96;</code> తో రాసి, <code>&#36;{}</code> లో variables/expressions పెట్టొచ్చు. Multi-line text కూడా సులభంగా రాయొచ్చు.</li>
        <li>User ఇచ్చే input ఎప్పుడూ string గా వస్తుంది. లెక్కలకు ముందు <code>Number()</code> తో మార్చండి.</li>
      </ul>
    </div>
`;

// Replace buildLesson6 in code
const startIdx = code.indexOf('function buildLesson6() {');
const nextFnIdx = code.indexOf('// ── UPDATE blog-javascript.html HOME PAGE', startIdx);

if (startIdx === -1 || nextFnIdx === -1) {
  console.error("Could not find buildLesson6 markers!");
  process.exit(1);
}

const lesson6Func = `function buildLesson6() {
  const title = "JavaScript Type Conversion తెలుగులో | Number(), parseInt(), Template Literals";
  const desc = "JavaScript లో string ని number గా మార్చడం, Number(), parseInt(), String(), Boolean(), truthy falsy విలువలు మరియు template literals (backticks) ని తెలుగులో ఉదాహరణలతో నేర్చుకోండి.";
  const filename = "06-browser-input-and-number-parsing.html";
  const subtopics = "Implicit vs Explicit · Number() · parseInt() · parseFloat() · String() · Boolean() · Truthy & Falsy · Template Literals (Backticks)";

  const contentBody = String.raw\`${chapter6Raw}\`;

  const html = wrapJSLessonPage(title, desc, filename, 6, subtopics, contentBody, '05-operators-expressions-and-precedence.html', '5. Operators & Precedence', 'conditionals.html', '7. Conditionals (if-else & switch)');
  fs.writeFileSync(path.join(jsDir, filename), html, 'utf8');

  // Also write type-conversion.html mirror for direct slug routing if visited
  const slugFilename = "type-conversion.html";
  const slugHtml = wrapJSLessonPage(title, desc, slugFilename, 6, subtopics, contentBody, '05-operators-expressions-and-precedence.html', '5. Operators & Precedence', 'conditionals.html', '7. Conditionals (if-else & switch)');
  fs.writeFileSync(path.join(jsDir, slugFilename), slugHtml, 'utf8');

  console.log(\`✅ Generated \${filename} and \${slugFilename}\`);
}

`;

code = code.slice(0, startIdx) + lesson6Func + code.slice(nextFnIdx);

fs.writeFileSync(phase3Path, code, 'utf8');
console.log("Successfully updated Chapter 6 in build_javascript_phase3.js");
