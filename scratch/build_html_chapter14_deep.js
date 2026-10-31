const fs = require('fs');
const path = require('path');
const { LESSONS, buildSidebar } = require('./html_curriculum_data.js');

const lesson = LESSONS.find(l => l.num === 14);
const sidebarHtml = buildSidebar(14);

const chapterContentHtml = `
    <!-- BREADCRUMB -->
    <div class="breadcrumb">
      <a href="/">Home</a><span class="sep">›</span>
      <a href="/blog.html">Tutorials</a><span class="sep">›</span>
      <a href="/blog-html.html">HTML5 Masterclass</a><span class="sep">›</span>
      <span class="current">Chapter 14: మోడరన్ ఇన్‌పుట్ టైప్స్: text, email, password, number, date, range, color</span>
    </div>

    <!-- PAGE TITLE -->
    <h1 class="page-title">HTML5 మోడరన్ ఇన్‌పుట్ టైప్స్: text, email, password, number, date, range, color &amp; inputmode</h1>

    <!-- PAGE META BADGES -->
    <div class="page-meta">
      <span class="badge">🌐 Modern HTML5 (W3C/WHATWG)</span>
      <span class="badge">🟢 Chapter 14 of 20</span>
      <span class="badge">📂 Phase 04: ఫారమ్స్, ఇన్‌పుట్స్ &amp; క్లయింట్-సైడ్ వాలిడేషన్</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

    <!-- SUBTOPICS PILL BAR -->
    <div style="background:var(--bg3); border:1px solid var(--border); border-radius:8px; padding:10px 16px; margin-bottom:24px; font-size:13px; color:var(--text2); display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
      <span style="color:#10b981; font-weight:700;">📌 Covered in this chapter:</span>
      <span>HTML5 ఇన్‌పుట్ రకాలు · email, tel &amp; url నేటివ్ వాలిడేషన్ · మొబైల్ inputmode కీబోర్డ్ కంట్రోల్ · min, max, step తో number &amp; range · date &amp; time క్యాలెండర్ పికర్స్ · color &amp; file అప్‌లోడ్స్ · readonly vs disabled · బిగినర్స్ తప్పులు &amp; క్విజ్</span>
    </div>

    <!-- INTRO ACCENT BOX (Warm Ivory with Green Accent) -->
    <div class="intro-box">
      <p>2014 కంటే ముందు పాత HTML4 రోజుల్లో వెబ్‌లో ఒక తీవ్రమైన అసౌకర్యం ఉండేది: డేటాను స్వీకరించడానికి కేవలం ఒకే ఒక్క ఇన్‌పుట్ ట్యాగ్ ఉండేది — అదే <code>type="text"</code>! యూజర్ ఈమెయిల్ టైప్ చేయాలన్నా, ఫోన్ నంబర్ నమోదు చేయాలన్నా, పుట్టిన తేదీ ఎంచుకోవాలన్నా, లేదా పాస్‌వర్డ్ రాయాలన్నా ప్రతిదానికీ ఒకటే సాధారణ టెక్స్ట్‌బాక్స్ కనిపించేది.</p>
      <p>యూజర్ టైప్ చేసిన ఈమెయిల్‌లో "@" గుర్తు ఉందో లేదో తనిఖీ చేయడానికి, లేదా నంబర్ ఫీల్డ్‌లో అక్షరాలు టైప్ చేయకుండా ఆపడానికి డెవలపర్లు వందల లైన్ల భారీ జావాస్క్రిప్ట్ కోడ్ రాయాల్సి వచ్చేది. వీటన్నింటికీ మించి — స్మార్ట్‌ఫోన్లలో ఫోన్ నంబర్ కొట్టేటప్పుడు కూడా సాధారణ అక్షరాల పెద్ద కీబోర్డే ఓపెన్ అయ్యేది; యూజర్లు నంబర్ ప్యాడ్ కోసం పదే పదే మోడ్ మార్చుకోవాల్సి వచ్చేది!</p>
      <p>ఈ సమస్యలన్నింటికీ స్వస్తి పలుకుతూ HTML5 లో W3C వారు <strong>స్పెషలైజ్డ్ ఇన్‌పుట్ టైప్స్ (Specialized Modern Inputs)</strong> విప్లవాన్ని ప్రవేశపెట్టారు. కేవలం ఒక్క ఆట్రిబ్యూట్ మార్చడం ద్వారా — మొబైల్‌లో డయలర్ కీప్యాడ్ ఓపెన్ అయ్యేలా చేయవచ్చు, ఆటోమేటిక్ క్యాలెండర్ పాపప్ తీసుకురావచ్చు, కలర్ పికర్ చూపించవచ్చు, మరియు ఒక్క లైన్ జావాస్క్రిప్ట్ లేకుండానే బ్రౌజర్ స్థాయి ఆటో-వాలిడేషన్‌ను సాధించవచ్చు! ఈ అధ్యాయంలో ఆధునిక ఇన్‌పుట్స్ అన్నింటినీ ప్రాక్టికల్ లైవ్ కోడింగ్‌తో నేర్చుకుందాం!</p>
    </div>

    <!-- SECTION 1 -->
    <div class="section-title"><span class="num">1</span>ఈ Chapter లో మీరు నేర్చుకునే అంశాలు</div>
    <div class="section-body">
      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.7;">
        <li><strong>HTML4 vs HTML5 ఇన్‌పుట్ పరిణామం:</strong> జావాస్క్రిప్ట్ పై భారం తగ్గించిన నేటివ్ బ్రౌజర్ ఎలిమెంట్స్.</li>
        <li><strong>ప్రాథమిక టెక్స్ట్ &amp; పాస్‌వర్డ్ ఇన్‌పుట్స్:</strong> type="text", type="password", maxlength, మరియు minlength.</li>
        <li><strong>ఆటోమేటిక్ వాలిడేషన్ ఇన్‌పుట్స్:</strong> type="email", type="url", మరియు type="search" ప్రత్యేకతలు.</li>
        <li><strong>మొబైల్ కీబోర్డ్ మ్యాజిక్ (inputmode):</strong> స్మార్ట్‌ఫోన్లలో న్యూమరిక్, డెసిమల్, లేదా ఈమెయిల్ కీబోర్డ్‌ను రప్పించే టెక్నిక్స్.</li>
        <li><strong>సంఖ్యాపరమైన కంట్రోల్స్:</strong> type="number" మరియు type="range" (స్లైడర్) లతో min, max, step వాడకం.</li>
        <li><strong>తేదీ &amp; సమయ పికర్లు:</strong> type="date", type="time", type="datetime-local", type="month", type="week".</li>
        <li><strong>కలర్ &amp; ఫైల్ సెలెక్టర్లు:</strong> type="color" కలర్ పికర్ వీల్ మరియు type="file" తో accept, multiple.</li>
        <li><strong>ఇన్‌పుట్ స్టేట్ మేనేజ్‌మెంట్:</strong> readonly vs disabled మధ్య గల సూక్ష్మ వ్యత్యాసాలు.</li>
      </ul>
    </div>

    <!-- SECTION 2 -->
    <div class="section-title"><span class="num">2</span>HTML4 vs HTML5 ఇన్‌పుట్ పరిణామం</div>
    <div class="section-body">
      <p>HTML5 ప్రవేశపెట్టిన ఇన్‌పుట్ టైప్స్ వెబ్ డెవలప్‌మెంట్‌ను ఎంత సులభతరం చేశాయో క్రింది పోలికలో చూడండి:</p>

      <div class="diagram-box">
  HTML4 (పాత పద్ధతి ❌):
  &lt;input type="text"&gt; ──► ప్రతిదానికీ ఒకే ట్యాగ్!
                          వాలిడేషన్ కోసం 50 లైన్ల JavaScript అవసరం!
                          మొబైల్‌లో ఎల్లప్పుడూ QWERTY ఆల్ఫాబెట్ కీబోర్డే వస్తుంది.

  HTML5 (ఆధునిక పద్ధతి ✅):
  &lt;input type="email"&gt;  ──► బ్రౌజర్ ఆటోమేటిక్‌గా @ ని చెక్ చేస్తుంది (Zero JS).
  &lt;input type="tel"&gt;    ──► మొబైల్‌లో డైరెక్ట్‌గా నంబర్ డయలర్ కీప్యాడ్ ఓపెన్ అవుతుంది.
  &lt;input type="date"&gt;   ──► నేటివ్ క్యాలెండర్ పాపప్ విండో ప్రత్యక్షమవుతుంది.
  &lt;input type="color"&gt;  ──► ఆపరేటింగ్ సిస్టమ్ కలర్ పికర్ వీల్ వస్తుంది.
      </div>
    </div>

    <!-- SECTION 3 -->
    <div class="section-title"><span class="num">3</span>టెక్స్ట్ &amp; పాస్‌వర్డ్ ఇన్‌పుట్స్ (text &amp; password)</div>
    <div class="section-body">
      <p>ఏదైనా సాధారణ వచనాన్ని (పేరు, నగరం, చిరునామా) సేకరించడానికి <code>type="text"</code>, మరియు రహస్య సమాచారాన్ని యూజర్ స్క్రీన్ పై ఇతరులు చూడకుండా నక్షత్రాలు (•••) గా దాచడానికి <code>type="password"</code> ఉపయోగిస్తాం.</p>

      <div class="code-block">
        <div class="code-block-header">
          <span>HTML — text మరియు password ఉదాహరణ</span>
          <div class="code-actions">
            <button class="try-btn">▶ Run in Online HTML Editor</button>
          </div>
        </div>
        <pre><code class="language-html">&lt;form style="max-width: 400px; padding: 16px; border: 1px solid #cbd5e1; border-radius: 8px;"&gt;
  &lt;!-- సాధారణ టెక్స్ట్ --&gt;
  &lt;label for="uname"&gt;యూజర్‌నేమ్ (కనిష్టంగా 3, గరిష్టంగా 15 అక్షరాలు):&lt;/label&gt;&lt;br&gt;
  &lt;input type="text" id="uname" name="username" minlength="3" maxlength="15" required 
         style="width: 100%; padding: 8px; margin: 6px 0 14px;"&gt;

  &lt;!-- రహస్య పాస్‌వర్డ్ --&gt;
  &lt;label for="pwd"&gt;రహస్య పాస్‌వర్డ్:&lt;/label&gt;&lt;br&gt;
  &lt;input type="password" id="pwd" name="password" minlength="8" required 
         placeholder="కనీసం 8 అక్షరాలు" 
         style="width: 100%; padding: 8px; margin-top: 6px;"&gt;
&lt;/form&gt;</code></pre>
      </div>

      <p style="margin-top:12px; font-size:14px; color:var(--text2);">
        💡 <code>minlength</code> మరియు <code>maxlength</code> ఆట్రిబ్యూట్‌లు యూజర్ ఎన్ని అక్షరాల లోపు టైప్ చేయాలో బ్రౌజర్ స్థాయిలో పరిమితి విధిస్తాయి.
      </p>
    </div>

    <!-- SECTION 4 -->
    <div class="section-title"><span class="num">4</span>ఆటోమేటిక్ వాలిడేషన్ ఇన్‌పుట్స్: email, url, search</div>
    <div class="section-body">
      <p>ఈ మూడు ఇన్‌పుట్ రకాలు ప్రత్యేకమైన సింటాక్స్ నియమాలను బ్రౌజర్‌కు పరిచయం చేస్తాయి:</p>

      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.8;">
        <li><strong><code>type="email"</code>:</strong> యూజర్ నమోదు చేసిన టెక్స్ట్‌లో ఈమెయిల్ ఫార్మాట్ (<code>name@domain.com</code>) ఉందో లేదో సబ్మిట్ చేసేటప్పుడు బ్రౌజర్ ఆటోమేటిక్‌గా వాలిడేట్ చేస్తుంది. తప్పుగా ఉంటే "దయచేసి సరైన ఈమెయిల్ ఇవ్వండి" అని ఎర్రర్ చూపిస్తుంది! అంతేకాకుండా మొబైల్‌లో కీబోర్డ్‌పై "@" మరియు ".com" బటన్లు ప్రత్యక్షమవుతాయి.</li>
        <li><strong><code>type="url"</code>:</strong> వెబ్‌సైట్ అడ్రస్‌లను స్వీకరించడానికి. ఇది తప్పనిసరిగా <code>http://</code> లేదా <code>https://</code> తో ప్రారంభమయ్యేలా చూస్తుంది.</li>
        <li><strong><code>type="search"</code>:</strong> సెర్చ్ బాక్సుల కోసం. యూజర్ ఏదైనా టైప్ చేసినప్పుడు బాక్స్ కుడివైపున వెంటనే టెక్స్ట్‌ను క్లియర్ చేసే చిన్న "X" బటన్ ఆటోమేటిక్‌గా వస్తుంది!</li>
      </ul>

      <div class="code-block" style="margin-top:16px;">
        <div class="code-block-header">
          <span>HTML — email, url మరియు search ఉదాహరణ</span>
          <div class="code-actions">
            <button class="try-btn">▶ Run in Online HTML Editor</button>
          </div>
        </div>
        <pre><code class="language-html">&lt;form style="max-width: 450px;"&gt;
  &lt;p&gt;
    &lt;label for="mail"&gt;అధికారిక ఈమెయిల్:&lt;/label&gt;&lt;br&gt;
    &lt;input type="email" id="mail" name="email" placeholder="student@gmail.com" required style="width:100%; padding:8px;"&gt;
  &lt;/p&gt;

  &lt;p&gt;
    &lt;label for="portfolio"&gt;మీ పోర్ట్‌ఫోలియో వెబ్‌సైట్ (URL):&lt;/label&gt;&lt;br&gt;
    &lt;input type="url" id="portfolio" name="website" placeholder="https://mywebsite.com" style="width:100%; padding:8px;"&gt;
  &lt;/p&gt;

  &lt;p&gt;
    &lt;label for="query"&gt;కోర్సును వెతకండి:&lt;/label&gt;&lt;br&gt;
    &lt;input type="search" id="query" name="q" placeholder="ఉదా: JavaScript..." style="width:100%; padding:8px;"&gt;
  &lt;/p&gt;
  
  &lt;button type="submit" style="background:#10b981; color:white; padding:8px 16px; border:none; border-radius:6px; cursor:pointer;"&gt;సబ్మిట్ చేయండి&lt;/button&gt;
&lt;/form&gt;</code></pre>
      </div>
    </div>

    <!-- SECTION 5 -->
    <div class="section-title"><span class="num">5</span>మొబైల్ కీబోర్డ్ మ్యాజిక్: type="tel" మరియు inputmode</div>
    <div class="section-body">
      <p>మొబైల్ ఫోన్లలో యూజర్ ఎక్స్‌పీరియన్స్ (Mobile UX) ను నిర్దేశించే అత్యంత విప్లవాత్మక ఫీచర్ ఇది!</p>

      <p><strong>1. <code>type="tel"</code>:</strong> ఫోన్ నంబర్ల కోసం వాడతారు. అయితే ప్రపంచంలో దేశాల వారీగా ఫోన్ నంబర్ల ఫార్మాట్లు వేర్వేరుగా ఉంటాయి కాబట్టి బ్రౌజర్ దీనికి ప్రత్యేకమైన సింటాక్స్ ఆంక్షలు విధించదు; కానీ మొబైల్‌లో నేరుగా <strong>డయలర్ నంబర్ ప్యాడ్</strong> ను తెరుస్తుంది.</p>

      <p><strong>2. <code>inputmode</code> ఆట్రిబ్యూట్:</strong> మీ ఇన్‌పుట్ ఏదైనప్పటికీ, మొబైల్ స్క్రీన్‌పై సరిగ్గా ఏ రకమైన కీబోర్డ్ రావాలో మీరు స్వయంగా శాసించవచ్చు!</p>

      <div style="overflow-x:auto; margin: 16px 0;">
        <table class="tbl">
          <thead>
            <tr>
              <th>inputmode విలువ</th>
              <th>మొబైల్‌లో కనిపించే కీబోర్డ్ రకం</th>
              <th>ఉపయోగపడే సందర్భం</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>inputmode="numeric"</code></td>
              <td>కేవలం 0 నుండి 9 అంకెలు మాత్రమే ఉన్న పిన్‌ప్యాడ్.</td>
              <td>బ్యాంక్ OTP, క్రెడిట్ కార్డ్ నంబర్, పిన్‌కోడ్.</td>
            </tr>
            <tr>
              <td><code>inputmode="decimal"</code></td>
              <td>నంబర్లతో పాటు చుక్క (డెసిమల్ పాయింట్ .) ఉన్న కీప్యాడ్.</td>
              <td>ధరలు (₹ 499.50), బరువు (65.4 kg), ఉష్ణోగ్రత.</td>
            </tr>
            <tr>
              <td><code>inputmode="tel"</code></td>
              <td>ఫోన్ డయలర్ (*, #, + లతో కూడిన నంబర్ ప్యాడ్).</td>
              <td>మొబైల్ మరియు ల్యాండ్‌లైన్ నంబర్లు.</td>
            </tr>
            <tr>
              <td><code>inputmode="email"</code></td>
              <td>@ మరియు . బటన్లతో కూడిన కీబోర్డ్.</td>
              <td>యూజర్ ఈమెయిల్ ఎంట్రీ.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="code-block">
        <div class="code-block-header">
          <span>HTML — inputmode తో పర్ఫెక్ట్ మొబైల్ OTP బాక్స్</span>
        </div>
        <pre><code class="language-html">&lt;!-- మొబైల్‌లో కేవలం నంబర్ కీప్యాడ్ మాత్రమే ఓపెన్ అవుతుంది --&gt;
&lt;label for="otp"&gt;6 అంకెల మొబైల్ OTP:&lt;/label&gt;&lt;br&gt;
&lt;input type="text" id="otp" name="otp" inputmode="numeric" maxlength="6" placeholder="123456" 
       style="font-size: 20px; letter-spacing: 8px; width: 180px; padding: 8px; text-align: center;"&gt;</code></pre>
      </div>
    </div>

    <!-- SECTION 6 -->
    <div class="section-title"><span class="num">6</span>సంఖ్యాపరమైన కంట్రోల్స్: type="number" &amp; type="range"</div>
    <div class="section-body">
      <p>సంఖ్యలతో కూడిన విలువలను స్వీకరించడానికి మరియు మార్చడానికి HTML5 రెండు అద్భుతమైన ఎలిమెంట్లను అందిస్తుంది:</p>

      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.8;">
        <li><strong><code>type="number"</code>:</strong> సంఖ్యలను టైప్ చేయడానికి లేదా బాక్స్ పక్కన ఉండే చిన్న పైకి/క్రిందికి బాణాల ద్వారా (Spinner Arrows) సంఖ్యను పెంచడానికి/తగ్గించడానికి ఉపయోగపడుతుంది.</li>
        <li><strong><code>type="range"</code>:</strong> ఒక స్లైడర్ బార్‌ను (Slider Bar) సృష్టిస్తుంది. వాల్యూమ్ పెంచడం, స్క్రీన్ బ్రైట్‌నెస్ మార్చడం, లేదా ధర ఫిల్టర్ (ఉదా: ₹ 500 నుండి ₹ 5000 వరకు) ఎంచుకోవడానికి ఇది సూపర్ అనుకూలం.</li>
      </ul>

      <p style="margin-top:14px;"><strong>వీటికి వాడే 3 గోల్డెన్ ఆట్రిబ్యూట్‌లు:</strong></p>
      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.7;">
        <li><code>min="సంఖ్య"</code>: అనుమతించబడే కనిష్ట విలువ.</li>
        <li><code>max="సంఖ్య"</code>: అనుమతించబడే గరిష్ట విలువ.</li>
        <li><code>step="సంఖ్య"</code>: ప్రతి క్లిక్‌కు ఎంత చొప్పున పెరగాలి/తగ్గాలి (ఉదా: <code>step="5"</code> లేదా దశాంశాల కోసం <code>step="0.5"</code>).</li>
      </ul>

      <div class="code-block" style="margin-top:16px;">
        <div class="code-block-header">
          <span>HTML — number మరియు range స్లైడర్ ఉదాహరణ</span>
          <div class="code-actions">
            <button class="try-btn">▶ Run in Online HTML Editor</button>
          </div>
        </div>
        <pre><code class="language-html">&lt;form style="max-width: 450px;"&gt;
  &lt;!-- నంబర్ ఇన్‌పుట్: వయస్సు --&gt;
  &lt;p&gt;
    &lt;label for="age"&gt;మీ వయస్సు (18 నుండి 60 వరకు):&lt;/label&gt;&lt;br&gt;
    &lt;input type="number" id="age" name="age" min="18" max="60" value="25" style="padding: 6px 10px;"&gt;
  &lt;/p&gt;

  &lt;!-- రేంజ్ స్లైడర్: బడ్జెట్ --&gt;
  &lt;p&gt;
    &lt;label for="budget"&gt;కోర్సు బడ్జెట్ పరిమితి (₹ 1,000 నుండి ₹ 20,000):&lt;/label&gt;&lt;br&gt;
    &lt;input type="range" id="budget" name="price" min="1000" max="20000" step="500" value="5000" style="width: 100%;"&gt;
  &lt;/p&gt;
&lt;/form&gt;</code></pre>
      </div>
    </div>

    <!-- SECTION 7 -->
    <div class="section-title"><span class="num">7</span>తేదీ మరియు సమయ ఎంపికలు (date, time, datetime-local)</div>
    <div class="section-body">
      <p>గతంలో వెబ్‌సైట్‌లో పుట్టిన తేదీ ఎంచుకోవడానికి 3 డ్రాప్‌డౌన్లు (రోజు, నెల, సంవత్సరం) లేదా భారీ jQuery/JavaScript క్యాలెండర్ ప్లగిన్లు పెట్టేవాళ్ళు. కానీ HTML5 లో కేవలం <code>type="date"</code> రాస్తే చాలు — ఆపరేటింగ్ సిస్టమ్ యొక్క అధికారిక క్యాలెండర్ విండో దానంతట అదే పాపప్ అవుతుంది!</p>

      <div style="overflow-x:auto; margin: 16px 0;">
        <table class="tbl">
          <thead>
            <tr>
              <th>ఇన్‌పుట్ టైప్</th>
              <th>ఫార్మాట్ &amp; వివరణ</th>
              <th>ఉదాహరణ ఉపయోగం</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>type="date"</code></td>
              <td>సంవత్సరం, నెల, రోజు (YYYY-MM-DD)</td>
              <td>పుట్టిన తేదీ, విమాన ప్రయాణ తేదీ.</td>
            </tr>
            <tr>
              <td><code>type="time"</code></td>
              <td>గంటలు, నిమిషాలు (HH:MM AM/PM)</td>
              <td>సినిమా షో సమయం, డాక్టర్ అపాయింట్‌మెంట్.</td>
            </tr>
            <tr>
              <td><code>type="datetime-local"</code></td>
              <td>తేదీ మరియు సమయం రెండూ కలిపి</td>
              <td>రైలు బయలుదేరే ఖచ్చితమైన తేదీ &amp; సమయం.</td>
            </tr>
            <tr>
              <td><code>type="month"</code></td>
              <td>కేవలం సంవత్సరం మరియు నెల (YYYY-MM)</td>
              <td>క్రెడిట్ కార్డ్ ఎక్స్‌పైరీ తేదీ.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="code-block">
        <div class="code-block-header">
          <span>HTML — క్యాలెండర్ మరియు సమయ పికర్లు</span>
          <div class="code-actions">
            <button class="try-btn">▶ Run in Online HTML Editor</button>
          </div>
        </div>
        <pre><code class="language-html">&lt;form style="max-width: 450px;"&gt;
  &lt;p&gt;
    &lt;label for="bday"&gt;పుట్టిన తేదీ:&lt;/label&gt;&lt;br&gt;
    &lt;input type="date" id="bday" name="birthday" min="1950-01-01" max="2026-12-31" style="padding: 6px;"&gt;
  &lt;/p&gt;

  &lt;p&gt;
    &lt;label for="slot"&gt;ఇంటర్వ్యూ సమయం:&lt;/label&gt;&lt;br&gt;
    &lt;input type="time" id="slot" name="interview_time" style="padding: 6px;"&gt;
  &lt;/p&gt;
&lt;/form&gt;</code></pre>
      </div>
    </div>

    <!-- SECTION 8 -->
    <div class="section-title"><span class="num">8</span>కలర్ &amp; ఫైల్ ఎంపికలు: type="color" &amp; type="file"</div>
    <div class="section-body">
      <p><strong>1. <code>type="color"</code> (కలర్ పికర్):</strong></p>
      <p>యూజర్ ఒక రంగును ఎంచుకోవడానికి ఈ ట్యాగ్ ఉపయోగపడుతుంది. క్లిక్ చేయగానే పూర్తి స్థాయి కలర్ పాలెట్ వీల్ ఓపెన్ అవుతుంది. ఇది ఎంచుకున్న రంగును <strong>హెక్స్ కోడ్ (ఉదా: <code>#10b981</code>)</strong> రూపంలో సర్వర్‌కు పంపుతుంది.</p>

      <p style="margin-top:14px;"><strong>2. <code>type="file"</code> (ఫైల్ అప్‌లోడ్):</strong></p>
      <p>యూజర్ తన కంప్యూటర్ లేదా మొబైల్ నుండి ఫోటోలు, రెజ్యూమ్ PDF లు లేదా డాక్యుమెంట్లను అప్‌లోడ్ చేయడానికి ఇది ఉపయోగపడుతుంది. దీనికి రెండు ముఖ్యమైన ఆట్రిబ్యూట్‌లు ఉంటాయి:</p>
      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.7;">
        <li><code>accept="image/*, .pdf"</code>: కేవలం ఫొటోలు లేదా PDF ఫైల్స్ మాత్రమే ఎంచుకునేలా ఫిల్టర్ చేస్తుంది.</li>
        <li><code>multiple</code>: యూజర్ ఒకేసారి బహుళ ఫైళ్లను (Multiple files) సెలెక్ట్ చేసుకోవడానికి అనుమతిస్తుంది.</li>
      </ul>

      <div class="code-block" style="margin-top:16px;">
        <div class="code-block-header">
          <span>HTML — కలర్ పికర్ మరియు ఫైల్ అప్‌లోడ్</span>
          <div class="code-actions">
            <button class="try-btn">▶ Run in Online HTML Editor</button>
          </div>
        </div>
        <pre><code class="language-html">&lt;form enctype="multipart/form-data" style="max-width: 450px;"&gt;
  &lt;!-- కలర్ పికర్ --&gt;
  &lt;p&gt;
    &lt;label for="favcolor"&gt;మీకు ఇష్టమైన వెబ్‌సైట్ థీమ్ రంగు:&lt;/label&gt;&lt;br&gt;
    &lt;input type="color" id="favcolor" name="theme_color" value="#10b981" style="width: 60px; height: 36px; cursor: pointer;"&gt;
  &lt;/p&gt;

  &lt;!-- ఫైల్ అప్‌లోడ్ --&gt;
  &lt;p&gt;
    &lt;label for="resume"&gt;మీ రెజ్యూమ్ అప్‌లోడ్ చేయండి (PDF లేదా DOCX మాత్రమే):&lt;/label&gt;&lt;br&gt;
    &lt;input type="file" id="resume" name="resume_doc" accept=".pdf, .docx" required style="margin-top: 6px;"&gt;
  &lt;/p&gt;
&lt;/form&gt;</code></pre>
      </div>

      <div class="callout callout-tip" style="margin-top:16px;">
        <span class="callout-icon">💡</span>
        <div>
          <strong>గుర్తుంచుకోండి:</strong> ఫైల్ అప్‌లోడ్ చేసేటప్పుడు <code>&lt;form&gt;</code> ట్యాగ్‌కు తప్పనిసరిగా <code>enctype="multipart/form-data"</code> మరియు <code>method="POST"</code> ఉండాలి! లేకపోతే కేవలం ఫైల్ పేరు మాత్రమే సర్వర్‌కు వెళ్తుంది తప్ప అసలైన ఫైల్ డేటా అప్‌లోడ్ అవ్వదు.
        </div>
      </div>
    </div>

    <!-- SECTION 9 -->
    <div class="section-title"><span class="num">9</span>ఆధునిక ఇన్‌పుట్ టైప్స్ సమగ్ర సారాంశ పట్టిక</div>
    <div class="section-body">
      <p>మనం నేర్చుకున్న అన్ని ఇన్‌పుట్ టైప్స్ ఒక్క చూపులో:</p>

      <div style="overflow-x:auto; margin: 16px 0;">
        <table class="tbl">
          <thead>
            <tr>
              <th>ఇన్‌పుట్ రకం (type)</th>
              <th>పనిచేసే విధానం</th>
              <th>ప్రత్యేక ఆట్రిబ్యూట్‌లు</th>
              <th>మొబైల్ ప్రవర్తన</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>text</code></td>
              <td>సాధారణ వచనం</td>
              <td>minlength, maxlength, pattern</td>
              <td>స్టాండర్డ్ QWERTY కీబోర్డ్</td>
            </tr>
            <tr>
              <td><code>password</code></td>
              <td>రహస్య అక్షరాల మాస్కింగ్ (•••)</td>
              <td>minlength, maxlength</td>
              <td>ఆటో-కరెక్ట్ మరియు హిస్టరీ ఆఫ్ అవుతుంది</td>
            </tr>
            <tr>
              <td><code>email</code></td>
              <td>ఈమెయిల్ సింటాక్స్ వాలిడేషన్</td>
              <td>multiple (కామాలతో ఈమెయిల్స్)</td>
              <td>@ మరియు .com బటన్లు వస్తాయి</td>
            </tr>
            <tr>
              <td><code>tel</code></td>
              <td>ఫోన్ నంబర్లు</td>
              <td>pattern</td>
              <td>డయలర్ నంబర్ ప్యాడ్ తెరుచుకుంటుంది</td>
            </tr>
            <tr>
              <td><code>number</code></td>
              <td>సంఖ్యా విలువలు</td>
              <td>min, max, step</td>
              <td>న్యూమరిక్ కీబోర్డ్ వస్తుంది</td>
            </tr>
            <tr>
              <td><code>range</code></td>
              <td>విజువల్ స్లైడర్ బార్</td>
              <td>min, max, step</td>
              <td>వేలితో స్లైడ్ చేసే బార్</td>
            </tr>
            <tr>
              <td><code>date</code></td>
              <td>క్యాలెండర్ తేదీ పికర్</td>
              <td>min, max (తేదీ పరిమితులు)</td>
              <td>మొబైల్ నేటివ్ డేట్ వీల్</td>
            </tr>
            <tr>
              <td><code>color</code></td>
              <td>హెక్స్ కలర్ పికర్ (#rrggbb)</td>
              <td>value="#10b981"</td>
              <td>కలర్ సెలెక్టర్ పాపప్</td>
            </tr>
            <tr>
              <td><code>file</code></td>
              <td>పరికర ఫైళ్ల అప్‌లోడ్</td>
              <td>accept, multiple</td>
              <td>కెమెరా లేదా ఫైల్ మేనేజర్ ఓపెన్ అవుతుంది</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- SECTION 10 -->
    <div class="section-title"><span class="num">10</span>ఇన్‌పుట్ స్టేట్ మేనేజ్‌మెంట్: readonly vs disabled</div>
    <div class="section-body">
      <p>ఒక ఇన్‌పుట్ బాక్స్‌ను యూజర్ మార్చకుండా ఆపడానికి HTML లో రెండు ఆట్రిబ్యూట్‌లు ఉన్నాయి. ఇంటర్వ్యూలలో వీటి మధ్య తేడాను ఖచ్చితంగా అడుగుతారు:</p>

      <div style="overflow-x:auto; margin: 16px 0;">
        <table class="tbl">
          <thead>
            <tr>
              <th>ఫీచర్ / అంశం</th>
              <th>readonly</th>
              <th>disabled</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>యూజర్ మార్చవచ్చా?</strong></td>
              <td>మార్చలేరు (కేవలం చదవడానికి మాత్రమే).</td>
              <td>మార్చలేరు (పూర్తిగా స్తంభించిపోతుంది).</td>
            </tr>
            <tr>
              <td><strong>సర్వర్‌కు డేటా వెళ్తుందా?</strong></td>
              <td>✅ <strong>అవును!</strong> ఫారమ్ సబ్మిట్ చేసినప్పుడు ఈ విలువ సర్వర్‌కు చేరుతుంది.</td>
              <td>❌ <strong>వెళ్ళదు!</strong> బ్రౌజర్ దీని విలువను సర్వర్‌కు పంపకుండా విస్మరిస్తుంది.</td>
            </tr>
            <tr>
              <td><strong>ఫోకస్ / కాపీ చేయవచ్చా?</strong></td>
              <td>యూజర్ బాక్స్‌ను సెలెక్ట్ చేయవచ్చు, టెక్స్ట్‌ను కాపీ చేసుకోవచ్చు.</td>
              <td>క్లిక్ చేయలేరు, ఫోకస్ కాదు, బూడిద రంగులో ఉంటుంది.</td>
            </tr>
            <tr>
              <td><strong>ఉదాహరణ</strong></td>
              <td>యూజర్ మార్చకూడని రోల్ నంబర్ లేదా అకౌంట్ ID.</td>
              <td>షరతులు ఒప్పుకునేవరకు క్లిక్ చేయలేని సబ్మిట్ బటన్.</td>
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
          <strong style="color:#b91c1c;">1. తప్పు: ఫోన్ నంబర్లు లేదా క్రెడిట్ కార్డుల కోసం type="number" వాడటం</strong>
          <p style="margin-top:6px; color:var(--text2); font-size:14px;">ఇది చాలా మంది చేసే ఘోరమైన తప్పు! <code>type="number"</code> లో మొదటి సున్నా (Leading zero) ఎగిరిపోతుంది (ఉదా: '040-123456' రాస్తే '40123456' అవుతుంది). అంతేకాకుండా క్రెడిట్ కార్డ్ నంబర్లలో స్పిన్నర్ బాణాలు వచ్చి నంబర్లు మారిపోతాయి. ఫోన్ నంబర్లకు ఎల్లప్పుడూ <strong><code>type="tel"</code></strong> మరియు క్రెడిట్ కార్డులకు <strong><code>inputmode="numeric"</code></strong> మాత్రమే వాడాలి!</p>
        </div>

        <div style="background:var(--bg2); border:1px solid #fecaca; border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px;">
          <strong style="color:#b91c1c;">2. తప్పు: ఫైల్ అప్‌లోడ్ ఫారమ్‌కు enctype రాయడం మర్చిపోవడం</strong>
          <p style="margin-top:6px; color:var(--text2); font-size:14px;"><code>&lt;form&gt;</code> లో <code>enctype="multipart/form-data"</code> లేకపోతే ఫైల్ అసలు అప్‌లోడ్ అవ్వదు. కేవలం ఫైల్ పేరు మాత్రమే సర్వర్‌కు వెళ్తుంది.</p>
        </div>

        <div style="background:var(--bg2); border:1px solid #fecaca; border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px;">
          <strong style="color:#b91c1c;">3. తప్పు: readonly కి బదులుగా disabled వాడి డేటా రావడం లేదని కంగారుపడటం</strong>
          <p style="margin-top:6px; color:var(--text2); font-size:14px;">సబ్మిట్ చేసినప్పుడు ఆ ఫీల్డ్ డేటా సర్వర్‌కు చేరాలంటే <code>readonly</code> వాడాలి. <code>disabled</code> పెడితే ఆ డేటా సర్వర్‌కు వెళ్ళదు.</p>
        </div>

        <div style="background:var(--bg2); border:1px solid #fecaca; border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px;">
          <strong style="color:#b91c1c;">4. తప్పు: date ఫీల్డ్‌లో కస్టమ్ డేట్ ఫార్మాట్ కోసం ప్రయత్నించడం</strong>
          <p style="margin-top:6px; color:var(--text2); font-size:14px;"><code>type="date"</code> యొక్క అంతర్గత నిల్వ ఫార్మాట్ ఎల్లప్పుడూ <strong>YYYY-MM-DD</strong> మాత్రమే అయి ఉంటుంది. స్క్రీన్ మీద యూజర్ యొక్క స్థానిక సిస్టమ్ లాంగ్వేజ్‌ను బట్టి తేదీ కనిపిస్తుంది.</p>
        </div>

        <div style="background:var(--bg2); border:1px solid #fecaca; border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px;">
          <strong style="color:#b91c1c;">5. తప్పు: type="password" ని ఎన్క్రిప్షన్ అనుకోవడం</strong>
          <p style="margin-top:6px; color:var(--text2); font-size:14px;"><code>type="password"</code> కేవలం స్క్రీన్ పై కనిపించకుండా చుక్కలుగా మాస్క్ మాత్రమే చేస్తుంది తప్ప డేటాను ఎన్క్రిప్ట్ చేయదు. నెట్‌వర్క్‌లో భద్రత కోసం HTTPS తప్పనిసరి.</p>
        </div>
      </div>
    </div>

    <!-- SECTION 12 (INTERACTIVE COLLAPSIBLE QUIZ) -->
    <div class="section-title"><span class="num">12</span>ఇంటరాక్టివ్ సెల్ఫ్-టెస్ట్ క్విజ్ (Interactive Quiz)</div>
    <div class="section-body">
      <p>ఈ అధ్యాయంలో మీరు నేర్చుకున్న విషయాలను స్వయంగా పరీక్షించుకోండి. ప్రతి ప్రశ్నను చదివి సమాధానం ఆలోచించిన తర్వాత "సమాధానం చూడండి" పై క్లిక్ చేయండి:</p>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:700; cursor:pointer; color:#059669;">
          ❓ ప్రశ్న 1: మొబైల్ ఫోన్‌లో కేవలం సంఖ్యల పిన్‌ప్యాడ్ మాత్రమే తెరవడానికి ఏ ఆట్రిబ్యూట్ వాడాలి?
        </summary>
        <div style="margin-top:10px; color:var(--text2); font-size:14px; line-height:1.6;">
          <strong>సమాధానం:</strong> <code>inputmode="numeric"</code>. ఇది మొబైల్ స్క్రీన్‌పై కేవలం అంకెలు మాత్రమే ఉండే కీప్యాడ్‌ను తెరుస్తుంది (OTP, పిన్‌కోడ్ కోసం బెస్ట్).
        </div>
      </details>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:700; cursor:pointer; color:#059669;">
          ❓ ప్రశ్న 2: ఫోన్ నంబర్ల కోసం type="number" ఎందుకు వాడకూడదు?
        </summary>
        <div style="margin-top:10px; color:var(--text2); font-size:14px; line-height:1.6;">
          <strong>సమాధానం:</strong> సంఖ్యాపరమైన ఇన్‌పుట్‌లో మొదటి సున్నా (Leading zero) ఆటోమేటిక్‌గా తొలగించబడుతుంది (ఉదా: 098765 బదులు 98765 అవుతుంది) మరియు స్పిన్నర్ బాణాలు వస్తాయి. ఫోన్ నంబర్లకు <code>type="tel"</code> మాత్రమే వాడాలి.
        </div>
      </details>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:700; cursor:pointer; color:#059669;">
          ❓ ప్రశ్న 3: readonly మరియు disabled మధ్య ప్రధాన తేడా ఏమిటి?
        </summary>
        <div style="margin-top:10px; color:var(--text2); font-size:14px; line-height:1.6;">
          <strong>సమాధానం:</strong> <code>readonly</code> ఫీల్డ్ డేటా సబ్మిట్ చేసినప్పుడు సర్వర్‌కు చేరుతుంది. కానీ <code>disabled</code> ఫీల్డ్ డేటాను బ్రౌజర్ సర్వర్‌కు పంపదు.
        </div>
      </details>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:700; cursor:pointer; color:#059669;">
          ❓ ప్రశ్న 4: ఒక ఫైల్ అప్‌లోడ్ ఫీల్డ్‌లో కేవలం PDF ఫైల్స్ మాత్రమే అనుమతించాలంటే ఏ ఆట్రిబ్యూట్ వాడాలి?
        </summary>
        <div style="margin-top:10px; color:var(--text2); font-size:14px; line-height:1.6;">
          <strong>సమాధానం:</strong> <code>accept=".pdf"</code> లేదా <code>accept="application/pdf"</code>.
        </div>
      </details>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:700; cursor:pointer; color:#059669;">
          ❓ ప్రశ్న 5: type="color" ఎంచుకున్న రంగు విలువను ఏ ఫార్మాట్‌లో అందిస్తుంది?
        </summary>
        <div style="margin-top:10px; color:var(--text2); font-size:14px; line-height:1.6;">
          <strong>సమాధానం:</strong> 7-క్యారెక్టర్ల హెక్సాడెసిమల్ కలర్ కోడ్ రూపంలో (ఉదాహరణకు: <code>#10b981</code>).
        </div>
      </details>
    </div>

    <!-- SECTION 13 (TRY BOX & SUMMARY) -->
    <div class="section-title"><span class="num">13</span>మీరే స్వయంగా Try చేయండి &amp; సారాంశం (Quick Summary)</div>
    <div class="section-body">
      <div class="try-box" style="margin-top:10px;">
        <div class="try-title">🚀 ఆధునిక ఇన్‌పుట్ టైప్స్ అన్నింటినీ మన ఎడిటర్‌లో లైవ్‌గా రన్ చేయండి</div>
        <p>పైన వివరించిన <code>email</code>, <code>date</code>, <code>range</code>, <code>color</code>, <code>file</code>, మరియు <code>tel</code> లతో కూడిన పూర్తి ఇంటరాక్టివ్ ఫారమ్ కోడ్‌ను మన ఆన్‌లైన్ ఎడిటర్‌లో ఓపెన్ చేసి మీరే స్వయంగా టెస్ట్ చేయండి!</p>
        <a class="run-btn" href="/online-html-editor.html" target="_blank">
          👉 Our Compiler లో HTML Editor try చేయండి
        </a>
      </div>

      <div style="margin-top:24px;">
        <h4 style="color:#059669; font-size:16px; margin-bottom:10px;">📌 క్విక్ సారాంశం (Key Takeaways):</h4>
        <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.7;">
          <li><strong>నేటివ్ వాలిడేషన్:</strong> <code>email</code> మరియు <code>url</code> జీరో జావాస్క్రిప్ట్ తో సింటాక్స్ తనిఖీ చేస్తాయి.</li>
          <li><strong>మొబైల్ కీబోర్డ్:</strong> <code>inputmode="numeric"</code> మరియు <code>type="tel"</code> యూజర్ ఎక్స్‌పీరియన్స్‌ను అద్భుతంగా మెరుగుపరుస్తాయి.</li>
          <li><strong>సంఖ్యలు &amp; స్లైడర్లు:</strong> <code>min</code>, <code>max</code>, <code>step</code> లతో <code>number</code> మరియు <code>range</code> కంట్రోల్స్.</li>
          <li><strong>క్యాలెండర్లు:</strong> <code>type="date"</code> మరియు <code>type="time"</code> ద్వారా నేటివ్ పికర్స్.</li>
          <li><strong>ఫైల్స్ &amp; కలర్స్:</strong> <code>type="file"</code> తో <code>accept</code>, <code>multiple</code> మరియు <code>type="color"</code> తో హెక్స్ కలర్స్.</li>
        </ul>
      </div>

      <div style="margin-top:20px; padding:16px; background:var(--bg2); border-left:4px solid #10b981; border-radius:0 8px 8px 0;">
        <strong>తర్వాతి అధ్యాయంలో (Chapter 15):</strong> మనం ఫారమ్స్‌లోని అధునాతన కంట్రోల్స్ అయిన <strong>డ్రాప్‌డౌన్లు (&lt;select&gt;, &lt;optgroup&gt;), ఆటో-కంప్లీట్ సెర్చ్ (&lt;datalist&gt;), పెద్ద టెక్స్ట్ ఏరియా (&lt;textarea&gt;) &amp; మల్టీ-సెలెక్ట్ చెక్‌బాక్సెస్/రేడియో బటన్స్</strong> గురించి సమగ్రంగా నేర్చుకుందాం!
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

const targetFile = path.join(__dirname, '..', 'public', 'blog-html', '14-html-input-types-text-password-email-number-date.html');
fs.writeFileSync(targetFile, fullPageHtml, 'utf8');
console.log('✅ Successfully generated deep high-value Chapter 14!');
console.log('Target file size:', fullPageHtml.length, 'characters');
