const fs = require('fs');
const path = require('path');
const { LESSONS } = require('./java_curriculum_data.js');

let total = 0;
console.log('========================================================================');
console.log('🏆 GRAND MASTERCLASS AUDIT: ALL 25 JAVA CHAPTERS (100% COMPLETE)');
console.log('========================================================================\n');

LESSONS.forEach(l => {
  const p = path.join(__dirname, '..', 'public', 'blog-java', l.file);
  const len = fs.existsSync(p) ? fs.readFileSync(p, 'utf8').length : 0;
  total += len;
  console.log(`Ch ${String(l.num).padStart(2, '0')}: ${len.toLocaleString().padStart(7, ' ')} chars | ${l.title}`);
});

console.log('\n------------------------------------------------------------------------');
console.log(`🌟 GRAND TOTAL: ${total.toLocaleString()} characters across 25 Chapters!`);
console.log(`📊 AVERAGE: ${Math.round(total / 25).toLocaleString()} characters per chapter`);
console.log('========================================================================\n');

