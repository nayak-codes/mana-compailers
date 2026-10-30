const fs = require('fs');
const path = require('path');
const { LESSONS, buildSidebar } = require('./html_curriculum_data.js');

const lesson = LESSONS.find(l => l.num === 10);
const sidebarHtml = buildSidebar(10);

const chapterContentHtml = `
    <!-- BREADCRUMB -->
    <div class="breadcrumb">
      <a href="/">Home</a><span class="sep">›</span>
      <a href="/blog.html">Tutorials</a><span class="sep">›</span>
      <a href="/blog-html.html">HTML5 Masterclass</a><span class="sep">›</span>
      <span class="current">Chapter 10: కంటెంట్ స్ట్రక్చరింగ్: article, section, aside, figure, figcaption</span>
    </div>

    <!-- PAGE TITLE -->
    <h1 class="page-title">HTML5 కంటెంట్ స్ట్రక్చరింగ్: article, section, aside, figure, figcaption &amp; address</h1>

    <!-- PAGE META BADGES -->
    <div class="page-meta">
      <span class="badge">🌐 Modern HTML5 (W3C/WHATWG)</span>
      <span class="badge">🟢 Chapter 10 of 20</span>
      <span class="badge">📂 Phase 03: మోడరన్ సెమాంటిక్ HTML5 &amp; లేఅవుట్ డిజైన్</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

    <!-- SUBTOPICS PILL BAR -->
    <div style="background:var(--bg3); border:1px solid var(--border); border-radius:8px; padding:10px 16px; margin-bottom:24px; font-size:13px; color:var(--text2); display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
      <span style="color:#10b981; font-weight:700;">📌 Covered in this chapter:</span>
      <span>&lt;article&gt; స్వతంత్ర కంటెంట్ · &lt;section&gt; ఉప-విభాగాలు · article vs section వ్యత్యాసాల పట్టిక · సైడ్‌బార్ల కోసం &lt;aside&gt; · క్యాప్షన్లతో కూడిన &lt;figure&gt; &amp; &lt;figcaption&gt; · &lt;address&gt; కాంటాక్ట్ సెమాంటిక్స్ · బ్రౌజర్ రీడర్ మోడ్ మ్యాజిక్ · బిగినర్స్ తప్పులు &amp; క్విజ్</span>
    </div>

    <!-- INTRO ACCENT BOX (Warm Ivory with Green Accent) -->
    <div class="intro-box">
      <p>ఒక ప్రసిద్ధ వార్తా మ్యాగజైన్‌ను (ఉదాహరణకు: ఇండియా టుడే లేదా టైమ్ మ్యాగజైన్) చదివేటప్పుడు మీరు ఒక అద్భుతమైన నిర్మాణాన్ని గమనించవచ్చు: అందులో ఒక పూర్తి స్వతంత్ర వార్తా కథనం (Standalone Article) ఉంటుంది. ఆ కథనం లోపల వివిధ ఉప-విభాగాలు (Thematic Sections) ఉంటాయి. పక్కనే ఆ వార్తకు సంబంధించిన చిన్న సైడ్-బాక్స్ లేదా రిలేటెడ్ లింక్స్ (Sidebar / Aside) కనిపిస్తాయి. మధ్యలో ఒక ఫోటో లేదా గ్రాఫ్ ఉండి దాని కింద "చిత్ర వివరణ / ఫోటో కర్టెసీ" (Figure &amp; Figcaption) ఉంటుంది. కథనం చివర ఆ రిపోర్టర్ లేదా పబ్లిషర్ సంప్రదింపు వివరాలు (Address) ఉంటాయి.</p>
      <p>పాత రోజుల్లో వెబ్‌సైట్లలో ఈ విభాగాలన్నింటికీ కేవలం <code>&lt;div class="box"&gt;</code>, <code>&lt;div class="content"&gt;</code> అని రాసేవారు. కానీ ఆధునిక HTML5 లో వెబ్‌పేజీలోని సమాచారాన్ని ఒక మ్యాగజైన్ లాగా అత్యంత స్పష్టంగా అమర్చడానికి <strong>&lt;article&gt;, &lt;section&gt;, &lt;aside&gt;, &lt;figure&gt;, &lt;figcaption&gt;, మరియు &lt;address&gt;</strong> లాంటి అద్భుతమైన సెమాంటిక్ ట్యాగ్‌లు వచ్చాయి!</p>
      <p>ఈ ట్యాగ్‌లను సరైన పద్ధతిలో వాడటం వల్ల — మీ వెబ్‌సైట్ గూగుల్ సెర్చ్‌లో అగ్రస్థానంలో నిలవడమే కాకుండా, ఆపిల్ సఫారీ లేదా గూగుల్ క్రోమ్‌లోని <strong>"రీడర్ మోడ్" (Reader View)</strong> మీ పేజీని ప్రకటనలు లేకుండా అందమైన మ్యాగజైన్‌లా మార్చి యూజర్లకు చదివిస్తుంది. ఈ పదో అధ్యాయంలో కంటెంట్ స్ట్రక్చరింగ్ సూత్రాలను ప్రాక్టికల్ లైవ్ కోడింగ్‌తో నేర్చుకుందాం!</p>
    </div>

    <!-- SECTION 1 -->
    <div class="section-title"><span class="num">1</span>ఈ Chapter లో మీరు నేర్చుకునే అంశాలు</div>
    <div class="section-body">
      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.7;">
        <li><strong>&lt;article&gt; ఎలిమెంట్:</strong> వెబ్‌సైట్ నుండి విడదీసి వేరే ఎక్కడ ప్రచురించినా స్వతంత్రంగా అర్థమయ్యే కంటెంట్ భావన.</li>
        <li><strong>&lt;section&gt; ఎలిమెంట్:</strong> సంబంధిత అంశాలను ఒక థీమ్ కింద గ్రూప్ చేసే విధానం మరియు హెడ్డింగ్ తప్పనిసరి నియమం.</li>
        <li><strong>article vs section డీప్ డైవ్:</strong> ఇంటర్వ్యూలలో తరచుగా అడిగే ఈ రెండు ట్యాగ్‌ల సూక్ష్మ వ్యత్యాసాల సమగ్ర పట్టిక.</li>
        <li><strong>&lt;aside&gt; ఎలిమెంట్:</strong> సంబంధిత అనుబంధ సమాచారం, సైడ్‌బార్స్, గ్లోసరీ మరియు కొటేషన్ బాక్సులు.</li>
        <li><strong>&lt;figure&gt; మరియు &lt;figcaption&gt;:</strong> ఫోటోలు, ఇలస్ట్రేషన్లు మరియు కోడ్ బ్లాక్‌లకు వివరణాత్మక క్యాప్షన్లు ఇవ్వడం.</li>
        <li><strong>&lt;address&gt; ట్యాగ్:</strong> సరైన కాంటాక్ట్ సెమాంటిక్స్ మరియు ఎక్కడెక్కడ వాడకూడదో నియమాలు.</li>
        <li><strong>సిండికేషన్ &amp; రీడర్ వ్యూ (Reader Mode):</strong> బ్రౌజర్లు మరియు RSS రీడర్లు సెమాంటిక్ ఆర్టికల్స్‌ను ఎలా ప్రాసెస్ చేస్తాయి?</li>
        <li><strong>బిగినర్స్ చేసే టాప్ 5 తప్పులు &amp; క్విజ్:</strong> నిత్యజీవిత ప్రాజెక్టులలో వచ్చే బగ్స్ మరియు వాటి నివారణ.</li>
      </ul>
    </div>

    <!-- SECTION 2 -->
    <div class="section-title"><span class="num">2</span>&lt;article&gt; ఎలిమెంట్: స్వయంప్రతిపత్తి గల కంటెంట్ (Standalone Content)</div>
    <div class="section-body">
      <p><code>&lt;article&gt;</code> ఎలిమెంట్ అనేది ఒక సంపూర్ణమైన, స్వయంప్రతిపత్తి కలిగిన (Self-contained, Independent) కంటెంట్ భాగాన్ని సూచిస్తుంది. దీని ప్రధాన లక్షణం ఏమిటంటే — <strong>ఈ కంటెంట్‌ను ప్రస్తుత వెబ్‌సైట్ నుండి విడదీసి వేరే ఏ ఇతర వెబ్‌సైట్‌లో గానీ, RSS ఫీడ్‌లో గానీ, న్యూస్‌లెటర్‌లో గానీ ప్రచురించినా అది దానంతట అదే పూర్తి అర్థాన్ని ఇవ్వగలగాలి!</strong></p>

      <p><strong>&lt;article&gt; కి నిత్యజీవిత ఉదాహరణలు:</strong></p>
      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.7;">
        <li>ఒక బ్లాగ్ పోస్ట్ (Blog Post) లేదా వార్తా కథనం (News Article).</li>
        <li>ఫోరమ్ లేదా సోషల్ మీడియాలోని ఒక పోస్ట్ లేదా కామెంట్ (Comment box).</li>
        <li>ఈ-కామర్స్ సైట్‌లోని ఒక ఉత్పత్తి కార్డ్ (Product Card in Amazon/Flipkart).</li>
        <li>ఒక వాతావరణ నివేదిక లేదా యూజర్ సమీక్ష (User Review/Testimonial).</li>
      </ul>

      <div class="code-block">
        <div class="code-block-header">
          <span>HTML — ఒక పరిపూర్ణమైన &lt;article&gt; నిర్మాణం</span>
          <div class="code-actions">
            <button class="try-btn">▶ Run in Online HTML Editor</button>
          </div>
        </div>
        <pre><code class="language-html">&lt;article style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin-bottom: 20px;"&gt;
  &lt;header&gt;
    &lt;h2 style="color: #0f172a; margin-top: 0;"&gt;కృత్రిమ మేధస్సు (AI) భవిష్యత్తు&lt;/h2&gt;
    &lt;p style="color: #64748b; font-size: 13px;"&gt;
      రచయిత: &lt;strong&gt;డాక్టర్ రాజేష్&lt;/strong&gt; · ప్రచురణ తేదీ: &lt;time datetime="2026-10-30"&gt;30 అక్టోబర్ 2026&lt;/time&gt;
    &lt;/p&gt;
  &lt;/header&gt;

  &lt;p&gt;ఆర్టిఫిషియల్ ఇంటెలిజెన్స్ నేడు సాఫ్ట్‌వేర్ అభివృద్ధిని వేగవంతం చేయడంలో ప్రధాన పాత్ర పోషిస్తోంది...&lt;/p&gt;

  &lt;footer style="margin-top: 16px; padding-top: 10px; border-top: 1px solid #f1f5f9; font-size: 13px; color: #64748b;"&gt;
    ట్యాగ్‌లు: &lt;span style="background: #ecfdf5; color: #059669; padding: 2px 8px; border-radius: 4px;"&gt;AI&lt;/span&gt;, &lt;span style="background: #ecfdf5; color: #059669; padding: 2px 8px; border-radius: 4px;"&gt;టెక్నాలజీ&lt;/span&gt;
  &lt;/footer&gt;
&lt;/article&gt;</code></pre>
      </div>

      <div class="callout callout-tip" style="margin-top:16px;">
        <span class="callout-icon">💡</span>
        <div>
          <strong>గుర్తుంచుకోండి:</strong> ఒక <code>&lt;article&gt;</code> లోపల దాని స్వంత <code>&lt;header&gt;</code> మరియు <code>&lt;footer&gt;</code> లు కూడా ఉండవచ్చు! పేజీకి ఉండే గ్లోబల్ హెడర్ వేరు, ఒక చిన్న ఆర్టికల్ హెడర్ వేరు.
        </div>
      </div>
    </div>

    <!-- SECTION 3 -->
    <div class="section-title"><span class="num">3</span>&lt;section&gt; ఎలిమెంట్: నేపథ్య సంబంధిత ఉప-విభాగాలు (Thematic Grouping)</div>
    <div class="section-body">
      <p><code>&lt;section&gt;</code> ఎలిమెంట్ అనేది ఒక నిర్దిష్టమైన అంశం లేదా థీమ్‌కు సంబంధించిన కంటెంట్‌ను సమూహపరచడానికి (Thematic Grouping of Content) ఉపయోగించే కంటైనర్. ఇది ఒక పుస్తకంలోని అధ్యాయాలు (Chapters) లేదా ఒక డాక్యుమెంట్‌లోని విభాగాలు లాంటిది.</p>

      <div class="callout callout-warning" style="margin-top:12px;">
        <span class="callout-icon">⚠️</span>
        <div>
          <strong>W3C గోల్డెన్ రూల్: ప్రతి &lt;section&gt; కూ ఖచ్చితంగా ఒక హెడ్డింగ్ ఉండాలి!</strong><br>
          ఒక విభాగాన్ని <code>&lt;section&gt;</code> గా నిర్వచించారంటే, దానికి స్పష్టమైన ఉద్దేశం ఉందని అర్థం. కాబట్టి ప్రతి సెక్షన్ లోపల ఖచ్చితంగా <code>&lt;h2&gt;</code> లేదా <code>&lt;h3&gt;</code> లాంటి శీర్షిక ఉండాలి. ఒకవేళ హెడ్డింగ్ లేకపోతే, అది కేవలం స్టైలింగ్ కోసం వాడే డబ్బా మాత్రమే — అప్పుడు <code>&lt;div&gt;</code> వాడటమే సరైన పద్ధతి!
        </div>
      </div>

      <div class="code-block" style="margin-top:16px;">
        <div class="code-block-header">
          <span>HTML — వెబ్‌సైట్ హోమ్‌పేజీలో &lt;section&gt; లు</span>
          <div class="code-actions">
            <button class="try-btn">▶ Run in Online HTML Editor</button>
          </div>
        </div>
        <pre><code class="language-html">&lt;main&gt;
  &lt;!-- సెక్షన్ 1: పరిచయ బ్యానర్ --&gt;
  &lt;section id="hero" style="padding: 30px; background: #ecfdf5; border-radius: 8px;"&gt;
    &lt;h2 style="color: #059669;"&gt;కోడింగ్ నేర్చుకోండి తెలుగులో!&lt;/h2&gt;
    &lt;p&gt;భారతదేశంలోనే అత్యుత్తమ ఉచిత ప్రోగ్రామింగ్ ప్లాట్‌ఫామ్.&lt;/p&gt;
  &lt;/section&gt;

  &lt;!-- సెక్షన్ 2: ఫీచర్లు --&gt;
  &lt;section id="features" style="padding: 30px;"&gt;
    &lt;h2 style="color: #0f172a;"&gt;మా ప్లాట్‌ఫామ్ ప్రత్యేకతలు&lt;/h2&gt;
    &lt;p&gt;లైవ్ కంపైలర్, లోతైన తెలుగు వివరణలు మరియు ప్రాక్టీస్ ల్యాబ్‌లు.&lt;/p&gt;
  &lt;/section&gt;

  &lt;!-- సెక్షన్ 3: యూజర్ రివ్యూలు --&gt;
  &lt;section id="reviews" style="padding: 30px; background: #f8fafc;"&gt;
    &lt;h2 style="color: #0f172a;"&gt;విద్యార్థుల అభిప్రాయాలు&lt;/h2&gt;
    &lt;p&gt;వేలాది మంది ఇంజనీరింగ్ విద్యార్థుల ప్రశంసలు.&lt;/p&gt;
  &lt;/section&gt;
&lt;/main&gt;</code></pre>
      </div>
    </div>

    <!-- SECTION 4 -->
    <div class="section-title"><span class="num">4</span>ఇంటర్వ్యూ హాట్ టాపిక్: &lt;article&gt; vs &lt;section&gt; తేడాలు</div>
    <div class="section-body">
      <p>ఫ్రంటెండ్ డెవలపర్ టెక్నికల్ ఇంటర్వ్యూలలో అత్యంత తరచుగా అడిగే ప్రశ్న: <em>"article మరియు section మధ్య తేడా ఏమిటి? ఒకదాని లోపల మరొకటి ఉండవచ్చా?"</em></p>

      <div style="overflow-x:auto; margin: 16px 0;">
        <table class="tbl">
          <thead>
            <tr>
              <th>ఫీచర్ / అంశం</th>
              <th>&lt;article&gt; (ఆర్టికల్)</th>
              <th>&lt;section&gt; (సెక్షన్)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>స్వతంత్ర స్వభావం</strong></td>
              <td>పూర్తిగా స్వతంత్రమైనది (Standalone). వేరే సైట్‌లో పెట్టినా స్వయంగా అర్థమవుతుంది.</td>
              <td>ఒక పెద్ద అంశంలో భాగం మాత్రమే. ఒంటరిగా పెడితే పూర్తి అర్థం రాదు.</td>
            </tr>
            <tr>
              <td><strong>సిండికేషన్ (RSS / షేరింగ్)</strong></td>
              <td>న్యూస్ రీడర్లు, RSS ఫీడ్లలో నేరుగా షేర్ చేయడానికి అనుకూలం.</td>
              <td>సిండికేషన్ చేయడానికి అనుకూలం కాదు.</td>
            </tr>
            <tr>
              <td><strong>ఉదాహరణలు</strong></td>
              <td>ఒక బ్లాగ్ పోస్ట్, వార్త, కామెంట్, లేదా ఈ-కామర్స్ ప్రొడక్ట్.</td>
              <td>ఒక అధ్యాయం (Chapter), కాంటాక్ట్ సెక్షన్, ఫీచర్ల జాబితా.</td>
            </tr>
            <tr>
              <td><strong>ఒకదానిలో మరొకటి (Nesting)</strong></td>
              <td>ఒక &lt;article&gt; లోపల బహుళ &lt;section&gt; లు ఉండవచ్చు! (చాలా సాధారణం)</td>
              <td>ఒక &lt;section&gt; లోపల బహుళ &lt;article&gt; లు కూడా ఉండవచ్చు! (ఉదా: బ్లాగ్ పోస్టుల లిస్ట్)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="diagram-box">
  నెస్టింగ్ సాధ్యమయ్యే 2 పద్ధతులు (Both are 100% Valid!):

  విధానం A (ఒక ఆర్టికల్‌లో సెక్షన్లు):       విధానం B (ఒక సెక్షన్‌లో ఆర్టికల్స్):
  ┌─────────────────────────────────┐       ┌─────────────────────────────────┐
  │ &lt;article&gt; (ఒక పూర్తి బ్లాగ్)    │       │ &lt;section&gt; (తాజా వార్తల సెక్షన్) │
  │   &lt;h1&gt;జావా ట్యుటోరియల్&lt;/h1&gt;     │       │   &lt;h2&gt;ఈనాటి ప్రధాన వార్తలు&lt;/h2&gt; │
  │                                 │       │                                 │
  │   &lt;section&gt;                     │       │   &lt;article&gt;వార్త 1&lt;/article&gt;    │
  │     &lt;h2&gt;1. వేరియబుల్స్&lt;/h2&gt;     │       │   &lt;article&gt;వార్త 2&lt;/article&gt;    │
  │   &lt;/section&gt;                    │       │   &lt;article&gt;వార్త 3&lt;/article&gt;    │
  │   &lt;section&gt;                     │       │                                 │
  │     &lt;h2&gt;2. లూప్స్&lt;/h2&gt;          │       │                                 │
  │   &lt;/section&gt;                    │       │                                 │
  └─────────────────────────────────┘       └─────────────────────────────────┘
      </div>
    </div>

    <!-- SECTION 5 -->
    <div class="section-title"><span class="num">5</span>&lt;aside&gt; ఎలిమెంట్: సైడ్‌బార్ &amp; అనుబంధ సమాచారం</div>
    <div class="section-body">
      <p><code>&lt;aside&gt;</code> ఎలిమెంట్ అనేది దాని పక్కన ఉన్న ప్రధాన కంటెంట్‌తో పరోక్షంగా లేదా అనుబంధంగా (Tangentially Related) సంబంధం ఉన్న సమాచారాన్ని ఉంచడానికి ఉపయోగిస్తారు. ఒకవేళ ఈ సమాచారాన్ని తొలగించినా, ప్రధాన కంటెంట్‌కు ఎటువంటి నష్టం వాటిల్లదు!</p>

      <p><strong>&lt;aside&gt; ఎక్కడెక్కడ వాడతారు?</strong></p>
      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.7;">
        <li>వెబ్‌సైట్ యొక్క సైడ్‌బార్ (Sidebar — కేటగిరీలు, రీసెంట్ పోస్టులు, ఆర్కైవ్స్).</li>
        <li>కథనం మధ్యలో వచ్చే "మీకు తెలుసా? (Did you know?)" లాంటి ఆసక్తికరమైన సమాచార పెట్టెలు.</li>
        <li>రచయిత బయో బాక్స్ (Author Bio Card) లేదా కొటేషన్ బాక్సులు (Pull Quotes).</li>
        <li>సంబంధిత ప్రకటనలు (Advertisements / Sponsored links).</li>
      </ul>

      <div class="code-block">
        <div class="code-block-header">
          <span>HTML — సైడ్‌బార్ మరియు గ్లోసరీ కోసం &lt;aside&gt;</span>
          <div class="code-actions">
            <button class="try-btn">▶ Run in Online HTML Editor</button>
          </div>
        </div>
        <pre><code class="language-html">&lt;div style="display: flex; gap: 20px;"&gt;
  &lt;!-- ప్రధాన కంటెంట్ --&gt;
  &lt;article style="flex: 3; background: #ffffff; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;"&gt;
    &lt;h1&gt;వెబ్ డెవలప్‌మెంట్ రోడ్‌మ్యాప్ 2026&lt;/h1&gt;
    &lt;p&gt;మొదట HTML5 మరియు CSS3 లో ప్రావీణ్యం సంపాదించాలి. ఆ తర్వాత జావాస్క్రిప్ట్ నేర్చుకోవాలి...&lt;/p&gt;
  &lt;/article&gt;

  &lt;!-- సైడ్‌బార్ అనుబంధ సమాచారం --&gt;
  &lt;aside style="flex: 1; background: #f8fafc; padding: 16px; border: 1px solid #cbd5e1; border-radius: 8px;"&gt;
    &lt;h3 style="color: #0f172a; margin-top: 0;"&gt;📌 సంబంధిత కోర్సులు&lt;/h3&gt;
    &lt;ul style="padding-left: 18px; line-height: 1.8;"&gt;
      &lt;li&gt;&lt;a href="#"&gt;CSS Flexbox గైడ్&lt;/a&gt;&lt;/li&gt;
      &lt;li&gt;&lt;a href="#"&gt;JavaScript ES6+&lt;/a&gt;&lt;/li&gt;
      &lt;li&gt;&lt;a href="#"&gt;Git &amp; GitHub ల్యాబ్&lt;/a&gt;&lt;/li&gt;
    &lt;/ul&gt;
  &lt;/aside&gt;
&lt;/div&gt;</code></pre>
      </div>
    </div>

    <!-- SECTION 6 -->
    <div class="section-title"><span class="num">6</span>&lt;figure&gt; మరియు &lt;figcaption&gt;: స్వతంత్ర చిత్రాలు &amp; క్యాప్షన్లు</div>
    <div class="section-body">
      <p>గతంలో ఒక ఫోటో కింద క్యాప్షన్ రాయడానికి <code>&lt;img&gt;</code> కింద <code>&lt;p class="caption"&gt;</code> రాసేవారు. కానీ బ్రౌజర్‌కు లేదా స్క్రీన్ రీడర్‌కు ఆ పేరా ఆ ఫోటో గురించిన వివరణ అని అర్థమయ్యేది కాదు.</p>

      <p>దీన్ని పరిష్కరించడానికి HTML5 లో <strong><code>&lt;figure&gt;</code></strong> మరియు <strong><code>&lt;figcaption&gt;</code></strong> ట్యాగ్‌లు వచ్చాయి:</p>
      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.7;">
        <li><code>&lt;figure&gt;</code>: చిత్రం, చార్ట్, డయాగ్రమ్ లేదా కోడ్ స్నిప్పెట్‌ను కలిగి ఉండే స్వయంప్రతిపత్తి కంటైనర్.</li>
        <li><code>&lt;figcaption&gt;</code>: ఆ చిత్రానికి లేదా కోడ్‌కు అధికారిక శీర్షిక/వివరణ (Caption). దీనిని figure లోపల మొట్టమొదటి లేదా చిట్టచివరి చైల్డ్‌గా మాత్రమే ఉంచాలి!</li>
      </ul>

      <div class="code-block">
        <div class="code-block-header">
          <span>HTML — చిత్రం మరియు క్యాప్షన్‌తో &lt;figure&gt;</span>
          <div class="code-actions">
            <button class="try-btn">▶ Run in Online HTML Editor</button>
          </div>
        </div>
        <pre><code class="language-html">&lt;figure style="margin: 20px 0; padding: 12px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; text-align: center;"&gt;
  &lt;img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600" 
       alt="కోడింగ్ చేస్తున్న డెవలపర్ ల్యాప్‌టాప్" 
       style="max-width: 100%; height: auto; border-radius: 6px;"&gt;
  &lt;figcaption style="margin-top: 8px; font-size: 13.5px; color: #64748b; font-style: italic;"&gt;
    చిత్రం 1.1: ఆధునిక వెబ్ అప్లికేషన్ డెవలప్‌మెంట్‌లో ఉపయోగించే వర్క్‌స్టేషన్ అమరిక (ఫోటో: అన్‌స్ప్లాష్).
  &lt;/figcaption&gt;
&lt;/figure&gt;</code></pre>
      </div>

      <div class="callout callout-tip" style="margin-top:16px;">
        <span class="callout-icon">💡</span>
        <div>
          <strong>సూపర్ ట్రిక్:</strong> <code>&lt;figure&gt;</code> ని కేవలం ఫోటోల కోసమే కాకుండా, <strong>కోడ్ స్నిప్పెట్లకు క్యాప్షన్ ఇవ్వడానికి</strong> కూడా ఉపయోగించవచ్చు! ఉదాహరణకు: <code>&lt;figure&gt;&lt;figcaption&gt;జావా కోడ్ 2.1&lt;/figcaption&gt;&lt;pre&gt;&lt;code&gt;...&lt;/code&gt;&lt;/pre&gt;&lt;/figure&gt;</code>.
        </div>
      </div>
    </div>

    <!-- SECTION 7 -->
    <div class="section-title"><span class="num">7</span>&lt;address&gt; ఎలిమెంట్: రచయిత లేదా సంస్థ సంప్రదింపు సమాచారం</div>
    <div class="section-body">
      <p><code>&lt;address&gt;</code> ఎలిమెంట్ అనేది ఒక డాక్యుమెంట్ లేదా ఆర్టికల్ యొక్క రచయిత లేదా యజమాని యొక్క <strong>సంప్రదింపు సమాచారాన్ని (Contact Information)</strong> అందించడానికి ఉపయోగించే ఒక ప్రత్యేకమైన సెమాంటిక్ ట్యాగ్.</p>

      <p><strong>&lt;address&gt; లో ఏమి ఉంచవచ్చు?</strong></p>
      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.7;">
        <li>రచయిత లేదా కంపెనీ ఈమెయిల్ లింక్ (<code>&lt;a href="mailto:..."&gt;</code>).</li>
        <li>ఫోన్ నంబర్ లింక్ (<code>&lt;a href="tel:..."&gt;</code>).</li>
        <li>కార్పొరేట్ హెడ్‌ఆఫీస్ భౌతిక చిరునామా.</li>
        <li>రచయిత సోషల్ మీడియా ప్రొఫైల్ లింకులు లేదా వెబ్‌సైట్ URL.</li>
      </ul>

      <div class="callout callout-warning" style="margin-top:16px;">
        <span class="callout-icon">⚠️</span>
        <div>
          <strong>బిగినర్స్ చేసే పొరపాటు:</strong> వెబ్‌సైట్‌లో ఏదైనా ఒక వీధి చిరునామా లేదా హోటల్ చిరునామా కనిపించగానే <code>&lt;address&gt;</code> వాడకూడదు! కేవలం ఆ <strong>డాక్యుమెంట్ యొక్క రచయిత లేదా సంస్థ సంప్రదింపుల కోసం మాత్రమే</strong> <code>&lt;address&gt;</code> వాడాలి. సాధారణ చిరునామాలకు కేవలం <code>&lt;p&gt;</code> వాడాలి.
        </div>
      </div>

      <div class="code-block" style="margin-top:16px;">
        <div class="code-block-header">
          <span>HTML — &lt;address&gt; సెమాంటిక్ ఉపయోగం</span>
          <div class="code-actions">
            <button class="try-btn">▶ Run in Online HTML Editor</button>
          </div>
        </div>
        <pre><code class="language-html">&lt;footer&gt;
  &lt;address style="font-style: normal; line-height: 1.6; color: var(--text2);"&gt;
    రచయిత: &lt;a href="mailto:editor@ourcompiler.com" style="color: #10b981; font-weight: bold;"&gt;బాలాజీ నాయక్&lt;/a&gt;&lt;br&gt;
    కార్యాలయం: హైటెక్ సిటీ, మాదాపూర్, హైదరాబాద్, తెలంగాణ 500081&lt;br&gt;
    ఫోన్: &lt;a href="tel:+919876543210" style="color: var(--text);"&gt;+91 98765 43210&lt;/a&gt;
  &lt;/address&gt;
&lt;/footer&gt;</code></pre>
      </div>
    </div>

    <!-- SECTION 8 -->
    <div class="section-title"><span class="num">8</span>పూర్తి వెబ్‌పేజ్ ఆర్కిటెక్చర్ లైవ్ డయాగ్రమ్ (Comprehensive Layout)</div>
    <div class="section-body">
      <p>మనం ఇప్పటివరకు నేర్చుకున్న <code>header</code>, <code>nav</code>, <code>main</code>, <code>article</code>, <code>section</code>, <code>aside</code>, <code>figure</code>, మరియు <code>footer</code> లు అన్నీ కలిసి ఒక నిజమైన పేజీలో ఎలా అమరుతాయో చూడండి:</p>

      <div class="diagram-box">
  ┌─────────────────────────────────────────────────────────────────────────────┐
  │                            &lt;header&gt; + &lt;nav&gt;                                 │
  └─────────────────────────────────────────────────────────────────────────────┘
  │                                                                             │
  │   ┌──────────────────────────────────────────────────┐  ┌───────────────┐   │
  │   │          &lt;main&gt; (ప్రధాన కంటెంట్ ప్రాంతం)          │  │    &lt;aside&gt;    │   │
  │   │                                                  │  │  (సైడ్‌బార్   │   │
  │   │  ┌────────────────────────────────────────────┐  │  │   సంబంధిత     │   │
  │   │  │               &lt;article&gt;                    │  │  │    లింకులు    │   │
  │   │  │   &lt;h1&gt;బ్లాగ్ పోస్ట్ శీర్షిక&lt;/h1&gt;           │  │  │     మరియు     │   │
  │   │  │                                            │  │  │   ప్రకటనలు)   │   │
  │   │  │   ┌─────────────────────────────────────┐  │  │  │               │   │
  │   │  │   │ &lt;section&gt; అధ్యాయం 1 &lt;/section&gt;      │  │  │  │               │   │
  │   │  │   └─────────────────────────────────────┘  │  │  │               │   │
  │   │  │                                            │  │  │               │   │
  │   │  │   ┌─────────────────────────────────────┐  │  │  │               │   │
  │   │  │   │ &lt;figure&gt; + &lt;figcaption&gt; (చిత్రం)   │  │  │  │               │   │
  │   │  │   └─────────────────────────────────────┘  │  │  │               │   │
  │   │  │                                            │  │  │               │   │
  │   │  │   ┌─────────────────────────────────────┐  │  │  │               │   │
  │   │  │   │ &lt;section&gt; అధ్యాయం 2 &lt;/section&gt;      │  │  │  │               │   │
  │   │  │   └─────────────────────────────────────┘  │  │  │               │   │
  │   │  └────────────────────────────────────────────┘  │  │               │   │
  │   └──────────────────────────────────────────────────┘  └───────────────┘   │
  │                                                                             │
  ┌─────────────────────────────────────────────────────────────────────────────┐
  │                    &lt;footer&gt; + &lt;address&gt; (పాదపీఠం)                           │
  └─────────────────────────────────────────────────────────────────────────────┘
      </div>
    </div>

    <!-- SECTION 9 -->
    <div class="section-title"><span class="num">9</span>సిండికేషన్ &amp; రీడర్ మోడ్ మ్యాజిక్ (Reader View)</div>
    <div class="section-body">
      <p>Apple Safari, Google Chrome, Mozilla Firefox లేదా Pocket లాంటి యాప్స్‌లో మీరు ఎప్పుడైనా <strong>"రీడర్ మోడ్" (Reader View / Clean Mode)</strong> బటన్ నొక్కారా? పేజీలోని బ్యానర్లు, అనవసరపు ప్రకటనలు, మెనూలు అన్నీ మాయమైపోయి కేవలం స్వచ్ఛమైన అక్షరాలు మరియు చిత్రాలు మాత్రమే పుస్తకంలా ప్రత్యక్షమవుతాయి!</p>

      <p><strong>ఈ మ్యాజిక్ ఎలా జరుగుతుంది?</strong></p>
      <p>బ్రౌజర్లు మీ HTML కోడ్‌లో <code>&lt;article&gt;</code> ఎలిమెంట్‌ను వెతుకుతాయి. ఒకవేళ మీరు సరైన సెమాంటిక్ ఆర్టికల్ ట్యాగ్‌ను వాడి ఉంటే, రీడర్ ఇంజిన్ వెంటనే మీ ఆర్టికల్ హెడ్డింగ్, పేరాగ్రాఫ్‌లు మరియు ఫిగర్లను వేరు చేసి యూజర్‌కు అద్భుతమైన రీడింగ్ అనుభవాన్ని అందిస్తుంది. దీనివల్ల యూజర్లు మీ కంటెంట్‌ను ఎక్కువసేపు చదువుతారు (Higher User Retention)!</p>
    </div>

    <!-- SECTION 10 -->
    <div class="section-title"><span class="num">10</span>Accessibility (a11y) &amp; SEO ప్రయోజనాలు</div>
    <div class="section-body">
      <p>సెమాంటిక్ కంటెంట్ స్ట్రక్చరింగ్ వల్ల సెర్చ్ ఇంజిన్లు మరియు వికలాంగులకు కలిగే లాభాలు అపారమైనవి:</p>

      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.8;">
        <li><strong>గూగుల్ ఆర్టికల్ స్కీమా:</strong> <code>&lt;article&gt;</code> లోపల ఉండే <code>&lt;time datetime="..."&gt;</code> మరియు హెడ్డింగ్స్‌ను బట్టి గూగుల్ మీ పోస్ట్‌ను <em>Google Discover</em> మరియు <em>Top Stories</em> కార్డ్స్‌లో చూపించడానికి ప్రాధాన్యత ఇస్తుంది.</li>
        <li><strong>స్క్రీన్ రీడర్ కాంప్లిమెంటరీ ల్యాండ్‌మార్క్:</strong> <code>&lt;aside&gt;</code> ని స్క్రీన్ రీడర్స్ "Complementary" సమాచారంగా గుర్తిస్తాయి. అంధుడైన యూజర్ కోరుకుంటే సైడ్‌బార్‌ను సులభంగా స్కిప్ చేయవచ్చు.</li>
        <li><strong>కోడ్ రీడబిలిటీ:</strong> ప్రాజెక్ట్‌లో పనిచేసే ఇతర డెవలపర్‌లకు 100 <code>&lt;div&gt;</code> ల కంటే సెమాంటిక్ ట్యాగ్‌లు ఉన్న కోడ్‌ను మెయింటెయిన్ చేయడం 10 రెట్లు వేగంగా ఉంటుంది.</li>
      </ul>
    </div>

    <!-- SECTION 11 -->
    <div class="section-title"><span class="num">11</span>బిగినర్స్ చేసే టాప్ 5 పొరపాట్లు &amp; పరిష్కారాలు</div>
    <div class="section-body">
      <div style="display:flex; flex-direction:column; gap:16px;">
        <div style="background:var(--bg2); border:1px solid #fecaca; border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px;">
          <strong style="color:#b91c1c;">1. తప్పు: హెడ్డింగ్ (&lt;h2&gt;..&lt;h6&gt;) లేకుండా &lt;section&gt; వాడటం</strong>
          <p style="margin-top:6px; color:var(--text2); font-size:14px;">ఒక సెక్షన్‌కు శీర్షిక లేకపోతే అది సెమాంటిక్ సెక్షన్ కానే కాదు. కేవలం లేఅవుట్ డిజైనింగ్ లేదా బాక్స్ మార్జిన్ల కోసమైతే <code>&lt;div&gt;</code> వాడాలి తప్ప హెడ్డింగ్ లేని <code>&lt;section&gt;</code> రాయకూడదు.</p>
        </div>

        <div style="background:var(--bg2); border:1px solid #fecaca; border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px;">
          <strong style="color:#b91c1c;">2. తప్పు: &lt;div&gt; కి బదులుగా ప్రతీచోటా &lt;section&gt; ని నింపేయడం</strong>
          <p style="margin-top:6px; color:var(--text2); font-size:14px;">కొందరు బిగినర్స్ సెమాంటిక్స్ నేర్చుకున్న ఆనందంలో బటన్ల ర్యాపర్‌కు, ఇమేజ్ కంటైనర్‌కు, ఫ్లెక్స్‌బాక్స్ బాక్సులకు కూడా <code>&lt;section&gt;</code> వాడేస్తారు. స్టైలింగ్ ర్యాపర్ల కొరకు <code>&lt;div&gt;</code> ను నిరభ్యంతరంగా వాడవచ్చు.</p>
        </div>

        <div style="background:var(--bg2); border:1px solid #fecaca; border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px;">
          <strong style="color:#b91c1c;">3. తప్పు: &lt;figcaption&gt; ని &lt;figure&gt; బయట రాయడం</strong>
          <p style="margin-top:6px; color:var(--text2); font-size:14px;"><code>&lt;figcaption&gt;</code> ఎల్లప్పుడూ <code>&lt;figure&gt;</code> లోపల మాత్రమే ఉండాలి. బయట రాస్తే అది పనికిరాని అన్‌వాలిడ్ HTML కోడ్ అవుతుంది.</p>
        </div>

        <div style="background:var(--bg2); border:1px solid #fecaca; border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px;">
          <strong style="color:#b91c1c;">4. తప్పు: వెబ్‌సైట్‌లోని ఏదైనా సాధారణ అడ్రస్‌కు &lt;address&gt; వాడటం</strong>
          <p style="margin-top:6px; color:var(--text2); font-size:14px;">ఒక ట్రావెల్ బ్లాగ్‌లో ప్యారిస్ చిరునామా రాస్తూ <code>&lt;address&gt;</code> వాడకూడదు. కేవలం ఆ వెబ్‌సైట్ రచయిత లేదా సంస్థ సంప్రదింపు సమాచారానికి మాత్రమే <code>&lt;address&gt;</code> వాడాలి.</p>
        </div>

        <div style="background:var(--bg2); border:1px solid #fecaca; border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px;">
          <strong style="color:#b91c1c;">5. తప్పు: &lt;article&gt; కేవలం న్యూస్ సైట్లలో మాత్రమే వాడాలని భావించడం</strong>
          <p style="margin-top:6px; color:var(--text2); font-size:14px;">ఒక ఇ-కామర్స్ సైట్‌లోని ప్రతి ప్రోడక్ట్ కార్డ్, యూజర్ రివ్యూ, లేదా ఫోరమ్ కామెంట్ బాక్స్ కూడా సెమాంటిక్‌గా ఒక <code>&lt;article&gt;</code> గా పరిగణించబడుతుంది!</p>
        </div>
      </div>
    </div>

    <!-- SECTION 12 (INTERACTIVE COLLAPSIBLE QUIZ) -->
    <div class="section-title"><span class="num">12</span>ఇంటరాక్టివ్ సెల్ఫ్-టెస్ట్ క్విజ్ (Interactive Quiz)</div>
    <div class="section-body">
      <p>ఈ అధ్యాయంలో మీరు నేర్చుకున్న విషయాలను స్వయంగా పరీక్షించుకోండి. ప్రతి ప్రశ్నను చదివి సమాధానం ఆలోచించిన తర్వాత "సమాధానం చూడండి" పై క్లిక్ చేయండి:</p>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:700; cursor:pointer; color:#059669;">
          ❓ ప్రశ్న 1: ఒక ఎలిమెంట్ &lt;article&gt; అవునా కాదా అని ఎలా నిర్ధారించుకోవాలి?
        </summary>
        <div style="margin-top:10px; color:var(--text2); font-size:14px; line-height:1.6;">
          <strong>సమాధానం:</strong> ఆ కంటెంట్‌ను ప్రస్తుత వెబ్‌సైట్ నుండి వేరు చేసి వేరే సైట్‌లో గానీ, RSS ఫీడ్‌లో గానీ ప్రచురించినా అది స్వతంత్రంగా పూర్తి అర్థాన్ని ఇవ్వగలిగితే అది నిస్సందేహంగా <code>&lt;article&gt;</code> అవుతుంది.
        </div>
      </details>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:700; cursor:pointer; color:#059669;">
          ❓ ప్రశ్న 2: &lt;section&gt; ఎలిమెంట్ ఉపయోగించేటప్పుడు పాటించాల్సిన ముఖ్యమైన W3C నియమం ఏమిటి?
        </summary>
        <div style="margin-top:10px; color:var(--text2); font-size:14px; line-height:1.6;">
          <strong>సమాధానం:</strong> ప్రతి <code>&lt;section&gt;</code> లోపల ఖచ్చితంగా ఒక శీర్షిక (Heading - h2, h3, etc.) ఉండాలి. హెడ్డింగ్ లేని విభాగానికి section వాడకూడదు, div మాత్రమే వాడాలి.
        </div>
      </details>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:700; cursor:pointer; color:#059669;">
          ❓ ప్రశ్న 3: సైడ్‌బార్‌లో సంబంధిత లింకులు లేదా ప్రకటనలు ఉంచడానికి ఏ సెమాంటిక్ ట్యాగ్ సరైనది?
        </summary>
        <div style="margin-top:10px; color:var(--text2); font-size:14px; line-height:1.6;">
          <strong>సమాధానం:</strong> <code>&lt;aside&gt;</code>. ఇది ప్రధాన కంటెంట్‌తో పరోక్షంగా సంబంధం ఉన్న సమాచారాన్ని సూచిస్తుంది.
        </div>
      </details>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:700; cursor:pointer; color:#059669;">
          ❓ ప్రశ్న 4: ఫోటో కింద క్యాప్షన్ ఇవ్వడానికి &lt;p&gt; బదులు ఏ ట్యాగ్‌ల కలయికను వాడాలి?
        </summary>
        <div style="margin-top:10px; color:var(--text2); font-size:14px; line-height:1.6;">
          <strong>సమాధానం:</strong> <code>&lt;figure&gt;</code> మరియు <code>&lt;figcaption&gt;</code>. ఇది బ్రౌజర్‌కు మరియు స్క్రీన్ రీడర్‌కు ఆ టెక్స్ట్ ఫోటో యొక్క అధికారిక శీర్షిక అని స్పష్టం చేస్తుంది.
        </div>
      </details>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:700; cursor:pointer; color:#059669;">
          ❓ ప్రశ్న 5: ఒక &lt;article&gt; లోపల బహుళ &lt;section&gt; లు రాయవచ్చా?
        </summary>
        <div style="margin-top:10px; color:var(--text2); font-size:14px; line-height:1.6;">
          <strong>సమాధానం:</strong> అవును! నిరభ్యంతరంగా రాయవచ్చు. ఒక పెద్ద బ్లాగ్ పోస్ట్ లేదా రీసెర్చ్ పేపర్‌లోని విభిన్న ఉప-విభాగాలను (పరిచయం, పద్ధతులు, ఫలితాలు) సెక్షన్లుగా విభజించడం అత్యంత ప్రామాణికమైన పద్ధతి.
        </div>
      </details>
    </div>

    <!-- SECTION 13 (TRY BOX & SUMMARY) -->
    <div class="section-title"><span class="num">13</span>మీరే స్వయంగా Try చేయండి &amp; సారాంశం (Quick Summary)</div>
    <div class="section-body">
      <div class="try-box" style="margin-top:10px;">
        <div class="try-title">🚀 పూర్తి మ్యాగజైన్ లేఅవుట్‌ను మన HTML Editor లో లైవ్‌గా రన్ చేయండి</div>
        <p>పైన వివరించిన <code>article</code>, <code>section</code>, <code>aside</code>, <code>figure</code>, <code>figcaption</code> లతో కూడిన మ్యాగజైన్ కోడ్‌ను మన ఆన్‌లైన్ ఎడిటర్‌లో ఓపెన్ చేసి, విభిన్న సెమాంటిక్ బ్లాక్స్ బ్రౌజర్‌లో ఎలా రెండర్ అవుతున్నాయో లైవ్‌గా పరిశీలించండి!</p>
        <a class="run-btn" href="/online-html-editor.html" target="_blank">
          👉 Our Compiler లో HTML Editor try చేయండి
        </a>
      </div>

      <div style="margin-top:24px;">
        <h4 style="color:#059669; font-size:16px; margin-bottom:10px;">📌 క్విక్ సారాంశం (Key Takeaways):</h4>
        <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.7;">
          <li><strong>&lt;article&gt;:</strong> స్వతంత్రంగా వేరే సైట్‌లో కూడా ప్రచురించగలిగే పరిపూర్ణ కంటెంట్ (బ్లాగ్, న్యూస్, ప్రొడక్ట్ కార్డ్).</li>
          <li><strong>&lt;section&gt;:</strong> ఒక థీమ్‌కు సంబంధించిన ఉప-విభాగం. ఖచ్చితంగా ఒక హెడ్డింగ్ ఉండాలి.</li>
          <li><strong>&lt;aside&gt;:</strong> పక్కన ఉండే అనుబంధ సమాచారం, సైడ్‌బార్స్ మరియు కొటేషన్ బాక్సులు.</li>
          <li><strong>&lt;figure&gt; &amp; &lt;figcaption&gt;:</strong> చిత్రాలు, చార్ట్‌లు, మరియు కోడ్ స్నిప్పెట్లకు స్పష్టమైన క్యాప్షన్లు.</li>
          <li><strong>&lt;address&gt;:</strong> డాక్యుమెంట్ రచయిత లేదా సంస్థ సంప్రదింపు సమాచారానికి మాత్రమే కేటాయించిన ట్యాగ్.</li>
          <li><strong>రీడర్ వ్యూ:</strong> సఫారీ/క్రోమ్ రీడర్ మోడ్ మీ ఆర్టికల్స్‌ను గుర్తించి ప్రకటనలు లేని స్వచ్ఛమైన మ్యాగజైన్ లాగా చూపిస్తుంది.</li>
        </ul>
      </div>

      <div style="margin-top:20px; padding:16px; background:var(--bg2); border-left:4px solid #10b981; border-radius:0 8px 8px 0;">
        <strong>తర్వాతి అధ్యాయంలో (Chapter 11):</strong> మనం Phase 3 లో అత్యంత ఉత్తేజకరమైన అధ్యాయమైన <strong>HTML5 ఆడియో (&lt;audio&gt;), వీడియో (&lt;video&gt;), యూట్యూబ్ ఎంబెడ్స్ (&lt;iframe&gt;) &amp; మల్టీమీడియా కంట్రోలర్స్</strong> గురించి లోతుగా నేర్చుకుందాం!
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

const targetFile = path.join(__dirname, '..', 'public', 'blog-html', '10-html-articles-sections-aside-and-figures.html');
fs.writeFileSync(targetFile, fullPageHtml, 'utf8');
console.log('✅ Successfully generated deep high-value Chapter 10!');
console.log('Target file size:', fullPageHtml.length, 'characters');

