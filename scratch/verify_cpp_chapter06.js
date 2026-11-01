const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'public', 'blog-cpp', '06-cpp-switch-case.html');

console.log('=== VERIFYING C++ MASTERCLASS CHAPTER 06 ===');

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
  noPageLayout: !content.includes('class="page-layout"'),
  noSiteHeader: !content.includes('header class="site-header"'),
  hasBlogStyleCss: content.includes('/blog-style.css'),
  hasCppStyleCss: content.includes('/blog-cpp/style.css'),
  hasSiteNavCss: content.includes('/site-nav.css'),
  hasSiteNavJs: content.includes('/site-nav.js'),
  has5Quizzes: (content.match(/<details/g) || []).length >= 5,
  hasMin5CodeBlocks: (content.match(/class="code-block"/g) || []).length >= 5,
  hasCompilerIntegration: content.includes('openInteractiveCompiler()') && content.includes('/online-cpp-compiler.html')
};

const failedKeys = Object.keys(checks).filter(k => !checks[k]);

if (failedKeys.length === 0) {
  console.log('✅ All checks passed successfully for C++ Chapter 06!');
  console.log('   - File Size: ' + content.length.toLocaleString() + ' chars');
  console.log('   - 13 Numbered Sections: OK');
  console.log('   - Single Accordion Sidebar: OK');
  console.log('   - Ivory Intro Box: OK');
  console.log('   - 5 Details Quizzes: OK');
  console.log('   - Code Blocks Count: ' + (content.match(/class="code-block"/g) || []).length);
  console.log('   - Interactive Compiler Integration: OK');
  process.exit(0);
} else {
  console.error('❌ FAILED CHECKS:', failedKeys.join(', '));
  process.exit(1);
}

