const fs = require('fs');
const path = require('path');

const phase03Files = [
  '09-cpp-functions-and-overloading.html',
  '10-cpp-arrays-and-strings.html',
  '11-cpp-pointers-and-references.html',
  '12-cpp-dynamic-memory-smart-pointers.html'
];

console.log('=== AUDITING C++ MASTERCLASS PHASE 03 (CHAPTERS 09 - 12) ===\n');

let totalChars = 0;
let allPassed = true;

phase03Files.forEach((file, index) => {
  const filePath = path.join(__dirname, '..', 'public', 'blog-cpp', file);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ [Ch ${index + 9}] File not found: ${file}`);
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
    hasCompilerIntegration: content.includes('openInteractiveCompiler()') && content.includes('/online-cpp-compiler.html')
  };

  const failed = Object.keys(checks).filter(k => !checks[k]);
  if (failed.length === 0) {
    console.log(`✅ [Ch ${index + 9}] ${file}: PASS (${content.length.toLocaleString()} chars)`);
  } else {
    console.error(`❌ [Ch ${index + 9}] ${file}: FAIL -> ${failed.join(', ')}`);
    allPassed = false;
  }
});

console.log('\n-------------------------------------------------------------');
console.log(`Total Phase 03 Character Count: ${totalChars.toLocaleString()} characters`);
console.log(`Phase 03 Audit Result: ${allPassed ? '100% PERFECT PASS ✅' : 'FAILED ❌'}`);
console.log('-------------------------------------------------------------');

if (!allPassed) process.exit(1);
