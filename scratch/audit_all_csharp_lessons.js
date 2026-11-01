const fs = require('fs');
const path = require('path');
const { LESSONS } = require('./csharp_curriculum_data.js');

const dir = path.join(__dirname, '..', 'public', 'blog-csharp');
let totalChars = 0;
let allPassed = true;

console.log('========================================================================');
console.log('🌟 COMPREHENSIVE MASTERCLASS AUDIT: ALL 20 C# TUTORIAL CHAPTERS 🌟');
console.log('========================================================================\n');

LESSONS.forEach(l => {
  const filePath = path.join(dir, l.file);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ MISSING FILE: Chapter ${l.id} (${l.file})`);
    allPassed = false;
    return;
  }

  const content = fs.readFileSync(filePath, 'utf8');
  totalChars += content.length;

  const checks = {
    min40kChars: content.length >= 40000,
    has13Sections: (content.match(/<h2[^>]*><span class="num">(\d+)<\/span>/g) || []).length >= 13,
    hasIvoryBox: content.includes('class="intro-box"'),
    hasSingleSidebar: (content.match(/<aside class="sidebar"/g) || []).length === 1,
    hasSiteNavPlaceholder: content.includes('id="site-nav-placeholder"'),
    hasLayoutClass: content.includes('class="layout"'),
    noPageLayout: !content.includes('class="page-layout"'),
    noSiteHeader: !content.includes('header class="site-header"'),
    hasBlogStyleCss: content.includes('/blog-style.css'),
    hasCSharpStyleCss: content.includes('/blog-csharp/style.css'),
    hasSiteNavCss: content.includes('/site-nav.css'),
    hasSiteNavJs: content.includes('/site-nav.js'),
    has5Quizzes: (content.match(/<details/g) || []).length >= 5,
    hasCompilerIntegration: content.includes('openInteractiveCompiler()') || content.includes('/online-csharp-compiler.html')
  };

  const failedKeys = Object.keys(checks).filter(k => !checks[k]);

  if (failedKeys.length === 0) {
    console.log(`✅ Chapter ${l.id.toString().padStart(2, '0')}: ${l.file}`);
    console.log(`   Size: ${content.length.toLocaleString().padStart(6, ' ')} chars | 13 Secs: OK | Single Sidebar: OK | Ivory Intro: OK | Quiz: OK`);
  } else {
    console.error(`❌ Chapter ${l.id.toString().padStart(2, '0')}: ${l.file} (${content.length} chars) - FAILED: ${failedKeys.join(', ')}`);
    allPassed = false;
  }
});

console.log('\n------------------------------------------------------------------------');
console.log(`Total C# Masterclass Characters across 20 chapters: ${totalChars.toLocaleString()} characters`);
console.log(`Average Characters Per Chapter: ${Math.round(totalChars / LESSONS.length).toLocaleString()} characters`);
console.log(`Overall Health Status: ${allPassed ? "🏆 ALL 20 CHAPTERS PASS 100% PERFECTLY! 🚀" : "❌ AUDIT FAILED!"}`);
console.log('------------------------------------------------------------------------');
process.exit(allPassed ? 0 : 1);
