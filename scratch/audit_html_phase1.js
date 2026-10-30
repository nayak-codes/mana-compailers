const fs = require('fs');
const path = require('path');

const phase1Files = [
  '01-html-introduction-web-standards-and-setup.html',
  '02-html-document-structure-doctype-head-meta.html',
  '03-html-elements-tags-attributes-and-hierarchy.html',
  '04-html-headings-paragraphs-and-text-formatting.html'
];

console.log('=== PHASE 1 COMPREHENSIVE AUDIT ===');
let totalChars = 0;
let allPassed = true;

phase1Files.forEach((f, idx) => {
  const p = path.join(__dirname, '..', 'public', 'blog-html', f);
  const content = fs.readFileSync(p, 'utf8');
  totalChars += content.length;

  const hasIntro = content.includes('class="intro-box"');
  const sectionCount = (content.match(/class="section-title"/g) || []).length;
  const badNested = (content.match(/<a\b[^>]*>(?:(?!<\/a>)[\s\S])*?<(?:a|table|ul|ol|dl|h[1-6]|p)\b/gi) || []).length;
  const isLight = content.includes('light-theme');

  console.log(`Ch ${idx + 1} (${f}):`);
  console.log(`  - Length: ${content.length} chars`);
  console.log(`  - Intro Box: ${hasIntro}`);
  console.log(`  - Section Count: ${sectionCount}`);
  console.log(`  - Light Theme: ${isLight}`);
  console.log(`  - Bad Nested Tags: ${badNested}`);

  if (!hasIntro || sectionCount !== 13 || badNested !== 0 || !isLight) {
    allPassed = false;
  }
});

console.log('-----------------------------------');
console.log(`Total Phase 1 Characters: ${totalChars} characters`);
console.log(`ALL PHASE 1 CHAPTERS PASSED: ${allPassed}`);

if (!allPassed) process.exit(1);

