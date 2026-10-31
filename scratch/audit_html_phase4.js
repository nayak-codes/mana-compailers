const fs = require('fs');
const path = require('path');

const phase4Files = [
  '13-html-forms-action-method-and-form-controls.html',
  '14-html-input-types-text-password-email-number-date.html',
  '15-html-select-datalist-textarea-checkbox-radio.html',
  '16-html-form-validation-required-pattern-min-max.html'
];

console.log('=== PHASE 4 COMPLETE AUDIT ===');
let totalChars = 0;
let allPassed = true;

phase4Files.forEach((f, idx) => {
  const filePath = path.join(__dirname, '..', 'public', 'blog-html', f);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ File missing: ${f}`);
    allPassed = false;
    return;
  }
  const content = fs.readFileSync(filePath, 'utf8');
  totalChars += content.length;
  console.log(`\nLesson ${idx + 13}: ${f}`);
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
console.log(`Total Phase 4 Character Count: ${totalChars.toLocaleString()} characters`);
console.log(`Status: ${allPassed ? '✅ ALL PHASE 4 CHAPTERS 100% VERIFIED' : '❌ AUDIT FAILED'}`);

