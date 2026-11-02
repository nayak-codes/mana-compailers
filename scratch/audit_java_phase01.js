const fs = require('fs');
const path = require('path');
const { LESSONS } = require('./java_curriculum_data.js');

const phase1Lessons = LESSONS.filter(l => l.phase === 1);

console.log('=== AUDITING JAVA MASTERCLASS PART 01 (ALL 5 CHAPTERS) ===\n');

let totalChars = 0;
let allPassed = true;

for (const lesson of phase1Lessons) {
  const filePath = path.join(__dirname, '..', 'public', 'blog-java', lesson.file);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Chapter ${lesson.num} (${lesson.file}) NOT FOUND!`);
    allPassed = false;
    continue;
  }
  const content = fs.readFileSync(filePath, 'utf8');
  totalChars += content.length;

  const codeBlocksCount = (content.match(/class="code-block"/g) || []).length;
  const darkBoxesCount = (content.match(/background:#0f172a/g) || []).length;
  const hasIntroBox = content.includes('class="intro-box"');
  const hasTocCard = content.includes('class="toc-card"');
  const has5Quizzes = (content.match(/<details/g) || []).length >= 5;
  const hasLightJava = content.includes('class="lang-java light-theme"');
  const hasYellowActive = content.includes(`class="active">${lesson.num}.`);

  const passed = content.length >= 45000 &&
                 codeBlocksCount === 3 &&
                 darkBoxesCount === 0 &&
                 hasIntroBox &&
                 hasTocCard &&
                 has5Quizzes &&
                 hasLightJava &&
                 hasYellowActive;

  if (passed) {
    console.log(`✅ Chapter ${lesson.id} (${lesson.title}): ${content.length.toLocaleString()} chars | 3 code blocks | 0 dark boxes | 5 quizzes | TOC & Ivory OK`);
  } else {
    console.error(`❌ Chapter ${lesson.id} FAILED:`, {
      len: content.length,
      codeBlocks: codeBlocksCount,
      darkBoxes: darkBoxesCount,
      hasIntroBox,
      hasTocCard,
      has5Quizzes,
      hasLightJava,
      hasYellowActive
    });
    allPassed = false;
  }
}

console.log('\n--------------------------------------------------');
console.log(`Total Characters across Part 01: ${totalChars.toLocaleString()}`);
console.log(`Overall Status: ${allPassed ? '🎉 100% PERFECT & VERIFIED' : '❌ FAILED'}`);

if (!allPassed) process.exit(1);
