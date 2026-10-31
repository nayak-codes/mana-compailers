const fs = require('fs');
const path = require('path');
const { LESSONS, buildSidebar } = require('./html_curriculum_data.js');

const lesson = LESSONS.find(l => l.num === 17);
const sidebarHtml = buildSidebar(17);

const chapterContentHtml = `
    <!-- BREADCRUMB -->
    <div class="breadcrumb">
      <a href="/">Home</a><span class="sep">›</span>
      <a href="/blog.html">Tutorials</a><span class="sep">›</span>
      <a href="/blog-html.html">HTML5 Masterclass</a><span class="sep">›</span>
      <span class="current">Chapter 17: హెడ్ మెటాడేటా, SEO ఆప్టిమైజేషన్, Open Graph &amp; Twitter Cards</span>
    </div>

    <!-- PAGE TITLE -->
    <h1 class="page-title">HTML5 హెడ్ మెటాడేటా, SEO ఆప్టిమైజేషన్, Open Graph (Social Cards) &amp; Twitter Cards</h1>

    <!-- PAGE META BADGES -->
    <div class="page-meta">
      <span class="badge">🌐 Modern HTML5 (W3C/WHATWG)</span>
      <span class="badge">🟢 Chapter 17 of 20</span>
      <span class="badge">📂 Phase 05: అడ్వాన్స్‌డ్ మెటాడేటా, SEO, Accessibility &amp; Projects</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

    <!-- SUBTOPICS PILL BAR -->
    <div style="background:var(--bg3); border:1px solid var(--border); border-radius:8px; padding:10px 16px; margin-bottom:24px; font-size:13px; color:var(--text2); display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
      <span style="color:#10b981; font-weight:700;">📌 Covered in this chapter:</span>
      <span>గూగుల్ SEO మెటాడేటా · title &amp; description ఆప్టిమైజేషన్ · కానానికల్ ట్యాగ్ (canonical URL) · robots noindex/nofollow · Open Graph (og:image WhatsApp ప్రివ్యూస్) · Twitter Cards · JSON-LD స్కీమా పరిచయం · బిగినర్స్ తప్పులు &amp; క్విజ్</span>
    </div>

    <!-- INTRO ACCENT BOX (Warm Ivory with Green Accent) -->
    <div class="intro-box">
      <p>మీరు అత్యంత రుచికరమైన వంటకాలతో ఒక లగ్జరీ ఫైవ్-స్టార్ రెస్టారెంట్‌ను ప్రారంభించారనుకోండి. కానీ బయట మెయిన్ రోడ్డుపై ఎటువంటి సైన్‌బోర్డు పెట్టలేదు, గూగుల్ మ్యాప్స్‌లో అడ్రస్ చేర్చలేదు, మరియు ఎవరికీ మీ రెస్టారెంట్ ఎక్కడుందో తెలియదు! అప్పుడు మీరు ఎంత అద్భుతమైన వంటకాలు సిద్ధం చేసినా ఒక్క కస్టమర్ కూడా రారు కదా?</p>
      <p>వెబ్‌సైట్ ప్రపంచంలో కూడా సరిగ్గా ఇదే జరుగుతుంది! మీరు ఎంత అందమైన CSS డిజైన్ చేసినా, అద్భుతమైన కంటెంట్ రాసినా — గూగుల్ సెర్చ్ ఇంజిన్‌కు మీ పేజీ గురించి స్పష్టంగా అర్థం కాకపోతే, లేదా యూజర్లు WhatsApp, Telegram, LinkedIn, X (Twitter) లలో మీ లింక్ షేర్ చేసినప్పుడు ఆకర్షణీయమైన ఫోటోతో కూడిన ప్రివ్యూ కార్డ్ రాకపోతే ఎవరూ మీ వెబ్‌సైట్‌ను క్లిక్ చేయరు (Zero Organic Traffic)!</p>
      <p>ఈ సమస్యకు శాశ్వత పరిష్కారమే <strong>హెడ్ మెటాడేటా (Head Metadata), Search Engine Optimization (SEO), Open Graph (OG) ప్రోటోకాల్, Twitter Cards మరియు కానానికల్ ట్యాగ్స్</strong>! ఈ పదిహేడవ అధ్యాయంలో మన కోర్సు యొక్క ఫైనల్ ఫేజ్ అయిన Phase 05 ను ఘనంగా ప్రారంభిస్తూ — మీ వెబ్‌సైట్‌ను గూగుల్ సెర్చ్ ఫలితాల్లో టాప్‌లో నిలబెట్టే మరియు సోషల్ మీడియాలో వైరల్ అయ్యేలా చేసే గోల్డెన్ మెటాడేటా ఆర్కిటెక్చర్‌ను లోతుగా నేర్చుకుందాం!</p>
    </div>

    <!-- SECTION 1 -->
    <div class="section-title"><span class="num">1</span>ఈ Chapter లో మీరు నేర్చుకునే అంశాలు</div>
    <div class="section-body">
      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.7;">
        <li><strong>గూగుల్ సెర్చ్ ఇంజిన్ అంతర్గత రహస్యాలు:</strong> క్రాలింగ్ (Crawling), ఇండెక్సింగ్ (Indexing), మరియు ర్యాంకింగ్ (Ranking) దశలు.</li>
        <li><strong>కీలకమైన SEO మెటా ట్యాగ్స్:</strong> 60 క్యారెక్టర్ల <code>&lt;title&gt;</code> నియమం మరియు 155 క్యారెక్టర్ల <code>description</code> పవర్.</li>
        <li><strong>కానానికల్ URL (&lt;link rel="canonical"&gt;):</strong> డూప్లికేట్ కంటెంట్ పెనాల్టీల నుండి సైట్‌ను కాపాడే రక్షణ కవచం.</li>
        <li><strong>రోబోట్స్ కంట్రోల్ (&lt;meta name="robots"&gt;):</strong> noindex, nofollow లతో రహస్య పేజీలను సెర్చ్ ఇంజిన్ల నుండి దాచడం.</li>
        <li><strong>Open Graph (og:tags) ప్రోటోకాల్:</strong> WhatsApp, Facebook, LinkedIn లలో పెద్ద బ్యానర్‌తో లింక్ ప్రివ్యూస్ రప్పించడం.</li>
        <li><strong>Twitter Cards మెటాడేటా:</strong> summary_large_image తో X (Twitter) లో ఆకర్షణీయమైన కార్డులు నిర్మించడం.</li>
        <li><strong>స్ట్రక్చర్డ్ డేటా (JSON-LD) పరిచయం:</strong> గూగుల్‌లో రిచ్ స్నిప్పెట్స్ (స్టార్ రేటింగ్‌లు, ఆర్టికల్ వివరాలు) చూపించే పద్ధతి.</li>
        <li><strong>ప్రొడక్షన్ SEO బ్లూప్రింట్:</strong> ప్రపంచ స్థాయి వెబ్‌సైట్లలో వాడే సంపూర్ణ &lt;head&gt; టెంప్లేట్.</li>
      </ul>
    </div>

    <!-- SECTION 2 -->
    <div class="section-title"><span class="num">2</span>గూగుల్ సెర్చ్ ఇంజిన్ ఎలా పనిచేస్తుంది? (Crawling &amp; Indexing)</div>
    <div class="section-body">
      <p>గూగుల్ సెర్చ్ ఇంజిన్ ఒక వెబ్‌పేజీని కనుగొని యూజర్లకు ప్రదర్శించడానికి 3 ప్రాథమిక దశలను అనుసరిస్తుంది:</p>

      <div class="diagram-box">
  Google Search ఇంజిన్ ఆర్కిటెక్చర్:
  ┌─────────────────────────────────────────────────────────────────────────────┐
  │  1. CRAWLING (క్రాలింగ్):                                                   │
  │     గూగుల్ బాట్ (Googlebot) మీ వెబ్‌సైట్ లింక్‌లను నిరంతరం స్కాన్ చేస్తుంది.│
  │     ▼                                                                       │
  │  2. INDEXING (ఇండెక్సింగ్):                                                 │
  │     మీ HTML &lt;head&gt; మెటాడేటా, టైటిల్ మరియు కంటెంట్‌ను గూగుల్ లైబ్రరీలో దాస్తుంది.│
  │     ▼                                                                       │
  │  3. RANKING (ర్యాంకింగ్):                                                   │
  │     యూజర్ ఏదైనా సెర్చ్ చేసినప్పుడు సంబంధిత ఉత్తమ పేజీలను క్రమపద్ధతిలో చూపుతుంది.│
  └─────────────────────────────────────────────────────────────────────────────┘
      </div>

      <p style="margin-top:14px;">ఈ ప్రక్రియలో Googlebot మొట్టమొదట చదివేది మీ HTML డాక్యుమెంట్ లోని <strong><code>&lt;head&gt;</code> విభాగం</strong> మాత్రమే! అక్కడ సరైన మెటాడేటా లేకపోతే మీ పేజీ ఇండెక్స్ కావడం చాలా కష్టం.</p>
    </div>

    <!-- SECTION 3 -->
    <div class="section-title"><span class="num">3</span>ప్రధాన SEO మెటా ట్యాగ్స్: title, description &amp; keywords</div>
    <div class="section-body">
      <p>ఒక వెబ్‌పేజీకి ప్రాణాధారమైన 3 ప్రాథమిక మెటాడేటా అంశాలు:</p>

      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.8;">
        <li><strong><code>&lt;title&gt;</code> (పేజీ శీర్షిక):</strong> ఇది గూగుల్ సెర్చ్ ఫలితాలలో నీలిరంగు పెద్ద అక్షరాలతో కనిపించే లింక్. దీని నిడివి ఎల్లప్పుడూ <strong>50 నుండి 60 క్యారెక్టర్ల లోపు</strong> ఉండాలి. 60 దాటితే చివర్లో చుక్కలు (...) వచ్చి టైటిల్ కట్ అయిపోతుంది!</li>
        <li><strong><code>&lt;meta name="description"&gt;</code>:</strong> గూగుల్ టైటిల్ కింద కనిపించే 2 లైన్ల సంక్షిప్త వివరణ (Snippet). దీని నిడివి <strong>150 నుండి 160 క్యారెక్టర్ల లోపు</strong> ఉండాలి. యూజర్ మీ లింక్ పై క్లిక్ చేయాలా వద్దా అని నిర్ణయించేది ఇదే!</li>
        <li><strong><code>&lt;meta name="keywords"&gt;</code>:</strong> పాత రోజుల్లో సెర్చ్ వర్డ్స్ కోసం వాడేవారు. అయితే స్పామర్లు దీనిని దుర్వినియోగం చేయడంతో నేడు గూగుల్ దీనికి ప్రాధాన్యత ఇవ్వడం నిలిపివేసింది; అయినప్పటికీ ఇతర చిన్న సెర్చ్ ఇంజిన్ల కోసం ఉంచవచ్చు.</li>
      </ul>

      <div class="code-block" style="margin-top:16px;">
        <div class="code-block-header">
          <span>HTML — పర్ఫెక్ట్ టైటిల్ &amp; డిస్క్రిప్షన్ కోడ్</span>
        </div>
        <pre><code class="language-html">&lt;!-- 1. స్పష్టమైన బ్రాండింగ్ తో 60 క్యారెక్టర్ల టైటిల్ --&gt;
&lt;title&gt;HTML5 మాస్టర్‌క్లాస్ తెలుగులో (2026) | Our Compiler&lt;/title&gt;

&lt;!-- 2. యూజర్లను ఆకర్షించే 155 క్యారెక్టర్ల మెటా వివరణ --&gt;
&lt;meta name="description" content="వెబ్ డెవలప్‌మెంట్‌ను సులభంగా పూర్తి తెలుగులో లైవ్ ప్రాక్టికల్ కోడింగ్ మరియు రియల్-వరల్డ్ ప్రాజెక్ట్‌లతో నేర్చుకోండి. ఉచిత ఆన్‌లైన్ ఎడిటర్‌తో ప్రాక్టీస్ చేయండి."&gt;

&lt;!-- 3. రచయిత మరియు కాపీరైట్ సమాచారం --&gt;
&lt;meta name="author" content="Our Compiler Technical Editorial Team"&gt;</code></pre>
      </div>
    </div>

    <!-- SECTION 4 -->
    <div class="section-title"><span class="num">4</span>డూప్లికేట్ కంటెంట్ నివారణ: కానానికల్ ట్యాగ్ (rel="canonical")</div>
    <div class="section-body">
      <p>వెబ్‌సైట్ నిర్వహణలో తలెత్తే అత్యంత ప్రమాదకరమైన SEO సమస్య: <strong>ఒకే వెబ్‌పేజీ వేర్వేరు URL లతో ఓపెన్ అవ్వడం (Duplicate Content Problem)!</strong></p>

      <p>ఉదాహరణకు క్రింది 4 URL లూ మీ హోమ్‌పేజీనే చూపిస్తాయి:</p>
      <ul style="margin-left: 20px; color: var(--text2); font-size: 14px; line-height: 1.6;">
        <li><code>http://example.com</code> (Insecure)</li>
        <li><code>https://example.com</code> (Secure non-www)</li>
        <li><code>https://www.example.com</code> (Secure www)</li>
        <li><code>https://www.example.com/?ref=facebook</code> (Tracking parameter)</li>
      </ul>

      <p>గూగుల్ ఈ నాలుగింటినీ 4 వేర్వేరు పేజీలుగా భావించి, మీ కంటెంట్‌ను మీరే కాపీ కొట్టారని భావించి ర్యాంకింగ్స్‌ను తగ్గించేస్తుంది (Google Duplicate Penalty). దీనిని నివారించడానికి <strong>కానానికల్ ట్యాగ్</strong> ను ఉపయోగిస్తాం:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span>HTML — కానానికల్ URL రక్షణ కవచం</span>
        </div>
        <pre><code class="language-html">&lt;!-- గూగుల్ కు మీ అధికారిక ప్రధాన URL ఇదేనని స్పష్టం చేస్తుంది --&gt;
&lt;link rel="canonical" href="https://www.ourcompiler.com/blog-html.html"&gt;</code></pre>
      </div>

      <div class="callout callout-tip" style="margin-top:14px;">
        <span class="callout-icon">💡</span>
        <div>
          యూజర్ ఫేస్‌బుక్ నుండి గానీ, గూగుల్ యాడ్స్ నుండి గానీ ట్రాకింగ్ పారామీటర్లతో (<code>?ref=social</code>) వచ్చినప్పటికీ — గూగుల్ సెర్చ్ క్రెడిట్ మొత్తం మీ ఒరిజినల్ కానానికల్ URL కే చెందుతుంది!
        </div>
      </div>
    </div>

    <!-- SECTION 5 -->
    <div class="section-title"><span class="num">5</span>రోబోట్స్ కంట్రోల్: &lt;meta name="robots"&gt;</div>
    <div class="section-body">
      <p>మీ వెబ్‌సైట్‌లోని అన్ని పేజీలూ గూగుల్ సెర్చ్‌లో కనిపించకూడదు. ఉదాహరణకు: యూజర్ ప్రొఫైల్ పేజీ, అడ్మిన్ డ్యాష్‌బోర్డ్, లేదా పేమెంట్ థాంక్యూ పేజీ లాంటి వ్యక్తిగత పేజీలను సెర్చ్ ఇంజిన్లు ఇండెక్స్ చేయకుండా ఆపడానికి <strong><code>robots</code></strong> మెటా ట్యాగ్ ఉపయోగపడుతుంది:</p>

      <div style="overflow-x:auto; margin: 16px 0;">
        <table class="tbl">
          <thead>
            <tr>
              <th>డైరెక్టివ్ (Directives)</th>
              <th>అర్థం &amp; ప్రవర్తన</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>index, follow</code></td>
              <td><strong>డిఫాల్ట్ పద్ధతి.</strong> పేజీని గూగుల్‌లో ఇండెక్స్ చేయి మరియు పేజీలోని లింకులను అనుసరించు.</td>
            </tr>
            <tr>
              <td><code>noindex, follow</code></td>
              <td>ఈ పేజీని గూగుల్ సెర్చ్ ఫలితాల్లో <strong>చూపించవద్దు</strong>; కానీ పేజీలోని ఇతర లింకులను క్రాల్ చేయి.</td>
            </tr>
            <tr>
              <td><code>noindex, nofollow</code></td>
              <td>ఈ పేజీని ఇండెక్స్ చేయవద్దు మరియు లోపల ఉన్న ఏ లింక్‌నూ క్రాల్ చేయవద్దు (పూర్తిగా సీక్రెట్ పేజీ).</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="code-block">
        <div class="code-block-header">
          <span>HTML — అడ్మిన్ పేజీల కోసం robots noindex</span>
        </div>
        <pre><code class="language-html">&lt;!-- అడ్మిన్ లేదా ప్రైవేట్ పేజీలను గూగుల్ నుండి దాచడానికి --&gt;
&lt;meta name="robots" content="noindex, nofollow"&gt;</code></pre>
      </div>
    </div>

    <!-- SECTION 6 -->
    <div class="section-title"><span class="num">6</span>సోషల్ మీడియా షేరింగ్ మ్యాజిక్: Open Graph (og:tags)</div>
    <div class="section-body">
      <p>మీ వెబ్‌సైట్ లింక్‌ను ఎవరైనా <strong>WhatsApp, Facebook, Telegram, లేదా LinkedIn</strong> లో షేర్ చేసినప్పుడు — ఒక సాధారణ బోరింగ్ బ్లూ లింక్ బదులుగా, పైన ఒక పెద్ద అందమైన బ్యానర్ ఫోటో, కింద బోల్డ్ టైటిల్ మరియు వివరణతో కూడిన ఆకర్షణీయమైన ప్రివ్యూ బాక్స్ వస్తుంది కదా? దీనిని సాధ్యం చేసేదే ఫేస్‌బుక్ కనిపెట్టిన <strong>Open Graph (OG) ప్రోటోకాల్</strong>!</p>

      <div class="diagram-box">
  WhatsApp / Facebook షేరింగ్ ప్రివ్యూ బాక్స్:
  ┌─────────────────────────────────────────────────────────────┐
  │  ┌───────────────────────────────────────────────────────┐  │
  │  │                                                       │  │
  │  │               [og:image బ్యానర్ చిత్రం]               │  │
  │  │                    (1200 x 630 px)                    │  │
  │  │                                                       │  │
  │  └───────────────────────────────────────────────────────┘  │
  │  og:title ──► HTML5 Programming Master Tutorial             │
  │  og:description ──► నేర్చుకోండి సులభంగా తెలుగులో...         │
  │  ourcompiler.com                                            │
  └─────────────────────────────────────────────────────────────┘
      </div>

      <div class="code-block" style="margin-top:16px;">
        <div class="code-block-header">
          <span>HTML — Open Graph మెటా ట్యాగ్స్ పూర్తి కోడ్</span>
        </div>
        <pre><code class="language-html">&lt;!-- Open Graph ప్రాథమిక ట్యాగ్‌లు --&gt;
&lt;meta property="og:type" content="article"&gt;
&lt;meta property="og:site_name" content="Our Compiler"&gt;
&lt;meta property="og:url" content="https://www.ourcompiler.com/blog-html.html"&gt;
&lt;meta property="og:title" content="HTML5 మాస్టర్‌క్లాస్ తెలుగులో (2026 Edition)"&gt;
&lt;meta property="og:description" content="పూర్తి తెలుగులో వెబ్ డెవలప్‌మెంట్ నేర్చుకోండి. లైవ్ కోడింగ్ &amp; ఇంటరాక్టివ్ ల్యాబ్‌లు."&gt;

&lt;!-- అత్యంత ముఖ్యమైన షేరింగ్ ఫోటో (1200x630 pixels) --&gt;
&lt;meta property="og:image" content="https://www.ourcompiler.com/images/html-og-banner.jpg"&gt;
&lt;meta property="og:image:width" content="1200"&gt;
&lt;meta property="og:image:height" content="630"&gt;
&lt;meta property="og:image:alt" content="HTML5 ట్యుటోరియల్ బ్యానర్"&gt;</code></pre>
      </div>

      <div class="callout callout-danger" style="margin-top:14px; background:#fef2f2; border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px;">
        <strong style="color:#b91c1c;">🚨 బిగినర్స్ చేసే ఘోరమైన తప్పు:</strong><br>
        <code>og:image</code> లో ఎప్పుడూ రిలేటివ్ పాత్ (ఉదా: <code>/banner.jpg</code>) ఇవ్వకూడదు! WhatsApp లేదా ఫేస్‌బుక్ బాట్స్ మీ సర్వర్ రూట్ అర్థం చేసుకోలేవు. ఎల్లప్పుడూ <strong><code>https://www.yourdomain.com/banner.jpg</code></strong> అని పూర్తి అబ్సల్యూట్ URL మాత్రమే ఇవ్వాలి. లేకపోతే వాట్సాప్‌లో ఫోటో రాదు!
      </div>
    </div>

    <!-- SECTION 7 -->
    <div class="section-title"><span class="num">7</span>ట్విట్టర్ / ఎక్స్ కార్డ్స్: Twitter Cards మెటాడేటా</div>
    <div class="section-body">
      <p>X (గతంలో Twitter) ప్లాట్‌ఫారమ్‌లో మీ లింక్‌ను ట్వీట్ చేసినప్పుడు ఆకర్షణీయమైన కార్డుగా మార్చడానికి <strong>Twitter Cards</strong> మెటా ట్యాగ్స్ ఉపయోగపడతాయి:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span>HTML — Twitter Cards కోడ్ స్నిప్పెట్</span>
        </div>
        <pre><code class="language-html">&lt;!-- Twitter Card రకం: summary_large_image (పెద్ద ఫోటో కోసం) --&gt;
&lt;meta name="twitter:card" content="summary_large_image"&gt;
&lt;meta name="twitter:site" content="@ourcompiler"&gt;
&lt;meta name="twitter:creator" content="@balajinayak"&gt;
&lt;meta name="twitter:title" content="HTML5 మాస్టర్‌క్లాస్ తెలుగులో"&gt;
&lt;meta name="twitter:description" content="వెబ్ డెవలప్‌మెంట్‌ను సులభంగా పూర్తి తెలుగులో లైవ్ ప్రాక్టికల్ కోడింగ్‌తో నేర్చుకోండి."&gt;
&lt;meta name="twitter:image" content="https://www.ourcompiler.com/images/html-og-banner.jpg"&gt;</code></pre>
      </div>
    </div>

    <!-- SECTION 8 -->
    <div class="section-title"><span class="num">8</span>స్ట్రక్చర్డ్ డేటా పరిచయం: JSON-LD &amp; Schema.org</div>
    <div class="section-body">
      <p>గూగుల్ సెర్చ్‌లో కొన్ని వెబ్‌సైట్లకు క్రింద స్టార్ రేటింగ్‌లు (⭐⭐⭐⭐⭐ 4.9/5), ప్రచురణ తేదీ, రచయిత ప్రొఫైల్ ఫోటో లేదా FAQ డ్రాప్‌డౌన్లు కనిపించడం మీరు చూసే ఉంటారు (Rich Snippets). ఇది సాధారణ టెక్స్ట్ ద్వారా సాధ్యం కాదు; దీనికి <strong>JSON-LD (JavaScript Object Notation for Linked Data)</strong> అనే స్ట్రక్చర్డ్ డేటాను <code>&lt;head&gt;</code> లో చేర్చాలి:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span>HTML &amp; JSON — Schema.org TechArticle స్ట్రక్చర్డ్ డేటా</span>
        </div>
        <pre><code class="language-html">&lt;script type="application/ld+json"&gt;
{
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "headline": "HTML5 హెడ్ మెటాడేటా, SEO & Open Graph గైడ్",
  "description": "గూగుల్ SEO ఆప్టిమైజేషన్ మరియు సోషల్ మీడియా కార్డ్స్ సమగ్ర తెలుగు ట్యుటోరియల్.",
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
  "dateModified": "2026-10-31"
}
&lt;/script&gt;</code></pre>
      </div>
    </div>

    <!-- SECTION 9 -->
    <div class="section-title"><span class="num">9</span>SEO vs Open Graph vs Twitter Cards సమగ్ర పోలిక</div>
    <div class="section-body">
      <p>ఈ మూడు మెటాడేటా వ్యవస్థల మధ్య గల బాధ్యతల విభజనను క్రింది పట్టిక స్పష్టం చేస్తుంది:</p>

      <div style="overflow-x:auto; margin: 16px 0;">
        <table class="tbl">
          <thead>
            <tr>
              <th>ఫీచర్ / అంశం</th>
              <th>స్టాండర్డ్ Google SEO</th>
              <th>Open Graph (OG)</th>
              <th>Twitter Cards</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>ఎవరు ఉపయోగిస్తారు?</strong></td>
              <td>Googlebot, Bing, DuckDuckGo</td>
              <td>Facebook, WhatsApp, LinkedIn, Telegram</td>
              <td>X (Twitter)</td>
            </tr>
            <tr>
              <td><strong>టైటిల్ ట్యాగ్</strong></td>
              <td><code>&lt;title&gt;</code></td>
              <td><code>&lt;meta property="og:title"&gt;</code></td>
              <td><code>&lt;meta name="twitter:title"&gt;</code></td>
            </tr>
            <tr>
              <td><strong>వివరణ ట్యాగ్</strong></td>
              <td><code>&lt;meta name="description"&gt;</code></td>
              <td><code>&lt;meta property="og:description"&gt;</code></td>
              <td><code>&lt;meta name="twitter:description"&gt;</code></td>
            </tr>
            <tr>
              <td><strong>చిత్రం (Image)</strong></td>
              <td>పేజీలోని చిత్రాలను గూగుల్ స్వయంగా తీసుకుంటుంది.</td>
              <td><code>&lt;meta property="og:image"&gt;</code> (1200x630)</td>
              <td><code>&lt;meta name="twitter:image"&gt;</code></td>
            </tr>
            <tr>
              <td><strong>ప్రధాన లక్ష్యం</strong></td>
              <td>సెర్చ్ ర్యాంకింగ్స్ పెంచడం</td>
              <td>సోషల్ మీడియాలో క్లిక్స్ (CTR) పెంచడం</td>
              <td>ట్వీట్లలో ఎంగేజ్‌మెంట్ పెంచడం</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- SECTION 10 -->
    <div class="section-title"><span class="num">10</span>పర్ఫెక్ట్ ప్రొడక్షన్ SEO &amp; సోషల్ &lt;head&gt; బ్లూప్రింట్</div>
    <div class="section-body">
      <p>ప్రపంచ స్థాయి వెబ్‌సైట్లలో సీనియర్ ఆర్కిటెక్ట్‌లు ఉపయోగించే పూర్తి <code>&lt;head&gt;</code> టెంప్లేట్ ఇది. మీ భవిష్యత్ ప్రాజెక్ట్‌లకు దీనిని కాపీ చేసి విలువలను మార్చుకోవచ్చు:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span>HTML — గోల్డెన్ స్టాండర్డ్ ప్రొడక్షన్ &lt;head&gt; ఆర్కిటెక్చర్</span>
          <div class="code-actions">
            <button class="try-btn">▶ Run in Online HTML Editor</button>
          </div>
        </div>
        <pre><code class="language-html">&lt;!DOCTYPE html&gt;
&lt;html lang="te"&gt;
&lt;head&gt;
  &lt;!-- 1. ప్రాథమిక మెటా ట్యాగ్స్ --&gt;
  &lt;meta charset="UTF-8"&gt;
  &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
  &lt;title&gt;HTML5 మాస్టర్‌క్లాస్ తెలుగులో (2026) | Our Compiler&lt;/title&gt;
  &lt;meta name="description" content="పూర్తి తెలుగులో వెబ్ డెవలప్‌మెంట్ నేర్చుకోండి. లైవ్ కోడింగ్ &amp; ఇంటరాక్టివ్ ల్యాబ్‌లు."&gt;
  &lt;meta name="robots" content="index, follow"&gt;
  &lt;link rel="canonical" href="https://www.ourcompiler.com/blog-html.html"&gt;

  &lt;!-- 2. Open Graph (Facebook / WhatsApp) --&gt;
  &lt;meta property="og:type" content="article"&gt;
  &lt;meta property="og:site_name" content="Our Compiler"&gt;
  &lt;meta property="og:url" content="https://www.ourcompiler.com/blog-html.html"&gt;
  &lt;meta property="og:title" content="HTML5 మాస్టర్‌క్లాస్ తెలుగులో (2026 Edition)"&gt;
  &lt;meta property="og:description" content="పూర్తి తెలుగులో వెబ్ డెవలప్‌మెంట్ నేర్చుకోండి. లైవ్ కోడింగ్ &amp; ఇంటరాక్టివ్ ల్యాబ్‌లు."&gt;
  &lt;meta property="og:image" content="https://www.ourcompiler.com/images/html-og-banner.jpg"&gt;
  &lt;meta property="og:image:width" content="1200"&gt;
  &lt;meta property="og:image:height" content="630"&gt;

  &lt;!-- 3. Twitter Cards --&gt;
  &lt;meta name="twitter:card" content="summary_large_image"&gt;
  &lt;meta name="twitter:title" content="HTML5 మాస్టర్‌క్లాస్ తెలుగులో"&gt;
  &lt;meta name="twitter:description" content="పూర్తి తెలుగులో వెబ్ డెవలప్‌మెంట్ నేర్చుకోండి."&gt;
  &lt;meta name="twitter:image" content="https://www.ourcompiler.com/images/html-og-banner.jpg"&gt;

  &lt;!-- 4. ఫెవికాన్స్ --&gt;
  &lt;link rel="icon" type="image/svg+xml" href="/logo.png"&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;h1&gt;మా వెబ్‌సైట్‌కు స్వాగతం!&lt;/h1&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
      </div>
    </div>

    <!-- SECTION 11 -->
    <div class="section-title"><span class="num">11</span>బిగినర్స్ చేసే టాప్ 5 పొరపాట్లు &amp; పరిష్కారాలు</div>
    <div class="section-body">
      <div style="display:flex; flex-direction:column; gap:16px;">
        <div style="background:var(--bg2); border:1px solid #fecaca; border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px;">
          <strong style="color:#b91c1c;">1. తప్పు: og:image కి సాపేక్ష పాత్ (Relative Path) ఇవ్వడం</strong>
          <p style="margin-top:6px; color:var(--text2); font-size:14px;"><code>og:image="/banner.jpg"</code> అని ఇస్తే వాట్సాప్ లేదా లింక్డ్‌ఇన్‌లో ఫోటో అస్సలు రాదు. ఎల్లప్పుడూ <code>https://www.yourdomain.com/banner.jpg</code> అని పూర్తి అబ్సల్యూట్ URL ఇవ్వాలి.</p>
        </div>

        <div style="background:var(--bg2); border:1px solid #fecaca; border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px;">
          <strong style="color:#b91c1c;">2. తప్పు: 60 క్యారెక్టర్ల కంటే పెద్ద టైటిల్ రాయడం</strong>
          <p style="margin-top:6px; color:var(--text2); font-size:14px;">టైటిల్ చాలా పొడవుగా రాస్తే గూగుల్ సెర్చ్‌లో చివర్లో కట్ అయిపోయి (...) కనిపిస్తుంది. ఎల్లప్పుడూ ముఖ్యమైన కీవర్డ్స్‌తో 50 నుండి 60 క్యారెక్టర్ల లోపే ఉండాలి.</p>
        </div>

        <div style="background:var(--bg2); border:1px solid #fecaca; border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px;">
          <strong style="color:#b91c1c;">3. తప్పు: కానానికల్ ట్యాగ్ తప్పుగా ఇవ్వడం లేదా మరచిపోవడం</strong>
          <p style="margin-top:6px; color:var(--text2); font-size:14px;">కానానికల్ URL ఇవ్వకపోతే ట్రాకింగ్ లింకులు (ఉదా: ?utm_source=facebook) గూగుల్‌లో డూప్లికేట్ పేజీలుగా మారి మీ అసలైన పేజీ ర్యాంకింగ్ పడిపోతుంది.</p>
        </div>

        <div style="background:var(--bg2); border:1px solid #fecaca; border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px;">
          <strong style="color:#b91c1c;">4. తప్పు: og:image పరిమాణం 1200x630 కాకుండా చిన్న సైజు పెట్టడం</strong>
          <p style="margin-top:6px; color:var(--text2); font-size:14px;">చిత్రం 200x200 పిక్సెల్స్ కంటే చిన్నగా ఉంటే ఫేస్‌బుక్ లేదా వాట్సాప్ దాన్ని పెద్ద కార్డుగా కాకుండా చిన్న మూల బొమ్మలా మార్చేస్తాయి. హై-క్వాలిటీ ప్రివ్యూ కోసం <strong>1200x630 pixels (1.91:1 ratio)</strong> ఉత్తమం.</p>
        </div>

        <div style="background:var(--bg2); border:1px solid #fecaca; border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px;">
          <strong style="color:#b91c1c;">5. తప్పు: అన్ని పేజీలకూ ఒకే టైటిల్ &amp; డిస్క్రిప్షన్ కాపీ పేస్ట్ చేయడం</strong>
          <p style="margin-top:6px; color:var(--text2); font-size:14px;">వెబ్‌సైట్‌లోని ప్రతి పేజీకీ దాని కంటెంట్‌కు సరిపోయే ప్రత్యేకమైన (Unique) టైటిల్ మరియు డిస్క్రిప్షన్ ఉండాలి. అన్నింటికీ ఒకటే పెడితే గూగుల్ డూప్లికేట్ కింద పరిగణిస్తుంది.</p>
        </div>
      </div>
    </div>

    <!-- SECTION 12 (INTERACTIVE COLLAPSIBLE QUIZ) -->
    <div class="section-title"><span class="num">12</span>ఇంటరాక్టివ్ సెల్ఫ్-టెస్ట్ క్విజ్ (Interactive Quiz)</div>
    <div class="section-body">
      <p>ఈ అధ్యాయంలో మీరు నేర్చుకున్న విషయాలను స్వయంగా పరీక్షించుకోండి. ప్రతి ప్రశ్నను చదివి సమాధానం ఆలోచించిన తర్వాత "సమాధానం చూడండి" పై క్లిక్ చేయండి:</p>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:700; cursor:pointer; color:#059669;">
          ❓ ప్రశ్న 1: గూగుల్ సెర్చ్‌లో పేజీ టైటిల్ కట్ కాకుండా ఉండాలంటే ఎన్ని అక్షరాల లోపు ఉండాలి?
        </summary>
        <div style="margin-top:10px; color:var(--text2); font-size:14px; line-height:1.6;">
          <strong>సమాధానం:</strong> 50 నుండి 60 క్యారెక్టర్ల లోపు (Under 60 characters).
        </div>
      </details>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:700; cursor:pointer; color:#059669;">
          ❓ ప్రశ్న 2: డూప్లికేట్ కంటెంట్ పెనాల్టీల నుండి సైట్‌ను రక్షించడానికి ఏ ట్యాగ్ వాడాలి?
        </summary>
        <div style="margin-top:10px; color:var(--text2); font-size:14px; line-height:1.6;">
          <strong>సమాధానం:</strong> కానానికల్ ట్యాగ్: <code>&lt;link rel="canonical" href="అధికారిక_URL"&gt;</code>.
        </div>
      </details>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:700; cursor:pointer; color:#059669;">
          ❓ ప్రశ్న 3: WhatsApp లేదా Facebook లో షేర్ చేసినప్పుడు బ్యానర్ ఫోటో రావడానికి ఏ మెటా ట్యాగ్ తప్పనిసరి?
        </summary>
        <div style="margin-top:10px; color:var(--text2); font-size:14px; line-height:1.6;">
          <strong>సమాధానం:</strong> <code>&lt;meta property="og:image" content="https://.../photo.jpg"&gt;</code> (తప్పనిసరిగా పూర్తి HTTPS అబ్సల్యూట్ URL అయి ఉండాలి).
        </div>
      </details>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:700; cursor:pointer; color:#059669;">
          ❓ ప్రశ్న 4: ఒక రహస్య అడ్మిన్ పేజీ గూగుల్ సెర్చ్‌లో కనిపించకుండా ఆపడానికి ఏ మెటా ట్యాగ్ రాయాలి?
        </summary>
        <div style="margin-top:10px; color:var(--text2); font-size:14px; line-height:1.6;">
          <strong>సమాధానం:</strong> <code>&lt;meta name="robots" content="noindex, nofollow"&gt;</code>.
        </div>
      </details>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:700; cursor:pointer; color:#059669;">
          ❓ ప్రశ్న 5: గూగుల్‌లో స్టార్ రేటింగ్‌లు, ఈవెంట్ వివరాల లాంటి రిచ్ స్నిప్పెట్స్ కోసం ఏ ఫార్మాట్ వాడతారు?
        </summary>
        <div style="margin-top:10px; color:var(--text2); font-size:14px; line-height:1.6;">
          <strong>సమాధానం:</strong> <code>JSON-LD</code> (Schema.org స్ట్రక్చర్డ్ డేటా).
        </div>
      </details>
    </div>

    <!-- SECTION 13 (TRY BOX & SUMMARY) -->
    <div class="section-title"><span class="num">13</span>మీరే స్వయంగా Try చేయండి &amp; సారాంశం (Quick Summary)</div>
    <div class="section-body">
      <div class="try-box" style="margin-top:10px;">
        <div class="try-title">🚀 పూర్తి ప్రొడక్షన్ SEO &amp; సోషల్ మెటాడేటాను మన ఎడిటర్‌లో పరీక్షించండి</div>
        <p>పైన వివరించిన <code>title</code>, <code>description</code>, <code>canonical</code>, <code>og:image</code>, మరియు <code>twitter:card</code> కోడ్‌ను మన ఆన్‌లైన్ ఎడిటర్‌లో ఓపెన్ చేసి మీ స్వంత వెబ్‌సైట్ వివరాలతో అనుకూలీకరించుకోండి!</p>
        <a class="run-btn" href="/online-html-editor.html" target="_blank">
          👉 Our Compiler లో HTML Editor try చేయండి
        </a>
      </div>

      <div style="margin-top:24px;">
        <h4 style="color:#059669; font-size:16px; margin-bottom:10px;">📌 క్విక్ సారాంశం (Key Takeaways):</h4>
        <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.7;">
          <li><strong>SEO టైటిల్:</strong> 50-60 అక్షరాల లోపు స్పష్టమైన కీవర్డ్స్‌తో ఉండాలి.</li>
          <li><strong>డిస్క్రిప్షన్:</strong> 150-160 అక్షరాలలో యూజర్లను ఆకర్షించేలా ఉండాలి.</li>
          <li><strong>కానానికల్:</strong> డూప్లికేట్ URL ల సమస్యను శాశ్వతంగా పరిష్కరిస్తుంది.</li>
          <li><strong>Open Graph:</strong> WhatsApp, Facebook, LinkedIn లలో ఆకర్షణీయమైన షేరింగ్ కార్డులను తెస్తుంది.</li>
          <li><strong>og:image:</strong> తప్పనిసరిగా 1200x630 సైజులో మరియు పూర్తి HTTPS అబ్సల్యూట్ URL అయి ఉండాలి.</li>
        </ul>
      </div>

      <div style="margin-top:20px; padding:16px; background:var(--bg2); border-left:4px solid #10b981; border-radius:0 8px 8px 0;">
        <strong>తర్వాతి అధ్యాయంలో (Chapter 18):</strong> మనం వెబ్ డెవలప్‌మెంట్‌లో అత్యంత పవిత్రమైన మరియు నైతికమైన బాధ్యత అయిన <strong>వెబ్ యాక్సెసిబిలిటీ (Web Accessibility - a11y), WAI-ARIA రోల్స్, స్క్రీన్ రీడర్స్ &amp; కీబోర్డ్ ఫోకస్ మేనేజ్‌మెంట్</strong> గురించి లోతుగా నేర్చుకుందాం!
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
    "dateModified": "2026-10-31"
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

const targetFile = path.join(__dirname, '..', 'public', 'blog-html', '17-html-head-metadata-seo-and-open-graph.html');
fs.writeFileSync(targetFile, fullPageHtml, 'utf8');
console.log('✅ Successfully generated deep high-value Chapter 17!');
console.log('Target file size:', fullPageHtml.length, 'characters');
