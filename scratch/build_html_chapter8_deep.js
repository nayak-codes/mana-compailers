const fs = require('fs');
const path = require('path');
const { LESSONS, buildSidebar } = require('./html_curriculum_data.js');

const lesson = LESSONS.find(l => l.num === 8);
const sidebarHtml = buildSidebar(8);

const chapterContentHtml = `
    <!-- BREADCRUMB -->
    <div class="breadcrumb">
      <a href="/">Home</a><span class="sep">›</span>
      <a href="/blog.html">Tutorials</a><span class="sep">›</span>
      <a href="/blog-html.html">HTML5 Masterclass</a><span class="sep">›</span>
      <span class="current">Chapter 8: టేబుల్స్ (table), రోస్, కాలమ్స్, colspan, rowspan &amp; Accessibility</span>
    </div>

    <!-- PAGE TITLE -->
    <h1 class="page-title">HTML టేబుల్స్ (table), రోస్, కాలమ్స్, colspan, rowspan &amp; Accessibility గైడ్</h1>

    <!-- PAGE META BADGES -->
    <div class="page-meta">
      <span class="badge">🌐 Modern HTML5 (W3C/WHATWG)</span>
      <span class="badge">🟢 Chapter 8 of 20</span>
      <span class="badge">📂 Phase 02: లింకులు, లిస్టులు, టేబుల్స్ &amp; మల్టీమీడియా</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

    <!-- SUBTOPICS PILL BAR -->
    <div style="background:var(--bg3); border:1px solid var(--border); border-radius:8px; padding:10px 16px; margin-bottom:24px; font-size:13px; color:var(--text2); display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
      <span style="color:#10b981; font-weight:700;">📌 Covered in this chapter:</span>
      <span>టేబుల్ ఆర్కిటెక్చర్ (table, tr, th, td) · thead, tbody, tfoot సెమాంటిక్స్ · caption ట్యాగ్ · colspan &amp; rowspan సెల్ మెర్జింగ్ · Accessibility (scope="col", scope="row") · ఆధునిక CSS స్టైలింగ్ · రెస్పాన్సివ్ మొబైల్ టేబుల్స్ · బిగినర్స్ తప్పులు &amp; క్విజ్</span>
    </div>

    <!-- INTRO ACCENT BOX (Warm Ivory with Green Accent) -->
    <div class="intro-box">
      <p>నిజ జీవితంలో సమాచారాన్ని స్పష్టంగా, క్రమపద్ధతిలో చూపించడానికి మనం ఎల్లప్పుడూ పట్టికలను (Tables) ఉపయోగిస్తాం. ఉదాహరణకు: మీ పదో తరగతి మార్కుల మెమో, క్రికెట్ స్కోర్‌కార్డ్, రైల్వే టైమ్‌టేబుల్, లేదా అమెజాన్‌లో రెండు మొబైల్ ఫోన్ల స్పెసిఫికేషన్లను పోల్చే ఫీచర్ టేబుల్ — వీటన్నింటికీ మూలస్తంభం టేబుల్సే!</p>
      <p>వెబ్ డెవలప్‌మెంట్‌లో <strong>డేటాను వరుసలు (Rows) మరియు నిలువు వరుసలలో (Columns)</strong> ఒక గ్రిడ్ రూపంలో క్రమబద్ధీకరించడానికి HTML <code>&lt;table&gt;</code> ఎలిమెంట్ అత్యంత శక్తివంతమైన సాధనం. అయితే టేబుల్స్ నేర్చుకునేటప్పుడు చాలా మంది బిగినర్స్ చేసే అతి పెద్ద పొరపాటు — మొత్తం వెబ్‌సైట్ లేఅవుట్‌ను డిజైన్ చేయడానికి టేబుల్స్‌ను వాడటం (ఇది 1990ల నాటి పాత పద్ధతి)!</p>
      <p>ఆధునిక HTML5 ప్రమాణాల ప్రకారం, టేబుల్స్‌ను కేవలం <strong>టాబ్యులర్ డేటా (Tabular Data)</strong> ప్రదర్శించడానికి మాత్రమే ఉపయోగించాలి. ఈ అధ్యాయంలో మనం టేబుల్ నిర్మాణం, <code>&lt;thead&gt;</code>, <code>&lt;tbody&gt;</code>, <code>&lt;tfoot&gt;</code> సెమాంటిక్స్, గజిబిజిగా ఉండే <strong>colspan, rowspan</strong> సెల్ మెర్జింగ్ టెక్నిక్స్, స్క్రీన్ రీడర్స్ కోసం Accessibility (scope) సూత్రాలు మరియు మొబైల్ స్క్రీన్‌లలో టేబుల్స్ విరిగిపోకుండా రెస్పాన్సివ్‌గా మార్చే విధానాన్ని సమగ్రంగా నేర్చుకుందాం!</p>
    </div>

    <!-- SECTION 1 -->
    <div class="section-title"><span class="num">1</span>ఈ Chapter లో మీరు నేర్చుకునే అంశాలు</div>
    <div class="section-body">
      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.7;">
        <li><strong>టేబుల్ మౌలిక నిర్మాణం:</strong> &lt;table&gt;, &lt;tr&gt; (వరుస), &lt;th&gt; (హెడర్), మరియు &lt;td&gt; (డేటా సెల్) మధ్య సంబంధం.</li>
        <li><strong>సెమాంటిక్ స్ట్రక్చరింగ్:</strong> &lt;thead&gt;, &lt;tbody&gt;, మరియు &lt;tfoot&gt; ఎందుకు వాడాలి? బ్రౌజర్ &amp; ప్రింట్ ప్రయోజనాలు.</li>
        <li><strong>&lt;caption&gt; ట్యాగ్:</strong> టేబుల్‌కు అధికారిక శీర్షికను జోడించే సరైన పద్ధతి.</li>
        <li><strong>colspan తో అడ్డంగా కలపడం:</strong> బహుళ కాలమ్స్‌ను ఒకే సెల్‌గా మెర్జ్ చేసే విధానం.</li>
        <li><strong>rowspan తో నిలువుగా కలపడం:</strong> బహుళ రోస్‌ను ఒకే సెల్‌గా కలిపి నిలువు గ్రిడ్లను తయారు చేయడం.</li>
        <li><strong>Accessibility &amp; a11y:</strong> దృష్టి లోపం ఉన్నవారి కోసం scope="col", scope="row" ప్రాముఖ్యత.</li>
        <li><strong>ఆధునిక CSS టేబుల్ స్టైలింగ్:</strong> border-collapse, జీబ్రా స్ట్రిప్పింగ్ (alternating colors), మరియు హోవర్ ఎఫెక్ట్స్.</li>
        <li><strong>మొబైల్ రెస్పాన్సివ్ టెక్నిక్స్:</strong> చిన్న స్క్రీన్‌లలో టేబుల్స్ కట్ అవ్వకుండా overflow-x కంటైనర్లను నిర్మించడం.</li>
      </ul>
    </div>

    <!-- SECTION 2 -->
    <div class="section-title"><span class="num">2</span>HTML టేబుల్ అనాటమీ: table, tr, th, td</div>
    <div class="section-body">
      <p>ఒక సాధారణ HTML టేబుల్ 4 ప్రాథమిక ట్యాగ్‌ల కలయికతో ఏర్పడుతుంది:</p>
      <ol style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.8;">
        <li><code>&lt;table&gt;</code>: మొత్తం టేబుల్‌ను చుట్టే ప్రధాన కంటైనర్ (Wrapper).</li>
        <li><code>&lt;tr&gt;</code> (Table Row): టేబుల్‌లో ఒక అడ్డ వరుసను (Horizontal Row) సృష్టిస్తుంది. టేబుల్ లోపల డేటా ఎప్పుడూ వరుసల వారీగానే రాయబడుతుంది.</li>
        <li><code>&lt;th&gt;</code> (Table Header): ఆ వరుస లేదా కాలమ్‌కు హెడ్డింగ్ సెల్. బ్రౌజర్లు బై-డిఫాల్ట్‌గా ఇందులో ఉన్న టెక్స్ట్‌ను <strong>Bold</strong> చేసి, మధ్యలో (Center aligned) ఉంచుతాయి.</li>
        <li><code>&lt;td&gt;</code> (Table Data): అసలైన డేటాను కలిగి ఉండే సాధారణ సెల్ (Normal Data Cell). ఇది ఎడమవైపుకు (Left aligned) ఉంటుంది.</li>
      </ol>

      <div class="diagram-box">
  ┌───────────────────────────────── &lt;table&gt; ──────────────────────────────────┐
  │                                                                             │
  │   &lt;tr&gt; (Row 1 - Headers)                                                    │
  │   ┌───────────────────────────────┬───────────────────────────────┐         │
  │   │      &lt;th&gt;కోర్సు పేరు&lt;/th&gt;     │      &lt;th&gt;వ్యవధి (నెలలు)&lt;/th&gt;  │         │
  │   └───────────────────────────────┴───────────────────────────────┘         │
  │                                                                             │
  │   &lt;tr&gt; (Row 2 - Data)                                                       │
  │   ┌───────────────────────────────┬───────────────────────────────┐         │
  │   │      &lt;td&gt;HTML5 &amp; CSS3&lt;/td&gt;    │      &lt;td&gt;1 నెల&lt;/td&gt;           │         │
  │   └───────────────────────────────┴───────────────────────────────┘         │
  │                                                                             │
  │   &lt;tr&gt; (Row 3 - Data)                                                       │
  │   ┌───────────────────────────────┬───────────────────────────────┐         │
  │   │      &lt;td&gt;JavaScript&lt;/td&gt;      │      &lt;td&gt;2 నెలలు&lt;/td&gt;         │         │
  │   └───────────────────────────────┴───────────────────────────────┘         │
  └─────────────────────────────────────────────────────────────────────────────┘
      </div>

      <div class="code-block">
        <div class="code-block-header">
          <span>HTML — బేసిక్ టేబుల్ ఉదాహరణ</span>
          <div class="code-actions">
            <button class="try-btn">▶ Run in Online HTML Editor</button>
          </div>
        </div>
        <pre><code class="language-html">&lt;!DOCTYPE html&gt;
&lt;html lang="te"&gt;
&lt;head&gt;
  &lt;meta charset="UTF-8"&gt;
  &lt;title&gt;నా మొదటి టేబుల్&lt;/title&gt;
  &lt;style&gt;
    table, th, td {
      border: 1px solid #cbd5e1;
      border-collapse: collapse; /* రెండు బోర్డర్ల మధ్య ఖాళీని తొలగిస్తుంది */
      padding: 10px 14px;
    }
    th {
      background-color: #f1f5f9;
      color: #0f172a;
    }
  &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

  &lt;table&gt;
    &lt;tr&gt;
      &lt;th&gt;విద్యార్థి పేరు&lt;/th&gt;
      &lt;th&gt;సబ్జెక్ట్&lt;/th&gt;
      &lt;th&gt;మార్కులు&lt;/th&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
      &lt;td&gt;రాహుల్&lt;/td&gt;
      &lt;td&gt;వెబ్ టెక్నాలజీస్&lt;/td&gt;
      &lt;td&gt;95&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
      &lt;td&gt;స్నేహ&lt;/td&gt;
      &lt;td&gt;వెబ్ టెక్నాలజీస్&lt;/td&gt;
      &lt;td&gt;98&lt;/td&gt;
    &lt;/tr&gt;
  &lt;/table&gt;

&lt;/body&gt;
&lt;/html&gt;</code></pre>
      </div>
    </div>

    <!-- SECTION 3 -->
    <div class="section-title"><span class="num">3</span>సెమాంటిక్ స్ట్రక్చరింగ్: thead, tbody, మరియు tfoot</div>
    <div class="section-body">
      <p>పెద్ద పెద్ద వ్యాపార వెబ్‌సైట్లు లేదా డేటాబేస్ రిపోర్టులలో వందల కొద్దీ వరుసల సమాచారం ఉంటుంది. అలాంటి సమయంలో ఒక ప్రొఫెషనల్ డెవలపర్ టేబుల్‌ను మూడు స్పష్టమైన సెమాంటిక్ బ్లాక్‌లుగా విభజిస్తారు:</p>

      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.8;">
        <li><strong><code>&lt;thead&gt;</code> (Table Head):</strong> టేబుల్‌లోని హెడ్డింగ్స్ వరుసలను మాత్రమే ఉంచే ప్రాంతం.</li>
        <li><strong><code>&lt;tbody&gt;</code> (Table Body):</strong> అసలైన డేటా వరుసలను కలిగి ఉండే ప్రధాన శరీరం. ఒకే టేబుల్‌లో అవసరమైతే బహుళ <code>&lt;tbody&gt;</code> విభాగాలను కూడా ఉపయోగించవచ్చు!</li>
        <li><strong><code>&lt;tfoot&gt;</code> (Table Foot):</strong> టేబుల్ చివర సారాంశం (Summary), మొత్తం టోటల్స్ (Totals), లేదా సగటు (Averages) చూపించే విభాగం.</li>
      </ul>

      <div class="callout callout-tip" style="margin-top:16px;">
        <span class="callout-icon">💡</span>
        <div>
          <strong>ప్రింటింగ్ మ్యాజిక్:</strong> ఒక పెద్ద వెబ్‌సైట్ రిపోర్టును ప్రింట్ (Ctrl + P) చేసేటప్పుడు, ఆ రిపోర్ట్ 5 పేజీల పాటు సాగితే — <code>&lt;thead&gt;</code> మరియు <code>&lt;tfoot&gt;</code> ప్రతి పేజీ పైన మరియు క్రింద ఆటోమేటిక్‌గా పునరావృతం అవుతాయి! ఇది సాధారణ యూజర్లకు చాలా సౌకర్యవంతంగా ఉంటుంది.
        </div>
      </div>

      <div class="code-block" style="margin-top:16px;">
        <div class="code-block-header">
          <span>HTML — thead, tbody, tfoot తో సూపర్ మార్కెట్ బిల్లింగ్ టేబుల్</span>
          <div class="code-actions">
            <button class="try-btn">▶ Run in Online HTML Editor</button>
          </div>
        </div>
        <pre><code class="language-html">&lt;table style="width: 100%; border-collapse: collapse;"&gt;
  &lt;thead style="background-color: #10b981; color: white;"&gt;
    &lt;tr&gt;
      &lt;th style="padding: 10px; text-align: left;"&gt;వస్తువు&lt;/th&gt;
      &lt;th style="padding: 10px; text-align: center;"&gt;పరిమాణం (Qty)&lt;/th&gt;
      &lt;th style="padding: 10px; text-align: right;"&gt;ధర (₹)&lt;/th&gt;
    &lt;/tr&gt;
  &lt;/thead&gt;

  &lt;tbody style="background-color: #f8fafc;"&gt;
    &lt;tr&gt;
      &lt;td style="padding: 8px 10px; border-bottom: 1px solid #e2e8f0;"&gt;లాప్‌టాప్ బ్యాగ్&lt;/td&gt;
      &lt;td style="padding: 8px 10px; text-align: center; border-bottom: 1px solid #e2e8f0;"&gt;1&lt;/td&gt;
      &lt;td style="padding: 8px 10px; text-align: right; border-bottom: 1px solid #e2e8f0;"&gt;1,200.00&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
      &lt;td style="padding: 8px 10px; border-bottom: 1px solid #e2e8f0;"&gt;వైర్‌లెస్ మౌస్&lt;/td&gt;
      &lt;td style="padding: 8px 10px; text-align: center; border-bottom: 1px solid #e2e8f0;"&gt;2&lt;/td&gt;
      &lt;td style="padding: 8px 10px; text-align: right; border-bottom: 1px solid #e2e8f0;"&gt;900.00&lt;/td&gt;
    &lt;/tr&gt;
  &lt;/tbody&gt;

  &lt;tfoot style="background-color: #e2e8f0; font-weight: bold;"&gt;
    &lt;tr&gt;
      &lt;td style="padding: 10px;"&gt;మొత్తం చెల్లించవలసినది&lt;/td&gt;
      &lt;td style="padding: 10px; text-align: center;"&gt;3 వస్తువులు&lt;/td&gt;
      &lt;td style="padding: 10px; text-align: right; color: #059669;"&gt;₹ 2,100.00&lt;/td&gt;
    &lt;/tr&gt;
  &lt;/tfoot&gt;
&lt;/table&gt;</code></pre>
      </div>
    </div>

    <!-- SECTION 4 -->
    <div class="section-title"><span class="num">4</span>టేబుల్ శీర్షిక: &lt;caption&gt; ట్యాగ్ &amp; ప్రాముఖ్యత</div>
    <div class="section-body">
      <p>టేబుల్ ఏ విషయాన్ని గురించి తెలియజేస్తుందో ఒక స్పష్టమైన శీర్షికను ఇవ్వడానికి <code>&lt;caption&gt;</code> ట్యాగ్‌ను ఉపయోగిస్తారు. దీనిని ఎల్లప్పుడూ <code>&lt;table&gt;</code> ట్యాగ్ లోపల మొట్టమొదటి చైల్డ్ ఎలిమెంట్‌గా మాత్రమే రాయాలి!</p>

      <div class="diagram-box">
  &lt;table&gt;
    &lt;caption&gt;2026 విద్యా సంవత్సరం సెమిస్టర్ ఫలితాల పట్టిక&lt;/caption&gt;  &lt;!-- 1st Element! --&gt;
    &lt;thead&gt; ... &lt;/thead&gt;
    &lt;tbody&gt; ... &lt;/tbody&gt;
  &lt;/table&gt;
      </div>

      <p style="margin-top:14px;"><strong>&lt;caption&gt; వాడటం వల్ల లాభాలు:</strong></p>
      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.7;">
        <li><strong>Accessibility (స్క్రీన్ రీడర్స్):</strong> అంధులు వెబ్‌సైట్ చూసేటప్పుడు స్క్రీన్ రీడర్ మొదట ఈ క్యాప్షన్‌ను చదివి వినిపిస్తుంది. దీనివల్ల వారు ఆ టేబుల్‌ను పూర్తిగా వినాలో లేక స్కిప్ చేయాలో వెంటనే నిర్ణయించుకోగలరు.</li>
        <li><strong>SEO (సెర్చ్ ఇంజిన్లు):</strong> గూగుల్ బోట్స్ టేబుల్‌లోని కంటెంట్‌ను అర్థం చేసుకోవడానికి క్యాప్షన్‌ను ప్రామాణికంగా తీసుకుంటాయి.</li>
        <li><strong>CSS తో సులభంగా స్టైలింగ్:</strong> <code>caption-side: bottom;</code> అని రాయడం ద్వారా క్యాప్షన్‌ను టేబుల్ కింద కూడా ప్రదర్శించవచ్చు!</li>
      </ul>
    </div>

    <!-- SECTION 5 -->
    <div class="section-title"><span class="num">5</span>సెల్ మెర్జింగ్ 1: colspan (కాలమ్స్ కలపడం)</div>
    <div class="section-body">
      <p>మైక్రోసాఫ్ట్ ఎక్సెల్‌లో రెండు లేదా అంతకంటే ఎక్కువ పక్కపక్క సెల్స్‌ను కలిపి ఒకే పెద్ద సెల్‌గా మార్చే "Merge Cells" ఫీచర్‌ను మీరు చూసే ఉంటారు. HTML లో అడ్డంగా ఉండే కాలమ్స్‌ను కలపడానికి <strong><code>colspan</code> (Column Span)</strong> ఆట్రిబ్యూట్‌ను ఉపయోగిస్తాం.</p>

      <p>ఉదాహరణకు: ఒక సెల్ రెండు కాలమ్స్ స్థలాన్ని ఆక్రమించాలనుకుంటే <code>colspan="2"</code> అని రాస్తాం. ఒక సెల్ 3 కాలమ్స్ ఆక్రమిస్తే <code>colspan="3"</code> అని రాస్తాం.</p>

      <div class="diagram-box">
  సాధారణ వరుస (2 Cells):
  ┌───────────────────────┬───────────────────────┐
  │         Col 1         │         Col 2         │
  └───────────────────────┴───────────────────────┘

  colspan="2" వర్తించిన వరుస (1 Big Cell):
  ┌───────────────────────────────────────────────┐
  │        Col 1 &amp; Col 2 Merged Together          │
  └───────────────────────────────────────────────┘
      </div>

      <div class="callout callout-warning" style="margin-top:16px;">
        <span class="callout-icon">⚠️</span>
        <div>
          <strong>గోల్డెన్ రూల్ — కాలమ్స్ లెక్క సరిపోవాలి!</strong><br>
          మీ టేబుల్‌లో సాధారణంగా 3 కాలమ్స్ ఉంటే, మీరు ఒక వరుసలో <code>&lt;td colspan="2"&gt;</code> రాసినప్పుడు, ఆ వరుసలో మిగిలినది కేవలం 1 <code>&lt;td&gt;</code> మాత్రమే అయి ఉండాలి (2 + 1 = 3)! మీరు పొరపాటున పక్కన ఇంకో 2 సెల్స్ రాస్తే టేబుల్ అంచులు విరిగిపోయి లేఅవుట్ పాడవుతుంది.
        </div>
      </div>

      <div class="code-block" style="margin-top:16px;">
        <div class="code-block-header">
          <span>HTML — colspan ఉదాహరణ: ఫోన్ నంబర్లు</span>
          <div class="code-actions">
            <button class="try-btn">▶ Run in Online HTML Editor</button>
          </div>
        </div>
        <pre><code class="language-html">&lt;table border="1" style="border-collapse: collapse; width: 100%; text-align: center;"&gt;
  &lt;tr&gt;
    &lt;th&gt;ఉద్యోగి పేరు&lt;/th&gt;
    &lt;th colspan="2"&gt;సంప్రదించవలసిన ఫోన్ నంబర్లు&lt;/th&gt; &lt;!-- 2 కాలమ్స్ కలిసాయి --&gt;
  &lt;/tr&gt;
  &lt;tr&gt;
    &lt;td&gt;సురేష్ కుమార్&lt;/td&gt;
    &lt;td&gt;9876543210 (వ్యక్తిగత)&lt;/td&gt;
    &lt;td&gt;040-123456 (ఆఫీస్)&lt;/td&gt;
  &lt;/tr&gt;
&lt;/table&gt;</code></pre>
      </div>
    </div>

    <!-- SECTION 6 -->
    <div class="section-title"><span class="num">6</span>సెల్ మెర్జింగ్ 2: rowspan (రోస్ కలపడం)</div>
    <div class="section-body">
      <p>నిలువుగా ఉండే రెండు లేదా అంతకంటే ఎక్కువ వరుసలలోని సెల్స్‌ను కలపడానికి <strong><code>rowspan</code> (Row Span)</strong> ఆట్రిబ్యూట్‌ను ఉపయోగిస్తాం. ఉదాహరణకు: ఒకే వ్యక్తికి రెండు డిగ్రీలు ఉన్నప్పుడు లేదా ఒకే డిపార్ట్‌మెంట్‌లో ఇద్దరు మేనేజర్లు పనిచేస్తున్నప్పుడు డిపార్ట్‌మెంట్ పేరును రెండు వరుసల పాటు నిలువుగా విస్తరించడానికి ఇది ఉపయోగపడుతుంది.</p>

      <div class="diagram-box">
  rowspan="2" మెకానిజం:
  ┌───────────────────────┬───────────────────────┐
  │                       │      మొదటి అంశం       │
  │     నిలువుగా కలిసిన    ├───────────────────────┤
  │   సెల్ (rowspan="2")  │      రెండవ అంశం       │
  └───────────────────────┴───────────────────────┘
      </div>

      <p style="margin-top:14px;"><strong>rowspan రాసేటప్పుడు బిగినర్స్ గుర్తుంచుకోవాల్సిన కిటుకు:</strong></p>
      <p>మొదటి వరుసలో <code>&lt;td rowspan="2"&gt;</code> ఇచ్చినప్పుడు, ఆ సెల్ క్రింది వరుసలోని మొదటి స్థలాన్ని కూడా ఆక్రమించుకుంటుంది. కాబట్టి <strong>క్రింది వరుసలో మొదటి &lt;td&gt; ని రాయకూడదు!</strong> కేవలం తర్వాతి సెల్స్‌ను మాత్రమే రాయాలి.</p>

      <div class="code-block">
        <div class="code-block-header">
          <span>HTML — rowspan ఉదాహరణ: డిపార్ట్‌మెంట్ ఉద్యోగులు</span>
          <div class="code-actions">
            <button class="try-btn">▶ Run in Online HTML Editor</button>
          </div>
        </div>
        <pre><code class="language-html">&lt;table border="1" style="border-collapse: collapse; width: 100%; text-align: left;"&gt;
  &lt;tr style="background:#f1f5f9;"&gt;
    &lt;th&gt;విభాగం (Department)&lt;/th&gt;
    &lt;th&gt;ఉద్యోగి పేరు&lt;/th&gt;
    &lt;th&gt;హోదా (Designation)&lt;/th&gt;
  &lt;/tr&gt;
  &lt;tr&gt;
    &lt;!-- ఈ సెల్ క్రింది వరుసను కూడా కలిపేసుకుంటుంది --&gt;
    &lt;td rowspan="2" style="background:#f8fafc; font-weight:bold;"&gt;ఇంజనీరింగ్ (Engineering)&lt;/td&gt;
    &lt;td&gt;ఆనంద్ రావు&lt;/td&gt;
    &lt;td&gt;Tech Lead&lt;/td&gt;
  &lt;/tr&gt;
  &lt;tr&gt;
    &lt;!-- ఇక్కడ డిపార్ట్‌మెంట్ td రాయకూడదు! నేరుగా పేరుతో మొదలుపెట్టాలి --&gt;
    &lt;td&gt;భవ్య రెడ్డి&lt;/td&gt;
    &lt;td&gt;Frontend Developer&lt;/td&gt;
  &lt;/tr&gt;
&lt;/table&gt;</code></pre>
      </div>
    </div>

    <!-- SECTION 7 -->
    <div class="section-title"><span class="num">7</span>అడ్వాన్స్‌డ్ మెర్జింగ్: colspan &amp; rowspan కాంబినేషన్</div>
    <div class="section-body">
      <p>రియల్ వరల్డ్ ప్రాజెక్టులలో మనం తరచుగా టైమ్‌టేబుల్స్, మార్కుల లిస్ట్‌లు లేదా సంక్లిష్టమైన ఇన్‌వాయిస్‌లు తయారు చేస్తుంటాం. అక్కడ అడ్డంగా మరియు నిలువుగా రెండింటినీ ఒకేసారి మెర్జ్ చేయాల్సి వస్తుంది. క్రింది లైవ్ ఉదాహరణను పరిశీలించండి:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span>HTML — కాలేజీ టైమ్‌టేబుల్ (colspan + rowspan కాంబో)</span>
          <div class="code-actions">
            <button class="try-btn">▶ Run in Online HTML Editor</button>
          </div>
        </div>
        <pre><code class="language-html">&lt;table border="1" style="border-collapse: collapse; width: 100%; text-align: center;"&gt;
  &lt;caption style="font-weight: bold; margin-bottom: 8px;"&gt;కంప్యూటర్ సైన్స్ 3వ సంవత్సరం టైమ్‌టేబుల్&lt;/caption&gt;
  &lt;thead style="background: #10b981; color: white;"&gt;
    &lt;tr&gt;
      &lt;th&gt;రోజు&lt;/th&gt;
      &lt;th&gt;పీరియడ్ 1 (9-10)&lt;/th&gt;
      &lt;th&gt;పీరియడ్ 2 (10-11)&lt;/th&gt;
      &lt;th&gt;విరామం (11-11:30)&lt;/th&gt;
      &lt;th&gt;పీరియడ్ 3 (11:30-1)&lt;/th&gt;
    &lt;/tr&gt;
  &lt;/thead&gt;
  &lt;tbody&gt;
    &lt;tr&gt;
      &lt;td style="font-weight: bold;"&gt;సోమవారం&lt;/td&gt;
      &lt;td&gt;HTML5&lt;/td&gt;
      &lt;td&gt;CSS3&lt;/td&gt;
      &lt;!-- rowspan="2" తో 2 రోజులకు ఒకే బ్రేక్ బాక్స్ --&gt;
      &lt;td rowspan="2" style="background: #fef08a; font-weight: bold;"&gt;లంచ్ &amp; టీ బ్రేక్&lt;/td&gt;
      &lt;td&gt;జావా ల్యాబ్&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
      &lt;td style="font-weight: bold;"&gt;మంగళవారం&lt;/td&gt;
      &lt;!-- colspan="2" తో 2 పీరియడ్లు ల్యాబ్ కోసం మెర్జ్ --&gt;
      &lt;td colspan="2" style="background: #e0f2fe;"&gt;పైథాన్ ఫుల్ ప్రాజెక్ట్ ల్యాబ్&lt;/td&gt;
      &lt;!-- లంచ్ కాలమ్ ఇక్కడ రాయము (పైన rowspan తీసుకుంది) --&gt;
      &lt;td&gt;డాటాబేసెస్&lt;/td&gt;
    &lt;/tr&gt;
  &lt;/tbody&gt;
&lt;/table&gt;</code></pre>
      </div>
    </div>

    <!-- SECTION 8 -->
    <div class="section-title"><span class="num">8</span>Accessibility &amp; a11y: scope="col" మరియు scope="row"</div>
    <div class="section-body">
      <p>కంటి చూపు ఉన్న మనం ఒక టేబుల్ వైపు చూడగానే — ఏది రో, ఏది కాలమ్, ఏ విలువ ఏ హెడ్డింగ్‌కు సంబంధించిందో సులభంగా గ్రహించగలం. కానీ ఒక అంధుడు లేదా దృష్టి లోపం ఉన్న యూజర్ స్క్రీన్ రీడర్ సాఫ్ట్‌వేర్ (NVDA, JAWS, VoiceOver) వాడుతున్నప్పుడు టేబుల్‌ను అర్థం చేసుకోవడం చాలా కష్టం!</p>

      <p>స్క్రీన్ రీడర్ ప్రతి సెల్‌లోని డేటాను చదివేటప్పుడు దానికి సంబంధించిన హెడ్డింగ్‌ను కూడా బిగ్గరగా వినిపించాలంటే మనం <code>&lt;th&gt;</code> ట్యాగ్‌కు <strong><code>scope</code></strong> ఆట్రిబ్యూట్‌ను ఇవ్వాలి:</p>

      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.8;">
        <li><code>&lt;th scope="col"&gt;</code>: ఈ హెడ్డింగ్ తన క్రింద ఉన్న పూర్తి నిలువు కాలమ్‌కు ప్రాతినిధ్యం వహిస్తుందని బ్రౌజర్‌కు స్పష్టం చేస్తుంది.</li>
        <li><code>&lt;th scope="row"&gt;</code>: ఈ హెడ్డింగ్ తన కుడివైపున ఉన్న పూర్తి అడ్డ వరుసకు ప్రాతినిధ్యం వహిస్తుందని స్పష్టం చేస్తుంది.</li>
        <li><code>&lt;th scope="colgroup"&gt;</code>: గ్రూప్ చేసిన బహుళ కాలమ్స్‌కు హెడర్‌గా పనిచేస్తుంది.</li>
        <li><code>&lt;th scope="rowgroup"&gt;</code>: గ్రూప్ చేసిన బహుళ రోస్‌కు హెడర్‌గా పనిచేస్తుంది.</li>
      </ul>

      <div class="code-block" style="margin-top:16px;">
        <div class="code-block-header">
          <span>HTML — 100% Accessible Table with Scope</span>
          <div class="code-actions">
            <button class="try-btn">▶ Run in Online HTML Editor</button>
          </div>
        </div>
        <pre><code class="language-html">&lt;table border="1" style="border-collapse: collapse; width: 100%;"&gt;
  &lt;caption&gt;మొబైల్ ఫోన్ల సాంకేతిక వివరాలు&lt;/caption&gt;
  &lt;tr&gt;
    &lt;td&gt;&lt;/td&gt; &lt;!-- ఖాళీ కార్నర్ సెల్ --&gt;
    &lt;th scope="col"&gt;iPhone 16&lt;/th&gt;
    &lt;th scope="col"&gt;Samsung S25&lt;/th&gt;
  &lt;/tr&gt;
  &lt;tr&gt;
    &lt;th scope="row"&gt;ర్యామ్ (RAM)&lt;/th&gt;
    &lt;td&gt;8 GB&lt;/td&gt;
    &lt;td&gt;12 GB&lt;/td&gt;
  &lt;/tr&gt;
  &lt;tr&gt;
    &lt;th scope="row"&gt;బ్యాటరీ&lt;/th&gt;
    &lt;td&gt;3,561 mAh&lt;/td&gt;
    &lt;td&gt;4,000 mAh&lt;/td&gt;
  &lt;/tr&gt;
&lt;/table&gt;</code></pre>
      </div>
    </div>

    <!-- SECTION 9 -->
    <div class="section-title"><span class="num">9</span>CSS తో ఆధునిక స్టైలింగ్ (Borders, Zebra, Hover)</div>
    <div class="section-body">
      <p>డిఫాల్ట్ HTML టేబుల్స్ చూడటానికి 1995 నాటి పాత శైలిలో చికాకుగా ఉంటాయి. కానీ కొన్ని సింపుల్ CSS నియమాలతో మనం వాటిని అత్యంత ఆకర్షణీయంగా, మోడ్రన్ సాఫ్ట్‌వేర్ డ్యాష్‌బోర్డ్‌ల లాగా మార్చవచ్చు:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span>CSS — ప్రొఫెషనల్ టేబుల్ స్టైల్స్</span>
          <div class="code-actions">
            <button class="try-btn">▶ Run in Online HTML Editor</button>
          </div>
        </div>
        <pre><code class="language-css">/* 1. రెండు గీతల బదులు ఒకే సన్నటి బోర్డర్ కోసం */
table {
  width: 100%;
  border-collapse: collapse;
  font-family: 'Inter', sans-serif;
  margin: 16px 0;
}

/* 2. సెల్స్‌కు మంచి గాలి స్థలం (Padding) */
th, td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #e2e8f0;
}

/* 3. హెడర్‌కు ఎమరాల్డ్ గ్రీన్ లేదా డార్క్ లుక్ */
th {
  background-color: #059669;
  color: #ffffff;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 13px;
  letter-spacing: 0.5px;
}

/* 4. జీబ్రా స్ట్రిప్పింగ్: ఒక లైన్ లైట్ కలర్, ఒక లైన్ వైట్ కలర్ */
tbody tr:nth-child(even) {
  background-color: #f8fafc;
}

/* 5. మౌస్ పాయింటర్ పెట్టినప్పుడు మెరిసే ఎఫెక్ట్ (Hover) */
tbody tr:hover {
  background-color: #ecfdf5;
  transition: background-color 0.2s ease;
}</code></pre>
      </div>
    </div>

    <!-- SECTION 10 -->
    <div class="section-title"><span class="num">10</span>రెస్పాన్సివ్ టేబుల్స్: మొబైల్ స్క్రీన్‌లలో సొల్యూషన్</div>
    <div class="section-body">
      <p>వెబ్ డెవలప్‌మెంట్‌లో అత్యంత సాధారణ సమస్య: <strong>మొబైల్ స్క్రీన్‌లలో టేబుల్స్ పేజీ సరిహద్దులను దాటి బయటకు వెళ్ళిపోవడం!</strong> మొబైల్ స్క్రీన్ వెడల్పు 360px నుండి 400px మాత్రమే ఉంటుంది. కానీ 6 కాలమ్స్ ఉన్న టేబుల్‌కు కనీసం 700px స్థలం అవసరం.</p>

      <p>దీనికి అత్యంత సులభమైన మరియు పరిశ్రమలో ప్రామాణికమైన పరిష్కారం — టేబుల్‌ను ఒక <code>&lt;div&gt;</code> లో పెట్టి దానికి <code>overflow-x: auto;</code> ఇవ్వడం:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span>HTML &amp; CSS — హారిజాంటల్ స్క్రోలింగ్ రెస్పాన్సివ్ టేబుల్</span>
          <div class="code-actions">
            <button class="try-btn">▶ Run in Online HTML Editor</button>
          </div>
        </div>
        <pre><code class="language-html">&lt;!-- టేబుల్ చుట్టూ రెస్పాన్సివ్ ర్యాపర్ డివ్ --&gt;
&lt;div style="overflow-x: auto; -webkit-overflow-scrolling: touch; border-radius: 8px; border: 1px solid #e2e8f0;"&gt;
  &lt;table style="min-width: 600px; width: 100%; border-collapse: collapse;"&gt;
    &lt;thead style="background: #1e293b; color: white;"&gt;
      &lt;tr&gt;
        &lt;th style="padding: 10px;"&gt;ID&lt;/th&gt;
        &lt;th style="padding: 10px;"&gt;ఉత్పత్తి పేరు&lt;/th&gt;
        &lt;th style="padding: 10px;"&gt;కేటగిరీ&lt;/th&gt;
        &lt;th style="padding: 10px;"&gt;స్టాక్&lt;/th&gt;
        &lt;th style="padding: 10px;"&gt;ధర&lt;/th&gt;
        &lt;th style="padding: 10px;"&gt;యాక్షన్&lt;/th&gt;
      &lt;/tr&gt;
    &lt;/thead&gt;
    &lt;tbody&gt;
      &lt;tr&gt;
        &lt;td style="padding: 10px; border-bottom: 1px solid #e2e8f0;"&gt;#101&lt;/td&gt;
        &lt;td style="padding: 10px; border-bottom: 1px solid #e2e8f0;"&gt;మెకానికల్ కీబోర్డ్&lt;/td&gt;
        &lt;td style="padding: 10px; border-bottom: 1px solid #e2e8f0;"&gt;ఎలక్ట్రానిక్స్&lt;/td&gt;
        &lt;td style="padding: 10px; border-bottom: 1px solid #e2e8f0;"&gt;45 యూనిట్లు&lt;/td&gt;
        &lt;td style="padding: 10px; border-bottom: 1px solid #e2e8f0;"&gt;₹ 3,499&lt;/td&gt;
        &lt;td style="padding: 10px; border-bottom: 1px solid #e2e8f0;"&gt;&lt;button&gt;ఆర్డర్&lt;/button&gt;&lt;/td&gt;
      &lt;/tr&gt;
    &lt;/tbody&gt;
  &lt;/table&gt;
&lt;/div&gt;</code></pre>
      </div>

      <p style="margin-top:12px; font-size:14px; color:var(--text2);">
        💡 ఈ టెక్నిక్ వల్ల మొబైల్ యూజర్లు తమ వేలితో టేబుల్‌ను ఎడమకు కుడికి స్మూత్‌గా స్క్రోల్ చేసి మొత్తం సమాచారాన్ని చూడగలరు. పేజీ లేఅవుట్ కొద్దిగా కూడా దెబ్బతినదు!
      </p>
    </div>

    <!-- SECTION 11 -->
    <div class="section-title"><span class="num">11</span>బిగినర్స్ చేసే టాప్ 5 పొరపాట్లు &amp; పరిష్కారాలు</div>
    <div class="section-body">
      <div style="display:flex; flex-direction:column; gap:16px;">
        <div style="background:var(--bg2); border:1px solid #fecaca; border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px;">
          <strong style="color:#b91c1c;">1. తప్పు: వెబ్‌సైట్ లేఅవుట్ డిజైనింగ్ కోసం టేబుల్స్ వాడటం</strong>
          <p style="margin-top:6px; color:var(--text2); font-size:14px;">హెడర్, సైడ్‌బార్, ఫుటర్ డిజైన్ చేయడానికి <code>&lt;table&gt;</code> వాడటం ఘోరమైన తప్పు. దీనివల్ల వెబ్‌సైట్ మొబైల్‌లో అస్సలు రెస్పాన్సివ్ అవ్వదు మరియు SEO తీవ్రంగా దెబ్బతింటుంది. లేఅవుట్స్ కోసం ఎల్లప్పుడూ <strong>CSS Flexbox &amp; CSS Grid</strong> మాత్రమే వాడాలి!</p>
        </div>

        <div style="background:var(--bg2); border:1px solid #fecaca; border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px;">
          <strong style="color:#b91c1c;">2. తప్పు: colspan లేదా rowspan ఇచ్చినప్పుడు సెల్స్ లెక్క సరిపోకపోవడం</strong>
          <p style="margin-top:6px; color:var(--text2); font-size:14px;">పై వరుసలో 3 సెల్స్ ఉండి, క్రింది వరుసలో <code>colspan="2"</code> ఇచ్చిన తర్వాత కూడా మళ్ళీ 2 సెల్స్ రాయడం. దీనివల్ల టేబుల్ అంచులు అస్తవ్యస్తంగా బయటకు చొచ్చుకువస్తాయి. ఎల్లప్పుడూ ప్రతి వరుసలోని స్థలాల మొత్తం సమానంగా ఉండాలి.</p>
        </div>

        <div style="background:var(--bg2); border:1px solid #fecaca; border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px;">
          <strong style="color:#b91c1c;">3. తప్పు: &lt;th&gt; వాడకుండా సాధారణ &lt;td&gt; లో &lt;b&gt; ట్యాగ్ రాయడం</strong>
          <p style="margin-top:6px; color:var(--text2); font-size:14px;"><code>&lt;td&gt;&lt;b&gt;పేరు&lt;/b&gt;&lt;/td&gt;</code> అని రాయడం వల్ల అది హెడ్డింగ్‌గా కనిపించినప్పటికీ, సెమాంటిక్‌గా హెడర్ అవ్వదు. స్క్రీన్ రీడర్స్ దానిని హెడ్డింగ్‌గా గుర్తించలేవు. ఎల్లప్పుడూ హెడర్లకు <code>&lt;th&gt;</code> మాత్రమే వాడాలి.</p>
        </div>

        <div style="background:var(--bg2); border:1px solid #fecaca; border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px;">
          <strong style="color:#b91c1c;">4. తప్పు: border-collapse: collapse ఇవ్వడం మర్చిపోవడం</strong>
          <p style="margin-top:6px; color:var(--text2); font-size:14px;">CSS లో <code>border-collapse: collapse;</code> ఇవ్వకపోతే టేబుల్ ప్రతి సెల్ చుట్టూ రెండు రెండు గీతలు వచ్చి చాలా పాతకాలపు డిజైన్‌లా కనిపిస్తుంది.</p>
        </div>

        <div style="background:var(--bg2); border:1px solid #fecaca; border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px;">
          <strong style="color:#b91c1c;">5. తప్పు: &lt;caption&gt; ని &lt;tr&gt; లోపల రాయడం</strong>
          <p style="margin-top:6px; color:var(--text2); font-size:14px;"><code>&lt;caption&gt;</code> అనేది టేబుల్ యొక్క ప్రత్యక్ష చైల్డ్ (Direct Child). దానిని ఎప్పుడూ ఏ వరుస లోపలా పెట్టకూడదు; టేబుల్ ప్రారంభమైన వెంటనే మొట్టమొదట రాయాలి.</p>
        </div>
      </div>
    </div>

    <!-- SECTION 12 (INTERACTIVE COLLAPSIBLE QUIZ) -->
    <div class="section-title"><span class="num">12</span>ఇంటరాక్టివ్ సెల్ఫ్-టెస్ట్ క్విజ్ (Interactive Quiz)</div>
    <div class="section-body">
      <p>ఈ చాప్టర్‌లో మీరు నేర్చుకున్న విషయాలను స్వయంగా పరీక్షించుకోండి. ప్రతి ప్రశ్నను చదివి సమాధానం ఆలోచించిన తర్వాత "సమాధానం చూడండి" పై క్లిక్ చేయండి:</p>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:700; cursor:pointer; color:#059669;">
          ❓ ప్రశ్న 1: HTML టేబుల్‌లో ఒక సెల్ 3 కాలమ్స్ స్థలాన్ని తీసుకోవాలంటే ఏ ఆట్రిబ్యూట్ వాడాలి?
        </summary>
        <div style="margin-top:10px; color:var(--text2); font-size:14px; line-height:1.6;">
          <strong>సమాధానం:</strong> <code>colspan="3"</code>. ఇది అడ్డంగా ఉన్న 3 కాలమ్స్‌ను కలిపి ఒకే సెల్‌గా మారుస్తుంది.
        </div>
      </details>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:700; cursor:pointer; color:#059669;">
          ❓ ప్రశ్న 2: &lt;th&gt; మరియు &lt;td&gt; మధ్య ప్రధాన తేడా ఏమిటి?
        </summary>
        <div style="margin-top:10px; color:var(--text2); font-size:14px; line-height:1.6;">
          <strong>సమాధానం:</strong> <code>&lt;th&gt;</code> అనేది Table Header సెల్. ఇందులో ఉండే టెక్స్ట్ బోల్డ్‌గా మరియు సెంటర్‌లో ఉంటుంది. <code>&lt;td&gt;</code> అనేది సాధారణ Table Data సెల్. ఇందులో టెక్స్ట్ సాధారణంగా మరియు లెఫ్ట్ అలైన్ అయి ఉంటుంది.
        </div>
      </details>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:700; cursor:pointer; color:#059669;">
          ❓ ప్రశ్న 3: టేబుల్‌ను ప్రింట్ చేసేటప్పుడు ప్రతి పేజీలోనూ హెడర్లు రిపీట్ అవ్వాలంటే ఏ ఎలిమెంట్ వాడాలి?
        </summary>
        <div style="margin-top:10px; color:var(--text2); font-size:14px; line-height:1.6;">
          <strong>సమాధానం:</strong> <code>&lt;thead&gt;</code>. మల్టీ-పేజ్ ప్రింటింగ్‌లో బ్రౌజర్లు మరియు ప్రింటర్లు థెడ్ విభాగంలోని హెడ్డింగ్స్ వరుసను ప్రతి పేజీ పైభాగంలో ఆటోమేటిక్‌గా పునరావృతం చేస్తాయి.
        </div>
      </details>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:700; cursor:pointer; color:#059669;">
          ❓ ప్రశ్న 4: Accessibility కోసం &lt;th&gt; కి ఇచ్చే scope="col" యొక్క ఉపయోగం ఏమిటి?
        </summary>
        <div style="margin-top:10px; color:var(--text2); font-size:14px; line-height:1.6;">
          <strong>సమాధానం:</strong> ఆ హెడ్డింగ్ తన క్రింద ఉన్న పూర్తి కాలమ్ డేటాకు సంబంధించినదని స్క్రీన్ రీడర్‌లకు స్పష్టం చేస్తుంది. దీనివల్ల దృష్టి లోపం ఉన్నవారికి సెల్ విలువతో పాటు దాని హెడ్డింగ్ పేరు కూడా వినిపిస్తుంది.
        </div>
      </details>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:700; cursor:pointer; color:#059669;">
          ❓ ప్రశ్న 5: ఆధునిక వెబ్ డెవలప్‌మెంట్‌లో వెబ్‌సైట్ లేఅవుట్ (హెడర్, సైడ్‌బార్, ఫుటర్) కోసం &lt;table&gt; ఎందుకు వాడకూడదు?
        </summary>
        <div style="margin-top:10px; color:var(--text2); font-size:14px; line-height:1.6;">
          <strong>సమాధానం:</strong> టేబుల్స్ రిజిడ్‌గా (కఠినంగా) ఉంటాయి, మొబైల్ స్క్రీన్‌లకు అనుగుణంగా ఫ్లెక్సిబుల్‌గా మారలేవు (Not Responsive). అంతేకాకుండా స్క్రీన్ రీడర్స్ మరియు గూగుల్ బోట్స్‌కు పేజీ కంటెంట్ అర్థం కాదు. లేఅవుట్స్ కోసం CSS Flexbox మరియు Grid మాత్రమే వాడాలి.
        </div>
      </details>
    </div>

    <!-- SECTION 13 (TRY BOX & SUMMARY) -->
    <div class="section-title"><span class="num">13</span>మీరే స్వయంగా Try చేయండి &amp; సారాంశం (Quick Summary)</div>
    <div class="section-body">
      <div class="try-box" style="margin-top:10px;">
        <div class="try-title">🚀 టేబుల్స్, colspan మరియు rowspan కోడ్‌ను లైవ్‌గా రన్ చేసి చూడండి</div>
        <p>పైన ఇచ్చిన స్టూడెంట్ మార్కుల పట్టిక, సూపర్ మార్కెట్ బిల్లింగ్ టేబుల్, మరియు కాలేజీ టైమ్‌టేబుల్ కోడ్‌ను మన ఆన్‌లైన్ ఎడిటర్‌లో ఓపెన్ చేసి మీ స్వంత వరుసలు, కాలమ్స్ జోడించి వెంటనే లైవ్ ఫలితం చూడండి!</p>
        <a class="run-btn" href="/online-html-editor.html" target="_blank">
          👉 Our Compiler లో HTML Editor try చేయండి
        </a>
      </div>

      <div style="margin-top:24px;">
        <h4 style="color:#059669; font-size:16px; margin-bottom:10px;">📌 క్విక్ సారాంశం (Key Takeaways):</h4>
        <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.7;">
          <li><strong>టేబుల్ నిర్మాణం:</strong> <code>&lt;table&gt;</code> లోపల <code>&lt;tr&gt;</code> వరుసలు, అందులో <code>&lt;th&gt;</code> లేదా <code>&lt;td&gt;</code> సెల్స్ ఉంటాయి.</li>
          <li><strong>సెమాంటిక్ గ్రూప్స్:</strong> <code>&lt;thead&gt;</code> హెడర్లకు, <code>&lt;tbody&gt;</code> డేటాకు, <code>&lt;tfoot&gt;</code> సారాంశం/టోటల్స్‌కు వాడాలి.</li>
          <li><strong>శీర్షిక:</strong> టేబుల్ మొదట్లోనే <code>&lt;caption&gt;</code> ఇవ్వడం స్క్రీన్ రీడర్స్ మరియు SEO కి చాలా ముఖ్యం.</li>
          <li><strong>సెల్ మెర్జింగ్:</strong> అడ్డంగా కలపడానికి <code>colspan</code>, నిలువుగా కలపడానికి <code>rowspan</code>.</li>
          <li><strong>యాక్సెసిబిలిటీ:</strong> స్క్రీన్ రీడర్స్ కోసం హెడర్లకు <code>scope="col"</code> లేదా <code>scope="row"</code> ఉపయోగించాలి.</li>
          <li><strong>మొబైల్ రెస్పాన్సివ్:</strong> టేబుల్‌ను <code>overflow-x: auto</code> ఉన్న కంటైనర్‌లో ఉంచాలి.</li>
        </ul>
      </div>

      <div style="margin-top:20px; padding:16px; background:var(--bg2); border-left:4px solid #10b981; border-radius:0 8px 8px 0;">
        <strong>Phase 02 విజయవంతంగా పూర్తయింది! 🎉</strong><br>
        తర్వాతి అధ్యాయంలో మనం <strong>Phase 03: మోడరన్ సెమాంటిక్ HTML5 &amp; పేజ్ ఆర్కిటెక్చర్</strong> లోకి అడుగుపెడదాం! Chapter 9 లో <strong>సెమాంటిక్ ఎలిమెంట్స్: header, nav, main, footer, article, section</strong> గురించి అత్యంత ఆసక్తికరంగా నేర్చుకుందాం!
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

const targetFile = path.join(__dirname, '..', 'public', 'blog-html', '08-html-tables-headers-merge-and-styling.html');
fs.writeFileSync(targetFile, fullPageHtml, 'utf8');
console.log('✅ Successfully generated deep high-value Chapter 8!');
console.log('Target file size:', fullPageHtml.length, 'characters');

