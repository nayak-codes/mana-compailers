const fs = require('fs');
const { LESSONS } = require('./c_curriculum_data.js');

console.log('Auditing all 20 lessons in public/blog-c/:');
let totalChars = 0;
let allPassed = true;

LESSONS.forEach(l => {
  const p = 'public/blog-c/' + l.file;
  if (!fs.existsSync(p)) {
    console.error(`❌ Missing file: ${p}`);
    allPassed = false;
    return;
  }
  const content = fs.readFileSync(p, 'utf8');
  totalChars += content.length;
  const isLight = content.includes('class="light-theme"') && content.includes('class="lang-c light-theme"');
  const hasNav = content.includes('site-nav.js');
  const hasAscii = /[┌│└─┐┘├┤┬┴┼]/.test(content);
  if (!isLight || !hasNav || hasAscii || content.length < 20000) {
    console.error(`⚠️ Check failed for Chapter ${l.num} (${l.file}): len=${content.length}, isLight=${isLight}, hasNav=${hasNav}, hasAscii=${hasAscii}`);
    allPassed = false;
  } else {
    console.log(`✅ Chapter ${l.num < 10 ? '0' + l.num : l.num}: ${l.file} (${content.length} chars)`);
  }
});

console.log(`\nAudit complete! Total content across 20 chapters: ${totalChars.toLocaleString()} characters.`);
console.log('All 20 lessons passed high-density checks:', allPassed);
