const fs = require('fs');
const path = require('path');
const { LESSONS } = require('./csharp_curriculum_data');

console.log('====================================================');
console.log('AUDITING C# MASTERCLASS PHASE 04 (CHAPTERS 13 TO 16)');
console.log('====================================================\n');

let totalChars = 0;
let allPassed = true;

for (let i = 12; i < 16; i++) {
  const lesson = LESSONS[i];
  const filePath = path.join(__dirname, '..', 'public', 'blog-csharp', lesson.file);
  
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Chapter ${lesson.id}: File NOT FOUND: ${lesson.file}`);
    allPassed = false;
    continue;
  }

  const content = fs.readFileSync(filePath, 'utf8');
  totalChars += content.length;

  const checks = {
    minSize: content.length >= 40000,
    has13Sections: (content.match(/<h2 class="section-title"><span class="num">(\d+)<\/span>/g) || []).length >= 13,
    hasIvoryBox: content.includes('class="intro-box"'),
    hasSingleSidebar: (content.match(/<aside class="sidebar"/g) || []).length === 1,
    hasSiteNavPlaceholder: content.includes('id="site-nav-placeholder"'),
    hasLayoutClass: content.includes('class="layout"'),
    noPageLayout: !content.includes('class="page-layout"'),
    noSiteHeader: !content.includes('header class="site-header"'),
    hasBlogStyleCss: content.includes('/blog-style.css'),
    hasCSharpStyleCss: content.includes('/blog-csharp/style.css'),
    hasSiteNavCss: content.includes('/site-nav.css'),
    has5Quizzes: (content.match(/<details/g) || []).length >= 5,
    hasCompilerIntegration: content.includes('openInteractiveCompiler()')
  };

  const failedKeys = Object.keys(checks).filter(k => !checks[k]);

  if (failedKeys.length === 0) {
    console.log(`✅ Chapter ${lesson.id}: ${lesson.file}`);
    console.log(`   Size: ${content.length.toLocaleString()} chars | 13 Sections: OK | IntroBox: Ivory OK | Sidebar: Clean OK | Quiz: 5 Qs OK`);
  } else {
    console.error(`❌ Chapter ${lesson.id}: FAILED CHECKS: ${failedKeys.join(', ')}`);
    allPassed = false;
  }
}

console.log('\n----------------------------------------------------');
console.log(`Phase 04 Total Characters: ${totalChars.toLocaleString()} characters`);
console.log(`Overall Phase 04 Status: ${allPassed ? '🏆 100% PERFECT PASS' : '❌ HAS FAILURES'}`);
console.log('----------------------------------------------------');
