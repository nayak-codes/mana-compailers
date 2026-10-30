const fs = require('fs');
const path = require('path');
const { LESSONS, buildSidebar } = require('./html_curriculum_data.js');

const lesson = LESSONS.find(l => l.num === 2);
const sidebarHtml = buildSidebar(2);

const chapterContentHtml = `
    <!-- BREADCRUMB -->
    <div class="breadcrumb">
      <a href="/">Home</a><span class="sep">›</span>
      <a href="/blog.html">Tutorials</a><span class="sep">›</span>
      <a href="/blog-html.html">HTML5 Masterclass</a><span class="sep">›</span>
      <span class="current">Chapter 2: HTML5 డాక్యుమెంట్ స్ట్రక్చర్, DOCTYPE, head, UTF-8 & Viewport</span>
    </div>

    <!-- PAGE TITLE -->
    <h1 class="page-title">HTML5 డాక్యుమెంట్ స్ట్రక్చర్, DOCTYPE, head, UTF-8 & Viewport</h1>

    <!-- PAGE META BADGES -->
    <div class="page-meta">
      <span class="badge">🌐 Modern HTML5 (W3C/WHATWG)</span>
      <span class="badge">🟢 Chapter 2 of 20</span>
      <span class="badge">📂 Phase 01: HTML5 పునాదులు & ఆర్కిటెక్చర్</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

    <!-- SUBTOPICS PILL BAR -->
    <div style="background:var(--bg3); border:1px solid var(--border); border-radius:8px; padding:10px 16px; margin-bottom:24px; font-size:13px; color:var(--text2); display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
      <span style="color:#10b981; font-weight:700;">📌 Covered in this chapter:</span>
      <span>HTML5 Boilerplate అనాటమీ · DOCTYPE html & Standards vs Quirks Mode · head ట్యాగ్ పాత్ర (Metadata Brain) · meta charset UTF-8 & తెలుగు ఫాంట్ సపోర్ట్ · mobile viewport meta tag (width, initial-scale) · title, favicon & canonical లింక్స్ · Open Graph ప్రివ్యూ పరిచయం · లైవ్ ఎడిటర్ కోడింగ్ · బిగినర్స్ తప్పులు & క్విజ్</span>
    </div>

    <!-- INTRO ACCENT BOX (Warm Ivory with Green Accent) -->
    <div class="intro-box">
      <p>మీరు ఎప్పుడైనా VS Code లాంటి ఆధునిక కోడ్ ఎడిటర్‌లో ఒక ఖాళీ HTML ఫైల్ తెరిచి <code>!</code> (ఆశ్చర్యార్థకం) టైప్ చేసి Enter కొట్టారా? వెంటనే కేవలం ఒక్క సెకనులో 10-12 లైన్ల కోడ్ మ్యాజిక్‌లా స్క్రీన్ మీద ప్రత్యక్షమవుతుంది! దీనిని వెబ్ డెవలప్‌మెంట్ ప్రపంచంలో <strong>"HTML5 Boilerplate"</strong> లేదా డాక్యుమెంట్ అస్థిపంజరం అంటారు.</p>
      <p>కానీ చాలామంది విద్యార్థులు ఆ కోడ్‌ను గుడ్డిగా కాపీ-పేస్ట్ చేస్తారు తప్ప, అందులోని ప్రతి ఒక్క లైన్ వెనుక దాగి ఉన్న సాంకేతిక రహస్యాలను అర్థం చేసుకోరు. ఒకవేళ మీరు ఆ కోడ్‌లోని <code>meta charset="UTF-8"</code> ని తీసివేస్తే, మీ వెబ్‌సైట్‌లోని తెలుగు అక్షరాలు అర్థం పర్థం లేని విచిత్ర గుర్తులుగా (Mojibake) మారిపోతాయి! అలాగే <code>meta name="viewport"</code> ని తొలగిస్తే, స్మార్ట్‌ఫోన్లలో మీ వెబ్‌సైట్ మైక్రోస్కోపిక్ సైజులో విరిగిపోతుంది!</p>
      <p>ఈ రెండవ అధ్యాయంలో మనం ఒక ప్రొఫెషనల్ HTML5 డాక్యుమెంట్ శరీర నిర్మాణాన్ని (Anatomy), బ్రౌజర్‌కు దిశానిర్దేశం చేసే <code>&lt;head&gt;</code> మెటాడేటా శక్తులను, మరియు మొబైల్ ఫోన్లలో వెబ్‌సైట్ అద్భుతంగా పని చేయడానికి అవసరమైన Viewport నియమాలను పూర్తి తెలుగులో, ప్రాక్టికల్ ఉదాహరణలతో నేర్చుకుందాం!</p>
    </div>

    <!-- SECTION 1 -->
    <div class="section-title"><span class="num">1</span>ఈ Chapter లో మీరు నేర్చుకునే అంశాలు</div>
    <div class="section-body">
      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.7;">
        <li><strong>HTML5 డాక్యుమెంట్ అనాటమీ:</strong> ఒక ప్రామాణిక వెబ్ పేజీ యొక్క 4 మూల స్తంభాలు (DOCTYPE, html, head, body).</li>
        <li><strong>DOCTYPE రహస్యం:</strong> Standards Mode vs Quirks Mode మధ్య తేడా ఏమిటి? బ్రౌజర్ ఎందుకు క్రాష్ కాకుండా రక్షిస్తుంది?</li>
        <li><strong>రూట్ ఎలిమెంట్ & lang ఆట్రిబ్యూట్:</strong> <code>&lt;html lang="te"&gt;</code> స్క్రీన్ రీడర్స్ మరియు SEO కి ఎందుకు ప్రాణవాయువు లాంటిదో తెలుసుకోవడం.</li>
        <li><strong>&lt;head&gt; విభాగం (The Invisible Brain):</strong> కంటికి కనిపించకుండా వెబ్‌సైట్‌ను నడిపించే మెటాడేటా శక్తులు.</li>
        <li><strong>UTF-8 క్యారెక్టర్ ఎన్‌కోడింగ్:</strong> తెలుగు అక్షరాలు మరియు ఎమోజీలు విరిగిపోకుండా బ్రౌజర్‌లో సరిగ్గా రెండర్ కావడం వెనుక ఉన్న సైన్స్.</li>
        <li><strong>Mobile Viewport Meta Tag:</strong> మొబైల్ స్క్రీన్‌లలో రెస్పాన్సివ్ వెబ్ డిజైన్ ఎలా సాధ్యమవుతుందో లైవ్ విశ్లేషణ.</li>
        <li><strong>Title, Favicon & Social Meta Tags:</strong> బ్రౌజర్ ట్యాబ్‌లు, గూగుల్ సెర్చ్ మరియు వాట్సాప్ లింక్ ప్రివ్యూల కోసం కోడింగ్.</li>
      </ul>
    </div>

    <!-- SECTION 2 -->
    <div class="section-title"><span class="num">2</span>HTML5 డాక్యుమెంట్ శరీర నిర్మాణం (Anatomy of HTML Skeleton)</div>
    <div class="section-body">
      <p>ఒక వెబ్ పేజీ నిర్మాణాన్ని మానవ శరీరంతో పోల్చవచ్చు. ప్రతి డాక్యుమెంట్‌లో ఖచ్చితమైన క్రమానుగత నిర్మాణం (Hierarchy) ఉంటుంది:</p>

      <div class="diagram-box">
  ┌────────────────────────────────────────────────────────────────────────┐
  │  &lt;!DOCTYPE html&gt;  ──► [1. Identity Proof: Tells browser it's HTML5]    │
  ├────────────────────────────────────────────────────────────────────────┤
  │  &lt;html lang="te"&gt; ──► [2. The Complete Body: Root Element]             │
  │    │                                                                   │
  │    ├── &lt;head&gt;      ──► [3. The Brain / Mind: Invisible Metadata]       │
  │    │     ├── &lt;meta charset="UTF-8"&gt;                                    │
  │    │     ├── &lt;meta name="viewport" content="..."&gt;                      │
  │    │     ├── &lt;title&gt;నా వెబ్‌సైట్&lt;/title&gt;                              │
  │    │     └── &lt;link rel="stylesheet" href="..."&gt;                        │
  │    │                                                                   │
  │    └── &lt;body&gt;      ──► [4. The Physical Body: Visible Content on Screen]│
  │          ├── &lt;header&gt;, &lt;nav&gt;                                           │
  │          ├── &lt;main&gt;, &lt;h1&gt;, &lt;p&gt;, &lt;img&gt;                                   │
  │          └── &lt;footer&gt;                                                  │
  │                                                                        │
  │  &lt;/html&gt;                                                               │
  └────────────────────────────────────────────────────────────────────────┘
      </div>

      <p>ఈ నాలుగింటిలో ఏ ఒక్కటి లోపించినా లేదా క్రమం మారినా డాక్యుమెంట్ స్టాండర్డ్స్ ఉల్లంఘనకు గురవుతుంది. ఇప్పుడు ఒక్కొక్క భాగాన్ని మైక్రోస్కోపిక్ లెవెల్లో పరిశీలిద్దాం.</p>
    </div>

    <!-- SECTION 3 -->
    <div class="section-title"><span class="num">3</span>&lt;!DOCTYPE html&gt; కథ — Standards Mode vs Quirks Mode</div>
    <div class="section-body">
      <p>HTML ఫైల్ లో మొట్టమొదటి లైన్ ఎల్లప్పుడూ <code>&lt;!DOCTYPE html&gt;</code> తోనే ప్రారంభం కావాలి. దీనికంటే ముందు ఎలాంటి స్పేస్ లేదా కామెంట్ కూడా ఉండకూడదు.</p>
      
      <p><strong>పాతకాలపు భయానక DOCTYPE vs ఆధునిక HTML5:</strong></p>
      <p>HTML 4.01 రోజుల్లో DOCTYPE రాయడం ఒక పెద్ద పీడకల. డెవలపర్లు ఇంత పెద్ద లైన్ గుర్తుపెట్టుకోవాల్సి వచ్చేది:</p>
      <div class="code-block">
        <pre><code>&lt;!-- పాత కాలపు HTML 4.01 DOCTYPE (ఎంత సంక్లిష్టంగా ఉందో చూడండి) --&gt;
&lt;!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"&gt;</code></pre>
      </div>
      <p>కానీ ఆధునిక HTML5 లో WHATWG మరియు W3C లు దీనిని కేవలం <strong>15 అక్షరాల</strong> సరళమైన ప్రకటనగా మార్చేశాయి:</p>
      <div class="code-block">
        <pre><code>&lt;!-- ఆధునిక HTML5 DOCTYPE --&gt;
&lt;!DOCTYPE html&gt;</code></pre>
      </div>

      <p><strong>బ్రౌజర్ లోని 2 మోడ్‌లు (Modes):</strong></p>
      <table class="tbl">
        <thead>
          <tr>
            <th>ఫీచర్</th>
            <th>Standards Mode (DOCTYPE ఉన్నప్పుడు)</th>
            <th>Quirks Mode (DOCTYPE లేనప్పుడు)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>రెండరింగ్ పద్ధతి</strong></td>
            <td>W3C / WHATWG ఆధునిక అంతర్జాతీయ ప్రమాణాల ప్రకారం కచ్చితంగా రెండర్ అవుతుంది.</td>
            <td>1998 నాటి Internet Explorer 5 పాతకాలపు బగ్గి పద్ధతుల్లో రెండర్ అవుతుంది.</td>
          </tr>
          <tr>
            <td><strong>CSS Box Model</strong></td>
            <td><code>width + padding + border</code> సరిగ్గా లెక్కిస్తుంది.</td>
            <td>ప్యాడింగ్ మరియు బోర్డర్లను వెడల్పు లోపలికే కలిపేసి లేఅవుట్‌ను చిందరవందర చేస్తుంది.</td>
          </tr>
          <tr>
            <td><strong>ఆధునిక ఫీచర్లు</strong></td>
            <td>CSS Flexbox, Grid, Custom Properties అన్నీ అద్భుతంగా పనిచేస్తాయి.</td>
            <td>అనేక ఆధునిక CSS స్టైల్స్ విరిగిపోతాయి లేదా విచిత్రంగా ప్రవర్తిస్తాయి.</td>
          </tr>
        </tbody>
      </table>

      <div class="callout">
        <div class="callout-title">💡 గోల్డెన్ రూల్:</div>
        <p>ఎప్పుడూ మీ ప్రతి HTML ఫైల్ యొక్క మొట్టమొదటి అక్షరం <code>&lt;!DOCTYPE html&gt;</code> తోనే ప్రారంభం కావాలి. ఇది కేస్-ఇన్‌సెన్సిటివ్ అయినప్పటికీ, క్యాపిటల్ లెటర్స్‌తో <code>&lt;!DOCTYPE html&gt;</code> అని రాయడం ప్రపంచవ్యాప్త బెస్ట్ ప్రాక్టీస్!</p>
      </div>
    </div>

    <!-- SECTION 4 -->
    <div class="section-title"><span class="num">4</span>&lt;html lang="te"&gt; — లాంగ్వేజ్ ఆట్రిబ్యూట్ ఎందుకు తప్పనిసరి?</div>
    <div class="section-body">
      <p><code>&lt;html&gt;</code> అనేది వెబ్‌పేజీలోని సమస్త ఎలిమెంట్స్‌కు తల్లి లాంటి <strong>రూట్ ఎలిమెంట్ (Root Element)</strong>. ఇందులో మనం ఉపయోగించే <code>lang</code> ఆట్రిబ్యూట్ చాలామంది అనుకున్నట్లు సాధారణమైనది కాదు. దీనికి 3 భారీ ప్రయోజనాలు ఉన్నాయి:</p>

      <ol style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.7;">
        <li>
          <strong>Accessibility (దృష్టి లోపం ఉన్నవారి కోసం):</strong> అంధులు కంప్యూటర్ వాడేటప్పుడు JAWS, NVDA లాంటి స్క్రీన్ రీడర్స్ సాఫ్ట్‌వేర్లను ఉపయోగిస్తారు. మీరు <code>lang="te"</code> అని ఇస్తే స్క్రీన్ రీడర్ తెలుగు ఉచ్చారణ (Telugu Phonetics engine) తో చదివి వినిపిస్తుంది. అదే మీరు పొరపాటున <code>lang="en"</code> అని ఉంచితే, తెలుగు మాటలను ఇంగ్లీష్ స్పెల్లింగ్ లాగా నత్తిగా, వికారంగా పలుకుతుంది!
        </li>
        <li>
          <strong>Search Engine Optimization (SEO):</strong> గూగుల్ సెర్చ్ ఇంజన్లకు మీ కంటెంట్ ప్రధానంగా ఏ ప్రాంతీయ భాషా వినియోగదారులకు ఉపయోగపడుతుందో అర్థం కావడానికి ఇది సహాయపడుతుంది.
        </li>
        <li>
          <strong>బ్రౌజర్ ఆటోమేటిక్ ట్రాన్స్‌లేషన్:</strong> గూగుల్ క్రోమ్ బ్రౌజర్ మీ పేజీని గుర్తించి ఇతర భాషల యూజర్లకు "ఈ పేజీని ఇంగ్లీష్‌లోకి అనువదించాలా?" అని అడిగే పాపప్ చూపించడానికి ఇది మూలాధారం.
        </li>
      </ol>
      <p>తెలుగు భాష కోసం <code>lang="te"</code>, ఇంగ్లీష్ కోసం <code>lang="en"</code>, హిందీ కోసం <code>lang="hi"</code> వాడతారు.</p>
    </div>

    <!-- SECTION 5 -->
    <div class="section-title"><span class="num">5</span>&lt;head&gt; విభాగం — వెబ్‌సైట్ యొక్క కంటికి కనిపించని మెదడు (Metadata Brain)</div>
    <div class="section-body">
      <p><code>&lt;head&gt;</code> ట్యాగ్ లోపల రాసే సమాచారం వెబ్‌సైట్ బాడీ స్క్రీన్ మీద కంటికి నేరుగా కనిపించదు. కానీ పేజీ ఎలా పని చేయాలో, బ్రౌజర్ ఎలా ప్రవర్తించాలో నియంత్రించేది ఇదే:</p>

      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:16px; margin:20px 0;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:10px; padding:18px;">
          <div style="font-weight:700; color:#10b981; font-size:16px; margin-bottom:8px;">📌 &lt;title&gt; ట్యాగ్</div>
          <p style="color:var(--text2); font-size:14px; line-height:1.6; margin:0;">
            బ్రౌజర్ పైభాగంలో ట్యాబ్ మీద పేరు, యూజర్లు బుక్‌మార్క్ చేసుకున్నప్పుడు కనిపించే పేరు మరియు Google సెర్చ్ రిజల్ట్స్‌లో బ్లూ కలర్ క్లిక్ లింక్‌గా కనిపించే శీర్షిక ఇదే. ఇది 50-60 అక్షరాల మధ్య ఉండడం ఉత్తమం.
          </p>
        </div>
        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:10px; padding:18px;">
          <div style="font-weight:700; color:#10b981; font-size:16px; margin-bottom:8px;">🖼️ Favicon (ఫెవికాన్)</div>
          <p style="color:var(--text2); font-size:14px; line-height:1.6; margin:0;">
            బ్రౌజర్ ట్యాబ్‌లో టైటిల్ పక్కన కనిపించే చిన్న 16x16 లేదా 32x32 లోగో ఇమేజ్. దీనిని <code>&lt;link rel="icon" type="image/png" href="/logo.png"&gt;</code> ద్వారా జోడిస్తారు.
          </p>
        </div>
        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:10px; padding:18px;">
          <div style="font-weight:700; color:#10b981; font-size:16px; margin-bottom:8px;">🎨 External Stylesheets</div>
          <p style="color:var(--text2); font-size:14px; line-height:1.6; margin:0;">
            పేజీకి అందమైన రంగులు, ఫాంట్లు ఇవ్వడానికి బాహ్య CSS ఫైల్‌ను <code>&lt;link rel="stylesheet" href="style.css"&gt;</code> తో అనుసంధానిస్తాం.
          </p>
        </div>
        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:10px; padding:18px;">
          <div style="font-weight:700; color:#10b981; font-size:16px; margin-bottom:8px;">⚙️ SEO Meta Tags</div>
          <p style="color:var(--text2); font-size:14px; line-height:1.6; margin:0;">
            సెర్చ్ ఇంజన్లకు పేజీ గురించి వివరించే <code>&lt;meta name="description" content="..."&gt;</code> మరియు సోషల్ మీడియా కార్డ్స్ ఇక్కడే ఉంటాయి.
          </p>
        </div>
      </div>
    </div>

    <!-- SECTION 6 -->
    <div class="section-title"><span class="num">6</span>meta charset="UTF-8" — తెలుగు అక్షరాల జీవనాడి (Character Encoding)</div>
    <div class="section-body">
      <p>కంప్యూటర్లకు కేవలం 0 మరియు 1 (బైనరీ నంబర్లు) మాత్రమే అర్థమవుతాయి. మనం టైప్ చేసే "అ", "ఆ", "A", "B" లను కంప్యూటర్ సంఖ్యలుగా మార్చుకోవాలి. దీనినే <strong>Character Encoding</strong> అంటారు.</p>
      
      <p>గతంలో ఉపయోగించిన <strong>ASCII (అమెరికన్ స్టాండర్డ్ కోడ్)</strong> లో కేవలం 128 ఇంగ్లీష్ అక్షరాలు మాత్రమే ఉండేవి. ప్రపంచంలో ఉన్న వేలాది భాషలను, భారతీయ లిపులను చూపించలేకపోయింది. ఈ సమస్యకు పరిష్కారంగా ప్రపంచ నిపుణులు <strong>Unicode (UTF-8)</strong> ను కనిపెట్టారు.</p>

      <div class="callout" style="border-left-color:#ef4444;">
        <div class="callout-title" style="color:#ef4444;">⚠️ Mojibake (మొజిబాకే) అంటే ఏమిటి?</div>
        <p>ఒకవేళ మీరు <code>&lt;meta charset="UTF-8"&gt;</code> రాయడం మర్చిపోతే, పాత బ్రౌజర్లు పేజీని Windows-1252 లేదా ISO-8859 లో ఓపెన్ చేస్తాయి. అప్పుడు మీ వెబ్‌సైట్‌లోని అందమైన తెలుగు మాటలు ఇలా విరిగిపోతాయి:</p>
        <p style="font-family:'JetBrains Mono', monospace; font-size:15px; color:#ef4444; margin-top:8px;">
          అసలు పదం: "నమస్కారం, తెలుగు మిత్రులారా!"<br>
          బ్రౌజర్ చూపించే చెత్త: "à°¨à°®à°¸à±?à°•à°¾à°°à°®, à°¤à±†à°²à±?à°—à±?!"
        </p>
      </div>

      <p>UTF-8 ప్రపంచంలోని ప్రతి భాషను, గణిత గుర్తులను (∑, π), మరియు ఆధునిక ఎమోజీలను (🚀, 🔥, ❤️, 💡) పక్కాగా సపోర్ట్ చేస్తుంది. కాబట్టి <code>&lt;head&gt;</code> లో మొట్టమొదటి మెటా ట్యాగ్‌గా ఎల్లప్పుడూ <code>&lt;meta charset="UTF-8"&gt;</code> ఉండాలి!</p>
    </div>

    <!-- SECTION 7 -->
    <div class="section-title"><span class="num">7</span>Mobile Viewport Meta Tag — రెస్పాన్సివ్ వెబ్ డిజైన్ రహస్యం</div>
    <div class="section-body">
      <p>నేడు ఇంటర్నెట్ ట్రాఫిక్‌లో 70% కంటే ఎక్కువ మంది స్మార్ట్‌ఫోన్ల ద్వారానే వెబ్‌సైట్లను సందర్శిస్తున్నారు. మీ వెబ్‌సైట్ మొబైల్‌లో అందంగా కనిపించడానికి క్రింది లైన్ అత్యంత కీలకమైనది:</p>

      <div class="code-block">
        <pre><code>&lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;</code></pre>
      </div>

      <p>ఈ ట్యాగ్‌లోని ప్రతి భాగాన్ని విడమరిచి అర్థం చేసుకుందాం:</p>
      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.8;">
        <li>
          <code>name="viewport"</code>: వినియోగదారుడు స్క్రీన్ మీద వెబ్‌పేజీని చూసే విండో (కనిపించే ప్రాంతం) ను వ్యూపోర్ట్ అంటారు.
        </li>
        <li>
          <code>width=device-width</code>: పేజీ యొక్క వెడల్పును మొబైల్ స్క్రీన్ యొక్క వాస్తవ వెడల్పుకు (Device Width: 390px, 412px etc.) సరిగ్గా సరిపోయేలా చేయమని బ్రౌజర్‌కి ఆదేశిస్తుంది.
        </li>
        <li>
          <code>initial-scale=1.0</code>: పేజీ మొదటిసారి లోడ్ అయినప్పుడు జూమ్ ఇన్ లేదా జూమ్ అవుట్ కాకుండా 100% అసలు స్కేల్ (1:1 నిష్పత్తి) లో ఓపెన్ చేయమని నిర్దేశిస్తుంది.
        </li>
      </ul>

      <p><strong>ఈ ట్యాగ్ ఉన్నప్పుడు మరియు లేనప్పుడు తేడా:</strong></p>
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:16px; margin:20px 0;">
        <div style="background:#fff1f2; border:1px solid #fecdd3; border-radius:10px; padding:18px; color:#881337;">
          <div style="font-weight:700; font-size:15px; margin-bottom:6px;">❌ Viewport ట్యాగ్ లేకపోతే:</div>
          <p style="font-size:13.5px; line-height:1.6; margin:0;">
            మొబైల్ బ్రౌజర్ ఆ వెబ్‌పేజీని 980 పిక్సెల్ల భారీ డెస్క్‌టాప్ మానిటర్‌లా భావిస్తుంది. మొత్తం పేజీని పిసరంత పరిమాణంలోకి కుదించి చూపిస్తుంది. యూజర్ అక్షరాలు చదవాలంటే రెండు వేళ్లతో పిన్చ్ చేసి జూమ్ చేయాల్సి వస్తుంది.
          </p>
        </div>
        <div style="background:#f0fdf4; border:1px solid #bbf7d0; border-radius:10px; padding:18px; color:#14532d;">
          <div style="font-weight:700; font-size:15px; margin-bottom:6px;">✅ Viewport ట్యాగ్ ఉన్నప్పుడు:</div>
          <p style="font-size:13.5px; line-height:1.6; margin:0;">
            మొబైల్ స్క్రీన్ సైజుకు తగ్గట్టుగా టెక్స్ట్, బటన్లు, ఇమేజెస్ వాటంతట అవే చక్కగా విస్తరిస్తాయి. యూజర్ వేళ్లతో తాకడానికి వీలుగా బటన్లు సరైన పరిమాణంలో అమరిపోతాయి.
          </p>
        </div>
      </div>
    </div>

    <!-- SECTION 8 -->
    <div class="section-title"><span class="num">8</span>సోషల్ మీడియా కార్డ్స్ పరిచయం (Open Graph & Twitter Cards)</div>
    <div class="section-body">
      <p>మీరు ఎప్పుడైనా WhatsApp లేదా LinkedIn లో YouTube లింక్ లేదా న్యూస్ ఆర్టికల్ లింక్ పేస్ట్ చేసినప్పుడు, వెంటనే ఆటోమేటిక్‌గా పెద్ద ఫోటో, టైటిల్ మరియు చిన్న సారాంశం (Rich Card Preview) రావడం గమనించారా? ఆ మాయ వెనుక ఉన్నది <code>&lt;head&gt;</code> లో ఉండే <strong>Open Graph (OG)</strong> మెటా ట్యాగ్స్:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">HTML5 Social Meta</span>
        </div>
        <pre><code>&lt;!-- Facebook, WhatsApp & LinkedIn Open Graph Tags --&gt;
&lt;meta property="og:title" content="HTML5 మాస్టర్‌క్లాస్ తెలుగులో | Our Compiler"&gt;
&lt;meta property="og:description" content="సున్నా నుండి ప్రొఫెషనల్ వెబ్ డెవలపర్ స్థాయికి చేర్చే పూర్తి తెలుగు కోర్సు."&gt;
&lt;meta property="og:image" content="https://www.ourcompiler.com/images/html5-cover.png"&gt;
&lt;meta property="og:url" content="https://www.ourcompiler.com/blog-html.html"&gt;

&lt;!-- Twitter / X Card Tags --&gt;
&lt;meta name="twitter:card" content="summary_large_image"&gt;</code></pre>
      </div>

      <p>మీరు వీటిని అమర్చితే, మీ వెబ్‌సైట్ లింక్‌ను ఎవరు సోషల్ మీడియాలో షేర్ చేసినా ప్రొఫెషనల్ యాప్ లాంటి రిచ్ ప్రివ్యూ కనిపిస్తుంది. దీనివల్ల వెబ్‌సైట్ క్లిక్స్ 3 రెట్లు పెరుగుతాయి!</p>
    </div>

    <!-- SECTION 9 -->
    <div class="section-title"><span class="num">9</span>పరిపూర్ణమైన ప్రొడక్షన్-గ్రేడ్ HTML5 Boilerplate టెంప్లేట్</div>
    <div class="section-body">
      <p>పై అన్ని నియమాలను మేళవించి రూపొందించిన పూర్తి స్థాయి, ప్రొడక్షన్-రెడీ HTML5 డాక్యుమెంట్ టెంప్లేట్ ఇది. ప్రతి కొత్త ప్రాజెక్ట్‌ను మీరు ఈ స్ట్రక్చర్‌తోనే ప్రారంభించాలి:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">HTML5 Standard Boilerplate</span>
          <div class="code-actions">
            <a class="try-btn" href="/online-html-editor.html" target="_blank">▶ Run in Online HTML Editor</a>
          </div>
        </div>
        <pre><code>&lt;!DOCTYPE html&gt;
&lt;html lang="te"&gt;
  &lt;head&gt;
    &lt;!-- 1. Character Encoding --&gt;
    &lt;meta charset="UTF-8" /&gt;

    &lt;!-- 2. Mobile Responsive Viewport --&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0" /&gt;

    &lt;!-- 3. Page Title & Meta Description for SEO --&gt;
    &lt;title&gt;నా మొదటి రెస్పాన్సివ్ వెబ్‌సైట్ | My Awesome Site&lt;/title&gt;
    &lt;meta name="description" content="తెలుగులో ఆధునిక HTML5 మరియు వెబ్ డెవలప్‌మెంట్ నేర్చుకోండి." /&gt;

    &lt;!-- 4. Favicon Icon --&gt;
    &lt;link rel="icon" type="image/png" href="/logo.png" /&gt;

    &lt;!-- 5. External Stylesheet --&gt;
    &lt;link rel="stylesheet" href="style.css" /&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;!-- ఇక్కడ కనిపించే కంటెంట్ స్క్రీన్ మీద రెండర్ అవుతుంది --&gt;
    &lt;header&gt;
      &lt;h1&gt;స్వాగతం! Welcome to My Website&lt;/h1&gt;
      &lt;p&gt;ఈ వెబ్‌పేజీ సంపూర్ణమైన HTML5 స్టాండర్డ్స్‌తో నిర్మించబడింది.&lt;/p&gt;
    &lt;/header&gt;

    &lt;main&gt;
      &lt;article&gt;
        &lt;h2&gt;HTML5 Boilerplate ఎందుకు ముఖ్యం?&lt;/h2&gt;
        &lt;p&gt;ఇది బ్రౌజర్‌కు సరైన భాషను, UTF-8 ఎన్‌కోడింగ్‌ను మరియు మొబైల్ వ్యూపోర్ట్‌ను నిర్దేశిస్తుంది.&lt;/p&gt;
      &lt;/article&gt;
    &lt;/main&gt;

    &lt;footer&gt;
      &lt;p&gt;&amp;copy; 2026 Our Compiler. All rights reserved.&lt;/p&gt;
    &lt;/footer&gt;
  &lt;/body&gt;
&lt;/html&gt;</code></pre>
      </div>

      <p style="margin-top:16px;"><strong>ఈ కోడ్ స్క్రీన్ మీద ఎలా కనిపిస్తుంది? (Visual Preview):</strong></p>
      <div style="background:#ffffff; border:1px solid #cbd5e1; border-radius:10px; padding:24px; margin:16px 0; box-shadow:0 4px 12px rgba(0,0,0,0.05); color:#0f172a;">
        <div style="display:flex; align-items:center; gap:8px; padding-bottom:12px; margin-bottom:16px; border-bottom:1px solid #e2e8f0; font-size:12px; color:#64748b;">
          <span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:#ef4444;"></span>
          <span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:#f59e0b;"></span>
          <span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:#10b981;"></span>
          <span style="margin-left:8px; font-family:'JetBrains Mono', monospace; font-size:11px;">https://www.ourcompiler.com/my-awesome-site</span>
        </div>
        <h1 style="font-size:24px; font-weight:800; color:#0f172a; margin-bottom:8px;">స్వాగతం! Welcome to My Website</h1>
        <p style="font-size:15px; color:#475569; margin-bottom:18px;">ఈ వెబ్‌పేజీ సంపూర్ణమైన HTML5 స్టాండర్డ్స్‌తో నిర్మించబడింది.</p>
        <hr style="border:none; border-top:1px solid #e2e8f0; margin-bottom:18px;" />
        <h2 style="font-size:18px; font-weight:700; color:#059669; margin-bottom:8px;">HTML5 Boilerplate ఎందుకు ముఖ్యం?</h2>
        <p style="font-size:14.5px; color:#334155; line-height:1.7; margin-bottom:18px;">ఇది బ్రౌజర్‌కు సరైన భాషను, UTF-8 ఎన్‌కోడింగ్‌ను మరియు మొబైల్ వ్యూపోర్ట్‌ను నిర్దేశిస్తుంది.</p>
        <div style="font-size:12.5px; color:#94a3b8; border-top:1px solid #f1f5f9; padding-top:12px;">
          &copy; 2026 Our Compiler. All rights reserved.
        </div>
      </div>
    </div>

    <!-- SECTION 10 -->
    <div class="section-title"><span class="num">10</span>Beginners చేసే 5 ప్రధాన తప్పులు (Common Pitfalls)</div>
    <div class="section-body">
      <p>స్ట్రక్చర్ రాసేటప్పుడు బిగినర్స్ తరచుగా ఎదుర్కొనే 5 సాధారణ లోపాలు మరియు వాటి నివారణలు:</p>

      <p style="font-weight:700; color:#ef4444; margin-top:16px;">❌ తప్పు 1: &lt;head&gt; లోపల దృశ్య కంటెంట్ (h1, p, img) రాయడం</p>
      <div class="code-block">
        <pre><code>&lt;!-- తీవ్రమైన తప్పు: head లో h1 పెట్టారు --&gt;
&lt;head&gt;
  &lt;title&gt;నా పేజీ&lt;/title&gt;
  &lt;h1&gt;ఇది నా హెడ్డింగ్&lt;/h1&gt;
&lt;/head&gt;</code></pre>
      </div>
      <p style="color:var(--text2); font-size:14px;"><strong>నియమం:</strong> <code>&lt;head&gt;</code> లో కేవలం మెటాడేటా మాత్రమే ఉండాలి. స్క్రీన్ మీద కనిపించే హెడ్డింగ్స్, ఇమేజెస్ ఎల్లప్పుడూ <code>&lt;body&gt;</code> లోపల మాత్రమే ఉండాలి!</p>

      <p style="font-weight:700; color:#ef4444; margin-top:20px;">❌ తప్పు 2: Viewport Meta Tag మిస్ చేయడం</p>
      <p style="color:var(--text2); font-size:14px;">
        ఈ ట్యాగ్ లేకపోతే మొబైల్ ఫోన్లలో వెబ్‌సైట్ ఫాంట్ సైజు మైక్రోస్కోపిక్ చిన్నదిగా కుంచించుకుపోతుంది. Google Search Console లో "Mobile Usability" ఎర్రర్ వస్తుంది.
      </p>

      <p style="font-weight:700; color:#ef4444; margin-top:20px;">❌ తప్పు 3: ఒకే పేజీలో మల్టిపుల్ &lt;body&gt; లేదా &lt;html&gt; ట్యాగ్‌లు వాడటం</p>
      <p style="color:var(--text2); font-size:14px;">
        ఒక HTML డాక్యుమెంట్‌లో ఖచ్చితంగా <strong>ఒకే ఒక <code>&lt;html&gt;</code></strong>, <strong>ఒకే ఒక <code>&lt;head&gt;</code></strong>, మరియు <strong>ఒకే ఒక <code>&lt;body&gt;</code></strong> ఉండాలి. రెండు శరీరాలు, రెండు తలలు మనుషులకు ఎలా ఉండవో, డాక్యుమెంట్‌కు కూడా అంతే!
      </p>

      <p style="font-weight:700; color:#ef4444; margin-top:20px;">❌ తప్పు 4: &lt;title&gt; ట్యాగ్ రాయకపోవడం</p>
      <p style="color:var(--text2); font-size:14px;">
        టైటిల్ లేకపోతే బ్రౌజర్ ట్యాబ్‌పై ఫైల్ పాత్ (ఉదా: <code>file:///C:/Users/Balaji/index.html</code>) కనిపిస్తుంది. ఇది యూజర్ అనుభవాన్ని మరియు సెర్చ్ ర్యాంకింగ్స్‌ను దెబ్బతీస్తుంది.
      </p>

      <p style="font-weight:700; color:#ef4444; margin-top:20px;">❌ తప్పు 5: UTF-8 స్పెల్లింగ్ లోపం</p>
      <p style="color:var(--text2); font-size:14px;">
        <code>&lt;meta charset="UTF8"&gt;</code> (హైఫన్ లేకుండా) లేదా <code>charset="utf 8"</code> (స్పేస్ తో) రాస్తే కొన్ని బ్రౌజర్లు ఎన్‌కోడింగ్‌ను గుర్తించలేవు. ఎల్లప్పుడూ ఖచ్చితంగా <code>UTF-8</code> అని హైఫన్‌తో రాయాలి.
      </p>
    </div>

    <!-- SECTION 11 -->
    <div class="section-title"><span class="num">11</span>ప్రాక్టీస్ టాస్క్స్ & ఇంటర్వ్యూ క్విజ్ ప్రశ్నలు</div>
    <div class="section-body">
      <p>ఈ క్రింది ప్రశ్నలకు సొంతంగా సమాధానాలు ఆలోచించండి, ఆపై డ్రాప్‌డౌన్ తెరిచి పరిశీలించండి:</p>

      <ol style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.8;">
        <li>Standards Mode మరియు Quirks Mode ల మధ్య గల సాంకేతిక తేడా ఏమిటి? బ్రౌజర్ మోడ్‌ను ఏది నిర్ణయిస్తుంది?</li>
        <li><code>&lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;</code> లోని రెండు ప్రాపర్టీల (width మరియు initial-scale) విధి ఏమిటి?</li>
        <li><code>&lt;html lang="te"&gt;</code> ఎందుకు రాయాలి? స్క్రీన్ రీడర్స్ దృక్కోణంలో దీని ప్రాముఖ్యత ఏమిటి?</li>
        <li>UTF-8 లేకపోతే తెలుగు అక్షరాలు ఎందుకు పాడవుతాయి? ఆ పరిస్థితిని ఏమని పిలుస్తారు?</li>
        <li><code>&lt;head&gt;</code> లో మరియు <code>&lt;body&gt;</code> లో ఉండే కంటెంట్ మధ్య ప్రాథమిక విభజన రేఖ ఏమిటి?</li>
      </ol>

      <details>
        <summary>🔍 సమాధానాలు & లోతైన వివరణ చూడండి (Click to expand)</summary>
        <div style="margin-top:12px; font-size:14.5px; line-height:1.7; color:var(--text2);">
          <p><strong>1. సమాధానం:</strong> <code>&lt;!DOCTYPE html&gt;</code> ఉంటే బ్రౌజర్ Standards Mode లో ఆధునిక W3C నిబంధనలతో రెండర్ చేస్తుంది. అది లేకపోతే Quirks Mode లోకి మారి పాతకాలపు బగ్గి CSS బాక్స్ మోడల్‌ను అమలు చేస్తుంది.</p>
          <p style="margin-top:8px;"><strong>2. సమాధానం:</strong> <code>width=device-width</code> పేజీ వెడల్పును మొబైల్ స్క్రీన్ సైజుకు సరిచేస్తుంది. <code>initial-scale=1.0</code> పేజీ మొదటిసారి లోడ్ అయినప్పుడు 1:1 జూమ్ స్కేల్‌ను నిర్దేశిస్తుంది.</p>
          <p style="margin-top:8px;"><strong>3. సమాధానం:</strong> స్క్రీన్ రీడర్స్ తెలుగు టెక్స్ట్‌ను గుర్తించి సరైన తెలుగు ఫోనెటిక్ ఉచ్చారణతో చదివి వినిపించడానికి <code>lang="te"</code> అత్యవసరం. అలాగే SEO లో గూగుల్‌కు సహాయపడుతుంది.</p>
          <p style="margin-top:8px;"><strong>4. సమాధానం:</strong> ఆంగ్లేతర భాషల అక్షరాలను 128 ASCII అక్షరాలు సూచించలేవు కాబట్టి బైట్లు తప్పుగా డీకోడ్ అయి "Mojibake" (మొజిబాకే) అనే పిచ్చి గుర్తులుగా మారతాయి. UTF-8 సమస్త ప్రపంచ భాషలను సపోర్ట్ చేస్తుంది.</p>
          <p style="margin-top:8px;"><strong>5. సమాధానం:</strong> <code>&lt;head&gt;</code> మెదడు లాంటిది (అదృశ్య మెటాడేటా: టైటిల్, వ్యూపోర్ట్, ఎన్‌కోడింగ్, స్టైల్స్). <code>&lt;body&gt;</code> భౌతిక శరీరం లాంటిది (స్క్రీన్ మీద కంటికి కనిపించే సమస్త హెడ్డింగ్స్, ఇమేజెస్, పేరాగ్రాఫ్‌లు, బటన్లు).</p>
        </div>
      </details>
    </div>

    <!-- SECTION 12 (TRY BOX) -->
    <div class="section-title"><span class="num">12</span>మీరే స్వయంగా Try చేయండి (Live Coding Playground)</div>
    <div class="section-body">
      <div class="try-box" style="margin-top:10px;">
        <div class="try-title">🚀 మీ స్వంత HTML5 Boilerplate ను రన్ చేసి పరీక్షించండి</div>
        <p>పైన మనం నేర్చుకున్న పూర్తి ప్రొడక్షన్-గ్రేడ్ HTML5 టెంప్లేట్‌ను మన ఆన్‌లైన్ ఎడిటర్‌లో ఓపెన్ చేసి, టైటిల్ మరియు హెడ్డింగ్ మార్చి చూడండి. మొబైల్ వ్యూపోర్ట్ రిజల్ట్ ఎలా లైవ్‌గా మారుతుందో గమనించండి!</p>
        <a class="run-btn" href="/online-html-editor.html" target="_blank">
          👉 Our Compiler లో HTML Editor try చేయండి
        </a>
      </div>
    </div>

    <!-- SECTION 13 -->
    <div class="section-title"><span class="num">13</span>సారాంశం (Quick Summary)</div>
    <div class="section-body">
      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.7;">
        <li><strong>&lt;!DOCTYPE html&gt;:</strong> మొదటి లైన్‌లో ఉండాలి; బ్రౌజర్‌ను ఆధునిక Standards Mode లో ఉంచుతుంది.</li>
        <li><strong>&lt;html lang="te"&gt;:</strong> రూట్ ఎలిమెంట్; స్క్రీన్ రీడర్స్ మరియు తెలుగు SEO కి మార్గదర్శకం.</li>
        <li><strong>&lt;head&gt; vs &lt;body&gt;:</strong> Head అదృశ్య మెటాడేటా నిధి, Body కంటికి కనిపించే ప్రత్యక్ష కంటెంట్ నిలయం.</li>
        <li><strong>&lt;meta charset="UTF-8"&gt;:</strong> తెలుగు లిపి మరియు ఎమోజీలు విరిగిపోకుండా కాపాడే అంతర్జాతీయ ఎన్‌కోడింగ్.</li>
        <li><strong>Mobile Viewport:</strong> <code>width=device-width, initial-scale=1.0</code> ద్వారా స్మార్ట్‌ఫోన్లలో పిక్సెల్-పర్ఫెక్ట్ రెస్పాన్సివ్ డిజైన్ సాధ్యమవుతుంది.</li>
        <li><strong>Title & Favicon:</strong> బ్రౌజర్ ట్యాబ్ బ్రాండింగ్ మరియు గూగుల్ సెర్చ్ స్నిప్పెట్లకు అత్యంత ప్రాధాన్యత కలిగినవి.</li>
      </ul>
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

const targetFile = path.join(__dirname, '..', 'public', 'blog-html', '02-html-document-structure-doctype-head-meta.html');
fs.writeFileSync(targetFile, fullPageHtml, 'utf8');
console.log('✅ Successfully generated deep high-value Chapter 2!');
console.log('Target file size:', fullPageHtml.length, 'characters');

