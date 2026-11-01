const fs = require('fs');
const path = require('path');
const { LESSONS, buildSidebar } = require('./csharp_curriculum_data.js');

const lesson = LESSONS.find(l => l.num === 2);
const sidebarHtml = buildSidebar(2);

const chapterContentHtml = `
    <!-- BREADCRUMB -->
    <div class="breadcrumb">
      <a href="/">Home</a><span class="sep">›</span>
      <a href="/blog.html">Tutorials</a><span class="sep">›</span>
      <a href="/blog-csharp.html">C# Masterclass</a><span class="sep">›</span>
      <span class="current">Chapter 02: వేరియబుల్స్, CTS డేటా టైప్స్ &amp; var</span>
    </div>

    <!-- PAGE TITLE -->
    <h1 class="page-title">C# వేరియబుల్స్, CTS డేటా టైప్స్ (Value vs Reference), var &amp; const</h1>

    <!-- PAGE META BADGES -->
    <div class="page-meta">
      <span class="badge">⚡ Modern C# 12 / .NET 8 LTS</span>
      <span class="badge">🟢 Chapter 02 of 20</span>
      <span class="badge">📂 Phase 01: C# ఫండమెంటల్స్ &amp; బేసిక్స్</span>
      <span class="badge">📅 2026 Academic Edition</span>
    </div>

    <!-- SUBTOPICS PILL BAR -->
    <div style="background:var(--bg3); border:1px solid var(--border); border-radius:8px; padding:10px 16px; margin-bottom:24px; font-size:13px; color:var(--text2); display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
      <span style="color:#10b981; font-weight:700;">📌 Covered in this chapter:</span>
      <span>మెమరీ కాన్సెప్ట్స్ · CTS (Common Type System) హైరార్కీ · ప్రిమిటివ్ డేటా టైప్స్ మ్యాపింగ్ · Float vs Double vs Decimal ప్రెసిషన్ · Stack (Value Types) vs Heap (Reference Types) · Boxing &amp; Unboxing పెర్ఫార్మెన్స్ · var టైప్ ఇన్ఫరెన్స్ · const vs readonly తేడాలు · default ఆపరేటర్ · Nullable Types (int?) · ఈ-కామర్స్ ఇన్వాయిస్ ప్రాజెక్ట్</span>
    </div>

    <!-- WARM IVORY INTRO ACCENT BOX -->
    <div class="intro-box">
      <h3>హలో C# డెవలపర్! 👋 కంప్యూటర్ మెమరీ ఆర్కిటెక్చర్‌ను శాసించే సమయం వచ్చింది!</h3>
      <p>
        ఒక ప్రోగ్రామ్ అంటే కేవలం సూచనల సమాహారం మాత్రమే కాదు—అది డేటాను సేకరించి, విశ్లేషించి, లెక్కించి భద్రపరిచే ఒక జీవ వ్యవస్థ. 
        ఆ డేటాను RAM లో ఎక్కడ దాచాలి, ఎంత స్థలం కేటాయించాలి, మరియు ఏ నిబంధనలతో నిర్వహించాలి అనేది నిర్ణయించే ప్రాథమిక స్తంభాలే 
        <strong>వేరియబుల్స్ (Variables)</strong> మరియు <strong>డేటా టైప్స్ (Data Types)</strong>.
      </p>
      <p style="margin-top:10px;">
        పైథాన్ లేదా జావాస్క్రిప్ట్ లాంటి డైనమిక్ భాషలతో పోలిస్తే, C# ఒక <strong>స్టాటికల్లీ టైప్డ్ &amp; టైప్-సేఫ్ లాంగ్వేజ్</strong>. 
        అంటే ప్రతి వేరియబుల్ యొక్క టైప్ కంపైల్ చేసే సమయంలోనే ఖచ్చితంగా తెలిసి ఉండాలి. 
        ఈ అధ్యాయంలో .NET యొక్క <strong>CTS (Common Type System)</strong>, స్టాక్ vs హీప్ మెమరీ మోడల్, 
        బాక్సింగ్/అన్‌బాక్సింగ్ సమస్యలు, ఫైనాన్షియల్ ప్రోగ్రామింగ్‌లో <code>decimal</code> ప్రాముఖ్యత, మరియు <code>var</code>, <code>const</code>, <code>readonly</code> 
        ల మధ్య ఉన్న సూక్ష్మ వ్యత్యాసాలను ప్రాక్టికల్ కోడింగ్‌తో లోతుగా నేర్చుకుందాం!
      </p>
    </div>

    <!-- SECTION 1 -->
    <section class="section">
      <h2><span class="num">1</span> వేరియబుల్ అంటే ఏమిటి? కంప్యూటర్ మెమరీలో డేటా ఎలా స్టోర్ అవుతుంది?</h2>
      <p>
        కంప్యూటర్ సైన్స్ పరిభాషలో, <strong>వేరియబుల్ (Variable)</strong> అనేది కంప్యూటర్ RAM (Random Access Memory) లోని ఒక నిర్దిష్ట స్థానానికి 
        మనం పెట్టుకునే ఒక అర్థవంతమైన పేరు (Named Storage Location). 
        మనం ప్రోగ్రామ్‌లో ఒక వేరియబుల్‌ను డిక్లేర్ చేసినప్పుడు, ఆపరేటింగ్ సిస్టమ్ ఆ డేటా టైప్‌కు సరిపడా బైట్ల మెమరీని రిజర్వ్ చేసి, 
        ఆ చిరునామాను (Memory Address) ఆ వేరియబుల్ పేరుతో అనుసంధానిస్తుంది.
      </p>

      <h3>వేరియబుల్ డిక్లరేషన్ &amp; ఇనిషియలైజేషన్ సింటాక్స్:</h3>
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C# — Variable Declaration Anatomy</span>
        </div>
        <pre><code class="language-csharp">// 1. డిక్లరేషన్ (కేవలం మెమరీ రిజర్వ్ చేయడం)
int studentAge;

// 2. అసైన్‌మెంట్ (విలువను నింపడం)
studentAge = 21;

// 3. డిక్లరేషన్ &amp; ఇనిషియలైజేషన్ ఒకేసారి చేయడం (ఉత్తమ పద్ధతి)
int totalMarks = 485;
string studentName = "కార్తీక్ శర్మ";</code></pre>
      </div>

      <h3>C# ఐడెంటిఫైయర్ నామకరణ నిబంధనలు (Identifier Rules):</h3>
      <ul>
        <li>వేరియబుల్ పేర్లు కేవలం అక్షరాలు (A-Z, a-z), అంకెలు (0-9), లేదా అండర్‌స్కోర్ (<code>_</code>) తో మాత్రమే ప్రారంభం కావాలి.</li>
        <li>పేరు మొదటి అక్షరంగా ఎట్టిపరిస్థితుల్లోనూ సంఖ్య (Digit) ఉండకూడదు (ఉదా: <code>1stRank</code> చెల్లదు, <code>rank1</code> చెల్లుతుంది).</li>
        <li>C# రిజర్వ్‌డ్ కీవర్డ్స్‌ను (ఉదా: <code>int</code>, <code>class</code>, <code>for</code>) సాధారణంగా వేరియబుల్ పేర్లుగా వాడలేము. అయితే వాటికి ముందు <code>@</code> ప్రిఫిక్స్ జోడిస్తే వాడవచ్చు (ఉదా: <code>string @class = "CSE";</code> — కానీ ఇది రికమండ్ చేయబడదు).</li>
        <li>C# కేస్-సెన్సిటివ్ (Case-Sensitive): <code>age</code>, <code>Age</code>, మరియు <code>AGE</code> అనేవి మూడు వేర్వేరు వేరియబుల్స్!</li>
      </ul>
    </section>

    <!-- SECTION 2 -->
    <section class="section">
      <h2><span class="num">2</span> CTS (Common Type System): .NET యూనివర్సల్ టైప్ హైరార్కీ</h2>
      <p>
        .NET ప్లాట్‌ఫారమ్ యొక్క అత్యంత గొప్ప ఆవిష్కరణలలో <strong>CTS (Common Type System)</strong> ఒకటి. 
        C#, F#, VB.NET వంటి అనేక విభిన్న భాషలు ఒకే రన్‌టైమ్ (CLR) పై ఎలాంటి పొరపాట్లు లేకుండా పరస్పరం మాట్లాడుకోవడానికి CTS ఒక సార్వత్రిక నిబంధనావళిగా పనిచేస్తుంది.
      </p>

      <h3>"ప్రతిదీ ఒక ఆబ్జెక్టే" (System.Object):</h3>
      <p>
        C# లోని ప్రతి ఒక్క డేటా టైప్—చిన్న సంఖ్య <code>int</code> నుండి మొదలుకొని భారీ క్లాస్ ఆబ్జెక్ట్ వరకు—అన్నీ కూడా 
        <strong><code>System.Object</code></strong> (లేదా దాని అలియాస్ <strong><code>object</code></strong>) అనే ఒకే ఒక్క మాతృమూర్తి (Ultimate Base Type) నుండి ఉద్భవించాయి!
      </p>

      <h3>CTS వర్గీకరణ వృక్షం (Type Hierarchy Tree):</h3>
      <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px; margin:16px 0; font-family:'JetBrains Mono',monospace; font-size:13px; line-height:1.6; color:var(--text1);">
                              System.Object (object)<br/>
                                        │<br/>
           ┌────────────────────────────┴────────────────────────────┐<br/>
           │                                                         │<br/>
    System.ValueType (Value Types)                           Reference Types<br/>
           │                                                         │<br/>
    ┌──────┴──────────────┐                           ┌──────────────┴──────────────┐<br/>
    │                     │                           │              │              │<br/>
Structs / Primitives    Enums                     Classes         Arrays       Delegates<br/>
(int, float, bool,    (Custom Enums)            (string,      (int[],        (Action,<br/>
 char, decimal)                                 Custom Class)  string[])      Func)
      </div>

      <div class="tip-box" style="background:rgba(16,185,129,0.08); border-left:4px solid #10b981; padding:14px; margin:16px 0; border-radius:4px;">
        <strong style="color:#059669;">🎯 రెండు ప్రధాన వర్గాలు:</strong><br/>
        .NET లోని అన్ని డేటా టైప్స్ కేవలం రెండు పెద్ద సమూహాలుగా విడిపోతాయి:<br/>
        1. <strong>Value Types:</strong> డేటా నేరుగా స్టాక్ మెమరీలో నిల్వ అవుతుంది (fast, lightweight).<br/>
        2. <strong>Reference Types:</strong> అసలు డేటా హీప్ మెమరీలో ఉండి, దాని చిరునామా (Pointer) మాత్రమే స్టాక్‌లో ఉంటుంది.
      </div>
    </section>

    <!-- SECTION 3 -->
    <section class="section">
      <h2><span class="num">3</span> ప్రిమిటివ్ డేటా టైప్స్: C# కీవర్డ్స్ vs .NET CTS మ్యాపింగ్ పట్టిక</h2>
      <p>
        C# లో మనం రాసే <code>int</code> లేదా <code>string</code> అనేవి నిజానికి C# కంపైలర్ అందించిన ముద్దుపేర్లు (Syntactic Aliases)! 
        అంతర్గతంగా ప్రతి C# కీవర్డ్ వెనుక ఒక అధికారిక .NET CTS క్లాస్ ఉంటుంది:
      </p>

      <div class="table-wrap" style="margin:20px 0;">
        <table class="tbl">
          <thead>
            <tr>
              <th>C# కీవర్డ్</th>
              <th>.NET CTS క్లాస్</th>
              <th>సైజు (Bytes)</th>
              <th>విలువ పరిధి (Range / Description)</th>
              <th>డిఫాల్ట్ విలువ</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>byte</code></td>
              <td><code>System.Byte</code></td>
              <td>1 Byte (8 bits)</td>
              <td>0 నుండి 255 (Unsigned)</td>
              <td><code>0</code></td>
            </tr>
            <tr>
              <td><code>sbyte</code></td>
              <td><code>System.SByte</code></td>
              <td>1 Byte</td>
              <td>-128 నుండి 127 (Signed)</td>
              <td><code>0</code></td>
            </tr>
            <tr>
              <td><code>short</code></td>
              <td><code>System.Int16</code></td>
              <td>2 Bytes (16 bits)</td>
              <td>-32,768 నుండి 32,767</td>
              <td><code>0</code></td>
            </tr>
            <tr>
              <td><code>int</code></td>
              <td><code>System.Int32</code></td>
              <td>4 Bytes (32 bits)</td>
              <td>-2,147,483,648 నుండి 2,147,483,647 (~2 Billion)</td>
              <td><code>0</code></td>
            </tr>
            <tr>
              <td><code>long</code></td>
              <td><code>System.Int64</code></td>
              <td>8 Bytes (64 bits)</td>
              <td>-9.22 × 10<sup>18</sup> నుండి 9.22 × 10<sup>18</sup> (భారీ సంఖ్యలు)</td>
              <td><code>0L</code></td>
            </tr>
            <tr>
              <td><code>float</code></td>
              <td><code>System.Single</code></td>
              <td>4 Bytes</td>
              <td>±1.5 × 10<sup>−45</sup> నుండి ±3.4 × 10<sup>38</sup> (7 దశాంశ అంకెలు)</td>
              <td><code>0.0f</code></td>
            </tr>
            <tr>
              <td><code>double</code></td>
              <td><code>System.Double</code></td>
              <td>8 Bytes</td>
              <td>±5.0 × 10<sup>−324</sup> నుండి ±1.7 × 10<sup>308</sup> (15-17 దశాంశాలు)</td>
              <td><code>0.0d</code></td>
            </tr>
            <tr>
              <td><code>decimal</code></td>
              <td><code>System.Decimal</code></td>
              <td>16 Bytes (128 bits)</td>
              <td>28-29 ఖచ్చితమైన దశాంశ అంకెలు (ఫైనాన్స్ &amp; కరెన్సీ)</td>
              <td><code>0.0m</code></td>
            </tr>
            <tr>
              <td><code>bool</code></td>
              <td><code>System.Boolean</code></td>
              <td>1 Byte</td>
              <td><code>true</code> లేదా <code>false</code></td>
              <td><code>false</code></td>
            </tr>
            <tr>
              <td><code>char</code></td>
              <td><code>System.Char</code></td>
              <td>2 Bytes</td>
              <td>U+0000 నుండి U+FFFF (UTF-16 యూనీకోడ్ అక్షరం)</td>
              <td><code>'\0'</code></td>
            </tr>
            <tr>
              <td><code>string</code></td>
              <td><code>System.String</code></td>
              <td>Heap Size</td>
              <td>యూనీకోడ్ అక్షరాల శ్రేణి (Reference Type)</td>
              <td><code>null</code></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- SECTION 4 -->
    <section class="section">
      <h2><span class="num">4</span> Float vs Double vs Decimal: ఫైనాన్షియల్ ప్రోగ్రామింగ్‌లో Decimal ఎందుకు తప్పనిసరి?</h2>
      <p>
        దశాంశ సంఖ్యలను (Decimals) నిల్వ చేయడానికి C# మూడు రకాల టైప్స్‌ను అందిస్తుంది: <code>float</code>, <code>double</code>, మరియు <code>decimal</code>. 
        అయితే చాలామంది జూనియర్ డెవలపర్లు చేసే ఘోరమైన తప్పు: బ్యాంకింగ్ లేదా ఈ-కామర్స్ కాలిక్యులేషన్లకు <code>double</code> వాడటం!
      </p>

      <h3>బైనరీ ఫ్లోటింగ్ పాయింట్ సమస్య (IEEE 754 Rounding Error):</h3>
      <p>
        కంప్యూటర్లు అంతర్గతంగా 2 ఆధారంగా (Base-2 Binary) పనిచేస్తాయి. 
        మనం నిత్యజీవితంలో వాడే <code>0.1</code> లేదా <code>0.2</code> వంటి దశాంశ భాగాలను బైనరీ రూపంలో ఖచ్చితంగా రిప్రజెంట్ చేయలేము (1/3 ని దశాంశంలో 0.333333... అని అనంతంగా రాసినట్లే). 
        దానివల్ల రౌండింగ్ ఎర్రర్లు వచ్చి పైసలు తేడా వస్తాయి!
      </p>

      <h3>లైవ్ డెమో: Double vs Decimal తేడా</h3>
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C# — Floating Point Precision Trap</span>
          <div class="code-actions">
            <a class="try-btn" href="/online-csharp-compiler.html" target="_blank">▶ Run in Online C# Compiler</a>
          </div>
        </div>
        <pre><code class="language-csharp">using System;

// 1. Double వాడినప్పుడు రౌండింగ్ ఎర్రర్:
double d1 = 0.1;
double d2 = 0.2;
double dSum = d1 + d2;

Console.WriteLine($"Double కూడిక (0.1 + 0.2): {dSum}");
Console.WriteLine($"dSum == 0.3 నా? : {dSum == 0.3}"); // ❌ false వస్తుంది! (0.30000000000000004)

// 2. Decimal వాడినప్పుడు ఖచ్చితమైన సమాధానం:
decimal m1 = 0.1m;
decimal m2 = 0.2m;
decimal mSum = m1 + m2;

Console.WriteLine($"\\nDecimal కూడిక (0.1m + 0.2m): {mSum}");
Console.WriteLine($"mSum == 0.3m నా? : {mSum == 0.3m}"); // ✅ true వస్తుంది! (ఖచ్చితంగా 0.3)</code></pre>
      </div>

      <div class="warning-box" style="background:rgba(239,68,68,0.08); border-left:4px solid #ef4444; padding:14px; margin:16px 0; border-radius:4px;">
        <strong style="color:#dc2626;">🚨 గోల్డెన్ రూల్ (Industry Golden Rule):</strong><br/>
        పైసలు, రూపాయిలు, డాలర్లు, జీతాలు, ట్యాక్స్‌లు వంటి ద్రవ్య సంబంధిత విలువలన్నింటికీ ఎల్లప్పుడూ <strong><code>decimal</code> (సఫిక్స్ 'm' లేదా 'M')</strong> మాత్రమే వాడాలి! 
        గేమింగ్ ఫిజిక్స్, గ్రాఫిక్స్ లేదా సైంటిఫిక్ గణనలకు <code>double</code> వాడవచ్చు ఎందుకంటే అక్కడ కొద్దిపాటి రౌండింగ్ పర్వాలేదు కానీ ప్రాసెసింగ్ వేగం ముఖ్యం.
      </div>
    </section>

    <!-- SECTION 5 -->
    <section class="section">
      <h2><span class="num">5</span> Value Types vs Reference Types: స్టాక్ (Stack) vs హీప్ (Heap) లోతైన ఆర్కిటెక్చర్</h2>
      <p>
        C# ఇంటర్వ్యూలలో అడిగే #1 మోస్ట్ ఇంపార్టెంట్ కాన్సెప్ట్: <em>"Value Type మరియు Reference Type మధ్య తేడా ఏమిటి?"</em>
        వీటి ప్రవర్తనను అర్థం చేసుకోవడానికి కంప్యూటర్ మెమరీ ఆర్కిటెక్చర్ పరిశీలిద్దాం:
      </p>

      <div class="table-wrap" style="margin:20px 0;">
        <table class="tbl">
          <thead>
            <tr>
              <th>ఫీచర్ / అంశం</th>
              <th>Value Types (స్ట్రక్చర్స్, ప్రిమిటివ్స్)</th>
              <th>Reference Types (క్లాసెస్, స్ట్రింగ్స్, అర్రేలు)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>మెమరీ కేటాయింపు స్థలం</strong></td>
              <td>వేగవంతమైన <strong>Stack</strong> మెమరీలో నేరుగా నిల్వ అవుతాయి.</td>
              <td>డేటా పేలోడ్ <strong>Heap</strong> లో ఉంటుంది; పాయింటర్ చిరునామా <strong>Stack</strong> లో ఉంటుంది.</td>
            </tr>
            <tr>
              <td><strong>అసైన్‌మెంట్ ప్రవర్తన (Copying)</strong></td>
              <td><strong>Deep Copy of Value:</strong> కొత్త కాపీ తయారవుతుంది. ఒకదానిని మారిస్తే మరొకటి మారదు.</td>
              <td><strong>Shallow Reference Copy:</strong> కేవలం పాయింటర్ మాత్రమే కాపీ అవుతుంది. ఇద్దరూ హీప్‌లోని ఒకే ఆబ్జెక్ట్‌ను సూచిస్తారు!</td>
            </tr>
            <tr>
              <td><strong>జీవితకాలం &amp; క్లీనప్</strong></td>
              <td>ఫంక్షన్ స్కోప్ ముగియగానే స్టాక్ పాయింటర్ ద్వారా తక్షణమే క్లీన్ అవుతుంది.</td>
              <td><strong>Garbage Collector (GC)</strong> ఎప్పుడు వీలైతే అప్పుడు హీప్ నుండి తొలగిస్తుంది.</td>
            </tr>
            <tr>
              <td><strong>ఉదాహరణలు</strong></td>
              <td><code>int</code>, <code>float</code>, <code>bool</code>, <code>char</code>, <code>struct</code>, <code>enum</code></td>
              <td><code>string</code>, <code>int[]</code>, <code>class</code>, <code>object</code>, <code>delegate</code></td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>స్టాక్ vs హీప్ మెమరీ విజువల్ డయాగ్రమ్:</h3>
      <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px; margin:16px 0; font-family:'JetBrains Mono',monospace; font-size:13px; line-height:1.6; color:var(--text1);">
[ STACK MEMORY (LIFO) ]                           [ HEAP MEMORY (Dynamic Pool) ]<br/>
┌─────────────────────────────┐                  ┌──────────────────────────────┐<br/>
│ int x = 10                  │                  │                              │<br/>
│ int y = x (y gets value 10) │                  │                              │<br/>
│                             │                  │                              │<br/>
│ int[] arr1 ──(0x4000)───────┼─────────────────&gt;│ [ 100, 200, 300 ] @ 0x4000    │<br/>
│                             │                  │                              │<br/>
│ int[] arr2 ──(0x4000)───────┼──────────────────┘ (ఒకే మెమరీ అడ్రస్‌ను సూచిస్తాయి!)<br/>
└─────────────────────────────┘                  └──────────────────────────────┘
      </div>

      <h3>లైవ్ కోడ్ ప్రూఫ్:</h3>
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C# — Value Type Copy vs Reference Type Sharing</span>
          <div class="code-actions">
            <a class="try-btn" href="/online-csharp-compiler.html" target="_blank">▶ Run in Online C# Compiler</a>
          </div>
        </div>
        <pre><code class="language-csharp">using System;

// 1. Value Type డెమో:
int a = 50;
int b = a; // a లోని విలువను కాపీ చేసి b కి ఇచ్చాం
b = 999;   // b ని మార్చాం

Console.WriteLine($"a = {a}, b = {b}"); // a మారదు! (a = 50, b = 999)

// 2. Reference Type డెమో (అర్రే):
int[] list1 = new int[] { 10, 20, 30 };
int[] list2 = list1; // కేవలం హీప్ అడ్రస్ మాత్రమే కాపీ అయ్యింది!

list2[0] = 777; // list2 ద్వారా మొదటి ఎలిమెంట్‌ను మార్చాం

// list1[0] కూడా మారిపోతుంది, ఎందుకంటే ఇద్దరూ చూస్తున్నది ఒకే హీప్ బ్లాక్‌ని!
Console.WriteLine($"list1[0] = {list1[0]} (ఆటోమేటిక్‌గా 777 గా మారింది!)");</code></pre>
      </div>
    </section>

    <!-- SECTION 6 -->
    <section class="section">
      <h2><span class="num">6</span> బాక్సింగ్ (Boxing) &amp; అన్‌బాక్సింగ్ (Unboxing): పెర్ఫార్మెన్స్ విశ్లేషణ</h2>
      <p>
        C# లోని CTS ప్రకారం Value Types కూడా <code>System.Object</code> నుండి వారసత్వంగా వచ్చాయి. 
        కానీ స్టాక్‌లో ఉండే వాల్యూ టైప్‌ను ఒక రిఫరెన్స్ టైప్ (<code>object</code>) లోకి మార్చాల్సి వచ్చినప్పుడు 
        CLR అంతర్గతంగా చేసే ఆపరేషన్‌ను <strong>బాక్సింగ్ (Boxing)</strong> అంటారు.
      </p>

      <h3>బాక్సింగ్ &amp; అన్‌బాక్సింగ్ డెఫినిషన్స్:</h3>
      <ul>
        <li><strong>బాక్సింగ్ (Boxing):</strong> స్టాక్‌లో ఉన్న Value Type ని హీప్‌లో కొత్తగా ఆబ్జెక్ట్ సృష్టించి అందులో ప్యాక్ చేయడం (ఇంప్లిసిట్‌గా జరుగుతుంది).</li>
        <li><strong>అన్‌బాక్సింగ్ (Unboxing):</strong> హీప్‌లో ఉన్న ఆబ్జెక్ట్ బాక్స్ నుండి తిరిగి అసలు Value Type ని బయటకు తీయడం (ఎక్స్‌ప్లిసిట్ కాస్టింగ్ అవసరం).</li>
      </ul>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C# — Boxing &amp; Unboxing Code</span>
          <div class="code-actions">
            <a class="try-btn" href="/online-csharp-compiler.html" target="_blank">▶ Run in Online C# Compiler</a>
          </div>
        </div>
        <pre><code class="language-csharp">using System;

int num = 42; // Value Type on Stack

// 📦 BOXING: num విలువ హీప్‌లో కొత్త ఆబ్జెక్ట్‌గా బాక్స్ అవుతుంది
object boxedObj = num; 

// 📤 UNBOXING: హీప్ ఆబ్జెక్ట్ నుండి తిరిగి స్టాక్ వాల్యూగా మార్చడం
int unboxedNum = (int)boxedObj;

Console.WriteLine($"అసలు విలువ: {num}");
Console.WriteLine($"బాక్స్‌డ్ ఆబ్జెక్ట్: {boxedObj}");
Console.WriteLine($"అన్‌బాక్స్‌డ్ సంఖ్య: {unboxedNum}");</code></pre>
      </div>

      <div class="warning-box" style="background:rgba(239,68,68,0.08); border-left:4px solid #ef4444; padding:14px; margin:16px 0; border-radius:4px;">
        <strong style="color:#dc2626;">⚡ బాక్సింగ్ వల్ల వచ్చే పెర్ఫార్మెన్స్ సమస్య:</strong><br/>
        లక్షల సార్లు లూప్‌లో బాక్సింగ్ జరిగితే, ప్రతిసారీ హీప్‌లో మెమరీ కేటాయించబడి Garbage Collector పై విపరీతమైన భారం పడుతుంది. 
        అందుకే పాత C# లోని <code>ArrayList</code> ను పూర్తిగా నిషేధించి, C# 2.0 లో బాక్సింగ్ అవసరం లేని <strong>Generics (<code>List&lt;int&gt;</code>)</strong> ను పరిచయం చేశారు!
      </div>
    </section>

    <!-- SECTION 7 -->
    <section class="section">
      <h2><span class="num">7</span> var కీవర్డ్ &amp; కంపైల్-టైమ్ టైప్ ఇన్ఫరెన్స్ (Implicit Typing)</h2>
      <p>
        C# 3.0 లో మైక్రోసాఫ్ట్ <strong><code>var</code></strong> అనే కీవర్డ్‌ను పరిచయం చేసింది. 
        చాలామంది బిగినర్లు <code>var</code> అంటే జావాస్క్రిప్ట్ లాంటి డైనమిక్ టైప్ అనుకుంటారు. కానీ అది పూర్తిగా తప్పు!
      </p>

      <p>
        C# లో <code>var</code> అనేది కేవలం <strong>కంపైల్-టైమ్ టైప్ ఇన్ఫరెన్స్ (Type Inference)</strong>. 
        మనం వేరియబుల్‌కు అసైన్ చేసిన కుడివైపు విలువను చూసి, Roslyn కంపైలర్ స్వయంగా సరైన టైప్‌ను స్థిరీకరిస్తుంది. 
        కంపైల్ అయ్యాక IL కోడ్‌లో సాధారణ <code>int</code> లేదా <code>string</code> లాగే స్టోర్ అవుతుంది!
      </p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C# — var Usage Rules</span>
          <div class="code-actions">
            <a class="try-btn" href="/online-csharp-compiler.html" target="_blank">▶ Run in Online C# Compiler</a>
          </div>
        </div>
        <pre><code class="language-csharp">using System;

var age = 25;              // కంపైలర్ దీనిని 'int' గా గుర్తిస్తుంది
var salary = 75000.50m;    // కంపైలర్ దీనిని 'decimal' గా గుర్తిస్తుంది
var company = "Google";    // కంపైలర్ దీనిని 'string' గా గుర్తిస్తుంది

// 🚨 ఒకసారి టైప్ నిర్ణయించబడ్డాక వేరే టైప్ విలువను మార్చలేము!
// age = "ఇరవై ఐదు"; // 💥 కంపైల్ ఎర్రర్ CS0029: Cannot implicitly convert type 'string' to 'int'

Console.WriteLine($"age Type: {age.GetType()}");
Console.WriteLine($"salary Type: {salary.GetType()}");
Console.WriteLine($"company Type: {company.GetType()}");</code></pre>
      </div>

      <h3>var వాడేటప్పుడు పాటించాల్సిన నిబంధనలు:</h3>
      <ul>
        <li><code>var x;</code> అని ఒంటరిగా డిక్లేర్ చేయలేము! కుడివైపు తప్పనిసరిగా ఇనిషియలైజ్ చేయాలి.</li>
        <li><code>var x = null;</code> రాయలేము, ఎందుకంటే null ఏ టైపో కంపైలర్‌కు అర్థం కాదు.</li>
        <li>క్లాస్ లెవెల్ ఫీల్డ్స్, మెథడ్ పారామీటర్లు లేదా రిటర్న్ టైప్స్‌గా <code>var</code> వాడలేము; కేవలం లోకల్ వేరియబుల్స్ కోసం మాత్రమే వాడాలి.</li>
      </ul>
    </section>

    <!-- SECTION 8 -->
    <section class="section">
      <h2><span class="num">8</span> const vs readonly: కంపైల్-టైమ్ vs రన్‌టైమ్ కాన్‌స్టాంట్స్</h2>
      <p>
        ప్రోగ్రామ్‌లో విలువలు ఎప్పటికీ మారకూడదని కోరుకున్నప్పుడు మనం <code>const</code> లేదా <code>readonly</code> వాడతాం. 
        కానీ వీటి మధ్య ఉన్న అంతర్గత తేడా చాలా విలక్షణమైనది:
      </p>

      <div class="table-wrap" style="margin:20px 0;">
        <table class="tbl">
          <thead>
            <tr>
              <th>ఫీచర్ / అంశం</th>
              <th>const (కంపైల్-టైమ్ కాన్‌స్టాంట్)</th>
              <th>readonly (రన్‌టైమ్ కాన్‌స్టాంట్)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>విలువ కేటాయింపు సమయం</strong></td>
              <td>కోడ్ రాసేప్పుడే <strong>Compile-Time</strong> లో స్థిర విలువ ఇవ్వాలి.</td>
              <td><strong>Run-Time</strong> లో (కన్‌స్ట్రక్టర్ ద్వారా) లెక్కించి ఇవ్వవచ్చు.</td>
            </tr>
            <tr>
              <td><strong>మెమరీ స్టోరేజ్</strong></td>
              <td>IL బైట్‌కోడ్‌లో నేరుగా హార్డ్‌కోడ్ అవుతుంది (మెమరీ స్థలం ఉండదు).</td>
              <td>హీప్ లేదా ఆబ్జెక్ట్ మెమరీలో ఒక సాధారణ ఫీల్డ్‌లా స్టోర్ అవుతుంది.</td>
            </tr>
            <tr>
              <td><strong>స్కోప్ పరిమితి</strong></td>
              <td>లోకల్ వేరియబుల్స్‌కు మరియు క్లాస్ ఫీల్డ్స్‌కు వాడవచ్చు.</td>
              <td>కేవలం క్లాస్ లెవెల్ ఫీల్డ్స్‌కు మాత్రమే వర్తిస్తుంది.</td>
            </tr>
            <tr>
              <td><strong>వర్షనింగ్ ప్రమాదం</strong></td>
              <td>వేరే DLL లోని const మారితే, మన ప్రాజెక్ట్‌ను కూడా రీ-కంపైల్ చేయాలి!</td>
              <td>రీ-కంపైల్ అక్కర్లేదు, రన్‌టైమ్‌లో సరికొత్త విలువను చదువుకుంటుంది.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C# — const vs readonly in a Class</span>
        </div>
        <pre><code class="language-csharp">public class BankAccount
{
    // Compile-time: ఎప్పటికీ మారదు
    public const string BankName = "State Bank of India";
    public const double InterestRate = 6.5;

    // Run-time: ఖాతా తెరిచేటప్పుడు యూజర్ డేటాను బట్టి ఒకేసారి నిర్ణయిస్తాం
    public readonly string AccountNumber;
    public readonly DateTime OpeningDate;

    public BankAccount(string accNo)
    {
        AccountNumber = accNo;
        OpeningDate = DateTime.Now; // రన్‌టైమ్ సమయం
        // OpeningDate = DateTime.Now.AddDays(1); // కన్‌స్ట్రక్టర్ తర్వాత ఇక మార్చలేము!
    }
}</code></pre>
      </div>
    </section>

    <!-- SECTION 9 -->
    <section class="section">
      <h2><span class="num">9</span> డిఫాల్ట్ వాల్యూస్ &amp; default ఆపరేటర్</h2>
      <p>
        C# లో క్లాస్ లోపల వేరియబుల్స్‌ను డిక్లేర్ చేసి ఎలాంటి విలువ ఇవ్వకపోతే, CLR వాటిని ఆటోమేటిక్‌గా వాటి 
        <strong>డిఫాల్ట్ వాల్యూస్ (Default Values)</strong> తో సున్నా చేస్తుంది.
      </p>

      <p>
        ఆధునిక C# లో ఒక డేటా టైప్ యొక్క డిఫాల్ట్ విలువను పొందడానికి <strong><code>default</code></strong> లిటరల్‌ను వాడతాం:
      </p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C# — Modern default Operator</span>
          <div class="code-actions">
            <a class="try-btn" href="/online-csharp-compiler.html" target="_blank">▶ Run in Online C# Compiler</a>
          </div>
        </div>
        <pre><code class="language-csharp">using System;

int defaultInt = default;         // 0
bool defaultBool = default;       // false
char defaultChar = default;       // '\\0' (null character)
decimal defaultDec = default;     // 0.0m
string? defaultStr = default;     // null

Console.WriteLine($"default int: {defaultInt}");
Console.WriteLine($"default bool: {defaultBool}");
Console.WriteLine($"default decimal: {defaultDec}");
Console.WriteLine($"default string is null? {defaultStr == null}");</code></pre>
      </div>

      <div class="warning-box" style="background:rgba(239,68,68,0.08); border-left:4px solid #ef4444; padding:14px; margin:16px 0; border-radius:4px;">
        <strong style="color:#dc2626;">🚨 లోకల్ వేరియబుల్స్ మినహాయింపు (CS0165 Alert):</strong><br/>
        క్లాస్ ఫీల్డ్స్‌కు ఆటోమేటిక్‌గా డిఫాల్ట్ విలువలు వస్తాయి కానీ, ఒక మెథడ్ లోపల రాసే లోకల్ వేరియబుల్స్‌కు ఆటోమేటిక్ డిఫాల్ట్ వాల్యూ రాదు! 
        వాటికి స్పష్టంగా విలువ ఇవ్వకుండా చదవడానికి ప్రయత్నిస్తే కంపైలర్ <code>CS0165: Use of unassigned local variable</code> ఎర్రర్ విసిరి ఆపేస్తుంది.
      </div>
    </section>

    <!-- SECTION 10 -->
    <section class="section">
      <h2><span class="num">10</span> Nullable Value Types: int? మరియు Null-Coalescing (??)</h2>
      <p>
        సాధారణంగా <code>int</code>, <code>double</code>, <code>bool</code> వంటి వాల్యూ టైప్స్ ఎల్లప్పుడూ ఏదో ఒక విలువను కలిగి ఉంటాయి, 
        అవి ఎప్పటికీ <code>null</code> కాలేవు. 
        కానీ రియల్ వరల్డ్ SQL డేటాబేస్‌లలో ఒక కాలమ్ లో విలువ లేకపోవచ్చు (ఉదాహరణకు యూజర్ తన వయస్సును లేదా ఫోన్ నంబర్‌ను ఇంకా నమోదు చేయలేదు).
      </p>

      <p>
        ఇలాంటి సందర్భాల కోసం C# <strong>Nullable Value Types</strong> ను అందిస్తుంది. 
        టైప్ పక్కన ఒక ప్రశ్నార్థక చిహ్నం (<code>?</code>) పెడితే సరిపోతుంది:
      </p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C# — Nullable Value Types &amp; ?? Operator</span>
          <div class="code-actions">
            <a class="try-btn" href="/online-csharp-compiler.html" target="_blank">▶ Run in Online C# Compiler</a>
          </div>
        </div>
        <pre><code class="language-csharp">using System;

// 1. Nullable int డిక్లరేషన్
int? optionalAge = null;

if (optionalAge.HasValue)
{
    Console.WriteLine($"యూజర్ వయస్సు: {optionalAge.Value}");
}
else
{
    Console.WriteLine("యూజర్ వయస్సు ఇంకా నమోదు కాలేదు (null).");
}

// 2. Null-Coalescing ఆపరేటర్ (??) తో సేఫ్ డిఫాల్ట్
// ఒకవేళ optionalAge నల్ అయితే డీఫాల్ట్‌గా 18 తీసుకో:
int finalAge = optionalAge ?? 18;
Console.WriteLine($"ఖరారైన వయస్సు: {finalAge}");</code></pre>
      </div>
    </section>

    <!-- SECTION 11 -->
    <section class="section">
      <h2><span class="num">11</span> ప్రాక్టికల్ ప్రాజెక్ట్: ఈ-కామర్స్ ఆర్డర్ ఇన్వాయిస్ &amp; టాక్స్ కాలిక్యులేటర్</h2>
      <p>
        ఇప్పుడు మనం నేర్చుకున్న <code>decimal</code> ఖచ్చితత్వం, వాల్యూ టైప్స్, స్ట్రింగ్స్, <code>const</code>, మరియు స్ట్రింగ్ ఇంటర్‌పోలేషన్ 
        అన్నింటినీ కలిపి ఒక పూర్తి స్థాయి <strong>ఈ-కామర్స్ ఇన్వాయిస్ జనరేటర్ (E-Commerce Order Invoice CLI)</strong> ను నిర్మిద్దాం:
      </p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C# — E-Commerce Order Invoice Generator Project</span>
          <div class="code-actions">
            <a class="try-btn" href="/online-csharp-compiler.html" target="_blank">▶ Run in Online C# Compiler</a>
          </div>
        </div>
        <pre><code class="language-csharp">using System;

// స్థిరమైన నిబంధనలు (Compile-time Constants)
const string StoreName = "మన డిజిటల్ మార్ట్ (Mana Digital Mart)";
const decimal GstRate = 0.18m;      // 18% GST ట్యాక్స్
const decimal DiscountRate = 0.10m; // 10% పండుగ డిస్కౌంట్

// కస్టమర్ &amp; ఆర్డర్ వివరాలు (విభిన్న డేటా టైప్స్ కలయిక)
string customerName = "రాజేష్ కుమార్ పట్నాయక్";
string orderId = "ORD-2026-9874";
DateTime orderDate = DateTime.Now;

// వస్తువుల డేటా (Decimal precision for financial safety)
string itemName = "Logitech MX Master 3S Wireless Mouse";
int quantity = 2;
decimal unitPrice = 8495.00m;

// వ్యాపార గణనలు (Business Logic Calculations)
decimal rawTotal = unitPrice * quantity;
decimal discountAmount = rawTotal * DiscountRate;
decimal taxableAmount = rawTotal - discountAmount;
decimal gstAmount = taxableAmount * GstRate;
decimal grandTotal = taxableAmount + gstAmount;

// ఇన్వాయిస్ ప్రింటింగ్ (Terminal Formatting)
Console.ForegroundColor = ConsoleColor.Cyan;
Console.WriteLine("==================================================================");
Console.WriteLine($"               🧾 {StoreName}                  ");
Console.WriteLine("==================================================================");
Console.ResetColor();

Console.WriteLine($"ఆర్డర్ ఐడీ    : {orderId}");
Console.WriteLine($"కస్టమర్ పేరు  : {customerName}");
Console.WriteLine($"తేదీ &amp; సమయం  : {orderDate:dd-MMM-yyyy hh:mm tt}");
Console.WriteLine("------------------------------------------------------------------");
Console.WriteLine($"ఐటమ్ పేరు     : {itemName}");
Console.WriteLine($"పరిమాణం       : {quantity} యూనిట్లు");
Console.WriteLine($"యూనిట్ ధర     : ₹{unitPrice:N2}");
Console.WriteLine($"మొత్తం ధర     : ₹{rawTotal:N2}");
Console.WriteLine($"పండుగ రాయితీ  : -₹{discountAmount:N2} (10% OFF)");
Console.WriteLine($"ట్యాక్స్ మొత్తం : +₹{gstAmount:N2} (18% GST)");
Console.WriteLine("------------------------------------------------------------------");

Console.ForegroundColor = ConsoleColor.Green;
Console.WriteLine($"👉 చెల్లించాల్సిన నికర మొత్తం : ₹{grandTotal:N2}");
Console.ResetColor();

Console.WriteLine("==================================================================");
Console.WriteLine("        ధన్యవాదాలు! మీ ఆర్డర్ త్వరలోనే డెలివరీ చేయబడుతుంది.        ");
Console.WriteLine("==================================================================");</code></pre>
      </div>

      <!-- PLAYGROUND TRY BOX -->
      <div class="try-box" style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:18px; margin:24px 0; text-align:center;">
        <h3 style="margin-top:0; color:#10b981;">🚀 లైవ్ C# కంపైలర్‌లో రన్ చేసి చూడండి!</h3>
        <p style="margin-bottom:14px; font-size:14px; color:var(--text2);">
          దశాంశ ఖచ్చితత్వం మరియు కరెన్సీ ఫార్మాటింగ్ ఎలా పనిచేస్తుందో మన ఆన్‌లైన్ C# కంపైలర్‌లో స్వయంగా పరీక్షించండి!
        </p>
        <a href="/online-csharp-compiler.html" class="action-btn try-btn" style="display:inline-block; padding:10px 24px; font-size:14px; text-decoration:none;">
          Online C# Compiler ఓపెన్ చేయండి ➔
        </a>
      </div>
    </section>

    <!-- SECTION 12 -->
    <section class="section">
      <h2><span class="num">12</span> కామన్ మిస్టేక్స్ &amp; కంపైలర్ వార్నింగ్స్ (Troubleshooting Guide)</h2>
      <p>
        C# వేరియబుల్స్ మరియు టైప్స్‌తో పనిచేసేటప్పుడు బిగినర్లు చేసే 4 సాధారణ తప్పులు:
      </p>

      <div class="table-wrap" style="margin:20px 0;">
        <table class="tbl">
          <thead>
            <tr>
              <th>ఎర్రర్ కోడ్ / సమస్య</th>
              <th>తప్పు కోడ్ ఉదాహరణ</th>
              <th>సరైన మార్గం &amp; వివరణ</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>CS0664: Suffix Missing</code></td>
              <td><code>float f = 3.14;</code></td>
              <td><code>float f = 3.14f;</code> — డీఫాల్ట్‌గా ప్రతి దశాంశ సంఖ్య double కాబట్టి float కి 'f', decimal కి 'm' తప్పక ఇవ్వాలి.</td>
            </tr>
            <tr>
              <td><strong>పూర్ణాంకాల విభజన ట్రాంకేషన్</strong></td>
              <td><code>double res = 5 / 2; // res = 2.0</code></td>
              <td><code>double res = 5.0 / 2; // res = 2.5</code> — రెండు పూర్ణాంకాలను భాగిస్తే ఫలితం పూర్ణాంకమే వస్తుంది! కనీసం ఒకదాన్ని ఫ్లోట్ చేయాలి.</td>
            </tr>
            <tr>
              <td><code>CS0165: Unassigned Variable</code></td>
              <td><code>int count; Console.WriteLine(count);</code></td>
              <td><code>int count = 0;</code> — లోకల్ వేరియబుల్స్‌ను ఇనిషియలైజ్ చేయకుండా చదవడం కంపైలర్ నిరాకరిస్తుంది.</td>
            </tr>
            <tr>
              <td><code>CS0131: L-value required</code></td>
              <td><code>const int Max = 100; Max = 200;</code></td>
              <td><code>const</code> విలువను ప్రోగ్రామ్‌లో ఎక్కడా సవరించలేము. రన్‌టైమ్‌లో మారాలంటే సాధారణ వేరియబుల్ వాడండి.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- SECTION 13 -->
    <section class="section">
      <h2><span class="num">13</span> సారాంశం, ఇంటర్వ్యూ ప్రశ్నలు &amp; సెల్ఫ్-అసెస్మెంట్ క్విజ్</h2>
      
      <h3>కీలక సారాంశం (Key Takeaways):</h3>
      <ul>
        <li><strong>CTS Architecture:</strong> .NET లో ప్రతి టైప్ <code>System.Object</code> నుండే మొదలవుతుంది.</li>
        <li><strong>Value vs Reference:</strong> వాల్యూ టైప్స్ స్టాక్‌లో డీప్ కాపీ అవుతాయి; రిఫరెన్స్ టైప్స్ హీప్ లో ఉండి షాలో రిఫరెన్స్ కాపీ అవుతాయి.</li>
        <li><strong>Decimal Precision:</strong> ద్రవ్య లావాదేవీలకు రౌండింగ్ ఎర్రర్లు లేని <code>decimal (128-bit)</code> వాడాలి.</li>
        <li><strong>Boxing &amp; Unboxing:</strong> స్టాక్ నుండి హీప్ కి మారడం బాక్సింగ్; దీనిని నివారించడానికి Generics వాడాలి.</li>
        <li><strong>var vs const:</strong> <code>var</code> అనేది కంపైల్-టైమ్ టైప్ ఇన్ఫరెన్స్; <code>const</code> కంపైల్-టైమ్ స్థిర విలువ.</li>
        <li><strong>Nullable Types:</strong> <code>int?</code> ద్వారా వాల్యూ టైప్స్‌లో కూడా <code>null</code> నిల్వ చేయవచ్చు.</li>
      </ul>

      <h3>టాప్ 5 C# వేరియబుల్స్ &amp; డేటా టైప్స్ ఇంటర్వ్యూ ప్రశ్నలు:</h3>
      <ol style="line-height:1.8;">
        <li><strong>Q1: Value Types మరియు Reference Types మధ్య ప్రధాన వ్యత్యాసం ఏమిటి?</strong><br/>
            <em>జవాబు:</em> Value Types (int, struct, enum) తమ డేటాను నేరుగా స్టాక్ మెమరీలో నిల్వ చేసుకుంటాయి మరియు కాపీ చేసినప్పుడు సరికొత్త విలువ కాపీ అవుతుంది. Reference Types (class, string, array) తమ డేటాను హీప్‌లో భద్రపరిచి, ఆ మెమరీ చిరునామాను మాత్రమే స్టాక్‌లో ఉంచుకుంటాయి; కాపీ చేసినప్పుడు అదే అడ్రస్‌ను షేర్ చేసుకుంటాయి.
        </li>
        <li><strong>Q2: బాక్సింగ్ (Boxing) అంటే ఏమిటి? ఇది అప్లికేషన్ వేగాన్ని ఎందుకు తగ్గిస్తుంది?</strong><br/>
            <em>జవాబు:</em> స్టాక్‌లో ఉన్న ఒక Value Type ని హీప్‌లోని <code>object</code> రిఫరెన్స్‌లోకి మార్చడాన్ని బాక్సింగ్ అంటారు. ఇది జరిగిన ప్రతిసారీ హీప్‌లో కొత్త మెమరీ కేటాయింపు జరిగి, పాతబడినప్పుడు Garbage Collector పై అనవసరమైన భారం పడుతుంది.
        </li>
        <li><strong>Q3: const మరియు readonly మధ్య తేడా ఏమిటి?</strong><br/>
            <em>జవాబు:</em> <code>const</code> విలువ కంపైల్ చేసేప్పుడే తెలిసి ఉండాలి మరియు IL కోడ్‌లో నేరుగా హార్డ్‌కోడ్ అవుతుంది. <code>readonly</code> విలువను రన్‌టైమ్‌లో కన్‌స్ట్రక్టర్ ద్వారా కూడా లెక్కించి కేటాయించవచ్చు.
        </li>
        <li><strong>Q4: C# లో var కీవర్డ్ డైనమిక్ లాంగ్వేజ్ లాంటిదా?</strong><br/>
            <em>జవాబు:</em> కాదు! C# లో <code>var</code> అనేది స్ట్రిక్ట్ కంపైల్-టైమ్ టైప్ ఇన్ఫరెన్స్. కోడ్ కంపైల్ అయ్యే సమయంలోనే కంపైలర్ దాని టైప్‌ను స్థిరీకరిస్తుంది. రన్‌టైమ్‌లో వేరే టైప్‌లోకి మారడానికి వీల్లేదు.
        </li>
        <li><strong>Q5: ఫైనాన్షియల్ ప్రాజెక్ట్‌లలో double కాకుండా decimal ఎందుకు వాడాలి?</strong><br/>
            <em>జవాబు:</em> <code>double</code> అనేది Base-2 బైనరీ ఫ్లోటింగ్ పాయింట్ (IEEE 754), దీనివల్ల 0.1 + 0.2 లాంటి సాధారణ కూడికలలో కూడా రౌండింగ్ ఎర్రర్లు వస్తాయి. <code>decimal</code> అనేది 128-బిట్ Base-10 రూపంలో పనిచేస్తూ 28-29 ఖచ్చితమైన దశాంశ అంకెలను అందిస్తుంది.
        </li>
      </ol>

      <h3>ఇంటరాక్టివ్ సెల్ఫ్-అసెస్మెంట్ క్విజ్ (Self-Assessment Quiz):</h3>

      <!-- QUIZ ITEM 1 -->
      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:600; cursor:pointer; color:var(--text1);">
          ❓ ప్రశ్న 1: C# లో <code>string</code> అనేది Value Type ఆ లేక Reference Type ఆ?
        </summary>
        <div style="margin-top:10px; font-size:14px; color:var(--text2); line-height:1.6;">
          <strong>సమాధానం:</strong> <code>string</code> అనేది ఒక <strong>Reference Type</strong>! దీని డేటా హీప్ మెమరీలో స్టోర్ అవుతుంది. అయితే ఆపరేటర్ల విషయంలో ఇది ఒక వాల్యూ టైప్ లాగా సహజంగా ప్రవర్తించేలా మైక్రోసాఫ్ట్ ఇమ్యుటబుల్ (Immutable) గా డిజైన్ చేసింది.
        </div>
      </details>

      <!-- QUIZ ITEM 2 -->
      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:600; cursor:pointer; color:var(--text1);">
          ❓ ప్రశ్న 2: <code>int a = 10; object obj = a; int b = (int)obj;</code> — ఇందులో బాక్సింగ్ ఎక్కడ, అన్‌బాక్సింగ్ ఎక్కడ జరిగాయి?
        </summary>
        <div style="margin-top:10px; font-size:14px; color:var(--text2); line-height:1.6;">
          <strong>సమాధానం:</strong> <code>object obj = a;</code> లైన్‌లో <strong>బాక్సింగ్</strong> జరిగింది (స్టాక్ నుండి హీప్ ఆబ్జెక్ట్ గా). <code>int b = (int)obj;</code> లైన్‌లో <strong>అన్‌బాక్సింగ్</strong> జరిగింది (హీప్ ఆబ్జెక్ట్ నుండి తిరిగి స్టాక్ పూర్ణాంకంగా).
        </div>
      </details>

      <!-- QUIZ ITEM 3 -->
      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:600; cursor:pointer; color:var(--text1);">
          ❓ ప్రశ్న 3: <code>var price = 99.99;</code> అని రాస్తే దాని టైప్ ఏమవుతుంది?
        </summary>
        <div style="margin-top:10px; font-size:14px; color:var(--text2); line-height:1.6;">
          <strong>సమాధానం:</strong> <strong><code>double</code></strong> అవుతుంది! ఎందుకంటే C# లో ఏ సఫిక్స్ లేని దశాంశ సంఖ్యలను కంపైలర్ డీఫాల్ట్‌గా double గా పరిగణిస్తుంది. decimal కావాలంటే <code>99.99m</code> అని రాయాలి.
        </div>
      </details>

      <!-- QUIZ ITEM 4 -->
      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:600; cursor:pointer; color:var(--text1);">
          ❓ ప్రశ్న 4: <code>int? x = null; int y = x ?? 50;</code> — y లోకి ఏ విలువ వస్తుంది?
        </summary>
        <div style="margin-top:10px; font-size:14px; color:var(--text2); line-height:1.6;">
          <strong>సమాధానం:</strong> <strong>50</strong> వస్తుంది. <code>??</code> (Null-Coalescing) ఆపరేటర్ ఎడమవైపు ఉన్న <code>x</code> నల్ కాబట్టి కుడివైపు ఉన్న 50 ని <code>y</code> కి కేటాయిస్తుంది.
        </div>
      </details>

      <!-- QUIZ ITEM 5 -->
      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:600; cursor:pointer; color:var(--text1);">
          ❓ ప్రశ్న 5: .NET లోని అన్ని డేటా టైప్స్‌కు అల్టిమేట్ రూట్ బేస్ క్లాస్ ఏది?
        </summary>
        <div style="margin-top:10px; font-size:14px; color:var(--text2); line-height:1.6;">
          <strong>సమాధానం:</strong> <strong><code>System.Object</code></strong> (C# లో <code>object</code> కీవర్డ్).
        </div>
      </details>
    </section>

    <!-- CHAPTER NAVIGATION (PAGINATION) -->
    <div style="display:flex; justify-content:space-between; gap:16px; margin:40px 0 20px; flex-wrap:wrap;">
      <a href="/blog-csharp/01-csharp-introduction-and-setup.html" style="display:inline-flex; align-items:center; gap:8px; padding:10px 18px; border-radius:8px; background:var(--bg3); border:1px solid var(--border); color:var(--text); text-decoration:none; font-weight:700; font-size:13.5px;">
        ← Prev: 01. C# &amp; .NET 8 పరిచయం
      </a>
      <a href="/blog-csharp/03-csharp-user-input-type-casting-parsing.html" style="display:inline-flex; align-items:center; gap:8px; padding:10px 20px; border-radius:8px; background:linear-gradient(135deg, #10b981, #059669); color:#ffffff; text-decoration:none; font-weight:700; font-size:13.5px; box-shadow:0 2px 10px rgba(16,185,129,0.2);">
        Next: 03. యూజర్ ఇన్‌పుట్ &amp; టైప్ కాస్టింగ్ →
      </a>
    </div>

    <!-- AUTHOR FOOTER -->
    <div class="author" style="margin-top:36px;">
      <div class="avatar">OC</div>
      <div>
        <strong>Written by Our Compiler Technical Editorial Team</strong><br>
        <span>Reviewed for accuracy &amp; tested on .NET 8 SDK / C# 12 runtime · 2026 Academic Edition</span>
      </div>
    </div>

  </main>
</div>

<!-- SITE NAVIGATION LOADER -->
<script src="/site-nav.js" defer></script>
</body>
</html>
`;

const fullHtml = `<!DOCTYPE html>
<html class="light-theme" lang="te">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>వేరియబుల్స్, CTS డేటా టైప్స్ (Value vs Reference) & var — Modern C# Tutorial | Our Compiler</title>
  <meta name="description" content="వేరియబుల్స్, CTS డేటా టైప్స్ సమగ్ర తెలుగు గైడ్: Stack vs Heap మెమరీ ఆర్కిటెక్చర్, Boxing & Unboxing, float vs double vs decimal, var, const vs readonly, ఈ-కామర్స్ ఇన్వాయిస్ ప్రాజెక్ట్." />
  <meta name="keywords" content="csharp variables in telugu, csharp data types, value type vs reference type c#, boxing unboxing c#, var keyword c#, our compiler" />
  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />
  <link rel="icon" type="image/png" href="/logo.png" />
  <link rel="canonical" href="https://www.ourcompiler.com/blog-csharp/02-csharp-variables-data-types-and-var.html" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;500;600;700&family=Sora:wght@400;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/blog-style.css" />
  <link rel="stylesheet" href="/blog-csharp/style.css" />
  <link rel="stylesheet" href="/site-nav.css" />

  <!-- Schema.org TechArticle Structured Data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": "వేరియబుల్స్, CTS డేటా టైప్స్ (Value vs Reference) & var (C# Programming in Telugu)",
    "description": "Stack vs Heap మెమరీ ఆర్కిటెక్చర్, Boxing & Unboxing, float vs double vs decimal, var, const vs readonly, ఈ-కామర్స్ ఇన్వాయిస్ ప్రాజెక్ట్",
    "articleSection": "Phase 01: C# ఫండమెంటల్స్ & బేసిక్స్",
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
    "dateModified": "2026-11-01"
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
              localStorage.setItem('code_csharp', rawCode);
              window.open('/online-csharp-compiler.html', '_blank');
            });
          }
        }
      });
    });
  </script>
</head>
<body class="lang-csharp light-theme">
<!-- NAV PLACEHOLDER -->
<div id="site-nav-placeholder"></div>

<div class="layout">
${sidebarHtml}

  <!-- MAIN ARTICLE -->
  <main class="content">
${chapterContentHtml}
`;

const outputPath = path.join(__dirname, '..', 'public', 'blog-csharp', '02-csharp-variables-data-types-and-var.html');
fs.writeFileSync(outputPath, fullHtml, 'utf8');

console.log('✅ Successfully generated deep high-value C# Chapter 02!');
console.log('Target file size:', fullHtml.length, 'characters');

