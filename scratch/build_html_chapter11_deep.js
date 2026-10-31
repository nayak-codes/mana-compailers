const fs = require('fs');
const path = require('path');
const { LESSONS, buildSidebar } = require('./html_curriculum_data.js');

const lesson = LESSONS.find(l => l.num === 11);
const sidebarHtml = buildSidebar(11);

const chapterContentHtml = `
    <!-- BREADCRUMB -->
    <div class="breadcrumb">
      <a href="/">Home</a><span class="sep">›</span>
      <a href="/blog.html">Tutorials</a><span class="sep">›</span>
      <a href="/blog-html.html">HTML5 Masterclass</a><span class="sep">›</span>
      <span class="current">Chapter 11: మల్టీమీడియా: ఆడియో (audio), వీడియో (video) &amp; ఐఫ్రేమ్స్ (iframe)</span>
    </div>

    <!-- PAGE TITLE -->
    <h1 class="page-title">HTML5 మల్టీమీడియా: ఆడియో (audio), వీడియో (video), ట్రాక్స్ (track) &amp; ఐఫ్రేమ్స్ (iframe)</h1>

    <!-- PAGE META BADGES -->
    <div class="page-meta">
      <span class="badge">🌐 Modern HTML5 (W3C/WHATWG)</span>
      <span class="badge">🟢 Chapter 11 of 20</span>
      <span class="badge">📂 Phase 03: మోడరన్ సెమాంటిక్ HTML5 &amp; లేఅవుట్ డిజైన్</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

    <!-- SUBTOPICS PILL BAR -->
    <div style="background:var(--bg3); border:1px solid var(--border); border-radius:8px; padding:10px 16px; margin-bottom:24px; font-size:13px; color:var(--text2); display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
      <span style="color:#10b981; font-weight:700;">📌 Covered in this chapter:</span>
      <span>&lt;audio&gt; ట్యాగ్ &amp; కంట్రోల్స్ · &lt;video&gt; ప్లేయర్ &amp; poster థంబ్‌నెయిల్ · మల్టిపుల్ &lt;source&gt; ఫార్మాట్స్ · Muted Autoplay పాలసీ · WebVTT సబ్‌టైటిల్స్ (&lt;track&gt;) · YouTube/Maps ఎంబెడ్స్ · iframe sandbox సెక్యూరిటీ · బిగినర్స్ తప్పులు &amp; క్విజ్</span>
    </div>

    <!-- INTRO ACCENT BOX (Warm Ivory with Green Accent) -->
    <div class="intro-box">
      <p>2010 కంటే ముందు ఇంటర్నెట్‌లో ఒక పాట వినాలన్నా లేదా ఒక చిన్న వీడియో క్లిప్ చూడాలన్నా యూజర్లు "Adobe Flash Player" లేదా "Apple QuickTime" లాంటి భారీ థర్డ్-పార్టీ ప్లగిన్‌లను తమ కంప్యూటర్‌లో ఇన్‌స్టాల్ చేసుకోవాల్సి వచ్చేది. ఈ ప్లగిన్లు భద్రతా లోపాలతో (Security Vulnerabilities), తరచుగా క్రాష్ అవుతూ, ల్యాప్‌టాప్ బ్యాటరీలను వేగంగా తాగేసేవి!</p>
      <p>ఈ సమస్యకు పరిష్కారంగా స్టీవ్ జాబ్స్ (Steve Jobs) తన చారిత్రక "Thoughts on Flash" లేఖలో ఫ్లాష్‌ను పూర్తిగా తిరస్కరించి — ఎటువంటి ప్లగిన్లతో పనిలేకుండా బ్రౌజర్ల లోపలే నేరుగా వీడియోలు, పాటలు ప్లే అయ్యే ఓపెన్ వెబ్ స్టాండర్డ్ <strong>HTML5 మల్టీమీడియా</strong> కు మద్దతు ప్రకటించారు. ఆ తర్వాత W3C మరియు WHATWG సంస్థలు ప్రవేశపెట్టిన <strong>&lt;audio&gt; మరియు &lt;video&gt;</strong> ట్యాగ్‌లు వెబ్ ప్రపంచాన్ని శాశ్వతంగా మార్చేశాయి!</p>
      <p>నేడు ప్రపంచ ప్రసిద్ధ యూట్యూబ్ (YouTube), స్పాటిఫై (Spotify), నెట్‌ఫ్లిక్స్ (Netflix) లాంటి దిగ్గజ ప్లాట్‌ఫారమ్‌లు ఈ HTML5 నేటివ్ టెక్నాలజీల మీదే పనిచేస్తున్నాయి. అంతేకాకుండా వేరే వెబ్‌సైట్లను, గూగుల్ మ్యాప్స్‌ను మన పేజీలో సురక్షితంగా పొందుపరచడానికి <strong>&lt;iframe&gt; మరియు sandbox సెక్యూరిటీ</strong> ఎలా వాడాలో ఈ పదకొండవ అధ్యాయంలో సమగ్రంగా నేర్చుకుందాం!</p>
    </div>

    <!-- SECTION 1 -->
    <div class="section-title"><span class="num">1</span>ఈ Chapter లో మీరు నేర్చుకునే అంశాలు</div>
    <div class="section-body">
      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.7;">
        <li><strong>ఫ్లాష్ మరణం &amp; నేటివ్ మల్టీమీడియా:</strong> ఎటువంటి ప్లగిన్ లేకుండా బ్రౌజర్‌లో మీడియా ప్లే అయ్యే అద్భుత సూత్రం.</li>
        <li><strong>&lt;audio&gt; ఎలిమెంట్ అనాటమీ:</strong> controls, autoplay, loop, muted, మరియు preload ఆట్రిబ్యూట్లు.</li>
        <li><strong>మల్టిపుల్ సోర్స్‌లు (&lt;source&gt; ట్యాగ్):</strong> వివిధ బ్రౌజర్ల కోడెక్ మద్దతు కోసం MP3, OGG, WAV ఫాల్‌బ్యాక్స్.</li>
        <li><strong>&lt;video&gt; ఎలిమెంట్ నిర్మాణం:</strong> poster థంబ్‌నెయిల్, width, height, మరియు playsinline ఆప్టిమైజేషన్లు.</li>
        <li><strong>బ్రౌజర్ Autoplay పాలసీ:</strong> శబ్దంతో కూడిన ఆటోప్లేని బ్రౌజర్లు ఎందుకు బ్లాక్ చేస్తాయి? "Muted Autoplay" ట్రిక్.</li>
        <li><strong>&lt;track&gt; &amp; WebVTT సబ్‌టైటిల్స్:</strong> వికలాంగుల కోసం మరియు బహుళ భాషల్లో సబ్‌టైటిల్స్ (.vtt ఫైల్స్) జోడించడం.</li>
        <li><strong>&lt;iframe&gt; ఇన్-లైన్ ఫ్రేమ్స్:</strong> గూగుల్ మ్యాప్స్ మరియు యూట్యూబ్ వీడియోలను మన వెబ్‌సైట్‌లో ఎంబెడ్ చేయడం.</li>
        <li><strong>ఐఫ్రేమ్ భద్రత (sandbox &amp; loading="lazy"):</strong> క్లిక్‌జాకింగ్ (Clickjacking) దాడుల నుండి సైట్‌ను కాపాడే సెక్యూరిటీ రూల్స్.</li>
      </ul>
    </div>

    <!-- SECTION 2 -->
    <div class="section-title"><span class="num">2</span>ఆధునిక మీడియా ఫార్మాట్లు &amp; బ్రౌజర్ కోడెక్స్ (Codecs)</div>
    <div class="section-body">
      <p>వెబ్‌సైట్‌లో ఆడియో లేదా వీడియోను పొందుపరిచే ముందు — బ్రౌజర్లు ఏయే ఫార్మాట్లను సపోర్ట్ చేస్తాయో తెలుసుకోవడం చాలా అవసరం. ఒక ఫార్మాట్ క్రోమ్‌లో ప్లే అయితే, అదే ఫార్మాట్ పాత సఫారీలో లేదా ఫైర్‌ఫాక్స్‌లో పనిచేయకపోవచ్చు!</p>

      <div style="overflow-x:auto; margin: 16px 0;">
        <table class="tbl">
          <thead>
            <tr>
              <th>మీడియా రకం</th>
              <th>ఫార్మాట్ (Format)</th>
              <th>కంటైనర్ &amp; కోడెక్</th>
              <th>బ్రౌజర్ సపోర్ట్ &amp; సిఫార్సు</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>ఆడియో (Audio)</strong></td>
              <td><strong>MP3</strong> (audio/mpeg)</td>
              <td>MPEG-1 Audio Layer III</td>
              <td>⭐⭐⭐⭐⭐ 100% అన్ని బ్రౌజర్లలో నడుస్తుంది. గ్లోబల్ ఛాయిస్.</td>
            </tr>
            <tr>
              <td><strong>ఆడియో (Audio)</strong></td>
              <td><strong>OGG / Vorbis</strong></td>
              <td>Ogg Vorbis</td>
              <td>⭐⭐⭐⭐ ఓపెన్ సోర్స్ ఫార్మాట్. క్రోమ్, ఫైర్‌ఫాక్స్‌లలో సూపర్.</td>
            </tr>
            <tr>
              <td><strong>ఆడియో (Audio)</strong></td>
              <td><strong>WAV</strong> (audio/wav)</td>
              <td>Uncompressed PCM</td>
              <td>⭐⭐⭐ భారీ ఫైల్ సైజు (Uncompressed). వెబ్‌కు అంతగా సిఫార్సు చేయము.</td>
            </tr>
            <tr>
              <td><strong>వీడియో (Video)</strong></td>
              <td><strong>MP4</strong> (video/mp4)</td>
              <td>H.264 / AAC</td>
              <td>⭐⭐⭐⭐⭐ 100% అన్ని మొబైల్స్ &amp; బ్రౌజర్లలో సాఫీగా నడుస్తుంది.</td>
            </tr>
            <tr>
              <td><strong>వీడియో (Video)</strong></td>
              <td><strong>WebM</strong> (video/webm)</td>
              <td>VP8/VP9, AV1 / Opus</td>
              <td>⭐⭐⭐⭐ గూగుల్ కనిపెట్టిన ఆధునిక ఫార్మాట్. తక్కువ సైజు, అద్భుత నాణ్యత.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- SECTION 3 -->
    <div class="section-title"><span class="num">3</span>&lt;audio&gt; ఎలిమెంట్ అనాటమీ &amp; ఆట్రిబ్యూట్లు</div>
    <div class="section-body">
      <p>HTML5 లో ఒక ఆడియో ట్రాక్ (పాట, పాడ్‌కాస్ట్, లేదా సౌండ్ ఎఫెక్ట్) ను వెబ్‌పేజీలో చేర్చడానికి <code>&lt;audio&gt;</code> ట్యాగ్‌ను ఉపయోగిస్తాం.</p>

      <div class="diagram-box">
  ┌────────────────────────────────── &lt;audio&gt; TAG ──────────────────────────────────┐
  │                                                                                  │
  │   &lt;audio   src="podcast.mp3"   controls   loop   muted   preload="auto"&gt;        │
  │   └───┬──┘ └───────┬───────┘   └───┬────┘ └──┬─┘ └──┬──┘ └──────┬───────┘        │
  │       │            │               │         │      │           │                │
  │     Audio     Source File     Play/Pause   Repeat  Silence   Buffering           │
  │      Tag         Path           Buttons    Audio   Default   Strategy            │
  └──────────────────────────────────────────────────────────────────────────────────┘
      </div>

      <p style="margin-top:14px;"><strong>కీలకమైన ఆట్రిబ్యూట్లు:</strong></p>
      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.8;">
        <li><strong><code>controls</code>:</strong> ఇది చాలా ముఖ్యం! ఇది ఇవ్వకపోతే ప్లే, పాజ్, వాల్యూమ్, మరియు టైమ్‌లైన్ స్లైడర్ బటన్లు స్క్రీన్ మీద కనిపించనే కనిపించవు (ఆడియో కంటికి కనిపించకుండా దాక్కుంటుంది).</li>
        <li><strong><code>autoplay</code>:</strong> పేజీ లోడ్ అవ్వగానే ఆటోమేటిక్‌గా పాటను ప్లే చేస్తుంది (గమనిక: యూజర్ క్లిక్ చేయకుండా సౌండ్ ప్లే అవ్వకుండా ఆధునిక బ్రౌజర్లు అడ్డుకుంటాయి).</li>
        <li><strong><code>loop</code>:</strong> ఆడియో పూర్తయిన తర్వాత మళ్ళీ మొదటి నుండి రిపీట్‌గా ప్లే అవుతూనే ఉంటుంది.</li>
        <li><strong><code>muted</code>:</strong> పాట ప్రారంభంలోనే నిశ్శబ్దంగా (Mute) ప్లే అవుతుంది.</li>
        <li><strong><code>preload</code>:</strong> పేజీ వేగాన్ని ఆప్టిమైజ్ చేయడానికి వాడే వ్యూహం:
          <ul style="margin-top:6px;">
            <li><code>none</code>: యూజర్ ప్లే బటన్ నొక్కే వరకు ఆడియో ఫైల్‌ను డౌన్‌లోడ్ చేయదు (మొబైల్ డేటా ఆదా అవుతుంది!).</li>
            <li><code>metadata</code>: కేవలం పాట నిడివి (Duration) మరియు సైజు మాత్రమే డౌన్‌లోడ్ చేస్తుంది. (సిఫార్సు చేయబడినది)</li>
            <li><code>auto</code>: పేజీ ఓపెన్ కాగానే పూర్తి పాటను బఫర్ చేస్తుంది.</li>
          </ul>
        </li>
      </ul>

      <div class="code-block" style="margin-top:16px;">
        <div class="code-block-header">
          <span>HTML — సాధారణ ఆడియో ప్లేయర్</span>
          <div class="code-actions">
            <button class="try-btn">▶ Run in Online HTML Editor</button>
          </div>
        </div>
        <pre><code class="language-html">&lt;!-- ఆధునిక బ్రౌజర్ ఆడియో ప్లేయర్ --&gt;
&lt;audio controls preload="metadata" style="width: 100%; max-width: 450px;"&gt;
  &lt;source src="https://www.w3schools.com/html/horse.mp3" type="audio/mpeg"&gt;
  &lt;source src="https://www.w3schools.com/html/horse.ogg" type="audio/ogg"&gt;
  మీ బ్రౌజర్ HTML5 ఆడియో ఎలిమెంట్‌ను సపోర్ట్ చేయడం లేదు.
&lt;/audio&gt;</code></pre>
      </div>
    </div>

    <!-- SECTION 4 -->
    <div class="section-title"><span class="num">4</span>మల్టిపుల్ సోర్స్‌లు (&lt;source&gt;) &amp; ఫాల్‌బ్యాక్ మెసేజ్</div>
    <div class="section-body">
      <p>ప్రపంచవ్యాప్తంగా యూజర్లు విభిన్న బ్రౌజర్లు (Chrome, Safari, Firefox, Edge) మరియు విభిన్న ఆపరేటింగ్ సిస్టమ్‌లు (Android, iOS, Windows, Mac) ఉపయోగిస్తారు. అందరి మొబైల్స్‌లోనూ మీ పాట లేదా వీడియో ఎటువంటి లోపం లేకుండా ప్లే అవ్వాలంటే — ఒకే మీడియా ఫైల్‌ను రెండు విభిన్న ఫార్మాట్లలో <strong><code>&lt;source&gt;</code></strong> ట్యాగ్ ద్వారా అందించాలి:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span>HTML — బహుళ సోర్స్ ఫార్మాట్లు మరియు ఫాల్‌బ్యాక్</span>
          <div class="code-actions">
            <button class="try-btn">▶ Run in Online HTML Editor</button>
          </div>
        </div>
        <pre><code class="language-html">&lt;audio controls&gt;
  &lt;!-- 1st ఛాయిస్: ఆధునిక ఫార్మాట్ --&gt;
  &lt;source src="audio/podcast.ogg" type="audio/ogg"&gt;
  
  &lt;!-- 2nd ఛాయిస్: గ్లోబల్ ఫాల్‌బ్యాక్ --&gt;
  &lt;source src="audio/podcast.mp3" type="audio/mpeg"&gt;

  &lt;!-- బ్రౌజర్ అసలు ఆడియోనే సపోర్ట్ చేయకపోతే కనిపించే మెసేజ్ --&gt;
  &lt;p&gt;దురదృష్టవశాత్తూ మీ బ్రౌజర్ HTML5 ఆడియోను సపోర్ట్ చేయడం లేదు. దయచేసి &lt;a href="audio/podcast.mp3"&gt;ఈ లింక్ ద్వారా పాటను డౌన్‌లోడ్ చేసుకోండి&lt;/a&gt;.&lt;/p&gt;
&lt;/audio&gt;</code></pre>
      </div>

      <p style="margin-top:12px; font-size:14px; color:var(--text2);">
        💡 బ్రౌజర్ పైనుండి క్రిందికి స్కాన్ చేస్తుంది. తనకు మొదట సపోర్ట్ ఉన్న ఫార్మాట్ దొరకగానే దానిని ప్లే చేసి, క్రింద ఉన్న మిగతా సోర్స్‌లను విస్మరిస్తుంది.
      </p>
    </div>

    <!-- SECTION 5 -->
    <div class="section-title"><span class="num">5</span>&lt;video&gt; ఎలిమెంట్: ప్రొఫెషనల్ వీడియో ప్లేయర్ నిర్మాణం</div>
    <div class="section-body">
      <p><code>&lt;video&gt;</code> ఎలిమెంట్ వెబ్‌పేజీలో కదిలే చిత్రాలను (వీడియోలను) ప్రదర్శిస్తుంది. ఆడియోకు ఉండే అన్ని ఆట్రిబ్యూట్లతో పాటు వీడియోకు మరికొన్ని శక్తివంతమైన విజువల్ ఆట్రిబ్యూట్లు ఉంటాయి:</p>

      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.8;">
        <li><strong><code>poster="thumbnail.jpg"</code>:</strong> యూజర్ ప్లే బటన్ నొక్కకముందు లేదా వీడియో లోడ్ అయ్యేవరకు స్క్రీన్ మీద కనిపించే కవర్ ఫోటో (YouTube Thumbnail లాంటిది). ఇది ఇవ్వకపోతే వీడియో మొదటి ఫ్రేమ్ లేదా నల్లటి ఖాళీ డబ్బా కనిపిస్తుంది.</li>
        <li><strong><code>width</code> మరియు <code>height</code>:</strong> వీడియో పరిమాణం. లేఅవుట్ జంపింగ్ (CLS) నివారించడానికి వీటిని ముందే పేర్కొనడం తప్పనిసరి.</li>
        <li><strong><code>playsinline</code>:</strong> ఐఫోన్ (iOS Safari) యూజర్లు వీడియో ప్లే చేసినప్పుడు అది బలవంతంగా స్క్రీన్ మొత్తం ఫుల్‌స్క్రీన్ అయిపోకుండా, వెబ్‌పేజీ లోపలే నడవడానికి ఇది సహాయపడుతుంది.</li>
      </ul>

      <div class="code-block" style="margin-top:16px;">
        <div class="code-block-header">
          <span>HTML — పోస్టర్ మరియు రెస్పాన్సివ్ కంట్రోల్స్‌తో &lt;video&gt;</span>
          <div class="code-actions">
            <button class="try-btn">▶ Run in Online HTML Editor</button>
          </div>
        </div>
        <pre><code class="language-html">&lt;video width="640" height="360" 
       controls 
       poster="https://images.unsplash.com/photo-1536240478700-b869070f9279?w=640" 
       preload="metadata" 
       playsinline 
       style="max-width: 100%; height: auto; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.15);"&gt;
  &lt;!-- ఆధునిక లైట్-వెయిట్ WebM --&gt;
  &lt;source src="https://www.w3schools.com/html/mov_bbb.webm" type="video/webm"&gt;
  &lt;!-- ప్రామాణిక MP4 --&gt;
  &lt;source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4"&gt;
  మీ బ్రౌజర్ HTML5 వీడియోను సపోర్ట్ చేయదు.
&lt;/video&gt;</code></pre>
      </div>
    </div>

    <!-- SECTION 6 -->
    <div class="section-title"><span class="num">6</span>Autoplay పాలసీ &amp; బ్రౌజర్ ఆంక్షలు (Muted Autoplay)</div>
    <div class="section-body">
      <p>వెబ్‌సైట్ ఓపెన్ చేయగానే సడన్‌గా పెద్ద శబ్దంతో పాట లేదా ప్రకటన ప్లే అయితే యూజర్లకు ఎంత చిరాకు కలుగుతుందో గూగుల్ క్రోమ్ మరియు ఆపిల్ సఫారీ గ్రహించాయి. అందుకే 2018 నుండి బ్రౌజర్లు <strong>సౌండ్‌తో కూడిన ఆటోప్లేని (Unmuted Autoplay) కఠినంగా నిషేధించాయి!</strong></p>

      <div class="callout callout-warning" style="margin-top:12px;">
        <span class="callout-icon">⚠️</span>
        <div>
          <strong>గోల్డెన్ రూల్ — కేవలం నిశ్శబ్దంగా ఉంటేనే ఆటోప్లే అవుతుంది!</strong><br>
          మీరు కేవలం <code>autoplay</code> అని రాస్తే క్రోమ్ బ్రౌజర్ వీడియోను ప్లే చేయకుండా ఆపేస్తుంది. కానీ <code>autoplay muted</code> అని రాస్తే — ఎటువంటి యూజర్ ఇంటరాక్షన్ లేకుండానే వీడియో సైలెంట్‌గా దానంతట అదే ప్లే అవ్వడం మొదలవుతుంది!
        </div>
      </div>

      <div class="code-block" style="margin-top:16px;">
        <div class="code-block-header">
          <span>HTML — హీరో సెక్షన్ బ్యాక్‌గ్రౌండ్ వీడియో (Muted Loop Autoplay)</span>
          <div class="code-actions">
            <button class="try-btn">▶ Run in Online HTML Editor</button>
          </div>
        </div>
        <pre><code class="language-html">&lt;!-- బ్యాక్‌గ్రౌండ్ వీడియో బ్యానర్: సైలెంట్, లూప్, ఆటోప్లే --&gt;
&lt;video autoplay muted loop playsinline style="width: 100%; height: 300px; object-fit: cover;"&gt;
  &lt;source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4"&gt;
&lt;/video&gt;</code></pre>
      </div>
    </div>

    <!-- SECTION 7 -->
    <div class="section-title"><span class="num">7</span>సబ్‌టైటిల్స్ &amp; క్యాప్షన్లు: &lt;track&gt; మరియు WebVTT (.vtt)</div>
    <div class="section-body">
      <p>వినే శక్తి లోపించిన వ్యక్తులకు (Deaf and Hard of Hearing) లేదా బస్సు/రైలులో ప్రయాణిస్తూ సౌండ్ లేకుండా వీడియో చూసేవారికి <strong>సబ్‌టైటిల్స్ (Subtitles / Closed Captions)</strong> అత్యవసరం. దీనికోసం HTML5 లో <strong><code>&lt;track&gt;</code></strong> ఎలిమెంట్‌ను ఉపయోగిస్తాం.</p>

      <p>సబ్‌టైటిల్స్ సమాచారాన్ని <strong>WebVTT (.vtt)</strong> అనే ప్రత్యేక టెక్స్ట్ ఫైల్ రూపంలో రాయాలి:</p>

      <div class="diagram-box">
  WebVTT ఫైల్ ఫార్మాట్ (subtitles-te.vtt):
  ┌─────────────────────────────────────────────────────────────┐
  │ WEBVTT                                                      │
  │                                                             │
  │ 1                                                           │
  │ 00:00:01.000 --&gt; 00:00:04.000                               │
  │ నమస్కారం! అవర్ కంపైలర్ కు స్వాగతం.                           │
  │                                                             │
  │ 2                                                           │
  │ 00:00:04.500 --&gt; 00:00:08.000                               │
  │ ఈరోజు మనం HTML5 మల్టీమీడియా గురించి నేర్చుకుందాం.           │
  └─────────────────────────────────────────────────────────────┘
      </div>

      <div class="code-block" style="margin-top:16px;">
        <div class="code-block-header">
          <span>HTML — బహుళ భాషా సబ్‌టైటిల్స్‌తో వీడియో</span>
          <div class="code-actions">
            <button class="try-btn">▶ Run in Online HTML Editor</button>
          </div>
        </div>
        <pre><code class="language-html">&lt;video controls width="600"&gt;
  &lt;source src="movie.mp4" type="video/mp4"&gt;
  
  &lt;!-- తెలుగు సబ్‌టైటిల్స్ (డిఫాల్ట్‌గా ఆన్) --&gt;
  &lt;track src="subtitles-te.vtt" kind="subtitles" srclang="te" label="తెలుగు" default&gt;
  
  &lt;!-- ఇంగ్లీష్ సబ్‌టైటిల్స్ --&gt;
  &lt;track src="subtitles-en.vtt" kind="subtitles" srclang="en" label="English"&gt;
&lt;/video&gt;</code></pre>
      </div>
    </div>

    <!-- SECTION 8 -->
    <div class="section-title"><span class="num">8</span>&lt;iframe&gt; ఎలిమెంట్: ఇన్-లైన్ ఫ్రేమ్స్ (Inline Frames)</div>
    <div class="section-body">
      <p><code>&lt;iframe&gt;</code> (Inline Frame) అనేది మీ వెబ్‌పేజీ లోపల మరొక పూర్తి స్థాయి HTML వెబ్‌పేజీని ఒక చిన్న విండో లాగా అమర్చడానికి (Embed చేయడానికి) ఉపయోగించే ట్యాగ్.</p>

      <p><strong>వాస్తవ ప్రపంచంలో &lt;iframe&gt; ఎక్కడెక్కడ వాడతారు?</strong></p>
      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.7;">
        <li>యూట్యూబ్ (YouTube) లేదా విమియో వీడియోలను వెబ్‌సైట్‌లో చూపించడానికి.</li>
        <li>గూగుల్ మ్యాప్స్ (Google Maps) లొకేషన్‌ను కాంటాక్ట్ పేజీలో పొందుపరచడానికి.</li>
        <li>పేమెంట్ గేట్‌వేలు (Razorpay, Stripe) లేదా సర్వే ఫారాలు (Google Forms).</li>
        <li>ట్విట్టర్/ఎక్స్ ట్వీట్లు లేదా ఇన్‌స్టాగ్రామ్ పోస్ట్‌లను ఎంబెడ్ చేయడానికి.</li>
      </ul>

      <div class="code-block">
        <div class="code-block-header">
          <span>HTML — యూట్యూబ్ వీడియో ఎంబెడ్ కోడ్</span>
          <div class="code-actions">
            <button class="try-btn">▶ Run in Online HTML Editor</button>
          </div>
        </div>
        <pre><code class="language-html">&lt;!-- యూట్యూబ్ రెస్పాన్సివ్ ఐఫ్రేమ్ --&gt;
&lt;iframe width="560" height="315" 
        src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
        title="యూట్యూబ్ వీడియో ప్లేయర్" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        referrerpolicy="strict-origin-when-cross-origin" 
        allowfullscreen 
        style="max-width: 100%; border-radius: 8px;"&gt;
&lt;/iframe&gt;</code></pre>
      </div>
    </div>

    <!-- SECTION 9 -->
    <div class="section-title"><span class="num">9</span>ఐఫ్రేమ్ భద్రత: sandbox &amp; loading="lazy" ఆప్టిమైజేషన్</div>
    <div class="section-body">
      <p>ఐఫ్రేమ్స్ వాడేటప్పుడు భద్రత చాలా సున్నితమైన అంశం. ఒకవేళ మీరు అనుమానాస్పద లేదా హానికరమైన థర్డ్-పార్టీ వెబ్‌సైట్‌ను మీ పేజీలో ఐఫ్రేమ్ ద్వారా చూపిస్తే, ఆ సైట్ మాల్వేర్ రన్ చేయడం లేదా మీ యూజర్ పాస్‌వర్డ్‌లను దొంగిలించడానికి ప్రయత్నించవచ్చు (Clickjacking / XSS Attacks).</p>

      <p>దీనిని అరికట్టడానికి HTML5 లో <strong><code>sandbox</code></strong> ఆట్రిబ్యూట్ వచ్చింది:</p>
      <div class="callout callout-danger" style="margin-top:10px; background:#fef2f2; border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px;">
        <strong style="color:#b91c1c;">🛡️ sandbox ఆట్రిబ్యూట్ మ్యాజిక్:</strong><br>
        మీరు కేవలం <code>&lt;iframe sandbox src="..."&gt;</code> అని రాస్తే — ఆ ఐఫ్రేమ్ లోపల జావాస్క్రిప్ట్ రన్ అవ్వదు, పాపప్ విండోలు ఓపెన్ కావు, ఫారాలు సబ్మిట్ కావు, కుకీలు చదవలేరు! అవసరమైన అనుమతులను మాత్రమే మనం ప్రత్యేకంగా ఇచ్చుకోవాలి:
        <ul style="margin-top:8px; margin-left:18px;">
          <li><code>allow-scripts</code>: జావాస్క్రిప్ట్ రన్ అవ్వడానికి మాత్రమే అనుమతి.</li>
          <li><code>allow-same-origin</code>: సెషన్ కుకీలు చదవడానికి అనుమతి.</li>
          <li><code>allow-forms</code>: ఫారాలు సబ్మిట్ కావడానికి అనుమతి.</li>
        </ul>
      </div>

      <p style="margin-top:14px;"><strong>loading="lazy" తో పేజీ స్పీడ్ పెంచడం:</strong></p>
      <p>గూగుల్ మ్యాప్స్ లేదా యూట్యూబ్ ఐఫ్రేమ్స్ చాలా హెవీగా ఉంటాయి (దాదాపు 1MB డేటా). పేజీ దిగువన ఉండే ఐఫ్రేమ్‌కు <strong><code>loading="lazy"</code></strong> ఇస్తే — యూజర్ పేజీ కిందికి స్క్రోల్ చేసేవరకు ఆ ఐఫ్రేమ్ లోడ్ అవ్వదు. దీనివల్ల వెబ్‌సైట్ రాకెట్ లాగా ఓపెన్ అవుతుంది!</p>

      <div class="code-block">
        <div class="code-block-header">
          <span>HTML — అత్యంత సురక్షితమైన రెస్పాన్సివ్ మ్యాప్ ఐఫ్రేమ్</span>
          <div class="code-actions">
            <button class="try-btn">▶ Run in Online HTML Editor</button>
          </div>
        </div>
        <pre><code class="language-html">&lt;iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.3!2d78.38!3d17.44" 
        width="600" height="400" 
        style="border:0; width:100%; max-width:600px; border-radius:8px;" 
        loading="lazy" 
        referrerpolicy="no-referrer-when-downgrade" 
        title="హైదరాబాద్ ఆఫీస్ లొకేషన్"&gt;
&lt;/iframe&gt;</code></pre>
      </div>
    </div>

    <!-- SECTION 10 -->
    <div class="section-title"><span class="num">10</span>ఆడియో &amp; వీడియో లైవ్ ఆర్కిటెక్చర్ సమ్మరీ</div>
    <div class="section-body">
      <p>ఒక ఆధునిక వెబ్ మల్టీమీడియా డాక్యుమెంట్ ఏయే అంశాలను ఏ క్రమంలో కలిగి ఉండాలో క్రింది డయాగ్రమ్ స్పష్టం చేస్తుంది:</p>

      <div class="diagram-box">
  ┌────────────────────────────── &lt;video&gt; ──────────────────────────────┐
  │                                                                     │
  │   width="800"  height="450"  controls  poster="thumb.jpg"           │
  │                                                                     │
  │   ├── &lt;source src="clip.webm" type="video/webm"&gt;  (ఆధునిక ఫార్మాట్) │
  │   ├── &lt;source src="clip.mp4"  type="video/mp4"&gt;   (గ్లోబల్ ఫాల్‌బ్యాక్)│
  │   │                                                                 │
  │   ├── &lt;track src="sub-te.vtt" kind="subtitles" srclang="te"&gt;        │
  │   ├── &lt;track src="sub-en.vtt" kind="subtitles" srclang="en"&gt;        │
  │   │                                                                 │
  │   └── "మీ బ్రౌజర్ వీడియోను సపోర్ట్ చేయదు..." (అల్టిమేట్ టెక్స్ట్)    │
  └─────────────────────────────────────────────────────────────────────┘
      </div>
    </div>

    <!-- SECTION 11 -->
    <div class="section-title"><span class="num">11</span>బిగినర్స్ చేసే టాప్ 5 పొరపాట్లు &amp; పరిష్కారాలు</div>
    <div class="section-body">
      <div style="display:flex; flex-direction:column; gap:16px;">
        <div style="background:var(--bg2); border:1px solid #fecaca; border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px;">
          <strong style="color:#b91c1c;">1. తప్పు: controls ఆట్రిబ్యూట్ ఇవ్వడం మర్చిపోవడం</strong>
          <p style="margin-top:6px; color:var(--text2); font-size:14px;"><code>&lt;audio src="song.mp3"&gt;&lt;/audio&gt;</code> అని రాసి పేజీ ఓపెన్ చేస్తే ఏమీ కనిపించదు. <code>controls</code> లేకపోతే బ్రౌజర్ ప్లేయర్ ఇంటర్‌ఫేస్‌ను చూపించదు.</p>
        </div>

        <div style="background:var(--bg2); border:1px solid #fecaca; border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px;">
          <strong style="color:#b91c1c;">2. తప్పు: muted లేకుండా కేవలం autoplay రాయడం</strong>
          <p style="margin-top:6px; color:var(--text2); font-size:14px;">సౌండ్‌తో ఆటోప్లే చేయాలని <code>&lt;video autoplay&gt;</code> రాస్తే క్రోమ్ బ్రౌజర్ దానిని బ్లాక్ చేసి ఆపేస్తుంది. ఆటోప్లే కావాలంటే ఖచ్చితంగా <code>&lt;video autoplay muted&gt;</code> అని రాయాలి.</p>
        </div>

        <div style="background:var(--bg2); border:1px solid #fecaca; border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px;">
          <strong style="color:#b91c1c;">3. తప్పు: poster థంబ్‌నెయిల్ ఇవ్వకపోవడం</strong>
          <p style="margin-top:6px; color:var(--text2); font-size:14px;">పోస్టర్ లేకపోతే ఇంటర్నెట్ స్లోగా ఉన్నప్పుడు యూజర్‌కు నల్లటి ఖాళీ డబ్బా కనిపిస్తుంది. ఎల్లప్పుడూ ఆకర్షణీయమైన <code>poster="image.webp"</code> ఇవ్వడం మంచిది.</p>
        </div>

        <div style="background:var(--bg2); border:1px solid #fecaca; border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px;">
          <strong style="color:#b91c1c;">4. తప్పు: &lt;iframe&gt; కి title ఆట్రిబ్యూట్ ఇవ్వకపోవడం</strong>
          <p style="margin-top:6px; color:var(--text2); font-size:14px;">Accessibility (a11y) ప్రమాణాల ప్రకారం ప్రతి ఐఫ్రేమ్‌కూ <code>title="గూగుల్ మ్యాప్స్"</code> ఇవ్వాలి. లేకపోతే స్క్రీన్ రీడర్స్ లోపం చూపిస్తాయి.</p>
        </div>

        <div style="background:var(--bg2); border:1px solid #fecaca; border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px;">
          <strong style="color:#b91c1c;">5. తప్పు: భారీ వీడియోలను నేరుగా స్వంత హోస్టింగ్‌లో అప్‌లోడ్ చేయడం</strong>
          <p style="margin-top:6px; color:var(--text2); font-size:14px;">100MB సైజున్న భారీ వీడియోలను మీ స్వంత సర్వర్‌లో పెడితే బ్యాండ్‌విడ్త్ అయిపోయి వెబ్‌సైట్ నెమ్మదిస్తుంది. పబ్లిక్ వీడియోలకు యూట్యూబ్/విమియో ఎంబెడ్స్ వాడటమే ఉత్తమ పద్ధతి.</p>
        </div>
      </div>
    </div>

    <!-- SECTION 12 (INTERACTIVE COLLAPSIBLE QUIZ) -->
    <div class="section-title"><span class="num">12</span>ఇంటరాక్టివ్ సెల్ఫ్-టెస్ట్ క్విజ్ (Interactive Quiz)</div>
    <div class="section-body">
      <p>ఈ అధ్యాయంలో మీరు నేర్చుకున్న విషయాలను స్వయంగా పరీక్షించుకోండి. ప్రతి ప్రశ్నను చదివి సమాధానం ఆలోచించిన తర్వాత "సమాధానం చూడండి" పై క్లిక్ చేయండి:</p>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:700; cursor:pointer; color:#059669;">
          ❓ ప్రశ్న 1: ఆధునిక బ్రౌజర్లలో వీడియో ఆటోమేటిక్‌గా ప్లే కావాలంటే ఏ రెండు ఆట్రిబ్యూట్‌లు తప్పనిసరి?
        </summary>
        <div style="margin-top:10px; color:var(--text2); font-size:14px; line-height:1.6;">
          <strong>సమాధానం:</strong> <code>autoplay</code> మరియు <code>muted</code>. యూజర్ చికాకు పడకుండా ఉండటానికి బ్రౌజర్లు కేవలం నిశ్శబ్దంగా (Muted) ఉండే వీడియోలకే ఆటోప్లే అనుమతినిస్తాయి.
        </div>
      </details>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:700; cursor:pointer; color:#059669;">
          ❓ ప్రశ్న 2: వీడియో లోడ్ అయ్యే వరకు థంబ్‌నెయిల్ ఇమేజ్‌ను చూపించడానికి ఏ ఆట్రిబ్యూట్ వాడాలి?
        </summary>
        <div style="margin-top:10px; color:var(--text2); font-size:14px; line-height:1.6;">
          <strong>సమాధానం:</strong> <code>poster="image.jpg"</code>. ఇది యూజర్ ప్లే బటన్ నొక్కకముందు కవర్ ఇమేజ్‌ను ప్రదర్శిస్తుంది.
        </div>
      </details>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:700; cursor:pointer; color:#059669;">
          ❓ ప్రశ్న 3: &lt;track&gt; ఎలిమెంట్‌తో సబ్‌టైటిల్స్ జోడించేటప్పుడు ఉపయోగించే స్టాండర్డ్ ఫైల్ ఫార్మాట్ ఏది?
        </summary>
        <div style="margin-top:10px; color:var(--text2); font-size:14px; line-height:1.6;">
          <strong>సమాధానం:</strong> <code>.vtt</code> (WebVTT - Web Video Text Tracks).
        </div>
      </details>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:700; cursor:pointer; color:#059669;">
          ❓ ప్రశ్న 4: థర్డ్-పార్టీ ఐఫ్రేమ్స్ నుండి వెబ్‌సైట్‌ను సురక్షితంగా ఉంచడానికి ఏ సెక్యూరిటీ ఆట్రిబ్యూట్ ఉపయోగపడుతుంది?
        </summary>
        <div style="margin-top:10px; color:var(--text2); font-size:14px; line-height:1.6;">
          <strong>సమాధానం:</strong> <code>sandbox</code>. ఇది హానికరమైన స్క్రిప్టులు, పాపప్స్ మరియు కుకీ యాక్సెస్‌ను అడ్డుకుంటుంది.
        </div>
      </details>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:700; cursor:pointer; color:#059669;">
          ❓ ప్రశ్న 5: preload="none" వాడటం వల్ల కలిగే ముఖ్యమైన ప్రయోజనం ఏమిటి?
        </summary>
        <div style="margin-top:10px; color:var(--text2); font-size:14px; line-height:1.6;">
          <strong>సమాధానం:</strong> యూజర్ ప్లే బటన్ నొక్కే వరకు ఆడియో/వీడియో ఫైల్ డౌన్‌లోడ్ కాకుండా ఆగుతుంది. దీనివల్ల వెబ్‌సైట్ ఓపెనింగ్ స్పీడ్ పెరగడమే కాకుండా, మొబైల్ డేటా భారీగా ఆదా అవుతుంది.
        </div>
      </details>
    </div>

    <!-- SECTION 13 (TRY BOX & SUMMARY) -->
    <div class="section-title"><span class="num">13</span>మీరే స్వయంగా Try చేయండి &amp; సారాంశం (Quick Summary)</div>
    <div class="section-body">
      <div class="try-box" style="margin-top:10px;">
        <div class="try-title">🚀 ఆడియో &amp; వీడియో ప్లేయర్‌ను మన HTML Editor లో లైవ్‌గా రన్ చేయండి</div>
        <p>పైన వివరించిన <code>audio</code>, <code>video</code>, <code>poster</code>, మరియు <code>iframe</code> కోడ్‌ను మన ఆన్‌లైన్ ఎడిటర్‌లో ఓపెన్ చేసి, విభిన్న కంట్రోల్స్ ఎలా పనిచేస్తున్నాయో లైవ్‌గా పరీక్షించండి!</p>
        <a class="run-btn" href="/online-html-editor.html" target="_blank">
          👉 Our Compiler లో HTML Editor try చేయండి
        </a>
      </div>

      <div style="margin-top:24px;">
        <h4 style="color:#059669; font-size:16px; margin-bottom:10px;">📌 క్విక్ సారాంశం (Key Takeaways):</h4>
        <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.7;">
          <li><strong>నేటివ్ ప్లేయర్స్:</strong> <code>&lt;audio&gt;</code> మరియు <code>&lt;video&gt;</code> ఫ్లాష్ అవసరం లేకుండా బ్రౌజర్‌లోనే నేరుగా నడుస్తాయి.</li>
          <li><strong>కంట్రోల్స్:</strong> ప్లే/పాజ్ బటన్లు కనిపించడానికి <code>controls</code> తప్పనిసరి.</li>
          <li><strong>ఫార్మాట్స్:</strong> ఆడియోకు <strong>MP3</strong>, వీడియోకు <strong>MP4</strong> &amp; <strong>WebM</strong> అంతర్జాతీయ ప్రమాణాలు.</li>
          <li><strong>Autoplay రూల్:</strong> కేవలం <code>muted</code> ఉంటేనే ఆటోప్లే పనిచేస్తుంది.</li>
          <li><strong>యాక్సెసిబిలిటీ:</strong> సబ్‌టైటిల్స్ కోసం <code>&lt;track kind="subtitles"&gt;</code> మరియు <code>.vtt</code> ఫైల్స్ వాడాలి.</li>
          <li><strong>ఐఫ్రేమ్స్:</strong> బాహ్య సైట్ల ఎంబెడ్స్ కోసం <code>&lt;iframe&gt;</code>, రక్షణ కోసం <code>sandbox</code>, వేగం కోసం <code>loading="lazy"</code>.</li>
        </ul>
      </div>

      <div style="margin-top:20px; padding:16px; background:var(--bg2); border-left:4px solid #10b981; border-radius:0 8px 8px 0;">
        <strong>తర్వాతి అధ్యాయంలో (Chapter 12 - Phase 03 ఫినాలే):</strong> మనం మొబైల్ ఆప్టిమైజేషన్‌లో అత్యంత కీలకమైన <strong>రెస్పాన్సివ్ వ్యూపోర్ట్ మెటా ట్యాగ్ (&lt;meta viewport&gt;), ఫెవికాన్స్ (Favicons, Apple Touch Icons) &amp; బ్రౌజర్ కలర్ థీమింగ్</strong> గురించి అద్భుతంగా నేర్చుకుందాం!
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

const targetFile = path.join(__dirname, '..', 'public', 'blog-html', '11-html-audio-video-and-embeds.html');
fs.writeFileSync(targetFile, fullPageHtml, 'utf8');
console.log('✅ Successfully generated deep high-value Chapter 11!');
console.log('Target file size:', fullPageHtml.length, 'characters');

