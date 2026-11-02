const fs = require('fs');
const path = require('path');

const phase5Files = [
  '21-python-exception-handling.html',
  '22-python-oop-classes-and-objects.html',
  '23-python-oop-inheritance-polymorphism.html',
  '24-python-decorators-generators-dunder.html',
  '25-python-capstone-project.html'
];

console.log('================================================================');
console.log('   AUDITING PYTHON MASTERCLASS PHASE 05 (CHAPTERS 21 - 25)');
console.log('================================================================\n');

let allPassed = true;
let totalChars = 0;

phase5Files.forEach((file, idx) => {
  const filePath = path.join(__dirname, '..', 'public', 'blog-python', file);
  const chapterNum = 21 + idx;

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
    console.log(`✅ Chapter ${chapterNum} [${file}]: PASS (${content.length.toLocaleString()} chars, ${(content.match(/class="code-block"/g) || []).length} code blocks)`);
  } else {
    console.error(`❌ Chapter ${chapterNum} [${file}]: FAILED (${content.length.toLocaleString()} chars) ->`, failedKeys.join(', '));
    allPassed = false;
  }
});

console.log('\n----------------------------------------------------------------');
console.log(`Phase 05 Total Characters: ${totalChars.toLocaleString()} chars`);
console.log(`Phase 05 Average per Chapter: ${Math.round(totalChars / phase5Files.length).toLocaleString()} chars`);

if (allPassed) {
  console.log('🎉 100% PASS: All Phase 05 chapters passed every standard quality check!');
  process.exit(0);
} else {
  console.error('💥 Phase 05 audit failed some quality criteria.');
  process.exit(1);
}

