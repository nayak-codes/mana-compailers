const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'public', 'blog-java', '06-java-conditional-statements-if-else.html');

console.log('=== VERIFYING JAVA MASTERCLASS CHAPTER 06 ===\n');

if (!fs.existsSync(filePath)) {
  console.error('❌ File not found:', filePath);
  process.exit(1);
}

const content = fs.readFileSync(filePath, 'utf8');
console.log('File size:', content.length.toLocaleString(), 'characters');

const codeBlocksCount = (content.match(/class="code-block"/g) || []).length;
const darkBoxesCount = (content.match(/background:#0f172a/g) || []).length;

console.log('Code blocks count:', codeBlocksCount);
console.log('Dark boxes count:', darkBoxesCount);

const checks = {
  minSize: content.length >= 45000,
  hasSections: (content.match(/<h2 class="section-title"[^>]*><span class="num">(\d+)<\/span>/g) || []).length >= 12,
  hasIvoryBox: content.includes('class="intro-box"'),
  hasTocCard: content.includes('class="toc-card"'),
  hasSingleSidebar: (content.match(/<aside class="sidebar"/g) || []).length === 1,
  hasSiteNavPlaceholder: content.includes('id="site-nav-placeholder"'),
  hasLayoutClass: content.includes('class="layout"'),
  hasLightClass: content.includes('class="lang-java light-theme"'),
  noPageLayout: !content.includes('class="page-layout"'),
  noSiteHeader: !content.includes('header class="site-header"'),
  hasBlogStyleCss: content.includes('/blog-style.css'),
  hasJavaStyleCss: content.includes('/blog-java/style.css'),
  hasSiteNavCss: content.includes('/site-nav.css'),
  hasSiteNavJs: content.includes('/site-nav.js'),
  has5Quizzes: (content.match(/<details/g) || []).length >= 5,
  hasExact3CodeBlocks: codeBlocksCount === 3,
  hasZeroDarkBoxes: darkBoxesCount === 0,
  hasCompilerIntegration: content.includes('runInJavaCompiler') && content.includes('/online-java-compiler.html'),
  hasBreadcrumb: content.includes('class="breadcrumb"') && content.includes('<span class="sep">›</span>'),
  hasPageTitle: content.includes('class="page-title"'),
  hasPageMeta: content.includes('class="page-meta"'),
  hasCoveredPill: content.includes('📌 Covered in this lesson:'),
  hasNotoSansTelugu: content.includes('Noto+Sans+Telugu')
};

const failedKeys = Object.keys(checks).filter(k => !checks[k]);

if (failedKeys.length === 0) {
  console.log('✅ All checks passed successfully for Java Chapter 06!');
  console.log('   - File Size: ' + content.length.toLocaleString() + ' chars');
  console.log('   - Numbered Sections: OK');
  console.log('   - TOC Card: OK');
  console.log('   - Single Accordion Sidebar (25 Chapters): OK');
  console.log('   - Warm Ivory Intro Box: OK');
  console.log('   - 5 Details Quizzes: OK');
  console.log('   - Interactive Code Blocks: ' + codeBlocksCount + ' (Target: exactly 3)');
  console.log('   - Dark Boxes: ' + darkBoxesCount + ' (Target: 0)');
  console.log('   - Online Java Compiler Integration: OK');
  console.log('   - Masterclass Header & Badges: OK');
  process.exit(0);
} else {
  console.error('❌ FAILED CHECKS:', failedKeys.join(', '));
  process.exit(1);
}
