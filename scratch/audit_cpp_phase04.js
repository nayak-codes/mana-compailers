const fs = require('fs');
const path = require('path');

const phase04Files = [
  '13-cpp-classes-and-objects.html',
  '14-cpp-constructors-and-destructors.html',
  '15-cpp-inheritance.html',
  '16-cpp-polymorphism-virtual-functions.html',
  '17-cpp-operator-overloading.html'
];

console.log('=== AUDITING C++ MASTERCLASS PHASE 04 (CHAPTERS 13 - 17) ===\n');

let totalChars = 0;
let allPassed = true;

phase04Files.forEach((file, index) => {
  const filePath = path.join(__dirname, '..', 'public', 'blog-cpp', file);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ [Ch ${index + 13}] File not found: ${file}`);
    allPassed = false;
    return;
  }
  const content = fs.readFileSync(filePath, 'utf8');
  totalChars += content.length;

  const checks = {
    minChars: content.length >= 45000,
    has13Sections: (content.match(/<h2 class="section-title"><span class="num">(\d+)<\/span>/g) || []).length >= 13,
    hasSingleSidebar: (content.match(/<aside class="sidebar"/g) || []).length === 1,
    hasSiteNavPlaceholder: content.includes('id="site-nav-placeholder"'),
    hasBreadcrumb: content.includes('class="breadcrumb"') && content.includes('<span class="sep">›</span>'),
    hasPageTitle: content.includes('class="page-title"'),
    hasPageMeta: content.includes('class="page-meta"'),
    hasCoveredPill: content.includes('📌 Covered in this chapter:'),
    hasIvoryBox: content.includes('class="intro-box"'),
    has5Quizzes: (content.match(/<details/g) || []).length >= 5,
    hasMin5CodeBlocks: (content.match(/class="code-block"/g) || []).length >= 5,
    hasCompilerIntegration: content.includes('openInteractiveCompiler()') && content.includes('/online-cpp-compiler.html')
  };

  const failed = Object.keys(checks).filter(k => !checks[k]);
  if (failed.length === 0) {
    console.log(`✅ [Ch ${index + 13}] ${file}: PASS (${content.length.toLocaleString()} chars)`);
  } else {
    console.error(`❌ [Ch ${index + 13}] ${file}: FAIL -> ${failed.join(', ')}`);
    allPassed = false;
  }
});

console.log('\n-------------------------------------------------------------');
console.log(`Total Phase 04 Character Count: ${totalChars.toLocaleString()} characters`);
console.log(`Phase 04 Audit Result: ${allPassed ? '100% PERFECT PASS ✅' : 'FAILED ❌'}`);
console.log('-------------------------------------------------------------');

if (!allPassed) process.exit(1);
