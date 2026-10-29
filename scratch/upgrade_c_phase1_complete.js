const fs = require('fs');
const path = require('path');
const { LESSONS } = require('./c_curriculum_data.js');
const { generatePageHtml } = require('./c_page_template.js');

const cDir = path.join(__dirname, '../public/blog-c');

// ==========================================
// COMPREHENSIVE EDITORIAL MASTERCLASS CONTENT: PHASE 1 (CH 01 - 04)
// ==========================================

const PHASE1_CONTENTS = {
  // -------------------------------------------------------------
  // CHAPTER 1: C INTRODUCTION & HELLO WORLD
  // -------------------------------------------------------------
  1: `
    <div class="intro-box">
      కంప్యూటర్ సైన్స్ చరిత్రలో ఆపరేటింగ్ సిస్టమ్స్ (UNIX, Linux, Windows), ఆధునిక గేమింగ్ ఇంజిన్లు, డేటాబేస్‌లు మరియు ప్రోగ్రామింగ్ భాషలన్నింటికీ (C++, Java, Python, Go) మూలస్తంభం <strong>C ప్రోగ్రామింగ్ లాంగ్వేజ్</strong>. 1970లలో జన్మించినప్పటికీ నేటికీ సిస్టమ్స్ ప్రోగ్రామింగ్, ఎంబెడెడ్ సాఫ్ట్‌వేర్ మరియు హై-పెర్ఫార్మెన్స్ కంప్యూటింగ్‌లో C ఎందుకు తిరుగులేని రారాజుగా వెలుగుతుందో, దాని 4-దశల GCC కంపైలేషన్ పైప్‌లైన్ మరియు మీ మొదటి C ప్రోగ్రామ్ అంతర్గత పనితీరును క్షుణ్ణంగా పరిశీలిద్దాం.
    </div>

    <!-- SECTION 1 -->
    <div class="section-title"><span class="num">1</span>C లాంగ్వేజ్ అంటే ఏమిటి? (Origins & Dennis Ritchie Philosophy)</div>
    <div class="section-body">
      <p>
        <strong>C</strong> అనేది ఒక general-purpose, procedural, statically typed, compiled ప్రోగ్రామింగ్ భాష. దీనిని 1972 లో అమెరికాలోని ప్రముఖ పరిశోధనా సంస్థ <strong>Bell Labs</strong> లో <strong>Dennis Ritchie (డెన్నిస్ రిట్చీ)</strong> రూపొందించారు. అప్పటి వరకు ఉన్న Ken Thompson యొక్క <strong>B language</strong> మరియు BCPL భాషల పరిమితులను అధిగమించి, సరికొత్త <strong>UNIX Operating System</strong> కర్నల్ ను రాయడానికి C ని సృష్టించారు.
      </p>

      <div style="background:var(--bg2); border-left:4px solid #10b981; border-radius:0 8px 8px 0; padding:16px 20px; margin:20px 0; box-shadow:0 1px 3px rgba(0,0,0,0.05);">
        <h4 style="color:#10b981; margin:0 0 8px 0; font-size:15px; font-weight:700;">💡 C లాంగ్వేజ్ యొక్క ప్రధాన లక్షణాలు (Core Pillars):</h4>
        <ul style="margin:0; padding-left:20px; line-height:1.8; color:var(--text); font-size:14px;">
          <li><strong>Direct Memory Access (Pointers):</strong> C లో పాయింటర్స్ ద్వారా కంప్యూటర్ RAM అడ్రస్‌లను నేరుగా యాక్సెస్ చేయవచ్చు, మోడిఫై చేయవచ్చు.</li>
          <li><strong>Zero Runtime Overhead:</strong> C కి ఎటువంటి Garbage Collector లేదా భారీ వర్చువల్ మెషిన్ (JVM / Python VM లాంటివి) ఉండదు. కోడ్ నేరుగా CPU మెషిన్ ఇన్‌స్ట్రక్షన్లుగా కన్వర్ట్ అవుతుంది.</li>
          <li><strong>Portability (ప్లాట్‌ఫామ్ స్వతంత్రత):</strong> చిన్న మైక్రోకంట్రోలర్ (Arduino) నుండి సూపర్ కంప్యూటర్ల వరకు దాదాపు ప్రతి ఆర్కిటెక్చర్ (x86, ARM, RISC-V, MIPS) పై C కోడ్ రన్ అవుతుంది.</li>
          <li><strong>Deterministic Performance:</strong> ప్రోగ్రామ్ మెమరీలో ఎంత స్పేస్ తీసుకుంటుంది, ఎప్పుడు విడుదల అవుతుందో డెవలపర్ చేతిలోనే స్పష్టంగా ఉంటుంది.</li>
        </ul>
      </div>

      <h4 style="color:#10b981; margin:24px 0 12px; font-size:16px; font-weight:700;">🌍 C లాంగ్వేజ్‌ను నేటికీ ఎక్కడ ఉపయోగిస్తున్నారు?</h4>
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:16px; margin-bottom:20px;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px;">
          <strong style="color:var(--text); display:block; margin-bottom:6px;">🐧 Operating System Kernels</strong>
          <span style="font-size:13px; color:var(--text2); line-height:1.5; display:block;">Linux కర్నల్, Windows NT కర్నల్ మరియు Apple macOS Darwin కర్నల్ కోర్ భాగాలన్నీ C లోనే రాయబడ్డాయి.</span>
        </div>
        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px;">
          <strong style="color:var(--text); display:block; margin-bottom:6px;">🚗 Embedded & IoT Systems</strong>
          <span style="font-size:13px; color:var(--text2); line-height:1.5; display:block;">కార్ల ఇంజిన్ కంట్రోల్ యూనిట్లు (ECU), స్పేస్‌క్రాఫ్ట్ ఏవియానిక్స్, వాషింగ్ మెషీన్లు, మెడికల్ వెంటిలేటర్లలో C ప్రముఖం.</span>
        </div>
        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px;">
          <strong style="color:var(--text); display:block; margin-bottom:6px;">🗄️ Databases & Compilers</strong>
          <span style="font-size:13px; color:var(--text2); line-height:1.5; display:block;">MySQL, PostgreSQL, SQLite డేటాబేస్ ఇంజిన్లు, CPython (Python రన్‌టైమ్), Git వర్షన్ కంట్రోల్ C లోనే ఉన్నాయి.</span>
        </div>
        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px;">
          <strong style="color:var(--text); display:block; margin-bottom:6px;">🎮 Game Engines & Graphics</strong>
          <span style="font-size:13px; color:var(--text2); line-height:1.5; display:block;">లెజెండరీ గేమ్‌లు (Doom, Quake), OpenGL డ్రైవర్లు, DirectX ఇంటర్‌ఫేస్‌లు తక్కువ లేటెన్సీ కోసం C పై ఆధారపడతాయి.</span>
        </div>
      </div>
    </div>

    <!-- SECTION 2 -->
    <div class="section-title"><span class="num">2</span>GCC కంపైలర్ పైప్‌లైన్ (The 4-Stage Compilation Process)</div>
    <div class="section-body">
      <p>
        చాలామంది బిగినర్స్ C కోడ్ రాయగానే ఒకే క్లిక్‌తో ప్రోగ్రామ్ రన్ అయిపోతుందని అనుకుంటారు. కానీ తెరవెనుక <strong>GCC (GNU Compiler Collection)</strong> మీ సోర్స్ కోడ్‌ను నాలుగు ప్రత్యేక దశల (Stages) ద్వారా మెషిన్ లాంగ్వేజ్‌గా మారుస్తుంది.
      </p>

      <div style="display:flex; flex-direction:column; gap:12px; margin:20px 0;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #3b82f6; border-radius:8px; padding:14px 18px;">
          <div style="font-weight:700; color:#3b82f6; font-size:14.5px;">దశ 1: ప్రీప్రాసెసింగ్ (Preprocessing) — <code>gcc -E hello.c -o hello.i</code></div>
          <p style="font-size:13.5px; color:var(--text2); margin:6px 0 0 0; line-height:1.6;">
            ఇది కంపైలేషన్‌కు ముందస్తు సన్నాహం. కోడ్‌లోని కామెంట్లు (Comments) తొలగించబడతాయి. <code>#include &lt;stdio.h&gt;</code> లాంటి హెడర్ ఫైల్స్ యొక్క వాస్తవ కోడ్ నేరుగా ఫైల్‌లో పేస్ట్ అవుతుంది. <code>#define</code> మ్యాక్రోలు విస్తరించబడతాయి. దీని అవుట్‌పుట్ <strong>.i</strong> ఫైల్.
          </p>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #10b981; border-radius:8px; padding:14px 18px;">
          <div style="font-weight:700; color:#10b981; font-size:14.5px;">దశ 2: కంపైలేషన్ (Compilation) — <code>gcc -S hello.i -o hello.s</code></div>
          <p style="font-size:13.5px; color:var(--text2); margin:6px 0 0 0; line-height:1.6;">
            ప్రీప్రాసెస్ చేసిన C కోడ్‌ను గ్రామర్, సింటాక్స్ పరిశీలించి (AST parsing & semantic analysis) ప్రాసెసర్ అర్థం చేసుకోగల <strong>Assembly Language (.s)</strong> గా మారుస్తుంది. ఇక్కడే సింటాక్స్ ఎర్రర్లు బయటపడతాయి.
          </p>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #f59e0b; border-radius:8px; padding:14px 18px;">
          <div style="font-weight:700; color:#f59e0b; font-size:14.5px;">దశ 3: అసెంబ్లింగ్ (Assembly) — <code>gcc -c hello.s -o hello.o</code></div>
          <p style="font-size:13.5px; color:var(--text2); margin:6px 0 0 0; line-height:1.6;">
            అసెంబ్లర్ ఆ అసెంబ్లీ కోడ్‌ను CPU నేరుగా చదవగల బైనరీ ఆబ్జెక్ట్ కోడ్ (Machine Code 0s and 1s) గా మారుస్తుంది. దీని ఫలితంగా <strong>.o (లేదా .obj)</strong> ఆబ్జెక్ట్ ఫైల్ ఏర్పడుతుంది.
          </p>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #8b5cf6; border-radius:8px; padding:14px 18px;">
          <div style="font-weight:700; color:#8b5cf6; font-size:14.5px;">దశ 4: లింకింగ్ (Linking) — <code>gcc hello.o -o hello.exe</code></div>
          <p style="font-size:13.5px; color:var(--text2); margin:6px 0 0 0; line-height:1.6;">
            లింకర్ మీ ఆబ్జెక్ట్ ఫైల్‌ను C స్టాండర్డ్ లైబ్రరీ (libc) కోడ్‌తో కలుపుతుంది. ఉదాహరణకు మీరు వాడిన <code>printf()</code> ఫంక్షన్ వాస్తవ మెషిన్ కోడ్ లైబ్రరీలో ఎక్కడ ఉందో కనుగొని, మీ కోడ్‌తో అనుసంధానించి రన్ అయ్యే ఎగ్జిక్యూటబుల్ ఫైల్ (<strong>.exe</strong> లేదా <strong>a.out</strong>) ను ఉత్పత్తి చేస్తుంది.
          </p>
        </div>
      </div>
    </div>

    <!-- SECTION 3 -->
    <div class="section-title"><span class="num">3</span>మొదటి C ప్రోగ్రామ్: Hello, World!</div>
    <div class="section-body">
      <p>
        ప్రపంచంలో ఏ ప్రోగ్రామర్ అయినా మొదటిసారి నేర్చుకునే సాంప్రదాయ ప్రోగ్రామ్ "Hello, World!". దీనిని అత్యంత సరళమైన రూపంలో రాసి, ప్రతి అక్షరాన్ని అర్థం చేసుకుందాం:
      </p>

      <div class="code-block" style="margin:16px 0;">
        <div class="code-block-header">
          <span class="lang-tag">C — Hello World</span>
          <a class="try-btn" href="/online-c-compiler.html">⚡ Try in C Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main(void) {
    // స్క్రీన్‌పై సందేశాన్ని ముద్రించడం
    printf("Hello, World!\\n");
    return 0;
}</code></pre>
      </div>

      <h4 style="color:#10b981; margin:20px 0 10px; font-size:15px; font-weight:700;">🔍 లైన్-బై-లైన్ లోతైన విశ్లేషణ (Exhaustive Line Breakdown):</h4>
      <div style="display:flex; flex-direction:column; gap:10px; margin-bottom:20px;">
        <div style="padding:10px 14px; background:var(--bg2); border-radius:6px; border:1px solid var(--border); font-size:13.5px;">
          <code style="color:#10b981; font-weight:700;">#include &lt;stdio.h&gt;</code> :
          ఇది <strong>Preprocessor Directive</strong>. <code>stdio.h</code> అంటే <em>Standard Input Output Header</em>. ఇందులో <code>printf()</code>, <code>scanf()</code> వంటి ఇన్‌పుట్/అవుట్‌పుట్ ఫంక్షన్ల యొక్క డిక్లరేషన్లు ఉంటాయి. ఈ లైన్ లేకుండా <code>printf</code> ను వాడలేం.
        </div>
        <div style="padding:10px 14px; background:var(--bg2); border-radius:6px; border:1px solid var(--border); font-size:13.5px;">
          <code style="color:#10b981; font-weight:700;">int main(void)</code> :
          ఆపరేటింగ్ సిస్టమ్ ప్రోగ్రామ్‌ను రన్ చేయడానికి వెతికే ప్రధాన ద్వారం (<strong>Entry Point</strong>). కంప్యూటర్ మీ కోడ్‌ను మొదటిసారి ఇక్కడి నుంచే ఎగ్జిక్యూట్ చేయడం ప్రారంభిస్తుంది. <code>int</code> అంటే ఈ ఫంక్షన్ పని ముగిశాక OS కి ఒక పూర్ణాంక సంఖ్యను (Integer status) రిటర్న్ చేస్తుందని అర్థం. <code>void</code> అంటే మెయిన్ ఫంక్షన్ ఎటువంటి ఆర్గ్యుమెంట్లు తీసుకోదని స్పష్టత.
        </div>
        <div style="padding:10px 14px; background:var(--bg2); border-radius:6px; border:1px solid var(--border); font-size:13.5px;">
          <code style="color:#10b981; font-weight:700;">{ ... }</code> :
          కర్లీ బ్రేసెస్ (Curly Braces) ఫంక్షన్ యొక్క పరిధిని (Function Body Scope) సూచిస్తాయి.
        </div>
        <div style="padding:10px 14px; background:var(--bg2); border-radius:6px; border:1px solid var(--border); font-size:13.5px;">
          <code style="color:#10b981; font-weight:700;">printf("Hello, World!\\n");</code> :
          <code>printf</code> అంటే <em>Print Formatted</em>. డబుల్ కోట్స్ మధ్య ఉన్న టెక్స్ట్‌ను కన్సోల్ పై ముద్రిస్తుంది. <code>\\n</code> అనేది <strong>Escape Sequence</strong> — ఇది కర్సర్‌ను తర్వాతి లైన్‌కు (Newline) తీసుకెళ్తుంది. ప్రతి C స్టేట్‌మెంట్ చివర సెమికోలన్ <code>;</code> తప్పనిసరి.
        </div>
        <div style="padding:10px 14px; background:var(--bg2); border-radius:6px; border:1px solid var(--border); font-size:13.5px;">
          <code style="color:#10b981; font-weight:700;">return 0;</code> :
          ఆపరేటింగ్ సిస్టమ్‌కు ప్రోగ్రామ్ ఎటువంటి లోపాలు లేకుండా విజయవంతంగా పూర్తయిందని (<strong>Exit Code 0 = Success</strong>) తెలియజేస్తుంది. సున్నా కాకుండా వేరే సంఖ్య రిటర్న్ అయితే ఎర్రర్ వచ్చినట్లు OS గుర్తిస్తుంది.
        </div>
      </div>

      <div style="background:var(--bg2); border:1px solid #10b981; border-radius:8px; padding:16px; margin:20px 0;">
        <h4 style="color:#10b981; margin:0 0 8px 0; font-size:14px;">⚠️ కాలేజీ మిత్: <code>void main()</code> ఎందుకు వాడకూడదు?</h4>
        <p style="font-size:13.5px; color:var(--text); margin:0; line-height:1.6;">
          చాలా పాత పుస్తకాలలో లేదా పాత Turbo C++ కంపైలర్లలో <code>void main()</code> రాస్తుంటారు. కానీ అంతర్జాతీయ C ప్రమాణాలైన <strong>C99, C11, C17, C23 Standards</strong> ప్రకారం <code>void main()</code> అనేది చెల్లని సింటాక్స్ (Undefined Behavior). ఆధునిక ఆపరేటింగ్ సిస్టమ్స్ ప్రోగ్రామ్ సక్సెస్ అయిందో లేదో తెలుసుకోవడానికి ఎగ్జిట్ స్టేటస్ కోడ్ ను ఆశిస్తాయి. కాబట్టి ఎల్లప్పుడూ <strong><code>int main()</code></strong> మాత్రమే రాయాలి.
        </p>
      </div>
    </div>

    <!-- SECTION 4 -->
    <div class="section-title"><span class="num">4</span>బిగినర్స్ చేసే ఘోరమైన తప్పులు (Beginner Pitfalls)</div>
    <div class="section-body">
      <div style="display:flex; flex-direction:column; gap:12px; margin:16px 0;">
        <div style="background:rgba(239, 68, 68, 0.08); border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px 18px;">
          <div style="font-weight:700; color:#ef4444; font-size:14px;">❌ 1. #include చివర సెమికోలన్ పెట్టడం:</div>
          <code style="font-size:13px; color:var(--text); display:block; margin:6px 0;">#include &lt;stdio.h&gt;; // తప్పు! Preprocessor డైరెక్టివ్‌లకు సెమికోలన్ ఉండదు</code>
          <span style="font-size:13px; color:var(--text2); display:block;">ప్రీప్రాసెసర్ డైరెక్టివ్‌లు C స్టేట్‌మెంట్లు కావు. కాబట్టి <code>#include</code> మరియు <code>#define</code> చివర ఎప్పుడూ సెమికోలన్ పెట్టకూడదు.</span>
        </div>

        <div style="background:rgba(239, 68, 68, 0.08); border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px 18px;">
          <div style="font-weight:700; color:#ef4444; font-size:14px;">❌ 2. కేస్-సెన్సిటివిటీ మర్చిపోవడం:</div>
          <code style="font-size:13px; color:var(--text); display:block; margin:6px 0;">Printf("Hello"); // తప్పు! C లో అన్ని కీవర్డ్లు స్మాల్ లెటర్సే</code>
          <span style="font-size:13px; color:var(--text2); display:block;">C లాంగ్వేజ్ కచ్చితమైన Case-Sensitive. <code>printf</code> ని <code>Printf</code> అని రాస్తే లింకర్ undefined reference ఎర్రర్ ఇస్తుంది.</span>
        </div>

        <div style="background:rgba(239, 68, 68, 0.08); border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px 18px;">
          <div style="font-weight:700; color:#ef4444; font-size:14px;">❌ 3. స్ట్రింగ్స్‌కి సింగిల్ కోట్స్ వాడడం:</div>
          <code style="font-size:13px; color:var(--text); display:block; margin:6px 0;">printf('Hello'); // తప్పు! സിంగిల్ కోట్స్ కేవలం ఒక క్యారెక్టర్ ('A') కి మాత్రమే</code>
          <span style="font-size:13px; color:var(--text2); display:block;">స్ట్రింగ్స్ (పదాలు, వాక్యాలు) ఎల్లప్పుడూ డబుల్ కోట్స్ <code>"..."</code> లోనే ఉండాలి. సింగిల్ కోట్స్ <code>'...'</code> కేవలం సింగిల్ క్యారెక్టర్ కోసమే.</span>
        </div>
      </div>
    </div>

    <!-- SECTION 5 -->
    <div class="section-title"><span class="num">5</span>తరచుగా అడిగే ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div style="display:flex; flex-direction:column; gap:12px; margin-top:16px;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px;">
          <h4 style="color:#10b981; margin:0 0 6px 0; font-size:14.5px;">Q: C నేర్చుకోవడానికి ముందు మరేదైనా ప్రోగ్రామింగ్ లాంగ్వేజ్ వచ్చి ఉండాలా?</h4>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.6;">
            అస్సలు అవసరం లేదు! C లాంగ్వేజ్ కంప్యూటర్ ఆర్కిటెక్చర్, మెమరీ మరియు ప్రాసెసర్ పనిచేసే విధానాన్ని అర్థం చేసుకోవడానికి ప్రపంచవ్యాప్తంగా ఉత్తమ మొదటి ప్రోగ్రామింగ్ భాషగా గుర్తించబడింది. C నేర్చుకుంటే C++, Java, C#, Go, Rust చాలా సులువుగా అర్థమవుతాయి.
          </p>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px;">
          <h4 style="color:#10b981; margin:0 0 6px 0; font-size:14.5px;">Q: return 0 కాకుండా return 1 ఇస్తే ఏమవుతుంది?</h4>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.6;">
            ప్రోగ్రామ్ అవుట్‌పుట్ స్క్రీన్ పై కనిపిస్తుంది కానీ ఆపరేటింగ్ సిస్టమ్‌కి లేదా కాల్ చేసిన పేరెంట్ ప్రాసెస్‌కు ప్రోగ్రామ్‌లో ఏదో లోపం జరిగి అసాధారణంగా ఆగిపోయిందని (Non-zero exit status indicates failure) సంకేతం అందుతుంది.
          </p>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px;">
          <h4 style="color:#10b981; margin:0 0 6px 0; font-size:14.5px;">Q: Turbo C++ బదులుగా ఆధునిక GCC / Clang ఎందుకు వాడాలి?</h4>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.6;">
            Turbo C++ అనేది 1990ల నాటి 16-బిట్ డాస్ (DOS) ఎన్విరాన్‌మెంట్ కంపైలర్. ఇది పాతబడింది మరియు ఆధునిక 64-బిట్ ప్రాసెసర్ల ఫీచర్లను (C99/C11 స్టాండర్డ్స్) సపోర్ట్ చేయదు. GCC మరియు Clang నేటి ఇండస్ట్రీ ప్రమాణాలు.
          </p>
        </div>
      </div>
    </div>
  `,

  // -------------------------------------------------------------
  // CHAPTER 2: VARIABLES, DATA TYPES & CONSTANTS
  // -------------------------------------------------------------
  2: `
    <div class="intro-box">
      కంప్యూటర్ ప్రోగ్రామింగ్ అంటే వాస్తవానికి మెమరీ (RAM) లోని బైట్లను చదవడం, లెక్కించడం మరియు తిరిగి నిల్వ చేయడమే. ఈ అధ్యాయంలో C లాంగ్వేజ్ RAM ను ఎలా కేటాయిస్తుంది (Memory Cells & Addresses), ఫండమెంటల్ డేటా టైప్స్, <code>sizeof</code> ఆపరేటర్, <code>const</code> vs <code>#define</code> మరియు సైన్డ్ ఓవర్‌ఫ్లో ప్రమాదాలను లోతుగా నేర్చుకుందాం.
    </div>

    <!-- SECTION 1 -->
    <div class="section-title"><span class="num">1</span>వేరియబుల్స్ & RAM మెమరీ లేఅవుట్</div>
    <div class="section-body">
      <p>
        <strong>వేరియబుల్ (Variable)</strong> అంటే మెమరీ (RAM) లోని ఒక నిర్దిష్ట స్థానానికి మనం పెట్టే పేరు. కంప్యూటర్ అంతర్గతంగా మెమరీని హెక్సాడెసిమల్ అడ్రస్‌లతో (ఉదాహరణకు <code>0x7ffee4a10</code>) గుర్తిస్తుంది. మనుషులు ప్రతిసారీ ఈ అడ్రస్‌లను గుర్తుపెట్టుకోవడం అసాధ్యం కాబట్టి C మనకు వేరియబుల్స్ అనే సౌకర్యాన్ని కల్పిస్తుంది.
      </p>

      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:16px; margin:20px 0;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px;">
          <div style="font-weight:700; color:#10b981; margin-bottom:6px; font-size:14px;">1. డిక్లరేషన్ (Declaration):</div>
          <code style="font-size:13px; color:var(--text); display:block; background:var(--bg3); padding:6px 10px; border-radius:4px; margin-bottom:8px;">int age;</code>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.5;">కంపైలర్‌కు "నాకు మెమరీలో 4 బైట్ల పూర్ణాంక స్థలాన్ని కేటాయించు, దాని పేరు age" అని చెప్పడం.</p>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px;">
          <div style="font-weight:700; color:#10b981; margin-bottom:6px; font-size:14px;">2. ఇనీషియలైజేషన్ (Initialization):</div>
          <code style="font-size:13px; color:var(--text); display:block; background:var(--bg3); padding:6px 10px; border-radius:4px; margin-bottom:8px;">age = 25;</code>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.5;">ఆ కేటాయించబడిన 4 బైట్ల RAM గదిలో <code>25</code> అనే బైనరీ విలువను నిల్వ చేయడం.</p>
        </div>
      </div>

      <div style="background:rgba(245, 158, 11, 0.08); border-left:4px solid #f59e0b; border-radius:0 8px 8px 0; padding:14px 18px; margin:16px 0;">
        <strong style="color:#d97706; font-size:14px;">⚠️ గార్బేజ్ వాల్యూస్ (Garbage Values) ప్రమాదం:</strong>
        <p style="font-size:13px; color:var(--text); margin:6px 0 0 0; line-height:1.6;">
          C లో ఒక వేరియబుల్‌ను కేవలం డిక్లేర్ చేసి (<code>int score;</code>) దానికి విలువ ఇవ్వకపోతే, C దానిని డీఫాల్ట్‌గా 0 చేయదు! గతంలో వేరే ఏదో ప్రోగ్రామ్ RAM లో వదిలేసిన పాత విలువ (Garbage Data) అలాగే ఉంటుంది. అందుకే ఎల్లప్పుడూ వేరియబుల్స్ ను ఇనీషియలైజ్ చేయాలి.
        </p>
      </div>
    </div>

    <!-- SECTION 2 -->
    <div class="section-title"><span class="num">2</span>C ఫండమెంటల్ డేటా టైప్స్ (Data Types Matrix)</div>
    <div class="section-body">
      <p>
        ఆధునిక 64-బిట్ ఆర్కిటెక్చర్‌లలో (GCC/Clang) డేటా టైప్స్ యొక్క పరిమాణాలు మరియు వాటి పరిధుల పట్టిక:
      </p>

      <div style="overflow-x:auto; margin:16px 0;">
        <table style="width:100%; border-collapse:collapse; font-size:13.5px; text-align:left;">
          <thead>
            <tr style="background:var(--bg3); border-bottom:2px solid var(--border);">
              <th style="padding:10px 14px; color:var(--text);">డేటా టైప్</th>
              <th style="padding:10px 14px; color:var(--text);">మెమరీ సైజ్</th>
              <th style="padding:10px 14px; color:var(--text);">ఫార్మాట్ స్పెసిఫైయర్</th>
              <th style="padding:10px 14px; color:var(--text);">విలువ పరిధి (Range)</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom:1px solid var(--border);">
              <td style="padding:10px 14px; font-weight:700; color:#10b981;">char</td>
              <td style="padding:10px 14px;">1 Byte (8 bits)</td>
              <td style="padding:10px 14px;"><code>%c</code></td>
              <td style="padding:10px 14px;">-128 నుండి 127 (లేదా 0 నుండి 255)</td>
            </tr>
            <tr style="border-bottom:1px solid var(--border);">
              <td style="padding:10px 14px; font-weight:700; color:#10b981;">short</td>
              <td style="padding:10px 14px;">2 Bytes (16 bits)</td>
              <td style="padding:10px 14px;"><code>%hd</code></td>
              <td style="padding:10px 14px;">-32,768 నుండి 32,767</td>
            </tr>
            <tr style="border-bottom:1px solid var(--border);">
              <td style="padding:10px 14px; font-weight:700; color:#10b981;">int</td>
              <td style="padding:10px 14px;">4 Bytes (32 bits)</td>
              <td style="padding:10px 14px;"><code>%d</code> లేదా <code>%i</code></td>
              <td style="padding:10px 14px;">-2,147,483,648 నుండి 2,147,483,647</td>
            </tr>
            <tr style="border-bottom:1px solid var(--border);">
              <td style="padding:10px 14px; font-weight:700; color:#10b981;">unsigned int</td>
              <td style="padding:10px 14px;">4 Bytes (32 bits)</td>
              <td style="padding:10px 14px;"><code>%u</code></td>
              <td style="padding:10px 14px;">0 నుండి 4,294,967,295</td>
            </tr>
            <tr style="border-bottom:1px solid var(--border);">
              <td style="padding:10px 14px; font-weight:700; color:#10b981;">long long</td>
              <td style="padding:10px 14px;">8 Bytes (64 bits)</td>
              <td style="padding:10px 14px;"><code>%lld</code></td>
              <td style="padding:10px 14px;">≈ -9.22 × 10<sup>18</sup> నుండి +9.22 × 10<sup>18</sup></td>
            </tr>
            <tr style="border-bottom:1px solid var(--border);">
              <td style="padding:10px 14px; font-weight:700; color:#10b981;">float</td>
              <td style="padding:10px 14px;">4 Bytes (32 bits)</td>
              <td style="padding:10px 14px;"><code>%f</code></td>
              <td style="padding:10px 14px;">6-7 దశాంశ అంకెల ఖచ్చితత్వం</td>
            </tr>
            <tr>
              <td style="padding:10px 14px; font-weight:700; color:#10b981;">double</td>
              <td style="padding:10px 14px;">8 Bytes (64 bits)</td>
              <td style="padding:10px 14px;"><code>%lf</code></td>
              <td style="padding:10px 14px;">15-17 దశాంశ అంకెల అత్యున్నత ఖచ్చితత్వం</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- SECTION 3 -->
    <div class="section-title"><span class="num">3</span>sizeof ఆపరేటర్: లైవ్ మెమరీ తనిఖీ</div>
    <div class="section-body">
      <p>
        ఏదైనా వేరియబుల్ లేదా డేటా టైప్ మెమరీలో ఎన్ని బైట్లు ఆక్రమించిందో తెలుసుకోవడానికి <strong>sizeof</strong> ఆపరేటర్ వాడతాం. ఇది ఫంక్షన్ కాదు, కంపైల్-టైమ్ ఆపరేటర్.
      </p>

      <div class="code-block" style="margin:16px 0;">
        <div class="code-block-header">
          <span class="lang-tag">C — sizeof operator demo</span>
          <a class="try-btn" href="/online-c-compiler.html">⚡ Try in C Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main(void) {
    int a = 100;
    double pi = 3.14159265;

    printf("Size of char   : %zu byte\\n", sizeof(char));
    printf("Size of int    : %zu bytes\\n", sizeof(a));
    printf("Size of double : %zu bytes\\n", sizeof(pi));
    return 0;
}</code></pre>
      </div>

      <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px 18px; margin:16px 0; font-size:13px; color:var(--text2);">
        💡 <strong>గమనిక:</strong> C లో <code>sizeof</code> రిటర్న్ చేసే విలువ <code>size_t</code> టైప్ (unsigned integer). కాబట్టి ఆధునిక C ప్రమాణాల ప్రకారం దీనిని ప్రింట్ చేయడానికి <strong>%zu</strong> ఫార్మాట్ స్పెసిఫైయర్ వాడాలి.
      </div>
    </div>

    <!-- SECTION 4 -->
    <div class="section-title"><span class="num">4</span>కాన్‌స్టాంట్స్: const vs #define</div>
    <div class="section-body">
      <p>
        ప్రోగ్రామ్ రన్ అవుతున్నంత సేపు మారకూడని విలువలను (ఉదా: గణిత స్థిరాంకం PI, గరిష్ట పరిమితి MAX_USERS) స్థిరంగా ఉంచడానికి C లో రెండు పద్ధతులు ఉన్నాయి:
      </p>

      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:16px; margin:16px 0;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px;">
          <h4 style="color:#10b981; margin:0 0 8px 0; font-size:14px;">1. const కీవర్డ్ (సిఫార్సు చేయబడినది):</h4>
          <code style="font-size:12.5px; color:var(--text); display:block; background:var(--bg3); padding:8px; border-radius:4px; margin-bottom:8px;">const float PI = 3.14159f;<br>// PI = 3.15; // Compiler Error!</code>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.5;">ఇది టైప్-సేఫ్ (Type-safe). కంపైలర్ టైప్ చెకింగ్ చేస్తుంది మరియు డీబగ్గర్‌లో వేరియబుల్ పేరు కనిపిస్తుంది.</p>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px;">
          <h4 style="color:#10b981; margin:0 0 8px 0; font-size:14px;">2. #define మ్యాక్రో (పాత పద్ధతి):</h4>
          <code style="font-size:12.5px; color:var(--text); display:block; background:var(--bg3); padding:8px; border-radius:4px; margin-bottom:8px;">#define MAX_USERS 100</code>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.5;">ఇది ప్రీప్రాసెసర్ టెక్స్ట్ రీప్లేస్‌మెంట్ మాత్రమే. దీనికి మెమరీ లేదా డేటా టైప్ ఉండదు. ఆధునిక C కోడ్‌లో <code>const</code> వాడటమే శ్రేయస్కరం.</p>
        </div>
      </div>
    </div>

    <!-- SECTION 5 -->
    <div class="section-title"><span class="num">5</span>బిగినర్స్ చేసే ఘోరమైన తప్పులు (Beginner Pitfalls)</div>
    <div class="section-body">
      <div style="display:flex; flex-direction:column; gap:12px; margin:16px 0;">
        <div style="background:rgba(239, 68, 68, 0.08); border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px 18px;">
          <div style="font-weight:700; color:#ef4444; font-size:14px;">❌ 1. అరిథ్‌మెటిక్ ఓవర్‌ఫ్లో (Arithmetic Overflow):</div>
          <code style="font-size:13px; color:var(--text); display:block; margin:6px 0;">int max = 2147483647; max = max + 1; // ఇక్కడ max విలువ -2147483648 అవుతుంది!</code>
          <span style="font-size:13px; color:var(--text2); display:block;">32-బిట్ సైన్డ్ ఇంటిజర్ గరిష్ట పరిమితికి 1 కలిపితే 2's Complement సైకిల్ ప్రకారం నెగటివ్ విలువగా మారుతుంది. దీనిని ఇంటిజర్ ఓవర్‌ఫ్లో అంటారు.</span>
        </div>

        <div style="background:rgba(239, 68, 68, 0.08); border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px 18px;">
          <div style="font-weight:700; color:#ef4444; font-size:14px;">❌ 2. వేరియబుల్ పేర్లలో నిబంధనలు ఉల్లంఘించడం:</div>
          <code style="font-size:13px; color:var(--text); display:block; margin:6px 0;">int 2rollNumber; // తప్పు! వేరియబుల్ పేరు నంబర్‌తో ప్రారంభం కారాదు</code>
          <span style="font-size:13px; color:var(--text2); display:block;">వేరియబుల్ పేరు కేవలం అక్షరాలు (A-Z, a-z), అండర్‌స్కోర్ (<code>_</code>) తో మాత్రమే ప్రారంభం కావాలి. కీవర్డ్లను (ఉదా: <code>int</code>, <code>return</code>) పేర్లుగా వాడరాదు.</span>
        </div>
      </div>
    </div>

    <!-- SECTION 6 -->
    <div class="section-title"><span class="num">6</span>తరచుగా అడిగే ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div style="display:flex; flex-direction:column; gap:12px; margin-top:16px;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px;">
          <h4 style="color:#10b981; margin:0 0 6px 0; font-size:14.5px;">Q: float మరియు double మధ్య ప్రధాన తేడా ఏమిటి? దేనిని ఎప్పుడు వాడాలి?</h4>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.6;">
            <code>float</code> కేవలం 4 బైట్లు మాత్రమే తీసుకుంటుంది మరియు 7 అంకెల ఖచ్చితత్వం ఇస్తుంది. <code>double</code> 8 బైట్లు తీసుకుని 15-17 అంకెల ఖచ్చితత్వం ఇస్తుంది. బ్యాంకింగ్, సైంటిఫిక్ కాలిక్యులేషన్స్‌లో ఖచ్చితత్వం కోసం ఎల్లప్పుడూ <strong>double</strong> వాడటమే ఆధునిక ప్రమాణం.
          </p>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px;">
          <h4 style="color:#10b981; margin:0 0 6px 0; font-size:14.5px;">Q: 32-bit OS లో int 4 బైట్లు ఉంటే, 64-bit OS లో 8 బైట్లు అవుతుందా?</h4>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.6;">
            లేదు! ఎక్కువమంది పొరబడే విషయమిది. ఆధునిక x86_64 సిస్టమ్స్‌లో (LP64 డేటా మోడల్) <code>int</code> ఎల్లప్పుడూ <strong>4 బైట్లే</strong> ఉంటుంది. పాయింటర్లు మరియు <code>long</code> మాత్రమే 8 బైట్లు అవుతాయి.
          </p>
        </div>
      </div>
    </div>
  `,

  // -------------------------------------------------------------
  // CHAPTER 3: USER INPUT SCANF, FORMAT SPECIFIERS & BUFFER TRAPS
  // -------------------------------------------------------------
  3: `
    <div class="intro-box">
      కంప్యూటర్ ప్రోగ్రామ్‌లు నిజమైన ప్రయోజనాన్ని ఇవ్వాలంటే అవి యూజర్ ఇచ్చే డేటాను డైనమిక్‌గా స్వీకరించగలగాలి. C లో కీబోర్డ్ ఇన్‌పుట్ తీసుకోవడానికి ప్రాథమిక సాధనం <strong>scanf()</strong>. అయితే బిగినర్స్ చేసే అత్యంత తీవ్రమైన పొరపాట్లైన మెమరీ అడ్రస్ <code>&amp;</code> మర్చిపోవడం, <strong>న్యూలైన్ బఫర్ ట్రాప్ (Ghost Newline)</strong>, మరియు ప్రమాదకరమైన బఫర్ ఓవర్‌ఫ్లోలను నివారించే పద్ధతులను ఈ అధ్యాయంలో లోతుగా తెలుసుకుందాం.
    </div>

    <!-- SECTION 1 -->
    <div class="section-title"><span class="num">1</span>scanf() అంతర్గత పనితీరు (& ఆపరేటర్ ప్రాముఖ్యత)</div>
    <div class="section-body">
      <p>
        <code>printf()</code> ఫంక్షన్ విలువను స్క్రీన్‌పై ముద్రించడానికి కేవలం ఆ వేరియబుల్ విలువ యొక్క నకలును (Copy of value) తీసుకుంటే సరిపోతుంది. కానీ <code>scanf()</code> వినియోగదారుడు టైప్ చేసిన డేటాను నేరుగా RAM లోని ఆ వేరియబుల్ గదిలో భద్రపరచాలి.
      </p>

      <div style="background:var(--bg2); border-left:4px solid #10b981; border-radius:0 8px 8px 0; padding:16px; margin:16px 0;">
        <strong style="color:#10b981; font-size:14.5px;">🔑 & (Address-of Operator) ఎందుకు తప్పనిసరి?</strong>
        <p style="font-size:13.5px; color:var(--text); margin:6px 0 0 0; line-height:1.6;">
          <code>&amp;age</code> అని రాసినప్పుడు అది <code>age</code> వేరియబుల్ యొక్క వాస్తవ మెమరీ చిరునామాను (RAM Hex Address, e.g. <code>0x7ffee4</code>) కంపైలర్‌కు అందిస్తుంది. ఒకవేళ <code>&amp;</code> పెట్టడం మర్చిపోతే, <code>scanf</code> ఆ వేరియబుల్ లోని గార్బేజ్ నంబర్‌నే మెమరీ అడ్రస్‌గా భావించి అక్కడ డేటా రాయడానికి ప్రయత్నిస్తుంది. ఫలితంగా ఆపరేటింగ్ సిస్టమ్ ప్రోగ్రామ్‌ను వెంటనే చంపేస్తుంది (<strong>Segmentation Fault / Crash</strong>).
        </p>
      </div>

      <div class="code-block" style="margin:16px 0;">
        <div class="code-block-header">
          <span class="lang-tag">C — scanf user input</span>
          <a class="try-btn" href="/online-c-compiler.html">⚡ Try in C Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main(void) {
    int rollNumber;
    float marks;

    printf("మీ రోల్ నంబర్ మరియు మార్కులు ఎంటర్ చేయండి: ");
    // రెండు విలువలను ఒకేసారి చదవడం
    scanf("%d %f", &rollNumber, &marks);

    printf("రోల్ నంబర్: %d | మార్కులు: %.2f\\n", rollNumber, marks);
    return 0;
}</code></pre>
      </div>
    </div>

    <!-- SECTION 2 -->
    <div class="section-title"><span class="num">2</span>C ఫార్మాట్ స్పెసిఫైయర్స్ కాంప్రహెన్సివ్ టేబుల్</div>
    <div class="section-body">
      <p>
        <code>scanf()</code> మరియు <code>printf()</code> లలో డేటా టైప్‌ను సూచించడానికి ఉపయోగించే ఫార్మాట్ స్పెసిఫైయర్స్ పట్టిక:
      </p>

      <div style="overflow-x:auto; margin:16px 0;">
        <table style="width:100%; border-collapse:collapse; font-size:13px; text-align:left;">
          <thead>
            <tr style="background:var(--bg3); border-bottom:2px solid var(--border);">
              <th style="padding:10px 14px; color:var(--text);">స్పెసిఫైయర్</th>
              <th style="padding:10px 14px; color:var(--text);">డేటా రకం</th>
              <th style="padding:10px 14px; color:var(--text);">ఉదాహరణ ఇన్‌పుట్</th>
              <th style="padding:10px 14px; color:var(--text);">ప్రాముఖ్యత</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom:1px solid var(--border);">
              <td style="padding:9px 14px; font-weight:700; color:#10b981;">%d / %i</td>
              <td style="padding:9px 14px;">Signed int</td>
              <td style="padding:9px 14px;"><code>42</code>, <code>-10</code></td>
              <td style="padding:9px 14px;">సాధారణ పూర్ణాంకాలు చదవడానికి</td>
            </tr>
            <tr style="border-bottom:1px solid var(--border);">
              <td style="padding:9px 14px; font-weight:700; color:#10b981;">%u</td>
              <td style="padding:9px 14px;">Unsigned int</td>
              <td style="padding:9px 14px;"><code>50000</code></td>
              <td style="padding:9px 14px;">ధన పూర్ణాంకాలు మాత్రమే</td>
            </tr>
            <tr style="border-bottom:1px solid var(--border);">
              <td style="padding:9px 14px; font-weight:700; color:#10b981;">%f</td>
              <td style="padding:9px 14px;">float</td>
              <td style="padding:9px 14px;"><code>3.14</code></td>
              <td style="padding:9px 14px;">దశాంశ సంఖ్యలు</td>
            </tr>
            <tr style="border-bottom:1px solid var(--border);">
              <td style="padding:9px 14px; font-weight:700; color:#10b981;">%lf</td>
              <td style="padding:9px 14px;">double</td>
              <td style="padding:9px 14px;"><code>3.14159265</code></td>
              <td style="padding:9px 14px;">డబుల్ ప్రెసిషన్ ఫ్లోటింగ్ పాయింట్</td>
            </tr>
            <tr style="border-bottom:1px solid var(--border);">
              <td style="padding:9px 14px; font-weight:700; color:#10b981;">%c</td>
              <td style="padding:9px 14px;">char</td>
              <td style="padding:9px 14px;"><code>'A'</code>, <code>'#'</code></td>
              <td style="padding:9px 14px;">ఏకైక క్యారెక్టర్ (స్పేస్, న్యూలైన్ సహా)</td>
            </tr>
            <tr style="border-bottom:1px solid var(--border);">
              <td style="padding:9px 14px; font-weight:700; color:#10b981;">%s</td>
              <td style="padding:9px 14px;">char array (string)</td>
              <td style="padding:9px 14px;"><code>"Dennis"</code></td>
              <td style="padding:9px 14px;">స్పేస్ వచ్చేంత వరకు ఒక పదాన్ని చదువుతుంది</td>
            </tr>
            <tr>
              <td style="padding:9px 14px; font-weight:700; color:#10b981;">%p</td>
              <td style="padding:9px 14px;">Pointer (address)</td>
              <td style="padding:9px 14px;"><code>0x7ffe42</code></td>
              <td style="padding:9px 14px;">హెక్సాడెసిమల్ మెమరీ అడ్రస్ ప్రింట్ చేయడానికి</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- SECTION 3 -->
    <div class="section-title"><span class="num">3</span>ది మోస్ట్ ఫేమస్ C బగ్: scanf న్యూలైన్ బఫర్ ట్రాప్!</div>
    <div class="section-body">
      <p>
        ప్రతి C విద్యార్థిని లేదా డెవలపర్‌ను తీవ్రంగా వేధించే ఒక మిస్టీరియస్ సమస్య: ఒక నంబర్‌ను ఇన్‌పుట్ తీసుకున్న వెంటనే క్యారెక్టర్ (<code>%c</code>) ను ఇన్‌పుట్ తీసుకోవడానికి ప్రయత్నిస్తే, ప్రోగ్రామ్ యూజర్ కోసం ఆగకుండా ఆటోమేటిక్‌గా స్కిప్ అయిపోతుంది!
      </p>

      <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px; margin:16px 0;">
        <h4 style="color:#ef4444; margin:0 0 8px 0; font-size:14.5px;">🕵️‍♂️ అసలేం జరుగుతోంది? (The Buffer Mechanics):</h4>
        <ol style="margin:0; padding-left:20px; font-size:13.5px; color:var(--text); line-height:1.7;">
          <li>మీరు నంబర్ <code>25</code> అని టైప్ చేసి కీబోర్డ్ పై <strong>Enter</strong> కీ ప్రెస్ చేస్తారు.</li>
          <li>స్టాండర్డ్ ఇన్‌పుట్ బఫర్ (<code>stdin</code>) లోకి <code>'2'</code>, <code>'5'</code>, మరియు <code>'\\n'</code> (Newline క్యారెక్టర్) వెళ్తాయి.</li>
          <li><code>scanf("%d", &amp;age)</code> కేవలం <code>25</code> ను మాత్రమే చదివి, ఆ ఎంటర్‌ను (<code>'\\n'</code>) బఫర్‌లోనే వదిలేస్తుంది!</li>
          <li>వెంటనే తర్వాతి లైన్‌లోని <code>scanf("%c", &amp;grade)</code> రన్ అయినప్పుడు, అది బఫర్‌లో ఇప్పటికే పడి ఉన్న <code>'\\n'</code> ను చదివేసి క్యారెక్టర్‌గా భావిస్తుంది. దాంతో యూజర్ కీబోర్డ్ టైప్ చేయడానికి ముందే ఖాళీగా ఎగ్జిట్ అయిపోతుంది!</li>
        </ol>
      </div>

      <div style="background:var(--bg2); border:1px solid #10b981; border-radius:8px; padding:16px; margin:16px 0;">
        <h4 style="color:#10b981; margin:0 0 8px 0; font-size:14.5px;">✅ ది అఫీషియల్ సొల్యూషన్ (The Leading Space Trick):</h4>
        <p style="font-size:13px; color:var(--text); margin:0 0 8px 0; line-height:1.6;">
          <code>%c</code> కి ముందు ఒక సింగిల్ స్పేస్ ఇవ్వండి: <strong><code>scanf(" %c", &amp;grade);</code></strong>
        </p>
        <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.6;">
          ఫార్మాట్ స్ట్రింగ్‌లో ముందు స్పేస్ ఇవ్వడం ద్వారా C కంపైలర్ బఫర్‌లో నిల్వ ఉన్న అన్ని వైట్‌స్పేస్‌లను, న్యూలైన్లను (<code>'\\n'</code>) స్వయంచాలకంగా విస్మరించి, యూజర్ ఇచ్చే తాజా అక్షరం కోసం ఎదురుచూస్తుంది!
        </p>
      </div>
    </div>

    <!-- SECTION 4 -->
    <div class="section-title"><span class="num">4</span>స్పేస్‌లతో కూడిన స్ట్రింగ్స్ చదవడం: fgets() vs scanf()</div>
    <div class="section-body">
      <p>
        ఒక పూర్తి పేరును (ఉదాహరణకు <code>Dennis Ritchie</code>) <code>scanf("%s", name)</code> తో చదివితే అది కేవలం <code>Dennis</code> ను మాత్రమే తీసుకుంటుంది. ఎందుకంటే స్పేస్ రాగానే <code>scanf</code> ఆగిపోతుంది. దీనికి పరిష్కారం <strong>fgets()</strong>.
      </p>

      <div class="code-block" style="margin:16px 0;">
        <div class="code-block-header">
          <span class="lang-tag">C — Safe string input with fgets</span>
          <a class="try-btn" href="/online-c-compiler.html">⚡ Try in C Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main(void) {
    char fullName[50];

    printf("మీ పూర్తి పేరు నమోదు చేయండి: ");
    // గరిష్టంగా 50 బైట్లు మాత్రమే చదువుతుంది — సురక్షితమైనది!
    fgets(fullName, sizeof(fullName), stdin);

    printf("స్వాగతం, %s", fullName);
    return 0;
}</code></pre>
      </div>

      <div style="background:rgba(239, 68, 68, 0.08); border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px 18px; margin:16px 0;">
        <strong style="color:#ef4444; font-size:14px;">🚫 gets() ఫంక్షన్‌ను ఎందుకు నిషేధించారు?</strong>
        <p style="font-size:13px; color:var(--text); margin:6px 0 0 0; line-height:1.6;">
          పాత C పుస్తకాలలో <code>gets(str)</code> కనిపిస్తుంది. కానీ <code>gets()</code> యూజర్ ఎన్ని అక్షరాలు టైప్ చేసినా పరిమితి లేకుండా మెమరీలోకి రాసేస్తుంది (Buffer Overflow Vulnerability). ఇది హ్యాకర్లకు కంప్యూటర్‌ను హైజాక్ చేసే వెసులుబాటు కల్పించింది. అందుకే <strong>C11 Standard నుండి gets() ఫంక్షన్‌ను శాశ్వతంగా తొలగించారు</strong>. ఎల్లప్పుడూ కేవలం <strong>fgets()</strong> మాత్రమే వాడాలి.
        </p>
      </div>
    </div>

    <!-- SECTION 5 -->
    <div class="section-title"><span class="num">5</span>బిగినర్స్ చేసే ఘోరమైన తప్పులు (Beginner Pitfalls)</div>
    <div class="section-body">
      <div style="display:flex; flex-direction:column; gap:12px; margin:16px 0;">
        <div style="background:rgba(239, 68, 68, 0.08); border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px 18px;">
          <div style="font-weight:700; color:#ef4444; font-size:14px;">❌ 1. scanf లో \n పెట్టడం:</div>
          <code style="font-size:13px; color:var(--text); display:block; margin:6px 0;">scanf("%d\\n", &amp;num); // ఘోరమైన తప్పు!</code>
          <span style="font-size:13px; color:var(--text2); display:block;"><code>scanf</code> ఫార్మాట్ స్ట్రింగ్ లోపల <code>\\n</code> పెడితే, మీరు ఏదైనా వైట్‌స్పేస్ కాని అక్షరాన్ని టైప్ చేసేంత వరకు ప్రోగ్రామ్ ఆగకుండా హ్యాంగ్ అయినట్లు ఉండిపోతుంది!</span>
        </div>

        <div style="background:rgba(239, 68, 68, 0.08); border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px 18px;">
          <div style="font-weight:700; color:#ef4444; font-size:14px;">❌ 2. స్ట్రింగ్స్ (char arrays) కి & వాడడం:</div>
          <code style="font-size:13px; color:var(--text); display:block; margin:6px 0;">char name[20]; scanf("%s", &amp;name); // & అనవసరం</code>
          <span style="font-size:13px; color:var(--text2); display:block;">C లో అర్రే పేరు (Array decay) ఇప్పటికే దాని మొదటి ఎలిమెంట్ యొక్క మెమరీ అడ్రస్ పాయింటర్ అవుతుంది. కాబట్టి <code>scanf("%s", name)</code> అని రాయడమే సరైనది.</span>
        </div>
      </div>
    </div>

    <!-- SECTION 6 -->
    <div class="section-title"><span class="num">6</span>తరచుగా అడిగే ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div style="display:flex; flex-direction:column; gap:12px; margin-top:16px;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px;">
          <h4 style="color:#10b981; margin:0 0 6px 0; font-size:14.5px;">Q: scanf ఎన్ని ఇన్‌పుట్‌లను సరిగ్గా చదివిందో ప్రోగ్రామ్‌లో ఎలా తెలుసుకోవచ్చు?</h4>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.6;">
            <code>scanf()</code> ఫంక్షన్ తాను విజయవంతంగా రీడ్ చేసిన వేరియబుల్స్ సంఖ్యను రిటర్న్ చేస్తుంది! ఉదాహరణకు <code>if (scanf("%d", &amp;num) != 1)</code> అని రాస్తే యూజర్ నంబర్ బదులు అక్షరం టైప్ చేశాడని గుర్తించి ఇన్‌పుట్ వాలిడేషన్ చేయవచ్చు.
          </p>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px;">
          <h4 style="color:#10b981; margin:0 0 6px 0; font-size:14.5px;">Q: fflush(stdin) వాడి బఫర్ క్లియర్ చేయవచ్చా?</h4>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.6;">
            చేయకూడదు! C ISO స్టాండర్డ్ ప్రకారం <code>fflush()</code> కేవలం అవుట్‌పుట్ స్ట్రీమ్‌ల (<code>stdout</code>) కోసమే. ఇన్‌పుట్ స్ట్రీమ్ (<code>stdin</code>) పై <code>fflush</code> వాడటం <strong>Undefined Behavior</strong> — ఇది విండోస్‌లో పనిచేసినా లైనక్స్ లేదా మాక్‌లో పనిచేయదు. <code>scanf(" %c")</code> వాడటమే సరైన ప్రమాణం.
          </p>
        </div>
      </div>
    </div>
  `,

  // -------------------------------------------------------------
  // CHAPTER 4: OPERATORS, EXPRESSIONS & PRECEDENCE
  // -------------------------------------------------------------
  4: `
    <div class="intro-box">
      వేరియబుల్స్‌పై లెక్కలు చేయడానికి, పరిస్థితులను సరిపోల్చడానికి మరియు కంప్యూటర్ బిట్లను మార్చడానికి <strong>ఆపరేటర్లు (Operators)</strong> ప్రాణాధారం. ఇంటర్వ్యూలలో ఎక్కువగా అడిగే <code>++i</code> vs <code>i++</code> అంతర్గత అసెంబ్లీ తేడా, షార్ట్-సర్క్యూట్ మూలసూత్రం, బిట్‌వైజ్ ఆపరేటర్లు మరియు ప్రెసిడెన్స్ నియమాలను ఈ అధ్యాయంలో లోతుగా పరిశీలిద్దాం.
    </div>

    <!-- SECTION 1 -->
    <div class="section-title"><span class="num">1</span>Prefix (++i) vs Postfix (i++): అంతర్గత మెమరీ తేడా</div>
    <div class="section-body">
      <p>
        చాలామంది <code>++i</code> మరియు <code>i++</code> రెండూ ఒకే విధంగా వేరియబుల్ విలువను 1 పెంచుతాయని అనుకుంటారు. కానీ అవి ఎక్స్‌ప్రెషన్‌లో పాల్గొన్నప్పుడు CPU రిజిస్టర్లలో జరిగే ప్రక్రియ పూర్తిగా భిన్నం:
      </p>

      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:16px; margin:16px 0;">
        <div style="background:var(--bg2); border:1px solid #10b981; border-radius:8px; padding:16px;">
          <h4 style="color:#10b981; margin:0 0 6px 0; font-size:14.5px;">⚡ Prefix (++i): Increment Then Fetch</h4>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.6;">
            ముందుగా మెమరీలోని విలువను వెంటనే 1 పెంచుతుంది (Increment), ఆ తర్వాత ఆ తాజా నవీకరించబడిన విలువను ఎక్స్‌ప్రెషన్‌కు అందిస్తుంది.
          </p>
          <code style="font-size:12.5px; color:var(--text); display:block; background:var(--bg3); padding:8px; border-radius:4px; margin-top:8px;">int x = 5;<br>int y = ++x; // x = 6, y = 6</code>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px;">
          <h4 style="color:var(--text); margin:0 0 6px 0; font-size:14.5px;">⏳ Postfix (i++): Fetch Then Increment</h4>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.6;">
            పాత విలువను ఒక తాత్కాలిక కాపీగా దాచి ఎక్స్‌ప్రెషన్‌కు ఇచ్చేస్తుంది. ఆ తర్వాత మాత్రమే మెమరీలోని అసలు వేరియబుల్‌ను 1 పెంచుతుంది.
          </p>
          <code style="font-size:12.5px; color:var(--text); display:block; background:var(--bg3); padding:8px; border-radius:4px; margin-top:8px;">int x = 5;<br>int y = x++; // y = 5 (old copy), x = 6</code>
        </div>
      </div>
    </div>

    <!-- SECTION 2 -->
    <div class="section-title"><span class="num">2</span>Short-Circuit Evaluation: లాజికల్ సేఫ్టీ షీల్డ్</div>
    <div class="section-body">
      <p>
        C లాంగ్వేజ్ లాజికల్ ఆపరేటర్లైన <code>&amp;&amp;</code> (AND) మరియు <code>||</code> (OR) లలో <strong>షార్ట్-సర్క్యూట్ ఎవాల్యుయేషన్</strong> అనే అద్భుతమైన ఆప్టిమైజేషన్‌ను అనుసరిస్తుంది. మొదటి కండిషన్ ఫలితంతోనే మొత్తం సమాధానం ఖరారైపోతే, CPU రెండో కండిషన్‌ను అస్సలు టచ్ చేయదు!
      </p>

      <div style="background:var(--bg2); border-left:4px solid #10b981; border-radius:0 8px 8px 0; padding:16px; margin:16px 0;">
        <strong style="color:#10b981; font-size:14px;">🛡️ పాయింటర్ల రక్షణ కవచం (Real-World Safety Guard):</strong>
        <p style="font-size:13px; color:var(--text); margin:6px 0 0 0; line-height:1.6;">
          <code>if (ptr != NULL &amp;&amp; *ptr &gt; 0)</code><br>
          ఒకవేళ పాయింటర్ <code>ptr</code> శూన్యం (NULL) అయితే, ఎడమ వైపు కండిషన్ తప్పు (0) అవుతుంది. కాబట్టి C కంపైలర్ కుడివైపు ఉన్న <code>*ptr</code> ను యాక్సెస్ చేయడానికి ప్రయత్నించదు! ఒకవేళ షార్ట్-సర్క్యూట్ లేకపోతే NULL పాయింటర్‌ను డీరిఫరెన్స్ చేసి ఆపరేటింగ్ సిస్టమ్ ప్రోగ్రామ్‌ను వెంటనే క్రాష్ చేస్తుంది.
        </p>
      </div>
    </div>

    <!-- SECTION 3 -->
    <div class="section-title"><span class="num">3</span>బిట్‌వైజ్ ఆపరేటర్లు (Bitwise Operators & Hardware Control)</div>
    <div class="section-body">
      <p>
        ఎంబెడెడ్ సిస్టమ్స్ మరియు ఆపరేటింగ్ సిస్టమ్స్ ప్రోగ్రామింగ్‌లో మెమరీని మరియు హార్డ్‌వేర్ రిజిస్టర్లను సింగిల్ బిట్ స్థాయిలో నియంత్రించడానికి బిట్‌వైజ్ ఆపరేటర్లు వాడతారు:
      </p>

      <div style="overflow-x:auto; margin:16px 0;">
        <table style="width:100%; border-collapse:collapse; font-size:13px; text-align:left;">
          <thead>
            <tr style="background:var(--bg3); border-bottom:2px solid var(--border);">
              <th style="padding:10px 14px; color:var(--text);">ఆపరేటర్</th>
              <th style="padding:10px 14px; color:var(--text);">పేరు</th>
              <th style="padding:10px 14px; color:var(--text);">ఉదాహరణ (a=5, b=3)</th>
              <th style="padding:10px 14px; color:var(--text);">బైనరీ ఆపరేషన్</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom:1px solid var(--border);">
              <td style="padding:9px 14px; font-weight:700; color:#10b981;">&amp;</td>
              <td style="padding:9px 14px;">Bitwise AND</td>
              <td style="padding:9px 14px;"><code>5 &amp; 3 = 1</code></td>
              <td style="padding:9px 14px;">రెండూ 1 అయితేనే ఫలితం 1 (0101 &amp; 0011 = 0001)</td>
            </tr>
            <tr style="border-bottom:1px solid var(--border);">
              <td style="padding:9px 14px; font-weight:700; color:#10b981;">|</td>
              <td style="padding:9px 14px;">Bitwise OR</td>
              <td style="padding:9px 14px;"><code>5 | 3 = 7</code></td>
              <td style="padding:9px 14px;">ఏ ఒక్కటి 1 అయినా ఫలితం 1 (0101 | 0011 = 0111)</td>
            </tr>
            <tr style="border-bottom:1px solid var(--border);">
              <td style="padding:9px 14px; font-weight:700; color:#10b981;">^</td>
              <td style="padding:9px 14px;">Bitwise XOR</td>
              <td style="padding:9px 14px;"><code>5 ^ 3 = 6</code></td>
              <td style="padding:9px 14px;">బిట్లు వేర్వేరుగా ఉంటే 1, సమానమైతే 0</td>
            </tr>
            <tr style="border-bottom:1px solid var(--border);">
              <td style="padding:9px 14px; font-weight:700; color:#10b981;">&lt;&lt;</td>
              <td style="padding:9px 14px;">Left Shift</td>
              <td style="padding:9px 14px;"><code>5 &lt;&lt; 1 = 10</code></td>
              <td style="padding:9px 14px;">బిట్లను ఎడమవైపు జరుపుతుంది (2 తో గుణించడం సమానం)</td>
            </tr>
            <tr>
              <td style="padding:9px 14px; font-weight:700; color:#10b981;">&gt;&gt;</td>
              <td style="padding:9px 14px;">Right Shift</td>
              <td style="padding:9px 14px;"><code>5 &gt;&gt; 1 = 2</code></td>
              <td style="padding:9px 14px;">బిట్లను కుడివైపు జరుపుతుంది (2 తో భాగించడం సమానం)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- SECTION 4 -->
    <div class="section-title"><span class="num">4</span>ఇంటిజర్ డివిజన్ ట్రాప్ (5 / 2 = 2) & టైప్ కాస్టింగ్</div>
    <div class="section-body">
      <p>
        C లో రెండు పూర్ణాంకాలను భాగిస్తే (<code>5 / 2</code>) వచ్చే ఫలితం పూర్ణాంకం మాత్రమే అవుతుంది. దశాంశ భాగమైన <code>.5</code> ను C నిర్దాక్షిణ్యంగా తొలగిస్తుంది (Truncation towards zero).
      </p>

      <div class="code-block" style="margin:16px 0;">
        <div class="code-block-header">
          <span class="lang-tag">C — Type casting demo</span>
          <a class="try-btn" href="/online-c-compiler.html">⚡ Try in C Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main(void) {
    int a = 5, b = 2;

    float wrong = a / b;          // 5/2 = 2 -> 2.000000 (తప్పు!)
    float correct = (float)a / b; // ఎక్స్‌ప్లిసిట్ టైప్ కాస్టింగ్ -> 2.500000 (సరైనది!)

    printf("Wrong   : %f\\n", wrong);
    printf("Correct : %f\\n", correct);
    return 0;
}</code></pre>
      </div>
    </div>

    <!-- SECTION 5 -->
    <div class="section-title"><span class="num">5</span>ఆపరేటర్ ప్రాధాన్యతా క్రమం (Precedence Hierarchy)</div>
    <div class="section-body">
      <p>
        ఒక ఎక్స్‌ప్రెషన్‌లో బహుళ ఆపరేటర్లు ఉన్నప్పుడు ఏది ముందు లెక్కించబడుతుందో నిర్ణయించే ప్రాధాన్యతా క్రమం (Precedence Ladder):
      </p>

      <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px; margin:16px 0; font-size:13.5px; line-height:1.8;">
        <div style="display:flex; justify-content:space-between; border-bottom:1px solid var(--border); padding:6px 0;">
          <span style="font-weight:700; color:#10b981;">1. అత్యున్నత ప్రాధాన్యత:</span>
          <span>బ్రాకెట్లు <code>()</code>, అర్రే ఇండెక్స్ <code>[]</code>, మెంబర్ యాక్సెస్ <code>.</code>, <code>-&gt;</code></span>
        </div>
        <div style="display:flex; justify-content:space-between; border-bottom:1px solid var(--border); padding:6px 0;">
          <span style="font-weight:700; color:#10b981;">2. యునరీ ఆపరేటర్లు:</span>
          <span><code>++</code>, <code>--</code>, <code>!</code>, <code>~</code>, <code>sizeof</code>, పాయింటర్ <code>*</code>, అడ్రస్ <code>&amp;</code></span>
        </div>
        <div style="display:flex; justify-content:space-between; border-bottom:1px solid var(--border); padding:6px 0;">
          <span style="font-weight:700; color:#10b981;">3. గుణకార ఆపరేటర్లు:</span>
          <span><code>*</code>, <code>/</code>, మాడ్యులో <code>%</code></span>
        </div>
        <div style="display:flex; justify-content:space-between; border-bottom:1px solid var(--border); padding:6px 0;">
          <span style="font-weight:700; color:#10b981;">4. సంకలన ఆపరేటర్లు:</span>
          <span>కూడిక <code>+</code>, తీసివేత <code>-</code></span>
        </div>
        <div style="display:flex; justify-content:space-between; border-bottom:1px solid var(--border); padding:6px 0;">
          <span style="font-weight:700; color:#10b981;">5. రిలేషనల్ & కంపారిజన్:</span>
          <span><code>&lt;</code>, <code>&lt;=</code>, <code>&gt;</code>, <code>&gt;=</code> మరియు <code>==</code>, <code>!=</code></span>
        </div>
        <div style="display:flex; justify-content:space-between; border-bottom:1px solid var(--border); padding:6px 0;">
          <span style="font-weight:700; color:#10b981;">6. లాజికల్ ఆపరేటర్లు:</span>
          <span><code>&amp;&amp;</code> (AND) తర్వాతి స్థానంలో <code>||</code> (OR)</span>
        </div>
        <div style="display:flex; justify-content:space-between; padding:6px 0;">
          <span style="font-weight:700; color:#10b981;">7. అత్యల్ప ప్రాధాన్యత:</span>
          <span>అసైన్‌మెంట్ <code>=</code>, <code>+=</code>, <code>-=</code>, <code>*=</code></span>
        </div>
      </div>
      <p style="font-size:13px; color:var(--text2); margin:8px 0 0 0;">
        💡 <strong>గోల్డెన్ రూల్:</strong> ప్రెసిడెన్స్ రూల్స్ పై సందేహం ఉన్నప్పుడు ఎల్లప్పుడూ బ్రాకెట్లను <code>( ... )</code> ఉపయోగించడం ఉత్తమ ఇంజనీరింగ్ పద్ధతి.
      </p>
    </div>

    <!-- SECTION 6 -->
    <div class="section-title"><span class="num">6</span>బిగినర్స్ చేసే ఘోరమైన తప్పులు (Beginner Pitfalls)</div>
    <div class="section-body">
      <div style="display:flex; flex-direction:column; gap:12px; margin:16px 0;">
        <div style="background:rgba(239, 68, 68, 0.08); border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px 18px;">
          <div style="font-weight:700; color:#ef4444; font-size:14px;">❌ 1. if కండిషన్‌లో = బదులు == వాడడం మర్చిపోవడం:</div>
          <code style="font-size:13px; color:var(--text); display:block; margin:6px 0;">if (x = 5) { ... } // తప్పు! ఇది ఎల్లప్పుడూ TRUE అవుతుంది!</code>
          <span style="font-size:13px; color:var(--text2); display:block;">సింగిల్ ఈక్వల్స్ <code>=</code> అసైన్‌మెంట్ చేస్తుంది (x లోకి 5 వేస్తుంది). అది నాన్-జీరో కాబట్టి కండిషన్ ఎప్పటికీ సత్యమే అవుతుంది. పోల్చడానికి ఎల్లప్పుడూ డబుల్ ఈక్వల్స్ <code>==</code> వాడాలి.</span>
        </div>

        <div style="background:rgba(239, 68, 68, 0.08); border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px 18px;">
          <div style="font-weight:700; color:#ef4444; font-size:14px;">❌ 2. ఫ్లోటింగ్ పాయింట్ సంఖ్యలకు మాడ్యులో % వాడడం:</div>
          <code style="font-size:13px; color:var(--text); display:block; margin:6px 0;">float rem = 5.5 % 2; // కంపైలర్ ఎర్రర్!</code>
          <span style="font-size:13px; color:var(--text2); display:block;">C లో <code>%</code> ఆపరేటర్ కేవలం పూర్ణాంకాలపై (integers) మాత్రమే పనిచేస్తుంది. ఫ్లోట్ శేషం కావాలంటే <code>&lt;math.h&gt;</code> లోని <code>fmod()</code> ఫంక్షన్ వాడాలి.</span>
        </div>
      </div>
    </div>

    <!-- SECTION 7 -->
    <div class="section-title"><span class="num">7</span>తరచుగా అడిగే ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div style="display:flex; flex-direction:column; gap:12px; margin-top:16px;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px;">
          <h4 style="color:#10b981; margin:0 0 6px 0; font-size:14.5px;">Q: for లూప్‌లో i++ కంటే ++i వాడితే ఏమైనా స్పీడ్ పెరుగుతుందా?</h4>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.6;">
            ప్రిమిటివ్ ఇంటిజర్లకు ఆధునిక ఆప్టిమైజింగ్ కంపైలర్లు రెండింటికీ ఒకే విధమైన అసెంబ్లీ కోడ్ ఉత్పత్తి చేస్తాయి. అయితే C++ లో హెవీ ఆబ్జెక్ట్ ఇటరేటర్లతో పనిచేసేటప్పుడు టెంపరరీ ఆబ్జెక్ట్ కాపీ అవసరం లేని <code>++i</code> వాడటమే ఉత్తమ అలవాటు.
          </p>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px;">
          <h4 style="color:#10b981; margin:0 0 6px 0; font-size:14.5px;">Q: Bitwise Left Shift (x &lt;&lt; 1) ఎందుకు x * 2 కంటే వేగవంతమైనది?</h4>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.6;">
            పాత ప్రాసెసర్లలో గుణకారం (Multiplication) చేయడానికి బహుళ క్లాక్ సైకిల్స్ పట్టేది. కానీ షిఫ్ట్ ఆపరేషన్ కేవలం ఒకే ఒక్క సింగిల్ సైకిల్ బారెల్ షిఫ్టర్‌తో ముగుస్తుంది. ఆధునిక కంపైలర్లు కూడా మీరు <code>x * 2</code> అని రాస్తే అంతర్గతంగా <code>x &lt;&lt; 1</code> గా మారుస్తాయి.
          </p>
        </div>
      </div>
    </div>
  `
};

// Execute writing out upgraded files for Phase 1 (Lessons 1 to 4)
for (let i = 1; i <= 4; ++i) {
  const lesson = LESSONS.find(l => l.num === i);
  if (!lesson) continue;
  lesson.contentHtml = PHASE1_CONTENTS[i];
  const html = generatePageHtml(lesson);
  fs.writeFileSync(path.join(cDir, lesson.file), html, 'utf8');
  console.log(`✅ Fully enriched Phase 1 Lesson ${i} : ${lesson.file} (${html.length} chars)`);
}

