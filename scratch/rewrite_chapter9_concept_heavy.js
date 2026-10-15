const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const jsDir = path.join(publicDir, 'blog-javascript');

const master = require('./build_master_js_curriculum.js');

const chapter9Body = `
    <!-- ====================================================================
         👇 CHAPTER CONTENT: Chapter 9 switch Statement (Telugu) - CONCEPT HEAVY 👇
         ==================================================================== -->

    <div class="intro-box">
      <h3 style="margin-bottom:10px; font-size:18px;">💡 అసలు Programming లో switch Statement ఎందుకు పుట్టింది?</h3>
      <p>మనం గత చాప్టర్‌లో <code>if</code>, <code>else if</code> మరియు <code>else</code> గురించి నేర్చుకున్నాం. ఒక ప్రోగ్రామ్‌లో నిర్ణయాలు తీసుకోవడానికి అది అద్భుతంగా పనిచేస్తుంది. మరి అలాంటప్పుడు JavaScript లో మరియు దాదాపు అన్ని ప్రముఖ ప్రోగ్రామింగ్ భాషలలో (C, C++, Java మొదలైనవి) <code>switch</code> అనే ప్రత్యేకమైన స్టేట్‌మెంట్‌ను ఎందుకు ప్రవేశపెట్టారు? దీని వెనుక ఉన్న అసలైన కారణం ఏమిటి?</p>
      <p>దీన్ని అర్థం చేసుకోవడానికి ఒక నిజ జీవిత ఉదాహరణ చూద్దాం: మీరు ఒక పెద్ద ప్రభుత్వ కార్యాలయానికి వెళ్లారు. అక్కడ 20 వేర్వేరు కౌంటర్లు ఉన్నాయి. 
      మీరు <strong>if-else</strong> పద్ధతిలో వెళ్తే, మొదటి కౌంటర్ దగ్గరకు వెళ్లి "నా పని ఇక్కడేనా?" అని అడుగుతారు. వారు "కాదు" అంటే, రెండో కౌంటర్‌కి వెళ్తారు. వారు కాదంటే మూడో కౌంటర్‌కి... ఇలా 15వ కౌంటర్ వచ్చేవరకు ప్రతి కౌంటర్ దగ్గరా ఆగి చెక్ చేసుకుంటూ వెళ్ళాలి. ఇది ఎంత సమయం వృధా?</p>
      <p>కానీ అదే కార్యాలయం ప్రవేశ ద్వారం వద్ద ఒక <strong>గైడెన్స్ బోర్డు (టోకెన్ సిస్టమ్)</strong> ఉందనుకోండి. మీ సమస్య ఏమిటో చూసి, ఆ బోర్డు నేరుగా <em>"మీరు సూటిగా కౌంటర్ నంబర్ 15 వద్దకు వెళ్ళండి"</em> అని చెబుతుంది. మిగతా 14 కౌంటర్లను మీరు అసలు చూడాల్సిన పనే లేదు! 
      Programming లో సరిగ్గా ఈ పని చేసేదే <strong>switch Statement</strong>.</p>
    </div>

    <div class="section-title"><span class="num">1</span>ఈ chapter లో మీరు లోతుగా నేర్చుకునే కాన్సెప్ట్స్</div>
    <div class="section-body">
      <p>కేవలం కోడ్ రాయడం మాత్రమే కాకుండా, ఈ క్రింది కీలకమైన విషయాల వెనుక ఉన్న లాజిక్ మరియు సిద్ధాంతాన్ని అర్థం చేసుకుంటారు:</p>
      <ul style="margin-left: 20px; color: var(--text2); font-size: 15px; line-height: 1.8;">
        <li><strong>Multi-way Branching అంటే ఏమిటి?</strong> కంప్యూటర్ ఒక విలువ ఆధారంగా నేరుగా సరైన బ్లాక్ కి ఎలా జంప్ అవుతుంది?</li>
        <li><strong>switch యొక్క అంతర్గత నిర్మాణం:</strong> <code>switch</code>, <code>case</code>, <code>break</code>, మరియు <code>default</code> వెనుక ఉన్న తాత్వికత (Philosophy).</li>
        <li><strong>Fall-through అంటే ఏమిటి?</strong> JavaScript ఇంజిన్ లో <code>break</code> లేకపోతే లైన్లు ఎందుకు జలపాతంలా కిందకు జారిపోతాయి?</li>
        <li><strong>ఉద్దేశపూర్వక Fall-through:</strong> కోడ్ డూప్లికేషన్ తగ్గించడానికి ఒకే పనిని చాలా cases కి ఎలా అప్పగించాలి?</li>
        <li><strong>Strict Equality (===) మరియు Type Coercion:</strong> వెబ్ అప్లికేషన్లలో ఫారమ్ ఇన్పుట్స్ మరియు API డేటా హ్యాండ్లింగ్ లో వచ్చే టైప్ సమస్యలు.</li>
        <li><strong>Software Architecture:</strong> <code>if-else</code> ఎప్పుడు వాడాలి? <code>switch</code> ఎప్పుడు వాడాలి? ఇండస్ట్రీ ప్రమాణాలు ఏమిటి?</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">2</span>switch ఎలా పనిచేస్తుంది? (కాన్సెప్ట్ & మైండ్‌మ్యాప్)</div>
    <div class="section-body">
      <p style="font-size: 15px; line-height: 1.8; color: var(--text);">
        రైల్వే ట్రాక్‌ల వ్యవస్థను గమనించండి. ఒక రైలు వస్తున్నప్పుడు, పట్టాలు మార్చే <strong>రైల్వే స్విచ్ (Switch Point)</strong> ఉంటుంది. రైలు ఎక్కడికి వెళ్ళాలో ఆ దిశలోని పట్టాను మాత్రమే తెరిచి, మిగిలిన దారులను మూసివేస్తుంది. ప్రోగ్రామింగ్‌లో <code>switch</code> అనే పేరు కూడా అక్కడి నుంచే వచ్చింది! మన డేటా ప్రవాహాన్ని (Program Control Flow) సరైన దారిలోకి మళ్లించడమే దీని ముఖ్య ఉద్దేశం.
      </p>

      <div class="callout" style="margin: 20px 0;">
        <div class="callout-title">🧠 Core Mental Model: switch లోని 4 స్తంభాలు</div>
        <p style="margin-top: 8px; color: var(--text2); font-size: 14.5px; line-height: 1.7;">
          1. <strong>switch (విలువ / ఎక్స్‌ప్రెషన్):</strong> ఇది మన పరిశీలన కేంద్రం. మనం ఏ విలువను ఆధారం చేసుకుని నిర్ణయం తీసుకోవాలో ఇక్కడ నిర్ధారిస్తాం.<br>
          2. <strong>case లేబుల్:</strong> ఇది ఒక చిరునామా బోర్డు (Destination Marker) లాంటిది. విలువ దీనితో సమానమైతే, ఎగ్జిక్యూషన్ ఇక్కడి నుంచే మొదలవుతుంది.<br>
          3. <strong>break స్టేట్‌మెంట్:</strong> ఇది ఎగ్జిట్ గేట్ (Exit Gate). "ఈ కేస్ లో పని ముగిసింది, ఇక స్విచ్ బ్లాక్ దాటి బయటకు వెళ్ళిపో" అని కంప్యూటర్ ని ఆదేశిస్తుంది.<br>
          4. <strong>default బ్లాక్:</strong> ఏ కేస్ కూడా సరిపోనప్పుడు ఆదుకునే సేఫ్టీ నెట్ (Safety Net). అపరిచితమైన లేదా తప్పుడు ఇన్పుట్ వచ్చినప్పుడు ప్రోగ్రామ్ ఫెయిల్ అవ్వకుండా కాపాడుతుంది.
        </p>
      </div>

      <p style="font-size: 15px; line-height: 1.8; color: var(--text);">
        కింది ఉదాహరణను పరిశీలించండి. ఇక్కడ వారంలోని రోజు సంఖ్య ఆధారంగా ఆ రోజు పేరును నిర్ణయిస్తున్నాం:
      </p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — switch Statement</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>const day = 3;

switch (day) {
  case 1:
    console.log("సోమవారం");
    break;
  case 2:
    console.log("మంగళవారం");
    break;
  case 3:
    console.log("బుధవారం");
    break;
  case 4:
    console.log("గురువారం");
    break;
  default:
    console.log("ఇతర రోజు / తప్పుడు సంఖ్య");
}</code></pre>
      </div>
      <div class="code-output" style="background:#0b1120; border:1px solid #1e293b; border-radius:8px; padding:12px 16px; margin-top:10px; font-family:monospace; color:#38bdf8; font-size:13.5px;">
        <span style="color:#64748b;">Output:</span><br>
        బుధవారం
      </div>

      <h3 style="margin-top: 24px; margin-bottom: 8px; font-size: 16px;">ఈ ప్రోగ్రామ్ రన్ అయినప్పుడు తెరవెనుక ఏం జరిగింది?</h3>
      <p style="font-size: 15px; line-height: 1.8; color: var(--text2);">
        కంప్యూటర్ <code>day</code> వేరియబుల్‌లోని విలువ <code>3</code> ని తీసుకుంది. అది వెంటనే <code>case 1</code> వద్దకు వెళ్లి చూసింది (3 === 1 కాబట్టి మ్యాచ్ అవ్వలేదు). తర్వాత <code>case 2</code> ని చూసింది (మ్యాచ్ అవ్వలేదు). 
        <code>case 3</code> కి రాగానే <code>3 === 3</code> కచ్చితంగా సరిపోయింది! వెంటనే దాని లోపల ఉన్న <code>console.log("బుధవారం")</code> ను అమలు పరిచింది. 
        ఆ తర్వాతి లైనులో <code>break</code> కనిపించింది. ఈ <code>break</code> దొరకగానే JavaScript ఇంజిన్ స్విచ్ బ్లాక్ యొక్క చివరి కర్లీ బ్రేస్ <code>}</code> దాటి బయటకు వచ్చేసింది. మిగతా <code>case 4</code> లేదా <code>default</code> జోలికి వెళ్లనే లేదు!
      </p>
    </div>

    <div class="section-title"><span class="num">3</span>Fall-through కాన్సెప్ట్ యొక్క సమగ్ర విశ్లేషణ</div>
    <div class="section-body">
      <p style="font-size: 15px; line-height: 1.8; color: var(--text);">
        <code>switch</code> లో విద్యార్థులకు అత్యంత గందరగోళం కలిగించే అంశం <strong>Fall-through</strong>. దీన్ని సరిగ్గా అర్థం చేసుకోకపోతే పెద్ద పెద్ద ప్రాజెక్టుల్లో ఊహించని బగ్స్ వస్తాయి.
      </p>

      <h3 style="margin-top: 15px; margin-bottom: 8px; font-size: 16px;">అసలు Fall-through ఎందుకు జరుగుతుంది?</h3>
      <p style="font-size: 15px; line-height: 1.8; color: var(--text2);">
        JavaScript మరియు C-స్టైల్ భాషల్లో <code>case</code> అనేది ఒక కండిషన్ బ్లాక్ కాదు! అది కేవలం ఒక <strong>జంప్ మార్కర్ (Jump Marker)</strong> మాత్రమే. 
        అంటే, ప్రోగ్రామ్ ఎక్కడి నుంచి రన్ అవ్వడం ప్రారంభించాలో మాత్రమే అది చెబుతుంది. కానీ ఎక్కడ ఆగాలో దానికి తెలియదు! 
        మీరు <code>break</code> అని రాస్తే తప్ప, అది ఆగకుండా కిందికి పడుతూనే ఉంటుంది.
      </p>

      <div class="callout callout-warning" style="margin: 20px 0;">
        <div class="callout-title">⚠️ break తీసేస్తే ఏం జరుగుతుందో చూడండి:</div>
        <p style="margin-top: 8px; color: var(--text2); font-size: 14.5px; line-height: 1.7;">
          ఒకవేళ మీరు <code>case 2</code> తర్వాత <code>break</code> పెట్టడం మర్చిపోతే, <code>case 2</code> ఎగ్జిక్యూట్ అయిన తర్వాత జావాస్క్రిప్ట్ <code>case 3</code> లోకి, ఆ తర్వాత <code>case 4</code> లోకి కూడా జారిపోతుంది. 
          అక్కడ కండిషన్ మ్యాచ్ అయిందా లేదా అని కూడా కంప్యూటర్ చూడదు! ఎందుకంటే జంప్ మార్కర్ దాటి కంట్రోల్ లోపలికి వచ్చేసింది కాబట్టి.
        </p>
      </div>

      <h3 style="margin-top: 24px; margin-bottom: 8px; font-size: 16px;">ఉద్దేశపూర్వక Fall-through (Multi-case Grouping ఎందుకు వాడతారు?)</h3>
      <p style="font-size: 15px; line-height: 1.8; color: var(--text2);">
        Fall-through ఎప్పుడూ ఒక లోపం మాత్రమే కాదు. తెలివిగా వాడితే అది డెవలపర్ల సమయాన్ని ఎంతో ఆదా చేస్తుంది. 
        ఉదాహరణకు, సోమవారం నుండి శుక్రవారం వరకు ఐదు రోజులూ "ఆఫీస్ పని దినం" అని, శని-ఆదివారాలు "సెలవు దినం" అని చూపించాలి. 
        ఇలాంటి సందర్భంలో 5 సార్లు విడివిడిగా కోడ్ రాయడం మంచి పద్ధతి కాదు (DRY Principle - Don't Repeat Yourself). 
        బ్రేక్ లేకుండా వరుసగా కేసులు రాసి గ్రూప్ చేయవచ్చు:
      </p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — Case Grouping Concept</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>const day = "శనివారం";

switch (day) {
  case "సోమవారం":
  case "మంగళవారం":
  case "బుధవారం":
  case "గురువారం":
  case "శుక్రవారం":
    console.log("ఇది పని దినం (Working Day)");
    break;

  case "శనివారం":
  case "ఆదివారం":
    console.log("ఇది సెలవు దినం (Weekend Holiday)");
    break;

  default:
    console.log("తెలియని రోజు పేరు");
}</code></pre>
      </div>
      <div class="code-output" style="background:#0b1120; border:1px solid #1e293b; border-radius:8px; padding:12px 16px; margin-top:10px; font-family:monospace; color:#38bdf8; font-size:13.5px;">
        <span style="color:#64748b;">Output:</span><br>
        ఇది సెలవు దినం (Weekend Holiday)
      </div>

      <h3 style="margin-top: 18px; margin-bottom: 8px; font-size: 15px;">కాన్సెప్ట్ విశ్లేషణ:</h3>
      <p style="font-size: 15px; line-height: 1.8; color: var(--text2);">
        ఇక్కడ <code>day = "శనివారం"</code> అయినప్పుడు, కంప్యూటర్ నేరుగా <code>case "శనివారం"</code> దగ్గరకు జంప్ అయ్యింది. అక్కడ ఎటువంటి కోడ్ కానీ బ్రేక్ కానీ లేదు. కాబట్టి కిందున్న <code>case "ఆదివారం"</code> లోకి జారింది. 
        అక్కడ ఉన్న మెసేజ్ ప్రింట్ చేసి, <code>break</code> చూసి బయటకు వచ్చేసింది! 
        దీనివల్ల మనం ఒకే లాజిక్ ని పదే పదే రాయకుండా శుభ్రమైన కోడ్ రాయగలిగాం.
      </p>
    </div>

    <div class="section-title"><span class="num">4</span>Strict Equality (===) మరియు Type Coercion ప్రాముఖ్యత</div>
    <div class="section-body">
      <p style="font-size: 15px; line-height: 1.8; color: var(--text);">
        ఇంటర్వ్యూలలో మరియు రియల్-వరల్డ్ వెబ్ ప్రాజెక్టులలో అత్యంత ప్రాధాన్యత కలిగిన కాన్సెప్ట్ ఇది. 
        JavaScript లో రెండు రకాల పోలికలు ఉన్నాయి:
      </p>
      <ul style="margin-left: 20px; color: var(--text2); font-size: 15px; line-height: 1.8;">
        <li><code>==</code> (Loose Equality): ఇది టైప్ వేరుగా ఉన్నా బలవంతంగా ఒకే టైప్ లోకి మార్చి (Type Coercion) పోలుస్తుంది. ఉదాహరణకు <code>"5" == 5</code> నిజం (true) అవుతుంది.</li>
        <li><code>===</code> (Strict Equality): ఇది విలువతో పాటు <strong>డేటా టైప్</strong> కూడా ఖచ్చితంగా ఒకటే అయి ఉండాలని కోరుకుంటుంది. <code>"5" === 5</code> అనేది తప్పు (false).</li>
      </ul>

      <p style="font-size: 15px; line-height: 1.8; color: var(--text); margin-top: 12px;">
        <strong>గుర్తుంచుకోండి:</strong> <code>switch</code> స్టేట్‌మెంట్ లోపల JavaScript ఎల్లప్పుడూ <strong><code>===</code> (Strict Equality)</strong> నే ఉపయోగిస్తుంది. 
        ఎట్టి పరిస్థితుల్లోనూ టైప్ కన్వర్షన్ చేయదు.
      </p>

      <div class="callout" style="margin: 20px 0;">
        <div class="callout-title">🌐 వెబ్ డెవలప్‌మెంట్‌లో ఇది ఎందుకు చాలా ముఖ్యం?</div>
        <p style="margin-top: 8px; color: var(--text2); font-size: 14.5px; line-height: 1.7;">
          వెబ్‌సైట్లలో యూజర్లు ఫారమ్‌లో టైప్ చేసిన సమాచారం (HTML <code>&lt;input&gt;</code>) లేదా బ్రౌజర్ లోని <code>prompt()</code> ద్వారా వచ్చే సమాచారం ఎల్లప్పుడూ <strong>String (టెక్స్ట్)</strong> రూపంలోనే బ్రౌజర్‌కు అందుతుంది.<br>
          యూజర్ <code>"2"</code> అని టైప్ చేసినప్పుడు, మీ స్విచ్‌లో <code>case 2:</code> (number) అని ఉంటే, <code>"2" === 2</code> అనేది ఫెయిల్ అయ్యి మ్యాచ్ అవ్వదు! 
          అందుకే యూజర్ ఇన్పుట్ ని స్విచ్ కి పంపే ముందు <code>Number(input)</code> ద్వారా సంఖ్యగా మార్చడం చాలా అవసరం.
        </p>
      </div>
    </div>

    <div class="section-title"><span class="num">5</span>Software Architecture: switch vs if-else ఎప్పుడు ఏది వాడాలి?</div>
    <div class="section-body">
      <p style="font-size: 15px; line-height: 1.8; color: var(--text);">
        చాలామంది విద్యార్థులు అడిగే ప్రధాన ప్రశ్న: <em>"సార్, if-else తో చేయగలిగిన పనిని switch తో కూడా చేయగలం కదా, మరి ఏది ఎప్పుడు వాడాలి?"</em><br>
        సాఫ్ట్‌వేర్ పరిశ్రమలో సీనియర్ ఇంజనీర్లు మరియు ఆర్కిటెక్ట్‌లు పాటించే నియమాలు ఇవే:
      </p>

      <table class="tbl" style="margin-top: 16px;">
        <tr>
          <th>పరిస్థితి (Scenario)</th>
          <th>ఉత్తమ ఎంపిక</th>
          <th>సాంకేతిక కారణం (Technical Reason)</th>
        </tr>
        <tr>
          <td>ఒకే వేరియబుల్ యొక్క <strong>నిర్దిష్ట విలువల (Discrete Values)</strong> పోలిక (ఉదా: యూజర్ రోల్: 'admin', 'editor', 'viewer')</td>
          <td><code>switch</code></td>
          <td>కోడ్ అత్యంత శుభ్రంగా ఉంటుంది. భవిష్యత్తులో కొత్త రోల్స్ జోడించడం చాలా తేలిక.</td>
        </tr>
        <tr>
          <td><strong>పరిధులు (Ranges)</strong> మరియు అసమానతలు (ఉదా: మార్కులు &gt;= 80, వయసు &lt; 18)</td>
          <td><code>if-else</code></td>
          <td><code>switch</code> లో range పోలికలు నేరుగా సాధ్యపడవు. Boolean expressions కోసం <code>if-else</code> సహజమైనది.</td>
        </tr>
        <tr>
          <td>వేర్వేరు వేరియబుల్స్ మరియు <strong>లాజికల్ ఆపరేటర్లు (&&, ||)</strong> ఉన్న సంక్లిష్ట పరిస్థితులు</td>
          <td><code>if-else</code></td>
          <td><code>if (age &gt; 18 && hasLicense && !isDrunk)</code> లాంటివి స్విచ్ లో రాయడం అసాధ్యం లేదా కోడ్ వికారంగా మారుతుంది.</td>
        </tr>
        <tr>
          <td>అనేక ఆప్షన్లకు ఒకే రకమైన రెస్పాన్స్ ఇవ్వడం (Grouping)</td>
          <td><code>switch</code></td>
          <td>Fall-through ఫీచర్ వల్ల ఒకే పనిని సులభంగా గ్రూప్ చేయవచ్చు.</td>
        </tr>
      </table>

      <div class="intro-box" style="margin-top: 25px;">
        <h4 style="margin-bottom: 6px;">💡 Cyclomatic Complexity & Clean Code</h4>
        <p style="font-size: 14.5px; line-height: 1.7;">
          ఒక ఫంక్షన్ లో ఎక్కువ <code>if</code>, <code>else if</code> లూ రాయడం వల్ల కోడ్ యొక్క "Cyclomatic Complexity" (కోడ్ అర్థం చేసుకోవడంలో ఉన్న సంక్లిష్టత) పెరుగుతుంది. 
          ఒకే విలువ చుట్టూ 4 కంటే ఎక్కువ దారులు ఉన్నప్పుడు, ప్రొఫెషనల్ డెవలపర్లు <code>switch</code> కే మొదటి ప్రాధాన్యత ఇస్తారు.
        </p>
      </div>
    </div>

    <div class="section-title"><span class="num">6</span>Block Scope మరియు switch లో వేరియబుల్ డిక్లరేషన్స్</div>
    <div class="section-body">
      <p style="font-size: 15px; line-height: 1.8; color: var(--text);">
        ఇది JavaScript లో ఆధునిక <code>let</code> మరియు <code>const</code> వాడేటప్పుడు చాలామంది ఎదుర్కొనే ఒక క్లిష్టమైన సమస్య. 
        దీన్ని కాన్సెప్ట్ పరంగా అర్థం చేసుకుందాం:
      </p>

      <p style="font-size: 15px; line-height: 1.8; color: var(--text2);">
        <code>switch</code> స్టేట్‌మెంట్ మొత్తానికి కలిపి ఒకే ఒక్క జత కర్లీ బ్రేసెస్ <code>{ ... }</code> ఉంటాయి. 
        అంటే <code>switch</code> లోపల ఉన్న అన్ని <code>case</code> లూ <strong>ఒకే Block Scope</strong> లో ఉంటాయి! 
        అందువల్ల ఒక కేస్ లో <code>let message = "హలో";</code> అని రాసి, మరో కేస్ లో కూడా <code>let message = "నమస్తే";</code> అని రాస్తే JavaScript ఎర్రర్ ఇస్తుంది (<em>Identifier 'message' has already been declared</em>).
      </p>

      <div class="callout" style="margin: 15px 0;">
        <div class="callout-title">🛠️ సరైన ఆర్కిటెక్చరల్ పరిష్కారం:</div>
        <p style="margin-top: 6px; font-size: 14.5px; line-height: 1.7;">
          ప్రతి <code>case</code> కి ప్రత్యేకంగా సొంత కర్లీ బ్రేసెస్ <code>{ }</code> ఇవ్వడం ద్వారా ఆ కేస్ కి స్వతంత్రమైన Block Scope ని సృష్టించవచ్చు. 
          దీనివల్ల వేరియబుల్స్ ఒకదానితో ఒకటి గొడవ పడవు:
        </p>
        <pre><code>switch (action) {
  case "create": {
    const result = "ఫైల్ సృష్టించబడింది";
    console.log(result);
    break;
  }
  case "delete": {
    const result = "ఫైల్ తొలగించబడింది"; // ✅ ఎటువంటి ఎర్రర్ రాదు!
    console.log(result);
    break;
  }
}</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">7</span>బిగినర్స్ చేసే సాధారణ తప్పులు & నివారణ పద్ధతులు</div>
    <div class="section-body">
      <p style="font-size: 15px; line-height: 1.8; color: var(--text2);">
        క్రింది తప్పులను గమనించి, మీ కోడ్ లో అవి రాకుండా చూసుకోండి:
      </p>
      <ul style="margin-left: 20px; color: var(--text2); font-size: 15px; line-height: 1.8;">
        <li>
          <strong>1. అప్రయత్నంగా break మర్చిపోవడం:</strong> అనుకోకుండా break వదిలేస్తే కిందున్న ఇతర కేసుల కోడ్ కూడా అమలవుతుంది. కావాలని గ్రూప్ చేసినప్పుడు తప్ప ప్రతి కేస్ కి break తప్పనిసరి.
        </li>
        <li>
          <strong>2. Range ల కోసం switch రాయడానికి ప్రయత్నించడం:</strong> <code>case marks >= 80:</code> అని రాయకూడదు. ఎందుకంటే అది boolean ఫలితాన్నిస్తుంది తప్ప సంఖ్యతో మ్యాచ్ అవ్వదు.
        </li>
        <li>
          <strong>3. default కేస్ ని నిర్లక్ష్యం చేయడం:</strong> ఊహించని యూజర్ ఇన్పుట్ వచ్చినప్పుడు అప్లికేషన్ మౌనంగా ఉండిపోకుండా యూజర్ కి తగిన సూచన ఇవ్వడానికి default ఎల్లప్పుడూ ఉండాలి.
        </li>
      </ul>
    </div>

    <div class="section-title"><span class="num">8</span>ప్రాక్టీస్ ప్రశ్నలు & సమాధానాలు</div>
    <div class="section-body">
      <p style="font-size: 15px; line-height: 1.8; color: var(--text);">
        ఈ క్రింది ప్రశ్నల ద్వారా మీ అవగాహనను పరీక్షించుకోండి:
      </p>

      <ol style="margin-left: 20px; color: var(--text2); font-size: 15px; line-height: 1.8;">
        <li>ఒక అక్షరం ఇచ్చినప్పుడు అది అచ్చా (a, e, i, o, u) లేదా హల్లా అని Multi-case grouping పద్ధతిలో చెప్పే switch రాయండి.</li>
        <li>యూజర్ రోల్ <code>"admin"</code>, <code>"editor"</code>, <code>"viewer"</code> అయితే వారికి తగిన అనుమతి సందేశాన్ని, వేరే ఏదైనా అయితే "అనుమతి నిరాకరించబడింది" అని చూపే లాజిక్ రాయండి.</li>
        <li><code>break</code> లేకపోతే జరిగే ప్రక్రియను ఏమంటారు? అది ఏ సందర్భంలో ప్రయోజనకరంగా ఉంటుంది?</li>
      </ol>

      <details>
        <summary>👉 సమాధానాలు మరియు విశ్లేషణ చూడండి</summary>
        <div style="margin-top: 12px; font-size: 14.5px; line-height: 1.7;">
          <p><strong>1. అచ్చు / హల్లు లాజిక్:</strong></p>
          <pre><code>const char = "e";
switch (char) {
  case "a":
  case "e":
  case "i":
  case "o":
  case "u":
    console.log("ఇది అచ్చు (Vowel)");
    break;
  default:
    console.log("ఇది హల్లు (Consonant)");
}</code></pre>

          <p style="margin-top: 14px;"><strong>2. యూజర్ రోల్ లాజిక్:</strong></p>
          <pre><code>const role = "editor";
switch (role) {
  case "admin":
    console.log("పూర్తి నియంత్రణ అధికారం ఉంది");
    break;
  case "editor":
    console.log("కంటెంట్ ఎడిట్ చేసే అధికారం ఉంది");
    break;
  case "viewer":
    console.log("చూసే అధికారం మాత్రమే ఉంది");
    break;
  default:
    console.log("అనుమతి నిరాకరించబడింది");
}</code></pre>

          <p style="margin-top: 14px;"><strong>3. సిద్ధాంత వివరణ:</strong></p>
          <p><code>break</code> లేకపోతే జరిగే ప్రక్రియను <strong>Fall-through</strong> అంటారు. ఒకే విధమైన పనులను పలు వేర్వేరు ఆప్షన్లకు కలిపి అమలు చేయాల్సి వచ్చినప్పుడు (ఉదా: శని, ఆదివారాలు రెండింటికీ సెలవు ప్రకటించడం) కోడ్ రిపీట్ కాకుండా ఉండటానికి ఈ ఫీచర్ ఎంతో ఉపయోగపడుతుంది.</p>
        </div>
      </details>
    </div>

    <div class="try-box">
      <div class="try-title">🚀 మీరే స్వయంగా ప్రయత్నించండి</div>
      <p style="color:var(--text2); font-size:14.5px; margin-bottom:12px; line-height: 1.6;">
        ఒక రెస్టారెంట్ డిజిటల్ మెనూలో ఆర్డర్ సంఖ్యను బట్టి ధర మరియు వస్తువు పేరు చూపే లాజిక్ క్రింద ఇవ్వబడింది. <code>itemCode</code> మార్చి ఫలితం ఎలా మారుతుందో మన ఆన్‌లైన్ కంపైలర్‌లో రన్ చేసి చూడండి:
      </p>
      <div class="code-block">
        <pre><code>const itemCode = 2;

switch (itemCode) {
  case 1:
    console.log("టీ (Tea) — ₹10");
    break;
  case 2:
    console.log("కాఫీ (Coffee) — ₹20");
    break;
  case 3:
    console.log("బాద్షా మిల్క్ — ₹25");
    break;
  default:
    console.log("క్షమించండి, ఈ ఐటమ్ మెనూలో లేదు!");
}</code></pre>
      </div>
      <div class="code-output" style="background:#0b1120; border:1px solid #1e293b; border-radius:8px; padding:12px 16px; margin-top:10px; font-family:monospace; color:#38bdf8; font-size:13.5px;">
        <span style="color:#64748b;">Output:</span><br>
        కాఫీ (Coffee) — ₹20
      </div>
      <a class="run-btn" href="/?lang=nodejs">👉 Our Compiler లో JavaScript రన్ చేయండి</a>
    </div>

    <div class="intro-box" style="background: rgba(34, 197, 94, 0.1); border-color: rgba(34, 197, 94, 0.3); margin-top:30px;">
      <h3 style="color:#22c55e; margin-bottom:10px; font-size:17px;">📌 ముఖ్యమైన సారాంశం (Key Conceptual Takeaways):</h3>
      <ul style="margin-left: 20px; color: var(--text2); line-height: 1.8; font-size: 14.5px;">
        <li><strong>Multi-way Branching:</strong> ఒకే విలువను ఆధారంగా చేసుకుని నిర్ణీత దారిని ఎంచుకోవడానికి <code>switch</code> ఉత్తమమైన ఎంపిక.</li>
        <li><strong>Jump Markers:</strong> <code>case</code> లు కేవలం జంప్ లేబుల్స్ మాత్రమే; <code>break</code> రాస్తేనే ఎగ్జిక్యూషన్ ఆగుతుంది.</li>
        <li><strong>Fall-through:</strong> బ్రేక్ లేనప్పుడు కంట్రోల్ కిందికి జారిపోవడాన్ని ఫాల్-త్రూ అంటారు. దీన్ని ఉద్దేశపూర్వకంగా గ్రూపింగ్ కోసం వాడతారు.</li>
        <li><strong>Strict Equality (===):</strong> స్విచ్ ఎల్లప్పుడూ టైప్ మరియు విలువ రెండింటినీ చూస్తుంది; టైప్ కన్వర్షన్ చేయదు.</li>
        <li><strong>Architecture Rule:</strong> ఖచ్చితమైన విలువల పోలికకు <code>switch</code>, రేంజ్ లు మరియు లాజికల్ కండిషన్స్ కు <code>if-else</code> వాడాలి.</li>
      </ul>
    </div>
`;

function rewriteChapter9() {
  const title = "JavaScript switch Statement తెలుగులో | case, break, default";
  const desc = "JavaScript లో switch statement ఎలా వాడాలి, case, break, default అంటే ఏమిటి, fall-through అంటే ఏమిటి, switch మరియు if-else మధ్య తేడా తెలుగులో ఉదాహరణలతో నేర్చుకోండి.";
  const filename = "switch.html";
  const subtopics = "switch Concept · Multi-way Branching · Jump Markers · break Mechanism · Fall-through Deep Dive · Strict Equality (===) · Architecture";

  const prevFile = "conditionals.html";
  const prevTitle = "8. if, else if, else";
  const nextFile = "loops.html";
  const nextTitle = "10. Loops: for, while, do-while";

  const html = master.wrapJSLessonPage(
    title,
    desc,
    filename,
    9,
    subtopics,
    chapter9Body,
    prevFile,
    prevTitle,
    nextFile,
    nextTitle,
    "Part 02: Control Flow"
  );

  fs.writeFileSync(path.join(jsDir, filename), html, 'utf8');
  console.log("✅ Successfully updated " + filename + " with rich concept explanation!");
}

rewriteChapter9();
