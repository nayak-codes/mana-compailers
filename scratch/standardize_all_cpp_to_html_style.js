const fs = require('fs');
const path = require('path');
const { LESSONS, buildSidebar } = require('./cpp_curriculum_data.js');

console.log('=== STANDARDIZING ALL C++ TUTORIALS TO EXACT HTML MASTERCLASS STYLE ===');

for (let i = 0; i < 9; i++) {
  const lesson = LESSONS[i];
  const filePath = path.join(__dirname, '..', 'public', 'blog-cpp', lesson.file);

  if (!fs.existsSync(filePath)) {
    console.warn(`File not found: ${lesson.file}`);
    continue;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Replace sidebar with the updated buildSidebar
  const sidebarRegex = /<!-- LEFT SIDEBAR ACCORDION -->\s*<aside class="sidebar">[\s\S]*?<\/aside>/;
  const newSidebar = buildSidebar(lesson.num);
  if (sidebarRegex.test(content)) {
    content = content.replace(sidebarRegex, newSidebar);
  }

  // 2. Identify <main class="content"> and first section
  const mainStart = '<main class="content">';
  const mainIdx = content.indexOf(mainStart);
  
  // Find where section 1 begins
  let firstSectionIdx = content.indexOf('<!-- SECTION 1 -->');
  if (firstSectionIdx === -1) {
    firstSectionIdx = content.indexOf('<section>');
  }

  if (mainIdx !== -1 && firstSectionIdx !== -1) {
    const beforeMainContent = content.substring(0, mainIdx + mainStart.length);
    const mainHeaderSection = content.substring(mainIdx + mainStart.length, firstSectionIdx);
    const afterFirstSection = content.substring(firstSectionIdx);

    // Extract intro-box paragraphs from the existing content
    let introParagraphs = [];
    const introBoxMatch = mainHeaderSection.match(/<div class="intro-box">([\s\S]*?)<\/div>/);
    if (introBoxMatch) {
      const introInner = introBoxMatch[1];
      // Extract all <p>...</p> tags
      const pMatches = introInner.match(/<p[\s\S]*?<\/p>/g);
      if (pMatches && pMatches.length > 0) {
        introParagraphs = pMatches.map(p => {
          // clean any residual inline style if present
          return p.replace(/style="margin-bottom:0;"/g, '').trim();
        });
      }
    }

    if (introParagraphs.length === 0) {
      introParagraphs = [
        `<p>${lesson.title} సమగ్ర మాస్టర్‌క్లాస్‌కు స్వాగతం! C++ ప్రోగ్రామింగ్ ప్రపంచంలో ఈ కాన్సెప్ట్ అత్యంత కీలకమైన పునాదిగా పనిచేస్తుంది.</p>`,
        `<p>ఈ అధ్యాయంలో మనం థియరీతో పాటు ప్రాక్టికల్ అసెంబ్లీ ఆర్కిటెక్చర్, ఇండస్ట్రీ బెస్ట్ ప్రాక్టీసెస్ మరియు రియల్-వరల్డ్ ప్రాజెక్ట్‌లను లోతుగా నేర్చుకుందాం!</p>`
      ];
    }

    const newHeaderBlock = `

    <!-- BREADCRUMB -->
    <div class="breadcrumb">
      <a href="/">Home</a><span class="sep">›</span>
      <a href="/blog.html">Tutorials</a><span class="sep">›</span>
      <a href="/blog-cpp.html">C++ Masterclass</a><span class="sep">›</span>
      <span class="current">Chapter ${lesson.num}: ${lesson.title}</span>
    </div>

    <!-- PAGE TITLE -->
    <h1 class="page-title">${lesson.title}</h1>

    <!-- PAGE META BADGES -->
    <div class="page-meta">
      <span class="badge">🌐 Modern C++ (C++20/C++17)</span>
      <span class="badge">🟢 Chapter ${lesson.num} of 20</span>
      <span class="badge">📂 ${lesson.phaseTag}: ${lesson.phaseTitle}</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

    <!-- SUBTOPICS PILL BAR -->
    <div style="background:var(--bg3); border:1px solid var(--border); border-radius:8px; padding:10px 16px; margin-bottom:24px; font-size:13px; color:var(--text2); display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
      <span style="color:#10b981; font-weight:700;">📌 Covered in this chapter:</span>
      <span>${lesson.subtopics}</span>
    </div>

    <!-- INTRO ACCENT BOX (Warm Ivory with Green Accent) -->
    <div class="intro-box">
      ${introParagraphs.join('\n      ')}
    </div>

    `;

    content = beforeMainContent + newHeaderBlock + afterFirstSection;
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Ch 0${lesson.num} (${lesson.file}): Successfully standardized to HTML style! (${content.length.toLocaleString()} chars)`);
  } else {
    console.warn(`Could not locate main or section in ${lesson.file}`);
  }
}

console.log('\n🎉 ALL 9 CHAPTERS STANDARDIZED SUCCESSFULLY!');

