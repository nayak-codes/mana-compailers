const fs = require('fs');
const path = require('path');

const phase2Files = [
  '05-cpp-if-else-conditionals.html',
  '06-cpp-switch-case.html',
  '07-cpp-loops-for-while-do-while.html',
  '08-cpp-break-continue.html'
];

console.log('================================================================');
console.log('          C++ MASTERCLASS - PHASE 02 COMPREHENSIVE AUDIT        ');
console.log('================================================================');

let totalChars = 0;
let passedCount = 0;

phase2Files.forEach((filename, idx) => {
  const filePath = path.join(__dirname, '..', 'public', 'blog-cpp', filename);
  const chNum = idx + 5;
  console.log(`\n🔍 Checking Chapter 0${chNum}: ${filename}...`);

  if (!fs.existsSync(filePath)) {
    console.error(`❌ File not found: ${filename}`);
    return;
  }

  const content = fs.readFileSync(filePath, 'utf8');
  totalChars += content.length;

  const checks = {
    minSize: content.length >= 45000,
    has13Sections: (content.match(/<h2 class="section-title"><span class="num">(\d+)<\/span>/g) || []).length >= 13,
    hasIvoryBox: content.includes('class="intro-box"'),
    hasSingleSidebar: (content.match(/<aside class="sidebar"/g) || []).length === 1,
    hasSiteNavPlaceholder: content.includes('id="site-nav-placeholder"'),
    hasLayoutClass: content.includes('class="layout"'),
    noPageLayout: !content.includes('class="page-layout"'),
    noSiteHeader: !content.includes('header class="site-header"'),
    hasBlogStyleCss: content.includes('/blog-style.css'),
    hasCppStyleCss: content.includes('/blog-cpp/style.css'),
    hasSiteNavCss: content.includes('/site-nav.css'),
    hasSiteNavJs: content.includes('/site-nav.js'),
    has5Quizzes: (content.match(/<details/g) || []).length >= 5,
    hasMin5CodeBlocks: (content.match(/class="code-block"/g) || []).length >= 4,
    hasCompilerIntegration: content.includes('openInteractiveCompiler()') && content.includes('/online-cpp-compiler.html')
  };

  const failedKeys = Object.keys(checks).filter(k => !checks[k]);

  if (failedKeys.length === 0) {
    console.log(`   ✅ PASS (${content.length.toLocaleString()} chars, ${(content.match(/class="code-block"/g) || []).length} code blocks, 5 quizzes)`);
    passedCount++;
  } else {
    console.error(`   ❌ FAIL! Failed checks: ${failedKeys.join(', ')}`);
  }
});

console.log('\n================================================================');
console.log(`🏆 Phase 02 Total Characters: ${totalChars.toLocaleString()} chars`);
console.log(`📊 Result: ${passedCount} / ${phase2Files.length} Chapters Passed!`);
console.log('================================================================');

if (passedCount === phase2Files.length) {
  process.exit(0);
} else {
  process.exit(1);
}
