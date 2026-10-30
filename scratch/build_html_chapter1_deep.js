const fs = require('fs');
const path = require('path');
const { LESSONS, buildSidebar } = require('./html_curriculum_data.js');

const lesson = LESSONS.find(l => l.num === 1);
const sidebarHtml = buildSidebar(1);

const chapterContentHtml = `
    <!-- BREADCRUMB -->
    <div class="breadcrumb">
      <a href="/">Home</a><span class="sep">›</span>
      <a href="/blog.html">Tutorials</a><span class="sep">›</span>
      <a href="/blog-html.html">HTML5 Masterclass</a><span class="sep">›</span>
      <span class="current">Chapter 1: HTML పరిచయం, Web Standards (W3C/WHATWG), ఎడిటర్స్ & First Web Page</span>
    </div>

    <!-- PAGE TITLE -->
    <h1 class="page-title">HTML పరిచయం, Web Standards (W3C/WHATWG), ఎడిటర్స్ & First Web Page</h1>

    <!-- PAGE META BADGES -->
    <div class="page-meta">
      <span class="badge">🌐 Modern HTML5 (W3C/WHATWG)</span>
      <span class="badge">🟢 Chapter 1 of 20</span>
      <span class="badge">📂 Phase 01: HTML5 పునాదులు & ఆర్కిటెక్చర్</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

    <!-- SUBTOPICS PILL BAR -->
    <div style="background:var(--bg3); border:1px solid var(--border); border-radius:8px; padding:10px 16px; margin-bottom:24px; font-size:13px; color:var(--text2); display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
      <span style="color:#10b981; font-weight:700;">📌 Covered in this chapter:</span>
      <span>HTML అంటే ఏమిటి? · ఇంటర్నెట్ & వెబ్ చరిత్ర · Tim Berners-Lee & CERN కథ · HTML, CSS, JS త్రయం (Trio) · W3C vs WHATWG లివింగ్ స్టాండర్డ్ · VS Code & Live Server సెటప్ · మొదటి వెబ్ పేజీ కోడ్ & లైన్ బై లైన్ విశ్లేషణ · ఎలిమెంట్స్ & ట్యాగ్స్ అనాటమీ · బిగినర్స్ సాధారణ తప్పులు · ప్రాక్టీస్ ప్రశ్నలు</span>
    </div>

    <!-- INTRO ACCENT BOX (Warm Ivory with Green Accent) -->
    <div class="intro-box">
      <p>మీరు రోజూ మీ స్మార్ట్‌ఫోన్ లేదా కంప్యూటర్‌లో Google లో ఏదైనా సెర్చ్ చేస్తున్నప్పుడు, YouTube లో వీడియో చూస్తున్నప్పుడు, Amazon లో షాపింగ్ చేస్తున్నప్పుడు లేదా వార్తలు చదువుతున్నప్పుడు స్క్రీన్ మీద కనిపించే ప్రతి అక్షరం, బొమ్మ (image), బటన్ మరియు లింక్ వెనుక అసలు ఏం జరుగుతుందో ఎప్పుడైనా గమనించారా?</p>
      <p>ప్రపంచవ్యాప్తంగా దాదాపు 200 కోట్లకు పైగా వెబ్‌సైట్లు ఉన్నాయి. వాటన్నింటికీ ఒకే ఒక్క ఉమ్మడి పునాది ఉంది — అదే <strong>HTML (HyperText Markup Language)</strong>. వెబ్ బ్రౌజర్‌కి అర్థమయ్యే ఏకైక మాతృభాష ఇది. HTML లేకపోతే ఇంటర్నెట్‌లో వెబ్ పేజీలు అనేవే ఉండవు.</p>
      <p>ఈ సమగ్ర అధ్యాయంలో మనం HTML అంటే ఏమిటి, అది ఎలా పుట్టింది, ప్రపంచాన్ని శాసిస్తున్న Web Standards (W3C/WHATWG) కథ ఏమిటి, మరియు మీ స్వంత చేతులతో మీ <strong>మొదటి HTML5 వెబ్ పేజీని ఎలా నిర్మించాలో</strong> చాలా ఆసక్తికరంగా, లోతైన ఉదాహరణలతో సులభంగా నేర్చుకుందాం. ఇంతకు ముందు మీకు ఎలాంటి ప్రోగ్రామింగ్ అనుభవం లేకపోయినా పర్వాలేదు, సున్నా నుండి ప్రారంభిద్దాం రండి!</p>
    </div>

    <!-- SECTION 1 -->
    <div class="section-title"><span class="num">1</span>ఈ Chapter లో మీరు నేర్చుకునే అంశాలు</div>
    <div class="section-body">
      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.7;">
        <li><strong>HTML అంటే ఏమిటి?</strong> HyperText Markup Language పదాల అర్థం మరియు వెబ్ బ్రౌజర్లు దీనిని ఎలా అర్థం చేసుకుంటాయి.</li>
        <li><strong>చారిత్రక నేపథ్యం:</strong> 1989 లో CERN లాబొరేటరీలో సర్ టిమ్ బెర్నర్స్-లీ (Tim Berners-Lee) World Wide Web మరియు మొదటి వెబ్‌పేజీని ఎలా సృష్టించారు.</li>
        <li><strong>వెబ్ త్రయం (The Web Trio):</strong> HTML, CSS, JavaScript ల మధ్య ఉన్న బలమైన సంబంధం (ఇల్లు మరియు మానవ శరీర ఉదాహరణలు).</li>
        <li><strong>Web Standards కథ:</strong> బ్రౌజర్ వార్స్ (Browser Wars), W3C మరియు WHATWG లు HTML5 లివింగ్ స్టాండర్డ్‌ను ఎలా స్థాపించాయి.</li>
        <li><strong>డెవలప్‌మెంట్ ఎన్విరాన్‌మెంట్ సెటప్:</strong> VS Code ఎడిటర్, అత్యవసర Extensions (Live Server) మరియు బ్రౌజర్ డెవలపర్ టూల్స్.</li>
        <li><strong>మీ మొట్టమొదటి HTML5 పేజీ:</strong> కోడ్ రాయడం, లైన్ బై లైన్ సమగ్ర విశ్లేషణ మరియు ఆన్‌లైన్ ఎడిటర్‌లో లైవ్ రన్ చేయడం.</li>
        <li><strong>బిగినర్స్ చేసే సాధారణ పొరపాట్లు & ప్రాక్టీస్ క్విజ్:</strong> ఇంటర్వ్యూలు మరియు పరీక్షలలో అడిగే కీలక ప్రశ్నలకు సమాధానాలు.</li>
      </ul>
    </div>

    <!-- SECTION 2 -->
    <div class="section-title"><span class="num">2</span>HTML అంటే ఏమిటి? అసలు వెబ్ పేజీ ఎలా పని చేస్తుంది?</div>
    <div class="section-body">
      <p><strong>HTML</strong> యొక్క పూర్తి పేరు <strong>HyperText Markup Language</strong>. ఇది ఒక ప్రోగ్రామింగ్ లాంగ్వేజ్ కాదు, ఇదొక <strong>మార్కప్ లాంగ్వేజ్ (Markup Language)</strong>. ఈ రెండు పదాల అసలు అంతరార్థాన్ని వివరంగా తెలుసుకుందాం:</p>
      
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:16px; margin:20px 0;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:10px; padding:18px;">
          <div style="font-weight:700; color:#10b981; font-size:16px; margin-bottom:8px;">🔗 HyperText (హైపర్‌టెక్స్ట్)</div>
          <p style="color:var(--text2); font-size:14px; line-height:1.6; margin:0;">
            సాధారణ పుస్తకంలో టెక్స్ట్ కేవలం పేజీల వారీగా ఒకే వరుసలో ఉంటుంది. కానీ కంప్యూటర్‌లో ఒక పదం లేదా బొమ్మపై క్లిక్ చేయగానే వేరే పేజీకి లేదా ప్రపంచంలో ఎక్కడో ఉన్న మరో సర్వర్‌కి వెంటనే దూకగలగడాన్ని (Hyper-linking) "హైపర్‌టెక్స్ట్" అంటారు.
          </p>
        </div>
        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:10px; padding:18px;">
          <div style="font-weight:700; color:#10b981; font-size:16px; margin-bottom:8px;">🏷️ Markup Language (మార్కప్ భాష)</div>
          <p style="color:var(--text2); font-size:14px; line-height:1.6; margin:0;">
            సాదా టెక్స్ట్‌ను బ్రౌజర్‌కు స్పష్టంగా వివరించడానికి ట్యాగ్స్ (Tags) ఉపయోగించి గుర్తులు వేయడాన్ని "మార్కప్" అంటారు. ఉదాహరణకు ఇది ఒక ముఖ్యమైన హెడ్డింగ్ అని చెప్పడానికి <code>&lt;h1&gt;</code>, ఇది ఒక పేరాగ్రాఫ్ అని చెప్పడానికి <code>&lt;p&gt;</code> అని ట్యాగ్స్ వాడతాం.
          </p>
        </div>
      </div>

      <p><strong>బ్రౌజర్ పాత్ర ఏమిటి? (How Browsers Render HTML):</strong></p>
      <p>మనం రాసే HTML ఫైల్ కేవలం సాదా అక్షరాల టెక్స్ట్ ఫైల్ (Plain text file with <code>.html</code> extension). గూగుల్ క్రోమ్ (Chrome), మైక్రోసాఫ్ట్ ఎడ్జ్ (Edge) లేదా మొజిల్లా ఫైర్‌ఫాక్స్ (Firefox) లాంటి వెబ్ బ్రౌజర్లు ఈ ఫైల్‌ను చదివి, ట్యాగ్‌లను విశ్లేషించి (Parsing), <strong>DOM (Document Object Model)</strong> ట్రీగా మార్చి మన కంటికి అందమైన గ్రాఫికల్ వెబ్‌పేజీగా చూపిస్తాయి. బ్రౌజర్‌లో ట్యాగ్‌లు కంటికి కనిపించవు, వాటిలోని ఫలితం మాత్రమే కనిపిస్తుంది!</p>

      <div class="callout">
        <div class="callout-title">💡 ప్రోగ్రామింగ్ లాంగ్వేజ్ vs మార్కప్ లాంగ్వేజ్ తేడా:</div>
        <p>C, Java, Python లేదా JavaScript లలో లాజిక్ (Logic), లూప్‌లు (Loops: for, while), షరతులు (Conditions: if/else) మరియు గణిత లెక్కలు ఉంటాయి. కానీ HTML లో ఎలాంటి లాజిక్ ఉండదు. HTML కేవలం పేజీలోని కంటెంట్ యొక్క <strong>అర్థాన్ని (Semantics)</strong> మరియు <strong>రూపాన్ని (Structure)</strong> నిర్దేశిస్తుంది.</p>
      </div>
    </div>

    <!-- SECTION 3 -->
    <div class="section-title"><span class="num">3</span>HTML ఎలా పుట్టింది? Tim Berners-Lee & Web ఆవిర్భావం</div>
    <div class="section-body">
      <p>ఇంటర్నెట్ చరిత్రలోనే అత్యంత విప్లవాత్మకమైన కథ ఇది. 1989 లో స్విట్జర్లాండ్‌లోని జెనీవాలో ఉన్న <strong>CERN (యూరోపియన్ న్యూక్లియర్ రీసెర్చ్ ఆర్గనైజేషన్)</strong> లో పనిచేస్తున్న బ్రిటిష్ శాస్త్రవేత్త <strong>సర్ టిమ్ బెర్నర్స్-లీ (Sir Tim Berners-Lee)</strong> ఒక సమస్యను ఎదుర్కొన్నారు.</p>
      <p>ప్రపంచవ్యాప్తంగా ఉన్న సైంటిస్టులు వేర్వేరు కంప్యూటర్లలో వేర్వేరు ఆపరేటింగ్ సిస్టమ్స్ (UNIX, Mac, Windows) వాడుతున్నారు. ఒక శాస్త్రవేత్త రాసిన పరిశోధనా పత్రం (Research Paper) మరొకరు చదవాలంటే ఫార్మాట్ మారేది, లింకులు ఉండేవి కావు. ఈ సమస్యను శాశ్వతంగా పరిష్కరించడానికి ఆయన 3 అద్భుతమైన ఆవిష్కరణలు చేశారు:</p>
      <ol style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.7;">
        <li><strong>HTML:</strong> డాక్యుమెంట్లను రాయడానికి ఒక ఉమ్మడి మార్కప్ భాష.</li>
        <li><strong>HTTP (HyperText Transfer Protocol):</strong> ఇంటర్నెట్ ద్వారా డాక్యుమెంట్లను ఒక కంప్యూటర్ నుండి ఇంకో కంప్యూటర్‌కి పంపే ప్రొటోకాల్.</li>
        <li><strong>World Wide Web (WWW):</strong> లింకుల ద్వారా ప్రపంచం మొత్తాన్ని అనుసంధానించే సమాచార వ్యవస్థ.</li>
      </ol>
      <p>1991 ఆగస్టు 6న ప్రపంచంలోనే మొట్టమొదటి వెబ్‌సైట్ <code>http://info.cern.ch</code> లైవ్ అయింది. అప్పట్లో రంగులు లేవు, వీడియోలు లేవు, కేవలం టెక్స్ట్ మరియు నీలిరంగు లింకులు మాత్రమే ఉండేవి. నేడు మనం చూస్తున్న ఆధునిక AI వెబ్ అప్లికేషన్లు, ఇ-కామర్స్ పోర్టల్స్ అన్నీ ఆ చిన్న ప్రయోగంపైనే నిర్మించబడ్డాయి!</p>
    </div>

    <!-- SECTION 4 -->
    <div class="section-title"><span class="num">4</span>HTML, CSS, JavaScript — వెబ్ త్రయం (The Web Trio)</div>
    <div class="section-body">
      <p>వెబ్ డెవలప్‌మెంట్‌లో ప్రతి వెబ్‌సైట్ మూడు ప్రధాన పిల్లర్లపై నిలబడుతుంది. వీటిని రియల్ వరల్డ్ ఉదాహరణలతో పోల్చి చూస్తే ఎప్పటికీ మర్చిపోలేరు:</p>
      
      <table class="tbl">
        <thead>
          <tr>
            <th>టెక్నాలజీ</th>
            <th>ఇంటి ఉదాహరణ (Architecture)</th>
            <th>మానవ శరీరం ఉదాహరణ</th>
            <th>వెబ్‌పేజీలో అసలు పని</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong style="color:#10b981;">HTML5</strong></td>
            <td>గోడలు, పిల్లర్లు, పునాది, కిటికీలు (నిర్మాణం)</td>
            <td>ఎముకల గూడు (అస్థిపంజరం / Skeleton)</td>
            <td>పేజీలో ఏముండాలో చెబుతుంది (Headings, Paragraphs, Images, Forms).</td>
          </tr>
          <tr>
            <td><strong style="color:#38bdf8;">CSS3</strong></td>
            <td>రంగులు, వాల్‌పేపర్స్, ఫర్నిచర్, లైటింగ్ (అందం)</td>
            <td>చర్మం, కళ్లు, అందమైన బట్టలు, హెయిర్‌స్టైల్</td>
            <td>పేజీ ఎలా కనిపించాలో చెబుతుంది (Colors, Fonts, Layout, Animations).</td>
          </tr>
          <tr>
            <td><strong style="color:#f59e0b;">JavaScript</strong></td>
            <td>కరెంట్ స్విచ్‌లు, సెన్సార్లు, గేట్ ఓపెనర్ (కదలికలు)</td>
            <td>మెదడు, నరాలు, కండరాలు (స్పందనలు)</td>
            <td>పేజీ ఎలా ప్రవర్తించాలో చెబుతుంది (Button Clicks, Dynamic Popups, APIs).</td>
          </tr>
        </tbody>
      </table>

      <p>కేవలం HTML రాస్తే పేజీకి పక్కా నిర్మాణం వస్తుంది. దానికి CSS జోడిస్తే కంటికి ఇంపుగా మారుతుంది. JavaScript జోడిస్తే పేజీ సజీవంగా యూజర్ చర్యలకు స్పందిస్తుంది. ఈ మూడింటి కలయికే పూర్తి ఫ్రంట్-ఎండ్ డెవలప్‌మెంట్!</p>
    </div>

    <!-- SECTION 5 -->
    <div class="section-title"><span class="num">5</span>Web Standards కథ: W3C vs WHATWG మరియు HTML5 లివింగ్ స్టాండర్డ్</div>
    <div class="section-body">
      <p>1990ల మధ్యలో జరిగిన మొదటి <strong>బ్రౌజర్ వార్స్ (Browser Wars)</strong> గురించి మీరు వినే ఉంటారు. Netscape Navigator మరియు Microsoft Internet Explorer సంస్థలు పోటీ పడి ఒకరిని మించి మరొకరు తమ సొంత ట్యాగ్స్ (ఉదాహరణకు <code>&lt;blink&gt;</code>, <code>&lt;marquee&gt;</code>) బ్రౌజర్లలో ప్రవేశపెట్టాయి. ఫలితంగా ఒక వెబ్‌సైట్ Netscape లో పని చేస్తే Internet Explorer లో క్రాష్ అయ్యేది! డెవలపర్లు నరకం చూశారు.</p>
      
      <p>ఈ గందరగోళాన్ని ఆపడానికి 1994 లో టిమ్ బెర్నర్స్-లీ <strong>W3C (World Wide Web Consortium)</strong> ను స్థాపించారు. అన్ని బ్రౌజర్లు ఒకే నిబంధనలను పాటించాలని రూల్స్ తయారు చేశారు.</p>

      <div style="background:var(--bg2); border:1px solid var(--border); border-radius:10px; padding:18px; margin:20px 0;">
        <h4 style="color:#10b981; margin-bottom:8px; font-size:15px;">🚀 HTML5 ఎలా పుట్టింది? WHATWG కథ:</h4>
        <p style="color:var(--text2); font-size:14px; line-height:1.6; margin-bottom:8px;">
          2000వ దశకం ప్రారంభంలో W3C సంస్థ HTML ను ఆపేసి <strong>XHTML</strong> అనే అత్యంత కఠినమైన రూల్స్ ఉన్న భాష వైపు మొగ్గు చూపింది. చిన్న కామా మిస్సయినా పేజీ మొత్తం బ్లాంక్ స్క్రీన్ చూపించేది. ఇది వెబ్ డెవలపర్లకు తీవ్ర అసంతృప్తి కలిగించింది.
        </p>
        <p style="color:var(--text2); font-size:14px; line-height:1.6; margin:0;">
          అందువల్ల 2004 లో <strong>Apple, Mozilla, Opera</strong> ఇంజనీర్లు కలిసి <strong>WHATWG (Web Hypertext Application Technology Working Group)</strong> ను ఏర్పాటు చేశారు. వీరు ఆధునిక వెబ్ కోసం వీడియో, ఆడియో, కాన్వాస్, మొబైల్ సపోర్ట్‌తో సరికొత్త <strong>HTML5</strong> ని రూపొందించారు. చివరకు W3C కూడా దిగివచ్చి WHATWG తో చేతులు కలిపింది.
        </p>
      </div>

      <p><strong>ముఖ్య గమనిక (No more HTML6):</strong> ఇప్పుడు HTML అనేది వెర్షన్లతో ఆగిపోయేది కాదు. దీనిని <strong>WHATWG HTML Living Standard</strong> అంటారు. అంటే ప్రతి సంవత్సరం అవసరమైన కొత్త ఫీచర్లు నిరంతరం యాడ్ అవుతూనే ఉంటాయి!</p>
    </div>

    <!-- SECTION 6 -->
    <div class="section-title"><span class="num">6</span>HTML కోడింగ్ చేయడానికి కావాల్సిన టూల్స్ & VS Code సెటప్</div>
    <div class="section-body">
      <p>HTML నేర్చుకోవడానికి మీకు ఎలాంటి ఖరీదైన సాఫ్ట్‌వేర్ అవసరం లేదు. మీ కంప్యూటర్‌లో ఉండే ఉచిత టూల్స్ సరిపోతాయి:</p>

      <ol style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.7;">
        <li><strong>Code Editor (కోడ్ ఎడిటర్):</strong> ప్రపంచవ్యాప్తంగా నంబర్ 1 ఎడిటర్ <strong>Visual Studio Code (VS Code)</strong>. ఇది మైక్రోసాఫ్ట్ అందించే ఉచిత ఓపెన్-సోర్స్ ఎడిటర్. (విండోస్ నోట్‌ప్యాడ్‌లో కూడా రాయవచ్చు, కానీ సింటాక్స్ హైలైటింగ్ మరియు ఆటోకంప్లీట్ ఉండవు).</li>
        <li><strong>Web Browser (వెబ్ బ్రౌజర్):</strong> Google Chrome, Mozilla Firefox లేదా Brave. ఇందులో F12 నొక్కడం ద్వారా <strong>Developer Tools (DevTools)</strong> ని ఉపయోగించి లైవ్ DOM ని చూడవచ్చు.</li>
        <li><strong>Live Server Extension (మ్యాజికల్ టూల్):</strong> VS Code లో Extensions మార్కెట్‌ప్లేస్‌కి వెళ్లి "Live Server" (by Ritwick Dey) ఇన్‌స్టాల్ చేసుకోండి. మీరు కోడ్ రాసి సేవ్ చేయగానే పేజీ ఆటోమేటిక్‌గా బ్రౌజర్‌లో రిఫ్రెష్ అవుతుంది!</li>
      </ol>

      <div class="callout">
        <div class="callout-title">⚡ ఆన్‌లైన్‌లో తక్షణమే ప్రాక్టీస్ చేయండి:</div>
        <p>ఏమీ ఇన్‌స్టాల్ చేసుకోకుండా నేరుగా ఇప్పుడే ప్రాక్టీస్ చేయాలనుకుంటున్నారా? మన వెబ్‌సైట్‌లోని <strong>Our Compiler HTML Editor</strong> ను వాడండి. ఎడమవైపు కోడ్ టైప్ చేస్తుంటే కుడివైపు లైవ్ రిజల్ట్ తక్షణమే కనిపిస్తుంది!</p>
      </div>
    </div>

    <!-- SECTION 7 -->
    <div class="section-title"><span class="num">7</span>మన మొదటి HTML5 వెబ్ పేజీ (Your First Web Page)</div>
    <div class="section-body">
      <p>ఇప్పుడు మనం మన చేతులతో మొదటి వెబ్ పేజీని నిర్మిద్దాం. ఒక కంప్యూటర్‌లో ఫోల్డర్ క్రియేట్ చేసి <code>index.html</code> అనే ఫైల్ తయారు చేయండి. అందులో క్రింది ప్రామాణికమైన HTML5 కోడ్‌ను రాయండి:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">HTML5</span>
          <div class="code-actions">
            <a class="try-btn" href="/online-html-editor.html" target="_blank">▶ Run in Online HTML Editor</a>
          </div>
        </div>
        <pre><code>&lt;!DOCTYPE html&gt;
&lt;html lang="te"&gt;
  &lt;head&gt;
    &lt;meta charset="UTF-8" /&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0" /&gt;
    &lt;title&gt;నా మొదటి వెబ్‌పేజీ | My First Web Page&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;h1&gt;నమస్కారం, ప్రపంచమా! (Hello World)&lt;/h1&gt;
    &lt;p&gt;ఇది నా జీవితంలో నేను స్వయంగా రాసిన మొట్టమొదటి HTML5 వెబ్ పేజీ.&lt;/p&gt;
    &lt;p&gt;Our Compiler ద్వారా నేను సులభంగా HTML5 మాస్టర్‌క్లాస్ నేర్చుకుంటున్నాను.&lt;/p&gt;
  &lt;/body&gt;
&lt;/html&gt;</code></pre>
      </div>

      <p style="margin-top:16px;"><strong>బ్రౌజర్‌లో ఇది ఎలా కనిపిస్తుంది? (Visual Browser Output):</strong></p>
      <div style="background:#ffffff; border:1px solid #cbd5e1; border-radius:10px; padding:24px; margin:16px 0; box-shadow:0 4px 12px rgba(0,0,0,0.05); color:#0f172a;">
        <div style="display:flex; align-items:center; gap:8px; padding-bottom:12px; margin-bottom:16px; border-bottom:1px solid #e2e8f0; font-size:12px; color:#64748b;">
          <span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:#ef4444;"></span>
          <span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:#f59e0b;"></span>
          <span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:#10b981;"></span>
          <span style="margin-left:8px; font-family:'JetBrains Mono', monospace; font-size:11px;">https://localhost:5500/index.html</span>
        </div>
        <h1 style="font-size:24px; font-weight:800; color:#0f172a; margin-bottom:10px;">నమస్కారం, ప్రపంచమా! (Hello World)</h1>
        <p style="font-size:15px; line-height:1.7; color:#334155; margin-bottom:8px;">ఇది నా జీవితంలో నేను స్వయంగా రాసిన మొట్టమొదటి HTML5 వెబ్ పేజీ.</p>
        <p style="font-size:15px; line-height:1.7; color:#334155; margin:0;">Our Compiler ద్వారా నేను సులభంగా HTML5 మాస్టర్‌క్లాస్ నేర్చుకుంటున్నాను.</p>
      </div>

      <p>అభినందనలు! మీరు విజయవంతంగా మీ మొదటి HTML5 డాక్యుమెంట్‌ను రూపొందించారు!</p>
    </div>

    <!-- SECTION 8 -->
    <div class="section-title"><span class="num">8</span>కోడ్‌ను లైన్ బై లైన్ లోతుగా విశ్లేషిద్దాం</div>
    <div class="section-body">
      <p>పై కోడ్‌లోని ప్రతి అక్షరానికి వెనుక ఒక స్పష్టమైన సాంకేతిక కారణం ఉంది. బ్రౌజర్ ప్రతి లైన్‌ను ఎలా అర్థం చేసుకుంటుందో చూద్దాం:</p>

      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.8;">
        <li>
          <code>&lt;!DOCTYPE html&gt;</code>: ఇది అసలు ఒక HTML ట్యాగ్ కాదు! ఇదొక <strong>డాక్యుమెంట్ టైప్ డిక్లరేషన్ (Document Type Declaration)</strong>. బ్రౌజర్‌కు "ఈ ఫైల్ ఆధునిక HTML5 ప్రమాణాలతో రాయబడింది, కాబట్టి Standards Mode లో ఎలాంటి పాత బగ్స్ లేకుండా రెండర్ చెయ్యి" అని చెబుతుంది.
        </li>
        <li>
          <code>&lt;html lang="te"&gt;</code>: ఇది మొత్తం వెబ్‌పేజీకి <strong>రూట్ ఎలిమెంట్ (Root Element)</strong>. పేజీలోని సమస్త కంటెంట్ దీని లోపలే ఉండాలి. <code>lang="te"</code> అనేది తెలుగు భాషను సూచిస్తుంది. స్క్రీన్ రీడర్స్ దృష్టిలోపం ఉన్నవారికి సరైన తెలుగు ఉచ్చారణతో చదివి వినిపించడానికి, Google సెర్చ్ ఇంజన్లకు ఇది అత్యవసరం.
        </li>
        <li>
          <code>&lt;head&gt;</code>: ఇది వెబ్‌పేజీ యొక్క <strong>మెదడు (Metadata Container)</strong> లాంటిది. ఇందులో ఉండే సమాచారం నేరుగా వెబ్ పేజీ స్క్రీన్ మీద కనిపించదు. కానీ పేజీ టైటిల్, క్యారెక్టర్ ఎన్‌కోడింగ్, మొబైల్ వ్యూపోర్ట్, CSS లింకులు అన్నీ ఇందులోనే ఉంటాయి.
        </li>
        <li>
          <code>&lt;meta charset="UTF-8" /&gt;</code>: ప్రపంచంలోనే అత్యంత ముఖ్యమైన లైన్ ఇది! UTF-8 అనేది యూనివర్సల్ క్యారెక్టర్ ఎన్‌కోడింగ్. ఇది లేకపోతే మీ పేజీలోని తెలుగు అక్షరాలు లేదా ఎమోజీలు విరిగిపోయి అర్థం పర్థం లేని గుర్తులుగా (Mojibake: <code>à°¨à°®à°¸à±</code>) కనిపిస్తాయి.
        </li>
        <li>
          <code>&lt;meta name="viewport" content="width=device-width, initial-scale=1.0" /&gt;</code>: మీ వెబ్‌సైట్ స్మార్ట్‌ఫోన్లు, టాబ్లెట్‌లు మరియు ల్యాప్‌టాప్‌లలో ఆటోమేటిక్‌గా స్క్రీన్ వెడల్పుకు తగ్గట్టుగా అడ్జస్ట్ కావడానికి (Responsive Web Design) ఈ ట్యాగ్ తప్పనిసరి.
        </li>
        <li>
          <code>&lt;title&gt;</code>: బ్రౌజర్ పైభాగంలో ఉన్న ట్యాబ్ మీద మరియు బుక్‌మార్క్‌లలో కనిపించే పేరును ఇది నిర్ణయిస్తుంది. SEO (Search Engine Optimization) లో దీనిది అగ్రస్థానం.
        </li>
        <li>
          <code>&lt;body&gt;</code>: వెబ్‌పేజీ యొక్క <strong>శరీరం</strong>. వినియోగదారుడి కంటికి స్క్రీన్ మీద కనిపించే హెడ్డింగ్స్, బొమ్మలు, వీడియోలు, పేరాగ్రాఫ్‌లు, బటన్లు అన్నీ కేవలం <code>&lt;body&gt;</code> లోపల మాత్రమే ఉండాలి.
        </li>
        <li>
          <code>&lt;h1&gt;</code>: Heading Level 1. పేజీలోని అన్నింటికంటే ముఖ్యమైన ప్రధాన శీర్షిక. ఒక పేజీకి ఒక్క <code>h1</code> మాత్రమే ఉండడం ఉత్తమమైన పద్ధతి.
        </li>
        <li>
          <code>&lt;p&gt;</code>: Paragraph ట్యాగ్. సాధారణ టెక్స్ట్ పేరాగ్రాఫ్‌లను రాయడానికి దీనిని ఉపయోగిస్తారు.
        </li>
      </ul>
    </div>

    <!-- SECTION 9 -->
    <div class="section-title"><span class="num">9</span>HTML ఎలిమెంట్స్ & ట్యాగ్స్ అనాటమీ (Tags vs Elements vs Attributes)</div>
    <div class="section-body">
      <p>బిగినర్స్ తరచుగా "ట్యాగ్", "ఎలిమెంట్", "ఆట్రిబ్యూట్" అనే పదాలను గందరగోళం చేసుకుంటారు. ఈ క్రింది చిత్రాన్ని స్పష్టంగా గమనించండి:</p>

      <div class="diagram-box">
  ┌───────────────────────────────── HTML ELEMENT ─────────────────────────────────┐
  │                                                                                │
  │   &lt;p   class="intro"   id="first"&gt;    హలో తెలుగు మిత్రులారా!    &lt;/p&gt;            │
  │   └──┬┘ └────────┬───┘ └────┬────┘    └────────┬──────────┘    └──┬─┘            │
  │      │           │          │                  │                  │            │
  │   Opening     Attribute  Attribute          Element           Closing          │
  │     Tag         Name       Value            Content             Tag            │
  └────────────────────────────────────────────────────────────────────────────────┘
      </div>

      <div style="display:flex; flex-direction:column; gap:12px; margin:20px 0;">
        <div style="background:var(--bg2); border-left:4px solid #10b981; padding:12px 16px; border-radius:0 8px 8px 0;">
          <strong>1. Opening Tag (ప్రారంభ ట్యాగ్):</strong> ట్యాగ్ పేరును కోణీయ బ్రాకెట్లలో ఉంచడం (<code>&lt;p&gt;</code>).
        </div>
        <div style="background:var(--bg2); border-left:4px solid #38bdf8; padding:12px 16px; border-radius:0 8px 8px 0;">
          <strong>2. Content (విషయం):</strong> ప్రారంభ మరియు ముగింపు ట్యాగ్‌ల మధ్య మనం రాసే అసలైన సమాచారం.
        </div>
        <div style="background:var(--bg2); border-left:4px solid #f59e0b; padding:12px 16px; border-radius:0 8px 8px 0;">
          <strong>3. Closing Tag (ముగింపు ట్యాగ్):</strong> స్లాష్ గుర్తుతో ముగిసే ట్యాగ్ (<code>&lt;/p&gt;</code>).
        </div>
        <div style="background:var(--bg2); border-left:4px solid #a855f7; padding:12px 16px; border-radius:0 8px 8px 0;">
          <strong>4. Element (ఎలిమెంట్):</strong> ప్రారంభ ట్యాగ్ + కంటెంట్ + ముగింపు ట్యాగ్ — ఈ మూడింటినీ కలిపి ఒక "HTML Element" అంటారు.
        </div>
        <div style="background:var(--bg2); border-left:4px solid #ef4444; padding:12px 16px; border-radius:0 8px 8px 0;">
          <strong>5. Void Elements (స్వీయ-ముగింపు ట్యాగ్‌లు):</strong> కొన్ని ట్యాగ్‌లకు ఎలాంటి కంటెంట్ ఉండదు. వాటికి క్లోజింగ్ ట్యాగ్ అవసరం లేదు. ఉదాహరణకు: లైన్ బ్రేక్ కోసం <code>&lt;br&gt;</code>, గీత కోసం <code>&lt;hr&gt;</code>, చిత్రాల కోసం <code>&lt;img&gt;</code>, ఇన్‌పుట్ కోసం <code>&lt;input&gt;</code>.
        </div>
      </div>
    </div>

    <!-- SECTION 10 -->
    <div class="section-title"><span class="num">10</span>Beginners చేసే సాధారణ తప్పులు (Common Pitfalls)</div>
    <div class="section-body">
      <p>HTML నేర్చుకునే ప్రారంభంలో విద్యార్థులు తరచుగా చేసే 4 ప్రధాన పొరపాట్లు మరియు వాటిని సరిదిద్దే మార్గాలు:</p>

      <p style="font-weight:700; color:#ef4444; margin-top:16px;">❌ తప్పు 1: క్లోజింగ్ ట్యాగ్ మర్చిపోవడం (Unclosed Tags)</p>
      <div class="code-block">
        <pre><code>&lt;!-- తప్పు: /p రాయడం మర్చిపోయారు --&gt;
&lt;p&gt;మొదటి పేరాగ్రాఫ్
&lt;p&gt;రెండవ పేరాగ్రాఫ్</code></pre>
      </div>
      <p style="color:var(--text2); font-size:14px;"><strong>సరైన పద్ధతి:</strong> ప్రతి ఓపెనింగ్ ట్యాగ్‌కు సరిపోయే క్లోజింగ్ ట్యాగ్ తప్పక ఉండాలి: <code>&lt;p&gt;మొదటి పేరాగ్రాఫ్&lt;/p&gt;</code>.</p>

      <p style="font-weight:700; color:#ef4444; margin-top:20px;">❌ తప్పు 2: నెస్టెడ్ ట్యాగ్స్ క్రమం తారుమారు చేయడం (Bad Nesting Order)</p>
      <div class="code-block">
        <pre><code>&lt;!-- తప్పు: b లోపల i ఓపెన్ చేసి, ముందు b ని క్లోజ్ చేశారు --&gt;
&lt;p&gt;&lt;b&gt;&lt;i&gt;ముఖ్యమైన సమాచారం&lt;/b&gt;&lt;/i&gt;&lt;/p&gt;</code></pre>
      </div>
      <p style="color:var(--text2); font-size:14px;"><strong>సరైన పద్ధతి:</strong> LIFO (Last In First Out) సూత్రం పాటించాలి. చివరగా ఓపెన్ చేసిన ట్యాగ్‌ను ముందుగా క్లోజ్ చేయాలి: <code>&lt;p&gt;&lt;b&gt;&lt;i&gt;ముఖ్యమైన సమాచారం&lt;/i&gt;&lt;/b&gt;&lt;/p&gt;</code>.</p>

      <p style="font-weight:700; color:#ef4444; margin-top:20px;">❌ తప్పు 3: DOCTYPE డిక్లరేషన్ రాయకపోవడం</p>
      <p style="color:var(--text2); font-size:14px;">
        మొదటి లైన్‌లో <code>&lt;!DOCTYPE html&gt;</code> రాయకపోతే బ్రౌజర్ <strong>"Quirks Mode"</strong> అనే పాతకాలపు బగ్గి మోడ్‌లోకి వెళ్ళిపోతుంది. దీనివల్ల ఆధునిక CSS Flexbox/Grid లేఅవుట్లు పూర్తిగా గందరగోళంగా మారిపోతాయి.
      </p>

      <p style="font-weight:700; color:#ef4444; margin-top:20px;">❌ తప్పు 4: కేస్ సెన్సిటివిటీ (Case Sensitivity) అలవాట్లు</p>
      <p style="color:var(--text2); font-size:14px;">
        HTML ట్యాగ్స్ కేస్-ఇన్‌సెన్సిటివ్ (Case-insensitive). అంటే <code>&lt;H1&gt;</code> రాసినా, <code>&lt;h1&gt;</code> రాసినా బ్రౌజర్ పని చేస్తుంది. కానీ ప్రపంచ వెబ్ ప్రమాణాల ప్రకారం ఎల్లప్పుడూ <strong>చిన్న అక్షరాలతోనే (lowercase)</strong> రాయాలి. క్లీన్ కోడ్ నియమం ఇది!
      </p>
    </div>

    <!-- SECTION 11 -->
    <div class="section-title"><span class="num">11</span>ప్రాక్టీస్ టాస్క్స్ & ఇంటర్వ్యూ క్విజ్ ప్రశ్నలు</div>
    <div class="section-body">
      <p>ఈ క్రింది ప్రశ్నలను సొంతంగా పరిష్కరించడానికి ప్రయత్నించండి. ఆ తర్వాత డ్రాప్‌డౌన్ తెరిచి సమాధానాలు సరిచూసుకోండి:</p>

      <ol style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.8;">
        <li>HTML ను ప్రోగ్రామింగ్ లాంగ్వేజ్ అని ఎందుకు అనకూడదు? ఒక స్పష్టమైన సాంకేతిక కారణం చెప్పండి.</li>
        <li><code>&lt;!DOCTYPE html&gt;</code> వెబ్‌పేజీలో ఏ పని చేస్తుంది? అది లేకపోతే బ్రౌజర్ ఏ మోడ్‌లోకి వెళుతుంది?</li>
        <li>తెలుగు లేదా ఎమోజీలు వెబ్‌పేజీలో సరిగ్గా కనిపించాలంటే ఏ మెటా ట్యాగ్ ఉపయోగించాలి?</li>
        <li>ఈ కోడ్‌లో తప్పు ఏమిటి: <code>&lt;h1&gt;స్వాగతం&lt;h1&gt;</code>?</li>
        <li>Void Elements అంటే ఏమిటి? కనీసం 3 ఉదాహరణలు ఇవ్వండి.</li>
      </ol>

      <details>
        <summary>🔍 సమాధానాలు & వివరణ చూడండి (Click to expand)</summary>
        <div style="margin-top:12px; font-size:14.5px; line-height:1.7; color:var(--text2);">
          <p><strong>1. సమాధానం:</strong> ప్రోగ్రామింగ్ భాషల్లో ఉండే డేటా టైప్స్, వేరియబుల్స్, కండిషనల్ లాజిక్ (if/else), లూప్‌లు మరియు గణిత లెక్కలు HTML లో ఉండవు. ఇది కేవలం సమాచారానికి అర్ధం మరియు రూపాన్నిచ్చే మార్కప్ భాష మాత్రమే.</p>
          <p style="margin-top:8px;"><strong>2. సమాధానం:</strong> ఇది బ్రౌజర్‌కు పేజీ HTML5 ప్రమాణాలతో ఉందని తెలిపి Standards Mode లో రెండర్ అయ్యేలా చేస్తుంది. లేకపోతే బ్రౌజర్ Quirks Mode లోకి వెళ్ళి పాత బగ్స్ తో లేఅవుట్ దెబ్బతింటుంది.</p>
          <p style="margin-top:8px;"><strong>3. సమాధానం:</strong> <code>&lt;meta charset="UTF-8" /&gt;</code> ట్యాగ్‌ను <code>&lt;head&gt;</code> విభాగంలో తప్పనిసరిగా చేర్చాలి.</p>
          <p style="margin-top:8px;"><strong>4. సమాధానం:</strong> ముగింపు ట్యాగ్‌లో స్లాష్ (<code>/</code>) లేదు. సరైన రూపం: <code>&lt;h1&gt;స్వాగతం&lt;/h1&gt;</code>.</p>
          <p style="margin-top:8px;"><strong>5. సమాధానం:</strong> క్లోజింగ్ ట్యాగ్ మరియు కంటెంట్ అవసరం లేని స్వీయ-ముగింపు ట్యాగ్‌లను Void Elements అంటారు. ఉదాహరణలు: <code>&lt;br&gt;</code>, <code>&lt;hr&gt;</code>, <code>&lt;img&gt;</code>, <code>&lt;input&gt;</code>, <code>&lt;meta&gt;</code>.</p>
        </div>
      </details>
    </div>

    <!-- SECTION 12 (TRY BOX) -->
    <div class="section-title"><span class="num">12</span>మీరే స్వయంగా Try చేయండి (Live Coding Playground)</div>
    <div class="section-body">
      <div class="try-box" style="margin-top:10px;">
        <div class="try-title">🚀 బ్రౌజర్‌లోనే HTML5 కోడింగ్ చేసి చూడండి</div>
        <p>మనం ఈ అధ్యాయంలో నేర్చుకున్న మొదటి HTML5 వెబ్ పేజీ కోడ్‌ను మన ఇంటరాక్టివ్ ఎడిటర్‌లో నేరుగా రన్ చేసి చూడండి. మీ పేరు మరియు ఊరి పేర్లతో కొత్త పేరాగ్రాఫ్‌లు రాసి, లైవ్ ప్రివ్యూ ఎలా మారుతుందో గమనించండి!</p>
        <a class="run-btn" href="/online-html-editor.html" target="_blank">
          👉 Our Compiler లో HTML Editor try చేయండి
        </a>
      </div>
    </div>

    <!-- SECTION 13 -->
    <div class="section-title"><span class="num">13</span>సారాంశం (Quick Summary)</div>
    <div class="section-body">
      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.7;">
        <li><strong>HTML (HyperText Markup Language):</strong> సమస్త ఇంటర్నెట్ ప్రపంచానికి మూల పునాది; బ్రౌజర్లు దీనిని చదివి వెబ్‌పేజీలుగా మారుస్తాయి.</li>
        <li><strong>వెబ్ త్రయం:</strong> HTML నిర్మాణం (Structure), CSS అందం (Design), JavaScript ప్రవర్తన (Functionality).</li>
        <li><strong>చరిత్ర:</strong> 1989 లో సర్ టిమ్ బెర్నర్స్-లీ CERN లో WWW మరియు మొదటి వెబ్‌పేజీని ఆవిష్కరించారు.</li>
        <li><strong>Standards:</strong> W3C మరియు WHATWG లు నేడు HTML ను నిరంతరం వృద్ధి చెందే <strong>Living Standard</strong> గా నిర్వహిస్తున్నాయి.</li>
        <li><strong>డాక్యుమెంట్ పునాది:</strong> <code>&lt;!DOCTYPE html&gt;</code>, <code>&lt;html&gt;</code>, <code>&lt;head&gt;</code> (మెటాడేటా), మరియు <code>&lt;body&gt;</code> (కంటికి కనిపించే కంటెంట్).</li>
        <li><strong>UTF-8:</strong> తెలుగు అక్షరాలు సరిగ్గా రెండర్ కావడానికి <code>&lt;meta charset="UTF-8" /&gt;</code> అత్యంత ఆవశ్యకం.</li>
      </ul>
    </div>
`;

// Build the full HTML document
const fullPageHtml = `<!DOCTYPE html>
<html class="light-theme" lang="te">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>HTML పరిచయం, Web Standards (W3C/WHATWG), ఎడిటర్స్ & First Web Page — Modern HTML5 Tutorial | Our Compiler</title>
  <meta name="description" content="HTML పరిచయం, Web Standards (W3C/WHATWG), ఎడిటర్స్ & First Web Page సమగ్ర తెలుగు గైడ్: HTML5 చరిత్ర · Web Trio (HTML, CSS, JS) · VS Code & Live Server సెటప్ · First HTML5 Page నిర్మాణం." />
  <meta name="keywords" content="html5 tutorial in telugu, learn html5, html పరిచయం, web standards (w3c/whatwg), ఎడిటర్స్ & first web page, web development, our compiler" />
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
    "headline": "HTML పరిచయం, Web Standards (W3C/WHATWG), ఎడిటర్స్ & First Web Page (HTML5 in Telugu)",
    "description": "HTML5 చరిత్ర · Web Trio (HTML, CSS, JS) · VS Code & Live Server సెటప్ · First HTML5 Page నిర్మాణం",
    "articleSection": "Phase 01: HTML5 పునాదులు & డాక్యుమెంట్ ఆర్కిటెక్చర్",
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
      <a href="/blog-html.html" style="display:inline-flex; align-items:center; gap:8px; padding:10px 18px; border-radius:8px; background:var(--bg3); border:1px solid var(--border); color:var(--text); text-decoration:none; font-weight:700; font-size:13.5px;">
        ← HTML Course Overview (ఇండెక్స్)
      </a>
      <a href="/blog-html/02-html-document-structure-doctype-head-meta.html" style="display:inline-flex; align-items:center; gap:8px; padding:10px 20px; border-radius:8px; background:linear-gradient(135deg, #10b981, #059669); color:#ffffff; text-decoration:none; font-weight:700; font-size:13.5px; box-shadow:0 2px 10px rgba(16,185,129,0.2);">
        Next: 2. HTML5 డాక్యుమెంట్ స్ట్రక్చర్ →
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

const targetFile = path.join(__dirname, '..', 'public', 'blog-html', '01-html-introduction-web-standards-and-setup.html');
fs.writeFileSync(targetFile, fullPageHtml, 'utf8');
console.log('✅ Successfully generated deep high-value Chapter 1 with exact JavaScript styling & coloring!');
console.log('Target file size:', fullPageHtml.length, 'characters');
