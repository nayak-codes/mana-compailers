const fs = require('fs');
const path = require('path');

const phase4Files = [
  { num: 16, file: '16-java-encapsulation-access-modifiers-and-records.html', title: 'Encapsulation & Records' },
  { num: 17, file: '17-java-inheritance-super-keyword-and-object-class.html', title: 'Inheritance & super Keyword' },
  { num: 18, file: '18-java-polymorphism-method-overriding-dynamic-binding.html', title: 'Polymorphism & Overriding' },
  { num: 19, file: '19-java-abstract-classes-and-interfaces.html', title: 'Abstract Classes & Interfaces' },
  { num: 20, file: '20-java-exception-handling-and-custom-exceptions.html', title: 'Exceptions & Custom Errors' }
];

console.log('========================================================================');
console.log('🔍 AUDITING PART 04: CORE OOP & EXCEPTIONS (CHAPTERS 16 TO 20)');
console.log('========================================================================\n');

let totalChars = 0;
let allPassed = true;

phase4Files.forEach(({ num, file, title }) => {
  const fullPath = path.join(__dirname, '..', 'public', 'blog-java', file);
  if (!fs.existsSync(fullPath)) {
    console.error(`❌ Chapter ${num} (${file}) MISSING!`);
    allPassed = false;
    return;
  }

  const content = fs.readFileSync(fullPath, 'utf8');
  const len = content.length;
  totalChars += len;

  const hasIntroBox = content.includes('class="intro-box"');
  const hasToc = content.includes('class="toc-card"');
  const codeBlocks = (content.match(/class="code-block"/g) || []).length;
  const outputs = (content.match(/class="code-output-card"/g) || []).length;
  const hasDarkBox = content.includes('background:#0f172a') || content.includes('background: #0f172a');
  const quizzes = (content.match(/<details style="/g) || []).length;
  const isLenValid = len >= 45000;

  const passed = hasIntroBox && hasToc && (codeBlocks === 3) && (outputs === 3) && !hasDarkBox && (quizzes >= 5) && isLenValid;
  if (!passed) allPassed = false;

  console.log(`Chapter ${num.toString().padStart(2, '0')}: ${title}`);
  console.log(`  - File Size:     ${len.toLocaleString()} chars ${isLenValid ? '✅' : '❌ (<45k)'}`);
  console.log(`  - Intro Box:     ${hasIntroBox ? '✅' : '❌'}`);
  console.log(`  - TOC Card:      ${hasToc ? '✅' : '❌'}`);
  console.log(`  - Code Blocks:   ${codeBlocks} ${codeBlocks === 3 ? '✅' : '❌ (must be 3)'}`);
  console.log(`  - Output Cards:  ${outputs} ${outputs === 3 ? '✅' : '❌ (must be 3)'}`);
  console.log(`  - Dark Boxes:    ${!hasDarkBox ? '✅ 0' : '❌ detected #0f172a'}`);
  console.log(`  - Quizzes:       ${quizzes} ${quizzes >= 5 ? '✅' : '❌ (<5)'}`);
  console.log(`  - Status:        ${passed ? '🎉 FULLY COMPLIANT' : '⚠️ FAILED'}\n`);
});

console.log('========================================================================');
console.log(`Total Characters across Part 04: ${totalChars.toLocaleString()} chars`);
console.log(`Overall Part 04 Status: ${allPassed ? '✅ ALL 5 CHAPTERS 100% PASSED!' : '❌ AUDIT FAILED'}`);
console.log('========================================================================');

if (!allPassed) {
  process.exit(1);
}
