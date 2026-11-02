const fs = require('fs');
const path = require('path');

const phase5Files = [
  { num: 21, file: '21-java-collections-list-arraylist-linkedlist.html', title: 'List: ArrayList & LinkedList' },
  { num: 22, file: '22-java-collections-set-and-map-deep-dive.html', title: 'Set & Map Deep Dive' },
  { num: 23, file: '23-java-generics-and-type-safety.html', title: 'Generics & Type Safety' },
  { num: 24, file: '24-java-lambdas-and-stream-api.html', title: 'Lambdas & Stream API' },
  { num: 25, file: '25-java-capstone-project.html', title: 'Capstone: Banking Engine' }
];

console.log('========================================================================');
console.log('🔍 AUDITING PART 05: COLLECTIONS & CAPSTONE (CHAPTERS 21 TO 25)');
console.log('========================================================================\n');

let totalChars = 0;
let allPassed = true;

phase5Files.forEach(({ num, file, title }) => {
  const filePath = path.join(__dirname, '..', 'public', 'blog-java', file);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Chapter ${num} missing: ${file}`);
    allPassed = false;
    return;
  }
  const content = fs.readFileSync(filePath, 'utf8');
  const count = content.length;
  totalChars += count;

  const hasIntro = content.includes('class="intro-box"');
  const hasToc = content.includes('class="toc-card"');
  const codeBlocks = (content.match(/class="code-block"/g) || []).length;
  const outputCards = (content.match(/class="code-output-card"/g) || []).length;
  const noDark = !content.includes('background:#0f172a') && !content.includes('background: #0f172a');
  const quizzes = (content.match(/<details style="/g) || []).length;

  const valid = count >= 45000 && hasIntro && hasToc && codeBlocks === 3 && outputCards === 3 && noDark && quizzes >= 5;

  console.log(`Chapter ${num}: ${title}`);
  console.log(`  - Characters: ${count.toLocaleString()} (Target: >=45,000) ${count >= 45000 ? '✅' : '❌'}`);
  console.log(`  - Intro Box : ${hasIntro ? '✅' : '❌'} | TOC Card: ${hasToc ? '✅' : '❌'}`);
  console.log(`  - Code Blocks: ${codeBlocks} (Expected 3) ${codeBlocks === 3 ? '✅' : '❌'}`);
  console.log(`  - Output Cards: ${outputCards} (Expected 3) ${outputCards === 3 ? '✅' : '❌'}`);
  console.log(`  - Zero Dark Boxes: ${noDark ? '✅' : '❌'}`);
  console.log(`  - Interactive Quizzes: ${quizzes} (Expected >=5) ${quizzes >= 5 ? '✅' : '❌'}`);
  console.log(`  - Overall Status: ${valid ? 'PASSED 100% 🎉' : 'FAILED ❌'}\n`);

  if (!valid) allPassed = false;
});

console.log('------------------------------------------------------------------------');
console.log(`📊 Part 05 Total Characters: ${totalChars.toLocaleString()} chars`);
console.log(`🎯 Average Characters / Chapter: ${Math.round(totalChars / phase5Files.length).toLocaleString()} chars`);
console.log(`🏁 PART 05 VERIFICATION RESULT: ${allPassed ? 'ALL CHAPTERS PASSED 100%! 🚀' : 'ERRORS DETECTED ❌'}`);
console.log('========================================================================\n');

process.exit(allPassed ? 0 : 1);
