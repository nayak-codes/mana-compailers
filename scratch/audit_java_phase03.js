const fs = require('fs');
const path = require('path');

const phase3Files = [
  { num: 11, file: '11-java-arrays-multidimensional-and-algorithms.html', title: 'Arrays & Algorithms' },
  { num: 12, file: '12-java-methods-call-stack-and-pass-by-value.html', title: 'Methods & Call Stack' },
  { num: 13, file: '13-java-method-overloading-and-varargs.html', title: 'Method Overloading & Varargs' },
  { num: 14, file: '14-java-oop-classes-objects-and-constructors.html', title: 'Classes, Objects & Heap' },
  { num: 15, file: '15-java-constructors-this-keyword-and-chaining.html', title: 'Constructors & this Keyword' }
];

console.log('========================================================================');
console.log('🔍 AUDITING PART 03: ARRAYS, METHODS & OOP (CHAPTERS 11 TO 15)');
console.log('========================================================================\n');

let totalChars = 0;
let allPassed = true;

phase3Files.forEach(({ num, file, title }) => {
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
console.log(`Total Characters across Part 03: ${totalChars.toLocaleString()} chars`);
console.log(`Overall Part 03 Status: ${allPassed ? '✅ ALL 5 CHAPTERS 100% PASSED!' : '❌ AUDIT FAILED'}`);
console.log('========================================================================');

if (!allPassed) {
  process.exit(1);
}
