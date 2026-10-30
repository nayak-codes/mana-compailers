const fs = require('fs');
const path = require('path');
const { LESSONS, buildSidebar } = require('./html_curriculum_data.js');

const lesson = LESSONS.find(l => l.num === 4);
const sidebarHtml = buildSidebar(4);

const chapterContentHtml = `
    <!-- BREADCRUMB -->
    <div class="breadcrumb">
      <a href="/">Home</a><span class="sep">›</span>
      <a href="/blog.html">Tutorials</a><span class="sep">›</span>
      <a href="/blog-html.html">HTML5 Masterclass</a><span class="sep">›</span>
      <span class="current">Chapter 4: హెడ్డింగ్స్ (h1-h6), పేరాగ్రాఫ్స్ (p) & టెక్స్ట్ ఫార్మాటింగ్ ట్యాగ్స్</span>
    </div>

    <!-- PAGE TITLE -->
    <h1 class="page-title">హెడ్డింగ్స్ (h1-h6), పేరాగ్రాఫ్స్ (p) & టెక్స్ట్ ఫార్మాటింగ్ ట్యాగ్స్</h1>

    <!-- PAGE META BADGES -->
    <div class="page-meta">
      <span class="badge">🌐 Modern HTML5 (W3C/WHATWG)</span>
      <span class="badge">🟢 Chapter 4 of 20 (Phase 1 Finale)</span>
      <span class="badge">📂 Phase 01: HTML5 పునాదులు & ఆర్కిటెక్చర్</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

    <!-- SUBTOPICS PILL BAR -->
    <div style="background:var(--bg3); border:1px solid var(--border); border-radius:8px; padding:10px 16px; margin-bottom:24px; font-size:13px; color:var(--text2); display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
      <span style="color:#10b981; font-weight:700;">📌 Covered in this chapter:</span>
      <span>హెడ్డింగ్స్ హైరార్కీ (h1 నుండి h6) · పేరాగ్రాఫ్స్ (p), లైన్ బ్రేక్స్ (br), క్షితిజ సమాంతర గీతలు (hr) · సెమాంటిక్ వర్సెస్ నాన్-సెమాంటిక్ ఫార్మాటింగ్: strong vs b, em vs i · టెక్స్ట్ హైలైటింగ్ (mark), కొట్టివేత & కొత్త చేర్పులు (del, ins) · మ్యాథ్స్ & కెమిస్ట్రీ కోసం సబ్‌స్క్రిప్ట్/సూపర్‌స్క్రిప్ట్ (sub, sup) · ప్రీఫార్మాటెడ్ టెక్స్ట్ (pre) & ఇన్-లైన్ కోడ్ (code) · బిగినర్స్ తప్పులు & క్విజ్</span>
    </div>

    <!-- INTRO ACCENT BOX (Warm Ivory with Green Accent) -->
    <div class="intro-box">
      <p>మీరు రోజూ ఉదయం చదివే దినపత్రికను ఒక్కసారి ఊహించుకోండి. మొదటి పేజీలో పెద్ద అక్షరాలతో ప్రధాన వార్తా శీర్షిక (Main Headline) ఉంటుంది. దాని కింద సబ్-హెడ్డింగ్స్ ఉంటాయి. వివరాలన్నీ స్పష్టమైన పేరాగ్రాఫ్‌లలో ఉంటాయి. ముఖ్యమైన విషయాలు బోల్డ్ అక్షరాలలో, ప్రముఖుల వ్యాఖ్యలు ఇటాలిక్స్‌లో, ఆఫర్ ధరలు కొట్టివేతలతో (Strikethrough) ఉంటాయి. ఒకవేళ న్యూస్‌పేపర్ మొత్తం ఒకే సైజు అక్షరాలతో, ఎలాంటి శీర్షికలు లేకుండా ఒకే ముద్దగా ఉంటే ఎవరైనా ఒక్క పేజీ అయినా చదవగలరా? అస్సలు చదవలేరు!</p>
      <p>వెబ్‌సైట్లలో కూడా యూజర్లను ఆకట్టుకోవడానికి, అలాగే Google లాంటి సెర్చ్ ఇంజన్లకు కంటెంట్ యొక్క ప్రాధాన్యతను అర్థం చేయించడానికి <strong>హెడ్డింగ్స్ (h1 నుండి h6)</strong> మరియు <strong>టెక్స్ట్ ఫార్మాటింగ్ ట్యాగ్స్</strong> వెన్నెముక లాంటివి.</p>
      <p>కానీ చాలామంది విద్యార్థులు కేవలం అక్షరాలను లావుగా చూపించడానికి <code>&lt;b&gt;</code> కి <code>&lt;strong&gt;</code> కి మధ్య ఉన్న తేడా తెలియక, లేదా ఫాంట్ సైజు పెంచడానికి హెడ్డింగ్స్ వాడి తీవ్రమైన SEO తప్పిదాలు చేస్తారు! ఈ నాల్గవ అధ్యాయంలో (Phase 1 ఫైనల్ చాప్టర్) మనం కంటెంట్‌ను అందంగా, ప్రొఫెషనల్‌గా తీర్చిదిద్దే టెక్స్ట్ ఫార్మాటింగ్ కళను, శాస్త్రీయ సూత్రాలను పూర్తి తెలుగులో నేర్చుకుందాం!</p>
    </div>

    <!-- SECTION 1 -->
    <div class="section-title"><span class="num">1</span>ఈ Chapter లో మీరు నేర్చుకునే అంశాలు</div>
    <div class="section-body">
      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.7;">
        <li><strong>హెడ్డింగ్స్ హైరార్కీ (h1 నుండి h6):</strong> 6 స్థాయిల శీర్షికల నిర్మాణం మరియు SEO లో వాటికున్న అపారమైన ప్రాముఖ్యత.</li>
        <li><strong>పేరాగ్రాఫ్స్, లైన్ బ్రేక్స్ & డివైడర్లు:</strong> <code>&lt;p&gt;</code>, <code>&lt;br&gt;</code> మరియు థీమాటిక్ బ్రేక్ <code>&lt;hr&gt;</code> ట్యాగ్‌ల సరైన వినియోగం.</li>
        <li><strong>దృశ్యరూపం vs సెమాంటిక్ ప్రాముఖ్యత:</strong> <code>&lt;b&gt;</code> vs <code>&lt;strong&gt;</code> మరియు <code>&lt;i&gt;</code> vs <code>&lt;em&gt;</code> ల మధ్య గల అసలైన అంతరార్థం.</li>
        <li><strong>ఎడిటోరియల్ ట్యాగ్స్:</strong> టెక్స్ట్ హైలైటింగ్ (<code>&lt;mark&gt;</code>), కొట్టివేతలు & ఆఫర్లు (<code>&lt;del&gt;</code>, <code>&lt;ins&gt;</code>, <code>&lt;s&gt;</code>).</li>
        <li><strong>గణిత & సైన్స్ ఫార్ములాలు:</strong> ఘాతాంకాల కోసం <code>&lt;sup&gt;</code>, రసాయన సూత్రాల కోసం <code>&lt;sub&gt;</code> ల ప్రయోగం.</li>
        <li><strong>వైట్‌స్పేస్ కొలాప్స్ & ప్రీఫార్మాటెడ్ టెక్స్ట్:</strong> <code>&lt;pre&gt;</code>, <code>&lt;code&gt;</code> మరియు కీబోర్డ్ షార్ట్‌కట్స్ కోసం <code>&lt;kbd&gt;</code>.</li>
        <li><strong>బిగినర్స్ సాధారణ పొరపాట్లు & క్విజ్:</strong> హెడ్డింగ్ లెవల్ స్కిప్పింగ్, స్పేసింగ్ బగ్స్ మరియు Phase 1 మైల్‌స్టోన్ సారాంశం.</li>
      </ul>
    </div>

    <!-- SECTION 2 -->
    <div class="section-title"><span class="num">2</span>హెడ్డింగ్స్ హైరార్కీ (Headings Hierarchy: h1 నుండి h6 వరకు)</div>
    <div class="section-body">
      <p>HTML లో శీర్షికలను నిర్వచించడానికి 6 స్థాయిల హెడ్డింగ్ ట్యాగ్‌లు ఉన్నాయి. <code>&lt;h1&gt;</code> నుండి <code>&lt;h6&gt;</code> కి వెళ్లేకొద్దీ వాటి ఫాంట్ సైజు మరియు ప్రాముఖ్యత తగ్గుతూ వస్తుంది:</p>

      <table class="tbl">
        <thead>
          <tr>
            <th>ట్యాగ్</th>
            <th>ప్రాముఖ్యత స్థాయి</th>
            <th>పుస్తకంతో పోలిక</th>
            <th>డిఫాల్ట్ సైజు</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>&lt;h1&gt;</code></td>
            <td>అత్యున్నత ప్రాధాన్యత (Main Title)</td>
            <td>పుస్తకం పేరు (Book Title) — పేజీకి ఒక్కటే ఉండాలి.</td>
            <td>2.00em (~32px)</td>
          </tr>
          <tr>
            <td><code>&lt;h2&gt;</code></td>
            <td>ప్రధాన విభాగం (Major Section)</td>
            <td>అధ్యాయం పేరు (Chapter Title)</td>
            <td>1.50em (~24px)</td>
          </tr>
          <tr>
            <td><code>&lt;h3&gt;</code></td>
            <td>ఉప-విభాగం (Sub-section)</td>
            <td>అధ్యాయంలోని ఉప-శీర్షిక (Sub-topic)</td>
            <td>1.17em (~18.7px)</td>
          </tr>
          <tr>
            <td><code>&lt;h4&gt;</code></td>
            <td>చిన్న శీర్షిక (Minor Topic)</td>
            <td>సబ్-టాపిక్ లోని చిన్న విభాగం</td>
            <td>1.00em (~16px)</td>
          </tr>
          <tr>
            <td><code>&lt;h5&gt;</code></td>
            <td>అల్ప శీర్షిక (Sub-minor)</td>
            <td>సైడ్‌బార్ లేదా కార్డ్ హెడ్డింగ్</td>
            <td>0.83em (~13.3px)</td>
          </tr>
          <tr>
            <td><code>&lt;h6&gt;</code></td>
            <td>అత్యల్ప ప్రాధాన్యత (Least Important)</td>
            <td>ఫుట్‌నోట్ లేదా చట్టబద్ధమైన చిన్న హెడ్డింగ్</td>
            <td>0.67em (~10.7px)</td>
          </tr>
        </tbody>
      </table>

      <div class="callout" style="border-left-color:#ef4444;">
        <div class="callout-title" style="color:#ef4444;">⚠️ హెడ్డింగ్స్ విషయంలో అతిపెద్ద SEO నియమం:</div>
        <p>1. <strong>ఒక పేజీకి కేవలం ఒక్క <code>&lt;h1&gt;</code> మాత్రమే ఉండాలి!</strong> అది పేజీ యొక్క ప్రధాన అంశాన్ని వివరించాలి.<br>
        2. <strong>హెడ్డింగ్ స్థాయిలను ఎప్పుడూ దాటవేయకూడదు (Do not skip levels):</strong> <code>&lt;h1&gt;</code> తర్వాత నేరుగా <code>&lt;h3&gt;</code> లేదా <code>&lt;h4&gt;</code> కి వెళ్ళకూడదు. క్రమపద్ధతిలో <code>h1 ➔ h2 ➔ h3</code> అని మాత్రమే వెళ్ళాలి. లేకపోతే స్క్రీన్ రీడర్స్ మరియు గూగుల్ బాట్స్ గందరగోళానికి గురవుతాయి!</p>
      </div>
    </div>

    <!-- SECTION 3 -->
    <div class="section-title"><span class="num">3</span>పేరాగ్రాఫ్స్ (&lt;p&gt;), లైన్ బ్రేక్స్ (&lt;br&gt;) మరియు విభజన గీతలు (&lt;hr&gt;)</div>
    <div class="section-body">
      <p>టెక్స్ట్ కంటెంట్‌ను విభజించడానికి ఈ మూడు ట్యాగ్‌లు ప్రాథమిక సాధనాలు:</p>

      <div style="display:flex; flex-direction:column; gap:16px; margin:20px 0;">
        <div style="background:var(--bg2); border-left:4px solid #10b981; padding:16px; border-radius:0 8px 8px 0;">
          <strong style="color:#10b981; font-size:15px;">1. &lt;p&gt; (Paragraph Tag):</strong><br>
          పేజీలోని సాధారణ టెక్స్ట్ పేరాగ్రాఫ్‌లను రాయడానికి దీనిని వాడతారు. బ్రౌజర్లు ప్రతి <code>&lt;p&gt;</code> ఎలిమెంట్‌కు ఆటోమేటిక్‌గా పైన మరియు కింద <code>1em</code> (సుమారు 16px) మార్జిన్ స్పేస్‌ను ఇస్తాయి. దీనివల్ల పేరాగ్రాఫ్‌లు ఒకదానికొకటి అంటుకోకుండా స్పష్టంగా కనిపిస్తాయి.
        </div>

        <div style="background:var(--bg2); border-left:4px solid #38bdf8; padding:16px; border-radius:0 8px 8px 0;">
          <strong style="color:#38bdf8; font-size:15px;">2. &lt;br&gt; (Line Break Tag - Void Element):</strong><br>
          కొత్త పేరాగ్రాఫ్ ప్రారంభించకుండా, కేవలం అదే పేరాగ్రాఫ్ లోపల తర్వాతి లైన్‌కు వెళ్ళడానికి <code>&lt;br&gt;</code> వాడతారు. ఇది చిరునామాలు (Addresses) మరియు కవితలు (Poems) రాయడానికి సరైనది. <em>(గమనిక: పేరాగ్రాఫ్‌ల మధ్య ఖాళీ పెంచడానికి పదే పదే <code>&lt;br&gt;&lt;br&gt;&lt;br&gt;</code> వాడకూడదు, CSS మార్జిన్ వాడాలి).</em>
        </div>

        <div style="background:var(--bg2); border-left:4px solid #f59e0b; padding:16px; border-radius:0 8px 8px 0;">
          <strong style="color:#f59e0b; font-size:15px;">3. &lt;hr&gt; (Horizontal Thematic Break - Void Element):</strong><br>
          ఆధునిక HTML5 లో <code>&lt;hr&gt;</code> అనేది కేవలం ఒక గీత మాత్రమే కాదు. కథలో లేదా ఆర్టికల్‌లో ఒక ముఖ్యమైన సన్నివేశం/విషయం ముగిసి, వేరొక సరికొత్త టాపిక్ ప్రారంభమైందని సూచించే <strong>సెమాంటిక్ డివైడర్</strong>.
        </div>
      </div>
    </div>

    <!-- SECTION 4 -->
    <div class="section-title"><span class="num">4</span>&lt;strong&gt; vs &lt;b&gt; — కనిపించడానికి ఒకటే, కానీ ఆంతర్యం వేరు!</div>
    <div class="section-body">
      <p>స్క్రీన్ మీద చూసినప్పుడు <code>&lt;strong&gt;</code> మరియు <code>&lt;b&gt;</code> రెండూ అక్షరాలను <strong>లావుగా (Bold)</strong> నే చూపిస్తాయి. కానీ వాటి అంతర్గత తాత్వికత పూర్తిగా వేరు:</p>

      <table class="tbl">
        <thead>
          <tr>
            <th>ఫీచర్</th>
            <th><code>&lt;strong&gt;</code> (సెమాంటిక్ - అర్ధవంతమైనది)</th>
            <th><code>&lt;b&gt;</code> (నాన్-సెమాంటిక్ - కేవలం అలంకరణ)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>ఉద్దేశం</strong></td>
            <td>విషయంలో <strong>తీవ్రమైన ప్రాముఖ్యత, హెచ్చరిక లేదా గంభీరత</strong> ఉందని సూచిస్తుంది.</td>
            <td>కేవలం దృష్టిని ఆకర్షించడానికి అక్షరాలను లావుగా చూపుతుంది (ఎలాంటి ప్రాముఖ్యత లేదు).</td>
          </tr>
          <tr>
            <td><strong>స్క్రీన్ రీడర్స్</strong></td>
            <td>అంధులకు చదివేటప్పుడు గొంతును గట్టిగా నొక్కి, ఒత్తిడితో చదువుతుంది.</td>
            <td>సాధారణ అక్షరాల లాగానే మామూలుగా చదువుతుంది.</td>
          </tr>
          <tr>
            <td><strong>Google SEO</strong></td>
            <td>సెర్చ్ ఇంజన్లు ఈ పదాలను కీలకమైన కీవర్డ్స్‌గా గుర్తిస్తాయి.</td>
            <td>సెర్చ్ ఇంజన్లు ఎలాంటి అదనపు ప్రాధాన్యత ఇవ్వవు.</td>
          </tr>
          <tr>
            <td><strong>ఉదాహరణ</strong></td>
            <td><code>&lt;strong&gt;హెచ్చరిక:&lt;/strong&gt; విద్యుత్ తీగలను తాకవద్దు!</code></td>
            <td>పుస్తకంలో కీవర్డ్: <code>ఈ కథలోని ముఖ్య పాత్ర &lt;b&gt;రాముడు&lt;/b&gt;.</code></td>
          </tr>
        </tbody>
      </table>

      <div class="callout">
        <div class="callout-title">💡 మోడరన్ వెబ్ బెస్ట్ ప్రాక్టీస్:</div>
        <p>ఆధునిక వెబ్ ప్రమాణాల ప్రకారం ముఖ్యమైన సమాచారాన్ని బోల్డ్ చేయడానికి ఎల్లప్పుడూ <code>&lt;strong&gt;</code> కే ప్రాధాన్యత ఇవ్వండి!</p>
      </div>
    </div>

    <!-- SECTION 5 -->
    <div class="section-title"><span class="num">5</span>&lt;em&gt; vs &lt;i&gt; — భావోద్వేగ ప్రాధాన్యత (Emphasis vs Italic)</div>
    <div class="section-body">
      <p>బోల్డ్ ట్యాగ్‌ల లాగే <code>&lt;em&gt;</code> మరియు <code>&lt;i&gt;</code> రెండూ స్క్రీన్ మీద అక్షరాలను <em>వాలుగా (Italics)</em> చూపిస్తాయి. కానీ వాటి ఉద్దేశం వేరు:</p>

      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.8;">
        <li>
          <strong><code>&lt;em&gt;</code> (Emphasis - ఉద్ఘాటన):</strong> వాక్యంలో ఒక నిర్దిష్ట పదంపై నొక్కి చెప్పడానికి (Stress emphasis) దీనిని వాడతారు. ఆ పదం మారితే మొత్తం వాక్యం యొక్క భావమే మారిపోతుంది! ఉదాహరణకు:<br>
          • <em>నేను</em> నిన్న సినిమా చూశాను (వేరెవరో కాదు, నేనే).<br>
          • నేను <em>నిన్న</em> సినిమా చూశాను (ఈరోజు కాదు, నిన్ననే).<br>
          • నేను నిన్న <em>సినిమా</em> చూశాను (నాటకం కాదు, సినిమా).
        </li>
        <li>
          <strong><code>&lt;i&gt;</code> (Idiomatic Text / Italic):</strong> వాక్యంలో వేరే మూడ్‌ను సూచించడానికి — సాంకేతిక పదాలు (Technical terms), ఇతర భాషా పదాలు (Foreign phrases), ఓడల పేర్లు లేదా ఆలోచనలను చూపించడానికి వాడతారు. ఉదాహరణ: <code>టైటానిక్ ఓడను &lt;i&gt;RMS Titanic&lt;/i&gt; అని పిలుస్తారు.</code>
        </li>
      </ul>
    </div>

    <!-- SECTION 6 -->
    <div class="section-title"><span class="num">6</span>ఆధునిక టెక్స్ట్ ఫార్మాటింగ్ ట్యాగ్స్ నిఘంటువు (mark, del, ins, small)</div>
    <div class="section-body">
      <p>HTML5 లో కంటెంట్‌ను అత్యంత ఆకర్షణీయంగా మార్చే శక్తివంతమైన టెక్స్ట్ ట్యాగ్‌లు ఉన్నాయి:</p>

      <table class="tbl">
        <thead>
          <tr>
            <th>ట్యాగ్</th>
            <th>సింటాక్స్ ఉదాహరణ</th>
            <th>డిస్ప్లే ఫలితం</th>
            <th>వాస్తవ ఉపయోగం</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>&lt;mark&gt;</code></td>
            <td><code>&lt;mark&gt;ముఖ్యమైన గమనిక&lt;/mark&gt;</code></td>
            <td><mark style="background:#fef08a; padding:2px 4px; border-radius:3px;">ముఖ్యమైన గమనిక</mark></td>
            <td>హైలైటర్ పెన్‌తో గీసినట్లు పసుపు రంగులో హైలైట్ చేస్తుంది (సెర్చ్ రిజల్ట్స్‌లో వాడతారు).</td>
          </tr>
          <tr>
            <td><code>&lt;del&gt;</code></td>
            <td><code>&lt;del&gt;₹2,999&lt;/del&gt;</code></td>
            <td><del>₹2,999</del></td>
            <td>తొలగించిన లేదా పాతదైన టెక్స్ట్‌పై కొట్టివేత గీత (Strikethrough) వేస్తుంది.</td>
          </tr>
          <tr>
            <td><code>&lt;ins&gt;</code></td>
            <td><code>&lt;ins&gt;₹1,499&lt;/ins&gt;</code></td>
            <td><ins>₹1,499</ins></td>
            <td>కొత్తగా చేర్చిన టెక్స్ట్ కింద అండర్‌లైన్ వేస్తుంది (ఆఫర్ ధరలు, డాక్యుమెంట్ సవరణలు).</td>
          </tr>
          <tr>
            <td><code>&lt;small&gt;</code></td>
            <td><code>&lt;small&gt;&copy; 2026 కాపీరైట్&lt;/small&gt;</code></td>
            <td><small>&copy; 2026 కాపీరైట్</small></td>
            <td>చట్టబద్ధమైన నిబంధనలు, నిరాకరణలు (Disclaimers) మరియు కాపీరైట్ చిన్న అక్షరాల కోసం.</td>
          </tr>
          <tr>
            <td><code>&lt;s&gt;</code></td>
            <td><code>&lt;s&gt;స్టాక్ అయిపోయింది&lt;/s&gt;</code></td>
            <td><s>స్టాక్ అయిపోయింది</s></td>
            <td>ఇకపై చెల్లని లేదా వర్తించని సమాచారాన్ని కొట్టివేయడానికి.</td>
          </tr>
        </tbody>
      </table>

      <div style="background:var(--bg2); border:1px solid var(--border); border-radius:10px; padding:16px; margin:20px 0;">
        <strong style="color:#10b981;">🛒 ఇ-కామర్స్ ఆఫర్ ధర కోడింగ్ ఉదాహరణ:</strong>
        <p style="margin:8px 0 0 0; font-size:15px;">
          ఆధునిక ప్రొడక్ట్ కార్డులలో డిస్కౌంట్ చూపించడానికి: 
          <code>ధర: &lt;del&gt;₹4,999&lt;/del&gt; &lt;ins&gt;₹2,499&lt;/ins&gt; (50% ఆదా!)</code>
        </p>
      </div>
    </div>

    <!-- SECTION 7 -->
    <div class="section-title"><span class="num">7</span>గణిత &amp; సైన్స్ ఫార్ములాలు: &lt;sup&gt; మరియు &lt;sub&gt;</div>
    <div class="section-body">
      <p>గణిత సమీకరణాలు, తేదీలు మరియు రసాయన ఫార్ములాలను సరైన పద్ధతిలో రాయడానికి HTML లో రెండు అద్భుతమైన ట్యాగ్‌లు ఉన్నాయి:</p>

      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:16px; margin:20px 0;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:10px; padding:18px;">
          <div style="font-weight:700; color:#10b981; font-size:16px; margin-bottom:8px;">📐 &lt;sup&gt; (Superscript - పైకి ఎక్కించే ట్యాగ్)</div>
          <p style="color:var(--text2); font-size:14px; line-height:1.6; margin-bottom:10px;">
            అక్షరాన్ని సాధారణ లైన్ కంటే కొంచెం పైకి, చిన్న సైజులో ఉంచుతుంది. గణిత ఘాతాంకాలు (Powers) మరియు తేదీల కోసం ఉపయోగిస్తారు.
          </p>
          <div style="background:var(--bg3); padding:10px; border-radius:6px; font-family:'JetBrains Mono', monospace; font-size:13.5px;">
            కోడ్: (a + b)&lt;sup&gt;2&lt;/sup&gt; = a&lt;sup&gt;2&lt;/sup&gt; + b&lt;sup&gt;2&lt;/sup&gt; + 2ab<br>
            ఫలితం: <strong>(a + b)<sup>2</sup> = a<sup>2</sup> + b<sup>2</sup> + 2ab</strong><br><br>
            కోడ్: 15&lt;sup&gt;th&lt;/sup&gt; August<br>
            ఫలితం: <strong>15<sup>th</sup> August</strong>
          </div>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:10px; padding:18px;">
          <div style="font-weight:700; color:#10b981; font-size:16px; margin-bottom:8px;">🧪 &lt;sub&gt; (Subscript - కిందకు దించే ట్యాగ్)</div>
          <p style="color:var(--text2); font-size:14px; line-height:1.6; margin-bottom:10px;">
            అక్షరాన్ని సాధారణ లైన్ కంటే కొంచెం కిందకు, చిన్న సైజులో ఉంచుతుంది. కెమిస్ట్రీ ఫార్ములాలు మరియు గణిత బేస్ నంబర్లకు వాడతారు.
          </p>
          <div style="background:var(--bg3); padding:10px; border-radius:6px; font-family:'JetBrains Mono', monospace; font-size:13.5px;">
            కోడ్: నీరు = H&lt;sub&gt;2&lt;/sub&gt;O<br>
            ఫలితం: <strong>నీరు = H<sub>2</sub>O</strong><br><br>
            కోడ్: గ్లూకోజ్ = C&lt;sub&gt;6&lt;/sub&gt;H&lt;sub&gt;12&lt;/sub&gt;O&lt;sub&gt;6&lt;/sub&gt;<br>
            ఫలితం: <strong>గ్లూకోజ్ = C<sub>6</sub>H<sub>12</sub>O<sub>6</sub></strong>
          </div>
        </div>
      </div>
    </div>

    <!-- SECTION 8 -->
    <div class="section-title"><span class="num">8</span>వైట్‌స్పేస్ కొలాప్స్ &amp; ప్రీఫార్మాటెడ్ టెక్స్ట్ (&lt;pre&gt;, &lt;code&gt;, &lt;kbd&gt;)</div>
    <div class="section-body">
      <p>HTML లో చాలా ఆసక్తికరమైన ఒక ప్రవర్తన ఉంది. దానిని <strong>Whitespace Collapse (ఖాళీలను కుదించడం)</strong> అంటారు. ఉదాహరణకు మీరు HTML కోడ్‌లో ఒక పదం తర్వాత 10 స్పేస్‌లు ఇచ్చినా, లేదా 5 సార్లు Enter కొట్టినా, బ్రౌజర్ వాటన్నింటినీ కేవలం <strong>ఒకే ఒక్క స్పేస్</strong> గా కుదించి చూపిస్తుంది!</p>

      <div class="code-block">
        <pre><code>&lt;!-- బ్రౌజర్ ఇందులో ఉన్న అన్ని స్పేస్‌లను, ఎంటర్‌లను తొలగించి ఒకే లైన్‌లో చూపుతుంది --&gt;
&lt;p&gt;
   హలో        తెలుగు
       మిత్రులారా!
&lt;/p&gt;</code></pre>
      </div>

      <p><strong>దీనిని యథాతథంగా చూపించడానికి పరిష్కారం — &lt;pre&gt; ట్యాగ్:</strong></p>
      <p><code>&lt;pre&gt;</code> (Preformatted Text) ట్యాగ్ లోపల మీరు ఎన్ని స్పేస్‌లు ఇస్తే అన్ని స్పేస్‌లు, ఎన్ని లైన్లు మారితే అన్ని లైన్లు ఖచ్చితంగా అలాగే బ్రౌజర్‌లో రెండర్ అవుతాయి. దీనిని కవితలు, ASCII ఆర్ట్ మరియు కంప్యూటర్ కోడ్ చూపించడానికి వాడతారు:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">Preformatted & Keyboard Shortcut</span>
        </div>
        <pre><code>&lt;!-- pre ట్యాగ్ స్పేస్‌లను అలాగే కాపాడుతుంది --&gt;
&lt;pre&gt;
గురజాడ అప్పారావు గారి మాట:
   దేశమును ప్రేమించుమన్నా,
   మంచియన్నది పెంచుమన్నా!
&lt;/pre&gt;

&lt;!-- kbd ట్యాగ్ కీబోర్డ్ షార్ట్‌కట్లను సూచిస్తుంది --&gt;
&lt;p&gt;కాపీ చేయడానికి &lt;kbd&gt;Ctrl&lt;/kbd&gt; + &lt;kbd&gt;C&lt;/kbd&gt; నొక్కండి.&lt;/p&gt;</code></pre>
      </div>
    </div>

    <!-- SECTION 9 -->
    <div class="section-title"><span class="num">9</span>పరిపూర్ణ ప్రాక్టికల్ లైవ్ ఉదాహరణ (Complete Runnable Code)</div>
    <div class="section-body">
      <p>ఈ అధ్యాయంలో నేర్చుకున్న హెడ్డింగ్స్, పేరాగ్రాఫ్స్, ఫార్మాటింగ్, మ్యాథ్స్, కెమిస్ట్రీ మరియు ప్రీఫార్మాటెడ్ ట్యాగ్స్ అన్నింటినీ కలిపి ఒక ప్రొఫెషనల్ ఆర్టికల్ కోడ్‌ను పరిశీలిద్దాం:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">HTML5 Text Formatting Master Demo</span>
          <div class="code-actions">
            <a class="try-btn" href="/online-html-editor.html" target="_blank">▶ Run in Online HTML Editor</a>
          </div>
        </div>
        <pre><code>&lt;!DOCTYPE html&gt;
&lt;html lang="te"&gt;
  &lt;head&gt;
    &lt;meta charset="UTF-8" /&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0" /&gt;
    &lt;title&gt;టెక్స్ట్ ఫార్మాటింగ్ మాస్టర్ డెమో | Our Compiler&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;!-- ప్రధాన శీర్షిక (h1) --&gt;
    &lt;h1&gt;ఆధునిక వెబ్ టెక్నాలజీస్ పరిచయం&lt;/h1&gt;
    &lt;p&gt;రచయిత: &lt;strong&gt;అవర్ కంపైలర్ ఎడిటోరియల్ టీమ్&lt;/strong&gt; &middot; ప్రచురణ: &lt;small&gt;2026 ఎడిషన్&lt;/small&gt;&lt;/p&gt;

    &lt;hr /&gt;

    &lt;!-- ఉప-శీర్షిక (h2) --&gt;
    &lt;h2&gt;1. ముఖ్యమైన ఫార్మాటింగ్ నియమాలు&lt;/h2&gt;
    &lt;p&gt;
      వెబ్‌సైట్లలో &lt;strong&gt;strong ట్యాగ్&lt;/strong&gt; ప్రాముఖ్యతను సూచిస్తుంది, మరియు &lt;em&gt;em ట్యాగ్&lt;/em&gt; భావోద్వేగ ఒత్తిడిని సూచిస్తుంది.
      సెర్చ్ ఫలితాలలో కీవర్డ్స్‌ను చూపించడానికి &lt;mark&gt;హైలైటింగ్ మార్క్&lt;/mark&gt; ట్యాగ్ అద్భుతంగా పనిచేస్తుంది.
    &lt;/p&gt;

    &lt;!-- ఇ-కామర్స్ ఆఫర్ విభాగం (h3) --&gt;
    &lt;h3&gt;ప్రత్యేక కోర్సు ఆఫర్&lt;/h3&gt;
    &lt;p&gt;
      కోర్సు అసలు ఫీజు: &lt;del&gt;&amp;#8377;3,999&lt;/del&gt; &lt;br /&gt;
      నేటి ప్రత్యేక డిస్కౌంట్ ధర: &lt;ins&gt;&amp;#8377;1,499&lt;/ins&gt; మాత్రమే!
    &lt;/p&gt;

    &lt;!-- సైన్స్ & మ్యాథ్స్ విభాగం (h3) --&gt;
    &lt;h3&gt;2. సైన్స్ &amp; గణిత సమీకరణాలు&lt;/h3&gt;
    &lt;p&gt;
      &amp;bull; ఆక్సిజన్ మరియు హైడ్రోజన్ కలిస్తే నీరు (H&lt;sub&gt;2&lt;/sub&gt;O) ఏర్పడుతుంది. &lt;br /&gt;
      &amp;bull; ఐన్‌స్టీన్ ద్రవ్యరాశి శక్తి సమీకరణం: E = mc&lt;sup&gt;2&lt;/sup&gt;
    &lt;/p&gt;

    &lt;!-- కీబోర్డ్ షార్ట్‌కట్ --&gt;
    &lt;p&gt;
      కోడ్ రన్ చేయడానికి &lt;kbd&gt;Ctrl&lt;/kbd&gt; + &lt;kbd&gt;Enter&lt;/kbd&gt; నొక్కండి.
    &lt;/p&gt;
  &lt;/body&gt;
&lt;/html&gt;</code></pre>
      </div>

      <p style="margin-top:16px;"><strong>బ్రౌజర్‌లో ఇది ఎలా కనిపిస్తుంది? (Visual Preview):</strong></p>
      <div style="background:#ffffff; border:1px solid #cbd5e1; border-radius:10px; padding:24px; margin:16px 0; box-shadow:0 4px 12px rgba(0,0,0,0.05); color:#0f172a;">
        <div style="display:flex; align-items:center; gap:8px; padding-bottom:12px; margin-bottom:16px; border-bottom:1px solid #e2e8f0; font-size:12px; color:#64748b;">
          <span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:#ef4444;"></span>
          <span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:#f59e0b;"></span>
          <span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:#10b981;"></span>
          <span style="margin-left:8px; font-family:'JetBrains Mono', monospace; font-size:11px;">https://www.ourcompiler.com/text-formatting-demo.html</span>
        </div>
        <h1 style="font-size:24px; font-weight:800; color:#0f172a; margin-bottom:4px;">ఆధునిక వెబ్ టెక్నాలజీస్ పరిచయం</h1>
        <p style="font-size:13.5px; color:#64748b; margin-bottom:16px;">రచయిత: <strong>అవర్ కంపైలర్ ఎడిటోరియల్ టీమ్</strong> &middot; ప్రచురణ: <small>2026 ఎడిషన్</small></p>
        <hr style="border:none; border-top:1px solid #e2e8f0; margin-bottom:16px;" />
        <h2 style="font-size:18px; font-weight:700; color:#059669; margin-bottom:8px;">1. ముఖ్యమైన ఫార్మాటింగ్ నియమాలు</h2>
        <p style="font-size:14.5px; line-height:1.7; color:#334155; margin-bottom:16px;">
          వెబ్‌సైట్లలో <strong>strong ట్యాగ్</strong> ప్రాముఖ్యతను సూచిస్తుంది, మరియు <em>em ట్యాగ్</em> భావోద్వేగ ఒత్తిడిని సూచిస్తుంది.
          సెర్చ్ ఫలితాలలో కీవర్డ్స్‌ను చూపించడానికి <mark style="background:#fef08a; padding:2px 4px; border-radius:3px;">హైలైటింగ్ మార్క్</mark> ట్యాగ్ అద్భుతంగా పనిచేస్తుంది.
        </p>
        <h3 style="font-size:16px; font-weight:700; color:#0f172a; margin-bottom:6px;">ప్రత్యేక కోర్సు ఆఫర్</h3>
        <p style="font-size:14.5px; color:#334155; margin-bottom:16px;">
          కోర్సు అసలు ఫీజు: <del>&#8377;3,999</del><br>
          నేటి ప్రత్యేక డిస్కౌంట్ ధర: <ins style="color:#059669; font-weight:700;">&#8377;1,499</ins> మాత్రమే!
        </p>
        <h3 style="font-size:16px; font-weight:700; color:#0f172a; margin-bottom:6px;">2. సైన్స్ &amp; గణిత సమీకరణాలు</h3>
        <p style="font-size:14.5px; color:#334155; margin-bottom:16px;">
          &bull; ఆక్సిజన్ మరియు హైడ్రోజన్ కలిస్తే నీరు (<strong>H<sub>2</sub>O</strong>) ఏర్పడుతుంది.<br>
          &bull; ఐన్‌స్టీన్ ద్రవ్యరాశి శక్తి సమీకరణం: <strong>E = mc<sup>2</sup></strong>
        </p>
        <div style="font-size:13px; color:#475569; background:#f8fafc; padding:10px 14px; border-radius:6px; border:1px solid #e2e8f0;">
          ⌨️ కోడ్ రన్ చేయడానికి <kbd style="background:#e2e8f0; padding:2px 6px; border-radius:4px; font-family:'JetBrains Mono', monospace;">Ctrl</kbd> + <kbd style="background:#e2e8f0; padding:2px 6px; border-radius:4px; font-family:'JetBrains Mono', monospace;">Enter</kbd> నొక్కండి.
        </div>
      </div>
    </div>

    <!-- SECTION 10 -->
    <div class="section-title"><span class="num">10</span>Beginners చేసే 5 ప్రధాన తప్పులు (Common Pitfalls)</div>
    <div class="section-body">
      <p>టెక్స్ట్ మరియు హెడ్డింగ్స్ వాడేటప్పుడు ప్రారంభకులు చేసే 5 పెద్ద తప్పులు:</p>

      <p style="font-weight:700; color:#ef4444; margin-top:16px;">❌ తప్పు 1: కేవలం ఫాంట్ సైజు పెద్దగా కనిపించడానికి &lt;h1&gt; వాడటం</p>
      <p style="color:var(--text2); font-size:14px;"><strong>నియమం:</strong> అక్షరాలు పెద్దగా కనిపించాలని హెడ్డింగ్ ట్యాగ్స్ వాడకూడదు. అక్షరాల సైజు మార్చడానికి CSS <code>font-size</code> వాడాలి. హెడ్డింగ్స్ కేవలం డాక్యుమెంట్ స్ట్రక్చర్ మరియు శీర్షికల కోసం మాత్రమే!</p>

      <p style="font-weight:700; color:#ef4444; margin-top:20px;">❌ తప్పు 2: పేజీలో మల్టిపుల్ &lt;h1&gt; ట్యాగ్స్ పెట్టడం</p>
      <p style="color:var(--text2); font-size:14px;"><strong>సమస్య:</strong> ఒక పేజీకి ఒకే ఒక్క <code>&lt;h1&gt;</code> మాత్రమే ఉండాలి. నాలుగైదు <code>h1</code> లు ఉంటే గూగుల్ సెర్చ్ ఇంజన్లకు పేజీ యొక్క అసలు ప్రధాన ఉద్దేశం ఏమిటో అర్థం కాదు.</p>

      <p style="font-weight:700; color:#ef4444; margin-top:20px;">❌ తప్పు 3: హెడ్డింగ్ లెవల్స్ స్కిప్ చేయడం (Heading Level Skipping)</p>
      <p style="color:var(--text2); font-size:14px;"><strong>లోపం:</strong> <code>&lt;h1&gt;</code> తర్వాత నేరుగా <code>&lt;h4&gt;</code> రాయడం. ఇది ప్రామాణిక హైరార్కీ నియమాలకు విరుద్ధం. ఎల్లప్పుడూ <code>h1 ➔ h2 ➔ h3</code> క్రమంలోనే వెళ్ళాలి.</p>

      <p style="font-weight:700; color:#ef4444; margin-top:20px;">❌ తప్పు 4: స్పేసింగ్ కోసం పదే పదే &lt;br&gt;&lt;br&gt;&lt;br&gt; కొట్టడం</p>
      <p style="color:var(--text2); font-size:14px;"><strong>సమస్య:</strong> ఎలిమెంట్ల మధ్య గ్యాప్ పెంచడానికి వరుసగా <code>&lt;br&gt;</code> లు వాడటం అత్యంత నాసిరకం పద్ధతి. ఎలిమెంట్ల మధ్య ఖాళీ కోసం CSS <code>margin-bottom</code> లేదా <code>gap</code> మాత్రమే వాడాలి.</p>

      <p style="font-weight:700; color:#ef4444; margin-top:20px;">❌ తప్పు 5: strong మరియు b ల మధ్య వ్యత్యాసం గుర్తించకపోవడం</p>
      <p style="color:var(--text2); font-size:14px;"><strong>సమస్య:</strong> స్క్రీన్ రీడర్స్ దృష్టిలో <code>&lt;strong&gt;</code> శ్రవణాత్మక ఒత్తిడిని కలిగిస్తుంది. కేవలం రంగు/లావు కోసమే అయితే CSS <code>font-weight: bold;</code> వాడాలి.</p>
    </div>

    <!-- SECTION 11 -->
    <div class="section-title"><span class="num">11</span>ప్రాక్టీస్ టాస్క్స్ & ఇంటర్వ్యూ క్విజ్ ప్రశ్నలు</div>
    <div class="section-body">
      <p>ఈ క్రింది ప్రశ్నలకు స్వయంగా సమాధానాలు ఆలోచించండి, ఆపై డ్రాప్‌డౌన్ తెరిచి పరిశీలించండి:</p>

      <ol style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.8;">
        <li><code>&lt;strong&gt;</code> మరియు <code>&lt;b&gt;</code> ల మధ్య స్క్రీన్ రీడర్స్ మరియు SEO పరంగా ఉన్న తేడా ఏమిటి?</li>
        <li>ఒక వెబ్‌పేజీలో ఎన్ని <code>&lt;h1&gt;</code> ట్యాగ్‌లు ఉండాలి? ఎందుకు?</li>
        <li>HTML లో Whitespace Collapse అంటే ఏమిటి? స్పేస్‌లను యథాతథంగా చూపించడానికి ఏ ట్యాగ్ వాడాలి?</li>
        <li>రసాయన సమీకరణం "H2SO4" (సల్ఫ్యూరిక్ యాసిడ్) మరియు గణిత సూత్రం "x3 + y3" లను సరైన HTML ట్యాగ్స్‌తో రాయండి.</li>
        <li>ఆధునిక HTML5 లో <code>&lt;hr&gt;</code> ట్యాగ్ యొక్క సెమాంటిక్ అర్థం ఏమిటి?</li>
      </ol>

      <details>
        <summary>🔍 సమాధానాలు & లోతైన వివరణ చూడండి (Click to expand)</summary>
        <div style="margin-top:12px; font-size:14.5px; line-height:1.7; color:var(--text2);">
          <p><strong>1. సమాధానం:</strong> <code>&lt;b&gt;</code> కేవలం దృశ్యరూపం కోసం మాత్రమే లావుగా చూపిస్తుంది. <code>&lt;strong&gt;</code> వాక్యానికి తీవ్రమైన ప్రాముఖ్యత ఉందని తెలియజేస్తుంది; స్క్రీన్ రీడర్స్ గట్టిగా ఒత్తిడితో చదువుతాయి మరియు SEO కి అదనపు విలువ లభిస్తుంది.</p>
          <p style="margin-top:8px;"><strong>2. సమాధానం:</strong> ఒక పేజీకి ఒకే ఒక్క <code>&lt;h1&gt;</code> మాత్రమే ఉండాలి. ఇది పుస్తకం పేరు లాంటిది. సెర్చ్ ఇంజన్లు పేజీ యొక్క ప్రధాన అంశాన్ని గుర్తించడానికి దీనిని ప్రామాణికంగా తీసుకుంటాయి.</p>
          <p style="margin-top:8px;"><strong>3. సమాధానం:</strong> HTML లో ఎన్ని స్పేస్‌లు లేదా లైన్ బ్రేకులు ఇచ్చినా బ్రౌజర్ వాటన్నింటినీ ఒకే ఒక్క స్పేస్‌గా కుదిస్తుంది. స్పేస్‌లు, లైన్లు యథాతథంగా కనిపించాలంటే <code>&lt;pre&gt;</code> ట్యాగ్ వాడాలి.</p>
          <p style="margin-top:8px;"><strong>4. సమాధానం:</strong> సల్ఫ్యూరిక్ యాసిడ్: <code>H&lt;sub&gt;2&lt;/sub&gt;SO&lt;sub&gt;4&lt;/sub&gt;</code>.<br>గణిత సమీకరణం: <code>x&lt;sup&gt;3&lt;/sup&gt; + y&lt;sup&gt;3&lt;/sup&gt;</code>.</p>
          <p style="margin-top:8px;"><strong>5. సమాధానం:</strong> ఆధునిక HTML5 లో <code>&lt;hr&gt;</code> అనేది ఒక టాపిక్ పూర్తయి వేరొక టాపిక్ ప్రారంభమైందని సూచించే థీమాటిక్ బ్రేక్ (Thematic Break) సెమాంటిక్ డివైడర్.</p>
        </div>
      </details>
    </div>

    <!-- SECTION 12 (TRY BOX) -->
    <div class="section-title"><span class="num">12</span>మీరే స్వయంగా Try చేయండి (Live Coding Playground)</div>
    <div class="section-body">
      <div class="try-box" style="margin-top:10px;">
        <div class="try-title">🚀 టెక్స్ట్ ఫార్మాటింగ్ ట్యాగ్స్‌తో మీ స్వంత ఆర్టికల్ రాయండి</div>
        <p>పైన నేర్చుకున్న హెడ్డింగ్స్, <code>strong</code>, <code>em</code>, <code>mark</code>, <code>del</code>, <code>sup</code>, <code>sub</code> ట్యాగ్‌లను మన ఇంటరాక్టివ్ ఎడిటర్‌లో నేరుగా రన్ చేసి చూడండి. మీ స్వంత బయోడేటా లేదా న్యూస్ ఆర్టికల్ రాసి లైవ్ ప్రివ్యూను పరిశీలించండి!</p>
        <a class="run-btn" href="/online-html-editor.html" target="_blank">
          👉 Our Compiler లో HTML Editor try చేయండి
        </a>
      </div>
    </div>

    <!-- SECTION 13 -->
    <div class="section-title"><span class="num">13</span>Phase 1 ముగింపు &amp; Phase 2 రోడ్‌మ్యాప్ (Milestone Celebration)</div>
    <div class="section-body">
      <div style="background:linear-gradient(135deg, rgba(16,185,129,0.12), rgba(20,24,32,0.03)); border:1px solid rgba(16,185,129,0.3); border-radius:12px; padding:22px; margin-bottom:20px;">
        <h4 style="color:#059669; font-size:18px; margin-bottom:8px;">🎉 అభినందనలు! మీరు విజయవంతంగా Phase 1 పూర్తి చేశారు!</h4>
        <p style="color:var(--text); font-size:15px; line-height:1.8; margin-bottom:10px;">
          ఈ 4 అధ్యాయాలతో మీరు HTML5 కి సంబంధించిన అత్యంత బలమైన పునాదిని నిర్మించుకున్నారు:
        </p>
        <ul style="color:var(--text2); font-size:14px; line-height:1.7; margin-left:20px; margin-bottom:0;">
          <li><strong>Chapter 1:</strong> HTML పరిచయం, వెబ్ చరిత్ర, Tim Berners-Lee CERN కథ, Web Trio &amp; ఎడిటర్స్ సెటప్.</li>
          <li><strong>Chapter 2:</strong> డాక్యుమెంట్ స్ట్రక్చర్, DOCTYPE, Standards vs Quirks mode, UTF-8 &amp; Mobile Viewport.</li>
          <li><strong>Chapter 3:</strong> ట్యాగ్స్ vs ఎలిమెంట్స్, Void Elements, గ్లోబల్ ఆట్రిబ్యూట్స్ (id, class, data-*) &amp; DOM Tree ఆర్కిటెక్చర్.</li>
          <li><strong>Chapter 4:</strong> హెడ్డింగ్స్ హైరార్కీ, పేరాగ్రాఫ్స్, strong vs b, em vs i, mark, del, sup &amp; sub.</li>
        </ul>
      </div>

      <p style="color:var(--text2); font-size:14.5px; line-height:1.8;">
        తదుపరి <strong>Phase 2 (Chapters 5 నుండి 8)</strong> లో మనం వెబ్‌సైట్లను అనుసంధానించే <strong>యాంకర్ ట్యాగ్స్ &amp; లింకులు (Links &amp; Navigation)</strong>, బుల్లెట్/నంబర్డ్ <strong>లిస్టులు (Lists)</strong>, రెస్పాన్సివ్ <strong>ఇమేజెస్ (picture, srcset &amp; WebP)</strong>, మరియు అడ్వాన్స్‌డ్ <strong>టేబుల్స్ (Tables, Colspan &amp; Rowspan)</strong> గురించి విప్లవాత్మకంగా నేర్చుకోబోతున్నాం!
      </p>
    </div>
`;

// Build the full HTML document
const fullPageHtml = `<!DOCTYPE html>
<html class="light-theme" lang="te">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${lesson.title} — Modern HTML5 Tutorial | Our Compiler</title>
  <meta name="description" content="${lesson.title} సమగ్ర తెలుగు గైడ్: ${lesson.subtopics}." />
  <meta name="keywords" content="html5 tutorial in telugu, learn html5, ${lesson.title.toLowerCase()}, web development, our compiler" />
  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />
  <link rel="icon" type="image/png" href="/logo.png" />
  <link rel="canonical" href="https://www.ourcompiler.com/blog-html/${lesson.file}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;500;600;700&family=Sora:wght@400;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/blog-style.css" />
  <link rel="stylesheet" href="/blog-html/style.css" />
  <link rel="stylesheet" href="/site-nav.css" />

  <!-- Schema.org TechArticle Structured Data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": "${lesson.title} (HTML5 in Telugu)",
    "description": "${lesson.subtopics}",
    "articleSection": "${lesson.phaseTag}: ${lesson.phaseTitle}",
    "inLanguage": "te",
    "author": {
      "@type": "Organization",
      "name": "Our Compiler Technical Editorial Team",
      "url": "https://www.ourcompiler.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Our Compiler",
      "url": "https://www.ourcompiler.com"
    },
    "datePublished": "2026-02-01",
    "dateModified": "2026-10-30"
  }
  </script>

  <!-- Interactive Scripts: Accordion, Theme & Code Enhancements -->
  <script>
    function toggleAccordion(btn) {
      const content = btn.nextElementSibling;
      const isOpen = content.classList.contains('open');
      if (isOpen) {
        content.classList.remove('open');
        btn.classList.remove('active');
      } else {
        content.classList.add('open');
        btn.classList.add('active');
      }
    }

    (function() {
      const currentTheme = localStorage.getItem('tutorial_theme_v2');
      if (currentTheme === 'dark') {
        document.documentElement.classList.remove('light-theme');
        document.addEventListener('DOMContentLoaded', () => {
          if (document.body) document.body.classList.remove('light-theme');
        });
      } else {
        document.documentElement.classList.add('light-theme');
        document.addEventListener('DOMContentLoaded', () => {
          if (document.body) document.body.classList.add('light-theme');
        });
      }

      window.addEventListener('DOMContentLoaded', () => {
        // Code Block Actions: Copy & Online Editor Runner
        document.querySelectorAll('.code-block').forEach(block => {
          const header = block.querySelector('.code-block-header');
          const codeEl = block.querySelector('pre code');
          if (!header || !codeEl) return;

          const rawCode = codeEl.textContent;

          let actionsContainer = header.querySelector('.code-actions');
          if (!actionsContainer) {
            actionsContainer = document.createElement('div');
            actionsContainer.className = 'code-actions';
            actionsContainer.style.cssText = 'display: flex; gap: 8px; align-items: center; margin-left: auto;';
            const tryBtn = header.querySelector('.try-btn');
            if (tryBtn) actionsContainer.appendChild(tryBtn);
            header.appendChild(actionsContainer);
          }

          const copyBtn = document.createElement('button');
          copyBtn.className = 'copy-btn';
          copyBtn.innerHTML = '📋 Copy';
          copyBtn.style.cssText = 'background: rgba(255, 255, 255, 0.15); color: #ffffff; border: 1px solid rgba(255, 255, 255, 0.25); border-radius: 6px; padding: 4px 10px; font-size: 11px; font-weight: 600; cursor: pointer; transition: all 0.2s; font-family: "Inter", sans-serif; white-space: nowrap;';
          copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(rawCode).then(() => {
              copyBtn.innerHTML = '✅ Copied!';
              setTimeout(() => { copyBtn.innerHTML = '📋 Copy'; }, 2000);
            });
          });
          actionsContainer.insertBefore(copyBtn, actionsContainer.firstChild);

          const tryBtn = actionsContainer.querySelector('.try-btn');
          if (tryBtn) {
            tryBtn.addEventListener('click', (e) => {
              e.preventDefault();
              localStorage.setItem('code_html', rawCode);
              window.open('/online-html-editor.html', '_blank');
            });
          }
        });
      });
    })();
  </script>
</head>
<body class="lang-html light-theme">

<!-- TOP NAVIGATION FALLBACK -->
<nav class="topnav">
  <a href="/" class="brand">🖥️ Our Compiler</a>
  <a href="/blog-python.html">Python</a>
  <a href="/blog-java.html">Java</a>
  <a href="/online-html-editor.html" class="active">HTML/CSS/JS</a>
  <a href="/blog-c.html">C</a>
  <a href="/blog-cpp.html">C++</a>
  <a href="/blog-javascript.html">JavaScript</a>
  <a href="/blog-csharp.html">C#</a>
</nav>

<div class="layout">
${sidebarHtml}

  <!-- MAIN LESSON CONTENT -->
  <main class="content">
${chapterContentHtml}

    <!-- PREV / NEXT NAVIGATION -->
    <div style="display:flex; justify-content:space-between; align-items:center; margin-top:40px; padding-top:20px; border-top:1px solid var(--border); flex-wrap:wrap; gap:16px;">
      <a href="/blog-html/${lesson.prev.file}" style="display:inline-flex; align-items:center; gap:8px; padding:10px 18px; border-radius:8px; background:var(--bg3); border:1px solid var(--border); color:var(--text); text-decoration:none; font-weight:700; font-size:13.5px;">
        ← Prev: ${lesson.prev.title}
      </a>
      <a href="/blog-html/${lesson.next.file}" style="display:inline-flex; align-items:center; gap:8px; padding:10px 20px; border-radius:8px; background:linear-gradient(135deg, #10b981, #059669); color:#ffffff; text-decoration:none; font-weight:700; font-size:13.5px; box-shadow:0 2px 10px rgba(16,185,129,0.2);">
        Next: ${lesson.next.title} →
      </a>
    </div>

    <!-- AUTHOR FOOTER -->
    <div class="author" style="margin-top:36px;">
      <div class="avatar">OC</div>
      <div>
        <strong>Written by Our Compiler Technical Editorial Team</strong><br>
        <span>Reviewed for accuracy & tested across modern Web Standards / W3C & WHATWG · 2026 Academic Edition</span>
      </div>
    </div>

  </main>
</div>

<!-- SITE NAVIGATION LOADER -->
<script src="/site-nav.js" defer></script>
</body>
</html>
`;

const targetFile = path.join(__dirname, '..', 'public', 'blog-html', '04-html-headings-paragraphs-and-text-formatting.html');
fs.writeFileSync(targetFile, fullPageHtml, 'utf8');
console.log('✅ Successfully generated deep high-value Chapter 4 (Phase 1 Finale)!');
console.log('Target file size:', fullPageHtml.length, 'characters');
