const fs = require('fs');
const path = require('path');
const { LESSONS, buildSidebar } = require('./cpp_curriculum_data.js');

const ch6 = LESSONS[5]; // Chapter 6
const filePath = path.join(__dirname, '..', 'public', 'blog-cpp', ch6.file);
let content = fs.readFileSync(filePath, 'utf8');

// Replace sidebar
const sidebarRegex = /<!-- LEFT SIDEBAR ACCORDION -->\s*<aside class="sidebar">[\s\S]*?<\/aside>/;
const newSidebar = buildSidebar(6);
content = content.replace(sidebarRegex, newSidebar);

// Match between <main class="content"> and first <!-- SECTION 1 --> or <section>
const mainStart = '<main class="content">';
const firstSectionIdx = content.indexOf('<!-- SECTION 1 -->');

if (content.includes(mainStart) && firstSectionIdx !== -1) {
  const mainIdx = content.indexOf(mainStart) + mainStart.length;
  const beforeHeader = content.substring(0, mainIdx);
  const afterHeader = content.substring(firstSectionIdx);

  const newHeader = `
    <!-- BREADCRUMB -->
    <div class="breadcrumb">
      <a href="/">Home</a><span class="sep">›</span>
      <a href="/blog.html">Tutorials</a><span class="sep">›</span>
      <a href="/blog-cpp.html">C++ Masterclass</a><span class="sep">›</span>
      <span class="current">Chapter 6: ${ch6.title}</span>
    </div>

    <!-- PAGE TITLE -->
    <h1 class="page-title">${ch6.title}</h1>

    <!-- PAGE META BADGES -->
    <div class="page-meta">
      <span class="badge">🌐 Modern C++ (C++20/C++17)</span>
      <span class="badge">🟢 Chapter 6 of 20</span>
      <span class="badge">📂 ${ch6.phaseTag}: ${ch6.phaseTitle}</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

    <!-- SUBTOPICS PILL BAR -->
    <div style="background:var(--bg3); border:1px solid var(--border); border-radius:8px; padding:10px 16px; margin-bottom:24px; font-size:13px; color:var(--text2); display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
      <span style="color:#10b981; font-weight:700;">📌 Covered in this chapter:</span>
      <span>${ch6.subtopics}</span>
    </div>

    <!-- INTRO ACCENT BOX (Warm Ivory with Green Accent) -->
    <div class="intro-box">
      <p>మునుపటి అధ్యాయంలో మనం <code>if - else if - else</code> లాడర్ ద్వారా వివిధ నిబంధనలను ఎలా పరీక్షించవచ్చో నేర్చుకున్నాం. కానీ ఒకే వేరియబుల్ యొక్క బహుళ నిర్దిష్ట స్థిర విలువల (Fixed Constants or Enums) ఆధారంగా నిర్ణయాలు తీసుకోవాల్సి వచ్చినప్పుడు, పది పన్నెండు <code>else if</code> లు రాయడం కోడ్‌ను సంక్లిష్టంగా మార్చడమే కాకుండా, పెర్ఫార్మెన్స్‌ను తగ్గిస్తుంది.</p>
      <p>ఇటువంటి పరిస్థితులలో C++ మనకు అందించే అత్యంత వేగవంతమైన, క్లీన్ కంట్రోల్ స్ట్రక్చర్ <strong><code>switch</code> స్టేట్‌మెంట్</strong>. ఇది బహుళ అవకాశాల నుండి సరైన మార్గాన్ని ఎంచుకోవడానికి అసెంబ్లీ స్థాయిలో జంప్ టేబుల్స్ (Jump Tables) ద్వారా O(1) వేగంతో పనిచేస్తుంది.</p>
      <p>ఈ సమగ్ర మాస్టర్‌క్లాస్‌లో మనం switch సింటాక్స్, Jump Tables అంతర్గత పనితీరు, [[fallthrough]] అట్రిబ్యూట్, C++17 switch with Initializer, Scoped Enums (enum class), మరియు పూర్తి స్థాయి Enterprise ATM State Machine ప్రాజెక్ట్‌ను క్షుణ్ణంగా నేర్చుకుందాం!</p>
    </div>

    `;

  content = beforeHeader + newHeader + afterHeader;
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('✅ Updated Chapter 06 to exact HTML style!');
} else {
  console.error('Could not find markers');
}
