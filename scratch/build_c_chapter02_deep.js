const fs = require('fs');
const path = require('path');
const { LESSONS, buildSidebar } = require('./c_curriculum_data.js');

const lesson = LESSONS.find(l => l.num === 2);
const sidebarHtml = buildSidebar(2);

const chapterContentHtml = `
    <!-- BREADCRUMB -->
    <div class="breadcrumb">
      <a href="/">Home</a><span class="sep">›</span>
      <a href="/blog.html">Tutorials</a><span class="sep">›</span>
      <a href="/blog-c.html">C Masterclass</a><span class="sep">›</span>
      <span class="current">Chapter 2: వేరియబుల్స్, డేటా టైప్స్, కాన్‌స్టాంట్స్ &amp; మెమరీ మోడల్</span>
    </div>

    <!-- PAGE TITLE -->
    <h1 class="page-title">వేరియబుల్స్, డేటా టైప్స్, కాన్‌స్టాంట్స్ &amp; మెమరీ మోడల్</h1>

    <!-- PAGE META BADGES -->
    <div class="page-meta">
      <span class="badge">⚡ Modern C (C99 / C11 / C17 Standards)</span>
      <span class="badge">🟢 Chapter 02 of 20</span>
      <span class="badge">📂 Phase 01: బేసిక్స్ &amp; మెమరీ ఆర్కిటెక్చర్</span>
      <span class="badge">📅 2026 Academic Edition</span>
    </div>

    <!-- SUBTOPICS PILL BAR -->
    <div style="background:var(--bg3); border:1px solid var(--border); border-radius:8px; padding:10px 16px; margin-bottom:24px; font-size:13px; color:var(--text2); display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
      <span style="color:#10b981; font-weight:700;">📌 Covered in this chapter:</span>
      <span>RAM మెమరీ స్లాట్లు (Bytes &amp; Bits) · వేరియబుల్ డిక్లరేషన్ &amp; ఐడెంటిఫైయర్స్ · char, int, float, double · sizeof ఆపరేటర్ · Signed vs Unsigned (2's Complement) · ఇంటిజర్ ఓవర్‌ఫ్లో ట్రాప్ · const vs #define · ASCII టేబుల్ సీక్రెట్స్ · క్విజ్ &amp; లైవ్ కంపైలర్ ట్రై-బాక్స్</span>
    </div>

    <!-- INTRO ACCENT BOX (Warm Ivory with Green Accent) -->
    <div class="intro-box">
      <p>ఒక పెద్ద గిడ్డంగిని (Warehouse) ఊహించుకోండి. ఆ గిడ్డంగిలో లక్షలాది చిన్న ఖాళీ డబ్బాలు (Boxes) వరుసగా పేర్చబడి ఉన్నాయి. ప్రతి డబ్బాకు ఒక ప్రత్యేకమైన సీరియల్ నంబర్ (అడ్రస్) ఉంటుంది. కొన్ని డబ్బాలు చిన్న వస్తువుల కోసం (ఉదాహరణకు పెన్నులు), కొన్ని పెద్ద వస్తువుల కోసం (ఉదాహరణకు పుస్తకాలు లేదా ల్యాప్‌టాప్‌లు) కేటాయించబడతాయి. ఒక వస్తువును భద్రపరచాలంటే — సరైన సైజు గల డబ్బాను ఎంచుకుని, దానిపై స్పష్టమైన పేరు లేబుల్ అతికించాలి కదా?</p>
      <p>కంప్యూటర్ యొక్క <strong>RAM (Random Access Memory)</strong> కూడా అచ్చం అలాంటి ఒక మహత్తర గిడ్డంగి! మీ కంప్యూటర్‌లో 8GB లేదా 16GB RAM ఉంటే — అందులో బిలియన్ల కొద్దీ 1-బైట్ మెమరీ గదులు ఉంటాయి. ప్రోగ్రామింగ్ ప్రపంచంలో మనం డేటాను (ఒక విద్యార్థి వయస్సు, బ్యాంక్ బ్యాలెన్స్, యూజర్ పేరు) తాత్కాలికంగా దాచుకోవడానికి ఆ మెమరీ గదులకు ఇచ్చే పేర్లనే <strong>వేరియబుల్స్ (Variables)</strong> అంటారు!</p>
      <p>కానీ C లాంగ్వేజ్‌లో పైథాన్ లేదా జావాస్క్రిప్ట్ లాగా "ఏదో ఒక డేటా" దాచుకోలేం; C అనేది స్టాటికల్లీ టైప్డ్ (Statically-Typed) లాంగ్వేజ్! అంటే ఒక వేరియబుల్ మెమరీలో ఎన్ని బైట్లు తీసుకుంటుంది (1 Byte? 4 Bytes? 8 Bytes?), అందులో ఏ రకమైన డేటా నిల్వ ఉంటుంది అనేది కంపైలర్‌కు ముందే స్పష్టంగా చెప్పాలి. ఈ రెండవ అధ్యాయంలో, కంప్యూటర్ హార్డ్‌వేర్ మెమరీ ఆర్కిటెక్చర్, <strong>డేటా టైప్స్, sizeof ఆపరేటర్, Signed/Unsigned ఓవర్‌ఫ్లో మరియు const కీవర్డ్</strong> ల యొక్క సమగ్ర అంతర్గత పనితీరును లోతుగా నేర్చుకుందాం!</p>
    </div>

    <!-- SECTION 1 -->
    <div class="section-title"><span class="num">1</span>ఈ Chapter లో మీరు నేర్చుకునే అంశాలు</div>
    <div class="section-body">
      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.7;">
        <li><strong>RAM మెమరీ ఆర్కిటెక్చర్:</strong> బిట్స్ (Bits), బైట్లు (Bytes), మరియు హెక్సాడెసిమల్ మెమరీ అడ్రస్‌లు.</li>
        <li><strong>వేరియబుల్స్ అనాటమీ:</strong> డిక్లరేషన్, ఇనిషియలైజేషన్, మరియు సి-స్టాండర్డ్ ఐడెంటిఫైయర్ నియమాలు.</li>
        <li><strong>ప్రాథమిక డేటా టైప్స్:</strong> <code>int</code>, <code>char</code>, <code>float</code>, <code>double</code> — మెమరీ వినియోగం.</li>
        <li><strong>32-bit vs 64-bit సిస్టమ్స్:</strong> డేటా టైప్స్ పరిమాణాల్లో వ్యత్యాసాలు (ILP32 vs LP64 మోడల్స్).</li>
        <li><strong>sizeof ఆపరేటర్:</strong> రన్‌టైమ్‌లో వేరియబుల్ లేదా డేటా టైప్ సైజును బైట్లలో కొలిచే ఏకైక కంపైలర్ సాధనం.</li>
        <li><strong>సైన్డ్ vs అన్‌సైన్డ్ (Signed vs Unsigned):</strong> 2's Complement మెకానిక్స్, పాజిటివ్/నెగెటివ్ నంబర్ల బైనరీ రిప్రజెంటేషన్.</li>
        <li><strong>ఇంటిజర్ ఓవర్‌ఫ్లో (Integer Overflow Trap):</strong> పరిమితి దాటితే ఏం జరుగుతుంది? రౌండ్-ట్రిప్ బగ్స్.</li>
        <li><strong>టైప్ మోడిఫైయర్లు:</strong> <code>short</code>, <code>long</code>, <code>long long</code>, <code>unsigned</code>.</li>
        <li><strong>కాన్‌స్టాంట్స్:</strong> రీడ్-ఓన్లీ వేరియబుల్స్ కోసం <code>const</code> కీవర్డ్ వర్సెస్ <code>#define</code> మ్యాక్రోలు.</li>
        <li><strong>ASCII టేబుల్ రహస్యాలు:</strong> కంప్యూటర్‌కు అక్షరాలు తెలియవు; అన్నీ నంబర్లే! (<code>'A' == 65</code>).</li>
        <li><strong>బిగినర్స్ చేసే ఘోరమైన తప్పులు:</strong> గార్బేజ్ విలువలు, ఫ్లోట్ ప్రెసిషన్ లాస్.</li>
        <li><strong>ఇంటరాక్టివ్ క్విజ్:</strong> 5 లోతైన ఆలోచింపజేసే ప్రశ్నలు &amp; వివరణలు.</li>
      </ul>
    </div>

    <!-- SECTION 2 -->
    <div class="section-title"><span class="num">2</span>కంప్యూటర్ RAM మెమరీ ఆర్కిటెక్చర్: బిట్స్, బైట్లు &amp; అడ్రస్‌లు</div>
    <div class="section-body">
      <p>C ప్రోగ్రామర్‌గా మారడానికి కంప్యూటర్ మెమరీ (RAM) ఎలా పనిచేస్తుందో స్పష్టమైన ఊహాచిత్రం ఉండాలి. కంప్యూటర్ చిప్‌లోని ట్రాన్సిస్టర్లు కేవలం ఆన్ (1) లేదా ఆఫ్ (0) స్టేట్‌లను మాత్రమే గ్రహించగలవు. ఈ ప్రాథమిక యూనిట్‌ను <strong>బిట్ (Bit - Binary Digit)</strong> అంటారు.</p>

      <div style="background:var(--bg2); border:1px solid var(--border); border-radius:10px; padding:20px; margin:16px 0;">
        <h4 style="color:#059669; margin:0 0 10px 0; font-size:16px;">మెమరీ కొలతల సూత్రం (Memory Hierarchy):</h4>
        <ul style="margin:0; padding-left:20px; color:var(--text2); font-size:14px; line-height:1.8;">
          <li><strong>1 Bit:</strong> కేవలం 0 లేదా 1.</li>
          <li><strong>1 Nibble:</strong> 4 Bits (ఉదాహరణకు: <code>1010</code>).</li>
          <li><strong>1 Byte:</strong> 8 Bits (ఉదాహరణకు: <code>11110000</code>). కంప్యూటర్ మెమరీలో అడ్రస్ చేయగల అతి చిన్న ప్రాథమిక యూనిట్ బైట్!</li>
          <li><strong>1 Kilobyte (KB):</strong> 1024 Bytes.</li>
          <li><strong>1 Megabyte (MB):</strong> 1024 KB.</li>
          <li><strong>1 Gigabyte (GB):</strong> 1024 MB (సుమారు 107 కోట్ల బైట్లు!).</li>
        </ul>
      </div>

      <p>ప్రతి బైట్‌కు మెమరీలో ఒక ప్రత్యేకమైన సంఖ్య ఉంటుంది — దానినే <strong>మెమరీ అడ్రస్ (Memory Address)</strong> అంటారు. దీనిని సాధారణంగా హెక్సాడెసిమల్ రూపంలో (ఉదాహరణకు: <code>0x7ffee4b2</code>) సూచిస్తారు. మనం C లో ఒక వేరియబుల్ క్రియేట్ చేసినప్పుడు, ఆపరేటింగ్ సిస్టమ్ RAM లోని ఒక నిర్దిష్ట అడ్రస్ వద్ద ఆ వేరియబుల్ సైజుకు సరిపడా బైట్లను రిజర్వ్ చేస్తుంది.</p>
    </div>

    <!-- SECTION 3 -->
    <div class="section-title"><span class="num">3</span>వేరియబుల్ అంటే ఏమిటి? డిక్లరేషన్ &amp; ఐడెంటిఫైయర్ నియమాలు</div>
    <div class="section-body">
      <p><strong>వేరియబుల్ (Variable):</strong> కంప్యూటర్ మెమరీ లొకేషన్‌కు మనం ఇచ్చే అర్థవంతమైన పేరు. ఆ లొకేషన్‌లో ఉన్న విలువ ప్రోగ్రామ్ రన్ అవుతున్న సమయంలో మారవచ్చు (Vary కావచ్చు) కాబట్టి దీనికి "వేరియబుల్" అని పేరు వచ్చింది.</p>

      <h4 style="color:#059669; font-size:16px; margin-top:20px;">డిక్లరేషన్ వర్సెస్ ఇనిషియలైజేషన్:</h4>
      <div style="display:flex; flex-direction:column; gap:12px; margin:14px 0;">
        <div style="background:var(--bg2); border-left:4px solid #3b82f6; border-radius:0 8px 8px 0; padding:12px 18px;">
          <strong style="color:#3b82f6;">1. డిక్లరేషన్ (Declaration):</strong>
          <code style="display:block; margin:6px 0; font-size:13.5px; color:var(--text);">int age;</code>
          <span style="font-size:13.5px; color:var(--text2);">కంపైలర్‌కు "age" అనే పేరుతో 4 బైట్ల మెమరీని రిజర్వ్ చేయమని చెబుతుంది. కానీ ఇందులో ప్రస్తుతానికి ఏ విలువ ఉందో తెలియదు (గార్బేజ్ వేల్యూ ఉంటుంది).</span>
        </div>

        <div style="background:var(--bg2); border-left:4px solid #10b981; border-radius:0 8px 8px 0; padding:12px 18px;">
          <strong style="color:#10b981;">2. ఇనిషియలైజేషన్ (Initialization):</strong>
          <code style="display:block; margin:6px 0; font-size:13.5px; color:var(--text);">int age = 25;</code>
          <span style="font-size:13.5px; color:var(--text2);">మెమరీని రిజర్వ్ చేయడంతో పాటు, అందులో ప్రారంభ విలువగా 25 ని భద్రపరుస్తుంది. డిక్లరేషన్ వెంటనే విలువను కేటాయించడం బెస్ట్ ప్రాక్టీస్!</span>
        </div>
      </div>

      <h4 style="color:#059669; font-size:16px; margin-top:24px;">C ఐడెంటిఫైయర్ నియమాలు (Variable Naming Rules):</h4>
      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.7;">
        <li>వేరియబుల్ పేర్లు ఆంగ్ల అక్షరాలు (<code>a-z</code>, <code>A-Z</code>), అంకెలు (<code>0-9</code>), లేదా అండర్‌స్కోర్ (<code>_</code>) తో మాత్రమే ఉండాలి.</li>
        <li>మొదటి అక్షరం తప్పనిసరిగా <strong>అక్షరం లేదా అండర్‌స్కోర్</strong> తో మాత్రమే ప్రారంభం కావాలి; అంకెతో మొదలుకాకూడదు (ఉదా: <code>1stRank</code> తప్పు; <code>rank1</code> సరైనది).</li>
        <li>ఖాళీలు (Spaces) లేదా ప్రత్యేక గుర్తులు (<code>$</code>, <code>@</code>, <code>%</code>, <code>#</code>) పూర్తిగా నిషేధం.</li>
        <li>C లాంగ్వేజ్‌లోని 32 రిజర్వ్‌డ్ కీవర్డ్లు (ఉదా: <code>int</code>, <code>float</code>, <code>return</code>, <code>while</code>) వేరియబుల్ పేర్లుగా వాడకూడదు.</li>
        <li>C కేస్-సెన్సిటివ్ కాబట్టి <code>total</code>, <code>Total</code>, మరియు <code>TOTAL</code> మూడు వేర్వేరు వేరియబుల్స్!</li>
      </ul>
    </div>

    <!-- SECTION 4 -->
    <div class="section-title"><span class="num">4</span>ప్రాథమిక డేటా టైప్స్ (Fundamental Data Types)</div>
    <div class="section-body">
      <p>C లాంగ్వేజ్‌లో డేటాను భద్రపరచడానికి 4 ప్రాథమిక డేటా టైప్స్ ఉన్నాయి. ప్రతి డేటా టైప్‌కు కంప్యూటర్ మెమరీలో నిర్దిష్ట పరిమాణం మరియు నిర్దిష్ట పరిధి (Range) ఉంటుంది:</p>

      <div style="overflow-x:auto; margin: 16px 0;">
        <table class="tbl">
          <thead>
            <tr>
              <th>డేటా టైప్</th>
              <th>కీవర్డ్</th>
              <th>సాధారణ సైజు (64-bit)</th>
              <th>ఫార్మాట్ స్పెసిఫైయర్</th>
              <th>విలువ పరిధి (Range) &amp; ఉద్దేశం</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>క్యారెక్టర్ (Character)</strong></td>
              <td><code>char</code></td>
              <td>1 Byte (8 bits)</td>
              <td><code>%c</code></td>
              <td>-128 నుండి 127 (సింగిల్ క్యారెక్టర్ లేదా చిన్న సంఖ్య)</td>
            </tr>
            <tr>
              <td><strong>పూర్ణాంకం (Integer)</strong></td>
              <td><code>int</code></td>
              <td>4 Bytes (32 bits)</td>
              <td><code>%d</code> లేదా <code>%i</code></td>
              <td>-2,147,483,648 నుండి +2,147,483,647 (సుమారు ±214 కోట్లు)</td>
            </tr>
            <tr>
              <td><strong>దశాంశ సంఖ్య (Float)</strong></td>
              <td><code>float</code></td>
              <td>4 Bytes (32 bits)</td>
              <td><code>%f</code></td>
              <td>6 నుండి 7 దశాంశ స్థానాల కచ్చితత్వం (Single Precision)</td>
            </tr>
            <tr>
              <td><strong>డబుల్ ప్రెసిషన్ (Double)</strong></td>
              <td><code>double</code></td>
              <td>8 Bytes (64 bits)</td>
              <td><code>%lf</code></td>
              <td>15 నుండి 17 దశాంశ స్థానాల కచ్చితత్వం (Double Precision)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Basic Data Types Demo</span>
          <div class="code-actions">
            <a class="try-btn" href="/online-c-compiler.html" target="_blank">▶ Run in Online C Compiler</a>
          </div>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main(void) {
    // 1. క్యారెక్టర్ వేరియబుల్ (సింగిల్ కోట్స్)
    char grade = 'A';
    
    // 2. పూర్ణాంక వేరియబుల్
    int studentId = 101;
    
    // 3. ఫ్లోటింగ్ పాయింట్ వేరియబుల్ (చివర f పెట్టడం మంచిది)
    float fee = 45000.50f;
    
    // 4. డబుల్ వేరియబుల్ (అధిక కచ్చితత్వం)
    double pi = 3.141592653589793;

    printf("విద్యార్థి ID: %d\\n", studentId);
    printf("గ్రేడ్: %c\\n", grade);
    printf("ఫీజు: ₹%.2f\\n", fee); // %.2f అంటే దశాంశం తర్వాత 2 అంకెలు
    printf("పై (PI) విలువ: %.10lf\\n", pi);

    return 0;
}</code></pre>
      </div>
    </div>

    <!-- SECTION 5 -->
    <div class="section-title"><span class="num">5</span>32-bit vs 64-bit ఆర్కిటెక్చర్లలో మెమరీ వ్యత్యాసాలు</div>
    <div class="section-body">
      <p>చాలామంది బిగినర్స్ "int ఎల్లప్పుడూ 4 బైట్లేనా? లేదా 2 బైట్లా?" అని గందరగోళానికి గురవుతారు. దీనికి సమాధానం: <strong>C ప్రమాణాలు డేటా టైప్స్ యొక్క కచ్చితమైన సైజును ఖరారు చేయలేదు; కేవలం కనీస పరిమితులను మాత్రమే సూచించాయి!</strong></p>

      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.7;">
        <li>C స్టాండర్డ్ నియమం: <code>sizeof(char) &lt;= sizeof(short) &lt;= sizeof(int) &lt;= sizeof(long) &lt;= sizeof(long long)</code>.</li>
        <li>16-bit Turbo C++ లో <code>int</code> కేవలం <strong>2 బైట్లు</strong> మాత్రమే ఉండేది (పరిధి: -32,768 నుండి 32,767).</li>
        <li>ఆధునిక 32-bit మరియు 64-bit ప్రాసెసర్లలో (x86_64 GCC, Clang) <code>int</code> ఎల్లప్పుడూ <strong>4 బైట్లు (32 bits)</strong> ఉంటుంది.</li>
        <li>Linux 64-bit (LP64 మోడల్) లో <code>long</code> 8 బైట్లు ఉంటుంది, కానీ Windows 64-bit (LLP64 మోడల్) లో <code>long</code> కేవలం 4 బైట్లు మాత్రమే ఉంటుంది! అందుకే ప్లాట్‌ఫామ్-ఇండిపెండెంట్ కోడ్ కోసం ఆధునిక C లో <code>&lt;stdint.h&gt;</code> ఉపయోగిస్తాం.</li>
      </ul>
    </div>

    <!-- SECTION 6 -->
    <div class="section-title"><span class="num">6</span>sizeof ఆపరేటర్: సిస్టమ్ బైట్లను కొలవడానికి ఏకైక సాధనం</div>
    <div class="section-body">
      <p>మీ కంప్యూటర్‌లో ఏ డేటా టైప్ ఎన్ని బైట్లు ఆక్రమిస్తుందో ఊహించాల్సిన పనిలేదు; C మనకు <strong>sizeof</strong> అనే ఇన్-బిల్ట్ కంపైల్-టైమ్ ఆపరేటర్‌ను అందించింది. ఇది ఒక ఫంక్షన్ కాదు, ఇది ఒక <em>ఆపరేటర్</em> (Keyword Operator). దీని రిటర్న్ టైప్ <code>size_t</code> (అన్‌సైన్డ్ పూర్ణాంకం), కాబట్టి దీనిని ప్రింట్ చేయడానికి <code>%zu</code> లేదా <code>%lu</code> ఉపయోగిస్తాం:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — sizeof Operator Deep Dive</span>
          <div class="code-actions">
            <a class="try-btn" href="/online-c-compiler.html" target="_blank">▶ Run in Online C Compiler</a>
          </div>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main(void) {
    printf("=== మీ మెషీన్‌లో డేటా టైప్స్ పరిమాణాలు (Bytes) ===\\n");
    printf("char సైజు       : %zu Byte\\n", sizeof(char));
    printf("short సైజు      : %zu Bytes\\n", sizeof(short));
    printf("int సైజు        : %zu Bytes\\n", sizeof(int));
    printf("long సైజు       : %zu Bytes\\n", sizeof(long));
    printf("long long సైజు  : %zu Bytes\\n", sizeof(long long));
    printf("float సైజు      : %zu Bytes\\n", sizeof(float));
    printf("double సైజు     : %zu Bytes\\n", sizeof(double));
    printf("long double సైజు: %zu Bytes\\n", sizeof(long double));

    // వేరియబుల్ సైజును కూడా కొలవవచ్చు
    double salary = 75000.85;
    printf("salary వేరియబుల్ ఆక్రమించిన మెమరీ: %zu Bytes\\n", sizeof(salary));

    return 0;
}</code></pre>
      </div>

      <div class="tip-box">
        💡 <strong>కంపైల్ టైమ్ మ్యాజిక్:</strong> <code>sizeof</code> ఆపరేటర్ రన్‌టైమ్‌లో పనిచేయదు; కంపైలర్ కోడ్‌ను కంపైల్ చేసేటప్పుడే ఆ వేరియబుల్ లేదా టైప్ సైజును లెక్కగట్టి, ఆ స్థానంలో నేరుగా సంఖ్యను (Constant Value) ప్రతిక్షేపిస్తుంది. కాబట్టి <code>sizeof</code> వల్ల ప్రోగ్రామ్ రన్నింగ్ స్పీడ్‌పై 0% ప్రభావం కూడా ఉండదు!
      </div>
    </div>

    <!-- SECTION 7 -->
    <div class="section-title"><span class="num">7</span>సైన్డ్ vs అన్‌సైన్డ్ (Signed vs Unsigned) &amp; ఓవర్‌ఫ్లో ట్రాప్</div>
    <div class="section-body">
      <p>సాధారణంగా ఒక డేటా టైప్‌కు ముందు ఏమీ రాయకపోతే అది డీఫాల్ట్‌గా <strong>signed</strong> గా పరిగణించబడుతుంది (అంటే పాజిటివ్ మరియు నెగెటివ్ సంఖ్యలు రెండూ పట్టవచ్చు). కానీ కొన్ని సందర్భాలలో (ఉదా: వయస్సు, రోల్ నంబర్, మెమరీ సైజు, అరే సైజు) నెగెటివ్ విలువలు ఎప్పటికీ రావు. అప్పుడు <strong>unsigned</strong> కీవర్డ్ వాడటం వల్ల పాజిటివ్ రేంజ్ రెట్టింపు అవుతుంది!</p>

      <div style="overflow-x:auto; margin: 16px 0;">
        <table class="tbl">
          <thead>
            <tr>
              <th>టైప్</th>
              <th>బిట్స్ / బైట్లు</th>
              <th>కనిష్ట విలువ (Min)</th>
              <th>గరిష్ట విలువ (Max)</th>
              <th>ఫార్మాట్ స్పెసిఫైయర్</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>signed char</code></td>
              <td>8 bits (1 Byte)</td>
              <td>-128</td>
              <td>+127</td>
              <td><code>%d</code></td>
            </tr>
            <tr>
              <td><code>unsigned char</code></td>
              <td>8 bits (1 Byte)</td>
              <td>0</td>
              <td>+255</td>
              <td><code>%u</code></td>
            </tr>
            <tr>
              <td><code>signed int</code></td>
              <td>32 bits (4 Bytes)</td>
              <td>-2,147,483,648</td>
              <td>+2,147,483,647</td>
              <td><code>%d</code></td>
            </tr>
            <tr>
              <td><code>unsigned int</code></td>
              <td>32 bits (4 Bytes)</td>
              <td>0</td>
              <td>+4,294,967,295 (సుమారు 429 కోట్లు)</td>
              <td><code>%u</code></td>
            </tr>
          </tbody>
        </table>
      </div>

      <h4 style="color:#059669; font-size:16px; margin-top:20px;">⚠️ ఇంటిజర్ ఓవర్‌ఫ్లో రహస్యం (Integer Overflow Trap):</h4>
      <p>ఒక గడియారంలో ముల్లు 12 దాటితే మళ్ళీ 1 కి ఎలా వస్తుందో — కంప్యూటర్ మెమరీలో కూడా ఒక వేరియబుల్ గరిష్ట పరిమితిని దాటితే (Overflow అయితే) అది చక్రంలా తిరిగి కనిష్ట విలువకు వెళ్ళిపోతుంది! దీనిని <strong>Modulo Arithmetic (2's Complement Overflow)</strong> అంటారు:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Integer Overflow Demonstration</span>
          <div class="code-actions">
            <a class="try-btn" href="/online-c-compiler.html" target="_blank">▶ Run in Online C Compiler</a>
          </div>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main(void) {
    // 1. Signed Char గరిష్ట పరిమితి 127
    signed char num1 = 127;
    printf("ప్రస్తుత విలువ: %d\\n", num1);
    
    // 127 కి +1 కలిపితే ఏమవుతుంది? 128 అవ్వదు! -128 అవుతుంది!
    num1 = num1 + 1;
    printf("127 + 1 ఓవర్‌ఫ్లో తర్వాత విలువ: %d (Shocking!)\\n\\n", num1);

    // 2. Unsigned Char గరిష్ట పరిమితి 255
    unsigned char num2 = 255;
    printf("Unsigned ప్రస్తుత విలువ: %u\\n", num2);
    
    // 255 కి +1 కలిపితే 0 అవుతుంది!
    num2 = num2 + 1;
    printf("255 + 1 ఓవర్‌ఫ్లో తర్వాత విలువ: %u\\n", num2);

    return 0;
}</code></pre>
      </div>

      <div class="tip-box">
        🚨 <strong>రియల్ వరల్డ్ సెక్యూరిటీ బగ్:</strong> 2014 లో యూట్యూబ్‌లో ప్రసిద్ధ "Gangnam Style" పాట వ్యూస్ 214 కోట్లు (2,147,483,647) దాటగానే కౌంటర్ నెగెటివ్ నంబర్ చూపించింది! దానికి కారణం Google ఇంజనీర్లు మొదట 32-bit signed int వాడడమే. వెంటనే దాన్ని 64-bit <code>long long</code> గా మార్చారు.
      </div>
    </div>

    <!-- SECTION 8 -->
    <div class="section-title"><span class="num">8</span>టైప్ మోడిఫైయర్లు: short, long, long long</div>
    <div class="section-body">
      <p>మన డేటా అవసరాన్ని బట్టి మెమరీని ఆదా చేయడానికి లేదా భారీ సంఖ్యలను భద్రపరచడానికి C లో 4 ప్రాథమిక మోడిఫైయర్లు (Modifiers) ఉన్నాయి:</p>

      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.7;">
        <li><code>short int</code> (లేదా కేవలం <code>short</code>): 2 బైట్లు. చిన్న సంఖ్యల కోసం (-32,768 నుండి 32,767). మెమరీ అత్యంత పరిమితంగా ఉండే మైక్రోకంట్రోలర్లలో వాడతారు.</li>
        <li><code>long int</code> (లేదా కేవలం <code>long</code>): కనీసం 4 లేదా 8 బైట్లు. ఫార్మాట్ స్పెసిఫైయర్ <code>%ld</code>.</li>
        <li><code>long long int</code> (లేదా <code>long long</code>): <strong>8 బైట్లు (64 bits)</strong>. ఇది ప్రపంచ జనాభా, దేశ బడ్జెట్, లేదా బిలియన్ల లావాదేవీలను భద్రపరచడానికి సరిపోతుంది (-9,223,372,036,854,775,808 నుండి +9,223,372,036,854,775,807 వరకు!). ఫార్మాట్ స్పెసిఫైయర్ <code>%lld</code>.</li>
        <li><code>unsigned long long</code>: కేవలం పాజిటివ్ విలువలు (0 నుండి సుమారు 1.8 × 10<sup>19</sup> వరకు). ఫార్మాట్ స్పెసిఫైయర్ <code>%llu</code>.</li>
      </ul>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Massive Numbers with long long</span>
          <div class="code-actions">
            <a class="try-btn" href="/online-c-compiler.html" target="_blank">▶ Run in Online C Compiler</a>
          </div>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main(void) {
    // ప్రపంచ జనాభా (సుమారు 800 కోట్లు) int లో పట్టదు; long long వాడాలి!
    long long worldPopulation = 8100000000LL; // LL ప్రత్యయం చేర్చాలి
    
    printf("ప్రపంచ జనాభా అంచనా: %lld\\n", worldPopulation);
    printf("తీసుకున్న మెమరీ సైజు: %zu Bytes\\n", sizeof(worldPopulation));

    return 0;
}</code></pre>
      </div>
    </div>

    <!-- SECTION 9 -->
    <div class="section-title"><span class="num">9</span>కాన్‌స్టాంట్స్: const కీవర్డ్ vs #define మ్యాక్రోలు</div>
    <div class="section-body">
      <p>ప్రోగ్రామ్‌లో కొన్ని విలువలు ఎప్పటికీ మారకూడదు (ఉదాహరణకు: <code>PI = 3.14159</code>, <code>MAX_USERS = 100</code>, <code>SPEED_OF_LIGHT = 299792458</code>). C లో వీటిని స్థిరంగా (Constants గా) ఉంచడానికి రెండు మార్గాలు ఉన్నాయి:</p>

      <div style="overflow-x:auto; margin: 16px 0;">
        <table class="tbl">
          <thead>
            <tr>
              <th>లక్షణం</th>
              <th>const కీవర్డ్ (ఆధునిక పద్ధతి)</th>
              <th>#define మ్యాక్రో (ప్రీప్రాసెసర్ పద్ధతి)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>సింటాక్స్</strong></td>
              <td><code>const double PI = 3.14159;</code></td>
              <td><code>#define PI 3.14159</code> (సెమికోలన్ ఉండదు)</td>
            </tr>
            <tr>
              <td><strong>పనిచేసే దశ</strong></td>
              <td>కంపైలర్ దశలో (Compiler)</td>
              <td>ప్రీప్రాసెసర్ దశలో (Text Search &amp; Replace)</td>
            </tr>
            <tr>
              <td><strong>టైప్ సేఫ్టీ (Type Safety)</strong></td>
              <td>✅ డేటా టైప్ స్పష్టంగా ఉంటుంది (Type Safe)</td>
              <td>❌ డేటా టైప్ ఉండదు (సాధారణ టెక్స్ట్ మాత్రమే)</td>
            </tr>
            <tr>
              <td><strong>మెమరీ &amp; స్కోప్</strong></td>
              <td>స్కోప్ నియమాలను పాటిస్తుంది (Local / Global)</td>
              <td>ఫైల్ మొత్తం గ్లోబల్ ప్రత్యామ్నాయం అవుతుంది</td>
            </tr>
            <tr>
              <td><strong>డీబగ్గింగ్ సౌలభ్యం</strong></td>
              <td>డీబగ్గర్‌లో వేరియబుల్ పేరు కనిపిస్తుంది</td>
              <td>డీబగ్గర్‌లో పేరు కనిపించదు (విలువ మాత్రమే ఉంటుంది)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="tip-box">
        💡 <strong>ఆధునిక సిఫార్సు:</strong> ఆధునిక C కోడింగ్‌లో స్థిర విలువల కోసం ఎల్లప్పుడూ <strong>const</strong> కీవర్డ్‌కే మొదటి ప్రాధాన్యత ఇవ్వాలి. దీనివల్ల పొరపాటున ఎవరైనా ఆ విలువను మార్చడానికి ప్రయత్నిస్తే కంపైలర్ <code>error: assignment of read-only variable</code> అని ఎర్రర్ ఇచ్చి ఆపుతుంది!
      </div>
    </div>

    <!-- SECTION 10 -->
    <div class="section-title"><span class="num">10</span>క్యారెక్టర్ డేటా టైప్ &amp; ASCII టేబుల్ సీక్రెట్స్</div>
    <div class="section-body">
      <p>కంప్యూటర్ హార్డ్‌వేర్‌కు అక్షరాలు, గుర్తులు ఏవీ అర్థం కావు. కంప్యూటర్ అంతర్గతంగా ప్రతి అక్షరాన్ని ఒక సంఖ్యగా (Integer Code) మాత్రమే నిల్వ చేస్తుంది. ఈ అంతర్జాతీయ ప్రమాణాన్ని <strong>ASCII (American Standard Code for Information Interchange)</strong> అంటారు.</p>

      <p>C లో <code>char</code> అనేది వాస్తవానికి కేవలం <strong>1 బైట్ పూర్ణాంకం (1-byte integer)</strong> మాత్రమే! మీరు <code>'A'</code> అని రాసినప్పుడు కంపైలర్ మెమరీలో 65 అనే సంఖ్యను సేవ్ చేస్తుంది:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Characters are Integers</span>
          <div class="code-actions">
            <a class="try-btn" href="/online-c-compiler.html" target="_blank">▶ Run in Online C Compiler</a>
          </div>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main(void) {
    char ch = 'A';

    // %c తో ప్రింట్ చేస్తే అక్షరం 'A' వస్తుంది
    printf("క్యారెక్టర్‌గా : %c\\n", ch);

    // %d తో ప్రింట్ చేస్తే దాని ASCII సంఖ్య 65 వస్తుంది!
    printf("ASCII సంఖ్యగా : %d\\n", ch);

    // క్యారెక్టర్లపై గణితం చేయవచ్చు!
    char nextChar = ch + 1; // 65 + 1 = 66 ('B')
    printf("'A' + 1 = %c (ASCII: %d)\\n", nextChar, nextChar);

    // చిన్న అక్షరం నుండి పెద్ద అక్షరంగా మార్చడం (Case Conversion Logic)
    char lower = 'g';
    char upper = lower - 32; // 'a'(97) - 32 = 'A'(65)
    printf("చిన్న అక్షరం: %c -> పెద్ద అక్షరం: %c\\n", lower, upper);

    return 0;
}</code></pre>
      </div>

      <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin:16px 0;">
        <h4 style="color:#059669; margin:0 0 8px 0; font-size:14px;">గుర్తుంచుకోవాల్సిన కీలకమైన ASCII సంఖ్యలు:</h4>
        <ul style="margin:0; padding-left:20px; color:var(--text2); font-size:13.5px; line-height:1.7;">
          <li><code>'0'</code> నుండి <code>'9'</code> : ASCII <strong>48 నుండి 57</strong></li>
          <li><code>'A'</code> నుండి <code>'Z'</code> : ASCII <strong>65 నుండి 90</strong></li>
          <li><code>'a'</code> నుండి <code>'z'</code> : ASCII <strong>97 నుండి 122</strong> (పెద్ద మరియు చిన్న అక్షరాల మధ్య తేడా కచ్చితంగా <strong>32</strong>!)</li>
          <li><code>'\0'</code> (Null Terminator) : ASCII <strong>0</strong></li>
        </ul>
      </div>
    </div>

    <!-- SECTION 11 -->
    <div class="section-title"><span class="num">11</span>బిగినర్స్ చేసే టాప్ 5 మెమరీ &amp; వేరియబుల్ తప్పులు</div>
    <div class="section-body">
      <div style="display:flex; flex-direction:column; gap:16px; margin:16px 0;">
        <div style="background:rgba(239, 68, 68, 0.08); border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px 18px;">
          <strong style="color:#ef4444; font-size:14.5px;">❌ 1. ఇనిషియలైజ్ చేయని వేరియబుల్స్ వాడటం (Garbage Value Bug):</strong>
          <pre style="margin:6px 0; background:#fff; border:1px solid #fecaca; padding:8px 12px; border-radius:6px; color:#b91c1c; font-size:13px;"><code>int score; // విలువ ఇవ్వలేదు!
printf("స్కోరు: %d", score); // ఏదో ఊహించని చెత్త విలువ (Garbage) ప్రింట్ అవుతుంది!</code></pre>
          <span style="font-size:13px; color:var(--text2);">పైథాన్ లాగా C లో ఆటోమేటిక్‌గా సున్నా (0) సెట్ అవ్వదు. ఆ మెమరీ గదిలో ఇంతకుముందు ఏ పాత ప్రోగ్రామ్ వదిలేసిన డేటా ఉందో అదే ఉంటుంది. ఎల్లప్పుడూ <code>int score = 0;</code> అని ఇనిషియలైజ్ చేయాలి.</span>
        </div>

        <div style="background:rgba(239, 68, 68, 0.08); border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px 18px;">
          <strong style="color:#ef4444; font-size:14.5px;">❌ 2. పూర్ణాంకాల భాగాహారంలో దశాంశాలు కోల్పోవడం (Integer Division Trap):</strong>
          <pre style="margin:6px 0; background:#fff; border:1px solid #fecaca; padding:8px 12px; border-radius:6px; color:#b91c1c; font-size:13px;"><code>float result = 5 / 2; // result విలువ 2.5 రాదు; కేవలం 2.000000 మాత్రమే వస్తుంది!</code></pre>
          <span style="font-size:13px; color:var(--text2);">C లో <code>5</code> మరియు <code>2</code> రెండూ పూర్ణాంకాలు (int) కాబట్టి ఫలితం కూడా పూర్ణాంకమే (2) అవుతుంది. దశాంశాలు రావాలంటే కనీసం ఒక సంఖ్యను ఫ్లోట్‌గా రాయాలి: <code>float result = 5.0f / 2;</code>.</span>
        </div>

        <div style="background:rgba(239, 68, 68, 0.08); border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px 18px;">
          <strong style="color:#ef4444; font-size:14.5px;">❌ 3. తప్పుడు ఫార్మాట్ స్పెసిఫైయర్లు వాడటం:</strong>
          <pre style="margin:6px 0; background:#fff; border:1px solid #fecaca; padding:8px 12px; border-radius:6px; color:#b91c1c; font-size:13px;"><code>float price = 99.99f;
printf("ధర: %d", price); // తప్పు! float కి %d వాడితే తీవ్రమైన గార్బేజ్ వస్తుంది!</code></pre>
          <span style="font-size:13px; color:var(--text2);"><code>float</code> కి తప్పనిసరిగా <code>%f</code>, <code>int</code> కి <code>%d</code>, <code>double</code> కి <code>%lf</code>, <code>char</code> కి <code>%c</code> వాడాలి.</span>
        </div>
      </div>
    </div>

    <!-- SECTION 12 (INTERACTIVE QUIZ) -->
    <div class="section-title"><span class="num">12</span>ఇంటరాక్టివ్ నాలెడ్జ్ చెక్ (Self-Assessment Quiz)</div>
    <div class="section-body">
      <p>ఈ రెండవ అధ్యాయంలో మీరు నేర్చుకున్న వేరియబుల్స్ మరియు మెమరీ భావనలను పరీక్షించుకోవడానికి క్రింది ప్రశ్నలపై క్లిక్ చేయండి:</p>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:700; cursor:pointer; color:#059669;">
          ❓ ప్రశ్న 1: ఆధునిక 64-bit GCC కంపైలర్‌లో int డేటా టైప్ సాధారణంగా ఎన్ని బైట్ల మెమరీని ఆక్రమిస్తుంది?
        </summary>
        <div style="margin-top:10px; color:var(--text2); font-size:14px; line-height:1.6;">
          <strong>సమాధానం:</strong> <strong>4 Bytes (32 bits)</strong>. దీని పరిధి సుమారు -214 కోట్ల నుండి +214 కోట్ల వరకు ఉంటుంది.
        </div>
      </details>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:700; cursor:pointer; color:#059669;">
          ❓ ప్రశ్న 2: ఒక unsigned char వేరియబుల్‌లో 255 ఉన్నప్పుడు దానికి 1 కలిపితే వచ్చే ఫలితం ఎంత?
        </summary>
        <div style="margin-top:10px; color:var(--text2); font-size:14px; line-height:1.6;">
          <strong>సమాధానం:</strong> <strong>0 (సున్నా)</strong>. ఎందుకంటే 8-bit unsigned char గరిష్ట పరిమితి 255. ఓవర్‌ఫ్లో జరిగి విలువ తిరిగి కనిష్ట విలువైన 0 కి చేరుకుంటుంది.
        </div>
      </details>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:700; cursor:pointer; color:#059669;">
          ❓ ప్రశ్న 3: sizeof అనేది ఫంక్షనా లేక ఆపరేటరా?
        </summary>
        <div style="margin-top:10px; color:var(--text2); font-size:14px; line-height:1.6;">
          <strong>సమాధానం:</strong> <strong>ఆపరేటర్ (Compile-Time Operator)</strong>. ఇది ఫంక్షన్ కాదు. కంపైలేషన్ సమయంలోనే ఆ సైజు లెక్కించబడుతుంది.
        </div>
      </details>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:700; cursor:pointer; color:#059669;">
          ❓ ప్రశ్న 4: ఆంగ్ల పెద్ద అక్షరం 'A' యొక్క ASCII సంఖ్యా విలువ ఎంత?
        </summary>
        <div style="margin-top:10px; color:var(--text2); font-size:14px; line-height:1.6;">
          <strong>సమాధానం:</strong> <strong>65</strong>. అలాగే చిన్న అక్షరం 'a' యొక్క ASCII విలువ 97.
        </div>
      </details>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:700; cursor:pointer; color:#059669;">
          ❓ ప్రశ్న 5: float result = 7 / 2; అని రాస్తే result లో ఏ విలువ నిల్వ ఉంటుంది?
        </summary>
        <div style="margin-top:10px; color:var(--text2); font-size:14px; line-height:1.6;">
          <strong>సమాధానం:</strong> <strong>3.000000</strong>. ఎందుకంటే 7 మరియు 2 రెండూ పూర్ణాంకాలు కాబట్టి ఇంటీజర్ డివిజన్ జరిగి ఫలితం 3 అవుతుంది. ఆ తర్వాత అది ఫ్లోట్‌గా 3.0 గా మారుతుంది. 3.5 రావాలంటే <code>7.0f / 2</code> అని రాయాలి.
        </div>
      </details>
    </div>

    <!-- SECTION 13 (TRY BOX & SUMMARY) -->
    <div class="section-title"><span class="num">13</span>మీరే స్వయంగా Try చేయండి &amp; సారాంశం (Quick Summary)</div>
    <div class="section-body">
      <div class="try-box" style="margin-top:10px;">
        <div class="try-title">🚀 మీ సిస్టమ్ మెమరీ సైజులను లైవ్‌గా మన C కంపైలర్‌లో పరీక్షించండి!</div>
        <p>పైన వివరించిన <code>sizeof</code> కోడ్ మరియు ASCII కోడ్‌ను మన ఆన్‌లైన్ C కంపైలర్‌లో ఓపెన్ చేసి స్వయంగా ఎగ్జిక్యూట్ చేయండి. మీ స్వంత వేరియబుల్స్ సృష్టించి వాటి సైజులను లెక్కించి చూడండి!</p>
        <a class="run-btn" href="/online-c-compiler.html" target="_blank">
          👉 Our Compiler లో C Compiler try చేయండి
        </a>
      </div>

      <div style="margin-top:24px;">
        <h4 style="color:#059669; font-size:16px; margin-bottom:10px;">📌 క్విక్ సారాంశం (Key Takeaways):</h4>
        <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.7;">
          <li><strong>వేరియబుల్:</strong> డేటాను భద్రపరిచే పేరు గల RAM మెమరీ లొకేషన్.</li>
          <li><strong>ప్రాథమిక టైప్స్:</strong> char (1 Byte), int (4 Bytes), float (4 Bytes), double (8 Bytes).</li>
          <li><strong>sizeof:</strong> ఏ వేరియబుల్ లేదా టైప్ ఎన్ని బైట్లు ఆక్రమించిందో తెలిపే కంపైల్-టైమ్ ఆపరేటర్.</li>
          <li><strong>Signed vs Unsigned:</strong> నెగెటివ్ అవసరం లేనప్పుడు unsigned వాడితే పాజిటివ్ పరిధి రెట్టింపు అవుతుంది.</li>
          <li><strong>ఓవర్‌ఫ్లో:</strong> పరిమితి దాటితే చక్రంలా రివర్స్ అయ్యే బిహేవియర్ (Integer Overflow).</li>
          <li><strong>const:</strong> విలువను లాక్ చేసి రీడ్-ఓన్లీగా మార్చే కీవర్డ్.</li>
        </ul>
      </div>

      <div style="margin-top:20px; padding:16px; background:var(--bg2); border-left:4px solid #10b981; border-radius:0 8px 8px 0;">
        <strong>తర్వాతి అధ్యాయంలో (Chapter 03):</strong> కీబోర్డ్ నుండి యూజర్ ఇన్‌పుట్ తీసుకోవడానికి ఉపయోగించే <strong><code>scanf()</code> ఫంక్షన్, అడ్రస్ ఆపరేటర్ (&amp;) యొక్క అంతర్గత పనితీరు, మరియు బిగినర్స్ నిద్రపట్టకుండా చేసే డేంజరస్ న్యూలైన్ బఫర్ ట్రాప్ &amp; పరిష్కారాలు</strong> గురించి సమగ్రంగా నేర్చుకుందాం!
      </div>
    </div>


    <!-- PREV / NEXT NAVIGATION -->
    <div style="display:flex; justify-content:space-between; align-items:center; margin-top:40px; padding-top:20px; border-top:1px solid var(--border); flex-wrap:wrap; gap:16px;">
      <a href="/blog-c/01-c-introduction-and-hello-world.html" style="display:inline-flex; align-items:center; gap:8px; padding:10px 18px; border-radius:8px; background:var(--bg3); border:1px solid var(--border); color:var(--text); text-decoration:none; font-weight:700; font-size:13.5px;">
        ← Prev: 1. C పరిచయం &amp; Hello World
      </a>
      <a href="/blog-c/03-c-user-input-scanf-format-specifiers.html" style="display:inline-flex; align-items:center; gap:8px; padding:10px 20px; border-radius:8px; background:linear-gradient(135deg, #10b981, #059669); color:#ffffff; text-decoration:none; font-weight:700; font-size:13.5px; box-shadow:0 2px 10px rgba(16,185,129,0.2);">
        Next: 3. యూజర్ ఇన్‌పుట్ (scanf) →
      </a>
    </div>

    <!-- AUTHOR FOOTER -->
    <div class="author" style="margin-top:36px;">
      <div class="avatar">OC</div>
      <div>
        <strong>Written by Our Compiler Technical Editorial Team</strong><br>
        <span>Reviewed for accuracy &amp; tested on GCC 13+ / Clang 17 runtime · 2026 Academic Edition</span>
      </div>
    </div>

  </main>
</div>

<!-- SITE NAVIGATION LOADER -->
<script src="/site-nav.js" defer></script>
</body>
</html>
`;

// Assemble the complete HTML document
const fullHtml = `<!DOCTYPE html>
<html class="light-theme" lang="te">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>వేరియబుల్స్, డేటా టైప్స్, కాన్‌స్టాంట్స్ & మెమరీ మోడల్ — Modern C Tutorial | Our Compiler</title>
  <meta name="description" content="వేరియబుల్స్, డేటా టైప్స్, కాన్‌స్టాంట్స్ & మెమరీ మోడల్ సమగ్ర తెలుగు గైడ్: RAM మెమరీ స్లాట్లు (Bytes) · char, int, float, double · sizeof ఆపరేటర్ · const కీవర్డ్ · Signed vs Unsigned ఓవర్‌ఫ్లో." />
  <meta name="keywords" content="c tutorial in telugu, learn c language, వేరియబుల్స్, డేటా టైప్స్, కాన్‌స్టాంట్స్ & మెమరీ మోడల్, c programming, our compiler" />
  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />
  <link rel="icon" type="image/png" href="/logo.png" />
  <link rel="canonical" href="https://www.ourcompiler.com/blog-c/02-c-variables-data-types-constants.html" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;500;600;700&family=Sora:wght@400;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/blog-style.css" />
  <link rel="stylesheet" href="/blog-c/style.css" />
  <link rel="stylesheet" href="/site-nav.css" />

  <!-- Schema.org TechArticle Structured Data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": "వేరియబుల్స్, డేటా టైప్స్, కాన్‌స్టాంట్స్ & మెమరీ మోడల్ (C Programming in Telugu)",
    "description": "RAM మెమరీ స్లాట్లు (Bytes) · char, int, float, double · sizeof ఆపరేటర్ · const కీవర్డ్ · Signed vs Unsigned ఓవర్‌ఫ్లో",
    "articleSection": "Phase 01: బేసిక్స్ & మెమరీ ఆర్కిటెక్చర్",
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

  <!-- Interactive Scripts: Accordion & Default Light Theme -->
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
          const body = document.body;
          if (body) body.classList.remove('light-theme');
        });
      } else {
        document.documentElement.classList.add('light-theme');
        document.addEventListener('DOMContentLoaded', () => {
          const body = document.body;
          if (body) body.classList.add('light-theme');
        });
      }
    })();

    // Code runner & copy button integration
    document.addEventListener('DOMContentLoaded', () => {
      document.querySelectorAll('.code-block').forEach((block) => {
        const pre = block.querySelector('pre');
        const code = block.querySelector('code');
        if (!pre || !code) return;
        const rawCode = code.innerText;

        const actions = block.querySelector('.code-actions');
        if (actions && !actions.querySelector('.copy-btn')) {
          const copyBtn = document.createElement('button');
          copyBtn.className = 'copy-btn';
          copyBtn.innerHTML = '📋 Copy';
          copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(rawCode).then(() => {
              copyBtn.innerHTML = '✅ Copied!';
              setTimeout(() => { copyBtn.innerHTML = '📋 Copy'; }, 2000);
            });
          });
          actions.insertBefore(copyBtn, actions.firstChild);

          const tryBtn = actions.querySelector('.try-btn');
          if (tryBtn) {
            tryBtn.addEventListener('click', (e) => {
              e.preventDefault();
              localStorage.setItem('code_c', rawCode);
              window.open('/online-c-compiler.html', '_blank');
            });
          }
        }
      });
    });
  </script>
</head>
<body class="lang-c light-theme">
<!-- NAV PLACEHOLDER -->
<div id="site-nav-placeholder"></div>

<div class="layout">
${sidebarHtml}

  <!-- MAIN ARTICLE -->
  <main class="content">
${chapterContentHtml}
`;

const outputPath = path.join(__dirname, '..', 'public', 'blog-c', '02-c-variables-data-types-constants.html');
fs.writeFileSync(outputPath, fullHtml, 'utf8');

console.log('✅ Successfully generated deep high-value C Chapter 02!');
console.log('Target file size:', fullHtml.length, 'characters');

