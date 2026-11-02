const fs = require('fs');
const path = require('path');

const phase2Files = [
  { num: 6, file: '06-java-conditional-statements-if-else.html', title: 'Conditional Statements (if-else)' },
  { num: 7, file: '07-java-switch-statements-and-switch-expressions.html', title: 'Switch Statements & Expressions' },
  { num: 8, file: '08-java-loops-while-for-and-enhanced-foreach.html', title: 'Loops: while, for & for-each' },
  { num: 9, file: '09-java-strings-memory-pool-and-immutability.html', title: 'Strings & Memory Pool (SCP)' },
  { num: 10, file: '10-java-stringbuilder-stringbuffer-and-methods.html', title: 'StringBuilder & StringBuffer' }
];

console.log('========================================================================');
console.log('🔍 AUDITING PART 02: CONTROL FLOW & STRINGS (CHAPTERS 06 TO 10)');
console.log('========================================================================\n');

let totalChars = 0;
let allPassed = true;

phase2Files.forEach(({ num, file, title }) => {
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
console.log(`Total Characters across Part 02: ${totalChars.toLocaleString()} chars`);
console.log(`Overall Part 02 Status: ${allPassed ? '✅ ALL 5 CHAPTERS 100% PASSED!' : '❌ AUDIT FAILED'}`);
console.log('========================================================================');

if (!allPassed) {
  process.exit(1);
}
