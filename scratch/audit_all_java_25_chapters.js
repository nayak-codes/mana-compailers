const fs = require('fs');
const path = require('path');
const { LESSONS } = require('./java_curriculum_data.js');

console.log('========================================================================');
console.log('🏆 GRAND MASTER AUDIT: ALL 25 JAVA MASTERCLASS CHAPTERS');
console.log('========================================================================\n');

let totalChars = 0;
let passedCount = 0;
let failedCount = 0;

LESSONS.forEach(l => {
  const p = path.join(__dirname, '..', 'public', 'blog-java', l.file);
  if (!fs.existsSync(p)) {
    console.error(`❌ Ch ${String(l.num).padStart(2, '0')}: File missing! ${l.file}`);
    failedCount++;
    return;
  }
  const content = fs.readFileSync(p, 'utf8');
  const chars = content.length;
  totalChars += chars;

  let errors = [];
  if (chars < 45000) errors.push(`Chars ${chars} < 45,000`);
  if (!content.includes('class="intro-box"')) errors.push('Missing .intro-box');
  if (!content.includes('class="toc-card"')) errors.push('Missing .toc-card');

  const codeBlocks = (content.match(/class="code-block"/g) || []).length;
  if (codeBlocks !== 3) errors.push(`Code blocks: ${codeBlocks} (expected 3)`);

  const outputCards = (content.match(/class="code-output-card"/g) || []).length;
  if (outputCards !== 3) errors.push(`Output cards: ${outputCards} (expected 3)`);

  if (content.includes('background:#0f172a') || content.includes('background: #0f172a')) {
    errors.push('Contains dark box background:#0f172a');
  }

  const quizzes = (content.match(/<details[\s>]/g) || []).length;
  if (quizzes < 5) errors.push(`Quizzes: ${quizzes} (expected >=5)`);

  if (/<main[^>]*margin:\s*0\s*auto/i.test(content)) {
    errors.push('main has margin:0 auto (causes centering gap)');
  }
  if (!content.includes('<main class="content">')) {
    errors.push('missing <main class="content">');
  }
  if (/<pre[^>]*color:\s*#0f172a/i.test(content)) {
    errors.push('dark pre text color #0f172a inside black pre (unreadable code)');
  }
  if (!content.includes('<pre><code') && !content.includes('<pre><code>')) {
    errors.push('missing <code> tag inside <pre>');
  }

  if (errors.length === 0) {
    passedCount++;
    console.log(`✅ Ch ${String(l.num).padStart(2, '0')} [${l.title.padEnd(40)}]: ${chars.toLocaleString()} chars | All Checks PASSED`);
  } else {
    failedCount++;
    console.log(`❌ Ch ${String(l.num).padStart(2, '0')} [${l.title.padEnd(40)}]: ${chars.toLocaleString()} chars | ERRORS: ${errors.join(', ')}`);
  }
});

console.log('\n========================================================================');
console.log(`📊 Total Characters across all 25 Chapters: ${totalChars.toLocaleString()} chars`);
console.log(`🎯 Average Characters per Chapter: ${Math.round(totalChars / LESSONS.length).toLocaleString()} chars`);
console.log(`🏁 Result: ${passedCount} / ${LESSONS.length} Chapters Passed 100%`);
console.log('========================================================================');

if (failedCount > 0) {
  process.exit(1);
}
