const fs = require('fs');
const code = fs.readFileSync('scratch/upgrade_c_phase1.js', 'utf8');

console.log('Script length:', code.length);
const c3Idx = code.indexOf('LESSON 3');
const c4Idx = code.indexOf('LESSON 4');
console.log('Lesson 3 index:', c3Idx, 'Lesson 4 index:', c4Idx);
console.log('Lesson 3 snippet:\n', code.substring(c3Idx, c3Idx + 600));
console.log('Lesson 4 snippet:\n', code.substring(c4Idx, c4Idx + 600));

