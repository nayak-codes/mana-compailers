const fs = require('fs');
const path = require('path');

const phase02Files = [
  '06-python-conditional-statements-branching.html',
  '07-python-loops-while-and-for.html',
  '08-python-loop-control-break-continue-else.html',
  '09-python-strings-deep-dive-slicing.html',
  '10-python-regular-expressions-regex.html'
];

console.log('====================================================');
console.log('     PHASE 02 PYTHON MASTERCLASS AUDIT REPORT       ');
console.log('====================================================\n');

let totalSize = 0;
let allPassed = true;

phase02Files.forEach((file, index) => {
  const filePath = path.join(__dirname, '..', 'public', 'blog-python', file);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ [Ch ${index + 6}] File missing: ${file}`);
    allPassed = false;
    return;
  }

  const content = fs.readFileSync(filePath, 'utf8');
  totalSize += content.length;

  const checks = {
    minSize: content.length >= 45000,
    has13Sections: (content.match(/<h2 class="section-title"><span class="num">(\d+)<\/span>/g) || []).length >= 13,
    hasIvoryBox: content.includes('class="intro-box"'),
    hasSingleSidebar: (content.match(/<aside class="sidebar"/g) || []).length === 1,
    hasSiteNavPlaceholder: content.includes('id="site-nav-placeholder"'),
    hasLayoutClass: content.includes('class="layout"'),
    hasLightClass: content.includes('class="lang-python light-theme"'),
    has5Quizzes: (content.match(/<details/g) || []).length >= 5,
    hasMin3CodeBlocks: (content.match(/class="code-block"/g) || []).length >= 3,
    hasCompilerIntegration: content.includes('openInteractiveCompiler()') && content.includes('/online-python-compiler.html'),
    hasBreadcrumb: content.includes('class="breadcrumb"') && content.includes('<span class="sep">›</span>'),
    hasPageTitle: content.includes('class="page-title"'),
    hasPageMeta: content.includes('class="page-meta"'),
    hasCoveredPill: content.includes('📌 Covered in this chapter:'),
    hasNotoSansTelugu: content.includes('Noto+Sans+Telugu')
  };

  const failed = Object.keys(checks).filter(k => !checks[k]);
  if (failed.length === 0) {
    console.log(`✅ Chapter ${index + 6} (${file}): ${content.length.toLocaleString()} chars, 15/15 PASS`);
  } else {
    console.error(`❌ Chapter ${index + 6} (${file}) FAILED CHECKS: ${failed.join(', ')}`);
    allPassed = false;
  }
});

console.log('\n----------------------------------------------------');
console.log(`Total Phase 02 Size: ${totalSize.toLocaleString()} characters`);
console.log(`Average Chapter Size: ${Math.round(totalSize / phase02Files.length).toLocaleString()} characters`);

if (allPassed) {
  console.log('🎉 PHASE 02 COMPLETE & 100% FLAWLESS!');
  process.exit(0);
} else {
  console.error('❌ SOME CHECKS FAILED IN PHASE 02');
  process.exit(1);
}
