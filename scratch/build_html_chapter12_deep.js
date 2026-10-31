const fs = require('fs');
const path = require('path');
const { LESSONS, buildSidebar } = require('./html_curriculum_data.js');

const lesson = LESSONS.find(l => l.num === 12);
const sidebarHtml = buildSidebar(12);

const chapterContentHtml = `
    <!-- BREADCRUMB -->
    <div class="breadcrumb">
      <a href="/">Home</a><span class="sep">›</span>
      <a href="/blog.html">Tutorials</a><span class="sep">›</span>
      <a href="/blog-html.html">HTML5 Masterclass</a><span class="sep">›</span>
      <span class="current">Chapter 12: మొబైల్ రెస్పాన్సివ్ మెటా ట్యాగ్స్, Favicons &amp; Web App Manifest</span>
    </div>

    <!-- PAGE TITLE -->
    <h1 class="page-title">మొబైల్ రెస్పాన్సివ్ మెటా ట్యాగ్స్, Favicons &amp; Web App Manifest గైడ్</h1>

    <!-- PAGE META BADGES -->
    <div class="page-meta">
      <span class="badge">🌐 Modern HTML5 (W3C/WHATWG)</span>
      <span class="badge">🟢 Chapter 12 of 20</span>
      <span class="badge">📂 Phase 03: మోడరన్ సెమాంటిక్ HTML5 &amp; లేఅవుట్ డిజైన్</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

    <!-- SUBTOPICS PILL BAR -->
    <div style="background:var(--bg3); border:1px solid var(--border); border-radius:8px; padding:10px 16px; margin-bottom:24px; font-size:13px; color:var(--text2); display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
      <span style="color:#10b981; font-weight:700;">📌 Covered in this chapter:</span>
      <span>Viewport Meta Tag విశ్లేషణ · initial-scale &amp; width=device-width · ఆధునిక SVG/PNG Favicons · Apple Touch Icons · theme-color మొబైల్ బ్రౌజర్ బార్స్ · Web App Manifest పరిచయం · ప్రొడక్షన్ &lt;head&gt; చెక్‌లిస్ట్ · బిగినర్స్ తప్పులు &amp; క్విజ్</span>
    </div>

    <!-- INTRO ACCENT BOX (Warm Ivory with Green Accent) -->
    <div class="intro-box">
      <p>2007 లో మొట్టమొదటి ఆపిల్ ఐఫోన్ (iPhone) విడుదలైనప్పుడు వెబ్‌లో ఒక తీవ్రమైన సమస్య తలెత్తింది. అప్పటివరకు ప్రపంచంలో ఉన్న వెబ్‌సైట్లన్నీ కేవలం డెస్క్‌టాప్ కంప్యూటర్ల కోసమే డిజైన్ చేయబడ్డాయి (సాధారణంగా 980 పిక్సెల్స్ వెడల్పుతో). చిన్న మొబైల్ స్క్రీన్‌పై ఆ పేజీలు ఓపెన్ చేసినప్పుడు అక్షరాలు చీమలంత పరిమాణంలో కనిపించేవి; యూజర్లు వేళ్ళతో రెండు సార్లు జూమ్ చేసి చదవాల్సి వచ్చేది!</p>
      <p>ఈ సమస్యను పరిష్కరించడానికి ఆపిల్ ఇంజనీర్లు <strong><code>&lt;meta name="viewport"&gt;</code></strong> అనే ఒక చిన్న మ్యాజిక్ కోడ్‌ను కనిపెట్టారు. కేవలం ఈ ఒక్క లైన్ కోడ్ — నేడు ప్రపంచంలో 60% కంటే ఎక్కువ ఉన్న మొబైల్ ఇంటర్నెట్ ట్రాఫిక్‌ను శాసిస్తోంది. ఈ ట్యాగ్ లేకపోతే, మీరు రాసిన CSS మీడియా క్వెరీలు (Media Queries) మొబైల్‌లో అస్సలు పనిచేయవు!</p>
      <p>అంతేకాకుండా బ్రౌజర్ ట్యాబ్‌లో మీ బ్రాండ్ లోగో మెరిసేలా చేసే <strong>ఆధునిక Favicons (SVG &amp; PNG)</strong>, ఐఫోన్ హోమ్ స్క్రీన్‌పై యాప్ ఐకాన్‌లా కనిపించే <strong>Apple Touch Icons</strong>, మరియు మొబైల్ బ్రౌజర్ టాప్ బార్ రంగును మార్చే <strong>theme-color</strong> లతో ప్రొఫెషనల్ వెబ్‌సైట్‌ను ఎలా తీర్చిదిద్దాలో Phase 03 ఫైనల్ అధ్యాయమైన ఈ 12వ లెసన్‌లో సమగ్రంగా నేర్చుకుందాం!</p>
    </div>

    <!-- SECTION 1 -->
    <div class="section-title"><span class="num">1</span>ఈ Chapter లో మీరు నేర్చుకునే అంశాలు</div>
    <div class="section-body">
      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.7;">
        <li><strong>Viewport మెటా ట్యాగ్ అసలైన రహస్యం:</strong> మొబైల్ బ్రౌజర్లు డెస్క్‌టాప్ పేజీలను 980px వద్ద ఎలా కుదించి చూపుతాయి?</li>
        <li><strong>width=device-width మరియు initial-scale=1.0:</strong> ప్రతి పిక్సెల్ స్క్రీన్‌కు తగ్గట్లుగా 1:1 నిష్పత్తిలో సరిపోయే విధానం.</li>
        <li><strong>Accessibility వార్నింగ్ (user-scalable):</strong> యూజర్లను జూమ్ చేయకుండా ఆపడం ఎందుకు నేరమో విశ్లేషణ.</li>
        <li><strong>ఆధునిక Favicon ప్రమాణాలు:</strong> పాతకాలపు .ico ఫైళ్ల నుండి ఆధునిక లైట్/డార్క్ మోడ్ SVG Favicons కు పరివర్తన.</li>
        <li><strong>Apple Touch Icons:</strong> iOS యూజర్లు మీ వెబ్‌సైట్‌ను "Add to Home Screen" చేసినప్పుడు ప్రదర్శించే హై-రెజ్ ఐకాన్స్.</li>
        <li><strong>theme-color మెటా ట్యాగ్:</strong> ఆండ్రాయిడ్ క్రోమ్ మరియు సఫారీ అడ్రస్ బార్‌ను మీ బ్రాండ్ కలర్‌తో మ్యాచ్ చేయడం.</li>
        <li><strong>Web App Manifest (site.webmanifest):</strong> వెబ్‌సైట్‌ను ఒక ప్రొగ్రెసివ్ వెబ్ యాప్ (PWA) గా మార్చే పునాది.</li>
        <li><strong>పర్ఫెక్ట్ ప్రొడక్షన్ &lt;head&gt; చెక్‌లిస్ట్:</strong> సీనియర్ ఇంజనీర్లు ఉపయోగించే పూర్తి హెడ్ టెంప్లేట్.</li>
      </ul>
    </div>

    <!-- SECTION 2 -->
    <div class="section-title"><span class="num">2</span>స్మార్ట్‌ఫోన్ విప్లవం &amp; Viewport మెటా ట్యాగ్ పుట్టుక</div>
    <div class="section-body">
      <p><strong>"వ్యూపోర్ట్" (Viewport)</strong> అంటే ఒక యూజర్ తన పరికరంలో చూస్తున్న కంప్యూటర్ లేదా మొబైల్ స్క్రీన్ యొక్క దృశ్యమాన ప్రాంతం (Visible Area of the Webpage).</p>

      <p>మొబైల్ ఫోన్లు రాకముందు బ్రౌజర్లు ఎల్లప్పుడూ వెబ్‌సైట్‌ను కనీసం <code>980px</code> వెడల్పు ఉన్నట్లు ఊహించుకునేవి (Virtual Desktop Canvas). మొబైల్ స్క్రీన్ వెడల్పు కేవలం <code>375px</code> మాత్రమే ఉన్నప్పటికీ, ఆ 980px పేజీని బలవంతంగా చిన్నగా కుదించి (Zoom Out చేసి) చూపించేవి. ఫలితంగా టెక్స్ట్ అంతా చాలా చిన్నగా మారి చదవడానికి వీలు లేకుండా పోయేది!</p>

      <div class="diagram-box">
  Viewport Meta Tag లేనప్పుడు vs ఉన్నప్పుడు:

  ❌ మెటా ట్యాగ్ లేనప్పుడు (980px Virtual Canvas):
  ┌───────────────┐
  │ [చిన్న అక్షరాలు]│  ◄── డెస్క్‌టాప్ పేజీ కుంచించుకుపోయి కనిపిస్తుంది.
  │ [చదవలేము 🔍]  │      యూజర్ వేళ్ళతో జూమ్ చేయాల్సిందే!
  └───────────────┘

  ✅ మెటా ట్యాగ్ ఉన్నప్పుడు (width=device-width):
  ┌───────────────┐
  │ పెద్ద అక్షరాలు │  ◄── మొబైల్ స్క్రీన్ సైజుకు తగ్గట్లుగా
  │ చదవడానికి బాగుంది│      కంటెంట్ ఆటోమేటిక్‌గా రీ-ఫ్లో అవుతుంది!
  │ [ట్యాప్ బటన్]  │
  └───────────────┘
      </div>
    </div>

    <!-- SECTION 3 -->
    <div class="section-title"><span class="num">3</span>width=device-width &amp; initial-scale=1.0 అనాటమీ</div>
    <div class="section-body">
      <p>ప్రపంచవ్యాప్తంగా ప్రతి ఆధునిక వెబ్‌పేజీ <code>&lt;head&gt;</code> లోనూ కనిపించే గోల్డెన్ కోడ్ లైన్ ఇది:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span>HTML — రెస్పాన్సివ్ వ్యూపోర్ట్ మెటా ట్యాగ్</span>
        </div>
        <pre><code class="language-html">&lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;</code></pre>
      </div>

      <p style="margin-top:14px;"><strong>ఈ కోడ్‌లోని ప్రతి పదానికి అర్థం ఏమిటి?</strong></p>
      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.8;">
        <li><strong><code>name="viewport"</code>:</strong> ఈ మెటాడేటా బ్రౌజర్ యొక్క స్క్రీన్ వ్యూపోర్ట్ విండోకు వర్తిస్తుందని తెలియజేస్తుంది.</li>
        <li><strong><code>width=device-width</code>:</strong> పేజీ యొక్క వెడల్పును వర్చువల్ 980px కాకుండా, యూజర్ చేతిలోని పరికరం యొక్క అసలైన స్క్రీన్ వెడల్పుతో (Device Independent Pixels - CSS Pixels) సమానం చేయమని బ్రౌజర్‌ను ఆదేశిస్తుంది. (ఉదా: iPhone లో 390px, Samsung లో 412px).</li>
        <li><strong><code>initial-scale=1.0</code>:</strong> పేజీ మొట్టమొదట లోడ్ అయినప్పుడు జూమ్ లెవల్ <strong>1:1 నిష్పత్తిలో (100% సాధారణ సైజులో)</strong> ఉండాలని నిర్దేశిస్తుంది.</li>
      </ul>
    </div>

    <!-- SECTION 4 -->
    <div class="section-title"><span class="num">4</span>Accessibility హెచ్చరిక: user-scalable=no ఎప్పుడూ రాయకూడదు!</div>
    <div class="section-body">
      <p>చాలా మంది అనుభవం లేని బిగినర్స్ ఇంటర్నెట్‌లో పాత ట్యుటోరియల్స్ చూసి ఇలా రాస్తుంటారు:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span>తీవ్రమైన తప్పు: జూమింగ్ బ్లాక్ చేయడం (యాంటీ-పాటర్న్ ❌)</span>
        </div>
        <pre><code class="language-html">&lt;!-- ❌ దీన్ని ఎప్పుడూ వాడకండి! --&gt;
&lt;meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"&gt;</code></pre>
      </div>

      <div class="callout callout-danger" style="margin-top:16px; background:#fef2f2; border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px;">
        <strong style="color:#b91c1c;">🚨 W3C &amp; గూగుల్ యాక్సెసిబిలిటీ హెచ్చరిక:</strong><br>
        <code>user-scalable=no</code> అని రాస్తే యూజర్లు తమ వేళ్ళతో స్క్రీన్‌ను జూమ్ (Pinch-to-zoom) చేసుకోలేరు. కంటిచూపు తక్కువగా ఉన్న వృద్ధులు లేదా దృష్టి లోపం ఉన్న వ్యక్తులు అక్షరాలు కనిపించక తీవ్ర ఇబ్బంది పడతారు. గూగుల్ లైట్‌హౌస్ (Lighthouse) ఆడిట్‌లో ఇది ఫెయిల్ అవ్వడమే కాకుండా మీ SEO ర్యాంకింగ్స్ కూడా తగ్గుతాయి! కాబట్టి ఎల్లప్పుడూ కేవలం <code>width=device-width, initial-scale=1.0</code> మాత్రమే వాడాలి.
      </div>
    </div>

    <!-- SECTION 5 -->
    <div class="section-title"><span class="num">5</span>బ్రౌజర్ థీమ్ కలర్: &lt;meta name="theme-color"&gt;</div>
    <div class="section-body">
      <p>ఆండ్రాయిడ్ స్మార్ట్‌ఫోన్లలో గూగుల్ క్రోమ్ బ్రౌజర్ లేదా ఐఫోన్లలో సఫారీ బ్రౌజర్‌లో వెబ్‌సైట్ ఓపెన్ చేసినప్పుడు — స్క్రీన్ పైభాగంలో ఉండే స్టేటస్ బార్ మరియు అడ్రస్ బార్ సాధారణంగా బూడిద లేదా తెల్ల రంగులో ఉంటాయి.</p>
      <p>కానీ మీ వెబ్‌సైట్ ఒక నేటివ్ మొబైల్ యాప్ లాగా అందంగా కనిపించాలంటే, ఆ టాప్ బార్‌ను మీ బ్రాండ్ కలర్‌తో మార్చవచ్చు:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span>HTML — బ్రౌజర్ అడ్రస్ బార్ థీమ్ కలర్</span>
        </div>
        <pre><code class="language-html">&lt;!-- మొబైల్ బ్రౌజర్ అడ్రస్ బార్‌కు మన ఎమరాల్డ్ గ్రీన్ రంగు --&gt;
&lt;meta name="theme-color" content="#10b981"&gt;

&lt;!-- డార్క్ మోడ్ &amp; లైట్ మోడ్ కోసం వేర్వేరు రంగులు --&gt;
&lt;meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)"&gt;
&lt;meta name="theme-color" content="#0f172a" media="(prefers-color-scheme: dark)"&gt;</code></pre>
      </div>

      <p style="margin-top:12px; font-size:14px; color:var(--text2);">
        💡 యూజర్ తన మొబైల్‌లో డార్క్ మోడ్ ఆన్ చేస్తే ఆటోమేటిక్‌గా నల్లటి రంగు, లైట్ మోడ్ లో ఉంటే తెల్లటి రంగులోకి బ్రౌజర్ బార్ మారిపోతుంది!
      </p>
    </div>

    <!-- SECTION 6 -->
    <div class="section-title"><span class="num">6</span>Favicons పరిణామం: .ico నుండి ఆధునిక SVG &amp; PNG వరకు</div>
    <div class="section-body">
      <p><strong>"ఫెవికాన్" (Favicon - Favorite Icon)</strong> అనేది బ్రౌజర్ ట్యాబ్‌లో మీ వెబ్‌సైట్ పేరు పక్కన కనిపించే చిన్న బ్రాండ్ ఐకాన్. 1999 లో ఇంటర్నెట్ ఎక్స్‌ప్లోరర్ కేవలం 16x16 పిక్సెల్స్ ఉన్న <code>favicon.ico</code> ఫైల్‌ను మాత్రమే సపోర్ట్ చేసేది.</p>

      <p>కానీ నేడు హై-రిజల్యూషన్ రెటినా స్క్రీన్స్ (Retina 4K Displays) వచ్చాయి. ఆధునిక వెబ్ డెవలప్‌మెంట్‌లో మనం 3 రకాల ఫెవికాన్లను ఉపయోగిస్తాం:</p>

      <div style="overflow-x:auto; margin: 16px 0;">
        <table class="tbl">
          <thead>
            <tr>
              <th>ఫైల్ రకం</th>
              <th>ఫార్మాట్</th>
              <th>ఉద్దేశం &amp; ప్రయోజనం</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>SVG Favicon</strong></td>
              <td><code>icon.svg</code> (image/svg+xml)</td>
              <td>అత్యుత్తమ ఆధునిక ఎంపిక! ఎంత పెద్ద స్క్రీన్‌లో చూసినా పిక్సెల్స్ పగలవు. లైట్/డార్క్ మోడ్ CSS కూడా సపోర్ట్ చేస్తుంది.</td>
            </tr>
            <tr>
              <td><strong>PNG Favicon</strong></td>
              <td><code>favicon-32x32.png</code></td>
              <td>32x32 మరియు 192x192 సైజులు. అన్ని ఆధునిక బ్రౌజర్లకు హై-క్వాలిటీ ఫాల్‌బ్యాక్.</td>
            </tr>
            <tr>
              <td><strong>Legacy .ICO</strong></td>
              <td><code>favicon.ico</code></td>
              <td>పాతకాలపు లెగసీ బ్రౌజర్లు మరియు సర్వర్ రూట్ ఫాల్‌బ్యాక్ కోసం.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="code-block">
        <div class="code-block-header">
          <span>HTML — ఆధునిక Favicons లింకింగ్</span>
        </div>
        <pre><code class="language-html">&lt;!-- 1. ఆధునిక బ్రౌజర్ల కోసం స్కేలబుల్ వెక్టార్ SVG --&gt;
&lt;link rel="icon" type="image/svg+xml" href="/favicon.svg"&gt;

&lt;!-- 2. స్టాండర్డ్ 32x32 హై-రెజ్ PNG --&gt;
&lt;link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"&gt;

&lt;!-- 3. పాత బ్రౌజర్ల కోసం లెగసీ ఫాల్‌బ్యాక్ --&gt;
&lt;link rel="alternate icon" href="/favicon.ico"&gt;</code></pre>
      </div>
    </div>

    <!-- SECTION 7 -->
    <div class="section-title"><span class="num">7</span>Apple Touch Icons: ఐఫోన్ హోమ్ స్క్రీన్ ఐకాన్</div>
    <div class="section-body">
      <p>ఒక ఐఫోన్ లేదా ఐప్యాడ్ యూజర్ సఫారీలో మీ వెబ్‌సైట్ చూస్తూ "Add to Home Screen" బటన్ నొక్కినప్పుడు — సాధారణ ఫెవికాన్ చాలా చిన్నగా ఉండి మసకగా కనిపిస్తుంది.</p>
      <p>ఐఫోన్ యాప్ స్టోర్ యాప్స్ లాగా క్రిస్టల్ క్లియర్‌గా కనిపించేలా చేయడానికి ఆపిల్ <strong>Apple Touch Icon (180x180 పిక్సెల్స్ PNG)</strong> ని ప్రవేశపెట్టింది:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span>HTML — Apple Touch Icon లింకింగ్</span>
        </div>
        <pre><code class="language-html">&lt;!-- iOS హోమ్ స్క్రీన్ యాప్ ఐకాన్ (180x180 PNG) --&gt;
&lt;link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"&gt;</code></pre>
      </div>
    </div>

    <!-- SECTION 8 -->
    <div class="section-title"><span class="num">8</span>PWA ఫౌండేషన్: Web App Manifest (site.webmanifest)</div>
    <div class="section-body">
      <p>మీ వెబ్‌సైట్‌ను ఆండ్రాయిడ్ లేదా విండోస్‌లో నేరుగా ఒక మొబైల్ అప్లికేషన్ లాగా ఇన్‌స్టాల్ చేసుకోవడానికి (Progressive Web App - PWA) <strong><code>manifest.json</code></strong> ఫైల్ ఉపయోగపడుతుంది.</p>

      <div class="code-block">
        <div class="code-block-header">
          <span>JSON — site.webmanifest ఉదాహరణ</span>
        </div>
        <pre><code class="language-json">{
  "name": "Our Compiler Pro",
  "short_name": "OurCompiler",
  "icons": [
    {
      "src": "/android-chrome-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/android-chrome-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "theme_color": "#10b981",
  "background_color": "#ffffff",
  "display": "standalone",
  "start_url": "/"
}</code></pre>
      </div>

      <p style="margin-top:12px;">దీనిని మీ HTML హెడ్‌లో ఇలా లింక్ చేస్తారు:</p>
      <div class="code-block">
        <pre><code class="language-html">&lt;link rel="manifest" href="/site.webmanifest"&gt;</code></pre>
      </div>
    </div>

    <!-- SECTION 9 -->
    <div class="section-title"><span class="num">9</span>సోషల్ షేరింగ్ మెటా ట్యాగ్స్ ప్రివ్యూ (Open Graph &amp; Twitter)</div>
    <div class="section-body">
      <p>మీ వెబ్‌సైట్ లింక్‌ను ఎవరైనా WhatsApp, Telegram, LinkedIn లేదా X (Twitter) లో షేర్ చేసినప్పుడు — ఒక అందమైన కార్డు రూపంలో పెద్ద ఫోటో, టైటిల్ మరియు వివరణ ప్రత్యక్షమవుతాయి (Social Preview Card). ఇది జరగడానికి ఫేస్‌బుక్ కనిపెట్టిన <strong>Open Graph (og:)</strong> ట్యాగ్స్ కారణం:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span>HTML — Open Graph మరియు Twitter మెటా ట్యాగ్స్</span>
        </div>
        <pre><code class="language-html">&lt;!-- Open Graph / Facebook / WhatsApp --&gt;
&lt;meta property="og:type" content="article"&gt;
&lt;meta property="og:title" content="HTML5 మాస్టర్‌క్లాస్ తెలుగులో | Our Compiler"&gt;
&lt;meta property="og:description" content="వెబ్ డెవలప్‌మెంట్‌ను సులభంగా పూర్తి తెలుగులో ప్రాక్టికల్ లైవ్ కోడింగ్‌తో నేర్చుకోండి."&gt;
&lt;meta property="og:image" content="https://www.ourcompiler.com/og-banner.jpg"&gt;
&lt;meta property="og:url" content="https://www.ourcompiler.com/blog-html.html"&gt;

&lt;!-- Twitter Cards --&gt;
&lt;meta name="twitter:card" content="summary_large_image"&gt;
&lt;meta name="twitter:title" content="HTML5 మాస్టర్‌క్లాస్ తెలుగులో"&gt;
&lt;meta name="twitter:image" content="https://www.ourcompiler.com/og-banner.jpg"&gt;</code></pre>
      </div>
    </div>

    <!-- SECTION 10 -->
    <div class="section-title"><span class="num">10</span>పర్ఫెక్ట్ ప్రొడక్షన్ &lt;head&gt; చెక్‌లిస్ట్ టెంప్లేట్</div>
    <div class="section-body">
      <p>ప్రపంచవ్యాప్తంగా టాప్ టెక్ కంపెనీలలో (Google, Netflix, Amazon) సీనియర్ ఆర్కిటెక్ట్‌లు ఉపయోగించే పూర్తిస్థాయి ప్రొడక్షన్ <code>&lt;head&gt;</code> చెక్‌లిస్ట్ ఇది. మీరు భవిష్యత్తులో నిర్మించే ప్రతి కొత్త ప్రాజెక్ట్‌కూ దీనిని బ్లూప్రింట్‌గా వాడుకోవచ్చు:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span>HTML — గోల్డెన్ స్టాండర్డ్ &lt;head&gt; ఆర్కిటెక్చర్</span>
          <div class="code-actions">
            <button class="try-btn">▶ Run in Online HTML Editor</button>
          </div>
        </div>
        <pre><code class="language-html">&lt;!DOCTYPE html&gt;
&lt;html lang="te"&gt;
&lt;head&gt;
  &lt;!-- 1. క్యారెక్టర్ ఎన్‌కోడింగ్ (మొదట్లోనే ఉండాలి!) --&gt;
  &lt;meta charset="UTF-8"&gt;
  
  &lt;!-- 2. రెస్పాన్సివ్ మొబైల్ వ్యూపోర్ట్ --&gt;
  &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
  
  &lt;!-- 3. పేజీ శీర్షిక &amp; SEO మెటాడేటా --&gt;
  &lt;title&gt;నా మొట్టమొదటి రెస్పాన్సివ్ వెబ్‌సైట్&lt;/title&gt;
  &lt;meta name="description" content="రెస్పాన్సివ్ వెబ్ డిజైన్ మరియు మోడరన్ మెటా ట్యాగ్స్ గైడ్."&gt;
  
  &lt;!-- 4. థీమ్ కలర్ (మొబైల్ బ్రౌజర్ బార్) --&gt;
  &lt;meta name="theme-color" content="#10b981"&gt;
  
  &lt;!-- 5. ఫెవికాన్స్ (SVG, PNG, Apple Touch) --&gt;
  &lt;link rel="icon" type="image/svg+xml" href="/favicon.svg"&gt;
  &lt;link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"&gt;
  &lt;link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"&gt;
  &lt;link rel="manifest" href="/site.webmanifest"&gt;

  &lt;!-- 6. ఫాంట్స్ &amp; CSS స్టైల్స్ --&gt;
  &lt;link rel="stylesheet" href="/style.css"&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;h1&gt;హలో మొబైల్ ప్రపంచం!&lt;/h1&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
      </div>
    </div>

    <!-- SECTION 11 -->
    <div class="section-title"><span class="num">11</span>బిగినర్స్ చేసే టాప్ 5 పొరపాట్లు &amp; పరిష్కారాలు</div>
    <div class="section-body">
      <div style="display:flex; flex-direction:column; gap:16px;">
        <div style="background:var(--bg2); border:1px solid #fecaca; border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px;">
          <strong style="color:#b91c1c;">1. తప్పు: Viewport మెటా ట్యాగ్ రాయడం మర్చిపోవడం</strong>
          <p style="margin-top:6px; color:var(--text2); font-size:14px;">మీరు ఎంత గొప్ప రెస్పాన్సివ్ CSS కోడ్ రాసినా, ఈ ట్యాగ్ లేకపోతే మొబైల్ బ్రౌజర్లు 980px వర్చువల్ స్క్రీన్‌ను కుదించి చిన్నగా చూపుతాయి. ప్రతి HTML ఫైల్‌లో ఈ ట్యాగ్ మొదటి 3 లైన్లలోనే ఉండాలి.</p>
        </div>

        <div style="background:var(--bg2); border:1px solid #fecaca; border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px;">
          <strong style="color:#b91c1c;">2. తప్పు: user-scalable=no వాడటం</strong>
          <p style="margin-top:6px; color:var(--text2); font-size:14px;">యూజర్లను జూమ్ చేయకుండా ఆపడం అత్యంత చెడ్డ వెబ్ డిజైన్ ప్రాక్టీస్. దీనివల్ల గూగుల్ మొబైల్ ఫ్రెండ్లీ స్కోర్ పడిపోతుంది.</p>
        </div>

        <div style="background:var(--bg2); border:1px solid #fecaca; border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px;">
          <strong style="color:#b91c1c;">3. తప్పు: Apple Touch Icon కి పారదర్శక (Transparent) PNG వాడటం</strong>
          <p style="margin-top:6px; color:var(--text2); font-size:14px;">ఆపిల్ టచ్ ఐకాన్ ఎల్లప్పుడూ సాలిడ్ బ్యాక్‌గ్రౌండ్ కలర్ (Non-transparent) కలిగి ఉండాలి. పారదర్శకత ఉంటే ఐఫోన్ దానికి నల్లటి బ్యాక్‌గ్రౌండ్ ఇచ్చి ఐకాన్‌ను వికారంగా మార్చేస్తుంది.</p>
        </div>

        <div style="background:var(--bg2); border:1px solid #fecaca; border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px;">
          <strong style="color:#b91c1c;">4. తప్పు: భారీ సైజున్న ఫోటోను Favicon గా లింక్ చేయడం</strong>
          <p style="margin-top:6px; color:var(--text2); font-size:14px;">2MB ఉన్న పెద్ద ఫోటోను ఫెవికాన్‌గా పెట్టడం. ఫెవికాన్స్ ఎల్లప్పుడూ 10KB లోపు తేలికగా ఆప్టిమైజ్ చేయబడిన SVG లేదా 32x32 PNG మాత్రమే అయి ఉండాలి.</p>
        </div>

        <div style="background:var(--bg2); border:1px solid #fecaca; border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px;">
          <strong style="color:#b91c1c;">5. తప్పు: charset="UTF-8" ని చాలా దిగువన రాయడం</strong>
          <p style="margin-top:6px; color:var(--text2); font-size:14px;">క్యారెక్టర్ ఎన్‌కోడింగ్ ట్యాగ్ డాక్యుమెంట్ ప్రారంభంలోనే (మొదటి 1024 బైట్లలో) ఉండాలి. లేకపోతే తెలుగు అక్షరాలు సరిగ్గా రెండర్ కాక ప్రశ్నార్థకాలు (???) రావచ్చు.</p>
        </div>
      </div>
    </div>

    <!-- SECTION 12 (INTERACTIVE COLLAPSIBLE QUIZ) -->
    <div class="section-title"><span class="num">12</span>ఇంటరాక్టివ్ సెల్ఫ్-టెస్ట్ క్విజ్ (Interactive Quiz)</div>
    <div class="section-body">
      <p>ఈ అధ్యాయంలో మీరు నేర్చుకున్న విషయాలను స్వయంగా పరీక్షించుకోండి. ప్రతి ప్రశ్నను చదివి సమాధానం ఆలోచించిన తర్వాత "సమాధానం చూడండి" పై క్లిక్ చేయండి:</p>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:700; cursor:pointer; color:#059669;">
          ❓ ప్రశ్న 1: వ్యూపోర్ట్ మెటా ట్యాగ్‌లోని "width=device-width" ఏం చేస్తుంది?
        </summary>
        <div style="margin-top:10px; color:var(--text2); font-size:14px; line-height:1.6;">
          <strong>సమాధానం:</strong> వెబ్‌పేజీ వెడల్పును డెస్క్‌టాప్ 980px వర్చువల్ సైజుతో కాకుండా, యూజర్ చేతిలోని పరికరం యొక్క వాస్తవ స్క్రీన్ వెడల్పుతో (CSS Pixels) సమానం చేస్తుంది.
        </div>
      </details>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:700; cursor:pointer; color:#059669;">
          ❓ ప్రశ్న 2: మొబైల్ బ్రౌజర్ అడ్రస్ బార్ రంగును మార్చడానికి ఏ మెటా ట్యాగ్ ఉపయోగిస్తారు?
        </summary>
        <div style="margin-top:10px; color:var(--text2); font-size:14px; line-height:1.6;">
          <strong>సమాధానం:</strong> <code>&lt;meta name="theme-color" content="#10b981"&gt;</code>.
        </div>
      </details>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:700; cursor:pointer; color:#059669;">
          ❓ ప్రశ్న 3: ఆధునిక హై-రిజల్యూషన్ రెటినా స్క్రీన్ల కోసం ఏ ఫెవికాన్ ఫార్మాట్ అత్యుత్తమమైనది?
        </summary>
        <div style="margin-top:10px; color:var(--text2); font-size:14px; line-height:1.6;">
          <strong>సమాధానం:</strong> <code>SVG</code> (Scalable Vector Graphics). ఇది ఎంత జూమ్ చేసినా పిక్సెల్స్ పగలదు మరియు డార్క్ మోడ్ స్టైల్స్‌ను సపోర్ట్ చేస్తుంది.
        </div>
      </details>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:700; cursor:pointer; color:#059669;">
          ❓ ప్రశ్న 4: iOS Safari లో "Add to Home Screen" చేసినప్పుడు ఉపయోగపడే ఐకాన్ పేరు ఏమిటి?
        </summary>
        <div style="margin-top:10px; color:var(--text2); font-size:14px; line-height:1.6;">
          <strong>సమాధానం:</strong> <code>apple-touch-icon</code> (180x180 PNG).
        </div>
      </details>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:700; cursor:pointer; color:#059669;">
          ❓ ప్రశ్న 5: WhatsApp లేదా లింక్డ్‌ఇన్‌లో షేర్ చేసినప్పుడు ప్రివ్యూ కార్డు రావడానికి ఏ మెటా ట్యాగ్స్ వాడతారు?
        </summary>
        <div style="margin-top:10px; color:var(--text2); font-size:14px; line-height:1.6;">
          <strong>సమాధానం:</strong> <code>Open Graph</code> మెటా ట్యాగ్స్ (og:title, og:description, og:image, og:url).
        </div>
      </details>
    </div>

    <!-- SECTION 13 (TRY BOX & SUMMARY) -->
    <div class="section-title"><span class="num">13</span>మీరే స్వయంగా Try చేయండి &amp; Phase 03 ముగింపు సారాంశం</div>
    <div class="section-body">
      <div class="try-box" style="margin-top:10px;">
        <div class="try-title">🚀 పూర్తి ప్రొడక్షన్ &lt;head&gt; టెంప్లేట్‌ను మన ఎడిటర్‌లో పరీక్షించండి</div>
        <p>పైన వివరించిన సంపూర్ణ మెటా ట్యాగ్స్, థీమ్ కలర్, మరియు రెస్పాన్సివ్ వ్యూపోర్ట్ కోడ్‌ను మన ఆన్‌లైన్ ఎడిటర్‌లో ఓపెన్ చేసి మీ స్వంత కలర్స్, టైటిల్స్‌తో ప్రాక్టీస్ చేయండి!</p>
        <a class="run-btn" href="/online-html-editor.html" target="_blank">
          👉 Our Compiler లో HTML Editor try చేయండి
        </a>
      </div>

      <div style="margin-top:24px;">
        <h4 style="color:#059669; font-size:16px; margin-bottom:10px;">📌 క్విక్ సారాంశం (Key Takeaways):</h4>
        <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.7;">
          <li><strong>Viewport:</strong> <code>width=device-width, initial-scale=1.0</code> మొబైల్ రెస్పాన్సివ్ డిజైన్‌కు గుండెకాయ.</li>
          <li><strong>జూమింగ్:</strong> యూజర్ జూమింగ్‌ను ఎప్పుడూ డిసేబుల్ చేయకూడదు.</li>
          <li><strong>థీమ్ కలర్:</strong> <code>theme-color</code> మెటా ట్యాగ్‌తో మొబైల్ బ్రౌజర్ బార్‌ను బ్రాండింగ్ చేయవచ్చు.</li>
          <li><strong>ఫెవికాన్స్:</strong> ఆధునిక బ్రౌజర్లకు <strong>SVG</strong> మరియు 32x32 <strong>PNG</strong> వాడాలి.</li>
          <li><strong>మొబైల్ హోమ్ స్క్రీన్:</strong> ఆపిల్ కోసం <code>apple-touch-icon</code>, ఆండ్రాయిడ్ కోసం <code>manifest.json</code>.</li>
        </ul>
      </div>

      <div style="margin-top:20px; padding:16px; background:var(--bg2); border-left:4px solid #10b981; border-radius:0 8px 8px 0;">
        <strong>Phase 03 విజయవంతంగా పూర్తయింది! 🎉</strong><br>
        మనం సెమాంటిక్ ఎలిమెంట్స్, మ్యాగజైన్ లేఅవుట్స్, మల్టీమీడియా మరియు మొబైల్ రెస్పాన్సివ్ మెటా ట్యాగ్స్‌ను సమగ్రంగా పూర్తి చేశాం! తర్వాతి అధ్యాయంలో మనం <strong>Phase 04: HTML ఫారమ్స్, ఇన్‌పుట్స్ &amp; క్లయింట్-సైడ్ వాలిడేషన్</strong> లోకి అడుగుపెడదాం! <strong>Chapter 13: ఫారమ్స్ ఆర్కిటెక్చర్, action, method (GET vs POST) &amp; labels</strong> గురించి లోతుగా నేర్చుకుందాం!
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

const targetFile = path.join(__dirname, '..', 'public', 'blog-html', '12-html-responsive-meta-and-favicons.html');
fs.writeFileSync(targetFile, fullPageHtml, 'utf8');
console.log('✅ Successfully generated deep high-value Chapter 12!');
console.log('Target file size:', fullPageHtml.length, 'characters');

