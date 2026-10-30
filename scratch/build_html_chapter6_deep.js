const fs = require('fs');
const path = require('path');
const { LESSONS, buildSidebar } = require('./html_curriculum_data.js');

const lesson = LESSONS.find(l => l.num === 6);
const sidebarHtml = buildSidebar(6);

const chapterContentHtml = `
    <!-- BREADCRUMB -->
    <div class="breadcrumb">
      <a href="/">Home</a><span class="sep">›</span>
      <a href="/blog.html">Tutorials</a><span class="sep">›</span>
      <a href="/blog-html.html">HTML5 Masterclass</a><span class="sep">›</span>
      <span class="current">Chapter 6: లిస్టులు: Unordered (ul), Ordered (ol) & Description Lists (dl)</span>
    </div>

    <!-- PAGE TITLE -->
    <h1 class="page-title">లిస్టులు: Unordered (ul), Ordered (ol) & Description Lists (dl)</h1>

    <!-- PAGE META BADGES -->
    <div class="page-meta">
      <span class="badge">🌐 Modern HTML5 (W3C/WHATWG)</span>
      <span class="badge">🟢 Chapter 6 of 20</span>
      <span class="badge">📂 Phase 02: లింకులు, లిస్టులు, టేబుల్స్ & మల్టీమీడియా</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

    <!-- SUBTOPICS PILL BAR -->
    <div style="background:var(--bg3); border:1px solid var(--border); border-radius:8px; padding:10px 16px; margin-bottom:24px; font-size:13px; color:var(--text2); display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
      <span style="color:#10b981; font-weight:700;">📌 Covered in this chapter:</span>
      <span>బుల్లెట్ లిస్టులు ul · నంబర్డ్ లిస్టులు ol · నంబరింగ్ రకాలు (1, a, A, i, I) · start & reversed ఆట్రిబ్యూట్లు · నెస్టెడ్ లిస్టులు (Multi-level) · డిస్క్రిప్షన్ లిస్టులు (dl, dt, dd) · లిస్టులతో నావిగేషన్ మెనూ బార్స్ · బిగినర్స్ తప్పులు & క్విజ్</span>
    </div>

    <!-- INTRO ACCENT BOX (Warm Ivory with Green Accent) -->
    <div class="intro-box">
      <p>మీరు సూపర్ మార్కెట్‌కు వెళ్ళేముందు కాగితం మీద రాసుకునే సరుకుల చిట్టా (Grocery List) ను లేదా ఒక రుచికరమైన బిర్యానీ తయారుచేసే రెసిపీ (Recipe Steps) ని ఒక్కసారి గమనించండి. సరుకుల చిట్టాలో పప్పు, ఉప్పు, నూనెలను ఏ క్రమంలో కొన్నా ఇబ్బంది లేదు — కేవలం బుల్లెట్ పాయింట్లు ఉంటే సరిపోతుంది. కానీ వంటకం చేసే విధానంలో మాత్రం క్రమం (1, 2, 3...) ఖచ్చితంగా పాటించాలి — స్టవ్ వెలిగించకుండానే గిన్నెలో నూనె వేయలేం కదా!</p>
      <p>వెబ్‌సైట్లలో కూడా సమాచారాన్ని పాఠకులకు కంటికి ఇంపుగా, క్రమబద్ధంగా అందించడానికి <strong>HTML Lists (జాబితాలు)</strong> అత్యంత శక్తివంతమైన సాధనాలు.</p>
      <p>అంతేకాదు, ప్రపంచంలోని దాదాపు ప్రతి పెద్ద వెబ్‌సైట్ (Amazon, Flipkart, Netflix, Google) లో మీరు పైన చూసే అందమైన <strong>నావిగేషన్ మెనూ బార్స్ (Navbars)</strong> మరియు డ్రాప్‌డౌన్స్ అన్నీ కూడా తెరవెనుక సాధారణ <code>&lt;ul&gt;</code> మరియు <code>&lt;li&gt;</code> లిస్టులతోనే నిర్మించబడతాయన్న సంగతి చాలామందికి తెలియదు! ఈ ఆరవ అధ్యాయంలో మనం మూడు రకాల లిస్టులను (Unordered, Ordered, Description Lists), నెస్టెడ్ లిస్టుల ఆర్కిటెక్చర్‌ను, మరియు ప్రొఫెషనల్ మెనూల నిర్మాణాన్ని పూర్తి తెలుగులో, ప్రాక్టికల్ లైవ్ కోడింగ్‌తో నేర్చుకుందాం!</p>
    </div>

    <!-- SECTION 1 -->
    <div class="section-title"><span class="num">1</span>ఈ Chapter లో మీరు నేర్చుకునే అంశాలు</div>
    <div class="section-body">
      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.7;">
        <li><strong>మూడు రకాల HTML లిస్టులు:</strong> Unordered (ul), Ordered (ol), మరియు Description Lists (dl) ల ప్రాథమిక వ్యత్యాసాలు.</li>
        <li><strong>బుల్లెట్ లిస్టులు (&lt;ul&gt; &amp; &lt;li&gt;):</strong> మార్కర్స్ రకాలు (disc, circle, square, none) మరియు ఆధునిక CSS స్టైలింగ్.</li>
        <li><strong>నంబర్డ్ లిస్టులు (&lt;ol&gt;):</strong> 5 రకాల నంబరింగ్ స్టైల్స్ (1, a, A, i, I), start, reversed మరియు value ఆట్రిబ్యూట్లు.</li>
        <li><strong>నెస్టెడ్ లిస్టులు (Multi-level Lists):</strong> లిస్ట్ లోపల సబ్-లిస్ట్‌ను ఉంచే శాస్త్రీయ సింటాక్స్ నియమాలు.</li>
        <li><strong>డిస్క్రిప్షన్ లిస్టులు (&lt;dl&gt;, &lt;dt&gt;, &lt;dd&gt;):</strong> డిక్షనరీలు, FAQ లు మరియు మెటాడేటా జోడీల కోసం సెమాంటిక్ మోడల్.</li>
        <li><strong>లిస్టులతో వెబ్‌సైట్ నావిగేషన్ బార్స్:</strong> స్క్రీన్ రీడర్స్ మెచ్చే విధంగా ప్రొఫెషనల్ Navbar నిర్మాణం.</li>
        <li><strong>బిగినర్స్ సాధారణ పొరపాట్లు &amp; క్విజ్:</strong> డూప్లికేట్ నంబరింగ్ బగ్స్, రాంగ్ నెస్టింగ్ మరియు ఇంటర్వ్యూ ప్రశ్నలు.</li>
      </ul>
    </div>

    <!-- SECTION 2 -->
    <div class="section-title"><span class="num">2</span>మూడు రకాల HTML లిస్టులు — సమగ్ర పోలిక పట్టిక</div>
    <div class="section-body">
      <p>HTML5 లో కంటెంట్ యొక్క స్వభావాన్ని బట్టి 3 వేర్వేరు లిస్ట్ ఎలిమెంట్స్ అందించబడ్డాయి:</p>

      <table class="tbl">
        <thead>
          <tr>
            <th>లిస్ట్ రకం</th>
            <th>HTML ట్యాగ్స్</th>
            <th>వాడే సందర్భం</th>
            <th>డిఫాల్ట్ విజువల్ గుర్తు</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Unordered List (క్రమం లేని జాబితా)</strong></td>
            <td><code>&lt;ul&gt;</code> మరియు <code>&lt;li&gt;</code></td>
            <td>క్రమం లేదా ప్రాధాన్యత ముఖ్యం కానప్పుడు (ఉదా: ఫీచర్లు, సరుకుల లిస్ట్, నావిగేషన్ లింక్స్).</td>
            <td>నల్లటి గుండ్రని చుక్కలు (Black Discs &bull;)</td>
          </tr>
          <tr>
            <td><strong>Ordered List (క్రమానుగత జాబితా)</strong></td>
            <td><code>&lt;ol&gt;</code> మరియు <code>&lt;li&gt;</code></td>
            <td>స్టెప్స్, ర్యాంకులు, రెసిపీలు, లేదా కచ్చితమైన వరుస క్రమం పాటించాల్సినప్పుడు.</td>
            <td>సంఖ్యలు (1, 2, 3...) లేదా అక్షరాలు (A, B, C...)</td>
          </tr>
          <tr>
            <td><strong>Description List (వివరణాత్మక జాబితా)</strong></td>
            <td><code>&lt;dl&gt;</code>, <code>&lt;dt&gt;</code>, <code>&lt;dd&gt;</code></td>
            <td>నిఘంటువు పదాలు &amp; అర్థాలు, ప్రశ్నోత్తరాలు (FAQs), టెక్నికల్ స్పెసిఫికేషన్లు.</td>
            <td>పదం (Term) కింద కొద్దిగా ఇండెంట్ అయిన వివరణ</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- SECTION 3 -->
    <div class="section-title"><span class="num">3</span>Unordered Lists (&lt;ul&gt;) &amp; లిస్ట్ ఐటమ్స్ (&lt;li&gt;)</div>
    <div class="section-body">
      <p><code>&lt;ul&gt;</code> అంటే <strong>Unordered List</strong>. ఇందులో ఉండే ప్రతి అంశాన్ని <code>&lt;li&gt;</code> (List Item) ట్యాగ్‌లో ఉంచుతాం. క్రమం ముఖ్యం కానప్పుడు ఇది సరైన ఎంపిక:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">HTML Unordered List</span>
        </div>
        <pre><code>&lt;h3&gt;ఫ్రంట్-ఎండ్ టెక్నాలజీస్:&lt;/h3&gt;
&lt;ul&gt;
  &lt;li&gt;HTML5 - వెబ్ నిర్మాణం&lt;/li&gt;
  &lt;li&gt;CSS3 - డిజైన్ మరియు రంగులు&lt;/li&gt;
  &lt;li&gt;JavaScript - ఇంటరాక్టివిటీ&lt;/li&gt;
  &lt;li&gt;React - కాంపొనెంట్ లైబ్రరీ&lt;/li&gt;
&lt;/ul&gt;</code></pre>
      </div>

      <p><strong>బుల్లెట్ మార్కర్స్ రకాలు (Bullet Styles):</strong></p>
      <p>పూర్వపు HTML లో <code>type="disc"</code>, <code>type="circle"</code>, <code>type="square"</code> అని HTML లోనే రాసేవారు. కానీ ఆధునిక వెబ్ ప్రమాణాల ప్రకారం మార్కర్స్‌ను CSS <code>list-style-type</code> ద్వారా నియంత్రించాలి:</p>

      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.8;">
        <li><code>list-style-type: disc;</code> ➔ నిండిన నల్ల చుక్క (డిఫాల్ట్: &bull;)</li>
        <li><code>list-style-type: circle;</code> ➔ లోపల ఖాళీగా ఉన్న గుండ్రని వృత్తం (&omicron;)</li>
        <li><code>list-style-type: square;</code> ➔ చిన్న చతురస్రం (&FilledSmallSquare;)</li>
        <li><code>list-style-type: none;</code> ➔ ఎలాంటి బుల్లెట్స్ లేకుండా సాదా లిస్ట్‌గా మార్చడం (మెనూ బార్లలో ఇదే వాడతాం!).</li>
      </ul>
    </div>

    <!-- SECTION 4 -->
    <div class="section-title"><span class="num">4</span>Ordered Lists (&lt;ol&gt;) &amp; అధునాతన నంబరింగ్ ఫీచర్లు</div>
    <div class="section-body">
      <p><code>&lt;ol&gt;</code> అంటే <strong>Ordered List</strong>. క్రమానుగత దశలు (Step-by-step instructions) వివరించడానికి దీనిని వాడతారు. బ్రౌజర్ ఆటోమేటిక్‌గా 1, 2, 3 అని వరుస నంబర్లను కేటాయిస్తుంది:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">HTML Ordered List</span>
        </div>
        <pre><code>&lt;h3&gt;మసాలా టీ తయారుచేసే విధానం:&lt;/h3&gt;
&lt;ol&gt;
  &lt;li&gt;గిన్నెలో ఒక కప్పు నీళ్ళు పోసి వేడి చేయండి.&lt;/li&gt;
  &lt;li&gt;టీ పొడి, అల్లం మరియు యాలకులు వేయండి.&lt;/li&gt;
  &lt;li&gt;పాలు పోసి 3 నిమిషాలు మరిగించండి.&lt;/li&gt;
  &lt;li&gt;వడకట్టి కప్పులో పోసి వేడిగా తాగండి.&lt;/li&gt;
&lt;/ol&gt;</code></pre>
      </div>

      <p><strong>నంబరింగ్ రకాలు (The 5 Numbering Types):</strong></p>
      <table class="tbl">
        <thead>
          <tr>
            <th>Type Attribute</th>
            <th>నంబరింగ్ శైలి</th>
            <th>ఫలితం ఉదాహరణ</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>type="1"</code></td>
            <td>సాధారణ సంఖ్యలు (డిఫాల్ట్)</td>
            <td>1, 2, 3, 4, 5...</td>
          </tr>
          <tr>
            <td><code>type="a"</code></td>
            <td>చిన్న ఆంగ్ల అక్షరాలు (Lowercase letters)</td>
            <td>a, b, c, d, e...</td>
          </tr>
          <tr>
            <td><code>type="A"</code></td>
            <td>పెద్ద ఆంగ్ల అక్షరాలు (Uppercase letters)</td>
            <td>A, B, C, D, E...</td>
          </tr>
          <tr>
            <td><code>type="i"</code></td>
            <td>చిన్న రోమన్ సంఖ్యలు (Lowercase Roman)</td>
            <td>i, ii, iii, iv, v...</td>
          </tr>
          <tr>
            <td><code>type="I"</code></td>
            <td>పెద్ద రోమన్ సంఖ్యలు (Uppercase Roman)</td>
            <td>I, II, III, IV, V...</td>
          </tr>
        </tbody>
      </table>

      <p><strong>అధునాతన Ordered List కంట్రోల్స్ (start, reversed, value):</strong></p>
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">start & reversed Attributes</span>
        </div>
        <pre><code>&lt;!-- 1. నంబరింగ్ 5 నుండి ప్రారంభం కావాలంటే (start="5") --&gt;
&lt;ol start="5"&gt;
  &lt;li&gt;ఐదవ అధ్యాయం&lt;/li&gt;
  &lt;li&gt;ఆరవ అధ్యాయం&lt;/li&gt;
&lt;/ol&gt;

&lt;!-- 2. కౌంట్‌డౌన్ లాగా రివర్స్ లో నంబరింగ్ (reversed) --&gt;
&lt;ol reversed&gt;
  &lt;li&gt;రాకెట్ లాంచ్!&lt;/li&gt;
  &lt;li&gt;ఇంజిన్ ఇగ్నిషన్&lt;/li&gt;
  &lt;li&gt;కౌంట్‌డౌన్ ప్రారంభం&lt;/li&gt;
&lt;/ol&gt;</code></pre>
      </div>
    </div>

    <!-- SECTION 5 -->
    <div class="section-title"><span class="num">5</span>నెస్టెడ్ లిస్టులు (Multi-level Nested Lists)</div>
    <div class="section-body">
      <p>ఒక లిస్ట్ ఐటమ్ లోపల మరొక సబ్-లిస్ట్‌ను ఉంచడాన్ని <strong>Nested List</strong> అంటారు. ఉదాహరణకు ఒక దేశం లోపల రాష్ట్రాలు, రాష్ట్రాల లోపల నగరాల వివరాలు చూపించడానికి ఇది ఉపయోగపడుతుంది.</p>

      <div class="diagram-box">
  ┌───────────────────────── NESTED LIST HIERARCHY ─────────────────────────┐
  │                                                                         │
  │  &lt;ul&gt;                                                                   │
  │    &lt;li&gt;భారతదేశం (Parent List Item)                                      │
  │      &lt;ul&gt;  ◄── [సబ్-లిస్ట్ ఎల్లప్పుడూ li లోపలే ప్రారంభం కావాలి!]        │
  │        &lt;li&gt;ఆంధ్రప్రదేశ్                                                 │
  │          &lt;ol&gt;                                                           │
  │            &lt;li&gt;విశాఖపట్నం&lt;/li&gt;                                          │
  │            &lt;li&gt;విజయవాడ&lt;/li&gt;                                            │
  │          &lt;/ol&gt;                                                          │
  │        &lt;/li&gt;                                                            │
  │        &lt;li&gt;తెలంగాణ (హైదరాబాద్, వరంగల్)&lt;/li&gt;                             │
  │      &lt;/ul&gt;                                                              │
  │    &lt;/li&gt;   ◄── [ఇక్కడ Parent li ముగుస్తుంది!]                             │
  │  &lt;/ul&gt;                                                                  │
  └─────────────────────────────────────────────────────────────────────────┘
      </div>

      <div class="callout" style="border-left-color:#ef4444;">
        <div class="callout-title" style="color:#ef4444;">⚠️ నెస్టెడ్ లిస్ట్‌లో అతిపెద్ద కోడింగ్ నియమం:</div>
        <p>సబ్-లిస్ట్ (<code>&lt;ul&gt;</code> లేదా <code>&lt;ol&gt;</code>) ఎల్లప్పుడూ తన పేరెంట్ <code>&lt;li&gt;</code> లోపల మాత్రమే ఉండాలి! చాలామంది బిగినర్స్ పేరెంట్ <code>&lt;/li&gt;</code> ని క్లోజ్ చేసి, ఆ తర్వాత సబ్-లిస్ట్ రాస్తారు. ఇది అక్రమమైన HTML (Invalid DOM Tree) అవుతుంది.</p>
      </div>
    </div>

    <!-- SECTION 6 -->
    <div class="section-title"><span class="num">6</span>డిస్క్రిప్షన్ లిస్టులు (&lt;dl&gt;, &lt;dt&gt;, &lt;dd&gt;) — గ్లాసరీ &amp; FAQ మోడల్</div>
    <div class="section-body">
      <p>సాధారణ లిస్టులకు బుల్లెట్లు లేదా సంఖ్యలు ఉంటాయి. కానీ డిక్షనరీలోని పదాలు &amp; అర్థాలు, లేదా ప్రశ్నోత్తరాలు (FAQ) చూపించడానికి బుల్లెట్లు సరిపోవు. దానికోసం HTML లో <strong>Description List</strong> ఉంది:</p>

      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.8;">
        <li><code>&lt;dl&gt;</code> (Description List): మొత్తం డిస్క్రిప్షన్ జాబితాకు కంటైనర్.</li>
        <li><code>&lt;dt&gt;</code> (Description Term): వివరించాల్సిన పదం, శీర్షిక లేదా ప్రశ్న (బోల్డ్ గా ఉంటుంది).</li>
        <li><code>&lt;dd&gt;</code> (Description Details): ఆ పదానికి సంబంధించిన అర్థం, వివరణ లేదా సమాధానం (కొద్దిగా కుడివైపుకు ఇండెంట్ అయి ఉంటుంది).</li>
      </ul>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">HTML Description List (FAQ &amp; Glossary)</span>
        </div>
        <pre><code>&lt;h3&gt;వెబ్ డెవలప్‌మెంట్ నిఘంటువు (Web Glossary):&lt;/h3&gt;
&lt;dl&gt;
  &lt;dt&gt;&lt;strong&gt;HTML5&lt;/strong&gt;&lt;/dt&gt;
  &lt;dd&gt;వెబ్‌పేజీల నిర్మాణాన్ని తయారుచేసే హైపర్‌టెక్స్ట్ మార్కప్ లాంగ్వేజ్.&lt;/dd&gt;

  &lt;dt style="margin-top:12px;"&gt;&lt;strong&gt;CSS3&lt;/strong&gt;&lt;/dt&gt;
  &lt;dd&gt;వెబ్‌పేజీకి రంగులు, ఫాంట్లు మరియు అందమైన లేఅవుట్‌ను ఇచ్చే స్టైల్ షీట్.&lt;/dd&gt;

  &lt;dt style="margin-top:12px;"&gt;&lt;strong&gt;JavaScript&lt;/strong&gt;&lt;/dt&gt;
  &lt;dd&gt;వెబ్‌పేజీలను డైనమిక్‌గా యూజర్ క్లిక్స్‌కు స్పందించేలా చేసే ప్రోగ్రామింగ్ భాష.&lt;/dd&gt;
&lt;/dl&gt;</code></pre>
      </div>

      <p>ఈ ట్యాగ్‌ను మొబైల్ స్పెసిఫికేషన్లు (RAM: 16GB, Storage: 256GB, Processor: Snapdragon) చూపించడానికి కూడా ప్రపంచవ్యాప్తంగా ఉపయోగిస్తారు.</p>
    </div>

    <!-- SECTION 7 -->
    <div class="section-title"><span class="num">7</span>లిస్టులతో ఆధునిక నావిగేషన్ బార్స్ (Navbars) నిర్మించడం</div>
    <div class="section-body">
      <p>మీరు అమెజాన్, యూట్యూబ్ లేదా మన అవర్ కంపైలర్ వెబ్‌సైట్లలో పైన చూసే మెనూ బార్స్ అన్నీ తెరవెనుక <code>&lt;nav&gt; &gt; &lt;ul&gt; &gt; &lt;li&gt; &gt; &lt;a&gt;</code> స్ట్రక్చర్‌తోనే నిర్మించబడతాయి!</p>
      
      <p><strong>ఎందుకు బటన్లతో కాకుండా లిస్టులతోనే Navbar చేస్తారు? (Accessibility Reason):</strong></p>
      <p>దృష్టి లోపం ఉన్నవారు స్క్రీన్ రీడర్స్ వాడేటప్పుడు బ్రౌజర్ <em>"Navigation menu, list with 4 items"</em> అని చదువుతుంది. యూజర్‌కు మెనూలో ఎన్ని పేజీలు ఉన్నాయో ముందే తెలిసిపోతుంది. కేవలం లింకులు పెడితే ఈ సమాచారం లభించదు.</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">Semantic Navbar with Unordered List</span>
        </div>
        <pre><code>&lt;!-- ఆధునిక రెస్పాన్సివ్ నావిగేషన్ బార్ నిర్మాణం --&gt;
&lt;nav class="site-nav"&gt;
  &lt;ul style="list-style-type:none; display:flex; gap:20px; padding:0; margin:0;"&gt;
    &lt;li&gt;&lt;a href="/" style="text-decoration:none; color:#10b981; font-weight:700;"&gt;హోమ్ (Home)&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="/about.html" style="text-decoration:none; color:#334155; font-weight:600;"&gt;మా గురించి&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="/blog-html.html" style="text-decoration:none; color:#334155; font-weight:600;"&gt;HTML కోర్సు&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="/contact.html" style="text-decoration:none; color:#334155; font-weight:600;"&gt;సంప్రదించండి&lt;/a&gt;&lt;/li&gt;
  &lt;/ul&gt;
&lt;/nav&gt;</code></pre>
      </div>

      <p><code>list-style-type: none;</code> తో బుల్లెట్లను తొలగించి, CSS Flexbox (<code>display: flex; gap: 20px;</code>) తో పక్కపక్కనే అమర్చితే అది సుందరమైన నావిగేషన్ బార్‌గా మారిపోతుంది!</p>
    </div>

    <!-- SECTION 8 -->
    <div class="section-title"><span class="num">8</span>పరిపూర్ణ ప్రాక్టికల్ లైవ్ ఉదాహరణ (Complete Runnable Code)</div>
    <div class="section-body">
      <p>Unordered, Ordered, Multi-level Nested, మరియు Description లిస్టులన్నింటినీ కలిపి రూపొందించిన సంపూర్ణ కోడ్‌ను పరిశీలిద్దాం:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">HTML5 Master Lists Playground</span>
          <div class="code-actions">
            <a class="try-btn" href="/online-html-editor.html" target="_blank">▶ Run in Online HTML Editor</a>
          </div>
        </div>
        <pre><code>&lt;!DOCTYPE html&gt;
&lt;html lang="te"&gt;
  &lt;head&gt;
    &lt;meta charset="UTF-8" /&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0" /&gt;
    &lt;title&gt;HTML5 లిస్టులు మాస్టర్ డెమో | Our Compiler&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;h1&gt;HTML5 లిస్టుల సమగ్ర డెమో&lt;/h1&gt;

    &lt;!-- 1. Unordered List --&gt;
    &lt;h2&gt;1. ప్రముఖ వెబ్ బ్రౌజర్లు (Unordered List)&lt;/h2&gt;
    &lt;ul&gt;
      &lt;li&gt;Google Chrome (Blink Engine)&lt;/li&gt;
      &lt;li&gt;Mozilla Firefox (Gecko Engine)&lt;/li&gt;
      &lt;li&gt;Apple Safari (WebKit Engine)&lt;/li&gt;
      &lt;li&gt;Microsoft Edge (Chromium)&lt;/li&gt;
    &lt;/ul&gt;

    &lt;hr /&gt;

    &lt;!-- 2. Multi-level Nested List --&gt;
    &lt;h2&gt;2. కోర్సు సిలబస్ (Multi-level Nested List)&lt;/h2&gt;
    &lt;ol type="I"&gt;
      &lt;li&gt;
        ఫ్రంట్-ఎండ్ బేసిక్స్
        &lt;ol type="a"&gt;
          &lt;li&gt;HTML5 డాక్యుమెంట్ స్ట్రక్చర్&lt;/li&gt;
          &lt;li&gt;లింకులు &amp;amp; నావిగేషన్&lt;/li&gt;
          &lt;li&gt;లిస్టులు &amp;amp; టేబుల్స్&lt;/li&gt;
        &lt;/ol&gt;
      &lt;/li&gt;
      &lt;li&gt;
        ఆధునిక వెబ్ డిజైన్
        &lt;ol type="a"&gt;
          &lt;li&gt;CSS3 Flexbox &amp;amp; Grid&lt;/li&gt;
          &lt;li&gt;మొబైల్ రెస్పాన్సివ్ మీడియా క్వెరీస్&lt;/li&gt;
        &lt;/ol&gt;
      &lt;/li&gt;
    &lt;/ol&gt;

    &lt;hr /&gt;

    &lt;!-- 3. Description List --&gt;
    &lt;h2&gt;3. టెక్నాలజీ పదకోశం (Description List)&lt;/h2&gt;
    &lt;dl&gt;
      &lt;dt&gt;&lt;strong&gt;DOM (Document Object Model)&lt;/strong&gt;&lt;/dt&gt;
      &lt;dd&gt;బ్రౌజర్ రూపొందించే HTML ఎలిమెంట్స్ యొక్క కుటుంబ వృక్ష నిర్మాణం.&lt;/dd&gt;

      &lt;dt style="margin-top:10px;"&gt;&lt;strong&gt;SEO (Search Engine Optimization)&lt;/strong&gt;&lt;/dt&gt;
      &lt;dd&gt;గూగుల్ సెర్చ్‌లో వెబ్‌సైట్‌ను అగ్రస్థానంలో నిలిపే సాంకేతిక ఆప్టిమైజేషన్.&lt;/dd&gt;
    &lt;/dl&gt;
  &lt;/body&gt;
&lt;/html&gt;</code></pre>
      </div>

      <p style="margin-top:16px;"><strong>బ్రౌజర్‌లో ఇది ఎలా కనిపిస్తుంది? (Visual Preview):</strong></p>
      <div style="background:#ffffff; border:1px solid #cbd5e1; border-radius:10px; padding:24px; margin:16px 0; box-shadow:0 4px 12px rgba(0,0,0,0.05); color:#0f172a;">
        <div style="display:flex; align-items:center; gap:8px; padding-bottom:12px; margin-bottom:16px; border-bottom:1px solid #e2e8f0; font-size:12px; color:#64748b;">
          <span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:#ef4444;"></span>
          <span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:#f59e0b;"></span>
          <span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:#10b981;"></span>
          <span style="margin-left:8px; font-family:'JetBrains Mono', monospace; font-size:11px;">https://www.ourcompiler.com/lists-demo.html</span>
        </div>
        <h1 style="font-size:22px; font-weight:800; color:#0f172a; margin-bottom:12px;">HTML5 లిస్టుల సమగ్ర డెమో</h1>
        
        <h2 style="font-size:16px; font-weight:700; color:#059669; margin-bottom:8px;">1. ప్రముఖ వెబ్ బ్రౌజర్లు (Unordered List)</h2>
        <ul style="margin-left:20px; font-size:14px; color:#334155; line-height:1.7;">
          <li>Google Chrome (Blink Engine)</li>
          <li>Mozilla Firefox (Gecko Engine)</li>
          <li>Apple Safari (WebKit Engine)</li>
        </ul>

        <hr style="border:none; border-top:1px solid #e2e8f0; margin:16px 0;" />

        <h2 style="font-size:16px; font-weight:700; color:#059669; margin-bottom:8px;">2. కోర్సు సిలబస్ (Multi-level Nested List)</h2>
        <div style="margin-left:20px; font-size:14px; color:#334155; line-height:1.7;">
          <strong>I. ఫ్రంట్-ఎండ్ బేసిక్స్</strong>
          <div style="margin-left:20px; color:#475569;">
            a. HTML5 డాక్యుమెంట్ స్ట్రక్చర్<br>
            b. లింకులు &amp; నావిగేషన్<br>
            c. లిస్టులు &amp; టేబుల్స్
          </div>
          <strong>II. ఆధునిక వెబ్ డిజైన్</strong>
          <div style="margin-left:20px; color:#475569;">
            a. CSS3 Flexbox &amp; Grid<br>
            b. మొబైల్ రెస్పాన్సివ్ మీడియా క్వెరీస్
          </div>
        </div>

        <hr style="border:none; border-top:1px solid #e2e8f0; margin:16px 0;" />

        <h2 style="font-size:16px; font-weight:700; color:#059669; margin-bottom:8px;">3. టెక్నాలజీ పదకోశం (Description List)</h2>
        <dl style="font-size:14px; color:#334155; line-height:1.6; margin-left:10px;">
          <dt style="font-weight:700; color:#0f172a;">DOM (Document Object Model)</dt>
          <dd style="margin-left:16px; color:#64748b; margin-bottom:8px;">బ్రౌజర్ రూపొందించే HTML ఎలిమెంట్స్ యొక్క కుటుంబ వృక్ష నిర్మాణం.</dd>
          <dt style="font-weight:700; color:#0f172a;">SEO (Search Engine Optimization)</dt>
          <dd style="margin-left:16px; color:#64748b;">గూగుల్ సెర్చ్‌లో వెబ్‌సైట్‌ను అగ్రస్థానంలో నిలిపే సాంకేతిక ఆప్టిమైజేషన్.</dd>
        </dl>
      </div>
    </div>

    <!-- SECTION 9 -->
    <div class="section-title"><span class="num">9</span>Beginners చేసే 5 ప్రధాన తప్పులు (Common Pitfalls)</div>
    <div class="section-body">
      <p>లిస్టులతో పనిచేసేటప్పుడు బిగినర్స్ తరచుగా చేసే 5 పెద్ద తప్పులు మరియు వాటి నివారణలు:</p>

      <p style="font-weight:700; color:#ef4444; margin-top:16px;">❌ తప్పు 1: &lt;ul&gt; లోపల &lt;li&gt; లేకుండా నేరుగా టెక్స్ట్ లేదా &lt;div&gt; రాయడం</p>
      <div class="code-block">
        <pre><code>&lt;!-- తీవ్రమైన తప్పు: ul లోపల ప్రత్యక్షంగా టెక్స్ట్ లేదా p పెట్టారు --&gt;
&lt;ul&gt;
  &lt;p&gt;మొదటి అంశం&lt;/p&gt;
  ఇది రెండవ అంశం
&lt;/ul&gt;</code></pre>
      </div>
      <p style="color:var(--text2); font-size:14px;"><strong>కఠినమైన నియమం:</strong> <code>&lt;ul&gt;</code> మరియు <code>&lt;ol&gt;</code> లోపల కేవలం <code>&lt;li&gt;</code> లు మాత్రమే ఉండాలి! వేరే ఏ ఇతర ట్యాగ్‌ను ప్రత్యక్ష సంతానంగా (Direct Child) ఉంచకూడదు.</p>

      <p style="font-weight:700; color:#ef4444; margin-top:20px;">❌ తప్పు 2: నెస్టెడ్ లిస్ట్‌ను &lt;li&gt; బయట రాయడం</p>
      <div class="code-block">
        <pre><code>&lt;!-- తప్పు: li క్లోజ్ అయ్యాక ul పెట్టారు --&gt;
&lt;ul&gt;
  &lt;li&gt;ఆంధ్రప్రదేశ్&lt;/li&gt;
  &lt;ul&gt;
    &lt;li&gt;విశాఖపట్నం&lt;/li&gt;
  &lt;/ul&gt;
&lt;/ul&gt;</code></pre>
      </div>
      <p style="color:var(--text2); font-size:14px;"><strong>సరైన రూపం:</strong> సబ్-లిస్ట్ ఎల్లప్పుడూ <code>&lt;li&gt;ఆంధ్రప్రదేశ్ &lt;ul&gt;...&lt;/ul&gt;&lt;/li&gt;</code> లోపల మాత్రమే ఉండాలి.</p>

      <p style="font-weight:700; color:#ef4444; margin-top:20px;">❌ తప్పు 3: Ordered List లో సంఖ్యలను చేతితో టైప్ చేయడం (Double Numbering)</p>
      <div class="code-block">
        <pre><code>&lt;!-- తప్పు: బ్రౌజర్ 1. అని ఇస్తుంది, మీరు కూడా 1. రాస్తే "1. 1. మొదటిది" అవుతుంది! --&gt;
&lt;ol&gt;
  &lt;li&gt;1. మొదటి స్టెప్&lt;/li&gt;
  &lt;li&gt;2. రెండవ స్టెప్&lt;/li&gt;
&lt;/ol&gt;</code></pre>
      </div>
      <p style="color:var(--text2); font-size:14px;"><strong>సరైన పద్ధతి:</strong> సంఖ్యలు రాయకూడదు: <code>&lt;li&gt;మొదటి స్టెప్&lt;/li&gt;</code> అని రాస్తే చాలు.</p>

      <p style="font-weight:700; color:#ef4444; margin-top:20px;">❌ తప్పు 4: క్రమబద్ధమైన దశలకు &lt;ul&gt; వాడటం</p>
      <p style="color:var(--text2); font-size:14px;">
        సాఫ్ట్‌వేర్ ఇన్‌స్టాలేషన్ స్టెప్స్ లేదా రెసిపీలలో క్రమం చాలా ముఖ్యం. వాటికి బుల్లెట్లు (<code>ul</code>) వాడటం సెమాంటిక్ ఉల్లంఘన. క్రమం ఉన్నప్పుడు తప్పక <code>ol</code> వాడాలి.
      </p>

      <p style="font-weight:700; color:#ef4444; margin-top:20px;">❌ తప్పు 5: Description List లో &lt;dt&gt; లేకుండా కేవలం &lt;dd&gt; మాత్రమే వాడటం</p>
      <p style="color:var(--text2); font-size:14px;">
        ప్రతి <code>&lt;dd&gt;</code> (వివరణ) కి ముందు తప్పనిసరిగా దానికి సంబంధించిన <code>&lt;dt&gt;</code> (పదం/శీర్షిక) ఉండాలి.
      </p>
    </div>

    <!-- SECTION 10 -->
    <div class="section-title"><span class="num">10</span>ప్రాక్టీస్ టాస్క్స్ &amp; ఇంటర్వ్యూ క్విజ్ ప్రశ్నలు</div>
    <div class="section-body">
      <p>ఈ క్రింది ప్రశ్నలకు స్వయంగా సమాధానాలు ఆలోచించండి, ఆపై డ్రాప్‌డౌన్ తెరిచి పరిశీలించండి:</p>

      <ol style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.8;">
        <li><code>&lt;ul&gt;</code> మరియు <code>&lt;ol&gt;</code> ల మధ్య ప్రధాన వ్యత్యాసం ఏమిటి? వాస్తవ వెబ్‌సైట్లలో వీటికి 2 ఉదాహరణలు ఇవ్వండి.</li>
        <li>Ordered List లో నంబరింగ్ 10 నుండి ప్రారంభం కావాలంటే ఏ ఆట్రిబ్యూట్ ఉపయోగించాలి? రివర్స్ నంబరింగ్ ఎలా చేస్తారు?</li>
        <li>నెస్టెడ్ లిస్ట్ రాసేటప్పుడు పాటించాల్సిన అత్యంత ముఖ్యమైన సింటాక్స్ నియమం ఏమిటి?</li>
        <li>Description List లోని 3 ట్యాగ్‌లు (<code>&lt;dl&gt;</code>, <code>&lt;dt&gt;</code>, <code>&lt;dd&gt;</code>) దేనిని సూచిస్తాయి?</li>
        <li>వెబ్‌సైట్ నావిగేషన్ మెనూ బార్లను తయారు చేయడానికి డెవలపర్లు <code>&lt;ul&gt;</code> మరియు <code>&lt;li&gt;</code> లను ఎందుకు ప్రాధాన్యతగా ఎంచుకుంటారు?</li>
      </ol>

      <details>
        <summary>🔍 సమాధానాలు &amp; లోతైన వివరణ చూడండి (Click to expand)</summary>
        <div style="margin-top:12px; font-size:14.5px; line-height:1.7; color:var(--text2);">
          <p><strong>1. సమాధానం:</strong> <code>&lt;ul&gt;</code> లో క్రమం ముఖ్యం కాదు, బుల్లెట్ పాయింట్లు ఉంటాయి (ఉదా: నావిగేషన్ మెనూ, ఫీచర్స్). <code>&lt;ol&gt;</code> లో క్రమం అత్యంత ముఖ్యం, సంఖ్యలు/అక్షరాలు ఉంటాయి (ఉదా: రెసిపీ స్టెప్స్, లీడర్‌బోర్డ్ ర్యాంకులు).</p>
          <p style="margin-top:8px;"><strong>2. సమాధానం:</strong> 10 నుండి ప్రారంభం కావడానికి <code>&lt;ol start="10"&gt;</code> వాడతారు. రివర్స్ కౌంట్‌డౌన్ కోసం <code>&lt;ol reversed&gt;</code> ఆట్రిబ్యూట్ వాడతారు.</p>
          <p style="margin-top:8px;"><strong>3. సమాధానం:</strong> సబ్-లిస్ట్ ఎల్లప్పుడూ పేరెంట్ <code>&lt;li&gt;</code> లోపల మాత్రమే ఉండాలి తప్ప, <code>&lt;/li&gt;</code> బయట ఉండకూడదు.</p>
          <p style="margin-top:8px;"><strong>4. సమాధానం:</strong> <code>&lt;dl&gt;</code> = Description List (జాబితా), <code>&lt;dt&gt;</code> = Description Term (పదం/శీర్షిక), <code>&lt;dd&gt;</code> = Description Details (ఆ పదం యొక్క వివరణ).</p>
          <p style="margin-top:8px;"><strong>5. సమాధానం:</strong> వెబ్ యాక్సెసిబిలిటీ (a11y) కోసం. స్క్రీన్ రీడర్స్ దృష్టిలోపం ఉన్నవారికి "Navigation list with 4 items" అని స్పష్టంగా మెనూ సంఖ్యను చదివి వినిపిస్తాయి.</p>
        </div>
      </details>
    </div>

    <!-- SECTION 11 (TRY BOX) -->
    <div class="section-title"><span class="num">11</span>మీరే స్వయంగా Try చేయండి (Live Coding Playground)</div>
    <div class="section-body">
      <div class="try-box" style="margin-top:10px;">
        <div class="try-title">🚀 లిస్టులతో మీ స్వంత రెసిపీ &amp; మెనూ బార్ రన్ చేయండి</div>
        <p>పైన నేర్చుకున్న <code>ul</code>, <code>ol type="i"</code>, <code>start="5"</code> మరియు డిస్క్రిప్షన్ లిస్టుల కోడ్‌ను మన ఆన్‌లైన్ ఎడిటర్‌లో ఓపెన్ చేసి, కొత్త లిస్ట్ ఐటమ్స్ యాడ్ చేస్తూ లైవ్ ప్రివ్యూను పరిశీలించండి!</p>
        <a class="run-btn" href="/online-html-editor.html" target="_blank">
          👉 Our Compiler లో HTML Editor try చేయండి
        </a>
      </div>
    </div>

    <!-- SECTION 12 -->
    <div class="section-title"><span class="num">12</span>సారాంశం (Quick Summary)</div>
    <div class="section-body">
      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.7;">
        <li><strong>Unordered List (&lt;ul&gt;):</strong> క్రమం లేని బుల్లెట్ జాబితా; ప్రతి అంశం <code>&lt;li&gt;</code> లో ఉంటుంది.</li>
        <li><strong>Ordered List (&lt;ol&gt;):</strong> క్రమానుగత సంఖ్యల జాబితా; <code>type</code>, <code>start</code>, మరియు <code>reversed</code> ఆట్రిబ్యూట్లతో నియంత్రించవచ్చు.</li>
        <li><strong>Nested Lists:</strong> లిస్ట్ లోపల సబ్-లిస్ట్; ఎల్లప్పుడూ పేరెంట్ <code>&lt;li&gt;</code> లోపలే ఉండాలి.</li>
        <li><strong>Description List (&lt;dl&gt;):</strong> నిఘంటువు మరియు FAQ ల కోసం పదం (<code>&lt;dt&gt;</code>) మరియు వివరణ (<code>&lt;dd&gt;</code>) ల ద్వయం.</li>
        <li><strong>Navbars:</strong> ప్రపంచవ్యాప్తంగా ప్రొఫెషనల్ మెనూ బార్లు <code>&lt;nav&gt; &lt;ul&gt; &lt;li&gt; &lt;a&gt;</code> తోనే నిర్మించబడతాయి.</li>
      </ul>
    </div>

    <!-- SECTION 13 -->
    <div class="section-title"><span class="num">13</span>తర్వాతి అధ్యాయంలో మీరు నేర్చుకోబోయేవి (What's Next in Chapter 7?)</div>
    <div class="section-body">
      <p>ఒక వెబ్‌సైట్ అందాన్ని రెట్టింపు చేసేది బొమ్మలే! తర్వాతి <strong>Chapter 7 (ఇమేజెస్ &lt;img&gt;, రెస్పాన్సివ్ పిక్చర్స్ &lt;picture&gt;, srcset &amp; WebP/SVG)</strong> లో మనం వెబ్‌సైట్ లోడింగ్ స్పీడ్ తగ్గకుండా హై-క్వాలిటీ ఇమేజెస్‌ను ఎలా పొందుపరచాలి, SEO కోసం <code>alt</code> ఆట్రిబ్యూట్ ప్రాముఖ్యత, మొబైల్ vs డెస్క్‌టాప్ కోసం వేర్వేరు ఇమేజెస్ ఇచ్చే <code>srcset</code> మరియు ఆధునిక WebP/SVG ఫార్మాట్ల గురించి లోతుగా నేర్చుకుందాం!</p>
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

const targetFile = path.join(__dirname, '..', 'public', 'blog-html', '06-html-lists-ordered-unordered-and-description.html');
fs.writeFileSync(targetFile, fullPageHtml, 'utf8');
console.log('✅ Successfully generated deep high-value Chapter 6!');
console.log('Target file size:', fullPageHtml.length, 'characters');
