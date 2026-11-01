const fs = require('fs');
const path = require('path');

const phase1Files = [
  '01-c-introduction-and-hello-world.html',
  '02-c-variables-data-types-constants.html',
  '03-c-user-input-scanf-format-specifiers.html',
  '04-c-operators-and-expressions.html'
];

console.log('=== C MASTERCLASS: PHASE 01 COMPLETE AUDIT ===');
let totalChars = 0;
let allPassed = true;

phase1Files.forEach((f, idx) => {
  const filePath = path.join(__dirname, '..', 'public', 'blog-c', f);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ File missing: ${f}`);
    allPassed = false;
    return;
  }
  const content = fs.readFileSync(filePath, 'utf8');
  totalChars += content.length;
  console.log(`\nLesson ${idx + 1}: ${f}`);
  console.log(`  - Size: ${content.length.toLocaleString()} characters`);
  
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
  const hasTheme = content.includes('class="light-theme"') && content.includes('class="lang-c light-theme"');
  console.log(`  - Light Theme: ${hasTheme ? '✅' : '❌'}`);
  if (!hasTheme) allPassed = false;

  // Verify code runner
  const hasRunner = content.includes('localStorage.setItem(\'code_c\', rawCode)');
  console.log(`  - Code Runner: ${hasRunner ? '✅' : '❌'}`);
  if (!hasRunner) allPassed = false;
});

console.log('\n================================');
console.log(`Total C Phase 01 Character Count: ${totalChars.toLocaleString()} characters`);
console.log(`Status: ${allPassed ? '✅ ALL C PHASE 01 CHAPTERS 100% VERIFIED' : '❌ AUDIT FAILED'}`);

if (!allPassed) process.exit(1);

