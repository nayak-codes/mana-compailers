const fs = require('fs');
const path = require('path');
const { LESSONS } = require('./c_curriculum_data.js');
const { generatePageHtml } = require('./c_page_template.js');

const cDir = path.join(__dirname, '../public/blog-c');

// ==========================================
// DEEP EDITORIAL CONTENT FOR PHASE 1 (CH 01 - 04)
// ==========================================

const PHASE1_CONTENTS = {
  // CHAPTER 1
  1: `
    <div class="intro-box">
      కంప్యూటర్ సైన్స్ చరిత్రలో ఆపరేటింగ్ సిస్టమ్స్ (UNIX, Linux, Windows), ఆధునిక గేమింగ్ ఇంజిన్లు, డేటాబేస్‌లు మరియు ప్రోగ్రామింగ్ భాషలన్నింటికీ (C++, Java, Python) మూలస్తంభమైన <strong>C లాంగ్వేజ్</strong> యొక్క ఆవిర్భావం, GCC కంపైలేషన్ పైప్‌లైన్ మరియు మీ మొట్టమొదటి <code>Hello, World!</code> ప్రోగ్రామ్‌ను ఈ ప్రారంభ అధ్యాయంలో మైక్రోస్కోపిక్‌గా విశ్లేషిద్దాం.
    </div>

    <!-- SECTION 1 -->
    <div class="section-title"><span class="num">1</span>C లాంగ్వేజ్ అంటే ఏమిటి? (Origins & Dennis Ritchie Philosophy)</div>
    <div class="section-body">
      <p>
        <strong>C</strong> అనేది ఒక general-purpose, procedural, statically typed, compiled ప్రోగ్రామింగ్ భాష. దీనిని 1972 లో అమెరికాలోని ప్రముఖ పరిశోధనా సంస్థ బెల్ లాబొరేటరీస్ (Bell Labs) లో లెజెండరీ కంప్యూటర్ సైంటిస్ట్ <strong>Dennis Ritchie</strong> రూపొందించారు.
      </p>
      <p>
        అప్పట్లో రూపొందుతున్న <strong>UNIX Operating System</strong> ను రాయడానికి అసెంబ్లీ భాష చాలా కష్టంగా ఉండటంతో, హార్డ్‌వేర్ మెమరీతో నేరుగా సంభాషించే శక్తి (Low-level memory access) మరియు ఇంగ్లీష్ లాంటి సులభమైన సింటాక్స్ (High-level readability) రెండూ కలిసేలా C భాషను ఆవిష్కరించారు. అందుకే C ని ప్రోగ్రామింగ్ ప్రపంచంలో <em>"Mother of all Modern Programming Languages"</em> అని పిలుస్తారు.
      </p>

      <div class="concept-box">
        <h4>💡 C లాంగ్వేజ్ యొక్క ప్రధాన లక్షణాలు (Core Pillars):</h4>
        <ul style="margin:0; padding-left:18px; line-height:1.8;">
          <li><strong>Extreme Speed & Minimal Overhead:</strong> ఎటువంటి గార్బేజ్ కలెక్టర్ (GC) లేదా వర్చువల్ మెషిన్ (JVM/PVM) ఉండదు. కోడ్ నేరుగా CPU మెషిన్ ఇన్స్ట్రక్షన్లుగా రన్ అవుతుంది.</li>
          <li><strong>Direct Memory Access (Pointers):</strong> RAM మెమరీలోని ప్రతి బైట్‌ను పాయింటర్ల ద్వారా నేరుగా నియంత్రించవచ్చు.</li>
          <li><strong>Portability:</strong> ఒక సిస్టమ్ కోసం రాసిన C కోడ్‌ను చిన్న మార్పులతో ఏ ప్రాసెసర్ ఆర్కిటెక్చర్ (x86, ARM, RISC-V) పైనైనా కంపైల్ చేయవచ్చు.</li>
        </ul>
      </div>

      <h4 style="color:#10b981; margin:20px 0 10px; font-size:16px;">🌍 C లాంగ్వేజ్‌ను నేటికీ ఎక్కడ ఉపయోగిస్తున్నారు?</h4>
      <ul style="line-height:1.8; margin-left:18px;">
        <li><strong>Operating Systems Kernels:</strong> Linux Kernel, Windows NT Kernel, macOS Darwin core, మరియు Android OS బేస్ లేయర్లు అన్నీ 100% C తోనే నిర్మించబడ్డాయి.</li>
        <li><strong>Database Engines:</strong> ప్రపంచంలో అత్యధికంగా ఉపయోగించే రిలేషనల్ డేటాబేస్ ఇంజిన్లు MySQL, PostgreSQL, మరియు SQLite కోర్ కోడ్ C లోనే ఉంటుంది.</li>
        <li><strong>Interpreters & Compilers:</strong> Python యొక్క అధికారిక ఇంటర్‌ప్రెటర్ (CPython) స్వయంగా C లో రాయబడింది.</li>
        <li><strong>Embedded Systems & Robotics:</strong> కార్ల ఎలక్ట్రానిక్ కంట్రోల్ యూనిట్లు (ECU), స్పేస్ ఎక్స్ రాకెట్లు, టెస్లా ఆటోపైలట్ మైక్రోకంట్రోలర్లు, మరియు మెడికల్ వెంటిలేటర్లు.</li>
      </ul>
    </div>

    <!-- SECTION 2 -->
    <div class="section-title"><span class="num">2</span>GCC కంపైలర్ పైప్‌లైన్ (The 4-Stage Compilation Process)</div>
    <div class="section-body">
      <p>
        Python లాంటి భాషల్లో కోడ్ ఇంటర్‌ప్రెట్ అవుతుంది. కానీ C లో మనం రాసే ఇంగ్లీష్ కోడ్ నేరుగా కంప్యూటర్ ప్రాసెసర్ అర్థం చేసుకోలేదు. మనం రాసిన కోడ్ బైనరీ ఎగ్జిక్యూటబుల్ (0s & 1s) గా మారడానికి <strong>4 దశలు</strong> దాటాలి:
      </p>

      <!-- Sleek Modern Visual Pipeline Cards -->
      <div style="display:flex; flex-direction:column; gap:12px; margin:20px 0;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #10b981; border-radius:8px; padding:14px 18px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
          <div>
            <div style="font-size:11px; text-transform:uppercase; color:#10b981; font-weight:800;">Stage 01: Preprocessing (gcc -E)</div>
            <div style="font-weight:700; font-size:14.5px; color:var(--text); margin-top:2px;">హెడర్స్ విస్తరణ & కామెంట్స్ తొలగింపు</div>
            <div style="font-size:13px; color:var(--text2); margin-top:4px;"><code>#include &lt;stdio.h&gt;</code> లోని డెఫినిషన్లను తెచ్చి అతికిస్తుంది, మాక్రోలను రీప్లేస్ చేస్తుంది $\rightarrow$ <code>main.i</code> ఫైల్ తయారవుతుంది.</div>
          </div>
          <span style="background:rgba(16,185,129,0.1); color:#10b981; padding:4px 10px; border-radius:6px; font-size:12px; font-weight:700;">Tool: cpp</span>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #3b82f6; border-radius:8px; padding:14px 18px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
          <div>
            <div style="font-size:11px; text-transform:uppercase; color:#3b82f6; font-weight:800;">Stage 02: Compilation (gcc -S)</div>
            <div style="font-weight:700; font-size:14.5px; color:var(--text); margin-top:2px;">C కోడ్ నుండి CPU అసెంబ్లీ కోడ్ మార్పు</div>
            <div style="font-size:13px; color:var(--text2); margin-top:4px;">సింటాక్స్ తప్పులను తనిఖీ చేసి, ప్రాసెసర్ రిజిస్టర్ ఇన్స్ట్రక్షన్లుగా (<code>mov, push, call</code>) మారుస్తుంది $\rightarrow$ <code>main.s</code>.</div>
          </div>
          <span style="background:rgba(59,130,246,0.1); color:#3b82f6; padding:4px 10px; border-radius:6px; font-size:12px; font-weight:700;">Tool: gcc / clang</span>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #f59e0b; border-radius:8px; padding:14px 18px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
          <div>
            <div style="font-size:11px; text-transform:uppercase; color:#f59e0b; font-weight:800;">Stage 03: Assembly (as)</div>
            <div style="font-weight:700; font-size:14.5px; color:var(--text); margin-top:2px;">అసెంబ్లీ నుండి బైనరీ ఆబ్జెక్ట్ ఫైల్ నిర్మాణం</div>
            <div style="font-size:13px; color:var(--text2); margin-top:4px;">అసెంబ్లర్ మిషన్ కోడ్ బైట్లను ఒక తాత్కాలిక రీలోకేటబుల్ ఆబ్జెక్ట్ ఫైల్ (<code>main.o / main.obj</code>) లో సేవ్ చేస్తుంది.</div>
          </div>
          <span style="background:rgba(245,158,11,0.1); color:#f59e0b; padding:4px 10px; border-radius:6px; font-size:12px; font-weight:700;">Tool: as (Assembler)</span>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #ec4899; border-radius:8px; padding:14px 18px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
          <div>
            <div style="font-size:11px; text-transform:uppercase; color:#ec4899; font-weight:800;">Stage 04: Linking (ld)</div>
            <div style="font-weight:700; font-size:14.5px; color:var(--text); margin-top:2px;">లైబ్రరీ అనుసంధానం & రన్ అయ్యే బైనరీ తయారీ</div>
            <div style="font-size:13px; color:var(--text2); margin-top:4px;">మీ ఆబ్జెక్ట్ ఫైల్‌కు C రన్‌టైమ్ లైబ్రరీ (<code>libc.a</code>, <code>printf</code> కోడ్) కలిపి నేరుగా OS రన్ చేయగల <code>a.out / program.exe</code> ను అందిస్తుంది.</div>
          </div>
          <span style="background:rgba(236,72,153,0.1); color:#ec4899; padding:4px 10px; border-radius:6px; font-size:12px; font-weight:700;">Tool: ld (Linker)</span>
        </div>
      </div>
    </div>

    <!-- SECTION 3 -->
    <div class="section-title"><span class="num">3</span>మొదటి C ప్రోగ్రామ్: Hello, World!</div>
    <div class="section-body">
      <p>
        ఇప్పుడు ప్రపంచవ్యాప్తంగా ప్రతి ప్రోగ్రామర్ తన మొదటి అడుగు వేసే సంప్రదాయ <strong>"Hello, World!"</strong> ప్రోగ్రామ్‌ను రాద్దాం:
      </p>

      <div style="margin-top: 16px; margin-bottom: 12px;">
        <div style="font-size:13.5px; font-weight:700; color:#10b981; margin-bottom:6px;">💻 Example 1: Hello World in C (ANSI/ISO Standard)</div>
        <div class="code-block">
          <div class="code-block-header">
            <span class="lang-tag">C (C99 / C11)</span>
            <a class="try-btn" href="/online-c-compiler.html">▶ Run in Compiler</a>
          </div>
          <pre><code>#include &lt;stdio.h&gt;

int main() {
    printf("Hello, World! 🚀 Welcome to C Programming.\\n");
    return 0;
}</code></pre>
        </div>
      </div>

      <!-- Line-by-Line Breakdown -->
      <div class="card" style="background:var(--bg2); border:1px solid var(--border); padding:18px 20px; border-radius:10px; margin-top:16px;">
        <h4 style="color:#10b981; margin:0 0 12px 0; font-size:15px; display:flex; align-items:center; gap:8px;">
          🔍 మైక్రోస్కోపిక్ లైన్-బై-లైన్ కోడ్ విశ్లేషణ:
        </h4>
        <ul style="margin:0 0 0 18px; line-height:1.85; font-size:14px; color:var(--text);">
          <li>
            <code>#include &lt;stdio.h&gt;</code>: 
            ఇది <strong>Preprocessor Directive</strong>. <code>stdio.h</code> అంటే <em>Standard Input Output Header</em>. స్క్రీన్ పైన టెక్స్ట్ ప్రింట్ చేయాలన్నా (<code>printf</code>), కీబోర్డ్ నుండి ఇన్‌పుట్ తీసుకోవాలన్నా (<code>scanf</code>) ఈ ఫైల్‌లోని డిక్లరేషన్లు కంపైలర్‌కు తప్పనిసరి.
          </li>
          <li>
            <code>int main()</code>: 
            ఇది <strong>Main Function (Entry Point)</strong>. ఆపరేటింగ్ సిస్టమ్ మీ ప్రోగ్రామ్‌ను ఎగ్జిక్యూట్ చేయడం ఎల్లప్పుడూ <code>main()</code> మొదటి లైన్ నుండే ప్రారంభిస్తుంది. <code>int</code> అంటే ఈ ఫంక్షన్ చివరికి OS కు ఒక ఇంటిజర్ స్టేటస్ కోడ్ ఇస్తుందని అర్థం.
          </li>
          <li>
            <code>{ ... }</code>: 
            కర్లీ బ్రేసెస్ ఫంక్షన్ యొక్క పరిధిని (Scope) సూచిస్తాయి. ప్రోగ్రామ్ లాజిక్ అంతా ఈ బ్రాకెట్ల మధ్యలోనే ఉండాలి.
          </li>
          <li>
            <code>printf("...");</code>: 
            <em>Print Formatted</em> ఫంక్షన్. డబుల్ కోట్స్ మధ్య ఉన్న టెక్స్ట్‌ను స్క్రీన్‌పై డిస్‌ప్లే చేస్తుంది.
          </li>
          <li>
            <code>\\n</code>: 
            <strong>Newline Escape Sequence</strong>. ఇది ప్రింట్ అయ్యాక కర్సర్‌ను తర్వాతి లైన్‌కి పంపుతుంది.
          </li>
          <li>
            <code>;</code> (Semicolon): 
            C లో ప్రతి స్టేట్‌మెంట్ తప్పనిసరిగా సెమికోలన్‌తో ముగియాలి. ఇది వాక్యానికి ఫుల్‌స్టాప్ లాంటిది.
          </li>
          <li>
            <code>return 0;</code>: 
            ఆపరేటింగ్ సిస్టమ్‌కు <em>"నా ప్రోగ్రామ్ ఎటువంటి లోపాలు లేకుండా 100% విజయవంతంగా ముగిసింది (EXIT_SUCCESS)"</em> అని తెలియజేసే ఎగ్జిట్ స్టేటస్ కోడ్.
          </li>
        </ul>
      </div>
    </div>

    <!-- SECTION 4 -->
    <div class="section-title"><span class="num">4</span>బిగినర్స్ చేసే ఘోరమైన తప్పులు (Beginner Pitfalls)</div>
    <div class="section-body">
      <div style="display:flex; flex-direction:column; gap:12px; margin:14px 0;">
        <div style="background:var(--bg2); border:1px solid rgba(239,68,68,0.3); border-left:4px solid #ef4444; border-radius:8px; padding:14px 18px;">
          <div style="font-weight:700; color:#ef4444; font-size:14px;">❌ Trap 1: void main() వాడటం</div>
          <p style="font-size:13.5px; color:var(--text); margin:6px 0 0 0; line-height:1.6;">
            పాత 1990ల Turbo C పుస్తకాలు చదివి చాలామంది <code>void main()</code> రాస్తుంటారు. ISO C99 / C11 ప్రమాణాల ప్రకారం <code>void main()</code> పూర్తిగా చెల్లదు. ఆపరేటింగ్ సిస్టమ్‌కు ప్రోగ్రామ్ విజయవంతమైందో లేదో తెలియజేయడానికి తప్పనిసరిగా <code>int main()</code> మాత్రమే రాయాలి.
          </p>
        </div>

        <div style="background:var(--bg2); border:1px solid rgba(239,68,68,0.3); border-left:4px solid #ef4444; border-radius:8px; padding:14px 18px;">
          <div style="font-weight:700; color:#ef4444; font-size:14px;">❌ Trap 2: కేస్ సెన్సిటివిటీ గందరగోళం (Case Sensitivity)</div>
          <p style="font-size:13.5px; color:var(--text); margin:6px 0 0 0; line-height:1.6;">
            C లాంగ్వేజ్ కేస్-సెన్సిటివ్. <code>printf</code> బదులు <code>Printf</code> అని రాసినా, లేదా <code>main</code> బదులు <code>Main</code> అని రాసినా కంపైలర్ గుర్తించదు (Undefined reference error వస్తుంది). అన్ని కీవర్డ్స్ చిన్న అక్షరాలలోనే (lowercase) ఉండాలి.
          </p>
        </div>
      </div>
    </div>

    <!-- SECTION 5 -->
    <div class="section-title"><span class="num">5</span>తరచుగా అడిగే ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div class="faq-card" style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px 18px; margin-bottom:12px;">
        <h4 style="color:#10b981; margin:0 0 6px 0; font-size:14.5px;">Q: C నేర్చుకోవడానికి ముందు మరేదైనా ప్రోగ్రామింగ్ భాష వచ్చి ఉండాలా?</h4>
        <p style="margin:0; font-size:13.5px; color:var(--text2); line-height:1.6;">
          అస్సలు అవసరం లేదు! C అనేది ప్రోగ్రామింగ్ నేర్చుకోవడానికి ప్రపంచంలోనే అత్యుత్తమ మొదటి భాష. కంప్యూటర్ మెమరీ మరియు హార్డ్‌వేర్ ఎలా పనిచేస్తాయో C ద్వారా నేర్చుకుంటే, భవిష్యత్తులో Java, Python, C++ వంటి ఏ ఇతర భాషలైనా సులభంగా అర్థమవుతాయి.
        </p>
      </div>

      <div class="faq-card" style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px 18px;">
        <h4 style="color:#10b981; margin:0 0 6px 0; font-size:14.5px;">Q: return 0 కాకుండా return 1 ఇస్తే ఏమవుతుంది?</h4>
        <p style="margin:0; font-size:13.5px; color:var(--text2); line-height:1.6;">
          ఆపరేటింగ్ సిస్టమ్‌కు <code>return 0;</code> అంటే ప్రోగ్రామ్ విజయవంతంగా పూర్తయినట్లు సంకేతం. <code>return 1;</code> (లేదా ఏదైనా నాన్-జీరో సంఖ్య) ఇస్తే ప్రోగ్రామ్‌లో ఏదో లోపం (Error / Failure) జరిగి ఆగిపోయిందని అర్థం.
        </p>
      </div>
    </div>
  `,

  // CHAPTER 2
  2: `
    <div class="intro-box">
      కంప్యూటర్ RAM మెమరీలో డేటాను భద్రపరచడానికి కేటాయించే పేరున్న స్థలాలనే <strong>వేరియబుల్స్ (Variables)</strong> అంటారు. C లో వివిధ రకాల ప్రిమిటివ్ డేటా టైప్స్, వాటి మెమరీ బైట్ పరిమాణాలు (Sizes), <code>sizeof</code> ఆపరేటర్ మరియు అన్‌సైన్డ్ ఓవర్‌ఫ్లో ప్రమాదాలను ఈ అధ్యాయంలో నేర్చుకుందాం.
    </div>

    <!-- SECTION 1 -->
    <div class="section-title"><span class="num">1</span>వేరియబుల్స్ & RAM మెమరీ లేఅవుట్</div>
    <div class="section-body">
      <p>
        ఒక <strong>Variable</strong> అంటే కంప్యూటర్ RAM లోని ఒక నిర్దిష్ట మెమరీ అడ్రస్‌కు మనం పెట్టుకునే స్నేహపూర్వక పేరు. మనం వేరియబుల్‌ను డిక్లేర్ చేసినప్పుడు కంపైలర్ దాని టైప్‌ను బట్టి RAM లో స్థలాన్ని రిజర్వ్ చేస్తుంది:
      </p>

      <!-- Visual RAM Memory Layout Cards -->
      <div style="background:var(--bg2); border:1px solid var(--border); border-radius:10px; padding:18px 20px; margin:20px 0;">
        <div style="font-size:12px; font-weight:800; color:#10b981; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:12px;">
          🧠 హార్డ్‌వేర్ RAM మెమరీ లేఅవుట్ (Memory Slot Visualization):
        </div>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:12px;">
          <div style="background:var(--bg3); border:1px solid rgba(16,185,129,0.3); border-radius:8px; padding:12px; border-top:3px solid #10b981;">
            <div style="font-size:11px; color:#10b981; font-family:var(--font-mono);">Address: 0x7ffd00</div>
            <div style="font-weight:700; font-size:14px; color:var(--text); margin:4px 0;">int rollNumber = 101;</div>
            <div style="font-size:12px; color:var(--text2);">Size: 4 Bytes (32 bits) | Binary Stored</div>
          </div>

          <div style="background:var(--bg3); border:1px solid rgba(59,130,246,0.3); border-radius:8px; padding:12px; border-top:3px solid #3b82f6;">
            <div style="font-size:11px; color:#3b82f6; font-family:var(--font-mono);">Address: 0x7ffd04</div>
            <div style="font-weight:700; font-size:14px; color:var(--text); margin:4px 0;">float percentage = 88.5f;</div>
            <div style="font-size:12px; color:var(--text2);">Size: 4 Bytes | IEEE 754 Stored</div>
          </div>

          <div style="background:var(--bg3); border:1px solid rgba(245,158,11,0.3); border-radius:8px; padding:12px; border-top:3px solid #f59e0b;">
            <div style="font-size:11px; color:#f59e0b; font-family:var(--font-mono);">Address: 0x7ffd08</div>
            <div style="font-weight:700; font-size:14px; color:var(--text); margin:4px 0;">char grade = 'A';</div>
            <div style="font-size:12px; color:var(--text2);">Size: 1 Byte | ASCII Value 65 Stored</div>
          </div>
        </div>
      </div>
    </div>

    <!-- SECTION 2 -->
    <div class="section-title"><span class="num">2</span>C ఫండమెంటల్ డేటా టైప్స్ (Data Types Matrix)</div>
    <div class="section-body">
      <div style="overflow-x:auto; margin:18px 0;">
        <table style="width:100%; border-collapse:collapse; font-size:13.5px; text-align:left;">
          <thead>
            <tr style="background:var(--bg3); border-bottom:2px solid #10b981;">
              <th style="padding:10px 12px; color:#10b981;">డేటా టైప్</th>
              <th style="padding:10px 12px; color:var(--text);">పరిమాణం (Size)</th>
              <th style="padding:10px 12px; color:var(--text);">విలువల పరిధి (Range)</th>
              <th style="padding:10px 12px; color:var(--text2);">Format Specifier</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom:1px solid var(--border);">
              <td style="padding:9px 12px; font-weight:700; color:#10b981;">char</td>
              <td style="padding:9px 12px;">1 Byte (8 bits)</td>
              <td style="padding:9px 12px;">-128 to 127</td>
              <td style="padding:9px 12px; font-family:var(--font-mono); color:#10b981;">%c</td>
            </tr>
            <tr style="border-bottom:1px solid var(--border);">
              <td style="padding:9px 12px; font-weight:700; color:#10b981;">short</td>
              <td style="padding:9px 12px;">2 Bytes (16 bits)</td>
              <td style="padding:9px 12px;">-32,768 to 32,767</td>
              <td style="padding:9px 12px; font-family:var(--font-mono); color:#10b981;">%hd</td>
            </tr>
            <tr style="border-bottom:1px solid var(--border);">
              <td style="padding:9px 12px; font-weight:700; color:#10b981;">int</td>
              <td style="padding:9px 12px;">4 Bytes (32 bits)</td>
              <td style="padding:9px 12px;">-2.14 Billion to +2.14 Billion</td>
              <td style="padding:9px 12px; font-family:var(--font-mono); color:#10b981;">%d / %i</td>
            </tr>
            <tr style="border-bottom:1px solid var(--border);">
              <td style="padding:9px 12px; font-weight:700; color:#10b981;">long long</td>
              <td style="padding:9px 12px;">8 Bytes (64 bits)</td>
              <td style="padding:9px 12px;">$-9 \\times 10^{18}$ to $+9 \\times 10^{18}$</td>
              <td style="padding:9px 12px; font-family:var(--font-mono); color:#10b981;">%lld</td>
            </tr>
            <tr style="border-bottom:1px solid var(--border);">
              <td style="padding:9px 12px; font-weight:700; color:#10b981;">float</td>
              <td style="padding:9px 12px;">4 Bytes</td>
              <td style="padding:9px 12px;">~6-7 డెసిమల్ డిజిట్ల ఖచ్చితత్వం</td>
              <td style="padding:9px 12px; font-family:var(--font-mono); color:#10b981;">%f</td>
            </tr>
            <tr>
              <td style="padding:9px 12px; font-weight:700; color:#10b981;">double</td>
              <td style="padding:9px 12px;">8 Bytes</td>
              <td style="padding:9px 12px;">~15-17 డెసిమల్ డిజిట్ల ఖచ్చితత్వం</td>
              <td style="padding:9px 12px; font-family:var(--font-mono); color:#10b981;">%lf</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- SECTION 3 -->
    <div class="section-title"><span class="num">3</span>sizeof ఆపరేటర్: లైవ్ మెమరీ తనిఖీ</div>
    <div class="section-body">
      <p>
        ఒక వేరియబుల్ లేదా డేటా టైప్ RAM లో ఎన్ని బైట్ల స్థలాన్ని ఆక్రమిస్తుందో తెలుసుకోవడానికి <code>sizeof</code> ఆపరేటర్ వాడతాం:
      </p>

      <div class="code-block" style="margin:16px 0;">
        <div class="code-block-header">
          <span class="lang-tag">C — sizeof operator</span>
          <a class="try-btn" href="/online-c-compiler.html">▶ Run in Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main() {
    int age = 22;
    double bankBalance = 154200.75;

    printf("char size:         %zu byte\\n", sizeof(char));
    printf("int variable size: %zu bytes\\n", sizeof(age));
    printf("double size:       %zu bytes\\n", sizeof(bankBalance));
    return 0;
}</code></pre>
      </div>
    </div>

    <!-- SECTION 4 -->
    <div class="section-title"><span class="num">4</span>Signed vs Unsigned Wrap-around Overflow</div>
    <div class="section-body">
      <div class="concept-box">
        <h4>🔄 Unsigned Wrap-Around Overflow మ్యాజిక్:</h4>
        <p>
          ఒక <code>unsigned char</code> గరిష్టంగా 0 నుండి 255 వరకు మాత్రమే పట్టుకోగలదు. దానికి <code>255 + 1</code> కూడితే ఏమవుతుంది? అది 256 అవ్వదు; బైనరీలో ఓవర్‌ఫ్లో జరిగి తిరిగి <strong>0</strong> అయిపోతుంది (Modular Arithmetic wrap-around).
        </p>
      </div>
    </div>

    <!-- SECTION 5 -->
    <div class="section-title"><span class="num">5</span>బిగినర్స్ చేసే ఘోరమైన తప్పులు (Beginner Pitfalls)</div>
    <div class="section-body">
      <div style="background:var(--bg2); border:1px solid rgba(239,68,68,0.3); border-left:4px solid #ef4444; border-radius:8px; padding:14px 18px; margin:14px 0;">
        <div style="font-weight:700; color:#ef4444; font-size:14px;">❌ Trap 1: Uninitialized Garbage Variables</div>
        <p style="font-size:13.5px; color:var(--text); margin:6px 0 0 0; line-height:1.6;">
          C లో <code>int score;</code> అని డిక్లేర్ చేసి ఏ విలువ ఇవ్వకుండా వదిలేస్తే దానికి డీఫాల్ట్‌గా 0 రాదు! ఆ సమయంలో RAM లో ఉన్న పాత చెత్త విలువ (Garbage Value: ఉదా: <code>-858993460</code>) అందులోకి వస్తుంది. ఎల్లప్పుడూ <code>int score = 0;</code> అని ఇనిషియలైజ్ చేయాలి.
        </p>
      </div>
    </div>
  `,

  // CHAPTER 3
  3: `
    <div class="intro-box">
      వినియోగదారుడి నుండి కీబోర్డ్ ద్వారా సమాచారాన్ని స్వీకరించడానికి C లో ప్రాథమిక సాధనం <strong>scanf()</strong>. ఫార్మాట్ స్పెసిఫైయర్లు, మెమరీ అడ్రస్ ఆపరేటర్ <code>&amp;</code> ఎందుకు తప్పనిసరి, మరియు బిగినర్స్‌ను వేధించే <strong>scanf న్యూలైన్ బఫర్ ట్రాప్</strong> ను ఈ అధ్యాయంలో నేర్చుకుందాం.
    </div>

    <!-- SECTION 1 -->
    <div class="section-title"><span class="num">1</span>scanf() అంతర్గత పనితీరు (& ఆపరేటర్ ప్రాముఖ్యత)</div>
    <div class="section-body">
      <p>
        <code>printf()</code> విలువను ప్రదర్శించడానికి కేవలం ఆ వేరియబుల్ కాపీని తీసుకుంటుంది. కానీ <code>scanf()</code> వినియోగదారుడు ఇచ్చిన విలువను RAM లోని ఆ వేరియబుల్ గదిలో నేరుగా రాయాలి. అందుకే వేరియబుల్ పేరుకు ముందు <strong>&amp; (Address-of Operator)</strong> పెట్టి దాని మెమరీ అడ్రస్‌ను అందిస్తాం:
      </p>

      <div class="code-block" style="margin:16px 0;">
        <div class="code-block-header">
          <span class="lang-tag">C — scanf user input</span>
          <a class="try-btn" href="/online-c-compiler.html">▶ Run in Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main() {
    int studentAge;
    float cgpa;

    printf("Enter Student Age: ");
    scanf("%d", &studentAge);

    printf("Enter Student CGPA: ");
    scanf("%f", &cgpa);

    printf("Registered: Age = %d, CGPA = %.2f\\n", studentAge, cgpa);
    return 0;
}</code></pre>
      </div>
    </div>

    <!-- SECTION 2 -->
    <div class="section-title"><span class="num">2</span>ది మోస్ట్ ఫేమస్ C బగ్: scanf న్యూలైన్ బఫర్ ట్రాప్!</div>
    <div class="section-body">
      <div class="concept-box">
        <h4>⚠️ దెయ్యం లాంటి ఎంటర్ కీ (The Ghost Enter Key Mystery):</h4>
        <p>
          మీరు ఒక సంఖ్యను <code>scanf("%d", &amp;age);</code> తో చదివి, వెంటనే <code>scanf("%c", &amp;grade);</code> రాస్తే, క్యారెక్టర్ అడగకుండానే ప్రోగ్రామ్ స్కిప్ అయిపోతుంది! ఎందుకంటే సంఖ్య టైప్ చేసి ఎంటర్ కొట్టినప్పుడు, ఆ <strong>'\\n' (Enter Key)</strong> ఇన్పుట్ బఫర్‌లోనే ఉండిపోతుంది. తర్వాతి <code>%c</code> ఆ ఎంటర్‌ను చదివి వెళ్లిపోతుంది!
        </p>
        <p style="margin-bottom:0;">
          <strong>రహస్య పరిష్కారం (The Clean Fix):</strong> ఫార్మాట్ స్పెసిఫైయర్‌కు ముందు ఒక స్పేస్ ఇవ్వండి: <code>scanf(" %c", &amp;grade);</code>. ఆ ఒక్క స్పేస్ బఫర్‌లోని పాత ఎంటర్‌లను ఆటోమేటిక్‌గా తుడిచివేస్తుంది!
        </p>
      </div>

      <div class="code-block" style="margin:16px 0;">
        <div class="code-block-header">
          <span class="lang-tag">C — scanf buffer fix</span>
          <a class="try-btn" href="/online-c-compiler.html">▶ Run in Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main() {
    int rollNo;
    char section;

    printf("Enter Roll Number: ");
    scanf("%d", &rollNo);

    // %c కి ముందు స్పేస్ ఇవ్వడం వల్ల బఫర్‌లోని '\\n' క్లీన్ అవుతుంది!
    printf("Enter Section (A/B/C): ");
    scanf(" %c", &section);

    printf("Confirmed: Roll %d is in Section %c\\n", rollNo, section);
    return 0;
}</code></pre>
      </div>
    </div>

    <!-- SECTION 3 -->
    <div class="section-title"><span class="num">3</span>స్పేస్‌లతో కూడిన స్ట్రింగ్స్ చదవడం: fgets()</div>
    <div class="section-body">
      <p>
        <code>scanf("%s", name)</code> కేవలం స్పేస్ లేని ఒకే పదాన్ని చదువుతుంది. పూర్తి పేరును చదవడానికి డేంజరస్ <code>gets()</code> వాడకూడదు (C11 లో తొలగించబడింది). ఆధునిక ప్రమాణాల ప్రకారం <strong>fgets()</strong> మాత్రమే వాడాలి:
      </p>

      <div class="code-block" style="margin:16px 0;">
        <div class="code-block-header">
          <span class="lang-tag">C — Safe string input with fgets</span>
          <a class="try-btn" href="/online-c-compiler.html">▶ Run in Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main() {
    char fullName[50];
    printf("Enter your full name: ");
    fgets(fullName, sizeof(fullName), stdin);

    printf("Welcome, %s", fullName);
    return 0;
}</code></pre>
      </div>
    </div>
  `,

  // CHAPTER 4
  4: `
    <div class="intro-box">
      వేరియబుల్స్‌పై లెక్కలు చేయడానికి, పరిస్థితులను పోల్చడానికి మరియు కంప్యూటర్ బిట్లను మార్చడానికి <strong>ఆపరేటర్లు (Operators)</strong> ప్రాణాధారం. ఇంటర్వ్యూలలో ఎక్కువగా అడిగే <code>++i</code> vs <code>i++</code> తేడా, షార్ట్-సర్క్యూట్ మరియు ప్రిసిడెన్స్ నియమాలను నేర్చుకుందాం.
    </div>

    <!-- SECTION 1 -->
    <div class="section-title"><span class="num">1</span>Prefix (++i) vs Postfix (i++): అంతర్గత మెమరీ తేడా</div>
    <div class="section-body">
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:16px; margin:16px 0;">
        <div style="background:var(--bg2); border:1px solid #10b981; border-radius:8px; padding:16px;">
          <h4 style="color:#10b981; margin:0 0 6px 0; font-size:14px;">⚡ Prefix (++i): Increment Then Use</h4>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.6;">
            ముందుగా మెమరీలోని విలువను వెంటనే 1 పెంచి, ఆ తర్వాత నవీకరించబడిన తాజా విలువనే ఎక్స్‌ప్రెషన్‌కు అందిస్తుంది. ఎటువంటి తాత్కాలిక కాపీ క్రియేట్ కాదు.
          </p>
        </div>
        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px;">
          <h4 style="color:#ef4444; margin:0 0 6px 0; font-size:14px;">🐢 Postfix (i++): Use Then Increment</h4>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.6;">
            ప్రస్తుతం ఉన్న పాత విలువను ఎక్స్‌ప్రెషన్‌లో వాడిన తర్వాత మాత్రమే మెమరీలో 1 పెంచుతుంది. పాత విలువను తాత్కాలిక కాపీ చేసుకోవడం వల్ల కొద్దిగా ఓవర్‌హెడ్ ఉంటుంది.
          </p>
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
    printf("Prefix: a = %d, res1 = %d\\n", a, res1);
    printf("Postfix: b = %d, res2 = %d\\n", b, res2);
    return 0;
}</code></pre>
      </div>
    </div>

    <!-- SECTION 2 -->
    <div class="section-title"><span class="num">2</span>Short-Circuit Evaluation: లాజికల్ సేఫ్టీ షీల్డ్</div>
    <div class="section-body">
      <p>
        C లో <code>&amp;&amp;</code> (AND) మరియు <code>||</code> (OR) ఆపరేటర్లు షార్ట్-సర్క్యూట్ సూత్రంపై పనిచేస్తాయి:
      </p>
      <ul style="line-height:1.8; margin-left:18px;">
        <li><code>A &amp;&amp; B</code>: మొదటి కండిషన్ <code>A</code> గనుక <strong>0 (false)</strong> అయితే, రెండవ కండిషన్ <code>B</code> ని కంపైలర్ అస్సలు రన్ చేయదు!</li>
        <li><code>A || B</code>: మొదటి కండిషన్ <code>A</code> గనుక <strong>1 (true)</strong> అయితే, రెండవ కండిషన్ <code>B</code> ని అస్సలు రన్ చేయదు.</li>
      </ul>

      <div class="concept-box">
        <h4>🛡️ డివిజన్ బై జీరో క్రాష్ నివారణ:</h4>
        <p style="margin:0;">
          <code>if (b != 0 &amp;&amp; a / b &gt; 2)</code> అని రాస్తే, ఒకవేళ <code>b == 0</code> అయితే మొదటి కండిషన్ ఫెయిల్ అయి అక్కడితో ఆగిపోతుంది. రెండవ భాగం రన్ అవ్వదు కాబట్టి ప్రోగ్రామ్ క్రాష్ అవ్వకుండా సురక్షితంగా రక్షించబడుతుంది.
        </p>
      </div>
    </div>

    <!-- SECTION 3: OPERATOR PRECEDENCE (CLEAN CARDS INSTEAD OF ASCII) -->
    <div class="section-title"><span class="num">3</span>ఆపరేటర్ ప్రాధాన్యతా క్రమం (Precedence Hierarchy)</div>
    <div class="section-body">
      <div style="display:flex; flex-direction:column; gap:8px; margin:16px 0;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #10b981; border-radius:6px; padding:10px 14px; display:flex; justify-content:space-between; align-items:center;">
          <span style="font-weight:700; color:var(--text); font-size:13.5px;">Level 1 (Highest): Parentheses & Subscripts</span>
          <code style="color:#10b981; font-weight:700;">()  []  -&gt;  .</code>
        </div>
        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #3b82f6; border-radius:6px; padding:10px 14px; display:flex; justify-content:space-between; align-items:center;">
          <span style="font-weight:700; color:var(--text); font-size:13.5px;">Level 2: Unary Operators</span>
          <code style="color:#3b82f6; font-weight:700;">++  --  !  ~  sizeof  & (addr)  * (deref)</code>
        </div>
        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #f59e0b; border-radius:6px; padding:10px 14px; display:flex; justify-content:space-between; align-items:center;">
          <span style="font-weight:700; color:var(--text); font-size:13.5px;">Level 3: Multiplicative & Additive</span>
          <code style="color:#f59e0b; font-weight:700;">*  /  %  (పై లెవల్) | +  -  (కింది లెవల్)</code>
        </div>
        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #8b5cf6; border-radius:6px; padding:10px 14px; display:flex; justify-content:space-between; align-items:center;">
          <span style="font-weight:700; color:var(--text); font-size:13.5px;">Level 4: Relational & Equality</span>
          <code style="color:#8b5cf6; font-weight:700;">&lt;  &lt;=  &gt;  &gt;=  |  ==  !=</code>
        </div>
        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #ec4899; border-radius:6px; padding:10px 14px; display:flex; justify-content:space-between; align-items:center;">
          <span style="font-weight:700; color:var(--text); font-size:13.5px;">Level 5 (Lowest): Logical & Assignment</span>
          <code style="color:#ec4899; font-weight:700;">&amp;&amp;  |  ||  |  =  +=  -=  *=  /=</code>
        </div>
      </div>
    </div>

    <!-- SECTION 4 -->
    <div class="section-title"><span class="num">4</span>ఇంటిజర్ డివిజన్ ట్రాప్ (5 / 2 = 2) & టైప్ కాస్టింగ్</div>
    <div class="section-body">
      <div style="background:var(--bg2); border:1px solid rgba(239,68,68,0.3); border-left:4px solid #ef4444; border-radius:8px; padding:14px 18px; margin:14px 0;">
        <div style="font-weight:700; color:#ef4444; font-size:14px;">❌ Truncation Error:</div>
        <p style="font-size:13.5px; color:var(--text); margin:6px 0 0 0; line-height:1.6;">
          రెండు పూర్ణాంకాలను భాగిస్తే (<code>5 / 2</code>) C లో ఫలితం <code>2</code> మాత్రమే వస్తుంది. దశాంశ విలువ పొందడానికి కనీసం ఒక వేరియబుల్‌ను <code>(float)5 / 2</code> అని ఎక్స్‌ప్లిసిట్ టైప్ కాస్టింగ్ చేయాలి.
        </p>
      </div>
    </div>
  `
};

// Write out upgraded files for Phase 1 (Lessons 1 to 4)
for (let i = 1; i <= 4; ++i) {
  const lesson = LESSONS.find(l => l.num === i);
  if (!lesson) continue;
  lesson.contentHtml = PHASE1_CONTENTS[i];
  const html = generatePageHtml(lesson);
  fs.writeFileSync(path.join(cDir, lesson.file), html, 'utf8');
  console.log('✅ Upgraded Phase 1 Lesson', i, ':', lesson.file);
}

