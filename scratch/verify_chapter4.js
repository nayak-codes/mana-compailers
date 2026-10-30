const fs = require('fs');
const c = fs.readFileSync('public/blog-html/04-html-headings-paragraphs-and-text-formatting.html', 'utf8');

const checks = {
  length: c.length,
  hasIntroBox: c.includes('class="intro-box"'),
  hasSectionTitles: (c.match(/class="section-title"/g) || []).length,
  hasNumBadges: (c.match(/<span class="num">/g) || []).length,
  hasTable: c.includes('class="tbl"'),
  hasCodeBlock: c.includes('class="code-block"'),
  hasTryBox: c.includes('class="try-box"'),
  hasDetails: c.includes('<details>'),
  hasLightHtml: c.includes('<html class="light-theme" lang="te">'),
  badNestedCount: (c.match(/<a\b[^>]*>(?:(?!<\/a>)[\s\S])*?<(?:a|table|ul|ol|dl|h[1-6]|p)\b/gi) || []).length
};

console.log('Chapter 4 Verification Results:');
console.log(JSON.stringify(checks, null, 2));

if (checks.hasIntroBox && checks.hasSectionTitles === 13 && checks.hasTable && checks.hasTryBox && checks.badNestedCount === 0) {
  console.log('🎉 ALL CHAPTER 4 CHECKS PASSED PERFECTLY!');
  process.exit(0);
} else {
  console.error('❌ SOME CHECKS FAILED!');
  process.exit(1);
}

