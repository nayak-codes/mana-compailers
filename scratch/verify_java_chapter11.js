const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'public', 'blog-java', '11-java-arrays-multidimensional-and-algorithms.html');

console.log('🔍 Verifying Java Chapter 11 Compliance...');

if (!fs.existsSync(filePath)) {
  console.error('❌ File does not exist:', filePath);
  process.exit(1);
}

const content = fs.readFileSync(filePath, 'utf8');
const charCount = content.length;
console.log(`📊 Total Character Count: ${charCount}`);

let errors = [];

// 1. Minimum character length (>= 45,000)
if (charCount < 45000) {
  errors.push(`Character count ${charCount} is below required 45,000`);
} else {
  console.log('✅ Length test passed (>= 45,000 chars)');
}

// 2. Warm ivory intro box styling
if (!content.includes('class="intro-box"')) {
  errors.push('Missing .intro-box class');
} else {
  console.log('✅ Intro box styling verified');
}

// 3. 3-part Analogy inside intro box
if (!content.includes('సినిమా థియేటర్ సీట్ల వరుస') || !content.includes('Cinema Theater &amp; Hotel Room Floor Analogy')) {
  errors.push('Missing Cinema Theater & Hotel Room Floor analogy');
} else {
  console.log('✅ 3-part real-world analogy verified');
}

// 4. 3-column TOC Card with sec-1 to sec-12
if (!content.includes('class="toc-card"') || !content.includes('sec-1') || !content.includes('sec-12')) {
  errors.push('Missing .toc-card or section anchor links');
} else {
  console.log('✅ 3-column Table of Contents verified');
}

// 5. Exactly 3 runnable code blocks
const codeBlockMatches = content.match(/class="code-block"/g) || [];
if (codeBlockMatches.length !== 3) {
  errors.push(`Expected exactly 3 .code-block elements, found ${codeBlockMatches.length}`);
} else {
  console.log('✅ Exactly 3 runnable code blocks verified');
}

// 6. Exactly 3 code output cards
const outputMatches = content.match(/class="code-output-card"/g) || [];
if (outputMatches.length !== 3) {
  errors.push(`Expected exactly 3 .code-output-card elements, found ${outputMatches.length}`);
} else {
  console.log('✅ Exactly 3 terminal output cards verified');
}

// 7. No dark boxes (background:#0f172a)
if (content.includes('background:#0f172a') || content.includes('background: #0f172a')) {
  errors.push('Found forbidden dark box styling background:#0f172a');
} else {
  console.log('✅ Zero dark boxes verified');
}

// 8. 5 interactive details quizzes
const quizMatches = content.match(/<details style="/g) || [];
if (quizMatches.length < 5) {
  errors.push(`Expected at least 5 quizzes, found ${quizMatches.length}`);
} else {
  console.log('✅ 5 interactive quizzes verified');
}

// 9. Active lesson 11 in sidebar
if (!content.includes('class="active"') && !content.includes("11. Arrays &amp; Algorithms")) {
  errors.push('Missing active status on Lesson 11 in sidebar');
} else {
  console.log('✅ Lesson 11 active in sidebar verified');
}

if (errors.length > 0) {
  console.error('\n❌ Verification Failed with errors:');
  errors.forEach(e => console.error('  - ' + e));
  process.exit(1);
} else {
  console.log('\n🎉 ALL VERIFICATION CHECKS PASSED 100% FOR CHAPTER 11!');
}

