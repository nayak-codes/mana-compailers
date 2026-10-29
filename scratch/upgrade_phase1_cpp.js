const fs = require('fs');
const path = require('path');

const cppDir = path.join(__dirname, '../public/blog-cpp');

function replaceMainContent(filePath, newMainHtml) {
  let content = fs.readFileSync(filePath, 'utf8');
  const startIdx = content.indexOf('<main class="content">');
  const endIdx = content.indexOf('</main>');
  if (startIdx === -1 || endIdx === -1) {
    console.error('Could not find <main> in', filePath);
    return;
  }
  content = content.slice(0, startIdx) + newMainHtml + content.slice(endIdx + 7);
  // Ensure light-theme classes
  content = content.replace(/<html(\s+[^>]*)?>/, '<html class="light-theme" lang="te">');
  content = content.replace(/<body(\s+[^>]*)?>/, '<body class="lang-cpp light-theme">');
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('✅ Upgraded:', path.basename(filePath));
}

// ==========================================
// CHAPTER 01: INTRODUCTION & HELLO WORLD
// ==========================================
const ch01Main = `<main class="content">
    <div class="breadcrumb">
      <a href="/">Home</a><span class="sep">›</span>
      <a href="/blog.html">Tutorials</a><span class="sep">›</span>
      <a href="/blog-cpp.html">C++ Masterclass</a><span class="sep">›</span>
      <span class="current">Chapter 1: C++ Introduction & Hello World</span>
    </div>

    <h1 class="page-title">C++ పరిచయం & మొదటి ప్రోగ్రామ్ (Introduction, History & Hello World)</h1>

    <div class="page-meta">
      <span class="badge">⚡ Modern C++20 / C++17</span>
      <span class="badge">🟢 Chapter 1 of 20</span>
      <span class="badge">📂 Phase 1: C++ Basics & Fundamentals</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

    <!-- Covered Topics Bar -->
    <div style="background:var(--bg3); border:1px solid var(--border); border-radius:8px; padding:10px 16px; margin-bottom:24px; font-size:13px; color:var(--text2); display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
      <span style="color:#10b981; font-weight:700;">📌 Covered in this chapter:</span>
      <span>What is C++? · History & Bjarne Stroustrup · Zero-overhead Principle · C vs C++ · The 4-Stage Compilation Pipeline · First Hello World Program · Line-by-Line Breakdown · std::cout & std::endl · \\n Performance Secret · using namespace std Controversy</span>
    </div>

    <!-- Intro Overview Box -->
    <div class="intro-box">
      ఈ మొదటి అధ్యాయంలో, ప్రపంచంలో అత్యంత వేగవంతమైన కంప్యూటింగ్ సిస్టమ్స్‌ను నడిపించే <strong>C++ ప్రోగ్రామింగ్ లాంగ్వేజ్</strong> యొక్క మూలాలు, అంతర్గత కంపైలర్ ఆర్కిటెక్చర్, మరియు మీ మొట్టమొదటి <code>Hello, World!</code> ప్రోగ్రామ్‌ను ప్రతి అక్షరాన్ని మైక్రోస్కోపిక్‌గా విశ్లేషిస్తూ నేర్చుకుందాం.
    </div>

    <!-- SECTION 1 -->
    <div class="section-title"><span class="num">1</span>C++ అంటే ఏమిటి? (Origins, Philosophy & Real-World Power)</div>
    <div class="section-body">
      <p>
        <strong>C++</strong> అనేది ఒక high-performance, statically typed, compiled, general-purpose ప్రోగ్రామింగ్ లాంగ్వేజ్. దీనిని 1979 లో డెన్మార్క్‌కు చెందిన లెజెండరీ కంప్యూటర్ సైంటిస్ట్ <strong>Bjarne Stroustrup</strong> బెల్ లాబొరేటరీస్ (Bell Labs) లో రూపొందించారు.
      </p>
      <p>
        మొదట్లో దీని పేరు <em>"C with Classes"</em> అని ఉండేది. 1983 లో దీనికి అధికారికంగా <strong>C++</strong> అని పేరు మార్చారు. C లాంగ్వేజ్‌లో <code>++</code> అంటే ఒక విలువను పెంచడం (Increment Operator). అంటే <em>"C లాంగ్వేజ్‌కు శక్తివంతమైన ఆబ్జెక్ట్ ఓరియెంటెడ్ ఫీచర్లను జోడించి తదుపరి స్థాయికి తీసుకెళ్లిన ఉన్నతమైన భాష"</em> అని దీని అర్థం!
      </p>

      <div class="concept-box">
        <h4>💡 The Core Philosophy: "Zero-Overhead Principle"</h4>
        <p>
          Bjarne Stroustrup C++ ను డిజైన్ చేసినప్పుడు ఒక బలమైన సూత్రాన్ని పెట్టుకున్నారు: 
          <em>"What you don't use, you don't pay for. And what you do use, you couldn't hand-code any better."</em>
        </p>
        <p style="margin-bottom:0;">
          అంటే మీరు ఒక ఫీచర్‌ను ఉపయోగించకపోతే, అది మీ ప్రోగ్రామ్ మెమరీని గానీ, స్పీడ్‌ను గానీ ఒక్క శాతం కూడా వేస్ట్ చేయదు. అందుకే నేటికీ microsecond లేటెన్సీ అవసరమైన చోట ప్రపంచం మొత్తం C++ నే వాడుతుంది.
        </p>
      </div>

      <h4 style="color:#10b981; margin:20px 0 10px; font-size:16px;">🌍 C++ ను నిజ జీవితంలో ఎక్కడ వాడుతున్నారు?</h4>
      <ul>
        <li><strong>AAA Video Games & Game Engines:</strong> Unreal Engine 5, Unity core, మరియు PlayStation 5 / Xbox గేమింగ్ టైటిల్స్ అన్నీ C++ తోనే రన్ అవుతాయి.</li>
        <li><strong>Operating Systems:</strong> Windows OS Kernel, macOS కోర్ భాగాలు, మరియు Linux సిస్టమ్ డ్రైవర్లు.</li>
        <li><strong>Web Browsers:</strong> Google Chrome (V8 JavaScript Engine & Blink rendering engine) మరియు Mozilla Firefox కోర్ ఇంజిన్లు.</li>
        <li><strong>High-Frequency Trading (HFT):</strong> స్టాక్ మార్కెట్లో మిల్లీసెకను కంటే తక్కువ సమయంలో వేల కోట్ల రూపాయల ట్రేడింగ్ ఆర్డర్లను ప్రాసెస్ చేసే వాల్ స్ట్రీట్ ఫైనాన్షియల్ ఇంజిన్లు.</li>
        <li><strong>Aerospace & Robotics:</strong> NASA మార్స్ రోవర్ మిషన్లు, స్పేస్ ఎక్స్ రాకెట్ గైడెన్స్ సిస్టమ్స్, మరియు టెస్లా అటానమస్ డ్రైవింగ్ విజన్ నెట్‌వర్క్‌లు.</li>
      </ul>
    </div>

    <!-- SECTION 2 -->
    <div class="section-title"><span class="num">2</span>C vs C++: తేడా ఏమిటి? (Procedural vs Multi-Paradigm)</div>
    <div class="section-body">
      <p>
        చాలామంది విద్యార్థులు C మరియు C++ రెండూ ఒకటే అనుకుంటారు. కానీ C అనేది కేవలం <strong>Procedural Language</strong> (విధులు మరియు పనుల కేంద్రంగా నడుస్తుంది). కాగా C++ అనేది <strong>Multi-Paradigm Language</strong>.
      </p>
      
      <div style="overflow-x:auto; margin:18px 0;">
        <table style="width:100%; border-collapse:collapse; font-size:14px; text-align:left;">
          <thead>
            <tr style="background:var(--bg3); border-bottom:2px solid #10b981;">
              <th style="padding:12px 14px; color:#10b981;">లక్షణం (Feature)</th>
              <th style="padding:12px 14px; color:var(--text);">C Language</th>
              <th style="padding:12px 14px; color:#10b981;">Modern C++</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom:1px solid var(--border);">
              <td style="padding:10px 14px; font-weight:700;">Programming Paradigm</td>
              <td style="padding:10px 14px; color:var(--text2);">కేవలం Procedural (Step-by-step functions)</td>
              <td style="padding:10px 14px; color:var(--text);">Multi-paradigm (Procedural + OOPs + Generic Templates + Functional)</td>
            </tr>
            <tr style="border-bottom:1px solid var(--border);">
              <td style="padding:10px 14px; font-weight:700;">Data Security (Encapsulation)</td>
              <td style="padding:10px 14px; color:var(--text2);">డేటాకు భద్రత తక్కువ; గ్లోబల్ వేరియబుల్స్ సులభంగా మారుతాయి</td>
              <td style="padding:10px 14px; color:var(--text);">Classes & Access Specifiers (private, protected) తో పూర్తి భద్రత</td>
            </tr>
            <tr style="border-bottom:1px solid var(--border);">
              <td style="padding:10px 14px; font-weight:700;">Memory Management</td>
              <td style="padding:10px 14px; color:var(--text2);">మాన్యువల్ (malloc, free) — లీక్స్ అయ్యే ప్రమాదం ఎక్కువ</td>
              <td style="padding:10px 14px; color:var(--text);">RAII సూత్రం, Smart Pointers (std::unique_ptr, std::shared_ptr) తో ఆటోమేటిక్ సేఫ్టీ</td>
            </tr>
            <tr style="border-bottom:1px solid var(--border);">
              <td style="padding:10px 14px; font-weight:700;">Standard Library</td>
              <td style="padding:10px 14px; color:var(--text2);">పరిమితమైన లైబ్రరీ (C Standard Library)</td>
              <td style="padding:10px 14px; color:var(--text);">శక్తివంతమైన Standard Template Library (STL: vector, map, algorithms)</td>
            </tr>
            <tr>
              <td style="padding:10px 14px; font-weight:700;">I/O Operations</td>
              <td style="padding:10px 14px; color:var(--text2);">printf(), scanf() (టైప్ సేఫ్టీ ఉండదు)</td>
              <td style="padding:10px 14px; color:var(--text);">std::cout, std::cin (100% టైప్-సేఫ్ స్ట్రీమ్స్)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- SECTION 3: COMPILATION PIPELINE (CLEAN HTML CARDS INSTEAD OF ASCII) -->
    <div class="section-title"><span class="num">3</span>C++ కంపైలర్ పైప్‌లైన్ (The 4-Stage Compilation Pipeline)</div>
    <div class="section-body">
      <p>
        Python లాంటి ఇంటర్‌ప్రెటెడ్ భాషల్లో కోడ్ నేరుగా లైన్ బై లైన్ రన్ అవుతుంది. కానీ C++ లో మనం రాసే ఇంగ్లీష్ లాంటి కోడ్ నేరుగా CPU కి అర్థం కాదు. మనం రాసిన కోడ్ కంప్యూటర్ ప్రాసెసర్ అర్థం చేసుకునే బైనరీ మెషిన్ కోడ్ (0s & 1s) గా మారడానికి <strong>4 దశలు (4 Stages)</strong> దాటాలి.
      </p>

      <!-- Sleek Modern Visual Pipeline Cards -->
      <div style="display:flex; flex-direction:column; gap:12px; margin:20px 0;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #10b981; border-radius:8px; padding:14px 18px; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:10px;">
          <div>
            <div style="font-size:11px; text-transform:uppercase; color:#10b981; font-weight:800; letter-spacing:0.5px;">Stage 01: Preprocessing</div>
            <div style="font-weight:700; font-size:15px; color:var(--text); margin-top:2px;">హెడర్స్ మరియు మాక్రోల విస్తరణ (#include, #define)</div>
            <div style="font-size:13px; color:var(--text2); margin-top:4px;"><code>main.cpp</code> $\rightarrow$ ప్రీ-ప్రాసెసర్ <code>#include &lt;iostream&gt;</code> కోడ్‌ను తీసుకొచ్చి ఫైల్ పైన అతికిస్తుంది $\rightarrow$ <code>main.i / main.ii</code> ఫైల్ తయారవుతుంది.</div>
          </div>
          <span style="background:rgba(16,185,129,0.1); color:#10b981; padding:4px 10px; border-radius:6px; font-size:12px; font-weight:700;">Tool: cpp</span>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #3b82f6; border-radius:8px; padding:14px 18px; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:10px;">
          <div>
            <div style="font-size:11px; text-transform:uppercase; color:#3b82f6; font-weight:800; letter-spacing:0.5px;">Stage 02: Compilation</div>
            <div style="font-weight:700; font-size:15px; color:var(--text); margin-top:2px;">హై-లెవల్ C++ కోడ్ నుండి CPU అసెంబ్లీ కోడ్ మార్పు</div>
            <div style="font-size:13px; color:var(--text2); margin-top:4px;">సింటాక్స్ చెకింగ్, టైప్ ఎర్రర్ల గుర్తింపు, ఆప్టిమైజేషన్లు చేసి CPU రిజిస్టర్ ఇన్స్ట్రక్షన్లను (<code>mov, push, call</code>) ఉత్పత్తి చేస్తుంది $\rightarrow$ <code>main.s / main.asm</code>.</div>
          </div>
          <span style="background:rgba(59,130,246,0.1); color:#3b82f6; padding:4px 10px; border-radius:6px; font-size:12px; font-weight:700;">Tool: g++ / clang++</span>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #f59e0b; border-radius:8px; padding:14px 18px; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:10px;">
          <div>
            <div style="font-size:11px; text-transform:uppercase; color:#f59e0b; font-weight:800; letter-spacing:0.5px;">Stage 03: Assembly</div>
            <div style="font-weight:700; font-size:15px; color:var(--text); margin-top:2px;">అసెంబ్లీ ఇన్స్ట్రక్షన్ల నుండి బైనరీ ఆబ్జెక్ట్ ఫైల్ నిర్మాణం</div>
            <div style="font-size:13px; color:var(--text2); margin-top:4px;">అసెంబ్లర్ CPU సూచనలను స్వచ్ఛమైన మెషిన్ బైట్స్ (0s & 1s) గా మారుస్తుంది $\rightarrow$ రీలోకేటబుల్ ఆబ్జెక్ట్ ఫైల్ <code>main.o / main.obj</code>.</div>
          </div>
          <span style="background:rgba(245,158,11,0.1); color:#f59e0b; padding:4px 10px; border-radius:6px; font-size:12px; font-weight:700;">Tool: as (Assembler)</span>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #ec4899; border-radius:8px; padding:14px 18px; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:10px;">
          <div>
            <div style="font-size:11px; text-transform:uppercase; color:#ec4899; font-weight:800; letter-spacing:0.5px;">Stage 04: Linking</div>
            <div style="font-weight:700; font-size:15px; color:var(--text); margin-top:2px;">లైబ్రరీ ఫంక్షన్ల అనుసంధానం & ఎగ్జిక్యూటబుల్ తయారీ</div>
            <div style="font-size:13px; color:var(--text2); margin-top:4px;">మీ <code>main.o</code> ఫైల్‌కు C++ స్టాండర్డ్ లైబ్రరీ (libc++) మరియు సిస్టమ్ రన్‌టైమ్ ఫంక్షన్లను కలిపి నేరుగా OS రన్ చేయగల <code>program.exe / a.out</code> ను అందిస్తుంది.</div>
          </div>
          <span style="background:rgba(236,72,153,0.1); color:#ec4899; padding:4px 10px; border-radius:6px; font-size:12px; font-weight:700;">Tool: ld (Linker)</span>
        </div>
      </div>
    </div>

    <!-- SECTION 4 -->
    <div class="section-title"><span class="num">4</span>మీ మొదటి C++ Program: Hello, World!</div>
    <div class="section-body">
      <p>
        ఇప్పుడు ప్రపంచవ్యాప్తంగా ప్రతి ప్రోగ్రామర్ తన మొదటి అడుగు వేసే సాంప్రదాయ <strong>"Hello, World!"</strong> ప్రోగ్రామ్‌ను మోడరన్ C++ ప్రమాణాలతో రాద్దాం:
      </p>

      <div style="margin-top: 16px; margin-bottom: 12px;">
        <div style="font-size:13.5px; font-weight:700; color:#10b981; margin-bottom:6px;">💻 Example 1: The Modern C++ Hello World Program</div>
        <div class="code-block">
          <div class="code-block-header">
            <span class="lang-tag">C++17 / C++20</span>
            <a class="try-btn" href="/online-cpp-compiler.html">▶ Run in Compiler</a>
          </div>
          <pre><code>#include &lt;iostream&gt;

int main() {
    std::cout &lt;&lt; "Hello, World! 🚀 Welcome to C++ Masterclass." &lt;&lt; std::endl;
    return 0;
}</code></pre>
        </div>
      </div>

      <!-- Line-by-Line Microscopic Breakdown -->
      <div class="card" style="background:var(--bg2); border:1px solid var(--border); padding:18px 20px; border-radius:10px; margin-top:16px;">
        <h4 style="color:#10b981; margin:0 0 12px 0; font-size:15px; display:flex; align-items:center; gap:8px;">
          🔍 మైక్రోస్కోపిక్ లైన్-బై-లైన్ కోడ్ విశ్లేషణ:
        </h4>
        <ul style="margin:0 0 0 18px; line-height:1.85; font-size:14px; color:var(--text);">
          <li>
            <code>#include &lt;iostream&gt;</code>: 
            ఇది <strong>Preprocessor Directive</strong>. <code>iostream</code> అంటే <em>Input Output Stream</em>. స్క్రీన్ పైన టెక్స్ట్ ప్రింట్ చేయాలన్నా (<code>cout</code>), కీబోర్డ్ నుండి ఇన్‌పుట్ తీసుకోవాలన్నా (<code>cin</code>) ఈ హెడర్ ఫైల్ కచ్చితంగా ఉండాలి.
          </li>
          <li>
            <code>int main()</code>: 
            ఇది <strong>Main Function (Entry Point)</strong>. ఆపరేటింగ్ సిస్టమ్ మీ ప్రోగ్రామ్‌ను ఎగ్జిక్యూట్ చేయడం ఎల్లప్పుడూ <code>main()</code> మొదటి లైన్ నుండే ప్రారంభిస్తుంది. <code>int</code> అంటే ఈ ఫంక్షన్ చివరికి OS కు ఒక ఇంటిజర్ ఫలితాన్ని ఇస్తుందని అర్థం.
          </li>
          <li>
            <code>{ ... }</code>: 
            కర్లీ బ్రేసెస్ ఫంక్షన్ యొక్క పరిధిని (Scope) సూచిస్తాయి. ప్రోగ్రామ్ లాజిక్ అంతా ఈ బ్రాకెట్ల మధ్యలోనే ఉండాలి.
          </li>
          <li>
            <code>std::cout</code>: 
            <code>cout</code> అంటే <em>Character Output</em>. ఇది టెర్మినల్ కన్సోల్‌కు కనెక్ట్ అయి ఉన్న ఒక స్ట్రీమ్ ఆబ్జెక్ట్. <code>std::</code> అనేది Standard Namespace ను సూచిస్తుంది.
          </li>
          <li>
            <code>&lt;&lt;</code>: 
            దీనిని <strong>Stream Insertion Operator</strong> అంటారు. దీని కుడివైపు ఉన్న డేటాను ఎడమవైపు ఉన్న కన్సోల్ స్ట్రీమ్ (<code>cout</code>) లోకి పంపుతుంది.
          </li>
          <li>
            <code>"Hello, World! 🚀..."</code>: 
            డబుల్ కోట్స్ మధ్య ఉన్న టెక్స్ట్‌ను <strong>String Literal</strong> అంటారు. ఇది ఉన్నది ఉన్నట్లుగా స్క్రీన్‌పై ప్రింట్ అవుతుంది.
          </li>
          <li>
            <code>std::endl</code>: 
            <em>End Line</em>. ఇది ప్రింట్ అయ్యాక కర్సర్‌ను తర్వాతి లైన్‌కి పంపుతుంది మరియు అవుట్‌పుట్ బఫర్‌ను ఫ్లష్ చేస్తుంది.
          </li>
          <li>
            <code>return 0;</code>: 
            ఆపరేటింగ్ సిస్టమ్‌కు <em>"నా ప్రోగ్రామ్ ఎటువంటి లోపాలు లేకుండా 100% విజయవంతంగా ముగిసింది (EXIT_SUCCESS)"</em> అని తెలియజేసే ఎగ్జిట్ స్టేటస్ కోడ్.
          </li>
        </ul>
      </div>
    </div>

    <!-- SECTION 5 -->
    <div class="section-title"><span class="num">5</span>std::endl vs '\\n': పర్ఫార్మెన్స్ సీక్రెట్</div>
    <div class="section-body">
      <p>
        C++ లో కొత్త లైన్‌కి వెళ్లడానికి రెండు మార్గాలు ఉన్నాయి: <code>std::endl</code> మరియు <code>'\\n'</code>. బిగినర్స్ రెండూ ఒకటే అనుకుంటారు, కానీ వాటి మధ్య చాలా పెద్ద టెక్నికల్ తేడా ఉంది:
      </p>

      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:16px; margin:16px 0;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px;">
          <h4 style="color:#ef4444; margin:0 0 8px 0; font-size:14px;">🐢 std::endl (స్లో)</h4>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.6;">
            ఇది కొత్త లైన్‌కి తీసుకెళ్లడమే కాకుండా, సిస్టమ్ I/O బఫర్‌ను తక్షణమే ఖాళీ (Force Flush) చేయమని ఆపరేటింగ్ సిస్టమ్‌కు సిగ్నల్ పంపుతుంది. లూప్‌లలో ప్రతి రౌండ్‌కు ఇది వాడితే ప్రోగ్రామ్ 10 రెట్లు స్లో అయిపోతుంది!
          </p>
        </div>
        <div style="background:var(--bg2); border:1px solid #10b981; border-radius:8px; padding:16px;">
          <h4 style="color:#10b981; margin:0 0 8px 0; font-size:14px;">⚡ '\\n' (హై-స్పీడ్ రికమండెడ్)</h4>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.6;">
            ఇది కేవలం ఒక న్యూలైన్ క్యారెక్టర్‌ను మాత్రమే బఫర్‌లో ఉంచుతుంది. బఫర్ నిండినప్పుడు లేదా ప్రోగ్రామ్ ముగిసినప్పుడు సింగిల్ షాట్‌లో ఆటోమేటిక్‌గా ఫ్లష్ అవుతుంది. కాంపిటీటివ్ ప్రోగ్రామింగ్ & రియల్-టైమ్ ఇంజిన్లలో ఎల్లప్పుడూ <code>'\\n'</code> మాత్రమే వాడాలి!
          </p>
        </div>
      </div>
    </div>

    <!-- SECTION 6: COMMON BEGINNER PITFALLS -->
    <div class="section-title"><span class="num">6</span>బిగినర్స్ చేసే ఘోరమైన తప్పులు (Beginner Pitfalls)</div>
    <div class="section-body">
      <div style="display:flex; flex-direction:column; gap:12px; margin:14px 0;">
        <div style="background:var(--bg2); border:1px solid rgba(239,68,68,0.3); border-left:4px solid #ef4444; border-radius:8px; padding:14px 18px;">
          <div style="font-weight:700; color:#ef4444; font-size:14px;">❌ Trap 1: using namespace std; ను హెడర్లలో వాడటం</div>
          <p style="font-size:13.5px; color:var(--text); margin:6px 0 0 0; line-height:1.6;">
            బిగినర్స్ ప్రతిసారీ <code>std::</code> రాయడం బద్ధకించి <code>using namespace std;</code> అని గ్లోబల్‌గా రాస్తారు. కానీ దీనివల్ల C++ స్టాండర్డ్ లైబ్రరీలోని వేలాది పేర్లు (ఉదా: <code>count, size, min</code>) మీ స్వంత వేరియబుల్ పేర్లతో ఢీకొని భయంకరమైన <strong>Name Collision (Ambiguity Error)</strong> సృష్టిస్తాయి. ప్రొఫెషనల్ కోడ్‌లో ఎల్లప్పుడూ స్పష్టంగా <code>std::cout</code> రాయడమే ఉత్తమ విధానం.
          </p>
        </div>

        <div style="background:var(--bg2); border:1px solid rgba(239,68,68,0.3); border-left:4px solid #ef4444; border-radius:8px; padding:14px 18px;">
          <div style="font-weight:700; color:#ef4444; font-size:14px;">❌ Trap 2: void main() వాడటం</div>
          <p style="font-size:13.5px; color:var(--text); margin:6px 0 0 0; line-height:1.6;">
            పాత 1990ల Turbo C++ పుస్తకాలు చదివి చాలామంది <code>void main()</code> రాస్తుంటారు. ISO Modern C++ ప్రమాణాల ప్రకారం <code>void main()</code> చెల్లదు. ఆపరేటింగ్ సిస్టమ్‌కు ప్రోగ్రామ్ స్టేటస్ తెలియడానికి తప్పనిసరిగా <code>int main()</code> మాత్రమే రాయాలి.
          </p>
        </div>
      </div>
    </div>

    <!-- FAQ SECTION -->
    <div class="section-title"><span class="num">7</span>తరచుగా అడిగే ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div class="faq-card" style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px 18px; margin-bottom:12px;">
        <h4 style="color:#10b981; margin:0 0 6px 0; font-size:14.5px;">Q: C++ నేర్చుకోవడానికి ముందు C లాంగ్వేజ్ కచ్చితంగా వచ్చి ఉండాలా?</h4>
        <p style="margin:0; font-size:13.5px; color:var(--text2); line-height:1.6;">
          అస్సలు అవసరం లేదు! C++ అనేది స్వతంత్రమైన మోడరన్ లాంగ్వేజ్. మీరు నేరుగా C++ తోనే మీ మొదటి ప్రోగ్రామింగ్ జర్నీని ప్రారంభించవచ్చు.
        </p>
      </div>

      <div class="faq-card" style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px 18px;">
        <h4 style="color:#10b981; margin:0 0 6px 0; font-size:14.5px;">Q: g++ మరియు clang++ మధ్య తేడా ఏమిటి?</h4>
        <p style="margin:0; font-size:13.5px; color:var(--text2); line-height:1.6;">
          <code>g++</code> అనేది GNU కంపైలర్ కలెక్షన్ (GCC) కి చెందినది; Linux ప్లాట్‌ఫారమ్‌లలో విస్తృతంగా వాడతారు. <code>clang++</code> అనేది LLVM ఆధారిత మోడరన్ కంపైలర్; ఇది స్పష్టమైన ఎర్రర్ మెసేజ్‌లు మరియు మెరుపువేగవంతమైన కంపైలేషన్‌ను అందిస్తుంది (Apple Xcode & Google వాడుతుంది).
        </p>
      </div>
    </div>

    <!-- PREV / NEXT NAVIGATION -->
    <div style="display:flex; justify-content:space-between; align-items:center; margin-top:40px; padding-top:20px; border-top:1px solid var(--border); flex-wrap:wrap; gap:16px;">
      <a href="/blog-cpp.html" style="display:inline-flex; align-items:center; gap:8px; padding:10px 18px; border-radius:8px; background:var(--bg3); border:1px solid var(--border); color:var(--text); text-decoration:none; font-weight:700; font-size:13.5px;">
        ← C++ Course Index
      </a>
      <a href="/blog-cpp/02-cpp-variables-data-types.html" style="display:inline-flex; align-items:center; gap:8px; padding:10px 20px; border-radius:8px; background:linear-gradient(135deg, #10b981, #059669); color:#ffffff; text-decoration:none; font-weight:700; font-size:13.5px; box-shadow:0 2px 10px rgba(16,185,129,0.2);">
        Next: 2. వేరియబుల్స్ & డేటా టైప్స్ →
      </a>
    </div>

  </main>`;

replaceMainContent(path.join(cppDir, '01-cpp-introduction-and-hello-world.html'), ch01Main);

// ==========================================
// CHAPTER 02: VARIABLES & DATA TYPES
// ==========================================
const ch02Main = `<main class="content">
    <div class="breadcrumb">
      <a href="/">Home</a><span class="sep">›</span>
      <a href="/blog.html">Tutorials</a><span class="sep">›</span>
      <a href="/blog-cpp.html">C++ Masterclass</a><span class="sep">›</span>
      <span class="current">Chapter 2: Variables, Data Types & auto</span>
    </div>

    <h1 class="page-title">వేరియబుల్స్, డేటా టైప్స్, కాన్‌స్టాంట్స్ & auto (Variables & Types)</h1>

    <div class="page-meta">
      <span class="badge">⚡ Modern C++20 / C++17</span>
      <span class="badge">🟢 Chapter 2 of 20</span>
      <span class="badge">📂 Phase 1: C++ Basics & Fundamentals</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

    <!-- Covered Topics Bar -->
    <div style="background:var(--bg3); border:1px solid var(--border); border-radius:8px; padding:10px 16px; margin-bottom:24px; font-size:13px; color:var(--text2); display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
      <span style="color:#10b981; font-weight:700;">📌 Covered in this chapter:</span>
      <span>What is a Variable? · RAM Memory Architecture · Primitive Data Types (Sizes & Ranges) · Signed vs Unsigned Overflow Trap · Floating Point Precision · auto Type Deduction · const vs constexpr · Variable Shadowing</span>
    </div>

    <!-- Intro Overview Box -->
    <div class="intro-box">
      ప్రోగ్రామింగ్ అంటేనే డేటాను ప్రాసెస్ చేయడం. కంప్యూటర్ మెమరీ (RAM) లో డేటాను ఎలా భద్రపరచాలి, ఎన్ని బైట్ల స్థలం అవసరం, మరియు C++ లో టైప్ సేఫ్టీ ద్వారా బగ్స్ రాకుండా ఎలా అరికట్టవచ్చో ఈ అధ్యాయంలో ప్రాక్టికల్‌గా నేర్చుకుందాం.
    </div>

    <!-- SECTION 1 -->
    <div class="section-title"><span class="num">1</span>వేరియబుల్ అంటే ఏమిటి? (RAM మెమరీలో ఒక పేరున్న బాక్స్)</div>
    <div class="section-body">
      <p>
        ఒక <strong>Variable (వేరియబుల్)</strong> అంటే కంప్యూటర్ RAM మెమరీలోని ఒక నిర్దిష్ట అడ్రస్‌కు మనం పెట్టుకునే స్నేహపూర్వక పేరు (Named Memory Location).
      </p>

      <!-- Sleek Modern Visual RAM Architecture Cards -->
      <div style="background:var(--bg2); border:1px solid var(--border); border-radius:10px; padding:18px 20px; margin:20px 0;">
        <div style="font-size:12px; font-weight:800; color:#10b981; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:12px;">
          🧠 హార్డ్‌వేర్ RAM మెమరీ లేఅవుట్ (Memory Slot Visualization):
        </div>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:12px;">
          <div style="background:var(--bg3); border:1px solid rgba(16,185,129,0.3); border-radius:8px; padding:12px; border-top:3px solid #10b981;">
            <div style="font-size:11px; color:#10b981; font-family:var(--font-mono);">Address: 0x7ffd01</div>
            <div style="font-weight:700; font-size:14px; color:var(--text); margin:4px 0;">int userAge = 25;</div>
            <div style="font-size:12px; color:var(--text2);">Size: 4 Bytes (32 bits) | Binary Stored</div>
          </div>

          <div style="background:var(--bg3); border:1px solid rgba(59,130,246,0.3); border-radius:8px; padding:12px; border-top:3px solid #3b82f6;">
            <div style="font-size:11px; color:#3b82f6; font-family:var(--font-mono);">Address: 0x7ffd05</div>
            <div style="font-weight:700; font-size:14px; color:var(--text); margin:4px 0;">double balance = 99.45;</div>
            <div style="font-size:12px; color:var(--text2);">Size: 8 Bytes (64 bits) | IEEE 754 Stored</div>
          </div>

          <div style="background:var(--bg3); border:1px solid rgba(245,158,11,0.3); border-radius:8px; padding:12px; border-top:3px solid #f59e0b;">
            <div style="font-size:11px; color:#f59e0b; font-family:var(--font-mono);">Address: 0x7ffd0d</div>
            <div style="font-weight:700; font-size:14px; color:var(--text); margin:4px 0;">char grade = 'A';</div>
            <div style="font-size:12px; color:var(--text2);">Size: 1 Byte (8 bits) | ASCII: 65 Stored</div>
          </div>
        </div>
      </div>
    </div>

    <!-- SECTION 2 -->
    <div class="section-title"><span class="num">2</span>C++ ఫండమెంటల్ డేటా టైప్స్ (Data Types Matrix)</div>
    <div class="section-body">
      <p>
        C++ లో ప్రతి వేరియబుల్‌కు తప్పనిసరిగా ఒక డేటా టైప్ ఉండాలి (Statically Typed). కంపైలర్ ఆ టైప్‌ను బట్టి RAM లో ఎన్ని బైట్లు కేటాయించాలో నిర్ణయిస్తుంది:
      </p>

      <div style="overflow-x:auto; margin:18px 0;">
        <table style="width:100%; border-collapse:collapse; font-size:13.5px; text-align:left;">
          <thead>
            <tr style="background:var(--bg3); border-bottom:2px solid #10b981;">
              <th style="padding:10px 12px; color:#10b981;">డేటా టైప్ (Type)</th>
              <th style="padding:10px 12px; color:var(--text);">మెమరీ పరిమాణం (Size)</th>
              <th style="padding:10px 12px; color:var(--text);">విలువల పరిధి (Range)</th>
              <th style="padding:10px 12px; color:var(--text2);">సాధారణ ఉపయోగం</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom:1px solid var(--border);">
              <td style="padding:9px 12px; font-weight:700; color:#10b981;">bool</td>
              <td style="padding:9px 12px;">1 Byte</td>
              <td style="padding:9px 12px;">true (1) లేదా false (0)</td>
              <td style="padding:9px 12px; color:var(--text2);">నిజం / అబద్ధం ఫ్లాగ్స్</td>
            </tr>
            <tr style="border-bottom:1px solid var(--border);">
              <td style="padding:9px 12px; font-weight:700; color:#10b981;">char</td>
              <td style="padding:9px 12px;">1 Byte</td>
              <td style="padding:9px 12px;">-128 to 127 (లేదా 0 to 255)</td>
              <td style="padding:9px 12px; color:var(--text2);">సింగిల్ అక్షరం ('A', 'z')</td>
            </tr>
            <tr style="border-bottom:1px solid var(--border);">
              <td style="padding:9px 12px; font-weight:700; color:#10b981;">int</td>
              <td style="padding:9px 12px;">4 Bytes</td>
              <td style="padding:9px 12px;">-2,147,483,648 to 2,147,483,647</td>
              <td style="padding:9px 12px; color:var(--text2);">పూర్ణాంకాలు (Numbers)</td>
            </tr>
            <tr style="border-bottom:1px solid var(--border);">
              <td style="padding:9px 12px; font-weight:700; color:#10b981;">long long</td>
              <td style="padding:9px 12px;">8 Bytes</td>
              <td style="padding:9px 12px;">$-9 \times 10^{18}$ to $9 \times 10^{18}$</td>
              <td style="padding:9px 12px; color:var(--text2);">భారీ నంబర్లు, కరెన్సీ పైసలు</td>
            </tr>
            <tr style="border-bottom:1px solid var(--border);">
              <td style="padding:9px 12px; font-weight:700; color:#10b981;">float</td>
              <td style="padding:9px 12px;">4 Bytes</td>
              <td style="padding:9px 12px;">$\approx 7$ దశాంశ ఖచ్చితత్వం</td>
              <td style="padding:9px 12px; color:var(--text2);">గ్రాఫిక్స్ కోఆర్డినేట్స్</td>
            </tr>
            <tr>
              <td style="padding:9px 12px; font-weight:700; color:#10b981;">double</td>
              <td style="padding:9px 12px;">8 Bytes</td>
              <td style="padding:9px 12px;">$\approx 15-17$ దశాంశ ఖచ్చితత్వం</td>
              <td style="padding:9px 12px; color:var(--text2);">సైంటిఫిక్ గణనలు, డాలర్లు</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- SECTION 3 -->
    <div class="section-title"><span class="num">3</span>auto కీవర్డ్: మోడరన్ టైప్ డిడక్షన్</div>
    <div class="section-body">
      <p>
        Modern C++11 నుండి ప్రవేశపెట్టబడిన అత్యంత శక్తివంతమైన ఫీచర్ <strong>\`auto\`</strong>. వేరియబుల్‌కు మనం ఇచ్చే విలువ ఆధారంగా కంపైలరే స్వయంగా సరైన టైప్‌ను పసిగడుతుంది (Type Deduction):
      </p>

      <div style="margin-top: 16px; margin-bottom: 12px;">
        <div style="font-size:13.5px; font-weight:700; color:#10b981; margin-bottom:6px;">💻 Example 1: Type Deduction with auto</div>
        <div class="code-block">
          <div class="code-block-header">
            <span class="lang-tag">C++17</span>
            <a class="try-btn" href="/online-cpp-compiler.html">▶ Run in Compiler</a>
          </div>
          <pre><code>#include &lt;iostream&gt;

int main() {
    auto age = 21;          // Compiler deduces: int
    auto price = 99.99;     // Compiler deduces: double
    auto grade = 'A';       // Compiler deduces: char
    auto isPassed = true;   // Compiler deduces: bool

    std::cout &lt;&lt; "Age size in RAM: " &lt;&lt; sizeof(age) &lt;&lt; " bytes\\n"
              &lt;&lt; "Price size in RAM: " &lt;&lt; sizeof(price) &lt;&lt; " bytes\\n";
    return 0;
}</code></pre>
        </div>
      </div>

      <div class="concept-box">
        <h4>⚡ Performance Fact about 'auto'</h4>
        <p style="margin:0;">
          చాలామంది <code>auto</code> అంటే Python లాగా రన్‌టైమ్‌లో స్లో అవుతుంది అనుకుంటారు. కానీ C++ లో <code>auto</code> పూర్తిగా కంపైల్ సమయంలోనే నిర్ణయించబడుతుంది. రన్‌టైమ్‌లో <strong>ZERO</strong> పెనాల్టీ! మీ ప్రోగ్రామ్ మెరుపు వేగంతో నడుస్తుంది.
        </p>
      </div>
    </div>

    <!-- SECTION 4 -->
    <div class="section-title"><span class="num">4</span>const vs constexpr: స్థిర విలువల భద్రత</div>
    <div class="section-body">
      <p>
        ప్రోగ్రామ్‌లో కొన్ని విలువలు ఎప్పటికీ మారకూడదు (ఉదా: $\pi = 3.14159$, కాంతి వేగం). వాటిని భద్రపరచడానికి రెండు మార్గాలు ఉన్నాయి:
      </p>
      <ul style="line-height:1.8; margin-left:18px;">
        <li>
          <strong>const:</strong> రన్‌టైమ్‌లో వేరియబుల్‌ను రీడ్-ఓన్లీగా మారుస్తుంది. ఒకసారి విలువ అసైన్ చేసిన తర్వాత మార్చడానికి ప్రయత్నిస్తే కంపైలర్ ఎర్రర్ ఇస్తుంది.
        </li>
        <li>
          <strong>constexpr (C++11):</strong> ఇది కంపైల్ సమయంలోనే స్థిర విలువను లెక్కించి, ప్రోగ్రామ్ బైనరీ మెషిన్ కోడ్‌లోనే పొందుపరుస్తుంది. దీనివల్ల రన్‌టైమ్ CPU సైకిల్స్ ఆదా అవుతాయి!
        </li>
      </ul>
    </div>

    <!-- SECTION 5: PITFALLS -->
    <div class="section-title"><span class="num">5</span>బిగినర్స్ చేసే ఘోరమైన తప్పులు (Beginner Pitfalls)</div>
    <div class="section-body">
      <div style="display:flex; flex-direction:column; gap:12px; margin:14px 0;">
        <div style="background:var(--bg2); border:1px solid rgba(239,68,68,0.3); border-left:4px solid #ef4444; border-radius:8px; padding:14px 18px;">
          <div style="font-weight:700; color:#ef4444; font-size:14px;">❌ Trap 1: Uninitialized Variables (గార్బేజ్ వ్యాల్యూ ట్రాష్)</div>
          <p style="font-size:13.5px; color:var(--text); margin:6px 0 0 0; line-height:1.6;">
            C++ లో <code>int count;</code> అని రాసి వదిలేస్తే దానికి డీఫాల్ట్‌గా 0 రాదు! ఆ సమయంలో RAM లో ఉన్న పాత చెత్త విలువ (Garbage Value: ఉదాహరణకు <code>-858993460</code>) అందులోకి వస్తుంది. ఎల్లప్పుడూ <code>int count = 0;</code> లేదా <code>int count{0};</code> అని బ్రాకెట్ ఇనిషియలైజేషన్ చేయాలి!
          </p>
        </div>

        <div style="background:var(--bg2); border:1px solid rgba(239,68,68,0.3); border-left:4px solid #ef4444; border-radius:8px; padding:14px 18px;">
          <div style="font-weight:700; color:#ef4444; font-size:14px;">❌ Trap 2: Unsigned Integer Wrap-around Overflow</div>
          <p style="font-size:13.5px; color:var(--text); margin:6px 0 0 0; line-height:1.6;">
            <code>unsigned int x = 0; x--;</code> అని రాస్తే <code>-1</code> రాదు! అన్‌సైన్డ్ ఇంటిజర్‌కు నెగెటివ్ ఉండదు కాబట్టి అది డైరెక్ట్‌గా గరిష్ట విలువ <code>4294967295</code> కు వెళ్ళిపోయి లూప్స్‌లో అనంతమైన ఇన్ఫినిట్ లూప్‌ను సృష్టిస్తుంది.
          </p>
        </div>
      </div>
    </div>

    <!-- FAQ SECTION -->
    <div class="section-title"><span class="num">6</span>తరచుగా అడిగే ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div class="faq-card" style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px 18px; margin-bottom:12px;">
        <h4 style="color:#10b981; margin:0 0 6px 0; font-size:14.5px;">Q: float మరియు double మధ్య ఏది ఎంచుకోవాలి?</h4>
        <p style="margin:0; font-size:13.5px; color:var(--text2); line-height:1.6;">
          మోడరన్ CPU లలో <code>double</code> వాడటమే ప్రామాణికం. ఎందుకంటే ఆధునిక 64-బిట్ ప్రాసెసర్లు 8-బైట్ డబుల్ లెక్కలను అంతే వేగంగా చేస్తాయి మరియు 15 దశాంశాల ఖచ్చితత్వాన్ని ఇస్తాయి.
        </p>
      </div>

      <div class="faq-card" style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px 18px;">
        <h4 style="color:#10b981; margin:0 0 6px 0; font-size:14.5px;">Q: sizeof ఆపరేటర్ రన్‌టైమ్‌లో పనిచేస్తుందా?</h4>
        <p style="margin:0; font-size:13.5px; color:var(--text2); line-height:1.6;">
          లేదు! <code>sizeof</code> అనేది ఒక కంపైల్-టైమ్ ఆపరేటర్. కంపైలర్ కోడ్‌ను ప్రాసెస్ చేసేటప్పుడే ఆ టైప్ ఎన్ని బైట్లు తీసుకుంటుందో లెక్కించి స్థిర విలువను బైనరీలో రాసిపెడుతుంది.
        </p>
      </div>
    </div>

    <!-- PREV / NEXT NAVIGATION -->
    <div style="display:flex; justify-content:space-between; align-items:center; margin-top:40px; padding-top:20px; border-top:1px solid var(--border); flex-wrap:wrap; gap:16px;">
      <a href="/blog-cpp/01-cpp-introduction-and-hello-world.html" style="display:inline-flex; align-items:center; gap:8px; padding:10px 18px; border-radius:8px; background:var(--bg3); border:1px solid var(--border); color:var(--text); text-decoration:none; font-weight:700; font-size:13.5px;">
        ← Prev: 1. C++ పరిచయం
      </a>
      <a href="/blog-cpp/03-cpp-input-output-cin-cout.html" style="display:inline-flex; align-items:center; gap:8px; padding:10px 20px; border-radius:8px; background:linear-gradient(135deg, #10b981, #059669); color:#ffffff; text-decoration:none; font-weight:700; font-size:13.5px; box-shadow:0 2px 10px rgba(16,185,129,0.2);">
        Next: 3. ఇన్‌పుట్ & అవుట్‌పుట్ →
      </a>
    </div>

  </main>`;

replaceMainContent(path.join(cppDir, '02-cpp-variables-data-types.html'), ch02Main);

// ==========================================
// CHAPTER 03: INPUT / OUTPUT (cin, cout)
// ==========================================
const ch03Main = `<main class="content">
    <div class="breadcrumb">
      <a href="/">Home</a><span class="sep">›</span>
      <a href="/blog.html">Tutorials</a><span class="sep">›</span>
      <a href="/blog-cpp.html">C++ Masterclass</a><span class="sep">›</span>
      <span class="current">Chapter 3: Input & Output (cin, cout)</span>
    </div>

    <h1 class="page-title">ఇన్‌పుట్ & అవుట్‌పుట్ (cin, cout, getline & I/O Formatting)</h1>

    <div class="page-meta">
      <span class="badge">⚡ Modern C++20 / C++17</span>
      <span class="badge">🟢 Chapter 3 of 20</span>
      <span class="badge">📂 Phase 1: C++ Basics & Fundamentals</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

    <!-- Covered Topics Bar -->
    <div style="background:var(--bg3); border:1px solid var(--border); border-radius:8px; padding:10px 16px; margin-bottom:24px; font-size:13px; color:var(--text2); display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
      <span style="color:#10b981; font-weight:700;">📌 Covered in this chapter:</span>
      <span>C++ Stream Architecture · std::cout Insertion (<<) · std::cin Extraction (>>) · std::getline() for Sentences · The Fatal Cin Buffer Newline Bug & Fix · Input Validation (cin.fail()) · I/O Formatting with <iomanip></span>
    </div>

    <!-- Intro Overview Box -->
    <div class="intro-box">
      వినియోగదారుడి నుండి కీబోర్డ్ ద్వారా సమాచారాన్ని స్వీకరించడం మరియు ఫలితాన్ని కన్సోల్ స్క్రీన్‌పై స్పష్టంగా ప్రదర్శించడం ఏ సాఫ్ట్‌వేర్‌కైనా ప్రాథమిక అవసరం. C++ లో అత్యంత వేగవంతమైన <strong>Stream I/O సిస్టమ్</strong>, బిగినర్స్ తలపట్టుకునే <strong>cin బఫర్ న్యూలైన్ ట్రాప్</strong> మరియు దాని పరిష్కారాన్ని ఈ అధ్యాయంలో నేర్చుకుందాం.
    </div>

    <!-- SECTION 1 -->
    <div class="section-title"><span class="num">1</span>C++ లో Streams అంటే ఏమిటి? (కన్వేయర్ బెల్ట్ పోలిక)</div>
    <div class="section-body">
      <p>
        C++ లో డేటా అనేది ఒక <strong>Stream (ప్రవాహం)</strong> లాగా ప్రయాణిస్తుంది. ఒక కన్వేయర్ బెల్ట్ మీద పెట్టెలు ఎలా ఒకదాని తర్వాత ఒకటి వెళ్తాయో, కీబోర్డ్ నుండి CPU కి మరియు CPU నుండి మానిటర్ స్క్రీన్‌కు క్యారెక్టర్లు వరుస క్రమంలో ప్రవహిస్తాయి:
      </p>

      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:16px; margin:20px 0;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #10b981; border-radius:8px; padding:16px;">
          <h4 style="color:#10b981; margin:0 0 6px 0; font-size:15px;">std::cout (Standard Output Stream)</h4>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.6;">
            <strong>&lt;&lt; (Insertion Operator)</strong> ను వాడుతుంది. మీ ప్రోగ్రామ్ నుండి డేటాను స్క్రీన్ కన్సోల్‌లోకి ఇంజెక్ట్ చేస్తుంది. ఉదాహరణ: <code>std::cout &lt;&lt; "Hello";</code>
          </p>
        </div>
        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #3b82f6; border-radius:8px; padding:16px;">
          <h4 style="color:#3b82f6; margin:0 0 6px 0; font-size:15px;">std::cin (Standard Input Stream)</h4>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.6;">
            <strong>&gt;&gt; (Extraction Operator)</strong> ను వాడుతుంది. కీబోర్డ్ బఫర్ నుండి డేటాను లాగి (Extract చేసి) మీ వేరియబుల్‌లో భద్రపరుస్తుంది. ఉదాహరణ: <code>std::cin &gt;&gt; age;</code>
          </p>
        </div>
      </div>
    </div>

    <!-- SECTION 2 -->
    <div class="section-title"><span class="num">2</span>std::cin యొక్క పరిమితి: Whitespace Truncation</div>
    <div class="section-body">
      <p>
        <code>std::cin &gt;&gt;</code> ఆపరేటర్ కేవలం స్పేస్ లేని ఒకే పదాన్ని మాత్రమే చదవగలదు. వినియోగదారుడు స్పేస్ ఇచ్చిన వెంటనే (Space, Tab, Enter), అక్కడితో ఆగిపోతుంది:
      </p>

      <div style="margin-top: 16px; margin-bottom: 12px;">
        <div style="font-size:13.5px; font-weight:700; color:#10b981; margin-bottom:6px;">💻 Example 1: Reading Strings with Whitespaces using std::getline</div>
        <div class="code-block">
          <div class="code-block-header">
            <span class="lang-tag">C++17</span>
            <a class="try-btn" href="/online-cpp-compiler.html">▶ Run in Compiler</a>
          </div>
          <pre><code>#include &lt;iostream&gt;
#include &lt;string&gt;

int main() {
    std::string fullName;
    std::cout &lt;&lt; "Enter your full name (with spaces): ";
    
    // std::getline వాడటం వల్ల స్పేస్‌లతో సహా ఎంటర్‌కొట్టే వరకు లైన్ మొత్తం చదువుతుంది
    std::getline(std::cin, fullName);

    std::cout &lt;&lt; "Welcome aboard, " &lt;&lt; fullName &lt;&lt; "! 🚀\\n";
    return 0;
}</code></pre>
        </div>
      </div>
    </div>

    <!-- SECTION 3: THE FAMOUS CIN BUG -->
    <div class="section-title"><span class="num">3</span>ది ఫేమస్ C++ బగ్: cin >> తర్వాత getline() స్కిప్ అవ్వడం!</div>
    <div class="section-body">
      <p>
        ప్రతి C++ ప్రోగ్రామర్ తన జీవితంలో కనీసం వందసార్లు ఈ బగ్‌తో తలపట్టుకుంటాడు. ఒక నంబర్‌ను <code>cin &gt;&gt;</code> తో చదివిన వెంటనే <code>getline()</code> వాడితే, అది యూజర్ దగ్గర ఏమీ అడగకుండా ఖాళీగా స్కిప్ అయిపోతుంది!
      </p>

      <div class="concept-box">
        <h4>🔍 ఎందుకు ఇలా జరుగుతుంది? (The Buffer Mystery)</h4>
        <p>
          మీరు కీబోర్డ్‌లో <code>25</code> అని టైప్ చేసి <code>[Enter]</code> కొట్టినప్పుడు, మెమరీ బఫర్‌లో <code>'2' '5' '\\n'</code> ఉంటాయి.<br>
          <code>cin &gt;&gt; age;</code> కేవలం <code>25</code> ను మాత్రమే తీసుకుంటుంది. ఆ <code>'\\n'</code> (ఎంటర్ క్యారెక్టర్) బఫర్‌లోనే ఉండిపోతుంది!<br>
          వెంటనే తర్వాతి లైన్‌లో ఉన్న <code>getline(cin, name);</code> ఆ పాత <code>'\\n'</code> ను చూసి, <em>"యూజర్ ఆల్రెడీ ఎంటర్ కొట్టేశారు"</em> అనుకుని ఖాళీ స్ట్రింగ్‌ను రీడ్ చేసి వెళ్లిపోతుంది!
        </p>
      </div>

      <div style="margin-top: 16px; margin-bottom: 12px;">
        <div style="font-size:13.5px; font-weight:700; color:#10b981; margin-bottom:6px;">💻 Example 2: The Definitive cin.ignore() Fix</div>
        <div class="code-block">
          <div class="code-block-header">
            <span class="lang-tag">C++17</span>
            <a class="try-btn" href="/online-cpp-compiler.html">▶ Run in Compiler</a>
          </div>
          <pre><code>#include &lt;iostream&gt;
#include &lt;string&gt;
#include &lt;limits&gt;

int main() {
    int rollNumber;
    std::string studentName;

    std::cout &lt;&lt; "Enter Roll Number: ";
    std::cin &gt;&gt; rollNumber;

    // సీక్రెట్ పరిష్కారం: బఫర్‌లో మిగిలిపోయిన '\\n' ను క్లియర్ చేయండి
    std::cin.ignore(std::numeric_limits&lt;std::streamsize&gt;::max(), '\\n');

    std::cout &lt;&lt; "Enter Student Full Name: ";
    std::getline(std::cin, studentName); // ఇప్పుడు పర్ఫెక్ట్‌గా ఆగి అడుగుతుంది!

    std::cout &lt;&lt; "ID: " &lt;&lt; rollNumber &lt;&lt; " | Name: " &lt;&lt; studentName &lt;&lt; "\\n";
    return 0;
}</code></pre>
        </div>
      </div>
    </div>

    <!-- SECTION 4: FORMATTING -->
    <div class="section-title"><span class="num">4</span>అవుట్‌పుట్ ఫార్మాటింగ్: &lt;iomanip&gt; తో అద్భుతమైన డిస్‌ప్లే</div>
    <div class="section-body">
      <p>
        కరెన్సీ లేదా పర్సంటేజీలను ప్రింట్ చేసేటప్పుడు 2 డెసిమల్ ప్లేసెస్ మాత్రమే రావాలన్నా (ఉదా: <code>99.50</code>), లేదా టేబుల్ లాగా సమానమైన వెడల్పుతో కాలమ్స్ రావాలన్నా <code>&lt;iomanip&gt;</code> హెడర్ వాడతాం:
      </p>

      <ul style="line-height:1.8; margin-left:18px;">
        <li><code>std::fixed &lt;&lt; std::setprecision(2)</code>: కచ్చితంగా రెండు డెసిమల్ పాయింట్లు మాత్రమే చూపిస్తుంది.</li>
        <li><code>std::setw(15)</code>: కాలమ్ విడ్త్‌ను 15 క్యారెక్టర్లకు సెట్ చేస్తుంది.</li>
      </ul>
    </div>

    <!-- FAQ SECTION -->
    <div class="section-title"><span class="num">5</span>తరచుగా అడిగే ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div class="faq-card" style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px 18px; margin-bottom:12px;">
        <h4 style="color:#10b981; margin:0 0 6px 0; font-size:14.5px;">Q: యూజర్ ఇంటిజర్ బదులు అక్షరం టైప్ చేస్తే ప్రోగ్రామ్ క్రాష్ అవుతుందా?</h4>
        <p style="margin:0; font-size:13.5px; color:var(--text2); line-height:1.6;">
          క్రాష్ అవ్వదు, కానీ <code>std::cin</code> ఒక 'Fail State' లోకి వెళ్లిపోతుంది. తర్వాతి ఇన్‌పుట్‌లను తీసుకోదు. దీనిని పరిష్కరించడానికి <code>if (std::cin.fail()) { std::cin.clear(); }</code> వాడాలి.
        </p>
      </div>
    </div>

    <!-- PREV / NEXT NAVIGATION -->
    <div style="display:flex; justify-content:space-between; align-items:center; margin-top:40px; padding-top:20px; border-top:1px solid var(--border); flex-wrap:wrap; gap:16px;">
      <a href="/blog-cpp/02-cpp-variables-data-types.html" style="display:inline-flex; align-items:center; gap:8px; padding:10px 18px; border-radius:8px; background:var(--bg3); border:1px solid var(--border); color:var(--text); text-decoration:none; font-weight:700; font-size:13.5px;">
        ← Prev: 2. వేరియబుల్స్ & డేటా టైప్స్
      </a>
      <a href="/blog-cpp/04-cpp-operators-and-expressions.html" style="display:inline-flex; align-items:center; gap:8px; padding:10px 20px; border-radius:8px; background:linear-gradient(135deg, #10b981, #059669); color:#ffffff; text-decoration:none; font-weight:700; font-size:13.5px; box-shadow:0 2px 10px rgba(16,185,129,0.2);">
        Next: 4. ఆపరేటర్లు & ఎక్స్‌ప్రెషన్స్ →
      </a>
    </div>

  </main>`;

replaceMainContent(path.join(cppDir, '03-cpp-input-output-cin-cout.html'), ch03Main);

// ==========================================
// CHAPTER 04: OPERATORS & EXPRESSIONS
// ==========================================
const ch04Main = `<main class="content">
    <div class="breadcrumb">
      <a href="/">Home</a><span class="sep">›</span>
      <a href="/blog.html">Tutorials</a><span class="sep">›</span>
      <a href="/blog-cpp.html">C++ Masterclass</a><span class="sep">›</span>
      <span class="current">Chapter 4: Operators & Expressions</span>
    </div>

    <h1 class="page-title">ఆపరేటర్లు & ఎక్స్‌ప్రెషన్స్ (Operators, Precedence & Associativity)</h1>

    <div class="page-meta">
      <span class="badge">⚡ Modern C++20 / C++17</span>
      <span class="badge">🟢 Chapter 4 of 20</span>
      <span class="badge">📂 Phase 1: C++ Basics & Fundamentals</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

    <!-- Covered Topics Bar -->
    <div style="background:var(--bg3); border:1px solid var(--border); border-radius:8px; padding:10px 16px; margin-bottom:24px; font-size:13px; color:var(--text2); display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
      <span style="color:#10b981; font-weight:700;">📌 Covered in this chapter:</span>
      <span>Arithmetic, Relational & Logical Operators · Prefix (++i) vs Postfix (i++) Deep Dive · Short-Circuit Evaluation (&&, ||) · Bitwise Operators & Flag Masking · Operator Precedence Hierarchy · Integer Division Trap</span>
    </div>

    <!-- Intro Overview Box -->
    <div class="intro-box">
      వేరియబుల్స్‌పై లెక్కలు చేయాలన్నా, రెండు విలువలను పోల్చాలన్నా, లేదా హార్డ్‌వేర్ లెవల్‌లో బిట్లను మార్చాలన్నా <strong>ఆపరేటర్లు (Operators)</strong> ప్రాణాధారం. ఈ అధ్యాయంలో ఇంటర్వ్యూలలో ఎక్కువగా అడిగే <code>++i</code> vs <code>i++</code> తేడా, షార్ట్-సర్క్యూట్ ఇవాల్యుయేషన్ మరియు ఆపరేటర్ ప్రాధాన్యతా నియమాలను నేర్చుకుందాం.
    </div>

    <!-- SECTION 1 -->
    <div class="section-title"><span class="num">1</span>Prefix (++i) vs Postfix (i++): అసలైన అంతర్గత తేడా</div>
    <div class="section-body">
      <p>
        చాలామంది <code>++i</code> మరియు <code>i++</code> రెండూ ఒకటే అనుకుంటారు, ఎందుకంటే రెండూ విలువను 1 పెంచుతాయి. కానీ కంప్యూటర్ మెమరీలో జరిగే ప్రక్రియ పూర్తిగా వేరు:
      </p>

      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:16px; margin:16px 0;">
        <div style="background:var(--bg2); border:1px solid #10b981; border-radius:8px; padding:16px;">
          <h4 style="color:#10b981; margin:0 0 8px 0; font-size:14px;">⚡ Prefix: ++i (Increment Then Use)</h4>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.6;">
            ముందుగా మెమరీలోని విలువను వెంటనే 1 పెంచి, ఆ తర్వాత నవీకరించబడిన తాజా విలువనే నేరుగా రిటర్న్ చేస్తుంది. ఎటువంటి తాత్కాలిక కాపీ క్రియేట్ కాదు. అందుకే ఇది అత్యంత వేగవంతమైనది!
          </p>
        </div>
        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px;">
          <h4 style="color:#ef4444; margin:0 0 8px 0; font-size:14px;">🐢 Postfix: i++ (Use Then Increment)</h4>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.6;">
            ఇది పాత విలువను ఒక తాత్కాలిక వేరియబుల్‌లో కాపీ చేసుకుంటుంది, ఆ తర్వాత ఒరిజినల్ వేరియబుల్‌ను 1 పెంచుతుంది, కానీ ఈ ఎక్స్‌ప్రెషన్‌కు మాత్రం పాత విలువను ఇస్తుంది. తాత్కాలిక కాపీ వల్ల కొద్దిగా ఓవర్‌హెడ్ ఉంటుంది.
          </p>
        </div>
      </div>

      <div style="margin-top: 16px; margin-bottom: 12px;">
        <div style="font-size:13.5px; font-weight:700; color:#10b981; margin-bottom:6px;">💻 Example 1: Prefix vs Postfix in Action</div>
        <div class="code-block">
          <div class="code-block-header">
            <span class="lang-tag">C++17</span>
            <a class="try-btn" href="/online-cpp-compiler.html">▶ Run in Compiler</a>
          </div>
          <pre><code>#include &lt;iostream&gt;

int main() {
    int a = 5;
    int b = 5;

    int res1 = ++a; // a becomes 6, res1 receives 6
    int res2 = b++; // res2 receives 5, then b becomes 6

    std::cout &lt;&lt; "Prefix:  a = " &lt;&lt; a &lt;&lt; ", res1 = " &lt;&lt; res1 &lt;&lt; "\\n"
              &lt;&lt; "Postfix: b = " &lt;&lt; b &lt;&lt; ", res2 = " &lt;&lt; res2 &lt;&lt; "\\n";
    return 0;
}</code></pre>
        </div>
      </div>
    </div>

    <!-- SECTION 2 -->
    <div class="section-title"><span class="num">2</span>Short-Circuit Evaluation: లాజికల్ సేఫ్టీ షీల్డ్</div>
    <div class="section-body">
      <p>
        C++ లో <code>&amp;&amp;</code> (AND) మరియు <code>||</code> (OR) ఆపరేటర్లు <strong>షార్ట్-సర్క్యూట్</strong> సూత్రంపై పనిచేస్తాయి:
      </p>
      <ul style="line-height:1.8; margin-left:18px;">
        <li><code>A &amp;&amp; B</code>: మొదటి కండిషన్ <code>A</code> గనుక <strong>false</strong> అయితే, రెండవ కండిషన్ <code>B</code> ని కంపైలర్ అస్సలు టచ్ చేయదు! ఎందుకంటే ఒకటి false అయితే మొత్తం false అని CPU కి ముందే తెలుసు.</li>
        <li><code>A || B</code>: మొదటి కండిషన్ <code>A</code> గనుక <strong>true</strong> అయితే, రెండవ కండిషన్ <code>B</code> ని అస్సలు రన్ చేయదు.</li>
      </ul>

      <div class="concept-box">
        <h4>🛡️ Real-World Lifesaver: Crash Prevention</h4>
        <p style="margin:0;">
          పాయింటర్లు చెక్ చేసేటప్పుడు <code>if (ptr != nullptr &amp;&amp; ptr-&gt;hasData())</code> అని రాస్తాం. ఒకవేళ <code>ptr</code> నల్ అయితే మొదటి కండిషన్ ఫెయిల్ అయి అక్కడితో ఆగిపోతుంది; రెండవ పార్ట్ రన్ అవ్వదు కాబట్టి సాఫ్ట్‌వేర్ క్రాష్ అవ్వకుండా సురక్షితంగా రక్షించబడుతుంది!
        </p>
      </div>
    </div>

    <!-- SECTION 3: OPERATOR PRECEDENCE (CLEAN HTML HIERARCHY CARDS INSTEAD OF ASCII) -->
    <div class="section-title"><span class="num">3</span>ఆపరేటర్ ప్రాధాన్యతా నియమాలు (Operator Precedence)</div>
    <div class="section-body">
      <p>
        గణితంలో BODMAS లాగే C++ లో కూడా ఏ ఆపరేటర్ మొదట సాల్వ్ అవ్వాలో కంపైలర్‌కు కచ్చితమైన నియమాలు ఉంటాయి:
      </p>

      <!-- Sleek Modern Precedence Hierarchy Cards -->
      <div style="display:flex; flex-direction:column; gap:8px; margin:16px 0;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #10b981; border-radius:6px; padding:10px 14px; display:flex; justify-content:space-between; align-items:center;">
          <span style="font-weight:700; color:var(--text); font-size:13.5px;">Level 1 (Highest): Parentheses & Scope</span>
          <code style="color:#10b981; font-weight:700;">()  []  ::  .  -&gt;</code>
        </div>
        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #3b82f6; border-radius:6px; padding:10px 14px; display:flex; justify-content:space-between; align-items:center;">
          <span style="font-weight:700; color:var(--text); font-size:13.5px;">Level 2: Unary Operators</span>
          <code style="color:#3b82f6; font-weight:700;">++  --  !  ~  sizeof  * (deref)  & (address)</code>
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

    <!-- SECTION 4: PITFALLS -->
    <div class="section-title"><span class="num">4</span>బిగినర్స్ చేసే ఘోరమైన తప్పులు (Beginner Pitfalls)</div>
    <div class="section-body">
      <div style="display:flex; flex-direction:column; gap:12px; margin:14px 0;">
        <div style="background:var(--bg2); border:1px solid rgba(239,68,68,0.3); border-left:4px solid #ef4444; border-radius:8px; padding:14px 18px;">
          <div style="font-weight:700; color:#ef4444; font-size:14px;">❌ Trap 1: Integer Division Trap (5 / 2 = 2)</div>
          <p style="font-size:13.5px; color:var(--text); margin:6px 0 0 0; line-height:1.6;">
            రెండు పూర్ణాంకాలను భాగిస్తే (<code>5 / 2</code>) C++ లో ఫలితం <code>2</code> మాత్రమే వస్తుంది (దశాంస భాగం కత్తిరించబడుతుంది). కనీసం ఒక్క వేరియబుల్‌నైనా <code>static_cast&lt;double&gt;(a) / b</code> అని డబుల్‌గా మార్చితేనే కచ్చితమైన <code>2.5</code> వస్తుంది!
          </p>
        </div>

        <div style="background:var(--bg2); border:1px solid rgba(239,68,68,0.3); border-left:4px solid #ef4444; border-radius:8px; padding:14px 18px;">
          <div style="font-weight:700; color:#ef4444; font-size:14px;">❌ Trap 2: = (Assignment) vs == (Equality Check)</div>
          <p style="font-size:13.5px; color:var(--text); margin:6px 0 0 0; line-height:1.6;">
            కండిషన్‌లో <code>if (score == 100)</code> రాయడానికి బదులుగా పొరపాటున <code>if (score = 100)</code> రాస్తే అది ఎప్పటికీ <strong>true</strong> అవుతుంది! ఎందుకంటే 100 ని అసైన్ చేసి ఆ నాన్-జీరో విలువనే కండిషన్‌గా తీసుకుంటుంది.
          </p>
        </div>
      </div>
    </div>

    <!-- PREV / NEXT NAVIGATION -->
    <div style="display:flex; justify-content:space-between; align-items:center; margin-top:40px; padding-top:20px; border-top:1px solid var(--border); flex-wrap:wrap; gap:16px;">
      <a href="/blog-cpp/03-cpp-input-output-cin-cout.html" style="display:inline-flex; align-items:center; gap:8px; padding:10px 18px; border-radius:8px; background:var(--bg3); border:1px solid var(--border); color:var(--text); text-decoration:none; font-weight:700; font-size:13.5px;">
        ← Prev: 3. ఇన్‌పుట్ & అవుట్‌పుట్
      </a>
      <a href="/blog-cpp/05-cpp-if-else-conditionals.html" style="display:inline-flex; align-items:center; gap:8px; padding:10px 20px; border-radius:8px; background:linear-gradient(135deg, #10b981, #059669); color:#ffffff; text-decoration:none; font-weight:700; font-size:13.5px; box-shadow:0 2px 10px rgba(16,185,129,0.2);">
        Next: 5. కండిషనల్స్ (if-else) →
      </a>
    </div>

  </main>`;

replaceMainContent(path.join(cppDir, '04-cpp-operators-and-expressions.html'), ch04Main);
