const fs = require('fs');
const path = require('path');
const { LESSONS } = require('./html_curriculum_data.js');

console.log('====================================================');
console.log('🏆 GRAND AUDIT: ALL 20 CHAPTERS OF HTML5 MASTERCLASS');
console.log('====================================================');

let grandTotal = 0;
let failedCount = 0;

LESSONS.forEach((l) => {
  const filePath = path.join(__dirname, '..', 'public', 'blog-html', l.file);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Chapter ${l.num} File Missing: ${l.file}`);
    failedCount++;
    return;
  }
  const content = fs.readFileSync(filePath, 'utf8');
  grandTotal += content.length;

  let sections = 0;
  for (let i = 1; i <= 13; i++) {
    if (content.includes(`<span class="num">${i}</span>`)) sections++;
  }

  const hasIntro = content.includes('class="intro-box"');
  const hasTry = content.includes('class="try-box"');
  const hasQuiz = content.includes('<details') && content.includes('<summary');
  const hasTheme = content.includes('class="light-theme"');

  const isOk = (sections === 13) && hasIntro && hasTry && hasQuiz && hasTheme && (content.length > 35000);

  if (!isOk) {
    console.error(`❌ Chapter ${l.num} failed checks: sections=${sections}/13, intro=${hasIntro}, try=${hasTry}, quiz=${hasQuiz}, theme=${hasTheme}, len=${content.length}`);
    failedCount++;
  } else {
    console.log(`Ch ${String(l.num).padStart(2, ' ')}: ${l.file.padEnd(60, ' ')} | ${content.length.toLocaleString().padStart(7, ' ')} chars | 13/13 ✅`);
  }
});

console.log('====================================================');
console.log(`Grand Total Characters Across 20 Chapters: ${grandTotal.toLocaleString()} characters`);
console.log(`Status: ${failedCount === 0 ? '🎉 ALL 20 CHAPTERS 100% COMPLETE & PASSING ALL RIGID CRITERIA!' : `❌ FAILED: ${failedCount} chapters`}`);

if (failedCount > 0) process.exit(1);
