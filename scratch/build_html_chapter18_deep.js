const fs = require('fs');
const path = require('path');
const { LESSONS, buildSidebar } = require('./html_curriculum_data.js');

const lesson = LESSONS.find(l => l.num === 18);
const sidebarHtml = buildSidebar(18);

const chapterContentHtml = `
    <!-- BREADCRUMB -->
    <div class="breadcrumb">
      <a href="/">Home</a><span class="sep">›</span>
      <a href="/blog.html">Tutorials</a><span class="sep">›</span>
      <a href="/blog-html.html">HTML5 Masterclass</a><span class="sep">›</span>
      <span class="current">Chapter 18: వెబ్ యాక్సెసిబిలిటీ (a11y), WAI-ARIA రోల్స్, ల్యాండ్‌మార్క్స్ &amp; కీబోర్డ్ నావిగేషన్</span>
    </div>

    <!-- PAGE TITLE -->
    <h1 class="page-title">HTML5 వెబ్ యాక్సెసిబిలిటీ (a11y), WAI-ARIA రోల్స్, ల్యాండ్‌మార్క్స్ &amp; కీబోర్డ్ నావిగేషన్</h1>

    <!-- PAGE META BADGES -->
    <div class="page-meta">
      <span class="badge">🌐 Modern HTML5 (W3C/WHATWG)</span>
      <span class="badge">🟢 Chapter 18 of 20</span>
      <span class="badge">📂 Phase 05: అడ్వాన్స్‌డ్ మెటాడేటా, SEO, Accessibility &amp; Projects</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

    <!-- SUBTOPICS PILL BAR -->
    <div style="background:var(--bg3); border:1px solid var(--border); border-radius:8px; padding:10px 16px; margin-bottom:24px; font-size:13px; color:var(--text2); display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
      <span style="color:#10b981; font-weight:700;">📌 Covered in this chapter:</span>
      <span>WCAG 2.2 అంతర్జాతీయ ప్రమాణాలు · POUR సూత్రాలు · స్క్రీన్ రీడర్స్ &amp; Accessibility Tree · First Rule of ARIA · aria-label &amp; aria-labelledby · aria-hidden &amp; aria-expanded · tabindex ఫోకస్ కంట్రోల్ · Skip to Content టెక్నిక్ · బిగినర్స్ తప్పులు &amp; క్విజ్</span>
    </div>

    <!-- INTRO ACCENT BOX (Warm Ivory with Green Accent) -->
    <div class="intro-box">
      <p>ఒక ఆధునిక మెట్రో రైల్వే స్టేషన్‌ను లేదా ఒక ఆసుపత్రి భవనాన్ని నిర్మించేటప్పుడు ఇంజనీర్లు కేవలం సాధారణ మెట్లు మాత్రమే నిర్మించరు; వీల్‌చైర్ ఉపయోగించే దివ్యాంగుల కోసం ర్యాంప్‌లు (Ramps), లిఫ్టులు, మరియు అంధుల కోసం నేలపై స్పర్శతో నడిచే ప్రత్యేక పసుపు రంగు గీతలు (Tactile Paving) ఏర్పాటు చేస్తారు. ఒకవేళ భవనంలో కేవలం మెట్లు మాత్రమే ఉంటే — సమాజంలోని ఒక వర్గం ఆ భవనంలోకి అడుగుపెట్టలేరు కదా?</p>
      <p>డిజిటల్ ఇంటర్నెట్ ప్రపంచంలో వెబ్‌సైట్లు నిర్మించేటప్పుడు కూడా సరిగ్గా ఇదే మానవతా దృక్పథం వర్తిస్తుంది! ప్రపంచ ఆరోగ్య సంస్థ (WHO) నివేదిక ప్రకారం — ప్రపంచవ్యాప్తంగా దాదాపు 130 కోట్ల మందికి పైగా ప్రజలు వివిధ రకాల దృష్టి లోపాలు, వినికిడి లోపాలు, లేదా శారీరక వైకల్యాలతో జీవిస్తున్నారు. దృష్టి లోపం ఉన్నవారు కంప్యూటర్ స్క్రీన్‌ను కళ్ళతో చూసి మౌస్‌తో క్లిక్ చేయలేరు; <strong>స్క్రీన్ రీడర్ సాఫ్ట్‌వేర్ (NVDA, JAWS, VoiceOver)</strong> చదివే మాటలను వింటూ, కేవలం కీబోర్డ్ సహాయంతో మాత్రమే వెబ్‌సైట్‌ను ఉపయోగిస్తారు.</p>
      <p>ప్రతి ఒక్కరికీ సమానమైన డిజిటల్ అవకాశాలు కల్పించే ఈ ఇంజనీరింగ్ భావననే <strong>వెబ్ యాక్సెసిబిలిటీ (Web Accessibility లేదా a11y)</strong> అంటారు. W3C వారి WCAG అంతర్జాతీయ ప్రమాణాలు, <strong>WAI-ARIA రోల్స్, aria-label, aria-hidden, aria-expanded, మరియు tabindex ఫోకస్ మేనేజ్‌మెంట్</strong> లతో ప్రపంచ స్థాయి యాక్సెసిబుల్ వెబ్‌సైట్‌ను ఎలా నిర్మించాలో ఈ పద్దెనిమిదవ అధ్యాయంలో సమగ్రంగా నేర్చుకుందాం!</p>
    </div>

    <!-- SECTION 1 -->
    <div class="section-title"><span class="num">1</span>ఈ Chapter లో మీరు నేర్చుకునే అంశాలు</div>
    <div class="section-body">
      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.7;">
        <li><strong>a11y అంటే ఏమిటి:</strong> "Accessibility" పదంలో 'a' మరియు 'y' మధ్య ఉన్న 11 అక్షరాల సంక్షిప్త రూపం.</li>
        <li><strong>WCAG 4 ప్రాథమిక స్తంభాలు (POUR):</strong> Perceivable, Operable, Understandable, Robust.</li>
        <li><strong>స్క్రీన్ రీడర్స్ &amp; Accessibility Tree:</strong> బ్రౌజర్ HTML కోడ్‌ను దృష్టి లోపం ఉన్నవారి కోసం వాయిస్ మాటలుగా మార్చే అనాటమీ.</li>
        <li><strong>The First Rule of ARIA:</strong> "చెడ్డ ARIA కంటే అసలు ARIA లేకపోవడమే మంచిది" — నేటివ్ HTML5 సెమాంటిక్స్ ప్రాధాన్యత.</li>
        <li><strong>ARIA ల్యాండ్‌మార్క్స్ &amp; రోల్స్ (Roles):</strong> role="banner", role="navigation", role="alert", role="dialog".</li>
        <li><strong>ఆధునిక ARIA ఆట్రిబ్యూట్లు:</strong> aria-label, aria-labelledby, aria-describedby లతో ఐకాన్ బటన్లకు పేర్లు పెట్టడం.</li>
        <li><strong>స్టేట్ మేనేజ్‌మెంట్:</strong> aria-hidden="true" (అలంకారాలను దాచడం) మరియు aria-expanded (డ్రాప్‌డౌన్ స్టేటస్).</li>
        <li><strong>కీబోర్డ్ ఫోకస్ మేనేజ్‌మెంట్ (tabindex):</strong> tabindex="0", tabindex="-1", మరియు పాజిటివ్ సంఖ్యలు ఎందుకు వాడకూడదో నియమాలు.</li>
      </ul>
    </div>

    <!-- SECTION 2 -->
    <div class="section-title"><span class="num">2</span>వెబ్ యాక్సెసిబిలిటీ అంటే ఏమిటి? WCAG POUR సూత్రాలు</div>
    <div class="section-body">
      <p>W3C సంస్థ ప్రవేశపెట్టిన <strong>WCAG (Web Content Accessibility Guidelines)</strong> ప్రపంచవ్యాప్తంగా అన్ని దేశాల చట్టాలు (US లో ADA చట్టం, యూరప్‌లో EAA) తప్పనిసరి చేసిన అంతర్జాతీయ ప్రమాణం. ఇది 4 ప్రాథమిక సూత్రాలపై ఆధారపడి ఉంటుంది (POUR):</p>

      <div style="overflow-x:auto; margin: 16px 0;">
        <table class="tbl">
          <thead>
            <tr>
              <th>సూత్రం (Principle)</th>
              <th>అర్థం</th>
              <th>వాస్తవ ఉదాహరణ</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>1. Perceivable (గ్రహించదగినది)</strong></td>
              <td>సమాచారం కంటికి లేదా చెవికి స్పష్టంగా చేరాలి.</td>
              <td>ఫోటోలకు <code>alt</code> టెక్స్ట్, వీడియోలకు సబ్‌టైటిల్స్, మంచి కలర్ కాంట్రాస్ట్.</td>
            </tr>
            <tr>
              <td><strong>2. Operable (ఆపరేట్ చేయదగినది)</strong></td>
              <td>మౌస్ లేకపోయినా కేవలం కీబోర్డ్‌తోనే పూర్తి సైట్‌ను ఆపరేట్ చేయగలగాలి.</td>
              <td>స్పేస్‌బార్, ఎంటర్, మరియు Tab కీలతో బటన్లు, ఫారమ్‌లు పనిచేయడం.</td>
            </tr>
            <tr>
              <td><strong>3. Understandable (అర్థం చేసుకోదగినది)</strong></td>
              <td>కంటెంట్ మరియు నావిగేషన్ సులభంగా అర్థం కావాలి.</td>
              <td>స్పష్టమైన ఫారమ్ లేబుల్స్, అర్థమయ్యే ఎర్రర్ మెసేజ్‌లు, స్థిరమైన లేఅవుట్.</td>
            </tr>
            <tr>
              <td><strong>4. Robust (ధృడమైనది)</strong></td>
              <td>విభిన్న బ్రౌజర్లు మరియు స్క్రీన్ రీడర్ సాఫ్ట్‌వేర్లలో ఎటువంటి బగ్స్ లేకుండా పనిచేయాలి.</td>
              <td>సరైన సెమాంటిక్ HTML5 ట్యాగ్‌లు మరియు చెల్లుబాటు అయ్యే ARIA రోల్స్.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- SECTION 3 -->
    <div class="section-title"><span class="num">3</span>స్క్రీన్ రీడర్ ఎలా పనిచేస్తుంది? Accessibility Tree</div>
    <div class="section-body">
      <p>మనం కంటితో వెబ్‌సైట్ చూసినప్పుడు బ్రౌజర్ <strong>DOM Tree (Document Object Model)</strong> ను రెండర్ చేస్తుంది. కానీ ఒక స్క్రీన్ రీడర్ (ఉదా: NVDA లేదా Mac VoiceOver) వెబ్‌సైట్‌ను చదివేటప్పుడు బ్రౌజర్ అంతర్గతంగా <strong>Accessibility Tree (a11y Tree)</strong> ని నిర్మిస్తుంది:</p>

      <div class="diagram-box">
  Accessibility Tree ఆర్కిటెక్చర్:
  ┌─────────────────────────────────────────────────────────────────────────────┐
  │  HTML Code: &lt;button aria-label="మెనూ తెరవండి"&gt; ☰ &lt;/button&gt;                  │
  │     ▼                                                                       │
  │  Accessibility Tree:                                                        │
  │     • Role: Button                                                          │
  │     • Name: "మెనూ తెరవండి"                                                  │
  │     • Focusable: Yes                                                        │
  │     ▼                                                                       │
  │  Screen Reader Voice: "బటన్, మెనూ తెరవండి, ప్రెస్ స్పేస్ టు యాక్టివేట్"      │
  └─────────────────────────────────────────────────────────────────────────────┘
      </div>

      <p style="margin-top:14px;">ఒకవేళ మీరు కేవలం <code>&lt;button&gt;☰&lt;/button&gt;</code> అని రాస్తే — స్క్రీన్ రీడర్ కేవలం "బటన్, అన్‌లేబుల్డ్" అని మాత్రమే చదువుతుంది; ఆ బటన్ ఎందుకుందో అంధుడైన యూజర్‌కు అస్సలు తెలియదు!</p>
    </div>

    <!-- SECTION 4 -->
    <div class="section-title"><span class="num">4</span>WAI-ARIA పరిచయం &amp; The First Rule of ARIA</div>
    <div class="section-body">
      <p><strong>WAI-ARIA (Web Accessibility Initiative - Accessible Rich Internet Applications)</strong> అనేది సాధారణ HTML ట్యాగ్‌లకు అదనపు అర్థాన్ని, రోల్స్‌ను మరియు స్టేటస్‌ను స్క్రీన్ రీడర్లకు అందించే ఒక ప్రత్యేకమైన W3C స్పెసిఫికేషన్.</p>

      <div class="callout callout-danger" style="margin-top:14px; background:#fef2f2; border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px;">
        <strong style="color:#b91c1c;">📜 The First Rule of ARIA (W3C అధికారిక మొదటి సూత్రం):</strong><br>
        <em>"ఒక పనిని నేటివ్ HTML5 ఎలిమెంట్‌తో చేయగలిగితే — అక్కడ ఎట్టి పరిస్థితుల్లోనూ ARIA వాడకండి!"</em><br><br>
        ఉదాహరణకు: <code>&lt;div role="button" tabindex="0"&gt;క్లిక్ చేయండి&lt;/div&gt;</code> అని కష్టపడి రాయడం కంటే, నేరుగా సహజసిద్ధమైన <strong><code>&lt;button&gt;క్లిక్ చేయండి&lt;/button&gt;</code></strong> రాయడమే 100 రెట్లు మేలు! నేటివ్ HTML5 బటన్‌కు కీబోర్డ్ సపోర్ట్, ఫోకస్, మరియు యాక్సెసిబిలిటీ ఉచితంగా లభిస్తాయి.
      </div>
    </div>

    <!-- SECTION 5 -->
    <div class="section-title"><span class="num">5</span>ARIA ల్యాండ్‌మార్క్స్ &amp; రోల్స్ (Roles)</div>
    <div class="section-body">
      <p>ఒక వెబ్‌పేజీలోని ప్రాంతాల యొక్క ప్రయోజనాన్ని స్క్రీన్ రీడర్లకు తెలియజేయడానికి <strong><code>role</code></strong> ఆట్రిబ్యూట్‌ను ఉపయోగిస్తాం:</p>

      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.8;">
        <li><strong><code>role="dialog"</code> / <code>aria-modal="true"</code>:</strong> పాపప్ మోడల్ విండోలకు ఉపయోగిస్తారు. ఇది ఓపెన్ అయినప్పుడు స్క్రీన్ రీడర్ బ్యాక్‌గ్రౌండ్ కంటెంట్‌ను విస్మరించి, కేవలం పాపప్ లోపలి సమాచారాన్ని మాత్రమే చదువుతుంది.</li>
        <li><strong><code>role="alert"</code>:</strong> అత్యవసర సందేశాల కోసం. పేజీ రీఫ్రెష్ కాకుండా సడన్‌గా వచ్చే ఎర్రర్‌లను (ఉదా: "పాస్‌వర్డ్ తప్పుగా ఉంది!") స్క్రీన్ రీడర్ యూజర్ చేసే పనిని ఆపి వెంటనే బిగ్గరగా చదివి వినిపిస్తుంది.</li>
        <li><strong><code>role="status"</code>:</strong> సాధారణ లైవ్ అప్‌డేట్స్ కోసం (ఉదా: "సేవ్ అవుతోంది...", "3 ఐటమ్స్ కార్ట్‌లో చేరాయి").</li>
      </ul>

      <div class="code-block" style="margin-top:16px;">
        <div class="code-block-header">
          <span>HTML — role="alert" అత్యవసర సందేశం</span>
        </div>
        <pre><code class="language-html">&lt;!-- లైవ్ ఎర్రర్ మెసేజ్: స్క్రీన్ రీడర్ వెంటనే చదువుతుంది --&gt;
&lt;div role="alert" style="background: #fef2f2; border: 1px solid #ef4444; color: #b91c1c; padding: 12px; border-radius: 6px;"&gt;
  🚨 ఎర్రర్: మీ మొబైల్ నంబర్ తప్పనిసరిగా 10 అంకెలు ఉండాలి!
&lt;/div&gt;</code></pre>
      </div>
    </div>

    <!-- SECTION 6 -->
    <div class="section-title"><span class="num">6</span>ARIA పేర్లు: aria-label, aria-labelledby, aria-describedby</div>
    <div class="section-body">
      <p>ఒక బటన్ లేదా ఇన్‌పుట్ బాక్స్‌కు స్క్రీన్ రీడర్ ఏ పేరు చదవాలో నిర్ణయించే 3 శక్తివంతమైన ఆట్రిబ్యూట్‌లు:</p>

      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.8;">
        <li><strong><code>aria-label="..."</code>:</strong> స్క్రీన్ మీద కనిపించే అక్షరాలు లేనప్పుడు (ఉదాహరణకు: కేవలం 🔍 ఐకాన్ లేదా ✖ క్లోజ్ బటన్ ఉన్నప్పుడు) ఆ బటన్‌కు అదృశ్య లేబుల్ ఇవ్వడానికి వాడతారు.</li>
        <li><strong><code>aria-labelledby="ID"</code>:</strong> పేజీలో ఇప్పటికే ఉన్న వేరే హెడ్డింగ్ లేదా టెక్స్ట్ యొక్క <code>id</code> ని తన పేరుగా స్వీకరిస్తుంది.</li>
        <li><strong><code>aria-describedby="ID"</code>:</strong> ఆ ఇన్‌పుట్ గురించిన అదనపు సహాయక వివరణను (Hint text) చదవడానికి లింక్ చేస్తుంది.</li>
      </ul>

      <div class="code-block" style="margin-top:16px;">
        <div class="code-block-header">
          <span>HTML — aria-label మరియు aria-describedby ఉదాహరణ</span>
          <div class="code-actions">
            <button class="try-btn">▶ Run in Online HTML Editor</button>
          </div>
        </div>
        <pre><code class="language-html">&lt;!-- 1. ఐకాన్ బటన్‌కు స్పష్టమైన అదృశ్య పేరు --&gt;
&lt;button aria-label="సెర్చ్ చేయండి" style="padding: 8px 12px; font-size: 16px;"&gt;
  🔍
&lt;/button&gt;

&lt;!-- 2. ఇన్‌పుట్ మరియు దాని సహాయక వివరణ లింక్ --&gt;
&lt;p&gt;
  &lt;label for="new-pass"&gt;కొత్త పాస్‌వర్డ్:&lt;/label&gt;&lt;br&gt;
  &lt;input type="password" id="new-pass" aria-describedby="pass-hint" style="padding: 8px; width: 300px;"&gt;&lt;br&gt;
  &lt;small id="pass-hint" style="color: #64748b;"&gt;
    సూచన: కనీసం ఒక పెద్ద అక్షరం, ఒక సంఖ్య, మరియు ఒక ప్రత్యేక గుర్తు ఉండాలి.
  &lt;/small&gt;
&lt;/p&gt;</code></pre>
      </div>
    </div>

    <!-- SECTION 7 -->
    <div class="section-title"><span class="num">7</span>స్టేట్ మేనేజ్‌మెంట్: aria-hidden &amp; aria-expanded</div>
    <div class="section-body">
      <p><strong>1. <code>aria-hidden="true"</code> (అలంకారాలను దాచడం):</strong></p>
      <p>వెబ్‌సైట్‌లో కేవలం అందం కోసం వాడే ఐకాన్లు, అలంకారిక ఈమోజీలు స్క్రీన్ రీడర్‌లకు అనవసరమైన గందరగోళాన్ని సృష్టిస్తాయి. అలాంటి వాటిని స్క్రీన్ రీడర్లకు కనబడకుండా పూర్తిగా దాచడానికి <code>aria-hidden="true"</code> వాడతాం:</p>

      <div class="code-block">
        <pre><code class="language-html">&lt;button&gt;
  &lt;span aria-hidden="true"&gt;🗑️&lt;/span&gt; డిలీట్ చేయండి
&lt;/button&gt;</code></pre>
      </div>

      <p style="margin-top:14px;"><strong>2. <code>aria-expanded="true | false"</code> (డ్రాప్‌డౌన్ స్టేటస్):</strong></p>
      <p>ఒక FAQ అకార్డియన్ లేదా మెనూ బటన్ నొక్కినప్పుడు — ఆ కంటెంట్ ప్రస్తుతం ఓపెన్ అయి ఉందా (<code>true</code>) లేక మూసివేయబడి ఉందా (<code>false</code>) అని అంధులైన యూజర్లకు తక్షణమే తెలియజేయడానికి ఇది ఉపయోగపడుతుంది.</p>

      <div class="code-block">
        <pre><code class="language-html">&lt;button aria-expanded="false" onclick="toggleMenu(this)"&gt;
  మొబైల్ నావిగేషన్ మెనూ
&lt;/button&gt;</code></pre>
      </div>
    </div>

    <!-- SECTION 8 -->
    <div class="section-title"><span class="num">8</span>కీబోర్డ్ ఫోకస్ మేనేజ్‌మెంట్: tabindex రహస్యాలు</div>
    <div class="section-body">
      <p>యూజర్ కీబోర్డ్‌పై 'Tab' కీ నొక్కుతూ వెళ్ళినప్పుడు ఏయే ఎలిమెంట్స్ ఫోకస్ అవ్వాలో <strong><code>tabindex</code></strong> ఆట్రిబ్యూట్ నిర్దేశిస్తుంది:</p>

      <div style="overflow-x:auto; margin: 16px 0;">
        <table class="tbl">
          <thead>
            <tr>
              <th>tabindex విలువ</th>
              <th>ప్రవర్తన &amp; అర్థం</th>
              <th>ఉపయోగపడే సందర్భం</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>tabindex="0"</code></td>
              <td>సహజసిద్ధమైన కీబోర్డ్ ట్యాబ్ క్రమంలో చేర్చుతుంది (Focusable).</td>
              <td>కస్టమ్ డివ్ లేదా స్పాన్‌ను కీబోర్డ్‌తో ఫోకస్ అయ్యేలా చేయడానికి.</td>
            </tr>
            <tr>
              <td><code>tabindex="-1"</code></td>
              <td>ట్యాబ్ క్రమం నుండి తొలగిస్తుంది; కానీ JavaScript ద్వారా <code>.focus()</code> చేయవచ్చు.</td>
              <td>మోడల్ పాపప్ ఓపెన్ అయినప్పుడు నేరుగా హెడ్డింగ్‌కు ఫోకస్ ఇవ్వడానికి.</td>
            </tr>
            <tr>
              <td><code>tabindex="1+"</code> (పాజిటివ్)</td>
              <td>❌ <strong>ఘోరమైన యాంటీ-పాటర్న్! ఎప్పుడూ వాడకూడదు!</strong></td>
              <td>సహజమైన పేజీ క్రమాన్ని తారుమారు చేసి యూజర్‌ను అయోమయానికి గురిచేస్తుంది.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- SECTION 9 -->
    <div class="section-title"><span class="num">9</span>"Skip to Content" లింక్ టెక్నిక్</div>
    <div class="section-body">
      <p>ప్రతి వెబ్‌పేజీ పైభాగంలో 30 నుండి 50 నావిగేషన్ లింకులు ఉంటాయి. కేవలం కీబోర్డ్ మాత్రమే వాడే ఒక వ్యక్తి ప్రతి పేజీ ఓపెన్ చేసినప్పుడల్లా 50 సార్లు Tab కీ నొక్కితే తప్ప అసలైన ఆర్టికల్ చదవలేకపోతే అది అతనికి నరకం లాంటి అనుభవం!</p>
      <p>దీన్ని నివారించడానికి ప్రపంచంలోని అన్ని ప్రొఫెషనల్ వెబ్‌సైట్లలో పేజీ మొట్టమొదటి లైన్‌లో ఒక <strong>"Skip to Content"</strong> లింక్ రాస్తారు:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span>HTML &amp; CSS — అదృశ్య Skip Link (ఫోకస్ అయినప్పుడు మాత్రమే కనిపిస్తుంది)</span>
          <div class="code-actions">
            <button class="try-btn">▶ Run in Online HTML Editor</button>
          </div>
        </div>
        <pre><code class="language-html">&lt;style&gt;
  /* సాధారణంగా స్క్రీన్ బయట దాగి ఉంటుంది */
  .skip-link {
    position: absolute;
    top: -100px;
    left: 10px;
    background: #10b981;
    color: #ffffff;
    padding: 10px 18px;
    font-weight: bold;
    border-radius: 6px;
    z-index: 9999;
    text-decoration: none;
    transition: top 0.2s ease;
  }
  /* Tab కీ నొక్కిన వెంటనే స్క్రీన్ పైకి దూసుకొస్తుంది! */
  .skip-link:focus {
    top: 10px;
  }
&lt;/style&gt;

&lt;!-- పేజీలో మొట్టమొదటి లింక్ --&gt;
&lt;a href="#main-content" class="skip-link"&gt;ప్రధాన విషయానికి వెళ్ళండి (Skip to Content)&lt;/a&gt;

&lt;header&gt;
  &lt;nav&gt;
    &lt;!-- 50 నావిగేషన్ లింకులు ఇక్కడ ఉంటాయి --&gt;
    &lt;a href="/"&gt;హోమ్&lt;/a&gt; · &lt;a href="/about"&gt;గురించి&lt;/a&gt; · &lt;a href="/contact"&gt;సంప్రదించండి&lt;/a&gt;
  &lt;/nav&gt;
&lt;/header&gt;

&lt;!-- యూజర్ ఇక్కడికి నేరుగా జంప్ అవుతాడు! --&gt;
&lt;main id="main-content" tabindex="-1"&gt;
  &lt;h1&gt;ఈనాటి ప్రధాన వ్యాసం&lt;/h1&gt;
  &lt;p&gt;ఆర్టికల్ పూర్తి వివరాలు...&lt;/p&gt;
&lt;/main&gt;</code></pre>
      </div>
    </div>

    <!-- SECTION 10 -->
    <div class="section-title"><span class="num">10</span>ఆధునిక ARIA ఆట్రిబ్యూట్ల సమగ్ర గైడ్ పట్టిక</div>
    <div class="section-body">
      <p>W3C ARIA ఆట్రిబ్యూట్ల శీఘ్ర మార్గదర్శిని:</p>

      <div style="overflow-x:auto; margin: 16px 0;">
        <table class="tbl">
          <thead>
            <tr>
              <th>ఆట్రిబ్యూట్</th>
              <th>లక్ష్యం</th>
              <th>సరైన ఉదాహరణ</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>aria-label</code></td>
              <td>కంటికి టెక్స్ట్ లేని ఎలిమెంట్‌కు అదృశ్య పేరు ఇవ్వడం.</td>
              <td><code>&lt;button aria-label="కార్ట్‌కు జోడించండి"&gt;🛒&lt;/button&gt;</code></td>
            </tr>
            <tr>
              <td><code>aria-hidden</code></td>
              <td>స్క్రీన్ రీడర్ నుండి అలంకారాలను దాచడం.</td>
              <td><code>&lt;span aria-hidden="true"&gt;✨&lt;/span&gt;</code></td>
            </tr>
            <tr>
              <td><code>aria-expanded</code></td>
              <td>డ్రాప్‌డౌన్ లేదా అకార్డియన్ ఓపెన్/క్లోజ్ స్టేట్.</td>
              <td><code>&lt;button aria-expanded="true"&gt;</code></td>
            </tr>
            <tr>
              <td><code>aria-live</code></td>
              <td>పేజీ మారకుండా వచ్చే డైనమిక్ లైవ్ కంటెంట్ అప్‌డేట్స్.</td>
              <td><code>&lt;div aria-live="polite"&gt;</code></td>
            </tr>
            <tr>
              <td><code>aria-current</code></td>
              <td>నావిగేషన్‌లో ప్రస్తుతం యాక్టివ్‌గా ఉన్న పేజీని సూచించడం.</td>
              <td><code>&lt;a href="/home" aria-current="page"&gt;హోమ్&lt;/a&gt;</code></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- SECTION 11 -->
    <div class="section-title"><span class="num">11</span>బిగినర్స్ చేసే టాప్ 5 పొరపాట్లు &amp; పరిష్కారాలు</div>
    <div class="section-body">
      <div style="display:flex; flex-direction:column; gap:16px;">
        <div style="background:var(--bg2); border:1px solid #fecaca; border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px;">
          <strong style="color:#b91c1c;">1. తప్పు: ఐకాన్ బటన్లకు aria-label ఇవ్వకపోవడం</strong>
          <p style="margin-top:6px; color:var(--text2); font-size:14px;">కేవలం <code>&lt;button&gt;❌&lt;/button&gt;</code> అని రాయడం. స్క్రీన్ రీడర్ దీనిని "బటన్, అన్‌లేబుల్డ్" అని చదువుతుంది. తప్పనిసరిగా <code>aria-label="విండో మూసివేయండి"</code> ఇవ్వాలి.</p>
        </div>

        <div style="background:var(--bg2); border:1px solid #fecaca; border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px;">
          <strong style="color:#b91c1c;">2. తప్పు: పాజిటివ్ tabindex (tabindex="1", "2") వాడటం</strong>
          <p style="margin-top:6px; color:var(--text2); font-size:14px;">పాజిటివ్ ట్యాబ్‌ఇండెక్స్ వాడటం వల్ల పేజీ యొక్క సహజ ప్రవాహం పూర్తిగా దెబ్బతింటుంది. కేవలం <code>tabindex="0"</code> లేదా <code>tabindex="-1"</code> మాత్రమే వాడాలి.</p>
        </div>

        <div style="background:var(--bg2); border:1px solid #fecaca; border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px;">
          <strong style="color:#b91c1c;">3. తప్పు: CSS లో outline: none; అని రాసి ఫోకస్ ఇండికేటర్‌ను తొలగించడం</strong>
          <p style="margin-top:6px; color:var(--text2); font-size:14px;">బ్లూ కలర్ ఔట్‌లైన్ నచ్చలేదని <code>*:focus { outline: none; }</code> అని రాయడం ఘోరమైన తప్పు. దీనివల్ల కీబోర్డ్ యూజర్ తాను పేజీలో ఎక్కడున్నాడో అస్సలు తెలుసుకోలేడు. కావాలంటే అందమైన కస్టమ్ <code>outline: 2px solid #10b981;</code> ఇవ్వాలి తప్ప పూర్తిగా తీసేయకూడదు.</p>
        </div>

        <div style="background:var(--bg2); border:1px solid #fecaca; border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px;">
          <strong style="color:#b91c1c;">4. తప్పు: అర్థం లేని చోట అనవసరంగా ARIA నింపేయడం (Overusing ARIA)</strong>
          <p style="margin-top:6px; color:var(--text2); font-size:14px;"><code>&lt;button role="button"&gt;</code> లేదా <code>&lt;nav role="navigation"&gt;</code> అని రాయడం రెండూ అనవసరం. నేటివ్ HTML5 ట్యాగ్‌లకు ఆ రోల్స్ బై-డిఫాల్ట్‌గా ఉంటాయి.</p>
        </div>

        <div style="background:var(--bg2); border:1px solid #fecaca; border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px;">
          <strong style="color:#b91c1c;">5. తప్పు: కలర్ కాంట్రాస్ట్ రేషియో (Contrast Ratio) తక్కువగా ఉండటం</strong>
          <p style="margin-top:6px; color:var(--text2); font-size:14px;">లేత బూడిద రంగు బ్యాక్‌గ్రౌండ్‌పై తెల్లటి అక్షరాలు రాయడం. WCAG ప్రమాణాల ప్రకారం సాధారణ టెక్స్ట్‌కు కనీసం <strong>4.5:1 కాంట్రాస్ట్ రేషియో</strong> ఉండాలి.</p>
        </div>
      </div>
    </div>

    <!-- SECTION 12 (INTERACTIVE COLLAPSIBLE QUIZ) -->
    <div class="section-title"><span class="num">12</span>ఇంటరాక్టివ్ సెల్ఫ్-టెస్ట్ క్విజ్ (Interactive Quiz)</div>
    <div class="section-body">
      <p>ఈ అధ్యాయంలో మీరు నేర్చుకున్న విషయాలను స్వయంగా పరీక్షించుకోండి. ప్రతి ప్రశ్నను చదివి సమాధానం ఆలోచించిన తర్వాత "సమాధానం చూడండి" పై క్లిక్ చేయండి:</p>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:700; cursor:pointer; color:#059669;">
          ❓ ప్రశ్న 1: "a11y" అంటే ఏమిటి? ఎందుకు అలా పిలుస్తారు?
        </summary>
        <div style="margin-top:10px; color:var(--text2); font-size:14px; line-height:1.6;">
          <strong>సమాధానం:</strong> "Accessibility" పదంలోని మొదటి అక్షరం 'A' మరియు చివరి అక్షరం 'Y' మధ్య మొత్తం 11 అక్షరాలు ఉన్నందున దీనిని సంక్షిప్తంగా "a11y" (ఏ-లెవెన్-వై) అని పిలుస్తారు.
        </div>
      </details>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:700; cursor:pointer; color:#059669;">
          ❓ ప్రశ్న 2: కేవలం ఐకాన్ మాత్రమే ఉన్న బటన్‌కు స్క్రీన్ రీడర్ కోసం పేరు ఇవ్వడానికి ఏ ఆట్రిబ్యూట్ వాడాలి?
        </summary>
        <div style="margin-top:10px; color:var(--text2); font-size:14px; line-height:1.6;">
          <strong>సమాధానం:</strong> <code>aria-label="బటన్ వివరణ"</code>.
        </div>
      </details>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:700; cursor:pointer; color:#059669;">
          ❓ ప్రశ్న 3: ఒక అలంకారిక బొమ్మను లేదా ఈమోజీని స్క్రీన్ రీడర్లు చదవకుండా దాచడానికి ఏ ఆట్రిబ్యూట్ వాడతారు?
        </summary>
        <div style="margin-top:10px; color:var(--text2); font-size:14px; line-height:1.6;">
          <strong>సమాధానం:</strong> <code>aria-hidden="true"</code>.
        </div>
      </details>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:700; cursor:pointer; color:#059669;">
          ❓ ప్రశ్న 4: ఒక సాధారణ &lt;div&gt; ని కీబోర్డ్ Tab క్రమంలో ఫోకస్ అయ్యేలా చేయడానికి ఏ tabindex ఇవ్వాలి?
        </summary>
        <div style="margin-top:10px; color:var(--text2); font-size:14px; line-height:1.6;">
          <strong>సమాధానం:</strong> <code>tabindex="0"</code>.
        </div>
      </details>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:700; cursor:pointer; color:#059669;">
          ❓ ప్రశ్న 5: కీబోర్డ్ యూజర్లు వందలాది నావిగేషన్ లింకులను దాటి నేరుగా ఆర్టికల్ వద్దకు వెళ్ళడానికి ఉపయోగించే టెక్నిక్ ఏది?
        </summary>
        <div style="margin-top:10px; color:var(--text2); font-size:14px; line-height:1.6;">
          <strong>సమాధానం:</strong> "Skip to Content" లింక్ టెక్నిక్.
        </div>
      </details>
    </div>

    <!-- SECTION 13 (TRY BOX & SUMMARY) -->
    <div class="section-title"><span class="num">13</span>మీరే స్వయంగా Try చేయండి &amp; సారాంశం (Quick Summary)</div>
    <div class="section-body">
      <div class="try-box" style="margin-top:10px;">
        <div class="try-title">🚀 పూర్తి యాక్సెసిబుల్ కాంపోనెంట్లను మన ఎడిటర్‌లో పరీక్షించండి</div>
        <p>పైన వివరించిన <code>skip-link</code>, <code>aria-label</code>, <code>role="alert"</code>, మరియు కీబోర్డ్ ఫోకస్ కోడ్‌ను మన ఆన్‌లైన్ ఎడిటర్‌లో ఓపెన్ చేసి మౌస్ ముట్టుకోకుండా కేవలం Tab, Spacebar లతో ఆపరేట్ చేసి నిజమైన a11y పవర్‌ను అనుభవించండి!</p>
        <a class="run-btn" href="/online-html-editor.html" target="_blank">
          👉 Our Compiler లో HTML Editor try చేయండి
        </a>
      </div>

      <div style="margin-top:24px;">
        <h4 style="color:#059669; font-size:16px; margin-bottom:10px;">📌 క్విక్ సారాంశం (Key Takeaways):</h4>
        <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.7;">
          <li><strong>a11y పవిత్రమైనది:</strong> ప్రతి ఒక్కరికీ సమానమైన వెబ్ అనుభవాన్ని అందించడం డెవలపర్ నైతిక బాధ్యత.</li>
          <li><strong>First Rule:</strong> నేటివ్ HTML5 ట్యాగ్‌లు ఉంటే ARIA అవసరం లేదు.</li>
          <li><strong>aria-label:</strong> ఐకాన్ బటన్లకు అదృశ్య అర్థాన్ని ఇస్తుంది.</li>
          <li><strong>aria-hidden:</strong> అలంకారాలను స్క్రీన్ రీడర్ల నుండి దాస్తుంది.</li>
          <li><strong>tabindex:</strong> కేవలం 0 మరియు -1 మాత్రమే వాడాలి; పాజిటివ్ సంఖ్యలు నిషేధం.</li>
        </ul>
      </div>

      <div style="margin-top:20px; padding:16px; background:var(--bg2); border-left:4px solid #10b981; border-radius:0 8px 8px 0;">
        <strong>తర్వాతి అధ్యాయంలో (Chapter 19):</strong> మనం ఆధునిక బ్రౌజర్ APIలు అయిన <strong>HTML5 వెబ్ స్టోరేజ్ (localStorage &amp; sessionStorage), నేటివ్ మోడల్ డైలాగ్ (&lt;dialog&gt;), కొలాప్సిబుల్ &lt;details&gt; &amp; డ్రాగ్ అండ్ డ్రాప్ (Drag &amp; Drop) API</strong> గురించి అత్యంత ఆసక్తికరంగా నేర్చుకుందాం!
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

const targetFile = path.join(__dirname, '..', 'public', 'blog-html', '18-html-accessibility-aria-and-screen-readers.html');
fs.writeFileSync(targetFile, fullPageHtml, 'utf8');
console.log('✅ Successfully generated deep high-value Chapter 18!');
console.log('Target file size:', fullPageHtml.length, 'characters');
