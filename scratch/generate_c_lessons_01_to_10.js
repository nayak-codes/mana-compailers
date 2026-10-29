const fs = require('fs');
const path = require('path');
const { LESSONS } = require('./c_curriculum_data.js');
const { generatePageHtml } = require('./c_page_template.js');

const cDir = path.join(__dirname, '../public/blog-c');

// ==========================================
// CONTENT DEFINITIONS FOR LESSONS 01 TO 10
// ==========================================

const CONTENTS = {
  1: `
    <div class="intro-box">
      కంప్యూటర్ సైన్స్ చరిత్రలో ఆపరేటింగ్ సిస్టమ్స్ (UNIX, Linux, Windows), డేటాబేస్‌లు (MySQL, Oracle) మరియు ఆధునిక ప్రోగ్రామింగ్ భాషలన్నింటికీ (C++, Java, Python) మూలస్తంభమైన <strong>C లాంగ్వేజ్</strong> యొక్క ఆవిర్భావం, GCC కంపైలేషన్ పైప్‌లైన్ మరియు మీ మొట్టమొదటి <code>Hello, World!</code> ప్రోగ్రామ్‌ను ఈ ప్రారంభ అధ్యాయంలో మైక్రోస్కోపిక్‌గా విశ్లేషిద్దాం.
    </div>

    <div class="section-title"><span class="num">1</span>C లాంగ్వేజ్ అంటే ఏమిటి? (Origins & Philosophy)</div>
    <div class="section-body">
      <p>
        <strong>C</strong> అనేది ఒక general-purpose, procedural, statically typed, compiled ప్రోగ్రామింగ్ భాష. దీనిని 1972 లో అమెరికాలోని ప్రముఖ పరిశోధనా సంస్థ బెల్ లాబొరేటరీస్ (Bell Labs) లో లెజెండరీ కంప్యూటర్ సైంటిస్ట్ <strong>Dennis Ritchie</strong> రూపొందించారు.
      </p>
      <p>
        అప్పట్లో రూపొందుతున్న <strong>UNIX Operating System</strong> ను రాయడానికి అసెంబ్లీ భాష చాలా కష్టంగా ఉండటంతో, హార్డ్‌వేర్ మెమరీతో నేరుగా సంభాషించే శక్తి (Low-level capabilities) మరియు ఇంగ్లీష్ లాంటి సులభమైన సింటాక్స్ (High-level abstraction) రెండూ కలిసేలా C భాషను ఆవిష్కరించారు. అందుకే C ని <em>"Middle-Level Language"</em> అని కూడా పిలుస్తారు.
      </p>
    </div>

    <div class="section-title"><span class="num">2</span>GCC కంపైలర్ పైప్‌లైన్ (The 4-Stage Compilation Process)</div>
    <div class="section-body">
      <p>
        C భాషలో మనం రాసే కోడ్ నేరుగా CPU కి అర్థం కాదు. మనం రాసిన కోడ్ కంప్యూటర్ ప్రాసెసర్ అర్థం చేసుకునే బైనరీ మెషిన్ కోడ్ (0s & 1s) గా మారడానికి <strong>4 దశలు</strong> దాటాలి:
      </p>

      <div style="display:flex; flex-direction:column; gap:12px; margin:20px 0;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #10b981; border-radius:8px; padding:14px 18px;">
          <div style="font-size:11px; text-transform:uppercase; color:#10b981; font-weight:800;">Stage 01: Preprocessing (gcc -E)</div>
          <div style="font-weight:700; font-size:14.5px; color:var(--text); margin-top:2px;">హెడర్ ఫైల్స్ & మాక్రోల విస్తరణ</div>
          <div style="font-size:13px; color:var(--text2); margin-top:4px;"><code>#include &lt;stdio.h&gt;</code> లోని వేలాది లైన్ల స్టాండర్డ్ I/O డెఫినిషన్లను తెచ్చి మన ఫైల్ నెత్తిమీద అతికిస్తుంది (<code>main.i</code>).</div>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #3b82f6; border-radius:8px; padding:14px 18px;">
          <div style="font-size:11px; text-transform:uppercase; color:#3b82f6; font-weight:800;">Stage 02: Compilation (gcc -S)</div>
          <div style="font-weight:700; font-size:14.5px; color:var(--text); margin-top:2px;">ప్యూర్ C కోడ్ నుండి CPU అసెంబ్లీ కోడ్ మార్పు</div>
          <div style="font-size:13px; color:var(--text2); margin-top:4px;">సింటాక్స్ చెక్ చేసి, ప్రాసెసర్ రిజిస్టర్ సూచనలుగా (<code>mov, push, call</code>) మారుస్తుంది (<code>main.s</code>).</div>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #f59e0b; border-radius:8px; padding:14px 18px;">
          <div style="font-size:11px; text-transform:uppercase; color:#f59e0b; font-weight:800;">Stage 03: Assembly (as)</div>
          <div style="font-weight:700; font-size:14.5px; color:var(--text); margin-top:2px;">అసెంబ్లీ నుండి బైనరీ ఆబ్జెక్ట్ ఫైల్ తయారీ</div>
          <div style="font-size:13px; color:var(--text2); margin-top:4px;">అసెంబ్లర్ మిషన్ కోడ్ బైట్లను ఒక తాత్కాలిక రీలోకేటబుల్ ఆబ్జెక్ట్ ఫైల్ (<code>main.o</code>) లో సేవ్ చేస్తుంది.</div>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #ec4899; border-radius:8px; padding:14px 18px;">
          <div style="font-size:11px; text-transform:uppercase; color:#ec4899; font-weight:800;">Stage 04: Linking (ld)</div>
          <div style="font-weight:700; font-size:14.5px; color:var(--text); margin-top:2px;">లైబ్రరీలను కలిపి రన్ అయ్యే ఎగ్జిక్యూటబుల్ (.exe) తయారీ</div>
          <div style="font-size:13px; color:var(--text2); margin-top:4px;">మీ ఆబ్జెక్ట్ ఫైల్‌కు C రన్‌టైమ్ లైబ్రరీ (libc.a / crt1.o) ని అనుసంధానించి <code>a.out / program.exe</code> తయారు చేస్తుంది.</div>
        </div>
      </div>
    </div>

    <div class="section-title"><span class="num">3</span>మొదటి C ప్రోగ్రామ్: Hello, World!</div>
    <div class="section-body">
      <div class="code-block" style="margin:16px 0;">
        <div class="code-block-header">
          <span class="lang-tag">C (C99 Standard)</span>
          <a class="try-btn" href="/online-c-compiler.html">▶ Run in Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main() {
    printf("Hello, World! 🚀 Welcome to C Programming.\\n");
    return 0;
}</code></pre>
      </div>

      <div class="card" style="background:var(--bg2); border:1px solid var(--border); padding:16px 18px; border-radius:8px; margin-top:14px;">
        <h4 style="color:#10b981; margin:0 0 10px 0; font-size:14.5px;">🔍 లైన్-బై-లైన్ మైక్రోస్కోపిక్ విశ్లేషణ:</h4>
        <ul style="margin:0 0 0 16px; line-height:1.75; font-size:13.5px; color:var(--text);">
          <li><code>#include &lt;stdio.h&gt;</code>: Standard Input Output Header. స్క్రీన్ పైన <code>printf()</code> ప్రింట్ చేయాలన్నా, కీబోర్డ్ నుండి <code>scanf()</code> చదవాలన్నా ఈ హెడర్ తప్పనిసరి.</li>
          <li><code>int main()</code>: ఎంట్రీ పాయింట్ (Entry Point). ఆపరేటింగ్ సిస్టమ్ మీ ప్రోగ్రామ్‌ను ఎగ్జిక్యూట్ చేయడం ఇక్కడి నుండే మొదలుపెడుతుంది.</li>
          <li><code>printf("...");</code>: Print Formatted Function. డబుల్ కోట్స్ లోపల ఉన్న టెక్స్ట్‌ను స్క్రీన్‌పై డిస్‌ప్లే చేస్తుంది.</li>
          <li><code>\\n</code>: న్యూలైన్ ఎస్కేప్ సీక్వెన్స్. ప్రింట్ అయిన తర్వాత కర్సర్‌ను తర్వాతి లైన్‌కి పంపుతుంది.</li>
          <li><code>return 0;</code>: ప్రోగ్రామ్ ఎటువంటి లోపాలు లేకుండా విజయవంతంగా పూర్తయ్యిందని (Exit Code 0) ఆపరేటింగ్ సిస్టమ్‌కు తెలియజేస్తుంది.</li>
        </ul>
      </div>
    </div>

    <div class="section-title"><span class="num">4</span>బిగినర్స్ చేసే ఘోరమైన తప్పులు (Beginner Pitfalls)</div>
    <div class="section-body">
      <div style="background:var(--bg2); border:1px solid rgba(239,68,68,0.3); border-left:4px solid #ef4444; border-radius:8px; padding:14px 18px; margin:14px 0;">
        <div style="font-weight:700; color:#ef4444; font-size:14px;">❌ Trap 1: void main() వాడటం</div>
        <p style="font-size:13.5px; color:var(--text); margin:6px 0 0 0; line-height:1.6;">
          పాత Turbo C పుస్తకాలు చదివి చాలామంది <code>void main()</code> రాస్తారు. కానీ ANSI / ISO C స్టాండర్డ్స్ ప్రకారం <code>void main()</code> పూర్తిగా చెల్లదు. ఆపరేటింగ్ సిస్టమ్ ఎగ్జిట్ స్టేటస్ పొందడానికి తప్పనిసరిగా <code>int main()</code> మాత్రమే వాడాలి.
        </p>
      </div>
    </div>
  `,

  2: `
    <div class="intro-box">
      కంప్యూటర్ RAM మెమరీలో డేటాను భద్రపరచడానికి కేటాయించే పేరున్న స్థలాలనే <strong>వేరియబుల్స్ (Variables)</strong> అంటారు. C లో వివిధ రకాల డేటా టైప్స్, వాటి బైట్ పరిమాణాలు (Sizes), <code>sizeof</code> ఆపరేటర్ మరియు అన్‌సైన్డ్ ఓవర్‌ఫ్లో ప్రమాదాలను ఈ అధ్యాయంలో నేర్చుకుందాం.
    </div>

    <div class="section-title"><span class="num">1</span>వేరియబుల్స్ & RAM మెమరీ లేఅవుట్</div>
    <div class="section-body">
      <p>
        ఒక వేరియబుల్ డిక్లేర్ చేసినప్పుడు RAM లో దాని డేటా టైప్‌కు సరిపడా బైట్లు కేటాయించబడతాయి:
      </p>

      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:12px; margin:18px 0;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-top:3px solid #10b981; border-radius:8px; padding:12px;">
          <div style="font-size:11px; color:#10b981; font-family:var(--font-mono);">0x2000 to 0x2003 (4 Bytes)</div>
          <div style="font-weight:700; font-size:14px; color:var(--text); margin:4px 0;">int rollNo = 101;</div>
          <div style="font-size:12px; color:var(--text2);">పూర్ణాంకాలు (Integer Data)</div>
        </div>
        <div style="background:var(--bg2); border:1px solid var(--border); border-top:3px solid #3b82f6; border-radius:8px; padding:12px;">
          <div style="font-size:11px; color:#3b82f6; font-family:var(--font-mono);">0x2004 to 0x2007 (4 Bytes)</div>
          <div style="font-weight:700; font-size:14px; color:var(--text); margin:4px 0;">float cgpa = 8.75f;</div>
          <div style="font-size:12px; color:var(--text2);">దశాంశ సంఖ్యలు (Single Precision)</div>
        </div>
        <div style="background:var(--bg2); border:1px solid var(--border); border-top:3px solid #f59e0b; border-radius:8px; padding:12px;">
          <div style="font-size:11px; color:#f59e0b; font-family:var(--font-mono);">0x2008 (1 Byte)</div>
          <div style="font-weight:700; font-size:14px; color:var(--text); margin:4px 0;">char section = 'A';</div>
          <div style="font-size:12px; color:var(--text2);">సింగిల్ అక్షరం (ASCII Code 65)</div>
        </div>
      </div>
    </div>

    <div class="section-title"><span class="num">2</span>C ప్రిమిటివ్ డేటా టైప్స్ టేబుల్</div>
    <div class="section-body">
      <div style="overflow-x:auto; margin:16px 0;">
        <table style="width:100%; border-collapse:collapse; font-size:13.5px; text-align:left;">
          <thead>
            <tr style="background:var(--bg3); border-bottom:2px solid #10b981;">
              <th style="padding:10px 12px; color:#10b981;">డేటా టైప్</th>
              <th style="padding:10px 12px; color:var(--text);">పరిమాణం (Size)</th>
              <th style="padding:10px 12px; color:var(--text);">పరిధి (Range)</th>
              <th style="padding:10px 12px; color:var(--text2);">Format Specifier</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom:1px solid var(--border);">
              <td style="padding:9px 12px; font-weight:700; color:#10b981;">char</td>
              <td style="padding:9px 12px;">1 Byte</td>
              <td style="padding:9px 12px;">-128 to 127</td>
              <td style="padding:9px 12px; font-family:var(--font-mono);">%c</td>
            </tr>
            <tr style="border-bottom:1px solid var(--border);">
              <td style="padding:9px 12px; font-weight:700; color:#10b981;">int</td>
              <td style="padding:9px 12px;">4 Bytes</td>
              <td style="padding:9px 12px;">-2.14 Billion to +2.14 Billion</td>
              <td style="padding:9px 12px; font-family:var(--font-mono);">%d</td>
            </tr>
            <tr style="border-bottom:1px solid var(--border);">
              <td style="padding:9px 12px; font-weight:700; color:#10b981;">float</td>
              <td style="padding:9px 12px;">4 Bytes</td>
              <td style="padding:9px 12px;">~6-7 డెసిమల్ డిజిట్స్</td>
              <td style="padding:9px 12px; font-family:var(--font-mono);">%f</td>
            </tr>
            <tr>
              <td style="padding:9px 12px; font-weight:700; color:#10b981;">double</td>
              <td style="padding:9px 12px;">8 Bytes</td>
              <td style="padding:9px 12px;">~15-17 డెసిమల్ డిజిట్స్</td>
              <td style="padding:9px 12px; font-family:var(--font-mono);">%lf</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="code-block" style="margin:16px 0;">
        <div class="code-block-header">
          <span class="lang-tag">C — sizeof operator</span>
          <a class="try-btn" href="/online-c-compiler.html">▶ Run in Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main() {
    printf("char size:   %zu byte\\n", sizeof(char));
    printf("int size:    %zu bytes\\n", sizeof(int));
    printf("float size:  %zu bytes\\n", sizeof(float));
    printf("double size: %zu bytes\\n", sizeof(double));
    return 0;
}</code></pre>
      </div>
    </div>
  `,

  3: `
    <div class="intro-box">
      కీబోర్డ్ ద్వారా ప్రోగ్రామ్‌కు డేటాను అందించడానికి C లో అత్యంత ప్రముఖమైన ఫంక్షన్ <strong>scanf()</strong>. ఫార్మాట్ స్పెసిఫైయర్లు, <code>&amp;</code> (Address-of) ఆపరేటర్ ఎందుకు తప్పనిసరి, మరియు బిగినర్స్ నిద్రపట్టకుండా చేసే <strong>scanf న్యూలైన్ బఫర్ ట్రాప్</strong> ను ఈ అధ్యాయంలో నేర్చుకుందాం.
    </div>

    <div class="section-title"><span class="num">1</span>scanf() ఎలా పనిచేస్తుంది? (& ఆపరేటర్ రహస్యం)</div>
    <div class="section-body">
      <p>
        <code>scanf("%d", &amp;age);</code> లో <code>&amp;</code> ఎందుకు పెడతామంటే, C లో ఫంక్షన్లకు పాస్ చేసే విలువలు కాపీ అవుతాయి. మనం ఇచ్చిన విలువను వేరియబుల్ యొక్క మెమరీ అడ్రస్‌లో నేరుగా రాయడానికి కంపైలర్‌కు ఆ వేరియబుల్ యొక్క <strong>RAM అడ్రస్</strong> అవసరం.
      </p>

      <div class="code-block" style="margin:16px 0;">
        <div class="code-block-header">
          <span class="lang-tag">C — Basic scanf</span>
          <a class="try-btn" href="/online-c-compiler.html">▶ Run in Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main() {
    int studentAge;
    printf("Enter Student Age: ");
    scanf("%d", &studentAge);

    printf("Confirmed Age: %d years old.\\n", studentAge);
    return 0;
}</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">2</span>ది మోస్ట్ ఫేమస్ C బగ్: scanf న్యూలైన్ బఫర్ ట్రాప్!</div>
    <div class="section-body">
      <div class="concept-box">
        <h4>⚠️ The Ghost Enter Key Mystery:</h4>
        <p>
          మీరు ఒక సంఖ్యను <code>scanf("%d", &amp;age);</code> తో చదివి, వెంటనే <code>scanf("%c", &amp;ch);</code> రాస్తే, క్యారెక్టర్ అడగకుండానే ప్రోగ్రామ్ ముగిసిపోతుంది! ఎందుకంటే సంఖ్య టైప్ చేసి ఎంటర్ కొట్టినప్పుడు, ఆ <strong>'\\n' (Enter Key)</strong> బఫర్‌లోనే ఉండిపోతుంది. తర్వాతి <code>%c</code> ఆ ఎంటర్‌ను చదివి వెళ్లిపోతుంది!
        </p>
        <p style="margin-bottom:0;">
          <strong>రహస్య పరిష్కారం:</strong> ఫార్మాట్ స్పెసిఫైయర్‌కు ముందు ఒక స్పేస్ ఇవ్వండి: <code>scanf(" %c", &amp;ch);</code>. ఆ స్పేస్ బఫర్‌లోని పాత ఎంటర్‌లను ఆటోమేటిక్‌గా తుడిచివేస్తుంది!
        </p>
      </div>
    </div>
  `,

  4: `
    <div class="intro-box">
      వేరియబుల్స్‌పై లెక్కలు చేయడానికి, పరిస్థితులను పోల్చడానికి మరియు కంప్యూటర్ బిట్లను మార్చడానికి <strong>ఆపరేటర్లు (Operators)</strong> ఉపయోగపడతాయి. ఇంటర్వ్యూలలో ఎక్కువగా అడిగే <code>++i</code> vs <code>i++</code> తేడా, షార్ట్-సర్క్యూట్ మరియు ప్రిసిడెన్స్ నియమాలను నేర్చుకుందాం.
    </div>

    <div class="section-title"><span class="num">1</span>Prefix (++i) vs Postfix (i++): అంతర్గత మెమరీ తేడా</div>
    <div class="section-body">
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:16px; margin:16px 0;">
        <div style="background:var(--bg2); border:1px solid #10b981; border-radius:8px; padding:16px;">
          <h4 style="color:#10b981; margin:0 0 6px 0;">Prefix (++i): Increment Then Use</h4>
          <p style="font-size:13px; color:var(--text2); margin:0;">ముందుగా విలువను 1 పెంచి, నవీకరించబడిన తాజా విలువనే ఎక్స్‌ప్రెషన్‌కు అందిస్తుంది.</p>
        </div>
        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px;">
          <h4 style="color:#ef4444; margin:0 0 6px 0;">Postfix (i++): Use Then Increment</h4>
          <p style="font-size:13px; color:var(--text2); margin:0;">ప్రస్తుతం ఉన్న పాత విలువను ఎక్స్‌ప్రెషన్‌లో వాడిన తర్వాత మాత్రమే మెమరీలో 1 పెంచుతుంది.</p>
        </div>
      </div>

      <div class="code-block" style="margin:16px 0;">
        <div class="code-block-header">
          <span class="lang-tag">C — Increment Operators</span>
          <a class="try-btn" href="/online-c-compiler.html">▶ Run in Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main() {
    int a = 5, b = 5;
    int res1 = ++a; // a=6, res1=6
    int res2 = b++; // res2=5, b=6
    printf("Prefix: a=%d, res=%d | Postfix: b=%d, res=%d\\n", a, res1, b, res2);
    return 0;
}</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">2</span>ఇంటిజర్ డివిజన్ ట్రాప్ (5 / 2 = 2)</div>
    <div class="section-body">
      <p>
        రెండు పూర్ణాంకాలను భాగిస్తే (<code>5 / 2</code>) C లో ఫలితం <code>2</code> మాత్రమే వస్తుంది. దశాంశ విలువ రావాలంటే కనీసం ఒక వేరియబుల్‌ను <code>(float)5 / 2</code> అని టైప్ కాస్టింగ్ చేయాలి.
      </p>
    </div>
  `,

  5: `
    <div class="intro-box">
      పరిస్థితులకు అనుగుణంగా సరైన నిర్ణయాలు తీసుకోవడానికి C లో <code>if</code>, <code>if-else</code>, మరియు <code>else-if ladder</code> వాడతాం. ATM క్యాష్ విత్‌డ్రా లాజిక్ మరియు కండిషన్లలో <code>=</code> వాడటం వల్ల వచ్చే ప్రమాదాలను విశ్లేషిద్దాం.
    </div>

    <div class="section-title"><span class="num">1</span>ATM Cash Withdrawal Decision Making</div>
    <div class="section-body">
      <div class="code-block" style="margin:16px 0;">
        <div class="code-block-header">
          <span class="lang-tag">C — if-else branching</span>
          <a class="try-btn" href="/online-c-compiler.html">▶ Run in Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main() {
    double balance = 5000.0, withdraw = 2000.0;
    if (withdraw &lt;= balance) {
        balance -= withdraw;
        printf("Success: Dispensed Rs. %.2f\\n", withdraw);
    } else {
        printf("Declined: Insufficient Funds!\\n");
    }
    printf("Balance: Rs. %.2f\\n", balance);
    return 0;
}</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">2</span>బిగినర్స్ చేసే ప్రమాదకరమైన తప్పు: if (x = 5)</div>
    <div class="section-body">
      <div style="background:var(--bg2); border:1px solid rgba(239,68,68,0.3); border-left:4px solid #ef4444; border-radius:8px; padding:14px 18px; margin:14px 0;">
        <div style="font-weight:700; color:#ef4444; font-size:14px;">❌ Assignment vs Equality Bug:</div>
        <p style="font-size:13.5px; color:var(--text); margin:6px 0 0 0; line-height:1.6;">
          <code>if (score == 100)</code> రాయాల్సింది పోయి పొరపాటున <code>if (score = 100)</code> రాస్తే అది 100 విలువను అసైన్ చేసి ఎల్లప్పుడూ <strong>true</strong> గా మారిపోతుంది! దీని నివారణకు <code>if (100 == score)</code> అని రాయడం అలవాటు చేసుకోవాలి.
        </p>
      </div>
    </div>
  `,

  6: `
    <div class="intro-box">
      డజన్ల కొద్దీ ఎంపికలు ఉన్నప్పుడు పొడవైన <code>else-if</code> నిచ్చెన బదులుగా C కంపైలర్ ఇచ్చే సూపర్ ఫాస్ట్ <strong>Jump Table ఆప్టిమైజేషన్</strong> తో కూడిన <strong>switch-case</strong> స్టేట్‌మెంట్ గురించి నేర్చుకుందాం.
    </div>

    <div class="section-title"><span class="num">1</span>switch ఎందుకు వేగవంతమైనది? (Jump Table O(1))</div>
    <div class="section-body">
      <p>
        <code>if-else</code> నిచ్చెనలో 20 కండిషన్లు ఉంటే వరుసగా 20 సార్లు కంపేర్ చేయాలి (O(N)). కానీ <code>switch</code> లో కంపైలర్ బైనరీలో ఒక ఇండెక్స్డ్ <strong>Jump Table</strong> తయారు చేస్తుంది; కేస్ నంబర్‌ను బట్టి నేరుగా ఆ మెమరీ అడ్రస్‌కు క్షణంలో (O(1)) దూకేస్తుంది!
      </p>

      <div class="code-block" style="margin:16px 0;">
        <div class="code-block-header">
          <span class="lang-tag">C — Menu Calculator</span>
          <a class="try-btn" href="/online-c-compiler.html">▶ Run in Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main() {
    char op = '*';
    double a = 10.0, b = 4.0;

    switch(op) {
        case '+': printf("Sum: %.2f\\n", a + b); break;
        case '-': printf("Diff: %.2f\\n", a - b); break;
        case '*': printf("Product: %.2f\\n", a * b); break;
        case '/': printf("Quotient: %.2f\\n", a / b); break;
        default:  printf("Invalid Operator!\\n"); break;
    }
    return 0;
}</code></pre>
      </div>
    </div>
  `,

  7: `
    <div class="intro-box">
      ఒకే పనిని వేలాది సార్లు పునరావృతం చేయడానికి లూప్స్ అత్యవసరం. <code>for</code> లూప్ యొక్క 4 దశల చక్రం, <code>while</code> మరియు <code>do-while</code> ల మధ్య తేడాలను సమగ్రంగా నేర్చుకుందాం.
    </div>

    <div class="section-title"><span class="num">1</span>for లూప్ యొక్క 4 దశల చక్రం</div>
    <div class="section-body">
      <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px; margin:16px 0;">
        <ol style="margin:0 0 0 18px; line-height:1.75; font-size:13.5px; color:var(--text);">
          <li><strong>Initialization:</strong> లూప్ ప్రారంభంలో ఒకేసారి జరుగుతుంది (<code>int i = 1;</code>).</li>
          <li><strong>Condition Check:</strong> కండిషన్ true అయితేనే లూప్ లోపలికి వెళ్తుంది (<code>i &lt;= 5;</code>).</li>
          <li><strong>Body Execution:</strong> లూప్ లోపలి కోడ్ రన్ అవుతుంది.</li>
          <li><strong>Increment/Step:</strong> రౌండ్ ముగిసిన వెంటనే వేరియబుల్ పెరుగుతుంది (<code>++i</code>), తిరిగి Step 2 కి వెళ్తుంది.</li>
        </ol>
      </div>

      <div class="code-block" style="margin:16px 0;">
        <div class="code-block-header">
          <span class="lang-tag">C — for loop</span>
          <a class="try-btn" href="/online-c-compiler.html">▶ Run in Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main() {
    int sum = 0;
    for (int i = 1; i &lt;= 5; ++i) {
        sum += i;
    }
    printf("Total Sum of 1 to 5: %d\\n", sum);
    return 0;
}</code></pre>
      </div>
    </div>
  `,

  8: `
    <div class="intro-box">
      లూప్‌ను మధ్యలోనే ముగించడానికి <code>break</code>, లేదా నిర్దిష్ట రౌండ్‌ను దాటేయడానికి <code>continue</code> ఉపయోగపడతాయి. నెస్టెడ్ లూప్స్ ద్వారా స్టార్ ప్యాటర్న్స్ గీయడం మరియు <code>goto</code> వివాదాన్ని విశ్లేషిద్దాం.
    </div>

    <div class="section-title"><span class="num">1</span>break & continue కంట్రోల్ ఫ్లో</div>
    <div class="section-body">
      <div class="code-block" style="margin:16px 0;">
        <div class="code-block-header">
          <span class="lang-tag">C — Linear Search with break</span>
          <a class="try-btn" href="/online-c-compiler.html">▶ Run in Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main() {
    int arr[] = {10, 25, 42, 88, 99};
    int target = 42;

    for (int i = 0; i &lt; 5; ++i) {
        if (arr[i] == target) {
            printf("Found target %d at index %d! 🎯\\n", target, i);
            break; // దొరికింది, మిగిలిన అర్రే చూడాల్సిన పనిలేదు!
        }
    }
    return 0;
}</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">2</span>నెస్టెడ్ లూప్స్: స్టార్ పిరమిడ్ ప్యాటర్న్</div>
    <div class="section-body">
      <div class="code-block" style="margin:16px 0;">
        <div class="code-block-header">
          <span class="lang-tag">C — Star Pattern</span>
          <a class="try-btn" href="/online-c-compiler.html">▶ Run in Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main() {
    int rows = 4;
    for (int i = 1; i &lt;= rows; ++i) {
        for (int j = 1; j &lt;= i; ++j) {
            printf("* ");
        }
        printf("\\n");
    }
    return 0;
}</code></pre>
      </div>
    </div>
  `,

  9: `
    <div class="intro-box">
      పెద్ద సాఫ్ట్‌వేర్‌లను చిన్న చిన్న స్వతంత్ర భాగాలుగా విభజించి, కోడ్ డూప్లికేషన్ లేకుండా చేయడానికి <strong>ఫంక్షన్స్ (Functions)</strong> వెన్నెముక లాంటివి. Function Prototype మరియు కంప్యూటర్ RAM లో <strong>Call Stack</strong> ఎలా పెరుగుతుందో తెలుసుకుందాం.
    </div>

    <div class="section-title"><span class="num">1</span>ఫంక్షన్ ప్రోటోటైప్ & మెమరీ కాల్ స్టాక్</div>
    <div class="section-body">
      <p>
        C కంపైలర్ పైనుంచి కిందకి కోడ్‌ను చదువుతుంది. <code>main()</code> కింద రాసిన ఫంక్షన్‌ను పైన కాల్ చేయాలంటే తప్పనిసరిగా ఫైల్ ప్రారంభంలో <strong>Function Prototype</strong> డిక్లేర్ చేయాలి:
      </p>

      <div class="code-block" style="margin:16px 0;">
        <div class="code-block-header">
          <span class="lang-tag">C — Functions & Prototypes</span>
          <a class="try-btn" href="/online-c-compiler.html">▶ Run in Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

// Forward Declaration (Prototype)
int addNumbers(int a, int b);

int main() {
    int result = addNumbers(15, 25);
    printf("Sum: %d\\n", result);
    return 0;
}

// Function Definition
int addNumbers(int a, int b) {
    return a + b;
}</code></pre>
      </div>
    </div>
  `,

  10: `
    <div class="intro-box">
      ఫంక్షన్‌కు ఆర్గ్యుమెంట్లను పంపేటప్పుడు విలువ కాపీ అవుతుందా (Call by Value), లేక అసలైన మెమరీ అడ్రస్ వెళ్తుందా (Call by Reference) అనేది C ప్రోగ్రామింగ్‌లో అత్యంత కీలకమైన అంశం. పాయింటర్ల ద్వారా విలువలను స్వాప్ చేసే విధానాన్ని నేర్చుకుందాం.
    </div>

    <div class="section-title"><span class="num">1</span>Call by Value లో స్వాపింగ్ ఎందుకు ఫెయిల్ అవుతుంది?</div>
    <div class="section-body">
      <p>
        సాధారణంగా ఫంక్షన్‌కు పంపినప్పుడు వేరియబుల్స్ కాపీ మాత్రమే వెళ్తాయి. ఫంక్షన్ లోపల మార్పులు చేస్తే కేవలం లోకల్ కాపీలు మాత్రమే మారుతాయి, <code>main()</code> లోని అసలు వేరియబుల్స్ అలాగే ఉంటాయి.
      </p>

      <div class="code-block" style="margin:16px 0;">
        <div class="code-block-header">
          <span class="lang-tag">C — Swapping using Pointers (Call by Reference)</span>
          <a class="try-btn" href="/online-c-compiler.html">▶ Run in Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

// పాయింటర్లు (*x, *y) మెమరీ అడ్రస్‌ను సూచిస్తాయి
void swap(int* x, int* y) {
    int temp = *x;
    *x = *y;
    *y = temp;
}

int main() {
    int a = 10, b = 20;
    printf("Before: a = %d, b = %d\\n", a, b);

    // &a, &b అంటే మెమరీ అడ్రస్‌లను పంపడం
    swap(&a, &b);

    printf("After:  a = %d, b = %d (Swapped! ✅)\\n", a, b);
    return 0;
}</code></pre>
      </div>
    </div>
  `
};

// Generate files for Lessons 1 to 10
for (let i = 1; i <= 10; ++i) {
  const lesson = LESSONS.find(l => l.num === i);
  if (!lesson) continue;
  lesson.contentHtml = CONTENTS[i] || `<p>Content coming soon.</p>`;
  const html = generatePageHtml(lesson);
  fs.writeFileSync(path.join(cDir, lesson.file), html, 'utf8');
  console.log('✅ Generated Lesson', i, ':', lesson.file);
}

