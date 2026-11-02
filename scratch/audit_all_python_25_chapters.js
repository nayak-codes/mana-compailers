const fs = require('fs');
const path = require('path');
const { LESSONS } = require('./python_curriculum_data.js');

console.log('================================================================');
console.log('    AUDITING COMPLETE PYTHON MASTERCLASS (ALL 25 CHAPTERS)');
console.log('================================================================\n');

let allPassed = true;
let totalChars = 0;
let phaseStats = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

LESSONS.forEach((lesson) => {
  const filePath = path.join(__dirname, '..', 'public', 'blog-python', lesson.file);

  if (!fs.existsSync(filePath)) {
    console.error(`❌ Chapter ${lesson.num} (${lesson.file}) NOT FOUND!`);
    allPassed = false;
    return;
  }

  const content = fs.readFileSync(filePath, 'utf8');
  totalChars += content.length;
  phaseStats[lesson.phase] = (phaseStats[lesson.phase] || 0) + content.length;

  const checks = {
    minSize: content.length >= 45000,
    has13Sections: (content.match(/<h2 class="section-title"><span class="num">(\d+)<\/span>/g) || []).length >= 13,
    hasIvoryBox: content.includes('class="intro-box"'),
    hasSingleSidebar: (content.match(/<aside class="sidebar"/g) || []).length === 1,
    hasSiteNavPlaceholder: content.includes('id="site-nav-placeholder"'),
    hasLayoutClass: content.includes('class="layout"'),
    hasLightClass: content.includes('class="lang-python light-theme"'),
    noPageLayout: !content.includes('class="page-layout"'),
    noSiteHeader: !content.includes('header class="site-header"'),
    hasBlogStyleCss: content.includes('/blog-style.css'),
    hasPythonStyleCss: content.includes('/blog-python/style.css'),
    hasSiteNavCss: content.includes('/site-nav.css'),
    hasSiteNavJs: content.includes('/site-nav.js'),
    has5Quizzes: (content.match(/<details/g) || []).length >= 5,
    hasMin3CodeBlocks: (content.match(/class="code-block"/g) || []).length >= 3,
    hasCompilerIntegration: content.includes('openInteractiveCompiler()') && content.includes('/online-python-compiler.html'),
    hasBreadcrumb: content.includes('class="breadcrumb"') && content.includes('<span class="sep">›</span>'),
    hasPageTitle: content.includes('class="page-title"'),
    hasPageMeta: content.includes('class="page-meta"'),
    hasCoveredPill: content.includes('📌 Covered in this chapter:'),
    hasNotoSansTelugu: content.includes('Noto+Sans+Telugu')
  };

  const failedKeys = Object.keys(checks).filter(k => !checks[k]);

  if (failedKeys.length === 0) {
    console.log(`✅ Chapter ${String(lesson.num).padStart(2, '0')} [${lesson.file}]: PASS (${content.length.toLocaleString()} chars)`);
  } else {
    console.error(`❌ Chapter ${String(lesson.num).padStart(2, '0')} [${lesson.file}]: FAILED (${content.length.toLocaleString()} chars) ->`, failedKeys.join(', '));
    allPassed = false;
  }
});

console.log('\n================================================================');
console.log('                     PHASE BREAKDOWN');
console.log('================================================================');
for (let p = 1; p <= 5; p++) {
  console.log(`Phase 0${p}: ${phaseStats[p].toLocaleString()} chars (Avg: ${Math.round(phaseStats[p] / 5).toLocaleString()} chars/ch)`);
}
console.log('----------------------------------------------------------------');
console.log(`Grand Total Characters Across 25 Chapters: ${totalChars.toLocaleString()} chars`);
console.log(`Overall Average per Chapter: ${Math.round(totalChars / 25).toLocaleString()} chars`);
console.log('================================================================\n');

if (allPassed) {
  console.log('🏆 100% PASS: All 25 chapters of the Modern Python 3 Masterclass meet all standards!');
  process.exit(0);
} else {
  console.error('💥 Master audit failed some quality criteria.');
  process.exit(1);
}

