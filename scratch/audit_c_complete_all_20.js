const fs = require('fs');
const path = require('path');
const { LESSONS } = require('./c_curriculum_data.js');

console.log('===============================================================');
console.log('     🏆 C PROGRAMMING MASTERCLASS - COMPLETE 20 CHAPTER AUDIT     ');
console.log('===============================================================\n');

let grandTotalSize = 0;
let failedCount = 0;

LESSONS.forEach((lesson) => {
  const filePath = path.join(__dirname, '..', 'public', 'blog-c', lesson.file);

  if (!fs.existsSync(filePath)) {
    console.error(`❌ Chapter ${lesson.num} (${lesson.file}) FILE NOT FOUND!`);
    failedCount++;
    return;
  }

  const content = fs.readFileSync(filePath, 'utf8');
  grandTotalSize += content.length;

  let errors = [];

  if (content.length < 40000) errors.push(`Size ${content.length} < 40,000`);
  if (!content.includes('<html class="light-theme" lang="te">')) errors.push('Missing light-theme html');
  if (!content.includes('<body class="lang-c light-theme">')) errors.push('Missing light-theme body');
  if (!content.includes('<div class="intro-box">')) errors.push('Missing intro-box');
  if (!content.includes('class="tbl"')) errors.push('Missing table .tbl');
  if (!content.includes('class="try-box"')) errors.push('Missing try-box');
  if (!content.includes("localStorage.setItem('code_c', rawCode)")) errors.push('Missing code runner localStorage');

  for (let s = 1; s <= 13; s++) {
    if (!content.includes(`<span class="num">${s}</span>`)) {
      errors.push(`Missing section badge ${s}`);
    }
  }

  const detailsCount = (content.match(/<details/g) || []).length;
  if (detailsCount < 5) errors.push(`Only ${detailsCount} details tags (expected >= 5)`);

  const status = errors.length === 0 ? '✅ PASSED' : '❌ FAILED';
  if (errors.length > 0) failedCount++;

  console.log(`[Ch ${String(lesson.num).padStart(2, '0')}] ${status} | ${content.length.toLocaleString().padStart(7, ' ')} chars | ${lesson.title}`);
  if (errors.length > 0) {
    console.error('      Errors:', errors);
  }
});

console.log('\n===============================================================');
console.log(`GRAND TOTAL MASTERCLASS SIZE: ${grandTotalSize.toLocaleString()} characters`);
console.log(`ALL 20 CHAPTERS STATUS: ${failedCount === 0 ? '🎉 100% SUCCESS (20/20 PASSED)' : `❌ ${failedCount} FAILURES`}`);
console.log('===============================================================');

if (failedCount > 0) {
  process.exit(1);
}
