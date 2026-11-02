const fs = require('fs');
const path = require('path');

const phase4Files = [
  '16-python-functions-fundamentals.html',
  '17-python-args-kwargs-variable-scope.html',
  '18-python-lambda-recursion-functional.html',
  '19-python-modules-packages-and-pip.html',
  '20-python-file-handling-and-json.html'
];

console.log('================================================================');
console.log('   AUDITING PYTHON MASTERCLASS PHASE 04 (CHAPTERS 16 - 20)');
console.log('================================================================\n');

let allPassed = true;
let totalChars = 0;

phase4Files.forEach((file, idx) => {
  const filePath = path.join(__dirname, '..', 'public', 'blog-python', file);
  const chapterNum = 16 + idx;

  if (!fs.existsSync(filePath)) {
    console.error(`❌ Chapter ${chapterNum} (${file}) NOT FOUND!`);
    allPassed = false;
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
    console.log(`✅ Chapter ${chapterNum} [${file}]: PASS (${content.length.toLocaleString()} chars)`);
  } else {
    console.error(`❌ Chapter ${chapterNum} [${file}]: FAIL -> Missing: ${failedKeys.join(', ')}`);
    allPassed = false;
  }
});

console.log('\n----------------------------------------------------------------');
console.log(`Total Phase 04 Content Size: ${totalChars.toLocaleString()} characters`);
console.log(`Average Chapter Size: ${Math.round(totalChars / phase4Files.length).toLocaleString()} characters`);
console.log('----------------------------------------------------------------\n');

if (allPassed) {
  console.log('🎉 100% AUDIT PASS: All 5 Chapters of Python Phase 04 meet all criteria!\n');
  process.exit(0);
} else {
  console.error('❌ PHASE 04 AUDIT FAILED. Check errors above.');
  process.exit(1);
}

