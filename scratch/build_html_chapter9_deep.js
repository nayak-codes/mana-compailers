const fs = require('fs');
const path = require('path');
const { LESSONS, buildSidebar } = require('./html_curriculum_data.js');

const lesson = LESSONS.find(l => l.num === 9);
const sidebarHtml = buildSidebar(9);

const chapterContentHtml = `
    <!-- BREADCRUMB -->
    <div class="breadcrumb">
      <a href="/">Home</a><span class="sep">›</span>
      <a href="/blog.html">Tutorials</a><span class="sep">›</span>
      <a href="/blog-html.html">HTML5 Masterclass</a><span class="sep">›</span>
      <span class="current">Chapter 9: సెమాంటిక్ HTML5 ప్రాముఖ్యత: header, nav, main, footer</span>
    </div>

    <!-- PAGE TITLE -->
    <h1 class="page-title">సెమాంటిక్ HTML5 ప్రాముఖ్యత: header, nav, main, footer &amp; పేజ్ ఆర్కిటెక్చర్</h1>

    <!-- PAGE META BADGES -->
    <div class="page-meta">
      <span class="badge">🌐 Modern HTML5 (W3C/WHATWG)</span>
      <span class="badge">🟢 Chapter 9 of 20</span>
      <span class="badge">📂 Phase 03: మోడరన్ సెమాంటిక్ HTML5 &amp; లేఅవుట్ డిజైన్</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

    <!-- SUBTOPICS PILL BAR -->
    <div style="background:var(--bg3); border:1px solid var(--border); border-radius:8px; padding:10px 16px; margin-bottom:24px; font-size:13px; color:var(--text2); display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
      <span style="color:#10b981; font-weight:700;">📌 Covered in this chapter:</span>
      <span>Semantic vs Non-Semantic పోలిక · &lt;head&gt; vs &lt;header&gt; స్పష్టత · &lt;nav&gt; నావిగేషన్ మెనూలు · &lt;main&gt; ఏకైక కోర్ కంటెంట్ · &lt;footer&gt; ముగింపు వివరాలు · Div Soup సమస్య &amp; పరిష్కారం · Accessibility ల్యాండ్‌మార్క్స్ &amp; SEO · బిగినర్స్ తప్పులు &amp; క్విజ్</span>
    </div>

    <!-- INTRO ACCENT BOX (Warm Ivory with Green Accent) -->
    <div class="intro-box">
      <p>నిజ జీవితంలో ఒక వార్తాపత్రికను (Newspaper) లేదా ఒక పుస్తకాన్ని గమనించండి: పైన పత్రిక పేరు మరియు తేదీతో కూడిన శిరోభాగం (Header), పేజీల వివరాలను తెలిపే సూచిక (Index / Navigation), అసలైన వార్తా కథనాలు (Main Articles), మరియు చివర ప్రింటింగ్ ప్రెస్ చిరునామా, సంపాదకుని వివరాలు (Footer) ఉంటాయి. ఇలాంటి సహజమైన నిర్మాణాన్ని మనం చూసిన వెంటనే మన మెదడు క్షణాల్లో అర్థం చేసుకుంటుంది.</p>
      <p>కానీ 2014 కంటే ముందు, పాత వెబ్ డెవలప్‌మెంట్‌లో ఒక విచిత్రమైన సమస్య ఉండేది. వెబ్‌సైట్‌లోని ప్రతి భాగానికీ కేవలం అర్థం పర్థం లేని <code>&lt;div&gt;</code> ట్యాగ్‌ను మాత్రమే వాడేవారు — <code>&lt;div id="header"&gt;</code>, <code>&lt;div id="menu"&gt;</code>, <code>&lt;div id="content"&gt;</code>, <code>&lt;div id="footer"&gt;</code>! దీన్నే పరిశ్రమలో <strong>"డివ్ సూప్" (Div Soup)</strong> అని పిలిచేవారు. బ్రౌజర్‌కు గానీ, గూగుల్ సెర్చ్ ఇంజిన్‌కు గానీ, అంధులు ఉపయోగించే స్క్రీన్ రీడర్లకు గానీ ఏది ప్రధాన వార్తో, ఏది పక్కన ఉన్న ప్రకటనో అర్థం కాక తలలు పట్టుకునేవి!</p>
      <p>ఈ గందరగోళానికి చరమగీతం పాడుతూ W3C మరియు WHATWG సంస్థలు ఆధునిక HTML5 లో <strong>సెమాంటిక్ ఎలిమెంట్స్ (Semantic Elements)</strong> అనే గొప్ప విప్లవాన్ని ప్రవేశపెట్టాయి. ఒక ఎలిమెంట్ పేరు చదవగానే బ్రౌజర్‌కు మరియు డెవలపర్‌కు దాని అర్థం స్పష్టంగా తెలిసిపోతుంది. ఈ అధ్యాయంలో మనం వెబ్‌సైట్ పునాది అయిన <strong>&lt;header&gt;, &lt;nav&gt;, &lt;main&gt;, &lt;footer&gt;</strong> లతో ప్రొఫెషనల్ పేజ్ ఆర్కిటెక్చర్‌ను ఎలా నిర్మించాలో పూర్తి తెలుగులో నేర్చుకుందాం!</p>
    </div>

    <!-- SECTION 1 -->
    <div class="section-title"><span class="num">1</span>ఈ Chapter లో మీరు నేర్చుకునే అంశాలు</div>
    <div class="section-body">
      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.7;">
        <li><strong>సెమాంటిక్స్ అంటే ఏమిటి:</strong> మానవులకు, సెర్చ్ ఇంజిన్లకు మరియు కంప్యూటర్లకు స్పష్టమైన అర్థాన్నిచ్చే కోడింగ్ తత్వశాస్త్రం.</li>
        <li><strong>Semantic vs Non-Semantic ట్యాగ్స్:</strong> div, span లకు మరియు header, nav, main, footer లకు గల తేడాలు.</li>
        <li><strong>మోడరన్ పేజ్ ఆర్కిటెక్చర్ వైర్‌ఫ్రేమ్:</strong> అంతర్జాతీయ ప్రమాణాలతో వెబ్‌పేజీ లేఅవుట్ లేఖనం.</li>
        <li><strong>&lt;header&gt; ఎలిమెంట్:</strong> వెబ్‌సైట్ బ్రాండింగ్, లోగో, మెయిన్ హెడ్డింగ్స్ మరియు సెర్చ్ బార్లను అమర్చే విధానం.</li>
        <li><strong>&lt;head&gt; vs &lt;header&gt; వ్యత్యాసం:</strong> ఇంటర్వ్యూలలో అడిగే అత్యంత ముఖ్యమైన కాన్సెప్ట్.</li>
        <li><strong>&lt;nav&gt; ఎలిమెంట్:</strong> గ్లోబల్ నావిగేషన్ మెనూలు మరియు ఎక్కడెక్కడ &lt;nav&gt; వాడకూడదో నియమాలు.</li>
        <li><strong>&lt;main&gt; ఎలిమెంట్:</strong> ఒక పేజీకి ఒకే ఒక్క ప్రధాన కంటెంట్ ఎలిమెంట్ ఎందుకు ఉండాలి?</li>
        <li><strong>&lt;footer&gt; ఎలిమెంట్:</strong> కాపీరైట్స్, కాంటాక్ట్ వివరాలు మరియు లీగల్ లింకులు.</li>
        <li><strong>Accessibility ల్యాండ్‌మార్క్స్ &amp; SEO:</strong> గూగుల్ ర్యాంకింగ్స్ పెరగడానికి సెమాంటిక్స్ ఎలా సహాయపడతాయి?</li>
      </ul>
    </div>

    <!-- SECTION 2 -->
    <div class="section-title"><span class="num">2</span>సెమాంటిక్స్ అంటే ఏమిటి? Semantic vs Non-Semantic పోలిక</div>
    <div class="section-body">
      <p><strong>"సెమాంటిక్స్" (Semantics)</strong> అంటే భాషాశాస్త్రంలో <em>"అర్థం" (Meaning)</em> అని అర్థం. ప్రోగ్రామింగ్‌లో ఒక ట్యాగ్ తన లోపల ఉన్న సమాచారం ఎలాంటిదో తన పేరు ద్వారానే తెలియజేస్తే దానిని <strong>సెమాంటిక్ ట్యాగ్</strong> అంటారు.</p>

      <div style="overflow-x:auto; margin: 16px 0;">
        <table class="tbl">
          <thead>
            <tr>
              <th>వర్గం (Category)</th>
              <th>ట్యాగ్‌లు (HTML Tags)</th>
              <th>వాటి అర్థం &amp; ప్రయోజనం</th>
              <th>బ్రౌజర్ &amp; SEO దృష్టిలో విలువ</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>నాన్-సెమాంటిక్ (Non-Semantic)</strong></td>
              <td><code>&lt;div&gt;</code>, <code>&lt;span&gt;</code></td>
              <td>వీటికి స్వతహాగా ఎటువంటి అర్థం ఉండదు. కేవలం స్టైలింగ్ (CSS) లేదా స్క్రిప్టింగ్ (JS) కొరకు మాత్రమే వాడే ఒక సాధారణ ఖాళీ డబ్బా.</td>
              <td>తక్కువ (బ్రౌజర్‌కు లోపల ఏముందో తెలియదు)</td>
            </tr>
            <tr>
              <td><strong>సెమాంటిక్ (Semantic HTML5)</strong></td>
              <td><code>&lt;header&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;footer&gt;</code></td>
              <td>ఎలిమెంట్ పేరులోనే దాని పని దాగి ఉంటుంది. ఏది పేజీ తలభాగమో, ఏది మెనూనో, ఏది ప్రధాన సమాచారమో స్పష్టంగా తెలుస్తుంది.</td>
              <td>అత్యున్నతం (SEO, Accessibility &amp; Clean Code)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p style="margin-top:14px;"><strong>నిజ జీవిత ఉదాహరణ:</strong></p>
      <p>మీ ఇంటి కిరాణా సామాగ్రిని రెండు రకాల డబ్బాల్లో పోసి పెట్టవచ్చు:</p>
      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.7;">
        <li>ఏమీ రాయని ఒక తెల్లటి సాధారణ డబ్బా (ఇది <code>&lt;div&gt;</code> లాంటిది). డబ్బా తెరిచి చూసేవరకు లోపల పంచదార ఉందో, ఉప్పు ఉందో ఎవరికీ తెలియదు.</li>
        <li>పైన స్పష్టంగా "పంచదార" అని ప్రింట్ చేసిన డబ్బా (ఇది <code>&lt;header&gt;</code> లాంటి సెమాంటిక్ ట్యాగ్). చూడగానే ఎవరికైనా వెంటనే అర్థమైపోతుంది!</li>
      </ul>
    </div>

    <!-- SECTION 3 -->
    <div class="section-title"><span class="num">3</span>ఆధునిక వెబ్‌పేజ్ ఆర్కిటెక్చర్ వైర్‌ఫ్రేమ్ (Modern Page Wireframe)</div>
    <div class="section-body">
      <p>ఒక వెబ్‌సైట్ నిర్మించేటప్పుడు ప్రపంచవ్యాప్తంగా సీనియర్ సాఫ్ట్‌వేర్ ఆర్కిటెక్ట్‌లు అనుసరించే ప్రామాణిక లేఅవుట్ నిర్మాణం క్రింది విధంగా ఉంటుంది:</p>

      <div class="diagram-box">
  ┌─────────────────────────────────────────────────────────────────────────────┐
  │                            &lt;header&gt; (శిరోభాగం)                              │
  │   [🏢 కంపెనీ లోగో]      [🔍 సెర్చ్ బాక్స్]             [👤 లాగిన్ బటన్]       │
  │                                                                             │
  │   ┌─────────────────────────────────────────────────────────────────────┐   │
  │   │                        &lt;nav&gt; (నావిగేషన్ మెనూ)                       │   │
  │   │    [హోమ్]       [కోర్సులు]       [ట్యుటోరియల్స్]       [సంప్రదించండి]   │   │
  │   └─────────────────────────────────────────────────────────────────────┘   │
  └─────────────────────────────────────────────────────────────────────────────┘
  │                                                                             │
  │   ┌─────────────────────────────────────────────────────────────────────┐   │
  │   │                  &lt;main&gt; (ఈ పేజీ యొక్క ఏకైక కంటెంట్)                 │   │
  │   │                                                                     │   │
  │   │   &lt;h1&gt;HTML5 సెమాంటిక్ ట్యాగ్స్ గైడ్&lt;/h1&gt;                            │   │
  │   │   &lt;p&gt;ఈ అధ్యాయంలో మనం వెబ్‌పేజీ నిర్మాణాన్ని నేర్చుకుంటున్నాం...&lt;/p&gt;  │   │
  │   │                                                                     │   │
  │   │   [కోడ్ ఉదాహరణలు, చిత్రాలు, డయాగ్రమ్‌లు మరియు వివరణలు]             │   │
  │   └─────────────────────────────────────────────────────────────────────┘   │
  │                                                                             │
  ┌─────────────────────────────────────────────────────────────────────────────┐
  │                            &lt;footer&gt; (పాదపీఠం)                               │
  │   © 2026 Our Compiler · ప్రైవసీ పాలసీ · టర్మ్స్ ఆఫ్ సర్వీస్ · సైట్‌మ్యాప్    │
  └─────────────────────────────────────────────────────────────────────────────┘
      </div>
    </div>

    <!-- SECTION 4 -->
    <div class="section-title"><span class="num">4</span>&lt;header&gt; ఎలిమెంట్: వెబ్‌సైట్ శిరోభాగం</div>
    <div class="section-body">
      <p><code>&lt;header&gt;</code> ఎలిమెంట్ అనేది ఒక పేజీకి లేదా పేజీలోని ఒక ప్రత్యేక విభాగానికి పరిచయ కంటెంట్‌ను (Introductory Content) లేదా నావిగేషన్ లింకులను కలిగి ఉండే ఒక కంటైనర్.</p>

      <p><strong>సాధారణంగా &lt;header&gt; లో ఏమి ఉంచుతారు?</strong></p>
      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.7;">
        <li>వెబ్‌సైట్ లోగో (Brand Logo) లేదా కంపెనీ పేరు.</li>
        <li>పేజీ యొక్క ప్రధాన శీర్షిక (<code>&lt;h1&gt;</code>).</li>
        <li>సెర్చ్ బార్ (Search input field).</li>
        <li>యూజర్ ప్రొఫైల్ ఐకాన్ లేదా లాగిన్/సైన్అప్ బటన్లు.</li>
        <li>ప్రధాన నావిగేషన్ మెనూ (<code>&lt;nav&gt;</code>).</li>
      </ul>

      <div class="callout callout-warning" style="margin-top:16px;">
        <span class="callout-icon">⚠️</span>
        <div>
          <strong>బిగినర్స్ కన్‌ఫ్యూజన్: &lt;head&gt; vs &lt;header&gt;</strong><br>
          ఈ రెండింటి మధ్య ఉన్న తేడాను ఎప్పటికీ మరచిపోకండి:<br>
          • <strong><code>&lt;head&gt;</code>:</strong> ఇది స్క్రీన్ మీద కనిపించదు! ఇది మెటాడేటా, CSS లింకులు, టైటిల్, మరియు ఫాంట్స్ లాంటి బ్రౌజర్ సమాచారాన్ని దాచుకునే అంతర్గత విభాగం.<br>
          • <strong><code>&lt;header&gt;</code>:</strong> ఇది యూజర్‌కు స్క్రీన్ పైభాగంలో స్పష్టంగా కనిపించే విజువల్ ఎలిమెంట్. ఇది <code>&lt;body&gt;</code> లోపల మాత్రమే ఉంటుంది!
        </div>
      </div>

      <div class="code-block" style="margin-top:16px;">
        <div class="code-block-header">
          <span>HTML — ప్రొఫెషనల్ &lt;header&gt; నిర్మాణం</span>
          <div class="code-actions">
            <button class="try-btn">▶ Run in Online HTML Editor</button>
          </div>
        </div>
        <pre><code class="language-html">&lt;header style="background: #0f172a; color: white; padding: 16px 24px; display: flex; justify-content: space-between; align-items: center;"&gt;
  &lt;!-- బ్రాండింగ్ / లోగో --&gt;
  &lt;div class="brand" style="font-size: 20px; font-weight: bold; color: #10b981;"&gt;
    🖥️ Our Compiler
  &lt;/div&gt;

  &lt;!-- సెర్చ్ బార్ --&gt;
  &lt;form action="/search" method="GET"&gt;
    &lt;input type="search" placeholder="కోర్సును వెతకండి..." style="padding: 6px 12px; border-radius: 6px; border: 1px solid #334155;"&gt;
  &lt;/form&gt;

  &lt;!-- యూజర్ యాక్షన్స్ --&gt;
  &lt;div&gt;
    &lt;button style="background: #10b981; color: white; border: none; padding: 8px 16px; border-radius: 6px; font-weight: bold; cursor: pointer;"&gt;లాగిన్&lt;/button&gt;
  &lt;/div&gt;
&lt;/header&gt;</code></pre>
      </div>
    </div>

    <!-- SECTION 5 -->
    <div class="section-title"><span class="num">5</span>&lt;nav&gt; ఎలిమెంట్: నావిగేషన్ మెనూలు</div>
    <div class="section-body">
      <p><code>&lt;nav&gt;</code> (Navigation) ఎలిమెంట్ అనేది వెబ్‌సైట్‌లోని ఇతర పేజీలకు లేదా ప్రస్తుత పేజీలోని ఇతర భాగాలకు తీసుకెళ్ళే ప్రధాన లింకుల సమాహారాన్ని (Major Navigation Links) సూచిస్తుంది.</p>

      <p><strong>&lt;nav&gt; వాడకంలో గోల్డెన్ రూల్:</strong></p>
      <p>వెబ్‌సైట్‌లోని ప్రతి చిన్న లింక్‌కూ <code>&lt;nav&gt;</code> చుట్టకూడదు! కేవలం వెబ్‌సైట్ యొక్క <strong>ప్రధాన నావిగేషన్ మెనూలు</strong> (హెడర్ మెనూ, సైడ్‌బార్ టేబుల్ ఆఫ్ కంటెంట్స్, పేజినేషన్ లింకులు) లకు మాత్రమే <code>&lt;nav&gt;</code> వాడాలి.</p>

      <div class="code-block">
        <div class="code-block-header">
          <span>HTML — &lt;nav&gt; మరియు లిస్టులతో క్లీన్ నావిగేషన్</span>
          <div class="code-actions">
            <button class="try-btn">▶ Run in Online HTML Editor</button>
          </div>
        </div>
        <pre><code class="language-html">&lt;nav aria-label="ప్రధాన నావిగేషన్" style="background: #1e293b; padding: 10px 24px;"&gt;
  &lt;ul style="list-style: none; margin: 0; padding: 0; display: flex; gap: 20px;"&gt;
    &lt;li&gt;&lt;a href="/" style="color: #ffffff; text-decoration: none; font-weight: 600;"&gt;హోమ్&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="/blog-html.html" style="color: #10b981; text-decoration: none; font-weight: 600;"&gt;HTML5 ట్యుటోరియల్&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="/blog-javascript.html" style="color: #ffffff; text-decoration: none; font-weight: 600;"&gt;జావాస్క్రిప్ట్&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="/online-html-editor.html" style="color: #ffffff; text-decoration: none; font-weight: 600;"&gt;ఆన్‌లైన్ ఎడిటర్&lt;/a&gt;&lt;/li&gt;
  &lt;/ul&gt;
&lt;/nav&gt;</code></pre>
      </div>

      <div class="callout callout-tip" style="margin-top:16px;">
        <span class="callout-icon">💡</span>
        <div>
          <strong>Accessibility చిట్కా:</strong> స్క్రీన్ రీడర్‌లకు సహాయపడేందుకు <code>&lt;nav aria-label="ప్రధాన మెనూ"&gt;</code> అని లేబుల్ ఇవ్వడం ద్వారా ఒకే పేజీలో బహుళ నావిగేషన్లు ఉన్నప్పుడు (ఉదాహరణకు: హెడర్ మెనూ మరియు ఫుటర్ మెనూ) అంధులు సులభంగా తేడాను గ్రహించగలరు.
        </div>
      </div>
    </div>

    <!-- SECTION 6 -->
    <div class="section-title"><span class="num">6</span>&lt;main&gt; ఎలిమెంట్: పేజీ యొక్క ప్రాణవాయువు</div>
    <div class="section-body">
      <p><code>&lt;main&gt;</code> ఎలిమెంట్ అనేది ఒక HTML డాక్యుమెంట్ యొక్క కేంద్ర బిందువు. ఇది ఆ పేజీకి మాత్రమే ప్రత్యేకం అయిన (Unique to this document) ప్రధాన కంటెంట్‌ను కలిగి ఉంటుంది.</p>

      <div class="callout callout-danger" style="margin-top:12px; background:#fef2f2; border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px;">
        <strong style="color:#b91c1c;">🚨 W3C తప్పనిసరి నియమం (Strict W3C Rule):</strong><br>
        ఒక వెబ్‌పేజీలో <strong>కేవలం ఒకే ఒక్క &lt;main&gt; ఎలిమెంట్</strong> మాత్రమే ఉండాలి! అంతేకాకుండా వెబ్‌సైట్‌లోని ప్రతి పేజీలో రిపీట్ అయ్యే సాధారణ అంశాలను (ఉదాహరణకు: లోగోలు, సైట్‌వైడ్ నావిగేషన్ బార్లు, కాపీరైట్ సమాచారం, సైడ్‌బార్ బ్యానర్లు) <code>&lt;main&gt;</code> లోపల ఎట్టి పరిస్థితుల్లోనూ పెట్టకూడదు!
      </div>

      <div class="code-block" style="margin-top:16px;">
        <div class="code-block-header">
          <span>HTML — &lt;main&gt; ట్యాగ్ సరైన ఉపయోగం</span>
          <div class="code-actions">
            <button class="try-btn">▶ Run in Online HTML Editor</button>
          </div>
        </div>
        <pre><code class="language-html">&lt;!-- హెడర్ &amp; నావిగేషన్ మెయిన్ బయట ఉంటాయి --&gt;
&lt;header&gt; ... &lt;/header&gt;
&lt;nav&gt; ... &lt;/nav&gt;

&lt;!-- ఈ పేజీకి మాత్రమే సంబంధించిన ఏకైక కంటెంట్ --&gt;
&lt;main id="primary-content" style="padding: 24px; max-width: 800px; margin: 0 auto;"&gt;
  &lt;h1&gt;జావాస్క్రిప్ట్ అసింక్రోనస్ ప్రోగ్రామింగ్&lt;/h1&gt;
  &lt;p&gt;ఈ ఆర్టికల్‌లో మనం Promises మరియు Async/Await గురించి నేర్చుకుందాం...&lt;/p&gt;
  
  &lt;p&gt;మనం సర్వర్ నుండి డేటాను ఫెచ్ చేసేటప్పుడు బ్రౌజర్ ఫ్రీజ్ కాకుండా బ్యాక్‌గ్రౌండ్‌లో డేటాను లోడ్ చేయడానికి అసింక్ అవసరం...&lt;/p&gt;
&lt;/main&gt;

&lt;!-- ఫుటర్ కూడా మెయిన్ బయట ఉంటుంది --&gt;
&lt;footer&gt; ... &lt;/footer&gt;</code></pre>
      </div>
    </div>

    <!-- SECTION 7 -->
    <div class="section-title"><span class="num">7</span>&lt;footer&gt; ఎలిమెంట్: వెబ్‌సైట్ పాదపీఠం</div>
    <div class="section-body">
      <p><code>&lt;footer&gt;</code> ఎలిమెంట్ అనేది ఒక పేజీ యొక్క లేదా ఒక ఆర్టికల్ యొక్క దిగువ భాగాన్ని (Footer) సూచిస్తుంది. ఇది సాధారణంగా ఆ కంటెంట్‌ను సృష్టించిన వారి వివరాలు, లీగల్ నోటీసులు, లేదా సంబంధిత లింకులను అందిస్తుంది.</p>

      <p><strong>సాధారణంగా &lt;footer&gt; లో ఏమి ఉంటాయి?</strong></p>
      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.7;">
        <li>కాపీరైట్ సమాచారం (ఉదా: © 2026 కంపెనీ పేరు).</li>
        <li>రచయిత వివరాలు లేదా కాంటాక్ట్ సమాచారం (<code>&lt;address&gt;</code> ట్యాగ్ తో).</li>
        <li>గోప్యతా విధానం (Privacy Policy), సేవా నిబంధనలు (Terms of Service) లింకులు.</li>
        <li>సోషల్ మీడియా ప్రొఫైల్స్ (Twitter/X, GitHub, LinkedIn).</li>
        <li>పేజీ పైకి వెళ్ళే "Back to Top" లింక్.</li>
      </ul>

      <div class="code-block" style="margin-top:16px;">
        <div class="code-block-header">
          <span>HTML — సంపూర్ణమైన &lt;footer&gt; ఉదాహరణ</span>
          <div class="code-actions">
            <button class="try-btn">▶ Run in Online HTML Editor</button>
          </div>
        </div>
        <pre><code class="language-html">&lt;footer style="background: #0f172a; color: #94a3b8; padding: 32px 24px; text-align: center; border-top: 1px solid #334155;"&gt;
  &lt;div style="display: flex; justify-content: center; gap: 24px; margin-bottom: 16px;"&gt;
    &lt;a href="/privacy" style="color: #cbd5e1; text-decoration: none;"&gt;గోప్యతా విధానం&lt;/a&gt;
    &lt;a href="/terms" style="color: #cbd5e1; text-decoration: none;"&gt;నిబంధనలు&lt;/a&gt;
    &lt;a href="/contact" style="color: #cbd5e1; text-decoration: none;"&gt;సంప్రదించండి&lt;/a&gt;
  &lt;/div&gt;

  &lt;address style="font-style: normal; margin-bottom: 12px;"&gt;
    హైదరాబాద్, తెలంగాణ, భారతదేశం · ఈమెయిల్: support@ourcompiler.com
  &lt;/address&gt;

  &lt;p style="font-size: 13px; margin: 0;"&gt;
    &copy; 2026 Our Compiler. సర్వహక్కులు ప్రత్యేకించబడినవి.
  &lt;/p&gt;
&lt;/footer&gt;</code></pre>
      </div>
    </div>

    <!-- SECTION 8 -->
    <div class="section-title"><span class="num">8</span>Div Soup సమస్య నుండి విముక్తి: Before vs After</div>
    <div class="section-body">
      <p>HTML4 లో కోడ్ ఎంత గందరగోళంగా ఉండేదో, ఆధునిక HTML5 సెమాంటిక్స్ దానిని ఎంత పరిశుభ్రంగా మార్చాయో క్రింది పోలికలో చూడండి:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span>పాత శైలి: HTML4 Div Soup (గందరగోళం ❌)</span>
        </div>
        <pre><code class="language-html">&lt;!-- 1999 నాటి Div Soup: ప్రతిదానికీ ఒక div! --&gt;
&lt;div id="header"&gt;
  &lt;div id="logo"&gt;నా వెబ్‌సైట్&lt;/div&gt;
  &lt;div id="menu"&gt;
    &lt;div class="link"&gt;హోమ్&lt;/div&gt;
    &lt;div class="link"&gt;బ్లాగ్&lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;

&lt;div id="main-content"&gt;
  &lt;div class="article-title"&gt;HTML పరిచయం&lt;/div&gt;
  &lt;div class="article-body"&gt;వివరణ...&lt;/div&gt;
&lt;/div&gt;

&lt;div id="footer"&gt;
  &lt;div class="copy"&gt;&copy; 2026&lt;/div&gt;
&lt;/div&gt;</code></pre>
      </div>

      <div class="code-block" style="margin-top:20px;">
        <div class="code-block-header">
          <span>ఆధునిక శైలి: HTML5 సెమాంటిక్ నిర్మాణం (పరిశుభ్రం ✅)</span>
          <div class="code-actions">
            <button class="try-btn">▶ Run in Online HTML Editor</button>
          </div>
        </div>
        <pre><code class="language-html">&lt;!-- ఆధునిక HTML5: ప్రతి ఎలిమెంట్‌కూ స్పష్టమైన గుర్తింపు! --&gt;
&lt;header&gt;
  &lt;h1&gt;నా వెబ్‌సైట్&lt;/h1&gt;
  &lt;nav&gt;
    &lt;a href="/"&gt;హోమ్&lt;/a&gt;
    &lt;a href="/blog"&gt;బ్లాగ్&lt;/a&gt;
  &lt;/nav&gt;
&lt;/header&gt;

&lt;main&gt;
  &lt;article&gt;
    &lt;h2&gt;HTML పరిచయం&lt;/h2&gt;
    &lt;p&gt;వివరణ...&lt;/p&gt;
  &lt;/article&gt;
&lt;/main&gt;

&lt;footer&gt;
  &lt;p&gt;&copy; 2026&lt;/p&gt;
&lt;/footer&gt;</code></pre>
      </div>
    </div>

    <!-- SECTION 9 -->
    <div class="section-title"><span class="num">9</span>Accessibility (a11y) &amp; ల్యాండ్‌మార్క్స్ (Landmarks)</div>
    <div class="section-body">
      <p>స్క్రీన్ రీడర్ సాఫ్ట్‌వేర్ ఉపయోగించే దృష్టి లోపం ఉన్న వ్యక్తులు వెబ్‌సైట్‌ను చూసేటప్పుడు మనలాగా మౌస్‌తో స్క్రోల్ చేయలేరు. వారు కీబోర్డ్ షార్ట్‌కట్స్ (ఉదా: 'D' కీ లేదా 'Tab' కీ) నొక్కుతూ పేజీలోని ప్రధాన ప్రాంతాలకు ఎగురుతారు (Jump to Landmark).</p>

      <p>బ్రౌజర్లు సెమాంటిక్ ట్యాగ్స్‌ను ఆటోమేటిక్‌గా <strong>ARIA ల్యాండ్‌మార్క్స్ (Landmarks)</strong> గా గుర్తిస్తాయి:</p>
      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.8;">
        <li><code>&lt;header&gt;</code> = <code>role="banner"</code> (వెబ్‌సైట్ ప్రధాన బ్యానర్)</li>
        <li><code>&lt;nav&gt;</code> = <code>role="navigation"</code> (నావిగేషన్ మెనూ)</li>
        <li><code>&lt;main&gt;</code> = <code>role="main"</code> (ప్రధాన సమాచార ప్రాంతం)</li>
        <li><code>&lt;footer&gt;</code> = <code>role="contentinfo"</code> (ముగింపు సమాచారం)</li>
      </ul>

      <p style="margin-top:14px;"><strong>"Skip to Content" లింక్ మ్యాజిక్:</strong></p>
      <p>ప్రతి పేజీలో హెడర్ మరియు నావిగేషన్‌లో 50 లింకులు ఉంటే, అంధులు ప్రతిసారి ఆ 50 లింకులూ విని ఆ తర్వాత మెయిన్ కంటెంట్‌కు వెళ్ళాలంటే చాలా సమయం వృధా అవుతుంది. కాబట్టి ప్రొఫెషనల్ వెబ్‌సైట్లలో హెడర్ కంటే ముందే ఇలా ఒక స్కిప్ లింక్ రాస్తారు:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span>HTML — Skip to Content యాక్సెసిబిలిటీ టెక్నిక్</span>
        </div>
        <pre><code class="language-html">&lt;!-- స్క్రీన్ రీడర్స్ మరియు కీబోర్డ్ యూజర్లకు వరం --&gt;
&lt;a href="#main-content" class="skip-link" style="position: absolute; top: -100px; left: 10px; background: #10b981; color: white; padding: 8px 16px; border-radius: 4px; z-index: 1000;"&gt;
  ప్రధాన కంటెంట్‌కు వెళ్ళండి (Skip to Main Content)
&lt;/a&gt;

&lt;header&gt; ... నావిగేషన్ లింకులు ... &lt;/header&gt;

&lt;!-- ఇక్కడికి నేరుగా జంప్ అవుతుంది --&gt;
&lt;main id="main-content"&gt;
  &lt;h1&gt;ఈనాటి వార్తలు&lt;/h1&gt;
&lt;/main&gt;</code></pre>
      </div>
    </div>

    <!-- SECTION 10 -->
    <div class="section-title"><span class="num">10</span>గూగుల్ SEO అడ్వాంటేజ్ (Search Engine Optimization)</div>
    <div class="section-body">
      <p>గూగుల్ సెర్చ్ బోట్స్ (Googlebot) ఒక వెబ్‌పేజీని క్రాల్ చేసేటప్పుడు — మీ పేజీలోని ఏ భాగం హెడరో, ఏ భాగం ఫుటరో, ఏది అసలైన యూనిక్ కంటెంటో లెక్కగడతాయి:</p>

      <div class="diagram-box">
  Googlebot పేజీని స్కాన్ చేసే విధానం:
  ┌─────────────────────────────────────────────────────────────┐
  │  &lt;header&gt; &amp; &lt;nav&gt; ───► "ఇవి సాధారణ లింకులు, బ్రాండింగ్"     │
  │  &lt;main&gt;            ───► "ఇదిగో అసలైన సమాచారం! ఇక్కడే కీవర్డ్స్ │
  │                           ర్యాంకింగ్ విలువ లెక్కించాలి! ⭐"   │
  │  &lt;footer&gt;          ───► "ఇది కాపీరైట్, సైట్ వివరాలు"         │
  └─────────────────────────────────────────────────────────────┘
      </div>

      <p style="margin-top:14px;"><strong>సెమాంటిక్స్ తో లభించే 3 అతిపెద్ద SEO ప్రయోజనాలు:</strong></p>
      <ol style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.8;">
        <li><strong>కీవర్డ్ ప్రయారిటీ:</strong> <code>&lt;main&gt;</code> లోపల ఉన్న హెడ్డింగ్స్ మరియు పేరాగ్రాఫ్‌లకు గూగుల్ అత్యధిక వెయిటేజీ ఇస్తుంది.</li>
        <li><strong>రిచ్ స్నిప్పెట్స్ &amp; సైట్‌లింక్స్:</strong> గూగుల్ సెర్చ్‌లో మీ వెబ్‌సైట్ కింద డైరెక్ట్‌గా సెక్షన్ లింకులు (Sitelinks) రావడానికి <code>&lt;nav&gt;</code> సహాయపడుతుంది.</li>
        <li><strong>బాట్స్ సమర్థవంతమైన క్రాలింగ్:</strong> అనవసరమైన కోడ్‌ను బైపాస్ చేసి నేరుగా ముఖ్యమైన కంటెంట్‌ను ఇండెక్స్ చేయడానికి సెర్చ్ రోబోట్లకు తక్కువ సమయం పడుతుంది.</li>
      </ol>
    </div>

    <!-- SECTION 11 -->
    <div class="section-title"><span class="num">11</span>బిగినర్స్ చేసే టాప్ 5 పొరపాట్లు &amp; పరిష్కారాలు</div>
    <div class="section-body">
      <div style="display:flex; flex-direction:column; gap:16px;">
        <div style="background:var(--bg2); border:1px solid #fecaca; border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px;">
          <strong style="color:#b91c1c;">1. తప్పు: &lt;head&gt; మరియు &lt;header&gt; లను తారుమారు చేయడం</strong>
          <p style="margin-top:6px; color:var(--text2); font-size:14px;"><code>&lt;title&gt;</code> లేదా <code>&lt;link&gt;</code> లను <code>&lt;header&gt;</code> లో రాయడం లేదా పేజీ బ్రాండింగ్ లోగోను <code>&lt;head&gt;</code> లో రాయడం. గుర్తుంచుకోండి: <code>&lt;head&gt;</code> బ్యాక్‌గ్రౌండ్ మెటాడేటా కోసం; <code>&lt;header&gt;</code> కంటికి కనిపించే బాడీ లోగో/హెడ్డింగ్ కోసం!</p>
        </div>

        <div style="background:var(--bg2); border:1px solid #fecaca; border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px;">
          <strong style="color:#b91c1c;">2. తప్పు: ఒకే పేజీలో బహుళ &lt;main&gt; ట్యాగ్‌లు రాయడం</strong>
          <p style="margin-top:6px; color:var(--text2); font-size:14px;">W3C ప్రమాణాల ప్రకారం ఒక HTML పేజీకి <strong>ఒకే ఒక్క &lt;main&gt;</strong> ఉండాలి. రెండు మూడు సెక్షన్లు ఉంటే వాటికి <code>&lt;section&gt;</code> లేదా <code>&lt;article&gt;</code> వాడాలి తప్ప మళ్ళీ ఇంకో <code>&lt;main&gt;</code> రాయకూడదు.</p>
        </div>

        <div style="background:var(--bg2); border:1px solid #fecaca; border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px;">
          <strong style="color:#b91c1c;">3. తప్పు: ఫుటర్‌లోని ప్రతి చిన్న లింక్‌కూ &lt;nav&gt; ట్యాగ్ చుట్టడం</strong>
          <p style="margin-top:6px; color:var(--text2); font-size:14px;">ఫుటర్‌లో ఉండే 'కాపీరైట్ 2026' లేదా 'ప్రైవసీ పాలసీ' లాంటి ఒంటరి లింకులకు <code>&lt;nav&gt;</code> అవసరం లేదు. కేవలం ప్రధాన నావిగేషన్ బ్లాకులకు మాత్రమే <code>&lt;nav&gt;</code> వాడాలి.</p>
        </div>

        <div style="background:var(--bg2); border:1px solid #fecaca; border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px;">
          <strong style="color:#b91c1c;">4. తప్పు: కేవలం CSS స్టైలింగ్ కోసమే సెమాంటిక్ ట్యాగ్స్ వాడటం</strong>
          <p style="margin-top:6px; color:var(--text2); font-size:14px;">కేవలం ఒక బాక్స్‌ను డిజైన్ చేయడానికి లేదా బ్యాక్‌గ్రౌండ్ కలర్ మార్చడానికి <code>&lt;header&gt;</code> లేదా <code>&lt;footer&gt;</code> వాడకూడదు. కేవలం స్టైలింగ్ అవసరాలకు మాత్రమే <code>&lt;div&gt;</code> ని నిరభ్యంతరంగా ఉపయోగించవచ్చు.</p>
        </div>

        <div style="background:var(--bg2); border:1px solid #fecaca; border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px;">
          <strong style="color:#b91c1c;">5. తప్పు: &lt;header&gt; ని &lt;main&gt; లోపల కాకుండా ఎప్పుడూ పేజీ పైనే వాడాలని అనుకోవడం</strong>
          <p style="margin-top:6px; color:var(--text2); font-size:14px;">ఒక పెద్ద ఆర్టికల్ (<code>&lt;article&gt;</code>) లోపల కూడా దాని స్వంత శీర్షిక మరియు ప్రచురణ తేదీ కోసం చిన్న <code>&lt;header&gt;</code> ను నిరభ్యంతరంగా ఉపయోగించవచ్చు!</p>
        </div>
      </div>
    </div>

    <!-- SECTION 12 (INTERACTIVE COLLAPSIBLE QUIZ) -->
    <div class="section-title"><span class="num">12</span>ఇంటరాక్టివ్ సెల్ఫ్-టెస్ట్ క్విజ్ (Interactive Quiz)</div>
    <div class="section-body">
      <p>ఈ అధ్యాయంలో మీరు నేర్చుకున్న విషయాలను స్వయంగా పరీక్షించుకోండి. ప్రతి ప్రశ్నను చదివి సమాధానం ఆలోచించిన తర్వాత "సమాధానం చూడండి" పై క్లిక్ చేయండి:</p>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:700; cursor:pointer; color:#059669;">
          ❓ ప్రశ్న 1: సెమాంటిక్ ఎలిమెంట్స్ అంటే ఏమిటి? వీటికి ఉదాహరణలు ఇవ్వండి.
        </summary>
        <div style="margin-top:10px; color:var(--text2); font-size:14px; line-height:1.6;">
          <strong>సమాధానం:</strong> తమ పేరు ద్వారానే తమ కంటెంట్ యొక్క అర్థాన్ని డెవలపర్‌కు, బ్రౌజర్‌కు మరియు సెర్చ్ ఇంజిన్లకు స్పష్టంగా తెలియజేసే ఎలిమెంట్లను సెమాంటిక్ ఎలిమెంట్స్ అంటారు. ఉదాహరణలు: <code>&lt;header&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;footer&gt;</code>, <code>&lt;article&gt;</code>, <code>&lt;section&gt;</code>.
        </div>
      </details>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:700; cursor:pointer; color:#059669;">
          ❓ ప్రశ్న 2: ఒకే HTML డాక్యుమెంట్‌లో ఎన్ని &lt;main&gt; ఎలిమెంట్స్ ఉండవచ్చు?
        </summary>
        <div style="margin-top:10px; color:var(--text2); font-size:14px; line-height:1.6;">
          <strong>సమాధానం:</strong> కేవలం ఒక్కటి మాత్రమే (Only 1)! ఆ పేజీకి ప్రత్యేకమైన ప్రధాన సమాచారాన్ని మాత్రమే అందులో ఉంచాలి.
        </div>
      </details>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:700; cursor:pointer; color:#059669;">
          ❓ ప్రశ్న 3: &lt;head&gt; మరియు &lt;header&gt; మధ్య ప్రాథమిక వ్యత్యాసం ఏమిటి?
        </summary>
        <div style="margin-top:10px; color:var(--text2); font-size:14px; line-height:1.6;">
          <strong>సమాధానం:</strong> <code>&lt;head&gt;</code> అనేది బ్రౌజర్ మరియు మెటాడేటా సమాచారం (స్క్రీన్ పై కనిపించదు). <code>&lt;header&gt;</code> అనేది యూజర్‌కు కంటికి కనిపించే పేజీ లేదా సెక్షన్ యొక్క దృశ్యమాన శిరోభాగం (లోగో, హెడ్డింగ్, మెనూ మొదలైనవి).
        </div>
      </details>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:700; cursor:pointer; color:#059669;">
          ❓ ప్రశ్న 4: స్క్రీన్ రీడర్స్ ఉపయోగించే దృష్టి లోపం ఉన్నవారికి సెమాంటిక్ ఎలిమెంట్స్ ఎలా సహాయపడతాయి?
        </summary>
        <div style="margin-top:10px; color:var(--text2); font-size:14px; line-height:1.6;">
          <strong>సమాధానం:</strong> బ్రౌజర్లు ఈ ఎలిమెంట్లను ARIA ల్యాండ్‌మార్క్స్ (Landmarks) గా గుర్తిస్తాయి. దీనివల్ల దృష్టి లోపం ఉన్నవారు కీబోర్డ్ షార్ట్‌కట్స్ ద్వారా నేరుగా హెడర్‌ను దాటి మెయిన్ కంటెంట్‌కు లేదా నావిగేషన్‌కు తక్షణమే జంప్ కాగలరు.
        </div>
      </details>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:700; cursor:pointer; color:#059669;">
          ❓ ప్రశ్న 5: HTML5 వచ్చిన తర్వాత &lt;div&gt; వాడకం పూర్తిగా నిలిపివేయాలా?
        </summary>
        <div style="margin-top:10px; color:var(--text2); font-size:14px; line-height:1.6;">
          <strong>సమాధానం:</strong> లేదు! కేవలం స్టైలింగ్ (CSS ఫ్లెక్స్‌బాక్స్, గ్రిడ్ ర్యాపర్స్) లేదా జావాస్క్రిప్ట్ మ్యానిపులేషన్ కోసం ఎటువంటి సెమాంటిక్ ప్రాముఖ్యత లేని సందర్భాలలో <code>&lt;div&gt;</code> ను నిరభ్యంతరంగా ఉపయోగించవచ్చు.
        </div>
      </details>
    </div>

    <!-- SECTION 13 (TRY BOX & SUMMARY) -->
    <div class="section-title"><span class="num">13</span>మీరే స్వయంగా Try చేయండి &amp; సారాంశం (Quick Summary)</div>
    <div class="section-body">
      <div class="try-box" style="margin-top:10px;">
        <div class="try-title">🚀 పూర్తి సెమాంటిక్ వెబ్‌సైట్ లేఅవుట్‌ను లైవ్‌గా రన్ చేసి చూడండి</div>
        <p>క్రింది సంపూర్ణ సెమాంటిక్ వెబ్‌సైట్ కోడ్‌ను మన ఆన్‌లైన్ ఎడిటర్‌లో ఓపెన్ చేసి, విభిన్న విభాగాలైన <code>header</code>, <code>nav</code>, <code>main</code>, <code>footer</code> లు బ్రౌజర్‌లో ఎలా రెండర్ అవుతున్నాయో లైవ్‌గా పరిశీలించండి!</p>
        <a class="run-btn" href="/online-html-editor.html" target="_blank">
          👉 Our Compiler లో HTML Editor try చేయండి
        </a>
      </div>

      <div style="margin-top:24px;">
        <h4 style="color:#059669; font-size:16px; margin-bottom:10px;">📌 క్విక్ సారాంశం (Key Takeaways):</h4>
        <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.7;">
          <li><strong>సెమాంటిక్స్:</strong> కోడ్‌కు స్పష్టమైన అర్థాన్ని ఇచ్చి క్లీన్ ఆర్కిటెక్చర్, SEO మరియు Accessibility ని మెరుగుపరుస్తాయి.</li>
          <li><strong>&lt;header&gt;:</strong> లోగో, బ్రాండింగ్, టైటిల్ మరియు శోధన ఫీచర్లను కలిగి ఉండే శిరోభాగం.</li>
          <li><strong>&lt;nav&gt;:</strong> వెబ్‌సైట్ ప్రధాన నావిగేషన్ మెనూ లింకుల కోసం మాత్రమే వాడాలి.</li>
          <li><strong>&lt;main&gt;:</strong> ప్రతి వెబ్‌పేజీలో ఏకైక ప్రధాన కంటెంట్‌కు కేటాయించిన ఒకే ఒక్క సెంట్రల్ ఎలిమెంట్.</li>
          <li><strong>&lt;footer&gt;:</strong> కాపీరైట్స్, లీగల్ లింకులు, చిరునామా మరియు రచయిత వివరాలు ఉండే పాదపీఠం.</li>
          <li><strong>ల్యాండ్‌మార్క్స్:</strong> అంధులకు కీబోర్డ్ ద్వారా పేజీని నావిగేట్ చేయడానికి సులభమైన దారులు.</li>
        </ul>
      </div>

      <div style="margin-top:20px; padding:16px; background:var(--bg2); border-left:4px solid #10b981; border-radius:0 8px 8px 0;">
        <strong>తర్వాతి అధ్యాయంలో (Chapter 10):</strong> మనం మరింత లోతైన సెమాంటిక్స్ అయిన <strong>ఆర్టికల్స్ (&lt;article&gt;), సెక్షన్స్ (&lt;section&gt;), సైడ్‌బార్ (&lt;aside&gt;) మరియు క్యాప్షన్లతో కూడిన ఫిగర్స్ (&lt;figure&gt;, &lt;figcaption&gt;)</strong> గురించి అద్భుతమైన ఉదాహరణలతో నేర్చుకుందాం!
      </div>
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
        <span>Reviewed for accuracy &amp; tested across modern Web Standards / W3C &amp; WHATWG · 2026 Academic Edition</span>
      </div>
    </div>

  </main>
</div>

<!-- SITE NAVIGATION LOADER -->
<script src="/site-nav.js" defer></script>
</body>
</html>
`;

const targetFile = path.join(__dirname, '..', 'public', 'blog-html', '09-html-semantic-elements-header-nav-main-footer.html');
fs.writeFileSync(targetFile, fullPageHtml, 'utf8');
console.log('✅ Successfully generated deep high-value Chapter 9!');
console.log('Target file size:', fullPageHtml.length, 'characters');
