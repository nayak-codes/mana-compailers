const fs = require('fs');
const path = require('path');

const phase2Files = [
  '05-html-links-anchor-tags-and-navigation.html',
  '06-html-lists-ordered-unordered-and-description.html',
  '07-html-images-responsive-picture-and-svg.html',
  '08-html-tables-headers-merge-and-styling.html'
];

console.log('=== PHASE 2 COMPLETE AUDIT ===');
let totalChars = 0;
let allPassed = true;

phase2Files.forEach((f, idx) => {
  const filePath = path.join(__dirname, '..', 'public', 'blog-html', f);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ File missing: ${f}`);
    allPassed = false;
    return;
  }
  const content = fs.readFileSync(filePath, 'utf8');
  totalChars += content.length;
  console.log(`\nLesson ${idx + 5}: ${f}`);
  console.log(`  - Size: ${content.length} characters`);
  
  // Verify 13 sections
  let sections = 0;
  for (let i = 1; i <= 13; i++) {
    if (content.includes(`<span class="num">${i}</span>`)) sections++;
  }
  console.log(`  - Sections: ${sections}/13`);
  if (sections !== 13) allPassed = false;

  // Verify intro-box
  const hasIntro = content.includes('class="intro-box"');
  console.log(`  - Intro Box: ${hasIntro ? '✅' : '❌'}`);
  if (!hasIntro) allPassed = false;

  // Verify try-box
  const hasTry = content.includes('class="try-box"');
  console.log(`  - Try Box: ${hasTry ? '✅' : '❌'}`);
  if (!hasTry) allPassed = false;

  // Verify quiz
  const hasQuiz = content.includes('<details') && content.includes('<summary');
  console.log(`  - Collapsible Quiz: ${hasQuiz ? '✅' : '❌'}`);
  if (!hasQuiz) allPassed = false;

  // Verify theme
  const hasTheme = content.includes('class="light-theme"');
  console.log(`  - Light Theme: ${hasTheme ? '✅' : '❌'}`);
  if (!hasTheme) allPassed = false;
});

console.log('\n================================');
console.log(`Total Phase 2 Character Count: ${totalChars.toLocaleString()} characters`);
console.log(`Status: ${allPassed ? '✅ ALL PHASE 2 CHAPTERS 100% VERIFIED' : '❌ AUDIT FAILED'}`);
