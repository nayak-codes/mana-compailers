const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'public', 'blog-python', '24-python-decorators-generators-dunder.html');

console.log('=== VERIFYING PYTHON MASTERCLASS CHAPTER 24 ===\n');

if (!fs.existsSync(filePath)) {
  console.error('❌ File not found:', filePath);
  process.exit(1);
}

const content = fs.readFileSync(filePath, 'utf8');
console.log('File size:', content.length.toLocaleString(), 'characters');

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
  console.log('✅ All checks passed successfully for Python Chapter 24!');
  console.log('   - File Size: ' + content.length.toLocaleString() + ' chars');
  console.log('   - 13 Numbered Sections: OK');
  console.log('   - Single Accordion Sidebar (25 Chapters): OK');
  console.log('   - Warm Ivory Intro Box: OK');
  console.log('   - 5 Details Quizzes: OK');
  console.log('   - Interactive Code Blocks: ' + (content.match(/class="code-block"/g) || []).length);
  console.log('   - Online Python Compiler Integration: OK');
  console.log('   - HTML Masterclass Header & Badges: OK');
  process.exit(0);
} else {
  console.error('❌ FAILED CHECKS:', failedKeys.join(', '));
  process.exit(1);
}

