const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const jsDir = path.join(publicDir, 'blog-javascript');

const master = require('./build_master_js_curriculum.js');

const chapter11Body = `
    <!-- ====================================================================
         👇 CHAPTER CONTENT: Chapter 11 break & continue (Telugu) 👇
         ==================================================================== -->

    <div class="intro-box">
      <h3 style="margin-bottom:10px; font-size:18px;">🔑 తాళం చెవుల గుత్తి మరియు కరివేపాకు ఉపమానం</h3>
      <p>మీ దగ్గర <strong>10 తాళం చెవుల గుత్తి</strong> ఉందనుకోండి. ఇంటి తలుపు తెరవడానికి ఒక్కో తాళం చెవిని ప్రయత్నిస్తున్నారు. నాలుగో తాళం చెవితో తలుపు తెరుచుకుంది. మిగతా ఆరింటిని కూడా ప్రయత్నిస్తారా? లేదు కదా! పని అయిపోయింది, అక్కడితో ఆపేస్తారు. అదే <code>break</code>.</p>
      <p>ఇప్పుడు భోజనం చేస్తున్నారనుకోండి. పప్పులో <strong>కరివేపాకు</strong> కనిపించింది. దాన్ని పక్కన పెట్టి, మిగతా అన్నం తింటూనే ఉంటారు. భోజనం ఆపరు, ఆ ఒక్కదాన్ని మాత్రమే వదిలేసి ముందుకు సాగుతారు. అదే <code>continue</code>.</p>
      <p style="margin-top:10px;">Chapter 10 లో మనం loops గురించి నేర్చుకున్నాం. సాధారణంగా loops షరతు <code>false</code> అయ్యేంత వరకు తిరుగుతాయి. కానీ కొన్నిసార్లు, పని ముగియగానే loop ని మధ్యలోనే ఆపేయాలి (<strong>break</strong>), లేదా ఏదైనా ఒక రౌండ్ ని దాటేసి తర్వాతి రౌండ్ కి వెళ్ళాలి (<strong>continue</strong>). ఈ chapter లో ఈ రెండు కీలకమైన Loop Control Statements గురించి లోతుగా నేర్చుకుందాం.</p>
    </div>

    <div class="section-title"><span class="num">1</span>ఈ chapter లో మీరు నేర్చుకునేవి</div>
    <div class="section-body">
      <ul style="margin-left: 20px; color: var(--text2); font-size: 15px; line-height: 1.8;">
        <li><code>break</code> తో loop ని మధ్యలోనే ఆపేయడం</li>
        <li><code>continue</code> తో ఒక రౌండ్ ని మాత్రమే దాటేయడం (skip)</li>
        <li>వాస్తవ ప్రపంచ ఉదాహరణ: <strong>Prime Number</strong> ని వేగంగా check చేయడం</li>
        <li>Nested loops లో <code>break</code> ఎలా ప్రవర్తిస్తుంది & <strong>Labelled break</strong></li>
        <li><code>continue</code> వల్ల వచ్చే ప్రమాదకరమైన <strong>Infinite Loop</strong> సమస్య మరియు పరిష్కారం</li>
        <li>Beginners చేసే సాధారణ తప్పులు & సమగ్ర ప్రాక్టీస్ ప్రశ్నలు</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">2</span>break: loop ని ఆపేయడం</div>
    <div class="section-body">
      <p style="font-size: 15px; line-height: 1.8; color: var(--text);">
        Loop తిరుగుతున్నప్పుడు <code>break</code> స్టేట్‌మెంట్ కనిపించగానే, JavaScript ఆ loop ని <strong>వెంటనే ముగించి</strong>, loop block తర్వాత ఉన్న code కి వెళ్ళిపోతుంది. Loop షరతు ఇంకా <code>true</code> గా ఉన్నా సరే, ఇక ఏ రౌండ్‌నూ తిరగదు.
      </p>

      <h3 style="margin-top: 24px; margin-bottom: 8px; font-size: 16px;">ఉదాహరణ 1: సాధారణ break</h3>
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — break Basic</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>for (let i = 1; i <= 10; i++) {
  if (i === 5) {
    break;
  }
  console.log(i);
}</code></pre>
      </div>
      <div class="code-output" style="background:#0b1120; border:1px solid #1e293b; border-radius:8px; padding:12px 16px; margin-top:10px; font-family:monospace; color:#38bdf8; font-size:13.5px;">
        <span style="color:#64748b;">Output:</span><br>
        1<br>
        2<br>
        3<br>
        4
      </div>

      <h3 style="margin-top: 20px; margin-bottom: 8px; font-size: 16px;">Code అర్థం చేసుకుందాం:</h3>
      <ol style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.7;">
        <li>ఈ loop సాధారణంగా <code>1</code> నుంచి <code>10</code> వరకు తిరగాలి.</li>
        <li><code>i</code> విలువ 1, 2, 3, 4 ఉన్నంత వరకు <code>if (i === 5)</code> కండిషన్ <code>false</code> అయ్యింది, కాబట్టి ఆ సంఖ్యలు console లో print అయ్యాయి.</li>
        <li><code>i = 5</code> అయినప్పుడు <code>if (i === 5)</code> కండిషన్ <code>true</code> అయ్యి, లోపల ఉన్న <code>break</code> అమలయ్యింది. దాంతో loop తక్షణమే ఆగిపోయింది.</li>
        <li>అందుకే <code>5</code> print అవ్వలేదు, అలాగే <code>6</code> నుంచి <code>10</code> వరకు ఉన్న మిగతా రౌండ్లు ఏవీ అసలు రన్ అవ్వలేదు.</li>
      </ol>

      <h3 style="margin-top: 24px; margin-bottom: 8px; font-size: 16px;">ఉదాహరణ 2: తాళం చెవి వెతకడం (Searching in Data)</h3>
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — Real-world Search</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>const correctKey = 4;

for (let key = 1; key <= 10; key++) {
  console.log(\`key \${key} try చేస్తున్నాం\`);
  if (key === correctKey) {
    console.log("తాళం తెరుచుకుంది!");
    break;
  }
}</code></pre>
      </div>
      <div class="code-output" style="background:#0b1120; border:1px solid #1e293b; border-radius:8px; padding:12px 16px; margin-top:10px; font-family:monospace; color:#38bdf8; font-size:13.5px;">
        <span style="color:#64748b;">Output:</span><br>
        key 1 try చేస్తున్నాం<br>
        key 2 try చేస్తున్నాం<br>
        key 3 try చేస్తున్నాం<br>
        key 4 try చేస్తున్నాం<br>
        తాళం తెరుచుకుంది!
      </div>

      <p style="font-size: 14.5px; line-height: 1.7; color: var(--text2); margin-top: 12px;">
        సరైన key దొరికిన వెంటనే loop ఆగింది. మిగతా 6 keys ని ప్రయత్నించే వృథా పని తప్పింది. ఇదే <code>break</code> యొక్క అసలు ఉపయోగం: <strong>కావాల్సింది దొరికాక, మిగతా పనిని ఆపేయడం</strong>. లక్షల రికార్డులున్న పెద్ద డేటాబేస్ లో ఏదైనా వెతికేటప్పుడు ఇది CPU సమయాన్ని మరియు మెమరీని విపరీతంగా ఆదా చేస్తుంది.
      </p>

      <h3 style="margin-top: 24px; margin-bottom: 8px; font-size: 16px;">ఉదాహరణ 3: while (true) తో break వాడటం</h3>
      <p style="font-size: 14.5px; line-height: 1.7; color: var(--text2);">
        కొన్నిసార్లు <em>"ఎప్పటికీ తిరుగుతూ ఉండు, నేను చెప్పినప్పుడు మాత్రమే ఆగు"</em> అని loop రాస్తారు. దానికి <code>while (true)</code> వాడి, నిర్దిష్ట పరిస్థితి వచ్చినప్పుడు లోపల <code>break</code> పెడతారు.
      </p>
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — while (true) with break</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>let n = 1;

while (true) {
  if (n > 3) {
    break;
  }
  console.log(n);
  n++;
}</code></pre>
      </div>
      <div class="code-output" style="background:#0b1120; border:1px solid #1e293b; border-radius:8px; padding:12px 16px; margin-top:10px; font-family:monospace; color:#38bdf8; font-size:13.5px;">
        <span style="color:#64748b;">Output:</span><br>
        1<br>
        2<br>
        3
      </div>
      <p style="font-size: 14px; line-height: 1.6; color: var(--text2); margin-top: 8px;">
        <code>while (true)</code> అంటే షరతు ఎల్లప్పుడూ <code>true</code> కాబట్టి, <code>break</code> లేకపోతే ఇది అంతులేని loop గా మారిపోతుంది. ఇక్కడ <code>n > 3</code> అయినప్పుడు <code>break</code> దాన్ని సురక్షితంగా ఆపింది. ఇలాంటి కోడ్ రాసేటప్పుడు ఎప్పుడో ఒకప్పుడు <code>break</code> తప్పక ట్రిగ్గర్ అయ్యేలా చూసుకోవాలి.
      </p>
    </div>

    <div class="section-title"><span class="num">3</span>continue: ఒక రౌండ్ ని దాటేయడం</div>
    <div class="section-body">
      <p style="font-size: 15px; line-height: 1.8; color: var(--text);">
        <code>continue</code> కనిపించగానే, ఆ రౌండ్ లో మిగిలిన code ని వదిలేసి, <strong>నేరుగా తర్వాతి రౌండ్ కి</strong> వెళ్తుంది. Loop మాత్రం ఆగదు!
      </p>

      <h3 style="margin-top: 24px; margin-bottom: 8px; font-size: 16px;">ఉదాహరణ 1: సాధారణ continue</h3>
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — continue Basic</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>for (let i = 1; i <= 5; i++) {
  if (i === 3) {
    continue;
  }
  console.log(i);
}</code></pre>
      </div>
      <div class="code-output" style="background:#0b1120; border:1px solid #1e293b; border-radius:8px; padding:12px 16px; margin-top:10px; font-family:monospace; color:#38bdf8; font-size:13.5px;">
        <span style="color:#64748b;">Output:</span><br>
        1<br>
        2<br>
        4<br>
        5
      </div>
      <p style="font-size: 14.5px; line-height: 1.7; color: var(--text2); margin-top: 10px;">
        <code>i = 3</code> అయినప్పుడు <code>continue</code> రన్ అయ్యి, ఆ రౌండ్ లో కిందున్న <code>console.log(i)</code> ని దాటేసింది. కానీ loop ఆగలేదు! వెంటనే <code>i = 4</code> కి వెళ్ళి మిగతా సంఖ్యలను ప్రింట్ చేసింది. అందుకే <code>3</code> మాత్రమే మిస్ అయ్యింది.
      </p>

      <h3 style="margin-top: 24px; margin-bottom: 8px; font-size: 16px;">ఉదాహరణ 2: 3 తో భాగింపబడే సంఖ్యలను దాటేయడం</h3>
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — Skip Multiples of 3</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>for (let i = 1; i <= 10; i++) {
  if (i % 3 === 0) {
    continue;
  }
  console.log(i);
}</code></pre>
      </div>
      <div class="code-output" style="background:#0b1120; border:1px solid #1e293b; border-radius:8px; padding:12px 16px; margin-top:10px; font-family:monospace; color:#38bdf8; font-size:13.5px;">
        <span style="color:#64748b;">Output:</span><br>
        1<br>
        2<br>
        4<br>
        5<br>
        7<br>
        8<br>
        10
      </div>
      <p style="font-size: 14.5px; line-height: 1.7; color: var(--text2); margin-top: 10px;">
        3, 6, 9 (3 తో భాగింపబడే సంఖ్యలు) వచ్చినప్పుడు శేషం 0 అవుతుంది (<code>i % 3 === 0</code>), కాబట్టి <code>continue</code> అయ్యి అవి ప్రింట్ అవ్వలేదు. (మాడ్యులో <code>%</code> ఆపరేటర్ ని Chapter 5 లో నేర్చుకున్నాం, గుర్తుందా?).
      </p>
    </div>

    <div class="section-title"><span class="num">4</span>break మరియు continue మధ్య తేడా (Comparison)</div>
    <div class="section-body">
      <div style="overflow-x: auto; margin: 16px 0;">
        <table style="width: 100%; border-collapse: collapse; background: var(--bg2); border: 1px solid var(--border); border-radius: 8px; font-size: 14px;">
          <thead>
            <tr style="background: rgba(247, 223, 30, 0.12); border-bottom: 2px solid var(--border);">
              <th style="padding: 12px 16px; text-align: left; color: #f7df1e;">లక్షణం / ఫీచర్</th>
              <th style="padding: 12px 16px; text-align: left; color: #ff7b72;">break</th>
              <th style="padding: 12px 16px; text-align: left; color: #3fb950;">continue</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid var(--border);">
              <td style="padding: 12px 16px; font-weight: 600; color: var(--text);">ఏం చేస్తుంది?</td>
              <td style="padding: 12px 16px; color: var(--text2);">Loop ని పూర్తిగా ఆపేస్తుంది (Terminate).</td>
              <td style="padding: 12px 16px; color: var(--text2);">ప్రస్తుత రౌండ్ ని మాత్రమే దాటేస్తుంది (Skip).</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--border);">
              <td style="padding: 12px 16px; font-weight: 600; color: var(--text);">తర్వాత ఏం జరుగుతుంది?</td>
              <td style="padding: 12px 16px; color: var(--text2);">Loop బయట, కింద ఉన్న code కి వెళ్తుంది.</td>
              <td style="padding: 12px 16px; color: var(--text2);">Loop లోని తర్వాతి రౌండ్ మొదలవుతుంది.</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; font-weight: 600; color: var(--text);">నిజ జీవిత ఉపమానం</td>
              <td style="padding: 12px 16px; color: var(--text2);">తాళం చెవి దొరికింది, ఇక వెతకడం ఆపేశాం.</td>
              <td style="padding: 12px 16px; color: var(--text2);">కరివేపాకు పక్కన పెట్టి భోజనం కొనసాగించాం.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="section-title"><span class="num">5</span>రియల్-లైఫ్ ప్రాజెక్ట్: Prime Number Check</div>
    <div class="section-body">
      <p style="font-size: 15px; line-height: 1.8; color: var(--text);">
        <strong>Prime సంఖ్య (ప్రధాన సంఖ్య):</strong> 1 మరియు అదే సంఖ్య తప్ప, మరే సంఖ్యతోనూ భాగింపబడని సంఖ్య (ఉదాహరణకు: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29...). ఉదాహరణకు <strong>29</strong> prime, ఎందుకంటే 2 నుంచి 28 వరకు ఏ సంఖ్యతో భాగించినా శేషం 0 రాదు.
      </p>
      <p style="font-size: 15px; line-height: 1.8; color: var(--text2);">
        ఒక సంఖ్య prime అవునా కాదా చెక్ చేయడానికి, 2 నుంచి (సంఖ్య - 1) వరకు ప్రతి సంఖ్యతో భాగించి చూస్తాం. ఏదైనా ఒక్క సంఖ్యతో భాగింపబడినా, అది prime కాదని వెంటనే తెలిసిపోతుంది! ఇక మిగతా సంఖ్యలను చెక్ చేయాల్సిన అవసరమే లేదు. సరిగ్గా ఇక్కడే <code>break</code> ఎంతో విలువైనది.
      </p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — Prime Number Check</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>const num = 29;
let isPrime = num > 1;

for (let i = 2; i < num; i++) {
  if (num % i === 0) {
    isPrime = false;
    break; // భాగింపబడింది, ఇక మిగతావి చెక్ చేయాల్సిన పనిలేదు!
  }
}

console.log(\`\${num} \${isPrime ? "prime సంఖ్య" : "prime కాదు"}\`);</code></pre>
      </div>
      <div class="code-output" style="background:#0b1120; border:1px solid #1e293b; border-radius:8px; padding:12px 16px; margin-top:10px; font-family:monospace; color:#38bdf8; font-size:13.5px;">
        <span style="color:#64748b;">Output:</span><br>
        29 prime సంఖ్య
      </div>

      <p style="font-size: 14.5px; line-height: 1.7; color: var(--text2); margin-top: 14px;">
        ఒకవేళ మీరు పైన <code>const num = 15;</code> అని మార్చి రన్ చేస్తే:
      </p>
      <div class="code-output" style="background:#0b1120; border:1px solid #1e293b; border-radius:8px; padding:12px 16px; margin-top:8px; font-family:monospace; color:#38bdf8; font-size:13.5px;">
        <span style="color:#64748b;">Output:</span><br>
        15 prime కాదు
      </div>

      <h3 style="margin-top: 20px; margin-bottom: 8px; font-size: 16px;">Code అర్థం చేసుకుందాం:</h3>
      <ol style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.7;">
        <li><code>isPrime</code> ని మొదట <code>true</code> అనుకున్నాం (సంఖ్య 1 కంటే ఎక్కువ ఉంటేనే; అందుకే <code>num > 1</code>. 0, 1 లేదా ఋణ సంఖ్యలు prime కావు).</li>
        <li>Loop <code>2</code> నుంచి <code>num - 1</code> వరకు తిరుగుతుంది.</li>
        <li><code>num % i === 0</code> అంటే num, i తో పూర్తిగా భాగింపబడింది. అప్పుడు అది prime కాదు, కాబట్టి <code>isPrime = false</code> చేసి <code>break</code> తో వెంటనే లూప్‌ను ఆపాం.</li>
        <li><strong>15 కి ఏం జరిగింది?</strong>: <code>i = 2</code> వద్ద (15 % 2 = 1, కాదు), <code>i = 3</code> వద్ద (15 % 3 = 0, అవును!), అక్కడే <code>break</code> అయ్యింది! 4 నుంచి 14 వరకు 11 రౌండ్లు అనవసరంగా చెక్ చేయకుండా CPU సమయం ఆదా అయ్యింది.</li>
        <li><strong>29 కి ఏం జరిగింది?</strong>: ఏ <code>i</code> తోనూ భాగింపబడలేదు, కాబట్టి <code>isPrime</code> మొదటిలాగే <code>true</code> గానే ఉండిపోయింది.</li>
      </ol>

      <div class="callout" style="margin-top: 18px;">
        <div class="callout-title">💡 Pro Tip (చిట్కా): గణిత వేగం</div>
        <p style="margin-top: 6px; color: var(--text2); font-size: 14px; line-height: 1.6;">
          ఇంకా వేగంగా చెక్ చేయాలంటే, loop ని <code>num - 1</code> వరకు కాకుండా కేవలం <code>i * i <= num</code> (వర్గమూలం) వరకు మాత్రమే తిప్పితే సరిపోతుంది. కానీ ప్రస్తుతానికి పైన పేర్కొన్న పద్ధతి లాజిక్ అర్థం చేసుకోవడానికి చాలా సులభం.
        </p>
      </div>
    </div>

    <div class="section-title"><span class="num">6</span>Nested Loops లో break & Labelled break</div>
    <div class="section-body">
      <p style="font-size: 15px; line-height: 1.8; color: var(--text);">
        <code>break</code> ఎప్పుడూ <strong>దానికి అత్యంత దగ్గరగా ఉన్న loop ని మాత్రమే</strong> ఆపుతుంది. Nested loops (ఒక loop లోపల ఇంకో loop) ఉన్నప్పుడు, లోపలి loop లో <code>break</code> రాస్తే, లోపలిది మాత్రమే ఆగుతుంది. బయటి loop యథావిధిగా కొనసాగుతుంది.
      </p>

      <h3 style="margin-top: 20px; margin-bottom: 8px; font-size: 16px;">సాధారణ Nested Loop లో break:</h3>
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — Inner Loop Break</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>for (let i = 1; i <= 3; i++) {
  for (let j = 1; j <= 3; j++) {
    if (j === 2) {
      break;
    }
    console.log(\`i=\${i}, j=\${j}\`);
  }
}</code></pre>
      </div>
      <div class="code-output" style="background:#0b1120; border:1px solid #1e293b; border-radius:8px; padding:12px 16px; margin-top:10px; font-family:monospace; color:#38bdf8; font-size:13.5px;">
        <span style="color:#64748b;">Output:</span><br>
        i=1, j=1<br>
        i=2, j=1<br>
        i=3, j=1
      </div>
      <p style="font-size: 14.5px; line-height: 1.7; color: var(--text2); margin-top: 10px;">
        ప్రతిసారీ <code>j = 2</code> అయినప్పుడు లోపలి loop మాత్రమే ఆగిపోయింది. కానీ బయటి loop (<code>i</code>) 1, 2, 3 అన్నీ తిరిగింది.
      </p>

      <h3 style="margin-top: 26px; margin-bottom: 8px; font-size: 16px;">Labelled break: బయటి loop ని కూడా ఆపేయడం</h3>
      <p style="font-size: 15px; line-height: 1.8; color: var(--text2);">
        ఒకవేళ లోపలి loop లో ఉన్నప్పుడు బయటి loop ని కూడా ఒకేసారి పూర్తిగా ఆపేయాలనుకుంటే, ఆ బయటి loop కి ఒక <strong>Label (పేరు)</strong> ఇచ్చి, <code>break labelName;</code> అని రాస్తాం.
      </p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — Labelled break</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>outer: for (let i = 1; i <= 3; i++) {
  for (let j = 1; j <= 3; j++) {
    if (i === 2 && j === 2) {
      break outer;
    }
    console.log(\`i=\${i}, j=\${j}\`);
  }
}</code></pre>
      </div>
      <div class="code-output" style="background:#0b1120; border:1px solid #1e293b; border-radius:8px; padding:12px 16px; margin-top:10px; font-family:monospace; color:#38bdf8; font-size:13.5px;">
        <span style="color:#64748b;">Output:</span><br>
        i=1, j=1<br>
        i=1, j=2<br>
        i=1, j=3<br>
        i=2, j=1
      </div>
      <p style="font-size: 14.5px; line-height: 1.7; color: var(--text2); margin-top: 10px;">
        <code>i = 2, j = 2</code> అయినప్పుడు <code>break outer;</code> రన్ అయ్యింది. అది లోపలి loop నే కాకుండా, <code>outer:</code> అనే పేరున్న బయటి loop ని కూడా శాశ్వతంగా ముగించేసింది. అందుకే <code>i = 3</code> కి అసలు వెళ్లనే లేదు.
      </p>
      <p style="font-size: 14px; line-height: 1.6; color: var(--text2);">
        <em>గమనిక:</em> <code>outer:</code> అనేది కేవలం ఒక లేబుల్ పేరు. మీరు దానికి నచ్చిన పేరు పెట్టుకోవచ్చు. అదే విధంగా <code>continue outer;</code> అని రాస్తే, బయటి loop యొక్క తర్వాతి రౌండ్ కి వెళ్తుంది. అయితే labels ని ప్రొఫెషనల్ కోడింగ్ లో చాలా అరుదుగా వాడతారు. ఈ కాన్సెప్ట్ తెలుసుకుంటే చాలు.
      </p>
    </div>

    <div class="section-title"><span class="num">7</span>Beginners చేసే సాధారణ తప్పులు (Common Mistakes)</div>
    <div class="section-body">

      <h3 style="font-size:16px; color:#ff7b72; margin-top: 10px; margin-bottom:6px;">1. while loop లో continue కి ముందు counter ని పెంచకపోవడం (Infinite Loop Trap)</h3>
      <p style="font-size: 14.5px; line-height: 1.7; color: var(--text2);">
        Beginners తరచుగా పడే అతిపెద్ద ఉచ్చు ఇది! కింది కోడ్ పరిశీలించండి:
      </p>
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag" style="background:#dc2626;">❌ Buggy Code — Infinite Loop</span>
        </div>
        <pre><code>let i = 0;
while (i < 5) {
  if (i === 2) {
    continue;
  }
  console.log(i);
  i++;
}</code></pre>
      </div>
      <div class="callout callout-warning" style="margin: 14px 0;">
        <div class="callout-title">⚠️ హెచ్చరిక: అనంతమైన లూప్ (Infinite Loop)</div>
        <p style="margin-top: 6px; font-size: 14px; line-height: 1.6; color: var(--text2);">
          ఇది <code>0</code>, <code>1</code> ప్రింట్ చేసిన తర్వాత అంతులేని లూప్‌లోకి వెళ్లిపోతుంది! ఎందుకంటే <code>i = 2</code> అయినప్పుడు <code>continue</code> రన్ అవుతుంది. అది కిందున్న <code>i++</code> ని దాటేస్తుంది కాబట్టి, <code>i</code> విలువ ఎప్పటికీ <code>2</code> గానే ఉండిపోతుంది! దాంతో మళ్ళీ మళ్ళీ అదే రౌండ్ తిరుగుతూ కంప్యూటర్ హ్యాంగ్ అయిపోతుంది.
        </p>
      </div>

      <p style="font-size: 14.5px; font-weight:600; color:#3fb950; margin-top: 14px;">✅ సరైన పద్ధతి: continue కి ముందే counter ని పెంచండి:</p>
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag" style="background:#16a34a;">✅ Fixed Code</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>let i = 0;
while (i < 5) {
  i++;
  if (i === 2) {
    continue;
  }
  console.log(i);
}</code></pre>
      </div>
      <div class="code-output" style="background:#0b1120; border:1px solid #1e293b; border-radius:8px; padding:12px 16px; margin-top:10px; font-family:monospace; color:#38bdf8; font-size:13.5px;">
        <span style="color:#64748b;">Output:</span><br>
        1<br>
        3<br>
        4<br>
        5
      </div>
      <p style="font-size: 14px; color: var(--text2); margin-top: 8px;">
        <em>గమనిక:</em> <code>for</code> loop లో ఈ సమస్య రాదు, ఎందుకంటే <code>continue</code> చేసినా మూడో భాగమైన <code>i++</code> ఎల్లప్పుడూ ఆటోమేటిక్‌గా రన్ అవుతుంది. <code>while</code> మరియు <code>do-while</code> లలో మాత్రమే మనం జాగ్రత్తగా ఉండాలి.
      </p>

      <h3 style="font-size:16px; color:#ff7b72; margin-top: 24px; margin-bottom:6px;">2. switch లోపల ఉన్న break లూప్‌ను కూడా ఆపుతుందనుకోవడం</h3>
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — switch inside loop</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>for (let i = 1; i <= 3; i++) {
  switch (i) {
    case 2:
      break;
    default:
      console.log(i);
  }
}</code></pre>
      </div>
      <div class="code-output" style="background:#0b1120; border:1px solid #1e293b; border-radius:8px; padding:12px 16px; margin-top:10px; font-family:monospace; color:#38bdf8; font-size:13.5px;">
        <span style="color:#64748b;">Output:</span><br>
        1<br>
        3
      </div>
      <p style="font-size: 14.5px; line-height: 1.7; color: var(--text2); margin-top: 8px;">
        <code>i = 2</code> అయినప్పుడు <code>break</code> రన్ అయ్యింది, కానీ అది కేవలం <strong>switch నుంచి మాత్రమే</strong> బయటకు తెచ్చింది. <code>for</code> loop కొనసాగి <code>i = 3</code> ని కూడా ప్రింట్ చేసింది. Switch లోపల ఉన్నప్పుడు మొత్తం loop ని ఆపాలంటే labelled break వాడాలి.
      </p>

      <h3 style="font-size:16px; color:#ff7b72; margin-top: 24px; margin-bottom:6px;">3. Loop బయట break లేదా continue వాడటం</h3>
      <div class="code-block">
        <pre><code>if (true) {
  break;
}</code></pre>
      </div>
      <div class="code-output" style="background:#0b1120; border:1px solid #7f1d1d; border-radius:8px; padding:12px 16px; margin-top:10px; font-family:monospace; color:#f87171; font-size:13.5px;">
        <span style="color:#ef4444;">SyntaxError:</span> Illegal break statement
      </div>
      <p style="font-size: 14.5px; line-height: 1.7; color: var(--text2); margin-top: 8px;">
        <code>break</code> మరియు <code>continue</code> కేవలం loop ల లోపల (మరియు break కి switch లోపల) మాత్రమే పని చేస్తాయి. సాధారణ <code>if</code> బ్లాక్‌లో వాడితే JavaScript సింటాక్స్ ఎర్రర్ ఇస్తుంది.
      </p>

      <h3 style="font-size:16px; color:#ff7b72; margin-top: 24px; margin-bottom:6px;">4. break బదులు continue వాడటం (లేదా వ్యతిరేకంగా)</h3>
      <p style="font-size: 14.5px; line-height: 1.7; color: var(--text2);">
        కోడ్ రాసేటప్పుడు <em>"ఇక్కడితో పని ముగిసిందా, లూప్ మొత్తం ఆగిపోవాలా? లేక కేవలం ఈ ఒక్క రౌండ్‌ని మాత్రమే వదిలేయాలా?"</em> అని ఆలోచించండి. మొత్తం ఆపాలంటే <code>break</code>, ఈ ఒక్క రౌండ్‌ని దాటవేయాలంటే <code>continue</code>.
      </p>

      <h3 style="font-size:16px; color:#ff7b72; margin-top: 24px; margin-bottom:6px;">5. break తర్వాత కూడా ఆ రౌండ్‌లోని కింది లైన్లు రన్ అవుతాయనుకోవడం</h3>
      <p style="font-size: 14.5px; line-height: 1.7; color: var(--text2);">
        <code>break</code> లేదా <code>continue</code> లైన్ రన్ అయిన మరుక్షణమే కంట్రోల్ జంప్ అయిపోతుంది. ఆ బ్లాక్‌లో వాటి కింద రాసిన కోడ్ ఏదీ ఎప్పటికీ అమలు కాదు. అందుకే వీటిని ఎల్లప్పుడూ <code>if</code> కండిషన్ లోపల రాస్తాం.
      </p>

      <div class="callout" style="margin-top: 20px;">
        <div class="callout-title">📌 భవిష్యత్ పాఠాల గమనిక (Arrays & forEach)</div>
        <p style="margin-top: 6px; font-size: 14px; line-height: 1.6; color: var(--text2);">
          మనం Chapter 15 లో Arrays నేర్చుకున్నప్పుడు <code>forEach</code> అనే మెథడ్ చూస్తాం. గుర్తుంచుకోండి: <code>forEach</code> లోపల <code>break</code> మరియు <code>continue</code> పని చేయవు! అక్కడ loop ని మధ్యలో ఆపాలంటే ఆధునిక <code>for...of</code> loop వాడతారు. ఆ విశేషాలు అక్కడ వివరంగా తెలుసుకుందాం.
        </p>
      </div>
    </div>

    <div class="section-title"><span class="num">8</span>ప్రాక్టీస్ ప్రశ్నలు & సమాధానాలు</div>
    <div class="section-body">
      <p style="font-size: 15px; color: var(--text); margin-bottom: 12px;">కింది సమస్యలకు కోడ్ రాసి మీ అవగాహనను పరీక్షించుకోండి:</p>
      <ol style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.8;">
        <li><strong>50 కంటే పెద్దదైన, 7 తో భాగింపబడే మొదటి సంఖ్యను</strong> కనుక్కుని ప్రింట్ చేయండి. (హింట్: 51 నుంచి loop మొదలుపెట్టి, దొరకగానే break చేయండి).</li>
        <li>1 నుండి 10 వరకు సంఖ్యలను ప్రింట్ చేయండి, కానీ <strong>5 ని దాటేయండి (skip)</strong>.</li>
        <li>1 నుండి 20 వరకు, కేవలం <strong>బేసి (odd) సంఖ్యలను</strong> మాత్రమే <code>continue</code> వాడి ప్రింట్ చేయండి.</li>
        <li>ఒక సంఖ్య prime అవునా కాదా చెక్ చేసే ప్రోగ్రామ్ రాయండి. <strong>21</strong> తో టెస్ట్ చేయండి.</li>
        <li>1 నుంచి 10 వరకు సంఖ్యలను కూడుతూ (sum) వెళ్ళండి. మొత్తం కూడిక <strong>20 దాటగానే</strong>, ఏ సంఖ్య వద్ద దాటిందో చూపించి loop ఆపండి.</li>
      </ol>

      <details style="margin-top: 20px; background: var(--bg2); border: 1px solid var(--border); padding: 16px; border-radius: 8px; cursor: pointer;">
        <summary style="font-weight: 700; color: #f7df1e; font-size: 15px;">👉 సమాధానాలు చూడండి</summary>
        <div style="margin-top: 14px; font-size: 14.5px; color: var(--text2); line-height: 1.7;">
          <p><strong>1. 50 కంటే పెద్దదైన 7 గుణిజం:</strong></p>
          <div class="code-block">
            <pre><code>for (let i = 51; i <= 100; i++) {
  if (i % 7 === 0) {
    console.log(i);
    break;
  }
}</code></pre>
          </div>
          <div class="code-output" style="background:#0b1120; border:1px solid #1e293b; border-radius:6px; padding:8px 12px; margin-bottom:14px; font-family:monospace; color:#38bdf8; font-size:13px;">
            Output: 56<br>
            <span style="color:#64748b;">(51 నుంచి 55 వరకు 7 తో భాగింపబడవు. 56 = 7 × 8 కాబట్టి దొరకగానే ఆపేసింది.)</span>
          </div>

          <p><strong>2. 5 ని స్కిప్ చేయడం:</strong></p>
          <div class="code-block">
            <pre><code>for (let i = 1; i <= 10; i++) {
  if (i === 5) {
    continue;
  }
  console.log(i);
}</code></pre>
          </div>
          <div class="code-output" style="background:#0b1120; border:1px solid #1e293b; border-radius:6px; padding:8px 12px; margin-bottom:14px; font-family:monospace; color:#38bdf8; font-size:13px;">
            Output: 1, 2, 3, 4, 6, 7, 8, 9, 10
          </div>

          <p><strong>3. కేవలం బేసి (odd) సంఖ్యలు (సరి సంఖ్యలను దాటవేయడం):</strong></p>
          <div class="code-block">
            <pre><code>for (let i = 1; i <= 20; i++) {
  if (i % 2 === 0) {
    continue; // సరి సంఖ్య అయితే స్కిప్
  }
  console.log(i);
}</code></pre>
          </div>
          <div class="code-output" style="background:#0b1120; border:1px solid #1e293b; border-radius:6px; padding:8px 12px; margin-bottom:14px; font-family:monospace; color:#38bdf8; font-size:13px;">
            Output: 1, 3, 5, 7, 9, 11, 13, 15, 17, 19
          </div>

          <p><strong>4. 21 prime అవునా కాదా చెక్ చేయడం:</strong></p>
          <div class="code-block">
            <pre><code>const num = 21;
let isPrime = num > 1;

for (let i = 2; i < num; i++) {
  if (num % i === 0) {
    isPrime = false;
    break;
  }
}

console.log(\`\${num} \${isPrime ? "prime సంఖ్య" : "prime కాదు"}\`);</code></pre>
          </div>
          <div class="code-output" style="background:#0b1120; border:1px solid #1e293b; border-radius:6px; padding:8px 12px; margin-bottom:14px; font-family:monospace; color:#38bdf8; font-size:13px;">
            Output: 21 prime కాదు<br>
            <span style="color:#64748b;">(21 ని 3 తో భాగించవచ్చు: 21 = 3 × 7. కాబట్టి i = 3 వద్దే break అయ్యింది.)</span>
          </div>

          <p><strong>5. మొత్తం 20 దాటగానే ఆపడం:</strong></p>
          <div class="code-block">
            <pre><code>let sum = 0;

for (let i = 1; i <= 10; i++) {
  sum += i;
  if (sum > 20) {
    console.log(\`i = \${i} వద్ద sum = \${sum} అయ్యింది\`);
    break;
  }
}</code></pre>
          </div>
          <div class="code-output" style="background:#0b1120; border:1px solid #1e293b; border-radius:6px; padding:8px 12px; font-family:monospace; color:#38bdf8; font-size:13px;">
            Output: i = 6 వద్ద sum = 21 అయ్యింది<br>
            <span style="color:#64748b;">(sum విలువలు: 1, 3, 6, 10, 15, 21. i = 6 వద్ద 21 అయి 20 దాటింది, అక్కడే ఆగింది.)</span>
          </div>
        </div>
      </details>
    </div>

    <div class="try-box">
      <div class="try-title">🚀 మీరే try చేయండి</div>
      <p style="color:var(--text2); font-size:14px; margin-bottom:12px;">
        ఈ క్రింది కోడ్‌లో <code>break</code> మరియు <code>continue</code> రెండూ కలిసి ఉన్నాయి. 3 మరియు 8 విలువలను మార్చి ఏం జరుగుతుందో మన compiler లో రన్ చేసి చూడండి:
      </p>
      <div class="code-block">
        <pre><code>for (let i = 1; i <= 10; i++) {
  if (i === 3) {
    continue; // 3 ని దాటేస్తుంది
  }
  if (i === 8) {
    break;    // 8 వద్ద loop ఆగిపోతుంది
  }
  console.log(i);
}</code></pre>
      </div>
      <div class="code-output" style="background:#0b1120; border:1px solid #1e293b; border-radius:8px; padding:12px 16px; margin-top:10px; margin-bottom:14px; font-family:monospace; color:#38bdf8; font-size:13.5px;">
        <span style="color:#64748b;">Output:</span><br>
        1<br>
        2<br>
        4<br>
        5<br>
        6<br>
        7
      </div>
      <p style="color:var(--text2); font-size:13.5px; margin-bottom:12px;">
        3 దాటేయబడింది (<code>continue</code>), 8 వద్ద loop ఆగింది (<code>break</code>), కాబట్టి 8, 9, 10 అసలు ప్రింట్ అవ్వలేదు.
      </p>
      <a class="run-btn" href="/?lang=nodejs">👉 Our Compiler లో JavaScript try చేయండి</a>
    </div>

    <div class="intro-box" style="background: rgba(34, 197, 94, 0.1); border-color: rgba(34, 197, 94, 0.3); margin-top:30px;">
      <h3 style="color:#22c55e; margin-bottom:8px;">📌 సారాంశం (Quick Summary):</h3>
      <ul style="margin-left: 20px; color: var(--text2); line-height: 1.7; font-size: 14.5px;">
        <li><strong><code>break</code>:</strong> Loop ని వెంటనే పూర్తిగా ఆపేస్తుంది. కావాల్సిన ఫలితం దొరికాక మిగతా శోధన పనిని ఆపడానికి వాడతాం.</li>
        <li><strong><code>continue</code>:</strong> ప్రస్తుత రౌండ్ ని మాత్రమే దాటేసి (skip), నేరుగా తర్వాతి రౌండ్ కి వెళ్తుంది.</li>
        <li><code>break</code> దానికి దగ్గరగా ఉన్న లోపలి loop ని మాత్రమే ఆపుతుంది. బయటి loop ని కూడా ఆపాలంటే <strong>Labelled break</strong> (<code>break outer;</code>) వాడాలి.</li>
        <li><code>while</code> మరియు <code>do-while</code> లలో <code>continue</code> వాడేటప్పుడు counter variable ని <code>continue</code> కంటే ముందే పెంచండి, లేకపోతే <strong>Infinite Loop</strong> ప్రమాదం ఉంది. <code>for</code> loop లో ఈ చిక్కు ఉండదు.</li>
        <li><code>switch</code> లోపల ఉండే <code>break</code> కేవలం switch ని మాత్రమే ఆపుతుంది, దాని చుట్టూ ఉన్న loop ని ఆపదు.</li>
        <li>Loop లేదా switch వెలుపల <code>break</code> లేదా <code>continue</code> రాస్తే <code>SyntaxError</code> వస్తుంది.</li>
        <li>Prime number తనిఖీ మరియు శోధనలలో (Searching) <code>break</code> వాడటం వల్ల ప్రోగ్రామ్ వేగం విపరీతంగా పెరుగుతుంది.</li>
      </ul>
    </div>

    <div class="intro-box" style="background: linear-gradient(135deg, rgba(56, 189, 248, 0.12) 0%, rgba(99, 102, 241, 0.12) 100%); border: 1px solid rgba(56, 189, 248, 0.35); margin-top: 30px; padding: 24px;">
      <h2 style="color: #38bdf8; font-size: 22px; margin-bottom: 12px; font-family: 'Sora', sans-serif;">🎉 Part 2 పూర్తి అయ్యింది! (Control Flow Mastered)</h2>
      <p style="font-size: 15.5px; line-height: 1.8; color: var(--text);">
        <strong>హృదయపూర్వక అభినందనలు!</strong> మీరు JavaScript లో అత్యంత కీలకమైన <strong>Control Flow</strong> భాగాన్ని విజయవంతంగా పూర్తి చేశారు:
      </p>
      <ul style="margin-left: 20px; color: var(--text2); font-size: 15px; line-height: 1.8; margin-top: 10px;">
        <li><code>if, else if, else</code>: నిర్ణయాలు తీసుకోవడం (Decision Making)</li>
        <li><code>switch</code>: ఎక్కువ options ఉన్నప్పుడు సమర్థవంతంగా ఎంచుకోవడం</li>
        <li><code>Loops (for, while, do-while)</code>: పనులను పదే పదే పునరావృతం చేయడం</li>
        <li><code>break & continue</code>: లూప్‌లను మన అదుపులో ఉంచుకోవడం</li>
      </ul>
      <p style="font-size: 15px; line-height: 1.8; color: var(--text); margin-top: 14px;">
        ఇప్పుడు మీ ప్రోగ్రామ్‌లు సొంతంగా నిర్ణయాలు తీసుకోగలవు, పనులను మళ్ళీ మళ్ళీ చేయగలవు, ఎప్పుడు ఆపాలో, వేటిని దాటేయాలో కూడా వీటికి తెలుసు. ఈ ప్రాథమిక పునాది లేకుండా నిజమైన అప్లికేషన్లు రాయడం అసాధ్యం, కాబట్టి ఇది మీరు సాధించిన ఒక గొప్ప మైలురాయి!
      </p>
      <div style="margin-top: 16px; padding-top: 14px; border-top: 1px solid rgba(255, 255, 255, 0.1);">
        <p style="font-size: 15px; color: #f7df1e; font-weight: 600;">
          👉 తర్వాతి విభాగం — Part 3: Functions & Data
        </p>
        <p style="font-size: 14.5px; color: var(--text2); margin-top: 4px;">
          ఇక్కడ రాసిన కోడ్‌ను మాటిమాటికీ రాయకుండా మళ్ళీ వాడుకోవడానికి <strong>Functions</strong>, మరియు డేటాను ఒకే చోట నిల్వ చేయడానికి <strong>Arrays, Objects</strong> గురించి అత్యంత ఆసక్తికరంగా నేర్చుకుందాం.
        </p>
        <p style="font-size: 14.5px; margin-top: 10px;">
          <strong>తర్వాతి పాఠం:</strong> <a href="functions.html" style="color: #38bdf8; font-weight: 700; text-decoration: underline;">12. Functions: declaration, parameters, return →</a> — ఇందులో ఒక కోడ్‌కి పేరు పెట్టి, ఎన్ని సార్లైనా పిలిచి వాడుకునే అద్భుతమైన పద్ధతి నేర్చుకుందాం!
        </p>
      </div>
    </div>
`;

function updateChapter11() {
  const title = "JavaScript break మరియు continue తెలుగులో | Loop Control Statements";
  const desc = "JavaScript లో break మరియు continue statements ఎలా వాడాలి, loop ని మధ్యలో ఆపడం, ఒక రౌండ్ ని దాటేయడం, labelled break మరియు prime number check తెలుగులో ఉదాహరణలతో నేర్చుకోండి.";
  const filename = "break-continue.html";
  const subtopics = "break keyword · continue keyword · Loop control · Nested loops · Labelled break";

  // Navigation: Lesson 10 (loops.html) -> Lesson 11 (break-continue.html) -> Lesson 12 (functions.html)
  const prevFile = "loops.html";
  const prevTitle = "10. Loops: for, while, do-while";
  const nextFile = "functions.html";
  const nextTitle = "12. Functions: declaration, parameters, return";

  const html = master.wrapJSLessonPage(
    title,
    desc,
    filename,
    11,
    subtopics,
    chapter11Body,
    prevFile,
    prevTitle,
    nextFile,
    nextTitle,
    "Part 02: Control Flow"
  );

  fs.writeFileSync(path.join(jsDir, filename), html, 'utf8');
  console.log("✅ Successfully updated " + filename + " with rich Telugu content!");
}

updateChapter11();
