const fs = require('fs');
const path = require('path');

const phase5Files = [
  '17-html-head-metadata-seo-and-open-graph.html',
  '18-html-accessibility-aria-and-screen-readers.html',
  '19-html5-apis-storage-dialog-details-drag-drop.html',
  '20-html-capstone-project-complete-responsive-portfolio.html'
];

console.log('=== PHASE 5 COMPLETE AUDIT ===');
let totalChars = 0;
let allPassed = true;

phase5Files.forEach((f, idx) => {
  const filePath = path.join(__dirname, '..', 'public', 'blog-html', f);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ File missing: ${f}`);
    allPassed = false;
    return;
  }
  const content = fs.readFileSync(filePath, 'utf8');
  totalChars += content.length;
  console.log(`\nLesson ${idx + 17}: ${f}`);
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
console.log(`Total Phase 5 Character Count: ${totalChars.toLocaleString()} characters`);
console.log(`Status: ${allPassed ? '✅ ALL PHASE 5 CHAPTERS 100% VERIFIED' : '❌ AUDIT FAILED'}`);

if (!allPassed) process.exit(1);

